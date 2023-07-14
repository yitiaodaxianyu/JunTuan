
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Tower/TowerFightingUi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '040d7VrFbhFLoEAAH9lkMKD', 'TowerFightingUi');
// Scripts/Tower/TowerFightingUi.ts

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
var ApkManager_1 = require("../Ads/ApkManager");
var GameManager_1 = require("../GameManager");
var MonsterIconManager_1 = require("../Monster/MonsterIconManager");
var PropManager_1 = require("../Prop/PropManager");
var AudioConstants_1 = require("../Sound/AudioConstants");
var UIComponent_1 = require("../UI/UIComponent");
var TowerLevel_1 = require("./TowerLevel");
var TowerReward_1 = require("./TowerReward");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TowerFightingUi = /** @class */ (function (_super) {
    __extends(TowerFightingUi, _super);
    function TowerFightingUi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TowerFightingUi.prototype.init = function (uiAc) {
        _super.prototype.init.call(this, uiAc);
    };
    TowerFightingUi.prototype.initData = function (level) {
        var data = TowerLevel_1.TowerLevelManager.getInstance().getFightingInfo(level);
        var content = this.node.getChildByName("monsterScrollView").getComponent(cc.ScrollView).content;
        data.getOnlyMonsterDataList().forEach(function (v, k) {
            // 怪物id列表
            var icon = MonsterIconManager_1.MonsterIconManager.getInstance().createMonsterIcon(v.id, v.level);
            content.addChild(icon);
        });
        var rewardData = TowerReward_1.TowerRewardManager.getInstance().getRewardDatas(level);
        content = this.node.getChildByName("rewardsScrollView").getComponent(cc.ScrollView).content;
        rewardData.forEach(function (v, k) {
            var item = PropManager_1.PropManager.getInstance().createPropItem(v.reward_id, v.reward_num);
            content.addChild(item);
        });
    };
    TowerFightingUi.prototype.clickBtnClose = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.destroySelf();
    };
    TowerFightingUi.prototype.destroySelf = function () {
        _super.prototype.onClose.call(this);
        ApkManager_1.default.getInstance().closeBanner();
        // EventManager.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Main_SignIn);
    };
    TowerFightingUi = __decorate([
        ccclass
    ], TowerFightingUi);
    return TowerFightingUi;
}(UIComponent_1.default));
exports.default = TowerFightingUi;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVG93ZXJcXFRvd2VyRmlnaHRpbmdVaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnREFBMkM7QUFDM0MsOENBQXlDO0FBQ3pDLG9FQUFtRTtBQUNuRSxtREFBa0Q7QUFDbEQsMERBQXFEO0FBQ3JELGlEQUE0QztBQUU1QywyQ0FBaUQ7QUFDakQsNkNBQW1EO0FBRTdDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQTZDLG1DQUFXO0lBQXhEOztJQW1DQSxDQUFDO0lBakNHLDhCQUFJLEdBQUosVUFBSyxJQUFjO1FBQ2YsaUJBQU0sSUFBSSxZQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3BCLENBQUM7SUFFRCxrQ0FBUSxHQUFSLFVBQVMsS0FBWTtRQUNqQixJQUFJLElBQUksR0FBRyw4QkFBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDakUsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQztRQUNoRyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQyxPQUFPLENBQUMsVUFBQyxDQUFDLEVBQUMsQ0FBQztZQUN0QyxTQUFTO1lBQ1QsSUFBSSxJQUFJLEdBQUMsdUNBQWtCLENBQUMsV0FBVyxFQUFFLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDMUUsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksVUFBVSxHQUFDLGdDQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN0RSxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQztRQUM1RixVQUFVLENBQUMsT0FBTyxDQUFDLFVBQUMsQ0FBQyxFQUFDLENBQUM7WUFDbkIsSUFBSSxJQUFJLEdBQUcseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDOUUsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCx1Q0FBYSxHQUFiO1FBRUkscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLDJCQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEUsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxxQ0FBVyxHQUFYO1FBRUksaUJBQU0sT0FBTyxXQUFFLENBQUM7UUFDaEIsb0JBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN2QyxvRkFBb0Y7SUFDeEYsQ0FBQztJQWpDZ0IsZUFBZTtRQURuQyxPQUFPO09BQ2EsZUFBZSxDQW1DbkM7SUFBRCxzQkFBQztDQW5DRCxBQW1DQyxDQW5DNEMscUJBQVcsR0FtQ3ZEO2tCQW5Db0IsZUFBZSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBcGtNYW5hZ2VyIGZyb20gXCIuLi9BZHMvQXBrTWFuYWdlclwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IE1vbnN0ZXJJY29uTWFuYWdlciB9IGZyb20gXCIuLi9Nb25zdGVyL01vbnN0ZXJJY29uTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBQcm9wTWFuYWdlciB9IGZyb20gXCIuLi9Qcm9wL1Byb3BNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFNvdW5kSW5kZXggfSBmcm9tIFwiLi4vU291bmQvQXVkaW9Db25zdGFudHNcIjtcclxuaW1wb3J0IFVJQ29tcG9uZW50IGZyb20gXCIuLi9VSS9VSUNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBVaUFjdGlvbiB9IGZyb20gXCIuLi9VSS9VaUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBUb3dlckxldmVsTWFuYWdlciB9IGZyb20gXCIuL1Rvd2VyTGV2ZWxcIjtcclxuaW1wb3J0IHsgVG93ZXJSZXdhcmRNYW5hZ2VyIH0gZnJvbSBcIi4vVG93ZXJSZXdhcmRcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG93ZXJGaWdodGluZ1VpIGV4dGVuZHMgVUlDb21wb25lbnQge1xyXG5cclxuICAgIGluaXQodWlBYzogVWlBY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5pbml0KHVpQWMpXHJcbiAgICB9XHJcblxyXG4gICAgaW5pdERhdGEobGV2ZWw6bnVtYmVyKXtcclxuICAgICAgICBsZXQgZGF0YSA9IFRvd2VyTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RmlnaHRpbmdJbmZvKGxldmVsKVxyXG4gICAgICAgIGxldCBjb250ZW50ID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwibW9uc3RlclNjcm9sbFZpZXdcIikuZ2V0Q29tcG9uZW50KGNjLlNjcm9sbFZpZXcpLmNvbnRlbnQ7XHJcbiAgICAgICAgZGF0YS5nZXRPbmx5TW9uc3RlckRhdGFMaXN0KCkuZm9yRWFjaCgodixrKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIOaAqueJqWlk5YiX6KGoXHJcbiAgICAgICAgICAgIGxldCBpY29uPU1vbnN0ZXJJY29uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZU1vbnN0ZXJJY29uKHYuaWQsdi5sZXZlbCk7XHJcbiAgICAgICAgICAgIGNvbnRlbnQuYWRkQ2hpbGQoaWNvbik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbGV0IHJld2FyZERhdGE9VG93ZXJSZXdhcmRNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UmV3YXJkRGF0YXMobGV2ZWwpO1xyXG4gICAgICAgIGNvbnRlbnQgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJyZXdhcmRzU2Nyb2xsVmlld1wiKS5nZXRDb21wb25lbnQoY2MuU2Nyb2xsVmlldykuY29udGVudDtcclxuICAgICAgICByZXdhcmREYXRhLmZvckVhY2goKHYsaykgPT4ge1xyXG4gICAgICAgICAgICBsZXQgaXRlbSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0odi5yZXdhcmRfaWQsdi5yZXdhcmRfbnVtKTtcclxuICAgICAgICAgICAgY29udGVudC5hZGRDaGlsZChpdGVtKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjbGlja0J0bkNsb3NlKClcclxuICAgIHtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIHRoaXMuZGVzdHJveVNlbGYoKTtcclxuICAgIH1cclxuXHJcbiAgICBkZXN0cm95U2VsZigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIub25DbG9zZSgpO1xyXG4gICAgICAgIEFwa01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jbG9zZUJhbm5lcigpO1xyXG4gICAgICAgIC8vIEV2ZW50TWFuYWdlci5wb3N0UmVkRXZlbnQoUmVkRXZlbnRTdHJpbmcuUkVEX0NIRUNLLFJlZEV2ZW50VHlwZS5CdG5fTWFpbl9TaWduSW4pO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=