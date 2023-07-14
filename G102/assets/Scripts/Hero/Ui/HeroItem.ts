import TextLanguage from "../../multiLanguage/TextLanguage";
import { PropManager } from "../../Prop/PropManager";
import { HeroAttributeManager } from "../Data/HeroAttribute";
import { HeroBaseInfoManager } from "../Data/HeroBaseInfo";
import { HeroManager } from "../Data/HeroManager";
import { HeroQualityManager } from "../Data/HeroQuality";
import { HeroInfo, Hero_Type } from "../Game/HeroConfig";

const {ccclass, property} = cc._decorator;

@ccclass
export default class HeroItem extends cc.Component {

    hero_type:Hero_Type=-1
    init(heroType:Hero_Type,heroDebris:number){
        this.hero_type = heroType;
        if(HeroManager.getInstance().getHeroInfo(heroType) != null){
            this.initHeroItem(heroType,heroDebris);
        }else{
            this.initLockHeroItem(heroType,heroDebris);
        }
    }

    /**已拥有英雄初始化 */
    initHeroItem(heroType:Hero_Type,heroDebris:number){
        this.hero_type = heroType;
        let heroBaseInfo = HeroBaseInfoManager.getInstance().getJsonHeroBaseInfo(this.hero_type);
        this.node.getChildByName("name").active=false
        this.node.getChildByName("shangzheng").active=false
        let info = HeroManager.getInstance().getHeroInfo(heroType);
        this.node.getChildByName('bg').getComponent(cc.Sprite).spriteFrame = HeroManager.getInstance().getSpriteFrameByName('HeroList_Frame_' + heroBaseInfo.Quality +  '_0');
        this.node.getChildByName('box').getComponent(cc.Sprite).spriteFrame = HeroManager.getInstance().getSpriteFrameByName('HeroList_Frame_' + heroBaseInfo.Quality +  '_1');
        this.node.getChildByName('mask').getChildByName('icon').getComponent(cc.Sprite).spriteFrame = HeroManager.getInstance().getHeroBody(heroType);
        let star = HeroAttributeManager.getInstance().getStarByHeroTypeAndStage(heroType,HeroManager.getInstance().getHeroStage(heroType));
        if(star == 5){
            this.node.getChildByName("max").active = true;
            this.node.getChildByName("num").active = false;
            this.node.getChildByName("bar").active = false;
            this.node.getChildByName("progressBar").active = false;
            this.node.getChildByName('star').active = true;
            this.node.getChildByName('star').getComponent(cc.Sprite).spriteFrame = HeroManager.getInstance().getSpriteFrameByName('HeroList_Star_' + star);
        }else if(star > 0){
            this.node.getChildByName("max").active = false;
            this.node.getChildByName("num").active = true;
            this.node.getChildByName("bar").active = true;
            this.node.getChildByName("progressBar").active = true;
            this.node.getChildByName('star').active = true;
            this.node.getChildByName('star').getComponent(cc.Sprite).spriteFrame = HeroManager.getInstance().getSpriteFrameByName('HeroList_Star_' + star);
        }
        else{
            this.node.getChildByName("max").active = false;
            this.node.getChildByName("num").active = true;
            this.node.getChildByName("bar").active = true;
            this.node.getChildByName("progressBar").active = true;
            this.node.getChildByName('star').active = false;
        }
        let num = PropManager.getInstance().getPropNum(heroDebris);
        let sum = HeroQualityManager.getInstance().getCostDebrisByHeroQualityAndStage(info.hero_quality,info.hero_stage);
        if(num >= sum){
            this.node.getChildByName('bar').getComponent(cc.Sprite).spriteFrame = HeroManager.getInstance().getSpriteFrameByName('HeroList_Bar_1_1');
        }
        this.node.getChildByName('progressBar').getComponent(cc.ProgressBar).progress = num/sum;
        this.node.getChildByName('num').getComponent(cc.Label).string = num + '/' + sum;
        this.node.getChildByName('level').getComponentInChildren(cc.Label).string = 'Lv' + info.hero_level;
        this.node.getChildByName('level').active = true;
        this.node.getChildByName('lock').active = false;
    }
    /**为拥有英雄初始化 */    
    initLockHeroItem(heroType:Hero_Type,heroDebris:number){
        this.hero_type = heroType;
        let heroBaseInfo = HeroBaseInfoManager.getInstance().getJsonHeroBaseInfo(this.hero_type);
        this.node.getChildByName("name").active=false
        this.node.getChildByName("shangzheng").active=false
        // let quality = HeroBaseInfoManager.getInstance().getQuality(heroType);
        this.node.getChildByName('bg').getComponent(cc.Sprite).spriteFrame = HeroManager.getInstance().getSpriteFrameByName('HeroList_Frame_' + heroBaseInfo.Quality +  '_0')
        this.node.getChildByName('box').getComponent(cc.Sprite).spriteFrame = HeroManager.getInstance().getSpriteFrameByName('HeroList_Frame_' + heroBaseInfo.Quality +  '_1')
        this.node.getChildByName('mask').getChildByName('icon').getComponent(cc.Sprite).spriteFrame = HeroManager.getInstance().getHeroBody(heroType);
        let num = PropManager.getInstance().getPropNum(heroDebris);
        let sum = HeroBaseInfoManager.getInstance().getUnlockFragmentNum(heroType);
        if(num >= sum){
            this.node.getChildByName('bar').getComponent(cc.Sprite).spriteFrame = HeroManager.getInstance().getSpriteFrameByName('HeroList_Bar_1_1');
        }
        this.node.getChildByName('progressBar').getComponent(cc.ProgressBar).progress = num/sum;
        this.node.getChildByName('num').getComponent(cc.Label).string = num + '/' + sum;
        this.node.getChildByName('level').active = false;
        this.node.getChildByName('star').active = false;
        this.node.getChildByName('lock').active = true;
    }

