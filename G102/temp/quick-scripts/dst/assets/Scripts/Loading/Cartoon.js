
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Loading/Cartoon.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f63e77jNrpPYLJVosYuHEsB', 'Cartoon');
// Scripts/Loading/Cartoon.ts

"use strict";
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
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
var Constants_1 = require("../Constants");
var GameManager_1 = require("../GameManager");
var MapManager_1 = require("../GuaJi/MapManager");
var LevelManager_1 = require("../Level/LevelManager");
var TutorialLevel_1 = require("../Level/TutorialLevel");
var FollowConstants_1 = require("../multiLanguage/FollowConstants");
var FollowManager_1 = require("../multiLanguage/FollowManager");
var TutorailsManager_1 = require("../Tutorials/TutorailsManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        // @property(cc.Label)
        // label: cc.Label = null;
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // @property
        // text: string = 'hello';
        _this.Comic = [];
        _this.ProgressBar = null;
        _this.time = 0;
        _this.Loading_Comic = null;
        // LIFE-CYCLE CALLBACKS:
        _this.is_click = false;
        return _this;
        // update (dt) {
        // this.time+=dt
        // console.log( this.time);
        // }
    }
    // onLoad () {}
    NewClass.prototype.onEnable = function () {
        // for (let index = 0; index < this.Comic.length; index++) {
        var i = 0;
        this.schedule(function () {
            this.ProgressBar.getComponent(cc.ProgressBar).progress += 0.01;
            this.ProgressBar.getChildByName("loadLabel").getComponent(cc.Label).string = (this.ProgressBar.getComponent(cc.ProgressBar).progress * 100).toFixed(0) + '%';
            i++;
            if (i == 100) {
                var time = 0.7;
                var times = 1;
                this.ProgressBar.parent.active = false;
                this.Loading_Comic.getComponent(sp.Skeleton).setAnimation(0, "animation", false);
                // cc.tween(this.Comic[0])
                // // cc.tween()
                // // .to(1, { scale: 2 }, { easing: 'sineOutIn'})
                // .to(time, { position:new cc.Vec3(0,465,0)},{ easing: 'quintOut'})
                // // 当前面的动作都执行完毕后才会调用这个回调函数
                // .delay(times)
                // .call(() => { 
                //     cc.tween(this.Comic[1])
                //     .to(time, { position:new cc.Vec3(0,164,0)},{ easing: 'quintOut'})
                //     // 当前面的动作都执行完毕后才会调用这个回调函数
                //     .delay(times)
                //     .call(() => { 
                //         cc.tween(this.Comic[2])
                //         .to(time, { position:new cc.Vec3(12,-155,0)},{ easing: 'quintOut'})
                //         // 当前面的动作都执行完毕后才会调用这个回调函数
                //         .delay(times)
                //         .call(() => { 
                //             cc.tween(this.Comic[3])
                //             .to(time, { position:new cc.Vec3(-30,-474,0)},{ easing: 'quintOut'})
                //             // 当前面的动作都执行完毕后才会调用这个回调函数
                //             .call(() => { 
                //                 // console.log("+++++++")
                //             })
                //             .start()
                //         })
                //         .start()
                //     })
                //     .start()
                // })
                // .start()
            }
        }, 0.025, 99);
        // this.scheduleOnce(function() {
        // }, 2);
        // }
    };
    // start () {
    // }
    NewClass.prototype.onFirstLevel = function () {
        if (this.is_click == true)
            return;
        TutorailsManager_1.default.getInstance().saveTutorials(200);
        TutorailsManager_1.default.getInstance().saveTutorials(204);
        this.is_click = true;
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.新手引导 + 200);
        LevelManager_1.LevelManager.getInstance().start_level = MapManager_1.default.Currentlevel = 1;
        GameManager_1.default.getInstance().fighting_info = TutorialLevel_1.TutorialLevelManager.getInstance().getFightingInfo(LevelManager_1.LevelManager.getInstance().start_level);
        GameManager_1.default.getInstance().cur_game_scene = Constants_1.GameScene.game;
        TutorailsManager_1.default.getInstance().is_finish_game = true;
        cc.director.loadScene(Constants_1.GameScene.game);
    };
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "Comic", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "ProgressBar", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "Loading_Comic", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTG9hZGluZ1xcQ2FydG9vbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVsRiwwQ0FBeUM7QUFDekMsOENBQXlDO0FBQ3pDLGtEQUE2QztBQUM3QyxzREFBcUQ7QUFDckQsd0RBQThEO0FBQzlELG9FQUErRDtBQUMvRCxnRUFBMkQ7QUFDM0Qsa0VBQTZEO0FBRXZELElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXNDLDRCQUFZO0lBQWxEO1FBRUksc0JBQXNCO1FBQ3RCLDBCQUEwQjtRQUg5QixxRUFnR0M7UUEzRkcsWUFBWTtRQUNaLDBCQUEwQjtRQUUxQixXQUFLLEdBQWMsRUFBRSxDQUFDO1FBR3RCLGlCQUFXLEdBQVksSUFBSSxDQUFDO1FBRTVCLFVBQUksR0FBRyxDQUFDLENBQUE7UUFHUixtQkFBYSxHQUFZLElBQUksQ0FBQztRQUM5Qix3QkFBd0I7UUFDeEIsY0FBUSxHQUFTLEtBQUssQ0FBQzs7UUF5RXZCLGdCQUFnQjtRQUNoQixnQkFBZ0I7UUFDaEIsMkJBQTJCO1FBRTNCLElBQUk7SUFDUixDQUFDO0lBN0VHLGVBQWU7SUFDTCwyQkFBUSxHQUFsQjtRQUNJLDREQUE0RDtRQUU1RCxJQUFJLENBQUMsR0FBQyxDQUFDLENBQUE7UUFDSCxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQ1YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDLFFBQVEsSUFBRSxJQUFJLENBQUE7WUFDNUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUMsUUFBUSxHQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBQyxHQUFHLENBQUM7WUFDdkosQ0FBQyxFQUFFLENBQUE7WUFDSCxJQUFHLENBQUMsSUFBRSxHQUFHLEVBQUM7Z0JBQ04sSUFBSSxJQUFJLEdBQUMsR0FBRyxDQUFBO2dCQUNaLElBQUksS0FBSyxHQUFDLENBQUMsQ0FBQTtnQkFDWCxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUMsS0FBSyxDQUFBO2dCQUNwQyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBQyxXQUFXLEVBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQy9FLDBCQUEwQjtnQkFDMUIsZ0JBQWdCO2dCQUNoQixrREFBa0Q7Z0JBQ2xELG9FQUFvRTtnQkFDcEUsNEJBQTRCO2dCQUM1QixnQkFBZ0I7Z0JBQ2hCLGlCQUFpQjtnQkFDakIsOEJBQThCO2dCQUM5Qix3RUFBd0U7Z0JBQ3hFLGdDQUFnQztnQkFDaEMsb0JBQW9CO2dCQUNwQixxQkFBcUI7Z0JBQ3JCLGtDQUFrQztnQkFDbEMsOEVBQThFO2dCQUM5RSxvQ0FBb0M7Z0JBQ3BDLHdCQUF3QjtnQkFDeEIseUJBQXlCO2dCQUN6QixzQ0FBc0M7Z0JBQ3RDLG1GQUFtRjtnQkFDbkYsd0NBQXdDO2dCQUN4Qyw2QkFBNkI7Z0JBQzdCLDRDQUE0QztnQkFDNUMsaUJBQWlCO2dCQUNqQix1QkFBdUI7Z0JBQ3ZCLGFBQWE7Z0JBQ2IsbUJBQW1CO2dCQUNuQixTQUFTO2dCQUNULGVBQWU7Z0JBQ2YsS0FBSztnQkFDTCxXQUFXO2FBQ2Q7UUFDTCxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRWQsaUNBQWlDO1FBRWpDLFNBQVM7UUFHYixJQUFJO0lBQ1IsQ0FBQztJQUVELGFBQWE7SUFFYixJQUFJO0lBQ0osK0JBQVksR0FBWjtRQUNJLElBQUcsSUFBSSxDQUFDLFFBQVEsSUFBRSxJQUFJO1lBQ3RCLE9BQU87UUFDUCwwQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEQsMEJBQWdCLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxRQUFRLEdBQUMsSUFBSSxDQUFDO1FBQ25CLHVCQUFhLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDLDZCQUFXLENBQUMsSUFBSSxHQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzlELDJCQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxHQUFDLG9CQUFVLENBQUMsWUFBWSxHQUFDLENBQUMsQ0FBQztRQUNqRSxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsR0FBQyxvQ0FBb0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxlQUFlLENBQUMsMkJBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNuSSxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsR0FBQyxxQkFBUyxDQUFDLElBQUksQ0FBQztRQUN4RCwwQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLEdBQUMsSUFBSSxDQUFDO1FBQ25ELEVBQUUsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLHFCQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQWpGRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzJDQUNJO0lBR3RCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7aURBQ1U7SUFLNUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzttREFDWTtJQWhCYixRQUFRO1FBRDVCLE9BQU87T0FDYSxRQUFRLENBZ0c1QjtJQUFELGVBQUM7Q0FoR0QsQUFnR0MsQ0FoR3FDLEVBQUUsQ0FBQyxTQUFTLEdBZ0dqRDtrQkFoR29CLFFBQVEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcblxyXG5pbXBvcnQgeyBHYW1lU2NlbmUgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IE1hcE1hbmFnZXIgZnJvbSBcIi4uL0d1YUppL01hcE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgTGV2ZWxNYW5hZ2VyIH0gZnJvbSBcIi4uL0xldmVsL0xldmVsTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBUdXRvcmlhbExldmVsTWFuYWdlciB9IGZyb20gXCIuLi9MZXZlbC9UdXRvcmlhbExldmVsXCI7XHJcbmltcG9ydCB7IEZvbGxvd19UeXBlIH0gZnJvbSBcIi4uL211bHRpTGFuZ3VhZ2UvRm9sbG93Q29uc3RhbnRzXCI7XHJcbmltcG9ydCBGb2xsb3dNYW5hZ2VyIGZyb20gXCIuLi9tdWx0aUxhbmd1YWdlL0ZvbGxvd01hbmFnZXJcIjtcclxuaW1wb3J0IFR1dG9yYWlsc01hbmFnZXIgZnJvbSBcIi4uL1R1dG9yaWFscy9UdXRvcmFpbHNNYW5hZ2VyXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5ld0NsYXNzIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICAvLyBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICAvLyBsYWJlbDogY2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIC8vIEBwcm9wZXJ0eVxyXG4gICAgLy8gdGV4dDogc3RyaW5nID0gJ2hlbGxvJztcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgQ29taWM6IGNjLk5vZGVbXSA9IFtdO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgUHJvZ3Jlc3NCYXI6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgXHJcbiAgICB0aW1lID0gMFxyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgTG9hZGluZ19Db21pYzogY2MuTm9kZSA9IG51bGw7XHJcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuICAgIGlzX2NsaWNrOmJvb2xlYW49ZmFsc2U7XHJcbiAgICAvLyBvbkxvYWQgKCkge31cclxuICAgIHByb3RlY3RlZCBvbkVuYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICAvLyBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5Db21pYy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgbGV0IGk9MFxyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Qcm9ncmVzc0Jhci5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpLnByb2dyZXNzKz0wLjAxXHJcbiAgICAgICAgICAgICAgICB0aGlzLlByb2dyZXNzQmFyLmdldENoaWxkQnlOYW1lKFwibG9hZExhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPSh0aGlzLlByb2dyZXNzQmFyLmdldENvbXBvbmVudChjYy5Qcm9ncmVzc0JhcikucHJvZ3Jlc3MqMTAwKS50b0ZpeGVkKDApKyclJztcclxuICAgICAgICAgICAgICAgIGkrK1xyXG4gICAgICAgICAgICAgICAgaWYoaT09MTAwKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdGltZT0wLjdcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdGltZXM9MVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuUHJvZ3Jlc3NCYXIucGFyZW50LmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuTG9hZGluZ19Db21pYy5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLnNldEFuaW1hdGlvbigwLFwiYW5pbWF0aW9uXCIsZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNjLnR3ZWVuKHRoaXMuQ29taWNbMF0pXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gLy8gY2MudHdlZW4oKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIC8vIC50bygxLCB7IHNjYWxlOiAyIH0sIHsgZWFzaW5nOiAnc2luZU91dEluJ30pXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gLnRvKHRpbWUsIHsgcG9zaXRpb246bmV3IGNjLlZlYzMoMCw0NjUsMCl9LHsgZWFzaW5nOiAncXVpbnRPdXQnfSlcclxuICAgICAgICAgICAgICAgICAgICAvLyAvLyDlvZPliY3pnaLnmoTliqjkvZzpg73miafooYzlrozmr5XlkI7miY3kvJrosIPnlKjov5nkuKrlm57osIPlh73mlbBcclxuICAgICAgICAgICAgICAgICAgICAvLyAuZGVsYXkodGltZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gLmNhbGwoKCkgPT4geyBcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgY2MudHdlZW4odGhpcy5Db21pY1sxXSlcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgLnRvKHRpbWUsIHsgcG9zaXRpb246bmV3IGNjLlZlYzMoMCwxNjQsMCl9LHsgZWFzaW5nOiAncXVpbnRPdXQnfSlcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgLy8g5b2T5YmN6Z2i55qE5Yqo5L2c6YO95omn6KGM5a6M5q+V5ZCO5omN5Lya6LCD55So6L+Z5Liq5Zue6LCD5Ye95pWwXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIC5kZWxheSh0aW1lcylcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgLmNhbGwoKCkgPT4geyBcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIGNjLnR3ZWVuKHRoaXMuQ29taWNbMl0pXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAudG8odGltZSwgeyBwb3NpdGlvbjpuZXcgY2MuVmVjMygxMiwtMTU1LDApfSx7IGVhc2luZzogJ3F1aW50T3V0J30pXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAvLyDlvZPliY3pnaLnmoTliqjkvZzpg73miafooYzlrozmr5XlkI7miY3kvJrosIPnlKjov5nkuKrlm57osIPlh73mlbBcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIC5kZWxheSh0aW1lcylcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIC5jYWxsKCgpID0+IHsgXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgY2MudHdlZW4odGhpcy5Db21pY1szXSlcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAudG8odGltZSwgeyBwb3NpdGlvbjpuZXcgY2MuVmVjMygtMzAsLTQ3NCwwKX0seyBlYXNpbmc6ICdxdWludE91dCd9KVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIC8vIOW9k+WJjemdoueahOWKqOS9nOmDveaJp+ihjOWujOavleWQjuaJjeS8muiwg+eUqOi/meS4quWbnuiwg+WHveaVsFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIC5jYWxsKCgpID0+IHsgXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiKysrKysrK1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgLnN0YXJ0KClcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAuc3RhcnQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAuc3RhcnQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gLnN0YXJ0KClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgMC4wMjUsIDk5KTtcclxuXHJcbiAgICAgICAgICAgIC8vIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIH0sIDIpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgLy8gfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIHN0YXJ0ICgpIHtcclxuICAgICAgICBcclxuICAgIC8vIH1cclxuICAgIG9uRmlyc3RMZXZlbCgpey8v54K55Ye75ryr55S755qE57un57ut5oyJ6ZKu77yM55u05o6l6L+b5YWl5LiL5LiA5YWzXFxcclxuICAgICAgICBpZih0aGlzLmlzX2NsaWNrPT10cnVlKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMDApO1xyXG4gICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIwNCk7XHJcbiAgICAgICAgdGhpcy5pc19jbGljaz10cnVlO1xyXG4gICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7mlrDmiYvlvJXlr7wrMjAwKTtcclxuICAgICAgICBMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydF9sZXZlbD1NYXBNYW5hZ2VyLkN1cnJlbnRsZXZlbD0xO1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZmlnaHRpbmdfaW5mbz1UdXRvcmlhbExldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEZpZ2h0aW5nSW5mbyhMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydF9sZXZlbCk7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zY2VuZT1HYW1lU2NlbmUuZ2FtZTtcclxuICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNfZmluaXNoX2dhbWU9dHJ1ZTtcclxuICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoR2FtZVNjZW5lLmdhbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHtcclxuICAgIC8vIHRoaXMudGltZSs9ZHRcclxuICAgIC8vIGNvbnNvbGUubG9nKCB0aGlzLnRpbWUpO1xyXG4gICAgXHJcbiAgICAvLyB9XHJcbn1cclxuIl19