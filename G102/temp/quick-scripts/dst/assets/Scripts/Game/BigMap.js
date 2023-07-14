
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Game/BigMap.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd88f0uySDtGlKD+liSb2dDn', 'BigMap');
// Scripts/Game/BigMap.ts

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
var MapManager_1 = require("../GuaJi/MapManager");
var LevelManager_1 = require("../Level/LevelManager");
var MissionLevel_1 = require("../Level/MissionLevel");
var TextLanguage_1 = require("../multiLanguage/TextLanguage");
var ChapterPop_1 = require("./ChapterPop");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BigMap = /** @class */ (function (_super) {
    __extends(BigMap, _super);
    function BigMap() {
        // @property(cc.Label)
        // label: cc.Label = null;
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // @property
        // text: string = 'hello';
        // LIFE-CYCLE CALLBACKS:
        // onLoad () {}
        _this.Btn_Close = null; //关闭按钮
        _this.Flag = null; //状态
        _this.txt = null; //文字
        _this.Frame = null; //文字背景
        _this.spriteFrame = []; //状态图片   0:打过了   1:还没打过
        _this.Chapter = null; //地图
        _this.Map_Sword = null; //剑
        _this.ChapterPop = null; //大地图弹窗
        return _this;
        // update (dt) {}
    }
    // @property(cc.Node)
    // Trascina:cc.Node= null;//大地图弹窗
    BigMap.prototype.start = function () {
        var _this = this;
        this.Btn_Close.on(cc.Node.EventType.TOUCH_END, this.onBtn_Close, this);
        var _loop_1 = function (index) {
            this_1.Flag.children[index].on(cc.Node.EventType.TOUCH_END, (function () {
                _this.onBtn_Chapter(index);
            }), this_1);
            this_1.Frame.children[index].on(cc.Node.EventType.TOUCH_END, (function () {
                _this.onBtn_Chapter(index);
            }), this_1);
        };
        var this_1 = this;
        for (var index = 0; index < this.Flag.children.length; index++) {
            _loop_1(index);
        }
        // this.Trascina.on(cc.Node.EventType.TOUCH_START,((e:cc.Event.EventTouch)=>{//当手指触摸到屏幕时
        //     this.onBtnTOUCH_START(e)
        // }),this);
        // this.Trascina.on(cc.Node.EventType.TOUCH_MOVE,((e:cc.Event.EventTouch)=>{//当手指在屏幕上移动时
        //     this.onBtnTOUCH_MOVE(e)
        // }),this);
        // this.Trascina.on(cc.Node.EventType.TOUCH_END,((e:cc.Event.EventTouch)=>{//当手指在目标节点区域内离开屏幕时
        //     this.onBtnTOUCH_END(e)
        // }),this);
        // this.Trascina.on(cc.Node.EventType.TOUCH_CANCEL,((e:cc.Event.EventTouch)=>{//当手指在目标节点区域外离开屏幕时
        //     this.onBtnTOUCH_CANCEL(e)
        // }),this);
    };
    // onBtnTOUCH_START(e:cc.Event.EventTouch) {
    //     throw new Error("Method not implemented.");
    // }
    // onBtnTOUCH_MOVE(e:cc.Event.EventTouch) {
    //     throw new Error("Method not implemented.");
    // }
    // onBtnTOUCH_END(e:cc.Event.EventTouch) {
    //     throw new Error("Method not implemented.");
    // }
    // onBtnTOUCH_CANCEL(e:cc.Event.EventTouch) {
    //     throw new Error("Method not implemented.");
    // }
    BigMap.prototype.onEnable = function () {
        this.ChapterPop.active = false;
        var myCurrentlevel = LevelManager_1.LevelManager.getInstance().finish_level + 1; //当前最大关卡
        if (MapManager_1.default.Currentlevel == 0) {
        }
        else {
            myCurrentlevel = MapManager_1.default.Currentlevel; //当前点击的关卡
        }
        if (myCurrentlevel >= MissionLevel_1.MissionLevelManager.getMaxLevel()) {
            myCurrentlevel = LevelManager_1.LevelManager.getInstance().finish_level;
            // GameManager.getInstance().showMessage("你太厉害啦，测试版本暂时没有了，敬请期待后续版本！记得加id",3);
        }
        // console.log("++++++++",myCurrentlevel,MissionLevelManager.getMaxLevel())
        var Chapter = MissionLevel_1.MissionLevelManager.getInstance().getChapter(myCurrentlevel); //当前关卡的章节
        for (var index = 0; index < this.Flag.children.length; index++) {
            var myChapter = 0;
            if (LevelManager_1.LevelManager.getInstance().finish_level < MissionLevel_1.MissionLevelManager.getMaxLevel()) {
                myChapter = MissionLevel_1.MissionLevelManager.getInstance().getChapter(LevelManager_1.LevelManager.getInstance().finish_level + 1);
            }
            else {
                myChapter = MissionLevel_1.MissionLevelManager.getInstance().getChapter(LevelManager_1.LevelManager.getInstance().finish_level);
            }
            if ((index + 1) > myChapter) {
                this.Flag.children[index].getComponent(cc.Sprite).spriteFrame = this.spriteFrame[1];
                this.Chapter.children[index].getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
                this.txt.children[index].getComponent(TextLanguage_1.default).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
                this.Frame.children[index].getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
            }
            if ((index + 1) <= myChapter) {
                this.Flag.children[index].getComponent(cc.Sprite).spriteFrame = this.spriteFrame[0];
                this.Chapter.children[index].getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
                this.txt.children[index].getComponent(TextLanguage_1.default).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
                this.Frame.children[index].getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
                if ((index + 1) == Chapter) {
                    this.Map_Sword.setPosition(this.Flag.children[index].getPosition().x, this.Flag.children[index].getPosition().y + 60, 0);
                }
            }
            this.txt.children[index].getComponent(TextLanguage_1.default).setReplaceValue('~', (index + 1) + '');
        }
        // this.ScrollView.getComponent(cc.ScrollView).scrollToBottom(2)
    };
    BigMap.prototype.onBtn_Close = function () {
        MapManager_1.default.getInstance().instantiatelevelnode();
        this.node.active = false;
    };
    BigMap.prototype.onBtn_Chapter = function (level) {
        this.ChapterPop.getComponent(ChapterPop_1.default).parent = this.node;
        this.ChapterPop.getComponent(ChapterPop_1.default).level = Number(level);
        this.ChapterPop.active = true;
    };
    __decorate([
        property(cc.Node)
    ], BigMap.prototype, "Btn_Close", void 0);
    __decorate([
        property(cc.Node)
    ], BigMap.prototype, "Flag", void 0);
    __decorate([
        property(cc.Node)
    ], BigMap.prototype, "txt", void 0);
    __decorate([
        property(cc.Node)
    ], BigMap.prototype, "Frame", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], BigMap.prototype, "spriteFrame", void 0);
    __decorate([
        property(cc.Node)
    ], BigMap.prototype, "Chapter", void 0);
    __decorate([
        property(cc.Node)
    ], BigMap.prototype, "Map_Sword", void 0);
    __decorate([
        property(cc.Node)
    ], BigMap.prototype, "ChapterPop", void 0);
    BigMap = __decorate([
        ccclass
    ], BigMap);
    return BigMap;
}(cc.Component));
exports.default = BigMap;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcR2FtZVxcQmlnTWFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWxGLGtEQUE2QztBQUM3QyxzREFBcUQ7QUFDckQsc0RBQTREO0FBQzVELDhEQUF5RDtBQUN6RCwyQ0FBc0M7QUFFaEMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBb0MsMEJBQVk7SUFBaEQ7UUFFSSxzQkFBc0I7UUFDdEIsMEJBQTBCO1FBSDlCLHFFQW9JQztRQS9IRyxZQUFZO1FBQ1osMEJBQTBCO1FBRTFCLHdCQUF3QjtRQUV4QixlQUFlO1FBRWYsZUFBUyxHQUFXLElBQUksQ0FBQyxDQUFBLE1BQU07UUFHL0IsVUFBSSxHQUFVLElBQUksQ0FBQyxDQUFBLElBQUk7UUFFdkIsU0FBRyxHQUFVLElBQUksQ0FBQyxDQUFBLElBQUk7UUFFdEIsV0FBSyxHQUFVLElBQUksQ0FBQyxDQUFBLE1BQU07UUFHMUIsaUJBQVcsR0FBbUIsRUFBRSxDQUFDLENBQUEsdUJBQXVCO1FBRXhELGFBQU8sR0FBVSxJQUFJLENBQUMsQ0FBQSxJQUFJO1FBRzFCLGVBQVMsR0FBVSxJQUFJLENBQUMsQ0FBQSxHQUFHO1FBRzNCLGdCQUFVLEdBQVUsSUFBSSxDQUFDLENBQUEsT0FBTzs7UUFxR2hDLGlCQUFpQjtJQUNyQixDQUFDO0lBcEdHLHFCQUFxQjtJQUNyQixpQ0FBaUM7SUFFakMsc0JBQUssR0FBTDtRQUFBLGlCQThCQztRQTdCRyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUMsSUFBSSxDQUFDLFdB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QUFDLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUE7UUFDekQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsb0JBQVUsQ0FBQyxDQUFDLEtBQUssR0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDNUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFBO0lBQy9CLENBQUM7SUF0SEQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs2Q0FDTztJQUd6QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3dDQUNDO0lBRW5CO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7dUNBQ0E7SUFFbEI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzt5Q0FDRTtJQUdwQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDOytDQUNRO0lBRWpDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7MkNBQ0k7SUFHdEI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs2Q0FDTTtJQUd4QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzhDQUNPO0lBOUJSLE1BQU07UUFEMUIsT0FBTztPQUNhLE1BQU0sQ0FvSTFCO0lBQUQsYUFBQztDQXBJRCxBQW9JQyxDQXBJbUMsRUFBRSxDQUFDLFNBQVMsR0FvSS9DO2tCQXBJb0IsTUFBTSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuXHJcbmltcG9ydCBNYXBNYW5hZ2VyIGZyb20gXCIuLi9HdWFKaS9NYXBNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IExldmVsTWFuYWdlciB9IGZyb20gXCIuLi9MZXZlbC9MZXZlbE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgTWlzc2lvbkxldmVsTWFuYWdlciB9IGZyb20gXCIuLi9MZXZlbC9NaXNzaW9uTGV2ZWxcIjtcclxuaW1wb3J0IFRleHRMYW5ndWFnZSBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9UZXh0TGFuZ3VhZ2VcIjtcclxuaW1wb3J0IENoYXB0ZXJQb3AgZnJvbSBcIi4vQ2hhcHRlclBvcFwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCaWdNYXAgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIC8vIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIC8vIGxhYmVsOiBjYy5MYWJlbCA9IG51bGw7XHJcblxyXG4gICAgLy8gQHByb3BlcnR5XHJcbiAgICAvLyB0ZXh0OiBzdHJpbmcgPSAnaGVsbG8nO1xyXG5cclxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxyXG5cclxuICAgIC8vIG9uTG9hZCAoKSB7fVxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBCdG5fQ2xvc2U6Y2MuTm9kZSA9IG51bGw7Ly/lhbPpl63mjInpkq5cclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIEZsYWc6Y2MuTm9kZT0gbnVsbDsvL+eKtuaAgVxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICB0eHQ6Y2MuTm9kZT0gbnVsbDsvL+aWh+Wtl1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBGcmFtZTpjYy5Ob2RlPSBudWxsOy8v5paH5a2X6IOM5pmvXHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZUZyYW1lKVxyXG4gICAgc3ByaXRlRnJhbWU6Y2MuU3ByaXRlRnJhbWVbXT0gW107Ly/nirbmgIHlm77niYcgICAwOuaJk+i/h+S6hiAgIDE66L+Y5rKh5omT6L+HXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIENoYXB0ZXI6Y2MuTm9kZT0gbnVsbDsvL+WcsOWbvlxyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgTWFwX1N3b3JkOmNjLk5vZGU9IG51bGw7Ly/liZFcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIENoYXB0ZXJQb3A6Y2MuTm9kZT0gbnVsbDsvL+Wkp+WcsOWbvuW8ueeql1xyXG4gICAgXHJcbiAgICAvLyBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIC8vIFRyYXNjaW5hOmNjLk5vZGU9IG51bGw7Ly/lpKflnLDlm77lvLnnqpdcclxuICAgIFxyXG4gICAgc3RhcnQgKCkge1xyXG4gICAgICAgIHRoaXMuQnRuX0Nsb3NlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCx0aGlzLm9uQnRuX0Nsb3NlLHRoaXMpO1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLkZsYWcuY2hpbGRyZW4ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuRmxhZy5jaGlsZHJlbltpbmRleF0ub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCgoKT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkJ0bl9DaGFwdGVyKGluZGV4KTtcclxuICAgICAgICAgICAgfSksdGhpcyk7XHJcbiAgICAgICAgICAgIHRoaXMuRnJhbWUuY2hpbGRyZW5baW5kZXhdLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwoKCk9PntcclxuICAgICAgICAgICAgICAgIHRoaXMub25CdG5fQ2hhcHRlcihpbmRleCk7XHJcbiAgICAgICAgICAgIH0pLHRoaXMpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gbGV0IGNsaWNrRXZlbnQ9bmV3IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIoKTtcclxuICAgICAgICAgICAgLy8gY2xpY2tFdmVudC50YXJnZXQ9dGhpcy5ub2RlO1xyXG4gICAgICAgICAgICAvLyBjbGlja0V2ZW50LmNvbXBvbmVudD0nQmlnTWFwJztcclxuICAgICAgICAgICAgLy8gY2xpY2tFdmVudC5oYW5kbGVyPSdvbkJ0bl9DaGFwdGVyJztcclxuICAgICAgICAgICAgLy8gY2xpY2tFdmVudC5jdXN0b21FdmVudERhdGEgPSBcIlwiK2luZGV4O1xyXG4gICAgICAgICAgICAvLyB0aGlzLkNoYXB0ZXIuY2hpbGRyZW5baW5kZXhdLmdldENvbXBvbmVudChjYy5CdXR0b24pLmNsaWNrRXZlbnRzLnB1c2goY2xpY2tFdmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHRoaXMuVHJhc2NpbmEub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsKChlOmNjLkV2ZW50LkV2ZW50VG91Y2gpPT57Ly/lvZPmiYvmjIfop6bmkbjliLDlsY/luZXml7ZcclxuICAgICAgICAvLyAgICAgdGhpcy5vbkJ0blRPVUNIX1NUQVJUKGUpXHJcbiAgICAgICAgLy8gfSksdGhpcyk7XHJcbiAgICAgICAgLy8gdGhpcy5UcmFzY2luYS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9NT1ZFLCgoZTpjYy5FdmVudC5FdmVudFRvdWNoKT0+ey8v5b2T5omL5oyH5Zyo5bGP5bmV5LiK56e75Yqo5pe2XHJcbiAgICAgICAgLy8gICAgIHRoaXMub25CdG5UT1VDSF9NT1ZFKGUpXHJcbiAgICAgICAgLy8gfSksdGhpcyk7XHJcbiAgICAgICAgLy8gdGhpcy5UcmFzY2luYS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsKChlOmNjLkV2ZW50LkV2ZW50VG91Y2gpPT57Ly/lvZPmiYvmjIflnKjnm67moIfoioLngrnljLrln5/lhoXnprvlvIDlsY/luZXml7ZcclxuICAgICAgICAvLyAgICAgdGhpcy5vbkJ0blRPVUNIX0VORChlKVxyXG4gICAgICAgIC8vIH0pLHRoaXMpO1xyXG4gICAgICAgIC8vIHRoaXMuVHJhc2NpbmEub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfQ0FOQ0VMLCgoZTpjYy5FdmVudC5FdmVudFRvdWNoKT0+ey8v5b2T5omL5oyH5Zyo55uu5qCH6IqC54K55Yy65Z+f5aSW56a75byA5bGP5bmV5pe2XHJcbiAgICAgICAgLy8gICAgIHRoaXMub25CdG5UT1VDSF9DQU5DRUwoZSlcclxuICAgICAgICAvLyB9KSx0aGlzKTtcclxuICAgICAgICBcclxuICAgIH1cclxuICAgIC8vIG9uQnRuVE9VQ0hfU1RBUlQoZTpjYy5FdmVudC5FdmVudFRvdWNoKSB7XHJcbiAgICAvLyAgICAgdGhyb3cgbmV3IEVycm9yKFwiTWV0aG9kIG5vdCBpbXBsZW1lbnRlZC5cIik7XHJcbiAgICAvLyB9XHJcbiAgICAvLyBvbkJ0blRPVUNIX01PVkUoZTpjYy5FdmVudC5FdmVudFRvdWNoKSB7XHJcbiAgICAvLyAgICAgdGhyb3cgbmV3IEVycm9yKFwiTWV0aG9kIG5vdCBpbXBsZW1lbnRlZC5cIik7XHJcbiAgICAvLyB9XHJcbiAgICAvLyBvbkJ0blRPVUNIX0VORChlOmNjLkV2ZW50LkV2ZW50VG91Y2gpIHtcclxuICAgIC8vICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNZXRob2Qgbm90IGltcGxlbWVudGVkLlwiKTtcclxuICAgIC8vIH1cclxuICAgIC8vIG9uQnRuVE9VQ0hfQ0FOQ0VMKGU6Y2MuRXZlbnQuRXZlbnRUb3VjaCkge1xyXG4gICAgLy8gICAgIHRocm93IG5ldyBFcnJvcihcIk1ldGhvZCBub3QgaW1wbGVtZW50ZWQuXCIpO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkVuYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLkNoYXB0ZXJQb3AuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgbGV0IG15Q3VycmVudGxldmVsPUxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmZpbmlzaF9sZXZlbCsxOy8v5b2T5YmN5pyA5aSn5YWz5Y2hXHJcbiAgICAgICAgaWYoTWFwTWFuYWdlci5DdXJyZW50bGV2ZWw9PTApe1xyXG5cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgbXlDdXJyZW50bGV2ZWw9TWFwTWFuYWdlci5DdXJyZW50bGV2ZWw7Ly/lvZPliY3ngrnlh7vnmoTlhbPljaFcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYobXlDdXJyZW50bGV2ZWw+PU1pc3Npb25MZXZlbE1hbmFnZXIuZ2V0TWF4TGV2ZWwoKSl7XHJcbiAgICAgICAgICAgIG15Q3VycmVudGxldmVsPUxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmZpbmlzaF9sZXZlbFxyXG4gICAgICAgICAgICAvLyBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKFwi5L2g5aSq5Y6J5a6z5ZWm77yM5rWL6K+V54mI5pys5pqC5pe25rKh5pyJ5LqG77yM5pWs6K+35pyf5b6F5ZCO57ut54mI5pys77yB6K6w5b6X5YqgaWRcIiwzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCIrKysrKysrK1wiLG15Q3VycmVudGxldmVsLE1pc3Npb25MZXZlbE1hbmFnZXIuZ2V0TWF4TGV2ZWwoKSlcclxuICAgICAgICBsZXQgQ2hhcHRlcj1NaXNzaW9uTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Q2hhcHRlcihteUN1cnJlbnRsZXZlbCkvL+W9k+WJjeWFs+WNoeeahOeroOiKglxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLkZsYWcuY2hpbGRyZW4ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGxldCBteUNoYXB0ZXI9MFxyXG4gICAgICAgICAgICBpZihMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5maW5pc2hfbGV2ZWw8TWlzc2lvbkxldmVsTWFuYWdlci5nZXRNYXhMZXZlbCgpKXtcclxuICAgICAgICAgICAgICAgIG15Q2hhcHRlcj1NaXNzaW9uTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Q2hhcHRlcihMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5maW5pc2hfbGV2ZWwrMSlcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBteUNoYXB0ZXI9TWlzc2lvbkxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldENoYXB0ZXIoTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZmluaXNoX2xldmVsKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZigoaW5kZXgrMSk+bXlDaGFwdGVyKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuRmxhZy5jaGlsZHJlbltpbmRleF0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWU9dGhpcy5zcHJpdGVGcmFtZVsxXVxyXG4gICAgICAgICAgICAgICAgdGhpcy5DaGFwdGVyLmNoaWxkcmVuW2luZGV4XS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1ncmF5LXNwcml0ZVwiKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnR4dC5jaGlsZHJlbltpbmRleF0uZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0TWF0ZXJpYWwoMCwgY2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKFwiMmQtZ3JheS1zcHJpdGVcIikpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5GcmFtZS5jaGlsZHJlbltpbmRleF0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc2V0TWF0ZXJpYWwoMCwgY2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKFwiMmQtZ3JheS1zcHJpdGVcIikpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoKGluZGV4KzEpPD1teUNoYXB0ZXIpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5GbGFnLmNoaWxkcmVuW2luZGV4XS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZT10aGlzLnNwcml0ZUZyYW1lWzBdXHJcbiAgICAgICAgICAgICAgICB0aGlzLkNoYXB0ZXIuY2hpbGRyZW5baW5kZXhdLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNldE1hdGVyaWFsKDAsIGNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbChcIjJkLXNwcml0ZVwiKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy50eHQuY2hpbGRyZW5baW5kZXhdLmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnNldE1hdGVyaWFsKDAsIGNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbChcIjJkLXNwcml0ZVwiKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkZyYW1lLmNoaWxkcmVuW2luZGV4XS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1zcHJpdGVcIikpO1xyXG4gICAgICAgICAgICAgICAgaWYoKGluZGV4KzEpPT1DaGFwdGVyKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLk1hcF9Td29yZC5zZXRQb3NpdGlvbih0aGlzLkZsYWcuY2hpbGRyZW5baW5kZXhdLmdldFBvc2l0aW9uKCkueCx0aGlzLkZsYWcuY2hpbGRyZW5baW5kZXhdLmdldFBvc2l0aW9uKCkueSs2MCwwKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMudHh0LmNoaWxkcmVuW2luZGV4XS5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zZXRSZXBsYWNlVmFsdWUoJ34nLChpbmRleCsxKSArICcnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gdGhpcy5TY3JvbGxWaWV3LmdldENvbXBvbmVudChjYy5TY3JvbGxWaWV3KS5zY3JvbGxUb0JvdHRvbSgyKVxyXG4gICAgfVxyXG4gICAgb25CdG5fQ2xvc2UoKXtcclxuICAgICAgICBNYXBNYW5hZ2VyLmdldEluc3RhbmNlKCkuaW5zdGFudGlhdGVsZXZlbG5vZGUoKTtcclxuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlPWZhbHNlXHJcbiAgICB9XHJcbiAgICBvbkJ0bl9DaGFwdGVyKGxldmVsKXtcclxuICAgICAgICB0aGlzLkNoYXB0ZXJQb3AuZ2V0Q29tcG9uZW50KENoYXB0ZXJQb3ApLnBhcmVudD10aGlzLm5vZGVcclxuICAgICAgICB0aGlzLkNoYXB0ZXJQb3AuZ2V0Q29tcG9uZW50KENoYXB0ZXJQb3ApLmxldmVsPU51bWJlcihsZXZlbClcclxuICAgICAgICB0aGlzLkNoYXB0ZXJQb3AuYWN0aXZlPXRydWVcclxuICAgIH1cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XHJcbn1cclxuIl19