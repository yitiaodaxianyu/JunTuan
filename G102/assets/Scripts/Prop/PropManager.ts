import { HttpManager, Params_Type, AccessName, PropObject } from ".././NetWork/HttpManager";
import { EquipmentAttributeManager } from "../Equipment/Data/EquipmentAttribute";
import { EquipInfo, EquipType } from "../Equipment/EquipConfig";
import { EquipmentManager } from "../Equipment/EquipmentManager";
import GameManager from "../GameManager";
import { HeroManager } from "../Hero/Data/HeroManager";
import { Hero_Type } from "../Hero/Game/HeroConfig";
import { Follow_Type } from "../multiLanguage/FollowConstants";
import FollowManager from "../multiLanguage/FollowManager";
import LanguageManager from "../multiLanguage/LanguageManager";
import { PetInfo, PetMessage, PetType } from "../Pet/PetConfig";
import { PetManager } from "../Pet/PetManager";
import { StorageKey } from "../Storage/StorageConfig";
import { TheStorageManager } from "../Storage/StorageManager";
import { AssetsEventType, EventManager, RedEventString, RedEventType } from "../Tools/EventManager";
import UserData from "../UserData";
import { ItemManager } from "./Data/Item";
import Prop from "./Prop";
import { PropAction, PropData, PropId } from "./PropConfig";


export class PropManager {
    private static _instance: PropManager = null;

    //道具数据
    private map_prop_num:Map<number,number>=null;
    //资源
    private prop_item:cc.Prefab=null;
    private prop_sale_item:cc.Prefab=null;
    private item_atlas:cc.SpriteAtlas=null;


    public static getInstance():PropManager {
        if(this._instance==null) {
            this._instance=new PropManager();
            this._instance.init();
        }
        return this._instance;
    }

    //初始化游戏数据
    private init () {
        ItemManager.getInstance();
        this.loadItemPrefab();
        this.loadSaleItemPrefab();
        this.loadSp();        
    }

    //-----------------------资源的读取-----------------------------
    private loadItemPrefab(){
        if(this.prop_item)
        return;
        cc.resources.load('prop/item',cc.Prefab,(error: Error, assets:cc.Prefab)=>{
            if(error)
            {
                console.log(error);
                return;
            }
            this.prop_item=assets;
        });
    }    

    private loadSaleItemPrefab(){
        if(this.prop_sale_item)
        return;
        cc.resources.load('prop/saleItem',cc.Prefab,(error: Error, assets:cc.Prefab)=>{
            if(error)
            {
                console.log(error);
                return;
            }
            this.prop_sale_item=assets;
        });
    } 

    private loadSp(){
        if(this.item_atlas)
        return;
        cc.resources.load('prop/item_list',cc.SpriteAtlas,(error: Error, assets:cc.SpriteAtlas)=>{
            if(error)
            {
                console.log(error);
                return;
            }
            this.item_atlas=assets;            
        });
    }

    
    /**资源 */
    public getSpByName(name:string):cc.SpriteFrame{
        return this.item_atlas.getSpriteFrame(name);
    }
    /**通过道具id获得一个精灵帧（不含装备宠物） */
    public getSpByPropId(propId:PropId):cc.SpriteFrame{
        let iconId=ItemManager.getInstance().getQuoteIcon(propId);
        let iconSpName="Item_"+iconId;
        return this.getSpByName(iconSpName);
    }
    
    public getEquipIcon(posType:number):cc.SpriteFrame{
        let iconSpName="Weapon_"+posType;
        return this.getSpByName(iconSpName);
    }

    /**通过道具id获得类型(力量敏捷智力)的精灵帧*/
    public getSpTypeByType(type:PetType):cc.SpriteFrame{
        let iconSpName="Hero_Type_"+type;
        return this.getSpByName(iconSpName);
    }

    public getSpFrameByPropType(propType:PropId):cc.SpriteFrame{
        let iconSpName="Item_frame_"+ItemManager.getInstance().getQuality(propType);
        return this.getSpByName(iconSpName);
    }
    /**通过英雄id获得一个头像 */
    public getSpheadPortraitType(propType:number):cc.SpriteFrame{
        let iconSpName="Item_"+(110000+propType);//Item_110001
        return this.getSpByName(iconSpName);
    }

