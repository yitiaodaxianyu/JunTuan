import { GameState, JiaSu } from "../Constants";
import { Enemy_Injured_Type } from "../Enemy/EnemyConfig";
import BuffStateManager from "../Game/BuffStateManager";
import { GameEffectId, GameEffectsManager } from "../Game/GameEffectsManager";
import SkyManager from "../Game/SkyManager";
import GameManager from "../GameManager";
import { BuffData } from "../Hero/Game/BuffData";
import BuffState from "../Hero/Game/BuffState";
import BuffTimer from "../Hero/Game/BuffTimer";
import { AttributeData, BuffId, BuffStateType, DamageType, Hero_Type, ShieldType } from "../Hero/Game/HeroConfig";
import HpProgressBar from "../Monster/HpProgressBar";
import Monster from "../Monster/Monster";
import { MonsterAttData, InjuredData, FeedBackType, StrengthType } from "../Monster/MonsterData";
import MyTool from "../Tools/MyTool";
import ImmunityShield from "./ImmunityShield";
import Shield from "./Shield";
import { WallType } from "./WallConfig";


const {ccclass, property} = cc._decorator;

@ccclass
export default class Wall extends cc.Component {
    /**属性数据 */
    protected attribute_data:AttributeData=null;
    /**城墙类型 */
    protected wall_type:WallType=WallType.Main;    
    //当前血量
    protected cur_hp:number=1000;
    /**最大血量 */
    protected max_hp:number=1000;
    protected hp_progress:HpProgressBar=null;
    protected shield_progress:cc.ProgressBar=null;
    protected hp_text:cc.Label=null;
    protected shield_text:cc.Label=null;
    /*BUFF* */
    protected wall_buff: Map<BuffId,BuffTimer>=null;
    /*BUFF* */
    protected wall_de_buff: Map<BuffId,BuffTimer>=null;
    /**buff状态 */
    protected map_buff_state:Map<number,BuffState>=null;
    /**护盾 */
    protected map_shield_value:Map<number,Shield>=null;
    /**免疫护盾 */
    protected map_immunity_shield_value:Map<number,ImmunityShield>=null;

    /**城墙死亡监听 */
    private die_callback:Function=null;
    /**血条发生改变的回调 */
    private hp_change_callback:Function=null;
    /**血条显示时的回调 */
    private hp_show_callback:Function=null;
    /**血条显示时的回调 */
    private damage_callback:Function=null;
    /**城墙的矩形 */
    private wall_rect:cc.Rect=null;
    /**城墙的最高Y轴坐标 */
    private wall_max_yy:number=0;
    /**是否死亡了 */
    is_die:boolean=false;

    is_tutorail:boolean=false;
    
    /**
     * 初始化城墙数据
     * @param attributeData 属性数据
     * @param wallType 城墙的类型
     */
    initWall(attributeData:AttributeData,wallType:WallType) {
        this.attribute_data=attributeData;
        this.wall_type=wallType;
        this.is_die=false;
        this.cur_hp=this.max_hp=attributeData.Health=Math.round(attributeData.Health);
        if(!this.map_shield_value){
            this.map_shield_value=new Map<number,Shield>();
        }        
        if(!this.map_immunity_shield_value){
            this.map_immunity_shield_value=new Map<number,ImmunityShield>();
        }        
        if(!this.wall_buff){
            this.wall_buff=new Map<BuffId,BuffTimer>();
        }
        if(!this.wall_de_buff){
            this.wall_de_buff=new Map<BuffId,BuffTimer>();
        }
        this.removeAllBuff();
        this.removeAllDeBuff();
        this.removeAllShield();
        this.showHp();
        this.showShildProgress();        
    }

    refreshWallData(attributeData:AttributeData){
        this.attribute_data=attributeData;
        this.max_hp=attributeData.Health=Math.round(attributeData.Health);
        this.showHp();
    }
    refreshWallDataByaddHero(attributeData:AttributeData){
        this.attribute_data=attributeData;
        let der_hp:number=this.max_hp-this.cur_hp;
        console.log("差值血量");
        
        this.max_hp=attributeData.Health=Math.round(attributeData.Health);
        this.cur_hp=this.max_hp-der_hp;
        this.showHp();
    }
    getAttributeData():AttributeData{
        return this.attribute_data;
    }

