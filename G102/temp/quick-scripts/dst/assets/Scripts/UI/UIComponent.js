
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
        if (bg) {
            bg.width = 800;
            bg.height = 1642;
            bg.on(cc.Node.EventType.TOUCH_START, function () {
                _this.onClose();
            }, this);
        }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVUlcXFVJQ29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHVDQUEwQztBQUUxQyx5Q0FBd0M7QUFJbEMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBeUMsK0JBQVk7SUFBckQ7UUFBQSxxRUE0Q0M7UUEzQ0csYUFBTyxHQUFTLEVBQUUsQ0FBQztRQUNuQixvQkFBYyxHQUFlLHVCQUFZLENBQUMsR0FBRyxDQUFDO1FBRTlDLGVBQVMsR0FBVyxJQUFJLENBQUM7O0lBd0M3QixDQUFDO0lBckNHLDRCQUFNLEdBQU47UUFBQSxpQkFVQztRQVRHLElBQUksRUFBRSxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RDLElBQUcsRUFBRSxFQUFDO1lBQ0YsRUFBRSxDQUFDLEtBQUssR0FBQyxHQUFHLENBQUM7WUFDYixFQUFFLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQztZQUNmLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFDO2dCQUNoQyxLQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDbkIsQ0FBQyxFQUFDLElBQUksQ0FBQyxDQUFDO1NBQ1g7SUFFTCxDQUFDO0lBRUQsMEJBQUksR0FBSixVQUFLLElBQWM7UUFDZixJQUFJLENBQUMsU0FBUyxHQUFDLElBQUksQ0FBQztJQUN4QixDQUFDO0lBRUQsZ0NBQVUsR0FBVixVQUFXLE1BQWEsRUFBQyxVQUF1QjtRQUM1QyxJQUFJLENBQUMsT0FBTyxHQUFDLE1BQU0sQ0FBQztRQUNwQixJQUFJLENBQUMsY0FBYyxHQUFDLFVBQVUsQ0FBQztJQUNuQyxDQUFDO0lBRUQsK0JBQVMsR0FBVCxVQUFVLElBQVM7UUFDZixJQUFHLElBQUksQ0FBQyxTQUFTLElBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUM7WUFDeEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDbEM7SUFDTCxDQUFDO0lBRUQsNkJBQU8sR0FBUDtRQUNJLHlCQUF5QjtRQUN6QixJQUFHLElBQUksQ0FBQyxTQUFTLElBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUM7WUFDdEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUM1QjtRQUNELG9DQUFvQztRQUNwQyw4QkFBOEI7UUFDOUIscUJBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBQyxJQUFJLENBQUMsY0FBYyxFQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0RixDQUFDO0lBMUNnQixXQUFXO1FBRC9CLE9BQU87T0FDYSxXQUFXLENBNEMvQjtJQUFELGtCQUFDO0NBNUNELEFBNENDLENBNUN3QyxFQUFFLENBQUMsU0FBUyxHQTRDcEQ7a0JBNUNvQixXQUFXIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7IFVJTGF5ZXJMZXZlbCB9IGZyb20gXCIuL1VJQ29uZmlnXCI7XHJcbmltcG9ydCB7IFVpQWN0aW9uLCBVaUludGVyZmFjZSB9IGZyb20gXCIuL1VpSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFVJTWFuYWdlciB9IGZyb20gXCIuL1VJTWFuYWdlclwiO1xyXG5cclxuXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJQ29tcG9uZW50IGV4dGVuZHMgY2MuQ29tcG9uZW50IGltcGxlbWVudHMgVWlJbnRlcmZhY2UgIHtcclxuICAgIHVpX3BhdGg6IHN0cmluZz0nJztcclxuICAgIHVpX2xheWVyX2xldmVsOiBVSUxheWVyTGV2ZWw9VUlMYXllckxldmVsLk9uZTtcclxuXHJcbiAgICB1aV9hY2l0b246IFVpQWN0aW9uPW51bGw7XHJcbiAgICBcclxuXHJcbiAgICBvbkxvYWQoKXtcclxuICAgICAgICBsZXQgYmc9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdiZycpO1xyXG4gICAgICAgIGlmKGJnKXtcclxuICAgICAgICAgICAgYmcud2lkdGg9ODAwO1xyXG4gICAgICAgICAgICBiZy5oZWlnaHQ9MTY0MjtcclxuICAgICAgICAgICAgYmcub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsKCk9PntcclxuICAgICAgICAgICAgICAgIHRoaXMub25DbG9zZSgpO1xyXG4gICAgICAgICAgICB9LHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgaW5pdCh1aUFjOiBVaUFjdGlvbikge1xyXG4gICAgICAgIHRoaXMudWlfYWNpdG9uPXVpQWM7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdFVpRGF0YSh1aVBhdGg6c3RyaW5nLGxheWVyTGV2ZWw6VUlMYXllckxldmVsKXtcclxuICAgICAgICB0aGlzLnVpX3BhdGg9dWlQYXRoO1xyXG4gICAgICAgIHRoaXMudWlfbGF5ZXJfbGV2ZWw9bGF5ZXJMZXZlbDtcclxuICAgIH1cclxuXHJcbiAgICBvblJlZnJlc2goaW5mbz86YW55KSB7XHJcbiAgICAgICAgaWYodGhpcy51aV9hY2l0b24mJnRoaXMudWlfYWNpdG9uLm9uUmVmcmVzaCl7XHJcbiAgICAgICAgICAgIHRoaXMudWlfYWNpdG9uLm9uUmVmcmVzaChpbmZvKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25DbG9zZSgpIHtcclxuICAgICAgICAvLyBjYy5sb2coJ1VJQ29tcG9uZW50Jyk7XHJcbiAgICAgICAgaWYodGhpcy51aV9hY2l0b24mJnRoaXMudWlfYWNpdG9uLm9uQ2xvc2Upe1xyXG4gICAgICAgICAgICB0aGlzLnVpX2FjaXRvbi5vbkNsb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vdGhpcy5ub2RlLnJlbW92ZUZyb21QYXJlbnQoZmFsc2UpO1xyXG4gICAgICAgIC8vdGhpcy5ub2RlLmRlc3Ryb3koKTsgICAgICAgIFxyXG4gICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNsb3NlVWlEaWFsb2codGhpcy51aV9wYXRoLHRoaXMudWlfbGF5ZXJfbGV2ZWwsdGhpcy5ub2RlKTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19