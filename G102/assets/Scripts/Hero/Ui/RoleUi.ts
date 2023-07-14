import ApkManager from "../../Ads/ApkManager";
import CoinPop from "../../CoinPop";
import { EquipmentAttributeManager } from "../../Equipment/Data/EquipmentAttribute";
import { EquipmentMergeManager } from "../../Equipment/Data/EquipmentMerge";
import { EquipInfo, EquipType } from "../../Equipment/EquipConfig";
import { EquipmentManager } from "../../Equipment/EquipmentManager";
import EquipInfoUi from "../../Equipment/Ui/EquipInfoUi";
import EquipItem from "../../Equipment/Ui/EquipItem";
import ExclusiveInfoUi from "../../ExclusiveInfoUi/ExclusiveInfoUi";
import GameManager from "../../GameManager";
import { HeroBaseInfoManager, JsonHeroBaseInfo } from "../../Hero/Data/HeroBaseInfo";
import { HeroManager } from "../../Hero/Data/HeroManager";
import { HeroTitleManager } from "../../Hero/Data/HeroTitle";
import { SkillLevelUnlockManager } from "../../Hero/Data/SkillLevelUnlock";
import { Hero_Type } from "../../Hero/Game/HeroConfig";
import Home from "../../Home";
import { EWUnlockCostManager } from "../../JsonData/EWUnlockCost";
import { ExclusiveEnhancementManager } from "../../JsonData/ExclusiveEnhancement";
import { LevelManager } from "../../Level/LevelManager";
import { Follow_Type } from "../../multiLanguage/FollowConstants";
import FollowManager from "../../multiLanguage/FollowManager";
import LanguageManager from "../../multiLanguage/LanguageManager";
import TextLanguage from "../../multiLanguage/TextLanguage";
import { PetManager } from "../../Pet/PetManager";
import PetExchangeUi from "../../Pet/Ui/PetExchangeUi";
import PetInfoUi from "../../Pet/Ui/PetInfoUi";
import PetItem from "../../Pet/Ui/PetItem";
import Prop from "../../Prop/Prop";
import { PropAction, PropId } from "../../Prop/PropConfig";
import { PropManager } from "../../Prop/PropManager";
import { SoundIndex } from "../../Sound/AudioConstants";
import StoreHeroShowUi from "../../Store/StoreHeroShowUi";
import { TaskItem } from "../../Task/TaskEnum";
import TaskManager from "../../Task/TaskManager";
import { EventManager, RedEventString, RedEventType } from "../../Tools/EventManager";
import MyTool from "../../Tools/MyTool";
import NumberLabel from "../../Tools/NumberLabel";
import TutorailsManager from "../../Tutorials/TutorailsManager";
import GetAssetsUi, { GetAssetsType } from "../../UI/GetAssetsUi";
import AtrributeUi from "../../UI/home/AtrributeUi";
import UIComponent from "../../UI/UIComponent";
import { EffectPath, UILayerLevel, UIPath } from "../../UI/UIConfig";
import { UiAction } from "../../UI/UiInterface";
import { UIManager } from "../../UI/UIManager";
import { HeroAttributeManager } from "../Data/HeroAttribute";
import { HeroData } from "../Data/HeroData";
import { HeroQualityManager } from "../Data/HeroQuality";
import { LevelUpManager } from "../Data/LevelUp";
import ExclusiveWeaponsStrengtheningUi from "./ExclusiveWeaponsStrengtheningUi";
import ExclusiveWeaponsUi from "./ExclusiveWeaponsUi";
import HeroSkillUi from "./HeroSkillUi";

const {ccclass, property} = cc._decorator;

enum State{
    Preview = 0,
    Level,
    Star,
}

@ccclass
export default class RoleUi extends UIComponent{

    @property(cc.SpriteAtlas)
    role_ui : cc.SpriteAtlas = null;
    @property(cc.Node)
    hero_avatar_light : cc.Node = null;
    @property(cc.Node)
    cur_hero : cc.Node = null;
    @property({type:[sp.SkeletonData]})
    hero_skeleton_data:sp.SkeletonData[]=[];


    private hero_type : Hero_Type = -1;
    private state : State = State.Level;
    private sqrtList:JsonHeroBaseInfo[] = []



    init(uiAc: UiAction) {
        this.ui_aciton=uiAc;
    }
    
    initData(heroType:Hero_Type,sqrtList:JsonHeroBaseInfo[] = []){
        this.hero_type = heroType;
        let hero = HeroManager.getInstance().getHeroInfo(heroType);
        this.sqrtList = sqrtList;
        if(this.sqrtList.length == 0){
            // let bottom = this.node.getChildByName("bottom");
            // bottom.getChildByName("arrow_right").active = false;
            // bottom.getChildByName("arrow_left").active = false;
            this.sqrtList = HeroBaseInfoManager.getInstance().getArrayData();
        }else{
            let bottom = this.node.getChildByName("bottom");
            bottom.getChildByName("arrow_right").active = true;
            bottom.getChildByName("arrow_left").active = true;
        }
        if(hero == null){
            this.state = State.Preview;
            this.previewRefresh(false);
        }else{
            this.infoRefresh();
            this.state = State.Level;
            this.upgradeRefresh(false);
        }                
    }

    protected start(): void {
        //教程
        this.scheduleOnce(()=>{
            if(TutorailsManager.getInstance().isShowTutorials(301)==false&&TutorailsManager.getInstance().isShowTutorials(302)&&TutorailsManager.getInstance().is_tutorails_state==true){
                //找到升级按钮
                let btnUpgrade=this.node.getChildByName('bottom').getChildByName('level').getChildByName('upgradeBtn');
                let wordPos=btnUpgrade.parent.convertToWorldSpaceAR(btnUpgrade.getPosition());
                let localPos=cc.find('Canvas/Ui_Root').convertToNodeSpaceAR(wordPos);
                TutorailsManager.getInstance().showTutorials(302,null,()=>{
                    TutorailsManager.getInstance().saveTutorials(302);
                },true,null,localPos);
            }else if(TutorailsManager.getInstance().isShowTutorials(311)==false&&TutorailsManager.getInstance().isShowTutorials(312)){
                //切换到升星
                this.onStarBtnClick();
                //找到升星按钮
                let btnUpgrade=this.node.getChildByName('bottom').getChildByName('star').getChildByName('upstarBtn');
                let wordPos=btnUpgrade.parent.convertToWorldSpaceAR(btnUpgrade.getPosition());
                let localPos=cc.find('Canvas/Ui_Root').convertToNodeSpaceAR(wordPos);
                TutorailsManager.getInstance().showTutorials(312,null,()=>{
                    TutorailsManager.getInstance().saveTutorials(312);
                },true,null,localPos);
            }
            // else if(TutorailsManager.getInstance().isShowTutorials(221)==false&&TutorailsManager.getInstance().isShowTutorials(222)){
            //     //找到一键穿戴按钮
            //     let btnUpgrade=this.node.getChildByName('bottom').getChildByName('level').getChildByName('equipRoot').getChildByName('btnWear');
            //     let wordPos=btnUpgrade.parent.convertToWorldSpaceAR(btnUpgrade.getPosition());
            //     let localPos=cc.find('Canvas/Ui_Root').convertToNodeSpaceAR(wordPos);
            //     TutorailsManager.getInstance().showTutorials(222,null,()=>{
            //         TutorailsManager.getInstance().saveTutorials(222);
            //     },true,null,localPos);
            // }else if(TutorailsManager.getInstance().isShowTutorials(225)==false&&TutorailsManager.getInstance().isShowTutorials(226)){
            //     //找到武器按钮
            //     let btnUpgrade=this.node.getChildByName('bottom').getChildByName('level').getChildByName('equipRoot').getChildByName('zbBg1');
            //     let wordPos=btnUpgrade.parent.convertToWorldSpaceAR(btnUpgrade.getPosition());
            //     let localPos=cc.find('Canvas/Ui_Root').convertToNodeSpaceAR(wordPos);
            //     TutorailsManager.getInstance().showTutorials(226,null,()=>{
                    
            //     },false,null,localPos);
            // }
            
        },0.02)
    }

