import WXManagerEX from "../../../startscene/WXManagerEX";
import { GameMode } from "../../Constants";
import GameManager from "../../GameManager";
import { RewardHeroData } from "../../JsonData/LevelJsonData";
import LanguageManager from "../../multiLanguage/LanguageManager";
import { PropManager } from "../../Prop/PropManager";
import StoreHeroUi from "../../Store/StoreHeroUi";
import RedTip from "../../Tools/RedTip";
import TutorailsManager from "../../Tutorials/TutorailsManager";
import MainUi from "../../UI/home/MainUi";
import { UILayerLevel, UIPath } from "../../UI/UIConfig";
import { UIManager } from "../../UI/UIManager";
import { HeroAttributeManager } from "../Data/HeroAttribute";
import { HeroBaseInfoManager, JsonHeroBaseInfo } from "../Data/HeroBaseInfo";
import { HeroManager } from "../Data/HeroManager";
import { HeroQualityManager } from "../Data/HeroQuality";
import { Hero_Type } from "../Game/HeroConfig";
import HeroItem from "./HeroItem";
import RoleUi from "./RoleUi";

const {ccclass, property} = cc._decorator;

@ccclass
export default class HeroListUi extends cc.Component {

    @property(cc.Prefab)
    hero_item:cc.Prefab = null;

    protected onLoad(): void {
        this.node.on(cc.Node.EventType.POSITION_CHANGED,this.onPositionChange,this);
       
    }

    protected onDestroy(): void {
        this.node.off(cc.Node.EventType.POSITION_CHANGED,this.onPositionChange,this);
    }

    onPositionChange(){
        if(this.node.x==0){
            this.onRefresh();            
        }
    }

    protected onEnable(): void {
        this.checkTutorails();    
    }

    checkTutorails(){
        if(TutorailsManager.getInstance().isShowTutorials(301)==false&&TutorailsManager.getInstance().isShowTutorials(302)){
            //218完成显示
            //升级引导
            TutorailsManager.getInstance().is_tutorails_state=true;   
            this.scheduleOnce(()=>{
                //显示英雄页-兽王
                UIManager.getInstance().showUiDialog(UIPath.HeroGrowth,UILayerLevel.One,{onCompleted:(uiNode)=>{
                    uiNode.getComponent(RoleUi).init({
                        onClose:()=>{
                            cc.find('Canvas/hero_list_ui').getComponent(HeroListUi).onRefresh();
                        }
                    });
                    uiNode.getComponent(RoleUi).initData(Hero_Type.ShouWang);
                },})
            },0.1);
            
            return true;
        }else if(TutorailsManager.getInstance().isShowTutorials(311)==false&&TutorailsManager.getInstance().isShowTutorials(312)){
            //显示英雄页
            TutorailsManager.getInstance().is_tutorails_state=true;    
            this.scheduleOnce(()=>{
                UIManager.getInstance().showUiDialog(UIPath.HeroGrowth,UILayerLevel.One,{onCompleted:(uiNode)=>{
                    uiNode.getComponent(RoleUi).init({
                        onClose:()=>{
                            cc.find('Canvas/hero_list_ui').getComponent(HeroListUi).onRefresh();
                        }
                    });
                    uiNode.getComponent(RoleUi).initData(Hero_Type.PaoShou);
                },})
            },0.1);
            
            return true;                   
        }
    }

    protected start(): void {
        this.onUiInit();
    }

