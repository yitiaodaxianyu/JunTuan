"use strict";
cc._RF.push(module, 'a256cgb4KlFcLqkZ/L1pKhb', 'BossManager');
// Scripts/Boss/BossManager.ts

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
var GameEffectsManager_1 = require("../Game/GameEffectsManager");
var GameManager_1 = require("../GameManager");
var MonsterManager_1 = require("../Monster/MonsterManager");
var AudioConstants_1 = require("../Sound/AudioConstants");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BossManager = /** @class */ (function (_super) {
    __extends(BossManager, _super);
    function BossManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BossManager_1 = BossManager;
    BossManager.getInstance = function () {
        if (this._instance == null) {
            var node = new cc.Node();
            cc.director.getScene().getChildByName("Canvas").addChild(node);
            this._instance = node.addComponent(BossManager_1);
        }
        return this._instance;
    };
    BossManager.prototype.onLoad = function () {
        if (!BossManager_1._instance) {
            BossManager_1._instance = this;
        }
        //可以根据关卡数先预加载boss相关的数据
        //WXManagerEX.getInstance().resourcesBundle.load('boss/bosscoming');
        //WXManagerEX.getInstance().resourcesBundle.load('boss/boss1');
    };
    BossManager.prototype.onDestroy = function () {
        BossManager_1._instance = null;
    };
    BossManager.prototype.addBoss = function (monsterId, level, hpRate) {
        var _this = this;
        //加载对应的boss
        //显示开场动画
        this.showBossComing(monsterId, function () {
            //播放完成
            cc.log("播放完成，生成boss");
            _this.showBoss(monsterId, level, hpRate);
        });
    };
    BossManager.prototype.showBossComing = function (monsterId, endCallback) {
        var node = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectForParent(GameEffectsManager_1.GameEffectId.boss_coming, cc.v2(0, 0), cc.find("Canvas/Ui_Root"));
        var bossSkin = this.getBossSkin(monsterId);
        var spNode = node.getChildByName('bosscoming');
        var sps = spNode.getComponent(sp.Skeleton);
        sps.setAnimation(0, "bosscoming", false);
        sps.setSkin(bossSkin);
        sps.setCompleteListener(function () {
            endCallback();
            GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(GameEffectsManager_1.GameEffectId.boss_coming, node);
        });
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_EnemyComing);
    };
    BossManager.prototype.showBoss = function (monsterId, level, hpRate) {
        //console.log("___________Boss")
        MonsterManager_1.default.getInstance().createMonsterById(monsterId, GameManager_1.default.getInstance().getFightCenter(), level, hpRate, true);
    };
    BossManager.prototype.getBossSkin = function (monsterId) {
        var bossType = 6;
        switch (monsterId) {
            case 30381:
                {
                    bossType = 6;
                }
                break;
            case 30391:
                {
                    bossType = 7;
                }
                break;
            case 30801:
                {
                    bossType = 8;
                }
                break;
            case 30811:
                {
                    bossType = 9;
                }
                break;
            case 30821:
                {
                    bossType = 10;
                }
                break;
            case 30831:
                {
                    bossType = 11;
                }
                break;
            case 30841:
                {
                    bossType = 12;
                }
                break;
            case 30851:
                {
                    bossType = 13;
                }
                break;
            case 30861:
                {
                    bossType = 14;
                }
                break;
            case 30871:
                {
                    bossType = 15;
                }
                break;
            default:
                {
                    bossType = 6;
                }
                break;
        }
        return "Boss" + bossType;
    };
    var BossManager_1;
    BossManager._instance = null;
    BossManager = BossManager_1 = __decorate([
        ccclass
    ], BossManager);
    return BossManager;
}(cc.Component));
exports.default = BossManager;

cc._RF.pop();