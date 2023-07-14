
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Enemy/EnemyConfig.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcRW5lbXlcXEVuZW15Q29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQVksVUF3Qlg7QUF4QkQsV0FBWSxVQUFVO0lBRWxCLG1EQUFVLENBQUE7SUFDVixpREFBUyxDQUFBO0lBQ1QscURBQVcsQ0FBQTtJQUNYLCtDQUFRLENBQUE7SUFDUixxREFBVyxDQUFBO0lBQ1gscURBQVcsQ0FBQTtJQUNYLCtDQUFRLENBQUE7SUFDUiwrQ0FBUSxDQUFBO0lBQ1IsaURBQVMsQ0FBQTtJQUNULHVEQUFZLENBQUE7SUFDWixzREFBWSxDQUFBO0lBQ1osb0RBQVcsQ0FBQTtJQUNYLGdEQUFTLENBQUE7SUFDVCx3REFBYSxDQUFBO0lBQ2IsOENBQVEsQ0FBQTtJQUNSLGtEQUFVLENBQUE7SUFDVixvREFBVyxDQUFBO0lBQ1gsc0RBQVksQ0FBQTtJQUNaLDhDQUFLLENBQUE7SUFFTCxzREFBUyxDQUFBO0FBRWIsQ0FBQyxFQXhCVyxVQUFVLEdBQVYsa0JBQVUsS0FBVixrQkFBVSxRQXdCckI7QUFFRCxJQUFZLGtCQXdDWDtBQXhDRCxXQUFZLGtCQUFrQjtJQUMxQixJQUFJO0lBQ0osNkVBQWUsQ0FBQTtJQUNmLElBQUk7SUFDSixpRUFBUyxDQUFBO0lBQ1QsSUFBSTtJQUNKLCtEQUFRLENBQUE7SUFDUixJQUFJO0lBQ0osK0RBQVEsQ0FBQTtJQUNSLElBQUk7SUFDSixtRUFBVSxDQUFBO0lBQ1YsSUFBSTtJQUNKLCtEQUFRLENBQUE7SUFDUixNQUFNO0lBQ04saUVBQVMsQ0FBQTtJQUNULFFBQVE7SUFDUiwyRUFBYyxDQUFBO0lBQ2QsUUFBUTtJQUNSLCtFQUFnQixDQUFBO0lBQ2hCLElBQUk7SUFDSiw2REFBTyxDQUFBO0lBQ1AsSUFBSTtJQUNKLDREQUFPLENBQUE7SUFDUCxJQUFJO0lBQ0osZ0VBQVMsQ0FBQTtJQUNULElBQUk7SUFDSixnRUFBUyxDQUFBO0lBQ1QsSUFBSTtJQUNKLGtFQUFVLENBQUE7SUFDVixJQUFJO0lBQ0osOERBQVEsQ0FBQTtJQUNSLE1BQU07SUFDTiw0REFBSSxDQUFBO0lBQ0osNEVBQVksQ0FBQTtJQUNaLFVBQVU7SUFDViw4RUFBYSxDQUFBO0lBQ2IsVUFBVTtJQUNWLGtGQUFlLENBQUE7SUFDZixZQUFZO0lBQ1osb0ZBQWdCLENBQUE7QUFDcEIsQ0FBQyxFQXhDVyxrQkFBa0IsR0FBbEIsMEJBQWtCLEtBQWxCLDBCQUFrQixRQXdDN0I7QUFFRCxJQUFZLFdBY1g7QUFkRCxXQUFZLFdBQVc7SUFFbkIsSUFBSTtJQUNKLG1EQUFXLENBQUE7SUFDWCxJQUFJO0lBQ0osNkNBQVEsQ0FBQTtJQUNSLElBQUk7SUFDSiwyQ0FBTyxDQUFBO0lBQ1AsSUFBSTtJQUNKLCtDQUFTLENBQUE7SUFDVCxJQUFJO0lBQ0osMkNBQU8sQ0FBQTtJQUNQLGVBQWU7SUFDZiw2Q0FBSSxDQUFBO0FBQ1IsQ0FBQyxFQWRXLFdBQVcsR0FBWCxtQkFBVyxLQUFYLG1CQUFXLFFBY3RCO0FBRUQsSUFBWSxlQVVYO0FBVkQsV0FBWSxlQUFlO0lBRXZCLElBQUk7SUFDSix5REFBUSxDQUFBO0lBQ1IsSUFBSTtJQUNKLHFEQUFNLENBQUE7SUFDTixPQUFPO0lBQ1AsdURBQU8sQ0FBQTtJQUNQLElBQUk7SUFDSix1REFBTyxDQUFBO0FBQ1gsQ0FBQyxFQVZXLGVBQWUsR0FBZix1QkFBZSxLQUFmLHVCQUFlLFFBVTFCO0FBRUQsSUFBWSxpQkFrQ1g7QUFsQ0QsV0FBWSxpQkFBaUI7SUFFekIsSUFBSTtJQUNKLCtEQUFTLENBQUE7SUFDVCxJQUFJO0lBQ0osaUVBQVUsQ0FBQTtJQUNWLE1BQU07SUFDTixxRUFBWSxDQUFBO0lBQ1osSUFBSTtJQUNKLCtEQUFTLENBQUE7SUFDVCxZQUFZO0lBQ1oseUVBQVksQ0FBQTtJQUNaLGFBQWE7SUFDYiwyRUFBYSxDQUFBO0lBQ2IsYUFBYTtJQUNiLDJFQUFhLENBQUE7SUFDYixhQUFhO0lBQ2IsMkVBQWEsQ0FBQTtJQUNiLGFBQWE7SUFDYiwyRUFBYSxDQUFBO0lBQ2IsYUFBYTtJQUNiLDZFQUFjLENBQUE7SUFDZCxhQUFhO0lBQ2IsNEVBQWEsQ0FBQTtJQUNiLGFBQWE7SUFDYixrRkFBZ0IsQ0FBQTtJQUNoQixpQkFBaUI7SUFDakIsNEZBQXFCLENBQUE7SUFDckIsaUJBQWlCO0lBQ2pCLHNHQUEwQixDQUFBO0lBQzFCLGVBQWU7SUFDZiw4RkFBc0IsQ0FBQTtJQUN0QixlQUFlO0lBQ2YsMEZBQW9CLENBQUE7QUFDeEIsQ0FBQyxFQWxDVyxpQkFBaUIsR0FBakIseUJBQWlCLEtBQWpCLHlCQUFpQixRQWtDNUI7QUFFRCxJQUFZLGNBU1g7QUFURCxXQUFZLGNBQWM7SUFFdEIsaUNBQWEsQ0FBQTtJQUNiLHVDQUFtQixDQUFBO0lBQ25CLGlDQUFhLENBQUE7SUFDYixpQ0FBYSxDQUFBO0lBQ2IsbUNBQWUsQ0FBQTtJQUNmLDZCQUFTLENBQUE7SUFDVCxtQ0FBZSxDQUFBO0FBQ25CLENBQUMsRUFUVyxjQUFjLEdBQWQsc0JBQWMsS0FBZCxzQkFBYyxRQVN6QjtBQUdELElBQVksV0FHWDtBQUhELFdBQVksV0FBVztJQUVuQix5REFBWSxDQUFBO0FBQ2hCLENBQUMsRUFIVyxXQUFXLEdBQVgsbUJBQVcsS0FBWCxtQkFBVyxRQUd0QjtBQUVVLFFBQUEsbUJBQW1CLEdBQUMsR0FBRyxDQUFDO0FBQ3hCLFFBQUEsTUFBTSxHQUFDLENBQUMsR0FBRyxDQUFDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGVudW0gRW5lbXlfVHlwZVxyXG57XHJcbiAgICBiYW94aWFuZz0wLFxyXG4gICAgbWVuZ3NoZT0xLFxyXG4gICAganVzaGlndWFpPTIsXHJcbiAgICBzaHV5YW89MyxcclxuICAgIGZ1c2h1YmluZz00LFxyXG4gICAganV4aWVqaW5nPTUsXHJcbiAgICB6aGl6aHU9NixcclxuICAgIGZlaXdlbj03LFxyXG4gICAgbXVuYWl5aT04LFxyXG4gICAganV4aWVqaWFuZz05LFxyXG4gICAgeHVuamllc2h1PTEwLFxyXG4gICAgdGlhb3RpYW89MTEsXHJcbiAgICBuYW5ndWE9MTIsXHJcbiAgICBzaHVpeXVhbnN1PTEzLFxyXG4gICAgemVuZ2U9MTQsXHJcbiAgICBmZWl0aW5nPTE1LFxyXG4gICAgd3V3ZWl6aGU9MTYsXHJcbiAgICBsdXhpbmdzaGE9MTcsXHJcbiAgICBuaXVtbyxcclxuICAgIFxyXG4gICAgZW5lbXlfbnVtLFxyXG4gICAgXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIEVuZW15X0luanVyZWRfVHlwZXtcclxuICAgIC8v5bmzQVxyXG4gICAgTm9ybWFsX0F0dGFjaz0wLFxyXG4gICAgLy/kuK3mr5JcclxuICAgIFpob25nRHU9MSxcclxuICAgIC8v5Lya5b+DXHJcbiAgICBIdWlYaW49MixcclxuICAgIC8v54iG5aS0XHJcbiAgICBCYW9Ub3U9MyxcclxuICAgIC8v54G854OnXHJcbiAgICBaaHVvU2hhbz00LFxyXG4gICAgLy/mtYHooYBcclxuICAgIExpdVh1ZT01LFxyXG4gICAgLy/lpKfmoJHliqDooYBcclxuICAgIFpoaUxpYW89NixcclxuICAgIC8v5oaO5oG26Ieq5bex5Zue6KGAXHJcbiAgICBaZW5nRV9IdWlYdWU9NyxcclxuICAgIC8v5pyo5LmD5LyK55qE5Yqg6KGAXHJcbiAgICBNdU5haVlpX0ppYVh1ZT04LFxyXG4gICAgLy/mmrTlh7tcclxuICAgIEJhb0ppPTksXHJcbiAgICAvL+aWqeadgFxyXG4gICAgV3VEaT0xMCxcclxuICAgIC8v5qC85oyhXHJcbiAgICBHZURhbmc9MTEsXHJcbiAgICAvL+mXqumBv1xyXG4gICAgU2hhbkJpPTEyLCAgICBcclxuICAgIC8v55yp5pmVXHJcbiAgICBYdWFuWXVuPTEzLFxyXG4gICAgLy/mioDog71cclxuICAgIFNraWxsPTE0LFxyXG4gICAgLy/ln47lopnlj43kvKRcclxuICAgIFdhbGwsXHJcbiAgICBDaGFvSmlCYW9Ub3UsXHJcbiAgICAvKirlhY3nlqvmjqfliLYgKi9cclxuICAgIE1pYW5ZaUtvbmdaaGksXHJcbiAgICAvKirlhrDlpbPnnJ/kvKQgKi9cclxuICAgIEJpbmdOdlpoZW5TaGFuZyxcclxuICAgIC8qKumYv+WKquavlOaWr+ecn+S8pCAqL1xyXG4gICAgQU51QmlTaVpoZW5TaGFuZyxcclxufVxyXG5cclxuZXhwb3J0IGVudW0gRW5lbXlfU3RhdGVcclxue1xyXG4gICAgLy/lvoXmnLpcclxuICAgIHN0YW5kYnkgPSAwLFxyXG4gICAgLy/np7vliqhcclxuICAgIG1vdmUgPSAxLFxyXG4gICAgLy/mlLvlh7tcclxuICAgIGF0dCA9IDIsXHJcbiAgICAvL+aKgOiDvVxyXG4gICAgc2tpbGwgPSAzLFxyXG4gICAgLy/mrbvkuqFcclxuICAgIGRpZSA9IDQsXHJcbiAgICAvKirlh7rnlJ/vvIzmraTml7bmmK/ml6DmlYznmoQgKi9cclxuICAgIGJvcm4sXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIEVuZW15X0J1ZmZfVHlwZVxyXG57XHJcbiAgICAvL+mXqumBv1xyXG4gICAgc2hhbmJpPTEsXHJcbiAgICAvL+aXoOaVjFxyXG4gICAgd3VkaT0yLFxyXG4gICAgLy/mjKHlrZDlvLnmiqTnm75cclxuICAgIGh1ZHVuPTMsXHJcbiAgICAvL+WKoOmAn1xyXG4gICAgamlhc3U9NCxcclxufVxyXG5cclxuZXhwb3J0IGVudW0gRW5lbXlfRGVCdWZmX1R5cGVcclxue1xyXG4gICAgLy/kuK3mr5JcclxuICAgIFpob25nRHU9MCxcclxuICAgIC8v54G854OnXHJcbiAgICBaaHVvU2hhbz0xLFxyXG4gICAgLy/mtYHooYDph43kvKRcclxuICAgIFpob25nU2hhbmc9MixcclxuICAgIC8v55yp5pmVXHJcbiAgICBYdWFuWXVuPTMsXHJcbiAgICAvKirlrqDniak4LeWHj+mAnyAqL1xyXG4gICAgSmlhblN1X1BldF84LFxyXG4gICAgLyoq5a6g54mpMTIt5YeP6YCfICovXHJcbiAgICBKaWFuU3VfUGV0XzEyLFxyXG4gICAgLyoq5a6g54mpMTYt5YeP6YCfICovXHJcbiAgICBKaWFuU3VfUGV0XzE2LFxyXG4gICAgLyoq5a6g54mpMTYt5YeP6YCfICovXHJcbiAgICBKaWFuU3VfUGV0XzEzLFxyXG4gICAgLyoq5a6g54mpMTUt5rWB6KGAICovXHJcbiAgICBMaXVYdWVfUGV0XzE1LFxyXG4gICAgLyoq5a6g54mpMTYt5Lit5q+SICovXHJcbiAgICBaaG9uZ0R1X1BldF8xNixcclxuICAgIC8qKuWuoOeJqTIwLeWHj+mAnyAqL1xyXG4gICAgSmlhblN1X1BldF8yMCxcclxuICAgIC8qKuWuoOeJqTIxLeWinuS8pCAqL1xyXG4gICAgWmVuZ1NoYW5nX1BldF8yMSxcclxuICAgIC8qKuWwhOaJi+iiq+WKqOaKgOiDvTHmmrTlh7vlh4/pgJ8gKi9cclxuICAgIEppYW5TdV9TaGVTaG91X1NraWxsMSxcclxuICAgIC8qKuW/jeiAheS4u+WKqOaKgOiDveeahOa1geihgOaViOaenCAqL1xyXG4gICAgTGl1WHVlX1JlblpoZV9BY3RpdmVfU2tpbGwsXHJcbiAgICAvKirlv43ogIXkuJPmrablh4/pgJ/nmoTmlYjmnpwgKi9cclxuICAgIEppYW5TdV9SZW5aaGVfRVhfU2tpbGwsXHJcbiAgICAvKirlt6vlpbPnmoTooqvliqjmtYHooYDmlYjmnpwgKi9cclxuICAgIExpdVh1ZV9XdU52X0V4X1NraWxsLFxyXG59XHJcblxyXG5leHBvcnQgZW51bSBCYW9YaWFuZ19BbmltYVxyXG57XHJcbiAgICBiZWlqaT0nYmVpamknLFxyXG4gICAgYmlhbnhpbmc9J2JpYW54aW5nJyxcclxuICAgIGNsb3NlPSdjbG9zZScsXHJcbiAgICBkYWlqaT0nZGFpamknLFxyXG4gICAgZ29uZ2ppPSdnb25namknLFxyXG4gICAgcGFvPSdwYW8nLFxyXG4gICAgc2l3YW5nPSdzaXdhbmcnLFxyXG59XHJcblxyXG5cclxuZXhwb3J0IGVudW0gRGlNaWFuX1R5cGVcclxue1xyXG4gICAgcGFvZGFuX3RpcD0wLFxyXG59XHJcblxyXG5leHBvcnQgbGV0IEVuZW15X0JhY2tfRGlzdGFuY2U9NDAwO1xyXG5leHBvcnQgbGV0IFdBTExfWT0tMjY4O1xyXG5cclxuIl19