    // 解锁后通用显示刷新
    infoRefresh(){
        let top = this.node.getChildByName("top");
        let star = HeroAttributeManager.getInstance().getStarByHeroTypeAndStage(this.hero_type,HeroManager.getInstance().getHeroStage(this.hero_type));
        top.getChildByName("coinLabel").getComponent(cc.Label).string = MyTool.getCoinDanwei(PropManager.getInstance().getPropNum(PropId.Coin));
        top.getChildByName("gemLabel").getComponent(cc.Label).string = MyTool.getCoinDanwei(PropManager.getInstance().getPropNum(PropId.Gem));
        top.getChildByName("name").getComponent(cc.Label).string = LanguageManager.getInstance().getStrByTextId(HeroBaseInfoManager.getInstance().getNameText_ID(this.hero_type));
        top.getChildByName("nickname").getComponent(cc.Label).string = 
        LanguageManager.getInstance().getStrByTextId(HeroTitleManager.getInstance().getHeroTitleTextIdByHeroTypeAndHeroStar(this.hero_type,star));
        top.getChildByName("quality").getComponent(cc.Sprite).spriteFrame = this.role_ui.getSpriteFrame("Hero_Title_" + HeroBaseInfoManager.getInstance().getQuality(this.hero_type) + "_0")
        top.getChildByName("nameBg").getComponent(cc.Sprite).spriteFrame = this.role_ui.getSpriteFrame("Hero_Title_" + HeroBaseInfoManager.getInstance().getQuality(this.hero_type) + "_1")
        if(star == 0){
            top.getChildByName("star").active = false;
        }else{
            top.getChildByName("star").active = true;
            top.getChildByName("star").getComponent(cc.Sprite).spriteFrame = this.role_ui.getSpriteFrame("Hero_Star_" + star);
        }
        let heroSp = this.node.getChildByName("bottom").getChildByName("heroSp").getComponent(sp.Skeleton)
        heroSp.skeletonData = this.hero_skeleton_data[this.hero_type-1];
        heroSp.setAnimation(0,"Idle",true);
        // anima.listener=null;
        heroSp.setCompleteListener(() =>{
            // anima.listener=null;                
            let name = '';
            let judge = Math.random();
            if(judge < 0.6){
                name = 'Idle';
            }else if(judge < 0.8){
                name = 'Attack';
            }else{
                name = 'Idle2';
            }
            heroSp.setAnimation(0,name,true);
        });
        // heroSp.node.scale = 0.4;
    }
    // 升级刷新
    upgradeRefresh(isRefresh:boolean = true){
        let HM = HeroManager.getInstance();
        let top = this.node.getChildByName("top");
        let heroBaseInfo = HeroBaseInfoManager.getInstance().getJsonHeroBaseInfo(this.hero_type);
        top.getChildByName("coinLabel").getComponent(cc.Label).string = MyTool.getCoinDanwei(PropManager.getInstance().getPropNum(PropId.Coin));
        top.getChildByName("gemLabel").getComponent(cc.Label).string = MyTool.getCoinDanwei(PropManager.getInstance().getPropNum(PropId.Gem));
        let bottom = this.node.getChildByName("bottom");
        let level = bottom.getChildByName("level");
        let heroInfo = HM.getHeroInfo(this.hero_type);
        let heroData = HM.getHeroData(this.hero_type);
        let zhanli = HM.getHeroZhanli(this.hero_type);
        let equipRoot = level.getChildByName("equipRoot");
        let zbRoot = equipRoot.getChildByName("zbRoot");
        // zbRoot.removeAllChildren();

        if(heroInfo.exclusive_equip_stage < 1){
            let exItem = zbRoot.getChildByName("equip5");
            exItem.getComponent(EquipItem).init(this.hero_type,heroBaseInfo.FirstExclusiveWeaponID,PropAction.Null);
            exItem.children[0].getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
            exItem.children[1].getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
            zbRoot.getChildByName("haveNum").active = true;
            zbRoot.getChildByName("needNum").active = true;
            zbRoot.getChildByName("haveNum").getComponent(cc.Label).string = MyTool.getCoinDanwei(PropManager.getInstance().getPropNum(heroBaseInfo.ExclusiveWeaponFragment));
            zbRoot.getChildByName("needNum").getComponent(cc.Label).string = "/" + MyTool.getCoinDanwei(EWUnlockCostManager.getInstance().getCostFragment(heroBaseInfo.Quality));
    
            if(PropManager.getInstance().getPropNum(heroBaseInfo.ExclusiveWeaponFragment) > EWUnlockCostManager.getInstance().getCostFragment(heroBaseInfo.Quality)){
                zbRoot.getChildByName("haveNum").color = cc.color(255,255,255);
            }else{
                zbRoot.getChildByName("haveNum").color = cc.color(255,74,74);
            }
        }else{
            let exItem = zbRoot.getChildByName("equip5");
            zbRoot.getChildByName("haveNum").active = false;
            zbRoot.getChildByName("needNum").active = false;
            exItem.children[0].getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
            exItem.children[1].getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
            exItem.getComponent(EquipItem).init(this.hero_type,heroBaseInfo.FirstExclusiveWeaponID + ExclusiveEnhancementManager.getInstance().getJsonDataByHeroTypeAndStage(this.hero_type,heroInfo.exclusive_equip_stage).Star,PropAction.Null);
        }


        bottom.getChildByName("levelIcon").active = true;
        bottom.getChildByName("starIcon").active = true;

        if(HM.getHeroLevel(this.hero_type) > 1){
            top.getChildByName("revertIcon").active = true;
        }else{
            top.getChildByName("revertIcon").active = false;
        }

        bottom.getChildByName("preview").active = this.state == State.Preview;
        bottom.getChildByName("level").active = this.state == State.Level;
        bottom.getChildByName("star").active = this.state == State.Star;
        bottom.getChildByName("levelIcon").getComponent(cc.Sprite).spriteFrame = this.role_ui.getSpriteFrame("Hero_Tab_Btn_0_1");
        bottom.getChildByName("starIcon").getComponent(cc.Sprite).spriteFrame = this.role_ui.getSpriteFrame("Hero_Tab_Btn_1");
        level.active = true;
        /**是否有穿戴的的提示 */
        let isHaveEquipRed=false;
        /**是否有合成红点的提示 */
        let isHaveMergeRed=false;
        for(let i=EquipType.WuQi; i<EquipType.Num; i++)
        {
            let wearId=HeroManager.getInstance().getWearEquipment(this.hero_type,i);
            let item=zbRoot.getChildByName("equip" + i);
            //是否可以穿戴更高或者可以穿戴
            let isCanWear=false;
            let isCanMerge=false;
            if(wearId!=0)
            {
                // 有装备
                item.active = true;
                let equipInfo=new EquipInfo();
                equipInfo.equip_id=wearId;
                item.getComponent(EquipItem).init(this.hero_type,equipInfo,PropAction.Null);
                //是否能被消耗掉并且满足合成条件
                if(!EquipmentAttributeManager.getInstance().getIsMaxStage(wearId)){
                    isCanMerge=EquipmentManager.getInstance().checkAEquipMerge(EquipmentMergeManager.getInstance().getTargetEquipment_id(wearId),[]);
                }                
            }else{
                item.active = false;
                // 无装备
            }
            // console.log("AB" + zbRoot.childrenCount);
            //检测红点
            let red=equipRoot.getChildByName('red'+i);
            isCanWear=EquipmentManager.getInstance().checkWear(this.hero_type,i);
            if(isCanWear){
                isHaveEquipRed=true;
            }
            if(isCanMerge){
                isHaveMergeRed=true;
            }
            red.active=isCanMerge||isCanWear;
        }  
        if(HeroManager.getInstance().getWearPet(this.hero_type) == 0){
            zbRoot.getChildByName("pet").active = false;
        }else{
            let pet = zbRoot.getChildByName("pet");
            pet.active = true;
            pet.getComponent(PetItem).init(this.hero_type,HeroManager.getInstance().getWearPet(this.hero_type),PropAction.Null);
        }   
        bottom.getChildByName("levelNum").getComponent(cc.Label).string = 'LV.' + heroInfo.hero_level;
        if(isRefresh)
            bottom.getChildByName("fightNum").getComponent(NumberLabel).setTarget(zhanli,0.5,true);
        else
            bottom.getChildByName("fightNum").getComponent(NumberLabel).init(zhanli,true);

        level.getChildByName("hpLabel").getComponent(cc.Label).string = MyTool.numberFormat(heroData.total_hp);
        level.getChildByName("damageLabel").getComponent(cc.Label).string = MyTool.numberFormat(heroData.total_attack);
        level.getChildByName("defenseLabel").getComponent(cc.Label).string = MyTool.numberFormat(heroData.total_defense);
        level.getChildByName("atkSpeedLabel").getComponent(cc.Label).string = MyTool.numberFormat(heroData.atkSpeed,1);

        let skillRoot = level.getChildByName("skillRoot");
        let skillNum = heroBaseInfo.SkillNum;
        for(let i = 1;i <= 4;i++){
            if(i<=skillNum){
                let skill = skillRoot.getChildByName("btnSkill" + i);
                skill.active = true;
                let unlockLevel =  SkillLevelUnlockManager.getInstance().getHeroLevel(i)
                if(heroInfo.hero_level < unlockLevel){
                    skill.getComponent(cc.Sprite).spriteFrame = this.role_ui.getSpriteFrame("Hero_"+ this.hero_type +"_Skill_" + (i-1));
                    skill.getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
                    skill.children[0].active = false;
                }else{
                    skill.getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
                    skill.getComponent(cc.Sprite).spriteFrame = this.role_ui.getSpriteFrame("Hero_"+ this.hero_type +"_Skill_" + (i-1));
                    skill.children[0].active = true;
                    skill.children[0].getComponentInChildren(cc.Label).string = '' + (HeroAttributeManager.getInstance().getStarByHeroTypeAndStage(this.hero_type,heroInfo.hero_stage) + 1).toString();
                }
            }else{
                skillRoot.getChildByName("btnSkill" + i).active = false;
            }
        }
        let upgradeBtn=level.getChildByName("upgradeBtn");
        let isLevel=false;
        let isCoin=false;
        let isGem=false;
        if(HeroManager.getInstance().getHeroLevel(this.hero_type) >= heroBaseInfo.MaxLevel){
            level.getChildByName("coinBg").active = false;
            level.getChildByName("gemBg").active = false;
            upgradeBtn.getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
            upgradeBtn.getComponentInChildren(cc.Label).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
            upgradeBtn.getComponentInChildren(TextLanguage).setTextId(120010);
            upgradeBtn.getChildByName('red').active=false;
        }else{
            let coinHaveNum = PropManager.getInstance().getPropNum(PropId.Coin);
            let coinNeedNum = LevelUpManager.getInstance().getCostCoin(heroInfo.hero_level);
            let gemHaveNum = PropManager.getInstance().getPropNum(PropId.Gem);
            let gemNeedNum = LevelUpManager.getInstance().getCostGem(heroInfo.hero_level);
            level.getChildByName("coinBg").active = true;
            level.getChildByName("gemBg").active = true;
            upgradeBtn.getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
            upgradeBtn.getComponentInChildren(cc.Label).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
            upgradeBtn.getComponentInChildren(TextLanguage).setTextId(100018);
            level.getChildByName("coinBg").getChildByName("haveNum").getComponent(cc.Label).string = MyTool.getCoinDanwei(coinHaveNum);
            level.getChildByName("coinBg").getChildByName("needNum").getComponent(cc.Label).string = "/" + MyTool.getCoinDanwei(coinNeedNum);
            level.getChildByName("gemBg").getChildByName("haveNum").getComponent(cc.Label).string = MyTool.getCoinDanwei(gemHaveNum);
            level.getChildByName("gemBg").getChildByName("needNum").getComponent(cc.Label).string = "/" + MyTool.getCoinDanwei(gemNeedNum);
            // 升级按钮置灰，优先关卡置灰(即在金币足够的情况下，通过关卡没达到要求则按钮置灰)。
            // 如果是以为金币不足置灰则点击升级按钮弹出资源不足弹窗，如果是关卡限制置灰，点击升级按钮则提示通过关卡不足飘字提醒
            if(coinHaveNum < coinNeedNum){
                level.getChildByName("coinBg").getChildByName("haveNum").color = cc.color(254,76,76);
            }else{
                level.getChildByName("coinBg").getChildByName("haveNum").color = cc.color(222,199,166);
                isCoin=true;
            }
            if(gemHaveNum < gemNeedNum){
                level.getChildByName("gemBg").getChildByName("haveNum").color = cc.color(254,76,76);
            }else{
                level.getChildByName("gemBg").getChildByName("haveNum").color = cc.color(222,199,166);
                isGem=true;
            }
            if(gemNeedNum == 0){
                level.getChildByName("coinBg").x = 0;
                level.getChildByName("gemBg").active = false;
            }else{
                level.getChildByName("coinBg").x = 150;
                level.getChildByName("gemBg").active = true;
            }
            let finishLevel = LevelManager.getInstance().finish_level;
            let needLevel=LevelUpManager.getInstance().getLevelLimit(heroInfo.hero_level);
            if(finishLevel < needLevel){
                upgradeBtn.getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
                upgradeBtn.getComponentInChildren(cc.Label).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
                isLevel=false;
            }else{
                upgradeBtn.getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
                upgradeBtn.getComponentInChildren(cc.Label).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
                isLevel=true;
            }
        }        
        //宠物的红点
        let isPetRed=PetManager.getInstance().checkRedTip(this.hero_type);
        equipRoot.getChildByName('redPet').active=isPetRed;
        let isEx=HeroManager.getInstance().checkExUp(this.hero_type);;
        equipRoot.getChildByName('redEx').active=isEx;
        //升级按钮红点
        let isCanUp=(isCoin && isLevel && isGem);
        upgradeBtn.getChildByName('red').active=isCanUp;
        //升级模块的按钮红点
        bottom.getChildByName("levelIcon").getChildByName('red').active=isHaveEquipRed||isCanUp||isHaveMergeRed||isPetRed||isEx;
        //升星模块的按钮红点
        bottom.getChildByName("starIcon").getChildByName('red').active=HeroManager.getInstance().checkUpStar(this.hero_type)||HeroManager.getInstance().checkAllPurposeFragment(this.hero_type);
        //一键穿戴
        equipRoot.getChildByName('btnWear').getChildByName('red').active=isHaveEquipRed;        
    }

    // 升星刷新
    upstarRefresh(isRefresh:boolean = true){
        let HM = HeroManager.getInstance();
        let bottom = this.node.getChildByName("bottom");
        let top = this.node.getChildByName("top");
        let star = bottom.getChildByName("star");
        let stage = HM.getHeroStage(this.hero_type) % 6;
        let heroData = HM.getHeroData(this.hero_type);

        if(HM.getHeroLevel(this.hero_type) > 1){
            top.getChildByName("revertIcon").active = true;
        }else{
            top.getChildByName("revertIcon").active = false;
        }
        bottom.getChildByName("levelIcon").getComponent(cc.Sprite).spriteFrame = this.role_ui.getSpriteFrame("Hero_Tab_Btn_0");
        bottom.getChildByName("starIcon").getComponent(cc.Sprite).spriteFrame = this.role_ui.getSpriteFrame("Hero_Tab_Btn_1_1");
        if(HeroManager.getInstance().getHeroStage(this.hero_type) == HeroBaseInfoManager.getInstance().getMaxStage(this.hero_type)){
            star.getChildByName("Hero_Arrow").active = false;
            star.getChildByName("targetHpNum").active = false;
            star.getChildByName("targetAtkNum").active = false;
            star.getChildByName("targetDefanceNum").active = false;
            star.getChildByName("Hero_Bg_1").active = false;
            star.getChildByName("Hero_Bg_2").active = false;
            star.getChildByName("Hero_Bg_3").active = false;
            star.getChildByName("costIcon").active = false;
            star.getChildByName("coinBg").active = false;
            star.getChildByName("needNum").active = false;
            star.getChildByName("haveNum").active = false;
            star.getChildByName("universalBtn").active = false;
            star.getChildByName("upstarBtn").active = false;
            star.getChildByName("Hero_Icon_1").active = false;
            star.getChildByName("Hero_Icon_2").active = false;
            star.getChildByName("Hero_Icon_3").active = false;

            star.getChildByName("Hero_Evolve_0_1").active = true;
            star.getChildByName("Hero_Evolve_0_2").active = true;
            star.getChildByName("Hero_Evolve_0_3").active = true;
            star.getChildByName("Hero_Evolve_0_4").active = true;
            star.getChildByName("Hero_Evolve_2_1").active = true;
            star.getChildByName("Hero_Evolve_2_2").active = true;
            star.getChildByName("Hero_Evolve_2_3").active = true;
            star.getChildByName("Hero_Evolve_2_4").active = true;
            star.getChildByName("Hero_Evolve_2_5").active = true;
            star.getChildByName("tipLabel").active = true;

            let zhanli = HM.getHeroZhanli(this.hero_type);
            bottom.getChildByName("fightNum").getComponent(NumberLabel).setTarget(zhanli,0.5,true);

            star.getChildByName("hpNum").getComponent(cc.Label).string = MyTool.numberFormat(heroData.total_hp);
            star.getChildByName("atkNum").getComponent(cc.Label).string = MyTool.numberFormat(heroData.total_attack);
            star.getChildByName("defanceNum").getComponent(cc.Label).string = MyTool.numberFormat(heroData.total_defense);
            return;
        }
        let targetHeroData = HM.getTargetHeroData(this.hero_type,HM.getHeroStage(this.hero_type) + 1,HM.getHeroLevel(this.hero_type))

        star.getChildByName("tipLabel").active = false;

        star.getChildByName("Hero_Arrow").active = true;
        star.getChildByName("targetHpNum").active = true;
        star.getChildByName("targetAtkNum").active = true;
        star.getChildByName("targetDefanceNum").active = true;
        star.getChildByName("Hero_Bg_1").active = true;
        star.getChildByName("Hero_Bg_2").active = true;
        star.getChildByName("Hero_Bg_3").active = true;
        star.getChildByName("costIcon").active = true;
        star.getChildByName("coinBg").active = true;
        star.getChildByName("needNum").active = true;
        star.getChildByName("haveNum").active = true;
        star.getChildByName("universalBtn").active = true;
        star.getChildByName("upstarBtn").active = true;
        star.getChildByName("Hero_Icon_1").active = true;
        star.getChildByName("Hero_Icon_2").active = true;
        star.getChildByName("Hero_Icon_3").active = true;

        bottom.getChildByName("levelIcon").active = true;
        bottom.getChildByName("starIcon").active = true;

        bottom.getChildByName("preview").active = this.state == State.Preview;
        bottom.getChildByName("level").active = this.state == State.Level;
        bottom.getChildByName("star").active = this.state == State.Star;
        let level=bottom.getChildByName("level");
        level.active = false;
        switch(stage){
            case 0:
                for(let i = 1;i < 6;i++){
                    let temp = star.getChildByName("Hero_Evolve_0_" + i);
                    if(temp != null){
                        temp.active = false;
                    }
                    temp = star.getChildByName("Hero_Evolve_2_" + i);
                    temp.active = false;
                }
            break;
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                for(let i = 1;i < 6;i++){
                    if(i <= stage){
                        if(i == 3){
                            star.getChildByName("Hero_Evolve_0_1").active = true;
                        }
                        if(i == 4){
                            star.getChildByName("Hero_Evolve_0_2").active = true;
                        }
                        if(i == 5){
                            star.getChildByName("Hero_Evolve_0_3").active = true;
                            star.getChildByName("Hero_Evolve_0_4").active = true;
                        }
                    }else{
                        if(i == 3){
                            star.getChildByName("Hero_Evolve_0_1").active = false;
                        }
                        if(i == 4){
                            star.getChildByName("Hero_Evolve_0_2").active = false;
                        }
                        if(i == 5){
                            star.getChildByName("Hero_Evolve_0_3").active = false;
                            star.getChildByName("Hero_Evolve_0_4").active = false;
                        }
                    }
                    let temp = star.getChildByName("Hero_Evolve_2_" + i);
                    if (i <= stage)
                        temp.active = true;
                    else
                        temp.active = false;
                }
            break;
        }
        
        let zhanli = HM.getHeroZhanli(this.hero_type);
        if(isRefresh)
            bottom.getChildByName("fightNum").getComponent(NumberLabel).setTarget(zhanli,0.5,true);
        else
            bottom.getChildByName("fightNum").getComponent(NumberLabel).init(zhanli,true);

        star.getChildByName("costIcon").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByPropId(HeroBaseInfoManager.getInstance().getHeroFragment(this.hero_type));
        star.getChildByName("hpNum").getComponent(cc.Label).string = MyTool.numberFormat(heroData.total_hp);
        star.getChildByName("atkNum").getComponent(cc.Label).string = MyTool.numberFormat(heroData.total_attack);
        star.getChildByName("defanceNum").getComponent(cc.Label).string = MyTool.numberFormat(heroData.total_defense);

        star.getChildByName("targetHpNum").getComponent(cc.Label).string =  MyTool.numberFormat(targetHeroData.total_hp);
        star.getChildByName("targetAtkNum").getComponent(cc.Label).string = MyTool.numberFormat(targetHeroData.total_attack);
        star.getChildByName("targetDefanceNum").getComponent(cc.Label).string = MyTool.numberFormat(targetHeroData.total_defense);

        let haveNum = PropManager.getInstance().getPropNum(HeroBaseInfoManager.getInstance().getHeroFragment(this.hero_type));
        let needNum = HeroQualityManager.getInstance().getCostDebrisByHeroQualityAndStage(HeroBaseInfoManager.getInstance().getQuality(this.hero_type),HM.getHeroStage(this.hero_type));

        star.getChildByName("haveNum").getComponent(cc.Label).string = MyTool.getCoinDanwei(haveNum);
        star.getChildByName("needNum").getComponent(cc.Label).string = "/" + MyTool.getCoinDanwei(needNum);
        
        if(haveNum < needNum){
            star.getChildByName("haveNum").color = cc.color(254,76,76);
        }else{
            star.getChildByName("haveNum").color = cc.color(222,199,166);
        }
        let heroQuality = HeroBaseInfoManager.getInstance().getQuality(this.hero_type);
        let masterKeynum = 0;
        switch(heroQuality){
            case 1:
                // C
                masterKeynum = PropManager.getInstance().getPropNum(PropId.HeroMasterKeyC);
                break;
            case 2:
                // B
                masterKeynum = PropManager.getInstance().getPropNum(PropId.HeroMasterKeyB);
                break;
            case 3:
                // A
                masterKeynum = PropManager.getInstance().getPropNum(PropId.HeroMasterKeyA);
                break;
            case 4:
                // S
                masterKeynum = PropManager.getInstance().getPropNum(PropId.HeroMasterKeyS);
                break;
            case 5:
                // SS
                masterKeynum = PropManager.getInstance().getPropNum(PropId.HeroMasterKeySS);
                break;
            case 6:
                // SSS
                masterKeynum = PropManager.getInstance().getPropNum(PropId.HeroMasterKeySSS);
                break;
        }
        let allFragmentRed=false;
        if(masterKeynum < 1){
            star.getChildByName("universalBtn").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
            star.getChildByName("universalBtn").getComponentInChildren(cc.Label).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
            allFragmentRed=false;
        }else{
            star.getChildByName("universalBtn").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
            star.getChildByName("universalBtn").getComponentInChildren(cc.Label).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
            allFragmentRed=HeroManager.getInstance().checkAllPurposeFragment(this.hero_type);
        }
        star.getChildByName("universalBtn").getChildByName('red').active=allFragmentRed;
        //升级模块的按钮红点
        bottom.getChildByName("levelIcon").getChildByName('red').active=HeroManager.getInstance().checkUpgrade(this.hero_type).is_can_up;
        //升星模块的按钮红点
        bottom.getChildByName("starIcon").getChildByName('red').active=haveNum>=needNum||allFragmentRed;
        //升星按钮的红点
        star.getChildByName("upstarBtn").getChildByName('red').active=haveNum>=needNum;
    }

