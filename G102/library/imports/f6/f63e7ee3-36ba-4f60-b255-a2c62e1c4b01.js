"use strict";
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