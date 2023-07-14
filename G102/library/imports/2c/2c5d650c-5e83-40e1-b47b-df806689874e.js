"use strict";
cc._RF.push(module, '2c5d6UMXoNA4bR734BmiYdO', 'BossSkill7');
// Scripts/Boss/Boss7/BossSkill7.ts

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
var Constants_1 = require("../../Constants");
var GameEffectsManager_1 = require("../../Game/GameEffectsManager");
var GameManager_1 = require("../../GameManager");
var BuffData_1 = require("../../Hero/Game/BuffData");
var HeroConfig_1 = require("../../Hero/Game/HeroConfig");
var WallManager_1 = require("../../Wall/WallManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BossSkill7 = /** @class */ (function (_super) {
    __extends(BossSkill7, _super);
    function BossSkill7() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.monster_att_data = null;
        _this.target_yy = 0;
        _this.move_speed = 2000;
        _this.acc_speed = 300;
        _this.cur_acc_speed = 0;
        _this.is_destory = false;
        _this.is_xuanyun = false;
        _this.max_scale_yy = 0;
        _this.max_distance = 0;
        return _this;
    }
    BossSkill7.prototype.init = function (attData, targetYY, speed, accSpeed, isXuanYun) {
        this.cur_acc_speed = 0;
        this.move_speed = speed;
        this.acc_speed = accSpeed;
        this.target_yy = targetYY;
        this.monster_att_data = attData;
        this.is_xuanyun = isXuanYun;
        this.node.scale = 1;
        this.max_scale_yy = WallManager_1.default.getInstance().getMainWall().getWallRect().center.y;
        this.max_distance = Math.abs(WallManager_1.default.getInstance().getMainWall().getWallRect().center.y - this.node.y);
        this.is_destory = false;
    };
    BossSkill7.prototype.destroySelf = function () {
        this.is_destory = true;
        this.createBomb();
        GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(GameEffectsManager_1.GameEffectId.boss7_skill_bullect, this.node);
    };
    BossSkill7.prototype.createBomb = function () {
        GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.boss7_skill_bullect_hit, cc.v2(this.node.x, this.target_yy));
        if (this.is_xuanyun) {
            //击晕所有英雄
            GameManager_1.default.getInstance().all_hero.forEach(function (v, k) {
                var buffData = new BuffData_1.BuffData();
                buffData.buff_id = HeroConfig_1.BuffId.Monster_XuanYun;
                buffData.game_effect_id = GameEffectsManager_1.GameEffectId.xuanyun;
                buffData.remain_time = 3;
                buffData.buff_type = HeroConfig_1.BuffType.Vertigo;
                v.addDeBuff(buffData);
            });
            this.monster_att_data.is_big = true;
        }
        else {
            this.monster_att_data.is_big = false;
        }
        WallManager_1.default.getInstance().getMainWall().beInjured(this.monster_att_data);
    };
    BossSkill7.prototype.update = function (dt) {
        if (GameManager_1.default.getInstance().cur_game_state == Constants_1.GameState.Game_Playing) {
            if (this.is_destory == false) {
                this.cur_acc_speed += this.acc_speed * dt;
                var finalSpeed = this.move_speed * dt + this.cur_acc_speed;
                this.node.y -= finalSpeed;
                this.node.scale = 1 + (1 - Math.abs(this.max_scale_yy - this.node.y) / this.max_distance);
                if (this.node.y <= this.target_yy) {
                    this.destroySelf();
                }
            }
        }
    };
    BossSkill7 = __decorate([
        ccclass
    ], BossSkill7);
    return BossSkill7;
}(cc.Component));
exports.default = BossSkill7;

cc._RF.pop();