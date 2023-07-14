"use strict";
cc._RF.push(module, '1efc4FkC9dDerf4pTb85GkQ', 'EnemyIconManager');
// Scripts/Enemy/EnemyIcon/EnemyIconManager.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var EnemyIconManager = /** @class */ (function (_super) {
    __extends(EnemyIconManager, _super);
    function EnemyIconManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //资源
        _this.icon_atlas = null;
        return _this;
    }
    EnemyIconManager_1 = EnemyIconManager;
    EnemyIconManager.getInstance = function () {
        return this._instance;
    };
    EnemyIconManager.prototype.onLoad = function () {
        EnemyIconManager_1._instance = this;
    };
    EnemyIconManager.prototype.onDestroy = function () {
        EnemyIconManager_1._instance = null;
    };
    EnemyIconManager.prototype.getSpByName = function (name) {
        return this.icon_atlas.getSpriteFrame(name);
    };
    var EnemyIconManager_1;
    EnemyIconManager._instance = null;
    __decorate([
        property(cc.SpriteAtlas)
    ], EnemyIconManager.prototype, "icon_atlas", void 0);
    EnemyIconManager = EnemyIconManager_1 = __decorate([
        ccclass
    ], EnemyIconManager);
    return EnemyIconManager;
}(cc.Component));
exports.default = EnemyIconManager;

cc._RF.pop();