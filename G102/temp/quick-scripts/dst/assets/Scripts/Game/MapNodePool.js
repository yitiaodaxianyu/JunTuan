
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcR2FtZVxcTWFwTm9kZVBvb2wudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRU0sSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFJMUM7SUFBeUMsK0JBQVk7SUFEckQsVUFBVTtJQUNWO1FBQUEscUVBcUdDO1FBbkdHLG9CQUFjLEdBQTBCLElBQUksQ0FBQztRQUM3QyxpQkFBVyxHQUF3QixJQUFJLENBQUM7UUFDeEMsZ0JBQVUsR0FBVSxFQUFFLENBQUM7O0lBaUczQixDQUFDO0lBL0ZhLDRCQUFNLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLGNBQWMsR0FBQyxJQUFJLEdBQUcsRUFBc0IsQ0FBQztRQUNsRCxJQUFJLENBQUMsV0FBVyxHQUFDLElBQUksR0FBRyxFQUFvQixDQUFDO1FBQzdDLElBQUksQ0FBQyxVQUFVLEdBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBRUQsK0JBQStCO0lBQ3JCLGlDQUFXLEdBQXJCLFVBQXNCLEVBQVMsRUFBQyxJQUFXLEVBQUMsU0FBZ0IsRUFBQyxZQUFzQjtRQUMvRSxtQkFBbUI7UUFEdkIsaUJBcUNDO1FBbENHLElBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUM7WUFDM0IsSUFBRyxZQUFZLEVBQUM7Z0JBQ1osWUFBWSxFQUFFLENBQUM7YUFDbEI7WUFDRCxPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUVELElBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEVBQUM7WUFDNUIsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFFRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUV6QixFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJ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LENBQUMsU0FBUyxHQXFHcEQ7a0JBckdvQixXQUFXIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbi8qKuWKqOaAgeWvueixoeaxoCovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hcE5vZGVQb29sIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBtYXBfbm9kZV9wb29sczogTWFwPG51bWJlcixjYy5Ob2RlUG9vbD49bnVsbDtcclxuICAgIG1hcF9wcmVmYWJzOiBNYXA8bnVtYmVyLGNjLlByZWZhYj49bnVsbDtcclxuICAgIHByZWxvYWRfaWQ6bnVtYmVyW109W107XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uTG9hZCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm1hcF9ub2RlX3Bvb2xzPW5ldyBNYXA8bnVtYmVyLGNjLk5vZGVQb29sPigpO1xyXG4gICAgICAgIHRoaXMubWFwX3ByZWZhYnM9bmV3IE1hcDxudW1iZXIsY2MuUHJlZmFiPigpO1xyXG4gICAgICAgIHRoaXMucHJlbG9hZF9pZD1uZXcgQXJyYXkoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKirmoLnmja5pZOWSjOi1hOa6kOebruW9lSDmlrDlu7rkuIDkuKrlr7nosaHmsaAs6L+U5Zue5piv5ZCm6ZyA6KaB5Yqg6L29Ki9cclxuICAgIHByb3RlY3RlZCBhZGROb2RlUG9vbChpZDpudW1iZXIscGF0aDpzdHJpbmcsaW5pdENvdW50Om51bWJlcixsb2FkQ2FsbGJhY2s/OkZ1bmN0aW9uKTpib29sZWFue1xyXG4gICAgICAgIC8v5aaC5p6c5bey57uP5re75Yqg5LqG77yM6YKj5LmI5bCx5LiN57un57ut5re75Yqg5LqGXHJcbiAgICAgICBcclxuICAgICAgICBpZih0aGlzLm1hcF9ub2RlX3Bvb2xzLmhhcyhpZCkpe1xyXG4gICAgICAgICAgICBpZihsb2FkQ2FsbGJhY2spe1xyXG4gICAgICAgICAgICAgICAgbG9hZENhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy5wcmVsb2FkX2lkLmluY2x1ZGVzKGlkKSl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMucHJlbG9hZF9pZC5wdXNoKGlkKTtcclxuICAgICAgXHJcbiAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQocGF0aCxjYy5QcmVmYWIsKGVycm9yOiBFcnJvciwgYXNzZXRzOmNjLlByZWZhYik9PiB7XHJcbiAgICAgICAgICAgIGlmKGVycm9yKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5tYXBfcHJlZmFicy5zZXQoaWQsYXNzZXRzKTtcclxuICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBwb29sPW5ldyBjYy5Ob2RlUG9vbCgpOy8vIOWIm+W7uuWvueixoeaxoFxyXG4gICAgICAgICAgICAvL+WIneWni+WFiOaUvue9ruWkmuWwkeS4quWvueixoeWIsOWvueixoeaxoFxyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxpbml0Q291bnQ7ICsraSl7XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKGFzc2V0cyk7IC8vIOWIm+W7uuiKgueCuVxyXG4gICAgICAgICAgICAgICAgcG9vbC5wdXQobm9kZSk7Ly8g6YCa6L+HIHB1dCDmjqXlj6PmlL7lhaXlr7nosaHmsaBcclxuICAgICAgICAgICAgICAgIHRoaXMubWFwX25vZGVfcG9vbHMuc2V0KGlkLHBvb2wpOyAvL+aKiuWvueixoeaxoOaUvui/m21hcOWvueixoVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGxvYWRDYWxsYmFjayl7XHJcbiAgICAgICAgICAgICAgICBsb2FkQ2FsbGJhY2socG9vbC5nZXQoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja5pZOiOt+W+l+S4gOS4quWvueixoeiKgueCuSovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0Tm9kZUJ5SWQoaWQ6bnVtYmVyKTpjYy5Ob2RlXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IG5vZGU6Y2MuTm9kZSA9IG51bGw7XHJcbiAgICAgICAgLy/ojrflvpdpZOWvueW6lOeahOWvueixoeaxoFxyXG4gICAgICAgIGxldCBwb29sPXRoaXMubWFwX25vZGVfcG9vbHMuZ2V0KGlkKTtcclxuICAgICAgICBpZihwb29sKXtcclxuICAgICAgICAgICAgaWYgKHBvb2wuc2l6ZSgpID4gMCkgeyAvLyDpgJrov4cgc2l6ZSDmjqXlj6PliKTmlq3lr7nosaHmsaDkuK3mmK/lkKbmnInnqbrpl7LnmoTlr7nosaFcclxuICAgICAgICAgICAgICAgIG5vZGUgPSBwb29sLmdldCgpO1xyXG4gICAgICAgICAgICB9IGVsc2UgeyAvLyDlpoLmnpzmsqHmnInnqbrpl7Llr7nosaHvvIzkuZ/lsLHmmK/lr7nosaHmsaDkuK3lpIfnlKjlr7nosaHkuI3lpJ/ml7bvvIzmiJHku6zlsLHnlKggY2MuaW5zdGFudGlhdGUg6YeN5paw5Yib5bu6XHJcbiAgICAgICAgICAgICAgICBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5tYXBfcHJlZmFicy5nZXQoaWQpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgIH1cclxuICAgIC8qKuagueaNrmlk5Yig6Zmk5LiA5Liq5a+56LGh6IqC54K5Ki9cclxuICAgIHByb3RlY3RlZCBkZXN0cm95Tm9kZShpZDpudW1iZXIsbm9kZTpjYy5Ob2RlKVxyXG4gICAge1xyXG4gICAgICAgIC8v6I635b6XaWTlr7nlupTnmoTlr7nosaHmsaBcclxuICAgICAgICBsZXQgcG9vbD10aGlzLm1hcF9ub2RlX3Bvb2xzLmdldChpZCk7XHJcbiAgICAgICAgaWYocG9vbCl7XHJcbiAgICAgICAgICAgIC8vIOWSjOWIneWni+WMluaXtueahOaWueazleS4gOagt++8jOWwhuiKgueCueaUvui/m+WvueixoeaxoO+8jOi/meS4quaWueazleS8muWQjOaXtuiwg+eUqOiKgueCueeahCByZW1vdmVGcm9tUGFyZW50XHJcbiAgICAgICAgICAgIHBvb2wucHV0KG5vZGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25EZXN0cm95KClcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLm1hcF9ub2RlX3Bvb2xzKXtcclxuICAgICAgICAgICAgdGhpcy5tYXBfbm9kZV9wb29scy5mb3JFYWNoKCh2LGspPT57XHJcbiAgICAgICAgICAgICAgICB2LmNsZWFyKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLm1hcF9ub2RlX3Bvb2xzPW51bGw7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vY2MubG9nKGNjLmFzc2V0TWFuYWdlci5hc3NldHMuY291bnQpO1xyXG4gICAgICAgIGlmKHRoaXMubWFwX3ByZWZhYnMpe1xyXG4gICAgICAgICAgICAvLyB0aGlzLm1hcF9wcmVmYWJzLmZvckVhY2goKHYsayk9PntcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyAgICAgLy9jYy5sb2coY2MuYXNzZXRNYW5hZ2VyLmFzc2V0cy5jb3VudCk7XHJcbiAgICAgICAgICAgIC8vIH0pO1xyXG4gICAgICAgICAgICB0aGlzLm1hcF9wcmVmYWJzPW51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMucHJlbG9hZF9pZCl7XHJcbiAgICAgICAgICAgIHRoaXMucHJlbG9hZF9pZD1udWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL3RoaXMubWFwX3ByZWZhYnM9bnVsbDtcclxuICAgICAgICAvL2NjLmxvZyhjYy5hc3NldE1hbmFnZXIuYXNzZXRzLmNvdW50KTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19