    previewRefresh(isRefresh:boolean = true){
        let HM = HeroManager.getInstance();
        let bottom = this.node.getChildByName("bottom");
        let preview = bottom.getChildByName("preview");
        // let heroInfo = HM.getHeroInfo(this.hero_type);
        let heroBaseInfo = HeroBaseInfoManager.getInstance().getJsonHeroBaseInfo(this.hero_type);
        let heroMaxLevel  = heroBaseInfo.MaxLevel;
        let heroMaxStage  = heroBaseInfo.MaxStage;
        let heroData = HM.getTargetHeroData(this.hero_type,heroMaxStage,heroMaxLevel);
        let zhanli = HM.getTargetHeroZhanli(this.hero_type,heroMaxStage,heroMaxLevel);
        let top = this.node.getChildByName("top");
        
        bottom.getChildByName("levelIcon").active = false;
        top.getChildByName("revertIcon").active = false;
        bottom.getChildByName("starIcon").active = false;

        // preview.active = true;
        bottom.getChildByName("preview").active = this.state == State.Preview;
        bottom.getChildByName("level").active = this.state == State.Level;
        bottom.getChildByName("star").active = this.state == State.Star;
        preview.getChildByName("equip5").getComponent(EquipItem).init(this.hero_type,heroBaseInfo.FirstExclusiveWeaponID,PropAction.Null);
        preview.getChildByName("eHaveNum").getComponent(cc.Label).string = MyTool.getCoinDanwei(PropManager.getInstance().getPropNum(heroBaseInfo.ExclusiveWeaponFragment));
        preview.getChildByName("eNeedNum").getComponent(cc.Label).string = "/" + MyTool.getCoinDanwei(EWUnlockCostManager.getInstance().getCostFragment(heroBaseInfo.Quality));

        if(PropManager.getInstance().getPropNum(heroBaseInfo.ExclusiveWeaponFragment) > EWUnlockCostManager.getInstance().getCostFragment(heroBaseInfo.Quality)){
            preview.getChildByName("eHaveNum").color = cc.color(255,255,255);
        }else{
            preview.getChildByName("eHaveNum").color = cc.color(255,74,74);
        }

        let star = HeroAttributeManager.getInstance().getStarByHeroTypeAndStage(this.hero_type,heroMaxStage);
        top.getChildByName("coinLabel").getComponent(cc.Label).string = MyTool.getCoinDanwei(PropManager.getInstance().getPropNum(PropId.Coin));
        top.getChildByName("gemLabel").getComponent(cc.Label).string = MyTool.getCoinDanwei(PropManager.getInstance().getPropNum(PropId.Gem));
        top.getChildByName("name").getComponent(cc.Label).string = LanguageManager.getInstance().getStrByTextId(heroBaseInfo.NameText_ID);
        top.getChildByName("nickname").getComponent(cc.Label).string = 
        LanguageManager.getInstance().getStrByTextId(HeroTitleManager.getInstance().getHeroTitleTextIdByHeroTypeAndHeroStar(this.hero_type,star));
        top.getChildByName("quality").getComponent(cc.Sprite).spriteFrame = this.role_ui.getSpriteFrame("Hero_Title_" + heroBaseInfo.Quality + "_0")
        top.getChildByName("nameBg").getComponent(cc.Sprite).spriteFrame = this.role_ui.getSpriteFrame("Hero_Title_" + heroBaseInfo.Quality + "_1")
        if(star == 0){
            top.getChildByName("star").active = false;
        }else{
            top.getChildByName("star").active = true;
            top.getChildByName("star").getComponent(cc.Sprite).spriteFrame = this.role_ui.getSpriteFrame("Hero_Star_" + star);
        }
        // let heroSp = this.node.getChildByName("bottom").getChildByName("heroSp").getComponent(sp.Skeleton)
        // heroSp.skeletonData = this.hero_skeleton_data[this.hero_type-1];
        // heroSp.animation = "Idle";
        let heroSp = this.node.getChildByName("bottom").getChildByName("heroSp").getComponent(sp.Skeleton)
        heroSp.skeletonData = this.hero_skeleton_data[this.hero_type-1];
        heroSp.setAnimation(0,"Idle",true);
        // anima.listener=null;
        heroSp.setCompleteListener(() =>{
            // anima.listener=null;                
            let name = '';
            let judge = Math.random();
            if(judge < 0.6){
                name = 'Idle';
            }else if(judge < 0.8){
                name = 'Attack';
            }else{
                name = 'Idle2';
            }
            heroSp.setAnimation(0,name,true);
        });
        // heroSp.node.scale = 0.4;


        bottom.getChildByName("levelNum").getComponent(cc.Label).string = 'LV.' + heroMaxLevel;
        if(isRefresh)
            bottom.getChildByName("fightNum").getComponent(NumberLabel).setTarget(zhanli,0.5,true);
        else
            bottom.getChildByName("fightNum").getComponent(NumberLabel).init(zhanli,true);

        preview.getChildByName("costIcon").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByPropId(heroBaseInfo.HeroFragment);
        preview.getChildByName("hpLabel").getComponent(cc.Label).string = MyTool.numberFormat(heroData.total_hp);
        preview.getChildByName("damageLabel").getComponent(cc.Label).string = MyTool.numberFormat(heroData.total_attack);
        preview.getChildByName("defenseLabel").getComponent(cc.Label).string = MyTool.numberFormat(heroData.total_defense);
        preview.getChildByName("atkSpeedLabel").getComponent(cc.Label).string = MyTool.numberFormat(heroData.atkSpeed,1);

        let skillRoot = preview.getChildByName("skillRoot");
        let skillNum = heroBaseInfo.SkillNum;
        for(let i = 1;i <= 4;i++){
            if(i<=skillNum){
                let skill = skillRoot.getChildByName("btnSkill" + i);
                skill.active = true;
                // let unlockLevel =  SkillLevelUnlockManager.getInstance().getHeroLevel(i)
                skill.getComponent(cc.Sprite).spriteFrame = this.role_ui.getSpriteFrame("Hero_"+ this.hero_type +"_Skill_" + (i-1));
                skill.getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
                skill.children[0].active = true;
                skill.children[0].getComponentInChildren(cc.Label).string = '' + (HeroAttributeManager.getInstance().getStarByHeroTypeAndStage(this.hero_type,heroMaxStage)+1).toString();
            }else{
                skillRoot.getChildByName("btnSkill" + i).active = false;
            }
        }
        let haveNum = PropManager.getInstance().getPropNum(heroBaseInfo.HeroFragment);
        let needNum = heroBaseInfo.UnlockFragmentNum;
        preview.getChildByName("haveNum").getComponent(cc.Label).string = MyTool.getCoinDanwei(haveNum);
        preview.getChildByName("needNum").getComponent(cc.Label).string = "/" + MyTool.getCoinDanwei(needNum);
        let upgradeBtn=preview.getChildByName("upgradeBtn");
        let unlockRed=preview.getChildByName("upgradeBtn").getChildByName('red');
        if(haveNum < needNum){
            preview.getChildByName("haveNum").color = cc.color(254,76,76);
            upgradeBtn.getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
            upgradeBtn.getComponentInChildren(cc.Label).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
            unlockRed.active=false;
        }else{
            preview.getChildByName("haveNum").color = cc.color(222,199,166);
            upgradeBtn.getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
            upgradeBtn.getComponentInChildren(cc.Label).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
            unlockRed.active=true;
        }
        let heroQuality = heroBaseInfo.Quality;
        let masterKeynum = 0;
        switch(heroQuality){
            case 1:
                // C
                masterKeynum = PropManager.getInstance().getPropNum(PropId.HeroMasterKeyC);
                break;
            case 2:
                // B
                masterKeynum = PropManager.getInstance().getPropNum(PropId.HeroMasterKeyB);
                break;
            case 3:
                // A
                masterKeynum = PropManager.getInstance().getPropNum(PropId.HeroMasterKeyA);
                break;
            case 4:
                // S
                masterKeynum = PropManager.getInstance().getPropNum(PropId.HeroMasterKeyS);
                break;
            case 5:
                // SS
                masterKeynum = PropManager.getInstance().getPropNum(PropId.HeroMasterKeySS);
                break;
            case 6:
                // SSS
                masterKeynum = PropManager.getInstance().getPropNum(PropId.HeroMasterKeySSS);
                break;
        }
        let universalBtn=preview.getChildByName("universalBtn")
        let wannnegRed=universalBtn.getChildByName('red');
        if(masterKeynum < 1){
            universalBtn.getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
            universalBtn.getComponentInChildren(cc.Label).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
            wannnegRed.active=false;
        }else{
            universalBtn.getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
            universalBtn.getComponentInChildren(cc.Label).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
            let offsetNum=needNum-haveNum;
            let isCan=PropManager.getInstance().getPropNum(HeroManager.getInstance().getHeroFragmentId(this.hero_type))>=offsetNum;
            wannnegRed.active=offsetNum>0 && isCan;
        }
        
    }

    showGetAssetsUi(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        this.node.getChildByName("reduction").active = false;
        this.node.getChildByName("exchange").active = false;
        // this.node.getChildByName("tip").active = true;
        UIManager.getInstance().showUiDialog(UIPath.CoinPop,UILayerLevel.Two,{onCompleted:(uiNode)=> {
            uiNode.getComponent(CoinPop).init({
                onClose:()=>{
                    this.infoRefresh();
                    if(this.state == State.Level){
                        this.upgradeRefresh();
                    }else{
                        this.upstarRefresh();
                    }
                    // this.upgradeRefresh();
                }
            })
            uiNode.getComponent(CoinPop).initUi(PropId.Coin)
        },});
    }
    onBtnCoin(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        UIManager.getInstance().showUiDialog(UIPath.CoinPop,UILayerLevel.Two,{onCompleted:(uiNode)=> {
            uiNode.getComponent(CoinPop).init({
                onClose:()=>{
                    this.infoRefresh();
                    if(this.state == State.Level){
                        this.upgradeRefresh();
                    }else{
                        this.upstarRefresh();
                    }
                }
            })
            uiNode.getComponent(CoinPop).initUi(PropId.Coin)
        },});
    }
    onBtnGem(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        UIManager.getInstance().showUiDialog(UIPath.CoinPop,UILayerLevel.Two,{onCompleted:(uiNode)=> {
            uiNode.getComponent(CoinPop).init({
                onClose:()=>{
                    this.infoRefresh();
                    if(this.state == State.Level){
                        this.upgradeRefresh();
                    }else{
                        this.upstarRefresh();
                    }
                }
            })
            uiNode.getComponent(CoinPop).initUi(PropId.Gem)
        },});
    }

    // onCloseGetAssetsBtnClick(){
    //     this.node.getChildByName("tip").active = false;
    // }