    /**出战界面刷新英雄icon*/
    RefreshHeroesItem(heroType:Hero_Type){
        this.hero_type=heroType
        let heroBaseInfo = HeroBaseInfoManager.getInstance().getJsonHeroBaseInfo(this.hero_type);
        this.node.getChildByName("name").active=true
        this.node.getChildByName("shangzheng").active=false
        this.node.getChildByName("progressBar").active=false
        this.node.getChildByName("bar").active=false
        this.node.getChildByName("num").active=false
        let info = HeroManager.getInstance().getHeroInfo(heroType);
        this.node.getChildByName("name").getComponent(TextLanguage).setTextId(HeroBaseInfoManager.getInstance().getNameText_ID(heroType))
        let Quality=HeroBaseInfoManager.getInstance().getQuality(heroType)
        let color=[new cc.Color(67, 43, 21),new cc.Color(19, 66, 19),new cc.Color(19, 51, 80),new cc.Color(36, 19, 80),new cc.Color(46, 29, 19)]
        this.node.getChildByName("name").getComponent(cc.LabelOutline).color=color[Quality-1]
        this.node.getChildByName('bg').getComponent(cc.Sprite).spriteFrame = HeroManager.getInstance().getSpriteFrameByName('HeroList_Frame_' + heroBaseInfo.Quality +  '_0')
        this.node.getChildByName('box').getComponent(cc.Sprite).spriteFrame = HeroManager.getInstance().getSpriteFrameByName('HeroList_Frame_' + heroBaseInfo.Quality +  '_1')
        this.node.getChildByName('mask').getChildByName('icon').getComponent(cc.Sprite).spriteFrame = HeroManager.getInstance().getHeroBody(heroType);
        let star = HeroAttributeManager.getInstance().getStarByHeroTypeAndStage(heroType,HeroManager.getInstance().getHeroStage(heroType))
        this.node.getChildByName('star').getComponent(cc.Sprite).spriteFrame = HeroManager.getInstance().getSpriteFrameByName('HeroList_Star_' + star);
        this.node.getChildByName('level').getComponentInChildren(cc.Label).string = 'Lv' + info.hero_level;
        this.node.getChildByName('RedTip').active=false;
    }
}