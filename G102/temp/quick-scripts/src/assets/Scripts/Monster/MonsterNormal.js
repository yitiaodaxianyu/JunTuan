"use strict";
cc._RF.push(module, 'c07bfyz1JpARosONNYtLr53', 'MonsterNormal');
// Scripts/Monster/MonsterNormal.ts

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
var Constants_1 = require("../Constants");
var EnemyConfig_1 = require("../Enemy/EnemyConfig");
var GameEffectsManager_1 = require("../Game/GameEffectsManager");
var Move_1 = require("../Game/Move");
var GameManager_1 = require("../GameManager");
var HeroConfig_1 = require("../Hero/Game/HeroConfig");
var WallManager_1 = require("../Wall/WallManager");
var Monster_1 = require("./Monster");
var MonsterData_1 = require("./MonsterData");
var MonsterManager_1 = require("./MonsterManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**普通怪物 */
var MonsterNormal = /** @class */ (function (_super) {
    __extends(MonsterNormal, _super);
    function MonsterNormal() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.monster_xuanyun_callback = null;
        _this.monster_init_callback = null;
        _this.monster_death_callback = null;
        _this.monster_att_callback = null;
        return _this;
    }
    MonsterNormal.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        this.addDeathCallback(this.onMonsterDeath);
        this.addInitListen(this.onMonsterInited);
        this.addXuanYunListen(this.onXuanYunResult);
    };
    MonsterNormal.prototype.onMonsterInited = function () {
        var _this = this;
        this.initOutward();
        if (this.base_data.AttackMode == MonsterData_1.GongJiMode.Far) {
            GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.monster_far_att);
            GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.monster_far_att_hit);
        }
        this.scheduleOnce(function () {
            _this.setEnemyState(EnemyConfig_1.Enemy_State.move);
        }, 1);
        if (this.monster_init_callback) {
            this.monster_init_callback();
        }
    };
    MonsterNormal.prototype.addMonsterNormalInited = function (callback) {
        this.monster_init_callback = callback;
    };
    /**初始化外观*/
    MonsterNormal.prototype.initOutward = function () {
        this.setSkin(this.getSkinName());
        _super.prototype.playSpinAnimaton.call(this, this.getAnimaName(MonsterData_1.MonsterActionName.Idle), true);
    };
    MonsterNormal.prototype.setTargetPos = function (pos, endCallback) {
        this.move_target_pos = pos;
        this.move_end_callback = endCallback;
    };
    MonsterNormal.prototype.setSkin = function (skinName) {
        this.spine.setSkin(skinName);
    };
    MonsterNormal.prototype.setFaceType = function (type) {
        this.face_type = type;
        if (this.face_type == MonsterData_1.MonsterFaceName.SideL) {
            this.node.scaleX = -this.setup_scale;
        }
        else {
            this.node.scaleX = this.setup_scale;
        }
    };
    MonsterNormal.prototype.getSkinName = function () {
        return this.face_type + this.skin_type;
    };
    MonsterNormal.prototype.getAnimaName = function (actionName) {
        return this.face_type + "_" + actionName;
    };
    /**设置打击目标 */
    MonsterNormal.prototype.setAttTarget = function (target) {
        this.att_target = target;
        if (target) {
            this.att_jishu = this.att_jiange;
        }
        else {
            this.move_direction = Math.PI * 3 / 2;
        }
    };
    MonsterNormal.prototype.addMonsterNormalAttack = function (callback) {
        this.monster_att_callback = callback;
    };
    /**
     *
     * @param target 攻击的目标
     */
    MonsterNormal.prototype.startAttack = function (target) {
        var _this = this;
        if (this.monster_att_callback) {
            //是否截获本次攻击
            if (this.monster_att_callback()) {
                return;
            }
        }
        _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.att);
        this.att_jishu = 0;
        if (target) {
            var offsetPos = target.getPosition().sub(this.node.getPosition());
            this.move_direction = Math.atan2(offsetPos.y, offsetPos.x);
            this.checkFace(MonsterData_1.MonsterActionName.Attack);
        }
        else {
            this.move_direction = Math.PI * 3 / 2;
            this.checkFace(MonsterData_1.MonsterActionName.Attack);
        }
        var data = new MonsterData_1.KeyFrameData();
        data.name = 'OnDamaging';
        data.callback = function () {
            _this.att_jishu = 0;
            switch (_this.base_data.AttackMode) {
                case MonsterData_1.GongJiMode.Melee:
                    {
                        if (target) {
                            //测试
                            target.removeFromParent();
                            _this.setAttTarget(null);
                        }
                        else {
                            //造成伤害
                            _super.prototype.injureWall.call(_this, _super.prototype.getAttData.call(_this, HeroConfig_1.DamageType.Normal, false));
                        }
                        var pos = target ? target.getPosition() : cc.v2(_this.node.x, _this.att_wall.getWallMaxYY());
                        var attNode = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.monster_normal_att, pos);
                        attNode.scale = _super.prototype.getWallAttackScale.call(_this);
                    }
                    break;
                case MonsterData_1.GongJiMode.Far:
                    {
                        var pos = target ? target.getPosition() : cc.v2(_this.node.x, _this.att_wall.getWallMaxYY());
                        _this.startLaunch(pos);
                    }
                    break;
            }
        };
        _super.prototype.playSpinAnimaton.call(this, this.getAnimaName(MonsterData_1.MonsterActionName.Attack), false, data, function () {
            _this.startIdle();
            _super.prototype.setEnemyState.call(_this, EnemyConfig_1.Enemy_State.move);
            if (_this.att_wall) {
                _this.move_direction = Math.random() > 0.5 ? Math.PI : 0;
            }
        });
    };
    MonsterNormal.prototype.startLaunch = function (pos) {
        var _this = this;
        var node = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.monster_far_att, this.getAttPos());
        var moveTS = node.getComponent(Move_1.default);
        moveTS.init(400, 0, GameEffectsManager_1.GameEffectId.monster_far_att);
        moveTS.setTargetPos(pos, function () {
            GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.monster_far_att_hit, node.getPosition());
            //造成伤害
            _super.prototype.injureWall.call(_this, _super.prototype.getAttData.call(_this, HeroConfig_1.DamageType.Normal, true));
        });
    };
    MonsterNormal.prototype.startIdle = function () {
        _super.prototype.playSpinAnimaton.call(this, this.getAnimaName(MonsterData_1.MonsterActionName.Idle), true);
    };
    MonsterNormal.prototype.addMonsterNormalXuanYun = function (callback) {
        this.monster_xuanyun_callback = callback;
    };
    MonsterNormal.prototype.onXuanYunResult = function (isXuanYun) {
        if (isXuanYun) {
            this.startXuanYun();
        }
        else {
            this.att_jishu = 0;
            this.setEnemyState(EnemyConfig_1.Enemy_State.move);
        }
        if (this.monster_xuanyun_callback) {
            this.monster_xuanyun_callback(isXuanYun);
        }
    };
    MonsterNormal.prototype.startXuanYun = function () {
        var _this = this;
        _super.prototype.playSpinAnimaton.call(this, this.getAnimaName(MonsterData_1.MonsterActionName.Hurt), false, null, function () {
            if (_this.isHaveBuff(HeroConfig_1.BuffId.Hero_XuanYun))
                _this.spine.paused = true;
        });
    };
    MonsterNormal.prototype.addMonsterNormalDeath = function (callback) {
        this.monster_death_callback = callback;
    };
    MonsterNormal.prototype.onMonsterDeath = function () {
        var _this = this;
        // super.playDeadAnimaton(this.getAnimaName(MonsterActionName.Death),()=>{
        //     this.removeAllDeBuff();
        //     cc.tween(this.shadow).to(0.5,{opacity:0}).start();
        //     cc.tween(this.node).to(0.5,{opacity:0}).call(()=>{
        //         this.removeAllDeBuff();
        //         MonsterManager.getInstance().destroyMonster(this.node,this.monster_type);
        //         let die=GameEffectsManager.getInstance().createGameEffectById(GameEffectId.monster_die,this.node.getPosition());
        //         die.scale=this.base_data.StrengthType==StrengthType.Normal?0.4:0.8;
        //     }).start();
        // });
        this.removeAllDeBuff();
        this.shadow.opacity = 0;
        this.node.opacity = 0;
        var die = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.monster_die, _super.prototype.getCenterPos.call(this));
        die.scale = this.base_data.StrengthType == MonsterData_1.StrengthType.Normal ? 0.4 : 0.8;
        if (this.monster_death_callback) {
            this.monster_death_callback();
        }
        cc.tween(this.node).delay(0.5).call(function () {
            _this.removeAllDeBuff();
            MonsterManager_1.default.getInstance().destroyMonster(_this.node, _this.monster_type);
        }).start();
    };
    MonsterNormal.prototype.update = function (dt) {
        if ((GameManager_1.default.getInstance().cur_game_state != Constants_1.GameState.Game_Playing) || this.getIsDie()) {
            return;
        }
        _super.prototype.update.call(this, dt);
        if (!this.isHaveDeBuffType(HeroConfig_1.BuffType.Vertigo)) {
            this.checkAtt(dt);
        }
        else {
            if (this.isHaveDeBuff(HeroConfig_1.BuffId.Hero_MeiMo_Active_MeiHuo)) {
                this.moving(dt);
            }
        }
    };
    MonsterNormal.prototype.moving = function (dt) {
        if (!this.isHaveDeBuff(HeroConfig_1.BuffId.Hero_XuanYun) && (this.getEnemyState() == EnemyConfig_1.Enemy_State.move)) {
            var speed = this.cur_move_speed * dt;
            if (this.move_target_pos) {
                var offsetPos = this.move_target_pos.sub(this.node.getPosition());
                if (offsetPos.mag() < speed) {
                    if (this.move_end_callback) {
                        this.move_end_callback();
                        this.move_end_callback = null;
                    }
                }
                else {
                    var pi2 = Math.PI * 2;
                    this.move_direction = (Math.atan2(offsetPos.y, offsetPos.x) + pi2) % pi2;
                    this.startMove(dt);
                }
            }
            else {
                this.startMove(dt);
            }
        }
    };
    MonsterNormal.prototype.startMove = function (dt) {
        var disX = this.node.x;
        var disY = this.node.y;
        var speed = this.cur_move_speed * dt;
        disX += speed * Math.cos(this.move_direction);
        disY += speed * Math.sin(this.move_direction);
        var leftRight = this.setX(disX);
        if (leftRight != 0) {
            this.move_direction += Math.PI;
        }
        this.setY(disY);
        // //不能穿过城墙
        // let walls=WallManager.getInstance().getAllWall();
        // walls.forEach((wall:Wall,wallType:WallType)=>{
        //     //攻击城墙的条件1，必须在城墙之上,2达到攻击距离
        //     let rect=wall.getWallRect();
        //     if(rect.contains(this.node.getPosition())&&this.node.y>wall.node.y){
        //         this.node.y=rect.yMax;
        //     }
        // })
        this.checkFace(MonsterData_1.MonsterActionName.Walk);
    };
    /**检测朝向 */
    MonsterNormal.prototype.checkFace = function (actionName) {
        var pi2 = Math.PI * 2;
        this.move_direction = (this.move_direction + pi2) % pi2;
        var newFace = MonsterData_1.MonsterFaceName.Front;
        //60~120°，背面
        if (this.move_direction >= Math.PI / 3 && this.move_direction <= Math.PI * 2 / 3) {
            newFace = MonsterData_1.MonsterFaceName.Back;
        }
        else if (this.move_direction >= Math.PI * 4 / 3 && this.move_direction <= Math.PI * 5 / 3) {
            newFace = MonsterData_1.MonsterFaceName.Front;
        }
        else {
            if (this.move_direction >= Math.PI * 2 / 3 && this.move_direction <= Math.PI * 4 / 3) {
                newFace = MonsterData_1.MonsterFaceName.SideL;
            }
            else {
                newFace = MonsterData_1.MonsterFaceName.SideR;
            }
        }
        if (this.face_type != newFace) {
            this.setFaceType(newFace);
            this.setSkin(this.getSkinName());
            _super.prototype.playSpinAnimaton.call(this, this.getAnimaName(actionName), true);
        }
        else {
            if (this.spine.animation != this.getAnimaName(MonsterData_1.MonsterActionName.Walk))
                _super.prototype.playSpinAnimaton.call(this, this.getAnimaName(actionName), true);
        }
    };
    /**攻击计算 */
    MonsterNormal.prototype.checkAtt = function (dt) {
        this.att_jishu += dt;
        if (this.att_jishu >= this.att_jiange) {
            this.att_jishu = this.att_jiange;
            //判断是否在攻击范围之内
            if (this.att_target) {
                this.attTarget(dt);
            }
            else {
                this.attWall(dt);
            }
        }
        else {
            this.moving(dt);
        }
    };
    /**攻击具体目标判断 */
    MonsterNormal.prototype.attTarget = function (dt) {
        var dis = this.node.getPosition().sub(this.att_target.getPosition()).mag();
        if (dis <= this.base_data.AttackDistance) {
            this.startAttack(this.att_target);
        }
        else {
            this.move_target_pos = this.att_target.getPosition();
            if (this.getEnemyState() == EnemyConfig_1.Enemy_State.move)
                this.moving(dt);
        }
    };
    /**攻击城墙判断 */
    MonsterNormal.prototype.attWall = function (dt) {
        var _this = this;
        var walls = WallManager_1.default.getInstance().getAllWall();
        var attWall = null;
        walls.forEach(function (wall, wallType) {
            //攻击城墙的条件1，必须在城墙之上,2达到攻击距离
            if (_this.node.y >= wall.getWallMaxYY() && Math.abs(_this.node.y - wall.getWallMaxYY()) <= _this.base_data.AttackDistance) {
                attWall = wall;
            }
        });
        if (attWall != null) {
            this.att_wall = attWall;
            this.startAttack();
        }
        else {
            this.move_direction = Math.PI * 3 / 2;
            this.move_target_pos = null;
            this.moving(dt);
        }
    };
    MonsterNormal = __decorate([
        ccclass
    ], MonsterNormal);
    return MonsterNormal;
}(Monster_1.default));
exports.default = MonsterNormal;

cc._RF.pop();