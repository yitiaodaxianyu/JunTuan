"use strict";
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