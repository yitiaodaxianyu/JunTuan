
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Hero/Ui/BtnHero.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '53736roQM5OJI/Q0WS2gY74', 'BtnHero');
// Scripts/Hero/Ui/BtnHero.ts

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
var HeroConfig_1 = require("../Game/HeroConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BtnHero = /** @class */ (function (_super) {
    __extends(BtnHero, _super);
    function BtnHero() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hero_id = HeroConfig_1.Hero_Type.NULL;
        _this.icon = null;
        _this.team_index = 0;
        return _this;
    }
    BtnHero.prototype.init = function (heroId) {
        this.hero_id = heroId;
        this.icon = this.node.getChildByName("iconMask");
        this.icon.active = true;
        this.icon.getChildByName('icon').getComponent(cc.Sprite).spriteFrame = HeroManager_1.HeroManager.getInstance().getSpriteFrameByName('hero' + heroId);
        // let type = this.node.getChildByName("type");
        // type.active = true;
        // type.getComponent(cc.Sprite).spriteFrame = HeroManager.getInstance().getSpriteFrameByName("Hero_Type_" + HeroBaseInfoManager.getInstance().getHeroType(heroId));
        // console.log(type.getComponent(cc.Sprite).spriteFrame)
        var levelLabel = this.node.getChildByName("levelLabel");
        levelLabel.active = true;
        levelLabel.getComponent(cc.Label).string = "" + HeroManager_1.HeroManager.getInstance().getHeroLevel(heroId);
    };
    BtnHero.prototype.showSelect = function () {
        this.node.getChildByName("select").active = true;
    };
    BtnHero.prototype.hideSelect = function () {
        this.node.getChildByName("select").active = false;
    };
    __decorate([
        property()
    ], BtnHero.prototype, "team_index", void 0);
    BtnHero = __decorate([
        ccclass
    ], BtnHero);
    return BtnHero;
}(cc.Component));
exports.default = BtnHero;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcVWlcXEJ0bkhlcm8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsMkRBQTBEO0FBQzFELGlEQUErQztBQUl6QyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUFxQywyQkFBWTtJQUFqRDtRQUFBLHFFQThCQztRQTVCRyxhQUFPLEdBQWMsc0JBQVMsQ0FBQyxJQUFJLENBQUM7UUFDcEMsVUFBSSxHQUFTLElBQUksQ0FBQztRQUdsQixnQkFBVSxHQUFRLENBQUMsQ0FBQzs7SUF3QnhCLENBQUM7SUF0Qkcsc0JBQUksR0FBSixVQUFLLE1BQWlCO1FBQ2xCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxHQUFHLHlCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsb0JBQW9CLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZJLCtDQUErQztRQUMvQyxzQkFBc0I7UUFDdEIsbUtBQW1LO1FBQ25LLHdEQUF3RDtRQUN4RCxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN4RCxVQUFVLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUN6QixVQUFVLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUcsRUFBRSxHQUFHLHlCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ25HLENBQUM7SUFFRCw0QkFBVSxHQUFWO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztJQUNyRCxDQUFDO0lBRUQsNEJBQVUsR0FBVjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDdEQsQ0FBQztJQXRCRDtRQURDLFFBQVEsRUFBRTsrQ0FDUztJQU5ILE9BQU87UUFEM0IsT0FBTztPQUNhLE9BQU8sQ0E4QjNCO0lBQUQsY0FBQztDQTlCRCxBQThCQyxDQTlCb0MsRUFBRSxDQUFDLFNBQVMsR0E4QmhEO2tCQTlCb0IsT0FBTyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgeyBIZXJvTWFuYWdlciB9IGZyb20gXCIuLi8uLi9IZXJvL0RhdGEvSGVyb01hbmFnZXJcIjtcclxuaW1wb3J0IHsgSGVyb19UeXBlIH0gZnJvbSBcIi4uL0dhbWUvSGVyb0NvbmZpZ1wiO1xyXG5cclxuXHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnRuSGVybyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgaGVyb19pZDogSGVyb19UeXBlID0gSGVyb19UeXBlLk5VTEw7XHJcbiAgICBpY29uOmNjLk5vZGU9bnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoKVxyXG4gICAgdGVhbV9pbmRleDpudW1iZXI9MDtcclxuXHJcbiAgICBpbml0KGhlcm9JZDogSGVyb19UeXBlKSB7XHJcbiAgICAgICAgdGhpcy5oZXJvX2lkID0gaGVyb0lkO1xyXG4gICAgICAgIHRoaXMuaWNvbiA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImljb25NYXNrXCIpO1xyXG4gICAgICAgIHRoaXMuaWNvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuaWNvbi5nZXRDaGlsZEJ5TmFtZSgnaWNvbicpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTcHJpdGVGcmFtZUJ5TmFtZSgnaGVybycgKyBoZXJvSWQpO1xyXG4gICAgICAgIC8vIGxldCB0eXBlID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwidHlwZVwiKTtcclxuICAgICAgICAvLyB0eXBlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgLy8gdHlwZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3ByaXRlRnJhbWVCeU5hbWUoXCJIZXJvX1R5cGVfXCIgKyBIZXJvQmFzZUluZm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb1R5cGUoaGVyb0lkKSk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2codHlwZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSlcclxuICAgICAgICBsZXQgbGV2ZWxMYWJlbCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImxldmVsTGFiZWxcIik7XHJcbiAgICAgICAgbGV2ZWxMYWJlbC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGxldmVsTGFiZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIlwiICsgSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvTGV2ZWwoaGVyb0lkKTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93U2VsZWN0KCl7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwic2VsZWN0XCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgaGlkZVNlbGVjdCgpe1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInNlbGVjdFwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19