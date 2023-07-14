
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/UI/home/SkillInfoUi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6f57bxOo4RJf43fCudxAPq2', 'SkillInfoUi');
// Scripts/UI/home/SkillInfoUi.ts

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
var LanguageManager_1 = require("../../multiLanguage/LanguageManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SkillInfoUi = /** @class */ (function (_super) {
    __extends(SkillInfoUi, _super);
    function SkillInfoUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sp_avatar = [];
        return _this;
        // update (dt) {}
    }
    SkillInfoUi.prototype.start = function () {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    };
    SkillInfoUi.prototype.init = function (heroType) {
        var lm = LanguageManager_1.default.getInstance();
        var lanType = lm.getCurLanguageType();
        var textRoot = this.node.getChildByName('textRoot');
        var avaIcon = textRoot.getChildByName('avaIcon');
        avaIcon.getComponent(cc.Sprite).spriteFrame = this.sp_avatar[heroType];
        var name = avaIcon.getChildByName('name');
        //name.getComponent(cc.Label).string=HerosDetails.getHeroName(heroType,lanType);
        var skillName = textRoot.getChildByName('skillName');
        //skillName.getComponent(cc.Label).string=lm.getString(LanguageIndex.Active_Skill)+':'+HerosDetails.getSkillName(heroType,lanType);
        var skillDes = textRoot.getChildByName('skillDes');
        //skillDes.getComponent(cc.Label).string=HerosDetails.getHeroSkillDetail(heroType,lanType);
        //        
    };
    SkillInfoUi.prototype.onTouchStart = function () {
        this.node.removeFromParent();
    };
    SkillInfoUi.prototype.onDestroy = function () {
        this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    };
    __decorate([
        property([cc.SpriteFrame])
    ], SkillInfoUi.prototype, "sp_avatar", void 0);
    SkillInfoUi = __decorate([
        ccclass
    ], SkillInfoUi);
    return SkillInfoUi;
}(cc.Component));
exports.default = SkillInfoUi;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVUlcXGhvbWVcXFNraWxsSW5mb1VpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLHVFQUFrRTtBQUU1RCxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUF5QywrQkFBWTtJQUFyRDtRQUFBLHFFQXNDQztRQW5DRyxlQUFTLEdBQWtCLEVBQUUsQ0FBQzs7UUFrQzlCLGlCQUFpQjtJQUNyQixDQUFDO0lBakNHLDJCQUFLLEdBQUw7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUMsSUFBSSxDQUFDLFlBQVksRUFBQyxJQUFJLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBRUQsMEJBQUksR0FBSixVQUFLLFFBQWtCO1FBRW5CLElBQUksRUFBRSxHQUFDLHlCQUFlLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDckMsSUFBSSxPQUFPLEdBQUMsRUFBRSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDcEMsSUFBSSxRQUFRLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFbEQsSUFBSSxPQUFPLEdBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMvQyxPQUFPLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLEdBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNyRSxJQUFJLElBQUksR0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3hDLGdGQUFnRjtRQUVoRixJQUFJLFNBQVMsR0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ25ELG1JQUFtSTtRQUVuSSxJQUFJLFFBQVEsR0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2pELDJGQUEyRjtRQUMzRixVQUFVO0lBRWQsQ0FBQztJQUVELGtDQUFZLEdBQVo7UUFFSSxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDakMsQ0FBQztJQUVELCtCQUFTLEdBQVQ7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUMsSUFBSSxDQUFDLFlBQVksRUFBQyxJQUFJLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBakNEO1FBREMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2tEQUNHO0lBSGIsV0FBVztRQUQvQixPQUFPO09BQ2EsV0FBVyxDQXNDL0I7SUFBRCxrQkFBQztDQXRDRCxBQXNDQyxDQXRDd0MsRUFBRSxDQUFDLFNBQVMsR0FzQ3BEO2tCQXRDb0IsV0FBVyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgeyBIZXJvX1R5cGUgfSBmcm9tIFwiLi4vLi4vSGVyby9HYW1lL0hlcm9Db25maWdcIjtcclxuaW1wb3J0IExhbmd1YWdlTWFuYWdlciBmcm9tIFwiLi4vLi4vbXVsdGlMYW5ndWFnZS9MYW5ndWFnZU1hbmFnZXJcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2tpbGxJbmZvVWkgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShbY2MuU3ByaXRlRnJhbWVdKVxyXG4gICAgc3BfYXZhdGFyOmNjLlNwcml0ZUZyYW1lW109W107XHJcbiAgICBcclxuICAgIHN0YXJ0ICgpIHtcclxuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsdGhpcy5vblRvdWNoU3RhcnQsdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdChoZXJvVHlwZTpIZXJvX1R5cGUpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGxtPUxhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIGxldCBsYW5UeXBlPWxtLmdldEN1ckxhbmd1YWdlVHlwZSgpO1xyXG4gICAgICAgIGxldCB0ZXh0Um9vdD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3RleHRSb290Jyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGF2YUljb249dGV4dFJvb3QuZ2V0Q2hpbGRCeU5hbWUoJ2F2YUljb24nKTtcclxuICAgICAgICBhdmFJY29uLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lPXRoaXMuc3BfYXZhdGFyW2hlcm9UeXBlXTtcclxuICAgICAgICBsZXQgbmFtZT1hdmFJY29uLmdldENoaWxkQnlOYW1lKCduYW1lJyk7XHJcbiAgICAgICAgLy9uYW1lLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPUhlcm9zRGV0YWlscy5nZXRIZXJvTmFtZShoZXJvVHlwZSxsYW5UeXBlKTtcclxuICAgICAgICAgICAgIFxyXG4gICAgICAgIGxldCBza2lsbE5hbWU9dGV4dFJvb3QuZ2V0Q2hpbGRCeU5hbWUoJ3NraWxsTmFtZScpO1xyXG4gICAgICAgIC8vc2tpbGxOYW1lLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPWxtLmdldFN0cmluZyhMYW5ndWFnZUluZGV4LkFjdGl2ZV9Ta2lsbCkrJzonK0hlcm9zRGV0YWlscy5nZXRTa2lsbE5hbWUoaGVyb1R5cGUsbGFuVHlwZSk7XHJcblxyXG4gICAgICAgIGxldCBza2lsbERlcz10ZXh0Um9vdC5nZXRDaGlsZEJ5TmFtZSgnc2tpbGxEZXMnKTtcclxuICAgICAgICAvL3NraWxsRGVzLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPUhlcm9zRGV0YWlscy5nZXRIZXJvU2tpbGxEZXRhaWwoaGVyb1R5cGUsbGFuVHlwZSk7XHJcbiAgICAgICAgLy8gICAgICAgIFxyXG5cclxuICAgIH1cclxuXHJcbiAgICBvblRvdWNoU3RhcnQoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubm9kZS5yZW1vdmVGcm9tUGFyZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25EZXN0cm95KCl7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCx0aGlzLm9uVG91Y2hTdGFydCx0aGlzKTtcclxuICAgIH1cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XHJcbn1cclxuIl19