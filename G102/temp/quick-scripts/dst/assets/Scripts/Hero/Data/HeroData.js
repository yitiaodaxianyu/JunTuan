
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
        _this.gongji_jiange = 1;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcRGF0YVxcSGVyb0RhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLGlEQUE2RztBQUU3RyxtQkFBbUI7QUFDbkI7SUFBQTtRQUNJLFVBQVU7UUFDSCxhQUFRLEdBQVUsQ0FBQyxDQUFFO1FBQzVCLFdBQVc7UUFDSixpQkFBWSxHQUFVLENBQUMsQ0FBRTtRQUNoQyxXQUFXO1FBQ0osaUJBQVksR0FBVSxDQUFDLENBQUU7UUFDaEMsV0FBVztRQUNKLGlCQUFZLEdBQVUsQ0FBQyxDQUFFO1FBQ2hDLFdBQVc7UUFDSixpQkFBWSxHQUFVLENBQUMsQ0FBRTtJQUNwQyxDQUFDO0lBQUQsb0JBQUM7QUFBRCxDQVhBLEFBV0MsSUFBQTtBQVhZLHNDQUFhO0FBYTFCLHlCQUF5QjtBQUN6QjtJQUE4Qiw0QkFBYTtJQUEzQztRQUFBLHFFQXNGQztRQXJGRyxVQUFVO1FBQ1Ysa0JBQVksR0FBUSxDQUFDLENBQUM7UUFDdEIsV0FBVztRQUNYLGlCQUFXLEdBQVEsQ0FBQyxDQUFDO1FBQ3JCLFNBQVM7UUFDVCxjQUFRLEdBQVEsSUFBSSxDQUFDO1FBQ3JCLFVBQVU7UUFDVixjQUFRLEdBQVEsQ0FBQyxDQUFDO1FBQ2xCLFNBQVM7UUFDVCxtQkFBYSxHQUFTLENBQUMsQ0FBQztRQUN4QixVQUFVO1FBQ1YsaUJBQVcsR0FBVSxDQUFDLENBQUM7UUFDdkIsWUFBWTtRQUNaLHlCQUFtQixHQUFRLENBQUMsQ0FBQztRQUM3QixxQkFBcUI7UUFDckIsNkJBQTZCO1FBQzdCLDBDQUEwQztRQUMxQyxtQkFBYSxHQUFRLENBQUMsQ0FBQztRQUN2QixpQkFBVyxHQUFRLENBQUMsQ0FBQztRQUVyQixPQUFPO1FBQ1AsY0FBUSxHQUFVLENBQUMsQ0FBQztRQUNwQixVQUFVO1FBQ1Ysa0JBQVksR0FBVSxDQUFDLENBQUM7UUFDeEIsV0FBVztRQUNYLGFBQU8sR0FBUSxDQUFDLENBQUM7UUFDakIsV0FBVztRQUNYLFlBQU0sR0FBUSxDQUFDLENBQUM7UUFDaEIsZ0JBQWdCO1FBQ2hCLDJCQUEyQjtRQUMzQiwwRUFBMEU7UUFDMUUsbUJBQW1CO1FBQ25CLHFCQUFxQjtRQUNyQixhQUFhO1FBQ2IscUJBQXFCO1FBQ3JCLFlBQVk7UUFDWiw4QkFBOEI7UUFDOUIsZ0JBQWdCO1FBQ2hCLDJCQUEyQjtRQUMzQix5RUFBeUU7UUFDekUsTUFBTTtRQUNOLG1CQUFhLEdBQVEsSUFBSSxDQUFDO1FBQzFCLDJFQUEyRTtRQUMzRSxjQUFRLEdBQVMsSUFBSSxDQUFDO1FBQ3RCLGFBQWE7UUFDYixZQUFNLEdBQVEsQ0FBQyxDQUFDO1FBQ2hCLDBFQUEwRTtRQUMxRSxlQUFlO1FBQ2YscUNBQXFDO1FBQ3JDLE9BQU87UUFFUCxjQUFjO1FBQ2QsY0FBYztRQUNQLGlDQUEyQixHQUFVLENBQUMsQ0FBRTtRQUMvQyxnQkFBZ0I7UUFDVCxpQ0FBMkIsR0FBVSxDQUFDLENBQUU7UUFDL0MsZ0JBQWdCO1FBQ1QsaUNBQTJCLEdBQVUsQ0FBQyxDQUFFO1FBQy9DLGdCQUFnQjtRQUNULGlDQUEyQixHQUFVLENBQUMsQ0FBRTs7SUEwQm5ELENBQUM7SUF4QkcsVUFBVTtJQUNWLG1DQUFnQixHQUFoQixVQUFpQixJQUFjO1FBQzNCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELGlDQUFjLEdBQWQsVUFBZSxJQUFjO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELGlDQUFjLEdBQWQsVUFBZSxJQUFjO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELGlDQUFjLEdBQWQsVUFBZSxJQUFjO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELGlDQUFjLEdBQWQsVUFBZSxJQUFjO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELDhCQUFXLEdBQVgsVUFBWSxJQUFjO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUNMLGVBQUM7QUFBRCxDQXRGQSxBQXNGQyxDQXRGNkIsMEJBQWEsR0FzRjFDO0FBdEZZLDRCQUFRO0FBd0ZyQjtJQUFBO1FBQ0ksZ0JBQWdCO1FBQ2hCLGNBQVMsR0FBUyxJQUFJLENBQUM7UUFDdkIseUJBQXlCO1FBQ3pCLGNBQVMsR0FBVSxJQUFJLENBQUM7UUFDeEIsNEJBQTRCO1FBQzVCLGNBQVMsR0FBVyxzQkFBUyxDQUFDLFlBQVksQ0FBQztRQUMzQyxVQUFVO1FBQ1YsZ0JBQVcsR0FBWSx1QkFBVSxDQUFDLE1BQU0sQ0FBQztRQUN6QyxtQkFBbUI7UUFDbkIsc0JBQWlCLEdBQVEsQ0FBQyxDQUFDO1FBQzNCLG1CQUFtQjtRQUNuQiwyQkFBc0IsR0FBUSxDQUFDLENBQUM7UUFDaEMsd0NBQXdDO1FBQ3hDLFdBQU0sR0FBUSxDQUFDLENBQUM7UUFDaEIsMkNBQTJDO1FBQzNDLHFCQUFnQixHQUFRLENBQUMsQ0FBQztRQUMxQiw2QkFBNkI7UUFDN0IsZ0JBQVcsR0FBUyxLQUFLLENBQUM7SUFDOUIsQ0FBQztJQUFELGlCQUFDO0FBQUQsQ0FuQkEsQUFtQkMsSUFBQTtBQW5CWSxnQ0FBVSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBldEluZm8gfSBmcm9tIFwiLi4vLi4vUGV0L1BldENvbmZpZ1wiO1xyXG5pbXBvcnQgeyBBdHRSYW5nZVR5cGUsIEF0dHJpYnV0ZURhdGEsIERhbWFnZVR5cGUsIEhlcm9JbmZvLCBIZXJvX1R5cGUsIFNraWxsVHlwZSB9IGZyb20gXCIuLi9HYW1lL0hlcm9Db25maWdcIjtcclxuXHJcbi8qKuihqOagvOWbuuWumuaVsOWAvO+8muiLsembhOaKgOiDveS/oeaBryAqL1xyXG5leHBvcnQgY2xhc3MgSGVyb1NraWxsSW5mb3tcclxuICAgIC8qKuWGt+WNtOaXtumXtCAqL1xyXG4gICAgcHVibGljIENvbGREb3duOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5oqA6IO95Y+C5pWwMSAqL1xyXG4gICAgcHVibGljIFNraWxsVmFsdWVfMTpudW1iZXIgPSAwIDtcclxuICAgIC8qKuaKgOiDveWPguaVsDIgKi9cclxuICAgIHB1YmxpYyBTa2lsbFZhbHVlXzI6bnVtYmVyID0gMCA7XHJcbiAgICAvKirmioDog73lj4LmlbAzICovXHJcbiAgICBwdWJsaWMgU2tpbGxWYWx1ZV8zOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5oqA6IO95Y+C5pWwNCAqL1xyXG4gICAgcHVibGljIFNraWxsVmFsdWVfNDpudW1iZXIgPSAwIDtcclxufVxyXG5cclxuLyoq5ri45oiP5aSW6Iux6ZuE5pWw5o2u77yM5ri45oiP5YaF5pWw5o2u6YCa6L+H6ZmE5Yqg6K6h566XICovXHJcbmV4cG9ydCBjbGFzcyBIZXJvRGF0YSBleHRlbmRzIEF0dHJpYnV0ZURhdGF7XHJcbiAgICAvKiog5oC75pS75Ye75YqbKi9cclxuICAgIHRvdGFsX2F0dGFjazpudW1iZXI9MDtcclxuICAgIC8qKuWbuuWumuaUu+WHu+WKmyAqL1xyXG4gICAgZml4ZWRfYXR0Y2s6bnVtYmVyPTA7XHJcbiAgICAvKirmgLvooYDph48gKi9cclxuICAgIHRvdGFsX2hwOm51bWJlcj0yMDAwO1xyXG4gICAgLyoq5Zu65a6a6KGA6YePICovXHJcbiAgICBmaXhlZF9ocDpudW1iZXI9MDtcclxuICAgIC8qKuaAu+mYsuW+oSAqL1xyXG4gICAgdG90YWxfZGVmZW5zZTpudW1iZXIgPTA7XHJcbiAgICAvKirlm7rlrprpmLLlvqEgKi9cclxuICAgIGZpeF9kZWZlbnNlOm51bWJlciA9IDA7XHJcbiAgICAvKirml6Dop4bpmLLlvqHmr5TnjocgKi9cclxuICAgIGlnbm9yZV9kZWZlbnNlX3JhdGU6bnVtYmVyPTA7XHJcbiAgICAvLyAvKirmlLvlh7vpgJ/luqbvvIzkuIDnp5LmlLvlh7vlpJrlsJHmrKEgKi9cclxuICAgIC8vIGF0dGFja19zcGVlZDpudW1iZXI9MTsgICAgXHJcbiAgICAvKiog5pS75Ye76YCf5bqmLOavj+WkmuWwkeenkuaUu+WHu+S4gOasoe+8jOaNoueul+aIkOaUu+mAn+aYvuekuuWImeaYr++8jO+8iDHDt+aUu+WHu+mXtOmalO+8ieasoS/mr4/np5IqL1xyXG4gICAgZ29uZ2ppX2ppYW5nZTpudW1iZXI9MTtcclxuICAgIGJhc2VfamlhbmdlOm51bWJlcj0xO1xyXG5cclxuICAgIC8vIOWunumZheaUu+mAn1xyXG4gICAgYXRrU3BlZWQ6bnVtYmVyID0gMTtcclxuICAgIC8qKuWtkOW8uemAn+W6piAqL1xyXG4gICAgYnVsbGV0X3NwZWVkOm51bWJlciA9IDE7XHJcbiAgICAvKirpop3lpJbnmoTmmrTlh7vnjocqL1xyXG4gICAgY3JpdF9leDpudW1iZXI9MDtcclxuICAgIC8qKumineWklueahOWRveS4reeOhyovXHJcbiAgICBoaXRfZXg6bnVtYmVyPTA7XHJcbiAgICAvLyAvKiog5pq05Ye75Lyk5a6z77yI5YCN77yJKi9cclxuICAgIC8vIGJhb2ppX3NoYW5naGFpOm51bWJlcj0yO1xyXG4gICAgLy8gLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3mioDog73mlbDlgLwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgLy8gLyoqIOaKgOiDvemHiuaUvumcgOimgeeahE1Q5YC8Ki9cclxuICAgIC8vIGNvc3RfbXA6bnVtYmVyPTE1O1xyXG4gICAgLy8gLyoqIOWGt+WNtOaXtumXtCovXHJcbiAgICAvLyBjZF90aW1lOm51bWJlcj0xNTtcclxuICAgIC8vIC8q5aSn5oub5Lyk5a6z546HKi9cclxuICAgIC8vIGRhemhhb19zaGFuZ2hhaTpudW1iZXI9MS4yO1xyXG4gICAgLy8gLyoqIOWkp+aLm+eahOWFtuS7luaVsOWAvCovXHJcbiAgICAvLyBkYXpoYW9fbnVtOm51bWJlcj0wOyAgICBcclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t5pmu6YCa5pS75Ye75pWw5YC8LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8v5pS75Ye76IyD5Zu0XHJcbiAgICBnb25namlfZmFud2VpOm51bWJlcj0xMDAwO1xyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t57uR5a6a55qE5a6g54mpLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgcGV0X2luZm86UGV0SW5mbz1udWxsO1xyXG4gICAgLyoq57uR5a6a55qE5a6g54mpaWQgKi9cclxuICAgIHBldF9pZDpudW1iZXI9MDtcclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLeS4k+WxnuatpuWZqC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8vIC8qKuS4k+WxnuatpuWZqOetiee6pyAqL1xyXG4gICAgLy8gZXhjbHVzaXZlX2VxdWlwX2xldmVsOm51bWJlciA9IC0xO1xyXG4gICAgLy8g6Iux6ZuE5L+h5oGvXHJcblxyXG4gICAgLyoq5LiT5bGe5q2m5Zmo5oqA6IO95Y+C5pWwICovXHJcbiAgICAvKirmioDog70t5oqA6IO95Y+C5pWwMSAqL1xyXG4gICAgcHVibGljIEV4Y2x1c2l2ZVdlYXBvblNraWxsVmFsdWVfMTpudW1iZXIgPSAwIDtcclxuICAgIC8qKuiiq+WKqOaKgOiDvS3mioDog73lj4LmlbAyICovXHJcbiAgICBwdWJsaWMgRXhjbHVzaXZlV2VhcG9uU2tpbGxWYWx1ZV8yOm51bWJlciA9IDAgO1xyXG4gICAgLyoq6KKr5Yqo5oqA6IO9LeaKgOiDveWPguaVsDMgKi9cclxuICAgIHB1YmxpYyBFeGNsdXNpdmVXZWFwb25Ta2lsbFZhbHVlXzM6bnVtYmVyID0gMCA7XHJcbiAgICAvKirooqvliqjmioDog70t5oqA6IO95Y+C5pWwNCAqL1xyXG4gICAgcHVibGljIEV4Y2x1c2l2ZVdlYXBvblNraWxsVmFsdWVfNDpudW1iZXIgPSAwIDtcclxuXHJcbiAgICAvKiroi7Hpm4TmioDog70gKi9cclxuICAgIGdldFNraWxsQ29sZERvd24odHlwZTpTa2lsbFR5cGUpOm51bWJlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5Db2xkRG93bi5nZXQodHlwZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U2tpbGxWYWx1ZTEodHlwZTpTa2lsbFR5cGUpOm51bWJlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5Ta2lsbFZhbHVlX3guZ2V0KHR5cGUpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFNraWxsVmFsdWUyKHR5cGU6U2tpbGxUeXBlKTpudW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuU2tpbGxWYWx1ZV95LmdldCh0eXBlKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRTa2lsbFZhbHVlMyh0eXBlOlNraWxsVHlwZSk6bnVtYmVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLlNraWxsVmFsdWVfei5nZXQodHlwZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U2tpbGxWYWx1ZTQodHlwZTpTa2lsbFR5cGUpOm51bWJlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5Ta2lsbFZhbHVlXzQuZ2V0KHR5cGUpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldElzVW5sb2NrKHR5cGU6U2tpbGxUeXBlKTpib29sZWFue1xyXG4gICAgICAgIHJldHVybiB0aGlzLnVubG9ja19zdGF0ZS5nZXQodHlwZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBHb25nSmlEYXRhe1xyXG4gICAgLyoq5piv5ZCm5Li65a2Q5by557G75Z6L55qE5pS75Ye7ICovXHJcbiAgICBpc19idWxsZXQ6Ym9vbGVhbj10cnVlO1xyXG4gICAgLyoq5pys5qyh5Lyk5a6z55qE6Iux6ZuE5pWw5o2u77yM57uP6L+HYnVmZue7n+iuoeeahCAqL1xyXG4gICAgaGVyb19kYXRhOkhlcm9EYXRhPW51bGw7XHJcbiAgICAvKirmlrnkvr/kvKTlrrPnu5/orqEs5oyC6L295LiA5Liq6IGM5LiaLOihqOekuuatpOasoeS8pOWus+adpea6kCAqL1xyXG4gICAgaGVyb190eXBlOkhlcm9fVHlwZT1IZXJvX1R5cGUuQ2hhbmdNYW9TaG91O1xyXG4gICAgLyoq5Lyk5a6z57G75Z6LICovXHJcbiAgICBkYW1hZ2VfdHlwZTpEYW1hZ2VUeXBlPURhbWFnZVR5cGUuTm9ybWFsO1xyXG4gICAgLyoq5Lyk5a6z5q+U546HLeW6lOeUqOWcqOaKgOiDveS8pOWus+avlOeOhyovXHJcbiAgICBza2lsbF9kYW1hZ2VfcmF0ZTpudW1iZXI9MDtcclxuICAgIC8qKuS8pOWus+avlOeOhy3lupTnlKjlnKjmjIHnu63kvKTlrrPmr5TnjocqL1xyXG4gICAgY29udGludW91c19kYW1hZ2VfcmF0ZTpudW1iZXI9MDtcclxuICAgIC8qKuaWueS+v+S8pOWus+e7n+iuoSzmjILovb3kuIDkuKrlrqDnialpZCzooajnpLrmraTmrKHkvKTlrrPmnaXmupAs5aSn5LqOMOihqOekuuWuoOeJqeS8pOWusyAqL1xyXG4gICAgcGV0X2lkOm51bWJlcj0wO1xyXG4gICAgLyoq5pa55L6/5Y2V5Liq5oqA6IO95Lyk5a6z57uf6K6h77yM5oyC6L295LiA5Liq5oqA6IO9aWQ66Iux6ZuEaWQqMTAwMDAr5oqA6IO95L2/55So5qyh5pWwICovXHJcbiAgICBza2lsbF9yZWxlYXNlX2lkOm51bWJlcj0wO1xyXG4gICAgLyoq5piv5ZCm5Y+v5Lul6K6h566X5pq05Ye7LOeUqOS6juaKgOiDveWIpOaWreaYr+WQpuiDveiuoeeul+aatOWHu+eahCAqL1xyXG4gICAgaXNfY2FuX2NyaXQ6Ym9vbGVhbj1mYWxzZTtcclxufVxyXG4iXX0=