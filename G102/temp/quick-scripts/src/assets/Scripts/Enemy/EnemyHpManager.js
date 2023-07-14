"use strict";
cc._RF.push(module, 'eb8efKjoT5HrK2hQIUuXH/K', 'EnemyHpManager');
// Scripts/Enemy/EnemyHpManager.ts

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
var EnemyHpManager = /** @class */ (function (_super) {
    __extends(EnemyHpManager, _super);
    function EnemyHpManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EnemyHpManager.prototype.onLoad = function () {
        _super.prototype.init.call(this, 8);
        GameManager_1.default.getInstance().enemy_hp_manager = this;
    };
    EnemyHpManager.prototype.createEnemyHp = function (pos) {
        var node = _super.prototype.createNodeByType.call(this, 0, pos);
        return node;
    };
    EnemyHpManager.prototype.destroyBossHp = function (node) {
        node.removeFromParent();
    };
    EnemyHpManager.prototype.destroyEnemyHp = function (node) {
        if (node != null) {
            node.scale = 1;
            node.opacity = 255;
            _super.prototype.destroyNode.call(this, node, 0);
        }
        else {
            cc.log(node);
        }
    };
    EnemyHpManager.prototype.onDestroy = function () {
        GameManager_1.default.getInstance().enemy_hp_manager = null;
    };
    EnemyHpManager = __decorate([
        ccclass
    ], EnemyHpManager);
    return EnemyHpManager;
}(NodePoolManager_1.default));
exports.default = EnemyHpManager;

cc._RF.pop();