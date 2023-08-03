// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameManager from "../../GameManager";
import TextLanguage from "../../multiLanguage/TextLanguage";
import { PropId } from "../../Prop/PropConfig";
import { PropManager } from "../../Prop/PropManager";
import { SoundIndex } from "../../Sound/AudioConstants";
import UIComponent from "../../UI/UIComponent";

const { ccclass, property } = cc._decorator;

@ccclass
export default class rewarddisplay extends UIComponent {    
    @property(cc.Node)
    item: cc.Node[] = []


    @property(cc.Node)
    BossRush_Line: cc.Node = null
    @property(cc.Node)
    BossRush_Line1: cc.Node = null

    @property(cc.Node)
    text: cc.Node = null
    @property(cc.Node)
    mytxt: cc.Node = null
    
    boss:number[]=[10001,10001,10001,10002,10002]
    @property(cc.Node)
    Common_Window3_1: cc.Node = null
    
    initUi(type) {//2:无尽挑战   3：boss挑战
        // GameManager.getInstance().music_manager.playMusic(MusicIndex.BGM_TJP);
        // FollowManager.getInstance().followEvent(Follow_Type.铁匠铺打开次数);
        if (type == 2) {
            this.Common_Window3_1.y=31
            this.Common_Window3_1.height=480
            this.item[0].y=85
            this.item[0].x=0
            let items=PropManager.getInstance().createPropItem(PropId.Coin,0);
            items.parent=this.item[0]
            this.BossRush_Line.active=false
            this.BossRush_Line1.active=false
            this.text.active=false
            this.mytxt.active=true
            this.item[1].active=false
            this.item[2].active=false
            this.item[3].active=false
            this.item[4].active=false
        } else if (type == 3) {
            this.item[0].y=100
            this.item[0].x=-80
            this.item[4].x=80
            this.item[4].y=100
            this.Common_Window3_1.y=0
            this.Common_Window3_1.height=550
            for (let index = 0; index < this.boss.length; index++) {
                let items=PropManager.getInstance().createPropItem(this.boss[index],0);
                items.parent=this.item[index]
            }
            this.BossRush_Line.active=true
            this.BossRush_Line1.active=true
            this.text.active=true
            this.mytxt.active=false
            this.item[1].active=true
            this.item[2].active=true
            this.item[3].active=true
            this.item[4].active=true
        }
    }
    shanchu(){
        for (let index = 0; index < this.item.length; index++) {
            if(this.item[index].childrenCount>0){
                this.item[index].children[0].destroy()  
            }
        }
    }

    clickBtnClose()//关闭
    {
        this.shanchu()
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        this.onClose();
    }
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    // start () {

    // }

    // update (dt) {}
}
