"use strict";
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