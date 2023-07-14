"use strict";
cc._RF.push(module, '19b10DTiuBHbLhxlh/3JxKB', 'BingNvWall');
// Scripts/Hero/Game/BingNv/BingNvWall.ts

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
var Wall_1 = require("../../../Wall/Wall");
var WallConfig_1 = require("../../../Wall/WallConfig");
var WallManager_1 = require("../../../Wall/WallManager");
var BuffData_1 = require("../BuffData");
var HeroConfig_1 = require("../HeroConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BingNvWall = /** @class */ (function (_super) {
    __extends(BingNvWall, _super);
    function BingNvWall() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.gongji_data = null;
        _this.is_destroy = false;
        _this.self_rect = null;
        _this.wall_id = WallConfig_1.WallType.BingNvWall;
        /**城墙持续时间，针对除了主城墙之外的城墙 */
        _this.remain_time = 0;
        return _this;
    }
    BingNvWall.prototype.init = function (gjData, pos, remainTime, wallId) {
        if (wallId === void 0) { wallId = WallConfig_1.WallType.BingNvWall; }
        gjData.hero_data.Health = gjData.hero_data.total_hp * (gjData.hero_data.getSkillValue2(HeroConfig_1.SkillType.Active));
        this.gongji_data = gjData;
        this.node.setPosition(cc.v2(0, pos.y));
        this.node.zIndex = (Math.round(8000 - this.node.y * 10));
        this.is_destroy = false;
        this.remain_time = remainTime;
        this.wall_id = wallId;
        this.node.getComponent(cc.Collider).enabled = false;
        if (this.checkJiTui(pos)) {
            this.node.getComponent(cc.Collider).enabled = true;
            _super.prototype.initWall.call(this, this.gongji_data.hero_data, WallConfig_1.WallType.BingNvWall);
            _super.prototype.setWallDieListen.call(this, this.onWallDie.bind(this));
            _super.prototype.setDamageListen.call(this, this.onDamage.bind(this));
            this.scheduleOnce(this.destroySelf, this.gongji_data.hero_data.getSkillValue1(HeroConfig_1.SkillType.Active));
        }
    };
    /*检测能被击退的敌人*/
    BingNvWall.prototype.checkJiTui = function (pos) {
        this.self_rect = cc.rect(-cc.winSize.width / 2, pos.y - 120 / 2, cc.winSize.width, 120);
        _super.prototype.setWallRect.call(this, this.self_rect);
        //击退专用范围
        var jituiRect = cc.rect(-cc.winSize.width / 2, pos.y - 200 / 2, cc.winSize.width, 200);
        var bnWall = MonsterManager_1.default.getInstance().getMonstersForBingNvWallRect(jituiRect);
        //专武造成伤害
        var exDamage = 0;
        var ex1 = this.gongji_data.hero_data.ExclusiveWeaponSkillValue_1;
        if (ex1 && ex1 > 0) {
            exDamage = ex1;
        }
        // if(IsDebug){
        //     exDamage=100;
        // }
        if (bnWall.boss_ts) {
            //销毁
            this.destroySelf();
            if (exDamage > 0) {
                var exData = cc.instantiate(this.gongji_data);
                exData.skill_damage_rate = exDamage;
                bnWall.boss_ts.beFlashInjured(exData);
            }
            return false;
        }
        else {
            //击退
            var allMonsters = bnWall.back_monsters;
            var jituiAct = 0.15;
            for (var i = 0; i < allMonsters.length; i++) {
                var monsterTs = allMonsters[i].getComponent(Monster_1.default);
                cc.tween(monsterTs.node).to(jituiAct, { y: pos.y + 120 / 2 + Math.random() * 70 }).start();
                var buffData = new BuffData_1.BuffData();
                buffData.buff_id = HeroConfig_1.BuffId.Hero_XuanYun;
                buffData.buff_type = HeroConfig_1.BuffType.Vertigo;
                buffData.buff_value = [0];
                buffData.remain_time = jituiAct + 0.2;
                buffData.game_effect_id = GameEffectsManager_1.GameEffectId.xuanyun;
                monsterTs.addDeBuff(buffData, this.gongji_data);
                if (exDamage > 0) {
                    var exData = cc.instantiate(this.gongji_data);
                    exData.skill_damage_rate = exDamage;
                    monsterTs.beFlashInjured(exData);
                }
            }
            this.node.getComponent(sp.Skeleton).setAnimation(0, 'BingNv_Skill_Start', false);
            WallManager_1.default.getInstance().addWall(this.wall_id, this);
            return true;
        }
    };
    /**城墙受到普通攻击时，反弹伤害 */
    BingNvWall.prototype.onDamage = function (monsterTs) {
        var fantanData = cc.instantiate(this.gongji_data);
        fantanData.skill_damage_rate = this.gongji_data.hero_data.getSkillValue3(HeroConfig_1.SkillType.Active);
        monsterTs.beFlashInjured(this.gongji_data);
    };
    BingNvWall.prototype.destroySelf = function () {
        var _this = this;
        //播放动画
        if (this.is_destroy) {
            return;
        }
        this.node.getComponent(cc.Collider).enabled = false;
        this.is_destroy = true;
        var spine = this.node.getComponent(sp.Skeleton);
        spine.setAnimation(0, 'BingNv_Skill_End', false);
        spine.setCompleteListener(function () {
            spine.setCompleteListener(null);
            GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(GameEffectsManager_1.GameEffectId.bing_nv_active_skill_wall, _this.node);
        });
        WallManager_1.default.getInstance().removeWall(this.wall_id);
        this.unschedule(this.destroySelf);
    };
    BingNvWall.prototype.getRect = function () {
        return this.self_rect;
    };
    BingNvWall.prototype.onWallDie = function () {
        this.destroySelf();
    };
    ////--------------------------------------碰撞开始----------------------------------------------------
    BingNvWall.prototype.onCollisionEnter = function (other, self) {
        var gm = GameManager_1.default.getInstance();
        var group = other.node.group;
        switch (group) {
            case 'boss_body':
                {
                    //一碰就会碎
                    this.destroySelf();
                }
                break;
        }
    };
    BingNvWall = __decorate([
        ccclass
    ], BingNvWall);
    return BingNvWall;
}(Wall_1.default));
exports.default = BingNvWall;

cc._RF.pop();