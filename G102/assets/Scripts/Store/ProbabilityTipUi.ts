
import ApkManager from "../Ads/ApkManager";
import GameManager from "../GameManager";
import { Follow_Type } from "../multiLanguage/FollowConstants";
import FollowManager from "../multiLanguage/FollowManager";
import TextLanguage from "../multiLanguage/TextLanguage";
import { SoundIndex } from "../Sound/AudioConstants";
import MyTool from "../Tools/MyTool";
import UIComponent from "../UI/UIComponent";
import { UiAction } from "../UI/UiInterface";
import { DrawCardProbabilityManager } from "./DrawCardProbability";


const {ccclass, property} = cc._decorator;

@ccclass
export default class ProbabilityTipUi extends UIComponent {



    jackpot_collect_id:number;
    init(uiAc: UiAction): void {
        super.init(uiAc);
    }

    initUi(){
        this.refreshUi();
        FollowManager.getInstance().followEvent(Follow_Type.记录点击招募概率弹窗的次数);
    }

    refreshUi(){
        let data = DrawCardProbabilityManager.getInstance().getData();
        let background = this.node.getChildByName("background");
        for(let i = 0;i<data.length;i++){
            let s:string = "";
            s = MyTool.numberFormat(data[i].PropbabilityNum * 100,2) + "%";
            background.getChildByName("bg" + (i+1)).getChildByName("rate"+(i+1)).getComponent(cc.Label).string = s;
            background.getChildByName("bg" + (i+1)).getChildByName("rateLabel"+(i+1)).getComponent(TextLanguage).setTextId(data[i].PropbabilityText);
            
            // background.getChildByName("bg" + (i+1)).getChildByName("rate"+(2*(i + 1) - 1)).getComponent(cc.Label).string = s;
            // background.getChildByName("bg" + (i+1)).getChildByName("rateLabel"+(2*(i + 1) - 1)).getComponent(TextLanguage).setTextId(data[i].PropbabilityText);
            // s = MyTool.numberFormat(data[(i*2)+1].PropbabilityNum,2) + "%";
            // background.getChildByName("bg" + ((i*2)+1)).getChildByName("rate"+(2*(i + 1))).getComponent(cc.Label).string = s;
            // console.log(i+1,"rate"+(2*((i*2) + 1)))
            // background.getChildByName("bg" + ((i*2)+1)).getChildByName("rateLabel"+(2*(i + 1))).getComponent(TextLanguage).setTextId(data[i*2+1].PropbabilityText);
            // console.log(i+1,"rateLabel"+(2*((i*2) + 1)))
            // background.getChildByName("bg" + (i+2)).getChildByName("rateLabel"+((i + 2) * 2)).getComponent(TextLanguage).setTextId(data[i+1].PropbabilityText);
        }
    }

    refreshWishingUi(){
        // let jackpotCollectId:number = WishSpendManager.getInstance().getGetRewardID(this.jackpot_collect_id);
        // let dropArray = JackpotCollectionManager.getInstance().getDrop_Array(jackpotCollectId);
        // let background = this.node.getChildByName("background");
        // if(this.state == 1){//普通
        //     background.getChildByName("Common_Window_Title").getComponentInChildren(TextLanguage).setTextId(840012);
        // }else{//高级
        //     background.getChildByName("Common_Window_Title").getComponentInChildren(TextLanguage).setTextId(840013);
        // }
        // for(let i = 0;i<Math.ceil((dropArray.length/2));i++){
        //     let s:string = "";
        //     let num = JackpotCollectionManager.getInstance().getRateByJackpotId(jackpotCollectId,dropArray[2*(i+1) - 2]);
        //     num *= 100;
        //     s = this.priceFormat(num,2) + "%";
        //     background.getChildByName("bg" + (i+1)).getChildByName("rate"+(2*(i + 1) - 1)).getComponent(cc.Label).string = s;
        //     if(i == 4)  break;
        //     num = JackpotCollectionManager.getInstance().getRateByJackpotId(jackpotCollectId,dropArray[2*(i+1) - 1]);
        //     num *= 100;
        //     s = this.priceFormat(num,2) + "%";
        //     background.getChildByName("bg" + (i+1)).getChildByName("rate"+((i + 1) * 2)).getComponent(cc.Label).string = s;
        // }
        
        // for(let i = Math.ceil((dropArray.length/2));i < 5;i++){
        //     background.getChildByName("bg" + (i+1)).active = false;
        // }
    }

    refreshTakeEggUi(){
        // let jackpotCollectId:number = EggInformationManager.getInstance().getEggsReward(this.jackpot_collect_id);
        // let dropArray = JackpotCollectionManager.getInstance().getDrop_Array(jackpotCollectId);
        // let background = this.node.getChildByName("background");

        // if(this.state == 1){
        //     background.getChildByName("Common_Window_Title").getComponentInChildren(TextLanguage).setTextId(840032);
        // }else{
        //     background.getChildByName("Common_Window_Title").getComponentInChildren(TextLanguage).setTextId(840033);
        // }


        // for(let i = 0;i<dropArray.length;i++){
        //     let s:string = "";
        //     let num = JackpotCollectionManager.getInstance().getRateByJackpotId(jackpotCollectId,dropArray[i]);
        //     num *= 100;
        //     s = this.priceFormat(num,2) + "%";
        //     background.getChildByName("bg" + (i+1)).getChildByName("rate"+(2*(i + 1) - 1)).getComponent(cc.Label).string = s;
        //     background.getChildByName("bg" + (i+1)).getChildByName("rate"+((i + 1) * 2)).active = false;
        //     background.getChildByName("bg" + (i+1)).getChildByName("rateLabel"+((i + 1) * 2)).active = false;
        // }

        // background.getComponent(cc.Layout).spacingY = 25;
        
        // for(let i = dropArray.length;i < 5;i++){
        //     background.getChildByName("bg" + (i+1)).active = false;
        // }
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

    priceFormat(num:number,n:number){
        if(!isNaN(num)){
            let temp = num.toFixed(n);
            if(temp.indexOf('.') != -1){
                let isZero = false;
                for(let i = temp.indexOf('.') + 1;i <= temp.indexOf('.')+n;i++){
                    if(i<temp.length){
                        if(temp[i] != '0'){
                            isZero = true
                        }
                    }
                }
                if(isZero){
                    return temp
                }else{
                    return Number(temp)
                }
            }else{
                return temp
            }
        }
    }

}
