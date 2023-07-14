// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ApkManager from "../../Ads/ApkManager";
import { VIDEO_TYPE, Go_Type } from "../../Constants";
import GameManager from "../../GameManager";
import LanguageManager from "../../multiLanguage/LanguageManager";
import TextLanguage from "../../multiLanguage/TextLanguage";
import { ItemManager } from "../../Prop/Data/Item";
import { PropId } from "../../Prop/PropConfig";
import { PropManager } from "../../Prop/PropManager";
import { SoundIndex } from "../../Sound/AudioConstants";
import { StorageKey } from "../../Storage/StorageConfig";
import { TheStorageManager } from "../../Storage/StorageManager";
import UIComponent from "../../UI/UIComponent";
import { UILayerLevel } from "../../UI/UIConfig";
import { UIManager } from "../../UI/UIManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BuyBattlePotion extends UIComponent {

    // @property(cc.Label)
    // label: cc.Label = null;

    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:
    @property(cc.Node)
    itme:cc.Node=null

    @property(cc.Node)
    text:cc.Node=null
    // onLoad () {}
    type:PropId=PropId.Gem//默认金币

    num:number=1

    Potion:number=0//药水：0:红 1:绿 2:蓝
    initUi(Potion) {
        this.Potion=Potion
        // GameManager.getInstance().music_manager.playMusic(MusicIndex.BGM_TJP);
        // FollowManager.getInstance().followEvent(Follow_Type.铁匠铺打开次数);
        if(this.itme.childrenCount>0){
            this.itme.children[0].destroy()
        }
        let items=PropManager.getInstance().createPropItem(PropId.RedPotion,1);
        this.text.getComponent(TextLanguage).setTextId(ItemManager.getInstance().getDiscripitionTextId(Potion));
        items.parent=this.itme
    }

    // start () {
        
    // }
    clickBtnAd(){
        ApkManager.getInstance().showVideo(((isTrue)=>{
            if(isTrue){
                PropManager.getInstance().changePropNum(this.type,-this.num);
                this.clickBtnClose()
            }
        }),VIDEO_TYPE.Equip)
    }
    clickBtnShow(){
        this.clickBtnClose()
    }
    clickBtnClose()//关闭
    {
        if(this.itme.childrenCount>0){
            this.itme.children[0].destroy()
        }
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        this.onClose();
    }

    // update (dt) {}
}
