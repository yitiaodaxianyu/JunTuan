// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameManager from "../../GameManager";
import { HeroBaseInfoManager } from "../../Hero/Data/HeroBaseInfo";
import { PropManager } from "../../Prop/PropManager";
import LanguageManager from "../../multiLanguage/LanguageManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HeroUpItem extends cc.Component {


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
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
        let hero = GameManager.getInstance().all_hero.get(this.dataType);
        this.labelLvl.string = "lv" + (hero.hero_lvl + 1);
        this.icon.getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpheadPortraitType(this.dataType);
        this.labelTip.string = LanguageManager.getInstance().getStrByTextId(HeroBaseInfoManager.getInstance().getNameText_ID(this.dataType));
        this.labelContent.string = "升级选择的英雄";
        // this.labelTip.string = GameManager.getInstance().charioTip[n];
        // this.labelContent.string = GameManager.getInstance().charioContent[n];
    }
    public getDataType(): number {
        return this.dataType;

    }
    // update (dt) {}
}
