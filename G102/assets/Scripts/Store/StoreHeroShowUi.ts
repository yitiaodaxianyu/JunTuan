import GameManager from "../GameManager";
import { HeroBaseInfoManager } from "../Hero/Data/HeroBaseInfo";
import { HeroManager } from "../Hero/Data/HeroManager";
import { SkillLevelUnlockManager } from "../Hero/Data/SkillLevelUnlock";
import { Hero_Type } from "../Hero/Game/HeroConfig";
import HeroSkillUi from "../Hero/Ui/HeroSkillUi";
import { LevelManager } from "../Level/LevelManager";
import LanguageManager from "../multiLanguage/LanguageManager";
import { SoundIndex } from "../Sound/AudioConstants";
import { StorageKey } from "../Storage/StorageConfig";
import { TheStorageManager } from "../Storage/StorageManager";
import TutorailsManager from "../Tutorials/TutorailsManager";
import UIComponent from "../UI/UIComponent";
import { UIPath, UILayerLevel } from "../UI/UIConfig";
import { UiAction } from "../UI/UiInterface";
import { UIManager } from "../UI/UIManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class StoreHeroShowUi extends UIComponent {

    hero_type:Hero_Type = null;

    @property({type:[sp.SkeletonData]})
    hero_skeleton_data:sp.SkeletonData[]=[];

    @property(cc.SpriteAtlas)
    role_ui : cc.SpriteAtlas = null;

    init(uiAc: UiAction): void {
        super.init(uiAc);
        let bbg=this.node.getChildByName('bbg');
        bbg.on(cc.Node.EventType.TOUCH_START,()=>{
            if(TutorailsManager.getInstance().is_tutorails_state==true&&LevelManager.getInstance().finish_level<=3&&this.hero_type==Hero_Type.DeLuYi){
                UIManager.getInstance().closeAllUiDialog(UILayerLevel.One);
            }else{
                super.onClose();
            }
            
        },this);
    }

    initData(heroType:Hero_Type,isRecord:boolean=true){
        this.hero_type = heroType;
        if(isRecord)
        TheStorageManager.getInstance().setItem(StorageKey.StoreHeroID + heroType % 110000,"1");
        this.refreshUi();
    }

    refreshUi(){
        this.node.getChildByName("name").getComponent(cc.Label).string = LanguageManager.getInstance().getStrByTextId(HeroBaseInfoManager.getInstance().getNameText_ID(this.hero_type));
        this.node.getChildByName("position").getComponent(cc.Label).string = LanguageManager.getInstance().getStrByTextId(HeroBaseInfoManager.getInstance().getHeroPositioning(this.hero_type));
        this.node.getChildByName("quality").getComponent(cc.Sprite).spriteFrame = HeroManager.getInstance().getSpriteFrameByNames("Hero_Title_" + HeroBaseInfoManager.getInstance().getQuality(this.hero_type) + "_0")
        this.node.getChildByName("nameBg").getComponent(cc.Sprite).spriteFrame = HeroManager.getInstance().getSpriteFrameByNames("Hero_Title_" + HeroBaseInfoManager.getInstance().getQuality(this.hero_type) + "_1")
        let heroSp = this.node.getChildByName("heroSp").getComponent(sp.Skeleton)

        let skillRoot = this.node.getChildByName("skillRoot");
        let skillNum = HeroBaseInfoManager.getInstance().getSkillNum(this.hero_type);
        for(let i = 1;i <= 4;i++){
            if(i>skillNum){
                skillRoot.getChildByName("btnSkill" + i).active = false;
            }else{
                // let skill = skillRoot.getChildByName("btnSkill" + i);
                // skill.getComponent(cc.Sprite).spriteFrame = this.role_ui.getSpriteFrame("Hero_"+ this.hero_type +"_Skill_" + (i-1));
                // skill.active = true;
                // skill.children[0].getComponentInChildren(cc.Label).string = "1";
                let skill = skillRoot.getChildByName("btnSkill" + i);
                skill.active = true;
                let unlockLevel =  SkillLevelUnlockManager.getInstance().getHeroLevel(i)
                if(HeroManager.getInstance().getHeroLevel(this.hero_type) < unlockLevel){
                    skill.getComponent(cc.Sprite).spriteFrame = this.role_ui.getSpriteFrame("Hero_"+ this.hero_type +"_Skill_" + (i-1));
                    skill.getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
                    skill.children[0].active = false;
                }else{
                    skill.getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
                    skill.getComponent(cc.Sprite).spriteFrame = this.role_ui.getSpriteFrame("Hero_"+ this.hero_type +"_Skill_" + (i-1));
                    skill.children[0].active = true;
                    skill.children[0].getComponentInChildren(cc.Label).string = '1';
                }
            }
        }

        heroSp.skeletonData = this.hero_skeleton_data[this.hero_type-1];
        heroSp.setAnimation(0,"Attack",true);
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

    onSkillClick(e,skillSlot:number){
        // GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        UIManager.getInstance().showUiDialog(UIPath.HeroSkill,UILayerLevel.Four,{onCompleted:(uiNode)=> {
            uiNode.getComponent(HeroSkillUi).init(null);
            uiNode.getComponent(HeroSkillUi).initData(this.hero_type,skillSlot);
        },});
    }
    
}
