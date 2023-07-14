import SkillManager from "../../Game/SkillManager";
import { HeroManager } from "../Data/HeroManager";
import { Hero_Type } from "./HeroConfig";



const {ccclass, property} = cc._decorator;

@ccclass
export default class MpProgress extends cc.Component {

    @property([cc.SpriteFrame])
    sp_icon_bg:cc.SpriteFrame[]=[];

    @property(cc.Prefab)
    prefab_bg:cc.Prefab=null;

    ok_node:cc.Node=null;
    left:cc.Sprite=null;
    right:cc.Sprite=null;
    is_cding:boolean=false;
    icon:cc.Sprite=null;
    icon_bg:cc.Sprite=null;
    /**禁止图标 */
    disable:cc.Node=null;
    is_disable:boolean=false;
    /**材质 */
    materials:cc.Material[]=[];
    

    init(heroId:Hero_Type)
    {
        this.ok_node=this.node.getChildByName('ok');
        this.left=this.node.getChildByName('left').getComponent(cc.Sprite);
        this.right=this.node.getChildByName('right').getComponent(cc.Sprite);
        let iconBg=cc.instantiate(this.prefab_bg);
        iconBg.x=this.node.x;
        iconBg.y=this.node.y-36;
        SkillManager.getInstance().node.getChildByName('skill_icon').addChild(iconBg);
        this.icon_bg=iconBg.getComponent(cc.Sprite);
        //icon
        this.icon=iconBg.getChildByName('mask').getChildByName('icon').getComponent(cc.Sprite);
        this.icon.spriteFrame=HeroManager.getInstance().getSpriteFrameByNames('Hero_'+heroId+'_Skill_0');
        this.disable=this.icon.node.parent.getChildByName('disable');
        this.disable.active=false;
        this.setNormalSP();
        this.materials.push(cc.Material.getBuiltinMaterial('2d-gray-sprite'))
        this.materials.push(cc.Material.getBuiltinMaterial('2d-sprite'))
        //this.prefab_bg=null;
    }

    // showLight(){
        
    // }
    
    setCDSP()
    {
        this.ok_node.active=false;
        this.is_cding=true;
        this.icon.setMaterial(0,this.materials[0]);
        this.icon_bg.spriteFrame=this.sp_icon_bg[0];
    }

    setNormalSP()
    {
        this.ok_node.active=true;
        this.is_cding=false;
        if(this.is_disable==false){
            this.icon.setMaterial(0,this.materials[1]);
            this.icon_bg.spriteFrame=this.sp_icon_bg[1];
        }        
    }

    setDisable(isDisable:boolean){
        this.disable.active=isDisable;
        this.is_disable=isDisable;
        if(isDisable){
            this.icon.setMaterial(0,this.materials[0]);
            this.icon_bg.spriteFrame=this.sp_icon_bg[0];
        }else{
            if(this.is_cding==false){
                this.icon.setMaterial(0,this.materials[1]);
                this.icon_bg.spriteFrame=this.sp_icon_bg[1];
            }            
        }
    }

    setProgress(progress:number)
    {
        this.left.fillRange=progress/2;
        this.right.fillRange=progress/2;
    }

    show(){
        this.icon_bg.node.active=true;
        this.node.opacity=255;
    }

    hide(){
        this.icon_bg.node.active=false;
        this.node.opacity=0;
    }

}
