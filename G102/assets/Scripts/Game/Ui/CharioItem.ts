// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameManager from "../../GameManager";

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

    private dataType: number;
    start() {

    }
    public initData(n: number): void {
        this.dataType = n;
        this.labelLvl.string = "lv" + GameManager.getInstance().charioUpgradationData[n];
        this.labelTip.string = GameManager.getInstance().charioTip[n];
        this.labelContent.string = GameManager.getInstance().charioContent[n];
    }
    public getDataType(): number {
        return this.dataType;

    }
    // update (dt) {}
}
