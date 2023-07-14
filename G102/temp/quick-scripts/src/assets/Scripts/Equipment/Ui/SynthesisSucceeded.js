"use strict";
cc._RF.push(module, '0c421Kl+M1F4pTVcG4Z+F9P', 'SynthesisSucceeded');
// Scripts/Equipment/Ui/SynthesisSucceeded.ts

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
var PropManager_1 = require("../../Prop/PropManager");
var EquipmentAttribute_1 = require("../Data/EquipmentAttribute");
var EquipmentManager_1 = require("../EquipmentManager");
var EquipInfoUi_1 = require("./EquipInfoUi");
var MergeUi_1 = require("./MergeUi");
var EquipmentLevelUpCost_1 = require("../Data/EquipmentLevelUpCost");
var GameManager_1 = require("../../GameManager");
var PropConfig_1 = require("../../Prop/PropConfig");
var TaskEnum_1 = require("../../Task/TaskEnum");
var TaskManager_1 = require("../../Task/TaskManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SynthesisSucceeded = /** @class */ (function (_super) {
    __extends(SynthesisSucceeded, _super);
    function SynthesisSucceeded() {
        // @property(cc.Label)
        // label: cc.Label = null;
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // @property
        // text: string = 'hello';
        // LIFE-CYCLE CALLBACKS:
        // onLoad () {}
        // start () {
        // }
        _this.txt1 = null;
        _this.txt2 = null; //品级名字
        _this.skillNum1 = null; //品级等级
        _this.skillNum2 = null;
        _this.oldHpNum1 = null; //生命值
        _this.oldAtkNum1 = null; //攻击力
        _this.oldDefanceNum1 = null; //防御力
        _this.oldHpNum2 = null; //生命值
        _this.oldAtkNum2 = null; //攻击力
        _this.oldDefanceNum2 = null; //防御力
        _this.equip_info1 = null;
        _this.equip_info2 = null;
        _this.EqfiUI = null;
        _this.EquipList = new Array();
        _this.Coin = [];
        return _this;
        // update (dt) {}
    }
    SynthesisSucceeded.prototype.onEnable = function () {
        this.Coin = [];
        if (this.equip_info1) {
            var Quality = EquipmentAttribute_1.EquipmentAttributeManager.getInstance().getQuality(this.equip_info1); //品级
            var Quality2 = EquipmentAttribute_1.EquipmentAttributeManager.getInstance().getQuality(this.equip_info2); //品级
            // console.log("______",Quality,Quality2)
            var butes1 = EquipmentManager_1.EquipmentManager.getInstance().getAttributes(this.equip_info1);
            var butes2 = EquipmentManager_1.EquipmentManager.getInstance().getAttributes(this.equip_info2);
            this.oldHpNum1.parent.active = true;
            this.oldHpNum2.parent.active = true;
            this.oldAtkNum1.parent.active = true;
            this.oldAtkNum2.parent.active = true;
            this.oldDefanceNum1.parent.active = true;
            this.oldDefanceNum2.parent.active = true;
            this.oldHpNum1.getComponent(cc.Label).string = "" + butes1[2];
            this.oldHpNum2.getComponent(cc.Label).string = "" + butes2[2];
            if (butes2[2] == 0) {
                this.oldHpNum1.parent.active = false;
                this.oldHpNum2.parent.active = false;
            }
            this.oldAtkNum1.getComponent(cc.Label).string = "" + butes1[0];
            this.oldAtkNum2.getComponent(cc.Label).string = "" + butes2[0];
            if (butes2[0] == 0) {
                this.oldAtkNum1.parent.active = false;
                this.oldAtkNum2.parent.active = false;
            }
            this.oldDefanceNum1.getComponent(cc.Label).string = "" + butes1[1];
            this.oldDefanceNum2.getComponent(cc.Label).string = "" + butes2[1];
            if (butes2[1] == 0) {
                this.oldDefanceNum1.parent.active = false;
                this.oldDefanceNum2.parent.active = false;
            }
            this.skillNum1.getComponent(cc.Label).string = "Lv" + Quality;
            this.skillNum2.getComponent(cc.Label).string = "Lv" + Quality2;
            // console.log("___",Quality2)
            if (Quality2 == 6) {
                TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.累计X件装备到达品质6);
            }
            TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.合成X次装备);
            TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.升级1次装备品级);
            var PM = PropManager_1.PropManager.getInstance();
            this.txt1.getComponent(cc.Label).string = "[" + PM.getPropQualityName(Quality) + "]"; //
            this.txt1.color = PM.getPropQualityTextColor(Quality - 1);
            this.txt2.getComponent(cc.Label).string = "[" + PM.getPropQualityName(Quality2) + "]";
            this.txt2.color = PM.getPropQualityTextColor(Quality2 - 1);
            // for (let index = 0; index < this.EquipList.length; index++) {
            //     // if(this.EquipList[index].equip_level>1&&this.EquipList[index].sequence_id!=this.equip_info1.sequence_id){
            //     //     this.Coin.push(this.EquipList[index].equip_level)
            //     // }
            //     //EquipmentManager.getInstance().removeEquipment(this.EquipList[index])
            // }
            //EquipmentManager.getInstance().Findonechangequality(this.equip_info1)
        }
    };
    SynthesisSucceeded.prototype.clickBtnClose = function () {
        var coin = 0;
        for (var index = 0; index < this.Coin.length; index++) {
            coin += EquipmentLevelUpCost_1.EquipmentLevelUpCostManager.getInstance().getCoinCostAll(this.Coin[index]); //升级所需要的金币
        }
        if (coin > 0) {
            console.log(coin, this.Coin);
            PropManager_1.PropManager.getInstance().changePropNum(PropConfig_1.PropId.Coin, coin);
            GameManager_1.default.getInstance().showGetTip(PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.Coin, coin));
        }
        this.EqfiUI.getComponent(EquipInfoUi_1.default).refreshInfo(this.equip_info1);
        this.node.active = false;
        this.node.parent.getComponent(MergeUi_1.default).clickBtnClose();
    };
    __decorate([
        property(cc.Node)
    ], SynthesisSucceeded.prototype, "txt1", void 0);
    __decorate([
        property(cc.Node)
    ], SynthesisSucceeded.prototype, "txt2", void 0);
    __decorate([
        property(cc.Node)
    ], SynthesisSucceeded.prototype, "skillNum1", void 0);
    __decorate([
        property(cc.Node)
    ], SynthesisSucceeded.prototype, "skillNum2", void 0);
    __decorate([
        property(cc.Node)
    ], SynthesisSucceeded.prototype, "oldHpNum1", void 0);
    __decorate([
        property(cc.Node)
    ], SynthesisSucceeded.prototype, "oldAtkNum1", void 0);
    __decorate([
        property(cc.Node)
    ], SynthesisSucceeded.prototype, "oldDefanceNum1", void 0);
    __decorate([
        property(cc.Node)
    ], SynthesisSucceeded.prototype, "oldHpNum2", void 0);
    __decorate([
        property(cc.Node)
    ], SynthesisSucceeded.prototype, "oldAtkNum2", void 0);
    __decorate([
        property(cc.Node)
    ], SynthesisSucceeded.prototype, "oldDefanceNum2", void 0);
    SynthesisSucceeded = __decorate([
        ccclass
    ], SynthesisSucceeded);
    return SynthesisSucceeded;
}(cc.Component));
exports.default = SynthesisSucceeded;

cc._RF.pop();