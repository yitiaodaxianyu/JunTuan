"use strict";
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