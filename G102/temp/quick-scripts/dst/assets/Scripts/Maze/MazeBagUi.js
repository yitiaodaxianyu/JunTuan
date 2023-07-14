
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Maze/MazeBagUi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ae66fuwg99E/JWNRLjsOQ8c', 'MazeBagUi');
// Scripts/Maze/MazeBagUi.ts

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
var LanguageManager_1 = require("../multiLanguage/LanguageManager");
var AudioConstants_1 = require("../Sound/AudioConstants");
var UIComponent_1 = require("../UI/UIComponent");
var MazeBuffItem_1 = require("./MazeBuffItem");
var MazeManager_1 = require("./MazeManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MazeBagUi = /** @class */ (function (_super) {
    __extends(MazeBagUi, _super);
    function MazeBagUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefab_buff_item = null;
        return _this;
    }
    MazeBagUi.prototype.start = function () {
        this.initUi();
    };
    MazeBagUi.prototype.initUi = function () {
        //buff列表
        var buffList = MazeManager_1.MazeManager.getInstance().getBuffList();
        //buffList=RogueBuffManager.getInstance().getBuffIdList()
        //标题
        var hint = this.node.getChildByName('hint');
        var label = hint.getChildByName('label');
        label.getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(830021);
        var detailLabel = this.node.getChildByName('detailLabel');
        detailLabel.getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(830022);
        var content = this.node.getChildByName('scrollView').getComponent(cc.ScrollView).content;
        var len = buffList.length;
        hint.active = len == 0;
        for (var i = 0; i < len; i++) {
            var buffId = buffList[i];
            var buffItem = cc.instantiate(this.prefab_buff_item);
            buffItem.getComponent(MazeBuffItem_1.default).init(buffId);
            content.addChild(buffItem);
        }
    };
    MazeBagUi.prototype.clickBtnYes = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        //城墙满血
        _super.prototype.onClose.call(this);
    };
    MazeBagUi.prototype.clickBtnNo = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        _super.prototype.onClose.call(this);
    };
    __decorate([
        property(cc.Prefab)
    ], MazeBagUi.prototype, "prefab_buff_item", void 0);
    MazeBagUi = __decorate([
        ccclass
    ], MazeBagUi);
    return MazeBagUi;
}(UIComponent_1.default));
exports.default = MazeBagUi;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTWF6ZVxcTWF6ZUJhZ1VpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDhDQUF5QztBQUN6QyxvRUFBK0Q7QUFDL0QsMERBQXFEO0FBQ3JELGlEQUE0QztBQUk1QywrQ0FBMEM7QUFDMUMsNkNBQTRDO0FBSXRDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXVDLDZCQUFXO0lBQWxEO1FBQUEscUVBeUNDO1FBdENHLHNCQUFnQixHQUFXLElBQUksQ0FBQzs7SUFzQ3BDLENBQUM7SUFwQ0cseUJBQUssR0FBTDtRQUNJLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBRUQsMEJBQU0sR0FBTjtRQUNJLFFBQVE7UUFDUixJQUFJLFFBQVEsR0FBQyx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3JELHlEQUF5RDtRQUN6RCxJQUFJO1FBQ0osSUFBSSxJQUFJLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUMsSUFBSSxLQUFLLEdBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN2QyxLQUFLLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUMseUJBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekYsSUFBSSxXQUFXLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDeEQsV0FBVyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxHQUFDLHlCQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQy9GLElBQUksT0FBTyxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDO1FBQ3ZGLElBQUksR0FBRyxHQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7UUFDeEIsSUFBSSxDQUFDLE1BQU0sR0FBQyxHQUFHLElBQUUsQ0FBQyxDQUFDO1FBQ25CLEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUM7WUFDcEIsSUFBSSxNQUFNLEdBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLElBQUksUUFBUSxHQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDbkQsUUFBUSxDQUFDLFlBQVksQ0FBQyxzQkFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2pELE9BQU8sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDOUI7SUFDTCxDQUFDO0lBRUQsK0JBQVcsR0FBWDtRQUNJLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQywyQkFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BFLE1BQU07UUFFTixpQkFBTSxPQUFPLFdBQUUsQ0FBQztJQUNwQixDQUFDO0lBRUQsOEJBQVUsR0FBVjtRQUNJLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQywyQkFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BFLGlCQUFNLE9BQU8sV0FBRSxDQUFDO0lBQ3BCLENBQUM7SUFyQ0Q7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzt1REFDWTtJQUhmLFNBQVM7UUFEN0IsT0FBTztPQUNhLFNBQVMsQ0F5QzdCO0lBQUQsZ0JBQUM7Q0F6Q0QsQUF5Q0MsQ0F6Q3NDLHFCQUFXLEdBeUNqRDtrQkF6Q29CLFNBQVMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCBMYW5ndWFnZU1hbmFnZXIgZnJvbSBcIi4uL211bHRpTGFuZ3VhZ2UvTGFuZ3VhZ2VNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFNvdW5kSW5kZXggfSBmcm9tIFwiLi4vU291bmQvQXVkaW9Db25zdGFudHNcIjtcclxuaW1wb3J0IFVJQ29tcG9uZW50IGZyb20gXCIuLi9VSS9VSUNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBSb2d1ZUJ1ZmZNYW5hZ2VyIH0gZnJvbSBcIi4vRGF0YS9Sb2d1ZUJ1ZmZcIjtcclxuaW1wb3J0IHsgUm9ndWVIZXhhZ29uVHlwZXNNYW5hZ2VyIH0gZnJvbSBcIi4vRGF0YS9Sb2d1ZUhleGFnb25UeXBlc1wiO1xyXG5pbXBvcnQgeyBSb2d1ZVRleHRNYW5hZ2VyIH0gZnJvbSBcIi4vRGF0YS9Sb2d1ZVRleHRcIjtcclxuaW1wb3J0IE1hemVCdWZmSXRlbSBmcm9tIFwiLi9NYXplQnVmZkl0ZW1cIjtcclxuaW1wb3J0IHsgTWF6ZU1hbmFnZXIgfSBmcm9tIFwiLi9NYXplTWFuYWdlclwiO1xyXG5pbXBvcnQgTWF6ZVVpIGZyb20gXCIuL01hemVVaVwiO1xyXG5cclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWF6ZUJhZ1VpIGV4dGVuZHMgVUlDb21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICBwcmVmYWJfYnVmZl9pdGVtOmNjLlByZWZhYj1udWxsO1xyXG5cclxuICAgIHN0YXJ0KCl7XHJcbiAgICAgICAgdGhpcy5pbml0VWkoKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0VWkoKXtcclxuICAgICAgICAvL2J1ZmbliJfooahcclxuICAgICAgICBsZXQgYnVmZkxpc3Q9TWF6ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRCdWZmTGlzdCgpO1xyXG4gICAgICAgIC8vYnVmZkxpc3Q9Um9ndWVCdWZmTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEJ1ZmZJZExpc3QoKVxyXG4gICAgICAgIC8v5qCH6aKYXHJcbiAgICAgICAgbGV0IGhpbnQ9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdoaW50Jyk7ICAgICAgICAgXHJcbiAgICAgICAgbGV0IGxhYmVsPWhpbnQuZ2V0Q2hpbGRCeU5hbWUoJ2xhYmVsJyk7XHJcbiAgICAgICAgbGFiZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9TGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoODMwMDIxKTtcclxuICAgICAgICBsZXQgZGV0YWlsTGFiZWw9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdkZXRhaWxMYWJlbCcpO1xyXG4gICAgICAgIGRldGFpbExhYmVsLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPUxhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDgzMDAyMik7XHJcbiAgICAgICAgbGV0IGNvbnRlbnQ9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdzY3JvbGxWaWV3JykuZ2V0Q29tcG9uZW50KGNjLlNjcm9sbFZpZXcpLmNvbnRlbnQ7XHJcbiAgICAgICAgbGV0IGxlbj1idWZmTGlzdC5sZW5ndGg7XHJcbiAgICAgICAgaGludC5hY3RpdmU9bGVuPT0wO1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPGxlbjsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IGJ1ZmZJZD1idWZmTGlzdFtpXTtcclxuICAgICAgICAgICAgbGV0IGJ1ZmZJdGVtPWNjLmluc3RhbnRpYXRlKHRoaXMucHJlZmFiX2J1ZmZfaXRlbSk7XHJcbiAgICAgICAgICAgIGJ1ZmZJdGVtLmdldENvbXBvbmVudChNYXplQnVmZkl0ZW0pLmluaXQoYnVmZklkKTtcclxuICAgICAgICAgICAgY29udGVudC5hZGRDaGlsZChidWZmSXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuWWVzKCl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICAvL+WfjuWimea7oeihgFxyXG4gICAgICAgIFxyXG4gICAgICAgIHN1cGVyLm9uQ2xvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBjbGlja0J0bk5vKCl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBzdXBlci5vbkNsb3NlKCk7XHJcbiAgICB9XHJcbn1cclxuIl19