    showExchangeUi(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        let exchange = this.node.getChildByName("exchange");
        exchange.active = true;
        let heroQuality = HeroBaseInfoManager.getInstance().getQuality(this.hero_type);
        let masterKeynum = 0;
        let keyId = 0;
        switch(heroQuality){
            case 1:
                // C
                masterKeynum = PropManager.getInstance().getPropNum(PropId.HeroMasterKeyC);
                keyId = PropId.HeroMasterKeyC
                break;
            case 2:
                // B
                masterKeynum = PropManager.getInstance().getPropNum(PropId.HeroMasterKeyB);
                keyId = PropId.HeroMasterKeyB
                break;
            case 3:
                // A
                masterKeynum = PropManager.getInstance().getPropNum(PropId.HeroMasterKeyA);
                keyId = PropId.HeroMasterKeyA
                break;
            case 4:
                // S
                masterKeynum = PropManager.getInstance().getPropNum(PropId.HeroMasterKeyS);
                keyId = PropId.HeroMasterKeyS
                break;
            case 5:
                // SS
                masterKeynum = PropManager.getInstance().getPropNum(PropId.HeroMasterKeySS);
                keyId = PropId.HeroMasterKeySS
                break;
            case 6:
                // SSS
                masterKeynum = PropManager.getInstance().getPropNum(PropId.HeroMasterKeySSS);
                keyId = PropId.HeroMasterKeySSS
                break;
        }
        let p1 = PropManager.getInstance().createPropItem(keyId,0);
        let p2 = PropManager.getInstance().createPropItem(HeroBaseInfoManager.getInstance().getHeroFragment(this.hero_type),0);
        exchange.getChildByName("slider").getComponent(cc.Slider).progress = 0;
        exchange.getChildByName("slider").getComponent(cc.ProgressBar).progress = 0;
        exchange.getChildByName("num").getComponent(cc.Label).string = (exchange.getChildByName("slider").getComponent(cc.Slider).progress * masterKeynum).toFixed() + '/' + masterKeynum;
        exchange.getChildByName("Item_1").addChild(p1);
        exchange.getChildByName("Item_2").addChild(p2);
    }

    showPreviewExchangeUi(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        let exchange = this.node.getChildByName("previewExchange");
        exchange.active = true;
        let heroQuality = HeroBaseInfoManager.getInstance().getQuality(this.hero_type);
        let masterKeynum = 0;
        let keyId = 0;
        switch(heroQuality){
            case 1:
                // C
                masterKeynum = PropManager.getInstance().getPropNum(PropId.HeroMasterKeyC);
                keyId = PropId.HeroMasterKeyC
                break;
            case 2:
                // B
                masterKeynum = PropManager.getInstance().getPropNum(PropId.HeroMasterKeyB);
                keyId = PropId.HeroMasterKeyB
                break;
            case 3:
                // A
                masterKeynum = PropManager.getInstance().getPropNum(PropId.HeroMasterKeyA);
                keyId = PropId.HeroMasterKeyA
                break;
            case 4:
                // S
                masterKeynum = PropManager.getInstance().getPropNum(PropId.HeroMasterKeyS);
                keyId = PropId.HeroMasterKeyS
                break;
            case 5:
                // SS
                masterKeynum = PropManager.getInstance().getPropNum(PropId.HeroMasterKeySS);
                keyId = PropId.HeroMasterKeySS
                break;
            case 6:
                // SSS
                masterKeynum = PropManager.getInstance().getPropNum(PropId.HeroMasterKeySSS);
                keyId = PropId.HeroMasterKeySSS
                break;
        }
        let p1 = PropManager.getInstance().createPropItem(keyId,0);
        let p2 = PropManager.getInstance().createPropItem(HeroBaseInfoManager.getInstance().getHeroFragment(this.hero_type),0);
        exchange.getChildByName("slider").getComponent(cc.Slider).progress = 0;
        exchange.getChildByName("slider").getComponent(cc.ProgressBar).progress = 0;
        exchange.getChildByName("num").getComponent(cc.Label).string = (exchange.getChildByName("slider").getComponent(cc.Slider).progress * masterKeynum).toFixed() + '/' + masterKeynum;
        exchange.getChildByName("Item_1").addChild(p1);
        exchange.getChildByName("Item_2").addChild(p2);
    }

    onCloseUpStarTipBtnClick(){
        this.node.getChildByName("upStarTip").active = false;
    }

    showUpStarTip(){
        
        let HM = HeroManager.getInstance();
        let heroData = HM.getHeroData(this.hero_type);
        let oldHeroData = HM.getTargetHeroData(this.hero_type,HM.getHeroStage(this.hero_type) - 1,HM.getHeroLevel(this.hero_type))
        let star = HeroAttributeManager.getInstance().getStarByHeroTypeAndStage(this.hero_type,HM.getHeroStage(this.hero_type));
        let oldStar = HeroAttributeManager.getInstance().getStarByHeroTypeAndStage(this.hero_type,HM.getHeroStage(this.hero_type) - 1);
        let nickname = HeroTitleManager.getInstance().getHeroTitleTextIdByHeroTypeAndHeroStar(this.hero_type,star);
        let oldNickname = HeroTitleManager.getInstance().getHeroTitleTextIdByHeroTypeAndHeroStar(this.hero_type,oldStar);

        let upStarTip = this.node.getChildByName("upStarTip");
        upStarTip.active = true;
        upStarTip.getChildByName("oldStar").getComponent(cc.Sprite).spriteFrame = this.role_ui.getSpriteFrame("Hero_Star_" + oldStar);
        upStarTip.getChildByName("oldNickname").getComponent(TextLanguage).setTextId(oldNickname);
        upStarTip.getChildByName("oldSkill").getComponent(TextLanguage).startTranslation();
        upStarTip.getChildByName("oldSkill").getComponent(TextLanguage).string += "LV" + (oldStar + 1);
        upStarTip.getChildByName("oldHpNum").getComponent(cc.Label).string = MyTool.numberFormat(oldHeroData.total_hp);
        upStarTip.getChildByName("oldAtkNum").getComponent(cc.Label).string = MyTool.numberFormat(oldHeroData.total_attack);
        upStarTip.getChildByName("oldDefanceNum").getComponent(cc.Label).string = MyTool.numberFormat(oldHeroData.total_defense);

        upStarTip.getChildByName("star").getComponent(cc.Sprite).spriteFrame = this.role_ui.getSpriteFrame("Hero_Star_" + star);
        upStarTip.getChildByName("nickname").getComponent(TextLanguage).setTextId(nickname);
        upStarTip.getChildByName("skillNum").getComponent(cc.Label).string = "LV" + (star + 1);
        upStarTip.getChildByName("hpNum").getComponent(cc.Label).string = MyTool.numberFormat(heroData.total_hp);
        upStarTip.getChildByName("atkNum").getComponent(cc.Label).string = MyTool.numberFormat(heroData.total_attack);
        upStarTip.getChildByName("defanceNum").getComponent(cc.Label).string = MyTool.numberFormat(heroData.total_defense);

    }

    sliderMoveResponce(slider:cc.Slider){
        let exchange = this.node.getChildByName("exchange");
        let heroQuality = HeroBaseInfoManager.getInstance().getQuality(this.hero_type);
        let masterKeynum = 0;
        switch(heroQuality){
            case 1:
                // C
                masterKeynum = PropManager.getInstance().getPropNum(PropId.HeroMasterKeyC);
                break;
            case 2:
                // B
                masterKeynum = PropManager.getInstance().getPropNum(PropId.HeroMasterKeyB);
                break;
            case 3:
                // A
                masterKeynum = PropManager.getInstance().getPropNum(PropId.HeroMasterKeyA);
                break;
            case 4:
                // S
                masterKeynum = PropManager.getInstance().getPropNum(PropId.HeroMasterKeyS);
                break;
            case 5:
                // SS
                masterKeynum = PropManager.getInstance().getPropNum(PropId.HeroMasterKeySS);
                break;
            case 6:
                // SSS
                masterKeynum = PropManager.getInstance().getPropNum(PropId.HeroMasterKeySSS);
                break;
        }
        exchange.getChildByName("slider").getComponent(cc.ProgressBar).progress = slider.progress;
        exchange.getChildByName("num").getComponent(cc.Label).string = (slider.progress * masterKeynum).toFixed() + '/' + masterKeynum;
    }

    previewSliderMoveResponce(slider:cc.Slider){
        let exchange = this.node.getChildByName("previewExchange");
        let heroQuality = HeroBaseInfoManager.getInstance().getQuality(this.hero_type);
        let masterKeynum = 0;
        switch(heroQuality){
            case 1:
                // C
                masterKeynum = PropManager.getInstance().getPropNum(PropId.HeroMasterKeyC);
                break;
            case 2:
                // B
                masterKeynum = PropManager.getInstance().getPropNum(PropId.HeroMasterKeyB);
                break;
            case 3:
                // A
                masterKeynum = PropManager.getInstance().getPropNum(PropId.HeroMasterKeyA);
                break;
            case 4:
                // S
                masterKeynum = PropManager.getInstance().getPropNum(PropId.HeroMasterKeyS);
                break;
            case 5:
                // SS
                masterKeynum = PropManager.getInstance().getPropNum(PropId.HeroMasterKeySS);
                break;
            case 6:
                // SSS
                masterKeynum = PropManager.getInstance().getPropNum(PropId.HeroMasterKeySSS);
                break;
        }
        exchange.getChildByName("slider").getComponent(cc.ProgressBar).progress = slider.progress;
        exchange.getChildByName("num").getComponent(cc.Label).string = (slider.progress * masterKeynum).toFixed() + '/' + masterKeynum;
    }

    onSkillClick(e,skillSlot:number){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        UIManager.getInstance().showUiDialog(UIPath.HeroSkill,UILayerLevel.Two,{onCompleted:(uiNode)=> {
            uiNode.getComponent(HeroSkillUi).init(null);
            uiNode.getComponent(HeroSkillUi).initData(this.hero_type,skillSlot);
        },})
    }

    onEquipmentClick(e,indexStr:string){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        FollowManager.getInstance().followEvent(Follow_Type.装备栏点击次数);
        let type=parseInt(indexStr);
        switch(type){
            case 1:
                FollowManager.getInstance().followEvent(Follow_Type.英雄_武器栏点击次数);
                break;
            case 2:
                FollowManager.getInstance().followEvent(Follow_Type.英雄_护甲栏点击次数);
                break;
            case 3:
                FollowManager.getInstance().followEvent(Follow_Type.英雄_项链栏点击次数);
                break;
            case 4:
                FollowManager.getInstance().followEvent(Follow_Type.英雄_鞋子栏点击次数);
                break;
        }
        let equipInfo=HeroManager.getInstance().getWearEquipment(this.hero_type,type);//是否带上了装备
        if(equipInfo){
            UIManager.getInstance().showUiDialog(UIPath.EquipInfo,UILayerLevel.Two,{
                onCompleted:(node)=>{
                    node.getComponent(EquipInfoUi).initData(this.hero_type,equipInfo,PropAction.Use,{
                        prop_id: equipInfo,
                        prop_num: 1,
                        prop_price:0,
                        prop_cost_id:0,
                    },null,()=>{
                        this.upgradeRefresh();
                    });
                }
            })
            // UIManager.getInstance().showEquipInfoUi(this.hero_type,equipInfo,PropAction.Use,{
            //     prop_id: equipInfo,
            //     prop_num: 1,
            //     prop_price:0,
            //     prop_cost_id:0,
            // },null,()=>{
            //     this.upgradeRefresh();
            // });
        }else{
            UIManager.getInstance().showEquipExchangeUi({onClose:()=>{
                this.upgradeRefresh();
            }},equipInfo,this.hero_type,type);
        } 
    }

