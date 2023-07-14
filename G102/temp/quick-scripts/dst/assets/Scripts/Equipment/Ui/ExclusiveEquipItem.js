
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Equipment/Ui/ExclusiveEquipItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd96d6s+Z3FKcrTw+dEjoWb3', 'ExclusiveEquipItem');
// Scripts/Equipment/Ui/ExclusiveEquipItem.ts

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
var HeroManager_1 = require("../../Hero/Data/HeroManager");
var ExclusiveEnhancement_1 = require("../../JsonData/ExclusiveEnhancement");
var PropManager_1 = require("../../Prop/PropManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ExclusiveEquipItem = /** @class */ (function (_super) {
    __extends(ExclusiveEquipItem, _super);
    function ExclusiveEquipItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExclusiveEquipItem.prototype.init = function (heroType) {
        // let data = HeroManager.getInstance().getHeroData(heroType);
        var PM = PropManager_1.PropManager.getInstance();
        var itemData = ExclusiveEnhancement_1.ExclusiveEnhancementManager.getInstance().getJsonByHeroTypeAndWeaponLevel(heroType, HeroManager_1.HeroManager.getInstance().getExclusiveEquipLevel(heroType));
        //框
        var bg = this.node.getChildByName('bg');
        bg.getComponent(cc.Sprite).spriteFrame = PM.getSpByName("Item_frame_" + itemData.Quality);
        //icon
        var icon = this.node.getChildByName("icon");
        icon.getComponent(cc.Sprite).spriteFrame = PM.getSpByName("Exclusive_Weapon_" + heroType + "_1");
        this.node.getChildByName("levelNum").getComponent(cc.Label).string = "+" + HeroManager_1.HeroManager.getInstance().getExclusiveEquipLevel(heroType);
    };
    ExclusiveEquipItem = __decorate([
        ccclass
    ], ExclusiveEquipItem);
    return ExclusiveEquipItem;
}(cc.Component));
exports.default = ExclusiveEquipItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcRXF1aXBtZW50XFxVaVxcRXhjbHVzaXZlRXF1aXBJdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDJEQUEwRDtBQUUxRCw0RUFBa0Y7QUFDbEYsc0RBQXFEO0FBRS9DLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQWdELHNDQUFZO0lBQTVEOztJQWlCQSxDQUFDO0lBZkcsaUNBQUksR0FBSixVQUFLLFFBQWtCO1FBRW5CLDhEQUE4RDtRQUM5RCxJQUFJLEVBQUUsR0FBQyx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2pDLElBQUksUUFBUSxHQUFHLGtEQUEyQixDQUFDLFdBQVcsRUFBRSxDQUFDLCtCQUErQixDQUFDLFFBQVEsRUFBQyx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLHNCQUFzQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDN0osR0FBRztRQUNILElBQUksRUFBRSxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RDLEVBQUUsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsR0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDekYsTUFBTTtRQUNOLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQzNDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLG1CQUFtQixHQUFHLFFBQVEsR0FBRyxJQUFJLENBQUMsQ0FBQztRQUVqRyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBRyxHQUFHLEdBQUcseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMxSSxDQUFDO0lBZmdCLGtCQUFrQjtRQUR0QyxPQUFPO09BQ2Esa0JBQWtCLENBaUJ0QztJQUFELHlCQUFDO0NBakJELEFBaUJDLENBakIrQyxFQUFFLENBQUMsU0FBUyxHQWlCM0Q7a0JBakJvQixrQkFBa0IiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIZXJvTWFuYWdlciB9IGZyb20gXCIuLi8uLi9IZXJvL0RhdGEvSGVyb01hbmFnZXJcIjtcclxuaW1wb3J0IHsgSGVyb19UeXBlIH0gZnJvbSBcIi4uLy4uL0hlcm8vR2FtZS9IZXJvQ29uZmlnXCI7XHJcbmltcG9ydCB7IEV4Y2x1c2l2ZUVuaGFuY2VtZW50TWFuYWdlciB9IGZyb20gXCIuLi8uLi9Kc29uRGF0YS9FeGNsdXNpdmVFbmhhbmNlbWVudFwiO1xyXG5pbXBvcnQgeyBQcm9wTWFuYWdlciB9IGZyb20gXCIuLi8uLi9Qcm9wL1Byb3BNYW5hZ2VyXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV4Y2x1c2l2ZUVxdWlwSXRlbSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgaW5pdChoZXJvVHlwZTpIZXJvX1R5cGUpe1xyXG5cclxuICAgICAgICAvLyBsZXQgZGF0YSA9IEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb0RhdGEoaGVyb1R5cGUpO1xyXG4gICAgICAgIGxldCBQTT1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIGxldCBpdGVtRGF0YSA9IEV4Y2x1c2l2ZUVuaGFuY2VtZW50TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25CeUhlcm9UeXBlQW5kV2VhcG9uTGV2ZWwoaGVyb1R5cGUsSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRFeGNsdXNpdmVFcXVpcExldmVsKGhlcm9UeXBlKSk7XHJcbiAgICAgICAgIC8v5qGGXHJcbiAgICAgICAgIGxldCBiZz10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2JnJyk7XHJcbiAgICAgICAgIGJnLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lPVBNLmdldFNwQnlOYW1lKFwiSXRlbV9mcmFtZV9cIiArIGl0ZW1EYXRhLlF1YWxpdHkpO1xyXG4gICAgICAgIC8vaWNvblxyXG4gICAgICAgIGxldCBpY29uID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiaWNvblwiKVxyXG4gICAgICAgIGljb24uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBQTS5nZXRTcEJ5TmFtZShcIkV4Y2x1c2l2ZV9XZWFwb25fXCIgKyBoZXJvVHlwZSArIFwiXzFcIik7XHJcblxyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImxldmVsTnVtXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCIrXCIgKyBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEV4Y2x1c2l2ZUVxdWlwTGV2ZWwoaGVyb1R5cGUpO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=