"use strict";
cc._RF.push(module, 'eb8d9fJkFFOmJdBhBTqFl8W', 'BuyBattlePotion');
// Scripts/Game/Ui/BuyBattlePotion.ts

"use strict";
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
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
var ApkManager_1 = require("../../Ads/ApkManager");
var Constants_1 = require("../../Constants");
var GameManager_1 = require("../../GameManager");
var TextLanguage_1 = require("../../multiLanguage/TextLanguage");
var Item_1 = require("../../Prop/Data/Item");
var PropConfig_1 = require("../../Prop/PropConfig");
var PropManager_1 = require("../../Prop/PropManager");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var UIComponent_1 = require("../../UI/UIComponent");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BuyBattlePotion = /** @class */ (function (_super) {
    __extends(BuyBattlePotion, _super);
    function BuyBattlePotion() {
        // @property(cc.Label)
        // label: cc.Label = null;
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // @property
        // text: string = 'hello';
        // LIFE-CYCLE CALLBACKS:
        _this.itme = null;
        _this.text = null;
        // onLoad () {}
        _this.type = PropConfig_1.PropId.Gem; //默认金币
        _this.num = 1;
        _this.Potion = 0; //药水：0:红 1:绿 2:蓝
        return _this;
        // update (dt) {}
    }
    BuyBattlePotion.prototype.initUi = function (Potion) {
        this.Potion = Potion;
        // GameManager.getInstance().music_manager.playMusic(MusicIndex.BGM_TJP);
        // FollowManager.getInstance().followEvent(Follow_Type.铁匠铺打开次数);
        if (this.itme.childrenCount > 0) {
            this.itme.children[0].destroy();
        }
        var items = PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.RedPotion, 1);
        this.text.getComponent(TextLanguage_1.default).setTextId(Item_1.ItemManager.getInstance().getDiscripitionTextId(Potion));
        items.parent = this.itme;
    };
    // start () {
    // }
    BuyBattlePotion.prototype.clickBtnAd = function () {
        var _this = this;
        ApkManager_1.default.getInstance().showVideo((function (isTrue) {
            if (isTrue) {
                PropManager_1.PropManager.getInstance().changePropNum(_this.type, -_this.num);
                _this.clickBtnClose();
            }
        }), Constants_1.VIDEO_TYPE.Equip);
    };
    BuyBattlePotion.prototype.clickBtnShow = function () {
        this.clickBtnClose();
    };
    BuyBattlePotion.prototype.clickBtnClose = function () {
        if (this.itme.childrenCount > 0) {
            this.itme.children[0].destroy();
        }
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.onClose();
    };
    __decorate([
        property(cc.Node)
    ], BuyBattlePotion.prototype, "itme", void 0);
    __decorate([
        property(cc.Node)
    ], BuyBattlePotion.prototype, "text", void 0);
    BuyBattlePotion = __decorate([
        ccclass
    ], BuyBattlePotion);
    return BuyBattlePotion;
}(UIComponent_1.default));
exports.default = BuyBattlePotion;

cc._RF.pop();