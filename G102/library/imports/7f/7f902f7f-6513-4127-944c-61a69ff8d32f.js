"use strict";
cc._RF.push(module, '7f9029/ZRNBJ5RMYaaf+NMv', 'ChuShengDian');
// Scripts/Game/ChuShengDian.ts

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
var GameManager_1 = require("../GameManager");
var NodePoolManager_1 = require("../NodePoolManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ChuShengDian = /** @class */ (function (_super) {
    __extends(ChuShengDian, _super);
    function ChuShengDian() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChuShengDian.prototype.onLoad = function () {
        this.init(8);
        GameManager_1.default.getInstance().chu_sheng_dian = this;
    };
    ChuShengDian.prototype.onDestroy = function () {
        GameManager_1.default.getInstance().chu_sheng_dian = null;
    };
    ChuShengDian.prototype.createChuShengDian = function (pos, scale) {
        var _this = this;
        var node = this.createNodeByType(0, pos);
        node.getComponent(sp.Skeleton).animation = 'animation';
        node.scale = scale;
        this.scheduleOnce(function () {
            _this.destroyChuShengDian(node);
        }, 3);
        return node;
    };
    ChuShengDian.prototype.destroyChuShengDian = function (node) {
        this.destroyNode(node, 0);
    };
    ChuShengDian = __decorate([
        ccclass
    ], ChuShengDian);
    return ChuShengDian;
}(NodePoolManager_1.default));
exports.default = ChuShengDian;

cc._RF.pop();