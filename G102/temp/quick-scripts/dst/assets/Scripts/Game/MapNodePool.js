
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Game/MapNodePool.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
var WXManagerEX_1 = require("../../startscene/WXManagerEX");
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
        //如果已经添加了，那么就不继续添加了
        var _this = this;
        if (this.map_node_pools.has(id)) {
            if (loadCallback) {
                loadCallback();
            }
            return false;
        }
        if (this.preload_id.includes(id)) {
            if (loadCallback) {
                loadCallback();
            }
            return false;
        }
        this.preload_id.push(id);
        WXManagerEX_1.default.getInstance().resourcesBundle.load(path, cc.Prefab, function (error, assets) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcR2FtZVxcTWFwTm9kZVBvb2wudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNERBQXVEO0FBR2pELElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBSTFDO0lBQXlDLCtCQUFZO0lBRHJELFVBQVU7SUFDVjtRQUFBLHFFQXdHQztRQXRHRyxvQkFBYyxHQUEwQixJQUFJLENBQUM7UUFDN0MsaUJBQVcsR0FBd0IsSUFBSSxDQUFDO1FBQ3hDLGdCQUFVLEdBQVUsRUFBRSxDQUFDOztJQW9HM0IsQ0FBQztJQWxHYSw0QkFBTSxHQUFoQjtRQUNJLElBQUksQ0FBQyxjQUFjLEdBQUMsSUFBSSxHQUFHLEVBQXNCLENBQUM7UUFDbEQsSUFBSSxDQUFDLFdBQVcsR0FBQyxJQUFJLEdBQUcsRUFBb0IsQ0FBQztRQUM3QyxJQUFJLENBQUMsVUFBVSxHQUFDLElBQUksS0FBSyxFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUVELCtCQUErQjtJQUNyQixpQ0FBVyxHQUFyQixVQUFzQixFQUFTLEVBQUMsSUFBVyxFQUFDLFNBQWdCLEVBQUMsWUFBc0I7UUFDL0UsbUJBQW1CO1FBRHZCLGlCQXdDQztRQXJDRyxJQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFDO1lBQzNCLElBQUcsWUFBWSxFQUFDO2dCQUNaLFlBQVksRUFBRSxDQUFDO2FBQ2xCO1lBQ0QsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFFRCxJQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFDO1lBQzVCLElBQUcsWUFBWSxFQUFDO2dCQUNaLFlBQVksRUFBRSxDQUFDO2FBQ2xCO1lBQ0QsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFFRCxJQUFJLENBQUMsVUFBVSxDQUFDLElB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QUFXO1FBRi9CLE9BQU87UUFDUixVQUFVO09BQ1csV0FBVyxDQXdHL0I7SUFBRCxrQkFBQztDQXhHRCxBQXdHQyxDQXhHd0MsRUFBRSxDQUFDLFNBQVMsR0F3R3BEO2tCQXhHb0IsV0FBVyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBXWE1hbmFnZXJFWCBmcm9tIFwiLi4vLi4vc3RhcnRzY2VuZS9XWE1hbmFnZXJFWFwiO1xyXG5cclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuLyoq5Yqo5oCB5a+56LGh5rGgKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFwTm9kZVBvb2wgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIG1hcF9ub2RlX3Bvb2xzOiBNYXA8bnVtYmVyLGNjLk5vZGVQb29sPj1udWxsO1xyXG4gICAgbWFwX3ByZWZhYnM6IE1hcDxudW1iZXIsY2MuUHJlZmFiPj1udWxsO1xyXG4gICAgcHJlbG9hZF9pZDpudW1iZXJbXT1bXTtcclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Mb2FkKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubWFwX25vZGVfcG9vbHM9bmV3IE1hcDxudW1iZXIsY2MuTm9kZVBvb2w+KCk7XHJcbiAgICAgICAgdGhpcy5tYXBfcHJlZmFicz1uZXcgTWFwPG51bWJlcixjYy5QcmVmYWI+KCk7XHJcbiAgICAgICAgdGhpcy5wcmVsb2FkX2lkPW5ldyBBcnJheSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuagueaNrmlk5ZKM6LWE5rqQ55uu5b2VIOaWsOW7uuS4gOS4quWvueixoeaxoCzov5Tlm57mmK/lkKbpnIDopoHliqDovb0qL1xyXG4gICAgcHJvdGVjdGVkIGFkZE5vZGVQb29sKGlkOm51bWJlcixwYXRoOnN0cmluZyxpbml0Q291bnQ6bnVtYmVyLGxvYWRDYWxsYmFjaz86RnVuY3Rpb24pOmJvb2xlYW57XHJcbiAgICAgICAgLy/lpoLmnpzlt7Lnu4/mt7vliqDkuobvvIzpgqPkuYjlsLHkuI3nu6fnu63mt7vliqDkuoZcclxuICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMubWFwX25vZGVfcG9vbHMuaGFzKGlkKSl7XHJcbiAgICAgICAgICAgIGlmKGxvYWRDYWxsYmFjayl7XHJcbiAgICAgICAgICAgICAgICBsb2FkQ2FsbGJhY2soKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLnByZWxvYWRfaWQuaW5jbHVkZXMoaWQpKXtcclxuICAgICAgICAgICAgaWYobG9hZENhbGxiYWNrKXtcclxuICAgICAgICAgICAgICAgIGxvYWRDYWxsYmFjaygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMucHJlbG9hZF9pZC5wdXNoKGlkKTtcclxuICAgICAgXHJcbiAgICAgICAgV1hNYW5hZ2VyRVguZ2V0SW5zdGFuY2UoKS5yZXNvdXJjZXNCdW5kbGUubG9hZChwYXRoLGNjLlByZWZhYiwoZXJyb3I6IEVycm9yLCBhc3NldHM6Y2MuUHJlZmFiKT0+IHtcclxuICAgICAgICAgICAgaWYoZXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLm1hcF9wcmVmYWJzLnNldChpZCxhc3NldHMpO1xyXG4gICAgICAgICBcclxuICAgICAgICAgICAgbGV0IHBvb2w9bmV3IGNjLk5vZGVQb29sKCk7Ly8g5Yib5bu65a+56LGh5rGgXHJcbiAgICAgICAgICAgIC8v5Yid5aeL5YWI5pS+572u5aSa5bCR5Liq5a+56LGh5Yiw5a+56LGh5rGgXHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPGluaXRDb3VudDsgKytpKXtcclxuICAgICAgICAgICAgICAgIGxldCBub2RlID0gY2MuaW5zdGFudGlhdGUoYXNzZXRzKTsgLy8g5Yib5bu66IqC54K5XHJcbiAgICAgICAgICAgICAgICBwb29sLnB1dChub2RlKTsvLyDpgJrov4cgcHV0IOaOpeWPo+aUvuWFpeWvueixoeaxoFxyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXBfbm9kZV9wb29scy5zZXQoaWQscG9vbCk7IC8v5oqK5a+56LGh5rGg5pS+6L+bbWFw5a+56LGhXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYobG9hZENhbGxiYWNrKXtcclxuICAgICAgICAgICAgICAgIGxvYWRDYWxsYmFjayhwb29sLmdldCgpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIC8qKuagueaNrmlk6I635b6X5LiA5Liq5a+56LGh6IqC54K5Ki9cclxuICAgIHByb3RlY3RlZCBnZXROb2RlQnlJZChpZDpudW1iZXIpOmNjLk5vZGVcclxuICAgIHtcclxuICAgICAgICBsZXQgbm9kZTpjYy5Ob2RlID0gbnVsbDtcclxuICAgICAgICAvL+iOt+W+l2lk5a+55bqU55qE5a+56LGh5rGgXHJcbiAgICAgICAgbGV0IHBvb2w9dGhpcy5tYXBfbm9kZV9wb29scy5nZXQoaWQpO1xyXG4gICAgICAgIGlmKHBvb2wpe1xyXG4gICAgICAgICAgICBpZiAocG9vbC5zaXplKCkgPiAwKSB7IC8vIOmAmui/hyBzaXplIOaOpeWPo+WIpOaWreWvueixoeaxoOS4reaYr+WQpuacieepuumXsueahOWvueixoVxyXG4gICAgICAgICAgICAgICAgbm9kZSA9IHBvb2wuZ2V0KCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7IC8vIOWmguaenOayoeacieepuumXsuWvueixoe+8jOS5n+WwseaYr+WvueixoeaxoOS4reWkh+eUqOWvueixoeS4jeWkn+aXtu+8jOaIkeS7rOWwseeUqCBjYy5pbnN0YW50aWF0ZSDph43mlrDliJvlu7pcclxuICAgICAgICAgICAgICAgIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLm1hcF9wcmVmYWJzLmdldChpZCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2uaWTliKDpmaTkuIDkuKrlr7nosaHoioLngrkqL1xyXG4gICAgcHJvdGVjdGVkIGRlc3Ryb3lOb2RlKGlkOm51bWJlcixub2RlOmNjLk5vZGUpXHJcbiAgICB7XHJcbiAgICAgICAgLy/ojrflvpdpZOWvueW6lOeahOWvueixoeaxoFxyXG4gICAgICAgIGxldCBwb29sPXRoaXMubWFwX25vZGVfcG9vbHMuZ2V0KGlkKTtcclxuICAgICAgICBpZihwb29sKXtcclxuICAgICAgICAgICAgLy8g5ZKM5Yid5aeL5YyW5pe255qE5pa55rOV5LiA5qC377yM5bCG6IqC54K55pS+6L+b5a+56LGh5rGg77yM6L+Z5Liq5pa55rOV5Lya5ZCM5pe26LCD55So6IqC54K555qEIHJlbW92ZUZyb21QYXJlbnRcclxuICAgICAgICAgICAgcG9vbC5wdXQobm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkRlc3Ryb3koKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMubWFwX25vZGVfcG9vbHMpe1xyXG4gICAgICAgICAgICB0aGlzLm1hcF9ub2RlX3Bvb2xzLmZvckVhY2goKHYsayk9PntcclxuICAgICAgICAgICAgICAgIHYuY2xlYXIoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMubWFwX25vZGVfcG9vbHM9bnVsbDsgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9jYy5sb2coY2MuYXNzZXRNYW5hZ2VyLmFzc2V0cy5jb3VudCk7XHJcbiAgICAgICAgaWYodGhpcy5tYXBfcHJlZmFicyl7XHJcbiAgICAgICAgICAgIC8vIHRoaXMubWFwX3ByZWZhYnMuZm9yRWFjaCgodixrKT0+e1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vICAgICAvL2NjLmxvZyhjYy5hc3NldE1hbmFnZXIuYXNzZXRzLmNvdW50KTtcclxuICAgICAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgICAgIHRoaXMubWFwX3ByZWZhYnM9bnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5wcmVsb2FkX2lkKXtcclxuICAgICAgICAgICAgdGhpcy5wcmVsb2FkX2lkPW51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vdGhpcy5tYXBfcHJlZmFicz1udWxsO1xyXG4gICAgICAgIC8vY2MubG9nKGNjLmFzc2V0TWFuYWdlci5hc3NldHMuY291bnQpO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=