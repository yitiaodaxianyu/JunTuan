
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
        this.wall_spine0.node.active = false;
        this.wall_spine1.node.active = false;
        WallManager_1.default.getInstance().addWall(WallConfig_1.WallType.Main, this);
        this.showHp();
        this.showShildProgress();
        TouchPlane_1.instance.on(cc.Node.EventType.TOUCH_END, this.onTouchEndByJoy, this);
    };
    MainWall.prototype.start = function () {
        BuffStateManager_1.default.getInstance().createBuffRoot(cc.v2(this.node.x, this.node.y + 150), HeroConfig_1.Hero_Type.Hero_Num);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcV2FsbFxcTWFpbldhbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0RBQTJDO0FBQzNDLDBDQUFnRDtBQUNoRCwwREFBcUQ7QUFDckQsOENBQXlDO0FBQ3pDLDBDQUFxQztBQUdyQyxzREFBNkY7QUFDN0Ysc0RBQXFEO0FBQ3JELGtFQUE2RDtBQUM3RCw2REFBd0Q7QUFDeEQsK0JBQTBCO0FBQzFCLDZDQUF3QztBQUN4QywyQ0FBd0M7QUFFeEMsMkRBQXNEO0FBQ3RELGtEQUFpRDtBQUNqRCw0REFBeUQ7QUFHbkQsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBc0MsNEJBQUk7SUFBMUM7UUFBQSxxRUF3TEM7UUF0TEcsV0FBVztRQUNYLGlCQUFXLEdBQWdCLElBQUksQ0FBQztRQUNoQyxXQUFXO1FBQ1gsaUJBQVcsR0FBZ0IsSUFBSSxDQUFDO1FBQ2hDLGFBQWE7UUFDYixvQkFBYyxHQUFXLENBQUMsQ0FBQztRQUMzQixjQUFjO1FBQ2Qsb0JBQWMsR0FBVyxDQUFDLENBQUM7UUFDM0IsU0FBUztRQUNULGtCQUFZLEdBQVksSUFBSSxDQUFDO1FBQzdCLG9CQUFjLEdBQWEsSUFBSSxDQUFDO1FBQ2hDLGtCQUFZLEdBQVksSUFBSSxDQUFDO1FBQzdCLG9CQUFjLEdBQWEsSUFBSSxDQUFDO1FBcUNoQyxhQUFPLEdBQVcsQ0FBQyxDQUFDO1FBQ3BCLFlBQU0sR0FBVyxHQUFHLENBQUM7O0lBb0l6QixDQUFDO0lBeEtHLHlCQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxD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QUN4QztRQUNELElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNsQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1NBQ3hDO0lBRUwsQ0FBQztJQXRMZ0IsUUFBUTtRQUQ1QixPQUFPO09BQ2EsUUFBUSxDQXdMNUI7SUFBRCxlQUFDO0NBeExELEFBd0xDLENBeExxQyxjQUFJLEdBd0x6QztrQkF4TG9CLFFBQVEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQXBrTWFuYWdlciBmcm9tIFwiLi4vQWRzL0Fwa01hbmFnZXJcIjtcclxuaW1wb3J0IHsgR2FtZVN0YXRlLCBKaWFTdSB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IEhwUHJvZ3Jlc3NCYXIgZnJvbSBcIi4uL01vbnN0ZXIvSHBQcm9ncmVzc0JhclwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCBNeVRvb2wgZnJvbSBcIi4uL1Rvb2xzL015VG9vbFwiO1xyXG5pbXBvcnQgSW1tdW5pdHlTaGllbGQgZnJvbSBcIi4vSW1tdW5pdHlTaGllbGRcIjtcclxuaW1wb3J0IFNoaWVsZCBmcm9tIFwiLi9TaGllbGRcIjtcclxuaW1wb3J0IHsgQnVmZklkLCBCdWZmVHlwZSwgSGVyb19TdGF0ZSwgSGVyb19UeXBlLCBTa2lsbFR5cGUgfSBmcm9tIFwiLi4vSGVyby9HYW1lL0hlcm9Db25maWdcIjtcclxuaW1wb3J0IHsgTGV2ZWxNYW5hZ2VyIH0gZnJvbSBcIi4uL0xldmVsL0xldmVsTWFuYWdlclwiO1xyXG5pbXBvcnQgVHV0b3JhaWxzTWFuYWdlciBmcm9tIFwiLi4vVHV0b3JpYWxzL1R1dG9yYWlsc01hbmFnZXJcIjtcclxuaW1wb3J0IEJ1ZmZTdGF0ZU1hbmFnZXIgZnJvbSBcIi4uL0dhbWUvQnVmZlN0YXRlTWFuYWdlclwiO1xyXG5pbXBvcnQgV2FsbCBmcm9tIFwiLi9XYWxsXCI7XHJcbmltcG9ydCBXYWxsTWFuYWdlciBmcm9tIFwiLi9XYWxsTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBXYWxsVHlwZSB9IGZyb20gXCIuL1dhbGxDb25maWdcIjtcclxuaW1wb3J0IHsgR2FtZUVmZmVjdHNNYW5hZ2VyIH0gZnJvbSBcIi4uL0dhbWUvR2FtZUVmZmVjdHNNYW5hZ2VyXCI7XHJcbmltcG9ydCBGaWdodGluZ01hbmFnZXIgZnJvbSBcIi4uL0dhbWUvRmlnaHRpbmdNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEJ1ZmZEYXRhIH0gZnJvbSBcIi4uL0hlcm8vR2FtZS9CdWZmRGF0YVwiO1xyXG5pbXBvcnQgeyBpbnN0YW5jZSB9IGZyb20gXCIuLi9HYW1lL1RvdWNoUGxhbmUvVG91Y2hQbGFuZVwiO1xyXG5cclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYWluV2FsbCBleHRlbmRzIFdhbGwge1xyXG5cclxuICAgIC8qKuWfjuWimTDnibnmlYggKi9cclxuICAgIHdhbGxfc3BpbmUwOiBzcC5Ta2VsZXRvbiA9IG51bGw7XHJcbiAgICAvKirln47lopkx54m55pWIICovXHJcbiAgICB3YWxsX3NwaW5lMTogc3AuU2tlbGV0b24gPSBudWxsO1xyXG4gICAgLyoq5b2T5YmN5Z+O5aKZ55qE6Zi25q61ICovXHJcbiAgICBjdXJfd2FsbF9zdGFnZTogbnVtYmVyID0gMDtcclxuICAgIC8qKuS4iuS4gOS4quWfjuWimeeahOmYtuautSAqL1xyXG4gICAgcHJlX3dhbGxfc3RhZ2U6IG51bWJlciA9IDA7XHJcbiAgICAvKirlj5fkvKTnmoQgKi9cclxuICAgIG5vZGVfaW5qdXJlZDogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBpbmp1cmVkX2FjdGlvbjogY2MuVHdlZW4gPSBudWxsO1xyXG4gICAgbm9kZV92ZXJ0aWdvOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIHZlcnRpZ29fYWN0aW9uOiBjYy5Ud2VlbiA9IG51bGw7XHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMuc2V0SHBDaGFuZ2VMaXN0ZW4odGhpcy5vbldhbGxDaGFuZ2VIcC5iaW5kKHRoaXMpKTtcclxuICAgICAgICB0aGlzLnNldEhwU2hvd0xpc3Rlbih0aGlzLnNob3dXYWxsVGVYaWFvLmJpbmQodGhpcykpO1xyXG4gICAgICAgIHN1cGVyLnNldFdhbGxEaWVMaXN0ZW4odGhpcy5vbldhbGxEaWUuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgbGV0IGhwUm9vdCA9IGNjLmZpbmQoJ0NhbnZhcy9VaV9Sb290L2hwX3Jvb3QnKTtcclxuICAgICAgICB0aGlzLmhwX3Byb2dyZXNzID0gaHBSb290LmdldENoaWxkQnlOYW1lKCdocCcpLmdldENvbXBvbmVudChIcFByb2dyZXNzQmFyKTtcclxuICAgICAgICB0aGlzLnNoaWVsZF9wcm9ncmVzcyA9IGhwUm9vdC5nZXRDaGlsZEJ5TmFtZSgnc2hpZWxkJykuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKTtcclxuICAgICAgICB0aGlzLmhwX3RleHQgPSBocFJvb3QuZ2V0Q2hpbGRCeU5hbWUoJ2hwVGV4dCcpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy5zaGllbGRfdGV4dCA9IGhwUm9vdC5nZXRDaGlsZEJ5TmFtZSgnc2hpZWxkVGV4dCcpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy5tYXBfc2hpZWxkX3ZhbHVlID0gbmV3IE1hcDxudW1iZXIsIFNoaWVsZD4oKTtcclxuICAgICAgICB0aGlzLm1hcF9pbW11bml0eV9zaGllbGRfdmFsdWUgPSBuZXcgTWFwPG51bWJlciwgSW1tdW5pdHlTaGllbGQ+KCk7XHJcbiAgICAgICAgdGhpcy5ub2RlX2luanVyZWQgPSBocFJvb3QucGFyZW50LmdldENoaWxkQnlOYW1lKCdpbmp1cmVkJyk7XHJcbiAgICAgICAgdGhpcy5ub2RlX3ZlcnRpZ28gPSBocFJvb3QucGFyZW50LmdldENoaWxkQnlOYW1lKCd2ZXJ0aWdvJyk7XHJcbiAgICAgICAgdGhpcy53YWxsX3NwaW5lMCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnd2FsbDAnKS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pO1xyXG4gICAgICAgIHRoaXMud2FsbF9zcGluZTEgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3dhbGwxJykuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcclxuICAgICAgICB0aGlzLndhbGxfc3BpbmUwLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy53YWxsX3NwaW5lMS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIFdhbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkV2FsbChXYWxsVHlwZS5NYWluLCB0aGlzKTtcclxuICAgICAgICB0aGlzLnNob3dIcCgpO1xyXG4gICAgICAgIHRoaXMuc2hvd1NoaWxkUHJvZ3Jlc3MoKTtcclxuICAgICAgICBpbnN0YW5jZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMub25Ub3VjaEVuZEJ5Sm95LCB0aGlzKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnQoKSB7XHJcbiAgICAgICAgQnVmZlN0YXRlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUJ1ZmZSb290KGNjLnYyKHRoaXMubm9kZS54LCB0aGlzLm5vZGUueSArIDE1MCksIEhlcm9fVHlwZS5IZXJvX051bSk7XHJcbiAgICAgICAgLy9sZXQgd2FsbERvd24gPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3dhbGxfZG93bicpO1xyXG4gICAgICAgIC8vbGV0IHdvcmxkUG9zID0gd2FsbERvd24ucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUih3YWxsRG93bi5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICAvL2xldCBwb3MgPSBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKHdvcmxkUG9zKTtcclxuICAgICAgICAvLyB0aGlzLnNldFdhbGxSZWN0KGNjLnJlY3Qod2FsbERvd24ueCwgd2FsbERvd24ueSwgd2FsbERvd24ud2lkdGgsIHdhbGxEb3duLmhlaWdodCkpO1xyXG4gICAgICBcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBvbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgaW5zdGFuY2Uub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vblRvdWNoRW5kQnlKb3ksIHRoaXMpO1xyXG4gICAgfVxyXG4gICAgdGFyZ2V0WDogbnVtYmVyID0gMDtcclxuICAgIGVhc2luZzogbnVtYmVyID0gMC4xO1xyXG4gICAgb25Ub3VjaEVuZEJ5Sm95KGV2ZW50OiBjYy5FdmVudC5FdmVudFRvdWNoLCBkYXRhKSB7XHJcbiAgICAgICAgdGhpcy50YXJnZXRYID0gKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuYW5pVHlwZSAtIDQpICogNzU7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgdXBkYXRlKGR0OiBudW1iZXIpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgaWYgKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfc3RhdGUgIT0gR2FtZVN0YXRlLkdhbWVfUGxheWluZylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGlmKHRoaXMubm9kZSl7XHJcblxyXG4gICAgICAgICAgICBsZXQgdng6IG51bWJlciA9ICh0aGlzLnRhcmdldFggLSB0aGlzLm5vZGUueCkgKiB0aGlzLmVhc2luZztcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnggKz0gdng7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNldFdhbGxSZWN0KGNjLnJlY3QoIHRoaXMubm9kZS54LXRoaXMubm9kZS53aWR0aC8yLCAgdGhpcy5ub2RlLnktdGhpcy5ub2RlLmhlaWdodC8yLCAgdGhpcy5ub2RlLndpZHRoLCAgdGhpcy5ub2RlLmhlaWdodCkpO1xyXG4gICAgICAgICAgICBsZXQgZ2dwID0gRmlnaHRpbmdNYW5hZ2VyLmdldEluc3RhbmNlKCkubm9kZS5nZXRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgICAgICAgICBnZ3AucmVjdCh0aGlzLmdldFdhbGxSZWN0KCkueCwgdGhpcy5nZXRXYWxsUmVjdCgpLnksIHRoaXMuZ2V0V2FsbFJlY3QoKS53aWR0aCwgdGhpcy5nZXRXYWxsUmVjdCgpLmhlaWdodCk7XHJcblxyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgXHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICAgXHJcbiAgICB9XHJcbiAgICBvbldhbGxEaWUoKSB7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5vbldhbGxEaWUoKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydE5leHRMZXZlbCgpIHtcclxuICAgICAgICB0aGlzLnJlc2V0V2FsbFRlWGlhbygpO1xyXG4gICAgICAgIHRoaXMuaXNfdHV0b3JhaWwgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogKi9cclxuICAgIHB1YmxpYyBvbldhbGxDaGFuZ2VIcChocDogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKGhwIDwgMCkge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dJbmp1cmVkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKuaVmeeoiyAqL1xyXG4gICAgICAgIGlmIChUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNfZmluaXNoX2dhbWUgPT0gZmFsc2UgJiYgdGhpcy5pc190dXRvcmFpbCA9PSBmYWxzZSAmJiB0aGlzLmN1cl9ocCA8PSB0aGlzLm1heF9ocCAqIDAuMikge1xyXG4gICAgICAgICAgICBpZiAoTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc3RhcnRfbGV2ZWwgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgLy/mnIDlkI7kuIDms6JcclxuICAgICAgICAgICAgICAgIGlmIChUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNTaG93VHV0b3JpYWxzKDIwMCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzX3R1dG9yYWlsID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYnVmZkRhdGEgPSBuZXcgQnVmZkRhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5idWZmX2lkID0gQnVmZklkLldhbGxfVHV0b3JpYWxfQWRkX2hwO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLmJ1ZmZfdHlwZSA9IEJ1ZmZUeXBlLkdhaW47XHJcbiAgICAgICAgICAgICAgICAgICAgYnVmZkRhdGEuYnVmZl92YWx1ZSA9IFt0aGlzLmdldE1heEhwKCkgKiAwLjA1XTtcclxuICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5yZW1haW5fdGltZSA9IDEwO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGJ1ZmZEYXRhLmdhbWVfZWZmZWN0X2lkPUdhbWVFZmZlY3RJZC5jaGFuZ19tYW9fc2hvdV9za2lsbF9hY3RpdmVfMTtcclxuICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5yZWNvdmVyeV9qaWFuZ2VfdGltZSA9IDAuMjtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYnVmZiA9IFdhbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWFpbldhbGwoKS5hZGRCdWZmKGJ1ZmZEYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICBidWZmLmFkZERlc3Ryb3lMaXN0ZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzX3R1dG9yYWlsID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0luanVyZWQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaW5qdXJlZF9hY3Rpb24pIHtcclxuICAgICAgICAgICAgdGhpcy5pbmp1cmVkX2FjdGlvbi5zdG9wKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubm9kZV9pbmp1cmVkLm9wYWNpdHkgPSAyNTU7XHJcbiAgICAgICAgdGhpcy5pbmp1cmVkX2FjdGlvbiA9IGNjLnR3ZWVuKHRoaXMubm9kZV9pbmp1cmVkKS50bygwLjUsIHsgb3BhY2l0eTogMCB9KS5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGhpZGVJbmp1cmVkKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmluanVyZWRfYWN0aW9uKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5qdXJlZF9hY3Rpb24uc3RvcCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYy50d2Vlbih0aGlzLm5vZGVfaW5qdXJlZCkudG8oMC4yLCB7IG9wYWNpdHk6IDAgfSkuc3RhcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93VmVydGlnbyhkdDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlX3ZlcnRpZ28uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBpZiAodGhpcy52ZXJ0aWdvX2FjdGlvbikge1xyXG4gICAgICAgICAgICB0aGlzLnZlcnRpZ29fYWN0aW9uLnN0b3AoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5ub2RlX3ZlcnRpZ28ub3BhY2l0eSA9IDI1NTtcclxuICAgICAgICB0aGlzLnZlcnRpZ29fYWN0aW9uID0gY2MudHdlZW4odGhpcy5ub2RlX3ZlcnRpZ28pLnRvKGR0LCB7IG9wYWNpdHk6IDAgfSkuc3RhcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBoaWRlVmVydGlnbygpIHtcclxuICAgICAgICBpZiAodGhpcy52ZXJ0aWdvX2FjdGlvbikge1xyXG4gICAgICAgICAgICB0aGlzLnZlcnRpZ29fYWN0aW9uLnN0b3AoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2MudHdlZW4odGhpcy5ub2RlX3ZlcnRpZ28pLnRvKDAuNSwgeyBvcGFjaXR5OiAwIH0pLnN0YXJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1dhbGxUZVhpYW8oKSB7XHJcbiAgICAgICAgdGhpcy5wcmVfd2FsbF9zdGFnZSA9IHRoaXMuY3VyX3dhbGxfc3RhZ2U7XHJcbiAgICAgICAgaWYgKHRoaXMuaHBfcHJvZ3Jlc3MucHJvZ3Jlc3MgPj0gMCAmJiB0aGlzLmhwX3Byb2dyZXNzLnByb2dyZXNzIDwgMC4yNSkge1xyXG4gICAgICAgICAgICB0aGlzLmN1cl93YWxsX3N0YWdlID0gMztcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaHBfcHJvZ3Jlc3MucHJvZ3Jlc3MgPj0gMC4yNSAmJiB0aGlzLmhwX3Byb2dyZXNzLnByb2dyZXNzIDwgMC41KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VyX3dhbGxfc3RhZ2UgPSAyO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5ocF9wcm9ncmVzcy5wcm9ncmVzcyA+PSAwLjUgJiYgdGhpcy5ocF9wcm9ncmVzcy5wcm9ncmVzcyA8IDAuNzUpIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJfd2FsbF9zdGFnZSA9IDE7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmhwX3Byb2dyZXNzLnByb2dyZXNzID49IDAuNzUpIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJfd2FsbF9zdGFnZSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmN1cl93YWxsX3N0YWdlICE9IHRoaXMucHJlX3dhbGxfc3RhZ2UpIHtcclxuICAgICAgICAgICAgTXlUb29sLnJhbmRvbVNjZW5lU2hha2VTbWFsbCgpO1xyXG4gICAgICAgICAgICBBcGtNYW5hZ2VyLmdldEluc3RhbmNlKCkuYmVWaWJyYXRlKDMwMCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmN1cl93YWxsX3N0YWdlID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy53YWxsX3NwaW5lMC5zZXRBbmltYXRpb24oMCwgJ0h1cnQnICsgdGhpcy5jdXJfd2FsbF9zdGFnZSArICdfMicsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy53YWxsX3NwaW5lMC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jdXJfd2FsbF9zdGFnZSA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndhbGxfc3BpbmUxLnNldEFuaW1hdGlvbigwLCAnSHVydCcgKyB0aGlzLmN1cl93YWxsX3N0YWdlICsgJ18xJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53YWxsX3NwaW5lMS5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2FsbF9zcGluZTEubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMud2FsbF9zcGluZTAubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXNldFdhbGxUZVhpYW8oKSB7XHJcbiAgICAgICAgdGhpcy5wcmVfd2FsbF9zdGFnZSA9IHRoaXMuY3VyX3dhbGxfc3RhZ2UgPSAwO1xyXG4gICAgICAgIGlmICh0aGlzLndhbGxfc3BpbmUwKSB7XHJcbiAgICAgICAgICAgIHRoaXMud2FsbF9zcGluZTAubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMud2FsbF9zcGluZTEpIHtcclxuICAgICAgICAgICAgdGhpcy53YWxsX3NwaW5lMS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==