
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
        cc.resources.load(fightingInfo.bg_name, cc.SpriteFrame, function (error, assets) {
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
        cc.resources.load(path, cc.Prefab, function (error, assets) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVUlcXGhvbWVcXFRvUGxheVByZXZpZXdVaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4REFBb0U7QUFDcEUsOERBQW9FO0FBQ3BFLDZDQUF5RDtBQUN6RCxpREFBNEM7QUFDNUMseURBQXdEO0FBQ3hELHlEQUErRDtBQUMvRCxzREFBcUQ7QUFDckQsd0VBQThFO0FBRTlFLHlEQUErRTtBQUMvRSxxREFBMkQ7QUFDM0QseURBQW9EO0FBQ3BELDhDQUF5QztBQUduQyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUE2QyxtQ0FBVztJQUF4RDtRQUFBLHFFQTJIQztRQXhIRyxnQkFBVSxHQUFrQixJQUFJLENBQUM7UUFFakMsV0FBSyxHQUFVLENBQUMsQ0FBQztRQUNqQixlQUFTLEdBQVUsQ0FBQyxDQUFDOztJQXFIekIsQ0FBQztJQWpIYSwrQkFBSyxHQUFmO1FBQ0ksSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBRXJCLENBQUM7SUFFRCw4QkFBSSxHQUFKLFVBQUssSUFBYztRQUNmLGlCQUFNLElBQUksWUFBQyxJQUFJLENBQUMsQ0FBQztRQUVqQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVELG1DQUFTLEdBQVQ7UUFBQSxpQkEwQ0M7UUF4Q0csSUFBSSxLQUFLLEdBQUMsMkJBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUM7UUFFakQsSUFBSSxZQUFZLEdBQUMsSUFBSSx3QkFBWSxFQUFFLENBQUM7UUFDcEMsUUFBTyxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsRUFBQztZQUMzQyxLQUFLLG9CQUFRLENBQUMsSUFBSTtnQkFBQztvQkFDZixZQUFZLEdBQUMsa0NBQW1CLENBQUMsV0FBVyxFQUFFLENBQUMsZUFB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QyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRSxJQUFJLENBQUMsS0FBSyxFQUMvRSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUN6RixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUF0SEQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQzt1REFDUTtJQUhoQixlQUFlO1FBRG5DLE9BQU87T0FDYSxlQUFlLENBMkhuQztJQUFELHNCQUFDO0NBM0hELEFBMkhDLENBM0g0QyxxQkFBVyxHQTJIdkQ7a0JBM0hvQixlQUFlIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQm9zc0NoYWxsZW5nZU1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vQWN0aXZpdHkvQm9zc0NoYWxsZW5nZVwiO1xyXG5pbXBvcnQgeyBFbmRsZXNzTGV2ZWxzTWFuYWdlciB9IGZyb20gXCIuLi8uLi9BY3Rpdml0eS9FbmRsZXNzTGV2ZWxzXCI7XHJcbmltcG9ydCB7IEZpZ2h0aW5nSW5mbywgR2FtZU1vZGUgfSBmcm9tIFwiLi4vLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgTGV2ZWxNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0xldmVsL0xldmVsTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBNaXNzaW9uTGV2ZWxNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0xldmVsL01pc3Npb25MZXZlbFwiO1xyXG5pbXBvcnQgeyBNYXplTWFuYWdlciB9IGZyb20gXCIuLi8uLi9NYXplL01hemVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IE1vbnN0ZXJDb25maWd1cmVNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL01vbnN0ZXIvRGF0YS9Nb25zdGVyQ29uZmlndXJlXCI7XHJcbmltcG9ydCBNb25zdGVyIGZyb20gXCIuLi8uLi9Nb25zdGVyL01vbnN0ZXJcIjtcclxuaW1wb3J0IHsgTW9uc3RlckFjdGlvbk5hbWUsIE1vbnN0ZXJGYWNlTmFtZSB9IGZyb20gXCIuLi8uLi9Nb25zdGVyL01vbnN0ZXJEYXRhXCI7XHJcbmltcG9ydCB7IFRvd2VyTGV2ZWxNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL1Rvd2VyL1Rvd2VyTGV2ZWxcIjtcclxuaW1wb3J0IFRvd2VyTWFuYWdlciBmcm9tIFwiLi4vLi4vVG93ZXIvVG93ZXJNYW5hZ2VyXCI7XHJcbmltcG9ydCBVSUNvbXBvbmVudCBmcm9tIFwiLi4vVUlDb21wb25lbnRcIjtcclxuaW1wb3J0IHsgVWlBY3Rpb24gfSBmcm9tIFwiLi4vVWlJbnRlcmZhY2VcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9QbGF5UHJldmlld1VpIGV4dGVuZHMgVUlDb21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGVBdGxhcylcclxuICAgIHRvX3BsYXlfdWk6Y2MuU3ByaXRlQXRsYXMgPSBudWxsO1xyXG5cclxuICAgIGluZGV4Om51bWJlciA9IDA7XHJcbiAgICBib3NzSW5kZXg6bnVtYmVyID0gMDtcclxuXHJcblxyXG4gICAgXHJcbiAgICBwcm90ZWN0ZWQgc3RhcnQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoVWkoKTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBpbml0KHVpQWM6IFVpQWN0aW9uKSB7XHJcbiAgICAgICAgc3VwZXIuaW5pdCh1aUFjKTtcclxuXHJcbiAgICAgICAgdGhpcy5yZWZyZXNoVWkoKTtcclxuICAgIH1cclxuXHJcbiAgICByZWZyZXNoVWkoKXtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgbGV2ZWw9TGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc3RhcnRfbGV2ZWw7XHJcblxyXG4gICAgICAgIGxldCBmaWdodGluZ0luZm89bmV3IEZpZ2h0aW5nSW5mbygpO1xyXG4gICAgICAgIHN3aXRjaChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX21vZGUpe1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLk1haW46e1xyXG4gICAgICAgICAgICAgICAgZmlnaHRpbmdJbmZvPU1pc3Npb25MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGaWdodGluZ0luZm8obGV2ZWwpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuRW5kbGVzczp7XHJcbiAgICAgICAgICAgICAgICBmaWdodGluZ0luZm89RW5kbGVzc0xldmVsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGaWdodGluZ0luZm8oMSk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBHYW1lTW9kZS5Cb3NzX0NoYWxsZW5nZTp7XHJcbiAgICAgICAgICAgICAgICBmaWdodGluZ0luZm89Qm9zc0NoYWxsZW5nZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGaWdodGluZ0luZm8oQm9zc0NoYWxsZW5nZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfY2hhbGxlbmdlX21vZGUpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuTWF6ZTp7XHJcbiAgICAgICAgICAgICAgICBmaWdodGluZ0luZm89TWF6ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGaWdodGluZ0luZm8oKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLlRvd2VyOntcclxuICAgICAgICAgICAgICAgIGZpZ2h0aW5nSW5mbz1Ub3dlckxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEZpZ2h0aW5nSW5mbyhUb3dlck1hbmFnZXIuZ2V0VG93ZXJMZXZlbCgpKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmZpZ2h0aW5nX2luZm89ZmlnaHRpbmdJbmZvO1xyXG4gICAgICAgIGxldCBiZzE9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdiZzEnKTtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJsZXZlbExhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID1maWdodGluZ0luZm8udGl0bGVfbmFtZTtcclxuXHJcbiAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQoZmlnaHRpbmdJbmZvLmJnX25hbWUsY2MuU3ByaXRlRnJhbWUsKGVycm9yOiBFcnJvciwgYXNzZXRzOmNjLlNwcml0ZUZyYW1lKT0+e1xyXG4gICAgICAgICAgICBpZihlcnJvcilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJnMS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZT1hc3NldHM7XHJcbiAgICAgICAgfSk7ICAgICAgICBcclxuICAgICAgICBsZXQgbGlzdD1maWdodGluZ0luZm8uZ2V0T25seU1vbnN0ZXJEYXRhTGlzdCgpO1xyXG4gICAgICAgIGxpc3QuZm9yRWFjaCgodixrKT0+e1xyXG4gICAgICAgICAgICBpZighTW9uc3RlckNvbmZpZ3VyZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRKc29uTW9uc3RlckNvbmZpZ3VyZSh2LmlkKSl7XHJcbiAgICAgICAgICAgICAgICBjYy5sb2codi5pZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHR5cGU9TW9uc3RlckNvbmZpZ3VyZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNb25zdGVyQ2xhc3Modi5pZCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFByZWZhYihcIlwiICsgdHlwZSx2LmlkLHYubGV2ZWwpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBsb2FkUHJlZmFiKHR5cGU6c3RyaW5nLGtleSx2YWx1ZSl7XHJcbiAgICAgICAgbGV0IHBhdGggPSBcIm1vbnN0ZXIvdWkvTW9uc3Rlcl9cIiArIHR5cGU7XHJcbiAgICAgICAgbGV0IG5vZGU6Y2MuTm9kZSA9IG51bGw7XHJcbiAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQocGF0aCxjYy5QcmVmYWIsKGVycm9yOiBFcnJvciwgYXNzZXRzOmNjLlByZWZhYik9PnsgIFxyXG4gICAgICAgICAgICBpZihlcnJvcil7XHJcbiAgICAgICAgICAgICAgICBjYy5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG5vZGUgPSBjYy5pbnN0YW50aWF0ZShhc3NldHMpO1xyXG4gICAgICAgICAgICAvLyBub2RlLnJlbW92ZUNvbXBvbmVudChNb25zdGVyKTtcclxuICAgICAgICAgICAgLy8gbm9kZS5yZW1vdmVDb21wb25lbnQoY2MuUG9seWdvbkNvbGxpZGVyKVxyXG4gICAgICAgICAgICBsZXQgbGV2ZWxOb2RlID0gbmV3IGNjLk5vZGUoKTtcclxuICAgICAgICAgICAgbGV2ZWxOb2RlLmFkZENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy50b19wbGF5X3VpLmdldFNwcml0ZUZyYW1lKFwiUHJlcGFyZV9MZXZlbF9CZ1wiKVxyXG4gICAgICAgICAgICBsZXQgbGV2ZWxMYWJlbCA9IG5ldyBjYy5Ob2RlKCk7XHJcbiAgICAgICAgICAgIGxldmVsTGFiZWwuYWRkQ29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIkx2LlwiK3ZhbHVlO1xyXG4gICAgICAgICAgICBsZXZlbExhYmVsLmdldENvbXBvbmVudChjYy5MYWJlbCkuZm9udFNpemUgPSAyODtcclxuICAgICAgICAgICAgbGV2ZWxMYWJlbC5jb2xvciA9IGNjLmNvbG9yKDI1NSwyNTUsMjU1KTtcclxuICAgICAgICAgICAgbGV2ZWxMYWJlbC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLmVuYWJsZUJvbGQgPSB0cnVlO1xyXG4gICAgICAgICAgICBsZXZlbExhYmVsLmFkZENvbXBvbmVudChjYy5MYWJlbE91dGxpbmUpLmNvbG9yID0gY2MuY29sb3IoMjcsIDM1LCA1MilcclxuICAgICAgICAgICAgbGV2ZWxMYWJlbC5nZXRDb21wb25lbnQoY2MuTGFiZWxPdXRsaW5lKS53aWR0aCA9IDI7XHJcbiAgICAgICAgICAgIGxldmVsTGFiZWwucGFyZW50ID0gbGV2ZWxOb2RlO1xyXG4gICAgICAgICAgICBsZXZlbExhYmVsLnNldFBvc2l0aW9uKGNjLnYyKDAsMCkpO1xyXG4gICAgICAgICAgICBsZXZlbExhYmVsLmFuY2hvclkgPSAwLjQ7XHJcbiAgICAgICAgICAgIGlmKE1vbnN0ZXJDb25maWd1cmVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyZW5ndGhUeXBlKGtleSkgIT0gMyl7XHJcbiAgICAgICAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInBvc1wiK3RoaXMuaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgbGV2ZWxOb2RlLnBhcmVudCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInBvc1wiK3RoaXMuaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5zZXRQb3NpdGlvbihjYy52MigwLDApKTtcclxuICAgICAgICAgICAgICAgIGxldmVsTm9kZS5zZXRQb3NpdGlvbihjYy52MigwLDApKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5kZXgrKztcclxuICAgICAgICAgICAgICAgIGxldmVsTm9kZS5zY2FsZSA9IDAuNztcclxuICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5zZXRTa2luKE1vbnN0ZXJGYWNlTmFtZS5Gcm9udCArIE1vbnN0ZXJDb25maWd1cmVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U2tpbihrZXkpKTtcclxuICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5zZXRBbmltYXRpb24oMCxNb25zdGVyRmFjZU5hbWUuRnJvbnQgKyBcIl9cIiArIE1vbnN0ZXJBY3Rpb25OYW1lLklkbGUsdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgbGV0IGJvc3NJY29uID0gbmV3IGNjLk5vZGUoKTtcclxuICAgICAgICAgICAgICAgIGJvc3NJY29uLmFkZENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy50b19wbGF5X3VpLmdldFNwcml0ZUZyYW1lKFwiUHJlcGFyZV9JY29uX0Jvc3NcIilcclxuICAgICAgICAgICAgICAgIGJvc3NJY29uLnBhcmVudCA9IGxldmVsTm9kZTtcclxuICAgICAgICAgICAgICAgIGJvc3NJY29uLnNldFBvc2l0aW9uKGNjLnYyKC02MCwwKSk7XHJcbiAgICAgICAgICAgICAgICBib3NzSWNvbi5hbmNob3JZID0gMDtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJib3NzUG9zXCIrdGhpcy5ib3NzSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgbGV2ZWxOb2RlLnBhcmVudCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJvc3NQb3NcIit0aGlzLmJvc3NJbmRleCk7XHJcbiAgICAgICAgICAgICAgICBsZXZlbE5vZGUuc2V0UG9zaXRpb24oY2MudjIoMCwwKSk7XHJcbiAgICAgICAgICAgICAgICBub2RlLnNldFBvc2l0aW9uKGNjLnYyKDAsMCkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ib3NzSW5kZXgrKztcclxuICAgICAgICAgICAgICAgIC8vIGxldmVsTm9kZS5zY2FsZSA9IDAuNTtcclxuICAgICAgICAgICAgICAgIC8vIG5vZGUuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5zZXRTa2luKE1vbnN0ZXJGYWNlTmFtZS5TaWRlTCArIE1vbnN0ZXJDb25maWd1cmVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U2tpbihrZXkpKTtcclxuICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5zZXRBbmltYXRpb24oMCxcImlkbGVcIix0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBsZXZlbE5vZGUuc2V0UG9zaXRpb24obm9kZS5nZXRDaGlsZEJ5TmFtZShcImhwXCIpLmdldFBvc2l0aW9uKCkpXHJcbiAgICAgICAgICAgIC8vIGxldmVsTm9kZS5zZXRQb3NpdGlvbihjYy52MigwLDApKVxyXG4gICAgICAgICAgICBsZXZlbE5vZGUuYW5jaG9yWSA9IDA7XHJcbiAgICAgICAgICAgIG5vZGUuc2NhbGUgPSBNb25zdGVyQ29uZmlndXJlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNjYWxlKGtleSk7XHJcbiAgICAgICAgICAgIGxldmVsTm9kZS5zZXRQb3NpdGlvbihjYy52MlxyXG4gICAgICAgICAgICAgICAgKChub2RlLmdldFBvc2l0aW9uKCkueCArIG5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJocFwiKS5nZXRQb3NpdGlvbigpLngpKiBub2RlLnNjYWxlLFxyXG4gICAgICAgICAgICAgICAgKG5vZGUuZ2V0UG9zaXRpb24oKS55ICsgbm9kZS5nZXRDaGlsZEJ5TmFtZShcImhwXCIpLmdldFBvc2l0aW9uKCkueSkqIG5vZGUuc2NhbGUpKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19