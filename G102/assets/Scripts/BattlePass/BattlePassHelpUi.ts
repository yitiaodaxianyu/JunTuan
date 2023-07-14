// Learn TypeScript:

import ApkManager from "../Ads/ApkManager";
import GameManager from "../GameManager";
import LanguageManager from "../multiLanguage/LanguageManager";
import TextLanguage from "../multiLanguage/TextLanguage";
import { SoundIndex } from "../Sound/AudioConstants";
import MyTool from "../Tools/MyTool";
import UIComponent from "../UI/UIComponent";
import { UiAction } from "../UI/UiInterface";


const {ccclass, property} = cc._decorator;

@ccclass
export default class BattlePassHelpUi extends UIComponent {

    @property(cc.Prefab)
    prefab_label:cc.Prefab=null;

    titleId:number = 0;
    contentIds:number[]=[];

    init(uiAc:UiAction){
        super.init(uiAc);
    }

    initData(titleId:number,contentIds:number[]){
        this.titleId = titleId;
        this.contentIds = contentIds;
        this.refreshUi();
    }

    refreshUi(){
        this.node.getChildByName("title").getComponent(TextLanguage).setTextId(this.titleId);
        let content=this.node.getChildByName("scrollView").getComponent(cc.ScrollView).content;
        this.contentIds.forEach((v,k)=>{
            let text=cc.instantiate(this.prefab_label);
            text.getComponent(cc.Label).string=LanguageManager.getInstance().getStrByTextId(v);
            content.addChild(text);
        })

        // MyTool.allFadeIn(this.node);
        // this.node.on(cc.Node.EventType.TOUCH_START,()=>{
        //     MyTool.allFadeOut(this.node,()=>{
        //         this.node.removeFromParent();
        //         GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        //     })
        // },this);
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