    public createPropItem(propType:PropId,num:number,pAc:PropAction=PropAction.Look,propPrice:number=0):cc.Node{
        let type=ItemManager.getInstance().getType(propType);
        let prop:cc.Node=null;
       
        switch(type){
            case 3:{
                let info = new EquipInfo();
                info.equip_id = propType;
                info.equip_num = num;
                prop=EquipmentManager.getInstance().getEquipNodeByInfo(info,pAc);
            }break;
            // case 7:{
                // let petInfo=new PetInfo();
                // petInfo.pet_id=propType-70000;
                // petInfo.pet_level=1;
                // prop=PetManager.getInstance().createPetItem(petInfo);
            // }break;
            default:{
                prop=cc.instantiate(this.prop_item);
                prop.getComponent(Prop).init(propType,num,pAc);
            }
        }
        return prop;
    }

    public createSalePropItem(propType:PropId,num:number,pAc:PropAction=PropAction.Look):cc.Node{
        let type=ItemManager.getInstance().getType(propType);
        let prop:cc.Node=null;
        if(type==3){
            prop=EquipmentManager.getInstance().getSaleEquipNodeById(propType,pAc);
        }else{
            prop=cc.instantiate(this.prop_sale_item);
            prop.getComponent(Prop).init(propType,num,pAc);
        }
        return prop;
    }

    /**
     * 获取道具的品质名称
     * @param quality 道具的品质
     */
    getPropQualityName(quality:number):string{
        let textId=110005;
        switch(quality){
            case 1:{
                textId=110005;
            }break;
            case 2:{
                textId=110007;
            }break;
            case 3:{
                textId=110009;
            }break;
            case 4:{
                textId=110011;
            }break;
            case 5:{
                textId=110013;
            }break;
            case 6:{
                textId=110013;
            }break;
        }
        return LanguageManager.getInstance().getStrByTextId(textId);
    }

    /**
     * 获取道具的品质名称的文本色值
     * @param quality 道具的品质
     */
     getPropQualityTextColor(quality:number):cc.Color{
        let color=cc.color();
        switch(quality){
            case 0:{
                color=cc.color(254, 246, 233);
            }break;
            case 1:{                
                color=cc.color(156, 226, 150);
            }break;
            case 2:{
                color=cc.color(86, 149, 225);
            }break;
            case 3:{
                color=cc.color(205, 158, 255);
            }break;
            case 4:{
                color=cc.color(255, 249, 158);
            }break;
            case 5:{
                color=cc.color(251, 95, 98);
            }break;
            case 6:{
                color=cc.color(255, 255, 255);
            }break;
        }
        return color;
    }

    /**获取道具的品质名称的文本描边色值*/
     getPropQualityTextOutlineColor():cc.Color{
        let color=cc.color(37, 49, 71);        
        return color;
    }

    /**获取英雄角标 */
    getHeroIcon(heroType:Hero_Type):cc.SpriteFrame{
        let iconSpName="Equipped_Hero_"+heroType;
        return this.getSpByName(iconSpName);
    }

    /**获取白色英雄角标 */
    getHeroIconb(heroType:Hero_Type):cc.SpriteFrame{
        let iconSpName="Head_Hero_S_"+heroType;
        return this.getSpByName(iconSpName);
    }
    

