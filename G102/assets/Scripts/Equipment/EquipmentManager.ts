

import { EquipmentAttributeManager} from "./Data/EquipmentAttribute";
import { AssetsEventType, EventManager } from "../Tools/EventManager";
import { StorageKey } from "../Storage/StorageConfig";
import { TheStorageManager } from "../Storage/StorageManager";
import { EquipmentMergeManager } from "./Data/EquipmentMerge";
import EquipItem from "./Ui/EquipItem";
import LanguageManager from "../multiLanguage/LanguageManager";
import { PropAction, PropId } from "../Prop/PropConfig";
import { CostData, EquipInfo, EquipType } from "./EquipConfig";
import { PropManager } from "../Prop/PropManager";
import { Hero_Type } from "../Hero/Game/HeroConfig";
import { EquipmentLevelUpCostManager } from "./Data/EquipmentLevelUpCost";
import MyTool from "../Tools/MyTool";
import { CombatEffectivenessManager } from "../Hero/Data/CombatEffectiveness";
import { HeroManager } from "../Hero/Data/HeroManager";

export class EquipmentManager {

    private static _instance: EquipmentManager = null;
    //资源
    private item_equip:cc.Prefab=null;
    private item_sale_equip:cc.Prefab=null;
    private sprite_atlas:cc.SpriteAtlas=null;

    public static getInstance():EquipmentManager {
        if(this._instance==null) {
            this._instance=new EquipmentManager();
            console.log("EquipmentManager null");
            this._instance.init();
        }
        return this._instance;
    }

    //初始化游戏数据
    private init () {
        EquipmentAttributeManager.getInstance();
        EquipmentMergeManager.getInstance();
        EquipmentLevelUpCostManager.getInstance();
        CombatEffectivenessManager.getInstance();
        this.loadPrefab();
        this.loadSalePrefab();
        this.loadSp();
        //this.loadEquipmentList();
    }
    //-----------------------资源的读取-----------------------------
    public loadPrefab(){
        cc.resources.load('equipment/equipItem',cc.Prefab,(error: Error, assets:cc.Prefab)=>{
            if(error)
            {
                console.log(error);
                return;
            }
            console.log('加载prefab_equip成功');
            assets.addRef();
            this.item_equip=assets;
            //cc.resources.release("equipment/equipItem",cc.Prefab);
        });
    }

    public loadSalePrefab(){
        cc.resources.load('equipment/saleEquipment',cc.Prefab,(error: Error, assets:cc.Prefab)=>{
            if(error)
            {
                console.log(error);
                return;
            }
            console.log('加载prefab_saleEquipment成功');
            assets.addRef();
            this.item_sale_equip=assets;
            //cc.resources.release("equipment/equipItem",cc.Prefab);
        });
    }

    private loadSp(){
        if(this.sprite_atlas)
        return;
        cc.resources.load('equipment/equipment',cc.SpriteAtlas,(error: Error, assets:cc.SpriteAtlas)=>{
            if(error)
            {
                console.log(error);
                return;
            }
            assets.addRef();
            //console.log('加载EquipmentAttribute成功');
            this.sprite_atlas=assets;            
        });
    }

    public getSpriteFrameByName(key:string):cc.SpriteFrame{
        return this.sprite_atlas.getSpriteFrame(key);
    }
    /**根据装备信息获得一个装备节点 */
    public getEquipNodeByInfo(equipInfo:EquipInfo,pAc:PropAction=PropAction.Look,heroType:Hero_Type=Hero_Type.NULL):cc.Node{
        let item=cc.instantiate(this.item_equip);
        item.getComponent(EquipItem).init(heroType,equipInfo,pAc);
        return item;
    }
    /**根据装备ID获得一个装备节点 */
    public getEquipNodeById(equipId:number,pAc:PropAction=PropAction.Look,heroType:Hero_Type=Hero_Type.NULL):cc.Node{
        let item=cc.instantiate(this.item_equip);
        let equipInfo=new EquipInfo();
        equipInfo.equip_id=equipId;
        equipInfo.equip_num=1;
        item.getComponent(EquipItem).init(heroType,equipInfo,pAc);
        // console.log("+++",item)
        return item;
    }

