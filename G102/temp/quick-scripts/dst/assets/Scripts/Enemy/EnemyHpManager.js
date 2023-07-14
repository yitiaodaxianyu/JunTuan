
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Enemy/EnemyHpManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcRW5lbXlcXEVuZW15SHBNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDhDQUF5QztBQUN6QyxzREFBaUQ7QUFFM0MsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBNEMsa0NBQWU7SUFBM0Q7O0lBc0NBLENBQUM7SUFwQ0csK0JBQU0sR0FBTjtRQUNJLGlCQUFNLElBQUksWUFBQyxDQUFDLENBQUMsQ0FBQztRQUNkLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsZ0JBQWdCLEdBQUMsSUFBSSxDQUFDO0lBQ3BELENBQUM7SUFFRCxzQ0FBYSxHQUFiLFVBQWMsR0FBVztRQUVyQixJQUFJLElBQUksR0FBQyxpQkFBTSxnQkFBZ0IsWUFBQyxDQUFDLEVBQUMsR0FBRyxDQUFDLENBQUM7UUFDdkMsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUlELHNDQUFhLEdBQWIsVUFBYyxJQUFZO1FBRXRCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFRCx1Q0FBYyxHQUFkLFVBQWUsSUFBWTtRQUV2QixJQUFHLElBQUksSUFBRSxJQUFJLEVBQ2I7WUFDSSxJQUFJLENBQUMsS0FBSyxHQUFDLENBQUMsQ0FBQztZQUNiLElBQUksQ0FBQyxPQUFPLEdBQUMsR0FBRyxDQUFDO1lBQ2pCLGlCQUFNLFdBQVcsWUFBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDLENBQUM7U0FDN0I7YUFDRDtZQUNJLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDaEI7SUFFTCxDQUFDO0lBRUQsa0NBQVMsR0FBVDtRQUVJLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsZ0JBQWdCLEdBQUMsSUFBSSxDQUFDO0lBQ3BELENBQUM7SUFyQ2dCLGNBQWM7UUFEbEMsT0FBTztPQUNhLGNBQWMsQ0FzQ2xDO0lBQUQscUJBQUM7Q0F0Q0QsQUFzQ0MsQ0F0QzJDLHlCQUFlLEdBc0MxRDtrQkF0Q29CLGNBQWMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgTm9kZVBvb2xNYW5hZ2VyIGZyb20gXCIuLi9Ob2RlUG9vbE1hbmFnZXJcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW5lbXlIcE1hbmFnZXIgZXh0ZW5kcyBOb2RlUG9vbE1hbmFnZXIgIHtcclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIHN1cGVyLmluaXQoOCk7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5lbmVteV9ocF9tYW5hZ2VyPXRoaXM7ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVFbmVteUhwKHBvczpjYy5WZWMyKTpjYy5Ob2RlXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IG5vZGU9c3VwZXIuY3JlYXRlTm9kZUJ5VHlwZSgwLHBvcyk7ICAgICAgICBcclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIGRlc3Ryb3lCb3NzSHAobm9kZTpjYy5Ob2RlKVxyXG4gICAge1xyXG4gICAgICAgIG5vZGUucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGRlc3Ryb3lFbmVteUhwKG5vZGU6Y2MuTm9kZSlcclxuICAgIHtcclxuICAgICAgICBpZihub2RlIT1udWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbm9kZS5zY2FsZT0xO1xyXG4gICAgICAgICAgICBub2RlLm9wYWNpdHk9MjU1O1xyXG4gICAgICAgICAgICBzdXBlci5kZXN0cm95Tm9kZShub2RlLDApO1xyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjYy5sb2cobm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIG9uRGVzdHJveSgpXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5lbmVteV9ocF9tYW5hZ2VyPW51bGw7XHJcbiAgICB9XHJcbn1cclxuIl19