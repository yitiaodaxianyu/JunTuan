
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/UI/GetAssetsUi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0c6760cO8RGEL6xFnGc4/LM', 'GetAssetsUi');
// Scripts/UI/GetAssetsUi.ts

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
exports.GetAssetsType = void 0;
var Constants_1 = require("../Constants");
var GameManager_1 = require("../GameManager");
var AudioConstants_1 = require("../Sound/AudioConstants");
var UIComponent_1 = require("./UIComponent");
var UIConfig_1 = require("./UIConfig");
var UIManager_1 = require("./UIManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GetAssetsType;
(function (GetAssetsType) {
    GetAssetsType[GetAssetsType["Hero"] = 1] = "Hero";
    GetAssetsType[GetAssetsType["PetAndEquip"] = 2] = "PetAndEquip";
})(GetAssetsType = exports.GetAssetsType || (exports.GetAssetsType = {}));
var GetAssetsUi = /** @class */ (function (_super) {
    __extends(GetAssetsUi, _super);
    function GetAssetsUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = GetAssetsType.Hero;
        return _this;
    }
    GetAssetsUi.prototype.init = function (uiAc) {
        _super.prototype.init.call(this, uiAc);
    };
    GetAssetsUi.prototype.initData = function (type) {
        this.type = type;
    };
    GetAssetsUi.prototype.onClickGoBtn = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        GameManager_1.default.getInstance().game_to_home = Constants_1.Go_Type.City;
        GameManager_1.default.getInstance().jumoAndShowUi();
        UIManager_1.UIManager.getInstance().closeAllUiDialog(UIConfig_1.UILayerLevel.One);
        if (this.type == GetAssetsType.Hero) {
            cc.find('Canvas/store_ui/scroll').getComponent(cc.ScrollView).scrollToTop(2);
        }
        else if (this.type == GetAssetsType.PetAndEquip) {
            cc.find('Canvas/store_ui/scroll').getComponent(cc.ScrollView).scrollToPercentVertical(0.2, 2);
        }
        this.onClose();
    };
    GetAssetsUi = __decorate([
        ccclass
    ], GetAssetsUi);
    return GetAssetsUi;
}(UIComponent_1.default));
exports.default = GetAssetsUi;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVUlcXEdldEFzc2V0c1VpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwQ0FBdUM7QUFDdkMsOENBQXlDO0FBQ3pDLDBEQUFxRDtBQUNyRCw2Q0FBd0M7QUFDeEMsdUNBQTBDO0FBRTFDLHlDQUF3QztBQUVsQyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUUxQyxJQUFZLGFBR1g7QUFIRCxXQUFZLGFBQWE7SUFDckIsaURBQVEsQ0FBQTtJQUNSLCtEQUFlLENBQUE7QUFDbkIsQ0FBQyxFQUhXLGFBQWEsR0FBYixxQkFBYSxLQUFiLHFCQUFhLFFBR3hCO0FBR0Q7SUFBeUMsK0JBQVc7SUFBcEQ7UUFBQSxxRUF5QkM7UUF2QkcsVUFBSSxHQUFVLGFBQWEsQ0FBQyxJQUFJLENBQUM7O0lBdUJyQyxDQUFDO0lBckJHLDBCQUFJLEdBQUosVUFBSyxJQUFjO1FBQ2YsaUJBQU0sSUFBSSxZQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3BCLENBQUM7SUFFRCw4QkFBUSxHQUFSLFVBQVMsSUFBVztRQUNoQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNyQixDQUFDO0lBRUQsa0NBQVksR0FBWjtRQUNJLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQywyQkFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BFLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsWUFBWSxHQUFDLG1CQUFPLENBQUMsSUFBSSxDQUFDO1FBQ3BELHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDMUMscUJBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyx1QkFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzNELElBQUcsSUFBSSxDQUFDLElBQUksSUFBSSxhQUFhLENBQUMsSUFBSSxFQUFDO1lBQy9CLEVBQUUsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNoRjthQUFLLElBQUcsSUFBSSxDQUFDLElBQUksSUFBSSxhQUFhLENBQUMsV0FBVyxFQUFDO1lBQzVDLEVBQUUsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLHVCQUF1QixDQUFDLEdBQUcsRUFBQyxDQUFDLENBQUMsQ0FBQztTQUNoRztRQUNELElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBdkJnQixXQUFXO1FBRC9CLE9BQU87T0FDYSxXQUFXLENBeUIvQjtJQUFELGtCQUFDO0NBekJELEFBeUJDLENBekJ3QyxxQkFBVyxHQXlCbkQ7a0JBekJvQixXQUFXIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR29fVHlwZSB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTb3VuZEluZGV4IH0gZnJvbSBcIi4uL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBVSUNvbXBvbmVudCBmcm9tIFwiLi9VSUNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBVSUxheWVyTGV2ZWwgfSBmcm9tIFwiLi9VSUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBVaUFjdGlvbiB9IGZyb20gXCIuL1VpSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFVJTWFuYWdlciB9IGZyb20gXCIuL1VJTWFuYWdlclwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5leHBvcnQgZW51bSBHZXRBc3NldHNUeXBle1xyXG4gICAgSGVybyA9IDEsXHJcbiAgICBQZXRBbmRFcXVpcCA9IDIsXHJcbn1cclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdldEFzc2V0c1VpIGV4dGVuZHMgVUlDb21wb25lbnQge1xyXG5cclxuICAgIHR5cGU6bnVtYmVyID0gR2V0QXNzZXRzVHlwZS5IZXJvO1xyXG5cclxuICAgIGluaXQodWlBYzogVWlBY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5pbml0KHVpQWMpXHJcbiAgICB9XHJcblxyXG4gICAgaW5pdERhdGEodHlwZTpudW1iZXIpe1xyXG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcbiAgICB9XHJcblxyXG4gICAgb25DbGlja0dvQnRuKCl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdhbWVfdG9faG9tZT1Hb19UeXBlLkNpdHk7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5qdW1vQW5kU2hvd1VpKCk7XHJcbiAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2xvc2VBbGxVaURpYWxvZyhVSUxheWVyTGV2ZWwuT25lKTtcclxuICAgICAgICBpZih0aGlzLnR5cGUgPT0gR2V0QXNzZXRzVHlwZS5IZXJvKXtcclxuICAgICAgICAgICAgY2MuZmluZCgnQ2FudmFzL3N0b3JlX3VpL3Njcm9sbCcpLmdldENvbXBvbmVudChjYy5TY3JvbGxWaWV3KS5zY3JvbGxUb1RvcCgyKTtcclxuICAgICAgICB9ZWxzZSBpZih0aGlzLnR5cGUgPT0gR2V0QXNzZXRzVHlwZS5QZXRBbmRFcXVpcCl7XHJcbiAgICAgICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9zdG9yZV91aS9zY3JvbGwnKS5nZXRDb21wb25lbnQoY2MuU2Nyb2xsVmlldykuc2Nyb2xsVG9QZXJjZW50VmVydGljYWwoMC4yLDIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm9uQ2xvc2UoKTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19