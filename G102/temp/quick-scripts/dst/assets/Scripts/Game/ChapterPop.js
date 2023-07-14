
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
            MapManager_1.default.Currentlevel = MissionLevel_1.MissionLevelManager.getInstance().getChapterLevel(this.level + 1) - 1;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcR2FtZVxcQ2hhcHRlclBvcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVsRiw4Q0FBeUM7QUFDekMsa0RBQTZDO0FBRTdDLHNEQUFxRDtBQUNyRCxzREFBNEQ7QUFDNUQsa0VBQXdFO0FBRXhFLG9FQUErRDtBQUMvRCw4REFBeUQ7QUFDekQsbURBQWtEO0FBQ2xELG1DQUE4QjtBQUV4QixJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFzQyw0QkFBWTtJQUFsRDtRQUVJLHNCQUFzQjtRQUN0QiwwQkFBMEI7UUFIOUIscUVBMkdDO1FBdEdHLFlBQVk7UUFDWiwwQkFBMEI7UUFFMUIsd0JBQXdCO1FBRXhCLGVBQWU7UUFFZixtQkFBYSxHQUFZLElBQUksQ0FBQztRQUM5QixXQUFLLEdBQVEsQ0FBQyxDQUFBLENBQUEsT0FBTztRQUVyQixRQUFFLEdBQVksSUFBSSxDQUFDLENBQUEsTUFBTTtRQUV6QixXQUFLLEdBQVksSUFBSSxDQUFDLENBQUEsTUFBTTtRQUU1QixhQUFPLEdBQVksSUFBSSxDQUFDLENBQUEsV0FBVztRQUVuQyxhQUFPLEdBQVksSUFBSSxDQUFDLENBQUEsTUFBTTtRQUU5QixTQUFHLEdBQVksSUFBSSxDQUFDLENBQUEsU0FBUztRQUc3QixnQkFBVSxHQUFZLElBQUksQ0FBQyxDQUFBLHdDQUF3QztRQUVuRSxZQUFNLEdBQUcsSUFBSSxDQUFDLENBQUEsS0FBSztRQUduQixrQkFBWSxHQUFZLElBQUksQ0FBQyxDQUFBLEtBQUs7UUFJbEMsZ0JBQVUsR0FBbUIsSUFBSSxDQUFDLENBQUEsS0FBSzs7UUF1RXZDLGlCQUFp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RSxDQUFDLElBQUksQ0FBQzs2Q0FDTTtJQUV4QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3lDQUNFO0lBR3BCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7Z0RBQ1M7SUFLM0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztrREFDVztJQUk3QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDO2dEQUNTO0lBbkNqQixRQUFRO1FBRDVCLE9BQU87T0FDYSxRQUFRLENBMkc1QjtJQUFELGVBQUM7Q0EzR0QsQUEyR0MsQ0EzR3FDLEVBQUUsQ0FBQyxTQUFTLEdBMkdqRDtrQkEzR29CLFFBQVEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcblxyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCBNYXBNYW5hZ2VyIGZyb20gXCIuLi9HdWFKaS9NYXBNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IE9mZmxpbmVSZXZlbnVlTWFuYWdlciB9IGZyb20gXCIuLi9Kc29uRGF0YS9PZmZsaW5lUmV2ZW51ZVwiO1xyXG5pbXBvcnQgeyBMZXZlbE1hbmFnZXIgfSBmcm9tIFwiLi4vTGV2ZWwvTGV2ZWxNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IE1pc3Npb25MZXZlbE1hbmFnZXIgfSBmcm9tIFwiLi4vTGV2ZWwvTWlzc2lvbkxldmVsXCI7XHJcbmltcG9ydCB7IE9mZmxpbmVSZXZlbnVlU2hvd01hbmFnZXIgfSBmcm9tIFwiLi4vTGV2ZWwvT2ZmbGluZVJldmVudWVTaG93XCI7XHJcbmltcG9ydCBMYWJlbExhbmd1YWdlIGZyb20gXCIuLi9tdWx0aUxhbmd1YWdlL0xhYmVsTGFuZ3VhZ2VcIjtcclxuaW1wb3J0IExhbmd1YWdlTWFuYWdlciBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9MYW5ndWFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IFRleHRMYW5ndWFnZSBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9UZXh0TGFuZ3VhZ2VcIjtcclxuaW1wb3J0IHsgUHJvcE1hbmFnZXIgfSBmcm9tIFwiLi4vUHJvcC9Qcm9wTWFuYWdlclwiO1xyXG5pbXBvcnQgQmlnTWFwIGZyb20gXCIuL0JpZ01hcFwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOZXdDbGFzcyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgLy8gQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgLy8gbGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICAvLyBAcHJvcGVydHlcclxuICAgIC8vIHRleHQ6IHN0cmluZyA9ICdoZWxsbyc7XHJcblxyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcblxyXG4gICAgLy8gb25Mb2FkICgpIHt9XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHR4dFNjcm9sbFZpZXc6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgbGV2ZWw6bnVtYmVyPTAvL+m7mOiupOesrDDlhbNcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgYnQ6IGNjLk5vZGUgPSBudWxsOy8v5qCH6aKY5ZCN5a2XXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGd1c2hpOiBjYy5Ob2RlID0gbnVsbDsvL+eroOiKguaVheS6i1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBuZWVkTnVtOiBjYy5Ob2RlID0gbnVsbDsvL+avj+Wwj+aXtuWinuWKoOWkmuWwkemHkeW4gVxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBjb250ZW50OiBjYy5Ob2RlID0gbnVsbDsvL+aWsOWinuWlluWKsVxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICB0eHQ6IGNjLk5vZGUgPSBudWxsOy8v5peg5paw5aKe5aWW5Yqx5paH5pysXHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBidG5SZXBsYWNlOiBjYy5Ob2RlID0gbnVsbDsvL+iTneiJsuaMiemSriAgIOacquaKtei+vjEwMDEwNiAg5Y+Y54GwICAgIOWJjeW+gDEwMDAzNCAgIOWPmOiTneiJslxyXG5cclxuICAgIHBhcmVudCA9IG51bGw7Ly/niLboioLngrlcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIE1hcF9XaW5kb3dfMTogY2MuTm9kZSA9IG51bGw7Ly/og4zmma/lm75cclxuXHJcbiAgICBcclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGVBdGxhcylcclxuICAgIE1hcF9XaW5kb3c6IGNjLlNwcml0ZUF0bGFzID0gbnVsbDsvL+iDjOaZr+WbvlxyXG4gICAgXHJcbiAgICBzdGFydCAoKSB7XHJcblxyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIG9uRW5hYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudHh0U2Nyb2xsVmlldy5nZXRDb21wb25lbnQoY2MuU2Nyb2xsVmlldykuc2Nyb2xsVG9Ub3AoMClcclxuICAgICAgICB0aGlzLnR4dFNjcm9sbFZpZXcuZ2V0Q29tcG9uZW50KGNjLlNjcm9sbFZpZXcpLnNjcm9sbFRvQm90dG9tKDQpXHJcblxyXG4gICAgICAgIHRoaXMuYnQuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0UmVwbGFjZVZhbHVlKCd+JywodGhpcy5sZXZlbCsxKSArICcnKTsvLy5zZXRUZXh0SWQoT2ZmbGluZVJldmVudWVTaG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFRpdGxldGV4dCh0aGlzLmxldmVsKzEpKVxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuZ3VzaGkuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0VGV4dElkKE9mZmxpbmVSZXZlbnVlU2hvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRDaGFwdGVySW50cm9kdWN0aW9uKHRoaXMubGV2ZWwrMSkpXHJcblxyXG4gICAgICAgIHRoaXMubmVlZE51bS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1cIitcIitPZmZsaW5lUmV2ZW51ZVNob3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0R2V0Q29pbnModGhpcy5sZXZlbCsxKStcIi9oXCJcclxuXHJcbiAgICAgICAgbGV0IFVubG9ja1Byb3BzPU9mZmxpbmVSZXZlbnVlU2hvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRVbmxvY2tQcm9wcyh0aGlzLmxldmVsKzEpXHJcblxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwi57K+54G15Zu+77yaXCIsdGhpcy5NYXBfV2luZG93LmdldFNwcml0ZUZyYW1lKFwiTWFwX1dpbmRvd18xXCIpLHRoaXMubGV2ZWwrMSlcclxuICAgICAgICB0aGlzLk1hcF9XaW5kb3dfMS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZT10aGlzLk1hcF9XaW5kb3cuZ2V0U3ByaXRlRnJhbWUoXCJNYXBfV2luZG93X1wiKyh0aGlzLmxldmVsKzEpKVxyXG5cclxuICAgICAgICBpZihVbmxvY2tQcm9wcy5sZW5ndGg9PTApe1xyXG4gICAgICAgICAgICB0aGlzLnR4dC5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLnR4dC5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IFVubG9ja1Byb3BzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW09UHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShVbmxvY2tQcm9wc1tpbmRleF0sMCk7XHJcbiAgICAgICAgICAgICAgICBpdGVtLnNjYWxlPTAuOTtcclxuICAgICAgICAgICAgICAgIGl0ZW0ucGFyZW50PXRoaXMuY29udGVudDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbXlDaGFwdGVyPTBcclxuICAgICAgICBpZihMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5maW5pc2hfbGV2ZWw8TWlzc2lvbkxldmVsTWFuYWdlci5nZXRNYXhMZXZlbCgpKXtcclxuICAgICAgICAgICAgbXlDaGFwdGVyPU1pc3Npb25MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRDaGFwdGVyKExldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmZpbmlzaF9sZXZlbCsxKVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBteUNoYXB0ZXI9TWlzc2lvbkxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldENoYXB0ZXIoTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZmluaXNoX2xldmVsKVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZigodGhpcy5sZXZlbCsxKT5teUNoYXB0ZXIpe1xyXG4gICAgICAgICAgICAvLyB0aGlzLkZsYWcuY2hpbGRyZW5bdGhpcy5sZXZlbF0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWU9dGhpcy5zcHJpdGVGcmFtZVsxXVxyXG4gICAgICAgICAgICB0aGlzLmJ0blJlcGxhY2UuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc2V0TWF0ZXJpYWwoMCwgY2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKFwiMmQtZ3JheS1zcHJpdGVcIikpO1xyXG4gICAgICAgICAgICB0aGlzLmJ0blJlcGxhY2UuZ2V0Q2hpbGRCeU5hbWUoXCJsYWJlbFwiKS5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1ncmF5LXNwcml0ZVwiKSk7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuUmVwbGFjZS5nZXRDaGlsZEJ5TmFtZShcImxhYmVsXCIpLmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnNldFRleHRJZCgxMDAxMDYpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCh0aGlzLmxldmVsKzEpPD1teUNoYXB0ZXIpe1xyXG4gICAgICAgICAgICB0aGlzLmJ0blJlcGxhY2UuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc2V0TWF0ZXJpYWwoMCwgY2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKFwiMmQtc3ByaXRlXCIpKTtcclxuICAgICAgICAgICAgdGhpcy5idG5SZXBsYWNlLmdldENoaWxkQnlOYW1lKFwibGFiZWxcIikuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0TWF0ZXJpYWwoMCwgY2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKFwiMmQtc3ByaXRlXCIpKTtcclxuICAgICAgICAgICAgdGhpcy5idG5SZXBsYWNlLmdldENoaWxkQnlOYW1lKFwibGFiZWxcIikuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0VGV4dElkKDEwMDAzNClcclxuICAgICAgICAgICAgLy8gdGhpcy5GbGFnLmNoaWxkcmVuW3RoaXMubGV2ZWxdLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lPXRoaXMuc3ByaXRlRnJhbWVbMF1cclxuICAgICAgICAgICAgLy8gaWYoKHRoaXMubGV2ZWwrMSk9PUNoYXB0ZXIpe1xyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5NYXBfU3dvcmQuc2V0UG9zaXRpb24odGhpcy5GbGFnLmNoaWxkcmVuW3RoaXMubGV2ZWxdLmdldFBvc2l0aW9uKCkueCx0aGlzLkZsYWcuY2hpbGRyZW5bdGhpcy5sZXZlbF0uZ2V0UG9zaXRpb24oKS55KzEwMCwwKVxyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgb25CdG5fQ2xvc2UoKXtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5jb250ZW50LmNoaWxkcmVuLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQuY2hpbGRyZW5baW5kZXhdLmRlc3Ryb3koKVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlPWZhbHNlXHJcbiAgICB9XHJcbiAgICBvbkJ0bl9SZXBsYWNlKCl7XHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgIGlmKHRoaXMuYnRuUmVwbGFjZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5nZXRNYXRlcmlhbCgwKS5fbmFtZT09ICdidWlsdGluLTJkLWdyYXktc3ByaXRlIChJbnN0YW5jZSknKXtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCgxMDAxMDgpKS8v5pqC5pyq6Kej6ZSB6K+l56ug6IqCXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIE1hcE1hbmFnZXIuQ3VycmVudGxldmVsPU1pc3Npb25MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRDaGFwdGVyTGV2ZWwodGhpcy5sZXZlbCsxKS0xXHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiX19fX19fX19cIixNYXBNYW5hZ2VyLkN1cnJlbnRsZXZlbCx0aGlzLmxldmVsKVxyXG4gICAgICAgICAgICB0aGlzLm9uQnRuX0Nsb3NlKClcclxuICAgICAgICAgICAgdGhpcy5wYXJlbnQuZ2V0Q29tcG9uZW50KEJpZ01hcCkub25CdG5fQ2xvc2UoKVxyXG4gICAgICAgICAgICAvL+i/m+WFpei/meS4queroOiKglxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxyXG59XHJcbiJdfQ==