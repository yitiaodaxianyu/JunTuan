
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
var LanguageManager_1 = require("../../multiLanguage/LanguageManager");
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
        this.Refreshheroitmestatus();
    };
    RoguelikeTip.prototype.onEnable = function () {
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
        var jdtnumber = 0;
        for (var shuaxingindex = 0; shuaxingindex < HeroListarr.length; shuaxingindex++) {
            this.content.children[shuaxingindex].getComponent(HeroItem_1.default).RefreshHeroesItem(HeroListarr[shuaxingindex].hero_type);
            for (var teamListindex = 0; teamListindex < teamList.length; teamListindex++) {
                if (teamList[teamListindex] == HeroListarr[shuaxingindex].hero_type) {
                    this.content.children[shuaxingindex].getChildByName("shangzheng").active = true;
                }
            }
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
        }
        else if (this.tag == 1) {
            this.tipLabel.getComponent(cc.Label).string = "选择一个技能加强你的英雄。";
        }
        else if (this.tag == 2) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcR2FtZVxcVWlcXFJvZ3VlbGlrZVRpcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVsRiw2Q0FBNEM7QUFDNUMsaURBQTRDO0FBQzVDLDJEQUEwRDtBQUMxRCx5REFBdUQ7QUFDdkQsbURBQThDO0FBQzlDLG9EQUErQztBQUUvQyx1RUFBa0U7QUFFNUQsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBMEMsZ0NBQVc7SUFBckQ7UUFNSSx3QkFBd0I7UUFONUIscUVBMkpDO1FBbkpHLGVBQWU7UUFDZixTQUFHLEdBQVEsQ0FBQyxDQUFDLENBQUEsY0FBYztRQUUzQixxQkFBZSxHQUFTLElBQUksQ0FBQTtRQUc1QixjQUFRLEdBQVMsSUFBSSxDQUFBO1FBR3JCLGFBQU8sR0FBVyxJQUFJLENBQUMsQ0FBQSxTQUFTO1FBR2hDLGVBQVMsR0FBYSxJQUFJLENBQUMsQ0FBQSxVQUFVO1FBRXJDLHdCQUFrQixHQUFTLENBQUMsQ0FBQzs7UUFvSTdCLGlCQUFpQjtJQUNyQixDQUFDO0lBcElHLDZCQUFNLEdBQU47UUFDSSxpQkFBTSxNQUFNLFdBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyxHQUFHLEdBQUMsQ0FBQyxDQUFBO1FBQ1YsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTLEdBQUMsSUFBSSxDQUFDO1FBQ3hFLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzNC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LFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNyQixxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsR0FBQyxxQkFBUyxDQUFDLFlBQVksQ0FBQztRQUNoRSxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3RDLGlCQUFNLE9BQU8sV0FBRSxDQUFDO0lBQ3BCLENBQUM7SUE5SUQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzt5REFDVTtJQUc1QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2tEQUNHO0lBR3JCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7aURBQ0s7SUFHdkI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzttREFDTztJQXBCVixZQUFZO1FBRGhDLE9BQU87T0FDYSxZQUFZLENBMkpoQztJQUFELG1CQUFDO0NBM0pELEFBMkpDLENBM0p5QyxxQkFBVyxHQTJKcEQ7a0JBM0pvQixZQUFZIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuaW1wb3J0IHsgR2FtZVN0YXRlIH0gZnJvbSBcIi4uLy4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uLy4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEhlcm9NYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0hlcm8vRGF0YS9IZXJvTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBIZXJvX1R5cGUgfSBmcm9tIFwiLi4vLi4vSGVyby9HYW1lL0hlcm9Db25maWdcIjtcclxuaW1wb3J0IEhlcm9JdGVtIGZyb20gXCIuLi8uLi9IZXJvL1VpL0hlcm9JdGVtXCI7XHJcbmltcG9ydCBVSUNvbXBvbmVudCBmcm9tIFwiLi4vLi4vVUkvVUlDb21wb25lbnRcIjtcclxuaW1wb3J0IHsgVWlBY3Rpb24gfSBmcm9tIFwiLi4vLi4vVUkvVWlJbnRlcmZhY2VcIjtcclxuaW1wb3J0IExhbmd1YWdlTWFuYWdlciBmcm9tIFwiLi4vLi4vbXVsdGlMYW5ndWFnZS9MYW5ndWFnZU1hbmFnZXJcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm9ndWVsaWtlVGlwIGV4dGVuZHMgVUlDb21wb25lbnQge1xyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuXHJcbiAgICAvLyBvbkxvYWQgKCkge31cclxuICAgIHRhZzpudW1iZXI9MDsvL+mAieaLqXRvZ2dsZeeahOmAieaLqeaVsFxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBUb2dnbGVDb250YWluZXI6Y2MuTm9kZT1udWxsXHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICB0aXBMYWJlbDpjYy5Ob2RlPW51bGxcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGNvbnRlbnQ6Y2MuTm9kZSA9IG51bGw7Ly/oi7Hpm4TpgInmi6nniLboioLngrlcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgaGVyb19pdGVtOmNjLlByZWZhYiA9IG51bGw7Ly/oi7Hpm4TlpLTlg4/nmoTpooTliLbkvZNcclxuXHJcbiAgICBncmV5YnV0dG9uanVkZ21lbnQ6IG51bWJlcj0wO1xyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgICBzdXBlci5vbkxvYWQoKTtcclxuICAgICAgICB0aGlzLnRhZz0wXHJcbiAgICAgICAgdGhpcy5Ub2dnbGVDb250YWluZXIuY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLlRvZ2dsZSkuaXNDaGVja2VkPXRydWU7XHJcbiAgICAgICAgdGhpcy5vblRvZ2dsZUNoYW5nZSgpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi6L+b5YWlUm9ndWVMaWtlXCIpO1xyXG4gICAgICAgIHRoaXMuUmVmcmVzaGhlcm9pdG1lc3RhdHVzKCk7XHJcbiAgICB9XHJcbiAgICBvbkVuYWJsZSgpe1xyXG4gICAgIFxyXG4gICAgfVxyXG4gICAgY2xpY2tCdG5Ub2dnbGUoZXZlbixpKXsvL+WNlemAieaMiemSrueahOmAieaLqVxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiKysrKysrK1wiLGV2ZW4saSlcclxuICAgICAgICB0aGlzLnRhZz1pO1xyXG4gICAgICAgIHRoaXMub25Ub2dnbGVDaGFuZ2UoKTtcclxuICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByaXZhdGUgUmVmcmVzaGhlcm9pdG1lc3RhdHVzKCk6dm9pZHtcclxuICAgICAgICAvL+W3suino+mUgeeahOiLsembhFxyXG4gICAgICAgIGxldCBIZXJvTGlzdD1IZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9MaXN0KCkvL+aVsOmHjyAgIOiLsembhGlk57G75Z6LIOiLsembhOetiee6pyDoi7Hpm4Tlk4HotKggIOiLsembhOaYn+aYn+mYtuautVxyXG4gICAgICBcclxuICAgICAgICBsZXQgaGVyb0Jhc2ljZGF0YWFycj1bXS8v5pyA6auY5oiY5Yqb5pWw57uEXHJcbiAgICAgICAgbGV0IEhlcm9MaXN0YXJyPUhlcm9MaXN0Ly/lt7Lop6PplIHnmoToi7Hpm4RcclxuICAgICAgICBmb3IgKGxldCBoZXJvaW5kZXggPSAwOyBoZXJvaW5kZXggPCBIZXJvTGlzdC5sZW5ndGg7IGhlcm9pbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGxldCBoZXJvID0gY2MuaW5zdGFudGlhdGUodGhpcy5oZXJvX2l0ZW0pO1xyXG4gICAgICAgICAgICBoZXJvLm5hbWU9XCJcIitoZXJvaW5kZXhcclxuICAgICAgICAgICAgaGVyby5zZXRTY2FsZSgwLjc1LDAuNzUpXHJcbiAgICAgICAgICAgIHRoaXMuY29udGVudC5hZGRDaGlsZChoZXJvKTtcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaGVyby5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMub25IZXJvSXRlbVRvdWNoRW5kLCB0aGlzKTtcclxuICAgICAgICAgICAgLy8gaGVyby5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9DQU5DRUwsIHRoaXMub25IZXJvSXRlbVRvdWNoQ2FuY2VsLCB0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jb250ZW50LmdldENvbXBvbmVudChjYy5MYXlvdXQpLnVwZGF0ZUxheW91dCgpO1xyXG4gICAgICAgICAvL+WIt+aWsOiLsembhGl0bWVcclxuICAgICAgICBmb3IgKGxldCBoZXJvQmFzaWNkYXRhaW5kZXggPSAwOyBoZXJvQmFzaWNkYXRhaW5kZXggPCBIZXJvTGlzdC5sZW5ndGg7IGhlcm9CYXNpY2RhdGFpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGxldCBoZXJvQmFzaWNkYXRhPUhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb0RhdGEoSGVyb0xpc3RbaGVyb0Jhc2ljZGF0YWluZGV4XS5oZXJvX3R5cGUpLy/oi7Hpm4TnmoTln7rnoYDmlbDmja4gICDkvKDlhaXoi7Hpm4RpZOexu+WeiyAg6Ziy5b6h5YqbICDnlJ/lkb3lgLwgIOWRveS4reWAvCBcclxuICAgICAgICAgICAgaGVyb0Jhc2ljZGF0YWFyci5wdXNoKGhlcm9CYXNpY2RhdGEudG90YWxfYXR0YWNrKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgIC8v5o6S5YiX6Iux6ZuE5oiY5YqbXHJcbiAgICAgICAgIGxldCBjdW5cclxuICAgICAgICAgbGV0IGhlcm9jdW5cclxuICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGhlcm9CYXNpY2RhdGFhcnIubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICBmb3IgKGxldCBwYWl4dmluZGV4ID0gMDsgcGFpeHZpbmRleCA8IGhlcm9CYXNpY2RhdGFhcnIubGVuZ3RoLTE7IHBhaXh2aW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgIGlmKGhlcm9CYXNpY2RhdGFhcnJbcGFpeHZpbmRleCsxXT5oZXJvQmFzaWNkYXRhYXJyW3BhaXh2aW5kZXhdKXtcclxuICAgICAgICAgICAgICAgICAgICAgY3VuPWhlcm9CYXNpY2RhdGFhcnJbcGFpeHZpbmRleF1cclxuICAgICAgICAgICAgICAgICAgICAgaGVyb0Jhc2ljZGF0YWFycltwYWl4dmluZGV4XT1oZXJvQmFzaWNkYXRhYXJyW3BhaXh2aW5kZXgrMV1cclxuICAgICAgICAgICAgICAgICAgICAgaGVyb0Jhc2ljZGF0YWFycltwYWl4dmluZGV4KzFdPWN1blxyXG4gXHJcbiAgICAgICAgICAgICAgICAgICAgIGhlcm9jdW49SGVyb0xpc3RhcnJbcGFpeHZpbmRleF1cclxuICAgICAgICAgICAgICAgICAgICAgSGVyb0xpc3RhcnJbcGFpeHZpbmRleF09SGVyb0xpc3RhcnJbcGFpeHZpbmRleCsxXVxyXG4gICAgICAgICAgICAgICAgICAgICBIZXJvTGlzdGFycltwYWl4dmluZGV4KzFdPWhlcm9jdW5cclxuICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgIH1cclxuICAgICAgICAgbGV0IHRlYW1MaXN0PUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX3RlYW1fbGlzdDtcclxuXHJcbiAgICAgICAgICAgICAgIC8v5Yi35paw6Iux6ZuEaXRtZeeKtuaAgVxyXG4gICAgICAgIC8v6KGA6YePXHJcbiAgICAgICAgbGV0IGpkdG51bWJlcj0wXHJcbiAgICAgICAgZm9yIChsZXQgc2h1YXhpbmdpbmRleCA9IDA7IHNodWF4aW5naW5kZXggPCBIZXJvTGlzdGFyci5sZW5ndGg7IHNodWF4aW5naW5kZXgrKykge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQuY2hpbGRyZW5bc2h1YXhpbmdpbmRleF0uZ2V0Q29tcG9uZW50KEhlcm9JdGVtKS5SZWZyZXNoSGVyb2VzSXRlbShIZXJvTGlzdGFycltzaHVheGluZ2luZGV4XS5oZXJvX3R5cGUpXHJcbiAgICAgICAgICAgIGZvciAobGV0IHRlYW1MaXN0aW5kZXggPSAwOyB0ZWFtTGlzdGluZGV4IDwgdGVhbUxpc3QubGVuZ3RoOyB0ZWFtTGlzdGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIGlmKHRlYW1MaXN0W3RlYW1MaXN0aW5kZXhdPT1IZXJvTGlzdGFycltzaHVheGluZ2luZGV4XS5oZXJvX3R5cGUpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5jaGlsZHJlbltzaHVheGluZ2luZGV4XS5nZXRDaGlsZEJ5TmFtZShcInNoYW5nemhlbmdcIikuYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIFxyXG4gICAgfVxyXG4gICAgb25IZXJvSXRlbVRvdWNoRW5kKGU6Y2MuRXZlbnQuRXZlbnRUb3VjaCkge1xyXG4gICAgICAgIGxldCB0b3VjaFRlYW09ZS5nZXRDdXJyZW50VGFyZ2V0KCk7XHJcblxyXG4gICAgICAgXHJcbiAgICAgICAgaWYodG91Y2hUZWFtLmdldENoaWxkQnlOYW1lKFwic2hhbmd6aGVuZ1wiKS5hY3RpdmU9PWZhbHNlKXtcclxuICAgICAgICAgICAgLy/kuIrpmLXor6Xoi7Hpm4RcclxuICAgICAgICAgICAgbGV0IHRlYW1MaXN0PUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX3RlYW1fbGlzdDtcclxuICAgICAgICAgICAgaWYodGVhbUxpc3RbMV09PS0xfHx0ZWFtTGlzdFsxXT09SGVyb19UeXBlLk5VTEwpe1xyXG4gICAgICAgICAgICAgICAgdGVhbUxpc3RbMV09dG91Y2hUZWFtLmdldENvbXBvbmVudChIZXJvSXRlbSkuaGVyb190eXBlXHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEhlcm8odG91Y2hUZWFtLmdldENvbXBvbmVudChIZXJvSXRlbSkuaGVyb190eXBlLDEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGlja0J0bkNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKHRlYW1MaXN0WzNdPT0tMXx8dGVhbUxpc3RbM109PUhlcm9fVHlwZS5OVUxMKXtcclxuICAgICAgICAgICAgICAgIHRlYW1MaXN0WzNdPXRvdWNoVGVhbS5nZXRDb21wb25lbnQoSGVyb0l0ZW0pLmhlcm9fdHlwZVxyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRIZXJvKHRvdWNoVGVhbS5nZXRDb21wb25lbnQoSGVyb0l0ZW0pLmhlcm9fdHlwZSwzKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xpY2tCdG5DbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZih0ZWFtTGlzdFswXT09LTF8fHRlYW1MaXN0WzBdPT1IZXJvX1R5cGUuTlVMTCl7XHJcbiAgICAgICAgICAgICAgICB0ZWFtTGlzdFswXT10b3VjaFRlYW0uZ2V0Q29tcG9uZW50KEhlcm9JdGVtKS5oZXJvX3R5cGVcclxuICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkSGVybyh0b3VjaFRlYW0uZ2V0Q29tcG9uZW50KEhlcm9JdGVtKS5oZXJvX3R5cGUsMCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWNrQnRuQ2xvc2UoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYodGVhbUxpc3RbNF09PS0xfHx0ZWFtTGlzdFs0XT09SGVyb19UeXBlLk5VTEwpe1xyXG4gICAgICAgICAgICAgICAgdGVhbUxpc3RbNF09dG91Y2hUZWFtLmdldENvbXBvbmVudChIZXJvSXRlbSkuaGVyb190eXBlXHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEhlcm8odG91Y2hUZWFtLmdldENvbXBvbmVudChIZXJvSXRlbSkuaGVyb190eXBlLDQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGlja0J0bkNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCgxMDAwOTEpKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByaXZhdGUgb25Ub2dnbGVDaGFuZ2UoKTp2b2lke1xyXG4gICAgICAgIGlmKHRoaXMudGFnPT0wKXtcclxuICAgICAgICAgICAgdGhpcy50aXBMYWJlbC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1cIumAieaLqeS4gOS4quiLsembhOWKoOWFpeS9oOeahOmYn+S8jeOAglwiO1xyXG4gICAgICAgIH1lbHNlIGlmKHRoaXMudGFnPT0xKXtcclxuICAgICAgICAgICAgdGhpcy50aXBMYWJlbC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1cIumAieaLqeS4gOS4quaKgOiDveWKoOW8uuS9oOeahOiLsembhOOAglwiO1xyXG4gICAgICAgIH1lbHNlIGlmKHRoaXMudGFnPT0yKXtcclxuICAgICAgICAgICAgdGhpcy50aXBMYWJlbC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1cIumAieaLqeS4gOS4quaKgOiDveeUqOS6juWKoOW8uuS9oOeahOaImOi9puOAglwiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNsaWNrQnRuQ2xvc2UoKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIuemu+W8gHJvZ3VlbGlrZVwiKTtcclxuICAgICAgICBcclxuICAgICAgICBjYy5kaXJlY3Rvci5yZXN1bWUoKTtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX3N0YXRlPUdhbWVTdGF0ZS5HYW1lX1BsYXlpbmc7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5sb2FkTGV2ZWwoKTsgXHJcbiAgICAgICAgc3VwZXIub25DbG9zZSgpO1xyXG4gICAgfVxyXG4gICAgLy8gdXBkYXRlIChkdCkge31cclxufVxyXG4iXX0=