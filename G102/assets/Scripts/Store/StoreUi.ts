import WXManagerEX, { WXADEnvnt } from "../../startscene/WXManagerEX";
import { AccessName, HttpManager } from ".././NetWork/HttpManager";
import { CumulativeRechargesManager } from "../AccumulatedRecharge/CumulativeRecharges";
import ApkManager from "../Ads/ApkManager";
import CoinPop from "../CoinPop";
import { FuncType, GameMode, IsDebug, VIDEO_TYPE } from "../Constants";
import EquipItem from "../Equipment/Ui/EquipItem";
import GameData from "../GameData";
import GameManager from "../GameManager";
import { HeroManager } from "../Hero/Data/HeroManager";
import { Hero_Type } from "../Hero/Game/HeroConfig";
import { FunctionDefinitionManager } from "../JsonData/FunctionDefinition";
import { RewardHeroData } from "../JsonData/LevelJsonData";
import { LevelManager } from "../Level/LevelManager";
import { MissionLevelManager } from "../Level/MissionLevel";
import { Follow_Type } from "../multiLanguage/FollowConstants";
import FollowManager from "../multiLanguage/FollowManager";
import { OnLanguageChange } from "../multiLanguage/LanguageConstants";
import LanguageManager from "../multiLanguage/LanguageManager";
import TextLanguage from "../multiLanguage/TextLanguage";
import { PayManager } from "../Payment/PayManager";
import { ItemManager } from "../Prop/Data/Item";
import Prop from "../Prop/Prop";
import { PropAction, PropId } from "../Prop/PropConfig";
import { PropManager } from "../Prop/PropManager";
import { StorageKey } from "../Storage/StorageConfig";
import { TheStorageManager } from "../Storage/StorageManager";
import { TaskItem } from "../Task/TaskEnum";
import TaskManager from "../Task/TaskManager";
import { EventManager, RedEventString, RedEventType } from "../Tools/EventManager";
import MyTool from "../Tools/MyTool";
import Turmtable from "../Turntable/Turmtable";
import TutorailsManager from "../Tutorials/TutorailsManager";
import MainUi from "../UI/home/MainUi";
import { UILayerLevel, UIPath } from "../UI/UIConfig";
import { UIManager } from "../UI/UIManager";
import UserData from "../UserData";
import { UserInfo } from "../UserInfo/UserInfo";
import { ChapterPackManager } from "./ChapterPack";
import { CommodityInformationManager } from "./CommodityInformation";
import { DailyShopManager, JsonDailyShop } from "./DailyShop";
import { DiamondsRechargeManager, JsonDiamondsRecharge } from "./DiamondsRecharge";
import { DrawCardInformationManager } from "./DrawCardInformation";
import ProbabilityTipUi from "./ProbabilityTipUi";
import { PurchaseCoinsManager } from "./PurchaseCoins";
import StoreHeroUi from "./StoreHeroUi";

const { ccclass, property } = cc._decorator;

@ccclass
export default class StoreUi extends cc.Component {

    @property(cc.Prefab)
    store_title: cc.Prefab = null;
    @property(cc.Prefab)
    store_chapter_item: cc.Prefab = null;
    @property(cc.Prefab)
    store_hero_item: cc.Prefab = null;
    @property(cc.Prefab)
    store_daily_item: cc.Prefab = null;
    @property(cc.Prefab)
    store_pet_item: cc.Prefab = null;
    @property(cc.Prefab)
    store_equip_item: cc.Prefab = null;
    @property(cc.Prefab)
    store_gem_item: cc.Prefab = null;
    @property(cc.Prefab)
    store_coin_item: cc.Prefab = null;

    @property(cc.SpriteAtlas)
    store_ui: cc.SpriteAtlas = null;

    // 私有数据
    private hero_instance: cc.Node = null;
    private weapon_instance: cc.Node = null;
    private pet_instance: cc.Node = null;

    private adItem:cc.Node=null;
    private informationTemp:number=0;
    private informationK:number=0;

    private equipItemTemp:cc.Node=null;
    private costIdTemp:number=0;
    private prizeEquipDataTemp;

    private vTemp;
    private kTemp;


    protected onLoad(): void {
        this.node.on(cc.Node.EventType.POSITION_CHANGED, this.onPositionChange, this);
        cc.director.on(OnLanguageChange, this.initStore, this);
        if(WXManagerEX.getInstance().statusBarHeight>20){   
            this.node.getComponent(cc.Widget).top = 150;
        }
        
        this.initStore();

        cc.director.on(WXADEnvnt.ZUANSHILINGQUSHIPIN, this.onShipinComp, this);
        cc.director.on(WXADEnvnt.ZHUANGBEICHOUJIANG, this.onSHipincomp2, this);
        cc.director.on(WXADEnvnt.ZHUANGBEICHOUJIANG, this.onShipincomp3, this);
    }

    protected onDestroy(): void {
        this.node.off(cc.Node.EventType.POSITION_CHANGED, this.onPositionChange, this);
        cc.director.off(OnLanguageChange, this.initStore, this);
        cc.director.off("onRefreshInstanceItem");
        cc.director.off(WXADEnvnt.ZUANSHILINGQUSHIPIN, this.onShipinComp, this);
        cc.director.off(WXADEnvnt.ZHUANGBEICHOUJIANG, this.onSHipincomp2, this);
        cc.director.off(WXADEnvnt.ZHUANGBEICHOUJIANG, this.onShipincomp3, this);
    }

    onPositionChange() {
        if (this.node.x == 0) {
            this.onEnable();
        }
    }

    protected onEnable(): void {
        FollowManager.getInstance().followEvent(Follow_Type.商城商城页点击次数);
        //this.refreshStore();
        //this.checkTutorails();
    }

    checkTutorails() {
        if (TutorailsManager.getInstance().is_tutorails_state && TutorailsManager.getInstance().isShowTutorials(222) && LevelManager.getInstance().finish_level >= 3) {
            TutorailsManager.getInstance().is_tutorails_state = true;
            this.scheduleOnce(() => {
                let store_ui = cc.find('Canvas/store_ui/scroll');
                let content = store_ui.getComponent(cc.ScrollView).content;
                let btn1 = content.getChildByName('heroRoot').getChildByName('heroItem').getChildByName('btn1');
                let wordPos = btn1.parent.convertToWorldSpaceAR(btn1.getPosition());
                let localPos = cc.find('Canvas/Ui_Root').convertToNodeSpaceAR(wordPos);
                localPos.x -= cc.find('Canvas/store_ui').x;
                TutorailsManager.getInstance().showTutorials(222, null, () => {
                    if (PropManager.getInstance().changePropNum(40004, -1)) {
                        if (HeroManager.getInstance().getHeroInfo(Hero_Type.DeLuYi) == null) {
                            let rewardList: RewardHeroData[] = new Array<RewardHeroData>();
                            let rd = new RewardHeroData();
                            rd.dropId = 110004;
                            rd.dropNum = 1;
                            rewardList.push(rd);
                            HeroManager.getInstance().addHero(Hero_Type.DeLuYi)
                            HeroManager.getInstance().reportHeroList();
                            let teamList = HeroManager.getInstance().getTeamList(GameMode.Main);
                            teamList[1] = Hero_Type.DeLuYi;
                            HeroManager.getInstance().saveTeamList(GameMode.Main, teamList);
                            TutorailsManager.getInstance().saveTutorials(222);
                            TutorailsManager.getInstance().saveTutorials(223);
                            UIManager.getInstance().showUiDialog(UIPath.StoreHeroUi, UILayerLevel.One, {
                                onCompleted: (uiNode) => {
                                    uiNode.getComponent(StoreHeroUi).init({
                                        onClose: () => {
                                            //直接进入游戏
                                            cc.find('Canvas/main_ui').getComponent(MainUi).startGame();
                                        }
                                    });
                                    uiNode.getComponent(StoreHeroUi).initData(rewardList);
                                },
                            });
                        }
                    }
                }, false, null, localPos);
            }, 0.1);

        }
    }

