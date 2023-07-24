
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Hero/Data/HeroData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f7c05oUrM9DlJSd6CHivk7e', 'HeroData');
// Scripts/Hero/Data/HeroData.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.GongJiData = exports.HeroData = exports.HeroSkillInfo = void 0;
var GameManager_1 = require("../../GameManager");
var HeroConfig_1 = require("../Game/HeroConfig");
/**表格固定数值：英雄技能信息 */
var HeroSkillInfo = /** @class */ (function () {
    function HeroSkillInfo() {
        /**冷却时间 */
        this.ColdDown = 0;
        /**技能参数1 */
        this.SkillValue_1 = 0;
        /**技能参数2 */
        this.SkillValue_2 = 0;
        /**技能参数3 */
        this.SkillValue_3 = 0;
        /**技能参数4 */
        this.SkillValue_4 = 0;
    }
    return HeroSkillInfo;
}());
exports.HeroSkillInfo = HeroSkillInfo;
/**游戏外英雄数据，游戏内数据通过附加计算 */
var HeroData = /** @class */ (function (_super) {
    __extends(HeroData, _super);
    function HeroData() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** 总攻击力*/
        _this.total_attack = 0;
        /**固定攻击力 */
        _this.fixed_attck = 0;
        /**总血量 */
        _this.total_hp = 2000;
        /**固定血量 */
        _this.fixed_hp = 0;
        /**总防御 */
        _this.total_defense = 0;
        /**固定防御 */
        _this.fix_defense = 0;
        /**无视防御比率 */
        _this.ignore_defense_rate = 0;
        // /**攻击速度，一秒攻击多少次 */
        // attack_speed:number=1;    
        /** 攻击速度,每多少秒攻击一次，换算成攻速显示则是，（1÷攻击间隔）次/每秒*/
        _this._gongji_jiange = 1;
        _this.base_jiange = 1;
        // 实际攻速
        _this.atkSpeed = 1;
        /**子弹速度 */
        _this.bullet_speed = 1;
        /**额外的暴击率*/
        _this.crit_ex = 0;
        /**额外的命中率*/
        _this.hit_ex = 0;
        // /** 暴击伤害（倍）*/
        // baoji_shanghai:number=2;
        // //---------------------------技能数值--------------------------------------
        // /** 技能释放需要的MP值*/
        // cost_mp:number=15;
        // /** 冷却时间*/
        // cd_time:number=15;
        // /*大招伤害率*/
        // dazhao_shanghai:number=1.2;
        // /** 大招的其他数值*/
        // dazhao_num:number=0;    
        //---------------------------普通攻击数值--------------------------------------
        //攻击范围
        _this.gongji_fanwei = 1000;
        //----------------------------绑定的宠物----------------------------------------
        _this.pet_info = null;
        /**绑定的宠物id */
        _this.pet_id = 0;
        //----------------------------专属武器----------------------------------------
        // /**专属武器等级 */
        // exclusive_equip_level:number = -1;
        // 英雄信息
        /**专属武器技能参数 */
        /**技能-技能参数1 */
        _this.ExclusiveWeaponSkillValue_1 = 0;
        /**被动技能-技能参数2 */
        _this.ExclusiveWeaponSkillValue_2 = 0;
        /**被动技能-技能参数3 */
        _this.ExclusiveWeaponSkillValue_3 = 0;
        /**被动技能-技能参数4 */
        _this.ExclusiveWeaponSkillValue_4 = 0;
        return _this;
    }
    Object.defineProperty(HeroData.prototype, "gongji_jiange", {
        get: function () {
            return this._gongji_jiange * (1 - GameManager_1.default.getInstance().getCharioSpeedRotio());
        },
        set: function (n) {
            this._gongji_jiange = n;
        },
        enumerable: false,
        configurable: true
    });
    /**英雄技能 */
    HeroData.prototype.getSkillColdDown = function (type) {
        return this.ColdDown.get(type);
    };
    HeroData.prototype.getSkillValue1 = function (type) {
        return this.SkillValue_x.get(type);
    };
    HeroData.prototype.getSkillValue2 = function (type) {
        return this.SkillValue_y.get(type);
    };
    HeroData.prototype.getSkillValue3 = function (type) {
        return this.SkillValue_z.get(type);
    };
    HeroData.prototype.getSkillValue4 = function (type) {
        return this.SkillValue_4.get(type);
    };
    HeroData.prototype.getIsUnlock = function (type) {
        return this.unlock_state.get(type);
    };
    return HeroData;
}(HeroConfig_1.AttributeData));
exports.HeroData = HeroData;
var GongJiData = /** @class */ (function () {
    function GongJiData() {
        /**是否为子弹类型的攻击 */
        this.is_bullet = true;
        /**本次伤害的英雄数据，经过buff统计的 */
        this.hero_data = null;
        /**方便伤害统计,挂载一个职业,表示此次伤害来源 */
        this.hero_type = HeroConfig_1.Hero_Type.ChangMaoShou;
        /**伤害类型 */
        this.damage_type = HeroConfig_1.DamageType.Normal;
        /**伤害比率-应用在技能伤害比率*/
        this.skill_damage_rate = 0;
        /**伤害比率-应用在持续伤害比率*/
        this.continuous_damage_rate = 0;
        /**方便伤害统计,挂载一个宠物id,表示此次伤害来源,大于0表示宠物伤害 */
        this.pet_id = 0;
        /**方便单个技能伤害统计，挂载一个技能id:英雄id*10000+技能使用次数 */
        this.skill_release_id = 0;
        /**是否可以计算暴击,用于技能判断是否能计算暴击的 */
        this.is_can_crit = false;
    }
    return GongJiData;
}());
exports.GongJiData = GongJiData;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcRGF0YVxcSGVyb0RhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlEQUE0QztBQUU1QyxpREFBNkc7QUFFN0csbUJBQW1CO0FBQ25CO0lBQUE7UUFDSSxVQUFVO1FBQ0gsYUFBUSxHQUFXLENBQUMsQ0FBQztRQUM1QixXQUFXO1FBQ0osaUJBQVksR0FBVyxDQUFDLENBQUM7UUFDaEMsV0FBVztRQUNKLGlCQUFZLEdBQVcsQ0FBQyxDQUFDO1FBQ2hDLFdBQVc7UUFDSixpQkFBWSxHQUFXLENBQUMsQ0FBQztRQUNoQyxXQUFXO1FBQ0osaUJBQVksR0FBVyxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUFELG9CQUFDO0FBQUQsQ0FYQSxBQVdDLElBQUE7QUFYWSxzQ0FBYTtBQWExQix5QkFBeUI7QUFDekI7SUFBOEIsNEJBQWE7SUFBM0M7UUFBQSxxRUE2RkM7UUE1RkcsVUFBVTtRQUNWLGtCQUFZLEdBQVcsQ0FBQyxDQUFDO1FBQ3pCLFdBQVc7UUFDWCxpQkFBVyxHQUFXLENBQUMsQ0FBQztRQUN4QixTQUFTO1FBQ1QsY0FBUSxHQUFXLElBQUksQ0FBQztRQUN4QixVQUFVO1FBQ1YsY0FBUSxHQUFXLENBQUMsQ0FBQztRQUNyQixTQUFTO1FBQ1QsbUJBQWEsR0FBVyxDQUFDLENBQUM7UUFDMUIsVUFBVTtRQUNWLGlCQUFXLEdBQVcsQ0FBQyxDQUFDO1FBQ3hCLFlBQVk7UUFDWix5QkFBbUIsR0FBVyxDQUFDLENBQUM7UUFDaEMscUJBQXFCO1FBQ3JCLDZCQUE2QjtRQUM3QiwwQ0FBMEM7UUFDMUMsb0JBQWMsR0FBVyxDQUFDLENBQUM7UUFRM0IsaUJBQVcsR0FBVyxDQUFDLENBQUM7UUFFeEIsT0FBTztRQUNQLGNBQVEsR0FBVyxDQUFDLENBQUM7UUFDckIsVUFBVTtRQUNWLGtCQUFZLEdBQVcsQ0FBQyxDQUFDO1FBQ3pCLFdBQVc7UUFDWCxhQUFPLEdBQVcsQ0FBQyxDQUFDO1FBQ3BCLFdBQVc7UUFDWCxZQUFNLEdBQVcsQ0FBQyxDQUFDO1FBQ25CLGdCQUFnQjtRQUNoQiwyQkFBMkI7UUFDM0IsMEVBQTBFO1FBQzFFLG1CQUFtQjtRQUNuQixxQkFBcUI7UUFDckIsYUFBYTtRQUNiLHFCQUFxQjtRQUNyQixZQUFZO1FBQ1osOEJBQThCO1FBQzlCLGdCQUFnQjtRQUNoQiwyQkFBMkI7UUFDM0IseUVBQXlFO1FBQ3pFLE1BQU07UUFDTixtQkFBYSxHQUFXLElBQUksQ0FBQztRQUM3QiwyRUFBMkU7UUFDM0UsY0FBUSxHQUFZLElBQUksQ0FBQztRQUN6QixhQUFhO1FBQ2IsWUFBTSxHQUFXLENBQUMsQ0FBQztRQUNuQiwwRUFBMEU7UUFDMUUsZUFBZTtRQUNmLHFDQUFxQztRQUNyQyxPQUFPO1FBRVAsY0FBYztRQUNkLGNBQWM7UUFDUCxpQ0FBMkIsR0FBVyxDQUFDLENBQUM7UUFDL0MsZ0JBQWdCO1FBQ1QsaUNBQTJCLEdBQVcsQ0FBQyxDQUFDO1FBQy9DLGdCQUFnQjtRQUNULGlDQUEyQixHQUFXLENBQUMsQ0FBQztRQUMvQyxnQkFBZ0I7UUFDVCxpQ0FBMkIsR0FBVyxDQUFDLENBQUM7O0lBMEJuRCxDQUFDO0lBMUVHLHNCQUFXLG1DQUFhO2FBQXhCO1lBQ0ksT0FBTyxJQUFJLENBQUMsY0FBYyxHQUFDLENBQUMsQ0FBQyxHQUFDLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDO1FBQ25GLENBQUM7YUFFRCxVQUF5QixDQUFTO1lBQzlCLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDO1FBQzVCLENBQUM7OztPQUpBO0lBZ0RELFVBQVU7SUFDVixtQ0FBZ0IsR0FBaEIsVUFBaUIsSUFBZTtRQUM1QixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRCxpQ0FBYyxHQUFkLFVBQWUsSUFBZTtRQUMxQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxpQ0FBYyxHQUFkLFVBQWUsSUFBZTtRQUMxQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxpQ0FBYyxHQUFkLFVBQWUsSUFBZTtRQUMxQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxpQ0FBYyxHQUFkLFVBQWUsSUFBZTtRQUMxQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCw4QkFBVyxHQUFYLFVBQVksSUFBZTtRQUN2QixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFDTCxlQUFDO0FBQUQsQ0E3RkEsQUE2RkMsQ0E3RjZCLDBCQUFhLEdBNkYxQztBQTdGWSw0QkFBUTtBQStGckI7SUFBQTtRQUNJLGdCQUFnQjtRQUNoQixjQUFTLEdBQVksSUFBSSxDQUFDO1FBQzFCLHlCQUF5QjtRQUN6QixjQUFTLEdBQWEsSUFBSSxDQUFDO1FBQzNCLDRCQUE0QjtRQUM1QixjQUFTLEdBQWMsc0JBQVMsQ0FBQyxZQUFZLENBQUM7UUFDOUMsVUFBVTtRQUNWLGdCQUFXLEdBQWUsdUJBQVUsQ0FBQyxNQUFNLENBQUM7UUFDNUMsbUJBQW1CO1FBQ25CLHNCQUFpQixHQUFXLENBQUMsQ0FBQztRQUM5QixtQkFBbUI7UUFDbkIsMkJBQXNCLEdBQVcsQ0FBQyxDQUFDO1FBQ25DLHdDQUF3QztRQUN4QyxXQUFNLEdBQVcsQ0FBQyxDQUFDO1FBQ25CLDJDQUEyQztRQUMzQyxxQkFBZ0IsR0FBVyxDQUFDLENBQUM7UUFDN0IsNkJBQTZCO1FBQzdCLGdCQUFXLEdBQVksS0FBSyxDQUFDO0lBQ2pDLENBQUM7SUFBRCxpQkFBQztBQUFELENBbkJBLEFBbUJDLElBQUE7QUFuQlksZ0NBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uLy4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFBldEluZm8gfSBmcm9tIFwiLi4vLi4vUGV0L1BldENvbmZpZ1wiO1xyXG5pbXBvcnQgeyBBdHRSYW5nZVR5cGUsIEF0dHJpYnV0ZURhdGEsIERhbWFnZVR5cGUsIEhlcm9JbmZvLCBIZXJvX1R5cGUsIFNraWxsVHlwZSB9IGZyb20gXCIuLi9HYW1lL0hlcm9Db25maWdcIjtcclxuXHJcbi8qKuihqOagvOWbuuWumuaVsOWAvO+8muiLsembhOaKgOiDveS/oeaBryAqL1xyXG5leHBvcnQgY2xhc3MgSGVyb1NraWxsSW5mbyB7XHJcbiAgICAvKirlhrfljbTml7bpl7QgKi9cclxuICAgIHB1YmxpYyBDb2xkRG93bjogbnVtYmVyID0gMDtcclxuICAgIC8qKuaKgOiDveWPguaVsDEgKi9cclxuICAgIHB1YmxpYyBTa2lsbFZhbHVlXzE6IG51bWJlciA9IDA7XHJcbiAgICAvKirmioDog73lj4LmlbAyICovXHJcbiAgICBwdWJsaWMgU2tpbGxWYWx1ZV8yOiBudW1iZXIgPSAwO1xyXG4gICAgLyoq5oqA6IO95Y+C5pWwMyAqL1xyXG4gICAgcHVibGljIFNraWxsVmFsdWVfMzogbnVtYmVyID0gMDtcclxuICAgIC8qKuaKgOiDveWPguaVsDQgKi9cclxuICAgIHB1YmxpYyBTa2lsbFZhbHVlXzQ6IG51bWJlciA9IDA7XHJcbn1cclxuXHJcbi8qKua4uOaIj+WkluiLsembhOaVsOaNru+8jOa4uOaIj+WGheaVsOaNrumAmui/h+mZhOWKoOiuoeeulyAqL1xyXG5leHBvcnQgY2xhc3MgSGVyb0RhdGEgZXh0ZW5kcyBBdHRyaWJ1dGVEYXRhIHtcclxuICAgIC8qKiDmgLvmlLvlh7vlipsqL1xyXG4gICAgdG90YWxfYXR0YWNrOiBudW1iZXIgPSAwO1xyXG4gICAgLyoq5Zu65a6a5pS75Ye75YqbICovXHJcbiAgICBmaXhlZF9hdHRjazogbnVtYmVyID0gMDtcclxuICAgIC8qKuaAu+ihgOmHjyAqL1xyXG4gICAgdG90YWxfaHA6IG51bWJlciA9IDIwMDA7XHJcbiAgICAvKirlm7rlrprooYDph48gKi9cclxuICAgIGZpeGVkX2hwOiBudW1iZXIgPSAwO1xyXG4gICAgLyoq5oC76Ziy5b6hICovXHJcbiAgICB0b3RhbF9kZWZlbnNlOiBudW1iZXIgPSAwO1xyXG4gICAgLyoq5Zu65a6a6Ziy5b6hICovXHJcbiAgICBmaXhfZGVmZW5zZTogbnVtYmVyID0gMDtcclxuICAgIC8qKuaXoOinhumYsuW+oeavlOeOhyAqL1xyXG4gICAgaWdub3JlX2RlZmVuc2VfcmF0ZTogbnVtYmVyID0gMDtcclxuICAgIC8vIC8qKuaUu+WHu+mAn+W6pu+8jOS4gOenkuaUu+WHu+WkmuWwkeasoSAqL1xyXG4gICAgLy8gYXR0YWNrX3NwZWVkOm51bWJlcj0xOyAgICBcclxuICAgIC8qKiDmlLvlh7vpgJ/luqYs5q+P5aSa5bCR56eS5pS75Ye75LiA5qyh77yM5o2i566X5oiQ5pS76YCf5pi+56S65YiZ5piv77yM77yIMcO35pS75Ye76Ze06ZqU77yJ5qyhL+avj+enkiovXHJcbiAgICBfZ29uZ2ppX2ppYW5nZTogbnVtYmVyID0gMTtcclxuICAgIHB1YmxpYyBnZXQgZ29uZ2ppX2ppYW5nZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9nb25namlfamlhbmdlKigxLUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Q2hhcmlvU3BlZWRSb3RpbygpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGdvbmdqaV9qaWFuZ2UobjogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fZ29uZ2ppX2ppYW5nZSA9IG47XHJcbiAgICB9XHJcbiAgICBiYXNlX2ppYW5nZTogbnVtYmVyID0gMTtcclxuXHJcbiAgICAvLyDlrp7pmYXmlLvpgJ9cclxuICAgIGF0a1NwZWVkOiBudW1iZXIgPSAxO1xyXG4gICAgLyoq5a2Q5by56YCf5bqmICovXHJcbiAgICBidWxsZXRfc3BlZWQ6IG51bWJlciA9IDE7XHJcbiAgICAvKirpop3lpJbnmoTmmrTlh7vnjocqL1xyXG4gICAgY3JpdF9leDogbnVtYmVyID0gMDtcclxuICAgIC8qKumineWklueahOWRveS4reeOhyovXHJcbiAgICBoaXRfZXg6IG51bWJlciA9IDA7XHJcbiAgICAvLyAvKiog5pq05Ye75Lyk5a6z77yI5YCN77yJKi9cclxuICAgIC8vIGJhb2ppX3NoYW5naGFpOm51bWJlcj0yO1xyXG4gICAgLy8gLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3mioDog73mlbDlgLwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgLy8gLyoqIOaKgOiDvemHiuaUvumcgOimgeeahE1Q5YC8Ki9cclxuICAgIC8vIGNvc3RfbXA6bnVtYmVyPTE1O1xyXG4gICAgLy8gLyoqIOWGt+WNtOaXtumXtCovXHJcbiAgICAvLyBjZF90aW1lOm51bWJlcj0xNTtcclxuICAgIC8vIC8q5aSn5oub5Lyk5a6z546HKi9cclxuICAgIC8vIGRhemhhb19zaGFuZ2hhaTpudW1iZXI9MS4yO1xyXG4gICAgLy8gLyoqIOWkp+aLm+eahOWFtuS7luaVsOWAvCovXHJcbiAgICAvLyBkYXpoYW9fbnVtOm51bWJlcj0wOyAgICBcclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t5pmu6YCa5pS75Ye75pWw5YC8LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8v5pS75Ye76IyD5Zu0XHJcbiAgICBnb25namlfZmFud2VpOiBudW1iZXIgPSAxMDAwO1xyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t57uR5a6a55qE5a6g54mpLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgcGV0X2luZm86IFBldEluZm8gPSBudWxsO1xyXG4gICAgLyoq57uR5a6a55qE5a6g54mpaWQgKi9cclxuICAgIHBldF9pZDogbnVtYmVyID0gMDtcclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLeS4k+WxnuatpuWZqC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8vIC8qKuS4k+WxnuatpuWZqOetiee6pyAqL1xyXG4gICAgLy8gZXhjbHVzaXZlX2VxdWlwX2xldmVsOm51bWJlciA9IC0xO1xyXG4gICAgLy8g6Iux6ZuE5L+h5oGvXHJcblxyXG4gICAgLyoq5LiT5bGe5q2m5Zmo5oqA6IO95Y+C5pWwICovXHJcbiAgICAvKirmioDog70t5oqA6IO95Y+C5pWwMSAqL1xyXG4gICAgcHVibGljIEV4Y2x1c2l2ZVdlYXBvblNraWxsVmFsdWVfMTogbnVtYmVyID0gMDtcclxuICAgIC8qKuiiq+WKqOaKgOiDvS3mioDog73lj4LmlbAyICovXHJcbiAgICBwdWJsaWMgRXhjbHVzaXZlV2VhcG9uU2tpbGxWYWx1ZV8yOiBudW1iZXIgPSAwO1xyXG4gICAgLyoq6KKr5Yqo5oqA6IO9LeaKgOiDveWPguaVsDMgKi9cclxuICAgIHB1YmxpYyBFeGNsdXNpdmVXZWFwb25Ta2lsbFZhbHVlXzM6IG51bWJlciA9IDA7XHJcbiAgICAvKirooqvliqjmioDog70t5oqA6IO95Y+C5pWwNCAqL1xyXG4gICAgcHVibGljIEV4Y2x1c2l2ZVdlYXBvblNraWxsVmFsdWVfNDogbnVtYmVyID0gMDtcclxuXHJcbiAgICAvKiroi7Hpm4TmioDog70gKi9cclxuICAgIGdldFNraWxsQ29sZERvd24odHlwZTogU2tpbGxUeXBlKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5Db2xkRG93bi5nZXQodHlwZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U2tpbGxWYWx1ZTEodHlwZTogU2tpbGxUeXBlKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5Ta2lsbFZhbHVlX3guZ2V0KHR5cGUpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFNraWxsVmFsdWUyKHR5cGU6IFNraWxsVHlwZSk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuU2tpbGxWYWx1ZV95LmdldCh0eXBlKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRTa2lsbFZhbHVlMyh0eXBlOiBTa2lsbFR5cGUpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLlNraWxsVmFsdWVfei5nZXQodHlwZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U2tpbGxWYWx1ZTQodHlwZTogU2tpbGxUeXBlKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5Ta2lsbFZhbHVlXzQuZ2V0KHR5cGUpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldElzVW5sb2NrKHR5cGU6IFNraWxsVHlwZSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnVubG9ja19zdGF0ZS5nZXQodHlwZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBHb25nSmlEYXRhIHtcclxuICAgIC8qKuaYr+WQpuS4uuWtkOW8ueexu+Wei+eahOaUu+WHuyAqL1xyXG4gICAgaXNfYnVsbGV0OiBib29sZWFuID0gdHJ1ZTtcclxuICAgIC8qKuacrOasoeS8pOWus+eahOiLsembhOaVsOaNru+8jOe7j+i/h2J1Zmbnu5/orqHnmoQgKi9cclxuICAgIGhlcm9fZGF0YTogSGVyb0RhdGEgPSBudWxsO1xyXG4gICAgLyoq5pa55L6/5Lyk5a6z57uf6K6hLOaMgui9veS4gOS4quiBjOS4mizooajnpLrmraTmrKHkvKTlrrPmnaXmupAgKi9cclxuICAgIGhlcm9fdHlwZTogSGVyb19UeXBlID0gSGVyb19UeXBlLkNoYW5nTWFvU2hvdTtcclxuICAgIC8qKuS8pOWus+exu+WeiyAqL1xyXG4gICAgZGFtYWdlX3R5cGU6IERhbWFnZVR5cGUgPSBEYW1hZ2VUeXBlLk5vcm1hbDtcclxuICAgIC8qKuS8pOWus+avlOeOhy3lupTnlKjlnKjmioDog73kvKTlrrPmr5TnjocqL1xyXG4gICAgc2tpbGxfZGFtYWdlX3JhdGU6IG51bWJlciA9IDA7XHJcbiAgICAvKirkvKTlrrPmr5Tnjoct5bqU55So5Zyo5oyB57ut5Lyk5a6z5q+U546HKi9cclxuICAgIGNvbnRpbnVvdXNfZGFtYWdlX3JhdGU6IG51bWJlciA9IDA7XHJcbiAgICAvKirmlrnkvr/kvKTlrrPnu5/orqEs5oyC6L295LiA5Liq5a6g54mpaWQs6KGo56S65q2k5qyh5Lyk5a6z5p2l5rqQLOWkp+S6jjDooajnpLrlrqDniankvKTlrrMgKi9cclxuICAgIHBldF9pZDogbnVtYmVyID0gMDtcclxuICAgIC8qKuaWueS+v+WNleS4quaKgOiDveS8pOWus+e7n+iuoe+8jOaMgui9veS4gOS4quaKgOiDvWlkOuiLsembhGlkKjEwMDAwK+aKgOiDveS9v+eUqOasoeaVsCAqL1xyXG4gICAgc2tpbGxfcmVsZWFzZV9pZDogbnVtYmVyID0gMDtcclxuICAgIC8qKuaYr+WQpuWPr+S7peiuoeeul+aatOWHuyznlKjkuo7mioDog73liKTmlq3mmK/lkKbog73orqHnrpfmmrTlh7vnmoQgKi9cclxuICAgIGlzX2Nhbl9jcml0OiBib29sZWFuID0gZmFsc2U7XHJcbn1cclxuIl19