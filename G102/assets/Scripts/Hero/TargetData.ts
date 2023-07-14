import { GongJi_FangXiang } from "./Game/HeroConfig";



const {ccclass, property} = cc._decorator;

@ccclass
export default class TargetData {

    //目标数据的node，指敌人
    enemy_node:cc.Node=null;
    //初始攻击的方向
    target_fangxiang:GongJi_FangXiang=GongJi_FangXiang.zhong;
}
