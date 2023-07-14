"use strict";
cc._RF.push(module, 'cacb8ea+WNGfbxSKQ1/lZeq', 'UserLevelUi');
// Scripts/UI/home/UserLevelUi.ts

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
var Constants_1 = require("../../Constants");
var GameManager_1 = require("../../GameManager");
var FunctionDefinition_1 = require("../../JsonData/FunctionDefinition");
var PlayerLevelUp_1 = require("../../JsonData/PlayerLevelUp");
var LanguageManager_1 = require("../../multiLanguage/LanguageManager");
var PropManager_1 = require("../../Prop/PropManager");
var PropConfig_1 = require("../../Prop/PropConfig");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var MyTool_1 = require("../../Tools/MyTool");
var UserData_1 = require("../../UserData");
var UIComponent_1 = require("../UIComponent");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UserLevelUi = /** @class */ (function (_super) {
    __extends(UserLevelUi, _super);
    function UserLevelUi() {
        // @property(cc.SpriteFrame)
        // sp_kuang:cc.SpriteFrame=null;
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.atlas = null;
        _this.new_level = 1;
        _this.new_exp = 1;
        _this.total_level = 1;
        _this.is_show_compelete = true;
        return _this;
    }
    UserLevelUi.prototype.start = function () {
        this.node.getChildByName('bbg').on(cc.Node.EventType.TOUCH_END, this.destroySelf, this);
        this.staring();
        this.showLevel();
        this.node.zIndex = 2;
    };
    //星星之闪烁
    UserLevelUi.prototype.staring = function () {
        var starRoot = this.node.getChildByName("star_root");
        for (var i = 0; i < starRoot.childrenCount; i++) {
            var node = starRoot.children[i];
            var oldScale = node.scale;
            var newScale = oldScale + Math.random() * 0.5 + 0.2;
            var act = Math.random() + 0.5;
            cc.tween(node).repeatForever(cc.tween().to(act, { scale: newScale }).to(act, { scale: oldScale })).start();
        }
    };
    UserLevelUi.prototype.showLevel = function () {
        //清算出可以升多少级
        var remainExp = UserData_1.default.getInstance().getUserExp();
        var curLevel = UserData_1.default.getInstance().getUserLevel();
        var needExp = PlayerLevelUp_1.PlayerLevelUpManager.getInstance().getPlayerExpCost(curLevel);
        var nextLevel = curLevel;
        var maxLevel = PlayerLevelUp_1.PlayerLevelUpManager.getMaxPlayerLevel();
        //let remainExp=allExp;
        while (nextLevel < maxLevel && remainExp >= needExp) {
            remainExp -= needExp;
            nextLevel++;
            needExp = PlayerLevelUp_1.PlayerLevelUpManager.getInstance().getPlayerExpCost(nextLevel);
        }
        this.total_level = (nextLevel - curLevel);
        this.new_level = curLevel + this.total_level;
        var isMax = this.new_level >= maxLevel;
        this.new_exp = remainExp;
        var textRoot = this.node.getChildByName('text_root');
        var nextLevelText = textRoot.getChildByName('nextLevel').getComponent(cc.Label);
        var curLevelText = textRoot.getChildByName('curLevel').getComponent(cc.Label);
        // let gemNumText=textRoot.getChildByName('gemNum').getComponent(cc.Label);
        // gemNumText.string=''+10*this.total_level;
        var item = PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.Gem, 10 * this.total_level);
        this.node.getChildByName("reward").addChild(item);
        item.setPosition(cc.v2(0, 0));
        if (isMax) {
            this.node.getChildByName('arrow').active = false;
            this.node.getChildByName('bgl').active = false;
            this.node.getChildByName('bgr').active = false;
            textRoot.getChildByName('ygTx').active = false;
            nextLevelText.node.active = false;
        }
        else {
            curLevelText.string = '' + (curLevel);
            nextLevelText.string = '' + this.new_level;
        }
        //判断升级的区间内解锁的功能
        var unlockList = new Array();
        for (var type = Constants_1.FuncType.LiChengBei; type < Constants_1.FuncType.Num; type++) {
            var unlockLevel = FunctionDefinition_1.FunctionDefinitionManager.getInstance().getUnlockCondictionParameter(type);
            if (unlockLevel > curLevel && unlockLevel <= this.new_level) {
                unlockList.push(type);
            }
        }
        var len = unlockList.length;
        var unlockIcon = this.node.getChildByName('unlockIcon');
        var sroll = this.node.getChildByName("scroll");
        var content = sroll.getComponent(cc.ScrollView).content;
        // let jiange=20;
        // let isJi=unlockList.length%2?true:false;
        // let centerIndex=Math.round(unlockList.length/2);        
        //还需要判断当前解锁的是不是活动模块的功能
        // let isCity=false;//214教程
        // let touchPosCity=cc.v2(0,0);
        // let isActivity=false;//224教程
        // let touchPosActivity=cc.v2(0,0);
        sroll.height = unlockIcon.height * len;
        sroll.getChildByName('view').height = unlockIcon.height * len;
        if (len > 0) {
            //遍历
            for (var i = 1; i <= len; i++) {
                var type = unlockList[i - 1];
                var unlockItem = cc.instantiate(unlockIcon);
                var icon = unlockItem.getChildByName('icon').getComponent(cc.Sprite);
                icon.spriteFrame = this.atlas.getSpriteFrame("func" + FunctionDefinition_1.FunctionDefinitionManager.getIconIndex(type));
                var iconName = unlockItem.getChildByName('iconName').getComponent(cc.Label);
                var id = FunctionDefinition_1.FunctionDefinitionManager.getInstance().getTextID(type);
                iconName.string = LanguageManager_1.default.getInstance().getStrByTextId(id);
                var goBtn = unlockItem.getComponent(cc.Button);
                goBtn.clickEvents[0].customEventData = type + "";
                content.addChild(unlockItem);
                // this.node.addChild(unlockItem);
                // let xx=0;
                // if(isJi){
                //     //奇数
                //     xx=(i-centerIndex)*(unlockItem.width+jiange)
                // }else{
                //     //偶数
                //     xx=(i-centerIndex)*(unlockItem.width+jiange)-(unlockItem.width+jiange)/2;
                // }
                // unlockItem.x=xx;                
                // if(isActivity==false){
                //     if(type==FuncType.WuJinTiaoZhan||type==FuncType.GeRenBoss||type==FuncType.ShiJieBoss||type==FuncType.PaTa){                    
                //         isActivity=true;
                //         touchPosActivity=cc.v2(xx,unlockItem.y-3);
                //     }
                // }
                // if(isCity==false){
                //     if(type==FuncType.ZhuangBeiHeCheng||type==FuncType.ChengBaoYangCheng||type==FuncType.TianFu){
                //         isCity=true;
                //         touchPosCity=cc.v2(xx,unlockItem.y-3);
                //     }
                // }                
            }
        }
        else {
            this.node.getChildByName('bgr').active = false;
            this.node.getChildByName('bgl').active = false;
            textRoot.getChildByName('ygTx').active = false;
        }
        unlockIcon.active = false;
        //教程
    };
    UserLevelUi.prototype.clickBtnGo = function (btn, index) {
        var _this = this;
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        var type = parseInt(index);
        if (this.is_show_compelete) {
            MyTool_1.default.allFadeOut(this.node, function () {
                _this.goTo(type);
            });
        }
    };
    UserLevelUi.prototype.goTo = function (type) {
        var goType = Constants_1.Go_Type.Main;
        switch (type) {
            case Constants_1.FuncType.LiChengBei:
                {
                    goType = Constants_1.Go_Type.Main_Milestone;
                }
                break;
            case Constants_1.FuncType.GuaiWuTuJian:
                {
                    goType = Constants_1.Go_Type.Main_EnemyInfo;
                }
                break;
            case Constants_1.FuncType.ZhuanPan:
                {
                    goType = Constants_1.Go_Type.Main_Spin;
                }
                break;
            case Constants_1.FuncType.MeiRiRenWu:
                {
                    goType = Constants_1.Go_Type.Main_Task;
                }
                break;
            case Constants_1.FuncType.QianDao:
                {
                    goType = Constants_1.Go_Type.Main_Sign;
                }
                break;
            case Constants_1.FuncType.PaiHangBang:
                {
                    goType = Constants_1.Go_Type.Main_Rank;
                }
                break;
            case Constants_1.FuncType.ZhuangBeiHeCheng:
                {
                    goType = Constants_1.Go_Type.City;
                }
                break;
            case Constants_1.FuncType.GeRenBoss:
            case Constants_1.FuncType.ShiJieBoss:
            case Constants_1.FuncType.WuJinTiaoZhan:
            case Constants_1.FuncType.MiGong:
            case Constants_1.FuncType.PaTa:
                {
                    goType = Constants_1.Go_Type.Activity;
                }
                break;
            case Constants_1.FuncType.FanLi:
            case Constants_1.FuncType.LiBao:
            case Constants_1.FuncType.ZhanLing:
            case Constants_1.FuncType.ZhouLiBao:
            case Constants_1.FuncType.NeiGou:
            case Constants_1.FuncType.FirstCharge:
                {
                    goType = Constants_1.Go_Type.Main;
                }
                break;
            case Constants_1.FuncType.Shengtang:
            case Constants_1.FuncType.XuYuanChi:
            case Constants_1.FuncType.LongChao:
            case Constants_1.FuncType.ShangDian:
            case Constants_1.FuncType.TieJiangPu:
            case Constants_1.FuncType.ChongWuXiTong:
                {
                    goType = Constants_1.Go_Type.City;
                }
                break;
        }
        GameManager_1.default.getInstance().game_to_home = goType;
        if (GameManager_1.default.getInstance().cur_game_scene == Constants_1.GameScene.home) {
            this.destroySelf();
        }
        else {
            GameManager_1.default.getInstance().backToHome();
            this.destroySelf();
        }
    };
    UserLevelUi.prototype.startFly = function (node, num) {
        if (GameManager_1.default.getInstance().cur_game_scene != Constants_1.GameScene.home) {
            return;
        }
        var disPos = cc.v2(0, 0);
        var disNode = cc.find('Canvas/Top_Ui/top/iconGem');
        var wordPos = disNode.parent.convertToWorldSpaceAR(disNode.getPosition());
        var uiRoot = cc.find('Canvas/Ui_Root');
        disPos = uiRoot.convertToNodeSpaceAR(wordPos);
        var nodePos = node.getPosition();
        for (var i = 0; i < num; i++) {
            var startPosX = Math.random() * 300 - 200 + nodePos.x;
            var startPosY = Math.random() * 300 - 200 + nodePos.y;
            var startPos = cc.v2(startPosX, startPosY);
            var newNode = cc.instantiate(node);
            newNode.setPosition(startPos);
            uiRoot.addChild(newNode);
            cc.tween(newNode).then(MyTool_1.default.getBezierAct(startPos, disPos)).removeSelf().start();
            var num_1 = newNode.getChildByName('num');
            if (num_1) {
                num_1.active = false;
            }
        }
    };
    UserLevelUi.prototype.destroySelf = function () {
        var _this = this;
        if (this.is_show_compelete) {
            PropManager_1.PropManager.getInstance().changePropNum(PropConfig_1.PropId.Gem, 10 * this.total_level);
            UserData_1.default.getInstance().saveUserLevel(this.new_level);
            UserData_1.default.getInstance().saveUserExp(this.new_exp);
            GameManager_1.default.getInstance().refreshUserExpShow();
            GameManager_1.default.getInstance().jumoAndShowUi();
            MyTool_1.default.allFadeOut(this.node, function () {
                // this.startFly(this.node.getChildByName('kuang').getChildByName('icon'),10);
                _super.prototype.onClose.call(_this);
            });
            // if(TutorailsManager.getInstance().isShowTutorials(224)){
            //     TutorailsManager.getInstance().saveTutorials(224);
            // }
        }
    };
    __decorate([
        property(cc.SpriteAtlas)
    ], UserLevelUi.prototype, "atlas", void 0);
    UserLevelUi = __decorate([
        ccclass
    ], UserLevelUi);
    return UserLevelUi;
}(UIComponent_1.default));
exports.default = UserLevelUi;

cc._RF.pop();