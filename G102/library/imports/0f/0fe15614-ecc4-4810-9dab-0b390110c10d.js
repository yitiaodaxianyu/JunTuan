"use strict";
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