
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/City/CityUi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '51672WHO8lPFIVnTkrz3o7r', 'CityUi');
// Scripts/City/CityUi.ts

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
var FollowConstants_1 = require("../multiLanguage/FollowConstants");
var FollowManager_1 = require("../multiLanguage/FollowManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var CityUi = /** @class */ (function (_super) {
    __extends(CityUi, _super);
    function CityUi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CityUi.prototype.onLoad = function () {
        this.node.on(cc.Node.EventType.POSITION_CHANGED, this.onPositionChange, this);
    };
    CityUi.prototype.onDestroy = function () {
        this.node.off(cc.Node.EventType.POSITION_CHANGED, this.onPositionChange, this);
    };
    CityUi.prototype.onPositionChange = function () {
        if (this.node.x == 0) {
            this.onEnable();
        }
    };
    CityUi.prototype.start = function () {
        //UIManager.getInstance().preloadPrefab('ui/home/wishing_ui');
    };
    CityUi.prototype.onEnable = function () {
        this.initUi();
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.主城打开次数);
    };
    CityUi.prototype.initUi = function () {
        // this.node.getChildByName("petHomeLabel").getComponent(cc.Label).string = LanguageManager.getInstance().getStrByTextId(FunctionDefinitionManager.getInstance().getTextID(FuncType.LongChao));
        // this.node.getChildByName("storeLabel").getComponent(cc.Label).string = LanguageManager.getInstance().getStrByTextId(FunctionDefinitionManager.getInstance().getTextID(FuncType.ShangDian));
        // this.node.getChildByName("blacksmithLabel").getComponent(cc.Label).string = LanguageManager.getInstance().getStrByTextId(FunctionDefinitionManager.getInstance().getTextID(FuncType.TieJiangPu));
        // this.node.getChildByName("wishingLabel").getComponent(cc.Label).string = LanguageManager.getInstance().getStrByTextId(FunctionDefinitionManager.getInstance().getTextID(FuncType.XuYuanChi));
        // this.node.getChildByName("templeLabel").getComponent(cc.Label).string = LanguageManager.getInstance().getStrByTextId(FunctionDefinitionManager.getInstance().getTextID(FuncType.Shengtang));
        // 铁匠铺
        // if (!FunctionDefinitionManager.getInstance().getIsUnlock(FuncType.TieJiangPu)) {
        //     this.node.getChildByName("blacksmith").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
        //     this.node.getChildByName("blacksmithLock").active = true;
        //     this.node.getChildByName("blacksmisthBg").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
        //     this.node.getChildByName("blacksmith").on(cc.Node.EventType.TOUCH_END, () => {
        //     });
        // } else {
        //     this.node.getChildByName("blacksmith").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
        //     this.node.getChildByName("blacksmithLock").active = false;
        //     this.node.getChildByName("blacksmisthBg").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
        //     this.node.getChildByName("blacksmith").on(cc.Node.EventType.TOUCH_END, () => {
        //         this.node.getChildByName("equip").active = true;
        //     });
        // }
        // // 龙巢
        // if (!FunctionDefinitionManager.getInstance().getIsUnlock(FuncType.LongChao)) {
        //     this.node.getChildByName("petHome").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
        //     this.node.getChildByName("petHomeLock").active = true;
        //     this.node.getChildByName("petHomeBg").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
        //     this.node.getChildByName("petHome").on(cc.Node.EventType.TOUCH_END, () => {
        //         GameManager.getInstance().showMessage(LanguageManager.getInstance().getString(LanguageIndex.UnlockAfter)+LanguageManager.getInstance().getString(LanguageIndex.PlayerLv)+FunctionDefinitionManager.getInstance().getUnlockCondictionParameter(FuncType.LongChao));
        //     });
        // } else {
        //     this.node.getChildByName("petHome").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
        //     this.node.getChildByName("petHomeLock").active = false;
        //     this.node.getChildByName("petHomeBg").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
        //     this.node.getChildByName("petHome").on(cc.Node.EventType.TOUCH_END, () => {
        //     });
        // }
        // // 圣堂
        // if (!FunctionDefinitionManager.getInstance().getIsUnlock(FuncType.Shengtang)) {
        //     this.node.getChildByName("temple").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
        //     this.node.getChildByName("templeLock").active = true;
        //     this.node.getChildByName("templeBg").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
        //     this.node.getChildByName("petHome").on(cc.Node.EventType.TOUCH_END, () => {
        //         GameManager.getInstance().showMessage(LanguageManager.getInstance().getString(LanguageIndex.UnlockAfter)+LanguageManager.getInstance().getString(LanguageIndex.PlayerLv)+FunctionDefinitionManager.getInstance().getUnlockCondictionParameter(FuncType.Shengtang));
        //     });
        // } else {
        //     this.node.getChildByName("temple").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
        //     this.node.getChildByName("templeLock").active = false;
        //     this.node.getChildByName("templeBg").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
        //     this.node.getChildByName("temple").on(cc.Node.EventType.TOUCH_END, () => {
        //     });
        // }
        // // 商店
        // if (!FunctionDefinitionManager.getInstance().getIsUnlock(FuncType.ShangDian)) {
        //     this.node.getChildByName("store").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
        //     this.node.getChildByName("storeLock").active = true;
        //     this.node.getChildByName("storeBg").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
        //     this.node.getChildByName("petHome").on(cc.Node.EventType.TOUCH_END, () => {
        //         GameManager.getInstance().showMessage(LanguageManager.getInstance().getString(LanguageIndex.UnlockAfter)+LanguageManager.getInstance().getString(LanguageIndex.PlayerLv)+FunctionDefinitionManager.getInstance().getUnlockCondictionParameter(FuncType.ShangDian));
        //     });
        // } else {
        //     this.node.getChildByName("store").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
        //     this.node.getChildByName("storeLock").active = false;
        //     this.node.getChildByName("storeBg").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
        //     this.node.getChildByName("store").on(cc.Node.EventType.TOUCH_END, () => {
        //         UIManager.getInstance().showGoldMallUi(null);
        //     });
        // }
        // // 许愿池
        // if (!FunctionDefinitionManager.getInstance().getIsUnlock(FuncType.XuYuanChi)) {
        //     this.node.getChildByName("wishing").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
        //     this.node.getChildByName("wishingLock").active = true;
        //     this.node.getChildByName("wishingBg").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
        //     this.node.getChildByName("petHome").on(cc.Node.EventType.TOUCH_END, () => {
        //         GameManager.getInstance().showMessage(LanguageManager.getInstance().getString(LanguageIndex.UnlockAfter)+LanguageManager.getInstance().getString(LanguageIndex.PlayerLv)+FunctionDefinitionManager.getInstance().getUnlockCondictionParameter(FuncType.XuYuanChi));
        //     });
        // } else {
        //     this.node.getChildByName("wishing").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
        //     this.node.getChildByName("wishingLock").active = false;
        //     this.node.getChildByName("wishingBg").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
        //     this.node.getChildByName("wishing").on(cc.Node.EventType.TOUCH_END, () => {
        //     });
        // }
    };
    CityUi = __decorate([
        ccclass
    ], CityUi);
    return CityUi;
}(cc.Component));
exports.default = CityUi;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcQ2l0eVxcQ2l0eVVpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLG9FQUErRDtBQUMvRCxnRUFBMkQ7QUFHckQsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBb0MsMEJBQVk7SUFBaEQ7O0lBMklBLENBQUM7SUF6SUcsdUJBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixFQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBQyxJQUFJLENBQUMsQ0FBQztJQUNoRixDQUFDO0lBRVMsMEJBQVMsR0FBbkI7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsRUFBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUMsSUFBSSxDQUFDLENBQUM7SUFDakYsQ0FBQztJQUVELGlDQUFnQixHQUFoQjtRQUNJLElBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUUsQ0FBQyxFQUFDO1lBQ2QsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ25CO0lBQ0wsQ0FBQztJQUVELHNCQUFLLEdBQUw7UUFDSSw4REFBOEQ7SUFDbEUsQ0FBQztJQUVELHlCQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDZCx1QkFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQyw2QkFBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFRCx1QkFBTSxHQUFOO1FBQ0ksK0xBQStMO1FBQy9MLDhMQUE4TDtRQUM5TCxvTUFBb007UUFDcE0sZ01BQWdNO1FBQ2hNLCtMQUErTDtRQUMvTCxNQUFNO1FBQ04sbUZBQW1GO1FBQ25GLHVJQUF1STtRQUN2SSxnRUFBZ0U7UUFDaEUsMElBQTBJO1FBQzFJLHFGQUFxRjtRQUVyRixVQUFVO1FBQ1YsV0FBVztRQUNYLGtJQUFrSTtRQUNsSSxpRUFBaUU7UUFDakUscUlBQXFJO1FBQ3JJLHFGQUFxRjtRQUNyRiwyREFBMkQ7UUFDM0QsVUFBVTtRQUNWLElBQUk7UUFDSixRQUFRO1FBQ1IsaUZBQWlGO1FBQ2pGLG9JQUFvSTtRQUNwSSw2REFBNkQ7UUFDN0Qsc0lBQXNJO1FBQ3RJLGtGQUFrRjtRQUNsRiw2UUFBNlE7UUFDN1EsVUFBVTtRQUNWLFdBQVc7UUFDWCwrSEFBK0g7UUFDL0gsOERBQThEO1FBQzlELGlJQUFpSTtRQUNqSSxrRkFBa0Y7UUFFbEYsVUFBVTtRQUNWLElBQUk7UUFDSixRQUFRO1FBQ1Isa0ZBQWtGO1FBQ2xGLG1JQUFtSTtRQUNuSSw0REFBNEQ7UUFDNUQscUlBQXFJO1FBQ3JJLGtGQUFrRjtRQUNsRiw4UUFBOFE7UUFDOVEsVUFBVTtRQUNWLFdBQVc7UUFDWCw4SEFBOEg7UUFDOUgsNkRBQTZEO1FBQzdELGdJQUFnSTtRQUNoSSxpRkFBaUY7UUFFakYsVUFBVTtRQUNWLElBQUk7UUFDSixRQUFRO1FBQ1Isa0ZBQWtGO1FBQ2xGLGtJQUFrSTtRQUNsSSwyREFBMkQ7UUFDM0Qsb0lBQW9JO1FBQ3BJLGtGQUFrRjtRQUNsRiw4UUFBOFE7UUFDOVEsVUFBVTtRQUNWLFdBQVc7UUFDWCw2SEFBNkg7UUFDN0gsNERBQTREO1FBQzVELCtIQUErSDtRQUMvSCxnRkFBZ0Y7UUFDaEYsd0RBQXdEO1FBQ3hELFVBQVU7UUFDVixJQUFJO1FBQ0osU0FBUztRQUNULGtGQUFrRjtRQUNsRixvSUFBb0k7UUFDcEksNkRBQTZEO1FBQzdELHNJQUFzSTtRQUN0SSxrRkFBa0Y7UUFDbEYsOFFBQThRO1FBQzlRLFVBQVU7UUFDVixXQUFXO1FBQ1gsK0hBQStIO1FBQy9ILDhEQUE4RDtRQUM5RCxpSUFBaUk7UUFDakksa0ZBQWtGO1FBRWxGLFVBQVU7UUFDVixJQUFJO0lBRVIsQ0FBQztJQWhIZ0IsTUFBTTtRQUQxQixPQUFPO09BQ2EsTUFBTSxDQTJJMUI7SUFBRCxhQUFDO0NBM0lELEFBMklDLENBM0ltQyxFQUFFLENBQUMsU0FBUyxHQTJJL0M7a0JBM0lvQixNQUFNIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7IEZvbGxvd19UeXBlIH0gZnJvbSBcIi4uL211bHRpTGFuZ3VhZ2UvRm9sbG93Q29uc3RhbnRzXCI7XHJcbmltcG9ydCBGb2xsb3dNYW5hZ2VyIGZyb20gXCIuLi9tdWx0aUxhbmd1YWdlL0ZvbGxvd01hbmFnZXJcIjtcclxuXHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2l0eVVpIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBvbkxvYWQgKCkgeyAgICAgICAgXHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlBPU0lUSU9OX0NIQU5HRUQsdGhpcy5vblBvc2l0aW9uQ2hhbmdlLHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5QT1NJVElPTl9DSEFOR0VELHRoaXMub25Qb3NpdGlvbkNoYW5nZSx0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBvblBvc2l0aW9uQ2hhbmdlKCl7XHJcbiAgICAgICAgaWYodGhpcy5ub2RlLng9PTApe1xyXG4gICAgICAgICAgICB0aGlzLm9uRW5hYmxlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG4gICAgICAgIC8vVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkucHJlbG9hZFByZWZhYigndWkvaG9tZS93aXNoaW5nX3VpJyk7XHJcbiAgICB9XHJcblxyXG4gICAgb25FbmFibGUoKXtcclxuICAgICAgICB0aGlzLmluaXRVaSgpO1xyXG4gICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7kuLvln47miZPlvIDmrKHmlbApO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRVaSgpIHtcclxuICAgICAgICAvLyB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJwZXRIb21lTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZChGdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VGV4dElEKEZ1bmNUeXBlLkxvbmdDaGFvKSk7XHJcbiAgICAgICAgLy8gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwic3RvcmVMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKEZ1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRUZXh0SUQoRnVuY1R5cGUuU2hhbmdEaWFuKSk7XHJcbiAgICAgICAgLy8gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYmxhY2tzbWl0aExhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoRnVuY3Rpb25EZWZpbml0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFRleHRJRChGdW5jVHlwZS5UaWVKaWFuZ1B1KSk7XHJcbiAgICAgICAgLy8gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwid2lzaGluZ0xhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoRnVuY3Rpb25EZWZpbml0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFRleHRJRChGdW5jVHlwZS5YdVl1YW5DaGkpKTtcclxuICAgICAgICAvLyB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ0ZW1wbGVMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKEZ1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRUZXh0SUQoRnVuY1R5cGUuU2hlbmd0YW5nKSk7XHJcbiAgICAgICAgLy8g6ZOB5Yyg6ZO6XHJcbiAgICAgICAgLy8gaWYgKCFGdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SXNVbmxvY2soRnVuY1R5cGUuVGllSmlhbmdQdSkpIHtcclxuICAgICAgICAvLyAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYmxhY2tzbWl0aFwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1ncmF5LXNwcml0ZVwiKSk7XHJcbiAgICAgICAgLy8gICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJsYWNrc21pdGhMb2NrXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgLy8gICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJsYWNrc21pc3RoQmdcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc2V0TWF0ZXJpYWwoMCwgY2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKFwiMmQtZ3JheS1zcHJpdGVcIikpO1xyXG4gICAgICAgIC8vICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJibGFja3NtaXRoXCIpLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgLy8gICAgIH0pO1xyXG4gICAgICAgIC8vIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJsYWNrc21pdGhcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc2V0TWF0ZXJpYWwoMCwgY2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKFwiMmQtc3ByaXRlXCIpKTtcclxuICAgICAgICAvLyAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYmxhY2tzbWl0aExvY2tcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgLy8gICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJsYWNrc21pc3RoQmdcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc2V0TWF0ZXJpYWwoMCwgY2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKFwiMmQtc3ByaXRlXCIpKTtcclxuICAgICAgICAvLyAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYmxhY2tzbWl0aFwiKS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsICgpID0+IHtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImVxdWlwXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgLy8gICAgIH0pO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyAvLyDpvpnlt6JcclxuICAgICAgICAvLyBpZiAoIUZ1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRJc1VubG9jayhGdW5jVHlwZS5Mb25nQ2hhbykpIHtcclxuICAgICAgICAvLyAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwicGV0SG9tZVwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1ncmF5LXNwcml0ZVwiKSk7XHJcbiAgICAgICAgLy8gICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInBldEhvbWVMb2NrXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgLy8gICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInBldEhvbWVCZ1wiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1ncmF5LXNwcml0ZVwiKSk7XHJcbiAgICAgICAgLy8gICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInBldEhvbWVcIikub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCAoKSA9PiB7XHJcbiAgICAgICAgLy8gICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0cmluZyhMYW5ndWFnZUluZGV4LlVubG9ja0FmdGVyKStMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJpbmcoTGFuZ3VhZ2VJbmRleC5QbGF5ZXJMdikrRnVuY3Rpb25EZWZpbml0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFVubG9ja0NvbmRpY3Rpb25QYXJhbWV0ZXIoRnVuY1R5cGUuTG9uZ0NoYW8pKTtcclxuICAgICAgICAvLyAgICAgfSk7XHJcbiAgICAgICAgLy8gfSBlbHNlIHtcclxuICAgICAgICAvLyAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwicGV0SG9tZVwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1zcHJpdGVcIikpO1xyXG4gICAgICAgIC8vICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJwZXRIb21lTG9ja1wiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAvLyAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwicGV0SG9tZUJnXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNldE1hdGVyaWFsKDAsIGNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbChcIjJkLXNwcml0ZVwiKSk7XHJcbiAgICAgICAgLy8gICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInBldEhvbWVcIikub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCAoKSA9PiB7XHJcblxyXG4gICAgICAgIC8vICAgICB9KTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gLy8g5Zyj5aCCXHJcbiAgICAgICAgLy8gaWYgKCFGdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SXNVbmxvY2soRnVuY1R5cGUuU2hlbmd0YW5nKSkge1xyXG4gICAgICAgIC8vICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ0ZW1wbGVcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc2V0TWF0ZXJpYWwoMCwgY2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKFwiMmQtZ3JheS1zcHJpdGVcIikpO1xyXG4gICAgICAgIC8vICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ0ZW1wbGVMb2NrXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgLy8gICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInRlbXBsZUJnXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNldE1hdGVyaWFsKDAsIGNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbChcIjJkLWdyYXktc3ByaXRlXCIpKTtcclxuICAgICAgICAvLyAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwicGV0SG9tZVwiKS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsICgpID0+IHtcclxuICAgICAgICAvLyAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyaW5nKExhbmd1YWdlSW5kZXguVW5sb2NrQWZ0ZXIpK0xhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0cmluZyhMYW5ndWFnZUluZGV4LlBsYXllckx2KStGdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VW5sb2NrQ29uZGljdGlvblBhcmFtZXRlcihGdW5jVHlwZS5TaGVuZ3RhbmcpKTtcclxuICAgICAgICAvLyAgICAgfSk7XHJcbiAgICAgICAgLy8gfSBlbHNlIHtcclxuICAgICAgICAvLyAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwidGVtcGxlXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNldE1hdGVyaWFsKDAsIGNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbChcIjJkLXNwcml0ZVwiKSk7XHJcbiAgICAgICAgLy8gICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInRlbXBsZUxvY2tcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgLy8gICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInRlbXBsZUJnXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNldE1hdGVyaWFsKDAsIGNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbChcIjJkLXNwcml0ZVwiKSk7XHJcbiAgICAgICAgLy8gICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInRlbXBsZVwiKS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsICgpID0+IHtcclxuXHJcbiAgICAgICAgLy8gICAgIH0pO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyAvLyDllYblupdcclxuICAgICAgICAvLyBpZiAoIUZ1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRJc1VubG9jayhGdW5jVHlwZS5TaGFuZ0RpYW4pKSB7XHJcbiAgICAgICAgLy8gICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInN0b3JlXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNldE1hdGVyaWFsKDAsIGNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbChcIjJkLWdyYXktc3ByaXRlXCIpKTtcclxuICAgICAgICAvLyAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwic3RvcmVMb2NrXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgLy8gICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInN0b3JlQmdcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc2V0TWF0ZXJpYWwoMCwgY2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKFwiMmQtZ3JheS1zcHJpdGVcIikpO1xyXG4gICAgICAgIC8vICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJwZXRIb21lXCIpLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgKCkgPT4ge1xyXG4gICAgICAgIC8vICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJpbmcoTGFuZ3VhZ2VJbmRleC5VbmxvY2tBZnRlcikrTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyaW5nKExhbmd1YWdlSW5kZXguUGxheWVyTHYpK0Z1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRVbmxvY2tDb25kaWN0aW9uUGFyYW1ldGVyKEZ1bmNUeXBlLlNoYW5nRGlhbikpO1xyXG4gICAgICAgIC8vICAgICB9KTtcclxuICAgICAgICAvLyB9IGVsc2Uge1xyXG4gICAgICAgIC8vICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzdG9yZVwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1zcHJpdGVcIikpO1xyXG4gICAgICAgIC8vICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzdG9yZUxvY2tcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgLy8gICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInN0b3JlQmdcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc2V0TWF0ZXJpYWwoMCwgY2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKFwiMmQtc3ByaXRlXCIpKTtcclxuICAgICAgICAvLyAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwic3RvcmVcIikub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCAoKSA9PiB7XHJcbiAgICAgICAgLy8gICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93R29sZE1hbGxVaShudWxsKTtcclxuICAgICAgICAvLyAgICAgfSk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIC8vIOiuuOaEv+axoFxyXG4gICAgICAgIC8vIGlmICghRnVuY3Rpb25EZWZpbml0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldElzVW5sb2NrKEZ1bmNUeXBlLlh1WXVhbkNoaSkpIHtcclxuICAgICAgICAvLyAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwid2lzaGluZ1wiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1ncmF5LXNwcml0ZVwiKSk7XHJcbiAgICAgICAgLy8gICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIndpc2hpbmdMb2NrXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgLy8gICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIndpc2hpbmdCZ1wiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1ncmF5LXNwcml0ZVwiKSk7XHJcbiAgICAgICAgLy8gICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInBldEhvbWVcIikub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCAoKSA9PiB7XHJcbiAgICAgICAgLy8gICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0cmluZyhMYW5ndWFnZUluZGV4LlVubG9ja0FmdGVyKStMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJpbmcoTGFuZ3VhZ2VJbmRleC5QbGF5ZXJMdikrRnVuY3Rpb25EZWZpbml0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFVubG9ja0NvbmRpY3Rpb25QYXJhbWV0ZXIoRnVuY1R5cGUuWHVZdWFuQ2hpKSk7XHJcbiAgICAgICAgLy8gICAgIH0pO1xyXG4gICAgICAgIC8vIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIndpc2hpbmdcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc2V0TWF0ZXJpYWwoMCwgY2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKFwiMmQtc3ByaXRlXCIpKTtcclxuICAgICAgICAvLyAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwid2lzaGluZ0xvY2tcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgLy8gICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIndpc2hpbmdCZ1wiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1zcHJpdGVcIikpO1xyXG4gICAgICAgIC8vICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ3aXNoaW5nXCIpLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgKCkgPT4ge1xyXG5cclxuICAgICAgICAvLyAgICAgfSk7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxyXG5cclxuICAgIC8vIG9uQmxhY2tzbWl0aEJ0bkNsaWNrKCl7XHJcbiAgICAvLyAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJpbmcoTGFuZ3VhZ2VJbmRleC5VbmxvY2tBZnRlcikrTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyaW5nKExhbmd1YWdlSW5kZXguUGxheWVyTHYpK0Z1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRVbmxvY2tDb25kaWN0aW9uUGFyYW1ldGVyKEZ1bmNUeXBlLlRpZUppYW5nUHUpKTtcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyBvbldpc2hpbmdCdG5DbGljaygpe1xyXG5cclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyBvblRlbXBsZUJ0bkNsaWNrKCl7XHJcblxyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIG9uUGV0SG9tZUJ0bkNsaWNrKCl7XHJcblxyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIG9uU3RvcmVCdG5DbGljaygpe1xyXG5cclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyBvbkV4aXQoKXtcclxuICAgIC8vICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJlcXVpcFwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIC8vIH1cclxufVxyXG4iXX0=