"use strict";
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