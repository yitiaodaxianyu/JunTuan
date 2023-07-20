import { Enemy_State, Enemy_Buff_Type, Enemy_DeBuff_Type, Enemy_Injured_Type } from "../Enemy/EnemyConfig";
import HpProgressBar from "./HpProgressBar";
import { GameEffectId, GameEffectsManager } from "../Game/GameEffectsManager";
import GameManager from "../GameManager";
import { GongJiData } from "../Hero/Data/HeroData";
import {  KeyFrameData, MonsterFaceName, MonsterSkinType, InjuredData, FeedBackType,  StrengthType, HiddenAttribute, MonsterAttData, MonsterSkillData, ColorType } from "./MonsterData";
import { JsonMonsterConfigure, MonsterConfigureManager } from "./Data/MonsterConfigure";
import MonsterManager from "./MonsterManager";
import { JsonMonsterGrowthAttributes, MonsterGrowthAttributesManager } from "./Data/MonsterGrowthAttributes";
import GroundManager from "../Game/GroundManager";
import { GameMode, GameState, Text_Type } from "../Constants";
import { MazeManager } from "../Maze/MazeManager";
import { BossChallengeManager } from "../Activity/BossChallenge";
import { BuffId, BuffType, DamageType, HaloData, HaloId, Hero_Type, SkillType } from "../Hero/Game/HeroConfig";
import BuffTimer from "../Hero/Game/BuffTimer";
import { BuffData } from "../Hero/Game/BuffData";
import SkillManager from "../Game/SkillManager";
import { JsonMonsterAttribute } from "./Data/MonsterAttribute";
import { SoundIndex } from "../Sound/AudioConstants";
import { MonsterSkillManager } from "./Data/MonsterSkill";
import Wall from "../Wall/Wall";
import WallManager from "../Wall/WallManager";
import { WallType } from "../Wall/WallConfig";


const {ccclass, property} = cc._decorator;
/**怪物通用类，只处理数据，不处理表现 */
@ccclass
export default class Monster extends cc.Component {
    
    protected spine: sp.Skeleton=null;
    /**皮肤类型 */
    protected skin_type:MonsterSkinType=MonsterSkinType.Skin1;
    /**怪物id */
    protected monster_id: number=10011;
    /**怪物等级 */
    protected monster_level:number=1;
    /**怪物血量系数 */
    protected monster_hp_rate:number=1;
    /**怪物种类 */
    public monster_type: number=1;
    /**怪物的最终战斗使用的数值,可更改 */
    protected monster_data: JsonMonsterGrowthAttributes=null;
    /**怪物的基础战斗数值，不可更改 */
    protected base_attribute_data: JsonMonsterGrowthAttributes=null;
    /**怪物的基础数值 */
    protected base_data: JsonMonsterConfigure=null;
    /**怪物的隐藏属性 */
    hidden_attribute:HiddenAttribute=null;
    protected cur_move_speed: number=0;
    protected move_target_pos: cc.Vec2=null;
    protected move_direction:number=Math.PI*3/2;
    /**朝向名称 */
    protected face_type:MonsterFaceName=MonsterFaceName.Front;
    /**当前的血量 */
    protected cur_hp: number=0;
    /**最大的血量 */
    protected max_hp: number=0;
    /**血条进度条 */
    protected hp_progress: HpProgressBar=null;    
    /**阴影 */
    protected shadow: cc.Node=null;
    shadow_pos: cc.Vec2=null;
    shadow_size: cc.Size=null;
    /**减伤率 */
    jianshang_rate:number=0;
    /**增伤率 */
    zengshang_rate:number=0;
    /**攻击间隔（秒，表示多少秒攻击一次） */
    protected att_jiange: number=1;
    /**攻击计时 */
    protected att_jishu: number=0;
    /**技能计时 */
    protected skill_jishu: number=0;
    /**当前的攻击力 */
    protected cur_att: number=0;
    /**当前的韧性 */
    protected cur_toughness:number=0;
    /**攻击目标,攻击目标为null时，目标就是城墙 */
    protected att_target:cc.Node=null;    
    /**怪物当前的状态 */
    protected monster_state: Enemy_State=Enemy_State.standby;
    /**怪物上一个状态 */
    protected prev_state: Enemy_State=Enemy_State.standby;
    /**怪物当前拥有的buff */
    protected monster_buff: Map<BuffId,BuffTimer>=null;
    /**怪物当前拥有的debuff */
    protected monster_debuff: Map<BuffId,BuffTimer>=null;
    /**指定的缩放值*/
    protected setup_scale:number=0.4;
    protected is_boss:boolean=false;
    public is_can_count:boolean=true;
    protected is_count:boolean=true;
    /**城墙的Y轴坐标 */
    protected wall_yy:number=0;
    protected att_pos:cc.Vec2=cc.v2(0,0);
    /**分数 */
    public score:number=0;
    /**狙击瞄准的位置 */
    protected juji_pos:cc.Vec2=cc.v2(0,0);
    /**血条的位置 */
    protected hp_pos:cc.Vec2=cc.v2(0,0);
    /**中心位置，用于范围检测 */
    protected center_pos:cc.Vec2=cc.v2(0,0);
    //受伤动作
    protected injured_action:cc.Tween=null;

    /**初始化回调 */
    private init_callback:Function=null;
    /**怪物血量发生变化时的回调 */
    private change_hp_callback:Function=null;
    /**眩晕回调，用于boss施法被中断 */
    private xuanyun_callback:Function=null;
    /**死亡回调，怪物死亡时触发，用于播放自身对应的死亡动画 */
    private death_callback:Function=null;
    /**被主动技能受伤时的回调 */
    private active_injury_callback:Function=null;
    /**移动到目标地点回调 */
    protected move_end_callback:Function=null;
    /**debuff增伤统计 */    
    private injury_damage_stats:Map<number,number>=null;
    /**沟壑伤害计算 */
    is_can_gully:boolean=false;
    /**拥有的光环 */
    private monster_halo:Map<HaloId,HaloData>=null;
    /**额外的闪避率 */
    private ex_miss_rate:number=0;
    /**额外的防御力 */
    private ex_defense_value:number=0;
    /**额外的移动速度 */
    private ex_move_speed_value:number=0;
    /**-------------------------------技能的--------------------------------------------- */
    /**技能数据 */
    skill_data:MonsterSkillData=null;
    /**所有技能的当前的冷却时间 */
    skill_cold_down:number[]=[];
    /**技能队列 */
    skill_queue:number[]=[];
    /**当前使用的技能,0代表没有 */
    cur_skill_index:number=0;
    /**碰撞器 */
    collider:cc.Collider=null;
    /**要攻击的城墙 */
    att_wall:Wall=null;
    /**牵引最小距离 */
    min_qianyin:number=0;

    cur_color:ColorType=ColorType.Null;

