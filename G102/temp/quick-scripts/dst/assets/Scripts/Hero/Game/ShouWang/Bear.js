
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
        var _this = this;
        if (isLoop === void 0) { isLoop = false; }
        if (isLoop && name == this.spine.animation) {
            return;
        }
        var anima = this.spine.setAnimation(0, name, isLoop);
        // if(data){
        //     this.spine.setTrackEventListener(anima,(entry: sp.spine.TrackEntry, event) =>{
        //         for(let i=0; i<data.length; i++){
        //             if(event.data.name==data[i].name){
        //                 data[i].callback();
        //             }
        //         }
        //     })
        // }
        // if(endCallback){
        //     this.spine.setTrackCompleteListener(anima,(entry: sp.spine.TrackEntry, event) =>{
        //         anima.listener=null;                
        //         endCallback();
        //     })
        // }
        if (endCallback) {
            this.spine.setCompleteListener(function (trackEntry, loopCount) {
                var nameTemp = trackEntry.animation ? trackEntry.animation.name : '';
                if (nameTemp === name && endCallback) {
                    if (data && data[0].callback) {
                        data[0].callback();
                    }
                    endCallback();
                }
                _this.spine.setCompleteListener(null);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcR2FtZVxcU2hvdVdhbmdcXEJlYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0RBQStDO0FBQy9DLG9EQUErQztBQUMvQyxvREFBK0M7QUFDL0MsNERBQTREO0FBQzVELGtFQUE2RDtBQUM3RCxnRUFBMkQ7QUFFM0Qsb0NBQStCO0FBQy9CLDJDQUE0RztBQUd0RyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFrQyx3QkFBTTtJQUF4QztRQUFBLHFFQTJTQztRQXpTVyxXQUFLLEdBQWMsSUFBSSxDQUFDO1FBQ2hDLFVBQVU7UUFDRixlQUFTLEdBQVcsc0JBQVMsQ0FBQyxJQUFJLENBQUM7UUFDM0MsYUFBYTtRQUNMLG9CQUFjLEdBQVMsRUFBRSxDQUFDO1FBQ2xDLDZCQUE2QjtRQUNyQixxQkFBZSxHQUFVLElBQUksQ0FBQztRQUN0QyxhQUFhO1FBQ0wsZ0JBQVUsR0FBVSxJQUFJLENBQUM7UUFDakMsYUFBYTtRQUNMLG9CQUFjLEdBQVEsSUFBSSxDQUFDLEVBQUUsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDO1FBQzFDLFVBQVU7UUFDRixrQkFBWSxHQUFRLENBQUMsQ0FBQztRQUM5QixVQUFVO1FBQ0YsbUJBQWEsR0FBUSxDQUFDLENBQUM7UUFDL0IsV0FBVztRQUNILGlCQUFXLEdBQVEsQ0FBQyxDQUFDO1FBQzdCLFVBQVU7UUFDRixpQkFBVyxHQUFRLEdBQUcsQ0FBQztRQUMvQixVQUFVO1FBQ0YsZ0JBQVUsR0FBUyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUN0QyxVQUFVO1FBQ0YseUJBQW1CLEdBQVEsSUFBSSxDQUFDO1FBQ3hDLFVBQVU7UUFDRixpQkFBVyxHQUFRLENBQUMsQ0FBQztRQUM3QixhQUFh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M1NpQyxnQkFBTSxHQTJTdkM7a0JBM1NvQixJQUFJIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR2FtZVN0YXRlIH0gZnJvbSBcIi4uLy4uLy4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uLy4uLy4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCBNb25zdGVyIGZyb20gXCIuLi8uLi8uLi9Nb25zdGVyL01vbnN0ZXJcIjtcclxuaW1wb3J0IHsgS2V5RnJhbWVEYXRhIH0gZnJvbSBcIi4uLy4uLy4uL01vbnN0ZXIvTW9uc3RlckRhdGFcIjtcclxuaW1wb3J0IE1vbnN0ZXJNYW5hZ2VyIGZyb20gXCIuLi8uLi8uLi9Nb25zdGVyL01vbnN0ZXJNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFNvdW5kSW5kZXggfSBmcm9tIFwiLi4vLi4vLi4vU291bmQvQXVkaW9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgR29uZ0ppRGF0YSB9IGZyb20gXCIuLi8uLi9EYXRhL0hlcm9EYXRhXCI7XHJcbmltcG9ydCBHb25nSmkgZnJvbSBcIi4uL0dvbmdKaVwiO1xyXG5pbXBvcnQgeyBCZWFyQW5pbWFOYW1lLCBCZWFyQXR0YWNrRGlzdGFuY2UsIEJlYXJBdHRhY2tTcGVlZCwgQmVhck1vdmVTcGVlZCwgQmVhclN0YXRlIH0gZnJvbSBcIi4vQmVhckNvbmZpZ1wiO1xyXG5cclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmVhciBleHRlbmRzIEdvbmdKaSB7XHJcbiAgICBAcHJvcGVydHkoc3AuU2tlbGV0b24pXHJcbiAgICBwcml2YXRlIHNwaW5lOiBzcC5Ta2VsZXRvbj1udWxsO1xyXG4gICAgLyoq54aK55qE54q25oCBICovXHJcbiAgICBwcml2YXRlIGN1cl9zdGF0ZTpCZWFyU3RhdGU9QmVhclN0YXRlLmJvcm47XHJcbiAgICAvKirlvZPliY3nmoTnp7vliqjpgJ/luqYgKi9cclxuICAgIHByaXZhdGUgY3VyX21vdmVfc3BlZWQ6IG51bWJlcj04MDtcclxuICAgIC8qKuW9k+WJjeeahOenu+WKqOebruagh+WcsOeCue+8jOWPr+iDveS8mueUseeOqeWutueCueWHu+Wxj+W5leiAjOiuvue9riAqL1xyXG4gICAgcHJpdmF0ZSBtb3ZlX3RhcmdldF9wb3M6IGNjLlZlYzI9bnVsbDtcclxuICAgIC8qKuW9k+WJjeeahOaUu+WHu+ebruaghyAqL1xyXG4gICAgcHJpdmF0ZSBhdHRfdGFyZ2V0OiBjYy5Ob2RlPW51bGw7XHJcbiAgICAvKirlvZPliY3nmoTnp7vliqjmlrnlkJEgKi9cclxuICAgIHByaXZhdGUgbW92ZV9kaXJlY3Rpb246bnVtYmVyPU1hdGguUEkqMy8yO1xyXG4gICAgLyoqIOaUu+WHu+iuoeaVsCovXHJcbiAgICBwcml2YXRlIGdvbmdqaV9qaXNodTpudW1iZXI9MDtcclxuICAgIC8qKiDmlLvlh7vpl7TpmpQqL1xyXG4gICAgcHJpdmF0ZSBnb25namlfamlhbmdlOm51bWJlcj0xO1xyXG4gICAgLyoqIOWfuuehgOmXtOmalCAqL1xyXG4gICAgcHJpdmF0ZSBiYXNlX2ppYW5nZTpudW1iZXI9MDtcclxuICAgIC8qKuaUu+WHu+i3neemuyAqL1xyXG4gICAgcHJpdmF0ZSBnb25namlfanVsaTpudW1iZXI9MTAwO1xyXG4gICAgLyoq5pS75Ye75Z2Q5qCHICovXHJcbiAgICBwcml2YXRlIGdvbmdqaV9wb3M6Y2MuVmVjMj1jYy52MigwLDApO1xyXG4gICAgLyoq5a+75pWM6IyD5Zu0ICovXHJcbiAgICBwcml2YXRlIGZpbmRfbW9uc3Rlcl9mYW53ZWk6bnVtYmVyPTEwMDA7XHJcbiAgICAvKirmjIflrprnvKnmlL4gKi9cclxuICAgIHByaXZhdGUgc2V0dXBfc2NhbGU6bnVtYmVyPTE7XHJcbiAgICAvKirlvZPliY3nmoTlt6blj7PpnaLlkJEgKi9cclxuICAgIHByaXZhdGUgY3VyX2lzX2xlZnQ6Ym9vbGVhbj1mYWxzZTtcclxuICAgIC8qKuWfjuWimeeahFkgKi9cclxuICAgIHdhbGxfeXk6bnVtYmVyPTA7XHJcbiAgICAvKirnhorliankvZnnmoTml7bpl7QgKi9cclxuICAgIHJlbWFpbl9udW06bnVtYmVyPTE7ICAgXHJcblxyXG4gICAgZGVzdG9yeV9jYWxsYmFjazpGdW5jdGlvbj1udWxsO1xyXG4gICAgYmVhcl9pZDpudW1iZXI9MDtcclxuICAgIGFvZV9mYW53ZWk6bnVtYmVyPTA7XHJcblxyXG4gICAgb25Mb2FkKCl7XHJcbiAgICAgICAgbGV0IGdvbmdqaU5vZGU9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdnb25namknKTtcclxuICAgICAgICB0aGlzLmdvbmdqaV9wb3M9Z29uZ2ppTm9kZS5nZXRQb3NpdGlvbigpO1xyXG5cclxuICAgICAgICBnb25namlOb2RlLnJlbW92ZUZyb21QYXJlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0KGdqRGF0YTpHb25nSmlEYXRhLGR0Om51bWJlcixiZWFySWQ6bnVtYmVyLGFvZTpudW1iZXI9MCl7XHJcbiAgICAgICAgaWYoIXRoaXMuc3BpbmUpe1xyXG4gICAgICAgICAgICB0aGlzLnNwaW5lPXRoaXMubm9kZS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmluaXREYXRhKGdqRGF0YSk7XHJcbiAgICAgICAgdGhpcy5iZWFyX2lkPWJlYXJJZDtcclxuICAgICAgICB0aGlzLmdvbmdqaV9qaWFuZ2U9dGhpcy5iYXNlX2ppYW5nZT0xL0JlYXJBdHRhY2tTcGVlZDtcclxuICAgICAgICB0aGlzLmN1cl9tb3ZlX3NwZWVkPUJlYXJNb3ZlU3BlZWQ7XHJcbiAgICAgICAgdGhpcy5nb25namlfanVsaT1CZWFyQXR0YWNrRGlzdGFuY2U7XHJcbiAgICAgICAgdGhpcy5maW5kX21vbnN0ZXJfZmFud2VpPWdqRGF0YS5oZXJvX2RhdGEuZ29uZ2ppX2ZhbndlaTtcclxuICAgICAgICB0aGlzLmFvZV9mYW53ZWk9YW9lO1xyXG4gICAgICAgIHRoaXMuc2V0QmVhclN0YXRlKEJlYXJTdGF0ZS5ib3JuLGZhbHNlLGZhbHNlLG51bGwsdGhpcy5jaGVja0lkbGUuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgdGhpcy53YWxsX3l5PUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW5lbXlfYXR0X3k7XHJcbiAgICAgICAgdGhpcy5ub2RlLnNjYWxlPXRoaXMuc2V0dXBfc2NhbGU7XHJcbiAgICAgICAgdGhpcy5yZW1haW5fbnVtPWR0O1xyXG4gICAgICAgIHRoaXMubm9kZS56SW5kZXg9KE1hdGgucm91bmQoODAwMC10aGlzLm5vZGUueSoxMCkpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vdGhpcy5nb25namlfamlhbmdlLz0xLjU7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkRGVzdG9yeUxpc3RlbihjYWxsQmFjazpGdW5jdGlvbil7XHJcbiAgICAgICAgdGhpcy5kZXN0b3J5X2NhbGxiYWNrPWNhbGxCYWNrO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEJlYXJTdGF0ZShzdGF0ZTpCZWFyU3RhdGUsaXNMZWZ0OmJvb2xlYW49dHJ1ZSxpc0xvb3A6Ym9vbGVhbj1mYWxzZSxkYXRhPzpLZXlGcmFtZURhdGFbXSxlbmRDYWxsYmFjaz86RnVuY3Rpb24pe1xyXG4gICAgICAgIHRoaXMuY3VyX3N0YXRlPXN0YXRlO1xyXG4gICAgICAgIHRoaXMuY3VyX2lzX2xlZnQ9aXNMZWZ0O1xyXG4gICAgICAgIHRoaXMubm9kZS5zY2FsZVg9dGhpcy5jdXJfaXNfbGVmdD8tdGhpcy5zZXR1cF9zY2FsZTp0aGlzLnNldHVwX3NjYWxlOyAgICAgICAgXHJcbiAgICAgICAgdGhpcy5wbGF5U3BpbmVBbmltYXRpb24odGhpcy5nZXRBbmltYU5hbWUoKSxpc0xvb3AsZGF0YSxlbmRDYWxsYmFjayk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0R29uZ0ppUG9zKCk6Y2MuVmVjMntcclxuICAgICAgICByZXR1cm4gY2MudjIodGhpcy5ub2RlLngrdGhpcy5nb25namlfcG9zLngqdGhpcy5ub2RlLnNjYWxlWCx0aGlzLm5vZGUueSt0aGlzLmdvbmdqaV9wb3MueSp0aGlzLm5vZGUuc2NhbGVZKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRBbmltYU5hbWUoKTpzdHJpbmd7XHJcbiAgICAgICAgbGV0IG5hbWU9QmVhckFuaW1hTmFtZS5JZGxlO1xyXG4gICAgICAgIHN3aXRjaCh0aGlzLmN1cl9zdGF0ZSl7XHJcbiAgICAgICAgICAgIGNhc2UgQmVhclN0YXRlLmJvcm46e1xyXG4gICAgICAgICAgICAgICAgbmFtZT1CZWFyQW5pbWFOYW1lLlN0YXJ0O1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQmVhclN0YXRlLmlkbGU6e1xyXG4gICAgICAgICAgICAgICAgbmFtZT1CZWFyQW5pbWFOYW1lLklkbGU7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBCZWFyU3RhdGUubW92ZTp7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmF0dF90YXJnZXQpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5Yik5pat6Led56a7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRpc3RhbmNlPSh0aGlzLmF0dF90YXJnZXQuZ2V0UG9zaXRpb24oKS5zdWIodGhpcy5nZXRHb25nSmlQb3MoKSkubWFnKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGRpc3RhbmNlPj10aGlzLmN1cl9tb3ZlX3NwZWVkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZT1CZWFyQW5pbWFOYW1lLlJ1bjtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZT1CZWFyQW5pbWFOYW1lLldhbGs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZT1CZWFyQW5pbWFOYW1lLldhbGs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEJlYXJTdGF0ZS5hdHRhY2s6e1xyXG4gICAgICAgICAgICAgICAgbmFtZT1CZWFyQW5pbWFOYW1lLkF0dGFjaztcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmFtZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaSreaUvuS4gOS4qumqqOmqvOWKqOeUu1xyXG4gICAgICogQHBhcmFtIG5hbWUg6aqo6aq85Yqo55S75ZCN56ewXHJcbiAgICAgKiBAcGFyYW0gaXNMb29wIOaYr+WQpuW+queOr1xyXG4gICAgICogQHBhcmFtIGRhdGEg5piv5ZCm55uR5ZCs5YWz6ZSu5bin77yM5YWz6ZSu5bin5pWw5o2u5YyF5ZCr5YWz6ZSu5bin5ZCN56ew77yM55uR5ZCs5Yiw5YWz6ZSu5bin5ZCO55qE5Zue6LCDXHJcbiAgICAgKiBAcGFyYW0gZW5kQ2FsbGJhY2sg5pKt5pS+57uT5p2f5ZCO55qE5Zue6LCDXHJcbiAgICAgKi9cclxuICAgICBwbGF5U3BpbmVBbmltYXRpb24obmFtZTpzdHJpbmcsaXNMb29wOmJvb2xlYW49ZmFsc2UsZGF0YT86S2V5RnJhbWVEYXRhW10sZW5kQ2FsbGJhY2s/OkZ1bmN0aW9uKXsgICAgIFxyXG4gICAgICAgIGlmKGlzTG9vcCYmbmFtZT09dGhpcy5zcGluZS5hbmltYXRpb24pe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBhbmltYT10aGlzLnNwaW5lLnNldEFuaW1hdGlvbigwLG5hbWUsaXNMb29wKTtcclxuICAgICAgICAvLyBpZihkYXRhKXtcclxuICAgICAgICAvLyAgICAgdGhpcy5zcGluZS5zZXRUcmFja0V2ZW50TGlzdGVuZXIoYW5pbWEsKGVudHJ5OiBzcC5zcGluZS5UcmFja0VudHJ5LCBldmVudCkgPT57XHJcbiAgICAgICAgLy8gICAgICAgICBmb3IobGV0IGk9MDsgaTxkYXRhLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAvLyAgICAgICAgICAgICBpZihldmVudC5kYXRhLm5hbWU9PWRhdGFbaV0ubmFtZSl7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGRhdGFbaV0uY2FsbGJhY2soKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgIH0pXHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIGlmKGVuZENhbGxiYWNrKXtcclxuICAgICAgICAvLyAgICAgdGhpcy5zcGluZS5zZXRUcmFja0NvbXBsZXRlTGlzdGVuZXIoYW5pbWEsKGVudHJ5OiBzcC5zcGluZS5UcmFja0VudHJ5LCBldmVudCkgPT57XHJcbiAgICAgICAgLy8gICAgICAgICBhbmltYS5saXN0ZW5lcj1udWxsOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAvLyAgICAgICAgIGVuZENhbGxiYWNrKCk7XHJcbiAgICAgICAgLy8gICAgIH0pXHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICBpZihlbmRDYWxsYmFjayl7XHJcbiAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc3BpbmUuc2V0Q29tcGxldGVMaXN0ZW5lcigodHJhY2tFbnRyeSwgbG9vcENvdW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmFtZVRlbXAgPSB0cmFja0VudHJ5LmFuaW1hdGlvbiA/IHRyYWNrRW50cnkuYW5pbWF0aW9uLm5hbWUgOiAnJztcclxuICAgICAgICAgICAgICAgIGlmIChuYW1lVGVtcCA9PT0gbmFtZSAmJiBlbmRDYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZGF0YSYmZGF0YVswXS5jYWxsYmFjayl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFbMF0uY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZW5kQ2FsbGJhY2soKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuc3BpbmUuc2V0Q29tcGxldGVMaXN0ZW5lcihudWxsKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0QXR0YWNrKCl7XHJcbiAgICAgICAgdGhpcy5nb25namlfamlzaHU9MDtcclxuICAgICAgICAvL+eul+WHuueGiueahOmdouWQkVxyXG4gICAgICAgIGxldCBpc0xlZnQ9dGhpcy5hdHRfdGFyZ2V0Lng8dGhpcy5ub2RlLng7XHJcbiAgICAgICAgbGV0IGRhdGE9bmV3IEtleUZyYW1lRGF0YSgpO1xyXG4gICAgICAgIGRhdGEubmFtZT1cIkF0dGFja1wiO1xyXG4gICAgICAgIGRhdGEuY2FsbGJhY2s9KCk9PntcclxuICAgICAgICAgICAgdGhpcy5nb25namlfamlzaHU9MDtcclxuICAgICAgICAgICAgLy/pgKDmiJDkvKTlrrNcclxuICAgICAgICAgICAgaWYodGhpcy5hdHRfdGFyZ2V0KXtcclxuICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5ZWF9TaG91V2FuZ1NraWxsMik7XHJcbiAgICAgICAgICAgICAgICBsZXQgbW9uc3RlclRzPXRoaXMuYXR0X3RhcmdldC5nZXRDb21wb25lbnQoTW9uc3Rlcik7XHJcbiAgICAgICAgICAgICAgICBpZihtb25zdGVyVHMpe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkYW1hZ2VEYXRhPW1vbnN0ZXJUcy5iZUZsYXNoSW5qdXJlZCh0aGlzLmdvbmdqaV9kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICBpZihkYW1hZ2VEYXRhLmdldERhbWFnZU51bSgpPjApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+S4k+atpuiMg+WbtOS8pOWus1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmFvZV9mYW53ZWk+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW9uc3RlcnM9TW9uc3Rlck1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNb25zdGVyc0ZvckNlbnRlclBvcygtMSxtb25zdGVyVHMuZ2V0Q2VudGVyUG9zKCksdGhpcy5hb2VfZmFud2VpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5aaC5p6c6IyD5Zu05YaF5pyJ5oCq54mpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihtb25zdGVycyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8bW9uc3RlcnMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW9uc3RlclRUUz1tb25zdGVyc1tpXS5nZXRDb21wb25lbnQoTW9uc3Rlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKG1vbnN0ZXJUVFMudXVpZCE9dGhpcy51dWlkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vbnN0ZXJUVFMuYmVGbGFzaEluanVyZWQodGhpcy5nb25namlfZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXRCZWFyU3RhdGUoQmVhclN0YXRlLmF0dGFjayxpc0xlZnQsZmFsc2UsW2RhdGFdLCgpPT57ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tJZGxlKCk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBzdGFydE1vdmUoZHQ6bnVtYmVyKXtcclxuICAgICAgICBsZXQgZGlzWD10aGlzLm5vZGUueDtcclxuICAgICAgICBsZXQgZGlzWT10aGlzLm5vZGUueTtcclxuICAgICAgICBsZXQgc3BlZWQ9dGhpcy5jdXJfbW92ZV9zcGVlZCpkdDtcclxuICAgICAgICBkaXNYKz1zcGVlZCpNYXRoLmNvcyh0aGlzLm1vdmVfZGlyZWN0aW9uKTtcclxuICAgICAgICBkaXNZKz1zcGVlZCpNYXRoLnNpbih0aGlzLm1vdmVfZGlyZWN0aW9uKTtcclxuICAgICAgICB0aGlzLm5vZGUueD1kaXNYO1xyXG4gICAgICAgIHRoaXMubm9kZS55PWRpc1k7XHJcbiAgICAgICAgaWYodGhpcy5ub2RlLng+MzYwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLng9MzYwO1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVfZGlyZWN0aW9uPShNYXRoLlBJLXRoaXMubW92ZV9kaXJlY3Rpb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLm5vZGUueDwtMzYwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLng9LTM2MDtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlX2RpcmVjdGlvbj0oTWF0aC5QSS10aGlzLm1vdmVfZGlyZWN0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/kuI3og73nqb/ov4fln47loplcclxuICAgICAgICBpZih0aGlzLm5vZGUueTx0aGlzLndhbGxfeXkpe1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUueT10aGlzLndhbGxfeXk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBpc0xlZnQ9dGhpcy5tb3ZlX2RpcmVjdGlvbj5NYXRoLlBJLzImJnRoaXMubW92ZV9kaXJlY3Rpb248TWF0aC5QSSozLzI7XHJcbiAgICAgICAgdGhpcy5zZXRCZWFyU3RhdGUoQmVhclN0YXRlLm1vdmUsaXNMZWZ0LHRydWUpO1xyXG4gICAgICAgIHRoaXMubm9kZS56SW5kZXg9KE1hdGgucm91bmQoODAwMC10aGlzLm5vZGUueSoxMCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0RGVzdG9yeSgpe1xyXG4gICAgICAgIHRoaXMuc2V0QmVhclN0YXRlKEJlYXJTdGF0ZS5kZXN0b3J5KTtcclxuICAgICAgICBjYy50d2Vlbih0aGlzLm5vZGUpLmRlbGF5KDAuNSkudG8oMSx7b3BhY2l0eTowfSkucmVtb3ZlU2VsZigpLnN0YXJ0KCk7XHJcbiAgICAgICAgaWYodGhpcy5kZXN0b3J5X2NhbGxiYWNrKXtcclxuICAgICAgICAgICAgdGhpcy5kZXN0b3J5X2NhbGxiYWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShkdDpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zdGF0ZSE9R2FtZVN0YXRlLkdhbWVfUGxheWluZylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGlmKHRoaXMuY3VyX3N0YXRlPT1CZWFyU3RhdGUuYm9ybnx8dGhpcy5jdXJfc3RhdGU9PUJlYXJTdGF0ZS5kZXN0b3J5KXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlbWFpbl9udW0tPWR0O1xyXG4gICAgICAgIGlmKHRoaXMucmVtYWluX251bT4wKXtcclxuICAgICAgICAgICAgdGhpcy5jaGVja0F0dGFjayhkdCk7ICBcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5zdGFydERlc3RvcnkoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjaGVja0F0dGFjayhkdDpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5nb25namlfamlzaHUrPWR0O1xyXG4gICAgICAgIGlmKHRoaXMuY3VyX3N0YXRlIT1CZWFyU3RhdGUuYXR0YWNrKXtcclxuICAgICAgICAgICAgbGV0IG1vbnN0ZXJzPU1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TW9uc3RlcnNGb3JDZW50ZXJQb3MoMSx0aGlzLmdldEdvbmdKaVBvcygpLHRoaXMuZmluZF9tb25zdGVyX2ZhbndlaSk7XHJcbiAgICAgICAgICAgIC8v5aaC5p6c6IyD5Zu05YaF5pyJ5oCq54mpXHJcbiAgICAgICAgICAgIGlmKG1vbnN0ZXJzKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXR0X3RhcmdldD1tb25zdGVyc1swXTtcclxuICAgICAgICAgICAgICAgIC8v5Yik5pat6Led56a7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGlzdGFuY2U9KHRoaXMuYXR0X3RhcmdldC5nZXRQb3NpdGlvbigpLnN1Yih0aGlzLmdldEdvbmdKaVBvcygpKS5tYWcoKSk7XHJcbiAgICAgICAgICAgICAgICBpZihkaXN0YW5jZTx0aGlzLmdvbmdqaV9qdWxpKXtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmdvbmdqaV9qaXNodT49dGhpcy5nb25namlfamlhbmdlKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zcGluZS50aW1lU2NhbGU9dGhpcy5iYXNlX2ppYW5nZS90aGlzLmdvbmdqaV9qaWFuZ2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRBdHRhY2soKTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja0lkbGUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrTW92ZShkdCk7XHJcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdHRfdGFyZ2V0PW51bGw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrSWRsZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSAgICAgICAgICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNoZWNrSWRsZSgpe1xyXG4gICAgICAgIGlmKHRoaXMuY3VyX3N0YXRlPT1CZWFyU3RhdGUuaWRsZSl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXRCZWFyU3RhdGUoQmVhclN0YXRlLmlkbGUsdGhpcy5jdXJfaXNfbGVmdCx0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNoZWNrTW92ZShkdDpudW1iZXIpe1xyXG4gICAgICAgIGxldCBzcGVlZD10aGlzLmN1cl9tb3ZlX3NwZWVkKmR0O1xyXG4gICAgICAgIC8qKuWmguaenOacieWRveS7pO+8jOWImeaJp+ihjOWRveS7pCAqL1xyXG4gICAgICAgIGlmKHRoaXMubW92ZV90YXJnZXRfcG9zKXtcclxuICAgICAgICAgICAgbGV0IG9mZnNldFBvcz10aGlzLm1vdmVfdGFyZ2V0X3Bvcy5zdWIodGhpcy5nZXRHb25nSmlQb3MoKSk7XHJcbiAgICAgICAgICAgIGlmKG9mZnNldFBvcy5tYWcoKTxzcGVlZClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlX3RhcmdldF9wb3M9bnVsbDtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tJZGxlKCk7XHJcbiAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxldCBwaTI9TWF0aC5QSSoyO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlX2RpcmVjdGlvbj0oTWF0aC5hdGFuMihvZmZzZXRQb3MueSxvZmZzZXRQb3MueCkrcGkyKSVwaTI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0TW92ZShkdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgbGV0IHBpMj1NYXRoLlBJKjI7XHJcbiAgICAgICAgICAgIGxldCBvZmZzZXRQb3M9dGhpcy5hdHRfdGFyZ2V0LmdldFBvc2l0aW9uKCkuc3ViKHRoaXMuZ2V0R29uZ0ppUG9zKCkpO1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVfZGlyZWN0aW9uPShNYXRoLmF0YW4yKG9mZnNldFBvcy55LG9mZnNldFBvcy54KStwaTIpJXBpMjtcclxuICAgICAgICAgICAgdGhpcy5zdGFydE1vdmUoZHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=