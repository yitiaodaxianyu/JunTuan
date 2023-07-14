
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/UI/home/UserLevelUi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVUlcXGhvbWVcXFVzZXJMZXZlbFVpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZDQUErRDtBQUUvRCxpREFBNEM7QUFDNUMsd0VBQThFO0FBQzlFLDhEQUFvRTtBQUNwRSx1RUFBa0U7QUFDbEUsc0RBQXFEO0FBQ3JELG9EQUErQztBQUMvQyw2REFBd0Q7QUFDeEQsNkNBQXdDO0FBQ3hDLDJDQUFzQztBQUN0Qyw4Q0FBeUM7QUFHbkMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBeUMsK0JBQVc7SUFBcEQ7UUFFSSw0QkFBNEI7UUFDNUIsZ0NBQWdDO1FBSHBDLHFFQTBQQztRQXBQRyxXQUFLLEdBQWdCLElBQUksQ0FBQztRQUUxQixlQUFTLEdBQVEsQ0FBQyxDQUFDO1FBQ25CLGFBQU8sR0FBUSxDQUFDLENBQUM7UUFDakIsaUJBQVcsR0FBUSxDQUFDLENBQUM7UUFDckIsdUJBQWlCLEdBQVMsSUFBSSxDQUFDOztJQStPbkMsQ0FBQztJQTdPRywyQkFBSyxHQUFMO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBQyxJQUFJLENBQUMsV0FBVyxFQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RGLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUVqQixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUM7SUFDdkIsQ0FBQztJQUVELE9BQU87SUFDUCw2QkFBTyxHQUFQO1FBQ0ksSUFBSSxRQUFRLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxD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SSxFQUFDO2dCQUN4Qiw4RUFBOEU7Z0JBQzlFLGlCQUFNLE9BQU8sWUFBRSxDQUFDO1lBQ3BCLENBQUMsQ0FBQyxDQUFDO1lBQ0gsMkRBQTJEO1lBQzNELHlEQUF5RDtZQUN6RCxJQUFJO1NBQ1A7SUFDSixDQUFDO0lBblBGO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7OENBQ0M7SUFOVCxXQUFXO1FBRC9CLE9BQU87T0FDYSxXQUFXLENBMFAvQjtJQUFELGtCQUFDO0NBMVBELEFBMFBDLENBMVB3QyxxQkFBVyxHQTBQbkQ7a0JBMVBvQixXQUFXIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRnVuY1R5cGUsIEdhbWVTY2VuZSwgR29fVHlwZSB9IGZyb20gXCIuLi8uLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IEdhbWVEYXRhIGZyb20gXCIuLi8uLi9HYW1lRGF0YVwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uLy4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEZ1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vSnNvbkRhdGEvRnVuY3Rpb25EZWZpbml0aW9uXCI7XHJcbmltcG9ydCB7IFBsYXllckxldmVsVXBNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0pzb25EYXRhL1BsYXllckxldmVsVXBcIjtcclxuaW1wb3J0IExhbmd1YWdlTWFuYWdlciBmcm9tIFwiLi4vLi4vbXVsdGlMYW5ndWFnZS9MYW5ndWFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgUHJvcE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vUHJvcC9Qcm9wTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBQcm9wSWQgfSBmcm9tIFwiLi4vLi4vUHJvcC9Qcm9wQ29uZmlnXCI7XHJcbmltcG9ydCB7IFNvdW5kSW5kZXggfSBmcm9tIFwiLi4vLi4vU291bmQvQXVkaW9Db25zdGFudHNcIjtcclxuaW1wb3J0IE15VG9vbCBmcm9tIFwiLi4vLi4vVG9vbHMvTXlUb29sXCI7XHJcbmltcG9ydCBVc2VyRGF0YSBmcm9tIFwiLi4vLi4vVXNlckRhdGFcIjtcclxuaW1wb3J0IFVJQ29tcG9uZW50IGZyb20gXCIuLi9VSUNvbXBvbmVudFwiO1xyXG5cclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlckxldmVsVWkgZXh0ZW5kcyBVSUNvbXBvbmVudCB7XHJcblxyXG4gICAgLy8gQHByb3BlcnR5KGNjLlNwcml0ZUZyYW1lKVxyXG4gICAgLy8gc3Bfa3Vhbmc6Y2MuU3ByaXRlRnJhbWU9bnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlQXRsYXMpXHJcbiAgICBhdGxhczpjYy5TcHJpdGVBdGxhcz1udWxsO1xyXG5cclxuICAgIG5ld19sZXZlbDpudW1iZXI9MTtcclxuICAgIG5ld19leHA6bnVtYmVyPTE7XHJcbiAgICB0b3RhbF9sZXZlbDpudW1iZXI9MTtcclxuICAgIGlzX3Nob3dfY29tcGVsZXRlOmJvb2xlYW49dHJ1ZTtcclxuXHJcbiAgICBzdGFydCAoKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdiYmcnKS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsdGhpcy5kZXN0cm95U2VsZix0aGlzKTtcclxuICAgICAgICB0aGlzLnN0YXJpbmcoKTtcclxuICAgICAgICB0aGlzLnNob3dMZXZlbCgpOyAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5ub2RlLnpJbmRleD0yO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5pif5pif5LmL6Zeq54OBXHJcbiAgICBzdGFyaW5nKCl7XHJcbiAgICAgICAgbGV0IHN0YXJSb290PXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInN0YXJfcm9vdFwiKTtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTxzdGFyUm9vdC5jaGlsZHJlbkNvdW50OyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgbm9kZT1zdGFyUm9vdC5jaGlsZHJlbltpXTtcclxuICAgICAgICAgICAgbGV0IG9sZFNjYWxlPW5vZGUuc2NhbGU7XHJcbiAgICAgICAgICAgIGxldCBuZXdTY2FsZT1vbGRTY2FsZStNYXRoLnJhbmRvbSgpKjAuNSswLjI7XHJcbiAgICAgICAgICAgIGxldCBhY3Q9TWF0aC5yYW5kb20oKSswLjU7XHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKG5vZGUpLnJlcGVhdEZvcmV2ZXIoY2MudHdlZW4oKS50byhhY3Qse3NjYWxlOm5ld1NjYWxlfSkudG8oYWN0LHtzY2FsZTpvbGRTY2FsZX0pKS5zdGFydCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzaG93TGV2ZWwoKXtcclxuICAgICAgICAvL+a4heeul+WHuuWPr+S7peWNh+WkmuWwkee6p1xyXG4gICAgICAgIGxldCByZW1haW5FeHA9VXNlckRhdGEuZ2V0SW5zdGFuY2UoKS5nZXRVc2VyRXhwKCk7XHJcbiAgICAgICAgbGV0IGN1ckxldmVsPVVzZXJEYXRhLmdldEluc3RhbmNlKCkuZ2V0VXNlckxldmVsKCk7XHJcbiAgICAgICAgbGV0IG5lZWRFeHA9UGxheWVyTGV2ZWxVcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQbGF5ZXJFeHBDb3N0KGN1ckxldmVsKTtcclxuICAgICAgICBsZXQgbmV4dExldmVsPWN1ckxldmVsO1xyXG4gICAgICAgIGxldCBtYXhMZXZlbD1QbGF5ZXJMZXZlbFVwTWFuYWdlci5nZXRNYXhQbGF5ZXJMZXZlbCgpO1xyXG4gICAgICAgIC8vbGV0IHJlbWFpbkV4cD1hbGxFeHA7XHJcbiAgICAgICAgd2hpbGUobmV4dExldmVsPG1heExldmVsJiZyZW1haW5FeHA+PW5lZWRFeHApe1xyXG4gICAgICAgICAgICByZW1haW5FeHAtPW5lZWRFeHA7XHJcbiAgICAgICAgICAgIG5leHRMZXZlbCsrO1xyXG4gICAgICAgICAgICBuZWVkRXhwPVBsYXllckxldmVsVXBNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UGxheWVyRXhwQ29zdChuZXh0TGV2ZWwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnRvdGFsX2xldmVsPShuZXh0TGV2ZWwtY3VyTGV2ZWwpO1xyXG4gICAgICAgIHRoaXMubmV3X2xldmVsPWN1ckxldmVsK3RoaXMudG90YWxfbGV2ZWw7XHJcbiAgICAgICAgbGV0IGlzTWF4PXRoaXMubmV3X2xldmVsPj1tYXhMZXZlbDtcclxuICAgICAgICB0aGlzLm5ld19leHA9cmVtYWluRXhwO1xyXG4gICAgICAgIGxldCB0ZXh0Um9vdD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3RleHRfcm9vdCcpO1xyXG4gICAgICAgIGxldCBuZXh0TGV2ZWxUZXh0PXRleHRSb290LmdldENoaWxkQnlOYW1lKCduZXh0TGV2ZWwnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIGxldCBjdXJMZXZlbFRleHQ9dGV4dFJvb3QuZ2V0Q2hpbGRCeU5hbWUoJ2N1ckxldmVsJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICAvLyBsZXQgZ2VtTnVtVGV4dD10ZXh0Um9vdC5nZXRDaGlsZEJ5TmFtZSgnZ2VtTnVtJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICAvLyBnZW1OdW1UZXh0LnN0cmluZz0nJysxMCp0aGlzLnRvdGFsX2xldmVsO1xyXG4gICAgICAgIGxldCBpdGVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShQcm9wSWQuR2VtLDEwKnRoaXMudG90YWxfbGV2ZWwpO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInJld2FyZFwiKS5hZGRDaGlsZChpdGVtKTtcclxuICAgICAgICBpdGVtLnNldFBvc2l0aW9uKGNjLnYyKDAsMCkpO1xyXG4gICAgICAgIGlmKGlzTWF4KXtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdhcnJvdycpLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdiZ2wnKS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnYmdyJykuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICB0ZXh0Um9vdC5nZXRDaGlsZEJ5TmFtZSgneWdUeCcpLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgbmV4dExldmVsVGV4dC5ub2RlLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgY3VyTGV2ZWxUZXh0LnN0cmluZz0nJysoY3VyTGV2ZWwpO1xyXG4gICAgICAgICAgICBuZXh0TGV2ZWxUZXh0LnN0cmluZz0nJyt0aGlzLm5ld19sZXZlbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v5Yik5pat5Y2H57qn55qE5Yy66Ze05YaF6Kej6ZSB55qE5Yqf6IO9XHJcbiAgICAgICAgbGV0IHVubG9ja0xpc3Q9bmV3IEFycmF5KCk7XHJcbiAgICAgICAgZm9yKGxldCB0eXBlPUZ1bmNUeXBlLkxpQ2hlbmdCZWk7IHR5cGU8RnVuY1R5cGUuTnVtOyB0eXBlKyspe1xyXG4gICAgICAgICAgICBsZXQgdW5sb2NrTGV2ZWw9RnVuY3Rpb25EZWZpbml0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFVubG9ja0NvbmRpY3Rpb25QYXJhbWV0ZXIodHlwZSk7XHJcbiAgICAgICAgICAgIGlmKHVubG9ja0xldmVsPmN1ckxldmVsJiZ1bmxvY2tMZXZlbDw9dGhpcy5uZXdfbGV2ZWwpe1xyXG4gICAgICAgICAgICAgICAgdW5sb2NrTGlzdC5wdXNoKHR5cGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBsZW49dW5sb2NrTGlzdC5sZW5ndGg7XHJcbiAgICAgICAgbGV0IHVubG9ja0ljb249dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCd1bmxvY2tJY29uJyk7XHJcbiAgICAgICAgbGV0IHNyb2xsPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInNjcm9sbFwiKVxyXG4gICAgICAgIGxldCBjb250ZW50ID0gc3JvbGwuZ2V0Q29tcG9uZW50KGNjLlNjcm9sbFZpZXcpLmNvbnRlbnQ7XHJcbiAgICAgICAgLy8gbGV0IGppYW5nZT0yMDtcclxuICAgICAgICAvLyBsZXQgaXNKaT11bmxvY2tMaXN0Lmxlbmd0aCUyP3RydWU6ZmFsc2U7XHJcbiAgICAgICAgLy8gbGV0IGNlbnRlckluZGV4PU1hdGgucm91bmQodW5sb2NrTGlzdC5sZW5ndGgvMik7ICAgICAgICBcclxuICAgICAgICAvL+i/mOmcgOimgeWIpOaWreW9k+WJjeino+mUgeeahOaYr+S4jeaYr+a0u+WKqOaooeWdl+eahOWKn+iDvVxyXG4gICAgICAgIC8vIGxldCBpc0NpdHk9ZmFsc2U7Ly8yMTTmlZnnqItcclxuICAgICAgICAvLyBsZXQgdG91Y2hQb3NDaXR5PWNjLnYyKDAsMCk7XHJcbiAgICAgICAgLy8gbGV0IGlzQWN0aXZpdHk9ZmFsc2U7Ly8yMjTmlZnnqItcclxuICAgICAgICAvLyBsZXQgdG91Y2hQb3NBY3Rpdml0eT1jYy52MigwLDApO1xyXG4gICAgICAgIHNyb2xsLmhlaWdodD11bmxvY2tJY29uLmhlaWdodCpsZW47XHJcbiAgICAgICAgc3JvbGwuZ2V0Q2hpbGRCeU5hbWUoJ3ZpZXcnKS5oZWlnaHQ9dW5sb2NrSWNvbi5oZWlnaHQqbGVuO1xyXG4gICAgICAgIGlmKGxlbj4wKXtcclxuICAgICAgICAgICAgLy/pgY3ljoZcclxuICAgICAgICAgICAgZm9yKGxldCBpPTE7IGk8PWxlbjsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGxldCB0eXBlPXVubG9ja0xpc3RbaS0xXTtcclxuICAgICAgICAgICAgICAgIGxldCB1bmxvY2tJdGVtPWNjLmluc3RhbnRpYXRlKHVubG9ja0ljb24pO1xyXG4gICAgICAgICAgICAgICAgbGV0IGljb249dW5sb2NrSXRlbS5nZXRDaGlsZEJ5TmFtZSgnaWNvbicpLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG4gICAgICAgICAgICAgICAgaWNvbi5zcHJpdGVGcmFtZT10aGlzLmF0bGFzLmdldFNwcml0ZUZyYW1lKFwiZnVuY1wiK0Z1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIuZ2V0SWNvbkluZGV4KHR5cGUpKTtcclxuICAgICAgICAgICAgICAgIGxldCBpY29uTmFtZT11bmxvY2tJdGVtLmdldENoaWxkQnlOYW1lKCdpY29uTmFtZScpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgaWQ9RnVuY3Rpb25EZWZpbml0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFRleHRJRCh0eXBlKTtcclxuICAgICAgICAgICAgICAgIGljb25OYW1lLnN0cmluZz1MYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZChpZCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZ29CdG49dW5sb2NrSXRlbS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKTtcclxuICAgICAgICAgICAgICAgIGdvQnRuLmNsaWNrRXZlbnRzWzBdLmN1c3RvbUV2ZW50RGF0YT10eXBlK1wiXCI7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50LmFkZENoaWxkKHVubG9ja0l0ZW0pO1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5ub2RlLmFkZENoaWxkKHVubG9ja0l0ZW0pO1xyXG4gICAgICAgICAgICAgICAgLy8gbGV0IHh4PTA7XHJcbiAgICAgICAgICAgICAgICAvLyBpZihpc0ppKXtcclxuICAgICAgICAgICAgICAgIC8vICAgICAvL+Wlh+aVsFxyXG4gICAgICAgICAgICAgICAgLy8gICAgIHh4PShpLWNlbnRlckluZGV4KSoodW5sb2NrSXRlbS53aWR0aCtqaWFuZ2UpXHJcbiAgICAgICAgICAgICAgICAvLyB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIC8vICAgICAvL+WBtuaVsFxyXG4gICAgICAgICAgICAgICAgLy8gICAgIHh4PShpLWNlbnRlckluZGV4KSoodW5sb2NrSXRlbS53aWR0aCtqaWFuZ2UpLSh1bmxvY2tJdGVtLndpZHRoK2ppYW5nZSkvMjtcclxuICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgICAgIC8vIHVubG9ja0l0ZW0ueD14eDsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvLyBpZihpc0FjdGl2aXR5PT1mYWxzZSl7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgaWYodHlwZT09RnVuY1R5cGUuV3VKaW5UaWFvWmhhbnx8dHlwZT09RnVuY1R5cGUuR2VSZW5Cb3NzfHx0eXBlPT1GdW5jVHlwZS5TaGlKaWVCb3NzfHx0eXBlPT1GdW5jVHlwZS5QYVRhKXsgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICBpc0FjdGl2aXR5PXRydWU7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIHRvdWNoUG9zQWN0aXZpdHk9Y2MudjIoeHgsdW5sb2NrSXRlbS55LTMpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgICAgIC8vIGlmKGlzQ2l0eT09ZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIGlmKHR5cGU9PUZ1bmNUeXBlLlpodWFuZ0JlaUhlQ2hlbmd8fHR5cGU9PUZ1bmNUeXBlLkNoZW5nQmFvWWFuZ0NoZW5nfHx0eXBlPT1GdW5jVHlwZS5UaWFuRnUpe1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICBpc0NpdHk9dHJ1ZTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgdG91Y2hQb3NDaXR5PWNjLnYyKHh4LHVubG9ja0l0ZW0ueS0zKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyB9ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnYmdyJykuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2JnbCcpLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgdGV4dFJvb3QuZ2V0Q2hpbGRCeU5hbWUoJ3lnVHgnKS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHVubG9ja0ljb24uYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgIC8v5pWZ56iLXHJcbiAgICAgICAgXHJcbiAgICB9ICAgIFxyXG5cclxuICAgIGNsaWNrQnRuR28oYnRuLGluZGV4OnN0cmluZyl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBsZXQgdHlwZT1wYXJzZUludChpbmRleCk7XHJcbiAgICAgICAgaWYodGhpcy5pc19zaG93X2NvbXBlbGV0ZSl7XHJcbiAgICAgICAgICAgIE15VG9vbC5hbGxGYWRlT3V0KHRoaXMubm9kZSwoKT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nb1RvKHR5cGUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ29Ubyh0eXBlOkZ1bmNUeXBlKXtcclxuICAgICAgICBsZXQgZ29UeXBlPUdvX1R5cGUuTWFpbjtcclxuICAgICAgICBzd2l0Y2godHlwZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNhc2UgRnVuY1R5cGUuTGlDaGVuZ0JlaTp7XHJcbiAgICAgICAgICAgICAgICBnb1R5cGU9R29fVHlwZS5NYWluX01pbGVzdG9uZTtcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBGdW5jVHlwZS5HdWFpV3VUdUppYW46e1xyXG4gICAgICAgICAgICAgICAgZ29UeXBlPUdvX1R5cGUuTWFpbl9FbmVteUluZm87XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgRnVuY1R5cGUuWmh1YW5QYW46e1xyXG4gICAgICAgICAgICAgICAgZ29UeXBlPUdvX1R5cGUuTWFpbl9TcGluO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEZ1bmNUeXBlLk1laVJpUmVuV3U6e1xyXG4gICAgICAgICAgICAgICAgZ29UeXBlPUdvX1R5cGUuTWFpbl9UYXNrO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEZ1bmNUeXBlLlFpYW5EYW86e1xyXG4gICAgICAgICAgICAgICAgZ29UeXBlPUdvX1R5cGUuTWFpbl9TaWduO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEZ1bmNUeXBlLlBhaUhhbmdCYW5nOntcclxuICAgICAgICAgICAgICAgIGdvVHlwZT1Hb19UeXBlLk1haW5fUmFuaztcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBGdW5jVHlwZS5aaHVhbmdCZWlIZUNoZW5nOiB7XHJcbiAgICAgICAgICAgICAgICBnb1R5cGU9R29fVHlwZS5DaXR5O1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEZ1bmNUeXBlLkdlUmVuQm9zczpcclxuICAgICAgICAgICAgY2FzZSBGdW5jVHlwZS5TaGlKaWVCb3NzOlxyXG4gICAgICAgICAgICBjYXNlIEZ1bmNUeXBlLld1SmluVGlhb1poYW46XHJcbiAgICAgICAgICAgIGNhc2UgRnVuY1R5cGUuTWlHb25nOlxyXG4gICAgICAgICAgICBjYXNlIEZ1bmNUeXBlLlBhVGE6e1xyXG4gICAgICAgICAgICAgICAgZ29UeXBlPUdvX1R5cGUuQWN0aXZpdHk7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgRnVuY1R5cGUuRmFuTGk6XHJcbiAgICAgICAgICAgIGNhc2UgRnVuY1R5cGUuTGlCYW86XHJcbiAgICAgICAgICAgIGNhc2UgRnVuY1R5cGUuWmhhbkxpbmc6XHJcbiAgICAgICAgICAgIGNhc2UgRnVuY1R5cGUuWmhvdUxpQmFvOlxyXG4gICAgICAgICAgICBjYXNlIEZ1bmNUeXBlLk5laUdvdTpcclxuICAgICAgICAgICAgY2FzZSBGdW5jVHlwZS5GaXJzdENoYXJnZTpcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZ29UeXBlPUdvX1R5cGUuTWFpbjtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEZ1bmNUeXBlLlNoZW5ndGFuZzpcclxuICAgICAgICAgICAgY2FzZSBGdW5jVHlwZS5YdVl1YW5DaGk6XHJcbiAgICAgICAgICAgIGNhc2UgRnVuY1R5cGUuTG9uZ0NoYW86XHJcbiAgICAgICAgICAgIGNhc2UgRnVuY1R5cGUuU2hhbmdEaWFuOlxyXG4gICAgICAgICAgICBjYXNlIEZ1bmNUeXBlLlRpZUppYW5nUHU6XHJcbiAgICAgICAgICAgIGNhc2UgRnVuY1R5cGUuQ2hvbmdXdVhpVG9uZzpcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZ29UeXBlPUdvX1R5cGUuQ2l0eTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdhbWVfdG9faG9tZT1nb1R5cGU7XHJcbiAgICAgICAgaWYoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zY2VuZT09R2FtZVNjZW5lLmhvbWUpeyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3lTZWxmKCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuYmFja1RvSG9tZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3lTZWxmKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhcnRGbHkobm9kZTpjYy5Ob2RlLG51bTpudW1iZXIpIHtcclxuICAgICAgICBpZihHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX3NjZW5lIT1HYW1lU2NlbmUuaG9tZSl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGRpc1Bvcz1jYy52MigwLDApXHJcbiAgICAgICAgbGV0IGRpc05vZGU9Y2MuZmluZCgnQ2FudmFzL1RvcF9VaS90b3AvaWNvbkdlbScpO1xyXG4gICAgICAgIGxldCB3b3JkUG9zPWRpc05vZGUucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihkaXNOb2RlLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgIGxldCB1aVJvb3Q9Y2MuZmluZCgnQ2FudmFzL1VpX1Jvb3QnKVxyXG4gICAgICAgIGRpc1Bvcz11aVJvb3QuY29udmVydFRvTm9kZVNwYWNlQVIod29yZFBvcyk7XHJcbiAgICAgICAgbGV0IG5vZGVQb3M9bm9kZS5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPG51bTsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IHN0YXJ0UG9zWD1NYXRoLnJhbmRvbSgpKjMwMC0yMDArbm9kZVBvcy54O1xyXG4gICAgICAgICAgICBsZXQgc3RhcnRQb3NZPU1hdGgucmFuZG9tKCkqMzAwLTIwMCtub2RlUG9zLnk7XHJcbiAgICAgICAgICAgIGxldCBzdGFydFBvcz1jYy52MihzdGFydFBvc1gsc3RhcnRQb3NZKVxyXG4gICAgICAgICAgICBsZXQgbmV3Tm9kZT1jYy5pbnN0YW50aWF0ZShub2RlKTtcclxuICAgICAgICAgICAgbmV3Tm9kZS5zZXRQb3NpdGlvbihzdGFydFBvcyk7XHJcbiAgICAgICAgICAgIHVpUm9vdC5hZGRDaGlsZChuZXdOb2RlKTtcclxuICAgICAgICAgICAgY2MudHdlZW4obmV3Tm9kZSkudGhlbihNeVRvb2wuZ2V0QmV6aWVyQWN0KHN0YXJ0UG9zLGRpc1BvcykpLnJlbW92ZVNlbGYoKS5zdGFydCgpO1xyXG4gICAgICAgICAgICBsZXQgbnVtPW5ld05vZGUuZ2V0Q2hpbGRCeU5hbWUoJ251bScpO1xyXG4gICAgICAgICAgICBpZihudW0pe1xyXG4gICAgICAgICAgICAgICAgbnVtLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgfVxyXG5cclxuICAgICBkZXN0cm95U2VsZigpe1xyXG4gICAgICAgIGlmKHRoaXMuaXNfc2hvd19jb21wZWxldGUpe1xyXG4gICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0oUHJvcElkLkdlbSwxMCp0aGlzLnRvdGFsX2xldmVsKTtcclxuICAgICAgICAgICAgVXNlckRhdGEuZ2V0SW5zdGFuY2UoKS5zYXZlVXNlckxldmVsKHRoaXMubmV3X2xldmVsKTtcclxuICAgICAgICAgICAgVXNlckRhdGEuZ2V0SW5zdGFuY2UoKS5zYXZlVXNlckV4cCh0aGlzLm5ld19leHApO1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlZnJlc2hVc2VyRXhwU2hvdygpO1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmp1bW9BbmRTaG93VWkoKTtcclxuICAgICAgICAgICAgTXlUb29sLmFsbEZhZGVPdXQodGhpcy5ub2RlLCgpPT57XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLnN0YXJ0Rmx5KHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgna3VhbmcnKS5nZXRDaGlsZEJ5TmFtZSgnaWNvbicpLDEwKTtcclxuICAgICAgICAgICAgICAgIHN1cGVyLm9uQ2xvc2UoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vIGlmKFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc1Nob3dUdXRvcmlhbHMoMjI0KSl7XHJcbiAgICAgICAgICAgIC8vICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMjQpO1xyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgfSAgICBcclxuICAgICB9XHJcbn1cclxuIl19