    /**设置城墙死亡的监听 */
    setWallDieListen(callback:Function){
        this.die_callback=callback;
    }
    /**设置城墙血量发生改变时的监听 */
    setHpChangeListen(callback:Function){
        this.hp_change_callback=callback;
    }
    /**设置城墙血量显示时的监听 */
    setHpShowListen(callback:Function){
        this.hp_show_callback=callback;
    }
    /**设置城墙受伤时的监听 */
    setDamageListen(callback:Function){
        this.damage_callback=callback;
    }
    /**设置城墙的矩形 */
    protected setWallRect(rect:cc.Rect){
        this.wall_rect=rect;
        this.wall_max_yy=rect.yMax;
    }
    /**获取城墙的矩形 */
    public getWallRect():cc.Rect{
        return this.wall_rect;
    }
    /**获取城墙的最高点 */
    public getWallMaxYY():number{
        return this.wall_max_yy;
    }
    /**获取城墙的类型 */
    public getWallType():WallType{
        return this.wall_type;
    }
    /**
     * 城墙受伤计算
     * @param damage 伤害值
     * @param damageType 伤害类型
     * @param strengthType 怪物类型
     * @param monsterData 怪物数据
     * @param isReal 是否真实伤害
     * @param ship 船撞的时候的伤害
     */
    beInjured(monsterAttData:MonsterAttData,isReal:boolean=false,ship:number=0):InjuredData{
        let monsterData=monsterAttData.monster_attribute;
        let data=new InjuredData();
        let missRate=0;        
        let critRate=0;
        let damage=0;
        //如果是普通攻击，计算闪避和暴击，默认为0
        if(monsterAttData.damage_type==DamageType.Normal){
            missRate=InjuredData.calcMissRate(this.attribute_data.Miss,monsterData.Hit);
            critRate=InjuredData.calcCritRate(monsterData.Critical,this.attribute_data.AntiCritical);
            //获取一个概率类型
            let type=InjuredData.calcOnceType([missRate,critRate,1]);
            switch(type){
                case 0:{
                    //闪避
                    data.feedback_type=FeedBackType.ShanBi;
                    data.setDamageNum(0);
                }break;
                case 1:{
                    //暴击
                    data.feedback_type=FeedBackType.BaoJi;
                    if(isReal){
                        damage=InjuredData.calcNormalCritRealDamageNum(monsterData.Attack,InjuredData.calcFinalExtraCrit(monsterData.ExtraCritical,this.attribute_data.AntiExtraCritical));
                    }else{
                        damage=InjuredData.calcNormalCritDamageNum(monsterData.Attack,this.attribute_data.Defense,monsterAttData.zengshang_rate,this.attribute_data.reduce_injury_rate,InjuredData.calcFinalExtraCrit(monsterData.ExtraCritical,this.attribute_data.AntiExtraCritical));
                    }
                    data.setDamageNum(damage); 
                    if(this.damage_callback){
                        this.damage_callback(monsterAttData.monster_ts);
                    }                   
                }break;
                case 2:{
                    //普通命中
                    data.feedback_type=FeedBackType.Null;
                    if(isReal){
                        damage=InjuredData.calcNormalRealDamageNum(monsterData.Attack);   
                    }else{
                        damage=InjuredData.calcNormalDamageNum(monsterData.Attack,this.attribute_data.Defense,monsterAttData.zengshang_rate,this.attribute_data.reduce_injury_rate);                    
                    }
                    data.setDamageNum(damage);
                    if(this.damage_callback){
                        this.damage_callback(monsterAttData.monster_ts);
                    }
                }break;            
            }
        }else if(monsterAttData.damage_type==DamageType.Skill){
            //不需要计算闪避，技能必中
            data.feedback_type=FeedBackType.Null;
            if(isReal){
                damage=InjuredData.calcSkillRealDamageNum(monsterData.Attack,monsterAttData.skill_rate);
            }else{
                damage=InjuredData.calcSkillDamageNum(monsterData.Attack,monsterAttData.skill_rate,this.attribute_data.Defense,monsterAttData.zengshang_rate,this.attribute_data.reduce_injury_rate);
            }
            data.setDamageNum(damage);
        }else if(monsterAttData.damage_type==DamageType.Ship){
            data.feedback_type=FeedBackType.Null;
            data.setDamageNum(ship);
        }
        if(data.getDamageNum()>0){
            //cc.log(data.getDamageNum());
            if(!this.checkMmmunityShield(1,monsterAttData.damage_type)){
                //先减护盾的值
                let value=this.changeShieldValue(-data.getDamageNum(),monsterAttData.damage_type);
                if(value<0){
                    this.changeHp(value);
                    if(this.wall_type==WallType.Main){
                        if(monsterAttData.strength_type==StrengthType.Boss){
                            if(monsterAttData.damage_type==DamageType.Skill){
                                if(monsterAttData.is_big){
                                    MyTool.randomSceneShakeBig();
                                }else{
                                    MyTool.randomSceneShakeSmall();
                                }                                
                            }else if(monsterAttData.damage_type==DamageType.Normal){
                                MyTool.randomSceneShakeSmall();
                            }
                        }
                    }                    
                }
            }else{
                //提示免疫

            }
        }
        return data;
    }
    /**造成真实伤害，直接造成对应的伤害值,无法闪避 */
    beRealDamage(damageType:DamageType,strengthType:StrengthType,damage:number){
        let data=new InjuredData();
        data.setDamageNum(damage);        
        if(data.getDamageNum()>0){
            if(!this.checkMmmunityShield(1,damageType)){
                //先减护盾的值
                let value=this.changeShieldValue(-data.getDamageNum(),damageType);
                if(value<0){
                    this.changeHp(value);
                    if(strengthType==StrengthType.Boss){
                        if(damageType==DamageType.Skill){
                            MyTool.randomSceneShakeBig();
                        }else if(damageType==DamageType.Normal){
                            MyTool.randomSceneShakeSmall();
                        }
                    }
                }
            }else{
                //提示免疫

            }
        }
        return data;
    }

