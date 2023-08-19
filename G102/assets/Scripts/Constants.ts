import { TableMonsterData } from "./Level/MissionLevel";
import { MonsterConfigureManager } from "./Monster/Data/MonsterConfigure";
import { StrengthType } from "./Monster/MonsterData";



export enum VIDEO_TYPE {
    Gem = 0,
    Coin = 1,
    Equip = 2,
}

export enum INTER_VIDEO_TYPE {
    Zhuanpan = 0,
    Huodong = 1,
    Baoxiang = 2,
    Ziyuan = 3,
}

export enum Go_Type{
    /**宠物列表 */
    PetList=0,
    /**角色页 */
    Role,
    /**主页 */
    Main,
    /**主页-任务 */
    Main_Task,
    /**主页-里程碑 */
    Main_Milestone,
    /**主页-怪物图鉴 */
    Main_EnemyInfo,
    /**主页-转盘 */
    Main_Spin,
    /**主页-签到 */
    Main_Sign,
    /**主页-排行榜 */
    Main_Rank,
    /**主城（商城） */
    City,
    /**副本页 */
    Activity,    
    Activity_Endless,
    Activity_Boss,
    Activity_Maze,//虚空胜利界面
    Activity_Maze_lose,//虚空失败界面
    Go_Num,
}

export enum FuncType{
    LiChengBei=1,
    GuaiWuTuJian=2,
    // XingYunZhuanPan=3,
    MeiRiRenWu=4,
    QianDao=5,
    ZhuangBeiHeCheng=6,
    ChengBaoYangCheng=7,
    TianFu=8,
    PaiHangBang=9,
    GeRenBoss=10,
    ShiJieBoss=11,//Boss挑战
    WuJinTiaoZhan=12,//无尽挑战
    PaTa=13,
    FanLi=14,
    LiBao=15,
    ZhanLing=16,
    ZhouLiBao=17,
    Shengtang = 18,
    XuYuanChi = 19,
    LongChao = 20,
    ShangDian = 21,
    TieJiangPu = 22,
    ChongWuXiTong = 23,
    MiGong=24,//冰河探险
    NeiGou=25,
    FirstCharge = 26,//充值没用了，暂时用做分享
    ZhuanPan = 3,
    VIP = 29,
    AccumulatedRecharge = 30,
    WeekCard = 31,
    PetParadise = 32,

    Num,
}

export enum Attach_Fruit_Type {
    None = 0,//无道具
}

export enum SelectSkill_Type
{
    //攻击次数
    GongJi_CiShu1=0,
    GongJi_CiShu2=1,
    //攻击力
    GongJi_Li1=2,
    GongJi_Li2=3,
    //攻击速度
    GongJi_SuDu1=4,
    GongJi_SuDu2=5,
    //暴击率
    BaoJi_Lv1=6,
    BaoJi_Lv2=7,
    //暴击伤害
    BaoJi_ShangHai1=8,
    BaoJi_ShangHai2=9,

    Skill_Num
}

export enum Text_Type {
    white = 0,
}

export enum GameScene {
    home = 'home',
    game = 'game',
    load = 'load',
}

export enum GameMode{
    Main=1,
    Endless,//无尽
    Boss_Challenge,//boss挑战
    Boss_World,
    Tower,
    Maze,//虚空裂缝

    Num,
}

export enum GameState {
    Game_Ready = 0,
    Game_Playing = 1,
    Game_Pause = 2,
    Game_Lose = 3,
    Game_Win = 4,
    Game_Roguelike = 5
}

export class FightingInfo{
    /**怪物信息列表 */
    monster_datas:TableMonsterData[][]=[[]];
    /**标题名称 */
    title_name:string='';
    /**背景图名称 */
    bg_name:string='';
    wall_name:string='';
    /**怪物总数量 */
    total_monster_num:number=0;
    /**怪物潮数据 */
    wave_types:number[]=[];
    /**怪物波次的刷新间隔 */
    wave_refresh_time:number[]=[];
    /**获取怪物信息列表（不重复的，用于出战展示） */
    getOnlyMonsterDataList():TableMonsterData[]{
        let monsterDatas=new Array<TableMonsterData>();
        for(let n=0; n<this.monster_datas.length; n++){
            let dataArr=this.monster_datas[n];
            for(let a=0; a<dataArr.length; a++){
                let data=cc.instantiate(dataArr[a]);
                //查找id是否存在
                let idIndex=-1;
                for(let m=0; m<monsterDatas.length; m++){
                    if(monsterDatas[m].id==data.id){
                        idIndex=m;
                        break;
                    }
                }
                if(idIndex!=-1){
                    //如果存在，则比较等级
                    if(data.level>monsterDatas[idIndex].level){
                        monsterDatas[idIndex].level=data.level;
                        monsterDatas[idIndex].score=data.score;
                    }                        
                }else
                {
                    monsterDatas.push(data);
                }
            }            
        }
        return monsterDatas;
    }
    /**获取怪物类型信息列表（不重复的，只有类型，用于游戏内加载） */
    getOnlyMonsterTypeMap():Map<number,number>{
        let monsterTypes=new Map<number,number>();
        let MSM=MonsterConfigureManager.getInstance();
        for(let n=0; n<this.monster_datas.length; n++){
            let dataArr=this.monster_datas[n];
            for(let a=0; a<dataArr.length; a++){
                let data=cc.instantiate(dataArr[a]);
                //查找类型是否存在
                let jsonData=MSM.getJsonMonsterConfigure(data.id);
                let type=jsonData.MonsterClass;
                let strengthType=jsonData.StrengthType;
                if(monsterTypes.has(type)){
                    if(monsterTypes.get(type)<strengthType){
                        monsterTypes.set(type,strengthType);
                    }
                }else{
                    monsterTypes.set(type,strengthType);
                }
            }            
        }        
        return monsterTypes;
    }
    /**获取是否有Boss出现 */
    getIsHaveBoss():boolean{
        let MSM=MonsterConfigureManager.getInstance();
        for(let n=0; n<this.monster_datas.length; n++){
            let dataArr=this.monster_datas[n];
            for(let a=0; a<dataArr.length; a++){
                let data=cc.instantiate(dataArr[a]);
                //查找类型是否存在
                let type=MSM.getStrengthType(data.id);
                if(type==StrengthType.Boss){
                    return true;
                }
            }            
        }
        return false;
    }
    /**获取每波怪物显示的门面,0:普通，1：怪物潮&boss */
    getWaveTypes():number[]{
        let arr=new Array<number>(this.monster_datas.length);
        //let MSM=MonsterConfigureManager.getInstance();
        for(let n=0; n<this.monster_datas.length; n++){
            arr[n]=0;
            //let dataArr=this.monster_datas[n];
            if(this.wave_types.indexOf((n+1))!=-1){
                arr[n]=1;
                continue;
            }
            // for(let a=0; a<dataArr.length; a++){
            //     let data=cc.instantiate(dataArr[a]);
            //     //查找类型是否存在
            //     let type=MSM.getStrengthType(data.id);
            //     if(type==StrengthType.Boss){
            //         arr[n]=1;
            //         //如果有boss，是最大的了，可以直接结束本波的循环
            //         break;
            //     }
            // }            
        }
        return arr;
    }
}

