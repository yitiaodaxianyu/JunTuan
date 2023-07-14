"use strict";
cc._RF.push(module, '0d71bN0p5tKtotBk5xomm4u', 'PaoDan');
// Scripts/Hero/Game/PaoShou/PaoDan.ts

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
var HeroConfig_1 = require("../HeroConfig");
var GongJi_1 = require("../GongJi");
var GameEffectsManager_1 = require("../../../Game/GameEffectsManager");
var GameManager_1 = require("../../../GameManager");
var AudioConstants_1 = require("../../../Sound/AudioConstants");
var MonsterManager_1 = require("../../../Monster/MonsterManager");
var Monster_1 = require("../../../Monster/Monster");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PaoDan = /** @class */ (function (_super) {
    __extends(PaoDan, _super);
    function PaoDan() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.paodan_type = HeroConfig_1.PaoDan_Type.skill;
        _this.game_effect_id = GameEffectsManager_1.GameEffectId.Null;
        _this.move_speed = 700;
        _this.move_direction = Math.PI / 2;
        _this.bomb_size = 100;
        //目标地点，到达后爆炸
        _this.target_pos = null;
        return _this;
    }
    PaoDan.prototype.init = function (id, speed, targetPos, gjData, size) {
        _super.prototype.initData.call(this, gjData);
        this.game_effect_id = id;
        this.move_speed = speed;
        this.target_pos = targetPos;
        var offsetPos = targetPos.sub(this.node.getPosition());
        this.move_direction = Math.atan2(offsetPos.y, offsetPos.x);
        //距离
        var distance = offsetPos.mag();
        var sp = this.move_speed / GameManager_1.default.getInstance().getGameRate();
        var jtTime = distance / sp / GameManager_1.default.getInstance().getGameRate();
        ;
        this.node.scale = 0.5;
        cc.tween(this.node).then(cc.spawn(cc.sequence(cc.scaleTo(jtTime / 4, 1.1), cc.scaleTo(jtTime * 3 / 4, 0.8)), cc.jumpTo(jtTime, targetPos, distance / 2.5, 1))).call(this.destroySelf, this).start();
        this.bomb_size = size;
        // let node=GroundManager.getInstance().createGameEffectById(GameEffectId.paoshou_paodan_luodi,this.target_pos);
        // node.setContentSize(size);
        // cc.tween(node).delay(jtTime*GameManager.getInstance().getGameRate()).call(()=>{
        //     GameEffectsManager.getInstance().destroyGameEffectById(GameEffectId.paoshou_paodan_luodi,node);
        // }).start();
    };
    PaoDan.prototype.destroySelf = function () {
        //销毁后爆炸
        this.createBomb();
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_boom2);
        GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(this.game_effect_id, this.node);
    };
    /**每次攻击会对半径{参数1}范围内造成{参数2}%伤害 */
    PaoDan.prototype.createBomb = function () {
        var baozha = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.paoshou_skill_hit, this.target_pos);
        //baozha.angle=MyTool.radianToAngle(this.move_direction)-90;
        //MyTool.randomSceneShake(-5,5,0.02,6);
        var monsters = MonsterManager_1.default.getInstance().getMonstersForCenterPos(-1, this.node.getPosition(), this.bomb_size);
        if (monsters) {
            for (var i = 0; i < monsters.length; i++) {
                var monsterTs = monsters[i].getComponent(Monster_1.default);
                monsterTs.beFlashInjured(this.gongji_data);
            }
        }
        //baozha.getComponent(PaoDanBaoZha).init(GameEffectId.paoshou_paodan_hit,this.paodan_type,this.gongji_data);
        baozha.scale = this.bomb_size / 100;
        //baozha.scale=1;
    };
    __decorate([
        property({ type: cc.Enum(HeroConfig_1.PaoDan_Type) })
    ], PaoDan.prototype, "paodan_type", void 0);
    PaoDan = __decorate([
        ccclass
    ], PaoDan);
    return PaoDan;
}(GongJi_1.default));
exports.default = PaoDan;

cc._RF.pop();