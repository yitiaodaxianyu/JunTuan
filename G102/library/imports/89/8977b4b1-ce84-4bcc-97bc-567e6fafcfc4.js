"use strict";
cc._RF.push(module, '8977bSxzoRLzJe8Vn5vr8/E', 'MazePetItem');
// Scripts/Maze/MazePetItem.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MazePetItem = /** @class */ (function (_super) {
    __extends(MazePetItem, _super);
    function MazePetItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.index = 0;
        _this.lease_ts = null;
        return _this;
    }
    MazePetItem.prototype.init = function (petInfo, index, ts) {
        this.lease_ts = ts;
        this.index = index;
        // let SMM=SpiritQualityMessageManager.getInstance();
        var iconRoot = this.node.getChildByName('iconMask');
        //图标
        var iconSp = iconRoot.getChildByName('icon').getComponent(cc.Sprite);
        // iconSp.spriteFrame=PetManager.getInstance().getSpriteFrameByName('Sprite_Avatar_' + petInfo.pet_id);
        //框
        // let quality=SMM.getSpiritQualityframe(petInfo.pet_quality)
        // this.node.getComponent(cc.Sprite).spriteFrame = PetManager.getInstance().getSpriteFrameByName("Prepare_Quality_" + quality);
        var starSp = iconRoot.getChildByName("star").getComponent(cc.Sprite);
        // starSp.spriteFrame = PetManager.getInstance().getSpriteFrameByName("Prepare_Star_" + SMM.getSpiritQualityStar(petInfo.pet_quality));
        var levelLabel = this.node.getChildByName("levelLabel");
        levelLabel.getComponent(cc.Label).string = "" + petInfo.pet_level;
        this.node.getChildByName('gou').active = false;
    };
    MazePetItem.prototype.refresh = function (isShow) {
        this.node.getChildByName('gou').active = isShow;
    };
    MazePetItem.prototype.onClick = function () {
        this.lease_ts.clickBtnItem(this.index);
    };
    MazePetItem = __decorate([
        ccclass
    ], MazePetItem);
    return MazePetItem;
}(cc.Component));
exports.default = MazePetItem;

cc._RF.pop();