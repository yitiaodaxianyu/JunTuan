
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/UI/home/SettingUi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVUlcXGhvbWVcXFNldHRpbmdVaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSwyREFBc0U7QUFDdEUsbURBQThDO0FBQzlDLDZDQUErQztBQUMvQywyQ0FBc0M7QUFDdEMsaURBQTRDO0FBRTVDLDJFQUFvRjtBQUNwRix1RUFBa0U7QUFDbEUsc0RBQXFEO0FBQ3JELDZEQUF3RDtBQUN4RCwyQ0FBc0M7QUFDdEMsOENBQXlDO0FBQ3pDLHdDQUFtRDtBQUNuRCwwQ0FBeUM7QUFDekMsdUNBQWtDO0FBQ2xDLG1DQUE4QjtBQUd4QixJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUF1Qyw2QkFBVztJQUFsRDtRQUFBLHFFQXNZQztRQW5ZRyxjQUFRLEdBQWtCLEVBQUUsQ0FBQztRQUc3QixjQUFRLEdBQWtCLEVBQUUsQ0FBQztRQUc3QixrQkFBWSxHQUFXLElBQUksQ0FBQztRQUc1QixrQkFBWSxHQUFXLElBQUksQ0FBQztRQUc1QixvQkFBYyxHQUFTLElBQUksQ0FBQztRQUc1QixvQkFBYyxHQUFTLElBQUksQ0FBQztRQUc1QixrQkFBWSxHQUFXLElBQUksQ0FBQztRQUc1QixrQkFBWSxHQUFXLElBQUksQ0FBQztRQUc1QixrQkFBWSxHQUFnQixJQUFJLENBQUM7UUFFakMsb0JBQWMsR0FBYyxnQ0FBWSxDQUFDLEVBQUUsQ0FBQzs7SUF5V2hELENBQUM7SUF2V0csZ0NBQWdDO0lBRWhDLCtCQUErQjtJQUMvQixJQUFJO0lBQ0oseUNBQXlDO0lBQ3pDLElBQUk7SUFFSiw0QkFBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNkLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNoQixJQUFJLENB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Q1E7SUEzQmhCLFNBQVM7UUFEN0IsT0FBTztPQUNhLFNBQVMsQ0FzWTdCO0lBQUQsZ0JBQUM7Q0F0WUQsQUFzWUMsQ0F0WXNDLHFCQUFXLEdBc1lqRDtrQkF0WW9CLFNBQVMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHsgQWNjZXNzTmFtZSwgSHR0cE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vLi9OZXRXb3JrL0h0dHBNYW5hZ2VyXCI7XHJcbmltcG9ydCBBcGtNYW5hZ2VyIGZyb20gXCIuLi8uLi9BZHMvQXBrTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBJc1Rlc3RTZXJ2ZXIgfSBmcm9tIFwiLi4vLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBHYW1lRGF0YSBmcm9tIFwiLi4vLi4vR2FtZURhdGFcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi8uLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBIZXJvTWFuYWdlciB9IGZyb20gXCIuLi8uLi9IZXJvL0RhdGEvSGVyb01hbmFnZXJcIjtcclxuaW1wb3J0IHsgTGFuZ3VhZ2VJbmRleCwgTGFuZ3VhZ2VUeXBlIH0gZnJvbSBcIi4uLy4uL211bHRpTGFuZ3VhZ2UvTGFuZ3VhZ2VDb25zdGFudHNcIjtcclxuaW1wb3J0IExhbmd1YWdlTWFuYWdlciBmcm9tIFwiLi4vLi4vbXVsdGlMYW5ndWFnZS9MYW5ndWFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgUHJvcE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vUHJvcC9Qcm9wTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTb3VuZEluZGV4IH0gZnJvbSBcIi4uLy4uL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBVc2VyRGF0YSBmcm9tIFwiLi4vLi4vVXNlckRhdGFcIjtcclxuaW1wb3J0IFVJQ29tcG9uZW50IGZyb20gXCIuLi9VSUNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBVSUxheWVyTGV2ZWwsIFVJUGF0aCB9IGZyb20gXCIuLi9VSUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBVSU1hbmFnZXIgfSBmcm9tIFwiLi4vVUlNYW5hZ2VyXCI7XHJcbmltcG9ydCBBdmF0YXJVaSBmcm9tIFwiLi9BdmF0YXJVaVwiO1xyXG5pbXBvcnQgTWFpblVpIGZyb20gXCIuL01haW5VaVwiO1xyXG5cclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2V0dGluZ1VpIGV4dGVuZHMgVUlDb21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShbY2MuU3ByaXRlRnJhbWVdKVxyXG4gICAgc291bmRfc3A6Y2MuU3ByaXRlRnJhbWVbXT1bXTtcclxuXHJcbiAgICBAcHJvcGVydHkoW2NjLlNwcml0ZUZyYW1lXSlcclxuICAgIG11aXNjX3NwOmNjLlNwcml0ZUZyYW1lW109W107XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlNsaWRlcilcclxuICAgIG11c2ljX3NsaWRlcjpjYy5TbGlkZXI9bnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU2xpZGVyKVxyXG4gICAgc291bmRfc2xpZGVyOmNjLlNsaWRlcj1udWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgbXVzaWNfcHJvZ3Jlc3M6Y2MuTm9kZT1udWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgc291bmRfcHJvZ3Jlc3M6Y2MuTm9kZT1udWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXHJcbiAgICBtdXNpY19zcHJpdGU6Y2MuU3ByaXRlPW51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcclxuICAgIHNvdW5kX3Nwcml0ZTpjYy5TcHJpdGU9bnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlQXRsYXMpXHJcbiAgICBzcHJpdGVfYXRsYXM6Y2MuU3ByaXRlQXRsYXM9bnVsbDtcclxuXHJcbiAgICBjdXJfc2VsZWN0X2xhbjpMYW5ndWFnZVR5cGU9TGFuZ3VhZ2VUeXBlLmVuO1xyXG5cclxuICAgIC8vIGNsb3NlX2NhbGxiYWNrOkZ1bmN0aW9uPW51bGw7XHJcblxyXG4gICAgLy8gaW5pdChjbG9zZUNhbGxiYWNrOkZ1bmN0aW9uKVxyXG4gICAgLy8ge1xyXG4gICAgLy8gICAgIHRoaXMuY2xvc2VfY2FsbGJhY2s9Y2xvc2VDYWxsYmFjaztcclxuICAgIC8vIH1cclxuXHJcbiAgICBvbkVuYWJsZSAoKSB7XHJcbiAgICAgICAgdGhpcy5zaG93TmFtZSgpO1xyXG4gICAgICAgIHRoaXMuc2hvd0lkKCk7XHJcbiAgICAgICAgdGhpcy5zZXRNdXNpYygpO1xyXG4gICAgICAgIHRoaXMuc2V0U291bmQoKTtcclxuICAgICAgICB0aGlzLnNldFZlcnNpb24oKTtcclxuICAgICAgICB0aGlzLnNob3dBdmF0YXIoKTtcclxuICAgICAgICB0aGlzLnNob3dMYW4oKTtcclxuICAgICAgICB0aGlzLnNldEJ0bkxvZ2luKCk7XHJcbiAgICAgICAgQXBrTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dCYW5uZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRCdG5Mb2dpbigpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGJ0bkZiPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnYnRuRmInKTtcclxuICAgICAgICBidG5GYi5hY3RpdmU9SXNUZXN0U2VydmVyO1xyXG4gICAgICAgIGxldCBidG5Hb29nbGU9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdidG5Hb29nbGUnKTtcclxuICAgICAgICBidG5Hb29nbGUuYWN0aXZlPUlzVGVzdFNlcnZlcjtcclxuICAgIH1cclxuXHJcbiAgICBzaG93TmFtZSgpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IG5hbWVFZGl0Qm94PXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnaW5mbycpLmdldENoaWxkQnlOYW1lKCduYW1lRWRpdEJveCcpO1xyXG4gICAgICAgIGxldCBlZGl0PW5hbWVFZGl0Qm94LmdldENvbXBvbmVudChjYy5FZGl0Qm94KTtcclxuICAgICAgICBlZGl0LnN0cmluZz1Vc2VyRGF0YS5nZXRJbnN0YW5jZSgpLmdldFVzZXJOYW1lKCk7XHJcbiAgICAgICAgZWRpdC5lbmFibGVkPWZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFZlcnNpb24oKVxyXG4gICAge1xyXG4gICAgICAgIC8v5LuO5a6J5Y2T5Zue5LygXHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCd2ZXJTdHInKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1MYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJpbmcoTGFuZ3VhZ2VJbmRleC5WZXJzaW9uKSsnICcrQXBrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFwcF92ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0F2YXRhcigpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGJ0bkF2YXRhcj10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2luZm8nKS5nZXRDaGlsZEJ5TmFtZSgnaGVhZFBvcnRyYWl0JykuZ2V0Q2hpbGRCeU5hbWUoJ2J0bkF2YXRhcicpO1xyXG4gICAgICAgIGxldCBhdmF0YXJJbmRleD1Vc2VyRGF0YS5nZXRJbnN0YW5jZSgpLmdldFVzZXJBdmF0YXIoKTtcclxuICAgICAgICAvLyBsZXQgc3BOYW1lPSdoZXJvJythdmF0YXJJbmRleDtcclxuICAgICAgICAvLyBsZXQgc3BOYW1lPSdUWV9UWF8wJythdmF0YXJJbmRleDtcclxuICAgICAgICAvLyBpZihhdmF0YXJJbmRleD49MTApXHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgIC8vICAgICBzcE5hbWU9J1RZX1RYXycrYXZhdGFySW5kZXg7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIGJ0bkF2YXRhci5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZT10aGlzLmdldEF2YXRhcihzcE5hbWUpO1xyXG4gICAgICAgIGJ0bkF2YXRhci5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZT1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNwaGVhZFBvcnRyYWl0VHlwZShhdmF0YXJJbmRleCkvL0hlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3ByaXRlRnJhbWVCeU5hbWUoc3BOYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRBdmF0YXIoc3RyOnN0cmluZyk6Y2MuU3ByaXRlRnJhbWVcclxuICAgIHtcclxuICAgICAgICAgcmV0dXJuIHRoaXMuc3ByaXRlX2F0bGFzLmdldFNwcml0ZUZyYW1lKHN0cik7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0F2YXRhclJvb3QoKVxyXG4gICAge1xyXG4gICAgICAgIC8vIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dBdmF0YXJSb290KHtvbkNsb3NlOigpPT57XHJcbiAgICAgICAgLy8gICAgIHRoaXMuc2hvd0F2YXRhcigpO1xyXG4gICAgICAgIC8vIH19KVxyXG4gICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguQXZhdGFyUm9vdCxVSUxheWVyTGV2ZWwuVHdvLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+IHtcclxuICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChBdmF0YXJVaSkuaW5pdCh7b25DbG9zZTooKT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93QXZhdGFyKCk7XHJcbiAgICAgICAgICAgIH19KTtcclxuICAgICAgICB9LH0pXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHNob3dJZCgpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGlkU3RyPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnaW5mbycpLmdldENoaWxkQnlOYW1lKCdpZFN0cicpO1xyXG4gICAgICAgIGlkU3RyLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPVVzZXJEYXRhLmdldEluc3RhbmNlKCkuZ2V0VXNlcklEKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5BdmF0YXIoKVxyXG4gICAge1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgdGhpcy5zaG93QXZhdGFyUm9vdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuUmVuYW1lKClcclxuICAgIHtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIGxldCBuYW1lRWRpdEJveD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2luZm8nKS5nZXRDaGlsZEJ5TmFtZSgnbmFtZUVkaXRCb3gnKTtcclxuICAgICAgICBsZXQgZWRpdD1uYW1lRWRpdEJveC5nZXRDb21wb25lbnQoY2MuRWRpdEJveCk7XHJcbiAgICAgICAgZWRpdC5lbmFibGVkPXRydWU7XHJcbiAgICAgICAgZWRpdC5mb2N1cygpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uUmVuYW1lRmluaXNoKGVkaXRCb3g6Y2MuRWRpdEJveClcclxuICAgIHtcclxuICAgICAgICBpZihlZGl0Qm94LnN0cmluZyE9JycpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBVc2VyRGF0YS5nZXRJbnN0YW5jZSgpLnNhdmVVc2VyTmFtZShlZGl0Qm94LnN0cmluZyk7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd05hbWUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25DbG9zZSgpIHtcclxuICAgICAgICBjYy5sb2coJ1NldHRpbmdVaScpOyAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5DbG9zZSgpXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVTb3VuZCgpO1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkucmVmcmVzaFRvcFNob3coKTtcclxuICAgICAgICBIdHRwTWFuYWdlci5wb3N0KEFjY2Vzc05hbWUudXBkYXRlQXZhdGFyLHRoaXMuZ2V0TmFtZUFuZEljb25Kc29uU3RyaW5nKCkpO1xyXG4gICAgICAgIHN1cGVyLm9uQ2xvc2UoKTtcclxuICAgICAgICBBcGtNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2xvc2VCYW5uZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93TGFuKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmN1cl9zZWxlY3RfbGFuPUxhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEN1ckxhbmd1YWdlVHlwZSgpOyAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tTZWxlY3RMYW4oYnRuLGluZGV4U3RyOnN0cmluZylcclxuICAgIHtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIGxldCBpbmRleD1wYXJzZUludChpbmRleFN0cik7XHJcbiAgICAgICAgaWYoaW5kZXghPXRoaXMuY3VyX3NlbGVjdF9sYW4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmN1cl9zZWxlY3RfbGFuPWluZGV4O1xyXG4gICAgICAgICAgICB0aGlzLnNob3dTZWxlY3RMYW4oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1NlbGVjdExhbigpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGxhblNlbGVjdFJvb3Q9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdsYW5TZWxlY3RSb290Jyk7XHJcbiAgICAgICAgbGFuU2VsZWN0Um9vdC5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAvL1xyXG4gICAgICAgIGxldCBsYW5Sb290PWxhblNlbGVjdFJvb3QuZ2V0Q2hpbGRCeU5hbWUoJ2xhblJvb3QnKTtcclxuICAgICAgICBsZXQgc2VsZWN0PWxhblNlbGVjdFJvb3QuZ2V0Q2hpbGRCeU5hbWUoJ3NlbGVjdCcpO1xyXG4gICAgICAgIGxldCBsYW5UeXBlPXRoaXMuY3VyX3NlbGVjdF9sYW47XHJcbiAgICAgICAgbGV0IHNlbGVjdExhbj1sYW5Sb290LmNoaWxkcmVuW2xhblR5cGVdO1xyXG4gICAgICAgIHNlbGVjdC54PXNlbGVjdExhbi54ICsgbGFuUm9vdC54O1xyXG4gICAgICAgIHNlbGVjdC55PXNlbGVjdExhbi55ICsgbGFuUm9vdC55O1xyXG4gICAgfVxyXG5cclxuICAgIGNsb3NlU2VsZWN0TGFuKClcclxuICAgIHtcclxuICAgICAgICBsZXQgbGFuU2VsZWN0Um9vdD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2xhblNlbGVjdFJvb3QnKTtcclxuICAgICAgICBsYW5TZWxlY3RSb290LmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICBMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRMYW5ndWFnZSh0aGlzLmN1cl9zZWxlY3RfbGFuKTtcclxuICAgICAgICBjYy5maW5kKCdDYW52YXMvbWFpbl91aScpLmdldENvbXBvbmVudChNYWluVWkpLm9uRW5hYmxlKCk7XHJcbiAgICAgICAgdGhpcy5vbkVuYWJsZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuTGFuKClcclxuICAgIHtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIC8v5by55Ye66K+t6KiA6YCJ5oup5qGGXHJcbiAgICAgICAgdGhpcy5zaG93U2VsZWN0TGFuKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5Pa0xhbigpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgY2MuZmluZCgnQ2FudmFzL21haW5fdWknKS5nZXRDb21wb25lbnQoTWFpblVpKS5yZWZyZXNoTWFpblRhc2tVaSgpO1xyXG4gICAgICAgIH0sMC4wMik7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICB0aGlzLmNsb3NlU2VsZWN0TGFuKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5FbWFpbCgpXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBBcGtNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0NhbGxNZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuRmIoKVxyXG4gICAge1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCgxMDAxMTMpKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgICAgLy/lkIzmraXkv6Hmga/vvIzlpoLmnpzmsqHmnInkv6Hmga/vvIzliJnkuIrkvKDvvIzkuIrkvKDkuIDmrKHkv6Hmga9cclxuICAgICAgICBBcGtNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9naW5Gb3JGQigoanNvbjphbnkpPT57ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKGpzb24udWlkKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZihqc29uLnVpZCE9VXNlckRhdGEuZ2V0SW5zdGFuY2UoKS5nZXRVc2VySUQoKSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBVc2VyRGF0YS5nZXRJbnN0YW5jZSgpLnNhdmVVc2VySUQoanNvbi51aWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEh0dHBNYW5hZ2VyLnBvc3RUb0lzc3VlZChVUkxfVFlQRS5pc3N1ZWQsUGFyYW1zX1R5cGUuY29pbiwoZGF0YSk9PntcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgaWYoZGF0YSlcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAvL+WmguaenOayoeacieS/oeaBr++8jFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgaWYoZGF0YS5jb2luPT0wICYmIGRhdGEuZ2VtPT0wICYmIGRhdGEuY29tcGxldGVfbGV2ZWw9PTApXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgLy/pnIDopoHkuIrkvKDmnKzlnLDmlbDmja5cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBIdHRwTWFuYWdlci5wb3N0VG9VcGxvYWRBbGwoKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgR2FtZURhdGEuZ2V0SW5zdGFuY2UoKS5zeW5jRGF0YShkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgfSAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIH0pO1xyXG4gICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuR29vZ2xlKClcclxuICAgIHtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTAwMTEzKSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIC8v5LiK5Lyg5LiA5qyh5L+h5oGvXHJcbiAgICAgICAgQXBrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmxvZ2luRm9yR29vZ2xlKChqc29uOmFueSk9PnsgICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYoanNvbi51aWQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKGpzb24udWlkIT1Vc2VyRGF0YS5nZXRJbnN0YW5jZSgpLmdldFVzZXJJRCgpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFVzZXJEYXRhLmdldEluc3RhbmNlKCkuc2F2ZVVzZXJJRChqc29uLnVpZCk7ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAvLyBIdHRwTWFuYWdlci5wb3N0VG9Jc3N1ZWQoVVJMX1RZUEUuaXNzdWVkLFBhcmFtc19UeXBlLmNvaW4sKGRhdGEpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGlmKGRhdGEpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgLy/lpoLmnpzmsqHmnInkv6Hmga/vvIxcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIGlmKGRhdGEuY29pbj09MCAmJiBkYXRhLmdlbT09MCAmJiBkYXRhLmNvbXBsZXRlX2xldmVsPT0wKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIC8v6ZyA6KaB5LiK5Lyg5pys5Zyw5pWw5o2uXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgSHR0cE1hbmFnZXIucG9zdFRvVXBsb2FkQWxsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIEdhbWVEYXRhLmdldEluc3RhbmNlKCkuc3luY0RhdGEoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIH0gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAvLyB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuRXhpdCgpXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dEaWFsb2coTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyaW5nKExhbmd1YWdlSW5kZXguRG9feW91X3JlYWxseV93YW50X3RvX3F1aXRfZ2FtZSksKCk9PntcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICAgICAgLy/nu5PmnZ/muLjmiI9cclxuICAgICAgICAgICAgR2FtZURhdGEuZ2V0SW5zdGFuY2UoKS5zYXZlRXhpdFRpbWUoKTtcclxuICAgICAgICAgICAgY2MuZ2FtZS5lbmQoKTtcclxuICAgICAgICB9LCgpPT57XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgfSwwKTtcclxuICAgIH1cclxuXHJcbiAgICAvLysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK+mfs+aViOiuvue9risrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK1xyXG5cclxuICAgIGNsaWNrQnRuU291bmQoYjpjYy5FdmVudC5FdmVudFRvdWNoKVxyXG4gICAge1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgaWYoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnZvbHVtZT4wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLm11dGU9IUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5tdXRlO1xyXG4gICAgICAgICAgICB0aGlzLnNldFNvdW5kKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuTXVzaWMoYjpjYy5FdmVudC5FdmVudFRvdWNoKVxyXG4gICAge1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgaWYoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5tdXNpY19tYW5hZ2VyLnZvbHVtZT4wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5tdXNpY19tYW5hZ2VyLm11dGU9IUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkubXVzaWNfbWFuYWdlci5tdXRlO1xyXG4gICAgICAgICAgICB0aGlzLnNldE11c2ljKCk7XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgdG91Y2hTb3VuZFNsaWRlcihlOmNjLlNsaWRlcilcclxuICAgIHtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIudm9sdW1lPWUucHJvZ3Jlc3M7XHJcbiAgICAgICAgaWYoZS5wcm9ncmVzcz4wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLm11dGU9ZmFsc2U7XHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5tdXRlPXRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0U291bmQoKTtcclxuICAgIH1cclxuXHJcbiAgICB0b3VjaFNvdW5kU2xpZGVyRW5kKGU6Y2MuU2xpZGVyKVxyXG4gICAge1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlU291bmQoKTtcclxuICAgIH1cclxuXHJcbiAgICB0b3VjaE11c2ljU2xpZGVyKGU6Y2MuU2xpZGVyKVxyXG4gICAge1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkubXVzaWNfbWFuYWdlci52b2x1bWU9ZS5wcm9ncmVzcztcclxuICAgICAgICBpZihlLnByb2dyZXNzPjApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLm11c2ljX21hbmFnZXIubXV0ZT1mYWxzZTtcclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5tdXNpY19tYW5hZ2VyLm11dGU9dHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXRNdXNpYygpO1xyXG4gICAgfVxyXG5cclxuICAgIHRvdWNoTXVzaWNTbGlkZXJFbmQoZTpjYy5TbGlkZXIpXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVTb3VuZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFNvdW5kKClcclxuICAgIHtcclxuICAgICAgICBsZXQgZ21zPUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlcjtcclxuICAgICAgICB0aGlzLnNvdW5kX3NsaWRlci5wcm9ncmVzcz1nbXMudm9sdW1lO1xyXG4gICAgICAgIHRoaXMuc291bmRfcHJvZ3Jlc3Mud2lkdGg9Z21zLnZvbHVtZSozNjA7XHJcbiAgICAgICAgaWYoZ21zLm11dGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgIHRoaXMuc291bmRfc3ByaXRlLnNwcml0ZUZyYW1lPXRoaXMuc291bmRfc3BbMF07XHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuc291bmRfc3ByaXRlLnNwcml0ZUZyYW1lPXRoaXMuc291bmRfc3BbMV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBzZXRNdXNpYygpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGdnbT1HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLm11c2ljX21hbmFnZXI7XHJcbiAgICAgICAgdGhpcy5tdXNpY19zbGlkZXIuZ2V0Q29tcG9uZW50KGNjLlNsaWRlcikucHJvZ3Jlc3M9Z2dtLnZvbHVtZTtcclxuICAgICAgICB0aGlzLm11c2ljX3Byb2dyZXNzLndpZHRoPWdnbS52b2x1bWUqMzYwO1xyXG4gICAgICAgIGlmKGdnbS5tdXRlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5tdXNpY19zcHJpdGUuc3ByaXRlRnJhbWU9dGhpcy5tdWlzY19zcFswXTtcclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5tdXNpY19zcHJpdGUuc3ByaXRlRnJhbWU9dGhpcy5tdWlzY19zcFsxXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXROYW1lQW5kSWNvbkpzb25TdHJpbmcoKTpzdHJpbmd7XHJcbiAgICAgICAgbGV0IHVpZD1Vc2VyRGF0YS5nZXRJbnN0YW5jZSgpLmdldFVzZXJJRCgpO1xyXG4gICAgICAgIGxldCBpY29uID0gVXNlckRhdGEuZ2V0SW5zdGFuY2UoKS5nZXRVc2VyQXZhdGFyKCk7XHJcbiAgICAgICAgbGV0IG5hbWUgPSBVc2VyRGF0YS5nZXRJbnN0YW5jZSgpLmdldFVzZXJOYW1lKCk7XHJcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgdWlkOnVpZCxcclxuICAgICAgICAgICAgYXZhdGFySWQ6aWNvbixcclxuICAgICAgICAgICAgbmFtZTpuYW1lLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=