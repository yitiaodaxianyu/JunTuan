"use strict";
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