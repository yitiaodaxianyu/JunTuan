
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
        //btnFb.active=IsTestServer;
        var btnGoogle = this.node.getChildByName('btnGoogle');
        //btnGoogle.active=IsTestServer;
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
        // GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        // let nameEditBox=this.node.getChildByName('info').getChildByName('nameEditBox');
        // let edit=nameEditBox.getComponent(cc.EditBox);
        // edit.enabled=true;
        // edit.focus();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVUlcXGhvbWVcXFNldHRpbmdVaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSwyREFBc0U7QUFDdEUsbURBQThDO0FBRTlDLDJDQUFzQztBQUN0QyxpREFBNEM7QUFFNUMsMkVBQW9GO0FBQ3BGLHVFQUFrRTtBQUNsRSxzREFBcUQ7QUFDckQsNkRBQXdEO0FBQ3hELDJDQUFzQztBQUN0Qyw4Q0FBeUM7QUFDekMsd0NBQW1EO0FBQ25ELDBDQUF5QztBQUN6Qyx1Q0FBa0M7QUFDbEMsbUNBQThCO0FBR3hCLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXVDLDZCQUFXO0lBQWxEO1FBQUEscUVBc1lDO1FBbllHLGNBQVEsR0FBa0IsRUFBRSxDQUFDO1FBRzdCLGNBQVEsR0FBa0IsRUFBRSxDQUFDO1FBRzdCLGtCQUFZLEdBQVcsSUFBSSxDQUFDO1FBRzVCLGtCQUFZLEdBQVcsSUFBSSxDQUFDO1FBRzVCLG9CQUFjLEdBQVMsSUFBSSxDQUFDO1FBRzVCLG9CQUFjLEdBQVMsSUFBSSxDQUFDO1FBRzVCLGtCQUFZLEdBQVcsSUFBSSxDQUFDO1FBRzVCLGtCQUFZLEdBQVcsSUFBSSxDQUFDO1FBRzVCLGtCQUFZLEdBQWdCLElBQUksQ0FBQztRQUVqQyxvQkFBYyxHQUFjLGdDQUFZLENBQUMsRUFBRSxDQUFDOztJQXlXaEQsQ0FBQztJQXZXRyxnQ0FBZ0M7SUFFaEMsK0JBQStCO0lBQy9CLElBQUk7SUFDSix5Q0FBeUM7SUFDekMsSUFBSTtJQUVKLDRCQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2QsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxRQUFRLEVBQUUs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QUFHLGtCQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDaEQsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQ2xCLEdBQUcsRUFBQyxHQUFHO1lBQ1AsUUFBUSxFQUFDLElBQUk7WUFDYixJQUFJLEVBQUMsSUFBSTtTQUNaLENBQUMsQ0FBQztJQUNQLENBQUM7SUFqWUQ7UUFEQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUM7K0NBQ0U7SUFHN0I7UUFEQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUM7K0NBQ0U7SUFHN0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzttREFDUTtJQUc1QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO21EQUNRO0lBRzVCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7cURBQ1U7SUFHNUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztxREFDVTtJQUc1QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO21EQUNRO0lBRzVCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7bURBQ1E7SUFHNUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQzttREFDUTtJQTNCaEIsU0FBUztRQUQ3QixPQUFPO09BQ2EsU0FBUyxDQXNZN0I7SUFBRCxnQkFBQztDQXRZRCxBQXNZQyxDQXRZc0MscUJBQVcsR0FzWWpEO2tCQXRZb0IsU0FBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgeyBBY2Nlc3NOYW1lLCBIdHRwTWFuYWdlciB9IGZyb20gXCIuLi8uLi8uL05ldFdvcmsvSHR0cE1hbmFnZXJcIjtcclxuaW1wb3J0IEFwa01hbmFnZXIgZnJvbSBcIi4uLy4uL0Fkcy9BcGtNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IElzVGVzdFNlcnZlciB9IGZyb20gXCIuLi8uLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IEdhbWVEYXRhIGZyb20gXCIuLi8uLi9HYW1lRGF0YVwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uLy4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEhlcm9NYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0hlcm8vRGF0YS9IZXJvTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBMYW5ndWFnZUluZGV4LCBMYW5ndWFnZVR5cGUgfSBmcm9tIFwiLi4vLi4vbXVsdGlMYW5ndWFnZS9MYW5ndWFnZUNvbnN0YW50c1wiO1xyXG5pbXBvcnQgTGFuZ3VhZ2VNYW5hZ2VyIGZyb20gXCIuLi8uLi9tdWx0aUxhbmd1YWdlL0xhbmd1YWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBQcm9wTWFuYWdlciB9IGZyb20gXCIuLi8uLi9Qcm9wL1Byb3BNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFNvdW5kSW5kZXggfSBmcm9tIFwiLi4vLi4vU291bmQvQXVkaW9Db25zdGFudHNcIjtcclxuaW1wb3J0IFVzZXJEYXRhIGZyb20gXCIuLi8uLi9Vc2VyRGF0YVwiO1xyXG5pbXBvcnQgVUlDb21wb25lbnQgZnJvbSBcIi4uL1VJQ29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFVJTGF5ZXJMZXZlbCwgVUlQYXRoIH0gZnJvbSBcIi4uL1VJQ29uZmlnXCI7XHJcbmltcG9ydCB7IFVJTWFuYWdlciB9IGZyb20gXCIuLi9VSU1hbmFnZXJcIjtcclxuaW1wb3J0IEF2YXRhclVpIGZyb20gXCIuL0F2YXRhclVpXCI7XHJcbmltcG9ydCBNYWluVWkgZnJvbSBcIi4vTWFpblVpXCI7XHJcblxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZXR0aW5nVWkgZXh0ZW5kcyBVSUNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KFtjYy5TcHJpdGVGcmFtZV0pXHJcbiAgICBzb3VuZF9zcDpjYy5TcHJpdGVGcmFtZVtdPVtdO1xyXG5cclxuICAgIEBwcm9wZXJ0eShbY2MuU3ByaXRlRnJhbWVdKVxyXG4gICAgbXVpc2Nfc3A6Y2MuU3ByaXRlRnJhbWVbXT1bXTtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU2xpZGVyKVxyXG4gICAgbXVzaWNfc2xpZGVyOmNjLlNsaWRlcj1udWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5TbGlkZXIpXHJcbiAgICBzb3VuZF9zbGlkZXI6Y2MuU2xpZGVyPW51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBtdXNpY19wcm9ncmVzczpjYy5Ob2RlPW51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBzb3VuZF9wcm9ncmVzczpjYy5Ob2RlPW51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcclxuICAgIG11c2ljX3Nwcml0ZTpjYy5TcHJpdGU9bnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxyXG4gICAgc291bmRfc3ByaXRlOmNjLlNwcml0ZT1udWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGVBdGxhcylcclxuICAgIHNwcml0ZV9hdGxhczpjYy5TcHJpdGVBdGxhcz1udWxsO1xyXG5cclxuICAgIGN1cl9zZWxlY3RfbGFuOkxhbmd1YWdlVHlwZT1MYW5ndWFnZVR5cGUuZW47XHJcblxyXG4gICAgLy8gY2xvc2VfY2FsbGJhY2s6RnVuY3Rpb249bnVsbDtcclxuXHJcbiAgICAvLyBpbml0KGNsb3NlQ2FsbGJhY2s6RnVuY3Rpb24pXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgICAgdGhpcy5jbG9zZV9jYWxsYmFjaz1jbG9zZUNhbGxiYWNrO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIG9uRW5hYmxlICgpIHtcclxuICAgICAgICB0aGlzLnNob3dOYW1lKCk7XHJcbiAgICAgICAgdGhpcy5zaG93SWQoKTtcclxuICAgICAgICB0aGlzLnNldE11c2ljKCk7XHJcbiAgICAgICAgdGhpcy5zZXRTb3VuZCgpO1xyXG4gICAgICAgIHRoaXMuc2V0VmVyc2lvbigpO1xyXG4gICAgICAgIHRoaXMuc2hvd0F2YXRhcigpO1xyXG4gICAgICAgIHRoaXMuc2hvd0xhbigpO1xyXG4gICAgICAgIHRoaXMuc2V0QnRuTG9naW4oKTtcclxuICAgICAgICBBcGtNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0Jhbm5lcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEJ0bkxvZ2luKClcclxuICAgIHtcclxuICAgICAgICBsZXQgYnRuRmI9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdidG5GYicpO1xyXG4gICAgICAgIC8vYnRuRmIuYWN0aXZlPUlzVGVzdFNlcnZlcjtcclxuICAgICAgICBsZXQgYnRuR29vZ2xlPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnYnRuR29vZ2xlJyk7XHJcbiAgICAgICAgLy9idG5Hb29nbGUuYWN0aXZlPUlzVGVzdFNlcnZlcjtcclxuICAgIH1cclxuXHJcbiAgICBzaG93TmFtZSgpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IG5hbWVFZGl0Qm94PXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnaW5mbycpLmdldENoaWxkQnlOYW1lKCduYW1lRWRpdEJveCcpO1xyXG4gICAgICAgIGxldCBlZGl0PW5hbWVFZGl0Qm94LmdldENvbXBvbmVudChjYy5FZGl0Qm94KTtcclxuICAgICAgICBlZGl0LnN0cmluZz1Vc2VyRGF0YS5nZXRJbnN0YW5jZSgpLmdldFVzZXJOYW1lKCk7XHJcbiAgICAgICAgZWRpdC5lbmFibGVkPWZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFZlcnNpb24oKVxyXG4gICAge1xyXG4gICAgICAgIC8v5LuO5a6J5Y2T5Zue5LygXHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCd2ZXJTdHInKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1MYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJpbmcoTGFuZ3VhZ2VJbmRleC5WZXJzaW9uKSsnICcrQXBrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFwcF92ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0F2YXRhcigpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGJ0bkF2YXRhcj10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2luZm8nKS5nZXRDaGlsZEJ5TmFtZSgnaGVhZFBvcnRyYWl0JykuZ2V0Q2hpbGRCeU5hbWUoJ2J0bkF2YXRhcicpO1xyXG4gICAgICAgIGxldCBhdmF0YXJJbmRleD1Vc2VyRGF0YS5nZXRJbnN0YW5jZSgpLmdldFVzZXJBdmF0YXIoKTtcclxuICAgICAgICAvLyBsZXQgc3BOYW1lPSdoZXJvJythdmF0YXJJbmRleDtcclxuICAgICAgICAvLyBsZXQgc3BOYW1lPSdUWV9UWF8wJythdmF0YXJJbmRleDtcclxuICAgICAgICAvLyBpZihhdmF0YXJJbmRleD49MTApXHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgIC8vICAgICBzcE5hbWU9J1RZX1RYXycrYXZhdGFySW5kZXg7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIGJ0bkF2YXRhci5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZT10aGlzLmdldEF2YXRhcihzcE5hbWUpO1xyXG4gICAgICAgIGJ0bkF2YXRhci5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZT1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNwaGVhZFBvcnRyYWl0VHlwZShhdmF0YXJJbmRleCkvL0hlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3ByaXRlRnJhbWVCeU5hbWUoc3BOYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRBdmF0YXIoc3RyOnN0cmluZyk6Y2MuU3ByaXRlRnJhbWVcclxuICAgIHtcclxuICAgICAgICAgcmV0dXJuIHRoaXMuc3ByaXRlX2F0bGFzLmdldFNwcml0ZUZyYW1lKHN0cik7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0F2YXRhclJvb3QoKVxyXG4gICAge1xyXG4gICAgICAgIC8vIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dBdmF0YXJSb290KHtvbkNsb3NlOigpPT57XHJcbiAgICAgICAgLy8gICAgIHRoaXMuc2hvd0F2YXRhcigpO1xyXG4gICAgICAgIC8vIH19KVxyXG4gICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguQXZhdGFyUm9vdCxVSUxheWVyTGV2ZWwuVHdvLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+IHtcclxuICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChBdmF0YXJVaSkuaW5pdCh7b25DbG9zZTooKT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93QXZhdGFyKCk7XHJcbiAgICAgICAgICAgIH19KTtcclxuICAgICAgICB9LH0pXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHNob3dJZCgpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGlkU3RyPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnaW5mbycpLmdldENoaWxkQnlOYW1lKCdpZFN0cicpO1xyXG4gICAgICAgIGlkU3RyLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPVVzZXJEYXRhLmdldEluc3RhbmNlKCkuZ2V0VXNlcklEKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5BdmF0YXIoKVxyXG4gICAge1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgdGhpcy5zaG93QXZhdGFyUm9vdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuUmVuYW1lKClcclxuICAgIHtcclxuICAgICAgICAvLyBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIC8vIGxldCBuYW1lRWRpdEJveD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2luZm8nKS5nZXRDaGlsZEJ5TmFtZSgnbmFtZUVkaXRCb3gnKTtcclxuICAgICAgICAvLyBsZXQgZWRpdD1uYW1lRWRpdEJveC5nZXRDb21wb25lbnQoY2MuRWRpdEJveCk7XHJcbiAgICAgICAgLy8gZWRpdC5lbmFibGVkPXRydWU7XHJcbiAgICAgICAgLy8gZWRpdC5mb2N1cygpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uUmVuYW1lRmluaXNoKGVkaXRCb3g6Y2MuRWRpdEJveClcclxuICAgIHtcclxuICAgICAgICBpZihlZGl0Qm94LnN0cmluZyE9JycpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBVc2VyRGF0YS5nZXRJbnN0YW5jZSgpLnNhdmVVc2VyTmFtZShlZGl0Qm94LnN0cmluZyk7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd05hbWUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25DbG9zZSgpIHtcclxuICAgICAgICBjYy5sb2coJ1NldHRpbmdVaScpOyAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5DbG9zZSgpXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVTb3VuZCgpO1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkucmVmcmVzaFRvcFNob3coKTtcclxuICAgICAgICBIdHRwTWFuYWdlci5wb3N0KEFjY2Vzc05hbWUudXBkYXRlQXZhdGFyLHRoaXMuZ2V0TmFtZUFuZEljb25Kc29uU3RyaW5nKCkpO1xyXG4gICAgICAgIHN1cGVyLm9uQ2xvc2UoKTtcclxuICAgICAgICBBcGtNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2xvc2VCYW5uZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93TGFuKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmN1cl9zZWxlY3RfbGFuPUxhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEN1ckxhbmd1YWdlVHlwZSgpOyAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tTZWxlY3RMYW4oYnRuLGluZGV4U3RyOnN0cmluZylcclxuICAgIHtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIGxldCBpbmRleD1wYXJzZUludChpbmRleFN0cik7XHJcbiAgICAgICAgaWYoaW5kZXghPXRoaXMuY3VyX3NlbGVjdF9sYW4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmN1cl9zZWxlY3RfbGFuPWluZGV4O1xyXG4gICAgICAgICAgICB0aGlzLnNob3dTZWxlY3RMYW4oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1NlbGVjdExhbigpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGxhblNlbGVjdFJvb3Q9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdsYW5TZWxlY3RSb290Jyk7XHJcbiAgICAgICAgbGFuU2VsZWN0Um9vdC5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAvL1xyXG4gICAgICAgIGxldCBsYW5Sb290PWxhblNlbGVjdFJvb3QuZ2V0Q2hpbGRCeU5hbWUoJ2xhblJvb3QnKTtcclxuICAgICAgICBsZXQgc2VsZWN0PWxhblNlbGVjdFJvb3QuZ2V0Q2hpbGRCeU5hbWUoJ3NlbGVjdCcpO1xyXG4gICAgICAgIGxldCBsYW5UeXBlPXRoaXMuY3VyX3NlbGVjdF9sYW47XHJcbiAgICAgICAgbGV0IHNlbGVjdExhbj1sYW5Sb290LmNoaWxkcmVuW2xhblR5cGVdO1xyXG4gICAgICAgIHNlbGVjdC54PXNlbGVjdExhbi54ICsgbGFuUm9vdC54O1xyXG4gICAgICAgIHNlbGVjdC55PXNlbGVjdExhbi55ICsgbGFuUm9vdC55O1xyXG4gICAgfVxyXG5cclxuICAgIGNsb3NlU2VsZWN0TGFuKClcclxuICAgIHtcclxuICAgICAgICBsZXQgbGFuU2VsZWN0Um9vdD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2xhblNlbGVjdFJvb3QnKTtcclxuICAgICAgICBsYW5TZWxlY3RSb290LmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICBMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRMYW5ndWFnZSh0aGlzLmN1cl9zZWxlY3RfbGFuKTtcclxuICAgICAgICBjYy5maW5kKCdDYW52YXMvbWFpbl91aScpLmdldENvbXBvbmVudChNYWluVWkpLm9uRW5hYmxlKCk7XHJcbiAgICAgICAgdGhpcy5vbkVuYWJsZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuTGFuKClcclxuICAgIHtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIC8v5by55Ye66K+t6KiA6YCJ5oup5qGGXHJcbiAgICAgICAgdGhpcy5zaG93U2VsZWN0TGFuKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5Pa0xhbigpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgY2MuZmluZCgnQ2FudmFzL21haW5fdWknKS5nZXRDb21wb25lbnQoTWFpblVpKS5yZWZyZXNoTWFpblRhc2tVaSgpO1xyXG4gICAgICAgIH0sMC4wMik7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICB0aGlzLmNsb3NlU2VsZWN0TGFuKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5FbWFpbCgpXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBBcGtNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0NhbGxNZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuRmIoKVxyXG4gICAge1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCgxMDAxMTMpKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgICAgLy/lkIzmraXkv6Hmga/vvIzlpoLmnpzmsqHmnInkv6Hmga/vvIzliJnkuIrkvKDvvIzkuIrkvKDkuIDmrKHkv6Hmga9cclxuICAgICAgICBBcGtNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9naW5Gb3JGQigoanNvbjphbnkpPT57ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKGpzb24udWlkKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZihqc29uLnVpZCE9VXNlckRhdGEuZ2V0SW5zdGFuY2UoKS5nZXRVc2VySUQoKSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBVc2VyRGF0YS5nZXRJbnN0YW5jZSgpLnNhdmVVc2VySUQoanNvbi51aWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEh0dHBNYW5hZ2VyLnBvc3RUb0lzc3VlZChVUkxfVFlQRS5pc3N1ZWQsUGFyYW1zX1R5cGUuY29pbiwoZGF0YSk9PntcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgaWYoZGF0YSlcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAvL+WmguaenOayoeacieS/oeaBr++8jFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgaWYoZGF0YS5jb2luPT0wICYmIGRhdGEuZ2VtPT0wICYmIGRhdGEuY29tcGxldGVfbGV2ZWw9PTApXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgLy/pnIDopoHkuIrkvKDmnKzlnLDmlbDmja5cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBIdHRwTWFuYWdlci5wb3N0VG9VcGxvYWRBbGwoKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgR2FtZURhdGEuZ2V0SW5zdGFuY2UoKS5zeW5jRGF0YShkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgfSAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIH0pO1xyXG4gICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuR29vZ2xlKClcclxuICAgIHtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTAwMTEzKSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIC8v5LiK5Lyg5LiA5qyh5L+h5oGvXHJcbiAgICAgICAgQXBrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmxvZ2luRm9yR29vZ2xlKChqc29uOmFueSk9PnsgICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYoanNvbi51aWQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKGpzb24udWlkIT1Vc2VyRGF0YS5nZXRJbnN0YW5jZSgpLmdldFVzZXJJRCgpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFVzZXJEYXRhLmdldEluc3RhbmNlKCkuc2F2ZVVzZXJJRChqc29uLnVpZCk7ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAvLyBIdHRwTWFuYWdlci5wb3N0VG9Jc3N1ZWQoVVJMX1RZUEUuaXNzdWVkLFBhcmFtc19UeXBlLmNvaW4sKGRhdGEpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGlmKGRhdGEpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgLy/lpoLmnpzmsqHmnInkv6Hmga/vvIxcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIGlmKGRhdGEuY29pbj09MCAmJiBkYXRhLmdlbT09MCAmJiBkYXRhLmNvbXBsZXRlX2xldmVsPT0wKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIC8v6ZyA6KaB5LiK5Lyg5pys5Zyw5pWw5o2uXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgSHR0cE1hbmFnZXIucG9zdFRvVXBsb2FkQWxsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIEdhbWVEYXRhLmdldEluc3RhbmNlKCkuc3luY0RhdGEoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIH0gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAvLyB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuRXhpdCgpXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dEaWFsb2coTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyaW5nKExhbmd1YWdlSW5kZXguRG9feW91X3JlYWxseV93YW50X3RvX3F1aXRfZ2FtZSksKCk9PntcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICAgICAgLy/nu5PmnZ/muLjmiI9cclxuICAgICAgICAgICAgR2FtZURhdGEuZ2V0SW5zdGFuY2UoKS5zYXZlRXhpdFRpbWUoKTtcclxuICAgICAgICAgICAgY2MuZ2FtZS5lbmQoKTtcclxuICAgICAgICB9LCgpPT57XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgfSwwKTtcclxuICAgIH1cclxuXHJcbiAgICAvLysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK+mfs+aViOiuvue9risrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK1xyXG5cclxuICAgIGNsaWNrQnRuU291bmQoYjpjYy5FdmVudC5FdmVudFRvdWNoKVxyXG4gICAge1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgaWYoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnZvbHVtZT4wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLm11dGU9IUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5tdXRlO1xyXG4gICAgICAgICAgICB0aGlzLnNldFNvdW5kKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuTXVzaWMoYjpjYy5FdmVudC5FdmVudFRvdWNoKVxyXG4gICAge1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgaWYoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5tdXNpY19tYW5hZ2VyLnZvbHVtZT4wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5tdXNpY19tYW5hZ2VyLm11dGU9IUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkubXVzaWNfbWFuYWdlci5tdXRlO1xyXG4gICAgICAgICAgICB0aGlzLnNldE11c2ljKCk7XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgdG91Y2hTb3VuZFNsaWRlcihlOmNjLlNsaWRlcilcclxuICAgIHtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIudm9sdW1lPWUucHJvZ3Jlc3M7XHJcbiAgICAgICAgaWYoZS5wcm9ncmVzcz4wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLm11dGU9ZmFsc2U7XHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5tdXRlPXRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0U291bmQoKTtcclxuICAgIH1cclxuXHJcbiAgICB0b3VjaFNvdW5kU2xpZGVyRW5kKGU6Y2MuU2xpZGVyKVxyXG4gICAge1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlU291bmQoKTtcclxuICAgIH1cclxuXHJcbiAgICB0b3VjaE11c2ljU2xpZGVyKGU6Y2MuU2xpZGVyKVxyXG4gICAge1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkubXVzaWNfbWFuYWdlci52b2x1bWU9ZS5wcm9ncmVzcztcclxuICAgICAgICBpZihlLnByb2dyZXNzPjApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLm11c2ljX21hbmFnZXIubXV0ZT1mYWxzZTtcclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5tdXNpY19tYW5hZ2VyLm11dGU9dHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXRNdXNpYygpO1xyXG4gICAgfVxyXG5cclxuICAgIHRvdWNoTXVzaWNTbGlkZXJFbmQoZTpjYy5TbGlkZXIpXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVTb3VuZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFNvdW5kKClcclxuICAgIHtcclxuICAgICAgICBsZXQgZ21zPUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlcjtcclxuICAgICAgICB0aGlzLnNvdW5kX3NsaWRlci5wcm9ncmVzcz1nbXMudm9sdW1lO1xyXG4gICAgICAgIHRoaXMuc291bmRfcHJvZ3Jlc3Mud2lkdGg9Z21zLnZvbHVtZSozNjA7XHJcbiAgICAgICAgaWYoZ21zLm11dGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgIHRoaXMuc291bmRfc3ByaXRlLnNwcml0ZUZyYW1lPXRoaXMuc291bmRfc3BbMF07XHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuc291bmRfc3ByaXRlLnNwcml0ZUZyYW1lPXRoaXMuc291bmRfc3BbMV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBzZXRNdXNpYygpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGdnbT1HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLm11c2ljX21hbmFnZXI7XHJcbiAgICAgICAgdGhpcy5tdXNpY19zbGlkZXIuZ2V0Q29tcG9uZW50KGNjLlNsaWRlcikucHJvZ3Jlc3M9Z2dtLnZvbHVtZTtcclxuICAgICAgICB0aGlzLm11c2ljX3Byb2dyZXNzLndpZHRoPWdnbS52b2x1bWUqMzYwO1xyXG4gICAgICAgIGlmKGdnbS5tdXRlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5tdXNpY19zcHJpdGUuc3ByaXRlRnJhbWU9dGhpcy5tdWlzY19zcFswXTtcclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5tdXNpY19zcHJpdGUuc3ByaXRlRnJhbWU9dGhpcy5tdWlzY19zcFsxXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXROYW1lQW5kSWNvbkpzb25TdHJpbmcoKTpzdHJpbmd7XHJcbiAgICAgICAgbGV0IHVpZD1Vc2VyRGF0YS5nZXRJbnN0YW5jZSgpLmdldFVzZXJJRCgpO1xyXG4gICAgICAgIGxldCBpY29uID0gVXNlckRhdGEuZ2V0SW5zdGFuY2UoKS5nZXRVc2VyQXZhdGFyKCk7XHJcbiAgICAgICAgbGV0IG5hbWUgPSBVc2VyRGF0YS5nZXRJbnN0YW5jZSgpLmdldFVzZXJOYW1lKCk7XHJcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgdWlkOnVpZCxcclxuICAgICAgICAgICAgYXZhdGFySWQ6aWNvbixcclxuICAgICAgICAgICAgbmFtZTpuYW1lLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=