// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { GameState } from "../../Constants";
import GameManager from "../../GameManager";
import { HeroManager } from "../../Hero/Data/HeroManager";
import { Hero_Type } from "../../Hero/Game/HeroConfig";
import HeroItem from "../../Hero/Ui/HeroItem";
import UIComponent from "../../UI/UIComponent";
import { UiAction } from "../../UI/UiInterface";
import WallManager from "../../Wall/WallManager";
import LanguageManager from "../../multiLanguage/LanguageManager";
import CharioItem from "./CharioItem";
import HeroUpItem from "./HeroUpItem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RoguelikeTip extends UIComponent {





    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    tag: number = 0;//选择toggle的选择数
    @property(cc.Node)
    ToggleContainer: cc.Node = null

    @property(cc.Node)
    tipLabel: cc.Node = null

    @property(cc.Node)
    content: cc.Node = null;//英雄选择父节点

    @property(cc.Prefab)
    hero_item: cc.Prefab = null;//英雄头像的预制体

    @property(cc.Node)
    hero_Chose: cc.Node = null;//选择英雄节点

    @property(cc.Node)
    chariot_Chose: cc.Node = null;//战车升级选择节点

    @property(cc.Node)
    heroUp_Chose: cc.Node = null;//英雄升级选择节点

    @property(cc.Node)
    chariotItem0: cc.Node = null;//战车升级选择节点0
    @property(cc.Node)
    chariotItem1: cc.Node = null;//战车升级选择节点1
    @property(cc.Node)
    chariotItem2: cc.Node = null;//战车升级选择节点2

    @property(cc.Node)
    heroUpItem0: cc.Node = null;//英雄升级选择节点0
    @property(cc.Node)
    heroUpItem1: cc.Node = null;//英雄升级选择节点1
    @property(cc.Node)
    heroUpItem2: cc.Node = null;//英雄升级选择节点2


    greybuttonjudgment: number = 0;


    onLoad() {
        super.onLoad();
        this.tag = 0
        this.ToggleContainer.children[0].getComponent(cc.Toggle).isChecked = true;
        this.onToggleChange();
        console.log("进入RogueLike");
        this.chariotUpgradation();
        this.Refreshheroitmestatus();
        this.heroUpRefresh();
        this.chariotItem0.on(cc.Node.EventType.TOUCH_END, this.onCharioItemTouchEnd, this);
        this.chariotItem1.on(cc.Node.EventType.TOUCH_END, this.onCharioItemTouchEnd, this);
        this.chariotItem2.on(cc.Node.EventType.TOUCH_END, this.onCharioItemTouchEnd, this);

        this.heroUpItem0.on(cc.Node.EventType.TOUCH_END, this.onHeroUpTouchEnd, this);
        this.heroUpItem1.on(cc.Node.EventType.TOUCH_END, this.onHeroUpTouchEnd, this);
        this.heroUpItem2.on(cc.Node.EventType.TOUCH_END, this.onHeroUpTouchEnd, this);

    }
    protected onDestroy(): void {
        this.chariotItem0.off(cc.Node.EventType.TOUCH_END, this.onCharioItemTouchEnd, this);
        this.chariotItem1.off(cc.Node.EventType.TOUCH_END, this.onCharioItemTouchEnd, this);
        this.chariotItem2.off(cc.Node.EventType.TOUCH_END, this.onCharioItemTouchEnd, this);

        this.heroUpItem0.off(cc.Node.EventType.TOUCH_END, this.onHeroUpTouchEnd, this);
        this.heroUpItem1.off(cc.Node.EventType.TOUCH_END, this.onHeroUpTouchEnd, this);
        this.heroUpItem2.off(cc.Node.EventType.TOUCH_END, this.onHeroUpTouchEnd, this);
        cc.director.resume();
    }
    onEnable() {

    }
    private heroUpRefresh():void{
        var heroHas:Array<Hero_Type>=[];
        GameManager.getInstance().all_hero.forEach((v, k) => {
          if(v.hero_lvl<5){
            heroHas.push(v.hero_type);
          }
        })
        console.log("拥有的可升级英雄"+heroHas.length);
        this.heroUpItem0.x = -223;
        this.heroUpItem1.x = 0;
        this.heroUpItem2.x = 223;
        this.heroUpItem1.active = true;
        this.heroUpItem2.active = true;


        heroHas.sort(function () {
            return Math.random() - 0.5
        });
       
        if(heroHas.length==0){
            //没有可升级英雄，暂不处理
          
        }else if(heroHas.length==1){
            this.heroUpItem0.x = 0;
            this.heroUpItem1.active = false;
            this.heroUpItem2.active = false;
            this.heroUpItem0.getComponent(HeroUpItem).initData(heroHas[0]);

        }else if(heroHas.length==2){
            this.heroUpItem0.x = -111.5;
            this.heroUpItem1.x = 111.5;
            this.heroUpItem2.active = false;
            this.heroUpItem0.getComponent(HeroUpItem).initData(heroHas[0]);
            this.heroUpItem1.getComponent(HeroUpItem).initData(heroHas[1]);
        }else{
            this.heroUpItem0.getComponent(HeroUpItem).initData(heroHas[0]);
            this.heroUpItem1.getComponent(HeroUpItem).initData(heroHas[1]);
            this.heroUpItem2.getComponent(HeroUpItem).initData(heroHas[2]);
        }
        
        
    }
    private chariotUpgradation(): void {
        var data: Array<number> = GameManager.getInstance().getcharioUpgradationData();
        console.log("获得的升级数据" + data);

        this.chariotItem0.getComponent(CharioItem).initData(data[0]);

        this.chariotItem1.active = true;
        this.chariotItem2.active = true;

        this.chariotItem0.x = -223;
        this.chariotItem1.x = 0;
        this.chariotItem2.x = 223;
        if (data[1] != null) {
            this.chariotItem1.getComponent(CharioItem).initData(data[1]);
        } else {
            this.chariotItem1.active = false;
            this.chariotItem2.active = false;
            this.chariotItem0.x = 0;
            return;
        }

        if (data[2] != null) {

            this.chariotItem2.getComponent(CharioItem).initData(data[2]);
        } else {
            this.chariotItem0.x = -111.5;
            this.chariotItem1.x = 111.5;
            this.chariotItem2.active = false;
        }

    }
    clickBtnToggle(even, i) {//单选按钮的选择
        // console.log("+++++++",even,i)
        this.tag = i;
        this.onToggleChange();

    }

    private Refreshheroitmestatus(): void {
        //已解锁的英雄
        let HeroList = HeroManager.getInstance().getHeroList()//数量   英雄id类型 英雄等级 英雄品质  英雄星星阶段

        let heroBasicdataarr = []//最高战力数组
        let HeroListarr = HeroList//已解锁的英雄
        for (let heroindex = 0; heroindex < HeroList.length; heroindex++) {
            let hero = cc.instantiate(this.hero_item);
            hero.name = "" + heroindex
            hero.setScale(0.75, 0.75)
            this.content.addChild(hero);


            hero.on(cc.Node.EventType.TOUCH_END, this.onHeroItemTouchEnd, this);
            // hero.on(cc.Node.EventType.TOUCH_CANCEL, this.onHeroItemTouchCancel, this);
        }
        this.content.getComponent(cc.Layout).updateLayout();
        //刷新英雄itme
        for (let heroBasicdataindex = 0; heroBasicdataindex < HeroList.length; heroBasicdataindex++) {
            let heroBasicdata = HeroManager.getInstance().getHeroData(HeroList[heroBasicdataindex].hero_type)//英雄的基础数据   传入英雄id类型  防御力  生命值  命中值 
            heroBasicdataarr.push(heroBasicdata.total_attack)
        }

        //排列英雄战力
        let cun
        let herocun
        for (let index = 0; index < heroBasicdataarr.length; index++) {
            for (let paixvindex = 0; paixvindex < heroBasicdataarr.length - 1; paixvindex++) {
                if (heroBasicdataarr[paixvindex + 1] > heroBasicdataarr[paixvindex]) {
                    cun = heroBasicdataarr[paixvindex]
                    heroBasicdataarr[paixvindex] = heroBasicdataarr[paixvindex + 1]
                    heroBasicdataarr[paixvindex + 1] = cun

                    herocun = HeroListarr[paixvindex]
                    HeroListarr[paixvindex] = HeroListarr[paixvindex + 1]
                    HeroListarr[paixvindex + 1] = herocun
                }
            }
        }
        let teamList = GameManager.getInstance().cur_team_list;

        //刷新英雄itme状态
        //血量

        for (let shuaxingindex = 0; shuaxingindex < HeroListarr.length; shuaxingindex++) {
            this.content.children[shuaxingindex].getComponent(HeroItem).RefreshHeroesItem(HeroListarr[shuaxingindex].hero_type)
            for (let teamListindex = 0; teamListindex < teamList.length; teamListindex++) {
                if (teamList[teamListindex] == HeroListarr[shuaxingindex].hero_type) {
                    this.content.children[shuaxingindex].getChildByName("shangzheng").active = true
                }
            }
        }


    }
    onHeroUpTouchEnd(e: cc.Event.EventTouch): void {
        let touchTarget = e.getCurrentTarget();
        if (touchTarget.active == true) {
            var heroType: number = touchTarget.getComponent(HeroUpItem).getDataType();
            if( GameManager.getInstance().all_hero.get(heroType).hero_lvl<5){
                GameManager.getInstance().all_hero.get(heroType).hero_lvl++;
            }
            
            this.heroUpRefresh();
            this.clickBtnClose();
        }
    }
    onCharioItemTouchEnd(e: cc.Event.EventTouch): void {
        let touchTarget = e.getCurrentTarget();
        if (touchTarget.active == true) {
            var charioType: number = touchTarget.getComponent(CharioItem).getDataType();
            GameManager.getInstance().charioUpgradationData[charioType]++;
            //["加攻击","血量上限","攻速","防御","技能间隔","左右移动","回血"];
            if (charioType == 0) {
                GameManager.getInstance().refreshMainWallDataByaddHero()
            } else if (charioType == 1) {
                GameManager.getInstance().refreshMainWallDataByaddHero()

            } else if (charioType == 2) {
                //攻速直接在英雄里面取
            } else if (charioType == 3) {
                GameManager.getInstance().refreshMainWallDataByaddHero()

            } else if (charioType == 4) {

            } else if (charioType == 5) {

            } else if (charioType == 6) {
                WallManager.getInstance().getMainWall().changeHp(WallManager.getInstance().getMainWall().getMaxHp() * 0.2);
            }

            this.chariotUpgradation();
            this.clickBtnClose();
        }
    }
    onHeroItemTouchEnd(e: cc.Event.EventTouch) {
        let touchTeam = e.getCurrentTarget();


        if (touchTeam.getChildByName("shangzheng").active == false) {
            //上阵该英雄
            let teamList = GameManager.getInstance().cur_team_list;
            if (teamList[1] == -1 || teamList[1] == Hero_Type.NULL) {
                teamList[1] = touchTeam.getComponent(HeroItem).hero_type
                GameManager.getInstance().addHero(touchTeam.getComponent(HeroItem).hero_type, 1);
                this.clickBtnClose();
                return;
            }

            if (teamList[3] == -1 || teamList[3] == Hero_Type.NULL) {
                teamList[3] = touchTeam.getComponent(HeroItem).hero_type
                GameManager.getInstance().addHero(touchTeam.getComponent(HeroItem).hero_type, 3);
                this.clickBtnClose();
                return;
            }

            if (teamList[0] == -1 || teamList[0] == Hero_Type.NULL) {
                teamList[0] = touchTeam.getComponent(HeroItem).hero_type
                GameManager.getInstance().addHero(touchTeam.getComponent(HeroItem).hero_type, 0);
                this.clickBtnClose();
                return;
            }

            if (teamList[4] == -1 || teamList[4] == Hero_Type.NULL) {
                teamList[4] = touchTeam.getComponent(HeroItem).hero_type
                GameManager.getInstance().addHero(touchTeam.getComponent(HeroItem).hero_type, 4);
                this.clickBtnClose();
                return;
            }



        } else {
            GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(100091))
        }
    }
    private onToggleChange(): void {
        if (this.tag == 0) {
            this.tipLabel.getComponent(cc.Label).string = "选择一个英雄加入你的队伍。";
            this.hero_Chose.active = true;
            this.chariot_Chose.active = false;
            this.heroUp_Chose.active = false;
        } else if (this.tag == 1) {
            this.hero_Chose.active = false;
            this.chariot_Chose.active = false;
            this.heroUp_Chose.active = true;
            this.tipLabel.getComponent(cc.Label).string = "选择一个英雄进行升级。";
        } else if (this.tag == 2) {
            this.hero_Chose.active = false;
            this.chariot_Chose.active = true;
            this.heroUp_Chose.active = false;
            this.tipLabel.getComponent(cc.Label).string = "选择一个技能用于加强你的战车。";
        }
    }
    clickBtnClose() {
        console.log("离开roguelike");

        cc.director.resume();
        GameManager.getInstance().cur_game_state = GameState.Game_Playing;
        GameManager.getInstance().loadLevel();
        super.onClose();
    }
    // update (dt) {}
}
