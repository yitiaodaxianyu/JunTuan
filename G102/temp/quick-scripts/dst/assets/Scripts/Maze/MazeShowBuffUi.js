
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Maze/MazeShowBuffUi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '72d6bx9BAlMZr8rqr4I/u58', 'MazeShowBuffUi');
// Scripts/Maze/MazeShowBuffUi.ts

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
var LanguageManager_1 = require("../multiLanguage/LanguageManager");
var UIComponent_1 = require("../UI/UIComponent");
var RogueBuff_1 = require("./Data/RogueBuff");
var MazeBuffItem_1 = require("./MazeBuffItem");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MazeShowBuffUi = /** @class */ (function (_super) {
    __extends(MazeShowBuffUi, _super);
    function MazeShowBuffUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**buff id */
        _this.buff_id = 1001;
        _this.prefab_buff_item = null;
        return _this;
    }
    MazeShowBuffUi.prototype.initData = function (id) {
        this.buff_id = id;
        this.initUi();
    };
    MazeShowBuffUi.prototype.initUi = function () {
        this.createBuffCards();
    };
    MazeShowBuffUi.prototype.createBuffCards = function () {
        var RBM = RogueBuff_1.RogueBuffManager.getInstance();
        var LM = LanguageManager_1.default.getInstance();
        //buff的数据
        var jsonData = RBM.getJsonRogueBuff(this.buff_id);
        var titleLabel = this.node.getChildByName('titleLabel').getComponent(cc.Label);
        titleLabel.string = LM.getStrByTextId(110023);
        var buffItem = cc.instantiate(this.prefab_buff_item);
        buffItem.scale = 1;
        buffItem.getComponent(MazeBuffItem_1.default).init(this.buff_id);
        buffItem.getComponent(cc.Button).interactable = false;
        this.node.getChildByName('buffRoot').addChild(buffItem);
        buffItem.y = -243;
        buffItem.x = 0;
        //内容
        var detailLabel = this.node.getChildByName('detailLabel').getComponent(cc.Label);
        detailLabel.string = this.getValueStringByString(LM.getStrByTextId(jsonData.RogueBuffText_ID), jsonData.RogueBuff1_Value, jsonData.RogueBuff2_Value, jsonData.RogueBuff3_Value);
    };
    MazeShowBuffUi.prototype.getValueStringByString = function (str, value1, value2, value3) {
        if (str.includes("~x%")) {
            value1 *= 100;
        }
        if (str.includes("~y%")) {
            value2 *= 100;
        }
        if (str.includes("~z%")) {
            value3 *= 100;
        }
        var newStr = str.replace("~x", value1 + '');
        newStr = newStr.replace("~y", value2 + '');
        newStr = newStr.replace("~z", value2 + '');
        return newStr;
    };
    __decorate([
        property(cc.Prefab)
    ], MazeShowBuffUi.prototype, "prefab_buff_item", void 0);
    MazeShowBuffUi = __decorate([
        ccclass
    ], MazeShowBuffUi);
    return MazeShowBuffUi;
}(UIComponent_1.default));
exports.default = MazeShowBuffUi;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTWF6ZVxcTWF6ZVNob3dCdWZmVWkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQStEO0FBQy9ELGlEQUE0QztBQUM1Qyw4Q0FBb0Q7QUFDcEQsK0NBQTBDO0FBRXBDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQTRDLGtDQUFXO0lBQXZEO1FBQUEscUVBbURDO1FBbERHLGFBQWE7UUFDYixhQUFPLEdBQVEsSUFBSSxDQUFDO1FBRXBCLHNCQUFnQixHQUFXLElBQUksQ0FBQzs7SUErQ3BDLENBQUM7SUE3Q0csaUNBQVEsR0FBUixVQUFTLEVBQVM7UUFDZCxJQUFJLENBQUMsT0FBTyxHQUFDLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDbEIsQ0FBQztJQUVELCtCQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELHdDQUFlLEdBQWY7UUFDSSxJQUFJLEdBQUcsR0FBQyw0QkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtRQUN0QyxJQUFJLEVBQUUsR0FBQyx5QkFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3JDLFNBQVM7UUFDVCxJQUFJLFFBQVEsR0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRWhELElBQUksVUFBVSxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0UsVUFBVSxDQUFDLE1BQU0sR0FBQyxFQUFFLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQzNDLElBQUksUUFBUSxHQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDbkQsUUFBUSxDQUFDLEtBQUssR0FBQyxDQUFDLENBQUM7UUFDakIsUUFBUSxDQUFDLFlBQVksQ0FBQyxzQkFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN2RCxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLEdBQUMsS0FBSyxDQUFDO1FBQ3BELElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN4RCxRQUFRLENBQUMsQ0FBQyxHQUFDLENBQUMsR0FBRyxDQUFDO1FBQ2hCLFFBQVEsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDO1FBRWIsSUFBSTtRQUNKLElBQUksV0FBVyxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDL0UsV0FBVyxDQUFDLE1BQU0sR0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsRUFBQyxRQUFRLENBQUMsZ0JBQWdCLEVBQUMsUUFBUSxDQUFDLGdCQUFnQixFQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQy9LLENBQUM7SUFFRCwrQ0FBc0IsR0FBdEIsVUFBdUIsR0FBVSxFQUFDLE1BQWEsRUFBQyxNQUFhLEVBQUMsTUFBYTtRQUN2RSxJQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUM7WUFDbkIsTUFBTSxJQUFFLEdBQUcsQ0FBQztTQUNmO1FBQ0QsSUFBRyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFDO1lBQ25CLE1BQU0sSUFBRSxHQUFHLENBQUM7U0FDZjtRQUNELElBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBQztZQUNuQixNQUFNLElBQUUsR0FBRyxDQUFDO1NBQ2Y7UUFDRCxJQUFJLE1BQU0sR0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksRUFBQyxNQUFNLEdBQUMsRUFBRSxDQUFDLENBQUM7UUFDdkMsTUFBTSxHQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFDLE1BQU0sR0FBQyxFQUFFLENBQUMsQ0FBQztRQUN0QyxNQUFNLEdBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUMsTUFBTSxHQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3RDLE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUE5Q0Q7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzs0REFDWTtJQUpmLGNBQWM7UUFEbEMsT0FBTztPQUNhLGNBQWMsQ0FtRGxDO0lBQUQscUJBQUM7Q0FuREQsQUFtREMsQ0FuRDJDLHFCQUFXLEdBbUR0RDtrQkFuRG9CLGNBQWMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTGFuZ3VhZ2VNYW5hZ2VyIGZyb20gXCIuLi9tdWx0aUxhbmd1YWdlL0xhbmd1YWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgVUlDb21wb25lbnQgZnJvbSBcIi4uL1VJL1VJQ29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFJvZ3VlQnVmZk1hbmFnZXIgfSBmcm9tIFwiLi9EYXRhL1JvZ3VlQnVmZlwiO1xyXG5pbXBvcnQgTWF6ZUJ1ZmZJdGVtIGZyb20gXCIuL01hemVCdWZmSXRlbVwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYXplU2hvd0J1ZmZVaSBleHRlbmRzIFVJQ29tcG9uZW50IHtcclxuICAgIC8qKmJ1ZmYgaWQgKi9cclxuICAgIGJ1ZmZfaWQ6bnVtYmVyPTEwMDE7XHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgcHJlZmFiX2J1ZmZfaXRlbTpjYy5QcmVmYWI9bnVsbDtcclxuICAgIFxyXG4gICAgaW5pdERhdGEoaWQ6bnVtYmVyKXtcclxuICAgICAgICB0aGlzLmJ1ZmZfaWQ9aWQ7IFxyXG4gICAgICAgIHRoaXMuaW5pdFVpKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGluaXRVaSgpe1xyXG4gICAgICAgIHRoaXMuY3JlYXRlQnVmZkNhcmRzKCk7ICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUJ1ZmZDYXJkcygpe1xyXG4gICAgICAgIGxldCBSQk09Um9ndWVCdWZmTWFuYWdlci5nZXRJbnN0YW5jZSgpXHJcbiAgICAgICAgbGV0IExNPUxhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIC8vYnVmZueahOaVsOaNrlxyXG4gICAgICAgIGxldCBqc29uRGF0YT1SQk0uZ2V0SnNvblJvZ3VlQnVmZih0aGlzLmJ1ZmZfaWQpO1xyXG5cclxuICAgICAgICBsZXQgdGl0bGVMYWJlbD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3RpdGxlTGFiZWwnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIHRpdGxlTGFiZWwuc3RyaW5nPUxNLmdldFN0ckJ5VGV4dElkKDExMDAyMylcclxuICAgICAgICBsZXQgYnVmZkl0ZW09Y2MuaW5zdGFudGlhdGUodGhpcy5wcmVmYWJfYnVmZl9pdGVtKTtcclxuICAgICAgICBidWZmSXRlbS5zY2FsZT0xO1xyXG4gICAgICAgIGJ1ZmZJdGVtLmdldENvbXBvbmVudChNYXplQnVmZkl0ZW0pLmluaXQodGhpcy5idWZmX2lkKTtcclxuICAgICAgICBidWZmSXRlbS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGU9ZmFsc2U7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdidWZmUm9vdCcpLmFkZENoaWxkKGJ1ZmZJdGVtKTtcclxuICAgICAgICBidWZmSXRlbS55PS0yNDM7XHJcbiAgICAgICAgYnVmZkl0ZW0ueD0wO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8v5YaF5a65XHJcbiAgICAgICAgbGV0IGRldGFpbExhYmVsPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnZGV0YWlsTGFiZWwnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIGRldGFpbExhYmVsLnN0cmluZz10aGlzLmdldFZhbHVlU3RyaW5nQnlTdHJpbmcoTE0uZ2V0U3RyQnlUZXh0SWQoanNvbkRhdGEuUm9ndWVCdWZmVGV4dF9JRCksanNvbkRhdGEuUm9ndWVCdWZmMV9WYWx1ZSxqc29uRGF0YS5Sb2d1ZUJ1ZmYyX1ZhbHVlLGpzb25EYXRhLlJvZ3VlQnVmZjNfVmFsdWUpO1xyXG4gICAgfSAgICBcclxuXHJcbiAgICBnZXRWYWx1ZVN0cmluZ0J5U3RyaW5nKHN0cjpzdHJpbmcsdmFsdWUxOm51bWJlcix2YWx1ZTI6bnVtYmVyLHZhbHVlMzpudW1iZXIpOnN0cmluZ3sgICAgICAgIFxyXG4gICAgICAgIGlmKHN0ci5pbmNsdWRlcyhcIn54JVwiKSl7XHJcbiAgICAgICAgICAgIHZhbHVlMSo9MTAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihzdHIuaW5jbHVkZXMoXCJ+eSVcIikpe1xyXG4gICAgICAgICAgICB2YWx1ZTIqPTEwMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoc3RyLmluY2x1ZGVzKFwifnolXCIpKXtcclxuICAgICAgICAgICAgdmFsdWUzKj0xMDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBuZXdTdHI9c3RyLnJlcGxhY2UoXCJ+eFwiLHZhbHVlMSsnJyk7ICAgICAgICBcclxuICAgICAgICBuZXdTdHI9bmV3U3RyLnJlcGxhY2UoXCJ+eVwiLHZhbHVlMisnJyk7XHJcbiAgICAgICAgbmV3U3RyPW5ld1N0ci5yZXBsYWNlKFwifnpcIix2YWx1ZTIrJycpO1xyXG4gICAgICAgIHJldHVybiBuZXdTdHI7XHJcbiAgICB9XHJcbn1cclxuIl19