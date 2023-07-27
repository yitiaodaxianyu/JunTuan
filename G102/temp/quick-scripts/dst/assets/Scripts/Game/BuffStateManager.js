
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Game/BuffStateManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b2406dy0pRJr75zJm2cmoXk', 'BuffStateManager');
// Scripts/Game/BuffStateManager.ts

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
var MapNodePool_1 = require("./MapNodePool");
var BuffState_1 = require("../Hero/Game/BuffState");
var HeroConfig_1 = require("../Hero/Game/HeroConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BuffStateManager = /** @class */ (function (_super) {
    __extends(BuffStateManager, _super);
    function BuffStateManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ui_atlas = null;
        return _this;
    }
    BuffStateManager_1 = BuffStateManager;
    BuffStateManager.getInstance = function () {
        return this._instance;
    };
    BuffStateManager.prototype.getSpByName = function (name) {
        return this.ui_atlas.getSpriteFrame(name);
    };
    BuffStateManager.prototype.onLoad = function () {
        BuffStateManager_1._instance = this;
    };
    BuffStateManager.prototype.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
        BuffStateManager_1._instance = null;
    };
    BuffStateManager.prototype.createBuffRoot = function (pos, heroType) {
        var node = new cc.Node('' + heroType);
        var layout = node.addComponent(cc.Layout);
        layout.type = cc.Layout.Type.HORIZONTAL;
        layout.resizeMode = cc.Layout.ResizeMode.CONTAINER;
        node.setPosition(pos);
        this.node.addChild(node);
    };
    /**根据id创建一个特效*/
    BuffStateManager.prototype.createBuffState = function (type, heroType, p) {
        if (p === void 0) { p = null; }
        var node = new cc.Node('' + type);
        var sp = node.addComponent(cc.Sprite);
        sp.spriteFrame = this.getSpByName("Buff_Icon_" + type);
        //根据英雄找到对应的root位置
        if (p != null) {
            p.addChild(node);
        }
        else {
            var root = this.node.getChildByName('' + heroType);
            root.addChild(node);
        }
        var buffTS = node.addComponent(BuffState_1.default);
        return buffTS;
    };
    /**根据id创建一个特效*/
    BuffStateManager.prototype.createDeBuffState = function (type, heroType, p) {
        if (p === void 0) { p = null; }
        var node = new cc.Node('' + type);
        var sp = node.addComponent(cc.Sprite);
        sp.spriteFrame = this.getSpByName("Debuff_Icon_" + type);
        //根据英雄找到对应的root位置
        if (p != null) {
            p.addChild(node);
        }
        else {
            var root = this.node.getChildByName('' + heroType);
            root.addChild(node);
        }
        var buffTS = node.addComponent(BuffState_1.default);
        return buffTS;
    };
    BuffStateManager.prototype.getBuffType = function (buffId) {
        var type = [];
        switch (buffId) {
            case HeroConfig_1.BuffId.Hero_MeiMo_GongSu:
            case HeroConfig_1.BuffId.Pet3_JiaSu:
            case HeroConfig_1.BuffId.Hero_ZhenDe_Gongsu:
            case HeroConfig_1.BuffId.Hero_KuangZhanShi_DaZhao:
            case HeroConfig_1.BuffId.Hero_ChangMaoShow_GongSu:
                {
                    type.push(HeroConfig_1.BuffStateType.AttackSpeed);
                }
                break;
            case HeroConfig_1.BuffId.Hero_ZhenDe_BaoJiMingZhongLv:
                {
                    type.push(HeroConfig_1.BuffStateType.CritRate);
                    type.push(HeroConfig_1.BuffStateType.HitRate);
                }
                break;
        }
        return type;
    };
    BuffStateManager.prototype.getDeBuffType = function (buffId) {
        var type = [];
        switch (buffId) {
            case HeroConfig_1.BuffId.Boss6_Skill_2_jiangongsu:
            case HeroConfig_1.BuffId.Boss3_JIAN_GongSu:
                {
                    type.push(HeroConfig_1.BuffStateType.AttackSpeed);
                }
                break;
            case HeroConfig_1.BuffId.Boss8_Skill_2_attack:
                {
                    type.push(HeroConfig_1.BuffStateType.Attack);
                }
                break;
        }
        return type;
    };
    var BuffStateManager_1;
    BuffStateManager._instance = null;
    __decorate([
        property(cc.SpriteAtlas)
    ], BuffStateManager.prototype, "ui_atlas", void 0);
    BuffStateManager = BuffStateManager_1 = __decorate([
        ccclass
    ], BuffStateManager);
    return BuffStateManager;
}(MapNodePool_1.default));
exports.default = BuffStateManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcR2FtZVxcQnVmZlN0YXRlTWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBd0M7QUFDeEMsb0RBQStDO0FBQy9DLHNEQUEyRTtBQUdyRSxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUE4QyxvQ0FBVztJQUF6RDtRQUFBLHFFQXNHQztRQW5HRyxjQUFRLEdBQWdCLElBQUksQ0FBQzs7SUFtR2pDLENBQUM7eUJBdEdvQixnQkFBZ0I7SUFRbkIsNEJBQVcsR0FBekI7UUFFSSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUVELHNDQUFXLEdBQVgsVUFBWSxJQUFXO1FBQ25CLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVELGlDQUFNLEdBQU47UUFDSSxrQkFBZ0IsQ0FBQyxTQUFTLEdBQUMsSUFBSSxDQUFDO0lBQ3BDLENBQUM7SUFFUyxvQ0FBUyxHQUFuQjtRQUNJLGlCQUFNLFNBQVMsV0FBRSxDQUFDO1FBQ2xCLGtCQUFnQixDQUFDLFNBQVMsR0FBQyxJQUFJLENBQUM7SUFDcEMsQ0FBQztJQUVNLHlDQUFjLEdBQXJCLFVBQXNCLEdBQVcsRUFBQyxRQUFrQjtRQUNoRCxJQUFJLElBQUksR0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2xDLElBQUksTUFBTSxHQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3hDLE1BQU0sQ0FBQyxJQUFJLEdBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ3RDLE1BQU0sQ0FBQyxVQUFVLEdB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QUFBLE1BQU07U0FDVjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCx3Q0FBYSxHQUFiLFVBQWMsTUFBYTtRQUN2QixJQUFJLElBQUksR0FBQyxFQUFFLENBQUM7UUFDWixRQUFPLE1BQU0sRUFBQztZQUNWLEtBQUssbUJBQU0sQ0FBQyx3QkFBd0IsQ0FBQztZQUNyQyxLQUFLLG1CQUFNLENBQUMsaUJBQWlCO2dCQUFDO29CQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLDBCQUFhLENBQUMsV0FBVyxDQUFDLENBQUM7aUJBQ3hDO2dCQUFBLE1BQU07WUFDUCxLQUFLLG1CQUFNLENBQUMsb0JBQW9CO2dCQUFDO29CQUM3QixJQUFJLENBQUMsSUFBSSxDQUFDLDBCQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQ25DO2dCQUFBLE1BQU07U0FDVjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7O0lBaEdjLDBCQUFTLEdBQXFCLElBQUksQ0FBQztJQUZsRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDO3NEQUNJO0lBSFosZ0JBQWdCO1FBRHBDLE9BQU87T0FDYSxnQkFBZ0IsQ0FzR3BDO0lBQUQsdUJBQUM7Q0F0R0QsQUFzR0MsQ0F0RzZDLHFCQUFXLEdBc0d4RDtrQkF0R29CLGdCQUFnQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBNYXBOb2RlUG9vbCBmcm9tIFwiLi9NYXBOb2RlUG9vbFwiO1xyXG5pbXBvcnQgQnVmZlN0YXRlIGZyb20gXCIuLi9IZXJvL0dhbWUvQnVmZlN0YXRlXCI7XHJcbmltcG9ydCB7IEhlcm9fVHlwZSwgQnVmZlN0YXRlVHlwZSwgQnVmZklkIH0gZnJvbSBcIi4uL0hlcm8vR2FtZS9IZXJvQ29uZmlnXCI7XHJcblxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCdWZmU3RhdGVNYW5hZ2VyIGV4dGVuZHMgTWFwTm9kZVBvb2wge1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGVBdGxhcylcclxuICAgIHVpX2F0bGFzOmNjLlNwcml0ZUF0bGFzPW51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBCdWZmU3RhdGVNYW5hZ2VyID0gbnVsbDtcclxuXHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOkJ1ZmZTdGF0ZU1hbmFnZXJcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U3BCeU5hbWUobmFtZTpzdHJpbmcpOmNjLlNwcml0ZUZyYW1le1xyXG4gICAgICAgIHJldHVybiB0aGlzLnVpX2F0bGFzLmdldFNwcml0ZUZyYW1lKG5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgQnVmZlN0YXRlTWFuYWdlci5faW5zdGFuY2U9dGhpcztcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLm9uRGVzdHJveSgpO1xyXG4gICAgICAgIEJ1ZmZTdGF0ZU1hbmFnZXIuX2luc3RhbmNlPW51bGw7ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY3JlYXRlQnVmZlJvb3QocG9zOmNjLlZlYzIsaGVyb1R5cGU6SGVyb19UeXBlKXtcclxuICAgICAgICBsZXQgbm9kZT1uZXcgY2MuTm9kZSgnJytoZXJvVHlwZSk7XHJcbiAgICAgICAgbGV0IGxheW91dD1ub2RlLmFkZENvbXBvbmVudChjYy5MYXlvdXQpO1xyXG4gICAgICAgIGxheW91dC50eXBlPWNjLkxheW91dC5UeXBlLkhPUklaT05UQUw7XHJcbiAgICAgICAgbGF5b3V0LnJlc2l6ZU1vZGU9Y2MuTGF5b3V0LlJlc2l6ZU1vZGUuQ09OVEFJTkVSO1xyXG4gICAgICAgIG5vZGUuc2V0UG9zaXRpb24ocG9zKTtcclxuICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5qC55o2uaWTliJvlu7rkuIDkuKrnibnmlYgqL1xyXG4gICAgcHVibGljIGNyZWF0ZUJ1ZmZTdGF0ZSh0eXBlOkJ1ZmZTdGF0ZVR5cGUsaGVyb1R5cGU6SGVyb19UeXBlLHA6Y2MuTm9kZT1udWxsKTpCdWZmU3RhdGVcclxuICAgIHtcclxuICAgICAgICBsZXQgbm9kZT1uZXcgY2MuTm9kZSgnJyt0eXBlKTtcclxuICAgICAgICBsZXQgc3A9bm9kZS5hZGRDb21wb25lbnQoY2MuU3ByaXRlKTtcclxuICAgICAgICBzcC5zcHJpdGVGcmFtZT10aGlzLmdldFNwQnlOYW1lKFwiQnVmZl9JY29uX1wiK3R5cGUpO1xyXG4gICAgICAgIC8v5qC55o2u6Iux6ZuE5om+5Yiw5a+55bqU55qEcm9vdOS9jee9rlxyXG4gICAgICAgXHJcbiAgICAgICAgaWYocCE9bnVsbCl7XHJcbiAgICAgICAgICAgIHAuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGxldCByb290PXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnJytoZXJvVHlwZSk7XHJcbiAgICAgICAgICAgIHJvb3QuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBidWZmVFM9bm9kZS5hZGRDb21wb25lbnQoQnVmZlN0YXRlKTtcclxuICAgICAgICByZXR1cm4gYnVmZlRTO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuagueaNrmlk5Yib5bu65LiA5Liq54m55pWIKi9cclxuICAgIHB1YmxpYyBjcmVhdGVEZUJ1ZmZTdGF0ZSh0eXBlOkJ1ZmZTdGF0ZVR5cGUsaGVyb1R5cGU6SGVyb19UeXBlLHA6Y2MuTm9kZT1udWxsKTpCdWZmU3RhdGVcclxuICAgIHtcclxuICAgICAgICBsZXQgbm9kZT1uZXcgY2MuTm9kZSgnJyt0eXBlKTtcclxuICAgICAgICBsZXQgc3A9bm9kZS5hZGRDb21wb25lbnQoY2MuU3ByaXRlKTtcclxuICAgICAgICBzcC5zcHJpdGVGcmFtZT10aGlzLmdldFNwQnlOYW1lKFwiRGVidWZmX0ljb25fXCIrdHlwZSk7XHJcbiAgICAgICAgLy/moLnmja7oi7Hpm4Tmib7liLDlr7nlupTnmoRyb2905L2N572uXHJcbiAgICAgICAgaWYocCE9bnVsbCl7XHJcbiAgICAgICAgICAgIHAuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGxldCByb290PXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnJytoZXJvVHlwZSk7XHJcbiAgICAgICAgICAgIHJvb3QuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBidWZmVFM9bm9kZS5hZGRDb21wb25lbnQoQnVmZlN0YXRlKTtcclxuICAgICAgICByZXR1cm4gYnVmZlRTO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEJ1ZmZUeXBlKGJ1ZmZJZDpCdWZmSWQpOkJ1ZmZTdGF0ZVR5cGVbXXtcclxuICAgICAgICBsZXQgdHlwZT1bXTtcclxuICAgICAgICBzd2l0Y2goYnVmZklkKXtcclxuICAgICAgICAgICAgY2FzZSBCdWZmSWQuSGVyb19NZWlNb19Hb25nU3U6XHJcbiAgICAgICAgICAgIGNhc2UgQnVmZklkLlBldDNfSmlhU3U6XHJcbiAgICAgICAgICAgIGNhc2UgQnVmZklkLkhlcm9fWmhlbkRlX0dvbmdzdTpcclxuICAgICAgICAgICAgY2FzZSBCdWZmSWQuSGVyb19LdWFuZ1poYW5TaGlfRGFaaGFvOlxyXG4gICAgICAgICAgICBjYXNlIEJ1ZmZJZC5IZXJvX0NoYW5nTWFvU2hvd19Hb25nU3U6e1xyXG4gICAgICAgICAgICAgICAgdHlwZS5wdXNoKEJ1ZmZTdGF0ZVR5cGUuQXR0YWNrU3BlZWQpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQnVmZklkLkhlcm9fWmhlbkRlX0Jhb0ppTWluZ1pob25nTHY6e1xyXG4gICAgICAgICAgICAgICAgdHlwZS5wdXNoKEJ1ZmZTdGF0ZVR5cGUuQ3JpdFJhdGUpO1xyXG4gICAgICAgICAgICAgICAgdHlwZS5wdXNoKEJ1ZmZTdGF0ZVR5cGUuSGl0UmF0ZSk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHR5cGU7ICAgICAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RGVCdWZmVHlwZShidWZmSWQ6QnVmZklkKTpCdWZmU3RhdGVUeXBlW117XHJcbiAgICAgICAgbGV0IHR5cGU9W107XHJcbiAgICAgICAgc3dpdGNoKGJ1ZmZJZCl7XHJcbiAgICAgICAgICAgIGNhc2UgQnVmZklkLkJvc3M2X1NraWxsXzJfamlhbmdvbmdzdTpcclxuICAgICAgICAgICAgY2FzZSBCdWZmSWQuQm9zczNfSklBTl9Hb25nU3U6e1xyXG4gICAgICAgICAgICAgICAgdHlwZS5wdXNoKEJ1ZmZTdGF0ZVR5cGUuQXR0YWNrU3BlZWQpO1xyXG4gICAgICAgICAgICB9YnJlYWs7ICAgXHJcbiAgICAgICAgICAgIGNhc2UgQnVmZklkLkJvc3M4X1NraWxsXzJfYXR0YWNrOntcclxuICAgICAgICAgICAgICAgIHR5cGUucHVzaChCdWZmU3RhdGVUeXBlLkF0dGFjayk7XHJcbiAgICAgICAgICAgIH1icmVhazsgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHR5cGU7ICAgICAgICAgICAgXHJcbiAgICB9XHJcbn1cclxuIl19