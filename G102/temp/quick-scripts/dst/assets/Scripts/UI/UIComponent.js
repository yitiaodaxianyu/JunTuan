
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/UI/UIComponent.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'cbffcTqaJtMUIHCN93uBmpK', 'UIComponent');
// Scripts/UI/UIComponent.ts

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
var UIConfig_1 = require("./UIConfig");
var UIManager_1 = require("./UIManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UIComponent = /** @class */ (function (_super) {
    __extends(UIComponent, _super);
    function UIComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ui_path = '';
        _this.ui_layer_level = UIConfig_1.UILayerLevel.One;
        _this.ui_aciton = null;
        return _this;
    }
    UIComponent.prototype.onLoad = function () {
        var _this = this;
        var bg = this.node.getChildByName('bg');
        bg.width = 800;
        bg.height = 1642;
        bg.on(cc.Node.EventType.TOUCH_START, function () {
            _this.onClose();
        }, this);
    };
    UIComponent.prototype.init = function (uiAc) {
        this.ui_aciton = uiAc;
    };
    UIComponent.prototype.initUiData = function (uiPath, layerLevel) {
        this.ui_path = uiPath;
        this.ui_layer_level = layerLevel;
    };
    UIComponent.prototype.onRefresh = function (info) {
        if (this.ui_aciton && this.ui_aciton.onRefresh) {
            this.ui_aciton.onRefresh(info);
        }
    };
    UIComponent.prototype.onClose = function () {
        // cc.log('UIComponent');
        if (this.ui_aciton && this.ui_aciton.onClose) {
            this.ui_aciton.onClose();
        }
        //this.node.removeFromParent(false);
        //this.node.destroy();        
        UIManager_1.UIManager.getInstance().closeUiDialog(this.ui_path, this.ui_layer_level, this.node);
    };
    UIComponent = __decorate([
        ccclass
    ], UIComponent);
    return UIComponent;
}(cc.Component));
exports.default = UIComponent;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVUlcXFVJQ29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHVDQUEwQztBQUUxQyx5Q0FBd0M7QUFJbEMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBeUMsK0JBQVk7SUFBckQ7UUFBQSxxRUF5Q0M7UUF4Q0csYUFBTyxHQUFTLEVBQUUsQ0FBQztRQUNuQixvQkFBYyxHQUFlLHVCQUFZLENBQUMsR0FBRyxDQUFDO1FBRTlDLGVBQVMsR0FBVyxJQUFJLENBQUM7O0lBcUM3QixDQUFDO0lBbENHLDRCQUFNLEdBQU47UUFBQSxpQkFPQztRQU5HLElBQUksRUFBRSxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RDLEVBQUUsQ0FBQyxLQUFLLEdBQUMsR0FBRyxDQUFDO1FBQ2IsRUFBRSxDQUFDLE1BQU0sR0FBQyxJQUFJLENBQUM7UUFDZixFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBQztZQUNoQyxLQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDbkIsQ0FBQyxFQUFDLElBQUksQ0FBQyxDQUFDO0lBQ1osQ0FBQztJQUVELDBCQUFJLEdBQUosVUFBSyxJQUFjO1FBQ2YsSUFBSSxDQUFDLFNBQVMsR0FBQyxJQUFJLENBQUM7SUFDeEIsQ0FBQztJQUVELGdDQUFVLEdBQVYsVUFBVyxNQUFhLEVBQUMsVUFBdUI7UUFDNUMsSUFBSSxDQUFDLE9BQU8sR0FBQyxNQUFNLENBQUM7UUFDcEIsSUFBSSxDQUFDLGNBQWMsR0FBQyxVQUFVLENBQUM7SUFDbkMsQ0FBQztJQUVELCtCQUFTLEdBQVQsVUFBVSxJQUFTO1FBQ2YsSUFBRyxJQUFJLENBQUMsU0FBUyxJQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFDO1lBQ3hDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2xDO0lBQ0wsQ0FBQztJQUVELDZCQUFPLEdBQVA7UUFDSSx5QkFBeUI7UUFDekIsSUFBRyxJQUFJLENBQUMsU0FBUyxJQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFDO1lBQ3RDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDNUI7UUFDRCxvQ0FBb0M7UUFDcEMsOEJBQThCO1FBQzlCLHFCQUFTLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUMsSUFBSSxDQUFDLGNBQWMsRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEYsQ0FBQztJQXZDZ0IsV0FBVztRQUQvQixPQUFPO09BQ2EsV0FBVyxDQXlDL0I7SUFBRCxrQkFBQztDQXpDRCxBQXlDQyxDQXpDd0MsRUFBRSxDQUFDLFNBQVMsR0F5Q3BEO2tCQXpDb0IsV0FBVyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgeyBVSUxheWVyTGV2ZWwgfSBmcm9tIFwiLi9VSUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBVaUFjdGlvbiwgVWlJbnRlcmZhY2UgfSBmcm9tIFwiLi9VaUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBVSU1hbmFnZXIgfSBmcm9tIFwiLi9VSU1hbmFnZXJcIjtcclxuXHJcblxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSUNvbXBvbmVudCBleHRlbmRzIGNjLkNvbXBvbmVudCBpbXBsZW1lbnRzIFVpSW50ZXJmYWNlICB7XHJcbiAgICB1aV9wYXRoOiBzdHJpbmc9Jyc7XHJcbiAgICB1aV9sYXllcl9sZXZlbDogVUlMYXllckxldmVsPVVJTGF5ZXJMZXZlbC5PbmU7XHJcblxyXG4gICAgdWlfYWNpdG9uOiBVaUFjdGlvbj1udWxsO1xyXG4gICAgXHJcblxyXG4gICAgb25Mb2FkKCl7XHJcbiAgICAgICAgbGV0IGJnPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnYmcnKTtcclxuICAgICAgICBiZy53aWR0aD04MDA7XHJcbiAgICAgICAgYmcuaGVpZ2h0PTE2NDI7XHJcbiAgICAgICAgYmcub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsKCk9PntcclxuICAgICAgICAgICAgdGhpcy5vbkNsb3NlKCk7XHJcbiAgICAgICAgfSx0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0KHVpQWM6IFVpQWN0aW9uKSB7XHJcbiAgICAgICAgdGhpcy51aV9hY2l0b249dWlBYztcclxuICAgIH1cclxuXHJcbiAgICBpbml0VWlEYXRhKHVpUGF0aDpzdHJpbmcsbGF5ZXJMZXZlbDpVSUxheWVyTGV2ZWwpe1xyXG4gICAgICAgIHRoaXMudWlfcGF0aD11aVBhdGg7XHJcbiAgICAgICAgdGhpcy51aV9sYXllcl9sZXZlbD1sYXllckxldmVsO1xyXG4gICAgfVxyXG5cclxuICAgIG9uUmVmcmVzaChpbmZvPzphbnkpIHtcclxuICAgICAgICBpZih0aGlzLnVpX2FjaXRvbiYmdGhpcy51aV9hY2l0b24ub25SZWZyZXNoKXtcclxuICAgICAgICAgICAgdGhpcy51aV9hY2l0b24ub25SZWZyZXNoKGluZm8pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkNsb3NlKCkge1xyXG4gICAgICAgIC8vIGNjLmxvZygnVUlDb21wb25lbnQnKTtcclxuICAgICAgICBpZih0aGlzLnVpX2FjaXRvbiYmdGhpcy51aV9hY2l0b24ub25DbG9zZSl7XHJcbiAgICAgICAgICAgIHRoaXMudWlfYWNpdG9uLm9uQ2xvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy90aGlzLm5vZGUucmVtb3ZlRnJvbVBhcmVudChmYWxzZSk7XHJcbiAgICAgICAgLy90aGlzLm5vZGUuZGVzdHJveSgpOyAgICAgICAgXHJcbiAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2xvc2VVaURpYWxvZyh0aGlzLnVpX3BhdGgsdGhpcy51aV9sYXllcl9sZXZlbCx0aGlzLm5vZGUpO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=