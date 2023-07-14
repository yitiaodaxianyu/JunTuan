"use strict";
cc._RF.push(module, 'd96d6s+Z3FKcrTw+dEjoWb3', 'ExclusiveEquipItem');
// Scripts/Equipment/Ui/ExclusiveEquipItem.ts

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
var ExclusiveEnhancement_1 = require("../../JsonData/ExclusiveEnhancement");
var PropManager_1 = require("../../Prop/PropManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ExclusiveEquipItem = /** @class */ (function (_super) {
    __extends(ExclusiveEquipItem, _super);
    function ExclusiveEquipItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExclusiveEquipItem.prototype.init = function (heroType) {
        // let data = HeroManager.getInstance().getHeroData(heroType);
        var PM = PropManager_1.PropManager.getInstance();
        var itemData = ExclusiveEnhancement_1.ExclusiveEnhancementManager.getInstance().getJsonByHeroTypeAndWeaponLevel(heroType, HeroManager_1.HeroManager.getInstance().getExclusiveEquipLevel(heroType));
        //框
        var bg = this.node.getChildByName('bg');
        bg.getComponent(cc.Sprite).spriteFrame = PM.getSpByName("Item_frame_" + itemData.Quality);
        //icon
        var icon = this.node.getChildByName("icon");
        icon.getComponent(cc.Sprite).spriteFrame = PM.getSpByName("Exclusive_Weapon_" + heroType + "_1");
        this.node.getChildByName("levelNum").getComponent(cc.Label).string = "+" + HeroManager_1.HeroManager.getInstance().getExclusiveEquipLevel(heroType);
    };
    ExclusiveEquipItem = __decorate([
        ccclass
    ], ExclusiveEquipItem);
    return ExclusiveEquipItem;
}(cc.Component));
exports.default = ExclusiveEquipItem;

cc._RF.pop();