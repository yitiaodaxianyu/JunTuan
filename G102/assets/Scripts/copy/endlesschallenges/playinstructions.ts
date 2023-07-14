// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameManager from "../../GameManager";
import TextLanguage from "../../multiLanguage/TextLanguage";
import { SoundIndex } from "../../Sound/AudioConstants";
import UIComponent from "../../UI/UIComponent";

const { ccclass, property } = cc._decorator;

@ccclass
export default class playinstructions extends UIComponent {
    @property(cc.Node)
    text: cc.Node = null

    initUi(type) {//2:无尽挑战   3：boss挑战   4：虚空裂缝
        // GameManager.getInstance().music_manager.playMusic(MusicIndex.BGM_TJP);
        // FollowManager.getInstance().followEvent(Follow_Type.铁匠铺打开次数);
        let id = 800008
        if (type == 2) {
            id = 800008
        } else if (type == 3) {
            id = 820012
        }else if (type == 4) {
            id = 830016
        }
        
        this.text.getComponent(TextLanguage).setTextId(id)
    }
    clickBtnClose()//关闭
    {
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        this.onClose();
    }
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    // start () {

    // }

    // update (dt) {}
}
