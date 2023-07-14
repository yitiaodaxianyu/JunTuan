import SkillManager from "../../Game/SkillManager";
import { SkillTipType } from "./HeroConfig";


const {ccclass, property} = cc._decorator;

@ccclass
export default class SkillTip extends cc.Component {

    @property([cc.SpriteFrame])
    sp_tip:cc.SpriteFrame[]=[];

    @property({type:cc.Enum(SkillTipType)})
    skill_tip_type:SkillTipType=SkillTipType.Full;

    self_sp:cc.Sprite=null;

    onLoad(){
        this.self_sp=this.node.getComponent(cc.Sprite);
    }

    setIsCanRelease(isCan:boolean){
        if(this.self_sp){
            this.self_sp.spriteFrame=this.sp_tip[isCan?1:0];
        }        
        SkillManager.getInstance().setSkillRange(isCan);
    }

    getSkillTipType():SkillTipType{
        return this.skill_tip_type;
    }

}
