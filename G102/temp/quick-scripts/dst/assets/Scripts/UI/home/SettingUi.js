
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
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        var nameEditBox = this.node.getChildByName('info').getChildByName('nameEditBox');
        var edit = nameEditBox.getComponent(cc.EditBox);
        edit.enabled = true;
        edit.focus();
    };
    SettingUi.prototype.onRenameFinish = function (editBox) {
        if (editBox.string != '') {
            // if(WXManagerEX.getInstance().checkMsg(editBox.string)==true){
            //     UserData.getInstance().saveUserName(editBox.string);
            //     this.showName();
            // }else{
            //     GameManager.getInstance().showMessage("输入内容不合法！");
            // }
            this.checkMsg(editBox.string);
        }
    };
    SettingUi.prototype.checkMsg = function (str) {
        var _this = this;
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            wx.cloud.callFunction({
                name: "checkMsg",
                data: {
                    text: str
                },
            })
                .then(function (checkTextRes) {
                var resultSuggest = checkTextRes.result.result.suggest;
                if (resultSuggest === 'pass') {
                    console.log('通过');
                    UserData_1.default.getInstance().saveUserName(str);
                    _this.showName();
                }
                else {
                    console.log('不通过');
                    _this.showName();
                    GameManager_1.default.getInstance().showMessage("输入内容不合法！");
                }
            });
        }
        else {
            UserData_1.default.getInstance().saveUserName(str);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVUlcXGhvbWVcXFNldHRpbmdVaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSwyREFBc0U7QUFDdEUsbURBQThDO0FBRTlDLDJDQUFzQztBQUN0QyxpREFBNEM7QUFFNUMsMkVBQW9GO0FBQ3BGLHVFQUFrRTtBQUNsRSxzREFBcUQ7QUFDckQsNkRBQXdEO0FBQ3hELDJDQUFzQztBQUN0Qyw4Q0FBeUM7QUFDekMsd0NBQW1EO0FBQ25ELDBDQUF5QztBQUN6Qyx1Q0FBa0M7QUFDbEMsbUNBQThCO0FBR3hCLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXVDLDZCQUFXO0lBQWxEO1FBQUEscUVBc2FDO1FBbmFHLGNBQVEsR0FBa0IsRUFBRSxDQUFDO1FBRzdCLGNBQVEsR0FBa0IsRUFBRSxDQUFDO1FBRzdCLGtCQUFZLEdBQVcsSUFBSSxDQUFDO1FBRzVCLGtCQUFZLEdBQVcsSUFBSSxDQUFDO1FBRzVCLG9CQUFjLEdBQVMsSUFBSSxDQUFDO1FBRzVCLG9CQUFjLEdBQVMsSUFBSSxDQUFDO1FBRzVCLGtCQUFZLEdBQVcsSUFBSSxDQUFDO1FBRzVCLGtCQUFZLEdBQVcsSUFBSSxDQUFDO1FBRzVCLGtCQUFZLEdBQWdCLElBQUksQ0FBQztRQUVqQyxvQkFBYyxHQUFjLGdDQUFZLENBQUMsRUFBRSxDQUFDOztJQXlZaEQsQ0FBQztJQXZZRyxnQ0FBZ0M7SUFFaEMsK0JBQStCO0lBQy9CLElBQUk7SUFDSix5Q0FBeUM7SUFDekMsSUFBSTtJQUVKLDRCQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2QsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQixvQkFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQzFDLENBQUM7SUFFRCwrQkFBVyxHQUFYO1FBRUksSUFBSSxLQUFLLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDNUMsNEJBQTRCO1FBQzVCLElBQUksU0FBUyxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3BELGdDQUFnQztJQUNwQyxDQUFDO0lBRUQsNEJBQVEsR0FBUjtRQUVJLElBQUksV0FBVyxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUMvRSxJQUFJLElBQUksR0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsTUFBTSxHQUFDLGtCQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDakQsSUFBSSxDQUFDLE9BQU8sR0FBQyxLQUFLLENBQUM7SUFDdkIsQ0FBQztJQUVELDhCQUFVLEdBQVY7UUFFSSxPQUFPO1FBQ1AsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUMseUJBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLENBQUMsaUNBQWEsQ0FBQyxPQUFPLENBQUMsR0FBQyxHQUFHLEdBQUMsb0JBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUM7SUFDekssQ0FBQztJQUVELDhCQUFVLEdBQVY7UUFFSSxJQUFJLFNBQVMsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzFHLElBQUksV0FBVyxHQUFDLGtCQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDdkQsaUNBQWlDO1FBQ2pDLG9DQUFvQztRQUNwQyxzQkFBc0I7UUFDdEIsSUFBSTtRQUNKLG1DQUFtQztRQUNuQyxJQUFJO1FBQ0osd0VBQXdFO1FBQ3hFLFNBQVMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsR0FBQyx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLHFCQUFxQixDQUFDLFdBQVcsQ0FBQyxDQUFBLENBQUEseURBQXlEO0lBQ3ZLLENBQUM7SUFFRCw2QkFBUyxHQUFULFVBQVUsR0FBVTtRQUVmLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVELGtDQUFjLEdBQWQ7UUFBQSxpQkFVQztRQVJHLHdEQUF3RDtRQUN4RCx5QkFBeUI7UUFDekIsTUFBTTtRQUNOLHFCQUFTLENBQUMsV0FBVyxFQUFFLENBQUMsWUFBWSxDQUFDLGlCQUFNLENBQUMsVUFBVSxFQUFDLHVCQUFZLENBQUMsR0FBRyxFQUFDLEVBQUMsV0FBVyxFQUFDLFVBQUMsTUFBTTtnQkFDeEYsTUFBTSxDQUFDLFlBQVksQ0FBQyxrQkFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUMsT0FBTyxFQUFDO3dCQUN4QyxLQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7b0JBQ3RCLENBQUMsRUFBQyxDQUFDLENBQUM7WUFDUixDQUFDLEdBQUUsQ0FBQyxDQUFBO0lBQ1IsQ0FBQztJQUdELDBCQUFNLEdBQU47UUFFSSxJQUFJLEtBQUssR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbkUsS0FBSyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxHQUFDLGtCQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDM0UsQ0FBQztJQUVELGtDQUFjLEdBQWQ7UUFFSSxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsMkJBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwRSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVELGtDQUFjLEdBQWQ7UUFFSSxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsMkJBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwRSxJQUFJLFdBQVcsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDL0UsSUFBSSxJQUFJLEdBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLE9BQU8sR0FBQyxJQUFJLENBQUM7UUFDbEIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFRCxrQ0FBYyxHQUFkLFVBQWUsT0FBa0I7UUFFN0IsSUFBRyxPQUFPLENBQUMsTUFBTSxJQUFFLEVBQUUsRUFDckI7WUFDSSxnRUFBZ0U7WUFDaEUsMkRBQTJEO1lBQzNELHVCQUF1QjtZQUN2QixTQUFTO1lBQ1QseURBQXlEO1lBQ3pELElBQUk7WUFDSixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNqQztJQUNMLENBQUM7SUFDTSw0QkFBUSxHQUFmLFVBQWdCLEdBQVU7UUFBMUIsaUJBMkJDO1FBekJHLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssRUFBRSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUU7WUFDeEMsRUFBRSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUM7Z0JBQ2xCLElBQUksRUFBRSxVQUFVO2dCQUNoQixJQUFJLEVBQUU7b0JBQ0YsSUFBSSxFQUFFLEdBQUc7aUJBQ1o7YUFDSixDQUFDO2lCQUNHLElBQUksQ0FBQyxVQUFDLFlBQVk7Z0JBQ2YsSUFBTSxhQUFhLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO2dCQUN6RCxJQUFJLGFBQWEsS0FBSyxNQUFNLEVBQUU7b0JBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ2xCLGtCQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUN6QyxLQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7aUJBQ25CO3FCQUFNO29CQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUE7b0JBQ2xCLEtBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQkFDaEIscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7aUJBQ3JEO1lBQ0wsQ0FBQyxDQUFDLENBQUM7U0FDVjthQUFJO1lBQ0Qsa0JBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDekMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ25CO0lBR0wsQ0FBQztJQUNELDJCQUFPLEdBQVA7UUFDSSxFQUFFLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFFRCxpQ0FBYSxHQUFiO1FBRUkscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLDJCQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEUscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUN0QyxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQzNDLHlCQUFXLENBQUMsSUFBSSxDQUFDLHdCQUFVLENBQUMsWUFBWSxFQUFDLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDLENBQUM7UUFDMUUsaUJBQU0sT0FBTyxXQUFFLENBQUM7UUFDaEIsb0JBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUMzQyxDQUFDO0lBRUQsMkJBQU8sR0FBUDtRQUVJLElBQUksQ0FBQyxjQUFjLEdBQUMseUJBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQzNFLENBQUM7SUFFRCxrQ0FBYyxHQUFkLFVBQWUsR0FBRyxFQUFDLFFBQWU7UUFFOUIscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLDJCQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEUsSUFBSSxLQUFLLEdBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzdCLElBQUcsS0FBSyxJQUFFLElBQUksQ0FBQyxjQUFjLEVBQzdCO1lBQ0ksSUFBSSxDQUFDLGNBQWMsR0FBQyxLQUFLLENBQUM7WUFDMUIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3hCO0lBQ0wsQ0FBQztJQUVELGlDQUFhLEdBQWI7UUFFSSxJQUFJLGFBQWEsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUM1RCxhQUFhLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQztRQUMxQixFQUFFO1FBQ0YsSUFBSSxPQUFPLEdBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNwRCxJQUFJLE1BQU0sR0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2xELElBQUksT0FBTyxHQUFDLElBQUksQ0FBQyxjQUFjLENBQUM7UUFDaEMsSUFBSSxTQUFTLEdBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN4QyxNQUFNLENBQUMsQ0FBQyxHQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNqQyxNQUFNLENBQUMsQ0FBQyxHQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsa0NBQWMsR0FBZDtRQUVJLElBQUksYUFBYSxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzVELGFBQWEsQ0FBQyxNQUFNLEdBQUMsS0FBSyxDQUFDO1FBQzNCLHlCQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUMvRCxFQUFFLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsWUFBWSxDQUFDLGdCQUFNLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUMxRCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVELCtCQUFXLEdBQVg7UUFFSSxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsMkJBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwRSxTQUFTO1FBQ1QsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxpQ0FBYSxHQUFiO1FBRUksSUFBSSxDQUFDLFlBQVksQ0FBQztZQUNkLEVBQUUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxZQUFZLENBQUMsZ0JBQU0sQ0FBQyxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDdkUsQ0FBQyxFQUFDLElBQUksQ0FBQyxDQUFDO1FBQ1IscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLDJCQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEUsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRCxpQ0FBYSxHQUFiO1FBRUkscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLDJCQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEUsb0JBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUMxQyxDQUFDO0lBRUQsOEJBQVUsR0FBVjtRQUVJLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQywyQkFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BFLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDLHlCQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDNUYsT0FBTztRQUNQLHdCQUF3QjtRQUN4QixvQkFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxVQUFDLElBQVE7WUFDekMsSUFBRyxJQUFJLENBQUMsR0FBRyxFQUNYO2dCQUNJLElBQUcsSUFBSSxDQUFDLEdBQUcsSUFBRSxrQkFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsRUFBRSxFQUMvQztvQkFDSSxrQkFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQzVDLHNFQUFzRTtvQkFDdEUsZUFBZTtvQkFDZixRQUFRO29CQUNSLDZCQUE2QjtvQkFDN0Isb0JBQW9CO29CQUNwQixvRUFBb0U7b0JBQ3BFLFlBQVk7b0JBQ1oseUJBQXlCO29CQUN6Qiw2Q0FBNkM7b0JBQzdDLGdCQUFnQjtvQkFDaEIsWUFBWTtvQkFDWixxREFBcUQ7b0JBQ3JELFlBQVk7b0JBQ1osZ0NBQWdDO29CQUNoQyxNQUFNO2lCQUNUO2FBQ0o7aUJBQ0Q7YUFFQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELGtDQUFjLEdBQWQ7UUFFSSxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsMkJBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwRSxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQyx5QkFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQzVGLE9BQU87UUFDUCxRQUFRO1FBQ1Isb0JBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsVUFBQyxJQUFRO1lBQzdDLElBQUcsSUFBSSxDQUFDLEdBQUcsRUFDWDtnQkFDSSxJQUFHLElBQUksQ0FBQyxHQUFHLElBQUUsa0JBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLEVBQUUsRUFDL0M7b0JBQ0ksa0JBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUM1QyxzRUFBc0U7b0JBQ3RFLGVBQWU7b0JBQ2YsUUFBUTtvQkFDUiw2QkFBNkI7b0JBQzdCLG9CQUFvQjtvQkFDcEIsb0VBQW9FO29CQUNwRSxZQUFZO29CQUNaLHlCQUF5QjtvQkFDekIsNkNBQTZDO29CQUM3QyxnQkFBZ0I7b0JBQ2hCLFlBQVk7b0JBQ1oscURBQXFEO29CQUNyRCxZQUFZO29CQUNaLGdDQUFnQztvQkFDaEMsTUFBTTtpQkFDVDthQUNKO2lCQUNEO2FBRUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxnQ0FBWSxHQUFaO1FBRUkscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLDJCQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEUscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxVQUFVLENBQUMseUJBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLENBQUMsaUNBQWEsQ0FBQywrQkFBK0IsQ0FBQyxFQUFDO1lBQ3hILHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQywyQkFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3BFLE1BQU07WUFDTixrQkFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ3RDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDbEIsQ0FBQyxFQUFDO1lBQ0UscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLDJCQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDeEUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ1QsQ0FBQztJQUVELDRHQUE0RztJQUU1RyxpQ0FBYSxHQUFiLFVBQWMsQ0FBcUI7UUFFL0IscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLDJCQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEUsSUFBRyxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxFQUNuRDtZQUNJLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLElBQUksR0FBQyxDQUFDLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQztZQUMzRixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDbkI7SUFDTCxDQUFDO0lBRUQsaUNBQWEsR0FBYixVQUFjLENBQXFCO1FBRS9CLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQywyQkFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BFLElBQUcscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFDLENBQUMsRUFDbkQ7WUFDSSxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEdBQUMsQ0FBQyxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUM7WUFDM0YsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ25CO0lBQ0wsQ0FBQztJQUVELG9DQUFnQixHQUFoQixVQUFpQixDQUFXO1FBRXhCLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO1FBQzFELElBQUcsQ0FBQyxDQUFDLFFBQVEsR0FBQyxDQUFDLEVBQ2Y7WUFDSSxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEdBQUMsS0FBSyxDQUFDO1NBQ3REO2FBQ0Q7WUFDSSxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEdBQUMsSUFBSSxDQUFDO1NBQ3JEO1FBQ0QsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFRCx1Q0FBbUIsR0FBbkIsVUFBb0IsQ0FBVztRQUUzQixxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsMkJBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwRSxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQzFDLENBQUM7SUFFRCxvQ0FBZ0IsR0FBaEIsVUFBaUIsQ0FBVztRQUV4QixxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztRQUMxRCxJQUFHLENBQUMsQ0FBQyxRQUFRLEdBQUMsQ0FBQyxFQUNmO1lBQ0kscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxHQUFDLEtBQUssQ0FBQztTQUN0RDthQUNEO1lBQ0kscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxHQUFDLElBQUksQ0FBQztTQUNyRDtRQUNELElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRUQsdUNBQW1CLEdBQW5CLFVBQW9CLENBQVc7UUFFM0IscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLDJCQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEUscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUMxQyxDQUFDO0lBRUQsNEJBQVEsR0FBUjtRQUVJLElBQUksR0FBRyxHQUFDLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDO1FBQ2hELElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxHQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUM7UUFDdEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEdBQUMsR0FBRyxDQUFDLE1BQU0sR0FBQyxHQUFHLENBQUM7UUFDekMsSUFBRyxHQUFHLENBQUMsSUFBSSxFQUNYO1lBQ0csSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEdBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNqRDthQUNEO1lBQ0ksSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEdBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNsRDtJQUNMLENBQUM7SUFFRCw0QkFBUSxHQUFSO1FBRUksSUFBSSxHQUFHLEdBQUMscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUM7UUFDaEQsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsR0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDO1FBQzlELElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxHQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUMsR0FBRyxDQUFDO1FBQ3pDLElBQUcsR0FBRyxDQUFDLElBQUksRUFDWDtZQUNJLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxHQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDbEQ7YUFDRDtZQUNJLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxHQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDbEQ7SUFDTCxDQUFDO0lBRU8sNENBQXdCLEdBQWhDO1FBQ0ksSUFBSSxHQUFHLEdBQUMsa0JBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUMzQyxJQUFJLElBQUksR0FBRyxrQkFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ2xELElBQUksSUFBSSxHQUFHLGtCQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDaEQsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQ2xCLEdBQUcsRUFBQyxHQUFHO1lBQ1AsUUFBUSxFQUFDLElBQUk7WUFDYixJQUFJLEVBQUMsSUFBSTtTQUNaLENBQUMsQ0FBQztJQUNQLENBQUM7SUFqYUQ7UUFEQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUM7K0NBQ0U7SUFHN0I7UUFEQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUM7K0NBQ0U7SUFHN0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzttREFDUTtJQUc1QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO21EQUNRO0lBRzVCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7cURBQ1U7SUFHNUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztxREFDVTtJQUc1QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO21EQUNRO0lBRzVCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7bURBQ1E7SUFHNUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQzttREFDUTtJQTNCaEIsU0FBUztRQUQ3QixPQUFPO09BQ2EsU0FBUyxDQXNhN0I7SUFBRCxnQkFBQztDQXRhRCxBQXNhQyxDQXRhc0MscUJBQVcsR0FzYWpEO2tCQXRhb0IsU0FBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgV1hNYW5hZ2VyRVggZnJvbSBcIi4uLy4uLy4uL3N0YXJ0c2NlbmUvV1hNYW5hZ2VyRVhcIjtcclxuaW1wb3J0IHsgQWNjZXNzTmFtZSwgSHR0cE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vLi9OZXRXb3JrL0h0dHBNYW5hZ2VyXCI7XHJcbmltcG9ydCBBcGtNYW5hZ2VyIGZyb20gXCIuLi8uLi9BZHMvQXBrTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBJc1Rlc3RTZXJ2ZXIgfSBmcm9tIFwiLi4vLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBHYW1lRGF0YSBmcm9tIFwiLi4vLi4vR2FtZURhdGFcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi8uLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBIZXJvTWFuYWdlciB9IGZyb20gXCIuLi8uLi9IZXJvL0RhdGEvSGVyb01hbmFnZXJcIjtcclxuaW1wb3J0IHsgTGFuZ3VhZ2VJbmRleCwgTGFuZ3VhZ2VUeXBlIH0gZnJvbSBcIi4uLy4uL211bHRpTGFuZ3VhZ2UvTGFuZ3VhZ2VDb25zdGFudHNcIjtcclxuaW1wb3J0IExhbmd1YWdlTWFuYWdlciBmcm9tIFwiLi4vLi4vbXVsdGlMYW5ndWFnZS9MYW5ndWFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgUHJvcE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vUHJvcC9Qcm9wTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTb3VuZEluZGV4IH0gZnJvbSBcIi4uLy4uL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBVc2VyRGF0YSBmcm9tIFwiLi4vLi4vVXNlckRhdGFcIjtcclxuaW1wb3J0IFVJQ29tcG9uZW50IGZyb20gXCIuLi9VSUNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBVSUxheWVyTGV2ZWwsIFVJUGF0aCB9IGZyb20gXCIuLi9VSUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBVSU1hbmFnZXIgfSBmcm9tIFwiLi4vVUlNYW5hZ2VyXCI7XHJcbmltcG9ydCBBdmF0YXJVaSBmcm9tIFwiLi9BdmF0YXJVaVwiO1xyXG5pbXBvcnQgTWFpblVpIGZyb20gXCIuL01haW5VaVwiO1xyXG5cclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2V0dGluZ1VpIGV4dGVuZHMgVUlDb21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShbY2MuU3ByaXRlRnJhbWVdKVxyXG4gICAgc291bmRfc3A6Y2MuU3ByaXRlRnJhbWVbXT1bXTtcclxuXHJcbiAgICBAcHJvcGVydHkoW2NjLlNwcml0ZUZyYW1lXSlcclxuICAgIG11aXNjX3NwOmNjLlNwcml0ZUZyYW1lW109W107XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlNsaWRlcilcclxuICAgIG11c2ljX3NsaWRlcjpjYy5TbGlkZXI9bnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU2xpZGVyKVxyXG4gICAgc291bmRfc2xpZGVyOmNjLlNsaWRlcj1udWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgbXVzaWNfcHJvZ3Jlc3M6Y2MuTm9kZT1udWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgc291bmRfcHJvZ3Jlc3M6Y2MuTm9kZT1udWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXHJcbiAgICBtdXNpY19zcHJpdGU6Y2MuU3ByaXRlPW51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcclxuICAgIHNvdW5kX3Nwcml0ZTpjYy5TcHJpdGU9bnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlQXRsYXMpXHJcbiAgICBzcHJpdGVfYXRsYXM6Y2MuU3ByaXRlQXRsYXM9bnVsbDtcclxuXHJcbiAgICBjdXJfc2VsZWN0X2xhbjpMYW5ndWFnZVR5cGU9TGFuZ3VhZ2VUeXBlLmVuO1xyXG5cclxuICAgIC8vIGNsb3NlX2NhbGxiYWNrOkZ1bmN0aW9uPW51bGw7XHJcblxyXG4gICAgLy8gaW5pdChjbG9zZUNhbGxiYWNrOkZ1bmN0aW9uKVxyXG4gICAgLy8ge1xyXG4gICAgLy8gICAgIHRoaXMuY2xvc2VfY2FsbGJhY2s9Y2xvc2VDYWxsYmFjaztcclxuICAgIC8vIH1cclxuXHJcbiAgICBvbkVuYWJsZSAoKSB7XHJcbiAgICAgICAgdGhpcy5zaG93TmFtZSgpO1xyXG4gICAgICAgIHRoaXMuc2hvd0lkKCk7XHJcbiAgICAgICAgdGhpcy5zZXRNdXNpYygpO1xyXG4gICAgICAgIHRoaXMuc2V0U291bmQoKTtcclxuICAgICAgICB0aGlzLnNldFZlcnNpb24oKTtcclxuICAgICAgICB0aGlzLnNob3dBdmF0YXIoKTtcclxuICAgICAgICB0aGlzLnNob3dMYW4oKTtcclxuICAgICAgICB0aGlzLnNldEJ0bkxvZ2luKCk7XHJcbiAgICAgICAgQXBrTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dCYW5uZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRCdG5Mb2dpbigpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGJ0bkZiPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnYnRuRmInKTtcclxuICAgICAgICAvL2J0bkZiLmFjdGl2ZT1Jc1Rlc3RTZXJ2ZXI7XHJcbiAgICAgICAgbGV0IGJ0bkdvb2dsZT10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2J0bkdvb2dsZScpO1xyXG4gICAgICAgIC8vYnRuR29vZ2xlLmFjdGl2ZT1Jc1Rlc3RTZXJ2ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd05hbWUoKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBuYW1lRWRpdEJveD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2luZm8nKS5nZXRDaGlsZEJ5TmFtZSgnbmFtZUVkaXRCb3gnKTtcclxuICAgICAgICBsZXQgZWRpdD1uYW1lRWRpdEJveC5nZXRDb21wb25lbnQoY2MuRWRpdEJveCk7XHJcbiAgICAgICAgZWRpdC5zdHJpbmc9VXNlckRhdGEuZ2V0SW5zdGFuY2UoKS5nZXRVc2VyTmFtZSgpO1xyXG4gICAgICAgIGVkaXQuZW5hYmxlZD1mYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRWZXJzaW9uKClcclxuICAgIHtcclxuICAgICAgICAvL+S7juWuieWNk+WbnuS8oFxyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgndmVyU3RyJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9TGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyaW5nKExhbmd1YWdlSW5kZXguVmVyc2lvbikrJyAnK0Fwa01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hcHBfdmVyO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dBdmF0YXIoKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBidG5BdmF0YXI9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdpbmZvJykuZ2V0Q2hpbGRCeU5hbWUoJ2hlYWRQb3J0cmFpdCcpLmdldENoaWxkQnlOYW1lKCdidG5BdmF0YXInKTtcclxuICAgICAgICBsZXQgYXZhdGFySW5kZXg9VXNlckRhdGEuZ2V0SW5zdGFuY2UoKS5nZXRVc2VyQXZhdGFyKCk7XHJcbiAgICAgICAgLy8gbGV0IHNwTmFtZT0naGVybycrYXZhdGFySW5kZXg7XHJcbiAgICAgICAgLy8gbGV0IHNwTmFtZT0nVFlfVFhfMCcrYXZhdGFySW5kZXg7XHJcbiAgICAgICAgLy8gaWYoYXZhdGFySW5kZXg+PTEwKVxyXG4gICAgICAgIC8vIHtcclxuICAgICAgICAvLyAgICAgc3BOYW1lPSdUWV9UWF8nK2F2YXRhckluZGV4O1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyBidG5BdmF0YXIuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWU9dGhpcy5nZXRBdmF0YXIoc3BOYW1lKTtcclxuICAgICAgICBidG5BdmF0YXIuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWU9UHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTcGhlYWRQb3J0cmFpdFR5cGUoYXZhdGFySW5kZXgpLy9IZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNwcml0ZUZyYW1lQnlOYW1lKHNwTmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QXZhdGFyKHN0cjpzdHJpbmcpOmNjLlNwcml0ZUZyYW1lXHJcbiAgICB7XHJcbiAgICAgICAgIHJldHVybiB0aGlzLnNwcml0ZV9hdGxhcy5nZXRTcHJpdGVGcmFtZShzdHIpO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dBdmF0YXJSb290KClcclxuICAgIHtcclxuICAgICAgICAvLyBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93QXZhdGFyUm9vdCh7b25DbG9zZTooKT0+e1xyXG4gICAgICAgIC8vICAgICB0aGlzLnNob3dBdmF0YXIoKTtcclxuICAgICAgICAvLyB9fSlcclxuICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLkF2YXRhclJvb3QsVUlMYXllckxldmVsLlR3byx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoQXZhdGFyVWkpLmluaXQoe29uQ2xvc2U6KCk9PntcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0F2YXRhcigpO1xyXG4gICAgICAgICAgICB9fSk7XHJcbiAgICAgICAgfSx9KVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBzaG93SWQoKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBpZFN0cj10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2luZm8nKS5nZXRDaGlsZEJ5TmFtZSgnaWRTdHInKTtcclxuICAgICAgICBpZFN0ci5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1Vc2VyRGF0YS5nZXRJbnN0YW5jZSgpLmdldFVzZXJJRCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuQXZhdGFyKClcclxuICAgIHtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIHRoaXMuc2hvd0F2YXRhclJvb3QoKTtcclxuICAgIH1cclxuXHJcbiAgICBjbGlja0J0blJlbmFtZSgpXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBsZXQgbmFtZUVkaXRCb3g9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdpbmZvJykuZ2V0Q2hpbGRCeU5hbWUoJ25hbWVFZGl0Qm94Jyk7XHJcbiAgICAgICAgbGV0IGVkaXQ9bmFtZUVkaXRCb3guZ2V0Q29tcG9uZW50KGNjLkVkaXRCb3gpO1xyXG4gICAgICAgIGVkaXQuZW5hYmxlZD10cnVlO1xyXG4gICAgICAgIGVkaXQuZm9jdXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBvblJlbmFtZUZpbmlzaChlZGl0Qm94OmNjLkVkaXRCb3gpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoZWRpdEJveC5zdHJpbmchPScnKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gaWYoV1hNYW5hZ2VyRVguZ2V0SW5zdGFuY2UoKS5jaGVja01zZyhlZGl0Qm94LnN0cmluZyk9PXRydWUpe1xyXG4gICAgICAgICAgICAvLyAgICAgVXNlckRhdGEuZ2V0SW5zdGFuY2UoKS5zYXZlVXNlck5hbWUoZWRpdEJveC5zdHJpbmcpO1xyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5zaG93TmFtZSgpO1xyXG4gICAgICAgICAgICAvLyB9ZWxzZXtcclxuICAgICAgICAgICAgLy8gICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoXCLovpPlhaXlhoXlrrnkuI3lkIjms5XvvIFcIik7XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgdGhpcy5jaGVja01zZyhlZGl0Qm94LnN0cmluZyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIGNoZWNrTXNnKHN0cjpzdHJpbmcpOnZvaWQge1xyXG4gICAgICBcclxuICAgICAgICBpZiAoY2Muc3lzLnBsYXRmb3JtID09PSBjYy5zeXMuV0VDSEFUX0dBTUUpIHtcclxuICAgICAgICAgICAgd3guY2xvdWQuY2FsbEZ1bmN0aW9uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiY2hlY2tNc2dcIixcclxuICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBzdHJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbigoY2hlY2tUZXh0UmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0U3VnZ2VzdCA9IGNoZWNrVGV4dFJlcy5yZXN1bHQucmVzdWx0LnN1Z2dlc3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdFN1Z2dlc3QgPT09ICdwYXNzJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn6YCa6L+HJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFVzZXJEYXRhLmdldEluc3RhbmNlKCkuc2F2ZVVzZXJOYW1lKHN0cik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd05hbWUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5LiN6YCa6L+HJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93TmFtZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKFwi6L6T5YWl5YaF5a655LiN5ZCI5rOV77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBVc2VyRGF0YS5nZXRJbnN0YW5jZSgpLnNhdmVVc2VyTmFtZShzdHIpO1xyXG4gICAgICAgICAgICB0aGlzLnNob3dOYW1lKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICBcclxuICAgIH1cclxuICAgIG9uQ2xvc2UoKSB7XHJcbiAgICAgICAgY2MubG9nKCdTZXR0aW5nVWknKTsgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuQ2xvc2UoKVxyXG4gICAge1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlU291bmQoKTtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlZnJlc2hUb3BTaG93KCk7XHJcbiAgICAgICAgSHR0cE1hbmFnZXIucG9zdChBY2Nlc3NOYW1lLnVwZGF0ZUF2YXRhcix0aGlzLmdldE5hbWVBbmRJY29uSnNvblN0cmluZygpKTtcclxuICAgICAgICBzdXBlci5vbkNsb3NlKCk7XHJcbiAgICAgICAgQXBrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNsb3NlQmFubmVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0xhbigpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5jdXJfc2VsZWN0X2xhbj1MYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRDdXJMYW5ndWFnZVR5cGUoKTsgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrU2VsZWN0TGFuKGJ0bixpbmRleFN0cjpzdHJpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBsZXQgaW5kZXg9cGFyc2VJbnQoaW5kZXhTdHIpO1xyXG4gICAgICAgIGlmKGluZGV4IT10aGlzLmN1cl9zZWxlY3RfbGFuKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJfc2VsZWN0X2xhbj1pbmRleDtcclxuICAgICAgICAgICAgdGhpcy5zaG93U2VsZWN0TGFuKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNob3dTZWxlY3RMYW4oKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBsYW5TZWxlY3RSb290PXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnbGFuU2VsZWN0Um9vdCcpO1xyXG4gICAgICAgIGxhblNlbGVjdFJvb3QuYWN0aXZlPXRydWU7XHJcbiAgICAgICAgLy9cclxuICAgICAgICBsZXQgbGFuUm9vdD1sYW5TZWxlY3RSb290LmdldENoaWxkQnlOYW1lKCdsYW5Sb290Jyk7XHJcbiAgICAgICAgbGV0IHNlbGVjdD1sYW5TZWxlY3RSb290LmdldENoaWxkQnlOYW1lKCdzZWxlY3QnKTtcclxuICAgICAgICBsZXQgbGFuVHlwZT10aGlzLmN1cl9zZWxlY3RfbGFuO1xyXG4gICAgICAgIGxldCBzZWxlY3RMYW49bGFuUm9vdC5jaGlsZHJlbltsYW5UeXBlXTtcclxuICAgICAgICBzZWxlY3QueD1zZWxlY3RMYW4ueCArIGxhblJvb3QueDtcclxuICAgICAgICBzZWxlY3QueT1zZWxlY3RMYW4ueSArIGxhblJvb3QueTtcclxuICAgIH1cclxuXHJcbiAgICBjbG9zZVNlbGVjdExhbigpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGxhblNlbGVjdFJvb3Q9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdsYW5TZWxlY3RSb290Jyk7XHJcbiAgICAgICAgbGFuU2VsZWN0Um9vdC5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0TGFuZ3VhZ2UodGhpcy5jdXJfc2VsZWN0X2xhbik7XHJcbiAgICAgICAgY2MuZmluZCgnQ2FudmFzL21haW5fdWknKS5nZXRDb21wb25lbnQoTWFpblVpKS5vbkVuYWJsZSgpO1xyXG4gICAgICAgIHRoaXMub25FbmFibGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBjbGlja0J0bkxhbigpXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICAvL+W8ueWHuuivreiogOmAieaLqeahhlxyXG4gICAgICAgIHRoaXMuc2hvd1NlbGVjdExhbigpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuT2tMYW4oKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9tYWluX3VpJykuZ2V0Q29tcG9uZW50KE1haW5VaSkucmVmcmVzaE1haW5UYXNrVWkoKTtcclxuICAgICAgICB9LDAuMDIpO1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgdGhpcy5jbG9zZVNlbGVjdExhbigpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuRW1haWwoKVxyXG4gICAge1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgQXBrTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dDYWxsTWUoKTtcclxuICAgIH1cclxuXHJcbiAgICBjbGlja0J0bkZiKClcclxuICAgIHtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTAwMTEzKSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIC8v5ZCM5q2l5L+h5oGv77yM5aaC5p6c5rKh5pyJ5L+h5oGv77yM5YiZ5LiK5Lyg77yM5LiK5Lyg5LiA5qyh5L+h5oGvXHJcbiAgICAgICAgQXBrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmxvZ2luRm9yRkIoKGpzb246YW55KT0+eyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZihqc29uLnVpZClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYoanNvbi51aWQhPVVzZXJEYXRhLmdldEluc3RhbmNlKCkuZ2V0VXNlcklEKCkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgVXNlckRhdGEuZ2V0SW5zdGFuY2UoKS5zYXZlVXNlcklEKGpzb24udWlkKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBIdHRwTWFuYWdlci5wb3N0VG9Jc3N1ZWQoVVJMX1RZUEUuaXNzdWVkLFBhcmFtc19UeXBlLmNvaW4sKGRhdGEpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGlmKGRhdGEpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgLy/lpoLmnpzmsqHmnInkv6Hmga/vvIxcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIGlmKGRhdGEuY29pbj09MCAmJiBkYXRhLmdlbT09MCAmJiBkYXRhLmNvbXBsZXRlX2xldmVsPT0wKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIC8v6ZyA6KaB5LiK5Lyg5pys5Zyw5pWw5o2uXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgSHR0cE1hbmFnZXIucG9zdFRvVXBsb2FkQWxsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIEdhbWVEYXRhLmdldEluc3RhbmNlKCkuc3luY0RhdGEoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIH0gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAvLyB9KTtcclxuICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjbGlja0J0bkdvb2dsZSgpXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDEwMDExMykpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgICAvL+S4iuS8oOS4gOasoeS/oeaBr1xyXG4gICAgICAgIEFwa01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5sb2dpbkZvckdvb2dsZSgoanNvbjphbnkpPT57ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKGpzb24udWlkKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZihqc29uLnVpZCE9VXNlckRhdGEuZ2V0SW5zdGFuY2UoKS5nZXRVc2VySUQoKSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBVc2VyRGF0YS5nZXRJbnN0YW5jZSgpLnNhdmVVc2VySUQoanNvbi51aWQpOyAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gSHR0cE1hbmFnZXIucG9zdFRvSXNzdWVkKFVSTF9UWVBFLmlzc3VlZCxQYXJhbXNfVHlwZS5jb2luLChkYXRhKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBpZihkYXRhKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIC8v5aaC5p6c5rKh5pyJ5L+h5oGv77yMXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBpZihkYXRhLmNvaW49PTAgJiYgZGF0YS5nZW09PTAgJiYgZGF0YS5jb21wbGV0ZV9sZXZlbD09MClcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAvL+mcgOimgeS4iuS8oOacrOWcsOaVsOaNrlxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIEh0dHBNYW5hZ2VyLnBvc3RUb1VwbG9hZEFsbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBHYW1lRGF0YS5nZXRJbnN0YW5jZSgpLnN5bmNEYXRhKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICB9ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjbGlja0J0bkV4aXQoKVxyXG4gICAge1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93RGlhbG9nKExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0cmluZyhMYW5ndWFnZUluZGV4LkRvX3lvdV9yZWFsbHlfd2FudF90b19xdWl0X2dhbWUpLCgpPT57XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgICAgIC8v57uT5p2f5ri45oiPXHJcbiAgICAgICAgICAgIEdhbWVEYXRhLmdldEluc3RhbmNlKCkuc2F2ZUV4aXRUaW1lKCk7XHJcbiAgICAgICAgICAgIGNjLmdhbWUuZW5kKCk7XHJcbiAgICAgICAgfSwoKT0+e1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIH0sMCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8rKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKyvpn7PmlYjorr7nva4rKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKytcclxuXHJcbiAgICBjbGlja0J0blNvdW5kKGI6Y2MuRXZlbnQuRXZlbnRUb3VjaClcclxuICAgIHtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIGlmKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci52b2x1bWU+MClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5tdXRlPSFHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIubXV0ZTtcclxuICAgICAgICAgICAgdGhpcy5zZXRTb3VuZCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGlja0J0bk11c2ljKGI6Y2MuRXZlbnQuRXZlbnRUb3VjaClcclxuICAgIHtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIGlmKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkubXVzaWNfbWFuYWdlci52b2x1bWU+MClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkubXVzaWNfbWFuYWdlci5tdXRlPSFHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLm11c2ljX21hbmFnZXIubXV0ZTtcclxuICAgICAgICAgICAgdGhpcy5zZXRNdXNpYygpO1xyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHRvdWNoU291bmRTbGlkZXIoZTpjYy5TbGlkZXIpXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnZvbHVtZT1lLnByb2dyZXNzO1xyXG4gICAgICAgIGlmKGUucHJvZ3Jlc3M+MClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5tdXRlPWZhbHNlO1xyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIubXV0ZT10cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNldFNvdW5kKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdG91Y2hTb3VuZFNsaWRlckVuZChlOmNjLlNsaWRlcilcclxuICAgIHtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVNvdW5kKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdG91Y2hNdXNpY1NsaWRlcihlOmNjLlNsaWRlcilcclxuICAgIHtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLm11c2ljX21hbmFnZXIudm9sdW1lPWUucHJvZ3Jlc3M7XHJcbiAgICAgICAgaWYoZS5wcm9ncmVzcz4wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5tdXNpY19tYW5hZ2VyLm11dGU9ZmFsc2U7XHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkubXVzaWNfbWFuYWdlci5tdXRlPXRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0TXVzaWMoKTtcclxuICAgIH1cclxuXHJcbiAgICB0b3VjaE11c2ljU2xpZGVyRW5kKGU6Y2MuU2xpZGVyKVxyXG4gICAge1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlU291bmQoKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRTb3VuZCgpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGdtcz1HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXI7XHJcbiAgICAgICAgdGhpcy5zb3VuZF9zbGlkZXIucHJvZ3Jlc3M9Z21zLnZvbHVtZTtcclxuICAgICAgICB0aGlzLnNvdW5kX3Byb2dyZXNzLndpZHRoPWdtcy52b2x1bWUqMzYwO1xyXG4gICAgICAgIGlmKGdtcy5tdXRlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICB0aGlzLnNvdW5kX3Nwcml0ZS5zcHJpdGVGcmFtZT10aGlzLnNvdW5kX3NwWzBdO1xyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnNvdW5kX3Nwcml0ZS5zcHJpdGVGcmFtZT10aGlzLnNvdW5kX3NwWzFdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgc2V0TXVzaWMoKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBnZ209R2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5tdXNpY19tYW5hZ2VyO1xyXG4gICAgICAgIHRoaXMubXVzaWNfc2xpZGVyLmdldENvbXBvbmVudChjYy5TbGlkZXIpLnByb2dyZXNzPWdnbS52b2x1bWU7XHJcbiAgICAgICAgdGhpcy5tdXNpY19wcm9ncmVzcy53aWR0aD1nZ20udm9sdW1lKjM2MDtcclxuICAgICAgICBpZihnZ20ubXV0ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubXVzaWNfc3ByaXRlLnNwcml0ZUZyYW1lPXRoaXMubXVpc2Nfc3BbMF07XHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubXVzaWNfc3ByaXRlLnNwcml0ZUZyYW1lPXRoaXMubXVpc2Nfc3BbMV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0TmFtZUFuZEljb25Kc29uU3RyaW5nKCk6c3RyaW5ne1xyXG4gICAgICAgIGxldCB1aWQ9VXNlckRhdGEuZ2V0SW5zdGFuY2UoKS5nZXRVc2VySUQoKTtcclxuICAgICAgICBsZXQgaWNvbiA9IFVzZXJEYXRhLmdldEluc3RhbmNlKCkuZ2V0VXNlckF2YXRhcigpO1xyXG4gICAgICAgIGxldCBuYW1lID0gVXNlckRhdGEuZ2V0SW5zdGFuY2UoKS5nZXRVc2VyTmFtZSgpO1xyXG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgIHVpZDp1aWQsXHJcbiAgICAgICAgICAgIGF2YXRhcklkOmljb24sXHJcbiAgICAgICAgICAgIG5hbWU6bmFtZSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19