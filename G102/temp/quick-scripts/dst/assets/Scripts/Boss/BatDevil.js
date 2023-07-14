
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Boss/BatDevil.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcQm9zc1xcQmF0RGV2aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0RBQXNFO0FBQ3RFLHFDQUFnQztBQUNoQyxpRUFBOEU7QUFDOUUsOENBQXlDO0FBQ3pDLDBDQUF5QztBQUN6Qyw0REFBdUQ7QUFDdkQsMERBQXFEO0FBQ3JELHNEQUFzRDtBQUN0RCwrQkFBMEI7QUFDMUIsc0RBQStEO0FBRS9ELElBQUssY0FRSjtBQVJELFdBQUssY0FBYztJQUVmLCtCQUFhLENBQUE7SUFDYixxQ0FBbUIsQ0FBQTtJQUNuQiw2QkFBVyxDQUFBO0lBQ1gsaUNBQWUsQ0FBQTtJQUNmLG1DQUFpQixDQUFBO0lBQ2pCLCtCQUFZLENBQUE7QUFDaEIsQ0FBQyxFQVJJLGNBQWMsS0FBZCxjQUFjLFFBUWxCO0FBR0ssSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBc0MsNEJBQUk7SUFBMUM7O0lBcU1BLENBQUM7SUFqTUcseUJBQU0sR0FBTjtRQUNJLGlCQUFNLE1BQU0sV0FBRSxDQUFDO1FBQ2YsdUNBQWtCLENBQUMsV0FBVyxFQUFFLENBQUMsaUJBQWlCLENBQUMsaUNBQVksQ0FBQyxjQUFjLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEYsdUNBQWtCLENBQUMsV0FBVyxFQUFFLENBQUMsaUJBQWlCLENBQUMsaUNBQVksQ0FBQyxhQUFhLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakYsdUNBQWtCLENBQUMsV0FBVyxFQUFFLENBQUMsaUJBQWlCLENBQUMsaUNBQVksQ0FBQyxnQkFBZ0IsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUNwRixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMs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QUksQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztTQUM1QjtJQUNMLENBQUM7SUFuTWdCLFFBQVE7UUFENUIsT0FBTztPQUNhLFFBQVEsQ0FxTTVCO0lBQUQsZUFBQztDQXJNRCxBQXFNQyxDQXJNcUMsY0FBSSxHQXFNekM7a0JBck1vQixRQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRW5lbXlfRGVCdWZmX1R5cGUsIEVuZW15X1N0YXRlIH0gZnJvbSBcIi4uL0VuZW15L0VuZW15Q29uZmlnXCI7XHJcbmltcG9ydCBNb3ZlIGZyb20gXCIuLi9HYW1lL01vdmVcIjtcclxuaW1wb3J0IHsgR2FtZUVmZmVjdElkLCBHYW1lRWZmZWN0c01hbmFnZXIgfSBmcm9tIFwiLi4vR2FtZS9HYW1lRWZmZWN0c01hbmFnZXJcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBHYW1lU3RhdGUgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBNb25zdGVyTWFuYWdlciBmcm9tIFwiLi4vTW9uc3Rlci9Nb25zdGVyTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTb3VuZEluZGV4IH0gZnJvbSBcIi4uL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IEtleUZyYW1lRGF0YSB9IGZyb20gXCIuLi9Nb25zdGVyL01vbnN0ZXJEYXRhXCI7XHJcbmltcG9ydCBCb3NzIGZyb20gXCIuL0Jvc3NcIjtcclxuaW1wb3J0IHsgQnVmZlR5cGUsIERhbWFnZVR5cGUgfSBmcm9tIFwiLi4vSGVyby9HYW1lL0hlcm9Db25maWdcIjtcclxuXHJcbmVudW0gQW5pbWF0aW9uX05hbWVcclxue1xyXG4gICAgSWRsZSA9IFwiaWRsZVwiLCAgICAgICAvLy0tIOato+mdouW+heaculxyXG4gICAgYXR0YWNrMSA9IFwiYXR0YWNrMVwiLCAgICAgICAgICAvLy0tIOaUu+WHuzFcclxuICAgIHJ1biA9IFwicnVuXCIsICAgICAgICAgICAgICAgIC8vLS0g6LeR6LevXHJcbiAgICBodXJ0MSA9IFwiaHVydDFcIiwgICAgICAgICAgLy8tLSDlj5flh7sxXHJcbiAgICBza2lsbDEgPSBcInNraWxsMVwiLCAgICAgICAgICAvLy0tIOaKgOiDveWKqOS9nDFcclxuICAgIGRlYWQ9IFwiZGVhZFwiLCAgIC8v5q275LqhXHJcbn1cclxuXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhdERldmlsIGV4dGVuZHMgQm9zcyB7XHJcblxyXG4gICAgXHJcblxyXG4gICAgb25Mb2FkKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xyXG4gICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEVmZmVjdFBvb2xCeUlkKEdhbWVFZmZlY3RJZC5ib3NzM19hdHRfbW92ZSwyKTtcclxuICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRFZmZlY3RQb29sQnlJZChHYW1lRWZmZWN0SWQuYm9zczNfYXR0X2VuZCwyKTtcclxuICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRFZmZlY3RQb29sQnlJZChHYW1lRWZmZWN0SWQuYm9zczNfc2tpbGxfbW92ZSwxKTtcclxuICAgICAgICB0aGlzLmFkZERlYXRoQ2FsbGJhY2sodGhpcy5vbkRlYXRoKTtcclxuICAgICAgICB0aGlzLmFkZFh1YW5ZdW5MaXN0ZW4odGhpcy5vblh1YW5ZdW5SZXN1bHQpO1xyXG4gICAgICAgIHRoaXMuYWRkQm9zc0luaXRlZExpc3Rlbih0aGlzLm9uQm9zc0luaXRlZCk7XHJcbiAgICAgICAgdGhpcy5hZGRBdHRhY2tMaXN0ZW4odGhpcy5vbkF0dGFjayk7XHJcbiAgICAgICAgdGhpcy5hZGRNb3ZlTGlzdGVuKHRoaXMub25Nb3ZlKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBpbml0TW92aW5nVHJhY2soKXtcclxuICAgIC8vICAgICBsZXQgd2lkdGg9MjIyO1xyXG4gICAgLy8gICAgIGxldCBjUG9zPUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RmlnaHRDZW50ZXIoKTtcclxuICAgIC8vICAgICBsZXQgYVJhZGlhbj1NYXRoLlBJLzM7XHJcbiAgICAvLyAgICAgdGhpcy5tb3ZpbmdfdHJhY2s9bmV3IEFycmF5KCk7XHJcbiAgICAvLyAgICAgdGhpcy5tb3ZpbmdfdHJhY2sucHVzaChjUG9zKTtcclxuICAgIC8vICAgICBsZXQgZ2c9Y2MuZmluZCgnQ2FudmFzL0ZpZ2h0aW5nX1Jvb3QnKS5nZXRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgLy8gICAgIGdnLm1vdmVUbyhjUG9zLngsY1Bvcy55KTtcclxuICAgIC8vICAgICBmb3IobGV0IGk9UG9zVHlwZS5SYWRpYW4wOyBpPFBvc1R5cGUuTnVtOyBpKyspe1xyXG4gICAgLy8gICAgICAgICBsZXQgcmFkaWFuPShpLTEpKmFSYWRpYW47XHJcbiAgICAvLyAgICAgICAgIGxldCBwb3NYPWNQb3MueCt3aWR0aCpNYXRoLmNvcyhyYWRpYW4pO1xyXG4gICAgLy8gICAgICAgICBsZXQgcG9zWT1jUG9zLnkrd2lkdGgqTWF0aC5zaW4ocmFkaWFuKTtcclxuICAgIC8vICAgICAgICAgdGhpcy5tb3ZpbmdfdHJhY2sucHVzaChjYy52Mihwb3NYLHBvc1kpKTtcclxuICAgIC8vICAgICAgICAgZ2cubGluZVRvKHBvc1gscG9zWSk7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gICAgIGdnLnN0cm9rZSgpO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIG9uQm9zc0luaXRlZCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnN0YXJ0SWRsZSgpO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy5zdGFydFNraWxsLDEwKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgc3RhcnRJZGxlKCl7ICAgICAgICBcclxuICAgICAgICBzdXBlci5zZXRFbmVteVN0YXRlKEVuZW15X1N0YXRlLnN0YW5kYnkpO1xyXG4gICAgICAgIHN1cGVyLnBsYXlTcGluQW5pbWF0b24oQW5pbWF0aW9uX05hbWUuSWRsZSx0cnVlKTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSh0aGlzLnN0YXJ0TW92ZSwyKVxyXG4gICAgfVxyXG5cclxuICAgIG9uWHVhbll1blJlc3VsdChpc1h1YW5ZdW46Ym9vbGVhbil7XHJcbiAgICAgICAgaWYoaXNYdWFuWXVuKXtcclxuICAgICAgICAgICAgdGhpcy5zdGFydFh1YW5ZdW4oKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgLy/moLnmja7kuIrkuKrnirbmgIHliKTmlq3pnIDopoHlgZrku4DkuYhcclxuICAgICAgICAgICAgaWYoIXN1cGVyLmlzSGF2ZURlQnVmZlR5cGUoQnVmZlR5cGUuVmVydGlnbykpe1xyXG4gICAgICAgICAgICAgICAgaWYoIXN1cGVyLmdldElzRGllKCkpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0SWRsZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGFydFh1YW5ZdW4oKXtcclxuICAgICAgICBzdXBlci5wbGF5U3BpbkFuaW1hdG9uKEFuaW1hdGlvbl9OYW1lLmh1cnQxLGZhbHNlLG51bGwsKCk9PntcclxuICAgICAgICAgICAgaWYoc3VwZXIuaXNIYXZlRGVCdWZmVHlwZShCdWZmVHlwZS5WZXJ0aWdvKSYmIXN1cGVyLmdldElzRGllKCkpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNwaW5lLnBhdXNlZD10cnVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQXR0YWNrKCl7XHJcbiAgICAgICAgLy/mnInliY3mkYfliqjkvZxcclxuICAgICAgICBsZXQgZGF0YT1uZXcgS2V5RnJhbWVEYXRhKCk7XHJcbiAgICAgICAgZGF0YS5uYW1lPVwiYXR0YWNrMV9TdGFydFwiO1xyXG4gICAgICAgIGRhdGEuY2FsbGJhY2s9KCk9PntcclxuICAgICAgICAgICAgdGhpcy5zdGFydExhdW5jaChjYy52Mih0aGlzLm5vZGUueCt0aGlzLmF0dF9wb3MueCp0aGlzLm5vZGUuc2NhbGVYLHRoaXMubm9kZS55K3RoaXMuYXR0X3Bvcy55KnRoaXMubm9kZS5zY2FsZVkpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3VwZXIucGxheVNwaW5BbmltYXRvbihBbmltYXRpb25fTmFtZS5hdHRhY2sxLGZhbHNlLGRhdGEsKCk9PntcclxuICAgICAgICAgICAgdGhpcy5zdGFydElkbGUoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBvbk1vdmUoKXtcclxuICAgICAgICBzdXBlci5wbGF5U3BpbkFuaW1hdG9uKEFuaW1hdGlvbl9OYW1lLnJ1bix0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydFNraWxsKCl7XHJcbiAgICAgICAgaWYoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zdGF0ZSE9R2FtZVN0YXRlLkdhbWVfUGxheWluZyB8fCBzdXBlci5pc0hhdmVEZUJ1ZmZUeXBlKEJ1ZmZUeXBlLlZlcnRpZ28pKVxyXG4gICAgICAgICAgICByZXR1cm47ICAgICAgICBcclxuICAgICAgICB0aGlzLnVuc2NoZWR1bGUodGhpcy5zdGFydE1vdmUpO1xyXG4gICAgICAgIHN1cGVyLnNldEVuZW15U3RhdGUoRW5lbXlfU3RhdGUuc2tpbGwpO1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5ZWF9Cb3NzWHVsaSk7XHJcbiAgICAgICAgLy/ok4TliptcclxuICAgICAgICBsZXQgZGF0YT1uZXcgS2V5RnJhbWVEYXRhKCk7XHJcbiAgICAgICAgZGF0YS5uYW1lPVwic2tpbGxfU3RhcnRcIjtcclxuICAgICAgICBkYXRhLmNhbGxiYWNrPSgpPT57XHJcbiAgICAgICAgICAgIHRoaXMucmVsZWFzZVNraWxsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN1cGVyLnBsYXlTcGluQW5pbWF0b24oQW5pbWF0aW9uX05hbWUuc2tpbGwxLGZhbHNlLGRhdGEsKCk9PntcclxuICAgICAgICAgICAgLy/lpoLmnpzmnInmioDog73nrYnlvoXph4rmlL7vvIzpgqPkuYjlsLHnm7TmjqXph4rmlL5cclxuICAgICAgICAgICAgLy/moLnmja7kuIrkuKrnirbmgIHliKTmlq3pnIDopoHlgZrku4DkuYhcclxuICAgICAgICAgICAgaWYodGhpcy5nZXRFbmVteVByZXZTdGF0ZSgpPT1FbmVteV9TdGF0ZS5tb3ZlKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRNb3ZlKDAsdGhpcy5nZXROZXh0UG9zKCkpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRNb3ZlKDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVsZWFzZVNraWxsKCl7XHJcbiAgICAgICAgbGV0IHBvcz1jYy52MihjYy52Mih0aGlzLm5vZGUueCt0aGlzLmF0dF9wb3MueCp0aGlzLm5vZGUuc2NhbGVYLHRoaXMubm9kZS55K3RoaXMuYXR0X3Bvcy55KnRoaXMubm9kZS5zY2FsZVkpKTtcclxuICAgICAgICBsZXQgbm9kZT1HYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQuYm9zczNfc2tpbGxfbW92ZSxwb3MpO1xyXG4gICAgICAgIGxldCBtb3ZlVFM9bm9kZS5nZXRDb21wb25lbnQoTW92ZSk7XHJcbiAgICAgICAgbW92ZVRTLmluaXQoNjQwLDAsR2FtZUVmZmVjdElkLmJvc3MzX3NraWxsX21vdmUpO1xyXG4gICAgICAgIG1vdmVUUy5zZXRUYXJnZXRQb3MoY2MudjIoTWF0aC5yYW5kb20oKSo1MTItMjU2LC0xMDAwKSwoKT0+eyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL0dhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmRlc3Ryb3lHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQuYm9zczNfc2tpbGxfbW92ZSxub2RlKTsgICAgICAgICAgICBcclxuICAgICAgICB9LCgpPT57ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8v6YCg5oiQ5Lyk5a6zXHJcbiAgICAgICAgICAgIHN1cGVyLmluanVyZVdhbGwodGhpcy5jdXJfYXR0LERhbWFnZVR5cGUuU2tpbGwpO1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguWVhfQm9zc0F0dGFja01pbnpob25nKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydExhdW5jaChwb3M6Y2MuVmVjMil7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LllYX0Jvc3NBdHRhY2tHdW9kdSk7XHJcbiAgICAgICAgbGV0IG5vZGU9R2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLmJvc3MzX2F0dF9tb3ZlLHBvcyk7XHJcbiAgICAgICAgbGV0IG1vdmVUUz1ub2RlLmdldENvbXBvbmVudChNb3ZlKTtcclxuICAgICAgICBtb3ZlVFMuaW5pdCg1NDAsMCxHYW1lRWZmZWN0SWQuYm9zczNfYXR0X21vdmUpO1xyXG4gICAgICAgIG1vdmVUUy5zZXRUYXJnZXRQb3MoY2MudjIoTWF0aC5yYW5kb20oKSo1MTItMjU2LEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW5lbXlfYXR0X3ktMjApLCgpPT57XHJcbiAgICAgICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5ib3NzM19hdHRfZW5kLG5vZGUuZ2V0UG9zaXRpb24oKSk7XHJcbiAgICAgICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmRlc3Ryb3lHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQuYm9zczNfYXR0X21vdmUsbm9kZSk7XHJcbiAgICAgICAgICAgIC8v6YCg5oiQ5Lyk5a6zXHJcbiAgICAgICAgICAgIHN1cGVyLmluanVyZVdhbGwodGhpcy5jdXJfYXR0LERhbWFnZVR5cGUuTm9ybWFsKTsgICAgICAgICAgICBcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBvbkRlYXRoKCkge1xyXG4gICAgICAgIHRoaXMudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpO1xyXG4gICAgICAgIHN1cGVyLnBsYXlEZWFkQW5pbWF0b24oQW5pbWF0aW9uX05hbWUuZGVhZCwoKT0+e1xyXG4gICAgICAgICAgICBNb25zdGVyTWFuYWdlci5nZXRJbnN0YW5jZSgpLmRlc3Ryb3lNb25zdGVyKHRoaXMubm9kZSx0aGlzLm1vbnN0ZXJfdHlwZSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXgucmV3YXJkQm94Mik7ICAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKGR0KVxyXG4gICAge1xyXG4gICAgICAgIGlmKChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX3N0YXRlIT1HYW1lU3RhdGUuR2FtZV9QbGF5aW5nKXx8dGhpcy5nZXRJc0RpZSgpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdXBlci51cGRhdGUoZHQpO1xyXG4gICAgICAgIGlmKHRoaXMuZ2V0RW5lbXlTdGF0ZSgpPT1FbmVteV9TdGF0ZS5tb3ZlKXtcclxuICAgICAgICAgICAgdGhpcy5jaGVja01vdmUoZHQpO1xyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2hlY2tNb3ZlKGR0KVxyXG4gICAgeyAgICAgICAgXHJcbiAgICAgICAgaWYoIXN1cGVyLmlzSGF2ZURlQnVmZlR5cGUoQnVmZlR5cGUuVmVydGlnbykpe1xyXG4gICAgICAgICAgICBsZXQgc3BlZWQ9dGhpcy5jdXJfbW92ZV9zcGVlZCpkdDtcclxuICAgICAgICAgICAgaWYodGhpcy5tb3ZlX3RhcmdldF9wb3Mpe1xyXG4gICAgICAgICAgICAgICAgbGV0IG9mZnNldFBvcz10aGlzLm1vdmVfdGFyZ2V0X3Bvcy5zdWIodGhpcy5ub2RlLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnNjYWxlWD1vZmZzZXRQb3MueD4wP3RoaXMuc2V0dXBfc2NhbGU6LXRoaXMuc2V0dXBfc2NhbGU7XHJcbiAgICAgICAgICAgICAgICBpZihvZmZzZXRQb3MubWFnKCk8c3BlZWQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5tb3ZlX2VuZF9jYWxsYmFjayl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZV9lbmRfY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlX2VuZF9jYWxsYmFjaz1udWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBpMj1NYXRoLlBJKjI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlX2RpcmVjdGlvbj0oTWF0aC5hdGFuMihvZmZzZXRQb3MueSxvZmZzZXRQb3MueCkrcGkyKSVwaTI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZpbmcoZHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG1vdmluZyhkdCl7XHJcbiAgICAgICAgbGV0IGRpc1g9dGhpcy5ub2RlLng7XHJcbiAgICAgICAgbGV0IGRpc1k9dGhpcy5ub2RlLnk7XHJcbiAgICAgICAgbGV0IHNwZWVkPXRoaXMuY3VyX21vdmVfc3BlZWQqZHQ7XHJcbiAgICAgICAgZGlzWCs9c3BlZWQqTWF0aC5jb3ModGhpcy5tb3ZlX2RpcmVjdGlvbik7XHJcbiAgICAgICAgZGlzWSs9c3BlZWQqTWF0aC5zaW4odGhpcy5tb3ZlX2RpcmVjdGlvbik7XHJcbiAgICAgICAgdGhpcy5ub2RlLng9ZGlzWDtcclxuICAgICAgICB0aGlzLm5vZGUueT1kaXNZO1xyXG4gICAgICAgIGlmKHRoaXMubm9kZS54PjMyMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS54PTMyMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5ub2RlLng8LTMyMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS54PS0zMjA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5LiN6IO956m/6L+H5Z+O5aKZXHJcbiAgICAgICAgaWYodGhpcy5ub2RlLnk8dGhpcy53YWxsX3l5KXtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnk9dGhpcy53YWxsX3l5O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuIl19