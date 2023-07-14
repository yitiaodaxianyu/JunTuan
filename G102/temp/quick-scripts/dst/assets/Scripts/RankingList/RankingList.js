
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/RankingList/RankingList.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5a135pn3oxJOJUVlLqUR/Oa', 'RankingList');
// Scripts/RankingList/RankingList.ts

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
var HttpManager_1 = require(".././NetWork/HttpManager");
var BossChallenge_1 = require("../Activity/BossChallenge");
var EndlessLevels_1 = require("../Activity/EndlessLevels");
var rankingrewarddisplay_1 = require("../copy/endlesschallenges/rankingrewarddisplay");
var GameManager_1 = require("../GameManager");
var HeroManager_1 = require("../Hero/Data/HeroManager");
var TextLanguage_1 = require("../multiLanguage/TextLanguage");
var PropManager_1 = require("../Prop/PropManager");
var AudioConstants_1 = require("../Sound/AudioConstants");
var UIComponent_1 = require("../UI/UIComponent");
var UIConfig_1 = require("../UI/UIConfig");
var UIManager_1 = require("../UI/UIManager");
var UserData_1 = require("../UserData");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var RankingList = /** @class */ (function (_super) {
    __extends(RankingList, _super);
    function RankingList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.Rankingitme = null; //排行节点
        _this.RankingSelf = null; //玩家自己的排行节点
        _this.content = null; //父节点
        _this.ScrollView = null; //列表
        _this.ToggleContainer = null; //选项    战力      无尽挑战    boss挑战
        _this.Ranking_Bg_0 = null; //背景
        _this.Ranking = []; //排行节点
        _this.max = 100;
        _this.bgsprite = []; //前三的背景
        _this.namecolor = [new cc.Color(94, 62, 41), new cc.Color(50, 75, 105), new cc.Color(108, 68, 54)]; //前三的名字颜色
        _this.tag = 1; //选择显示的排行榜   默认是1   点击之后变
        _this.text = [100126, 100128, 100129]; //战力:~波数:~伤害:~
        _this.btnViewAwards = null; //查看奖励按钮
        _this.winText = null; //标题
        _this.myselfranking = -1; //玩家默认排名
        return _this;
        // @property(cc.Label)
        // label: cc.Label = null;
        // @property
        // text: string = 'hello';
        // LIFE-CYCLE CALLBACKS:
        // onLoad () {}
        // start () {
        // }
        // update (dt) {}
    }
    RankingList.prototype.initUi = function (type) {
        var _this = this;
        for (var itmeindex = this.Ranking.length; itmeindex < this.max; itmeindex++) {
            var rankingitme = cc.instantiate(this.Rankingitme);
            rankingitme.parent = this.content;
            this.Ranking.push(rankingitme);
        }
        var selfranking = -1;
        var SerialNo = this.RankingSelf.getChildByName("SerialNo");
        var name = this.RankingSelf.getChildByName("name");
        var btnAvatar = this.RankingSelf.getChildByName("headPortrait").getChildByName("btnAvatar");
        if (selfranking == -1) {
            SerialNo.active = false;
            this.RankingSelf.getChildByName("Notlisted").active = true;
        }
        else {
            SerialNo.getComponent(cc.Label).string = "" + (selfranking); //序号
            SerialNo.active = true;
            this.RankingSelf.getChildByName("Notlisted").active = false;
        }
        var myname = UserData_1.default.getInstance().getUserName(); //玩家名字
        var sphea = UserData_1.default.getInstance().getUserAvatar(); //玩家头像
        name.getComponent(cc.Label).string = "" + myname; //玩家名字
        btnAvatar.getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpheadPortraitType(sphea); //头像id
        if (type == 2) {
            this.tag = 2;
            this.ToggleContainer.active = false;
            this.btnViewAwards.active = false;
            this.ScrollView.y = 60;
            this.RankingSelf.y = -330;
            this.Ranking_Bg_0.y = 60;
            this.winText.getComponent(TextLanguage_1.default).setTextId(800003);
        }
        else if (type == 3) {
            this.tag = 3;
            this.ToggleContainer.active = false;
            this.btnViewAwards.active = true; //true
            this.ScrollView.y = 90;
            this.RankingSelf.y = -298;
            this.Ranking_Bg_0.y = 90;
            this.winText.getComponent(TextLanguage_1.default).setTextId(800013);
        }
        else if (type == 1) {
            this.tag = 1;
            this.ToggleContainer.children[0].getComponent(cc.Toggle).isChecked = true;
            this.ToggleContainer.active = true;
            this.btnViewAwards.active = false;
            this.ScrollView.y = 0;
            this.RankingSelf.y = -380;
            this.Ranking_Bg_0.y = 0;
            this.winText.getComponent(TextLanguage_1.default).setTextId(200006);
        }
        HttpManager_1.HttpManager.post(HttpManager_1.AccessName.leaderboardByUser, this.getLeaderboardByUserJsonString(this.tag), true).then(function (data) {
            _this.Refresh(data);
        });
        // this.Refresh()
    };
    RankingList.prototype.Refresh = function (data) {
        this.ScrollView.getComponent(cc.ScrollView).scrollToTop(1);
        var selfranking = -1;
        this.max = data.length;
        //后台拉取排名前100名的玩家
        for (var index = 0; index < this.Ranking.length; index++) {
            if (index < this.max) {
                var CombatPower_1 = this.Ranking[index].getChildByName("CombatPower");
                var SerialNo_1 = this.Ranking[index].getChildByName("SerialNo");
                var name_1 = this.Ranking[index].getChildByName("name");
                var btnAvatar_1 = this.Ranking[index].getChildByName("headPortrait").getChildByName("btnAvatar");
                CombatPower_1.getComponent(TextLanguage_1.default).setTextId(this.text[this.tag - 1]); //是哪个排行榜
                CombatPower_1.getComponent(TextLanguage_1.default).setReplaceValue('~', (data[index].value) + ''); //排行榜战力数据
                SerialNo_1.getComponent(cc.Label).string = "" + (index + 1); //序号
                name_1.getComponent(cc.Label).string = data[index].name; //玩家名字
                btnAvatar_1.getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpheadPortraitType(data[index].avatarId); //头像id
                if (index < 3) {
                    SerialNo_1.active = false;
                    this.Ranking[index].getComponent(cc.Sprite).spriteFrame = this.bgsprite[index]; //前三名的背景不一样
                    name_1.color = this.namecolor[index];
                }
                else {
                    SerialNo_1.active = true;
                }
                if (data[index].uid == UserData_1.default.getInstance().getUserID()) { //如果在后台拉取的排名中有id跟玩家的id一样，那么玩家的排名在前100名中  将显示玩家排名   否则显示未上榜
                    selfranking = (index + 1);
                }
                this.Ranking[index].active = true;
            }
            else {
                this.Ranking[index].active = false;
            }
        }
        var combatPower = 0; //HeroManager.getInstance().getAllHeroZhanli()// 1
        if (this.tag == 1) {
            combatPower = HeroManager_1.HeroManager.getInstance().getAllHeroZhanli(); //获取战力
        }
        if (this.tag == 2) {
            combatPower = EndlessLevels_1.EndlessLevelsManager.getInstance().getMaxWave(); //HeroManager.getInstance().getAllHeroZhanli()//获取波数
        }
        if (this.tag == 3) {
            combatPower = BossChallenge_1.BossChallengeManager.getInstance().getMaxDamageNumber(); //获取伤害
        }
        var CombatPower = this.RankingSelf.getChildByName("CombatPower");
        var SerialNo = this.RankingSelf.getChildByName("SerialNo");
        var name = this.RankingSelf.getChildByName("name");
        var btnAvatar = this.RankingSelf.getChildByName("headPortrait").getChildByName("btnAvatar");
        CombatPower.getComponent(TextLanguage_1.default).setTextId(this.text[this.tag - 1]); //是哪个排行榜
        CombatPower.getComponent(TextLanguage_1.default).setReplaceValue('~', (combatPower) + ''); //排行榜战力数据
        this.myselfranking = selfranking;
        if (selfranking == -1) {
            SerialNo.active = false;
            this.RankingSelf.getChildByName("Notlisted").active = true;
        }
        else {
            SerialNo.getComponent(cc.Label).string = "" + (selfranking); //序号
            SerialNo.active = true;
            this.RankingSelf.getChildByName("Notlisted").active = false;
        }
        var myname = UserData_1.default.getInstance().getUserName(); //玩家名字
        var sphea = UserData_1.default.getInstance().getUserAvatar(); //玩家头像
        name.getComponent(cc.Label).string = "" + myname; //玩家名字
        btnAvatar.getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpheadPortraitType(sphea); //头像id
    };
    RankingList.prototype.clickBtnToggle = function (even, i) {
        var _this = this;
        // console.log("+++++++",even,i)
        this.tag = i;
        HttpManager_1.HttpManager.post(HttpManager_1.AccessName.leaderboardByUser, this.getLeaderboardByUserJsonString(this.tag), true).then(function (data) {
            _this.Refresh(data);
        });
    };
    RankingList.prototype.clickBtnClose = function () {
        for (var index = 0; index < this.Ranking.length; index++) {
            this.Ranking[index].active = false;
        }
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.onClose();
    };
    RankingList.prototype.getLeaderboardByUserJsonString = function (type) {
        var uid = UserData_1.default.getInstance().getUserID();
        return JSON.stringify({
            limit: 100,
            type: type,
        });
    };
    RankingList.prototype.clickBtnRewardDisplay = function () {
        var _this = this;
        UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.RankingRewardDisplay, UIConfig_1.UILayerLevel.Three, { onCompleted: function (uiNode) {
                uiNode.getComponent(rankingrewarddisplay_1.default).init({
                    onClose: function () {
                    }
                });
                uiNode.getComponent(rankingrewarddisplay_1.default).initUi(_this.myselfranking); //排名  默认-1   
            }, });
    };
    __decorate([
        property(cc.Node)
    ], RankingList.prototype, "Rankingitme", void 0);
    __decorate([
        property(cc.Node)
    ], RankingList.prototype, "RankingSelf", void 0);
    __decorate([
        property(cc.Node)
    ], RankingList.prototype, "content", void 0);
    __decorate([
        property(cc.Node)
    ], RankingList.prototype, "ScrollView", void 0);
    __decorate([
        property(cc.Node)
    ], RankingList.prototype, "ToggleContainer", void 0);
    __decorate([
        property(cc.Node)
    ], RankingList.prototype, "Ranking_Bg_0", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], RankingList.prototype, "bgsprite", void 0);
    __decorate([
        property(cc.Node)
    ], RankingList.prototype, "btnViewAwards", void 0);
    __decorate([
        property(cc.Node)
    ], RankingList.prototype, "winText", void 0);
    RankingList = __decorate([
        ccclass
    ], RankingList);
    return RankingList;
}(UIComponent_1.default));
exports.default = RankingList;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcUmFua2luZ0xpc3RcXFJhbmtpbmdMaXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWxGLHdEQUFtRTtBQUNuRSwyREFBaUU7QUFDakUsMkRBQWlFO0FBRWpFLHVGQUFrRjtBQUVsRiw4Q0FBeUM7QUFDekMsd0RBQXVEO0FBQ3ZELDhEQUF5RDtBQUN6RCxtREFBa0Q7QUFDbEQsMERBQXFEO0FBQ3JELGlEQUE0QztBQUM1QywyQ0FBc0Q7QUFDdEQsNkNBQTRDO0FBQzVDLHdDQUFtQztBQUU3QixJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUF5QywrQkFBVztJQUFwRDtRQUFBLHFFQWtOQztRQWhORyxpQkFBVyxHQUFTLElBQUksQ0FBQSxDQUFBLE1BQU07UUFFOUIsaUJBQVcsR0FBUyxJQUFJLENBQUEsQ0FBQSxXQUFXO1FBR25DLGFBQU8sR0FBUyxJQUFJLENBQUEsQ0FBQSxLQUFLO1FBR3pCLGdCQUFVLEdBQVMsSUFBSSxDQUFBLENBQUEsSUFBSTtRQUczQixxQkFBZSxHQUFTLElBQUksQ0FBQSxDQUFBLDhCQUE4QjtRQUcxRCxrQkFBWSxHQUFTLElBQUksQ0FBQSxDQUFBLElBQUk7UUFHN0IsYUFBTyxHQUFXLEVBQUUsQ0FBQSxDQUFBLE1BQU07UUFFMUIsU0FBRyxHQUFRLEdBQUcsQ0FBQTtRQUdkLGNBQVEsR0FBa0IsRUFBRSxDQUFBLENBQUEsT0FBTztRQUVuQyxlQUFTLEdBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBQyxJQUFJLEVBQUUsQ0FBQyxL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QUksQ0FBQztnREFDRTtJQUdwQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO21EQUNLO0lBR3ZCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7d0RBQ1U7SUFHNUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztxREFDTztJQVF6QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDO2lEQUNHO0lBUzVCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7c0RBQ1E7SUFFMUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztnREFDRTtJQW5DSCxXQUFXO1FBRC9CLE9BQU87T0FDYSxXQUFXLENBa04vQjtJQUFELGtCQUFDO0NBbE5ELEFBa05DLENBbE53QyxxQkFBVyxHQWtObkQ7a0JBbE5vQixXQUFXIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuaW1wb3J0IHsgQWNjZXNzTmFtZSwgSHR0cE1hbmFnZXIgfSBmcm9tIFwiLi4vLi9OZXRXb3JrL0h0dHBNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEJvc3NDaGFsbGVuZ2VNYW5hZ2VyIH0gZnJvbSBcIi4uL0FjdGl2aXR5L0Jvc3NDaGFsbGVuZ2VcIjtcclxuaW1wb3J0IHsgRW5kbGVzc0xldmVsc01hbmFnZXIgfSBmcm9tIFwiLi4vQWN0aXZpdHkvRW5kbGVzc0xldmVsc1wiO1xyXG5pbXBvcnQgcHVyY2hhc2VzbnVtYmUgZnJvbSBcIi4uL2NvcHkvZW5kbGVzc2NoYWxsZW5nZXMvcHVyY2hhc2VzbnVtYmVcIjtcclxuaW1wb3J0IHJhbmtpbmdyZXdhcmRkaXNwbGF5IGZyb20gXCIuLi9jb3B5L2VuZGxlc3NjaGFsbGVuZ2VzL3JhbmtpbmdyZXdhcmRkaXNwbGF5XCI7XHJcbmltcG9ydCByZXdhcmRkaXNwbGF5IGZyb20gXCIuLi9jb3B5L2VuZGxlc3NjaGFsbGVuZ2VzL3Jld2FyZGRpc3BsYXlcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBIZXJvTWFuYWdlciB9IGZyb20gXCIuLi9IZXJvL0RhdGEvSGVyb01hbmFnZXJcIjtcclxuaW1wb3J0IFRleHRMYW5ndWFnZSBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9UZXh0TGFuZ3VhZ2VcIjtcclxuaW1wb3J0IHsgUHJvcE1hbmFnZXIgfSBmcm9tIFwiLi4vUHJvcC9Qcm9wTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTb3VuZEluZGV4IH0gZnJvbSBcIi4uL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBVSUNvbXBvbmVudCBmcm9tIFwiLi4vVUkvVUlDb21wb25lbnRcIjtcclxuaW1wb3J0IHsgVUlQYXRoLCBVSUxheWVyTGV2ZWwgfSBmcm9tIFwiLi4vVUkvVUlDb25maWdcIjtcclxuaW1wb3J0IHsgVUlNYW5hZ2VyIH0gZnJvbSBcIi4uL1VJL1VJTWFuYWdlclwiO1xyXG5pbXBvcnQgVXNlckRhdGEgZnJvbSBcIi4uL1VzZXJEYXRhXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJhbmtpbmdMaXN0IGV4dGVuZHMgVUlDb21wb25lbnQge1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBSYW5raW5naXRtZTpjYy5Ob2RlPW51bGwvL+aOkuihjOiKgueCuVxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBSYW5raW5nU2VsZjpjYy5Ob2RlPW51bGwvL+eOqeWutuiHquW3seeahOaOkuihjOiKgueCuVxyXG4gICAgXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGNvbnRlbnQ6Y2MuTm9kZT1udWxsLy/niLboioLngrlcclxuICAgIFxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBTY3JvbGxWaWV3OmNjLk5vZGU9bnVsbC8v5YiX6KGoXHJcbiAgICBcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgVG9nZ2xlQ29udGFpbmVyOmNjLk5vZGU9bnVsbC8v6YCJ6aG5ICAgIOaImOWKmyAgICAgIOaXoOWwveaMkeaImCAgICBib3Nz5oyR5oiYXHJcbiAgICAgICAgXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIFJhbmtpbmdfQmdfMDpjYy5Ob2RlPW51bGwvL+iDjOaZr1xyXG4gICAgXHJcblxyXG4gICAgUmFua2luZzpjYy5Ob2RlW109W10vL+aOkuihjOiKgueCuVxyXG5cclxuICAgIG1heDpudW1iZXI9MTAwXHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZUZyYW1lKVxyXG4gICAgYmdzcHJpdGU6Y2MuU3ByaXRlRnJhbWVbXT1bXS8v5YmN5LiJ55qE6IOM5pmvXHJcblxyXG4gICAgbmFtZWNvbG9yOmNjLkNvbG9yW109W25ldyBjYy5Db2xvcig5NCwgNjIsIDQxKSxuZXcgY2MuQ29sb3IoNTAsIDc1LCAxMDUpLG5ldyBjYy5Db2xvcigxMDgsIDY4LCA1NCldLy/liY3kuInnmoTlkI3lrZfpopzoibJcclxuXHJcbiAgICB0YWc6bnVtYmVyPTEvL+mAieaLqeaYvuekuueahOaOkuihjOamnCAgIOm7mOiupOaYrzEgICDngrnlh7vkuYvlkI7lj5hcclxuXHJcbiAgICB0ZXh0Om51bWJlcltdPVsxMDAxMjYsMTAwMTI4LDEwMDEyOV0vL+aImOWKmzp+5rOi5pWwOn7kvKTlrrM6flxyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgYnRuVmlld0F3YXJkczpjYy5Ob2RlPW51bGwvL+afpeeci+WlluWKseaMiemSrlxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICB3aW5UZXh0OmNjLk5vZGU9bnVsbC8v5qCH6aKYXHJcbiAgICBcclxuICAgIG15c2VsZnJhbmtpbmc6bnVtYmVyPS0xLy/njqnlrrbpu5jorqTmjpLlkI1cclxuICAgIGluaXRVaSh0eXBlKSB7Ly9cclxuICAgICAgICBmb3IgKGxldCBpdG1laW5kZXggPSB0aGlzLlJhbmtpbmcubGVuZ3RoOyBpdG1laW5kZXggPCB0aGlzLm1heDsgaXRtZWluZGV4KyspIHtcclxuICAgICAgICAgICAgbGV0IHJhbmtpbmdpdG1lPWNjLmluc3RhbnRpYXRlKHRoaXMuUmFua2luZ2l0bWUpXHJcbiAgICAgICAgICAgIHJhbmtpbmdpdG1lLnBhcmVudD10aGlzLmNvbnRlbnRcclxuICAgICAgICAgICAgdGhpcy5SYW5raW5nLnB1c2gocmFua2luZ2l0bWUpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBzZWxmcmFua2luZz0tMVxyXG4gICAgICAgIGxldCBTZXJpYWxObz10aGlzLlJhbmtpbmdTZWxmLmdldENoaWxkQnlOYW1lKFwiU2VyaWFsTm9cIilcclxuICAgICAgICBsZXQgbmFtZT10aGlzLlJhbmtpbmdTZWxmLmdldENoaWxkQnlOYW1lKFwibmFtZVwiKVxyXG4gICAgICAgIGxldCBidG5BdmF0YXI9dGhpcy5SYW5raW5nU2VsZi5nZXRDaGlsZEJ5TmFtZShcImhlYWRQb3J0cmFpdFwiKS5nZXRDaGlsZEJ5TmFtZShcImJ0bkF2YXRhclwiKVxyXG4gICAgICAgIGlmKHNlbGZyYW5raW5nPT0tMSl7XHJcbiAgICAgICAgICAgIFNlcmlhbE5vLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgICAgICB0aGlzLlJhbmtpbmdTZWxmLmdldENoaWxkQnlOYW1lKFwiTm90bGlzdGVkXCIpLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIFNlcmlhbE5vLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPVwiXCIrKHNlbGZyYW5raW5nKS8v5bqP5Y+3XHJcbiAgICAgICAgICAgIFNlcmlhbE5vLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgIHRoaXMuUmFua2luZ1NlbGYuZ2V0Q2hpbGRCeU5hbWUoXCJOb3RsaXN0ZWRcIikuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbXluYW1lPVVzZXJEYXRhLmdldEluc3RhbmNlKCkuZ2V0VXNlck5hbWUoKTsgLy/njqnlrrblkI3lrZdcclxuICAgICAgICBsZXQgc3BoZWE9VXNlckRhdGEuZ2V0SW5zdGFuY2UoKS5nZXRVc2VyQXZhdGFyKCk7Ly/njqnlrrblpLTlg49cclxuICAgICAgICBuYW1lLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPVwiXCIrbXluYW1lLy/njqnlrrblkI3lrZdcclxuICAgICAgICBidG5BdmF0YXIuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWU9UHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTcGhlYWRQb3J0cmFpdFR5cGUoc3BoZWEpLy/lpLTlg49pZFxyXG4gICAgICAgIGlmICh0eXBlID09IDIpIHtcclxuICAgICAgICAgICAgdGhpcy50YWc9MlxyXG4gICAgICAgICAgICB0aGlzLlRvZ2dsZUNvbnRhaW5lci5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAgICAgdGhpcy5idG5WaWV3QXdhcmRzLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgICAgICB0aGlzLlNjcm9sbFZpZXcueT02MFxyXG4gICAgICAgICAgICB0aGlzLlJhbmtpbmdTZWxmLnk9LTMzMFxyXG4gICAgICAgICAgICB0aGlzLlJhbmtpbmdfQmdfMC55PTYwXHJcbiAgICAgICAgICAgIHRoaXMud2luVGV4dC5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zZXRUZXh0SWQoODAwMDAzKVxyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PSAzKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGFnPTNcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVDb250YWluZXIuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMuYnRuVmlld0F3YXJkcy5hY3RpdmU9dHJ1ZS8vdHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLlNjcm9sbFZpZXcueT05MFxyXG4gICAgICAgICAgICB0aGlzLlJhbmtpbmdTZWxmLnk9LTI5OFxyXG4gICAgICAgICAgICB0aGlzLlJhbmtpbmdfQmdfMC55PTkwXHJcbiAgICAgICAgICAgIHRoaXMud2luVGV4dC5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zZXRUZXh0SWQoODAwMDEzKVxyXG4gICAgICAgIH1lbHNlIGlmKHR5cGU9PTEpe1xyXG4gICAgICAgICAgICB0aGlzLnRhZz0xXHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlQ29udGFpbmVyLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5Ub2dnbGUpLmlzQ2hlY2tlZD10cnVlXHJcbiAgICAgICAgICAgIHRoaXMuVG9nZ2xlQ29udGFpbmVyLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgIHRoaXMuYnRuVmlld0F3YXJkcy5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAgICAgdGhpcy5TY3JvbGxWaWV3Lnk9MFxyXG4gICAgICAgICAgICB0aGlzLlJhbmtpbmdTZWxmLnk9LTM4MFxyXG4gICAgICAgICAgICB0aGlzLlJhbmtpbmdfQmdfMC55PTBcclxuICAgICAgICAgICAgdGhpcy53aW5UZXh0LmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnNldFRleHRJZCgyMDAwMDYpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIEh0dHBNYW5hZ2VyLnBvc3QoQWNjZXNzTmFtZS5sZWFkZXJib2FyZEJ5VXNlcix0aGlzLmdldExlYWRlcmJvYXJkQnlVc2VySnNvblN0cmluZyh0aGlzLnRhZyksdHJ1ZSkudGhlbigoZGF0YTphbnkpID0+e1xyXG4gICAgICAgICAgICB0aGlzLlJlZnJlc2goZGF0YSk7IFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIHRoaXMuUmVmcmVzaCgpXHJcbiAgICB9XHJcbiAgICBSZWZyZXNoKGRhdGE6YW55W10pe1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuU2Nyb2xsVmlldy5nZXRDb21wb25lbnQoY2MuU2Nyb2xsVmlldykuc2Nyb2xsVG9Ub3AoMSlcclxuICAgICAgICBsZXQgc2VsZnJhbmtpbmc9LTFcclxuICAgICAgICB0aGlzLm1heCA9IGRhdGEubGVuZ3RoO1xyXG4gICAgICAgIC8v5ZCO5Y+w5ouJ5Y+W5o6S5ZCN5YmNMTAw5ZCN55qE546p5a62XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuUmFua2luZy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgaWYoaW5kZXg8dGhpcy5tYXgpe1xyXG4gICAgICAgICAgICAgICAgbGV0IENvbWJhdFBvd2VyPXRoaXMuUmFua2luZ1tpbmRleF0uZ2V0Q2hpbGRCeU5hbWUoXCJDb21iYXRQb3dlclwiKVxyXG4gICAgICAgICAgICAgICAgbGV0IFNlcmlhbE5vPXRoaXMuUmFua2luZ1tpbmRleF0uZ2V0Q2hpbGRCeU5hbWUoXCJTZXJpYWxOb1wiKVxyXG4gICAgICAgICAgICAgICAgbGV0IG5hbWU9dGhpcy5SYW5raW5nW2luZGV4XS5nZXRDaGlsZEJ5TmFtZShcIm5hbWVcIilcclxuICAgICAgICAgICAgICAgIGxldCBidG5BdmF0YXI9dGhpcy5SYW5raW5nW2luZGV4XS5nZXRDaGlsZEJ5TmFtZShcImhlYWRQb3J0cmFpdFwiKS5nZXRDaGlsZEJ5TmFtZShcImJ0bkF2YXRhclwiKVxyXG4gICAgICAgICAgICAgICAgQ29tYmF0UG93ZXIuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0VGV4dElkKHRoaXMudGV4dFt0aGlzLnRhZyAtIDFdKS8v5piv5ZOq5Liq5o6S6KGM5qacXHJcbiAgICAgICAgICAgICAgICBDb21iYXRQb3dlci5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zZXRSZXBsYWNlVmFsdWUoJ34nLChkYXRhW2luZGV4XS52YWx1ZSkrJycpOy8v5o6S6KGM5qac5oiY5Yqb5pWw5o2uXHJcbiAgICAgICAgICAgICAgICBTZXJpYWxOby5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1cIlwiKyhpbmRleCsxKS8v5bqP5Y+3XHJcbiAgICAgICAgICAgICAgICBuYW1lLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPWRhdGFbaW5kZXhdLm5hbWUvL+eOqeWutuWQjeWtl1xyXG4gICAgICAgICAgICAgICAgYnRuQXZhdGFyLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3BoZWFkUG9ydHJhaXRUeXBlKGRhdGFbaW5kZXhdLmF2YXRhcklkKS8v5aS05YOPaWRcclxuICAgICAgICAgICAgICAgIGlmKGluZGV4PDMpe1xyXG4gICAgICAgICAgICAgICAgICAgIFNlcmlhbE5vLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuUmFua2luZ1tpbmRleF0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWU9dGhpcy5iZ3Nwcml0ZVtpbmRleF0vL+WJjeS4ieWQjeeahOiDjOaZr+S4jeS4gOagt1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWUuY29sb3I9dGhpcy5uYW1lY29sb3JbaW5kZXhdXHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBTZXJpYWxOby5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYoZGF0YVtpbmRleF0udWlkPT1Vc2VyRGF0YS5nZXRJbnN0YW5jZSgpLmdldFVzZXJJRCgpKXsgICAgLy/lpoLmnpzlnKjlkI7lj7Dmi4nlj5bnmoTmjpLlkI3kuK3mnIlpZOi3n+eOqeWutueahGlk5LiA5qC377yM6YKj5LmI546p5a6255qE5o6S5ZCN5Zyo5YmNMTAw5ZCN5LitICDlsIbmmL7npLrnjqnlrrbmjpLlkI0gICDlkKbliJnmmL7npLrmnKrkuIrmppxcclxuICAgICAgICAgICAgICAgICAgICBzZWxmcmFua2luZz0oaW5kZXgrMSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuUmFua2luZ1tpbmRleF0uYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlJhbmtpbmdbaW5kZXhdLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBjb21iYXRQb3dlcj0wLy9IZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEFsbEhlcm9aaGFubGkoKS8vIDFcclxuICAgICAgICBpZih0aGlzLnRhZz09MSl7XHJcbiAgICAgICAgICAgIGNvbWJhdFBvd2VyPUhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0QWxsSGVyb1poYW5saSgpLy/ojrflj5bmiJjliptcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy50YWc9PTIpe1xyXG4gICAgICAgICAgICBjb21iYXRQb3dlcj1FbmRsZXNzTGV2ZWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1heFdhdmUoKS8vSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRBbGxIZXJvWmhhbmxpKCkvL+iOt+WPluazouaVsFxyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLnRhZz09Myl7XHJcbiAgICAgICAgICAgIGNvbWJhdFBvd2VyPUJvc3NDaGFsbGVuZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWF4RGFtYWdlTnVtYmVyKCkvL+iOt+WPluS8pOWus1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IENvbWJhdFBvd2VyPXRoaXMuUmFua2luZ1NlbGYuZ2V0Q2hpbGRCeU5hbWUoXCJDb21iYXRQb3dlclwiKVxyXG4gICAgICAgIGxldCBTZXJpYWxObz10aGlzLlJhbmtpbmdTZWxmLmdldENoaWxkQnlOYW1lKFwiU2VyaWFsTm9cIilcclxuICAgICAgICBsZXQgbmFtZT10aGlzLlJhbmtpbmdTZWxmLmdldENoaWxkQnlOYW1lKFwibmFtZVwiKVxyXG4gICAgICAgIGxldCBidG5BdmF0YXI9dGhpcy5SYW5raW5nU2VsZi5nZXRDaGlsZEJ5TmFtZShcImhlYWRQb3J0cmFpdFwiKS5nZXRDaGlsZEJ5TmFtZShcImJ0bkF2YXRhclwiKVxyXG4gICAgICAgIENvbWJhdFBvd2VyLmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnNldFRleHRJZCh0aGlzLnRleHRbdGhpcy50YWcgLSAxXSkvL+aYr+WTquS4quaOkuihjOamnFxyXG4gICAgICAgIENvbWJhdFBvd2VyLmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnNldFJlcGxhY2VWYWx1ZSgnficsKGNvbWJhdFBvd2VyKSsnJyk7Ly/mjpLooYzmppzmiJjlipvmlbDmja5cclxuXHJcbiAgICAgICAgdGhpcy5teXNlbGZyYW5raW5nPXNlbGZyYW5raW5nXHJcbiAgICAgICAgaWYoc2VsZnJhbmtpbmc9PS0xKXtcclxuICAgICAgICAgICAgU2VyaWFsTm8uYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMuUmFua2luZ1NlbGYuZ2V0Q2hpbGRCeU5hbWUoXCJOb3RsaXN0ZWRcIikuYWN0aXZlPXRydWVcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgU2VyaWFsTm8uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9XCJcIisoc2VsZnJhbmtpbmcpLy/luo/lj7dcclxuICAgICAgICAgICAgU2VyaWFsTm8uYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgdGhpcy5SYW5raW5nU2VsZi5nZXRDaGlsZEJ5TmFtZShcIk5vdGxpc3RlZFwiKS5hY3RpdmU9ZmFsc2VcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBteW5hbWU9VXNlckRhdGEuZ2V0SW5zdGFuY2UoKS5nZXRVc2VyTmFtZSgpOyAvL+eOqeWutuWQjeWtl1xyXG4gICAgICAgIGxldCBzcGhlYT1Vc2VyRGF0YS5nZXRJbnN0YW5jZSgpLmdldFVzZXJBdmF0YXIoKTsvL+eOqeWutuWktOWDj1xyXG4gICAgICAgIG5hbWUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9XCJcIitteW5hbWUvL+eOqeWutuWQjeWtl1xyXG4gICAgICAgIGJ0bkF2YXRhci5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZT1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNwaGVhZFBvcnRyYWl0VHlwZShzcGhlYSkvL+WktOWDj2lkXHJcbiAgICB9XHJcbiAgICBjbGlja0J0blRvZ2dsZShldmVuLGkpey8v5Y2V6YCJ5oyJ6ZKu55qE6YCJ5oupXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCIrKysrKysrXCIsZXZlbixpKVxyXG4gICAgICAgIHRoaXMudGFnPWlcclxuICAgICAgICBIdHRwTWFuYWdlci5wb3N0KEFjY2Vzc05hbWUubGVhZGVyYm9hcmRCeVVzZXIsdGhpcy5nZXRMZWFkZXJib2FyZEJ5VXNlckpzb25TdHJpbmcodGhpcy50YWcpLHRydWUpLnRoZW4oKGRhdGE6YW55KSA9PntcclxuICAgICAgICAgICAgdGhpcy5SZWZyZXNoKGRhdGEpOyBcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGNsaWNrQnRuQ2xvc2UoKS8v5YWz6ZetXHJcbiAgICB7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuUmFua2luZy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgdGhpcy5SYW5raW5nW2luZGV4XS5hY3RpdmU9ZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICB0aGlzLm9uQ2xvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldExlYWRlcmJvYXJkQnlVc2VySnNvblN0cmluZyh0eXBlOm51bWJlcik6c3RyaW5ne1xyXG4gICAgICAgIGxldCB1aWQ9VXNlckRhdGEuZ2V0SW5zdGFuY2UoKS5nZXRVc2VySUQoKTtcclxuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICBsaW1pdDoxMDAsXHJcbiAgICAgICAgICAgIHR5cGU6dHlwZSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjbGlja0J0blJld2FyZERpc3BsYXkoKXsvL+WlluWKseWxleekulxyXG4gICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguUmFua2luZ1Jld2FyZERpc3BsYXksVUlMYXllckxldmVsLlRocmVlLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+IHtcclxuICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChyYW5raW5ncmV3YXJkZGlzcGxheSkuaW5pdCh7XHJcbiAgICAgICAgICAgICAgICBvbkNsb3NlOigpPT57XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KHJhbmtpbmdyZXdhcmRkaXNwbGF5KS5pbml0VWkodGhpcy5teXNlbGZyYW5raW5nKS8v5o6S5ZCNICDpu5jorqQtMSAgIFxyXG4gICAgICAgIH0sfSk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG4gICAgLy8gQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgLy8gbGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICAvLyBAcHJvcGVydHlcclxuICAgIC8vIHRleHQ6IHN0cmluZyA9ICdoZWxsbyc7XHJcblxyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcblxyXG4gICAgLy8gb25Mb2FkICgpIHt9XHJcblxyXG4gICAgLy8gc3RhcnQgKCkge1xyXG5cclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxyXG59XHJcbiJdfQ==