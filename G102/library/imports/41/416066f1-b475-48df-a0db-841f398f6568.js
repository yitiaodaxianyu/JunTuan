"use strict";
cc._RF.push(module, '41606bxtHVI36DbhB85j2Vo', 'BigSlim');
// Scripts/Monster/Elite/BigSlim.ts

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
var GameEffectsManager_1 = require("../../Game/GameEffectsManager");
var MonsterManager_1 = require("../MonsterManager");
var MonsterNewNormal_1 = require("../MonsterNewNormal");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BigSlim = /** @class */ (function (_super) {
    __extends(BigSlim, _super);
    function BigSlim() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BigSlim.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        _super.prototype.addDeathCallback.call(this, this.onDeath);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.monster70_silaimu_qq, 6);
        MonsterManager_1.default.getInstance().addMonsterPool(10491, 6);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.monster_zhaohuan, 4);
    };
    BigSlim.prototype.onDeath = function () {
        var _this = this;
        //先播放动画
        var anima = this.spine.setAnimation(0, "Side_Dead", false);
        this.spine.setTrackEventListener(anima, function (entry, event) {
            if (event.data.name == "Dead") {
                _this.deathFinish();
            }
        });
        this.spine.setTrackCompleteListener(anima, function (entry, event) {
            anima.listener = null;
            _this.removeAllDeBuff();
            _this.shadow.opacity = 0;
            _this.node.opacity = 0;
            var die = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.monster_die, _super.prototype.getCenterPos.call(_this));
            die.scale = 0.8;
            MonsterManager_1.default.getInstance().destroyMonster(_this.node, _this.monster_type, false);
        });
    };
    BigSlim.prototype.deathFinish = function () {
        var _this = this;
        this.removeAllDeBuff();
        //生成小史莱姆        
        //半径
        var pos = this.getCenterPos();
        var rr = 200;
        var onceRadian = Math.PI / 5; //6个怪
        var _loop_1 = function (i) {
            var xx = Math.cos(onceRadian * i) * rr + pos.x;
            var yy = Math.sin(onceRadian * i) * rr + pos.y;
            //小泡泡
            var paopao = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.monster70_silaimu_qq, pos);
            var endPos = cc.v2(xx, yy);
            cc.tween(paopao).then(cc.jumpTo(0.5, endPos, yy - pos.y + 50, 1)).call(function () {
                MonsterManager_1.default.getInstance().createSummonMonster(10491, _this.monster_level, endPos);
                GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(GameEffectsManager_1.GameEffectId.monster70_silaimu_qq, paopao);
            }).start();
        };
        for (var i = 0; i < 6; i++) {
            _loop_1(i);
        }
    };
    BigSlim = __decorate([
        ccclass
    ], BigSlim);
    return BigSlim;
}(MonsterNewNormal_1.default));
exports.default = BigSlim;

cc._RF.pop();