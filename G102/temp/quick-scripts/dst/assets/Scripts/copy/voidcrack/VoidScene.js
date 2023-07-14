
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/copy/voidcrack/VoidScene.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd49268UqZRNvo/hFmeByidp', 'VoidScene');
// Scripts/copy/voidcrack/VoidScene.ts

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
var GameManager_1 = require("../../GameManager");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var UIComponent_1 = require("../../UI/UIComponent");
var UIConfig_1 = require("../../UI/UIConfig");
var UIManager_1 = require("../../UI/UIManager");
var endlesschallenges_1 = require("../endlesschallenges/endlesschallenges");
var playinstructions_1 = require("../endlesschallenges/playinstructions");
var Shop_1 = require("../endlesschallenges/Shop");
var BattlePop_1 = require("./BattlePop");
var RogueHexagonTypes_1 = require("./RogueHexagonTypes");
var Windfall_1 = require("./Windfall");
// import playinstructions from "./playinstructions";
// import Shop from "./Shop";
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var VoidScene = /** @class */ (function (_super) {
    __extends(VoidScene, _super);
    function VoidScene() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.cellnode = null; //格子节点
        _this.cell = null; //格子节点的父节点
        _this.Player = null; //人物棋子  跟随移动
        _this.type = 1; //这次打的是哪一层
        /**行数 */
        _this.Rowsnumber = 1; //打到那一行了   默认从第一行开始
        /**位置数 */
        _this.Positionnumber = 2; //选择的是哪个位置   默认从第2个位置开始
        _this.pos = -620; //格子的初始y轴
        _this.jiange = 117; //每个格子的间隔
        _this.cellnodeindex = []; //存储所有的格子
        _this.HexagonType = [];
        _this.HexagonTypeShadow = [];
        _this.Tipspop = null; //提示弹窗、
        return _this;
        // update (dt) {}
    }
    VoidScene.prototype.initUi = function (type, Rowsnumber, Positionnumber) {
        var _this = this;
        this.type = type; //层数
        this.Rowsnumber = Rowsnumber; //行数
        this.Positionnumber = Positionnumber; //位置数
        this.Tipspop.active = false;
        // console.log("------",this.type,this.Rowsnumber,this.Positionnumber)
        var length = this.cellnodeindex.length;
        var _loop_1 = function (index) {
            var cell = cc.instantiate(this_1.cellnode);
            cell.y = this_1.pos + (index * this_1.jiange);
            cell.active = true;
            cell.name = "" + index;
            this_1.cellnodeindex.push(cell);
            cell.parent = this_1.cell;
            var _loop_2 = function (btnindex) {
                // for (let myindex = 0; myindex < cell.children[btnindex].children.length; myindex++) {
                // console.log("_)",index,(btnindex+1))
                cell.children[btnindex].getChildByName("Maze_Bg_1_2").on(cc.Node.EventType.TOUCH_END, (function () {
                    _this.clickBtnGoods(index, (btnindex + 1));
                }), this_1);
            };
            for (var btnindex = 0; btnindex < cell.children.length; btnindex++) {
                _loop_2(btnindex);
            }
        };
        var this_1 = this;
        for (var index = 9; index > length; index--) {
            _loop_1(index);
        }
        // user:
        // 0-起点
        // 1-战斗
        // 2.宝箱
        // 3.治疗
        // 4.租借
        // 5.Boss
        // user:
        // 0-起点
        // 1-战斗
        // 2.宝箱
        // 3.精英战斗
        // 4.租借
        // 5.Boss
        // 6.治疗
        //所有的格子除了阴影，全部东西隐藏
        for (var cellnodeindexindex = 0; cellnodeindexindex < this.cellnodeindex.length; cellnodeindexindex++) {
            for (var index = 0; index < this.cellnodeindex[cellnodeindexindex].children.length; index++) {
                this.cellnodeindex[cellnodeindexindex].children[index].active = false;
                for (var myindex = 0; myindex < this.cellnodeindex[cellnodeindexindex].children[index].children.length; myindex++) {
                    this.cellnodeindex[cellnodeindexindex].children[index].children[myindex].active = false;
                }
            }
        }
        this.Refresh();
    };
    VoidScene.prototype.Refresh = function () {
        var Allid = RogueHexagonTypes_1.RogueHexagonTypesManager.getInstance().getAllLayerId(this.type);
        var _loop_3 = function (allidindex) {
            var id = Allid[allidindex];
            var Rows = RogueHexagonTypes_1.RogueHexagonTypesManager.getInstance().getRows(id); //行数
            var Position = RogueHexagonTypes_1.RogueHexagonTypesManager.getInstance().getPosition(id); //位置
            var HexagonType = RogueHexagonTypes_1.RogueHexagonTypesManager.getInstance().getHexagonType(id); //类型
            var mynode = this_2.cell.getChildByName("" + Rows).children[(Position - 1)];
            mynode.active = true;
            if (Rows == this_2.Rowsnumber && Position == this_2.Positionnumber) { //人物站在的位置上
                mynode.getChildByName("Maze_Bg_1_1").active = false; //格子阴影去掉
                mynode.getChildByName("Maze_Icon_1_1").active = false; //物品阴影去掉
                mynode.getChildByName("Maze_Icon_1").active = false; //物品去掉
                mynode.getChildByName("Maze_Arrow").active = false; //标志去掉
                mynode.getChildByName("Maze_Bg_1_2").active = false; //光去掉
                this_2.scheduleOnce(function () {
                    this.Player.x = mynode.x;
                    this.Player.y = mynode.parent.y + 120;
                }, 0.01);
            }
            else if (Rows == this_2.Rowsnumber) { //  人物那一排
                mynode.getChildByName("Maze_Bg_1_1").active = true; //格子阴影加上
                mynode.getChildByName("Maze_Icon_1_1").active = true; //物品阴影加上
                mynode.getChildByName("Maze_Icon_1").active = true; //物品加上
                mynode.getChildByName("Maze_Arrow").active = false; //标志去掉
                mynode.getChildByName("Maze_Bg_1_2").active = false; //光去掉
            }
            else if (Rows == (this_2.Rowsnumber + 1)) { //人物的前一排   显示物品 显示标志
                //与自己一样的位置是可以被选中的
                // mynode.getChildByName("Maze_Bg_1_1").active=false//阴影去掉
                // mynode.getChildByName("Maze_Icon_1_1").active=false//物品阴影去掉
                // mynode.getChildByName("Maze_Bg_1_2").active=true//光亮起来
                // mynode.getChildByName("Maze_Arrow").active=true//标志亮起来
                // mynode.getChildByName("Maze_Icon_1").active=true//物品加上
                var i = 0; //是否是奇数
                for (var index = 0; index < mynode.parent.children.length; index++) {
                    if (mynode.parent.children[index].active == true) {
                        i++;
                    }
                }
                var mypos = this_2.Positionnumber - Position;
                var j = 0; //是否显示光亮   0:不显示   1:显示
                if (i % 2 == 0 || this_2.Rowsnumber == 1) { //偶数
                    if (mypos >= 0 && Math.abs(mypos) <= 1) {
                        j = 1;
                    }
                }
                else { //奇数
                    if (mypos <= 0 && Math.abs(mypos) <= 1) {
                        j = 1;
                    }
                }
                if (j == 1) {
                    mynode.getChildByName("Maze_Bg_1_1").active = false; //阴影去掉
                    mynode.getChildByName("Maze_Icon_1_1").active = false; //物品阴影去掉
                    mynode.getChildByName("Maze_Bg_1_2").active = true; //光亮起来
                    mynode.getChildByName("Maze_Arrow").active = true; //标志亮起来
                    mynode.getChildByName("Maze_Icon_1").active = true; //物品加上
                }
                else {
                    mynode.getChildByName("Maze_Bg_1_1").active = true; //阴影加上
                    mynode.getChildByName("Maze_Icon_1_1").active = true; //物品阴影加上
                    mynode.getChildByName("Maze_Bg_1_2").active = false; //光去掉
                    mynode.getChildByName("Maze_Arrow").active = false; //标志去掉
                    mynode.getChildByName("Maze_Icon_1").active = true; //物品加上
                }
                // if(this.Positionnumber==Position||((this.Positionnumber==1)&&(this.Positionnumber+1)==Position)
                //     ||((this.Positionnumber==3||this.Positionnumber==2)&&(this.Positionnumber-1)==Position)){
                //     mynode.getChildByName("Maze_Bg_1_1").active=false//阴影去掉
                //     mynode.getChildByName("Maze_Icon_1_1").active=false//物品阴影去掉
                //     mynode.getChildByName("Maze_Bg_1_2").active=true//光亮起来
                //     mynode.getChildByName("Maze_Arrow").active=true//标志亮起来
                //     mynode.getChildByName("Maze_Icon_1").active=true//物品加上
                // }else{
                //     mynode.getChildByName("Maze_Bg_1_1").active=true//阴影加上
                //     mynode.getChildByName("Maze_Icon_1_1").active=true//物品阴影加上
                //     mynode.getChildByName("Maze_Bg_1_2").active=false//光去掉
                //     mynode.getChildByName("Maze_Arrow").active=false//标志去掉
                //     mynode.getChildByName("Maze_Icon_1").active=true//物品加上
                // }
            }
            else if (Rows == (this_2.Rowsnumber + 2)) { //人物的前两排    显示物品  
                mynode.getChildByName("Maze_Bg_1_1").active = true; //阴影加上
                mynode.getChildByName("Maze_Icon_1_1").active = true; //物品阴影加上
                mynode.getChildByName("Maze_Bg_1_2").active = false; //光去掉
                mynode.getChildByName("Maze_Arrow").active = false; //标志去掉
                mynode.getChildByName("Maze_Icon_1").active = true; //物品加上
            }
            else if (Rows > this_2.Rowsnumber) { //人物除了前两排   前面的     不显示物品
                mynode.getChildByName("Maze_Bg_1_1").active = true; //阴影加上
                mynode.getChildByName("Maze_Bg_1_2").active = false; //光去掉
                mynode.getChildByName("Maze_Icon_1").active = false; //物品去掉
                mynode.getChildByName("Maze_Arrow").active = false; //标志去掉
            }
            else if (Rows < this_2.Rowsnumber) { //人物后面的     不显示物品
                mynode.getChildByName("Maze_Bg_1_1").active = true; //阴影加上
                mynode.getChildByName("Maze_Bg_1_2").active = false; //光去掉
                mynode.getChildByName("Maze_Icon_1_1").active = true; //物品阴影加上
                mynode.getChildByName("Maze_Icon_1").active = true; //物品加上
                mynode.getChildByName("Maze_Arrow").active = false; //标志去掉
            }
            mynode.getChildByName("Maze_Icon_1_1").getComponent(cc.Sprite).spriteFrame = this_2.HexagonTypeShadow[HexagonType];
            mynode.getChildByName("Maze_Icon_1").getComponent(cc.Sprite).spriteFrame = this_2.HexagonType[HexagonType];
        };
        var this_2 = this;
        for (var allidindex = 0; allidindex < Allid.length; allidindex++) {
            _loop_3(allidindex);
        }
    };
    VoidScene.prototype.clickBtnGoods = function (index, myindex) {
        var _this = this;
        //完成之后在增加层数
        //层数
        // console.log("__________",index,myindex)
        // console.log("++++++++++",RogueHexagonTypesManager.getId(this.type,index,myindex))
        var id = RogueHexagonTypes_1.RogueHexagonTypesManager.getId(this.type, index, myindex);
        var HexagonType = RogueHexagonTypes_1.RogueHexagonTypesManager.getInstance().getHexagonType(id); //类型
        if (HexagonType == 1) { //战役
            UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.BattlePop, UIConfig_1.UILayerLevel.Two, { onCompleted: function (uiNode) {
                    // console.log("++++++++",this.type,index,myindex)
                    uiNode.getComponent(BattlePop_1.default).init({
                        onClose: function () {
                        }
                    });
                    uiNode.getComponent(BattlePop_1.default).initUi(id, _this.node, index, myindex);
                }, });
        }
        if (HexagonType == 2) { //意外之财
            UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.Windfall, UIConfig_1.UILayerLevel.Two, { onCompleted: function (uiNode) {
                    uiNode.getComponent(Windfall_1.default).init({
                        onClose: function () {
                        }
                    });
                    uiNode.getComponent(Windfall_1.default).initUi(id, _this.node, index, myindex);
                }, });
        }
        if (HexagonType == 5) { //boss战役
            UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.BattlePop, UIConfig_1.UILayerLevel.Two, { onCompleted: function (uiNode) {
                    // console.log("++++++++",this.type,index,myindex)
                    uiNode.getComponent(BattlePop_1.default).init({
                        onClose: function () {
                        }
                    });
                    uiNode.getComponent(BattlePop_1.default).initUi(id, _this.node, index, myindex);
                }, });
        }
        if (HexagonType == 3) { //精英战役
            UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.BattlePop, UIConfig_1.UILayerLevel.Two, { onCompleted: function (uiNode) {
                    // console.log("++++++++",this.type,index,myindex)
                    uiNode.getComponent(BattlePop_1.default).init({
                        onClose: function () {
                        }
                    });
                    uiNode.getComponent(BattlePop_1.default).initUi(id, _this.node, index, myindex);
                }, });
        }
        // this.Rowsnumber=index
        // this.Positionnumber=myindex
        // this.Refresh()
    };
    VoidScene.prototype.clickBtnShop = function () {
        UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.Shop, UIConfig_1.UILayerLevel.Two, { onCompleted: function (uiNode) {
                uiNode.getComponent(Shop_1.default).init({
                    onClose: function () {
                    }
                });
                uiNode.getComponent(Shop_1.default).initUi();
            }, });
    };
    VoidScene.prototype.clickBtnPlayinstructions = function () {
        UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.PlayinsTructions, UIConfig_1.UILayerLevel.Two, { onCompleted: function (uiNode) {
                uiNode.getComponent(playinstructions_1.default).init({
                    onClose: function () {
                    }
                });
                uiNode.getComponent(playinstructions_1.default).initUi(4); //2:无尽挑战   3：boss挑战
            }, });
    };
    VoidScene.prototype.clickBtnClose = function () {
        this.Tipspop.active = false;
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.onClose();
        UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.VndlessChallenges, UIConfig_1.UILayerLevel.One, { onCompleted: function (uiNode) {
                uiNode.getComponent(endlesschallenges_1.default).init({
                    onClose: function () {
                    }
                });
                uiNode.getComponent(endlesschallenges_1.default).initUi(4); //2:无尽挑战   3：boss挑战
            }, });
    };
    VoidScene.prototype.clickBtnTipspop = function () {
        this.Tipspop.active = true;
    };
    VoidScene.prototype.clickBtnTipspopClose = function () {
        this.Tipspop.active = false;
    };
    __decorate([
        property(cc.Node)
    ], VoidScene.prototype, "cellnode", void 0);
    __decorate([
        property(cc.Node)
    ], VoidScene.prototype, "cell", void 0);
    __decorate([
        property(cc.Node)
    ], VoidScene.prototype, "Player", void 0);
    __decorate([
        property(cc.SpriteFrame) //物品的类型
    ], VoidScene.prototype, "HexagonType", void 0);
    __decorate([
        property(cc.SpriteFrame) //物品的类型的阴影
    ], VoidScene.prototype, "HexagonTypeShadow", void 0);
    __decorate([
        property(cc.Node)
    ], VoidScene.prototype, "Tipspop", void 0);
    VoidScene = __decorate([
        ccclass
    ], VoidScene);
    return VoidScene;
}(UIComponent_1.default));
exports.default = VoidScene;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcY29weVxcdm9pZGNyYWNrXFxWb2lkU2NlbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQix3RUFBd0U7QUFDeEUsbUJBQW1CO0FBQ25CLGtGQUFrRjtBQUNsRiw4QkFBOEI7QUFDOUIsa0ZBQWtGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFbEYsaURBQTRDO0FBQzVDLDZEQUF3RDtBQUN4RCxvREFBK0M7QUFDL0MsOENBQXlEO0FBQ3pELGdEQUErQztBQUMvQyw0RUFBdUU7QUFDdkUsMEVBQXFFO0FBQ3JFLGtEQUE2QztBQUM3Qyx5Q0FBb0M7QUFDcEMseURBQStEO0FBQy9ELHVDQUFrQztBQUNsQyxxREFBcUQ7QUFDckQsNkJBQTZCO0FBRXZCLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXVDLDZCQUFXO0lBQWxEO1FBQUEscUVBNlJDO1FBM1JHLGNBQVEsR0FBWSxJQUFJLENBQUMsQ0FBQSxNQUFNO1FBRS9CLFVBQUksR0FBWSxJQUFJLENBQUMsQ0FBQSxVQUFVO1FBRy9CLFlBQU0sR0FBWSxJQUFJLENBQUMsQ0FBQSxZQUFZO1FBRW5DLFVBQUksR0FBUSxDQUFDLENBQUEsQ0FBQSxVQUFVO1FBRXZCLFFBQVE7UUFDUixnQkFBVSxHQUFRLENBQUMsQ0FBQSxDQUFBLG1CQUFtQjtRQUN0QyxTQUFTO1FBQ1Qsb0JBQWMsR0FBUSxDQUFDLENBQUEsQ0FBQSx1QkFBdUI7UUFDOUMsU0FBRyxHQUFRLENBQUMsR0FBRyxDQUFBLENBQUEsU0FBUztRQUN4QixZQUFNLEdBQVEsR0FBRyxDQUFBLENBQUEsU0FBUztRQUUxQixtQkFBYSxHQUFXLEVBQUUsQ0FBQSxDQUFBLFNBQVM7UUFFbkMsaUJBQVcsR0FBa0IsRUFBRSxDQUFBO1FBRS9CLHVCQUFpQixHQUFrQixFQUFFLENBQUE7UUFH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TUFBTSxHQUFDLElBQUksQ0FBQSxDQUFBLE1BQU07Z0JBQ3RELE1BQU0sQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQSxDQUFBLFFBQVE7Z0JBQzFELE1BQU0sQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLENBQUMsTUFBTSxHQUFDLEtBQUssQ0FBQSxDQUFBLEtBQUs7Z0JBQ3RELE1BQU0sQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUMsTUFBTSxHQUFDLEtBQUssQ0FBQSxDQUFBLE1BQU07Z0JBQ3RELE1BQU0sQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQSxDQUFBLE1BQU07YUFDekQ7aUJBQ0ksSUFBRyxJQUFJLEdBQUMsT0FBSyxVQUFVLEVBQUMsRUFBQyx5QkFBeUI7Z0JBQ25ELE1BQU0sQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQSxDQUFBLE1BQU07Z0JBQ3RELE1BQU0sQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLENBQUMsTUFBTSxHQUFDLEtBQUssQ0FBQSxDQUFBLEtBQUs7Z0JBQ3RELE1BQU0sQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLENBQUMsTUFBTSxHQUFDLEtBQUssQ0FBQSxDQUFBLE1BQU07Z0JBQ3ZELE1BQU0sQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUMsTUFBTSxHQUFDLEtBQUssQ0FBQSxDQUFBLE1BQU07YUFDekQ7aUJBQ0ksSUFBRyxJQUFJLEdBQUMsT0FBSyxVQUFVLEVBQUMsRUFBQyxpQkFBaUI7Z0JBQzNDLE1BQU0sQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQSxDQUFBLE1BQU07Z0JBQ3RELE1BQU0sQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLENBQUMsTUFBTSxHQUFDLEtBQUssQ0FBQSxDQUFBLEtBQUs7Z0JBQ3RELE1BQU0sQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLENBQUMs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QU8sQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFBO0lBQzVCLENBQUM7SUFDRCx3Q0FBb0IsR0FBcEI7UUFDSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBQyxLQUFLLENBQUE7SUFDN0IsQ0FBQztJQXZSRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOytDQUNPO0lBRXpCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7MkNBQ0c7SUFHckI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs2Q0FDSztJQWF2QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUEsT0FBTztrREFDRDtJQUUvQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUEsVUFBVTt3REFDRTtJQUdyQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzhDQUNNO0lBekJQLFNBQVM7UUFEN0IsT0FBTztPQUNhLFNBQVMsQ0E2UjdCO0lBQUQsZ0JBQUM7Q0E3UkQsQUE2UkMsQ0E3UnNDLHFCQUFXLEdBNlJqRDtrQkE3Um9CLFNBQVMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcblxyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uLy4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFNvdW5kSW5kZXggfSBmcm9tIFwiLi4vLi4vU291bmQvQXVkaW9Db25zdGFudHNcIjtcclxuaW1wb3J0IFVJQ29tcG9uZW50IGZyb20gXCIuLi8uLi9VSS9VSUNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBVSVBhdGgsIFVJTGF5ZXJMZXZlbCB9IGZyb20gXCIuLi8uLi9VSS9VSUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBVSU1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vVUkvVUlNYW5hZ2VyXCI7XHJcbmltcG9ydCBlbmRsZXNzY2hhbGxlbmdlcyBmcm9tIFwiLi4vZW5kbGVzc2NoYWxsZW5nZXMvZW5kbGVzc2NoYWxsZW5nZXNcIjtcclxuaW1wb3J0IHBsYXlpbnN0cnVjdGlvbnMgZnJvbSBcIi4uL2VuZGxlc3NjaGFsbGVuZ2VzL3BsYXlpbnN0cnVjdGlvbnNcIjtcclxuaW1wb3J0IFNob3AgZnJvbSBcIi4uL2VuZGxlc3NjaGFsbGVuZ2VzL1Nob3BcIjtcclxuaW1wb3J0IEJhdHRsZVBvcCBmcm9tIFwiLi9CYXR0bGVQb3BcIjtcclxuaW1wb3J0IHsgUm9ndWVIZXhhZ29uVHlwZXNNYW5hZ2VyIH0gZnJvbSBcIi4vUm9ndWVIZXhhZ29uVHlwZXNcIjtcclxuaW1wb3J0IFdpbmRmYWxsIGZyb20gXCIuL1dpbmRmYWxsXCI7XHJcbi8vIGltcG9ydCBwbGF5aW5zdHJ1Y3Rpb25zIGZyb20gXCIuL3BsYXlpbnN0cnVjdGlvbnNcIjtcclxuLy8gaW1wb3J0IFNob3AgZnJvbSBcIi4vU2hvcFwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWb2lkU2NlbmUgZXh0ZW5kcyBVSUNvbXBvbmVudCB7XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGNlbGxub2RlOiBjYy5Ob2RlID0gbnVsbDsvL+agvOWtkOiKgueCuVxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBjZWxsOiBjYy5Ob2RlID0gbnVsbDsvL+agvOWtkOiKgueCueeahOeItuiKgueCuVxyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgUGxheWVyOiBjYy5Ob2RlID0gbnVsbDsvL+S6uueJqeaji+WtkCAg6Lef6ZqP56e75YqoXHJcblxyXG4gICAgdHlwZTpudW1iZXI9MS8v6L+Z5qyh5omT55qE5piv5ZOq5LiA5bGCXHJcblxyXG4gICAgLyoq6KGM5pWwICovXHJcbiAgICBSb3dzbnVtYmVyOm51bWJlcj0xLy/miZPliLDpgqPkuIDooYzkuoYgICDpu5jorqTku47nrKzkuIDooYzlvIDlp4tcclxuICAgIC8qKuS9jee9ruaVsCAqL1xyXG4gICAgUG9zaXRpb25udW1iZXI6bnVtYmVyPTIvL+mAieaLqeeahOaYr+WTquS4quS9jee9riAgIOm7mOiupOS7juesrDLkuKrkvY3nva7lvIDlp4tcclxuICAgIHBvczpudW1iZXI9LTYyMC8v5qC85a2Q55qE5Yid5aeLeei9tFxyXG4gICAgamlhbmdlOm51bWJlcj0xMTcvL+avj+S4quagvOWtkOeahOmXtOmalFxyXG5cclxuICAgIGNlbGxub2RlaW5kZXg6Y2MuTm9kZVtdPVtdLy/lrZjlgqjmiYDmnInnmoTmoLzlrZBcclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGVGcmFtZSkvL+eJqeWTgeeahOexu+Wei1xyXG4gICAgSGV4YWdvblR5cGU6Y2MuU3ByaXRlRnJhbWVbXT1bXVxyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZUZyYW1lKS8v54mp5ZOB55qE57G75Z6L55qE6Zi05b2xXHJcbiAgICBIZXhhZ29uVHlwZVNoYWRvdzpjYy5TcHJpdGVGcmFtZVtdPVtdXHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBUaXBzcG9wOiBjYy5Ob2RlID0gbnVsbDsvL+aPkOekuuW8ueeql+OAgVxyXG4gICAgXHJcbiAgICBpbml0VWkodHlwZSxSb3dzbnVtYmVyLFBvc2l0aW9ubnVtYmVyKSB7Ly/omZrnqbroo4LnvJ0gICDlsYLmlbAgICDooYzmlbAgICDkvY3nva7mlbBcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnR5cGU9dHlwZS8v5bGC5pWwXHJcbiAgICAgICAgdGhpcy5Sb3dzbnVtYmVyPVJvd3NudW1iZXIvL+ihjOaVsFxyXG4gICAgICAgIHRoaXMuUG9zaXRpb25udW1iZXI9UG9zaXRpb25udW1iZXIvL+S9jee9ruaVsFxyXG4gICAgICAgIHRoaXMuVGlwc3BvcC5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIi0tLS0tLVwiLHRoaXMudHlwZSx0aGlzLlJvd3NudW1iZXIsdGhpcy5Qb3NpdGlvbm51bWJlcilcclxuICAgICAgICBsZXQgbGVuZ3RoPXRoaXMuY2VsbG5vZGVpbmRleC5sZW5ndGhcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDk7IGluZGV4Pmxlbmd0aDsgaW5kZXgtLSkge1xyXG4gICAgICAgICAgICBsZXQgY2VsbD1jYy5pbnN0YW50aWF0ZSh0aGlzLmNlbGxub2RlKVxyXG4gICAgICAgICAgICBjZWxsLnk9dGhpcy5wb3MrKGluZGV4KnRoaXMuamlhbmdlKVxyXG4gICAgICAgICAgICBjZWxsLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgIGNlbGwubmFtZT1cIlwiK2luZGV4XHJcbiAgICAgICAgICAgIHRoaXMuY2VsbG5vZGVpbmRleC5wdXNoKGNlbGwpXHJcbiAgICAgICAgICAgIGNlbGwucGFyZW50PXRoaXMuY2VsbFxyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgYnRuaW5kZXggPSAwOyBidG5pbmRleCA8IGNlbGwuY2hpbGRyZW4ubGVuZ3RoOyBidG5pbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBmb3IgKGxldCBteWluZGV4ID0gMDsgbXlpbmRleCA8IGNlbGwuY2hpbGRyZW5bYnRuaW5kZXhdLmNoaWxkcmVuLmxlbmd0aDsgbXlpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJfKVwiLGluZGV4LChidG5pbmRleCsxKSlcclxuICAgICAgICAgICAgICAgICAgICBjZWxsLmNoaWxkcmVuW2J0bmluZGV4XS5nZXRDaGlsZEJ5TmFtZShcIk1hemVfQmdfMV8yXCIpLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGlja0J0bkdvb2RzKGluZGV4LChidG5pbmRleCsxKSkgICBcclxuICAgICAgICAgICAgICAgICAgICB9KSx0aGlzKTtcclxuICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gICBcclxuICAgICAgICAvLyB1c2VyOlxyXG4gICAgICAgIC8vIDAt6LW354K5XHJcbiAgICAgICAgLy8gMS3miJjmlpdcclxuICAgICAgICAvLyAyLuWuneeusVxyXG4gICAgICAgIC8vIDMu5rK755aXXHJcbiAgICAgICAgLy8gNC7np5/lgJ9cclxuICAgICAgICAvLyA1LkJvc3NcclxuXHJcbiAgICAgICAgLy8gdXNlcjpcclxuICAgICAgICAvLyAwLei1t+eCuVxyXG4gICAgICAgIC8vIDEt5oiY5paXXHJcbiAgICAgICAgLy8gMi7lrp3nrrFcclxuICAgICAgICAvLyAzLueyvuiLseaImOaWl1xyXG4gICAgICAgIC8vIDQu56ef5YCfXHJcbiAgICAgICAgLy8gNS5Cb3NzXHJcbiAgICAgICAgLy8gNi7msrvnlpdcclxuXHJcbiAgICAgICAgLy/miYDmnInnmoTmoLzlrZDpmaTkuobpmLTlvbHvvIzlhajpg6jkuJzopb/pmpDol49cclxuICAgICAgICBmb3IgKGxldCBjZWxsbm9kZWluZGV4aW5kZXggPSAwOyBjZWxsbm9kZWluZGV4aW5kZXggPCB0aGlzLmNlbGxub2RlaW5kZXgubGVuZ3RoOyBjZWxsbm9kZWluZGV4aW5kZXgrKykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5jZWxsbm9kZWluZGV4W2NlbGxub2RlaW5kZXhpbmRleF0uY2hpbGRyZW4ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNlbGxub2RlaW5kZXhbY2VsbG5vZGVpbmRleGluZGV4XS5jaGlsZHJlbltpbmRleF0uYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBteWluZGV4ID0gMDsgbXlpbmRleCA8IHRoaXMuY2VsbG5vZGVpbmRleFtjZWxsbm9kZWluZGV4aW5kZXhdLmNoaWxkcmVuW2luZGV4XS5jaGlsZHJlbi5sZW5ndGg7IG15aW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2VsbG5vZGVpbmRleFtjZWxsbm9kZWluZGV4aW5kZXhdLmNoaWxkcmVuW2luZGV4XS5jaGlsZHJlbltteWluZGV4XS5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuUmVmcmVzaCgpXHJcbiAgICB9ICAgXHJcbiAgICBSZWZyZXNoKCl7Ly/liLfmlrDmoLzlrZDnmoTnirbmgIFcclxuICAgICAgICBsZXQgQWxsaWQ9Um9ndWVIZXhhZ29uVHlwZXNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0QWxsTGF5ZXJJZCh0aGlzLnR5cGUpXHJcbiAgICAgICAgZm9yIChsZXQgYWxsaWRpbmRleCA9IDA7IGFsbGlkaW5kZXggPCBBbGxpZC5sZW5ndGg7IGFsbGlkaW5kZXgrKykge1xyXG4gICAgICAgICAgICBsZXQgaWQ9QWxsaWRbYWxsaWRpbmRleF1cclxuICAgICAgICAgICAgbGV0IFJvd3M9Um9ndWVIZXhhZ29uVHlwZXNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Um93cyhpZCkvL+ihjOaVsFxyXG4gICAgICAgICAgICBsZXQgUG9zaXRpb249Um9ndWVIZXhhZ29uVHlwZXNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UG9zaXRpb24oaWQpLy/kvY3nva5cclxuICAgICAgICAgICAgbGV0IEhleGFnb25UeXBlPVJvZ3VlSGV4YWdvblR5cGVzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhleGFnb25UeXBlKGlkKS8v57G75Z6LXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgbXlub2RlPXRoaXMuY2VsbC5nZXRDaGlsZEJ5TmFtZShcIlwiK1Jvd3MpLmNoaWxkcmVuWyhQb3NpdGlvbi0xKV1cclxuICAgICAgICAgICAgbXlub2RlLmFjdGl2ZT10cnVlXHJcblxyXG4gICAgICAgICAgICBpZihSb3dzPT10aGlzLlJvd3NudW1iZXImJlBvc2l0aW9uPT10aGlzLlBvc2l0aW9ubnVtYmVyKXsvL+S6uueJqeermeWcqOeahOS9jee9ruS4ilxyXG4gICAgICAgICAgICAgICAgbXlub2RlLmdldENoaWxkQnlOYW1lKFwiTWF6ZV9CZ18xXzFcIikuYWN0aXZlPWZhbHNlLy/moLzlrZDpmLTlvbHljrvmjolcclxuICAgICAgICAgICAgICAgIG15bm9kZS5nZXRDaGlsZEJ5TmFtZShcIk1hemVfSWNvbl8xXzFcIikuYWN0aXZlPWZhbHNlLy/nianlk4HpmLTlvbHljrvmjolcclxuICAgICAgICAgICAgICAgIG15bm9kZS5nZXRDaGlsZEJ5TmFtZShcIk1hemVfSWNvbl8xXCIpLmFjdGl2ZT1mYWxzZS8v54mp5ZOB5Y675o6JXHJcbiAgICAgICAgICAgICAgICBteW5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJNYXplX0Fycm93XCIpLmFjdGl2ZT1mYWxzZS8v5qCH5b+X5Y675o6JXHJcbiAgICAgICAgICAgICAgICBteW5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJNYXplX0JnXzFfMlwiKS5hY3RpdmU9ZmFsc2UvL+WFieWOu+aOiVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlBsYXllci54PW15bm9kZS54XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXIueT1teW5vZGUucGFyZW50LnkrMTIwXHJcbiAgICAgICAgICAgICAgICB9LDAuMDEpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZihSb3dzPT10aGlzLlJvd3NudW1iZXIpey8vICDkurrnianpgqPkuIDmjpJcclxuICAgICAgICAgICAgICAgIG15bm9kZS5nZXRDaGlsZEJ5TmFtZShcIk1hemVfQmdfMV8xXCIpLmFjdGl2ZT10cnVlLy/moLzlrZDpmLTlvbHliqDkuIpcclxuICAgICAgICAgICAgICAgIG15bm9kZS5nZXRDaGlsZEJ5TmFtZShcIk1hemVfSWNvbl8xXzFcIikuYWN0aXZlPXRydWUvL+eJqeWTgemYtOW9seWKoOS4ilxyXG4gICAgICAgICAgICAgICAgbXlub2RlLmdldENoaWxkQnlOYW1lKFwiTWF6ZV9JY29uXzFcIikuYWN0aXZlPXRydWUvL+eJqeWTgeWKoOS4ilxyXG4gICAgICAgICAgICAgICAgbXlub2RlLmdldENoaWxkQnlOYW1lKFwiTWF6ZV9BcnJvd1wiKS5hY3RpdmU9ZmFsc2UvL+agh+W/l+WOu+aOiVxyXG4gICAgICAgICAgICAgICAgbXlub2RlLmdldENoaWxkQnlOYW1lKFwiTWF6ZV9CZ18xXzJcIikuYWN0aXZlPWZhbHNlLy/lhYnljrvmjolcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKFJvd3M9PSh0aGlzLlJvd3NudW1iZXIrMSkpey8v5Lq654mp55qE5YmN5LiA5o6SICAg5pi+56S654mp5ZOBIOaYvuekuuagh+W/l1xyXG4gICAgICAgICAgICAgICAgLy/kuI7oh6rlt7HkuIDmoLfnmoTkvY3nva7mmK/lj6/ku6XooqvpgInkuK3nmoRcclxuICAgICAgICAgICAgICAgIC8vIG15bm9kZS5nZXRDaGlsZEJ5TmFtZShcIk1hemVfQmdfMV8xXCIpLmFjdGl2ZT1mYWxzZS8v6Zi05b2x5Y675o6JXHJcbiAgICAgICAgICAgICAgICAvLyBteW5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJNYXplX0ljb25fMV8xXCIpLmFjdGl2ZT1mYWxzZS8v54mp5ZOB6Zi05b2x5Y675o6JXHJcbiAgICAgICAgICAgICAgICAvLyBteW5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJNYXplX0JnXzFfMlwiKS5hY3RpdmU9dHJ1ZS8v5YWJ5Lqu6LW35p2lXHJcbiAgICAgICAgICAgICAgICAvLyBteW5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJNYXplX0Fycm93XCIpLmFjdGl2ZT10cnVlLy/moIflv5fkuq7otbfmnaVcclxuICAgICAgICAgICAgICAgIC8vIG15bm9kZS5nZXRDaGlsZEJ5TmFtZShcIk1hemVfSWNvbl8xXCIpLmFjdGl2ZT10cnVlLy/nianlk4HliqDkuIpcclxuICAgICAgICAgICAgICAgIGxldCBpPTAvL+aYr+WQpuaYr+Wlh+aVsFxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IG15bm9kZS5wYXJlbnQuY2hpbGRyZW4ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYobXlub2RlLnBhcmVudC5jaGlsZHJlbltpbmRleF0uYWN0aXZlPT10cnVlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaSsrXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IG15cG9zPSB0aGlzLlBvc2l0aW9ubnVtYmVyLVBvc2l0aW9uXHJcbiAgICAgICAgICAgICAgICBsZXQgaj0wLy/mmK/lkKbmmL7npLrlhYnkuq4gICAwOuS4jeaYvuekuiAgIDE65pi+56S6XHJcbiAgICAgICAgICAgICAgICBpZihpJTI9PTB8fHRoaXMuUm93c251bWJlcj09MSl7Ly/lgbbmlbBcclxuICAgICAgICAgICAgICAgICAgICBpZihteXBvcz49MCYmTWF0aC5hYnMobXlwb3MpPD0xKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaj0xXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWVsc2V7Ly/lpYfmlbBcclxuICAgICAgICAgICAgICAgICAgICBpZihteXBvczw9MCYmTWF0aC5hYnMobXlwb3MpPD0xKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaj0xXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYoaj09MSl7XHJcbiAgICAgICAgICAgICAgICAgICAgbXlub2RlLmdldENoaWxkQnlOYW1lKFwiTWF6ZV9CZ18xXzFcIikuYWN0aXZlPWZhbHNlLy/pmLTlvbHljrvmjolcclxuICAgICAgICAgICAgICAgICAgICBteW5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJNYXplX0ljb25fMV8xXCIpLmFjdGl2ZT1mYWxzZS8v54mp5ZOB6Zi05b2x5Y675o6JXHJcbiAgICAgICAgICAgICAgICAgICAgbXlub2RlLmdldENoaWxkQnlOYW1lKFwiTWF6ZV9CZ18xXzJcIikuYWN0aXZlPXRydWUvL+WFieS6rui1t+adpVxyXG4gICAgICAgICAgICAgICAgICAgIG15bm9kZS5nZXRDaGlsZEJ5TmFtZShcIk1hemVfQXJyb3dcIikuYWN0aXZlPXRydWUvL+agh+W/l+S6rui1t+adpVxyXG4gICAgICAgICAgICAgICAgICAgIG15bm9kZS5nZXRDaGlsZEJ5TmFtZShcIk1hemVfSWNvbl8xXCIpLmFjdGl2ZT10cnVlLy/nianlk4HliqDkuIpcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIG15bm9kZS5nZXRDaGlsZEJ5TmFtZShcIk1hemVfQmdfMV8xXCIpLmFjdGl2ZT10cnVlLy/pmLTlvbHliqDkuIpcclxuICAgICAgICAgICAgICAgICAgICBteW5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJNYXplX0ljb25fMV8xXCIpLmFjdGl2ZT10cnVlLy/nianlk4HpmLTlvbHliqDkuIpcclxuICAgICAgICAgICAgICAgICAgICBteW5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJNYXplX0JnXzFfMlwiKS5hY3RpdmU9ZmFsc2UvL+WFieWOu+aOiVxyXG4gICAgICAgICAgICAgICAgICAgIG15bm9kZS5nZXRDaGlsZEJ5TmFtZShcIk1hemVfQXJyb3dcIikuYWN0aXZlPWZhbHNlLy/moIflv5fljrvmjolcclxuICAgICAgICAgICAgICAgICAgICBteW5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJNYXplX0ljb25fMVwiKS5hY3RpdmU9dHJ1ZS8v54mp5ZOB5Yqg5LiKXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBpZih0aGlzLlBvc2l0aW9ubnVtYmVyPT1Qb3NpdGlvbnx8KCh0aGlzLlBvc2l0aW9ubnVtYmVyPT0xKSYmKHRoaXMuUG9zaXRpb25udW1iZXIrMSk9PVBvc2l0aW9uKVxyXG4gICAgICAgICAgICAgICAgLy8gICAgIHx8KCh0aGlzLlBvc2l0aW9ubnVtYmVyPT0zfHx0aGlzLlBvc2l0aW9ubnVtYmVyPT0yKSYmKHRoaXMuUG9zaXRpb25udW1iZXItMSk9PVBvc2l0aW9uKSl7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgbXlub2RlLmdldENoaWxkQnlOYW1lKFwiTWF6ZV9CZ18xXzFcIikuYWN0aXZlPWZhbHNlLy/pmLTlvbHljrvmjolcclxuICAgICAgICAgICAgICAgIC8vICAgICBteW5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJNYXplX0ljb25fMV8xXCIpLmFjdGl2ZT1mYWxzZS8v54mp5ZOB6Zi05b2x5Y675o6JXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgbXlub2RlLmdldENoaWxkQnlOYW1lKFwiTWF6ZV9CZ18xXzJcIikuYWN0aXZlPXRydWUvL+WFieS6rui1t+adpVxyXG4gICAgICAgICAgICAgICAgLy8gICAgIG15bm9kZS5nZXRDaGlsZEJ5TmFtZShcIk1hemVfQXJyb3dcIikuYWN0aXZlPXRydWUvL+agh+W/l+S6rui1t+adpVxyXG4gICAgICAgICAgICAgICAgLy8gICAgIG15bm9kZS5nZXRDaGlsZEJ5TmFtZShcIk1hemVfSWNvbl8xXCIpLmFjdGl2ZT10cnVlLy/nianlk4HliqDkuIpcclxuICAgICAgICAgICAgICAgIC8vIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIG15bm9kZS5nZXRDaGlsZEJ5TmFtZShcIk1hemVfQmdfMV8xXCIpLmFjdGl2ZT10cnVlLy/pmLTlvbHliqDkuIpcclxuICAgICAgICAgICAgICAgIC8vICAgICBteW5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJNYXplX0ljb25fMV8xXCIpLmFjdGl2ZT10cnVlLy/nianlk4HpmLTlvbHliqDkuIpcclxuICAgICAgICAgICAgICAgIC8vICAgICBteW5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJNYXplX0JnXzFfMlwiKS5hY3RpdmU9ZmFsc2UvL+WFieWOu+aOiVxyXG4gICAgICAgICAgICAgICAgLy8gICAgIG15bm9kZS5nZXRDaGlsZEJ5TmFtZShcIk1hemVfQXJyb3dcIikuYWN0aXZlPWZhbHNlLy/moIflv5fljrvmjolcclxuICAgICAgICAgICAgICAgIC8vICAgICBteW5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJNYXplX0ljb25fMVwiKS5hY3RpdmU9dHJ1ZS8v54mp5ZOB5Yqg5LiKXHJcbiAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKFJvd3M9PSh0aGlzLlJvd3NudW1iZXIrMikpey8v5Lq654mp55qE5YmN5Lik5o6SICAgIOaYvuekuueJqeWTgSAgXHJcbiAgICAgICAgICAgICAgICBteW5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJNYXplX0JnXzFfMVwiKS5hY3RpdmU9dHJ1ZS8v6Zi05b2x5Yqg5LiKXHJcbiAgICAgICAgICAgICAgICBteW5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJNYXplX0ljb25fMV8xXCIpLmFjdGl2ZT10cnVlLy/nianlk4HpmLTlvbHliqDkuIpcclxuICAgICAgICAgICAgICAgIG15bm9kZS5nZXRDaGlsZEJ5TmFtZShcIk1hemVfQmdfMV8yXCIpLmFjdGl2ZT1mYWxzZS8v5YWJ5Y675o6JXHJcbiAgICAgICAgICAgICAgICBteW5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJNYXplX0Fycm93XCIpLmFjdGl2ZT1mYWxzZS8v5qCH5b+X5Y675o6JXHJcbiAgICAgICAgICAgICAgICBteW5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJNYXplX0ljb25fMVwiKS5hY3RpdmU9dHJ1ZS8v54mp5ZOB5Yqg5LiKXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZihSb3dzPnRoaXMuUm93c251bWJlcil7Ly/kurrnianpmaTkuobliY3kuKTmjpIgICDliY3pnaLnmoQgICAgIOS4jeaYvuekuueJqeWTgVxyXG4gICAgICAgICAgICAgICAgbXlub2RlLmdldENoaWxkQnlOYW1lKFwiTWF6ZV9CZ18xXzFcIikuYWN0aXZlPXRydWUvL+mYtOW9seWKoOS4ilxyXG4gICAgICAgICAgICAgICAgbXlub2RlLmdldENoaWxkQnlOYW1lKFwiTWF6ZV9CZ18xXzJcIikuYWN0aXZlPWZhbHNlLy/lhYnljrvmjolcclxuICAgICAgICAgICAgICAgIG15bm9kZS5nZXRDaGlsZEJ5TmFtZShcIk1hemVfSWNvbl8xXCIpLmFjdGl2ZT1mYWxzZS8v54mp5ZOB5Y675o6JXHJcbiAgICAgICAgICAgICAgICBteW5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJNYXplX0Fycm93XCIpLmFjdGl2ZT1mYWxzZS8v5qCH5b+X5Y675o6JXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZihSb3dzPHRoaXMuUm93c251bWJlcil7Ly/kurrnianlkI7pnaLnmoQgICAgIOS4jeaYvuekuueJqeWTgVxyXG4gICAgICAgICAgICAgICAgbXlub2RlLmdldENoaWxkQnlOYW1lKFwiTWF6ZV9CZ18xXzFcIikuYWN0aXZlPXRydWUvL+mYtOW9seWKoOS4ilxyXG4gICAgICAgICAgICAgICAgbXlub2RlLmdldENoaWxkQnlOYW1lKFwiTWF6ZV9CZ18xXzJcIikuYWN0aXZlPWZhbHNlLy/lhYnljrvmjolcclxuICAgICAgICAgICAgICAgIG15bm9kZS5nZXRDaGlsZEJ5TmFtZShcIk1hemVfSWNvbl8xXzFcIikuYWN0aXZlPXRydWUvL+eJqeWTgemYtOW9seWKoOS4ilxyXG4gICAgICAgICAgICAgICAgbXlub2RlLmdldENoaWxkQnlOYW1lKFwiTWF6ZV9JY29uXzFcIikuYWN0aXZlPXRydWUvL+eJqeWTgeWKoOS4ilxyXG4gICAgICAgICAgICAgICAgbXlub2RlLmdldENoaWxkQnlOYW1lKFwiTWF6ZV9BcnJvd1wiKS5hY3RpdmU9ZmFsc2UvL+agh+W/l+WOu+aOiVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG15bm9kZS5nZXRDaGlsZEJ5TmFtZShcIk1hemVfSWNvbl8xXzFcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWU9dGhpcy5IZXhhZ29uVHlwZVNoYWRvd1tIZXhhZ29uVHlwZV1cclxuICAgICAgICAgICAgbXlub2RlLmdldENoaWxkQnlOYW1lKFwiTWF6ZV9JY29uXzFcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWU9dGhpcy5IZXhhZ29uVHlwZVtIZXhhZ29uVHlwZV1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjbGlja0J0bkdvb2RzKGluZGV4LG15aW5kZXgpey8v6KGM5pWwICAg5L2N572uXHJcblxyXG5cclxuICAgICAgICAvL+WujOaIkOS5i+WQjuWcqOWinuWKoOWxguaVsFxyXG4gICAgICAgIC8v5bGC5pWwXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJfX19fX19fX19fXCIsaW5kZXgsbXlpbmRleClcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIisrKysrKysrKytcIixSb2d1ZUhleGFnb25UeXBlc01hbmFnZXIuZ2V0SWQodGhpcy50eXBlLGluZGV4LG15aW5kZXgpKVxyXG4gICAgICAgIGxldCBpZD1Sb2d1ZUhleGFnb25UeXBlc01hbmFnZXIuZ2V0SWQodGhpcy50eXBlLGluZGV4LG15aW5kZXgpXHJcbiAgICAgICAgbGV0IEhleGFnb25UeXBlPVJvZ3VlSGV4YWdvblR5cGVzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhleGFnb25UeXBlKGlkKS8v57G75Z6LXHJcbiAgICAgICAgaWYoSGV4YWdvblR5cGU9PTEpey8v5oiY5b25XHJcblxyXG4gICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLkJhdHRsZVBvcCxVSUxheWVyTGV2ZWwuVHdvLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+IHtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiKysrKysrKytcIix0aGlzLnR5cGUsaW5kZXgsbXlpbmRleClcclxuICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoQmF0dGxlUG9wKS5pbml0KHtcclxuICAgICAgICAgICAgICAgICAgICBvbkNsb3NlOigpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KEJhdHRsZVBvcCkuaW5pdFVpKGlkLHRoaXMubm9kZSxpbmRleCxteWluZGV4KVxyXG4gICAgICAgICAgICB9LH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihIZXhhZ29uVHlwZT09Mil7Ly/mhI/lpJbkuYvotKJcclxuICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5XaW5kZmFsbCxVSUxheWVyTGV2ZWwuVHdvLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+IHtcclxuICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoV2luZGZhbGwpLmluaXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xvc2U6KCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoV2luZGZhbGwpLmluaXRVaShpZCx0aGlzLm5vZGUsaW5kZXgsbXlpbmRleClcclxuICAgICAgICAgICAgfSx9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoSGV4YWdvblR5cGU9PTUpey8vYm9zc+aImOW9uVxyXG4gICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLkJhdHRsZVBvcCxVSUxheWVyTGV2ZWwuVHdvLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+IHtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiKysrKysrKytcIix0aGlzLnR5cGUsaW5kZXgsbXlpbmRleClcclxuICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoQmF0dGxlUG9wKS5pbml0KHtcclxuICAgICAgICAgICAgICAgICAgICBvbkNsb3NlOigpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KEJhdHRsZVBvcCkuaW5pdFVpKGlkLHRoaXMubm9kZSxpbmRleCxteWluZGV4KVxyXG4gICAgICAgICAgICB9LH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihIZXhhZ29uVHlwZT09Myl7Ly/nsr7oi7HmiJjlvblcclxuICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5CYXR0bGVQb3AsVUlMYXllckxldmVsLlR3byx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIisrKysrKysrXCIsdGhpcy50eXBlLGluZGV4LG15aW5kZXgpXHJcbiAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KEJhdHRsZVBvcCkuaW5pdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgb25DbG9zZTooKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChCYXR0bGVQb3ApLmluaXRVaShpZCx0aGlzLm5vZGUsaW5kZXgsbXlpbmRleClcclxuICAgICAgICAgICAgfSx9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gdGhpcy5Sb3dzbnVtYmVyPWluZGV4XHJcbiAgICAgICAgLy8gdGhpcy5Qb3NpdGlvbm51bWJlcj1teWluZGV4XHJcbiAgICAgICAgLy8gdGhpcy5SZWZyZXNoKClcclxuXHJcbiAgICB9XHJcbiAgICBjbGlja0J0blNob3AoKXsvL+iZmuepuuijgue8neWVhuW6l1xyXG4gICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguU2hvcCxVSUxheWVyTGV2ZWwuVHdvLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+IHtcclxuICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChTaG9wKS5pbml0KHtcclxuICAgICAgICAgICAgICAgIG9uQ2xvc2U6KCk9PnsgICBcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoU2hvcCkuaW5pdFVpKClcclxuICAgICAgICB9LH0pO1xyXG4gICAgfVxyXG4gICAgY2xpY2tCdG5QbGF5aW5zdHJ1Y3Rpb25zKCl7Ly/njqnms5Xor7TmmI5cclxuICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLlBsYXlpbnNUcnVjdGlvbnMsVUlMYXllckxldmVsLlR3byx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQocGxheWluc3RydWN0aW9ucykuaW5pdCh7XHJcbiAgICAgICAgICAgICAgICBvbkNsb3NlOigpPT57XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQocGxheWluc3RydWN0aW9ucykuaW5pdFVpKDQpLy8yOuaXoOWwveaMkeaImCAgIDPvvJpib3Nz5oyR5oiYXHJcbiAgICAgICAgfSx9KTtcclxuICAgIH1cclxuICAgIGNsaWNrQnRuQ2xvc2UoKS8v5YWz6ZetXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5UaXBzcG9wLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgdGhpcy5vbkNsb3NlKCk7XHJcbiAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5WbmRsZXNzQ2hhbGxlbmdlcyxVSUxheWVyTGV2ZWwuT25lLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+IHtcclxuICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChlbmRsZXNzY2hhbGxlbmdlcykuaW5pdCh7XHJcbiAgICAgICAgICAgICAgICBvbkNsb3NlOigpPT57XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KGVuZGxlc3NjaGFsbGVuZ2VzKS5pbml0VWkoNCkvLzI65peg5bC95oyR5oiYICAgM++8mmJvc3PmjJHmiJhcclxuICAgICAgICB9LH0pO1xyXG4gICAgfVxyXG4gICAgY2xpY2tCdG5UaXBzcG9wKCl7XHJcbiAgICAgICAgdGhpcy5UaXBzcG9wLmFjdGl2ZT10cnVlXHJcbiAgICB9XHJcbiAgICBjbGlja0J0blRpcHNwb3BDbG9zZSgpe1xyXG4gICAgICAgIHRoaXMuVGlwc3BvcC5hY3RpdmU9ZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XHJcbn1cclxuIl19