    /**改变血量值，返回是否死亡 */
    public changeHp(hp:number):boolean
    {
        let gm=GameManager.getInstance();
        if(gm.cur_game_state==GameState.Game_Lose || gm.cur_game_state==GameState.Game_Pause || gm.cur_game_state==GameState.Game_Win || this.is_die)
        {
            return true;
        }
        if(hp<0)
        {            
            cc.tween(this.node).to(0.1,{color:cc.Color.RED}).to(0.1,{color:cc.Color.WHITE}).start();            
        }
        let newHp=this.cur_hp+hp;
        if(this.hp_change_callback){
            this.hp_change_callback(hp);
        }
        return this.setHp(newHp);
    }
    /**无尽模式的立即恢复血量 */
    public changeHpByEndless(hp:number){
        let newHp=this.cur_hp+hp;
        if(this.hp_change_callback){
            this.hp_change_callback(hp);
        }
        this.setHp(newHp)
    }
    /**返回是否死亡 */
    private setHp(newHp:number):boolean{
        if(newHp>this.max_hp)
        {
            newHp=this.max_hp;
        }else if(newHp<=0){
            newHp=0;
            this.is_die=true;
            if(this.die_callback){
                this.die_callback();
            }
        }
        this.cur_hp=newHp;
        // if(this.is_tutorail){
        //     //教程锁血
        //     this.cur_hp=this.getMaxHp()/2;
        // }
        this.showHp();
        return this.cur_hp<=0;
    }

    protected showHp()
    {
        if(this.hp_progress){
            this.hp_progress.changeProgress(this.cur_hp/this.max_hp);
        }
        if(this.hp_text){
            this.hp_text.string=Math.floor(this.cur_hp)+'/'+this.max_hp;
        }
        if(this.hp_show_callback){
            this.hp_show_callback();
        }
    }

    getMaxHp():number
    {
        return this.max_hp;
    }

    getCurHp():number
    {
        return this.cur_hp;
    }

    getCurHpPer():number
    {
        return this.cur_hp/this.max_hp;
    }

    /**添加一个盾 */
    addShield(id:number,type:ShieldType,remainTime:number,value:number,gameEffectId:GameEffectId){
        if(this.map_shield_value.has(id)){
            this.map_shield_value.get(id).refreshShield(remainTime,value);
        }else{
            let shield=new cc.Node().addComponent(Shield);
            shield.init(id,type,remainTime,value,this.onShieldDestroy.bind(this));
            this.map_shield_value.set(id,shield);
            this.node.addChild(shield.node);
            /**添加护盾特效 */
            if(gameEffectId!=GameEffectId.Null){
                let texiao=GameEffectsManager.getInstance().createGameEffectForParent(gameEffectId,cc.v2(0,0),this.node);
                shield.setGameEffectData(gameEffectId,texiao);
            }                        
        }
        this.showShildProgress();
        
    }
    onShieldDestroy(id:number): void {        
        this.map_shield_value.delete(id);
        this.showShildProgress();
    }

    /**更改护盾值，返回伤害溢出的值*/
    changeShieldValue(num:number,type:DamageType):number{
        //根据伤害类型遍历出对应的护盾
        let shieldArr=new Array<Shield>();
        this.map_shield_value.forEach((v,k)=>{
            if(v.getIsCanWithstand(type)){
                shieldArr.push(v);
            }
        });
        //排序
        if(shieldArr.length>=2){
            shieldArr.sort((left:Shield,right:Shield)=>{
                return left.getRemainTime()-right.getRemainTime();
            })
        }
        let newValue=num;
        for(let i=0; i<shieldArr.length; i++){
            newValue=shieldArr[i].changeShieldValue(num);
            if(newValue>0){
                break;
            }
        }
        this.showShildProgress();
        return newValue;
    }

    protected showShildProgress(){
        let value=this.getShieldValue();
        let progress=value/this.getMaxHp();
        if(progress>1){
            progress=1;
        }
        if(this.shield_progress){
            this.shield_progress.node.active=value>0;
            this.shield_progress.progress=progress
        }
        if(this.shield_text){
            this.shield_text.node.active=value>0;
            this.shield_text.string=value.toFixed(0);
        }
    }

    /**匹配护盾 */
    getShieldValue():number{
        let value=0;
        this.map_shield_value.forEach((v,k)=>{
            value+=v.getShieldValue();
        });
        return value;
    }

    removeAllShield(){
        this.map_shield_value.forEach((v,k)=>{
            v.destroySelf();
        });
    }

    /**添加一个具有免疫效果的盾 */
    addImmunityShield(id:number,type:ShieldType,remainTime:number,value:number){
        if(this.map_immunity_shield_value.has(id)){
            this.map_immunity_shield_value.get(id).refreshShield(remainTime,value);
        }else{
            let shield=new cc.Node().addComponent(ImmunityShield);
            shield.init(id,type,remainTime,value,(id)=>{
                this.map_immunity_shield_value.delete(id);
            })
            this.map_immunity_shield_value.set(id,shield);
            this.node.addChild(shield.node);
        }
    }

    /**检查免疫护盾值，返回是否能免疫*/
    checkMmmunityShield(num:number,type:DamageType):boolean{
        //根据伤害类型遍历出对应的护盾
        let shieldArr=new Array<ImmunityShield>();
        this.map_immunity_shield_value.forEach((v,k)=>{            
            if(v.getIsCanWithstand(type)){
                shieldArr.push(v);
            }
        });
        //排序
        if(shieldArr.length>=2){
            shieldArr.sort((left:ImmunityShield,right:ImmunityShield)=>{
                return left.getRemainTime()-right.getRemainTime();
            })
        }
        let newValue=num;
        for(let i=0; i<shieldArr.length; i++){
            newValue=shieldArr[i].changeShieldValue(num);
            if(newValue>0){
                return true;
            }
        }
        return false;
    }
    addHpBuff():void{
        let pos=cc.v2(Math.random()*100-50,Math.random()*50-25);
        GameEffectsManager.getInstance().createGameEffectForParent(GameEffectId.monster_zhiliao_halo_hit,pos,this.node);
    }
    /**---------------------------------------------BUFF--------------------------------------------------- */
    addBuff(buffData:BuffData): BuffTimer {
        let buffId=buffData.buff_id;
        if(!this.isHaveBuff(buffId))
        {
            //添加buff节点和特效                   
            let node=new cc.Node(buffData.game_effect_id.toString());
            this.node.addChild(node);
            //添加buff
            let buff:BuffTimer=node.getComponent(BuffTimer);
            if(!buff){
                buff=node.addComponent(BuffTimer);
            }
            buff.init(buffData);
            //buff销毁时处理
            buff.addDestroyListen(this.onBuffDestory.bind(this));
            //buff治疗触发时处理
            if(buffData.recovery_jiange_time>0){
                buff.addRecoveryListen({
                    doRecovery:(num:number)=>{
                        this.changeHp(num);
                        let pos=cc.v2(Math.random()*600-300,this.node.y+Math.random()*200-100);
                        GameManager.getInstance().hp_text_manager.createHpTextHp(pos,num,Enemy_Injured_Type.ZhiLiao);
                        SkyManager.getInstance().createGameEffectById(GameEffectId.monster_zhiliao_halo_hit,pos);
                    }
                },buff.getFirstBuffValue());
            }
            this.wall_buff.set(buffData.buff_id,buff);
            switch(buffId){
                case BuffId.Hero_ZhenDe_JiaXueJianShang:{
                    this.attribute_data.reduce_injury_rate+=buffData.buff_value[1];
                }break;
            }
            this.addBuffState(buffId,buffData.remain_time);
            return buff;
        }else{
            let buff=this.wall_buff.get(buffId);
            buff.refreshBuff(buffData);
            this.addBuffState(buffId,buffData.remain_time);  
            return buff;         
        }          
    }

