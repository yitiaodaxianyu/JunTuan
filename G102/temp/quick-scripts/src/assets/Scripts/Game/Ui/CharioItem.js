"use strict";
cc._RF.push(module, '574c5Lhuu1FDqgZd/GbdQi6', 'CharioItem');
// Scripts/Game/Ui/CharioItem.ts

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
var GameManager_1 = require("../../GameManager");
var HeroManager_1 = require("../../Hero/Data/HeroManager");
var PropManager_1 = require("../../Prop/PropManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var CharioItem = /** @class */ (function (_super) {
    __extends(CharioItem, _super);
    function CharioItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.labelTip = null;
        _this.labelContent = null;
        _this.labelLvl = null;
        _this.icon = null;
        _this.bg = null;
        //["加攻击", "血量上限", "攻速", "防御", "技能间隔", "回血"];
        _this.charioType = [5, 4, 5, 3, 4, 3];
        return _this;
        // update (dt) {}
    }
    CharioItem.prototype.start = function () {
    };
    CharioItem.prototype.initData = function (n) {
        this.dataType = n;
        var lvN = GameManager_1.default.getInstance().charioUpgradationData[n];
        this.labelLvl.string = "lv" + (lvN + 1);
        this.labelTip.string = GameManager_1.default.getInstance().charioTip[n];
        if (n != 5) {
            this.labelContent.string = "当前等级：" + GameManager_1.default.getInstance().charioContent[n][lvN] + "\n下一等级：" + GameManager_1.default.getInstance().charioContent[n][lvN + 1];
        }
        else {
            this.labelContent.string = GameManager_1.default.getInstance().charioContent[n][0];
        }
        this.bg.getComponent(cc.Sprite).spriteFrame = HeroManager_1.HeroManager.getInstance().getSpriteFrameByName('HeroList_Frame_' + this.charioType[this.dataType] + '_0');
        this.icon.getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpFrameByCharioType(this.dataType);
    };
    CharioItem.prototype.getDataType = function () {
        return this.dataType;
    };
    __decorate([
        property(cc.Label)
    ], CharioItem.prototype, "labelTip", void 0);
    __decorate([
        property(cc.Label)
    ], CharioItem.prototype, "labelContent", void 0);
    __decorate([
        property(cc.Label)
    ], CharioItem.prototype, "labelLvl", void 0);
    __decorate([
        property(cc.Node)
    ], CharioItem.prototype, "icon", void 0);
    __decorate([
        property(cc.Node)
    ], CharioItem.prototype, "bg", void 0);
    CharioItem = __decorate([
        ccclass
    ], CharioItem);
    return CharioItem;
}(cc.Component));
exports.default = CharioItem;

cc._RF.pop();