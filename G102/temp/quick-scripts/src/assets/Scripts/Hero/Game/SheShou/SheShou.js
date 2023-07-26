"use strict";
cc._RF.push(module, '3de34DF8o5MSbwgxERAdtb9', 'SheShou');
// Scripts/Hero/Game/SheShou/SheShou.ts

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
var Constants_1 = require("../../../Constants");
var FightingManager_1 = require("../../../Game/FightingManager");
var GameEffectsManager_1 = require("../../../Game/GameEffectsManager");
var SkillManager_1 = require("../../../Game/SkillManager");
var GameManager_1 = require("../../../GameManager");
var Monster_1 = require("../../../Monster/Monster");
var MonsterData_1 = require("../../../Monster/MonsterData");
var MonsterManager_1 = require("../../../Monster/MonsterManager");
var AudioConstants_1 = require("../../../Sound/AudioConstants");
var MyTool_1 = require("../../../Tools/MyTool");
var Hero_1 = require("../Hero");
var HeroConfig_1 = require("../HeroConfig");
var JianShi_1 = require("./JianShi");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SheShou = /** @class */ (function (_super) {
    __extends(SheShou, _super);
    function SheShou() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.jianyu_num = 0;
        _this.test_fenzhi = 1;
        return _this;
    }
    //---------------------------------------------加载----------------------------------------------
    SheShou.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        //加载技能指示器
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.sheshou_jianshi_att, 8);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.sheshou_jianshi_skill, 8);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.sheshou_jianshi_att_hit, 8);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.sheshou_attack_ctrl_hit, 2);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.sheshou_jianshi_super_skill_1, 16);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.sheshou_jianshi_super_skill_2, 16);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.sheshou_jianshi_super_skill_3, 16);
        this.is_LoadLoad = true;
        this.addSkillListen(this.useSkill);
        this.addAttackListen(this.normalAttack);
        this.addXuanYunListen(this.onXuanYunResult);
        this.addHitListen(this.onHitMonster);
    };
    SheShou.prototype.start = function () {
        _super.prototype.start.call(this);
        this.is_need_check_distance = true;
        var zhijing = this.hero_data.getSkillValue1(HeroConfig_1.SkillType.Active) * 2;
        _super.prototype.setSkillTipSize.call(this, zhijing, zhijing);
    };
    SheShou.prototype.onXuanYunResult = function (isXuanYun) {
        if (isXuanYun) {
            this.unscheduleAllCallbacks();
        }
        else {
            //根据上个状态判断需要做什么
            this.setHeroState(HeroConfig_1.Hero_State.idle, HeroConfig_1.GongJi_FangXiang.zhong);
        }
    };
    SheShou.prototype.starteIdle = function () {
        this.setHeroState(HeroConfig_1.Hero_State.idle, this.cur_fangxiang);
    };
    //---------------------------------------------攻击-------------------------------------------------
    /**暴击时产生100*200锥形范围的溅射效果，受攻击的敌人和被溅射的人额外受到{参数1}%伤害 */
    SheShou.prototype.onHitMonster = function (damageType, isCrit, monster) {
    };
    SheShou.prototype.createJianShi = function (id, jianshiPos, speed, dir, gjData) {
        var node = FightingManager_1.default.getInstance().createGameEffectById(id, jianshiPos);
        node.getComponent(JianShi_1.default).init(id, speed, dir, gjData);
        return node;
    };
    //获取射击方向
    SheShou.prototype.getSJFXByPos = function (pos, selfPos) {
        //对敌人单位进行方向判断，确定打击方向
        var fangxiang = HeroConfig_1.GongJi_FangXiang.zhong;
        var offsetPos = pos.sub(selfPos);
        var pi2 = Math.PI * 2;
        var radian = (Math.atan2(offsetPos.y, offsetPos.x) + pi2) % pi2;
        var angle = 180 * radian / Math.PI;
        if (angle <= 75) {
            fangxiang = HeroConfig_1.GongJi_FangXiang.you;
        }
        else if (angle > 75 && angle < 105) {
            fangxiang = HeroConfig_1.GongJi_FangXiang.zhong;
        }
        else if (angle >= 105 && angle <= 180) {
            fangxiang = HeroConfig_1.GongJi_FangXiang.zuo;
        }
        return fangxiang;
    };
    /**每次普通攻击有{参数1}%几率改为射出一波箭雨，箭雨含{参数2}支箭，每支箭造成{参数3}%伤害 */
    SheShou.prototype.normalAttack = function (monster) {
        if (GameManager_1.default.getInstance().cur_game_state != Constants_1.GameState.Game_Playing)
            return;
        var enemyPos = monster.getComponent(Monster_1.default).getSheShouPos();
        if (this.checkSkill1(enemyPos) == false) {
            this.startAttack(monster);
        }
    };
    SheShou.prototype.startAttack = function (enemyNode) {
        var _this = this;
        this.is_can_gongji = false;
        var fangxiang = this.getSJFXByPos(enemyNode.getPosition(), this.node.getPosition());
        var data = new MonsterData_1.KeyFrameData();
        data.name = "Attack";
        data.callback = function () {
            //正中心            
            var enemyPos = enemyNode.getComponent(Monster_1.default).getSheShouPos();
            var jianshiPos = _this.getCreateBulletPos();
            var offsetPos = enemyPos.sub(jianshiPos);
            var jianshiDir = Math.atan2(offsetPos.y, offsetPos.x);
            var gjData = _super.prototype.getGongJiData.call(_this, HeroConfig_1.DamageType.Normal, true, HeroConfig_1.SkillType.Null);
            _this.createJianShi(GameEffectsManager_1.GameEffectId.sheshou_jianshi_att, jianshiPos, _this.bullet_speed, jianshiDir, gjData);
            GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_GongjianshouAttack);
            if (_this.is_double_attack) {
                _this.resetNormalAttack();
            }
            else {
                _this.gongji_jishu = 0;
            }
        };
        _super.prototype.setHeroState.call(this, HeroConfig_1.Hero_State.attack, fangxiang, [data], function () {
            _super.prototype.setHeroState.call(_this, HeroConfig_1.Hero_State.idle, fangxiang);
        });
    };
    /**被动技能1触发判断-每次普通攻击有{参数1}%几率改为射出一波箭雨，箭雨含{参数2}支箭，每支箭造成{参数3}%伤害 */
    SheShou.prototype.checkSkill1 = function (pos) {
        var _this = this;
        //概率
        var rate = this.hero_data.getSkillValue1(HeroConfig_1.SkillType.Passive_1);
        if (this.jianyu_num > 0) {
            rate = 1;
            this.jianyu_num--;
        }
        if (rate && Math.random() < rate) {
            this.is_can_gongji = false;
            var data = new MonsterData_1.KeyFrameData();
            data.name = "Attack";
            data.callback = function () {
                _this.gongji_jishu = 0;
                var jianshiPos = _super.prototype.getCreateBulletPos.call(_this);
                var offsetPos = pos.sub(jianshiPos);
                var pi2 = Math.PI * 2;
                //中心方向
                var radian = (Math.atan2(offsetPos.y, offsetPos.x) + pi2) % pi2;
                //let angle=MyTool.radianToAngle(radian);
                //弧形范围,最大30°，间隔3°
                var huduFanWei = Math.PI / 60;
                var allNum = _this.hero_data.getSkillValue2(HeroConfig_1.SkillType.Passive_1) + _this.hero_lvl;
                var waveNum = Math.floor(allNum / 10) + 1;
                if (allNum % 10 == 0) {
                    waveNum--;
                }
                //求平均数，第一波最多
                var average = Math.floor(allNum / waveNum);
                //第一波数量
                var firstNum = average + allNum % waveNum;
                var gjData = _super.prototype.getGongJiData.call(_this, HeroConfig_1.DamageType.Skill, true, HeroConfig_1.SkillType.Passive_1, _this.hero_data.getSkillValue3(HeroConfig_1.SkillType.Passive_1));
                var jiange = 0.2;
                var _loop_1 = function (i) {
                    var num = i == 0 ? firstNum : average;
                    _this.scheduleOnce(function () {
                        for (var n = 0; n < num; n++) {
                            var jianshiDir = radian + (n - num / 2) * huduFanWei;
                            _this.createJianShi(GameEffectsManager_1.GameEffectId.sheshou_jianshi_skill, jianshiPos, _this.bullet_speed, jianshiDir, gjData);
                        }
                    }, jiange * (i));
                };
                for (var i = 0; i < waveNum; i++) {
                    _loop_1(i);
                }
                GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_GongjianshouSkill);
            };
            _super.prototype.setHeroState.call(this, HeroConfig_1.Hero_State.attack, HeroConfig_1.GongJi_FangXiang.zhong, [data], function () {
                _super.prototype.setHeroState.call(_this, HeroConfig_1.Hero_State.idle, HeroConfig_1.GongJi_FangXiang.zhong);
            });
            return true;
        }
        return false;
    };
    SheShou.prototype.useSkill = function (pos) {
        var _this = this;
        SkillManager_1.default.getInstance().releaseSkill(function () {
            _this.startSelfXuLi(pos);
        }, this.node);
        return 2;
    };
    SheShou.prototype.startSelfXuLi = function (pos) {
        var _this = this;
        //蓄力帧监听
        var heroRoot = cc.find('Canvas/Hero_Root');
        // let xuliData=new KeyFrameData();
        // xuliData.name='XuLi';
        // xuliData.callback=()=>{
        //     //创建英雄的蓄力动画特效。
        //     let assemble=SkillManager.getInstance().createGameEffectById(GameEffectId.sheshou_jianshi_super_skill_1,super.getCreateBulletPos().add(cc.v2(0,50)));
        //     assemble.scale=1;
        //     assemble.opacity=255;
        //     let xueliSpine=assemble.getComponent(sp.Skeleton);
        //     xueliSpine.timeScale=JiaSu;
        //     xueliSpine.setAnimation(0,'Skill_XuLi',false);
        //     //监听蓄力动作完成
        //     xueliSpine.setCompleteListener(()=>{
        //         xueliSpine.setCompleteListener(null);
        //         //蓄力完成，发射白光
        //         SkillManager.getInstance().setTimeStop(false);
        //         this.node.parent=heroRoot;
        //         let anima=xueliSpine.setAnimation(0,'Skill_FaShe',false);
        //         xueliSpine.timeScale=1;
        //         //蓄力完成，监听白光帧
        //         xueliSpine.setTrackEventListener(anima,(entry: sp.spine.TrackEntry, event)=>{
        //             if(event.data.name=='Bai'){
        //                 SkillManager.getInstance().startBaiPing();
        //             }
        //         })
        //     })
        // }
        //发射帧监听
        var fasheData = new MonsterData_1.KeyFrameData();
        fasheData.name = "FaShe";
        fasheData.callback = function () {
            //可以发射
            SkillManager_1.default.getInstance().setTimeStop(false);
            _this.node.parent = heroRoot;
            _this.node.zIndex = 2;
            _this.startLaunch(pos);
        };
        //英雄动作播放
        this.setHeroState(HeroConfig_1.Hero_State.skill, HeroConfig_1.GongJi_FangXiang.zhong, [fasheData], function () {
            //动作完毕后状态还是技能状态，动画要播放待机的
            _this.resetGongJiJiShu();
            _this.setHeroState(HeroConfig_1.Hero_State.idle, HeroConfig_1.GongJi_FangXiang.zhong);
        });
        this.spine.timeScale = Constants_1.JiaSu;
    };
    /**蓄力后发射一波箭雨，对半径{参数1}范围内的敌人在3秒内造成15次{参数2}%伤害 */
    SheShou.prototype.startLaunch = function (pos) {
        _super.prototype.setAttSpineScale.call(this);
        this.resetGongJiJiShu();
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_GongjianshouSkill);
        var gjData = _super.prototype.getGongJiData.call(this, HeroConfig_1.DamageType.Skill, false, HeroConfig_1.SkillType.Active, this.hero_data.getSkillValue2(HeroConfig_1.SkillType.Active));
        var pi2 = Math.PI * 2;
        var radius = this.hero_data.getSkillValue1(HeroConfig_1.SkillType.Active);
        var createJianShi = function () {
            //半径随机
            var r = Math.random() * radius;
            //弧度随机
            var hudu = Math.random() * pi2;
            //求点
            var posX = pos.x + Math.cos(hudu) * r;
            var posY = pos.y + Math.sin(hudu) * r;
            var startPos = cc.v2(posX + Math.random() * radius * 2 - radius, 1280 + posY);
            var endPos = cc.v2(posX, posY);
            var offsetPos = endPos.sub(startPos);
            var angle = MyTool_1.default.radianToAngle(Math.atan2(offsetPos.y, offsetPos.x)) + 90;
            var jianshi = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.sheshou_jianshi_super_skill_2, startPos);
            jianshi.scale = 2;
            jianshi.angle = angle;
            cc.tween(jianshi).to(Math.random() * 0.3 + 0.2, { x: endPos.x, y: endPos.y, scale: 0.3 }).call(function (node) {
                GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(GameEffectsManager_1.GameEffectId.sheshou_jianshi_super_skill_2, jianshi);
                var jiantou = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.sheshou_jianshi_super_skill_3, node.getPosition());
                jiantou.opacity = 255;
                jiantou.angle = angle;
                var hit = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.sheshou_jianshi_super_skill_1, node.getPosition());
                hit.opacity = 255;
                hit.scale = 0.4;
                var hitSpine = hit.getComponent(sp.Skeleton);
                hitSpine.setAnimation(0, 'Skill_Hit', false);
                cc.tween(hit).delay(0.9).to(0.5, { opacity: 0 }).call(function () {
                    GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(GameEffectsManager_1.GameEffectId.sheshou_jianshi_super_skill_1, hit);
                }).start();
                cc.tween(jiantou).by(0.1, { angle: Math.random() * 10 }).by(0.1, { angle: -(Math.random() * 10) }).by(0.1, { angle: Math.random() * 10 }).by(0.1, { angle: -(Math.random() * 10) }).delay(0.5).to(0.5, { opacity: 0 }).call(function () {
                    GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(GameEffectsManager_1.GameEffectId.sheshou_jianshi_super_skill_3, jiantou);
                }).start();
            }).start();
        };
        var exNum = 0;
        var ex1 = this.hero_data.ExclusiveWeaponSkillValue_1;
        if (ex1 && ex1 > 0) {
            exNum = ex1;
        }
        var totalNum = 60 + exNum * 4;
        //创建发射的箭矢
        for (var i = 0; i < (totalNum); i++) {
            this.scheduleOnce(function () {
                createJianShi();
            }, Math.random() * 3);
            this.scheduleOnce(function () {
                createJianShi();
            }, i * 3 / (totalNum));
        }
        var num = 0;
        var damageNum = 15 + exNum;
        this.schedule(function () {
            if (num == 0) {
                MyTool_1.default.randomSceneShake(-5, 5, 0.02, 6);
            }
            num++; //cc.log(num);
            var monsters = MonsterManager_1.default.getInstance().getMonstersForCenterPos(-1, pos, radius);
            if (monsters) {
                for (var i = 0; i < monsters.length; i++) {
                    var monsterTs = monsters[i].getComponent(Monster_1.default);
                    monsterTs.beFlashInjured(gjData);
                }
            }
        }, 3 / damageNum, damageNum - 1);
        SkillManager_1.default.getInstance().setIsSkillState(false);
    };
    SheShou = __decorate([
        ccclass
    ], SheShou);
    return SheShou;
}(Hero_1.default));
exports.default = SheShou;

cc._RF.pop();