    public getSaleEquipNodeById(equipId:number,pAc:PropAction=PropAction.Look,heroType:Hero_Type=Hero_Type.NULL):cc.Node{
        let item=cc.instantiate(this.item_sale_equip);
        let equipInfo=new EquipInfo();
        equipInfo.equip_id=equipId;
        equipInfo.equip_num=1;
        item.getComponent(EquipItem).init(heroType,equipInfo,pAc);
        return item;
    }

    //-----------------------数据保存与读取----------------------------
    //筛选出没有被英雄装备的列表
    screeningEquipmentList(equipList:EquipInfo[]){
        let len=equipList.length;        
        let HM=HeroManager.getInstance();
        for(let i=0; i<len; i++){
            let equipInfo=equipList[i];
            let heroList=HM.getWearEquipmentHeroList(equipInfo);
            equipInfo.equip_num-=heroList.length;
        }
    }
    /**
     * 检测是否可以合成
     * @param equipId 装备id
     * @param costList 返回能合成的列表
     * @returns 是否能合成
     */
    public checkAEquipMerge(equipId:number,costList:CostData[]):boolean{

        let type=EquipmentAttributeManager.getInstance().getEquipmentPosition(equipId);
        let list=PropManager.getInstance().getEquipmentList(type);
        this.screeningEquipmentList(list);
        let costId=EquipmentMergeManager.getInstance().getCostId(equipId);
        if(costId==0){
            return false;
        }
        let costNum=EquipmentMergeManager.getInstance().getCostNumber(costId);
        let isCan=this.findEquipMerge(list,costId,costNum-1,costList);
        return isCan;
    }
    /**
     * 
     * @param list 现有的装备列表
     * @param costId 消耗的id
     * @param costNum 消耗的数量
     * @param costList 消耗存放的列表
     * @returns 是否可以满足合成条件
     */
    private findEquipMerge(list:EquipInfo[],costId:number,costNum:number,costList:CostData[]):boolean{
        let len=list.length;        
        let haveNum=0;
        for(let i=0; i<len; i++){
            let equipInfo=list[i];
            if(equipInfo.equip_id==costId){//&&equipInfo.equip_level<=1               
                haveNum=equipInfo.equip_num;
                if(haveNum>=costNum){
                    break;
                }
            }
        }
        if(haveNum>=costNum){
            let costData=new CostData();
            costData.cost_id=costId;
            costData.cost_num=costNum;
            costList.push(costData);
            return true;
        }else{
            if(haveNum>0){
                let costData=new CostData();
                costData.cost_id=costId;
                costData.cost_num=haveNum;
                costList.push(costData);
            }            
            let newCostId=EquipmentMergeManager.getInstance().getCostId(costId);
            if(newCostId==0){
                return false;
            }
            let newCostNum=EquipmentMergeManager.getInstance().getCostNumber(costId);
            return this.findEquipMerge(list,newCostId,(costNum-haveNum)*newCostNum,costList);
        }
    }    
    /**检查是否可以装备最好的装备,isWear：是否直接穿戴*/
    checkQuickWear(heroType:Hero_Type,isWear:boolean):boolean
    {
        let isOK=false;
        for(let i=EquipType.WuQi; i<EquipType.Num; i++)
        {
            //当前装备的  
            let wearId=HeroManager.getInstance().getWearEquipment(heroType,i);
            let eam=EquipmentAttributeManager.getInstance();
            let equipList=PropManager.getInstance().getEquipmentList(i);
            if(wearId!=0)
            {
                //获取穿戴装备的等级
                let wearLevel=eam.getStage(wearId);
                let len=equipList.length;
                for(let n=0; n<len; n++)
                {
                    let equipInfo=equipList[n];
                    let level=eam.getStage(equipInfo.equip_id)
                    if(level>wearLevel)
                    {                        
                        //没有被其他人穿戴过
                        let num=HeroManager.getInstance().getEquipmentRemainNum(equipInfo);
                        if(num>0){                            
                            if(isWear){
                                HeroManager.getInstance().addWearEquipment(heroType,equipInfo.equip_id);
                                isOK=true;
                                break;
                            }else{
                                return true;
                            }
                        }
                    }
                }
            }else{
                let len=equipList.length;
                if(len>0){
                    for(let n=0; n<len; n++)
                    {
                        let equipInfo=equipList[n];
                        //没有被其他人穿戴过
                        let num=HeroManager.getInstance().getEquipmentRemainNum(equipInfo);
                        if(num>0){                            
                            if(isWear){
                                HeroManager.getInstance().addWearEquipment(heroType,equipInfo.equip_id);
                                isOK=true;
                                break;
                            }else{
                                return true;
                            }
                        }
                    }
                }
            }
        }
        if(isWear&&isOK){
            EventManager.postAssetsEvent(AssetsEventType.EQUIP_WEAR_UNLOAD);
        }
        return isOK;
    }

