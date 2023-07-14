
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Equipment/Ui/EquipDataItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '94b10WPD4NGrbPgHOKYvknW', 'EquipDataItem');
// Scripts/Equipment/Ui/EquipDataItem.ts

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
var HeroManager_1 = require("../../Hero/Data/HeroManager");
var HeroConfig_1 = require("../../Hero/Game/HeroConfig");
var LanguageManager_1 = require("../../multiLanguage/LanguageManager");
var Item_1 = require("../../Prop/Data/Item");
var PropConfig_1 = require("../../Prop/PropConfig");
var PropManager_1 = require("../../Prop/PropManager");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var UIManager_1 = require("../../UI/UIManager");
var EquipmentAttribute_1 = require("../Data/EquipmentAttribute");
var EquipmentManager_1 = require("../EquipmentManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var EquipDataItem = /** @class */ (function (_super) {
    __extends(EquipDataItem, _super);
    function EquipDataItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ui_equip_info = null;
        _this.self_equip_info = null;
        _this.ui_hero_type = HeroConfig_1.Hero_Type.NULL;
        _this.self_hero_type = HeroConfig_1.Hero_Type.NULL;
        _this.click_callback = null;
        _this.Common_Btn = [];
        return _this;
    }
    EquipDataItem.prototype.init = function (equipInfo, uiEquipId, heroType, clickCallback, selfHero) {
        if (selfHero === void 0) { selfHero = HeroConfig_1.Hero_Type.NULL; }
        this.self_equip_info = equipInfo;
        this.ui_equip_info = uiEquipId;
        this.ui_hero_type = heroType;
        this.self_hero_type = selfHero;
        this.click_callback = clickCallback;
        this.initData();
        this.refreshData();
    };
    EquipDataItem.prototype.initData = function () {
        //管理器
        var LM = LanguageManager_1.default.getInstance();
        var PM = PropManager_1.PropManager.getInstance();
        //图标
        var item = EquipmentManager_1.EquipmentManager.getInstance().getEquipNodeByInfo(this.self_equip_info, PropConfig_1.PropAction.Null, this.self_hero_type);
        item.scale = 0.8;
        this.node.getChildByName('equipRoot').addChild(item);
        //名称
        var jsonItem = Item_1.ItemManager.getInstance().getJsonItem(this.self_equip_info.equip_id);
        var propName = this.node.getChildByName('propName');
        propName.getComponent(cc.Label).string = "[" + PM.getPropQualityName(jsonItem.Quality) + "]" + LM.getStrByTextId(jsonItem.NameTextId);
        propName.color = PM.getPropQualityTextColor(jsonItem.Quality);
        var Outlinecolor = [new cc.Color(39, 35, 28), new cc.Color(29, 63, 27), new cc.Color(25, 55, 88), new cc.Color(66, 37, 96), new cc.Color(62, 32, 0), new cc.Color(79, 16, 15)];
        // console.log("______",jsonItem.Quality)
        propName.getComponent(cc.LabelOutline).color = Outlinecolor[(jsonItem.Quality)];
        //战力数
        this.node.getChildByName('zhanliNum').getComponent(cc.Label).string = EquipmentManager_1.EquipmentManager.getInstance().getEquipZhanLi(this.self_equip_info.equip_id) + ""; //EquipmentManager.getInstance().getEquipZhanLi(this.self_equip_info)+'';
    };
    EquipDataItem.prototype.refreshData = function () {
        //装备的英雄
        var heroType = this.self_hero_type;
        var isWear = heroType != HeroConfig_1.Hero_Type.NULL;
        if (heroType != HeroConfig_1.Hero_Type.NULL) {
            var heroIcon = this.node.getChildByName('heroIcon').getComponent(cc.Sprite);
            heroIcon.spriteFrame = PropManager_1.PropManager.getInstance().getHeroIconb(heroType);
        }
        this.node.getChildByName('exBg').active = isWear;
        this.node.getChildByName('heroIcon').active = isWear;
        this.node.getChildByName('Equipped_Icon').active = isWear;
        this.node.getChildByName('btnExchange').active = isWear;
        var btnEquip = this.node.getChildByName('btnEquip');
        btnEquip.active = !isWear;
        // if(this.ui_equip_info.equip_id!=0){
        //     btnEquip.getChildByName("titleLabel").getComponent(cc.LabelOutline).color=new cc.Color(12,56,86)//.toHEX("#0C3856")
        //     btnEquip.getComponent(cc.Sprite).spriteFrame=this.Common_Btn[0]
        // }else{
        //     btnEquip.getChildByName("titleLabel").getComponent(cc.LabelOutline).color=new cc.Color(105,56,20)//.toHEX("#693814")
        //     btnEquip.getComponent(cc.Sprite).spriteFrame=this.Common_Btn[1]
        // }
    };
    EquipDataItem.prototype.onClickBtnExchange = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        var oldCombat = HeroManager_1.HeroManager.getInstance().getHeroZhanli(this.ui_hero_type);
        var oldData = HeroManager_1.HeroManager.getInstance().getDeepHeroData(this.ui_hero_type);
        HeroManager_1.HeroManager.getInstance().addWearEquipment(this.ui_hero_type, this.self_equip_info.equip_id);
        HeroManager_1.HeroManager.getInstance().addWearEquipment(this.self_hero_type, this.ui_equip_info.equip_id, EquipmentAttribute_1.EquipmentAttributeManager.getInstance().getEquipmentPosition(this.self_equip_info.equip_id));
        var newCombat = HeroManager_1.HeroManager.getInstance().getHeroZhanli(this.ui_hero_type);
        var newData = HeroManager_1.HeroManager.getInstance().getDeepHeroData(this.ui_hero_type);
        if (oldCombat != newCombat) {
            UIManager_1.UIManager.getInstance().showCombatChangeEffect(oldCombat, newCombat, oldData, newData);
        }
        if (this.click_callback) {
            this.click_callback(this.self_equip_info.equip_id);
        }
    };
    EquipDataItem.prototype.onClickBtnEquip = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        var oldCombat = HeroManager_1.HeroManager.getInstance().getHeroZhanli(this.ui_hero_type);
        var oldData = HeroManager_1.HeroManager.getInstance().getDeepHeroData(this.ui_hero_type);
        HeroManager_1.HeroManager.getInstance().addWearEquipment(this.ui_hero_type, this.self_equip_info.equip_id);
        var newCombat = HeroManager_1.HeroManager.getInstance().getHeroZhanli(this.ui_hero_type);
        var newData = HeroManager_1.HeroManager.getInstance().getDeepHeroData(this.ui_hero_type);
        if (oldCombat != newCombat) {
            UIManager_1.UIManager.getInstance().showCombatChangeEffect(oldCombat, newCombat, oldData, newData);
        }
        if (this.click_callback) {
            this.click_callback(this.self_equip_info.equip_id);
        }
    };
    __decorate([
        property(cc.SpriteFrame)
    ], EquipDataItem.prototype, "Common_Btn", void 0);
    EquipDataItem = __decorate([
        ccclass
    ], EquipDataItem);
    return EquipDataItem;
}(cc.Component));
exports.default = EquipDataItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcRXF1aXBtZW50XFxVaVxcRXF1aXBEYXRhSXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpREFBNEM7QUFDNUMsMkRBQTBEO0FBQzFELHlEQUF1RDtBQUN2RCx1RUFBa0U7QUFDbEUsNkNBQW1EO0FBQ25ELG9EQUFtRDtBQUNuRCxzREFBcUQ7QUFDckQsNkRBQXdEO0FBQ3hELGdEQUErQztBQUMvQyxpRUFBdUU7QUFFdkUsd0RBQXdEO0FBR2xELElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQTJDLGlDQUFZO0lBQXZEO1FBQUEscUVBa0dDO1FBL0ZHLG1CQUFhLEdBQVcsSUFBSSxDQUFDO1FBQzdCLHFCQUFlLEdBQVcsSUFBSSxDQUFDO1FBQy9CLGtCQUFZLEdBQVcsc0JBQVMsQ0FBQyxJQUFJLENBQUM7UUFDdEMsb0JBQWMsR0FBVyxzQkFBUyxDQUFDLElBQUksQ0FBQztRQUN4QyxvQkFBYyxHQUFVLElBQUksQ0FBQztRQUc3QixnQkFBVSxHQUFrQixFQUFFLENBQUE7O0lBd0ZsQyxDQUFDO0lBdEZHLDRCQUFJLEdBQUosVUFBSyxTQUFtQixFQUFDLFNBQW1CLEVBQUMsUUFBa0IsRUFBQyxhQUFzQixFQUFDLFFBQWlDO1FBQWpDLHlCQUFBLEVBQUEsV0FBbUIsc0JBQVMsQ0FBQyxJQUFJO1FBQ3BILElBQUksQ0FBQyxlQUFlLEdBQUMsU0FBUyxDQUFDO1FBQy9CLElBQUksQ0FBQyxhQUFhLEdBQUMsU0FBUyxDQUFDO1FBQzdCLElBQUksQ0FBQyxZQUFZLEdBQUMsUUFBUSxDQUFDO1FBQzNCLElBQUksQ0FBQyxjQUFjLEdBQUMsUUFBUSxDQUFDO1FBQzdCLElBQUksQ0FBQyxjQUFjLEdBQUMsYUFBYSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FB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QUFDLElBQUksQ0FBQyxZQUFZLEVBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM1RixJQUFJLFNBQVMsR0FBRyx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDM0UsSUFBSSxPQUFPLEdBQUcseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzNFLElBQUcsU0FBUyxJQUFJLFNBQVMsRUFBQztZQUN0QixxQkFBUyxDQUFDLFdBQVcsRUFBRSxDQUFDLHNCQUFzQixDQUFDLFNBQVMsRUFBQyxTQUFTLEVBQUMsT0FBTyxFQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3ZGO1FBQ0QsSUFBRyxJQUFJLENBQUMsY0FBYyxFQUFDO1lBQ25CLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUN0RDtJQUNMLENBQUM7SUF0RkQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQztxREFDSztJQVZiLGFBQWE7UUFEakMsT0FBTztPQUNhLGFBQWEsQ0FrR2pDO0lBQUQsb0JBQUM7Q0FsR0QsQUFrR0MsQ0FsRzBDLEVBQUUsQ0FBQyxTQUFTLEdBa0d0RDtrQkFsR29CLGFBQWEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uLy4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEhlcm9NYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0hlcm8vRGF0YS9IZXJvTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBIZXJvX1R5cGUgfSBmcm9tIFwiLi4vLi4vSGVyby9HYW1lL0hlcm9Db25maWdcIjtcclxuaW1wb3J0IExhbmd1YWdlTWFuYWdlciBmcm9tIFwiLi4vLi4vbXVsdGlMYW5ndWFnZS9MYW5ndWFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgSXRlbU1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vUHJvcC9EYXRhL0l0ZW1cIjtcclxuaW1wb3J0IHsgUHJvcEFjdGlvbiB9IGZyb20gXCIuLi8uLi9Qcm9wL1Byb3BDb25maWdcIjtcclxuaW1wb3J0IHsgUHJvcE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vUHJvcC9Qcm9wTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTb3VuZEluZGV4IH0gZnJvbSBcIi4uLy4uL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IFVJTWFuYWdlciB9IGZyb20gXCIuLi8uLi9VSS9VSU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgRXF1aXBtZW50QXR0cmlidXRlTWFuYWdlciB9IGZyb20gXCIuLi9EYXRhL0VxdWlwbWVudEF0dHJpYnV0ZVwiO1xyXG5pbXBvcnQgeyBFcXVpcEluZm8gfSBmcm9tIFwiLi4vRXF1aXBDb25maWdcIjtcclxuaW1wb3J0IHsgIEVxdWlwbWVudE1hbmFnZXIgfSBmcm9tIFwiLi4vRXF1aXBtZW50TWFuYWdlclwiO1xyXG5cclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXF1aXBEYXRhSXRlbSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG5cclxuICAgIHVpX2VxdWlwX2luZm86RXF1aXBJbmZvPW51bGw7XHJcbiAgICBzZWxmX2VxdWlwX2luZm86RXF1aXBJbmZvPW51bGw7XHJcbiAgICB1aV9oZXJvX3R5cGU6SGVyb19UeXBlPUhlcm9fVHlwZS5OVUxMO1xyXG4gICAgc2VsZl9oZXJvX3R5cGU6SGVyb19UeXBlPUhlcm9fVHlwZS5OVUxMO1xyXG4gICAgY2xpY2tfY2FsbGJhY2s6RnVuY3Rpb249bnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlRnJhbWUpXHJcbiAgICBDb21tb25fQnRuOmNjLlNwcml0ZUZyYW1lW109W11cclxuXHJcbiAgICBpbml0KGVxdWlwSW5mbzpFcXVpcEluZm8sdWlFcXVpcElkOkVxdWlwSW5mbyxoZXJvVHlwZTpIZXJvX1R5cGUsY2xpY2tDYWxsYmFjazpGdW5jdGlvbixzZWxmSGVybzpIZXJvX1R5cGU9SGVyb19UeXBlLk5VTEwpe1xyXG4gICAgICAgIHRoaXMuc2VsZl9lcXVpcF9pbmZvPWVxdWlwSW5mbztcclxuICAgICAgICB0aGlzLnVpX2VxdWlwX2luZm89dWlFcXVpcElkO1xyXG4gICAgICAgIHRoaXMudWlfaGVyb190eXBlPWhlcm9UeXBlO1xyXG4gICAgICAgIHRoaXMuc2VsZl9oZXJvX3R5cGU9c2VsZkhlcm87XHJcbiAgICAgICAgdGhpcy5jbGlja19jYWxsYmFjaz1jbGlja0NhbGxiYWNrO1xyXG4gICAgICAgIHRoaXMuaW5pdERhdGEoKTtcclxuICAgICAgICB0aGlzLnJlZnJlc2hEYXRhKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdERhdGEoKXtcclxuICAgICAgICAvL+euoeeQhuWZqFxyXG4gICAgICAgIGxldCBMTT1MYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBsZXQgUE09UHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICAvL+Wbvuagh1xyXG4gICAgICAgIGxldCBpdGVtPUVxdWlwbWVudE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRFcXVpcE5vZGVCeUluZm8odGhpcy5zZWxmX2VxdWlwX2luZm8sUHJvcEFjdGlvbi5OdWxsLHRoaXMuc2VsZl9oZXJvX3R5cGUpO1xyXG4gICAgICAgIGl0ZW0uc2NhbGU9MC44XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdlcXVpcFJvb3QnKS5hZGRDaGlsZChpdGVtKTtcclxuICAgICAgICAvL+WQjeensFxyXG4gICAgICAgIGxldCBqc29uSXRlbT1JdGVtTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25JdGVtKHRoaXMuc2VsZl9lcXVpcF9pbmZvLmVxdWlwX2lkKTtcclxuICAgICAgICBsZXQgcHJvcE5hbWU9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdwcm9wTmFtZScpO1xyXG4gICAgICAgIHByb3BOYW1lLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPVwiW1wiK1BNLmdldFByb3BRdWFsaXR5TmFtZShqc29uSXRlbS5RdWFsaXR5KStcIl1cIitMTS5nZXRTdHJCeVRleHRJZChqc29uSXRlbS5OYW1lVGV4dElkKTtcclxuICAgICAgICBwcm9wTmFtZS5jb2xvcj1QTS5nZXRQcm9wUXVhbGl0eVRleHRDb2xvcihqc29uSXRlbS5RdWFsaXR5KTtcclxuICAgICAgICBsZXQgT3V0bGluZWNvbG9yPVtuZXcgY2MuQ29sb3IoMzksIDM1LCAyOCksbmV3IGNjLkNvbG9yKDI5LCA2MywgMjcpLG5ldyBjYy5Db2xvcigyNSwgNTUsIDg4KSxuZXcgY2MuQ29sb3IoNjYsIDM3LCA5NiksbmV3IGNjLkNvbG9yKDYyLCAzMiwgMCksbmV3IGNjLkNvbG9yKDc5LCAxNiwgMTUpXVxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiX19fX19fXCIsanNvbkl0ZW0uUXVhbGl0eSlcclxuICAgICAgICBwcm9wTmFtZS5nZXRDb21wb25lbnQoY2MuTGFiZWxPdXRsaW5lKS5jb2xvcj1PdXRsaW5lY29sb3JbKGpzb25JdGVtLlF1YWxpdHkpXVxyXG4gICAgICAgIC8v5oiY5Yqb5pWwXHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCd6aGFubGlOdW0nKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1FcXVpcG1lbnRNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RXF1aXBaaGFuTGkodGhpcy5zZWxmX2VxdWlwX2luZm8uZXF1aXBfaWQpK1wiXCIvL0VxdWlwbWVudE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRFcXVpcFpoYW5MaSh0aGlzLnNlbGZfZXF1aXBfaW5mbykrJyc7XHJcbiAgICB9XHJcblxyXG4gICAgcmVmcmVzaERhdGEoKXtcclxuICAgICAgICAvL+ijheWkh+eahOiLsembhFxyXG4gICAgICAgIGxldCBoZXJvVHlwZT10aGlzLnNlbGZfaGVyb190eXBlO1xyXG4gICAgICAgIGxldCBpc1dlYXI9aGVyb1R5cGUhPUhlcm9fVHlwZS5OVUxMO1xyXG4gICAgICAgIGlmKGhlcm9UeXBlIT1IZXJvX1R5cGUuTlVMTCl7XHJcbiAgICAgICAgICAgIGxldCBoZXJvSWNvbj10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2hlcm9JY29uJykuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICAgICAgICAgIGhlcm9JY29uLnNwcml0ZUZyYW1lPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb0ljb25iKGhlcm9UeXBlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdleEJnJykuYWN0aXZlPWlzV2VhcjtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2hlcm9JY29uJykuYWN0aXZlPWlzV2VhcjtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ0VxdWlwcGVkX0ljb24nKS5hY3RpdmU9aXNXZWFyO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnYnRuRXhjaGFuZ2UnKS5hY3RpdmU9aXNXZWFyO1xyXG4gICAgICAgIGxldCBidG5FcXVpcD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2J0bkVxdWlwJylcclxuICAgICAgICBidG5FcXVpcC5hY3RpdmU9IWlzV2VhcjtcclxuXHJcbiAgICAgICAgLy8gaWYodGhpcy51aV9lcXVpcF9pbmZvLmVxdWlwX2lkIT0wKXtcclxuICAgICAgICAvLyAgICAgYnRuRXF1aXAuZ2V0Q2hpbGRCeU5hbWUoXCJ0aXRsZUxhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbE91dGxpbmUpLmNvbG9yPW5ldyBjYy5Db2xvcigxMiw1Niw4NikvLy50b0hFWChcIiMwQzM4NTZcIilcclxuICAgICAgICAvLyAgICAgYnRuRXF1aXAuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWU9dGhpcy5Db21tb25fQnRuWzBdXHJcbiAgICAgICAgLy8gfWVsc2V7XHJcbiAgICAgICAgLy8gICAgIGJ0bkVxdWlwLmdldENoaWxkQnlOYW1lKFwidGl0bGVMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWxPdXRsaW5lKS5jb2xvcj1uZXcgY2MuQ29sb3IoMTA1LDU2LDIwKS8vLnRvSEVYKFwiIzY5MzgxNFwiKVxyXG4gICAgICAgIC8vICAgICBidG5FcXVpcC5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZT10aGlzLkNvbW1vbl9CdG5bMV1cclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcblxyXG4gICAgb25DbGlja0J0bkV4Y2hhbmdlKCl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBsZXQgb2xkQ29tYmF0ID0gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvWmhhbmxpKHRoaXMudWlfaGVyb190eXBlKTtcclxuICAgICAgICBsZXQgb2xkRGF0YSA9IEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RGVlcEhlcm9EYXRhKHRoaXMudWlfaGVyb190eXBlKTtcclxuICAgICAgICBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZFdlYXJFcXVpcG1lbnQodGhpcy51aV9oZXJvX3R5cGUsdGhpcy5zZWxmX2VxdWlwX2luZm8uZXF1aXBfaWQpO1xyXG4gICAgICAgIEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkV2VhckVxdWlwbWVudCh0aGlzLnNlbGZfaGVyb190eXBlLHRoaXMudWlfZXF1aXBfaW5mby5lcXVpcF9pZCxFcXVpcG1lbnRBdHRyaWJ1dGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RXF1aXBtZW50UG9zaXRpb24odGhpcy5zZWxmX2VxdWlwX2luZm8uZXF1aXBfaWQpKTtcclxuICAgICAgICBsZXQgbmV3Q29tYmF0ID0gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvWmhhbmxpKHRoaXMudWlfaGVyb190eXBlKTtcclxuICAgICAgICBsZXQgbmV3RGF0YSA9IEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RGVlcEhlcm9EYXRhKHRoaXMudWlfaGVyb190eXBlKTtcclxuICAgICAgICBpZihvbGRDb21iYXQgIT0gbmV3Q29tYmF0KXtcclxuICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0NvbWJhdENoYW5nZUVmZmVjdChvbGRDb21iYXQsbmV3Q29tYmF0LG9sZERhdGEsbmV3RGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuY2xpY2tfY2FsbGJhY2spe1xyXG4gICAgICAgICAgICB0aGlzLmNsaWNrX2NhbGxiYWNrKHRoaXMuc2VsZl9lcXVpcF9pbmZvLmVxdWlwX2lkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25DbGlja0J0bkVxdWlwKCl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgb2xkQ29tYmF0ID0gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvWmhhbmxpKHRoaXMudWlfaGVyb190eXBlKTtcclxuICAgICAgICBsZXQgb2xkRGF0YSA9IEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RGVlcEhlcm9EYXRhKHRoaXMudWlfaGVyb190eXBlKTtcclxuICAgICAgICBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZFdlYXJFcXVpcG1lbnQodGhpcy51aV9oZXJvX3R5cGUsdGhpcy5zZWxmX2VxdWlwX2luZm8uZXF1aXBfaWQpO1xyXG4gICAgICAgIGxldCBuZXdDb21iYXQgPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9aaGFubGkodGhpcy51aV9oZXJvX3R5cGUpO1xyXG4gICAgICAgIGxldCBuZXdEYXRhID0gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXREZWVwSGVyb0RhdGEodGhpcy51aV9oZXJvX3R5cGUpO1xyXG4gICAgICAgIGlmKG9sZENvbWJhdCAhPSBuZXdDb21iYXQpe1xyXG4gICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93Q29tYmF0Q2hhbmdlRWZmZWN0KG9sZENvbWJhdCxuZXdDb21iYXQsb2xkRGF0YSxuZXdEYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5jbGlja19jYWxsYmFjayl7XHJcbiAgICAgICAgICAgIHRoaXMuY2xpY2tfY2FsbGJhY2sodGhpcy5zZWxmX2VxdWlwX2luZm8uZXF1aXBfaWQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuIl19