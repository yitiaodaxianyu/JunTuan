
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
        _this.hpBar = null;
        _this.hpTxt = null;
        _this.caibao = null;
        _this.targetX = 0;
        _this.easing = 0.5;
        return _this;
    }
    MainWall.prototype.onLoad = function () {
        this.setHpChangeListen(this.onWallChangeHp.bind(this));
        this.setHpShowListen(this.showWallTeXiao.bind(this));
        _super.prototype.setWallDieListen.call(this, this.onWallDie.bind(this));
        var hpRoot = cc.find('Canvas/Ui_Root/hp_root');
        hpRoot.active = false;
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
    MainWall.prototype.showHp = function () {
        _super.prototype.showHp.call(this);
        this.hpBar.fillRange = 0.5 * this.cur_hp / this.max_hp;
        this.hpTxt.string = Math.floor(this.cur_hp) + '/' + this.max_hp;
        ;
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
    __decorate([
        property(cc.Sprite)
    ], MainWall.prototype, "hpBar", void 0);
    __decorate([
        property(cc.Label)
    ], MainWall.prototype, "hpTxt", void 0);
    __decorate([
        property(sp.Skeleton)
    ], MainWall.prototype, "caibao", void 0);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcV2FsbFxcTWFpbldhbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0RBQTJDO0FBQzNDLDBDQUFnRDtBQUNoRCwwREFBcUQ7QUFDckQsOENBQXlDO0FBQ3pDLDBDQUFxQztBQUdyQyxzREFBNkY7QUFDN0Ysc0RBQXFEO0FBQ3JELGtFQUE2RDtBQUM3RCw2REFBd0Q7QUFDeEQsK0JBQTBCO0FBQzFCLDZDQUF3QztBQUN4QywyQ0FBd0M7QUFFeEMsMkRBQXNEO0FBQ3RELGtEQUFpRDtBQUNqRCw0REFBeUQ7QUFHbkQsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBc0MsNEJBQUk7SUFBMUM7UUFBQSxxRUFpTkM7UUEvTUcsV0FBVztRQUNYLGlCQUFXLEdBQWdCLElBQUksQ0FBQztRQUNoQyxXQUFXO1FBQ1gsaUJBQVcsR0FBZ0IsSUFBSSxDQUFDO1FBRWhDLFVBQVU7UUFDVixlQUFTLEdBQWdCLElBQUksQ0FBQztRQUM5QixhQUFhO1FBQ2Isb0JBQWMsR0FBVyxDQUFDLENBQUM7UUFDM0IsY0FBYztRQUNkLG9CQUFjLEdBQVcsQ0FBQyxDQUFDO1FBQzNCLFNBQVM7UUFDVCxrQkFBWSxHQUFZLElBQUksQ0FBQztRQUM3QixvQkFBYyxHQUFhLElBQUksQ0FBQztRQUNoQyxrQkFBWSxHQUFZLElBQUksQ0FBQztRQUM3QixvQkFBYyxHQUFhLElBQUksQ0FBQztRQUdoQyxXQUFLLEdBQWMsSUFBSSxDQUFDO1FBR3hCLFdBQUssR0FBYSxJQUFJLENBQUM7UUFHdkIsWUFBTSxHQUFnQixJQUFJLENBQUM7UUErQzNCLGFBQU8sR0FBVyxDQUFDLENBQUM7UUFDcEIsWUFBTSxHQUFXLEdBQUcsQ0FBQzs7SUF1SXpCLENBQUM7SUFyTEcseUJBQU0sR0FBTjtRQUNJLElBQUksQ0FB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SSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7U0FDeEM7SUFFTCxDQUFDO0lBM0xEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7MkNBQ0k7SUFHeEI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzsyQ0FDSTtJQUd2QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDOzRDQUNLO0lBMUJWLFFBQVE7UUFENUIsT0FBTztPQUNhLFFBQVEsQ0FpTjVCO0lBQUQsZUFBQztDQWpORCxBQWlOQyxDQWpOcUMsY0FBSSxHQWlOekM7a0JBak5vQixRQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFwa01hbmFnZXIgZnJvbSBcIi4uL0Fkcy9BcGtNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEdhbWVTdGF0ZSwgSmlhU3UgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBIcFByb2dyZXNzQmFyIGZyb20gXCIuLi9Nb25zdGVyL0hwUHJvZ3Jlc3NCYXJcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgTXlUb29sIGZyb20gXCIuLi9Ub29scy9NeVRvb2xcIjtcclxuaW1wb3J0IEltbXVuaXR5U2hpZWxkIGZyb20gXCIuL0ltbXVuaXR5U2hpZWxkXCI7XHJcbmltcG9ydCBTaGllbGQgZnJvbSBcIi4vU2hpZWxkXCI7XHJcbmltcG9ydCB7IEJ1ZmZJZCwgQnVmZlR5cGUsIEhlcm9fU3RhdGUsIEhlcm9fVHlwZSwgU2tpbGxUeXBlIH0gZnJvbSBcIi4uL0hlcm8vR2FtZS9IZXJvQ29uZmlnXCI7XHJcbmltcG9ydCB7IExldmVsTWFuYWdlciB9IGZyb20gXCIuLi9MZXZlbC9MZXZlbE1hbmFnZXJcIjtcclxuaW1wb3J0IFR1dG9yYWlsc01hbmFnZXIgZnJvbSBcIi4uL1R1dG9yaWFscy9UdXRvcmFpbHNNYW5hZ2VyXCI7XHJcbmltcG9ydCBCdWZmU3RhdGVNYW5hZ2VyIGZyb20gXCIuLi9HYW1lL0J1ZmZTdGF0ZU1hbmFnZXJcIjtcclxuaW1wb3J0IFdhbGwgZnJvbSBcIi4vV2FsbFwiO1xyXG5pbXBvcnQgV2FsbE1hbmFnZXIgZnJvbSBcIi4vV2FsbE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgV2FsbFR5cGUgfSBmcm9tIFwiLi9XYWxsQ29uZmlnXCI7XHJcbmltcG9ydCB7IEdhbWVFZmZlY3RzTWFuYWdlciB9IGZyb20gXCIuLi9HYW1lL0dhbWVFZmZlY3RzTWFuYWdlclwiO1xyXG5pbXBvcnQgRmlnaHRpbmdNYW5hZ2VyIGZyb20gXCIuLi9HYW1lL0ZpZ2h0aW5nTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBCdWZmRGF0YSB9IGZyb20gXCIuLi9IZXJvL0dhbWUvQnVmZkRhdGFcIjtcclxuaW1wb3J0IHsgaW5zdGFuY2UgfSBmcm9tIFwiLi4vR2FtZS9Ub3VjaFBsYW5lL1RvdWNoUGxhbmVcIjtcclxuXHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFpbldhbGwgZXh0ZW5kcyBXYWxsIHtcclxuXHJcbiAgICAvKirln47lopkw54m55pWIICovXHJcbiAgICB3YWxsX3NwaW5lMDogc3AuU2tlbGV0b24gPSBudWxsO1xyXG4gICAgLyoq5Z+O5aKZMeeJueaViCAqL1xyXG4gICAgd2FsbF9zcGluZTE6IHNwLlNrZWxldG9uID0gbnVsbDtcclxuXHJcbiAgICAvKirmiJjovabnibnmlYggKi9cclxuICAgIGNoZV9zcGluZTogc3AuU2tlbGV0b24gPSBudWxsO1xyXG4gICAgLyoq5b2T5YmN5Z+O5aKZ55qE6Zi25q61ICovXHJcbiAgICBjdXJfd2FsbF9zdGFnZTogbnVtYmVyID0gMDtcclxuICAgIC8qKuS4iuS4gOS4quWfjuWimeeahOmYtuautSAqL1xyXG4gICAgcHJlX3dhbGxfc3RhZ2U6IG51bWJlciA9IDA7XHJcbiAgICAvKirlj5fkvKTnmoQgKi9cclxuICAgIG5vZGVfaW5qdXJlZDogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBpbmp1cmVkX2FjdGlvbjogY2MuVHdlZW4gPSBudWxsO1xyXG4gICAgbm9kZV92ZXJ0aWdvOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIHZlcnRpZ29fYWN0aW9uOiBjYy5Ud2VlbiA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcclxuICAgIGhwQmFyOiBjYy5TcHJpdGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIGhwVHh0OiBjYy5MYWJlbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KHNwLlNrZWxldG9uKVxyXG4gICAgY2FpYmFvOiBzcC5Ta2VsZXRvbiA9IG51bGw7XHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMuc2V0SHBDaGFuZ2VMaXN0ZW4odGhpcy5vbldhbGxDaGFuZ2VIcC5iaW5kKHRoaXMpKTtcclxuICAgICAgICB0aGlzLnNldEhwU2hvd0xpc3Rlbih0aGlzLnNob3dXYWxsVGVYaWFvLmJpbmQodGhpcykpO1xyXG4gICAgICAgIHN1cGVyLnNldFdhbGxEaWVMaXN0ZW4odGhpcy5vbldhbGxEaWUuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgbGV0IGhwUm9vdCA9IGNjLmZpbmQoJ0NhbnZhcy9VaV9Sb290L2hwX3Jvb3QnKTtcclxuICAgICAgICBocFJvb3QuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5ocF9wcm9ncmVzcyA9IGhwUm9vdC5nZXRDaGlsZEJ5TmFtZSgnaHAnKS5nZXRDb21wb25lbnQoSHBQcm9ncmVzc0Jhcik7XHJcbiAgICAgICAgdGhpcy5zaGllbGRfcHJvZ3Jlc3MgPSBocFJvb3QuZ2V0Q2hpbGRCeU5hbWUoJ3NoaWVsZCcpLmdldENvbXBvbmVudChjYy5Qcm9ncmVzc0Jhcik7XHJcbiAgICAgICAgdGhpcy5ocF90ZXh0ID0gaHBSb290LmdldENoaWxkQnlOYW1lKCdocFRleHQnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIHRoaXMuc2hpZWxkX3RleHQgPSBocFJvb3QuZ2V0Q2hpbGRCeU5hbWUoJ3NoaWVsZFRleHQnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIHRoaXMubWFwX3NoaWVsZF92YWx1ZSA9IG5ldyBNYXA8bnVtYmVyLCBTaGllbGQ+KCk7XHJcbiAgICAgICAgdGhpcy5tYXBfaW1tdW5pdHlfc2hpZWxkX3ZhbHVlID0gbmV3IE1hcDxudW1iZXIsIEltbXVuaXR5U2hpZWxkPigpO1xyXG4gICAgICAgIHRoaXMubm9kZV9pbmp1cmVkID0gaHBSb290LnBhcmVudC5nZXRDaGlsZEJ5TmFtZSgnaW5qdXJlZCcpO1xyXG4gICAgICAgIHRoaXMubm9kZV92ZXJ0aWdvID0gaHBSb290LnBhcmVudC5nZXRDaGlsZEJ5TmFtZSgndmVydGlnbycpO1xyXG4gICAgICAgIHRoaXMud2FsbF9zcGluZTAgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3dhbGwwJykuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcclxuICAgICAgICB0aGlzLndhbGxfc3BpbmUxID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCd3YWxsMScpLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbik7XHJcbiAgICAgICAgdGhpcy5jaGVfc3BpbmUgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2JnMl93YWxsIGNvcHknKS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pO1xyXG4gICAgICAgIHRoaXMud2FsbF9zcGluZTAubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLndhbGxfc3BpbmUxLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgV2FsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRXYWxsKFdhbGxUeXBlLk1haW4sIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuc2hvd0hwKCk7XHJcbiAgICAgICAgdGhpcy5zaG93U2hpbGRQcm9ncmVzcygpO1xyXG4gICAgICAgIGluc3RhbmNlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX01PVkUsIHRoaXMub25Ub3VjaE1vdmVCeUpveSwgdGhpcyk7XHJcbiAgICAgICAgaW5zdGFuY2Uub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uVG91Y2hFbmRCeUpveSwgdGhpcyk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG4gICAgICAgIEJ1ZmZTdGF0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVCdWZmUm9vdChjYy52Mih0aGlzLm5vZGUueCwgdGhpcy5ub2RlLnkgKyAxNTApLCBIZXJvX1R5cGUuSGVyb19OdW0pO1xyXG4gICAgICAgIHRoaXMuY2hlX3NwaW5lLnNldEFuaW1hdGlvbigwLCAnd2FsaycsIHRydWUpO1xyXG4gICAgICAgIC8vbGV0IHdhbGxEb3duID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCd3YWxsX2Rvd24nKTtcclxuICAgICAgICAvL2xldCB3b3JsZFBvcyA9IHdhbGxEb3duLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIod2FsbERvd24uZ2V0UG9zaXRpb24oKSk7XHJcbiAgICAgICAgLy9sZXQgcG9zID0gR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUih3b3JsZFBvcyk7XHJcbiAgICAgICAgLy8gdGhpcy5zZXRXYWxsUmVjdChjYy5yZWN0KHdhbGxEb3duLngsIHdhbGxEb3duLnksIHdhbGxEb3duLndpZHRoLCB3YWxsRG93bi5oZWlnaHQpKTtcclxuXHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgb25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgICAgIGluc3RhbmNlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9NT1ZFLCB0aGlzLm9uVG91Y2hNb3ZlQnlKb3ksIHRoaXMpO1xyXG4gICAgICAgIGluc3RhbmNlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMub25Ub3VjaEVuZEJ5Sm95LCB0aGlzKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBzaG93SHAoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIuc2hvd0hwKCk7XHJcbiAgICAgICAgdGhpcy5ocEJhci5maWxsUmFuZ2UgPSAwLjUgKiB0aGlzLmN1cl9ocCAvIHRoaXMubWF4X2hwO1xyXG4gICAgICAgIHRoaXMuaHBUeHQuc3RyaW5nPU1hdGguZmxvb3IodGhpcy5jdXJfaHApKycvJyt0aGlzLm1heF9ocDs7XHJcbiAgICB9XHJcbiAgICB0YXJnZXRYOiBudW1iZXIgPSAwO1xyXG4gICAgZWFzaW5nOiBudW1iZXIgPSAwLjU7XHJcbiAgICBvblRvdWNoTW92ZUJ5Sm95KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudGFyZ2V0WCA9IEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuYW5pVHlwZTtcclxuICAgIH1cclxuICAgIG9uVG91Y2hFbmRCeUpveShldmVudDogY2MuRXZlbnQuRXZlbnRUb3VjaCwgZGF0YSkge1xyXG4gICAgICAgIHRoaXMudGFyZ2V0WCA9IChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFuaVR5cGUgLSA0KSAqIDc1O1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIHVwZGF0ZShkdDogbnVtYmVyKTogdm9pZCB7XHJcblxyXG4gICAgICAgIGlmIChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX3N0YXRlICE9IEdhbWVTdGF0ZS5HYW1lX1BsYXlpbmcpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBpZiAodGhpcy5ub2RlKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdng6IG51bWJlciA9ICh0aGlzLnRhcmdldFggLSB0aGlzLm5vZGUueCkgKiB0aGlzLmVhc2luZztcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnggKz0gdng7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNldFdhbGxSZWN0KGNjLnJlY3QodGhpcy5ub2RlLnggLSB0aGlzLm5vZGUud2lkdGggLyAyLCB0aGlzLm5vZGUueSAtIHRoaXMubm9kZS5oZWlnaHQgLyAyLCB0aGlzLm5vZGUud2lkdGgsIHRoaXMubm9kZS5oZWlnaHQpKTtcclxuICAgICAgICAgICAgbGV0IGdncCA9IEZpZ2h0aW5nTWFuYWdlci5nZXRJbnN0YW5jZSgpLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICAgICAgZ2dwLnJlY3QodGhpcy5nZXRXYWxsUmVjdCgpLngsIHRoaXMuZ2V0V2FsbFJlY3QoKS55LCB0aGlzLmdldFdhbGxSZWN0KCkud2lkdGgsIHRoaXMuZ2V0V2FsbFJlY3QoKS5oZWlnaHQpO1xyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuICAgIG9uV2FsbERpZSgpIHtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLm9uV2FsbERpZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0TmV4dExldmVsKCkge1xyXG4gICAgICAgIHRoaXMucmVzZXRXYWxsVGVYaWFvKCk7XHJcbiAgICAgICAgdGhpcy5pc190dXRvcmFpbCA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiAqL1xyXG4gICAgcHVibGljIG9uV2FsbENoYW5nZUhwKGhwOiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoaHAgPCAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0luanVyZWQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoq5pWZ56iLICovXHJcbiAgICAgICAgaWYgKFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc19maW5pc2hfZ2FtZSA9PSBmYWxzZSAmJiB0aGlzLmlzX3R1dG9yYWlsID09IGZhbHNlICYmIHRoaXMuY3VyX2hwIDw9IHRoaXMubWF4X2hwICogMC4yKSB7XHJcbiAgICAgICAgICAgIGlmIChMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydF9sZXZlbCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAvL+acgOWQjuS4gOazolxyXG4gICAgICAgICAgICAgICAgaWYgKFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc1Nob3dUdXRvcmlhbHMoMjAwKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNfdHV0b3JhaWwgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBidWZmRGF0YSA9IG5ldyBCdWZmRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLmJ1ZmZfaWQgPSBCdWZmSWQuV2FsbF9UdXRvcmlhbF9BZGRfaHA7XHJcbiAgICAgICAgICAgICAgICAgICAgYnVmZkRhdGEuYnVmZl90eXBlID0gQnVmZlR5cGUuR2FpbjtcclxuICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5idWZmX3ZhbHVlID0gW3RoaXMuZ2V0TWF4SHAoKSAqIDAuMDVdO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLnJlbWFpbl90aW1lID0gMTA7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gYnVmZkRhdGEuZ2FtZV9lZmZlY3RfaWQ9R2FtZUVmZmVjdElkLmNoYW5nX21hb19zaG91X3NraWxsX2FjdGl2ZV8xO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLnJlY292ZXJ5X2ppYW5nZV90aW1lID0gMC4yO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBidWZmID0gV2FsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYWluV2FsbCgpLmFkZEJ1ZmYoYnVmZkRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmYuYWRkRGVzdHJveUxpc3RlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNfdHV0b3JhaWwgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93SW5qdXJlZCgpIHtcclxuICAgICAgICBpZiAodGhpcy5pbmp1cmVkX2FjdGlvbikge1xyXG4gICAgICAgICAgICB0aGlzLmluanVyZWRfYWN0aW9uLnN0b3AoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5ub2RlX2luanVyZWQub3BhY2l0eSA9IDI1NTtcclxuICAgICAgICB0aGlzLmluanVyZWRfYWN0aW9uID0gY2MudHdlZW4odGhpcy5ub2RlX2luanVyZWQpLnRvKDAuNSwgeyBvcGFjaXR5OiAwIH0pLnN0YXJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaGlkZUluanVyZWQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaW5qdXJlZF9hY3Rpb24pIHtcclxuICAgICAgICAgICAgdGhpcy5pbmp1cmVkX2FjdGlvbi5zdG9wKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNjLnR3ZWVuKHRoaXMubm9kZV9pbmp1cmVkKS50bygwLjIsIHsgb3BhY2l0eTogMCB9KS5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dWZXJ0aWdvKGR0OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLm5vZGVfdmVydGlnby5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGlmICh0aGlzLnZlcnRpZ29fYWN0aW9uKSB7XHJcbiAgICAgICAgICAgIHRoaXMudmVydGlnb19hY3Rpb24uc3RvcCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5vZGVfdmVydGlnby5vcGFjaXR5ID0gMjU1O1xyXG4gICAgICAgIHRoaXMudmVydGlnb19hY3Rpb24gPSBjYy50d2Vlbih0aGlzLm5vZGVfdmVydGlnbykudG8oZHQsIHsgb3BhY2l0eTogMCB9KS5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGhpZGVWZXJ0aWdvKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnZlcnRpZ29fYWN0aW9uKSB7XHJcbiAgICAgICAgICAgIHRoaXMudmVydGlnb19hY3Rpb24uc3RvcCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYy50d2Vlbih0aGlzLm5vZGVfdmVydGlnbykudG8oMC41LCB7IG9wYWNpdHk6IDAgfSkuc3RhcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93V2FsbFRlWGlhbygpIHtcclxuICAgICAgICB0aGlzLnByZV93YWxsX3N0YWdlID0gdGhpcy5jdXJfd2FsbF9zdGFnZTtcclxuICAgICAgICBpZiAodGhpcy5ocF9wcm9ncmVzcy5wcm9ncmVzcyA+PSAwICYmIHRoaXMuaHBfcHJvZ3Jlc3MucHJvZ3Jlc3MgPCAwLjI1KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VyX3dhbGxfc3RhZ2UgPSAzO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5ocF9wcm9ncmVzcy5wcm9ncmVzcyA+PSAwLjI1ICYmIHRoaXMuaHBfcHJvZ3Jlc3MucHJvZ3Jlc3MgPCAwLjUpIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJfd2FsbF9zdGFnZSA9IDI7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmhwX3Byb2dyZXNzLnByb2dyZXNzID49IDAuNSAmJiB0aGlzLmhwX3Byb2dyZXNzLnByb2dyZXNzIDwgMC43NSkge1xyXG4gICAgICAgICAgICB0aGlzLmN1cl93YWxsX3N0YWdlID0gMTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaHBfcHJvZ3Jlc3MucHJvZ3Jlc3MgPj0gMC43NSkge1xyXG4gICAgICAgICAgICB0aGlzLmN1cl93YWxsX3N0YWdlID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuY3VyX3dhbGxfc3RhZ2UgIT0gdGhpcy5wcmVfd2FsbF9zdGFnZSkge1xyXG4gICAgICAgICAgICBNeVRvb2wucmFuZG9tU2NlbmVTaGFrZVNtYWxsKCk7XHJcbiAgICAgICAgICAgIEFwa01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5iZVZpYnJhdGUoMzAwKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY3VyX3dhbGxfc3RhZ2UgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndhbGxfc3BpbmUwLnNldEFuaW1hdGlvbigwLCAnSHVydCcgKyB0aGlzLmN1cl93YWxsX3N0YWdlICsgJ18yJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndhbGxfc3BpbmUwLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1cl93YWxsX3N0YWdlID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2FsbF9zcGluZTEuc2V0QW5pbWF0aW9uKDAsICdIdXJ0JyArIHRoaXMuY3VyX3dhbGxfc3RhZ2UgKyAnXzEnLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndhbGxfc3BpbmUxLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53YWxsX3NwaW5lMS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy53YWxsX3NwaW5lMC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlc2V0V2FsbFRlWGlhbygpIHtcclxuICAgICAgICB0aGlzLnByZV93YWxsX3N0YWdlID0gdGhpcy5jdXJfd2FsbF9zdGFnZSA9IDA7XHJcbiAgICAgICAgaWYgKHRoaXMud2FsbF9zcGluZTApIHtcclxuICAgICAgICAgICAgdGhpcy53YWxsX3NwaW5lMC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy53YWxsX3NwaW5lMSkge1xyXG4gICAgICAgICAgICB0aGlzLndhbGxfc3BpbmUxLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn1cclxuIl19