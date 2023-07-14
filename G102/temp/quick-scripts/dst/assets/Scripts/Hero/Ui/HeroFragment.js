
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Hero/Ui/HeroFragment.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b1e7dCzKSpCP6HW8b0tA/TS', 'HeroFragment');
// Scripts/Hero/Ui/HeroFragment.ts

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
var HeroManager_1 = require("../Data/HeroManager");
var HeroConfig_1 = require("../Game/HeroConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var HeroFragment = /** @class */ (function (_super) {
    __extends(HeroFragment, _super);
    function HeroFragment() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hero_type = HeroConfig_1.Hero_Type.NULL;
        _this.fragment_num = 0;
        return _this;
    }
    HeroFragment.prototype.init = function (heroType, num) {
        this.hero_type = heroType;
        this.fragment_num = num;
        this.refreshData();
    };
    HeroFragment.prototype.refreshData = function () {
        var icon = this.node.getChildByName('mask').getChildByName('icon');
        icon.getComponent(cc.Sprite).spriteFrame = HeroManager_1.HeroManager.getInstance().getSpriteFrameByName('hero' + this.hero_type);
        var num = this.node.getChildByName('num');
        num.getComponent(cc.Label).string = "" + this.fragment_num;
        this.node.name = 'fragment';
        if (this.hero_type == HeroConfig_1.Hero_Type.NULL) {
            icon.y = 26;
        }
        else {
            icon.y = 38;
        }
    };
    HeroFragment = __decorate([
        ccclass
    ], HeroFragment);
    return HeroFragment;
}(cc.Component));
exports.default = HeroFragment;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcVWlcXEhlcm9GcmFnbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtREFBa0Q7QUFDbEQsaURBQStDO0FBR3pDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQTBDLGdDQUFZO0lBQXREO1FBQUEscUVBdUJDO1FBckJHLGVBQVMsR0FBVyxzQkFBUyxDQUFDLElBQUksQ0FBQztRQUNuQyxrQkFBWSxHQUFRLENBQUMsQ0FBQzs7SUFvQjFCLENBQUM7SUFsQkcsMkJBQUksR0FBSixVQUFNLFFBQWtCLEVBQUMsR0FBVTtRQUMvQixJQUFJLENBQUMsU0FBUyxHQUFDLFFBQVEsQ0FBQztRQUN4QixJQUFJLENBQUMsWUFBWSxHQUFDLEdBQUcsQ0FBQztRQUN0QixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVELGtDQUFXLEdBQVg7UUFDSSxJQUFJLElBQUksR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDakUsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxHQUFDLHlCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsb0JBQW9CLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMvRyxJQUFJLEdBQUcsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4QyxHQUFHLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUMsRUFBRSxHQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDdkQsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUMsVUFBVSxDQUFDO1FBQzFCLElBQUcsSUFBSSxDQUFDLFNBQVMsSUFBRSxzQkFBUyxDQUFDLElBQUksRUFBQztZQUM5QixJQUFJLENBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQztTQUNiO2FBQUk7WUFDRCxJQUFJLENBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQztTQUNiO0lBQ0wsQ0FBQztJQXRCZ0IsWUFBWTtRQURoQyxPQUFPO09BQ2EsWUFBWSxDQXVCaEM7SUFBRCxtQkFBQztDQXZCRCxBQXVCQyxDQXZCeUMsRUFBRSxDQUFDLFNBQVMsR0F1QnJEO2tCQXZCb0IsWUFBWSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEhlcm9NYW5hZ2VyIH0gZnJvbSBcIi4uL0RhdGEvSGVyb01hbmFnZXJcIjtcclxuaW1wb3J0IHsgSGVyb19UeXBlIH0gZnJvbSBcIi4uL0dhbWUvSGVyb0NvbmZpZ1wiO1xyXG5cclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGVyb0ZyYWdtZW50IGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBoZXJvX3R5cGU6SGVyb19UeXBlPUhlcm9fVHlwZS5OVUxMO1xyXG4gICAgZnJhZ21lbnRfbnVtOm51bWJlcj0wO1xyXG4gICAgXHJcbiAgICBpbml0IChoZXJvVHlwZTpIZXJvX1R5cGUsbnVtOm51bWJlcikge1xyXG4gICAgICAgIHRoaXMuaGVyb190eXBlPWhlcm9UeXBlO1xyXG4gICAgICAgIHRoaXMuZnJhZ21lbnRfbnVtPW51bTtcclxuICAgICAgICB0aGlzLnJlZnJlc2hEYXRhKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVmcmVzaERhdGEoKXtcclxuICAgICAgICBsZXQgaWNvbj10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ21hc2snKS5nZXRDaGlsZEJ5TmFtZSgnaWNvbicpO1xyXG4gICAgICAgIGljb24uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWU9SGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTcHJpdGVGcmFtZUJ5TmFtZSgnaGVybycrdGhpcy5oZXJvX3R5cGUpO1xyXG4gICAgICAgIGxldCBudW09dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdudW0nKTtcclxuICAgICAgICBudW0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9XCJcIit0aGlzLmZyYWdtZW50X251bTtcclxuICAgICAgICB0aGlzLm5vZGUubmFtZT0nZnJhZ21lbnQnO1xyXG4gICAgICAgIGlmKHRoaXMuaGVyb190eXBlPT1IZXJvX1R5cGUuTlVMTCl7XHJcbiAgICAgICAgICAgIGljb24ueT0yNjtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgaWNvbi55PTM4O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=