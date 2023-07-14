
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Hero/Game/BuffTimer.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c1b1dadWHhFuKxcQokZA9YK', 'BuffTimer');
// Scripts/Hero/Game/BuffTimer.ts

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
var GameManager_1 = require("../../GameManager");
var GameEffectsManager_1 = require("../../Game/GameEffectsManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BuffTimer = /** @class */ (function (_super) {
    __extends(BuffTimer, _super);
    function BuffTimer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**buff数据 */
        _this.buff_data = null;
        /**时间结束的回调 */
        _this.destroy_callback = [];
        //----------------------------伤害buff的属性-------------------------------------
        /**时间到达触发时间时，触发伤害的回调 */
        _this.damage_listen = null;
        /**时间计数 */
        _this.damage_jishu_time = 0;
        /**伤害来源的数据 */
        _this.gongji_data = null;
        //----------------------------治疗buff的属性-------------------------------------
        /**时间到达触发时间时，治疗的回调 */
        _this.recovery_listen = null;
        /**时间计数 */
        _this.recovery_jishu_time = 0;
        /**治疗量 */
        _this.recovery_num = 0;
        //-----------------------------Buff层数----------------------------
        /**buff爆发层数 */
        _this.burst_num = 0;
        /**buff爆发回调 */
        _this.burst_callback = null;
        /**buff添加层数回调 */
        _this.add_floor_callback = null;
        /**额外的特效 */
        _this.texiao = null;
        _this.texiao_id = GameEffectsManager_1.GameEffectId.Null;
        return _this;
    }
    /**
     * 初始化一个buff
     * @param game_effect_id 该buff的特效id
     * @param buffId buff的id
     * @param type buff的类型
     * @param remainTime buff的持续时间
     * @param value buff的强度值（如减速buff会根据这个值作为减速强度）
     */
    BuffTimer.prototype.init = function (buffData) {
        this.buff_data = buffData;
        this.buff_data.cur_floor = buffData.add_floor;
        if (buffData.fade_time > 0) {
            this.node.opacity = 0;
            cc.tween(this.node).to(buffData.fade_time, { opacity: 255 }).start();
        }
        this.initListen();
    };
    BuffTimer.prototype.initListen = function () {
        this.destroy_callback = new Array();
    };
    /**添加销毁监听 */
    BuffTimer.prototype.addDestroyListen = function (callback) {
        this.destroy_callback.push(callback);
    };
    /**添加buff层数添加监听 */
    BuffTimer.prototype.addFloorListen = function (callback) {
        this.add_floor_callback = callback;
    };
    /**添加buff爆发监听 */
    BuffTimer.prototype.addBurstListen = function (num, callback, gjData) {
        this.burst_num = num;
        this.burst_callback = callback;
        this.gongji_data = gjData;
    };
    /**
     * 覆盖添加伤害触发的监听
     * @param damageListen 伤害监听器
     * @param gjData 攻击数据
     */
    BuffTimer.prototype.addDamageListen = function (damageListen, gjData) {
        this.damage_listen = damageListen;
        this.gongji_data = gjData;
        this.damage_jishu_time = this.buff_data.damage_jiange_time;
    };
    /**
    * 覆盖添加一个治疗监听事件
    * @param recoveryListen 治疗监听器
    * @param gjData
    */
    BuffTimer.prototype.addRecoveryListen = function (recoveryListen, num) {
        this.recovery_listen = recoveryListen;
        this.recovery_num = num;
        this.recovery_jishu_time = this.buff_data.recovery_jiange_time;
    };
    /**获得剩余的时间 */
    BuffTimer.prototype.getRemainTime = function () {
        return this.buff_data.remain_time;
    };
    /**返回Buff类型 */
    BuffTimer.prototype.getBuffType = function () {
        return this.buff_data.buff_type;
    };
    /**返回BuffId */
    BuffTimer.prototype.getBuffId = function () {
        return this.buff_data.buff_id;
    };
    /**返回Buff数值 */
    BuffTimer.prototype.getBuffValue = function () {
        return this.buff_data.buff_value;
    };
    /**返回Buff数值 */
    BuffTimer.prototype.getFirstBuffValue = function () {
        return this.buff_data.buff_value[0];
    };
    /**返回buff的特效id */
    BuffTimer.prototype.getGameEffectId = function () {
        return this.buff_data.game_effect_id;
    };
    /**返回buff叠加的层数 */
    BuffTimer.prototype.getFloorNum = function () {
        return this.buff_data.cur_floor;
    };
    /**添加额外的特效 */
    BuffTimer.prototype.addTeXiao = function (gameEffectId, pos, parent) {
        this.texiao = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectForParent(gameEffectId, pos, parent);
        this.texiao_id = gameEffectId;
    };
    // /**设置渐隐渐显时间 */
    // setFadeTime(dt:number){
    //     this.buff_data.fade_time=dt;
    // }
    /**刷新buff时间 */
    BuffTimer.prototype.refreshBuff = function (newBuff) {
        if (newBuff.remain_time > this.buff_data.remain_time) {
            this.buff_data.remain_time = newBuff.remain_time;
        }
        this.addFloor(newBuff.add_floor);
    };
    BuffTimer.prototype.addFloor = function (num) {
        if (num === void 0) { num = 1; }
        var newFloor = this.buff_data.cur_floor + num;
        if (this.buff_data.max_floor > 0 && newFloor > this.buff_data.max_floor) {
            newFloor = this.buff_data.max_floor;
        }
        this.buff_data.cur_floor = newFloor;
        if (this.burst_num > 0) {
            if (this.buff_data.cur_floor >= this.burst_num) {
                this.buff_data.cur_floor = 0;
                if (this.burst_callback) {
                    this.burst_callback(this.buff_data, this.gongji_data);
                }
            }
        }
        if (this.add_floor_callback) {
            this.add_floor_callback(this.buff_data.cur_floor);
        }
    };
    BuffTimer.prototype.destroySelf = function () {
        GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(this.buff_data.game_effect_id, this.node);
        if (this.destroy_callback.length > 0) {
            for (var i = 0; i < this.destroy_callback.length; i++) {
                this.destroy_callback[i](this.buff_data);
            }
        }
        if (this.texiao) {
            GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(this.texiao_id, this.texiao);
        }
    };
    BuffTimer.prototype.doDamage = function () {
        if (this.damage_listen) {
            //let num=this.damage_listen;
            // if(this.buff_id==Enemy_DeBuff_Type.LiuXue_RenZhe_Active_Skill){
            //     num*=this.buff_floor_num;
            // }
            this.damage_listen.doDamage(this.gongji_data);
        }
    };
    BuffTimer.prototype.doRecovery = function () {
        if (this.recovery_listen) {
            this.recovery_listen.doRecovery(this.recovery_num);
        }
    };
    BuffTimer.prototype.update = function (dt) {
        if (GameManager_1.default.getInstance().cur_game_state == Constants_1.GameState.Game_Playing) {
            if (this.buff_data.remain_time > 0) {
                this.buff_data.remain_time -= dt;
                if (this.buff_data.remain_time < 0) {
                    this.buff_data.remain_time = 0;
                    this.destroySelf();
                }
                if (this.buff_data.fade_time > 0) {
                    if (this.buff_data.remain_time < this.buff_data.fade_time) {
                        this.node.opacity -= dt * 2 * this.buff_data.fade_time;
                    }
                }
                if (this.damage_listen) {
                    this.damage_jishu_time += dt;
                    if (this.damage_jishu_time >= this.buff_data.damage_jiange_time) {
                        this.damage_jishu_time = 0;
                        this.doDamage();
                    }
                }
                if (this.recovery_listen) {
                    this.recovery_jishu_time += dt;
                    if (this.recovery_jishu_time >= this.buff_data.recovery_jiange_time) {
                        this.recovery_jishu_time = 0;
                        this.doRecovery();
                    }
                }
            }
        }
    };
    BuffTimer = __decorate([
        ccclass
    ], BuffTimer);
    return BuffTimer;
}(cc.Component));
exports.default = BuffTimer;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcR2FtZVxcQnVmZlRpbWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZDQUE0QztBQUM1QyxpREFBNEM7QUFJNUMsb0VBQWlGO0FBSzNFLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXVDLDZCQUFZO0lBQW5EO1FBQUEscUVBcU5DO1FBcE5HLFlBQVk7UUFDSixlQUFTLEdBQVUsSUFBSSxDQUFDO1FBQ2hDLGFBQWE7UUFDSCxzQkFBZ0IsR0FBWSxFQUFFLENBQUM7UUFDekMsNEVBQTRFO1FBQzVFLHVCQUF1QjtRQUNmLG1CQUFhLEdBQWMsSUFBSSxDQUFDO1FBQ3hDLFVBQVU7UUFDRix1QkFBaUIsR0FBUyxDQUFDLENBQUM7UUFDcEMsYUFBYTtRQUNMLGlCQUFXLEdBQTJCLElBQUksQ0FBQztRQUNuRCw0RUFBNEU7UUFDNUUscUJBQXFCO1FBQ2IscUJBQWUsR0FBZ0IsSUFBSSxDQUFDO1FBQzVDLFVBQVU7UUFDRix5QkFBbUIsR0FBUyxDQUFDLENBQUM7UUFDdEMsU0FBUztRQUNELGtCQUFZLEdBQVEsQ0FBQyxDQUFDO1FBQzlCLGlFQUFpRTtRQUNqRSxjQUFjO1FBQ04sZUFBUyxHQUFRLENBQUMsQ0FBQztRQUMzQixjQUFjO1FBQ04sb0JBQWMsR0FBVSxJQUFJLENBQUM7UUFDckMsZ0JBQWdCO1FBQ1Isd0JBQWtCLEdBQVUsSUFBSSxDQUFDO1FBQ3pDLFdBQVc7UUFDSCxZQUFNLEdBQVMsSUFBSSxDQUFDO1FBQ3BCLGVBQVMsR0FBYyxpQ0FBWSxDQUFDLElBQUksQ0FBQzs7SUF5THJELENBQUM7SUF4TEc7Ozs7Ozs7T0FPRztJQUNILHdCQUFJLEdBQUosVUFBSyxRQUFpQjtRQUNsQixJQUFJLENBQUMsU0FBUyxHQUFDLFFBQVEsQ0FBQztRQUN4QixJ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QUFDLG1CQUFtQixJQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsb0JBQW9CLEVBQUM7d0JBQzdELElBQUksQ0FBQyxtQkFBbUIsR0FBQyxDQUFDLENBQUM7d0JBQzNCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztxQkFDckI7aUJBQ0o7YUFDSjtTQUNKO0lBQ0wsQ0FBQztJQXBOZ0IsU0FBUztRQUQ3QixPQUFPO09BQ2EsU0FBUyxDQXFON0I7SUFBRCxnQkFBQztDQXJORCxBQXFOQyxDQXJOc0MsRUFBRSxDQUFDLFNBQVMsR0FxTmxEO2tCQXJOb0IsU0FBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdhbWVTdGF0ZSB9IGZyb20gXCIuLi8uLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi8uLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBHb25nSmlEYXRhIH0gZnJvbSBcIi4uL0RhdGEvSGVyb0RhdGFcIjtcclxuaW1wb3J0IHsgQnVmZklkLCBCdWZmVHlwZSwgRGFtYWdlVHlwZSB9IGZyb20gXCIuL0hlcm9Db25maWdcIjtcclxuaW1wb3J0IHsgRGFtYWdlTGlzdGVuLCBSZWNvdmVyeUxpc3RlbiB9IGZyb20gXCIuLi9Ta2lsbC9Ta2lsbENvbmZpZ1wiO1xyXG5pbXBvcnQgeyBHYW1lRWZmZWN0SWQsIEdhbWVFZmZlY3RzTWFuYWdlciB9IGZyb20gXCIuLi8uLi9HYW1lL0dhbWVFZmZlY3RzTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBCdWZmRGF0YSB9IGZyb20gXCIuL0J1ZmZEYXRhXCI7XHJcbmltcG9ydCB7IE1vbnN0ZXJBdHREYXRhIH0gZnJvbSBcIi4uLy4uL01vbnN0ZXIvTW9uc3RlckRhdGFcIjtcclxuXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJ1ZmZUaW1lciBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICAvKipidWZm5pWw5o2uICovICAgIFxyXG4gICAgcHJpdmF0ZSBidWZmX2RhdGE6QnVmZkRhdGE9bnVsbDtcclxuICAgIC8qKuaXtumXtOe7k+adn+eahOWbnuiwgyAqL1xyXG4gICAgcHJvdGVjdGVkIGRlc3Ryb3lfY2FsbGJhY2s6RnVuY3Rpb25bXT1bXTtcclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLeS8pOWus2J1ZmbnmoTlsZ7mgKctLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvKirml7bpl7TliLDovr7op6blj5Hml7bpl7Tml7bvvIzop6blj5HkvKTlrrPnmoTlm57osIMgKi9cclxuICAgIHByaXZhdGUgZGFtYWdlX2xpc3RlbjpEYW1hZ2VMaXN0ZW49bnVsbDtcclxuICAgIC8qKuaXtumXtOiuoeaVsCAqL1xyXG4gICAgcHJpdmF0ZSBkYW1hZ2VfamlzaHVfdGltZTogbnVtYmVyPTA7XHJcbiAgICAvKirkvKTlrrPmnaXmupDnmoTmlbDmja4gKi9cclxuICAgIHByaXZhdGUgZ29uZ2ppX2RhdGE6R29uZ0ppRGF0YXxNb25zdGVyQXR0RGF0YT1udWxsO1xyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t5rK755aXYnVmZueahOWxnuaApy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8qKuaXtumXtOWIsOi+vuinpuWPkeaXtumXtOaXtu+8jOayu+eWl+eahOWbnuiwgyAqL1xyXG4gICAgcHJpdmF0ZSByZWNvdmVyeV9saXN0ZW46UmVjb3ZlcnlMaXN0ZW49bnVsbDtcclxuICAgIC8qKuaXtumXtOiuoeaVsCAqL1xyXG4gICAgcHJpdmF0ZSByZWNvdmVyeV9qaXNodV90aW1lOiBudW1iZXI9MDtcclxuICAgIC8qKuayu+eWl+mHjyAqL1xyXG4gICAgcHJpdmF0ZSByZWNvdmVyeV9udW06bnVtYmVyPTA7XHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tQnVmZuWxguaVsC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8qKmJ1ZmbniIblj5HlsYLmlbAgKi9cclxuICAgIHByaXZhdGUgYnVyc3RfbnVtOm51bWJlcj0wO1xyXG4gICAgLyoqYnVmZueIhuWPkeWbnuiwgyAqL1xyXG4gICAgcHJpdmF0ZSBidXJzdF9jYWxsYmFjazpGdW5jdGlvbj1udWxsO1xyXG4gICAgLyoqYnVmZua3u+WKoOWxguaVsOWbnuiwgyAqL1xyXG4gICAgcHJpdmF0ZSBhZGRfZmxvb3JfY2FsbGJhY2s6RnVuY3Rpb249bnVsbDtcclxuICAgIC8qKumineWklueahOeJueaViCAqL1xyXG4gICAgcHJpdmF0ZSB0ZXhpYW86Y2MuTm9kZT1udWxsO1xyXG4gICAgcHJpdmF0ZSB0ZXhpYW9faWQ6R2FtZUVmZmVjdElkPUdhbWVFZmZlY3RJZC5OdWxsO1xyXG4gICAgLyoqXHJcbiAgICAgKiDliJ3lp4vljJbkuIDkuKpidWZmXHJcbiAgICAgKiBAcGFyYW0gZ2FtZV9lZmZlY3RfaWQg6K+lYnVmZueahOeJueaViGlkXHJcbiAgICAgKiBAcGFyYW0gYnVmZklkIGJ1ZmbnmoRpZFxyXG4gICAgICogQHBhcmFtIHR5cGUgYnVmZueahOexu+Wei1xyXG4gICAgICogQHBhcmFtIHJlbWFpblRpbWUgYnVmZueahOaMgee7reaXtumXtFxyXG4gICAgICogQHBhcmFtIHZhbHVlIGJ1ZmbnmoTlvLrluqblgLzvvIjlpoLlh4/pgJ9idWZm5Lya5qC55o2u6L+Z5Liq5YC85L2c5Li65YeP6YCf5by65bqm77yJXHJcbiAgICAgKi9cclxuICAgIGluaXQoYnVmZkRhdGE6QnVmZkRhdGEpe1xyXG4gICAgICAgIHRoaXMuYnVmZl9kYXRhPWJ1ZmZEYXRhO1xyXG4gICAgICAgIHRoaXMuYnVmZl9kYXRhLmN1cl9mbG9vcj1idWZmRGF0YS5hZGRfZmxvb3I7XHJcbiAgICAgICAgaWYoYnVmZkRhdGEuZmFkZV90aW1lPjApe1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUub3BhY2l0eT0wO1xyXG4gICAgICAgICAgICBjYy50d2Vlbih0aGlzLm5vZGUpLnRvKGJ1ZmZEYXRhLmZhZGVfdGltZSx7b3BhY2l0eToyNTV9KS5zdGFydCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmluaXRMaXN0ZW4oKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRMaXN0ZW4oKXtcclxuICAgICAgICB0aGlzLmRlc3Ryb3lfY2FsbGJhY2s9bmV3IEFycmF5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5re75Yqg6ZSA5q+B55uR5ZCsICovXHJcbiAgICBhZGREZXN0cm95TGlzdGVuKGNhbGxiYWNrOkZ1bmN0aW9uKXtcclxuICAgICAgICB0aGlzLmRlc3Ryb3lfY2FsbGJhY2sucHVzaChjYWxsYmFjayk7XHJcbiAgICB9XHJcbiAgICAvKirmt7vliqBidWZm5bGC5pWw5re75Yqg55uR5ZCsICovXHJcbiAgICBhZGRGbG9vckxpc3RlbihjYWxsYmFjazpGdW5jdGlvbil7XHJcbiAgICAgICAgdGhpcy5hZGRfZmxvb3JfY2FsbGJhY2s9Y2FsbGJhY2s7XHJcbiAgICB9XHJcbiAgICAvKirmt7vliqBidWZm54iG5Y+R55uR5ZCsICovXHJcbiAgICBhZGRCdXJzdExpc3RlbihudW06bnVtYmVyLGNhbGxiYWNrOkZ1bmN0aW9uLGdqRGF0YTpHb25nSmlEYXRhKXtcclxuICAgICAgICB0aGlzLmJ1cnN0X251bT1udW07XHJcbiAgICAgICAgdGhpcy5idXJzdF9jYWxsYmFjaz1jYWxsYmFjaztcclxuICAgICAgICB0aGlzLmdvbmdqaV9kYXRhPWdqRGF0YTtcclxuICAgIH1cclxuICAgLyoqXHJcbiAgICAqIOimhueblua3u+WKoOS8pOWus+inpuWPkeeahOebkeWQrFxyXG4gICAgKiBAcGFyYW0gZGFtYWdlTGlzdGVuIOS8pOWus+ebkeWQrOWZqFxyXG4gICAgKiBAcGFyYW0gZ2pEYXRhIOaUu+WHu+aVsOaNrlxyXG4gICAgKi9cclxuICAgIGFkZERhbWFnZUxpc3RlbihkYW1hZ2VMaXN0ZW46RGFtYWdlTGlzdGVuLGdqRGF0YTpHb25nSmlEYXRhfE1vbnN0ZXJBdHREYXRhKXtcclxuICAgICAgICB0aGlzLmRhbWFnZV9saXN0ZW49ZGFtYWdlTGlzdGVuO1xyXG4gICAgICAgIHRoaXMuZ29uZ2ppX2RhdGE9Z2pEYXRhO1xyXG4gICAgICAgIHRoaXMuZGFtYWdlX2ppc2h1X3RpbWU9dGhpcy5idWZmX2RhdGEuZGFtYWdlX2ppYW5nZV90aW1lO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiDopobnm5bmt7vliqDkuIDkuKrmsrvnlpfnm5HlkKzkuovku7ZcclxuICAgICogQHBhcmFtIHJlY292ZXJ5TGlzdGVuIOayu+eWl+ebkeWQrOWZqFxyXG4gICAgKiBAcGFyYW0gZ2pEYXRhIFxyXG4gICAgKi9cclxuICAgIGFkZFJlY292ZXJ5TGlzdGVuKHJlY292ZXJ5TGlzdGVuOlJlY292ZXJ5TGlzdGVuLG51bTpudW1iZXIpe1xyXG4gICAgICAgIHRoaXMucmVjb3ZlcnlfbGlzdGVuPXJlY292ZXJ5TGlzdGVuO1xyXG4gICAgICAgIHRoaXMucmVjb3ZlcnlfbnVtPW51bTtcclxuICAgICAgICB0aGlzLnJlY292ZXJ5X2ppc2h1X3RpbWU9dGhpcy5idWZmX2RhdGEucmVjb3ZlcnlfamlhbmdlX3RpbWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq6I635b6X5Ymp5L2Z55qE5pe26Ze0ICovXHJcbiAgICBnZXRSZW1haW5UaW1lKCk6bnVtYmVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLmJ1ZmZfZGF0YS5yZW1haW5fdGltZTtcclxuICAgIH1cclxuICAgIC8qKui/lOWbnkJ1ZmbnsbvlnosgKi9cclxuICAgIGdldEJ1ZmZUeXBlKCk6QnVmZlR5cGV7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYnVmZl9kYXRhLmJ1ZmZfdHlwZTtcclxuICAgIH1cclxuICAgIC8qKui/lOWbnkJ1ZmZJZCAqL1xyXG4gICAgZ2V0QnVmZklkKCk6QnVmZklke1xyXG4gICAgICAgIHJldHVybiB0aGlzLmJ1ZmZfZGF0YS5idWZmX2lkO1xyXG4gICAgfVxyXG4gICAgLyoq6L+U5ZueQnVmZuaVsOWAvCAqL1xyXG4gICAgZ2V0QnVmZlZhbHVlKCk6bnVtYmVyW117ICAgICAgICBcclxuICAgICAgICByZXR1cm4gdGhpcy5idWZmX2RhdGEuYnVmZl92YWx1ZTtcclxuICAgIH1cclxuICAgIC8qKui/lOWbnkJ1ZmbmlbDlgLwgKi9cclxuICAgIGdldEZpcnN0QnVmZlZhbHVlKCk6bnVtYmVyeyAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYnVmZl9kYXRhLmJ1ZmZfdmFsdWVbMF07XHJcbiAgICB9XHJcbiAgICAvKirov5Tlm55idWZm55qE54m55pWIaWQgKi9cclxuICAgIGdldEdhbWVFZmZlY3RJZCgpOkdhbWVFZmZlY3RJZHtcclxuICAgICAgICByZXR1cm4gdGhpcy5idWZmX2RhdGEuZ2FtZV9lZmZlY3RfaWQ7XHJcbiAgICB9XHJcbiAgICAvKirov5Tlm55idWZm5Y+g5Yqg55qE5bGC5pWwICovXHJcbiAgICBnZXRGbG9vck51bSgpOm51bWJlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5idWZmX2RhdGEuY3VyX2Zsb29yO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKua3u+WKoOmineWklueahOeJueaViCAqL1xyXG4gICAgYWRkVGVYaWFvKGdhbWVFZmZlY3RJZDpHYW1lRWZmZWN0SWQscG9zOmNjLlZlYzIscGFyZW50OmNjLk5vZGUpe1xyXG4gICAgICAgIHRoaXMudGV4aWFvPUdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RGb3JQYXJlbnQoZ2FtZUVmZmVjdElkLHBvcyxwYXJlbnQpO1xyXG4gICAgICAgIHRoaXMudGV4aWFvX2lkPWdhbWVFZmZlY3RJZDtcclxuICAgIH1cclxuICAgIC8vIC8qKuiuvue9rua4kOmakOa4kOaYvuaXtumXtCAqL1xyXG4gICAgLy8gc2V0RmFkZVRpbWUoZHQ6bnVtYmVyKXtcclxuICAgIC8vICAgICB0aGlzLmJ1ZmZfZGF0YS5mYWRlX3RpbWU9ZHQ7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLyoq5Yi35pawYnVmZuaXtumXtCAqL1xyXG4gICAgcmVmcmVzaEJ1ZmYobmV3QnVmZjpCdWZmRGF0YSl7XHJcbiAgICAgICAgaWYobmV3QnVmZi5yZW1haW5fdGltZT50aGlzLmJ1ZmZfZGF0YS5yZW1haW5fdGltZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuYnVmZl9kYXRhLnJlbWFpbl90aW1lPW5ld0J1ZmYucmVtYWluX3RpbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYWRkRmxvb3IobmV3QnVmZi5hZGRfZmxvb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZEZsb29yKG51bTpudW1iZXI9MSl7XHJcbiAgICAgICAgbGV0IG5ld0Zsb29yPXRoaXMuYnVmZl9kYXRhLmN1cl9mbG9vcitudW07XHJcbiAgICAgICAgaWYodGhpcy5idWZmX2RhdGEubWF4X2Zsb29yPjAgJiZuZXdGbG9vcj50aGlzLmJ1ZmZfZGF0YS5tYXhfZmxvb3Ipe1xyXG4gICAgICAgICAgICBuZXdGbG9vcj10aGlzLmJ1ZmZfZGF0YS5tYXhfZmxvb3I7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYnVmZl9kYXRhLmN1cl9mbG9vcj1uZXdGbG9vcjtcclxuICAgICAgICBpZih0aGlzLmJ1cnN0X251bT4wKXsgICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYodGhpcy5idWZmX2RhdGEuY3VyX2Zsb29yPj10aGlzLmJ1cnN0X251bSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ1ZmZfZGF0YS5jdXJfZmxvb3I9MDtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuYnVyc3RfY2FsbGJhY2spe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnVyc3RfY2FsbGJhY2sodGhpcy5idWZmX2RhdGEsdGhpcy5nb25namlfZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5hZGRfZmxvb3JfY2FsbGJhY2spe1xyXG4gICAgICAgICAgICB0aGlzLmFkZF9mbG9vcl9jYWxsYmFjayh0aGlzLmJ1ZmZfZGF0YS5jdXJfZmxvb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkZXN0cm95U2VsZigpe1xyXG4gICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmRlc3Ryb3lHYW1lRWZmZWN0QnlJZCh0aGlzLmJ1ZmZfZGF0YS5nYW1lX2VmZmVjdF9pZCx0aGlzLm5vZGUpO1xyXG4gICAgICAgIGlmKHRoaXMuZGVzdHJveV9jYWxsYmFjay5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPHRoaXMuZGVzdHJveV9jYWxsYmFjay5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlc3Ryb3lfY2FsbGJhY2tbaV0odGhpcy5idWZmX2RhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLnRleGlhbyl7XHJcbiAgICAgICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmRlc3Ryb3lHYW1lRWZmZWN0QnlJZCh0aGlzLnRleGlhb19pZCx0aGlzLnRleGlhbyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRvRGFtYWdlKCl7XHJcbiAgICAgICAgaWYodGhpcy5kYW1hZ2VfbGlzdGVuKXtcclxuICAgICAgICAgICAgLy9sZXQgbnVtPXRoaXMuZGFtYWdlX2xpc3RlbjtcclxuICAgICAgICAgICAgLy8gaWYodGhpcy5idWZmX2lkPT1FbmVteV9EZUJ1ZmZfVHlwZS5MaXVYdWVfUmVuWmhlX0FjdGl2ZV9Ta2lsbCl7XHJcbiAgICAgICAgICAgIC8vICAgICBudW0qPXRoaXMuYnVmZl9mbG9vcl9udW07XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgdGhpcy5kYW1hZ2VfbGlzdGVuLmRvRGFtYWdlKHRoaXMuZ29uZ2ppX2RhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkb1JlY292ZXJ5KCl7XHJcbiAgICAgICAgaWYodGhpcy5yZWNvdmVyeV9saXN0ZW4pe1xyXG4gICAgICAgICAgICB0aGlzLnJlY292ZXJ5X2xpc3Rlbi5kb1JlY292ZXJ5KHRoaXMucmVjb3ZlcnlfbnVtKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHVwZGF0ZShkdDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zdGF0ZT09R2FtZVN0YXRlLkdhbWVfUGxheWluZyl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuYnVmZl9kYXRhLnJlbWFpbl90aW1lPjApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5idWZmX2RhdGEucmVtYWluX3RpbWUtPWR0O1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5idWZmX2RhdGEucmVtYWluX3RpbWU8MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idWZmX2RhdGEucmVtYWluX3RpbWU9MDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlc3Ryb3lTZWxmKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmJ1ZmZfZGF0YS5mYWRlX3RpbWU+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5idWZmX2RhdGEucmVtYWluX3RpbWU8dGhpcy5idWZmX2RhdGEuZmFkZV90aW1lKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHktPWR0KjIqdGhpcy5idWZmX2RhdGEuZmFkZV90aW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuZGFtYWdlX2xpc3Rlbil7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYW1hZ2VfamlzaHVfdGltZSs9ZHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5kYW1hZ2VfamlzaHVfdGltZT49dGhpcy5idWZmX2RhdGEuZGFtYWdlX2ppYW5nZV90aW1lKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYW1hZ2VfamlzaHVfdGltZT0wO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRvRGFtYWdlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5yZWNvdmVyeV9saXN0ZW4pe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVjb3ZlcnlfamlzaHVfdGltZSs9ZHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5yZWNvdmVyeV9qaXNodV90aW1lPj10aGlzLmJ1ZmZfZGF0YS5yZWNvdmVyeV9qaWFuZ2VfdGltZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVjb3ZlcnlfamlzaHVfdGltZT0wO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRvUmVjb3ZlcnkoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19