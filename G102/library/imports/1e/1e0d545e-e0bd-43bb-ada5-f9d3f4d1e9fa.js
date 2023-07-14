"use strict";
cc._RF.push(module, '1e0d5Re4L1Du62l+dP00en6', 'WuNvDan');
// Scripts/Hero/Game/DeLuYi/WuNvDan.ts

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
var GameEffectsManager_1 = require("../../../Game/GameEffectsManager");
var Bullect_1 = require("../Bullect");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var WuNvDan = /** @class */ (function (_super) {
    __extends(WuNvDan, _super);
    function WuNvDan() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WuNvDan.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        _super.prototype.addCollisionMonsterListen.call(this, this.onCollisionMonster);
        this.addInitFinishedListen(this.onInitFinished);
    };
    WuNvDan.prototype.onInitFinished = function () {
        this.tuowei_space = 1.5;
    };
    WuNvDan.prototype.destroySelf = function () {
        _super.prototype.destroySelf.call(this);
    };
    WuNvDan.prototype.onCollisionMonster = function (monsterTs) {
        if (monsterTs) {
            var data = monsterTs.beFlashInjured(this.gongji_data);
            if (data.getDamageNum() > 0) {
                GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.deluyi_skill_beidong_create, this.getHeadPos());
                // if(data.feedback_type==FeedBackType.BaoJi){
                //     GameEffectsManager.getInstance().createGameEffectById(GameEffectId.deluyi_att_baoji,this.getHeadPos());
                // }else{
                //     GameEffectsManager.getInstance().createGameEffectById(GameEffectId.deluyi_att_hit,this.getHeadPos());
                // }
            }
            this.destroySelf();
        }
    };
    WuNvDan = __decorate([
        ccclass
    ], WuNvDan);
    return WuNvDan;
}(Bullect_1.default));
exports.default = WuNvDan;

cc._RF.pop();