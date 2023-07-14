"use strict";
cc._RF.push(module, '2f8b1r3U29J645d6vKN4e3t', 'MazeFightingUi');
// Scripts/Maze/MazeFightingUi.ts

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
var GameManager_1 = require("../GameManager");
var MonsterConfigure_1 = require("../Monster/Data/MonsterConfigure");
var MonsterIconManager_1 = require("../Monster/MonsterIconManager");
var FollowConstants_1 = require("../multiLanguage/FollowConstants");
var FollowManager_1 = require("../multiLanguage/FollowManager");
var LanguageManager_1 = require("../multiLanguage/LanguageManager");
var PropManager_1 = require("../Prop/PropManager");
var AudioConstants_1 = require("../Sound/AudioConstants");
var ToPlayMainUi_1 = require("../UI/home/ToPlayMainUi");
var UIComponent_1 = require("../UI/UIComponent");
var UIConfig_1 = require("../UI/UIConfig");
var UIManager_1 = require("../UI/UIManager");
var RogueHexagonTypes_1 = require("../copy/voidcrack/RogueHexagonTypes");
var RogueReward_1 = require("./Data/RogueReward");
var RogueText_1 = require("./Data/RogueText");
var MazeManager_1 = require("./MazeManager");
var MazeUi_1 = require("./MazeUi");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MazeFightingUi = /** @class */ (function (_super) {
    __extends(MazeFightingUi, _super);
    function MazeFightingUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**格子id */
        _this.box_id = 10032;
        _this.sp_icon = [];
        _this.is_can_go = false;
        return _this;
    }
    MazeFightingUi.prototype.initData = function (id, isCanGo) {
        this.box_id = id;
        this.is_can_go = isCanGo;
        this.initUi();
    };
    MazeFightingUi.prototype.initUi = function () {
        this.node.getChildByName('btnYes').active = this.is_can_go;
        //标题
        var type = RogueHexagonTypes_1.RogueHexagonTypesManager.getInstance().getHexagonType(this.box_id);
        var jsonData = RogueText_1.RogueTextManager.getInstance().getJsonRogueText(type);
        var titleLabel = this.node.getChildByName('titleLabel');
        titleLabel.getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(jsonData.Roguetitle_ID);
        var iconIndex = 0;
        switch (type) {
            case 1:
                {
                    iconIndex = 0;
                }
                break;
            case 2:
                {
                    iconIndex = 1;
                }
                break;
            case 6:
                {
                    iconIndex = 2;
                }
                break;
        }
        var icon = this.node.getChildByName('icon').getComponent(cc.Sprite);
        icon.spriteFrame = this.sp_icon[iconIndex];
        this.initItemList();
        this.initMonsterList();
    };
    MazeFightingUi.prototype.initItemList = function () {
        var rewadDatas = RogueReward_1.RogueRewardManager.getInstance().getRewardDatas(this.box_id);
        var content = this.node.getChildByName('rewardsScrollView').getComponent(cc.ScrollView).content;
        for (var i = 0; i < rewadDatas.length; i++) {
            var rd = rewadDatas[i];
            var item = PropManager_1.PropManager.getInstance().createPropItem(rd.reward_id, rd.reward_num);
            content.addChild(item);
        }
    };
    MazeFightingUi.prototype.initMonsterList = function () {
        var content = this.node.getChildByName('monsterScrollView').getComponent(cc.ScrollView).content;
        //获得关卡信息,怪物种类
        var monsterInfoList = MazeManager_1.MazeManager.getInstance().getFightingInfo(this.box_id).getOnlyMonsterDataList();
        monsterInfoList.sort(function (a, b) {
            var aType = MonsterConfigure_1.MonsterConfigureManager.getInstance().getStrengthType(a.id);
            var bType = MonsterConfigure_1.MonsterConfigureManager.getInstance().getStrengthType(b.id);
            return bType - aType;
        });
        monsterInfoList.forEach(function (data, key) {
            //cc.log(data.id);
            var icon = MonsterIconManager_1.MonsterIconManager.getInstance().createMonsterIcon(data.id, data.level);
            icon.anchorY = 0;
            content.addChild(icon);
        });
    };
    MazeFightingUi.prototype.clickBtnYes = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        if (this.is_can_go) {
            if (MazeManager_1.MazeManager.getInstance().getMazeHp() > 0) {
                if (MazeManager_1.MazeManager.getInstance().getFightingId() != this.box_id) {
                    FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.rogue玩法战斗事件);
                    MazeManager_1.MazeManager.getInstance().setFightingId(this.box_id);
                    MazeUi_1.default.getInstance().refreshFloor();
                    // UIManager.getInstance().showMapUi({onRefresh:()=>{
                    //     MazeUi.getInstance().node.removeFromParent();
                    // }});
                    UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.ToPlay, UIConfig_1.UILayerLevel.One, { onCompleted: function (uiNode) {
                            uiNode.getComponent(ToPlayMainUi_1.default).init({ onRefresh: function () {
                                    MazeUi_1.default.getInstance().node.removeFromParent();
                                } });
                        }, });
                }
                else {
                    // UIManager.getInstance().showMapUi({onRefresh:()=>{
                    //     MazeUi.getInstance().node.removeFromParent();
                    // }});
                    UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.ToPlay, UIConfig_1.UILayerLevel.One, { onCompleted: function (uiNode) {
                            uiNode.getComponent(ToPlayMainUi_1.default).init({ onRefresh: function () {
                                    MazeUi_1.default.getInstance().node.removeFromParent();
                                } });
                        }, });
                    //MazeManager.getInstance().setPassingId(this.box_id);
                }
            }
            else {
                GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getStrByTextId(830024));
            }
        }
        _super.prototype.onClose.call(this);
    };
    MazeFightingUi.prototype.clickBtnNo = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        _super.prototype.onClose.call(this);
    };
    __decorate([
        property([cc.SpriteFrame])
    ], MazeFightingUi.prototype, "sp_icon", void 0);
    MazeFightingUi = __decorate([
        ccclass
    ], MazeFightingUi);
    return MazeFightingUi;
}(UIComponent_1.default));
exports.default = MazeFightingUi;

cc._RF.pop();