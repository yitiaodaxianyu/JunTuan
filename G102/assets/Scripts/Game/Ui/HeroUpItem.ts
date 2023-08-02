// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameManager from "../../GameManager";
import { HeroBaseInfoManager } from "../../Hero/Data/HeroBaseInfo";
import { HeroManager } from "../../Hero/Data/HeroManager";
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

    @property(cc.Node)
    bg: cc.Node = null;

    @property(cc.Node)
    headBG: cc.Node = null;

    private dataType: number;

    start() {

    }
    public initData(n: number): void {
        this.dataType = n;
        let hero = GameManager.getInstance().all_hero.get(this.dataType);
        let lvN:number=hero.hero_lvl;
        this.labelLvl.string = "lv" + (lvN + 1);

        
        this.icon.getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpheadPortraitType(this.dataType);
       
        
        this.headBG.getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpFrameByExType(HeroBaseInfoManager.getInstance().getQuality(hero.hero_type)-1);
        this.bg.getComponent(cc.Sprite).spriteFrame = HeroManager.getInstance().getSpriteFrameByName('HeroList_Frame_' + HeroBaseInfoManager.getInstance().getQuality(hero.hero_type) +  '_0');

        this.labelTip.string = LanguageManager.getInstance().getStrByTextId(HeroBaseInfoManager.getInstance().getNameText_ID(this.dataType));
        this.labelContent.string = "下一等级："+GameManager.getInstance().herUpContent[hero.hero_type][lvN+1];
        // this.labelTip.string = GameManager.getInstance().charioTip[n];
        // this.labelContent.string = GameManager.getInstance().charioContent[n];
    }
    public getDataType(): number {
        return this.dataType;

    }
    // update (dt) {}
}
