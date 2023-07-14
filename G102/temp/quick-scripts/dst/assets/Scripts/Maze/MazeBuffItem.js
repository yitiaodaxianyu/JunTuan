
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Maze/MazeBuffItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8578eBtcbtHt7v4WZ+zJMWu', 'MazeBuffItem');
// Scripts/Maze/MazeBuffItem.ts

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
var GameManager_1 = require("../GameManager");
var LanguageManager_1 = require("../multiLanguage/LanguageManager");
var AudioConstants_1 = require("../Sound/AudioConstants");
var UIManager_1 = require("../UI/UIManager");
var RogueBuff_1 = require("./Data/RogueBuff");
var MazeUi_1 = require("./MazeUi");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MazeBuffItem = /** @class */ (function (_super) {
    __extends(MazeBuffItem, _super);
    function MazeBuffItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**buff id */
        _this.buff_id = 1001;
        return _this;
    }
    MazeBuffItem.prototype.init = function (id) {
        this.buff_id = id;
        this.refreshBuff();
    };
    MazeBuffItem.prototype.refreshBuff = function () {
        var RBM = RogueBuff_1.RogueBuffManager.getInstance();
        var LM = LanguageManager_1.default.getInstance();
        var quality = RBM.getRogueBuff_Quality(this.buff_id);
        //buff的数据
        var jsonData = RBM.getJsonRogueBuff(this.buff_id);
        //名称
        var titleLabel = this.node.getChildByName('titleLabel').getComponent(cc.Label);
        titleLabel.string = LM.getStrByTextId(jsonData.RogueBuff_Name);
        titleLabel.node.color = this.getFontColorByQuality(quality);
        //内容
        var detailLabel = this.node.getChildByName('detailLabel').getComponent(cc.Label);
        detailLabel.string = this.getValueStringByString(LM.getStrByTextId(jsonData.RogueBuffText_ID), jsonData.RogueBuff1_Value, jsonData.RogueBuff2_Value, jsonData.RogueBuff3_Value);
        //品质图标
        var qualityIcon = this.node.getChildByName('quality').getComponent(cc.Sprite);
        qualityIcon.spriteFrame = MazeUi_1.default.getInstance().getSpByName('Maze_Quality_' + (quality - 1));
        //品质文字
        var qualityLabel = this.node.getChildByName('qualityLabel').getComponent(cc.Label);
        qualityLabel.string = this.getStringByQuality(quality);
        qualityLabel.node.color = this.getFontColorByQuality(quality);
        //内容详情
        var detailLabel2 = this.node.getChildByName('detailLabel').getComponent(cc.Label);
        detailLabel2.string = this.getValueStringByString(LM.getStrByTextId(jsonData.RogueBuffText_ID), jsonData.RogueBuff1_Value, jsonData.RogueBuff2_Value, jsonData.RogueBuff3_Value);
        //类型图标
        var iconSp = this.node.getChildByName('icon').getComponent(cc.Sprite);
        iconSp.spriteFrame = MazeUi_1.default.getInstance().getSpByName('Maze_Buff_Icon_' + jsonData.RogueBuff_Type);
    };
    MazeBuffItem.prototype.getValueStringByString = function (str, value1, value2, value3) {
        if (str.includes("~x%")) {
            value1 *= 100;
        }
        if (str.includes("~y%")) {
            value2 *= 100;
        }
        if (str.includes("~z%")) {
            value3 *= 100;
        }
        var newStr = str.replace("~x", value1.toFixed(0));
        newStr = newStr.replace("~y", value2.toFixed(0));
        newStr = newStr.replace("~z", value2.toFixed(0));
        return newStr;
    };
    MazeBuffItem.prototype.getFontColorByQuality = function (quality) {
        var color = cc.Color.BLUE;
        switch (quality) {
            case 1:
                {
                    color = cc.color(105, 183, 255);
                }
                break;
            case 2:
                {
                    color = cc.color(226, 126, 255);
                }
                break;
            case 3:
                {
                    color = cc.color(255, 193, 74);
                }
                break;
        }
        return color;
    };
    MazeBuffItem.prototype.getOutLineColorByQuality = function (quality) {
        var color = cc.Color.BLUE;
        switch (quality) {
            case 1:
                {
                    color = cc.color(37, 49, 71);
                }
                break;
            case 2:
                {
                    color = cc.color(37, 49, 71);
                }
                break;
            case 3:
                {
                    color = cc.color(105, 183, 255);
                }
                break;
        }
        return color;
    };
    MazeBuffItem.prototype.getStringByQuality = function (quality) {
        return LanguageManager_1.default.getInstance().getStrByTextId(110005 + quality * 2);
    };
    MazeBuffItem.prototype.onClick = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_ChoseBuff);
        UIManager_1.UIManager.getInstance().showMazeBuffInfo(this.buff_id);
    };
    MazeBuffItem = __decorate([
        ccclass
    ], MazeBuffItem);
    return MazeBuffItem;
}(cc.Component));
exports.default = MazeBuffItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTWF6ZVxcTWF6ZUJ1ZmZJdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDhDQUF5QztBQUN6QyxvRUFBK0Q7QUFDL0QsMERBQXFEO0FBQ3JELDZDQUE0QztBQUM1Qyw4Q0FBb0Q7QUFDcEQsbUNBQThCO0FBR3hCLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQTBDLGdDQUFZO0lBQXREO1FBQUEscUVBK0ZDO1FBN0ZHLGFBQWE7UUFDYixhQUFPLEdBQVEsSUFBSSxDQUFDOztJQTRGeEIsQ0FBQztJQTFGRywyQkFBSSxHQUFKLFVBQUssRUFBUztRQUNWLElBQUksQ0FBQyxPQUFPLEdBQUMsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRUQsa0NBQVcsR0FBWDtRQUNJLElBQUksR0FBRyxHQUFDLDRCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFBO1FBQ3RDLElBQUksRUFBRSxHQUFDLHlCQUFlLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDckMsSUFBSSxPQUFPLEdBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNuRCxTQUFTO1FBQ1QsSUFBSSxRQUFRLEdBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNoRCxJQUFJO1FBQ0osSUFBSSxVQUFVLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM3RSxVQUFVLENBQUMsTUFBTSxHQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FB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QztvQkFDSCxLQUFLLEdBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUMvQjtnQkFBQSxNQUFNO1NBQ1Y7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQseUNBQWtCLEdBQWxCLFVBQW1CLE9BQWM7UUFDN0IsT0FBTyx5QkFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEdBQUMsT0FBTyxHQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFFRCw4QkFBTyxHQUFQO1FBQ0kscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLDJCQUFVLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFM0UscUJBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQTlGZ0IsWUFBWTtRQURoQyxPQUFPO09BQ2EsWUFBWSxDQStGaEM7SUFBRCxtQkFBQztDQS9GRCxBQStGQyxDQS9GeUMsRUFBRSxDQUFDLFNBQVMsR0ErRnJEO2tCQS9Gb0IsWUFBWSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IExhbmd1YWdlTWFuYWdlciBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9MYW5ndWFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU291bmRJbmRleCB9IGZyb20gXCIuLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBVSU1hbmFnZXIgfSBmcm9tIFwiLi4vVUkvVUlNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFJvZ3VlQnVmZk1hbmFnZXIgfSBmcm9tIFwiLi9EYXRhL1JvZ3VlQnVmZlwiO1xyXG5pbXBvcnQgTWF6ZVVpIGZyb20gXCIuL01hemVVaVwiO1xyXG5cclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWF6ZUJ1ZmZJdGVtIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICAvKipidWZmIGlkICovXHJcbiAgICBidWZmX2lkOm51bWJlcj0xMDAxO1xyXG5cclxuICAgIGluaXQoaWQ6bnVtYmVyKXtcclxuICAgICAgICB0aGlzLmJ1ZmZfaWQ9aWQ7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoQnVmZigpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlZnJlc2hCdWZmKCl7XHJcbiAgICAgICAgbGV0IFJCTT1Sb2d1ZUJ1ZmZNYW5hZ2VyLmdldEluc3RhbmNlKClcclxuICAgICAgICBsZXQgTE09TGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgbGV0IHF1YWxpdHk9UkJNLmdldFJvZ3VlQnVmZl9RdWFsaXR5KHRoaXMuYnVmZl9pZCk7XHJcbiAgICAgICAgLy9idWZm55qE5pWw5o2uXHJcbiAgICAgICAgbGV0IGpzb25EYXRhPVJCTS5nZXRKc29uUm9ndWVCdWZmKHRoaXMuYnVmZl9pZCk7XHJcbiAgICAgICAgLy/lkI3np7BcclxuICAgICAgICBsZXQgdGl0bGVMYWJlbD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3RpdGxlTGFiZWwnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIHRpdGxlTGFiZWwuc3RyaW5nPUxNLmdldFN0ckJ5VGV4dElkKGpzb25EYXRhLlJvZ3VlQnVmZl9OYW1lKTtcclxuICAgICAgICB0aXRsZUxhYmVsLm5vZGUuY29sb3I9dGhpcy5nZXRGb250Q29sb3JCeVF1YWxpdHkocXVhbGl0eSk7XHJcbiAgICAgICAgLy/lhoXlrrlcclxuICAgICAgICBsZXQgZGV0YWlsTGFiZWw9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdkZXRhaWxMYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgZGV0YWlsTGFiZWwuc3RyaW5nPXRoaXMuZ2V0VmFsdWVTdHJpbmdCeVN0cmluZyhMTS5nZXRTdHJCeVRleHRJZChqc29uRGF0YS5Sb2d1ZUJ1ZmZUZXh0X0lEKSxqc29uRGF0YS5Sb2d1ZUJ1ZmYxX1ZhbHVlLGpzb25EYXRhLlJvZ3VlQnVmZjJfVmFsdWUsanNvbkRhdGEuUm9ndWVCdWZmM19WYWx1ZSk7XHJcbiAgICAgICAgLy/lk4HotKjlm77moIdcclxuICAgICAgICBsZXQgcXVhbGl0eUljb249dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdxdWFsaXR5JykuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICAgICAgcXVhbGl0eUljb24uc3ByaXRlRnJhbWU9TWF6ZVVpLmdldEluc3RhbmNlKCkuZ2V0U3BCeU5hbWUoJ01hemVfUXVhbGl0eV8nKyhxdWFsaXR5LTEpKVxyXG4gICAgICAgIC8v5ZOB6LSo5paH5a2XXHJcbiAgICAgICAgbGV0IHF1YWxpdHlMYWJlbD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3F1YWxpdHlMYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgcXVhbGl0eUxhYmVsLnN0cmluZz10aGlzLmdldFN0cmluZ0J5UXVhbGl0eShxdWFsaXR5KTtcclxuICAgICAgICBxdWFsaXR5TGFiZWwubm9kZS5jb2xvcj10aGlzLmdldEZvbnRDb2xvckJ5UXVhbGl0eShxdWFsaXR5KTtcclxuICAgICAgICAvL+WGheWuueivpuaDhVxyXG4gICAgICAgIGxldCBkZXRhaWxMYWJlbDI9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdkZXRhaWxMYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgZGV0YWlsTGFiZWwyLnN0cmluZz10aGlzLmdldFZhbHVlU3RyaW5nQnlTdHJpbmcoTE0uZ2V0U3RyQnlUZXh0SWQoanNvbkRhdGEuUm9ndWVCdWZmVGV4dF9JRCksanNvbkRhdGEuUm9ndWVCdWZmMV9WYWx1ZSxqc29uRGF0YS5Sb2d1ZUJ1ZmYyX1ZhbHVlLGpzb25EYXRhLlJvZ3VlQnVmZjNfVmFsdWUpO1xyXG4gICAgICAgIC8v57G75Z6L5Zu+5qCHXHJcbiAgICAgICAgbGV0IGljb25TcD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2ljb24nKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcclxuICAgICAgICBpY29uU3Auc3ByaXRlRnJhbWU9TWF6ZVVpLmdldEluc3RhbmNlKCkuZ2V0U3BCeU5hbWUoJ01hemVfQnVmZl9JY29uXycranNvbkRhdGEuUm9ndWVCdWZmX1R5cGUpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFZhbHVlU3RyaW5nQnlTdHJpbmcoc3RyOnN0cmluZyx2YWx1ZTE6bnVtYmVyLHZhbHVlMjpudW1iZXIsdmFsdWUzOm51bWJlcik6c3RyaW5ne1xyXG4gICAgICAgIGlmKHN0ci5pbmNsdWRlcyhcIn54JVwiKSl7XHJcbiAgICAgICAgICAgIHZhbHVlMSo9MTAwOyAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihzdHIuaW5jbHVkZXMoXCJ+eSVcIikpe1xyXG4gICAgICAgICAgICB2YWx1ZTIqPTEwMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoc3RyLmluY2x1ZGVzKFwifnolXCIpKXtcclxuICAgICAgICAgICAgdmFsdWUzKj0xMDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBuZXdTdHI9c3RyLnJlcGxhY2UoXCJ+eFwiLHZhbHVlMS50b0ZpeGVkKDApKTsgICAgICAgIFxyXG4gICAgICAgIG5ld1N0cj1uZXdTdHIucmVwbGFjZShcIn55XCIsdmFsdWUyLnRvRml4ZWQoMCkpO1xyXG4gICAgICAgIG5ld1N0cj1uZXdTdHIucmVwbGFjZShcIn56XCIsdmFsdWUyLnRvRml4ZWQoMCkpO1xyXG4gICAgICAgIHJldHVybiBuZXdTdHI7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Rm9udENvbG9yQnlRdWFsaXR5KHF1YWxpdHk6bnVtYmVyKTpjYy5Db2xvcntcclxuICAgICAgICBsZXQgY29sb3I9Y2MuQ29sb3IuQkxVRTtcclxuICAgICAgICBzd2l0Y2gocXVhbGl0eSl7XHJcbiAgICAgICAgICAgIGNhc2UgMTp7XHJcbiAgICAgICAgICAgICAgICBjb2xvcj1jYy5jb2xvcigxMDUsMTgzLDI1NSk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOntcclxuICAgICAgICAgICAgICAgIGNvbG9yPWNjLmNvbG9yKDIyNiwxMjYsMjU1KTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDM6e1xyXG4gICAgICAgICAgICAgICAgY29sb3I9Y2MuY29sb3IoMjU1LDE5Myw3NCk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNvbG9yO1xyXG4gICAgfVxyXG5cclxuICAgIGdldE91dExpbmVDb2xvckJ5UXVhbGl0eShxdWFsaXR5Om51bWJlcik6Y2MuQ29sb3J7XHJcbiAgICAgICAgbGV0IGNvbG9yPWNjLkNvbG9yLkJMVUU7XHJcbiAgICAgICAgc3dpdGNoKHF1YWxpdHkpe1xyXG4gICAgICAgICAgICBjYXNlIDE6e1xyXG4gICAgICAgICAgICAgICAgY29sb3I9Y2MuY29sb3IoMzcsNDksNzEpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjp7XHJcbiAgICAgICAgICAgICAgICBjb2xvcj1jYy5jb2xvcigzNyw0OSw3MSk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOntcclxuICAgICAgICAgICAgICAgIGNvbG9yPWNjLmNvbG9yKDEwNSwxODMsMjU1KTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY29sb3I7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U3RyaW5nQnlRdWFsaXR5KHF1YWxpdHk6bnVtYmVyKTpzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDExMDAwNStxdWFsaXR5KjIpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ2xpY2soKXtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguWVhfQ2hvc2VCdWZmKTtcclxuICAgICAgICBcclxuICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWF6ZUJ1ZmZJbmZvKHRoaXMuYnVmZl9pZCk7XHJcbiAgICB9XHJcbn1cclxuIl19