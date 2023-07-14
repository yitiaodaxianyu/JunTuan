
import { GameEffectId, GameEffectsManager } from "../Game/GameEffectsManager";
import GameManager from "../GameManager";
import LabelLanguage from "../multiLanguage/LabelLanguage";
import { Enemy_Injured_Type } from "../Enemy/EnemyConfig";

const {ccclass, property} = cc._decorator;
//负责子弹的生成-销毁
@ccclass
export default class HpTextHpManager extends cc.Component  {
    
    @property([cc.SpriteFrame])
    sp_type:cc.SpriteFrame[]=[];

    @property(cc.Node)
    img_text_parent:cc.Node=null;

    onLoad () {
        GameManager.getInstance().hp_text_manager=this;
        for(let i=GameEffectId.front_normal_attack_text_1; i<=GameEffectId.front_crit_text; i++){
            GameEffectsManager.getInstance().addEffectPoolById(i,8);
        } 
    }
    onDestroy()
    {
        GameManager.getInstance().hp_text_manager=null;
    }
    createHpTextHp(pos:cc.Vec2,damage:number,type:Enemy_Injured_Type)
    {
        switch(type)
        {
            case Enemy_Injured_Type.Normal_Attack:{
                //根据伤害值获得文本类型id
                let effectId=GameManager.getInstance().getDamageTextEffect(damage);
                let scaleValue=GameManager.getInstance().getDamageTextScale(damage);
                let node=GameEffectsManager.getInstance().createGameEffectForParent(effectId,pos,this.node);
                node.scale=scaleValue;
                node.opacity=255;
                node.color=cc.Color.WHITE;
                node.getComponent(cc.Label).string=damage.toFixed(0);
                cc.tween(node).to(0.1,{scale:scaleValue*1.2}).to(0.06,{scale:scaleValue}).by(0.96,{y:85,opacity:-168},{ easing: 'sineIn'}).call(()=>{
                    GameEffectsManager.getInstance().destroyGameEffectById(effectId,node);
                },this).start();
            }break;
            case Enemy_Injured_Type.BaoJi:{
                let effectId=GameEffectId.front_crit_text;
                let scaleValue=1.4;
                let node=GameEffectsManager.getInstance().createGameEffectForParent(effectId,pos,this.node);
                node.scale=scaleValue;
                node.opacity=255;
                node.color=cc.Color.WHITE;
                node.getComponent(cc.Label).string='@'+damage.toFixed(0);
                cc.tween(node).to(0.1,{scale:scaleValue*1.25}).to(0.06,{scale:scaleValue}).delay(0.3).by(0.5,{y:25,opacity:-168},{ easing: 'sineIn'}).call(()=>{
                    GameEffectsManager.getInstance().destroyGameEffectById(effectId,node);
                },this).start();
            }break;
            case Enemy_Injured_Type.LiuXue:{
                let effectId=GameEffectId.front_normal_attack_text_1;
                let scaleValue=1.0;
                let node=GameEffectsManager.getInstance().createGameEffectForParent(effectId,pos,this.node);      
                node.scale=scaleValue;
                node.opacity=255;
                node.color=cc.Color.WHITE;
                node.getComponent(cc.Label).string=damage.toFixed(0);
                cc.tween(node).to(0.1,{scale:scaleValue*1.2}).to(0.06,{scale:scaleValue}).by(0.5,{opacity:-168},{ easing: 'sineIn'}).call(()=>{
                    GameEffectsManager.getInstance().destroyGameEffectById(effectId,node);
                },this).start();
            }break;
            case Enemy_Injured_Type.ZhongDu:{
                let effectId=GameEffectId.front_normal_attack_text_1;
                let scaleValue=1.0;
                let node=GameEffectsManager.getInstance().createGameEffectForParent(effectId,pos,this.node);    
                node.scale=scaleValue;
                node.opacity=255;
                node.color=cc.Color.MAGENTA;
                node.getComponent(cc.Label).string=damage.toFixed(0);
                cc.tween(node).to(0.1,{scale:scaleValue*1.2}).to(0.06,{scale:scaleValue}).by(0.5,{opacity:-168},{ easing: 'sineIn'}).call(()=>{
                    GameEffectsManager.getInstance().destroyGameEffectById(effectId,node);
                },this).start();
            }break;
            case Enemy_Injured_Type.ZhuoShao:{
                let effectId=GameEffectId.front_normal_attack_text_1;
                let scaleValue=1.0;
                let node=GameEffectsManager.getInstance().createGameEffectForParent(effectId,pos,this.node);   
                node.scale=scaleValue;
                node.opacity=255;
                node.color=cc.Color.WHITE;
                node.getComponent(cc.Label).string=damage.toFixed(0);  
                cc.tween(node).to(0.1,{scale:scaleValue*1.2}).to(0.06,{scale:scaleValue}).by(0.5,{opacity:-168},{ easing: 'sineIn'}).call(()=>{
                    GameEffectsManager.getInstance().destroyGameEffectById(effectId,node);
                },this).start();
            }break;
            case Enemy_Injured_Type.ZhiLiao:{
                let effectId=GameEffectId.front_restore_text;
                let scaleValue=1.2;
                let node=GameEffectsManager.getInstance().createGameEffectForParent(effectId,pos,this.node);
                node.color=cc.Color.GREEN;
                node.scale=scaleValue;
                node.opacity=255;
                node.getComponent(cc.Label).string='@'+damage.toFixed(0);
                cc.tween(node).to(0.1,{scale:scaleValue*1.2}).to(0.06,{scale:scaleValue}).by(0.96,{y:85,opacity:-168},{ easing: 'sineIn'}).call(()=>{
                    GameEffectsManager.getInstance().destroyGameEffectById(effectId,node);
                },this).start();
            }break;
            case Enemy_Injured_Type.BingNvZhenShang:{
                let effectId=GameEffectId.front_normal_attack_text_1;
                let scaleValue=1.0;
                let node=GameEffectsManager.getInstance().createGameEffectForParent(effectId,pos,this.node);
                node.color=cc.Color.CYAN;
                node.scale=scaleValue;
                node.opacity=255;
                node.getComponent(cc.Label).string=damage.toFixed(0);
                cc.tween(node).to(0.1,{scale:scaleValue*1.2}).to(0.06,{scale:scaleValue}).by(0.96,{y:85,opacity:-168},{ easing: 'sineIn'}).call(()=>{
                    GameEffectsManager.getInstance().destroyGameEffectById(effectId,node);
                },this).start();
            }break;
            case Enemy_Injured_Type.ANuBiSiZhenShang:{
                let effectId=GameEffectId.front_normal_attack_text_1;
                let scaleValue=1.0;
                let node=GameEffectsManager.getInstance().createGameEffectForParent(effectId,pos,this.node);
                node.color=cc.Color.ORANGE;
                node.scale=scaleValue;
                node.opacity=255;
                node.getComponent(cc.Label).string=damage.toFixed(0);
                cc.tween(node).to(0.1,{scale:scaleValue*1.2}).to(0.06,{scale:scaleValue}).by(0.96,{y:85,opacity:-168},{ easing: 'sineIn'}).call(()=>{
                    GameEffectsManager.getInstance().destroyGameEffectById(effectId,node);
                },this).start();
            }break;
            case Enemy_Injured_Type.BaoTou:{
                let effectId=GameEffectId.front_crit_text;
                let scaleValue=1.4;
                let node=GameEffectsManager.getInstance().createGameEffectForParent(effectId,pos,this.node);
                node.scale=scaleValue;
                node.opacity=255;
                node.color=cc.Color.WHITE;
                node.getComponent(cc.Label).string='@'+damage.toFixed(0);
                cc.tween(node).to(0.1,{scale:scaleValue*1.25}).to(0.06,{scale:scaleValue}).delay(0.3).by(0.5,{y:25,opacity:-168},{ easing: 'sineIn'}).call(()=>{
                    GameEffectsManager.getInstance().destroyGameEffectById(effectId,node);
                },this).start();
                //this.createTypeText(pos.add(cc.v2(0,30)),type,spawn);
            }break;
            case Enemy_Injured_Type.ChaoJiBaoTou:{
                let effectId=GameEffectId.front_crit_text;
                let scaleValue=1.6;
                let node=GameEffectsManager.getInstance().createGameEffectForParent(effectId,pos,this.node);
                node.scale=scaleValue;
                node.opacity=255;
                node.color=cc.Color.WHITE;
                node.getComponent(cc.Label).string='@'+damage.toFixed(0);
                cc.tween(node).to(0.1,{scale:scaleValue*1.25}).to(0.06,{scale:scaleValue}).delay(0.3).by(0.5,{y:25,opacity:-168},{ easing: 'sineIn'}).call(()=>{
                    GameEffectsManager.getInstance().destroyGameEffectById(effectId,node);
                },this).start();
            }break;
            // case Enemy_Injured_Type.ShanBi:{
            //     this.createTypeText(pos,type)
            // }break;
            default:{
                //根据伤害值获得文本类型id
                let effectId=GameManager.getInstance().getDamageTextEffect(damage);
                let scaleValue=GameManager.getInstance().getDamageTextScale(damage);
                let node=GameEffectsManager.getInstance().createGameEffectForParent(effectId,pos,this.node);
                node.scale=scaleValue;
                node.opacity=255;
                node.color=cc.Color.WHITE;
                node.getComponent(cc.Label).string=damage.toFixed(0);
                cc.tween(node).to(0.1,{scale:scaleValue*1.2}).to(0.06,{scale:scaleValue}).by(0.96,{y:85,opacity:-168},{ easing: 'sineIn'}).call(()=>{
                    GameEffectsManager.getInstance().destroyGameEffectById(effectId,node);
                },this).start();
            }break;
        }
    }

