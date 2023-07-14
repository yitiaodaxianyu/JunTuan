"use strict";
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