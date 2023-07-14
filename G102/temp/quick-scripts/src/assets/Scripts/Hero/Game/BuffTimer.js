"use strict";
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