
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Game/Ui/CharioItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '574c5Lhuu1FDqgZd/GbdQi6', 'CharioItem');
// Scripts/Game/Ui/CharioItem.ts

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
var HeroManager_1 = require("../../Hero/Data/HeroManager");
var PropManager_1 = require("../../Prop/PropManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var CharioItem = /** @class */ (function (_super) {
    __extends(CharioItem, _super);
    function CharioItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.labelTip = null;
        _this.labelContent = null;
        _this.labelLvl = null;
        _this.icon = null;
        _this.bg = null;
        //["加攻击", "血量上限", "攻速", "防御", "技能间隔", "回血"];
        _this.charioType = [5, 4, 5, 3, 4, 3];
        return _this;
        // update (dt) {}
    }
    CharioItem.prototype.start = function () {
    };
    CharioItem.prototype.initData = function (n) {
        this.dataType = n;
        var lvN = GameManager_1.default.getInstance().charioUpgradationData[n];
        this.labelLvl.string = "lv" + (lvN + 1);
        this.labelTip.string = GameManager_1.default.getInstance().charioTip[n];
        if (n != 5) {
            this.labelContent.string = "当前等级：" + GameManager_1.default.getInstance().charioContent[n][lvN] + "\n下一等级：" + GameManager_1.default.getInstance().charioContent[n][lvN + 1];
        }
        else {
            this.labelContent.string = GameManager_1.default.getInstance().charioContent[n][0];
        }
        this.bg.getComponent(cc.Sprite).spriteFrame = HeroManager_1.HeroManager.getInstance().getSpriteFrameByName('HeroList_Frame_' + this.charioType[this.dataType] + '_0');
        this.icon.getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpFrameByCharioType(this.dataType);
    };
    CharioItem.prototype.getDataType = function () {
        return this.dataType;
    };
    __decorate([
        property(cc.Label)
    ], CharioItem.prototype, "labelTip", void 0);
    __decorate([
        property(cc.Label)
    ], CharioItem.prototype, "labelContent", void 0);
    __decorate([
        property(cc.Label)
    ], CharioItem.prototype, "labelLvl", void 0);
    __decorate([
        property(cc.Node)
    ], CharioItem.prototype, "icon", void 0);
    __decorate([
        property(cc.Node)
    ], CharioItem.prototype, "bg", void 0);
    CharioItem = __decorate([
        ccclass
    ], CharioItem);
    return CharioItem;
}(cc.Component));
exports.default = CharioItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcR2FtZVxcVWlcXENoYXJpb0l0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQix3RUFBd0U7QUFDeEUsbUJBQW1CO0FBQ25CLGtGQUFrRjtBQUNsRiw4QkFBOEI7QUFDOUIsa0ZBQWtGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFbEYsaURBQTRDO0FBQzVDLDJEQUEwRDtBQUMxRCxzREFBcUQ7QUFFL0MsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBd0MsOEJBQVk7SUFBcEQ7UUFBQSxxRUE2Q0M7UUExQ0csY0FBUSxHQUFhLElBQUksQ0FBQztRQUcxQixrQkFBWSxHQUFhLElBQUksQ0FBQztRQUc5QixjQUFRLEdBQWEsSUFBSSxDQUFDO1FBRzFCLFVBQUksR0FBWSxJQUFJLENBQUM7UUFHckIsUUFBRSxHQUFZLElBQUksQ0FBQztRQUtuQiw0Q0FBNEM7UUFDcEMsZ0JBQVUsR0FBZSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7O1FBdUJwRCxpQkFBaUI7SUFDckIsQ0FBQztJQXZCRywwQkFBSyxHQUFMO0lBRUEsQ0FBQztJQUNNLDZCQUFRLEdBQWYsVUFBZ0IsQ0FBUztRQUNyQixJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztRQUNsQixJQUFJLEdBQUcsR0FBUSxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xFLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsR0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5RCxJQUFHLENBQUMsSUFBRSxDQUFDLEVBQUM7WUFDSixJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxPQUFPLEdBQUMscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUMsU0FBUyxHQUFDLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBQyxDQUFDLENBQUMsQ0FBQztTQUNsSjthQUFJO1lBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDNUU7UUFHRCxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxHQUFHLHlCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsb0JBQW9CLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUksSUFBSSxDQUFDLENBQUM7UUFDekosSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsR0FBRyx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNwSCxDQUFDO0lBQ00sZ0NBQVcsR0FBbEI7UUFDSSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFFekIsQ0FBQztJQXhDRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO2dEQUNPO0lBRzFCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7b0RBQ1c7SUFHOUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztnREFDTztJQUcxQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzRDQUNHO0lBR3JCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7MENBQ0M7SUFmRixVQUFVO1FBRDlCLE9BQU87T0FDYSxVQUFVLENBNkM5QjtJQUFELGlCQUFDO0NBN0NELEFBNkNDLENBN0N1QyxFQUFFLENBQUMsU0FBUyxHQTZDbkQ7a0JBN0NvQixVQUFVIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi8uLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBIZXJvTWFuYWdlciB9IGZyb20gXCIuLi8uLi9IZXJvL0RhdGEvSGVyb01hbmFnZXJcIjtcclxuaW1wb3J0IHsgUHJvcE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vUHJvcC9Qcm9wTWFuYWdlclwiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENoYXJpb0l0ZW0gZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIGxhYmVsVGlwOiBjYy5MYWJlbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgbGFiZWxDb250ZW50OiBjYy5MYWJlbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgbGFiZWxMdmw6IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGljb246IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgYmc6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBkYXRhVHlwZTogbnVtYmVyO1xyXG4gICAgLy9bXCLliqDmlLvlh7tcIiwgXCLooYDph4/kuIrpmZBcIiwgXCLmlLvpgJ9cIiwgXCLpmLLlvqFcIiwgXCLmioDog73pl7TpmpRcIiwgXCLlm57ooYBcIl07XHJcbiAgICBwcml2YXRlIGNoYXJpb1R5cGU6QXJyYXk8bnVtYmVyPj1bNSwgNCwgNSwgMywgNCwgM107XHJcbiAgICBzdGFydCgpIHtcclxuXHJcbiAgICB9XHJcbiAgICBwdWJsaWMgaW5pdERhdGEobjogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5kYXRhVHlwZSA9IG47XHJcbiAgICAgICAgbGV0IGx2TjpudW1iZXI9R2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFyaW9VcGdyYWRhdGlvbkRhdGFbbl07XHJcbiAgICAgICAgdGhpcy5sYWJlbEx2bC5zdHJpbmcgPSBcImx2XCIgKyAobHZOKzEpO1xyXG4gICAgICAgIHRoaXMubGFiZWxUaXAuc3RyaW5nID0gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFyaW9UaXBbbl07XHJcbiAgICAgICAgaWYobiE9NSl7XHJcbiAgICAgICAgICAgIHRoaXMubGFiZWxDb250ZW50LnN0cmluZyA9IFwi5b2T5YmN562J57qn77yaXCIrR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFyaW9Db250ZW50W25dW2x2Tl0rXCJcXG7kuIvkuIDnrYnnuqfvvJpcIitHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYXJpb0NvbnRlbnRbbl1bbHZOKzFdO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLmxhYmVsQ29udGVudC5zdHJpbmcgPSBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYXJpb0NvbnRlbnRbbl1bMF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG5cclxuICAgICAgICB0aGlzLmJnLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTcHJpdGVGcmFtZUJ5TmFtZSgnSGVyb0xpc3RfRnJhbWVfJyArIHRoaXMuY2hhcmlvVHlwZVt0aGlzLmRhdGFUeXBlXSArICAnXzAnKTtcclxuICAgICAgICB0aGlzLmljb24uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNwRnJhbWVCeUNoYXJpb1R5cGUodGhpcy5kYXRhVHlwZSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0RGF0YVR5cGUoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhVHlwZTtcclxuXHJcbiAgICB9XHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxyXG59XHJcbiJdfQ==