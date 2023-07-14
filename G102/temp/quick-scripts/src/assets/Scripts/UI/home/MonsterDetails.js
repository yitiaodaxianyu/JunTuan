"use strict";
cc._RF.push(module, '072b5BN6pdBZ5Y5r9s26w37', 'MonsterDetails');
// Scripts/UI/home/MonsterDetails.ts

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
var MonsterConfigure_1 = require("../../Monster/Data/MonsterConfigure");
var TextLanguage_1 = require("../../multiLanguage/TextLanguage");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MonsterDetails = /** @class */ (function (_super) {
    __extends(MonsterDetails, _super);
    function MonsterDetails() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.btnClose = null;
        _this.bg = null;
        _this.content = null;
        _this.DamageNode = null;
        _this.MStat_TXT = []; //标签名字
        _this.MStat_Frame = []; //标签框
        //资源-图集
        _this.icon_atlas = null;
        _this.Mon = [];
        _this.MonsterDetailsarr = []; //怪物详情列表   按boss   精英   普通 排序
        return _this;
        // update (dt) {}
    }
    MonsterDetails.prototype.start = function () {
        this.btnClose.on(cc.Node.EventType.TOUCH_END, function (event) {
            this.onCloseBtn();
        }, this);
        this.bg.on(cc.Node.EventType.TOUCH_END, function (event) {
            this.onCloseBtn();
        }, this);
    };
    MonsterDetails.prototype.onEnable = function () {
        //生成怪物详情列表
        for (var mon_index = this.Mon.length; mon_index < this.MonsterDetailsarr.length; mon_index++) {
            var MonNode = cc.instantiate(this.DamageNode);
            this.content.addChild(MonNode);
            this.Mon.push(MonNode);
        }
        var monmanger = MonsterConfigure_1.MonsterConfigureManager.getInstance();
        for (var mons_index = 0; mons_index < this.Mon.length; mons_index++) {
            var mymon = this.Mon[mons_index];
            if (mons_index < this.MonsterDetailsarr.length) {
                mymon.active = true;
                var icon = mymon.getChildByName("MStat_Frame_Mask").getChildByName('icon');
                var id = this.MonsterDetailsarr[mons_index].id;
                icon.getComponent(cc.Sprite).spriteFrame = this.icon_atlas.getSpriteFrame("Avatar_Monster_" + id);
                var qiangdu = (monmanger.getStrengthType(id) - 1);
                var MStat_Frame = mymon.getChildByName('MStat_Frame');
                MStat_Frame.getComponent(cc.Sprite).spriteFrame = this.MStat_Frame[qiangdu];
                var MStat_TXT = mymon.getChildByName("Layout").getChildByName('MStat_TXT');
                MStat_TXT.getComponent(cc.Sprite).spriteFrame = this.MStat_TXT[qiangdu];
                var name = mymon.getChildByName("Layout").getChildByName('name');
                var txtcolor = [new cc.Color(92, 157, 237), new cc.Color(205, 158, 255), new cc.Color(255, 79, 75)];
                var Outlinecolor = [new cc.Color(25, 55, 88), new cc.Color(66, 37, 96), new cc.Color(79, 16, 15)];
                name.color = txtcolor[qiangdu];
                name.getComponent(cc.LabelOutline).color = Outlinecolor[qiangdu];
                name.getComponent(TextLanguage_1.default).setTextId(monmanger.getNameTextId(id));
                var describe = mymon.getChildByName('describe');
                describe.getComponent(TextLanguage_1.default).setTextId(monmanger.getIntroTextId(id));
            }
            else {
                mymon.active = false;
            }
        }
    };
    MonsterDetails.prototype.onCloseBtn = function () {
        this.node.active = false;
    };
    __decorate([
        property(cc.Node)
    ], MonsterDetails.prototype, "btnClose", void 0);
    __decorate([
        property(cc.Node)
    ], MonsterDetails.prototype, "bg", void 0);
    __decorate([
        property(cc.Node)
    ], MonsterDetails.prototype, "content", void 0);
    __decorate([
        property(cc.Prefab)
    ], MonsterDetails.prototype, "DamageNode", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], MonsterDetails.prototype, "MStat_TXT", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], MonsterDetails.prototype, "MStat_Frame", void 0);
    __decorate([
        property(cc.SpriteAtlas)
    ], MonsterDetails.prototype, "icon_atlas", void 0);
    MonsterDetails = __decorate([
        ccclass
    ], MonsterDetails);
    return MonsterDetails;
}(cc.Component));
exports.default = MonsterDetails;

cc._RF.pop();