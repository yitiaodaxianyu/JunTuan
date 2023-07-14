"use strict";
cc._RF.push(module, 'a4f19H+3EdClb7jNibHyHIt', 'BossAtt3');
// Scripts/Boss/Boss3/BossAtt3.ts

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
var GameManager_1 = require("../../GameManager");
var BuffData_1 = require("../../Hero/Game/BuffData");
var HeroConfig_1 = require("../../Hero/Game/HeroConfig");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var MyTool_1 = require("../../Tools/MyTool");
var WallConfig_1 = require("../../Wall/WallConfig");
var BossBullet_1 = require("../BossBullet");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BossAtt3 = /** @class */ (function (_super) {
    __extends(BossAtt3, _super);
    function BossAtt3() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bullect_type = 0;
        _this.remain_time = 0;
        _this.buff_value = 0;
        return _this;
    }
    BossAtt3.prototype.onLoad = function () {
        _super.prototype.addCollisionWallListen.call(this, this.onCollisionWall);
    };
    BossAtt3.prototype.setBuffData = function (remainTime, value) {
        this.remain_time = remainTime;
        this.buff_value = value;
    };
    ////--------------------------------------碰撞开始----------------------------------------------------
    BossAtt3.prototype.onCollisionWall = function (wall) {
        var _this = this;
        switch (this.bullect_type) {
            case 0:
                {
                    if (wall) {
                        var data = wall.beInjured(this.monster_att_data);
                        _super.prototype.destroySelf.call(this);
                        if (data.getDamageNum() > 0) {
                            GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.boss3_normal_attack_hit, this.node.getPosition());
                            GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_Boss3Skill1mingzhong);
                        }
                    }
                }
                break;
            case 1:
                {
                    if (wall) {
                        var data = wall.beInjured(this.monster_att_data);
                        _super.prototype.destroySelf.call(this);
                        if (data.getDamageNum() > 0) {
                            GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.boss3_skill_1_hit, this.node.getPosition());
                            GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_Boss3Skill1mingzhong);
                        }
                        if (wall.getWallType() == WallConfig_1.WallType.Main) {
                            MyTool_1.default.randomSceneShakeBig();
                            //减攻速
                            GameManager_1.default.getInstance().all_hero.forEach(function (v, k) {
                                var buffData = new BuffData_1.BuffData();
                                buffData.buff_id = HeroConfig_1.BuffId.Boss3_JIAN_GongSu;
                                buffData.remain_time = _this.remain_time;
                                buffData.buff_value = [_this.buff_value];
                                v.addDeBuff(buffData);
                            });
                        }
                    }
                }
                break;
        }
    };
    __decorate([
        property()
    ], BossAtt3.prototype, "bullect_type", void 0);
    BossAtt3 = __decorate([
        ccclass
    ], BossAtt3);
    return BossAtt3;
}(BossBullet_1.default));
exports.default = BossAtt3;

cc._RF.pop();