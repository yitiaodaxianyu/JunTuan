"use strict";
cc._RF.push(module, 'ea6dblWo/FBk7cFITmSPxh9', 'ExchangeLevel');
// Scripts/Equipment/Ui/ExchangeLevel.ts

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
var PropConfig_1 = require("../../Prop/PropConfig");
var EquipmentManager_1 = require("../EquipmentManager");
var EquipDataItem_1 = require("./EquipDataItem");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ExchangeLevel = /** @class */ (function (_super) {
    __extends(ExchangeLevel, _super);
    function ExchangeLevel() {
        // @property(cc.Label)
        // label: cc.Label = null;
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // @property
        // text: string = 'hello';
        // LIFE-CYCLE CALLBACKS:
        // onLoad () {}
        _this.level1 = null;
        _this.level2 = null;
        _this.equipment1 = null;
        _this.equipment2 = null;
        _this.other = null;
        _this.self = null;
        _this.nodes = null;
        return _this;
        // update (dt) {}
    }
    ExchangeLevel.prototype.onEnable = function () {
        if (this.other) {
            var item1 = EquipmentManager_1.EquipmentManager.getInstance().getEquipNodeById(this.self, PropConfig_1.PropAction.Null);
            this.equipment1.addChild(item1);
            var item2 = EquipmentManager_1.EquipmentManager.getInstance().getEquipNodeById(this.other, PropConfig_1.PropAction.Null);
            this.equipment2.addChild(item2);
        }
    };
    ExchangeLevel.prototype.clickyes = function () {
        // EquipmentManager.getInstance().Findonechangelevel(this.self)
        // EquipmentManager.getInstance().Findonechangelevel(this.other)
        this.nodes.getComponent(EquipDataItem_1.default).onClickBtnEquips();
        this.clickBtnClose();
    };
    ExchangeLevel.prototype.clickBtnClose = function () {
        this.nodes.getComponent(EquipDataItem_1.default).onClickBtnEquips();
        this.equipment1.children[0].destroy();
        this.equipment2.children[0].destroy();
        this.node.active = false;
    };
    __decorate([
        property(cc.Node)
    ], ExchangeLevel.prototype, "level1", void 0);
    __decorate([
        property(cc.Node)
    ], ExchangeLevel.prototype, "level2", void 0);
    __decorate([
        property(cc.Node)
    ], ExchangeLevel.prototype, "equipment1", void 0);
    __decorate([
        property(cc.Node)
    ], ExchangeLevel.prototype, "equipment2", void 0);
    ExchangeLevel = __decorate([
        ccclass
    ], ExchangeLevel);
    return ExchangeLevel;
}(cc.Component));
exports.default = ExchangeLevel;

cc._RF.pop();