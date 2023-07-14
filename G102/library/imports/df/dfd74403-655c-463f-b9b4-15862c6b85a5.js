"use strict";
cc._RF.push(module, 'dfd74QDZVxGP7m0FYYsa4Wl', 'Ancher73');
// Scripts/Monster/Elite/Ancher73.ts

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
var MonsterBullet_1 = require("../MonsterBullet");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Ancher73 = /** @class */ (function (_super) {
    __extends(Ancher73, _super);
    function Ancher73() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.collision_callback = null;
        _this.is_collision = false;
        return _this;
    }
    Ancher73.prototype.onLoad = function () {
        this.addCollisionWallListen(this.onCollisionWall);
    };
    Ancher73.prototype.setCollisionCallback = function (callback) {
        this.collision_callback = callback;
        this.is_collision = false;
    };
    ////--------------------------------------碰撞开始----------------------------------------------------
    Ancher73.prototype.onCollisionWall = function (wall) {
        if (wall && this.is_collision == false) {
            this.move_speed = 0;
            if (this.collision_target_callback) {
                this.collision_target_callback();
            }
        }
    };
    Ancher73 = __decorate([
        ccclass
    ], Ancher73);
    return Ancher73;
}(MonsterBullet_1.default));
exports.default = Ancher73;

cc._RF.pop();