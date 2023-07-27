
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Game/ChapterPop.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a7e88t90t9BTaLIQKcCOZtt', 'ChapterPop');
// Scripts/Game/ChapterPop.ts

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
var GameManager_1 = require("../GameManager");
var MapManager_1 = require("../GuaJi/MapManager");
var LevelManager_1 = require("../Level/LevelManager");
var MissionLevel_1 = require("../Level/MissionLevel");
var OfflineRevenueShow_1 = require("../Level/OfflineRevenueShow");
var LanguageManager_1 = require("../multiLanguage/LanguageManager");
var TextLanguage_1 = require("../multiLanguage/TextLanguage");
var PropManager_1 = require("../Prop/PropManager");
var BigMap_1 = require("./BigMap");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        // @property(cc.Label)
        // label: cc.Label = null;
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // @property
        // text: string = 'hello';
        // LIFE-CYCLE CALLBACKS:
        // onLoad () {}
        _this.txtScrollView = null;
        _this.level = 0; //默认第0关
        _this.bt = null; //标题名字
        _this.gushi = null; //章节故事
        _this.needNum = null; //每小时增加多少金币
        _this.content = null; //新增奖励
        _this.txt = null; //无新增奖励文本
        _this.btnReplace = null; //蓝色按钮   未抵达100106  变灰    前往100034   变蓝色
        _this.parent = null; //父节点
        _this.Map_Window_1 = null; //背景图
        _this.Map_Window = null; //背景图
        return _this;
        // update (dt) {}
    }
    NewClass.prototype.start = function () {
    };
    NewClass.prototype.onEnable = function () {
        this.txtScrollView.getComponent(cc.ScrollView).scrollToTop(0);
        this.txtScrollView.getComponent(cc.ScrollView).scrollToBottom(4);
        this.bt.getComponent(TextLanguage_1.default).setReplaceValue('~', (this.level + 1) + ''); //.setTextId(OfflineRevenueShowManager.getInstance().getTitletext(this.level+1))
        this.gushi.getComponent(TextLanguage_1.default).setTextId(OfflineRevenueShow_1.OfflineRevenueShowManager.getInstance().getChapterIntroduction(this.level + 1));
        this.needNum.getComponent(cc.Label).string = "+" + OfflineRevenueShow_1.OfflineRevenueShowManager.getInstance().getGetCoins(this.level + 1) + "/h";
        var UnlockProps = OfflineRevenueShow_1.OfflineRevenueShowManager.getInstance().getUnlockProps(this.level + 1);
        // console.log("精灵图：",this.Map_Window.getSpriteFrame("Map_Window_1"),this.level+1)
        this.Map_Window_1.getComponent(cc.Sprite).spriteFrame = this.Map_Window.getSpriteFrame("Map_Window_" + (this.level + 1));
        if (UnlockProps.length == 0) {
            this.txt.active = true;
        }
        else {
            this.txt.active = false;
            for (var index = 0; index < UnlockProps.length; index++) {
                var item = PropManager_1.PropManager.getInstance().createPropItem(UnlockProps[index], 0);
                item.scale = 0.9;
                item.parent = this.content;
            }
        }
        var myChapter = 0;
        if (LevelManager_1.LevelManager.getInstance().finish_level < MissionLevel_1.MissionLevelManager.getMaxLevel()) {
            myChapter = MissionLevel_1.MissionLevelManager.getInstance().getChapter(LevelManager_1.LevelManager.getInstance().finish_level + 1);
        }
        else {
            myChapter = MissionLevel_1.MissionLevelManager.getInstance().getChapter(LevelManager_1.LevelManager.getInstance().finish_level);
        }
        if ((this.level + 1) > myChapter) {
            // this.Flag.children[this.level].getComponent(cc.Sprite).spriteFrame=this.spriteFrame[1]
            this.btnReplace.getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
            this.btnReplace.getChildByName("label").getComponent(TextLanguage_1.default).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
            this.btnReplace.getChildByName("label").getComponent(TextLanguage_1.default).setTextId(100106);
        }
        if ((this.level + 1) <= myChapter) {
            this.btnReplace.getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
            this.btnReplace.getChildByName("label").getComponent(TextLanguage_1.default).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
            this.btnReplace.getChildByName("label").getComponent(TextLanguage_1.default).setTextId(100034);
            // this.Flag.children[this.level].getComponent(cc.Sprite).spriteFrame=this.spriteFrame[0]
            // if((this.level+1)==Chapter){
            //     this.Map_Sword.setPosition(this.Flag.children[this.level].getPosition().x,this.Flag.children[this.level].getPosition().y+100,0)
            // }
        }
    };
    NewClass.prototype.onBtn_Close = function () {
        for (var index = 0; index < this.content.children.length; index++) {
            this.content.children[index].destroy();
        }
        this.node.active = false;
    };
    NewClass.prototype.onBtn_Replace = function () {
        // @ts-ignore
        if (this.btnReplace.getComponent(cc.Sprite).getMaterial(0)._name == 'builtin-2d-gray-sprite (Instance)') {
            GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getStrByTextId(100108)); //暂未解锁该章节
        }
        else {
            MapManager_1.default.Currentlevel = MissionLevel_1.MissionLevelManager.getInstance().getChapterLevel(this.level + 1);
            // console.log("________",MapManager.Currentlevel,this.level)
            this.onBtn_Close();
            this.parent.getComponent(BigMap_1.default).onBtn_Close();
            //进入这个章节
        }
    };
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "txtScrollView", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "bt", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "gushi", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "needNum", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "content", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "txt", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "btnReplace", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "Map_Window_1", void 0);
    __decorate([
        property(cc.SpriteAtlas)
    ], NewClass.prototype, "Map_Window", void 0);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcR2FtZVxcQ2hhcHRlclBvcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVsRiw4Q0FBeUM7QUFDekMsa0RBQTZDO0FBRTdDLHNEQUFxRDtBQUNyRCxzREFBNEQ7QUFDNUQsa0VBQXdFO0FBRXhFLG9FQUErRDtBQUMvRCw4REFBeUQ7QUFDekQsbURBQWtEO0FBQ2xELG1DQUE4QjtBQUV4QixJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFzQyw0QkFBWTtJQUFsRDtRQUVJLHNCQUFzQjtRQUN0QiwwQkFBMEI7UUFIOUIscUVBMkdDO1FBdEdHLFlBQVk7UUFDWiwwQkFBMEI7UUFFMUIsd0JBQXdCO1FBRXhCLGVBQWU7UUFFZixtQkFBYSxHQUFZLElBQUksQ0FBQztRQUM5QixXQUFLLEdBQVEsQ0FBQyxDQUFBLENBQUEsT0FBTztRQUVyQixRQUFFLEdBQVksSUFBSSxDQUFDLENBQUEsTUFBTTtRQUV6QixXQUFLLEdBQVksSUFBSSxDQUFDLENBQUEsTUFBTTtRQUU1QixhQUFPLEdBQVksSUFBSSxDQUFDLENBQUEsV0FBVztRQUVuQyxhQUFPLEdBQVksSUFBSSxDQUFDLENBQUEsTUFBTTtRQUU5QixTQUFHLEdBQVksSUFBSSxDQUFDLENBQUEsU0FBUztRQUc3QixnQkFBVSxHQUFZLElBQUksQ0FBQyxDQUFBLHdDQUF3QztRQUVuRSxZQUFNLEdBQUcsSUFBSSxDQUFDLENBQUEsS0FBSztRQUduQixrQkFBWSxHQUFZLElBQUksQ0FBQyxDQUFBLEtBQUs7UUFJbEMsZ0JBQVUsR0FBbUIsSUFBSSxDQUFDLENBQUEsS0FBSzs7UUF1RXZDLGlCQUFp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SSxDQUFDOzZDQUNNO0lBRXhCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7eUNBQ0U7SUFHcEI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztnREFDUztJQUszQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2tEQUNXO0lBSTdCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7Z0RBQ1M7SUFuQ2pCLFFBQVE7UUFENUIsT0FBTztPQUNhLFFBQVEsQ0EyRzVCO0lBQUQsZUFBQztDQTNHRCxBQTJHQyxDQTNHcUMsRUFBRSxDQUFDLFNBQVMsR0EyR2pEO2tCQTNHb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuXHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IE1hcE1hbmFnZXIgZnJvbSBcIi4uL0d1YUppL01hcE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgT2ZmbGluZVJldmVudWVNYW5hZ2VyIH0gZnJvbSBcIi4uL0pzb25EYXRhL09mZmxpbmVSZXZlbnVlXCI7XHJcbmltcG9ydCB7IExldmVsTWFuYWdlciB9IGZyb20gXCIuLi9MZXZlbC9MZXZlbE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgTWlzc2lvbkxldmVsTWFuYWdlciB9IGZyb20gXCIuLi9MZXZlbC9NaXNzaW9uTGV2ZWxcIjtcclxuaW1wb3J0IHsgT2ZmbGluZVJldmVudWVTaG93TWFuYWdlciB9IGZyb20gXCIuLi9MZXZlbC9PZmZsaW5lUmV2ZW51ZVNob3dcIjtcclxuaW1wb3J0IExhYmVsTGFuZ3VhZ2UgZnJvbSBcIi4uL211bHRpTGFuZ3VhZ2UvTGFiZWxMYW5ndWFnZVwiO1xyXG5pbXBvcnQgTGFuZ3VhZ2VNYW5hZ2VyIGZyb20gXCIuLi9tdWx0aUxhbmd1YWdlL0xhbmd1YWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgVGV4dExhbmd1YWdlIGZyb20gXCIuLi9tdWx0aUxhbmd1YWdlL1RleHRMYW5ndWFnZVwiO1xyXG5pbXBvcnQgeyBQcm9wTWFuYWdlciB9IGZyb20gXCIuLi9Qcm9wL1Byb3BNYW5hZ2VyXCI7XHJcbmltcG9ydCBCaWdNYXAgZnJvbSBcIi4vQmlnTWFwXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5ld0NsYXNzIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICAvLyBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICAvLyBsYWJlbDogY2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIC8vIEBwcm9wZXJ0eVxyXG4gICAgLy8gdGV4dDogc3RyaW5nID0gJ2hlbGxvJztcclxuXHJcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuXHJcbiAgICAvLyBvbkxvYWQgKCkge31cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgdHh0U2Nyb2xsVmlldzogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBsZXZlbDpudW1iZXI9MC8v6buY6K6k56ysMOWFs1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBidDogY2MuTm9kZSA9IG51bGw7Ly/moIfpopjlkI3lrZdcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgZ3VzaGk6IGNjLk5vZGUgPSBudWxsOy8v56ug6IqC5pWF5LqLXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIG5lZWROdW06IGNjLk5vZGUgPSBudWxsOy8v5q+P5bCP5pe25aKe5Yqg5aSa5bCR6YeR5biBXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGNvbnRlbnQ6IGNjLk5vZGUgPSBudWxsOy8v5paw5aKe5aWW5YqxXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHR4dDogY2MuTm9kZSA9IG51bGw7Ly/ml6DmlrDlop7lpZblirHmlofmnKxcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGJ0blJlcGxhY2U6IGNjLk5vZGUgPSBudWxsOy8v6JOd6Imy5oyJ6ZKuICAg5pyq5oq16L6+MTAwMTA2ICDlj5jngbAgICAg5YmN5b6AMTAwMDM0ICAg5Y+Y6JOd6ImyXHJcblxyXG4gICAgcGFyZW50ID0gbnVsbDsvL+eItuiKgueCuVxyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgTWFwX1dpbmRvd18xOiBjYy5Ob2RlID0gbnVsbDsvL+iDjOaZr+WbvlxyXG5cclxuICAgIFxyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZUF0bGFzKVxyXG4gICAgTWFwX1dpbmRvdzogY2MuU3ByaXRlQXRsYXMgPSBudWxsOy8v6IOM5pmv5Zu+XHJcbiAgICBcclxuICAgIHN0YXJ0ICgpIHtcclxuXHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgb25FbmFibGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy50eHRTY3JvbGxWaWV3LmdldENvbXBvbmVudChjYy5TY3JvbGxWaWV3KS5zY3JvbGxUb1RvcCgwKVxyXG4gICAgICAgIHRoaXMudHh0U2Nyb2xsVmlldy5nZXRDb21wb25lbnQoY2MuU2Nyb2xsVmlldykuc2Nyb2xsVG9Cb3R0b20oNClcclxuXHJcbiAgICAgICAgdGhpcy5idC5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zZXRSZXBsYWNlVmFsdWUoJ34nLCh0aGlzLmxldmVsKzEpICsgJycpOy8vLnNldFRleHRJZChPZmZsaW5lUmV2ZW51ZVNob3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VGl0bGV0ZXh0KHRoaXMubGV2ZWwrMSkpXHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5ndXNoaS5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zZXRUZXh0SWQoT2ZmbGluZVJldmVudWVTaG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldENoYXB0ZXJJbnRyb2R1Y3Rpb24odGhpcy5sZXZlbCsxKSlcclxuXHJcbiAgICAgICAgdGhpcy5uZWVkTnVtLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPVwiK1wiK09mZmxpbmVSZXZlbnVlU2hvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRHZXRDb2lucyh0aGlzLmxldmVsKzEpK1wiL2hcIlxyXG5cclxuICAgICAgICBsZXQgVW5sb2NrUHJvcHM9T2ZmbGluZVJldmVudWVTaG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFVubG9ja1Byb3BzKHRoaXMubGV2ZWwrMSlcclxuXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCLnsr7ngbXlm77vvJpcIix0aGlzLk1hcF9XaW5kb3cuZ2V0U3ByaXRlRnJhbWUoXCJNYXBfV2luZG93XzFcIiksdGhpcy5sZXZlbCsxKVxyXG4gICAgICAgIHRoaXMuTWFwX1dpbmRvd18xLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lPXRoaXMuTWFwX1dpbmRvdy5nZXRTcHJpdGVGcmFtZShcIk1hcF9XaW5kb3dfXCIrKHRoaXMubGV2ZWwrMSkpXHJcblxyXG4gICAgICAgIGlmKFVubG9ja1Byb3BzLmxlbmd0aD09MCl7XHJcbiAgICAgICAgICAgIHRoaXMudHh0LmFjdGl2ZT10cnVlXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMudHh0LmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgVW5sb2NrUHJvcHMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaXRlbT1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKFVubG9ja1Byb3BzW2luZGV4XSwwKTtcclxuICAgICAgICAgICAgICAgIGl0ZW0uc2NhbGU9MC45O1xyXG4gICAgICAgICAgICAgICAgaXRlbS5wYXJlbnQ9dGhpcy5jb250ZW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBteUNoYXB0ZXI9MFxyXG4gICAgICAgIGlmKExldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmZpbmlzaF9sZXZlbDxNaXNzaW9uTGV2ZWxNYW5hZ2VyLmdldE1heExldmVsKCkpe1xyXG4gICAgICAgICAgICBteUNoYXB0ZXI9TWlzc2lvbkxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldENoYXB0ZXIoTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZmluaXNoX2xldmVsKzEpXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIG15Q2hhcHRlcj1NaXNzaW9uTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Q2hhcHRlcihMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5maW5pc2hfbGV2ZWwpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCh0aGlzLmxldmVsKzEpPm15Q2hhcHRlcil7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuRmxhZy5jaGlsZHJlblt0aGlzLmxldmVsXS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZT10aGlzLnNwcml0ZUZyYW1lWzFdXHJcbiAgICAgICAgICAgIHRoaXMuYnRuUmVwbGFjZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1ncmF5LXNwcml0ZVwiKSk7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuUmVwbGFjZS5nZXRDaGlsZEJ5TmFtZShcImxhYmVsXCIpLmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnNldE1hdGVyaWFsKDAsIGNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbChcIjJkLWdyYXktc3ByaXRlXCIpKTtcclxuICAgICAgICAgICAgdGhpcy5idG5SZXBsYWNlLmdldENoaWxkQnlOYW1lKFwibGFiZWxcIikuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0VGV4dElkKDEwMDEwNilcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoKHRoaXMubGV2ZWwrMSk8PW15Q2hhcHRlcil7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuUmVwbGFjZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1zcHJpdGVcIikpO1xyXG4gICAgICAgICAgICB0aGlzLmJ0blJlcGxhY2UuZ2V0Q2hpbGRCeU5hbWUoXCJsYWJlbFwiKS5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1zcHJpdGVcIikpO1xyXG4gICAgICAgICAgICB0aGlzLmJ0blJlcGxhY2UuZ2V0Q2hpbGRCeU5hbWUoXCJsYWJlbFwiKS5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zZXRUZXh0SWQoMTAwMDM0KVxyXG4gICAgICAgICAgICAvLyB0aGlzLkZsYWcuY2hpbGRyZW5bdGhpcy5sZXZlbF0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWU9dGhpcy5zcHJpdGVGcmFtZVswXVxyXG4gICAgICAgICAgICAvLyBpZigodGhpcy5sZXZlbCsxKT09Q2hhcHRlcil7XHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLk1hcF9Td29yZC5zZXRQb3NpdGlvbih0aGlzLkZsYWcuY2hpbGRyZW5bdGhpcy5sZXZlbF0uZ2V0UG9zaXRpb24oKS54LHRoaXMuRmxhZy5jaGlsZHJlblt0aGlzLmxldmVsXS5nZXRQb3NpdGlvbigpLnkrMTAwLDApXHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBvbkJ0bl9DbG9zZSgpe1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLmNvbnRlbnQuY2hpbGRyZW4ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGVudC5jaGlsZHJlbltpbmRleF0uZGVzdHJveSgpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmU9ZmFsc2VcclxuICAgIH1cclxuICAgIG9uQnRuX1JlcGxhY2UoKXtcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgaWYodGhpcy5idG5SZXBsYWNlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLmdldE1hdGVyaWFsKDApLl9uYW1lPT0gJ2J1aWx0aW4tMmQtZ3JheS1zcHJpdGUgKEluc3RhbmNlKScpe1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDEwMDEwOCkpLy/mmoLmnKrop6PplIHor6Xnq6DoioJcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgTWFwTWFuYWdlci5DdXJyZW50bGV2ZWw9TWlzc2lvbkxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldENoYXB0ZXJMZXZlbCh0aGlzLmxldmVsKzEpXHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiX19fX19fX19cIixNYXBNYW5hZ2VyLkN1cnJlbnRsZXZlbCx0aGlzLmxldmVsKVxyXG4gICAgICAgICAgICB0aGlzLm9uQnRuX0Nsb3NlKClcclxuICAgICAgICAgICAgdGhpcy5wYXJlbnQuZ2V0Q29tcG9uZW50KEJpZ01hcCkub25CdG5fQ2xvc2UoKVxyXG4gICAgICAgICAgICAvL+i/m+WFpei/meS4queroOiKglxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxyXG59XHJcbiJdfQ==