    /**检查是否可以装备最好的装备,isWear：是否直接穿戴*/
    checkWear(heroType:Hero_Type,type:EquipType):boolean
    {
        let isOK=false;
        //当前装备的  
        let wearId=HeroManager.getInstance().getWearEquipment(heroType,type);
        let eam=EquipmentAttributeManager.getInstance();
        if(wearId!=0)
        {
            //获取穿戴装备的等级
            let wearLevel=eam.getStage(wearId);
            let equipList=PropManager.getInstance().getEquipmentList(type);
            let len=equipList.length;
            for(let n=0; n<len; n++)
            {
                let equipInfo=equipList[n];
                let level=eam.getStage(equipInfo.equip_id)
                if(level>wearLevel)
                {                        
                    //没有被其他人穿戴过
                    let num=HeroManager.getInstance().getEquipmentRemainNum(equipInfo);
                    if(num>0){                        
                        isOK=true;
                        break;
                    }
                }
            }
        }else{
            let equipList=PropManager.getInstance().getEquipmentList(type);
            let len=equipList.length;
            if(len>0){
                for(let n=0; n<len; n++)
                {
                    let equipInfo=equipList[n];
                    //没有被其他人穿戴过
                    let num=HeroManager.getInstance().getEquipmentRemainNum(equipInfo);
                    if(num>0){                        
                        isOK=true;
                        break;
                    }
                }
            }
        }
        return isOK;
    }

    /* *检查是否可以一键脱装*/
    checkQuickUnload(heroType:Hero_Type,isUnload:boolean):boolean
    {
        let isOK=false;
        for(let i=EquipType.WuQi; i<EquipType.Num; i++)
        {
            //当前装备的  
            let wearInfo=HeroManager.getInstance().getWearEquipment(heroType,i);
            if(wearInfo)
            {
                if(isUnload){
                    HeroManager.getInstance().unloadWearEquipment(heroType,i);
                    isOK=true;
                    continue;
                }else{
                    return true;
                }
            }
        }
        if(isUnload&&isOK){
            EventManager.postAssetsEvent(AssetsEventType.EQUIP_WEAR_UNLOAD);
        }
        return isOK;
    }
    //----------------装备序列id--------------
    public getEquipSequenceId():number
    {
        let num=this.getEquipNum();
        /**拼接时间戳+装备递增数 */
        let nowTime=new Date().getTime();
        let weiShu=1;
        let newNum=num;
        //求数量的位数
        while(Math.floor(newNum/10)>=1){
            weiShu++;
            newNum/=10;
        }
        let t1=nowTime.toString().substring(weiShu);
        let id=parseInt(t1+num);
        return id;
    }

    private getEquipNum():number{
        let num=TheStorageManager.getInstance().getInt(StorageKey.EquipNum,1);
        return num;
    }

    private addEquipNum(){
        TheStorageManager.getInstance().setItem(StorageKey.EquipNum,this.getEquipNum()+1);
    }

    public saveMergeNum(num)
    {
        cc.sys.localStorage.setItem('merge_num',num);
    }
    /**根据装备位获取装备名称 */
    public getEquipName(posType:number):string{
        let textId=4001;
        switch(posType){
            case 1:{
                textId=4001;
            }break;
            case 2:{
                textId=4002;
            }break;
            case 3:{
                textId=4003;
            }break;
        }
        return LanguageManager.getInstance().getStrByTextId(textId);
    }

