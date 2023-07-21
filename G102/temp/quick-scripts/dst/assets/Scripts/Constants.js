
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Constants.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
    GameState[GameState["Game_Roguelike"] = 5] = "Game_Roguelike";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcQ29uc3RhbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLG9FQUEwRTtBQUMxRSxxREFBcUQ7QUFJckQsSUFBWSxVQUlYO0FBSkQsV0FBWSxVQUFVO0lBQ2xCLHlDQUFPLENBQUE7SUFDUCwyQ0FBUSxDQUFBO0lBQ1IsNkNBQVMsQ0FBQTtBQUNiLENBQUMsRUFKVyxVQUFVLEdBQVYsa0JBQVUsS0FBVixrQkFBVSxRQUlyQjtBQUVELElBQVksZ0JBS1g7QUFMRCxXQUFZLGdCQUFnQjtJQUN4QiwrREFBWSxDQUFBO0lBQ1osNkRBQVcsQ0FBQTtJQUNYLCtEQUFZLENBQUE7SUFDWiwyREFBVSxDQUFBO0FBQ2QsQ0FBQyxFQUxXLGdCQUFnQixHQUFoQix3QkFBZ0IsS0FBaEIsd0JBQWdCLFFBSzNCO0FBRUQsSUFBWSxPQTRCWDtBQTVCRCxXQUFZLE9BQU87SUFDZixVQUFVO0lBQ1YsMkNBQVMsQ0FBQTtJQUNULFNBQVM7SUFDVCxxQ0FBSSxDQUFBO0lBQ0osUUFBUTtJQUNSLHFDQUFJLENBQUE7SUFDSixXQUFXO0lBQ1gsK0NBQVMsQ0FBQTtJQUNULFlBQVk7SUFDWix5REFBYyxDQUFBO0lBQ2QsYUFBYTtJQUNiLHlEQUFjLENBQUE7SUFDZCxXQUFXO0lBQ1gsK0NBQVMsQ0FBQTtJQUNULFdBQVc7SUFDWCwrQ0FBUyxDQUFBO0lBQ1QsWUFBWTtJQUNaLCtDQUFTLENBQUE7SUFDVCxZQUFZO0lBQ1oscUNBQUksQ0FBQTtJQUNKLFNBQVM7SUFDVCw4Q0FBUSxDQUFBO0lBQ1IsOERBQWdCLENBQUE7SUFDaEIsd0RBQWEsQ0FBQTtJQUNiLHdEQUFhLENBQUE7SUFDYixrRUFBa0IsQ0FBQTtJQUNsQiwwQ0FBTSxDQUFBO0FBQ1YsQ0FBQyxFQTVCVyxPQUFPLEdBQVAsZUFBTyxLQUFQLGVBQU8sUUE0QmxCO0FBRUQsSUFBWSxRQWtDWDtBQWxDRCxXQUFZLFFBQVE7SUFDaEIsbURBQVksQ0FB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K0RBQVksQ0FBQTtJQUNaLDJEQUFVLENBQUE7SUFDViwrREFBWSxDQUFBO0lBQ1osK0RBQVEsQ0FBQTtBQUNaLENBQUMsRUFUVyxnQkFBZ0IsR0FBaEIsd0JBQWdCLEtBQWhCLHdCQUFnQixRQVMzQjtBQUVVLFFBQUEsVUFBVSxHQUFDLEVBQUUsQ0FBQztBQUNkLFFBQUEsWUFBWSxHQUFDLEVBQUUsQ0FBQztBQUNoQixRQUFBLFlBQVksR0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUM7QUFDbEMsUUFBQSxPQUFPLEdBQUMsS0FBSyxDQUFDO0FBQ2QsUUFBQSxZQUFZLEdBQUMsSUFBSSxDQUFDO0FBQ2xCLFFBQUEsY0FBYyxHQUFDLEtBQUssQ0FBQztBQUNyQixRQUFBLEtBQUssR0FBQyxLQUFLLENBQUM7QUFDWixRQUFBLGNBQWMsR0FBQyxFQUFFLENBQUM7QUFDbEIsUUFBQSxJQUFJLEdBQUMsS0FBSyxDQUFDO0FBQ1gsUUFBQSxVQUFVLEdBQUMsS0FBSyxDQUFDO0FBQ2pCLFFBQUEsYUFBYSxHQUFDLE9BQU8sQ0FBQztBQUN0QixRQUFBLGNBQWMsR0FBQyxDQUFDLENBQUMsQ0FBQSxpQkFBaUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUYWJsZU1vbnN0ZXJEYXRhIH0gZnJvbSBcIi4vTGV2ZWwvTWlzc2lvbkxldmVsXCI7XHJcbmltcG9ydCB7IE1vbnN0ZXJDb25maWd1cmVNYW5hZ2VyIH0gZnJvbSBcIi4vTW9uc3Rlci9EYXRhL01vbnN0ZXJDb25maWd1cmVcIjtcclxuaW1wb3J0IHsgU3RyZW5ndGhUeXBlIH0gZnJvbSBcIi4vTW9uc3Rlci9Nb25zdGVyRGF0YVwiO1xyXG5cclxuXHJcblxyXG5leHBvcnQgZW51bSBWSURFT19UWVBFIHtcclxuICAgIEdlbSA9IDAsXHJcbiAgICBDb2luID0gMSxcclxuICAgIEVxdWlwID0gMixcclxufVxyXG5cclxuZXhwb3J0IGVudW0gSU5URVJfVklERU9fVFlQRSB7XHJcbiAgICBaaHVhbnBhbiA9IDAsXHJcbiAgICBIdW9kb25nID0gMSxcclxuICAgIEJhb3hpYW5nID0gMixcclxuICAgIFppeXVhbiA9IDMsXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIEdvX1R5cGV7XHJcbiAgICAvKirlrqDnianliJfooaggKi9cclxuICAgIFBldExpc3Q9MCxcclxuICAgIC8qKuinkuiJsumhtSAqL1xyXG4gICAgUm9sZSxcclxuICAgIC8qKuS4u+mhtSAqL1xyXG4gICAgTWFpbixcclxuICAgIC8qKuS4u+mhtS3ku7vliqEgKi9cclxuICAgIE1haW5fVGFzayxcclxuICAgIC8qKuS4u+mhtS3ph4znqIvnopEgKi9cclxuICAgIE1haW5fTWlsZXN0b25lLFxyXG4gICAgLyoq5Li76aG1LeaAqueJqeWbvumJtCAqL1xyXG4gICAgTWFpbl9FbmVteUluZm8sXHJcbiAgICAvKirkuLvpobUt6L2s55uYICovXHJcbiAgICBNYWluX1NwaW4sXHJcbiAgICAvKirkuLvpobUt562+5YiwICovXHJcbiAgICBNYWluX1NpZ24sXHJcbiAgICAvKirkuLvpobUt5o6S6KGM5qacICovXHJcbiAgICBNYWluX1JhbmssXHJcbiAgICAvKirkuLvln47vvIjllYbln47vvIkgKi9cclxuICAgIENpdHksXHJcbiAgICAvKirlia/mnKzpobUgKi9cclxuICAgIEFjdGl2aXR5LCAgICBcclxuICAgIEFjdGl2aXR5X0VuZGxlc3MsXHJcbiAgICBBY3Rpdml0eV9Cb3NzLFxyXG4gICAgQWN0aXZpdHlfTWF6ZSwvL+iZmuepuuiDnOWIqeeVjOmdolxyXG4gICAgQWN0aXZpdHlfTWF6ZV9sb3NlLC8v6Jma56m65aSx6LSl55WM6Z2iXHJcbiAgICBHb19OdW0sXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIEZ1bmNUeXBle1xyXG4gICAgTGlDaGVuZ0JlaT0xLFxyXG4gICAgR3VhaVd1VHVKaWFuPTIsXHJcbiAgICAvLyBYaW5nWXVuWmh1YW5QYW49MyxcclxuICAgIE1laVJpUmVuV3U9NCxcclxuICAgIFFpYW5EYW89NSxcclxuICAgIFpodWFuZ0JlaUhlQ2hlbmc9NixcclxuICAgIENoZW5nQmFvWWFuZ0NoZW5nPTcsXHJcbiAgICBUaWFuRnU9OCxcclxuICAgIFBhaUhhbmdCYW5nPTksXHJcbiAgICBHZVJlbkJvc3M9MTAsXHJcbiAgICBTaGlKaWVCb3NzPTExLC8vQm9zc+aMkeaImFxyXG4gICAgV3VKaW5UaWFvWmhhbj0xMiwvL+aXoOWwveaMkeaImFxyXG4gICAgUGFUYT0xMyxcclxuICAgIEZhbkxpPTE0LFxyXG4gICAgTGlCYW89MTUsXHJcbiAgICBaaGFuTGluZz0xNixcclxuICAgIFpob3VMaUJhbz0xNyxcclxuICAgIFNoZW5ndGFuZyA9IDE4LFxyXG4gICAgWHVZdWFuQ2hpID0gMTksXHJcbiAgICBMb25nQ2hhbyA9IDIwLFxyXG4gICAgU2hhbmdEaWFuID0gMjEsXHJcbiAgICBUaWVKaWFuZ1B1ID0gMjIsXHJcbiAgICBDaG9uZ1d1WGlUb25nID0gMjMsXHJcbiAgICBNaUdvbmc9MjQsLy/lhrDmsrPmjqLpmalcclxuICAgIE5laUdvdT0yNSxcclxuICAgIEZpcnN0Q2hhcmdlID0gMjYsXHJcbiAgICBaaHVhblBhbiA9IDMsXHJcbiAgICBWSVAgPSAyOSxcclxuICAgIEFjY3VtdWxhdGVkUmVjaGFyZ2UgPSAzMCxcclxuICAgIFdlZWtDYXJkID0gMzEsXHJcbiAgICBQZXRQYXJhZGlzZSA9IDMyLFxyXG5cclxuICAgIE51bSxcclxufVxyXG5cclxuZXhwb3J0IGVudW0gQXR0YWNoX0ZydWl0X1R5cGUge1xyXG4gICAgTm9uZSA9IDAsLy/ml6DpgZPlhbdcclxufVxyXG5cclxuZXhwb3J0IGVudW0gU2VsZWN0U2tpbGxfVHlwZVxyXG57XHJcbiAgICAvL+aUu+WHu+asoeaVsFxyXG4gICAgR29uZ0ppX0NpU2h1MT0wLFxyXG4gICAgR29uZ0ppX0NpU2h1Mj0xLFxyXG4gICAgLy/mlLvlh7vliptcclxuICAgIEdvbmdKaV9MaTE9MixcclxuICAgIEdvbmdKaV9MaTI9MyxcclxuICAgIC8v5pS75Ye76YCf5bqmXHJcbiAgICBHb25nSmlfU3VEdTE9NCxcclxuICAgIEdvbmdKaV9TdUR1Mj01LFxyXG4gICAgLy/mmrTlh7vnjodcclxuICAgIEJhb0ppX0x2MT02LFxyXG4gICAgQmFvSmlfTHYyPTcsXHJcbiAgICAvL+aatOWHu+S8pOWus1xyXG4gICAgQmFvSmlfU2hhbmdIYWkxPTgsXHJcbiAgICBCYW9KaV9TaGFuZ0hhaTI9OSxcclxuXHJcbiAgICBTa2lsbF9OdW1cclxufVxyXG5cclxuZXhwb3J0IGVudW0gVGV4dF9UeXBlIHtcclxuICAgIHdoaXRlID0gMCxcclxufVxyXG5cclxuZXhwb3J0IGVudW0gR2FtZVNjZW5lIHtcclxuICAgIGhvbWUgPSAnaG9tZScsXHJcbiAgICBnYW1lID0gJ2dhbWUnLFxyXG4gICAgbG9hZCA9ICdsb2FkJyxcclxufVxyXG5cclxuZXhwb3J0IGVudW0gR2FtZU1vZGV7XHJcbiAgICBNYWluPTEsXHJcbiAgICBFbmRsZXNzLC8v5peg5bC9XHJcbiAgICBCb3NzX0NoYWxsZW5nZSwvL2Jvc3PmjJHmiJhcclxuICAgIEJvc3NfV29ybGQsXHJcbiAgICBUb3dlcixcclxuICAgIE1hemUsLy/omZrnqbroo4LnvJ1cclxuXHJcbiAgICBOdW0sXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIEdhbWVTdGF0ZSB7XHJcbiAgICBHYW1lX1JlYWR5ID0gMCxcclxuICAgIEdhbWVfUGxheWluZyA9IDEsXHJcbiAgICBHYW1lX1BhdXNlID0gMixcclxuICAgIEdhbWVfTG9zZSA9IDMsXHJcbiAgICBHYW1lX1dpbiA9IDQsXHJcbiAgICBHYW1lX1JvZ3VlbGlrZSA9IDVcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEZpZ2h0aW5nSW5mb3tcclxuICAgIC8qKuaAqueJqeS/oeaBr+WIl+ihqCAqL1xyXG4gICAgbW9uc3Rlcl9kYXRhczpUYWJsZU1vbnN0ZXJEYXRhW11bXT1bW11dO1xyXG4gICAgLyoq5qCH6aKY5ZCN56ewICovXHJcbiAgICB0aXRsZV9uYW1lOnN0cmluZz0nJztcclxuICAgIC8qKuiDjOaZr+WbvuWQjeensCAqL1xyXG4gICAgYmdfbmFtZTpzdHJpbmc9Jyc7XHJcbiAgICB3YWxsX25hbWU6c3RyaW5nPScnO1xyXG4gICAgLyoq5oCq54mp5oC75pWw6YePICovXHJcbiAgICB0b3RhbF9tb25zdGVyX251bTpudW1iZXI9MDtcclxuICAgIC8qKuaAqueJqea9ruaVsOaNriAqL1xyXG4gICAgd2F2ZV90eXBlczpudW1iZXJbXT1bXTtcclxuICAgIC8qKuaAqueJqeazouasoeeahOWIt+aWsOmXtOmalCAqL1xyXG4gICAgd2F2ZV9yZWZyZXNoX3RpbWU6bnVtYmVyW109W107XHJcbiAgICAvKirojrflj5bmgKrniankv6Hmga/liJfooajvvIjkuI3ph43lpI3nmoTvvIznlKjkuo7lh7rmiJjlsZXnpLrvvIkgKi9cclxuICAgIGdldE9ubHlNb25zdGVyRGF0YUxpc3QoKTpUYWJsZU1vbnN0ZXJEYXRhW117XHJcbiAgICAgICAgbGV0IG1vbnN0ZXJEYXRhcz1uZXcgQXJyYXk8VGFibGVNb25zdGVyRGF0YT4oKTtcclxuICAgICAgICBmb3IobGV0IG49MDsgbjx0aGlzLm1vbnN0ZXJfZGF0YXMubGVuZ3RoOyBuKyspe1xyXG4gICAgICAgICAgICBsZXQgZGF0YUFycj10aGlzLm1vbnN0ZXJfZGF0YXNbbl07XHJcbiAgICAgICAgICAgIGZvcihsZXQgYT0wOyBhPGRhdGFBcnIubGVuZ3RoOyBhKyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGE9Y2MuaW5zdGFudGlhdGUoZGF0YUFyclthXSk7XHJcbiAgICAgICAgICAgICAgICAvL+afpeaJvmlk5piv5ZCm5a2Y5ZyoXHJcbiAgICAgICAgICAgICAgICBsZXQgaWRJbmRleD0tMTtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgbT0wOyBtPG1vbnN0ZXJEYXRhcy5sZW5ndGg7IG0rKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYobW9uc3RlckRhdGFzW21dLmlkPT1kYXRhLmlkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWRJbmRleD1tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZihpZEluZGV4IT0tMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/lpoLmnpzlrZjlnKjvvIzliJnmr5TovoPnrYnnuqdcclxuICAgICAgICAgICAgICAgICAgICBpZihkYXRhLmxldmVsPm1vbnN0ZXJEYXRhc1tpZEluZGV4XS5sZXZlbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vbnN0ZXJEYXRhc1tpZEluZGV4XS5sZXZlbD1kYXRhLmxldmVsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb25zdGVyRGF0YXNbaWRJbmRleF0uc2NvcmU9ZGF0YS5zY29yZTtcclxuICAgICAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG1vbnN0ZXJEYXRhcy5wdXNoKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtb25zdGVyRGF0YXM7XHJcbiAgICB9XHJcbiAgICAvKirojrflj5bmgKrniannsbvlnovkv6Hmga/liJfooajvvIjkuI3ph43lpI3nmoTvvIzlj6rmnInnsbvlnovvvIznlKjkuo7muLjmiI/lhoXliqDovb3vvIkgKi9cclxuICAgIGdldE9ubHlNb25zdGVyVHlwZU1hcCgpOk1hcDxudW1iZXIsbnVtYmVyPntcclxuICAgICAgICBsZXQgbW9uc3RlclR5cGVzPW5ldyBNYXA8bnVtYmVyLG51bWJlcj4oKTtcclxuICAgICAgICBsZXQgTVNNPU1vbnN0ZXJDb25maWd1cmVNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgZm9yKGxldCBuPTA7IG48dGhpcy5tb25zdGVyX2RhdGFzLmxlbmd0aDsgbisrKXtcclxuICAgICAgICAgICAgbGV0IGRhdGFBcnI9dGhpcy5tb25zdGVyX2RhdGFzW25dO1xyXG4gICAgICAgICAgICBmb3IobGV0IGE9MDsgYTxkYXRhQXJyLmxlbmd0aDsgYSsrKXtcclxuICAgICAgICAgICAgICAgIGxldCBkYXRhPWNjLmluc3RhbnRpYXRlKGRhdGFBcnJbYV0pO1xyXG4gICAgICAgICAgICAgICAgLy/mn6Xmib7nsbvlnovmmK/lkKblrZjlnKhcclxuICAgICAgICAgICAgICAgIGxldCBqc29uRGF0YT1NU00uZ2V0SnNvbk1vbnN0ZXJDb25maWd1cmUoZGF0YS5pZCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgdHlwZT1qc29uRGF0YS5Nb25zdGVyQ2xhc3M7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3RyZW5ndGhUeXBlPWpzb25EYXRhLlN0cmVuZ3RoVHlwZTtcclxuICAgICAgICAgICAgICAgIGlmKG1vbnN0ZXJUeXBlcy5oYXModHlwZSkpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKG1vbnN0ZXJUeXBlcy5nZXQodHlwZSk8c3RyZW5ndGhUeXBlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9uc3RlclR5cGVzLnNldCh0eXBlLHN0cmVuZ3RoVHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgbW9uc3RlclR5cGVzLnNldCh0eXBlLHN0cmVuZ3RoVHlwZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcclxuICAgICAgICB9ICAgICAgICBcclxuICAgICAgICByZXR1cm4gbW9uc3RlclR5cGVzO1xyXG4gICAgfVxyXG4gICAgLyoq6I635Y+W5piv5ZCm5pyJQm9zc+WHuueOsCAqL1xyXG4gICAgZ2V0SXNIYXZlQm9zcygpOmJvb2xlYW57XHJcbiAgICAgICAgbGV0IE1TTT1Nb25zdGVyQ29uZmlndXJlTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIGZvcihsZXQgbj0wOyBuPHRoaXMubW9uc3Rlcl9kYXRhcy5sZW5ndGg7IG4rKyl7XHJcbiAgICAgICAgICAgIGxldCBkYXRhQXJyPXRoaXMubW9uc3Rlcl9kYXRhc1tuXTtcclxuICAgICAgICAgICAgZm9yKGxldCBhPTA7IGE8ZGF0YUFyci5sZW5ndGg7IGErKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGF0YT1jYy5pbnN0YW50aWF0ZShkYXRhQXJyW2FdKTtcclxuICAgICAgICAgICAgICAgIC8v5p+l5om+57G75Z6L5piv5ZCm5a2Y5ZyoXHJcbiAgICAgICAgICAgICAgICBsZXQgdHlwZT1NU00uZ2V0U3RyZW5ndGhUeXBlKGRhdGEuaWQpO1xyXG4gICAgICAgICAgICAgICAgaWYodHlwZT09U3RyZW5ndGhUeXBlLkJvc3Mpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIC8qKuiOt+WPluavj+azouaAqueJqeaYvuekuueahOmXqOmdoiwwOuaZrumAmu+8jDHvvJrmgKrnianmva4mYm9zcyAqL1xyXG4gICAgZ2V0V2F2ZVR5cGVzKCk6bnVtYmVyW117XHJcbiAgICAgICAgbGV0IGFycj1uZXcgQXJyYXk8bnVtYmVyPih0aGlzLm1vbnN0ZXJfZGF0YXMubGVuZ3RoKTtcclxuICAgICAgICAvL2xldCBNU009TW9uc3RlckNvbmZpZ3VyZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBmb3IobGV0IG49MDsgbjx0aGlzLm1vbnN0ZXJfZGF0YXMubGVuZ3RoOyBuKyspe1xyXG4gICAgICAgICAgICBhcnJbbl09MDtcclxuICAgICAgICAgICAgLy9sZXQgZGF0YUFycj10aGlzLm1vbnN0ZXJfZGF0YXNbbl07XHJcbiAgICAgICAgICAgIGlmKHRoaXMud2F2ZV90eXBlcy5pbmRleE9mKChuKzEpKSE9LTEpe1xyXG4gICAgICAgICAgICAgICAgYXJyW25dPTE7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBmb3IobGV0IGE9MDsgYTxkYXRhQXJyLmxlbmd0aDsgYSsrKXtcclxuICAgICAgICAgICAgLy8gICAgIGxldCBkYXRhPWNjLmluc3RhbnRpYXRlKGRhdGFBcnJbYV0pO1xyXG4gICAgICAgICAgICAvLyAgICAgLy/mn6Xmib7nsbvlnovmmK/lkKblrZjlnKhcclxuICAgICAgICAgICAgLy8gICAgIGxldCB0eXBlPU1TTS5nZXRTdHJlbmd0aFR5cGUoZGF0YS5pZCk7XHJcbiAgICAgICAgICAgIC8vICAgICBpZih0eXBlPT1TdHJlbmd0aFR5cGUuQm9zcyl7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgYXJyW25dPTE7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgLy/lpoLmnpzmnIlib3Nz77yM5piv5pyA5aSn55qE5LqG77yM5Y+v5Lul55u05o6l57uT5p2f5pys5rOi55qE5b6q546vXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAgIC8vIH0gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFycjtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGVudW0gRmlnaHRpbmdFZmZlY3RfVHlwZVxyXG57XHJcbiAgICBwYW9kYW5fYmFvemhhPTAsLy8wLjM1XHJcbiAgICB6aG9uZ2R1PTEsLy8wLjg1XHJcbiAgICBqdWppX2Jhb3poYT0yLC8vMC40M1xyXG4gICAgcGVuaHVvPTMsLy8wLjU3XHJcbiAgICB6aHVvc2hhbz00LC8vXHJcbiAgICBwZW5odW9fZGF6aGFvPTUsXHJcbiAgICBmZWliaWFvX2F0dD02LFxyXG4gICAgZW5lbXlfYWRkX2hwPTcsXHJcbiAgICBlbmVteV9qaWFzdT04LFxyXG4gICAgZW5lbXlfemVuZ2VfaHVpeHVlPTksXHJcbiAgICBlbmVteV93dWRpPTEwLFxyXG4gICAgc2hlc2hvdV9zaGVqaT0xMSxcclxuICAgIGVuZW15X2F0dD0xMixcclxufVxyXG5cclxuZXhwb3J0IGVudW0gSXRlbV9UeXBlIHtcclxuICAgIHJlc2V0PTAsXHJcbiAgICBqaWFuZ3VvID0gMSxcclxuICAgIHpoYWRhbiA9IDIsXHJcblxyXG4gICAgaXRlbV9udW1cclxufVxyXG5cclxuZXhwb3J0IGVudW0gWmhlbmdfWGluZ19UeXBlIHtcclxuICAgIFpYMD0wLFxyXG4gICAgWlgxLFxyXG4gICAgWlgyLFxyXG4gICAgWlgzLFxyXG4gICAgWlg0LFxyXG4gICAgWlg1LFxyXG4gICAgbnVtXHJcbn1cclxuXHJcbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqSE9NRSoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG5leHBvcnQgZW51bSBCdG5fSW5kZXgge1xyXG4gICAgQnRuX0NpdHkgPSAwLFxyXG4gICAgQnRuX1JvbGUgPSAxLFxyXG4gICAgQnRuX01haW4gPSAyLFxyXG4gICAgQnRuX1BldCA9IDMsXHJcbiAgICBCdG5fRnVCZW4gPSA0XHJcbiAgICBcclxufVxyXG5cclxuZXhwb3J0IGVudW0gSmlhblRvdV9UeXBle1xyXG4gICAgTEVGVCA9IDAsXHJcbiAgICBSSUdIVCA9IDEsXHJcbn1cclxuXHJcbmV4cG9ydCBsZXQgUkVEX1RJUF89XCJyZWRfdGlwX1wiO1xyXG5cclxuZXhwb3J0IGVudW0gUmVjZWl2ZV9JbmRleCB7XHJcbiAgICBCdG5fU2hvcCA9IDAsLy/llYblupfmjInpkq5cclxuICAgIEJ0bl9Sb2xlICwvL+inkuiJsuaMiemSrlxyXG4gICAgQnRuX1JvbGVfU2hlU2hvdSwvL+WwhOaJi+aMiemSrixcclxuICAgIEJ0bl9Sb2xlX1Bhb1Nob3UsLy/ngq7miYvmjInpkq4sXHJcbiAgICBCdG5fUm9sZV9KdUppU2hvdSwvL+eLmeWHu+aMiemSrixcclxuICAgIEJ0bl9Sb2xlX1Blbkh1b0JpbmcsLy/llrfngavmjInpkq4sXHJcbiAgICBCdG5fUm9sZV9SZW5aaGUsLy/lv43ogIXmjInpkq4sXHJcbiAgICBCdG5fUm9sZV9XdU52LC8v5ber5aWz5oyJ6ZKuLFxyXG4gICAgQnRuX1JvbGVfVXBncmFkZSwvL+WNh+e6p+aMiemSrixcclxuICAgIEJ0bl9Sb2xlX1Byb21vdGlvbiwvL+aZi+WNh+aMiemSrixcclxuICAgIEJ0bl9Sb2xlX01lcmdlLC8v5b+r6YCf5ZCI5oiQLFxyXG4gICAgQnRuX01haW4gLC8v5oiY5paX5oyJ6ZKuXHJcbiAgICBCdG5fTWFpbl9NaWxlc3RvbmUgLC8v6YeM56iL5oyJ6ZKuXHJcbiAgICBCdG5fTWFpbl9FbmVteUluZm8gLC8v5oCq54mp5Zu+6Ym05oyJ6ZKuXHJcbiAgICBCdG5fTWFpbl9TcGluICwvL+W5uOi/kOi9rOebmOaMiemSrlxyXG4gICAgQnRuX01haW5fVGFzayAsLy/ku7vliqHmjInpkq5cclxuICAgIEJ0bl9NYWluX1Rhc2tfVmlkZW9fMCAsLy/op4bpopHku7vliqHmjInpkq4wXHJcbiAgICBCdG5fTWFpbl9UYXNrX1ZpZGVvXzEgLC8v6KeG6aKR5Lu75Yqh5oyJ6ZKuMVxyXG4gICAgQnRuX01haW5fVGFza19WaWRlb18yICwvL+inhumikeS7u+WKoeaMiemSrjJcclxuICAgIEJ0bl9NYWluX1Rhc2tfVmlkZW9fMyAsLy/op4bpopHku7vliqHmjInpkq4zXHJcbiAgICBCdG5fTWFpbl9TaWduSW4gLC8v562+5Yiw5oyJ6ZKuXHJcbiAgICBCdG5fTWFpbl9HdWFqaSAsLy/mjILmnLrnpLzljIVcclxuICAgIEJ0bl9TcGluX1NwaW4gLC8v5bm46L+Q6L2s55uY5oyJ6ZKuXHJcbiAgICBCdG5fUGV0ICwvL+WuoOeJqeaMiemSrlxyXG4gICAgQnRuX0Z1QmVuICwvL+WJr+acrOaMiemSrlxyXG4gICAgQnRuX1JvbGVfU2tpbGwsLy/mioDog73mjInpkq5cclxuICAgIEJ0bl9NYWluX1JhbmssLy/mioDog73mjInpkq5cclxufVxyXG5cclxuZXhwb3J0IGVudW0gUmV3YXJkX1R5cGV7XHJcbiAgICBjb2luPTEsXHJcbiAgICBnZW09MixcclxuICAgIGVuZXJneT0zLFxyXG5cclxufVxyXG5cclxuZXhwb3J0IGVudW0gVmFsdWVUeXBle1xyXG4gICAgLyrml6DlkI7nvIAqL1xyXG4gICAgTm9uZT0wLFxyXG4gICAgLyrnmb7liIbmr5QqL1xyXG4gICAgUGVyY2VudD0xLFxyXG4gICAgLy/ljYPliIbmr5RcclxuICAgIFRob3VzYW5kdGhzPTIsXHJcbiAgICAvL+enklxyXG4gICAgU2Vjb25kPTMsXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIFZhbHVlVW5pdHtcclxuICAgIC8q5peg5ZCO57yAKi9cclxuICAgIE5vbmU9XCJcIixcclxuICAgIC8q55m+5YiG5q+UKi9cclxuICAgIFBlcmNlbnQ9XCIlXCIsXHJcbiAgICAvL+WNg+WIhuavlFxyXG4gICAgVGhvdXNhbmR0aHM9XCIlXCIsXHJcbiAgICAvL+enklxyXG4gICAgU2Vjb25kPVwic1wiLFxyXG59XHJcblxyXG5leHBvcnQgZW51bSBBZF9TdGF0ZXtcclxuICAgIE9uRXJyb3I9MCwvL+WKoOi9veWksei0pVxyXG4gICAgT25Mb2FkPTEsLy/liqDovb3miJDlip9cclxufTtcclxuZXhwb3J0IGxldCBNQVhfVklERU89MTA7XHJcbmV4cG9ydCBsZXQgTUFYX0xFVkVMPTUwO1xyXG5leHBvcnQgbGV0IE1BWF9IRVJPX0xFVkVMPTMwMDtcclxuZXhwb3J0IGxldCBNQVhfSEVST19RdWFsaXR5PTUwO1xyXG4vL+WPkeW4g+eahOW5s+WPsFxyXG5leHBvcnQgZW51bSBSZWxlYXNlX1BsYXRmb3JtIHtcclxuICAgIEFQSyA9IDAsXHJcbiAgICBDUEtfQ1kgPSAxLFxyXG4gICAgQ1BLX1dYID0gMixcclxuICAgIENQS19KS1cgPSAzLFxyXG4gICAgQ1BLX09QUE8gPSA0LFxyXG4gICAgQ1BLX1FRID0gNSxcclxuICAgIENQS19WSVZPID0gNixcclxuICAgIFdFQl9URVNUICxcclxufVxyXG5cclxuZXhwb3J0IGxldCBNQVhfRU5FUkdZPTIwO1xyXG5leHBvcnQgbGV0IE1BWF9NaWxpdGFyeT0xMDtcclxuZXhwb3J0IGxldCBDVVJfUGxhdGZvcm09UmVsZWFzZV9QbGF0Zm9ybS5BUEs7XHJcbmV4cG9ydCBsZXQgSXNEZWJ1Zz1mYWxzZTtcclxuZXhwb3J0IGxldCBJc1Rlc3RTZXJ2ZXI9dHJ1ZTtcclxuZXhwb3J0IGxldCBJc1NhdmVFcXVpcExvZz1mYWxzZTtcclxuZXhwb3J0IGxldCBKaWFTdT0xMDAwMDtcclxuZXhwb3J0IGxldCBTa2lsbFNwZWVkUmF0ZT0xMDtcclxuZXhwb3J0IGxldCBJc0dNPWZhbHNlO1xyXG5leHBvcnQgbGV0IElzVGVzdENvZGU9ZmFsc2U7XHJcbmV4cG9ydCBsZXQgbG9jYWxfdmVyc2lvbj1cIjEtOS0xXCI7XHJcbmV4cG9ydCBsZXQgQ3VyVmVyc2lvbkNvZGU9NDsvLzIwMjIxMjA5LS0tLS09M1xyXG4iXX0=