
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/UI/home/BtnTeam.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '195308e9YtMKLbhJayrK4f9', 'BtnTeam');
// Scripts/UI/home/BtnTeam.ts

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
var Constants_1 = require("../../Constants");
var GameManager_1 = require("../../GameManager");
var HeroManager_1 = require("../../Hero/Data/HeroManager");
var HeroConfig_1 = require("../../Hero/Game/HeroConfig");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var EventManager_1 = require("../../Tools/EventManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BtnTeam = /** @class */ (function (_super) {
    __extends(BtnTeam, _super);
    function BtnTeam() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.team_index = 0;
        _this.icon = null;
        return _this;
        // update (dt) {}
    }
    BtnTeam.prototype.onLoad = function () {
        this.icon = this.node.getChildByName('mask').getChildByName('icon');
        this.refreshData();
    };
    /**刷新通用数据 */
    BtnTeam.prototype.refreshData = function () {
        //获取需要设置的节点
        var iconSp = this.icon.getComponent(cc.Sprite);
        var plus = this.node.getChildByName('plus');
        //获取编队信息
        var teamList = HeroManager_1.HeroManager.getInstance().getTeamList(GameManager_1.default.getInstance().cur_game_mode);
        //只管刷新自己当前位置的信息
        var heroType = teamList[this.team_index];
        if (heroType > HeroConfig_1.Hero_Type.NULL) {
            this.icon.active = true;
            plus.active = false;
            iconSp.spriteFrame = HeroManager_1.HeroManager.getInstance().getSpriteFrameByName('hero' + heroType);
        }
        else {
            this.icon.active = false;
            plus.active = true;
        }
        if (GameManager_1.default.getInstance().cur_game_mode == Constants_1.GameMode.Main)
            EventManager_1.EventManager.postRedEvent(EventManager_1.RedEventString.RED_CHECK, EventManager_1.RedEventType.Btn_Map_Team_0 + this.team_index);
    };
    BtnTeam.prototype.clickSelf = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
    };
    __decorate([
        property()
    ], BtnTeam.prototype, "team_index", void 0);
    BtnTeam = __decorate([
        ccclass
    ], BtnTeam);
    return BtnTeam;
}(cc.Component));
exports.default = BtnTeam;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVUlcXGhvbWVcXEJ0blRlYW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQTJDO0FBQzNDLGlEQUE0QztBQUM1QywyREFBMEQ7QUFDMUQseURBQXVEO0FBQ3ZELDZEQUF3RDtBQUN4RCx5REFBc0Y7QUFHaEYsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBcUMsMkJBQVk7SUFBakQ7UUFBQSxxRUFzQ0M7UUFuQ0csZ0JBQVUsR0FBUSxDQUFDLENBQUM7UUFFcEIsVUFBSSxHQUFTLElBQUksQ0FBQzs7UUFnQ2xCLGlCQUFpQjtJQUNyQixDQUFDO0lBL0JhLHdCQUFNLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLElBQUksR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEUsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFDRCxZQUFZO0lBQ1osNkJBQVcsR0FBWDtRQUNJLFdBQVc7UUFFWCxJQUFJLE1BQU0sR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0MsSUFBSSxJQUFJLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUMsUUFBUTtRQUNSLElBQUksUUFBUSxHQUFDLHlCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDNUYsZUFBZTtRQUNmLElBQUksUUFBUSxHQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDdkMsSUFBRyxRQUFRLEdBQUMsc0JBQVMsQ0FBQyxJQUFJLEVBQUM7WUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxNQUFNLEdBQUMsS0FBSyxDQUFDO1lBQ2xCLE1BQU0sQ0FBQyxXQUFXLEdBQUMseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLEdBQUMsUUFBUSxDQUFDLENBQUM7U0FDdEY7YUFBSTtZQUNELElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFDLEtBQUssQ0FBQztZQUN2QixJQUFJLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQztTQUNwQjtRQUNELElBQUcscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLElBQUUsb0JBQVEsQ0FBQyxJQUFJO1lBQ3JELDJCQUFZLENBQUMsWUFBWSxDQUFDLDZCQUFjLENBQUMsU0FBUyxFQUFDLDJCQUFZLENBQUMsY0FBYyxHQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN4RyxDQUFDO0lBRUQsMkJBQVMsR0FBVDtRQUNJLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQywyQkFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRXhFLENBQUM7SUFqQ0Q7UUFEQyxRQUFRLEVBQUU7K0NBQ1M7SUFISCxPQUFPO1FBRDNCLE9BQU87T0FDYSxPQUFPLENBc0MzQjtJQUFELGNBQUM7Q0F0Q0QsQUFzQ0MsQ0F0Q29DLEVBQUUsQ0FBQyxTQUFTLEdBc0NoRDtrQkF0Q29CLE9BQU8iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHYW1lTW9kZSB9IGZyb20gXCIuLi8uLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi8uLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBIZXJvTWFuYWdlciB9IGZyb20gXCIuLi8uLi9IZXJvL0RhdGEvSGVyb01hbmFnZXJcIjtcclxuaW1wb3J0IHsgSGVyb19UeXBlIH0gZnJvbSBcIi4uLy4uL0hlcm8vR2FtZS9IZXJvQ29uZmlnXCI7XHJcbmltcG9ydCB7IFNvdW5kSW5kZXggfSBmcm9tIFwiLi4vLi4vU291bmQvQXVkaW9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgRXZlbnRNYW5hZ2VyLCBSZWRFdmVudFN0cmluZywgUmVkRXZlbnRUeXBlIH0gZnJvbSBcIi4uLy4uL1Rvb2xzL0V2ZW50TWFuYWdlclwiO1xyXG5cclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnRuVGVhbSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KClcclxuICAgIHRlYW1faW5kZXg6bnVtYmVyPTA7XHJcblxyXG4gICAgaWNvbjpjYy5Ob2RlPW51bGw7XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uTG9hZCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmljb249dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdtYXNrJykuZ2V0Q2hpbGRCeU5hbWUoJ2ljb24nKTtcclxuICAgICAgICB0aGlzLnJlZnJlc2hEYXRhKCk7XHJcbiAgICB9XHJcbiAgICAvKirliLfmlrDpgJrnlKjmlbDmja4gKi9cclxuICAgIHJlZnJlc2hEYXRhKCl7XHJcbiAgICAgICAgLy/ojrflj5bpnIDopoHorr7nva7nmoToioLngrlcclxuICAgICAgICBcclxuICAgICAgICBsZXQgaWNvblNwPXRoaXMuaWNvbi5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcclxuICAgICAgICBsZXQgcGx1cz10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3BsdXMnKTtcclxuICAgICAgICAvL+iOt+WPlue8lumYn+S/oeaBr1xyXG4gICAgICAgIGxldCB0ZWFtTGlzdD1IZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFRlYW1MaXN0KEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZSk7XHJcbiAgICAgICAgLy/lj6rnrqHliLfmlrDoh6rlt7HlvZPliY3kvY3nva7nmoTkv6Hmga9cclxuICAgICAgICBsZXQgaGVyb1R5cGU9dGVhbUxpc3RbdGhpcy50ZWFtX2luZGV4XTtcclxuICAgICAgICBpZihoZXJvVHlwZT5IZXJvX1R5cGUuTlVMTCl7XHJcbiAgICAgICAgICAgIHRoaXMuaWNvbi5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAgICAgcGx1cy5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgIGljb25TcC5zcHJpdGVGcmFtZT1IZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNwcml0ZUZyYW1lQnlOYW1lKCdoZXJvJytoZXJvVHlwZSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuaWNvbi5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgIHBsdXMuYWN0aXZlPXRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZT09R2FtZU1vZGUuTWFpbilcclxuICAgICAgICAgICAgRXZlbnRNYW5hZ2VyLnBvc3RSZWRFdmVudChSZWRFdmVudFN0cmluZy5SRURfQ0hFQ0ssUmVkRXZlbnRUeXBlLkJ0bl9NYXBfVGVhbV8wK3RoaXMudGVhbV9pbmRleCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tTZWxmKCl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICAgIFxyXG4gICAgfVxyXG4gICAgLy8gdXBkYXRlIChkdCkge31cclxufVxyXG4iXX0=