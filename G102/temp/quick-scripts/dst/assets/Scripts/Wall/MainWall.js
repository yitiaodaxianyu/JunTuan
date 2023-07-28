
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Wall/MainWall.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4ae3bxC9vpNLLhOh0fKSpCi', 'MainWall');
// Scripts/Wall/MainWall.ts

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
var ApkManager_1 = require("../Ads/ApkManager");
var Constants_1 = require("../Constants");
var HpProgressBar_1 = require("../Monster/HpProgressBar");
var GameManager_1 = require("../GameManager");
var MyTool_1 = require("../Tools/MyTool");
var HeroConfig_1 = require("../Hero/Game/HeroConfig");
var LevelManager_1 = require("../Level/LevelManager");
var TutorailsManager_1 = require("../Tutorials/TutorailsManager");
var BuffStateManager_1 = require("../Game/BuffStateManager");
var Wall_1 = require("./Wall");
var WallManager_1 = require("./WallManager");
var WallConfig_1 = require("./WallConfig");
var FightingManager_1 = require("../Game/FightingManager");
var BuffData_1 = require("../Hero/Game/BuffData");
var TouchPlane_1 = require("../Game/TouchPlane/TouchPlane");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MainWall = /** @class */ (function (_super) {
    __extends(MainWall, _super);
    function MainWall() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**城墙0特效 */
        _this.wall_spine0 = null;
        /**城墙1特效 */
        _this.wall_spine1 = null;
        /**战车特效 */
        _this.che_spine = null;
        /**当前城墙的阶段 */
        _this.cur_wall_stage = 0;
        /**上一个城墙的阶段 */
        _this.pre_wall_stage = 0;
        /**受伤的 */
        _this.node_injured = null;
        _this.injured_action = null;
        _this.node_vertigo = null;
        _this.vertigo_action = null;
        _this.targetX = 0;
        _this.easing = 0.5;
        return _this;
    }
    MainWall.prototype.onLoad = function () {
        this.setHpChangeListen(this.onWallChangeHp.bind(this));
        this.setHpShowListen(this.showWallTeXiao.bind(this));
        _super.prototype.setWallDieListen.call(this, this.onWallDie.bind(this));
        var hpRoot = cc.find('Canvas/Ui_Root/hp_root');
        this.hp_progress = hpRoot.getChildByName('hp').getComponent(HpProgressBar_1.default);
        this.shield_progress = hpRoot.getChildByName('shield').getComponent(cc.ProgressBar);
        this.hp_text = hpRoot.getChildByName('hpText').getComponent(cc.Label);
        this.shield_text = hpRoot.getChildByName('shieldText').getComponent(cc.Label);
        this.map_shield_value = new Map();
        this.map_immunity_shield_value = new Map();
        this.node_injured = hpRoot.parent.getChildByName('injured');
        this.node_vertigo = hpRoot.parent.getChildByName('vertigo');
        this.wall_spine0 = this.node.getChildByName('wall0').getComponent(sp.Skeleton);
        this.wall_spine1 = this.node.getChildByName('wall1').getComponent(sp.Skeleton);
        this.che_spine = this.node.getChildByName('bg2_wall copy').getComponent(sp.Skeleton);
        this.wall_spine0.node.active = false;
        this.wall_spine1.node.active = false;
        WallManager_1.default.getInstance().addWall(WallConfig_1.WallType.Main, this);
        this.showHp();
        this.showShildProgress();
        TouchPlane_1.instance.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMoveByJoy, this);
        TouchPlane_1.instance.on(cc.Node.EventType.TOUCH_END, this.onTouchEndByJoy, this);
    };
    MainWall.prototype.start = function () {
        BuffStateManager_1.default.getInstance().createBuffRoot(cc.v2(this.node.x, this.node.y + 150), HeroConfig_1.Hero_Type.Hero_Num);
        this.che_spine.setAnimation(0, 'walk', true);
        //let wallDown = this.node.getChildByName('wall_down');
        //let worldPos = wallDown.parent.convertToWorldSpaceAR(wallDown.getPosition());
        //let pos = GameEffectsManager.getInstance().node.convertToNodeSpaceAR(worldPos);
        // this.setWallRect(cc.rect(wallDown.x, wallDown.y, wallDown.width, wallDown.height));
    };
    MainWall.prototype.onDestroy = function () {
        TouchPlane_1.instance.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMoveByJoy, this);
        TouchPlane_1.instance.off(cc.Node.EventType.TOUCH_END, this.onTouchEndByJoy, this);
    };
    MainWall.prototype.onTouchMoveByJoy = function () {
        this.targetX = GameManager_1.default.getInstance().aniType;
    };
    MainWall.prototype.onTouchEndByJoy = function (event, data) {
        this.targetX = (GameManager_1.default.getInstance().aniType - 4) * 75;
    };
    MainWall.prototype.update = function (dt) {
        if (GameManager_1.default.getInstance().cur_game_state != Constants_1.GameState.Game_Playing)
            return;
        if (this.node) {
            var vx = (this.targetX - this.node.x) * this.easing;
            this.node.x += vx;
            this.setWallRect(cc.rect(this.node.x - this.node.width / 2, this.node.y - this.node.height / 2, this.node.width, this.node.height));
            var ggp = FightingManager_1.default.getInstance().node.getComponent(cc.Graphics);
            ggp.rect(this.getWallRect().x, this.getWallRect().y, this.getWallRect().width, this.getWallRect().height);
        }
    };
    MainWall.prototype.onWallDie = function () {
        GameManager_1.default.getInstance().onWallDie();
    };
    MainWall.prototype.startNextLevel = function () {
        this.resetWallTeXiao();
        this.is_tutorail = false;
    };
    /** */
    MainWall.prototype.onWallChangeHp = function (hp) {
        var _this = this;
        if (hp < 0) {
            this.showInjured();
        }
        /**教程 */
        if (TutorailsManager_1.default.getInstance().is_finish_game == false && this.is_tutorail == false && this.cur_hp <= this.max_hp * 0.2) {
            if (LevelManager_1.LevelManager.getInstance().start_level == 1) {
                //最后一波
                if (TutorailsManager_1.default.getInstance().isShowTutorials(200)) {
                    this.is_tutorail = true;
                    var buffData = new BuffData_1.BuffData();
                    buffData.buff_id = HeroConfig_1.BuffId.Wall_Tutorial_Add_hp;
                    buffData.buff_type = HeroConfig_1.BuffType.Gain;
                    buffData.buff_value = [this.getMaxHp() * 0.05];
                    buffData.remain_time = 10;
                    // buffData.game_effect_id=GameEffectId.chang_mao_shou_skill_active_1;
                    buffData.recovery_jiange_time = 0.2;
                    var buff = WallManager_1.default.getInstance().getMainWall().addBuff(buffData);
                    buff.addDestroyListen(function () {
                        _this.is_tutorail = false;
                    });
                }
            }
        }
        return true;
    };
    MainWall.prototype.showInjured = function () {
        if (this.injured_action) {
            this.injured_action.stop();
        }
        this.node_injured.opacity = 255;
        this.injured_action = cc.tween(this.node_injured).to(0.5, { opacity: 0 }).start();
    };
    MainWall.prototype.hideInjured = function () {
        if (this.injured_action) {
            this.injured_action.stop();
        }
        cc.tween(this.node_injured).to(0.2, { opacity: 0 }).start();
    };
    MainWall.prototype.showVertigo = function (dt) {
        this.node_vertigo.active = true;
        if (this.vertigo_action) {
            this.vertigo_action.stop();
        }
        this.node_vertigo.opacity = 255;
        this.vertigo_action = cc.tween(this.node_vertigo).to(dt, { opacity: 0 }).start();
    };
    MainWall.prototype.hideVertigo = function () {
        if (this.vertigo_action) {
            this.vertigo_action.stop();
        }
        cc.tween(this.node_vertigo).to(0.5, { opacity: 0 }).start();
    };
    MainWall.prototype.showWallTeXiao = function () {
        this.pre_wall_stage = this.cur_wall_stage;
        if (this.hp_progress.progress >= 0 && this.hp_progress.progress < 0.25) {
            this.cur_wall_stage = 3;
        }
        else if (this.hp_progress.progress >= 0.25 && this.hp_progress.progress < 0.5) {
            this.cur_wall_stage = 2;
        }
        else if (this.hp_progress.progress >= 0.5 && this.hp_progress.progress < 0.75) {
            this.cur_wall_stage = 1;
        }
        else if (this.hp_progress.progress >= 0.75) {
            this.cur_wall_stage = 0;
        }
        if (this.cur_wall_stage != this.pre_wall_stage) {
            MyTool_1.default.randomSceneShakeSmall();
            ApkManager_1.default.getInstance().beVibrate(300);
            if (this.cur_wall_stage > 0) {
                this.wall_spine0.setAnimation(0, 'Hurt' + this.cur_wall_stage + '_2', true);
                this.wall_spine0.node.active = true;
                if (this.cur_wall_stage > 1) {
                    this.wall_spine1.setAnimation(0, 'Hurt' + this.cur_wall_stage + '_1', true);
                    this.wall_spine1.node.active = true;
                }
                else {
                    this.wall_spine1.node.active = false;
                }
            }
            else {
                this.wall_spine0.node.active = false;
            }
        }
    };
    MainWall.prototype.resetWallTeXiao = function () {
        this.pre_wall_stage = this.cur_wall_stage = 0;
        if (this.wall_spine0) {
            this.wall_spine0.node.active = false;
        }
        if (this.wall_spine1) {
            this.wall_spine1.node.active = false;
        }
    };
    MainWall = __decorate([
        ccclass
    ], MainWall);
    return MainWall;
}(Wall_1.default));
exports.default = MainWall;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcV2FsbFxcTWFpbldhbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0RBQTJDO0FBQzNDLDBDQUFnRDtBQUNoRCwwREFBcUQ7QUFDckQsOENBQXlDO0FBQ3pDLDBDQUFxQztBQUdyQyxzREFBNkY7QUFDN0Ysc0RBQXFEO0FBQ3JELGtFQUE2RDtBQUM3RCw2REFBd0Q7QUFDeEQsK0JBQTBCO0FBQzFCLDZDQUF3QztBQUN4QywyQ0FBd0M7QUFFeEMsMkRBQXNEO0FBQ3RELGtEQUFpRDtBQUNqRCw0REFBeUQ7QUFHbkQsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBc0MsNEJBQUk7SUFBMUM7UUFBQSxxRUFrTUM7UUFoTUcsV0FBVztRQUNYLGlCQUFXLEdBQWdCLElBQUksQ0FBQztRQUNoQyxXQUFXO1FBQ1gsaUJBQVcsR0FBZ0IsSUFBSSxDQUFDO1FBRWhDLFVBQVU7UUFDVixlQUFTLEdBQWdCLElBQUksQ0FBQztRQUM5QixhQUFhO1FBQ2Isb0JBQWMsR0FBVyxDQUFDLENBQUM7UUFDM0IsY0FBYztRQUNkLG9CQUFjLEdBQVcsQ0FBQyxDQUFDO1FBQzNCLFNBQVM7UUFDVCxrQkFBWSxHQUFZLElBQUksQ0FBQztRQUM3QixvQkFBYyxHQUFhLElBQUksQ0FBQztRQUNoQyxrQkFBWSxHQUFZLElBQUksQ0FBQztRQUM3QixvQkFBYyxHQUFhLElBQUksQ0FBQztRQXlDaEMsYUFBTyxHQUFXLENBQUMsQ0FBQztRQUNwQixZQUFNLEdBQVcsR0FBRyxDQUFDOztJQXVJekIsQ0FBQztJQS9LRyx5QkFBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFD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SUFBSSxDQUFDLGNBQWMsR0FBRyxDQUFDLEVBQUU7b0JBQ3pCLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxNQUFNLEdBQUcsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBQzVFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7aUJBQ3ZDO3FCQUFNO29CQUNILElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7aUJBQ3hDO2FBQ0o7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQzthQUN4QztTQUNKO0lBQ0wsQ0FBQztJQUVELGtDQUFlLEdBQWY7UUFDSSxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDO1FBQzlDLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNsQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1NBQ3hDO1FBQ0QsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7U0FDeEM7SUFFTCxDQUFDO0lBaE1nQixRQUFRO1FBRDVCLE9BQU87T0FDYSxRQUFRLENBa001QjtJQUFELGVBQUM7Q0FsTUQsQUFrTUMsQ0FsTXFDLGNBQUksR0FrTXpDO2tCQWxNb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBcGtNYW5hZ2VyIGZyb20gXCIuLi9BZHMvQXBrTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBHYW1lU3RhdGUsIEppYVN1IH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgSHBQcm9ncmVzc0JhciBmcm9tIFwiLi4vTW9uc3Rlci9IcFByb2dyZXNzQmFyXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IE15VG9vbCBmcm9tIFwiLi4vVG9vbHMvTXlUb29sXCI7XHJcbmltcG9ydCBJbW11bml0eVNoaWVsZCBmcm9tIFwiLi9JbW11bml0eVNoaWVsZFwiO1xyXG5pbXBvcnQgU2hpZWxkIGZyb20gXCIuL1NoaWVsZFwiO1xyXG5pbXBvcnQgeyBCdWZmSWQsIEJ1ZmZUeXBlLCBIZXJvX1N0YXRlLCBIZXJvX1R5cGUsIFNraWxsVHlwZSB9IGZyb20gXCIuLi9IZXJvL0dhbWUvSGVyb0NvbmZpZ1wiO1xyXG5pbXBvcnQgeyBMZXZlbE1hbmFnZXIgfSBmcm9tIFwiLi4vTGV2ZWwvTGV2ZWxNYW5hZ2VyXCI7XHJcbmltcG9ydCBUdXRvcmFpbHNNYW5hZ2VyIGZyb20gXCIuLi9UdXRvcmlhbHMvVHV0b3JhaWxzTWFuYWdlclwiO1xyXG5pbXBvcnQgQnVmZlN0YXRlTWFuYWdlciBmcm9tIFwiLi4vR2FtZS9CdWZmU3RhdGVNYW5hZ2VyXCI7XHJcbmltcG9ydCBXYWxsIGZyb20gXCIuL1dhbGxcIjtcclxuaW1wb3J0IFdhbGxNYW5hZ2VyIGZyb20gXCIuL1dhbGxNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFdhbGxUeXBlIH0gZnJvbSBcIi4vV2FsbENvbmZpZ1wiO1xyXG5pbXBvcnQgeyBHYW1lRWZmZWN0c01hbmFnZXIgfSBmcm9tIFwiLi4vR2FtZS9HYW1lRWZmZWN0c01hbmFnZXJcIjtcclxuaW1wb3J0IEZpZ2h0aW5nTWFuYWdlciBmcm9tIFwiLi4vR2FtZS9GaWdodGluZ01hbmFnZXJcIjtcclxuaW1wb3J0IHsgQnVmZkRhdGEgfSBmcm9tIFwiLi4vSGVyby9HYW1lL0J1ZmZEYXRhXCI7XHJcbmltcG9ydCB7IGluc3RhbmNlIH0gZnJvbSBcIi4uL0dhbWUvVG91Y2hQbGFuZS9Ub3VjaFBsYW5lXCI7XHJcblxyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haW5XYWxsIGV4dGVuZHMgV2FsbCB7XHJcblxyXG4gICAgLyoq5Z+O5aKZMOeJueaViCAqL1xyXG4gICAgd2FsbF9zcGluZTA6IHNwLlNrZWxldG9uID0gbnVsbDtcclxuICAgIC8qKuWfjuWimTHnibnmlYggKi9cclxuICAgIHdhbGxfc3BpbmUxOiBzcC5Ta2VsZXRvbiA9IG51bGw7XHJcblxyXG4gICAgLyoq5oiY6L2m54m55pWIICovXHJcbiAgICBjaGVfc3BpbmU6IHNwLlNrZWxldG9uID0gbnVsbDtcclxuICAgIC8qKuW9k+WJjeWfjuWimeeahOmYtuautSAqL1xyXG4gICAgY3VyX3dhbGxfc3RhZ2U6IG51bWJlciA9IDA7XHJcbiAgICAvKirkuIrkuIDkuKrln47lopnnmoTpmLbmrrUgKi9cclxuICAgIHByZV93YWxsX3N0YWdlOiBudW1iZXIgPSAwO1xyXG4gICAgLyoq5Y+X5Lyk55qEICovXHJcbiAgICBub2RlX2luanVyZWQ6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgaW5qdXJlZF9hY3Rpb246IGNjLlR3ZWVuID0gbnVsbDtcclxuICAgIG5vZGVfdmVydGlnbzogY2MuTm9kZSA9IG51bGw7XHJcbiAgICB2ZXJ0aWdvX2FjdGlvbjogY2MuVHdlZW4gPSBudWxsO1xyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLnNldEhwQ2hhbmdlTGlzdGVuKHRoaXMub25XYWxsQ2hhbmdlSHAuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgdGhpcy5zZXRIcFNob3dMaXN0ZW4odGhpcy5zaG93V2FsbFRlWGlhby5iaW5kKHRoaXMpKTtcclxuICAgICAgICBzdXBlci5zZXRXYWxsRGllTGlzdGVuKHRoaXMub25XYWxsRGllLmJpbmQodGhpcykpO1xyXG4gICAgICAgIGxldCBocFJvb3QgPSBjYy5maW5kKCdDYW52YXMvVWlfUm9vdC9ocF9yb290Jyk7XHJcbiAgICAgICAgdGhpcy5ocF9wcm9ncmVzcyA9IGhwUm9vdC5nZXRDaGlsZEJ5TmFtZSgnaHAnKS5nZXRDb21wb25lbnQoSHBQcm9ncmVzc0Jhcik7XHJcbiAgICAgICAgdGhpcy5zaGllbGRfcHJvZ3Jlc3MgPSBocFJvb3QuZ2V0Q2hpbGRCeU5hbWUoJ3NoaWVsZCcpLmdldENvbXBvbmVudChjYy5Qcm9ncmVzc0Jhcik7XHJcbiAgICAgICAgdGhpcy5ocF90ZXh0ID0gaHBSb290LmdldENoaWxkQnlOYW1lKCdocFRleHQnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIHRoaXMuc2hpZWxkX3RleHQgPSBocFJvb3QuZ2V0Q2hpbGRCeU5hbWUoJ3NoaWVsZFRleHQnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIHRoaXMubWFwX3NoaWVsZF92YWx1ZSA9IG5ldyBNYXA8bnVtYmVyLCBTaGllbGQ+KCk7XHJcbiAgICAgICAgdGhpcy5tYXBfaW1tdW5pdHlfc2hpZWxkX3ZhbHVlID0gbmV3IE1hcDxudW1iZXIsIEltbXVuaXR5U2hpZWxkPigpO1xyXG4gICAgICAgIHRoaXMubm9kZV9pbmp1cmVkID0gaHBSb290LnBhcmVudC5nZXRDaGlsZEJ5TmFtZSgnaW5qdXJlZCcpO1xyXG4gICAgICAgIHRoaXMubm9kZV92ZXJ0aWdvID0gaHBSb290LnBhcmVudC5nZXRDaGlsZEJ5TmFtZSgndmVydGlnbycpO1xyXG4gICAgICAgIHRoaXMud2FsbF9zcGluZTAgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3dhbGwwJykuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcclxuICAgICAgICB0aGlzLndhbGxfc3BpbmUxID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCd3YWxsMScpLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbik7XHJcbiAgICAgICAgdGhpcy5jaGVfc3BpbmU9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdiZzJfd2FsbCBjb3B5JykuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcclxuICAgICAgICB0aGlzLndhbGxfc3BpbmUwLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy53YWxsX3NwaW5lMS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIFdhbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkV2FsbChXYWxsVHlwZS5NYWluLCB0aGlzKTtcclxuICAgICAgICB0aGlzLnNob3dIcCgpO1xyXG4gICAgICAgIHRoaXMuc2hvd1NoaWxkUHJvZ3Jlc3MoKTtcclxuICAgICAgICBpbnN0YW5jZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9NT1ZFLCB0aGlzLm9uVG91Y2hNb3ZlQnlKb3ksIHRoaXMpO1xyXG4gICAgICAgIGluc3RhbmNlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vblRvdWNoRW5kQnlKb3ksIHRoaXMpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICBCdWZmU3RhdGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlQnVmZlJvb3QoY2MudjIodGhpcy5ub2RlLngsIHRoaXMubm9kZS55ICsgMTUwKSwgSGVyb19UeXBlLkhlcm9fTnVtKTtcclxuICAgICAgICB0aGlzLmNoZV9zcGluZS5zZXRBbmltYXRpb24oMCwgJ3dhbGsnLCB0cnVlKTtcclxuICAgICAgICAvL2xldCB3YWxsRG93biA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnd2FsbF9kb3duJyk7XHJcbiAgICAgICAgLy9sZXQgd29ybGRQb3MgPSB3YWxsRG93bi5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKHdhbGxEb3duLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgIC8vbGV0IHBvcyA9IEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIod29ybGRQb3MpO1xyXG4gICAgICAgIC8vIHRoaXMuc2V0V2FsbFJlY3QoY2MucmVjdCh3YWxsRG93bi54LCB3YWxsRG93bi55LCB3YWxsRG93bi53aWR0aCwgd2FsbERvd24uaGVpZ2h0KSk7XHJcbiAgICAgIFxyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIG9uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICBpbnN0YW5jZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfTU9WRSwgdGhpcy5vblRvdWNoTW92ZUJ5Sm95LCB0aGlzKTtcclxuICAgICAgICBpbnN0YW5jZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uVG91Y2hFbmRCeUpveSwgdGhpcyk7XHJcbiAgICB9XHJcbiAgICB0YXJnZXRYOiBudW1iZXIgPSAwO1xyXG4gICAgZWFzaW5nOiBudW1iZXIgPSAwLjU7XHJcbiAgICBvblRvdWNoTW92ZUJ5Sm95KCk6dm9pZHtcclxuICAgICAgICB0aGlzLnRhcmdldFggPSBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFuaVR5cGUgO1xyXG4gICAgfVxyXG4gICAgb25Ub3VjaEVuZEJ5Sm95KGV2ZW50OiBjYy5FdmVudC5FdmVudFRvdWNoLCBkYXRhKSB7XHJcbiAgICAgICAgdGhpcy50YXJnZXRYID0gKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuYW5pVHlwZSAtIDQpICogNzU7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgdXBkYXRlKGR0OiBudW1iZXIpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgaWYgKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfc3RhdGUgIT0gR2FtZVN0YXRlLkdhbWVfUGxheWluZylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGlmKHRoaXMubm9kZSl7XHJcblxyXG4gICAgICAgICAgICBsZXQgdng6IG51bWJlciA9ICh0aGlzLnRhcmdldFggLSB0aGlzLm5vZGUueCkgKiB0aGlzLmVhc2luZztcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnggKz0gdng7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNldFdhbGxSZWN0KGNjLnJlY3QoIHRoaXMubm9kZS54LXRoaXMubm9kZS53aWR0aC8yLCAgdGhpcy5ub2RlLnktdGhpcy5ub2RlLmhlaWdodC8yLCAgdGhpcy5ub2RlLndpZHRoLCAgdGhpcy5ub2RlLmhlaWdodCkpO1xyXG4gICAgICAgICAgICBsZXQgZ2dwID0gRmlnaHRpbmdNYW5hZ2VyLmdldEluc3RhbmNlKCkubm9kZS5nZXRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgICAgICBnZ3AucmVjdCh0aGlzLmdldFdhbGxSZWN0KCkueCwgdGhpcy5nZXRXYWxsUmVjdCgpLnksIHRoaXMuZ2V0V2FsbFJlY3QoKS53aWR0aCwgdGhpcy5nZXRXYWxsUmVjdCgpLmhlaWdodCk7XHJcblxyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgXHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICAgXHJcbiAgICB9XHJcbiAgICBvbldhbGxEaWUoKSB7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5vbldhbGxEaWUoKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydE5leHRMZXZlbCgpIHtcclxuICAgICAgICB0aGlzLnJlc2V0V2FsbFRlWGlhbygpO1xyXG4gICAgICAgIHRoaXMuaXNfdHV0b3JhaWwgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogKi9cclxuICAgIHB1YmxpYyBvbldhbGxDaGFuZ2VIcChocDogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKGhwIDwgMCkge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dJbmp1cmVkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKuaVmeeoiyAqL1xyXG4gICAgICAgIGlmIChUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNfZmluaXNoX2dhbWUgPT0gZmFsc2UgJiYgdGhpcy5pc190dXRvcmFpbCA9PSBmYWxzZSAmJiB0aGlzLmN1cl9ocCA8PSB0aGlzLm1heF9ocCAqIDAuMikge1xyXG4gICAgICAgICAgICBpZiAoTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc3RhcnRfbGV2ZWwgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgLy/mnIDlkI7kuIDms6JcclxuICAgICAgICAgICAgICAgIGlmIChUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNTaG93VHV0b3JpYWxzKDIwMCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzX3R1dG9yYWlsID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYnVmZkRhdGEgPSBuZXcgQnVmZkRhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5idWZmX2lkID0gQnVmZklkLldhbGxfVHV0b3JpYWxfQWRkX2hwO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLmJ1ZmZfdHlwZSA9IEJ1ZmZUeXBlLkdhaW47XHJcbiAgICAgICAgICAgICAgICAgICAgYnVmZkRhdGEuYnVmZl92YWx1ZSA9IFt0aGlzLmdldE1heEhwKCkgKiAwLjA1XTtcclxuICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5yZW1haW5fdGltZSA9IDEwO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGJ1ZmZEYXRhLmdhbWVfZWZmZWN0X2lkPUdhbWVFZmZlY3RJZC5jaGFuZ19tYW9fc2hvdV9za2lsbF9hY3RpdmVfMTtcclxuICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5yZWNvdmVyeV9qaWFuZ2VfdGltZSA9IDAuMjtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYnVmZiA9IFdhbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWFpbldhbGwoKS5hZGRCdWZmKGJ1ZmZEYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICBidWZmLmFkZERlc3Ryb3lMaXN0ZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzX3R1dG9yYWlsID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0luanVyZWQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaW5qdXJlZF9hY3Rpb24pIHtcclxuICAgICAgICAgICAgdGhpcy5pbmp1cmVkX2FjdGlvbi5zdG9wKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubm9kZV9pbmp1cmVkLm9wYWNpdHkgPSAyNTU7XHJcbiAgICAgICAgdGhpcy5pbmp1cmVkX2FjdGlvbiA9IGNjLnR3ZWVuKHRoaXMubm9kZV9pbmp1cmVkKS50bygwLjUsIHsgb3BhY2l0eTogMCB9KS5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGhpZGVJbmp1cmVkKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmluanVyZWRfYWN0aW9uKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5qdXJlZF9hY3Rpb24uc3RvcCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYy50d2Vlbih0aGlzLm5vZGVfaW5qdXJlZCkudG8oMC4yLCB7IG9wYWNpdHk6IDAgfSkuc3RhcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93VmVydGlnbyhkdDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlX3ZlcnRpZ28uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBpZiAodGhpcy52ZXJ0aWdvX2FjdGlvbikge1xyXG4gICAgICAgICAgICB0aGlzLnZlcnRpZ29fYWN0aW9uLnN0b3AoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5ub2RlX3ZlcnRpZ28ub3BhY2l0eSA9IDI1NTtcclxuICAgICAgICB0aGlzLnZlcnRpZ29fYWN0aW9uID0gY2MudHdlZW4odGhpcy5ub2RlX3ZlcnRpZ28pLnRvKGR0LCB7IG9wYWNpdHk6IDAgfSkuc3RhcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBoaWRlVmVydGlnbygpIHtcclxuICAgICAgICBpZiAodGhpcy52ZXJ0aWdvX2FjdGlvbikge1xyXG4gICAgICAgICAgICB0aGlzLnZlcnRpZ29fYWN0aW9uLnN0b3AoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2MudHdlZW4odGhpcy5ub2RlX3ZlcnRpZ28pLnRvKDAuNSwgeyBvcGFjaXR5OiAwIH0pLnN0YXJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1dhbGxUZVhpYW8oKSB7XHJcbiAgICAgICAgdGhpcy5wcmVfd2FsbF9zdGFnZSA9IHRoaXMuY3VyX3dhbGxfc3RhZ2U7XHJcbiAgICAgICAgaWYgKHRoaXMuaHBfcHJvZ3Jlc3MucHJvZ3Jlc3MgPj0gMCAmJiB0aGlzLmhwX3Byb2dyZXNzLnByb2dyZXNzIDwgMC4yNSkge1xyXG4gICAgICAgICAgICB0aGlzLmN1cl93YWxsX3N0YWdlID0gMztcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaHBfcHJvZ3Jlc3MucHJvZ3Jlc3MgPj0gMC4yNSAmJiB0aGlzLmhwX3Byb2dyZXNzLnByb2dyZXNzIDwgMC41KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VyX3dhbGxfc3RhZ2UgPSAyO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5ocF9wcm9ncmVzcy5wcm9ncmVzcyA+PSAwLjUgJiYgdGhpcy5ocF9wcm9ncmVzcy5wcm9ncmVzcyA8IDAuNzUpIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJfd2FsbF9zdGFnZSA9IDE7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmhwX3Byb2dyZXNzLnByb2dyZXNzID49IDAuNzUpIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJfd2FsbF9zdGFnZSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmN1cl93YWxsX3N0YWdlICE9IHRoaXMucHJlX3dhbGxfc3RhZ2UpIHtcclxuICAgICAgICAgICAgTXlUb29sLnJhbmRvbVNjZW5lU2hha2VTbWFsbCgpO1xyXG4gICAgICAgICAgICBBcGtNYW5hZ2VyLmdldEluc3RhbmNlKCkuYmVWaWJyYXRlKDMwMCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmN1cl93YWxsX3N0YWdlID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy53YWxsX3NwaW5lMC5zZXRBbmltYXRpb24oMCwgJ0h1cnQnICsgdGhpcy5jdXJfd2FsbF9zdGFnZSArICdfMicsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy53YWxsX3NwaW5lMC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jdXJfd2FsbF9zdGFnZSA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndhbGxfc3BpbmUxLnNldEFuaW1hdGlvbigwLCAnSHVydCcgKyB0aGlzLmN1cl93YWxsX3N0YWdlICsgJ18xJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53YWxsX3NwaW5lMS5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2FsbF9zcGluZTEubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMud2FsbF9zcGluZTAubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXNldFdhbGxUZVhpYW8oKSB7XHJcbiAgICAgICAgdGhpcy5wcmVfd2FsbF9zdGFnZSA9IHRoaXMuY3VyX3dhbGxfc3RhZ2UgPSAwO1xyXG4gICAgICAgIGlmICh0aGlzLndhbGxfc3BpbmUwKSB7XHJcbiAgICAgICAgICAgIHRoaXMud2FsbF9zcGluZTAubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMud2FsbF9zcGluZTEpIHtcclxuICAgICAgICAgICAgdGhpcy53YWxsX3NwaW5lMS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==