    onUiInit(){
        let content = this.node.getChildByName('scroll').getComponent(cc.ScrollView).content;
        content.removeAllChildren();
        let allHeroList:JsonHeroBaseInfo[] = [];
        let canUnlockList:JsonHeroBaseInfo[] = [];
        let canIncreaseStarList:JsonHeroBaseInfo[] = [];
        let unlockList:JsonHeroBaseInfo[] = [];
        let maxList:JsonHeroBaseInfo[] = [];
        let lockList:JsonHeroBaseInfo[] = [];
        let tempList:JsonHeroBaseInfo[] = [];


        HeroBaseInfoManager.getInstance().getData().forEach((v,k) =>{
            allHeroList.push(v);
        });

        for(let i = 0;i < allHeroList.length;i++){
            let info = HeroManager.getInstance().getHeroInfo(allHeroList[i].Hero_ID)
            if(info){
                // let propNum =PropManager.getInstance().getPropNum(allHeroList[i].HeroFragment);
                // let needNum =HeroQualityManager.getInstance().getCostDebrisByHeroTypeAndStage(allHeroList[i].Quality,info.hero_stage);
                if(PropManager.getInstance().getPropNum(allHeroList[i].HeroFragment) >= HeroQualityManager.getInstance().getCostDebrisByHeroQualityAndStage(allHeroList[i].Quality,info.hero_stage)){
                    if(HeroQualityManager.getInstance().getCostDebrisByHeroQualityAndStage(allHeroList[i].Quality,info.hero_stage) == 0){
                        maxList.push(allHeroList[i])
                    }else{
                        canIncreaseStarList.push(allHeroList[i]);
                    }
                }else{
                    unlockList.push(allHeroList[i]);
                }
            }else{
                if(PropManager.getInstance().getPropNum(allHeroList[i].HeroFragment) >= allHeroList[i].UnlockFragmentNum){
                    canUnlockList.push(allHeroList[i]);
                }else{
                    lockList.push(allHeroList[i]);
                }
            }
        }

        canUnlockList.sort(this.lockHeroItemSort);
        lockList.sort(this.lockHeroItemSort);
        canIncreaseStarList.sort(this.unlockHeroItemSort);
        canIncreaseStarList.sort(this.unlockHeroItemSort);
        maxList.sort(this.unlockHeroItemSort);
        unlockList.sort(this.unlockHeroItemSort);
        unlockList.sort(this.unlockHeroItemSort);

        // this.lockHeroItemSort(canUnlockList);
        // this.lockHeroItemSort(lockList);
        // this.unlockHeroItemSort(canIncreaseStarList);
        // this.unlockHeroItemSort(unlockList);

        tempList = tempList.concat(canUnlockList,canIncreaseStarList,maxList,unlockList,lockList);

        let sqrtList = [];

        tempList.forEach((v,k)=>{
            if(v.Available == 1){
                sqrtList.push(v);
            }
        })

        for(let i = 0;i < tempList.length;i++){
            let item = cc.instantiate(this.hero_item);
            item.name = 'item' + i;
            item.getComponent(HeroItem).init(tempList[i].Hero_ID,tempList[i].HeroFragment);
            if(tempList[i].Available == 1){
                item.on(cc.Node.EventType.TOUCH_END,()=>{
                    UIManager.getInstance().showUiDialog(UIPath.HeroGrowth,UILayerLevel.One,{onCompleted:(uiNode)=>{
                        uiNode.getComponent(RoleUi).init({
                            onClose:()=>{
                                this.onRefresh();
                                GameManager.getInstance().refreshCoinShow();
                            }
                        });
                        uiNode.getComponent(RoleUi).initData(tempList[i].Hero_ID,sqrtList);
                    },});
                },this);
            }else{
                item.on(cc.Node.EventType.TOUCH_END,()=>{
                    let s = LanguageManager.getInstance().getStrByTextId(100113);
                    GameManager.getInstance().showMessage(s);
                },this);
            }
            content.addChild(item);
            // let red=item.getChildByName('RedTip').getComponent(RedTip);
            // red.self_red_type=HeroManager.getRedTypeByHeroType(tempList[i].Hero_ID);
            // red.registerEvent();
        }
    }

