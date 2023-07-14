
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
        this.is_click = true;
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.新手引导 + 200);
        LevelManager_1.LevelManager.getInstance().start_level = MapManager_1.default.Currentlevel = 1;
        GameManager_1.default.getInstance().fighting_info = TutorialLevel_1.TutorialLevelManager.getInstance().getFightingInfo(LevelManager_1.LevelManager.getInstance().start_level);
        GameManager_1.default.getInstance().cur_game_scene = Constants_1.GameScene.game;
        TutorailsManager_1.default.getInstance().is_finish_game = false;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTG9hZGluZ1xcQ2FydG9vbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVsRiwwQ0FBeUM7QUFDekMsOENBQXlDO0FBQ3pDLGtEQUE2QztBQUM3QyxzREFBcUQ7QUFDckQsd0RBQThEO0FBQzlELG9FQUErRDtBQUMvRCxnRUFBMkQ7QUFDM0Qsa0VBQTZEO0FBRXZELElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXNDLDRCQUFZO0lBQWxEO1FBRUksc0JBQXNCO1FBQ3RCLDBCQUEwQjtRQUg5QixxRUE4RkM7UUF6RkcsWUFBWTtRQUNaLDBCQUEwQjtRQUUxQixXQUFLLEdBQWMsRUFBRSxDQUFDO1FBR3RCLGlCQUFXLEdBQVksSUFBSSxDQUFDO1FBRTVCLFVBQUksR0FBRyxDQUFDLENBQUE7UUFHUixtQkFBYSxHQUFZLElBQUksQ0FBQztRQUM5Qix3QkFBd0I7UUFDeEIsY0FBUSxHQUFTLEtBQUssQ0FBQzs7UUF1RXZCLGdCQUFnQjtRQUNoQixnQkFBZ0I7UUFDaEIsMkJBQTJCO1FBRTNCLElBQUk7SUFDUixDQUFDO0lBM0VHLGVBQWU7SUFDTCwyQkFBUSxHQUFsQjtRQUNJLDREQUE0RDtRQUU1RCxJQUFJLENBQUMsR0FBQyxDQUFDLENBQUE7UUFDSCxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQ1YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDLFFBQVEsSUFBRSxJQUFJLENBQUE7WUFDNUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUMsWUFBWSxDQUFD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cm4gVHlwZVNjcmlwdDpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuaW1wb3J0IHsgR2FtZVNjZW5lIH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCBNYXBNYW5hZ2VyIGZyb20gXCIuLi9HdWFKaS9NYXBNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IExldmVsTWFuYWdlciB9IGZyb20gXCIuLi9MZXZlbC9MZXZlbE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgVHV0b3JpYWxMZXZlbE1hbmFnZXIgfSBmcm9tIFwiLi4vTGV2ZWwvVHV0b3JpYWxMZXZlbFwiO1xyXG5pbXBvcnQgeyBGb2xsb3dfVHlwZSB9IGZyb20gXCIuLi9tdWx0aUxhbmd1YWdlL0ZvbGxvd0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgRm9sbG93TWFuYWdlciBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dNYW5hZ2VyXCI7XHJcbmltcG9ydCBUdXRvcmFpbHNNYW5hZ2VyIGZyb20gXCIuLi9UdXRvcmlhbHMvVHV0b3JhaWxzTWFuYWdlclwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOZXdDbGFzcyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgLy8gQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgLy8gbGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICAvLyBAcHJvcGVydHlcclxuICAgIC8vIHRleHQ6IHN0cmluZyA9ICdoZWxsbyc7XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIENvbWljOiBjYy5Ob2RlW10gPSBbXTtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIFByb2dyZXNzQmFyOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIFxyXG4gICAgdGltZSA9IDBcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIExvYWRpbmdfQ29taWM6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcbiAgICBpc19jbGljazpib29sZWFuPWZhbHNlO1xyXG4gICAgLy8gb25Mb2FkICgpIHt9XHJcbiAgICBwcm90ZWN0ZWQgb25FbmFibGUoKTogdm9pZCB7XHJcbiAgICAgICAgLy8gZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuQ29taWMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIGxldCBpPTBcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuUHJvZ3Jlc3NCYXIuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKS5wcm9ncmVzcys9MC4wMVxyXG4gICAgICAgICAgICAgICAgdGhpcy5Qcm9ncmVzc0Jhci5nZXRDaGlsZEJ5TmFtZShcImxvYWRMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz0odGhpcy5Qcm9ncmVzc0Jhci5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpLnByb2dyZXNzKjEwMCkudG9GaXhlZCgwKSsnJSc7XHJcbiAgICAgICAgICAgICAgICBpKytcclxuICAgICAgICAgICAgICAgIGlmKGk9PTEwMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRpbWU9MC43XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRpbWVzPTFcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlByb2dyZXNzQmFyLnBhcmVudC5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkxvYWRpbmdfQ29taWMuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5zZXRBbmltYXRpb24oMCxcImFuaW1hdGlvblwiLGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjYy50d2Vlbih0aGlzLkNvbWljWzBdKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIC8vIGNjLnR3ZWVuKClcclxuICAgICAgICAgICAgICAgICAgICAvLyAvLyAudG8oMSwgeyBzY2FsZTogMiB9LCB7IGVhc2luZzogJ3NpbmVPdXRJbid9KVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIC50byh0aW1lLCB7IHBvc2l0aW9uOm5ldyBjYy5WZWMzKDAsNDY1LDApfSx7IGVhc2luZzogJ3F1aW50T3V0J30pXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gLy8g5b2T5YmN6Z2i55qE5Yqo5L2c6YO95omn6KGM5a6M5q+V5ZCO5omN5Lya6LCD55So6L+Z5Liq5Zue6LCD5Ye95pWwXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gLmRlbGF5KHRpbWVzKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIC5jYWxsKCgpID0+IHsgXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGNjLnR3ZWVuKHRoaXMuQ29taWNbMV0pXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIC50byh0aW1lLCB7IHBvc2l0aW9uOm5ldyBjYy5WZWMzKDAsMTY0LDApfSx7IGVhc2luZzogJ3F1aW50T3V0J30pXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIC8vIOW9k+WJjemdoueahOWKqOS9nOmDveaJp+ihjOWujOavleWQjuaJjeS8muiwg+eUqOi/meS4quWbnuiwg+WHveaVsFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAuZGVsYXkodGltZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIC5jYWxsKCgpID0+IHsgXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBjYy50d2Vlbih0aGlzLkNvbWljWzJdKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgLnRvKHRpbWUsIHsgcG9zaXRpb246bmV3IGNjLlZlYzMoMTIsLTE1NSwwKX0seyBlYXNpbmc6ICdxdWludE91dCd9KVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgLy8g5b2T5YmN6Z2i55qE5Yqo5L2c6YO95omn6KGM5a6M5q+V5ZCO5omN5Lya6LCD55So6L+Z5Liq5Zue6LCD5Ye95pWwXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAuZGVsYXkodGltZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAuY2FsbCgoKSA9PiB7IFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMuQ29taWNbM10pXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgLnRvKHRpbWUsIHsgcG9zaXRpb246bmV3IGNjLlZlYzMoLTMwLC00NzQsMCl9LHsgZWFzaW5nOiAncXVpbnRPdXQnfSlcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAvLyDlvZPliY3pnaLnmoTliqjkvZzpg73miafooYzlrozmr5XlkI7miY3kvJrosIPnlKjov5nkuKrlm57osIPlh73mlbBcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAuY2FsbCgoKSA9PiB7IFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIisrKysrKytcIilcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIC5zdGFydCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgLnN0YXJ0KClcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgLnN0YXJ0KClcclxuICAgICAgICAgICAgICAgICAgICAvLyB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIC5zdGFydCgpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIDAuMDI1LCA5OSk7XHJcblxyXG4gICAgICAgICAgICAvLyB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyB9LCAyKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIC8vIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBzdGFydCAoKSB7XHJcbiAgICAgICAgXHJcbiAgICAvLyB9XHJcbiAgICBvbkZpcnN0TGV2ZWwoKXsvL+eCueWHu+a8q+eUu+eahOe7p+e7reaMiemSru+8jOebtOaOpei/m+WFpeS4i+S4gOWFs1xcXHJcbiAgICAgICAgaWYodGhpcy5pc19jbGljaz09dHJ1ZSlcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy5pc19jbGljaz10cnVlO1xyXG4gICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7mlrDmiYvlvJXlr7wrMjAwKTtcclxuICAgICAgICBMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydF9sZXZlbD1NYXBNYW5hZ2VyLkN1cnJlbnRsZXZlbD0xO1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZmlnaHRpbmdfaW5mbz1UdXRvcmlhbExldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEZpZ2h0aW5nSW5mbyhMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydF9sZXZlbCk7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zY2VuZT1HYW1lU2NlbmUuZ2FtZTtcclxuICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNfZmluaXNoX2dhbWU9ZmFsc2U7XHJcbiAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKEdhbWVTY2VuZS5nYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7XHJcbiAgICAvLyB0aGlzLnRpbWUrPWR0XHJcbiAgICAvLyBjb25zb2xlLmxvZyggdGhpcy50aW1lKTtcclxuICAgIFxyXG4gICAgLy8gfVxyXG59XHJcbiJdfQ==