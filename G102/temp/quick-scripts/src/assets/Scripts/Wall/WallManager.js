"use strict";
cc._RF.push(module, 'f09e1PW/d9OPKR1Lgrfc8pX', 'WallManager');
// Scripts/Wall/WallManager.ts

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
var MainWall_1 = require("./MainWall");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var WallManager = /** @class */ (function (_super) {
    __extends(WallManager, _super);
    function WallManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.map_wall = null;
        _this.main_wall = null;
        return _this;
    }
    WallManager_1 = WallManager;
    WallManager.getInstance = function () {
        return this._instance;
    };
    WallManager.prototype.onLoad = function () {
        WallManager_1._instance = this;
        this.setMainWall();
        this.map_wall = new Map();
    };
    WallManager.prototype.onDestroy = function () {
        this.map_wall.clear();
        WallManager_1._instance = null;
    };
    /**添加一个墙体 */
    WallManager.prototype.addWall = function (wallId, wall) {
        var oldWall = this.map_wall.get(wallId);
        if (oldWall && wallId) {
            oldWall.destroyWall();
        }
        this.map_wall.set(wallId, wall);
    };
    /**移除指定的墙体 */
    WallManager.prototype.removeWall = function (id) {
        this.map_wall.delete(id);
    };
    /**获得所有墙体数据 */
    WallManager.prototype.getAllWall = function () {
        return this.map_wall;
    };
    /**获得一个墙体数据 */
    WallManager.prototype.getAWall = function (wallId) {
        return this.map_wall.get(wallId);
    };
    WallManager.prototype.setMainWall = function () {
        this.main_wall = cc.find('Canvas/wall_bg').getComponent(MainWall_1.default);
    };
    /**获得主城墙 */
    WallManager.prototype.getMainWall = function () {
        return this.main_wall;
    };
    var WallManager_1;
    WallManager._instance = null;
    WallManager = WallManager_1 = __decorate([
        ccclass
    ], WallManager);
    return WallManager;
}(cc.Component));
exports.default = WallManager;

cc._RF.pop();