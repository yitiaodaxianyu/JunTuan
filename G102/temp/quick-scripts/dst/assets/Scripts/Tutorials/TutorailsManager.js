
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Tutorials/TutorailsManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVHV0b3JpYWxzXFxUdXRvcmFpbHNNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNERBQXVEO0FBR3ZELHlDQUFvQztBQUU3QixJQUFBLE9BQU8sR0FBSSxFQUFFLENBQUMsVUFBVSxRQUFqQixDQUFrQjtBQUVoQztJQUFBO1FBR0ksa0RBQWtEO1FBQ2xELHVCQUFrQixHQUFTLEtBQUssQ0FBQztRQUNqQyxpQkFBWSxHQUFXLElBQUksQ0FBQztRQVlyQixjQUFTLEdBQVMsSUFBSSxDQUFDO1FBQ3ZCLGVBQVUsR0FBUSxDQUFDLENBQUMsQ0FBQztRQUM1QixXQUFXO1FBQ0osbUJBQWMsR0FBUyxJQUFJLENBQUM7SUFvRnZDLENBQUM7eUJBeEdvQixnQkFBZ0I7SUFPbkIsNEJBQVcsR0FBekI7UUFFSSxJQUFHLElBQUksQ0FBQyxTQUFTLElBQUUsSUFBSSxFQUN2QjtZQUNJLElBQUksQ0FBQyxTQUFTLEdBQUMsSUFBSSxrQkFBZ0IsRUFBRSxDQUFDO1lBQ3RDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDekI7UUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQU9PLCtCQUFJLEdBQVo7UUFFSSxJQUFJLEdBQUcsR0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUN4RCxJQUFJLEdBQUcsS0FBRyxFQUFFLElBQUksR0FBRyxLQUFHLElBQUksRUFDMUI7WUFDSSxJQUFJLENBQUMsU0FBUyxHQUFDLEtBQUssQ0FBQztTQUV4QjthQUNEO1lBQ0ksSUFBSSxDQUFDLFNBQVMsR0FBQyxJQUFJLENBQUM7U0FDdkI7UUFDRCxJQUFJLEtBQUssR0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUMv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QWdCLENBQUMsRUFBRSxFQUFDLGFBQWEsRUFBQyxNQUFNLEVBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3BFLEtBQUksQ0FBQyxVQUFVLEdBQUMsRUFBRSxDQUFDO1lBQ3ZCLENBQUMsQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDOztJQXBHYywwQkFBUyxHQUFxQixJQUFJLENBQUM7SUFGakMsZ0JBQWdCO1FBRHBDLE9BQU87T0FDYSxnQkFBZ0IsQ0F3R3BDO0lBQUQsdUJBQUM7Q0F4R0QsQUF3R0MsSUFBQTtrQkF4R29CLGdCQUFnQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBXWE1hbmFnZXJFWCBmcm9tIFwiLi4vLi4vc3RhcnRzY2VuZS9XWE1hbmFnZXJFWFwiO1xyXG5pbXBvcnQgeyBUdXRvcmlhbExldmVsTWFuYWdlciB9IGZyb20gXCIuLi9MZXZlbC9UdXRvcmlhbExldmVsXCI7XHJcbmltcG9ydCB7IENvdXJzZVRleHRNYW5hZ2VyIH0gZnJvbSBcIi4vQ291cnNlVGV4dFwiO1xyXG5pbXBvcnQgVHV0b3JpYWxzIGZyb20gXCIuL1R1dG9yaWFsc1wiO1xyXG5cclxuY29uc3Qge2NjY2xhc3N9ID0gY2MuX2RlY29yYXRvcjtcclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVHV0b3JhaWxzTWFuYWdlciB7XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBUdXRvcmFpbHNNYW5hZ2VyID0gbnVsbDtcclxuICAgIC8v6L+e6LSv5byP5pWZ56iL55qE54q25oCBLOWcqOavj+S4quaVmeeoi+W8gOWQr+WQjuiuvue9ruS4unRydWUs5Zyo6K+l5pWZ56iL57O75YiX5pyA5ZCO5LiA5Liq5pWZ56iL5a6M5oiQ5ZCO6K6+572u5Li6ZmFsc2VcclxuICAgIGlzX3R1dG9yYWlsc19zdGF0ZTpib29sZWFuPWZhbHNlO1xyXG4gICAgY3VyX3R1dG9yaWFsOlR1dG9yaWFscz1udWxsO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTpUdXRvcmFpbHNNYW5hZ2VyXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5faW5zdGFuY2U9PW51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZT1uZXcgVHV0b3JhaWxzTWFuYWdlcigpO1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZS5pbml0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaXNfZmluaXNoOmJvb2xlYW49dHJ1ZTtcclxuICAgIHB1YmxpYyBzaG93aW5nX2lkOm51bWJlcj0tMTtcclxuICAgIC8v5piv5ZCm5a6M5oiQ5LqG5oiY5paX5pWZ56iLXHJcbiAgICBwdWJsaWMgaXNfZmluaXNoX2dhbWU6Ym9vbGVhbj10cnVlO1xyXG5cclxuICAgIHByaXZhdGUgaW5pdCgpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IG51bT1jYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3R1dG9yaWFsc19maW5pc2gnKTtcclxuICAgICAgICBpZiggbnVtPT09XCJcIiB8fCBudW09PT1udWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5pc19maW5pc2g9ZmFsc2U7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmlzX2ZpbmlzaD10cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZ2FtZVQ9Y2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0dXRvcmlhbHNfZmluaXNoX2dhbWUnKTtcclxuICAgICAgICBpZiggZ2FtZVQ9PT1cIlwiIHx8IGdhbWVUPT09bnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNfZmluaXNoX2dhbWU9dGhpcy5pc1Nob3dUdXRvcmlhbHMoMjA0KT09ZmFsc2U7ICAgICAgICAgICAgXHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNfZmluaXNoX2dhbWU9dHJ1ZTtcclxuICAgICAgICB9ICAgICAgICBcclxuICAgIH1cclxuICAgIC8qKuaYr+WQpumcgOimgeaYvuekuuaVmeeoi2lkICovXHJcbiAgICBwdWJsaWMgaXNTaG93VHV0b3JpYWxzKGlkOm51bWJlcik6Ym9vbGVhblxyXG4gICAge1xyXG4gICAgICAgIGxldCBudW09Y2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0dXRvcmlhbHNfJytpZCk7XHJcbiAgICAgICAgaWYobnVtPT09Jyd8fG51bT09PW51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgLyoq5L+d5a2Y5pWZ56iLaWTvvIzooajnpLrmraRpZOW3sue7j+WujOaIkCAqL1xyXG4gICAgc2F2ZVR1dG9yaWFscyhpZDpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0dXRvcmlhbHNfJytpZCwxMjMpO1xyXG4gICAgfVxyXG5cclxuICAgIHNhdmVGaW5pc2goKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuaXNfZmluaXNoPXRydWU7XHJcbiAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0dXRvcmlhbHNfZmluaXNoJywxMjMpO1xyXG4gICAgfVxyXG5cclxuICAgIHNhdmVGaW5pc2hGcm9tR2FtZSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5pc19maW5pc2hfZ2FtZT10cnVlO1xyXG4gICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndHV0b3JpYWxzX2ZpbmlzaF9nYW1lJywxMjMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vYmVnaW5DYWxsYmFjay3mlZnnqIvlvIDlp4vnmoTlm57osIPvvIxjbG9zZUNhbGxiYWNrLeaVmeeoi+WFs+mXreeahOWbnuiwg1xyXG4gICAgc2hvd1R1dG9yaWFscyhpZDpudW1iZXIsYmVnaW5DYWxsYmFjazpGdW5jdGlvbixjbG9zZUNhbGxiYWNrOkZ1bmN0aW9uLGlzTGVmdDpib29sZWFuPXRydWUscGFyZW50PzpjYy5Ob2RlLGJvc3NQb3M/OmNjLlZlYzIpXHJcbiAgICB7ICAgICAgICBcclxuICAgICAgICBpZih0aGlzLmlzU2hvd1R1dG9yaWFscyhpZCkgJiYgdGhpcy5zaG93aW5nX2lkIT1pZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNfdHV0b3JhaWxzX3N0YXRlPXRydWU7XHJcbiAgICAgICAgICAgIGlmKGJlZ2luQ2FsbGJhY2spXHJcbiAgICAgICAgICAgIGJlZ2luQ2FsbGJhY2soKTtcclxuICAgICAgICAgICAgV1hNYW5hZ2VyRVguZ2V0SW5zdGFuY2UoKS5yZXNvdXJjZXNCdW5kbGUubG9hZCgndHV0b3JpYWxzL3R1dG9yaWFsc19yb290JyxjYy5QcmVmYWIsKGVycm9yOiBFcnJvciwgYXNzZXRzOmNjLlByZWZhYik9PntcclxuICAgICAgICAgICAgICAgIGlmKGVycm9yKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShhc3NldHMpOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGxldCB1aVJvb3Q9Y2MuZmluZCgnQ2FudmFzL1VpX1Jvb3QnKTtcclxuICAgICAgICAgICAgICAgIGxldCB0dXRvcmlhbHNfcm9vdD11aVJvb3QuZ2V0Q2hpbGRCeU5hbWUoJ3R1dG9yaWFsc19yb290Jyk7XHJcbiAgICAgICAgICAgICAgICBpZih0dXRvcmlhbHNfcm9vdClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0dXRvcmlhbHNfcm9vdC5nZXRDb21wb25lbnQoVHV0b3JpYWxzKS5vblR1dG9yaWFsc0NvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBub2RlLnpJbmRleD02Njg4O1xyXG4gICAgICAgICAgICAgICAgaWYocGFyZW50KXtcclxuICAgICAgICAgICAgICAgICAgICBwYXJlbnQuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB1aVJvb3QuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJfdHV0b3JpYWw9bm9kZS5nZXRDb21wb25lbnQoVHV0b3JpYWxzKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VyX3R1dG9yaWFsLnNob3dSdW9UdXRvcmlhbHMoaWQsY2xvc2VDYWxsYmFjayxpc0xlZnQsYm9zc1Bvcyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dpbmdfaWQ9aWQ7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuIl19