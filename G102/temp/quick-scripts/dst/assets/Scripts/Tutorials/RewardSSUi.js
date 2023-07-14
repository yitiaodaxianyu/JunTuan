
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Tutorials/RewardSSUi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '72db3uva4xAFqg3rC7emOB+', 'RewardSSUi');
// Scripts/Tutorials/RewardSSUi.ts

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
var Constants_1 = require("../Constants");
var GameManager_1 = require("../GameManager");
var HeroManager_1 = require("../Hero/Data/HeroManager");
var HeroConfig_1 = require("../Hero/Game/HeroConfig");
var MissionLevel_1 = require("../Level/MissionLevel");
var FollowConstants_1 = require("../multiLanguage/FollowConstants");
var FollowManager_1 = require("../multiLanguage/FollowManager");
var TextLanguage_1 = require("../multiLanguage/TextLanguage");
var ImagerLanguage_1 = require("../Multilingual/ImagerLanguage");
var PropManager_1 = require("../Prop/PropManager");
var AudioConstants_1 = require("../Sound/AudioConstants");
var StoreHeroShowUi_1 = require("../Store/StoreHeroShowUi");
var UIComponent_1 = require("../UI/UIComponent");
var UIConfig_1 = require("../UI/UIConfig");
var UIManager_1 = require("../UI/UIManager");
var TutorailsManager_1 = require("./TutorailsManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var RewardSSUi = /** @class */ (function (_super) {
    __extends(RewardSSUi, _super);
    function RewardSSUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**0:解锁展示，只能查看   1：挑战成功，可以选择 */
        _this.cur_mode = 0;
        _this.select_node = null;
        _this.cur_select_index = -1;
        _this.ss_id = [HeroConfig_1.Hero_Type.LeiShen, HeroConfig_1.Hero_Type.ANuBiSi, HeroConfig_1.Hero_Type.MeiMo];
        return _this;
        // update (dt) {}
    }
    RewardSSUi.prototype.initData = function (mode) {
        this.cur_mode = mode;
        var textLanguage = this.node.getChildByName("btnOk").getChildByName('TextLanguage').getComponent(TextLanguage_1.default);
        var titleImg = this.node.getChildByName('titleImg').getComponent(ImagerLanguage_1.default);
        var tipText = this.node.getChildByName('tipText').getComponent(TextLanguage_1.default);
        switch (this.cur_mode) {
            case 0:
                {
                    textLanguage.setTextId(310004);
                    titleImg.setTextId(15);
                    tipText.setTextId(310005);
                }
                break;
            case 1:
                {
                    textLanguage.setTextId(100001);
                    titleImg.setTextId(16);
                    tipText.setTextId(310003);
                }
                break;
        }
    };
    RewardSSUi.prototype.start = function () {
        this.select_node = this.node.getChildByName("select");
        this.select_node.active = false;
        this.refreshUi();
    };
    RewardSSUi.prototype.refreshUi = function () {
        switch (this.cur_mode) {
            case 0:
                {
                    this.select_node.active = false;
                    for (var i = 0; i < 3; i++) {
                        var card = this.node.getChildByName("card" + (i + 1));
                        card.scale = 0.84;
                    }
                }
                break;
            case 1:
                {
                    this.node.getChildByName("btnOk").active = this.cur_select_index >= 0;
                    for (var i = 0; i < 3; i++) {
                        var card = this.node.getChildByName("card" + (i + 1));
                        if (this.cur_select_index == i) {
                            card.scale = 1;
                            this.select_node.active = true;
                            this.select_node.setPosition(card.getPosition());
                        }
                        else {
                            card.scale = 0.84;
                        }
                    }
                }
                break;
        }
    };
    RewardSSUi.prototype.onBtnCardClick = function (btn, indexStr) {
        var index = parseInt(indexStr);
        switch (this.cur_mode) {
            case 0:
                {
                    //弹出详情
                    this.showHero(this.ss_id[index]);
                }
                break;
            case 1:
                {
                    if (this.cur_select_index != index) {
                        this.cur_select_index = index;
                        this.refreshUi();
                    }
                }
                break;
        }
    };
    RewardSSUi.prototype.onBtnOkClick = function () {
        switch (this.cur_mode) {
            case 0:
                {
                    //开始关卡
                    TutorailsManager_1.default.getInstance().saveTutorials(204);
                    FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.新手引导 + 204);
                    GameManager_1.default.getInstance().fighting_info = MissionLevel_1.MissionLevelManager.getInstance().getFightingInfo(1);
                    GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
                    cc.director.loadScene(Constants_1.GameScene.game);
                }
                break;
            case 1:
                {
                    //获得英雄
                    if (this.cur_select_index >= 0) {
                        var id = this.ss_id[this.cur_select_index];
                        PropManager_1.PropManager.getInstance().changePropNum(id + 110000, 1);
                        if (GameManager_1.default.getInstance().cur_game_scene == Constants_1.GameScene.game) {
                            //看看有没有空位插进去.
                            var teamList = HeroManager_1.HeroManager.getInstance().getTeamList(Constants_1.GameMode.Main);
                            for (var i = 0; i < teamList.length; i++) {
                                var heroId = teamList[i];
                                if (heroId < HeroConfig_1.Hero_Type.NULL) {
                                    if (teamList.indexOf(id) == -1) {
                                        teamList[i] = id;
                                        HeroManager_1.HeroManager.getInstance().saveTeamList(Constants_1.GameMode.Main, teamList);
                                        HeroManager_1.HeroManager.getInstance().loadHeroData(id);
                                        GameManager_1.default.getInstance().loadGameHeroData();
                                        GameManager_1.default.getInstance().game.loadHero(id, i);
                                        break;
                                    }
                                }
                            }
                        }
                        HeroManager_1.HeroManager.getInstance().reportHeroList();
                        TutorailsManager_1.default.getInstance().saveTutorials(205);
                        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.新手引导 + 205);
                        this.onClose();
                    }
                }
                break;
        }
    };
    RewardSSUi.prototype.showHero = function (heroId) {
        UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.StoreHeroShowUi, UIConfig_1.UILayerLevel.Three, { onCompleted: function (uiNode) {
                uiNode.getComponent(StoreHeroShowUi_1.default).init({
                    onClose: function () {
                    }
                });
                uiNode.getComponent(StoreHeroShowUi_1.default).initData(heroId, false);
            } });
    };
    RewardSSUi = __decorate([
        ccclass
    ], RewardSSUi);
    return RewardSSUi;
}(UIComponent_1.default));
exports.default = RewardSSUi;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVHV0b3JpYWxzXFxSZXdhcmRTU1VpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDBDQUFtRDtBQUNuRCw4Q0FBeUM7QUFDekMsd0RBQXVEO0FBQ3ZELHNEQUFvRDtBQUNwRCxzREFBNEQ7QUFDNUQsb0VBQStEO0FBQy9ELGdFQUEyRDtBQUMzRCw4REFBeUQ7QUFDekQsaUVBQTREO0FBQzVELG1EQUFrRDtBQUNsRCwwREFBcUQ7QUFDckQsNERBQXVEO0FBQ3ZELGlEQUE0QztBQUM1QywyQ0FBc0Q7QUFDdEQsNkNBQTRDO0FBQzVDLHVEQUFrRDtBQUc1QyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUF3Qyw4QkFBVztJQUFuRDtRQUFBLHFFQStIQztRQTdIRywrQkFBK0I7UUFDL0IsY0FBUSxHQUFRLENBQUMsQ0FBQztRQUVsQixpQkFBVyxHQUFTLElBQUksQ0FBQztRQUN6QixzQkFBZ0IsR0FBUSxDQUFDLENBQUMsQ0FBQztRQUMzQixXQUFLLEdBQVUsQ0FBQyxzQkFBUyxDQUFDLE9BQU8sRUFBQyxzQkFBUyxDQUFDLE9BQU8sRUFBQyxzQkFBUyxDQUFDLEtBQUssQ0FBQyxDQUFDOztRQXVIckUsaUJBQWlCO0lBQ3JCLENBQUM7SUF0SEcsNkJBQVEsR0FBUixVQUFTLElBQVc7UUFDaEIsSUFBSSxDQUFDLFFBQVEsR0FBQyxJQUFJLENBQUM7UUFDbkIsSUFBSSxZQUFZLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxzQkFBWSxDQUFDLENBQUM7UUFDN0csSUFBSSxRQUFRLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUMs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Q0FBQzt3QkFDOUQsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO3FCQUNsQjtpQkFDSjtnQkFBQSxNQUFNO1NBQ1Y7SUFDTCxDQUFDO0lBRUQsNkJBQVEsR0FBUixVQUFTLE1BQWdCO1FBQ3JCLHFCQUFTLENBQUMsV0FBVyxFQUFFLENBQUMsWUFBWSxDQUFDLGlCQUFNLENBQUMsZUFBZSxFQUFDLHVCQUFZLENBQUMsS0FBSyxFQUFDLEVBQUMsV0FBVyxFQUFDLFVBQUMsTUFBTTtnQkFDL0YsTUFBTSxDQUFDLFlBQVksQ0FBQyx5QkFBZSxDQUFDLENBQUMsSUFBSSxDQUFDO29CQUN0QyxPQUFPLEVBQUM7b0JBRVIsQ0FBQztpQkFDSixDQUFDLENBQUM7Z0JBQ0gsTUFBTSxDQUFDLFlBQVksQ0FBQyx5QkFBZSxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBQyxLQUFLLENBQUMsQ0FBQztZQUNoRSxDQUFDLEVBQUMsQ0FBQyxDQUFDO0lBQ1IsQ0FBQztJQTdIZ0IsVUFBVTtRQUQ5QixPQUFPO09BQ2EsVUFBVSxDQStIOUI7SUFBRCxpQkFBQztDQS9IRCxBQStIQyxDQS9IdUMscUJBQVcsR0ErSGxEO2tCQS9Ib0IsVUFBVSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdhbWVNb2RlLCBHYW1lU2NlbmUgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgSGVyb01hbmFnZXIgfSBmcm9tIFwiLi4vSGVyby9EYXRhL0hlcm9NYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEhlcm9fVHlwZSB9IGZyb20gXCIuLi9IZXJvL0dhbWUvSGVyb0NvbmZpZ1wiO1xyXG5pbXBvcnQgeyBNaXNzaW9uTGV2ZWxNYW5hZ2VyIH0gZnJvbSBcIi4uL0xldmVsL01pc3Npb25MZXZlbFwiO1xyXG5pbXBvcnQgeyBGb2xsb3dfVHlwZSB9IGZyb20gXCIuLi9tdWx0aUxhbmd1YWdlL0ZvbGxvd0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgRm9sbG93TWFuYWdlciBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dNYW5hZ2VyXCI7XHJcbmltcG9ydCBUZXh0TGFuZ3VhZ2UgZnJvbSBcIi4uL211bHRpTGFuZ3VhZ2UvVGV4dExhbmd1YWdlXCI7XHJcbmltcG9ydCBJbWFnZXJMYW5ndWFnZSBmcm9tIFwiLi4vTXVsdGlsaW5ndWFsL0ltYWdlckxhbmd1YWdlXCI7XHJcbmltcG9ydCB7IFByb3BNYW5hZ2VyIH0gZnJvbSBcIi4uL1Byb3AvUHJvcE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU291bmRJbmRleCB9IGZyb20gXCIuLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgU3RvcmVIZXJvU2hvd1VpIGZyb20gXCIuLi9TdG9yZS9TdG9yZUhlcm9TaG93VWlcIjtcclxuaW1wb3J0IFVJQ29tcG9uZW50IGZyb20gXCIuLi9VSS9VSUNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBVSVBhdGgsIFVJTGF5ZXJMZXZlbCB9IGZyb20gXCIuLi9VSS9VSUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBVSU1hbmFnZXIgfSBmcm9tIFwiLi4vVUkvVUlNYW5hZ2VyXCI7XHJcbmltcG9ydCBUdXRvcmFpbHNNYW5hZ2VyIGZyb20gXCIuL1R1dG9yYWlsc01hbmFnZXJcIjtcclxuXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJld2FyZFNTVWkgZXh0ZW5kcyBVSUNvbXBvbmVudCB7XHJcblxyXG4gICAgLyoqMDrop6PplIHlsZXnpLrvvIzlj6rog73mn6XnnIsgICAx77ya5oyR5oiY5oiQ5Yqf77yM5Y+v5Lul6YCJ5oupICovXHJcbiAgICBjdXJfbW9kZTpudW1iZXI9MDtcclxuXHJcbiAgICBzZWxlY3Rfbm9kZTpjYy5Ob2RlPW51bGw7XHJcbiAgICBjdXJfc2VsZWN0X2luZGV4Om51bWJlcj0tMTtcclxuICAgIHNzX2lkOm51bWJlcltdPVtIZXJvX1R5cGUuTGVpU2hlbixIZXJvX1R5cGUuQU51QmlTaSxIZXJvX1R5cGUuTWVpTW9dO1xyXG5cclxuICAgIGluaXREYXRhKG1vZGU6bnVtYmVyKXtcclxuICAgICAgICB0aGlzLmN1cl9tb2RlPW1vZGU7XHJcbiAgICAgICAgbGV0IHRleHRMYW5ndWFnZT10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJidG5Pa1wiKS5nZXRDaGlsZEJ5TmFtZSgnVGV4dExhbmd1YWdlJykuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSk7XHJcbiAgICAgICAgbGV0IHRpdGxlSW1nPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgndGl0bGVJbWcnKS5nZXRDb21wb25lbnQoSW1hZ2VyTGFuZ3VhZ2UpO1xyXG4gICAgICAgIGxldCB0aXBUZXh0PXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgndGlwVGV4dCcpLmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpO1xyXG4gICAgICAgIHN3aXRjaCh0aGlzLmN1cl9tb2RlKXtcclxuICAgICAgICAgICAgY2FzZSAwOntcclxuICAgICAgICAgICAgICAgIHRleHRMYW5ndWFnZS5zZXRUZXh0SWQoMzEwMDA0KTtcclxuICAgICAgICAgICAgICAgIHRpdGxlSW1nLnNldFRleHRJZCgxNSk7XHJcbiAgICAgICAgICAgICAgICB0aXBUZXh0LnNldFRleHRJZCgzMTAwMDUpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMTp7XHJcbiAgICAgICAgICAgICAgICB0ZXh0TGFuZ3VhZ2Uuc2V0VGV4dElkKDEwMDAwMSk7XHJcbiAgICAgICAgICAgICAgICB0aXRsZUltZy5zZXRUZXh0SWQoMTYpO1xyXG4gICAgICAgICAgICAgICAgdGlwVGV4dC5zZXRUZXh0SWQoMzEwMDAzKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGFydCAoKSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3Rfbm9kZT10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzZWxlY3RcIik7XHJcbiAgICAgICAgdGhpcy5zZWxlY3Rfbm9kZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoVWkoKTtcclxuICAgIH1cclxuXHJcbiAgICByZWZyZXNoVWkoKXtcclxuICAgICAgICBzd2l0Y2godGhpcy5jdXJfbW9kZSl7XHJcbiAgICAgICAgICAgIGNhc2UgMDp7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdF9ub2RlLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPDM7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNhcmQ9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiY2FyZFwiKyhpKzEpKTtcclxuICAgICAgICAgICAgICAgICAgICBjYXJkLnNjYWxlPTAuODQ7XHJcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMTp7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJidG5Pa1wiKS5hY3RpdmU9dGhpcy5jdXJfc2VsZWN0X2luZGV4Pj0wO1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8MzsgaSsrKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY2FyZD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJjYXJkXCIrKGkrMSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuY3VyX3NlbGVjdF9pbmRleD09aSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcmQuc2NhbGU9MTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rfbm9kZS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rfbm9kZS5zZXRQb3NpdGlvbihjYXJkLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXJkLnNjYWxlPTAuODQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgb25CdG5DYXJkQ2xpY2soYnRuOmNjLkV2ZW50LkV2ZW50VG91Y2gsaW5kZXhTdHI6c3RyaW5nKXtcclxuICAgICAgICBsZXQgaW5kZXg9cGFyc2VJbnQoaW5kZXhTdHIpO1xyXG4gICAgICAgIHN3aXRjaCh0aGlzLmN1cl9tb2RlKXtcclxuICAgICAgICAgICAgY2FzZSAwOntcclxuICAgICAgICAgICAgICAgIC8v5by55Ye66K+m5oOFXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dIZXJvKHRoaXMuc3NfaWRbaW5kZXhdKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDE6e1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5jdXJfc2VsZWN0X2luZGV4IT1pbmRleCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJfc2VsZWN0X2luZGV4PWluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaFVpKCk7XHJcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uQnRuT2tDbGljaygpe1xyXG4gICAgICAgIHN3aXRjaCh0aGlzLmN1cl9tb2RlKXtcclxuICAgICAgICAgICAgY2FzZSAwOntcclxuICAgICAgICAgICAgICAgIC8v5byA5aeL5YWz5Y2hXHJcbiAgICAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMDQpO1xyXG4gICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuaWsOaJi+W8leWvvCsyMDQpO1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5maWdodGluZ19pbmZvPU1pc3Npb25MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGaWdodGluZ0luZm8oMSk7XHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKEdhbWVTY2VuZS5nYW1lKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDE6eyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8v6I635b6X6Iux6ZuEXHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmN1cl9zZWxlY3RfaW5kZXg+PTApe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpZD10aGlzLnNzX2lkW3RoaXMuY3VyX3NlbGVjdF9pbmRleF07XHJcbiAgICAgICAgICAgICAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKGlkKzExMDAwMCwxKTtcclxuICAgICAgICAgICAgICAgICAgICBpZihHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX3NjZW5lPT1HYW1lU2NlbmUuZ2FtZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v55yL55yL5pyJ5rKh5pyJ56m65L2N5o+S6L+b5Y67LlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGVhbUxpc3Q9SGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRUZWFtTGlzdChHYW1lTW9kZS5NYWluKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8dGVhbUxpc3QubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGhlcm9JZD10ZWFtTGlzdFtpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGhlcm9JZDxIZXJvX1R5cGUuTlVMTCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodGVhbUxpc3QuaW5kZXhPZihpZCk9PS0xKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVhbUxpc3RbaV09aWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVRlYW1MaXN0KEdhbWVNb2RlLk1haW4sdGVhbUxpc3QpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmxvYWRIZXJvRGF0YShpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZEdhbWVIZXJvRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdhbWUubG9hZEhlcm8oaWQsaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkucmVwb3J0SGVyb0xpc3QoKTtcclxuICAgICAgICAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMDUpO1xyXG4gICAgICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7mlrDmiYvlvJXlr7wrMjA1KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uQ2xvc2UoKTtcclxuICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNob3dIZXJvKGhlcm9JZDpIZXJvX1R5cGUpe1xyXG4gICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguU3RvcmVIZXJvU2hvd1VpLFVJTGF5ZXJMZXZlbC5UaHJlZSx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PntcclxuICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChTdG9yZUhlcm9TaG93VWkpLmluaXQoe1xyXG4gICAgICAgICAgICAgICAgb25DbG9zZTooKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChTdG9yZUhlcm9TaG93VWkpLmluaXREYXRhKGhlcm9JZCxmYWxzZSk7XHJcbiAgICAgICAgfX0pOyBcclxuICAgIH1cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XHJcbn1cclxuIl19