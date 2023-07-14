
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Pet/Ui/PetExchangeUi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '68741516hdMBpVOYwzNir5S', 'PetExchangeUi');
// Scripts/Pet/Ui/PetExchangeUi.ts

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
var SpiritAttribute_1 = require("../Data/SpiritAttribute");
var PetConfig_1 = require("../PetConfig");
var PetManager_1 = require("../PetManager");
var PetDataItem_1 = require("./PetDataItem");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PetExchangeUi = /** @class */ (function (_super) {
    __extends(PetExchangeUi, _super);
    function PetExchangeUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.pet_data = null;
        _this.pet_id = null;
        _this.current_hero_type = HeroConfig_1.Hero_Type.NULL;
        return _this;
    }
    PetExchangeUi.prototype.initData = function (petId, heroType) {
        this.pet_id = petId;
        this.current_hero_type = heroType;
        this.refreshUi();
    };
    PetExchangeUi.prototype.refreshUi = function () {
        var _this = this;
        // let petList = PropManager.getInstance().getPetList();
        var content = this.node.getChildByName("scrollView").getComponent(cc.ScrollView).content;
        var curRoot = this.node.getChildByName('curRoot');
        var noWear = this.node.getChildByName('noWear');
        if (this.pet_id) {
            curRoot.active = true;
            noWear.active = false;
            this.node.getChildByName("bg").color.a = 200;
            this.node.getChildByName("titleLabel").getComponent(TextLanguage_1.default).setTextId(640024);
            //信息展示        
            //装备Item
            var item = PetManager_1.PetManager.getInstance().getPetNodeById(this.pet_id, PropConfig_1.PropAction.Null, this.current_hero_type);
            if (curRoot.getChildByName('propRoot').children.length > 0) {
                curRoot.getChildByName('propRoot').children[0].destroy();
            }
            curRoot.getChildByName('propRoot').addChild(item);
            //名称
            var jsonItem = Item_1.ItemManager.getInstance().getJsonItem(this.pet_id);
            var propName = curRoot.getChildByName('propName');
            propName.getComponent(cc.Label).string = "[" + PropManager_1.PropManager.getInstance().getPropQualityName(jsonItem.Quality) + "]" + LanguageManager_1.default.getInstance().getStrByTextId(jsonItem.NameTextId);
            propName.color = PropManager_1.PropManager.getInstance().getPropQualityTextColor(jsonItem.Quality);
            var Outlinecolor = [new cc.Color(39, 35, 28), new cc.Color(29, 63, 27), new cc.Color(25, 55, 88), new cc.Color(66, 37, 96), new cc.Color(62, 32, 0), new cc.Color(79, 16, 15)];
            // console.log("______",jsonItem.Quality)
            propName.getComponent(cc.LabelOutline).color = Outlinecolor[(jsonItem.Quality)];
            //战力数
            curRoot.getChildByName('zhanliNum').getComponent(cc.Label).string = PetManager_1.PetManager.getInstance().getPetZhanLi(this.pet_id) + "";
        }
        else {
            curRoot.active = false;
            noWear.active = true;
            this.node.getChildByName("bg").color.a = 128;
            this.node.getChildByName("titleLabel").getComponent(TextLanguage_1.default).setTextId(640023);
        }
        // 重新初始化所有
        content.removeAllChildren();
        var petList = PropManager_1.PropManager.getInstance().getPetList();
        var petMessage = new PetConfig_1.PetMessage();
        petMessage.pet_id = this.pet_id;
        petMessage.pet_num = 1;
        var temp1 = new Array();
        var temp2 = new Array();
        for (var i = 0; i < petList.length; i++) {
            var info = petList[i];
            var heroList = HeroManager_1.HeroManager.getInstance().getWearPetHeroList(info);
            var remainNum = info.pet_num - heroList.length;
            if (remainNum > 0) {
                var prop = new PetConfig_1.PetMessage();
                prop.pet_id = info.pet_id;
                prop.pet_num = remainNum;
                temp1.push({
                    equipInfo: prop,
                    heroType: HeroConfig_1.Hero_Type.NULL
                });
            }
            for (var n = 0; n < heroList.length; n++) {
                var heroType = heroList[n];
                if (heroType != this.current_hero_type) {
                    var prop = new PetConfig_1.PetMessage();
                    prop.pet_id = info.pet_id;
                    prop.pet_num = 1;
                    temp2.push({
                        equipInfo: prop,
                        heroType: heroType
                    });
                }
            }
        }
        temp1.sort(this.sort1);
        temp2.sort(this.sort1);
        var temp = new Array();
        temp = temp.concat(temp1, temp2);
        var _loop_1 = function (i) {
            var info = temp[i];
            // if(this.equip_info&&info.sequence_id==this.equip_info.sequence_id){
            //     continue;
            // }
            this_1.scheduleOnce(function () {
                var item = cc.instantiate(_this.pet_data);
                content.addChild(item);
                item.getComponent(PetDataItem_1.default).initData(info.equipInfo, petMessage, _this.current_hero_type, function (id) {
                    _super.prototype.onRefresh.call(_this, id);
                    _this.clickBtnClose();
                }, info.heroType);
            }, 0.02 * i);
        };
        var this_1 = this;
        for (var i = 0; i < temp.length; i++) {
            _loop_1(i);
        }
    };
    PetExchangeUi.prototype.clickBtnClose = function () {
        var content = this.node.getChildByName("scrollView").getComponent(cc.ScrollView).content;
        content.removeAllChildren();
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        _super.prototype.onClose.call(this);
    };
    PetExchangeUi.prototype.sort1 = function (a, b) {
        var infoA = SpiritAttribute_1.SpiritAttributeManager.getInstance().getJsonSpiritAttribute(a.equipInfo.pet_id);
        var infoB = SpiritAttribute_1.SpiritAttributeManager.getInstance().getJsonSpiritAttribute(b.equipInfo.pet_id);
        if (infoA.Stage != infoB.Stage) {
            return infoB.Stage - infoA.Stage;
        }
        else {
            // return this.sort2(a.equipInfo.pet_id,b.equipInfo.pet_id);
            return PetManager_1.PetManager.getInstance().getPetZhanLi(b.equipInfo.pet_id) - PetManager_1.PetManager.getInstance().getPetZhanLi(a.equipInfo.pet_id);
        }
    };
    PetExchangeUi.prototype.sort2 = function (a, b) {
        return PetManager_1.PetManager.getInstance().getPetZhanLi(a) - PetManager_1.PetManager.getInstance().getPetZhanLi(b);
    };
    __decorate([
        property(cc.Prefab)
    ], PetExchangeUi.prototype, "pet_data", void 0);
    PetExchangeUi = __decorate([
        ccclass
    ], PetExchangeUi);
    return PetExchangeUi;
}(UIComponent_1.default));
exports.default = PetExchangeUi;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcUGV0XFxVaVxcUGV0RXhjaGFuZ2VVaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpREFBNEM7QUFDNUMsMkRBQTBEO0FBQzFELHlEQUF1RDtBQUN2RCx1RUFBa0U7QUFDbEUsaUVBQTREO0FBQzVELDZDQUFtRDtBQUNuRCxvREFBbUQ7QUFDbkQsc0RBQXFEO0FBQ3JELDZEQUF3RDtBQUN4RCxvREFBK0M7QUFFL0MsMkRBQWlFO0FBQ2pFLDBDQUEwQztBQUMxQyw0Q0FBMkM7QUFDM0MsNkNBQXdDO0FBR2xDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQTJDLGlDQUFXO0lBQXREO1FBQUEscUVBNEhDO1FBekhHLGNBQVEsR0FBYSxJQUFJLENBQUM7UUFFMUIsWUFBTSxHQUFVLElBQUksQ0FBQztRQUNyQix1QkFBaUIsR0FBVSxzQkFBUyxDQUFDLElBQUksQ0FBQzs7SUFzSDlDLENBQUM7SUFwSEcsZ0NBQVEsR0FBUixVQUFTLEtBQVksRUFBQyxRQUFlO1FBQ2pDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxRQUFRLENBQUM7UUFDbEMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxpQ0FBUyxHQUFUO1FBQUEsaUJBc0ZDO1FBckZHLHdEQUF3RDtRQUN4RCxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQztRQUN6RixJQUFJLE9BQU8sR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNoRCxJQUFJ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QyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzVGLElBQUksS0FBSyxHQUFHLHdDQUFzQixDQUFDLFdBQVcsRUFBRSxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUYsSUFBRyxLQUFLLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxLQUFLLEVBQUM7WUFDMUIsT0FBTyxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7U0FDcEM7YUFBSTtZQUNELDREQUE0RDtZQUM1RCxPQUFPLHVCQUFVLENBQUMsV0FBVyxFQUFFLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsdUJBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQTtTQUMvSDtJQUNMLENBQUM7SUFFRCw2QkFBSyxHQUFMLFVBQU0sQ0FBUSxFQUFDLENBQVE7UUFDbkIsT0FBTyx1QkFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsR0FBRyx1QkFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMvRixDQUFDO0lBdkhEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7bURBQ007SUFIVCxhQUFhO1FBRGpDLE9BQU87T0FDYSxhQUFhLENBNEhqQztJQUFELG9CQUFDO0NBNUhELEFBNEhDLENBNUgwQyxxQkFBVyxHQTRIckQ7a0JBNUhvQixhQUFhIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi8uLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBIZXJvTWFuYWdlciB9IGZyb20gXCIuLi8uLi9IZXJvL0RhdGEvSGVyb01hbmFnZXJcIjtcclxuaW1wb3J0IHsgSGVyb19UeXBlIH0gZnJvbSBcIi4uLy4uL0hlcm8vR2FtZS9IZXJvQ29uZmlnXCI7XHJcbmltcG9ydCBMYW5ndWFnZU1hbmFnZXIgZnJvbSBcIi4uLy4uL211bHRpTGFuZ3VhZ2UvTGFuZ3VhZ2VNYW5hZ2VyXCI7XHJcbmltcG9ydCBUZXh0TGFuZ3VhZ2UgZnJvbSBcIi4uLy4uL211bHRpTGFuZ3VhZ2UvVGV4dExhbmd1YWdlXCI7XHJcbmltcG9ydCB7IEl0ZW1NYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL1Byb3AvRGF0YS9JdGVtXCI7XHJcbmltcG9ydCB7IFByb3BBY3Rpb24gfSBmcm9tIFwiLi4vLi4vUHJvcC9Qcm9wQ29uZmlnXCI7XHJcbmltcG9ydCB7IFByb3BNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL1Byb3AvUHJvcE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU291bmRJbmRleCB9IGZyb20gXCIuLi8uLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgVUlDb21wb25lbnQgZnJvbSBcIi4uLy4uL1VJL1VJQ29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFVpQWN0aW9uIH0gZnJvbSBcIi4uLy4uL1VJL1VpSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFNwaXJpdEF0dHJpYnV0ZU1hbmFnZXIgfSBmcm9tIFwiLi4vRGF0YS9TcGlyaXRBdHRyaWJ1dGVcIjtcclxuaW1wb3J0IHsgUGV0TWVzc2FnZSB9IGZyb20gXCIuLi9QZXRDb25maWdcIjtcclxuaW1wb3J0IHsgUGV0TWFuYWdlciB9IGZyb20gXCIuLi9QZXRNYW5hZ2VyXCI7XHJcbmltcG9ydCBQZXREYXRhSXRlbSBmcm9tIFwiLi9QZXREYXRhSXRlbVwiO1xyXG5cclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGV0RXhjaGFuZ2VVaSBleHRlbmRzIFVJQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgcGV0X2RhdGE6Y2MuUHJlZmFiID0gbnVsbDtcclxuXHJcbiAgICBwZXRfaWQ6bnVtYmVyID0gbnVsbDtcclxuICAgIGN1cnJlbnRfaGVyb190eXBlOm51bWJlciA9IEhlcm9fVHlwZS5OVUxMO1xyXG5cclxuICAgIGluaXREYXRhKHBldElkOm51bWJlcixoZXJvVHlwZTpudW1iZXIpe1xyXG4gICAgICAgIHRoaXMucGV0X2lkID0gcGV0SWQ7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50X2hlcm9fdHlwZSA9IGhlcm9UeXBlO1xyXG4gICAgICAgIHRoaXMucmVmcmVzaFVpKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVmcmVzaFVpKCl7XHJcbiAgICAgICAgLy8gbGV0IHBldExpc3QgPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFBldExpc3QoKTtcclxuICAgICAgICBsZXQgY29udGVudCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInNjcm9sbFZpZXdcIikuZ2V0Q29tcG9uZW50KGNjLlNjcm9sbFZpZXcpLmNvbnRlbnQ7XHJcbiAgICAgICAgbGV0IGN1clJvb3Q9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdjdXJSb290Jyk7XHJcbiAgICAgICAgbGV0IG5vV2Vhcj10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ25vV2VhcicpO1xyXG4gICAgICAgIGlmKHRoaXMucGV0X2lkKXtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGN1clJvb3QuYWN0aXZlPXRydWU7XHJcbiAgICAgICAgICAgIG5vV2Vhci5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLmNvbG9yLmE9MjAwXHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInRpdGxlTGFiZWxcIikuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0VGV4dElkKDY0MDAyNClcclxuICAgICAgICAgICAgLy/kv6Hmga/lsZXnpLogICAgICAgIFxyXG4gICAgICAgICAgICAvL+ijheWkh0l0ZW1cclxuICAgICAgICAgICAgbGV0IGl0ZW09UGV0TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFBldE5vZGVCeUlkKHRoaXMucGV0X2lkLFByb3BBY3Rpb24uTnVsbCx0aGlzLmN1cnJlbnRfaGVyb190eXBlKTtcclxuICAgICAgICAgICAgaWYoY3VyUm9vdC5nZXRDaGlsZEJ5TmFtZSgncHJvcFJvb3QnKS5jaGlsZHJlbi5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgICAgICBjdXJSb290LmdldENoaWxkQnlOYW1lKCdwcm9wUm9vdCcpLmNoaWxkcmVuWzBdLmRlc3Ryb3koKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGN1clJvb3QuZ2V0Q2hpbGRCeU5hbWUoJ3Byb3BSb290JykuYWRkQ2hpbGQoaXRlbSk7XHJcbiAgICAgICAgICAgIC8v5ZCN56ewXHJcbiAgICAgICAgICAgIGxldCBqc29uSXRlbT1JdGVtTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25JdGVtKHRoaXMucGV0X2lkKTtcclxuICAgICAgICAgICAgbGV0IHByb3BOYW1lPWN1clJvb3QuZ2V0Q2hpbGRCeU5hbWUoJ3Byb3BOYW1lJyk7XHJcbiAgICAgICAgICAgIHByb3BOYW1lLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPVwiW1wiK1Byb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcFF1YWxpdHlOYW1lKGpzb25JdGVtLlF1YWxpdHkpK1wiXVwiK0xhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKGpzb25JdGVtLk5hbWVUZXh0SWQpO1xyXG4gICAgICAgICAgICBwcm9wTmFtZS5jb2xvcj1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BRdWFsaXR5VGV4dENvbG9yKGpzb25JdGVtLlF1YWxpdHkpO1xyXG4gICAgICAgICAgICBsZXQgT3V0bGluZWNvbG9yPVtuZXcgY2MuQ29sb3IoMzksIDM1LCAyOCksbmV3IGNjLkNvbG9yKDI5LCA2MywgMjcpLG5ldyBjYy5Db2xvcigyNSwgNTUsIDg4KSxuZXcgY2MuQ29sb3IoNjYsIDM3LCA5NiksbmV3IGNjLkNvbG9yKDYyLCAzMiwgMCksbmV3IGNjLkNvbG9yKDc5LCAxNiwgMTUpXVxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIl9fX19fX1wiLGpzb25JdGVtLlF1YWxpdHkpXHJcbiAgICAgICAgICAgIHByb3BOYW1lLmdldENvbXBvbmVudChjYy5MYWJlbE91dGxpbmUpLmNvbG9yPU91dGxpbmVjb2xvclsoanNvbkl0ZW0uUXVhbGl0eSldXHJcbiAgICAgICAgICAgIC8v5oiY5Yqb5pWwXHJcbiAgICAgICAgICAgIGN1clJvb3QuZ2V0Q2hpbGRCeU5hbWUoJ3poYW5saU51bScpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPVBldE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQZXRaaGFuTGkodGhpcy5wZXRfaWQpK1wiXCI7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGN1clJvb3QuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICBub1dlYXIuYWN0aXZlPXRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLmNvbG9yLmE9MTI4XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInRpdGxlTGFiZWxcIikuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0VGV4dElkKDY0MDAyMylcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g6YeN5paw5Yid5aeL5YyW5omA5pyJXHJcbiAgICAgICAgY29udGVudC5yZW1vdmVBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgIGxldCBwZXRMaXN0ID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQZXRMaXN0KCk7XHJcbiAgICAgICAgbGV0IHBldE1lc3NhZ2U9bmV3IFBldE1lc3NhZ2UoKTtcclxuICAgICAgICBwZXRNZXNzYWdlLnBldF9pZD10aGlzLnBldF9pZDtcclxuICAgICAgICBwZXRNZXNzYWdlLnBldF9udW09MTtcclxuICAgICAgICBsZXQgdGVtcDE9bmV3IEFycmF5KCk7XHJcbiAgICAgICAgbGV0IHRlbXAyPW5ldyBBcnJheSgpO1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPHBldExpc3QubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgaW5mbz1wZXRMaXN0W2ldO1xyXG4gICAgICAgICAgICBsZXQgaGVyb0xpc3Q9SGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRXZWFyUGV0SGVyb0xpc3QoaW5mbyk7XHJcbiAgICAgICAgICAgIGxldCByZW1haW5OdW09aW5mby5wZXRfbnVtLWhlcm9MaXN0Lmxlbmd0aDtcclxuICAgICAgICAgICAgaWYocmVtYWluTnVtPjApe1xyXG4gICAgICAgICAgICAgICAgbGV0IHByb3A9bmV3IFBldE1lc3NhZ2UoKTtcclxuICAgICAgICAgICAgICAgIHByb3AucGV0X2lkPWluZm8ucGV0X2lkO1xyXG4gICAgICAgICAgICAgICAgcHJvcC5wZXRfbnVtPXJlbWFpbk51bTtcclxuICAgICAgICAgICAgICAgIHRlbXAxLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIGVxdWlwSW5mbzpwcm9wLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlcm9UeXBlOkhlcm9fVHlwZS5OVUxMXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvcihsZXQgbj0wOyBuPGhlcm9MaXN0Lmxlbmd0aDsgbisrKXtcclxuICAgICAgICAgICAgICAgIGxldCBoZXJvVHlwZT1oZXJvTGlzdFtuXTtcclxuICAgICAgICAgICAgICAgIGlmKGhlcm9UeXBlIT10aGlzLmN1cnJlbnRfaGVyb190eXBlKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcHJvcD1uZXcgUGV0TWVzc2FnZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHByb3AucGV0X2lkPWluZm8ucGV0X2lkO1xyXG4gICAgICAgICAgICAgICAgICAgIHByb3AucGV0X251bT0xO1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXAyLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlcXVpcEluZm86cHJvcCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVyb1R5cGU6aGVyb1R5cGVcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgdGVtcDEuc29ydCh0aGlzLnNvcnQxKTtcclxuICAgICAgICB0ZW1wMi5zb3J0KHRoaXMuc29ydDEpO1xyXG4gICAgICAgIGxldCB0ZW1wID0gbmV3IEFycmF5KCk7XHJcbiAgICAgICAgdGVtcCA9IHRlbXAuY29uY2F0KHRlbXAxLHRlbXAyKTtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTx0ZW1wLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IGluZm89dGVtcFtpXTtcclxuICAgICAgICAgICAgLy8gaWYodGhpcy5lcXVpcF9pbmZvJiZpbmZvLnNlcXVlbmNlX2lkPT10aGlzLmVxdWlwX2luZm8uc2VxdWVuY2VfaWQpe1xyXG4gICAgICAgICAgICAvLyAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgICAgIGxldCBpdGVtPWNjLmluc3RhbnRpYXRlKHRoaXMucGV0X2RhdGEpO1xyXG4gICAgICAgICAgICAgICAgY29udGVudC5hZGRDaGlsZChpdGVtKTtcclxuICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50KFBldERhdGFJdGVtKS5pbml0RGF0YShpbmZvLmVxdWlwSW5mbyxwZXRNZXNzYWdlLHRoaXMuY3VycmVudF9oZXJvX3R5cGUsKGlkOm51bWJlcik9PntcclxuICAgICAgICAgICAgICAgICAgICBzdXBlci5vblJlZnJlc2goaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xpY2tCdG5DbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgfSxpbmZvLmhlcm9UeXBlKTtcclxuICAgICAgICAgICAgfSwwLjAyKmkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgY2xpY2tCdG5DbG9zZSgpe1xyXG4gICAgICAgIGxldCBjb250ZW50ID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwic2Nyb2xsVmlld1wiKS5nZXRDb21wb25lbnQoY2MuU2Nyb2xsVmlldykuY29udGVudDtcclxuICAgICAgICBjb250ZW50LnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBzdXBlci5vbkNsb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc29ydDEoYTphbnksYjphbnkpOm51bWJlcntcclxuICAgICAgICBsZXQgaW5mb0EgPSBTcGlyaXRBdHRyaWJ1dGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvblNwaXJpdEF0dHJpYnV0ZShhLmVxdWlwSW5mby5wZXRfaWQpO1xyXG4gICAgICAgIGxldCBpbmZvQiA9IFNwaXJpdEF0dHJpYnV0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRKc29uU3Bpcml0QXR0cmlidXRlKGIuZXF1aXBJbmZvLnBldF9pZCk7XHJcbiAgICAgICAgaWYoaW5mb0EuU3RhZ2UgIT0gaW5mb0IuU3RhZ2Upe1xyXG4gICAgICAgICAgICByZXR1cm4gaW5mb0IuU3RhZ2UgLSBpbmZvQS5TdGFnZTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgLy8gcmV0dXJuIHRoaXMuc29ydDIoYS5lcXVpcEluZm8ucGV0X2lkLGIuZXF1aXBJbmZvLnBldF9pZCk7XHJcbiAgICAgICAgICAgIHJldHVybiBQZXRNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UGV0WmhhbkxpKGIuZXF1aXBJbmZvLnBldF9pZCkgLSBQZXRNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UGV0WmhhbkxpKGEuZXF1aXBJbmZvLnBldF9pZClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc29ydDIoYTpudW1iZXIsYjpudW1iZXIpOm51bWJlcntcclxuICAgICAgICByZXR1cm4gUGV0TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFBldFpoYW5MaShhKSAtIFBldE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQZXRaaGFuTGkoYik7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==