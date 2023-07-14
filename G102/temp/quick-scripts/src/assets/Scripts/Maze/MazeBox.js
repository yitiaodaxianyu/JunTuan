"use strict";
cc._RF.push(module, '8ee03oVEZRObqLYhSsRjNKs', 'MazeBox');
// Scripts/Maze/MazeBox.ts

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
var AudioConstants_1 = require("../Sound/AudioConstants");
var UIManager_1 = require("../UI/UIManager");
// import { RogueHexagonTypesManager } from "./Data/RogueHexagonTypes";
var RogueHexagonTypes_1 = require("../copy/voidcrack/RogueHexagonTypes");
var MazeManager_1 = require("./MazeManager");
var MazeUi_1 = require("./MazeUi");
var FloatDir;
(function (FloatDir) {
    FloatDir[FloatDir["Up"] = 1] = "Up";
    FloatDir[FloatDir["Down"] = 2] = "Down";
})(FloatDir || (FloatDir = {}));
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MazeBox = /** @class */ (function (_super) {
    __extends(MazeBox, _super);
    function MazeBox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.icon_event_type = [];
        /**格子id */
        _this.box_id = 10011;
        //列
        _this.row = 0;
        //行，层数
        _this.column = 0;
        /**浮动速度 */
        _this.float_speed = 10;
        _this.center_pos_y = 0;
        _this.cur_float_dir = FloatDir.Up;
        _this.top_yy = 0;
        _this.bottom_yy = 0;
        return _this;
    }
    MazeBox_1 = MazeBox;
    MazeBox.prototype.init = function (row, column, id) {
        this.row = row;
        this.column = column;
        var offsetY = 6;
        this.float_speed = Math.random() * offsetY / 4 + offsetY / 4;
        this.center_pos_y = this.node.y;
        this.node.y = this.center_pos_y + Math.random() * offsetY - offsetY / 2;
        this.top_yy = this.center_pos_y + offsetY / 2;
        this.bottom_yy = this.center_pos_y - offsetY / 2;
        this.cur_float_dir = Math.random() > 0.5 ? FloatDir.Up : FloatDir.Down;
        this.box_id = id;
    };
    MazeBox.prototype.refreshBox = function () {
        //按钮
        var btn = this.node.getComponent(cc.Button);
        var shadow = this.node.getChildByName('shadow');
        var curJsonData = RogueHexagonTypes_1.RogueHexagonTypesManager.getInstance().getJsonRogueHexagonTypes(this.box_id);
        var passedIds = MazeManager_1.MazeManager.getInstance().getMazePassedIds();
        var lastPassedId = passedIds[passedIds.length - 1];
        var passedJsonData = RogueHexagonTypes_1.RogueHexagonTypesManager.getInstance().getJsonRogueHexagonTypes(lastPassedId);
        var passedTS = this.node.parent.getChildByName('' + lastPassedId).getComponent(MazeBox_1);
        var fightingJsonData = RogueHexagonTypes_1.RogueHexagonTypesManager.getInstance().getJsonRogueHexagonTypes(MazeManager_1.MazeManager.getInstance().getFightingId());
        var fightingTS = this.node.parent.getChildByName('' + fightingJsonData.Hexagon_ID).getComponent(MazeBox_1);
        //切换图标
        var icon = this.node.getChildByName('icon');
        icon.getComponent(cc.Sprite).spriteFrame = this.icon_event_type[curJsonData.HexagonType];
        if (this.row <= passedTS.row) {
            //已经通过的
            btn.interactable = false;
            icon.active = false;
            if (!passedIds.includes(curJsonData.Hexagon_ID)) {
                this.node.active = false;
            }
        }
        else if (this.row > passedTS.row) {
            //未通过的
            if (this.row - passedTS.row <= 2) {
                if (this.row - passedTS.row <= 1) {
                    //判断是否相邻
                    if (MazeManager_1.MazeManager.getInstance().checkAdjacent(passedTS.row, passedTS.column, this.row, this.column, passedTS.row % 2 == 0)) {
                        btn.interactable = true;
                        icon.active = true;
                    }
                    else {
                        btn.interactable = false;
                        icon.active = false;
                        this.node.active = false;
                    }
                }
                else {
                    btn.interactable = true;
                    icon.active = true;
                }
            }
            else {
                if (curJsonData.HexagonType == 1 || curJsonData.HexagonType == 2 || curJsonData.HexagonType == 6) {
                    btn.interactable = false;
                    icon.active = false;
                }
                else {
                    btn.interactable = true;
                    icon.active = true;
                }
            }
        }
        //和正在战斗同一行
        if (this.row == fightingTS.row) {
            if (curJsonData.Hexagon_ID == fightingJsonData.Hexagon_ID) {
                //相同
                btn.interactable = true;
                icon.active = true;
                //箭头
                if (curJsonData.Hexagon_ID != passedJsonData.Hexagon_ID) {
                    MazeUi_1.default.getInstance().showArrow(this.node);
                }
            }
            else {
                //不同
                btn.interactable = false;
                icon.active = false;
                this.node.active = false;
            }
        }
        if (curJsonData.Hexagon_ID == passedJsonData.Hexagon_ID) {
            btn.interactable = false;
            icon.active = true;
            icon.getComponent(cc.Sprite).spriteFrame = this.icon_event_type[0];
        }
        shadow.active = icon.active;
    };
    MazeBox.prototype.onClick = function (btn) {
        var _this = this;
        cc.log(this.box_id);
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        var passedIds = MazeManager_1.MazeManager.getInstance().getMazePassedIds();
        var lastPassedId = passedIds[passedIds.length - 1];
        var curJsonData = RogueHexagonTypes_1.RogueHexagonTypesManager.getInstance().getJsonRogueHexagonTypes(this.box_id);
        var passedTS = this.node.parent.getChildByName('' + lastPassedId).getComponent(MazeBox_1);
        var isCanGo = MazeManager_1.MazeManager.getInstance().checkAdjacent(passedTS.row, passedTS.column, this.row, this.column, passedTS.row % 2 == 0);
        switch (curJsonData.HexagonType) {
            case 1:
            case 2:
            case 6:
                {
                    if (MazeManager_1.MazeManager.getInstance().getPassingId() == this.box_id) {
                        UIManager_1.UIManager.getInstance().showMazeBuffUi(null, this.box_id, isCanGo);
                    }
                    else {
                        UIManager_1.UIManager.getInstance().showMazeFightingUi(null, this.box_id, isCanGo);
                    }
                }
                break;
            case 3:
                {
                    UIManager_1.UIManager.getInstance().showMazeLeaseUi({ onRefresh: function () {
                            MazeManager_1.MazeManager.getInstance().addMazePassedId(_this.box_id);
                            MazeManager_1.MazeManager.getInstance().setFightingId(_this.box_id);
                            MazeUi_1.default.getInstance().refreshFloor();
                        } }, this.box_id, isCanGo);
                }
                break;
            case 4:
                {
                    UIManager_1.UIManager.getInstance().showMazeShopUi(null, this.box_id, isCanGo);
                }
                break;
            case 5:
                {
                    UIManager_1.UIManager.getInstance().showMazeHealingPotionUi(null, this.box_id, isCanGo);
                }
                break;
        }
    };
    MazeBox.prototype.update = function (dt) {
        switch (this.cur_float_dir) {
            case FloatDir.Up:
                {
                    this.node.y += dt * this.float_speed;
                    if (this.node.y > this.top_yy) {
                        this.cur_float_dir = FloatDir.Down;
                    }
                }
                break;
            case FloatDir.Down: {
                this.node.y -= dt * this.float_speed;
                if (this.node.y < this.bottom_yy) {
                    this.cur_float_dir = FloatDir.Up;
                }
            }
        }
    };
    var MazeBox_1;
    __decorate([
        property([cc.SpriteFrame])
    ], MazeBox.prototype, "icon_event_type", void 0);
    MazeBox = MazeBox_1 = __decorate([
        ccclass
    ], MazeBox);
    return MazeBox;
}(cc.Component));
exports.default = MazeBox;

cc._RF.pop();