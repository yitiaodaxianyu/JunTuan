
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Maze/MazeUi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '072c1YKcDJOfKffBDr347uI', 'MazeUi');
// Scripts/Maze/MazeUi.ts

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
var MazeBox_1 = require("./MazeBox");
var MazeRoad_1 = require("./Data/MazeRoad");
// import { RogueHexagonTypesManager } from "./Data/RogueHexagonTypes";
var RogueHexagonTypes_1 = require("../copy/voidcrack/RogueHexagonTypes");
var MazeManager_1 = require("./MazeManager");
var GameManager_1 = require("../GameManager");
var AudioConstants_1 = require("../Sound/AudioConstants");
var UIManager_1 = require("../UI/UIManager");
var FixedPos_1 = require("../UI/home/FixedPos");
var LanguageManager_1 = require("../multiLanguage/LanguageManager");
var Constants_1 = require("../Constants");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MazeUi = /** @class */ (function (_super) {
    __extends(MazeUi, _super);
    function MazeUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefab_box = null;
        _this.prefab_arrow = null;
        _this.prefab_door = null;
        _this.maze_sp = null;
        _this.board_box = null;
        /**当前关的层数 */
        _this.cur_floor_num = 1;
        /**当前迷宫的层数 */
        _this.cur_layout_num = 1;
        return _this;
    }
    MazeUi_1 = MazeUi;
    MazeUi.getInstance = function () {
        return this._instance;
    };
    MazeUi.prototype.onLoad = function () {
        MazeUi_1._instance = this;
        this.adaptation();
        MazeManager_1.MazeManager.getInstance().checkDate();
        MazeManager_1.MazeManager.getInstance().recoverHeroBind();
    };
    MazeUi.prototype.onDestroy = function () {
        MazeUi_1._instance = null;
    };
    MazeUi.prototype.adaptation = function () {
        //上下模块
        var bottom = this.node.getChildByName('bottom');
        var top = this.node.getChildByName('top');
        var wp = cc.winSize;
        bottom.y = -wp.height / 2;
        top.y = wp.height / 2;
        this.node.getChildByName('scrollView').y = bottom.y + bottom.height;
    };
    MazeUi.prototype.start = function () {
        this.cur_layout_num = MazeManager_1.MazeManager.getInstance().getFloor();
        this.board_box = new Array();
        var boxIdList = MazeManager_1.MazeManager.getInstance().getGroundBoxIdList();
        if (boxIdList.length == 0) {
            this.initBoard();
        }
        else {
            this.createBoard(boxIdList);
        }
        var floorStr = LanguageManager_1.default.getInstance().getStrByTextId(100020).replace('~', MazeManager_1.MazeManager.getInstance().getFloor() + '');
        var str = LanguageManager_1.default.getInstance().getStrByTextId(830001) + ": " + floorStr;
        this.node.getChildByName('top').getChildByName('title').getComponent(cc.Label).string = str;
        //GameManager.getInstance().music_manager.playMusic(MusicIndex.BGM_RogueBgm);
        this.schedule(function () {
            MazeManager_1.MazeManager.getInstance().getRemainTime();
        }, 1);
    };
    /**初始化迷宫棋牌 */
    MazeUi.prototype.initBoard = function () {
        var content = this.node.getChildByName('scrollView').getComponent(cc.ScrollView).content;
        content.removeAllChildren();
        //从下往上
        var bottom = 0;
        var intervalX = 180;
        var intervalY = 140;
        //奇数行最左的位置
        var oddLeft = -180;
        //偶数行最左的位置
        var evenLeft = oddLeft + intervalX / 2;
        var maxCC = 3;
        var maxRR = 9;
        var boards = MazeRoad_1.MazeRoadManager.getInstance().getMazeRoad();
        var lastYY = 0;
        var boxIdList = new Array();
        for (var r = 1; r <= maxRR; r++) {
            var nodes = new Array();
            var isEven = r % 2 == 0;
            var ccArr = [];
            var rIdList = new Array();
            for (var c = 1; c <= maxCC; c++) {
                if (isEven && c == maxCC) {
                    break;
                }
                var rIndex = r - 1;
                var cIndex = c - 1;
                if (boards[rIndex][cIndex] > 0) {
                    ccArr.push(c);
                }
            }
            for (var c = 1; c <= maxCC; c++) {
                if (isEven && c == maxCC) {
                    break;
                }
                var rIndex = r - 1;
                var cIndex = c - 1;
                if (boards[rIndex][cIndex] > 0) {
                    var startX = isEven ? evenLeft : oddLeft;
                    var xx = startX + cIndex * intervalX;
                    var yy = bottom + intervalY * r;
                    var ccIndex = Math.floor(Math.random() * ccArr.length);
                    var id = RogueHexagonTypes_1.RogueHexagonTypesManager.getId(this.cur_layout_num, r, ccArr[ccIndex]);
                    var box = cc.instantiate(this.prefab_box);
                    content.addChild(box);
                    box.zIndex = 100 - r;
                    box.x = xx;
                    box.y = yy;
                    nodes.push(box);
                    box.getComponent(MazeBox_1.default).init(r, c, id);
                    box.name = '' + id;
                    lastYY = yy;
                    ccArr.splice(ccIndex, 1);
                    rIdList.push(id);
                }
                else {
                    rIdList.push(0);
                }
            }
            this.board_box.push(nodes);
            boxIdList.push(rIdList);
        }
        var door = cc.instantiate(this.prefab_door);
        door.y = lastYY + door.height * door.scale;
        content.addChild(door);
        content.height = maxRR * intervalY + 265 * 2 + door.height * door.scale;
        this.refreshFloor();
        MazeManager_1.MazeManager.getInstance().saveGroundBoxIdList(boxIdList);
    };
    /**生成迷宫棋盘 */
    MazeUi.prototype.createBoard = function (list) {
        var content = this.node.getChildByName('scrollView').getComponent(cc.ScrollView).content;
        content.removeAllChildren();
        //从下往上
        var bottom = 0;
        var intervalX = 180;
        var intervalY = 140;
        //奇数行最左的位置
        var oddLeft = -180;
        //偶数行最左的位置
        var evenLeft = oddLeft + intervalX / 2;
        var maxCC = 3;
        var maxRR = 9;
        var boards = MazeRoad_1.MazeRoadManager.getInstance().getMazeRoad();
        var lastYY = 0;
        for (var r = 1; r <= maxRR; r++) {
            var nodes = new Array();
            var isEven = r % 2 == 0;
            for (var c = 1; c <= maxCC; c++) {
                if (isEven && c == maxCC) {
                    break;
                }
                var rIndex = r - 1;
                var cIndex = c - 1;
                if (boards[rIndex][cIndex] > 0) {
                    var startX = isEven ? evenLeft : oddLeft;
                    var xx = startX + cIndex * intervalX;
                    var yy = bottom + intervalY * r;
                    var id = list[rIndex][cIndex];
                    var box = cc.instantiate(this.prefab_box);
                    content.addChild(box);
                    box.zIndex = 100 - r;
                    box.x = xx;
                    box.y = yy;
                    nodes.push(box);
                    box.getComponent(MazeBox_1.default).init(r, c, id);
                    box.name = '' + id;
                    lastYY = yy;
                }
            }
            this.board_box.push(nodes);
        }
        var door = cc.instantiate(this.prefab_door);
        door.y = lastYY + door.height * door.scale;
        content.addChild(door);
        content.height = maxRR * intervalY + 265 * 2 + door.height * door.scale;
        this.refreshFloor();
    };
    MazeUi.prototype.refreshFloor = function () {
        this.removeAllArrow();
        var boxRoot = this.node.getChildByName('scrollView').getComponent(cc.ScrollView).content;
        var len = boxRoot.childrenCount;
        var passedIds = MazeManager_1.MazeManager.getInstance().getMazePassedIds();
        var lastPassedId = passedIds[passedIds.length - 1];
        this.cur_floor_num = RogueHexagonTypes_1.RogueHexagonTypesManager.getInstance().getRows(lastPassedId);
        for (var r = 0; r < len; r++) {
            var mazeBox = boxRoot.children[r].getComponent(MazeBox_1.default);
            if (mazeBox && mazeBox.node.active) {
                mazeBox.refreshBox();
            }
        }
        boxRoot.getChildByName('door').active = this.cur_floor_num >= 9 && this.cur_layout_num <= 1;
        this.showWallInfo();
    };
    MazeUi.prototype.showWallInfo = function () {
        var btnWallInfo = this.node.getChildByName('top').getChildByName('btnWallInfo');
        var progressBar = btnWallInfo.getChildByName('progressBar');
        var per = MazeManager_1.MazeManager.getInstance().getMazeHp() / MazeManager_1.MazeManager.getInstance().getMazeMaxHp();
        progressBar.getComponent(cc.ProgressBar).progress = per;
        var num = btnWallInfo.getChildByName('num');
        num.getComponent(cc.Label).string = (per * 100).toFixed(1) + '%';
    };
    MazeUi.prototype.showArrow = function (node) {
        var content = this.node.getChildByName('scrollView').getComponent(cc.ScrollView).content;
        var arrow = cc.instantiate(this.prefab_arrow);
        this.node.getChildByName('scrollView').getChildByName('arrowRoot').addChild(arrow);
        arrow.setPosition(cc.v2(node.x, node.y + -content.parent.height / 2 + 300));
        arrow.getComponent(FixedPos_1.default).init(node, cc.v2(0, -content.parent.height / 2 + 300), content);
    };
    MazeUi.prototype.removeAllArrow = function () {
        this.node.getChildByName('scrollView').getChildByName('arrowRoot').removeAllChildren();
    };
    MazeUi.prototype.getSpByName = function (name) {
        return this.maze_sp.getSpriteFrame(name);
    };
    MazeUi.prototype.jumpToNextFloor = function () {
        this.start();
    };
    MazeUi.prototype.clickBtnMazeBox = function (btn) {
        var mb = btn.getCurrentTarget().getComponent(MazeBox_1.default);
    };
    MazeUi.prototype.clickBtnClose = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        GameManager_1.default.getInstance().music_manager.playMusic(AudioConstants_1.MusicIndex.BGM_Fuben);
        this.node.removeFromParent();
        MazeManager_1.MazeManager.getInstance().resetHeroBind();
        if (GameManager_1.default.getInstance().cur_game_scene == Constants_1.GameScene.game) {
            GameManager_1.default.getInstance().game_to_home = Constants_1.Go_Type.Activity;
            GameManager_1.default.getInstance().backToHome();
        }
    };
    MazeUi.prototype.clickBtnBag = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        UIManager_1.UIManager.getInstance().showMazeBagUi();
    };
    MazeUi.prototype.clickBtnRepair = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        UIManager_1.UIManager.getInstance().showMazeToolUi({
            onClose: function () {
            }
        });
    };
    MazeUi.prototype.clickBtnWallInfo = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        UIManager_1.UIManager.getInstance().showMazeWallInfoUi({
            onRefresh: function () {
            }
        });
    };
    var MazeUi_1;
    MazeUi._instance = null;
    __decorate([
        property({ type: cc.Prefab, tooltip: "格子预制体" })
    ], MazeUi.prototype, "prefab_box", void 0);
    __decorate([
        property({ type: cc.Prefab, tooltip: "箭头预制体" })
    ], MazeUi.prototype, "prefab_arrow", void 0);
    __decorate([
        property({ type: cc.Prefab, tooltip: "门预制体" })
    ], MazeUi.prototype, "prefab_door", void 0);
    __decorate([
        property(cc.SpriteAtlas)
    ], MazeUi.prototype, "maze_sp", void 0);
    MazeUi = MazeUi_1 = __decorate([
        ccclass
    ], MazeUi);
    return MazeUi;
}(cc.Component));
exports.default = MazeUi;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTWF6ZVxcTWF6ZVVpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHFDQUFnQztBQUNoQyw0Q0FBa0Q7QUFDbEQsdUVBQXVFO0FBQ3ZFLHlFQUErRTtBQUMvRSw2Q0FBNEM7QUFDNUMsOENBQXlDO0FBQ3pDLDBEQUFpRTtBQUNqRSw2Q0FBNEM7QUFDNUMsZ0RBQTJDO0FBQzNDLG9FQUErRDtBQUMvRCwwQ0FBa0Q7QUFHNUMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBb0MsMEJBQVk7SUFBaEQ7UUFBQSxxRUFnUkM7UUE1UUcsZ0JBQVUsR0FBVyxJQUFJLENBQUM7UUFHMUIsa0JBQVksR0FBVyxJQUFJLENBQUM7UUFHNUIsaUJBQVcsR0FBVyxJQUFJLENBQUM7UUFHM0IsYUFBTyxHQUFnQixJQUFJLENBQUM7UUFFNUIsZUFBUyxHQUF1QixJQUFJLENBQUM7UUFDckMsWUFBWTtRQUNaLG1CQUFhLEdBQVEsQ0FBQyxDQUFDO1FBQ3ZCLGFBQWE7UUFDYixvQkFBYyxHQUFRLENBQUMsQ0FBQzs7SUE2UDVCLENBQUM7ZUFoUm9CLE1BQU07SUFxQlQsa0JBQVcsR0FBekI7UUFFSSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUVELHVCQUFNLEdBQU47UUFDSSxRQUFNLENBQUMsU0FBUyxHQUFDLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbEIseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUN0Qyx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQ2hELENBQUM7SUFFUywwQkFBUyxHQUFuQjtRQUNJLFFBQU0sQ0FBQyxTQUFTLEdBQUMsSUFBSSxDQUFDO0lB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UyxHQWdSL0M7a0JBaFJvQixNQUFNIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE1hemVCb3ggZnJvbSBcIi4vTWF6ZUJveFwiO1xyXG5pbXBvcnQgeyBNYXplUm9hZE1hbmFnZXIgfSBmcm9tIFwiLi9EYXRhL01hemVSb2FkXCI7XHJcbi8vIGltcG9ydCB7IFJvZ3VlSGV4YWdvblR5cGVzTWFuYWdlciB9IGZyb20gXCIuL0RhdGEvUm9ndWVIZXhhZ29uVHlwZXNcIjtcclxuaW1wb3J0IHsgUm9ndWVIZXhhZ29uVHlwZXNNYW5hZ2VyIH0gZnJvbSBcIi4uL2NvcHkvdm9pZGNyYWNrL1JvZ3VlSGV4YWdvblR5cGVzXCI7XHJcbmltcG9ydCB7IE1hemVNYW5hZ2VyIH0gZnJvbSBcIi4vTWF6ZU1hbmFnZXJcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBNdXNpY0luZGV4LCBTb3VuZEluZGV4IH0gZnJvbSBcIi4uL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IFVJTWFuYWdlciB9IGZyb20gXCIuLi9VSS9VSU1hbmFnZXJcIjtcclxuaW1wb3J0IEZpeGVkUG9zIGZyb20gXCIuLi9VSS9ob21lL0ZpeGVkUG9zXCI7XHJcbmltcG9ydCBMYW5ndWFnZU1hbmFnZXIgZnJvbSBcIi4uL211bHRpTGFuZ3VhZ2UvTGFuZ3VhZ2VNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEdhbWVTY2VuZSwgR29fVHlwZSB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcclxuXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hemVVaSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBNYXplVWkgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLlByZWZhYix0b29sdGlwOlwi5qC85a2Q6aKE5Yi25L2TXCJ9KVxyXG4gICAgcHJlZmFiX2JveDpjYy5QcmVmYWI9bnVsbDtcclxuICAgIFxyXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLlByZWZhYix0b29sdGlwOlwi566t5aS06aKE5Yi25L2TXCJ9KVxyXG4gICAgcHJlZmFiX2Fycm93OmNjLlByZWZhYj1udWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5QcmVmYWIsdG9vbHRpcDpcIumXqOmihOWItuS9k1wifSlcclxuICAgIHByZWZhYl9kb29yOmNjLlByZWZhYj1udWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGVBdGxhcylcclxuICAgIG1hemVfc3A6Y2MuU3ByaXRlQXRsYXM9bnVsbDtcclxuXHJcbiAgICBib2FyZF9ib3g6QXJyYXk8QXJyYXk8Y2MuTm9kZT4+PW51bGw7XHJcbiAgICAvKirlvZPliY3lhbPnmoTlsYLmlbAgKi9cclxuICAgIGN1cl9mbG9vcl9udW06bnVtYmVyPTE7XHJcbiAgICAvKirlvZPliY3ov7flrqvnmoTlsYLmlbAgKi9cclxuICAgIGN1cl9sYXlvdXRfbnVtOm51bWJlcj0xO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTpNYXplVWlcclxuICAgIHsgICAgICAgIFxyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIE1hemVVaS5faW5zdGFuY2U9dGhpczsgICAgICAgXHJcbiAgICAgICAgdGhpcy5hZGFwdGF0aW9uKCk7ICAgICAgICBcclxuICAgICAgICBNYXplTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoZWNrRGF0ZSgpO1xyXG4gICAgICAgIE1hemVNYW5hZ2VyLmdldEluc3RhbmNlKCkucmVjb3Zlckhlcm9CaW5kKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICBNYXplVWkuX2luc3RhbmNlPW51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgYWRhcHRhdGlvbigpe1xyXG4gICAgICAgIC8v5LiK5LiL5qih5Z2XXHJcbiAgICAgICAgbGV0IGJvdHRvbT10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2JvdHRvbScpO1xyXG4gICAgICAgIGxldCB0b3A9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCd0b3AnKTtcclxuICAgICAgICBsZXQgd3A9Y2Mud2luU2l6ZTtcclxuICAgICAgICBib3R0b20ueT0td3AuaGVpZ2h0LzI7XHJcbiAgICAgICAgdG9wLnk9d3AuaGVpZ2h0LzI7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdzY3JvbGxWaWV3JykueT1ib3R0b20ueStib3R0b20uaGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0ICgpIHtcclxuICAgICAgICB0aGlzLmN1cl9sYXlvdXRfbnVtPU1hemVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Rmxvb3IoKTtcclxuICAgICAgICB0aGlzLmJvYXJkX2JveD1uZXcgQXJyYXk8QXJyYXk8Y2MuTm9kZT4+KCk7XHJcbiAgICAgICAgbGV0IGJveElkTGlzdD1NYXplTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEdyb3VuZEJveElkTGlzdCgpO1xyXG4gICAgICAgIGlmKGJveElkTGlzdC5sZW5ndGg9PTApe1xyXG4gICAgICAgICAgICB0aGlzLmluaXRCb2FyZCgpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUJvYXJkKGJveElkTGlzdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBmbG9vclN0cj1MYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCgxMDAwMjApLnJlcGxhY2UoJ34nLE1hemVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Rmxvb3IoKSsnJyk7XHJcbiAgICAgICAgbGV0IHN0cj1MYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCg4MzAwMDEpK1wiOiBcIitmbG9vclN0cjtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3RvcCcpLmdldENoaWxkQnlOYW1lKCd0aXRsZScpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPXN0cjtcclxuICAgICAgICAvL0dhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkubXVzaWNfbWFuYWdlci5wbGF5TXVzaWMoTXVzaWNJbmRleC5CR01fUm9ndWVCZ20pO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGUoKCk9PntcclxuICAgICAgICAgICAgTWF6ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRSZW1haW5UaW1lKCk7XHJcbiAgICAgICAgfSwxKTtcclxuICAgIH1cclxuICAgIC8qKuWIneWni+WMlui/t+Wuq+aji+eJjCAqL1xyXG4gICAgaW5pdEJvYXJkKCl7XHJcbiAgICAgICAgbGV0IGNvbnRlbnQ9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdzY3JvbGxWaWV3JykuZ2V0Q29tcG9uZW50KGNjLlNjcm9sbFZpZXcpLmNvbnRlbnQ7XHJcbiAgICAgICAgY29udGVudC5yZW1vdmVBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgIC8v5LuO5LiL5b6A5LiKXHJcbiAgICAgICAgbGV0IGJvdHRvbT0wO1xyXG4gICAgICAgIGxldCBpbnRlcnZhbFg9MTgwO1xyXG4gICAgICAgIGxldCBpbnRlcnZhbFk9MTQwO1xyXG4gICAgICAgIC8v5aWH5pWw6KGM5pyA5bem55qE5L2N572uXHJcbiAgICAgICAgbGV0IG9kZExlZnQ9LTE4MDtcclxuICAgICAgICAvL+WBtuaVsOihjOacgOW3pueahOS9jee9rlxyXG4gICAgICAgIGxldCBldmVuTGVmdD1vZGRMZWZ0K2ludGVydmFsWC8yO1xyXG4gICAgICAgIGxldCBtYXhDQz0zO1xyXG4gICAgICAgIGxldCBtYXhSUj05O1xyXG4gICAgICAgIGxldCBib2FyZHM9TWF6ZVJvYWRNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWF6ZVJvYWQoKTtcclxuICAgICAgICBsZXQgbGFzdFlZPTA7XHJcbiAgICAgICAgbGV0IGJveElkTGlzdD1uZXcgQXJyYXkoKTtcclxuICAgICAgICBmb3IobGV0IHI9MTsgcjw9bWF4UlI7IHIrKyl7XHJcbiAgICAgICAgICAgIGxldCBub2Rlcz1uZXcgQXJyYXkoKTtcclxuICAgICAgICAgICAgbGV0IGlzRXZlbj1yJTI9PTA7XHJcbiAgICAgICAgICAgIGxldCBjY0Fycj1bXTtcclxuICAgICAgICAgICAgbGV0IHJJZExpc3Q9bmV3IEFycmF5KCk7XHJcbiAgICAgICAgICAgIGZvcihsZXQgYz0xOyBjPD1tYXhDQzsgYysrKXtcclxuICAgICAgICAgICAgICAgIGlmKGlzRXZlbiYmYz09bWF4Q0MpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgckluZGV4PXItMTtcclxuICAgICAgICAgICAgICAgIGxldCBjSW5kZXg9Yy0xO1xyXG4gICAgICAgICAgICAgICAgaWYoYm9hcmRzW3JJbmRleF1bY0luZGV4XT4wKXsgXHJcbiAgICAgICAgICAgICAgICAgICAgY2NBcnIucHVzaChjKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvcihsZXQgYz0xOyBjPD1tYXhDQzsgYysrKXsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZihpc0V2ZW4mJmM9PW1heENDKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IHJJbmRleD1yLTE7XHJcbiAgICAgICAgICAgICAgICBsZXQgY0luZGV4PWMtMTtcclxuICAgICAgICAgICAgICAgIGlmKGJvYXJkc1tySW5kZXhdW2NJbmRleF0+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0YXJ0WD1pc0V2ZW4/ZXZlbkxlZnQ6b2RkTGVmdDtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgeHg9c3RhcnRYK2NJbmRleCppbnRlcnZhbFg7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHl5PWJvdHRvbStpbnRlcnZhbFkqcjtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY2NJbmRleD1NYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqY2NBcnIubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaWQ9Um9ndWVIZXhhZ29uVHlwZXNNYW5hZ2VyLmdldElkKHRoaXMuY3VyX2xheW91dF9udW0scixjY0FycltjY0luZGV4XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJveD1jYy5pbnN0YW50aWF0ZSh0aGlzLnByZWZhYl9ib3gpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuYWRkQ2hpbGQoYm94KTtcclxuICAgICAgICAgICAgICAgICAgICBib3guekluZGV4PTEwMC1yO1xyXG4gICAgICAgICAgICAgICAgICAgIGJveC54PXh4O1xyXG4gICAgICAgICAgICAgICAgICAgIGJveC55PXl5O1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGVzLnB1c2goYm94KTtcclxuICAgICAgICAgICAgICAgICAgICBib3guZ2V0Q29tcG9uZW50KE1hemVCb3gpLmluaXQocixjLGlkKTtcclxuICAgICAgICAgICAgICAgICAgICBib3gubmFtZT0nJytpZDtcclxuICAgICAgICAgICAgICAgICAgICBsYXN0WVk9eXk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2NBcnIuc3BsaWNlKGNjSW5kZXgsMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcklkTGlzdC5wdXNoKGlkKTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHJJZExpc3QucHVzaCgwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmJvYXJkX2JveC5wdXNoKG5vZGVzKTtcclxuICAgICAgICAgICAgYm94SWRMaXN0LnB1c2gocklkTGlzdCk7XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICAgICAgbGV0IGRvb3I9Y2MuaW5zdGFudGlhdGUodGhpcy5wcmVmYWJfZG9vcik7XHJcbiAgICAgICAgZG9vci55PWxhc3RZWStkb29yLmhlaWdodCpkb29yLnNjYWxlO1xyXG4gICAgICAgIGNvbnRlbnQuYWRkQ2hpbGQoZG9vcik7XHJcbiAgICAgICAgY29udGVudC5oZWlnaHQ9bWF4UlIqaW50ZXJ2YWxZKzI2NSoyK2Rvb3IuaGVpZ2h0KmRvb3Iuc2NhbGU7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoRmxvb3IoKTtcclxuICAgICAgICBNYXplTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVHcm91bmRCb3hJZExpc3QoYm94SWRMaXN0KTtcclxuICAgIH1cclxuICAgIC8qKueUn+aIkOi/t+Wuq+aji+ebmCAqL1xyXG4gICAgY3JlYXRlQm9hcmQobGlzdDpudW1iZXJbXVtdKXtcclxuICAgICAgICBsZXQgY29udGVudD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3Njcm9sbFZpZXcnKS5nZXRDb21wb25lbnQoY2MuU2Nyb2xsVmlldykuY29udGVudDtcclxuICAgICAgICBjb250ZW50LnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgLy/ku47kuIvlvoDkuIpcclxuICAgICAgICBsZXQgYm90dG9tPTA7XHJcbiAgICAgICAgbGV0IGludGVydmFsWD0xODA7XHJcbiAgICAgICAgbGV0IGludGVydmFsWT0xNDA7XHJcbiAgICAgICAgLy/lpYfmlbDooYzmnIDlt6bnmoTkvY3nva5cclxuICAgICAgICBsZXQgb2RkTGVmdD0tMTgwO1xyXG4gICAgICAgIC8v5YG25pWw6KGM5pyA5bem55qE5L2N572uXHJcbiAgICAgICAgbGV0IGV2ZW5MZWZ0PW9kZExlZnQraW50ZXJ2YWxYLzI7XHJcbiAgICAgICAgbGV0IG1heENDPTM7XHJcbiAgICAgICAgbGV0IG1heFJSPTk7XHJcbiAgICAgICAgbGV0IGJvYXJkcz1NYXplUm9hZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYXplUm9hZCgpO1xyXG4gICAgICAgIGxldCBsYXN0WVk9MDtcclxuICAgICAgICBmb3IobGV0IHI9MTsgcjw9bWF4UlI7IHIrKyl7XHJcbiAgICAgICAgICAgIGxldCBub2Rlcz1uZXcgQXJyYXkoKTtcclxuICAgICAgICAgICAgbGV0IGlzRXZlbj1yJTI9PTA7XHJcbiAgICAgICAgICAgIGZvcihsZXQgYz0xOyBjPD1tYXhDQzsgYysrKXsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZihpc0V2ZW4mJmM9PW1heENDKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IHJJbmRleD1yLTE7XHJcbiAgICAgICAgICAgICAgICBsZXQgY0luZGV4PWMtMTtcclxuICAgICAgICAgICAgICAgIGlmKGJvYXJkc1tySW5kZXhdW2NJbmRleF0+MCl7ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3RhcnRYPWlzRXZlbj9ldmVuTGVmdDpvZGRMZWZ0O1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB4eD1zdGFydFgrY0luZGV4KmludGVydmFsWDtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgeXk9Ym90dG9tK2ludGVydmFsWSpyO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpZD1saXN0W3JJbmRleF1bY0luZGV4XTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYm94PWNjLmluc3RhbnRpYXRlKHRoaXMucHJlZmFiX2JveCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudC5hZGRDaGlsZChib3gpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJveC56SW5kZXg9MTAwLXI7XHJcbiAgICAgICAgICAgICAgICAgICAgYm94Lng9eHg7XHJcbiAgICAgICAgICAgICAgICAgICAgYm94Lnk9eXk7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZXMucHVzaChib3gpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJveC5nZXRDb21wb25lbnQoTWF6ZUJveCkuaW5pdChyLGMsaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJveC5uYW1lPScnK2lkO1xyXG4gICAgICAgICAgICAgICAgICAgIGxhc3RZWT15eTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmJvYXJkX2JveC5wdXNoKG5vZGVzKTtcclxuICAgICAgICB9ICAgICAgICBcclxuICAgICAgICBsZXQgZG9vcj1jYy5pbnN0YW50aWF0ZSh0aGlzLnByZWZhYl9kb29yKTtcclxuICAgICAgICBkb29yLnk9bGFzdFlZK2Rvb3IuaGVpZ2h0KmRvb3Iuc2NhbGU7XHJcbiAgICAgICAgY29udGVudC5hZGRDaGlsZChkb29yKTtcclxuICAgICAgICBjb250ZW50LmhlaWdodD1tYXhSUippbnRlcnZhbFkrMjY1KjIrZG9vci5oZWlnaHQqZG9vci5zY2FsZTtcclxuICAgICAgICB0aGlzLnJlZnJlc2hGbG9vcigpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICByZWZyZXNoRmxvb3IoKXtcclxuICAgICAgICB0aGlzLnJlbW92ZUFsbEFycm93KCk7XHJcbiAgICAgICAgbGV0IGJveFJvb3Q9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdzY3JvbGxWaWV3JykuZ2V0Q29tcG9uZW50KGNjLlNjcm9sbFZpZXcpLmNvbnRlbnQ7XHJcbiAgICAgICAgbGV0IGxlbj1ib3hSb290LmNoaWxkcmVuQ291bnQ7XHJcbiAgICAgICAgbGV0IHBhc3NlZElkcz1NYXplTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1hemVQYXNzZWRJZHMoKTtcclxuICAgICAgICBsZXQgbGFzdFBhc3NlZElkPXBhc3NlZElkc1twYXNzZWRJZHMubGVuZ3RoLTFdO1xyXG4gICAgICAgIHRoaXMuY3VyX2Zsb29yX251bT1Sb2d1ZUhleGFnb25UeXBlc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRSb3dzKGxhc3RQYXNzZWRJZCk7XHJcbiAgICAgICAgZm9yKGxldCByPTA7IHI8bGVuOyByKyspe1xyXG4gICAgICAgICAgICBsZXQgbWF6ZUJveD1ib3hSb290LmNoaWxkcmVuW3JdLmdldENvbXBvbmVudChNYXplQm94KTtcclxuICAgICAgICAgICAgaWYobWF6ZUJveCYmbWF6ZUJveC5ub2RlLmFjdGl2ZSl7XHJcbiAgICAgICAgICAgICAgICBtYXplQm94LnJlZnJlc2hCb3goKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBib3hSb290LmdldENoaWxkQnlOYW1lKCdkb29yJykuYWN0aXZlPXRoaXMuY3VyX2Zsb29yX251bT49OSYmdGhpcy5jdXJfbGF5b3V0X251bTw9MTtcclxuICAgICAgICB0aGlzLnNob3dXYWxsSW5mbygpOyBcclxuICAgIH1cclxuXHJcbiAgICBzaG93V2FsbEluZm8oKXtcclxuICAgICAgICBsZXQgYnRuV2FsbEluZm89dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCd0b3AnKS5nZXRDaGlsZEJ5TmFtZSgnYnRuV2FsbEluZm8nKTtcclxuICAgICAgICBsZXQgcHJvZ3Jlc3NCYXI9YnRuV2FsbEluZm8uZ2V0Q2hpbGRCeU5hbWUoJ3Byb2dyZXNzQmFyJyk7XHJcbiAgICAgICAgbGV0IHBlcj1NYXplTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1hemVIcCgpL01hemVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWF6ZU1heEhwKCk7XHJcbiAgICAgICAgcHJvZ3Jlc3NCYXIuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKS5wcm9ncmVzcz1wZXI7XHJcbiAgICAgICAgbGV0IG51bT1idG5XYWxsSW5mby5nZXRDaGlsZEJ5TmFtZSgnbnVtJyk7XHJcbiAgICAgICAgbnVtLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPShwZXIqMTAwKS50b0ZpeGVkKDEpKyclJzsgICAgICAgICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBzaG93QXJyb3cobm9kZTpjYy5Ob2RlKXtcclxuICAgICAgICBsZXQgY29udGVudD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3Njcm9sbFZpZXcnKS5nZXRDb21wb25lbnQoY2MuU2Nyb2xsVmlldykuY29udGVudDtcclxuICAgICAgICBsZXQgYXJyb3c9Y2MuaW5zdGFudGlhdGUodGhpcy5wcmVmYWJfYXJyb3cpO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnc2Nyb2xsVmlldycpLmdldENoaWxkQnlOYW1lKCdhcnJvd1Jvb3QnKS5hZGRDaGlsZChhcnJvdyk7XHJcbiAgICAgICAgYXJyb3cuc2V0UG9zaXRpb24oY2MudjIobm9kZS54LG5vZGUueSstY29udGVudC5wYXJlbnQuaGVpZ2h0LzIrMzAwKSk7XHJcbiAgICAgICAgYXJyb3cuZ2V0Q29tcG9uZW50KEZpeGVkUG9zKS5pbml0KG5vZGUsY2MudjIoMCwtY29udGVudC5wYXJlbnQuaGVpZ2h0LzIrMzAwKSxjb250ZW50KVxyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZUFsbEFycm93KCl7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdzY3JvbGxWaWV3JykuZ2V0Q2hpbGRCeU5hbWUoJ2Fycm93Um9vdCcpLnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U3BCeU5hbWUobmFtZTpzdHJpbmcpOmNjLlNwcml0ZUZyYW1le1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1hemVfc3AuZ2V0U3ByaXRlRnJhbWUobmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAganVtcFRvTmV4dEZsb29yKCl7XHJcbiAgICAgICAgdGhpcy5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuTWF6ZUJveChidG46Y2MuRXZlbnQuRXZlbnRUb3VjaCl7XHJcbiAgICAgICAgbGV0IG1iPWJ0bi5nZXRDdXJyZW50VGFyZ2V0KCkuZ2V0Q29tcG9uZW50KE1hemVCb3gpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuQ2xvc2UoKXtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkubXVzaWNfbWFuYWdlci5wbGF5TXVzaWMoTXVzaWNJbmRleC5CR01fRnViZW4pO1xyXG4gICAgICAgIHRoaXMubm9kZS5yZW1vdmVGcm9tUGFyZW50KCk7XHJcbiAgICAgICAgTWF6ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZXNldEhlcm9CaW5kKCk7XHJcbiAgICAgICAgaWYoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zY2VuZT09R2FtZVNjZW5lLmdhbWUpe1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdhbWVfdG9faG9tZT1Hb19UeXBlLkFjdGl2aXR5O1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmJhY2tUb0hvbWUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5CYWcoKXtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNYXplQmFnVWkoKTtcclxuICAgIH1cclxuXHJcbiAgICBjbGlja0J0blJlcGFpcigpe1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01hemVUb29sVWkoe1xyXG4gICAgICAgICAgICBvbkNsb3NlOigpPT57XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5XYWxsSW5mbygpe1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01hemVXYWxsSW5mb1VpKHtcclxuICAgICAgICAgICAgb25SZWZyZXNoOigpPT57XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIl19