import ApkManager from "../Ads/ApkManager";
import GameManager from "../GameManager";
import { SoundIndex } from "../Sound/AudioConstants";
import UIComponent from "./UIComponent";
import { UiAction } from "./UiInterface";
import LanguageManager from '../multiLanguage/LanguageManager'
import { PropId } from "../Prop/PropConfig";
import { PropManager } from "../Prop/PropManager";
import MyTool from "../Tools/MyTool";
import { ItemManager } from "../Prop/Data/Item";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ConsumptionTipUi extends UIComponent {

    private sure_call_back : Function = null;
    private currency_type:PropId = PropId.Coin;
    private currency_num:number = 0;
    init(uiAc: UiAction) {
        super.init(uiAc);
    }

    initCallBack(currencyType:PropId,currencyNum:number,sureCallBack:Function){
        this.sure_call_back = sureCallBack;
        this.currency_type = currencyType;
        this.currency_num = currencyNum;
        this.initUi();
    }

    initUi(){
        this.node.getChildByName("titleLabel").getComponent(cc.Label).string = LanguageManager.getInstance().getStrByTextId(100003);
        this.node.getChildByName("contentLabel1").getComponent(cc.Label).string = LanguageManager.getInstance().getStrByTextId(100022);
        this.node.getChildByName("contentLabel2").getComponent(cc.Label).string = LanguageManager.getInstance().getStrByTextId(100004);
        this.node.getChildByName("cancelLabel").getComponent(cc.Label).string = LanguageManager.getInstance().getStrByTextId(100002);
        this.node.getChildByName("sureLabel").getComponent(cc.Label).string = LanguageManager.getInstance().getStrByTextId(100001);
        
        this.node.getChildByName("useIcon").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByPropId(this.currency_type);
        this.node.getChildByName("tipIcon").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByPropId(this.currency_type);

        this.node.getChildByName("useLabel").getComponent(cc.Label).string = MyTool.getCoinDanwei(this.currency_num);
        let tipLabel = this.node.getChildByName("tipLabel");
        tipLabel.getComponent(cc.Label).string = MyTool.getCoinDanwei(PropManager.getInstance().getPropNum(this.currency_type));
        // console.log("初始化Ui",this.currency_num,PropManager.getInstance().getPropNum(this.currency_type));
        if(this.currency_num > PropManager.getInstance().getPropNum(this.currency_type)){
            // console.log("钱不够了");
            tipLabel.color = cc.color(209,44,45);
        }
    }

    clickBtnSure(){
        if(this.currency_num > PropManager.getInstance().getPropNum(this.currency_type)){
            // console.log("钱不够的提示")
            let str = "";
            str = LanguageManager.getInstance().getStrByTextId(ItemManager.getInstance().getNameTextId(this.currency_type)) + LanguageManager.getInstance().getStrByTextId(100021);
            GameManager.getInstance().showMessage(str);
        }else{
            // console.log("扣钱之前的数量：" + PropManager.getInstance().getPropNum(this.currency_type),this.currency_num * -1)
            PropManager.getInstance().changePropNum(this.currency_type,this.currency_num * -1);
            // console.log("扣钱之后的数量：" + PropManager.getInstance().getPropNum(this.currency_type))
            GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
            this.sure_call_back();
            this.destroySelf();
        }
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
