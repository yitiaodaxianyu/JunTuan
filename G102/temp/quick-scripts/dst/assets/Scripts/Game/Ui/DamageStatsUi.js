
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Game/Ui/DamageStatsUi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '653f2i5bQNI4r2TRZn6kkM4', 'DamageStatsUi');
// Scripts/Game/Ui/DamageStatsUi.ts

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
var GameManager_1 = require("../../GameManager");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var UIComponent_1 = require("../../UI/UIComponent");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var DamageStatsUi = /** @class */ (function (_super) {
    __extends(DamageStatsUi, _super);
    function DamageStatsUi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // @property(cc.Prefab)
    // prefab_hero_stats:cc.Prefab=null;
    DamageStatsUi.prototype.onLoad = function () {
        var _this = this;
        this.node.on(cc.Node.EventType.TOUCH_START, function () {
            GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
            _this.node.removeFromParent();
        }, this);
    };
    DamageStatsUi.prototype.start = function () {
        // this.showStats();
    };
    // showStats(){
    //     //队伍
    //     let hm=HeroManager.getInstance();
    //     let teamList=HeroManager.getInstance().getTeamList(GameManager.getInstance().cur_game_mode);
    //     let attStats=GameManager.getInstance().hero_attack_dps;
    //     let skillStats=GameManager.getInstance().hero_skill_dps;
    //     let maxDps=0;
    //     //先判断哪个是最高的
    //     for(let i=0; i<Hero_Type.Hero_Num; i++)
    //     {
    //         if(attStats[i]>maxDps)
    //         {
    //             maxDps=attStats[i];
    //         }
    //         if(skillStats[i]>maxDps)
    //         {
    //             maxDps=skillStats[i];
    //         }
    //     }
    //     let statsRoot=this.node.getChildByName('statsRoot');
    //     let bgHero=this.node.getChildByName('bgHero');
    //     for(let i=0; i<5; i++)
    //     { 
    //         let heroType=teamList[i];
    //         if(heroType>0)
    //         {
    //             let heroStats=cc.instantiate(this.prefab_hero_stats);
    //             statsRoot.addChild(heroStats);
    //             heroStats.x=bgHero.x;
    //             heroStats.y=bgHero.y-53*(i+1);
    //             let icon=heroStats.getChildByName('iconRoot').getChildByName('icon');
    //             icon.getComponent(cc.Sprite).spriteFrame=hm.getHeroSpriteFrame(heroType);
    //             let aNum=attStats[heroType];
    //             let sNum=skillStats[heroType];
    //             heroStats.getComponent(StatsUi).init(aNum,sNum,1,maxDps);
    //         }
    //     }
    // }
    DamageStatsUi.prototype.clickBtnClose = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        _super.prototype.onClose.call(this);
    };
    DamageStatsUi = __decorate([
        ccclass
    ], DamageStatsUi);
    return DamageStatsUi;
}(UIComponent_1.default));
exports.default = DamageStatsUi;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcR2FtZVxcVWlcXERhbWFnZVN0YXRzVWkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaURBQTRDO0FBRzVDLDZEQUF3RDtBQUV4RCxvREFBK0M7QUFJekMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBMkMsaUNBQVc7SUFBdEQ7O0lBNkRBLENBQUM7SUEzREcsdUJBQXVCO0lBQ3ZCLG9DQUFvQztJQUVwQyw4QkFBTSxHQUFOO1FBQUEsaUJBS0M7UUFKRyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUM7WUFDdkMscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLDJCQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDcEUsS0FBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ2pDLENBQUMsRUFBQyxJQUFJLENBQUMsQ0FBQztJQUNaLENBQUM7SUFFUyw2QkFBSyxHQUFmO1FBQ0ksb0JBQW9CO0lBQ3hCLENBQUM7SUFFRCxlQUFlO0lBQ2YsV0FBVztJQUNYLHdDQUF3QztJQUN4QyxtR0FBbUc7SUFDbkcsOERBQThEO0lBQzlELCtEQUErRDtJQUMvRCxvQkFBb0I7SUFDcEIsa0JBQWtCO0lBQ2xCLDhDQUE4QztJQUM5QyxRQUFRO0lBQ1IsaUNBQWlDO0lBQ2pDLFlBQVk7SUFDWixrQ0FBa0M7SUFDbEMsWUFBWTtJQUNaLG1DQUFtQztJQUNuQyxZQUFZO0lBQ1osb0NBQW9DO0lBQ3BDLFlBQVk7SUFDWixRQUFRO0lBQ1IsMkRBQTJEO0lBQzNELHFEQUFxRDtJQUNyRCw2QkFBNkI7SUFDN0IsU0FBUztJQUNULG9DQUFvQztJQUNwQyx5QkFBeUI7SUFDekIsWUFBWTtJQUNaLG9FQUFvRTtJQUNwRSw2Q0FBNkM7SUFDN0Msb0NBQW9DO0lBQ3BDLDZDQUE2QztJQUM3QyxvRkFBb0Y7SUFDcEYsd0ZBQXdGO0lBQ3hGLDJDQUEyQztJQUMzQyw2Q0FBNkM7SUFDN0Msd0VBQXdFO0lBQ3hFLFlBQVk7SUFDWixRQUFRO0lBQ1IsSUFBSTtJQUVKLHFDQUFhLEdBQWI7UUFDSSxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsMkJBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwRSxpQkFBTSxPQUFPLFdBQUUsQ0FBQztJQUNwQixDQUFDO0lBMURnQixhQUFhO1FBRGpDLE9BQU87T0FDYSxhQUFhLENBNkRqQztJQUFELG9CQUFDO0NBN0RELEFBNkRDLENBN0QwQyxxQkFBVyxHQTZEckQ7a0JBN0RvQixhQUFhIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi8uLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBIZXJvTWFuYWdlciB9IGZyb20gXCIuLi8uLi9IZXJvL0RhdGEvSGVyb01hbmFnZXJcIjtcclxuaW1wb3J0IHsgSGVyb19UeXBlIH0gZnJvbSBcIi4uLy4uL0hlcm8vR2FtZS9IZXJvQ29uZmlnXCI7XHJcbmltcG9ydCB7IFNvdW5kSW5kZXggfSBmcm9tIFwiLi4vLi4vU291bmQvQXVkaW9Db25zdGFudHNcIjtcclxuaW1wb3J0IFN0YXRzVWkgZnJvbSBcIi4vU3RhdHNVaVwiO1xyXG5pbXBvcnQgVUlDb21wb25lbnQgZnJvbSBcIi4uLy4uL1VJL1VJQ29tcG9uZW50XCI7XHJcblxyXG5cclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGFtYWdlU3RhdHNVaSBleHRlbmRzIFVJQ29tcG9uZW50IHtcclxuXHJcbiAgICAvLyBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgLy8gcHJlZmFiX2hlcm9fc3RhdHM6Y2MuUHJlZmFiPW51bGw7XHJcbiAgICBcclxuICAgIG9uTG9hZCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsKCk9PntcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnJlbW92ZUZyb21QYXJlbnQoKTtcclxuICAgICAgICB9LHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBzdGFydCgpOiB2b2lkIHtcclxuICAgICAgICAvLyB0aGlzLnNob3dTdGF0cygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHNob3dTdGF0cygpe1xyXG4gICAgLy8gICAgIC8v6Zif5LyNXHJcbiAgICAvLyAgICAgbGV0IGhtPUhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAvLyAgICAgbGV0IHRlYW1MaXN0PUhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VGVhbUxpc3QoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9tb2RlKTtcclxuICAgIC8vICAgICBsZXQgYXR0U3RhdHM9R2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5oZXJvX2F0dGFja19kcHM7XHJcbiAgICAvLyAgICAgbGV0IHNraWxsU3RhdHM9R2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5oZXJvX3NraWxsX2RwcztcclxuICAgIC8vICAgICBsZXQgbWF4RHBzPTA7XHJcbiAgICAvLyAgICAgLy/lhYjliKTmlq3lk6rkuKrmmK/mnIDpq5jnmoRcclxuICAgIC8vICAgICBmb3IobGV0IGk9MDsgaTxIZXJvX1R5cGUuSGVyb19OdW07IGkrKylcclxuICAgIC8vICAgICB7XHJcbiAgICAvLyAgICAgICAgIGlmKGF0dFN0YXRzW2ldPm1heERwcylcclxuICAgIC8vICAgICAgICAge1xyXG4gICAgLy8gICAgICAgICAgICAgbWF4RHBzPWF0dFN0YXRzW2ldO1xyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgIGlmKHNraWxsU3RhdHNbaV0+bWF4RHBzKVxyXG4gICAgLy8gICAgICAgICB7XHJcbiAgICAvLyAgICAgICAgICAgICBtYXhEcHM9c2tpbGxTdGF0c1tpXTtcclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgIH1cclxuICAgIC8vICAgICBsZXQgc3RhdHNSb290PXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnc3RhdHNSb290Jyk7XHJcbiAgICAvLyAgICAgbGV0IGJnSGVybz10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2JnSGVybycpO1xyXG4gICAgLy8gICAgIGZvcihsZXQgaT0wOyBpPDU7IGkrKylcclxuICAgIC8vICAgICB7IFxyXG4gICAgLy8gICAgICAgICBsZXQgaGVyb1R5cGU9dGVhbUxpc3RbaV07XHJcbiAgICAvLyAgICAgICAgIGlmKGhlcm9UeXBlPjApXHJcbiAgICAvLyAgICAgICAgIHtcclxuICAgIC8vICAgICAgICAgICAgIGxldCBoZXJvU3RhdHM9Y2MuaW5zdGFudGlhdGUodGhpcy5wcmVmYWJfaGVyb19zdGF0cyk7XHJcbiAgICAvLyAgICAgICAgICAgICBzdGF0c1Jvb3QuYWRkQ2hpbGQoaGVyb1N0YXRzKTtcclxuICAgIC8vICAgICAgICAgICAgIGhlcm9TdGF0cy54PWJnSGVyby54O1xyXG4gICAgLy8gICAgICAgICAgICAgaGVyb1N0YXRzLnk9YmdIZXJvLnktNTMqKGkrMSk7XHJcbiAgICAvLyAgICAgICAgICAgICBsZXQgaWNvbj1oZXJvU3RhdHMuZ2V0Q2hpbGRCeU5hbWUoJ2ljb25Sb290JykuZ2V0Q2hpbGRCeU5hbWUoJ2ljb24nKTtcclxuICAgIC8vICAgICAgICAgICAgIGljb24uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWU9aG0uZ2V0SGVyb1Nwcml0ZUZyYW1lKGhlcm9UeXBlKTtcclxuICAgIC8vICAgICAgICAgICAgIGxldCBhTnVtPWF0dFN0YXRzW2hlcm9UeXBlXTtcclxuICAgIC8vICAgICAgICAgICAgIGxldCBzTnVtPXNraWxsU3RhdHNbaGVyb1R5cGVdO1xyXG4gICAgLy8gICAgICAgICAgICAgaGVyb1N0YXRzLmdldENvbXBvbmVudChTdGF0c1VpKS5pbml0KGFOdW0sc051bSwxLG1heERwcyk7XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9XHJcblxyXG4gICAgY2xpY2tCdG5DbG9zZSgpe1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgc3VwZXIub25DbG9zZSgpO1xyXG4gICAgfVxyXG4gICAgXHJcblxyXG59XHJcbiJdfQ==