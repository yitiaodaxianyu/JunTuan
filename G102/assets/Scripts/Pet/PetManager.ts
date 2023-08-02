import WXManagerEX from "../../startscene/WXManagerEX";
import { CombatEffectivenessManager } from "../Hero/Data/CombatEffectiveness";
import { HeroManager } from "../Hero/Data/HeroManager";
import { Hero_Type } from "../Hero/Game/HeroConfig";
import { PropAction, PropId } from "../Prop/PropConfig";
import { PropManager } from "../Prop/PropManager";
import { SpiritAttributeManager } from "./Data/SpiritAttribute";
import { SpiritCultivateManager } from "./Data/SpiritCultivate";
import { SpiritMessageManager } from "./Data/SpiritMessage";
import { SpiritSkillManager } from "./Data/SpiritSkill";
import { PetMessage } from "./PetConfig";
import PetItem from "./Ui/PetItem";

export enum SpiritType{
    /**力量 */
    strength=1,
    /**敏捷 */
    agility=2,
    /**智力 */
    intelligence=3,
}


export class PetManager {

    private static _instance: PetManager = null;

    public static getInstance():PetManager {
        if(this._instance==null) {
            this._instance=new PetManager();
            this._instance.init();
        }
        return this._instance;
    }

    private item_pet:cc.Prefab=null;

    //初始化游戏数据
    private init () {
        SpiritAttributeManager.getInstance();
        SpiritCultivateManager.getInstance();
        SpiritMessageManager.getInstance();
        SpiritSkillManager.getInstance();
        this.loadPrefab();
    }

    public loadPrefab(){
        WXManagerEX.getInstance().resourcesBundle.load('pet/ui/petItem',cc.Prefab,(error: Error, assets:cc.Prefab)=>{
            if(error)
            {
                console.log(error);
                return;
            }
            console.log('加载prefab_equip成功');
            assets.addRef();
            this.item_pet=assets;
            //cc.resources.release("equipment/equipItem",cc.Prefab);
        });
    }

    getPetNodeByInfo(petMessage:PetMessage,pAc:PropAction=PropAction.Look,heroType:Hero_Type=Hero_Type.NULL):cc.Node{
        let item=cc.instantiate(this.item_pet);
        item.getComponent(PetItem).init(heroType,petMessage,pAc);
        return item;
    }

    /**根据装备ID获得一个装备节点 */
    public getPetNodeById(petId:number,pAc:PropAction=PropAction.Look,heroType:Hero_Type=Hero_Type.NULL):cc.Node{
        let item=cc.instantiate(this.item_pet);
        let petMessage=new PetMessage();
        petMessage.pet_id=petId;
        petMessage.pet_num=1;
        item.getComponent(PetItem).init(heroType,petMessage,pAc);
        // console.log("+++",item)
        return item;
    }

    // 获取单个宠物战力
    getPetZhanLi(petId:number): number {
        let zhanli=0;
        let petInfo = SpiritAttributeManager.getInstance().getJsonSpiritAttribute(petId);
        zhanli = 
        petInfo.Health * CombatEffectivenessManager.getInstance().getConversionFactor(1) 
        +  petInfo.Attack * CombatEffectivenessManager.getInstance().getConversionFactor(2)
        +  petInfo.Defense * CombatEffectivenessManager.getInstance().getConversionFactor(3)
        +  petInfo.Hit * CombatEffectivenessManager.getInstance().getConversionFactor(4)
        +  petInfo.Miss * CombatEffectivenessManager.getInstance().getConversionFactor(5)
        + ( petInfo.Critical) * CombatEffectivenessManager.getInstance().getConversionFactor(6)
        +  petInfo.AntiCritical * CombatEffectivenessManager.getInstance().getConversionFactor(7)
        + ( petInfo.ExtraCritical) * CombatEffectivenessManager.getInstance().getConversionFactor(8)
        +  petInfo.AntiExtraCritical * CombatEffectivenessManager.getInstance().getConversionFactor(9)
        zhanli=Math.round(zhanli);
        return zhanli;
    }


    public getPetQualityTextColor(quality:number):cc.Color{
        let color=cc.color();
        switch(quality){
            case 1:{
                color=cc.color(113, 229, 132);
            }break;
            case 2:
            case 3:
            {
                color=cc.color(105, 183, 255);
            }break;
            case 4:
            case 5:
            {
                color=cc.color(226, 126, 255);
            }break;
            case 6:
            case 7:
            {
                color=cc.color(255, 193, 74);
            }break;
            case 8:
            case 9:
            {
                color=cc.color(255, 74, 74);
            }break;
            default:{
                color=cc.color(255, 255, 255);
            }break;
        }
        return color;
    }

    /**检测是否有红点提示 */
    checkRedTip(heroType:Hero_Type):boolean{
        let petId=HeroManager.getInstance().getHeroInfo(heroType).pet_id;
        let petList=PropManager.getInstance().getPetList();
        if(petId==0){
            //检测是否有空余的宠物
            for(let i=0; i<petList.length; i++){
                let info=petList[i];
                let heroList=HeroManager.getInstance().getWearPetHeroList(info);
                let remainNum=info.pet_num-heroList.length;
                if(remainNum>0){
                    return true;
                }                
            }
        }else{
            let petInfo = SpiritAttributeManager.getInstance().getJsonSpiritAttribute(petId);
            let petMessage = SpiritMessageManager.getInstance().getJsonSpiritMessage(petInfo.SpiritType);
            if(petInfo.Stage >= petMessage.StageLimit){
                return false;
            }
            //是否可以升星
            let costInfo = SpiritCultivateManager.getInstance().getJsonSpiritCultivate(petInfo.Stage);
            if(costInfo.CoinSpirit == 0){
                return (PropManager.getInstance().getPropNum(PropId.AnimalFood) >= costInfo.FoodCost && 
                PropManager.getInstance().getPropNum(PropId.Coin) >= costInfo.CoinCost)                                        
            }else{
                let firstStageInfo = SpiritAttributeManager.getInstance().getTypeFirstJsonData(petInfo.SpiritType);               
                return (PropManager.getInstance().getPropNum(firstStageInfo.SpiritItem) >= costInfo.CoinSpirit &&
                PropManager.getInstance().getPropNum(PropId.Gem) >= costInfo.DiamondCost)
            }
        }
        return false;
    }
}
