"use strict";
cc._RF.push(module, '11b21o3Em5Kx5+OlbieOXm7', 'SignalFlare');
// Scripts/Hero/Game/PaoShou/SignalFlare.ts

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
var Constants_1 = require("../../../Constants");
var GameEffectsManager_1 = require("../../../Game/GameEffectsManager");
var GameManager_1 = require("../../../GameManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SignalFlare = /** @class */ (function (_super) {
    __extends(SignalFlare, _super);
    function SignalFlare() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.tuowei = null;
        _this.game_effect_id = GameEffectsManager_1.GameEffectId.Null;
        _this.move_speed = 700;
        _this.move_direction = Math.PI / 2;
        _this.bomb_size = 100;
        //目标地点，到达后爆炸
        _this.target_pos = null;
        _this.tuo_wei = null;
        _this.prev_pos = cc.v2(0, 0);
        /**蔓延特效 */
        _this.spread_time = 0.2;
        /**蔓延位置 */
        _this.spread_pos = [];
        _this.end_callback = null;
        /**是否到达目的地 */
        _this.is_arrive = false;
        return _this;
    }
    SignalFlare.prototype.init = function (id, speed, targetPos, endCallback) {
        this.game_effect_id = id;
        this.move_speed = speed;
        this.target_pos = targetPos;
        this.end_callback = endCallback;
        var offsetPos = targetPos.sub(this.node.getPosition());
        this.move_direction = Math.atan2(offsetPos.y, offsetPos.x);
        //距离
        var distance = offsetPos.mag();
        var sp = this.move_speed / GameManager_1.default.getInstance().getGameRate();
        this.spread_time = 0.02 * GameManager_1.default.getInstance().getGameRate();
        var jtTime = distance / sp / GameManager_1.default.getInstance().getGameRate();
        ;
        this.node.scale = 0.5;
        cc.tween(this.node).then(cc.spawn(cc.sequence(cc.scaleTo(jtTime / 4, 1.1), cc.scaleTo(jtTime * 3 / 4, 0.8)), cc.jumpTo(jtTime, targetPos, distance / 2, 1))).call(this.destroySelf, this).start();
        this.tuo_wei = cc.instantiate(this.tuowei);
        this.tuo_wei.parent = this.node.parent;
        this.node.zIndex = 2;
        this.prev_pos = this.node.getPosition();
        var ms = this.tuo_wei.getComponent(cc.MotionStreak);
        ms.fadeTime = ms.fadeTime * GameManager_1.default.getInstance().getGameRate();
        this.spread_pos = new Array(4);
        var len = this.spread_pos.length;
        for (var i = 0; i < len; i++) {
            this.spread_pos[i] = this.node.getPosition();
        }
        this.is_arrive = false;
    };
    SignalFlare.prototype.destroySelf = function () {
        var _this = this;
        if (this.tuo_wei) {
            cc.tween(this.tuo_wei).delay(this.tuo_wei.getComponent(cc.MotionStreak).fadeTime / (10 * GameManager_1.default.getInstance().getGameRate()))
                .to(0.1, { opacity: 0 })
                .removeSelf().start();
        }
        this.spread_time = 0.6;
        if (this.end_callback) {
            this.end_callback();
        }
        //GameManager.getInstance().sound_manager.playSound(SoundIndex.boom2);
        this.node.zIndex = 2;
        this.is_arrive = true;
        var miaozhun = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectForParent(GameEffectsManager_1.GameEffectId.paoshou_dazhao_xinhaodan_miaozhun, this.node.getPosition(), this.node.parent);
        miaozhun.getComponent(sp.Skeleton).setAnimation(0, 'Skill_MiaoZhun', false);
        miaozhun.zIndex = 0;
        var end = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectForParent(GameEffectsManager_1.GameEffectId.paoshou_dazhao_weiyan_end, this.node.getPosition(), this.node.parent);
        end.zIndex = 1;
        end.opacity = 255;
        end.getComponent(sp.Skeleton).setAnimation(0, 'Skill_WeiYan', false);
        cc.tween(end).to(1.3, { opacity: 88 }).start();
        cc.tween(this.node).to(1.3, { opacity: 168 }).call(function () {
            GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(_this.game_effect_id, _this.node);
            GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(GameEffectsManager_1.GameEffectId.paoshou_dazhao_xinhaodan_miaozhun, miaozhun);
            GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(GameEffectsManager_1.GameEffectId.paoshou_dazhao_weiyan_end, end);
        }).start();
    };
    SignalFlare.prototype.setDirection = function (dir) {
        this.move_direction = dir;
        //this.node.angle=180*dir/Math.PI;
    };
    SignalFlare.prototype.createSpread = function () {
        var node = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectForParent(GameEffectsManager_1.GameEffectId.paoshou_dazhao_weiyan, this.spread_pos[this.getPosIndex()], this.node.parent);
        var anima = node.getComponent(cc.Animation);
        var state = anima.play();
        state.speed = 1 / GameManager_1.default.getInstance().getGameRate();
        anima.on(cc.Animation.EventType.FINISHED, function () {
            GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(GameEffectsManager_1.GameEffectId.paoshou_dazhao_weiyan, node);
        }, this);
        node.zIndex = 3;
        node.angle = Math.random() * 360;
        node.scale = Math.random() * 0.5 + 0.8;
    };
    SignalFlare.prototype.createEndSpread = function () {
    };
    SignalFlare.prototype.getPosIndex = function () {
        var maxCL = this.spread_pos.length - 1;
        var index = Math.floor(this.spread_pos.length / GameManager_1.default.getInstance().getGameRate());
        if (index >= maxCL) {
            index = maxCL;
        }
        return index;
    };
    SignalFlare.prototype.update = function (dt) {
        if (GameManager_1.default.getInstance().cur_game_state != Constants_1.GameState.Game_Playing)
            return;
        if (this.tuowei != null) {
            var gr = GameManager_1.default.getInstance().getGameRate();
            if (gr < 1) {
                gr = 1;
            }
            //添加在子弹前面           
            var pos = this.node.getPosition();
            var offsetPos = pos.sub(this.prev_pos);
            var distance = offsetPos.mag() * 4 / gr;
            var dir = Math.atan2(offsetPos.y, offsetPos.x);
            var xx = pos.x + Math.cos(dir) * distance;
            var yy = pos.y + Math.sin(dir) * distance;
            this.tuo_wei.setPosition(cc.v2(xx, yy));
            this.prev_pos = this.node.getPosition();
            this.spread_time -= dt;
            this.update_locus_shadow();
            if (this.spread_time <= 0) {
                this.spread_time = 0.02 * GameManager_1.default.getInstance().getGameRate();
                if (this.is_arrive == false) {
                    this.createSpread();
                }
            }
        }
    };
    SignalFlare.prototype.update_locus_shadow = function () {
        if (this.is_arrive == false) {
            //加入头部
            this.spread_pos.unshift(this.node.getPosition());
            //删除尾部
            this.spread_pos.pop();
        }
    };
    __decorate([
        property({ type: cc.Prefab })
    ], SignalFlare.prototype, "tuowei", void 0);
    SignalFlare = __decorate([
        ccclass
    ], SignalFlare);
    return SignalFlare;
}(cc.Component));
exports.default = SignalFlare;

cc._RF.pop();