
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Hero/Ui/GetHeroUi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcVWlcXEdldEhlcm9VaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBMEU7QUFDMUUsaURBQTRDO0FBQzVDLDJEQUEwRDtBQUMxRCx5REFBdUQ7QUFDdkQsNkRBQXdEO0FBQ3hELHFFQUFnRTtBQUNoRSxvREFBK0M7QUFHekMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBdUMsNkJBQVc7SUFBbEQ7UUFBQSxxRUEyREM7UUF6REcsZUFBUyxHQUFXLHNCQUFTLENBQUMsWUFBWSxDQUFDOztJQXlEL0MsQ0FBQztJQXZERywwQkFBTSxHQUFOLFVBQU8sUUFBa0I7UUFBekIsaUJBNEJDO1FBMUJHLE1BQU07UUFDTixJQUFJLElBQUksR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDakUsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxHQUFDLHlCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFaEcseUJBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsU0FBUyxHQUFDLFFBQVEsQ0FBQztRQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUM7UUFFbkIsSUFBRyxDQUFDLDBCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsRUFDakQ7WUFDSSxJQUFHLDBCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsRUFDdEQ7Z0JBQ0ksMEJBQWdCLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBQztvQkFDN0MsMEJBQWdCLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUN0RCxDQUFDLEVBQUM7b0JBQ0UsS0FBSSxDQUFDLFlBQVksRUFBRSxDQUFDO2dCQUN4QixDQUFDLENBQUMsQ0FBQzthQUNOO1NBQ0o7UUFDRCxJQUFJLFFBQVEsR0FBQyx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxvQkFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xFLElBQUksS0FBSyxHQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDcEMsSUFBRyxLQUFLLElBQUUsQ0FBQyxFQUFDO1lBQ1IseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDakQscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQzdDLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUMsS0FBSyxDQUFDLENBQUM7U0FDM0Q7SUFDTCxDQUFDO0lBRUQsaUNBQWEsR0FBYjtRQUVJLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQywyQkFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BFLGlCQUFNLE9BQU8sV0FBRSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxnQ0FBWSxHQUFaO1FBRUkscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLDJCQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEUsRUFBRTtRQUNGLGlCQUFNLE9BQU8sV0FBRSxDQUFDO1FBQ2hCLElBQUksUUFBUSxHQUFDLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDO1FBQ3RELFFBQU8sUUFBUSxFQUFDO1lBQ1osS0FBSyxxQkFBUyxDQUFDLElBQUk7Z0JBQUM7b0JBQ2hCLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsWUFBWSxHQUFDLG1CQUFPLENBQUMsSUFBSSxDQUFDO29CQUNwRCxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsR0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO29CQUN4RCxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7aUJBQ3hEO2dCQUFBLE1BQU07WUFDUCxLQUFLLHFCQUFTLENBQUMsSUFBSTtnQkFBQztvQkFDaEIscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLEdBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztvQkFDeEQscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMscUJBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztpQkFDMUQ7Z0JBQUEsTUFBTTtTQUNWO0lBRUwsQ0FBQztJQTFEZ0IsU0FBUztRQUQ3QixPQUFPO09BQ2EsU0FBUyxDQTJEN0I7SUFBRCxnQkFBQztDQTNERCxBQTJEQyxDQTNEc0MscUJBQVcsR0EyRGpEO2tCQTNEb0IsU0FBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJ0bl9JbmRleCwgR2FtZU1vZGUsIEdhbWVTY2VuZSwgR29fVHlwZSB9IGZyb20gXCIuLi8uLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi8uLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBIZXJvTWFuYWdlciB9IGZyb20gXCIuLi8uLi9IZXJvL0RhdGEvSGVyb01hbmFnZXJcIjtcclxuaW1wb3J0IHsgSGVyb19UeXBlIH0gZnJvbSBcIi4uLy4uL0hlcm8vR2FtZS9IZXJvQ29uZmlnXCI7XHJcbmltcG9ydCB7IFNvdW5kSW5kZXggfSBmcm9tIFwiLi4vLi4vU291bmQvQXVkaW9Db25zdGFudHNcIjtcclxuaW1wb3J0IFR1dG9yYWlsc01hbmFnZXIgZnJvbSBcIi4uLy4uL1R1dG9yaWFscy9UdXRvcmFpbHNNYW5hZ2VyXCI7XHJcbmltcG9ydCBVSUNvbXBvbmVudCBmcm9tIFwiLi4vLi4vVUkvVUlDb21wb25lbnRcIjtcclxuXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdldEhlcm9VaSBleHRlbmRzIFVJQ29tcG9uZW50IHtcclxuXHJcbiAgICBoZXJvX3R5cGU6SGVyb19UeXBlPUhlcm9fVHlwZS5DaGFuZ01hb1Nob3U7XHJcblxyXG4gICAgaW5pdFVpKGhlcm9UeXBlOkhlcm9fVHlwZSlcclxuICAgIHtcclxuICAgICAgICAvL+iuvue9ruWktOWDj1xyXG4gICAgICAgIGxldCBpY29uPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnbWFzaycpLmdldENoaWxkQnlOYW1lKCdpY29uJyk7XHJcbiAgICAgICAgaWNvbi5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZT1IZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9TcHJpdGVGcmFtZShoZXJvVHlwZSk7XHJcbiAgICBcclxuICAgICAgICBIZXJvTWFuYWdlci5zZXRIZXJvSXNOZWVkVGlwKGhlcm9UeXBlKTtcclxuICAgICAgICB0aGlzLmhlcm9fdHlwZT1oZXJvVHlwZTtcclxuICAgICAgICB0aGlzLm5vZGUuekluZGV4PTM7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoIVR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc19maW5pc2hfZ2FtZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc1Nob3dUdXRvcmlhbHMoMjAzKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dUdXRvcmlhbHMoMjAzLCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjAzKTsgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSwoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xpY2tCdG5KdW1wKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgdGVhbUxpc3Q9SGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRUZWFtTGlzdChHYW1lTW9kZS5NYWluKTtcclxuICAgICAgICBsZXQgaW5kZXg9dGVhbUxpc3QuaW5kZXhPZihoZXJvVHlwZSlcclxuICAgICAgICBpZihpbmRleD49MCl7XHJcbiAgICAgICAgICAgIEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZEhlcm9EYXRhKGhlcm9UeXBlKTtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5sb2FkR2FtZUhlcm9EYXRhKCk7XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2FtZS5sb2FkSGVybyhoZXJvVHlwZSxpbmRleCk7XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5DbG9zZSgpXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBzdXBlci5vbkNsb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5KdW1wKClcclxuICAgIHtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgc3VwZXIub25DbG9zZSgpO1xyXG4gICAgICAgIGxldCBjdXJTY2VuZT1HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX3NjZW5lO1xyXG4gICAgICAgIHN3aXRjaChjdXJTY2VuZSl7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZVNjZW5lLmdhbWU6e1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nYW1lX3RvX2hvbWU9R29fVHlwZS5Sb2xlO1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yb2xlX3Nob3dfaGVybz10aGlzLmhlcm9fdHlwZTtcclxuICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuYmFja1RvSG9tZSh0aGlzLmhlcm9fdHlwZSk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBHYW1lU2NlbmUuaG9tZTp7XHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJvbGVfc2hvd19oZXJvPXRoaXMuaGVyb190eXBlO1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5qdW1vVG9VaShCdG5fSW5kZXguQnRuX1JvbGUpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG59XHJcbiJdfQ==