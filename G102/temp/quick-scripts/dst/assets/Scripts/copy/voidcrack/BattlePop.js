
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/copy/voidcrack/BattlePop.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '2d392/FYJFNXImqGUH8zR8g', 'BattlePop');
// Scripts/copy/voidcrack/BattlePop.ts

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
var Constants_1 = require("../../Constants");
var GameManager_1 = require("../../GameManager");
var MazeManager_1 = require("../../Maze/MazeManager");
var MonsterConfigure_1 = require("../../Monster/Data/MonsterConfigure");
var TextLanguage_1 = require("../../multiLanguage/TextLanguage");
var PropManager_1 = require("../../Prop/PropManager");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var Times_1 = require("../../Turntable/Times");
var ToPlayMainUi_1 = require("../../UI/home/ToPlayMainUi");
var UIComponent_1 = require("../../UI/UIComponent");
var UIConfig_1 = require("../../UI/UIConfig");
var UIManager_1 = require("../../UI/UIManager");
var RogueHexagonTypes_1 = require("./RogueHexagonTypes");
var VoidScene_1 = require("./VoidScene");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BattlePop = /** @class */ (function (_super) {
    __extends(BattlePop, _super);
    function BattlePop() {
        // @property(cc.Label)
        // label: cc.Label = null;
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // @property
        // text: string = 'hello';
        // LIFE-CYCLE CALLBACKS:
        // onLoad () {}
        _this.type = 0; //打的那个的id
        _this.mynode = null; //选择格子的界面
        _this.index = 0; //行数
        _this.myindex = 0; //位置
        _this.item = [];
        _this.heroitem = null; //怪物item
        _this.content = null; //怪物item父节点
        _this.loy = null; //怪物item父节点  为了小于5个的时候居中|
        _this.MStat_Frame = []; //标签框
        //资源-图集
        _this.icon_atlas = null;
        _this.Maze_IconSprite = []; //头像
        _this.Maze_Icon = null; //头像。
        _this.bttxt = null; //标题文字
        return _this;
        // update (dt) {}
    }
    // mytype:number=0//层数
    BattlePop.prototype.initUi = function (type, mynode, index, myindex) {
        this.type = type; //id
        this.mynode = mynode; //格子界面
        this.index = index; //行数
        this.myindex = myindex; //位置
        // this.mytype=mytype//层数
        var xagonType = RogueHexagonTypes_1.RogueHexagonTypesManager.getInstance().getHexagonType(this.type);
        if (xagonType == 1) {
            this.bttxt.getComponent(TextLanguage_1.default).setTextId(830002);
            this.Maze_Icon.getComponent(cc.Sprite).spriteFrame = this.Maze_IconSprite[0];
        }
        if (xagonType == 3) {
            this.bttxt.getComponent(TextLanguage_1.default).setTextId(830003);
            this.Maze_Icon.getComponent(cc.Sprite).spriteFrame = this.Maze_IconSprite[1];
        }
        if (xagonType == 5) {
            this.bttxt.getComponent(TextLanguage_1.default).setTextId(830004);
            this.Maze_Icon.getComponent(cc.Sprite).spriteFrame = this.Maze_IconSprite[2];
        }
        var Prop1_ID = RogueHexagonTypes_1.RogueHexagonTypesManager.getInstance().getRogueProp1_ID(this.type);
        var Prop1_Sum = RogueHexagonTypes_1.RogueHexagonTypesManager.getInstance().getRogueProp1_Sum(this.type);
        var ietm1 = PropManager_1.PropManager.getInstance().createPropItem(Prop1_ID, Prop1_Sum);
        ietm1.scale = 0.9;
        ietm1.parent = this.item[0];
        var Prop2_ID = RogueHexagonTypes_1.RogueHexagonTypesManager.getInstance().getRogueProp2_ID(this.type);
        var ietm2 = PropManager_1.PropManager.getInstance().createPropItem(Prop2_ID, 1);
        ietm2.scale = 0.9;
        ietm2.parent = this.item[1];
        var fightingInfo = null;
        Times_1.default.voidsensid = this.type;
        fightingInfo = MazeManager_1.MazeManager.getInstance().getFightingInfo(type);
        var list = fightingInfo.getOnlyMonsterDataList();
        var bossarr = [];
        var jyarr = [];
        var put = [];
        for (var bossindex = 0; bossindex < list.length; bossindex++) {
            if (MonsterConfigure_1.MonsterConfigureManager.getInstance().getStrengthType(list[bossindex].id) == 3) {
                bossarr.push(list[bossindex]);
            }
            if (MonsterConfigure_1.MonsterConfigureManager.getInstance().getStrengthType(list[bossindex].id) == 2) {
                jyarr.push(list[bossindex]);
            }
            if (MonsterConfigure_1.MonsterConfigureManager.getInstance().getStrengthType(list[bossindex].id) == 1) {
                put.push(list[bossindex]);
            }
        }
        //插入
        var MonsterDetailsarr = [];
        MonsterDetailsarr.splice.apply(MonsterDetailsarr, [MonsterDetailsarr.length, 0].concat(bossarr));
        MonsterDetailsarr.splice.apply(MonsterDetailsarr, [MonsterDetailsarr.length, 0].concat(jyarr));
        MonsterDetailsarr.splice.apply(MonsterDetailsarr, [MonsterDetailsarr.length, 0].concat(put));
        //怪物刷新
        //let elementid=RogueLevelManager.getInstance().getMonsterGroupConfigure(type)//这个位置所有的怪物
        this.loy.getComponent(cc.Layout).resizeMode = cc.Layout.ResizeMode.CONTAINER;
        // this.loy.width=10
        // this.content.width=10
        var monmanger = MonsterConfigure_1.MonsterConfigureManager.getInstance();
        for (var index_1 = 0; index_1 < MonsterDetailsarr.length; index_1++) {
            var hero = cc.instantiate(this.heroitem);
            var qiangdu = monmanger.getStrengthType(MonsterDetailsarr[index_1].id) - 1;
            hero.getChildByName("frame_kuang").getComponent(cc.Sprite).spriteFrame = this.MStat_Frame[qiangdu];
            hero.getChildByName("Item_mask").getChildByName("Item_icon").getComponent(cc.Sprite).spriteFrame = this.icon_atlas.getSpriteFrame("Avatar_Monster_" + MonsterDetailsarr[index_1].id);
            hero.active = true;
            hero.parent = this.content;
            this.content.width = (index_1 + 1) * 106;
        }
        this.scheduleOnce(function () {
            // console.log("++++++++",this.loy.width)
            if (this.loy.width > 488) {
                this.loy.getComponent(cc.Layout).resizeMode = cc.Layout.ResizeMode.NONE;
                this.loy.width = 488;
                this.content.x = -244;
                // console.log("++++++",this.loy)
            }
            else {
                this.content.x = -(this.loy.width / 2);
            }
        }, 0.05);
    };
    BattlePop.prototype.clickBtnShow = function () {
        var _this = this;
        // let type=RogueHexagonTypesManager.getInstance().getLayers(this.type)
        // this.mynode.getComponent(VoidScene).initUi(type,this.index,this.myindex)
        // return
        // this.mynode.getComponent(VoidScene).Rowsnumber=this.index//行数
        // this.mynode.getComponent(VoidScene).Positionnumber=this.myindex//位置数
        // this.mynode.getComponent(VoidScene).Refresh()
        // return
        // this.type=type//层数
        this.clickBtnClose();
        this.mynode.getComponent(VoidScene_1.default).onClose();
        // this.type=type
        GameManager_1.default.getInstance().cur_game_mode = Constants_1.GameMode.Maze;
        UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.ToPlay, UIConfig_1.UILayerLevel.One, { onCompleted: function (uiNode) {
                uiNode.getComponent(ToPlayMainUi_1.default).Mazeid = _this.type;
                uiNode.getComponent(ToPlayMainUi_1.default).init({ onClose: function () {
                    } });
            }, });
        // this.mynode.getComponent(VoidScene).Rowsnumber=this.index//行数
        // this.mynode.getComponent(VoidScene).Positionnumber=this.myindex//位置数
        // this.mynode.getComponent(VoidScene).Refresh()
        // console.log("____________",this.mytype,this.index,this.myindex)
        // this.mynode.getComponent(VoidScene).initUi(this.mytype,this.index,this.myindex)
    };
    BattlePop.prototype.clickBtnClose = function () {
        this.content.removeAllChildren();
        this.content.width = 0;
        this.item[0].children[0].destroy();
        this.item[1].children[0].destroy();
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.onClose();
    };
    __decorate([
        property(cc.Node)
    ], BattlePop.prototype, "item", void 0);
    __decorate([
        property(cc.Node)
    ], BattlePop.prototype, "heroitem", void 0);
    __decorate([
        property(cc.Node)
    ], BattlePop.prototype, "content", void 0);
    __decorate([
        property(cc.Node)
    ], BattlePop.prototype, "loy", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], BattlePop.prototype, "MStat_Frame", void 0);
    __decorate([
        property(cc.SpriteAtlas)
    ], BattlePop.prototype, "icon_atlas", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], BattlePop.prototype, "Maze_IconSprite", void 0);
    __decorate([
        property(cc.Node)
    ], BattlePop.prototype, "Maze_Icon", void 0);
    __decorate([
        property(cc.Node)
    ], BattlePop.prototype, "bttxt", void 0);
    BattlePop = __decorate([
        ccclass
    ], BattlePop);
    return BattlePop;
}(UIComponent_1.default));
exports.default = BattlePop;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcY29weVxcdm9pZGNyYWNrXFxCYXR0bGVQb3AudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQix3RUFBd0U7QUFDeEUsbUJBQW1CO0FBQ25CLGtGQUFrRjtBQUNsRiw4QkFBOEI7QUFDOUIsa0ZBQWtGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFbEYsNkNBQXlEO0FBQ3pELGlEQUE0QztBQUc1QyxzREFBcUQ7QUFDckQsd0VBQThFO0FBQzlFLGlFQUE0RDtBQUM1RCxzREFBcUQ7QUFDckQsNkRBQXdEO0FBQ3hELCtDQUEwQztBQUMxQywyREFBc0Q7QUFDdEQsb0RBQStDO0FBQy9DLDhDQUF5RDtBQUN6RCxnREFBK0M7QUFDL0MseURBQStEO0FBRS9ELHlDQUFvQztBQUU5QixJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUF1Qyw2QkFBVztJQUFsRDtRQUVJLHNCQUFzQjtRQUN0QiwwQkFBMEI7UUFIOUIscUVBb0tDO1FBL0pHLFlBQVk7UUFDWiwwQkFBMEI7UUFFMUIsd0JBQXdCO1FBRXhCLGVBQWU7UUFDZixVQUFJLEdBQVEsQ0FBQyxDQUFBLENBQUEsU0FBUztRQUN0QixZQUFNLEdBQVMsSUFBSSxDQUFBLENBQUEsU0FBUztRQUM1QixXQUFLLEdBQVEsQ0FBQyxDQUFBLENBQUEsSUFBSTtRQUNsQixhQUFPLEdBQVEsQ0FBQyxDQUFBLENBQUEsSUFBSTtRQUdwQixVQUFJLEdBQWEsRUFBRSxDQUFDO1FBRXBCLGNBQVEsR0FBVyxJQUFJLENBQUMsQ0FBQSxRQUFRO1FBRWhDLGFBQU8sR0FBVyxJQUFJLENBQUMsQ0FBQSxXQUFXO1FBRWxDLFNBQUcsR0FBVyxJQUFJLENBQUMsQ0FBQSx5QkFBeUI7UUFJNUMsaUJBQVcsR0FBa0IsRUFBRSxDQUFBLENBQUEsS0FBSztRQUVwQyxPQUFPO1FB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YUFBYSxDQUFDLFNBQVMsQ0FBQywyQkFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BFLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUVuQixDQUFDO0lBaEpEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7MkNBQ0U7SUFFcEI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzsrQ0FDTTtJQUV4QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzhDQUNLO0lBRXZCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7MENBQ0M7SUFJbkI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQztrREFDTTtJQUkvQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDO2lEQUNNO0lBRy9CO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7c0RBQ1c7SUFFcEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztnREFDTztJQUV6QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzRDQUNHO0lBdENKLFNBQVM7UUFEN0IsT0FBTztPQUNhLFNBQVMsQ0FvSzdCO0lBQUQsZ0JBQUM7Q0FwS0QsQUFvS0MsQ0FwS3NDLHFCQUFXLEdBb0tqRDtrQkFwS29CLFNBQVMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcblxyXG5pbXBvcnQgeyBGaWdodGluZ0luZm8sIEdhbWVNb2RlIH0gZnJvbSBcIi4uLy4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uLy4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCBNYXBNYW5hZ2VyIGZyb20gXCIuLi8uLi9HdWFKaS9NYXBNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IExldmVsTWFuYWdlciB9IGZyb20gXCIuLi8uLi9MZXZlbC9MZXZlbE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgTWF6ZU1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vTWF6ZS9NYXplTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBNb25zdGVyQ29uZmlndXJlTWFuYWdlciB9IGZyb20gXCIuLi8uLi9Nb25zdGVyL0RhdGEvTW9uc3RlckNvbmZpZ3VyZVwiO1xyXG5pbXBvcnQgVGV4dExhbmd1YWdlIGZyb20gXCIuLi8uLi9tdWx0aUxhbmd1YWdlL1RleHRMYW5ndWFnZVwiO1xyXG5pbXBvcnQgeyBQcm9wTWFuYWdlciB9IGZyb20gXCIuLi8uLi9Qcm9wL1Byb3BNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFNvdW5kSW5kZXggfSBmcm9tIFwiLi4vLi4vU291bmQvQXVkaW9Db25zdGFudHNcIjtcclxuaW1wb3J0IFRpbWVzIGZyb20gXCIuLi8uLi9UdXJudGFibGUvVGltZXNcIjtcclxuaW1wb3J0IFRvUGxheU1haW5VaSBmcm9tIFwiLi4vLi4vVUkvaG9tZS9Ub1BsYXlNYWluVWlcIjtcclxuaW1wb3J0IFVJQ29tcG9uZW50IGZyb20gXCIuLi8uLi9VSS9VSUNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBVSVBhdGgsIFVJTGF5ZXJMZXZlbCB9IGZyb20gXCIuLi8uLi9VSS9VSUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBVSU1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vVUkvVUlNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFJvZ3VlSGV4YWdvblR5cGVzTWFuYWdlciB9IGZyb20gXCIuL1JvZ3VlSGV4YWdvblR5cGVzXCI7XHJcbmltcG9ydCB7IFJvZ3VlTGV2ZWxNYW5hZ2VyIH0gZnJvbSBcIi4vUm9ndWVMZXZlbFwiO1xyXG5pbXBvcnQgVm9pZFNjZW5lIGZyb20gXCIuL1ZvaWRTY2VuZVwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYXR0bGVQb3AgZXh0ZW5kcyBVSUNvbXBvbmVudCB7XHJcblxyXG4gICAgLy8gQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgLy8gbGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICAvLyBAcHJvcGVydHlcclxuICAgIC8vIHRleHQ6IHN0cmluZyA9ICdoZWxsbyc7XHJcblxyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcblxyXG4gICAgLy8gb25Mb2FkICgpIHt9XHJcbiAgICB0eXBlOm51bWJlcj0wLy/miZPnmoTpgqPkuKrnmoRpZFxyXG4gICAgbXlub2RlOmNjLk5vZGU9bnVsbC8v6YCJ5oup5qC85a2Q55qE55WM6Z2iXHJcbiAgICBpbmRleDpudW1iZXI9MC8v6KGM5pWwXHJcbiAgICBteWluZGV4Om51bWJlcj0wLy/kvY3nva5cclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGl0ZW06IGNjLk5vZGVbXSA9W107XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGhlcm9pdGVtOiBjYy5Ob2RlID1udWxsOy8v5oCq54mpaXRlbVxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBjb250ZW50OiBjYy5Ob2RlID1udWxsOy8v5oCq54mpaXRlbeeItuiKgueCuVxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBsb3k6IGNjLk5vZGUgPW51bGw7Ly/mgKrnialpdGVt54i26IqC54K5ICDkuLrkuoblsI/kuo415Liq55qE5pe25YCZ5bGF5LitfFxyXG4gICAgXHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZUZyYW1lKVxyXG4gICAgTVN0YXRfRnJhbWU6Y2MuU3ByaXRlRnJhbWVbXT1bXS8v5qCH562+5qGGXHJcblxyXG4gICAgLy/otYTmupAt5Zu+6ZuGXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlQXRsYXMpXHJcbiAgICBpY29uX2F0bGFzOmNjLlNwcml0ZUF0bGFzPW51bGw7XHJcbiAgICBcclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGVGcmFtZSlcclxuICAgIE1hemVfSWNvblNwcml0ZTpjYy5TcHJpdGVGcmFtZVtdPVtdOy8v5aS05YOPXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIE1hemVfSWNvbjogY2MuTm9kZSA9bnVsbDsvL+WktOWDj+OAglxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBidHR4dDogY2MuTm9kZSA9bnVsbDsvL+agh+mimOaWh+Wtl1xyXG4gICAgLy8gbXl0eXBlOm51bWJlcj0wLy/lsYLmlbBcclxuICAgIGluaXRVaSh0eXBlLG15bm9kZSxpbmRleCxteWluZGV4KSB7Ly/miJjlvbkgIOaYr+WTquS4quS9jee9rueahOWlluWKsSAgIOagvOWtkOiKgueCuSAgLy/ooYzmlbAgICDkvY3nva4gICDlsYLmlbBcclxuICAgICAgICB0aGlzLnR5cGU9dHlwZS8vaWRcclxuICAgICAgICB0aGlzLm15bm9kZT1teW5vZGUvL+agvOWtkOeVjOmdolxyXG4gICAgICAgIHRoaXMuaW5kZXg9aW5kZXgvL+ihjOaVsFxyXG4gICAgICAgIHRoaXMubXlpbmRleD1teWluZGV4Ly/kvY3nva5cclxuICAgICAgICAvLyB0aGlzLm15dHlwZT1teXR5cGUvL+WxguaVsFxyXG5cclxuICAgICAgICBsZXQgeGFnb25UeXBlPSBSb2d1ZUhleGFnb25UeXBlc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXhhZ29uVHlwZSh0aGlzLnR5cGUpXHJcbiAgICAgICAgaWYoeGFnb25UeXBlPT0xKXtcclxuICAgICAgICAgICAgdGhpcy5idHR4dC5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zZXRUZXh0SWQoODMwMDAyKVxyXG4gICAgICAgICAgICB0aGlzLk1hemVfSWNvbi5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZT10aGlzLk1hemVfSWNvblNwcml0ZVswXVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZih4YWdvblR5cGU9PTMpe1xyXG4gICAgICAgICAgICB0aGlzLmJ0dHh0LmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnNldFRleHRJZCg4MzAwMDMpXHJcbiAgICAgICAgICAgIHRoaXMuTWF6ZV9JY29uLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lPXRoaXMuTWF6ZV9JY29uU3ByaXRlWzFdXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHhhZ29uVHlwZT09NSl7XHJcbiAgICAgICAgICAgIHRoaXMuYnR0eHQuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0VGV4dElkKDgzMDAwNClcclxuICAgICAgICAgICAgdGhpcy5NYXplX0ljb24uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWU9dGhpcy5NYXplX0ljb25TcHJpdGVbMl1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IFByb3AxX0lEPVJvZ3VlSGV4YWdvblR5cGVzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFJvZ3VlUHJvcDFfSUQodGhpcy50eXBlKVxyXG4gICAgICAgIGxldCBQcm9wMV9TdW09Um9ndWVIZXhhZ29uVHlwZXNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Um9ndWVQcm9wMV9TdW0odGhpcy50eXBlKVxyXG4gICAgICAgIGxldCBpZXRtMT1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKFByb3AxX0lELFByb3AxX1N1bSk7XHJcbiAgICAgICAgaWV0bTEuc2NhbGU9MC45XHJcbiAgICAgICAgaWV0bTEucGFyZW50PXRoaXMuaXRlbVswXVxyXG4gICAgICAgIGxldCBQcm9wMl9JRD1Sb2d1ZUhleGFnb25UeXBlc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRSb2d1ZVByb3AyX0lEKHRoaXMudHlwZSlcclxuXHJcbiAgICAgICAgbGV0IGlldG0yPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oUHJvcDJfSUQsMSk7XHJcbiAgICAgICAgaWV0bTIuc2NhbGU9MC45XHJcbiAgICAgICAgaWV0bTIucGFyZW50PXRoaXMuaXRlbVsxXVxyXG5cclxuICAgICAgICBsZXQgZmlnaHRpbmdJbmZvOkZpZ2h0aW5nSW5mbz1udWxsO1xyXG4gICAgICAgIFRpbWVzLnZvaWRzZW5zaWQ9dGhpcy50eXBlXHJcbiAgICAgICAgZmlnaHRpbmdJbmZvPU1hemVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RmlnaHRpbmdJbmZvKHR5cGUpO1xyXG4gICAgICAgIGxldCBsaXN0PWZpZ2h0aW5nSW5mby5nZXRPbmx5TW9uc3RlckRhdGFMaXN0KCk7XHJcblxyXG4gICAgICAgIGxldCBib3NzYXJyPVtdXHJcbiAgICAgICAgbGV0IGp5YXJyPVtdXHJcbiAgICAgICAgbGV0IHB1dD1bXVxyXG4gICAgICAgIGZvciAobGV0IGJvc3NpbmRleCA9IDA7IGJvc3NpbmRleCA8IGxpc3QubGVuZ3RoOyBib3NzaW5kZXgrKykge1xyXG4gICAgICAgICAgICBpZihNb25zdGVyQ29uZmlndXJlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0cmVuZ3RoVHlwZShsaXN0W2Jvc3NpbmRleF0uaWQpPT0zKXtcclxuICAgICAgICAgICAgICAgIGJvc3NhcnIucHVzaChsaXN0W2Jvc3NpbmRleF0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoTW9uc3RlckNvbmZpZ3VyZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJlbmd0aFR5cGUobGlzdFtib3NzaW5kZXhdLmlkKT09Mil7XHJcbiAgICAgICAgICAgICAgICBqeWFyci5wdXNoKGxpc3RbYm9zc2luZGV4XSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihNb25zdGVyQ29uZmlndXJlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0cmVuZ3RoVHlwZShsaXN0W2Jvc3NpbmRleF0uaWQpPT0xKXtcclxuICAgICAgICAgICAgICAgIHB1dC5wdXNoKGxpc3RbYm9zc2luZGV4XSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL+aPkuWFpVxyXG4gICAgICAgIGxldCBNb25zdGVyRGV0YWlsc2Fycj1bXVxyXG4gICAgICAgIE1vbnN0ZXJEZXRhaWxzYXJyLnNwbGljZS5hcHBseShNb25zdGVyRGV0YWlsc2FycixbTW9uc3RlckRldGFpbHNhcnIubGVuZ3RoLDBdLmNvbmNhdChib3NzYXJyKSk7XHJcbiAgICAgICAgTW9uc3RlckRldGFpbHNhcnIuc3BsaWNlLmFwcGx5KE1vbnN0ZXJEZXRhaWxzYXJyLFtNb25zdGVyRGV0YWlsc2Fyci5sZW5ndGgsMF0uY29uY2F0KGp5YXJyKSk7XHJcbiAgICAgICAgTW9uc3RlckRldGFpbHNhcnIuc3BsaWNlLmFwcGx5KE1vbnN0ZXJEZXRhaWxzYXJyLFtNb25zdGVyRGV0YWlsc2Fyci5sZW5ndGgsMF0uY29uY2F0KHB1dCkpO1xyXG4gICAgICAgIC8v5oCq54mp5Yi35pawXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9sZXQgZWxlbWVudGlkPVJvZ3VlTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TW9uc3Rlckdyb3VwQ29uZmlndXJlKHR5cGUpLy/ov5nkuKrkvY3nva7miYDmnInnmoTmgKrnialcclxuICAgICAgICB0aGlzLmxveS5nZXRDb21wb25lbnQoY2MuTGF5b3V0KS5yZXNpemVNb2RlPWNjLkxheW91dC5SZXNpemVNb2RlLkNPTlRBSU5FUlxyXG4gICAgICAgIC8vIHRoaXMubG95LndpZHRoPTEwXHJcbiAgICAgICAgLy8gdGhpcy5jb250ZW50LndpZHRoPTEwXHJcbiAgICAgICAgbGV0IG1vbm1hbmdlcj1Nb25zdGVyQ29uZmlndXJlTWFuYWdlci5nZXRJbnN0YW5jZSgpXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IE1vbnN0ZXJEZXRhaWxzYXJyLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBsZXQgaGVybz1jYy5pbnN0YW50aWF0ZSh0aGlzLmhlcm9pdGVtKVxyXG4gICAgICAgICAgICBsZXQgcWlhbmdkdT1tb25tYW5nZXIuZ2V0U3RyZW5ndGhUeXBlKE1vbnN0ZXJEZXRhaWxzYXJyW2luZGV4XS5pZCktMVxyXG4gICAgICAgICAgICBoZXJvLmdldENoaWxkQnlOYW1lKFwiZnJhbWVfa3VhbmdcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWU9dGhpcy5NU3RhdF9GcmFtZVtxaWFuZ2R1XVxyXG4gICAgICAgICAgICBoZXJvLmdldENoaWxkQnlOYW1lKFwiSXRlbV9tYXNrXCIpLmdldENoaWxkQnlOYW1lKFwiSXRlbV9pY29uXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lPXRoaXMuaWNvbl9hdGxhcy5nZXRTcHJpdGVGcmFtZShcIkF2YXRhcl9Nb25zdGVyX1wiK01vbnN0ZXJEZXRhaWxzYXJyW2luZGV4XS5pZCk7XHJcbiAgICAgICAgICAgIGhlcm8uYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgaGVyby5wYXJlbnQ9dGhpcy5jb250ZW50XHJcbiAgICAgICAgICAgIHRoaXMuY29udGVudC53aWR0aD0oaW5kZXgrMSkqMTA2XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiKysrKysrKytcIix0aGlzLmxveS53aWR0aClcclxuICAgICAgICAgICAgaWYodGhpcy5sb3kud2lkdGg+NDg4KXtcclxuICAgICAgICAgICAgICAgIHRoaXMubG95LmdldENvbXBvbmVudChjYy5MYXlvdXQpLnJlc2l6ZU1vZGU9Y2MuTGF5b3V0LlJlc2l6ZU1vZGUuTk9ORVxyXG4gICAgICAgICAgICAgICAgdGhpcy5sb3kud2lkdGg9NDg4XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQueD0tMjQ0XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIisrKysrK1wiLHRoaXMubG95KVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC54PS0odGhpcy5sb3kud2lkdGgvMilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sMC4wNSlcclxuXHJcbiAgICB9XHJcbiAgICBjbGlja0J0blNob3coKXsvL+ehruiupOaMiemSrlxyXG4gICAgICAgIC8vIGxldCB0eXBlPVJvZ3VlSGV4YWdvblR5cGVzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldExheWVycyh0aGlzLnR5cGUpXHJcbiAgICAgICAgLy8gdGhpcy5teW5vZGUuZ2V0Q29tcG9uZW50KFZvaWRTY2VuZSkuaW5pdFVpKHR5cGUsdGhpcy5pbmRleCx0aGlzLm15aW5kZXgpXHJcbiAgICAgICAgLy8gcmV0dXJuXHJcbiAgICAgICAgLy8gdGhpcy5teW5vZGUuZ2V0Q29tcG9uZW50KFZvaWRTY2VuZSkuUm93c251bWJlcj10aGlzLmluZGV4Ly/ooYzmlbBcclxuICAgICAgICAvLyB0aGlzLm15bm9kZS5nZXRDb21wb25lbnQoVm9pZFNjZW5lKS5Qb3NpdGlvbm51bWJlcj10aGlzLm15aW5kZXgvL+S9jee9ruaVsFxyXG4gICAgICAgIC8vIHRoaXMubXlub2RlLmdldENvbXBvbmVudChWb2lkU2NlbmUpLlJlZnJlc2goKVxyXG4gICAgICAgIC8vIHJldHVyblxyXG4gICAgICAgIC8vIHRoaXMudHlwZT10eXBlLy/lsYLmlbBcclxuICAgICAgICB0aGlzLmNsaWNrQnRuQ2xvc2UoKTtcclxuICAgICAgICB0aGlzLm15bm9kZS5nZXRDb21wb25lbnQoVm9pZFNjZW5lKS5vbkNsb3NlKClcclxuICAgICAgICAvLyB0aGlzLnR5cGU9dHlwZVxyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZT1HYW1lTW9kZS5NYXplOyAgICAgICBcclxuICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLlRvUGxheSxVSUxheWVyTGV2ZWwuT25lLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+IHtcclxuICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChUb1BsYXlNYWluVWkpLk1hemVpZD10aGlzLnR5cGVcclxuICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChUb1BsYXlNYWluVWkpLmluaXQoe29uQ2xvc2U6KCk9PntcclxuICAgICAgICAgICAgfX0pO1xyXG4gICAgICAgIH0sfSlcclxuICAgICAgICBcclxuICAgICAgICAvLyB0aGlzLm15bm9kZS5nZXRDb21wb25lbnQoVm9pZFNjZW5lKS5Sb3dzbnVtYmVyPXRoaXMuaW5kZXgvL+ihjOaVsFxyXG4gICAgICAgIC8vIHRoaXMubXlub2RlLmdldENvbXBvbmVudChWb2lkU2NlbmUpLlBvc2l0aW9ubnVtYmVyPXRoaXMubXlpbmRleC8v5L2N572u5pWwXHJcbiAgICAgICAgLy8gdGhpcy5teW5vZGUuZ2V0Q29tcG9uZW50KFZvaWRTY2VuZSkuUmVmcmVzaCgpXHJcblxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiX19fX19fX19fX19fXCIsdGhpcy5teXR5cGUsdGhpcy5pbmRleCx0aGlzLm15aW5kZXgpXHJcbiAgICAgICAgLy8gdGhpcy5teW5vZGUuZ2V0Q29tcG9uZW50KFZvaWRTY2VuZSkuaW5pdFVpKHRoaXMubXl0eXBlLHRoaXMuaW5kZXgsdGhpcy5teWluZGV4KVxyXG5cclxuICAgIH1cclxuICAgIGNsaWNrQnRuQ2xvc2UoKS8v5YWz6ZetXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5jb250ZW50LnJlbW92ZUFsbENoaWxkcmVuKClcclxuICAgICAgICB0aGlzLmNvbnRlbnQud2lkdGg9MFxyXG4gICAgICAgIHRoaXMuaXRlbVswXS5jaGlsZHJlblswXS5kZXN0cm95KClcclxuICAgICAgICB0aGlzLml0ZW1bMV0uY2hpbGRyZW5bMF0uZGVzdHJveSgpXHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICB0aGlzLm9uQ2xvc2UoKTtcclxuICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XHJcbn1cclxuIl19