
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Equipment/Ui/MergeUi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f3585Eu30dKw5+Mz+dO4re5', 'MergeUi');
// Scripts/Equipment/Ui/MergeUi.ts

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
var GameManager_1 = require("../../GameManager");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var UIComponent_1 = require("../../UI/UIComponent");
var EquipmentManager_1 = require("../EquipmentManager");
var HeroConfig_1 = require("../../Hero/Game/HeroConfig");
var EquipConfig_1 = require("../EquipConfig");
var PropConfig_1 = require("../../Prop/PropConfig");
var EquipmentAttribute_1 = require("../Data/EquipmentAttribute");
var PropManager_1 = require("../../Prop/PropManager");
var TextLanguage_1 = require("../../multiLanguage/TextLanguage");
var Constants_1 = require("../../Constants");
var UIManager_1 = require("../../UI/UIManager");
var UIConfig_1 = require("../../UI/UIConfig");
var EquipInfoUi_1 = require("./EquipInfoUi");
var LanguageManager_1 = require("../../multiLanguage/LanguageManager");
var HeroManager_1 = require("../../Hero/Data/HeroManager");
var TaskEnum_1 = require("../../Task/TaskEnum");
var TaskManager_1 = require("../../Task/TaskManager");
var FollowConstants_1 = require("../../multiLanguage/FollowConstants");
var FollowManager_1 = require("../../multiLanguage/FollowManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MergeUi = /** @class */ (function (_super) {
    __extends(MergeUi, _super);
    function MergeUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.equip_info = null;
        _this.equip_info2 = null;
        _this.cur_hero_type = HeroConfig_1.Hero_Type.NULL;
        _this.equip_type = EquipConfig_1.EquipType.ShiPin;
        _this.equipment1 = null;
        _this.equipment2 = null;
        _this.btnyes = null;
        _this.btnno = null;
        _this.buzutxt = null;
        _this.jhctxt = null;
        _this.noWear = null;
        _this.bbg = null;
        _this.content = null;
        // @property(cc.Prefab)
        // equip_num:cc.Prefab=null
        _this.costList = new Array();
        _this.SynthesisSucceeded = null;
        _this.EqfiUI = null;
        return _this;
    }
    MergeUi.prototype.initData = function (equipId, heroType, equipPos, EqfiUI) {
        this.equip_info = equipId;
        var pzhi = EquipmentAttribute_1.EquipmentAttributeManager.getInstance().getStage(equipId) + 1; //品质
        var weizhi = EquipmentAttribute_1.EquipmentAttributeManager.getInstance().getEquipmentPosition(equipId); //位置
        var id = EquipmentAttribute_1.EquipmentAttributeManager.getID(weizhi, pzhi);
        this.equip_info2 = id;
        this.cur_hero_type = heroType;
        this.equip_type = equipPos;
        this.EqfiUI = EqfiUI;
        this.initUi();
        this.loadEquipList();
    };
    MergeUi.prototype.initUi = function () {
        //GameManager.getInstance().music_manager.playMusic(MusicIndex.BGM_TJP);
        // FollowManager.getInstance().followEvent(Follow_Type.铁匠铺打开次数);
    };
    MergeUi.prototype.loadEquipList = function () {
        this.SynthesisSucceeded.active = false;
        this.costList = [];
        var isCan = EquipmentManager_1.EquipmentManager.getInstance().checkAEquipMerge(this.equip_info2, this.costList);
        if (this.equip_info) {
            var item1 = EquipmentManager_1.EquipmentManager.getInstance().getEquipNodeById(this.equip_info, PropConfig_1.PropAction.Null, this.cur_hero_type);
            this.equipment1.addChild(item1);
            var item2 = EquipmentManager_1.EquipmentManager.getInstance().getEquipNodeById(this.equip_info2, PropConfig_1.PropAction.Null);
            this.equipment2.addChild(item2);
            if (isCan) {
                this.bbg.height = 600;
                this.jhctxt.active = true;
                this.buzutxt.active = false;
                this.btnyes.setPosition(-124, -244, 0);
                this.btnno.setPosition(124, -244, 0);
                this.btnyes.getChildByName("label").getComponent(TextLanguage_1.default).setTextId(100102);
                this.noWear.setPosition(0, -129, 0);
                for (var index = 0; index < this.costList.length; index++) {
                    var item = PropManager_1.PropManager.getInstance().createPropItem(this.costList[index].cost_id, this.costList[index].cost_num);
                    item.scale = 0.8;
                    item.parent = this.content;
                    // let num=cc.instantiate(this.equip_num)
                    // num.setPosition(22,-31,0)
                    // num.getComponent(cc.Label).string=""+this.costList[index].cost_num
                    // num.parent=item
                }
            }
            else {
                this.bbg.height = 535;
                this.btnyes.getChildByName("label").getComponent(TextLanguage_1.default).setTextId(200009);
                this.btnyes.setPosition(-124, -185, 0);
                this.btnno.setPosition(124, -185, 0);
                this.jhctxt.active = false;
                this.buzutxt.active = true;
                this.noWear.setPosition(0, -66, 0);
            }
        }
    };
    MergeUi.prototype.clickBtnyes = function () {
        if (this.btnyes.getChildByName("label").getComponent(TextLanguage_1.default).getTextId() == 100102) { //合成成功
            // this.SynthesisSucceeded.getComponent(SynthesisSucceeded).equip_info1=this.equip_info
            // this.SynthesisSucceeded.getComponent(SynthesisSucceeded).equip_info2=this.equip_info2
            // this.SynthesisSucceeded.getComponent(SynthesisSucceeded).EqfiUI=this.EqfiUI
            // this.SynthesisSucceeded.getComponent(SynthesisSucceeded).EquipList=this.EquipList
            // this.SynthesisSucceeded.active=true 
            var oldCombat = HeroManager_1.HeroManager.getInstance().getHeroZhanli(this.cur_hero_type);
            var oldData = HeroManager_1.HeroManager.getInstance().getDeepHeroData(this.cur_hero_type);
            FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.不同ID装备的合成次数 + this.equip_info);
            PropManager_1.PropManager.getInstance().changePropNum(this.equip_info2, 1);
            for (var index = 0; index < this.costList.length; index++) {
                var cost = this.costList[index];
                PropManager_1.PropManager.getInstance().changePropNum(cost.cost_id, -cost.cost_num);
            }
            PropManager_1.PropManager.getInstance().changePropNum(this.equip_info, -1);
            for (var index = 0; index < this.content.children.length; index++) {
                this.content.children[index].destroy();
            }
            TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.合成X次装备);
            this.equipment1.children[0].destroy();
            this.equipment2.children[0].destroy();
            GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getStrByTextId(220006), 0.5);
            HeroManager_1.HeroManager.getInstance().addWearEquipment(this.cur_hero_type, this.equip_info2);
            this.initData(this.equip_info2, this.cur_hero_type, this.equip_type, this.EqfiUI);
            var newCombat = HeroManager_1.HeroManager.getInstance().getHeroZhanli(this.cur_hero_type);
            var newData = HeroManager_1.HeroManager.getInstance().getDeepHeroData(this.cur_hero_type);
            if (oldCombat != newCombat)
                UIManager_1.UIManager.getInstance().showCombatChangeEffect(oldCombat, newCombat, oldData, newData);
            // this.clickBtnClose()
        }
        else {
            //前往商城  跳商店
            // console.log("前往商城")
            GameManager_1.default.getInstance().game_to_home = Constants_1.Go_Type.City;
            GameManager_1.default.getInstance().jumoAndShowUi();
            UIManager_1.UIManager.getInstance().closeAllUiDialog(UIConfig_1.UILayerLevel.One);
            this.clickBtnClose();
        }
    };
    MergeUi.prototype.clickBtnClose = function () {
        for (var index = 0; index < this.content.children.length; index++) {
            this.content.children[index].destroy();
        }
        this.equipment1.children[0].destroy();
        this.equipment2.children[0].destroy();
        this.EqfiUI.getComponent(EquipInfoUi_1.default).refreshInfo(this.equip_info);
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.onClose();
    };
    __decorate([
        property(cc.Node)
    ], MergeUi.prototype, "equipment1", void 0);
    __decorate([
        property(cc.Node)
    ], MergeUi.prototype, "equipment2", void 0);
    __decorate([
        property(cc.Node)
    ], MergeUi.prototype, "btnyes", void 0);
    __decorate([
        property(cc.Node)
    ], MergeUi.prototype, "btnno", void 0);
    __decorate([
        property(cc.Node)
    ], MergeUi.prototype, "buzutxt", void 0);
    __decorate([
        property(cc.Node)
    ], MergeUi.prototype, "jhctxt", void 0);
    __decorate([
        property(cc.Node)
    ], MergeUi.prototype, "noWear", void 0);
    __decorate([
        property(cc.Node)
    ], MergeUi.prototype, "bbg", void 0);
    __decorate([
        property(cc.Node)
    ], MergeUi.prototype, "content", void 0);
    __decorate([
        property(cc.Node)
    ], MergeUi.prototype, "SynthesisSucceeded", void 0);
    MergeUi = __decorate([
        ccclass
    ], MergeUi);
    return MergeUi;
}(UIComponent_1.default));
exports.default = MergeUi;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcRXF1aXBtZW50XFxVaVxcTWVyZ2VVaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxpREFBNEM7QUFDNUMsNkRBQXdEO0FBQ3hELG9EQUErQztBQUMvQyx3REFBdUQ7QUFDdkQseURBQXVEO0FBQ3ZELDhDQUFnRTtBQUNoRSxvREFBbUQ7QUFDbkQsaUVBQXVFO0FBQ3ZFLHNEQUFxRDtBQUNyRCxpRUFBNEQ7QUFDNUQsNkNBQTBDO0FBQzFDLGdEQUErQztBQUMvQyw4Q0FBaUQ7QUFDakQsNkNBQXdDO0FBQ3hDLHVFQUFrRTtBQUNsRSwyREFBMEQ7QUFDMUQsZ0RBQStDO0FBQy9DLHNEQUFpRDtBQUNqRCx1RUFBa0U7QUFDbEUsbUVBQThEO0FBR3hELElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXFDLDJCQUFXO0lBQWhEO1FBQUEscUVBcUpDO1FBbkpHLGdCQUFVLEdBQVEsSUFBSSxDQUFDO1FBRXZCLGlCQUFXLEdBQVEsSUFBSSxDQUFDO1FBQ3hCLG1CQUFhLEdBQVcsc0JBQVMsQ0FBQyxJQUFJLENBQUM7UUFDdkMsZ0JBQVUsR0FBVyx1QkFBUyxDQUFDLE1BQU0sQ0FBQztRQUd0QyxnQkFBVSxHQUFTLElBQUksQ0FBQTtRQUV2QixnQkFBVSxHQUFTLElBQUksQ0FBQTtRQUl2QixZQUFNLEdBQVMsSUFBSSxDQUFBO1FBRW5CLFdBQUssR0FBUyxJQUFJLENBQUE7UUFFbEIsYUFBTyxHQUFTLElBQUksQ0FBQTtRQUVwQixZQUFNLEdBQVMsSUFBSSxDQUFBO1FBR25CLFlBQU0sR0FBUyxJQUFJLENBQUE7UUFFbkIsU0FBRyxHQUFTLElBQUksQ0FBQTtRQUVoQixhQUFPLEdBQVMsSUFBSSxDQUFBO1FBQ3BCLHVCQUF1QjtRQUN2QiwyQkFBMkI7UUFFM0IsY0FBUSxHQUFD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Q0FBQyxJQUFJLENBQUM7MkNBQ0M7SUFFbkI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzswQ0FDQTtJQUVsQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzRDQUNFO0lBRXBCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7MkNBQ0M7SUFHbkI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzsyQ0FDQztJQUVuQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3dDQUNGO0lBRWhCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7NENBQ0U7SUFNcEI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzt1REFDYTtJQWxDZCxPQUFPO1FBRDNCLE9BQU87T0FDYSxPQUFPLENBcUozQjtJQUFELGNBQUM7Q0FySkQsQUFxSkMsQ0FySm9DLHFCQUFXLEdBcUovQztrQkFySm9CLE9BQU8iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi8uLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTb3VuZEluZGV4IH0gZnJvbSBcIi4uLy4uL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBVSUNvbXBvbmVudCBmcm9tIFwiLi4vLi4vVUkvVUlDb21wb25lbnRcIjtcclxuaW1wb3J0IHsgRXF1aXBtZW50TWFuYWdlciB9IGZyb20gXCIuLi9FcXVpcG1lbnRNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEhlcm9fVHlwZSB9IGZyb20gXCIuLi8uLi9IZXJvL0dhbWUvSGVyb0NvbmZpZ1wiO1xyXG5pbXBvcnQgeyBDb3N0RGF0YSwgRXF1aXBJbmZvLCBFcXVpcFR5cGUgfSBmcm9tIFwiLi4vRXF1aXBDb25maWdcIjtcclxuaW1wb3J0IHsgUHJvcEFjdGlvbiB9IGZyb20gXCIuLi8uLi9Qcm9wL1Byb3BDb25maWdcIjtcclxuaW1wb3J0IHsgRXF1aXBtZW50QXR0cmlidXRlTWFuYWdlciB9IGZyb20gXCIuLi9EYXRhL0VxdWlwbWVudEF0dHJpYnV0ZVwiO1xyXG5pbXBvcnQgeyBQcm9wTWFuYWdlciB9IGZyb20gXCIuLi8uLi9Qcm9wL1Byb3BNYW5hZ2VyXCI7XHJcbmltcG9ydCBUZXh0TGFuZ3VhZ2UgZnJvbSBcIi4uLy4uL211bHRpTGFuZ3VhZ2UvVGV4dExhbmd1YWdlXCI7XHJcbmltcG9ydCB7IEdvX1R5cGUgfSBmcm9tIFwiLi4vLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IFVJTWFuYWdlciB9IGZyb20gXCIuLi8uLi9VSS9VSU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgVUlMYXllckxldmVsIH0gZnJvbSBcIi4uLy4uL1VJL1VJQ29uZmlnXCI7XHJcbmltcG9ydCBFcXVpcEluZm9VaSBmcm9tIFwiLi9FcXVpcEluZm9VaVwiO1xyXG5pbXBvcnQgTGFuZ3VhZ2VNYW5hZ2VyIGZyb20gXCIuLi8uLi9tdWx0aUxhbmd1YWdlL0xhbmd1YWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBIZXJvTWFuYWdlciB9IGZyb20gXCIuLi8uLi9IZXJvL0RhdGEvSGVyb01hbmFnZXJcIjtcclxuaW1wb3J0IHsgVGFza0l0ZW0gfSBmcm9tIFwiLi4vLi4vVGFzay9UYXNrRW51bVwiO1xyXG5pbXBvcnQgVGFza01hbmFnZXIgZnJvbSBcIi4uLy4uL1Rhc2svVGFza01hbmFnZXJcIjtcclxuaW1wb3J0IHsgRm9sbG93X1R5cGUgfSBmcm9tIFwiLi4vLi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dDb25zdGFudHNcIjtcclxuaW1wb3J0IEZvbGxvd01hbmFnZXIgZnJvbSBcIi4uLy4uL211bHRpTGFuZ3VhZ2UvRm9sbG93TWFuYWdlclwiO1xyXG5cclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWVyZ2VVaSBleHRlbmRzIFVJQ29tcG9uZW50IHtcclxuXHJcbiAgICBlcXVpcF9pbmZvOm51bWJlcj1udWxsO1xyXG4gICAgXHJcbiAgICBlcXVpcF9pbmZvMjpudW1iZXI9bnVsbDtcclxuICAgIGN1cl9oZXJvX3R5cGU6SGVyb19UeXBlPUhlcm9fVHlwZS5OVUxMO1xyXG4gICAgZXF1aXBfdHlwZTpFcXVpcFR5cGU9RXF1aXBUeXBlLlNoaVBpbjtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGVxdWlwbWVudDE6Y2MuTm9kZT1udWxsXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGVxdWlwbWVudDI6Y2MuTm9kZT1udWxsXHJcblxyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgYnRueWVzOmNjLk5vZGU9bnVsbFxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBidG5ubzpjYy5Ob2RlPW51bGxcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgYnV6dXR4dDpjYy5Ob2RlPW51bGxcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgamhjdHh0OmNjLk5vZGU9bnVsbFxyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgbm9XZWFyOmNjLk5vZGU9bnVsbFxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBiYmc6Y2MuTm9kZT1udWxsXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGNvbnRlbnQ6Y2MuTm9kZT1udWxsXHJcbiAgICAvLyBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgLy8gZXF1aXBfbnVtOmNjLlByZWZhYj1udWxsXHJcbiAgICBcclxuICAgIGNvc3RMaXN0PW5ldyBBcnJheTxDb3N0RGF0YT4oKTtcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgU3ludGhlc2lzU3VjY2VlZGVkOmNjLk5vZGU9bnVsbFxyXG5cclxuICAgIEVxZmlVST1udWxsXHJcbiAgICBcclxuICAgIGluaXREYXRhKGVxdWlwSWQ6bnVtYmVyLGhlcm9UeXBlOkhlcm9fVHlwZSxlcXVpcFBvczpFcXVpcFR5cGUsRXFmaVVJKXtcclxuICAgICAgICB0aGlzLmVxdWlwX2luZm89ZXF1aXBJZDtcclxuICAgICAgICBsZXQgcHpoaT1FcXVpcG1lbnRBdHRyaWJ1dGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RhZ2UoZXF1aXBJZCkrMS8v5ZOB6LSoXHJcbiAgICAgICAgbGV0IHdlaXpoaT1FcXVpcG1lbnRBdHRyaWJ1dGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RXF1aXBtZW50UG9zaXRpb24oZXF1aXBJZCkvL+S9jee9rlxyXG4gICAgICAgIGxldCBpZD1FcXVpcG1lbnRBdHRyaWJ1dGVNYW5hZ2VyLmdldElEKHdlaXpoaSxwemhpKVxyXG4gICAgICAgIHRoaXMuZXF1aXBfaW5mbzI9aWRcclxuXHJcbiAgICAgICAgdGhpcy5jdXJfaGVyb190eXBlPWhlcm9UeXBlO1xyXG4gICAgICAgIHRoaXMuZXF1aXBfdHlwZT1lcXVpcFBvcztcclxuICAgICAgICB0aGlzLkVxZmlVST1FcWZpVUlcclxuICAgICAgICB0aGlzLmluaXRVaSgpO1xyXG4gICAgICAgIHRoaXMubG9hZEVxdWlwTGlzdCgpO1xyXG4gICAgfVxyXG4gICAgaW5pdFVpKCkge1xyXG4gICAgICAgIC8vR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5tdXNpY19tYW5hZ2VyLnBsYXlNdXNpYyhNdXNpY0luZGV4LkJHTV9USlApO1xyXG4gICAgICAgIC8vIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7pk4HljKDpk7rmiZPlvIDmrKHmlbApO1xyXG5cclxuICAgIH1cclxuICAgIGxvYWRFcXVpcExpc3QoKXtcclxuICAgICAgICB0aGlzLlN5bnRoZXNpc1N1Y2NlZWRlZC5hY3RpdmU9ZmFsc2VcclxuICAgICAgICB0aGlzLmNvc3RMaXN0PVtdXHJcbiAgICAgICAgbGV0IGlzQ2FuPUVxdWlwbWVudE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGVja0FFcXVpcE1lcmdlKHRoaXMuZXF1aXBfaW5mbzIsdGhpcy5jb3N0TGlzdClcclxuICAgICAgICBpZih0aGlzLmVxdWlwX2luZm8pe1xyXG4gICAgICAgICAgICBsZXQgaXRlbTE9RXF1aXBtZW50TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEVxdWlwTm9kZUJ5SWQodGhpcy5lcXVpcF9pbmZvLFByb3BBY3Rpb24uTnVsbCx0aGlzLmN1cl9oZXJvX3R5cGUpO1xyXG4gICAgICAgICAgICB0aGlzLmVxdWlwbWVudDEuYWRkQ2hpbGQoaXRlbTEpO1xyXG4gICAgICAgICAgICBsZXQgaXRlbTI9RXF1aXBtZW50TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEVxdWlwTm9kZUJ5SWQodGhpcy5lcXVpcF9pbmZvMixQcm9wQWN0aW9uLk51bGwpO1xyXG4gICAgICAgICAgICB0aGlzLmVxdWlwbWVudDIuYWRkQ2hpbGQoaXRlbTIpO1xyXG4gICAgICAgICAgICBpZihpc0Nhbil7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJiZy5oZWlnaHQ9NjAwXHJcbiAgICAgICAgICAgICAgICB0aGlzLmpoY3R4dC5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5idXp1dHh0LmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5idG55ZXMuc2V0UG9zaXRpb24oLTEyNCwtMjQ0LDApXHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ0bm5vLnNldFBvc2l0aW9uKDEyNCwtMjQ0LDApXHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ0bnllcy5nZXRDaGlsZEJ5TmFtZShcImxhYmVsXCIpLmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnNldFRleHRJZCgxMDAxMDIpXHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vV2Vhci5zZXRQb3NpdGlvbigwLC0xMjksMClcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLmNvc3RMaXN0Lmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpdGVtPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0odGhpcy5jb3N0TGlzdFtpbmRleF0uY29zdF9pZCx0aGlzLmNvc3RMaXN0W2luZGV4XS5jb3N0X251bSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5zY2FsZT0wLjg7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5wYXJlbnQ9dGhpcy5jb250ZW50XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbGV0IG51bT1jYy5pbnN0YW50aWF0ZSh0aGlzLmVxdWlwX251bSlcclxuICAgICAgICAgICAgICAgICAgICAvLyBudW0uc2V0UG9zaXRpb24oMjIsLTMxLDApXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbnVtLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPVwiXCIrdGhpcy5jb3N0TGlzdFtpbmRleF0uY29zdF9udW1cclxuICAgICAgICAgICAgICAgICAgICAvLyBudW0ucGFyZW50PWl0ZW1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJiZy5oZWlnaHQ9NTM1XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ0bnllcy5nZXRDaGlsZEJ5TmFtZShcImxhYmVsXCIpLmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnNldFRleHRJZCgyMDAwMDkpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ0bnllcy5zZXRQb3NpdGlvbigtMTI0LC0xODUsMClcclxuICAgICAgICAgICAgICAgIHRoaXMuYnRubm8uc2V0UG9zaXRpb24oMTI0LC0xODUsMClcclxuICAgICAgICAgICAgICAgIHRoaXMuamhjdHh0LmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5idXp1dHh0LmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vV2Vhci5zZXRQb3NpdGlvbigwLC02NiwwKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRueWVzKCl7Ly/noa7orqTljYfnuqdcclxuICAgICAgICBpZih0aGlzLmJ0bnllcy5nZXRDaGlsZEJ5TmFtZShcImxhYmVsXCIpLmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLmdldFRleHRJZCgpPT0xMDAxMDIpey8v5ZCI5oiQ5oiQ5YqfXHJcbiAgICAgICAgICAgIC8vIHRoaXMuU3ludGhlc2lzU3VjY2VlZGVkLmdldENvbXBvbmVudChTeW50aGVzaXNTdWNjZWVkZWQpLmVxdWlwX2luZm8xPXRoaXMuZXF1aXBfaW5mb1xyXG4gICAgICAgICAgICAvLyB0aGlzLlN5bnRoZXNpc1N1Y2NlZWRlZC5nZXRDb21wb25lbnQoU3ludGhlc2lzU3VjY2VlZGVkKS5lcXVpcF9pbmZvMj10aGlzLmVxdWlwX2luZm8yXHJcbiAgICAgICAgICAgIC8vIHRoaXMuU3ludGhlc2lzU3VjY2VlZGVkLmdldENvbXBvbmVudChTeW50aGVzaXNTdWNjZWVkZWQpLkVxZmlVST10aGlzLkVxZmlVSVxyXG4gICAgICAgICAgICAvLyB0aGlzLlN5bnRoZXNpc1N1Y2NlZWRlZC5nZXRDb21wb25lbnQoU3ludGhlc2lzU3VjY2VlZGVkKS5FcXVpcExpc3Q9dGhpcy5FcXVpcExpc3RcclxuICAgICAgICAgICAgLy8gdGhpcy5TeW50aGVzaXNTdWNjZWVkZWQuYWN0aXZlPXRydWUgXHJcbiAgICAgICAgICAgIGxldCBvbGRDb21iYXQgPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9aaGFubGkodGhpcy5jdXJfaGVyb190eXBlKTtcclxuICAgICAgICAgICAgbGV0IG9sZERhdGEgPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldERlZXBIZXJvRGF0YSh0aGlzLmN1cl9oZXJvX3R5cGUpO1xyXG5cclxuICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuS4jeWQjElE6KOF5aSH55qE5ZCI5oiQ5qyh5pWwK3RoaXMuZXF1aXBfaW5mbyk7XHJcblxyXG4gICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0odGhpcy5lcXVpcF9pbmZvMiwxKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuY29zdExpc3QubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY29zdD10aGlzLmNvc3RMaXN0W2luZGV4XTtcclxuICAgICAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShjb3N0LmNvc3RfaWQsLWNvc3QuY29zdF9udW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bSh0aGlzLmVxdWlwX2luZm8sLTEpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5jb250ZW50LmNoaWxkcmVuLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LmNoaWxkcmVuW2luZGV4XS5kZXN0cm95KClcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFRhc2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW1pdFRhc2soVGFza0l0ZW0u5ZCI5oiQWOasoeijheWkhyk7XHJcbiAgICAgICAgICAgIHRoaXMuZXF1aXBtZW50MS5jaGlsZHJlblswXS5kZXN0cm95KClcclxuICAgICAgICAgICAgdGhpcy5lcXVpcG1lbnQyLmNoaWxkcmVuWzBdLmRlc3Ryb3koKVxyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDIyMDAwNiksMC41KTtcclxuICAgICAgICAgICAgSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRXZWFyRXF1aXBtZW50KHRoaXMuY3VyX2hlcm9fdHlwZSx0aGlzLmVxdWlwX2luZm8yKTtcclxuICAgICAgICAgICAgdGhpcy5pbml0RGF0YSh0aGlzLmVxdWlwX2luZm8yLHRoaXMuY3VyX2hlcm9fdHlwZSx0aGlzLmVxdWlwX3R5cGUsdGhpcy5FcWZpVUkpXHJcbiAgICAgICAgICAgIGxldCBuZXdDb21iYXQgPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9aaGFubGkodGhpcy5jdXJfaGVyb190eXBlKTtcclxuICAgICAgICAgICAgbGV0IG5ld0RhdGEgPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldERlZXBIZXJvRGF0YSh0aGlzLmN1cl9oZXJvX3R5cGUpO1xyXG4gICAgICAgICAgICBpZihvbGRDb21iYXQgIT0gbmV3Q29tYmF0KVxyXG4gICAgICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0NvbWJhdENoYW5nZUVmZmVjdChvbGRDb21iYXQsbmV3Q29tYmF0LG9sZERhdGEsbmV3RGF0YSk7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuY2xpY2tCdG5DbG9zZSgpXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIC8v5YmN5b6A5ZWG5Z+OICDot7PllYblupdcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCLliY3lvoDllYbln45cIilcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nYW1lX3RvX2hvbWU9R29fVHlwZS5DaXR5XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuanVtb0FuZFNob3dVaSgpXHJcbiAgICAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNsb3NlQWxsVWlEaWFsb2coVUlMYXllckxldmVsLk9uZSk7XHJcbiAgICAgICAgICAgIHRoaXMuY2xpY2tCdG5DbG9zZSgpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2xpY2tCdG5DbG9zZSgpLy/lhbPpl60gICDlj5bmtojljYfnuqdcclxuICAgIHtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuY29udGVudC5jaGlsZHJlbi5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgdGhpcy5jb250ZW50LmNoaWxkcmVuW2luZGV4XS5kZXN0cm95KClcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5lcXVpcG1lbnQxLmNoaWxkcmVuWzBdLmRlc3Ryb3koKVxyXG4gICAgICAgIHRoaXMuZXF1aXBtZW50Mi5jaGlsZHJlblswXS5kZXN0cm95KClcclxuICAgICAgICB0aGlzLkVxZmlVSS5nZXRDb21wb25lbnQoRXF1aXBJbmZvVWkpLnJlZnJlc2hJbmZvKHRoaXMuZXF1aXBfaW5mbylcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIHRoaXMub25DbG9zZSgpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==