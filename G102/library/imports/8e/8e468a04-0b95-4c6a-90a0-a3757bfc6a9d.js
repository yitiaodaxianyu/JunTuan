"use strict";
cc._RF.push(module, '8e468oEC5VMapCgo3V7/Gqd', 'TaskItemUi');
// Scripts/Task/TaskItemUi.ts

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
var TextLanguage_1 = require("../multiLanguage/TextLanguage");
var Prop_1 = require("../Prop/Prop");
var PropConfig_1 = require("../Prop/PropConfig");
var PropManager_1 = require("../Prop/PropManager");
var StorageConfig_1 = require("../Storage/StorageConfig");
var StorageManager_1 = require("../Storage/StorageManager");
var AchievenmentTask_1 = require("./Data/AchievenmentTask");
var TaskInformation_1 = require("./Data/TaskInformation");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TaskItemUi = /** @class */ (function (_super) {
    __extends(TaskItemUi, _super);
    function TaskItemUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.call_back = null;
        _this.message = null;
        return _this;
    }
    TaskItemUi.prototype.initGoingItem = function (message, callBack, isAchievement) {
        if (isAchievement === void 0) { isAchievement = false; }
        this.message = message;
        this.call_back = callBack;
        var root = this.node.getChildByName("root");
        root.opacity = 255;
        this.node.getChildByName("over").active = false;
        root.getChildByName("contentLabel").getComponent(TextLanguage_1.default).setTextId(message.TaskDescription);
        root.getChildByName("contentLabel").getComponent(TextLanguage_1.default).setReplaceValue('~', message.TaskParameters + '');
        var reward = root.getChildByName("itemRoot").getChildByName("reward") || null;
        if (reward == null) {
            reward = PropManager_1.PropManager.getInstance().createPropItem(message.RewardPropID, message.RewardPropNum);
            reward.name = "reward";
            reward.scale = 0.9;
            root.getChildByName("itemRoot").addChild(reward);
        }
        else {
            reward.getComponent(Prop_1.default).init(message.RewardPropID, message.RewardPropNum, PropConfig_1.PropAction.Look);
        }
        if (isAchievement) {
            root.getChildByName("progress1").active = false;
            var progress = root.getChildByName("progress2");
            progress.active = true;
            var info = AchievenmentTask_1.AchievenmentTaskManager.getInstance().getJsonAchievenmentTask(message.TaskID);
            var now = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TaskAchievementNum + info.AchievenmentTaskType, 0);
            root.getChildByName("num").getComponent(cc.Label).string = now + "/" + info.TaskParameters;
            progress.children[0].getComponent(cc.Sprite).fillRange = now / info.TaskParameters;
        }
        else {
            var progress = root.getChildByName("progress1");
            root.getChildByName("progress2").active = false;
            progress.active = true;
            var info = TaskInformation_1.TaskInformationManager.getInstance().getJsonTaskInformation(message.TaskID);
            var now = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TaskNum + message.TaskID, 0);
            root.getChildByName("num").getComponent(cc.Label).string = now + "/" + info.TaskParameters;
            progress.children[0].getComponent(cc.Sprite).fillRange = now / info.TaskParameters;
        }
        root.getChildByName("finishBtn").active = false;
        root.getChildByName("goingBtn").active = true;
    };
    TaskItemUi.prototype.initFinishItem = function (message, callBack, isAchievement) {
        if (isAchievement === void 0) { isAchievement = false; }
        this.message = message;
        this.call_back = callBack;
        var root = this.node.getChildByName("root");
        root.opacity = 255;
        this.node.getChildByName("over").active = false;
        root.getChildByName("contentLabel").getComponent(TextLanguage_1.default).setTextId(message.TaskDescription);
        root.getChildByName("contentLabel").getComponent(TextLanguage_1.default).setReplaceValue('~', message.TaskParameters + '');
        var reward = root.getChildByName("itemRoot").getChildByName("reward") || null;
        if (reward == null) {
            reward = PropManager_1.PropManager.getInstance().createPropItem(message.RewardPropID, message.RewardPropNum);
            reward.name = "reward";
            reward.scale = 0.9;
            root.getChildByName("itemRoot").addChild(reward);
        }
        else {
            reward.getComponent(Prop_1.default).init(message.RewardPropID, message.RewardPropNum, PropConfig_1.PropAction.Look);
        }
        if (isAchievement) {
            root.getChildByName("progress1").active = false;
            var progress = root.getChildByName("progress2");
            progress.active = true;
            var info = AchievenmentTask_1.AchievenmentTaskManager.getInstance().getJsonAchievenmentTask(message.TaskID);
            var now = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TaskAchievementNum + info.AchievenmentTaskType, 0);
            root.getChildByName("num").getComponent(cc.Label).string = now + "/" + info.TaskParameters;
            progress.children[0].getComponent(cc.Sprite).fillRange = now / info.TaskParameters;
        }
        else {
            var progress = root.getChildByName("progress1");
            root.getChildByName("progress2").active = false;
            progress.active = true;
            var info = TaskInformation_1.TaskInformationManager.getInstance().getJsonTaskInformation(message.TaskID);
            var now = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TaskNum + message.TaskID, 0);
            root.getChildByName("num").getComponent(cc.Label).string = info.TaskParameters + "/" + info.TaskParameters;
            progress.children[0].getComponent(cc.Sprite).fillRange = info.TaskParameters / info.TaskParameters;
        }
        root.getChildByName("finishBtn").active = true;
        root.getChildByName("goingBtn").active = false;
    };
    TaskItemUi.prototype.initReceivedItem = function (message, isAchievement) {
        if (isAchievement === void 0) { isAchievement = false; }
        this.message = message;
        var root = this.node.getChildByName("root");
        root.opacity = 180;
        this.node.getChildByName("over").active = true;
        root.getChildByName("contentLabel").getComponent(TextLanguage_1.default).setTextId(message.TaskDescription);
        root.getChildByName("contentLabel").getComponent(TextLanguage_1.default).setReplaceValue('~', message.TaskParameters + '');
        var reward = root.getChildByName("itemRoot").getChildByName("reward") || null;
        if (reward == null) {
            reward = PropManager_1.PropManager.getInstance().createPropItem(message.RewardPropID, message.RewardPropNum);
            reward.name = "reward";
            reward.scale = 0.9;
            root.getChildByName("itemRoot").addChild(reward);
        }
        else {
            reward.getComponent(Prop_1.default).init(message.RewardPropID, message.RewardPropNum, PropConfig_1.PropAction.Look);
        }
        if (isAchievement) {
            root.getChildByName("progress1").active = false;
            var progress = root.getChildByName("progress2");
            progress.active = true;
            var info = AchievenmentTask_1.AchievenmentTaskManager.getInstance().getJsonAchievenmentTask(message.TaskID);
            var now = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TaskAchievementNum + info.AchievenmentTaskType, 0);
            root.getChildByName("num").getComponent(cc.Label).string = now + "/" + info.TaskParameters;
            progress.children[0].getComponent(cc.Sprite).fillRange = now / info.TaskParameters;
        }
        else {
            var progress = root.getChildByName("progress1");
            root.getChildByName("progress2").active = false;
            progress.active = true;
            var info = TaskInformation_1.TaskInformationManager.getInstance().getJsonTaskInformation(message.TaskID);
            var now = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TaskNum + message.TaskID, 0);
            root.getChildByName("num").getComponent(cc.Label).string = info.TaskParameters + "/" + info.TaskParameters;
            progress.children[0].getComponent(cc.Sprite).fillRange = info.TaskParameters / info.TaskParameters;
        }
        root.getChildByName("finishBtn").active = false;
        root.getChildByName("goingBtn").active = false;
    };
    TaskItemUi.prototype.onClickBtn = function () {
        this.call_back();
    };
    TaskItemUi = __decorate([
        ccclass
    ], TaskItemUi);
    return TaskItemUi;
}(cc.Component));
exports.default = TaskItemUi;

cc._RF.pop();