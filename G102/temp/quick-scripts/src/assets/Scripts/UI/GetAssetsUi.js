"use strict";
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