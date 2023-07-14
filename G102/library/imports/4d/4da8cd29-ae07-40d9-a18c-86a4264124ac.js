"use strict";
cc._RF.push(module, '4da8c0prgdA2aGMhqQmQSSs', 'HpTextManager');
// Scripts/Monster/HpTextManager.ts

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
var LabelLanguage_1 = require("../multiLanguage/LabelLanguage");
var EnemyConfig_1 = require("../Enemy/EnemyConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
//负责子弹的生成-销毁
var HpTextHpManager = /** @class */ (function (_super) {
    __extends(HpTextHpManager, _super);
    function HpTextHpManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sp_type = [];
        _this.img_text_parent = null;
        return _this;
    }
    HpTextHpManager.prototype.onLoad = function () {
        GameManager_1.default.getInstance().hp_text_manager = this;
        for (var i = GameEffectsManager_1.GameEffectId.front_normal_attack_text_1; i <= GameEffectsManager_1.GameEffectId.front_crit_text; i++) {
            GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(i, 8);
        }
    };
    HpTextHpManager.prototype.onDestroy = function () {
        GameManager_1.default.getInstance().hp_text_manager = null;
    };
    HpTextHpManager.prototype.createHpTextHp = function (pos, damage, type) {
        switch (type) {
            case EnemyConfig_1.Enemy_Injured_Type.Normal_Attack:
                {
                    //根据伤害值获得文本类型id
                    var effectId_1 = GameManager_1.default.getInstance().getDamageTextEffect(damage);
                    var scaleValue = GameManager_1.default.getInstance().getDamageTextScale(damage);
                    var node_1 = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectForParent(effectId_1, pos, this.node);
                    node_1.scale = scaleValue;
                    node_1.opacity = 255;
                    node_1.color = cc.Color.WHITE;
                    node_1.getComponent(cc.Label).string = damage.toFixed(0);
                    cc.tween(node_1).to(0.1, { scale: scaleValue * 1.2 }).to(0.06, { scale: scaleValue }).by(0.96, { y: 85, opacity: -168 }, { easing: 'sineIn' }).call(function () {
                        GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(effectId_1, node_1);
                    }, this).start();
                }
                break;
            case EnemyConfig_1.Enemy_Injured_Type.BaoJi:
                {
                    var effectId_2 = GameEffectsManager_1.GameEffectId.front_crit_text;
                    var scaleValue = 1.4;
                    var node_2 = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectForParent(effectId_2, pos, this.node);
                    node_2.scale = scaleValue;
                    node_2.opacity = 255;
                    node_2.color = cc.Color.WHITE;
                    node_2.getComponent(cc.Label).string = '@' + damage.toFixed(0);
                    cc.tween(node_2).to(0.1, { scale: scaleValue * 1.25 }).to(0.06, { scale: scaleValue }).delay(0.3).by(0.5, { y: 25, opacity: -168 }, { easing: 'sineIn' }).call(function () {
                        GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(effectId_2, node_2);
                    }, this).start();
                }
                break;
            case EnemyConfig_1.Enemy_Injured_Type.LiuXue:
                {
                    var effectId_3 = GameEffectsManager_1.GameEffectId.front_normal_attack_text_1;
                    var scaleValue = 1.0;
                    var node_3 = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectForParent(effectId_3, pos, this.node);
                    node_3.scale = scaleValue;
                    node_3.opacity = 255;
                    node_3.color = cc.Color.WHITE;
                    node_3.getComponent(cc.Label).string = damage.toFixed(0);
                    cc.tween(node_3).to(0.1, { scale: scaleValue * 1.2 }).to(0.06, { scale: scaleValue }).by(0.5, { opacity: -168 }, { easing: 'sineIn' }).call(function () {
                        GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(effectId_3, node_3);
                    }, this).start();
                }
                break;
            case EnemyConfig_1.Enemy_Injured_Type.ZhongDu:
                {
                    var effectId_4 = GameEffectsManager_1.GameEffectId.front_normal_attack_text_1;
                    var scaleValue = 1.0;
                    var node_4 = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectForParent(effectId_4, pos, this.node);
                    node_4.scale = scaleValue;
                    node_4.opacity = 255;
                    node_4.color = cc.Color.MAGENTA;
                    node_4.getComponent(cc.Label).string = damage.toFixed(0);
                    cc.tween(node_4).to(0.1, { scale: scaleValue * 1.2 }).to(0.06, { scale: scaleValue }).by(0.5, { opacity: -168 }, { easing: 'sineIn' }).call(function () {
                        GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(effectId_4, node_4);
                    }, this).start();
                }
                break;
            case EnemyConfig_1.Enemy_Injured_Type.ZhuoShao:
                {
                    var effectId_5 = GameEffectsManager_1.GameEffectId.front_normal_attack_text_1;
                    var scaleValue = 1.0;
                    var node_5 = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectForParent(effectId_5, pos, this.node);
                    node_5.scale = scaleValue;
                    node_5.opacity = 255;
                    node_5.color = cc.Color.WHITE;
                    node_5.getComponent(cc.Label).string = damage.toFixed(0);
                    cc.tween(node_5).to(0.1, { scale: scaleValue * 1.2 }).to(0.06, { scale: scaleValue }).by(0.5, { opacity: -168 }, { easing: 'sineIn' }).call(function () {
                        GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(effectId_5, node_5);
                    }, this).start();
                }
                break;
            case EnemyConfig_1.Enemy_Injured_Type.ZhiLiao:
                {
                    var effectId_6 = GameEffectsManager_1.GameEffectId.front_restore_text;
                    var scaleValue = 1.2;
                    var node_6 = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectForParent(effectId_6, pos, this.node);
                    node_6.color = cc.Color.GREEN;
                    node_6.scale = scaleValue;
                    node_6.opacity = 255;
                    node_6.getComponent(cc.Label).string = '@' + damage.toFixed(0);
                    cc.tween(node_6).to(0.1, { scale: scaleValue * 1.2 }).to(0.06, { scale: scaleValue }).by(0.96, { y: 85, opacity: -168 }, { easing: 'sineIn' }).call(function () {
                        GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(effectId_6, node_6);
                    }, this).start();
                }
                break;
            case EnemyConfig_1.Enemy_Injured_Type.BingNvZhenShang:
                {
                    var effectId_7 = GameEffectsManager_1.GameEffectId.front_normal_attack_text_1;
                    var scaleValue = 1.0;
                    var node_7 = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectForParent(effectId_7, pos, this.node);
                    node_7.color = cc.Color.CYAN;
                    node_7.scale = scaleValue;
                    node_7.opacity = 255;
                    node_7.getComponent(cc.Label).string = damage.toFixed(0);
                    cc.tween(node_7).to(0.1, { scale: scaleValue * 1.2 }).to(0.06, { scale: scaleValue }).by(0.96, { y: 85, opacity: -168 }, { easing: 'sineIn' }).call(function () {
                        GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(effectId_7, node_7);
                    }, this).start();
                }
                break;
            case EnemyConfig_1.Enemy_Injured_Type.ANuBiSiZhenShang:
                {
                    var effectId_8 = GameEffectsManager_1.GameEffectId.front_normal_attack_text_1;
                    var scaleValue = 1.0;
                    var node_8 = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectForParent(effectId_8, pos, this.node);
                    node_8.color = cc.Color.ORANGE;
                    node_8.scale = scaleValue;
                    node_8.opacity = 255;
                    node_8.getComponent(cc.Label).string = damage.toFixed(0);
                    cc.tween(node_8).to(0.1, { scale: scaleValue * 1.2 }).to(0.06, { scale: scaleValue }).by(0.96, { y: 85, opacity: -168 }, { easing: 'sineIn' }).call(function () {
                        GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(effectId_8, node_8);
                    }, this).start();
                }
                break;
            case EnemyConfig_1.Enemy_Injured_Type.BaoTou:
                {
                    var effectId_9 = GameEffectsManager_1.GameEffectId.front_crit_text;
                    var scaleValue = 1.4;
                    var node_9 = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectForParent(effectId_9, pos, this.node);
                    node_9.scale = scaleValue;
                    node_9.opacity = 255;
                    node_9.color = cc.Color.WHITE;
                    node_9.getComponent(cc.Label).string = '@' + damage.toFixed(0);
                    cc.tween(node_9).to(0.1, { scale: scaleValue * 1.25 }).to(0.06, { scale: scaleValue }).delay(0.3).by(0.5, { y: 25, opacity: -168 }, { easing: 'sineIn' }).call(function () {
                        GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(effectId_9, node_9);
                    }, this).start();
                    //this.createTypeText(pos.add(cc.v2(0,30)),type,spawn);
                }
                break;
            case EnemyConfig_1.Enemy_Injured_Type.ChaoJiBaoTou:
                {
                    var effectId_10 = GameEffectsManager_1.GameEffectId.front_crit_text;
                    var scaleValue = 1.6;
                    var node_10 = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectForParent(effectId_10, pos, this.node);
                    node_10.scale = scaleValue;
                    node_10.opacity = 255;
                    node_10.color = cc.Color.WHITE;
                    node_10.getComponent(cc.Label).string = '@' + damage.toFixed(0);
                    cc.tween(node_10).to(0.1, { scale: scaleValue * 1.25 }).to(0.06, { scale: scaleValue }).delay(0.3).by(0.5, { y: 25, opacity: -168 }, { easing: 'sineIn' }).call(function () {
                        GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(effectId_10, node_10);
                    }, this).start();
                }
                break;
            // case Enemy_Injured_Type.ShanBi:{
            //     this.createTypeText(pos,type)
            // }break;
            default:
                {
                    //根据伤害值获得文本类型id
                    var effectId_11 = GameManager_1.default.getInstance().getDamageTextEffect(damage);
                    var scaleValue = GameManager_1.default.getInstance().getDamageTextScale(damage);
                    var node_11 = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectForParent(effectId_11, pos, this.node);
                    node_11.scale = scaleValue;
                    node_11.opacity = 255;
                    node_11.color = cc.Color.WHITE;
                    node_11.getComponent(cc.Label).string = damage.toFixed(0);
                    cc.tween(node_11).to(0.1, { scale: scaleValue * 1.2 }).to(0.06, { scale: scaleValue }).by(0.96, { y: 85, opacity: -168 }, { easing: 'sineIn' }).call(function () {
                        GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(effectId_11, node_11);
                    }, this).start();
                }
                break;
        }
    };
    HpTextHpManager.prototype.getTextColorByType = function (type) {
        var color = cc.Color.WHITE;
        switch (type) {
            case EnemyConfig_1.Enemy_Injured_Type.Normal_Attack:
                color = cc.Color.WHITE;
                break;
            case EnemyConfig_1.Enemy_Injured_Type.ZhongDu:
                color = cc.Color.GREEN;
                break;
        }
        return color;
    };
    //使用图片
    HpTextHpManager.prototype.createTypeText = function (pos, text, spawn) {
        var node = new cc.Node();
        this.img_text_parent.addChild(node);
        var sp = node.addComponent(cc.Sprite);
        node.setPosition(pos);
        if (typeof text == "string") {
            node.getComponent(LabelLanguage_1.default).string = text;
        }
        else {
            var xx = Math.random() * 50 + 30;
            xx *= Math.random() < 0.5 ? 1 : -1;
            var yy = Math.random() * 50 + 30;
            var height = Math.random() * 50 + 30;
            switch (text) {
                case EnemyConfig_1.Enemy_Injured_Type.BaoJi:
                    {
                        //node.color=cc.Color.RED;
                        sp.spriteFrame = this.sp_type[1];
                        if (spawn == null)
                            spawn = cc.spawn(cc.jumpBy(0.5, xx, yy, height, 1), cc.fadeTo(0.5, 255));
                    }
                    break;
                case EnemyConfig_1.Enemy_Injured_Type.WuDi:
                    {
                        sp.spriteFrame = this.sp_type[2];
                        if (spawn == null)
                            spawn = cc.spawn(cc.jumpBy(0.5, xx, yy, height, 1), cc.fadeTo(0.5, 255));
                    }
                    break;
                case EnemyConfig_1.Enemy_Injured_Type.GeDang:
                    {
                        sp.spriteFrame = this.sp_type[0];
                        if (spawn == null)
                            spawn = cc.spawn(cc.jumpBy(0.5, xx, yy, height, 1), cc.fadeTo(0.5, 255));
                    }
                    break;
                case EnemyConfig_1.Enemy_Injured_Type.ShanBi:
                    {
                        sp.spriteFrame = this.sp_type[3];
                        if (spawn == null)
                            spawn = cc.spawn(cc.jumpBy(0.5, xx, yy, height, 1), cc.fadeTo(0.5, 255));
                    }
                    break;
                case EnemyConfig_1.Enemy_Injured_Type.BaoTou:
                    {
                        sp.spriteFrame = this.sp_type[4];
                        if (spawn == null)
                            spawn = cc.spawn(cc.jumpBy(0.5, xx, yy, height, 1), cc.fadeTo(0.5, 255));
                    }
                    break;
                case EnemyConfig_1.Enemy_Injured_Type.ChaoJiBaoTou:
                    {
                        sp.spriteFrame = this.sp_type[5];
                        if (spawn == null)
                            spawn = cc.spawn(cc.jumpBy(0.5, xx, yy, height, 1), cc.fadeTo(0.5, 255));
                    }
                    break;
                case EnemyConfig_1.Enemy_Injured_Type.MianYiKongZhi:
                    {
                        sp.spriteFrame = this.sp_type[6];
                        if (spawn == null)
                            spawn = cc.spawn(cc.jumpBy(0.5, xx, yy, height, 1), cc.fadeTo(0.5, 255));
                    }
                    break;
            }
        }
        if (spawn)
            cc.tween(node).then(spawn).delay(0.2).to(0.2, { opacity: 0 }).removeSelf().start();
    };
    HpTextHpManager.prototype.destroyHpTextHp = function (type, node) {
        node.scale = 1;
        node.opacity = 255;
    };
    __decorate([
        property([cc.SpriteFrame])
    ], HpTextHpManager.prototype, "sp_type", void 0);
    __decorate([
        property(cc.Node)
    ], HpTextHpManager.prototype, "img_text_parent", void 0);
    HpTextHpManager = __decorate([
        ccclass
    ], HpTextHpManager);
    return HpTextHpManager;
}(cc.Component));
exports.default = HpTextHpManager;

cc._RF.pop();