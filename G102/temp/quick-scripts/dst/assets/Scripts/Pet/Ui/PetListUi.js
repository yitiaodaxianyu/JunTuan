
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Pet/Ui/PetListUi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'bfae5OapY9NQp7KKNnXc1cB', 'PetListUi');
// Scripts/Pet/Ui/PetListUi.ts

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
var FollowConstants_1 = require("../../multiLanguage/FollowConstants");
var FollowManager_1 = require("../../multiLanguage/FollowManager");
var LanguageManager_1 = require("../../multiLanguage/LanguageManager");
var TakeEggUi_1 = require("../../TakeEgg/TakeEggUi");
var UIConfig_1 = require("../../UI/UIConfig");
var UIManager_1 = require("../../UI/UIManager");
var PetConfig_1 = require("../PetConfig");
// import PetItem from "./PetItem";
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PetListState;
(function (PetListState) {
    PetListState[PetListState["List"] = 0] = "List";
    PetListState[PetListState["SetFree"] = 1] = "SetFree";
})(PetListState || (PetListState = {}));
var PetListUi = /** @class */ (function (_super) {
    __extends(PetListUi, _super);
    function PetListUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.item = null;
        _this.pet_list_ui = null;
        _this.state = PetConfig_1.PetType.All;
        _this.all_list = null;
        _this.power_list = null;
        _this.agile_list = null;
        _this.intelligence_list = null;
        _this.pet_list_state = PetListState.List;
        _this.choose_list = null;
        _this.content = null;
        return _this;
    }
    PetListUi.prototype.onLoad = function () {
        this.node.on(cc.Node.EventType.POSITION_CHANGED, this.onPositionChange, this);
    };
    PetListUi.prototype.onDestroy = function () {
        this.node.off(cc.Node.EventType.POSITION_CHANGED, this.onPositionChange, this);
    };
    PetListUi.prototype.onPositionChange = function () {
        if (this.node.x == 0) {
            this.onEnable();
        }
    };
    PetListUi.prototype.onEnable = function () {
        this.content = this.node.getChildByName("scroll0").getComponent(cc.ScrollView).content;
        this.choose_list = new Map();
        this.refreshUi();
        this.refreshScroll();
        //GameManager.getInstance().music_manager.playMusic(MusicIndex.BGM_Pets);
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.宠物界面点击次数);
    };
    PetListUi.prototype.refreshUi = function () {
        // this.node.getChildByName("selectTypeBg").getChildByName("selectTypeBg").setPosition(this.node.getChildByName("type" + this.state).position)
        var bottom = this.node.getChildByName("bottom");
        this.node.getChildByName("top").getChildByName("titleLabel").getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(640002);
        bottom.getChildByName("Sprite_Btn_Tab_0").getComponentInChildren(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(640008);
        bottom.getChildByName("Sprite_Btn_Tab_1").getComponentInChildren(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(640002);
        bottom.getChildByName("Sprite_Btn_Tab_2").getComponentInChildren(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(640017);
        bottom.getChildByName("Release_Bg_1").getChildByName("num").getComponent(cc.Label).string = this.choose_list.size + "/100";
    };
    PetListUi.prototype.refreshScroll = function () {
        var _this = this;
        this.all_list = new Array();
        this.power_list = new Array();
        this.agile_list = new Array();
        this.intelligence_list = new Array();
        this.content.removeAllChildren();
        // this.all_list = PetManager.getInstance().getPetList();
        for (var i = 0; i < this.all_list.length; i++) {
            // let type = SpiritMessageManager.getInstance().getSpiritType(this.all_list[i].pet_id);
            // if (type == PetType.Power) {
            //     this.power_list.push(this.all_list[i]);
            // } else if (type == PetType.Agile) {
            //     this.agile_list.push(this.all_list[i]);
            // } else {
            //     this.intelligence_list.push(this.all_list[i]);
            // }
        }
        var tempList;
        switch (this.state) {
            case PetConfig_1.PetType.All:
                tempList = this.all_list;
                break;
            case PetConfig_1.PetType.Power:
                tempList = this.power_list;
                break;
            case PetConfig_1.PetType.Agile:
                tempList = this.agile_list;
                break;
            case PetConfig_1.PetType.Intelligence:
                tempList = this.intelligence_list;
                break;
        }
        var _loop_1 = function (i) {
            if (this_1.pet_list_state == PetListState.List) {
                var item = cc.instantiate(this_1.item);
                // item.getComponent(PetItem).init(tempList[i]);
                item.setParent(this_1.content);
                item.on(cc.Node.EventType.TOUCH_END, function () {
                    UIManager_1.UIManager.getInstance().showPetUpgradeUi({
                        onClose: function () {
                            _this.refreshScroll();
                        }
                    }, tempList[i]);
                });
            }
            else {
                var item = cc.instantiate(this_1.item);
                // item.getComponent(PetItem).init(tempList[i]);
                var kuang = new cc.Node();
                kuang.addComponent(cc.Sprite).spriteFrame = this_1.pet_list_ui.getSpriteFrame("Release_Checkmark_Bg");
                kuang.setPosition(cc.v2(-item.width / 2, item.height / 2));
                item.addChild(kuang);
                if (this_1.choose_list.has(tempList[i].sequence_id)) {
                    var gou = new cc.Node();
                    gou.addComponent(cc.Sprite).spriteFrame = this_1.pet_list_ui.getSpriteFrame("Release_Checkmark");
                    gou.setPosition(cc.v2(-item.width / 2, item.height / 2));
                    item.addChild(gou);
                }
                item.setParent(this_1.content);
                item.on(cc.Node.EventType.TOUCH_END, this_1.onClickSetFreePet.bind(this_1));
            }
        };
        var this_1 = this;
        for (var i = 0; i < tempList.length; i++) {
            _loop_1(i);
        }
    };
    PetListUi.prototype.onSelectBtnClick = function (e, type) {
        this.state = Number(type);
        this.refreshUi();
        for (var i = 0; i < 4; i++) {
            var scroll = this.node.getChildByName("scroll" + i);
            scroll.active = false;
            if (i == this.state) {
                scroll.active = true;
                this.content = scroll.getComponent(cc.ScrollView).content;
            }
        }
        var tempList;
        switch (this.state) {
            case PetConfig_1.PetType.All:
                tempList = this.all_list;
                break;
            case PetConfig_1.PetType.Power:
                tempList = this.power_list;
                break;
            case PetConfig_1.PetType.Agile:
                tempList = this.agile_list;
                break;
            case PetConfig_1.PetType.Intelligence:
                tempList = this.intelligence_list;
                break;
        }
        if (this.content.childrenCount != tempList.length) {
            this.refreshScroll();
        }
    };
    PetListUi.prototype.onClickSetFreePet = function (e) {
        // if (this.choose_list.has(e.target.getComponent(PetItem).pet_info.sequence_id)) {
        //         this.choose_list.delete(e.target.getComponent(PetItem).pet_info.sequence_id)
        // }
        // else{
        //     this.choose_list.set(e.target.getComponent(PetItem).pet_info.sequence_id,e.target.getComponent(PetItem).pet_info);
        // }
        this.refreshScroll();
    };
    PetListUi.prototype.onClickGetBtn = function () {
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.从宠物界面点击获取的次数);
        // UIManager.getInstance().showTakeEggUi(null);
        UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.TakeEgg, UIConfig_1.UILayerLevel.One, { onCompleted: function (uiNode) {
                uiNode.getComponent(TakeEggUi_1.default).init(null);
            }, });
    };
    PetListUi.prototype.onClickSetFreePetBtn = function () {
        var bottom = this.node.getChildByName("bottom");
        this.pet_list_state = PetListState.SetFree;
        bottom.getChildByName("Release_Bg_1").active = true;
        bottom.getChildByName("Sprite_Btn_Tab_1").getComponent(cc.Sprite).spriteFrame = this.pet_list_ui.getSpriteFrame("Sprite_Btn_Tab_0");
        bottom.getChildByName("Sprite_Btn_Tab_0").getComponent(cc.Sprite).spriteFrame = this.pet_list_ui.getSpriteFrame("Sprite_Btn_Tab_1");
        this.refreshUi();
        this.refreshScroll();
    };
    PetListUi.prototype.onClickPetBtn = function () {
        var bottom = this.node.getChildByName("bottom");
        this.pet_list_state = PetListState.List;
        bottom.getChildByName("Release_Bg_1").active = false;
        bottom.getChildByName("Sprite_Btn_Tab_1").getComponent(cc.Sprite).spriteFrame = this.pet_list_ui.getSpriteFrame("Sprite_Btn_Tab_1");
        bottom.getChildByName("Sprite_Btn_Tab_0").getComponent(cc.Sprite).spriteFrame = this.pet_list_ui.getSpriteFrame("Sprite_Btn_Tab_0");
        this.refreshUi();
        this.refreshScroll();
    };
    PetListUi.prototype.onClickSetFreeBtn = function () {
        var _this = this;
        if (this.choose_list.size == 0)
            return;
        var tempList = [];
        this.choose_list.forEach(function (v, k) {
            tempList.push(v);
        });
        UIManager_1.UIManager.getInstance().showPetSetFreeUi({
            onClose: (function () {
                _this.refreshUi();
                _this.refreshScroll();
            }).bind(this),
        }, tempList);
    };
    __decorate([
        property(cc.Prefab)
    ], PetListUi.prototype, "item", void 0);
    __decorate([
        property(cc.SpriteAtlas)
    ], PetListUi.prototype, "pet_list_ui", void 0);
    PetListUi = __decorate([
        ccclass
    ], PetListUi);
    return PetListUi;
}(cc.Component));
exports.default = PetListUi;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcUGV0XFxVaVxcUGV0TGlzdFVpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHVFQUFrRTtBQUNsRSxtRUFBOEQ7QUFDOUQsdUVBQWtFO0FBRWxFLHFEQUFnRDtBQUNoRCw4Q0FBeUQ7QUFDekQsZ0RBQStDO0FBQy9DLDBDQUFnRDtBQUdoRCxtQ0FBbUM7QUFFN0IsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFFNUMsSUFBSyxZQUdKO0FBSEQsV0FBSyxZQUFZO0lBQ2IsK0NBQVEsQ0FBQTtJQUNSLHFEQUFXLENBQUE7QUFDZixDQUFDLEVBSEksWUFBWSxLQUFaLFlBQVksUUFHaEI7QUFHRDtJQUF1Qyw2QkFBWTtJQUFuRDtRQUFBLHFFQXNNQztRQW5NRyxVQUFJLEdBQWEsSUFBSSxDQUFDO1FBRXRCLGlCQUFXLEdBQWtCLElBQUksQ0FBQztRQUUxQixXQUFLLEdBQVksbUJBQU8sQ0FBQyxHQUFHLENBQUM7UUFDN0IsY0FBUSxHQUFjLElBQUksQ0FBQztRQUMzQixnQkFBVSxHQUFjLElBQUksQ0FBQztRQUM3QixnQkFBVSxHQUFjLElBQUksQ0FBQztRQUM3Qix1QkFBaUIsR0FBYyxJQUFJLENBQUM7UUFDcEMsb0JBQWMsR0FBZ0IsWUFBWSxDQUFDLElBQUksQ0FBQztRQUNoRCxpQkFBVyxHQUF5QixJQUFJLENBQUM7UUFFekMsYUFBTyxHQUFZLElBQUksQ0FBQzs7SUF1THBDLENBQUM7SUFyTEcsMEJBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixFQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBQyxJQUFJLENBQUMsQ0FBQztJQUNoRixDQUFDO0lBRVMsNkJBQVMsR0FBbkI7UUFDSSxJ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SSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsVUFBQyxDQUFDLEVBQUMsQ0FBQztZQUN6QixRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxDQUFDO1FBQ0gscUJBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQztZQUNyQyxPQUFPLEVBQUMsQ0FBQztnQkFDTCxLQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQ2pCLEtBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUN6QixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1NBQ2hCLEVBQUMsUUFBUSxDQUFDLENBQUM7SUFDaEIsQ0FBQztJQWpNRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOzJDQUNFO0lBRXRCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7a0RBQ1M7SUFMakIsU0FBUztRQUQ3QixPQUFPO09BQ2EsU0FBUyxDQXNNN0I7SUFBRCxnQkFBQztDQXRNRCxBQXNNQyxDQXRNc0MsRUFBRSxDQUFDLFNBQVMsR0FzTWxEO2tCQXRNb0IsU0FBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgRm9sbG93X1R5cGUgfSBmcm9tIFwiLi4vLi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dDb25zdGFudHNcIjtcclxuaW1wb3J0IEZvbGxvd01hbmFnZXIgZnJvbSBcIi4uLy4uL211bHRpTGFuZ3VhZ2UvRm9sbG93TWFuYWdlclwiO1xyXG5pbXBvcnQgTGFuZ3VhZ2VNYW5hZ2VyIGZyb20gXCIuLi8uLi9tdWx0aUxhbmd1YWdlL0xhbmd1YWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBNdXNpY0luZGV4IH0gZnJvbSBcIi4uLy4uL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBUYWtlRWdnVWkgZnJvbSBcIi4uLy4uL1Rha2VFZ2cvVGFrZUVnZ1VpXCI7XHJcbmltcG9ydCB7IFVJTGF5ZXJMZXZlbCwgVUlQYXRoIH0gZnJvbSBcIi4uLy4uL1VJL1VJQ29uZmlnXCI7XHJcbmltcG9ydCB7IFVJTWFuYWdlciB9IGZyb20gXCIuLi8uLi9VSS9VSU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgUGV0SW5mbywgUGV0VHlwZSB9IGZyb20gXCIuLi9QZXRDb25maWdcIjtcclxuaW1wb3J0IHsgUGV0TWFuYWdlciB9IGZyb20gXCIuLi9QZXRNYW5hZ2VyXCI7XHJcbmltcG9ydCBCdG5QZXQgZnJvbSBcIi4vQnRuUGV0XCI7XHJcbi8vIGltcG9ydCBQZXRJdGVtIGZyb20gXCIuL1BldEl0ZW1cIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5lbnVtIFBldExpc3RTdGF0ZXtcclxuICAgIExpc3QgPSAwLFxyXG4gICAgU2V0RnJlZSA9IDFcclxufVxyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGV0TGlzdFVpIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgaXRlbTpjYy5QcmVmYWIgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZUF0bGFzKVxyXG4gICAgcGV0X2xpc3RfdWk6Y2MuU3ByaXRlQXRsYXMgPSBudWxsO1xyXG4gICAgXHJcbiAgICBwcml2YXRlIHN0YXRlOiBQZXRUeXBlID0gUGV0VHlwZS5BbGw7XHJcbiAgICBwcml2YXRlIGFsbF9saXN0OiBQZXRJbmZvW10gPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBwb3dlcl9saXN0OiBQZXRJbmZvW10gPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBhZ2lsZV9saXN0OiBQZXRJbmZvW10gPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBpbnRlbGxpZ2VuY2VfbGlzdDogUGV0SW5mb1tdID0gbnVsbDtcclxuICAgIHByaXZhdGUgcGV0X2xpc3Rfc3RhdGU6UGV0TGlzdFN0YXRlID0gUGV0TGlzdFN0YXRlLkxpc3Q7XHJcbiAgICBwcml2YXRlIGNob29zZV9saXN0IDogTWFwPG51bWJlcixQZXRJbmZvPiA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBjb250ZW50OiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlBPU0lUSU9OX0NIQU5HRUQsdGhpcy5vblBvc2l0aW9uQ2hhbmdlLHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5QT1NJVElPTl9DSEFOR0VELHRoaXMub25Qb3NpdGlvbkNoYW5nZSx0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBvblBvc2l0aW9uQ2hhbmdlKCl7XHJcbiAgICAgICAgaWYodGhpcy5ub2RlLng9PTApe1xyXG4gICAgICAgICAgICB0aGlzLm9uRW5hYmxlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkVuYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNvbnRlbnQgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzY3JvbGwwXCIpLmdldENvbXBvbmVudChjYy5TY3JvbGxWaWV3KS5jb250ZW50O1xyXG4gICAgICAgIHRoaXMuY2hvb3NlX2xpc3QgPSBuZXcgTWFwPG51bWJlcixQZXRJbmZvPigpO1xyXG4gICAgICAgIHRoaXMucmVmcmVzaFVpKCk7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoU2Nyb2xsKCk7XHJcbiAgICAgICAgLy9HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLm11c2ljX21hbmFnZXIucGxheU11c2ljKE11c2ljSW5kZXguQkdNX1BldHMpO1xyXG4gICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7lrqDniannlYzpnaLngrnlh7vmrKHmlbApO1xyXG4gICAgfVxyXG5cclxuICAgIHJlZnJlc2hVaSgpIHtcclxuICAgICAgICAvLyB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzZWxlY3RUeXBlQmdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJzZWxlY3RUeXBlQmdcIikuc2V0UG9zaXRpb24odGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwidHlwZVwiICsgdGhpcy5zdGF0ZSkucG9zaXRpb24pXHJcbiAgICAgICAgbGV0IGJvdHRvbSA9ICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJib3R0b21cIik7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwidG9wXCIpLmdldENoaWxkQnlOYW1lKFwidGl0bGVMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDY0MDAwMik7XHJcbiAgICAgICAgYm90dG9tLmdldENoaWxkQnlOYW1lKFwiU3ByaXRlX0J0bl9UYWJfMFwiKS5nZXRDb21wb25lbnRJbkNoaWxkcmVuKGNjLkxhYmVsKS5zdHJpbmcgPSBMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCg2NDAwMDgpO1xyXG4gICAgICAgIGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcIlNwcml0ZV9CdG5fVGFiXzFcIikuZ2V0Q29tcG9uZW50SW5DaGlsZHJlbihjYy5MYWJlbCkuc3RyaW5nID0gTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoNjQwMDAyKTtcclxuICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJTcHJpdGVfQnRuX1RhYl8yXCIpLmdldENvbXBvbmVudEluQ2hpbGRyZW4oY2MuTGFiZWwpLnN0cmluZyA9IExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDY0MDAxNyk7XHJcbiAgICAgICAgYm90dG9tLmdldENoaWxkQnlOYW1lKFwiUmVsZWFzZV9CZ18xXCIpLmdldENoaWxkQnlOYW1lKFwibnVtXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5jaG9vc2VfbGlzdC5zaXplICsgXCIvMTAwXCI7XHJcbiAgICB9XHJcblxyXG4gICAgcmVmcmVzaFNjcm9sbCgpIHtcclxuICAgICAgICB0aGlzLmFsbF9saXN0ID0gbmV3IEFycmF5PFBldEluZm8+KCk7XHJcbiAgICAgICAgdGhpcy5wb3dlcl9saXN0ID0gbmV3IEFycmF5PFBldEluZm8+KCk7XHJcbiAgICAgICAgdGhpcy5hZ2lsZV9saXN0ID0gbmV3IEFycmF5PFBldEluZm8+KCk7XHJcbiAgICAgICAgdGhpcy5pbnRlbGxpZ2VuY2VfbGlzdCA9IG5ldyBBcnJheTxQZXRJbmZvPigpO1xyXG4gICAgICAgIHRoaXMuY29udGVudC5yZW1vdmVBbGxDaGlsZHJlbigpO1xyXG5cclxuICAgICAgICAvLyB0aGlzLmFsbF9saXN0ID0gUGV0TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFBldExpc3QoKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYWxsX2xpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgLy8gbGV0IHR5cGUgPSBTcGlyaXRNZXNzYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNwaXJpdFR5cGUodGhpcy5hbGxfbGlzdFtpXS5wZXRfaWQpO1xyXG4gICAgICAgICAgICAvLyBpZiAodHlwZSA9PSBQZXRUeXBlLlBvd2VyKSB7XHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLnBvd2VyX2xpc3QucHVzaCh0aGlzLmFsbF9saXN0W2ldKTtcclxuICAgICAgICAgICAgLy8gfSBlbHNlIGlmICh0eXBlID09IFBldFR5cGUuQWdpbGUpIHtcclxuICAgICAgICAgICAgLy8gICAgIHRoaXMuYWdpbGVfbGlzdC5wdXNoKHRoaXMuYWxsX2xpc3RbaV0pO1xyXG4gICAgICAgICAgICAvLyB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5pbnRlbGxpZ2VuY2VfbGlzdC5wdXNoKHRoaXMuYWxsX2xpc3RbaV0pO1xyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB0ZW1wTGlzdDpQZXRJbmZvW107XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLnN0YXRlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgUGV0VHlwZS5BbGw6XHJcbiAgICAgICAgICAgICAgICB0ZW1wTGlzdCA9IHRoaXMuYWxsX2xpc3Q7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBQZXRUeXBlLlBvd2VyOlxyXG4gICAgICAgICAgICAgICAgdGVtcExpc3QgPSB0aGlzLnBvd2VyX2xpc3Q7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBQZXRUeXBlLkFnaWxlOlxyXG4gICAgICAgICAgICAgICAgdGVtcExpc3QgPSB0aGlzLmFnaWxlX2xpc3Q7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBQZXRUeXBlLkludGVsbGlnZW5jZTpcclxuICAgICAgICAgICAgICAgIHRlbXBMaXN0ID0gdGhpcy5pbnRlbGxpZ2VuY2VfbGlzdFxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGVtcExpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgIGlmKHRoaXMucGV0X2xpc3Rfc3RhdGUgPT0gUGV0TGlzdFN0YXRlLkxpc3Qpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSBjYy5pbnN0YW50aWF0ZSh0aGlzLml0ZW0pO1xyXG4gICAgICAgICAgICAgICAgLy8gaXRlbS5nZXRDb21wb25lbnQoUGV0SXRlbSkuaW5pdCh0ZW1wTGlzdFtpXSk7XHJcbiAgICAgICAgICAgICAgICBpdGVtLnNldFBhcmVudCh0aGlzLmNvbnRlbnQpO1xyXG4gICAgICAgICAgICAgICAgaXRlbS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dQZXRVcGdyYWRlVWkoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsb3NlOigpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hTY3JvbGwoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sdGVtcExpc3RbaV0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gY2MuaW5zdGFudGlhdGUodGhpcy5pdGVtKTtcclxuICAgICAgICAgICAgICAgIC8vIGl0ZW0uZ2V0Q29tcG9uZW50KFBldEl0ZW0pLmluaXQodGVtcExpc3RbaV0pO1xyXG4gICAgICAgICAgICAgICAgbGV0IGt1YW5nID0gbmV3IGNjLk5vZGUoKTtcclxuICAgICAgICAgICAgICAgIGt1YW5nLmFkZENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5wZXRfbGlzdF91aS5nZXRTcHJpdGVGcmFtZShcIlJlbGVhc2VfQ2hlY2ttYXJrX0JnXCIpO1xyXG4gICAgICAgICAgICAgICAga3Vhbmcuc2V0UG9zaXRpb24oY2MudjIoLWl0ZW0ud2lkdGgvMixpdGVtLmhlaWdodC8yKSlcclxuICAgICAgICAgICAgICAgIGl0ZW0uYWRkQ2hpbGQoa3VhbmcpO1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5jaG9vc2VfbGlzdC5oYXModGVtcExpc3RbaV0uc2VxdWVuY2VfaWQpKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZ291ID0gbmV3IGNjLk5vZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICBnb3UuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnBldF9saXN0X3VpLmdldFNwcml0ZUZyYW1lKFwiUmVsZWFzZV9DaGVja21hcmtcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgZ291LnNldFBvc2l0aW9uKGNjLnYyKC1pdGVtLndpZHRoLzIsaXRlbS5oZWlnaHQvMikpXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5hZGRDaGlsZChnb3UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaXRlbS5zZXRQYXJlbnQodGhpcy5jb250ZW50KTtcclxuICAgICAgICAgICAgICAgIGl0ZW0ub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELHRoaXMub25DbGlja1NldEZyZWVQZXQuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBvblNlbGVjdEJ0bkNsaWNrKGUsdHlwZTpudW1iZXIpe1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBOdW1iZXIodHlwZSlcclxuICAgICAgICB0aGlzLnJlZnJlc2hVaSgpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBzY3JvbGwgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzY3JvbGxcIiArIGkpO1xyXG4gICAgICAgICAgICBzY3JvbGwuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmIChpID09IHRoaXMuc3RhdGUpIHtcclxuICAgICAgICAgICAgICAgIHNjcm9sbC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50ID0gc2Nyb2xsLmdldENvbXBvbmVudChjYy5TY3JvbGxWaWV3KS5jb250ZW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB0ZW1wTGlzdDtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMuc3RhdGUpIHtcclxuICAgICAgICAgICAgY2FzZSBQZXRUeXBlLkFsbDpcclxuICAgICAgICAgICAgICAgIHRlbXBMaXN0ID0gdGhpcy5hbGxfbGlzdDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFBldFR5cGUuUG93ZXI6XHJcbiAgICAgICAgICAgICAgICB0ZW1wTGlzdCA9IHRoaXMucG93ZXJfbGlzdDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFBldFR5cGUuQWdpbGU6XHJcbiAgICAgICAgICAgICAgICB0ZW1wTGlzdCA9IHRoaXMuYWdpbGVfbGlzdDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFBldFR5cGUuSW50ZWxsaWdlbmNlOlxyXG4gICAgICAgICAgICAgICAgdGVtcExpc3QgPSB0aGlzLmludGVsbGlnZW5jZV9saXN0XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5jb250ZW50LmNoaWxkcmVuQ291bnQgIT0gdGVtcExpc3QubGVuZ3RoKXtcclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoU2Nyb2xsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uQ2xpY2tTZXRGcmVlUGV0KGU6Y2MuRXZlbnQuRXZlbnRUb3VjaCl7XHJcbiAgICAgICAgLy8gaWYgKHRoaXMuY2hvb3NlX2xpc3QuaGFzKGUudGFyZ2V0LmdldENvbXBvbmVudChQZXRJdGVtKS5wZXRfaW5mby5zZXF1ZW5jZV9pZCkpIHtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMuY2hvb3NlX2xpc3QuZGVsZXRlKGUudGFyZ2V0LmdldENvbXBvbmVudChQZXRJdGVtKS5wZXRfaW5mby5zZXF1ZW5jZV9pZClcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gZWxzZXtcclxuICAgICAgICAvLyAgICAgdGhpcy5jaG9vc2VfbGlzdC5zZXQoZS50YXJnZXQuZ2V0Q29tcG9uZW50KFBldEl0ZW0pLnBldF9pbmZvLnNlcXVlbmNlX2lkLGUudGFyZ2V0LmdldENvbXBvbmVudChQZXRJdGVtKS5wZXRfaW5mbyk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIHRoaXMucmVmcmVzaFNjcm9sbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ2xpY2tHZXRCdG4oKXtcclxuICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5LuO5a6g54mp55WM6Z2i54K55Ye76I635Y+W55qE5qyh5pWwKTtcclxuICAgICAgICAvLyBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VGFrZUVnZ1VpKG51bGwpO1xyXG4gICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguVGFrZUVnZyxVSUxheWVyTGV2ZWwuT25lLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+IHtcclxuICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChUYWtlRWdnVWkpLmluaXQobnVsbCk7XHJcbiAgICAgICAgfSx9KVxyXG4gICAgfVxyXG5cclxuICAgIG9uQ2xpY2tTZXRGcmVlUGV0QnRuKCl7XHJcbiAgICAgICAgbGV0IGJvdHRvbSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJvdHRvbVwiKVxyXG4gICAgICAgIHRoaXMucGV0X2xpc3Rfc3RhdGUgPSBQZXRMaXN0U3RhdGUuU2V0RnJlZTtcclxuICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJSZWxlYXNlX0JnXzFcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJTcHJpdGVfQnRuX1RhYl8xXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5wZXRfbGlzdF91aS5nZXRTcHJpdGVGcmFtZShcIlNwcml0ZV9CdG5fVGFiXzBcIik7XHJcbiAgICAgICAgYm90dG9tLmdldENoaWxkQnlOYW1lKFwiU3ByaXRlX0J0bl9UYWJfMFwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMucGV0X2xpc3RfdWkuZ2V0U3ByaXRlRnJhbWUoXCJTcHJpdGVfQnRuX1RhYl8xXCIpO1xyXG4gICAgICAgIHRoaXMucmVmcmVzaFVpKCk7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoU2Nyb2xsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25DbGlja1BldEJ0bigpe1xyXG4gICAgICAgIGxldCBib3R0b20gPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJib3R0b21cIilcclxuICAgICAgICB0aGlzLnBldF9saXN0X3N0YXRlID0gUGV0TGlzdFN0YXRlLkxpc3Q7XHJcbiAgICAgICAgYm90dG9tLmdldENoaWxkQnlOYW1lKFwiUmVsZWFzZV9CZ18xXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcIlNwcml0ZV9CdG5fVGFiXzFcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnBldF9saXN0X3VpLmdldFNwcml0ZUZyYW1lKFwiU3ByaXRlX0J0bl9UYWJfMVwiKTtcclxuICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJTcHJpdGVfQnRuX1RhYl8wXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5wZXRfbGlzdF91aS5nZXRTcHJpdGVGcmFtZShcIlNwcml0ZV9CdG5fVGFiXzBcIik7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoVWkoKTtcclxuICAgICAgICB0aGlzLnJlZnJlc2hTY3JvbGwoKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkNsaWNrU2V0RnJlZUJ0bigpe1xyXG4gICAgICAgIGlmKHRoaXMuY2hvb3NlX2xpc3Quc2l6ZSA9PSAwKSByZXR1cm47XHJcbiAgICAgICAgbGV0IHRlbXBMaXN0IDogUGV0SW5mb1tdID0gW107XHJcbiAgICAgICAgdGhpcy5jaG9vc2VfbGlzdC5mb3JFYWNoKCh2LGspID0+IHtcclxuICAgICAgICAgICAgdGVtcExpc3QucHVzaCh2KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93UGV0U2V0RnJlZVVpKHtcclxuICAgICAgICAgICAgb25DbG9zZTooKCkgPT57XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hVaSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoU2Nyb2xsKCk7XHJcbiAgICAgICAgICAgIH0pLmJpbmQodGhpcyksXHJcbiAgICAgICAgfSx0ZW1wTGlzdCk7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==