    initStore() {
        let content = this.node.getChildByName("scroll").getComponent(cc.ScrollView).content;
        content.removeAllChildren();
        cc.director.off("onRefreshInstanceItem");
        cc.director.on("onRefreshInstanceItem", this.onRefreshInstanceItem, this);
        // 章节礼包
        //#region 
        let title = cc.instantiate(this.store_title);
        title.getComponentInChildren(TextLanguage).setTextId(1430001);
        title.name = "chapterTitle";
        content.addChild(title);
        let chapterRoot = new cc.Node();
        chapterRoot.name = 'chapterRoot';
        chapterRoot.height = this.store_chapter_item.data.height;
        chapterRoot.width = (this.store_chapter_item.data.width + 20) * 3;

        let chapterRight = new cc.Node();
        let chapterLeft = new cc.Node();

        chapterRight.addComponent(cc.Sprite).spriteFrame = this.store_ui.getSpriteFrame("Shop_Arrow")
        chapterLeft.addComponent(cc.Sprite).spriteFrame = this.store_ui.getSpriteFrame("Shop_Arrow")
        chapterLeft.scaleX = -1;

        chapterRoot.addChild(chapterRight);
        chapterRoot.addChild(chapterLeft);

        chapterRight.x = 345;
        chapterLeft.x = -345;
        chapterLeft.active = false;

        // let chapterData = ChapterPackManager.getInstance().getJsonData();
        // chapterData.forEach((v, k) => {
        //     if (TheStorageManager.getInstance().getString(StorageKey.StoreChapterItem + v.Chapter, '') == '' && (LevelManager.getInstance().getFinishChapter()) >= v.Chapter) {
        //         let item = cc.instantiate(this.store_chapter_item);
        //         item.name = "chapterItem" + v.Chapter;
        //         if (v.Chapter == 1) {
        //             item.getChildByName("title").getComponent(TextLanguage).setTextId(1430002);
        //         } else {
        //             item.getChildByName("title").getComponent(TextLanguage).setTextId(1430003);
        //             item.getChildByName("title").getComponent(TextLanguage).setReplaceValue('~', v.Chapter + '');
        //         }
        //         let payInfo = PayManager.getInstance().getPayInfo(v.ProductId);
        //         item.getChildByName("originPrice").getComponent(cc.Label).string = payInfo.currency + (MyTool.getNumberFromString(payInfo.price) * v.InitialPrice);
        //         item.getChildByName("payBtn").getComponentInChildren(cc.Label).string = payInfo.price;
        //         let propRoot = item.getChildByName("itemRoot");
        //         if (v.GetCoinNum != 0) {
        //             let reward = PropManager.getInstance().createPropItem(PropId.Coin, v.GetCoinNum);
        //             reward.scale = 0.75;
        //             propRoot.addChild(reward);
        //         }
        //         if (v.GetGemNum != 0) {
        //             let reward = PropManager.getInstance().createPropItem(PropId.Gem, v.GetGemNum);
        //             reward.scale = 0.75;
        //             propRoot.addChild(reward);
        //         }
        //         if (v.ItemId_1 != 0) {
        //             let reward = PropManager.getInstance().createPropItem(v.ItemId_1, v.ItemNum_1);
        //             reward.scale = 0.75;
        //             propRoot.addChild(reward);
        //         }
        //         if (v.ItemId_2 != 0) {
        //             let reward = PropManager.getInstance().createPropItem(v.ItemId_2, v.ItemNum_2);
        //             reward.scale = 0.75;
        //             propRoot.addChild(reward);
        //         }
        //         chapterRoot.addChild(item);
        //         if (chapterRoot.childrenCount == 3) {
        //             chapterRoot.children[2].x = 0;
        //         } else {
        //             chapterRoot.children[chapterRoot.childrenCount - 1].x = 2 * chapterRoot.children[chapterRoot.childrenCount - 1].width;
        //         }
        //         let btn = item.getChildByName("payBtn");
        //         btn.addComponent(cc.Button).transition = cc.Button.Transition.SCALE;
        //         btn.getComponent(cc.Button).duration = 0.1;
        //         btn.getComponent(cc.Button).zoomScale = 0.9;
        //         btn.on(cc.Node.EventType.TOUCH_END, () => {
        //             ApkManager.getInstance().showPay({
        //                 result: (isDy) => {
        //                     if (isDy) {
        //                         FollowManager.getInstance().followEvent(Follow_Type.商城章节礼包x章点击购买次数 + v.Chapter);
        //                         let rewardList = [];
        //                         if (v.GetCoinNum != 0) {
        //                             PropManager.getInstance().changePropNum(PropId.Coin, v.GetCoinNum)
        //                             let reward = PropManager.getInstance().createPropItem(PropId.Coin, v.GetCoinNum);
        //                             rewardList.push(reward);
        //                         }
        //                         if (v.GetGemNum != 0) {
        //                             PropManager.getInstance().changePropNum(PropId.Gem, v.GetGemNum)
        //                             let reward = PropManager.getInstance().createPropItem(PropId.Gem, v.GetGemNum);
        //                             rewardList.push(reward);
        //                         }
        //                         if (v.ItemId_1 != 0) {
        //                             PropManager.getInstance().changePropNum(v.ItemId_1, v.ItemNum_1)
        //                             let reward = PropManager.getInstance().createPropItem(v.ItemId_1, v.ItemNum_1);
        //                             rewardList.push(reward);
        //                         }
        //                         if (v.ItemId_2 != 0) {
        //                             PropManager.getInstance().changePropNum(v.ItemId_2, v.ItemNum_2)
        //                             let reward = PropManager.getInstance().createPropItem(v.ItemId_2, v.ItemNum_2);
        //                             rewardList.push(reward);
        //                         }
        //                         GameManager.getInstance().showMultipleGetTip(rewardList);
        //                         TheStorageManager.getInstance().setItem(StorageKey.StoreChapterItem + v.Chapter, '1')
        //                         chapterRoot.removeChild(item);
        //                         if (chapterRoot.childrenCount == 2) {
        //                             content.getChildByName("chapterTitle").active = false;
        //                             chapterLeft.active = false;
        //                             chapterRight.active = false;
        //                             chapterRoot.active = false;
        //                         } else if (chapterRoot.childrenCount <= 3) {
        //                             chapterLeft.active = false;
        //                             chapterRight.active = false;
        //                             cc.tween(chapterRoot.children[2]).to(0.2, { position: cc.v3(0, 0, 0) }).start().call(() => {

        //                             });
        //                         } else {
        //                             cc.tween(chapterRoot.children[2]).to(0.2, { position: cc.v3(0, 0, 0) }).start().call(() => {

        //                             });
        //                         }

        //                     }
        //                 }
        //             }, v.ProductId)
        //         });
        //     }
        // });

        chapterLeft.addComponent(cc.Button).transition = cc.Button.Transition.SCALE;
        chapterLeft.getComponent(cc.Button).duration = 0.1;
        chapterLeft.getComponent(cc.Button).zoomScale = 0.9;

        chapterRight.addComponent(cc.Button).transition = cc.Button.Transition.SCALE;
        chapterRight.getComponent(cc.Button).duration = 0.1;
        chapterRight.getComponent(cc.Button).zoomScale = 0.9;

        let index = 2;
        chapterRight.on(cc.Node.EventType.TOUCH_END, () => {
            index++;
            if (index >= chapterRoot.childrenCount - 1) {
                index = chapterRoot.childrenCount - 1;
                chapterRight.active = false;
            }
            if (index > 2) chapterLeft.active = true;
            cc.tween(chapterRoot.children[index]).to(0.2, { position: cc.v3(0, 0, 0) }).start().call(() => {

            });
            cc.tween(chapterRoot.children[index - 1]).to(0.2, { position: cc.v3(-800, 0, 0) }).start().call(() => {

            });
        });

        chapterLeft.on(cc.Node.EventType.TOUCH_END, () => {
            index--;
            if (index <= 2) {
                index = 2;
                chapterLeft.active = false;
            }
            if (index < chapterRoot.childrenCount - 1) chapterRight.active = true;
            cc.tween(chapterRoot.children[index]).to(0.2, { position: cc.v3(0, 0, 0) }).start().call(() => {

            });
            cc.tween(chapterRoot.children[index + 1]).to(0.2, { position: cc.v3(800, 0, 0) }).start().call(() => {

            });
        });

        if (chapterRoot.childrenCount <= 3) {
            chapterLeft.active = false;
            chapterRight.active = false;
        }

        if (chapterRoot.childrenCount == 2) {
            content.getChildByName("chapterTitle").active = false;
            chapterRoot.active = false;
        }
        else {
            content.getChildByName("chapterTitle").active = true;
            chapterRoot.active = true;
        }
        content.addChild(chapterRoot);
        //#endregion
        // 英雄招募
        title = cc.instantiate(this.store_title);
        title.getComponentInChildren(TextLanguage).setTextId(1460011);
        title.name = "mysteryTitle";
        content.addChild(title);

        let heroRoot = new cc.Node();
        heroRoot.name = 'heroRoot';
        heroRoot.height = this.store_hero_item.data.height;
        heroRoot.width = (this.store_hero_item.data.width + 20) * 3;

        let heroItem = cc.instantiate(this.store_hero_item);
        this.hero_instance = heroItem;
        heroItem.name = "heroItem";
        heroItem.getChildByName("richBg").getComponentInChildren(cc.RichText).string = LanguageManager.getInstance().getStrByTextId(1460002);
        heroItem.getChildByName("IconNum").getComponent(cc.Label).string = "X" + PropManager.getInstance().getPropNum(40004);
        let prizeHeroData = DrawCardInformationManager.getInstance().getJsonDrawCardInformation(1001);
        if (PropManager.getInstance().getPropNum(prizeHeroData.OneDrawPropsID_1) >= prizeHeroData.OneDrawPropsSpend_1) {
            heroItem.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByPropId(prizeHeroData.OneDrawPropsID_1);
            heroItem.getChildByName("num1").getComponent(cc.Label).string = "x" + prizeHeroData.OneDrawPropsSpend_1;
        } else {
            heroItem.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByPropId(prizeHeroData.OneDrawPropsID_2);
            heroItem.getChildByName("num1").getComponent(cc.Label).string = "x" + prizeHeroData.OneDrawPropsSpend_2;
        }

        if (PropManager.getInstance().getPropNum(prizeHeroData.OneDrawPropsID_1) >= prizeHeroData.TenDrawPropsSpend_1) {
            heroItem.getChildByName("costIcon10").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByPropId(prizeHeroData.OneDrawPropsID_1);
            heroItem.getChildByName("num10").getComponent(cc.Label).string = "x" + prizeHeroData.TenDrawPropsSpend_1;
        } else {
            heroItem.getChildByName("costIcon10").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByPropId(prizeHeroData.OneDrawPropsID_2);
            heroItem.getChildByName("num10").getComponent(cc.Label).string = "x" + prizeHeroData.TenDrawPropsSpend_2;
        }

        let heroTip = heroItem.getChildByName("name").getChildByName("tip");
        heroTip.addComponent(cc.Button).transition = cc.Button.Transition.SCALE;
        heroTip.getComponent(cc.Button).duration = 0.1;
        heroTip.getComponent(cc.Button).zoomScale = 0.9;

        heroTip.on(cc.Node.EventType.TOUCH_END, () => {
            UIManager.getInstance().showUiDialog(UIPath.ProbabilityTipUi, UILayerLevel.One, {
                onCompleted: (uiNode) => {
                    uiNode.getComponent(ProbabilityTipUi).init(null);
                    uiNode.getComponent(ProbabilityTipUi).initUi();
                },
            });
        });

        let heroBtn1 = heroItem.getChildByName("btn1");
        let heroBtn10 = heroItem.getChildByName("btn10");
        heroBtn10.getChildByName('red').active = GameData.getInstance().getHeroRecruitingRedTip();
        heroBtn1.addComponent(cc.Button).transition = cc.Button.Transition.SCALE;
        heroBtn1.getComponent(cc.Button).duration = 0.1;
        heroBtn1.getComponent(cc.Button).zoomScale = 0.9;

        heroBtn10.addComponent(cc.Button).transition = cc.Button.Transition.SCALE;
        heroBtn10.getComponent(cc.Button).duration = 0.1;
        heroBtn10.getComponent(cc.Button).zoomScale = 0.9;

        heroBtn1.on(cc.Node.EventType.TOUCH_END, () => {
            let costId = 0;
            let costNum = 0;
            if (PropManager.getInstance().getPropNum(prizeHeroData.OneDrawPropsID_1) >= prizeHeroData.OneDrawPropsSpend_1) {
                costId = prizeHeroData.OneDrawPropsID_1;
                costNum = prizeHeroData.OneDrawPropsSpend_1;
                // 以下为后端未存消费券的处理，当后端存储消费券时，使用上面两行代码
                // PropManager.getInstance().changePropNum(prizeHeroData.OneDrawPropsID_1,-prizeHeroData.OneDrawPropsSpend_1);
                // costId = prizeHeroData.OneDrawPropsID_2;
                // costNum = 0;
                FollowManager.getInstance().addTotal(Follow_Type.记录招募消耗招募卷数量, prizeHeroData.OneDrawPropsSpend_1);
            } else {
                costId = prizeHeroData.OneDrawPropsID_2;
                costNum = prizeHeroData.OneDrawPropsSpend_2;
                FollowManager.getInstance().addTotal(Follow_Type.记录招募卷消耗钻石数量, costNum);
            }
            // if(PropManager.getInstance().getPropNum(costId) < costNum){
            //     UIManager.getInstance().showUiDialog(UIPath.CoinPop,UILayerLevel.Two,{onCompleted:(uiNode)=> {
            //         uiNode.getComponent(CoinPop).initUi(PropId.Gem)
            //     },});
            //     return;
            // }

            if (PropManager.getInstance().getPropNum(costId) < costNum) {
                // GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(100041));
                // this.node.getChildByName("scroll").getComponent(cc.ScrollView).scrollToBottom(2);
                UIManager.getInstance().showUiDialog(UIPath.Turntable,UILayerLevel.One,{onCompleted:(uiNode)=> {
                    uiNode.getComponent(Turmtable).initUi()
                },});//转盘
                return;
            }

            // if(IsDebug) costNum = 0;
            HttpManager.post(AccessName.tryPrize, this.getPrizeJsonString(1, 1, costId, costNum), true).then((data: any) => {
                if (data) {
                    PropManager.getInstance().changePropNum(costId, -costNum);
                    GameManager.getInstance().refreshGemShow();
                    FollowManager.getInstance().followEvent(Follow_Type.记录单次招募的次数);
                    TaskManager.getInstance().emitTask(TaskItem.进行1次英雄招募);
                    TaskManager.getInstance().emitTask(TaskItem.进行10次英雄招募);
                    TaskManager.getInstance().emitTask(TaskItem.招募X次英雄);
                    PropManager.getInstance().changePropNum(data[0].dropId, data[0].dropNum);
                    HeroManager.getInstance().reportHeroList();
                    let type = ItemManager.getInstance().getType(data[0].dropId);
                    if (type == 11) {
                        TaskManager.getInstance().emitTask(TaskItem.累计招募X个英雄);
                    }
                    PropManager.getInstance().saveAllPropNum();
                    UIManager.getInstance().showUiDialog(UIPath.StoreHeroUi, UILayerLevel.One, {
                        onCompleted: (uiNode) => {
                            uiNode.getComponent(StoreHeroUi).init(null);
                            uiNode.getComponent(StoreHeroUi).initData(data);
                        },
                    });
                    if (PropManager.getInstance().getPropNum(prizeHeroData.OneDrawPropsID_1) >= prizeHeroData.OneDrawPropsSpend_1) {
                        heroItem.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByPropId(prizeHeroData.OneDrawPropsID_1);
                        heroItem.getChildByName("num1").getComponent(cc.Label).string = "x" + prizeHeroData.OneDrawPropsSpend_1;
                    } else {
                        heroItem.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByPropId(prizeHeroData.OneDrawPropsID_2);
                        heroItem.getChildByName("num1").getComponent(cc.Label).string = "x" + prizeHeroData.OneDrawPropsSpend_2;
                    }

                    if (PropManager.getInstance().getPropNum(prizeHeroData.OneDrawPropsID_1) >= prizeHeroData.TenDrawPropsSpend_1) {
                        heroItem.getChildByName("costIcon10").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByPropId(prizeHeroData.OneDrawPropsID_1);
                        heroItem.getChildByName("num10").getComponent(cc.Label).string = "x" + prizeHeroData.TenDrawPropsSpend_1;
                    } else {
                        heroItem.getChildByName("costIcon10").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByPropId(prizeHeroData.OneDrawPropsID_2);
                        heroItem.getChildByName("num10").getComponent(cc.Label).string = "x" + prizeHeroData.TenDrawPropsSpend_2;
                    }
                }
            });
        });

        heroBtn10.on(cc.Node.EventType.TOUCH_END, () => {
            let costId = 0;
            let costNum = 0;
            if (PropManager.getInstance().getPropNum(prizeHeroData.OneDrawPropsID_1) >= prizeHeroData.TenDrawPropsSpend_1) {
                costId = prizeHeroData.OneDrawPropsID_1;
                costNum = prizeHeroData.TenDrawPropsSpend_1;
                // 以下为后端未存消费券的处理，当后端存储消费券时，使用上面两行代码
                // PropManager.getInstance().changePropNum(prizeHeroData.OneDrawPropsID_1,-prizeHeroData.TenDrawPropsSpend_1);
                // costId = prizeHeroData.OneDrawPropsID_2;
                // costNum = 0;
                FollowManager.getInstance().addTotal(Follow_Type.记录招募消耗招募卷数量, prizeHeroData.TenDrawPropsSpend_1);
            } else {
                costId = prizeHeroData.OneDrawPropsID_2;
                costNum = prizeHeroData.TenDrawPropsSpend_2;
                FollowManager.getInstance().addTotal(Follow_Type.记录招募卷消耗钻石数量, costNum);
            }
            // if(PropManager.getInstance().getPropNum(costId) < costNum){
            //     UIManager.getInstance().showUiDialog(UIPath.CoinPop,UILayerLevel.Two,{onCompleted:(uiNode)=> {
            //         uiNode.getComponent(CoinPop).initUi(PropId.Gem)
            //     },});
            //     return;
            // }

            if (PropManager.getInstance().getPropNum(costId) < costNum) {
                // GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(100041));
                // this.node.getChildByName("scroll").getComponent(cc.ScrollView).scrollToBottom(2);
                UIManager.getInstance().showUiDialog(UIPath.Turntable,UILayerLevel.One,{onCompleted:(uiNode)=> {
                    uiNode.getComponent(Turmtable).initUi()
                },});//转盘
                return;
            }

            // if(IsDebug) costNum = 0;   
            HttpManager.post(AccessName.tryPrize, this.getPrizeJsonString(2, 1, costId, costNum), true).then((data: any) => {
                if (data) {
                    PropManager.getInstance().changePropNum(costId, -costNum);
                    GameManager.getInstance().refreshGemShow();
                    FollowManager.getInstance().followEvent(Follow_Type.记录十次招募的次数);
                    let length = data.length;
                    for (let i = 0; i < length; i++) {
                        TaskManager.getInstance().emitTask(TaskItem.进行1次英雄招募);
                        TaskManager.getInstance().emitTask(TaskItem.进行10次英雄招募);
                        TaskManager.getInstance().emitTask(TaskItem.招募X次英雄);
                        PropManager.getInstance().changePropNum(data[i].dropId, data[i].dropNum);
                        let type = ItemManager.getInstance().getType(data[i].dropId);
                        if (type == 11) {
                            TaskManager.getInstance().emitTask(TaskItem.累计招募X个英雄);
                        }
                    }
                    HeroManager.getInstance().reportHeroList();
                    let tempIndex = MyTool.randomRangeInt(0, 9);
                    let temp = data[9];
                    data[9] = data[tempIndex];
                    data[tempIndex] = temp;
                    PropManager.getInstance().saveAllPropNum();
                    UIManager.getInstance().showUiDialog(UIPath.StoreHeroUi, UILayerLevel.One, {
                        onCompleted: (uiNode) => {
                            uiNode.getComponent(StoreHeroUi).init(null);
                            uiNode.getComponent(StoreHeroUi).initData(data);
                        },
                    });
                    if (PropManager.getInstance().getPropNum(prizeHeroData.OneDrawPropsID_1) >= prizeHeroData.OneDrawPropsSpend_1) {
                        heroItem.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByPropId(prizeHeroData.OneDrawPropsID_1);
                        heroItem.getChildByName("num1").getComponent(cc.Label).string = "x" + prizeHeroData.OneDrawPropsSpend_1;
                    } else {
                        heroItem.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByPropId(prizeHeroData.OneDrawPropsID_2);
                        heroItem.getChildByName("num1").getComponent(cc.Label).string = "x" + prizeHeroData.OneDrawPropsSpend_2;
                    }

                    if (PropManager.getInstance().getPropNum(prizeHeroData.OneDrawPropsID_1) >= prizeHeroData.TenDrawPropsSpend_1) {
                        heroItem.getChildByName("costIcon10").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByPropId(prizeHeroData.OneDrawPropsID_1);
                        heroItem.getChildByName("num10").getComponent(cc.Label).string = "x" + prizeHeroData.TenDrawPropsSpend_1;
                    } else {
                        heroItem.getChildByName("costIcon10").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByPropId(prizeHeroData.OneDrawPropsID_2);
                        heroItem.getChildByName("num10").getComponent(cc.Label).string = "x" + prizeHeroData.TenDrawPropsSpend_2;
                    }
                    heroBtn10.getChildByName('red').active = GameData.getInstance().getHeroRecruitingRedTip();
                    EventManager.postRedEvent(RedEventString.RED_CHECK, RedEventType.Btn_Shop);
                }
            });
        });
        heroRoot.addChild(heroItem);
        content.addChild(heroRoot);
        // 每日商店
        //#region 
        title = cc.instantiate(this.store_title);
        title.getComponentInChildren(TextLanguage).setTextId(1480001);
        title.name = "dailyStoreTitle";
        content.addChild(title);

        let timeLabel = new cc.Node().addComponent(TextLanguage);
        timeLabel.node.color = cc.color(255, 242, 206);
        timeLabel.node.anchorX = 1;
        timeLabel.verticalAlign = cc.Label.VerticalAlign.CENTER;
        timeLabel.horizontalAlign = cc.Label.HorizontalAlign.RIGHT;
        timeLabel.enableBold = true;
        timeLabel.fontSize = 24;
        timeLabel.setTextId(100045);

        let timeNum = new cc.Node().addComponent(cc.Label);
        timeNum.node.color = cc.color(79, 255, 70);
        timeNum.node.anchorX = 0;
        timeNum.verticalAlign = cc.Label.VerticalAlign.CENTER;
        timeNum.horizontalAlign = cc.Label.HorizontalAlign.LEFT;
        timeNum.enableBold = true;
        timeNum.fontSize = 24;

        let nowTime = Date.now() / 1000;
        let residueTime = TheStorageManager.getInstance().getNumber(StorageKey.TomorowZeroTimeStamp, 0) - nowTime;
        if (residueTime < 0) {
            residueTime = ((new Date(new Date().toLocaleDateString()).getTime() + 8640000) / 1000) - nowTime;
        }
        let hh = Math.floor(residueTime / (60 * 60));
        if (hh < 10) {
            timeNum.string = '0' + hh + ':';
        } else {
            timeNum.string = hh + ':';
        }
        let mm = Math.floor(residueTime % (60 * 60) / 60);
        if (mm < 10) {
            timeNum.string += '0' + mm + ':'
        } else {
            timeNum.string += mm + ':'
        }
        let ss = Math.floor(residueTime % (60 * 60) % 60)
        if (ss < 10) {
            timeNum.string += '0' + ss
        } else {
            timeNum.string += ss
        }
        // 动态刷新一律写在函数的最下方

        let textRoot = new cc.Node();
        textRoot.width = this.node.width;
        textRoot.height = 20;
        textRoot.addChild(timeLabel.node);
        textRoot.addChild(timeNum.node);
        content.addChild(textRoot);

        let dailyStoreRoot = new cc.Node();
        dailyStoreRoot.name = 'dailyStoreRoot';
        dailyStoreRoot.height = this.store_daily_item.data.height * 2 + 10;
        dailyStoreRoot.width = this.node.width
        content.addChild(dailyStoreRoot);
        let dailyStoreLayout = dailyStoreRoot.addComponent(cc.Layout);
        dailyStoreLayout.type = cc.Layout.Type.GRID;
        dailyStoreLayout.resizeMode = cc.Layout.ResizeMode.CONTAINER;

        dailyStoreLayout.paddingRight = 40;
        dailyStoreLayout.paddingLeft = 40;
        dailyStoreLayout.spacingX = 20;
        dailyStoreLayout.spacingY = 20;
        let dailyData: JsonDailyShop;
        if (TheStorageManager.getInstance().getNumber(StorageKey.StoreDailyShopId, 0) == 0) {
            let index = this.getRandomInt(1, 4);
            dailyData = DailyShopManager.getInstance().getJsonDataByChapterAndInde(LevelManager.getInstance().getFinishChapter(), index);
            TheStorageManager.getInstance().setItem(StorageKey.StoreDailyShopId, dailyData.Shop_ID);
        } else {
            dailyData = DailyShopManager.getInstance().getJsonDailyShop(TheStorageManager.getInstance().getNumber(StorageKey.StoreDailyShopId))
        }
        console.log("每日商店ID:" + dailyData.Shop_ID);
        dailyData.Shoplist.forEach((v, k) => {
            console.log("每日商店道具" + k + ":" + v);
        });
        dailyData.Shoplist.forEach((v, k) => {
            let item = cc.instantiate(this.store_daily_item);
            let storeItemInfo = CommodityInformationManager.getInstance().getJsonCommodityInformation(v)
            if (TheStorageManager.getInstance().getNumber(StorageKey.StoreDailyShopNum + k, 0) < storeItemInfo.AdPlayableTimes) {
                // 可购买
                if (CommodityInformationManager.getInstance().getAdReward(v) == 1) {
                    // 广告商品
                    item.getChildByName("discountIcon").active = false;
                    item.getChildByName("discountNum").active = false;
                    item.getChildByName("price").active = false;
                    item.getChildByName("free").active = true;
                    item.getChildByName("red").active = true;
                    item.getChildByName("costIcon").active=false;
                    item.getChildByName("adicon").active=true;
                   
                    item.getChildByName("name").getComponent(TextLanguage).setTextId(ItemManager.getInstance().getNameTextId(storeItemInfo.GetItem));
                    // let name = item.getChildByName("name").getComponent(cc.Label);
                    // if(ItemManager.getInstance().getJsonItem(storeItemInfo.GetItem).Type==5){
                    //     let valueStr=24;
                    //     let yushu=ItemManager.getInstance().getJsonItem(storeItemInfo.GetItem).ItemID%10-1;
                    //     if(yushu<=4){
                    //         valueStr=Math.pow(2,yushu);
                    //     }
                    //     if(valueStr == 16) valueStr = 24;
                    //     name.getComponent(cc.Label).string=name.getComponent(cc.Label).string.replace('~',valueStr.toString());
                    //     // detailStr=detailStr.replace('~',valueStr.toString());
                    // }
                    let reward = PropManager.getInstance().createPropItem(storeItemInfo.GetItem, storeItemInfo.GetNum);
                    reward.name = 'reward';
                    item.addChild(reward);

                    item.addComponent(cc.Button).transition = cc.Button.Transition.SCALE;
                    item.getComponent(cc.Button).duration = 0.1;
                    item.getComponent(cc.Button).zoomScale = 0.9;

                    item.on(cc.Node.EventType.TOUCH_END, () => {
                        this.adItem=item;
                        this.informationTemp=v;
                        this.informationK=k;
                        if (cc.sys.platform === cc.sys.BYTEDANCE_GAME) {

                  

                            WXManagerEX.getInstance().zuanshiiShipin= tt.createRewardedVideoAd({
                                adUnitId: 'dbee4b199d912f6onp'
                            });
                            WXManagerEX.getInstance().zuanshiiShipin.offError();
            WXManagerEX.getInstance().zuanshiiShipin.onError(err => {
                console.log(err)
            });
                            WXManagerEX.getInstance().zuanshiiShipin.offClose();
                            WXManagerEX.getInstance().zuanshiiShipin.show().catch(() => {
                                // 失败重试
                                WXManagerEX.getInstance().zuanshiiShipin.load()
                                    .then(() => WXManagerEX.getInstance().zuanshiiShipin.show())
                                    .catch(err => {
                                        GameManager.getInstance().showMessage("广告拉取失败");
                                    })
                            })
                            WXManagerEX.getInstance().zuanshiiShipin.onClose(res => {
                                // 用户点击了【关闭广告】按钮
                                // 小于 2.1.0 的基础库版本，res 是一个 undefined
                                if (res && res.isEnded || res === undefined) {
                                  // 正常播放结束，可以下发游戏奖励
                                  this.onShipinComp();
                                }
                                else {
                                    // 播放中途退出，不下发游戏奖励
                                }
                                WXManagerEX.getInstance().zuanshiiShipin.destroy();
                            })
                
                        }else{
                            this.onShipinComp();
                        }
                    });
                } else {
                    // 非广告商品
                    if (TheStorageManager.getInstance().getNumber(StorageKey.StoreDailyShopDiscount + k, 0) == 0) {
                        // 无折扣需要随机折扣
                        let discountNum = this.getRandomInt(4, 9);
                        TheStorageManager.getInstance().setItem(StorageKey.StoreDailyShopDiscount + k, discountNum);
                        item.getChildByName("free").active = false;
                        item.getChildByName("red").active = false;
                        EventManager.postRedEvent(RedEventString.RED_CHECK, RedEventType.Btn_Shop);
                        item.getChildByName("costIcon").active=true;
                    item.getChildByName("adicon").active=false;
                        item.getChildByName("costIcon").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByPropId(storeItemInfo.CostItemID);
                        item.getChildByName("price").getComponent(cc.Label).string = 'x' + MyTool.getCoinDanwei(storeItemInfo.CostNum * discountNum * 0.1);
                        item.getChildByName("name").getComponent(TextLanguage).setTextId(ItemManager.getInstance().getNameTextId(storeItemInfo.GetItem));
                        item.getChildByName("discountNum").getComponent(TextLanguage).setReplaceValue('~', (100 - discountNum * 10) + '');
                        let reward = PropManager.getInstance().createPropItem(storeItemInfo.GetItem, storeItemInfo.GetNum);
                        reward.name = 'reward';
                        item.addChild(reward);

                        item.addComponent(cc.Button).transition = cc.Button.Transition.SCALE;
                        item.getComponent(cc.Button).duration = 0.1;
                        item.getComponent(cc.Button).zoomScale = 0.9;


                        item.on(cc.Node.EventType.TOUCH_END, () => {
                            if (PropManager.getInstance().changePropNum(storeItemInfo.CostItemID, -(storeItemInfo.CostNum * discountNum * 0.1))) {
                                TaskManager.getInstance().emitTask(TaskItem.商店中购买物品1次);
                                TaskManager.getInstance().emitTask(TaskItem.前往商城购买X次商品);
                                PropManager.getInstance().changePropNum(storeItemInfo.GetItem, storeItemInfo.GetNum);
                                HttpManager.post(AccessName.saveGameTask, this.getSaveGameTaskJsonString(k));
                                let reward = PropManager.getInstance().createPropItem(storeItemInfo.GetItem, storeItemInfo.GetNum);
                                let num = TheStorageManager.getInstance().getNumber(StorageKey.StoreDailyShopNum + k, 0);
                                num++;
                                if (storeItemInfo.CostItemID == PropId.Coin) {
                                    FollowManager.getInstance().addTotal(Follow_Type.在每日商店中消耗的金币数量, (storeItemInfo.CostNum * discountNum * 0.1))
                                    FollowManager.getInstance().followEvent(Follow_Type.在每日商店中使用金币购买物品的次数);
                                } else {
                                    FollowManager.getInstance().addTotal(Follow_Type.在每日商店中消耗的钻石数量, (storeItemInfo.CostNum * discountNum * 0.1))
                                    FollowManager.getInstance().followEvent(Follow_Type.在每日商店中使用钻石购买物品的次数);
                                }
                                TheStorageManager.getInstance().setItem(StorageKey.StoreDailyShopNum + k, num);
                                if (num >= storeItemInfo.AdPlayableTimes) {
                                    item.getChildByName("costIcon").active = false;
                                    item.getChildByName("price").active = false;
                                    item.getChildByName("discountNum").active = false;
                                    item.getChildByName("discountIcon").active = false;
                                    item.getChildByName("saleOut").zIndex = 1;
                                    item.getChildByName("saleOut").active = true;
                                    let type = ItemManager.getInstance().getType(storeItemInfo.GetItem)
                                    if (type == 3) {
                                        item.getChildByName("reward").getComponent(EquipItem).prop_action = PropAction.Null;
                                    } else {
                                        item.getChildByName("reward").getComponent(Prop).prop_action = PropAction.Null;
                                    }
                                    item.off(cc.Node.EventType.TOUCH_END);
                                }
                                FollowManager.getInstance().followEvent(Follow_Type.每日商店中成功购买物品的次数);
                                GameManager.getInstance().showGetTip(reward);
                            } else {

                                if (storeItemInfo.CostItemID == PropId.Coin) {
                                    UIManager.getInstance().showUiDialog(UIPath.CoinPop, UILayerLevel.Three, {
                                        onCompleted: (uiNode) => {
                                            uiNode.getComponent(CoinPop).initUi(PropId.Coin)
                                        },
                                    });
                                } else {
                                    UIManager.getInstance().showUiDialog(UIPath.CoinPop, UILayerLevel.Three, {
                                        onCompleted: (uiNode) => {
                                            uiNode.getComponent(CoinPop).initUi(PropId.Gem)
                                        },
                                    });
                                }

                                // GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(100041));
                                FollowManager.getInstance().followEvent(Follow_Type.每日商店中购买失败的次数);
                            }
                        });
                    } else {
                        // 有折扣直接读取折扣的大小
                        let discountNum = TheStorageManager.getInstance().getNumber(StorageKey.StoreDailyShopDiscount + k);

                        item.getChildByName("free").active = false;
                        item.getChildByName("red").active = false;
                        EventManager.postRedEvent(RedEventString.RED_CHECK, RedEventType.Btn_Shop);
                        item.getChildByName("costIcon").active=true;
                        item.getChildByName("adicon").active=false;
                        item.getChildByName("costIcon").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByPropId(storeItemInfo.CostItemID);
                        item.getChildByName("price").getComponent(cc.Label).string = 'x' + MyTool.getCoinDanwei(storeItemInfo.CostNum * discountNum * 0.1);
                        item.getChildByName("name").getComponent(TextLanguage).setTextId(ItemManager.getInstance().getNameTextId(storeItemInfo.GetItem));
                        item.getChildByName("discountNum").getComponent(TextLanguage).setReplaceValue('~', (100 - discountNum * 10) + '');
                        let reward = PropManager.getInstance().createPropItem(storeItemInfo.GetItem, storeItemInfo.GetNum);
                        reward.name = 'reward';
                        item.addChild(reward);

                        item.addComponent(cc.Button).transition = cc.Button.Transition.SCALE;
                        item.getComponent(cc.Button).duration = 0.1;
                        item.getComponent(cc.Button).zoomScale = 0.9;

                        item.on(cc.Node.EventType.TOUCH_END, () => {
                            if (PropManager.getInstance().changePropNum(storeItemInfo.CostItemID, -(storeItemInfo.CostNum * discountNum * 0.1))) {
                                TaskManager.getInstance().emitTask(TaskItem.商店中购买物品1次);
                                TaskManager.getInstance().emitTask(TaskItem.前往商城购买X次商品);
                                PropManager.getInstance().changePropNum(storeItemInfo.GetItem, storeItemInfo.GetNum);
                                HttpManager.post(AccessName.saveGameTask, this.getSaveGameTaskJsonString(k));
                                let reward = PropManager.getInstance().createPropItem(storeItemInfo.GetItem, storeItemInfo.GetNum);
                                let num = TheStorageManager.getInstance().getNumber(StorageKey.StoreDailyShopNum + k, 0);
                                num++;
                                if (storeItemInfo.CostItemID == PropId.Coin) {
                                    FollowManager.getInstance().addTotal(Follow_Type.在每日商店中消耗的金币数量, (storeItemInfo.CostNum * discountNum * 0.1))
                                    FollowManager.getInstance().followEvent(Follow_Type.在每日商店中使用金币购买物品的次数);
                                } else {
                                    FollowManager.getInstance().addTotal(Follow_Type.在每日商店中消耗的钻石数量, (storeItemInfo.CostNum * discountNum * 0.1))
                                    FollowManager.getInstance().followEvent(Follow_Type.在每日商店中使用钻石购买物品的次数);
                                }
                                TheStorageManager.getInstance().setItem(StorageKey.StoreDailyShopNum + k, num);
                                if (num >= storeItemInfo.AdPlayableTimes) {
                                    item.getChildByName("costIcon").active = false;
                                    item.getChildByName("price").active = false;
                                    item.getChildByName("discountNum").active = false;
                                    item.getChildByName("discountIcon").active = false;
                                    item.getChildByName("saleOut").zIndex = 1;
                                    item.getChildByName("saleOut").active = true;
                                    let type = ItemManager.getInstance().getType(storeItemInfo.GetItem)
                                    if (type == 3) {
                                        item.getChildByName("reward").getComponent(EquipItem).prop_action = PropAction.Null;
                                    } else {
                                        item.getChildByName("reward").getComponent(Prop).prop_action = PropAction.Null;
                                    }
                                    item.off(cc.Node.EventType.TOUCH_END);
                                }
                                GameManager.getInstance().showGetTip(reward);
                                FollowManager.getInstance().followEvent(Follow_Type.每日商店中成功购买物品的次数);
                            } else {
                                if (storeItemInfo.CostItemID == PropId.Coin) {
                                    UIManager.getInstance().showUiDialog(UIPath.CoinPop, UILayerLevel.Three, {
                                        onCompleted: (uiNode) => {
                                            uiNode.getComponent(CoinPop).initUi(PropId.Coin)
                                        },
                                    });
                                    // FollowManager.getInstance().addTotal(Follow_Type.在每日商店中消耗的金币数量,(storeItemInfo.CostNum * discountNum * 0.1))
                                    // FollowManager.getInstance().followEvent(Follow_Type.在每日商店中使用金币购买物品的次数);
                                } else {
                                    UIManager.getInstance().showUiDialog(UIPath.CoinPop, UILayerLevel.Three, {
                                        onCompleted: (uiNode) => {
                                            uiNode.getComponent(CoinPop).initUi(PropId.Gem)
                                        },
                                    });
                                    // FollowManager.getInstance().addTotal(Follow_Type.在每日商店中消耗的钻石数量,(storeItemInfo.CostNum * discountNum * 0.1))
                                    // FollowManager.getInstance().followEvent(Follow_Type.在每日商店中使用钻石购买物品的次数);
                                }
                                // GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(100041));
                                FollowManager.getInstance().followEvent(Follow_Type.每日商店中购买失败的次数);
                            }
                        });
                    }
                }
            } else {
                // 不可购买
                item.getChildByName("costIcon").active = false;
                item.getChildByName("price").active = false;
                item.getChildByName("discountNum").active = false;
                item.getChildByName("discountIcon").active = false;
                item.getChildByName("free").active = false;
                item.getChildByName("red").active = false;
                EventManager.postRedEvent(RedEventString.RED_CHECK, RedEventType.Btn_Shop);
                let reward = PropManager.getInstance().createPropItem(storeItemInfo.GetItem, storeItemInfo.GetNum, PropAction.Null);
                item.addChild(reward);
                item.getChildByName("name").getComponent(TextLanguage).setTextId(ItemManager.getInstance().getNameTextId(storeItemInfo.GetItem));
                item.getChildByName("saleOut").zIndex = 1;
                item.getChildByName("saleOut").active = true;
            }
            dailyStoreRoot.addChild(item);
        });
        //#endregion
        // 神秘商店
        //#region 
        title = cc.instantiate(this.store_title);
        title.getComponentInChildren(TextLanguage).setTextId(1460011);
        title.name = "mysteryTitle";
        content.addChild(title);

        let mysteryRoot = new cc.Node();
        mysteryRoot.name = 'mysteryRoot';
        mysteryRoot.height = this.store_equip_item.data.height + 20;
        mysteryRoot.width = this.node.width;

        let mysteryLayout = mysteryRoot.addComponent(cc.Layout);
        mysteryLayout.type = cc.Layout.Type.HORIZONTAL;
        mysteryLayout.resizeMode = cc.Layout.ResizeMode.CONTAINER;

        mysteryLayout.paddingRight = 40;
        mysteryLayout.paddingLeft = 40;
        mysteryLayout.spacingX = 20;

        let petItem = cc.instantiate(this.store_pet_item);
        petItem.getChildByName("richBg").children[1].children[1].getComponent(cc.Label).string = "X" + PropManager.getInstance().getPropNum(40006);
        this.pet_instance = petItem;
        petItem.getChildByName("richBg").getComponentInChildren(cc.RichText).string = LanguageManager.getInstance().getStrByTextId(1460005);
        let prizePetData = DrawCardInformationManager.getInstance().getJsonDrawCardInformation(3001);
        if (PropManager.getInstance().getPropNum(prizePetData.OneDrawPropsID_1) >= prizePetData.OneDrawPropsSpend_1) {
            petItem.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByPropId(prizePetData.OneDrawPropsID_1);
            petItem.getChildByName("num1").getComponent(cc.Label).string = "x" + prizePetData.OneDrawPropsSpend_1;
        } else {
            petItem.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByPropId(prizePetData.OneDrawPropsID_2);
            petItem.getChildByName("num1").getComponent(cc.Label).string = "x" + prizePetData.OneDrawPropsSpend_2;
        }

        if (PropManager.getInstance().getPropNum(prizePetData.OneDrawPropsID_1) >= prizePetData.TenDrawPropsSpend_1) {
            petItem.getChildByName("costIcon10").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByPropId(prizePetData.OneDrawPropsID_1);
            petItem.getChildByName("num10").getComponent(cc.Label).string = "x" + prizePetData.TenDrawPropsSpend_1;
        } else {
            petItem.getChildByName("costIcon10").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByPropId(prizePetData.OneDrawPropsID_2);
            petItem.getChildByName("num10").getComponent(cc.Label).string = "x" + prizePetData.TenDrawPropsSpend_2;
        }

        let oneDayTime = 60 * 60 * 24 * 1000;
        let currentTime = Date.now();
        if (TheStorageManager.getInstance().getNumber(StorageKey.StoreMysteryPetFreeTime, 0) + oneDayTime - currentTime <= 0) {
            // 免费
            petItem.getChildByName("num1").active = false;
            petItem.getChildByName("free").active = true;
            petItem.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = this.store_ui.getSpriteFrame("Shop_Icon_ADS");
        } else {
            petItem.getChildByName("num1").active = true;
            petItem.getChildByName("free").active = false;
        }
        let petBtn1 = petItem.getChildByName("btn1");
        let petBtn10 = petItem.getChildByName("btn10");
        petBtn1.getChildByName('red').active = GameData.getInstance().getPetRecruitingRedTip();
        petBtn1.addComponent(cc.Button).transition = cc.Button.Transition.SCALE;
        petBtn1.getComponent(cc.Button).duration = 0.1;
        petBtn1.getComponent(cc.Button).zoomScale = 0.9;

        petBtn10.addComponent(cc.Button).transition = cc.Button.Transition.SCALE;
        petBtn10.getComponent(cc.Button).duration = 0.1;
        petBtn10.getComponent(cc.Button).zoomScale = 0.9;

        petBtn1.on(cc.Node.EventType.TOUCH_END, () => {
            // 暂未开放处理
            // let s = LanguageManager.getInstance().getStrByTextId(100113);
            // GameManager.getInstance().showMessage(s);
            // return;
            if (FunctionDefinitionManager.getInstance().getIsUnlock(FuncType.PetParadise) == false) {
                let unlockType = FunctionDefinitionManager.getInstance().getUnlockConditionType(FuncType.PetParadise);
                let s = '';
                if (unlockType == 1) {
                    s = LanguageManager.getInstance().getStrByTextId(100051);
                    s = s.replace('.', '.' + (FunctionDefinitionManager.getInstance().getUnlockCondictionParameter(FuncType.PetParadise)) + '')
                } else {
                    s = LanguageManager.getInstance().getStrByTextId(100052);
                    s = s.replace('~', (MissionLevelManager.getInstance().getLevelName((FunctionDefinitionManager.getInstance().getUnlockCondictionParameter(FuncType.PetParadise)))) + '')
                }
                GameManager.getInstance().showMessage(s);
                return
            }
            let costId = 0;
            let costNum = 0;
            if (PropManager.getInstance().getPropNum(prizePetData.OneDrawPropsID_1) >= prizePetData.OneDrawPropsSpend_1) {
                costId = prizePetData.OneDrawPropsID_1;
                costNum = prizePetData.OneDrawPropsSpend_1;
            } else {
                costId = prizePetData.OneDrawPropsID_2;
                costNum = prizePetData.OneDrawPropsSpend_2;
            }
            let oneDayTime = 60 * 60 * 24 * 1000;
            let currentTime = Date.now();
            if (TheStorageManager.getInstance().getNumber(StorageKey.StoreMysteryPetFreeTime, 0) + oneDayTime - currentTime <= 0) {
                // 免费
                costNum = 0;
                TheStorageManager.getInstance().setItem(StorageKey.StoreMysteryPetFreeTime, currentTime)
                if (PropManager.getInstance().getPropNum(prizePetData.OneDrawPropsID_1) >= prizePetData.OneDrawPropsSpend_1) {
                    petItem.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByPropId(prizePetData.OneDrawPropsID_1);
                    petItem.getChildByName("num1").getComponent(cc.Label).string = "x" + prizePetData.OneDrawPropsSpend_1;
                } else {
                    petItem.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByPropId(prizePetData.OneDrawPropsID_2);
                    petItem.getChildByName("num1").getComponent(cc.Label).string = "x" + prizePetData.OneDrawPropsSpend_2;
                }
                petItem.getChildByName("num1").active = true;
                petItem.getChildByName("free").active = false;
                ApkManager.getInstance().showVideo((isTrue: boolean) => {
                    if (isTrue) {
                        costNum = 0;
                        TheStorageManager.getInstance().setItem(StorageKey.StoreMysteryPetFreeTime, currentTime);
                        if (PropManager.getInstance().getPropNum(prizePetData.OneDrawPropsID_1) >= prizePetData.OneDrawPropsSpend_1) {
                            petItem.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByPropId(prizePetData.OneDrawPropsID_1);
                            petItem.getChildByName("num1").getComponent(cc.Label).string = "x" + prizePetData.OneDrawPropsSpend_1;
                        } else {
                            petItem.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByPropId(prizePetData.OneDrawPropsID_2);
                            petItem.getChildByName("num1").getComponent(cc.Label).string = "x" + prizePetData.OneDrawPropsSpend_2;
                        }
                        petItem.getChildByName("num1").active = true;
                        petItem.getChildByName("free").active = false;
                        petBtn1.getChildByName('red').active = GameData.getInstance().getPetRecruitingRedTip();
                        EventManager.postRedEvent(RedEventString.RED_CHECK, RedEventType.Btn_Shop);
                        HttpManager.post(AccessName.tryPrize, this.getPrizeJsonString(1, 3, costId, costNum), true).then((data: any) => {
                            if (data) {
                                // FollowManager.getInstance().followEvent(Follow_Type.记录开启1次宠物的次数);
                                // TaskManager.getInstance().emitTask(TaskItem.进行1次开启装备);
                                TaskManager.getInstance().emitTask(TaskItem.累计孵化灵宠蛋X次);
                                TaskManager.getInstance().emitTask(TaskItem.前往商城孵化X次宠物);
                                TaskManager.getInstance().emitTask(TaskItem.进行1次宠物招募);
                                TaskManager.getInstance().emitTask(TaskItem.进行10次宠物孵化);
                                let rewardItem = PropManager.getInstance().createPropItem(data[0].dropId, data[0].dropNum);
                                PropManager.getInstance().changePropNum(data[0].dropId, data[0].dropNum);
                                PropManager.getInstance().saveAllPropNum();
                                GameManager.getInstance().showGetTip(rewardItem);
                                if (PropManager.getInstance().getPropNum(prizePetData.OneDrawPropsID_1) >= prizePetData.OneDrawPropsSpend_1) {
                                    petItem.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByPropId(prizePetData.OneDrawPropsID_1);
                                    petItem.getChildByName("num1").getComponent(cc.Label).string = "x" + prizePetData.OneDrawPropsSpend_1;
                                } else {
                                    petItem.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByPropId(prizePetData.OneDrawPropsID_2);
                                    petItem.getChildByName("num1").getComponent(cc.Label).string = "x" + prizePetData.OneDrawPropsSpend_2;
                                }

                                if (PropManager.getInstance().getPropNum(prizePetData.OneDrawPropsID_1) >= prizePetData.TenDrawPropsSpend_1) {
                                    petItem.getChildByName("costIcon10").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByPropId(prizePetData.OneDrawPropsID_1);
                                    petItem.getChildByName("num10").getComponent(cc.Label).string = "x" + prizePetData.TenDrawPropsSpend_1;
                                } else {
                                    petItem.getChildByName("costIcon10").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByPropId(prizePetData.OneDrawPropsID_2);
                                    petItem.getChildByName("num10").getComponent(cc.Label).string = "x" + prizePetData.TenDrawPropsSpend_2;
                                }

                                if (PropManager.getInstance().getPropNum(prizePetData.OneDrawPropsID_1) >= prizePetData.OneDrawPropsSpend_1) {
                                    petItem.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByPropId(prizePetData.OneDrawPropsID_1);
                                    petItem.getChildByName("num1").getComponent(cc.Label).string = "x" + prizePetData.OneDrawPropsSpend_1;
                                } else {
                                    petItem.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByPropId(prizePetData.OneDrawPropsID_2);
                                    petItem.getChildByName("num1").getComponent(cc.Label).string = "x" + prizePetData.OneDrawPropsSpend_2;
                                }
                            }
                        });
                    } else {
                        // GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(1));
                    }
                }, VIDEO_TYPE.Equip)
            } else {
                if (PropManager.getInstance().getPropNum(costId) < costNum) {
                    // GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(100041));
                    // this.node.getChildByName("scroll").getComponent(cc.ScrollView).scrollToBottom(2);
                    UIManager.getInstance().showUiDialog(UIPath.Turntable,UILayerLevel.One,{onCompleted:(uiNode)=> {
                        uiNode.getComponent(Turmtable).initUi()
                    },});//转盘
                    return;
                }
                HttpManager.post(AccessName.tryPrize, this.getPrizeJsonString(1, 3, costId, costNum), true).then((data: any) => {
                    if (data) {
                        TaskManager.getInstance().emitTask(TaskItem.累计孵化灵宠蛋X次);
                        TaskManager.getInstance().emitTask(TaskItem.前往商城孵化X次宠物);
                        TaskManager.getInstance().emitTask(TaskItem.进行1次宠物招募);
                        TaskManager.getInstance().emitTask(TaskItem.进行10次宠物孵化);
                        PropManager.getInstance().changePropNum(costId, -costNum);
                        GameManager.getInstance().refreshGemShow();
                        let rewardItem = PropManager.getInstance().createPropItem(data[0].dropId, data[0].dropNum);
                        PropManager.getInstance().changePropNum(data[0].dropId, data[0].dropNum);
                        PropManager.getInstance().saveAllPropNum();
                        GameManager.getInstance().showGetTip(rewardItem);
                        if (PropManager.getInstance().getPropNum(prizePetData.OneDrawPropsID_1) >= prizePetData.OneDrawPropsSpend_1) {
                            petItem.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByPropId(prizePetData.OneDrawPropsID_1);
                            petItem.getChildByName("num1").getComponent(cc.Label).string = "x" + prizePetData.OneDrawPropsSpend_1;
                        } else {
                            petItem.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByPropId(prizePetData.OneDrawPropsID_2);
                            petItem.getChildByName("num1").getComponent(cc.Label).string = "x" + prizePetData.OneDrawPropsSpend_2;
                        }

                        if (PropManager.getInstance().getPropNum(prizePetData.OneDrawPropsID_1) >= prizePetData.TenDrawPropsSpend_1) {
                            petItem.getChildByName("costIcon10").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByPropId(prizePetData.OneDrawPropsID_1);
                            petItem.getChildByName("num10").getComponent(cc.Label).string = "x" + prizePetData.TenDrawPropsSpend_1;
                        } else {
                            petItem.getChildByName("costIcon10").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByPropId(prizePetData.OneDrawPropsID_2);
                            petItem.getChildByName("num10").getComponent(cc.Label).string = "x" + prizePetData.TenDrawPropsSpend_2;
                        }

                        if (PropManager.getInstance().getPropNum(prizePetData.OneDrawPropsID_1) >= prizePetData.OneDrawPropsSpend_1) {
                            petItem.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByPropId(prizePetData.OneDrawPropsID_1);
                            petItem.getChildByName("num1").getComponent(cc.Label).string = "x" + prizePetData.OneDrawPropsSpend_1;
                        } else {
                            petItem.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByPropId(prizePetData.OneDrawPropsID_2);
                            petItem.getChildByName("num1").getComponent(cc.Label).string = "x" + prizePetData.OneDrawPropsSpend_2;
                        }
                    }
                });
            }
        });

        petBtn10.on(cc.Node.EventType.TOUCH_END, () => {
            // 暂未开放处理
            // let s = LanguageManager.getInstance().getStrByTextId(100113);
            // GameManager.getInstance().showMessage(s);
            // return;

            if (FunctionDefinitionManager.getInstance().getIsUnlock(FuncType.PetParadise) == false) {
                let unlockType = FunctionDefinitionManager.getInstance().getUnlockConditionType(FuncType.PetParadise);
                let s = '';
                if (unlockType == 1) {
                    s = LanguageManager.getInstance().getStrByTextId(100051);
                    s = s.replace('.', '.' + (FunctionDefinitionManager.getInstance().getUnlockCondictionParameter(FuncType.PetParadise)) + '')
                } else {
                    s = LanguageManager.getInstance().getStrByTextId(100052);
                    s = s.replace('~', (MissionLevelManager.getInstance().getLevelName((FunctionDefinitionManager.getInstance().getUnlockCondictionParameter(FuncType.PetParadise)))) + '')
                }
                GameManager.getInstance().showMessage(s);
                return
            }

            let costId = 0;
            let costNum = 0;
            if (PropManager.getInstance().getPropNum(prizePetData.OneDrawPropsID_1) >= prizePetData.TenDrawPropsSpend_1) {
                costId = prizePetData.OneDrawPropsID_1;
                costNum = prizePetData.TenDrawPropsSpend_1;
            } else {
                costId = prizePetData.OneDrawPropsID_2;
                costNum = prizePetData.TenDrawPropsSpend_2;
            }
            if (PropManager.getInstance().getPropNum(costId) < costNum) {
                // GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(100041));
                // this.node.getChildByName("scroll").getComponent(cc.ScrollView).scrollToBottom(2);
                UIManager.getInstance().showUiDialog(UIPath.Turntable,UILayerLevel.One,{onCompleted:(uiNode)=> {
                    uiNode.getComponent(Turmtable).initUi()
                },});//转盘
                return;
            }
            // if(IsDebug) costNum = 0;   
            HttpManager.post(AccessName.tryPrize, this.getPrizeJsonString(2, 3, costId, costNum), true).then((data: any) => {
                if (data) {
                    PropManager.getInstance().changePropNum(costId, -costNum);
                    GameManager.getInstance().refreshGemShow();
                    let length = data.length;
                    let rewardList = [];
                    let tempIndex = MyTool.randomRangeInt(0, 9);
                    let temp = data[9];
                    data[9] = data[tempIndex];
                    data[tempIndex] = temp;
                    for (let i = 0; i < length; i++) {
                        let rewardItem = PropManager.getInstance().createPropItem(data[i].dropId, data[i].dropNum);
                        PropManager.getInstance().changePropNum(data[i].dropId, data[i].dropNum);
                        rewardList.push(rewardItem);
                        TaskManager.getInstance().emitTask(TaskItem.前往商城孵化X次宠物);
                        TaskManager.getInstance().emitTask(TaskItem.进行1次宠物招募);
                        TaskManager.getInstance().emitTask(TaskItem.进行10次宠物孵化);
                        TaskManager.getInstance().emitTask(TaskItem.累计孵化灵宠蛋X次);
                    }
                    PropManager.getInstance().saveAllPropNum();
                    GameManager.getInstance().showMultipleGetTip(rewardList);
                }
            });
        });
        // mysteryRoot.addChild(petItem);

        let equipItem = cc.instantiate(this.store_equip_item);
        equipItem.getChildByName("richBg").children[1].children[1].getComponent(cc.Label).string = "X" + PropManager.getInstance().getPropNum(40005);
        this.weapon_instance = equipItem;
        equipItem.getChildByName("richBg").getComponentInChildren(cc.RichText).string = LanguageManager.getInstance().getStrByTextId(1460006);
        let prizeEquipData = DrawCardInformationManager.getInstance().getJsonDrawCardInformation(2001);
        if (PropManager.getInstance().getPropNum(prizeEquipData.OneDrawPropsID_1) >= prizeEquipData.OneDrawPropsSpend_1) {
            equipItem.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByPropId(prizeEquipData.OneDrawPropsID_1);
            equipItem.getChildByName("num1").getComponent(cc.Label).string = "x" + prizeEquipData.OneDrawPropsSpend_1;
        } else {
            equipItem.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByPropId(prizeEquipData.OneDrawPropsID_2);
            equipItem.getChildByName("num1").getComponent(cc.Label).string = "x" + prizeEquipData.OneDrawPropsSpend_2;
        }

        if (PropManager.getInstance().getPropNum(prizeEquipData.OneDrawPropsID_1) >= prizeEquipData.TenDrawPropsSpend_1) {
            equipItem.getChildByName("costIcon10").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByPropId(prizeEquipData.OneDrawPropsID_1);
            equipItem.getChildByName("num10").getComponent(cc.Label).string = "x" + prizeEquipData.TenDrawPropsSpend_1;
        } else {
            equipItem.getChildByName("costIcon10").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByPropId(prizeEquipData.OneDrawPropsID_2);
            equipItem.getChildByName("num10").getComponent(cc.Label).string = "x" + prizeEquipData.TenDrawPropsSpend_2;
        }

        // oneDayTime = 60*60*24*1000;
        currentTime = Date.now();
        if (TheStorageManager.getInstance().getNumber(StorageKey.StoreMysteryEquipFreeTime, 0) + oneDayTime - currentTime <= 0) {
            // 免费
            equipItem.getChildByName("num1").active = false;
            equipItem.getChildByName("free").active = true;
            equipItem.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = null;
        } else {
            equipItem.getChildByName("num1").active = true;
            equipItem.getChildByName("free").active = false;
        }
        let equipBtn1 = equipItem.getChildByName("btn1");
        let equipBtn10 = equipItem.getChildByName("btn10");
        equipBtn1.getChildByName('lay').getChildByName('red').active = GameData.getInstance().getEquipFreeRedTip();
        equipBtn1.addComponent(cc.Button).transition = cc.Button.Transition.SCALE;
        equipBtn1.getComponent(cc.Button).duration = 0.1;
        equipBtn1.getComponent(cc.Button).zoomScale = 0.9;

        equipBtn10.addComponent(cc.Button).transition = cc.Button.Transition.SCALE;
        equipBtn10.getComponent(cc.Button).duration = 0.1;
        equipBtn10.getComponent(cc.Button).zoomScale = 0.9;

        equipBtn1.on(cc.Node.EventType.TOUCH_END, () => {
            let costId = 0;
            let costNum = 0;
            if (PropManager.getInstance().getPropNum(prizeEquipData.OneDrawPropsID_1) >= prizeEquipData.OneDrawPropsSpend_1) {
                costId = prizeEquipData.OneDrawPropsID_1;
                costNum = prizeEquipData.OneDrawPropsSpend_1;
                // 以下为后端未存消费券的处理，当后端存储消费券时，使用上面两行代码
                // PropManager.getInstance().changePropNum(prizeEquipData.OneDrawPropsID_1,-prizeEquipData.OneDrawPropsSpend_1);
                // costId = prizeEquipData.OneDrawPropsID_2;
                // costNum = 0;
                FollowManager.getInstance().addTotal(Follow_Type.记录消耗的钥匙数量, prizeEquipData.OneDrawPropsSpend_1);
            } else {
                costId = prizeEquipData.OneDrawPropsID_2;
                costNum = prizeEquipData.OneDrawPropsSpend_2;
                FollowManager.getInstance().addTotal(Follow_Type.记录消耗宝石数量, costNum);
            }
            let oneDayTime = 60 * 60 * 24 * 1000;
            let currentTime = Date.now();
            if (TheStorageManager.getInstance().getNumber(StorageKey.StoreMysteryEquipFreeTime, 0) + oneDayTime - currentTime <= 0) {
                this.equipItemTemp=equipItem;
                this.costIdTemp=costId;
                this.prizeEquipDataTemp=prizeEquipData;

                if (cc.sys.platform === cc.sys.BYTEDANCE_GAME) {

              

                    WXManagerEX.getInstance().zhuangbeikuShipin= tt.createRewardedVideoAd({
                        adUnitId: '613effl7e21d5e7dc6'
                    });
                    WXManagerEX.getInstance().zhuangbeikuShipin.offError();
                            WXManagerEX.getInstance().zhuangbeikuShipin.onError(err => {
                                console.log(err)
                            });

                    WXManagerEX.getInstance().zhuangbeikuShipin.offClose();
                    WXManagerEX.getInstance().zhuangbeikuShipin.show().catch(() => {
                        // 失败重试
                        WXManagerEX.getInstance().zhuangbeikuShipin.load()
                            .then(() => WXManagerEX.getInstance().zhuangbeikuShipin.show())
                            .catch(err => {
                                GameManager.getInstance().showMessage("广告拉取失败");
                            })
                    })
                    WXManagerEX.getInstance().zhuangbeikuShipin.onClose(res => {
                        // 用户点击了【关闭广告】按钮
                        // 小于 2.1.0 的基础库版本，res 是一个 undefined
                        if (res && res.isEnded || res === undefined) {
                          // 正常播放结束，可以下发游戏奖励
                          this.onSHipincomp2();
                        }
                        else {
                            // 播放中途退出，不下发游戏奖励
                        }
                        WXManagerEX.getInstance().zhuangbeikuShipin.destroy();
                    })
        
                }else{
                    this.onSHipincomp2();
                }

            } else {
                if (PropManager.getInstance().getPropNum(costId) < costNum) {
                    // GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(100041));
                    // this.node.getChildByName("scroll").getComponent(cc.ScrollView).scrollToBottom(2);
                    UIManager.getInstance().showUiDialog(UIPath.Turntable,UILayerLevel.One,{onCompleted:(uiNode)=> {
                        uiNode.getComponent(Turmtable).initUi()
                    },});//转盘
                    return;
                }
                HttpManager.post(AccessName.tryPrize, this.getPrizeJsonString(1, 2, costId, costNum), true).then((data: any) => {
                    if (data) {
                        PropManager.getInstance().changePropNum(costId, -costNum);
                        GameManager.getInstance().refreshGemShow();
                        FollowManager.getInstance().followEvent(Follow_Type.记录开启1次装备的次数);
                        TaskManager.getInstance().emitTask(TaskItem.进行1次开启装备);
                        TaskManager.getInstance().emitTask(TaskItem.进行10次开启装备);
                        TaskManager.getInstance().emitTask(TaskItem.累计获得X件装备);
                        let rewardItem = PropManager.getInstance().createPropItem(data[0].dropId, data[0].dropNum);
                        PropManager.getInstance().changePropNum(data[0].dropId, data[0].dropNum);
                        PropManager.getInstance().saveAllPropNum();
                        GameManager.getInstance().showGetTip(rewardItem);
                        if (PropManager.getInstance().getPropNum(prizeEquipData.OneDrawPropsID_1) >= prizeEquipData.OneDrawPropsSpend_1) {
                            equipItem.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByPropId(prizeEquipData.OneDrawPropsID_1);
                            equipItem.getChildByName("num1").getComponent(cc.Label).string = "x" + prizeEquipData.OneDrawPropsSpend_1;
                        } else {
                            equipItem.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByPropId(prizeEquipData.OneDrawPropsID_2);
                            equipItem.getChildByName("num1").getComponent(cc.Label).string = "x" + prizeEquipData.OneDrawPropsSpend_2;
                        }

                        if (PropManager.getInstance().getPropNum(prizeEquipData.OneDrawPropsID_1) >= prizeEquipData.TenDrawPropsSpend_1) {
                            equipItem.getChildByName("costIcon10").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByPropId(prizeEquipData.OneDrawPropsID_1);
                            equipItem.getChildByName("num10").getComponent(cc.Label).string = "x" + prizeEquipData.TenDrawPropsSpend_1;
                        } else {
                            equipItem.getChildByName("costIcon10").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByPropId(prizeEquipData.OneDrawPropsID_2);
                            equipItem.getChildByName("num10").getComponent(cc.Label).string = "x" + prizeEquipData.TenDrawPropsSpend_2;
                        }

                      
                        if (TheStorageManager.getInstance().getNumber(StorageKey.StoreMysteryEquipFreeTime, 0) + oneDayTime - currentTime <= 0) {
                            // 免费
                            equipItem.getChildByName("num1").active = false;
                            equipItem.getChildByName("free").active = true;
                            equipItem.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = null;
                        } else {
                            equipItem.getChildByName("num1").active = true;
                            equipItem.getChildByName("free").active = false;
                        }
                    }
                });
            }
            // if(IsDebug) costNum = 0;

        });

        equipBtn10.on(cc.Node.EventType.TOUCH_END, () => {
            let costId = 0;
            let costNum = 0;
            if (PropManager.getInstance().getPropNum(prizeEquipData.OneDrawPropsID_1) >= prizeEquipData.TenDrawPropsSpend_1) {
                // costId = prizeEquipData.OneDrawPropsID_1;
                // costNum = prizeEquipData.TenDrawPropsSpend_1;
                // 以下为后端未存消费券的处理，当后端存储消费券时，使用上面两行代码
                PropManager.getInstance().changePropNum(prizeEquipData.OneDrawPropsID_1, -prizeEquipData.TenDrawPropsSpend_1);
                costId = prizeEquipData.OneDrawPropsID_2;
                costNum = 0;
                FollowManager.getInstance().addTotal(Follow_Type.记录消耗的钥匙数量, prizeEquipData.TenDrawPropsSpend_1);
            } else {
                costId = prizeEquipData.OneDrawPropsID_2;
                costNum = prizeEquipData.TenDrawPropsSpend_2;
                FollowManager.getInstance().addTotal(Follow_Type.记录消耗宝石数量, costNum);
            }

            if (PropManager.getInstance().getPropNum(costId) < costNum) {
                // GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(100041));
                // this.node.getChildByName("scroll").getComponent(cc.ScrollView).scrollToBottom(2);
                UIManager.getInstance().showUiDialog(UIPath.Turntable,UILayerLevel.One,{onCompleted:(uiNode)=> {
                    uiNode.getComponent(Turmtable).initUi()
                },});//转盘
                return;
            }

            // if(IsDebug) costNum = 0;   
            HttpManager.post(AccessName.tryPrize, this.getPrizeJsonString(2, 2, costId, costNum), true).then((data: any) => {
                if (data) {
                    PropManager.getInstance().changePropNum(costId, -costNum);
                    GameManager.getInstance().refreshGemShow();
                    FollowManager.getInstance().followEvent(Follow_Type.记录开启10次装备的次数);
                    let length = data.length;
                    let rewardList = [];
                    let tempIndex = MyTool.randomRangeInt(0, 9);
                    let temp = data[9];
                    data[9] = data[tempIndex];
                    data[tempIndex] = temp;
                    for (let i = 0; i < length; i++) {
                        TaskManager.getInstance().emitTask(TaskItem.进行1次开启装备);
                        TaskManager.getInstance().emitTask(TaskItem.进行10次开启装备);
                        TaskManager.getInstance().emitTask(TaskItem.累计获得X件装备);
                        let rewardItem = PropManager.getInstance().createPropItem(data[i].dropId, data[i].dropNum);
                        PropManager.getInstance().changePropNum(data[i].dropId, data[i].dropNum);
                        rewardList.push(rewardItem);
                    }
                    GameManager.getInstance().showMultipleGetTip(rewardList);
                    PropManager.getInstance().saveAllPropNum();
                    if (PropManager.getInstance().getPropNum(prizeEquipData.OneDrawPropsID_1) >= prizeEquipData.OneDrawPropsSpend_1) {
                        equipItem.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByPropId(prizeEquipData.OneDrawPropsID_1);
                        equipItem.getChildByName("num1").getComponent(cc.Label).string = "x" + prizeEquipData.OneDrawPropsSpend_1;
                    } else {
                        equipItem.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByPropId(prizeEquipData.OneDrawPropsID_2);
                        equipItem.getChildByName("num1").getComponent(cc.Label).string = "x" + prizeEquipData.OneDrawPropsSpend_2;
                    }

                    if (PropManager.getInstance().getPropNum(prizeEquipData.OneDrawPropsID_1) >= prizeEquipData.TenDrawPropsSpend_1) {
                        equipItem.getChildByName("costIcon10").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByPropId(prizeEquipData.OneDrawPropsID_1);
                        equipItem.getChildByName("num10").getComponent(cc.Label).string = "x" + prizeEquipData.TenDrawPropsSpend_1;
                    } else {
                        equipItem.getChildByName("costIcon10").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByPropId(prizeEquipData.OneDrawPropsID_2);
                        equipItem.getChildByName("num10").getComponent(cc.Label).string = "x" + prizeEquipData.TenDrawPropsSpend_2;
                    }

                    if (TheStorageManager.getInstance().getNumber(StorageKey.StoreMysteryEquipFreeTime, 0) + oneDayTime - currentTime <= 0) {
                        // 免费
                        equipItem.getChildByName("num1").active = false;
                        equipItem.getChildByName("free").active = true;
                        equipItem.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = null;
                    } else {
                        equipItem.getChildByName("num1").active = true;
                        equipItem.getChildByName("free").active = false;
                    }
                }
            });
        });
        mysteryRoot.addChild(equipItem);
        content.addChild(mysteryRoot);
        //#endregion
        // 钻石
        //#region 
        title = cc.instantiate(this.store_title);
        title.getComponentInChildren(TextLanguage).setTextId(400002);
        title.name = "gemTitle";
        //content.addChild(title);

        let gemRoot = new cc.Node();
        gemRoot.name = 'gemRoot';
        gemRoot.height = this.store_gem_item.data.height * 2 + 10;
        gemRoot.width = this.node.width
        //content.addChild(gemRoot);
        let gemLayout = gemRoot.addComponent(cc.Layout);
        gemLayout.type = cc.Layout.Type.GRID;
        gemLayout.resizeMode = cc.Layout.ResizeMode.CONTAINER;

        gemLayout.paddingRight = 40;
        gemLayout.paddingLeft = 40;
        gemLayout.spacingX = 20;
        gemLayout.spacingY = 20;

        let gemData = DiamondsRechargeManager.getInstance().getJsonData()
        gemData.forEach((v, k) => {
            let item = cc.instantiate(this.store_gem_item);
            item.name = 'gem' + v.RechargeID;
            item.getChildByName("title").getComponent(TextLanguage).setTextId(400002);
            item.getChildByName("title").getComponent(TextLanguage).string = v.DiamondsNum + item.getChildByName("title").getComponent(TextLanguage).string;
            let payInfo = PayManager.getInstance().getPayInfo(v.ProductId);
            item.getChildByName("num").getComponent(cc.Label).string = payInfo.price;
            item.getChildByName('icon').getComponent(cc.Sprite).spriteFrame = this.store_ui.getSpriteFrame("Shop_Icon_Gem_" + (v.RechargeID - 1));
            if (TheStorageManager.getInstance().getString(StorageKey.StoreGemItem + v.RechargeID, '') == '') {
                item.getChildByName('bg').active = true;
                item.getChildByName('tip').active = true;
                item.getChildByName("tip").getComponent(TextLanguage).setTextId(1410004);
                item.getChildByName("tip").getComponent(TextLanguage).setReplaceValue('~', v.GetDiamondsNum + '');
            } else {
                item.getChildByName('bg').active = false;
                item.getChildByName('tip').active = false;
            }
            let button = item.addComponent(cc.Button);
            button.transition = cc.Button.Transition.SCALE
            button.duration = 0.1;
            button.zoomScale = 0.9;

            let clickEvent = new cc.Component.EventHandler();
            clickEvent.target = this.node;
            clickEvent.component = 'StoreUi';
            clickEvent.handler = 'onGemBtnClick';
            clickEvent.customEventData = v.RechargeID + '';
            button.clickEvents.push(clickEvent);
            // button

            // item.on(cc.Node.EventType.TOUCH_END,()=>{
            //     ApkManager.getInstance().showPay({
            //         result:(isDy)=> {
            //             if(isDy){
            //                 FollowManager.getInstance().followEvent(Follow_Type.x钻石点击购买次数 + v.ProductId);
            //                 if(TheStorageManager.getInstance().getString(StorageKey.StoreGemItem + v.RechargeID,'') == ''){
            //                     let reward = PropManager.getInstance().createPropItem(PropId.Gem,v.DiamondsNum + v.GetDiamondsNum);
            //                     PropManager.getInstance().changePropNum(PropId.Gem,v.DiamondsNum + v.GetDiamondsNum);
            //                     TheStorageManager.getInstance().setItem(StorageKey.StoreGemItem + v.RechargeID,'1');
            //                     item.getChildByName('bg').active = false;
            //                     item.getChildByName('tip').active = false;
            //                     GameManager.getInstance().showGetTip(reward);
            //                 }else{
            //                     let reward = PropManager.getInstance().createPropItem(PropId.Gem,v.DiamondsNum);
            //                     PropManager.getInstance().changePropNum(PropId.Gem,v.DiamondsNum);
            //                     GameManager.getInstance().showGetTip(reward);
            //                 }
            //             }
            //         }
            //     },v.ProductId)
            // });
            //gemRoot.addChild(item);
        });
        //#endregion
        // 金币
        //#region 
        title = cc.instantiate(this.store_title);
        title.getComponentInChildren(TextLanguage).setTextId(400001);
        title.name = "coinTitle";
        content.addChild(title);

        let coinRoot = new cc.Node();
        coinRoot.name = 'coinRoot';
        coinRoot.height = this.store_coin_item.data.height + 10;
        coinRoot.width = this.node.width
        content.addChild(coinRoot);
        let coinLayout = coinRoot.addComponent(cc.Layout);
        coinLayout.type = cc.Layout.Type.HORIZONTAL;
        coinLayout.resizeMode = cc.Layout.ResizeMode.CONTAINER;

        coinLayout.paddingRight = 40;
        coinLayout.paddingLeft = 40;
        coinLayout.spacingX = 20;

        let coinData = PurchaseCoinsManager.getInstance().getJsonDataByChapter(LevelManager.getInstance().getFinishChapter());
        coinData.forEach((v, k) => {
            let item = cc.instantiate(this.store_coin_item);
            item.getChildByName("title").getComponent(cc.Label).string = v.GetCoinNum + '';
            item.getChildByName("icon").getComponent(cc.Sprite).spriteFrame = this.store_ui.getSpriteFrame("Shop_Icon_Coin_" + v.DisplayPosition);
            if (v.AdReward == 1) {
                if (Number(TheStorageManager.getInstance().getInt(StorageKey.StoreCoinItem + k, 0)) < v.AdPlayableTimes) {
                    
                    item.getChildByName("adicon").active=true;
                    item.getChildByName("costIcon").active=false;
                    item.getChildByName("num").active = false;
                    item.getChildByName("text").active = true;
                    item.getChildByName('red').active = true;
                } else {
                    item.getChildByName("adicon").active=false;
                    item.getChildByName("costIcon").active=true;
                    item.getChildByName("num").active = true;
                    item.getChildByName("num").getComponent(cc.Label).string = 'x' + v.ConsumeDiamondsNum;
                    item.getChildByName("text").active = false;
                    item.getChildByName('red').active = false;
                }
            } else {
                item.getChildByName("adicon").active=false;
                item.getChildByName("costIcon").active=true;
                item.getChildByName("num").active = true;
                item.getChildByName("num").getComponent(cc.Label).string = 'x' + v.ConsumeDiamondsNum;
                item.getChildByName("text").active = false;
                item.getChildByName('red').active = false;
            }

            item.addComponent(cc.Button).transition = cc.Button.Transition.SCALE;
            item.getComponent(cc.Button).duration = 0.1;
            item.getComponent(cc.Button).zoomScale = 0.9;

            coinRoot.addChild(item);
            item.on(cc.Node.EventType.TOUCH_END, () => {
                if (v.AdReward == 1) {
                    if (Number(TheStorageManager.getInstance().getInt(StorageKey.StoreCoinItem + k, 0)) < v.AdPlayableTimes) {
                      
                        this.vTemp=v;
                        this.adItem=item;
                        this.kTemp=k;
                        if (cc.sys.platform === cc.sys.BYTEDANCE_GAME) {

                            WXManagerEX.getInstance().jinbiShipin = tt.createRewardedVideoAd({
                                adUnitId: '1fida1lqejnd3pd4l1'
                            });
                            WXManagerEX.getInstance().jinbiShipin.offError();
                            WXManagerEX.getInstance().jinbiShipin.onError(err => {
                                console.log(err)
                            });
                            WXManagerEX.getInstance().jinbiShipin.offClose();
                            WXManagerEX.getInstance().jinbiShipin.show().catch(() => {
                                // 失败重试
                                WXManagerEX.getInstance().jinbiShipin.load()
                                    .then(() => WXManagerEX.getInstance().jinbiShipin.show())
                                    .catch(err => {
                                        GameManager.getInstance().showMessage("广告拉取失败");
                                    })
                            })
                            WXManagerEX.getInstance().jinbiShipin.onClose(res => {
                                // 用户点击了【关闭广告】按钮
                                // 小于 2.1.0 的基础库版本，res 是一个 undefined
                                if (res && res.isEnded || res === undefined) {
                                  // 正常播放结束，可以下发游戏奖励
                                  this.onShipincomp3();
                                }
                                else {
                                    // 播放中途退出，不下发游戏奖励
                                }
                                WXManagerEX.getInstance().jinbiShipin.destroy();
                            })
                
                        }else{
                            this.onShipincomp3();
                        }
                    } else {
                        if (PropManager.getInstance().changePropNum(PropId.Gem, -v.ConsumeDiamondsNum)) {
                            TaskManager.getInstance().emitTask(TaskItem.购买1次商店中的金币);
                            FollowManager.getInstance().followEvent(Follow_Type.x金币点击购买次数 + v.CoinPurchaseID);
                            PropManager.getInstance().changePropNum(PropId.Coin, v.GetCoinNum);
                            let reward = PropManager.getInstance().createPropItem(PropId.Coin, v.GetCoinNum);
                            GameManager.getInstance().showGetTip(reward);
                        } else {
                            UIManager.getInstance().showUiDialog(UIPath.CoinPop, UILayerLevel.Three, {
                                onCompleted: (uiNode) => {
                                    uiNode.getComponent(CoinPop).initUi(PropId.Gem)
                                },
                            });
                        }
                    }
                } else {
                    if (PropManager.getInstance().changePropNum(PropId.Gem, -v.ConsumeDiamondsNum)) {
                        TaskManager.getInstance().emitTask(TaskItem.购买1次商店中的金币);
                        FollowManager.getInstance().followEvent(Follow_Type.x金币点击购买次数 + v.CoinPurchaseID);
                        PropManager.getInstance().changePropNum(PropId.Coin, v.GetCoinNum);
                        let reward = PropManager.getInstance().createPropItem(PropId.Coin, v.GetCoinNum);
                        GameManager.getInstance().showGetTip(reward);
                    } else {
                        UIManager.getInstance().showUiDialog(UIPath.CoinPop, UILayerLevel.Three, {
                            onCompleted: (uiNode) => {
                                uiNode.getComponent(CoinPop).initUi(PropId.Gem)
                            },
                        });
                    }
                }
            });
        });
        //#endregion
        // 动态刷新内容
        this.schedule(() => {
            // 每日商店刷新
            nowTime = Date.now() / 1000;
            let residueTime = TheStorageManager.getInstance().getNumber(StorageKey.TomorowZeroTimeStamp, 0) - nowTime;
            if (residueTime < 0) {
                residueTime = ((new Date(new Date().toLocaleDateString()).getTime() + 8640000) / 1000) - nowTime;
            }
            let hh = Math.floor(residueTime / (60 * 60));
            if (hh < 10) {
                timeNum.string = '0' + hh + ':';
            } else {
                timeNum.string = hh + ':';
            }
            let mm = Math.floor(residueTime % (60 * 60) / 60);
            if (mm < 10) {
                timeNum.string += '0' + mm + ':'
            } else {
                timeNum.string += mm + ':'
            }
            let ss = Math.floor(residueTime % (60 * 60) % 60)
            if (ss < 10) {
                timeNum.string += '0' + ss
            } else {
                timeNum.string += ss
            }

            currentTime = Date.now();
            // 宠物刷新
            if (TheStorageManager.getInstance().getNumber(StorageKey.StoreMysteryPetFreeTime, 0) + oneDayTime - currentTime <= 0 && petItem.getChildByName("num1").active == true) {
                petItem.getChildByName("num1").active = false;
                petItem.getChildByName("free").active = true;
                petItem.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = this.store_ui.getSpriteFrame("Shop_Icon_ADS");
            }
            // 武器刷新
            if (TheStorageManager.getInstance().getNumber(StorageKey.StoreMysteryEquipFreeTime, 0) + oneDayTime - currentTime <= 0 && petItem.getChildByName("num1").active == true) {
                equipItem.getChildByName("num1").active = false;
                equipItem.getChildByName("free").active = true;
                equipItem.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = null;
            }
        }, 1, cc.macro.REPEAT_FOREVER, 0)


    }
    private onShipincomp3():void{

        TaskManager.getInstance().emitTask(TaskItem.购买1次商店中的金币);
        FollowManager.getInstance().followEvent(Follow_Type.x金币点击购买次数 + this.vTemp.CoinPurchaseID);
        PropManager.getInstance().changePropNum(PropId.Coin, this.vTemp.GetCoinNum);
        let reward = PropManager.getInstance().createPropItem(PropId.Coin,this.vTemp.GetCoinNum);
        let num = TheStorageManager.getInstance().getInt(StorageKey.StoreCoinItem + this.kTemp, 0) + 1;
        TheStorageManager.getInstance().setItem(StorageKey.StoreCoinItem + this.kTemp, num)
        GameManager.getInstance().showGetTip(reward);
        if (num >= this.vTemp.AdPlayableTimes) {
            this.adItem.getChildByName("costIcon").active=true;
            this.adItem.getChildByName("adicon").active=false;
            this.adItem.getChildByName("costIcon").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByPropId(PropId.Gem);
            this.adItem.getChildByName("num").active = true;
            this.adItem.getChildByName("num").getComponent(cc.Label).string = 'x' + this.vTemp.ConsumeDiamondsNum;
            this.adItem.getChildByName("text").active = false;
            this.adItem.getChildByName('red').active = false;
            EventManager.postRedEvent(RedEventString.RED_CHECK, RedEventType.Btn_Shop);
        }





       
    }
    private onSHipincomp2():void{
        var costNum = 0;
        let currentTime = Date.now();
        TheStorageManager.getInstance().setItem(StorageKey.StoreMysteryEquipFreeTime, currentTime);
       
        let equipBtn1 = this.equipItemTemp.getChildByName("btn1");
        equipBtn1.getChildByName('lay').getChildByName('red').active = GameData.getInstance().getEquipFreeRedTip();
        EventManager.postRedEvent(RedEventString.RED_CHECK, RedEventType.Btn_Shop);
        this.equipItemTemp.getChildByName("num1").active = true;
        this.equipItemTemp.getChildByName("free").active = false;
        HttpManager.post(AccessName.tryPrize, this.getPrizeJsonString(1, 2, this.costIdTemp, costNum), true).then((data: any) => {
            if (data) {
                FollowManager.getInstance().followEvent(Follow_Type.记录开启1次装备的次数);
                TaskManager.getInstance().emitTask(TaskItem.进行1次开启装备);
                TaskManager.getInstance().emitTask(TaskItem.进行10次开启装备);
                TaskManager.getInstance().emitTask(TaskItem.累计获得X件装备);
                let rewardItem = PropManager.getInstance().createPropItem(data[0].dropId, data[0].dropNum);
                PropManager.getInstance().changePropNum(data[0].dropId, data[0].dropNum);
                PropManager.getInstance().saveAllPropNum();
                GameManager.getInstance().showGetTip(rewardItem);
                if (PropManager.getInstance().getPropNum(this.prizeEquipDataTemp.OneDrawPropsID_1) >= this.prizeEquipDataTemp.OneDrawPropsSpend_1) {
                    this.equipItemTemp.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByPropId(this.prizeEquipDataTemp.OneDrawPropsID_1);
                    this.equipItemTemp.getChildByName("num1").getComponent(cc.Label).string = "x" + this.prizeEquipDataTemp.OneDrawPropsSpend_1;
                } else {
                    this.equipItemTemp.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByPropId(this.prizeEquipDataTemp.OneDrawPropsID_2);
                    this.equipItemTemp.getChildByName("num1").getComponent(cc.Label).string = "x" + this.prizeEquipDataTemp.OneDrawPropsSpend_2;
                }

                if (PropManager.getInstance().getPropNum(this.prizeEquipDataTemp.OneDrawPropsID_1) >= this.prizeEquipDataTemp.TenDrawPropsSpend_1) {
                    this.equipItemTemp.getChildByName("costIcon10").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByPropId(this.prizeEquipDataTemp.OneDrawPropsID_1);
                    this.equipItemTemp.getChildByName("num10").getComponent(cc.Label).string = "x" + this.prizeEquipDataTemp.TenDrawPropsSpend_1;
                } else {
                    this.equipItemTemp.getChildByName("costIcon10").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByPropId(this.prizeEquipDataTemp.OneDrawPropsID_2);
                    this.equipItemTemp.getChildByName("num10").getComponent(cc.Label).string = "x" + this.prizeEquipDataTemp.TenDrawPropsSpend_2;
                }

             
            }
        });
    }
    private onShipinComp():void{
        let storeItemInfo = CommodityInformationManager.getInstance().getJsonCommodityInformation(this.informationTemp)
        TaskManager.getInstance().emitTask(TaskItem.商店中购买物品1次);
        TaskManager.getInstance().emitTask(TaskItem.前往商城购买X次商品);
        PropManager.getInstance().changePropNum(storeItemInfo.GetItem, storeItemInfo.GetNum);
        let reward = PropManager.getInstance().createPropItem(storeItemInfo.GetItem, storeItemInfo.GetNum);
        let num = TheStorageManager.getInstance().getNumber(StorageKey.StoreDailyShopNum + this.informationK, 0);
        num++;
        FollowManager.getInstance().followEvent(Follow_Type.在每日商店中使用广告购买钻石的次数);
        TheStorageManager.getInstance().setItem(StorageKey.StoreDailyShopNum + this.informationK, num);
        if (num >= storeItemInfo.AdPlayableTimes) {
            this.adItem.getChildByName("costIcon").active = false;
            this.adItem.getChildByName("free").active = false;
            this.adItem.getChildByName("saleOut").zIndex = 1;
            this.adItem.getChildByName("saleOut").active = true;
            this.adItem.getChildByName("red").active = false;
            EventManager.postRedEvent(RedEventString.RED_CHECK, RedEventType.Btn_Shop);
            let type = ItemManager.getInstance().getType(storeItemInfo.GetItem)
            if (type == 3) {
                this.adItem.getChildByName("reward").getComponent(EquipItem).prop_action = PropAction.Null;
            } else {
                this.adItem.getChildByName("reward").getComponent(Prop).prop_action = PropAction.Null;
            }
            this.adItem.off(cc.Node.EventType.TOUCH_END);
        }
        FollowManager.getInstance().followEvent(Follow_Type.每日商店中成功购买物品的次数);
        GameManager.getInstance().showGetTip(reward);
    }
    
