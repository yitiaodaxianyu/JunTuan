"use strict";
cc._RF.push(module, '7e142obvVNNfZQCHHHqmP06', 'TutorailsManager');
// Scripts/Tutorials/TutorailsManager.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var WXManagerEX_1 = require("../../startscene/WXManagerEX");
var Tutorials_1 = require("./Tutorials");
var ccclass = cc._decorator.ccclass;
var TutorailsManager = /** @class */ (function () {
    function TutorailsManager() {
        //连贯式教程的状态,在每个教程开启后设置为true,在该教程系列最后一个教程完成后设置为false
        this.is_tutorails_state = false;
        this.cur_tutorial = null;
        this.is_finish = true;
        this.showing_id = -1;
        //是否完成了战斗教程
        this.is_finish_game = true;
    }
    TutorailsManager_1 = TutorailsManager;
    TutorailsManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new TutorailsManager_1();
            this._instance.init();
        }
        return this._instance;
    };
    TutorailsManager.prototype.init = function () {
        var num = cc.sys.localStorage.getItem('tutorials_finish');
        if (num === "" || num === null) {
            this.is_finish = false;
        }
        else {
            this.is_finish = true;
        }
        var gameT = cc.sys.localStorage.getItem('tutorials_finish_game');
        if (gameT === "" || gameT === null) {
            this.is_finish_game = this.isShowTutorials(204) == false;
        }
        else {
            this.is_finish_game = true;
        }
    };
    /**是否需要显示教程id */
    TutorailsManager.prototype.isShowTutorials = function (id) {
        var num = cc.sys.localStorage.getItem('tutorials_' + id);
        if (num === '' || num === null) {
            return true;
        }
        return false;
    };
    /**保存教程id，表示此id已经完成 */
    TutorailsManager.prototype.saveTutorials = function (id) {
        cc.sys.localStorage.setItem('tutorials_' + id, 123);
    };
    TutorailsManager.prototype.saveFinish = function () {
        this.is_finish = true;
        cc.sys.localStorage.setItem('tutorials_finish', 123);
    };
    TutorailsManager.prototype.saveFinishFromGame = function () {
        this.is_finish_game = true;
        cc.sys.localStorage.setItem('tutorials_finish_game', 123);
    };
    //beginCallback-教程开始的回调，closeCallback-教程关闭的回调
    TutorailsManager.prototype.showTutorials = function (id, beginCallback, closeCallback, isLeft, parent, bossPos) {
        var _this = this;
        if (isLeft === void 0) { isLeft = true; }
        if (this.isShowTutorials(id) && this.showing_id != id) {
            this.is_tutorails_state = true;
            if (beginCallback)
                beginCallback();
            WXManagerEX_1.default.getInstance().resourcesBundle.load('tutorials/tutorials_root', cc.Prefab, function (error, assets) {
                if (error) {
                    console.log(error);
                    return;
                }
                var node = cc.instantiate(assets);
                var uiRoot = cc.find('Canvas/Ui_Root');
                var tutorials_root = uiRoot.getChildByName('tutorials_root');
                if (tutorials_root) {
                    tutorials_root.getComponent(Tutorials_1.default).onTutorialsComplete();
                }
                node.zIndex = 6688;
                if (parent) {
                    parent.addChild(node);
                }
                else {
                    uiRoot.addChild(node);
                }
                _this.cur_tutorial = node.getComponent(Tutorials_1.default);
                _this.cur_tutorial.showRuoTutorials(id, closeCallback, isLeft, bossPos);
                _this.showing_id = id;
            });
        }
    };
    var TutorailsManager_1;
    TutorailsManager._instance = null;
    TutorailsManager = TutorailsManager_1 = __decorate([
        ccclass
    ], TutorailsManager);
    return TutorailsManager;
}());
exports.default = TutorailsManager;

cc._RF.pop();