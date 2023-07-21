
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
        _this.easing = 0.1;
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
        TouchPlane_1.instance.off(cc.Node.EventType.TOUCH_END, this.onTouchEndByJoy, this);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcV2FsbFxcTWFpbldhbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0RBQTJDO0FBQzNDLDBDQUFnRDtBQUNoRCwwREFBcUQ7QUFDckQsOENBQXlDO0FBQ3pDLDBDQUFxQztBQUdyQyxzREFBNkY7QUFDN0Ysc0RBQXFEO0FBQ3JELGtFQUE2RDtBQUM3RCw2REFBd0Q7QUFDeEQsK0JBQTBCO0FBQzFCLDZDQUF3QztBQUN4QywyQ0FBd0M7QUFFeEMsMkRBQXNEO0FBQ3RELGtEQUFpRDtBQUNqRCw0REFBeUQ7QUFHbkQsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBc0MsNEJBQUk7SUFBMUM7UUFBQSxxRUE2TEM7UUEzTEcsV0FBVztRQUNYLGlCQUFXLEdBQWdCLElBQUksQ0FBQztRQUNoQyxXQUFXO1FBQ1gsaUJBQVcsR0FBZ0IsSUFBSSxDQUFDO1FBRWhDLFVBQVU7UUFDVixlQUFTLEdBQWdCLElBQUksQ0FBQztRQUM5QixhQUFhO1FBQ2Isb0JBQWMsR0FBVyxDQUFDLENBQUM7UUFDM0IsY0FBYztRQUNkLG9CQUFjLEdBQVcsQ0FBQyxDQUFDO1FBQzNCLFNBQVM7UUFDVCxrQkFBWSxHQUFZLElBQUksQ0FBQztRQUM3QixvQkFBYyxHQUFhLElBQUksQ0FBQztRQUNoQyxrQkFBWSxHQUFZLElBQUksQ0FBQztRQUM3QixvQkFBYyxHQUFhLElBQUksQ0FBQztRQXVDaEMsYUFBTyxHQUFXLENBQUMsQ0FBQztRQUNwQixZQUFNLEdBQVcsR0FBRyxDQUFDOztJQW9JekIsQ0FBQztJQTFLRyx5QkFBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFD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QUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2FBQ3hDO1NBQ0o7SUFDTCxDQUFDO0lBRUQsa0NBQWUsR0FBZjtRQUNJLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGNBQWMsR0FBRyxDQUFDLENBQUM7UUFDOUMsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7U0FDeEM7UUFDRCxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDbEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztTQUN4QztJQUVMLENBQUM7SUEzTGdCLFFBQVE7UUFENUIsT0FBTztPQUNhLFFBQVEsQ0E2TDVCO0lBQUQsZUFBQztDQTdMRCxBQTZMQyxDQTdMcUMsY0FBSSxHQTZMekM7a0JBN0xvQixRQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFwa01hbmFnZXIgZnJvbSBcIi4uL0Fkcy9BcGtNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEdhbWVTdGF0ZSwgSmlhU3UgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBIcFByb2dyZXNzQmFyIGZyb20gXCIuLi9Nb25zdGVyL0hwUHJvZ3Jlc3NCYXJcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgTXlUb29sIGZyb20gXCIuLi9Ub29scy9NeVRvb2xcIjtcclxuaW1wb3J0IEltbXVuaXR5U2hpZWxkIGZyb20gXCIuL0ltbXVuaXR5U2hpZWxkXCI7XHJcbmltcG9ydCBTaGllbGQgZnJvbSBcIi4vU2hpZWxkXCI7XHJcbmltcG9ydCB7IEJ1ZmZJZCwgQnVmZlR5cGUsIEhlcm9fU3RhdGUsIEhlcm9fVHlwZSwgU2tpbGxUeXBlIH0gZnJvbSBcIi4uL0hlcm8vR2FtZS9IZXJvQ29uZmlnXCI7XHJcbmltcG9ydCB7IExldmVsTWFuYWdlciB9IGZyb20gXCIuLi9MZXZlbC9MZXZlbE1hbmFnZXJcIjtcclxuaW1wb3J0IFR1dG9yYWlsc01hbmFnZXIgZnJvbSBcIi4uL1R1dG9yaWFscy9UdXRvcmFpbHNNYW5hZ2VyXCI7XHJcbmltcG9ydCBCdWZmU3RhdGVNYW5hZ2VyIGZyb20gXCIuLi9HYW1lL0J1ZmZTdGF0ZU1hbmFnZXJcIjtcclxuaW1wb3J0IFdhbGwgZnJvbSBcIi4vV2FsbFwiO1xyXG5pbXBvcnQgV2FsbE1hbmFnZXIgZnJvbSBcIi4vV2FsbE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgV2FsbFR5cGUgfSBmcm9tIFwiLi9XYWxsQ29uZmlnXCI7XHJcbmltcG9ydCB7IEdhbWVFZmZlY3RzTWFuYWdlciB9IGZyb20gXCIuLi9HYW1lL0dhbWVFZmZlY3RzTWFuYWdlclwiO1xyXG5pbXBvcnQgRmlnaHRpbmdNYW5hZ2VyIGZyb20gXCIuLi9HYW1lL0ZpZ2h0aW5nTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBCdWZmRGF0YSB9IGZyb20gXCIuLi9IZXJvL0dhbWUvQnVmZkRhdGFcIjtcclxuaW1wb3J0IHsgaW5zdGFuY2UgfSBmcm9tIFwiLi4vR2FtZS9Ub3VjaFBsYW5lL1RvdWNoUGxhbmVcIjtcclxuXHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFpbldhbGwgZXh0ZW5kcyBXYWxsIHtcclxuXHJcbiAgICAvKirln47lopkw54m55pWIICovXHJcbiAgICB3YWxsX3NwaW5lMDogc3AuU2tlbGV0b24gPSBudWxsO1xyXG4gICAgLyoq5Z+O5aKZMeeJueaViCAqL1xyXG4gICAgd2FsbF9zcGluZTE6IHNwLlNrZWxldG9uID0gbnVsbDtcclxuXHJcbiAgICAvKirmiJjovabnibnmlYggKi9cclxuICAgIGNoZV9zcGluZTogc3AuU2tlbGV0b24gPSBudWxsO1xyXG4gICAgLyoq5b2T5YmN5Z+O5aKZ55qE6Zi25q61ICovXHJcbiAgICBjdXJfd2FsbF9zdGFnZTogbnVtYmVyID0gMDtcclxuICAgIC8qKuS4iuS4gOS4quWfjuWimeeahOmYtuautSAqL1xyXG4gICAgcHJlX3dhbGxfc3RhZ2U6IG51bWJlciA9IDA7XHJcbiAgICAvKirlj5fkvKTnmoQgKi9cclxuICAgIG5vZGVfaW5qdXJlZDogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBpbmp1cmVkX2FjdGlvbjogY2MuVHdlZW4gPSBudWxsO1xyXG4gICAgbm9kZV92ZXJ0aWdvOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIHZlcnRpZ29fYWN0aW9uOiBjYy5Ud2VlbiA9IG51bGw7XHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMuc2V0SHBDaGFuZ2VMaXN0ZW4odGhpcy5vbldhbGxDaGFuZ2VIcC5iaW5kKHRoaXMpKTtcclxuICAgICAgICB0aGlzLnNldEhwU2hvd0xpc3Rlbih0aGlzLnNob3dXYWxsVGVYaWFvLmJpbmQodGhpcykpO1xyXG4gICAgICAgIHN1cGVyLnNldFdhbGxEaWVMaXN0ZW4odGhpcy5vbldhbGxEaWUuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgbGV0IGhwUm9vdCA9IGNjLmZpbmQoJ0NhbnZhcy9VaV9Sb290L2hwX3Jvb3QnKTtcclxuICAgICAgICB0aGlzLmhwX3Byb2dyZXNzID0gaHBSb290LmdldENoaWxkQnlOYW1lKCdocCcpLmdldENvbXBvbmVudChIcFByb2dyZXNzQmFyKTtcclxuICAgICAgICB0aGlzLnNoaWVsZF9wcm9ncmVzcyA9IGhwUm9vdC5nZXRDaGlsZEJ5TmFtZSgnc2hpZWxkJykuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKTtcclxuICAgICAgICB0aGlzLmhwX3RleHQgPSBocFJvb3QuZ2V0Q2hpbGRCeU5hbWUoJ2hwVGV4dCcpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy5zaGllbGRfdGV4dCA9IGhwUm9vdC5nZXRDaGlsZEJ5TmFtZSgnc2hpZWxkVGV4dCcpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy5tYXBfc2hpZWxkX3ZhbHVlID0gbmV3IE1hcDxudW1iZXIsIFNoaWVsZD4oKTtcclxuICAgICAgICB0aGlzLm1hcF9pbW11bml0eV9zaGllbGRfdmFsdWUgPSBuZXcgTWFwPG51bWJlciwgSW1tdW5pdHlTaGllbGQ+KCk7XHJcbiAgICAgICAgdGhpcy5ub2RlX2luanVyZWQgPSBocFJvb3QucGFyZW50LmdldENoaWxkQnlOYW1lKCdpbmp1cmVkJyk7XHJcbiAgICAgICAgdGhpcy5ub2RlX3ZlcnRpZ28gPSBocFJvb3QucGFyZW50LmdldENoaWxkQnlOYW1lKCd2ZXJ0aWdvJyk7XHJcbiAgICAgICAgdGhpcy53YWxsX3NwaW5lMCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnd2FsbDAnKS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pO1xyXG4gICAgICAgIHRoaXMud2FsbF9zcGluZTEgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3dhbGwxJykuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcclxuICAgICAgICB0aGlzLmNoZV9zcGluZT10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2JnMl93YWxsIGNvcHknKS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pO1xyXG4gICAgICAgIHRoaXMud2FsbF9zcGluZTAubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLndhbGxfc3BpbmUxLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgV2FsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRXYWxsKFdhbGxUeXBlLk1haW4sIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuc2hvd0hwKCk7XHJcbiAgICAgICAgdGhpcy5zaG93U2hpbGRQcm9ncmVzcygpO1xyXG4gICAgICAgIGluc3RhbmNlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vblRvdWNoRW5kQnlKb3ksIHRoaXMpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICBCdWZmU3RhdGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlQnVmZlJvb3QoY2MudjIodGhpcy5ub2RlLngsIHRoaXMubm9kZS55ICsgMTUwKSwgSGVyb19UeXBlLkhlcm9fTnVtKTtcclxuICAgICAgICB0aGlzLmNoZV9zcGluZS5zZXRBbmltYXRpb24oMCwgJ3dhbGsnLCB0cnVlKTtcclxuICAgICAgICAvL2xldCB3YWxsRG93biA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnd2FsbF9kb3duJyk7XHJcbiAgICAgICAgLy9sZXQgd29ybGRQb3MgPSB3YWxsRG93bi5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKHdhbGxEb3duLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgIC8vbGV0IHBvcyA9IEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIod29ybGRQb3MpO1xyXG4gICAgICAgIC8vIHRoaXMuc2V0V2FsbFJlY3QoY2MucmVjdCh3YWxsRG93bi54LCB3YWxsRG93bi55LCB3YWxsRG93bi53aWR0aCwgd2FsbERvd24uaGVpZ2h0KSk7XHJcbiAgICAgIFxyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIG9uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICBpbnN0YW5jZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uVG91Y2hFbmRCeUpveSwgdGhpcyk7XHJcbiAgICB9XHJcbiAgICB0YXJnZXRYOiBudW1iZXIgPSAwO1xyXG4gICAgZWFzaW5nOiBudW1iZXIgPSAwLjE7XHJcbiAgICBvblRvdWNoRW5kQnlKb3koZXZlbnQ6IGNjLkV2ZW50LkV2ZW50VG91Y2gsIGRhdGEpIHtcclxuICAgICAgICB0aGlzLnRhcmdldFggPSAoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hbmlUeXBlIC0gNCkgKiA3NTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCB1cGRhdGUoZHQ6IG51bWJlcik6IHZvaWQge1xyXG5cclxuICAgICAgICBpZiAoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zdGF0ZSAhPSBHYW1lU3RhdGUuR2FtZV9QbGF5aW5nKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgaWYodGhpcy5ub2RlKXtcclxuXHJcbiAgICAgICAgICAgIGxldCB2eDogbnVtYmVyID0gKHRoaXMudGFyZ2V0WCAtIHRoaXMubm9kZS54KSAqIHRoaXMuZWFzaW5nO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUueCArPSB2eDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2V0V2FsbFJlY3QoY2MucmVjdCggdGhpcy5ub2RlLngtdGhpcy5ub2RlLndpZHRoLzIsICB0aGlzLm5vZGUueS10aGlzLm5vZGUuaGVpZ2h0LzIsICB0aGlzLm5vZGUud2lkdGgsICB0aGlzLm5vZGUuaGVpZ2h0KSk7XHJcbiAgICAgICAgICAgIGxldCBnZ3AgPSBGaWdodGluZ01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5ub2RlLmdldENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgICAgIGdncC5yZWN0KHRoaXMuZ2V0V2FsbFJlY3QoKS54LCB0aGlzLmdldFdhbGxSZWN0KCkueSwgdGhpcy5nZXRXYWxsUmVjdCgpLndpZHRoLCB0aGlzLmdldFdhbGxSZWN0KCkuaGVpZ2h0KTtcclxuXHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgICBcclxuICAgIH1cclxuICAgIG9uV2FsbERpZSgpIHtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLm9uV2FsbERpZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0TmV4dExldmVsKCkge1xyXG4gICAgICAgIHRoaXMucmVzZXRXYWxsVGVYaWFvKCk7XHJcbiAgICAgICAgdGhpcy5pc190dXRvcmFpbCA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiAqL1xyXG4gICAgcHVibGljIG9uV2FsbENoYW5nZUhwKGhwOiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoaHAgPCAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0luanVyZWQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoq5pWZ56iLICovXHJcbiAgICAgICAgaWYgKFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc19maW5pc2hfZ2FtZSA9PSBmYWxzZSAmJiB0aGlzLmlzX3R1dG9yYWlsID09IGZhbHNlICYmIHRoaXMuY3VyX2hwIDw9IHRoaXMubWF4X2hwICogMC4yKSB7XHJcbiAgICAgICAgICAgIGlmIChMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydF9sZXZlbCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAvL+acgOWQjuS4gOazolxyXG4gICAgICAgICAgICAgICAgaWYgKFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc1Nob3dUdXRvcmlhbHMoMjAwKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNfdHV0b3JhaWwgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBidWZmRGF0YSA9IG5ldyBCdWZmRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLmJ1ZmZfaWQgPSBCdWZmSWQuV2FsbF9UdXRvcmlhbF9BZGRfaHA7XHJcbiAgICAgICAgICAgICAgICAgICAgYnVmZkRhdGEuYnVmZl90eXBlID0gQnVmZlR5cGUuR2FpbjtcclxuICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5idWZmX3ZhbHVlID0gW3RoaXMuZ2V0TWF4SHAoKSAqIDAuMDVdO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLnJlbWFpbl90aW1lID0gMTA7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gYnVmZkRhdGEuZ2FtZV9lZmZlY3RfaWQ9R2FtZUVmZmVjdElkLmNoYW5nX21hb19zaG91X3NraWxsX2FjdGl2ZV8xO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLnJlY292ZXJ5X2ppYW5nZV90aW1lID0gMC4yO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBidWZmID0gV2FsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYWluV2FsbCgpLmFkZEJ1ZmYoYnVmZkRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmYuYWRkRGVzdHJveUxpc3RlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNfdHV0b3JhaWwgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93SW5qdXJlZCgpIHtcclxuICAgICAgICBpZiAodGhpcy5pbmp1cmVkX2FjdGlvbikge1xyXG4gICAgICAgICAgICB0aGlzLmluanVyZWRfYWN0aW9uLnN0b3AoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5ub2RlX2luanVyZWQub3BhY2l0eSA9IDI1NTtcclxuICAgICAgICB0aGlzLmluanVyZWRfYWN0aW9uID0gY2MudHdlZW4odGhpcy5ub2RlX2luanVyZWQpLnRvKDAuNSwgeyBvcGFjaXR5OiAwIH0pLnN0YXJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaGlkZUluanVyZWQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaW5qdXJlZF9hY3Rpb24pIHtcclxuICAgICAgICAgICAgdGhpcy5pbmp1cmVkX2FjdGlvbi5zdG9wKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNjLnR3ZWVuKHRoaXMubm9kZV9pbmp1cmVkKS50bygwLjIsIHsgb3BhY2l0eTogMCB9KS5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dWZXJ0aWdvKGR0OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLm5vZGVfdmVydGlnby5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGlmICh0aGlzLnZlcnRpZ29fYWN0aW9uKSB7XHJcbiAgICAgICAgICAgIHRoaXMudmVydGlnb19hY3Rpb24uc3RvcCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5vZGVfdmVydGlnby5vcGFjaXR5ID0gMjU1O1xyXG4gICAgICAgIHRoaXMudmVydGlnb19hY3Rpb24gPSBjYy50d2Vlbih0aGlzLm5vZGVfdmVydGlnbykudG8oZHQsIHsgb3BhY2l0eTogMCB9KS5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGhpZGVWZXJ0aWdvKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnZlcnRpZ29fYWN0aW9uKSB7XHJcbiAgICAgICAgICAgIHRoaXMudmVydGlnb19hY3Rpb24uc3RvcCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYy50d2Vlbih0aGlzLm5vZGVfdmVydGlnbykudG8oMC41LCB7IG9wYWNpdHk6IDAgfSkuc3RhcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93V2FsbFRlWGlhbygpIHtcclxuICAgICAgICB0aGlzLnByZV93YWxsX3N0YWdlID0gdGhpcy5jdXJfd2FsbF9zdGFnZTtcclxuICAgICAgICBpZiAodGhpcy5ocF9wcm9ncmVzcy5wcm9ncmVzcyA+PSAwICYmIHRoaXMuaHBfcHJvZ3Jlc3MucHJvZ3Jlc3MgPCAwLjI1KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VyX3dhbGxfc3RhZ2UgPSAzO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5ocF9wcm9ncmVzcy5wcm9ncmVzcyA+PSAwLjI1ICYmIHRoaXMuaHBfcHJvZ3Jlc3MucHJvZ3Jlc3MgPCAwLjUpIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJfd2FsbF9zdGFnZSA9IDI7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmhwX3Byb2dyZXNzLnByb2dyZXNzID49IDAuNSAmJiB0aGlzLmhwX3Byb2dyZXNzLnByb2dyZXNzIDwgMC43NSkge1xyXG4gICAgICAgICAgICB0aGlzLmN1cl93YWxsX3N0YWdlID0gMTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaHBfcHJvZ3Jlc3MucHJvZ3Jlc3MgPj0gMC43NSkge1xyXG4gICAgICAgICAgICB0aGlzLmN1cl93YWxsX3N0YWdlID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuY3VyX3dhbGxfc3RhZ2UgIT0gdGhpcy5wcmVfd2FsbF9zdGFnZSkge1xyXG4gICAgICAgICAgICBNeVRvb2wucmFuZG9tU2NlbmVTaGFrZVNtYWxsKCk7XHJcbiAgICAgICAgICAgIEFwa01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5iZVZpYnJhdGUoMzAwKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY3VyX3dhbGxfc3RhZ2UgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndhbGxfc3BpbmUwLnNldEFuaW1hdGlvbigwLCAnSHVydCcgKyB0aGlzLmN1cl93YWxsX3N0YWdlICsgJ18yJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndhbGxfc3BpbmUwLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1cl93YWxsX3N0YWdlID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2FsbF9zcGluZTEuc2V0QW5pbWF0aW9uKDAsICdIdXJ0JyArIHRoaXMuY3VyX3dhbGxfc3RhZ2UgKyAnXzEnLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndhbGxfc3BpbmUxLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53YWxsX3NwaW5lMS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy53YWxsX3NwaW5lMC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlc2V0V2FsbFRlWGlhbygpIHtcclxuICAgICAgICB0aGlzLnByZV93YWxsX3N0YWdlID0gdGhpcy5jdXJfd2FsbF9zdGFnZSA9IDA7XHJcbiAgICAgICAgaWYgKHRoaXMud2FsbF9zcGluZTApIHtcclxuICAgICAgICAgICAgdGhpcy53YWxsX3NwaW5lMC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy53YWxsX3NwaW5lMSkge1xyXG4gICAgICAgICAgICB0aGlzLndhbGxfc3BpbmUxLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn1cclxuIl19