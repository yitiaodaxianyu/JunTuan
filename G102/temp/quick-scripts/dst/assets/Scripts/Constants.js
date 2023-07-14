
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcQ29uc3RhbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLG9FQUEwRTtBQUMxRSxxREFBcUQ7QUFJckQsSUFBWSxVQUlYO0FBSkQsV0FBWSxVQUFVO0lBQ2xCLHlDQUFPLENBQUE7SUFDUCwyQ0FBUSxDQUFBO0lBQ1IsNkNBQVMsQ0FBQTtBQUNiLENBQUMsRUFKVyxVQUFVLEdBQVYsa0JBQVUsS0FBVixrQkFBVSxRQUlyQjtBQUVELElBQVksZ0JBS1g7QUFMRCxXQUFZLGdCQUFnQjtJQUN4QiwrREFBWSxDQUFBO0lBQ1osNkRBQVcsQ0FBQTtJQUNYLCtEQUFZLENBQUE7SUFDWiwyREFBVSxDQUFBO0FBQ2QsQ0FBQyxFQUxXLGdCQUFnQixHQUFoQix3QkFBZ0IsS0FBaEIsd0JBQWdCLFFBSzNCO0FBRUQsSUFBWSxPQTRCWDtBQTVCRCxXQUFZLE9BQU87SUFDZixVQUFVO0lBQ1YsMkNBQVMsQ0FBQTtJQUNULFNBQVM7SUFDVCxxQ0FBSSxDQUFBO0lBQ0osUUFBUTtJQUNSLHFDQUFJLENBQUE7SUFDSixXQUFXO0lBQ1gsK0NBQVMsQ0FBQTtJQUNULFlBQVk7SUFDWix5REFBYyxDQUFBO0lBQ2QsYUFBYTtJQUNiLHlEQUFjLENBQUE7SUFDZCxXQUFXO0lBQ1gsK0NBQVMsQ0FBQTtJQUNULFdBQVc7SUFDWCwrQ0FBUyxDQUFBO0lBQ1QsWUFBWTtJQUNaLCtDQUFTLENBQUE7SUFDVCxZQUFZO0lBQ1oscUNBQUksQ0FBQTtJQUNKLFNBQVM7SUFDVCw4Q0FBUSxDQUFBO0lBQ1IsOERBQWdCLENBQUE7SUFDaEIsd0RBQWEsQ0FBQTtJQUNiLHdEQUFhLENBQUE7SUFDYixrRUFBa0IsQ0FBQTtJQUNsQiwwQ0FBTSxDQUFBO0FBQ1YsQ0FBQyxFQTVCVyxPQUFPLEdBQVAsZUFBTyxLQUFQLGVBQU8sUUE0QmxCO0FBRUQsSUFBWSxRQWtDWDtBQWxDRCxXQUFZLFFBQVE7SUFDaEIsbURBQVksQ0FB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REFBVSxDQUFBO0lBQ1YsK0RBQVksQ0FBQTtJQUNaLCtEQUFRLENBQUE7QUFDWixDQUFDLEVBVFcsZ0JBQWdCLEdBQWhCLHdCQUFnQixLQUFoQix3QkFBZ0IsUUFTM0I7QUFFVSxRQUFBLFVBQVUsR0FBQyxFQUFFLENBQUM7QUFDZCxRQUFBLFlBQVksR0FBQyxFQUFFLENBQUM7QUFDaEIsUUFBQSxZQUFZLEdBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDO0FBQ2xDLFFBQUEsT0FBTyxHQUFDLEtBQUssQ0FBQztBQUNkLFFBQUEsWUFBWSxHQUFDLElBQUksQ0FBQztBQUNsQixRQUFBLGNBQWMsR0FBQyxLQUFLLENBQUM7QUFDckIsUUFBQSxLQUFLLEdBQUMsS0FBSyxDQUFDO0FBQ1osUUFBQSxjQUFjLEdBQUMsRUFBRSxDQUFDO0FBQ2xCLFFBQUEsSUFBSSxHQUFDLEtBQUssQ0FBQztBQUNYLFFBQUEsVUFBVSxHQUFDLEtBQUssQ0FBQztBQUNqQixRQUFBLGFBQWEsR0FBQyxPQUFPLENBQUM7QUFDdEIsUUFBQSxjQUFjLEdBQUMsQ0FBQyxDQUFDLENBQUEsaUJBQWlCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVGFibGVNb25zdGVyRGF0YSB9IGZyb20gXCIuL0xldmVsL01pc3Npb25MZXZlbFwiO1xyXG5pbXBvcnQgeyBNb25zdGVyQ29uZmlndXJlTWFuYWdlciB9IGZyb20gXCIuL01vbnN0ZXIvRGF0YS9Nb25zdGVyQ29uZmlndXJlXCI7XHJcbmltcG9ydCB7IFN0cmVuZ3RoVHlwZSB9IGZyb20gXCIuL01vbnN0ZXIvTW9uc3RlckRhdGFcIjtcclxuXHJcblxyXG5cclxuZXhwb3J0IGVudW0gVklERU9fVFlQRSB7XHJcbiAgICBHZW0gPSAwLFxyXG4gICAgQ29pbiA9IDEsXHJcbiAgICBFcXVpcCA9IDIsXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIElOVEVSX1ZJREVPX1RZUEUge1xyXG4gICAgWmh1YW5wYW4gPSAwLFxyXG4gICAgSHVvZG9uZyA9IDEsXHJcbiAgICBCYW94aWFuZyA9IDIsXHJcbiAgICBaaXl1YW4gPSAzLFxyXG59XHJcblxyXG5leHBvcnQgZW51bSBHb19UeXBle1xyXG4gICAgLyoq5a6g54mp5YiX6KGoICovXHJcbiAgICBQZXRMaXN0PTAsXHJcbiAgICAvKirop5LoibLpobUgKi9cclxuICAgIFJvbGUsXHJcbiAgICAvKirkuLvpobUgKi9cclxuICAgIE1haW4sXHJcbiAgICAvKirkuLvpobUt5Lu75YqhICovXHJcbiAgICBNYWluX1Rhc2ssXHJcbiAgICAvKirkuLvpobUt6YeM56iL56KRICovXHJcbiAgICBNYWluX01pbGVzdG9uZSxcclxuICAgIC8qKuS4u+mhtS3mgKrnianlm77pibQgKi9cclxuICAgIE1haW5fRW5lbXlJbmZvLFxyXG4gICAgLyoq5Li76aG1Lei9rOebmCAqL1xyXG4gICAgTWFpbl9TcGluLFxyXG4gICAgLyoq5Li76aG1LeetvuWIsCAqL1xyXG4gICAgTWFpbl9TaWduLFxyXG4gICAgLyoq5Li76aG1LeaOkuihjOamnCAqL1xyXG4gICAgTWFpbl9SYW5rLFxyXG4gICAgLyoq5Li75Z+O77yI5ZWG5Z+O77yJICovXHJcbiAgICBDaXR5LFxyXG4gICAgLyoq5Ymv5pys6aG1ICovXHJcbiAgICBBY3Rpdml0eSwgICAgXHJcbiAgICBBY3Rpdml0eV9FbmRsZXNzLFxyXG4gICAgQWN0aXZpdHlfQm9zcyxcclxuICAgIEFjdGl2aXR5X01hemUsLy/omZrnqbrog5zliKnnlYzpnaJcclxuICAgIEFjdGl2aXR5X01hemVfbG9zZSwvL+iZmuepuuWksei0peeVjOmdolxyXG4gICAgR29fTnVtLFxyXG59XHJcblxyXG5leHBvcnQgZW51bSBGdW5jVHlwZXtcclxuICAgIExpQ2hlbmdCZWk9MSxcclxuICAgIEd1YWlXdVR1Smlhbj0yLFxyXG4gICAgLy8gWGluZ1l1blpodWFuUGFuPTMsXHJcbiAgICBNZWlSaVJlbld1PTQsXHJcbiAgICBRaWFuRGFvPTUsXHJcbiAgICBaaHVhbmdCZWlIZUNoZW5nPTYsXHJcbiAgICBDaGVuZ0Jhb1lhbmdDaGVuZz03LFxyXG4gICAgVGlhbkZ1PTgsXHJcbiAgICBQYWlIYW5nQmFuZz05LFxyXG4gICAgR2VSZW5Cb3NzPTEwLFxyXG4gICAgU2hpSmllQm9zcz0xMSwvL0Jvc3PmjJHmiJhcclxuICAgIFd1SmluVGlhb1poYW49MTIsLy/ml6DlsL3mjJHmiJhcclxuICAgIFBhVGE9MTMsXHJcbiAgICBGYW5MaT0xNCxcclxuICAgIExpQmFvPTE1LFxyXG4gICAgWmhhbkxpbmc9MTYsXHJcbiAgICBaaG91TGlCYW89MTcsXHJcbiAgICBTaGVuZ3RhbmcgPSAxOCxcclxuICAgIFh1WXVhbkNoaSA9IDE5LFxyXG4gICAgTG9uZ0NoYW8gPSAyMCxcclxuICAgIFNoYW5nRGlhbiA9IDIxLFxyXG4gICAgVGllSmlhbmdQdSA9IDIyLFxyXG4gICAgQ2hvbmdXdVhpVG9uZyA9IDIzLFxyXG4gICAgTWlHb25nPTI0LC8v5Yaw5rKz5o6i6ZmpXHJcbiAgICBOZWlHb3U9MjUsXHJcbiAgICBGaXJzdENoYXJnZSA9IDI2LFxyXG4gICAgWmh1YW5QYW4gPSAzLFxyXG4gICAgVklQID0gMjksXHJcbiAgICBBY2N1bXVsYXRlZFJlY2hhcmdlID0gMzAsXHJcbiAgICBXZWVrQ2FyZCA9IDMxLFxyXG4gICAgUGV0UGFyYWRpc2UgPSAzMixcclxuXHJcbiAgICBOdW0sXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIEF0dGFjaF9GcnVpdF9UeXBlIHtcclxuICAgIE5vbmUgPSAwLC8v5peg6YGT5YW3XHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIFNlbGVjdFNraWxsX1R5cGVcclxue1xyXG4gICAgLy/mlLvlh7vmrKHmlbBcclxuICAgIEdvbmdKaV9DaVNodTE9MCxcclxuICAgIEdvbmdKaV9DaVNodTI9MSxcclxuICAgIC8v5pS75Ye75YqbXHJcbiAgICBHb25nSmlfTGkxPTIsXHJcbiAgICBHb25nSmlfTGkyPTMsXHJcbiAgICAvL+aUu+WHu+mAn+W6plxyXG4gICAgR29uZ0ppX1N1RHUxPTQsXHJcbiAgICBHb25nSmlfU3VEdTI9NSxcclxuICAgIC8v5pq05Ye7546HXHJcbiAgICBCYW9KaV9MdjE9NixcclxuICAgIEJhb0ppX0x2Mj03LFxyXG4gICAgLy/mmrTlh7vkvKTlrrNcclxuICAgIEJhb0ppX1NoYW5nSGFpMT04LFxyXG4gICAgQmFvSmlfU2hhbmdIYWkyPTksXHJcblxyXG4gICAgU2tpbGxfTnVtXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIFRleHRfVHlwZSB7XHJcbiAgICB3aGl0ZSA9IDAsXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIEdhbWVTY2VuZSB7XHJcbiAgICBob21lID0gJ2hvbWUnLFxyXG4gICAgZ2FtZSA9ICdnYW1lJyxcclxuICAgIGxvYWQgPSAnbG9hZCcsXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIEdhbWVNb2Rle1xyXG4gICAgTWFpbj0xLFxyXG4gICAgRW5kbGVzcywvL+aXoOWwvVxyXG4gICAgQm9zc19DaGFsbGVuZ2UsLy9ib3Nz5oyR5oiYXHJcbiAgICBCb3NzX1dvcmxkLFxyXG4gICAgVG93ZXIsXHJcbiAgICBNYXplLC8v6Jma56m66KOC57ydXHJcblxyXG4gICAgTnVtLFxyXG59XHJcblxyXG5leHBvcnQgZW51bSBHYW1lU3RhdGUge1xyXG4gICAgR2FtZV9SZWFkeSA9IDAsXHJcbiAgICBHYW1lX1BsYXlpbmcgPSAxLFxyXG4gICAgR2FtZV9QYXVzZSA9IDIsXHJcbiAgICBHYW1lX0xvc2UgPSAzLFxyXG4gICAgR2FtZV9XaW4gPSA0XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBGaWdodGluZ0luZm97XHJcbiAgICAvKirmgKrniankv6Hmga/liJfooaggKi9cclxuICAgIG1vbnN0ZXJfZGF0YXM6VGFibGVNb25zdGVyRGF0YVtdW109W1tdXTtcclxuICAgIC8qKuagh+mimOWQjeensCAqL1xyXG4gICAgdGl0bGVfbmFtZTpzdHJpbmc9Jyc7XHJcbiAgICAvKirog4zmma/lm77lkI3np7AgKi9cclxuICAgIGJnX25hbWU6c3RyaW5nPScnO1xyXG4gICAgd2FsbF9uYW1lOnN0cmluZz0nJztcclxuICAgIC8qKuaAqueJqeaAu+aVsOmHjyAqL1xyXG4gICAgdG90YWxfbW9uc3Rlcl9udW06bnVtYmVyPTA7XHJcbiAgICAvKirmgKrnianmva7mlbDmja4gKi9cclxuICAgIHdhdmVfdHlwZXM6bnVtYmVyW109W107XHJcbiAgICAvKirmgKrnianms6LmrKHnmoTliLfmlrDpl7TpmpQgKi9cclxuICAgIHdhdmVfcmVmcmVzaF90aW1lOm51bWJlcltdPVtdO1xyXG4gICAgLyoq6I635Y+W5oCq54mp5L+h5oGv5YiX6KGo77yI5LiN6YeN5aSN55qE77yM55So5LqO5Ye65oiY5bGV56S677yJICovXHJcbiAgICBnZXRPbmx5TW9uc3RlckRhdGFMaXN0KCk6VGFibGVNb25zdGVyRGF0YVtde1xyXG4gICAgICAgIGxldCBtb25zdGVyRGF0YXM9bmV3IEFycmF5PFRhYmxlTW9uc3RlckRhdGE+KCk7XHJcbiAgICAgICAgZm9yKGxldCBuPTA7IG48dGhpcy5tb25zdGVyX2RhdGFzLmxlbmd0aDsgbisrKXtcclxuICAgICAgICAgICAgbGV0IGRhdGFBcnI9dGhpcy5tb25zdGVyX2RhdGFzW25dO1xyXG4gICAgICAgICAgICBmb3IobGV0IGE9MDsgYTxkYXRhQXJyLmxlbmd0aDsgYSsrKXtcclxuICAgICAgICAgICAgICAgIGxldCBkYXRhPWNjLmluc3RhbnRpYXRlKGRhdGFBcnJbYV0pO1xyXG4gICAgICAgICAgICAgICAgLy/mn6Xmib5pZOaYr+WQpuWtmOWcqFxyXG4gICAgICAgICAgICAgICAgbGV0IGlkSW5kZXg9LTE7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IG09MDsgbTxtb25zdGVyRGF0YXMubGVuZ3RoOyBtKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKG1vbnN0ZXJEYXRhc1ttXS5pZD09ZGF0YS5pZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkSW5kZXg9bTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYoaWRJbmRleCE9LTEpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5aaC5p6c5a2Y5Zyo77yM5YiZ5q+U6L6D562J57qnXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZGF0YS5sZXZlbD5tb25zdGVyRGF0YXNbaWRJbmRleF0ubGV2ZWwpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb25zdGVyRGF0YXNbaWRJbmRleF0ubGV2ZWw9ZGF0YS5sZXZlbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9uc3RlckRhdGFzW2lkSW5kZXhdLnNjb3JlPWRhdGEuc2NvcmU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBtb25zdGVyRGF0YXMucHVzaChkYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbW9uc3RlckRhdGFzO1xyXG4gICAgfVxyXG4gICAgLyoq6I635Y+W5oCq54mp57G75Z6L5L+h5oGv5YiX6KGo77yI5LiN6YeN5aSN55qE77yM5Y+q5pyJ57G75Z6L77yM55So5LqO5ri45oiP5YaF5Yqg6L2977yJICovXHJcbiAgICBnZXRPbmx5TW9uc3RlclR5cGVNYXAoKTpNYXA8bnVtYmVyLG51bWJlcj57XHJcbiAgICAgICAgbGV0IG1vbnN0ZXJUeXBlcz1uZXcgTWFwPG51bWJlcixudW1iZXI+KCk7XHJcbiAgICAgICAgbGV0IE1TTT1Nb25zdGVyQ29uZmlndXJlTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIGZvcihsZXQgbj0wOyBuPHRoaXMubW9uc3Rlcl9kYXRhcy5sZW5ndGg7IG4rKyl7XHJcbiAgICAgICAgICAgIGxldCBkYXRhQXJyPXRoaXMubW9uc3Rlcl9kYXRhc1tuXTtcclxuICAgICAgICAgICAgZm9yKGxldCBhPTA7IGE8ZGF0YUFyci5sZW5ndGg7IGErKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGF0YT1jYy5pbnN0YW50aWF0ZShkYXRhQXJyW2FdKTtcclxuICAgICAgICAgICAgICAgIC8v5p+l5om+57G75Z6L5piv5ZCm5a2Y5ZyoXHJcbiAgICAgICAgICAgICAgICBsZXQganNvbkRhdGE9TVNNLmdldEpzb25Nb25zdGVyQ29uZmlndXJlKGRhdGEuaWQpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHR5cGU9anNvbkRhdGEuTW9uc3RlckNsYXNzO1xyXG4gICAgICAgICAgICAgICAgbGV0IHN0cmVuZ3RoVHlwZT1qc29uRGF0YS5TdHJlbmd0aFR5cGU7XHJcbiAgICAgICAgICAgICAgICBpZihtb25zdGVyVHlwZXMuaGFzKHR5cGUpKXtcclxuICAgICAgICAgICAgICAgICAgICBpZihtb25zdGVyVHlwZXMuZ2V0KHR5cGUpPHN0cmVuZ3RoVHlwZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vbnN0ZXJUeXBlcy5zZXQodHlwZSxzdHJlbmd0aFR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIG1vbnN0ZXJUeXBlcy5zZXQodHlwZSxzdHJlbmd0aFR5cGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgXHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIG1vbnN0ZXJUeXBlcztcclxuICAgIH1cclxuICAgIC8qKuiOt+WPluaYr+WQpuaciUJvc3Plh7rnjrAgKi9cclxuICAgIGdldElzSGF2ZUJvc3MoKTpib29sZWFue1xyXG4gICAgICAgIGxldCBNU009TW9uc3RlckNvbmZpZ3VyZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBmb3IobGV0IG49MDsgbjx0aGlzLm1vbnN0ZXJfZGF0YXMubGVuZ3RoOyBuKyspe1xyXG4gICAgICAgICAgICBsZXQgZGF0YUFycj10aGlzLm1vbnN0ZXJfZGF0YXNbbl07XHJcbiAgICAgICAgICAgIGZvcihsZXQgYT0wOyBhPGRhdGFBcnIubGVuZ3RoOyBhKyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGE9Y2MuaW5zdGFudGlhdGUoZGF0YUFyclthXSk7XHJcbiAgICAgICAgICAgICAgICAvL+afpeaJvuexu+Wei+aYr+WQpuWtmOWcqFxyXG4gICAgICAgICAgICAgICAgbGV0IHR5cGU9TVNNLmdldFN0cmVuZ3RoVHlwZShkYXRhLmlkKTtcclxuICAgICAgICAgICAgICAgIGlmKHR5cGU9PVN0cmVuZ3RoVHlwZS5Cb3NzKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICAvKirojrflj5bmr4/ms6LmgKrnianmmL7npLrnmoTpl6jpnaIsMDrmma7pgJrvvIwx77ya5oCq54mp5r2uJmJvc3MgKi9cclxuICAgIGdldFdhdmVUeXBlcygpOm51bWJlcltde1xyXG4gICAgICAgIGxldCBhcnI9bmV3IEFycmF5PG51bWJlcj4odGhpcy5tb25zdGVyX2RhdGFzLmxlbmd0aCk7XHJcbiAgICAgICAgLy9sZXQgTVNNPU1vbnN0ZXJDb25maWd1cmVNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgZm9yKGxldCBuPTA7IG48dGhpcy5tb25zdGVyX2RhdGFzLmxlbmd0aDsgbisrKXtcclxuICAgICAgICAgICAgYXJyW25dPTA7XHJcbiAgICAgICAgICAgIC8vbGV0IGRhdGFBcnI9dGhpcy5tb25zdGVyX2RhdGFzW25dO1xyXG4gICAgICAgICAgICBpZih0aGlzLndhdmVfdHlwZXMuaW5kZXhPZigobisxKSkhPS0xKXtcclxuICAgICAgICAgICAgICAgIGFycltuXT0xO1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gZm9yKGxldCBhPTA7IGE8ZGF0YUFyci5sZW5ndGg7IGErKyl7XHJcbiAgICAgICAgICAgIC8vICAgICBsZXQgZGF0YT1jYy5pbnN0YW50aWF0ZShkYXRhQXJyW2FdKTtcclxuICAgICAgICAgICAgLy8gICAgIC8v5p+l5om+57G75Z6L5piv5ZCm5a2Y5ZyoXHJcbiAgICAgICAgICAgIC8vICAgICBsZXQgdHlwZT1NU00uZ2V0U3RyZW5ndGhUeXBlKGRhdGEuaWQpO1xyXG4gICAgICAgICAgICAvLyAgICAgaWYodHlwZT09U3RyZW5ndGhUeXBlLkJvc3Mpe1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIGFycltuXT0xO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIC8v5aaC5p6c5pyJYm9zc++8jOaYr+acgOWkp+eahOS6hu+8jOWPr+S7peebtOaOpee7k+adn+acrOazoueahOW+queOr1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgICAgICAvLyB9ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhcnI7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIEZpZ2h0aW5nRWZmZWN0X1R5cGVcclxue1xyXG4gICAgcGFvZGFuX2Jhb3poYT0wLC8vMC4zNVxyXG4gICAgemhvbmdkdT0xLC8vMC44NVxyXG4gICAganVqaV9iYW96aGE9MiwvLzAuNDNcclxuICAgIHBlbmh1bz0zLC8vMC41N1xyXG4gICAgemh1b3NoYW89NCwvL1xyXG4gICAgcGVuaHVvX2Rhemhhbz01LFxyXG4gICAgZmVpYmlhb19hdHQ9NixcclxuICAgIGVuZW15X2FkZF9ocD03LFxyXG4gICAgZW5lbXlfamlhc3U9OCxcclxuICAgIGVuZW15X3plbmdlX2h1aXh1ZT05LFxyXG4gICAgZW5lbXlfd3VkaT0xMCxcclxuICAgIHNoZXNob3Vfc2hlamk9MTEsXHJcbiAgICBlbmVteV9hdHQ9MTIsXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIEl0ZW1fVHlwZSB7XHJcbiAgICByZXNldD0wLFxyXG4gICAgamlhbmd1byA9IDEsXHJcbiAgICB6aGFkYW4gPSAyLFxyXG5cclxuICAgIGl0ZW1fbnVtXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIFpoZW5nX1hpbmdfVHlwZSB7XHJcbiAgICBaWDA9MCxcclxuICAgIFpYMSxcclxuICAgIFpYMixcclxuICAgIFpYMyxcclxuICAgIFpYNCxcclxuICAgIFpYNSxcclxuICAgIG51bVxyXG59XHJcblxyXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKkhPTUUqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuZXhwb3J0IGVudW0gQnRuX0luZGV4IHtcclxuICAgIEJ0bl9DaXR5ID0gMCxcclxuICAgIEJ0bl9Sb2xlID0gMSxcclxuICAgIEJ0bl9NYWluID0gMixcclxuICAgIEJ0bl9QZXQgPSAzLFxyXG4gICAgQnRuX0Z1QmVuID0gNFxyXG4gICAgXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIEppYW5Ub3VfVHlwZXtcclxuICAgIExFRlQgPSAwLFxyXG4gICAgUklHSFQgPSAxLFxyXG59XHJcblxyXG5leHBvcnQgbGV0IFJFRF9USVBfPVwicmVkX3RpcF9cIjtcclxuXHJcbmV4cG9ydCBlbnVtIFJlY2VpdmVfSW5kZXgge1xyXG4gICAgQnRuX1Nob3AgPSAwLC8v5ZWG5bqX5oyJ6ZKuXHJcbiAgICBCdG5fUm9sZSAsLy/op5LoibLmjInpkq5cclxuICAgIEJ0bl9Sb2xlX1NoZVNob3UsLy/lsITmiYvmjInpkq4sXHJcbiAgICBCdG5fUm9sZV9QYW9TaG91LC8v54Ku5omL5oyJ6ZKuLFxyXG4gICAgQnRuX1JvbGVfSnVKaVNob3UsLy/ni5nlh7vmjInpkq4sXHJcbiAgICBCdG5fUm9sZV9QZW5IdW9CaW5nLC8v5Za354Gr5oyJ6ZKuLFxyXG4gICAgQnRuX1JvbGVfUmVuWmhlLC8v5b+N6ICF5oyJ6ZKuLFxyXG4gICAgQnRuX1JvbGVfV3VOdiwvL+W3q+Wls+aMiemSrixcclxuICAgIEJ0bl9Sb2xlX1VwZ3JhZGUsLy/ljYfnuqfmjInpkq4sXHJcbiAgICBCdG5fUm9sZV9Qcm9tb3Rpb24sLy/mmYvljYfmjInpkq4sXHJcbiAgICBCdG5fUm9sZV9NZXJnZSwvL+W/q+mAn+WQiOaIkCxcclxuICAgIEJ0bl9NYWluICwvL+aImOaWl+aMiemSrlxyXG4gICAgQnRuX01haW5fTWlsZXN0b25lICwvL+mHjOeoi+aMiemSrlxyXG4gICAgQnRuX01haW5fRW5lbXlJbmZvICwvL+aAqueJqeWbvumJtOaMiemSrlxyXG4gICAgQnRuX01haW5fU3BpbiAsLy/lubjov5Dovaznm5jmjInpkq5cclxuICAgIEJ0bl9NYWluX1Rhc2sgLC8v5Lu75Yqh5oyJ6ZKuXHJcbiAgICBCdG5fTWFpbl9UYXNrX1ZpZGVvXzAgLC8v6KeG6aKR5Lu75Yqh5oyJ6ZKuMFxyXG4gICAgQnRuX01haW5fVGFza19WaWRlb18xICwvL+inhumikeS7u+WKoeaMiemSrjFcclxuICAgIEJ0bl9NYWluX1Rhc2tfVmlkZW9fMiAsLy/op4bpopHku7vliqHmjInpkq4yXHJcbiAgICBCdG5fTWFpbl9UYXNrX1ZpZGVvXzMgLC8v6KeG6aKR5Lu75Yqh5oyJ6ZKuM1xyXG4gICAgQnRuX01haW5fU2lnbkluICwvL+etvuWIsOaMiemSrlxyXG4gICAgQnRuX01haW5fR3VhamkgLC8v5oyC5py656S85YyFXHJcbiAgICBCdG5fU3Bpbl9TcGluICwvL+W5uOi/kOi9rOebmOaMiemSrlxyXG4gICAgQnRuX1BldCAsLy/lrqDnianmjInpkq5cclxuICAgIEJ0bl9GdUJlbiAsLy/lia/mnKzmjInpkq5cclxuICAgIEJ0bl9Sb2xlX1NraWxsLC8v5oqA6IO95oyJ6ZKuXHJcbiAgICBCdG5fTWFpbl9SYW5rLC8v5oqA6IO95oyJ6ZKuXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIFJld2FyZF9UeXBle1xyXG4gICAgY29pbj0xLFxyXG4gICAgZ2VtPTIsXHJcbiAgICBlbmVyZ3k9MyxcclxuXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIFZhbHVlVHlwZXtcclxuICAgIC8q5peg5ZCO57yAKi9cclxuICAgIE5vbmU9MCxcclxuICAgIC8q55m+5YiG5q+UKi9cclxuICAgIFBlcmNlbnQ9MSxcclxuICAgIC8v5Y2D5YiG5q+UXHJcbiAgICBUaG91c2FuZHRocz0yLFxyXG4gICAgLy/np5JcclxuICAgIFNlY29uZD0zLFxyXG59XHJcblxyXG5leHBvcnQgZW51bSBWYWx1ZVVuaXR7XHJcbiAgICAvKuaXoOWQjue8gCovXHJcbiAgICBOb25lPVwiXCIsXHJcbiAgICAvKueZvuWIhuavlCovXHJcbiAgICBQZXJjZW50PVwiJVwiLFxyXG4gICAgLy/ljYPliIbmr5RcclxuICAgIFRob3VzYW5kdGhzPVwiJVwiLFxyXG4gICAgLy/np5JcclxuICAgIFNlY29uZD1cInNcIixcclxufVxyXG5cclxuZXhwb3J0IGVudW0gQWRfU3RhdGV7XHJcbiAgICBPbkVycm9yPTAsLy/liqDovb3lpLHotKVcclxuICAgIE9uTG9hZD0xLC8v5Yqg6L295oiQ5YqfXHJcbn07XHJcbmV4cG9ydCBsZXQgTUFYX1ZJREVPPTEwO1xyXG5leHBvcnQgbGV0IE1BWF9MRVZFTD01MDtcclxuZXhwb3J0IGxldCBNQVhfSEVST19MRVZFTD0zMDA7XHJcbmV4cG9ydCBsZXQgTUFYX0hFUk9fUXVhbGl0eT01MDtcclxuLy/lj5HluIPnmoTlubPlj7BcclxuZXhwb3J0IGVudW0gUmVsZWFzZV9QbGF0Zm9ybSB7XHJcbiAgICBBUEsgPSAwLFxyXG4gICAgQ1BLX0NZID0gMSxcclxuICAgIENQS19XWCA9IDIsXHJcbiAgICBDUEtfSktXID0gMyxcclxuICAgIENQS19PUFBPID0gNCxcclxuICAgIENQS19RUSA9IDUsXHJcbiAgICBDUEtfVklWTyA9IDYsXHJcbiAgICBXRUJfVEVTVCAsXHJcbn1cclxuXHJcbmV4cG9ydCBsZXQgTUFYX0VORVJHWT0yMDtcclxuZXhwb3J0IGxldCBNQVhfTWlsaXRhcnk9MTA7XHJcbmV4cG9ydCBsZXQgQ1VSX1BsYXRmb3JtPVJlbGVhc2VfUGxhdGZvcm0uQVBLO1xyXG5leHBvcnQgbGV0IElzRGVidWc9ZmFsc2U7XHJcbmV4cG9ydCBsZXQgSXNUZXN0U2VydmVyPXRydWU7XHJcbmV4cG9ydCBsZXQgSXNTYXZlRXF1aXBMb2c9ZmFsc2U7XHJcbmV4cG9ydCBsZXQgSmlhU3U9MTAwMDA7XHJcbmV4cG9ydCBsZXQgU2tpbGxTcGVlZFJhdGU9MTA7XHJcbmV4cG9ydCBsZXQgSXNHTT1mYWxzZTtcclxuZXhwb3J0IGxldCBJc1Rlc3RDb2RlPWZhbHNlO1xyXG5leHBvcnQgbGV0IGxvY2FsX3ZlcnNpb249XCIxLTktMVwiO1xyXG5leHBvcnQgbGV0IEN1clZlcnNpb25Db2RlPTQ7Ly8yMDIyMTIwOS0tLS0tPTNcclxuIl19