
import { Hero_Type } from "../../Hero/Game/HeroConfig";
import LanguageManager from "../../multiLanguage/LanguageManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SkillInfoUi extends cc.Component {

    @property([cc.SpriteFrame])
    sp_avatar:cc.SpriteFrame[]=[];
    
    start () {
        this.node.on(cc.Node.EventType.TOUCH_START,this.onTouchStart,this);
    }

    init(heroType:Hero_Type)
    {
        let lm=LanguageManager.getInstance();
        let lanType=lm.getCurLanguageType();
        let textRoot=this.node.getChildByName('textRoot');
        
        let avaIcon=textRoot.getChildByName('avaIcon');
        avaIcon.getComponent(cc.Sprite).spriteFrame=this.sp_avatar[heroType];
        let name=avaIcon.getChildByName('name');
        //name.getComponent(cc.Label).string=HerosDetails.getHeroName(heroType,lanType);
             
        let skillName=textRoot.getChildByName('skillName');
        //skillName.getComponent(cc.Label).string=lm.getString(LanguageIndex.Active_Skill)+':'+HerosDetails.getSkillName(heroType,lanType);

        let skillDes=textRoot.getChildByName('skillDes');
        //skillDes.getComponent(cc.Label).string=HerosDetails.getHeroSkillDetail(heroType,lanType);
        //        

    }

    onTouchStart()
    {
        this.node.removeFromParent();
    }

    onDestroy(){
        this.node.off(cc.Node.EventType.TOUCH_START,this.onTouchStart,this);
    }
    // update (dt) {}
}
