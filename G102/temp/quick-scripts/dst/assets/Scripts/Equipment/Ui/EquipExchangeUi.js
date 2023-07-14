
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Equipment/Ui/EquipExchangeUi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9454fEity1OL4V3xZ48T62O', 'EquipExchangeUi');
// Scripts/Equipment/Ui/EquipExchangeUi.ts

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
var TextLanguage_1 = require("../../multiLanguage/TextLanguage");
var Item_1 = require("../../Prop/Data/Item");
var PropConfig_1 = require("../../Prop/PropConfig");
var PropManager_1 = require("../../Prop/PropManager");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var UIComponent_1 = require("../../UI/UIComponent");
var EquipConfig_1 = require("../EquipConfig");
var EquipmentManager_1 = require("../EquipmentManager");
var EquipDataItem_1 = require("./EquipDataItem");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var EquipExchangeUi = /** @class */ (function (_super) {
    __extends(EquipExchangeUi, _super);
    function EquipExchangeUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.equip_data = null;
        _this.equip_id = null;
        _this.cur_hero_type = HeroConfig_1.Hero_Type.NULL;
        _this.equip_type = EquipConfig_1.EquipType.ShiPin;
        _this.ExchangeLevel = null;
        return _this;
    }
    EquipExchangeUi.prototype.initData = function (equipId, heroType, equipPos) {
        this.equip_id = equipId;
        this.cur_hero_type = heroType;
        this.equip_type = equipPos;
        this.initUi();
    };
    EquipExchangeUi.prototype.initUi = function () {
        for (var index = 0; index < this.node.getChildByName('scrollView').getComponent(cc.ScrollView).content.children.length; index++) {
            this.node.getChildByName('scrollView').getComponent(cc.ScrollView).content.children[index].destroy();
        }
        this.ExchangeLevel.active = false;
        var curRoot = this.node.getChildByName('curRoot');
        var noWear = this.node.getChildByName('noWear');
        if (this.equip_id) {
            curRoot.active = true;
            noWear.active = false;
            this.node.getChildByName("bg").color.a = 200;
            this.node.getChildByName("titleLabel").getComponent(TextLanguage_1.default).setTextId(180005);
            //信息展示        
            //装备Item
            var item = EquipmentManager_1.EquipmentManager.getInstance().getEquipNodeById(this.equip_id, PropConfig_1.PropAction.Null, this.cur_hero_type);
            if (curRoot.getChildByName('propRoot').children.length > 0) {
                curRoot.getChildByName('propRoot').children[0].destroy();
            }
            curRoot.getChildByName('propRoot').addChild(item);
            //名称
            var jsonItem = Item_1.ItemManager.getInstance().getJsonItem(this.equip_id);
            var propName = curRoot.getChildByName('propName');
            propName.getComponent(cc.Label).string = "[" + PropManager_1.PropManager.getInstance().getPropQualityName(jsonItem.Quality) + "]" + LanguageManager_1.default.getInstance().getStrByTextId(jsonItem.NameTextId);
            propName.color = PropManager_1.PropManager.getInstance().getPropQualityTextColor(jsonItem.Quality);
            var Outlinecolor = [new cc.Color(39, 35, 28), new cc.Color(29, 63, 27), new cc.Color(25, 55, 88), new cc.Color(66, 37, 96), new cc.Color(62, 32, 0), new cc.Color(79, 16, 15)];
            // console.log("______",jsonItem.Quality)
            propName.getComponent(cc.LabelOutline).color = Outlinecolor[(jsonItem.Quality)];
            //战力数
            curRoot.getChildByName('zhanliNum').getComponent(cc.Label).string = EquipmentManager_1.EquipmentManager.getInstance().getEquipZhanLi(this.equip_id) + ""; //EquipmentManager.getInstance().getEquipZhanLi(this.equip_info)+'';
        }
        else {
            curRoot.active = false;
            noWear.active = true;
            this.node.getChildByName("bg").color.a = 128;
            this.node.getChildByName("titleLabel").getComponent(TextLanguage_1.default).setTextId(180006);
        }
        this.loadEquipList();
    };
    EquipExchangeUi.prototype.loadEquipList = function () {
        var _this = this;
        var type = this.equip_type;
        var equipList = PropManager_1.PropManager.getInstance().getEquipmentList(type);
        // console.log("+++++++",equipList)
        var content = this.node.getChildByName('scrollView').getComponent(cc.ScrollView).content;
        //重组列表
        var uiEquipInfo = new EquipConfig_1.EquipInfo();
        uiEquipInfo.equip_id = this.equip_id;
        uiEquipInfo.equip_num = 1;
        var newList = new Array();
        for (var i = 0; i < equipList.length; i++) {
            var info = equipList[i];
            var heroList = HeroManager_1.HeroManager.getInstance().getWearEquipmentHeroList(info);
            var remainNum = info.equip_num - heroList.length;
            if (remainNum > 0) {
                var prop = new EquipConfig_1.EquipInfo();
                prop.equip_id = info.equip_id;
                prop.equip_num = remainNum;
                newList.push({
                    equipInfo: prop,
                    heroType: HeroConfig_1.Hero_Type.NULL
                });
            }
            for (var n = 0; n < heroList.length; n++) {
                var heroType = heroList[n];
                if (heroType != this.cur_hero_type) {
                    var prop = new EquipConfig_1.EquipInfo();
                    prop.equip_id = info.equip_id;
                    prop.equip_num = 1;
                    newList.push({
                        equipInfo: prop,
                        heroType: heroType
                    });
                }
            }
        }
        var _loop_1 = function (i) {
            var info = newList[i];
            // if(this.equip_info&&info.sequence_id==this.equip_info.sequence_id){
            //     continue;
            // }
            this_1.scheduleOnce(function () {
                var item = cc.instantiate(_this.equip_data);
                content.addChild(item);
                item.getComponent(EquipDataItem_1.default).init(info.equipInfo, uiEquipInfo, _this.cur_hero_type, function (id) {
                    _super.prototype.onRefresh.call(_this, id);
                    _this.clickBtnClose();
                }, info.heroType);
            }, 0.02 * i);
        };
        var this_1 = this;
        for (var i = 0; i < newList.length; i++) {
            _loop_1(i);
        }
    };
    EquipExchangeUi.prototype.clickBtnClose = function () {
        for (var index = 0; index < this.node.getChildByName('scrollView').getComponent(cc.ScrollView).content.children.length; index++) {
            this.node.getChildByName('scrollView').getComponent(cc.ScrollView).content.children[index].destroy();
        }
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        _super.prototype.onClose.call(this);
    };
    __decorate([
        property(cc.Prefab)
    ], EquipExchangeUi.prototype, "equip_data", void 0);
    __decorate([
        property(cc.Node)
    ], EquipExchangeUi.prototype, "ExchangeLevel", void 0);
    EquipExchangeUi = __decorate([
        ccclass
    ], EquipExchangeUi);
    return EquipExchangeUi;
}(UIComponent_1.default));
exports.default = EquipExchangeUi;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcRXF1aXBtZW50XFxVaVxcRXF1aXBFeGNoYW5nZVVpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlEQUE0QztBQUM1QywyREFBMEQ7QUFDMUQseURBQXVEO0FBQ3ZELHVFQUFrRTtBQUNsRSxpRUFBNEQ7QUFDNUQsNkNBQW1EO0FBQ25ELG9EQUFtRDtBQUNuRCxzREFBcUQ7QUFDckQsNkRBQXdEO0FBQ3hELG9EQUErQztBQUMvQyw4Q0FBc0Q7QUFDdEQsd0RBQXdEO0FBQ3hELGlEQUE0QztBQUd0QyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUE2QyxtQ0FBVztJQUF4RDtRQUFBLHFFQXVIQztRQXBIRyxnQkFBVSxHQUFXLElBQUksQ0FBQztRQUUxQixjQUFRLEdBQVEsSUFBSSxDQUFDO1FBQ3JCLG1CQUFhLEdBQVcsc0JBQVMsQ0FBQyxJQUFJLENBQUM7UUFDdkMsZ0JBQVUsR0FBVyx1QkFBUyxDQUFDLE1BQU0sQ0FBQztRQUd0QyxtQkFBYSxHQUFTLElBQUksQ0FBQzs7SUE2Ry9CLENBQUM7SUExR0csa0NBQVEsR0FBUixVQUFTLE9BQWMsRUFBQyxRQUFrQixFQUFDLFFBQWtCO1FBQ3pELElBQUksQ0FBQyxRQUFRLEdBQUMsT0FBTyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxhQUFhLEdBQUMsUUFBUSxDQUFDO1FBQzVCLElBQUksQ0FBQyxVQUFVLEdBQUMsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBRUQsZ0NBQU0sR0FBTjtRQUNJLEtBQUssSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxD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SUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUM3SCxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUE7U0FDdkc7UUFDRCxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsMkJBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwRSxpQkFBTSxPQUFPLFdBQUUsQ0FBQztJQUNwQixDQUFDO0lBbkhEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7dURBQ007SUFPMUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzswREFDUztJQVZWLGVBQWU7UUFEbkMsT0FBTztPQUNhLGVBQWUsQ0F1SG5DO0lBQUQsc0JBQUM7Q0F2SEQsQUF1SEMsQ0F2SDRDLHFCQUFXLEdBdUh2RDtrQkF2SG9CLGVBQWUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uLy4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEhlcm9NYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0hlcm8vRGF0YS9IZXJvTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBIZXJvX1R5cGUgfSBmcm9tIFwiLi4vLi4vSGVyby9HYW1lL0hlcm9Db25maWdcIjtcclxuaW1wb3J0IExhbmd1YWdlTWFuYWdlciBmcm9tIFwiLi4vLi4vbXVsdGlMYW5ndWFnZS9MYW5ndWFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IFRleHRMYW5ndWFnZSBmcm9tIFwiLi4vLi4vbXVsdGlMYW5ndWFnZS9UZXh0TGFuZ3VhZ2VcIjtcclxuaW1wb3J0IHsgSXRlbU1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vUHJvcC9EYXRhL0l0ZW1cIjtcclxuaW1wb3J0IHsgUHJvcEFjdGlvbiB9IGZyb20gXCIuLi8uLi9Qcm9wL1Byb3BDb25maWdcIjtcclxuaW1wb3J0IHsgUHJvcE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vUHJvcC9Qcm9wTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTb3VuZEluZGV4IH0gZnJvbSBcIi4uLy4uL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBVSUNvbXBvbmVudCBmcm9tIFwiLi4vLi4vVUkvVUlDb21wb25lbnRcIjtcclxuaW1wb3J0IHsgRXF1aXBJbmZvLCBFcXVpcFR5cGUgfSBmcm9tIFwiLi4vRXF1aXBDb25maWdcIjtcclxuaW1wb3J0IHsgIEVxdWlwbWVudE1hbmFnZXIgfSBmcm9tIFwiLi4vRXF1aXBtZW50TWFuYWdlclwiO1xyXG5pbXBvcnQgRXF1aXBEYXRhSXRlbSBmcm9tIFwiLi9FcXVpcERhdGFJdGVtXCI7XHJcblxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFcXVpcEV4Y2hhbmdlVWkgZXh0ZW5kcyBVSUNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIGVxdWlwX2RhdGE6Y2MuUHJlZmFiPW51bGw7XHJcblxyXG4gICAgZXF1aXBfaWQ6bnVtYmVyPW51bGw7XHJcbiAgICBjdXJfaGVyb190eXBlOkhlcm9fVHlwZT1IZXJvX1R5cGUuTlVMTDtcclxuICAgIGVxdWlwX3R5cGU6RXF1aXBUeXBlPUVxdWlwVHlwZS5TaGlQaW47XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBFeGNoYW5nZUxldmVsOmNjLk5vZGU9bnVsbDtcclxuICAgIFxyXG5cclxuICAgIGluaXREYXRhKGVxdWlwSWQ6bnVtYmVyLGhlcm9UeXBlOkhlcm9fVHlwZSxlcXVpcFBvczpFcXVpcFR5cGUpe1xyXG4gICAgICAgIHRoaXMuZXF1aXBfaWQ9ZXF1aXBJZDtcclxuICAgICAgICB0aGlzLmN1cl9oZXJvX3R5cGU9aGVyb1R5cGU7XHJcbiAgICAgICAgdGhpcy5lcXVpcF90eXBlPWVxdWlwUG9zO1xyXG4gICAgICAgIHRoaXMuaW5pdFVpKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGluaXRVaSgpe1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3Njcm9sbFZpZXcnKS5nZXRDb21wb25lbnQoY2MuU2Nyb2xsVmlldykuY29udGVudC5jaGlsZHJlbi5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdzY3JvbGxWaWV3JykuZ2V0Q29tcG9uZW50KGNjLlNjcm9sbFZpZXcpLmNvbnRlbnQuY2hpbGRyZW5baW5kZXhdLmRlc3Ryb3koKVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLkV4Y2hhbmdlTGV2ZWwuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgbGV0IGN1clJvb3Q9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdjdXJSb290Jyk7XHJcbiAgICAgICAgbGV0IG5vV2Vhcj10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ25vV2VhcicpO1xyXG4gICAgICAgIGlmKHRoaXMuZXF1aXBfaWQpe1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY3VyUm9vdC5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAgICAgbm9XZWFyLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYmdcIikuY29sb3IuYT0yMDBcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwidGl0bGVMYWJlbFwiKS5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zZXRUZXh0SWQoMTgwMDA1KVxyXG4gICAgICAgICAgICAvL+S/oeaBr+WxleekuiAgICAgICAgXHJcbiAgICAgICAgICAgIC8v6KOF5aSHSXRlbVxyXG4gICAgICAgICAgICBsZXQgaXRlbT1FcXVpcG1lbnRNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RXF1aXBOb2RlQnlJZCh0aGlzLmVxdWlwX2lkLFByb3BBY3Rpb24uTnVsbCx0aGlzLmN1cl9oZXJvX3R5cGUpO1xyXG4gICAgICAgICAgICBpZihjdXJSb290LmdldENoaWxkQnlOYW1lKCdwcm9wUm9vdCcpLmNoaWxkcmVuLmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgICAgIGN1clJvb3QuZ2V0Q2hpbGRCeU5hbWUoJ3Byb3BSb290JykuY2hpbGRyZW5bMF0uZGVzdHJveSgpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY3VyUm9vdC5nZXRDaGlsZEJ5TmFtZSgncHJvcFJvb3QnKS5hZGRDaGlsZChpdGVtKTtcclxuICAgICAgICAgICAgLy/lkI3np7BcclxuICAgICAgICAgICAgbGV0IGpzb25JdGVtPUl0ZW1NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvbkl0ZW0odGhpcy5lcXVpcF9pZCk7XHJcbiAgICAgICAgICAgIGxldCBwcm9wTmFtZT1jdXJSb290LmdldENoaWxkQnlOYW1lKCdwcm9wTmFtZScpO1xyXG4gICAgICAgICAgICBwcm9wTmFtZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1cIltcIitQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BRdWFsaXR5TmFtZShqc29uSXRlbS5RdWFsaXR5KStcIl1cIitMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZChqc29uSXRlbS5OYW1lVGV4dElkKTtcclxuICAgICAgICAgICAgcHJvcE5hbWUuY29sb3I9UHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wUXVhbGl0eVRleHRDb2xvcihqc29uSXRlbS5RdWFsaXR5KTtcclxuICAgICAgICAgICAgbGV0IE91dGxpbmVjb2xvcj1bbmV3IGNjLkNvbG9yKDM5LCAzNSwgMjgpLG5ldyBjYy5Db2xvcigyOSwgNjMsIDI3KSxuZXcgY2MuQ29sb3IoMjUsIDU1LCA4OCksbmV3IGNjLkNvbG9yKDY2LCAzNywgOTYpLG5ldyBjYy5Db2xvcig2MiwgMzIsIDApLG5ldyBjYy5Db2xvcig3OSwgMTYsIDE1KV1cclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJfX19fX19cIixqc29uSXRlbS5RdWFsaXR5KVxyXG4gICAgICAgICAgICBwcm9wTmFtZS5nZXRDb21wb25lbnQoY2MuTGFiZWxPdXRsaW5lKS5jb2xvcj1PdXRsaW5lY29sb3JbKGpzb25JdGVtLlF1YWxpdHkpXVxyXG4gICAgICAgICAgICAvL+aImOWKm+aVsFxyXG4gICAgICAgICAgICBjdXJSb290LmdldENoaWxkQnlOYW1lKCd6aGFubGlOdW0nKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1FcXVpcG1lbnRNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RXF1aXBaaGFuTGkodGhpcy5lcXVpcF9pZCkrXCJcIi8vRXF1aXBtZW50TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEVxdWlwWmhhbkxpKHRoaXMuZXF1aXBfaW5mbykrJyc7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGN1clJvb3QuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICBub1dlYXIuYWN0aXZlPXRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLmNvbG9yLmE9MTI4XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInRpdGxlTGFiZWxcIikuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0VGV4dElkKDE4MDAwNilcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5sb2FkRXF1aXBMaXN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbG9hZEVxdWlwTGlzdCgpe1xyXG4gICAgICAgIGxldCB0eXBlPXRoaXMuZXF1aXBfdHlwZTtcclxuICAgICAgICBsZXQgZXF1aXBMaXN0PVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RXF1aXBtZW50TGlzdCh0eXBlKTsgICAgICAgIFxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiKysrKysrK1wiLGVxdWlwTGlzdClcclxuICAgICAgICBsZXQgY29udGVudD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3Njcm9sbFZpZXcnKS5nZXRDb21wb25lbnQoY2MuU2Nyb2xsVmlldykuY29udGVudDtcclxuICAgICAgICAvL+mHjee7hOWIl+ihqFxyXG4gICAgICAgIGxldCB1aUVxdWlwSW5mbz1uZXcgRXF1aXBJbmZvKCk7XHJcbiAgICAgICAgdWlFcXVpcEluZm8uZXF1aXBfaWQ9dGhpcy5lcXVpcF9pZDtcclxuICAgICAgICB1aUVxdWlwSW5mby5lcXVpcF9udW09MTtcclxuICAgICAgICBsZXQgbmV3TGlzdD1uZXcgQXJyYXkoKTtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTxlcXVpcExpc3QubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgaW5mbz1lcXVpcExpc3RbaV07XHJcbiAgICAgICAgICAgIGxldCBoZXJvTGlzdD1IZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFdlYXJFcXVpcG1lbnRIZXJvTGlzdChpbmZvKTtcclxuICAgICAgICAgICAgbGV0IHJlbWFpbk51bT1pbmZvLmVxdWlwX251bS1oZXJvTGlzdC5sZW5ndGg7XHJcbiAgICAgICAgICAgIGlmKHJlbWFpbk51bT4wKXtcclxuICAgICAgICAgICAgICAgIGxldCBwcm9wPW5ldyBFcXVpcEluZm8oKTtcclxuICAgICAgICAgICAgICAgIHByb3AuZXF1aXBfaWQ9aW5mby5lcXVpcF9pZDtcclxuICAgICAgICAgICAgICAgIHByb3AuZXF1aXBfbnVtPXJlbWFpbk51bTtcclxuICAgICAgICAgICAgICAgIG5ld0xpc3QucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZXF1aXBJbmZvOnByb3AsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVyb1R5cGU6SGVyb19UeXBlLk5VTExcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yKGxldCBuPTA7IG48aGVyb0xpc3QubGVuZ3RoOyBuKyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IGhlcm9UeXBlPWhlcm9MaXN0W25dO1xyXG4gICAgICAgICAgICAgICAgaWYoaGVyb1R5cGUhPXRoaXMuY3VyX2hlcm9fdHlwZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHByb3A9bmV3IEVxdWlwSW5mbygpO1xyXG4gICAgICAgICAgICAgICAgICAgIHByb3AuZXF1aXBfaWQ9aW5mby5lcXVpcF9pZDtcclxuICAgICAgICAgICAgICAgICAgICBwcm9wLmVxdWlwX251bT0xO1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld0xpc3QucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVxdWlwSW5mbzpwcm9wLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZXJvVHlwZTpoZXJvVHlwZVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IobGV0IGk9MDsgaTxuZXdMaXN0Lmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IGluZm89bmV3TGlzdFtpXTtcclxuICAgICAgICAgICAgLy8gaWYodGhpcy5lcXVpcF9pbmZvJiZpbmZvLnNlcXVlbmNlX2lkPT10aGlzLmVxdWlwX2luZm8uc2VxdWVuY2VfaWQpe1xyXG4gICAgICAgICAgICAvLyAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgICAgIGxldCBpdGVtPWNjLmluc3RhbnRpYXRlKHRoaXMuZXF1aXBfZGF0YSk7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50LmFkZENoaWxkKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgaXRlbS5nZXRDb21wb25lbnQoRXF1aXBEYXRhSXRlbSkuaW5pdChpbmZvLmVxdWlwSW5mbyx1aUVxdWlwSW5mbyx0aGlzLmN1cl9oZXJvX3R5cGUsKGlkOm51bWJlcik9PntcclxuICAgICAgICAgICAgICAgICAgICBzdXBlci5vblJlZnJlc2goaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xpY2tCdG5DbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgfSxpbmZvLmhlcm9UeXBlKTtcclxuICAgICAgICAgICAgfSwwLjAyKmkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgY2xpY2tCdG5DbG9zZSgpe1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdzY3JvbGxWaWV3JykuZ2V0Q29tcG9uZW50KGNjLlNjcm9sbFZpZXcpLmNvbnRlbnQuY2hpbGRyZW4ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnc2Nyb2xsVmlldycpLmdldENvbXBvbmVudChjYy5TY3JvbGxWaWV3KS5jb250ZW50LmNoaWxkcmVuW2luZGV4XS5kZXN0cm95KClcclxuICAgICAgICB9XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBzdXBlci5vbkNsb3NlKCk7XHJcbiAgICB9XHJcbn1cclxuIl19