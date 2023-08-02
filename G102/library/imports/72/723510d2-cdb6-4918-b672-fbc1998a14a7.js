"use strict";
cc._RF.push(module, '72351DSzbZJGLZy+8GZihSn', 'SpeciesWarning');
// Scripts/UI/SpeciesWarning.ts

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
var Constants_1 = require("../Constants");
var GameManager_1 = require("../GameManager");
var AudioConstants_1 = require("../Sound/AudioConstants");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SpeciesWarning = /** @class */ (function (_super) {
    __extends(SpeciesWarning, _super);
    function SpeciesWarning() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SpeciesWarning.prototype.init = function (enemy) {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.boss);
        this.loadEnemyDes(enemy);
    };
    SpeciesWarning.prototype.loadEnemyDes = function (enemy) {
        // WXManagerEX.getInstance().resourcesBundle.load('enemy/enemy_des',cc.JsonAsset,(error: Error, assets:cc.JsonAsset)=>{
        //     if(error)
        //     {
        //         console.log(error);
        //         return;
        //     }
        //     let enemyDes=assets.json;
        // });
        this.setBossInfo(enemy);
    };
    SpeciesWarning.prototype.setBossInfo = function (enemy) {
        // let enemyTS=enemy.getComponent(Enemy);
        // //设置动画
        // let boss=new cc.Node();
        // boss.parent=this.node;
        // boss.setPosition(cc.v2(0,17));
        // let sk=boss.addComponent(sp.Skeleton);
        // let enemySK=enemy.getComponent(sp.Skeleton);
        // sk.skeletonData=enemySK.skeletonData;
        // if(enemyTS.enemy_type!=Enemy_Type.xunjieshu)
        // {
        //     sk.animation='animation';
        // }else
        // {
        //     sk.animation='daiji';
        // }
        // //设置简介
        // let lanType=LanguageManager.getInstance().getCurLanguageType();
        // let id=MonsterDataManager.getInstance().getMonsterIdByType(enemyTS.enemy_type);
        // let nameId=MonsterAttributeManager.getInstance().getMosterName_TextID(id);
        // let enemyName=LanguageManager.getInstance().getStrByTextId(nameId);
        // let name=this.node.getChildByName('name');
        // name.getComponent(cc.Label).string=enemyName;
        // let des=this.node.getChildByName('des');
        // let txId=MonsterAttributeManager.getInstance().getFeature(id);
        // let desId=MonsterFeatureManager.getInstance().getFeatureDiscribe_TextID(txId);
        // des.getComponent(cc.Label).string=LanguageManager.getInstance().getStrByTextId(desId);
    };
    SpeciesWarning.prototype.clickBtnContinue = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        GameManager_1.default.getInstance().cur_game_state = Constants_1.GameState.Game_Playing;
        this.node.removeFromParent();
        //添加一个Boss警告
        GameManager_1.default.getInstance().showBossWarning();
    };
    SpeciesWarning = __decorate([
        ccclass
    ], SpeciesWarning);
    return SpeciesWarning;
}(cc.Component));
exports.default = SpeciesWarning;

cc._RF.pop();