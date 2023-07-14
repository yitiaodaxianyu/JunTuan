
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Maze/MazeBox.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTWF6ZVxcTWF6ZUJveC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FBeUM7QUFDekMsMERBQXFEO0FBQ3JELDZDQUE0QztBQUM1Qyx1RUFBdUU7QUFDdkUseUVBQStFO0FBQy9FLDZDQUE0QztBQUM1QyxtQ0FBOEI7QUFFOUIsSUFBSyxRQUdKO0FBSEQsV0FBSyxRQUFRO0lBQ1QsbUNBQUksQ0FBQTtJQUNKLHVDQUFNLENBQUE7QUFDVixDQUFDLEVBSEksUUFBUSxLQUFSLFFBQVEsUUFHWjtBQUVLLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXFDLDJCQUFZO0lBQWpEO1FBQUEscUVBK0pDO1FBNUpHLHFCQUFlLEdBQWtCLEVBQUUsQ0FBQztRQUNwQyxVQUFVO1FBQ1YsWUFBTSxHQUFRLEtBQUssQ0FBQztRQUNwQixHQUFHO1FBQ0gsU0FBRyxHQUFRLENBQUMsQ0FBQztRQUNiLE1BQU07UUFDTixZQUFNLEdBQVEsQ0FBQyxDQUFDO1FBQ2hCLFVBQVU7UUFDVixpQkFBVyxHQUFRLEVBQUUsQ0FBQztRQUN0QixrQkFBWSxHQUFRLENBQUMsQ0FBQztRQUN0QixtQkFBYSxHQUFVLFFBQVEsQ0FBQyxFQUFFLENBQUM7UUFDbkMsWUFBTSxHQUFRLENBQUMsQ0FBQztRQUNoQixlQUFTLEdBQVEsQ0FBQyxDQUFDOztJQWdKdkIsQ0FBQztnQkEvSm9CLE9BQU87SUFpQnhCLHNCQUFJLEdBQUosVUFBTSxHQUFVLEVBQUMsTUFBYSxFQUFDLEVBQVM7UUFDcEMsSUFBSSxDQUFDLEdBQUcsR0FBQyxHQUFHLENBQUM7UUFDYixJQUFJLENBQUMsTUFBTSxHQUFDLE1BQU0sQ0FBQztRQUNuQixJQUFJLE9BQU8sR0FBQyxDQUFDLENBQUM7UUFDZCxJQUFJLENBQUMsV0FBVyxHQUFD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QyxRQUFRLENBQUMsSUFBSSxDQUFDO3FCQUNwQztpQkFDSjtnQkFBQSxNQUFNO1lBQ1AsS0FBSyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUE7Z0JBQ2YsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUUsRUFBRSxHQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7Z0JBQ2pDLElBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLFNBQVMsRUFBQztvQkFDMUIsSUFBSSxDQUFDLGFBQWEsR0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDO2lCQUNsQzthQUNKO1NBQ0o7SUFHTCxDQUFDOztJQTNKRDtRQURDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQztvREFDUztJQUhuQixPQUFPO1FBRDNCLE9BQU87T0FDYSxPQUFPLENBK0ozQjtJQUFELGNBQUM7Q0EvSkQsQUErSkMsQ0EvSm9DLEVBQUUsQ0FBQyxTQUFTLEdBK0poRDtrQkEvSm9CLE9BQU8iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFNvdW5kSW5kZXggfSBmcm9tIFwiLi4vU291bmQvQXVkaW9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgVUlNYW5hZ2VyIH0gZnJvbSBcIi4uL1VJL1VJTWFuYWdlclwiO1xyXG4vLyBpbXBvcnQgeyBSb2d1ZUhleGFnb25UeXBlc01hbmFnZXIgfSBmcm9tIFwiLi9EYXRhL1JvZ3VlSGV4YWdvblR5cGVzXCI7XHJcbmltcG9ydCB7IFJvZ3VlSGV4YWdvblR5cGVzTWFuYWdlciB9IGZyb20gXCIuLi9jb3B5L3ZvaWRjcmFjay9Sb2d1ZUhleGFnb25UeXBlc1wiO1xyXG5pbXBvcnQgeyBNYXplTWFuYWdlciB9IGZyb20gXCIuL01hemVNYW5hZ2VyXCI7XHJcbmltcG9ydCBNYXplVWkgZnJvbSBcIi4vTWF6ZVVpXCI7XHJcblxyXG5lbnVtIEZsb2F0RGlye1xyXG4gICAgVXA9MSxcclxuICAgIERvd249MixcclxufVxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYXplQm94IGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoW2NjLlNwcml0ZUZyYW1lXSlcclxuICAgIGljb25fZXZlbnRfdHlwZTpjYy5TcHJpdGVGcmFtZVtdPVtdO1xyXG4gICAgLyoq5qC85a2QaWQgKi9cclxuICAgIGJveF9pZDpudW1iZXI9MTAwMTE7XHJcbiAgICAvL+WIl1xyXG4gICAgcm93Om51bWJlcj0wO1xyXG4gICAgLy/ooYzvvIzlsYLmlbBcclxuICAgIGNvbHVtbjpudW1iZXI9MDtcclxuICAgIC8qKua1ruWKqOmAn+W6piAqL1xyXG4gICAgZmxvYXRfc3BlZWQ6bnVtYmVyPTEwO1xyXG4gICAgY2VudGVyX3Bvc195Om51bWJlcj0wO1xyXG4gICAgY3VyX2Zsb2F0X2RpcjpGbG9hdERpcj1GbG9hdERpci5VcDtcclxuICAgIHRvcF95eTpudW1iZXI9MDtcclxuICAgIGJvdHRvbV95eTpudW1iZXI9MDtcclxuXHJcbiAgICBpbml0IChyb3c6bnVtYmVyLGNvbHVtbjpudW1iZXIsaWQ6bnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5yb3c9cm93O1xyXG4gICAgICAgIHRoaXMuY29sdW1uPWNvbHVtbjtcclxuICAgICAgICBsZXQgb2Zmc2V0WT02O1xyXG4gICAgICAgIHRoaXMuZmxvYXRfc3BlZWQ9TWF0aC5yYW5kb20oKSpvZmZzZXRZLzQrb2Zmc2V0WS80O1xyXG4gICAgICAgIHRoaXMuY2VudGVyX3Bvc195PXRoaXMubm9kZS55O1xyXG4gICAgICAgIHRoaXMubm9kZS55PXRoaXMuY2VudGVyX3Bvc195K01hdGgucmFuZG9tKCkqb2Zmc2V0WS1vZmZzZXRZLzI7XHJcbiAgICAgICAgdGhpcy50b3BfeXk9dGhpcy5jZW50ZXJfcG9zX3krb2Zmc2V0WS8yO1xyXG4gICAgICAgIHRoaXMuYm90dG9tX3l5PXRoaXMuY2VudGVyX3Bvc195LW9mZnNldFkvMjtcclxuICAgICAgICB0aGlzLmN1cl9mbG9hdF9kaXI9TWF0aC5yYW5kb20oKT4wLjU/RmxvYXREaXIuVXA6RmxvYXREaXIuRG93bjtcclxuICAgICAgICB0aGlzLmJveF9pZD1pZDsgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHJlZnJlc2hCb3goKXtcclxuICAgICAgICAvL+aMiemSrlxyXG4gICAgICAgIGxldCBidG49dGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5CdXR0b24pO1xyXG4gICAgICAgIGxldCBzaGFkb3c9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdzaGFkb3cnKTtcclxuICAgICAgICBsZXQgY3VySnNvbkRhdGE9Um9ndWVIZXhhZ29uVHlwZXNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvblJvZ3VlSGV4YWdvblR5cGVzKHRoaXMuYm94X2lkKTtcclxuICAgICAgICBsZXQgcGFzc2VkSWRzPU1hemVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWF6ZVBhc3NlZElkcygpO1xyXG4gICAgICAgIGxldCBsYXN0UGFzc2VkSWQ9cGFzc2VkSWRzW3Bhc3NlZElkcy5sZW5ndGgtMV07XHJcbiAgICAgICAgbGV0IHBhc3NlZEpzb25EYXRhPVJvZ3VlSGV4YWdvblR5cGVzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25Sb2d1ZUhleGFnb25UeXBlcyhsYXN0UGFzc2VkSWQpO1xyXG4gICAgICAgIGxldCBwYXNzZWRUUz10aGlzLm5vZGUucGFyZW50LmdldENoaWxkQnlOYW1lKCcnK2xhc3RQYXNzZWRJZCkuZ2V0Q29tcG9uZW50KE1hemVCb3gpO1xyXG4gICAgICAgIGxldCBmaWdodGluZ0pzb25EYXRhPVJvZ3VlSGV4YWdvblR5cGVzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25Sb2d1ZUhleGFnb25UeXBlcyhNYXplTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEZpZ2h0aW5nSWQoKSk7XHJcbiAgICAgICAgbGV0IGZpZ2h0aW5nVFM9dGhpcy5ub2RlLnBhcmVudC5nZXRDaGlsZEJ5TmFtZSgnJytmaWdodGluZ0pzb25EYXRhLkhleGFnb25fSUQpLmdldENvbXBvbmVudChNYXplQm94KTtcclxuICAgICAgICAvL+WIh+aNouWbvuagh1xyXG4gICAgICAgIGxldCBpY29uPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnaWNvbicpO1xyXG4gICAgICAgIGljb24uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWU9dGhpcy5pY29uX2V2ZW50X3R5cGVbY3VySnNvbkRhdGEuSGV4YWdvblR5cGVdO1xyXG4gICAgICAgIGlmKHRoaXMucm93PD1wYXNzZWRUUy5yb3cpe1xyXG4gICAgICAgICAgICAvL+W3sue7j+mAmui/h+eahFxyXG4gICAgICAgICAgICBidG4uaW50ZXJhY3RhYmxlPWZhbHNlO1xyXG4gICAgICAgICAgICBpY29uLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgaWYoIXBhc3NlZElkcy5pbmNsdWRlcyhjdXJKc29uRGF0YS5IZXhhZ29uX0lEKSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2UgaWYodGhpcy5yb3c+cGFzc2VkVFMucm93KXtcclxuICAgICAgICAgICAgLy/mnKrpgJrov4fnmoRcclxuICAgICAgICAgICAgaWYodGhpcy5yb3ctcGFzc2VkVFMucm93PD0yKXtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMucm93LXBhc3NlZFRTLnJvdzw9MSl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/liKTmlq3mmK/lkKbnm7jpgrtcclxuICAgICAgICAgICAgICAgICAgICBpZihNYXplTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoZWNrQWRqYWNlbnQocGFzc2VkVFMucm93LHBhc3NlZFRTLmNvbHVtbix0aGlzLnJvdyx0aGlzLmNvbHVtbixwYXNzZWRUUy5yb3clMj09MCkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBidG4uaW50ZXJhY3RhYmxlPXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb24uYWN0aXZlPXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ0bi5pbnRlcmFjdGFibGU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb24uYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGJ0bi5pbnRlcmFjdGFibGU9dHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBpY29uLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgICAgICAgfSAgICBcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBpZihjdXJKc29uRGF0YS5IZXhhZ29uVHlwZT09MXx8Y3VySnNvbkRhdGEuSGV4YWdvblR5cGU9PTJ8fGN1ckpzb25EYXRhLkhleGFnb25UeXBlPT02KXtcclxuICAgICAgICAgICAgICAgICAgICBidG4uaW50ZXJhY3RhYmxlPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGljb24uYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBidG4uaW50ZXJhY3RhYmxlPXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbi5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/lkozmraPlnKjmiJjmlpflkIzkuIDooYxcclxuICAgICAgICBpZih0aGlzLnJvdz09ZmlnaHRpbmdUUy5yb3cpeyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZihjdXJKc29uRGF0YS5IZXhhZ29uX0lEPT1maWdodGluZ0pzb25EYXRhLkhleGFnb25fSUQpe1xyXG4gICAgICAgICAgICAgICAgLy/nm7jlkIxcclxuICAgICAgICAgICAgICAgIGJ0bi5pbnRlcmFjdGFibGU9dHJ1ZTtcclxuICAgICAgICAgICAgICAgIGljb24uYWN0aXZlPXRydWU7XHJcbiAgICAgICAgICAgICAgICAvL+eureWktFxyXG4gICAgICAgICAgICAgICAgaWYoY3VySnNvbkRhdGEuSGV4YWdvbl9JRCE9cGFzc2VkSnNvbkRhdGEuSGV4YWdvbl9JRCl7XHJcbiAgICAgICAgICAgICAgICAgICAgTWF6ZVVpLmdldEluc3RhbmNlKCkuc2hvd0Fycm93KHRoaXMubm9kZSk7XHJcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIC8v5LiN5ZCMXHJcbiAgICAgICAgICAgICAgICBidG4uaW50ZXJhY3RhYmxlPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgaWNvbi5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICAgICAgaWYoY3VySnNvbkRhdGEuSGV4YWdvbl9JRD09cGFzc2VkSnNvbkRhdGEuSGV4YWdvbl9JRCl7XHJcbiAgICAgICAgICAgIGJ0bi5pbnRlcmFjdGFibGU9ZmFsc2U7XHJcbiAgICAgICAgICAgIGljb24uYWN0aXZlPXRydWU7XHJcbiAgICAgICAgICAgIGljb24uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWU9dGhpcy5pY29uX2V2ZW50X3R5cGVbMF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNoYWRvdy5hY3RpdmU9aWNvbi5hY3RpdmU7XHJcbiAgICB9XHJcblxyXG4gICAgb25DbGljayhidG46Y2MuRXZlbnQuRXZlbnRUb3VjaCl7XHJcbiAgICAgICAgY2MubG9nKHRoaXMuYm94X2lkKTtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIGxldCBwYXNzZWRJZHM9TWF6ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYXplUGFzc2VkSWRzKCk7XHJcbiAgICAgICAgbGV0IGxhc3RQYXNzZWRJZD1wYXNzZWRJZHNbcGFzc2VkSWRzLmxlbmd0aC0xXTtcclxuICAgICAgICBsZXQgY3VySnNvbkRhdGE9Um9ndWVIZXhhZ29uVHlwZXNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvblJvZ3VlSGV4YWdvblR5cGVzKHRoaXMuYm94X2lkKTtcclxuICAgICAgICBsZXQgcGFzc2VkVFM9dGhpcy5ub2RlLnBhcmVudC5nZXRDaGlsZEJ5TmFtZSgnJytsYXN0UGFzc2VkSWQpLmdldENvbXBvbmVudChNYXplQm94KTtcclxuICAgICAgICBsZXQgaXNDYW5Hbz1NYXplTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoZWNrQWRqYWNlbnQocGFzc2VkVFMucm93LHBhc3NlZFRTLmNvbHVtbix0aGlzLnJvdyx0aGlzLmNvbHVtbixwYXNzZWRUUy5yb3clMj09MCk7XHJcbiAgICAgICAgc3dpdGNoKGN1ckpzb25EYXRhLkhleGFnb25UeXBlKXtcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgIGNhc2UgNjp7XHJcbiAgICAgICAgICAgICAgICBpZihNYXplTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFBhc3NpbmdJZCgpPT10aGlzLmJveF9pZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01hemVCdWZmVWkobnVsbCx0aGlzLmJveF9pZCxpc0NhbkdvKTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNYXplRmlnaHRpbmdVaShudWxsLHRoaXMuYm94X2lkLGlzQ2FuR28pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOntcclxuICAgICAgICAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNYXplTGVhc2VVaSh7b25SZWZyZXNoOigpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgTWF6ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRNYXplUGFzc2VkSWQodGhpcy5ib3hfaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIE1hemVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0RmlnaHRpbmdJZCh0aGlzLmJveF9pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgTWF6ZVVpLmdldEluc3RhbmNlKCkucmVmcmVzaEZsb29yKCk7XHJcbiAgICAgICAgICAgICAgICB9fSx0aGlzLmJveF9pZCxpc0NhbkdvKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDQ6e1xyXG4gICAgICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01hemVTaG9wVWkobnVsbCx0aGlzLmJveF9pZCxpc0NhbkdvKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDU6e1xyXG4gICAgICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01hemVIZWFsaW5nUG90aW9uVWkobnVsbCx0aGlzLmJveF9pZCxpc0NhbkdvKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlIChkdDpudW1iZXIpIHtcclxuXHJcbiAgICAgICAgc3dpdGNoKHRoaXMuY3VyX2Zsb2F0X2Rpcil7XHJcbiAgICAgICAgICAgIGNhc2UgRmxvYXREaXIuVXA6e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnkrPWR0KnRoaXMuZmxvYXRfc3BlZWQ7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLm5vZGUueT50aGlzLnRvcF95eSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJfZmxvYXRfZGlyPUZsb2F0RGlyLkRvd247XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBGbG9hdERpci5Eb3duOntcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS55LT1kdCp0aGlzLmZsb2F0X3NwZWVkO1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5ub2RlLnk8dGhpcy5ib3R0b21feXkpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VyX2Zsb2F0X2Rpcj1GbG9hdERpci5VcDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgIH1cclxufVxyXG5cclxuIl19