    getTextColorByType(type:Enemy_Injured_Type):cc.Color
    {
        let color=cc.Color.WHITE
        switch(type)
        {
            case Enemy_Injured_Type.Normal_Attack: color=cc.Color.WHITE;break;
            case Enemy_Injured_Type.ZhongDu: color=cc.Color.GREEN;break;
        }
        return color;
    }
    //使用图片
    createTypeText(pos:cc.Vec2,text:Enemy_Injured_Type,spawn:cc.FiniteTimeAction)
    {        
        let node=new cc.Node();
        this.img_text_parent.addChild(node);
        let sp=node.addComponent(cc.Sprite);
        node.setPosition(pos);
        if(typeof text=="string")
        {
            node.getComponent(LabelLanguage).string=text;
        }else
        {
            let xx=Math.random()*50+30;
            xx*=Math.random()<0.5?1:-1;
            let yy=Math.random()*50+30;
            let height=Math.random()*50+30;
            switch(text)
            {               
                case Enemy_Injured_Type.BaoJi:{
                    //node.color=cc.Color.RED;
                    sp.spriteFrame=this.sp_type[1];
                    if(spawn==null)
                    spawn=cc.spawn(cc.jumpBy(0.5,xx,yy,height,1),cc.fadeTo(0.5,255));
                }break;
                case Enemy_Injured_Type.WuDi:{
                    sp.spriteFrame=this.sp_type[2];
                    if(spawn==null)
                    spawn=cc.spawn(cc.jumpBy(0.5,xx,yy,height,1),cc.fadeTo(0.5,255));
                }break;
                case Enemy_Injured_Type.GeDang:{
                    sp.spriteFrame=this.sp_type[0];
                    if(spawn==null)
                    spawn=cc.spawn(cc.jumpBy(0.5,xx,yy,height,1),cc.fadeTo(0.5,255));
                }break;
                case Enemy_Injured_Type.ShanBi:{
                    sp.spriteFrame=this.sp_type[3];                    
                    if(spawn==null)
                    spawn=cc.spawn(cc.jumpBy(0.5,xx,yy,height,1),cc.fadeTo(0.5,255));
                }break;
                case Enemy_Injured_Type.BaoTou:{
                    sp.spriteFrame=this.sp_type[4];                    
                    if(spawn==null)
                    spawn=cc.spawn(cc.jumpBy(0.5,xx,yy,height,1),cc.fadeTo(0.5,255));
                }break;
                case Enemy_Injured_Type.ChaoJiBaoTou:{
                    sp.spriteFrame=this.sp_type[5];                    
                    if(spawn==null)
                    spawn=cc.spawn(cc.jumpBy(0.5,xx,yy,height,1),cc.fadeTo(0.5,255));
                }break;
                case Enemy_Injured_Type.MianYiKongZhi:{
                    sp.spriteFrame=this.sp_type[6];                    
                    if(spawn==null)
                    spawn=cc.spawn(cc.jumpBy(0.5,xx,yy,height,1),cc.fadeTo(0.5,255));
                }break;
            }            
        }
        if(spawn)
        cc.tween(node).then(spawn).delay(0.2).to(0.2,{opacity:0}).removeSelf().start();
    }

    destroyHpTextHp(type:number,node:cc.Node)
    {
        node.scale=1;
        node.opacity=255;
        
    }
}
