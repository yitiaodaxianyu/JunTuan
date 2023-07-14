"use strict";
cc._RF.push(module, 'd5e0fZS++FGIJnv90MBO2Bh', 'BatDevil');
// Scripts/Boss/BatDevil.ts

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
var Move_1 = require("../Game/Move");
var GameEffectsManager_1 = require("../Game/GameEffectsManager");
var GameManager_1 = require("../GameManager");
var Constants_1 = require("../Constants");
var MonsterManager_1 = require("../Monster/MonsterManager");
var AudioConstants_1 = require("../Sound/AudioConstants");
var MonsterData_1 = require("../Monster/MonsterData");
var Boss_1 = require("./Boss");
var HeroConfig_1 = require("../Hero/Game/HeroConfig");
var Animation_Name;
(function (Animation_Name) {
    Animation_Name["Idle"] = "idle";
    Animation_Name["attack1"] = "attack1";
    Animation_Name["run"] = "run";
    Animation_Name["hurt1"] = "hurt1";
    Animation_Name["skill1"] = "skill1";
    Animation_Name["dead"] = "dead";
})(Animation_Name || (Animation_Name = {}));
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BatDevil = /** @class */ (function (_super) {
    __extends(BatDevil, _super);
    function BatDevil() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BatDevil.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.boss3_att_move, 2);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.boss3_att_end, 2);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.boss3_skill_move, 1);
        this.addDeathCallback(this.onDeath);
        this.addXuanYunListen(this.onXuanYunResult);
        this.addBossInitedListen(this.onBossInited);
        this.addAttackListen(this.onAttack);
        this.addMoveListen(this.onMove);
    };
    // initMovingTrack(){
    //     let width=222;
    //     let cPos=GameManager.getInstance().getFightCenter();
    //     let aRadian=Math.PI/3;
    //     this.moving_track=new Array();
    //     this.moving_track.push(cPos);
    //     let gg=cc.find('Canvas/Fighting_Root').getComponent(cc.Graphics);
    //     gg.moveTo(cPos.x,cPos.y);
    //     for(let i=PosType.Radian0; i<PosType.Num; i++){
    //         let radian=(i-1)*aRadian;
    //         let posX=cPos.x+width*Math.cos(radian);
    //         let posY=cPos.y+width*Math.sin(radian);
    //         this.moving_track.push(cc.v2(posX,posY));
    //         gg.lineTo(posX,posY);
    //     }
    //     gg.stroke();
    // }
    BatDevil.prototype.onBossInited = function () {
        this.startIdle();
        this.schedule(this.startSkill, 10);
    };
    BatDevil.prototype.startIdle = function () {
        _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.standby);
        _super.prototype.playSpinAnimaton.call(this, Animation_Name.Idle, true);
        this.scheduleOnce(this.startMove, 2);
    };
    BatDevil.prototype.onXuanYunResult = function (isXuanYun) {
        if (isXuanYun) {
            this.startXuanYun();
        }
        else {
            //根据上个状态判断需要做什么
            if (!_super.prototype.isHaveDeBuffType.call(this, HeroConfig_1.BuffType.Vertigo)) {
                if (!_super.prototype.getIsDie.call(this))
                    this.startIdle();
            }
        }
    };
    BatDevil.prototype.startXuanYun = function () {
        var _this = this;
        _super.prototype.playSpinAnimaton.call(this, Animation_Name.hurt1, false, null, function () {
            if (_super.prototype.isHaveDeBuffType.call(_this, HeroConfig_1.BuffType.Vertigo) && !_super.prototype.getIsDie.call(_this))
                _this.spine.paused = true;
        });
    };
    BatDevil.prototype.onAttack = function () {
        var _this = this;
        //有前摇动作
        var data = new MonsterData_1.KeyFrameData();
        data.name = "attack1_Start";
        data.callback = function () {
            _this.startLaunch(cc.v2(_this.node.x + _this.att_pos.x * _this.node.scaleX, _this.node.y + _this.att_pos.y * _this.node.scaleY));
        };
        _super.prototype.playSpinAnimaton.call(this, Animation_Name.attack1, false, data, function () {
            _this.startIdle();
        });
    };
    BatDevil.prototype.onMove = function () {
        _super.prototype.playSpinAnimaton.call(this, Animation_Name.run, true);
    };
    BatDevil.prototype.startSkill = function () {
        var _this = this;
        if (GameManager_1.default.getInstance().cur_game_state != Constants_1.GameState.Game_Playing || _super.prototype.isHaveDeBuffType.call(this, HeroConfig_1.BuffType.Vertigo))
            return;
        this.unschedule(this.startMove);
        _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.skill);
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_BossXuli);
        //蓄力
        var data = new MonsterData_1.KeyFrameData();
        data.name = "skill_Start";
        data.callback = function () {
            _this.releaseSkill();
        };
        _super.prototype.playSpinAnimaton.call(this, Animation_Name.skill1, false, data, function () {
            //如果有技能等待释放，那么就直接释放
            //根据上个状态判断需要做什么
            if (_this.getEnemyPrevState() == EnemyConfig_1.Enemy_State.move) {
                _this.startMove(0, _this.getNextPos());
            }
            else {
                _this.startMove(0);
            }
        });
    };
    BatDevil.prototype.releaseSkill = function () {
        var _this = this;
        var pos = cc.v2(cc.v2(this.node.x + this.att_pos.x * this.node.scaleX, this.node.y + this.att_pos.y * this.node.scaleY));
        var node = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.boss3_skill_move, pos);
        var moveTS = node.getComponent(Move_1.default);
        moveTS.init(640, 0, GameEffectsManager_1.GameEffectId.boss3_skill_move);
        moveTS.setTargetPos(cc.v2(Math.random() * 512 - 256, -1000), function () {
            //GameEffectsManager.getInstance().destroyGameEffectById(GameEffectId.boss3_skill_move,node);            
        }, function () {
            //造成伤害
            _super.prototype.injureWall.call(_this, _this.cur_att, HeroConfig_1.DamageType.Skill);
            GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_BossAttackMinzhong);
        });
    };
    BatDevil.prototype.startLaunch = function (pos) {
        var _this = this;
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_BossAttackGuodu);
        var node = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.boss3_att_move, pos);
        var moveTS = node.getComponent(Move_1.default);
        moveTS.init(540, 0, GameEffectsManager_1.GameEffectId.boss3_att_move);
        moveTS.setTargetPos(cc.v2(Math.random() * 512 - 256, GameManager_1.default.getInstance().enemy_att_y - 20), function () {
            GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.boss3_att_end, node.getPosition());
            GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(GameEffectsManager_1.GameEffectId.boss3_att_move, node);
            //造成伤害
            _super.prototype.injureWall.call(_this, _this.cur_att, HeroConfig_1.DamageType.Normal);
        });
    };
    BatDevil.prototype.onDeath = function () {
        var _this = this;
        this.unscheduleAllCallbacks();
        _super.prototype.playDeadAnimaton.call(this, Animation_Name.dead, function () {
            MonsterManager_1.default.getInstance().destroyMonster(_this.node, _this.monster_type);
        });
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.rewardBox2);
    };
    BatDevil.prototype.update = function (dt) {
        if ((GameManager_1.default.getInstance().cur_game_state != Constants_1.GameState.Game_Playing) || this.getIsDie()) {
            return;
        }
        _super.prototype.update.call(this, dt);
        if (this.getEnemyState() == EnemyConfig_1.Enemy_State.move) {
            this.checkMove(dt);
        }
    };
    BatDevil.prototype.checkMove = function (dt) {
        if (!_super.prototype.isHaveDeBuffType.call(this, HeroConfig_1.BuffType.Vertigo)) {
            var speed = this.cur_move_speed * dt;
            if (this.move_target_pos) {
                var offsetPos = this.move_target_pos.sub(this.node.getPosition());
                this.node.scaleX = offsetPos.x > 0 ? this.setup_scale : -this.setup_scale;
                if (offsetPos.mag() < speed) {
                    if (this.move_end_callback) {
                        this.move_end_callback();
                        this.move_end_callback = null;
                    }
                }
                else {
                    var pi2 = Math.PI * 2;
                    this.move_direction = (Math.atan2(offsetPos.y, offsetPos.x) + pi2) % pi2;
                    this.moving(dt);
                }
            }
        }
    };
    BatDevil.prototype.moving = function (dt) {
        var disX = this.node.x;
        var disY = this.node.y;
        var speed = this.cur_move_speed * dt;
        disX += speed * Math.cos(this.move_direction);
        disY += speed * Math.sin(this.move_direction);
        this.node.x = disX;
        this.node.y = disY;
        if (this.node.x > 320) {
            this.node.x = 320;
        }
        if (this.node.x < -320) {
            this.node.x = -320;
        }
        //不能穿过城墙
        if (this.node.y < this.wall_yy) {
            this.node.y = this.wall_yy;
        }
    };
    BatDevil = __decorate([
        ccclass
    ], BatDevil);
    return BatDevil;
}(Boss_1.default));
exports.default = BatDevil;

cc._RF.pop();