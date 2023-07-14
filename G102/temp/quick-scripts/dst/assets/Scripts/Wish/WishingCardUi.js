
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Wish/WishingCardUi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcV2lzaFxcV2lzaGluZ0NhcmRVaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSwwQ0FBZ0Q7QUFDaEQsaURBQWtFO0FBRTVELElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQTJDLGlDQUFZO0lBQXZEO1FBQUEscUVBd0VDO1FBckVHLFVBQUksR0FBYyxJQUFJLENBQUM7UUFFdkIsZ0JBQVUsR0FBa0IsSUFBSSxDQUFDO1FBRWpDLGtCQUFZLEdBQW1CLEVBQUUsQ0FBQzs7UUFnRWxDLGlCQUFpQjtJQUNyQixDQUFDO0lBaEVHOzs7T0FHRztJQUNILGdDQUFRLEdBQVIsVUFBUyxJQUFZLEVBQUUsTUFBb0IsRUFBQyxJQUFhO1FBQXpELGlCQTRDQztRQTNDRyxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQzlCLElBQUksTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRTtZQUNsQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztTQUNqRjtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUM3RSxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDeEUsSUFBSSxJQUFJLElB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bXBvcnQgeyBSZXdhcmREYXRhIH0gZnJvbSBcIi4uL0pzb25EYXRhL0xldmVsSnNvbkRhdGFcIjtcclxuaW1wb3J0IHsgSXRlbU1hbmFnZXIgfSBmcm9tIFwiLi4vUHJvcC9EYXRhL0l0ZW1cIjtcclxuaW1wb3J0IFdpc2hpbmdJdGVtVWksIHsgV2lzaGluZ0l0ZW1TdGF0ZSB9IGZyb20gXCIuL1dpc2hpbmdJdGVtVWlcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXaXNoaW5nQ2FyZFVpIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgaXRlbTogY2MuUHJlZmFiID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGVBdGxhcylcclxuICAgIHdpc2hpbmdfdWk6Y2MuU3ByaXRlQXRsYXMgPSBudWxsO1xyXG5cclxuICAgIHdpc2hpbmdJdGVtczpXaXNoaW5nSXRlbVVpW10gPSBbXTtcclxuICAgIC8qKlxyXG4gICAgICog5Yid5aeL5YyW57+754mM55WM6Z2iXHJcbiAgICAgKiBAcGFyYW0gdHlwZSAxLOWNleaKvSAy77yM5Y2B5oq9XHJcbiAgICAgKi9cclxuICAgIGluaXRDYXJkKHR5cGU6IG51bWJlciwgcmV3YXJkOiBSZXdhcmREYXRhW10sZnVuYzpGdW5jdGlvbikge1xyXG4gICAgICAgIGxldCBjYW52YXMgPSBjYy5maW5kKFwiQ2FudmFzXCIpXHJcbiAgICAgICAgaWYgKGNhbnZhcy5oZWlnaHQgLyBjYW52YXMud2lkdGggPCAyKSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIml0ZW1Sb290XCIpLnNjYWxlID0gY2FudmFzLmhlaWdodCAvIGNhbnZhcy53aWR0aCAtIDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIml0ZW1Sb290XCIpLmdldENvbXBvbmVudChjYy5XaWRnZXQpLnRhcmdldCA9IGNhbnZhcztcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJidG5cIikuZ2V0Q29tcG9uZW50KGNjLldpZGdldCkudGFyZ2V0ID0gY2FudmFzO1xyXG4gICAgICAgIGlmICh0eXBlID09IDEpIHtcclxuICAgICAgICAgICAgLy8g5Y2V5oq9XHJcbiAgICAgICAgICAgIGxldCBpdGVtID0gY2MuaW5zdGFudGlhdGUodGhpcy5pdGVtKTtcclxuICAgICAgICAgICAgaXRlbS5wYXJlbnQgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJpdGVtUm9vdFwiKVxyXG4gICAgICAgICAgICBpdGVtLmdldENvbXBvbmVudChXaXNoaW5nSXRlbVVpKS5pbml0SXRlbShyZXdhcmRbMF0pXHJcbiAgICAgICAgICAgIHRoaXMud2lzaGluZ0l0ZW1zLnB1c2goaXRlbS5nZXRDb21wb25lbnQoV2lzaGluZ0l0ZW1VaSkpO1xyXG4gICAgICAgICAgICBpdGVtLmdldENoaWxkQnlOYW1lKFwiYmFja0VmZmVjdFwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMud2lzaGluZ191aS5nZXRTcHJpdGVGcmFtZShcIkNvbW1vblNwaXJpdF9CYWNrTGlnaHRfXCIgKyBJdGVtTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFF1YWxpdHkocmV3YXJkWzBdLnJld2FyZF9pZCkpXHJcbiAgICAgICAgICAgIGl0ZW0uc2V0UG9zaXRpb24oY2MudjMoMCwgMCwgMCkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIOWNgei/nlxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gY2MuaW5zdGFudGlhdGUodGhpcy5pdGVtKTtcclxuICAgICAgICAgICAgICAgIGxldCBpdGVtUm9vdCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIml0ZW1Sb290XCIpXHJcbiAgICAgICAgICAgICAgICBpdGVtLnBhcmVudCA9IGl0ZW1Sb290XHJcbiAgICAgICAgICAgICAgICBpdGVtLnNjYWxlID0gMC43ODtcclxuICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50KFdpc2hpbmdJdGVtVWkpLmluaXRJdGVtKHJld2FyZFtpXSlcclxuICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJiYWNrRWZmZWN0XCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy53aXNoaW5nX3VpLmdldFNwcml0ZUZyYW1lKFwiQ29tbW9uU3Bpcml0X0JhY2tMaWdodF9cIiArIEl0ZW1NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UXVhbGl0eShyZXdhcmRbaV0ucmV3YXJkX2lkKSlcclxuICAgICAgICAgICAgICAgIHRoaXMud2lzaGluZ0l0ZW1zLnB1c2goaXRlbS5nZXRDb21wb25lbnQoV2lzaGluZ0l0ZW1VaSkpO1xyXG4gICAgICAgICAgICAgICAgaXRlbS5zZXRQb3NpdGlvbihjYy52MygwLCAwLCAwKSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgcG9zID0gaXRlbVJvb3QuZ2V0Q2hpbGRCeU5hbWUoXCJwb3NcIiArIGkpLmdldFBvc2l0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICBjYy50d2VlbihpdGVtKS50bygwLjUse3Bvc2l0aW9uOmNjLnYzKHBvcy54LHBvcy55LDApfSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJidG5cIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwoKT0+e1xyXG4gICAgICAgICAgICBsZXQgaXNDbG9zZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7aTx0aGlzLndpc2hpbmdJdGVtcy5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMud2lzaGluZ0l0ZW1zW2ldLnN0YXRlICE9IFdpc2hpbmdJdGVtU3RhdGUuT3BlbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICBpc0Nsb3NlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoaXNDbG9zZSl7XHJcbiAgICAgICAgICAgICAgICBmdW5jKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBvbkNsaWNrQnRuKCl7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDtpPHRoaXMud2lzaGluZ0l0ZW1zLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICB0aGlzLndpc2hpbmdJdGVtc1tpXS5vcGVuQ2FyZCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJidG5cIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gb25Mb2FkICgpIHt9XHJcblxyXG4gICAgc3RhcnQoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XHJcbn1cclxuIl19