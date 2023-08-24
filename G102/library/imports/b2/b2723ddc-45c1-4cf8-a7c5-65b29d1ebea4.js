"use strict";
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