    /***********************************************战力获取**************************************************** */
    getEquipZhanLi(equipId:number):number{
        // let jsonAttribute=EquipmentAttributeManager.getInstance().getJsonEquipmentAttribute(this.equip_id);
        //装备和宠物：战斗力=0.5*生命值+10*（攻击力+防御力）+（命中+闪避+暴击+防爆）*295.3+（暴击增幅+暴击抗性）*251000

        let attributes=this.getAttributesadditional(equipId)
        let zhanli=(attributes[2]*CombatEffectivenessManager.getInstance().getConversionFactor(1))+(attributes[0]*CombatEffectivenessManager.getInstance().getConversionFactor(2))+(attributes[1]*CombatEffectivenessManager.getInstance().getConversionFactor(3))//0.5*jsonAttribute.BaseHealth+10//*(this.getAtt()+jsonAttribute.BaseDefense)
        zhanli=Number(MyTool.numberFormat(zhanli,0));
        // 1.英雄界面战斗力=生命值*生命值系数+攻击力*攻击力系数+防御力*防御力系数+命中值*命中系数+闪避值*闪避值系数+（暴击值-100）*暴击值系数+防暴值*防暴值系数+（暴击增幅-2）*暴击增幅系数+暴击抗性*暴击抗性系数
        // 2.装备战斗力=生命值*生命值系数+攻击力*攻击力系数+防御力*防御力系数
        // 3.总战斗力=当前上阵英雄的战斗力总和
        return zhanli;
    }
    /**获得装备属性加上额外属性值    
     * 攻击力 0
     * 防御力 1 
     * 生命值 2
     * */    
    getAttributesadditional(equipId:number):number[]{
        let Attributes=this.getAttributes(equipId)
        // let jsonAttribute=EquipmentAttributeManager.getInstance().getJsonEquipmentAttribute(this.equip_id);
        // let dditional=[0,0,0,0,0,0,0,0,0,0]
        // 1：生命值
        // 2：攻击力
        // 3：防御力
        // 4：命中值
        // 5：闪避值
        // 6：暴击值
        // 7：防爆值
        // 8：暴击增幅
        // 9：暴击抗性
        // 10：额外攻速
        // let BaseAttack=jsonAttribute.BaseAttack//基础攻击力
        // let BaseDefense=jsonAttribute.BaseDefense//基础防御力
        // let BaseHealth=jsonAttribute.BaseHealth//基础生命值
        // let GrowthAttack=EquipmentAttributeManager.getInstance().getGrowthAttack(this.equip_id)//成长攻击值
        // let GrowthDefense=EquipmentAttributeManager.getInstance().getGrowthDefense(this.equip_id)//成长防御力
        // let GrowthHealth=EquipmentAttributeManager.getInstance().getGrowthHealth(this.equip_id)//成长生命值
        // let zhuangbeiPos=EquipmentAttributeManager.getInstance().getEquipmentPosition(this.equip_id)//装备位置
        // for (let Qualityindex = 1; Qualityindex < 7; Qualityindex++) {
        //     let id=EquipmentAttributeManager.getID(zhuangbeiPos,Qualityindex)
        //     if(Qualityindex<=jsonAttribute.Quality){
        //         let leix=EquipmentAttributeManager.getInstance().getExtraAttributeType(id)
        //         if(leix==1){
        //             Attributes[2]+=EquipmentAttributeManager.getInstance().getExtraAttributeValue(id)
        //         }
        //         if(leix==2){
        //             Attributes[0]+=EquipmentAttributeManager.getInstance().getExtraAttributeValue(id)
        //         }
        //         if(leix==3){
        //             Attributes[1]+=EquipmentAttributeManager.getInstance().getExtraAttributeValue(id)
        //         }
        //     }
        // }
        // //装备属性=成长属性*装备等级+装备基础属性
        return Attributes
    }
    /**获得总攻击力 */
    getAtt(equipId:number):number{
        let jsonAttribute=EquipmentAttributeManager.getInstance().getJsonEquipmentAttribute(equipId);
        let BaseAttack=jsonAttribute.BaseAttack//基础攻击力
        // let GrowthAttack=EquipmentAttributeManager.getInstance().getGrowthAttack(this.equip_id)//成长攻击值
        // let zhuangbeiPos=EquipmentAttributeManager.getInstance().getEquipmentPosition(this.equip_id)//装备位置
        // for (let Qualityindex = 1; Qualityindex < 7; Qualityindex++) {
        //     let id=EquipmentAttributeManager.getID(zhuangbeiPos,Qualityindex)
        //     if(Qualityindex<=jsonAttribute.Quality){
        //         GrowthAttack+=EquipmentAttributeManager.getInstance().getGrowthAttack(id)
        //     }
        // }
        //装备属性=成长属性*装备等级+装备基础属性
        let attack=Number(MyTool.numberFormat(BaseAttack,0))
        return attack
    }
    /**获得总防御力 */
    getDefense(equipId:number):number{
        let jsonAttribute=EquipmentAttributeManager.getInstance().getJsonEquipmentAttribute(equipId);
        let BaseDefense=jsonAttribute.BaseDefense//基础防御力
        // let GrowthDefense=EquipmentAttributeManager.getInstance().getGrowthDefense(this.equip_id)//成长防御力
        // let zhuangbeiPos=EquipmentAttributeManager.getInstance().getEquipmentPosition(this.equip_id)//装备位置
        // for (let Qualityindex = 1; Qualityindex < 7; Qualityindex++) {
        //     let id=EquipmentAttributeManager.getID(zhuangbeiPos,Qualityindex)
        //     if(Qualityindex<=jsonAttribute.Quality){
        //         GrowthDefense+=EquipmentAttributeManager.getInstance().getGrowthDefense(id)
        //     }
        // }
        //装备属性=成长属性*装备等级+装备基础属性
        let attack=Number(MyTool.numberFormat(BaseDefense,0))
        return attack
    }
    /**获得总生命值 */
    getHealth(equipId:number):number{
        let jsonAttribute=EquipmentAttributeManager.getInstance().getJsonEquipmentAttribute(equipId);
        let BaseHealth=jsonAttribute.BaseHealth//基础生命值
        // let GrowthHealth=EquipmentAttributeManager.getInstance().getGrowthHealth(this.equip_id)//成长生命值
        // let zhuangbeiPos=EquipmentAttributeManager.getInstance().getEquipmentPosition(this.equip_id)//装备位置
        // for (let Qualityindex = 1; Qualityindex < 7; Qualityindex++) {
        //     let id=EquipmentAttributeManager.getID(zhuangbeiPos,Qualityindex)
        //     if(Qualityindex<=jsonAttribute.Quality){
                // GrowthHealth+=EquipmentAttributeManager.getInstance().getGrowthHealth(id)
        //     }
        // }
        //装备属性=成长属性*装备等级+装备基础属性
        let attack=Number(MyTool.numberFormat(BaseHealth,0))
        return attack
    }
    /**获得装备属性 
     * 攻击力 0
     * 防御力 1 
     * 生命值 2
     * */    
    getAttributes(equipId:number):number[]{
        let jsonAttribute=EquipmentAttributeManager.getInstance().getJsonEquipmentAttribute(equipId);
        let BaseAttack=jsonAttribute.BaseAttack//基础攻击力
        let BaseDefense=jsonAttribute.BaseDefense//基础防御力
        let BaseHealth=jsonAttribute.BaseHealth//基础生命值
        // let GrowthAttack=EquipmentAttributeManager.getInstance().getGrowthAttack(this.equip_id)//成长攻击值
        // let GrowthDefense=EquipmentAttributeManager.getInstance().getGrowthDefense(this.equip_id)//成长防御力
        // let GrowthHealth=EquipmentAttributeManager.getInstance().getGrowthHealth(this.equip_id)//成长生命值
        // let zhuangbeiPos=EquipmentAttributeManager.getInstance().getEquipmentPosition(this.equip_id)//装备位置
        // for (let Qualityindex = 1; Qualityindex < 7; Qualityindex++) {
        //     let id=EquipmentAttributeManager.getID(zhuangbeiPos,Qualityindex)
        //     if(Qualityindex<=jsonAttribute.Quality){
        //         GrowthAttack+=EquipmentAttributeManager.getInstance().getGrowthAttack(id)
        //         GrowthDefense+=EquipmentAttributeManager.getInstance().getGrowthDefense(id)
        //         GrowthHealth+=EquipmentAttributeManager.getInstance().getGrowthHealth(id)
        //     }
        // }
        // let BaseAttacks=Number(MyTool.numberFormat(GrowthAttack*this.equip_level+BaseAttack,0))
        // let BaseDefenses=Number(MyTool.numberFormat(GrowthDefense*this.equip_level+BaseDefense,0))
        // let BaseHealths=Number(MyTool.numberFormat(GrowthHealth*this.equip_level+BaseHealth,0))
        //装备属性=成长属性*装备等级+装备基础属性
        let BaseAttacks=Number(MyTool.numberFormat(BaseAttack,0))
        let BaseDefenses=Number(MyTool.numberFormat(BaseDefense,0))
        let BaseHealths=Number(MyTool.numberFormat(BaseHealth,0))
        let attack=[BaseAttacks,BaseDefenses,BaseHealths]
        return attack
    }
}
