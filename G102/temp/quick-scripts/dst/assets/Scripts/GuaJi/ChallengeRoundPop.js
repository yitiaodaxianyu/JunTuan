
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/GuaJi/ChallengeRoundPop.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '7d08f3qn3dD3Kx2Bmv0CKtl', 'ChallengeRoundPop');
// Scripts/GuaJi/ChallengeRoundPop.ts

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
var Constants_1 = require("../Constants");
var GameManager_1 = require("../GameManager");
var FirstCompleteReward_1 = require("../Level/FirstCompleteReward");
var LevelManager_1 = require("../Level/LevelManager");
var MissionLevel_1 = require("../Level/MissionLevel");
var LanguageManager_1 = require("../multiLanguage/LanguageManager");
var TextLanguage_1 = require("../multiLanguage/TextLanguage");
var PropManager_1 = require("../Prop/PropManager");
var TutorailsManager_1 = require("../Tutorials/TutorailsManager");
var MainUi_1 = require("../UI/home/MainUi");
var ToPlayMainUi_1 = require("../UI/home/ToPlayMainUi");
var UIConfig_1 = require("../UI/UIConfig");
var UIManager_1 = require("../UI/UIManager");
var MapManager_1 = require("./MapManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ChallengeRoundPop = /** @class */ (function (_super) {
    __extends(ChallengeRoundPop, _super);
    function ChallengeRoundPop() {
        // @property(cc.Label)
        // label: cc.Label = null;
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // @property
        // text: string = 'hello';
        // LIFE-CYCLE CALLBACKS:
        // onLoad () {}
        _this.level = 0; //关卡节点代表的是哪个关卡   默认1
        _this.prop = null;
        _this.Common_Btn_0 = null; //开始按钮
        _this.Btn_Close = null; //关闭按钮
        _this.lqu = []; //已领取文字
        _this.Mask = []; //黑布
        _this.leveltxt = null; //关卡
        _this.Main_Icon_Boss = null; //boss头像
        _this.bg = null; //背景
        return _this;
        // update (dt) {}
    }
    ChallengeRoundPop.prototype.start = function () {
        this.Btn_Close.on(cc.Node.EventType.TOUCH_END, this.onBtn_Close, this);
        this.bg.on(cc.Node.EventType.TOUCH_END, this.onBtn_Close, this);
        this.Common_Btn_0.on(cc.Node.EventType.TOUCH_END, this.clickBtnStart, this);
    };
    ChallengeRoundPop.prototype.init = function (level) {
        this.level = level;
        this.leveltxt.getComponent(cc.Label).string = "" + MissionLevel_1.MissionLevelManager.getInstance().getLevelName(level);
        var myCurrentlevel = LevelManager_1.LevelManager.getInstance().finish_level + 1; //当前最大关卡
        for (var index = 0; index < this.prop.children.length; index++) {
            this.prop.children[index].destroy();
        }
        this.node.active = true;
        var Starnumber = 0;
        if (level < myCurrentlevel) {
            for (var LevelStarindex = 1; LevelStarindex < 4; LevelStarindex++) {
                if (LevelManager_1.LevelManager.getInstance().getALevelStar(level, LevelStarindex)) {
                    Starnumber++;
                }
            }
        }
        for (var Maskindex = 0; Maskindex < this.Mask.length; Maskindex++) {
            if (Maskindex < Starnumber) {
                this.Mask[Maskindex].active = true;
                this.lqu[Maskindex].active = true;
            }
            else {
                this.Mask[Maskindex].active = false;
                this.lqu[Maskindex].active = false;
            }
        }
        for (var Starindex = 1; Starindex <= 3; Starindex++) {
            var levelId = FirstCompleteReward_1.FirstCompleteRewardManager.getId(level, Starindex); //默认3个都完成  
            var RewardData = FirstCompleteReward_1.FirstCompleteRewardManager.getInstance().getFirstRewardArr(levelId);
            for (var level3 = 0; level3 < RewardData.length; level3++) {
                var rewardData = RewardData[level3];
                //可以获得奖品
                // this.scheduleOnce(()=>{
                // console.log("_______",rewardData.reward_id,rewardData.reward_num)
                var item = PropManager_1.PropManager.getInstance().createPropItem(rewardData.reward_id, rewardData.reward_num);
                item.scale = 0.82;
                item.parent = this.prop;
                item.x = -67 + level3 * 90;
                item.y = 190 - Starindex * 115 + 115; //第三颗星在最下面
                // item.x=-67+level3*90;
                // item.y=-40+Starindex*115-115;//第三颗星在最上面
                // },level3*0.1);
                // PropManager.getInstance().changePropNum(rewardData.reward_id,rewardData.reward_num);
            }
        }
        if (level > myCurrentlevel) {
            this.Common_Btn_0.getChildByName("kszd").getComponent(TextLanguage_1.default).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
            this.Common_Btn_0.getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
        }
        else {
            this.Common_Btn_0.getChildByName("kszd").getComponent(TextLanguage_1.default).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
            this.Common_Btn_0.getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
        }
        if (MissionLevel_1.MissionLevelManager.getInstance().getLevelTypes(level) == 3) {
            this.Main_Icon_Boss.active = true;
        }
        else {
            this.Main_Icon_Boss.active = false;
        }
    };
    ChallengeRoundPop.prototype.clickBtnStart = function () {
        // @ts-ignore
        if (this.Common_Btn_0.getComponent(cc.Sprite).getMaterial(0)._name == 'builtin-2d-gray-sprite (Instance)') {
            GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getStrByTextId(100100)); //该关卡尚未解锁
            return;
        }
        this.onBtn_Close();
        if (!TutorailsManager_1.default.getInstance().is_finish_game) {
            // console.log("+6")
            LevelManager_1.LevelManager.getInstance().start_level = MapManager_1.default.Currentlevel = LevelManager_1.LevelManager.getInstance().finish_level + 1;
            cc.find("Canvas/main_ui").getComponent(MainUi_1.default).clickBtnStart();
            return;
        }
        GameManager_1.default.getInstance().cur_game_mode = Constants_1.GameMode.Main;
        MapManager_1.default.Currentlevel = this.level;
        UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.ToPlay, UIConfig_1.UILayerLevel.One, { onCompleted: function (uiNode) {
                uiNode.getComponent(ToPlayMainUi_1.default).init({ onClose: function () {
                        // this.cur_selected_level=LevelManager.getInstance().start_level;                    
                        GameManager_1.default.getInstance().refreshZhanliShow();
                    } });
            }, });
    };
    ChallengeRoundPop.prototype.onBtn_Close = function () {
        for (var index = 0; index < this.prop.children.length; index++) {
            this.prop.children[index].destroy();
        }
        this.node.active = false;
    };
    __decorate([
        property(cc.Node)
    ], ChallengeRoundPop.prototype, "prop", void 0);
    __decorate([
        property(cc.Node)
    ], ChallengeRoundPop.prototype, "Common_Btn_0", void 0);
    __decorate([
        property(cc.Node)
    ], ChallengeRoundPop.prototype, "Btn_Close", void 0);
    __decorate([
        property(cc.Node)
    ], ChallengeRoundPop.prototype, "lqu", void 0);
    __decorate([
        property(cc.Node)
    ], ChallengeRoundPop.prototype, "Mask", void 0);
    __decorate([
        property(cc.Node)
    ], ChallengeRoundPop.prototype, "leveltxt", void 0);
    __decorate([
        property(cc.Node)
    ], ChallengeRoundPop.prototype, "Main_Icon_Boss", void 0);
    __decorate([
        property(cc.Node)
    ], ChallengeRoundPop.prototype, "bg", void 0);
    ChallengeRoundPop = __decorate([
        ccclass
    ], ChallengeRoundPop);
    return ChallengeRoundPop;
}(cc.Component));
exports.default = ChallengeRoundPop;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcR3VhSmlcXENoYWxsZW5nZVJvdW5kUG9wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWxGLDBDQUF3QztBQUN4Qyw4Q0FBeUM7QUFDekMsb0VBQTBFO0FBQzFFLHNEQUFxRDtBQUNyRCxzREFBNEQ7QUFDNUQsb0VBQStEO0FBQy9ELDhEQUF5RDtBQUN6RCxtREFBa0Q7QUFDbEQsa0VBQTZEO0FBQzdELDRDQUF1QztBQUN2Qyx3REFBbUQ7QUFDbkQsMkNBQXNEO0FBQ3RELDZDQUE0QztBQUM1QywyQ0FBc0M7QUFFaEMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBK0MscUNBQVk7SUFBM0Q7UUFFSSxzQkFBc0I7UUFDdEIsMEJBQTBCO1FBSDlCLHFFQXFJQztRQWhJRyxZQUFZO1FBQ1osMEJBQTBCO1FBRzFCLHdCQUF3QjtRQUV4QixlQUFlO1FBQ2YsV0FBSyxHQUFRLENBQUMsQ0FBQSxDQUFBLG9CQUFvQjtRQUVsQyxVQUFJLEdBQVksSUFBSSxDQUFDO1FBRXJCLGtCQUFZLEdBQVcsSUFBSSxDQUFDLENBQUEsTUFBTTtRQUVsQyxlQUFTLEdBQVcsSUFBSSxDQUFDLENBQUEsTUFBTTtRQUcvQixTQUFHLEdBQWEsRUFBRSxDQUFDLENBQUEsT0FBTztRQUUxQixVQUFJLEdBQWEsRUFBRSxDQUFDLENBQUEsSUFBSTtRQUd4QixjQUFRLEdBQVcsSUFBSSxDQUFDLENBQUEsSUFBSTtRQUc1QixvQkFBYyxHQUFXLElBQUksQ0FBQyxDQUFBLFFBQVE7UUFHdEMsUUFBRSxHQUFXLElBQUksQ0FBQyxDQUFBLElBQUk7O1FBb0d0QixpQkFBaUI7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QURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO21EQUNFO0lBR3BCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7dURBQ007SUFHeEI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs2REFDWTtJQUc5QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2lEQUNBO0lBaENELGlCQUFpQjtRQURyQyxPQUFPO09BQ2EsaUJBQWlCLENBcUlyQztJQUFELHdCQUFDO0NBcklELEFBcUlDLENBckk4QyxFQUFFLENBQUMsU0FBUyxHQXFJMUQ7a0JBcklvQixpQkFBaUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcblxyXG5pbXBvcnQgeyBHYW1lTW9kZSB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBGaXJzdENvbXBsZXRlUmV3YXJkTWFuYWdlciB9IGZyb20gXCIuLi9MZXZlbC9GaXJzdENvbXBsZXRlUmV3YXJkXCI7XHJcbmltcG9ydCB7IExldmVsTWFuYWdlciB9IGZyb20gXCIuLi9MZXZlbC9MZXZlbE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgTWlzc2lvbkxldmVsTWFuYWdlciB9IGZyb20gXCIuLi9MZXZlbC9NaXNzaW9uTGV2ZWxcIjtcclxuaW1wb3J0IExhbmd1YWdlTWFuYWdlciBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9MYW5ndWFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IFRleHRMYW5ndWFnZSBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9UZXh0TGFuZ3VhZ2VcIjtcclxuaW1wb3J0IHsgUHJvcE1hbmFnZXIgfSBmcm9tIFwiLi4vUHJvcC9Qcm9wTWFuYWdlclwiO1xyXG5pbXBvcnQgVHV0b3JhaWxzTWFuYWdlciBmcm9tIFwiLi4vVHV0b3JpYWxzL1R1dG9yYWlsc01hbmFnZXJcIjtcclxuaW1wb3J0IE1haW5VaSBmcm9tIFwiLi4vVUkvaG9tZS9NYWluVWlcIjtcclxuaW1wb3J0IFRvUGxheU1haW5VaSBmcm9tIFwiLi4vVUkvaG9tZS9Ub1BsYXlNYWluVWlcIjtcclxuaW1wb3J0IHsgVUlQYXRoLCBVSUxheWVyTGV2ZWwgfSBmcm9tIFwiLi4vVUkvVUlDb25maWdcIjtcclxuaW1wb3J0IHsgVUlNYW5hZ2VyIH0gZnJvbSBcIi4uL1VJL1VJTWFuYWdlclwiO1xyXG5pbXBvcnQgTWFwTWFuYWdlciBmcm9tIFwiLi9NYXBNYW5hZ2VyXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENoYWxsZW5nZVJvdW5kUG9wIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICAvLyBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICAvLyBsYWJlbDogY2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIC8vIEBwcm9wZXJ0eVxyXG4gICAgLy8gdGV4dDogc3RyaW5nID0gJ2hlbGxvJztcclxuXHJcblxyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcblxyXG4gICAgLy8gb25Mb2FkICgpIHt9XHJcbiAgICBsZXZlbDpudW1iZXI9MC8v5YWz5Y2h6IqC54K55Luj6KGo55qE5piv5ZOq5Liq5YWz5Y2hICAg6buY6K6kMVxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcm9wOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgQ29tbW9uX0J0bl8wOmNjLk5vZGUgPSBudWxsOy8v5byA5aeL5oyJ6ZKuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIEJ0bl9DbG9zZTpjYy5Ob2RlID0gbnVsbDsvL+WFs+mXreaMiemSrlxyXG4gICAgXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGxxdTpjYy5Ob2RlW10gPSBbXTsvL+W3sumihuWPluaWh+Wtl1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBNYXNrOmNjLk5vZGVbXSA9IFtdOy8v6buR5biDXHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBsZXZlbHR4dDpjYy5Ob2RlID0gbnVsbDsvL+WFs+WNoVxyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgTWFpbl9JY29uX0Jvc3M6Y2MuTm9kZSA9IG51bGw7Ly9ib3Nz5aS05YOPXHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBiZzpjYy5Ob2RlID0gbnVsbDsvL+iDjOaZr1xyXG4gICAgXHJcbiAgICBzdGFydCAoKSB7XHJcbiAgICAgICAgdGhpcy5CdG5fQ2xvc2Uub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELHRoaXMub25CdG5fQ2xvc2UsdGhpcyk7XHJcbiAgICAgICAgdGhpcy5iZy5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsdGhpcy5vbkJ0bl9DbG9zZSx0aGlzKTtcclxuICAgICAgICB0aGlzLkNvbW1vbl9CdG5fMC5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsdGhpcy5jbGlja0J0blN0YXJ0LHRoaXMpO1xyXG4gICAgfVxyXG4gICAgaW5pdChsZXZlbCl7XHJcbiAgICAgICAgdGhpcy5sZXZlbD1sZXZlbFxyXG4gICAgICAgIHRoaXMubGV2ZWx0eHQuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9XCJcIitNaXNzaW9uTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TGV2ZWxOYW1lKGxldmVsKVxyXG4gICAgICAgIGxldCBteUN1cnJlbnRsZXZlbD1MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5maW5pc2hfbGV2ZWwrMTsvL+W9k+WJjeacgOWkp+WFs+WNoVxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLnByb3AuY2hpbGRyZW4ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJvcC5jaGlsZHJlbltpbmRleF0uZGVzdHJveSgpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgIGxldCBTdGFybnVtYmVyPTA7XHJcbiAgICAgICAgaWYobGV2ZWw8bXlDdXJyZW50bGV2ZWwpe1xyXG4gICAgICAgICAgICBmb3IgKGxldCBMZXZlbFN0YXJpbmRleCA9IDE7IExldmVsU3RhcmluZGV4IDw0OyBMZXZlbFN0YXJpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZihMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRBTGV2ZWxTdGFyKGxldmVsLExldmVsU3RhcmluZGV4KSl7XHJcbiAgICAgICAgICAgICAgICAgICAgU3Rhcm51bWJlcisrXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgTWFza2luZGV4ID0gMDsgTWFza2luZGV4IDwgdGhpcy5NYXNrLmxlbmd0aDsgTWFza2luZGV4KyspIHtcclxuICAgICAgICAgICAgaWYoTWFza2luZGV4PFN0YXJudW1iZXIpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5NYXNrW01hc2tpbmRleF0uYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgICAgIHRoaXMubHF1W01hc2tpbmRleF0uYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuTWFza1tNYXNraW5kZXhdLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5scXVbTWFza2luZGV4XS5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgU3RhcmluZGV4ID0gMTsgU3RhcmluZGV4IDw9IDM7IFN0YXJpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGxldCBsZXZlbElkPUZpcnN0Q29tcGxldGVSZXdhcmRNYW5hZ2VyLmdldElkKGxldmVsLFN0YXJpbmRleCk7Ly/pu5jorqQz5Liq6YO95a6M5oiQICBcclxuXHJcbiAgICAgICAgICAgIGxldCBSZXdhcmREYXRhPUZpcnN0Q29tcGxldGVSZXdhcmRNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Rmlyc3RSZXdhcmRBcnIobGV2ZWxJZCk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGxldmVsMyA9IDA7IGxldmVsMyA8IFJld2FyZERhdGEubGVuZ3RoOyBsZXZlbDMrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHJld2FyZERhdGE9UmV3YXJkRGF0YVtsZXZlbDNdO1xyXG4gICAgICAgICAgICAgICAgLy/lj6/ku6XojrflvpflpZblk4FcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJfX19fX19fXCIscmV3YXJkRGF0YS5yZXdhcmRfaWQscmV3YXJkRGF0YS5yZXdhcmRfbnVtKVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpdGVtPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0ocmV3YXJkRGF0YS5yZXdhcmRfaWQscmV3YXJkRGF0YS5yZXdhcmRfbnVtKTtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLnNjYWxlPTAuODI7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5wYXJlbnQ9dGhpcy5wcm9wO1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0ueD0tNjcrbGV2ZWwzKjkwO1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0ueT0xOTAtU3RhcmluZGV4KjExNSsxMTU7Ly/nrKzkuInpopfmmJ/lnKjmnIDkuIvpnaJcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaXRlbS54PS02NytsZXZlbDMqOTA7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaXRlbS55PS00MCtTdGFyaW5kZXgqMTE1LTExNTsvL+esrOS4iemil+aYn+WcqOacgOS4iumdolxyXG4gICAgICAgICAgICAgICAgLy8gfSxsZXZlbDMqMC4xKTtcclxuICAgICAgICAgICAgICAgIC8vIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShyZXdhcmREYXRhLnJld2FyZF9pZCxyZXdhcmREYXRhLnJld2FyZF9udW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGxldmVsPm15Q3VycmVudGxldmVsKXtcclxuICAgICAgICAgICAgdGhpcy5Db21tb25fQnRuXzAuZ2V0Q2hpbGRCeU5hbWUoXCJrc3pkXCIpLmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnNldE1hdGVyaWFsKDAsIGNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbChcIjJkLWdyYXktc3ByaXRlXCIpKTtcclxuICAgICAgICAgICAgdGhpcy5Db21tb25fQnRuXzAuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc2V0TWF0ZXJpYWwoMCwgY2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKFwiMmQtZ3JheS1zcHJpdGVcIikpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLkNvbW1vbl9CdG5fMC5nZXRDaGlsZEJ5TmFtZShcImtzemRcIikuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0TWF0ZXJpYWwoMCwgY2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKFwiMmQtc3ByaXRlXCIpKTtcclxuICAgICAgICAgICAgdGhpcy5Db21tb25fQnRuXzAuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc2V0TWF0ZXJpYWwoMCwgY2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKFwiMmQtc3ByaXRlXCIpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKE1pc3Npb25MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRMZXZlbFR5cGVzKGxldmVsKT09Myl7XHJcbiAgICAgICAgICAgIHRoaXMuTWFpbl9JY29uX0Jvc3MuYWN0aXZlPXRydWVcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5NYWluX0ljb25fQm9zcy5hY3RpdmU9ZmFsc2VcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjbGlja0J0blN0YXJ0KCkvL+W8gOWni+a4uOaIj1xyXG4gICAge1xyXG5cclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgaWYodGhpcy5Db21tb25fQnRuXzAuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuZ2V0TWF0ZXJpYWwoMCkuX25hbWU9PSAnYnVpbHRpbi0yZC1ncmF5LXNwcml0ZSAoSW5zdGFuY2UpJyl7XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTAwMTAwKSkvL+ivpeWFs+WNoeWwmuacquino+mUgVxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5vbkJ0bl9DbG9zZSgpXHJcbiAgICAgICAgaWYoIVR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc19maW5pc2hfZ2FtZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiKzZcIilcclxuICAgICAgICAgICAgTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc3RhcnRfbGV2ZWw9TWFwTWFuYWdlci5DdXJyZW50bGV2ZWw9TGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZmluaXNoX2xldmVsKzE7XHJcbiAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvbWFpbl91aVwiKS5nZXRDb21wb25lbnQoTWFpblVpKS5jbGlja0J0blN0YXJ0KClcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZT1HYW1lTW9kZS5NYWluO1xyXG4gICAgICAgIE1hcE1hbmFnZXIuQ3VycmVudGxldmVsPXRoaXMubGV2ZWw7XHJcbiAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5Ub1BsYXksVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoVG9QbGF5TWFpblVpKS5pbml0KHtvbkNsb3NlOigpPT57XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLmN1cl9zZWxlY3RlZF9sZXZlbD1MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydF9sZXZlbDsgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZWZyZXNoWmhhbmxpU2hvdygpO1xyXG4gICAgICAgICAgICB9fSk7XHJcbiAgICAgICAgfSx9KVxyXG4gICAgfVxyXG4gICAgb25CdG5fQ2xvc2UoKXtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5wcm9wLmNoaWxkcmVuLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICB0aGlzLnByb3AuY2hpbGRyZW5baW5kZXhdLmRlc3Ryb3koKVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlPWZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge31cclxufVxyXG4iXX0=