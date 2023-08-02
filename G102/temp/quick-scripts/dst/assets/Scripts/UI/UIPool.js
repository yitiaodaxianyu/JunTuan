
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
var WXManagerEX_1 = require("../../startscene/WXManagerEX");
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
        WXManagerEX_1.default.getInstance().resourcesBundle.load(pathId, cc.Prefab, function (error, assets) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVUlcXFVJUG9vbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0REFBdUQ7QUFHakQsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFJMUM7SUFBb0MsMEJBQVk7SUFEaEQsVUFBVTtJQUNWO1FBQUEscUVBbUhDO1FBakhHLG9CQUFjLEdBQTBCLElBQUksQ0FBQztRQUM3QyxpQkFBVyxHQUF3QixJQUFJLENBQUM7UUFDeEMsa0JBQVksR0FBVSxFQUFFLENBQUM7UUFDekIsZUFBUyxHQUFhLElBQUksQ0FBQztRQUMzQixVQUFVO1FBQ1Ysa0JBQVksR0FBOEIsSUFBSSxDQUFDOztJQTRHbkQsQ0FBQztJQTFHYSx1QkFBTSxHQUFoQjtRQUNJLElBQUksQ0FBQyxjQUFjLEdBQUMsSUFBSSxHQUFHLEVBQXNCLENBQUM7UUFDbEQsSUFBSSxDQUFDLFdBQVcsR0FBQyxJQUFJLEdBQUcsRUFBb0IsQ0FBQztRQUM3QyxJQUFJLENBQUMsWUFBWSxHQUFDLElBQUksR0FBRyxFQUEwQixDQUFDO1FBQ3BELElBQUksQ0FBQyxZQUFZLEdBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsU0FBUyxHQUFDLElBQUksRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFFRCwrQkFBK0I7SUFDckIsNEJBQVcsR0FBckIsVUFBc0IsTUFBYSxFQUFDLFNBQWdCLEVBQUMsWUFBc0I7UUFBM0UsaUJBa0RDO1FBakRHLG1CQUFtQjtRQUNuQixJQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFDO1lBQy9CLElBQUcsWUFBWSxFQUFDO2dCQUNaLFlBQVksRUFBRSxDQUFDO2FBQ2xCO1lBQ0QsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFFRCxJ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LFVBQXNCLE1BQWEsRUFBQyxJQUFZO1FBRTVDLFlBQVk7UUFDWixJQUFJLElBQUksR0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6QyxJQUFHLElBQUksRUFBQztZQUNKLDJEQUEyRDtZQUMzRCxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2xCO0lBQ0wsQ0FBQztJQUVTLDBCQUFTLEdBQW5CO1FBRUksSUFBRyxJQUFJLENBQUMsY0FBYyxFQUFDO1lBQ25CLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLFVBQUMsQ0FBQyxFQUFDLENBQUM7Z0JBQzVCLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNkLENBQUMsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLGNBQWMsR0FBQyxJQUFJLENBQUM7U0FDNUI7UUFFRCxJQUFHLElBQUksQ0FBQyxXQUFXLEVBQUM7WUFDaEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsVUFBQyxDQUFDLEVBQUMsQ0FBQztnQkFDekIsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN6QyxDQUFDLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxXQUFXLEdBQUMsSUFBSSxDQUFDO1NBQ3pCO1FBQ0QsSUFBRyxJQUFJLENBQUMsWUFBWSxFQUFDO1lBQ2pCLElBQUksQ0FBQyxZQUFZLEdBQUMsSUFBSSxDQUFDO1NBQzFCO0lBQ0wsQ0FBQztJQWpIZ0IsTUFBTTtRQUYxQixPQUFPO1FBQ1IsVUFBVTtPQUNXLE1BQU0sQ0FtSDFCO0lBQUQsYUFBQztDQW5IRCxBQW1IQyxDQW5IbUMsRUFBRSxDQUFDLFNBQVMsR0FtSC9DO2tCQW5Ib0IsTUFBTSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBXWE1hbmFnZXJFWCBmcm9tIFwiLi4vLi4vc3RhcnRzY2VuZS9XWE1hbmFnZXJFWFwiO1xyXG5cclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuLyoq5Yqo5oCB5a+56LGh5rGgKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlQb29sIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBtYXBfbm9kZV9wb29sczogTWFwPHN0cmluZyxjYy5Ob2RlUG9vbD49bnVsbDtcclxuICAgIG1hcF9wcmVmYWJzOiBNYXA8c3RyaW5nLGNjLlByZWZhYj49bnVsbDtcclxuICAgIHByZWxvYWRfcGF0aDpzdHJpbmdbXT1bXTtcclxuICAgIHRlc3RfcG9vbDpjYy5Ob2RlUG9vbD1udWxsO1xyXG4gICAgLyoq5Zue6LCD5pWw57uEICovXHJcbiAgICBtYXBfY2FsbGJhY2s6IE1hcDxzdHJpbmcsQXJyYXk8RnVuY3Rpb24+Pj1udWxsO1xyXG5cclxuICAgIHByb3RlY3RlZCBvbkxvYWQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5tYXBfbm9kZV9wb29scz1uZXcgTWFwPHN0cmluZyxjYy5Ob2RlUG9vbD4oKTtcclxuICAgICAgICB0aGlzLm1hcF9wcmVmYWJzPW5ldyBNYXA8c3RyaW5nLGNjLlByZWZhYj4oKTtcclxuICAgICAgICB0aGlzLm1hcF9jYWxsYmFjaz1uZXcgTWFwPHN0cmluZyxBcnJheTxGdW5jdGlvbj4+KCk7XHJcbiAgICAgICAgdGhpcy5wcmVsb2FkX3BhdGg9bmV3IEFycmF5KCk7XHJcbiAgICAgICAgdGhpcy50ZXN0X3Bvb2w9bmV3IGNjLk5vZGVQb29sKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5qC55o2uaWTlkozotYTmupDnm67lvZUg5paw5bu65LiA5Liq5a+56LGh5rGgLOi/lOWbnuaYr+WQpumcgOimgeWKoOi9vSovXHJcbiAgICBwcm90ZWN0ZWQgYWRkTm9kZVBvb2wocGF0aElkOnN0cmluZyxpbml0Q291bnQ6bnVtYmVyLGxvYWRDYWxsYmFjaz86RnVuY3Rpb24pOmJvb2xlYW57XHJcbiAgICAgICAgLy/lpoLmnpzlt7Lnu4/mt7vliqDkuobvvIzpgqPkuYjlsLHkuI3nu6fnu63mt7vliqDkuoZcclxuICAgICAgICBpZih0aGlzLm1hcF9ub2RlX3Bvb2xzLmhhcyhwYXRoSWQpKXtcclxuICAgICAgICAgICAgaWYobG9hZENhbGxiYWNrKXtcclxuICAgICAgICAgICAgICAgIGxvYWRDYWxsYmFjaygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMucHJlbG9hZF9wYXRoLmluY2x1ZGVzKHBhdGhJZCkpe1xyXG4gICAgICAgICAgICBsZXQgYXJyPXRoaXMubWFwX2NhbGxiYWNrLmdldChwYXRoSWQpO1xyXG4gICAgICAgICAgICBpZihhcnIpe1xyXG4gICAgICAgICAgICAgICAgYXJyLnB1c2gobG9hZENhbGxiYWNrKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBhcnI9bmV3IEFycmF5KCk7XHJcbiAgICAgICAgICAgICAgICBhcnIucHVzaChsb2FkQ2FsbGJhY2spO1xyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMubWFwX2NhbGxiYWNrLnNldChwYXRoSWQsYXJyKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5wcmVsb2FkX3BhdGgucHVzaChwYXRoSWQpO1xyXG4gICAgICAgIFdYTWFuYWdlckVYLmdldEluc3RhbmNlKCkucmVzb3VyY2VzQnVuZGxlLmxvYWQocGF0aElkLGNjLlByZWZhYiwoZXJyb3I6IEVycm9yLCBhc3NldHM6Y2MuUHJlZmFiKT0+IHtcclxuICAgICAgICAgICAgaWYoZXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLm1hcF9wcmVmYWJzLnNldChwYXRoSWQsYXNzZXRzKTtcclxuICAgICAgICAgICAgbGV0IHBvb2w9bmV3IGNjLk5vZGVQb29sKCk7Ly8g5Yib5bu65a+56LGh5rGgXHJcbiAgICAgICAgICAgIC8v5Yid5aeL5YWI5pS+572u5aSa5bCR5Liq5a+56LGh5Yiw5a+56LGh5rGgXHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPGluaXRDb3VudDsgKytpKXtcclxuICAgICAgICAgICAgICAgIGxldCBub2RlOmNjLk5vZGUgPSBjYy5pbnN0YW50aWF0ZShhc3NldHMpOyAvLyDliJvlu7roioLngrlcclxuICAgICAgICAgICAgICAgIHBvb2wucHV0KG5vZGUpOy8vIOmAmui/hyBwdXQg5o6l5Y+j5pS+5YWl5a+56LGh5rGgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy90aGlzLnRlc3RfcG9vbC5wdXQobm9kZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5tYXBfbm9kZV9wb29scy5zZXQocGF0aElkLHBvb2wpOyAvL+aKiuWvueixoeaxoOaUvui/m21hcOWvueixoVxyXG4gICAgICAgICAgICBsZXQgcE5vZGU9cG9vbC5nZXQoKVxyXG4gICAgICAgICAgICBpZihsb2FkQ2FsbGJhY2spe1xyXG4gICAgICAgICAgICAgICAgbG9hZENhbGxiYWNrKHBOb2RlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgYXJyPXRoaXMubWFwX2NhbGxiYWNrLmdldChwYXRoSWQpO1xyXG4gICAgICAgICAgICBpZihhcnIpe1xyXG4gICAgICAgICAgICAgICAgYXJyLmZvckVhY2goKHYsayk9PntcclxuICAgICAgICAgICAgICAgICAgICB2KHBOb2RlKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja5pZOiOt+W+l+S4gOS4quWvueixoeiKgueCuSovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0Tm9kZUJ5SWQocGF0aElkOnN0cmluZyk6Y2MuTm9kZVxyXG4gICAge1xyXG4gICAgICAgIGxldCBub2RlOmNjLk5vZGUgPSBudWxsO1xyXG4gICAgICAgIC8v6I635b6XaWTlr7nlupTnmoTlr7nosaHmsaBcclxuICAgICAgICBsZXQgcG9vbD10aGlzLm1hcF9ub2RlX3Bvb2xzLmdldChwYXRoSWQpO1xyXG4gICAgICAgIGlmKHBvb2wpe1xyXG4gICAgICAgICAgICBpZiAocG9vbC5zaXplKCkgPiAwKSB7IC8vIOmAmui/hyBzaXplIOaOpeWPo+WIpOaWreWvueixoeaxoOS4reaYr+WQpuacieepuumXsueahOWvueixoVxyXG4gICAgICAgICAgICAgICAgbm9kZSA9IHBvb2wuZ2V0KCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7IC8vIOWmguaenOayoeacieepuumXsuWvueixoe+8jOS5n+WwseaYr+WvueixoeaxoOS4reWkh+eUqOWvueixoeS4jeWkn+aXtu+8jOaIkeS7rOWwseeUqCBjYy5pbnN0YW50aWF0ZSDph43mlrDliJvlu7pcclxuICAgICAgICAgICAgICAgIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLm1hcF9wcmVmYWJzLmdldChwYXRoSWQpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgIH1cclxuICAgIC8qKuagueaNrmlk5Yig6Zmk5LiA5Liq5a+56LGh6IqC54K5Ki9cclxuICAgIHByb3RlY3RlZCBkZXN0cm95Tm9kZShwYXRoSWQ6c3RyaW5nLG5vZGU6Y2MuTm9kZSlcclxuICAgIHtcclxuICAgICAgICAvL+iOt+W+l2lk5a+55bqU55qE5a+56LGh5rGgXHJcbiAgICAgICAgbGV0IHBvb2w9dGhpcy5tYXBfbm9kZV9wb29scy5nZXQocGF0aElkKTtcclxuICAgICAgICBpZihwb29sKXtcclxuICAgICAgICAgICAgLy8g5ZKM5Yid5aeL5YyW5pe255qE5pa55rOV5LiA5qC377yM5bCG6IqC54K55pS+6L+b5a+56LGh5rGg77yM6L+Z5Liq5pa55rOV5Lya5ZCM5pe26LCD55So6IqC54K555qEIHJlbW92ZUZyb21QYXJlbnQoZmFsc2UpXHJcbiAgICAgICAgICAgIHBvb2wucHV0KG5vZGUpOyAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25EZXN0cm95KClcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLm1hcF9ub2RlX3Bvb2xzKXtcclxuICAgICAgICAgICAgdGhpcy5tYXBfbm9kZV9wb29scy5mb3JFYWNoKCh2LGspPT57XHJcbiAgICAgICAgICAgICAgICB2LmNsZWFyKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLm1hcF9ub2RlX3Bvb2xzPW51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMubWFwX3ByZWZhYnMpe1xyXG4gICAgICAgICAgICB0aGlzLm1hcF9wcmVmYWJzLmZvckVhY2goKHYsayk9PntcclxuICAgICAgICAgICAgICAgIGNjLmxvZyhjYy5hc3NldE1hbmFnZXIuYXNzZXRzLmNvdW50KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMubWFwX3ByZWZhYnM9bnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5wcmVsb2FkX3BhdGgpe1xyXG4gICAgICAgICAgICB0aGlzLnByZWxvYWRfcGF0aD1udWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuIl19