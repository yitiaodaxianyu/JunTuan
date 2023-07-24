
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Game/Ui/RoguelikeTip.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '60646jT0GpBbJOvdLbaPurK', 'RoguelikeTip');
// Scripts/Game/Ui/RoguelikeTip.ts

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
var HeroManager_1 = require("../../Hero/Data/HeroManager");
var HeroConfig_1 = require("../../Hero/Game/HeroConfig");
var HeroItem_1 = require("../../Hero/Ui/HeroItem");
var UIComponent_1 = require("../../UI/UIComponent");
var WallManager_1 = require("../../Wall/WallManager");
var LanguageManager_1 = require("../../multiLanguage/LanguageManager");
var CharioItem_1 = require("./CharioItem");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var RoguelikeTip = /** @class */ (function (_super) {
    __extends(RoguelikeTip, _super);
    function RoguelikeTip() {
        // LIFE-CYCLE CALLBACKS:
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // onLoad () {}
        _this.tag = 0; //选择toggle的选择数
        _this.ToggleContainer = null;
        _this.tipLabel = null;
        _this.content = null; //英雄选择父节点
        _this.hero_item = null; //英雄头像的预制体
        _this.hero_Chose = null; //选择英雄节点
        _this.chariot_Chose = null; //战车升级选择节点
        _this.chariotItem0 = null; //战车升级选择节点0
        _this.chariotItem1 = null; //战车升级选择节点1
        _this.chariotItem2 = null; //战车升级选择节点2
        _this.greybuttonjudgment = 0;
        return _this;
        // update (dt) {}
    }
    RoguelikeTip.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        this.tag = 0;
        this.ToggleContainer.children[0].getComponent(cc.Toggle).isChecked = true;
        this.onToggleChange();
        console.log("进入RogueLike");
        this.chariotUpgradation();
        this.Refreshheroitmestatus();
        this.chariotItem0.on(cc.Node.EventType.TOUCH_END, this.onCharioItemTouchEnd, this);
        this.chariotItem1.on(cc.Node.EventType.TOUCH_END, this.onCharioItemTouchEnd, this);
        this.chariotItem2.on(cc.Node.EventType.TOUCH_END, this.onCharioItemTouchEnd, this);
    };
    RoguelikeTip.prototype.onDestroy = function () {
        this.chariotItem0.off(cc.Node.EventType.TOUCH_END, this.onCharioItemTouchEnd, this);
        this.chariotItem1.off(cc.Node.EventType.TOUCH_END, this.onCharioItemTouchEnd, this);
        this.chariotItem2.off(cc.Node.EventType.TOUCH_END, this.onCharioItemTouchEnd, this);
    };
    RoguelikeTip.prototype.onEnable = function () {
    };
    RoguelikeTip.prototype.chariotUpgradation = function () {
        var data = GameManager_1.default.getInstance().getcharioUpgradationData();
        console.log("获得的升级数据" + data);
        this.chariotItem0.getComponent(CharioItem_1.default).initData(data[0]);
        this.chariotItem1.active = true;
        this.chariotItem2.active = true;
        this.chariotItem0.x = -223;
        this.chariotItem1.x = 0;
        this.chariotItem2.x = 223;
        if (data[1] != null) {
            this.chariotItem1.getComponent(CharioItem_1.default).initData(data[1]);
        }
        else {
            this.chariotItem1.active = false;
            this.chariotItem2.active = false;
            this.chariotItem0.x = 0;
            return;
        }
        if (data[2] != null) {
            this.chariotItem2.getComponent(CharioItem_1.default).initData(data[2]);
        }
        else {
            this.chariotItem0.x = -111.5;
            this.chariotItem1.x = 111.5;
            this.chariotItem2.active = false;
        }
    };
    RoguelikeTip.prototype.clickBtnToggle = function (even, i) {
        // console.log("+++++++",even,i)
        this.tag = i;
        this.onToggleChange();
    };
    RoguelikeTip.prototype.Refreshheroitmestatus = function () {
        //已解锁的英雄
        var HeroList = HeroManager_1.HeroManager.getInstance().getHeroList(); //数量   英雄id类型 英雄等级 英雄品质  英雄星星阶段
        var heroBasicdataarr = []; //最高战力数组
        var HeroListarr = HeroList; //已解锁的英雄
        for (var heroindex = 0; heroindex < HeroList.length; heroindex++) {
            var hero = cc.instantiate(this.hero_item);
            hero.name = "" + heroindex;
            hero.setScale(0.75, 0.75);
            this.content.addChild(hero);
            hero.on(cc.Node.EventType.TOUCH_END, this.onHeroItemTouchEnd, this);
            // hero.on(cc.Node.EventType.TOUCH_CANCEL, this.onHeroItemTouchCancel, this);
        }
        this.content.getComponent(cc.Layout).updateLayout();
        //刷新英雄itme
        for (var heroBasicdataindex = 0; heroBasicdataindex < HeroList.length; heroBasicdataindex++) {
            var heroBasicdata = HeroManager_1.HeroManager.getInstance().getHeroData(HeroList[heroBasicdataindex].hero_type); //英雄的基础数据   传入英雄id类型  防御力  生命值  命中值 
            heroBasicdataarr.push(heroBasicdata.total_attack);
        }
        //排列英雄战力
        var cun;
        var herocun;
        for (var index = 0; index < heroBasicdataarr.length; index++) {
            for (var paixvindex = 0; paixvindex < heroBasicdataarr.length - 1; paixvindex++) {
                if (heroBasicdataarr[paixvindex + 1] > heroBasicdataarr[paixvindex]) {
                    cun = heroBasicdataarr[paixvindex];
                    heroBasicdataarr[paixvindex] = heroBasicdataarr[paixvindex + 1];
                    heroBasicdataarr[paixvindex + 1] = cun;
                    herocun = HeroListarr[paixvindex];
                    HeroListarr[paixvindex] = HeroListarr[paixvindex + 1];
                    HeroListarr[paixvindex + 1] = herocun;
                }
            }
        }
        var teamList = GameManager_1.default.getInstance().cur_team_list;
        //刷新英雄itme状态
        //血量
        for (var shuaxingindex = 0; shuaxingindex < HeroListarr.length; shuaxingindex++) {
            this.content.children[shuaxingindex].getComponent(HeroItem_1.default).RefreshHeroesItem(HeroListarr[shuaxingindex].hero_type);
            for (var teamListindex = 0; teamListindex < teamList.length; teamListindex++) {
                if (teamList[teamListindex] == HeroListarr[shuaxingindex].hero_type) {
                    this.content.children[shuaxingindex].getChildByName("shangzheng").active = true;
                }
            }
        }
    };
    RoguelikeTip.prototype.onCharioItemTouchEnd = function (e) {
        var touchTarget = e.getCurrentTarget();
        if (touchTarget.active == true) {
            var charioType = touchTarget.getComponent(CharioItem_1.default).getDataType();
            GameManager_1.default.getInstance().charioUpgradationData[charioType]++;
            //["加攻击","血量上限","攻速","防御","技能间隔","左右移动","回血"];
            if (charioType == 0) {
                GameManager_1.default.getInstance().refreshMainWallDataByaddHero();
            }
            else if (charioType == 1) {
                GameManager_1.default.getInstance().refreshMainWallDataByaddHero();
            }
            else if (charioType == 2) {
            }
            else if (charioType == 3) {
                GameManager_1.default.getInstance().refreshMainWallDataByaddHero();
            }
            else if (charioType == 4) {
            }
            else if (charioType == 5) {
            }
            else if (charioType == 6) {
                WallManager_1.default.getInstance().getMainWall().changeHp(WallManager_1.default.getInstance().getMainWall().getMaxHp() * 0.2);
            }
            this.chariotUpgradation();
            this.clickBtnClose();
        }
    };
    RoguelikeTip.prototype.onHeroItemTouchEnd = function (e) {
        var touchTeam = e.getCurrentTarget();
        if (touchTeam.getChildByName("shangzheng").active == false) {
            //上阵该英雄
            var teamList = GameManager_1.default.getInstance().cur_team_list;
            if (teamList[1] == -1 || teamList[1] == HeroConfig_1.Hero_Type.NULL) {
                teamList[1] = touchTeam.getComponent(HeroItem_1.default).hero_type;
                GameManager_1.default.getInstance().addHero(touchTeam.getComponent(HeroItem_1.default).hero_type, 1);
                this.clickBtnClose();
                return;
            }
            if (teamList[3] == -1 || teamList[3] == HeroConfig_1.Hero_Type.NULL) {
                teamList[3] = touchTeam.getComponent(HeroItem_1.default).hero_type;
                GameManager_1.default.getInstance().addHero(touchTeam.getComponent(HeroItem_1.default).hero_type, 3);
                this.clickBtnClose();
                return;
            }
            if (teamList[0] == -1 || teamList[0] == HeroConfig_1.Hero_Type.NULL) {
                teamList[0] = touchTeam.getComponent(HeroItem_1.default).hero_type;
                GameManager_1.default.getInstance().addHero(touchTeam.getComponent(HeroItem_1.default).hero_type, 0);
                this.clickBtnClose();
                return;
            }
            if (teamList[4] == -1 || teamList[4] == HeroConfig_1.Hero_Type.NULL) {
                teamList[4] = touchTeam.getComponent(HeroItem_1.default).hero_type;
                GameManager_1.default.getInstance().addHero(touchTeam.getComponent(HeroItem_1.default).hero_type, 4);
                this.clickBtnClose();
                return;
            }
        }
        else {
            GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getStrByTextId(100091));
        }
    };
    RoguelikeTip.prototype.onToggleChange = function () {
        if (this.tag == 0) {
            this.tipLabel.getComponent(cc.Label).string = "选择一个英雄加入你的队伍。";
            this.hero_Chose.active = true;
            this.chariot_Chose.active = false;
        }
        else if (this.tag == 1) {
            this.hero_Chose.active = false;
            this.chariot_Chose.active = false;
            this.tipLabel.getComponent(cc.Label).string = "选择一个技能加强你的英雄。";
        }
        else if (this.tag == 2) {
            this.hero_Chose.active = false;
            this.chariot_Chose.active = true;
            this.tipLabel.getComponent(cc.Label).string = "选择一个技能用于加强你的战车。";
        }
    };
    RoguelikeTip.prototype.clickBtnClose = function () {
        console.log("离开roguelike");
        cc.director.resume();
        GameManager_1.default.getInstance().cur_game_state = Constants_1.GameState.Game_Playing;
        GameManager_1.default.getInstance().loadLevel();
        _super.prototype.onClose.call(this);
    };
    __decorate([
        property(cc.Node)
    ], RoguelikeTip.prototype, "ToggleContainer", void 0);
    __decorate([
        property(cc.Node)
    ], RoguelikeTip.prototype, "tipLabel", void 0);
    __decorate([
        property(cc.Node)
    ], RoguelikeTip.prototype, "content", void 0);
    __decorate([
        property(cc.Prefab)
    ], RoguelikeTip.prototype, "hero_item", void 0);
    __decorate([
        property(cc.Node)
    ], RoguelikeTip.prototype, "hero_Chose", void 0);
    __decorate([
        property(cc.Node)
    ], RoguelikeTip.prototype, "chariot_Chose", void 0);
    __decorate([
        property(cc.Node)
    ], RoguelikeTip.prototype, "chariotItem0", void 0);
    __decorate([
        property(cc.Node)
    ], RoguelikeTip.prototype, "chariotItem1", void 0);
    __decorate([
        property(cc.Node)
    ], RoguelikeTip.prototype, "chariotItem2", void 0);
    RoguelikeTip = __decorate([
        ccclass
    ], RoguelikeTip);
    return RoguelikeTip;
}(UIComponent_1.default));
exports.default = RoguelikeTip;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcR2FtZVxcVWlcXFJvZ3VlbGlrZVRpcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVsRiw2Q0FBNEM7QUFDNUMsaURBQTRDO0FBQzVDLDJEQUEwRDtBQUMxRCx5REFBdUQ7QUFDdkQsbURBQThDO0FBQzlDLG9EQUErQztBQUUvQyxzREFBaUQ7QUFDakQsdUVBQWtFO0FBQ2xFLDJDQUFzQztBQUVoQyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUEwQyxnQ0FBVztJQUFyRDtRQU1JLHdCQUF3QjtRQU41QixxRUF1UEM7UUEvT0csZUFBZTtRQUNmLFNBQUcsR0FBVyxDQUFDLENBQUMsQ0FBQSxjQUFjO1FBRTlCLHFCQUFlLEdBQVksSUFBSSxDQUFBO1FBRy9CLGNBQVEsR0FBWSxJQUFJLENBQUE7UUFHeEIsYUFBTyxHQUFZLElBQUksQ0FBQyxDQUFBLFNBQVM7UUFHakMsZUFBUyxHQUFjLElBQUksQ0FBQyxDQUFBLFVBQVU7UUFHdEMsZ0JBQVUsR0FBWSxJQUFJLENBQUMsQ0FBQSxRQUFRO1FBR25DLG1CQUFhLEdBQVksSUFBSSxDQUFDLENBQUEsVUFBVTtRQUd4QyxrQkFBWSxHQUFZLElBQUksQ0FBQyxDQUFBLFdBQVc7UUFFeEMsa0JBQVksR0FBWSxJQUFJLENBQUMsQ0FBQSxXQUFXO1FBRXhDLGtCQUFZLEdBQVksSUFBSSxDQUFDLENBQUEsV0FBVztRQUl4Qyx3QkFBa0IsR0FBVyxDQUFDLENBQUM7O1FBaU4vQixpQkFBaUI7SUFDckIsQ0FBQztJQS9NRyw2QkFBTSxHQUFOO1FBQ0ksaUJBQU0sTUFBTSxXQUFFLENBQUM7UUFDZixJ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Q1k7SUFHOUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztzREFDVztJQUU3QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3NEQUNXO0lBRTdCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7c0RBQ1c7SUFqQ1osWUFBWTtRQURoQyxPQUFPO09BQ2EsWUFBWSxDQXVQaEM7SUFBRCxtQkFBQztDQXZQRCxBQXVQQyxDQXZQeUMscUJBQVcsR0F1UHBEO2tCQXZQb0IsWUFBWSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuXHJcbmltcG9ydCB7IEdhbWVTdGF0ZSB9IGZyb20gXCIuLi8uLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi8uLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBIZXJvTWFuYWdlciB9IGZyb20gXCIuLi8uLi9IZXJvL0RhdGEvSGVyb01hbmFnZXJcIjtcclxuaW1wb3J0IHsgSGVyb19UeXBlIH0gZnJvbSBcIi4uLy4uL0hlcm8vR2FtZS9IZXJvQ29uZmlnXCI7XHJcbmltcG9ydCBIZXJvSXRlbSBmcm9tIFwiLi4vLi4vSGVyby9VaS9IZXJvSXRlbVwiO1xyXG5pbXBvcnQgVUlDb21wb25lbnQgZnJvbSBcIi4uLy4uL1VJL1VJQ29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFVpQWN0aW9uIH0gZnJvbSBcIi4uLy4uL1VJL1VpSW50ZXJmYWNlXCI7XHJcbmltcG9ydCBXYWxsTWFuYWdlciBmcm9tIFwiLi4vLi4vV2FsbC9XYWxsTWFuYWdlclwiO1xyXG5pbXBvcnQgTGFuZ3VhZ2VNYW5hZ2VyIGZyb20gXCIuLi8uLi9tdWx0aUxhbmd1YWdlL0xhbmd1YWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgQ2hhcmlvSXRlbSBmcm9tIFwiLi9DaGFyaW9JdGVtXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm9ndWVsaWtlVGlwIGV4dGVuZHMgVUlDb21wb25lbnQge1xyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuXHJcbiAgICAvLyBvbkxvYWQgKCkge31cclxuICAgIHRhZzogbnVtYmVyID0gMDsvL+mAieaLqXRvZ2dsZeeahOmAieaLqeaVsFxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBUb2dnbGVDb250YWluZXI6IGNjLk5vZGUgPSBudWxsXHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICB0aXBMYWJlbDogY2MuTm9kZSA9IG51bGxcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGNvbnRlbnQ6IGNjLk5vZGUgPSBudWxsOy8v6Iux6ZuE6YCJ5oup54i26IqC54K5XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIGhlcm9faXRlbTogY2MuUHJlZmFiID0gbnVsbDsvL+iLsembhOWktOWDj+eahOmihOWItuS9k1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgaGVyb19DaG9zZTogY2MuTm9kZSA9IG51bGw7Ly/pgInmi6noi7Hpm4ToioLngrlcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGNoYXJpb3RfQ2hvc2U6IGNjLk5vZGUgPSBudWxsOy8v5oiY6L2m5Y2H57qn6YCJ5oup6IqC54K5XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBjaGFyaW90SXRlbTA6IGNjLk5vZGUgPSBudWxsOy8v5oiY6L2m5Y2H57qn6YCJ5oup6IqC54K5MFxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBjaGFyaW90SXRlbTE6IGNjLk5vZGUgPSBudWxsOy8v5oiY6L2m5Y2H57qn6YCJ5oup6IqC54K5MVxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBjaGFyaW90SXRlbTI6IGNjLk5vZGUgPSBudWxsOy8v5oiY6L2m5Y2H57qn6YCJ5oup6IqC54K5MlxyXG5cclxuXHJcblxyXG4gICAgZ3JleWJ1dHRvbmp1ZGdtZW50OiBudW1iZXIgPSAwO1xyXG5cclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgc3VwZXIub25Mb2FkKCk7XHJcbiAgICAgICAgdGhpcy50YWcgPSAwXHJcbiAgICAgICAgdGhpcy5Ub2dnbGVDb250YWluZXIuY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLlRvZ2dsZSkuaXNDaGVja2VkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm9uVG9nZ2xlQ2hhbmdlKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLov5vlhaVSb2d1ZUxpa2VcIik7XHJcbiAgICAgICAgdGhpcy5jaGFyaW90VXBncmFkYXRpb24oKTtcclxuICAgICAgICB0aGlzLlJlZnJlc2hoZXJvaXRtZXN0YXR1cygpO1xyXG4gICAgICAgIHRoaXMuY2hhcmlvdEl0ZW0wLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vbkNoYXJpb0l0ZW1Ub3VjaEVuZCwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5jaGFyaW90SXRlbTEub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uQ2hhcmlvSXRlbVRvdWNoRW5kLCB0aGlzKTtcclxuICAgICAgICB0aGlzLmNoYXJpb3RJdGVtMi5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMub25DaGFyaW9JdGVtVG91Y2hFbmQsIHRoaXMpO1xyXG5cclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBvbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jaGFyaW90SXRlbTAub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vbkNoYXJpb0l0ZW1Ub3VjaEVuZCwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5jaGFyaW90SXRlbTEub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vbkNoYXJpb0l0ZW1Ub3VjaEVuZCwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5jaGFyaW90SXRlbTIub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vbkNoYXJpb0l0ZW1Ub3VjaEVuZCwgdGhpcyk7XHJcbiAgICB9XHJcbiAgICBvbkVuYWJsZSgpIHtcclxuXHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGNoYXJpb3RVcGdyYWRhdGlvbigpOiB2b2lkIHtcclxuICAgICAgICB2YXIgZGF0YTogQXJyYXk8bnVtYmVyPiA9IEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Y2hhcmlvVXBncmFkYXRpb25EYXRhKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLojrflvpfnmoTljYfnuqfmlbDmja5cIiArIGRhdGEpO1xyXG5cclxuICAgICAgICB0aGlzLmNoYXJpb3RJdGVtMC5nZXRDb21wb25lbnQoQ2hhcmlvSXRlbSkuaW5pdERhdGEoZGF0YVswXSk7XHJcblxyXG4gICAgICAgIHRoaXMuY2hhcmlvdEl0ZW0xLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5jaGFyaW90SXRlbTIuYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgdGhpcy5jaGFyaW90SXRlbTAueCA9IC0yMjM7XHJcbiAgICAgICAgdGhpcy5jaGFyaW90SXRlbTEueCA9IDA7XHJcbiAgICAgICAgdGhpcy5jaGFyaW90SXRlbTIueCA9IDIyMztcclxuICAgICAgICBpZiAoZGF0YVsxXSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcmlvdEl0ZW0xLmdldENvbXBvbmVudChDaGFyaW9JdGVtKS5pbml0RGF0YShkYXRhWzFdKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmNoYXJpb3RJdGVtMS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jaGFyaW90SXRlbTIuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcmlvdEl0ZW0wLnggPSAwO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZGF0YVsyXSAhPSBudWxsKSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNoYXJpb3RJdGVtMi5nZXRDb21wb25lbnQoQ2hhcmlvSXRlbSkuaW5pdERhdGEoZGF0YVsyXSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jaGFyaW90SXRlbTAueCA9IC0xMTEuNTtcclxuICAgICAgICAgICAgdGhpcy5jaGFyaW90SXRlbTEueCA9IDExMS41O1xyXG4gICAgICAgICAgICB0aGlzLmNoYXJpb3RJdGVtMi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgY2xpY2tCdG5Ub2dnbGUoZXZlbiwgaSkgey8v5Y2V6YCJ5oyJ6ZKu55qE6YCJ5oupXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCIrKysrKysrXCIsZXZlbixpKVxyXG4gICAgICAgIHRoaXMudGFnID0gaTtcclxuICAgICAgICB0aGlzLm9uVG9nZ2xlQ2hhbmdlKCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgUmVmcmVzaGhlcm9pdG1lc3RhdHVzKCk6IHZvaWQge1xyXG4gICAgICAgIC8v5bey6Kej6ZSB55qE6Iux6ZuEXHJcbiAgICAgICAgbGV0IEhlcm9MaXN0ID0gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvTGlzdCgpLy/mlbDph48gICDoi7Hpm4RpZOexu+WeiyDoi7Hpm4TnrYnnuqcg6Iux6ZuE5ZOB6LSoICDoi7Hpm4TmmJ/mmJ/pmLbmrrVcclxuXHJcbiAgICAgICAgbGV0IGhlcm9CYXNpY2RhdGFhcnIgPSBbXS8v5pyA6auY5oiY5Yqb5pWw57uEXHJcbiAgICAgICAgbGV0IEhlcm9MaXN0YXJyID0gSGVyb0xpc3QvL+W3suino+mUgeeahOiLsembhFxyXG4gICAgICAgIGZvciAobGV0IGhlcm9pbmRleCA9IDA7IGhlcm9pbmRleCA8IEhlcm9MaXN0Lmxlbmd0aDsgaGVyb2luZGV4KyspIHtcclxuICAgICAgICAgICAgbGV0IGhlcm8gPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmhlcm9faXRlbSk7XHJcbiAgICAgICAgICAgIGhlcm8ubmFtZSA9IFwiXCIgKyBoZXJvaW5kZXhcclxuICAgICAgICAgICAgaGVyby5zZXRTY2FsZSgwLjc1LCAwLjc1KVxyXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQuYWRkQ2hpbGQoaGVybyk7XHJcblxyXG5cclxuICAgICAgICAgICAgaGVyby5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMub25IZXJvSXRlbVRvdWNoRW5kLCB0aGlzKTtcclxuICAgICAgICAgICAgLy8gaGVyby5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9DQU5DRUwsIHRoaXMub25IZXJvSXRlbVRvdWNoQ2FuY2VsLCB0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jb250ZW50LmdldENvbXBvbmVudChjYy5MYXlvdXQpLnVwZGF0ZUxheW91dCgpO1xyXG4gICAgICAgIC8v5Yi35paw6Iux6ZuEaXRtZVxyXG4gICAgICAgIGZvciAobGV0IGhlcm9CYXNpY2RhdGFpbmRleCA9IDA7IGhlcm9CYXNpY2RhdGFpbmRleCA8IEhlcm9MaXN0Lmxlbmd0aDsgaGVyb0Jhc2ljZGF0YWluZGV4KyspIHtcclxuICAgICAgICAgICAgbGV0IGhlcm9CYXNpY2RhdGEgPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9EYXRhKEhlcm9MaXN0W2hlcm9CYXNpY2RhdGFpbmRleF0uaGVyb190eXBlKS8v6Iux6ZuE55qE5Z+656GA5pWw5o2uICAg5Lyg5YWl6Iux6ZuEaWTnsbvlnosgIOmYsuW+oeWKmyAg55Sf5ZG95YC8ICDlkb3kuK3lgLwgXHJcbiAgICAgICAgICAgIGhlcm9CYXNpY2RhdGFhcnIucHVzaChoZXJvQmFzaWNkYXRhLnRvdGFsX2F0dGFjaylcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v5o6S5YiX6Iux6ZuE5oiY5YqbXHJcbiAgICAgICAgbGV0IGN1blxyXG4gICAgICAgIGxldCBoZXJvY3VuXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGhlcm9CYXNpY2RhdGFhcnIubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHBhaXh2aW5kZXggPSAwOyBwYWl4dmluZGV4IDwgaGVyb0Jhc2ljZGF0YWFyci5sZW5ndGggLSAxOyBwYWl4dmluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChoZXJvQmFzaWNkYXRhYXJyW3BhaXh2aW5kZXggKyAxXSA+IGhlcm9CYXNpY2RhdGFhcnJbcGFpeHZpbmRleF0pIHtcclxuICAgICAgICAgICAgICAgICAgICBjdW4gPSBoZXJvQmFzaWNkYXRhYXJyW3BhaXh2aW5kZXhdXHJcbiAgICAgICAgICAgICAgICAgICAgaGVyb0Jhc2ljZGF0YWFycltwYWl4dmluZGV4XSA9IGhlcm9CYXNpY2RhdGFhcnJbcGFpeHZpbmRleCArIDFdXHJcbiAgICAgICAgICAgICAgICAgICAgaGVyb0Jhc2ljZGF0YWFycltwYWl4dmluZGV4ICsgMV0gPSBjdW5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaGVyb2N1biA9IEhlcm9MaXN0YXJyW3BhaXh2aW5kZXhdXHJcbiAgICAgICAgICAgICAgICAgICAgSGVyb0xpc3RhcnJbcGFpeHZpbmRleF0gPSBIZXJvTGlzdGFycltwYWl4dmluZGV4ICsgMV1cclxuICAgICAgICAgICAgICAgICAgICBIZXJvTGlzdGFycltwYWl4dmluZGV4ICsgMV0gPSBoZXJvY3VuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHRlYW1MaXN0ID0gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfdGVhbV9saXN0O1xyXG5cclxuICAgICAgICAvL+WIt+aWsOiLsembhGl0bWXnirbmgIFcclxuICAgICAgICAvL+ihgOmHj1xyXG5cclxuICAgICAgICBmb3IgKGxldCBzaHVheGluZ2luZGV4ID0gMDsgc2h1YXhpbmdpbmRleCA8IEhlcm9MaXN0YXJyLmxlbmd0aDsgc2h1YXhpbmdpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGVudC5jaGlsZHJlbltzaHVheGluZ2luZGV4XS5nZXRDb21wb25lbnQoSGVyb0l0ZW0pLlJlZnJlc2hIZXJvZXNJdGVtKEhlcm9MaXN0YXJyW3NodWF4aW5naW5kZXhdLmhlcm9fdHlwZSlcclxuICAgICAgICAgICAgZm9yIChsZXQgdGVhbUxpc3RpbmRleCA9IDA7IHRlYW1MaXN0aW5kZXggPCB0ZWFtTGlzdC5sZW5ndGg7IHRlYW1MaXN0aW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRlYW1MaXN0W3RlYW1MaXN0aW5kZXhdID09IEhlcm9MaXN0YXJyW3NodWF4aW5naW5kZXhdLmhlcm9fdHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5jaGlsZHJlbltzaHVheGluZ2luZGV4XS5nZXRDaGlsZEJ5TmFtZShcInNoYW5nemhlbmdcIikuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9XHJcbiAgICBvbkNoYXJpb0l0ZW1Ub3VjaEVuZChlOiBjYy5FdmVudC5FdmVudFRvdWNoKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHRvdWNoVGFyZ2V0ID0gZS5nZXRDdXJyZW50VGFyZ2V0KCk7XHJcbiAgICAgICAgaWYgKHRvdWNoVGFyZ2V0LmFjdGl2ZSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIHZhciBjaGFyaW9UeXBlOiBudW1iZXIgPSB0b3VjaFRhcmdldC5nZXRDb21wb25lbnQoQ2hhcmlvSXRlbSkuZ2V0RGF0YVR5cGUoKTtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFyaW9VcGdyYWRhdGlvbkRhdGFbY2hhcmlvVHlwZV0rKztcclxuICAgICAgICAgICAgLy9bXCLliqDmlLvlh7tcIixcIuihgOmHj+S4iumZkFwiLFwi5pS76YCfXCIsXCLpmLLlvqFcIixcIuaKgOiDvemXtOmalFwiLFwi5bem5Y+z56e75YqoXCIsXCLlm57ooYBcIl07XHJcbiAgICAgICAgICAgIGlmIChjaGFyaW9UeXBlID09IDApIHtcclxuICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkucmVmcmVzaE1haW5XYWxsRGF0YUJ5YWRkSGVybygpXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2hhcmlvVHlwZSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlZnJlc2hNYWluV2FsbERhdGFCeWFkZEhlcm8oKVxyXG5cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChjaGFyaW9UeXBlID09IDIpIHtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2hhcmlvVHlwZSA9PSAzKSB7XHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlZnJlc2hNYWluV2FsbERhdGFCeWFkZEhlcm8oKVxyXG5cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChjaGFyaW9UeXBlID09IDQpIHtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2hhcmlvVHlwZSA9PSA1KSB7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNoYXJpb1R5cGUgPT0gNikge1xyXG4gICAgICAgICAgICAgICAgV2FsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYWluV2FsbCgpLmNoYW5nZUhwKFdhbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWFpbldhbGwoKS5nZXRNYXhIcCgpKjAuMik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuY2hhcmlvdFVwZ3JhZGF0aW9uKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY2xpY2tCdG5DbG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIG9uSGVyb0l0ZW1Ub3VjaEVuZChlOiBjYy5FdmVudC5FdmVudFRvdWNoKSB7XHJcbiAgICAgICAgbGV0IHRvdWNoVGVhbSA9IGUuZ2V0Q3VycmVudFRhcmdldCgpO1xyXG5cclxuXHJcbiAgICAgICAgaWYgKHRvdWNoVGVhbS5nZXRDaGlsZEJ5TmFtZShcInNoYW5nemhlbmdcIikuYWN0aXZlID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIC8v5LiK6Zi16K+l6Iux6ZuEXHJcbiAgICAgICAgICAgIGxldCB0ZWFtTGlzdCA9IEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX3RlYW1fbGlzdDtcclxuICAgICAgICAgICAgaWYgKHRlYW1MaXN0WzFdID09IC0xIHx8IHRlYW1MaXN0WzFdID09IEhlcm9fVHlwZS5OVUxMKSB7XHJcbiAgICAgICAgICAgICAgICB0ZWFtTGlzdFsxXSA9IHRvdWNoVGVhbS5nZXRDb21wb25lbnQoSGVyb0l0ZW0pLmhlcm9fdHlwZVxyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRIZXJvKHRvdWNoVGVhbS5nZXRDb21wb25lbnQoSGVyb0l0ZW0pLmhlcm9fdHlwZSwgMSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWNrQnRuQ2xvc2UoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRlYW1MaXN0WzNdID09IC0xIHx8IHRlYW1MaXN0WzNdID09IEhlcm9fVHlwZS5OVUxMKSB7XHJcbiAgICAgICAgICAgICAgICB0ZWFtTGlzdFszXSA9IHRvdWNoVGVhbS5nZXRDb21wb25lbnQoSGVyb0l0ZW0pLmhlcm9fdHlwZVxyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRIZXJvKHRvdWNoVGVhbS5nZXRDb21wb25lbnQoSGVyb0l0ZW0pLmhlcm9fdHlwZSwgMyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWNrQnRuQ2xvc2UoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRlYW1MaXN0WzBdID09IC0xIHx8IHRlYW1MaXN0WzBdID09IEhlcm9fVHlwZS5OVUxMKSB7XHJcbiAgICAgICAgICAgICAgICB0ZWFtTGlzdFswXSA9IHRvdWNoVGVhbS5nZXRDb21wb25lbnQoSGVyb0l0ZW0pLmhlcm9fdHlwZVxyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRIZXJvKHRvdWNoVGVhbS5nZXRDb21wb25lbnQoSGVyb0l0ZW0pLmhlcm9fdHlwZSwgMCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWNrQnRuQ2xvc2UoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRlYW1MaXN0WzRdID09IC0xIHx8IHRlYW1MaXN0WzRdID09IEhlcm9fVHlwZS5OVUxMKSB7XHJcbiAgICAgICAgICAgICAgICB0ZWFtTGlzdFs0XSA9IHRvdWNoVGVhbS5nZXRDb21wb25lbnQoSGVyb0l0ZW0pLmhlcm9fdHlwZVxyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRIZXJvKHRvdWNoVGVhbS5nZXRDb21wb25lbnQoSGVyb0l0ZW0pLmhlcm9fdHlwZSwgNCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWNrQnRuQ2xvc2UoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTAwMDkxKSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG9uVG9nZ2xlQ2hhbmdlKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLnRhZyA9PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGlwTGFiZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIumAieaLqeS4gOS4quiLsembhOWKoOWFpeS9oOeahOmYn+S8jeOAglwiO1xyXG4gICAgICAgICAgICB0aGlzLmhlcm9fQ2hvc2UuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5jaGFyaW90X0Nob3NlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy50YWcgPT0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLmhlcm9fQ2hvc2UuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcmlvdF9DaG9zZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy50aXBMYWJlbC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwi6YCJ5oup5LiA5Liq5oqA6IO95Yqg5by65L2g55qE6Iux6ZuE44CCXCI7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnRhZyA9PSAyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGVyb19DaG9zZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jaGFyaW90X0Nob3NlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMudGlwTGFiZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIumAieaLqeS4gOS4quaKgOiDveeUqOS6juWKoOW8uuS9oOeahOaImOi9puOAglwiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNsaWNrQnRuQ2xvc2UoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLnprvlvIByb2d1ZWxpa2VcIik7XHJcblxyXG4gICAgICAgIGNjLmRpcmVjdG9yLnJlc3VtZSgpO1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfc3RhdGUgPSBHYW1lU3RhdGUuR2FtZV9QbGF5aW5nO1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZExldmVsKCk7XHJcbiAgICAgICAgc3VwZXIub25DbG9zZSgpO1xyXG4gICAgfVxyXG4gICAgLy8gdXBkYXRlIChkdCkge31cclxufVxyXG4iXX0=