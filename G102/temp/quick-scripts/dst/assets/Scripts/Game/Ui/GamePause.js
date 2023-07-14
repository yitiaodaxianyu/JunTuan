
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Game/Ui/GamePause.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '36f0cfU/5REX6OUoaewVIQc', 'GamePause');
// Scripts/Game/Ui/GamePause.ts

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
var LevelManager_1 = require("../../Level/LevelManager");
var FollowConstants_1 = require("../../multiLanguage/FollowConstants");
var FollowManager_1 = require("../../multiLanguage/FollowManager");
var TextLanguage_1 = require("../../multiLanguage/TextLanguage");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var UIComponent_1 = require("../../UI/UIComponent");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GamePause = /** @class */ (function (_super) {
    __extends(GamePause, _super);
    function GamePause() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.show_sp = [];
        _this.sound_sp = [];
        _this.muisc_sp = [];
        _this.music_slider = null;
        _this.sound_slider = null;
        _this.music_progress = null;
        _this.sound_progress = null;
        _this.Background = null;
        _this.qian = null;
        _this.music_sprite = null;
        _this.sound_sprite = null;
        _this.Tipspop = null;
        return _this;
    }
    GamePause.prototype.onEnable = function () {
        this.Tipspop.active = false;
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.暂停页展示次数);
        this.showShow();
        this.setMusic();
        this.setSound();
    };
    GamePause.prototype.clickBtnContinue = function () {
        this.destroySelf();
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        GameManager_1.default.getInstance().cur_game_state = Constants_1.GameState.Game_Playing;
    };
    GamePause.prototype.clickBtnExit = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        if (GameManager_1.default.getInstance().cur_game_mode == Constants_1.GameMode.Main) {
            FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.暂停页面_返回主页按钮点击次数);
            this.destroySelf();
            GameManager_1.default.getInstance().backToHome();
        }
        else if (GameManager_1.default.getInstance().cur_game_mode == Constants_1.GameMode.Maze) {
            FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.暂停页面_返回主页按钮点击次数);
            cc.director.resume();
            this.destroySelf();
            GameManager_1.default.getInstance().game_to_home = Constants_1.Go_Type.Activity; //暂停
            GameManager_1.default.getInstance().backToHome(); //暂停  
        }
        else {
            cc.director.resume();
            GameManager_1.default.getInstance().game_to_home = Constants_1.Go_Type.Activity; //暂停
            // GameManager.getInstance().showDialog(LanguageManager.getInstance().getString(LanguageIndex.GiveUpGame),()=>{
            this.destroySelf(); //暂停
            if (GameManager_1.default.getInstance().cur_game_mode == Constants_1.GameMode.Endless) {
                FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.无尽挑战_暂停页面_返回主页按钮点击次数);
            }
            if (GameManager_1.default.getInstance().cur_game_mode == Constants_1.GameMode.Boss_Challenge) {
                FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.BOSS挑战_暂停页面_返回主页按钮点击次数);
            }
            this.scheduleOnce(function () {
                GameManager_1.default.getInstance().showGameLose(); //胜利  
            }, 0.1);
            // 
            // GameManager.getInstance().backToHome();         //暂停     
            // },()=>{
            // })
        }
    };
    GamePause.prototype.clickBtnTisi = function () {
        if (GameManager_1.default.getInstance().cur_game_mode == Constants_1.GameMode.Main || GameManager_1.default.getInstance().cur_game_mode == Constants_1.GameMode.Maze) {
            this.Tipspop.getChildByName("texts").getComponent(TextLanguage_1.default).setTextId(100111);
        }
        else {
            this.Tipspop.getChildByName("texts").getComponent(TextLanguage_1.default).setTextId(820019);
        }
        this.Tipspop.active = true;
    };
    GamePause.prototype.clickBtnquxiao = function () {
        this.Tipspop.active = false;
    };
    GamePause.prototype.destroySelf = function () {
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.退出挑战关卡 + LevelManager_1.LevelManager.getInstance().start_level);
        cc.director.resume();
        _super.prototype.onClose.call(this);
    };
    GamePause.prototype.showShow = function () {
        // let show=this.node.getChildByName('show');
        // let qian=this.node.getChildByName("Node").getChildByName("Test").getChildByName('qian');
        var isShow = GameManager_1.default.getInstance().is_show_text;
        this.qian.x = isShow ? 190 : 126;
        this.qian.getComponent(cc.Sprite).spriteFrame = this.show_sp[isShow ? 1 : 0];
    };
    GamePause.prototype.clickBtnShow = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        GameManager_1.default.getInstance().is_show_text = !GameManager_1.default.getInstance().is_show_text;
        this.showShow();
    };
    //++++++++++++++++++++++++++++++++++++++++++音效设置++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    GamePause.prototype.clickBtnSound = function (b) {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        if (GameManager_1.default.getInstance().sound_manager.volume > 0) {
            GameManager_1.default.getInstance().sound_manager.mute = !GameManager_1.default.getInstance().sound_manager.mute;
            this.setSound();
        }
    };
    GamePause.prototype.clickBtnMusic = function (b) {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        if (GameManager_1.default.getInstance().music_manager.volume > 0) {
            GameManager_1.default.getInstance().music_manager.mute = !GameManager_1.default.getInstance().music_manager.mute;
            this.setMusic();
        }
    };
    GamePause.prototype.touchSoundSlider = function (e) {
        GameManager_1.default.getInstance().sound_manager.volume = e.progress;
        if (e.progress > 0) {
            GameManager_1.default.getInstance().sound_manager.mute = false;
        }
        else {
            GameManager_1.default.getInstance().sound_manager.mute = true;
        }
        this.setSound();
    };
    GamePause.prototype.touchSoundSliderEnd = function (e) {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        GameManager_1.default.getInstance().saveSound();
    };
    GamePause.prototype.touchMusicSlider = function (e) {
        GameManager_1.default.getInstance().music_manager.volume = e.progress;
        if (e.progress > 0) {
            GameManager_1.default.getInstance().music_manager.mute = false;
        }
        else {
            GameManager_1.default.getInstance().music_manager.mute = true;
        }
        this.setMusic();
    };
    GamePause.prototype.touchMusicSliderEnd = function (e) {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        GameManager_1.default.getInstance().saveSound();
    };
    GamePause.prototype.setSound = function () {
        var gms = GameManager_1.default.getInstance().sound_manager;
        this.sound_slider.progress = gms.volume;
        this.sound_progress.width = gms.volume * this.Background.width;
        if (gms.mute) {
            this.sound_sprite.spriteFrame = this.sound_sp[0];
        }
        else {
            this.sound_sprite.spriteFrame = this.sound_sp[1];
        }
    };
    GamePause.prototype.setMusic = function () {
        var ggm = GameManager_1.default.getInstance().music_manager;
        this.music_slider.getComponent(cc.Slider).progress = ggm.volume;
        this.music_progress.width = ggm.volume * this.Background.width;
        if (ggm.mute) {
            this.music_sprite.spriteFrame = this.muisc_sp[0];
        }
        else {
            this.music_sprite.spriteFrame = this.muisc_sp[1];
        }
    };
    __decorate([
        property([cc.SpriteFrame])
    ], GamePause.prototype, "show_sp", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], GamePause.prototype, "sound_sp", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], GamePause.prototype, "muisc_sp", void 0);
    __decorate([
        property(cc.Slider)
    ], GamePause.prototype, "music_slider", void 0);
    __decorate([
        property(cc.Slider)
    ], GamePause.prototype, "sound_slider", void 0);
    __decorate([
        property(cc.Node)
    ], GamePause.prototype, "music_progress", void 0);
    __decorate([
        property(cc.Node)
    ], GamePause.prototype, "sound_progress", void 0);
    __decorate([
        property(cc.Node)
    ], GamePause.prototype, "Background", void 0);
    __decorate([
        property(cc.Node)
    ], GamePause.prototype, "qian", void 0);
    __decorate([
        property(cc.Sprite)
    ], GamePause.prototype, "music_sprite", void 0);
    __decorate([
        property(cc.Sprite)
    ], GamePause.prototype, "sound_sprite", void 0);
    __decorate([
        property(cc.Node)
    ], GamePause.prototype, "Tipspop", void 0);
    GamePause = __decorate([
        ccclass
    ], GamePause);
    return GamePause;
}(UIComponent_1.default));
exports.default = GamePause;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcR2FtZVxcVWlcXEdhbWVQYXVzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBK0Q7QUFDL0QsaURBQTRDO0FBRzVDLHlEQUF3RDtBQUN4RCx1RUFBa0U7QUFDbEUsbUVBQThEO0FBRzlELGlFQUE0RDtBQUM1RCw2REFBd0Q7QUFDeEQsb0RBQStDO0FBSXpDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXVDLDZCQUFXO0lBQWxEO1FBQUEscUVBaU9DO1FBOU5HLGFBQU8sR0FBa0IsRUFBRSxDQUFDO1FBRzVCLGNBQVEsR0FBa0IsRUFBRSxDQUFDO1FBRzdCLGNBQVEsR0FBa0IsRUFBRSxDQUFDO1FBRzdCLGtCQUFZLEdBQVcsSUFBSSxDQUFDO1FBRzVCLGtCQUFZLEdBQVcsSUFBSSxDQUFDO1FBRzVCLG9CQUFjLEdBQVMsSUFBSSxDQUFDO1FBRzVCLG9CQUFjLEdBQVMsSUFBSSxDQUFDO1FBRzVCLGdCQUFVLEdBQVMsSUFBSSxDQUFDO1FBSXhCLFVBQUksR0FBUyxJQUFJLENBQUM7UUFJbEIsa0JBQVksR0FBVyxJQUFJLENBQUM7UUFHNUIsa0JBQVksR0FBVyxJQUFJLENBQUM7UUFJNUIsYUFBTyxHQUFTLElBQUksQ0FBQzs7SUEwTHpCLENBQUM7SUF4TEcsNEJBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFDLEtBQUssQ0FBQTtRQUV6Qix1QkFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQyw2QkFBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdELElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3BCLENB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LElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxHQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUM7UUFDM0QsSUFBRyxHQUFHLENBQUMsSUFBSSxFQUNYO1lBQ0csSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEdBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNqRDthQUNEO1lBQ0ksSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEdBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNsRDtJQUNMLENBQUM7SUFFRCw0QkFBUSxHQUFSO1FBRUksSUFBSSxHQUFHLEdBQUMscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUM7UUFDaEQsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsR0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDO1FBQzlELElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxHQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUM7UUFDM0QsSUFBRyxHQUFHLENBQUMsSUFBSSxFQUNYO1lBQ0ksSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEdBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNsRDthQUNEO1lBQ0ksSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEdBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNsRDtJQUNMLENBQUM7SUE1TkQ7UUFEQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUM7OENBQ0M7SUFHNUI7UUFEQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUM7K0NBQ0U7SUFHN0I7UUFEQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUM7K0NBQ0U7SUFHN0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzttREFDUTtJQUc1QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO21EQUNRO0lBRzVCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7cURBQ1U7SUFHNUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztxREFDVTtJQUc1QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2lEQUNNO0lBSXhCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7MkNBQ0E7SUFJbEI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzttREFDUTtJQUc1QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO21EQUNRO0lBSTVCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7OENBQ0c7SUF2Q0osU0FBUztRQUQ3QixPQUFPO09BQ2EsU0FBUyxDQWlPN0I7SUFBRCxnQkFBQztDQWpPRCxBQWlPQyxDQWpPc0MscUJBQVcsR0FpT2pEO2tCQWpPb0IsU0FBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdhbWVTdGF0ZSwgR2FtZU1vZGUsIEdvX1R5cGUgfSBmcm9tIFwiLi4vLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgSGVyb01hbmFnZXIgfSBmcm9tIFwiLi4vLi4vSGVyby9EYXRhL0hlcm9NYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEhlcm9fVHlwZSB9IGZyb20gXCIuLi8uLi9IZXJvL0dhbWUvSGVyb0NvbmZpZ1wiO1xyXG5pbXBvcnQgeyBMZXZlbE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vTGV2ZWwvTGV2ZWxNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEZvbGxvd19UeXBlIH0gZnJvbSBcIi4uLy4uL211bHRpTGFuZ3VhZ2UvRm9sbG93Q29uc3RhbnRzXCI7XHJcbmltcG9ydCBGb2xsb3dNYW5hZ2VyIGZyb20gXCIuLi8uLi9tdWx0aUxhbmd1YWdlL0ZvbGxvd01hbmFnZXJcIjtcclxuaW1wb3J0IHsgTGFuZ3VhZ2VJbmRleCB9IGZyb20gXCIuLi8uLi9tdWx0aUxhbmd1YWdlL0xhbmd1YWdlQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBMYW5ndWFnZU1hbmFnZXIgZnJvbSBcIi4uLy4uL211bHRpTGFuZ3VhZ2UvTGFuZ3VhZ2VNYW5hZ2VyXCI7XHJcbmltcG9ydCBUZXh0TGFuZ3VhZ2UgZnJvbSBcIi4uLy4uL211bHRpTGFuZ3VhZ2UvVGV4dExhbmd1YWdlXCI7XHJcbmltcG9ydCB7IFNvdW5kSW5kZXggfSBmcm9tIFwiLi4vLi4vU291bmQvQXVkaW9Db25zdGFudHNcIjtcclxuaW1wb3J0IFVJQ29tcG9uZW50IGZyb20gXCIuLi8uLi9VSS9VSUNvbXBvbmVudFwiO1xyXG5pbXBvcnQgU3RhdHNVaSBmcm9tIFwiLi9TdGF0c1VpXCI7XHJcblxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lUGF1c2UgZXh0ZW5kcyBVSUNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KFtjYy5TcHJpdGVGcmFtZV0pXHJcbiAgICBzaG93X3NwOmNjLlNwcml0ZUZyYW1lW109W107XHJcblxyXG4gICAgQHByb3BlcnR5KFtjYy5TcHJpdGVGcmFtZV0pXHJcbiAgICBzb3VuZF9zcDpjYy5TcHJpdGVGcmFtZVtdPVtdO1xyXG5cclxuICAgIEBwcm9wZXJ0eShbY2MuU3ByaXRlRnJhbWVdKVxyXG4gICAgbXVpc2Nfc3A6Y2MuU3ByaXRlRnJhbWVbXT1bXTtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU2xpZGVyKVxyXG4gICAgbXVzaWNfc2xpZGVyOmNjLlNsaWRlcj1udWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5TbGlkZXIpXHJcbiAgICBzb3VuZF9zbGlkZXI6Y2MuU2xpZGVyPW51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBtdXNpY19wcm9ncmVzczpjYy5Ob2RlPW51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBzb3VuZF9wcm9ncmVzczpjYy5Ob2RlPW51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBCYWNrZ3JvdW5kOmNjLk5vZGU9bnVsbDtcclxuICAgIFxyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcWlhbjpjYy5Ob2RlPW51bGw7XHJcbiAgICBcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxyXG4gICAgbXVzaWNfc3ByaXRlOmNjLlNwcml0ZT1udWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXHJcbiAgICBzb3VuZF9zcHJpdGU6Y2MuU3ByaXRlPW51bGw7XHJcblxyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgVGlwc3BvcDpjYy5Ob2RlPW51bGw7XHJcbiAgICBcclxuICAgIG9uRW5hYmxlKCl7XHJcbiAgICAgICAgdGhpcy5UaXBzcG9wLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgIFxyXG4gICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7mmoLlgZzpobXlsZXnpLrmrKHmlbApO1xyXG4gICAgICAgIHRoaXMuc2hvd1Nob3coKTtcclxuICAgICAgICB0aGlzLnNldE11c2ljKCk7XHJcbiAgICAgICAgdGhpcy5zZXRTb3VuZCgpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBjbGlja0J0bkNvbnRpbnVlKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmRlc3Ryb3lTZWxmKCk7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX3N0YXRlPUdhbWVTdGF0ZS5HYW1lX1BsYXlpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5FeGl0KClcclxuICAgIHsgICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgaWYoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9tb2RlPT1HYW1lTW9kZS5NYWluKXtcclxuICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuaaguWBnOmhtemdol/ov5Tlm57kuLvpobXmjInpkq7ngrnlh7vmrKHmlbApO1xyXG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3lTZWxmKCk7XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuYmFja1RvSG9tZSgpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9ZWxzZSBpZihHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX21vZGU9PUdhbWVNb2RlLk1hemUpe1xyXG4gICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5pqC5YGc6aG16Z2iX+i/lOWbnuS4u+mhteaMiemSrueCueWHu+asoeaVsCk7XHJcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLnJlc3VtZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3lTZWxmKCk7XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2FtZV90b19ob21lPUdvX1R5cGUuQWN0aXZpdHk7Ly/mmoLlgZxcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5iYWNrVG9Ib21lKCk7ICAgICAgICAgLy/mmoLlgZwgIFxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgY2MuZGlyZWN0b3IucmVzdW1lKCk7XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2FtZV90b19ob21lPUdvX1R5cGUuQWN0aXZpdHk7Ly/mmoLlgZxcclxuICAgICAgICAvLyBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dEaWFsb2coTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyaW5nKExhbmd1YWdlSW5kZXguR2l2ZVVwR2FtZSksKCk9PntcclxuICAgICAgICAgICAgdGhpcy5kZXN0cm95U2VsZigpOy8v5pqC5YGcXHJcbiAgICAgICAgICAgIGlmKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZT09R2FtZU1vZGUuRW5kbGVzcyl7XHJcbiAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5peg5bC95oyR5oiYX+aaguWBnOmhtemdol/ov5Tlm57kuLvpobXmjInpkq7ngrnlh7vmrKHmlbApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZT09R2FtZU1vZGUuQm9zc19DaGFsbGVuZ2Upe1xyXG4gICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLkJPU1PmjJHmiJhf5pqC5YGc6aG16Z2iX+i/lOWbnuS4u+mhteaMiemSrueCueWHu+asoeaVsCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dHYW1lTG9zZSgpOy8v6IOc5YipICBcclxuICAgICAgICAgICAgfSwwLjEpXHJcbiAgICAgICAgICAgIC8vIFxyXG4gICAgICAgICAgICAvLyBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmJhY2tUb0hvbWUoKTsgICAgICAgICAvL+aaguWBnCAgICAgXHJcbiAgICAgICAgLy8gfSwoKT0+e1xyXG5cclxuICAgICAgICAvLyB9KVxyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgfSAgICBcclxuXHJcbiAgICBcclxuICAgIGNsaWNrQnRuVGlzaSgpXHJcbiAgICB7ICAgICAgXHJcbiAgICAgICAgaWYoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9tb2RlPT1HYW1lTW9kZS5NYWlufHxHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX21vZGU9PUdhbWVNb2RlLk1hemUpe1xyXG4gICAgICAgICAgICB0aGlzLlRpcHNwb3AuZ2V0Q2hpbGRCeU5hbWUoXCJ0ZXh0c1wiKS5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zZXRUZXh0SWQoMTAwMTExKVxyXG4gICAgICAgIH0gZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5UaXBzcG9wLmdldENoaWxkQnlOYW1lKFwidGV4dHNcIikuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0VGV4dElkKDgyMDAxOSlcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5UaXBzcG9wLmFjdGl2ZT10cnVlXHJcbiAgICB9XHJcbiAgICAgICAgXHJcbiAgICBjbGlja0J0bnF1eGlhbygpXHJcbiAgICB7ICAgICAgIFxyXG4gICAgICAgIHRoaXMuVGlwc3BvcC5hY3RpdmU9ZmFsc2VcclxuICAgIH1cclxuICAgIGRlc3Ryb3lTZWxmKClcclxuICAgIHtcclxuICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu6YCA5Ye65oyR5oiY5YWz5Y2hK0xldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnN0YXJ0X2xldmVsKTtcclxuICAgICAgICBjYy5kaXJlY3Rvci5yZXN1bWUoKTsgICAgICAgIFxyXG4gICAgICAgIHN1cGVyLm9uQ2xvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93U2hvdygpXHJcbiAgICB7XHJcbiAgICAgICAgLy8gbGV0IHNob3c9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdzaG93Jyk7XHJcbiAgICAgICAgLy8gbGV0IHFpYW49dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiTm9kZVwiKS5nZXRDaGlsZEJ5TmFtZShcIlRlc3RcIikuZ2V0Q2hpbGRCeU5hbWUoJ3FpYW4nKTtcclxuICAgICAgICBsZXQgaXNTaG93PUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNfc2hvd190ZXh0O1xyXG4gICAgICAgIHRoaXMucWlhbi54PWlzU2hvdz8xOTA6MTI2O1xyXG4gICAgICAgIHRoaXMucWlhbi5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZT10aGlzLnNob3dfc3BbaXNTaG93PzE6MF07XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5TaG93KClcclxuICAgIHtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNfc2hvd190ZXh0PSFHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzX3Nob3dfdGV4dDtcclxuICAgICAgICB0aGlzLnNob3dTaG93KCk7XHJcbiAgICB9XHJcbiBcclxuXHJcbiAgICAvLysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK+mfs+aViOiuvue9risrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK1xyXG5cclxuICAgIGNsaWNrQnRuU291bmQoYjpjYy5FdmVudC5FdmVudFRvdWNoKVxyXG4gICAge1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgaWYoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnZvbHVtZT4wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLm11dGU9IUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5tdXRlO1xyXG4gICAgICAgICAgICB0aGlzLnNldFNvdW5kKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuTXVzaWMoYjpjYy5FdmVudC5FdmVudFRvdWNoKVxyXG4gICAge1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgaWYoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5tdXNpY19tYW5hZ2VyLnZvbHVtZT4wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5tdXNpY19tYW5hZ2VyLm11dGU9IUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkubXVzaWNfbWFuYWdlci5tdXRlO1xyXG4gICAgICAgICAgICB0aGlzLnNldE11c2ljKCk7XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgdG91Y2hTb3VuZFNsaWRlcihlOmNjLlNsaWRlcilcclxuICAgIHtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIudm9sdW1lPWUucHJvZ3Jlc3M7XHJcbiAgICAgICAgaWYoZS5wcm9ncmVzcz4wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLm11dGU9ZmFsc2U7XHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5tdXRlPXRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0U291bmQoKTtcclxuICAgIH1cclxuXHJcbiAgICB0b3VjaFNvdW5kU2xpZGVyRW5kKGU6Y2MuU2xpZGVyKVxyXG4gICAge1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlU291bmQoKTtcclxuICAgIH1cclxuXHJcbiAgICB0b3VjaE11c2ljU2xpZGVyKGU6Y2MuU2xpZGVyKVxyXG4gICAge1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkubXVzaWNfbWFuYWdlci52b2x1bWU9ZS5wcm9ncmVzcztcclxuICAgICAgICBpZihlLnByb2dyZXNzPjApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLm11c2ljX21hbmFnZXIubXV0ZT1mYWxzZTtcclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5tdXNpY19tYW5hZ2VyLm11dGU9dHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXRNdXNpYygpO1xyXG4gICAgfVxyXG5cclxuICAgIHRvdWNoTXVzaWNTbGlkZXJFbmQoZTpjYy5TbGlkZXIpXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVTb3VuZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFNvdW5kKClcclxuICAgIHtcclxuICAgICAgICBsZXQgZ21zPUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlcjtcclxuICAgICAgICB0aGlzLnNvdW5kX3NsaWRlci5wcm9ncmVzcz1nbXMudm9sdW1lO1xyXG4gICAgICAgIHRoaXMuc291bmRfcHJvZ3Jlc3Mud2lkdGg9Z21zLnZvbHVtZSp0aGlzLkJhY2tncm91bmQud2lkdGg7XHJcbiAgICAgICAgaWYoZ21zLm11dGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgIHRoaXMuc291bmRfc3ByaXRlLnNwcml0ZUZyYW1lPXRoaXMuc291bmRfc3BbMF07XHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuc291bmRfc3ByaXRlLnNwcml0ZUZyYW1lPXRoaXMuc291bmRfc3BbMV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBzZXRNdXNpYygpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGdnbT1HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLm11c2ljX21hbmFnZXI7XHJcbiAgICAgICAgdGhpcy5tdXNpY19zbGlkZXIuZ2V0Q29tcG9uZW50KGNjLlNsaWRlcikucHJvZ3Jlc3M9Z2dtLnZvbHVtZTtcclxuICAgICAgICB0aGlzLm11c2ljX3Byb2dyZXNzLndpZHRoPWdnbS52b2x1bWUqdGhpcy5CYWNrZ3JvdW5kLndpZHRoO1xyXG4gICAgICAgIGlmKGdnbS5tdXRlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5tdXNpY19zcHJpdGUuc3ByaXRlRnJhbWU9dGhpcy5tdWlzY19zcFswXTtcclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5tdXNpY19zcHJpdGUuc3ByaXRlRnJhbWU9dGhpcy5tdWlzY19zcFsxXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==