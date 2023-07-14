
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Task/TaskItemUi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVGFza1xcVGFza0l0ZW1VaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4REFBeUQ7QUFDekQscUNBQWdDO0FBQ2hDLGlEQUF3RDtBQUN4RCxtREFBa0Q7QUFDbEQsMERBQXNEO0FBQ3RELDREQUE4RDtBQUM5RCw0REFBd0Y7QUFDeEYsMERBQXFGO0FBRS9FLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXdDLDhCQUFZO0lBQXBEO1FBQUEscUVBZ0lDO1FBOUhHLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFDMUIsYUFBTyxHQUE4QyxJQUFJLENBQUM7O0lBNkg5RCxDQUFDO0lBM0hHLGtDQUFhLEdBQWIsVUFBYyxPQUFrRCxFQUFDLFFBQWlCLEVBQUMsYUFBNkI7UUFBN0IsOEJBQUEsRUFBQSxxQkFBNkI7UUFDNUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7UUFDMUIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7UUFDbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNoRCxJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxzQkFBWSxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNsRyxJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxzQkFBWSxDQUFDLENBQUMsZUFBZSxDQUFDLEdBQUcs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Q0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsY0FBYyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO1lBQzNHLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGNBQWMsR0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDO1NBQ3BHO1FBQ0QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ2hELElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUNuRCxDQUFDO0lBRUQsK0JBQVUsR0FBVjtRQUNJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBOUhnQixVQUFVO1FBRDlCLE9BQU87T0FDYSxVQUFVLENBZ0k5QjtJQUFELGlCQUFDO0NBaElELEFBZ0lDLENBaEl1QyxFQUFFLENBQUMsU0FBUyxHQWdJbkQ7a0JBaElvQixVQUFVIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFRleHRMYW5ndWFnZSBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9UZXh0TGFuZ3VhZ2VcIjtcclxuaW1wb3J0IFByb3AgZnJvbSBcIi4uL1Byb3AvUHJvcFwiO1xyXG5pbXBvcnQgeyBQcm9wQWN0aW9uLCBQcm9wSWQgfSBmcm9tIFwiLi4vUHJvcC9Qcm9wQ29uZmlnXCI7XHJcbmltcG9ydCB7IFByb3BNYW5hZ2VyIH0gZnJvbSBcIi4uL1Byb3AvUHJvcE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU3RvcmFnZUtleSB9IGZyb20gXCIuLi9TdG9yYWdlL1N0b3JhZ2VDb25maWdcIjtcclxuaW1wb3J0IHsgVGhlU3RvcmFnZU1hbmFnZXIgfSBmcm9tIFwiLi4vU3RvcmFnZS9TdG9yYWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBBY2hpZXZlbm1lbnRUYXNrTWFuYWdlciwgSnNvbkFjaGlldmVubWVudFRhc2sgfSBmcm9tIFwiLi9EYXRhL0FjaGlldmVubWVudFRhc2tcIjtcclxuaW1wb3J0IHsgSnNvblRhc2tJbmZvcm1hdGlvbiwgVGFza0luZm9ybWF0aW9uTWFuYWdlciB9IGZyb20gXCIuL0RhdGEvVGFza0luZm9ybWF0aW9uXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhc2tJdGVtVWkgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIGNhbGxfYmFjazpGdW5jdGlvbiA9IG51bGw7XHJcbiAgICBtZXNzYWdlOkpzb25UYXNrSW5mb3JtYXRpb24gfCBKc29uQWNoaWV2ZW5tZW50VGFzayA9IG51bGw7XHJcblxyXG4gICAgaW5pdEdvaW5nSXRlbShtZXNzYWdlOkpzb25UYXNrSW5mb3JtYXRpb24gfCBKc29uQWNoaWV2ZW5tZW50VGFzayxjYWxsQmFjazpGdW5jdGlvbixpc0FjaGlldmVtZW50OmJvb2xlYW4gPSBmYWxzZSl7XHJcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcclxuICAgICAgICB0aGlzLmNhbGxfYmFjayA9IGNhbGxCYWNrO1xyXG4gICAgICAgIGxldCByb290ID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwicm9vdFwiKTtcclxuICAgICAgICByb290Lm9wYWNpdHkgPSAyNTU7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwib3ZlclwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICByb290LmdldENoaWxkQnlOYW1lKFwiY29udGVudExhYmVsXCIpLmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnNldFRleHRJZChtZXNzYWdlLlRhc2tEZXNjcmlwdGlvbik7XHJcbiAgICAgICAgcm9vdC5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnRMYWJlbFwiKS5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zZXRSZXBsYWNlVmFsdWUoJ34nLG1lc3NhZ2UuVGFza1BhcmFtZXRlcnMrJycpO1xyXG4gICAgICAgIGxldCByZXdhcmQ6Y2MuTm9kZSA9IHJvb3QuZ2V0Q2hpbGRCeU5hbWUoXCJpdGVtUm9vdFwiKS5nZXRDaGlsZEJ5TmFtZShcInJld2FyZFwiKSB8fCBudWxsO1xyXG4gICAgICAgIGlmKHJld2FyZCA9PSBudWxsKXtcclxuICAgICAgICAgICAgcmV3YXJkID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShtZXNzYWdlLlJld2FyZFByb3BJRCxtZXNzYWdlLlJld2FyZFByb3BOdW0pO1xyXG4gICAgICAgICAgICByZXdhcmQubmFtZSA9IFwicmV3YXJkXCI7XHJcbiAgICAgICAgICAgIHJld2FyZC5zY2FsZSA9IDAuOTtcclxuICAgICAgICAgICAgcm9vdC5nZXRDaGlsZEJ5TmFtZShcIml0ZW1Sb290XCIpLmFkZENoaWxkKHJld2FyZCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHJld2FyZC5nZXRDb21wb25lbnQoUHJvcCkuaW5pdChtZXNzYWdlLlJld2FyZFByb3BJRCxtZXNzYWdlLlJld2FyZFByb3BOdW0sUHJvcEFjdGlvbi5Mb29rKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoaXNBY2hpZXZlbWVudCl7XHJcbiAgICAgICAgICAgIHJvb3QuZ2V0Q2hpbGRCeU5hbWUoXCJwcm9ncmVzczFcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGxldCBwcm9ncmVzcyA9IHJvb3QuZ2V0Q2hpbGRCeU5hbWUoXCJwcm9ncmVzczJcIik7XHJcbiAgICAgICAgICAgIHByb2dyZXNzLmFjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICBsZXQgaW5mbyA9IEFjaGlldmVubWVudFRhc2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvbkFjaGlldmVubWVudFRhc2sobWVzc2FnZS5UYXNrSUQpO1xyXG4gICAgICAgICAgICBsZXQgbm93ID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5UYXNrQWNoaWV2ZW1lbnROdW0gKyBpbmZvLkFjaGlldmVubWVudFRhc2tUeXBlLDApO1xyXG4gICAgICAgICAgICByb290LmdldENoaWxkQnlOYW1lKFwibnVtXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gbm93ICsgXCIvXCIgKyBpbmZvLlRhc2tQYXJhbWV0ZXJzO1xyXG4gICAgICAgICAgICBwcm9ncmVzcy5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5maWxsUmFuZ2UgPSBub3cvaW5mby5UYXNrUGFyYW1ldGVycztcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgbGV0IHByb2dyZXNzID0gcm9vdC5nZXRDaGlsZEJ5TmFtZShcInByb2dyZXNzMVwiKTtcclxuICAgICAgICAgICAgcm9vdC5nZXRDaGlsZEJ5TmFtZShcInByb2dyZXNzMlwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgcHJvZ3Jlc3MuYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIGxldCBpbmZvID0gVGFza0luZm9ybWF0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25UYXNrSW5mb3JtYXRpb24obWVzc2FnZS5UYXNrSUQpO1xyXG4gICAgICAgICAgICBsZXQgbm93ID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5UYXNrTnVtICsgbWVzc2FnZS5UYXNrSUQsMCk7XHJcbiAgICAgICAgICAgIHJvb3QuZ2V0Q2hpbGRCeU5hbWUoXCJudW1cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBub3cgKyBcIi9cIiArIGluZm8uVGFza1BhcmFtZXRlcnM7XHJcbiAgICAgICAgICAgIHByb2dyZXNzLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5TcHJpdGUpLmZpbGxSYW5nZSA9IG5vdy9pbmZvLlRhc2tQYXJhbWV0ZXJzO1xyXG4gICAgICAgIH1cclxuICAgICAgICByb290LmdldENoaWxkQnlOYW1lKFwiZmluaXNoQnRuXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHJvb3QuZ2V0Q2hpbGRCeU5hbWUoXCJnb2luZ0J0blwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRGaW5pc2hJdGVtKG1lc3NhZ2U6SnNvblRhc2tJbmZvcm1hdGlvbiB8IEpzb25BY2hpZXZlbm1lbnRUYXNrLGNhbGxCYWNrOkZ1bmN0aW9uLGlzQWNoaWV2ZW1lbnQ6Ym9vbGVhbiA9IGZhbHNlKXtcclxuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xyXG4gICAgICAgIHRoaXMuY2FsbF9iYWNrID0gY2FsbEJhY2s7XHJcbiAgICAgICAgbGV0IHJvb3QgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJyb290XCIpO1xyXG4gICAgICAgIHJvb3Qub3BhY2l0eSA9IDI1NTtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJvdmVyXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHJvb3QuZ2V0Q2hpbGRCeU5hbWUoXCJjb250ZW50TGFiZWxcIikuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0VGV4dElkKG1lc3NhZ2UuVGFza0Rlc2NyaXB0aW9uKTtcclxuICAgICAgICByb290LmdldENoaWxkQnlOYW1lKFwiY29udGVudExhYmVsXCIpLmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnNldFJlcGxhY2VWYWx1ZSgnficsbWVzc2FnZS5UYXNrUGFyYW1ldGVycysnJyk7XHJcbiAgICAgICAgbGV0IHJld2FyZDpjYy5Ob2RlID0gcm9vdC5nZXRDaGlsZEJ5TmFtZShcIml0ZW1Sb290XCIpLmdldENoaWxkQnlOYW1lKFwicmV3YXJkXCIpIHx8IG51bGw7XHJcbiAgICAgICAgaWYocmV3YXJkID09IG51bGwpe1xyXG4gICAgICAgICAgICByZXdhcmQgPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKG1lc3NhZ2UuUmV3YXJkUHJvcElELG1lc3NhZ2UuUmV3YXJkUHJvcE51bSk7XHJcbiAgICAgICAgICAgIHJld2FyZC5uYW1lID0gXCJyZXdhcmRcIjtcclxuICAgICAgICAgICAgcmV3YXJkLnNjYWxlID0gMC45O1xyXG4gICAgICAgICAgICByb290LmdldENoaWxkQnlOYW1lKFwiaXRlbVJvb3RcIikuYWRkQ2hpbGQocmV3YXJkKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV3YXJkLmdldENvbXBvbmVudChQcm9wKS5pbml0KG1lc3NhZ2UuUmV3YXJkUHJvcElELG1lc3NhZ2UuUmV3YXJkUHJvcE51bSxQcm9wQWN0aW9uLkxvb2spO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihpc0FjaGlldmVtZW50KXtcclxuICAgICAgICAgICAgcm9vdC5nZXRDaGlsZEJ5TmFtZShcInByb2dyZXNzMVwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgbGV0IHByb2dyZXNzID0gcm9vdC5nZXRDaGlsZEJ5TmFtZShcInByb2dyZXNzMlwiKTtcclxuICAgICAgICAgICAgcHJvZ3Jlc3MuYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIGxldCBpbmZvID0gQWNoaWV2ZW5tZW50VGFza01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRKc29uQWNoaWV2ZW5tZW50VGFzayhtZXNzYWdlLlRhc2tJRCk7XHJcbiAgICAgICAgICAgIGxldCBub3cgPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlRhc2tBY2hpZXZlbWVudE51bSArIGluZm8uQWNoaWV2ZW5tZW50VGFza1R5cGUsMCk7XHJcbiAgICAgICAgICAgIHJvb3QuZ2V0Q2hpbGRCeU5hbWUoXCJudW1cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBub3cgKyBcIi9cIiArIGluZm8uVGFza1BhcmFtZXRlcnM7XHJcbiAgICAgICAgICAgIHByb2dyZXNzLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5TcHJpdGUpLmZpbGxSYW5nZSA9IG5vdy9pbmZvLlRhc2tQYXJhbWV0ZXJzO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBsZXQgcHJvZ3Jlc3MgPSByb290LmdldENoaWxkQnlOYW1lKFwicHJvZ3Jlc3MxXCIpO1xyXG4gICAgICAgICAgICByb290LmdldENoaWxkQnlOYW1lKFwicHJvZ3Jlc3MyXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBwcm9ncmVzcy5hY3RpdmUgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgbGV0IGluZm8gPSBUYXNrSW5mb3JtYXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvblRhc2tJbmZvcm1hdGlvbihtZXNzYWdlLlRhc2tJRCk7XHJcbiAgICAgICAgICAgIGxldCBub3cgPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlRhc2tOdW0gKyBtZXNzYWdlLlRhc2tJRCwwKTtcclxuICAgICAgICAgICAgcm9vdC5nZXRDaGlsZEJ5TmFtZShcIm51bVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGluZm8uVGFza1BhcmFtZXRlcnMgKyBcIi9cIiArIGluZm8uVGFza1BhcmFtZXRlcnM7XHJcbiAgICAgICAgICAgIHByb2dyZXNzLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5TcHJpdGUpLmZpbGxSYW5nZSA9IGluZm8uVGFza1BhcmFtZXRlcnMvaW5mby5UYXNrUGFyYW1ldGVycztcclxuICAgICAgICB9XHJcbiAgICAgICAgcm9vdC5nZXRDaGlsZEJ5TmFtZShcImZpbmlzaEJ0blwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHJvb3QuZ2V0Q2hpbGRCeU5hbWUoXCJnb2luZ0J0blwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0UmVjZWl2ZWRJdGVtKG1lc3NhZ2U6SnNvblRhc2tJbmZvcm1hdGlvbiB8IEpzb25BY2hpZXZlbm1lbnRUYXNrLGlzQWNoaWV2ZW1lbnQ6Ym9vbGVhbiA9IGZhbHNlKXtcclxuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xyXG4gICAgICAgIGxldCByb290ID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwicm9vdFwiKTtcclxuICAgICAgICByb290Lm9wYWNpdHkgPSAxODA7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwib3ZlclwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHJvb3QuZ2V0Q2hpbGRCeU5hbWUoXCJjb250ZW50TGFiZWxcIikuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0VGV4dElkKG1lc3NhZ2UuVGFza0Rlc2NyaXB0aW9uKTtcclxuICAgICAgICByb290LmdldENoaWxkQnlOYW1lKFwiY29udGVudExhYmVsXCIpLmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnNldFJlcGxhY2VWYWx1ZSgnficsbWVzc2FnZS5UYXNrUGFyYW1ldGVycysnJyk7XHJcbiAgICAgICAgbGV0IHJld2FyZDpjYy5Ob2RlID0gcm9vdC5nZXRDaGlsZEJ5TmFtZShcIml0ZW1Sb290XCIpLmdldENoaWxkQnlOYW1lKFwicmV3YXJkXCIpIHx8IG51bGw7XHJcbiAgICAgICAgaWYocmV3YXJkID09IG51bGwpe1xyXG4gICAgICAgICAgICByZXdhcmQgPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKG1lc3NhZ2UuUmV3YXJkUHJvcElELG1lc3NhZ2UuUmV3YXJkUHJvcE51bSk7XHJcbiAgICAgICAgICAgIHJld2FyZC5uYW1lID0gXCJyZXdhcmRcIjtcclxuICAgICAgICAgICAgcmV3YXJkLnNjYWxlID0gMC45O1xyXG4gICAgICAgICAgICByb290LmdldENoaWxkQnlOYW1lKFwiaXRlbVJvb3RcIikuYWRkQ2hpbGQocmV3YXJkKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV3YXJkLmdldENvbXBvbmVudChQcm9wKS5pbml0KG1lc3NhZ2UuUmV3YXJkUHJvcElELG1lc3NhZ2UuUmV3YXJkUHJvcE51bSxQcm9wQWN0aW9uLkxvb2spO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihpc0FjaGlldmVtZW50KXtcclxuICAgICAgICAgICAgcm9vdC5nZXRDaGlsZEJ5TmFtZShcInByb2dyZXNzMVwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgbGV0IHByb2dyZXNzID0gcm9vdC5nZXRDaGlsZEJ5TmFtZShcInByb2dyZXNzMlwiKTtcclxuICAgICAgICAgICAgcHJvZ3Jlc3MuYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIGxldCBpbmZvID0gQWNoaWV2ZW5tZW50VGFza01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRKc29uQWNoaWV2ZW5tZW50VGFzayhtZXNzYWdlLlRhc2tJRCk7XHJcbiAgICAgICAgICAgIGxldCBub3cgPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlRhc2tBY2hpZXZlbWVudE51bSArIGluZm8uQWNoaWV2ZW5tZW50VGFza1R5cGUsMCk7XHJcbiAgICAgICAgICAgIHJvb3QuZ2V0Q2hpbGRCeU5hbWUoXCJudW1cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBub3cgKyBcIi9cIiArIGluZm8uVGFza1BhcmFtZXRlcnM7XHJcbiAgICAgICAgICAgIHByb2dyZXNzLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5TcHJpdGUpLmZpbGxSYW5nZSA9IG5vdy9pbmZvLlRhc2tQYXJhbWV0ZXJzO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBsZXQgcHJvZ3Jlc3MgPSByb290LmdldENoaWxkQnlOYW1lKFwicHJvZ3Jlc3MxXCIpO1xyXG4gICAgICAgICAgICByb290LmdldENoaWxkQnlOYW1lKFwicHJvZ3Jlc3MyXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBwcm9ncmVzcy5hY3RpdmUgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgbGV0IGluZm8gPSBUYXNrSW5mb3JtYXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvblRhc2tJbmZvcm1hdGlvbihtZXNzYWdlLlRhc2tJRCk7XHJcbiAgICAgICAgICAgIGxldCBub3cgPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlRhc2tOdW0gKyBtZXNzYWdlLlRhc2tJRCwwKTtcclxuICAgICAgICAgICAgcm9vdC5nZXRDaGlsZEJ5TmFtZShcIm51bVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGluZm8uVGFza1BhcmFtZXRlcnMgKyBcIi9cIiArIGluZm8uVGFza1BhcmFtZXRlcnM7XHJcbiAgICAgICAgICAgIHByb2dyZXNzLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5TcHJpdGUpLmZpbGxSYW5nZSA9IGluZm8uVGFza1BhcmFtZXRlcnMvaW5mby5UYXNrUGFyYW1ldGVycztcclxuICAgICAgICB9XHJcbiAgICAgICAgcm9vdC5nZXRDaGlsZEJ5TmFtZShcImZpbmlzaEJ0blwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICByb290LmdldENoaWxkQnlOYW1lKFwiZ29pbmdCdG5cIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgb25DbGlja0J0bigpe1xyXG4gICAgICAgIHRoaXMuY2FsbF9iYWNrKCk7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==