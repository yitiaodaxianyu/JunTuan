"use strict";
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