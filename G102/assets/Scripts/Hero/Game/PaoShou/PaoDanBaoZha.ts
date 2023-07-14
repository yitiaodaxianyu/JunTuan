
import { GameState } from "../../../Constants";
import { Enemy_DeBuff_Type } from "../../../Enemy/EnemyConfig";
import { GameEffectId } from "../../../Game/GameEffectsManager";
import GameManager from "../../../GameManager";
import Monster from "../../../Monster/Monster";
import { GongJiData } from "../../Data/HeroData";
import { BuffData } from "../BuffData";
import GongJi from "../GongJi";
import { BuffId, BuffType, PaoDan_Type, SkillType } from "../HeroConfig";


const {ccclass, property} = cc._decorator;

@ccclass
export default class PaoDanBaoZha extends GongJi {

    game_effect_id:GameEffectId=GameEffectId.Null;    
    paodan_type:PaoDan_Type=PaoDan_Type.skill;

    init(id:GameEffectId,paodanType:PaoDan_Type,gjData:GongJiData){
        super.initData(gjData);
        this.game_effect_id=id;
        this.paodan_type=paodanType;
    }

    ////--------------------------------------碰撞开始----------------------------------------------------
    onCollisionEnter(other:cc.Collider,self:cc.Collider) {
        let gm=GameManager.getInstance();        
        if(gm.cur_game_state==GameState.Game_Lose)
            return;
        let group=other.node.group;
        switch(group){
            case 'enemy':{
                let monsterTs=other.node.getComponent(Monster);
                if(monsterTs){
                    switch(this.paodan_type){
                        case PaoDan_Type.skill:{                            
                            let data=monsterTs.beFlashInjured(this.gongji_data);
                            if(!data.is_die){
                                    
                            }
                        }break;
                        case PaoDan_Type.exclusive:{                            
                            let data=monsterTs.beFlashInjured(this.gongji_data);
                            if(!data.is_die){
                                //眩晕概率
                                // if(this.gongji_data.hero_data.hero_info.exclusive_equip_level>0){
                                //     // monsterTs.addDeBuff(Enemy_DeBuff_Type.XuanYun,{
                                //     //     remain_time: this.gongji_data.hero_data.ExclusiveWeaponSkillValue_2,
                                //     //     damage_num: 0,
                                //     //     jiange_time: 1,
                                //     //     hero_type: this.gongji_data.hero_type,
                                //     // },this.gongji_data)
                                //     let buffData=new BuffData();
                                //     buffData.buff_id=BuffId.Hero_XuanYun;
                                //     buffData.buff_type=BuffType.Vertigo;
                                //     buffData.buff_value=[0];
                                //     buffData.remain_time=this.gongji_data.hero_data.ExclusiveWeaponSkillValue_2;
                                //     buffData.game_effect_id=GameEffectId.xuanyun;
                                //     monsterTs.addDeBuff(buffData,this.gongji_data);
                                // }                                
                            }
                        }break;
                        case PaoDan_Type.super:{
                            let data=monsterTs.beFlashInjured(this.gongji_data);                            
                            if(!data.is_die ){
                                //被弹开
                                // let monsterPos=monsterTs.node.getPosition();
                                // let offsetPos=monsterPos.sub(this.node.getPosition());
                                // let distance=150-(offsetPos.mag()+Math.random()*40-20);
                                // if(distance<0){
                                //     distance=0;
                                // }
                                // let dir=Math.atan2(offsetPos.y,offsetPos.x);
                                // let xx=Math.cos(dir)*(distance);
                                // let yy=Math.sin(dir)*(distance);
                                // if(xx+monsterTs.node.x>192){
                                //     xx=192-monsterTs.node.x;
                                // }
                                // if(xx+monsterTs.node.x<-192){
                                //     xx=-192-monsterTs.node.x;
                                // }
                                // cc.tween(monsterTs.node).by(distance/150*0.3,{x:xx,y:yy},{easing:'sineIn'}).call(()=>{
                                //     monsterTs.addDeBuff(Enemy_DeBuff_Type.XuanYun,{
                                //         remain_time: 0.5,
                                //         damage_num: 0,
                                //         jiange_time: 1,
                                //         hero_type: this.gongji_data.hero_type,
                                //     },this.gongji_data)
                                // }).start();
                                // monsterTs.addDeBuff(Enemy_DeBuff_Type.XuanYun,{
                                //     remain_time: 0.5,
                                //     damage_num: 0,
                                //     jiange_time: 1,
                                //     hero_type: this.gongji_data.hero_type,
                                // },this.gongji_data)
                                let buffData=new BuffData();
                                buffData.buff_id=BuffId.Hero_XuanYun;
                                buffData.buff_type=BuffType.Vertigo;
                                buffData.buff_value=[0];
                                buffData.remain_time=0.5;
                                buffData.game_effect_id=GameEffectId.xuanyun;
                                monsterTs.addDeBuff(buffData,this.gongji_data);
                            }
                        }
                    }                    
                }
            }break;           
        }
    }
}
