
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Maze/MazePetItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8977bSxzoRLzJe8Vn5vr8/E', 'MazePetItem');
// Scripts/Maze/MazePetItem.ts

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
var MazePetItem = /** @class */ (function (_super) {
    __extends(MazePetItem, _super);
    function MazePetItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.index = 0;
        _this.lease_ts = null;
        return _this;
    }
    MazePetItem.prototype.init = function (petInfo, index, ts) {
        this.lease_ts = ts;
        this.index = index;
        // let SMM=SpiritQualityMessageManager.getInstance();
        var iconRoot = this.node.getChildByName('iconMask');
        //图标
        var iconSp = iconRoot.getChildByName('icon').getComponent(cc.Sprite);
        // iconSp.spriteFrame=PetManager.getInstance().getSpriteFrameByName('Sprite_Avatar_' + petInfo.pet_id);
        //框
        // let quality=SMM.getSpiritQualityframe(petInfo.pet_quality)
        // this.node.getComponent(cc.Sprite).spriteFrame = PetManager.getInstance().getSpriteFrameByName("Prepare_Quality_" + quality);
        var starSp = iconRoot.getChildByName("star").getComponent(cc.Sprite);
        // starSp.spriteFrame = PetManager.getInstance().getSpriteFrameByName("Prepare_Star_" + SMM.getSpiritQualityStar(petInfo.pet_quality));
        var levelLabel = this.node.getChildByName("levelLabel");
        levelLabel.getComponent(cc.Label).string = "" + petInfo.pet_level;
        this.node.getChildByName('gou').active = false;
    };
    MazePetItem.prototype.refresh = function (isShow) {
        this.node.getChildByName('gou').active = isShow;
    };
    MazePetItem.prototype.onClick = function () {
        this.lease_ts.clickBtnItem(this.index);
    };
    MazePetItem = __decorate([
        ccclass
    ], MazePetItem);
    return MazePetItem;
}(cc.Component));
exports.default = MazePetItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTWF6ZVxcTWF6ZVBldEl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBTU0sSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBeUMsK0JBQVk7SUFBckQ7UUFBQSxxRUE4QkM7UUE1QkcsV0FBSyxHQUFRLENBQUMsQ0FBQztRQUNmLGNBQVEsR0FBYSxJQUFJLENBQUM7O0lBMkI5QixDQUFDO0lBekJHLDBCQUFJLEdBQUosVUFBTSxPQUFlLEVBQUMsS0FBWSxFQUFDLEVBQWM7UUFDN0MsSUFBSSxDQUFDLFFBQVEsR0FBQyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLEtBQUssR0FBQyxLQUFLLENBQUM7UUFDakIscURBQXFEO1FBQ3JELElBQUksUUFBUSxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2xELElBQUk7UUFDSixJQUFJLE1BQU0sR0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbkUsdUdBQXVHO1FBQ3ZHLEdBQUc7UUFDSCw2REFBNkQ7UUFDN0QsK0hBQStIO1FBQy9ILElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNyRSx1SUFBdUk7UUFDdkksSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDeEQsVUFBVSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxHQUFHLEVBQUUsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDO1FBQ2xFLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBQyxLQUFLLENBQUM7SUFDakQsQ0FBQztJQUVELDZCQUFPLEdBQVAsVUFBUSxNQUFjO1FBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBQyxNQUFNLENBQUM7SUFDbEQsQ0FBQztJQUVELDZCQUFPLEdBQVA7UUFDSSxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQTdCZ0IsV0FBVztRQUQvQixPQUFPO09BQ2EsV0FBVyxDQThCL0I7SUFBRCxrQkFBQztDQTlCRCxBQThCQyxDQTlCd0MsRUFBRSxDQUFDLFNBQVMsR0E4QnBEO2tCQTlCb0IsV0FBVyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCB7IFNwaXJpdFF1YWxpdHlNZXNzYWdlTWFuYWdlciB9IGZyb20gXCIuLi9QZXQvRGF0YS9TcGlyaXRRdWFsaXR5TWVzc2FnZVwiO1xyXG5pbXBvcnQgeyBQZXRJbmZvIH0gZnJvbSBcIi4uL1BldC9QZXRDb25maWdcIjtcclxuaW1wb3J0IHsgUGV0TWFuYWdlciB9IGZyb20gXCIuLi9QZXQvUGV0TWFuYWdlclwiO1xyXG5pbXBvcnQgTWF6ZUxlYXNlVWkgZnJvbSBcIi4vTWF6ZUxlYXNlVWlcIjtcclxuXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hemVQZXRJdGVtIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBpbmRleDpudW1iZXI9MDtcclxuICAgIGxlYXNlX3RzOk1hemVMZWFzZVVpPW51bGw7XHJcblxyXG4gICAgaW5pdCAocGV0SW5mbzpQZXRJbmZvLGluZGV4Om51bWJlcix0czpNYXplTGVhc2VVaSkge1xyXG4gICAgICAgIHRoaXMubGVhc2VfdHM9dHM7XHJcbiAgICAgICAgdGhpcy5pbmRleD1pbmRleDtcclxuICAgICAgICAvLyBsZXQgU01NPVNwaXJpdFF1YWxpdHlNZXNzYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIGxldCBpY29uUm9vdD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2ljb25NYXNrJyk7XHJcbiAgICAgICAgLy/lm77moIdcclxuICAgICAgICBsZXQgaWNvblNwPWljb25Sb290LmdldENoaWxkQnlOYW1lKCdpY29uJykuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICAgICAgLy8gaWNvblNwLnNwcml0ZUZyYW1lPVBldE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTcHJpdGVGcmFtZUJ5TmFtZSgnU3ByaXRlX0F2YXRhcl8nICsgcGV0SW5mby5wZXRfaWQpO1xyXG4gICAgICAgIC8v5qGGXHJcbiAgICAgICAgLy8gbGV0IHF1YWxpdHk9U01NLmdldFNwaXJpdFF1YWxpdHlmcmFtZShwZXRJbmZvLnBldF9xdWFsaXR5KVxyXG4gICAgICAgIC8vIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IFBldE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTcHJpdGVGcmFtZUJ5TmFtZShcIlByZXBhcmVfUXVhbGl0eV9cIiArIHF1YWxpdHkpO1xyXG4gICAgICAgIGxldCBzdGFyU3AgPSBpY29uUm9vdC5nZXRDaGlsZEJ5TmFtZShcInN0YXJcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICAgICAgLy8gc3RhclNwLnNwcml0ZUZyYW1lID0gUGV0TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNwcml0ZUZyYW1lQnlOYW1lKFwiUHJlcGFyZV9TdGFyX1wiICsgU01NLmdldFNwaXJpdFF1YWxpdHlTdGFyKHBldEluZm8ucGV0X3F1YWxpdHkpKTtcclxuICAgICAgICBsZXQgbGV2ZWxMYWJlbCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImxldmVsTGFiZWxcIik7XHJcbiAgICAgICAgbGV2ZWxMYWJlbC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiXCIgKyBwZXRJbmZvLnBldF9sZXZlbDtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2dvdScpLmFjdGl2ZT1mYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICByZWZyZXNoKGlzU2hvdzpib29sZWFuKXtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2dvdScpLmFjdGl2ZT1pc1Nob3c7XHJcbiAgICB9XHJcblxyXG4gICAgb25DbGljaygpe1xyXG4gICAgICAgIHRoaXMubGVhc2VfdHMuY2xpY2tCdG5JdGVtKHRoaXMuaW5kZXgpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==