import AccumulatedRechargeUi from "../../AccumulatedRecharge/AccumulatedRechargeUi";
import { FuncType } from "../../Constants";
import MergeUi from "../../Equipment/Ui/MergeUi";
import GameManager from "../../GameManager";
import { FunctionDefinitionManager } from "../../JsonData/FunctionDefinition";
import { MissionLevelManager } from "../../Level/MissionLevel";
import { Follow_Type } from "../../multiLanguage/FollowConstants";
import FollowManager from "../../multiLanguage/FollowManager";
import { LanguageType } from "../../multiLanguage/LanguageConstants";
import LanguageManager from "../../multiLanguage/LanguageManager";
import PayFirstChargeUi from "../../Payment/PayFirstChargeUi";
import { PayManager } from "../../Payment/PayManager";
import RankingList from "../../RankingList/RankingList";
import { MusicIndex, SoundIndex } from "../../Sound/AudioConstants";
import { StorageKey } from "../../Storage/StorageConfig";
import { TheStorageManager } from "../../Storage/StorageManager";
import TakeEggUi from "../../TakeEgg/TakeEggUi";
import TaskUi from "../../Task/TaskUi";
import Turmtable from "../../Turntable/Turmtable";
import VipSystem from "../../VipSystem/VipSystem";
import WeekCardUi from "../../WeekCard/WeekCardUi";
import WishingUi from "../../Wish/WishingUi";
import { UILayerLevel, UIPath } from "../UIConfig";
import { UIManager } from "../UIManager";
import BagUi from "./BagUi";
import GoldMallUi from "./GoldMallUi";
import MainUi from "./MainUi";
import SignUi from "./SignUi";
import SignUiDaily from "./SignUiDaily";


const {ccclass, property} = cc._decorator;

@ccclass
export default class FuncTypeBtn extends cc.Component {

    @property({type:cc.Enum(FuncType)})
    func_type:FuncType=FuncType.LiChengBei;
    @property(cc.Node)
    name_text:cc.Node = null;
    private cur_language_type: LanguageType = LanguageType.en;

    protected onLoad(): void {
        this.cur_language_type=LanguageManager.getInstance().getCurLanguageType();
        this.refresh();
    }

    refresh():boolean{
        let isShow=FunctionDefinitionManager.getInstance().getIsUnlock(this.func_type);
        //主城的额外处理
       if(this.func_type >= FuncType.Shengtang && this.func_type <= FuncType.TieJiangPu){
            let normalMaterial=cc.Material.getBuiltinMaterial('2d-sprite');
            let grayMaterial=cc.Material.getBuiltinMaterial('2d-gray-sprite');
            this.node.getComponent(cc.Sprite).setMaterial(0,isShow?normalMaterial:grayMaterial);
            this.node.getChildByName("bg").getComponent(cc.Sprite).setMaterial(0,isShow?normalMaterial:grayMaterial);
            this.node.getChildByName("lock").active = isShow?false:true;
        }
        else if(this.func_type == FuncType.FirstCharge){
        //     if(Number(cc.sys.localStorage.getItem("is_pay_first_charge",0)) != 0 || isShow == false){
        //         this.node.active = false;
        //         return false
        //     }
        //     if(Number(cc.sys.localStorage.getItem("is_pay_first_charge",0)) == 0 && isShow == true){
        //         this.node.active = true;
        //         return true;
        //     }
            if( TheStorageManager.getInstance().getNumber(StorageKey.FirstPayGetState,0) == 1){
                return false;
            }else{
                return isShow;
            }
        }
        else if(this.func_type==FuncType.AccumulatedRecharge||this.func_type==FuncType.WeekCard){
            return isShow;
        }else{
            let normalMaterial=cc.Material.getBuiltinMaterial('2d-sprite');
            let grayMaterial=cc.Material.getBuiltinMaterial('2d-gray-sprite');
            this.node.getComponent(cc.Sprite).setMaterial(0,isShow?normalMaterial:grayMaterial);
        }
        this.showName();
        return true;
    }

