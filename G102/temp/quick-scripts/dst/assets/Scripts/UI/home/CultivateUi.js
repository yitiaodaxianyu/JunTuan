
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/UI/home/CultivateUi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '7dd31Z+L2NAWIIUmx1HfBJ8', 'CultivateUi');
// Scripts/UI/home/CultivateUi.ts

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
var FunctionDefinition_1 = require("../../JsonData/FunctionDefinition");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var FuncTypeBtn_1 = require("./FuncTypeBtn");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var CultivateUi = /** @class */ (function (_super) {
    __extends(CultivateUi, _super);
    function CultivateUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sp_btn = [];
        _this.all_ui = [];
        _this.cur_selected_index = 1;
        _this.is_hint_state = false;
        return _this;
    }
    CultivateUi.prototype.onLoad = function () {
        var bottom = cc.find('Canvas/Top_Ui/down');
        var btnList = this.node.getChildByName('btnList');
        btnList.y = bottom.y + 81;
        if (this.is_hint_state == false) {
            if (FunctionDefinition_1.FunctionDefinitionManager.getInstance().getIsUnlock(Constants_1.FuncType.ChengBaoYangCheng)) {
                this.cur_selected_index = 1;
            }
            else {
                for (var i = Constants_1.FuncType.ZhuangBeiHeCheng; i <= Constants_1.FuncType.TianFu; i++) {
                    if (FunctionDefinition_1.FunctionDefinitionManager.getInstance().getIsUnlock(i)) {
                        this.cur_selected_index = i;
                        break;
                    }
                }
            }
        }
    };
    CultivateUi.prototype.onEnable = function () {
        this.setBtnShow();
        this.is_hint_state = false;
    };
    CultivateUi.prototype.setBtnShow = function () {
        var btnList = this.node.getChildByName('btnList');
        var unlockNum = 0;
        var isShow = false;
        for (var i = 0; i < 3; i++) {
            var btn = btnList.children[i];
            var isUnlock = btn.getComponent(FuncTypeBtn_1.default).refresh();
            if (this.cur_selected_index == i && isUnlock) {
                this.all_ui[i].active = true;
                btn.getComponent(cc.Button).interactable = false;
                isShow = true;
            }
            else {
                this.all_ui[i].active = false;
            }
            if (isUnlock) {
                unlockNum++;
            }
        }
    };
    CultivateUi.prototype.clickBtnTable = function (btn, indexStr) {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        var index = parseInt(indexStr);
        if (index != this.cur_selected_index) {
            this.cur_selected_index = index;
            this.setBtnShow();
        }
    };
    __decorate([
        property([cc.SpriteFrame])
    ], CultivateUi.prototype, "sp_btn", void 0);
    __decorate([
        property([cc.Node])
    ], CultivateUi.prototype, "all_ui", void 0);
    CultivateUi = __decorate([
        ccclass
    ], CultivateUi);
    return CultivateUi;
}(cc.Component));
exports.default = CultivateUi;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVUlcXGhvbWVcXEN1bHRpdmF0ZVVpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZDQUEyQztBQUMzQyxpREFBNEM7QUFDNUMsd0VBQThFO0FBRzlFLDZEQUF3RDtBQUN4RCw2Q0FBd0M7QUFFbEMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBeUMsK0JBQVk7SUFBckQ7UUFBQSxxRUFpRUM7UUE5REcsWUFBTSxHQUFrQixFQUFFLENBQUM7UUFFM0IsWUFBTSxHQUFXLEVBQUUsQ0FBQTtRQUVuQix3QkFBa0IsR0FBUSxDQUFDLENBQUM7UUFDNUIsbUJBQWEsR0FBUyxLQUFLLENBQUM7O0lBeURoQyxDQUFDO0lBdkRhLDRCQUFNLEdBQWhCO1FBQ0ksSUFBSSxNQUFNLEdBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQ3pDLElBQUksT0FBTyxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2hELE9BQU8sQ0FBQyxDQUFDLEdBQUMsTUFBTSxDQUFDLENBQUMsR0FBQyxFQUFFLENBQUM7UUFDdEIsSUFBRyxJQUFJLENBQUMsYUFBYSxJQUFFLEtBQUssRUFBQztZQUN6QixJQUFHLDhDQUF5QixDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxvQkFBUSxDQUFDLGlCQUFpQixDQUFDLEVBQUM7Z0JBQy9FLElBQUksQ0FBQyxrQkFBa0IsR0FBQyxDQUFDLENBQUM7YUFDN0I7aUJBQUk7Z0JBQ0QsS0FBSSxJQUFJLENBQUMsR0FBQyxvQkFBUSxDQUFDLGdCQUFnQixFQUFFLENBQUMsSUFBRSxvQkFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQztvQkFDekQsSUFBRyw4Q0FBeUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUM7d0JBQ3RELElBQUksQ0FBQyxrQkFBa0IsR0FBQyxDQUFDLENBQUM7d0JBQzFCLE1BQU07cUJBQ1Q7aUJBQ0o7YUFDSjtTQUNKO0lBRUwsQ0FBQztJQUNTLDhCQUFRLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFBO1FBQ2pCLElBQUksQ0FBQyxhQUFhLEdBQUMsS0FBSyxDQUFDO0lBQzdCLENBQUM7SUFFRCxnQ0FBVSxHQUFWO1FBRUksSUFBSSxPQUFPLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDaEQsSUFBSSxTQUFTLEdBQUMsQ0FBQyxDQUFDO1FBQ2hCLElBQUksTUFBTSxHQUFDLEtBQUssQ0FBQztRQUNqQixLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUNyQjtZQUNJLElBQUksR0FBRyxHQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUIsSUFBSSxRQUFRLEdBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxxQkFBVyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDckQsSUFBRyxJQUFJLENBQUMsa0JBQWtCLElBQUUsQ0FBQyxJQUFJLFFBQVEsRUFDekM7Z0JBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFDO2dCQUMzQixHQUFHLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLEdBQUMsS0FBSyxDQUFDO2dCQUMvQyxNQUFNLEdBQUMsSUFBSSxDQUFDO2FBQ2Y7aUJBQ0Q7Z0JBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUMsS0FBSyxDQUFDO2FBQy9CO1lBQ0QsSUFBRyxRQUFRLEVBQUM7Z0JBQ1IsU0FBUyxFQUFFLENBQUM7YUFDZjtTQUNKO0lBQ0wsQ0FBQztJQUVELG1DQUFhLEdBQWIsVUFBYyxHQUFHLEVBQUMsUUFBZTtRQUM3QixxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsMkJBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwRSxJQUFJLEtBQUssR0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDN0IsSUFBRyxLQUFLLElBQUUsSUFBSSxDQUFDLGtCQUFrQixFQUFDO1lBQzlCLElBQUksQ0FBQyxrQkFBa0IsR0FBQyxLQUFLLENBQUM7WUFDOUIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQ3JCO0lBQ0wsQ0FBQztJQTdERDtRQURDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQzsrQ0FDQTtJQUUzQjtRQURDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQzsrQ0FDRDtJQUxGLFdBQVc7UUFEL0IsT0FBTztPQUNhLFdBQVcsQ0FpRS9CO0lBQUQsa0JBQUM7Q0FqRUQsQUFpRUMsQ0FqRXdDLEVBQUUsQ0FBQyxTQUFTLEdBaUVwRDtrQkFqRW9CLFdBQVciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGdW5jVHlwZSB9IGZyb20gXCIuLi8uLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi8uLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBGdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0pzb25EYXRhL0Z1bmN0aW9uRGVmaW5pdGlvblwiO1xyXG5pbXBvcnQgeyBGb2xsb3dfVHlwZSB9IGZyb20gXCIuLi8uLi9tdWx0aUxhbmd1YWdlL0ZvbGxvd0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgRm9sbG93TWFuYWdlciBmcm9tIFwiLi4vLi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFNvdW5kSW5kZXggfSBmcm9tIFwiLi4vLi4vU291bmQvQXVkaW9Db25zdGFudHNcIjtcclxuaW1wb3J0IEZ1bmNUeXBlQnRuIGZyb20gXCIuL0Z1bmNUeXBlQnRuXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEN1bHRpdmF0ZVVpIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoW2NjLlNwcml0ZUZyYW1lXSlcclxuICAgIHNwX2J0bjpjYy5TcHJpdGVGcmFtZVtdPVtdO1xyXG4gICAgQHByb3BlcnR5KFtjYy5Ob2RlXSlcclxuICAgIGFsbF91aTpjYy5Ob2RlW109W11cclxuXHJcbiAgICBjdXJfc2VsZWN0ZWRfaW5kZXg6bnVtYmVyPTE7XHJcbiAgICBpc19oaW50X3N0YXRlOmJvb2xlYW49ZmFsc2U7XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uTG9hZCgpOiB2b2lkIHtcclxuICAgICAgICBsZXQgYm90dG9tPWNjLmZpbmQoJ0NhbnZhcy9Ub3BfVWkvZG93bicpO1xyXG4gICAgICAgIGxldCBidG5MaXN0PXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnYnRuTGlzdCcpO1xyXG4gICAgICAgIGJ0bkxpc3QueT1ib3R0b20ueSs4MTtcclxuICAgICAgICBpZih0aGlzLmlzX2hpbnRfc3RhdGU9PWZhbHNlKXtcclxuICAgICAgICAgICAgaWYoRnVuY3Rpb25EZWZpbml0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldElzVW5sb2NrKEZ1bmNUeXBlLkNoZW5nQmFvWWFuZ0NoZW5nKSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cl9zZWxlY3RlZF9pbmRleD0xO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgaT1GdW5jVHlwZS5aaHVhbmdCZWlIZUNoZW5nOyBpPD1GdW5jVHlwZS5UaWFuRnU7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoRnVuY3Rpb25EZWZpbml0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldElzVW5sb2NrKGkpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJfc2VsZWN0ZWRfaW5kZXg9aTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIG9uRW5hYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2V0QnRuU2hvdygpICAgICAgIFxyXG4gICAgICAgIHRoaXMuaXNfaGludF9zdGF0ZT1mYWxzZTsgICAgXHJcbiAgICB9IFxyXG5cclxuICAgIHNldEJ0blNob3coKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBidG5MaXN0PXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnYnRuTGlzdCcpO1xyXG4gICAgICAgIGxldCB1bmxvY2tOdW09MDtcclxuICAgICAgICBsZXQgaXNTaG93PWZhbHNlO1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPDM7IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCBidG49YnRuTGlzdC5jaGlsZHJlbltpXTtcclxuICAgICAgICAgICAgbGV0IGlzVW5sb2NrPWJ0bi5nZXRDb21wb25lbnQoRnVuY1R5cGVCdG4pLnJlZnJlc2goKTtcclxuICAgICAgICAgICAgaWYodGhpcy5jdXJfc2VsZWN0ZWRfaW5kZXg9PWkgJiYgaXNVbmxvY2spXHJcbiAgICAgICAgICAgIHsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFsbF91aVtpXS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAgICAgICAgIGJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBpc1Nob3c9dHJ1ZTtcclxuICAgICAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hbGxfdWlbaV0uYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGlzVW5sb2NrKXtcclxuICAgICAgICAgICAgICAgIHVubG9ja051bSsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuVGFibGUoYnRuLGluZGV4U3RyOnN0cmluZyl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBsZXQgaW5kZXg9cGFyc2VJbnQoaW5kZXhTdHIpO1xyXG4gICAgICAgIGlmKGluZGV4IT10aGlzLmN1cl9zZWxlY3RlZF9pbmRleCl7XHJcbiAgICAgICAgICAgIHRoaXMuY3VyX3NlbGVjdGVkX2luZGV4PWluZGV4O1xyXG4gICAgICAgICAgICB0aGlzLnNldEJ0blNob3coKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19