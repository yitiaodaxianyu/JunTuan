"use strict";
cc._RF.push(module, '1159f461VdHIojYp3LicB3Y', 'TouDan');
// Scripts/Hero/Game/PaoShou/TouDan.ts

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
var GameManager_1 = require("../../../GameManager");
var Monster_1 = require("../../../Monster/Monster");
var MonsterManager_1 = require("../../../Monster/MonsterManager");
var AudioConstants_1 = require("../../../Sound/AudioConstants");
var MyTool_1 = require("../../../Tools/MyTool");
var GongJi_1 = require("../GongJi");
var HeroConfig_1 = require("../HeroConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TouDan = /** @class */ (function (_super) {
    __extends(TouDan, _super);
    function TouDan() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.paodan_type = HeroConfig_1.PaoDan_Type.skill;
        _this.game_effect_id = GameEffectsManager_1.GameEffectId.Null;
        //目标地点，到达后爆炸
        _this.target_pos = null;
        return _this;
    }
    TouDan.prototype.init = function (id, targetPos, gjData) {
        _super.prototype.initData.call(this, gjData);
        this.game_effect_id = id;
        this.target_pos = targetPos;
        //距离
        var jtTime = 0.6;
        this.node.scale = 3;
        this.node.x = targetPos.x;
        var yy = GameManager_1.default.getInstance().enemy_att_y;
        var disScale = 1.5 - (this.target_pos.y - yy) / 1000;
        //this.node.y=cc.winSize.height/2+200;
        cc.tween(this.node).then(cc.spawn(cc.scaleTo(jtTime, disScale), cc.moveTo(jtTime, targetPos))).call(this.destroySelf, this).start();
        // let node=GroundManager.getInstance().createGameEffectById(GameEffectId.paoshou_paodan_luodi,this.target_pos);
        // cc.tween(node).delay(jtTime).call(()=>{
        //     GameEffectsManager.getInstance().destroyGameEffectById(GameEffectId.paoshou_paodan_luodi,node);
        // }).start();
    };
    TouDan.prototype.destroySelf = function () {
        //判断是否是分裂出来的,分裂过就不能分裂了
        this.createBomb();
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_PaoShouSkill2);
        GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(this.game_effect_id, this.node);
    };
    TouDan.prototype.createBomb = function () {
        var baozha = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.paoshou_paodan_hit, this.target_pos);
        // baozha.getComponent(PaoDanBaoZha).init(GameEffectId.paoshou_active_skill_2,PaoDan_Type.super,this.gongji_data);
        // //baozha.scale=this.gongji_data.hero_data.SkillValue_2/100;
        var sheshouEx1 = this.gongji_data.hero_data.ExclusiveWeaponSkillValue_1;
        var aoe = 0;
        if (sheshouEx1 && sheshouEx1 > 0) {
            //范围提升
            aoe = sheshouEx1;
        }
        MyTool_1.default.randomSceneShake(-5, 5, 0.02, 6);
        var monsters = MonsterManager_1.default.getInstance().getMonstersForCenterPos(-1, this.node.getPosition(), 120 * (1 + aoe));
        if (monsters) {
            for (var i = 0; i < monsters.length; i++) {
                var monsterTs = monsters[i].getComponent(Monster_1.default);
                monsterTs.beFlashInjured(this.gongji_data);
            }
        }
        baozha.scale = 1.75;
    };
    __decorate([
        property({ type: cc.Enum(HeroConfig_1.PaoDan_Type) })
    ], TouDan.prototype, "paodan_type", void 0);
    TouDan = __decorate([
        ccclass
    ], TouDan);
    return TouDan;
}(GongJi_1.default));
exports.default = TouDan;

cc._RF.pop();