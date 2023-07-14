"use strict";
cc._RF.push(module, '40bcfrxjr9OSrEl9Z8HtKHu', 'UnlockHint');
// Scripts/UI/UnlockHint.ts

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
var Constants_1 = require("../Constants");
var GameData_1 = require("../GameData");
var GameManager_1 = require("../GameManager");
var LanguageManager_1 = require("../multiLanguage/LanguageManager");
var AudioConstants_1 = require("../Sound/AudioConstants");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UnlockHint = /** @class */ (function (_super) {
    __extends(UnlockHint, _super);
    function UnlockHint() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UnlockHint.prototype.start = function () {
        var hintText = this.node.getChildByName('hintText').getComponent(cc.Label);
        hintText.string = LanguageManager_1.default.getInstance().getStrByTextId(3107);
        GameData_1.default.getInstance().saveSignUnlockHint();
    };
    UnlockHint.prototype.clickBtnOk = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        GameManager_1.default.getInstance().game_to_home = Constants_1.Go_Type.Main_Sign;
        GameManager_1.default.getInstance().backToHome();
    };
    UnlockHint = __decorate([
        ccclass
    ], UnlockHint);
    return UnlockHint;
}(cc.Component));
exports.default = UnlockHint;

cc._RF.pop();