    protected onLoad(): void {
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.monster_normal_att,8);
        // GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.boss1_att_move,2);
        // GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.boss1_att_end,2);
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.monster_die,8);
        this.spine=this.node.getComponent(sp.Skeleton);
        this.loadInitPos();
        this.wall_yy=GameManager.getInstance().enemy_att_y;
        this.monster_buff=new Map<BuffId,BuffTimer>();
        this.monster_debuff=new Map<BuffId,BuffTimer>();
        this.monster_halo=new Map<HaloId,HaloData>();
        this.collider=this.node.getComponent(cc.Collider);
        this.collider.enabled=true;
    }

    init(monsterId: number,level:number,hpRate:number,isCanCount:boolean=true) {
        this.monster_id=monsterId;
        this.monster_level=level;
        this.monster_hp_rate=hpRate;
        let jsonData=MonsterConfigureManager.getInstance().getJsonMonsterConfigure(monsterId);
        this.monster_type=jsonData.MonsterClass;
        let attributeId=MonsterGrowthAttributesManager.getId(this.monster_id,level);
        this.base_attribute_data=MonsterGrowthAttributesManager.getInstance().getJsonMonsterGrowthAttributes(attributeId);      
        this.is_can_gully=true;
        this.is_can_count=isCanCount;
        this.is_count=this.is_can_count;
        this.ex_miss_rate=0;
        this.ex_defense_value=0;
        //this.initOutward(jsonData.Skin);        
        this.initData(jsonData);
        this.addHpProgress();
        this.addShadow();
        this.setEnemyState(Enemy_State.standby);
        this.setColor(ColorType.Null);
        this.collider=this.node.getComponent(cc.Collider);
        this.collider.enabled=true;
        this.min_qianyin=0;
        if(this.init_callback){
            this.init_callback();
        }
        //this.spine.paused=false;
        //this.move_direction=Math.PI*3/2+Math.random()*(Math.PI/6)-(Math.PI/12);        
    }

    initSummon(monsterId: number,bossAttribute:JsonMonsterGrowthAttributes){
        this.monster_id=monsterId;
        let jsonData=MonsterConfigureManager.getInstance().getJsonMonsterConfigure(monsterId);
        this.monster_type=jsonData.MonsterClass;
        this.is_can_gully=true;
        this.is_can_count=false;
        this.is_count=this.is_can_count;
        this.base_attribute_data=cc.instantiate(bossAttribute);
        switch(jsonData.StrengthType){
            case StrengthType.Elite:{
                this.base_attribute_data.Health=bossAttribute.Health/50;
                this.base_attribute_data.Attack=bossAttribute.Attack*0.9724;
                this.base_attribute_data.Defense=bossAttribute.Defense*0.6;
            }break;
            case StrengthType.Normal:{
                this.base_attribute_data.Health=bossAttribute.Health/50;
                this.base_attribute_data.Attack=bossAttribute.Attack*0.9592;
                this.base_attribute_data.Defense=0;
            }break;
        }        
        this.initData(jsonData);
        this.addHpProgress();
        this.addShadow();
        this.setEnemyState(Enemy_State.standby);
        this.setColor(ColorType.Null);
        this.collider=this.node.getComponent(cc.Collider);
        this.collider.enabled=true;
        this.min_qianyin=0;
        if(this.init_callback){
            this.init_callback();
        }
    }

    refreshData(level:number){
        this.monster_level=level;
        let jsonData=MonsterConfigureManager.getInstance().getJsonMonsterConfigure(this.monster_id);        
        //重置数据
        let attributeId=MonsterGrowthAttributesManager.getId(this.monster_id,level);
        this.base_attribute_data=MonsterGrowthAttributesManager.getInstance().getJsonMonsterGrowthAttributes(attributeId);  
        this.monster_data=cc.instantiate(this.base_attribute_data);
        this.base_data=jsonData;
        this.cur_hp=this.max_hp=this.monster_data.Health;
        this.cur_move_speed=this.base_data.Speed;
        this.att_jiange=1/this.base_data.AttackSpeed;
        this.cur_att=this.monster_data.Attack;
        // if(this.base_data.SkillNum>0){
        //     this.loadMonsterSkillData();
        // }
    }
    /**初始化外观*/
    // private initOutward(skinType:MonsterSkinType){
    //     this.skin_type=skinType;
    //     this.setSkin(this.getSkinName());
    //     this.playSpinAnimaton(this.getAnimaName(MonsterActionName.Idle),true);
    // }
    /**初始化数据 */
    private initData(baseData:JsonMonsterConfigure){
        this.monster_data=cc.instantiate(this.base_attribute_data);
        this.base_data=baseData;
        this.cur_hp=this.max_hp=this.monster_data.Health*this.monster_hp_rate;
        this.cur_move_speed=this.base_data.Speed;
        this.att_jiange=1/this.base_data.AttackSpeed;
        this.cur_att=this.monster_data.Attack;
        this.cur_toughness=0;
        this.setup_scale=this.base_data.Scale;
        this.node.scale=this.setup_scale;
        this.node.opacity=255;        
        this.skin_type=baseData.Skin;
        this.hidden_attribute=new HiddenAttribute();
        this.injury_damage_stats=new Map<number,number>();
        if(this.base_data.SkillNum>0){
            this.loadMonsterSkillData();
        }
    }

    private loadMonsterSkillData(){
        let skillData=new MonsterSkillData();
        skillData.ColdDown=new Map<number,number>();
        skillData.InitColdDown=new Map<number,number>();
        skillData.SkillValue_1=new Map<number,number>();
        skillData.SkillValue_2=new Map<number,number>();
        skillData.SkillValue_3=new Map<number,number>();
        skillData.SkillValue_4=new Map<number,number>();
        skillData.CastingRange=new Map<number,number>();
        for(let s=1; s<=this.base_data.SkillNum; s++){            
            let id=MonsterSkillManager.getInstance().getId(this.monster_id,s,this.base_attribute_data.SkillLevel)
            let jsonData=MonsterSkillManager.getInstance().getJsonMonsterSkill(id);
            if(jsonData == null ) continue;
            skillData.SkillValue_1.set(s,jsonData.SkillValue_1);
            skillData.SkillValue_2.set(s,jsonData.SkillValue_2);
            skillData.SkillValue_3.set(s,jsonData.SkillValue_3);
            skillData.SkillValue_4.set(s,jsonData.SkillValue_4);
            skillData.ColdDown.set(s,jsonData.ColdDown);
            skillData.InitColdDown.set(s,jsonData.InitialColdDown);
            this.skill_cold_down[s-1]=jsonData.InitialColdDown;
            skillData.CastingRange.set(s,jsonData.CastingRange);
        }
        
        this.skill_data=skillData;
    }

    protected addHpProgress()
    {
        if(!this.hp_progress)
        {
            if(this.base_data.StrengthType!=StrengthType.Boss)
            {
                this.hp_progress=GameManager.getInstance().enemy_hp_manager.createEnemyHp(cc.v2(this.node.x+this.hp_pos.x*this.setup_scale,this.node.y+this.hp_pos.y*this.setup_scale)).getComponent(HpProgressBar);
            }
            this.showHp();
        }
    }

    protected addShadow(){
        //if(this.base_data.StrengthType!=StrengthType.Boss)
        if(!this.shadow){
            this.shadow=GroundManager.getInstance().createShadow(this.node.getPosition().add(this.shadow_pos));
            this.shadow.width=this.node.scaleX*this.shadow_size.width;
            this.shadow.height=this.node.scaleY*this.shadow_size.height;
        }else{
            this.shadow.opacity=255;
            this.shadow.setPosition(this.node.getPosition().add(this.shadow_pos));
        }
    }

    protected showHp()
    {
        if(this.hp_progress)
        {
            this.hp_progress.changeProgress(this.cur_hp/this.max_hp);
        }
    }

    setIsCanCount(isCanCount:boolean){
        this.is_can_count=isCanCount;
        // if(this.is_can_count==false){
        //     cc.log('setIsCanCount==false');
        // }
    }

    getSetupScale():number{
        return this.setup_scale;
    }

    getSheShouAttackScale():number{
        let scale=0.3;
        switch(this.base_data.StrengthType){
            case StrengthType.Normal:{
                scale=0.55;
            }break;
            case StrengthType.Elite:{
                scale=0.75;
            }break;
            case StrengthType.Boss:{
                scale=1.2;
            }break;
        }
        return scale;
    }

    getWallAttackScale():number{
        let scale=1;
        switch(this.base_data.StrengthType){
            case StrengthType.Normal:{
                scale=0.6;
            }break;
            case StrengthType.Elite:{
                scale=0.9;
            }break;
        }
        return scale;
    }

    getXuanyunScale():number{
        let scale=0.3;
        switch(this.base_data.StrengthType){
            case StrengthType.Normal:{
                scale=0.55/this.setup_scale;
            }break;
            case StrengthType.Elite:{
                scale=0.75/this.setup_scale;
            }break;
            case StrengthType.Boss:{
                scale=1.5/this.setup_scale;
            }break;
        }
        return scale;
    }

    getStrengthType():StrengthType{
        return this.base_data.StrengthType;
    }

    getMonsterData():JsonMonsterGrowthAttributes{
        return this.monster_data;
    }

    /**计算伤害数据 */
    getInjuredData(gjData:GongJiData):InjuredData{
        let data=new InjuredData();
        if(this.getIsDie()){
            data.feedback_type=FeedBackType.Die;
            return data;
        }
        let gm=GameManager.getInstance();
        let missRate=0;        
        let critRate=0;
        //如果是普通攻击，计算闪避和暴击，默认为0
        let heroData=gjData.hero_data;
        //怪物的防御力
        let selfDefense=this.monster_data.Defense+this.ex_defense_value;
        let finalDefense=InjuredData.calcFinalDefense(selfDefense,heroData.ignore_defense_rate)
        if(gjData.damage_type==DamageType.Normal){
            if(this.isHaveBuff(BuffId.Boss2_MianYi_Attack))
            {
                data.feedback_type=FeedBackType.MainYi;
                data.text_type=Enemy_Injured_Type.WuDi;
                gm.hp_text_manager.createTypeText(cc.v2(this.node.x,this.node.y+60),Enemy_Injured_Type.WuDi,null);
                return data;
            }
            missRate=InjuredData.calcMissRate(this.monster_data.Miss,gjData.hero_data.Hit)+this.ex_miss_rate-gjData.hero_data.hit_ex;
            critRate=InjuredData.calcCritRate(gjData.hero_data.Critical,this.monster_data.AntiCritical);
            critRate+=gjData.hero_data.crit_ex;
            //获取一个概率类型
            let type=InjuredData.calcOnceType([missRate,critRate,1]);
            switch(type){
                case 0:{
                    //闪避
                    data.feedback_type=FeedBackType.ShanBi;
                    data.setDamageNum(0);
                    data.text_type=Enemy_Injured_Type.ShanBi;
                    gm.hp_text_manager.createTypeText(cc.v2(this.node.x,this.node.y+60),Enemy_Injured_Type.ShanBi,null);
                }break;
                case 1:{
                    //暴击
                    data.feedback_type=FeedBackType.BaoJi;
                    let damage=InjuredData.calcNormalCritDamageNum(heroData.total_attack,finalDefense,heroData.attack_increase_damage+heroData.all_increase_damage,this.jianshang_rate,InjuredData.calcFinalExtraCrit(heroData.ExtraCritical,this.monster_data.AntiExtraCritical));
                    data.setDamageNum(damage);
                    data.text_type=Enemy_Injured_Type.BaoJi;
                    if(gjData.pet_id==0){
                        GameManager.getInstance().all_hero.get(gjData.hero_type).onDamageMonster(DamageType.Normal,true,this.node);
                    }
                    if(!gm.is_show_text){
                        gm.hp_text_manager.createTypeText(cc.v2(this.node.x,this.node.y+60),data.text_type,null);
                    }
                }break;
                case 2:{
                    //普通命中
                    data.feedback_type=FeedBackType.Null;                 
                    let damage=InjuredData.calcNormalDamageNum(heroData.total_attack,finalDefense,heroData.attack_increase_damage+heroData.all_increase_damage,this.jianshang_rate);
                    data.setDamageNum(damage);
                    data.text_type=Enemy_Injured_Type.Normal_Attack;
                    if(gjData.pet_id==0){
                        GameManager.getInstance().all_hero.get(gjData.hero_type).onDamageMonster(DamageType.Normal,false,this.node);
                    }
                }break;
            }
        }else if(gjData.damage_type==DamageType.Skill){
            //不需要计算闪避，技能必中
            data.feedback_type=FeedBackType.Null;
            let damage=0;
            if(gjData.is_can_crit){
                critRate=InjuredData.calcCritRate(gjData.hero_data.Critical,this.monster_data.AntiCritical);
                critRate+=gjData.hero_data.crit_ex;
                //获取一个概率类型
                let type=InjuredData.calcOnceType([0,critRate,1]);
                if(type==1){
                    data.feedback_type=FeedBackType.BaoJi;
                    data.text_type=Enemy_Injured_Type.BaoJi;
                    damage=InjuredData.calcSkillCritDamageNum(heroData.total_attack,gjData.skill_damage_rate,finalDefense,heroData.skill_increase_damage+heroData.all_increase_damage,this.jianshang_rate,InjuredData.calcFinalExtraCrit(heroData.ExtraCritical,this.monster_data.AntiExtraCritical));
                    if(!gm.is_show_text){
                        gm.hp_text_manager.createTypeText(cc.v2(this.node.x,this.node.y+60),data.text_type,null);
                    }
                }else{
                    damage=InjuredData.calcSkillDamageNum(heroData.total_attack,gjData.skill_damage_rate,finalDefense,heroData.skill_increase_damage+heroData.all_increase_damage,this.jianshang_rate);
                }                
            }else{
                damage=InjuredData.calcSkillDamageNum(heroData.total_attack,gjData.skill_damage_rate,finalDefense,heroData.skill_increase_damage+heroData.all_increase_damage,this.jianshang_rate);
            }
            data.setDamageNum(damage);
            if(gjData.pet_id==0){
                GameManager.getInstance().all_hero.get(gjData.hero_type).onDamageMonster(DamageType.Skill,false,this.node);
            }
        }
        return data;
    }
    /**
     * 瞬间伤害
     * @param gjData 攻击类型
     * @returns 
     */
    beFlashInjured(gjData:GongJiData): InjuredData{
        let data=this.getInjuredData(gjData);        
        this.beDamage(data,gjData);
        return data;
    }

    private beContinuousInjured(gjData:GongJiData,floorNum:number=1) {
        if(gjData.continuous_damage_rate>0){
            //怪物的防御力
            let selfDefense=this.monster_data.Defense+this.ex_defense_value;
            let finalDefense=InjuredData.calcFinalDefense(selfDefense,gjData.hero_data.ignore_defense_rate)
            let heroData=gjData.hero_data;
            let data=new InjuredData();
            let damage=InjuredData.calcSkillDamageNum(heroData.total_attack,gjData.continuous_damage_rate,finalDefense,heroData.skill_increase_damage+heroData.all_increase_damage,this.jianshang_rate);
            data.text_type=Enemy_Injured_Type.ZhongDu;
            if(gjData.hero_type==Hero_Type.NvWu){
                damage=damage*floorNum;
            }
            data.setDamageNum(damage);
            this.beDamage(data,gjData);           
        }
    }
    /**造成真实伤害，直接造成对应的伤害值,无法闪避 */
    beRealDamage(gjData:GongJiData,damage:number):InjuredData{
        let data=new InjuredData();
        data.setDamageNum(damage);
        this.beDamage(data,gjData);        
        return data;
    }
    /**恢复生命值是否成功 */
    beHeal(num: number): boolean {
        if(this.getCurHp()>=this.getMaxHp()||this.getIsDie()==true){
            return false;
        }
        /**目前没有治疗效果加成，只有重伤，只计算重伤 */
        let newNum=num*(1-this.getMaxSeriously())        
        this.changeHp(newNum);
        GameManager.getInstance().hp_text_manager.createHpTextHp(this.getCenterPos(),newNum,Enemy_Injured_Type.ZhiLiao);
        return true;
    }

    private beDamage(data:InjuredData,gjData:GongJiData){
        if(this.getStrengthType()==StrengthType.Boss&&this.isHaveBuff(BuffId.Boss9_Skill_3_widu))
        {
            data.feedback_type=FeedBackType.MainYi;
            data.text_type=Enemy_Injured_Type.WuDi;
            GameManager.getInstance().hp_text_manager.createTypeText(cc.v2(this.node.x,this.node.y+60),Enemy_Injured_Type.WuDi,null);
            return ;
        }
        if(data.getDamageNum()>0){
            let gm= GameManager.getInstance();
            data.is_die=this.changeHp(-data.getDamageNum());
            if(gm.is_show_text&&data.getDamageNum()>0){
                gm.hp_text_manager.createHpTextHp(cc.v2(this.node.x,this.node.y+Math.random()*100),data.getDamageNum(),data.text_type);
            }        
            if(!data.is_die){
                this.startHurt();
            }
            //吸血效果
            if(gjData.hero_data.blood_sucking_rate>0&&data.getDamageNum()>0){
                let hp=InjuredData.calcBloodSucking(data.getDamageNum(),gjData.hero_data.blood_sucking_rate,gjData.hero_data.serious_injury_rate);
                if(hp>0){
                    WallManager.getInstance().getMainWall().changeHp(hp);
                }            
            }
            /**记录最高伤害 */
            gm.setMaxDamage(data.getDamageNum());
            gm.setMinDamage(data.getDamageNum());
            if(gjData.skill_release_id>0){
                SkillManager.getInstance().recordDamage(gjData.skill_release_id,data.getDamageNum());
                if(this.active_injury_callback){
                    this.active_injury_callback();
                }
            }
            /**记录DPS */
            switch(gjData.damage_type){
                case DamageType.Normal:{                    
                    gm.hero_attack_dps[gjData.hero_type]+=data.getDamageNum();
                }break;
                case DamageType.Skill:{                    
                    gm.hero_skill_dps[gjData.hero_type]+=data.getDamageNum();
                }break;
            }            
            // /**冰女额外真实伤害 */
            // if(SkillManager.getInstance().getBingNvSkill2()>0&&this.isHaveDeBuffType(BuffType.Slowdown)){
            //     let damage=data.getDamageNum()*SkillManager.getInstance().getBingNvSkill2();
            //     if(damage<1){
            //         damage=1;
            //     }
            //     this.changeHp(-damage);
            //     gm.hero_skill_dps[Hero_Type.BingNv]+=damage;
            //     if(gm.is_show_text){
            //         gm.hp_text_manager.createHpTextHp(cc.v2(this.node.x,this.node.y+32),damage,Enemy_Injured_Type.BingNvZhenShang);
            //     }
            // }
            // /**阿努比斯额外真实伤害 */
            // if(SkillManager.getInstance().getANuBiSiSkill2()>0){
            //     if(this.isHaveDeBuffType(BuffType.Slowdown)||this.isHaveDeBuffType(BuffType.Vertigo)){
            //         let damage=data.getDamageNum()*SkillManager.getInstance().getANuBiSiSkill2();
            //         if(damage<1){
            //             damage=1;
            //         }
            //         this.changeHp(-damage);
            //         gm.hero_skill_dps[Hero_Type.ANuBiSi]+=damage;
            //         if(gm.is_show_text){
            //             gm.hp_text_manager.createHpTextHp(cc.v2(this.node.x,this.node.y+32),damage,Enemy_Injured_Type.ANuBiSiZhenShang);
            //         }
            //         GroundManager.getInstance().createGameEffectById(GameEffectId.a_nu_bi_si_beidong_skill_2,this.node.getPosition());
            //     }
            // }
            /**德鲁伊额外真实伤害 */
            if(SkillManager.getInstance().getDeLuYiEx()&&this.isHaveDeBuff(BuffId.Hero_DeLuYi_Ex)){
                let damage=data.getDamageNum()*SkillManager.getInstance().getDeLuYiEx();
                if(damage<1){
                    damage=1;
                }
                this.changeHp(-damage);
                gm.hero_skill_dps[Hero_Type.DeLuYi]+=damage;
                if(gm.is_show_text){
                    gm.hp_text_manager.createHpTextHp(cc.v2(this.node.x,this.node.y+32),damage,Enemy_Injured_Type.Normal_Attack);
                }
            }
        }     
    }

    /**更改hp，返回是否死亡 */
    protected changeHp(num: number): boolean {
        if(this.getIsDie()||this.getEnemyState()==Enemy_State.born||GameManager.getInstance().cur_game_state!=GameState.Game_Playing)
        {
            return false;
        }
        let isDie=false;
        this.cur_hp+=num;
        if(GameManager.getInstance().cur_game_mode==GameMode.Boss_Challenge){
            if(this.base_data.StrengthType==StrengthType.Boss){
                if(this.cur_hp<=0){
                    this.cur_hp=1;
                }
                if(this.change_hp_callback){
                    this.change_hp_callback(num);
                }
                let useLevel=BossChallengeManager.getInstance().addScore(Math.abs(Math.round(num)));
                if(useLevel!=this.monster_level){
                    this.refreshData(useLevel);
                }
                return false;
            }
        }
        if(this.cur_hp<=0)
        {
            this.startDeath();
            isDie=true;
        }
        if(this.cur_hp>this.max_hp)
        {
            this.cur_hp=this.max_hp
        }
        // if(isDie==false&&GameManager.getInstance().cur_game_mode==GameMode.Maze){
        //     if(this.cur_hp<(this.max_hp*0.1)){
        //         if(MazeManager.getInstance().isHaveABuff([8003])){                
        //             this.changeHp(-this.cur_hp);
        //             GameEffectsManager.getInstance().createGameEffectForParent(GameEffectId.pet_21_active_3_liandao,cc.v2(0,200),this.node,()=>{
        //                 GameEffectsManager.getInstance().createGameEffectById(GameEffectId.pet_21_active_2_liandao_drop_hit,this.node.getPosition());
        //             });
        //         }
        //     }            
        // }
        if(this.change_hp_callback){
            this.change_hp_callback(num);
        }
        this.showHp();
        return isDie;
    }

    addBuff(buffData: BuffData): BuffTimer {
        if(this.monster_buff.has(buffData.buff_id)==false)
        {
            //添加buff节点和特效       
            let node:cc.Node=null;
            if(buffData.game_effect_id==GameEffectId.Null){
                node=new cc.Node(buffData.game_effect_id.toString());
                node.setPosition(this.juji_pos);
                this.node.addChild(node);
            }else{
                node=GameEffectsManager.getInstance().createGameEffectForParent(buffData.game_effect_id,this.juji_pos,this.node);
                node.scale=this.getSheShouAttackScale();
            }
            //添加buff
            let buff:BuffTimer=node.getComponent(BuffTimer);
            if(!buff){
                buff=node.addComponent(BuffTimer);
            }
            buff.init(buffData);
            //buff治疗触发时处理
            if(buffData.recovery_jiange_time>0){
                buff.addRecoveryListen({
                    doRecovery:(num:number)=>{
                        this.beHeal(num);
                    }
                },buff.getFirstBuffValue());
            }
            this.monster_buff.set(buffData.buff_id,buff);
            //buff销毁时处理
            buff.addDestroyListen(this.onBuffDestory.bind(this));
            switch(buffData.buff_type){
                case BuffType.MoveSpeedUp:{
                    this.refreshMoveSpeed(0);
                }break;
                case BuffType.AttSpeedUp:{
                    this.changeAttackSpeed(buffData.buff_value[0]);
                }break;
            }
            switch(buffData.buff_id){
                case BuffId.Boss9_Skill_1_guozai:{
                    this.zengshang_rate+=buffData.buff_value[0];
                    this.monster_data.Defense-=this.base_attribute_data.Defense*(buffData.buff_value[1]);
                }break;
                case BuffId.Boss10_Skill_4_kuangbao_gjl:{
                    this.monster_data.Attack+=this.base_attribute_data.Attack*(buffData.buff_value[0]);
                }break;
            }
            return buff;
        }else{
            //如果有buff，则刷新时间,重新计时
            let buff=this.monster_buff.get(buffData.buff_id);
            buff.refreshBuff(buffData);
            return buff;
        }
        
    }

    subBuff(buffId: BuffId): boolean {
        let buff=this.monster_buff.get(buffId);
        if(buff)
        {
            buff.destroySelf();
            return true;
        }
        return false;
    }

    onBuffDestory(buffData:BuffData){
        this.monster_buff.delete(buffData.buff_id);
        switch(buffData.buff_type){
            case BuffType.MoveSpeedUp:{
                this.refreshMoveSpeed(0);
            }break;
            case BuffType.AttSpeedUp:{
                this.changeAttackSpeed(-buffData.buff_value[0]);
            }break;
        }
        switch(buffData.buff_id){
            case BuffId.Boss9_Skill_1_guozai:{
                this.zengshang_rate-=buffData.buff_value[0];
                this.monster_data.Defense+=this.base_attribute_data.Defense*(buffData.buff_value[1]);
            }break;
            case BuffId.Boss10_Skill_4_kuangbao_gjl:{
                this.monster_data.Attack-=this.base_attribute_data.Attack*(buffData.buff_value[0]);
            }break;
        }
    }

    isHaveBuff(buffId: BuffId): boolean {
        return this.monster_buff.has(buffId);
    }

    getBuff(buffId: BuffId): BuffTimer {
        return this.monster_buff.get(buffId);
    }

    isHaveBuffType(buffType: BuffType): boolean {
        let isHave=false;
        this.monster_buff.forEach((buff:BuffTimer)=>{
            if(isHave==false && buff.getBuffType()==buffType){
                isHave=true;
            }
        })
        return isHave;
    }

    removeAllBuff(){
        this.monster_buff.forEach((buff:BuffTimer)=>{
            buff.destroySelf();
        })
    }

    addDeBuff(buffData:BuffData,gjData:GongJiData): BuffTimer {
        if(this.getIsDie()){
            return;
        }
        if(!this.isHaveDeBuff(buffData.buff_id))
        {
            //控制类的debuff需要根据韧性来实现具体的效果
            let buffType=buffData.buff_type;            
            switch(buffType){
                case BuffType.Vertigo:{
                    if(this.cur_toughness>=1){
                        GameManager.getInstance().hp_text_manager.createTypeText(cc.v2(this.node.x,this.node.y+60),Enemy_Injured_Type.MianYiKongZhi,null);
                        if(this.isHaveBuff(BuffId.Boss3_MianYi_KongZhi)){
                            this.getBuff(BuffId.Boss3_MianYi_KongZhi).addFloor();
                        }
                        return null;
                    }
                    if(gjData){
                        buffData.remain_time=InjuredData.calcControlTime(buffData.remain_time,this.cur_toughness,gjData.hero_data.insight);
                    }                    
                    switch(buffData.buff_id){
                        case BuffId.Hero_XuanYun:{
                            this.att_jishu=0;
                            if(this.xuanyun_callback){
                                this.xuanyun_callback(true);
                            }else{
                                this.spine.paused=true;
                            }
                        }break;
                        case BuffId.Hero_MeiMo_Active_MeiHuo:{                            
                            //魅惑对BOSS无效
                            if(this.getStrengthType()!=StrengthType.Boss){
                                this.att_jishu=0;
                                //走向英雄
                                let meimo=GameManager.getInstance().getHero(Hero_Type.MeiMo);
                                let mmPos=meimo.node.getPosition();
                                let offsetPos=mmPos.sub(this.node.getPosition());
                                let radian=Math.atan2(offsetPos.y,offsetPos.x);
                                this.setMoveDir(radian);
                                this.setEnemyState(Enemy_State.move);
                            }else{
                                return;
                            }
                        }break;                        
                    }
                    
                }break;
            }
            //添加buff节点和特效       
            let node:cc.Node=null;
            if(buffData.game_effect_id==GameEffectId.Null){
                node=new cc.Node(buffData.game_effect_id.toString());
                node.setPosition(this.juji_pos);
                this.node.addChild(node);
            }else{
                node=GameEffectsManager.getInstance().createGameEffectForParent(buffData.game_effect_id,this.juji_pos,this.node);
                node.scale=this.getSheShouAttackScale();                
            }
            //添加buff
            let buff:BuffTimer=node.getComponent(BuffTimer);
            if(!buff){
                buff=node.addComponent(BuffTimer);
            }
            buff.init(buffData);
            //buff销毁时处理
            buff.addDestroyListen(this.onDebuffDestory.bind(this));
            //buff伤害触发时处理
            if(buffData.damage_jiange_time>0&&gjData){
                buff.addDamageListen({
                    doDamage:(gjData:GongJiData)=>{
                        this.beContinuousInjured(gjData,buff.getFloorNum());
                    }
                },gjData);
            }
            this.monster_debuff.set(buffData.buff_id,buff);
            switch(buffType){
                case BuffType.Vertigo:{
                    node.scale=this.getXuanyunScale();
                }break;
                case BuffType.Slowdown:{
                    //处理一下减速buff
                    this.refreshMoveSpeed(this.hidden_attribute.slow_resistance);
                }break;
                case BuffType.Burst:{
                    //处理buff爆发
                    if(buffData.buff_id==BuffId.Hero_LeiShen_ChaoFuHe){
                        if(gjData)
                        buff.addBurstListen(buffData.buff_value[0],this.onBuffBurst.bind(this),gjData)
                    }
                }break;
            }
            switch(buffData.buff_id){
                case BuffId.Hero_ChangMaoShow_Skill:{
                    let scale=1/this.setup_scale;
                    node.scale=scale;
                    node.stopAllActions();
                    cc.tween(node).to(0.1,{scale:scale*1.1,opacity:255}).to(0.1,{scale:node.scale,opacity:128}).start();
                }break;
                case BuffId.Hero_MeiMo_Active_MeiHuo:{
                    this.refreshMoveSpeed(0);
                }break;
                case BuffId.Boss_Mode_JianShang:{
                    this.jianshang_rate+=buffData.buff_value[0];
                }break;
                case BuffId.Hero_NvWu_ExSkill_JianGongSu:{
                    this.changeAttackSpeed(-buffData.buff_value[0]);
                }break;
            }
            return buff;
        }else{
            let buff=this.monster_debuff.get(buffData.buff_id);
            buff.refreshBuff(buffData);
            switch(buffData.buff_id){
                case BuffId.Hero_ChangMaoShow_Skill:{
                    let node=this.monster_debuff.get(buffData.buff_id).node;
                    let scale=1/this.setup_scale;
                    node.scale=scale;
                    node.stopAllActions();
                    cc.tween(node).to(0.1,{scale:scale*1.1,opacity:255}).to(0.1,{scale:node.scale,opacity:128}).start();
                }break;
            }
            return buff;
        }
        return null;
    }

    /**
     * 去除一个debuff
     * @param buff debuff类型
     * @param isNeedRecycle 是否需要调用回收
     * @returns 
     */
    subDeBuff(buffId: BuffId): boolean {
        let buff=this.monster_debuff.get(buffId);
        if(buff)
        {
            buff.destroySelf();
            return true;
        }
        return false;
    }
    
    isHaveDeBuff(buffId: BuffId): boolean {
        return this.monster_debuff.has(buffId);
    }

    getDeBuff(buffId: BuffId): BuffTimer {
        return this.monster_debuff.get(buffId);
    }

    isHaveDeBuffType(buffType: BuffType): boolean {
        let isHave=false;
        this.monster_debuff.forEach((buff:BuffTimer)=>{
            if(isHave==false && buff.getBuffType()==buffType){
                isHave=true;
            }
        })
        return isHave;
    }
    
    removeAllDeBuff(){
        this.monster_debuff.forEach((v,k)=>{
            this.subDeBuff(v.getBuffId());
        })        
    }

    onDebuffDestory(buffData:BuffData){
        this.monster_debuff.delete(buffData.buff_id);  
        switch(buffData.buff_type){
            case BuffType.Vertigo:{
                switch(buffData.buff_id){
                    case BuffId.Hero_XuanYun:{
                        this.spine.paused=false;
                        if(this.xuanyun_callback){
                            this.xuanyun_callback(false);
                        }
                    }break;
                    case BuffId.Hero_MeiMo_Active_MeiHuo:{                            
                        //魅惑对BOSS无效,往下走
                        if(this.getStrengthType()!=StrengthType.Boss){
                            this.setMoveDir(Math.PI*3/2);
                            this.refreshMoveSpeed(0);
                        }else{
                            return;
                        }
                    }break;
                }
                               
            }break;
            case BuffType.Slowdown:{
                //处理一下减速buff
                this.refreshMoveSpeed(this.hidden_attribute.slow_resistance);
            }break;
        }
        switch(buffData.buff_id){
            case BuffId.Boss_Mode_JianShang:{
                this.jianshang_rate-=buffData.buff_value[0];
            }break;
            case BuffId.Hero_NvWu_ExSkill_JianGongSu:{
                this.changeAttackSpeed(+buffData.buff_value[0]);
            }break;
        }
    }

    onBuffBurst(buffData:BuffData,gjData:GongJiData){
        if(buffData.buff_id==BuffId.Hero_LeiShen_ChaoFuHe){
            GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_LeiGodSkill1);
            /**当敌人身上的超负荷达到5层时，会受到落雷攻击造成{参数1}伤害并击晕{参数2}秒 */
            let data=this.beFlashInjured(gjData);
            if(data.is_die==false&&data.getDamageNum()>0){
                //GroundManager.getInstance().createGameEffectById(GameEffectId.lei_shen_skill_ground,this.shadow.getPosition());
                let node=GameEffectsManager.getInstance().createGameEffectById(GameEffectId.lei_shen_skill_sky,this.shadow.getPosition());
                node.scaleX=0.8;
                node.scaleY=1;
                if(this.getStrengthType()!=StrengthType.Boss&&data.is_die==false){
                    let buffData=new BuffData();
                    buffData.buff_id=BuffId.Hero_XuanYun;
                    buffData.game_effect_id=GameEffectId.xuanyun;
                    buffData.buff_type=BuffType.Vertigo;
                    buffData.remain_time=gjData.hero_data.getSkillValue2(SkillType.Passive_2);
                    this.addDeBuff(buffData,gjData);
                }
            }
        }        
    }
    /**刷新移速,slowResistance:减速抗性 */
    private refreshMoveSpeed(slowResistance:number){
        //实际减速
        
        if(this.isHaveDeBuff(BuffId.Hero_MeiMo_Active_MeiHuo)){
            this.cur_move_speed=30;
        }else{
            let value=InjuredData.calcSlowDownNum(this.base_data.Speed+this.ex_move_speed_value,this.getMaxSlowDownValue(),slowResistance,this.getMaxSpeedUpValue());
            this.cur_move_speed=value;
            this.setColor(this.cur_move_speed<this.base_data.Speed?ColorType.SlowDown:ColorType.Null); 
        }
        if(this.getStrengthType()!=StrengthType.Boss)
        this.spine.timeScale=this.cur_move_speed/(this.base_data.Speed);
    }
    
    
    // /**刷新减速buff的处理 */
    // private refreshSlowdown(){
    //     //找出所有减速类型的buff
    //     let slowBuff=new Array<BuffTimer>();
    //     this.monster_debuff.forEach((v,k)=>{
    //         if(v.getBuffType()==BuffType.Slowdown){
    //             slowBuff.push(v);
    //         }
    //     });
    //     if(slowBuff.length>0){
    //         slowBuff.sort((a,b)=>{
    //             return b.getFirstBuffValue()-a.getFirstBuffValue();
    //         });
    //         let maxBuff=slowBuff[0];
    //         //实际减速
    //         let value=InjuredData.calcSlowDownNum(this.base_data.Speed,maxBuff.getFirstBuffValue(),this.hidden_attribute.slow_resistance,this.getMaxSpeedUpValue());
    //         this.cur_move_speed=value;
    //         this.setColor(ColorType.SlowDown);
    //     }else{
    //         this.cur_move_speed=this.base_data.Speed;
    //         this.setColor(ColorType.Null);
    //     }
    // }

    // /**刷新加速buff的处理 */
    // private refreshSpeedUp(){
    //     //找出所有加速类型的buff
    //     let speedBuff=new Array<BuffTimer>();
    //     this.monster_buff.forEach((v,k)=>{
    //         if(v.getBuffType()==BuffType.SpeedUp){
    //             speedBuff.push(v);
    //         }
    //     });
    //     if(speedBuff.length>0){
    //         speedBuff.sort((a,b)=>{
    //             return b.getFirstBuffValue()-a.getFirstBuffValue();
    //         });
    //         let maxBuff=speedBuff[0];
    //         //实际加速速
    //         let offsetValue=this.base_data.Speed*maxBuff.getFirstBuffValue();
    //         //let value=InjuredData.calcSlowDownNum(,maxBuff.getFirstBuffValue(),this.hidden_attribute.slow_resistance);
    //         this.cur_move_speed=this.cur_move_speed+offsetValue;
    //     }else{
    //         /**加减速需要处理，判断减速 */
    //         this.cur_move_speed=this.base_data.Speed;
    //     }        
    // }

    /**获得最大值的减速比率 */
    private getMaxSlowDownValue():number{
        //找出所有加速类型的buff
        let buff=new Array<BuffTimer>();
        this.monster_debuff.forEach((v,k)=>{
            if(v.getBuffType()==BuffType.Slowdown){
                buff.push(v);
            }
        });
        if(buff.length>0){
            buff.sort((a,b)=>{
                return b.getFirstBuffValue()-a.getFirstBuffValue();
            });
            let maxBuff=buff[0];
            return maxBuff.getFirstBuffValue();
        }
        return 0;
    }

    /**获得最大值的加速比率 */
    private getMaxSpeedUpValue():number{
        //找出所有加速类型的buff
        let speedBuff=new Array<BuffTimer>();
        this.monster_buff.forEach((v,k)=>{
            if(v.getBuffType()==BuffType.MoveSpeedUp){
                speedBuff.push(v);
            }
        });
        if(speedBuff.length>0){
            speedBuff.sort((a,b)=>{
                return b.getFirstBuffValue()-a.getFirstBuffValue();
            });
            let maxBuff=speedBuff[0];
            return maxBuff.getFirstBuffValue();
        }
        return 0;
    }

    /**设置攻速，每秒攻击次数 */
    private setAttackSpeed(numSec:number){
        if(numSec>10){
            numSec=10;
        }
        if(numSec<0.1){
            numSec=0.1;
        }
        this.att_jiange=1/numSec;
    }
    /**改变当前攻速,rate:比率 */
    protected changeAttackSpeed(rate:number){
        let gjsd=this.getAttackSpeed();        
        gjsd+=(rate)*(this.base_data.AttackSpeed);
        this.setAttackSpeed(gjsd);
    }
    /**获得当前攻速 */
    protected getAttackSpeed():number{
        return 1/this.att_jiange;
    }

    /**计算重伤，取最大 */
    protected getMaxSeriously():number{
        //找出所有重伤类型的buff
        let seriouslyBuff=new Array<BuffTimer>();
        this.monster_debuff.forEach((v,k)=>{
            if(v.getBuffType()==BuffType.SeriouslyInjured){
                seriouslyBuff.push(v);
            }
        });
        if(seriouslyBuff.length>0){
            seriouslyBuff.sort((a,b)=>{
                return b.getFirstBuffValue()-a.getFirstBuffValue();
            });
            let maxBuff=seriouslyBuff[0];
            return maxBuff.getFirstBuffValue();
        }
        return 0;
    }

    /********************************************************光环-开始********************************************************************* */
    addHalo(haloData:HaloData){
        if(!this.monster_halo.has(haloData.halo_id)){
            this.monster_halo.set(haloData.halo_id,haloData);
            switch(haloData.halo_id){
                case HaloId.Monster30_BianFu_Skill_Halo:{
                    this.ex_miss_rate+=haloData.halo_value[0];
                }break;
                case HaloId.Monster69_NiuSaMan_Skill_Halo:{
                    this.ex_defense_value+=haloData.halo_value[0];
                }break;
                case HaloId.Monster76_JianDuZhe_Skill_Halo:{
                    this.ex_move_speed_value+=this.base_data.Speed*(haloData.halo_value[0]);
                    this.refreshMoveSpeed(0);
                }break;
            }
        }        
    }

    getHalo(haloId:HaloId):HaloData{
        return this.monster_halo.get(haloId);
    }

    isHaveHalo(haloId:HaloId):boolean{
        return this.monster_halo.has(haloId);
    }

    subHalo(haloId:HaloId,uuid:string){
        let haloData=this.monster_halo.get(haloId);
        if(haloData){
            //只有同源才可以移除
            if(haloData.halo_source_uuid==uuid){
                this.monster_halo.delete(haloId);
                switch(haloId){
                    case HaloId.Monster30_BianFu_Skill_Halo:{
                        this.ex_miss_rate-=haloData.halo_value[0];
                        if(this.ex_miss_rate<0){
                            this.ex_miss_rate=0;
                        }
                    }break;
                    case HaloId.Monster69_NiuSaMan_Skill_Halo:{
                        this.ex_defense_value-=haloData.halo_value[0];
                        if(this.ex_defense_value<0){
                            this.ex_defense_value=0;
                        }
                    }break;
                    case HaloId.Monster76_JianDuZhe_Skill_Halo:{
                        this.ex_move_speed_value-=this.base_data.Speed*(haloData.halo_value[0]);
                        if(this.ex_move_speed_value<0){
                            this.ex_move_speed_value=0;
                        }
                        this.refreshMoveSpeed(0);
                    }break;
                }
            }            
        }        
    }

    removeAllHalo(){
        this.monster_halo.clear();
    }

    /********************************************************光环-结束********************************************************************* */

    getHiddenAttribute(){
        return this.hidden_attribute;
    }

    getIsDie():boolean
    {
        return this.monster_state==Enemy_State.die||this.monster_state==Enemy_State.ship;
    }

    getEnemyState():Enemy_State
    {
        return this.monster_state;
    }

    getEnemyPrevState():Enemy_State
    {
        return this.prev_state;
    }

    getIsCanCheck():boolean
    {
        let isCan=true;
        if(this.getIsDie() || this.node.y>=GameManager.getInstance().enemy_create_y  || this.getEnemyState()==Enemy_State.born)
        {
            isCan=false;
        }
        return isCan;
    }

    getToughness():number{
        return this.cur_toughness;
    }

    getMaxHp():number
    {
        return this.max_hp;
    }

    getCurHp():number
    {
        return this.cur_hp;
    }

    getCurAtt():number{
        return this.cur_att;
    }

    setColor(colorType:ColorType){
        let color=cc.Color.WHITE;
        if(this.isHaveDeBuffType(BuffType.Slowdown)){
            color=cc.color(82,255,252);
        }
        switch(colorType){
            case ColorType.Injured:{
                color=cc.Color.RED;
                let curColor=this.cur_color;
                if(curColor!=ColorType.Injured){
                    if(this.injured_action){
                        this.injured_action.stop();                        
                    }
                    this.injured_action=cc.tween(this.node).to(0.1,{color:this.node.color}).call(()=>{
                        this.setColor(curColor)
                    }).start();
                }
            }break;
            case ColorType.SlowDown:{
                color=cc.color(82,255,252);
            }break;        
        }
        this.cur_color=colorType;
        this.node.color=color;
    }

    getCurColor():ColorType{
        return this.cur_color;
    }

    getSlowDownColor():cc.Color{
        return cc.color(82,255,252);
    }

    getAttData(damageType:DamageType,isBullet:boolean,skillRate:number=0):MonsterAttData{
        let md=new MonsterAttData();
        md.damage_type=damageType;
        md.is_bullet=isBullet;
        md.skill_rate=skillRate;
        md.monster_attribute=this.monster_data;
        md.zengshang_rate=this.zengshang_rate;
        md.monster_ts=this;
        md.strength_type=this.getStrengthType();
        return md;
    }

    getIsFullHp():boolean
    {
        return this.cur_hp>=this.max_hp;
    }

    setEnemyState(type:Enemy_State)
    {
        if(type!=this.monster_state){
            this.prev_state=this.monster_state;
            this.monster_state=type;            
        }
        if(type==Enemy_State.att||type==Enemy_State.skill){
            this.spine.timeScale=(1/this.base_data.AttackSpeed)/this.att_jiange;
        }
        if(type==Enemy_State.move){
            if(this.getStrengthType()!=StrengthType.Boss){
                this.spine.timeScale=this.cur_move_speed/(this.base_data.Speed);
            }                
        }
    }

    startDeath(){
        this.setEnemyState(Enemy_State.die);
        this.collider.enabled=false;
        this.removeAllDeBuff();
        this.spine.paused=false;
        this.node.stopAllActions();
        this.is_can_count=this.is_count;
        MonsterManager.getInstance().willDestroyMonster(this);
        if(this.death_callback){
            this.death_callback();
        }
    }

    startHurt(){
        this.setColor(ColorType.Injured);                
    }

    /**
     * 
     * @param damage 伤害值
     * @param damageType 伤害类型
     */
    injureWall(data:MonsterAttData):InjuredData{
        return this.att_wall.beInjured(data);
    }

    /**
     * 播放一个骨骼动画
     * @param name 骨骼动画名称
     * @param isLoop 是否循环
     * @param data 是否监听关键帧，关键帧数据包含关键帧名称，监听到关键帧后的回调
     * @param endCallback 播放结束后的回调
     */
    playSpinAnimaton(name:string,isLoop:boolean=false,data?:KeyFrameData,endCallback?:Function){
        if(this.getEnemyState()==Enemy_State.die){
            return;
        }
        
        let anima=this.spine.setAnimation(0,name,isLoop);
        if(data){
            this.spine.setTrackEventListener(anima,(entry: sp.spine.TrackEntry, event) =>{
                if(event.data.name==data.name){
                    data.callback();
                }
            })
        }
        if(endCallback){
            this.spine.setTrackCompleteListener(anima,(entry: sp.spine.TrackEntry, event) =>{
                anima.listener=null;
                endCallback();
            })
        }
    }

    playDeadAnimaton(name:string,endCallback:Function){
        let anima=this.spine.setAnimation(0,name,false);
        this.spine.setTrackCompleteListener(anima,(entry: sp.spine.TrackEntry, event) =>{
            anima.listener=null;
            endCallback();
        })
    }
    /**设置X坐标，返回偏左还是偏右了,-1:偏左，0：正常，1：偏右 */
    setX(disX:number):number{
        let leftRight=0;
        if(disX>300)
        {
            disX=300;
            leftRight=1;
        }
        if(disX<-300)
        {
            disX=-300;
            leftRight=-1;
        }
        this.node.x=disX;
        return leftRight;
    }

    setY(disY:number){
        this.node.y=disY;
        //不能穿过城墙
        let walls=WallManager.getInstance().getAllWall();
        walls.forEach((wall:Wall,wallType:WallType)=>{
            //检查城墙
            let rect=wall.getWallRect();
            if(rect.contains(this.node.getPosition())){
                if(this.node.y>wall.node.y){
                    this.node.y=rect.yMax;
                }
                if(this.node.y<wall.node.y){
                    this.node.y=rect.yMin;
                }
            }
        })

        let mainWall=WallManager.getInstance().getMainWall();
        let mainRect=mainWall.getWallRect();

        if(mainRect.contains(this.node.getPosition())){
            if(this.node.y>mainWall.node.y){
                this.node.y=mainRect.yMax;
            }
            if(this.node.y<mainWall.node.y){
                this.node.y=mainRect.yMin;
            }
            this.onCollisionShip();
        }
        if(this.node.y<mainRect.yMin){
           
        }
        if(this.node.y<=mainRect.yMin-200){
            this.node.y=mainRect.yMin-200;
            if(this.monster_state!=Enemy_State.ship){
                MonsterManager.getInstance().ship_monster_num++;
                
                
                this.setEnemyState(Enemy_State.ship);
                MonsterManager.getInstance().upShipMonster();
            }
        }
    }
    private onCollisionShip(){
        let md=new MonsterAttData();
        md.damage_type=DamageType.Ship;
        md.is_bullet=false;
        md.skill_rate=0;
        md.monster_attribute=this.monster_data;
        md.zengshang_rate=this.zengshang_rate;
        md.monster_ts=this;
        md.strength_type=this.getStrengthType()
        WallManager.getInstance().getMainWall().beInjured(md,false,this.getCurHp()*0.5)
        this.changeHp(-9999999999);
    }
    setPos(pos:cc.Vec2){
        this.setX(pos.x);
        this.setY(pos.y);
    }

    setMoveDir(dir:number){
        this.move_direction=dir;
    }

    setQianYinMin(num:number){
        if(this.min_qianyin==0)
        this.min_qianyin=num;
    }

    getQianYinMin():number{
        return this.min_qianyin;
    }
    /**设置翻转 */
    setFlip(isRight:boolean){
        this.node.scaleX=isRight?this.setup_scale:-this.setup_scale;
    }
    //隐藏阴影
    hidShadow(){
        this.shadow.opacity=0;
    }
    update(dt)
    {        
        if(this.hp_progress)
        {
            this.hp_progress.setPos(this.node.x+this.hp_pos.x*this.node.scaleX,this.node.y+this.hp_pos.y*this.node.scaleY);
        }
        if(this.shadow){
            this.shadow.setPosition(cc.v2(this.node.x+this.node.scaleX*this.shadow_pos.x,this.node.y+this.node.scaleY*this.shadow_pos.y));
        }
        this.node.zIndex=(Math.round(8000-this.node.y*10));
        if(this.getEnemyState()!=Enemy_State.born&&this.getStrengthType()!=StrengthType.Boss){
            this.collider.enabled=true;
        }
        if(this.node.y>=GameManager.getInstance().enemy_create_y){
            this.setMoveDir(Math.PI*3/2);
        }
        //TEST
        // if(this.getEnemyState()==Enemy_State.move){
        //     let allMonster=MonsterManager.getInstance().node.children;
        //     let len=allMonster.length;
        //     for(let i=0; i<len; i++){
        //         let monster=allMonster[i].getComponent(Monster);
        //         if(monster&&monster.uuid!=this.uuid){
        //             //判断距离
        //             let otherPos=monster.getCenterPos();
        //             let selfPos=this.getCenterPos();
        //             let distance=(otherPos.sub(selfPos).mag());
        //             if(distance<=50){
        //                 //交集了
        //                 //上面的走切线，下面的垂直走下
        //                 if(selfPos.y>otherPos.y){
        //                     let newDir=this.move_direction+Math.PI/2;
        //                     if( newDir <=Math.PI && newDir>=0){
        //                         newDir=this.move_direction-Math.PI/2
        //                     }
        //                     this.move_direction=newDir;
        //                 }else if(selfPos.y<otherPos.y){
        //                     this.move_direction=Math.PI*3/2;
        //                 }else{
        //                     this.move_direction=Math.PI*3/2;
        //                 }
        //             }
        //             // else{
        //             //     this.move_direction=Math.PI*3/2;
        //             // }
        //         }
        //     }
        // }
    }

    /**--------------------------------------添加回调监听------------------------------------------------------ */
    addInitListen(callback:Function){
        this.init_callback=callback;
    }
    addChangeHpListen(callback:Function){
        this.change_hp_callback=callback;
    }
    addXuanYunListen(callback:Function){
        this.xuanyun_callback=callback;
    }
    addDeathCallback(callback:Function){
        this.death_callback=callback;
    }    
    addInjuryCallback(callback:Function){
        this.active_injury_callback=callback;
    }

    /**--------------------------------------获得每种怪物不同的数据 --------------------------------------------*/

    private loadInitPos()
    {
        //获取完数据就删除了
        let juji=this.node.getChildByName('juji');
        this.juji_pos=juji.getPosition();
        let gongji=this.node.getChildByName('gongji');
        this.att_pos=gongji.getPosition();
        let hp=this.node.getChildByName('hp');
        this.hp_pos=hp.getPosition();
        let shadowNode=this.node.getChildByName('Monster_Shadow');
        this.shadow_pos=shadowNode.getPosition();
        this.shadow_size=shadowNode.getContentSize();
        let center=this.node.getChildByName('center');
        this.center_pos=center.getPosition();
        //cc.log(this.shadow_size);

        juji.removeFromParent();
        gongji.removeFromParent();
        hp.removeFromParent();
        shadowNode.removeFromParent();
        center.removeFromParent();
        if(this.shadow){            
            this.shadow.setPosition(cc.v2(this.node.x+this.node.scaleX*this.shadow_pos.x,this.node.y+this.node.scaleY*this.shadow_pos.y));
        }
    }

    getAttPos():cc.Vec2{
        let pos=cc.v2(0,128);
        switch(this.monster_type){
            case 20: pos=cc.v2(0,128);break;
            default: pos=this.att_pos;break;
        }
        let disPos=this.node.getPosition().add(cc.v2(pos.x*this.node.scaleX,pos.y*this.node.scaleY));
        return disPos;
    }

    getJuJiPos():cc.Vec2
    {
        return cc.v2(this.node.x+this.juji_pos.x*this.node.scaleX,this.node.y+this.juji_pos.y*this.node.scaleY);
    }

    getSheShouPos():cc.Vec2
    {
        return cc.v2(this.node.x+this.juji_pos.x*this.node.scaleX,this.node.y+this.juji_pos.y*this.node.scaleY);
    }

    getCenterPos():cc.Vec2{
        return cc.v2(this.node.x+this.center_pos.x*this.node.scaleX,this.node.y+this.center_pos.y*this.node.scaleY);
    }

    /**获得攻击城墙的X坐标，动作不一样导致攻击的X坐标不一致 */
    getAttackWallX(){
        return this.att_pos;
    }
}
