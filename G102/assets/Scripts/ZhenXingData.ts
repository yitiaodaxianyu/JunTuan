import { Enemy_Type } from "./Enemy/EnemyConfig";


export class ZhenXingData {

    boss_pos:cc.Vec2=cc.v2(0,0);
    buff_pos:cc.Vec2[]=[];
    other_pos:cc.Vec2[]=[];    
}

export class EnemyData {

    enemy_id:Enemy_Type=Enemy_Type.mengshe;
    is_boss:boolean=false;
    is_buff:boolean=false;   
}

