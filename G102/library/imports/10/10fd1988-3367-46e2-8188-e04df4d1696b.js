"use strict";
cc._RF.push(module, '10fd1mIM2dG4oGI4E300Wlr', 'ShaChenBao');
// Scripts/Hero/Game/ANuBiSi/ShaChenBao.ts

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
var Monster_1 = require("../../../Monster/Monster");
var MonsterData_1 = require("../../../Monster/MonsterData");
var MonsterManager_1 = require("../../../Monster/MonsterManager");
var AudioConstants_1 = require("../../../Sound/AudioConstants");
var MyTool_1 = require("../../../Tools/MyTool");
var GongJi_1 = require("../GongJi");
var HeroConfig_1 = require("../HeroConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ShaChenBao = /** @class */ (function (_super) {
    __extends(ShaChenBao, _super);
    function ShaChenBao() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.remain_time = 0;
        _this.damage_time = 0;
        _this.damage_jiange = 1;
        _this.fanwei = 100;
        /**牵引速度 */
        _this.qianyin_sudu = 200;
        /**当前的旋转弧度度 */
        _this.cur_rotation = 0;
        /**旋转速度 */
        _this.ratating_speed = Math.PI;
        /**漩涡最小距离 */
        _this.min_distance = 100;
        return _this;
    }
    ShaChenBao.prototype.init = function (gjData, remainTime, damageJianGe, fanwei) {
        _super.prototype.initData.call(this, gjData);
        this.remain_time = remainTime;
        this.damage_jiange = damageJianGe;
        this.damage_time = 0;
        this.fanwei = fanwei;
        this.node.scale = fanwei / 110;
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_ANBSSkill);
    };
    ShaChenBao.prototype.destroySelf = function () {
        GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(GameEffectsManager_1.GameEffectId.a_nu_bi_si_active_skill_1, this.node);
    };
    ShaChenBao.prototype.update = function (dt) {
        if (GameManager_1.default.getInstance().cur_game_state == Constants_1.GameState.Game_Playing) {
            if (this.remain_time > 0) {
                this.cur_rotation += dt * this.ratating_speed;
                this.remain_time -= dt;
                var isDie = false;
                if (this.remain_time < 0) {
                    this.remain_time = 0;
                    this.destroySelf();
                    isDie = true;
                }
                //牵引
                var allMonster = MonsterManager_1.default.getInstance().node.children;
                var len = allMonster.length;
                this.damage_time -= dt;
                var isCanDamage = false;
                if (this.damage_time < 0) {
                    this.damage_time = this.damage_jiange;
                    //造成伤害
                    isCanDamage = true;
                }
                if (len <= 0) {
                    return null;
                }
                for (var i = 0; i < len; i++) {
                    var monster = allMonster[i];
                    var monsterTS = monster.getComponent(Monster_1.default);
                    if (monsterTS && monsterTS.getIsCanCheck()) {
                        var offsetPos = this.node.getPosition().sub(monsterTS.getCenterPos());
                        var distance = offsetPos.mag();
                        if (distance <= this.fanwei) {
                            if (isCanDamage) {
                                monsterTS.beFlashInjured(this.gongji_data);
                            }
                            if (monsterTS.getStrengthType() != MonsterData_1.StrengthType.Boss) {
                                var radian = Math.atan2(offsetPos.y, offsetPos.x);
                                //牵引，强制位移
                                var xx = Math.cos(radian) * this.qianyin_sudu * dt;
                                var yy = Math.sin(radian) * this.qianyin_sudu * dt;
                                var disX = monster.x + xx;
                                var disY = monster.y + yy;
                                //旋转
                                var offsetCenter = cc.v2(disX, disY).sub(this.node.getPosition());
                                var centerDistance = offsetCenter.mag();
                                var min = MyTool_1.default.randomRangeInt(50, 120);
                                monsterTS.setQianYinMin(min);
                                if (centerDistance < monsterTS.getQianYinMin()) {
                                    centerDistance = monsterTS.getQianYinMin();
                                }
                                //旋转,下一帧的相对弧度
                                var curR = Math.atan2(offsetCenter.y, offsetCenter.x);
                                curR = (curR + (Math.PI * 2)) % (Math.PI * 2);
                                var nextDadian = curR + this.ratating_speed * dt;
                                nextDadian = (nextDadian + (Math.PI * 2)) % (Math.PI * 2);
                                //根据半径和弧度求下一点坐标
                                disY = this.node.y + Math.sin(nextDadian) * centerDistance;
                                disX = this.node.x + Math.cos(nextDadian) * centerDistance;
                                monsterTS.setX(disX);
                                monsterTS.setY(disY);
                                if (monsterTS.isHaveDeBuff(HeroConfig_1.BuffId.Hero_MeiMo_Active_MeiHuo) == false) {
                                    monsterTS.setMoveDir(radian + Math.PI);
                                    monsterTS.setFlip(disX > this.node.x);
                                }
                                if (isDie) {
                                    monsterTS.setMoveDir(Math.PI * 3 / 2);
                                }
                                // if(centerDistance>this.min_distance){
                                //     monsterTS.setX(disX);
                                //     monsterTS.setY(disY);
                                // }
                            }
                        }
                        else {
                            if (monsterTS.isHaveDeBuff(HeroConfig_1.BuffId.Hero_MeiMo_Active_MeiHuo) == false) {
                                monsterTS.setMoveDir(Math.PI * 3 / 2);
                            }
                        }
                    }
                }
            }
        }
    };
    ShaChenBao = __decorate([
        ccclass
    ], ShaChenBao);
    return ShaChenBao;
}(GongJi_1.default));
exports.default = ShaChenBao;

cc._RF.pop();