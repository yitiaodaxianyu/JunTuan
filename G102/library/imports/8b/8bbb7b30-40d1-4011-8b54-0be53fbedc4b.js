"use strict";
cc._RF.push(module, '8bbb7swQNFAEYtUC+U/vtxL', 'WishingCardUi');
// Scripts/Wish/WishingCardUi.ts

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
var Item_1 = require("../Prop/Data/Item");
var WishingItemUi_1 = require("./WishingItemUi");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var WishingCardUi = /** @class */ (function (_super) {
    __extends(WishingCardUi, _super);
    function WishingCardUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.item = null;
        _this.wishing_ui = null;
        _this.wishingItems = [];
        return _this;
        // update (dt) {}
    }
    /**
     * 初始化翻牌界面
     * @param type 1,单抽 2，十抽
     */
    WishingCardUi.prototype.initCard = function (type, reward, func) {
        var _this = this;
        var canvas = cc.find("Canvas");
        if (canvas.height / canvas.width < 2) {
            this.node.getChildByName("itemRoot").scale = canvas.height / canvas.width - 1;
        }
        this.node.getChildByName("itemRoot").getComponent(cc.Widget).target = canvas;
        this.node.getChildByName("btn").getComponent(cc.Widget).target = canvas;
        if (type == 1) {
            // 单抽
            var item = cc.instantiate(this.item);
            item.parent = this.node.getChildByName("itemRoot");
            item.getComponent(WishingItemUi_1.default).initItem(reward[0]);
            this.wishingItems.push(item.getComponent(WishingItemUi_1.default));
            item.getChildByName("backEffect").getComponent(cc.Sprite).spriteFrame = this.wishing_ui.getSpriteFrame("CommonSpirit_BackLight_" + Item_1.ItemManager.getInstance().getQuality(reward[0].reward_id));
            item.setPosition(cc.v3(0, 0, 0));
        }
        else {
            // 十连
            for (var i = 0; i < 10; i++) {
                var item = cc.instantiate(this.item);
                var itemRoot = this.node.getChildByName("itemRoot");
                item.parent = itemRoot;
                item.scale = 0.78;
                item.getComponent(WishingItemUi_1.default).initItem(reward[i]);
                item.getChildByName("backEffect").getComponent(cc.Sprite).spriteFrame = this.wishing_ui.getSpriteFrame("CommonSpirit_BackLight_" + Item_1.ItemManager.getInstance().getQuality(reward[i].reward_id));
                this.wishingItems.push(item.getComponent(WishingItemUi_1.default));
                item.setPosition(cc.v3(0, 0, 0));
                var pos = itemRoot.getChildByName("pos" + i).getPosition();
                cc.tween(item).to(0.5, { position: cc.v3(pos.x, pos.y, 0) }).start();
            }
            this.node.getChildByName("btn").active = true;
        }
        this.node.getChildByName("bg").on(cc.Node.EventType.TOUCH_END, function () {
            var isClose = true;
            for (var i = 0; i < _this.wishingItems.length; i++) {
                if (_this.wishingItems[i].state != WishingItemUi_1.WishingItemState.Opened) {
                    isClose = false;
                }
            }
            if (isClose) {
                func();
                _this.node.destroy();
            }
        });
    };
    WishingCardUi.prototype.onClickBtn = function () {
        for (var i = 0; i < this.wishingItems.length; i++) {
            this.wishingItems[i].openCard();
        }
        this.node.getChildByName("btn").active = false;
    };
    // onLoad () {}
    WishingCardUi.prototype.start = function () {
    };
    __decorate([
        property(cc.Prefab)
    ], WishingCardUi.prototype, "item", void 0);
    __decorate([
        property(cc.SpriteAtlas)
    ], WishingCardUi.prototype, "wishing_ui", void 0);
    WishingCardUi = __decorate([
        ccclass
    ], WishingCardUi);
    return WishingCardUi;
}(cc.Component));
exports.default = WishingCardUi;

cc._RF.pop();