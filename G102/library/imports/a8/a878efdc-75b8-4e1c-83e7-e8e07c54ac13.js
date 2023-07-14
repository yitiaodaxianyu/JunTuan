"use strict";
cc._RF.push(module, 'a878e/cdbhOHIPn6OB8VKwT', 'SettingUi');
// Scripts/UI/home/SettingUi.ts

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
var HttpManager_1 = require("../.././NetWork/HttpManager");
var ApkManager_1 = require("../../Ads/ApkManager");
var Constants_1 = require("../../Constants");
var GameData_1 = require("../../GameData");
var GameManager_1 = require("../../GameManager");
var LanguageConstants_1 = require("../../multiLanguage/LanguageConstants");
var LanguageManager_1 = require("../../multiLanguage/LanguageManager");
var PropManager_1 = require("../../Prop/PropManager");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var UserData_1 = require("../../UserData");
var UIComponent_1 = require("../UIComponent");
var UIConfig_1 = require("../UIConfig");
var UIManager_1 = require("../UIManager");
var AvatarUi_1 = require("./AvatarUi");
var MainUi_1 = require("./MainUi");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SettingUi = /** @class */ (function (_super) {
    __extends(SettingUi, _super);
    function SettingUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sound_sp = [];
        _this.muisc_sp = [];
        _this.music_slider = null;
        _this.sound_slider = null;
        _this.music_progress = null;
        _this.sound_progress = null;
        _this.music_sprite = null;
        _this.sound_sprite = null;
        _this.sprite_atlas = null;
        _this.cur_select_lan = LanguageConstants_1.LanguageType.en;
        return _this;
    }
    // close_callback:Function=null;
    // init(closeCallback:Function)
    // {
    //     this.close_callback=closeCallback;
    // }
    SettingUi.prototype.onEnable = function () {
        this.showName();
        this.showId();
        this.setMusic();
        this.setSound();
        this.setVersion();
        this.showAvatar();
        this.showLan();
        this.setBtnLogin();
        ApkManager_1.default.getInstance().showBanner();
    };
    SettingUi.prototype.setBtnLogin = function () {
        var btnFb = this.node.getChildByName('btnFb');
        btnFb.active = Constants_1.IsTestServer;
        var btnGoogle = this.node.getChildByName('btnGoogle');
        btnGoogle.active = Constants_1.IsTestServer;
    };
    SettingUi.prototype.showName = function () {
        var nameEditBox = this.node.getChildByName('info').getChildByName('nameEditBox');
        var edit = nameEditBox.getComponent(cc.EditBox);
        edit.string = UserData_1.default.getInstance().getUserName();
        edit.enabled = false;
    };
    SettingUi.prototype.setVersion = function () {
        //从安卓回传
        this.node.getChildByName('verStr').getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getString(LanguageConstants_1.LanguageIndex.Version) + ' ' + ApkManager_1.default.getInstance().app_ver;
    };
    SettingUi.prototype.showAvatar = function () {
        var btnAvatar = this.node.getChildByName('info').getChildByName('headPortrait').getChildByName('btnAvatar');
        var avatarIndex = UserData_1.default.getInstance().getUserAvatar();
        // let spName='hero'+avatarIndex;
        // let spName='TY_TX_0'+avatarIndex;
        // if(avatarIndex>=10)
        // {
        //     spName='TY_TX_'+avatarIndex;
        // }
        // btnAvatar.getComponent(cc.Sprite).spriteFrame=this.getAvatar(spName);
        btnAvatar.getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpheadPortraitType(avatarIndex); //HeroManager.getInstance().getSpriteFrameByName(spName);
    };
    SettingUi.prototype.getAvatar = function (str) {
        return this.sprite_atlas.getSpriteFrame(str);
    };
    SettingUi.prototype.showAvatarRoot = function () {
        var _this = this;
        // UIManager.getInstance().showAvatarRoot({onClose:()=>{
        //     this.showAvatar();
        // }})
        UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.AvatarRoot, UIConfig_1.UILayerLevel.Two, { onCompleted: function (uiNode) {
                uiNode.getComponent(AvatarUi_1.default).init({ onClose: function () {
                        _this.showAvatar();
                    } });
            }, });
    };
    SettingUi.prototype.showId = function () {
        var idStr = this.node.getChildByName('info').getChildByName('idStr');
        idStr.getComponent(cc.Label).string = UserData_1.default.getInstance().getUserID();
    };
    SettingUi.prototype.clickBtnAvatar = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.showAvatarRoot();
    };
    SettingUi.prototype.clickBtnRename = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        var nameEditBox = this.node.getChildByName('info').getChildByName('nameEditBox');
        var edit = nameEditBox.getComponent(cc.EditBox);
        edit.enabled = true;
        edit.focus();
    };
    SettingUi.prototype.onRenameFinish = function (editBox) {
        if (editBox.string != '') {
            UserData_1.default.getInstance().saveUserName(editBox.string);
            this.showName();
        }
    };
    SettingUi.prototype.onClose = function () {
        cc.log('SettingUi');
    };
    SettingUi.prototype.clickBtnClose = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        GameManager_1.default.getInstance().saveSound();
        GameManager_1.default.getInstance().refreshTopShow();
        HttpManager_1.HttpManager.post(HttpManager_1.AccessName.updateAvatar, this.getNameAndIconJsonString());
        _super.prototype.onClose.call(this);
        ApkManager_1.default.getInstance().closeBanner();
    };
    SettingUi.prototype.showLan = function () {
        this.cur_select_lan = LanguageManager_1.default.getInstance().getCurLanguageType();
    };
    SettingUi.prototype.clickSelectLan = function (btn, indexStr) {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        var index = parseInt(indexStr);
        if (index != this.cur_select_lan) {
            this.cur_select_lan = index;
            this.showSelectLan();
        }
    };
    SettingUi.prototype.showSelectLan = function () {
        var lanSelectRoot = this.node.getChildByName('lanSelectRoot');
        lanSelectRoot.active = true;
        //
        var lanRoot = lanSelectRoot.getChildByName('lanRoot');
        var select = lanSelectRoot.getChildByName('select');
        var lanType = this.cur_select_lan;
        var selectLan = lanRoot.children[lanType];
        select.x = selectLan.x + lanRoot.x;
        select.y = selectLan.y + lanRoot.y;
    };
    SettingUi.prototype.closeSelectLan = function () {
        var lanSelectRoot = this.node.getChildByName('lanSelectRoot');
        lanSelectRoot.active = false;
        LanguageManager_1.default.getInstance().setLanguage(this.cur_select_lan);
        cc.find('Canvas/main_ui').getComponent(MainUi_1.default).onEnable();
        this.onEnable();
    };
    SettingUi.prototype.clickBtnLan = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        //弹出语言选择框
        this.showSelectLan();
    };
    SettingUi.prototype.clickBtnOkLan = function () {
        this.scheduleOnce(function () {
            cc.find('Canvas/main_ui').getComponent(MainUi_1.default).refreshMainTaskUi();
        }, 0.02);
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.closeSelectLan();
    };
    SettingUi.prototype.clickBtnEmail = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        ApkManager_1.default.getInstance().showCallMe();
    };
    SettingUi.prototype.clickBtnFb = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getStrByTextId(100113));
        return;
        //同步信息，如果没有信息，则上传，上传一次信息
        ApkManager_1.default.getInstance().loginForFB(function (json) {
            if (json.uid) {
                if (json.uid != UserData_1.default.getInstance().getUserID()) {
                    UserData_1.default.getInstance().saveUserID(json.uid);
                    // HttpManager.postToIssued(URL_TYPE.issued,Params_Type.coin,(data)=>{
                    //     if(data)
                    //     {
                    //         console.log(data);
                    //         //如果没有信息，
                    //         if(data.coin==0 && data.gem==0 && data.complete_level==0)
                    //         {
                    //             //需要上传本地数据
                    //             HttpManager.postToUploadAll();
                    //         }else
                    //         {
                    //             GameData.getInstance().syncData(data);
                    //         }
                    //     }                        
                    // });
                }
            }
            else {
            }
        });
    };
    SettingUi.prototype.clickBtnGoogle = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getStrByTextId(100113));
        return;
        //上传一次信息
        ApkManager_1.default.getInstance().loginForGoogle(function (json) {
            if (json.uid) {
                if (json.uid != UserData_1.default.getInstance().getUserID()) {
                    UserData_1.default.getInstance().saveUserID(json.uid);
                    // HttpManager.postToIssued(URL_TYPE.issued,Params_Type.coin,(data)=>{
                    //     if(data)
                    //     {
                    //         console.log(data);
                    //         //如果没有信息，
                    //         if(data.coin==0 && data.gem==0 && data.complete_level==0)
                    //         {
                    //             //需要上传本地数据
                    //             HttpManager.postToUploadAll();
                    //         }else
                    //         {
                    //             GameData.getInstance().syncData(data);
                    //         }
                    //     }                        
                    // });
                }
            }
            else {
            }
        });
    };
    SettingUi.prototype.clickBtnExit = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        GameManager_1.default.getInstance().showDialog(LanguageManager_1.default.getInstance().getString(LanguageConstants_1.LanguageIndex.Do_you_really_want_to_quit_game), function () {
            GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
            //结束游戏
            GameData_1.default.getInstance().saveExitTime();
            cc.game.end();
        }, function () {
            GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        }, 0);
    };
    //++++++++++++++++++++++++++++++++++++++++++音效设置++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    SettingUi.prototype.clickBtnSound = function (b) {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        if (GameManager_1.default.getInstance().sound_manager.volume > 0) {
            GameManager_1.default.getInstance().sound_manager.mute = !GameManager_1.default.getInstance().sound_manager.mute;
            this.setSound();
        }
    };
    SettingUi.prototype.clickBtnMusic = function (b) {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        if (GameManager_1.default.getInstance().music_manager.volume > 0) {
            GameManager_1.default.getInstance().music_manager.mute = !GameManager_1.default.getInstance().music_manager.mute;
            this.setMusic();
        }
    };
    SettingUi.prototype.touchSoundSlider = function (e) {
        GameManager_1.default.getInstance().sound_manager.volume = e.progress;
        if (e.progress > 0) {
            GameManager_1.default.getInstance().sound_manager.mute = false;
        }
        else {
            GameManager_1.default.getInstance().sound_manager.mute = true;
        }
        this.setSound();
    };
    SettingUi.prototype.touchSoundSliderEnd = function (e) {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        GameManager_1.default.getInstance().saveSound();
    };
    SettingUi.prototype.touchMusicSlider = function (e) {
        GameManager_1.default.getInstance().music_manager.volume = e.progress;
        if (e.progress > 0) {
            GameManager_1.default.getInstance().music_manager.mute = false;
        }
        else {
            GameManager_1.default.getInstance().music_manager.mute = true;
        }
        this.setMusic();
    };
    SettingUi.prototype.touchMusicSliderEnd = function (e) {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        GameManager_1.default.getInstance().saveSound();
    };
    SettingUi.prototype.setSound = function () {
        var gms = GameManager_1.default.getInstance().sound_manager;
        this.sound_slider.progress = gms.volume;
        this.sound_progress.width = gms.volume * 360;
        if (gms.mute) {
            this.sound_sprite.spriteFrame = this.sound_sp[0];
        }
        else {
            this.sound_sprite.spriteFrame = this.sound_sp[1];
        }
    };
    SettingUi.prototype.setMusic = function () {
        var ggm = GameManager_1.default.getInstance().music_manager;
        this.music_slider.getComponent(cc.Slider).progress = ggm.volume;
        this.music_progress.width = ggm.volume * 360;
        if (ggm.mute) {
            this.music_sprite.spriteFrame = this.muisc_sp[0];
        }
        else {
            this.music_sprite.spriteFrame = this.muisc_sp[1];
        }
    };
    SettingUi.prototype.getNameAndIconJsonString = function () {
        var uid = UserData_1.default.getInstance().getUserID();
        var icon = UserData_1.default.getInstance().getUserAvatar();
        var name = UserData_1.default.getInstance().getUserName();
        return JSON.stringify({
            uid: uid,
            avatarId: icon,
            name: name,
        });
    };
    __decorate([
        property([cc.SpriteFrame])
    ], SettingUi.prototype, "sound_sp", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], SettingUi.prototype, "muisc_sp", void 0);
    __decorate([
        property(cc.Slider)
    ], SettingUi.prototype, "music_slider", void 0);
    __decorate([
        property(cc.Slider)
    ], SettingUi.prototype, "sound_slider", void 0);
    __decorate([
        property(cc.Node)
    ], SettingUi.prototype, "music_progress", void 0);
    __decorate([
        property(cc.Node)
    ], SettingUi.prototype, "sound_progress", void 0);
    __decorate([
        property(cc.Sprite)
    ], SettingUi.prototype, "music_sprite", void 0);
    __decorate([
        property(cc.Sprite)
    ], SettingUi.prototype, "sound_sprite", void 0);
    __decorate([
        property(cc.SpriteAtlas)
    ], SettingUi.prototype, "sprite_atlas", void 0);
    SettingUi = __decorate([
        ccclass
    ], SettingUi);
    return SettingUi;
}(UIComponent_1.default));
exports.default = SettingUi;

cc._RF.pop();