
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/copy/endlesschallenges/MoppingUp.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'bf30fk/+rBGAbap3dl90CQo', 'MoppingUp');
// Scripts/copy/endlesschallenges/MoppingUp.ts

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
var BossChallenge_1 = require("../../Activity/BossChallenge");
var BossReward_1 = require("../../Activity/BossReward");
var EndlessLevels_1 = require("../../Activity/EndlessLevels");
var EndlessReward_1 = require("../../Activity/EndlessReward");
var GameManager_1 = require("../../GameManager");
var TextLanguage_1 = require("../../multiLanguage/TextLanguage");
var PropManager_1 = require("../../Prop/PropManager");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var StorageConfig_1 = require("../../Storage/StorageConfig");
var StorageManager_1 = require("../../Storage/StorageManager");
var EventManager_1 = require("../../Tools/EventManager");
var UIComponent_1 = require("../../UI/UIComponent");
var endlesschallenges_1 = require("./endlesschallenges");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MoppingUp = /** @class */ (function (_super) {
    __extends(MoppingUp, _super);
    function MoppingUp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.item = [];
        _this.bttxt = null;
        _this.text = null;
        _this.num = null;
        _this.RewardItem = 0;
        _this.RewardNum = 0;
        _this.RewardItem1 = 0;
        _this.RewardNum1 = 0;
        _this.type = 0; //2:无尽挑战   3：boss挑战
        _this.othernode = null; //刷新父节点的排行榜
        return _this;
        // LIFE-CYCLE CALLBACKS:
        // onLoad () {}
        // start () {
        // }
        // update (dt) {}
    }
    MoppingUp.prototype.initUi = function (type, othernode) {
        this.type = type;
        this.othernode = othernode;
        // GameManager.getInstance().music_manager.playMusic(MusicIndex.BGM_TJP);
        // FollowManager.getInstance().followEvent(Follow_Type.铁匠铺打开次数);
        if (type == 2) {
            var damage = EndlessLevels_1.EndlessLevelsManager.getInstance().getMaxWave(); //TheStorageManager.getInstance().getNumber(StorageKey.UnlimitedChallengeDamage,0);
            if (damage > EndlessReward_1.EndlessRewardManager.getMaxRewardLevel()) {
                damage = EndlessReward_1.EndlessRewardManager.getMaxRewardLevel();
            }
            var RewardItem = EndlessReward_1.EndlessRewardManager.getInstance().getRewardItem(damage);
            var RewardNum = EndlessReward_1.EndlessRewardManager.getInstance().getRewardNum(damage);
            this.RewardItem = RewardItem;
            this.RewardNum = RewardNum;
            var items = PropManager_1.PropManager.getInstance().createPropItem(RewardItem, RewardNum);
            this.item[0].x = 0;
            items.parent = this.item[0];
            this.text.getComponent(TextLanguage_1.default).setTextId(800016); //上次波数
            this.bttxt.getComponent(TextLanguage_1.default).setTextId(800015); //上次波数
            var mynum = damage;
            this.num.getComponent(cc.Label).string = "" + mynum;
        }
        else if (type == 3) {
            var damage = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.BossChallengeDamage, -1); //BossChallengeManager.getInstance().getMaxDamageNumber()//S
            var RewardLevel = BossReward_1.BossRewardManager.getInstance().getRewardLevel(damage);
            var RewardItem = BossReward_1.BossRewardManager.getInstance().getRewardItem(RewardLevel);
            var RewardNum = BossReward_1.BossRewardManager.getInstance().getRewardNum(RewardLevel);
            this.RewardItem = RewardItem;
            this.RewardNum = RewardNum;
            var items = PropManager_1.PropManager.getInstance().createPropItem(RewardItem, RewardNum);
            this.item[0].x = -80;
            items.parent = this.item[0];
            var RewardItem1 = BossReward_1.BossRewardManager.getInstance().getRewardItem_2(RewardLevel);
            var RewardNum1 = BossReward_1.BossRewardManager.getInstance().getRewardNum_2(RewardLevel);
            this.RewardItem1 = RewardItem1;
            this.RewardNum1 = RewardNum1;
            var items1 = PropManager_1.PropManager.getInstance().createPropItem(RewardItem1, RewardNum1);
            this.item[1].x = 80;
            items1.parent = this.item[1];
            this.text.getComponent(TextLanguage_1.default).setTextId(820015); //上次伤害
            this.bttxt.getComponent(TextLanguage_1.default).setTextId(820014); //上次伤害
            var mynum = damage;
            this.num.getComponent(cc.Label).string = "" + mynum;
        }
    };
    MoppingUp.prototype.clickBtnYes = function () {
        var num;
        var totalnum;
        if (this.type == 2) {
            totalnum = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TotalUnlimitedChallengeTimes, 0);
            num = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.UnlimitedChallengeTimes, 3);
            num--;
            totalnum++;
            StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TotalUnlimitedChallengeTimes, totalnum);
            StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.UnlimitedChallengeTimes, num);
            PropManager_1.PropManager.getInstance().changePropNum(this.RewardItem, this.RewardNum);
            var items = PropManager_1.PropManager.getInstance().createPropItem(this.RewardItem, this.RewardNum);
            GameManager_1.default.getInstance().showGetTip(items);
        }
        else if (this.type == 3) {
            var damage = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.BossChallengeDamage, -1);
            var zon = damage + BossChallenge_1.BossChallengeManager.getInstance().getMaxDamageNumber();
            BossChallenge_1.BossChallengeManager.getInstance().setDamageNumber(zon); //游戏胜利之后保存
            totalnum = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TotalBossChallengeTimes, 0);
            num = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.BossChallengeTimes, 3);
            num--;
            totalnum++;
            StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TotalBossChallengeTimes, totalnum);
            StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.BossChallengeTimes, num);
            this.othernode.getComponent(endlesschallenges_1.default).initUi(3);
            PropManager_1.PropManager.getInstance().changePropNum(this.RewardItem, this.RewardNum);
            PropManager_1.PropManager.getInstance().changePropNum(this.RewardItem1, this.RewardNum1);
            var items = PropManager_1.PropManager.getInstance().createPropItem(this.RewardItem, this.RewardNum);
            var items1 = PropManager_1.PropManager.getInstance().createPropItem(this.RewardItem1, this.RewardNum1);
            GameManager_1.default.getInstance().showMultipleGetTip([items, items1]);
        }
        this.clickBtnClose();
        EventManager_1.EventManager.postRedEvent(EventManager_1.RedEventString.RED_CHECK, EventManager_1.RedEventType.Btn_Activity);
    };
    MoppingUp.prototype.shanchu = function () {
        for (var index = 0; index < this.item.length; index++) {
            if (this.item[index].childrenCount > 0) {
                this.item[index].children[0].destroy();
            }
        }
    };
    MoppingUp.prototype.clickBtnClose = function () {
        this.shanchu();
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.onClose();
    };
    __decorate([
        property(cc.Node)
    ], MoppingUp.prototype, "item", void 0);
    __decorate([
        property(cc.Node)
    ], MoppingUp.prototype, "bttxt", void 0);
    __decorate([
        property(cc.Node)
    ], MoppingUp.prototype, "text", void 0);
    __decorate([
        property(cc.Node)
    ], MoppingUp.prototype, "num", void 0);
    MoppingUp = __decorate([
        ccclass
    ], MoppingUp);
    return MoppingUp;
}(UIComponent_1.default));
exports.default = MoppingUp;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcY29weVxcZW5kbGVzc2NoYWxsZW5nZXNcXE1vcHBpbmdVcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVsRiw4REFBb0U7QUFDcEUsd0RBQThEO0FBQzlELDhEQUFvRTtBQUNwRSw4REFBb0U7QUFDcEUsaURBQTRDO0FBQzVDLGlFQUE0RDtBQUU1RCxzREFBcUQ7QUFDckQsNkRBQXdEO0FBQ3hELDZEQUF5RDtBQUN6RCwrREFBaUU7QUFDakUseURBQXNGO0FBQ3RGLG9EQUErQztBQUMvQyx5REFBb0Q7QUFFOUMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBdUMsNkJBQVc7SUFBbEQ7UUFBQSxxRUE2SEM7UUEzSEcsVUFBSSxHQUFjLEVBQUUsQ0FBQTtRQUdwQixXQUFLLEdBQVksSUFBSSxDQUFBO1FBRXJCLFVBQUksR0FBWSxJQUFJLENBQUE7UUFFcEIsU0FBRyxHQUFZLElBQUksQ0FBQTtRQUNuQixnQkFBVSxHQUFRLENBQUMsQ0FBQTtRQUNuQixlQUFTLEdBQVEsQ0FBQyxDQUFBO1FBRWxCLGlCQUFXLEdBQVEsQ0FBQyxDQUFBO1FBQ3BCLGdCQUFVLEdBQVEsQ0FBQyxDQUFBO1FBQ25CLFVBQUksR0FBVyxDQUFDLENBQUEsQ0FBQSxtQkFBbUI7UUFFbkMsZUFBUyxHQUFTLElBQUksQ0FBQSxDQUFBLFdBQVc7O1FBbUdqQyx3QkFBd0I7UUFFeEIsZUFBZTtRQUVmLGFBQWE7UUFFYixJQUFJO1FBRUosaUJBQWlCO0lBQ3JCLENBQUM7SUEzR0csMEJBQU0sR0FBTixVQUFPLElBQUksRUFBQyxTQUFVO1FBQ2xCLElBQUksQ0FBQyxJ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QUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFO1lBQ25ELElBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxhQUFhLEdBQUMsQ0FBQyxFQUFDO2dCQUNoQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQTthQUN6QztTQUNKO0lBQ0wsQ0FBQztJQUVELGlDQUFhLEdBQWI7UUFFSSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUE7UUFDZCxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsMkJBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwRSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQWpIRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzJDQUNFO0lBR3BCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7NENBQ0c7SUFFckI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzsyQ0FDRTtJQUVwQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzBDQUNDO0lBVEYsU0FBUztRQUQ3QixPQUFPO09BQ2EsU0FBUyxDQTZIN0I7SUFBRCxnQkFBQztDQTdIRCxBQTZIQyxDQTdIc0MscUJBQVcsR0E2SGpEO2tCQTdIb0IsU0FBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuXHJcbmltcG9ydCB7IEJvc3NDaGFsbGVuZ2VNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0FjdGl2aXR5L0Jvc3NDaGFsbGVuZ2VcIjtcclxuaW1wb3J0IHsgQm9zc1Jld2FyZE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vQWN0aXZpdHkvQm9zc1Jld2FyZFwiO1xyXG5pbXBvcnQgeyBFbmRsZXNzTGV2ZWxzTWFuYWdlciB9IGZyb20gXCIuLi8uLi9BY3Rpdml0eS9FbmRsZXNzTGV2ZWxzXCI7XHJcbmltcG9ydCB7IEVuZGxlc3NSZXdhcmRNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0FjdGl2aXR5L0VuZGxlc3NSZXdhcmRcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi8uLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgVGV4dExhbmd1YWdlIGZyb20gXCIuLi8uLi9tdWx0aUxhbmd1YWdlL1RleHRMYW5ndWFnZVwiO1xyXG5pbXBvcnQgeyBQcm9wSWQgfSBmcm9tIFwiLi4vLi4vUHJvcC9Qcm9wQ29uZmlnXCI7XHJcbmltcG9ydCB7IFByb3BNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL1Byb3AvUHJvcE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU291bmRJbmRleCB9IGZyb20gXCIuLi8uLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBTdG9yYWdlS2V5IH0gZnJvbSBcIi4uLy4uL1N0b3JhZ2UvU3RvcmFnZUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBUaGVTdG9yYWdlTWFuYWdlciB9IGZyb20gXCIuLi8uLi9TdG9yYWdlL1N0b3JhZ2VNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEV2ZW50TWFuYWdlciwgUmVkRXZlbnRTdHJpbmcsIFJlZEV2ZW50VHlwZSB9IGZyb20gXCIuLi8uLi9Ub29scy9FdmVudE1hbmFnZXJcIjtcclxuaW1wb3J0IFVJQ29tcG9uZW50IGZyb20gXCIuLi8uLi9VSS9VSUNvbXBvbmVudFwiO1xyXG5pbXBvcnQgZW5kbGVzc2NoYWxsZW5nZXMgZnJvbSBcIi4vZW5kbGVzc2NoYWxsZW5nZXNcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb3BwaW5nVXAgZXh0ZW5kcyBVSUNvbXBvbmVudCB7ICAgIFxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBpdGVtOiBjYy5Ob2RlW10gPSBbXVxyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgYnR0eHQ6IGNjLk5vZGUgPSBudWxsXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHRleHQ6IGNjLk5vZGUgPSBudWxsXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIG51bTogY2MuTm9kZSA9IG51bGxcclxuICAgIFJld2FyZEl0ZW06bnVtYmVyPTBcclxuICAgIFJld2FyZE51bTpudW1iZXI9MFxyXG5cclxuICAgIFJld2FyZEl0ZW0xOm51bWJlcj0wXHJcbiAgICBSZXdhcmROdW0xOm51bWJlcj0wXHJcbiAgICB0eXBlOiBudW1iZXIgPSAwLy8yOuaXoOWwveaMkeaImCAgIDPvvJpib3Nz5oyR5oiYXHJcblxyXG4gICAgb3RoZXJub2RlOmNjLk5vZGU9bnVsbC8v5Yi35paw54i26IqC54K555qE5o6S6KGM5qacXHJcbiAgICBpbml0VWkodHlwZSxvdGhlcm5vZGU/KSB7Ly8yOuaXoOWwveaMkeaImCAgIDPvvJpib3Nz5oyR5oiYXHJcbiAgICAgICAgdGhpcy50eXBlPXR5cGVcclxuICAgICAgICB0aGlzLm90aGVybm9kZT1vdGhlcm5vZGVcclxuICAgICAgICAvLyBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLm11c2ljX21hbmFnZXIucGxheU11c2ljKE11c2ljSW5kZXguQkdNX1RKUCk7XHJcbiAgICAgICAgLy8gRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLumTgeWMoOmTuuaJk+W8gOasoeaVsCk7XHJcbiAgICAgICAgaWYgKHR5cGUgPT0gMikge1xyXG4gICAgICAgICAgICBsZXQgZGFtYWdlPUVuZGxlc3NMZXZlbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWF4V2F2ZSgpLy9UaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlVubGltaXRlZENoYWxsZW5nZURhbWFnZSwwKTtcclxuICAgICAgICAgICAgaWYoZGFtYWdlPkVuZGxlc3NSZXdhcmRNYW5hZ2VyLmdldE1heFJld2FyZExldmVsKCkpe1xyXG4gICAgICAgICAgICAgICAgZGFtYWdlPUVuZGxlc3NSZXdhcmRNYW5hZ2VyLmdldE1heFJld2FyZExldmVsKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgUmV3YXJkSXRlbT1FbmRsZXNzUmV3YXJkTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFJld2FyZEl0ZW0oZGFtYWdlKVxyXG4gICAgICAgICAgICBsZXQgUmV3YXJkTnVtPUVuZGxlc3NSZXdhcmRNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UmV3YXJkTnVtKGRhbWFnZSlcclxuICAgICAgICAgICAgdGhpcy5SZXdhcmRJdGVtPVJld2FyZEl0ZW1cclxuICAgICAgICAgICAgdGhpcy5SZXdhcmROdW09UmV3YXJkTnVtXHJcbiAgICAgICAgICAgIGxldCBpdGVtcz1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKFJld2FyZEl0ZW0sUmV3YXJkTnVtKTtcclxuICAgICAgICAgICAgdGhpcy5pdGVtWzBdLng9MFxyXG4gICAgICAgICAgICBpdGVtcy5wYXJlbnQ9dGhpcy5pdGVtWzBdXHJcbiAgICAgICAgICAgIHRoaXMudGV4dC5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zZXRUZXh0SWQoODAwMDE2KS8v5LiK5qyh5rOi5pWwXHJcbiAgICAgICAgICAgIHRoaXMuYnR0eHQuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0VGV4dElkKDgwMDAxNSkvL+S4iuasoeazouaVsFxyXG4gICAgICAgICAgICBsZXQgbXludW09ZGFtYWdlXHJcbiAgICAgICAgICAgIHRoaXMubnVtLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPVwiXCIrbXludW1cclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT0gMykge1xyXG4gICAgICAgICAgICBsZXQgZGFtYWdlPVRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuQm9zc0NoYWxsZW5nZURhbWFnZSwtMSk7Ly9Cb3NzQ2hhbGxlbmdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1heERhbWFnZU51bWJlcigpLy9TXHJcbiAgICAgICAgICAgIGxldCBSZXdhcmRMZXZlbD1Cb3NzUmV3YXJkTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFJld2FyZExldmVsKGRhbWFnZSlcclxuICAgICAgICAgICAgbGV0IFJld2FyZEl0ZW09Qm9zc1Jld2FyZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRSZXdhcmRJdGVtKFJld2FyZExldmVsKVxyXG4gICAgICAgICAgICBsZXQgUmV3YXJkTnVtPUJvc3NSZXdhcmRNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UmV3YXJkTnVtKFJld2FyZExldmVsKVxyXG4gICAgICAgICAgICB0aGlzLlJld2FyZEl0ZW09UmV3YXJkSXRlbVxyXG4gICAgICAgICAgICB0aGlzLlJld2FyZE51bT1SZXdhcmROdW1cclxuICAgICAgICAgICAgbGV0IGl0ZW1zPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oUmV3YXJkSXRlbSxSZXdhcmROdW0pO1xyXG4gICAgICAgICAgICB0aGlzLml0ZW1bMF0ueD0tODBcclxuICAgICAgICAgICAgaXRlbXMucGFyZW50PXRoaXMuaXRlbVswXVxyXG5cclxuICAgICAgICAgICAgbGV0IFJld2FyZEl0ZW0xPUJvc3NSZXdhcmRNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UmV3YXJkSXRlbV8yKFJld2FyZExldmVsKVxyXG4gICAgICAgICAgICBsZXQgUmV3YXJkTnVtMT1Cb3NzUmV3YXJkTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFJld2FyZE51bV8yKFJld2FyZExldmVsKVxyXG4gICAgICAgICAgICB0aGlzLlJld2FyZEl0ZW0xPVJld2FyZEl0ZW0xXHJcbiAgICAgICAgICAgIHRoaXMuUmV3YXJkTnVtMT1SZXdhcmROdW0xXHJcbiAgICAgICAgICAgIGxldCBpdGVtczE9UHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShSZXdhcmRJdGVtMSxSZXdhcmROdW0xKTtcclxuICAgICAgICAgICAgdGhpcy5pdGVtWzFdLng9ODBcclxuICAgICAgICAgICAgaXRlbXMxLnBhcmVudD10aGlzLml0ZW1bMV1cclxuXHJcbiAgICAgICAgICAgIHRoaXMudGV4dC5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zZXRUZXh0SWQoODIwMDE1KS8v5LiK5qyh5Lyk5a6zXHJcbiAgICAgICAgICAgIHRoaXMuYnR0eHQuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0VGV4dElkKDgyMDAxNCkvL+S4iuasoeS8pOWus1xyXG4gICAgICAgICAgICBsZXQgbXludW09ZGFtYWdlXHJcbiAgICAgICAgICAgIHRoaXMubnVtLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPVwiXCIrbXludW1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjbGlja0J0blllcygpey8v56Gu6K6k5omr6I2hXHJcbiAgICAgICAgbGV0IG51bVxyXG4gICAgICAgIGxldCB0b3RhbG51bVxyXG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT0gMikge1xyXG4gICAgICAgICAgICB0b3RhbG51bT1UaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlRvdGFsVW5saW1pdGVkQ2hhbGxlbmdlVGltZXMsMCk7XHJcbiAgICAgICAgICAgIG51bSA9IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVW5saW1pdGVkQ2hhbGxlbmdlVGltZXMsMyk7XHJcbiAgICAgICAgICAgIG51bS0tO1xyXG4gICAgICAgICAgICB0b3RhbG51bSsrXHJcbiAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LlRvdGFsVW5saW1pdGVkQ2hhbGxlbmdlVGltZXMsdG90YWxudW0pO1xyXG4gICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5VbmxpbWl0ZWRDaGFsbGVuZ2VUaW1lcyxudW0pO1xyXG5cclxuICAgICAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKHRoaXMuUmV3YXJkSXRlbSx0aGlzLlJld2FyZE51bSk7XHJcbiAgICAgICAgICAgIGxldCBpdGVtcz1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKHRoaXMuUmV3YXJkSXRlbSx0aGlzLlJld2FyZE51bSk7XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0dldFRpcChpdGVtcyk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnR5cGUgPT0gMykge1xyXG4gICAgICAgICAgICBsZXQgZGFtYWdlPVRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuQm9zc0NoYWxsZW5nZURhbWFnZSwtMSk7XHJcbiAgICAgICAgICAgIGxldCB6b249ZGFtYWdlK0Jvc3NDaGFsbGVuZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWF4RGFtYWdlTnVtYmVyKClcclxuICAgICAgICAgICAgQm9zc0NoYWxsZW5nZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXREYW1hZ2VOdW1iZXIoem9uKS8v5ri45oiP6IOc5Yip5LmL5ZCO5L+d5a2YXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0b3RhbG51bT1UaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlRvdGFsQm9zc0NoYWxsZW5nZVRpbWVzLDApO1xyXG4gICAgICAgICAgICBudW0gPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LkJvc3NDaGFsbGVuZ2VUaW1lcywzKTtcclxuICAgICAgICAgICAgbnVtLS07XHJcbiAgICAgICAgICAgIHRvdGFsbnVtKytcclxuICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuVG90YWxCb3NzQ2hhbGxlbmdlVGltZXMsdG90YWxudW0pO1xyXG4gICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5Cb3NzQ2hhbGxlbmdlVGltZXMsbnVtKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMub3RoZXJub2RlLmdldENvbXBvbmVudChlbmRsZXNzY2hhbGxlbmdlcykuaW5pdFVpKDMpXHJcblxyXG4gICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0odGhpcy5SZXdhcmRJdGVtLHRoaXMuUmV3YXJkTnVtKTtcclxuICAgICAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKHRoaXMuUmV3YXJkSXRlbTEsdGhpcy5SZXdhcmROdW0xKTtcclxuICAgICAgICAgICAgbGV0IGl0ZW1zPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0odGhpcy5SZXdhcmRJdGVtLHRoaXMuUmV3YXJkTnVtKTtcclxuICAgICAgICAgICAgbGV0IGl0ZW1zMT1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKHRoaXMuUmV3YXJkSXRlbTEsdGhpcy5SZXdhcmROdW0xKTtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TXVsdGlwbGVHZXRUaXAoW2l0ZW1zLGl0ZW1zMV0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jbGlja0J0bkNsb3NlKClcclxuICAgICAgICBFdmVudE1hbmFnZXIucG9zdFJlZEV2ZW50KFJlZEV2ZW50U3RyaW5nLlJFRF9DSEVDSyxSZWRFdmVudFR5cGUuQnRuX0FjdGl2aXR5KTtcclxuICAgIH1cclxuICAgIHNoYW5jaHUoKXtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5pdGVtLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBpZih0aGlzLml0ZW1baW5kZXhdLmNoaWxkcmVuQ291bnQ+MCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLml0ZW1baW5kZXhdLmNoaWxkcmVuWzBdLmRlc3Ryb3koKSAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5DbG9zZSgpLy/lhbPpl61cclxuICAgIHtcclxuICAgICAgICB0aGlzLnNoYW5jaHUoKVxyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgdGhpcy5vbkNsb3NlKCk7XHJcbiAgICB9XHJcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuXHJcbiAgICAvLyBvbkxvYWQgKCkge31cclxuXHJcbiAgICAvLyBzdGFydCAoKSB7XHJcblxyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XHJcbn1cclxuIl19