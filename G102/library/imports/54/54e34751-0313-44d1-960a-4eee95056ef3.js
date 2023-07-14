"use strict";
cc._RF.push(module, '54e34dRAxNE0ZYKTu6VBW7z', 'TrackBullect');
// Scripts/Hero/TrackBullect.ts

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
var Constants_1 = require("../Constants");
var GameManager_1 = require("../GameManager");
var Monster_1 = require("../Monster/Monster");
var GameEffectsManager_1 = require("../Game/GameEffectsManager");
var GongJi_1 = require("./Game/GongJi");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TrackBullect = /** @class */ (function (_super) {
    __extends(TrackBullect, _super);
    function TrackBullect() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //目标
        _this.target_node = null;
        //目标位置
        _this.target_pos = cc.v2(0, 0);
        //移动速度
        _this.move_speed = 300;
        //移动方向
        _this.move_direction = Math.PI / 2;
        _this.follow_callback = null;
        _this.offset_xx_angle = 90;
        _this.game_effect_id = 0;
        return _this;
    }
    TrackBullect.prototype.init = function (gameEffectId, targetNode, speed, gjData, offsetAngle) {
        if (offsetAngle === void 0) { offsetAngle = 90; }
        _super.prototype.initData.call(this, gjData);
        this.game_effect_id = gameEffectId;
        this.target_node = targetNode;
        this.target_pos = targetNode.getComponent(Monster_1.default).getJuJiPos();
        var pi2 = Math.PI * 2;
        var offsetPos = this.target_pos.sub(this.node.getPosition());
        var dir = (Math.atan2(offsetPos.y, offsetPos.x) + pi2) % pi2;
        this.node.scale = 1;
        this.setDirection(dir);
        this.move_speed = speed;
        this.offset_xx_angle = offsetAngle;
        this.node.stopAllActions();
    };
    TrackBullect.prototype.addArriveListen = function (callback) {
        this.follow_callback = callback;
    };
    TrackBullect.prototype.update = function (dt) {
        if (GameManager_1.default.getInstance().cur_game_state != Constants_1.GameState.Game_Playing) {
            return;
        }
        //跟踪目标
        var sp = this.move_speed * dt;
        var disX = this.node.x;
        var disY = this.node.y;
        if (this.target_node) {
            var monsterTs = this.target_node.getComponent(Monster_1.default);
            this.target_pos = monsterTs.getJuJiPos();
            var offsetPos = this.target_pos.sub(this.node.getPosition());
            if (offsetPos.mag() < sp) {
                //中了
                if (this.follow_callback) {
                    this.follow_callback(monsterTs);
                }
            }
            else {
                var pi2 = Math.PI * 2;
                var dir = (Math.atan2(offsetPos.y, offsetPos.x) + pi2) % pi2;
                this.setDirection(dir);
                disX += sp * Math.cos(this.move_direction);
                disY += sp * Math.sin(this.move_direction);
            }
        }
        else {
            disX += sp * Math.cos(this.move_direction);
            disY += sp * Math.sin(this.move_direction);
            var offsetPos = this.target_pos.sub(this.node.getPosition());
            if (offsetPos.mag() < sp) {
                //消失
                this.destroySelf();
            }
        }
        this.node.x = disX;
        this.node.y = disY;
    };
    TrackBullect.prototype.setDirection = function (dir) {
        this.move_direction = dir;
        this.node.angle = 180 * dir / Math.PI - this.offset_xx_angle;
    };
    TrackBullect.prototype.destroySelf = function () {
        GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(this.game_effect_id, this.node);
    };
    TrackBullect = __decorate([
        ccclass
    ], TrackBullect);
    return TrackBullect;
}(GongJi_1.default));
exports.default = TrackBullect;

cc._RF.pop();