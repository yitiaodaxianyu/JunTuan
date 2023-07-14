import ApkManager from "../../Ads/ApkManager";
import EquipItem from "../../Equipment/Ui/EquipItem";
import GameData from "../../GameData";
import GameManager from "../../GameManager";
import { CoinShopManagementManager } from "../../JsonData/CoinShopManagement";
import { CommodityManagementManager } from "../../JsonData/CommodityManagement";
import { LevelManager } from "../../Level/LevelManager";
import { Follow_Type } from "../../multiLanguage/FollowConstants";
import FollowManager from "../../multiLanguage/FollowManager";
import { ItemManager } from "../../Prop/Data/Item";
import Prop from "../../Prop/Prop";
import { PropAction, PropId } from "../../Prop/PropConfig";
import { PropManager } from "../../Prop/PropManager";
import { MusicIndex, SoundIndex } from "../../Sound/AudioConstants";
import MyTool from "../../Tools/MyTool";
import UIComponent from "../UIComponent";
import { UiAction } from "../UiInterface";
import { UIManager } from "../UIManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GoldMallUi extends UIComponent {


    // protected start(): void {
    //     this.refreshUi();
    //     this.refreshScroll(true);
    // }

    init(uiAc: UiAction): void {
        super.init(uiAc);
        let canvas = cc.find("Canvas")
        this.node.getChildByName("top").getComponent(cc.Widget).target = canvas;
        this.node.getChildByName("bottom").getComponent(cc.Widget).target = canvas;
        this.node.getChildByName("scroll").getComponent(cc.Widget).target = canvas;
        this.refreshUi();
        this.refreshScroll(GameData.getInstance().checkIsNewDay());
        //GameManager.getInstance().music_manager.playMusic(MusicIndex.BGM_Shop);
        FollowManager.getInstance().followEvent(Follow_Type.金币商店打开次数);
    }

    refreshUi(){
        let top = this.node.getChildByName("top")
        let bottom = this.node.getChildByName("bottom")
        top.getChildByName("coinNum").getComponent(cc.Label).string = MyTool.getCoinDanwei(PropManager.getInstance().getPropNum(PropId.Coin),1);
        // console.log(MyTool.getCoinDanwei(PropManager.getInstance().getPropNum(PropId.Coin)),MyTool.getCoinDanwei(PropManager.getInstance().getPropNum(PropId.Gem)))
        top.getChildByName("diamondNum").getComponent(cc.Label).string = MyTool.getCoinDanwei(PropManager.getInstance().getPropNum(PropId.Gem),1);
        let timeLable = top.getChildByName("timeLabel")
        let hour,minute,second,hourStr,minuteStr,secondStr;
        let date = new Date();
        hour = 23 - date.getHours();
        minute = 59 - date.getMinutes();
        second = 59 - date.getSeconds();
        hourStr < 10 ? hourStr = "0"+hour : hourStr = hour;
        minute < 10 ? minuteStr = "0"+minute : minuteStr = minute;
        second < 10 ? secondStr = "0"+second : secondStr = second;
        timeLable.getComponent(cc.Label).string = "" + hourStr + ":" + minuteStr + ":" + secondStr;
        this.schedule(() =>{
            date = new Date();
            hour = 23 - date.getHours();
            minute = 59 - date.getMinutes();
            second = 59 - date.getSeconds(); 
            hourStr < 10 ? hourStr = "0"+hour : hourStr = hour;
            minute < 10 ? minuteStr = "0"+minute : minuteStr = minute;
            second < 10 ? secondStr = "0"+second : secondStr = second;
            timeLable.getComponent(cc.Label).string = "" + hourStr + ":" + minuteStr + ":" + secondStr;
        },1,cc.macro.REPEAT_FOREVER,0)
    }

    refreshScroll(isNewDay:boolean){
        let content = this.node.getChildByName("scroll").getComponent(cc.ScrollView).content;
        content.removeAllChildren();
        let data;
        if(isNewDay){
            let nowChapter = LevelManager.getInstance().getFinishChapter();
            let index = this.getRandomInt(1, 4);
            data = CoinShopManagementManager.getInstance().getJsonCoinShopManagement(this.getItemId(nowChapter, index));
            // console.log("随机新的数据: " + this.getItemId(nowChapter, index))
            cc.sys.localStorage.setItem("GoldMallUi_id",this.getItemId(nowChapter, index))
        }else{
            // console.log("读取本地数据： " + Number(cc.sys.localStorage.getItem("GoldMallUi_id")))
            let nowChapter = LevelManager.getInstance().getFinishChapter();
            let index = this.getRandomInt(1, 4);
            if(cc.sys.localStorage.getItem("GoldMallUi_id") != null){
                // console.log(Number(cc.sys.localStorage.getItem("GoldMallUi_id")));
                data = CoinShopManagementManager.getInstance().getJsonCoinShopManagement(Number(cc.sys.localStorage.getItem("GoldMallUi_id")));
            }else{
                data = CoinShopManagementManager.getInstance().getJsonCoinShopManagement(this.getItemId(nowChapter, index));
                cc.sys.localStorage.setItem("GoldMallUi_id",this.getItemId(nowChapter, index))
            }
        }
        // console.log("刷新后的id："+cc.sys.localStorage.getItem("GoldMallUi_id"))
        let itemList = data.Shoplist;
        let contentRowMode = this.node.getChildByName("Shop_Shelf");
        let contentRow:cc.Node = null;
        // let itemNumList = data.GoodsNum;
        // let spendCurrencyTypeList = data.SpendCurrencyType;
        // let spendNumList = data.SpendNum;
        for(let i = 0;i<itemList.length;i++){
             if(i == 0||i%4 == 0){
                contentRow = cc.instantiate(contentRowMode);
                contentRow.active = true;
                content.addChild(contentRow);
                // console.log("ss")
             }
            let itemData = CommodityManagementManager.getInstance().getJsonCommodityManagement(itemList[i]);
            // console.log(itemList[i],itemData.GetItem)
            let item = PropManager.getInstance().createSalePropItem(itemData.GetItem,itemData.GetNum,PropAction.Buy);
            let type=ItemManager.getInstance().getType(itemData.GetItem);
            // console.log(itemData.GetItem);
            if(i<4){
                let discount;
                if(isNewDay){
                    discount = (this.getRandomInt(1,5) * 10);
                    cc.sys.localStorage.setItem("GoldMallUi_discont" + i,discount);
                    cc.sys.localStorage.setItem("GoldMallUi_Item"+i,"")
                    if(type == 3){
                        item.getComponent(EquipItem).initSaleItem(itemData.CostItem,itemData.CostNum * (discount * 0.01),discount);
                        item.getComponent(EquipItem).addBuyListen(()=>{
                            item.getComponent(EquipItem).soldOut();
                            FollowManager.getInstance().followEvent(Follow_Type.金币商店中成功购买物品的次数);
                            if(itemData.CostItem == PropId.Coin){
                                FollowManager.getInstance().addTotal(Follow_Type.在金币商店中消耗的金币数量,itemData.CostNum);
                                FollowManager.getInstance().followEvent(Follow_Type.在金币商店中使用金币购买物品的次数);
                            }else if(itemData.CostItem == PropId.Gem){
                                FollowManager.getInstance().addTotal(Follow_Type.在金币商店中消耗的钻石数量,itemData.CostNum);
                                FollowManager.getInstance().followEvent(Follow_Type.在金币商店中使用钻石购买物品的次数);
                            }
                            cc.sys.localStorage.setItem("GoldMallUi_Item"+i,1);
                            this.refreshUi();
                        });
                    }else{
                        item.getComponent(Prop).initSaleItem(itemData.CostItem,itemData.CostNum * (discount * 0.01),discount);
                        item.getComponent(Prop).addBuyListen(()=>{
                            item.getComponent(Prop).soldOut();
                            FollowManager.getInstance().followEvent(Follow_Type.金币商店中成功购买物品的次数);
                            if(itemData.CostItem == PropId.Coin){
                                FollowManager.getInstance().addTotal(Follow_Type.在金币商店中消耗的金币数量,itemData.CostNum);
                                FollowManager.getInstance().followEvent(Follow_Type.在金币商店中使用金币购买物品的次数);
                            }else if(itemData.CostItem == PropId.Gem){
                                FollowManager.getInstance().addTotal(Follow_Type.在金币商店中消耗的钻石数量,itemData.CostNum);
                                FollowManager.getInstance().followEvent(Follow_Type.在金币商店中使用钻石购买物品的次数);
                            }
                            cc.sys.localStorage.setItem("GoldMallUi_Item"+i,1);
                            this.refreshUi();
                        });
                    }
                }else{
                    if(cc.sys.localStorage.getItem("GoldMallUi_discont" + i) != null){
                        discount = Number(cc.sys.localStorage.getItem("GoldMallUi_discont" + i));
                    }else{
                        discount = (this.getRandomInt(1,5) * 10);
                        cc.sys.localStorage.setItem("GoldMallUi_discont" + i,discount);
                    }
                    if(cc.sys.localStorage.getItem("GoldMallUi_Item"+i) == null){
                        cc.sys.localStorage.setItem("GoldMallUi_Item"+i,"")
                    }
                    if(cc.sys.localStorage.getItem("GoldMallUi_Item"+i) != ""){
                        if(type == 3){
                            item.getComponent(EquipItem).soldOut();
                        }else{
                            item.getComponent(Prop).soldOut();
                        }
                    }else{
                        if(type == 3){
                            item.getComponent(EquipItem).initSaleItem(itemData.CostItem,itemData.CostNum * (discount * 0.01),discount);
                            item.getComponent(EquipItem).addBuyListen(()=>{
                                item.getComponent(EquipItem).soldOut();
                                FollowManager.getInstance().followEvent(Follow_Type.金币商店中成功购买物品的次数);
                                if(itemData.CostItem == PropId.Coin){
                                    FollowManager.getInstance().addTotal(Follow_Type.在金币商店中消耗的金币数量,itemData.CostNum);
                                    FollowManager.getInstance().followEvent(Follow_Type.在金币商店中使用金币购买物品的次数);
                                }else if(itemData.CostItem == PropId.Gem){
                                    FollowManager.getInstance().addTotal(Follow_Type.在金币商店中消耗的钻石数量,itemData.CostNum);
                                    FollowManager.getInstance().followEvent(Follow_Type.在金币商店中使用钻石购买物品的次数);
                                }
                                cc.sys.localStorage.setItem("GoldMallUi_Item"+i,1);
                                this.refreshUi();
                            });
                        }else{
                            item.getComponent(Prop).initSaleItem(itemData.CostItem,itemData.CostNum * (discount * 0.01),discount);
                            item.getComponent(Prop).addBuyListen(()=>{
                                item.getComponent(Prop).soldOut();
                                FollowManager.getInstance().followEvent(Follow_Type.金币商店中成功购买物品的次数);
                                if(itemData.CostItem == PropId.Coin){
                                    FollowManager.getInstance().addTotal(Follow_Type.在金币商店中消耗的金币数量,itemData.CostNum);
                                    FollowManager.getInstance().followEvent(Follow_Type.在金币商店中使用金币购买物品的次数);
                                }else if(itemData.CostItem == PropId.Gem){
                                    FollowManager.getInstance().addTotal(Follow_Type.在金币商店中消耗的钻石数量,itemData.CostNum);
                                    FollowManager.getInstance().followEvent(Follow_Type.在金币商店中使用钻石购买物品的次数);
                                }
                                cc.sys.localStorage.setItem("GoldMallUi_Item"+i,1);
                                this.refreshUi();
                            });
                        }
                    }
                }
            }else{
                if(isNewDay){
                    cc.sys.localStorage.setItem("GoldMallUi_Item"+i,"")
                    if(type == 3){
                        item.getComponent(EquipItem).initSaleItem(itemData.CostItem,itemData.CostNum);
                        item.getComponent(EquipItem).addBuyListen(()=>{
                            item.getComponent(EquipItem).soldOut();
                            FollowManager.getInstance().followEvent(Follow_Type.金币商店中成功购买物品的次数);
                            if(itemData.CostItem == PropId.Coin){
                                FollowManager.getInstance().addTotal(Follow_Type.在金币商店中消耗的金币数量,itemData.CostNum);
                                FollowManager.getInstance().followEvent(Follow_Type.在金币商店中使用金币购买物品的次数);
                            }else if(itemData.CostItem == PropId.Gem){
                                FollowManager.getInstance().addTotal(Follow_Type.在金币商店中消耗的钻石数量,itemData.CostNum);
                                FollowManager.getInstance().followEvent(Follow_Type.在金币商店中使用钻石购买物品的次数);
                            }
                            cc.sys.localStorage.setItem("GoldMallUi_Item"+i,1);
                            this.refreshUi();
                        });
                    }else{
                        item.getComponent(Prop).initSaleItem(itemData.CostItem,itemData.CostNum);
                        item.getComponent(Prop).addBuyListen(()=>{
                            item.getComponent(Prop).soldOut();
                            FollowManager.getInstance().followEvent(Follow_Type.金币商店中成功购买物品的次数);
                            if(itemData.CostItem == PropId.Coin){
                                FollowManager.getInstance().addTotal(Follow_Type.在金币商店中消耗的金币数量,itemData.CostNum);
                                FollowManager.getInstance().followEvent(Follow_Type.在金币商店中使用金币购买物品的次数);
                            }else if(itemData.CostItem == PropId.Gem){
                                FollowManager.getInstance().addTotal(Follow_Type.在金币商店中消耗的钻石数量,itemData.CostNum);
                                FollowManager.getInstance().followEvent(Follow_Type.在金币商店中使用钻石购买物品的次数);
                            }
                            cc.sys.localStorage.setItem("GoldMallUi_Item"+i,1);
                            this.refreshUi();
                        });
                    }
                }else{
                    if(cc.sys.localStorage.getItem("GoldMallUi_Item"+i) == null){
                        cc.sys.localStorage.setItem("GoldMallUi_Item"+i,"")
                    }
                    if(cc.sys.localStorage.getItem("GoldMallUi_Item"+i) != ""){
                        if(type == 3){
                            item.getComponent(EquipItem).soldOut();
                        }else{
                            item.getComponent(Prop).soldOut();
                        }
                    }else{
                        if(type == 3){
                            item.getComponent(EquipItem).initSaleItem(itemData.CostItem,itemData.CostNum);
                            item.getComponent(EquipItem).addBuyListen(()=>{
                                item.getComponent(EquipItem).soldOut();
                                FollowManager.getInstance().followEvent(Follow_Type.金币商店中成功购买物品的次数);
                                if(itemData.CostItem == PropId.Coin){
                                    FollowManager.getInstance().addTotal(Follow_Type.在金币商店中消耗的金币数量,itemData.CostNum);
                                    FollowManager.getInstance().followEvent(Follow_Type.在金币商店中使用金币购买物品的次数);
                                }else if(itemData.CostItem == PropId.Gem){
                                    FollowManager.getInstance().addTotal(Follow_Type.在金币商店中消耗的钻石数量,itemData.CostNum);
                                    FollowManager.getInstance().followEvent(Follow_Type.在金币商店中使用钻石购买物品的次数);
                                }
                                cc.sys.localStorage.setItem("GoldMallUi_Item"+i,1);
                                this.refreshUi();
                            });
                        }else{
                            item.getComponent(Prop).initSaleItem(itemData.CostItem,itemData.CostNum);
                            item.getComponent(Prop).addBuyListen(()=>{
                                item.getComponent(Prop).soldOut();
                                FollowManager.getInstance().followEvent(Follow_Type.金币商店中成功购买物品的次数);
                                if(itemData.CostItem == PropId.Coin){
                                    FollowManager.getInstance().addTotal(Follow_Type.在金币商店中消耗的金币数量,itemData.CostNum);
                                    FollowManager.getInstance().followEvent(Follow_Type.在金币商店中使用金币购买物品的次数);
                                }else if(itemData.CostItem == PropId.Gem){
                                    FollowManager.getInstance().addTotal(Follow_Type.在金币商店中消耗的钻石数量,itemData.CostNum);
                                    FollowManager.getInstance().followEvent(Follow_Type.在金币商店中使用钻石购买物品的次数);
                                }
                                cc.sys.localStorage.setItem("GoldMallUi_Item"+i,1);
                                this.refreshUi();
                            });
                        }
                    }
                }
            }
            // item.getComponent(Prop).soldOut();
            if(!isNewDay){
                if(cc.sys.localStorage.getItem("GoldMallUiItem" + i) == 1){
                    if(type == 3){
                        item.getComponent(EquipItem).soldOut();
                    }else{
                        item.getComponent(Prop).soldOut();
                    }
                }
            }
            contentRow.addChild(item);
            item.y = 55;
        }

        // this.node.getChildByName("Shop_Btn_Refresh").on(cc.Node.EventType.TOUCH_END,() =>{
        //     // TODO 刷新按钮

        // });
    }

    clickBtnRefresh(){
        UIManager.getInstance().showConsumptionTipUi(null,PropId.Gem,100,() => {
            // console.log("进行刷新");
            this.refreshUi();
            this.refreshScroll(true);
        })
    }
    

    getItemId(chapter:number,index:number){
        return chapter*1000+index;
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //不含最大值，含最小值
    }

    clickBtnClose()
    {
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        this.destroySelf();
    }

    destroySelf()
    {
        super.onClose();
        ApkManager.getInstance().closeBanner();
        // EventManager.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Main_SignIn);
    }

}
