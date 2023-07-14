//每一波的数据
export default class WaveData {
    //关卡编号
    id:number=1;
    //每波的怪物编号ID数组
    monster_id:number[]=[];
    //每波的怪物数量
    monster_num:number[]=[];
    //每波的属性倍率
    level:number[]=[];
    //是否boss的标志
    is_boss:boolean[]=[];
    //每波的怪物积分
    monster_score:number[]=[];
}