    showName(){
        let name=this.node.getChildByName('name');
        if(name){
            name.getComponent(cc.Label).string=LanguageManager.getInstance().getStrByTextId(FunctionDefinitionManager.getInstance().getTextID(this.func_type))
        }
        if(this.name_text){
            this.name_text.getComponent(cc.Label).string=LanguageManager.getInstance().getStrByTextId(FunctionDefinitionManager.getInstance().getTextID(this.func_type))
        }
    }

    onClick(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        if(!FunctionDefinitionManager.getInstance().getIsUnlock(this.func_type)){
            let type=FunctionDefinitionManager.getInstance().getUnlockConditionType(this.func_type)
            let num=FunctionDefinitionManager.getInstance().getUnlockCondictionParameter(this.func_type)
            if(type==1){
                GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(100051)+":"+num);
            }else if(type==2){
                let textStr=LanguageManager.getInstance().getStrByTextId(100052);
                let nums=MissionLevelManager.getInstance().getLevelName((num))
                let str=textStr.replace('~',''+nums)
                GameManager.getInstance().showMessage(str);
            }
            return;
        }
        this.showUi();
    }

    showUi(){
        let um=UIManager.getInstance();
        switch(this.func_type)
        {
            case FuncType.LiChengBei:{
                // um.showBagUi(null);
                um.showUiDialog(UIPath.Bag,UILayerLevel.One,{onCompleted:(uiNode)=> {
                    uiNode.getComponent(BagUi).init(null);
                },});
                return;
            };
        
            case FuncType.MeiRiRenWu:{
                um.showUiDialog(UIPath.Task,UILayerLevel.One,{onCompleted:(uiNode)=> {
                    // uiNode.getComponent(TaskUi).init(null); 
                },});
                // FollowManager.getInstance().followEvent(Follow_Type.每日任务按钮用户点击数);
                FollowManager.getInstance().followEvent(Follow_Type.主页点击任务点击次数);
            } break;
            case FuncType.QianDao:{
                if(TheStorageManager.getInstance().getNumber(StorageKey.NewPlayerSavenDaySignInOver,0) == 0){
                    UIManager.getInstance().showUiDialog(UIPath.SignIn,UILayerLevel.One,{onCompleted:(uiNode)=> {
                        uiNode.getComponent(SignUi).init(null);
                    },});
                }else{
                    UIManager.getInstance().showUiDialog(UIPath.SignInDaily,UILayerLevel.One,{onCompleted:(uiNode)=> {
                        uiNode.getComponent(SignUiDaily).init(null);
                    },});
                }
                FollowManager.getInstance().followEvent(Follow_Type.七日签到按钮点击用户数);
            } break;

            case FuncType.FanLi:{
                // um.showRabateUi();
            } break;
            case FuncType.LiBao:{
                // um.showGiftCenterUi();
            } break;
            case FuncType.ZhanLing:{
                FollowManager.getInstance().followEvent(Follow_Type.战令点击次数);
                // um.showBattlePassUi();
            } break;
            case FuncType.Shengtang:{
                // um.showPetAddvanceUi(null);
            } break;
            case FuncType.XuYuanChi:{
                // um.showWishingUi({onClose:()=>{
                //     GameManager.getInstance().music_manager.playMusic(MusicIndex.BGM_MainCity);
                // }});
                um.showUiDialog(UIPath.Wishing,UILayerLevel.One,{onCompleted:(uiNode)=> {
                    uiNode.getComponent(WishingUi).init({
                        onClose: () =>{
                            // GameManager.getInstance().music_manager.playMusic(MusicIndex.BGM_MainCity);
                        }
                    });
                },});
            } break;
            case FuncType.LongChao:{
                // um.showTakeEggUi({onClose:()=>{
                //     GameManager.getInstance().music_manager.playMusic(MusicIndex.BGM_MainCity);
                // }});
                um.showUiDialog(UIPath.TakeEgg,UILayerLevel.One,{onCompleted:(uiNode)=> {
                    uiNode.getComponent(TakeEggUi).init({onClose:()=>{
                        // GameManager.getInstance().music_manager.playMusic(MusicIndex.BGM_MainCity);
                    }})
                },})
            } break;
            case FuncType.ShangDian:{
                // um.showGoldMallUi({onClose:()=>{
                //     GameManager.getInstance().music_manager.playMusic(MusicIndex.BGM_MainCity);
                // }});
                um.showUiDialog(UIPath.Mall,UILayerLevel.One,{onCompleted:(uiNode)=> {
                    uiNode.getComponent(GoldMallUi).init({
                        onClose: () =>{
                            // GameManager.getInstance().music_manager.playMusic(MusicIndex.BGM_MainCity);
                        }
                    });
                },});
            } break;
            case FuncType.TieJiangPu:{
                // um.showEquipSyntheticUi({onClose:()=>{
                //     GameManager.getInstance().music_manager.playMusic(MusicIndex.BGM_MainCity);
                // }});
                UIManager.getInstance().showUiDialog(UIPath.EquipSynthetic,UILayerLevel.One,{onCompleted:(uiNode)=> {
                    uiNode.getComponent(MergeUi).init({onClose:()=>{
                        // GameManager.getInstance().music_manager.playMusic(MusicIndex.BGM_MainCity);
                    }});
                },});
            } break;
            case FuncType.NeiGou:{
                FollowManager.getInstance().followEvent(Follow_Type.主页充值商城点击次数);
                um.showPayUi(null,1);
            } break;
            case FuncType.FirstCharge:{
                FollowManager.getInstance().followEvent(Follow_Type.主页首充礼包点击次数);
                UIManager.getInstance().showUiDialog(UIPath.FirstCharge,UILayerLevel.One,{onCompleted:(uiNode)=> {
                    uiNode.getComponent(PayFirstChargeUi).init({
                        onClose:() => {
                            let mainUi=cc.find("Canvas/main_ui").getComponent(MainUi);
                            mainUi.refreshLeft();
                        }
                    });
                },});
            }break;
            case FuncType.ZhuanPan:{
                FollowManager.getInstance().followEvent(Follow_Type.转盘的打开次数);
                um.showUiDialog(UIPath.Turntable,UILayerLevel.One,{onCompleted:(uiNode)=> {
                    uiNode.getComponent(Turmtable).initUi()
                },});//转盘
            }break;
            case FuncType.VIP:{
                FollowManager.getInstance().followEvent(Follow_Type.战令点击次数);
                FollowManager.getInstance().followEvent(Follow_Type.战令按钮点击次数);
                um.showUiDialog(UIPath.VipSystem,UILayerLevel.One,{onCompleted:(uiNode)=> {
                    uiNode.getComponent(VipSystem).initUi()
                },});//会员系统  VIP系统
            }break;
            case FuncType.PaiHangBang:{
                // um.showRankUi();
                FollowManager.getInstance().followEvent(Follow_Type.排行榜点击用户数);
                FollowManager.getInstance().followEvent(Follow_Type.主页排行榜按钮点击次数);
                
                um.showUiDialog(UIPath.RankingList,UILayerLevel.One,{onCompleted:(uiNode)=> {
                    uiNode.getComponent(RankingList).initUi(1)
                },});//排行榜
            } break;
            case FuncType.AccumulatedRecharge:{
                //累充
                um.showUiDialog(UIPath.AccumulatedRecharge,UILayerLevel.One,{
                    onCompleted:(uiNode)=>{
                        uiNode.getComponent(AccumulatedRechargeUi).init(null);
                    }
                })
            } break;
            case FuncType.WeekCard:{
                //周卡
                FollowManager.getInstance().followEvent(Follow_Type.特权卡按钮点击次数);
                um.showUiDialog(UIPath.WeekCard,UILayerLevel.One,{
                    onCompleted:(uiNode)=>{
                        uiNode.getComponent(WeekCardUi).refreshUi();
                    }
                })
            } break;
        }        
        PayManager.getInstance().addFuncTodayShow(this.func_type);
    }

    protected update(dt: number): void {
        if(this.cur_language_type!=LanguageManager.getInstance().getCurLanguageType()){
            this.showName();
            this.cur_language_type=LanguageManager.getInstance().getCurLanguageType();
        }
    }
    
}
