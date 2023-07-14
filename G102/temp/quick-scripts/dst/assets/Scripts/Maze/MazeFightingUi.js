
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Maze/MazeFightingUi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTWF6ZVxcTWF6ZUZpZ2h0aW5nVWkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOENBQXlDO0FBQ3pDLHFFQUEyRTtBQUMzRSxvRUFBbUU7QUFDbkUsb0VBQStEO0FBQy9ELGdFQUEyRDtBQUMzRCxvRUFBK0Q7QUFDL0QsbURBQWtEO0FBQ2xELDBEQUFxRDtBQUNyRCx3REFBbUQ7QUFDbkQsaURBQTRDO0FBQzVDLDJDQUFzRDtBQUN0RCw2Q0FBNEM7QUFDNUMseUVBQStFO0FBQy9FLGtEQUF3RDtBQUN4RCw4Q0FBb0Q7QUFDcEQsNkNBQTRDO0FBQzVDLG1DQUE4QjtBQUd4QixJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUE0QyxrQ0FBVztJQUF2RDtRQUFBLHFFQXdHQztRQXZHRyxVQUFVO1FBQ1YsWUFBTSxHQUFRLEtBQUssQ0FBQztRQUVwQixhQUFPLEdBQWtCLEVBQUUsQ0FBQztRQUM1QixlQUFTLEdBQVMsS0FBSyxDQUFDOztJQW1HNUIsQ0FBQztJQWpHRyxpQ0FBUSxHQUFSLFVBQVMsRUFBUyxFQUFDLE9BQWU7UUFDOUIsSUFBSSxDQUFDLE1BQU0sR0FBQyxFQUFFLENBQUM7UUFDZixJQUFJLENBQUMsU0FBUyxHQUFDLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDbEIsQ0FBQztJQUVELCtCQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUN6RCxJQUFJO1FBQ0osSUFBSSxJQUFJLEdBQUMsNENBQXdCLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM1RSxJ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b3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBNb25zdGVyQ29uZmlndXJlTWFuYWdlciB9IGZyb20gXCIuLi9Nb25zdGVyL0RhdGEvTW9uc3RlckNvbmZpZ3VyZVwiO1xyXG5pbXBvcnQgeyBNb25zdGVySWNvbk1hbmFnZXIgfSBmcm9tIFwiLi4vTW9uc3Rlci9Nb25zdGVySWNvbk1hbmFnZXJcIjtcclxuaW1wb3J0IHsgRm9sbG93X1R5cGUgfSBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dDb25zdGFudHNcIjtcclxuaW1wb3J0IEZvbGxvd01hbmFnZXIgZnJvbSBcIi4uL211bHRpTGFuZ3VhZ2UvRm9sbG93TWFuYWdlclwiO1xyXG5pbXBvcnQgTGFuZ3VhZ2VNYW5hZ2VyIGZyb20gXCIuLi9tdWx0aUxhbmd1YWdlL0xhbmd1YWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBQcm9wTWFuYWdlciB9IGZyb20gXCIuLi9Qcm9wL1Byb3BNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFNvdW5kSW5kZXggfSBmcm9tIFwiLi4vU291bmQvQXVkaW9Db25zdGFudHNcIjtcclxuaW1wb3J0IFRvUGxheU1haW5VaSBmcm9tIFwiLi4vVUkvaG9tZS9Ub1BsYXlNYWluVWlcIjtcclxuaW1wb3J0IFVJQ29tcG9uZW50IGZyb20gXCIuLi9VSS9VSUNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBVSVBhdGgsIFVJTGF5ZXJMZXZlbCB9IGZyb20gXCIuLi9VSS9VSUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBVSU1hbmFnZXIgfSBmcm9tIFwiLi4vVUkvVUlNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFJvZ3VlSGV4YWdvblR5cGVzTWFuYWdlciB9IGZyb20gXCIuLi9jb3B5L3ZvaWRjcmFjay9Sb2d1ZUhleGFnb25UeXBlc1wiO1xyXG5pbXBvcnQgeyBSb2d1ZVJld2FyZE1hbmFnZXIgfSBmcm9tIFwiLi9EYXRhL1JvZ3VlUmV3YXJkXCI7XHJcbmltcG9ydCB7IFJvZ3VlVGV4dE1hbmFnZXIgfSBmcm9tIFwiLi9EYXRhL1JvZ3VlVGV4dFwiO1xyXG5pbXBvcnQgeyBNYXplTWFuYWdlciB9IGZyb20gXCIuL01hemVNYW5hZ2VyXCI7XHJcbmltcG9ydCBNYXplVWkgZnJvbSBcIi4vTWF6ZVVpXCI7XHJcblxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYXplRmlnaHRpbmdVaSBleHRlbmRzIFVJQ29tcG9uZW50IHtcclxuICAgIC8qKuagvOWtkGlkICovXHJcbiAgICBib3hfaWQ6bnVtYmVyPTEwMDMyO1xyXG4gICAgQHByb3BlcnR5KFtjYy5TcHJpdGVGcmFtZV0pXHJcbiAgICBzcF9pY29uOmNjLlNwcml0ZUZyYW1lW109W107XHJcbiAgICBpc19jYW5fZ286Ym9vbGVhbj1mYWxzZTsgICAgXHJcblxyXG4gICAgaW5pdERhdGEoaWQ6bnVtYmVyLGlzQ2FuR286Ym9vbGVhbil7XHJcbiAgICAgICAgdGhpcy5ib3hfaWQ9aWQ7XHJcbiAgICAgICAgdGhpcy5pc19jYW5fZ289aXNDYW5HbzsgIFxyXG4gICAgICAgIHRoaXMuaW5pdFVpKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGluaXRVaSgpe1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnYnRuWWVzJykuYWN0aXZlPXRoaXMuaXNfY2FuX2dvO1xyXG4gICAgICAgIC8v5qCH6aKYXHJcbiAgICAgICAgbGV0IHR5cGU9Um9ndWVIZXhhZ29uVHlwZXNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGV4YWdvblR5cGUodGhpcy5ib3hfaWQpO1xyXG4gICAgICAgIGxldCBqc29uRGF0YT1Sb2d1ZVRleHRNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvblJvZ3VlVGV4dCh0eXBlKTtcclxuICAgICAgICBsZXQgdGl0bGVMYWJlbD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3RpdGxlTGFiZWwnKTtcclxuICAgICAgICB0aXRsZUxhYmVsLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPUxhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKGpzb25EYXRhLlJvZ3VldGl0bGVfSUQpO1xyXG4gICAgICAgIGxldCBpY29uSW5kZXg9MDtcclxuICAgICAgICBzd2l0Y2godHlwZSl7XHJcbiAgICAgICAgICAgIGNhc2UgMTp7XHJcbiAgICAgICAgICAgICAgICBpY29uSW5kZXg9MDtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6e1xyXG4gICAgICAgICAgICAgICAgaWNvbkluZGV4PTE7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSA2OntcclxuICAgICAgICAgICAgICAgIGljb25JbmRleD0yO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBpY29uPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnaWNvbicpLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG4gICAgICAgIGljb24uc3ByaXRlRnJhbWU9dGhpcy5zcF9pY29uW2ljb25JbmRleF07XHJcbiAgICAgICAgdGhpcy5pbml0SXRlbUxpc3QoKTtcclxuICAgICAgICB0aGlzLmluaXRNb25zdGVyTGlzdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRJdGVtTGlzdCgpeyAgICAgICAgXHJcbiAgICAgICAgbGV0IHJld2FkRGF0YXM9Um9ndWVSZXdhcmRNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UmV3YXJkRGF0YXModGhpcy5ib3hfaWQpO1xyXG4gICAgICAgIGxldCBjb250ZW50PXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgncmV3YXJkc1Njcm9sbFZpZXcnKS5nZXRDb21wb25lbnQoY2MuU2Nyb2xsVmlldykuY29udGVudDtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTxyZXdhZERhdGFzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IHJkPXJld2FkRGF0YXNbaV07XHJcbiAgICAgICAgICAgIGxldCBpdGVtPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0ocmQucmV3YXJkX2lkLHJkLnJld2FyZF9udW0pO1xyXG4gICAgICAgICAgICBjb250ZW50LmFkZENoaWxkKGl0ZW0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpbml0TW9uc3Rlckxpc3QoKXtcclxuICAgICAgICBsZXQgY29udGVudD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ21vbnN0ZXJTY3JvbGxWaWV3JykuZ2V0Q29tcG9uZW50KGNjLlNjcm9sbFZpZXcpLmNvbnRlbnQ7XHJcbiAgICAgICAgLy/ojrflvpflhbPljaHkv6Hmga8s5oCq54mp56eN57G7XHJcbiAgICAgICAgbGV0IG1vbnN0ZXJJbmZvTGlzdD1NYXplTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEZpZ2h0aW5nSW5mbyh0aGlzLmJveF9pZCkuZ2V0T25seU1vbnN0ZXJEYXRhTGlzdCgpO1xyXG4gICAgICAgIG1vbnN0ZXJJbmZvTGlzdC5zb3J0KChhLGIpPT57XHJcbiAgICAgICAgICAgIGxldCBhVHlwZT1Nb25zdGVyQ29uZmlndXJlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0cmVuZ3RoVHlwZShhLmlkKTtcclxuICAgICAgICAgICAgbGV0IGJUeXBlPU1vbnN0ZXJDb25maWd1cmVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyZW5ndGhUeXBlKGIuaWQpO1xyXG4gICAgICAgICAgICByZXR1cm4gYlR5cGUtYVR5cGVcclxuICAgICAgICB9KVxyXG4gICAgICAgIG1vbnN0ZXJJbmZvTGlzdC5mb3JFYWNoKChkYXRhLGtleSk9PntcclxuICAgICAgICAgICAgLy9jYy5sb2coZGF0YS5pZCk7XHJcbiAgICAgICAgICAgIGxldCBpY29uPU1vbnN0ZXJJY29uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZU1vbnN0ZXJJY29uKGRhdGEuaWQsZGF0YS5sZXZlbCk7XHJcbiAgICAgICAgICAgIGljb24uYW5jaG9yWT0wO1xyXG4gICAgICAgICAgICBjb250ZW50LmFkZENoaWxkKGljb24pO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5ZZXMoKXtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIGlmKHRoaXMuaXNfY2FuX2dvKXtcclxuICAgICAgICAgICAgaWYoTWF6ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYXplSHAoKT4wKXtcclxuICAgICAgICAgICAgICAgIGlmKE1hemVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RmlnaHRpbmdJZCgpIT10aGlzLmJveF9pZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLnJvZ3Vl546p5rOV5oiY5paX5LqL5Lu2KTtcclxuICAgICAgICAgICAgICAgICAgICBNYXplTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEZpZ2h0aW5nSWQodGhpcy5ib3hfaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIE1hemVVaS5nZXRJbnN0YW5jZSgpLnJlZnJlc2hGbG9vcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNYXBVaSh7b25SZWZyZXNoOigpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIE1hemVVaS5nZXRJbnN0YW5jZSgpLm5vZGUucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIH19KTtcclxuICAgICAgICAgICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLlRvUGxheSxVSUxheWVyTGV2ZWwuT25lLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChUb1BsYXlNYWluVWkpLmluaXQoe29uUmVmcmVzaDooKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTWF6ZVVpLmdldEluc3RhbmNlKCkubm9kZS5yZW1vdmVGcm9tUGFyZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH19KTtcclxuICAgICAgICAgICAgICAgICAgICB9LH0pXHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAvLyBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWFwVWkoe29uUmVmcmVzaDooKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBNYXplVWkuZ2V0SW5zdGFuY2UoKS5ub2RlLnJlbW92ZUZyb21QYXJlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyB9fSk7XHJcbiAgICAgICAgICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5Ub1BsYXksVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoVG9QbGF5TWFpblVpKS5pbml0KHtvblJlZnJlc2g6KCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1hemVVaS5nZXRJbnN0YW5jZSgpLm5vZGUucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9fSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSx9KVxyXG4gICAgICAgICAgICAgICAgICAgIC8vTWF6ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRQYXNzaW5nSWQodGhpcy5ib3hfaWQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoODMwMDI0KSk7XHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgc3VwZXIub25DbG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuTm8oKXtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIHN1cGVyLm9uQ2xvc2UoKTtcclxuICAgIH1cclxuICAgIFxyXG59XHJcbiJdfQ==