
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Equipment/Ui/ExchangeLevel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ea6dblWo/FBk7cFITmSPxh9', 'ExchangeLevel');
// Scripts/Equipment/Ui/ExchangeLevel.ts

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
var PropConfig_1 = require("../../Prop/PropConfig");
var EquipmentManager_1 = require("../EquipmentManager");
var EquipDataItem_1 = require("./EquipDataItem");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ExchangeLevel = /** @class */ (function (_super) {
    __extends(ExchangeLevel, _super);
    function ExchangeLevel() {
        // @property(cc.Label)
        // label: cc.Label = null;
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // @property
        // text: string = 'hello';
        // LIFE-CYCLE CALLBACKS:
        // onLoad () {}
        _this.level1 = null;
        _this.level2 = null;
        _this.equipment1 = null;
        _this.equipment2 = null;
        _this.other = null;
        _this.self = null;
        _this.nodes = null;
        return _this;
        // update (dt) {}
    }
    ExchangeLevel.prototype.onEnable = function () {
        if (this.other) {
            var item1 = EquipmentManager_1.EquipmentManager.getInstance().getEquipNodeById(this.self, PropConfig_1.PropAction.Null);
            this.equipment1.addChild(item1);
            var item2 = EquipmentManager_1.EquipmentManager.getInstance().getEquipNodeById(this.other, PropConfig_1.PropAction.Null);
            this.equipment2.addChild(item2);
        }
    };
    ExchangeLevel.prototype.clickyes = function () {
        // EquipmentManager.getInstance().Findonechangelevel(this.self)
        // EquipmentManager.getInstance().Findonechangelevel(this.other)
        this.nodes.getComponent(EquipDataItem_1.default).onClickBtnEquips();
        this.clickBtnClose();
    };
    ExchangeLevel.prototype.clickBtnClose = function () {
        this.nodes.getComponent(EquipDataItem_1.default).onClickBtnEquips();
        this.equipment1.children[0].destroy();
        this.equipment2.children[0].destroy();
        this.node.active = false;
    };
    __decorate([
        property(cc.Node)
    ], ExchangeLevel.prototype, "level1", void 0);
    __decorate([
        property(cc.Node)
    ], ExchangeLevel.prototype, "level2", void 0);
    __decorate([
        property(cc.Node)
    ], ExchangeLevel.prototype, "equipment1", void 0);
    __decorate([
        property(cc.Node)
    ], ExchangeLevel.prototype, "equipment2", void 0);
    ExchangeLevel = __decorate([
        ccclass
    ], ExchangeLevel);
    return ExchangeLevel;
}(cc.Component));
exports.default = ExchangeLevel;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcRXF1aXBtZW50XFxVaVxcRXhjaGFuZ2VMZXZlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdsRixvREFBbUQ7QUFDbkQsd0RBQXdEO0FBQ3hELGlEQUE0QztBQUV0QyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUE2QyxpQ0FBWTtJQUF6RDtRQUVJLHNCQUFzQjtRQUN0QiwwQkFBMEI7UUFIOUIscUVBaURDO1FBNUNHLFlBQVk7UUFDWiwwQkFBMEI7UUFFMUIsd0JBQXdCO1FBRXhCLGVBQWU7UUFHZixZQUFNLEdBQVMsSUFBSSxDQUFBO1FBRW5CLFlBQU0sR0FBUyxJQUFJLENBQUE7UUFJbkIsZ0JBQVUsR0FBUyxJQUFJLENBQUE7UUFFdkIsZ0JBQVUsR0FBUyxJQUFJLENBQUE7UUFFdkIsV0FBSyxHQUFRLElBQUksQ0FBQztRQUNsQixVQUFJLEdBQVEsSUFBSSxDQUFDO1FBQ2pCLFdBQUssR0FBQyxJQUFJLENBQUE7O1FBdUJWLGlCQUFpQjtJQUNyQixDQUFDO0lBdkJhLGdDQUFRLEdBQWxCO1FBQ0ksSUFBRyxJQUFJLENBQUMsS0FBSyxFQUFDO1lBQ1YsSUFBSSxLQUFLLEdBQUMsbUNBQWdCLENBQUMsV0FBVyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksRUFBQyx1QkFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3JGLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2hDLElBQUksS0FBSyxHQUFDLG1DQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUMsdUJBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN0RixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNuQztJQUNMLENBQUM7SUFDRCxnQ0FBUSxHQUFSO1FBRUksK0RBQStEO1FBQy9ELGdFQUFnRTtRQUNoRSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyx1QkFBYSxDQUFDLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQTtRQUN6RCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUE7SUFDeEIsQ0FBQztJQUNELHFDQUFhLEdBQWI7UUFFSSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyx1QkFBYSxDQUFDLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQTtRQUN6RCxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUNyQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUNyQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBQyxLQUFLLENBQUE7SUFDMUIsQ0FBQztJQWxDRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2lEQUNDO0lBRW5CO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7aURBQ0M7SUFJbkI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztxREFDSztJQUV2QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3FEQUNLO0lBckJOLGFBQWE7UUFEakMsT0FBTztPQUNhLGFBQWEsQ0FpRGpDO0lBQUQsb0JBQUM7Q0FqREQsQUFpREMsQ0FqRDRDLEVBQUUsQ0FBQyxTQUFTLEdBaUR4RDtrQkFqRG9CLGFBQWEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcblxyXG5pbXBvcnQgeyBIZXJvX1R5cGUgfSBmcm9tIFwiLi4vLi4vSGVyby9HYW1lL0hlcm9Db25maWdcIjtcclxuaW1wb3J0IHsgUHJvcEFjdGlvbiB9IGZyb20gXCIuLi8uLi9Qcm9wL1Byb3BDb25maWdcIjtcclxuaW1wb3J0IHsgIEVxdWlwbWVudE1hbmFnZXIgfSBmcm9tIFwiLi4vRXF1aXBtZW50TWFuYWdlclwiO1xyXG5pbXBvcnQgRXF1aXBEYXRhSXRlbSBmcm9tIFwiLi9FcXVpcERhdGFJdGVtXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV4Y2hhbmdlTGV2ZWwgICBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgLy8gQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgLy8gbGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICAvLyBAcHJvcGVydHlcclxuICAgIC8vIHRleHQ6IHN0cmluZyA9ICdoZWxsbyc7XHJcblxyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcblxyXG4gICAgLy8gb25Mb2FkICgpIHt9XHJcbiAgICBcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgbGV2ZWwxOmNjLk5vZGU9bnVsbFxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBsZXZlbDI6Y2MuTm9kZT1udWxsXHJcblxyXG4gICAgICAgIFxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBlcXVpcG1lbnQxOmNjLk5vZGU9bnVsbFxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBlcXVpcG1lbnQyOmNjLk5vZGU9bnVsbFxyXG5cclxuICAgIG90aGVyOm51bWJlcj1udWxsO1xyXG4gICAgc2VsZjpudW1iZXI9bnVsbDtcclxuICAgIG5vZGVzPW51bGxcclxuICAgIHByb3RlY3RlZCBvbkVuYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICBpZih0aGlzLm90aGVyKXtcclxuICAgICAgICAgICAgbGV0IGl0ZW0xPUVxdWlwbWVudE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRFcXVpcE5vZGVCeUlkKHRoaXMuc2VsZixQcm9wQWN0aW9uLk51bGwpO1xyXG4gICAgICAgICAgICB0aGlzLmVxdWlwbWVudDEuYWRkQ2hpbGQoaXRlbTEpO1xyXG4gICAgICAgICAgICBsZXQgaXRlbTI9RXF1aXBtZW50TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEVxdWlwTm9kZUJ5SWQodGhpcy5vdGhlcixQcm9wQWN0aW9uLk51bGwpO1xyXG4gICAgICAgICAgICB0aGlzLmVxdWlwbWVudDIuYWRkQ2hpbGQoaXRlbTIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNsaWNreWVzKCkvL+ehruWumuS6kuaNouetiee6p1xyXG4gICAge1xyXG4gICAgICAgIC8vIEVxdWlwbWVudE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5GaW5kb25lY2hhbmdlbGV2ZWwodGhpcy5zZWxmKVxyXG4gICAgICAgIC8vIEVxdWlwbWVudE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5GaW5kb25lY2hhbmdlbGV2ZWwodGhpcy5vdGhlcilcclxuICAgICAgICB0aGlzLm5vZGVzLmdldENvbXBvbmVudChFcXVpcERhdGFJdGVtKS5vbkNsaWNrQnRuRXF1aXBzKClcclxuICAgICAgICB0aGlzLmNsaWNrQnRuQ2xvc2UoKVxyXG4gICAgfVxyXG4gICAgY2xpY2tCdG5DbG9zZSgpLy/lhbPpl60gICDlj5bmtojljYfnuqdcclxuICAgIHtcclxuICAgICAgICB0aGlzLm5vZGVzLmdldENvbXBvbmVudChFcXVpcERhdGFJdGVtKS5vbkNsaWNrQnRuRXF1aXBzKClcclxuICAgICAgICB0aGlzLmVxdWlwbWVudDEuY2hpbGRyZW5bMF0uZGVzdHJveSgpXHJcbiAgICAgICAgdGhpcy5lcXVpcG1lbnQyLmNoaWxkcmVuWzBdLmRlc3Ryb3koKVxyXG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmU9ZmFsc2UgIFxyXG4gICAgfVxyXG4gICAgLy8gdXBkYXRlIChkdCkge31cclxufVxyXG4iXX0=