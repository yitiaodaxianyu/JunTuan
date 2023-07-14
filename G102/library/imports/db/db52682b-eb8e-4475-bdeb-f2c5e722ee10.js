"use strict";
cc._RF.push(module, 'db526gr645Edb3r8sXnIu4Q', 'UIPool');
// Scripts/UI/UIPool.ts

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
var UIPool = /** @class */ (function (_super) {
    __extends(UIPool, _super);
    /**动态对象池*/
    function UIPool() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.map_node_pools = null;
        _this.map_prefabs = null;
        _this.preload_path = [];
        _this.test_pool = null;
        /**回调数组 */
        _this.map_callback = null;
        return _this;
    }
    UIPool.prototype.onLoad = function () {
        this.map_node_pools = new Map();
        this.map_prefabs = new Map();
        this.map_callback = new Map();
        this.preload_path = new Array();
        this.test_pool = new cc.NodePool();
    };
    /**根据id和资源目录 新建一个对象池,返回是否需要加载*/
    UIPool.prototype.addNodePool = function (pathId, initCount, loadCallback) {
        var _this = this;
        //如果已经添加了，那么就不继续添加了
        if (this.map_node_pools.has(pathId)) {
            if (loadCallback) {
                loadCallback();
            }
            return false;
        }
        if (this.preload_path.includes(pathId)) {
            var arr = this.map_callback.get(pathId);
            if (arr) {
                arr.push(loadCallback);
            }
            else {
                arr = new Array();
                arr.push(loadCallback);
            }
            this.map_callback.set(pathId, arr);
            return false;
        }
        this.preload_path.push(pathId);
        cc.resources.load(pathId, cc.Prefab, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            _this.map_prefabs.set(pathId, assets);
            var pool = new cc.NodePool(); // 创建对象池
            //初始先放置多少个对象到对象池
            for (var i = 0; i < initCount; ++i) {
                var node = cc.instantiate(assets); // 创建节点
                pool.put(node); // 通过 put 接口放入对象池                
                //this.test_pool.put(node);
            }
            _this.map_node_pools.set(pathId, pool); //把对象池放进map对象
            var pNode = pool.get();
            if (loadCallback) {
                loadCallback(pNode);
            }
            var arr = _this.map_callback.get(pathId);
            if (arr) {
                arr.forEach(function (v, k) {
                    v(pNode);
                });
            }
        });
        return true;
    };
    /**根据id获得一个对象节点*/
    UIPool.prototype.getNodeById = function (pathId) {
        var node = null;
        //获得id对应的对象池
        var pool = this.map_node_pools.get(pathId);
        if (pool) {
            if (pool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
                node = pool.get();
            }
            else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
                node = cc.instantiate(this.map_prefabs.get(pathId));
            }
        }
        return node;
    };
    /**根据id删除一个对象节点*/
    UIPool.prototype.destroyNode = function (pathId, node) {
        //获得id对应的对象池
        var pool = this.map_node_pools.get(pathId);
        if (pool) {
            // 和初始化时的方法一样，将节点放进对象池，这个方法会同时调用节点的 removeFromParent(false)
            pool.put(node);
        }
    };
    UIPool.prototype.onDestroy = function () {
        if (this.map_node_pools) {
            this.map_node_pools.forEach(function (v, k) {
                v.clear();
            });
            this.map_node_pools = null;
        }
        if (this.map_prefabs) {
            this.map_prefabs.forEach(function (v, k) {
                cc.log(cc.assetManager.assets.count);
            });
            this.map_prefabs = null;
        }
        if (this.preload_path) {
            this.preload_path = null;
        }
    };
    UIPool = __decorate([
        ccclass
        /**动态对象池*/
    ], UIPool);
    return UIPool;
}(cc.Component));
exports.default = UIPool;

cc._RF.pop();