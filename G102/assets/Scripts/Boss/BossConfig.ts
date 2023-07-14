export enum Boss_Type
{
    //没BOSS
    NULL=0,
    BullDemon=1,

    Boss_Num
}

export enum Boss_State
{
    daiji=0,
    gongji=1,
    jineng=2,
}

export enum Boss_State_Name
{
    zmdj = "zhengmian_daiji",       //-- 正面待机
    cmdj = "cemian_daiji",          //-- 侧面待机
    zmgj = "zhengmian",             //-- 正面攻击
    cmgj = "cemian",                //-- 侧面攻击
}