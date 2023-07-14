"use strict";
cc._RF.push(module, '45e1eSR3n9AEJw8pTLHKJF7', 'NodePoolManager');
// Scripts/NodePoolManager.ts

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
var NodePoolManager = /** @class */ (function (_super) {
    __extends(NodePoolManager, _super);
    function NodePoolManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //@property({type:[cc.NodePool],tooltip:'所有对象的对象池'})
        _this.node_pools = [];
        _this.prefabs = [];
        return _this;
    }
    NodePoolManager.prototype.init = function (count) {
        var initCount = count;
        var prefabNum = this.prefabs.length;
        for (var type = 0; type < prefabNum; ++type) {
            this.node_pools.push(new cc.NodePool());
            for (var i = 0; i < initCount; ++i) {
                var node = cc.instantiate(this.prefabs[type]); // 创建节点
                this.node_pools[type].put(node); // 通过 put 接口放入对象池
            }
        }
    };
    NodePoolManager.prototype.createNodeByType = function (type, pos) {
        var node = null;
        if (this.node_pools[type].size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
            node = this.node_pools[type].get();
        }
        else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
            node = cc.instantiate(this.prefabs[type]);
        }
        node.setPosition(pos);
        node.parent = this.node; // 将生成的加入节点树
        return node;
    };
    NodePoolManager.prototype.createNodeByParent = function (type, pos, parent) {
        var node = null;
        if (this.node_pools[type].size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
            node = this.node_pools[type].get();
        }
        else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
            node = cc.instantiate(this.prefabs[type]);
        }
        node.setPosition(pos);
        node.active = true;
        node.parent = parent; // 将生成的加入节点树
        return node;
    };
    NodePoolManager.prototype.destroyNode = function (node, type) {
        this.node_pools[type].put(node); // 和初始化时的方法一样，将节点放进对象池，这个方法会同时调用节点的 removeFromParent
    };
    NodePoolManager.prototype.onDestroy = function () {
        var prefabNum = this.prefabs.length;
        for (var type = 0; type < prefabNum; ++type) {
            this.node_pools[type].clear();
        }
    };
    __decorate([
        property({ type: [cc.Prefab], tooltip: '所有对象的预制体' })
    ], NodePoolManager.prototype, "prefabs", void 0);
    NodePoolManager = __decorate([
        ccclass
    ], NodePoolManager);
    return NodePoolManager;
}(cc.Component));
exports.default = NodePoolManager;

cc._RF.pop();