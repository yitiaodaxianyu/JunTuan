"use strict";
cc._RF.push(module, '54330JA0RBGAaZq3UZtwyGu', 'MapNodePool');
// Scripts/Game/MapNodePool.ts

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
var MapNodePool = /** @class */ (function (_super) {
    __extends(MapNodePool, _super);
    /**动态对象池*/
    function MapNodePool() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.map_node_pools = null;
        _this.map_prefabs = null;
        _this.preload_id = [];
        return _this;
    }
    MapNodePool.prototype.onLoad = function () {
        this.map_node_pools = new Map();
        this.map_prefabs = new Map();
        this.preload_id = new Array();
    };
    /**根据id和资源目录 新建一个对象池,返回是否需要加载*/
    MapNodePool.prototype.addNodePool = function (id, path, initCount, loadCallback) {
        var _this = this;
        //如果已经添加了，那么就不继续添加了
        if (this.map_node_pools.has(id)) {
            if (loadCallback) {
                loadCallback();
            }
            return false;
        }
        if (this.preload_id.includes(id)) {
            return false;
        }
        this.preload_id.push(id);
        cc.resources.load(path, cc.Prefab, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            _this.map_prefabs.set(id, assets);
            var pool = new cc.NodePool(); // 创建对象池
            //初始先放置多少个对象到对象池
            for (var i = 0; i < initCount; ++i) {
                var node = cc.instantiate(assets); // 创建节点
                pool.put(node); // 通过 put 接口放入对象池
                _this.map_node_pools.set(id, pool); //把对象池放进map对象
            }
            if (loadCallback) {
                loadCallback(pool.get());
            }
        });
        return true;
    };
    /**根据id获得一个对象节点*/
    MapNodePool.prototype.getNodeById = function (id) {
        var node = null;
        //获得id对应的对象池
        var pool = this.map_node_pools.get(id);
        if (pool) {
            if (pool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
                node = pool.get();
            }
            else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
                node = cc.instantiate(this.map_prefabs.get(id));
            }
        }
        return node;
    };
    /**根据id删除一个对象节点*/
    MapNodePool.prototype.destroyNode = function (id, node) {
        //获得id对应的对象池
        var pool = this.map_node_pools.get(id);
        if (pool) {
            // 和初始化时的方法一样，将节点放进对象池，这个方法会同时调用节点的 removeFromParent
            pool.put(node);
        }
    };
    MapNodePool.prototype.onDestroy = function () {
        if (this.map_node_pools) {
            this.map_node_pools.forEach(function (v, k) {
                v.clear();
            });
            this.map_node_pools = null;
        }
        //cc.log(cc.assetManager.assets.count);
        if (this.map_prefabs) {
            // this.map_prefabs.forEach((v,k)=>{
            //     //cc.log(cc.assetManager.assets.count);
            // });
            this.map_prefabs = null;
        }
        if (this.preload_id) {
            this.preload_id = null;
        }
        //this.map_prefabs=null;
        //cc.log(cc.assetManager.assets.count);
    };
    MapNodePool = __decorate([
        ccclass
        /**动态对象池*/
    ], MapNodePool);
    return MapNodePool;
}(cc.Component));
exports.default = MapNodePool;

cc._RF.pop();