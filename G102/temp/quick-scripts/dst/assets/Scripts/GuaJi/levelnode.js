
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
        this.node.getChildByName("level").getComponent(cc.Label).string = "" + MissionLevel_1.MissionLevelManager.getInstance().getLevelName(level);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcR3VhSmlcXGxldmVsbm9kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVsRixzREFBcUQ7QUFDckQsc0RBQTREO0FBQzVELHlEQUFvRDtBQUNwRCwyQ0FBc0M7QUFFaEMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBdUMsNkJBQVk7SUFBbkQ7UUFFSSxzQkFBc0I7UUFDdEIsMEJBQTBCO1FBSDlCLHFFQXNHQztRQWpHRyxZQUFZO1FBQ1osMEJBQTBCO1FBRTFCLHdCQUF3QjtRQUN4QixXQUFLLEdBQVEsQ0FBQyxDQUFBLENBQUEsb0JBQW9CO1FBRWxDLGlCQUFXLEdBQVMsSUFBSSxDQUFBLENBQUEsUUFBUTtRQUVoQyxlQUFTLEdBQVMsSUFBSSxDQUFBLENBQUEsUUFBUTtRQUU5QixVQUFJLEdBQVcsRUFBRSxDQUFBLENBQUEsSUFBSTtRQUVyQixxQkFBZSxHQUFrQixFQUFFLENBQUMsQ0FBQSxpQkFBaUI7O1FBb0ZyRCxpQkFBaUI7SUFDckIsQ0FBQztJQXBGRyxlQUFlO0lBRWYseUJBQUssR0FBTDtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBQyxJQUFJLENBQUMsVUFBVSxFQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFDRCwrQkFBK0I7SUFFL0IsSUFBSTtJQUNKLDhCQUFVLEdBQVY7UUFDSSx3REFBd0Q7UUFDeEQsb0JBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsMkJBQWlCLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ2xGLENBQUM7SUFDRCx3QkFBSSxHQUFKLFVBQUssS0FBSztRQUNOLElBQUksQ0FBQyxLQUFLLEdBQUMsS0FBSyxDQUFBO1FBQ2hCLElBQUksY0FBYyxHQUFDLDJCQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsWUFBWSxHQUFDLENBQUMsQ0FBQyxDQUFBLFFBQVE7UUFDckUsSUFBSTtRQUNKLElBQUksR0FBRyxHQUFDLGtDQUFtQixDQUFDLFdBQVcsRUFBRSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ2xFLCtCQUErQjtRQUMvQixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUUxQixNQUFNO1FBQ04sSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUMsRUFBRSxHQUFDLGtDQUFtQixDQUFDLFdBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUV4SCxLQUFLLElBQUksU0FBUyxHQUFHLENBQUMsRUFBRSxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUU7WUFDL0QsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLEdBQUMsS0FBSyxDQUFBO1NBQ3BDO1FBQ0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUMsS0FBSyxDQUFBO1FBQzdCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFDLEtBQUssQ0FBQTtRQUczQixvQkFBb0I7UUFDcEIsNEJBQTRCO1FBQzVCLDBFQUEwRTtRQUMxRSw4RUFBOEU7UUFDOUUsMkJBQTJCO1FBQzNCLFlBQVk7UUFDWixRQUFRO1FBQ1IsSUFBSTtRQUNKLHVFQUF1RTtRQUN2RSxnQ0FBZ0M7UUFDaEMsMkNBQTJDO1FBQzNDLDBDQUEwQztRQUUxQyxhQUFhO1FBQ2IsNENBQTRDO1FBQzVDLDJDQUEyQztRQUMzQyxTQUFTO1FBQ1QsSUFBSTtRQUNKLElBQUksVUFBVSxHQUFDLENBQUMsQ0FBQztRQUNqQixTQUFTO1FBQ1QsSUFBRyxLQUFLLEdBQUMsY0FBYyxFQUFDLEVBQUMsaUNBQWlDO1lBQ3RELEtBQUssSUFBSSxjQUFjLEdBQUcsQ0FBQyxFQUFFLGNBQWMsR0FBRSxDQUFDLEVBQUUsY0FBYyxFQUFFLEVBQUU7Z0JBQzlELElBQUcsMkJBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFDLGNBQWMsQ0FBQyxFQUFDO29CQUM5RCxVQUFVLEVBQUUsQ0FBQTtpQkFDZjthQUNKO1lBQ0QsS0FBSyxJQUFJLFNBQVMsR0FBRyxDQUFDLEVBQUUsU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFO2dCQUMvRCxRQUFRO2dCQUNSLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQTtnQkFDaEMsSUFBRyxTQUFTLEdBQUMsVUFBVSxFQUFDO29CQUNwQixrREFBa0Q7b0JBQ2xELElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLEdBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtpQkFDbkY7cUJBQUk7b0JBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsR0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFBO2lCQUNuRjthQUNKO1NBQ0o7UUFFRCxxQ0FBcUM7UUFDckMsSUFBRyxLQUFLLElBQUUsY0FBYyxFQUFDLEVBQUMsd0NBQXdDO1lBQzlELElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQTtTQUMvQjtRQUNELElBQUcsS0FBSyxHQUFDLGNBQWMsRUFBQztZQUNwQixJQUFHLGtDQUFtQixDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsSUFBRSxDQUFDLEVBQUM7Z0JBQ3pELElBQUcsVUFBVSxJQUFFLENBQUMsRUFBQztvQkFDYixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBQyxJQUFJLENBQUE7aUJBQzdCO3FCQUFJO29CQUNELElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFDLEtBQUssQ0FBQTtpQkFDOUI7YUFDSjtTQUNKO0lBQ0wsQ0FBQztJQXhGRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2tEQUNNO0lBRXhCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7Z0RBQ0k7SUFFdEI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzsyQ0FDRDtJQUVqQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDO3NEQUNXO0lBakJuQixTQUFTO1FBRDdCLE9BQU87T0FDYSxTQUFTLENBc0c3QjtJQUFELGdCQUFDO0NBdEdELEFBc0dDLENBdEdzQyxFQUFFLENBQUMsU0FBUyxHQXNHbEQ7a0JBdEdvQixTQUFTIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuaW1wb3J0IHsgTGV2ZWxNYW5hZ2VyIH0gZnJvbSBcIi4uL0xldmVsL0xldmVsTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBNaXNzaW9uTGV2ZWxNYW5hZ2VyIH0gZnJvbSBcIi4uL0xldmVsL01pc3Npb25MZXZlbFwiO1xyXG5pbXBvcnQgQ2hhbGxlbmdlUm91bmRQb3AgZnJvbSBcIi4vQ2hhbGxlbmdlUm91bmRQb3BcIjtcclxuaW1wb3J0IE1hcE1hbmFnZXIgZnJvbSBcIi4vTWFwTWFuYWdlclwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBsZXZlbG5vZGUgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIC8vIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIC8vIGxhYmVsOiBjYy5MYWJlbCA9IG51bGw7XHJcblxyXG4gICAgLy8gQHByb3BlcnR5XHJcbiAgICAvLyB0ZXh0OiBzdHJpbmcgPSAnaGVsbG8nO1xyXG5cclxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxyXG4gICAgbGV2ZWw6bnVtYmVyPTAvL+WFs+WNoeiKgueCueS7o+ihqOeahOaYr+WTquS4quWFs+WNoSAgIOm7mOiupDFcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgQmF0dGxldG9rZW46Y2MuTm9kZT1udWxsLy/mraPlnKjmiJjmlpfmoIfor4ZcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgQm9zc3Rva2VuOmNjLk5vZGU9bnVsbC8vQm9zc+agh+ivhlxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBTdGFyOmNjLk5vZGVbXT1bXS8v5pif5pifXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlRnJhbWUpXHJcbiAgICBTdGFyU3ByaXRlRnJhbXM6Y2MuU3ByaXRlRnJhbWVbXT1bXTsvL+aYn+aYnyAgMTrkuq7otbcgIDA654Gt5o6JIFxyXG4gICAgLy8gb25Mb2FkICgpIHt9XHJcblxyXG4gICAgc3RhcnQgKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsdGhpcy5vblRvdWNoRW5kLHRoaXMpO1xyXG4gICAgfVxyXG4gICAgLy8gcHJvdGVjdGVkIG9uRW5hYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIFxyXG4gICAgLy8gfVxyXG4gICAgb25Ub3VjaEVuZCgpe1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiKysrKysrKytcIixNYXBNYW5hZ2VyLkNoYWxsZW5nZVJvdW5kUG9wcylcclxuICAgICAgICBNYXBNYW5hZ2VyLkNoYWxsZW5nZVJvdW5kUG9wcy5nZXRDb21wb25lbnQoQ2hhbGxlbmdlUm91bmRQb3ApLmluaXQodGhpcy5sZXZlbClcclxuICAgIH1cclxuICAgIGluaXQobGV2ZWwpe1xyXG4gICAgICAgIHRoaXMubGV2ZWw9bGV2ZWxcclxuICAgICAgICBsZXQgbXlDdXJyZW50bGV2ZWw9TGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZmluaXNoX2xldmVsKzE7Ly/lvZPliY3mnIDlpKflhbPljaFcclxuICAgICAgICAvL+WdkOagh1xyXG4gICAgICAgIGxldCBwb3M9TWlzc2lvbkxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25MZXZlbFBvc1hZKGxldmVsKVxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiX19fX19fX19fXCIscG9zKVxyXG4gICAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbihwb3MpXHJcblxyXG4gICAgICAgIC8v5YWz5Y2h5ZCN5a2XXHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwibGV2ZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9XCJcIitNaXNzaW9uTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TGV2ZWxOYW1lKGxldmVsKVxyXG5cclxuICAgICAgICBmb3IgKGxldCBTdGFyaW5kZXggPSAwOyBTdGFyaW5kZXggPCB0aGlzLlN0YXIubGVuZ3RoOyBTdGFyaW5kZXgrKykge1xyXG4gICAgICAgICAgICB0aGlzLlN0YXJbU3RhcmluZGV4XS5hY3RpdmU9ZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5CYXR0bGV0b2tlbi5hY3RpdmU9ZmFsc2VcclxuICAgICAgICB0aGlzLkJvc3N0b2tlbi5hY3RpdmU9ZmFsc2VcclxuXHJcblxyXG4gICAgICAgIC8vIGxldCBTdGFybnVtYmVyPTA7XHJcbiAgICAgICAgLy8gaWYobGV2ZWw8bXlDdXJyZW50bGV2ZWwpe1xyXG4gICAgICAgIC8vICAgICBmb3IgKGxldCBMZXZlbFN0YXJpbmRleCA9IDE7IExldmVsU3RhcmluZGV4IDw0OyBMZXZlbFN0YXJpbmRleCsrKSB7XHJcbiAgICAgICAgLy8gICAgICAgICBpZihMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRBTGV2ZWxTdGFyKGxldmVsLExldmVsU3RhcmluZGV4KSl7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgU3Rhcm51bWJlcisrXHJcbiAgICAgICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gZm9yIChsZXQgTWFza2luZGV4ID0gMDsgTWFza2luZGV4IDwgdGhpcy5NYXNrLmxlbmd0aDsgTWFza2luZGV4KyspIHtcclxuICAgICAgICAvLyAgICAgaWYoTWFza2luZGV4PFN0YXJudW1iZXIpe1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5NYXNrW01hc2tpbmRleF0uYWN0aXZlPXRydWVcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMubHF1W01hc2tpbmRleF0uYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIC8vICAgICB9ZWxzZXtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMuTWFza1tNYXNraW5kZXhdLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5scXVbTWFza2luZGV4XS5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAvLyAgICAgfSBcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgbGV0IFN0YXJudW1iZXI9MDtcclxuICAgICAgICAvL+aYr+WQpuWujOaIkOeahOeKtuaAgVxyXG4gICAgICAgIGlmKGxldmVsPG15Q3VycmVudGxldmVsKXsvL+W9k+WJjeWFs+WNoeWwj+S6juacgOWkp+WFs+WNoSAgIOS7o+ihqOW3suWujOaIkO+8jOacieaYn+aYn+aVsOmHj++8jOayoeacieaImOaWl+agh+ivhlxyXG4gICAgICAgICAgICBmb3IgKGxldCBMZXZlbFN0YXJpbmRleCA9IDE7IExldmVsU3RhcmluZGV4IDw0OyBMZXZlbFN0YXJpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZihMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRBTGV2ZWxTdGFyKGxldmVsLExldmVsU3RhcmluZGV4KSl7XHJcbiAgICAgICAgICAgICAgICAgICAgU3Rhcm51bWJlcisrXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yIChsZXQgU3RhcmluZGV4ID0gMDsgU3RhcmluZGV4IDwgdGhpcy5TdGFyLmxlbmd0aDsgU3RhcmluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIC8v5Lqu6LW35Yeg6aKX5pif5pifXHJcbiAgICAgICAgICAgICAgICB0aGlzLlN0YXJbU3RhcmluZGV4XS5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgICAgICAgICAgaWYoU3RhcmluZGV4PFN0YXJudW1iZXIpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiX19fX19fX19fX19cIixTdGFyaW5kZXgsU3Rhcm51bWJlcilcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlN0YXJbU3RhcmluZGV4XS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZT10aGlzLlN0YXJTcHJpdGVGcmFtc1sxXVxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5TdGFyW1N0YXJpbmRleF0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWU9dGhpcy5TdGFyU3ByaXRlRnJhbXNbMF1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCIrKysrKysrK1wiLFN0YXJudW1iZXIpXHJcbiAgICAgICAgaWYobGV2ZWw9PW15Q3VycmVudGxldmVsKXsvL+W9k+WJjeWFs+WNoeetieS6juacgOWkp+WFs+WNoSAgIOS7o+ihqOato+imgeWJjeW+gOi/meS4quWFs+WNoSAgIOayoeacieaYn+aYn+aVsOmHj++8jOacieaImOaWl+agh+ivhlxyXG4gICAgICAgICAgICB0aGlzLkJhdHRsZXRva2VuLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGxldmVsPm15Q3VycmVudGxldmVsKXtcclxuICAgICAgICAgICAgaWYoTWlzc2lvbkxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldExldmVsVHlwZXMobGV2ZWwpPT0zKXtcclxuICAgICAgICAgICAgICAgIGlmKFN0YXJudW1iZXI9PTApe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQm9zc3Rva2VuLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkJvc3N0b2tlbi5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxyXG59XHJcbiJdfQ==