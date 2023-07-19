
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcV2FsbFxcTWFpbldhbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0RBQTJDO0FBRTNDLDBEQUFxRDtBQUNyRCw4Q0FBeUM7QUFDekMsMENBQXFDO0FBR3JDLHNEQUFpRjtBQUNqRixzREFBcUQ7QUFDckQsa0VBQTZEO0FBQzdELDZEQUF3RDtBQUN4RCwrQkFBMEI7QUFDMUIsNkNBQXdDO0FBQ3hDLDJDQUF3QztBQUN4QyxpRUFBZ0U7QUFDaEUsMkRBQXNEO0FBQ3RELGtEQUFpRDtBQUczQyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUFzQyw0QkFBSTtJQUExQztRQUFBLHFFQTZKQztRQTNKRyxXQUFXO1FBQ1gsaUJBQVcsR0FBZ0IsSUFBSSxDQUFDO1FBQ2hDLFdBQVc7UUFDWCxpQkFBVyxHQUFnQixJQUFJLENBQUM7UUFDaEMsYUFBYTtRQUNiLG9CQUFjLEdBQVcsQ0FBQyxDQUFDO1FBQzNCLGNBQWM7UUFDZCxvQkFBYyxHQUFXLENBQUMsQ0FBQztRQUMzQixTQUFTO1FBQ1Qsa0JBQVksR0FBWSxJQUFJLENBQUM7UUFDN0Isb0JBQWMsR0FBYSxJQUFJLENBQUM7UUFDaEMsa0JBQVksR0FBWSxJQUFJLENBQUM7UUFDN0Isb0JBQWMsR0FBYSxJQUFJLENBQUM7O0lBK0lwQyxDQUFDO0lBN0lHLHlCQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDckQsaUJBQU0sZ0JBQWdCLFlBQUMsSUFBSSxDQUFDLFNBQVMsQ0FB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LFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztpQkFDeEM7YUFDSjtpQkFBTTtnQkFDSCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2FBQ3hDO1NBQ0o7SUFDTCxDQUFDO0lBRUQsa0NBQWUsR0FBZjtRQUNJLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGNBQWMsR0FBRyxDQUFDLENBQUM7UUFDOUMsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7U0FDeEM7UUFDRCxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDbEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztTQUN4QztJQUVMLENBQUM7SUEzSmdCLFFBQVE7UUFENUIsT0FBTztPQUNhLFFBQVEsQ0E2SjVCO0lBQUQsZUFBQztDQTdKRCxBQTZKQyxDQTdKcUMsY0FBSSxHQTZKekM7a0JBN0pvQixRQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFwa01hbmFnZXIgZnJvbSBcIi4uL0Fkcy9BcGtNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEppYVN1IH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgSHBQcm9ncmVzc0JhciBmcm9tIFwiLi4vTW9uc3Rlci9IcFByb2dyZXNzQmFyXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IE15VG9vbCBmcm9tIFwiLi4vVG9vbHMvTXlUb29sXCI7XHJcbmltcG9ydCBJbW11bml0eVNoaWVsZCBmcm9tIFwiLi9JbW11bml0eVNoaWVsZFwiO1xyXG5pbXBvcnQgU2hpZWxkIGZyb20gXCIuL1NoaWVsZFwiO1xyXG5pbXBvcnQgeyBCdWZmSWQsIEJ1ZmZUeXBlLCBIZXJvX1R5cGUsIFNraWxsVHlwZSB9IGZyb20gXCIuLi9IZXJvL0dhbWUvSGVyb0NvbmZpZ1wiO1xyXG5pbXBvcnQgeyBMZXZlbE1hbmFnZXIgfSBmcm9tIFwiLi4vTGV2ZWwvTGV2ZWxNYW5hZ2VyXCI7XHJcbmltcG9ydCBUdXRvcmFpbHNNYW5hZ2VyIGZyb20gXCIuLi9UdXRvcmlhbHMvVHV0b3JhaWxzTWFuYWdlclwiO1xyXG5pbXBvcnQgQnVmZlN0YXRlTWFuYWdlciBmcm9tIFwiLi4vR2FtZS9CdWZmU3RhdGVNYW5hZ2VyXCI7XHJcbmltcG9ydCBXYWxsIGZyb20gXCIuL1dhbGxcIjtcclxuaW1wb3J0IFdhbGxNYW5hZ2VyIGZyb20gXCIuL1dhbGxNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFdhbGxUeXBlIH0gZnJvbSBcIi4vV2FsbENvbmZpZ1wiO1xyXG5pbXBvcnQgeyBHYW1lRWZmZWN0c01hbmFnZXIgfSBmcm9tIFwiLi4vR2FtZS9HYW1lRWZmZWN0c01hbmFnZXJcIjtcclxuaW1wb3J0IEZpZ2h0aW5nTWFuYWdlciBmcm9tIFwiLi4vR2FtZS9GaWdodGluZ01hbmFnZXJcIjtcclxuaW1wb3J0IHsgQnVmZkRhdGEgfSBmcm9tIFwiLi4vSGVyby9HYW1lL0J1ZmZEYXRhXCI7XHJcblxyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haW5XYWxsIGV4dGVuZHMgV2FsbCB7XHJcblxyXG4gICAgLyoq5Z+O5aKZMOeJueaViCAqL1xyXG4gICAgd2FsbF9zcGluZTA6IHNwLlNrZWxldG9uID0gbnVsbDtcclxuICAgIC8qKuWfjuWimTHnibnmlYggKi9cclxuICAgIHdhbGxfc3BpbmUxOiBzcC5Ta2VsZXRvbiA9IG51bGw7XHJcbiAgICAvKirlvZPliY3ln47lopnnmoTpmLbmrrUgKi9cclxuICAgIGN1cl93YWxsX3N0YWdlOiBudW1iZXIgPSAwO1xyXG4gICAgLyoq5LiK5LiA5Liq5Z+O5aKZ55qE6Zi25q61ICovXHJcbiAgICBwcmVfd2FsbF9zdGFnZTogbnVtYmVyID0gMDtcclxuICAgIC8qKuWPl+S8pOeahCAqL1xyXG4gICAgbm9kZV9pbmp1cmVkOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIGluanVyZWRfYWN0aW9uOiBjYy5Ud2VlbiA9IG51bGw7XHJcbiAgICBub2RlX3ZlcnRpZ286IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgdmVydGlnb19hY3Rpb246IGNjLlR3ZWVuID0gbnVsbDtcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5zZXRIcENoYW5nZUxpc3Rlbih0aGlzLm9uV2FsbENoYW5nZUhwLmJpbmQodGhpcykpO1xyXG4gICAgICAgIHRoaXMuc2V0SHBTaG93TGlzdGVuKHRoaXMuc2hvd1dhbGxUZVhpYW8uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgc3VwZXIuc2V0V2FsbERpZUxpc3Rlbih0aGlzLm9uV2FsbERpZS5iaW5kKHRoaXMpKTtcclxuICAgICAgICBsZXQgaHBSb290ID0gY2MuZmluZCgnQ2FudmFzL1VpX1Jvb3QvaHBfcm9vdCcpO1xyXG4gICAgICAgIHRoaXMuaHBfcHJvZ3Jlc3MgPSBocFJvb3QuZ2V0Q2hpbGRCeU5hbWUoJ2hwJykuZ2V0Q29tcG9uZW50KEhwUHJvZ3Jlc3NCYXIpO1xyXG4gICAgICAgIHRoaXMuc2hpZWxkX3Byb2dyZXNzID0gaHBSb290LmdldENoaWxkQnlOYW1lKCdzaGllbGQnKS5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpO1xyXG4gICAgICAgIHRoaXMuaHBfdGV4dCA9IGhwUm9vdC5nZXRDaGlsZEJ5TmFtZSgnaHBUZXh0JykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICB0aGlzLnNoaWVsZF90ZXh0ID0gaHBSb290LmdldENoaWxkQnlOYW1lKCdzaGllbGRUZXh0JykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICB0aGlzLm1hcF9zaGllbGRfdmFsdWUgPSBuZXcgTWFwPG51bWJlciwgU2hpZWxkPigpO1xyXG4gICAgICAgIHRoaXMubWFwX2ltbXVuaXR5X3NoaWVsZF92YWx1ZSA9IG5ldyBNYXA8bnVtYmVyLCBJbW11bml0eVNoaWVsZD4oKTtcclxuICAgICAgICB0aGlzLm5vZGVfaW5qdXJlZCA9IGhwUm9vdC5wYXJlbnQuZ2V0Q2hpbGRCeU5hbWUoJ2luanVyZWQnKTtcclxuICAgICAgICB0aGlzLm5vZGVfdmVydGlnbyA9IGhwUm9vdC5wYXJlbnQuZ2V0Q2hpbGRCeU5hbWUoJ3ZlcnRpZ28nKTtcclxuICAgICAgICB0aGlzLndhbGxfc3BpbmUwID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCd3YWxsMCcpLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbik7XHJcbiAgICAgICAgdGhpcy53YWxsX3NwaW5lMSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnd2FsbDEnKS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pO1xyXG4gICAgICAgIHRoaXMud2FsbF9zcGluZTAubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLndhbGxfc3BpbmUxLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgV2FsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRXYWxsKFdhbGxUeXBlLk1haW4sIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuc2hvd0hwKCk7XHJcbiAgICAgICAgdGhpcy5zaG93U2hpbGRQcm9ncmVzcygpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgICBCdWZmU3RhdGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlQnVmZlJvb3QoY2MudjIodGhpcy5ub2RlLngsIHRoaXMubm9kZS55ICsgMTUwKSwgSGVyb19UeXBlLkhlcm9fTnVtKTtcclxuICAgICAgICBsZXQgd2FsbERvd24gPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3dhbGxfZG93bicpO1xyXG4gICAgICAgIGxldCB3b3JsZFBvcyA9IHdhbGxEb3duLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIod2FsbERvd24uZ2V0UG9zaXRpb24oKSk7XHJcbiAgICAgICAgbGV0IHBvcyA9IEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIod29ybGRQb3MpO1xyXG4gICAgICAgIHRoaXMuc2V0V2FsbFJlY3QoY2MucmVjdCgtY2Mud2luU2l6ZS53aWR0aCAvIDIsIHBvcy55IC0gd2FsbERvd24uaGVpZ2h0IC8gMiwgY2Mud2luU2l6ZS53aWR0aCwgd2FsbERvd24uaGVpZ2h0KSk7XHJcbiAgICAgICAgbGV0IGdncCA9IEZpZ2h0aW5nTWFuYWdlci5nZXRJbnN0YW5jZSgpLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICBnZ3AucmVjdCh0aGlzLmdldFdhbGxSZWN0KCkueCwgdGhpcy5nZXRXYWxsUmVjdCgpLnksIHRoaXMuZ2V0V2FsbFJlY3QoKS53aWR0aCwgdGhpcy5nZXRXYWxsUmVjdCgpLmhlaWdodCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25XYWxsRGllKCkge1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkub25XYWxsRGllKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnROZXh0TGV2ZWwoKSB7XHJcbiAgICAgICAgdGhpcy5yZXNldFdhbGxUZVhpYW8oKTtcclxuICAgICAgICB0aGlzLmlzX3R1dG9yYWlsID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqICovXHJcbiAgICBwdWJsaWMgb25XYWxsQ2hhbmdlSHAoaHA6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChocCA8IDApIHtcclxuICAgICAgICAgICAgdGhpcy5zaG93SW5qdXJlZCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKirmlZnnqIsgKi9cclxuICAgICAgICBpZiAoVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzX2ZpbmlzaF9nYW1lID09IGZhbHNlICYmIHRoaXMuaXNfdHV0b3JhaWwgPT0gZmFsc2UgJiYgdGhpcy5jdXJfaHAgPD0gdGhpcy5tYXhfaHAgKiAwLjIpIHtcclxuICAgICAgICAgICAgaWYgKExldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnN0YXJ0X2xldmVsID09IDEpIHtcclxuICAgICAgICAgICAgICAgIC8v5pyA5ZCO5LiA5rOiXHJcbiAgICAgICAgICAgICAgICBpZiAoVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzU2hvd1R1dG9yaWFscygyMDApKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc190dXRvcmFpbCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJ1ZmZEYXRhID0gbmV3IEJ1ZmZEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnVmZkRhdGEuYnVmZl9pZCA9IEJ1ZmZJZC5XYWxsX1R1dG9yaWFsX0FkZF9ocDtcclxuICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5idWZmX3R5cGUgPSBCdWZmVHlwZS5HYWluO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLmJ1ZmZfdmFsdWUgPSBbdGhpcy5nZXRNYXhIcCgpICogMC4wNV07XHJcbiAgICAgICAgICAgICAgICAgICAgYnVmZkRhdGEucmVtYWluX3RpbWUgPSAxMDtcclxuICAgICAgICAgICAgICAgICAgICAvLyBidWZmRGF0YS5nYW1lX2VmZmVjdF9pZD1HYW1lRWZmZWN0SWQuY2hhbmdfbWFvX3Nob3Vfc2tpbGxfYWN0aXZlXzE7XHJcbiAgICAgICAgICAgICAgICAgICAgYnVmZkRhdGEucmVjb3ZlcnlfamlhbmdlX3RpbWUgPSAwLjI7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJ1ZmYgPSBXYWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1haW5XYWxsKCkuYWRkQnVmZihidWZmRGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnVmZi5hZGREZXN0cm95TGlzdGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc190dXRvcmFpbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dJbmp1cmVkKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmluanVyZWRfYWN0aW9uKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5qdXJlZF9hY3Rpb24uc3RvcCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5vZGVfaW5qdXJlZC5vcGFjaXR5ID0gMjU1O1xyXG4gICAgICAgIHRoaXMuaW5qdXJlZF9hY3Rpb24gPSBjYy50d2Vlbih0aGlzLm5vZGVfaW5qdXJlZCkudG8oMC41LCB7IG9wYWNpdHk6IDAgfSkuc3RhcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBoaWRlSW5qdXJlZCgpIHtcclxuICAgICAgICBpZiAodGhpcy5pbmp1cmVkX2FjdGlvbikge1xyXG4gICAgICAgICAgICB0aGlzLmluanVyZWRfYWN0aW9uLnN0b3AoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2MudHdlZW4odGhpcy5ub2RlX2luanVyZWQpLnRvKDAuMiwgeyBvcGFjaXR5OiAwIH0pLnN0YXJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1ZlcnRpZ28oZHQ6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMubm9kZV92ZXJ0aWdvLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgaWYgKHRoaXMudmVydGlnb19hY3Rpb24pIHtcclxuICAgICAgICAgICAgdGhpcy52ZXJ0aWdvX2FjdGlvbi5zdG9wKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubm9kZV92ZXJ0aWdvLm9wYWNpdHkgPSAyNTU7XHJcbiAgICAgICAgdGhpcy52ZXJ0aWdvX2FjdGlvbiA9IGNjLnR3ZWVuKHRoaXMubm9kZV92ZXJ0aWdvKS50byhkdCwgeyBvcGFjaXR5OiAwIH0pLnN0YXJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaGlkZVZlcnRpZ28oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudmVydGlnb19hY3Rpb24pIHtcclxuICAgICAgICAgICAgdGhpcy52ZXJ0aWdvX2FjdGlvbi5zdG9wKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNjLnR3ZWVuKHRoaXMubm9kZV92ZXJ0aWdvKS50bygwLjUsIHsgb3BhY2l0eTogMCB9KS5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dXYWxsVGVYaWFvKCkge1xyXG4gICAgICAgIHRoaXMucHJlX3dhbGxfc3RhZ2UgPSB0aGlzLmN1cl93YWxsX3N0YWdlO1xyXG4gICAgICAgIGlmICh0aGlzLmhwX3Byb2dyZXNzLnByb2dyZXNzID49IDAgJiYgdGhpcy5ocF9wcm9ncmVzcy5wcm9ncmVzcyA8IDAuMjUpIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJfd2FsbF9zdGFnZSA9IDM7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmhwX3Byb2dyZXNzLnByb2dyZXNzID49IDAuMjUgJiYgdGhpcy5ocF9wcm9ncmVzcy5wcm9ncmVzcyA8IDAuNSkge1xyXG4gICAgICAgICAgICB0aGlzLmN1cl93YWxsX3N0YWdlID0gMjtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaHBfcHJvZ3Jlc3MucHJvZ3Jlc3MgPj0gMC41ICYmIHRoaXMuaHBfcHJvZ3Jlc3MucHJvZ3Jlc3MgPCAwLjc1KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VyX3dhbGxfc3RhZ2UgPSAxO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5ocF9wcm9ncmVzcy5wcm9ncmVzcyA+PSAwLjc1KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VyX3dhbGxfc3RhZ2UgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5jdXJfd2FsbF9zdGFnZSAhPSB0aGlzLnByZV93YWxsX3N0YWdlKSB7XHJcbiAgICAgICAgICAgIE15VG9vbC5yYW5kb21TY2VuZVNoYWtlU21hbGwoKTtcclxuICAgICAgICAgICAgQXBrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmJlVmlicmF0ZSgzMDApO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jdXJfd2FsbF9zdGFnZSA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMud2FsbF9zcGluZTAuc2V0QW5pbWF0aW9uKDAsICdIdXJ0JyArIHRoaXMuY3VyX3dhbGxfc3RhZ2UgKyAnXzInLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMud2FsbF9zcGluZTAubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VyX3dhbGxfc3RhZ2UgPiAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53YWxsX3NwaW5lMS5zZXRBbmltYXRpb24oMCwgJ0h1cnQnICsgdGhpcy5jdXJfd2FsbF9zdGFnZSArICdfMScsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2FsbF9zcGluZTEubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndhbGxfc3BpbmUxLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndhbGxfc3BpbmUwLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVzZXRXYWxsVGVYaWFvKCkge1xyXG4gICAgICAgIHRoaXMucHJlX3dhbGxfc3RhZ2UgPSB0aGlzLmN1cl93YWxsX3N0YWdlID0gMDtcclxuICAgICAgICBpZiAodGhpcy53YWxsX3NwaW5lMCkge1xyXG4gICAgICAgICAgICB0aGlzLndhbGxfc3BpbmUwLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLndhbGxfc3BpbmUxKSB7XHJcbiAgICAgICAgICAgIHRoaXMud2FsbF9zcGluZTEubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=