
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/UI/home/ToPlayPreviewUi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '773c7M29RtHwJMZTD20ktG9', 'ToPlayPreviewUi');
// Scripts/UI/home/ToPlayPreviewUi.ts

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
var WXManagerEX_1 = require("../../../startscene/WXManagerEX");
var BossChallenge_1 = require("../../Activity/BossChallenge");
var EndlessLevels_1 = require("../../Activity/EndlessLevels");
var Constants_1 = require("../../Constants");
var GameManager_1 = require("../../GameManager");
var LevelManager_1 = require("../../Level/LevelManager");
var MissionLevel_1 = require("../../Level/MissionLevel");
var MazeManager_1 = require("../../Maze/MazeManager");
var MonsterConfigure_1 = require("../../Monster/Data/MonsterConfigure");
var MonsterData_1 = require("../../Monster/MonsterData");
var TowerLevel_1 = require("../../Tower/TowerLevel");
var TowerManager_1 = require("../../Tower/TowerManager");
var UIComponent_1 = require("../UIComponent");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ToPlayPreviewUi = /** @class */ (function (_super) {
    __extends(ToPlayPreviewUi, _super);
    function ToPlayPreviewUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.to_play_ui = null;
        _this.index = 0;
        _this.bossIndex = 0;
        return _this;
    }
    ToPlayPreviewUi.prototype.start = function () {
        this.refreshUi();
    };
    ToPlayPreviewUi.prototype.init = function (uiAc) {
        _super.prototype.init.call(this, uiAc);
        this.refreshUi();
    };
    ToPlayPreviewUi.prototype.refreshUi = function () {
        var _this = this;
        var level = LevelManager_1.LevelManager.getInstance().start_level;
        var fightingInfo = new Constants_1.FightingInfo();
        switch (GameManager_1.default.getInstance().cur_game_mode) {
            case Constants_1.GameMode.Main:
                {
                    fightingInfo = MissionLevel_1.MissionLevelManager.getInstance().getFightingInfo(level);
                }
                break;
            case Constants_1.GameMode.Endless:
                {
                    fightingInfo = EndlessLevels_1.EndlessLevelsManager.getInstance().getFightingInfo(1);
                }
                break;
            case Constants_1.GameMode.Boss_Challenge:
                {
                    fightingInfo = BossChallenge_1.BossChallengeManager.getInstance().getFightingInfo(BossChallenge_1.BossChallengeManager.getInstance().cur_challenge_mode);
                }
                break;
            case Constants_1.GameMode.Maze:
                {
                    fightingInfo = MazeManager_1.MazeManager.getInstance().getFightingInfo();
                }
                break;
            case Constants_1.GameMode.Tower:
                {
                    fightingInfo = TowerLevel_1.TowerLevelManager.getInstance().getFightingInfo(TowerManager_1.default.getTowerLevel());
                }
                break;
        }
        GameManager_1.default.getInstance().fighting_info = fightingInfo;
        var bg1 = this.node.getChildByName('bg1');
        this.node.getChildByName("levelLabel").getComponent(cc.Label).string = fightingInfo.title_name;
        WXManagerEX_1.default.getInstance().resourcesBundle.load(fightingInfo.bg_name, cc.SpriteFrame, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            bg1.getComponent(cc.Sprite).spriteFrame = assets;
        });
        var list = fightingInfo.getOnlyMonsterDataList();
        list.forEach(function (v, k) {
            if (!MonsterConfigure_1.MonsterConfigureManager.getInstance().getJsonMonsterConfigure(v.id)) {
                cc.log(v.id);
            }
            var type = MonsterConfigure_1.MonsterConfigureManager.getInstance().getMonsterClass(v.id);
            _this.loadPrefab("" + type, v.id, v.level);
        });
    };
    ToPlayPreviewUi.prototype.loadPrefab = function (type, key, value) {
        var _this = this;
        var path = "monster/ui/Monster_" + type;
        var node = null;
        WXManagerEX_1.default.getInstance().resourcesBundle.load(path, cc.Prefab, function (error, assets) {
            if (error) {
                cc.log(error);
                return;
            }
            node = cc.instantiate(assets);
            // node.removeComponent(Monster);
            // node.removeComponent(cc.PolygonCollider)
            var levelNode = new cc.Node();
            levelNode.addComponent(cc.Sprite).spriteFrame = _this.to_play_ui.getSpriteFrame("Prepare_Level_Bg");
            var levelLabel = new cc.Node();
            levelLabel.addComponent(cc.Label).string = "Lv." + value;
            levelLabel.getComponent(cc.Label).fontSize = 28;
            levelLabel.color = cc.color(255, 255, 255);
            levelLabel.getComponent(cc.Label).enableBold = true;
            levelLabel.addComponent(cc.LabelOutline).color = cc.color(27, 35, 52);
            levelLabel.getComponent(cc.LabelOutline).width = 2;
            levelLabel.parent = levelNode;
            levelLabel.setPosition(cc.v2(0, 0));
            levelLabel.anchorY = 0.4;
            if (MonsterConfigure_1.MonsterConfigureManager.getInstance().getStrengthType(key) != 3) {
                node.parent = _this.node.getChildByName("pos" + _this.index);
                levelNode.parent = _this.node.getChildByName("pos" + _this.index);
                node.setPosition(cc.v2(0, 0));
                levelNode.setPosition(cc.v2(0, 0));
                _this.index++;
                levelNode.scale = 0.7;
                node.getComponent(sp.Skeleton).setSkin(MonsterData_1.MonsterFaceName.Front + MonsterConfigure_1.MonsterConfigureManager.getInstance().getSkin(key));
                node.getComponent(sp.Skeleton).setAnimation(0, MonsterData_1.MonsterFaceName.Front + "_" + MonsterData_1.MonsterActionName.Idle, true);
            }
            else {
                var bossIcon = new cc.Node();
                bossIcon.addComponent(cc.Sprite).spriteFrame = _this.to_play_ui.getSpriteFrame("Prepare_Icon_Boss");
                bossIcon.parent = levelNode;
                bossIcon.setPosition(cc.v2(-60, 0));
                bossIcon.anchorY = 0;
                node.parent = _this.node.getChildByName("bossPos" + _this.bossIndex);
                levelNode.parent = _this.node.getChildByName("bossPos" + _this.bossIndex);
                levelNode.setPosition(cc.v2(0, 0));
                node.setPosition(cc.v2(0, 0));
                _this.bossIndex++;
                // levelNode.scale = 0.5;
                // node.getComponent(sp.Skeleton).setSkin(MonsterFaceName.SideL + MonsterConfigureManager.getInstance().getSkin(key));
                node.getComponent(sp.Skeleton).setAnimation(0, "idle", true);
            }
            // levelNode.setPosition(node.getChildByName("hp").getPosition())
            // levelNode.setPosition(cc.v2(0,0))
            levelNode.anchorY = 0;
            node.scale = MonsterConfigure_1.MonsterConfigureManager.getInstance().getScale(key);
            levelNode.setPosition(cc.v2((node.getPosition().x + node.getChildByName("hp").getPosition().x) * node.scale, (node.getPosition().y + node.getChildByName("hp").getPosition().y) * node.scale));
        });
    };
    __decorate([
        property(cc.SpriteAtlas)
    ], ToPlayPreviewUi.prototype, "to_play_ui", void 0);
    ToPlayPreviewUi = __decorate([
        ccclass
    ], ToPlayPreviewUi);
    return ToPlayPreviewUi;
}(UIComponent_1.default));
exports.default = ToPlayPreviewUi;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVUlcXGhvbWVcXFRvUGxheVByZXZpZXdVaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrREFBMEQ7QUFDMUQsOERBQW9FO0FBQ3BFLDhEQUFvRTtBQUNwRSw2Q0FBeUQ7QUFDekQsaURBQTRDO0FBQzVDLHlEQUF3RDtBQUN4RCx5REFBK0Q7QUFDL0Qsc0RBQXFEO0FBQ3JELHdFQUE4RTtBQUU5RSx5REFBK0U7QUFDL0UscURBQTJEO0FBQzNELHlEQUFvRDtBQUNwRCw4Q0FBeUM7QUFHbkMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBNkMsbUNBQVc7SUFBeEQ7UUFBQSxxRUEySEM7UUF4SEcsZ0JBQVUsR0FBa0IsSUFBSSxDQUFDO1FBRWpDLFdBQUssR0FBVSxDQUFDLENBQUM7UUFDakIsZUFBUyxHQUFVLENBQUMsQ0FBQzs7SUFxSHpCLENBQUM7SUFqSGEsK0JBQUssR0FBZjtRQUNJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUVyQixDQUFDO0lBRUQsOEJBQUksR0FBSixVQUFLLElBQWM7UUFDZixpQkFBTSxJQUFJLFlBQUMsSUFBSSxDQUFDLENBQUM7UUFFakIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxtQ0FBUyxHQUFUO1FBQUEsaUJBMENDO1FBeENHLElBQUksS0FBSyxHQUFDLDJCQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDO1FBRWpELElBQUksWUFBWSxHQUFDLElBQUksd0JBQVksRUFBRSxDQUFDO1FBQ3BDLFFBQU8scUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLEVBQUM7WUFDM0MsS0FBSyxvQkFBUSxDQUFDLElBQUk7Z0JBQUM7b0JBQ2YsWUFBWSxHQUFDLGtDQUFtQixDQUFDLFdBQVcs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LFdBQVcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUN0QixDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRSxJQUFJLENBQUMsS0FBSyxFQUMvRSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUN6RixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUF0SEQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQzt1REFDUTtJQUhoQixlQUFlO1FBRG5DLE9BQU87T0FDYSxlQUFlLENBMkhuQztJQUFELHNCQUFDO0NBM0hELEFBMkhDLENBM0g0QyxxQkFBVyxHQTJIdkQ7a0JBM0hvQixlQUFlIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFdYTWFuYWdlckVYIGZyb20gXCIuLi8uLi8uLi9zdGFydHNjZW5lL1dYTWFuYWdlckVYXCI7XHJcbmltcG9ydCB7IEJvc3NDaGFsbGVuZ2VNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0FjdGl2aXR5L0Jvc3NDaGFsbGVuZ2VcIjtcclxuaW1wb3J0IHsgRW5kbGVzc0xldmVsc01hbmFnZXIgfSBmcm9tIFwiLi4vLi4vQWN0aXZpdHkvRW5kbGVzc0xldmVsc1wiO1xyXG5pbXBvcnQgeyBGaWdodGluZ0luZm8sIEdhbWVNb2RlIH0gZnJvbSBcIi4uLy4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uLy4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IExldmVsTWFuYWdlciB9IGZyb20gXCIuLi8uLi9MZXZlbC9MZXZlbE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgTWlzc2lvbkxldmVsTWFuYWdlciB9IGZyb20gXCIuLi8uLi9MZXZlbC9NaXNzaW9uTGV2ZWxcIjtcclxuaW1wb3J0IHsgTWF6ZU1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vTWF6ZS9NYXplTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBNb25zdGVyQ29uZmlndXJlTWFuYWdlciB9IGZyb20gXCIuLi8uLi9Nb25zdGVyL0RhdGEvTW9uc3RlckNvbmZpZ3VyZVwiO1xyXG5pbXBvcnQgTW9uc3RlciBmcm9tIFwiLi4vLi4vTW9uc3Rlci9Nb25zdGVyXCI7XHJcbmltcG9ydCB7IE1vbnN0ZXJBY3Rpb25OYW1lLCBNb25zdGVyRmFjZU5hbWUgfSBmcm9tIFwiLi4vLi4vTW9uc3Rlci9Nb25zdGVyRGF0YVwiO1xyXG5pbXBvcnQgeyBUb3dlckxldmVsTWFuYWdlciB9IGZyb20gXCIuLi8uLi9Ub3dlci9Ub3dlckxldmVsXCI7XHJcbmltcG9ydCBUb3dlck1hbmFnZXIgZnJvbSBcIi4uLy4uL1Rvd2VyL1Rvd2VyTWFuYWdlclwiO1xyXG5pbXBvcnQgVUlDb21wb25lbnQgZnJvbSBcIi4uL1VJQ29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFVpQWN0aW9uIH0gZnJvbSBcIi4uL1VpSW50ZXJmYWNlXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvUGxheVByZXZpZXdVaSBleHRlbmRzIFVJQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlQXRsYXMpXHJcbiAgICB0b19wbGF5X3VpOmNjLlNwcml0ZUF0bGFzID0gbnVsbDtcclxuXHJcbiAgICBpbmRleDpudW1iZXIgPSAwO1xyXG4gICAgYm9zc0luZGV4Om51bWJlciA9IDA7XHJcblxyXG5cclxuICAgIFxyXG4gICAgcHJvdGVjdGVkIHN0YXJ0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucmVmcmVzaFVpKCk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgaW5pdCh1aUFjOiBVaUFjdGlvbikge1xyXG4gICAgICAgIHN1cGVyLmluaXQodWlBYyk7XHJcblxyXG4gICAgICAgIHRoaXMucmVmcmVzaFVpKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVmcmVzaFVpKCl7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGxldmVsPUxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnN0YXJ0X2xldmVsO1xyXG5cclxuICAgICAgICBsZXQgZmlnaHRpbmdJbmZvPW5ldyBGaWdodGluZ0luZm8oKTtcclxuICAgICAgICBzd2l0Y2goR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9tb2RlKXtcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5NYWluOntcclxuICAgICAgICAgICAgICAgIGZpZ2h0aW5nSW5mbz1NaXNzaW9uTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RmlnaHRpbmdJbmZvKGxldmVsKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLkVuZGxlc3M6e1xyXG4gICAgICAgICAgICAgICAgZmlnaHRpbmdJbmZvPUVuZGxlc3NMZXZlbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RmlnaHRpbmdJbmZvKDEpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuQm9zc19DaGFsbGVuZ2U6e1xyXG4gICAgICAgICAgICAgICAgZmlnaHRpbmdJbmZvPUJvc3NDaGFsbGVuZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RmlnaHRpbmdJbmZvKEJvc3NDaGFsbGVuZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2NoYWxsZW5nZV9tb2RlKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLk1hemU6e1xyXG4gICAgICAgICAgICAgICAgZmlnaHRpbmdJbmZvPU1hemVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RmlnaHRpbmdJbmZvKCk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5Ub3dlcjp7XHJcbiAgICAgICAgICAgICAgICBmaWdodGluZ0luZm89VG93ZXJMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGaWdodGluZ0luZm8oVG93ZXJNYW5hZ2VyLmdldFRvd2VyTGV2ZWwoKSk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5maWdodGluZ19pbmZvPWZpZ2h0aW5nSW5mbztcclxuICAgICAgICBsZXQgYmcxPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnYmcxJyk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwibGV2ZWxMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9ZmlnaHRpbmdJbmZvLnRpdGxlX25hbWU7XHJcblxyXG4gICAgICAgIFdYTWFuYWdlckVYLmdldEluc3RhbmNlKCkucmVzb3VyY2VzQnVuZGxlLmxvYWQoZmlnaHRpbmdJbmZvLmJnX25hbWUsY2MuU3ByaXRlRnJhbWUsKGVycm9yOiBFcnJvciwgYXNzZXRzOmNjLlNwcml0ZUZyYW1lKT0+e1xyXG4gICAgICAgICAgICBpZihlcnJvcilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJnMS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZT1hc3NldHM7XHJcbiAgICAgICAgfSk7ICAgICAgICBcclxuICAgICAgICBsZXQgbGlzdD1maWdodGluZ0luZm8uZ2V0T25seU1vbnN0ZXJEYXRhTGlzdCgpO1xyXG4gICAgICAgIGxpc3QuZm9yRWFjaCgodixrKT0+e1xyXG4gICAgICAgICAgICBpZighTW9uc3RlckNvbmZpZ3VyZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRKc29uTW9uc3RlckNvbmZpZ3VyZSh2LmlkKSl7XHJcbiAgICAgICAgICAgICAgICBjYy5sb2codi5pZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHR5cGU9TW9uc3RlckNvbmZpZ3VyZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNb25zdGVyQ2xhc3Modi5pZCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFByZWZhYihcIlwiICsgdHlwZSx2LmlkLHYubGV2ZWwpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBsb2FkUHJlZmFiKHR5cGU6c3RyaW5nLGtleSx2YWx1ZSl7XHJcbiAgICAgICAgbGV0IHBhdGggPSBcIm1vbnN0ZXIvdWkvTW9uc3Rlcl9cIiArIHR5cGU7XHJcbiAgICAgICAgbGV0IG5vZGU6Y2MuTm9kZSA9IG51bGw7XHJcbiAgICAgICAgV1hNYW5hZ2VyRVguZ2V0SW5zdGFuY2UoKS5yZXNvdXJjZXNCdW5kbGUubG9hZChwYXRoLGNjLlByZWZhYiwoZXJyb3I6IEVycm9yLCBhc3NldHM6Y2MuUHJlZmFiKT0+eyAgXHJcbiAgICAgICAgICAgIGlmKGVycm9yKXtcclxuICAgICAgICAgICAgICAgIGNjLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbm9kZSA9IGNjLmluc3RhbnRpYXRlKGFzc2V0cyk7XHJcbiAgICAgICAgICAgIC8vIG5vZGUucmVtb3ZlQ29tcG9uZW50KE1vbnN0ZXIpO1xyXG4gICAgICAgICAgICAvLyBub2RlLnJlbW92ZUNvbXBvbmVudChjYy5Qb2x5Z29uQ29sbGlkZXIpXHJcbiAgICAgICAgICAgIGxldCBsZXZlbE5vZGUgPSBuZXcgY2MuTm9kZSgpO1xyXG4gICAgICAgICAgICBsZXZlbE5vZGUuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnRvX3BsYXlfdWkuZ2V0U3ByaXRlRnJhbWUoXCJQcmVwYXJlX0xldmVsX0JnXCIpXHJcbiAgICAgICAgICAgIGxldCBsZXZlbExhYmVsID0gbmV3IGNjLk5vZGUoKTtcclxuICAgICAgICAgICAgbGV2ZWxMYWJlbC5hZGRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiTHYuXCIrdmFsdWU7XHJcbiAgICAgICAgICAgIGxldmVsTGFiZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5mb250U2l6ZSA9IDI4O1xyXG4gICAgICAgICAgICBsZXZlbExhYmVsLmNvbG9yID0gY2MuY29sb3IoMjU1LDI1NSwyNTUpO1xyXG4gICAgICAgICAgICBsZXZlbExhYmVsLmdldENvbXBvbmVudChjYy5MYWJlbCkuZW5hYmxlQm9sZCA9IHRydWU7XHJcbiAgICAgICAgICAgIGxldmVsTGFiZWwuYWRkQ29tcG9uZW50KGNjLkxhYmVsT3V0bGluZSkuY29sb3IgPSBjYy5jb2xvcigyNywgMzUsIDUyKVxyXG4gICAgICAgICAgICBsZXZlbExhYmVsLmdldENvbXBvbmVudChjYy5MYWJlbE91dGxpbmUpLndpZHRoID0gMjtcclxuICAgICAgICAgICAgbGV2ZWxMYWJlbC5wYXJlbnQgPSBsZXZlbE5vZGU7XHJcbiAgICAgICAgICAgIGxldmVsTGFiZWwuc2V0UG9zaXRpb24oY2MudjIoMCwwKSk7XHJcbiAgICAgICAgICAgIGxldmVsTGFiZWwuYW5jaG9yWSA9IDAuNDtcclxuICAgICAgICAgICAgaWYoTW9uc3RlckNvbmZpZ3VyZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJlbmd0aFR5cGUoa2V5KSAhPSAzKXtcclxuICAgICAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwicG9zXCIrdGhpcy5pbmRleCk7XHJcbiAgICAgICAgICAgICAgICBsZXZlbE5vZGUucGFyZW50ID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwicG9zXCIrdGhpcy5pbmRleCk7XHJcbiAgICAgICAgICAgICAgICBub2RlLnNldFBvc2l0aW9uKGNjLnYyKDAsMCkpO1xyXG4gICAgICAgICAgICAgICAgbGV2ZWxOb2RlLnNldFBvc2l0aW9uKGNjLnYyKDAsMCkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbmRleCsrO1xyXG4gICAgICAgICAgICAgICAgbGV2ZWxOb2RlLnNjYWxlID0gMC43O1xyXG4gICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLnNldFNraW4oTW9uc3RlckZhY2VOYW1lLkZyb250ICsgTW9uc3RlckNvbmZpZ3VyZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTa2luKGtleSkpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLnNldEFuaW1hdGlvbigwLE1vbnN0ZXJGYWNlTmFtZS5Gcm9udCArIFwiX1wiICsgTW9uc3RlckFjdGlvbk5hbWUuSWRsZSx0cnVlKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBsZXQgYm9zc0ljb24gPSBuZXcgY2MuTm9kZSgpO1xyXG4gICAgICAgICAgICAgICAgYm9zc0ljb24uYWRkQ29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnRvX3BsYXlfdWkuZ2V0U3ByaXRlRnJhbWUoXCJQcmVwYXJlX0ljb25fQm9zc1wiKVxyXG4gICAgICAgICAgICAgICAgYm9zc0ljb24ucGFyZW50ID0gbGV2ZWxOb2RlO1xyXG4gICAgICAgICAgICAgICAgYm9zc0ljb24uc2V0UG9zaXRpb24oY2MudjIoLTYwLDApKTtcclxuICAgICAgICAgICAgICAgIGJvc3NJY29uLmFuY2hvclkgPSAwO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJvc3NQb3NcIit0aGlzLmJvc3NJbmRleCk7XHJcbiAgICAgICAgICAgICAgICBsZXZlbE5vZGUucGFyZW50ID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYm9zc1Bvc1wiK3RoaXMuYm9zc0luZGV4KTtcclxuICAgICAgICAgICAgICAgIGxldmVsTm9kZS5zZXRQb3NpdGlvbihjYy52MigwLDApKTtcclxuICAgICAgICAgICAgICAgIG5vZGUuc2V0UG9zaXRpb24oY2MudjIoMCwwKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJvc3NJbmRleCsrO1xyXG4gICAgICAgICAgICAgICAgLy8gbGV2ZWxOb2RlLnNjYWxlID0gMC41O1xyXG4gICAgICAgICAgICAgICAgLy8gbm9kZS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLnNldFNraW4oTW9uc3RlckZhY2VOYW1lLlNpZGVMICsgTW9uc3RlckNvbmZpZ3VyZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTa2luKGtleSkpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLnNldEFuaW1hdGlvbigwLFwiaWRsZVwiLHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGxldmVsTm9kZS5zZXRQb3NpdGlvbihub2RlLmdldENoaWxkQnlOYW1lKFwiaHBcIikuZ2V0UG9zaXRpb24oKSlcclxuICAgICAgICAgICAgLy8gbGV2ZWxOb2RlLnNldFBvc2l0aW9uKGNjLnYyKDAsMCkpXHJcbiAgICAgICAgICAgIGxldmVsTm9kZS5hbmNob3JZID0gMDtcclxuICAgICAgICAgICAgbm9kZS5zY2FsZSA9IE1vbnN0ZXJDb25maWd1cmVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U2NhbGUoa2V5KTtcclxuICAgICAgICAgICAgbGV2ZWxOb2RlLnNldFBvc2l0aW9uKGNjLnYyXHJcbiAgICAgICAgICAgICAgICAoKG5vZGUuZ2V0UG9zaXRpb24oKS54ICsgbm9kZS5nZXRDaGlsZEJ5TmFtZShcImhwXCIpLmdldFBvc2l0aW9uKCkueCkqIG5vZGUuc2NhbGUsXHJcbiAgICAgICAgICAgICAgICAobm9kZS5nZXRQb3NpdGlvbigpLnkgKyBub2RlLmdldENoaWxkQnlOYW1lKFwiaHBcIikuZ2V0UG9zaXRpb24oKS55KSogbm9kZS5zY2FsZSkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=