    subBuff(buffId: BuffId): boolean {
        let buff=this.wall_buff.get(buffId);
        if(buff)
        {
            buff.destroySelf();
            return true;
        }
        return false;
    }

    onBuffDestory(buffData:BuffData){
        this.wall_buff.delete(buffData.buff_id);
        switch(buffData.buff_id){           
            case BuffId.Hero_ZhenDe_JiaXueJianShang:{
                this.attribute_data.reduce_injury_rate-=buffData.buff_value[1];
            }break;
        }
    }

    isHaveBuff(buff: BuffId): boolean {
        return this.wall_buff.has(buff);
    }

    removeAllBuff(){
        this.wall_buff.forEach((buff:BuffTimer)=>{
            this.subBuff(buff.getBuffId());
        })
    }

    /**添加一个buff状态图标 */
    addBuffState(buffId:BuffId,remainTime:number){
        let types=BuffStateManager.getInstance().getBuffType(buffId);
        for(let i=0; i<types.length; i++){
            let type=types[i];
            if(this.map_buff_state.has(type)){
                this.map_buff_state.get(type).refreshTime(remainTime);
            }else{
                let bfState=BuffStateManager.getInstance().createBuffState(type,Hero_Type.Hero_Num);
                bfState.init(type,remainTime,()=>{
                    this.map_buff_state.delete(type);
                });
                this.map_buff_state.set(type,bfState);
                //this.node.addChild(shield.node);
            }
        }
    }

    getBuffType(buffId:BuffId):BuffStateType[]{
        let type=[];
        switch(buffId){

        }
        return type;            
    }

    addDeBuff(buffData:BuffData,monsterAttData:MonsterAttData): boolean {
        let buffId=buffData.buff_id;
        if(!this.isHaveDeBuff(buffId))
        {
            //添加buff节点和特效                   
            let node=new cc.Node(buffData.game_effect_id.toString());
            this.node.addChild(node);
            //添加buff
            let buff:BuffTimer=node.getComponent(BuffTimer);
            if(!buff){
                buff=node.addComponent(BuffTimer);
            }
            buff.init(buffData);
            //buff销毁时处理
            buff.addDestroyListen(this.onDeBuffDestory.bind(this));            
            this.wall_de_buff.set(buffData.buff_id,buff);
            //buff伤害触发时处理
            if(buffData.damage_jiange_time>0&&monsterAttData){
                buff.addDamageListen({
                    doDamage:(monsterAttData:MonsterAttData)=>{
                        monsterAttData.is_big=false;
                        this.beInjured(monsterAttData);
                    }
                },monsterAttData);
            }
            switch(buffId){
                
            }
            return true;
        }else{
            this.wall_de_buff.get(buffId).refreshBuff(buffData);         
        }  
        return false;
    }

    subDeBuff(buffId: BuffId): boolean {
        let buff=this.wall_de_buff.get(buffId);
        if(buff)
        {
            buff.destroySelf();
            return true;
        }
        return false;
    }

    onDeBuffDestory(buffData:BuffData){
        this.wall_de_buff.delete(buffData.buff_id);
        switch(buffData.buff_id){           
            
        }
    }

    isHaveDeBuff(buff: BuffId): boolean {
        return this.wall_de_buff.has(buff);
    }

    removeAllDeBuff(){
        this.wall_de_buff.forEach((buff:BuffTimer)=>{
            this.subDeBuff(buff.getBuffId());
        })
    }

    destroyWall(){
        if(this.die_callback){
            this.die_callback();
        }
    }

}
