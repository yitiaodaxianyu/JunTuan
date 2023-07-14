
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/UI/UIPool.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVUlcXFVJUG9vbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFTSxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUkxQztJQUFvQywwQkFBWTtJQURoRCxVQUFVO0lBQ1Y7UUFBQSxxRUFtSEM7UUFqSEcsb0JBQWMsR0FBMEIsSUFBSSxDQUFDO1FBQzdDLGlCQUFXLEdBQXdCLElBQUksQ0FBQztRQUN4QyxrQkFBWSxHQUFVLEVBQUUsQ0FBQztRQUN6QixlQUFTLEdBQWEsSUFBSSxDQUFDO1FBQzNCLFVBQVU7UUFDVixrQkFBWSxHQUE4QixJQUFJLENBQUM7O0lBNEduRCxDQUFDO0lBMUdhLHVCQUFNLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLGNBQWMsR0FBQyxJQUFJLEdBQUcsRUFBc0IsQ0FBQztRQUNsRCxJQUFJLENBQUMsV0FBVyxHQUFDLElBQUksR0FBRyxFQUFvQixDQUFDO1FBQzdDLElBQUksQ0FBQyxZQUFZLEdBQUMsSUFBSSxHQUFHLEVBQTBCLENBQUM7UUFDcEQsSUFBSSxDQUFDLFlBQVksR0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyxTQUFTLEdBQUMsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDckMsQ0FBQztJQUVELCtCQUErQjtJQUNyQiw0QkFBVyxHQUFyQixVQUFzQixNQUFhLEVBQUMsU0FBZ0IsRUFBQyxZQUFzQjtRQUEzRSxpQkFrREM7UUFqREcsbUJBQW1CO1FBQ25CLElBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUM7WUFDL0IsSUFBRyxZQUFZLEVBQUM7Z0JBQ1osWUFBWSxFQUFFLENBQUM7YUFDbEI7WUFDRCxPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUVELElBQUcsSUFBSSxDQUFD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QUFZO1FBQ1osSUFBSSxJQUFJLEdBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekMsSUFBRyxJQUFJLEVBQUM7WUFDSiwyREFBMkQ7WUFDM0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNsQjtJQUNMLENBQUM7SUFFUywwQkFBUyxHQUFuQjtRQUVJLElBQUcsSUFBSSxDQUFDLGNBQWMsRUFBQztZQUNuQixJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxVQUFDLENBQUMsRUFBQyxDQUFDO2dCQUM1QixDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDZCxDQUFDLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxjQUFjLEdBQUMsSUFBSSxDQUFDO1NBQzVCO1FBRUQsSUFBRyxJQUFJLENBQUMsV0FBVyxFQUFDO1lBQ2hCLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFVBQUMsQ0FBQyxFQUFDLENBQUM7Z0JBQ3pCLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDekMsQ0FBQyxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsV0FBVyxHQUFDLElBQUksQ0FBQztTQUN6QjtRQUNELElBQUcsSUFBSSxDQUFDLFlBQVksRUFBQztZQUNqQixJQUFJLENBQUMsWUFBWSxHQUFDLElBQUksQ0FBQztTQUMxQjtJQUNMLENBQUM7SUFqSGdCLE1BQU07UUFGMUIsT0FBTztRQUNSLFVBQVU7T0FDVyxNQUFNLENBbUgxQjtJQUFELGFBQUM7Q0FuSEQsQUFtSEMsQ0FuSG1DLEVBQUUsQ0FBQyxTQUFTLEdBbUgvQztrQkFuSG9CLE1BQU0iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuLyoq5Yqo5oCB5a+56LGh5rGgKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlQb29sIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBtYXBfbm9kZV9wb29sczogTWFwPHN0cmluZyxjYy5Ob2RlUG9vbD49bnVsbDtcclxuICAgIG1hcF9wcmVmYWJzOiBNYXA8c3RyaW5nLGNjLlByZWZhYj49bnVsbDtcclxuICAgIHByZWxvYWRfcGF0aDpzdHJpbmdbXT1bXTtcclxuICAgIHRlc3RfcG9vbDpjYy5Ob2RlUG9vbD1udWxsO1xyXG4gICAgLyoq5Zue6LCD5pWw57uEICovXHJcbiAgICBtYXBfY2FsbGJhY2s6IE1hcDxzdHJpbmcsQXJyYXk8RnVuY3Rpb24+Pj1udWxsO1xyXG5cclxuICAgIHByb3RlY3RlZCBvbkxvYWQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5tYXBfbm9kZV9wb29scz1uZXcgTWFwPHN0cmluZyxjYy5Ob2RlUG9vbD4oKTtcclxuICAgICAgICB0aGlzLm1hcF9wcmVmYWJzPW5ldyBNYXA8c3RyaW5nLGNjLlByZWZhYj4oKTtcclxuICAgICAgICB0aGlzLm1hcF9jYWxsYmFjaz1uZXcgTWFwPHN0cmluZyxBcnJheTxGdW5jdGlvbj4+KCk7XHJcbiAgICAgICAgdGhpcy5wcmVsb2FkX3BhdGg9bmV3IEFycmF5KCk7XHJcbiAgICAgICAgdGhpcy50ZXN0X3Bvb2w9bmV3IGNjLk5vZGVQb29sKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5qC55o2uaWTlkozotYTmupDnm67lvZUg5paw5bu65LiA5Liq5a+56LGh5rGgLOi/lOWbnuaYr+WQpumcgOimgeWKoOi9vSovXHJcbiAgICBwcm90ZWN0ZWQgYWRkTm9kZVBvb2wocGF0aElkOnN0cmluZyxpbml0Q291bnQ6bnVtYmVyLGxvYWRDYWxsYmFjaz86RnVuY3Rpb24pOmJvb2xlYW57XHJcbiAgICAgICAgLy/lpoLmnpzlt7Lnu4/mt7vliqDkuobvvIzpgqPkuYjlsLHkuI3nu6fnu63mt7vliqDkuoZcclxuICAgICAgICBpZih0aGlzLm1hcF9ub2RlX3Bvb2xzLmhhcyhwYXRoSWQpKXtcclxuICAgICAgICAgICAgaWYobG9hZENhbGxiYWNrKXtcclxuICAgICAgICAgICAgICAgIGxvYWRDYWxsYmFjaygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMucHJlbG9hZF9wYXRoLmluY2x1ZGVzKHBhdGhJZCkpe1xyXG4gICAgICAgICAgICBsZXQgYXJyPXRoaXMubWFwX2NhbGxiYWNrLmdldChwYXRoSWQpO1xyXG4gICAgICAgICAgICBpZihhcnIpe1xyXG4gICAgICAgICAgICAgICAgYXJyLnB1c2gobG9hZENhbGxiYWNrKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBhcnI9bmV3IEFycmF5KCk7XHJcbiAgICAgICAgICAgICAgICBhcnIucHVzaChsb2FkQ2FsbGJhY2spO1xyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMubWFwX2NhbGxiYWNrLnNldChwYXRoSWQsYXJyKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5wcmVsb2FkX3BhdGgucHVzaChwYXRoSWQpO1xyXG4gICAgICAgIGNjLnJlc291cmNlcy5sb2FkKHBhdGhJZCxjYy5QcmVmYWIsKGVycm9yOiBFcnJvciwgYXNzZXRzOmNjLlByZWZhYik9PiB7XHJcbiAgICAgICAgICAgIGlmKGVycm9yKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5tYXBfcHJlZmFicy5zZXQocGF0aElkLGFzc2V0cyk7XHJcbiAgICAgICAgICAgIGxldCBwb29sPW5ldyBjYy5Ob2RlUG9vbCgpOy8vIOWIm+W7uuWvueixoeaxoFxyXG4gICAgICAgICAgICAvL+WIneWni+WFiOaUvue9ruWkmuWwkeS4quWvueixoeWIsOWvueixoeaxoFxyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxpbml0Q291bnQ7ICsraSl7XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZTpjYy5Ob2RlID0gY2MuaW5zdGFudGlhdGUoYXNzZXRzKTsgLy8g5Yib5bu66IqC54K5XHJcbiAgICAgICAgICAgICAgICBwb29sLnB1dChub2RlKTsvLyDpgJrov4cgcHV0IOaOpeWPo+aUvuWFpeWvueixoeaxoCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vdGhpcy50ZXN0X3Bvb2wucHV0KG5vZGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubWFwX25vZGVfcG9vbHMuc2V0KHBhdGhJZCxwb29sKTsgLy/miorlr7nosaHmsaDmlL7ov5ttYXDlr7nosaFcclxuICAgICAgICAgICAgbGV0IHBOb2RlPXBvb2wuZ2V0KClcclxuICAgICAgICAgICAgaWYobG9hZENhbGxiYWNrKXtcclxuICAgICAgICAgICAgICAgIGxvYWRDYWxsYmFjayhwTm9kZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGFycj10aGlzLm1hcF9jYWxsYmFjay5nZXQocGF0aElkKTtcclxuICAgICAgICAgICAgaWYoYXJyKXtcclxuICAgICAgICAgICAgICAgIGFyci5mb3JFYWNoKCh2LGspPT57XHJcbiAgICAgICAgICAgICAgICAgICAgdihwTm9kZSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2uaWTojrflvpfkuIDkuKrlr7nosaHoioLngrkqL1xyXG4gICAgcHJvdGVjdGVkIGdldE5vZGVCeUlkKHBhdGhJZDpzdHJpbmcpOmNjLk5vZGVcclxuICAgIHtcclxuICAgICAgICBsZXQgbm9kZTpjYy5Ob2RlID0gbnVsbDtcclxuICAgICAgICAvL+iOt+W+l2lk5a+55bqU55qE5a+56LGh5rGgXHJcbiAgICAgICAgbGV0IHBvb2w9dGhpcy5tYXBfbm9kZV9wb29scy5nZXQocGF0aElkKTtcclxuICAgICAgICBpZihwb29sKXtcclxuICAgICAgICAgICAgaWYgKHBvb2wuc2l6ZSgpID4gMCkgeyAvLyDpgJrov4cgc2l6ZSDmjqXlj6PliKTmlq3lr7nosaHmsaDkuK3mmK/lkKbmnInnqbrpl7LnmoTlr7nosaFcclxuICAgICAgICAgICAgICAgIG5vZGUgPSBwb29sLmdldCgpO1xyXG4gICAgICAgICAgICB9IGVsc2UgeyAvLyDlpoLmnpzmsqHmnInnqbrpl7Llr7nosaHvvIzkuZ/lsLHmmK/lr7nosaHmsaDkuK3lpIfnlKjlr7nosaHkuI3lpJ/ml7bvvIzmiJHku6zlsLHnlKggY2MuaW5zdGFudGlhdGUg6YeN5paw5Yib5bu6XHJcbiAgICAgICAgICAgICAgICBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5tYXBfcHJlZmFicy5nZXQocGF0aElkKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja5pZOWIoOmZpOS4gOS4quWvueixoeiKgueCuSovXHJcbiAgICBwcm90ZWN0ZWQgZGVzdHJveU5vZGUocGF0aElkOnN0cmluZyxub2RlOmNjLk5vZGUpXHJcbiAgICB7XHJcbiAgICAgICAgLy/ojrflvpdpZOWvueW6lOeahOWvueixoeaxoFxyXG4gICAgICAgIGxldCBwb29sPXRoaXMubWFwX25vZGVfcG9vbHMuZ2V0KHBhdGhJZCk7XHJcbiAgICAgICAgaWYocG9vbCl7XHJcbiAgICAgICAgICAgIC8vIOWSjOWIneWni+WMluaXtueahOaWueazleS4gOagt++8jOWwhuiKgueCueaUvui/m+WvueixoeaxoO+8jOi/meS4quaWueazleS8muWQjOaXtuiwg+eUqOiKgueCueeahCByZW1vdmVGcm9tUGFyZW50KGZhbHNlKVxyXG4gICAgICAgICAgICBwb29sLnB1dChub2RlKTsgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRGVzdHJveSgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5tYXBfbm9kZV9wb29scyl7XHJcbiAgICAgICAgICAgIHRoaXMubWFwX25vZGVfcG9vbHMuZm9yRWFjaCgodixrKT0+e1xyXG4gICAgICAgICAgICAgICAgdi5jbGVhcigpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5tYXBfbm9kZV9wb29scz1udWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpZih0aGlzLm1hcF9wcmVmYWJzKXtcclxuICAgICAgICAgICAgdGhpcy5tYXBfcHJlZmFicy5mb3JFYWNoKCh2LGspPT57XHJcbiAgICAgICAgICAgICAgICBjYy5sb2coY2MuYXNzZXRNYW5hZ2VyLmFzc2V0cy5jb3VudCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLm1hcF9wcmVmYWJzPW51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMucHJlbG9hZF9wYXRoKXtcclxuICAgICAgICAgICAgdGhpcy5wcmVsb2FkX3BhdGg9bnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==