    onTakeOffClick(){

        let oldCombat = HeroManager.getInstance().getHeroZhanli(this.hero_type);
        let oldData = HeroManager.getInstance().getDeepHeroData(this.hero_type);

        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        FollowManager.getInstance().followEvent(Follow_Type.脱装点击次数);
        if(EquipmentManager.getInstance().checkQuickUnload(this.hero_type,true)){
            HeroManager.getInstance().refreshHeroData(this.hero_type);            
            // GameManager.getInstance().refreshZhanliShow();
            this.upgradeRefresh();
        }

        let newCombat = HeroManager.getInstance().getHeroZhanli(this.hero_type);
        let newData = HeroManager.getInstance().getDeepHeroData(this.hero_type);

        if(oldCombat != newCombat)
            UIManager.getInstance().showCombatChangeEffect(oldCombat,newCombat,oldData,newData);
    }

    onWearClick(){
        let oldCombat = HeroManager.getInstance().getHeroZhanli(this.hero_type);
        let oldData = HeroManager.getInstance().getDeepHeroData(this.hero_type);

        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        FollowManager.getInstance().followEvent(Follow_Type.一键穿戴点击次数);
        FollowManager.getInstance().followEvent(Follow_Type.不同英雄点击一键穿戴的次数+this.hero_type);
        if(EquipmentManager.getInstance().checkQuickWear(this.hero_type,true)){
            HeroManager.getInstance().refreshHeroData(this.hero_type);            
            // GameManager.getInstance().refreshZhanliShow();
            this.upgradeRefresh();
        }

        let newCombat = HeroManager.getInstance().getHeroZhanli(this.hero_type);
        let newData = HeroManager.getInstance().getDeepHeroData(this.hero_type);
        if(oldCombat != newCombat)
            UIManager.getInstance().showCombatChangeEffect(oldCombat,newCombat,oldData,newData);
    }

    onLevelBtnClick(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        this.state =  State.Level;
        this.infoRefresh();
        this.upgradeRefresh();
        let bottom = this.node.getChildByName("bottom");
        bottom.getChildByName("level").active = true;
        bottom.getChildByName("star").active = false;
        bottom.getChildByName("levelIcon").getComponent(cc.Sprite).spriteFrame = this.role_ui.getSpriteFrame("Hero_Tab_Btn_0_1");
        bottom.getChildByName("starIcon").getComponent(cc.Sprite).spriteFrame = this.role_ui.getSpriteFrame("Hero_Tab_Btn_1");
    }

