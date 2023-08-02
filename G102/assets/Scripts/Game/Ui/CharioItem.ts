// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameManager from "../../GameManager";
import { HeroManager } from "../../Hero/Data/HeroManager";
import { PropManager } from "../../Prop/PropManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class CharioItem extends cc.Component {

    @property(cc.Label)
    labelTip: cc.Label = null;

    @property(cc.Label)
    labelContent: cc.Label = null;

    @property(cc.Label)
    labelLvl: cc.Label = null;

    @property(cc.Node)
    icon: cc.Node = null;

    @property(cc.Node)
    bg: cc.Node = null;



    private dataType: number;
    //["加攻击", "血量上限", "攻速", "防御", "技能间隔", "回血"];
    private charioType:Array<number>=[5, 4, 5, 3, 4, 3];
    start() {

    }
    public initData(n: number): void {
        this.dataType = n;
        let lvN:number=GameManager.getInstance().charioUpgradationData[n];
        this.labelLvl.string = "lv" + (lvN+1);
        this.labelTip.string = GameManager.getInstance().charioTip[n];
        if(n!=5){
            this.labelContent.string = "当前等级："+GameManager.getInstance().charioContent[n][lvN]+"\n下一等级："+GameManager.getInstance().charioContent[n][lvN+1];
        }else{
            this.labelContent.string = GameManager.getInstance().charioContent[n][0];
        }
        

        this.bg.getComponent(cc.Sprite).spriteFrame = HeroManager.getInstance().getSpriteFrameByName('HeroList_Frame_' + this.charioType[this.dataType] +  '_0');
        this.icon.getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpFrameByCharioType(this.dataType);
    }
    public getDataType(): number {
        return this.dataType;

    }
    // update (dt) {}
}
