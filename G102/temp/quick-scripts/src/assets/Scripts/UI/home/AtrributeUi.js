"use strict";
cc._RF.push(module, '512a55RPZVH+7H97SHxZJxA', 'AtrributeUi');
// Scripts/UI/home/AtrributeUi.ts

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
var HeroManager_1 = require("../../Hero/Data/HeroManager");
var HeroConfig_1 = require("../../Hero/Game/HeroConfig");
var LanguageManager_1 = require("../../multiLanguage/LanguageManager");
var MyTool_1 = require("../../Tools/MyTool");
var UIComponent_1 = require("../UIComponent");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var AtrributeUi = /** @class */ (function (_super) {
    __extends(AtrributeUi, _super);
    function AtrributeUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hero_type = HeroConfig_1.Hero_Type.NULL;
        _this.pet_info = null;
        return _this;
    }
    AtrributeUi.prototype.init = function (uiAc) {
        _super.prototype.init.call(this, uiAc);
    };
    AtrributeUi.prototype.initHeroType = function (heroType) {
        this.hero_type = heroType;
        this.refreshHeroUi();
    };
    AtrributeUi.prototype.initPreviewHeroType = function (heroType, stage, level) {
        this.hero_type = heroType;
        this.hero_stage = stage;
        this.hero_level = level;
        this.refreshPreviewHeroUi();
    };
    AtrributeUi.prototype.initPetInfo = function (petInfo) {
        this.pet_info = petInfo;
        this.refreshPetUi();
    };
    AtrributeUi.prototype.refreshHeroUi = function () {
        var data = HeroManager_1.HeroManager.getInstance().getHeroData(this.hero_type);
        this.node.getChildByName("title").getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(110023);
        // this.node.getChildByName("tips").getComponent(cc.Label).string = LanguageManager.getInstance().getStrByTextId(110024);
        this.node.getChildByName("Label0").getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(110030);
        this.node.getChildByName("Label1").getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(100089);
        this.node.getChildByName("Label2").getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(110015);
        this.node.getChildByName("Label3").getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(110016);
        this.node.getChildByName("Label4").getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(110017);
        this.node.getChildByName("Label5").getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(110018);
        this.node.getChildByName("Label6").getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(110019);
        this.node.getChildByName("Label7").getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(110021);
        this.node.getChildByName("Label8").getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(110020);
        this.node.getChildByName("Label9").getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(110022);
        this.node.getChildByName("LabelNum0").getComponent(cc.Label).string = "" + MyTool_1.default.numberFormat(data.atkSpeed, 1); //攻速
        this.node.getChildByName("LabelNum1").getComponent(cc.Label).string = "" + MyTool_1.default.numberFormat(data.total_attack); //总攻击力
        this.node.getChildByName("LabelNum2").getComponent(cc.Label).string = "" + MyTool_1.default.numberFormat(data.total_defense); //总防御力
        this.node.getChildByName("LabelNum3").getComponent(cc.Label).string = "" + MyTool_1.default.numberFormat(data.total_hp); //总生命值
        this.node.getChildByName("LabelNum4").getComponent(cc.Label).string = "" + MyTool_1.default.numberFormat(data.Hit, 1); //命中值
        this.node.getChildByName("LabelNum5").getComponent(cc.Label).string = "" + MyTool_1.default.numberFormat(data.Miss, 1); //闪避值
        this.node.getChildByName("LabelNum6").getComponent(cc.Label).string = "" + MyTool_1.default.numberFormat(data.Critical, 1); //暴击值
        this.node.getChildByName("LabelNum7").getComponent(cc.Label).string = "" + MyTool_1.default.numberFormat(data.AntiCritical, 1); ///防爆值
        this.node.getChildByName("LabelNum8").getComponent(cc.Label).string = "" + MyTool_1.default.numberFormat(data.ExtraCritical * 100, 2) + "%"; //暴击增幅
        this.node.getChildByName("LabelNum9").getComponent(cc.Label).string = "" + MyTool_1.default.numberFormat(data.AntiExtraCritical * 100, 2) + "%"; //暴击抗性
    };
    AtrributeUi.prototype.refreshPreviewHeroUi = function () {
        var data = HeroManager_1.HeroManager.getInstance().getTargetHeroData(this.hero_type, this.hero_stage, this.hero_level);
        this.node.getChildByName("title").getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(110023);
        // this.node.getChildByName("tips").getComponent(cc.Label).string = LanguageManager.getInstance().getStrByTextId(110024);
        this.node.getChildByName("Label0").getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(110030);
        this.node.getChildByName("Label1").getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(100089);
        this.node.getChildByName("Label2").getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(110015);
        this.node.getChildByName("Label3").getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(110016);
        this.node.getChildByName("Label4").getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(110017);
        this.node.getChildByName("Label5").getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(110018);
        this.node.getChildByName("Label6").getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(110019);
        this.node.getChildByName("Label7").getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(110021);
        this.node.getChildByName("Label8").getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(110020);
        this.node.getChildByName("Label9").getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(110022);
        this.node.getChildByName("LabelNum0").getComponent(cc.Label).string = "" + MyTool_1.default.numberFormat(data.atkSpeed, 1); //攻速
        this.node.getChildByName("LabelNum1").getComponent(cc.Label).string = "" + MyTool_1.default.numberFormat(data.total_attack); //总攻击力
        this.node.getChildByName("LabelNum2").getComponent(cc.Label).string = "" + MyTool_1.default.numberFormat(data.total_defense); //总防御力
        this.node.getChildByName("LabelNum3").getComponent(cc.Label).string = "" + MyTool_1.default.numberFormat(data.total_hp); //总生命值
        this.node.getChildByName("LabelNum4").getComponent(cc.Label).string = "" + MyTool_1.default.numberFormat(data.Hit, 1); //命中值
        this.node.getChildByName("LabelNum5").getComponent(cc.Label).string = "" + MyTool_1.default.numberFormat(data.Miss, 1); //闪避值
        this.node.getChildByName("LabelNum6").getComponent(cc.Label).string = "" + MyTool_1.default.numberFormat(data.Critical, 1); //暴击值
        this.node.getChildByName("LabelNum7").getComponent(cc.Label).string = "" + MyTool_1.default.numberFormat(data.AntiCritical, 1); ///防爆值
        this.node.getChildByName("LabelNum8").getComponent(cc.Label).string = "" + MyTool_1.default.numberFormat(data.ExtraCritical * 100, 2) + "%"; //暴击增幅
        this.node.getChildByName("LabelNum9").getComponent(cc.Label).string = "" + MyTool_1.default.numberFormat(data.AntiExtraCritical * 100, 2) + "%"; //暴击抗性
    };
    AtrributeUi.prototype.refreshPetUi = function () {
        // let data = PetManager.getInstance().getPetData(this.pet_info);
        // this.node.getChildByName("LabelNum1").getComponent(cc.Label).string = "" + data.Health;//总生命值
        // this.node.getChildByName("LabelNum2").getComponent(cc.Label).string = "" + data.Attack;//总攻击力
        // this.node.getChildByName("LabelNum3").getComponent(cc.Label).string = "" + data.Defense;//总防御力 todo
        // this.node.getChildByName("LabelNum4").getComponent(cc.Label).string = "" + MyTool.numberFormat(data.Hit,1);//命中值
        // this.node.getChildByName("LabelNum5").getComponent(cc.Label).string = "" + MyTool.numberFormat(data.Critical,1);//暴击值
        // this.node.getChildByName("LabelNum6").getComponent(cc.Label).string = "" + MyTool.numberFormat(data.Miss,1);//闪避值
        // this.node.getChildByName("LabelNum7").getComponent(cc.Label).string = "" + MyTool.numberFormat(data.AntiCritical,1);///防爆值
        // this.node.getChildByName("LabelNum8").getComponent(cc.Label).string = "" + MyTool.numberFormat(data.ExtraCritical * 100,2) + "%";//暴击增幅
        // this.node.getChildByName("LabelNum9").getComponent(cc.Label).string = "" + MyTool.numberFormat(data.AntiExtraCritical * 100,2) + "%";//暴击抗性
    };
    AtrributeUi = __decorate([
        ccclass
    ], AtrributeUi);
    return AtrributeUi;
}(UIComponent_1.default));
exports.default = AtrributeUi;

cc._RF.pop();