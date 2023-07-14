
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Monster/MonsterNormal.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTW9uc3RlclxcTW9uc3Rlck5vcm1hbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwQ0FBeUM7QUFDekMsb0RBQXNFO0FBQ3RFLGlFQUE4RTtBQUM5RSxxQ0FBZ0M7QUFDaEMsOENBQXlDO0FBQ3pDLHNEQUF1RTtBQUd2RSxtREFBOEM7QUFDOUMscUNBQWdDO0FBQ2hDLDZDQUE0SDtBQUM1SCxtREFBOEM7QUFHeEMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFDMUMsVUFBVTtBQUVWO0lBQTJDLGlDQUFPO0lBQWxEO1FBQUEscUVBK1VDO1FBN1VHLDhCQUF3QixHQUFVLElBQUksQ0FBQztRQUN2QywyQkFBcUIsR0FBVSxJQUFJLENBQUM7UUFDcEMsNEJBQXNCLEdBQVUsSUFBSSxDQUFDO1FBQ3JDLDBCQUFvQixHQUFVLElBQUksQ0FBQzs7SUEwVXZDLENBQUM7SUF4VWEsOEJBQU0sR0FBaEI7UUFDSSxpQkFBTSxNQUFNLFdBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRU8sdUNBQWUsR0FBdkI7UUFBQSxpQkFZQztRQVhHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQixJQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxJQUFFLHdCQUFVLENBQUMsR0FBRyxFQUFDO1lBQ3pDLHVDQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDLGlCQUFpQixDQUFDLGlDQUFZLENBQUMsZUFBZSxDQUFDLENBQUM7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QUksQ0FBQzthQUNoQjtRQUNMLENBQUMsQ0FBQyxDQUFBO1FBQ0YsSUFBRyxPQUFPLElBQUUsSUFBSSxFQUFDO1lBQ2IsSUFBSSxDQUFDLFFBQVEsR0FBQyxPQUFPLENBQUM7WUFDdEIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3RCO2FBQUk7WUFDRCxJQUFJLENBQUMsY0FBYyxHQUFDLElBQUksQ0FBQyxFQUFFLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQztZQUNoQyxJQUFJLENBQUMsZUFBZSxHQUFDLElBQUksQ0FBQztZQUMxQixJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ25CO0lBQ0wsQ0FBQztJQTdVZ0IsYUFBYTtRQURqQyxPQUFPO09BQ2EsYUFBYSxDQStVakM7SUFBRCxvQkFBQztDQS9VRCxBQStVQyxDQS9VMEMsaUJBQU8sR0ErVWpEO2tCQS9Vb0IsYUFBYSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdhbWVTdGF0ZSB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgRW5lbXlfRGVCdWZmX1R5cGUsIEVuZW15X1N0YXRlIH0gZnJvbSBcIi4uL0VuZW15L0VuZW15Q29uZmlnXCI7XHJcbmltcG9ydCB7IEdhbWVFZmZlY3RJZCwgR2FtZUVmZmVjdHNNYW5hZ2VyIH0gZnJvbSBcIi4uL0dhbWUvR2FtZUVmZmVjdHNNYW5hZ2VyXCI7XHJcbmltcG9ydCBNb3ZlIGZyb20gXCIuLi9HYW1lL01vdmVcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBCdWZmSWQsIEJ1ZmZUeXBlLCBEYW1hZ2VUeXBlIH0gZnJvbSBcIi4uL0hlcm8vR2FtZS9IZXJvQ29uZmlnXCI7XHJcbmltcG9ydCBXYWxsIGZyb20gXCIuLi9XYWxsL1dhbGxcIjtcclxuaW1wb3J0IHsgV2FsbFR5cGUgfSBmcm9tIFwiLi4vV2FsbC9XYWxsQ29uZmlnXCI7XHJcbmltcG9ydCBXYWxsTWFuYWdlciBmcm9tIFwiLi4vV2FsbC9XYWxsTWFuYWdlclwiO1xyXG5pbXBvcnQgTW9uc3RlciBmcm9tIFwiLi9Nb25zdGVyXCI7XHJcbmltcG9ydCB7IEdvbmdKaU1vZGUsIEtleUZyYW1lRGF0YSwgTW9uc3RlckFjdGlvbk5hbWUsIE1vbnN0ZXJGYWNlTmFtZSwgTW9uc3RlclNraW5UeXBlLCBTdHJlbmd0aFR5cGUgfSBmcm9tIFwiLi9Nb25zdGVyRGF0YVwiO1xyXG5pbXBvcnQgTW9uc3Rlck1hbmFnZXIgZnJvbSBcIi4vTW9uc3Rlck1hbmFnZXJcIjtcclxuXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuLyoq5pmu6YCa5oCq54mpICovXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vbnN0ZXJOb3JtYWwgZXh0ZW5kcyBNb25zdGVyIHtcclxuXHJcbiAgICBtb25zdGVyX3h1YW55dW5fY2FsbGJhY2s6RnVuY3Rpb249bnVsbDtcclxuICAgIG1vbnN0ZXJfaW5pdF9jYWxsYmFjazpGdW5jdGlvbj1udWxsO1xyXG4gICAgbW9uc3Rlcl9kZWF0aF9jYWxsYmFjazpGdW5jdGlvbj1udWxsO1xyXG4gICAgbW9uc3Rlcl9hdHRfY2FsbGJhY2s6RnVuY3Rpb249bnVsbDtcclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Mb2FkKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xyXG4gICAgICAgIHRoaXMuYWRkRGVhdGhDYWxsYmFjayh0aGlzLm9uTW9uc3RlckRlYXRoKTtcclxuICAgICAgICB0aGlzLmFkZEluaXRMaXN0ZW4odGhpcy5vbk1vbnN0ZXJJbml0ZWQpO1xyXG4gICAgICAgIHRoaXMuYWRkWHVhbll1bkxpc3Rlbih0aGlzLm9uWHVhbll1blJlc3VsdCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbk1vbnN0ZXJJbml0ZWQoKXtcclxuICAgICAgICB0aGlzLmluaXRPdXR3YXJkKCk7XHJcbiAgICAgICAgaWYodGhpcy5iYXNlX2RhdGEuQXR0YWNrTW9kZT09R29uZ0ppTW9kZS5GYXIpe1xyXG4gICAgICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRFZmZlY3RQb29sQnlJZChHYW1lRWZmZWN0SWQubW9uc3Rlcl9mYXJfYXR0KTtcclxuICAgICAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRWZmZWN0UG9vbEJ5SWQoR2FtZUVmZmVjdElkLm1vbnN0ZXJfZmFyX2F0dF9oaXQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLnNldEVuZW15U3RhdGUoRW5lbXlfU3RhdGUubW92ZSk7XHJcbiAgICAgICAgfSwxKTtcclxuICAgICAgICBpZih0aGlzLm1vbnN0ZXJfaW5pdF9jYWxsYmFjayl7XHJcbiAgICAgICAgICAgIHRoaXMubW9uc3Rlcl9pbml0X2NhbGxiYWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFkZE1vbnN0ZXJOb3JtYWxJbml0ZWQoY2FsbGJhY2s6RnVuY3Rpb24pe1xyXG4gICAgICAgIHRoaXMubW9uc3Rlcl9pbml0X2NhbGxiYWNrPWNhbGxiYWNrO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuWIneWni+WMluWkluingiovXHJcbiAgICBwcml2YXRlIGluaXRPdXR3YXJkKCl7XHJcbiAgICAgICAgdGhpcy5zZXRTa2luKHRoaXMuZ2V0U2tpbk5hbWUoKSk7XHJcbiAgICAgICAgc3VwZXIucGxheVNwaW5BbmltYXRvbih0aGlzLmdldEFuaW1hTmFtZShNb25zdGVyQWN0aW9uTmFtZS5JZGxlKSx0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRUYXJnZXRQb3MocG9zOmNjLlZlYzIsZW5kQ2FsbGJhY2s6RnVuY3Rpb24pe1xyXG4gICAgICAgIHRoaXMubW92ZV90YXJnZXRfcG9zPXBvcztcclxuICAgICAgICB0aGlzLm1vdmVfZW5kX2NhbGxiYWNrPWVuZENhbGxiYWNrO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBzZXRTa2luKHNraW5OYW1lOiBzdHJpbmcpe1xyXG4gICAgICAgIHRoaXMuc3BpbmUuc2V0U2tpbihza2luTmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0RmFjZVR5cGUodHlwZTpNb25zdGVyRmFjZU5hbWUpe1xyXG4gICAgICAgIHRoaXMuZmFjZV90eXBlPXR5cGU7XHJcbiAgICAgICAgaWYodGhpcy5mYWNlX3R5cGU9PU1vbnN0ZXJGYWNlTmFtZS5TaWRlTCl7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5zY2FsZVg9LXRoaXMuc2V0dXBfc2NhbGU7XHJcbiAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuc2NhbGVYPXRoaXMuc2V0dXBfc2NhbGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldFNraW5OYW1lKCk6c3RyaW5ne1xyXG4gICAgICAgIHJldHVybiB0aGlzLmZhY2VfdHlwZSt0aGlzLnNraW5fdHlwZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRBbmltYU5hbWUoYWN0aW9uTmFtZTpNb25zdGVyQWN0aW9uTmFtZSk6c3RyaW5ne1xyXG4gICAgICAgIHJldHVybiB0aGlzLmZhY2VfdHlwZStcIl9cIithY3Rpb25OYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuiuvue9ruaJk+WHu+ebruaghyAqL1xyXG4gICAgc2V0QXR0VGFyZ2V0KHRhcmdldDpjYy5Ob2RlKXtcclxuICAgICAgICB0aGlzLmF0dF90YXJnZXQ9dGFyZ2V0O1xyXG4gICAgICAgIGlmKHRhcmdldCl7XHJcbiAgICAgICAgICAgIHRoaXMuYXR0X2ppc2h1PXRoaXMuYXR0X2ppYW5nZTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlX2RpcmVjdGlvbj1NYXRoLlBJKjMvMjtcclxuICAgICAgICB9ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBhZGRNb25zdGVyTm9ybWFsQXR0YWNrKGNhbGxiYWNrOkZ1bmN0aW9uKXtcclxuICAgICAgICB0aGlzLm1vbnN0ZXJfYXR0X2NhbGxiYWNrPWNhbGxiYWNrO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB0YXJnZXQg5pS75Ye755qE55uu5qCHXHJcbiAgICAgKi9cclxuICAgIHN0YXJ0QXR0YWNrKHRhcmdldD86Y2MuTm9kZSl7XHJcbiAgICAgICAgaWYodGhpcy5tb25zdGVyX2F0dF9jYWxsYmFjayl7XHJcbiAgICAgICAgICAgIC8v5piv5ZCm5oiq6I635pys5qyh5pS75Ye7XHJcbiAgICAgICAgICAgIGlmKHRoaXMubW9uc3Rlcl9hdHRfY2FsbGJhY2soKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN1cGVyLnNldEVuZW15U3RhdGUoRW5lbXlfU3RhdGUuYXR0KTtcclxuICAgICAgICB0aGlzLmF0dF9qaXNodT0wOyBcclxuICAgICAgICBpZih0YXJnZXQpe1xyXG4gICAgICAgICAgICBsZXQgb2Zmc2V0UG9zPXRhcmdldC5nZXRQb3NpdGlvbigpLnN1Yih0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKSk7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZV9kaXJlY3Rpb249TWF0aC5hdGFuMihvZmZzZXRQb3MueSxvZmZzZXRQb3MueCk7XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tGYWNlKE1vbnN0ZXJBY3Rpb25OYW1lLkF0dGFjayk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZV9kaXJlY3Rpb249TWF0aC5QSSozLzI7XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tGYWNlKE1vbnN0ZXJBY3Rpb25OYW1lLkF0dGFjayk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBkYXRhPW5ldyBLZXlGcmFtZURhdGEoKTtcclxuICAgICAgICBkYXRhLm5hbWU9J09uRGFtYWdpbmcnO1xyXG4gICAgICAgIGRhdGEuY2FsbGJhY2s9KCk9PntcclxuICAgICAgICAgICAgdGhpcy5hdHRfamlzaHU9MDtcclxuICAgICAgICAgICAgc3dpdGNoKHRoaXMuYmFzZV9kYXRhLkF0dGFja01vZGUpe1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb25nSmlNb2RlLk1lbGVlOntcclxuICAgICAgICAgICAgICAgICAgICBpZih0YXJnZXQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+a1i+ivlVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEF0dFRhcmdldChudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/pgKDmiJDkvKTlrrNcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VwZXIuaW5qdXJlV2FsbChzdXBlci5nZXRBdHREYXRhKERhbWFnZVR5cGUuTm9ybWFsLGZhbHNlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwb3M9dGFyZ2V0P3RhcmdldC5nZXRQb3NpdGlvbigpOmNjLnYyKHRoaXMubm9kZS54LHRoaXMuYXR0X3dhbGwuZ2V0V2FsbE1heFlZKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBhdHROb2RlPUdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5tb25zdGVyX25vcm1hbF9hdHQscG9zKTtcclxuICAgICAgICAgICAgICAgICAgICBhdHROb2RlLnNjYWxlPXN1cGVyLmdldFdhbGxBdHRhY2tTY2FsZSgpO1xyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb25nSmlNb2RlLkZhcjp7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBvcz10YXJnZXQ/dGFyZ2V0LmdldFBvc2l0aW9uKCk6Y2MudjIodGhpcy5ub2RlLngsdGhpcy5hdHRfd2FsbC5nZXRXYWxsTWF4WVkoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydExhdW5jaChwb3MpO1xyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN1cGVyLnBsYXlTcGluQW5pbWF0b24odGhpcy5nZXRBbmltYU5hbWUoTW9uc3RlckFjdGlvbk5hbWUuQXR0YWNrKSxmYWxzZSxkYXRhLCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRJZGxlKCk7XHJcbiAgICAgICAgICAgIHN1cGVyLnNldEVuZW15U3RhdGUoRW5lbXlfU3RhdGUubW92ZSk7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuYXR0X3dhbGwpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlX2RpcmVjdGlvbj1NYXRoLnJhbmRvbSgpPjAuNT9NYXRoLlBJOjA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0TGF1bmNoKHBvczpjYy5WZWMyKXtcclxuICAgICAgICBsZXQgbm9kZT1HYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQubW9uc3Rlcl9mYXJfYXR0LHRoaXMuZ2V0QXR0UG9zKCkpO1xyXG4gICAgICAgIGxldCBtb3ZlVFM9bm9kZS5nZXRDb21wb25lbnQoTW92ZSk7XHJcbiAgICAgICAgbW92ZVRTLmluaXQoNDAwLDAsR2FtZUVmZmVjdElkLm1vbnN0ZXJfZmFyX2F0dCk7XHJcbiAgICAgICAgbW92ZVRTLnNldFRhcmdldFBvcyhwb3MsKCk9PntcclxuICAgICAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLm1vbnN0ZXJfZmFyX2F0dF9oaXQsbm9kZS5nZXRQb3NpdGlvbigpKTsgICAgICAgICAgICBcclxuICAgICAgICAgICAgLy/pgKDmiJDkvKTlrrNcclxuICAgICAgICAgICAgc3VwZXIuaW5qdXJlV2FsbChzdXBlci5nZXRBdHREYXRhKERhbWFnZVR5cGUuTm9ybWFsLHRydWUpKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydElkbGUoKXtcclxuICAgICAgICBzdXBlci5wbGF5U3BpbkFuaW1hdG9uKHRoaXMuZ2V0QW5pbWFOYW1lKE1vbnN0ZXJBY3Rpb25OYW1lLklkbGUpLHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZE1vbnN0ZXJOb3JtYWxYdWFuWXVuKGNhbGxiYWNrOkZ1bmN0aW9uKXtcclxuICAgICAgICB0aGlzLm1vbnN0ZXJfeHVhbnl1bl9jYWxsYmFjaz1jYWxsYmFjaztcclxuICAgIH1cclxuXHJcbiAgICBvblh1YW5ZdW5SZXN1bHQoaXNYdWFuWXVuOmJvb2xlYW4pe1xyXG4gICAgICAgIGlmKGlzWHVhbll1bil7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRYdWFuWXVuKCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuYXR0X2ppc2h1PTA7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RW5lbXlTdGF0ZShFbmVteV9TdGF0ZS5tb3ZlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5tb25zdGVyX3h1YW55dW5fY2FsbGJhY2spe1xyXG4gICAgICAgICAgICB0aGlzLm1vbnN0ZXJfeHVhbnl1bl9jYWxsYmFjayhpc1h1YW5ZdW4pO1xyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0WHVhbll1bigpe1xyXG4gICAgICAgIHN1cGVyLnBsYXlTcGluQW5pbWF0b24odGhpcy5nZXRBbmltYU5hbWUoTW9uc3RlckFjdGlvbk5hbWUuSHVydCksZmFsc2UsbnVsbCwoKT0+e1xyXG4gICAgICAgICAgICBpZih0aGlzLmlzSGF2ZUJ1ZmYoQnVmZklkLkhlcm9fWHVhbll1bikpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNwaW5lLnBhdXNlZD10cnVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZE1vbnN0ZXJOb3JtYWxEZWF0aChjYWxsYmFjazpGdW5jdGlvbil7XHJcbiAgICAgICAgdGhpcy5tb25zdGVyX2RlYXRoX2NhbGxiYWNrPWNhbGxiYWNrO1xyXG4gICAgfVxyXG5cclxuICAgIG9uTW9uc3RlckRlYXRoKCl7XHJcbiAgICAgICAgLy8gc3VwZXIucGxheURlYWRBbmltYXRvbih0aGlzLmdldEFuaW1hTmFtZShNb25zdGVyQWN0aW9uTmFtZS5EZWF0aCksKCk9PntcclxuICAgICAgICAvLyAgICAgdGhpcy5yZW1vdmVBbGxEZUJ1ZmYoKTtcclxuICAgICAgICAvLyAgICAgY2MudHdlZW4odGhpcy5zaGFkb3cpLnRvKDAuNSx7b3BhY2l0eTowfSkuc3RhcnQoKTtcclxuICAgICAgICAvLyAgICAgY2MudHdlZW4odGhpcy5ub2RlKS50bygwLjUse29wYWNpdHk6MH0pLmNhbGwoKCk9PntcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMucmVtb3ZlQWxsRGVCdWZmKCk7XHJcbiAgICAgICAgLy8gICAgICAgICBNb25zdGVyTWFuYWdlci5nZXRJbnN0YW5jZSgpLmRlc3Ryb3lNb25zdGVyKHRoaXMubm9kZSx0aGlzLm1vbnN0ZXJfdHlwZSk7XHJcbiAgICAgICAgLy8gICAgICAgICBsZXQgZGllPUdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5tb25zdGVyX2RpZSx0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKSk7XHJcbiAgICAgICAgLy8gICAgICAgICBkaWUuc2NhbGU9dGhpcy5iYXNlX2RhdGEuU3RyZW5ndGhUeXBlPT1TdHJlbmd0aFR5cGUuTm9ybWFsPzAuNDowLjg7XHJcbiAgICAgICAgLy8gICAgIH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVBbGxEZUJ1ZmYoKTtcclxuICAgICAgICB0aGlzLnNoYWRvdy5vcGFjaXR5PTA7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHk9MDtcclxuICAgICAgICBsZXQgZGllPUdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5tb25zdGVyX2RpZSxzdXBlci5nZXRDZW50ZXJQb3MoKSk7XHJcbiAgICAgICAgZGllLnNjYWxlPXRoaXMuYmFzZV9kYXRhLlN0cmVuZ3RoVHlwZT09U3RyZW5ndGhUeXBlLk5vcm1hbD8wLjQ6MC44O1xyXG4gICAgICAgIGlmKHRoaXMubW9uc3Rlcl9kZWF0aF9jYWxsYmFjayl7XHJcbiAgICAgICAgICAgIHRoaXMubW9uc3Rlcl9kZWF0aF9jYWxsYmFjaygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYy50d2Vlbih0aGlzLm5vZGUpLmRlbGF5KDAuNSkuY2FsbCgoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZUFsbERlQnVmZigpO1xyXG4gICAgICAgICAgICBNb25zdGVyTWFuYWdlci5nZXRJbnN0YW5jZSgpLmRlc3Ryb3lNb25zdGVyKHRoaXMubm9kZSx0aGlzLm1vbnN0ZXJfdHlwZSk7XHJcbiAgICAgICAgfSkuc3RhcnQoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgdXBkYXRlKGR0KVxyXG4gICAge1xyXG4gICAgICAgIGlmKChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX3N0YXRlIT1HYW1lU3RhdGUuR2FtZV9QbGF5aW5nKXx8dGhpcy5nZXRJc0RpZSgpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdXBlci51cGRhdGUoZHQpO1xyXG4gICAgICAgIGlmKCF0aGlzLmlzSGF2ZURlQnVmZlR5cGUoQnVmZlR5cGUuVmVydGlnbykpe1xyXG4gICAgICAgICAgICB0aGlzLmNoZWNrQXR0KGR0KTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgaWYodGhpcy5pc0hhdmVEZUJ1ZmYoQnVmZklkLkhlcm9fTWVpTW9fQWN0aXZlX01laUh1bykpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZpbmcoZHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbW92aW5nKGR0KVxyXG4gICAge1xyXG4gICAgICAgIGlmKCF0aGlzLmlzSGF2ZURlQnVmZihCdWZmSWQuSGVyb19YdWFuWXVuKSYmKHRoaXMuZ2V0RW5lbXlTdGF0ZSgpPT1FbmVteV9TdGF0ZS5tb3ZlKSl7XHJcbiAgICAgICAgICAgIGxldCBzcGVlZD10aGlzLmN1cl9tb3ZlX3NwZWVkKmR0O1xyXG4gICAgICAgICAgICBpZih0aGlzLm1vdmVfdGFyZ2V0X3Bvcyl7XHJcbiAgICAgICAgICAgICAgICBsZXQgb2Zmc2V0UG9zPXRoaXMubW92ZV90YXJnZXRfcG9zLnN1Yih0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKSk7XHJcbiAgICAgICAgICAgICAgICBpZihvZmZzZXRQb3MubWFnKCk8c3BlZWQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5tb3ZlX2VuZF9jYWxsYmFjayl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZV9lbmRfY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlX2VuZF9jYWxsYmFjaz1udWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBpMj1NYXRoLlBJKjI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlX2RpcmVjdGlvbj0oTWF0aC5hdGFuMihvZmZzZXRQb3MueSxvZmZzZXRQb3MueCkrcGkyKSVwaTI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydE1vdmUoZHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRNb3ZlKGR0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGFydE1vdmUoZHQpe1xyXG4gICAgICAgIGxldCBkaXNYPXRoaXMubm9kZS54O1xyXG4gICAgICAgIGxldCBkaXNZPXRoaXMubm9kZS55O1xyXG4gICAgICAgIGxldCBzcGVlZD10aGlzLmN1cl9tb3ZlX3NwZWVkKmR0O1xyXG4gICAgICAgIGRpc1grPXNwZWVkKk1hdGguY29zKHRoaXMubW92ZV9kaXJlY3Rpb24pO1xyXG4gICAgICAgIGRpc1krPXNwZWVkKk1hdGguc2luKHRoaXMubW92ZV9kaXJlY3Rpb24pO1xyXG4gICAgICAgIGxldCBsZWZ0UmlnaHQ9dGhpcy5zZXRYKGRpc1gpO1xyXG4gICAgICAgIGlmKGxlZnRSaWdodCE9MCl7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZV9kaXJlY3Rpb24rPU1hdGguUEk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0WShkaXNZKTtcclxuICAgICAgICAvLyAvL+S4jeiDveepv+i/h+WfjuWimVxyXG4gICAgICAgIC8vIGxldCB3YWxscz1XYWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEFsbFdhbGwoKTtcclxuICAgICAgICAvLyB3YWxscy5mb3JFYWNoKCh3YWxsOldhbGwsd2FsbFR5cGU6V2FsbFR5cGUpPT57XHJcbiAgICAgICAgLy8gICAgIC8v5pS75Ye75Z+O5aKZ55qE5p2h5Lu2Me+8jOW/hemhu+WcqOWfjuWimeS5i+S4iiwy6L6+5Yiw5pS75Ye76Led56a7XHJcbiAgICAgICAgLy8gICAgIGxldCByZWN0PXdhbGwuZ2V0V2FsbFJlY3QoKTtcclxuICAgICAgICAvLyAgICAgaWYocmVjdC5jb250YWlucyh0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKSkmJnRoaXMubm9kZS55PndhbGwubm9kZS55KXtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMubm9kZS55PXJlY3QueU1heDtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH0pXHJcbiAgICAgICAgdGhpcy5jaGVja0ZhY2UoTW9uc3RlckFjdGlvbk5hbWUuV2Fsayk7XHJcbiAgICB9XHJcbiAgICAvKirmo4DmtYvmnJ3lkJEgKi9cclxuICAgIGNoZWNrRmFjZShhY3Rpb25OYW1lOk1vbnN0ZXJBY3Rpb25OYW1lKXtcclxuICAgICAgICBsZXQgcGkyPU1hdGguUEkqMjtcclxuICAgICAgICB0aGlzLm1vdmVfZGlyZWN0aW9uPSh0aGlzLm1vdmVfZGlyZWN0aW9uK3BpMiklcGkyO1xyXG4gICAgICAgIGxldCBuZXdGYWNlPU1vbnN0ZXJGYWNlTmFtZS5Gcm9udDtcclxuICAgICAgICAvLzYwfjEyMMKw77yM6IOM6Z2iXHJcbiAgICAgICAgaWYodGhpcy5tb3ZlX2RpcmVjdGlvbj49TWF0aC5QSS8zJiZ0aGlzLm1vdmVfZGlyZWN0aW9uPD1NYXRoLlBJKjIvMyl7XHJcbiAgICAgICAgICAgIG5ld0ZhY2U9TW9uc3RlckZhY2VOYW1lLkJhY2s7XHJcbiAgICAgICAgfWVsc2UgaWYodGhpcy5tb3ZlX2RpcmVjdGlvbj49TWF0aC5QSSo0LzMmJnRoaXMubW92ZV9kaXJlY3Rpb248PU1hdGguUEkqNS8zKXtcclxuICAgICAgICAgICAgbmV3RmFjZT1Nb25zdGVyRmFjZU5hbWUuRnJvbnQ7XHJcbiAgICAgICAgfWVsc2V7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKHRoaXMubW92ZV9kaXJlY3Rpb24+PU1hdGguUEkqMi8zJiZ0aGlzLm1vdmVfZGlyZWN0aW9uPD1NYXRoLlBJKjQvMyl7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgbmV3RmFjZT1Nb25zdGVyRmFjZU5hbWUuU2lkZUw7XHJcbiAgICAgICAgICAgIH1lbHNleyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIG5ld0ZhY2U9TW9uc3RlckZhY2VOYW1lLlNpZGVSO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuZmFjZV90eXBlIT1uZXdGYWNlKXtcclxuICAgICAgICAgICAgdGhpcy5zZXRGYWNlVHlwZShuZXdGYWNlKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRTa2luKHRoaXMuZ2V0U2tpbk5hbWUoKSk7XHJcbiAgICAgICAgICAgIHN1cGVyLnBsYXlTcGluQW5pbWF0b24odGhpcy5nZXRBbmltYU5hbWUoYWN0aW9uTmFtZSksdHJ1ZSk7XHJcbiAgICAgICAgfWVsc2V7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKHRoaXMuc3BpbmUuYW5pbWF0aW9uIT10aGlzLmdldEFuaW1hTmFtZShNb25zdGVyQWN0aW9uTmFtZS5XYWxrKSlcclxuICAgICAgICAgICAgc3VwZXIucGxheVNwaW5BbmltYXRvbih0aGlzLmdldEFuaW1hTmFtZShhY3Rpb25OYW1lKSx0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoq5pS75Ye76K6h566XICovXHJcbiAgICBjaGVja0F0dChkdDpudW1iZXIpeyAgICAgICAgXHJcbiAgICAgICAgdGhpcy5hdHRfamlzaHUrPWR0O1xyXG4gICAgICAgIGlmKHRoaXMuYXR0X2ppc2h1Pj10aGlzLmF0dF9qaWFuZ2Upe1xyXG4gICAgICAgICAgICB0aGlzLmF0dF9qaXNodT10aGlzLmF0dF9qaWFuZ2U7XHJcbiAgICAgICAgICAgIC8v5Yik5pat5piv5ZCm5Zyo5pS75Ye76IyD5Zu05LmL5YaFXHJcbiAgICAgICAgICAgIGlmKHRoaXMuYXR0X3RhcmdldCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF0dFRhcmdldChkdCk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdHRXYWxsKGR0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLm1vdmluZyhkdCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoq5pS75Ye75YW35L2T55uu5qCH5Yik5patICovXHJcbiAgICBhdHRUYXJnZXQoZHQ6bnVtYmVyKXtcclxuICAgICAgICBsZXQgZGlzPXRoaXMubm9kZS5nZXRQb3NpdGlvbigpLnN1Yih0aGlzLmF0dF90YXJnZXQuZ2V0UG9zaXRpb24oKSkubWFnKCk7XHJcbiAgICAgICAgaWYoZGlzPD10aGlzLmJhc2VfZGF0YS5BdHRhY2tEaXN0YW5jZSl7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRBdHRhY2sodGhpcy5hdHRfdGFyZ2V0KTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlX3RhcmdldF9wb3M9dGhpcy5hdHRfdGFyZ2V0LmdldFBvc2l0aW9uKCk7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZ2V0RW5lbXlTdGF0ZSgpPT1FbmVteV9TdGF0ZS5tb3ZlKVxyXG4gICAgICAgICAgICB0aGlzLm1vdmluZyhkdCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoq5pS75Ye75Z+O5aKZ5Yik5patICovXHJcbiAgICBhdHRXYWxsKGR0Om51bWJlcil7XHJcbiAgICAgICAgbGV0IHdhbGxzPVdhbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0QWxsV2FsbCgpO1xyXG4gICAgICAgIGxldCBhdHRXYWxsPW51bGw7XHJcbiAgICAgICAgd2FsbHMuZm9yRWFjaCgod2FsbDpXYWxsLHdhbGxUeXBlOldhbGxUeXBlKT0+e1xyXG4gICAgICAgICAgICAvL+aUu+WHu+WfjuWimeeahOadoeS7tjHvvIzlv4XpobvlnKjln47lopnkuYvkuIosMui+vuWIsOaUu+WHu+i3neemu1xyXG4gICAgICAgICAgICBpZih0aGlzLm5vZGUueT49d2FsbC5nZXRXYWxsTWF4WVkoKSYmTWF0aC5hYnModGhpcy5ub2RlLnktd2FsbC5nZXRXYWxsTWF4WVkoKSk8PXRoaXMuYmFzZV9kYXRhLkF0dGFja0Rpc3RhbmNlKXsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBhdHRXYWxsPXdhbGw7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICBpZihhdHRXYWxsIT1udWxsKXsgICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5hdHRfd2FsbD1hdHRXYWxsO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0QXR0YWNrKCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZV9kaXJlY3Rpb249TWF0aC5QSSozLzI7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZV90YXJnZXRfcG9zPW51bGw7ICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5tb3ZpbmcoZHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG59XHJcbiJdfQ==