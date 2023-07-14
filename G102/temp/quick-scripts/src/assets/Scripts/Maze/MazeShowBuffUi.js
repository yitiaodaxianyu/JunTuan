"use strict";
cc._RF.push(module, '72d6bx9BAlMZr8rqr4I/u58', 'MazeShowBuffUi');
// Scripts/Maze/MazeShowBuffUi.ts

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
var LanguageManager_1 = require("../multiLanguage/LanguageManager");
var UIComponent_1 = require("../UI/UIComponent");
var RogueBuff_1 = require("./Data/RogueBuff");
var MazeBuffItem_1 = require("./MazeBuffItem");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MazeShowBuffUi = /** @class */ (function (_super) {
    __extends(MazeShowBuffUi, _super);
    function MazeShowBuffUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**buff id */
        _this.buff_id = 1001;
        _this.prefab_buff_item = null;
        return _this;
    }
    MazeShowBuffUi.prototype.initData = function (id) {
        this.buff_id = id;
        this.initUi();
    };
    MazeShowBuffUi.prototype.initUi = function () {
        this.createBuffCards();
    };
    MazeShowBuffUi.prototype.createBuffCards = function () {
        var RBM = RogueBuff_1.RogueBuffManager.getInstance();
        var LM = LanguageManager_1.default.getInstance();
        //buff的数据
        var jsonData = RBM.getJsonRogueBuff(this.buff_id);
        var titleLabel = this.node.getChildByName('titleLabel').getComponent(cc.Label);
        titleLabel.string = LM.getStrByTextId(110023);
        var buffItem = cc.instantiate(this.prefab_buff_item);
        buffItem.scale = 1;
        buffItem.getComponent(MazeBuffItem_1.default).init(this.buff_id);
        buffItem.getComponent(cc.Button).interactable = false;
        this.node.getChildByName('buffRoot').addChild(buffItem);
        buffItem.y = -243;
        buffItem.x = 0;
        //内容
        var detailLabel = this.node.getChildByName('detailLabel').getComponent(cc.Label);
        detailLabel.string = this.getValueStringByString(LM.getStrByTextId(jsonData.RogueBuffText_ID), jsonData.RogueBuff1_Value, jsonData.RogueBuff2_Value, jsonData.RogueBuff3_Value);
    };
    MazeShowBuffUi.prototype.getValueStringByString = function (str, value1, value2, value3) {
        if (str.includes("~x%")) {
            value1 *= 100;
        }
        if (str.includes("~y%")) {
            value2 *= 100;
        }
        if (str.includes("~z%")) {
            value3 *= 100;
        }
        var newStr = str.replace("~x", value1 + '');
        newStr = newStr.replace("~y", value2 + '');
        newStr = newStr.replace("~z", value2 + '');
        return newStr;
    };
    __decorate([
        property(cc.Prefab)
    ], MazeShowBuffUi.prototype, "prefab_buff_item", void 0);
    MazeShowBuffUi = __decorate([
        ccclass
    ], MazeShowBuffUi);
    return MazeShowBuffUi;
}(UIComponent_1.default));
exports.default = MazeShowBuffUi;

cc._RF.pop();