    onRefresh(){        
        let content = this.node.getChildByName('scroll').getComponent(cc.ScrollView).content;
        // content.removeAllChildren();
        let allHeroList:JsonHeroBaseInfo[] = [];
        let canUnlockList:JsonHeroBaseInfo[] = [];
        let canIncreaseStarList:JsonHeroBaseInfo[] = [];
        let unlockList:JsonHeroBaseInfo[] = [];
        let maxList:JsonHeroBaseInfo[] = [];
        let lockList:JsonHeroBaseInfo[] = [];
        let tempList:JsonHeroBaseInfo[] = [];


        HeroBaseInfoManager.getInstance().getData().forEach((v,k) =>{
            allHeroList.push(v);
        });

        for(let i = 0;i < allHeroList.length;i++){
            let info = HeroManager.getInstance().getHeroInfo(allHeroList[i].Hero_ID)
            if(info){
                // let propNum =PropManager.getInstance().getPropNum(allHeroList[i].HeroFragment);
                // let needNum =HeroQualityManager.getInstance().getCostDebrisByHeroTypeAndStage(allHeroList[i].Quality,info.hero_stage);
                if(PropManager.getInstance().getPropNum(allHeroList[i].HeroFragment) >= HeroQualityManager.getInstance().getCostDebrisByHeroQualityAndStage(allHeroList[i].Quality,info.hero_stage)){
                    if(info.hero_stage == allHeroList[i].MaxStage){
                        maxList.push(allHeroList[i])
                    }else{
                        canIncreaseStarList.push(allHeroList[i]);
                    }
                }else{
                    if(info.hero_stage == allHeroList[i].MaxStage){
                        maxList.push(allHeroList[i])
                    }else{
                        unlockList.push(allHeroList[i]);
                    }
                }
            }else{
                if(PropManager.getInstance().getPropNum(allHeroList[i].HeroFragment) >= allHeroList[i].UnlockFragmentNum){
                    canUnlockList.push(allHeroList[i]);
                }else{
                    lockList.push(allHeroList[i]);
                }
            }
        }

        canUnlockList.sort(this.lockHeroItemSort);
        lockList.sort(this.lockHeroItemSort);
        canIncreaseStarList.sort(this.unlockHeroItemSort);
        canIncreaseStarList.sort(this.unlockHeroItemSort);
        maxList.sort(this.unlockHeroItemSort);
        unlockList.sort(this.unlockHeroItemSort);
        unlockList.sort(this.unlockHeroItemSort);

        // this.lockHeroItemSort(canUnlockList);
        // this.lockHeroItemSort(lockList);
        // this.unlockHeroItemSort(canIncreaseStarList);
        // this.unlockHeroItemSort(unlockList);

        tempList = tempList.concat(canUnlockList,canIncreaseStarList,maxList,unlockList,lockList);

        let sqrtList = [];

        tempList.forEach((v,k)=>{
            if(v.Available == 1){
                sqrtList.push(v);
            }
        })

        for(let i = 0;i < tempList.length;i++){
            // let item = cc.instantiate(this.hero_item);
            let item = content.getChildByName("item" + i);
            item.off(cc.Node.EventType.TOUCH_END);
            item.getComponent(HeroItem).init(tempList[i].Hero_ID,tempList[i].HeroFragment);
            if(tempList[i].Available == 1){
                item.on(cc.Node.EventType.TOUCH_END,()=>{
                    UIManager.getInstance().showUiDialog(UIPath.HeroGrowth,UILayerLevel.One,{onCompleted:(uiNode)=>{
                        uiNode.getComponent(RoleUi).init({
                            onClose:()=>{
                                this.onRefresh();
                            }
                        });
                        uiNode.getComponent(RoleUi).initData(tempList[i].Hero_ID,sqrtList);
                    },});
                },this);
            }else{
                item.on(cc.Node.EventType.TOUCH_END,()=>{
                    let s = LanguageManager.getInstance().getStrByTextId(100113);
                    GameManager.getInstance().showMessage(s);
                },this);
            }
            // content.addChild(item);
            let red=item.getChildByName('RedTip').getComponent(RedTip);
            red.cancelEvent();
            red.self_red_type=HeroManager.getRedTypeByHeroType(tempList[i].Hero_ID);
            red.registerEvent();
            red.checkSelf(true);
        }
    }

    /**未解锁英雄排序 */
    lockHeroItemSort(a:JsonHeroBaseInfo,b:JsonHeroBaseInfo):number{
        if(a.Quality < b.Quality) return 1;
        return -1;
    }
    // lockHeroItemSort(list:JsonHeroBaseInfo[]){
    //     for(let i = 0;i < list.length - 1;i++){
    //         for(let j = 0; j < list.length - 1 - i;j++){
    //             if(list[j].Quality > list[j+1].Quality){
    //                 let temp;
    //                 temp = list[j];
    //                 list[j] = list[j+1];
    //                 list[j+1] = temp;
    //             }
    //         }
    //     }
    // }

    /**已解锁英雄排序 */
    unlockHeroItemSort(a:JsonHeroBaseInfo,b:JsonHeroBaseInfo):number{
        if(a.Quality < b.Quality){
            return 1;
        }else if(a.Quality == b.Quality){
            let starA = HeroAttributeManager.getInstance().getStarByHeroTypeAndStage(a.Hero_ID,HeroManager.getInstance().getHeroStage(a.Hero_ID))
            let starB = HeroAttributeManager.getInstance().getStarByHeroTypeAndStage(b.Hero_ID,HeroManager.getInstance().getHeroStage(b.Hero_ID))
            if(starA < starB){ 
                return 1;
            }else if(starA == starB){
                let infoA = HeroManager.getInstance().getHeroLevel(a.Hero_ID);
                let infoB = HeroManager.getInstance().getHeroLevel(a.Hero_ID);
                if(infoA < infoB) return 1;
            }
        }
        return -1;
    }

    // unlockHeroItemSort(list:JsonHeroBaseInfo[]){
    //     for(let i = 0;i < list.length - 1;i++){
    //         for(let j = 0; j < list.length - 1 - i;j++){
    //             if(list[j].Quality > list[j+1].Quality){
    //                 let temp;
    //                 temp = list[j];
    //                 list[j] = list[j+1];
    //                 list[j+1] = temp;
    //             }else if(list[j].Quality == list[j+1].Quality){
    //                 let temp;
    //                 temp = list[j];
    //                 list[j] = list[j+1];
    //                 list[j+1] = temp;
    //             }
    //         }
    //     }
    // }
}
