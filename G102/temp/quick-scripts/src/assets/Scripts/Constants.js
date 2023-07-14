"use strict";
cc._RF.push(module, 'ed7df3GZnxP15wGhoB3zFbj', 'Constants');
// Scripts/Constants.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurVersionCode = exports.local_version = exports.IsTestCode = exports.IsGM = exports.SkillSpeedRate = exports.JiaSu = exports.IsSaveEquipLog = exports.IsTestServer = exports.IsDebug = exports.CUR_Platform = exports.MAX_Military = exports.MAX_ENERGY = exports.Release_Platform = exports.MAX_HERO_Quality = exports.MAX_HERO_LEVEL = exports.MAX_LEVEL = exports.MAX_VIDEO = exports.Ad_State = exports.ValueUnit = exports.ValueType = exports.Reward_Type = exports.Receive_Index = exports.RED_TIP_ = exports.JianTou_Type = exports.Btn_Index = exports.Zheng_Xing_Type = exports.Item_Type = exports.FightingEffect_Type = exports.FightingInfo = exports.GameState = exports.GameMode = exports.GameScene = exports.Text_Type = exports.SelectSkill_Type = exports.Attach_Fruit_Type = exports.FuncType = exports.Go_Type = exports.INTER_VIDEO_TYPE = exports.VIDEO_TYPE = void 0;
var MonsterConfigure_1 = require("./Monster/Data/MonsterConfigure");
var MonsterData_1 = require("./Monster/MonsterData");
var VIDEO_TYPE;
(function (VIDEO_TYPE) {
    VIDEO_TYPE[VIDEO_TYPE["Gem"] = 0] = "Gem";
    VIDEO_TYPE[VIDEO_TYPE["Coin"] = 1] = "Coin";
    VIDEO_TYPE[VIDEO_TYPE["Equip"] = 2] = "Equip";
})(VIDEO_TYPE = exports.VIDEO_TYPE || (exports.VIDEO_TYPE = {}));
var INTER_VIDEO_TYPE;
(function (INTER_VIDEO_TYPE) {
    INTER_VIDEO_TYPE[INTER_VIDEO_TYPE["Zhuanpan"] = 0] = "Zhuanpan";
    INTER_VIDEO_TYPE[INTER_VIDEO_TYPE["Huodong"] = 1] = "Huodong";
    INTER_VIDEO_TYPE[INTER_VIDEO_TYPE["Baoxiang"] = 2] = "Baoxiang";
    INTER_VIDEO_TYPE[INTER_VIDEO_TYPE["Ziyuan"] = 3] = "Ziyuan";
})(INTER_VIDEO_TYPE = exports.INTER_VIDEO_TYPE || (exports.INTER_VIDEO_TYPE = {}));
var Go_Type;
(function (Go_Type) {
    /**宠物列表 */
    Go_Type[Go_Type["PetList"] = 0] = "PetList";
    /**角色页 */
    Go_Type[Go_Type["Role"] = 1] = "Role";
    /**主页 */
    Go_Type[Go_Type["Main"] = 2] = "Main";
    /**主页-任务 */
    Go_Type[Go_Type["Main_Task"] = 3] = "Main_Task";
    /**主页-里程碑 */
    Go_Type[Go_Type["Main_Milestone"] = 4] = "Main_Milestone";
    /**主页-怪物图鉴 */
    Go_Type[Go_Type["Main_EnemyInfo"] = 5] = "Main_EnemyInfo";
    /**主页-转盘 */
    Go_Type[Go_Type["Main_Spin"] = 6] = "Main_Spin";
    /**主页-签到 */
    Go_Type[Go_Type["Main_Sign"] = 7] = "Main_Sign";
    /**主页-排行榜 */
    Go_Type[Go_Type["Main_Rank"] = 8] = "Main_Rank";
    /**主城（商城） */
    Go_Type[Go_Type["City"] = 9] = "City";
    /**副本页 */
    Go_Type[Go_Type["Activity"] = 10] = "Activity";
    Go_Type[Go_Type["Activity_Endless"] = 11] = "Activity_Endless";
    Go_Type[Go_Type["Activity_Boss"] = 12] = "Activity_Boss";
    Go_Type[Go_Type["Activity_Maze"] = 13] = "Activity_Maze";
    Go_Type[Go_Type["Activity_Maze_lose"] = 14] = "Activity_Maze_lose";
    Go_Type[Go_Type["Go_Num"] = 15] = "Go_Num";
})(Go_Type = exports.Go_Type || (exports.Go_Type = {}));
var FuncType;
(function (FuncType) {
    FuncType[FuncType["LiChengBei"] = 1] = "LiChengBei";
    FuncType[FuncType["GuaiWuTuJian"] = 2] = "GuaiWuTuJian";
    // XingYunZhuanPan=3,
    FuncType[FuncType["MeiRiRenWu"] = 4] = "MeiRiRenWu";
    FuncType[FuncType["QianDao"] = 5] = "QianDao";
    FuncType[FuncType["ZhuangBeiHeCheng"] = 6] = "ZhuangBeiHeCheng";
    FuncType[FuncType["ChengBaoYangCheng"] = 7] = "ChengBaoYangCheng";
    FuncType[FuncType["TianFu"] = 8] = "TianFu";
    FuncType[FuncType["PaiHangBang"] = 9] = "PaiHangBang";
    FuncType[FuncType["GeRenBoss"] = 10] = "GeRenBoss";
    FuncType[FuncType["ShiJieBoss"] = 11] = "ShiJieBoss";
    FuncType[FuncType["WuJinTiaoZhan"] = 12] = "WuJinTiaoZhan";
    FuncType[FuncType["PaTa"] = 13] = "PaTa";
    FuncType[FuncType["FanLi"] = 14] = "FanLi";
    FuncType[FuncType["LiBao"] = 15] = "LiBao";
    FuncType[FuncType["ZhanLing"] = 16] = "ZhanLing";
    FuncType[FuncType["ZhouLiBao"] = 17] = "ZhouLiBao";
    FuncType[FuncType["Shengtang"] = 18] = "Shengtang";
    FuncType[FuncType["XuYuanChi"] = 19] = "XuYuanChi";
    FuncType[FuncType["LongChao"] = 20] = "LongChao";
    FuncType[FuncType["ShangDian"] = 21] = "ShangDian";
    FuncType[FuncType["TieJiangPu"] = 22] = "TieJiangPu";
    FuncType[FuncType["ChongWuXiTong"] = 23] = "ChongWuXiTong";
    FuncType[FuncType["MiGong"] = 24] = "MiGong";
    FuncType[FuncType["NeiGou"] = 25] = "NeiGou";
    FuncType[FuncType["FirstCharge"] = 26] = "FirstCharge";
    FuncType[FuncType["ZhuanPan"] = 3] = "ZhuanPan";
    FuncType[FuncType["VIP"] = 29] = "VIP";
    FuncType[FuncType["AccumulatedRecharge"] = 30] = "AccumulatedRecharge";
    FuncType[FuncType["WeekCard"] = 31] = "WeekCard";
    FuncType[FuncType["PetParadise"] = 32] = "PetParadise";
    FuncType[FuncType["Num"] = 33] = "Num";
})(FuncType = exports.FuncType || (exports.FuncType = {}));
var Attach_Fruit_Type;
(function (Attach_Fruit_Type) {
    Attach_Fruit_Type[Attach_Fruit_Type["None"] = 0] = "None";
})(Attach_Fruit_Type = exports.Attach_Fruit_Type || (exports.Attach_Fruit_Type = {}));
var SelectSkill_Type;
(function (SelectSkill_Type) {
    //攻击次数
    SelectSkill_Type[SelectSkill_Type["GongJi_CiShu1"] = 0] = "GongJi_CiShu1";
    SelectSkill_Type[SelectSkill_Type["GongJi_CiShu2"] = 1] = "GongJi_CiShu2";
    //攻击力
    SelectSkill_Type[SelectSkill_Type["GongJi_Li1"] = 2] = "GongJi_Li1";
    SelectSkill_Type[SelectSkill_Type["GongJi_Li2"] = 3] = "GongJi_Li2";
    //攻击速度
    SelectSkill_Type[SelectSkill_Type["GongJi_SuDu1"] = 4] = "GongJi_SuDu1";
    SelectSkill_Type[SelectSkill_Type["GongJi_SuDu2"] = 5] = "GongJi_SuDu2";
    //暴击率
    SelectSkill_Type[SelectSkill_Type["BaoJi_Lv1"] = 6] = "BaoJi_Lv1";
    SelectSkill_Type[SelectSkill_Type["BaoJi_Lv2"] = 7] = "BaoJi_Lv2";
    //暴击伤害
    SelectSkill_Type[SelectSkill_Type["BaoJi_ShangHai1"] = 8] = "BaoJi_ShangHai1";
    SelectSkill_Type[SelectSkill_Type["BaoJi_ShangHai2"] = 9] = "BaoJi_ShangHai2";
    SelectSkill_Type[SelectSkill_Type["Skill_Num"] = 10] = "Skill_Num";
})(SelectSkill_Type = exports.SelectSkill_Type || (exports.SelectSkill_Type = {}));
var Text_Type;
(function (Text_Type) {
    Text_Type[Text_Type["white"] = 0] = "white";
})(Text_Type = exports.Text_Type || (exports.Text_Type = {}));
var GameScene;
(function (GameScene) {
    GameScene["home"] = "home";
    GameScene["game"] = "game";
    GameScene["load"] = "load";
})(GameScene = exports.GameScene || (exports.GameScene = {}));
var GameMode;
(function (GameMode) {
    GameMode[GameMode["Main"] = 1] = "Main";
    GameMode[GameMode["Endless"] = 2] = "Endless";
    GameMode[GameMode["Boss_Challenge"] = 3] = "Boss_Challenge";
    GameMode[GameMode["Boss_World"] = 4] = "Boss_World";
    GameMode[GameMode["Tower"] = 5] = "Tower";
    GameMode[GameMode["Maze"] = 6] = "Maze";
    GameMode[GameMode["Num"] = 7] = "Num";
})(GameMode = exports.GameMode || (exports.GameMode = {}));
var GameState;
(function (GameState) {
    GameState[GameState["Game_Ready"] = 0] = "Game_Ready";
    GameState[GameState["Game_Playing"] = 1] = "Game_Playing";
    GameState[GameState["Game_Pause"] = 2] = "Game_Pause";
    GameState[GameState["Game_Lose"] = 3] = "Game_Lose";
    GameState[GameState["Game_Win"] = 4] = "Game_Win";
})(GameState = exports.GameState || (exports.GameState = {}));
var FightingInfo = /** @class */ (function () {
    function FightingInfo() {
        /**怪物信息列表 */
        this.monster_datas = [[]];
        /**标题名称 */
        this.title_name = '';
        /**背景图名称 */
        this.bg_name = '';
        this.wall_name = '';
        /**怪物总数量 */
        this.total_monster_num = 0;
        /**怪物潮数据 */
        this.wave_types = [];
        /**怪物波次的刷新间隔 */
        this.wave_refresh_time = [];
    }
    /**获取怪物信息列表（不重复的，用于出战展示） */
    FightingInfo.prototype.getOnlyMonsterDataList = function () {
        var monsterDatas = new Array();
        for (var n = 0; n < this.monster_datas.length; n++) {
            var dataArr = this.monster_datas[n];
            for (var a = 0; a < dataArr.length; a++) {
                var data = cc.instantiate(dataArr[a]);
                //查找id是否存在
                var idIndex = -1;
                for (var m = 0; m < monsterDatas.length; m++) {
                    if (monsterDatas[m].id == data.id) {
                        idIndex = m;
                        break;
                    }
                }
                if (idIndex != -1) {
                    //如果存在，则比较等级
                    if (data.level > monsterDatas[idIndex].level) {
                        monsterDatas[idIndex].level = data.level;
                        monsterDatas[idIndex].score = data.score;
                    }
                }
                else {
                    monsterDatas.push(data);
                }
            }
        }
        return monsterDatas;
    };
    /**获取怪物类型信息列表（不重复的，只有类型，用于游戏内加载） */
    FightingInfo.prototype.getOnlyMonsterTypeMap = function () {
        var monsterTypes = new Map();
        var MSM = MonsterConfigure_1.MonsterConfigureManager.getInstance();
        for (var n = 0; n < this.monster_datas.length; n++) {
            var dataArr = this.monster_datas[n];
            for (var a = 0; a < dataArr.length; a++) {
                var data = cc.instantiate(dataArr[a]);
                //查找类型是否存在
                var jsonData = MSM.getJsonMonsterConfigure(data.id);
                var type = jsonData.MonsterClass;
                var strengthType = jsonData.StrengthType;
                if (monsterTypes.has(type)) {
                    if (monsterTypes.get(type) < strengthType) {
                        monsterTypes.set(type, strengthType);
                    }
                }
                else {
                    monsterTypes.set(type, strengthType);
                }
            }
        }
        return monsterTypes;
    };
    /**获取是否有Boss出现 */
    FightingInfo.prototype.getIsHaveBoss = function () {
        var MSM = MonsterConfigure_1.MonsterConfigureManager.getInstance();
        for (var n = 0; n < this.monster_datas.length; n++) {
            var dataArr = this.monster_datas[n];
            for (var a = 0; a < dataArr.length; a++) {
                var data = cc.instantiate(dataArr[a]);
                //查找类型是否存在
                var type = MSM.getStrengthType(data.id);
                if (type == MonsterData_1.StrengthType.Boss) {
                    return true;
                }
            }
        }
        return false;
    };
    /**获取每波怪物显示的门面,0:普通，1：怪物潮&boss */
    FightingInfo.prototype.getWaveTypes = function () {
        var arr = new Array(this.monster_datas.length);
        //let MSM=MonsterConfigureManager.getInstance();
        for (var n = 0; n < this.monster_datas.length; n++) {
            arr[n] = 0;
            //let dataArr=this.monster_datas[n];
            if (this.wave_types.indexOf((n + 1)) != -1) {
                arr[n] = 1;
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
    };
    return FightingInfo;
}());
exports.FightingInfo = FightingInfo;
var FightingEffect_Type;
(function (FightingEffect_Type) {
    FightingEffect_Type[FightingEffect_Type["paodan_baozha"] = 0] = "paodan_baozha";
    FightingEffect_Type[FightingEffect_Type["zhongdu"] = 1] = "zhongdu";
    FightingEffect_Type[FightingEffect_Type["juji_baozha"] = 2] = "juji_baozha";
    FightingEffect_Type[FightingEffect_Type["penhuo"] = 3] = "penhuo";
    FightingEffect_Type[FightingEffect_Type["zhuoshao"] = 4] = "zhuoshao";
    FightingEffect_Type[FightingEffect_Type["penhuo_dazhao"] = 5] = "penhuo_dazhao";
    FightingEffect_Type[FightingEffect_Type["feibiao_att"] = 6] = "feibiao_att";
    FightingEffect_Type[FightingEffect_Type["enemy_add_hp"] = 7] = "enemy_add_hp";
    FightingEffect_Type[FightingEffect_Type["enemy_jiasu"] = 8] = "enemy_jiasu";
    FightingEffect_Type[FightingEffect_Type["enemy_zenge_huixue"] = 9] = "enemy_zenge_huixue";
    FightingEffect_Type[FightingEffect_Type["enemy_wudi"] = 10] = "enemy_wudi";
    FightingEffect_Type[FightingEffect_Type["sheshou_sheji"] = 11] = "sheshou_sheji";
    FightingEffect_Type[FightingEffect_Type["enemy_att"] = 12] = "enemy_att";
})(FightingEffect_Type = exports.FightingEffect_Type || (exports.FightingEffect_Type = {}));
var Item_Type;
(function (Item_Type) {
    Item_Type[Item_Type["reset"] = 0] = "reset";
    Item_Type[Item_Type["jianguo"] = 1] = "jianguo";
    Item_Type[Item_Type["zhadan"] = 2] = "zhadan";
    Item_Type[Item_Type["item_num"] = 3] = "item_num";
})(Item_Type = exports.Item_Type || (exports.Item_Type = {}));
var Zheng_Xing_Type;
(function (Zheng_Xing_Type) {
    Zheng_Xing_Type[Zheng_Xing_Type["ZX0"] = 0] = "ZX0";
    Zheng_Xing_Type[Zheng_Xing_Type["ZX1"] = 1] = "ZX1";
    Zheng_Xing_Type[Zheng_Xing_Type["ZX2"] = 2] = "ZX2";
    Zheng_Xing_Type[Zheng_Xing_Type["ZX3"] = 3] = "ZX3";
    Zheng_Xing_Type[Zheng_Xing_Type["ZX4"] = 4] = "ZX4";
    Zheng_Xing_Type[Zheng_Xing_Type["ZX5"] = 5] = "ZX5";
    Zheng_Xing_Type[Zheng_Xing_Type["num"] = 6] = "num";
})(Zheng_Xing_Type = exports.Zheng_Xing_Type || (exports.Zheng_Xing_Type = {}));
/* ***********************************HOME*************************************** */
var Btn_Index;
(function (Btn_Index) {
    Btn_Index[Btn_Index["Btn_City"] = 0] = "Btn_City";
    Btn_Index[Btn_Index["Btn_Role"] = 1] = "Btn_Role";
    Btn_Index[Btn_Index["Btn_Main"] = 2] = "Btn_Main";
    Btn_Index[Btn_Index["Btn_Pet"] = 3] = "Btn_Pet";
    Btn_Index[Btn_Index["Btn_FuBen"] = 4] = "Btn_FuBen";
})(Btn_Index = exports.Btn_Index || (exports.Btn_Index = {}));
var JianTou_Type;
(function (JianTou_Type) {
    JianTou_Type[JianTou_Type["LEFT"] = 0] = "LEFT";
    JianTou_Type[JianTou_Type["RIGHT"] = 1] = "RIGHT";
})(JianTou_Type = exports.JianTou_Type || (exports.JianTou_Type = {}));
exports.RED_TIP_ = "red_tip_";
var Receive_Index;
(function (Receive_Index) {
    Receive_Index[Receive_Index["Btn_Shop"] = 0] = "Btn_Shop";
    Receive_Index[Receive_Index["Btn_Role"] = 1] = "Btn_Role";
    Receive_Index[Receive_Index["Btn_Role_SheShou"] = 2] = "Btn_Role_SheShou";
    Receive_Index[Receive_Index["Btn_Role_PaoShou"] = 3] = "Btn_Role_PaoShou";
    Receive_Index[Receive_Index["Btn_Role_JuJiShou"] = 4] = "Btn_Role_JuJiShou";
    Receive_Index[Receive_Index["Btn_Role_PenHuoBing"] = 5] = "Btn_Role_PenHuoBing";
    Receive_Index[Receive_Index["Btn_Role_RenZhe"] = 6] = "Btn_Role_RenZhe";
    Receive_Index[Receive_Index["Btn_Role_WuNv"] = 7] = "Btn_Role_WuNv";
    Receive_Index[Receive_Index["Btn_Role_Upgrade"] = 8] = "Btn_Role_Upgrade";
    Receive_Index[Receive_Index["Btn_Role_Promotion"] = 9] = "Btn_Role_Promotion";
    Receive_Index[Receive_Index["Btn_Role_Merge"] = 10] = "Btn_Role_Merge";
    Receive_Index[Receive_Index["Btn_Main"] = 11] = "Btn_Main";
    Receive_Index[Receive_Index["Btn_Main_Milestone"] = 12] = "Btn_Main_Milestone";
    Receive_Index[Receive_Index["Btn_Main_EnemyInfo"] = 13] = "Btn_Main_EnemyInfo";
    Receive_Index[Receive_Index["Btn_Main_Spin"] = 14] = "Btn_Main_Spin";
    Receive_Index[Receive_Index["Btn_Main_Task"] = 15] = "Btn_Main_Task";
    Receive_Index[Receive_Index["Btn_Main_Task_Video_0"] = 16] = "Btn_Main_Task_Video_0";
    Receive_Index[Receive_Index["Btn_Main_Task_Video_1"] = 17] = "Btn_Main_Task_Video_1";
    Receive_Index[Receive_Index["Btn_Main_Task_Video_2"] = 18] = "Btn_Main_Task_Video_2";
    Receive_Index[Receive_Index["Btn_Main_Task_Video_3"] = 19] = "Btn_Main_Task_Video_3";
    Receive_Index[Receive_Index["Btn_Main_SignIn"] = 20] = "Btn_Main_SignIn";
    Receive_Index[Receive_Index["Btn_Main_Guaji"] = 21] = "Btn_Main_Guaji";
    Receive_Index[Receive_Index["Btn_Spin_Spin"] = 22] = "Btn_Spin_Spin";
    Receive_Index[Receive_Index["Btn_Pet"] = 23] = "Btn_Pet";
    Receive_Index[Receive_Index["Btn_FuBen"] = 24] = "Btn_FuBen";
    Receive_Index[Receive_Index["Btn_Role_Skill"] = 25] = "Btn_Role_Skill";
    Receive_Index[Receive_Index["Btn_Main_Rank"] = 26] = "Btn_Main_Rank";
})(Receive_Index = exports.Receive_Index || (exports.Receive_Index = {}));
var Reward_Type;
(function (Reward_Type) {
    Reward_Type[Reward_Type["coin"] = 1] = "coin";
    Reward_Type[Reward_Type["gem"] = 2] = "gem";
    Reward_Type[Reward_Type["energy"] = 3] = "energy";
})(Reward_Type = exports.Reward_Type || (exports.Reward_Type = {}));
var ValueType;
(function (ValueType) {
    /*无后缀*/
    ValueType[ValueType["None"] = 0] = "None";
    /*百分比*/
    ValueType[ValueType["Percent"] = 1] = "Percent";
    //千分比
    ValueType[ValueType["Thousandths"] = 2] = "Thousandths";
    //秒
    ValueType[ValueType["Second"] = 3] = "Second";
})(ValueType = exports.ValueType || (exports.ValueType = {}));
var ValueUnit;
(function (ValueUnit) {
    /*无后缀*/
    ValueUnit["None"] = "";
    /*百分比*/
    ValueUnit["Percent"] = "%";
    //千分比
    ValueUnit["Thousandths"] = "%";
    //秒
    ValueUnit["Second"] = "s";
})(ValueUnit = exports.ValueUnit || (exports.ValueUnit = {}));
var Ad_State;
(function (Ad_State) {
    Ad_State[Ad_State["OnError"] = 0] = "OnError";
    Ad_State[Ad_State["OnLoad"] = 1] = "OnLoad";
})(Ad_State = exports.Ad_State || (exports.Ad_State = {}));
;
exports.MAX_VIDEO = 10;
exports.MAX_LEVEL = 50;
exports.MAX_HERO_LEVEL = 300;
exports.MAX_HERO_Quality = 50;
//发布的平台
var Release_Platform;
(function (Release_Platform) {
    Release_Platform[Release_Platform["APK"] = 0] = "APK";
    Release_Platform[Release_Platform["CPK_CY"] = 1] = "CPK_CY";
    Release_Platform[Release_Platform["CPK_WX"] = 2] = "CPK_WX";
    Release_Platform[Release_Platform["CPK_JKW"] = 3] = "CPK_JKW";
    Release_Platform[Release_Platform["CPK_OPPO"] = 4] = "CPK_OPPO";
    Release_Platform[Release_Platform["CPK_QQ"] = 5] = "CPK_QQ";
    Release_Platform[Release_Platform["CPK_VIVO"] = 6] = "CPK_VIVO";
    Release_Platform[Release_Platform["WEB_TEST"] = 7] = "WEB_TEST";
})(Release_Platform = exports.Release_Platform || (exports.Release_Platform = {}));
exports.MAX_ENERGY = 20;
exports.MAX_Military = 10;
exports.CUR_Platform = Release_Platform.APK;
exports.IsDebug = false;
exports.IsTestServer = true;
exports.IsSaveEquipLog = false;
exports.JiaSu = 10000;
exports.SkillSpeedRate = 10;
exports.IsGM = false;
exports.IsTestCode = false;
exports.local_version = "1-9-1";
exports.CurVersionCode = 4; //20221209-----=3

cc._RF.pop();