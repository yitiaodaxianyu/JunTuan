"use strict";
cc._RF.push(module, 'f6985tdhlNPLof43ERTUN/f', 'Gully');
// Scripts/Pet/Game/Gully.ts

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
var GongJi_1 = require("../../Hero/Game/GongJi");
var Monster_1 = require("../../Monster/Monster");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Gully = /** @class */ (function (_super) {
    __extends(Gully, _super);
    function Gully() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.is_end = false;
        _this.game_effect_id = 0;
        _this.move_speed = 700;
        _this.move_direction = Math.PI / 2;
        _this.end_height = 1200;
        _this.destory_countdown = 2;
        _this.max_time = 2;
        _this.box_collision = null;
        return _this;
    }
    Gully.prototype.onLoad = function () {
        this.box_collision = this.node.getComponent(cc.BoxCollider);
    };
    Gully.prototype.init = function (gameEffectId, dir, gjData) {
        var _this = this;
        _super.prototype.initData.call(this, gjData);
        this.game_effect_id = gameEffectId;
        this.move_direction = dir;
        this.node.angle = 180 * dir / Math.PI - 90;
        this.destory_countdown = this.max_time;
        this.node.height = 0;
        this.is_end = false;
        this.node.opacity = 255;
        var animation = this.node.getComponent(cc.Animation);
        animation.play('e30191');
        this.box_collision.enabled = true;
        animation.on(cc.Animation.EventType.FINISHED, function () {
            _this.box_collision.enabled = false;
            animation.off(cc.Animation.EventType.FINISHED);
            animation.play('e30191_2');
            _this.scheduleOnce(function () {
                cc.tween(_this.node).to(0.4, { opacity: 64 }).start();
                animation.play('e30191_3');
                animation.on(cc.Animation.EventType.FINISHED, function () {
                    animation.off(cc.Animation.EventType.FINISHED);
                    _this.destroySelf();
                });
            }, 1);
        });
    };
    Gully.prototype.onCollisionEnter = function (other, self) {
        var gm = GameManager_1.default.getInstance();
        if (gm.cur_game_state == Constants_1.GameState.Game_Lose)
            return;
        var group = other.node.group;
        switch (group) {
            case 'enemy':
                {
                    var monsterTs = other.node.getComponent(Monster_1.default);
                    if (monsterTs.is_can_gully) {
                        var data = monsterTs.beFlashInjured(this.gongji_data);
                        if (data.getDamageNum() > 0) {
                            monsterTs.is_can_gully = false;
                        }
                    }
                }
                break;
        }
    };
    Gully.prototype.destroySelf = function () {
        GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(this.game_effect_id, this.node);
    };
    Gully = __decorate([
        ccclass
    ], Gully);
    return Gully;
}(GongJi_1.default));
exports.default = Gully;

cc._RF.pop();