"use strict";
cc._RF.push(module, '181348D4UJEvanbRfZEuum7', 'Windfall');
// Scripts/copy/voidcrack/Windfall.ts

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
var Jackpot_1 = require("../../JsonData/Jackpot");
var PropManager_1 = require("../../Prop/PropManager");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var UIComponent_1 = require("../../UI/UIComponent");
var RogueHexagonTypes_1 = require("./RogueHexagonTypes");
var VoidScene_1 = require("./VoidScene");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Windfall = /** @class */ (function (_super) {
    __extends(Windfall, _super);
    function Windfall() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.item = [];
        // @property
        // text: string = 'hello';
        // LIFE-CYCLE CALLBACKS:
        _this.type = 0; //打的那个的id
        _this.mynode = null; //选择格子的界面
        _this.index = 0; //行数
        _this.myindex = 0; //位置
        return _this;
        // update (dt) {}
    }
    // onLoad () {}
    Windfall.prototype.initUi = function (type, mynode, index, myindex) {
        this.type = type; //id
        this.mynode = mynode; //格子界面
        this.index = index; //行数
        this.myindex = myindex; //位置
        var Prop1_ID = RogueHexagonTypes_1.RogueHexagonTypesManager.getInstance().getRogueProp1_ID(this.type);
        var Prop1_Sum = RogueHexagonTypes_1.RogueHexagonTypesManager.getInstance().getRogueProp1_Sum(this.type);
        var ietm1 = PropManager_1.PropManager.getInstance().createPropItem(Prop1_ID, Prop1_Sum);
        ietm1.parent = this.item[0];
        var Prop2_ID = RogueHexagonTypes_1.RogueHexagonTypesManager.getInstance().getRogueProp2_ID(this.type);
        var ietm2 = PropManager_1.PropManager.getInstance().createPropItem(Prop2_ID, 1);
        ietm2.parent = this.item[1];
    };
    Windfall.prototype.clickBtnShow = function () {
        var Prop1_ID = RogueHexagonTypes_1.RogueHexagonTypesManager.getInstance().getRogueProp1_ID(this.type);
        var Prop1_Sum = RogueHexagonTypes_1.RogueHexagonTypesManager.getInstance().getRogueProp1_Sum(this.type);
        var Prop2_ID = RogueHexagonTypes_1.RogueHexagonTypesManager.getInstance().getRogueProp2_ID(this.type);
        var Prop2_Sum = RogueHexagonTypes_1.RogueHexagonTypesManager.getInstance().getRogueProp2_Sum(this.type);
        var rd = Jackpot_1.JackpotManager.getInstance().getRewardDataById(Prop2_ID);
        var ietm1 = PropManager_1.PropManager.getInstance().createPropItem(Prop1_ID, Prop1_Sum);
        var ietm2 = PropManager_1.PropManager.getInstance().createPropItem(rd.reward_id, Prop2_Sum);
        PropManager_1.PropManager.getInstance().changePropNum(Prop1_ID, Prop1_Sum);
        PropManager_1.PropManager.getInstance().changePropNum(rd.reward_id, Prop2_Sum);
        var myietm = [ietm1, ietm2];
        GameManager_1.default.getInstance().showMultipleGetTip(myietm);
        this.mynode.getComponent(VoidScene_1.default).Rowsnumber = this.index; //行数
        this.mynode.getComponent(VoidScene_1.default).Positionnumber = this.myindex; //位置数
        this.mynode.getComponent(VoidScene_1.default).Refresh();
        // this.mynode.getComponent(VoidScene).initUi(this.mytype,this.index,this.myindex)
        this.clickBtnClose();
    };
    Windfall.prototype.clickBtnClose = function () {
        this.item[0].children[0].destroy();
        this.item[1].children[0].destroy();
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.onClose();
    };
    __decorate([
        property(cc.Node)
    ], Windfall.prototype, "item", void 0);
    Windfall = __decorate([
        ccclass
    ], Windfall);
    return Windfall;
}(UIComponent_1.default));
exports.default = Windfall;

cc._RF.pop();