"use strict";
cc._RF.push(module, '3c85fWpNr9Pg7b+6mG0sFvs', 'AvatarUi');
// Scripts/UI/home/AvatarUi.ts

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
var GameManager_1 = require("../../GameManager");
var HeroConfig_1 = require("../../Hero/Game/HeroConfig");
var PropManager_1 = require("../../Prop/PropManager");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var UserData_1 = require("../../UserData");
var UIComponent_1 = require("../UIComponent");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var AvatarUi = /** @class */ (function (_super) {
    __extends(AvatarUi, _super);
    function AvatarUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.head_portrait = null;
        _this.head_item = null;
        _this.select = null;
        _this.select_avatar_index = 0;
        return _this;
    }
    AvatarUi.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        this.select_avatar_index = UserData_1.default.getInstance().getUserAvatar();
        this.head_portrait.getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpheadPortraitType(this.select_avatar_index); //HeroManager.getInstance().getSpriteFrameByName('hero'+this.select_avatar_index);
        this.addAvatar();
    };
    AvatarUi.prototype.addAvatar = function () {
        var content = this.node.getChildByName('avatarScroll').getComponent(cc.ScrollView).content;
        for (var i = HeroConfig_1.Hero_Type.ChangMaoShou; i < HeroConfig_1.Hero_Type.Hero_Num; i++) {
            var avatar = cc.instantiate(this.head_item);
            avatar.name = "icon" + i;
            avatar.parent = content;
            // avatar.addComponent(cc.Sprite).spriteFrame=HeroManager.getInstance().getSpriteFrameByName('hero'+i);
            avatar.getChildByName("headPortrait").getComponentInChildren(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpheadPortraitType(i); //HeroManager.getInstance().getSpriteFrameByName('hero'+i);
            var btn = avatar.addComponent(cc.Button);
            // btn.transition=cc.Button.Transition.COLOR;
            // btn.disabledColor=cc.Color.WHITE;
            var clickEvent = new cc.Component.EventHandler();
            clickEvent.target = this.node;
            clickEvent.component = 'AvatarUi';
            clickEvent.handler = 'clickBtnAvatar';
            clickEvent.customEventData = i + '';
            btn.clickEvents.push(clickEvent);
            if (i == this.select_avatar_index) {
                this.select.parent = avatar;
                this.select.setPosition(cc.v2(0, 0));
            }
        }
        // this.scheduleOnce(()=>{
        //     content.getComponent(cc.Layout).enabled=false;
        //     this.select.parent=content;
        //     this.showSelectAvatar();
        // },0.1);        
    };
    AvatarUi.prototype.clickBtnAvatar = function (btn, indexStr) {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        var index = parseInt(indexStr);
        if (this.select_avatar_index != index) {
            this.select_avatar_index = index;
            this.showSelectAvatar();
        }
    };
    AvatarUi.prototype.showSelectAvatar = function () {
        // let spName='TY_TX_0'+this.select_avatar_index;
        // if(this.select_avatar_index>=10)
        // {
        //     spName='TY_TX_'+this.select_avatar_index;
        // }
        // let content=this.node.getChildByName('avatarScroll').getComponent(cc.ScrollView).content;
        // this.select.setPosition(content.children[this.select_avatar_index-1].getPosition());
        this.head_portrait.getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpheadPortraitType(this.select_avatar_index); //HeroManager.getInstance().getSpriteFrameByName('hero'+this.select_avatar_index);
        this.select.parent = this.node.getComponentInChildren(cc.ScrollView).content.getChildByName("icon" + this.select_avatar_index);
        this.select.setPosition(cc.v2(0, 0));
    };
    AvatarUi.prototype.clickBtnOk = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        UserData_1.default.getInstance().saveUserAvatar(this.select_avatar_index + '');
        _super.prototype.onClose.call(this);
    };
    __decorate([
        property(cc.Node)
    ], AvatarUi.prototype, "head_portrait", void 0);
    __decorate([
        property(cc.Node)
    ], AvatarUi.prototype, "head_item", void 0);
    __decorate([
        property(cc.Node)
    ], AvatarUi.prototype, "select", void 0);
    AvatarUi = __decorate([
        ccclass
    ], AvatarUi);
    return AvatarUi;
}(UIComponent_1.default));
exports.default = AvatarUi;

cc._RF.pop();