    // item:cc.Node,v:JsonDiamondsRecharge
    onGemBtnClick(e, id: string) {
        let item = this.node.getChildByName("scroll").getComponent(cc.ScrollView).content.getChildByName("gemRoot").getChildByName("gem" + id);
        let v: JsonDiamondsRecharge = DiamondsRechargeManager.getInstance().getJsonDiamondsRecharge(Number(id));
        ApkManager.getInstance().showPay({
            result: (isDy) => {
                if (isDy) {
                    FollowManager.getInstance().followEvent(Follow_Type.x钻石点击购买次数 + v.ProductId);
                    if (TheStorageManager.getInstance().getString(StorageKey.StoreGemItem + v.RechargeID, '') == '') {
                        let reward = PropManager.getInstance().createPropItem(PropId.Gem, v.DiamondsNum + v.GetDiamondsNum);
                        PropManager.getInstance().changePropNum(PropId.Gem, v.DiamondsNum + v.GetDiamondsNum);
                        TheStorageManager.getInstance().setItem(StorageKey.StoreGemItem + v.RechargeID, '1');
                        UserInfo.getInstance().payGem += v.DiamondsNum;
                        HttpManager.post(AccessName.updateUserInfo, this.setCumulativeRechargeJsonString(v.DiamondsNum)).then((data: any) => {
                            UserInfo.getInstance().refreshData();
                            CumulativeRechargesManager.getInstance().refreshData();
                        });
                        item.getChildByName('bg').active = false;
                        item.getChildByName('tip').active = false;
                        GameManager.getInstance().showGetTip(reward);
                    } else {
                        let reward = PropManager.getInstance().createPropItem(PropId.Gem, v.DiamondsNum);
                        PropManager.getInstance().changePropNum(PropId.Gem, v.DiamondsNum);
                        UserInfo.getInstance().payGem += v.DiamondsNum;
                        HttpManager.post(AccessName.updateUserInfo, this.setCumulativeRechargeJsonString(v.DiamondsNum)).then((data: any) => {
                            UserInfo.getInstance().refreshData();
                            CumulativeRechargesManager.getInstance().refreshData();
                        });
                        GameManager.getInstance().showGetTip(reward);
                    }
                }
            }
        }, v.ProductId)
    }

