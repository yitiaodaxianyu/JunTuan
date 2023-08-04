
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/GuaJi/levelnode.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '22d3eHD8bZEu7kFmC0UvHMb', 'levelnode');
// Scripts/GuaJi/levelnode.ts

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
var LevelManager_1 = require("../Level/LevelManager");
var MissionLevel_1 = require("../Level/MissionLevel");
var ChallengeRoundPop_1 = require("./ChallengeRoundPop");
var MapManager_1 = require("./MapManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var levelnode = /** @class */ (function (_super) {
    __extends(levelnode, _super);
    function levelnode() {
        // @property(cc.Label)
        // label: cc.Label = null;
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // @property
        // text: string = 'hello';
        // LIFE-CYCLE CALLBACKS:
        _this.level = 0; //关卡节点代表的是哪个关卡   默认1
        _this.Battletoken = null; //正在战斗标识
        _this.Bosstoken = null; //Boss标识
        _this.Star = []; //星星
        _this.StarSpriteFrams = []; //星星  1:亮起  0:灭掉 
        return _this;
        // update (dt) {}
    }
    // onLoad () {}
    levelnode.prototype.start = function () {
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    };
    // protected onEnable(): void {
    // }
    levelnode.prototype.onTouchEnd = function () {
        // console.log("++++++++",MapManager.ChallengeRoundPops)
        MapManager_1.default.ChallengeRoundPops.getComponent(ChallengeRoundPop_1.default).init(this.level);
    };
    levelnode.prototype.init = function (level) {
        this.level = level;
        var myCurrentlevel = LevelManager_1.LevelManager.getInstance().finish_level + 1; //当前最大关卡
        //坐标
        var pos = MissionLevel_1.MissionLevelManager.getInstance().getJsonLevelPosXY(level);
        // console.log("_________",pos)
        this.node.setPosition(pos);
        //关卡名字
        this.node.getChildByName("level").getComponent(cc.Label).string = "第" + MissionLevel_1.MissionLevelManager.getInstance().getLevelName(level) + "章";
        for (var Starindex = 0; Starindex < this.Star.length; Starindex++) {
            this.Star[Starindex].active = false;
        }
        this.Battletoken.active = false;
        this.Bosstoken.active = false;
        // let Starnumber=0;
        // if(level<myCurrentlevel){
        //     for (let LevelStarindex = 1; LevelStarindex <4; LevelStarindex++) {
        //         if(LevelManager.getInstance().getALevelStar(level,LevelStarindex)){
        //             Starnumber++
        //         }
        //     }
        // }
        // for (let Maskindex = 0; Maskindex < this.Mask.length; Maskindex++) {
        //     if(Maskindex<Starnumber){
        //         this.Mask[Maskindex].active=true
        //         this.lqu[Maskindex].active=true
        //     }else{
        //         this.Mask[Maskindex].active=false
        //         this.lqu[Maskindex].active=false
        //     } 
        // }
        var Starnumber = 0;
        //是否完成的状态
        if (level < myCurrentlevel) { //当前关卡小于最大关卡   代表已完成，有星星数量，没有战斗标识
            for (var LevelStarindex = 1; LevelStarindex < 4; LevelStarindex++) {
                if (LevelManager_1.LevelManager.getInstance().getALevelStar(level, LevelStarindex)) {
                    Starnumber++;
                }
            }
            for (var Starindex = 0; Starindex < this.Star.length; Starindex++) {
                //亮起几颗星星
                this.Star[Starindex].active = true;
                if (Starindex < Starnumber) {
                    // console.log("___________",Starindex,Starnumber)
                    this.Star[Starindex].getComponent(cc.Sprite).spriteFrame = this.StarSpriteFrams[1];
                }
                else {
                    this.Star[Starindex].getComponent(cc.Sprite).spriteFrame = this.StarSpriteFrams[0];
                }
            }
        }
        // console.log("++++++++",Starnumber)
        if (level == myCurrentlevel) { //当前关卡等于最大关卡   代表正要前往这个关卡   没有星星数量，有战斗标识
            this.Battletoken.active = true;
        }
        if (level > myCurrentlevel) {
            if (MissionLevel_1.MissionLevelManager.getInstance().getLevelTypes(level) == 3) {
                if (Starnumber == 0) {
                    this.Bosstoken.active = true;
                }
                else {
                    this.Bosstoken.active = false;
                }
            }
        }
    };
    __decorate([
        property(cc.Node)
    ], levelnode.prototype, "Battletoken", void 0);
    __decorate([
        property(cc.Node)
    ], levelnode.prototype, "Bosstoken", void 0);
    __decorate([
        property(cc.Node)
    ], levelnode.prototype, "Star", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], levelnode.prototype, "StarSpriteFrams", void 0);
    levelnode = __decorate([
        ccclass
    ], levelnode);
    return levelnode;
}(cc.Component));
exports.default = levelnode;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcR3VhSmlcXGxldmVsbm9kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVsRixzREFBcUQ7QUFDckQsc0RBQTREO0FBQzVELHlEQUFvRDtBQUNwRCwyQ0FBc0M7QUFFaEMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBdUMsNkJBQVk7SUFBbkQ7UUFFSSxzQkFBc0I7UUFDdEIsMEJBQTBCO1FBSDlCLHFFQXNHQztRQWpHRyxZQUFZO1FBQ1osMEJBQTBCO1FBRTFCLHdCQUF3QjtRQUN4QixXQUFLLEdBQVEsQ0FBQyxDQUFBLENBQUEsb0JBQW9CO1FBRWxDLGlCQUFXLEdBQVMsSUFBSSxDQUFBLENBQUEsUUFBUTtRQUVoQyxlQUFTLEdBQVMsSUFBSSxDQUFBLENBQUEsUUFBUTtRQUU5QixVQUFJLEdBQVcsRUFBRSxDQUFBLENBQUEsSUFBSTtRQUVyQixxQkFBZSxHQUFrQixFQUFFLENBQUMsQ0FBQSxpQkFBaUI7O1FBb0ZyRCxpQkFBaUI7SUFDckIsQ0FBQztJQXBGRyxlQUFlO0lBRWYseUJBQUssR0FBTDtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBQyxJQUFJLENBQUMsVUFBVSxFQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFDRCwrQkFBK0I7SUFFL0IsSUFBSTtJQUNKLDhCQUFVLEdBQVY7UUFDSSx3REFBd0Q7UUFDeEQsb0JBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsMkJBQWlCLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFB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UUFDRCxJQUFHLEtBQUssR0FBQyxjQUFjLEVBQUM7WUFDcEIsSUFBRyxrQ0FBbUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLElBQUUsQ0FBQyxFQUFDO2dCQUN6RCxJQUFHLFVBQVUsSUFBRSxDQUFDLEVBQUM7b0JBQ2IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFBO2lCQUM3QjtxQkFBSTtvQkFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBQyxLQUFLLENBQUE7aUJBQzlCO2FBQ0o7U0FDSjtJQUNMLENBQUM7SUF4RkQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztrREFDTTtJQUV4QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2dEQUNJO0lBRXRCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7MkNBQ0Q7SUFFakI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQztzREFDVztJQWpCbkIsU0FBUztRQUQ3QixPQUFPO09BQ2EsU0FBUyxDQXNHN0I7SUFBRCxnQkFBQztDQXRHRCxBQXNHQyxDQXRHc0MsRUFBRSxDQUFDLFNBQVMsR0FzR2xEO2tCQXRHb0IsU0FBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuXHJcbmltcG9ydCB7IExldmVsTWFuYWdlciB9IGZyb20gXCIuLi9MZXZlbC9MZXZlbE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgTWlzc2lvbkxldmVsTWFuYWdlciB9IGZyb20gXCIuLi9MZXZlbC9NaXNzaW9uTGV2ZWxcIjtcclxuaW1wb3J0IENoYWxsZW5nZVJvdW5kUG9wIGZyb20gXCIuL0NoYWxsZW5nZVJvdW5kUG9wXCI7XHJcbmltcG9ydCBNYXBNYW5hZ2VyIGZyb20gXCIuL01hcE1hbmFnZXJcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgbGV2ZWxub2RlIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICAvLyBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICAvLyBsYWJlbDogY2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIC8vIEBwcm9wZXJ0eVxyXG4gICAgLy8gdGV4dDogc3RyaW5nID0gJ2hlbGxvJztcclxuXHJcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuICAgIGxldmVsOm51bWJlcj0wLy/lhbPljaHoioLngrnku6PooajnmoTmmK/lk6rkuKrlhbPljaEgICDpu5jorqQxXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIEJhdHRsZXRva2VuOmNjLk5vZGU9bnVsbC8v5q2j5Zyo5oiY5paX5qCH6K+GXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIEJvc3N0b2tlbjpjYy5Ob2RlPW51bGwvL0Jvc3PmoIfor4ZcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgU3RhcjpjYy5Ob2RlW109W10vL+aYn+aYn1xyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZUZyYW1lKVxyXG4gICAgU3RhclNwcml0ZUZyYW1zOmNjLlNwcml0ZUZyYW1lW109W107Ly/mmJ/mmJ8gIDE65Lqu6LW3ICAwOueBreaOiSBcclxuICAgIC8vIG9uTG9hZCAoKSB7fVxyXG5cclxuICAgIHN0YXJ0ICgpIHtcclxuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELHRoaXMub25Ub3VjaEVuZCx0aGlzKTtcclxuICAgIH1cclxuICAgIC8vIHByb3RlY3RlZCBvbkVuYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICBcclxuICAgIC8vIH1cclxuICAgIG9uVG91Y2hFbmQoKXtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIisrKysrKysrXCIsTWFwTWFuYWdlci5DaGFsbGVuZ2VSb3VuZFBvcHMpXHJcbiAgICAgICAgTWFwTWFuYWdlci5DaGFsbGVuZ2VSb3VuZFBvcHMuZ2V0Q29tcG9uZW50KENoYWxsZW5nZVJvdW5kUG9wKS5pbml0KHRoaXMubGV2ZWwpXHJcbiAgICB9XHJcbiAgICBpbml0KGxldmVsKXtcclxuICAgICAgICB0aGlzLmxldmVsPWxldmVsXHJcbiAgICAgICAgbGV0IG15Q3VycmVudGxldmVsPUxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmZpbmlzaF9sZXZlbCsxOy8v5b2T5YmN5pyA5aSn5YWz5Y2hXHJcbiAgICAgICAgLy/lnZDmoIdcclxuICAgICAgICBsZXQgcG9zPU1pc3Npb25MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRKc29uTGV2ZWxQb3NYWShsZXZlbClcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIl9fX19fX19fX1wiLHBvcylcclxuICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24ocG9zKVxyXG5cclxuICAgICAgICAvL+WFs+WNoeWQjeWtl1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImxldmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPVwi56ysXCIrTWlzc2lvbkxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldExldmVsTmFtZShsZXZlbCkrXCLnq6BcIjtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgU3RhcmluZGV4ID0gMDsgU3RhcmluZGV4IDwgdGhpcy5TdGFyLmxlbmd0aDsgU3RhcmluZGV4KyspIHtcclxuICAgICAgICAgICAgdGhpcy5TdGFyW1N0YXJpbmRleF0uYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuQmF0dGxldG9rZW4uYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgdGhpcy5Cb3NzdG9rZW4uYWN0aXZlPWZhbHNlXHJcblxyXG5cclxuICAgICAgICAvLyBsZXQgU3Rhcm51bWJlcj0wO1xyXG4gICAgICAgIC8vIGlmKGxldmVsPG15Q3VycmVudGxldmVsKXtcclxuICAgICAgICAvLyAgICAgZm9yIChsZXQgTGV2ZWxTdGFyaW5kZXggPSAxOyBMZXZlbFN0YXJpbmRleCA8NDsgTGV2ZWxTdGFyaW5kZXgrKykge1xyXG4gICAgICAgIC8vICAgICAgICAgaWYoTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0QUxldmVsU3RhcihsZXZlbCxMZXZlbFN0YXJpbmRleCkpe1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIFN0YXJudW1iZXIrK1xyXG4gICAgICAgIC8vICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIGZvciAobGV0IE1hc2tpbmRleCA9IDA7IE1hc2tpbmRleCA8IHRoaXMuTWFzay5sZW5ndGg7IE1hc2tpbmRleCsrKSB7XHJcbiAgICAgICAgLy8gICAgIGlmKE1hc2tpbmRleDxTdGFybnVtYmVyKXtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMuTWFza1tNYXNraW5kZXhdLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLmxxdVtNYXNraW5kZXhdLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAvLyAgICAgfWVsc2V7XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLk1hc2tbTWFza2luZGV4XS5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMubHF1W01hc2tpbmRleF0uYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgLy8gICAgIH0gXHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIGxldCBTdGFybnVtYmVyPTA7XHJcbiAgICAgICAgLy/mmK/lkKblrozmiJDnmoTnirbmgIFcclxuICAgICAgICBpZihsZXZlbDxteUN1cnJlbnRsZXZlbCl7Ly/lvZPliY3lhbPljaHlsI/kuo7mnIDlpKflhbPljaEgICDku6Pooajlt7LlrozmiJDvvIzmnInmmJ/mmJ/mlbDph4/vvIzmsqHmnInmiJjmlpfmoIfor4ZcclxuICAgICAgICAgICAgZm9yIChsZXQgTGV2ZWxTdGFyaW5kZXggPSAxOyBMZXZlbFN0YXJpbmRleCA8NDsgTGV2ZWxTdGFyaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgaWYoTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0QUxldmVsU3RhcihsZXZlbCxMZXZlbFN0YXJpbmRleCkpe1xyXG4gICAgICAgICAgICAgICAgICAgIFN0YXJudW1iZXIrK1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAobGV0IFN0YXJpbmRleCA9IDA7IFN0YXJpbmRleCA8IHRoaXMuU3Rhci5sZW5ndGg7IFN0YXJpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAvL+S6rui1t+WHoOmil+aYn+aYn1xyXG4gICAgICAgICAgICAgICAgdGhpcy5TdGFyW1N0YXJpbmRleF0uYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgICAgIGlmKFN0YXJpbmRleDxTdGFybnVtYmVyKXtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIl9fX19fX19fX19fXCIsU3RhcmluZGV4LFN0YXJudW1iZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5TdGFyW1N0YXJpbmRleF0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWU9dGhpcy5TdGFyU3ByaXRlRnJhbXNbMV1cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuU3RhcltTdGFyaW5kZXhdLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lPXRoaXMuU3RhclNwcml0ZUZyYW1zWzBdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiKysrKysrKytcIixTdGFybnVtYmVyKVxyXG4gICAgICAgIGlmKGxldmVsPT1teUN1cnJlbnRsZXZlbCl7Ly/lvZPliY3lhbPljaHnrYnkuo7mnIDlpKflhbPljaEgICDku6PooajmraPopoHliY3lvoDov5nkuKrlhbPljaEgICDmsqHmnInmmJ/mmJ/mlbDph4/vvIzmnInmiJjmlpfmoIfor4ZcclxuICAgICAgICAgICAgdGhpcy5CYXR0bGV0b2tlbi5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihsZXZlbD5teUN1cnJlbnRsZXZlbCl7XHJcbiAgICAgICAgICAgIGlmKE1pc3Npb25MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRMZXZlbFR5cGVzKGxldmVsKT09Myl7XHJcbiAgICAgICAgICAgICAgICBpZihTdGFybnVtYmVyPT0wKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkJvc3N0b2tlbi5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Cb3NzdG9rZW4uYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge31cclxufVxyXG4iXX0=