    /**-----------------------------------------------------数据----------------------------------------------------- */
    public loadPropData(){
        if(!this.map_prop_num){
            this.map_prop_num=new Map<number,number>();
            let idList=ItemManager.getInstance().getPropIdList();
            let len=idList.length;
            for(let i=0; i<len; i++){
                let id=idList[i];
                let num=TheStorageManager.getInstance().getInt(StorageKey.PropNum+id,0);
                if(id==PropId.Coin&&num==0){
                    num=2000;
                }
                this.setPropNum(id,num);
            }
        }
        //拉取服务器的
        if(UserData.getInstance().getUserID()){
            this.HttpSyncPropData(false);
        }
    }
    /**
     * 
     * @param propId 道具id
     * @param num 改变的数量
     * @returns 更改数据是否成功
     */
    public changePropNum(propId:number,num:number):boolean{
        let type=ItemManager.getInstance().getType(propId);
        // if(type==3){
        //     if(num>0){
        //         EquipmentManager.getInstance().addEquipment(propId);
        //         FollowManager.getInstance().followEvent(Follow_Type.对应道具ID的获得次数 + propId)
        //         return true;
        //     }
        //     return false;
        // }
        // if(type==7){
        //     if(num>0){
        //         // PetManager.getInstance().addPet(propId-70000);
        //         FollowManager.getInstance().followEvent(Follow_Type.对应道具ID的获得次数 + propId)
        //         return true;
        //     }
        //     return false;
        // }
        // 新增英雄
        if(type == 11){
            if(HeroManager.getInstance().getHeroInfo(propId % 110000) == null){
                HeroManager.getInstance().addHero(propId % 110000)
                return true;
            }else{
                PropManager.getInstance().changePropNum(propId - 10000,20);
                return true;
            }
        }

        let newNum=this.getPropNum(propId)+num;
        if(newNum>=0){
            if(num > 0){
                FollowManager.getInstance().followEvent(Follow_Type.对应道具ID的获得次数 + propId);
            } 
            if(num < 0){
                FollowManager.getInstance().followEvent(Follow_Type.对应道具ID的使用次数 + propId);
            } 
            this.setPropNum(propId,newNum);
            if(PropId.Coin==propId && num < 0){
                GameManager.getInstance().refreshCoinShow();
            }
            if(PropId.Gem==propId && num < 0) GameManager.getInstance().refreshGemShow();  
            if(PropId.OrdinaryWishingCoin==propId && num > 0){
                EventManager.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Shop);
            }
            return true;
        }
        return false;
    }

    public getPropNum(propId:number):number{
        return this.map_prop_num.get(propId);
    }

    public setPropNum(propId:number,num:number,isSave:boolean=false){
        this.map_prop_num.set(propId,num);
        TheStorageManager.getInstance().setItem(StorageKey.PropNum+propId,num);
        /**资源更改通知 */
        switch(propId){
            case PropId.Coin:{
                EventManager.postAssetsEvent(AssetsEventType.COIN);
                // GameManager.getInstance().refreshCoinShow();
            }break;
            case PropId.Gem:{
                EventManager.postAssetsEvent(AssetsEventType.GEM);
                // GameManager.getInstance().refreshGemShow();
            }break;
            case PropId.HeroExp:{
                EventManager.postAssetsEvent(AssetsEventType.HERO_EXP);
            }break;
            case PropId.HeroStone:{
                EventManager.postAssetsEvent(AssetsEventType.HERO_STONE);
            }break;
            case PropId.AnimalFood:{
                EventManager.postAssetsEvent(AssetsEventType.Animal_Food);
            }break;
            case 40004:{
                // EventManager.postAssetsEvent(AssetsEventType.Animal_Food);
                cc.director.emit("onRefreshInstanceItem");
            }break;
            case 40005:{
                //EventManager.postAssetsEvent(AssetsEventType.Animal_Food);
                cc.director.emit("onRefreshInstanceItem");
            }break;
            case 40006:{
                //EventManager.postAssetsEvent(AssetsEventType.Animal_Food);
                cc.director.emit("onRefreshInstanceItem");
            }break;
        }
        if(isSave){
            TheStorageManager.getInstance().setItem(StorageKey.PropNum+propId,num);
        }
        // if(PropId.Gem==propId){
        //     //目前只上报钻石
        //     let propDatas=new Array<PropObject>();
        //     let propData=new PropObject();
        //     propData.itemsId=propId;
        //     propData.itemsNum=num;
        //     propDatas.push(propData);
        //     this.HttpSetPropData(propDatas);
        // }
    }

    /**获取装备的列表数据 */
    getEquipmentList(equipType:EquipType):EquipInfo[]{
        let EAM=EquipmentAttributeManager.getInstance();
        let IM=ItemManager.getInstance();
        let list=new Array();
        this.map_prop_num.forEach((propNum,propId)=>{
            if(propNum>0){
                let propType=IM.getType(propId);
                //如果是装备
                if(propType==3){
                    let type=EAM.getEquipmentPosition(propId);
                    if(equipType==type){
                        let prop=new EquipInfo();
                    prop.equip_id=propId;
                        prop.equip_num=propNum;
                        list.push(prop);
                    }
                }
            }            
        })
        if(list.length>0){
            //重新排列一下，品质最好在最前
            list.sort((a:EquipInfo,b:EquipInfo)=>{
                let levelA=EquipmentAttributeManager.getInstance().getStage(a.equip_id);
                let levelB=EquipmentAttributeManager.getInstance().getStage(b.equip_id);
                return levelB-levelA;
            });
        }        
        return list;
    }
    /**获取宠物的列表数据 */
    getPetList():PetMessage[]{
        let IM=ItemManager.getInstance();
        let list=new Array();
        this.map_prop_num.forEach((propNum,propId)=>{
            if(propNum>0){
                let propType=IM.getType(propId);
                //如果是装备
                if(propType==7){
                    let prop=new PetMessage();
                    prop.pet_id=propId;
                    prop.pet_num=propNum;
                    list.push(prop);
                }
            }            
        })
        if(list.length>0){
            // todo 宠物排序，阶段高的在前面
            // list.sort((a:EquipInfo,b:EquipInfo)=>{
            //     let levelA=EquipmentAttributeManager.getInstance().getStage(a.equip_id);
            //     let levelB=EquipmentAttributeManager.getInstance().getStage(b.equip_id);
            //     return levelB-levelA;
            // });
        }        
        return list;
    }
    /**保存这份列表，修改装备数量后调用 */
    saveEquipmentList(list:EquipInfo[]){
        for(let i=0; i<list.length; i++){
            let prop=list[i];
            this.map_prop_num.set(prop.equip_id,prop.equip_num);
        }
    }

    /**把变量存储的值存放在本地文件 */
    public saveAllPropNum(isPost:boolean=true){
        let list:PropObject[]=[];
        this.map_prop_num.forEach((v,k)=>{
            TheStorageManager.getInstance().setItem(StorageKey.PropNum+k,v);
            let prop=new PropObject();
            prop.itemsId=k;
            prop.itemsNum=v;
            list.push(prop)
        })
        //提交到服务器
        if(isPost){
            this.HttpSetPropData(list);
        }
        
    }

    /**获取到根据品质排序后的物品列表 */
    public getSortPropList(){
        let propList:PropData[] = new Array();
        this.map_prop_num.forEach((num,id) =>{
            let prop = {
                prop_id: id,
                prop_num: num,
            }
            if(num>0){
                propList.push(prop)
            }
        });
        propList.sort((a:PropData,b:PropData)=>{
            let qualityA = ItemManager.getInstance().getQuality(a.prop_id);
            let qualityB = ItemManager.getInstance().getQuality(b.prop_id);
            return qualityA - qualityB;
        })
        return propList;
    }

    /**提交修改申请 */
    changePropServerTest(){
        let change=JSON.stringify({
            uid:'fb123456',
            name:"props_change",
            value:[{id:10001,num:20},{id:10002,num:-30}]
        });

        let issue=JSON.stringify({
            uid:'fb123456',
            name:"props_issue",
            value:[{id:10001,num:120},{id:10002,num:130}]
        });
    }



    /*******************************************************服务端对接的代码****************************************************************** */
    /**同步服务器的道具数据至本地 */
    HttpSyncPropData(isRefresh:boolean=true){
        HttpManager.post(AccessName.getProp,this.getPropJsonString(null)).then((data:any)=>{
            if(data){
                let len=data.length;
                for(let i=0; i<len; i++){
                    let item=data[i];
                    this.setPropNum(item.itemsId,item.itemsNum);
                }
                if(isRefresh){
                    GameManager.getInstance().refreshGemShow();
                }
                //统一存储本地       
                this.saveAllPropNum(false);
            }
        }).catch((error)=>{
            cc.error(error);
        });
    }
    
    async HttpSetPropData(propDatas:PropObject[]):Promise<any>{
        HttpManager.post(AccessName.setProp,this.getPropJsonString(propDatas)).then((data:any)=>{
            cc.log('上报成功');
        }).catch((error)=>{
            cc.log(error);
        });
    }

    private getPropJsonString(propDatas:PropObject[]):string{
        let uid=UserData.getInstance().getUserID();
        return JSON.stringify({
            uid:uid,
            gameUserItemNewList:propDatas,
        });
    }
}