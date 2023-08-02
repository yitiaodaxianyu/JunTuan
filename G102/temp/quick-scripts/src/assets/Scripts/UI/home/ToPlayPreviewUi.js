"use strict";
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