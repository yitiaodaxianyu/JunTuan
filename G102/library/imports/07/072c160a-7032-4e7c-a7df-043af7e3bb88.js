"use strict";
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