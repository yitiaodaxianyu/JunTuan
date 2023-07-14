"use strict";
cc._RF.push(module, '0b2cdW0jIZEaajKLWn3ZBpR', 'Continuous');
// Scripts/Hero/Skill/Continuous.ts

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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var EnemyConfig_1 = require("../../Enemy/EnemyConfig");
var GameEffectsManager_1 = require("../../Game/GameEffectsManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Continuous = /** @class */ (function (_super) {
    __extends(Continuous, _super);
    function Continuous() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.game_effect_id = GameEffectsManager_1.GameEffectId.Null;
        _this.jishu = 0;
        _this.other_value_1 = 0;
        _this.other_value_2 = 0;
        _this.buff_id = 0;
        _this.is_recycled = false;
        _this.buff_floor_num = 0;
        _this.gong_ji_data = null;
        return _this;
    }
    /**
     *
     * @param totalTime 持续的总时长
     * @param damage 每次触发的真实伤害
     * @param dt
     */
    Continuous.prototype.init = function (data, listen, gjData) {
        this.remain_time = data.remain_time;
        this.damage_num = data.damage_num;
        this.jiange_time = data.jiange_time;
        this.hero_type = data.hero_type;
        this.other_value_1 = data.other_value_1;
        this.other_value_2 = data.other_value_2;
        this.buff_id = data.buff_id;
        this.gong_ji_data = gjData;
        this.is_recycled = false;
        this.addDamageListen(listen);
        this.buff_floor_num = 1;
    };
    Continuous.prototype.refreshData = function (data) {
        this.remain_time = data.remain_time;
        this.damage_num = data.damage_num;
        this.jiange_time = data.jiange_time;
        this.buff_floor_num++;
    };
    Continuous.prototype.addDamageListen = function (listen) {
        this.damage_listen = listen;
    };
    Continuous.prototype.doDamage = function () {
        if (this.damage_listen) {
            var num = this.damage_num;
            if (this.buff_id == EnemyConfig_1.Enemy_DeBuff_Type.LiuXue_RenZhe_Active_Skill) {
                num *= this.buff_floor_num;
            }
            this.damage_listen.doDamage(this.gong_ji_data);
        }
    };
    /**
     * 删除自身，回收至特效管理器
     * @param isSelf 是否自身调用，如果是，则需要触发回调。
     */
    Continuous.prototype.destroySelf = function (isSelf) {
        if (this.is_recycled == false) {
            GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(this.game_effect_id, this.node);
            this.is_recycled = true;
        }
        // if(isSelf && this.damage_listen){
        //     this.damage_listen.end(this.is_recycled);
        // }
        this.damage_listen = null;
    };
    Continuous.prototype.update = function (dt) {
        this.remain_time -= dt;
        if (this.remain_time > 0) {
            this.jishu += dt;
            if (this.jishu >= this.jiange_time) {
                this.jishu = 0;
                this.doDamage();
            }
        }
        else {
            this.destroySelf(true);
        }
    };
    __decorate([
        property({ type: cc.Enum(GameEffectsManager_1.GameEffectId) })
    ], Continuous.prototype, "game_effect_id", void 0);
    Continuous = __decorate([
        ccclass
    ], Continuous);
    return Continuous;
}(cc.Component));
exports.default = Continuous;

cc._RF.pop();