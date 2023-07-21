// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { GameState } from "../../Constants";
import GameManager from "../../GameManager";
import UIComponent from "../../UI/UIComponent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RoguelikeTip extends UIComponent {





    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    tag:number=0;//选择toggle的选择数
    @property(cc.Node)
    ToggleContainer:cc.Node=null

    @property(cc.Node)
    tipLabel:cc.Node=null

    start () {
        this.tag=1
        this.ToggleContainer.children[0].getComponent(cc.Toggle).isChecked=true;
        this.onToggleChange();
    }
    clickBtnToggle(even,i){//单选按钮的选择
        // console.log("+++++++",even,i)
        this.tag=i;
        this.onToggleChange();
      
    }

    private onToggleChange():void{
        if(this.tag==0){
            this.tipLabel.getComponent(cc.Label).string="选择一个英雄加入你的队伍。";
        }else if(this.tag==1){
            this.tipLabel.getComponent(cc.Label).string="选择一个技能加强你的英雄。";
        }else if(this.tag==2){
            this.tipLabel.getComponent(cc.Label).string="选择一个技能用于加强你的战车。";
        }
    }
    clickBtnClose(){
        console.log("离开roguelike");
        
        cc.director.resume();
        GameManager.getInstance().cur_game_state=GameState.Game_Playing;
        GameManager.getInstance().loadLevel(); 
        super.onClose();
    }
    // update (dt) {}
}
