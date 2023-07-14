"use strict";
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