
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Equipment/Ui/SynthesisSucceeded.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcRXF1aXBtZW50XFxVaVxcU3ludGhlc2lzU3VjY2VlZGVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWxGLHNEQUFxRDtBQUNyRCxpRUFBdUU7QUFDdkUsd0RBQXVEO0FBQ3ZELDZDQUF3QztBQUN4QyxxQ0FBZ0M7QUFDaEMscUVBQTJFO0FBQzNFLGlEQUE0QztBQUM1QyxvREFBK0M7QUFDL0MsZ0RBQStDO0FBQy9DLHNEQUFpRDtBQUUzQyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFnRCxzQ0FBWTtJQUE1RDtRQUVJLHNCQUFzQjtRQUN0QiwwQkFBMEI7UUFIOUIscUVBc0lDO1FBaklHLFlBQVk7UUFDWiwwQkFBMEI7UUFFMUIsd0JBQXdCO1FBRXhCLGVBQWU7UUFFZixhQUFhO1FBRWIsSUFBSTtRQUdKLFVBQUksR0FBUyxJQUFJLENBQUE7UUFFakIsVUFBSSxHQUFTLElBQUksQ0FBQSxDQUFBLE1BQU07UUFHdkIsZUFBUyxHQUFTLElBQUksQ0FBQSxDQUFBLE1BQU07UUFFNUIsZUFBUyxHQUFTLElBQUksQ0FBQTtRQUd0QixlQUFTLEdBQVMsSUFBSSxDQUFBLENBQUEsS0FBSztRQUUzQixnQkFBVSxHQUFTLElBQUksQ0FBQSxDQUFBLEtBQUs7UUFFNUIsb0JBQWMsR0FBUyxJQUFJLENBQUEsQ0FBQSxLQUFLO1FBR2hDLGVBQVMsR0FBUyxJQUFJLENBQUEsQ0FBQSxLQUFLO1FBRTNCLGdCQUFVLEdBQVMsSUFBSSxDQUFBLENBQUEsS0FBSztRQUU1QixvQkFBYyxHQUFTLElBQUksQ0FBQSxDQUFBLEtBQUs7UUFFaEMsaUJBQVcs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QUMsQ0FBQyxDQUFDO1NBQ3BHO1FBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMscUJBQVcsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUE7UUFDbkUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUMsS0FBSyxDQUFBO1FBQ3RCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxpQkFBTyxDQUFDLENBQUMsYUFBYSxFQUFFLENBQUE7SUFDMUQsQ0FBQztJQWxIRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO29EQUNEO0lBRWpCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7b0RBQ0Q7SUFHakI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzt5REFDSTtJQUV0QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3lEQUNJO0lBR3RCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7eURBQ0k7SUFFdEI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzswREFDSztJQUV2QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzhEQUNTO0lBRzNCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7eURBQ0k7SUFFdEI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzswREFDSztJQUV2QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzhEQUNTO0lBdENWLGtCQUFrQjtRQUR0QyxPQUFPO09BQ2Esa0JBQWtCLENBc0l0QztJQUFELHlCQUFDO0NBdElELEFBc0lDLENBdEkrQyxFQUFFLENBQUMsU0FBUyxHQXNJM0Q7a0JBdElvQixrQkFBa0IiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcblxyXG5pbXBvcnQgeyBQcm9wTWFuYWdlciB9IGZyb20gXCIuLi8uLi9Qcm9wL1Byb3BNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEVxdWlwbWVudEF0dHJpYnV0ZU1hbmFnZXIgfSBmcm9tIFwiLi4vRGF0YS9FcXVpcG1lbnRBdHRyaWJ1dGVcIjtcclxuaW1wb3J0IHsgRXF1aXBtZW50TWFuYWdlciB9IGZyb20gXCIuLi9FcXVpcG1lbnRNYW5hZ2VyXCI7XHJcbmltcG9ydCBFcXVpcEluZm9VaSBmcm9tIFwiLi9FcXVpcEluZm9VaVwiO1xyXG5pbXBvcnQgTWVyZ2VVaSBmcm9tIFwiLi9NZXJnZVVpXCI7XHJcbmltcG9ydCB7IEVxdWlwbWVudExldmVsVXBDb3N0TWFuYWdlciB9IGZyb20gXCIuLi9EYXRhL0VxdWlwbWVudExldmVsVXBDb3N0XCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgUHJvcElkIH0gZnJvbSBcIi4uLy4uL1Byb3AvUHJvcENvbmZpZ1wiO1xyXG5pbXBvcnQgeyBUYXNrSXRlbSB9IGZyb20gXCIuLi8uLi9UYXNrL1Rhc2tFbnVtXCI7XHJcbmltcG9ydCBUYXNrTWFuYWdlciBmcm9tIFwiLi4vLi4vVGFzay9UYXNrTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBFcXVpcEluZm8gfSBmcm9tIFwiLi4vRXF1aXBDb25maWdcIjtcclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTeW50aGVzaXNTdWNjZWVkZWQgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIC8vIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIC8vIGxhYmVsOiBjYy5MYWJlbCA9IG51bGw7XHJcblxyXG4gICAgLy8gQHByb3BlcnR5XHJcbiAgICAvLyB0ZXh0OiBzdHJpbmcgPSAnaGVsbG8nO1xyXG5cclxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxyXG5cclxuICAgIC8vIG9uTG9hZCAoKSB7fVxyXG5cclxuICAgIC8vIHN0YXJ0ICgpIHtcclxuXHJcbiAgICAvLyB9XHJcbiAgICBcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgdHh0MTpjYy5Ob2RlPW51bGxcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgdHh0MjpjYy5Ob2RlPW51bGwvL+WTgee6p+WQjeWtl1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgc2tpbGxOdW0xOmNjLk5vZGU9bnVsbC8v5ZOB57qn562J57qnXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHNraWxsTnVtMjpjYy5Ob2RlPW51bGxcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIG9sZEhwTnVtMTpjYy5Ob2RlPW51bGwvL+eUn+WRveWAvFxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBvbGRBdGtOdW0xOmNjLk5vZGU9bnVsbC8v5pS75Ye75YqbXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIG9sZERlZmFuY2VOdW0xOmNjLk5vZGU9bnVsbC8v6Ziy5b6h5YqbXHJcbiAgICBcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgb2xkSHBOdW0yOmNjLk5vZGU9bnVsbC8v55Sf5ZG95YC8XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIG9sZEF0a051bTI6Y2MuTm9kZT1udWxsLy/mlLvlh7vliptcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgb2xkRGVmYW5jZU51bTI6Y2MuTm9kZT1udWxsLy/pmLLlvqHliptcclxuXHJcbiAgICBlcXVpcF9pbmZvMTpudW1iZXI9bnVsbDtcclxuICAgIGVxdWlwX2luZm8yOm51bWJlcj1udWxsO1xyXG5cclxuICAgIEVxZmlVST1udWxsXHJcblxyXG4gICAgRXF1aXBMaXN0PW5ldyBBcnJheTxFcXVpcEluZm8+KCk7XHJcblxyXG4gICAgQ29pbj1bXVxyXG4gICAgcHJvdGVjdGVkIG9uRW5hYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuQ29pbj1bXVxyXG4gICAgICAgIGlmKHRoaXMuZXF1aXBfaW5mbzEpe1xyXG4gICAgICAgICAgICBsZXQgUXVhbGl0eT0gRXF1aXBtZW50QXR0cmlidXRlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFF1YWxpdHkodGhpcy5lcXVpcF9pbmZvMSkvL+WTgee6p1xyXG4gICAgICAgICAgICBsZXQgUXVhbGl0eTI9IEVxdWlwbWVudEF0dHJpYnV0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRRdWFsaXR5KHRoaXMuZXF1aXBfaW5mbzIpLy/lk4HnuqdcclxuXHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiX19fX19fXCIsUXVhbGl0eSxRdWFsaXR5MilcclxuICAgICAgICAgICAgbGV0IGJ1dGVzMT1FcXVpcG1lbnRNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0QXR0cmlidXRlcyh0aGlzLmVxdWlwX2luZm8xKVxyXG4gICAgICAgICAgICBsZXQgYnV0ZXMyPUVxdWlwbWVudE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRBdHRyaWJ1dGVzKHRoaXMuZXF1aXBfaW5mbzIpXHJcblxyXG4gICAgICAgICAgICB0aGlzLm9sZEhwTnVtMS5wYXJlbnQuYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgdGhpcy5vbGRIcE51bTIucGFyZW50LmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgIHRoaXMub2xkQXRrTnVtMS5wYXJlbnQuYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgdGhpcy5vbGRBdGtOdW0yLnBhcmVudC5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLm9sZERlZmFuY2VOdW0xLnBhcmVudC5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLm9sZERlZmFuY2VOdW0yLnBhcmVudC5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIHRoaXMub2xkSHBOdW0xLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPVwiXCIrYnV0ZXMxWzJdXHJcbiAgICAgICAgICAgIHRoaXMub2xkSHBOdW0yLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPVwiXCIrYnV0ZXMyWzJdXHJcbiAgICAgICAgICAgIGlmKGJ1dGVzMlsyXT09MCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9sZEhwTnVtMS5wYXJlbnQuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLm9sZEhwTnVtMi5wYXJlbnQuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICB0aGlzLm9sZEF0a051bTEuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9XCJcIitidXRlczFbMF1cclxuICAgICAgICAgICAgdGhpcy5vbGRBdGtOdW0yLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPVwiXCIrYnV0ZXMyWzBdXHJcblxyXG4gICAgICAgICAgICBpZihidXRlczJbMF09PTApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbGRBdGtOdW0xLnBhcmVudC5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMub2xkQXRrTnVtMi5wYXJlbnQuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMub2xkRGVmYW5jZU51bTEuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9XCJcIitidXRlczFbMV1cclxuICAgICAgICAgICAgdGhpcy5vbGREZWZhbmNlTnVtMi5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1cIlwiK2J1dGVzMlsxXVxyXG5cclxuICAgICAgICAgICAgaWYoYnV0ZXMyWzFdPT0wKXtcclxuICAgICAgICAgICAgICAgIHRoaXMub2xkRGVmYW5jZU51bTEucGFyZW50LmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5vbGREZWZhbmNlTnVtMi5wYXJlbnQuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2tpbGxOdW0xLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPVwiTHZcIitRdWFsaXR5XHJcbiAgICAgICAgICAgIHRoaXMuc2tpbGxOdW0yLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPVwiTHZcIitRdWFsaXR5MlxyXG5cclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJfX19cIixRdWFsaXR5MilcclxuICAgICAgICAgICAgaWYoUXVhbGl0eTI9PTYpe1xyXG4gICAgICAgICAgICAgICAgVGFza01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5lbWl0VGFzayhUYXNrSXRlbS7ntK/orqFY5Lu26KOF5aSH5Yiw6L6+5ZOB6LSoNik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgVGFza01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5lbWl0VGFzayhUYXNrSXRlbS7lkIjmiJBY5qyh6KOF5aSHKTtcclxuICAgICAgICAgICAgVGFza01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5lbWl0VGFzayhUYXNrSXRlbS7ljYfnuqcx5qyh6KOF5aSH5ZOB57qnKTtcclxuICAgICAgICAgICAgbGV0IFBNPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgICAgIHRoaXMudHh0MS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1cIltcIitQTS5nZXRQcm9wUXVhbGl0eU5hbWUoUXVhbGl0eSkrXCJdXCIvL1xyXG4gICAgICAgICAgICB0aGlzLnR4dDEuY29sb3I9UE0uZ2V0UHJvcFF1YWxpdHlUZXh0Q29sb3IoUXVhbGl0eS0xKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudHh0Mi5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1cIltcIitQTS5nZXRQcm9wUXVhbGl0eU5hbWUoUXVhbGl0eTIpK1wiXVwiXHJcbiAgICAgICAgICAgIHRoaXMudHh0Mi5jb2xvcj1QTS5nZXRQcm9wUXVhbGl0eVRleHRDb2xvcihRdWFsaXR5Mi0xKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLkVxdWlwTGlzdC5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgLy8gICAgIC8vIGlmKHRoaXMuRXF1aXBMaXN0W2luZGV4XS5lcXVpcF9sZXZlbD4xJiZ0aGlzLkVxdWlwTGlzdFtpbmRleF0uc2VxdWVuY2VfaWQhPXRoaXMuZXF1aXBfaW5mbzEuc2VxdWVuY2VfaWQpe1xyXG4gICAgICAgICAgICAvLyAgICAgLy8gICAgIHRoaXMuQ29pbi5wdXNoKHRoaXMuRXF1aXBMaXN0W2luZGV4XS5lcXVpcF9sZXZlbClcclxuICAgICAgICAgICAgLy8gICAgIC8vIH1cclxuICAgICAgICAgICAgLy8gICAgIC8vRXF1aXBtZW50TWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlbW92ZUVxdWlwbWVudCh0aGlzLkVxdWlwTGlzdFtpbmRleF0pXHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgLy9FcXVpcG1lbnRNYW5hZ2VyLmdldEluc3RhbmNlKCkuRmluZG9uZWNoYW5nZXF1YWxpdHkodGhpcy5lcXVpcF9pbmZvMSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5DbG9zZSgpLy/lhbPpl60gIOWIt+aWsOijheWkh+ivpuaDhVxyXG4gICAge1xyXG5cclxuICAgICAgICBsZXQgY29pbj0wXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuQ29pbi5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgY29pbis9RXF1aXBtZW50TGV2ZWxVcENvc3RNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Q29pbkNvc3RBbGwodGhpcy5Db2luW2luZGV4XSkvL+WNh+e6p+aJgOmcgOimgeeahOmHkeW4gVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihjb2luPjApe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhjb2luLHRoaXMuQ29pbilcclxuICAgICAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKFByb3BJZC5Db2luLGNvaW4pO1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dHZXRUaXAoUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShQcm9wSWQuQ29pbixjb2luKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuRXFmaVVJLmdldENvbXBvbmVudChFcXVpcEluZm9VaSkucmVmcmVzaEluZm8odGhpcy5lcXVpcF9pbmZvMSlcclxuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgdGhpcy5ub2RlLnBhcmVudC5nZXRDb21wb25lbnQoTWVyZ2VVaSkuY2xpY2tCdG5DbG9zZSgpXHJcbiAgICB9XHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge31cclxufVxyXG4iXX0=