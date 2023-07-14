
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
var GameEffectsManager_1 = require("../Game/GameEffectsManager");
var FightingManager_1 = require("../Game/FightingManager");
var BuffData_1 = require("../Hero/Game/BuffData");
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
    };
    MainWall.prototype.start = function () {
        BuffStateManager_1.default.getInstance().createBuffRoot(cc.v2(this.node.x, this.node.y + 150), HeroConfig_1.Hero_Type.Hero_Num);
        var wallDown = this.node.getChildByName('wall_down');
        var worldPos = wallDown.parent.convertToWorldSpaceAR(wallDown.getPosition());
        var pos = GameEffectsManager_1.GameEffectsManager.getInstance().node.convertToNodeSpaceAR(worldPos);
        this.setWallRect(cc.rect(-cc.winSize.width / 2, pos.y - wallDown.height / 2, cc.winSize.width, wallDown.height));
        var ggp = FightingManager_1.default.getInstance().node.getComponent(cc.Graphics);
        ggp.rect(this.getWallRect().x, this.getWallRect().y, this.getWallRect().width, this.getWallRect().height);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcV2FsbFxcTWFpbldhbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0RBQTJDO0FBRTNDLDBEQUFxRDtBQUNyRCw4Q0FBeUM7QUFDekMsMENBQXFDO0FBR3JDLHNEQUFnRjtBQUNoRixzREFBcUQ7QUFDckQsa0VBQTZEO0FBQzdELDZEQUF3RDtBQUN4RCwrQkFBMEI7QUFDMUIsNkNBQXdDO0FBQ3hDLDJDQUF3QztBQUN4QyxpRUFBZ0U7QUFDaEUsMkRBQXNEO0FBQ3RELGtEQUFpRDtBQUczQyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFzQyw0QkFBSTtJQUExQztRQUFBLHFFQW1LQztRQWpLRyxXQUFXO1FBQ1gsaUJBQVcsR0FBYSxJQUFJLENBQUM7UUFDN0IsV0FBVztRQUNYLGlCQUFXLEdBQWEsSUFBSSxDQUFDO1FBQzdCLGFBQWE7UUFDYixvQkFBYyxHQUFRLENBQUMsQ0FBQztRQUN4QixjQUFjO1FBQ2Qsb0JBQWMsR0FBUSxDQUFDLENBQUM7UUFDeEIsU0FBUztRQUNULGtCQUFZLEdBQVMsSUFBSSxDQUFDO1FBQzFCLG9CQUFjLEdBQVUsSUFBSSxDQUFDO1FBQzdCLGtCQUFZLEdBQVMsSUFBSSxDQUFDO1FBQzFCLG9CQUFjLEdBQVUsSUFBSSxDQUFDOztJQXFKakMsQ0FBQztJQW5KRyx5QkFBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3JELGlCQUFNLGdCQUFnQixZQUFDLElBQUksQ0FBQyxTQUFTLENBQUMs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QUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBQyxLQUFLLENBQUM7aUJBQ3RDO2FBQ0o7aUJBQUk7Z0JBQ0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFDLEtBQUssQ0FBQzthQUN0QztTQUNKO0lBQ0wsQ0FBQztJQUVELGtDQUFlLEdBQWY7UUFDSSxJQUFJLENBQUMsY0FBYyxHQUFDLElBQUksQ0FBQyxjQUFjLEdBQUMsQ0FBQyxDQUFDO1FBQzFDLElBQUcsSUFBSSxDQUFDLFdBQVcsRUFBQztZQUNoQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUMsS0FBSyxDQUFDO1NBQ3RDO1FBQ0QsSUFBRyxJQUFJLENBQUMsV0FBVyxFQUFDO1lBQ2hCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBQyxLQUFLLENBQUM7U0FDdEM7SUFFTCxDQUFDO0lBaktnQixRQUFRO1FBRDVCLE9BQU87T0FDYSxRQUFRLENBbUs1QjtJQUFELGVBQUM7Q0FuS0QsQUFtS0MsQ0FuS3FDLGNBQUksR0FtS3pDO2tCQW5Lb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBcGtNYW5hZ2VyIGZyb20gXCIuLi9BZHMvQXBrTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBKaWFTdSB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IEhwUHJvZ3Jlc3NCYXIgZnJvbSBcIi4uL01vbnN0ZXIvSHBQcm9ncmVzc0JhclwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCBNeVRvb2wgZnJvbSBcIi4uL1Rvb2xzL015VG9vbFwiO1xyXG5pbXBvcnQgSW1tdW5pdHlTaGllbGQgZnJvbSBcIi4vSW1tdW5pdHlTaGllbGRcIjtcclxuaW1wb3J0IFNoaWVsZCBmcm9tIFwiLi9TaGllbGRcIjtcclxuaW1wb3J0IHtCdWZmSWQsIEJ1ZmZUeXBlLCBIZXJvX1R5cGUsIFNraWxsVHlwZSB9IGZyb20gXCIuLi9IZXJvL0dhbWUvSGVyb0NvbmZpZ1wiO1xyXG5pbXBvcnQgeyBMZXZlbE1hbmFnZXIgfSBmcm9tIFwiLi4vTGV2ZWwvTGV2ZWxNYW5hZ2VyXCI7XHJcbmltcG9ydCBUdXRvcmFpbHNNYW5hZ2VyIGZyb20gXCIuLi9UdXRvcmlhbHMvVHV0b3JhaWxzTWFuYWdlclwiO1xyXG5pbXBvcnQgQnVmZlN0YXRlTWFuYWdlciBmcm9tIFwiLi4vR2FtZS9CdWZmU3RhdGVNYW5hZ2VyXCI7XHJcbmltcG9ydCBXYWxsIGZyb20gXCIuL1dhbGxcIjtcclxuaW1wb3J0IFdhbGxNYW5hZ2VyIGZyb20gXCIuL1dhbGxNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFdhbGxUeXBlIH0gZnJvbSBcIi4vV2FsbENvbmZpZ1wiO1xyXG5pbXBvcnQgeyBHYW1lRWZmZWN0c01hbmFnZXIgfSBmcm9tIFwiLi4vR2FtZS9HYW1lRWZmZWN0c01hbmFnZXJcIjtcclxuaW1wb3J0IEZpZ2h0aW5nTWFuYWdlciBmcm9tIFwiLi4vR2FtZS9GaWdodGluZ01hbmFnZXJcIjtcclxuaW1wb3J0IHsgQnVmZkRhdGEgfSBmcm9tIFwiLi4vSGVyby9HYW1lL0J1ZmZEYXRhXCI7XHJcblxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYWluV2FsbCBleHRlbmRzIFdhbGwge1xyXG5cclxuICAgIC8qKuWfjuWimTDnibnmlYggKi9cclxuICAgIHdhbGxfc3BpbmUwOnNwLlNrZWxldG9uPW51bGw7XHJcbiAgICAvKirln47lopkx54m55pWIICovXHJcbiAgICB3YWxsX3NwaW5lMTpzcC5Ta2VsZXRvbj1udWxsO1xyXG4gICAgLyoq5b2T5YmN5Z+O5aKZ55qE6Zi25q61ICovXHJcbiAgICBjdXJfd2FsbF9zdGFnZTpudW1iZXI9MDtcclxuICAgIC8qKuS4iuS4gOS4quWfjuWimeeahOmYtuautSAqL1xyXG4gICAgcHJlX3dhbGxfc3RhZ2U6bnVtYmVyPTA7XHJcbiAgICAvKirlj5fkvKTnmoQgKi9cclxuICAgIG5vZGVfaW5qdXJlZDpjYy5Ob2RlPW51bGw7XHJcbiAgICBpbmp1cmVkX2FjdGlvbjpjYy5Ud2Vlbj1udWxsO1xyXG4gICAgbm9kZV92ZXJ0aWdvOmNjLk5vZGU9bnVsbDtcclxuICAgIHZlcnRpZ29fYWN0aW9uOmNjLlR3ZWVuPW51bGw7XHJcblxyXG4gICAgb25Mb2FkKCl7XHJcbiAgICAgICAgdGhpcy5zZXRIcENoYW5nZUxpc3Rlbih0aGlzLm9uV2FsbENoYW5nZUhwLmJpbmQodGhpcykpO1xyXG4gICAgICAgIHRoaXMuc2V0SHBTaG93TGlzdGVuKHRoaXMuc2hvd1dhbGxUZVhpYW8uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgc3VwZXIuc2V0V2FsbERpZUxpc3Rlbih0aGlzLm9uV2FsbERpZS5iaW5kKHRoaXMpKTtcclxuICAgICAgICBsZXQgaHBSb290PWNjLmZpbmQoJ0NhbnZhcy9VaV9Sb290L2hwX3Jvb3QnKTtcclxuICAgICAgICB0aGlzLmhwX3Byb2dyZXNzPWhwUm9vdC5nZXRDaGlsZEJ5TmFtZSgnaHAnKS5nZXRDb21wb25lbnQoSHBQcm9ncmVzc0Jhcik7XHJcbiAgICAgICAgdGhpcy5zaGllbGRfcHJvZ3Jlc3M9aHBSb290LmdldENoaWxkQnlOYW1lKCdzaGllbGQnKS5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpO1xyXG4gICAgICAgIHRoaXMuaHBfdGV4dD1ocFJvb3QuZ2V0Q2hpbGRCeU5hbWUoJ2hwVGV4dCcpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy5zaGllbGRfdGV4dD1ocFJvb3QuZ2V0Q2hpbGRCeU5hbWUoJ3NoaWVsZFRleHQnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIHRoaXMubWFwX3NoaWVsZF92YWx1ZT1uZXcgTWFwPG51bWJlcixTaGllbGQ+KCk7XHJcbiAgICAgICAgdGhpcy5tYXBfaW1tdW5pdHlfc2hpZWxkX3ZhbHVlPW5ldyBNYXA8bnVtYmVyLEltbXVuaXR5U2hpZWxkPigpO1xyXG4gICAgICAgIHRoaXMubm9kZV9pbmp1cmVkPWhwUm9vdC5wYXJlbnQuZ2V0Q2hpbGRCeU5hbWUoJ2luanVyZWQnKTtcclxuICAgICAgICB0aGlzLm5vZGVfdmVydGlnbz1ocFJvb3QucGFyZW50LmdldENoaWxkQnlOYW1lKCd2ZXJ0aWdvJyk7XHJcbiAgICAgICAgdGhpcy53YWxsX3NwaW5lMD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3dhbGwwJykuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcclxuICAgICAgICB0aGlzLndhbGxfc3BpbmUxPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnd2FsbDEnKS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pO1xyXG4gICAgICAgIHRoaXMud2FsbF9zcGluZTAubm9kZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgdGhpcy53YWxsX3NwaW5lMS5ub2RlLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICBXYWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZFdhbGwoV2FsbFR5cGUuTWFpbix0aGlzKTtcclxuICAgICAgICB0aGlzLnNob3dIcCgpO1xyXG4gICAgICAgIHRoaXMuc2hvd1NoaWxkUHJvZ3Jlc3MoKTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBzdGFydCAoKSB7ICAgICAgICBcclxuICAgICAgICBCdWZmU3RhdGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlQnVmZlJvb3QoY2MudjIodGhpcy5ub2RlLngsdGhpcy5ub2RlLnkrMTUwKSxIZXJvX1R5cGUuSGVyb19OdW0pO1xyXG4gICAgICAgIGxldCB3YWxsRG93bj10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3dhbGxfZG93bicpO1xyXG4gICAgICAgIGxldCB3b3JsZFBvcz13YWxsRG93bi5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKHdhbGxEb3duLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgIGxldCBwb3M9R2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUih3b3JsZFBvcyk7XHJcbiAgICAgICAgdGhpcy5zZXRXYWxsUmVjdChjYy5yZWN0KC1jYy53aW5TaXplLndpZHRoLzIscG9zLnktd2FsbERvd24uaGVpZ2h0LzIsY2Mud2luU2l6ZS53aWR0aCx3YWxsRG93bi5oZWlnaHQpKTtcclxuICAgICAgICBsZXQgZ2dwPUZpZ2h0aW5nTWFuYWdlci5nZXRJbnN0YW5jZSgpLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBnZ3AucmVjdCh0aGlzLmdldFdhbGxSZWN0KCkueCx0aGlzLmdldFdhbGxSZWN0KCkueSx0aGlzLmdldFdhbGxSZWN0KCkud2lkdGgsdGhpcy5nZXRXYWxsUmVjdCgpLmhlaWdodCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25XYWxsRGllKCl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5vbldhbGxEaWUoKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydE5leHRMZXZlbCgpeyAgICAgICAgICAgIFxyXG4gICAgICAgIHRoaXMucmVzZXRXYWxsVGVYaWFvKCk7XHJcbiAgICAgICAgdGhpcy5pc190dXRvcmFpbD1mYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogKi9cclxuICAgIHB1YmxpYyBvbldhbGxDaGFuZ2VIcChocDpudW1iZXIpOmJvb2xlYW5cclxuICAgIHtcclxuICAgICAgICBpZihocDwwKVxyXG4gICAgICAgIHsgICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5zaG93SW5qdXJlZCgpOyAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICAvKirmlZnnqIsgKi9cclxuICAgICAgICBpZihUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNfZmluaXNoX2dhbWU9PWZhbHNlICYmIHRoaXMuaXNfdHV0b3JhaWw9PWZhbHNlICYmIHRoaXMuY3VyX2hwPD10aGlzLm1heF9ocCowLjIpe1xyXG4gICAgICAgICAgICBpZihMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydF9sZXZlbD09MSApe1xyXG4gICAgICAgICAgICAgICAgLy/mnIDlkI7kuIDms6JcclxuICAgICAgICAgICAgICAgIGlmKFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc1Nob3dUdXRvcmlhbHMoMjAwKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc190dXRvcmFpbD10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBidWZmRGF0YT1uZXcgQnVmZkRhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5idWZmX2lkPUJ1ZmZJZC5XYWxsX1R1dG9yaWFsX0FkZF9ocDtcclxuICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5idWZmX3R5cGU9QnVmZlR5cGUuR2FpbjtcclxuICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5idWZmX3ZhbHVlPVt0aGlzLmdldE1heEhwKCkqMC4wNV07XHJcbiAgICAgICAgICAgICAgICAgICAgYnVmZkRhdGEucmVtYWluX3RpbWU9MTA7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gYnVmZkRhdGEuZ2FtZV9lZmZlY3RfaWQ9R2FtZUVmZmVjdElkLmNoYW5nX21hb19zaG91X3NraWxsX2FjdGl2ZV8xO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLnJlY292ZXJ5X2ppYW5nZV90aW1lPTAuMjtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYnVmZj1XYWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1haW5XYWxsKCkuYWRkQnVmZihidWZmRGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnVmZi5hZGREZXN0cm95TGlzdGVuKCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNfdHV0b3JhaWw9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9ICAgIFxyXG5cclxuICAgIHNob3dJbmp1cmVkKCl7XHJcbiAgICAgICAgaWYodGhpcy5pbmp1cmVkX2FjdGlvbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5qdXJlZF9hY3Rpb24uc3RvcCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5vZGVfaW5qdXJlZC5vcGFjaXR5PTI1NTtcclxuICAgICAgICB0aGlzLmluanVyZWRfYWN0aW9uPWNjLnR3ZWVuKHRoaXMubm9kZV9pbmp1cmVkKS50bygwLjUse29wYWNpdHk6MH0pLnN0YXJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaGlkZUluanVyZWQoKXtcclxuICAgICAgICBpZih0aGlzLmluanVyZWRfYWN0aW9uKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5pbmp1cmVkX2FjdGlvbi5zdG9wKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNjLnR3ZWVuKHRoaXMubm9kZV9pbmp1cmVkKS50bygwLjIse29wYWNpdHk6MH0pLnN0YXJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1ZlcnRpZ28oZHQ6bnVtYmVyKXtcclxuICAgICAgICB0aGlzLm5vZGVfdmVydGlnby5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICBpZih0aGlzLnZlcnRpZ29fYWN0aW9uKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy52ZXJ0aWdvX2FjdGlvbi5zdG9wKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubm9kZV92ZXJ0aWdvLm9wYWNpdHk9MjU1OyAgICAgICAgXHJcbiAgICAgICAgdGhpcy52ZXJ0aWdvX2FjdGlvbj1jYy50d2Vlbih0aGlzLm5vZGVfdmVydGlnbykudG8oZHQse29wYWNpdHk6MH0pLnN0YXJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaGlkZVZlcnRpZ28oKXtcclxuICAgICAgICBpZih0aGlzLnZlcnRpZ29fYWN0aW9uKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy52ZXJ0aWdvX2FjdGlvbi5zdG9wKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNjLnR3ZWVuKHRoaXMubm9kZV92ZXJ0aWdvKS50bygwLjUse29wYWNpdHk6MH0pLnN0YXJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1dhbGxUZVhpYW8oKXsgICAgICAgICAgICAgICBcclxuICAgICAgICB0aGlzLnByZV93YWxsX3N0YWdlPXRoaXMuY3VyX3dhbGxfc3RhZ2U7XHJcbiAgICAgICAgaWYodGhpcy5ocF9wcm9ncmVzcy5wcm9ncmVzcz49MCYmdGhpcy5ocF9wcm9ncmVzcy5wcm9ncmVzczwwLjI1KXsgICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5jdXJfd2FsbF9zdGFnZT0zO1xyXG4gICAgICAgIH1lbHNlIGlmKHRoaXMuaHBfcHJvZ3Jlc3MucHJvZ3Jlc3M+PTAuMjUmJnRoaXMuaHBfcHJvZ3Jlc3MucHJvZ3Jlc3M8MC41KXtcclxuICAgICAgICAgICAgdGhpcy5jdXJfd2FsbF9zdGFnZT0yO1xyXG4gICAgICAgIH1lbHNlIGlmKHRoaXMuaHBfcHJvZ3Jlc3MucHJvZ3Jlc3M+PTAuNSYmdGhpcy5ocF9wcm9ncmVzcy5wcm9ncmVzczwwLjc1KXtcclxuICAgICAgICAgICAgdGhpcy5jdXJfd2FsbF9zdGFnZT0xO1xyXG4gICAgICAgIH1lbHNlIGlmKHRoaXMuaHBfcHJvZ3Jlc3MucHJvZ3Jlc3M+PTAuNzUpe1xyXG4gICAgICAgICAgICB0aGlzLmN1cl93YWxsX3N0YWdlPTA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuY3VyX3dhbGxfc3RhZ2UhPXRoaXMucHJlX3dhbGxfc3RhZ2Upe1xyXG4gICAgICAgICAgICBNeVRvb2wucmFuZG9tU2NlbmVTaGFrZVNtYWxsKCk7XHJcbiAgICAgICAgICAgIEFwa01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5iZVZpYnJhdGUoMzAwKTtcclxuICAgICAgICAgICAgaWYodGhpcy5jdXJfd2FsbF9zdGFnZT4wKXtcclxuICAgICAgICAgICAgICAgIHRoaXMud2FsbF9zcGluZTAuc2V0QW5pbWF0aW9uKDAsJ0h1cnQnK3RoaXMuY3VyX3dhbGxfc3RhZ2UrJ18yJyx0cnVlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMud2FsbF9zcGluZTAubm9kZS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuY3VyX3dhbGxfc3RhZ2U+MSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53YWxsX3NwaW5lMS5zZXRBbmltYXRpb24oMCwnSHVydCcrdGhpcy5jdXJfd2FsbF9zdGFnZSsnXzEnLHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2FsbF9zcGluZTEubm9kZS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2FsbF9zcGluZTEubm9kZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy53YWxsX3NwaW5lMC5ub2RlLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHJlc2V0V2FsbFRlWGlhbygpe1xyXG4gICAgICAgIHRoaXMucHJlX3dhbGxfc3RhZ2U9dGhpcy5jdXJfd2FsbF9zdGFnZT0wO1xyXG4gICAgICAgIGlmKHRoaXMud2FsbF9zcGluZTApe1xyXG4gICAgICAgICAgICB0aGlzLndhbGxfc3BpbmUwLm5vZGUuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLndhbGxfc3BpbmUxKXtcclxuICAgICAgICAgICAgdGhpcy53YWxsX3NwaW5lMS5ub2RlLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==