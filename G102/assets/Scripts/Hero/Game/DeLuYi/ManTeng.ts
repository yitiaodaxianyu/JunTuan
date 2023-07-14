
import { GameState } from "../../../Constants";
import { Enemy_DeBuff_Type } from "../../../Enemy/EnemyConfig";
import { GameEffectsManager, GameEffectId } from "../../../Game/GameEffectsManager";
import GameManager from "../../../GameManager";
import Monster from "../../../Monster/Monster";
import { GongJiData } from "../../Data/HeroData";
import { BuffData } from "../BuffData";
import GongJi from "../GongJi";
import { BuffId, BuffType } from "../HeroConfig";


const {ccclass, property} = cc._decorator;

@ccclass
export default class ManTeng extends GongJi {


    init(gjData:GongJiData){
        this.initData(gjData);
    }

    onCollisionEnter(other:cc.Collider,self:cc.Collider) {
        let gm=GameManager.getInstance();        
        if(gm.cur_game_state==GameState.Game_Lose)
            return;
        let group=other.node.group;
        switch(group){
            case 'enemy':{
                let monsterTs=other.node.getComponent(Monster);
                if(monsterTs){
                    let data=monsterTs.beFlashInjured(this.gongji_data);
                    if(data.getDamageNum()>0){
                        GameEffectsManager.getInstance().createGameEffectById(GameEffectId.deluyi_att_hit,monsterTs.getJuJiPos());
                        //流血效果
                        // if(this.gongji_data.hero_data.hero_info.exclusive_equip_level>0){
                        //     let rate=this.gongji_data.hero_data.ExclusiveWeaponSkillValue_1;
                        //     if(rate&&Math.random()<rate){
                        //         if(!data.is_die){
                        //             // monsterTs.addDeBuff(Enemy_DeBuff_Type.LiuXue_WuNv_Ex_Skill,{
                        //             //     remain_time:this.gongji_data.hero_data.ExclusiveWeaponSkillValue_2,
                        //             //     damage_num: this.gongji_data.hero_data.total_attack*0.1,
                        //             //     jiange_time: 1,
                        //             //     hero_type: this.gongji_data.hero_type,
                        //             // },this.gongji_data);
                        //             // let buffData=new BuffData();
                        //             // buffData.buff_id=BuffId.Hero_FaShi_EX_LIUXUE;
                        //             // buffData.buff_type=BuffType.Normal;
                        //             // buffData.buff_value=[this.gongji_data.hero_data.total_attack*0.5];
                        //             // buffData.remain_time=this.gongji_data.hero_data.ExclusiveWeaponSkillValue_2;
                        //             // buffData.game_effect_id=GameEffectId.monster_zhongdu;
                        //             // buffData.damage_jiange_time=1;
                        //             // monsterTs.addDeBuff(buffData,this.gongji_data);
                        //         }
                        //     }
                        // }                        
                    }         
                }
            }break;            
        }
    }
}
