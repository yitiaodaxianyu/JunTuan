
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/NodePoolManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTm9kZVBvb2xNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVNLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQTZDLG1DQUFZO0lBQXpEO1FBQUEscUVBOERDO1FBNURHLG9EQUFvRDtRQUNwRCxnQkFBVSxHQUFnQixFQUFFLENBQUM7UUFHN0IsYUFBTyxHQUFjLEVBQUUsQ0FBQzs7SUF3RDVCLENBQUM7SUF0RGEsOEJBQUksR0FBZCxVQUFlLEtBQVk7UUFFdkIsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLElBQUksU0FBUyxHQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBQ2xDLEtBQUssSUFBSSxJQUFJLEdBQUcsQ0FBQyxFQUFFLElBQUksR0FBRyxTQUFTLEVBQUUsRUFBRSxJQUFJLEVBQUU7WUFDekMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztZQUN4QyxLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxFQUM3QjtnQkFDSSxJQUFJLElBQUksR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU87Z0JBQ3RELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsaUJBQWlCO2FBQ3JEO1NBQ0o7SUFDTCxDQUFDO0lBRVMsMENBQWdCLEdBQTFCLFVBQTJCLElBQVcsRUFBQyxHQUFXO1FBRTlDLElBQUksSUFBSSxHQUFXLElBQUksQ0FBQztRQUN4QixJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsMkJBQTJCO1lBQy9ELElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1NBQ3RDO2FBQU0sRUFBRSxtREFBbUQ7WUFDeEQsSUFBSSxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQzdDO1FBQ0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN0QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxZQUFZO1FBQ3JDLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFUyw0Q0FBa0IsR0FBNUIsVUFBNkIsSUFBVyxFQUFDLEdBQVcsRUFBQyxNQUFjO1FBRS9ELElBQUksSUFBSSxHQUFXLElBQUksQ0FBQztRQUN4QixJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsMkJBQTJCO1lBQy9ELElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1NBQ3RDO2FBQU0sRUFBRSxtREFBbUQ7WUFDeEQsSUFBSSxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQzdDO1FBQ0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN0QixJQUFJLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxDQUFDLFlBQVk7UUFDbEMsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVTLHFDQUFXLEdBQXJCLFVBQXNCLElBQVksRUFBQyxJQUFXO1FBRTFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsb0RBQW9EO0lBQ3pGLENBQUM7SUFFUyxtQ0FBUyxHQUFuQjtRQUVJLElBQUksU0FBUyxHQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBQ2xDLEtBQUssSUFBSSxJQUFJLEdBQUcsQ0FBQyxFQUFFLElBQUksR0FBRyxTQUFTLEVBQUUsRUFBRSxJQUFJLEVBQUU7WUFDekMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNqQztJQUNMLENBQUM7SUF0REQ7UUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUMsT0FBTyxFQUFDLFVBQVUsRUFBQyxDQUFDO29EQUN4QjtJQU5QLGVBQWU7UUFEbkMsT0FBTztPQUNhLGVBQWUsQ0E4RG5DO0lBQUQsc0JBQUM7Q0E5REQsQUE4REMsQ0E5RDRDLEVBQUUsQ0FBQyxTQUFTLEdBOER4RDtrQkE5RG9CLGVBQWUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTm9kZVBvb2xNYW5hZ2VyIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICAvL0Bwcm9wZXJ0eSh7dHlwZTpbY2MuTm9kZVBvb2xdLHRvb2x0aXA6J+aJgOacieWvueixoeeahOWvueixoeaxoCd9KVxyXG4gICAgbm9kZV9wb29sczogY2MuTm9kZVBvb2xbXT1bXTtcclxuXHJcbiAgICBAcHJvcGVydHkoe3R5cGU6W2NjLlByZWZhYl0sdG9vbHRpcDon5omA5pyJ5a+56LGh55qE6aKE5Yi25L2TJ30pXHJcbiAgICBwcmVmYWJzOiBjYy5QcmVmYWJbXT1bXTtcclxuXHJcbiAgICBwcm90ZWN0ZWQgaW5pdChjb3VudDpudW1iZXIpOnZvaWRcclxuICAgIHtcclxuICAgICAgICBsZXQgaW5pdENvdW50ID0gY291bnQ7XHJcbiAgICAgICAgbGV0IHByZWZhYk51bT10aGlzLnByZWZhYnMubGVuZ3RoO1xyXG4gICAgICAgIGZvciAobGV0IHR5cGUgPSAwOyB0eXBlIDwgcHJlZmFiTnVtOyArK3R5cGUpIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlX3Bvb2xzLnB1c2gobmV3IGNjLk5vZGVQb29sKCkpO1xyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxpbml0Q291bnQ7ICsraSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnByZWZhYnNbdHlwZV0pOyAvLyDliJvlu7roioLngrlcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZV9wb29sc1t0eXBlXS5wdXQobm9kZSk7IC8vIOmAmui/hyBwdXQg5o6l5Y+j5pS+5YWl5a+56LGh5rGgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGNyZWF0ZU5vZGVCeVR5cGUodHlwZTpudW1iZXIscG9zOmNjLlZlYzIpOmNjLk5vZGVcclxuICAgIHtcclxuICAgICAgICBsZXQgbm9kZTpjYy5Ob2RlID0gbnVsbDtcclxuICAgICAgICBpZiAodGhpcy5ub2RlX3Bvb2xzW3R5cGVdLnNpemUoKSA+IDApIHsgLy8g6YCa6L+HIHNpemUg5o6l5Y+j5Yik5pat5a+56LGh5rGg5Lit5piv5ZCm5pyJ56m66Zey55qE5a+56LGhXHJcbiAgICAgICAgICAgIG5vZGUgPSB0aGlzLm5vZGVfcG9vbHNbdHlwZV0uZ2V0KCk7XHJcbiAgICAgICAgfSBlbHNlIHsgLy8g5aaC5p6c5rKh5pyJ56m66Zey5a+56LGh77yM5Lmf5bCx5piv5a+56LGh5rGg5Lit5aSH55So5a+56LGh5LiN5aSf5pe277yM5oiR5Lus5bCx55SoIGNjLmluc3RhbnRpYXRlIOmHjeaWsOWIm+W7ulxyXG4gICAgICAgICAgICBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5wcmVmYWJzW3R5cGVdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbm9kZS5zZXRQb3NpdGlvbihwb3MpO1xyXG4gICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5ub2RlOyAvLyDlsIbnlJ/miJDnmoTliqDlhaXoioLngrnmoJFcclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlTm9kZUJ5UGFyZW50KHR5cGU6bnVtYmVyLHBvczpjYy5WZWMyLHBhcmVudDpjYy5Ob2RlKTpjYy5Ob2RlXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IG5vZGU6Y2MuTm9kZSA9IG51bGw7XHJcbiAgICAgICAgaWYgKHRoaXMubm9kZV9wb29sc1t0eXBlXS5zaXplKCkgPiAwKSB7IC8vIOmAmui/hyBzaXplIOaOpeWPo+WIpOaWreWvueixoeaxoOS4reaYr+WQpuacieepuumXsueahOWvueixoVxyXG4gICAgICAgICAgICBub2RlID0gdGhpcy5ub2RlX3Bvb2xzW3R5cGVdLmdldCgpO1xyXG4gICAgICAgIH0gZWxzZSB7IC8vIOWmguaenOayoeacieepuumXsuWvueixoe+8jOS5n+WwseaYr+WvueixoeaxoOS4reWkh+eUqOWvueixoeS4jeWkn+aXtu+8jOaIkeS7rOWwseeUqCBjYy5pbnN0YW50aWF0ZSDph43mlrDliJvlu7pcclxuICAgICAgICAgICAgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMucHJlZmFic1t0eXBlXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG5vZGUuc2V0UG9zaXRpb24ocG9zKTtcclxuICAgICAgICBub2RlLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgIG5vZGUucGFyZW50ID0gcGFyZW50OyAvLyDlsIbnlJ/miJDnmoTliqDlhaXoioLngrnmoJFcclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZGVzdHJveU5vZGUobm9kZTpjYy5Ob2RlLHR5cGU6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubm9kZV9wb29sc1t0eXBlXS5wdXQobm9kZSk7IC8vIOWSjOWIneWni+WMluaXtueahOaWueazleS4gOagt++8jOWwhuiKgueCueaUvui/m+WvueixoeaxoO+8jOi/meS4quaWueazleS8muWQjOaXtuiwg+eUqOiKgueCueeahCByZW1vdmVGcm9tUGFyZW50XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRGVzdHJveSgpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHByZWZhYk51bT10aGlzLnByZWZhYnMubGVuZ3RoO1xyXG4gICAgICAgIGZvciAobGV0IHR5cGUgPSAwOyB0eXBlIDwgcHJlZmFiTnVtOyArK3R5cGUpIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlX3Bvb2xzW3R5cGVdLmNsZWFyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=