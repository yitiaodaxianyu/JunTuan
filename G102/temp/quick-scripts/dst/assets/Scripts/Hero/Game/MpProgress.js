
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Hero/Game/MpProgress.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '40e49nas1NKeJTOBNrmYG2d', 'MpProgress');
// Scripts/Hero/Game/MpProgress.ts

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
var SkillManager_1 = require("../../Game/SkillManager");
var HeroManager_1 = require("../Data/HeroManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MpProgress = /** @class */ (function (_super) {
    __extends(MpProgress, _super);
    function MpProgress() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sp_icon_bg = [];
        _this.prefab_bg = null;
        _this.ok_node = null;
        _this.left = null;
        _this.right = null;
        _this.is_cding = false;
        _this.icon = null;
        _this.icon_bg = null;
        /**禁止图标 */
        _this.disable = null;
        _this.is_disable = false;
        /**材质 */
        _this.materials = [];
        return _this;
    }
    MpProgress.prototype.init = function (heroId) {
        this.ok_node = this.node.getChildByName('ok');
        this.left = this.node.getChildByName('left').getComponent(cc.Sprite);
        this.right = this.node.getChildByName('right').getComponent(cc.Sprite);
        var iconBg = cc.instantiate(this.prefab_bg);
        iconBg.x = this.node.x;
        iconBg.y = this.node.y - 36;
        SkillManager_1.default.getInstance().node.getChildByName('skill_icon').addChild(iconBg);
        this.icon_bg = iconBg.getComponent(cc.Sprite);
        //icon
        this.icon = iconBg.getChildByName('mask').getChildByName('icon').getComponent(cc.Sprite);
        this.icon.spriteFrame = HeroManager_1.HeroManager.getInstance().getSpriteFrameByNames('Hero_' + heroId + '_Skill_0');
        this.disable = this.icon.node.parent.getChildByName('disable');
        this.disable.active = false;
        this.setNormalSP();
        this.materials.push(cc.Material.getBuiltinMaterial('2d-gray-sprite'));
        this.materials.push(cc.Material.getBuiltinMaterial('2d-sprite'));
        //this.prefab_bg=null;
    };
    // showLight(){
    // }
    MpProgress.prototype.setCDSP = function () {
        this.ok_node.active = false;
        this.is_cding = true;
        this.icon.setMaterial(0, this.materials[0]);
        this.icon_bg.spriteFrame = this.sp_icon_bg[0];
    };
    MpProgress.prototype.setNormalSP = function () {
        this.ok_node.active = true;
        this.is_cding = false;
        if (this.is_disable == false) {
            this.icon.setMaterial(0, this.materials[1]);
            this.icon_bg.spriteFrame = this.sp_icon_bg[1];
        }
    };
    MpProgress.prototype.setDisable = function (isDisable) {
        this.disable.active = isDisable;
        this.is_disable = isDisable;
        if (isDisable) {
            this.icon.setMaterial(0, this.materials[0]);
            this.icon_bg.spriteFrame = this.sp_icon_bg[0];
        }
        else {
            if (this.is_cding == false) {
                this.icon.setMaterial(0, this.materials[1]);
                this.icon_bg.spriteFrame = this.sp_icon_bg[1];
            }
        }
    };
    MpProgress.prototype.setProgress = function (progress) {
        this.left.fillRange = progress / 2;
        this.right.fillRange = progress / 2;
    };
    MpProgress.prototype.show = function () {
        this.icon_bg.node.active = true;
        this.node.opacity = 255;
    };
    MpProgress.prototype.hide = function () {
        this.icon_bg.node.active = false;
        this.node.opacity = 0;
    };
    __decorate([
        property([cc.SpriteFrame])
    ], MpProgress.prototype, "sp_icon_bg", void 0);
    __decorate([
        property(cc.Prefab)
    ], MpProgress.prototype, "prefab_bg", void 0);
    MpProgress = __decorate([
        ccclass
    ], MpProgress);
    return MpProgress;
}(cc.Component));
exports.default = MpProgress;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcR2FtZVxcTXBQcm9ncmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx3REFBbUQ7QUFDbkQsbURBQWtEO0FBSzVDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXdDLDhCQUFZO0lBQXBEO1FBQUEscUVBOEZDO1FBM0ZHLGdCQUFVLEdBQWtCLEVBQUUsQ0FBQztRQUcvQixlQUFTLEdBQVcsSUFBSSxDQUFDO1FBRXpCLGFBQU8sR0FBUyxJQUFJLENBQUM7UUFDckIsVUFBSSxHQUFXLElBQUksQ0FBQztRQUNwQixXQUFLLEdBQVcsSUFBSSxDQUFDO1FBQ3JCLGNBQVEsR0FBUyxLQUFLLENBQUM7UUFDdkIsVUFBSSxHQUFXLElBQUksQ0FBQztRQUNwQixhQUFPLEdBQVcsSUFBSSxDQUFDO1FBQ3ZCLFVBQVU7UUFDVixhQUFPLEdBQVMsSUFBSSxDQUFDO1FBQ3JCLGdCQUFVLEdBQVMsS0FBSyxDQUFDO1FBQ3pCLFFBQVE7UUFDUixlQUFTLEdBQWUsRUFBRSxDQUFDOztJQTRFL0IsQ0FBQztJQXpFRyx5QkFBSSxHQUFKLFVBQUssTUFBZ0I7UUFFakIsSUFBSSxDQUFDLE9BQU8sR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsSUFBSSxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbkUsSUFBSSxDQUFDLEtBQUssR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3JFLElB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IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTa2lsbE1hbmFnZXIgZnJvbSBcIi4uLy4uL0dhbWUvU2tpbGxNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEhlcm9NYW5hZ2VyIH0gZnJvbSBcIi4uL0RhdGEvSGVyb01hbmFnZXJcIjtcclxuaW1wb3J0IHsgSGVyb19UeXBlIH0gZnJvbSBcIi4vSGVyb0NvbmZpZ1wiO1xyXG5cclxuXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1wUHJvZ3Jlc3MgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShbY2MuU3ByaXRlRnJhbWVdKVxyXG4gICAgc3BfaWNvbl9iZzpjYy5TcHJpdGVGcmFtZVtdPVtdO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICBwcmVmYWJfYmc6Y2MuUHJlZmFiPW51bGw7XHJcblxyXG4gICAgb2tfbm9kZTpjYy5Ob2RlPW51bGw7XHJcbiAgICBsZWZ0OmNjLlNwcml0ZT1udWxsO1xyXG4gICAgcmlnaHQ6Y2MuU3ByaXRlPW51bGw7XHJcbiAgICBpc19jZGluZzpib29sZWFuPWZhbHNlO1xyXG4gICAgaWNvbjpjYy5TcHJpdGU9bnVsbDtcclxuICAgIGljb25fYmc6Y2MuU3ByaXRlPW51bGw7XHJcbiAgICAvKirnpoHmraLlm77moIcgKi9cclxuICAgIGRpc2FibGU6Y2MuTm9kZT1udWxsO1xyXG4gICAgaXNfZGlzYWJsZTpib29sZWFuPWZhbHNlO1xyXG4gICAgLyoq5p2Q6LSoICovXHJcbiAgICBtYXRlcmlhbHM6Y2MuTWF0ZXJpYWxbXT1bXTtcclxuICAgIFxyXG5cclxuICAgIGluaXQoaGVyb0lkOkhlcm9fVHlwZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLm9rX25vZGU9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdvaycpO1xyXG4gICAgICAgIHRoaXMubGVmdD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2xlZnQnKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcclxuICAgICAgICB0aGlzLnJpZ2h0PXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgncmlnaHQnKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcclxuICAgICAgICBsZXQgaWNvbkJnPWNjLmluc3RhbnRpYXRlKHRoaXMucHJlZmFiX2JnKTtcclxuICAgICAgICBpY29uQmcueD10aGlzLm5vZGUueDtcclxuICAgICAgICBpY29uQmcueT10aGlzLm5vZGUueS0zNjtcclxuICAgICAgICBTa2lsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5ub2RlLmdldENoaWxkQnlOYW1lKCdza2lsbF9pY29uJykuYWRkQ2hpbGQoaWNvbkJnKTtcclxuICAgICAgICB0aGlzLmljb25fYmc9aWNvbkJnLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG4gICAgICAgIC8vaWNvblxyXG4gICAgICAgIHRoaXMuaWNvbj1pY29uQmcuZ2V0Q2hpbGRCeU5hbWUoJ21hc2snKS5nZXRDaGlsZEJ5TmFtZSgnaWNvbicpLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG4gICAgICAgIHRoaXMuaWNvbi5zcHJpdGVGcmFtZT1IZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNwcml0ZUZyYW1lQnlOYW1lcygnSGVyb18nK2hlcm9JZCsnX1NraWxsXzAnKTtcclxuICAgICAgICB0aGlzLmRpc2FibGU9dGhpcy5pY29uLm5vZGUucGFyZW50LmdldENoaWxkQnlOYW1lKCdkaXNhYmxlJyk7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICB0aGlzLnNldE5vcm1hbFNQKCk7XHJcbiAgICAgICAgdGhpcy5tYXRlcmlhbHMucHVzaChjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoJzJkLWdyYXktc3ByaXRlJykpXHJcbiAgICAgICAgdGhpcy5tYXRlcmlhbHMucHVzaChjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoJzJkLXNwcml0ZScpKVxyXG4gICAgICAgIC8vdGhpcy5wcmVmYWJfYmc9bnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBzaG93TGlnaHQoKXtcclxuICAgICAgICBcclxuICAgIC8vIH1cclxuICAgIFxyXG4gICAgc2V0Q0RTUCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5va19ub2RlLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICB0aGlzLmlzX2NkaW5nPXRydWU7XHJcbiAgICAgICAgdGhpcy5pY29uLnNldE1hdGVyaWFsKDAsdGhpcy5tYXRlcmlhbHNbMF0pO1xyXG4gICAgICAgIHRoaXMuaWNvbl9iZy5zcHJpdGVGcmFtZT10aGlzLnNwX2ljb25fYmdbMF07XHJcbiAgICB9XHJcblxyXG4gICAgc2V0Tm9ybWFsU1AoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMub2tfbm9kZS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICB0aGlzLmlzX2NkaW5nPWZhbHNlO1xyXG4gICAgICAgIGlmKHRoaXMuaXNfZGlzYWJsZT09ZmFsc2Upe1xyXG4gICAgICAgICAgICB0aGlzLmljb24uc2V0TWF0ZXJpYWwoMCx0aGlzLm1hdGVyaWFsc1sxXSk7XHJcbiAgICAgICAgICAgIHRoaXMuaWNvbl9iZy5zcHJpdGVGcmFtZT10aGlzLnNwX2ljb25fYmdbMV07XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgc2V0RGlzYWJsZShpc0Rpc2FibGU6Ym9vbGVhbil7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlLmFjdGl2ZT1pc0Rpc2FibGU7XHJcbiAgICAgICAgdGhpcy5pc19kaXNhYmxlPWlzRGlzYWJsZTtcclxuICAgICAgICBpZihpc0Rpc2FibGUpe1xyXG4gICAgICAgICAgICB0aGlzLmljb24uc2V0TWF0ZXJpYWwoMCx0aGlzLm1hdGVyaWFsc1swXSk7XHJcbiAgICAgICAgICAgIHRoaXMuaWNvbl9iZy5zcHJpdGVGcmFtZT10aGlzLnNwX2ljb25fYmdbMF07XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuaXNfY2Rpbmc9PWZhbHNlKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuaWNvbi5zZXRNYXRlcmlhbCgwLHRoaXMubWF0ZXJpYWxzWzFdKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaWNvbl9iZy5zcHJpdGVGcmFtZT10aGlzLnNwX2ljb25fYmdbMV07XHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0UHJvZ3Jlc3MocHJvZ3Jlc3M6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubGVmdC5maWxsUmFuZ2U9cHJvZ3Jlc3MvMjtcclxuICAgICAgICB0aGlzLnJpZ2h0LmZpbGxSYW5nZT1wcm9ncmVzcy8yO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3coKXtcclxuICAgICAgICB0aGlzLmljb25fYmcubm9kZS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICB0aGlzLm5vZGUub3BhY2l0eT0yNTU7XHJcbiAgICB9XHJcblxyXG4gICAgaGlkZSgpe1xyXG4gICAgICAgIHRoaXMuaWNvbl9iZy5ub2RlLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICB0aGlzLm5vZGUub3BhY2l0eT0wO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=