    refreshStore() {
        let content = this.node.getChildByName("scroll").getComponent(cc.ScrollView).content;
        let gemRoot = content.getChildByName("gemRoot");
        let gemData = DiamondsRechargeManager.getInstance().getJsonData()
        gemData.forEach((v, k) => {
            let item = gemRoot.getChildByName('gem' + v.RechargeID);
            item.getChildByName("title").getComponent(TextLanguage).setTextId(400002);
            item.getChildByName("title").getComponent(TextLanguage).string = v.DiamondsNum + item.getChildByName("title").getComponent(TextLanguage).string;
            let payInfo = PayManager.getInstance().getPayInfo(v.ProductId);
            item.getChildByName("num").getComponent(cc.Label).string = payInfo.price;
            item.getChildByName('icon').getComponent(cc.Sprite).spriteFrame = this.store_ui.getSpriteFrame("Shop_Icon_Gem_" + (v.RechargeID - 1));
            if (TheStorageManager.getInstance().getString(StorageKey.StoreGemItem + v.RechargeID, '') == '') {
                item.getChildByName('bg').active = true;
                item.getChildByName('tip').active = true;
                item.getChildByName("tip").getComponent(TextLanguage).setTextId(1410004);
                item.getChildByName("tip").getComponent(TextLanguage).setReplaceValue('~', v.GetDiamondsNum + '');
            } else {
                item.getChildByName('bg').active = false;
                item.getChildByName('tip').active = false;
            }
            // item.off(cc.Node.EventType.TOUCH_END);
            // item.on(cc.Node.EventType.TOUCH_END,()=>{
            //     item.scale = 1;
            //     ApkManager.getInstance().showPay({
            //         result:(isDy)=> {
            //             if(isDy){
            //                 FollowManager.getInstance().followEvent(Follow_Type.x钻石点击购买次数 + v.ProductId);
            //                 if(TheStorageManager.getInstance().getString(StorageKey.StoreGemItem + v.RechargeID,'') == ''){
            //                     let reward = PropManager.getInstance().createPropItem(PropId.Gem,v.DiamondsNum + v.GetDiamondsNum);
            //                     PropManager.getInstance().changePropNum(PropId.Gem,v.DiamondsNum + v.GetDiamondsNum);
            //                     TheStorageManager.getInstance().setItem(StorageKey.StoreGemItem + v.RechargeID,'1');
            //                     item.getChildByName('bg').active = false;
            //                     item.getChildByName('tip').active = false;
            //                     GameManager.getInstance().showGetTip(reward);
            //                 }else{
            //                     let reward = PropManager.getInstance().createPropItem(PropId.Gem,v.DiamondsNum);
            //                     PropManager.getInstance().changePropNum(PropId.Gem,v.DiamondsNum);
            //                     GameManager.getInstance().showGetTip(reward);
            //                 }
            //             }
            //         }
            //     },v.ProductId)
            // });
        });
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //不含最大值，含最小值
    }
    /**
     * 
     * @param type 抽奖类型 1-单抽 2-十连抽
     * @param drawTyep 抽奖类型 1-英雄,英雄碎片 2-装备 3-灵宠
     * @param costId 消耗道具id
     * @param costNum 消耗道具数量
     * @returns 
     */
    private getPrizeJsonString(type: number, drawTyep: number, costId: number, costNum: number): string {
        let uid = UserData.getInstance().getUserID();
        return JSON.stringify({
            uid: uid,
            type: type,
            drawType: drawTyep,
            itemsId: costId,
            minusNum: costNum,
        });
    }

