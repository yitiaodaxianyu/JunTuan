"use strict";
cc._RF.push(module, 'e7bf2T7lktPyr36r/pR0qji', 'Dart');
// Scripts/Hero/Game/RenZhe/Dart.ts

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
var Bullect_1 = require("../Bullect");
var HeroConfig_1 = require("../HeroConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Dart = /** @class */ (function (_super) {
    __extends(Dart, _super);
    function Dart() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dark_type = HeroConfig_1.FeiBiao_Type.skill1;
        _this.collision_num = 0;
        return _this;
    }
    Dart.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        _super.prototype.addCollisionMonsterListen.call(this, this.onCollisionMonster);
        this.spin_speed = 600;
        this.addInitFinishedListen(this.onInitFinished);
    };
    Dart.prototype.onInitFinished = function () {
        this.collision_num = 0;
    };
    ////--------------------------------------碰撞开始----------------------------------------------------
    Dart.prototype.onCollisionMonster = function (monsterTs) {
    };
    __decorate([
        property({ type: cc.Enum(HeroConfig_1.FeiBiao_Type) })
    ], Dart.prototype, "dark_type", void 0);
    Dart = __decorate([
        ccclass
    ], Dart);
    return Dart;
}(Bullect_1.default));
exports.default = Dart;

cc._RF.pop();