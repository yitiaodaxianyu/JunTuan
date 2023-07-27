
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Monster/HpTextManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
        _this.effcomp = false;
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
    HpTextHpManager.prototype.isEffCom = function () {
        if (this.effcomp == true) {
            return this.effcomp;
        }
        if (GameEffectsManager_1.GameEffectsManager.getInstance().map_node_pools.has(GameEffectsManager_1.GameEffectId.front_normal_attack_text_1) &&
            GameEffectsManager_1.GameEffectsManager.getInstance().map_node_pools.has(GameEffectsManager_1.GameEffectId.front_normal_attack_text_2) &&
            GameEffectsManager_1.GameEffectsManager.getInstance().map_node_pools.has(GameEffectsManager_1.GameEffectId.front_normal_attack_text_3) &&
            GameEffectsManager_1.GameEffectsManager.getInstance().map_node_pools.has(GameEffectsManager_1.GameEffectId.front_normal_attack_text_4) &&
            GameEffectsManager_1.GameEffectsManager.getInstance().map_node_pools.has(GameEffectsManager_1.GameEffectId.front_normal_attack_text_5) &&
            GameEffectsManager_1.GameEffectsManager.getInstance().map_node_pools.has(GameEffectsManager_1.GameEffectId.front_restore_text) &&
            GameEffectsManager_1.GameEffectsManager.getInstance().map_node_pools.has(GameEffectsManager_1.GameEffectId.front_crit_text)) {
            this.effcomp = true;
        }
        return this.effcomp;
    };
    HpTextHpManager.prototype.createHpTextHp = function (pos, damage, type) {
        if (this.isEffCom() == false) {
            return;
        }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTW9uc3RlclxcSHBUZXh0TWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxpRUFBOEU7QUFDOUUsOENBQXlDO0FBQ3pDLGdFQUEyRDtBQUMzRCxvREFBMEQ7QUFFcEQsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFDMUMsWUFBWTtBQUVaO0lBQTZDLG1DQUFZO0lBQXpEO1FBQUEscUVBbVFDO1FBaFFHLGFBQU8sR0FBa0IsRUFBRSxDQUFDO1FBRzVCLHFCQUFlLEdBQVMsSUFBSSxDQUFDO1FBRXJCLGFBQU8sR0FBWSxLQUFLLENBQUM7O0lBMlByQyxDQUFDO0lBMVBHLGdDQUFNLEdBQU47UUFDSSxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGVBQWUsR0FBQyxJQUFJLENBQUM7UUFDL0MsS0FBSSxJQUFJLENBQUMsR0FBQyxpQ0FBWSxDQUFDLDBCQUEwQixFQUFFLENBQUMsSUFBRSxpQ0FBWSxDQUFDLGVBQWUsRUFBRSxDQUFDLEVBQUUsRUFBQztZQUNwRix1Q0FBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7U0FDM0Q7SUFDTCxDQUFDO0lBQ0QsbUNBQVMsR0FBVDtRQUVJLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsZUFBZSxHQUFDLElBQUksQ0FBQztJQUNuRCxDQUFDO0lBQ08sa0NBQVEsR0FBaEI7UUFDSSxJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxFQUFFO1lBQ3RCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztTQUN2QjtRQUNELElBQUksdUNBQWtCLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxpQ0FBWSxDQUFDLDBCQUEwQixDQUFDO1lBQzVGLHVDQUFr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LENBQUMsQ0FBQztxQkFDcEU7b0JBQUEsTUFBTTthQUNWO1NBQ0o7UUFDRCxJQUFHLEtBQUs7WUFDUixFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBQyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ25GLENBQUM7SUFFRCx5Q0FBZSxHQUFmLFVBQWdCLElBQVcsRUFBQyxJQUFZO1FBRXBDLElBQUksQ0FBQyxLQUFLLEdBQUMsQ0FBQyxDQUFDO1FBQ2IsSUFBSSxDQUFDLE9BQU8sR0FBQyxHQUFHLENBQUM7SUFFckIsQ0FBQztJQS9QRDtRQURDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQztvREFDQztJQUc1QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzREQUNXO0lBTlosZUFBZTtRQURuQyxPQUFPO09BQ2EsZUFBZSxDQW1RbkM7SUFBRCxzQkFBQztDQW5RRCxBQW1RQyxDQW5RNEMsRUFBRSxDQUFDLFNBQVMsR0FtUXhEO2tCQW5Rb0IsZUFBZSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgeyBHYW1lRWZmZWN0SWQsIEdhbWVFZmZlY3RzTWFuYWdlciB9IGZyb20gXCIuLi9HYW1lL0dhbWVFZmZlY3RzTWFuYWdlclwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCBMYWJlbExhbmd1YWdlIGZyb20gXCIuLi9tdWx0aUxhbmd1YWdlL0xhYmVsTGFuZ3VhZ2VcIjtcclxuaW1wb3J0IHsgRW5lbXlfSW5qdXJlZF9UeXBlIH0gZnJvbSBcIi4uL0VuZW15L0VuZW15Q29uZmlnXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuLy/otJ/otKPlrZDlvLnnmoTnlJ/miJAt6ZSA5q+BXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhwVGV4dEhwTWFuYWdlciBleHRlbmRzIGNjLkNvbXBvbmVudCAge1xyXG4gICAgXHJcbiAgICBAcHJvcGVydHkoW2NjLlNwcml0ZUZyYW1lXSlcclxuICAgIHNwX3R5cGU6Y2MuU3ByaXRlRnJhbWVbXT1bXTtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGltZ190ZXh0X3BhcmVudDpjYy5Ob2RlPW51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBlZmZjb21wOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuaHBfdGV4dF9tYW5hZ2VyPXRoaXM7XHJcbiAgICAgICAgZm9yKGxldCBpPUdhbWVFZmZlY3RJZC5mcm9udF9ub3JtYWxfYXR0YWNrX3RleHRfMTsgaTw9R2FtZUVmZmVjdElkLmZyb250X2NyaXRfdGV4dDsgaSsrKXtcclxuICAgICAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRWZmZWN0UG9vbEJ5SWQoaSw4KTtcclxuICAgICAgICB9IFxyXG4gICAgfVxyXG4gICAgb25EZXN0cm95KClcclxuICAgIHtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmhwX3RleHRfbWFuYWdlcj1udWxsO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBpc0VmZkNvbSgpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAodGhpcy5lZmZjb21wID09IHRydWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWZmY29tcDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLm1hcF9ub2RlX3Bvb2xzLmhhcyhHYW1lRWZmZWN0SWQuZnJvbnRfbm9ybWFsX2F0dGFja190ZXh0XzEpICYmXHJcbiAgICAgICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLm1hcF9ub2RlX3Bvb2xzLmhhcyhHYW1lRWZmZWN0SWQuZnJvbnRfbm9ybWFsX2F0dGFja190ZXh0XzIpICYmXHJcbiAgICAgICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLm1hcF9ub2RlX3Bvb2xzLmhhcyhHYW1lRWZmZWN0SWQuZnJvbnRfbm9ybWFsX2F0dGFja190ZXh0XzMpICYmXHJcbiAgICAgICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLm1hcF9ub2RlX3Bvb2xzLmhhcyhHYW1lRWZmZWN0SWQuZnJvbnRfbm9ybWFsX2F0dGFja190ZXh0XzQpICYmXHJcbiAgICAgICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLm1hcF9ub2RlX3Bvb2xzLmhhcyhHYW1lRWZmZWN0SWQuZnJvbnRfbm9ybWFsX2F0dGFja190ZXh0XzUpJiZcclxuICAgICAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkubWFwX25vZGVfcG9vbHMuaGFzKEdhbWVFZmZlY3RJZC5mcm9udF9yZXN0b3JlX3RleHQpJiZcclxuICAgICAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkubWFwX25vZGVfcG9vbHMuaGFzKEdhbWVFZmZlY3RJZC5mcm9udF9jcml0X3RleHQpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZWZmY29tcCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmVmZmNvbXA7XHJcbiAgICB9XHJcbiAgICBjcmVhdGVIcFRleHRIcChwb3M6Y2MuVmVjMixkYW1hZ2U6bnVtYmVyLHR5cGU6RW5lbXlfSW5qdXJlZF9UeXBlKVxyXG4gICAge1xyXG5cclxuICAgICAgICBpZih0aGlzLmlzRWZmQ29tKCk9PWZhbHNlKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzd2l0Y2godHlwZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNhc2UgRW5lbXlfSW5qdXJlZF9UeXBlLk5vcm1hbF9BdHRhY2s6e1xyXG4gICAgICAgICAgICAgICAgLy/moLnmja7kvKTlrrPlgLzojrflvpfmlofmnKznsbvlnotpZFxyXG4gICAgICAgICAgICAgICAgbGV0IGVmZmVjdElkPUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RGFtYWdlVGV4dEVmZmVjdChkYW1hZ2UpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHNjYWxlVmFsdWU9R2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXREYW1hZ2VUZXh0U2NhbGUoZGFtYWdlKTtcclxuICAgICAgICAgICAgICAgIGxldCBub2RlPUdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RGb3JQYXJlbnQoZWZmZWN0SWQscG9zLHRoaXMubm9kZSk7XHJcbiAgICAgICAgICAgICAgICBub2RlLnNjYWxlPXNjYWxlVmFsdWU7XHJcbiAgICAgICAgICAgICAgICBub2RlLm9wYWNpdHk9MjU1O1xyXG4gICAgICAgICAgICAgICAgbm9kZS5jb2xvcj1jYy5Db2xvci5XSElURTtcclxuICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9ZGFtYWdlLnRvRml4ZWQoMCk7XHJcbiAgICAgICAgICAgICAgICBjYy50d2Vlbihub2RlKS50bygwLjEse3NjYWxlOnNjYWxlVmFsdWUqMS4yfSkudG8oMC4wNix7c2NhbGU6c2NhbGVWYWx1ZX0pLmJ5KDAuOTYse3k6ODUsb3BhY2l0eTotMTY4fSx7IGVhc2luZzogJ3NpbmVJbid9KS5jYWxsKCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZGVzdHJveUdhbWVFZmZlY3RCeUlkKGVmZmVjdElkLG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgfSx0aGlzKS5zdGFydCgpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgRW5lbXlfSW5qdXJlZF9UeXBlLkJhb0ppOntcclxuICAgICAgICAgICAgICAgIGxldCBlZmZlY3RJZD1HYW1lRWZmZWN0SWQuZnJvbnRfY3JpdF90ZXh0O1xyXG4gICAgICAgICAgICAgICAgbGV0IHNjYWxlVmFsdWU9MS40O1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGU9R2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEZvclBhcmVudChlZmZlY3RJZCxwb3MsdGhpcy5ub2RlKTtcclxuICAgICAgICAgICAgICAgIG5vZGUuc2NhbGU9c2NhbGVWYWx1ZTtcclxuICAgICAgICAgICAgICAgIG5vZGUub3BhY2l0eT0yNTU7XHJcbiAgICAgICAgICAgICAgICBub2RlLmNvbG9yPWNjLkNvbG9yLldISVRFO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz0nQCcrZGFtYWdlLnRvRml4ZWQoMCk7XHJcbiAgICAgICAgICAgICAgICBjYy50d2Vlbihub2RlKS50bygwLjEse3NjYWxlOnNjYWxlVmFsdWUqMS4yNX0pLnRvKDAuMDYse3NjYWxlOnNjYWxlVmFsdWV9KS5kZWxheSgwLjMpLmJ5KDAuNSx7eToyNSxvcGFjaXR5Oi0xNjh9LHsgZWFzaW5nOiAnc2luZUluJ30pLmNhbGwoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5kZXN0cm95R2FtZUVmZmVjdEJ5SWQoZWZmZWN0SWQsbm9kZSk7XHJcbiAgICAgICAgICAgICAgICB9LHRoaXMpLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBFbmVteV9Jbmp1cmVkX1R5cGUuTGl1WHVlOntcclxuICAgICAgICAgICAgICAgIGxldCBlZmZlY3RJZD1HYW1lRWZmZWN0SWQuZnJvbnRfbm9ybWFsX2F0dGFja190ZXh0XzE7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2NhbGVWYWx1ZT0xLjA7XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZT1HYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0Rm9yUGFyZW50KGVmZmVjdElkLHBvcyx0aGlzLm5vZGUpOyAgICAgIFxyXG4gICAgICAgICAgICAgICAgbm9kZS5zY2FsZT1zY2FsZVZhbHVlO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5vcGFjaXR5PTI1NTtcclxuICAgICAgICAgICAgICAgIG5vZGUuY29sb3I9Y2MuQ29sb3IuV0hJVEU7XHJcbiAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPWRhbWFnZS50b0ZpeGVkKDApO1xyXG4gICAgICAgICAgICAgICAgY2MudHdlZW4obm9kZSkudG8oMC4xLHtzY2FsZTpzY2FsZVZhbHVlKjEuMn0pLnRvKDAuMDYse3NjYWxlOnNjYWxlVmFsdWV9KS5ieSgwLjUse29wYWNpdHk6LTE2OH0seyBlYXNpbmc6ICdzaW5lSW4nfSkuY2FsbCgoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmRlc3Ryb3lHYW1lRWZmZWN0QnlJZChlZmZlY3RJZCxub2RlKTtcclxuICAgICAgICAgICAgICAgIH0sdGhpcykuc3RhcnQoKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEVuZW15X0luanVyZWRfVHlwZS5aaG9uZ0R1OntcclxuICAgICAgICAgICAgICAgIGxldCBlZmZlY3RJZD1HYW1lRWZmZWN0SWQuZnJvbnRfbm9ybWFsX2F0dGFja190ZXh0XzE7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2NhbGVWYWx1ZT0xLjA7XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZT1HYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0Rm9yUGFyZW50KGVmZmVjdElkLHBvcyx0aGlzLm5vZGUpOyAgICBcclxuICAgICAgICAgICAgICAgIG5vZGUuc2NhbGU9c2NhbGVWYWx1ZTtcclxuICAgICAgICAgICAgICAgIG5vZGUub3BhY2l0eT0yNTU7XHJcbiAgICAgICAgICAgICAgICBub2RlLmNvbG9yPWNjLkNvbG9yLk1BR0VOVEE7XHJcbiAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPWRhbWFnZS50b0ZpeGVkKDApO1xyXG4gICAgICAgICAgICAgICAgY2MudHdlZW4obm9kZSkudG8oMC4xLHtzY2FsZTpzY2FsZVZhbHVlKjEuMn0pLnRvKDAuMDYse3NjYWxlOnNjYWxlVmFsdWV9KS5ieSgwLjUse29wYWNpdHk6LTE2OH0seyBlYXNpbmc6ICdzaW5lSW4nfSkuY2FsbCgoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmRlc3Ryb3lHYW1lRWZmZWN0QnlJZChlZmZlY3RJZCxub2RlKTtcclxuICAgICAgICAgICAgICAgIH0sdGhpcykuc3RhcnQoKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEVuZW15X0luanVyZWRfVHlwZS5aaHVvU2hhbzp7XHJcbiAgICAgICAgICAgICAgICBsZXQgZWZmZWN0SWQ9R2FtZUVmZmVjdElkLmZyb250X25vcm1hbF9hdHRhY2tfdGV4dF8xO1xyXG4gICAgICAgICAgICAgICAgbGV0IHNjYWxlVmFsdWU9MS4wO1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGU9R2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEZvclBhcmVudChlZmZlY3RJZCxwb3MsdGhpcy5ub2RlKTsgICBcclxuICAgICAgICAgICAgICAgIG5vZGUuc2NhbGU9c2NhbGVWYWx1ZTtcclxuICAgICAgICAgICAgICAgIG5vZGUub3BhY2l0eT0yNTU7XHJcbiAgICAgICAgICAgICAgICBub2RlLmNvbG9yPWNjLkNvbG9yLldISVRFO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1kYW1hZ2UudG9GaXhlZCgwKTsgIFxyXG4gICAgICAgICAgICAgICAgY2MudHdlZW4obm9kZSkudG8oMC4xLHtzY2FsZTpzY2FsZVZhbHVlKjEuMn0pLnRvKDAuMDYse3NjYWxlOnNjYWxlVmFsdWV9KS5ieSgwLjUse29wYWNpdHk6LTE2OH0seyBlYXNpbmc6ICdzaW5lSW4nfSkuY2FsbCgoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmRlc3Ryb3lHYW1lRWZmZWN0QnlJZChlZmZlY3RJZCxub2RlKTtcclxuICAgICAgICAgICAgICAgIH0sdGhpcykuc3RhcnQoKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEVuZW15X0luanVyZWRfVHlwZS5aaGlMaWFvOntcclxuICAgICAgICAgICAgICAgIGxldCBlZmZlY3RJZD1HYW1lRWZmZWN0SWQuZnJvbnRfcmVzdG9yZV90ZXh0O1xyXG4gICAgICAgICAgICAgICAgbGV0IHNjYWxlVmFsdWU9MS4yO1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGU9R2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEZvclBhcmVudChlZmZlY3RJZCxwb3MsdGhpcy5ub2RlKTtcclxuICAgICAgICAgICAgICAgIG5vZGUuY29sb3I9Y2MuQ29sb3IuR1JFRU47XHJcbiAgICAgICAgICAgICAgICBub2RlLnNjYWxlPXNjYWxlVmFsdWU7XHJcbiAgICAgICAgICAgICAgICBub2RlLm9wYWNpdHk9MjU1O1xyXG4gICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz0nQCcrZGFtYWdlLnRvRml4ZWQoMCk7XHJcbiAgICAgICAgICAgICAgICBjYy50d2Vlbihub2RlKS50bygwLjEse3NjYWxlOnNjYWxlVmFsdWUqMS4yfSkudG8oMC4wNix7c2NhbGU6c2NhbGVWYWx1ZX0pLmJ5KDAuOTYse3k6ODUsb3BhY2l0eTotMTY4fSx7IGVhc2luZzogJ3NpbmVJbid9KS5jYWxsKCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZGVzdHJveUdhbWVFZmZlY3RCeUlkKGVmZmVjdElkLG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgfSx0aGlzKS5zdGFydCgpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgRW5lbXlfSW5qdXJlZF9UeXBlLkJpbmdOdlpoZW5TaGFuZzp7XHJcbiAgICAgICAgICAgICAgICBsZXQgZWZmZWN0SWQ9R2FtZUVmZmVjdElkLmZyb250X25vcm1hbF9hdHRhY2tfdGV4dF8xO1xyXG4gICAgICAgICAgICAgICAgbGV0IHNjYWxlVmFsdWU9MS4wO1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGU9R2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEZvclBhcmVudChlZmZlY3RJZCxwb3MsdGhpcy5ub2RlKTtcclxuICAgICAgICAgICAgICAgIG5vZGUuY29sb3I9Y2MuQ29sb3IuQ1lBTjtcclxuICAgICAgICAgICAgICAgIG5vZGUuc2NhbGU9c2NhbGVWYWx1ZTtcclxuICAgICAgICAgICAgICAgIG5vZGUub3BhY2l0eT0yNTU7XHJcbiAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPWRhbWFnZS50b0ZpeGVkKDApO1xyXG4gICAgICAgICAgICAgICAgY2MudHdlZW4obm9kZSkudG8oMC4xLHtzY2FsZTpzY2FsZVZhbHVlKjEuMn0pLnRvKDAuMDYse3NjYWxlOnNjYWxlVmFsdWV9KS5ieSgwLjk2LHt5Ojg1LG9wYWNpdHk6LTE2OH0seyBlYXNpbmc6ICdzaW5lSW4nfSkuY2FsbCgoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmRlc3Ryb3lHYW1lRWZmZWN0QnlJZChlZmZlY3RJZCxub2RlKTtcclxuICAgICAgICAgICAgICAgIH0sdGhpcykuc3RhcnQoKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEVuZW15X0luanVyZWRfVHlwZS5BTnVCaVNpWmhlblNoYW5nOntcclxuICAgICAgICAgICAgICAgIGxldCBlZmZlY3RJZD1HYW1lRWZmZWN0SWQuZnJvbnRfbm9ybWFsX2F0dGFja190ZXh0XzE7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2NhbGVWYWx1ZT0xLjA7XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZT1HYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0Rm9yUGFyZW50KGVmZmVjdElkLHBvcyx0aGlzLm5vZGUpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5jb2xvcj1jYy5Db2xvci5PUkFOR0U7XHJcbiAgICAgICAgICAgICAgICBub2RlLnNjYWxlPXNjYWxlVmFsdWU7XHJcbiAgICAgICAgICAgICAgICBub2RlLm9wYWNpdHk9MjU1O1xyXG4gICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1kYW1hZ2UudG9GaXhlZCgwKTtcclxuICAgICAgICAgICAgICAgIGNjLnR3ZWVuKG5vZGUpLnRvKDAuMSx7c2NhbGU6c2NhbGVWYWx1ZSoxLjJ9KS50bygwLjA2LHtzY2FsZTpzY2FsZVZhbHVlfSkuYnkoMC45Nix7eTo4NSxvcGFjaXR5Oi0xNjh9LHsgZWFzaW5nOiAnc2luZUluJ30pLmNhbGwoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5kZXN0cm95R2FtZUVmZmVjdEJ5SWQoZWZmZWN0SWQsbm9kZSk7XHJcbiAgICAgICAgICAgICAgICB9LHRoaXMpLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBFbmVteV9Jbmp1cmVkX1R5cGUuQmFvVG91OntcclxuICAgICAgICAgICAgICAgIGxldCBlZmZlY3RJZD1HYW1lRWZmZWN0SWQuZnJvbnRfY3JpdF90ZXh0O1xyXG4gICAgICAgICAgICAgICAgbGV0IHNjYWxlVmFsdWU9MS40O1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGU9R2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEZvclBhcmVudChlZmZlY3RJZCxwb3MsdGhpcy5ub2RlKTtcclxuICAgICAgICAgICAgICAgIG5vZGUuc2NhbGU9c2NhbGVWYWx1ZTtcclxuICAgICAgICAgICAgICAgIG5vZGUub3BhY2l0eT0yNTU7XHJcbiAgICAgICAgICAgICAgICBub2RlLmNvbG9yPWNjLkNvbG9yLldISVRFO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz0nQCcrZGFtYWdlLnRvRml4ZWQoMCk7XHJcbiAgICAgICAgICAgICAgICBjYy50d2Vlbihub2RlKS50bygwLjEse3NjYWxlOnNjYWxlVmFsdWUqMS4yNX0pLnRvKDAuMDYse3NjYWxlOnNjYWxlVmFsdWV9KS5kZWxheSgwLjMpLmJ5KDAuNSx7eToyNSxvcGFjaXR5Oi0xNjh9LHsgZWFzaW5nOiAnc2luZUluJ30pLmNhbGwoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5kZXN0cm95R2FtZUVmZmVjdEJ5SWQoZWZmZWN0SWQsbm9kZSk7XHJcbiAgICAgICAgICAgICAgICB9LHRoaXMpLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICAvL3RoaXMuY3JlYXRlVHlwZVRleHQocG9zLmFkZChjYy52MigwLDMwKSksdHlwZSxzcGF3bik7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBFbmVteV9Jbmp1cmVkX1R5cGUuQ2hhb0ppQmFvVG91OntcclxuICAgICAgICAgICAgICAgIGxldCBlZmZlY3RJZD1HYW1lRWZmZWN0SWQuZnJvbnRfY3JpdF90ZXh0O1xyXG4gICAgICAgICAgICAgICAgbGV0IHNjYWxlVmFsdWU9MS42O1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGU9R2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEZvclBhcmVudChlZmZlY3RJZCxwb3MsdGhpcy5ub2RlKTtcclxuICAgICAgICAgICAgICAgIG5vZGUuc2NhbGU9c2NhbGVWYWx1ZTtcclxuICAgICAgICAgICAgICAgIG5vZGUub3BhY2l0eT0yNTU7XHJcbiAgICAgICAgICAgICAgICBub2RlLmNvbG9yPWNjLkNvbG9yLldISVRFO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz0nQCcrZGFtYWdlLnRvRml4ZWQoMCk7XHJcbiAgICAgICAgICAgICAgICBjYy50d2Vlbihub2RlKS50bygwLjEse3NjYWxlOnNjYWxlVmFsdWUqMS4yNX0pLnRvKDAuMDYse3NjYWxlOnNjYWxlVmFsdWV9KS5kZWxheSgwLjMpLmJ5KDAuNSx7eToyNSxvcGFjaXR5Oi0xNjh9LHsgZWFzaW5nOiAnc2luZUluJ30pLmNhbGwoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5kZXN0cm95R2FtZUVmZmVjdEJ5SWQoZWZmZWN0SWQsbm9kZSk7XHJcbiAgICAgICAgICAgICAgICB9LHRoaXMpLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgLy8gY2FzZSBFbmVteV9Jbmp1cmVkX1R5cGUuU2hhbkJpOntcclxuICAgICAgICAgICAgLy8gICAgIHRoaXMuY3JlYXRlVHlwZVRleHQocG9zLHR5cGUpXHJcbiAgICAgICAgICAgIC8vIH1icmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDp7XHJcbiAgICAgICAgICAgICAgICAvL+agueaNruS8pOWus+WAvOiOt+W+l+aWh+acrOexu+Wei2lkXHJcbiAgICAgICAgICAgICAgICBsZXQgZWZmZWN0SWQ9R2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXREYW1hZ2VUZXh0RWZmZWN0KGRhbWFnZSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2NhbGVWYWx1ZT1HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldERhbWFnZVRleHRTY2FsZShkYW1hZ2UpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGU9R2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEZvclBhcmVudChlZmZlY3RJZCxwb3MsdGhpcy5ub2RlKTtcclxuICAgICAgICAgICAgICAgIG5vZGUuc2NhbGU9c2NhbGVWYWx1ZTtcclxuICAgICAgICAgICAgICAgIG5vZGUub3BhY2l0eT0yNTU7XHJcbiAgICAgICAgICAgICAgICBub2RlLmNvbG9yPWNjLkNvbG9yLldISVRFO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1kYW1hZ2UudG9GaXhlZCgwKTtcclxuICAgICAgICAgICAgICAgIGNjLnR3ZWVuKG5vZGUpLnRvKDAuMSx7c2NhbGU6c2NhbGVWYWx1ZSoxLjJ9KS50bygwLjA2LHtzY2FsZTpzY2FsZVZhbHVlfSkuYnkoMC45Nix7eTo4NSxvcGFjaXR5Oi0xNjh9LHsgZWFzaW5nOiAnc2luZUluJ30pLmNhbGwoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5kZXN0cm95R2FtZUVmZmVjdEJ5SWQoZWZmZWN0SWQsbm9kZSk7XHJcbiAgICAgICAgICAgICAgICB9LHRoaXMpLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VGV4dENvbG9yQnlUeXBlKHR5cGU6RW5lbXlfSW5qdXJlZF9UeXBlKTpjYy5Db2xvclxyXG4gICAge1xyXG4gICAgICAgIGxldCBjb2xvcj1jYy5Db2xvci5XSElURVxyXG4gICAgICAgIHN3aXRjaCh0eXBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2FzZSBFbmVteV9Jbmp1cmVkX1R5cGUuTm9ybWFsX0F0dGFjazogY29sb3I9Y2MuQ29sb3IuV0hJVEU7YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgRW5lbXlfSW5qdXJlZF9UeXBlLlpob25nRHU6IGNvbG9yPWNjLkNvbG9yLkdSRUVOO2JyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY29sb3I7XHJcbiAgICB9XHJcbiAgICAvL+S9v+eUqOWbvueJh1xyXG4gICAgY3JlYXRlVHlwZVRleHQocG9zOmNjLlZlYzIsdGV4dDpFbmVteV9Jbmp1cmVkX1R5cGUsc3Bhd246Y2MuRmluaXRlVGltZUFjdGlvbilcclxuICAgIHsgICAgICAgIFxyXG4gICAgICAgIGxldCBub2RlPW5ldyBjYy5Ob2RlKCk7XHJcbiAgICAgICAgdGhpcy5pbWdfdGV4dF9wYXJlbnQuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgbGV0IHNwPW5vZGUuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICAgICAgbm9kZS5zZXRQb3NpdGlvbihwb3MpO1xyXG4gICAgICAgIGlmKHR5cGVvZiB0ZXh0PT1cInN0cmluZ1wiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoTGFiZWxMYW5ndWFnZSkuc3RyaW5nPXRleHQ7XHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCB4eD1NYXRoLnJhbmRvbSgpKjUwKzMwO1xyXG4gICAgICAgICAgICB4eCo9TWF0aC5yYW5kb20oKTwwLjU/MTotMTtcclxuICAgICAgICAgICAgbGV0IHl5PU1hdGgucmFuZG9tKCkqNTArMzA7XHJcbiAgICAgICAgICAgIGxldCBoZWlnaHQ9TWF0aC5yYW5kb20oKSo1MCszMDtcclxuICAgICAgICAgICAgc3dpdGNoKHRleHQpXHJcbiAgICAgICAgICAgIHsgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGNhc2UgRW5lbXlfSW5qdXJlZF9UeXBlLkJhb0ppOntcclxuICAgICAgICAgICAgICAgICAgICAvL25vZGUuY29sb3I9Y2MuQ29sb3IuUkVEO1xyXG4gICAgICAgICAgICAgICAgICAgIHNwLnNwcml0ZUZyYW1lPXRoaXMuc3BfdHlwZVsxXTtcclxuICAgICAgICAgICAgICAgICAgICBpZihzcGF3bj09bnVsbClcclxuICAgICAgICAgICAgICAgICAgICBzcGF3bj1jYy5zcGF3bihjYy5qdW1wQnkoMC41LHh4LHl5LGhlaWdodCwxKSxjYy5mYWRlVG8oMC41LDI1NSkpO1xyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBFbmVteV9Jbmp1cmVkX1R5cGUuV3VEaTp7XHJcbiAgICAgICAgICAgICAgICAgICAgc3Auc3ByaXRlRnJhbWU9dGhpcy5zcF90eXBlWzJdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHNwYXduPT1udWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIHNwYXduPWNjLnNwYXduKGNjLmp1bXBCeSgwLjUseHgseXksaGVpZ2h0LDEpLGNjLmZhZGVUbygwLjUsMjU1KSk7XHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEVuZW15X0luanVyZWRfVHlwZS5HZURhbmc6e1xyXG4gICAgICAgICAgICAgICAgICAgIHNwLnNwcml0ZUZyYW1lPXRoaXMuc3BfdHlwZVswXTtcclxuICAgICAgICAgICAgICAgICAgICBpZihzcGF3bj09bnVsbClcclxuICAgICAgICAgICAgICAgICAgICBzcGF3bj1jYy5zcGF3bihjYy5qdW1wQnkoMC41LHh4LHl5LGhlaWdodCwxKSxjYy5mYWRlVG8oMC41LDI1NSkpO1xyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBFbmVteV9Jbmp1cmVkX1R5cGUuU2hhbkJpOntcclxuICAgICAgICAgICAgICAgICAgICBzcC5zcHJpdGVGcmFtZT10aGlzLnNwX3R5cGVbM107ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpZihzcGF3bj09bnVsbClcclxuICAgICAgICAgICAgICAgICAgICBzcGF3bj1jYy5zcGF3bihjYy5qdW1wQnkoMC41LHh4LHl5LGhlaWdodCwxKSxjYy5mYWRlVG8oMC41LDI1NSkpO1xyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBFbmVteV9Jbmp1cmVkX1R5cGUuQmFvVG91OntcclxuICAgICAgICAgICAgICAgICAgICBzcC5zcHJpdGVGcmFtZT10aGlzLnNwX3R5cGVbNF07ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpZihzcGF3bj09bnVsbClcclxuICAgICAgICAgICAgICAgICAgICBzcGF3bj1jYy5zcGF3bihjYy5qdW1wQnkoMC41LHh4LHl5LGhlaWdodCwxKSxjYy5mYWRlVG8oMC41LDI1NSkpO1xyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBFbmVteV9Jbmp1cmVkX1R5cGUuQ2hhb0ppQmFvVG91OntcclxuICAgICAgICAgICAgICAgICAgICBzcC5zcHJpdGVGcmFtZT10aGlzLnNwX3R5cGVbNV07ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpZihzcGF3bj09bnVsbClcclxuICAgICAgICAgICAgICAgICAgICBzcGF3bj1jYy5zcGF3bihjYy5qdW1wQnkoMC41LHh4LHl5LGhlaWdodCwxKSxjYy5mYWRlVG8oMC41LDI1NSkpO1xyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBFbmVteV9Jbmp1cmVkX1R5cGUuTWlhbllpS29uZ1poaTp7XHJcbiAgICAgICAgICAgICAgICAgICAgc3Auc3ByaXRlRnJhbWU9dGhpcy5zcF90eXBlWzZdOyAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoc3Bhd249PW51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgc3Bhd249Y2Muc3Bhd24oY2MuanVtcEJ5KDAuNSx4eCx5eSxoZWlnaHQsMSksY2MuZmFkZVRvKDAuNSwyNTUpKTtcclxuICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgfSAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihzcGF3bilcclxuICAgICAgICBjYy50d2Vlbihub2RlKS50aGVuKHNwYXduKS5kZWxheSgwLjIpLnRvKDAuMix7b3BhY2l0eTowfSkucmVtb3ZlU2VsZigpLnN0YXJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVzdHJveUhwVGV4dEhwKHR5cGU6bnVtYmVyLG5vZGU6Y2MuTm9kZSlcclxuICAgIHtcclxuICAgICAgICBub2RlLnNjYWxlPTE7XHJcbiAgICAgICAgbm9kZS5vcGFjaXR5PTI1NTtcclxuICAgICAgICBcclxuICAgIH1cclxufVxyXG4iXX0=