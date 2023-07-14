
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Hero/Game/ShouWang/Bear.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b27233cRcFM+KfFZbKdHr6k', 'Bear');
// Scripts/Hero/Game/ShouWang/Bear.ts

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
var GameManager_1 = require("../../../GameManager");
var Monster_1 = require("../../../Monster/Monster");
var MonsterData_1 = require("../../../Monster/MonsterData");
var MonsterManager_1 = require("../../../Monster/MonsterManager");
var AudioConstants_1 = require("../../../Sound/AudioConstants");
var GongJi_1 = require("../GongJi");
var BearConfig_1 = require("./BearConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Bear = /** @class */ (function (_super) {
    __extends(Bear, _super);
    function Bear() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.spine = null;
        /**熊的状态 */
        _this.cur_state = BearConfig_1.BearState.born;
        /**当前的移动速度 */
        _this.cur_move_speed = 80;
        /**当前的移动目标地点，可能会由玩家点击屏幕而设置 */
        _this.move_target_pos = null;
        /**当前的攻击目标 */
        _this.att_target = null;
        /**当前的移动方向 */
        _this.move_direction = Math.PI * 3 / 2;
        /** 攻击计数*/
        _this.gongji_jishu = 0;
        /** 攻击间隔*/
        _this.gongji_jiange = 1;
        /** 基础间隔 */
        _this.base_jiange = 0;
        /**攻击距离 */
        _this.gongji_juli = 100;
        /**攻击坐标 */
        _this.gongji_pos = cc.v2(0, 0);
        /**寻敌范围 */
        _this.find_monster_fanwei = 1000;
        /**指定缩放 */
        _this.setup_scale = 1;
        /**当前的左右面向 */
        _this.cur_is_left = false;
        /**城墙的Y */
        _this.wall_yy = 0;
        /**熊剩余的时间 */
        _this.remain_num = 1;
        _this.destory_callback = null;
        _this.bear_id = 0;
        _this.aoe_fanwei = 0;
        return _this;
    }
    Bear.prototype.onLoad = function () {
        var gongjiNode = this.node.getChildByName('gongji');
        this.gongji_pos = gongjiNode.getPosition();
        gongjiNode.removeFromParent();
    };
    Bear.prototype.init = function (gjData, dt, bearId, aoe) {
        if (aoe === void 0) { aoe = 0; }
        if (!this.spine) {
            this.spine = this.node.getComponent(sp.Skeleton);
        }
        this.initData(gjData);
        this.bear_id = bearId;
        this.gongji_jiange = this.base_jiange = 1 / BearConfig_1.BearAttackSpeed;
        this.cur_move_speed = BearConfig_1.BearMoveSpeed;
        this.gongji_juli = BearConfig_1.BearAttackDistance;
        this.find_monster_fanwei = gjData.hero_data.gongji_fanwei;
        this.aoe_fanwei = aoe;
        this.setBearState(BearConfig_1.BearState.born, false, false, null, this.checkIdle.bind(this));
        this.wall_yy = GameManager_1.default.getInstance().enemy_att_y;
        this.node.scale = this.setup_scale;
        this.remain_num = dt;
        this.node.zIndex = (Math.round(8000 - this.node.y * 10));
        //this.gongji_jiange/=1.5;
    };
    Bear.prototype.addDestoryListen = function (callBack) {
        this.destory_callback = callBack;
    };
    Bear.prototype.setBearState = function (state, isLeft, isLoop, data, endCallback) {
        if (isLeft === void 0) { isLeft = true; }
        if (isLoop === void 0) { isLoop = false; }
        this.cur_state = state;
        this.cur_is_left = isLeft;
        this.node.scaleX = this.cur_is_left ? -this.setup_scale : this.setup_scale;
        this.playSpineAnimation(this.getAnimaName(), isLoop, data, endCallback);
    };
    Bear.prototype.getGongJiPos = function () {
        return cc.v2(this.node.x + this.gongji_pos.x * this.node.scaleX, this.node.y + this.gongji_pos.y * this.node.scaleY);
    };
    Bear.prototype.getAnimaName = function () {
        var name = BearConfig_1.BearAnimaName.Idle;
        switch (this.cur_state) {
            case BearConfig_1.BearState.born:
                {
                    name = BearConfig_1.BearAnimaName.Start;
                }
                break;
            case BearConfig_1.BearState.idle:
                {
                    name = BearConfig_1.BearAnimaName.Idle;
                }
                break;
            case BearConfig_1.BearState.move:
                {
                    if (this.att_target) {
                        //判断距离
                        var distance = (this.att_target.getPosition().sub(this.getGongJiPos()).mag());
                        if (distance >= this.cur_move_speed) {
                            name = BearConfig_1.BearAnimaName.Run;
                        }
                        else {
                            name = BearConfig_1.BearAnimaName.Walk;
                        }
                    }
                    else {
                        name = BearConfig_1.BearAnimaName.Walk;
                    }
                }
                break;
            case BearConfig_1.BearState.attack:
                {
                    name = BearConfig_1.BearAnimaName.Attack;
                }
                break;
        }
        return name;
    };
    /**
     * 播放一个骨骼动画
     * @param name 骨骼动画名称
     * @param isLoop 是否循环
     * @param data 是否监听关键帧，关键帧数据包含关键帧名称，监听到关键帧后的回调
     * @param endCallback 播放结束后的回调
     */
    Bear.prototype.playSpineAnimation = function (name, isLoop, data, endCallback) {
        if (isLoop === void 0) { isLoop = false; }
        if (isLoop && name == this.spine.animation) {
            return;
        }
        var anima = this.spine.setAnimation(0, name, isLoop);
        if (data) {
            this.spine.setTrackEventListener(anima, function (entry, event) {
                for (var i = 0; i < data.length; i++) {
                    if (event.data.name == data[i].name) {
                        data[i].callback();
                    }
                }
            });
        }
        if (endCallback) {
            this.spine.setTrackCompleteListener(anima, function (entry, event) {
                anima.listener = null;
                endCallback();
            });
        }
    };
    Bear.prototype.startAttack = function () {
        var _this = this;
        this.gongji_jishu = 0;
        //算出熊的面向
        var isLeft = this.att_target.x < this.node.x;
        var data = new MonsterData_1.KeyFrameData();
        data.name = "Attack";
        data.callback = function () {
            _this.gongji_jishu = 0;
            //造成伤害
            if (_this.att_target) {
                GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_ShouWangSkill2);
                var monsterTs = _this.att_target.getComponent(Monster_1.default);
                if (monsterTs) {
                    var damageData = monsterTs.beFlashInjured(_this.gongji_data);
                    if (damageData.getDamageNum() > 0) {
                        //专武范围伤害
                        if (_this.aoe_fanwei > 0) {
                            var monsters = MonsterManager_1.default.getInstance().getMonstersForCenterPos(-1, monsterTs.getCenterPos(), _this.aoe_fanwei);
                            //如果范围内有怪物
                            if (monsters) {
                                for (var i = 0; i < monsters.length; i++) {
                                    var monsterTTS = monsters[i].getComponent(Monster_1.default);
                                    if (monsterTTS.uuid != _this.uuid) {
                                        monsterTTS.beFlashInjured(_this.gongji_data);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        };
        this.setBearState(BearConfig_1.BearState.attack, isLeft, false, [data], function () {
            _this.checkIdle();
        });
    };
    Bear.prototype.startMove = function (dt) {
        var disX = this.node.x;
        var disY = this.node.y;
        var speed = this.cur_move_speed * dt;
        disX += speed * Math.cos(this.move_direction);
        disY += speed * Math.sin(this.move_direction);
        this.node.x = disX;
        this.node.y = disY;
        if (this.node.x > 360) {
            this.node.x = 360;
            this.move_direction = (Math.PI - this.move_direction);
        }
        if (this.node.x < -360) {
            this.node.x = -360;
            this.move_direction = (Math.PI - this.move_direction);
        }
        //不能穿过城墙
        if (this.node.y < this.wall_yy) {
            this.node.y = this.wall_yy;
        }
        var isLeft = this.move_direction > Math.PI / 2 && this.move_direction < Math.PI * 3 / 2;
        this.setBearState(BearConfig_1.BearState.move, isLeft, true);
        this.node.zIndex = (Math.round(8000 - this.node.y * 10));
    };
    Bear.prototype.startDestory = function () {
        this.setBearState(BearConfig_1.BearState.destory);
        cc.tween(this.node).delay(0.5).to(1, { opacity: 0 }).removeSelf().start();
        if (this.destory_callback) {
            this.destory_callback();
        }
    };
    Bear.prototype.update = function (dt) {
        if (GameManager_1.default.getInstance().cur_game_state != Constants_1.GameState.Game_Playing)
            return;
        if (this.cur_state == BearConfig_1.BearState.born || this.cur_state == BearConfig_1.BearState.destory) {
            return;
        }
        this.remain_num -= dt;
        if (this.remain_num > 0) {
            this.checkAttack(dt);
        }
        else {
            this.startDestory();
        }
    };
    Bear.prototype.checkAttack = function (dt) {
        this.gongji_jishu += dt;
        if (this.cur_state != BearConfig_1.BearState.attack) {
            var monsters = MonsterManager_1.default.getInstance().getMonstersForCenterPos(1, this.getGongJiPos(), this.find_monster_fanwei);
            //如果范围内有怪物
            if (monsters) {
                this.att_target = monsters[0];
                //判断距离
                var distance = (this.att_target.getPosition().sub(this.getGongJiPos()).mag());
                if (distance < this.gongji_juli) {
                    if (this.gongji_jishu >= this.gongji_jiange) {
                        this.spine.timeScale = this.base_jiange / this.gongji_jiange;
                        this.startAttack();
                    }
                    else {
                        this.checkIdle();
                    }
                }
                else {
                    this.checkMove(dt);
                }
            }
            else {
                this.att_target = null;
                this.checkIdle();
            }
        }
    };
    Bear.prototype.checkIdle = function () {
        if (this.cur_state == BearConfig_1.BearState.idle) {
            return;
        }
        this.setBearState(BearConfig_1.BearState.idle, this.cur_is_left, true);
    };
    Bear.prototype.checkMove = function (dt) {
        var speed = this.cur_move_speed * dt;
        /**如果有命令，则执行命令 */
        if (this.move_target_pos) {
            var offsetPos = this.move_target_pos.sub(this.getGongJiPos());
            if (offsetPos.mag() < speed) {
                this.move_target_pos = null;
                this.checkIdle();
            }
            else {
                var pi2 = Math.PI * 2;
                this.move_direction = (Math.atan2(offsetPos.y, offsetPos.x) + pi2) % pi2;
                this.startMove(dt);
            }
        }
        else {
            var pi2 = Math.PI * 2;
            var offsetPos = this.att_target.getPosition().sub(this.getGongJiPos());
            this.move_direction = (Math.atan2(offsetPos.y, offsetPos.x) + pi2) % pi2;
            this.startMove(dt);
        }
    };
    __decorate([
        property(sp.Skeleton)
    ], Bear.prototype, "spine", void 0);
    Bear = __decorate([
        ccclass
    ], Bear);
    return Bear;
}(GongJi_1.default));
exports.default = Bear;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcR2FtZVxcU2hvdVdhbmdcXEJlYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0RBQStDO0FBQy9DLG9EQUErQztBQUMvQyxvREFBK0M7QUFDL0MsNERBQTREO0FBQzVELGtFQUE2RDtBQUM3RCxnRUFBMkQ7QUFFM0Qsb0NBQStCO0FBQy9CLDJDQUE0RztBQUd0RyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFrQyx3QkFBTTtJQUF4QztRQUFBLHFFQTJSQztRQXpSVyxXQUFLLEdBQWMsSUFBSSxDQUFDO1FBQ2hDLFVBQVU7UUFDRixlQUFTLEdBQVcsc0JBQVMsQ0FBQyxJQUFJLENBQUM7UUFDM0MsYUFBYTtRQUNMLG9CQUFjLEdBQVMsRUFBRSxDQUFDO1FBQ2xDLDZCQUE2QjtRQUNyQixxQkFBZSxHQUFVLElBQUksQ0FBQztRQUN0QyxhQUFhO1FBQ0wsZ0JBQVUsR0FBVSxJQUFJLENBQUM7UUFDakMsYUFBYTtRQUNMLG9CQUFjLEdBQVEsSUFBSSxDQUFDLEVBQUUsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDO1FBQzFDLFVBQVU7UUFDRixrQkFBWSxHQUFRLENBQUMsQ0FBQztRQUM5QixVQUFVO1FBQ0YsbUJBQWEsR0FBUSxDQUFDLENBQUM7UUFDL0IsV0FBVztRQUNILGlCQUFXLEdBQVEsQ0FBQyxDQUFDO1FBQzdCLFVBQVU7UUFDRixpQkFBVyxHQUFRLEdBQUcsQ0FBQztRQUMvQixVQUFVO1FBQ0YsZ0JBQVUsR0FBUyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUN0QyxVQUFVO1FBQ0YseUJBQW1CLEdBQVEsSUFBSSxDQUFDO1FBQ3hDLFVBQVU7UUFDRixpQkFBVyxHQUFRLENBQUMsQ0FBQztRQUM3QixhQUFh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Q0FBQyxHQUFHLEVBQUUsR0FBQyxLQUFLLEVBQ3hCO2dCQUNJLElBQUksQ0FBQyxlQUFlLEdBQUMsSUFBSSxDQUFDO2dCQUMxQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7YUFDcEI7aUJBQ0Q7Z0JBQ0ksSUFBSSxHQUFHLEdBQUMsSUFBSSxDQUFDLEVBQUUsR0FBQyxDQUFDLENBQUM7Z0JBQ2xCLElBQUksQ0FBQyxjQUFjLEdBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFDLEdBQUcsQ0FBQyxHQUFDLEdBQUcsQ0FBQztnQkFDbEUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUN0QjtTQUNKO2FBQUk7WUFDRCxJQUFJLEdBQUcsR0FBQyxJQUFJLENBQUMsRUFBRSxHQUFDLENBQUMsQ0FBQztZQUNsQixJQUFJLFNBQVMsR0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztZQUNyRSxJQUFJLENBQUMsY0FBYyxHQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBQyxHQUFHLENBQUMsR0FBQyxHQUFHLENBQUM7WUFDbEUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUN0QjtJQUNMLENBQUM7SUF4UkQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQzt1Q0FDVTtJQUZmLElBQUk7UUFEeEIsT0FBTztPQUNhLElBQUksQ0EyUnhCO0lBQUQsV0FBQztDQTNSRCxBQTJSQyxDQTNSaUMsZ0JBQU0sR0EyUnZDO2tCQTNSb0IsSUFBSSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdhbWVTdGF0ZSB9IGZyb20gXCIuLi8uLi8uLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi8uLi8uLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgTW9uc3RlciBmcm9tIFwiLi4vLi4vLi4vTW9uc3Rlci9Nb25zdGVyXCI7XHJcbmltcG9ydCB7IEtleUZyYW1lRGF0YSB9IGZyb20gXCIuLi8uLi8uLi9Nb25zdGVyL01vbnN0ZXJEYXRhXCI7XHJcbmltcG9ydCBNb25zdGVyTWFuYWdlciBmcm9tIFwiLi4vLi4vLi4vTW9uc3Rlci9Nb25zdGVyTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTb3VuZEluZGV4IH0gZnJvbSBcIi4uLy4uLy4uL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IEdvbmdKaURhdGEgfSBmcm9tIFwiLi4vLi4vRGF0YS9IZXJvRGF0YVwiO1xyXG5pbXBvcnQgR29uZ0ppIGZyb20gXCIuLi9Hb25nSmlcIjtcclxuaW1wb3J0IHsgQmVhckFuaW1hTmFtZSwgQmVhckF0dGFja0Rpc3RhbmNlLCBCZWFyQXR0YWNrU3BlZWQsIEJlYXJNb3ZlU3BlZWQsIEJlYXJTdGF0ZSB9IGZyb20gXCIuL0JlYXJDb25maWdcIjtcclxuXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJlYXIgZXh0ZW5kcyBHb25nSmkge1xyXG4gICAgQHByb3BlcnR5KHNwLlNrZWxldG9uKVxyXG4gICAgcHJpdmF0ZSBzcGluZTogc3AuU2tlbGV0b249bnVsbDtcclxuICAgIC8qKueGiueahOeKtuaAgSAqL1xyXG4gICAgcHJpdmF0ZSBjdXJfc3RhdGU6QmVhclN0YXRlPUJlYXJTdGF0ZS5ib3JuO1xyXG4gICAgLyoq5b2T5YmN55qE56e75Yqo6YCf5bqmICovXHJcbiAgICBwcml2YXRlIGN1cl9tb3ZlX3NwZWVkOiBudW1iZXI9ODA7XHJcbiAgICAvKirlvZPliY3nmoTnp7vliqjnm67moIflnLDngrnvvIzlj6/og73kvJrnlLHnjqnlrrbngrnlh7vlsY/luZXogIzorr7nva4gKi9cclxuICAgIHByaXZhdGUgbW92ZV90YXJnZXRfcG9zOiBjYy5WZWMyPW51bGw7XHJcbiAgICAvKirlvZPliY3nmoTmlLvlh7vnm67moIcgKi9cclxuICAgIHByaXZhdGUgYXR0X3RhcmdldDogY2MuTm9kZT1udWxsO1xyXG4gICAgLyoq5b2T5YmN55qE56e75Yqo5pa55ZCRICovXHJcbiAgICBwcml2YXRlIG1vdmVfZGlyZWN0aW9uOm51bWJlcj1NYXRoLlBJKjMvMjtcclxuICAgIC8qKiDmlLvlh7vorqHmlbAqL1xyXG4gICAgcHJpdmF0ZSBnb25namlfamlzaHU6bnVtYmVyPTA7XHJcbiAgICAvKiog5pS75Ye76Ze06ZqUKi9cclxuICAgIHByaXZhdGUgZ29uZ2ppX2ppYW5nZTpudW1iZXI9MTtcclxuICAgIC8qKiDln7rnoYDpl7TpmpQgKi9cclxuICAgIHByaXZhdGUgYmFzZV9qaWFuZ2U6bnVtYmVyPTA7XHJcbiAgICAvKirmlLvlh7vot53nprsgKi9cclxuICAgIHByaXZhdGUgZ29uZ2ppX2p1bGk6bnVtYmVyPTEwMDtcclxuICAgIC8qKuaUu+WHu+WdkOaghyAqL1xyXG4gICAgcHJpdmF0ZSBnb25namlfcG9zOmNjLlZlYzI9Y2MudjIoMCwwKTtcclxuICAgIC8qKuWvu+aVjOiMg+WbtCAqL1xyXG4gICAgcHJpdmF0ZSBmaW5kX21vbnN0ZXJfZmFud2VpOm51bWJlcj0xMDAwO1xyXG4gICAgLyoq5oyH5a6a57yp5pS+ICovXHJcbiAgICBwcml2YXRlIHNldHVwX3NjYWxlOm51bWJlcj0xO1xyXG4gICAgLyoq5b2T5YmN55qE5bem5Y+z6Z2i5ZCRICovXHJcbiAgICBwcml2YXRlIGN1cl9pc19sZWZ0OmJvb2xlYW49ZmFsc2U7XHJcbiAgICAvKirln47lopnnmoRZICovXHJcbiAgICB3YWxsX3l5Om51bWJlcj0wO1xyXG4gICAgLyoq54aK5Ymp5L2Z55qE5pe26Ze0ICovXHJcbiAgICByZW1haW5fbnVtOm51bWJlcj0xOyAgIFxyXG5cclxuICAgIGRlc3RvcnlfY2FsbGJhY2s6RnVuY3Rpb249bnVsbDtcclxuICAgIGJlYXJfaWQ6bnVtYmVyPTA7XHJcbiAgICBhb2VfZmFud2VpOm51bWJlcj0wO1xyXG5cclxuICAgIG9uTG9hZCgpe1xyXG4gICAgICAgIGxldCBnb25namlOb2RlPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnZ29uZ2ppJyk7XHJcbiAgICAgICAgdGhpcy5nb25namlfcG9zPWdvbmdqaU5vZGUuZ2V0UG9zaXRpb24oKTtcclxuXHJcbiAgICAgICAgZ29uZ2ppTm9kZS5yZW1vdmVGcm9tUGFyZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdChnakRhdGE6R29uZ0ppRGF0YSxkdDpudW1iZXIsYmVhcklkOm51bWJlcixhb2U6bnVtYmVyPTApe1xyXG4gICAgICAgIGlmKCF0aGlzLnNwaW5lKXtcclxuICAgICAgICAgICAgdGhpcy5zcGluZT10aGlzLm5vZGUuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5pbml0RGF0YShnakRhdGEpO1xyXG4gICAgICAgIHRoaXMuYmVhcl9pZD1iZWFySWQ7XHJcbiAgICAgICAgdGhpcy5nb25namlfamlhbmdlPXRoaXMuYmFzZV9qaWFuZ2U9MS9CZWFyQXR0YWNrU3BlZWQ7XHJcbiAgICAgICAgdGhpcy5jdXJfbW92ZV9zcGVlZD1CZWFyTW92ZVNwZWVkO1xyXG4gICAgICAgIHRoaXMuZ29uZ2ppX2p1bGk9QmVhckF0dGFja0Rpc3RhbmNlO1xyXG4gICAgICAgIHRoaXMuZmluZF9tb25zdGVyX2ZhbndlaT1nakRhdGEuaGVyb19kYXRhLmdvbmdqaV9mYW53ZWk7XHJcbiAgICAgICAgdGhpcy5hb2VfZmFud2VpPWFvZTtcclxuICAgICAgICB0aGlzLnNldEJlYXJTdGF0ZShCZWFyU3RhdGUuYm9ybixmYWxzZSxmYWxzZSxudWxsLHRoaXMuY2hlY2tJZGxlLmJpbmQodGhpcykpO1xyXG4gICAgICAgIHRoaXMud2FsbF95eT1HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmVuZW15X2F0dF95O1xyXG4gICAgICAgIHRoaXMubm9kZS5zY2FsZT10aGlzLnNldHVwX3NjYWxlO1xyXG4gICAgICAgIHRoaXMucmVtYWluX251bT1kdDtcclxuICAgICAgICB0aGlzLm5vZGUuekluZGV4PShNYXRoLnJvdW5kKDgwMDAtdGhpcy5ub2RlLnkqMTApKTtcclxuICAgICAgICBcclxuICAgICAgICAvL3RoaXMuZ29uZ2ppX2ppYW5nZS89MS41O1xyXG4gICAgfVxyXG5cclxuICAgIGFkZERlc3RvcnlMaXN0ZW4oY2FsbEJhY2s6RnVuY3Rpb24pe1xyXG4gICAgICAgIHRoaXMuZGVzdG9yeV9jYWxsYmFjaz1jYWxsQmFjaztcclxuICAgIH1cclxuXHJcbiAgICBzZXRCZWFyU3RhdGUoc3RhdGU6QmVhclN0YXRlLGlzTGVmdDpib29sZWFuPXRydWUsaXNMb29wOmJvb2xlYW49ZmFsc2UsZGF0YT86S2V5RnJhbWVEYXRhW10sZW5kQ2FsbGJhY2s/OkZ1bmN0aW9uKXtcclxuICAgICAgICB0aGlzLmN1cl9zdGF0ZT1zdGF0ZTtcclxuICAgICAgICB0aGlzLmN1cl9pc19sZWZ0PWlzTGVmdDtcclxuICAgICAgICB0aGlzLm5vZGUuc2NhbGVYPXRoaXMuY3VyX2lzX2xlZnQ/LXRoaXMuc2V0dXBfc2NhbGU6dGhpcy5zZXR1cF9zY2FsZTsgICAgICAgIFxyXG4gICAgICAgIHRoaXMucGxheVNwaW5lQW5pbWF0aW9uKHRoaXMuZ2V0QW5pbWFOYW1lKCksaXNMb29wLGRhdGEsZW5kQ2FsbGJhY2spO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEdvbmdKaVBvcygpOmNjLlZlYzJ7XHJcbiAgICAgICAgcmV0dXJuIGNjLnYyKHRoaXMubm9kZS54K3RoaXMuZ29uZ2ppX3Bvcy54KnRoaXMubm9kZS5zY2FsZVgsdGhpcy5ub2RlLnkrdGhpcy5nb25namlfcG9zLnkqdGhpcy5ub2RlLnNjYWxlWSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QW5pbWFOYW1lKCk6c3RyaW5ne1xyXG4gICAgICAgIGxldCBuYW1lPUJlYXJBbmltYU5hbWUuSWRsZTtcclxuICAgICAgICBzd2l0Y2godGhpcy5jdXJfc3RhdGUpe1xyXG4gICAgICAgICAgICBjYXNlIEJlYXJTdGF0ZS5ib3JuOntcclxuICAgICAgICAgICAgICAgIG5hbWU9QmVhckFuaW1hTmFtZS5TdGFydDtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEJlYXJTdGF0ZS5pZGxlOntcclxuICAgICAgICAgICAgICAgIG5hbWU9QmVhckFuaW1hTmFtZS5JZGxlO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQmVhclN0YXRlLm1vdmU6e1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5hdHRfdGFyZ2V0KXtcclxuICAgICAgICAgICAgICAgICAgICAvL+WIpOaWrei3neemu1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkaXN0YW5jZT0odGhpcy5hdHRfdGFyZ2V0LmdldFBvc2l0aW9uKCkuc3ViKHRoaXMuZ2V0R29uZ0ppUG9zKCkpLm1hZygpKTtcclxuICAgICAgICAgICAgICAgICAgICBpZihkaXN0YW5jZT49dGhpcy5jdXJfbW92ZV9zcGVlZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9QmVhckFuaW1hTmFtZS5SdW47XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9QmVhckFuaW1hTmFtZS5XYWxrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU9QmVhckFuaW1hTmFtZS5XYWxrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBCZWFyU3RhdGUuYXR0YWNrOntcclxuICAgICAgICAgICAgICAgIG5hbWU9QmVhckFuaW1hTmFtZS5BdHRhY2s7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmkq3mlL7kuIDkuKrpqqjpqrzliqjnlLtcclxuICAgICAqIEBwYXJhbSBuYW1lIOmqqOmqvOWKqOeUu+WQjeensFxyXG4gICAgICogQHBhcmFtIGlzTG9vcCDmmK/lkKblvqrnjq9cclxuICAgICAqIEBwYXJhbSBkYXRhIOaYr+WQpuebkeWQrOWFs+mUruW4p++8jOWFs+mUruW4p+aVsOaNruWMheWQq+WFs+mUruW4p+WQjeensO+8jOebkeWQrOWIsOWFs+mUruW4p+WQjueahOWbnuiwg1xyXG4gICAgICogQHBhcmFtIGVuZENhbGxiYWNrIOaSreaUvue7k+adn+WQjueahOWbnuiwg1xyXG4gICAgICovXHJcbiAgICAgcGxheVNwaW5lQW5pbWF0aW9uKG5hbWU6c3RyaW5nLGlzTG9vcDpib29sZWFuPWZhbHNlLGRhdGE/OktleUZyYW1lRGF0YVtdLGVuZENhbGxiYWNrPzpGdW5jdGlvbil7ICAgICBcclxuICAgICAgICBpZihpc0xvb3AmJm5hbWU9PXRoaXMuc3BpbmUuYW5pbWF0aW9uKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgYW5pbWE9dGhpcy5zcGluZS5zZXRBbmltYXRpb24oMCxuYW1lLGlzTG9vcCk7XHJcbiAgICAgICAgaWYoZGF0YSl7XHJcbiAgICAgICAgICAgIHRoaXMuc3BpbmUuc2V0VHJhY2tFdmVudExpc3RlbmVyKGFuaW1hLChlbnRyeTogc3Auc3BpbmUuVHJhY2tFbnRyeSwgZXZlbnQpID0+e1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8ZGF0YS5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZXZlbnQuZGF0YS5uYW1lPT1kYXRhW2ldLm5hbWUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhW2ldLmNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihlbmRDYWxsYmFjayl7XHJcbiAgICAgICAgICAgIHRoaXMuc3BpbmUuc2V0VHJhY2tDb21wbGV0ZUxpc3RlbmVyKGFuaW1hLChlbnRyeTogc3Auc3BpbmUuVHJhY2tFbnRyeSwgZXZlbnQpID0+e1xyXG4gICAgICAgICAgICAgICAgYW5pbWEubGlzdGVuZXI9bnVsbDsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBlbmRDYWxsYmFjaygpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGFydEF0dGFjaygpe1xyXG4gICAgICAgIHRoaXMuZ29uZ2ppX2ppc2h1PTA7XHJcbiAgICAgICAgLy/nrpflh7rnhornmoTpnaLlkJFcclxuICAgICAgICBsZXQgaXNMZWZ0PXRoaXMuYXR0X3RhcmdldC54PHRoaXMubm9kZS54O1xyXG4gICAgICAgIGxldCBkYXRhPW5ldyBLZXlGcmFtZURhdGEoKTtcclxuICAgICAgICBkYXRhLm5hbWU9XCJBdHRhY2tcIjtcclxuICAgICAgICBkYXRhLmNhbGxiYWNrPSgpPT57XHJcbiAgICAgICAgICAgIHRoaXMuZ29uZ2ppX2ppc2h1PTA7XHJcbiAgICAgICAgICAgIC8v6YCg5oiQ5Lyk5a6zXHJcbiAgICAgICAgICAgIGlmKHRoaXMuYXR0X3RhcmdldCl7XHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguWVhfU2hvdVdhbmdTa2lsbDIpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG1vbnN0ZXJUcz10aGlzLmF0dF90YXJnZXQuZ2V0Q29tcG9uZW50KE1vbnN0ZXIpO1xyXG4gICAgICAgICAgICAgICAgaWYobW9uc3RlclRzKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZGFtYWdlRGF0YT1tb25zdGVyVHMuYmVGbGFzaEluanVyZWQodGhpcy5nb25namlfZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZGFtYWdlRGF0YS5nZXREYW1hZ2VOdW0oKT4wKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/kuJPmrabojIPlm7TkvKTlrrNcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5hb2VfZmFud2VpPjApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vbnN0ZXJzPU1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TW9uc3RlcnNGb3JDZW50ZXJQb3MoLTEsbW9uc3RlclRzLmdldENlbnRlclBvcygpLHRoaXMuYW9lX2ZhbndlaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+WmguaenOiMg+WbtOWGheacieaAqueJqVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYobW9uc3RlcnMpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPG1vbnN0ZXJzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vbnN0ZXJUVFM9bW9uc3RlcnNbaV0uZ2V0Q29tcG9uZW50KE1vbnN0ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihtb25zdGVyVFRTLnV1aWQhPXRoaXMudXVpZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb25zdGVyVFRTLmJlRmxhc2hJbmp1cmVkKHRoaXMuZ29uZ2ppX2RhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0QmVhclN0YXRlKEJlYXJTdGF0ZS5hdHRhY2ssaXNMZWZ0LGZhbHNlLFtkYXRhXSwoKT0+eyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLmNoZWNrSWRsZSgpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRNb3ZlKGR0Om51bWJlcil7XHJcbiAgICAgICAgbGV0IGRpc1g9dGhpcy5ub2RlLng7XHJcbiAgICAgICAgbGV0IGRpc1k9dGhpcy5ub2RlLnk7XHJcbiAgICAgICAgbGV0IHNwZWVkPXRoaXMuY3VyX21vdmVfc3BlZWQqZHQ7XHJcbiAgICAgICAgZGlzWCs9c3BlZWQqTWF0aC5jb3ModGhpcy5tb3ZlX2RpcmVjdGlvbik7XHJcbiAgICAgICAgZGlzWSs9c3BlZWQqTWF0aC5zaW4odGhpcy5tb3ZlX2RpcmVjdGlvbik7XHJcbiAgICAgICAgdGhpcy5ub2RlLng9ZGlzWDtcclxuICAgICAgICB0aGlzLm5vZGUueT1kaXNZO1xyXG4gICAgICAgIGlmKHRoaXMubm9kZS54PjM2MClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS54PTM2MDtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlX2RpcmVjdGlvbj0oTWF0aC5QSS10aGlzLm1vdmVfZGlyZWN0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5ub2RlLng8LTM2MClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS54PS0zNjA7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZV9kaXJlY3Rpb249KE1hdGguUEktdGhpcy5tb3ZlX2RpcmVjdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5LiN6IO956m/6L+H5Z+O5aKZXHJcbiAgICAgICAgaWYodGhpcy5ub2RlLnk8dGhpcy53YWxsX3l5KXtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnk9dGhpcy53YWxsX3l5O1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgaXNMZWZ0PXRoaXMubW92ZV9kaXJlY3Rpb24+TWF0aC5QSS8yJiZ0aGlzLm1vdmVfZGlyZWN0aW9uPE1hdGguUEkqMy8yO1xyXG4gICAgICAgIHRoaXMuc2V0QmVhclN0YXRlKEJlYXJTdGF0ZS5tb3ZlLGlzTGVmdCx0cnVlKTtcclxuICAgICAgICB0aGlzLm5vZGUuekluZGV4PShNYXRoLnJvdW5kKDgwMDAtdGhpcy5ub2RlLnkqMTApKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydERlc3RvcnkoKXtcclxuICAgICAgICB0aGlzLnNldEJlYXJTdGF0ZShCZWFyU3RhdGUuZGVzdG9yeSk7XHJcbiAgICAgICAgY2MudHdlZW4odGhpcy5ub2RlKS5kZWxheSgwLjUpLnRvKDEse29wYWNpdHk6MH0pLnJlbW92ZVNlbGYoKS5zdGFydCgpO1xyXG4gICAgICAgIGlmKHRoaXMuZGVzdG9yeV9jYWxsYmFjayl7XHJcbiAgICAgICAgICAgIHRoaXMuZGVzdG9yeV9jYWxsYmFjaygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoZHQ6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIGlmKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfc3RhdGUhPUdhbWVTdGF0ZS5HYW1lX1BsYXlpbmcpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBpZih0aGlzLmN1cl9zdGF0ZT09QmVhclN0YXRlLmJvcm58fHRoaXMuY3VyX3N0YXRlPT1CZWFyU3RhdGUuZGVzdG9yeSl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yZW1haW5fbnVtLT1kdDtcclxuICAgICAgICBpZih0aGlzLnJlbWFpbl9udW0+MCl7XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tBdHRhY2soZHQpOyAgXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnREZXN0b3J5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2hlY2tBdHRhY2soZHQ6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuZ29uZ2ppX2ppc2h1Kz1kdDtcclxuICAgICAgICBpZih0aGlzLmN1cl9zdGF0ZSE9QmVhclN0YXRlLmF0dGFjayl7XHJcbiAgICAgICAgICAgIGxldCBtb25zdGVycz1Nb25zdGVyTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1vbnN0ZXJzRm9yQ2VudGVyUG9zKDEsdGhpcy5nZXRHb25nSmlQb3MoKSx0aGlzLmZpbmRfbW9uc3Rlcl9mYW53ZWkpO1xyXG4gICAgICAgICAgICAvL+WmguaenOiMg+WbtOWGheacieaAqueJqVxyXG4gICAgICAgICAgICBpZihtb25zdGVycyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF0dF90YXJnZXQ9bW9uc3RlcnNbMF07XHJcbiAgICAgICAgICAgICAgICAvL+WIpOaWrei3neemu1xyXG4gICAgICAgICAgICAgICAgbGV0IGRpc3RhbmNlPSh0aGlzLmF0dF90YXJnZXQuZ2V0UG9zaXRpb24oKS5zdWIodGhpcy5nZXRHb25nSmlQb3MoKSkubWFnKCkpO1xyXG4gICAgICAgICAgICAgICAgaWYoZGlzdGFuY2U8dGhpcy5nb25namlfanVsaSl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5nb25namlfamlzaHU+PXRoaXMuZ29uZ2ppX2ppYW5nZSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3BpbmUudGltZVNjYWxlPXRoaXMuYmFzZV9qaWFuZ2UvdGhpcy5nb25namlfamlhbmdlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0QXR0YWNrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tJZGxlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja01vdmUoZHQpO1xyXG4gICAgICAgICAgICAgICAgfSAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXR0X3RhcmdldD1udWxsO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja0lkbGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gICAgICAgICAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjaGVja0lkbGUoKXtcclxuICAgICAgICBpZih0aGlzLmN1cl9zdGF0ZT09QmVhclN0YXRlLmlkbGUpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0QmVhclN0YXRlKEJlYXJTdGF0ZS5pZGxlLHRoaXMuY3VyX2lzX2xlZnQsdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjaGVja01vdmUoZHQ6bnVtYmVyKXtcclxuICAgICAgICBsZXQgc3BlZWQ9dGhpcy5jdXJfbW92ZV9zcGVlZCpkdDtcclxuICAgICAgICAvKirlpoLmnpzmnInlkb3ku6TvvIzliJnmiafooYzlkb3ku6QgKi9cclxuICAgICAgICBpZih0aGlzLm1vdmVfdGFyZ2V0X3Bvcyl7XHJcbiAgICAgICAgICAgIGxldCBvZmZzZXRQb3M9dGhpcy5tb3ZlX3RhcmdldF9wb3Muc3ViKHRoaXMuZ2V0R29uZ0ppUG9zKCkpO1xyXG4gICAgICAgICAgICBpZihvZmZzZXRQb3MubWFnKCk8c3BlZWQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubW92ZV90YXJnZXRfcG9zPW51bGw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrSWRsZSgpO1xyXG4gICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcGkyPU1hdGguUEkqMjtcclxuICAgICAgICAgICAgICAgIHRoaXMubW92ZV9kaXJlY3Rpb249KE1hdGguYXRhbjIob2Zmc2V0UG9zLnksb2Zmc2V0UG9zLngpK3BpMiklcGkyO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydE1vdmUoZHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGxldCBwaTI9TWF0aC5QSSoyO1xyXG4gICAgICAgICAgICBsZXQgb2Zmc2V0UG9zPXRoaXMuYXR0X3RhcmdldC5nZXRQb3NpdGlvbigpLnN1Yih0aGlzLmdldEdvbmdKaVBvcygpKTtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlX2RpcmVjdGlvbj0oTWF0aC5hdGFuMihvZmZzZXRQb3MueSxvZmZzZXRQb3MueCkrcGkyKSVwaTI7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRNb3ZlKGR0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19