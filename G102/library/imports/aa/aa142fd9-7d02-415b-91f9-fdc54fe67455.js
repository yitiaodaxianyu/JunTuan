"use strict";
cc._RF.push(module, 'aa142/ZfQJBW5H5/cVP5nRV', 'ParabolicBomb');
// Scripts/Pet/Game/ParabolicBomb.ts

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
var GameEffectsManager_1 = require("../../Game/GameEffectsManager");
var GroundManager_1 = require("../../Game/GroundManager");
var Constants_1 = require("../../Constants");
var MonsterManager_1 = require("../../Monster/MonsterManager");
var Monster_1 = require("../../Monster/Monster");
var GongJi_1 = require("../../Hero/Game/GongJi");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ParabolicBomb = /** @class */ (function (_super) {
    __extends(ParabolicBomb, _super);
    function ParabolicBomb() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.tuowei = null;
        _this.game_effect_id = GameEffectsManager_1.GameEffectId.Null;
        _this.move_speed = 700;
        _this.move_direction = Math.PI / 2;
        _this.bomb_size = 100;
        //目标地点，到达后爆炸
        _this.target_pos = null;
        _this.tuo_wei = null;
        _this.prev_pos = cc.v2(0, 0);
        /**蔓延特效 */
        _this.spread_time = 0.2;
        /**蔓延位置 */
        _this.spread_pos = [];
        return _this;
    }
    ParabolicBomb.prototype.init = function (id, speed, targetPos, gjData, size) {
        _super.prototype.initData.call(this, gjData);
        this.game_effect_id = id;
        this.move_speed = speed;
        this.target_pos = targetPos;
        var offsetPos = targetPos.sub(this.node.getPosition());
        this.move_direction = Math.atan2(offsetPos.y, offsetPos.x);
        //距离
        var distance = offsetPos.mag();
        //let dt=cc.director.getDeltaTime();
        var sp = this.move_speed / GameManager_1.default.getInstance().getGameRate();
        this.spread_time = 0.02 * GameManager_1.default.getInstance().getGameRate();
        //帧率比，适配高刷率设备
        //let frameRate=cc.director.getDeltaTime()
        var jtTime = distance / sp / GameManager_1.default.getInstance().getGameRate();
        this.node.scale = 0.5;
        cc.tween(this.node).then(cc.spawn(cc.sequence(cc.scaleTo(jtTime / 4, 1.1), cc.scaleTo(jtTime * 3 / 4, 0.8)), cc.jumpTo(jtTime, targetPos, distance / 2.5, 1))).call(this.destroySelf, this).start();
        this.bomb_size = size;
        // let node=GroundManager.getInstance().createGameEffectById(GameEffectId.pet_attackt_hit_2,this.target_pos);
        // node.setContentSize(size);
        // cc.tween(node).delay(jtTime).call(()=>{
        //     GameEffectsManager.getInstance().destroyGameEffectById(GameEffectId.pet_attackt_hit_2,node);
        // }).start();
        this.tuo_wei = cc.instantiate(this.tuowei);
        this.tuo_wei.parent = this.node.parent;
        this.node.zIndex = 1;
        this.prev_pos = this.node.getPosition();
        var ms = this.tuo_wei.getComponent(cc.MotionStreak);
        ms.fadeTime = ms.fadeTime * GameManager_1.default.getInstance().getGameRate();
        this.spread_pos = new Array(4);
        var len = this.spread_pos.length;
        for (var i = 0; i < len; i++) {
            this.spread_pos[i] = this.node.getPosition();
        }
    };
    ParabolicBomb.prototype.destroySelf = function () {
        if (this.tuo_wei) {
            cc.tween(this.tuo_wei).delay(this.tuo_wei.getComponent(cc.MotionStreak).fadeTime / (10 * GameManager_1.default.getInstance().getGameRate())).removeSelf().start();
        }
        if (this.game_effect_id == GameEffectsManager_1.GameEffectId.pet_attackt_curve_1) {
            this.createBomb1();
        }
        else if (this.game_effect_id == GameEffectsManager_1.GameEffectId.pet_attackt_curve_3) {
            this.createBomb2();
        }
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_boom2);
        GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(this.game_effect_id, this.node);
        this.tuo_wei = null;
    };
    ParabolicBomb.prototype.setDirection = function (dir) {
        this.move_direction = dir;
        //this.node.angle=180*dir/Math.PI;
    };
    ParabolicBomb.prototype.createBomb1 = function () {
        var baozha = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.pet_attackt_hit_1, this.target_pos);
        GroundManager_1.default.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.pet_attackt_hit_2, this.target_pos);
        var monsters = MonsterManager_1.default.getInstance().getMonstersForCenterPos(-1, this.target_pos, 80);
        if (monsters) {
            for (var i = 0; i < monsters.length; i++) {
                var monsterTs = monsters[i].getComponent(Monster_1.default);
                monsterTs.beFlashInjured(this.gongji_data);
            }
        }
    };
    ParabolicBomb.prototype.createBomb2 = function () {
        var baozha = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.pet_attackt_hit_3, this.target_pos);
        GroundManager_1.default.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.pet_attackt_hit_4, this.target_pos);
        var monsters = MonsterManager_1.default.getInstance().getMonstersForCenterPos(-1, this.target_pos, 80);
        if (monsters) {
            for (var i = 0; i < monsters.length; i++) {
                var monsterTs = monsters[i].getComponent(Monster_1.default);
                monsterTs.beFlashInjured(this.gongji_data);
            }
        }
    };
    ParabolicBomb.prototype.createSpread = function () {
        var weiyanId = GameEffectsManager_1.GameEffectId.pet_attackt_tuowei_2;
        if (this.game_effect_id == GameEffectsManager_1.GameEffectId.pet_attackt_curve_1) {
            weiyanId = GameEffectsManager_1.GameEffectId.pet_attackt_tuowei_2;
        }
        else if (this.game_effect_id == GameEffectsManager_1.GameEffectId.pet_attackt_curve_3) {
            weiyanId = GameEffectsManager_1.GameEffectId.pet_attackt_tuowei_3;
        }
        var node = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(weiyanId, this.spread_pos[this.getPosIndex()]);
        node.angle = Math.random() * 360;
        node.scale = Math.random() * 0.5 + 0.8;
    };
    ParabolicBomb.prototype.getPosIndex = function () {
        var maxCL = this.spread_pos.length - 1;
        var index = Math.floor(this.spread_pos.length / GameManager_1.default.getInstance().getGameRate());
        if (index >= maxCL) {
            index = maxCL;
        }
        return index;
    };
    ParabolicBomb.prototype.update = function (dt) {
        if (GameManager_1.default.getInstance().cur_game_state != Constants_1.GameState.Game_Playing)
            return;
        if (this.tuo_wei) {
            var gr = GameManager_1.default.getInstance().getGameRate();
            if (gr < 1) {
                gr = 1;
            }
            var pos = this.node.getPosition();
            //添加在子弹前面            
            var offsetPos = pos.sub(this.prev_pos);
            var distance = offsetPos.mag() * 4 / gr;
            var dir = Math.atan2(offsetPos.y, offsetPos.x);
            var xx = pos.x + Math.cos(dir) * distance;
            var yy = pos.y + Math.sin(dir) * distance;
            this.tuo_wei.setPosition(cc.v2(xx, yy));
            //this.tuo_wei.setPosition(this.node.position);
            this.prev_pos = this.node.getPosition();
            this.spread_time -= dt;
            this.update_locus_shadow();
            if (this.spread_time <= 0) {
                this.spread_time = 0.02 * GameManager_1.default.getInstance().getGameRate();
                this.createSpread();
            }
        }
    };
    ParabolicBomb.prototype.update_locus_shadow = function () {
        //加入头部
        this.spread_pos.unshift(this.node.getPosition());
        //删除尾部
        this.spread_pos.pop();
    };
    __decorate([
        property({ type: cc.Prefab })
    ], ParabolicBomb.prototype, "tuowei", void 0);
    ParabolicBomb = __decorate([
        ccclass
    ], ParabolicBomb);
    return ParabolicBomb;
}(GongJi_1.default));
exports.default = ParabolicBomb;

cc._RF.pop();