
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/copy/endlesschallenges/rewarddisplay.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '97b26anHlZE65xNp1hYtWJR', 'rewarddisplay');
// Scripts/copy/endlesschallenges/rewarddisplay.ts

"use strict";
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
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
var GameManager_1 = require("../../GameManager");
var PropConfig_1 = require("../../Prop/PropConfig");
var PropManager_1 = require("../../Prop/PropManager");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var UIComponent_1 = require("../../UI/UIComponent");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var rewarddisplay = /** @class */ (function (_super) {
    __extends(rewarddisplay, _super);
    function rewarddisplay() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.item = [];
        _this.BossRush_Line = null;
        _this.BossRush_Line1 = null;
        _this.text = null;
        _this.mytxt = null;
        _this.boss = [10001, 10001, 10001, 10002, 10002];
        _this.Common_Window3_1 = null;
        return _this;
        // LIFE-CYCLE CALLBACKS:
        // onLoad () {}
        // start () {
        // }
        // update (dt) {}
    }
    rewarddisplay.prototype.initUi = function (type) {
        // GameManager.getInstance().music_manager.playMusic(MusicIndex.BGM_TJP);
        // FollowManager.getInstance().followEvent(Follow_Type.铁匠铺打开次数);
        if (type == 2) {
            this.Common_Window3_1.y = 31;
            this.Common_Window3_1.height = 480;
            this.item[0].y = 85;
            this.item[0].x = 0;
            var items = PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.Coin, 0);
            items.parent = this.item[0];
            this.BossRush_Line.active = false;
            this.BossRush_Line1.active = false;
            this.text.active = false;
            this.mytxt.active = true;
            this.item[1].active = false;
            this.item[2].active = false;
            this.item[3].active = false;
            this.item[4].active = false;
        }
        else if (type == 3) {
            this.item[0].y = 100;
            this.item[0].x = -80;
            this.item[4].x = 80;
            this.item[4].y = 100;
            this.Common_Window3_1.y = 0;
            this.Common_Window3_1.height = 550;
            for (var index = 0; index < this.boss.length; index++) {
                var items = PropManager_1.PropManager.getInstance().createPropItem(this.boss[index], 0);
                items.parent = this.item[index];
            }
            this.BossRush_Line.active = true;
            this.BossRush_Line1.active = true;
            this.text.active = true;
            this.mytxt.active = false;
            this.item[1].active = true;
            this.item[2].active = true;
            this.item[3].active = true;
            this.item[4].active = true;
        }
    };
    rewarddisplay.prototype.shanchu = function () {
        for (var index = 0; index < this.item.length; index++) {
            if (this.item[index].childrenCount > 0) {
                this.item[index].children[0].destroy();
            }
        }
    };
    rewarddisplay.prototype.clickBtnClose = function () {
        this.shanchu();
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.onClose();
    };
    __decorate([
        property(cc.Node)
    ], rewarddisplay.prototype, "item", void 0);
    __decorate([
        property(cc.Node)
    ], rewarddisplay.prototype, "BossRush_Line", void 0);
    __decorate([
        property(cc.Node)
    ], rewarddisplay.prototype, "BossRush_Line1", void 0);
    __decorate([
        property(cc.Node)
    ], rewarddisplay.prototype, "text", void 0);
    __decorate([
        property(cc.Node)
    ], rewarddisplay.prototype, "mytxt", void 0);
    __decorate([
        property(cc.Node)
    ], rewarddisplay.prototype, "Common_Window3_1", void 0);
    rewarddisplay = __decorate([
        ccclass
    ], rewarddisplay);
    return rewarddisplay;
}(UIComponent_1.default));
exports.default = rewarddisplay;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcY29weVxcZW5kbGVzc2NoYWxsZW5nZXNcXHJld2FyZGRpc3BsYXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQix3RUFBd0U7QUFDeEUsbUJBQW1CO0FBQ25CLGtGQUFrRjtBQUNsRiw4QkFBOEI7QUFDOUIsa0ZBQWtGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFbEYsaURBQTRDO0FBRTVDLG9EQUErQztBQUMvQyxzREFBcUQ7QUFDckQsNkRBQXdEO0FBQ3hELG9EQUErQztBQUV6QyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUEyQyxpQ0FBVztJQUF0RDtRQUFBLHFFQWlGQztRQS9FRyxVQUFJLEdBQWMsRUFBRSxDQUFBO1FBSXBCLG1CQUFhLEdBQVksSUFBSSxDQUFBO1FBRTdCLG9CQUFjLEdBQVksSUFBSSxDQUFBO1FBRzlCLFVBQUksR0FBWSxJQUFJLENBQUE7UUFFcEIsV0FBSyxHQUFZLElBQUksQ0FBQTtRQUVyQixVQUFJLEdBQVUsQ0FBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsS0FBSyxDQUFDLENBQUE7UUFFN0Msc0JBQWdCLEdBQVksSUFBSSxDQUFBOztRQXVEaEMsd0JBQXdCO1FBRXhCLGVBQWU7UUFFZixhQUFhO1FBRWIsSUFBSTtRQUVKLGlCQUFpQjtJQUNyQixDQUFDO0lBOURHLDhCQUFNLEdBQU4sVUFBTyxJQUFJO1FBQ1AseUVBQXlFO1FBQ3pFLGdFQUFnRTtRQUNoRSxJQUFJLElBQUksSUFBSSxDQUFDLEVBQUU7WUFDWCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQTtZQUMxQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxHQUFDLEdBQUcsQ0FBQTtZQUNoQyxJQUFJLENBQUMsSUFBSSxDQUFD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LEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFO1lBQ25ELElBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxhQUFhLEdBQUMsQ0FBQyxFQUFDO2dCQUNoQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQTthQUN6QztTQUNKO0lBQ0wsQ0FBQztJQUVELHFDQUFhLEdBQWI7UUFFSSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUE7UUFDZCxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsMkJBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwRSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQXJFRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOytDQUNFO0lBSXBCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7d0RBQ1c7SUFFN0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzt5REFDWTtJQUc5QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOytDQUNFO0lBRXBCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7Z0RBQ0c7SUFJckI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzsyREFDYztJQWpCZixhQUFhO1FBRGpDLE9BQU87T0FDYSxhQUFhLENBaUZqQztJQUFELG9CQUFDO0NBakZELEFBaUZDLENBakYwQyxxQkFBVyxHQWlGckQ7a0JBakZvQixhQUFhIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi8uLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgVGV4dExhbmd1YWdlIGZyb20gXCIuLi8uLi9tdWx0aUxhbmd1YWdlL1RleHRMYW5ndWFnZVwiO1xyXG5pbXBvcnQgeyBQcm9wSWQgfSBmcm9tIFwiLi4vLi4vUHJvcC9Qcm9wQ29uZmlnXCI7XHJcbmltcG9ydCB7IFByb3BNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL1Byb3AvUHJvcE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU291bmRJbmRleCB9IGZyb20gXCIuLi8uLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgVUlDb21wb25lbnQgZnJvbSBcIi4uLy4uL1VJL1VJQ29tcG9uZW50XCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgcmV3YXJkZGlzcGxheSBleHRlbmRzIFVJQ29tcG9uZW50IHsgICAgXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGl0ZW06IGNjLk5vZGVbXSA9IFtdXHJcblxyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgQm9zc1J1c2hfTGluZTogY2MuTm9kZSA9IG51bGxcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgQm9zc1J1c2hfTGluZTE6IGNjLk5vZGUgPSBudWxsXHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICB0ZXh0OiBjYy5Ob2RlID0gbnVsbFxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBteXR4dDogY2MuTm9kZSA9IG51bGxcclxuICAgIFxyXG4gICAgYm9zczpudW1iZXJbXT1bMTAwMDEsMTAwMDEsMTAwMDEsMTAwMDIsMTAwMDJdXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIENvbW1vbl9XaW5kb3czXzE6IGNjLk5vZGUgPSBudWxsXHJcbiAgICBcclxuICAgIGluaXRVaSh0eXBlKSB7Ly8yOuaXoOWwveaMkeaImCAgIDPvvJpib3Nz5oyR5oiYXHJcbiAgICAgICAgLy8gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5tdXNpY19tYW5hZ2VyLnBsYXlNdXNpYyhNdXNpY0luZGV4LkJHTV9USlApO1xyXG4gICAgICAgIC8vIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7pk4HljKDpk7rmiZPlvIDmrKHmlbApO1xyXG4gICAgICAgIGlmICh0eXBlID09IDIpIHtcclxuICAgICAgICAgICAgdGhpcy5Db21tb25fV2luZG93M18xLnk9MzFcclxuICAgICAgICAgICAgdGhpcy5Db21tb25fV2luZG93M18xLmhlaWdodD00ODBcclxuICAgICAgICAgICAgdGhpcy5pdGVtWzBdLnk9ODVcclxuICAgICAgICAgICAgdGhpcy5pdGVtWzBdLng9MFxyXG4gICAgICAgICAgICBsZXQgaXRlbXM9UHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShQcm9wSWQuQ29pbiwwKTtcclxuICAgICAgICAgICAgaXRlbXMucGFyZW50PXRoaXMuaXRlbVswXVxyXG4gICAgICAgICAgICB0aGlzLkJvc3NSdXNoX0xpbmUuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMuQm9zc1J1c2hfTGluZTEuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMudGV4dC5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAgICAgdGhpcy5teXR4dC5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLml0ZW1bMV0uYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMuaXRlbVsyXS5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAgICAgdGhpcy5pdGVtWzNdLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgICAgICB0aGlzLml0ZW1bNF0uYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09IDMpIHtcclxuICAgICAgICAgICAgdGhpcy5pdGVtWzBdLnk9MTAwXHJcbiAgICAgICAgICAgIHRoaXMuaXRlbVswXS54PS04MFxyXG4gICAgICAgICAgICB0aGlzLml0ZW1bNF0ueD04MFxyXG4gICAgICAgICAgICB0aGlzLml0ZW1bNF0ueT0xMDBcclxuICAgICAgICAgICAgdGhpcy5Db21tb25fV2luZG93M18xLnk9MFxyXG4gICAgICAgICAgICB0aGlzLkNvbW1vbl9XaW5kb3czXzEuaGVpZ2h0PTU1MFxyXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5ib3NzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW1zPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0odGhpcy5ib3NzW2luZGV4XSwwKTtcclxuICAgICAgICAgICAgICAgIGl0ZW1zLnBhcmVudD10aGlzLml0ZW1baW5kZXhdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5Cb3NzUnVzaF9MaW5lLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgIHRoaXMuQm9zc1J1c2hfTGluZTEuYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgdGhpcy50ZXh0LmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgIHRoaXMubXl0eHQuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMuaXRlbVsxXS5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLml0ZW1bMl0uYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgdGhpcy5pdGVtWzNdLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgIHRoaXMuaXRlbVs0XS5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHNoYW5jaHUoKXtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5pdGVtLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBpZih0aGlzLml0ZW1baW5kZXhdLmNoaWxkcmVuQ291bnQ+MCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLml0ZW1baW5kZXhdLmNoaWxkcmVuWzBdLmRlc3Ryb3koKSAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5DbG9zZSgpLy/lhbPpl61cclxuICAgIHtcclxuICAgICAgICB0aGlzLnNoYW5jaHUoKVxyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgdGhpcy5vbkNsb3NlKCk7XHJcbiAgICB9XHJcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuXHJcbiAgICAvLyBvbkxvYWQgKCkge31cclxuXHJcbiAgICAvLyBzdGFydCAoKSB7XHJcblxyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XHJcbn1cclxuIl19