    onStarBtnClick(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        this.state =  State.Star;
        this.infoRefresh();
        this.upstarRefresh(false);
        let bottom = this.node.getChildByName("bottom");
        bottom.getChildByName("level").active = false;
        bottom.getChildByName("star").active = true;
        bottom.getChildByName("levelIcon").getComponent(cc.Sprite).spriteFrame = this.role_ui.getSpriteFrame("Hero_Tab_Btn_0");
        bottom.getChildByName("starIcon").getComponent(cc.Sprite).spriteFrame = this.role_ui.getSpriteFrame("Hero_Tab_Btn_1_1");
    }
    // 升级按钮
    onUpgradeBtnClick(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        // 如果通过关卡未达到限制则飘字提示
        if(HeroManager.getInstance().getHeroLevel(this.hero_type) >= HeroBaseInfoManager.getInstance().getMaxLevel(this.hero_type)){
            let str = LanguageManager.getInstance().getStrByTextId(120024);
            GameManager.getInstance().showMessage(str);
            return;
        }
        let finishLevel = LevelManager.getInstance().finish_level;
        let needLevel = LevelUpManager.getInstance().getLevelLimit(HeroManager.getInstance().getHeroLevel(this.hero_type));
        if(finishLevel < needLevel){
            let str = LanguageManager.getInstance().getStrByTextId(720002);
            str=str.replace('~',needLevel.toString());
            GameManager.getInstance().showMessage(str);
            return;
        }
        // 如果金币不足则显示获取资源界面
        let coinHaveNum = PropManager.getInstance().getPropNum(PropId.Coin);
        let coinNeedNum = LevelUpManager.getInstance().getCostCoin(HeroManager.getInstance().getHeroLevel(this.hero_type));
        if(coinHaveNum < coinNeedNum){
            this.showGetAssetsUi();
            FollowManager.getInstance().followEvent(Follow_Type.英雄升级缺少金币的次数);
            return;
        }

        let gemHaveNum = PropManager.getInstance().getPropNum(PropId.Gem);
        let gemNeedNum = LevelUpManager.getInstance().getCostGem(HeroManager.getInstance().getHeroLevel(this.hero_type));
        if(gemHaveNum < gemNeedNum){
            FollowManager.getInstance().followEvent(Follow_Type.英雄升级缺少钻石的次数);
            UIManager.getInstance().showUiDialog(UIPath.CoinPop,UILayerLevel.Two,{onCompleted:(uiNode)=> {
                uiNode.getComponent(CoinPop).init({
                    onClose:()=>{
                        this.infoRefresh();
                        if(this.state == State.Level){
                            this.upgradeRefresh();
                        }else{
                            this.upstarRefresh();
                        }
                        // this.upgradeRefresh();
                    }
                })
                uiNode.getComponent(CoinPop).initUi(PropId.Gem);
            },});
            return;
        }

        if(!PropManager.getInstance().changePropNum(PropId.Coin,-coinNeedNum) || !PropManager.getInstance().changePropNum(PropId.Gem,-gemNeedNum)){
            console.log("扣费失败");
        }else{
            let oldCombat = HeroManager.getInstance().getHeroZhanli(this.hero_type);
            let oldData = HeroManager.getInstance().getDeepHeroData(this.hero_type);
            HeroManager.getInstance().addHeroLevel(this.hero_type);
            let newCombat = HeroManager.getInstance().getHeroZhanli(this.hero_type);
            let newData = HeroManager.getInstance().getDeepHeroData(this.hero_type);
            UIManager.getInstance().showCombatChangeEffect(oldCombat,newCombat,oldData,newData);
            TaskManager.getInstance().emitTask(TaskItem.升级1次英雄);
            GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_Level);
            this.infoRefresh();
            this.upgradeRefresh();
            // UIManager.getInstance().showShengJi0(this.node.getChildByName("bottom").getChildByName("effect1"),cc.v2(0,0));
            // UIManager.getInstance().showShengJi1(this.node.getChildByName("bottom").getChildByName("effect2"),cc.v2(0,0));
            let bottom = this.node.getChildByName("bottom");
            UIManager.getInstance().showEffectDialog(EffectPath.HeroUpgrade0,bottom.getChildByName("effect1"),"LevelUp_Back");
            UIManager.getInstance().showEffectDialog(EffectPath.HeroUpgrade0,bottom.getChildByName("effect2"),"LevelUp_Front");
            // bottom.getChildByName("role_upgrade_0").getComponent(cc.Animation).play();
            // bottom.getChildByName("role_upgrade_1").getComponent(cc.Animation).play();
            FollowManager.getInstance().followEvent(Follow_Type.不同英雄的升级次数+this.hero_type);
        }
    }
    // 升阶按钮
    onUpStageBtnClick(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        let haveNum = PropManager.getInstance().getPropNum(HeroBaseInfoManager.getInstance().getHeroFragment(this.hero_type));
        let needNum = HeroQualityManager.getInstance().getCostDebrisByHeroQualityAndStage(HeroBaseInfoManager.getInstance().getQuality(this.hero_type),HeroManager.getInstance().getHeroStage(this.hero_type));
        if(haveNum < needNum){
            // this.showGetAssetsUi();
            FollowManager.getInstance().followEvent(Follow_Type.英雄升星缺少碎片的次数);
            FollowManager.getInstance().followEvent(Follow_Type.不同英雄升星是缺少碎片的次数+this.hero_type);
            UIManager.getInstance().showUiDialog(UIPath.GetAssetsTip,UILayerLevel.Two,{onCompleted:(uiNode)=>{
                uiNode.getComponent(GetAssetsUi).initData(GetAssetsType.Hero);
            }});
            return;
        }
        if(!PropManager.getInstance().changePropNum(HeroBaseInfoManager.getInstance().getHeroFragment(this.hero_type),-needNum)){
            console.log("扣费失败");
        }else{
            let oldCombat = HeroManager.getInstance().getHeroZhanli(this.hero_type);
            let oldData = HeroManager.getInstance().getDeepHeroData(this.hero_type);

            HeroManager.getInstance().addHeroStage(this.hero_type);

            let newCombat = HeroManager.getInstance().getHeroZhanli(this.hero_type);
            let newData = HeroManager.getInstance().getDeepHeroData(this.hero_type);
            UIManager.getInstance().showCombatChangeEffect(oldCombat,newCombat,oldData,newData);
            TaskManager.getInstance().emitTask(TaskItem.升星1次英雄);
            FollowManager.getInstance().followEvent(Follow_Type.不同英雄的升星次数+this.hero_type);
            GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_Advanced);
            if(HeroManager.getInstance().getHeroStage(this.hero_type) % 6 == 0){
                this.showUpStarTip();
            }else{
                let stage = HeroManager.getInstance().getHeroStage(this.hero_type) % 6;
                this.node.getChildByName("bottom").getChildByName("star").getChildByName("starEffect").getComponent(sp.Skeleton).animation = "ShengXing" + stage;
            }
            this.infoRefresh();
            this.upstarRefresh();
        }
    }
    // 万能钥匙按钮
    onMasterKeyBtnClick(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        let heroQuality = HeroBaseInfoManager.getInstance().getQuality(this.hero_type);
        let masterKeynum = 0;
        let textId = 0;
        switch(heroQuality){
            case 1:
                // C
                masterKeynum = PropManager.getInstance().getPropNum(PropId.HeroMasterKeyC);
                textId = 120014;
                break;
            case 2:
                // B
                masterKeynum = PropManager.getInstance().getPropNum(PropId.HeroMasterKeyB);
                textId = 120015;
                break;
            case 3:
                // A
                masterKeynum = PropManager.getInstance().getPropNum(PropId.HeroMasterKeyA);
                textId = 120016;
                break;
            case 4:
                // S
                masterKeynum = PropManager.getInstance().getPropNum(PropId.HeroMasterKeyS);
                textId = 120017;
                break;
            case 5:
                // SS
                masterKeynum = PropManager.getInstance().getPropNum(PropId.HeroMasterKeySS);
                textId = 120018;
                break;
            case 6:
                // SSS
                masterKeynum = PropManager.getInstance().getPropNum(PropId.HeroMasterKeySSS);
                textId = 120019;
                break;
        }
        if(masterKeynum < 1){
            GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(textId));
            return;
        }
        this.showExchangeUi();
    }

     // 预览万能钥匙按钮
     onPreviewMasterKeyBtnClick(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        let heroQuality = HeroBaseInfoManager.getInstance().getQuality(this.hero_type);
        let masterKeynum = 0;
        let textId = 0;
        switch(heroQuality){
            case 1:
                // C
                masterKeynum = PropManager.getInstance().getPropNum(PropId.HeroMasterKeyC);
                textId = 120014;
                break;
            case 2:
                // B
                masterKeynum = PropManager.getInstance().getPropNum(PropId.HeroMasterKeyB);
                textId = 120015;
                break;
            case 3:
                // A
                masterKeynum = PropManager.getInstance().getPropNum(PropId.HeroMasterKeyA);
                textId = 120016;
                break;
            case 4:
                // S
                masterKeynum = PropManager.getInstance().getPropNum(PropId.HeroMasterKeyS);
                textId = 120017;
                break;
            case 5:
                // SS
                masterKeynum = PropManager.getInstance().getPropNum(PropId.HeroMasterKeySS);
                textId = 120018;
                break;
            case 6:
                // SSS
                masterKeynum = PropManager.getInstance().getPropNum(PropId.HeroMasterKeySSS);
                textId = 120019;
                break;
        }
        if(masterKeynum < 1){
            GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(textId));
            return;
        }
        this.showPreviewExchangeUi();
    }
    // 解锁按钮
    onUnlockBtnClick(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        let haveNum = PropManager.getInstance().getPropNum(HeroBaseInfoManager.getInstance().getHeroFragment(this.hero_type));
        let needNum = HeroBaseInfoManager.getInstance().getUnlockFragmentNum(this.hero_type);
        if(haveNum < needNum){
            // this.showGetAssetsUi();
            UIManager.getInstance().showUiDialog(UIPath.GetAssetsTip,UILayerLevel.Two,{onCompleted:(uiNode)=>{
                uiNode.getComponent(GetAssetsUi).initData(GetAssetsType.Hero);
            }});
            return;
        }
        this.state = State.Level;
        PropManager.getInstance().changePropNum(HeroBaseInfoManager.getInstance().getHeroFragment(this.hero_type),-needNum);
        HeroManager.getInstance().addHero(this.hero_type);
        this.infoRefresh();
        this.upgradeRefresh();
        UIManager.getInstance().showUiDialog(UIPath.StoreHeroShowUi,UILayerLevel.Two,{onCompleted:(uiNode)=>{
            uiNode.getComponent(StoreHeroShowUi).initData(this.hero_type);
        }}); 
    }
    // 碎片转化按钮
    onExChangeBtnClick(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        this.node.getChildByName("exchange").active = false;
        let exchange = this.node.getChildByName("exchange");
        let heroQuality = HeroBaseInfoManager.getInstance().getQuality(this.hero_type);
        let masterKeynum = 0;
        let keyId = 0;
        switch(heroQuality){
            case 1:
                // C
                masterKeynum = PropManager.getInstance().getPropNum(PropId.HeroMasterKeyC);
                keyId = PropId.HeroMasterKeyC
                break;
            case 2:
                // B
                masterKeynum = PropManager.getInstance().getPropNum(PropId.HeroMasterKeyB);
                keyId = PropId.HeroMasterKeyB
                break;
            case 3:
                // A
                masterKeynum = PropManager.getInstance().getPropNum(PropId.HeroMasterKeyA);
                keyId = PropId.HeroMasterKeyA
                break;
            case 4:
                // S
                masterKeynum = PropManager.getInstance().getPropNum(PropId.HeroMasterKeyS);
                keyId = PropId.HeroMasterKeyS
                break;
            case 5:
                // SS
                masterKeynum = PropManager.getInstance().getPropNum(PropId.HeroMasterKeySS);
                keyId = PropId.HeroMasterKeySS
                break;
            case 6:
                // SSS
                masterKeynum = PropManager.getInstance().getPropNum(PropId.HeroMasterKeySSS);
                keyId = PropId.HeroMasterKeySSS
                break;
        }
        let num = Number((exchange.getChildByName("slider").getComponent(cc.ProgressBar).progress * masterKeynum).toFixed());
        if(num == 0) return;
        PropManager.getInstance().changePropNum(keyId,-num);
        PropManager.getInstance().changePropNum(HeroBaseInfoManager.getInstance().getHeroFragment(this.hero_type),num);
        FollowManager.getInstance().addTotal(Follow_Type.不同英雄通过万能碎片转换获得的碎片总数 + this.hero_type,num);
        let item = PropManager.getInstance().createPropItem(HeroBaseInfoManager.getInstance().getHeroFragment(this.hero_type),num);
        GameManager.getInstance().showGetTip(item);
        FollowManager.getInstance().followEvent(Follow_Type.万能碎片转化不同英雄次数 + this.hero_type);
        this.upstarRefresh(false);
    }
    // 预览碎片转换按钮
    onPreviewExChangeBtnClick(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        this.node.getChildByName("previewExchange").active = false;
        let exchange = this.node.getChildByName("previewExchange");
        let heroQuality = HeroBaseInfoManager.getInstance().getQuality(this.hero_type);
        let masterKeynum = 0;
        let keyId = 0;
        switch(heroQuality){
            case 1:
                // C
                masterKeynum = PropManager.getInstance().getPropNum(PropId.HeroMasterKeyC);
                keyId = PropId.HeroMasterKeyC
                break;
            case 2:
                // B
                masterKeynum = PropManager.getInstance().getPropNum(PropId.HeroMasterKeyB);
                keyId = PropId.HeroMasterKeyB
                break;
            case 3:
                // A
                masterKeynum = PropManager.getInstance().getPropNum(PropId.HeroMasterKeyA);
                keyId = PropId.HeroMasterKeyA
                break;
            case 4:
                // S
                masterKeynum = PropManager.getInstance().getPropNum(PropId.HeroMasterKeyS);
                keyId = PropId.HeroMasterKeyS
                break;
            case 5:
                // SS
                masterKeynum = PropManager.getInstance().getPropNum(PropId.HeroMasterKeySS);
                keyId = PropId.HeroMasterKeySS
                break;
            case 6:
                // SSS
                masterKeynum = PropManager.getInstance().getPropNum(PropId.HeroMasterKeySSS);
                keyId = PropId.HeroMasterKeySSS
                break;
        }
        let num = Number((exchange.getChildByName("slider").getComponent(cc.ProgressBar).progress * masterKeynum).toFixed());
        if(num == 0) return;
        PropManager.getInstance().changePropNum(keyId,-num);
        PropManager.getInstance().changePropNum(HeroBaseInfoManager.getInstance().getHeroFragment(this.hero_type),num);
        let item = PropManager.getInstance().createPropItem(HeroBaseInfoManager.getInstance().getHeroFragment(this.hero_type),num);
        FollowManager.getInstance().addTotal(Follow_Type.不同英雄通过万能碎片转换获得的碎片总数 + this.hero_type,num);
        GameManager.getInstance().showGetTip(item);
        FollowManager.getInstance().followEvent(Follow_Type.万能碎片转化不同英雄次数 + this.hero_type);
        this.previewRefresh();
    }
    // 增加转换碎片按钮
    onChangeExchangeBtnClick(e,num:number){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        num = Number(num);
        let exchange = this.node.getChildByName("exchange");
        let heroQuality = HeroBaseInfoManager.getInstance().getQuality(this.hero_type);
        let masterKeynum = 0;
        switch(heroQuality){
            case 1:
                // C
                masterKeynum = PropManager.getInstance().getPropNum(PropId.HeroMasterKeyC);
                break;
            case 2:
                // B
                masterKeynum = PropManager.getInstance().getPropNum(PropId.HeroMasterKeyB);
                break;
            case 3:
                // A
                masterKeynum = PropManager.getInstance().getPropNum(PropId.HeroMasterKeyA);
                break;
            case 4:
                // S
                masterKeynum = PropManager.getInstance().getPropNum(PropId.HeroMasterKeyS);
                break;
            case 5:
                // SS
                masterKeynum = PropManager.getInstance().getPropNum(PropId.HeroMasterKeySS);
                break;
            case 6:
                // SSS
                masterKeynum = PropManager.getInstance().getPropNum(PropId.HeroMasterKeySSS);
                break;
        }
        let slider = exchange.getChildByName("slider").getComponent(cc.Slider);
        slider.progress =  ((slider.progress * masterKeynum) + (1 * num))/masterKeynum;
        if(slider.progress > 1) slider.progress = 1;
        if(slider.progress < 0) slider.progress = 0;
        exchange.getChildByName("slider").getComponent(cc.ProgressBar).progress = slider.progress;
        exchange.getChildByName("num").getComponent(cc.Label).string = (slider.progress * masterKeynum).toFixed() + '/' + masterKeynum;
    }
    onPreviewChangeExchangeBtnClick(e,num:number){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        num = Number(num);
        let exchange = this.node.getChildByName("previewExchange");
        let heroQuality = HeroBaseInfoManager.getInstance().getQuality(this.hero_type);
        let masterKeynum = 0;
        switch(heroQuality){
            case 1:
                // C
                masterKeynum = PropManager.getInstance().getPropNum(PropId.HeroMasterKeyC);
                break;
            case 2:
                // B
                masterKeynum = PropManager.getInstance().getPropNum(PropId.HeroMasterKeyB);
                break;
            case 3:
                // A
                masterKeynum = PropManager.getInstance().getPropNum(PropId.HeroMasterKeyA);
                break;
            case 4:
                // S
                masterKeynum = PropManager.getInstance().getPropNum(PropId.HeroMasterKeyS);
                break;
            case 5:
                // SS
                masterKeynum = PropManager.getInstance().getPropNum(PropId.HeroMasterKeySS);
                break;
            case 6:
                // SSS
                masterKeynum = PropManager.getInstance().getPropNum(PropId.HeroMasterKeySSS);
                break;
        }
        let slider = exchange.getChildByName("slider").getComponent(cc.Slider);
        slider.progress =  ((slider.progress * masterKeynum) + (1 * num))/masterKeynum;
        if(slider.progress > 1) slider.progress = 1;
        if(slider.progress < 0) slider.progress = 0;
        exchange.getChildByName("slider").getComponent(cc.ProgressBar).progress = slider.progress;
        exchange.getChildByName("num").getComponent(cc.Label).string = (slider.progress * masterKeynum).toFixed() + '/' + masterKeynum;
    }
    // 关闭碎片转换界面
    onCloseExchangeBtnClick(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        this.node.getChildByName("exchange").active = false;
    }
    // 关闭碎片转换界面
    onClosePreviewExchangeBtnClick(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        this.node.getChildByName("previewExchange").active = false;
    }
    // 前往商店按钮
    // onGoShopBtnClick(){
        // this.node.getChildByName("tip").active = false;
        // GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        // GameManager.getInstance().game_to_home=Go_Type.City;
        // GameManager.getInstance().jumoAndShowUi();
        // UIManager.getInstance().closeAllUiDialog(UILayerLevel.One);
    // }
    onCloseReductionBtnClick(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        this.node.getChildByName("reduction").active = false;
    }
    // 显示还原按钮
    onShowReductionBtnClick(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        let reduction = this.node.getChildByName("reduction")
        let sum = LevelUpManager.getInstance().getNowLevelAllCostCoin(HeroManager.getInstance().getHeroLevel(this.hero_type));
        let itemRoot = reduction.getChildByName("itemRoot");
        itemRoot.children[0].getComponent(Prop).init(PropId.Coin,sum[0],PropAction.Look);
        if(sum[1] == 0){
            itemRoot.children[1].active = false;
        }else{
            itemRoot.children[1].active = true;
            itemRoot.children[1].getComponent(Prop).init(PropId.Gem,sum[1],PropAction.Look);
        }
        reduction.active = true;
        reduction.getChildByName("richText").getComponent(cc.RichText).string = LanguageManager.getInstance().getStrByTextId(100098);
    }
    // 还原按钮
    onReductionBtnClick(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        if(PropManager.getInstance().changePropNum(PropId.Gem,-200)){
            let oldCombat = HeroManager.getInstance().getHeroZhanli(this.hero_type);
            let oldData = HeroManager.getInstance().getDeepHeroData(this.hero_type);

            let sum = LevelUpManager.getInstance().getNowLevelAllCostCoin(HeroManager.getInstance().getHeroLevel(this.hero_type));
            PropManager.getInstance().changePropNum(PropId.Coin,sum[0]);
            PropManager.getInstance().changePropNum(PropId.Gem,sum[1]);
            GameManager.getInstance().showMultipleGetTip([PropManager.getInstance().createPropItem(PropId.Coin,sum[0]),PropManager.getInstance().createPropItem(PropId.Gem,sum[1])]);
            HeroManager.getInstance().resetHeroLvel(this.hero_type);

            let newCombat = HeroManager.getInstance().getHeroZhanli(this.hero_type);
            let newData = HeroManager.getInstance().getDeepHeroData(this.hero_type);
            UIManager.getInstance().showCombatChangeEffect(oldCombat,newCombat,oldData,newData);

            this.node.getChildByName("reduction").active = false;
            this.infoRefresh();
            if(this.state == State.Level){
                this.upgradeRefresh();
            }else{
                this.upstarRefresh();
            }
            FollowManager.getInstance().followEvent(Follow_Type.不同英雄还原的次数 + this.hero_type);
        }else{
            this.node.getChildByName("reduction").active = false;
            // this.onCloseReductionBtnClick();
            // this.showGetAssetsUi();
            UIManager.getInstance().showUiDialog(UIPath.CoinPop,UILayerLevel.Two,{onCompleted:(uiNode)=> {
                uiNode.getComponent(CoinPop).init({
                    onClose:()=>{
                        this.infoRefresh();
                        if(this.state == State.Level){
                            this.upgradeRefresh();
                        }else{
                            this.upstarRefresh();
                        }
                    }
                })
                uiNode.getComponent(CoinPop).initUi(PropId.Gem)
            },});
        }
    }

    onAttributeBtnClick(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        FollowManager.getInstance().followEvent(Follow_Type.查看英雄属性详情);
        // UIManager.getInstance().showAttributeUi(null,this.hero_type);
        UIManager.getInstance().showUiDialog(UIPath.Attribute,UILayerLevel.Two,{onCompleted:(uiNode)=> {
            // uiNode.getComponent(AtrributeUi).init(uiAction);
            uiNode.getComponent(AtrributeUi).init(null);
            uiNode.getComponent(AtrributeUi).initHeroType(this.hero_type);
        },});
    }

    onPreviewAttributeBtnClick(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        FollowManager.getInstance().followEvent(Follow_Type.查看英雄属性详情);
        // UIManager.getInstance().showAttributeUi(null,this.hero_type);
        UIManager.getInstance().showUiDialog(UIPath.Attribute,UILayerLevel.Two,{onCompleted:(uiNode)=> {
            // uiNode.getComponent(AtrributeUi).init(uiAction);
            uiNode.getComponent(AtrributeUi).init(null);
            uiNode.getComponent(AtrributeUi).initPreviewHeroType(this.hero_type,HeroBaseInfoManager.getInstance().getMaxStage(this.hero_type),HeroBaseInfoManager.getInstance().getMaxLevel(this.hero_type));
        },});
    }

    onBtnExclusiveEquipmentClick(){
        // console.log("这个按钮被点击了");
        UIManager.getInstance().showUiDialog(UIPath.ExclusiveInfoUi,UILayerLevel.Two,{
            onCompleted:(uiNode)=>{
                uiNode.getComponent(ExclusiveInfoUi).init({
                    onClose:()=>{
                        this.upgradeRefresh();
                    }
                })
                uiNode.getComponent(ExclusiveInfoUi).initData(this.hero_type);
            }
        });
    }

    onBtnPetClick(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        FollowManager.getInstance().followEvent(Follow_Type.英雄界面宠物栏点击次数);
        FollowManager.getInstance().followEvent(Follow_Type.英雄_灵宠栏点击次数);
        if(HeroManager.getInstance().getWearPet(this.hero_type) == 0){
            UIManager.getInstance().showUiDialog(UIPath.PetList,UILayerLevel.Two,{
                onCompleted:(uiNode)=>{
                    uiNode.getComponent(PetExchangeUi).init({
                        onClose:()=>{
                            this.upgradeRefresh();
                        }
                    })
                    uiNode.getComponent(PetExchangeUi).initData(HeroManager.getInstance().getWearPet(this.hero_type),this.hero_type)
                }
            });
        }else{
            UIManager.getInstance().showUiDialog(UIPath.PetInfo,UILayerLevel.Two,{
                onCompleted:(uiNode)=>{
                    uiNode.getComponent(PetInfoUi).init({
                        onClose:()=>{
                            this.upgradeRefresh();
                        }
                    })
                    uiNode.getComponent(PetInfoUi).initData(this.hero_type);
                }
            });
        }
        // UIManager.getInstance().showPetExchangeUi({onClose:()=>{
        //     // this.initUi();
        // }},HeroManager.getInstance().getHeroData(this.hero_type).pet_info,this.hero_type)
    }

    onBtnExclusiveEquipAddClick(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        // UIManager.getInstance().showExclusiveWeaponsStrengtheningUi({
        //     onClose:()=>{
        //         this.initUi();
        //     }
        // },this.hero_type,true);
        UIManager.getInstance().showUiDialog(UIPath.ExclusiveStrengthening,UILayerLevel.One,{onCompleted:(uiNode)=> {
            uiNode.getComponent(ExclusiveWeaponsStrengtheningUi).init({
                onClose:()=>{
                    // this.initUi();
                }
            });
            uiNode.getComponent(ExclusiveWeaponsStrengtheningUi).initData(this.hero_type,true);
        },})
    }

    onBtnExclusiveEquipStrengtheningUi(){
        // console.log("aaa")
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        // UIManager.getInstance().showExclusiveWeaponsUi({
        //     onClose:()=>{
        //         this.initUi();
        //     }
        // },this.hero_type);
        UIManager.getInstance().showUiDialog(UIPath.Exclusive,UILayerLevel.One,{onCompleted:(uiNode)=> {
            uiNode.getComponent(ExclusiveWeaponsUi).init({
                onClose:()=>{
                    // this.initUi();
                }
            });
            uiNode.getComponent(ExclusiveWeaponsUi).initData(this.hero_type);
        },})
    }

    onClickExclusiveWeapon(){
        if(HeroManager.getInstance().getHeroLevel(this.hero_type) <= 100){
            GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(130005));
        }
    }

    onClickArrowBtn(e,dir:number){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        dir = Number(dir);
        if(this.sqrtList == null){
            let heroType = this.hero_type + dir;
            if(heroType <= Hero_Type.NULL) heroType = Hero_Type.Hero_Num - 1;
            if(heroType >= Hero_Type.Hero_Num) heroType = Hero_Type.NULL + 1;
            this.initData(heroType);
        }else{
            let index = this.sqrtList.indexOf(HeroBaseInfoManager.getInstance().getJsonHeroBaseInfo(this.hero_type));
            index += dir;
            if(index >= this.sqrtList.length) index = 0;
            if(index < 0) index = this.sqrtList.length - 1;
            this.initData(this.sqrtList[index].Hero_ID,this.sqrtList);
        }
        // this.destroySelf();
        // UIManager.getInstance().showUiDialog(UIPath.HeroGrowth,UILayerLevel.One,{onCompleted:(uiNode)=>{
        //     uiNode.getComponent(RoleUi).init({
        //         onClose:()=>{
        //             this.onRefresh();
        //         }
        //     });
        //     uiNode.getComponent(RoleUi).initData(heroType);
        // },});
    }

    getHeroAttributeId(heroType:number,heroLevel:number):number{
        return heroType * 10000 + heroLevel;
    }

    // getHeroQualityTextColor(quality:number):cc.Color{
    //     let color=cc.color();
    //     switch(quality){
    //         case 2:
    //         case 1:{
    //             color=cc.color(113, 229, 132);
    //         }break;
    //         case 3:
    //         case 4:{
    //             color=cc.color(105, 183, 255);
    //         }break;
    //         case 5:
    //         case 6:{
    //             color=cc.color(226, 126, 255);
    //         }break;
    //         case 7:
    //         case 8:{
    //             color=cc.color(255, 193, 74);
    //         }break;
    //         case 9:
    //         case 10:{
    //             color=cc.color(255, 74, 74);
    //         }break;
    //         case 11:
    //         case 12:{
    //             color=cc.color(255, 255, 255);
    //         }break;
    //     }
    //     return color;
    // }

    clickBtnClose()
    {
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        this.destroySelf();
        HeroManager.getInstance().reportHeroList();
        PropManager.getInstance().saveAllPropNum(true);
        cc.find("Canvas").getComponent(Home).refreshTop();
    }

    destroySelf()
    {
        super.onClose();
        ApkManager.getInstance().closeBanner();
        EventManager.postRedEvent(RedEventString.RED_CHECK,HeroManager.getRedTypeByHeroType(this.hero_type));
    }

}