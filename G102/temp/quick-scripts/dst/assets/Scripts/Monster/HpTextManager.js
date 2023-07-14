
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTW9uc3RlclxcSHBUZXh0TWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxpRUFBOEU7QUFDOUUsOENBQXlDO0FBQ3pDLGdFQUEyRDtBQUMzRCxvREFBMEQ7QUFFcEQsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFDMUMsWUFBWTtBQUVaO0lBQTZDLG1DQUFZO0lBQXpEO1FBQUEscUVBK09DO1FBNU9HLGFBQU8sR0FBa0IsRUFBRSxDQUFDO1FBRzVCLHFCQUFlLEdBQVMsSUFBSSxDQUFDOztJQXlPakMsQ0FBQztJQXZPRyxnQ0FBTSxHQUFOO1FBQ0kscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxlQUFlLEdBQUMsSUFBSSxDQUFDO1FBQy9DLEtBQUksSUFBSSxDQUFDLEdBQUMsaUNBQVksQ0FBQywwQkFBMEIsRUFBRSxDQUFDLElBQUUsaUNBQVksQ0FBQyxlQUFlLEVBQUUsQ0FBQyxFQUFFLEVBQUM7WUFDcEYsdUNBQWtCLENBQUMsV0FBVyxFQUFFLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzNEO0lBQ0wsQ0FBQztJQUNELG1DQUFTLEdBQVQ7UUFFSSxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGVBQWUsR0FBQyxJQUFJLENBQUM7SUFDbkQsQ0FBQztJQUNELHdDQUFjLEdBQWQsVUFBZSxHQUFXLEVBQUMsTUFBYSxFQUFDLElBQXVCO1FBRTVELFFBQU8sSUFBSSxFQUNYO1lBQ0ksS0FBSyxnQ0FBa0IsQ0FBQyxhQUFhO2dCQUFDO29CQUNsQyxlQUFlO29CQUNmLElBQUksVUFBUSxHQUFDLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ25FLElBQUksVUFBVSxHQUFDLHFC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QUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsTUFBTSxFQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7cUJBQ3BFO29CQUFBLE1BQU07YUFDVjtTQUNKO1FBQ0QsSUFBRyxLQUFLO1lBQ1IsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNuRixDQUFDO0lBRUQseUNBQWUsR0FBZixVQUFnQixJQUFXLEVBQUMsSUFBWTtRQUVwQyxJQUFJLENBQUMsS0FBSyxHQUFDLENBQUMsQ0FBQztRQUNiLElBQUksQ0FBQyxPQUFPLEdBQUMsR0FBRyxDQUFDO0lBRXJCLENBQUM7SUEzT0Q7UUFEQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUM7b0RBQ0M7SUFHNUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs0REFDVztJQU5aLGVBQWU7UUFEbkMsT0FBTztPQUNhLGVBQWUsQ0ErT25DO0lBQUQsc0JBQUM7Q0EvT0QsQUErT0MsQ0EvTzRDLEVBQUUsQ0FBQyxTQUFTLEdBK094RDtrQkEvT29CLGVBQWUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHsgR2FtZUVmZmVjdElkLCBHYW1lRWZmZWN0c01hbmFnZXIgfSBmcm9tIFwiLi4vR2FtZS9HYW1lRWZmZWN0c01hbmFnZXJcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgTGFiZWxMYW5ndWFnZSBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9MYWJlbExhbmd1YWdlXCI7XHJcbmltcG9ydCB7IEVuZW15X0luanVyZWRfVHlwZSB9IGZyb20gXCIuLi9FbmVteS9FbmVteUNvbmZpZ1wiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcbi8v6LSf6LSj5a2Q5by555qE55Sf5oiQLemUgOavgVxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIcFRleHRIcE1hbmFnZXIgZXh0ZW5kcyBjYy5Db21wb25lbnQgIHtcclxuICAgIFxyXG4gICAgQHByb3BlcnR5KFtjYy5TcHJpdGVGcmFtZV0pXHJcbiAgICBzcF90eXBlOmNjLlNwcml0ZUZyYW1lW109W107XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBpbWdfdGV4dF9wYXJlbnQ6Y2MuTm9kZT1udWxsO1xyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5ocF90ZXh0X21hbmFnZXI9dGhpcztcclxuICAgICAgICBmb3IobGV0IGk9R2FtZUVmZmVjdElkLmZyb250X25vcm1hbF9hdHRhY2tfdGV4dF8xOyBpPD1HYW1lRWZmZWN0SWQuZnJvbnRfY3JpdF90ZXh0OyBpKyspe1xyXG4gICAgICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRFZmZlY3RQb29sQnlJZChpLDgpO1xyXG4gICAgICAgIH0gXHJcbiAgICB9XHJcbiAgICBvbkRlc3Ryb3koKVxyXG4gICAge1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuaHBfdGV4dF9tYW5hZ2VyPW51bGw7XHJcbiAgICB9XHJcbiAgICBjcmVhdGVIcFRleHRIcChwb3M6Y2MuVmVjMixkYW1hZ2U6bnVtYmVyLHR5cGU6RW5lbXlfSW5qdXJlZF9UeXBlKVxyXG4gICAge1xyXG4gICAgICAgIHN3aXRjaCh0eXBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2FzZSBFbmVteV9Jbmp1cmVkX1R5cGUuTm9ybWFsX0F0dGFjazp7XHJcbiAgICAgICAgICAgICAgICAvL+agueaNruS8pOWus+WAvOiOt+W+l+aWh+acrOexu+Wei2lkXHJcbiAgICAgICAgICAgICAgICBsZXQgZWZmZWN0SWQ9R2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXREYW1hZ2VUZXh0RWZmZWN0KGRhbWFnZSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2NhbGVWYWx1ZT1HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldERhbWFnZVRleHRTY2FsZShkYW1hZ2UpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGU9R2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEZvclBhcmVudChlZmZlY3RJZCxwb3MsdGhpcy5ub2RlKTtcclxuICAgICAgICAgICAgICAgIG5vZGUuc2NhbGU9c2NhbGVWYWx1ZTtcclxuICAgICAgICAgICAgICAgIG5vZGUub3BhY2l0eT0yNTU7XHJcbiAgICAgICAgICAgICAgICBub2RlLmNvbG9yPWNjLkNvbG9yLldISVRFO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1kYW1hZ2UudG9GaXhlZCgwKTtcclxuICAgICAgICAgICAgICAgIGNjLnR3ZWVuKG5vZGUpLnRvKDAuMSx7c2NhbGU6c2NhbGVWYWx1ZSoxLjJ9KS50bygwLjA2LHtzY2FsZTpzY2FsZVZhbHVlfSkuYnkoMC45Nix7eTo4NSxvcGFjaXR5Oi0xNjh9LHsgZWFzaW5nOiAnc2luZUluJ30pLmNhbGwoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5kZXN0cm95R2FtZUVmZmVjdEJ5SWQoZWZmZWN0SWQsbm9kZSk7XHJcbiAgICAgICAgICAgICAgICB9LHRoaXMpLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBFbmVteV9Jbmp1cmVkX1R5cGUuQmFvSmk6e1xyXG4gICAgICAgICAgICAgICAgbGV0IGVmZmVjdElkPUdhbWVFZmZlY3RJZC5mcm9udF9jcml0X3RleHQ7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2NhbGVWYWx1ZT0xLjQ7XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZT1HYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0Rm9yUGFyZW50KGVmZmVjdElkLHBvcyx0aGlzLm5vZGUpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5zY2FsZT1zY2FsZVZhbHVlO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5vcGFjaXR5PTI1NTtcclxuICAgICAgICAgICAgICAgIG5vZGUuY29sb3I9Y2MuQ29sb3IuV0hJVEU7XHJcbiAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPSdAJytkYW1hZ2UudG9GaXhlZCgwKTtcclxuICAgICAgICAgICAgICAgIGNjLnR3ZWVuKG5vZGUpLnRvKDAuMSx7c2NhbGU6c2NhbGVWYWx1ZSoxLjI1fSkudG8oMC4wNix7c2NhbGU6c2NhbGVWYWx1ZX0pLmRlbGF5KDAuMykuYnkoMC41LHt5OjI1LG9wYWNpdHk6LTE2OH0seyBlYXNpbmc6ICdzaW5lSW4nfSkuY2FsbCgoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmRlc3Ryb3lHYW1lRWZmZWN0QnlJZChlZmZlY3RJZCxub2RlKTtcclxuICAgICAgICAgICAgICAgIH0sdGhpcykuc3RhcnQoKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEVuZW15X0luanVyZWRfVHlwZS5MaXVYdWU6e1xyXG4gICAgICAgICAgICAgICAgbGV0IGVmZmVjdElkPUdhbWVFZmZlY3RJZC5mcm9udF9ub3JtYWxfYXR0YWNrX3RleHRfMTtcclxuICAgICAgICAgICAgICAgIGxldCBzY2FsZVZhbHVlPTEuMDtcclxuICAgICAgICAgICAgICAgIGxldCBub2RlPUdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RGb3JQYXJlbnQoZWZmZWN0SWQscG9zLHRoaXMubm9kZSk7ICAgICAgXHJcbiAgICAgICAgICAgICAgICBub2RlLnNjYWxlPXNjYWxlVmFsdWU7XHJcbiAgICAgICAgICAgICAgICBub2RlLm9wYWNpdHk9MjU1O1xyXG4gICAgICAgICAgICAgICAgbm9kZS5jb2xvcj1jYy5Db2xvci5XSElURTtcclxuICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9ZGFtYWdlLnRvRml4ZWQoMCk7XHJcbiAgICAgICAgICAgICAgICBjYy50d2Vlbihub2RlKS50bygwLjEse3NjYWxlOnNjYWxlVmFsdWUqMS4yfSkudG8oMC4wNix7c2NhbGU6c2NhbGVWYWx1ZX0pLmJ5KDAuNSx7b3BhY2l0eTotMTY4fSx7IGVhc2luZzogJ3NpbmVJbid9KS5jYWxsKCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZGVzdHJveUdhbWVFZmZlY3RCeUlkKGVmZmVjdElkLG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgfSx0aGlzKS5zdGFydCgpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgRW5lbXlfSW5qdXJlZF9UeXBlLlpob25nRHU6e1xyXG4gICAgICAgICAgICAgICAgbGV0IGVmZmVjdElkPUdhbWVFZmZlY3RJZC5mcm9udF9ub3JtYWxfYXR0YWNrX3RleHRfMTtcclxuICAgICAgICAgICAgICAgIGxldCBzY2FsZVZhbHVlPTEuMDtcclxuICAgICAgICAgICAgICAgIGxldCBub2RlPUdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RGb3JQYXJlbnQoZWZmZWN0SWQscG9zLHRoaXMubm9kZSk7ICAgIFxyXG4gICAgICAgICAgICAgICAgbm9kZS5zY2FsZT1zY2FsZVZhbHVlO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5vcGFjaXR5PTI1NTtcclxuICAgICAgICAgICAgICAgIG5vZGUuY29sb3I9Y2MuQ29sb3IuTUFHRU5UQTtcclxuICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9ZGFtYWdlLnRvRml4ZWQoMCk7XHJcbiAgICAgICAgICAgICAgICBjYy50d2Vlbihub2RlKS50bygwLjEse3NjYWxlOnNjYWxlVmFsdWUqMS4yfSkudG8oMC4wNix7c2NhbGU6c2NhbGVWYWx1ZX0pLmJ5KDAuNSx7b3BhY2l0eTotMTY4fSx7IGVhc2luZzogJ3NpbmVJbid9KS5jYWxsKCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZGVzdHJveUdhbWVFZmZlY3RCeUlkKGVmZmVjdElkLG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgfSx0aGlzKS5zdGFydCgpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgRW5lbXlfSW5qdXJlZF9UeXBlLlpodW9TaGFvOntcclxuICAgICAgICAgICAgICAgIGxldCBlZmZlY3RJZD1HYW1lRWZmZWN0SWQuZnJvbnRfbm9ybWFsX2F0dGFja190ZXh0XzE7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2NhbGVWYWx1ZT0xLjA7XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZT1HYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0Rm9yUGFyZW50KGVmZmVjdElkLHBvcyx0aGlzLm5vZGUpOyAgIFxyXG4gICAgICAgICAgICAgICAgbm9kZS5zY2FsZT1zY2FsZVZhbHVlO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5vcGFjaXR5PTI1NTtcclxuICAgICAgICAgICAgICAgIG5vZGUuY29sb3I9Y2MuQ29sb3IuV0hJVEU7XHJcbiAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPWRhbWFnZS50b0ZpeGVkKDApOyAgXHJcbiAgICAgICAgICAgICAgICBjYy50d2Vlbihub2RlKS50bygwLjEse3NjYWxlOnNjYWxlVmFsdWUqMS4yfSkudG8oMC4wNix7c2NhbGU6c2NhbGVWYWx1ZX0pLmJ5KDAuNSx7b3BhY2l0eTotMTY4fSx7IGVhc2luZzogJ3NpbmVJbid9KS5jYWxsKCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZGVzdHJveUdhbWVFZmZlY3RCeUlkKGVmZmVjdElkLG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgfSx0aGlzKS5zdGFydCgpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgRW5lbXlfSW5qdXJlZF9UeXBlLlpoaUxpYW86e1xyXG4gICAgICAgICAgICAgICAgbGV0IGVmZmVjdElkPUdhbWVFZmZlY3RJZC5mcm9udF9yZXN0b3JlX3RleHQ7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2NhbGVWYWx1ZT0xLjI7XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZT1HYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0Rm9yUGFyZW50KGVmZmVjdElkLHBvcyx0aGlzLm5vZGUpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5jb2xvcj1jYy5Db2xvci5HUkVFTjtcclxuICAgICAgICAgICAgICAgIG5vZGUuc2NhbGU9c2NhbGVWYWx1ZTtcclxuICAgICAgICAgICAgICAgIG5vZGUub3BhY2l0eT0yNTU7XHJcbiAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPSdAJytkYW1hZ2UudG9GaXhlZCgwKTtcclxuICAgICAgICAgICAgICAgIGNjLnR3ZWVuKG5vZGUpLnRvKDAuMSx7c2NhbGU6c2NhbGVWYWx1ZSoxLjJ9KS50bygwLjA2LHtzY2FsZTpzY2FsZVZhbHVlfSkuYnkoMC45Nix7eTo4NSxvcGFjaXR5Oi0xNjh9LHsgZWFzaW5nOiAnc2luZUluJ30pLmNhbGwoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5kZXN0cm95R2FtZUVmZmVjdEJ5SWQoZWZmZWN0SWQsbm9kZSk7XHJcbiAgICAgICAgICAgICAgICB9LHRoaXMpLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBFbmVteV9Jbmp1cmVkX1R5cGUuQmluZ052WmhlblNoYW5nOntcclxuICAgICAgICAgICAgICAgIGxldCBlZmZlY3RJZD1HYW1lRWZmZWN0SWQuZnJvbnRfbm9ybWFsX2F0dGFja190ZXh0XzE7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2NhbGVWYWx1ZT0xLjA7XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZT1HYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0Rm9yUGFyZW50KGVmZmVjdElkLHBvcyx0aGlzLm5vZGUpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5jb2xvcj1jYy5Db2xvci5DWUFOO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5zY2FsZT1zY2FsZVZhbHVlO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5vcGFjaXR5PTI1NTtcclxuICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9ZGFtYWdlLnRvRml4ZWQoMCk7XHJcbiAgICAgICAgICAgICAgICBjYy50d2Vlbihub2RlKS50bygwLjEse3NjYWxlOnNjYWxlVmFsdWUqMS4yfSkudG8oMC4wNix7c2NhbGU6c2NhbGVWYWx1ZX0pLmJ5KDAuOTYse3k6ODUsb3BhY2l0eTotMTY4fSx7IGVhc2luZzogJ3NpbmVJbid9KS5jYWxsKCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZGVzdHJveUdhbWVFZmZlY3RCeUlkKGVmZmVjdElkLG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgfSx0aGlzKS5zdGFydCgpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgRW5lbXlfSW5qdXJlZF9UeXBlLkFOdUJpU2laaGVuU2hhbmc6e1xyXG4gICAgICAgICAgICAgICAgbGV0IGVmZmVjdElkPUdhbWVFZmZlY3RJZC5mcm9udF9ub3JtYWxfYXR0YWNrX3RleHRfMTtcclxuICAgICAgICAgICAgICAgIGxldCBzY2FsZVZhbHVlPTEuMDtcclxuICAgICAgICAgICAgICAgIGxldCBub2RlPUdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RGb3JQYXJlbnQoZWZmZWN0SWQscG9zLHRoaXMubm9kZSk7XHJcbiAgICAgICAgICAgICAgICBub2RlLmNvbG9yPWNjLkNvbG9yLk9SQU5HRTtcclxuICAgICAgICAgICAgICAgIG5vZGUuc2NhbGU9c2NhbGVWYWx1ZTtcclxuICAgICAgICAgICAgICAgIG5vZGUub3BhY2l0eT0yNTU7XHJcbiAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPWRhbWFnZS50b0ZpeGVkKDApO1xyXG4gICAgICAgICAgICAgICAgY2MudHdlZW4obm9kZSkudG8oMC4xLHtzY2FsZTpzY2FsZVZhbHVlKjEuMn0pLnRvKDAuMDYse3NjYWxlOnNjYWxlVmFsdWV9KS5ieSgwLjk2LHt5Ojg1LG9wYWNpdHk6LTE2OH0seyBlYXNpbmc6ICdzaW5lSW4nfSkuY2FsbCgoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmRlc3Ryb3lHYW1lRWZmZWN0QnlJZChlZmZlY3RJZCxub2RlKTtcclxuICAgICAgICAgICAgICAgIH0sdGhpcykuc3RhcnQoKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEVuZW15X0luanVyZWRfVHlwZS5CYW9Ub3U6e1xyXG4gICAgICAgICAgICAgICAgbGV0IGVmZmVjdElkPUdhbWVFZmZlY3RJZC5mcm9udF9jcml0X3RleHQ7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2NhbGVWYWx1ZT0xLjQ7XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZT1HYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0Rm9yUGFyZW50KGVmZmVjdElkLHBvcyx0aGlzLm5vZGUpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5zY2FsZT1zY2FsZVZhbHVlO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5vcGFjaXR5PTI1NTtcclxuICAgICAgICAgICAgICAgIG5vZGUuY29sb3I9Y2MuQ29sb3IuV0hJVEU7XHJcbiAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPSdAJytkYW1hZ2UudG9GaXhlZCgwKTtcclxuICAgICAgICAgICAgICAgIGNjLnR3ZWVuKG5vZGUpLnRvKDAuMSx7c2NhbGU6c2NhbGVWYWx1ZSoxLjI1fSkudG8oMC4wNix7c2NhbGU6c2NhbGVWYWx1ZX0pLmRlbGF5KDAuMykuYnkoMC41LHt5OjI1LG9wYWNpdHk6LTE2OH0seyBlYXNpbmc6ICdzaW5lSW4nfSkuY2FsbCgoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmRlc3Ryb3lHYW1lRWZmZWN0QnlJZChlZmZlY3RJZCxub2RlKTtcclxuICAgICAgICAgICAgICAgIH0sdGhpcykuc3RhcnQoKTtcclxuICAgICAgICAgICAgICAgIC8vdGhpcy5jcmVhdGVUeXBlVGV4dChwb3MuYWRkKGNjLnYyKDAsMzApKSx0eXBlLHNwYXduKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEVuZW15X0luanVyZWRfVHlwZS5DaGFvSmlCYW9Ub3U6e1xyXG4gICAgICAgICAgICAgICAgbGV0IGVmZmVjdElkPUdhbWVFZmZlY3RJZC5mcm9udF9jcml0X3RleHQ7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2NhbGVWYWx1ZT0xLjY7XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZT1HYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0Rm9yUGFyZW50KGVmZmVjdElkLHBvcyx0aGlzLm5vZGUpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5zY2FsZT1zY2FsZVZhbHVlO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5vcGFjaXR5PTI1NTtcclxuICAgICAgICAgICAgICAgIG5vZGUuY29sb3I9Y2MuQ29sb3IuV0hJVEU7XHJcbiAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPSdAJytkYW1hZ2UudG9GaXhlZCgwKTtcclxuICAgICAgICAgICAgICAgIGNjLnR3ZWVuKG5vZGUpLnRvKDAuMSx7c2NhbGU6c2NhbGVWYWx1ZSoxLjI1fSkudG8oMC4wNix7c2NhbGU6c2NhbGVWYWx1ZX0pLmRlbGF5KDAuMykuYnkoMC41LHt5OjI1LG9wYWNpdHk6LTE2OH0seyBlYXNpbmc6ICdzaW5lSW4nfSkuY2FsbCgoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmRlc3Ryb3lHYW1lRWZmZWN0QnlJZChlZmZlY3RJZCxub2RlKTtcclxuICAgICAgICAgICAgICAgIH0sdGhpcykuc3RhcnQoKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAvLyBjYXNlIEVuZW15X0luanVyZWRfVHlwZS5TaGFuQmk6e1xyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5jcmVhdGVUeXBlVGV4dChwb3MsdHlwZSlcclxuICAgICAgICAgICAgLy8gfWJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OntcclxuICAgICAgICAgICAgICAgIC8v5qC55o2u5Lyk5a6z5YC86I635b6X5paH5pys57G75Z6LaWRcclxuICAgICAgICAgICAgICAgIGxldCBlZmZlY3RJZD1HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldERhbWFnZVRleHRFZmZlY3QoZGFtYWdlKTtcclxuICAgICAgICAgICAgICAgIGxldCBzY2FsZVZhbHVlPUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RGFtYWdlVGV4dFNjYWxlKGRhbWFnZSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZT1HYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0Rm9yUGFyZW50KGVmZmVjdElkLHBvcyx0aGlzLm5vZGUpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5zY2FsZT1zY2FsZVZhbHVlO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5vcGFjaXR5PTI1NTtcclxuICAgICAgICAgICAgICAgIG5vZGUuY29sb3I9Y2MuQ29sb3IuV0hJVEU7XHJcbiAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPWRhbWFnZS50b0ZpeGVkKDApO1xyXG4gICAgICAgICAgICAgICAgY2MudHdlZW4obm9kZSkudG8oMC4xLHtzY2FsZTpzY2FsZVZhbHVlKjEuMn0pLnRvKDAuMDYse3NjYWxlOnNjYWxlVmFsdWV9KS5ieSgwLjk2LHt5Ojg1LG9wYWNpdHk6LTE2OH0seyBlYXNpbmc6ICdzaW5lSW4nfSkuY2FsbCgoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmRlc3Ryb3lHYW1lRWZmZWN0QnlJZChlZmZlY3RJZCxub2RlKTtcclxuICAgICAgICAgICAgICAgIH0sdGhpcykuc3RhcnQoKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRUZXh0Q29sb3JCeVR5cGUodHlwZTpFbmVteV9Jbmp1cmVkX1R5cGUpOmNjLkNvbG9yXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGNvbG9yPWNjLkNvbG9yLldISVRFXHJcbiAgICAgICAgc3dpdGNoKHR5cGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjYXNlIEVuZW15X0luanVyZWRfVHlwZS5Ob3JtYWxfQXR0YWNrOiBjb2xvcj1jYy5Db2xvci5XSElURTticmVhaztcclxuICAgICAgICAgICAgY2FzZSBFbmVteV9Jbmp1cmVkX1R5cGUuWmhvbmdEdTogY29sb3I9Y2MuQ29sb3IuR1JFRU47YnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjb2xvcjtcclxuICAgIH1cclxuICAgIC8v5L2/55So5Zu+54mHXHJcbiAgICBjcmVhdGVUeXBlVGV4dChwb3M6Y2MuVmVjMix0ZXh0OkVuZW15X0luanVyZWRfVHlwZSxzcGF3bjpjYy5GaW5pdGVUaW1lQWN0aW9uKVxyXG4gICAgeyAgICAgICAgXHJcbiAgICAgICAgbGV0IG5vZGU9bmV3IGNjLk5vZGUoKTtcclxuICAgICAgICB0aGlzLmltZ190ZXh0X3BhcmVudC5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICBsZXQgc3A9bm9kZS5hZGRDb21wb25lbnQoY2MuU3ByaXRlKTtcclxuICAgICAgICBub2RlLnNldFBvc2l0aW9uKHBvcyk7XHJcbiAgICAgICAgaWYodHlwZW9mIHRleHQ9PVwic3RyaW5nXCIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChMYWJlbExhbmd1YWdlKS5zdHJpbmc9dGV4dDtcclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IHh4PU1hdGgucmFuZG9tKCkqNTArMzA7XHJcbiAgICAgICAgICAgIHh4Kj1NYXRoLnJhbmRvbSgpPDAuNT8xOi0xO1xyXG4gICAgICAgICAgICBsZXQgeXk9TWF0aC5yYW5kb20oKSo1MCszMDtcclxuICAgICAgICAgICAgbGV0IGhlaWdodD1NYXRoLnJhbmRvbSgpKjUwKzMwO1xyXG4gICAgICAgICAgICBzd2l0Y2godGV4dClcclxuICAgICAgICAgICAgeyAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgY2FzZSBFbmVteV9Jbmp1cmVkX1R5cGUuQmFvSmk6e1xyXG4gICAgICAgICAgICAgICAgICAgIC8vbm9kZS5jb2xvcj1jYy5Db2xvci5SRUQ7XHJcbiAgICAgICAgICAgICAgICAgICAgc3Auc3ByaXRlRnJhbWU9dGhpcy5zcF90eXBlWzFdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHNwYXduPT1udWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIHNwYXduPWNjLnNwYXduKGNjLmp1bXBCeSgwLjUseHgseXksaGVpZ2h0LDEpLGNjLmZhZGVUbygwLjUsMjU1KSk7XHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEVuZW15X0luanVyZWRfVHlwZS5XdURpOntcclxuICAgICAgICAgICAgICAgICAgICBzcC5zcHJpdGVGcmFtZT10aGlzLnNwX3R5cGVbMl07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoc3Bhd249PW51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgc3Bhd249Y2Muc3Bhd24oY2MuanVtcEJ5KDAuNSx4eCx5eSxoZWlnaHQsMSksY2MuZmFkZVRvKDAuNSwyNTUpKTtcclxuICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgRW5lbXlfSW5qdXJlZF9UeXBlLkdlRGFuZzp7XHJcbiAgICAgICAgICAgICAgICAgICAgc3Auc3ByaXRlRnJhbWU9dGhpcy5zcF90eXBlWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHNwYXduPT1udWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIHNwYXduPWNjLnNwYXduKGNjLmp1bXBCeSgwLjUseHgseXksaGVpZ2h0LDEpLGNjLmZhZGVUbygwLjUsMjU1KSk7XHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEVuZW15X0luanVyZWRfVHlwZS5TaGFuQmk6e1xyXG4gICAgICAgICAgICAgICAgICAgIHNwLnNwcml0ZUZyYW1lPXRoaXMuc3BfdHlwZVszXTsgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHNwYXduPT1udWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIHNwYXduPWNjLnNwYXduKGNjLmp1bXBCeSgwLjUseHgseXksaGVpZ2h0LDEpLGNjLmZhZGVUbygwLjUsMjU1KSk7XHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEVuZW15X0luanVyZWRfVHlwZS5CYW9Ub3U6e1xyXG4gICAgICAgICAgICAgICAgICAgIHNwLnNwcml0ZUZyYW1lPXRoaXMuc3BfdHlwZVs0XTsgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHNwYXduPT1udWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIHNwYXduPWNjLnNwYXduKGNjLmp1bXBCeSgwLjUseHgseXksaGVpZ2h0LDEpLGNjLmZhZGVUbygwLjUsMjU1KSk7XHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEVuZW15X0luanVyZWRfVHlwZS5DaGFvSmlCYW9Ub3U6e1xyXG4gICAgICAgICAgICAgICAgICAgIHNwLnNwcml0ZUZyYW1lPXRoaXMuc3BfdHlwZVs1XTsgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHNwYXduPT1udWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIHNwYXduPWNjLnNwYXduKGNjLmp1bXBCeSgwLjUseHgseXksaGVpZ2h0LDEpLGNjLmZhZGVUbygwLjUsMjU1KSk7XHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEVuZW15X0luanVyZWRfVHlwZS5NaWFuWWlLb25nWmhpOntcclxuICAgICAgICAgICAgICAgICAgICBzcC5zcHJpdGVGcmFtZT10aGlzLnNwX3R5cGVbNl07ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpZihzcGF3bj09bnVsbClcclxuICAgICAgICAgICAgICAgICAgICBzcGF3bj1jYy5zcGF3bihjYy5qdW1wQnkoMC41LHh4LHl5LGhlaWdodCwxKSxjYy5mYWRlVG8oMC41LDI1NSkpO1xyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHNwYXduKVxyXG4gICAgICAgIGNjLnR3ZWVuKG5vZGUpLnRoZW4oc3Bhd24pLmRlbGF5KDAuMikudG8oMC4yLHtvcGFjaXR5OjB9KS5yZW1vdmVTZWxmKCkuc3RhcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBkZXN0cm95SHBUZXh0SHAodHlwZTpudW1iZXIsbm9kZTpjYy5Ob2RlKVxyXG4gICAge1xyXG4gICAgICAgIG5vZGUuc2NhbGU9MTtcclxuICAgICAgICBub2RlLm9wYWNpdHk9MjU1O1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG59XHJcbiJdfQ==