export enum FightingEffect_Type
{
    paodan_baozha=0,//0.35
    zhongdu=1,//0.85
    juji_baozha=2,//0.43
    penhuo=3,//0.57
    zhuoshao=4,//
    penhuo_dazhao=5,
    feibiao_att=6,
    enemy_add_hp=7,
    enemy_jiasu=8,
    enemy_zenge_huixue=9,
    enemy_wudi=10,
    sheshou_sheji=11,
    enemy_att=12,
}

export enum Item_Type {
    reset=0,
    jianguo = 1,
    zhadan = 2,

    item_num
}

export enum Zheng_Xing_Type {
    ZX0=0,
    ZX1,
    ZX2,
    ZX3,
    ZX4,
    ZX5,
    num
}

/* ***********************************HOME*************************************** */
export enum Btn_Index {
    Btn_City = 0,
    Btn_Role = 1,
    Btn_Main = 2,
    Btn_Pet = 3,
    Btn_FuBen = 4
    
}

export enum JianTou_Type{
    LEFT = 0,
    RIGHT = 1,
}

export let RED_TIP_="red_tip_";

export enum Receive_Index {
    Btn_Shop = 0,//商店按钮
    Btn_Role ,//角色按钮
    Btn_Role_SheShou,//射手按钮,
    Btn_Role_PaoShou,//炮手按钮,
    Btn_Role_JuJiShou,//狙击按钮,
    Btn_Role_PenHuoBing,//喷火按钮,
    Btn_Role_RenZhe,//忍者按钮,
    Btn_Role_WuNv,//巫女按钮,
    Btn_Role_Upgrade,//升级按钮,
    Btn_Role_Promotion,//晋升按钮,
    Btn_Role_Merge,//快速合成,
    Btn_Main ,//战斗按钮
    Btn_Main_Milestone ,//里程按钮
    Btn_Main_EnemyInfo ,//怪物图鉴按钮
    Btn_Main_Spin ,//幸运转盘按钮
    Btn_Main_Task ,//任务按钮
    Btn_Main_Task_Video_0 ,//视频任务按钮0
    Btn_Main_Task_Video_1 ,//视频任务按钮1
    Btn_Main_Task_Video_2 ,//视频任务按钮2
    Btn_Main_Task_Video_3 ,//视频任务按钮3
    Btn_Main_SignIn ,//签到按钮
    Btn_Main_Guaji ,//挂机礼包
    Btn_Spin_Spin ,//幸运转盘按钮
    Btn_Pet ,//宠物按钮
    Btn_FuBen ,//副本按钮
    Btn_Role_Skill,//技能按钮
    Btn_Main_Rank,//技能按钮
}

export enum Reward_Type{
    coin=1,
    gem=2,
    energy=3,

}

export enum ValueType{
    /*无后缀*/
    None=0,
    /*百分比*/
    Percent=1,
    //千分比
    Thousandths=2,
    //秒
    Second=3,
}

export enum ValueUnit{
    /*无后缀*/
    None="",
    /*百分比*/
    Percent="%",
    //千分比
    Thousandths="%",
    //秒
    Second="s",
}

export enum Ad_State{
    OnError=0,//加载失败
    OnLoad=1,//加载成功
};
export let MAX_VIDEO=10;
export let MAX_LEVEL=50;
export let MAX_HERO_LEVEL=300;
export let MAX_HERO_Quality=50;
//发布的平台
export enum Release_Platform {
    APK = 0,
    CPK_CY = 1,
    CPK_WX = 2,
    CPK_JKW = 3,
    CPK_OPPO = 4,
    CPK_QQ = 5,
    CPK_VIVO = 6,
    WEB_TEST ,
}

export let MAX_ENERGY=20;
export let MAX_Military=10;
export let CUR_Platform=Release_Platform.APK;
export let IsDebug=false;
export let IsTestServer=true;
export let IsSaveEquipLog=false;
export let JiaSu=10000;
export let SkillSpeedRate=10;
export let IsGM=false;
export let IsTestCode=false;
export let local_version="1-9-1";
export let CurVersionCode=4;//20221209-----=3
