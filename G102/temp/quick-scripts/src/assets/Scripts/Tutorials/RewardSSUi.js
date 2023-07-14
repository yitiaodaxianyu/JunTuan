"use strict";
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