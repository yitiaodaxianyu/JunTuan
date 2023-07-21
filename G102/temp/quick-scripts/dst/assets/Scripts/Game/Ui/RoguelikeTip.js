
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Game/Ui/RoguelikeTip.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '60646jT0GpBbJOvdLbaPurK', 'RoguelikeTip');
// Scripts/Game/Ui/RoguelikeTip.ts

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
var Constants_1 = require("../../Constants");
var GameManager_1 = require("../../GameManager");
var UIComponent_1 = require("../../UI/UIComponent");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var RoguelikeTip = /** @class */ (function (_super) {
    __extends(RoguelikeTip, _super);
    function RoguelikeTip() {
        // LIFE-CYCLE CALLBACKS:
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // onLoad () {}
        _this.tag = 0; //选择toggle的选择数
        _this.ToggleContainer = null;
        _this.tipLabel = null;
        return _this;
        // update (dt) {}
    }
    RoguelikeTip.prototype.start = function () {
        this.tag = 1;
        this.ToggleContainer.children[0].getComponent(cc.Toggle).isChecked = true;
        this.onToggleChange();
    };
    RoguelikeTip.prototype.clickBtnToggle = function (even, i) {
        // console.log("+++++++",even,i)
        this.tag = i;
        this.onToggleChange();
    };
    RoguelikeTip.prototype.onToggleChange = function () {
        if (this.tag == 0) {
            this.tipLabel.getComponent(cc.Label).string = "选择一个英雄加入你的队伍。";
        }
        else if (this.tag == 1) {
            this.tipLabel.getComponent(cc.Label).string = "选择一个技能加强你的英雄。";
        }
        else if (this.tag == 2) {
            this.tipLabel.getComponent(cc.Label).string = "选择一个技能用于加强你的战车。";
        }
    };
    RoguelikeTip.prototype.clickBtnClose = function () {
        console.log("离开roguelike");
        cc.director.resume();
        GameManager_1.default.getInstance().cur_game_state = Constants_1.GameState.Game_Playing;
        GameManager_1.default.getInstance().loadLevel();
        _super.prototype.onClose.call(this);
    };
    __decorate([
        property(cc.Node)
    ], RoguelikeTip.prototype, "ToggleContainer", void 0);
    __decorate([
        property(cc.Node)
    ], RoguelikeTip.prototype, "tipLabel", void 0);
    RoguelikeTip = __decorate([
        ccclass
    ], RoguelikeTip);
    return RoguelikeTip;
}(UIComponent_1.default));
exports.default = RoguelikeTip;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcR2FtZVxcVWlcXFJvZ3VlbGlrZVRpcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVsRiw2Q0FBNEM7QUFDNUMsaURBQTRDO0FBQzVDLG9EQUErQztBQUV6QyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUEwQyxnQ0FBVztJQUFyRDtRQU1JLHdCQUF3QjtRQU41QixxRUE4Q0M7UUF0Q0csZUFBZTtRQUNmLFNBQUcsR0FBUSxDQUFDLENBQUMsQ0FBQSxjQUFjO1FBRTNCLHFCQUFlLEdBQVMsSUFBSSxDQUFBO1FBRzVCLGNBQVEsR0FBUyxJQUFJLENBQUE7O1FBK0JyQixpQkFBaUI7SUFDckIsQ0FBQztJQTlCRyw0QkFBSyxHQUFMO1FBQ0ksSUFBSSxDQUFDLEdBQUcsR0FBQyxDQUFDLENBQUE7UUFDVixJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFNBQVMsR0FBQyxJQUFJLENBQUM7UUFDeEUsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFDRCxxQ0FBYyxHQUFkLFVBQWUsSUFBSSxFQUFDLENBQUM7UUFDakIsZ0NBQWdDO1FBQ2hDLElBQUksQ0FBQyxHQUFHLEdBQUMsQ0FBQyxDQUFDO1FBQ1gsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBRTFCLENBQUM7SUFFTyxxQ0FBYyxHQUF0QjtRQUNJLElBQUcsSUFBSSxDQUFDLEdBQUcsSUFBRSxDQUFDLEVBQUM7WUFDWCxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxHQUFDLGVBQWUsQ0FBQztTQUMvRDthQUFLLElBQUcsSUFBSSxDQUFDLEdBQUcsSUFBRSxDQUFDLEVBQUM7WUFDakIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBQyxlQUFlLENBQUM7U0FDL0Q7YUFBSyxJQUFHLElBQUksQ0FBQyxHQUFHLElBQUUsQ0FBQyxFQUFDO1lBQ2pCLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUMsaUJBQWlCLENBQUM7U0FDakU7SUFDTCxDQUFDO0lBQ0Qsb0NBQWEsR0FBYjtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFM0IsRUFBRSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNyQixxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsR0FBQyxxQkFBUyxDQUFDLFlBQVksQ0FBQztRQUNoRSxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3RDLGlCQUFNLE9BQU8sV0FBRSxDQUFDO0lBQ3BCLENBQUM7SUFqQ0Q7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzt5REFDVTtJQUc1QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2tEQUNHO0lBZEosWUFBWTtRQURoQyxPQUFPO09BQ2EsWUFBWSxDQThDaEM7SUFBRCxtQkFBQztDQTlDRCxBQThDQyxDQTlDeUMscUJBQVcsR0E4Q3BEO2tCQTlDb0IsWUFBWSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuXHJcbmltcG9ydCB7IEdhbWVTdGF0ZSB9IGZyb20gXCIuLi8uLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi8uLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgVUlDb21wb25lbnQgZnJvbSBcIi4uLy4uL1VJL1VJQ29tcG9uZW50XCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvZ3VlbGlrZVRpcCBleHRlbmRzIFVJQ29tcG9uZW50IHtcclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcblxyXG4gICAgLy8gb25Mb2FkICgpIHt9XHJcbiAgICB0YWc6bnVtYmVyPTA7Ly/pgInmi6l0b2dnbGXnmoTpgInmi6nmlbBcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgVG9nZ2xlQ29udGFpbmVyOmNjLk5vZGU9bnVsbFxyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgdGlwTGFiZWw6Y2MuTm9kZT1udWxsXHJcblxyXG4gICAgc3RhcnQgKCkge1xyXG4gICAgICAgIHRoaXMudGFnPTFcclxuICAgICAgICB0aGlzLlRvZ2dsZUNvbnRhaW5lci5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuVG9nZ2xlKS5pc0NoZWNrZWQ9dHJ1ZTtcclxuICAgICAgICB0aGlzLm9uVG9nZ2xlQ2hhbmdlKCk7XHJcbiAgICB9XHJcbiAgICBjbGlja0J0blRvZ2dsZShldmVuLGkpey8v5Y2V6YCJ5oyJ6ZKu55qE6YCJ5oupXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCIrKysrKysrXCIsZXZlbixpKVxyXG4gICAgICAgIHRoaXMudGFnPWk7XHJcbiAgICAgICAgdGhpcy5vblRvZ2dsZUNoYW5nZSgpO1xyXG4gICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uVG9nZ2xlQ2hhbmdlKCk6dm9pZHtcclxuICAgICAgICBpZih0aGlzLnRhZz09MCl7XHJcbiAgICAgICAgICAgIHRoaXMudGlwTGFiZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9XCLpgInmi6nkuIDkuKroi7Hpm4TliqDlhaXkvaDnmoTpmJ/kvI3jgIJcIjtcclxuICAgICAgICB9ZWxzZSBpZih0aGlzLnRhZz09MSl7XHJcbiAgICAgICAgICAgIHRoaXMudGlwTGFiZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9XCLpgInmi6nkuIDkuKrmioDog73liqDlvLrkvaDnmoToi7Hpm4TjgIJcIjtcclxuICAgICAgICB9ZWxzZSBpZih0aGlzLnRhZz09Mil7XHJcbiAgICAgICAgICAgIHRoaXMudGlwTGFiZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9XCLpgInmi6nkuIDkuKrmioDog73nlKjkuo7liqDlvLrkvaDnmoTmiJjovabjgIJcIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjbGlja0J0bkNsb3NlKCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLnprvlvIByb2d1ZWxpa2VcIik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY2MuZGlyZWN0b3IucmVzdW1lKCk7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zdGF0ZT1HYW1lU3RhdGUuR2FtZV9QbGF5aW5nO1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZExldmVsKCk7IFxyXG4gICAgICAgIHN1cGVyLm9uQ2xvc2UoKTtcclxuICAgIH1cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XHJcbn1cclxuIl19