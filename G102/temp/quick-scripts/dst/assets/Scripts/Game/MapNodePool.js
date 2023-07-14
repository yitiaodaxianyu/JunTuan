
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcR2FtZVxcTWFwTm9kZVBvb2wudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRU0sSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFJMUM7SUFBeUMsK0JBQVk7SUFEckQsVUFBVTtJQUNWO1FBQUEscUVBaUdDO1FBL0ZHLG9CQUFjLEdBQTBCLElBQUksQ0FBQztRQUM3QyxpQkFBVyxHQUF3QixJQUFJLENBQUM7UUFDeEMsZ0JBQVUsR0FBVSxFQUFFLENBQUM7O0lBNkYzQixDQUFDO0lBM0ZhLDRCQUFNLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLGNBQWMsR0FBQyxJQUFJLEdBQUcsRUFBc0IsQ0FBQztRQUNsRCxJQUFJLENBQUMsV0FBVyxHQUFDLElBQUksR0FBRyxFQUFvQixDQUFDO1FBQzdDLElBQUksQ0FBQyxVQUFVLEdBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBRUQsK0JBQStCO0lBQ3JCLGlDQUFXLEdBQXJCLFVBQXNCLEVBQVMsRUFBQyxJQUFXLEVBQUMsU0FBZ0IsRUFBQyxZQUFzQjtRQUFuRixpQkFpQ0M7UUFoQ0csbUJBQW1CO1FBQ25CLElBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUM7WUFDM0IsSUFBRyxZQUFZLEVBQUM7Z0JBQ1osWUFBWSxFQUFFLENBQUM7YUFDbEI7WUFDRCxPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUVELElBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEVBQUM7WUFDNUIsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFFRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN6QixFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLE1BQU0sRUFBQyxVQUFDLEtBQVksRUFBRSxNQUFnQjtZQUM1RCxJQUFHLEtBQUssRUFBQztnQkFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNuQixPQUFPO2FBQ1Y7WUFDRCxLQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUMsTUFBTSxDQUFDLENBQUM7WUFDaEMsSUFBSSxJQUFJLEdBQUMsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQSxRQUFRO1lBQ25DLGdCQUFnQjtZQUNoQixLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxFQUFDO2dCQUMxQixJQUFJLElBQUksR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTztnQkFDMUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBLGlCQUFpQjtnQkFDaEMsS0FBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsYUFBYTthQUNsRDtZQUNELElBQUcsWUFBWSxFQUFDO2dCQUNaLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQzthQUM1QjtRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUNELGlCQUFpQjtJQUNQLGlDQUFXLEdBQXJCLFVBQXNCLEVBQVM7UUFFM0IsSUFBSSxJQUFJLEdBQVcsSUFBSSxDQUFDO1FBQ3hCLFlBQVk7UUFDWixJQUFJLElBQUksR0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNyQyxJQUFHLElBQUksRUFBQztZQUNKLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLDJCQUEyQjtnQkFDOUMsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQzthQUNyQjtpQkFBTSxFQUFFLG1EQUFtRDtnQkFDeEQsSUFBSSxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzthQUNuRDtTQUNKO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUNELGlCQUFpQjtJQUNQLGlDQUFXLEdBQXJCLFVBQXNCLEVBQVMsRUFBQyxJQUFZO1FBRXhDLFlBQVk7UUFDWixJQUFJLElBQUksR0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNyQyxJQUFHLElBQUksRUFBQztZQUNKLG9EQUFvRDtZQUNwRCxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2xCO0lBQ0wsQ0FBQztJQUVTLCtCQUFTLEdBQW5CO1FBRUksSUFBRyxJQUFJLENBQUMsY0FBYyxFQUFDO1lBQ25CLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLFVBQUMsQ0FBQyxFQUFDLENBQUM7Z0JBQzVCLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNkLENBQUMsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLGNBQWMsR0FBQyxJQUFJLENBQUM7U0FDNUI7UUFFRCx1Q0FBdUM7UUFDdkMsSUFBRyxJQUFJLENBQUMsV0FBVyxFQUFDO1lBQ2hCLG9DQUFvQztZQUVwQyw4Q0FBOEM7WUFDOUMsTUFBTTtZQUNOLElBQUksQ0FBQyxXQUFXLEdBQUMsSUFBSSxDQUFDO1NBQ3pCO1FBQ0QsSUFBRyxJQUFJLENBQUMsVUFBVSxFQUFDO1lBQ2YsSUFBSSxDQUFDLFVBQVUsR0FBQyxJQUFJLENBQUM7U0FDeEI7UUFDRCx3QkFBd0I7UUFDeEIsdUNBQXVDO0lBQzNDLENBQUM7SUEvRmdCLFdBQVc7UUFGL0IsT0FBTztRQUNSLFVBQVU7T0FDVyxXQUFXLENBaUcvQjtJQUFELGtCQUFDO0NBakdELEFBaUdDLENBakd3QyxFQUFFLENBQUMsU0FBUyxHQWlHcEQ7a0JBakdvQixXQUFXIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbi8qKuWKqOaAgeWvueixoeaxoCovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hcE5vZGVQb29sIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBtYXBfbm9kZV9wb29sczogTWFwPG51bWJlcixjYy5Ob2RlUG9vbD49bnVsbDtcclxuICAgIG1hcF9wcmVmYWJzOiBNYXA8bnVtYmVyLGNjLlByZWZhYj49bnVsbDtcclxuICAgIHByZWxvYWRfaWQ6bnVtYmVyW109W107XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uTG9hZCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm1hcF9ub2RlX3Bvb2xzPW5ldyBNYXA8bnVtYmVyLGNjLk5vZGVQb29sPigpO1xyXG4gICAgICAgIHRoaXMubWFwX3ByZWZhYnM9bmV3IE1hcDxudW1iZXIsY2MuUHJlZmFiPigpO1xyXG4gICAgICAgIHRoaXMucHJlbG9hZF9pZD1uZXcgQXJyYXkoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKirmoLnmja5pZOWSjOi1hOa6kOebruW9lSDmlrDlu7rkuIDkuKrlr7nosaHmsaAs6L+U5Zue5piv5ZCm6ZyA6KaB5Yqg6L29Ki9cclxuICAgIHByb3RlY3RlZCBhZGROb2RlUG9vbChpZDpudW1iZXIscGF0aDpzdHJpbmcsaW5pdENvdW50Om51bWJlcixsb2FkQ2FsbGJhY2s/OkZ1bmN0aW9uKTpib29sZWFue1xyXG4gICAgICAgIC8v5aaC5p6c5bey57uP5re75Yqg5LqG77yM6YKj5LmI5bCx5LiN57un57ut5re75Yqg5LqGXHJcbiAgICAgICAgaWYodGhpcy5tYXBfbm9kZV9wb29scy5oYXMoaWQpKXtcclxuICAgICAgICAgICAgaWYobG9hZENhbGxiYWNrKXtcclxuICAgICAgICAgICAgICAgIGxvYWRDYWxsYmFjaygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMucHJlbG9hZF9pZC5pbmNsdWRlcyhpZCkpe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnByZWxvYWRfaWQucHVzaChpZCk7XHJcbiAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQocGF0aCxjYy5QcmVmYWIsKGVycm9yOiBFcnJvciwgYXNzZXRzOmNjLlByZWZhYik9PiB7XHJcbiAgICAgICAgICAgIGlmKGVycm9yKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm1hcF9wcmVmYWJzLnNldChpZCxhc3NldHMpO1xyXG4gICAgICAgICAgICBsZXQgcG9vbD1uZXcgY2MuTm9kZVBvb2woKTsvLyDliJvlu7rlr7nosaHmsaBcclxuICAgICAgICAgICAgLy/liJ3lp4vlhYjmlL7nva7lpJrlsJHkuKrlr7nosaHliLDlr7nosaHmsaBcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8aW5pdENvdW50OyArK2kpe1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGUgPSBjYy5pbnN0YW50aWF0ZShhc3NldHMpOyAvLyDliJvlu7roioLngrlcclxuICAgICAgICAgICAgICAgIHBvb2wucHV0KG5vZGUpOy8vIOmAmui/hyBwdXQg5o6l5Y+j5pS+5YWl5a+56LGh5rGgXHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hcF9ub2RlX3Bvb2xzLnNldChpZCxwb29sKTsgLy/miorlr7nosaHmsaDmlL7ov5ttYXDlr7nosaFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihsb2FkQ2FsbGJhY2spe1xyXG4gICAgICAgICAgICAgICAgbG9hZENhbGxiYWNrKHBvb2wuZ2V0KCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2uaWTojrflvpfkuIDkuKrlr7nosaHoioLngrkqL1xyXG4gICAgcHJvdGVjdGVkIGdldE5vZGVCeUlkKGlkOm51bWJlcik6Y2MuTm9kZVxyXG4gICAge1xyXG4gICAgICAgIGxldCBub2RlOmNjLk5vZGUgPSBudWxsO1xyXG4gICAgICAgIC8v6I635b6XaWTlr7nlupTnmoTlr7nosaHmsaBcclxuICAgICAgICBsZXQgcG9vbD10aGlzLm1hcF9ub2RlX3Bvb2xzLmdldChpZCk7XHJcbiAgICAgICAgaWYocG9vbCl7XHJcbiAgICAgICAgICAgIGlmIChwb29sLnNpemUoKSA+IDApIHsgLy8g6YCa6L+HIHNpemUg5o6l5Y+j5Yik5pat5a+56LGh5rGg5Lit5piv5ZCm5pyJ56m66Zey55qE5a+56LGhXHJcbiAgICAgICAgICAgICAgICBub2RlID0gcG9vbC5nZXQoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHsgLy8g5aaC5p6c5rKh5pyJ56m66Zey5a+56LGh77yM5Lmf5bCx5piv5a+56LGh5rGg5Lit5aSH55So5a+56LGh5LiN5aSf5pe277yM5oiR5Lus5bCx55SoIGNjLmluc3RhbnRpYXRlIOmHjeaWsOWIm+W7ulxyXG4gICAgICAgICAgICAgICAgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMubWFwX3ByZWZhYnMuZ2V0KGlkKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja5pZOWIoOmZpOS4gOS4quWvueixoeiKgueCuSovXHJcbiAgICBwcm90ZWN0ZWQgZGVzdHJveU5vZGUoaWQ6bnVtYmVyLG5vZGU6Y2MuTm9kZSlcclxuICAgIHtcclxuICAgICAgICAvL+iOt+W+l2lk5a+55bqU55qE5a+56LGh5rGgXHJcbiAgICAgICAgbGV0IHBvb2w9dGhpcy5tYXBfbm9kZV9wb29scy5nZXQoaWQpO1xyXG4gICAgICAgIGlmKHBvb2wpe1xyXG4gICAgICAgICAgICAvLyDlkozliJ3lp4vljJbml7bnmoTmlrnms5XkuIDmoLfvvIzlsIboioLngrnmlL7ov5vlr7nosaHmsaDvvIzov5nkuKrmlrnms5XkvJrlkIzml7bosIPnlKjoioLngrnnmoQgcmVtb3ZlRnJvbVBhcmVudFxyXG4gICAgICAgICAgICBwb29sLnB1dChub2RlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRGVzdHJveSgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5tYXBfbm9kZV9wb29scyl7XHJcbiAgICAgICAgICAgIHRoaXMubWFwX25vZGVfcG9vbHMuZm9yRWFjaCgodixrKT0+e1xyXG4gICAgICAgICAgICAgICAgdi5jbGVhcigpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5tYXBfbm9kZV9wb29scz1udWxsOyAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvL2NjLmxvZyhjYy5hc3NldE1hbmFnZXIuYXNzZXRzLmNvdW50KTtcclxuICAgICAgICBpZih0aGlzLm1hcF9wcmVmYWJzKXtcclxuICAgICAgICAgICAgLy8gdGhpcy5tYXBfcHJlZmFicy5mb3JFYWNoKCh2LGspPT57XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gICAgIC8vY2MubG9nKGNjLmFzc2V0TWFuYWdlci5hc3NldHMuY291bnQpO1xyXG4gICAgICAgICAgICAvLyB9KTtcclxuICAgICAgICAgICAgdGhpcy5tYXBfcHJlZmFicz1udWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLnByZWxvYWRfaWQpe1xyXG4gICAgICAgICAgICB0aGlzLnByZWxvYWRfaWQ9bnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy90aGlzLm1hcF9wcmVmYWJzPW51bGw7XHJcbiAgICAgICAgLy9jYy5sb2coY2MuYXNzZXRNYW5hZ2VyLmFzc2V0cy5jb3VudCk7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==