    onRefreshInstanceItem() {

        let prizeHeroData = DrawCardInformationManager.getInstance().getJsonDrawCardInformation(1001);
        if (PropManager.getInstance().getPropNum(prizeHeroData.OneDrawPropsID_1) >= prizeHeroData.OneDrawPropsSpend_1) {
            this.hero_instance.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByPropId(prizeHeroData.OneDrawPropsID_1);
            this.hero_instance.getChildByName("num1").getComponent(cc.Label).string = "x" + prizeHeroData.OneDrawPropsSpend_1;
        } else {
            this.hero_instance.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByPropId(prizeHeroData.OneDrawPropsID_2);
            this.hero_instance.getChildByName("num1").getComponent(cc.Label).string = "x" + prizeHeroData.OneDrawPropsSpend_2;
        }

        if (PropManager.getInstance().getPropNum(prizeHeroData.OneDrawPropsID_1) >= prizeHeroData.TenDrawPropsSpend_1) {
            this.hero_instance.getChildByName("costIcon10").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByPropId(prizeHeroData.OneDrawPropsID_1);
            this.hero_instance.getChildByName("num10").getComponent(cc.Label).string = "x" + prizeHeroData.TenDrawPropsSpend_1;
        } else {
            this.hero_instance.getChildByName("costIcon10").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByPropId(prizeHeroData.OneDrawPropsID_2);
            this.hero_instance.getChildByName("num10").getComponent(cc.Label).string = "x" + prizeHeroData.TenDrawPropsSpend_2;
        }
        this.hero_instance.getChildByName("IconNum").getComponent(cc.Label).string = "X" + PropManager.getInstance().getPropNum(40004);

        let prizePetData = DrawCardInformationManager.getInstance().getJsonDrawCardInformation(3001);
        if (PropManager.getInstance().getPropNum(prizePetData.OneDrawPropsID_1) >= prizePetData.OneDrawPropsSpend_1) {
            this.pet_instance.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByPropId(prizePetData.OneDrawPropsID_1);
            this.pet_instance.getChildByName("num1").getComponent(cc.Label).string = "x" + prizePetData.OneDrawPropsSpend_1;
        } else {
            this.pet_instance.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByPropId(prizePetData.OneDrawPropsID_2);
            this.pet_instance.getChildByName("num1").getComponent(cc.Label).string = "x" + prizePetData.OneDrawPropsSpend_2;
        }
        this.pet_instance.getChildByName("richBg").children[1].children[1].getComponent(cc.Label).string = "X" + PropManager.getInstance().getPropNum(40006);

        if (PropManager.getInstance().getPropNum(prizePetData.OneDrawPropsID_1) >= prizePetData.TenDrawPropsSpend_1) {
            this.pet_instance.getChildByName("costIcon10").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByPropId(prizePetData.OneDrawPropsID_1);
            this.pet_instance.getChildByName("num10").getComponent(cc.Label).string = "x" + prizePetData.TenDrawPropsSpend_1;
        } else {
            this.pet_instance.getChildByName("costIcon10").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByPropId(prizePetData.OneDrawPropsID_2);
            this.pet_instance.getChildByName("num10").getComponent(cc.Label).string = "x" + prizePetData.TenDrawPropsSpend_2;
        }

        let oneDayTime = 60 * 60 * 24 * 1000;
        let currentTime = Date.now();
        let prizeEquipData = DrawCardInformationManager.getInstance().getJsonDrawCardInformation(2001);
        if (PropManager.getInstance().getPropNum(prizeEquipData.OneDrawPropsID_1) >= prizeEquipData.OneDrawPropsSpend_1) {
            this.weapon_instance.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByPropId(prizeEquipData.OneDrawPropsID_1);
            this.weapon_instance.getChildByName("num1").getComponent(cc.Label).string = "x" + prizeEquipData.OneDrawPropsSpend_1;
        } else {
            this.weapon_instance.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByPropId(prizeEquipData.OneDrawPropsID_2);
            this.weapon_instance.getChildByName("num1").getComponent(cc.Label).string = "x" + prizeEquipData.OneDrawPropsSpend_2;
        }

        if (PropManager.getInstance().getPropNum(prizeEquipData.OneDrawPropsID_1) >= prizeEquipData.TenDrawPropsSpend_1) {
            this.weapon_instance.getChildByName("costIcon10").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByPropId(prizeEquipData.OneDrawPropsID_1);
            this.weapon_instance.getChildByName("num10").getComponent(cc.Label).string = "x" + prizeEquipData.TenDrawPropsSpend_1;
        } else {
            this.weapon_instance.getChildByName("costIcon10").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByPropId(prizeEquipData.OneDrawPropsID_2);
            this.weapon_instance.getChildByName("num10").getComponent(cc.Label).string = "x" + prizeEquipData.TenDrawPropsSpend_2;
        }
        this.weapon_instance.getChildByName("richBg").children[1].children[1].getComponent(cc.Label).string = "X" + PropManager.getInstance().getPropNum(40005);

        // oneDayTime = 60*60*24*1000;
        // currentTime = Date.now();
        if (TheStorageManager.getInstance().getNumber(StorageKey.StoreMysteryEquipFreeTime, 0) + oneDayTime - currentTime <= 0) {
            // 免费
            this.weapon_instance.getChildByName("num1").active = false;
            this.weapon_instance.getChildByName("free").active = true;
            this.weapon_instance.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = this.store_ui.getSpriteFrame("Shop_Icon_ADS");
        } else {
            this.weapon_instance.getChildByName("num1").active = true;
            this.weapon_instance.getChildByName("free").active = false;
        }
    }

    private setCumulativeRechargeJsonString(addNum: number): string {
        let uid = UserData.getInstance().getUserID();
        let num = addNum;
        return JSON.stringify({
            type: 8,
            uid: uid,
            value: num,
        });
    }

    private getSaveGameTaskJsonString(index: number): string {
        let uid = UserData.getInstance().getUserID();
        let num = index;
        return JSON.stringify({
            uid: uid,
            playLevel: num,
            rewardType: 10,
        });
    }

}
