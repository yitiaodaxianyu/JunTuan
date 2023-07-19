"use strict";
cc._RF.push(module, 'c6c047m22NKo6EMnfPpMPmk', 'EnemyConfig');
// Scripts/Enemy/EnemyConfig.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WALL_Y = exports.Enemy_Back_Distance = exports.DiMian_Type = exports.BaoXiang_Anima = exports.Enemy_DeBuff_Type = exports.Enemy_Buff_Type = exports.Enemy_State = exports.Enemy_Injured_Type = exports.Enemy_Type = void 0;
var Enemy_Type;
(function (Enemy_Type) {
    Enemy_Type[Enemy_Type["baoxiang"] = 0] = "baoxiang";
    Enemy_Type[Enemy_Type["mengshe"] = 1] = "mengshe";
    Enemy_Type[Enemy_Type["jushiguai"] = 2] = "jushiguai";
    Enemy_Type[Enemy_Type["shuyao"] = 3] = "shuyao";
    Enemy_Type[Enemy_Type["fushubing"] = 4] = "fushubing";
    Enemy_Type[Enemy_Type["juxiejing"] = 5] = "juxiejing";
    Enemy_Type[Enemy_Type["zhizhu"] = 6] = "zhizhu";
    Enemy_Type[Enemy_Type["feiwen"] = 7] = "feiwen";
    Enemy_Type[Enemy_Type["munaiyi"] = 8] = "munaiyi";
    Enemy_Type[Enemy_Type["juxiejiang"] = 9] = "juxiejiang";
    Enemy_Type[Enemy_Type["xunjieshu"] = 10] = "xunjieshu";
    Enemy_Type[Enemy_Type["tiaotiao"] = 11] = "tiaotiao";
    Enemy_Type[Enemy_Type["nangua"] = 12] = "nangua";
    Enemy_Type[Enemy_Type["shuiyuansu"] = 13] = "shuiyuansu";
    Enemy_Type[Enemy_Type["zenge"] = 14] = "zenge";
    Enemy_Type[Enemy_Type["feiting"] = 15] = "feiting";
    Enemy_Type[Enemy_Type["wuweizhe"] = 16] = "wuweizhe";
    Enemy_Type[Enemy_Type["luxingsha"] = 17] = "luxingsha";
    Enemy_Type[Enemy_Type["niumo"] = 18] = "niumo";
    Enemy_Type[Enemy_Type["enemy_num"] = 19] = "enemy_num";
})(Enemy_Type = exports.Enemy_Type || (exports.Enemy_Type = {}));
var Enemy_Injured_Type;
(function (Enemy_Injured_Type) {
    //平A
    Enemy_Injured_Type[Enemy_Injured_Type["Normal_Attack"] = 0] = "Normal_Attack";
    //中毒
    Enemy_Injured_Type[Enemy_Injured_Type["ZhongDu"] = 1] = "ZhongDu";
    //会心
    Enemy_Injured_Type[Enemy_Injured_Type["HuiXin"] = 2] = "HuiXin";
    //爆头
    Enemy_Injured_Type[Enemy_Injured_Type["BaoTou"] = 3] = "BaoTou";
    //灼烧
    Enemy_Injured_Type[Enemy_Injured_Type["ZhuoShao"] = 4] = "ZhuoShao";
    //流血
    Enemy_Injured_Type[Enemy_Injured_Type["LiuXue"] = 5] = "LiuXue";
    //大树加血
    Enemy_Injured_Type[Enemy_Injured_Type["ZhiLiao"] = 6] = "ZhiLiao";
    //憎恶自己回血
    Enemy_Injured_Type[Enemy_Injured_Type["ZengE_HuiXue"] = 7] = "ZengE_HuiXue";
    //木乃伊的加血
    Enemy_Injured_Type[Enemy_Injured_Type["MuNaiYi_JiaXue"] = 8] = "MuNaiYi_JiaXue";
    //暴击
    Enemy_Injured_Type[Enemy_Injured_Type["BaoJi"] = 9] = "BaoJi";
    //斩杀
    Enemy_Injured_Type[Enemy_Injured_Type["WuDi"] = 10] = "WuDi";
    //格挡
    Enemy_Injured_Type[Enemy_Injured_Type["GeDang"] = 11] = "GeDang";
    //闪避
    Enemy_Injured_Type[Enemy_Injured_Type["ShanBi"] = 12] = "ShanBi";
    //眩晕
    Enemy_Injured_Type[Enemy_Injured_Type["XuanYun"] = 13] = "XuanYun";
    //技能
    Enemy_Injured_Type[Enemy_Injured_Type["Skill"] = 14] = "Skill";
    //城墙反伤
    Enemy_Injured_Type[Enemy_Injured_Type["Wall"] = 15] = "Wall";
    Enemy_Injured_Type[Enemy_Injured_Type["ChaoJiBaoTou"] = 16] = "ChaoJiBaoTou";
    /**免疫控制 */
    Enemy_Injured_Type[Enemy_Injured_Type["MianYiKongZhi"] = 17] = "MianYiKongZhi";
    /**冰女真伤 */
    Enemy_Injured_Type[Enemy_Injured_Type["BingNvZhenShang"] = 18] = "BingNvZhenShang";
    /**阿努比斯真伤 */
    Enemy_Injured_Type[Enemy_Injured_Type["ANuBiSiZhenShang"] = 19] = "ANuBiSiZhenShang";
})(Enemy_Injured_Type = exports.Enemy_Injured_Type || (exports.Enemy_Injured_Type = {}));
var Enemy_State;
(function (Enemy_State) {
    //待机
    Enemy_State[Enemy_State["standby"] = 0] = "standby";
    //移动
    Enemy_State[Enemy_State["move"] = 1] = "move";
    //攻击
    Enemy_State[Enemy_State["att"] = 2] = "att";
    //技能
    Enemy_State[Enemy_State["skill"] = 3] = "skill";
    //死亡
    Enemy_State[Enemy_State["die"] = 4] = "die";
    /**出生，此时是无敌的 */
    Enemy_State[Enemy_State["born"] = 5] = "born";
    //上船
    Enemy_State[Enemy_State["ship"] = 6] = "ship";
})(Enemy_State = exports.Enemy_State || (exports.Enemy_State = {}));
var Enemy_Buff_Type;
(function (Enemy_Buff_Type) {
    //闪避
    Enemy_Buff_Type[Enemy_Buff_Type["shanbi"] = 1] = "shanbi";
    //无敌
    Enemy_Buff_Type[Enemy_Buff_Type["wudi"] = 2] = "wudi";
    //挡子弹护盾
    Enemy_Buff_Type[Enemy_Buff_Type["hudun"] = 3] = "hudun";
    //加速
    Enemy_Buff_Type[Enemy_Buff_Type["jiasu"] = 4] = "jiasu";
})(Enemy_Buff_Type = exports.Enemy_Buff_Type || (exports.Enemy_Buff_Type = {}));
var Enemy_DeBuff_Type;
(function (Enemy_DeBuff_Type) {
    //中毒
    Enemy_DeBuff_Type[Enemy_DeBuff_Type["ZhongDu"] = 0] = "ZhongDu";
    //灼烧
    Enemy_DeBuff_Type[Enemy_DeBuff_Type["ZhuoShao"] = 1] = "ZhuoShao";
    //流血重伤
    Enemy_DeBuff_Type[Enemy_DeBuff_Type["ZhongShang"] = 2] = "ZhongShang";
    //眩晕
    Enemy_DeBuff_Type[Enemy_DeBuff_Type["XuanYun"] = 3] = "XuanYun";
    /**宠物8-减速 */
    Enemy_DeBuff_Type[Enemy_DeBuff_Type["JianSu_Pet_8"] = 4] = "JianSu_Pet_8";
    /**宠物12-减速 */
    Enemy_DeBuff_Type[Enemy_DeBuff_Type["JianSu_Pet_12"] = 5] = "JianSu_Pet_12";
    /**宠物16-减速 */
    Enemy_DeBuff_Type[Enemy_DeBuff_Type["JianSu_Pet_16"] = 6] = "JianSu_Pet_16";
    /**宠物16-减速 */
    Enemy_DeBuff_Type[Enemy_DeBuff_Type["JianSu_Pet_13"] = 7] = "JianSu_Pet_13";
    /**宠物15-流血 */
    Enemy_DeBuff_Type[Enemy_DeBuff_Type["LiuXue_Pet_15"] = 8] = "LiuXue_Pet_15";
    /**宠物16-中毒 */
    Enemy_DeBuff_Type[Enemy_DeBuff_Type["ZhongDu_Pet_16"] = 9] = "ZhongDu_Pet_16";
    /**宠物20-减速 */
    Enemy_DeBuff_Type[Enemy_DeBuff_Type["JianSu_Pet_20"] = 10] = "JianSu_Pet_20";
    /**宠物21-增伤 */
    Enemy_DeBuff_Type[Enemy_DeBuff_Type["ZengShang_Pet_21"] = 11] = "ZengShang_Pet_21";
    /**射手被动技能1暴击减速 */
    Enemy_DeBuff_Type[Enemy_DeBuff_Type["JianSu_SheShou_Skill1"] = 12] = "JianSu_SheShou_Skill1";
    /**忍者主动技能的流血效果 */
    Enemy_DeBuff_Type[Enemy_DeBuff_Type["LiuXue_RenZhe_Active_Skill"] = 13] = "LiuXue_RenZhe_Active_Skill";
    /**忍者专武减速的效果 */
    Enemy_DeBuff_Type[Enemy_DeBuff_Type["JianSu_RenZhe_EX_Skill"] = 14] = "JianSu_RenZhe_EX_Skill";
    /**巫女的被动流血效果 */
    Enemy_DeBuff_Type[Enemy_DeBuff_Type["LiuXue_WuNv_Ex_Skill"] = 15] = "LiuXue_WuNv_Ex_Skill";
})(Enemy_DeBuff_Type = exports.Enemy_DeBuff_Type || (exports.Enemy_DeBuff_Type = {}));
var BaoXiang_Anima;
(function (BaoXiang_Anima) {
    BaoXiang_Anima["beiji"] = "beiji";
    BaoXiang_Anima["bianxing"] = "bianxing";
    BaoXiang_Anima["close"] = "close";
    BaoXiang_Anima["daiji"] = "daiji";
    BaoXiang_Anima["gongji"] = "gongji";
    BaoXiang_Anima["pao"] = "pao";
    BaoXiang_Anima["siwang"] = "siwang";
})(BaoXiang_Anima = exports.BaoXiang_Anima || (exports.BaoXiang_Anima = {}));
var DiMian_Type;
(function (DiMian_Type) {
    DiMian_Type[DiMian_Type["paodan_tip"] = 0] = "paodan_tip";
})(DiMian_Type = exports.DiMian_Type || (exports.DiMian_Type = {}));
exports.Enemy_Back_Distance = 400;
exports.WALL_Y = -268;

cc._RF.pop();