
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/GuaJi/GuaJiMonster.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcR3VhSmlcXEd1YUppTW9uc3Rlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvREFBbUQ7QUFFbkQsaURBQTRDO0FBQzVDLCtDQUEwQztBQUdwQyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUEwQyxnQ0FBWTtJQUF0RDtRQUFBLHFFQWlPQztRQS9OYSxXQUFLLEdBQWMsSUFBSSxDQUFDO1FBQ2xDLFVBQVU7UUFDVixvQkFBYyxHQUFRLEVBQUUsQ0FBQztRQUN6QixVQUFVO1FBQ1Ysb0JBQWMsR0FBUSxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQzlCLFdBQVc7UUFDRCxZQUFNLEdBQVMsQ0FBQyxDQUFDO1FBQzNCLFdBQVc7UUFDRCxZQUFNLEdBQVMsQ0FBQyxDQUFDO1FBQzNCLFFBQVE7UUFDRSxZQUFNLEdBQVUsSUFBSSxDQUFDO1FBQy9CLGdCQUFVLEdBQVUsSUFBSSxDQUFDO1FBQ3pCLGlCQUFXLEdBQVUsSUFBSSxDQUFDO1FBQzFCLHVCQUF1QjtRQUNiLGdCQUFVLEdBQVMsQ0FBQyxDQUFDO1FBQy9CLFVBQVU7UUFDQSxlQUFTLEdBQVMsQ0FBQyxDQUFDO1FBQzlCLFlBQVk7UUFDWixhQUFhO1FBQ0gsbUJBQWEsR0FBYyx5QkFBVyxDQUFDLE9BQU8sQ0FBQztRQUN6RCxNQUFNO1FBQ0ksb0JBQWMsR0FBVSxJQUFJLENBQUM7UUFDL0IsY0FBUSxHQUFTLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDOztJQXlNeEMsQ0FBQztJQXZNRyw2QkFBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLEtBQUssR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDL0MsSUFBSSxJQUFJLEdB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QUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3BCLENBQUM7SUFFTyw2QkFBTSxHQUFkLFVBQWUsRUFBRTtRQUViLElBQUksSUFBSSxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3JCLElBQUksSUFBSSxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3JCLElBQUksS0FBSyxHQUFDLElBQUksQ0FBQyxjQUFjLEdBQUMsRUFBRSxDQUFDO1FBQ2pDLElBQUksSUFBRSxLQUFLLEdBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDMUMsSUFBSSxJQUFFLEtBQUssR0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDO1FBQ2pCLFFBQVE7UUFDUixJQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFDLENBQUMsRUFBRSxFQUFDO1lBQ2YsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUM7U0FDbkI7UUFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBaE9nQixZQUFZO1FBRGhDLE9BQU87T0FDYSxZQUFZLENBaU9oQztJQUFELG1CQUFDO0NBak9ELEFBaU9DLENBak95QyxFQUFFLENBQUMsU0FBUyxHQWlPckQ7a0JBak9vQixZQUFZIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRW5lbXlfU3RhdGUgfSBmcm9tIFwiLi4vRW5lbXkvRW5lbXlDb25maWdcIjtcclxuaW1wb3J0IHsgS2V5RnJhbWVEYXRhIH0gZnJvbSBcIi4uL01vbnN0ZXIvTW9uc3RlckRhdGFcIjtcclxuaW1wb3J0IHsgUHJvcElkIH0gZnJvbSBcIi4uL1Byb3AvUHJvcENvbmZpZ1wiO1xyXG5pbXBvcnQgR3VhSmlNYW5hZ2VyIGZyb20gXCIuL0d1YUppTWFuYWdlclwiO1xyXG5cclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3VhSmlNb25zdGVyIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBwcm90ZWN0ZWQgc3BpbmU6IHNwLlNrZWxldG9uPW51bGw7XHJcbiAgICAvKirnp7vliqjpgJ/luqYgKi9cclxuICAgIGN1cl9tb3ZlX3NwZWVkOm51bWJlcj04MDtcclxuICAgIC8qKuenu+WKqOaWueWQkSAqL1xyXG4gICAgbW92ZV9kaXJlY3Rpb246bnVtYmVyPU1hdGguUEk7XHJcbiAgICAvKirlvZPliY3nmoTooYDph48gKi9cclxuICAgIHByb3RlY3RlZCBjdXJfaHA6IG51bWJlcj0xO1xyXG4gICAgLyoq5pyA5aSn55qE6KGA6YePICovXHJcbiAgICBwcm90ZWN0ZWQgbWF4X2hwOiBudW1iZXI9MTtcclxuICAgIC8qKumYtOW9sSAqL1xyXG4gICAgcHJvdGVjdGVkIHNoYWRvdzogY2MuTm9kZT1udWxsO1xyXG4gICAgc2hhZG93X3BvczogY2MuVmVjMj1udWxsO1xyXG4gICAgc2hhZG93X3NpemU6IGNjLlNpemU9bnVsbDtcclxuICAgIC8qKuaUu+WHu+mXtOmalO+8iOenku+8jOihqOekuuWkmuWwkeenkuaUu+WHu+S4gOasoe+8iSAqL1xyXG4gICAgcHJvdGVjdGVkIGF0dF9qaWFuZ2U6IG51bWJlcj0xO1xyXG4gICAgLyoq5pS75Ye76K6h5pe2ICovXHJcbiAgICBwcm90ZWN0ZWQgYXR0X2ppc2h1OiBudW1iZXI9MDtcclxuICAgIC8qKuW9k+WJjeeahOaUu+WHu+WKmyAqL1xyXG4gICAgLyoq5oCq54mp5b2T5YmN55qE54q25oCBICovXHJcbiAgICBwcm90ZWN0ZWQgbW9uc3Rlcl9zdGF0ZTogRW5lbXlfU3RhdGU9RW5lbXlfU3RhdGUuc3RhbmRieTtcclxuICAgIC8v5Y+X5Lyk5Yqo5L2cXHJcbiAgICBwcm90ZWN0ZWQgaW5qdXJlZF9hY3Rpb246Y2MuVHdlZW49bnVsbDtcclxuICAgIHByaXZhdGUganVqaV9wb3M6Y2MuVmVjMj1jYy52MigwLDApO1xyXG5cclxuICAgIG9uTG9hZCgpe1xyXG4gICAgICAgIHRoaXMuc3BpbmU9dGhpcy5ub2RlLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbik7XHJcbiAgICAgICAgbGV0IGp1amk9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdqdWppJyk7XHJcbiAgICAgICAgdGhpcy5qdWppX3Bvcz0oY2MudjIoanVqaS54KnRoaXMubm9kZS5zY2FsZVgsanVqaS55KnRoaXMubm9kZS5zY2FsZVkpKTtcclxuICAgICAgICBsZXQgc2hhZG93Tm9kZT10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3NoYWRvdycpO1xyXG4gICAgICAgIHRoaXMuc2hhZG93X3Bvcz1zaGFkb3dOb2RlLmdldFBvc2l0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5zaGFkb3dfcG9zLnktPTUwO1xyXG4gICAgICAgIHRoaXMuc2hhZG93PUd1YUppTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVNoYWRvdyhjYy52MigxMjgwLDApKTtcclxuICAgICAgICB0aGlzLnNoYWRvdy5zZXRDb250ZW50U2l6ZShzaGFkb3dOb2RlLndpZHRoKnRoaXMubm9kZS5zY2FsZVgsc2hhZG93Tm9kZS5oZWlnaHQqdGhpcy5ub2RlLnNjYWxlWSk7ICAgICAgICBcclxuICAgICAgICB0aGlzLnVwZGF0ZSgwLjAxNik7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdCgpeyAgICAgICAgXHJcbiAgICAgICAgdGhpcy5zdGFydFdhbGwoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRJc0RpZSgpOmJvb2xlYW5cclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tb25zdGVyX3N0YXRlPT1FbmVteV9TdGF0ZS5kaWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RW5lbXlTdGF0ZSgpOkVuZW15X1N0YXRlXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubW9uc3Rlcl9zdGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRJc0NhbkNoZWFrKCk6Ym9vbGVhblxyXG4gICAge1xyXG4gICAgICAgIGxldCBpc0Nhbj10cnVlO1xyXG4gICAgICAgIGlmKHRoaXMuZ2V0SXNEaWUoKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlzQ2FuPWZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaXNDYW47XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TWF4SHAoKTpudW1iZXJcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tYXhfaHA7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q3VySHAoKTpudW1iZXJcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jdXJfaHA7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SXNGdWxsSHAoKTpib29sZWFuXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VyX2hwPj10aGlzLm1heF9ocDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRKdUppUG9zKCk6Y2MuVmVjMlxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKS5hZGQodGhpcy5qdWppX3Bvcyk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U2hhZG93UG9zKCk6Y2MuVmVjMntcclxuICAgICAgICByZXR1cm4gdGhpcy5ub2RlLmdldFBvc2l0aW9uKCkuYWRkKGNjLnYyKHRoaXMuc2hhZG93X3Bvcy54KnRoaXMubm9kZS5zY2FsZVgsdGhpcy5zaGFkb3dfcG9zLnkqdGhpcy5ub2RlLnNjYWxlWSkpO1xyXG4gICAgfVxyXG4gICAgXHJcblxyXG4gICAgc2V0RW5lbXlTdGF0ZSh0eXBlOkVuZW15X1N0YXRlKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHR5cGUhPXRoaXMubW9uc3Rlcl9zdGF0ZSl7XHJcbiAgICAgICAgICAgIHRoaXMubW9uc3Rlcl9zdGF0ZT10eXBlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGFydFdhbGwoKXtcclxuICAgICAgICB0aGlzLm1vbnN0ZXJfc3RhdGU9RW5lbXlfU3RhdGUubW92ZTtcclxuICAgICAgICB0aGlzLnBsYXlTcGluQW5pbWF0b24oJ1NpZGVfV2FsaycsdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5zcGluZS50aW1lU2NhbGU9MS4xO1xyXG4gICAgICAgIHRoaXMuY3VyX21vdmVfc3BlZWQ9MTYwO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0RGVhdGgoKXtcclxuICAgICAgICB0aGlzLnNwaW5lLnRpbWVTY2FsZT0xO1xyXG4gICAgICAgIHRoaXMuY3VyX21vdmVfc3BlZWQ9R3VhSmlNYW5hZ2VyLmdldEluc3RhbmNlKCkuYmdfc3BlZWRfeDtcclxuICAgICAgICB0aGlzLm1vbnN0ZXJfc3RhdGU9RW5lbXlfU3RhdGUuZGllO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuQ29sbGlkZXIpLmVuYWJsZWQ9ZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zcGluZS5wYXVzZWQ9ZmFsc2U7XHJcbiAgICAgICAgdGhpcy5ub2RlLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgY2MudHdlZW4odGhpcy5ub2RlKS50bygwLjE4LHtjb2xvcjpjYy5jb2xvcigyNTUsMjU1LDI1NSl9KS5zdGFydCgpO1xyXG4gICAgICAgIHRoaXMucGxheURlYWRBbmltYXRvbignU2lkZV9EZWF0aCcsKCk9PntcclxuICAgICAgICAgICAgY2MudHdlZW4odGhpcy5zaGFkb3cpLnRvKDAuNSx7b3BhY2l0eTowfSkucmVtb3ZlU2VsZigpLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMubm9kZSkudG8oMC41LHtvcGFjaXR5OjB9KS5yZW1vdmVTZWxmKCkuc3RhcnQoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBHdWFKaU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVSZXMoUHJvcElkLkNvaW4sdGhpcy5zaGFkb3cuZ2V0UG9zaXRpb24oKSk7XHJcbiAgICAgICAgR3VhSmlNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUmVzKFByb3BJZC5Db2luLHRoaXMuc2hhZG93LmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgIEd1YUppTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVJlcyhQcm9wSWQuSGVyb0V4cCx0aGlzLnNoYWRvdy5nZXRQb3NpdGlvbigpKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydEh1cnQoKXtcclxuICAgICAgICBpZih0aGlzLmluanVyZWRfYWN0aW9uKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5pbmp1cmVkX2FjdGlvbi5zdG9wKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubm9kZS5jb2xvcj1jYy5Db2xvci5SRUQ7ICAgICAgICBcclxuICAgICAgICB0aGlzLmluanVyZWRfYWN0aW9uPWNjLnR3ZWVuKHRoaXMubm9kZSkudG8oMC4xOCx7Y29sb3I6Y2MuY29sb3IoMjU1LDI1NSwyNTUpfSkuc3RhcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaSreaUvuS4gOS4qumqqOmqvOWKqOeUu1xyXG4gICAgICogQHBhcmFtIG5hbWUg6aqo6aq85Yqo55S75ZCN56ewXHJcbiAgICAgKiBAcGFyYW0gaXNMb29wIOaYr+WQpuW+queOr1xyXG4gICAgICogQHBhcmFtIGRhdGEg5piv5ZCm55uR5ZCs5YWz6ZSu5bin77yM5YWz6ZSu5bin5pWw5o2u5YyF5ZCr5YWz6ZSu5bin5ZCN56ew77yM55uR5ZCs5Yiw5YWz6ZSu5bin5ZCO55qE5Zue6LCDXHJcbiAgICAgKiBAcGFyYW0gZW5kQ2FsbGJhY2sg5pKt5pS+57uT5p2f5ZCO55qE5Zue6LCDXHJcbiAgICAgKi9cclxuICAgIHBsYXlTcGluQW5pbWF0b24obmFtZTpzdHJpbmcsaXNMb29wOmJvb2xlYW49ZmFsc2UsZGF0YT86S2V5RnJhbWVEYXRhLGVuZENhbGxiYWNrPzpGdW5jdGlvbil7XHJcbiAgICAgICAgaWYodGhpcy5nZXRFbmVteVN0YXRlKCk9PUVuZW15X1N0YXRlLmRpZSl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGFuaW1hPXRoaXMuc3BpbmUuc2V0QW5pbWF0aW9uKDAsbmFtZSxpc0xvb3ApO1xyXG4gICAgICAgIGlmKGRhdGEpe1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zcGluZS5zZXRDb21wbGV0ZUxpc3RlbmVyKCh0cmFja0VudHJ5LCBsb29wQ291bnQpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBuYW1lVGVtcCA9IHRyYWNrRW50cnkuYW5pbWF0aW9uID8gdHJhY2tFbnRyeS5hbmltYXRpb24ubmFtZSA6ICcnO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5hbWVUZW1wID09PSBuYW1lICYmIGRhdGEuY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLmNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNwaW5lLnNldENvbXBsZXRlTGlzdGVuZXIobnVsbCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvLyB0aGlzLnNwaW5lLnNldFRyYWNrRXZlbnRMaXN0ZW5lcihhbmltYSwoZW50cnk6IHNwLnNwaW5lLlRyYWNrRW50cnksIGV2ZW50KSA9PntcclxuICAgICAgICAgICAgLy8gICAgIGlmKGV2ZW50LmRhdGEubmFtZT09ZGF0YS5uYW1lKXtcclxuICAgICAgICAgICAgLy8gICAgICAgICBkYXRhLmNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAgIC8vIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGVuZENhbGxiYWNrKXtcclxuICAgICAgICAgICAgLy8gdGhpcy5zcGluZS5zZXRUcmFja0NvbXBsZXRlTGlzdGVuZXIoYW5pbWEsKGVudHJ5OiBzcC5zcGluZS5UcmFja0VudHJ5LCBldmVudCkgPT57XHJcbiAgICAgICAgICAgIC8vICAgICBhbmltYS5saXN0ZW5lcj1udWxsO1xyXG4gICAgICAgICAgICAvLyAgICAgZW5kQ2FsbGJhY2soKTtcclxuICAgICAgICAgICAgLy8gfSlcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc3BpbmUuc2V0Q29tcGxldGVMaXN0ZW5lcigodHJhY2tFbnRyeSwgbG9vcENvdW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmFtZVRlbXAgPSB0cmFja0VudHJ5LmFuaW1hdGlvbiA/IHRyYWNrRW50cnkuYW5pbWF0aW9uLm5hbWUgOiAnJztcclxuICAgICAgICAgICAgICAgIGlmIChuYW1lVGVtcCA9PT0gbmFtZSAmJiBlbmRDYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgIGVuZENhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNwaW5lLnNldENvbXBsZXRlTGlzdGVuZXIobnVsbCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwbGF5RGVhZEFuaW1hdG9uKG5hbWU6c3RyaW5nLGVuZENhbGxiYWNrOkZ1bmN0aW9uKXtcclxuICAgICAgICBsZXQgYW5pbWE9dGhpcy5zcGluZS5zZXRBbmltYXRpb24oMCxuYW1lLGZhbHNlKTtcclxuXHJcbiAgICAgICAgdGhpcy5zcGluZS5zZXRDb21wbGV0ZUxpc3RlbmVyKCh0cmFja0VudHJ5LCBsb29wQ291bnQpID0+IHtcclxuICAgICAgICAgICAgbGV0IG5hbWVUZW1wID0gdHJhY2tFbnRyeS5hbmltYXRpb24gPyB0cmFja0VudHJ5LmFuaW1hdGlvbi5uYW1lIDogJyc7XHJcbiAgICAgICAgICAgIGlmIChuYW1lVGVtcCA9PT0gbmFtZSAmJiBlbmRDYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgZW5kQ2FsbGJhY2soKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNwaW5lLnNldENvbXBsZXRlTGlzdGVuZXIobnVsbCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gdGhpcy5zcGluZS5zZXRUcmFja0NvbXBsZXRlTGlzdGVuZXIoYW5pbWEsKGVudHJ5OiBzcC5zcGluZS5UcmFja0VudHJ5LCBldmVudCkgPT57XHJcbiAgICAgICAgLy8gICAgIGFuaW1hLmxpc3RlbmVyPW51bGw7XHJcbiAgICAgICAgLy8gICAgIGVuZENhbGxiYWNrKCk7XHJcbiAgICAgICAgLy8gfSlcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2hhbmdlSHAoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYodGhpcy5nZXRJc0RpZSgpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBpc0RpZT1mYWxzZTtcclxuICAgICAgICB0aGlzLmN1cl9ocC09MTtcclxuICAgICAgICB0aGlzLnN0YXJ0SHVydCgpO1xyXG4gICAgICAgIGlmKHRoaXMuY3VyX2hwPD0wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5zdGFydERlYXRoKCk7XHJcbiAgICAgICAgICAgIGlzRGllPXRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuY3VyX2hwPnRoaXMubWF4X2hwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJfaHA9dGhpcy5tYXhfaHBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGlzRGllO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCB1cGRhdGUoZHQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubW92aW5nKGR0KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG1vdmluZyhkdClcclxuICAgIHsgICAgICAgIFxyXG4gICAgICAgIGxldCBkaXNYPXRoaXMubm9kZS54O1xyXG4gICAgICAgIGxldCBkaXNZPXRoaXMubm9kZS55O1xyXG4gICAgICAgIGxldCBzcGVlZD10aGlzLmN1cl9tb3ZlX3NwZWVkKmR0O1xyXG4gICAgICAgIGRpc1grPXNwZWVkKk1hdGguY29zKHRoaXMubW92ZV9kaXJlY3Rpb24pO1xyXG4gICAgICAgIGRpc1krPXNwZWVkKk1hdGguc2luKHRoaXMubW92ZV9kaXJlY3Rpb24pO1xyXG4gICAgICAgIHRoaXMubm9kZS54PWRpc1g7XHJcbiAgICAgICAgdGhpcy5ub2RlLnk9ZGlzWTtcclxuICAgICAgICAvL+S4jeiDveepv+i/h+WfjuWimVxyXG4gICAgICAgIGlmKHRoaXMubm9kZS54PC02NCl7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS54PS02NDsgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zaGFkb3cuc2V0UG9zaXRpb24odGhpcy5nZXRTaGFkb3dQb3MoKSk7XHJcbiAgICB9XHJcbn1cclxuIl19