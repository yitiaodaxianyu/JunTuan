
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Boss/BullDemon.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0fe15YU7MRIEJ2rCzkBEMEN', 'BullDemon');
// Scripts/Boss/BullDemon.ts

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
var MissionLevel_1 = require("../Level/MissionLevel");
var MyTool_1 = require("../Tools/MyTool");
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
    Animation_Name["attack2"] = "attack2";
    Animation_Name["run"] = "run";
    Animation_Name["hurt1"] = "hurt1";
    Animation_Name["hurt2"] = "hurt2";
    Animation_Name["skill5"] = "skill5";
    Animation_Name["dead"] = "dead";
})(Animation_Name || (Animation_Name = {}));
var PosType;
(function (PosType) {
    PosType[PosType["ZuoShang"] = 0] = "ZuoShang";
    PosType[PosType["YouShang"] = 1] = "YouShang";
    PosType[PosType["ZhongXin"] = 2] = "ZhongXin";
    PosType[PosType["ZuoXia"] = 3] = "ZuoXia";
    PosType[PosType["YouXia"] = 4] = "YouXia";
})(PosType || (PosType = {}));
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BullDemon = /** @class */ (function (_super) {
    __extends(BullDemon, _super);
    function BullDemon() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //技能队列，在释放完技能后判断，先进先出原则
        _this.skill_list = [];
        _this.is_skill_finish = true;
        _this.finish_list = [];
        _this.moving_track = [];
        return _this;
    }
    BullDemon.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.boss1_att_move, 2);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.boss1_att_end, 2);
        MonsterManager_1.default.getInstance().addMonsterPool(10011, 4);
        MonsterManager_1.default.getInstance().addMonsterPool(20021, 4);
        MonsterManager_1.default.getInstance().addMonsterPool(10031, 4);
        MonsterManager_1.default.getInstance().addMonsterPool(20041, 4);
        MonsterManager_1.default.getInstance().addMonsterPool(10051, 4);
        this.addChangeBossHpListen(this.onChangeHp);
        this.addDeathCallback(this.onDeath);
        this.addXuanYunListen(this.onXuanYunResult);
        this.addBossInitedListen(this.onBossInited);
        this.initMovingTrack();
    };
    BullDemon.prototype.initMovingTrack = function () {
        var width = 222;
        var height = Math.tan(Math.PI / 6) * width;
        var cPos = GameManager_1.default.getInstance().getFightCenter();
        //let L=Math.sin(Math.PI/6)
        this.moving_track = [cc.v2(-width + cPos.x, height + cPos.y), cc.v2(width + cPos.x, height + cPos.y), cPos, cc.v2(-width + cPos.x, -height + cPos.y), cc.v2(width + cPos.x, -height + cPos.y)];
    };
    BullDemon.prototype.onChangeHp = function () {
        var remainPer = this.cur_hp / this.max_hp;
        if (remainPer < 0.95) {
            this.startSkill(0);
        }
        if (remainPer < 0.65) {
            this.startSkill(0);
            this.startSkill(1);
        }
        if (remainPer < 0.35) {
            this.startSkill(0);
            this.startSkill(1);
            this.startSkill(2);
        }
    };
    BullDemon.prototype.onBossInited = function () {
        this.startIdle();
    };
    BullDemon.prototype.setTargetPos = function (pos, endCallback) {
        this.move_target_pos = pos;
        this.move_end_callback = endCallback;
    };
    BullDemon.prototype.startIdle = function () {
        _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.standby);
        _super.prototype.playSpinAnimaton.call(this, Animation_Name.Idle, true);
        this.scheduleOnce(this.startMove, 2);
    };
    BullDemon.prototype.onXuanYunResult = function (isXuanYun) {
        if (isXuanYun) {
            this.startXuanYun();
        }
        else {
            //根据上个状态判断需要做什么
            if (!_super.prototype.getIsDie.call(this))
                this.startIdle();
        }
    };
    BullDemon.prototype.startXuanYun = function () {
        var _this = this;
        _super.prototype.playSpinAnimaton.call(this, Animation_Name.hurt1, false, null, function () {
            if (_super.prototype.isHaveDeBuffType.call(_this, HeroConfig_1.BuffType.Vertigo) && !_super.prototype.getIsDie.call(_this))
                _this.spine.paused = true;
        });
    };
    BullDemon.prototype.startMove = function (dt, pos) {
        var _this = this;
        _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.move);
        _super.prototype.playSpinAnimaton.call(this, Animation_Name.run, true);
        pos = pos ? pos : this.getRandomPos();
        this.setTargetPos(pos, function () {
            _this.cur_pos_type = _this.next_pos_type;
            if (_this.node.x < -128) {
                _this.node.scaleX = _this.setup_scale;
            }
            if (_this.node.x > 128) {
                _this.node.scaleX = -_this.setup_scale;
            }
            _this.startAttack();
        });
    };
    BullDemon.prototype.startAttack = function () {
        var _this = this;
        //有前摇动作
        this.unschedule(this.startMove);
        _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.att);
        var data = new MonsterData_1.KeyFrameData();
        data.name = "attack1_Start";
        data.callback = function () {
            _this.startLaunch(cc.v2(_this.node.x + _this.att_pos.x * _this.node.scaleX, _this.node.y + _this.att_pos.y * _this.node.scaleY));
        };
        _super.prototype.playSpinAnimaton.call(this, Animation_Name.attack1, false, data, function () {
            _this.startIdle();
        });
    };
    BullDemon.prototype.startSkill = function (jieduan) {
        var _this = this;
        if (_super.prototype.isHaveDeBuffType.call(this, HeroConfig_1.BuffType.Vertigo) || this.finish_list.includes(jieduan))
            return;
        if (this.is_skill_finish == false) {
            if (!this.skill_list.includes(jieduan)) {
                this.skill_list.push(jieduan);
            }
            return;
        }
        this.unschedule(this.startMove);
        this.is_skill_finish = false;
        _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.skill);
        //蓄力
        this.finish_list.push(jieduan);
        var data = new MonsterData_1.KeyFrameData();
        data.name = "skill_Start";
        data.callback = function () {
            _this.releaseSkill(jieduan);
        };
        _super.prototype.playSpinAnimaton.call(this, Animation_Name.skill5, false, data, function () {
            //如果有技能等待释放，那么就直接释放
            _this.is_skill_finish = true;
            if (_this.skill_list.length > 0) {
                var jieduan_1 = _this.skill_list.shift();
                _this.startSkill(jieduan_1);
            }
            else 
            //根据上个状态判断需要做什么
            if (_this.getEnemyPrevState() == EnemyConfig_1.Enemy_State.move) {
                _this.startMove(0, _this.getNextPos());
            }
            else {
                _this.startMove(0);
            }
            _this.jiasu();
        });
    };
    BullDemon.prototype.releaseSkill = function (skillJieDuan) {
        var idAndNum = this.getZhaoHuanGuai(skillJieDuan);
        var monsterNum = 0;
        for (var n = 0; n < idAndNum.length; n++) {
            var mm = idAndNum[n];
            for (var m = 0; m < mm.num; m++) {
                monsterNum++;
            }
        }
        var posArr = this.getZhaoHuanPos(monsterNum);
        var posIndex = 0;
        // for(let n=0; n<idAndNum.length; n++){
        //     let mm=idAndNum[n];
        //     for(let m=0; m<mm.num; m++,posIndex++){
        //         console.log("___________1")
        //         let node=MonsterManager.getInstance().createMonsterById(mm.id,posArr[posIndex],mm.level,1);                
        //         let ets=node.getComponent(Monster);
        //         //ets.is_can_count=false;
        //     }
        // }
    };
    BullDemon.prototype.getZhaoHuanPos = function (num) {
        //根据boss的位置决定起始位置，范围都是半圆π（180°）
        //圆心
        var bossPos = this.node.getPosition();
        var r = 128;
        var radian = Math.PI / (num - 1);
        var startRadian = Math.PI;
        if (bossPos.x < -128) {
            startRadian = Math.PI * 3 / 2;
        }
        else if (bossPos.x >= -128 && bossPos.x <= 128) {
            startRadian = Math.PI;
        }
        else if (bossPos.x > 128) {
            startRadian = Math.PI / 2;
        }
        var posArr = new Array();
        for (var i = 0; i < num; i++) {
            var rr = i * radian + startRadian;
            var y = bossPos.y + Math.sin(rr) * r;
            var x = bossPos.x + Math.cos(rr) * r;
            posArr.push(cc.v2(x, y));
        }
        return MyTool_1.default.randomArray(posArr);
    };
    BullDemon.prototype.getZhaoHuanGuai = function (skillJieDuan) {
        //召唤小怪
        var idAndNum = new Array();
        switch (skillJieDuan) {
            case 0:
                {
                    var tmd = new MissionLevel_1.TableMonsterData();
                    tmd.id = 10011;
                    tmd.num = 8;
                    tmd.level = 1;
                    idAndNum.push(tmd);
                }
                break;
            case 1:
                {
                    var tmd = new MissionLevel_1.TableMonsterData();
                    tmd.id = 20021;
                    tmd.num = 6;
                    tmd.level = 2;
                    var tmd2 = new MissionLevel_1.TableMonsterData();
                    tmd2.id = 20041;
                    tmd2.num = 4;
                    tmd2.level = tmd.level;
                    idAndNum.push(tmd);
                    idAndNum.push(tmd2);
                }
                break;
            case 2:
                {
                    var tmd = new MissionLevel_1.TableMonsterData();
                    tmd.id = 10031;
                    tmd.num = 6;
                    tmd.level = 3;
                    var tmd2 = new MissionLevel_1.TableMonsterData();
                    tmd2.id = 20041;
                    tmd2.num = 2;
                    tmd2.level = tmd.level;
                    var tmd3 = new MissionLevel_1.TableMonsterData();
                    tmd3.id = 10051;
                    tmd3.num = 4;
                    tmd3.level = tmd.level;
                    idAndNum.push(tmd);
                    idAndNum.push(tmd2);
                    idAndNum.push(tmd3);
                }
                break;
        }
        return idAndNum;
    };
    BullDemon.prototype.getNextPos = function () {
        return this.moving_track[this.next_pos_type];
    };
    // getRandomPos():cc.Vec2{
    //     let pos=cc.v2(0,0);
    //     let randType=[];
    //     switch(this.cur_pos_type){
    //         case PosType.ZuoShang:{
    //             randType=[PosType.ZhongXin,PosType.ZuoXia];                
    //         }break;
    //         case PosType.YouShang:{
    //             randType=[PosType.ZhongXin,PosType.YouXia];                
    //         }break;
    //         case PosType.ZhongXin:{
    //             randType=[PosType.ZuoShang,PosType.YouShang,PosType.ZuoXia,PosType.YouXia];                
    //         }break;
    //         case PosType.ZuoXia:{
    //             randType=[PosType.ZuoShang,PosType.ZhongXin];                
    //         }break;
    //         case PosType.YouXia:{
    //             randType=[PosType.YouShang,PosType.ZhongXin];                
    //         }break;
    //     }
    //     let randIndex=Math.floor(Math.random()*randType.length);
    //     this.next_pos_type=randType[randIndex]
    //     pos=this.moving_track[this.next_pos_type];
    //     return pos;
    // }
    BullDemon.prototype.getAllPos = function () {
        var width = 222;
        var height = Math.tan(Math.PI / 6) * width;
        var cPos = GameManager_1.default.getInstance().getFightCenter();
        //let L=Math.sin(Math.PI/6)
        var allPos = [cc.v2(-width + cPos.x, height + cPos.y), cc.v2(width + cPos.x, height + cPos.y), cPos, cc.v2(-width + cPos.x, -height + cPos.y), cc.v2(width + cPos.x, -height + cPos.y)];
        return allPos;
    };
    BullDemon.prototype.startLaunch = function (pos) {
        var node = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.boss1_att_move, pos);
        var moveTS = node.getComponent(Move_1.default);
        moveTS.init(540, 0, GameEffectsManager_1.GameEffectId.boss1_att_move);
        moveTS.setTargetPos(cc.v2(Math.random() * 512 - 256, GameManager_1.default.getInstance().enemy_att_y - 20), function () {
            GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.boss1_att_end, node.getPosition());
            GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(GameEffectsManager_1.GameEffectId.boss1_att_move, node);
            //造成伤害
            //super.injureWall(DamageType.Normal);
        });
    };
    BullDemon.prototype.jiasu = function () {
        //给范围N个敌人加血
        var selfPos = this.node.getPosition();
        var enemys = MonsterManager_1.default.getInstance().getMonstersForCenterPos(-1, selfPos, 160);
        if (enemys) {
            for (var i = 0; i < enemys.length; i++) {
                var enemy = enemys[i];
                if (this.node.uuid != enemy.uuid) {
                    this.createJiaSu(enemys[i]);
                }
            }
            return false;
        }
        return true;
    };
    BullDemon.prototype.createJiaSu = function (enemy) {
        // let node=cc.instantiate(this.prefab_jiasu);
        // node.parent=GameManager.getInstance().fighting_effect_manager.node;
        // node.setPosition(this.getJuJiPos());
        // let follow=node.getComponent(TrackBullect);
        // follow.init(enemy,600,()=>{
        //     enemy.getComponent(Monster).addBuff(Enemy_Buff_Type.jiasu);
        // },null);
    };
    BullDemon.prototype.onDeath = function () {
        var _this = this;
        this.unscheduleAllCallbacks();
        _super.prototype.playDeadAnimaton.call(this, Animation_Name.dead, function () {
            MonsterManager_1.default.getInstance().destroyMonster(_this.node, _this.monster_type);
        });
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.rewardBox2);
    };
    BullDemon.prototype.update = function (dt) {
        if ((GameManager_1.default.getInstance().cur_game_state != Constants_1.GameState.Game_Playing) || this.getIsDie()) {
            return;
        }
        _super.prototype.update.call(this, dt);
        if (this.getEnemyState() == EnemyConfig_1.Enemy_State.move) {
            this.checkMove(dt);
        }
    };
    BullDemon.prototype.checkMove = function (dt) {
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
    BullDemon.prototype.moving = function (dt) {
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
    BullDemon = __decorate([
        ccclass
    ], BullDemon);
    return BullDemon;
}(Boss_1.default));
exports.default = BullDemon;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcQm9zc1xcQnVsbERlbW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9EQUF1RjtBQUN2RixxQ0FBZ0M7QUFDaEMsaUVBQThFO0FBQzlFLDhDQUF5QztBQUV6QyxzREFBeUQ7QUFDekQsMENBQXFDO0FBR3JDLDBDQUF5QztBQUN6Qyw0REFBdUQ7QUFDdkQsMERBQXFEO0FBQ3JELHNEQUFzRDtBQUN0RCwrQkFBMEI7QUFDMUIsc0RBQStEO0FBRS9ELElBQUssY0FVSjtBQVZELFdBQUssY0FBYztJQUVmLCtCQUFhLENBQUE7SUFDYixxQ0FBbUIsQ0FBQTtJQUNuQixxQ0FBbUIsQ0FBQTtJQUNuQiw2QkFBVyxDQUFBO0lBQ1gsaUNBQWUsQ0FBQTtJQUNmLGlDQUFlLENBQUE7SUFDZixtQ0FBaUIsQ0FBQTtJQUNqQiwrQkFBWSxDQUFBO0FBQ2hCLENBQUMsRUFWSSxjQUFjLEtBQWQsY0FBYyxRQVVsQjtBQUVELElBQUssT0FPSjtBQVBELFdBQUssT0FBTztJQUNSLDZDQUFVLENBQUE7SUFDViw2Q0FBVSxDQUFBO0lBQ1YsNkNBQVUsQ0FBQTtJQUNWLHlDQUFRLENBQUE7SUFDUix5Q0FBUSxDQUFBO0FBRVosQ0FBQyxFQVBJLE9BQU8sS0FBUCxPQUFPLFFBT1g7QUFHSyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUF1Qyw2QkFBSTtJQUEzQztRQUFBLHFFQWlZQztRQS9YRyx1QkFBdUI7UUFDdkIsZ0JBQVUsR0FBVSxFQUFFLENBQUM7UUFDdkIscUJBQWUsR0FBUyxJQUFJLENBQUM7UUFDN0IsaUJBQVcsR0FBVSxFQUFFLENBQUM7UUFDeEIsa0JBQVksR0FBVyxFQUFFLENBQUM7O0lBMlg5QixDQUFDO0lBelhHLDBCQUFNLEdBQU47UUFDSSxpQkFBTSxNQUFNLFdBQUUs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O0lBQUQsZ0JBQUM7Q0FqWUQsQUFpWUMsQ0FqWXNDLGNBQUksR0FpWTFDO2tCQWpZb0IsU0FBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVuZW15X0J1ZmZfVHlwZSwgRW5lbXlfRGVCdWZmX1R5cGUsIEVuZW15X1N0YXRlIH0gZnJvbSBcIi4uL0VuZW15L0VuZW15Q29uZmlnXCI7XHJcbmltcG9ydCBNb3ZlIGZyb20gXCIuLi9HYW1lL01vdmVcIjtcclxuaW1wb3J0IHsgR2FtZUVmZmVjdElkLCBHYW1lRWZmZWN0c01hbmFnZXIgfSBmcm9tIFwiLi4vR2FtZS9HYW1lRWZmZWN0c01hbmFnZXJcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi9HYW1lTWFuYWdlclwiO1xyXG5cclxuaW1wb3J0IHsgVGFibGVNb25zdGVyRGF0YSB9IGZyb20gXCIuLi9MZXZlbC9NaXNzaW9uTGV2ZWxcIjtcclxuaW1wb3J0IE15VG9vbCBmcm9tIFwiLi4vVG9vbHMvTXlUb29sXCI7XHJcblxyXG5pbXBvcnQgTW9uc3RlciBmcm9tIFwiLi4vTW9uc3Rlci9Nb25zdGVyXCI7XHJcbmltcG9ydCB7IEdhbWVTdGF0ZSB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IE1vbnN0ZXJNYW5hZ2VyIGZyb20gXCIuLi9Nb25zdGVyL01vbnN0ZXJNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFNvdW5kSW5kZXggfSBmcm9tIFwiLi4vU291bmQvQXVkaW9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgS2V5RnJhbWVEYXRhIH0gZnJvbSBcIi4uL01vbnN0ZXIvTW9uc3RlckRhdGFcIjtcclxuaW1wb3J0IEJvc3MgZnJvbSBcIi4vQm9zc1wiO1xyXG5pbXBvcnQgeyBCdWZmVHlwZSwgRGFtYWdlVHlwZSB9IGZyb20gXCIuLi9IZXJvL0dhbWUvSGVyb0NvbmZpZ1wiO1xyXG5cclxuZW51bSBBbmltYXRpb25fTmFtZVxyXG57XHJcbiAgICBJZGxlID0gXCJpZGxlXCIsICAgICAgIC8vLS0g5q2j6Z2i5b6F5py6XHJcbiAgICBhdHRhY2sxID0gXCJhdHRhY2sxXCIsICAgICAgICAgIC8vLS0g5pS75Ye7MVxyXG4gICAgYXR0YWNrMiA9IFwiYXR0YWNrMlwiLCAgICAgICAgICAvLy0tIOaUu+WHuzFcclxuICAgIHJ1biA9IFwicnVuXCIsICAgICAgICAgICAgICAgIC8vLS0g6LeR6LevXHJcbiAgICBodXJ0MSA9IFwiaHVydDFcIiwgICAgICAgICAgLy8tLSDlj5flh7sxXHJcbiAgICBodXJ0MiA9IFwiaHVydDJcIiwgICAgICAgICAgLy8tLSDlj5flh7syXHJcbiAgICBza2lsbDUgPSBcInNraWxsNVwiLCAgICAgICAgICAvLy0tIOaKgOiDveWKqOS9nDVcclxuICAgIGRlYWQ9IFwiZGVhZFwiLCAgIC8v5q275LqhXHJcbn1cclxuXHJcbmVudW0gUG9zVHlwZXtcclxuICAgIFp1b1NoYW5nPTAsXHJcbiAgICBZb3VTaGFuZz0xLFxyXG4gICAgWmhvbmdYaW49MixcclxuICAgIFp1b1hpYT0zLFxyXG4gICAgWW91WGlhPTQsXHJcblxyXG59XHJcblxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCdWxsRGVtb24gZXh0ZW5kcyBCb3NzIHtcclxuXHJcbiAgICAvL+aKgOiDvemYn+WIl++8jOWcqOmHiuaUvuWujOaKgOiDveWQjuWIpOaWre+8jOWFiOi/m+WFiOWHuuWOn+WImVxyXG4gICAgc2tpbGxfbGlzdDpudW1iZXJbXT1bXTtcclxuICAgIGlzX3NraWxsX2ZpbmlzaDpib29sZWFuPXRydWU7XHJcbiAgICBmaW5pc2hfbGlzdDpudW1iZXJbXT1bXTtcclxuICAgIG1vdmluZ190cmFjazpjYy5WZWMyW109W107XHJcblxyXG4gICAgb25Mb2FkKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xyXG4gICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEVmZmVjdFBvb2xCeUlkKEdhbWVFZmZlY3RJZC5ib3NzMV9hdHRfbW92ZSwyKTtcclxuICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRFZmZlY3RQb29sQnlJZChHYW1lRWZmZWN0SWQuYm9zczFfYXR0X2VuZCwyKTsgICAgICAgIFxyXG4gICAgICAgIE1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkTW9uc3RlclBvb2woMTAwMTEsNCk7XHJcbiAgICAgICAgTW9uc3Rlck1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRNb25zdGVyUG9vbCgyMDAyMSw0KTtcclxuICAgICAgICBNb25zdGVyTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZE1vbnN0ZXJQb29sKDEwMDMxLDQpO1xyXG4gICAgICAgIE1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkTW9uc3RlclBvb2woMjAwNDEsNCk7XHJcbiAgICAgICAgTW9uc3Rlck1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRNb25zdGVyUG9vbCgxMDA1MSw0KTtcclxuICAgICAgICB0aGlzLmFkZENoYW5nZUJvc3NIcExpc3Rlbih0aGlzLm9uQ2hhbmdlSHApO1xyXG4gICAgICAgIHRoaXMuYWRkRGVhdGhDYWxsYmFjayh0aGlzLm9uRGVhdGgpO1xyXG4gICAgICAgIHRoaXMuYWRkWHVhbll1bkxpc3Rlbih0aGlzLm9uWHVhbll1blJlc3VsdCk7XHJcbiAgICAgICAgdGhpcy5hZGRCb3NzSW5pdGVkTGlzdGVuKHRoaXMub25Cb3NzSW5pdGVkKTtcclxuICAgICAgICB0aGlzLmluaXRNb3ZpbmdUcmFjaygpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRNb3ZpbmdUcmFjaygpe1xyXG4gICAgICAgIGxldCB3aWR0aD0yMjI7XHJcbiAgICAgICAgbGV0IGhlaWdodD1NYXRoLnRhbihNYXRoLlBJLzYpKndpZHRoO1xyXG4gICAgICAgIGxldCBjUG9zPUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RmlnaHRDZW50ZXIoKTtcclxuICAgICAgICAvL2xldCBMPU1hdGguc2luKE1hdGguUEkvNilcclxuICAgICAgICB0aGlzLm1vdmluZ190cmFjaz1bY2MudjIoLXdpZHRoK2NQb3MueCxoZWlnaHQrY1Bvcy55KSxjYy52Mih3aWR0aCtjUG9zLngsaGVpZ2h0K2NQb3MueSksY1BvcyxjYy52Migtd2lkdGgrY1Bvcy54LC1oZWlnaHQrY1Bvcy55KSxjYy52Mih3aWR0aCtjUG9zLngsLWhlaWdodCtjUG9zLnkpXTtcclxuICAgIH1cclxuXHJcbiAgICBvbkNoYW5nZUhwKCl7XHJcbiAgICAgICAgbGV0IHJlbWFpblBlcj10aGlzLmN1cl9ocC90aGlzLm1heF9ocDtcclxuICAgICAgICBpZihyZW1haW5QZXI8MC45NSl7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRTa2lsbCgwKTtcclxuICAgICAgICB9ICAgICBcclxuICAgICAgICBpZihyZW1haW5QZXI8MC42NSl7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRTa2lsbCgwKTtcclxuICAgICAgICAgICAgdGhpcy5zdGFydFNraWxsKDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihyZW1haW5QZXI8MC4zNSl7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRTa2lsbCgwKTtcclxuICAgICAgICAgICAgdGhpcy5zdGFydFNraWxsKDEpO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0U2tpbGwoMik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uQm9zc0luaXRlZCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnN0YXJ0SWRsZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFRhcmdldFBvcyhwb3M6Y2MuVmVjMixlbmRDYWxsYmFjazpGdW5jdGlvbil7XHJcbiAgICAgICAgdGhpcy5tb3ZlX3RhcmdldF9wb3M9cG9zO1xyXG4gICAgICAgIHRoaXMubW92ZV9lbmRfY2FsbGJhY2s9ZW5kQ2FsbGJhY2s7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRJZGxlKCl7ICAgICAgICBcclxuICAgICAgICBzdXBlci5zZXRFbmVteVN0YXRlKEVuZW15X1N0YXRlLnN0YW5kYnkpO1xyXG4gICAgICAgIHN1cGVyLnBsYXlTcGluQW5pbWF0b24oQW5pbWF0aW9uX05hbWUuSWRsZSx0cnVlKTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSh0aGlzLnN0YXJ0TW92ZSwyKVxyXG4gICAgfVxyXG5cclxuICAgIG9uWHVhbll1blJlc3VsdChpc1h1YW5ZdW46Ym9vbGVhbil7XHJcbiAgICAgICAgaWYoaXNYdWFuWXVuKXtcclxuICAgICAgICAgICAgdGhpcy5zdGFydFh1YW5ZdW4oKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgLy/moLnmja7kuIrkuKrnirbmgIHliKTmlq3pnIDopoHlgZrku4DkuYhcclxuICAgICAgICAgICAgaWYoIXN1cGVyLmdldElzRGllKCkpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0SWRsZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGFydFh1YW5ZdW4oKXtcclxuICAgICAgICBzdXBlci5wbGF5U3BpbkFuaW1hdG9uKEFuaW1hdGlvbl9OYW1lLmh1cnQxLGZhbHNlLG51bGwsKCk9PntcclxuICAgICAgICAgICAgaWYoc3VwZXIuaXNIYXZlRGVCdWZmVHlwZShCdWZmVHlwZS5WZXJ0aWdvKSYmIXN1cGVyLmdldElzRGllKCkpXHJcbiAgICAgICAgICAgIHRoaXMuc3BpbmUucGF1c2VkPXRydWU7XHJcbiAgICAgICAgfSk7ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBzdGFydE1vdmUoZHQ6bnVtYmVyLHBvcz86Y2MuVmVjMil7XHJcbiAgICAgICAgc3VwZXIuc2V0RW5lbXlTdGF0ZShFbmVteV9TdGF0ZS5tb3ZlKTtcclxuICAgICAgICBzdXBlci5wbGF5U3BpbkFuaW1hdG9uKEFuaW1hdGlvbl9OYW1lLnJ1bix0cnVlKTtcclxuICAgICAgICBwb3M9cG9zP3Bvczp0aGlzLmdldFJhbmRvbVBvcygpO1xyXG4gICAgICAgIHRoaXMuc2V0VGFyZ2V0UG9zKHBvcywoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLmN1cl9wb3NfdHlwZT10aGlzLm5leHRfcG9zX3R5cGU7XHJcbiAgICAgICAgICAgIGlmKHRoaXMubm9kZS54PC0xMjgpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnNjYWxlWD10aGlzLnNldHVwX3NjYWxlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHRoaXMubm9kZS54PjEyOCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc2NhbGVYPS10aGlzLnNldHVwX3NjYWxlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRBdHRhY2soKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0QXR0YWNrKCl7XHJcbiAgICAgICAgLy/mnInliY3mkYfliqjkvZxcclxuICAgICAgICB0aGlzLnVuc2NoZWR1bGUodGhpcy5zdGFydE1vdmUpO1xyXG4gICAgICAgIHN1cGVyLnNldEVuZW15U3RhdGUoRW5lbXlfU3RhdGUuYXR0KTtcclxuICAgICAgICBsZXQgZGF0YT1uZXcgS2V5RnJhbWVEYXRhKCk7XHJcbiAgICAgICAgZGF0YS5uYW1lPVwiYXR0YWNrMV9TdGFydFwiO1xyXG4gICAgICAgIGRhdGEuY2FsbGJhY2s9KCk9PntcclxuICAgICAgICAgICAgdGhpcy5zdGFydExhdW5jaChjYy52Mih0aGlzLm5vZGUueCt0aGlzLmF0dF9wb3MueCp0aGlzLm5vZGUuc2NhbGVYLHRoaXMubm9kZS55K3RoaXMuYXR0X3Bvcy55KnRoaXMubm9kZS5zY2FsZVkpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3VwZXIucGxheVNwaW5BbmltYXRvbihBbmltYXRpb25fTmFtZS5hdHRhY2sxLGZhbHNlLGRhdGEsKCk9PntcclxuICAgICAgICAgICAgdGhpcy5zdGFydElkbGUoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydFNraWxsKGppZWR1YW46bnVtYmVyKXtcclxuICAgICAgICBpZihzdXBlci5pc0hhdmVEZUJ1ZmZUeXBlKEJ1ZmZUeXBlLlZlcnRpZ28pfHx0aGlzLmZpbmlzaF9saXN0LmluY2x1ZGVzKGppZWR1YW4pKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgaWYodGhpcy5pc19za2lsbF9maW5pc2g9PWZhbHNlKXtcclxuICAgICAgICAgICAgaWYoIXRoaXMuc2tpbGxfbGlzdC5pbmNsdWRlcyhqaWVkdWFuKSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNraWxsX2xpc3QucHVzaChqaWVkdWFuKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnVuc2NoZWR1bGUodGhpcy5zdGFydE1vdmUpO1xyXG4gICAgICAgIHRoaXMuaXNfc2tpbGxfZmluaXNoPWZhbHNlO1xyXG4gICAgICAgIHN1cGVyLnNldEVuZW15U3RhdGUoRW5lbXlfU3RhdGUuc2tpbGwpO1xyXG4gICAgICAgIC8v6JOE5YqbXHJcbiAgICAgICAgdGhpcy5maW5pc2hfbGlzdC5wdXNoKGppZWR1YW4pO1xyXG4gICAgICAgIGxldCBkYXRhPW5ldyBLZXlGcmFtZURhdGEoKTtcclxuICAgICAgICBkYXRhLm5hbWU9XCJza2lsbF9TdGFydFwiO1xyXG4gICAgICAgIGRhdGEuY2FsbGJhY2s9KCk9PntcclxuICAgICAgICAgICAgdGhpcy5yZWxlYXNlU2tpbGwoamllZHVhbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN1cGVyLnBsYXlTcGluQW5pbWF0b24oQW5pbWF0aW9uX05hbWUuc2tpbGw1LGZhbHNlLGRhdGEsKCk9PntcclxuICAgICAgICAgICAgLy/lpoLmnpzmnInmioDog73nrYnlvoXph4rmlL7vvIzpgqPkuYjlsLHnm7TmjqXph4rmlL5cclxuICAgICAgICAgICAgdGhpcy5pc19za2lsbF9maW5pc2g9dHJ1ZTtcclxuICAgICAgICAgICAgaWYodGhpcy5za2lsbF9saXN0Lmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgICAgIGxldCBqaWVkdWFuPXRoaXMuc2tpbGxfbGlzdC5zaGlmdCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydFNraWxsKGppZWR1YW4pO1xyXG4gICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICAvL+agueaNruS4iuS4queKtuaAgeWIpOaWremcgOimgeWBmuS7gOS5iFxyXG4gICAgICAgICAgICBpZih0aGlzLmdldEVuZW15UHJldlN0YXRlKCk9PUVuZW15X1N0YXRlLm1vdmUpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydE1vdmUoMCx0aGlzLmdldE5leHRQb3MoKSk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydE1vdmUoMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5qaWFzdSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbGVhc2VTa2lsbChza2lsbEppZUR1YW46bnVtYmVyKXtcclxuICAgICAgICBsZXQgaWRBbmROdW09dGhpcy5nZXRaaGFvSHVhbkd1YWkoc2tpbGxKaWVEdWFuKTtcclxuICAgICAgICBsZXQgbW9uc3Rlck51bT0wO1xyXG4gICAgICAgIGZvcihsZXQgbj0wOyBuPGlkQW5kTnVtLmxlbmd0aDsgbisrKXtcclxuICAgICAgICAgICAgbGV0IG1tPWlkQW5kTnVtW25dO1xyXG4gICAgICAgICAgICBmb3IobGV0IG09MDsgbTxtbS5udW07IG0rKyl7XHJcbiAgICAgICAgICAgICAgICBtb25zdGVyTnVtKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHBvc0Fycj10aGlzLmdldFpoYW9IdWFuUG9zKG1vbnN0ZXJOdW0pO1xyXG4gICAgICAgIGxldCBwb3NJbmRleD0wO1xyXG4gICAgICAgIC8vIGZvcihsZXQgbj0wOyBuPGlkQW5kTnVtLmxlbmd0aDsgbisrKXtcclxuICAgICAgICAvLyAgICAgbGV0IG1tPWlkQW5kTnVtW25dO1xyXG4gICAgICAgIC8vICAgICBmb3IobGV0IG09MDsgbTxtbS5udW07IG0rKyxwb3NJbmRleCsrKXtcclxuICAgICAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKFwiX19fX19fX19fX18xXCIpXHJcbiAgICAgICAgLy8gICAgICAgICBsZXQgbm9kZT1Nb25zdGVyTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZU1vbnN0ZXJCeUlkKG1tLmlkLHBvc0Fycltwb3NJbmRleF0sbW0ubGV2ZWwsMSk7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIC8vICAgICAgICAgbGV0IGV0cz1ub2RlLmdldENvbXBvbmVudChNb25zdGVyKTtcclxuICAgICAgICAvLyAgICAgICAgIC8vZXRzLmlzX2Nhbl9jb3VudD1mYWxzZTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRaaGFvSHVhblBvcyhudW06bnVtYmVyKTpjYy5WZWMyW117XHJcbiAgICAgICAgLy/moLnmja5ib3Nz55qE5L2N572u5Yaz5a6a6LW35aeL5L2N572u77yM6IyD5Zu06YO95piv5Y2K5ZyGz4DvvIgxODDCsO+8iVxyXG4gICAgICAgIC8v5ZyG5b+DXHJcbiAgICAgICAgbGV0IGJvc3NQb3M9dGhpcy5ub2RlLmdldFBvc2l0aW9uKCk7XHJcbiAgICAgICAgbGV0IHI9MTI4OyAgICAgICAgXHJcbiAgICAgICAgbGV0IHJhZGlhbj1NYXRoLlBJLyhudW0tMSk7XHJcbiAgICAgICAgbGV0IHN0YXJ0UmFkaWFuPU1hdGguUEk7XHJcbiAgICAgICAgaWYoYm9zc1Bvcy54PC0xMjgpe1xyXG4gICAgICAgICAgICBzdGFydFJhZGlhbj1NYXRoLlBJKjMvMjtcclxuICAgICAgICB9ZWxzZSBpZihib3NzUG9zLng+PS0xMjgmJmJvc3NQb3MueDw9MTI4KXtcclxuICAgICAgICAgICAgc3RhcnRSYWRpYW49TWF0aC5QSTtcclxuICAgICAgICB9ZWxzZSBpZihib3NzUG9zLng+MTI4KXtcclxuICAgICAgICAgICAgc3RhcnRSYWRpYW49TWF0aC5QSS8yO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcG9zQXJyPW5ldyBBcnJheSgpO1xyXG4gICAgICAgIGZvcihsZXQgaT0wO2k8bnVtO2krKyl7XHJcbiAgICAgICAgICAgIGxldCBycj1pKnJhZGlhbitzdGFydFJhZGlhbjtcclxuICAgICAgICAgICAgbGV0IHk9Ym9zc1Bvcy55K01hdGguc2luKHJyKSpyO1xyXG4gICAgICAgICAgICBsZXQgeD1ib3NzUG9zLngrTWF0aC5jb3MocnIpKnI7XHJcbiAgICAgICAgICAgIHBvc0Fyci5wdXNoKGNjLnYyKHgseSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gTXlUb29sLnJhbmRvbUFycmF5KHBvc0Fycik7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Wmhhb0h1YW5HdWFpKHNraWxsSmllRHVhbjpudW1iZXIpOlRhYmxlTW9uc3RlckRhdGFbXXtcclxuICAgICAgICAvL+WPrOWUpOWwj+aAqlxyXG4gICAgICAgIGxldCBpZEFuZE51bT1uZXcgQXJyYXk8VGFibGVNb25zdGVyRGF0YT4oKTtcclxuICAgICAgICBzd2l0Y2goc2tpbGxKaWVEdWFuKXtcclxuICAgICAgICAgICAgY2FzZSAwOntcclxuICAgICAgICAgICAgICAgIGxldCB0bWQ9bmV3IFRhYmxlTW9uc3RlckRhdGEoKTtcclxuICAgICAgICAgICAgICAgIHRtZC5pZD0xMDAxMTtcclxuICAgICAgICAgICAgICAgIHRtZC5udW09ODtcclxuICAgICAgICAgICAgICAgIHRtZC5sZXZlbD0xO1xyXG4gICAgICAgICAgICAgICAgaWRBbmROdW0ucHVzaCh0bWQpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMTp7XHJcbiAgICAgICAgICAgICAgICBsZXQgdG1kPW5ldyBUYWJsZU1vbnN0ZXJEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICB0bWQuaWQ9MjAwMjE7XHJcbiAgICAgICAgICAgICAgICB0bWQubnVtPTY7XHJcbiAgICAgICAgICAgICAgICB0bWQubGV2ZWw9MjtcclxuICAgICAgICAgICAgICAgIGxldCB0bWQyPW5ldyBUYWJsZU1vbnN0ZXJEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICB0bWQyLmlkPTIwMDQxO1xyXG4gICAgICAgICAgICAgICAgdG1kMi5udW09NDtcclxuICAgICAgICAgICAgICAgIHRtZDIubGV2ZWw9dG1kLmxldmVsO1xyXG4gICAgICAgICAgICAgICAgaWRBbmROdW0ucHVzaCh0bWQpO1xyXG4gICAgICAgICAgICAgICAgaWRBbmROdW0ucHVzaCh0bWQyKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6e1xyXG4gICAgICAgICAgICAgICAgbGV0IHRtZD1uZXcgVGFibGVNb25zdGVyRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgdG1kLmlkPTEwMDMxO1xyXG4gICAgICAgICAgICAgICAgdG1kLm51bT02O1xyXG4gICAgICAgICAgICAgICAgdG1kLmxldmVsPTM7XHJcbiAgICAgICAgICAgICAgICBsZXQgdG1kMj1uZXcgVGFibGVNb25zdGVyRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgdG1kMi5pZD0yMDA0MTtcclxuICAgICAgICAgICAgICAgIHRtZDIubnVtPTI7XHJcbiAgICAgICAgICAgICAgICB0bWQyLmxldmVsPXRtZC5sZXZlbDtcclxuICAgICAgICAgICAgICAgIGxldCB0bWQzPW5ldyBUYWJsZU1vbnN0ZXJEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICB0bWQzLmlkPTEwMDUxO1xyXG4gICAgICAgICAgICAgICAgdG1kMy5udW09NDtcclxuICAgICAgICAgICAgICAgIHRtZDMubGV2ZWw9dG1kLmxldmVsO1xyXG4gICAgICAgICAgICAgICAgaWRBbmROdW0ucHVzaCh0bWQpO1xyXG4gICAgICAgICAgICAgICAgaWRBbmROdW0ucHVzaCh0bWQyKTtcclxuICAgICAgICAgICAgICAgIGlkQW5kTnVtLnB1c2godG1kMyk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGlkQW5kTnVtO1xyXG4gICAgfVxyXG5cclxuICAgIGdldE5leHRQb3MoKTpjYy5WZWMye1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1vdmluZ190cmFja1t0aGlzLm5leHRfcG9zX3R5cGVdO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGdldFJhbmRvbVBvcygpOmNjLlZlYzJ7XHJcbiAgICAvLyAgICAgbGV0IHBvcz1jYy52MigwLDApO1xyXG4gICAgLy8gICAgIGxldCByYW5kVHlwZT1bXTtcclxuICAgIC8vICAgICBzd2l0Y2godGhpcy5jdXJfcG9zX3R5cGUpe1xyXG4gICAgLy8gICAgICAgICBjYXNlIFBvc1R5cGUuWnVvU2hhbmc6e1xyXG4gICAgLy8gICAgICAgICAgICAgcmFuZFR5cGU9W1Bvc1R5cGUuWmhvbmdYaW4sUG9zVHlwZS5adW9YaWFdOyAgICAgICAgICAgICAgICBcclxuICAgIC8vICAgICAgICAgfWJyZWFrO1xyXG4gICAgLy8gICAgICAgICBjYXNlIFBvc1R5cGUuWW91U2hhbmc6e1xyXG4gICAgLy8gICAgICAgICAgICAgcmFuZFR5cGU9W1Bvc1R5cGUuWmhvbmdYaW4sUG9zVHlwZS5Zb3VYaWFdOyAgICAgICAgICAgICAgICBcclxuICAgIC8vICAgICAgICAgfWJyZWFrO1xyXG4gICAgLy8gICAgICAgICBjYXNlIFBvc1R5cGUuWmhvbmdYaW46e1xyXG4gICAgLy8gICAgICAgICAgICAgcmFuZFR5cGU9W1Bvc1R5cGUuWnVvU2hhbmcsUG9zVHlwZS5Zb3VTaGFuZyxQb3NUeXBlLlp1b1hpYSxQb3NUeXBlLllvdVhpYV07ICAgICAgICAgICAgICAgIFxyXG4gICAgLy8gICAgICAgICB9YnJlYWs7XHJcbiAgICAvLyAgICAgICAgIGNhc2UgUG9zVHlwZS5adW9YaWE6e1xyXG4gICAgLy8gICAgICAgICAgICAgcmFuZFR5cGU9W1Bvc1R5cGUuWnVvU2hhbmcsUG9zVHlwZS5aaG9uZ1hpbl07ICAgICAgICAgICAgICAgIFxyXG4gICAgLy8gICAgICAgICB9YnJlYWs7XHJcbiAgICAvLyAgICAgICAgIGNhc2UgUG9zVHlwZS5Zb3VYaWE6e1xyXG4gICAgLy8gICAgICAgICAgICAgcmFuZFR5cGU9W1Bvc1R5cGUuWW91U2hhbmcsUG9zVHlwZS5aaG9uZ1hpbl07ICAgICAgICAgICAgICAgIFxyXG4gICAgLy8gICAgICAgICB9YnJlYWs7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gICAgIGxldCByYW5kSW5kZXg9TWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKnJhbmRUeXBlLmxlbmd0aCk7XHJcbiAgICAvLyAgICAgdGhpcy5uZXh0X3Bvc190eXBlPXJhbmRUeXBlW3JhbmRJbmRleF1cclxuICAgIC8vICAgICBwb3M9dGhpcy5tb3ZpbmdfdHJhY2tbdGhpcy5uZXh0X3Bvc190eXBlXTtcclxuICAgIC8vICAgICByZXR1cm4gcG9zO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIGdldEFsbFBvcygpOmNjLlZlYzJbXXtcclxuICAgICAgICBsZXQgd2lkdGg9MjIyO1xyXG4gICAgICAgIGxldCBoZWlnaHQ9TWF0aC50YW4oTWF0aC5QSS82KSp3aWR0aDtcclxuICAgICAgICBsZXQgY1Bvcz1HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEZpZ2h0Q2VudGVyKCk7XHJcbiAgICAgICAgLy9sZXQgTD1NYXRoLnNpbihNYXRoLlBJLzYpXHJcbiAgICAgICAgbGV0IGFsbFBvcz1bY2MudjIoLXdpZHRoK2NQb3MueCxoZWlnaHQrY1Bvcy55KSxjYy52Mih3aWR0aCtjUG9zLngsaGVpZ2h0K2NQb3MueSksY1BvcyxjYy52Migtd2lkdGgrY1Bvcy54LC1oZWlnaHQrY1Bvcy55KSxjYy52Mih3aWR0aCtjUG9zLngsLWhlaWdodCtjUG9zLnkpXTtcclxuICAgICAgICByZXR1cm4gYWxsUG9zO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0TGF1bmNoKHBvczpjYy5WZWMyKXtcclxuICAgICAgICBsZXQgbm9kZT1HYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQuYm9zczFfYXR0X21vdmUscG9zKTtcclxuICAgICAgICBsZXQgbW92ZVRTPW5vZGUuZ2V0Q29tcG9uZW50KE1vdmUpO1xyXG4gICAgICAgIG1vdmVUUy5pbml0KDU0MCwwLEdhbWVFZmZlY3RJZC5ib3NzMV9hdHRfbW92ZSk7XHJcbiAgICAgICAgbW92ZVRTLnNldFRhcmdldFBvcyhjYy52MihNYXRoLnJhbmRvbSgpKjUxMi0yNTYsR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5lbmVteV9hdHRfeS0yMCksKCk9PntcclxuICAgICAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLmJvc3MxX2F0dF9lbmQsbm9kZS5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZGVzdHJveUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5ib3NzMV9hdHRfbW92ZSxub2RlKTtcclxuICAgICAgICAgICAgLy/pgKDmiJDkvKTlrrNcclxuICAgICAgICAgICAgLy9zdXBlci5pbmp1cmVXYWxsKERhbWFnZVR5cGUuTm9ybWFsKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBqaWFzdSgpOmJvb2xlYW5cclxuICAgIHtcclxuICAgICAgICAvL+e7meiMg+WbtE7kuKrmlYzkurrliqDooYBcclxuICAgICAgICBsZXQgc2VsZlBvcz10aGlzLm5vZGUuZ2V0UG9zaXRpb24oKTtcclxuICAgICAgICBsZXQgZW5lbXlzPU1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TW9uc3RlcnNGb3JDZW50ZXJQb3MoLTEsc2VsZlBvcywxNjApO1xyXG4gICAgICAgIGlmKGVuZW15cylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPGVuZW15cy5sZW5ndGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGV0IGVuZW15PWVuZW15c1tpXTtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMubm9kZS51dWlkIT1lbmVteS51dWlkKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlSmlhU3UoZW5lbXlzW2ldKTtcclxuICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVKaWFTdShlbmVteTpjYy5Ob2RlKVxyXG4gICAge1xyXG4gICAgICAgIC8vIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKHRoaXMucHJlZmFiX2ppYXN1KTtcclxuICAgICAgICAvLyBub2RlLnBhcmVudD1HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmZpZ2h0aW5nX2VmZmVjdF9tYW5hZ2VyLm5vZGU7XHJcbiAgICAgICAgLy8gbm9kZS5zZXRQb3NpdGlvbih0aGlzLmdldEp1SmlQb3MoKSk7XHJcbiAgICAgICAgLy8gbGV0IGZvbGxvdz1ub2RlLmdldENvbXBvbmVudChUcmFja0J1bGxlY3QpO1xyXG4gICAgICAgIC8vIGZvbGxvdy5pbml0KGVuZW15LDYwMCwoKT0+e1xyXG4gICAgICAgIC8vICAgICBlbmVteS5nZXRDb21wb25lbnQoTW9uc3RlcikuYWRkQnVmZihFbmVteV9CdWZmX1R5cGUuamlhc3UpO1xyXG4gICAgICAgIC8vIH0sbnVsbCk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgb25EZWF0aCgpIHtcclxuICAgICAgICB0aGlzLnVuc2NoZWR1bGVBbGxDYWxsYmFja3MoKTtcclxuICAgICAgICBzdXBlci5wbGF5RGVhZEFuaW1hdG9uKEFuaW1hdGlvbl9OYW1lLmRlYWQsKCk9PntcclxuICAgICAgICAgICAgTW9uc3Rlck1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5kZXN0cm95TW9uc3Rlcih0aGlzLm5vZGUsdGhpcy5tb25zdGVyX3R5cGUpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LnJld2FyZEJveDIpOyAgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShkdClcclxuICAgIHtcclxuICAgICAgICBpZigoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zdGF0ZSE9R2FtZVN0YXRlLkdhbWVfUGxheWluZyl8fHRoaXMuZ2V0SXNEaWUoKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3VwZXIudXBkYXRlKGR0KTtcclxuICAgICAgICBpZih0aGlzLmdldEVuZW15U3RhdGUoKT09RW5lbXlfU3RhdGUubW92ZSl7XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tNb3ZlKGR0KTtcclxuICAgICAgICB9ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNoZWNrTW92ZShkdClcclxuICAgIHsgICAgICAgIFxyXG4gICAgICAgIGlmKCFzdXBlci5pc0hhdmVEZUJ1ZmZUeXBlKEJ1ZmZUeXBlLlZlcnRpZ28pKXtcclxuICAgICAgICAgICAgbGV0IHNwZWVkPXRoaXMuY3VyX21vdmVfc3BlZWQqZHQ7XHJcbiAgICAgICAgICAgIGlmKHRoaXMubW92ZV90YXJnZXRfcG9zKXtcclxuICAgICAgICAgICAgICAgIGxldCBvZmZzZXRQb3M9dGhpcy5tb3ZlX3RhcmdldF9wb3Muc3ViKHRoaXMubm9kZS5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zY2FsZVg9b2Zmc2V0UG9zLng+MD90aGlzLnNldHVwX3NjYWxlOi10aGlzLnNldHVwX3NjYWxlO1xyXG4gICAgICAgICAgICAgICAgaWYob2Zmc2V0UG9zLm1hZygpPHNwZWVkKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMubW92ZV9lbmRfY2FsbGJhY2spe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVfZW5kX2NhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZV9lbmRfY2FsbGJhY2s9bnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwaTI9TWF0aC5QSSoyO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZV9kaXJlY3Rpb249KE1hdGguYXRhbjIob2Zmc2V0UG9zLnksb2Zmc2V0UG9zLngpK3BpMiklcGkyO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92aW5nKGR0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBtb3ZpbmcoZHQpe1xyXG4gICAgICAgIGxldCBkaXNYPXRoaXMubm9kZS54O1xyXG4gICAgICAgIGxldCBkaXNZPXRoaXMubm9kZS55O1xyXG4gICAgICAgIGxldCBzcGVlZD10aGlzLmN1cl9tb3ZlX3NwZWVkKmR0O1xyXG4gICAgICAgIGRpc1grPXNwZWVkKk1hdGguY29zKHRoaXMubW92ZV9kaXJlY3Rpb24pO1xyXG4gICAgICAgIGRpc1krPXNwZWVkKk1hdGguc2luKHRoaXMubW92ZV9kaXJlY3Rpb24pO1xyXG4gICAgICAgIHRoaXMubm9kZS54PWRpc1g7XHJcbiAgICAgICAgdGhpcy5ub2RlLnk9ZGlzWTtcclxuICAgICAgICBpZih0aGlzLm5vZGUueD4zMjApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUueD0zMjA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMubm9kZS54PC0zMjApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUueD0tMzIwO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+S4jeiDveepv+i/h+WfjuWimVxyXG4gICAgICAgIGlmKHRoaXMubm9kZS55PHRoaXMud2FsbF95eSl7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS55PXRoaXMud2FsbF95eTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==