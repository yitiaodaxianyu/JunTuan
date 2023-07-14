"use strict";
cc._RF.push(module, '978b8i2axBKpIR8jCWCYA7k', 'GetHeroUi');
// Scripts/Hero/Ui/GetHeroUi.ts

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
var Constants_1 = require("../../Constants");
var GameManager_1 = require("../../GameManager");
var HeroManager_1 = require("../../Hero/Data/HeroManager");
var HeroConfig_1 = require("../../Hero/Game/HeroConfig");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var TutorailsManager_1 = require("../../Tutorials/TutorailsManager");
var UIComponent_1 = require("../../UI/UIComponent");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GetHeroUi = /** @class */ (function (_super) {
    __extends(GetHeroUi, _super);
    function GetHeroUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hero_type = HeroConfig_1.Hero_Type.ChangMaoShou;
        return _this;
    }
    GetHeroUi.prototype.initUi = function (heroType) {
        var _this = this;
        //设置头像
        var icon = this.node.getChildByName('mask').getChildByName('icon');
        icon.getComponent(cc.Sprite).spriteFrame = HeroManager_1.HeroManager.getInstance().getHeroSpriteFrame(heroType);
        HeroManager_1.HeroManager.setHeroIsNeedTip(heroType);
        this.hero_type = heroType;
        this.node.zIndex = 3;
        if (!TutorailsManager_1.default.getInstance().is_finish_game) {
            if (TutorailsManager_1.default.getInstance().isShowTutorials(203)) {
                TutorailsManager_1.default.getInstance().showTutorials(203, function () {
                    TutorailsManager_1.default.getInstance().saveTutorials(203);
                }, function () {
                    _this.clickBtnJump();
                });
            }
        }
        var teamList = HeroManager_1.HeroManager.getInstance().getTeamList(Constants_1.GameMode.Main);
        var index = teamList.indexOf(heroType);
        if (index >= 0) {
            HeroManager_1.HeroManager.getInstance().loadHeroData(heroType);
            GameManager_1.default.getInstance().loadGameHeroData();
            GameManager_1.default.getInstance().game.loadHero(heroType, index);
        }
    };
    GetHeroUi.prototype.clickBtnClose = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        _super.prototype.onClose.call(this);
    };
    GetHeroUi.prototype.clickBtnJump = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        //
        _super.prototype.onClose.call(this);
        var curScene = GameManager_1.default.getInstance().cur_game_scene;
        switch (curScene) {
            case Constants_1.GameScene.game:
                {
                    GameManager_1.default.getInstance().game_to_home = Constants_1.Go_Type.Role;
                    GameManager_1.default.getInstance().role_show_hero = this.hero_type;
                    GameManager_1.default.getInstance().backToHome(this.hero_type);
                }
                break;
            case Constants_1.GameScene.home:
                {
                    GameManager_1.default.getInstance().role_show_hero = this.hero_type;
                    GameManager_1.default.getInstance().jumoToUi(Constants_1.Btn_Index.Btn_Role);
                }
                break;
        }
    };
    GetHeroUi = __decorate([
        ccclass
    ], GetHeroUi);
    return GetHeroUi;
}(UIComponent_1.default));
exports.default = GetHeroUi;

cc._RF.pop();