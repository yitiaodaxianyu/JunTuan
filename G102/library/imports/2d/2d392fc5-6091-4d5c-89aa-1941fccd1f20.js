"use strict";
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