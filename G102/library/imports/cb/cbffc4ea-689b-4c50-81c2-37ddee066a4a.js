"use strict";
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