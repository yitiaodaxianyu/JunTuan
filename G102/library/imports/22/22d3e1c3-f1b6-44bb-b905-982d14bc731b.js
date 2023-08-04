"use strict";
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