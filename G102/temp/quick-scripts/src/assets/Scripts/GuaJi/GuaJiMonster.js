"use strict";
cc._RF.push(module, 'f772b4CfC5OcakYvkyezXUJ', 'GuaJiMonster');
// Scripts/GuaJi/GuaJiMonster.ts

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
var EnemyConfig_1 = require("../Enemy/EnemyConfig");
var PropConfig_1 = require("../Prop/PropConfig");
var GuaJiManager_1 = require("./GuaJiManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GuaJiMonster = /** @class */ (function (_super) {
    __extends(GuaJiMonster, _super);
    function GuaJiMonster() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.spine = null;
        /**移动速度 */
        _this.cur_move_speed = 80;
        /**移动方向 */
        _this.move_direction = Math.PI;
        /**当前的血量 */
        _this.cur_hp = 1;
        /**最大的血量 */
        _this.max_hp = 1;
        /**阴影 */
        _this.shadow = null;
        _this.shadow_pos = null;
        _this.shadow_size = null;
        /**攻击间隔（秒，表示多少秒攻击一次） */
        _this.att_jiange = 1;
        /**攻击计时 */
        _this.att_jishu = 0;
        /**当前的攻击力 */
        /**怪物当前的状态 */
        _this.monster_state = EnemyConfig_1.Enemy_State.standby;
        //受伤动作
        _this.injured_action = null;
        _this.juji_pos = cc.v2(0, 0);
        return _this;
    }
    GuaJiMonster.prototype.onLoad = function () {
        this.spine = this.node.getComponent(sp.Skeleton);
        var juji = this.node.getChildByName('juji');
        this.juji_pos = (cc.v2(juji.x * this.node.scaleX, juji.y * this.node.scaleY));
        var shadowNode = this.node.getChildByName('shadow');
        this.shadow_pos = shadowNode.getPosition();
        this.shadow_pos.y -= 50;
        this.shadow = GuaJiManager_1.default.getInstance().createShadow(cc.v2(1280, 0));
        this.shadow.setContentSize(shadowNode.width * this.node.scaleX, shadowNode.height * this.node.scaleY);
        this.update(0.016);
    };
    GuaJiMonster.prototype.init = function () {
        this.startWall();
    };
    GuaJiMonster.prototype.getIsDie = function () {
        return this.monster_state == EnemyConfig_1.Enemy_State.die;
    };
    GuaJiMonster.prototype.getEnemyState = function () {
        return this.monster_state;
    };
    GuaJiMonster.prototype.getIsCanCheak = function () {
        var isCan = true;
        if (this.getIsDie()) {
            isCan = false;
        }
        return isCan;
    };
    GuaJiMonster.prototype.getMaxHp = function () {
        return this.max_hp;
    };
    GuaJiMonster.prototype.getCurHp = function () {
        return this.cur_hp;
    };
    GuaJiMonster.prototype.getIsFullHp = function () {
        return this.cur_hp >= this.max_hp;
    };
    GuaJiMonster.prototype.getJuJiPos = function () {
        return this.node.getPosition().add(this.juji_pos);
    };
    GuaJiMonster.prototype.getShadowPos = function () {
        return this.node.getPosition().add(cc.v2(this.shadow_pos.x * this.node.scaleX, this.shadow_pos.y * this.node.scaleY));
    };
    GuaJiMonster.prototype.setEnemyState = function (type) {
        if (type != this.monster_state) {
            this.monster_state = type;
        }
    };
    GuaJiMonster.prototype.startWall = function () {
        this.monster_state = EnemyConfig_1.Enemy_State.move;
        this.playSpinAnimaton('Side_Walk', true);
        this.spine.timeScale = 1.1;
        this.cur_move_speed = 160;
    };
    GuaJiMonster.prototype.startDeath = function () {
        var _this = this;
        this.spine.timeScale = 1;
        this.cur_move_speed = GuaJiManager_1.default.getInstance().bg_speed_x;
        this.monster_state = EnemyConfig_1.Enemy_State.die;
        this.node.getComponent(cc.Collider).enabled = false;
        this.spine.paused = false;
        this.node.stopAllActions();
        cc.tween(this.node).to(0.18, { color: cc.color(255, 255, 255) }).start();
        this.playDeadAnimaton('Side_Death', function () {
            cc.tween(_this.shadow).to(0.5, { opacity: 0 }).removeSelf().start();
            cc.tween(_this.node).to(0.5, { opacity: 0 }).removeSelf().start();
        });
        GuaJiManager_1.default.getInstance().createRes(PropConfig_1.PropId.Coin, this.shadow.getPosition());
        GuaJiManager_1.default.getInstance().createRes(PropConfig_1.PropId.Coin, this.shadow.getPosition());
        GuaJiManager_1.default.getInstance().createRes(PropConfig_1.PropId.HeroExp, this.shadow.getPosition());
    };
    GuaJiMonster.prototype.startHurt = function () {
        if (this.injured_action) {
            this.injured_action.stop();
        }
        this.node.color = cc.Color.RED;
        this.injured_action = cc.tween(this.node).to(0.18, { color: cc.color(255, 255, 255) }).start();
    };
    /**
     * 播放一个骨骼动画
     * @param name 骨骼动画名称
     * @param isLoop 是否循环
     * @param data 是否监听关键帧，关键帧数据包含关键帧名称，监听到关键帧后的回调
     * @param endCallback 播放结束后的回调
     */
    GuaJiMonster.prototype.playSpinAnimaton = function (name, isLoop, data, endCallback) {
        var _this = this;
        if (isLoop === void 0) { isLoop = false; }
        if (this.getEnemyState() == EnemyConfig_1.Enemy_State.die) {
            return;
        }
        var anima = this.spine.setAnimation(0, name, isLoop);
        if (data) {
            this.spine.setCompleteListener(function (trackEntry, loopCount) {
                var nameTemp = trackEntry.animation ? trackEntry.animation.name : '';
                if (nameTemp === name && data.callback) {
                    data.callback();
                }
                _this.spine.setCompleteListener(null);
            });
            // this.spine.setTrackEventListener(anima,(entry: sp.spine.TrackEntry, event) =>{
            //     if(event.data.name==data.name){
            //         data.callback();
            //     }
            // })
        }
        if (endCallback) {
            // this.spine.setTrackCompleteListener(anima,(entry: sp.spine.TrackEntry, event) =>{
            //     anima.listener=null;
            //     endCallback();
            // })
            this.spine.setCompleteListener(function (trackEntry, loopCount) {
                var nameTemp = trackEntry.animation ? trackEntry.animation.name : '';
                if (nameTemp === name && endCallback) {
                    endCallback();
                }
                _this.spine.setCompleteListener(null);
            });
        }
    };
    GuaJiMonster.prototype.playDeadAnimaton = function (name, endCallback) {
        var _this = this;
        var anima = this.spine.setAnimation(0, name, false);
        this.spine.setCompleteListener(function (trackEntry, loopCount) {
            var nameTemp = trackEntry.animation ? trackEntry.animation.name : '';
            if (nameTemp === name && endCallback) {
                endCallback();
            }
            _this.spine.setCompleteListener(null);
        });
        // this.spine.setTrackCompleteListener(anima,(entry: sp.spine.TrackEntry, event) =>{
        //     anima.listener=null;
        //     endCallback();
        // })
    };
    GuaJiMonster.prototype.changeHp = function () {
        if (this.getIsDie()) {
            return true;
        }
        var isDie = false;
        this.cur_hp -= 1;
        this.startHurt();
        if (this.cur_hp <= 0) {
            this.startDeath();
            isDie = true;
        }
        if (this.cur_hp > this.max_hp) {
            this.cur_hp = this.max_hp;
        }
        return isDie;
    };
    GuaJiMonster.prototype.update = function (dt) {
        this.moving(dt);
    };
    GuaJiMonster.prototype.moving = function (dt) {
        var disX = this.node.x;
        var disY = this.node.y;
        var speed = this.cur_move_speed * dt;
        disX += speed * Math.cos(this.move_direction);
        disY += speed * Math.sin(this.move_direction);
        this.node.x = disX;
        this.node.y = disY;
        //不能穿过城墙
        if (this.node.x < -64) {
            this.node.x = -64;
        }
        this.shadow.setPosition(this.getShadowPos());
    };
    GuaJiMonster = __decorate([
        ccclass
    ], GuaJiMonster);
    return GuaJiMonster;
}(cc.Component));
exports.default = GuaJiMonster;

cc._RF.pop();