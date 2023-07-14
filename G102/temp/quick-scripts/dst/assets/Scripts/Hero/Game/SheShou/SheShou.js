
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Hero/Game/SheShou/SheShou.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                var allNum = _this.hero_data.getSkillValue2(HeroConfig_1.SkillType.Passive_1);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcR2FtZVxcU2hlU2hvdVxcU2hlU2hvdS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxnREFBc0Q7QUFDdEQsaUVBQTREO0FBQzVELHVFQUFvRjtBQUNwRiwyREFBc0Q7QUFFdEQsb0RBQStDO0FBQy9DLG9EQUErQztBQUMvQyw0REFBNEQ7QUFDNUQsa0VBQTZEO0FBQzdELGdFQUEyRDtBQUMzRCxnREFBMkM7QUFHM0MsZ0NBQTJCO0FBQzNCLDRDQUEySDtBQUMzSCxxQ0FBZ0M7QUFHMUIsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBcUMsMkJBQUk7SUFBekM7UUFBQSxxRUFxU0M7UUFuU0csZ0JBQVUsR0FBUSxDQUFDLENBQUM7UUFDcEIsaUJBQVcsR0FBUSxDQUFDLENBQUM7O0lBa1N6QixDQUFDO0lBalNELCtGQUErRjtJQUMzRix3QkFBTSxHQUFOO1FBRUksaUJBQU0sTUFBTSxXQUFFLENBQUM7UUFDZixTQUFTO1FBQ1QsaUJBQU0scUJBQXFCLFlBQUMsaUNBQVksQ0FBQyxtQkFBbUIsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUNoRSxpQkFBTSxxQkFBcUIsWUFBQyxpQ0FBWSxDQUFDLHFCQUFxQixFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xFLGlCQUFNLHFCQUFxQixZQUFDLGlDQUFZLENBQUMsdUJBQXVCLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEUsaUJBQU0scUJBQXFCLFlBQUMsaUNBQVksQ0FBQyx1QkFBdUIsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUNwRSxpQkFBTSxxQkFBcUIsWUFBQyxpQ0FBWSxDQUFDLDZCQUE2QixFQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzNFLGlCQUFNLHFCQUFxQixZQUFDLGlDQUFZLENBQUMsNkJBQTZCLEVBQUMsRUFBRSxDQUFDLENBQUM7UUFDM0UsaUJBQU0scUJBQXFCLFlBQUMsaUNBQVksQ0FBQyw2QkFBNkIsRUFBQyxFQUFFLENBQUMsQ0FBQztRQUMzRSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFRCx1QkFBSyxHQUFMO1FBRUksaUJBQU0sS0FBSyxXQUFFLENBQUM7UUFDZCxJQUFJLENBQUMsc0JBQXNCLEdBQUMsSUFBSSxDQUFDO1FBQ2pDLElBQUksT0FBTyxHQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLHNCQUFTLENBQUMsTUFBTSxDQUFDLEdBQUMsQ0FBQyxDQUFDO1FBQzlELGlCQUFNLGVBQWUsWUFBQyxPQUFPLEVBQUMsT0FBTyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVELGlDQUFlLEdBQWYsVUFBZ0IsU0FBaUI7UUFDN0IsSUFBRyxTQUFTLEVBQUM7WUFDVCxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztTQUNqQzthQUFJO1lBQ0QsZUFBZTtZQUNmLElBQUksQ0FBQyxZQUFZLENBQUMsdUJBQVUsQ0FBQyxJQUFJLEVBQUMsNkJBQWdCLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDN0Q7SUFDTCxDQUFDO0lBRUQsNEJBQVUsR0FBVjtRQUNJLElBQUksQ0FBQyxZQUFZLENBQUMsdUJBQVUsQ0FBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFRCxrR0FBa0c7SUFDbEcsb0RBQW9EO0lBQ3BELDhCQUFZLEdBQVosVUFBYSxVQUFxQixFQUFDLE1BQWMsRUFBQyxPQUFlO0lBRWpFLENBQUM7SUFFRCwrQkFBYSxHQUFiLFVBQWMsRUFBZSxFQUFDLFVBQWtCLEVBQUMsS0FBWSxFQUFDLEdBQVUsRUFBQyxNQUFpQjtRQUN0RixJQUFJLElBQUksR0FBQyx5QkFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDLG9CQUFvQixDQUFDLEVBQUUsRUFBQyxVQUFVLENBQUMsQ0FBQztRQUMzRSxJQUFJLENBQUMsWUFBWSxDQUFDLGlCQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFDLEtBQUssRUFBQyxHQUFHLEVBQUMsTUFBTSxDQUFDLENBQUM7UUFDckQsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUNELFFBQVE7SUFDUiw4QkFBWSxHQUFaLFVBQWEsR0FBVyxFQUFDLE9BQWU7UUFFcEMsb0JBQW9CO1FBQ3BCLElBQUksU0FBUyxHQUFDLDZCQUFnQixDQUFDLEtBQUssQ0FBQztRQUNyQyxJQUFJLFNBQVMsR0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQy9CLElBQUksR0FBRyxHQUFDLElBQUksQ0FBQyxFQUFFLEdBQUMsQ0FBQyxDQUFDO1FBQ2xCLElBQUksTUFBTSxHQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBQyxHQUFHLENBQUMsR0FBQyxHQUFHLENBQUM7UUFDekQsSUFBSSxLQUFLLEdBQUMsR0FBRyxHQUFDLE1BQU0sR0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQzdCLElBQUcsS0FBSyxJQUFFLEVBQUUsRUFDWjtZQUNJLFNBQVMsR0FBQyw2QkFBZ0IsQ0FBQyxHQUFHLENBQUM7U0FDbEM7YUFBSyxJQUFHLEtBQUssR0FBQyxFQUFFLElBQUksS0FBSyxHQUFDLEdBQUcsRUFDOUI7WUFDSSxTQUFTLEdBQUMsNkJBQWdCLENBQUMsS0FBSyxDQUFDO1NBQ3BDO2FBQUssSUFBRyxLQUFLLElBQUUsR0FBRyxJQUFJLEtBQUssSUFBRSxHQUFHLEVBQ2pDO1lBQ0ksU0FBUyxHQUFDLDZCQUFnQixDQUFDLEdBQUcsQ0FBQztTQUNsQztRQUNELE9BQU8sU0FBUyxDQUFDO0lBQ3JCLENBQUM7SUFDRCxzREFBc0Q7SUFDdEQsOEJBQVksR0FBWixVQUFhLE9BQWU7UUFFeEIsSUFBRyxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsSUFBRSxxQkFBUyxDQUFDLFlBQVk7WUFDbkUsT0FBTztRQUNQLElBQUksUUFBUSxHQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsaUJBQU8sQ0FBQyxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQzNELElBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBRSxLQUFLLEVBQUM7WUFDakMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUM3QjtJQUNMLENBQUM7SUFFRCw2QkFBVyxHQUFYLFVBQVksU0FBaUI7UUFBN0IsaUJBd0JDO1FBdEJHLElBQUksQ0FBQyxhQUFhLEdBQUMsS0FBSyxDQUFDO1FBQ3pCLElBQUksU0FBUyxHQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxFQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztRQUNqRixJQUFJLElBQUksR0FBQyxJQUFJLDBCQUFZLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsSUFBSSxHQUFDLFFBQVEsQ0FBQztRQUNuQixJQUFJLENBQUMsUUFBUSxHQUFDO1lBQ1YsaUJBQWlCO1lBQ2pCLElBQUksUUFBUSxHQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsaUJBQU8sQ0FBQyxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQzdELElBQUksVUFBVSxHQUFDLEtBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1lBQ3pDLElBQUksU0FBUyxHQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDdkMsSUFBSSxVQUFVLEdBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuRCxJQUFJLE1BQU0sR0FBQyxpQkFBTSxhQUFhLGFBQUMsdUJBQVUsQ0FBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLHNCQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdEUsS0FBSSxDQUFDLGFBQWEsQ0FBQyxpQ0FBWSxDQUFDLG1CQUFtQixFQUFDLFVBQVUsRUFBQyxLQUFJLENBQUMsWUFBWSxFQUFDLFVBQVUsRUFBQyxNQUFNLENBQUMsQ0FBQztZQUNwRyxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsMkJBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBQ3BGLElBQUcsS0FBSSxDQUFDLGdCQUFnQixFQUFDO2dCQUNyQixLQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQzthQUM1QjtpQkFBSTtnQkFDRCxLQUFJLENBQUMsWUFBWSxHQUFDLENBQUMsQ0FBQzthQUN2QjtRQUNMLENBQUMsQ0FBQTtRQUNELGlCQUFNLFlBQVksWUFBQyx1QkFBVSxDQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsQ0FBQyxJQUFJLENBQUMsRUFBQztZQUNsRCxpQkFBTSxZQUFZLGFBQUMsdUJBQVUsQ0FBQyxJQUFJLEVBQUMsU0FBUyxDQUFDLENBQUM7UUFDbEQsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0QsZ0VBQWdFO0lBQ2hFLDZCQUFXLEdBQVgsVUFBWSxHQUFXO1FBQXZCLGlCQW1EQztRQWxERyxJQUFJO1FBQ0osSUFBSSxJQUFJLEdBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsc0JBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM1RCxJQUFHLElBQUksQ0FBQyxVQUFVLEdBQUMsQ0FBQyxFQUFDO1lBQ2pCLElBQUksR0FBQyxDQUFDLENBQUM7WUFDUCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDckI7UUFDRCxJQUFHLElBQUksSUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUMsSUFBSSxFQUFDO1lBQ3hCLElBQUksQ0FBQyxhQUFhLEdBQUMsS0FBSyxDQUFDO1lBQ3pCLElBQUksSUFBSSxHQUFDLElBQUksMEJBQVksRUFBRSxDQUFDO1lBQzVCLElBQUksQ0FBQyxJQUFJLEdBQUMsUUFBUSxDQUFDO1lBQ25CLElBQUksQ0FBQyxRQUFRLEdBQUM7Z0JBQ1YsS0FBSSxDQUFDLFlBQVksR0FBQyxDQUFDLENBQUM7Z0JBQ3BCLElBQUksVUFBVSxHQUFDLGlCQUFNLGtCQUFrQixZQUFFLENBQUM7Z0JBQzFDLElBQUksU0FBUyxHQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ2xDLElBQUksR0FBRyxHQUFDLElBQUksQ0FBQyxFQUFFLEdBQUMsQ0FBQyxDQUFDO2dCQUNsQixNQUFNO2dCQUNOLElBQUksTUFBTSxHQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBQyxHQUFHLENBQUMsR0FBQyxHQUFHLENBQUM7Z0JBQ3pELHlDQUF5QztnQkFDekMsaUJBQWlCO2dCQUNqQixJQUFJLFVBQVUsR0FBQyxJQUFJLENBQUMsRUFBRSxHQUFDLEVBQUUsQ0FBQztnQkFDMUIsSUFBSSxNQUFNLEdBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsc0JBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDOUQsSUFBSSxPQUFPLEdBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUMsRUFBRSxDQUFDLEdBQUMsQ0FBQyxDQUFDO2dCQUNwQyxJQUFHLE1BQU0sR0FBQyxFQUFFLElBQUUsQ0FBQyxFQUFDO29CQUNaLE9BQU8sRUFBRSxDQUFDO2lCQUNiO2dCQUNELFlBQVk7Z0JBQ1osSUFBSSxPQUFPLEdBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3ZDLE9BQU87Z0JBQ1AsSUFBSSxRQUFRLEdBQUMsT0FBTyxHQUFDLE1BQU0sR0FBQyxPQUFPLENBQUM7Z0JBQ3BDLElBQUksTUFBTSxHQUFDLGlCQUFNLGFBQWEsYUFBQyx1QkFBVSxDQUFDLEtBQUssRUFBQyxJQUFJLEVBQUMsc0JBQVMsQ0FBQyxTQUFTLEVBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsc0JBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUM3SCxJQUFJLE1BQU0sR0FBQyxHQUFHLENBQUM7d0NBQ1AsQ0FBQztvQkFFTCxJQUFJLEdBQUcsR0FBQyxDQUFDLElBQUUsQ0FBQyxDQUFBLENBQUMsQ0FBQSxRQUFRLENBQUEsQ0FBQyxDQUFBLE9BQU8sQ0FBQztvQkFDOUIsS0FBSSxDQUFDLFlBQVksQ0FBQzt3QkFDZCxLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUN2Qjs0QkFDSSxJQUFJLFVBQVUsR0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLEdBQUMsR0FBRyxHQUFDLENBQUMsQ0FBQyxHQUFDLFVBQVUsQ0FBQzs0QkFDM0MsS0FBSSxDQUFDLGFBQWEsQ0FBQyxpQ0FBWSxDQUFDLHFCQUFxQixFQUFDLFVBQVUsRUFBQyxLQUFJLENBQUMsWUFBWSxFQUFDLFVBQVUsRUFBQyxNQUFNLENBQUMsQ0FBQzt5QkFDekc7b0JBQ0wsQ0FBQyxFQUFDLE1BQU0sR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7O2dCQVRsQixLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsT0FBTyxFQUFFLENBQUMsRUFBRTs0QkFBbkIsQ0FBQztpQkFVUjtnQkFDRCxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsMkJBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1lBQ3ZGLENBQUMsQ0FBQTtZQUNELGlCQUFNLFlBQVksWUFBQyx1QkFBVSxDQUFDLE1BQU0sRUFBQyw2QkFBZ0IsQ0FBQyxLQUFLLEVBQUMsQ0FBQyxJQUFJLENBQUMsRUFBQztnQkFDL0QsaUJBQU0sWUFBWSxhQUFDLHVCQUFVLENBQUMsSUFBSSxFQUFDLDZCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQy9ELENBQUMsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFRCwwQkFBUSxHQUFSLFVBQVMsR0FBVztRQUFwQixpQkFNQztRQUpHLHNCQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsWUFBWSxDQUFDO1lBQ3BDLEtBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDNUIsQ0FBQyxFQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNiLE9BQU8sQ0FBQyxDQUFDO0lBQ2IsQ0FBQztJQUVELCtCQUFhLEdBQWIsVUFBYyxHQUFXO1FBQXpCLGlCQThDQztRQTdDRyxPQUFPO1FBQ1AsSUFBSSxRQUFRLEdBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ3pDLG1DQUFtQztRQUNuQyx3QkFBd0I7UUFDeEIsMEJBQTBCO1FBQzFCLHFCQUFxQjtRQUNyQiw0SkFBNEo7UUFDNUosd0JBQXdCO1FBQ3hCLDRCQUE0QjtRQUM1Qix5REFBeUQ7UUFDekQsa0NBQWtDO1FBQ2xDLHFEQUFxRDtRQUNyRCxpQkFBaUI7UUFDakIsMkNBQTJDO1FBQzNDLGdEQUFnRDtRQUNoRCxzQkFBc0I7UUFDdEIseURBQXlEO1FBQ3pELHFDQUFxQztRQUNyQyxvRUFBb0U7UUFDcEUsa0NBQWtDO1FBQ2xDLHVCQUF1QjtRQUN2Qix3RkFBd0Y7UUFDeEYsMENBQTBDO1FBQzFDLDZEQUE2RDtRQUM3RCxnQkFBZ0I7UUFDaEIsYUFBYTtRQUNiLFNBQVM7UUFDVCxJQUFJO1FBQ0osT0FBTztRQUNQLElBQUksU0FBUyxHQUFDLElBQUksMEJBQVksRUFBRSxDQUFDO1FBQ2pDLFNBQVMsQ0FBQyxJQUFJLEdBQUMsT0FBTyxDQUFDO1FBQ3ZCLFNBQVMsQ0FBQyxRQUFRLEdBQUM7WUFDZixNQUFNO1lBQ04sc0JBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDOUMsS0FBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUMsUUFBUSxDQUFDO1lBQzFCLEtBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQztZQUNuQixLQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzFCLENBQUMsQ0FBQTtRQUNELFFBQVE7UUFDUixJQUFJLENBQUMsWUFBWSxDQUFDLHVCQUFVLENBQUMsS0FBSyxFQUFDLDZCQUFnQixDQUFDLEtBQUssRUFBQyxDQUFDLFNBQVMsQ0FBQyxFQUFDO1lBQ2xFLHdCQUF3QjtZQUN4QixLQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUN4QixLQUFJLENBQUMsWUFBWSxDQUFDLHVCQUFVLENBQUMsSUFBSSxFQUFDLDZCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzlELENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUMsaUJBQUssQ0FBQztJQUMvQixDQUFDO0lBQ0QsK0NBQStDO0lBQy9DLDZCQUFXLEdBQVgsVUFBWSxHQUFXO1FBQ25CLGlCQUFNLGdCQUFnQixXQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDeEIscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLDJCQUFVLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUNuRixJQUFJLE1BQU0sR0FBQyxpQkFBTSxhQUFhLFlBQUMsdUJBQVUsQ0FBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLHNCQUFTLENBQUMsTUFBTSxFQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLHNCQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUN4SCxJQUFJLEdBQUcsR0FBQyxJQUFJLENBQUMsRUFBRSxHQUFDLENBQUMsQ0FBQztRQUNsQixJQUFJLE1BQU0sR0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxzQkFBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNELElBQUksYUFBYSxHQUFDO1lBQ2QsTUFBTTtZQUNOLElBQUksQ0FBQyxHQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBQyxNQUFNLENBQUM7WUFDM0IsTUFBTTtZQUNOLElBQUksSUFBSSxHQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBQyxHQUFHLENBQUM7WUFDM0IsSUFBSTtZQUNKLElBQUksSUFBSSxHQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBQyxDQUFDLENBQUM7WUFDaEMsSUFBSSxJQUFJLEdBQUMsR0FBRyxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQztZQUNoQyxJQUFJLFFBQVEsR0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksR0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUMsTUFBTSxHQUFDLENBQUMsR0FBQyxNQUFNLEVBQUMsSUFBSSxHQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2pFLElBQUksTUFBTSxHQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxDQUFDO1lBQzVCLElBQUksU0FBUyxHQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDbkMsSUFBSSxLQUFLLEdBQUMsZ0JBQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQztZQUN2RSxJQUFJLE9BQU8sR0FBQyx1Q0FBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxpQ0FBWSxDQUFDLDZCQUE2QixFQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3ZILE9BQU8sQ0FBQyxLQUFLLEdBQUMsQ0FBQyxDQUFDO1lBQ2hCLE9BQU8sQ0FBQyxLQUFLLEdBQUMsS0FBSyxDQUFDO1lBQ3BCLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBQyxHQUFHLEdBQUMsR0FBRyxFQUFDLEVBQUMsQ0FBQyxFQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUMsS0FBSyxFQUFDLEdBQUcsRUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsSUFBWTtnQkFDNUYsdUNBQWtCLENBQUMsV0FBVyxFQUFFLENBQUMscUJBQXFCLENBQUMsaUNBQVksQ0FBQyw2QkFBNkIsRUFBQyxPQUFPLENBQUMsQ0FBQztnQkFDM0csSUFBSSxPQUFPLEdBQUMsdUNBQWtCLENBQUMsV0FBVyxFQUFFLENBQUMsb0JBQW9CLENBQUMsaUNBQVksQ0FBQyw2QkFBNkIsRUFBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztnQkFDakksT0FBTyxDQUFDLE9BQU8sR0FBQyxHQUFHLENBQUM7Z0JBQ3BCLE9BQU8sQ0FBQyxLQUFLLEdBQUMsS0FBSyxDQUFDO2dCQUNwQixJQUFJLEdBQUcsR0FBQyx1Q0FBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxpQ0FBWSxDQUFDLDZCQUE2QixFQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO2dCQUM3SCxHQUFHLENBQUMsT0FBTyxHQUFDLEdBQUcsQ0FBQztnQkFDaEIsR0FBRyxDQUFDLEtBQUssR0FBQyxHQUFHLENBQUM7Z0JBQ2QsSUFBSSxRQUFRLEdBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQzNDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFDLFdBQVcsRUFBQyxLQUFLLENBQUMsQ0FBQztnQkFDM0MsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBQyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztvQkFDOUMsdUNBQWtCLENBQUMsV0FBVyxFQUFFLENBQUMscUJBQXFCLENBQUMsaUNBQVksQ0FBQyw2QkFBNkIsRUFBQyxHQUFHLENBQUMsQ0FBQztnQkFDM0csQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ1gsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFDLEVBQUMsS0FBSyxFQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBQyxFQUFDLEtBQUssRUFBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFDLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDO29CQUM1TCx1Q0FBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQyxpQ0FBWSxDQUFDLDZCQUE2QixFQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNuSCxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNYLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2YsQ0FBQyxDQUFBO1FBQ0QsSUFBSSxLQUFLLEdBQUMsQ0FBQyxDQUFDO1FBQ1osSUFBSSxHQUFHLEdBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQywyQkFBMkIsQ0FBQztRQUNuRCxJQUFHLEdBQUcsSUFBRSxHQUFHLEdBQUMsQ0FBQyxFQUFDO1lBQ1YsS0FBSyxHQUFDLEdBQUcsQ0FBQztTQUNiO1FBQ0QsSUFBSSxRQUFRLEdBQUMsRUFBRSxHQUFDLEtBQUssR0FBQyxDQUFDLENBQUM7UUFDeEIsU0FBUztRQUNULEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFDO1lBQzNCLElBQUksQ0FBQyxZQUFZLENBQUM7Z0JBQ2QsYUFBYSxFQUFFLENBQUM7WUFDcEIsQ0FBQyxFQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQixJQUFJLENBQUMsWUFBWSxDQUFDO2dCQUNkLGFBQWEsRUFBRSxDQUFDO1lBQ3BCLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztTQUNyQjtRQUNELElBQUksR0FBRyxHQUFDLENBQUMsQ0FBQztRQUNWLElBQUksU0FBUyxHQUFDLEVBQUUsR0FBQyxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUNWLElBQUcsR0FBRyxJQUFFLENBQUMsRUFBQztnQkFDTixnQkFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDLENBQUM7YUFDeEM7WUFDRCxHQUFHLEVBQUUsQ0FBQyxDQUFBLGNBQWM7WUFDcEIsSUFBSSxRQUFRLEdBQUMsd0JBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsTUFBTSxDQUFDLENBQUM7WUFDakYsSUFBRyxRQUFRLEVBQUM7Z0JBQ1IsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7b0JBQ2hDLElBQUksU0FBUyxHQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsaUJBQU8sQ0FBQyxDQUFDO29CQUNoRCxTQUFTLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUNwQzthQUNKO1FBQ0wsQ0FBQyxFQUFDLENBQUMsR0FBQyxTQUFTLEVBQUMsU0FBUyxHQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNCLHNCQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFwU2dCLE9BQU87UUFEM0IsT0FBTztPQUNhLE9BQU8sQ0FxUzNCO0lBQUQsY0FBQztDQXJTRCxBQXFTQyxDQXJTb0MsY0FBSSxHQXFTeEM7a0JBclNvQixPQUFPIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7IEdhbWVTdGF0ZSwgSmlhU3UgfSBmcm9tIFwiLi4vLi4vLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBGaWdodGluZ01hbmFnZXIgZnJvbSBcIi4uLy4uLy4uL0dhbWUvRmlnaHRpbmdNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEdhbWVFZmZlY3RJZCwgR2FtZUVmZmVjdHNNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uLy4uL0dhbWUvR2FtZUVmZmVjdHNNYW5hZ2VyXCI7XHJcbmltcG9ydCBTa2lsbE1hbmFnZXIgZnJvbSBcIi4uLy4uLy4uL0dhbWUvU2tpbGxNYW5hZ2VyXCI7XHJcbmltcG9ydCBTa3lNYW5hZ2VyIGZyb20gXCIuLi8uLi8uLi9HYW1lL1NreU1hbmFnZXJcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi8uLi8uLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgTW9uc3RlciBmcm9tIFwiLi4vLi4vLi4vTW9uc3Rlci9Nb25zdGVyXCI7XHJcbmltcG9ydCB7IEtleUZyYW1lRGF0YSB9IGZyb20gXCIuLi8uLi8uLi9Nb25zdGVyL01vbnN0ZXJEYXRhXCI7XHJcbmltcG9ydCBNb25zdGVyTWFuYWdlciBmcm9tIFwiLi4vLi4vLi4vTW9uc3Rlci9Nb25zdGVyTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTb3VuZEluZGV4IH0gZnJvbSBcIi4uLy4uLy4uL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBNeVRvb2wgZnJvbSBcIi4uLy4uLy4uL1Rvb2xzL015VG9vbFwiO1xyXG5pbXBvcnQgeyBHb25nSmlEYXRhIH0gZnJvbSBcIi4uLy4uL0RhdGEvSGVyb0RhdGFcIjtcclxuaW1wb3J0IHsgQnVmZkRhdGEgfSBmcm9tIFwiLi4vQnVmZkRhdGFcIjtcclxuaW1wb3J0IEhlcm8gZnJvbSBcIi4uL0hlcm9cIjtcclxuaW1wb3J0IHsgQnVmZklkLCBCdWZmVHlwZSwgRGFtYWdlVHlwZSwgR29uZ0ppX0ZhbmdYaWFuZywgSGVyb19TdGF0ZSwgIFNraWxsSW5kaWNhdG9yVHlwZSwgU2tpbGxUeXBlIH0gZnJvbSBcIi4uL0hlcm9Db25maWdcIjtcclxuaW1wb3J0IEppYW5TaGkgZnJvbSBcIi4vSmlhblNoaVwiO1xyXG5pbXBvcnQgSmlhblNoaUNyaXQgZnJvbSBcIi4vSmlhblNoaUNyaXRcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hlU2hvdSBleHRlbmRzIEhlcm8ge1xyXG4gICAgXHJcbiAgICBqaWFueXVfbnVtOm51bWJlcj0wO1xyXG4gICAgdGVzdF9mZW56aGk6bnVtYmVyPTE7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t5Yqg6L29LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgb25Mb2FkKClcclxuICAgIHtcclxuICAgICAgICBzdXBlci5vbkxvYWQoKTtcclxuICAgICAgICAvL+WKoOi9veaKgOiDveaMh+ekuuWZqFxyXG4gICAgICAgIHN1cGVyLmFkZExvYWRCeUdhbWVFZmZlY3RJZChHYW1lRWZmZWN0SWQuc2hlc2hvdV9qaWFuc2hpX2F0dCw4KTtcclxuICAgICAgICBzdXBlci5hZGRMb2FkQnlHYW1lRWZmZWN0SWQoR2FtZUVmZmVjdElkLnNoZXNob3VfamlhbnNoaV9za2lsbCw4KTtcclxuICAgICAgICBzdXBlci5hZGRMb2FkQnlHYW1lRWZmZWN0SWQoR2FtZUVmZmVjdElkLnNoZXNob3VfamlhbnNoaV9hdHRfaGl0LDgpO1xyXG4gICAgICAgIHN1cGVyLmFkZExvYWRCeUdhbWVFZmZlY3RJZChHYW1lRWZmZWN0SWQuc2hlc2hvdV9hdHRhY2tfY3RybF9oaXQsMik7XHJcbiAgICAgICAgc3VwZXIuYWRkTG9hZEJ5R2FtZUVmZmVjdElkKEdhbWVFZmZlY3RJZC5zaGVzaG91X2ppYW5zaGlfc3VwZXJfc2tpbGxfMSwxNik7XHJcbiAgICAgICAgc3VwZXIuYWRkTG9hZEJ5R2FtZUVmZmVjdElkKEdhbWVFZmZlY3RJZC5zaGVzaG91X2ppYW5zaGlfc3VwZXJfc2tpbGxfMiwxNik7XHJcbiAgICAgICAgc3VwZXIuYWRkTG9hZEJ5R2FtZUVmZmVjdElkKEdhbWVFZmZlY3RJZC5zaGVzaG91X2ppYW5zaGlfc3VwZXJfc2tpbGxfMywxNik7ICBcclxuICAgICAgICB0aGlzLmFkZFNraWxsTGlzdGVuKHRoaXMudXNlU2tpbGwpO1xyXG4gICAgICAgIHRoaXMuYWRkQXR0YWNrTGlzdGVuKHRoaXMubm9ybWFsQXR0YWNrKTtcclxuICAgICAgICB0aGlzLmFkZFh1YW5ZdW5MaXN0ZW4odGhpcy5vblh1YW5ZdW5SZXN1bHQpO1xyXG4gICAgICAgIHRoaXMuYWRkSGl0TGlzdGVuKHRoaXMub25IaXRNb25zdGVyKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydCgpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIuc3RhcnQoKTtcclxuICAgICAgICB0aGlzLmlzX25lZWRfY2hlY2tfZGlzdGFuY2U9dHJ1ZTtcclxuICAgICAgICBsZXQgemhpamluZz10aGlzLmhlcm9fZGF0YS5nZXRTa2lsbFZhbHVlMShTa2lsbFR5cGUuQWN0aXZlKSoyO1xyXG4gICAgICAgIHN1cGVyLnNldFNraWxsVGlwU2l6ZSh6aGlqaW5nLHpoaWppbmcpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uWHVhbll1blJlc3VsdChpc1h1YW5ZdW46Ym9vbGVhbil7XHJcbiAgICAgICAgaWYoaXNYdWFuWXVuKXtcclxuICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzKCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIC8v5qC55o2u5LiK5Liq54q25oCB5Yik5pat6ZyA6KaB5YGa5LuA5LmIXHJcbiAgICAgICAgICAgIHRoaXMuc2V0SGVyb1N0YXRlKEhlcm9fU3RhdGUuaWRsZSxHb25nSmlfRmFuZ1hpYW5nLnpob25nKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRlSWRsZSgpe1xyXG4gICAgICAgIHRoaXMuc2V0SGVyb1N0YXRlKEhlcm9fU3RhdGUuaWRsZSx0aGlzLmN1cl9mYW5neGlhbmcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t5pS75Ye7LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgLyoq5pq05Ye75pe25Lqn55SfMTAwKjIwMOmUpeW9ouiMg+WbtOeahOa6heWwhOaViOaenO+8jOWPl+aUu+WHu+eahOaVjOS6uuWSjOiiq+a6heWwhOeahOS6uumineWkluWPl+WIsHvlj4LmlbAxfSXkvKTlrrMgKi9cclxuICAgIG9uSGl0TW9uc3RlcihkYW1hZ2VUeXBlOkRhbWFnZVR5cGUsaXNDcml0OmJvb2xlYW4sbW9uc3RlcjpjYy5Ob2RlKXtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlSmlhblNoaShpZDpHYW1lRWZmZWN0SWQsamlhbnNoaVBvczpjYy5WZWMyLHNwZWVkOm51bWJlcixkaXI6bnVtYmVyLGdqRGF0YTpHb25nSmlEYXRhKTpjYy5Ob2Rle1xyXG4gICAgICAgIGxldCBub2RlPUZpZ2h0aW5nTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKGlkLGppYW5zaGlQb3MpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KEppYW5TaGkpLmluaXQoaWQsc3BlZWQsZGlyLGdqRGF0YSk7XHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9XHJcbiAgICAvL+iOt+WPluWwhOWHu+aWueWQkVxyXG4gICAgZ2V0U0pGWEJ5UG9zKHBvczpjYy5WZWMyLHNlbGZQb3M6Y2MuVmVjMik6R29uZ0ppX0ZhbmdYaWFuZ1xyXG4gICAge1xyXG4gICAgICAgIC8v5a+55pWM5Lq65Y2V5L2N6L+b6KGM5pa55ZCR5Yik5pat77yM56Gu5a6a5omT5Ye75pa55ZCRXHJcbiAgICAgICAgbGV0IGZhbmd4aWFuZz1Hb25nSmlfRmFuZ1hpYW5nLnpob25nO1xyXG4gICAgICAgIGxldCBvZmZzZXRQb3M9cG9zLnN1YihzZWxmUG9zKTtcclxuICAgICAgICBsZXQgcGkyPU1hdGguUEkqMjtcclxuICAgICAgICBsZXQgcmFkaWFuPShNYXRoLmF0YW4yKG9mZnNldFBvcy55LG9mZnNldFBvcy54KStwaTIpJXBpMjtcclxuICAgICAgICBsZXQgYW5nbGU9MTgwKnJhZGlhbi9NYXRoLlBJO1xyXG4gICAgICAgIGlmKGFuZ2xlPD03NSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZhbmd4aWFuZz1Hb25nSmlfRmFuZ1hpYW5nLnlvdTtcclxuICAgICAgICB9ZWxzZSBpZihhbmdsZT43NSAmJiBhbmdsZTwxMDUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmYW5neGlhbmc9R29uZ0ppX0ZhbmdYaWFuZy56aG9uZztcclxuICAgICAgICB9ZWxzZSBpZihhbmdsZT49MTA1ICYmIGFuZ2xlPD0xODApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmYW5neGlhbmc9R29uZ0ppX0ZhbmdYaWFuZy56dW87XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYW5neGlhbmc7XHJcbiAgICB9XHJcbiAgICAvKirmr4/mrKHmma7pgJrmlLvlh7vmnIl75Y+C5pWwMX0l5Yeg546H5pS55Li65bCE5Ye65LiA5rOi566t6Zuo77yM566t6Zuo5ZCre+WPguaVsDJ95pSv566t77yM5q+P5pSv566t6YCg5oiQe+WPguaVsDN9JeS8pOWusyAqL1xyXG4gICAgbm9ybWFsQXR0YWNrKG1vbnN0ZXI6Y2MuTm9kZSlcclxuICAgIHtcclxuICAgICAgICBpZihHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX3N0YXRlIT1HYW1lU3RhdGUuR2FtZV9QbGF5aW5nKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgICBsZXQgZW5lbXlQb3M9bW9uc3Rlci5nZXRDb21wb25lbnQoTW9uc3RlcikuZ2V0U2hlU2hvdVBvcygpO1xyXG4gICAgICAgIGlmKHRoaXMuY2hlY2tTa2lsbDEoZW5lbXlQb3MpPT1mYWxzZSl7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRBdHRhY2sobW9uc3Rlcik7XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRBdHRhY2soZW5lbXlOb2RlOmNjLk5vZGUpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5pc19jYW5fZ29uZ2ppPWZhbHNlO1xyXG4gICAgICAgIGxldCBmYW5neGlhbmc9dGhpcy5nZXRTSkZYQnlQb3MoZW5lbXlOb2RlLmdldFBvc2l0aW9uKCksdGhpcy5ub2RlLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgIGxldCBkYXRhPW5ldyBLZXlGcmFtZURhdGEoKTtcclxuICAgICAgICBkYXRhLm5hbWU9XCJBdHRhY2tcIjtcclxuICAgICAgICBkYXRhLmNhbGxiYWNrPSgpPT57ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8v5q2j5Lit5b+DICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBlbmVteVBvcz1lbmVteU5vZGUuZ2V0Q29tcG9uZW50KE1vbnN0ZXIpLmdldFNoZVNob3VQb3MoKTtcclxuICAgICAgICAgICAgbGV0IGppYW5zaGlQb3M9dGhpcy5nZXRDcmVhdGVCdWxsZXRQb3MoKTtcclxuICAgICAgICAgICAgbGV0IG9mZnNldFBvcz1lbmVteVBvcy5zdWIoamlhbnNoaVBvcyk7XHJcbiAgICAgICAgICAgIGxldCBqaWFuc2hpRGlyPU1hdGguYXRhbjIob2Zmc2V0UG9zLnksb2Zmc2V0UG9zLngpO1xyXG4gICAgICAgICAgICBsZXQgZ2pEYXRhPXN1cGVyLmdldEdvbmdKaURhdGEoRGFtYWdlVHlwZS5Ob3JtYWwsdHJ1ZSxTa2lsbFR5cGUuTnVsbCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlSmlhblNoaShHYW1lRWZmZWN0SWQuc2hlc2hvdV9qaWFuc2hpX2F0dCxqaWFuc2hpUG9zLHRoaXMuYnVsbGV0X3NwZWVkLGppYW5zaGlEaXIsZ2pEYXRhKTtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LllYX0dvbmdqaWFuc2hvdUF0dGFjayk7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuaXNfZG91YmxlX2F0dGFjayl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0Tm9ybWFsQXR0YWNrKCk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nb25namlfamlzaHU9MDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBzdXBlci5zZXRIZXJvU3RhdGUoSGVyb19TdGF0ZS5hdHRhY2ssZmFuZ3hpYW5nLFtkYXRhXSwoKT0+eyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBzdXBlci5zZXRIZXJvU3RhdGUoSGVyb19TdGF0ZS5pZGxlLGZhbmd4aWFuZyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvKirooqvliqjmioDog70x6Kem5Y+R5Yik5patLeavj+asoeaZrumAmuaUu+WHu+aciXvlj4LmlbAxfSXlh6DnjofmlLnkuLrlsITlh7rkuIDms6Lnrq3pm6jvvIznrq3pm6jlkKt75Y+C5pWwMn3mlK/nrq3vvIzmr4/mlK/nrq3pgKDmiJB75Y+C5pWwM30l5Lyk5a6zICovXHJcbiAgICBjaGVja1NraWxsMShwb3M6Y2MuVmVjMik6Ym9vbGVhbntcclxuICAgICAgICAvL+amgueOh1xyXG4gICAgICAgIGxldCByYXRlPXRoaXMuaGVyb19kYXRhLmdldFNraWxsVmFsdWUxKFNraWxsVHlwZS5QYXNzaXZlXzEpO1xyXG4gICAgICAgIGlmKHRoaXMuamlhbnl1X251bT4wKXtcclxuICAgICAgICAgICAgcmF0ZT0xO1xyXG4gICAgICAgICAgICB0aGlzLmppYW55dV9udW0tLTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYocmF0ZSYmTWF0aC5yYW5kb20oKTxyYXRlKXtcclxuICAgICAgICAgICAgdGhpcy5pc19jYW5fZ29uZ2ppPWZhbHNlOyAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBkYXRhPW5ldyBLZXlGcmFtZURhdGEoKTtcclxuICAgICAgICAgICAgZGF0YS5uYW1lPVwiQXR0YWNrXCI7XHJcbiAgICAgICAgICAgIGRhdGEuY2FsbGJhY2s9KCk9PntcclxuICAgICAgICAgICAgICAgIHRoaXMuZ29uZ2ppX2ppc2h1PTA7IFxyXG4gICAgICAgICAgICAgICAgbGV0IGppYW5zaGlQb3M9c3VwZXIuZ2V0Q3JlYXRlQnVsbGV0UG9zKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgb2Zmc2V0UG9zPXBvcy5zdWIoamlhbnNoaVBvcyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgcGkyPU1hdGguUEkqMjtcclxuICAgICAgICAgICAgICAgIC8v5Lit5b+D5pa55ZCRXHJcbiAgICAgICAgICAgICAgICBsZXQgcmFkaWFuPShNYXRoLmF0YW4yKG9mZnNldFBvcy55LG9mZnNldFBvcy54KStwaTIpJXBpMjtcclxuICAgICAgICAgICAgICAgIC8vbGV0IGFuZ2xlPU15VG9vbC5yYWRpYW5Ub0FuZ2xlKHJhZGlhbik7XHJcbiAgICAgICAgICAgICAgICAvL+W8p+W9ouiMg+WbtCzmnIDlpKczMMKw77yM6Ze06ZqUM8KwXHJcbiAgICAgICAgICAgICAgICBsZXQgaHVkdUZhbldlaT1NYXRoLlBJLzYwO1xyXG4gICAgICAgICAgICAgICAgbGV0IGFsbE51bT10aGlzLmhlcm9fZGF0YS5nZXRTa2lsbFZhbHVlMihTa2lsbFR5cGUuUGFzc2l2ZV8xKTtcclxuICAgICAgICAgICAgICAgIGxldCB3YXZlTnVtPU1hdGguZmxvb3IoYWxsTnVtLzEwKSsxO1xyXG4gICAgICAgICAgICAgICAgaWYoYWxsTnVtJTEwPT0wKXtcclxuICAgICAgICAgICAgICAgICAgICB3YXZlTnVtLS07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL+axguW5s+Wdh+aVsO+8jOesrOS4gOazouacgOWkmlxyXG4gICAgICAgICAgICAgICAgbGV0IGF2ZXJhZ2U9TWF0aC5mbG9vcihhbGxOdW0vd2F2ZU51bSk7XHJcbiAgICAgICAgICAgICAgICAvL+esrOS4gOazouaVsOmHj1xyXG4gICAgICAgICAgICAgICAgbGV0IGZpcnN0TnVtPWF2ZXJhZ2UrYWxsTnVtJXdhdmVOdW07XHJcbiAgICAgICAgICAgICAgICBsZXQgZ2pEYXRhPXN1cGVyLmdldEdvbmdKaURhdGEoRGFtYWdlVHlwZS5Ta2lsbCx0cnVlLFNraWxsVHlwZS5QYXNzaXZlXzEsdGhpcy5oZXJvX2RhdGEuZ2V0U2tpbGxWYWx1ZTMoU2tpbGxUeXBlLlBhc3NpdmVfMSkpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGppYW5nZT0wLjI7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDsgaTx3YXZlTnVtOyBpKyspXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG51bT1pPT0wP2ZpcnN0TnVtOmF2ZXJhZ2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PnsgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IobGV0IG49MDsgbjxudW07IG4rKylcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGppYW5zaGlEaXI9cmFkaWFuKyhuLW51bS8yKSpodWR1RmFuV2VpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVKaWFuU2hpKEdhbWVFZmZlY3RJZC5zaGVzaG91X2ppYW5zaGlfc2tpbGwsamlhbnNoaVBvcyx0aGlzLmJ1bGxldF9zcGVlZCxqaWFuc2hpRGlyLGdqRGF0YSk7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH0samlhbmdlKihpKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguWVhfR29uZ2ppYW5zaG91U2tpbGwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHN1cGVyLnNldEhlcm9TdGF0ZShIZXJvX1N0YXRlLmF0dGFjayxHb25nSmlfRmFuZ1hpYW5nLnpob25nLFtkYXRhXSwoKT0+e1xyXG4gICAgICAgICAgICAgICAgc3VwZXIuc2V0SGVyb1N0YXRlKEhlcm9fU3RhdGUuaWRsZSxHb25nSmlfRmFuZ1hpYW5nLnpob25nKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgdXNlU2tpbGwocG9zOmNjLlZlYzIpOm51bWJlclxyXG4gICAgeyAgICAgICAgXHJcbiAgICAgICAgU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkucmVsZWFzZVNraWxsKCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRTZWxmWHVMaShwb3MpO1xyXG4gICAgICAgIH0sdGhpcy5ub2RlKTtcclxuICAgICAgICByZXR1cm4gMjtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydFNlbGZYdUxpKHBvczpjYy5WZWMyKXtcclxuICAgICAgICAvL+iThOWKm+W4p+ebkeWQrFxyXG4gICAgICAgIGxldCBoZXJvUm9vdD1jYy5maW5kKCdDYW52YXMvSGVyb19Sb290Jyk7XHJcbiAgICAgICAgLy8gbGV0IHh1bGlEYXRhPW5ldyBLZXlGcmFtZURhdGEoKTtcclxuICAgICAgICAvLyB4dWxpRGF0YS5uYW1lPSdYdUxpJztcclxuICAgICAgICAvLyB4dWxpRGF0YS5jYWxsYmFjaz0oKT0+e1xyXG4gICAgICAgIC8vICAgICAvL+WIm+W7uuiLsembhOeahOiThOWKm+WKqOeUu+eJueaViOOAglxyXG4gICAgICAgIC8vICAgICBsZXQgYXNzZW1ibGU9U2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLnNoZXNob3VfamlhbnNoaV9zdXBlcl9za2lsbF8xLHN1cGVyLmdldENyZWF0ZUJ1bGxldFBvcygpLmFkZChjYy52MigwLDUwKSkpO1xyXG4gICAgICAgIC8vICAgICBhc3NlbWJsZS5zY2FsZT0xO1xyXG4gICAgICAgIC8vICAgICBhc3NlbWJsZS5vcGFjaXR5PTI1NTtcclxuICAgICAgICAvLyAgICAgbGV0IHh1ZWxpU3BpbmU9YXNzZW1ibGUuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcclxuICAgICAgICAvLyAgICAgeHVlbGlTcGluZS50aW1lU2NhbGU9SmlhU3U7XHJcbiAgICAgICAgLy8gICAgIHh1ZWxpU3BpbmUuc2V0QW5pbWF0aW9uKDAsJ1NraWxsX1h1TGknLGZhbHNlKTtcclxuICAgICAgICAvLyAgICAgLy/nm5HlkKzok4TlipvliqjkvZzlrozmiJBcclxuICAgICAgICAvLyAgICAgeHVlbGlTcGluZS5zZXRDb21wbGV0ZUxpc3RlbmVyKCgpPT57XHJcbiAgICAgICAgLy8gICAgICAgICB4dWVsaVNwaW5lLnNldENvbXBsZXRlTGlzdGVuZXIobnVsbCk7XHJcbiAgICAgICAgLy8gICAgICAgICAvL+iThOWKm+WujOaIkO+8jOWPkeWwhOeZveWFiVxyXG4gICAgICAgIC8vICAgICAgICAgU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0VGltZVN0b3AoZmFsc2UpO1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5ub2RlLnBhcmVudD1oZXJvUm9vdDtcclxuICAgICAgICAvLyAgICAgICAgIGxldCBhbmltYT14dWVsaVNwaW5lLnNldEFuaW1hdGlvbigwLCdTa2lsbF9GYVNoZScsZmFsc2UpO1xyXG4gICAgICAgIC8vICAgICAgICAgeHVlbGlTcGluZS50aW1lU2NhbGU9MTtcclxuICAgICAgICAvLyAgICAgICAgIC8v6JOE5Yqb5a6M5oiQ77yM55uR5ZCs55m95YWJ5binXHJcbiAgICAgICAgLy8gICAgICAgICB4dWVsaVNwaW5lLnNldFRyYWNrRXZlbnRMaXN0ZW5lcihhbmltYSwoZW50cnk6IHNwLnNwaW5lLlRyYWNrRW50cnksIGV2ZW50KT0+e1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIGlmKGV2ZW50LmRhdGEubmFtZT09J0JhaScpe1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBTa2lsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydEJhaVBpbmcoKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICB9KVxyXG4gICAgICAgIC8vICAgICB9KVxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvL+WPkeWwhOW4p+ebkeWQrFxyXG4gICAgICAgIGxldCBmYXNoZURhdGE9bmV3IEtleUZyYW1lRGF0YSgpO1xyXG4gICAgICAgIGZhc2hlRGF0YS5uYW1lPVwiRmFTaGVcIjtcclxuICAgICAgICBmYXNoZURhdGEuY2FsbGJhY2s9KCk9PntcclxuICAgICAgICAgICAgLy/lj6/ku6Xlj5HlsIRcclxuICAgICAgICAgICAgU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0VGltZVN0b3AoZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUucGFyZW50PWhlcm9Sb290O1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuekluZGV4PTI7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRMYXVuY2gocG9zKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/oi7Hpm4TliqjkvZzmkq3mlL5cclxuICAgICAgICB0aGlzLnNldEhlcm9TdGF0ZShIZXJvX1N0YXRlLnNraWxsLEdvbmdKaV9GYW5nWGlhbmcuemhvbmcsW2Zhc2hlRGF0YV0sKCk9PntcclxuICAgICAgICAgICAgLy/liqjkvZzlrozmr5XlkI7nirbmgIHov5jmmK/mioDog73nirbmgIHvvIzliqjnlLvopoHmkq3mlL7lvoXmnLrnmoRcclxuICAgICAgICAgICAgdGhpcy5yZXNldEdvbmdKaUppU2h1KCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0SGVyb1N0YXRlKEhlcm9fU3RhdGUuaWRsZSxHb25nSmlfRmFuZ1hpYW5nLnpob25nKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnNwaW5lLnRpbWVTY2FsZT1KaWFTdTtcclxuICAgIH1cclxuICAgIC8qKuiThOWKm+WQjuWPkeWwhOS4gOazoueurembqO+8jOWvueWNiuW+hHvlj4LmlbAxfeiMg+WbtOWGheeahOaVjOS6uuWcqDPnp5LlhoXpgKDmiJAxNeasoXvlj4LmlbAyfSXkvKTlrrMgKi9cclxuICAgIHN0YXJ0TGF1bmNoKHBvczpjYy5WZWMyKXtcclxuICAgICAgICBzdXBlci5zZXRBdHRTcGluZVNjYWxlKCk7XHJcbiAgICAgICAgdGhpcy5yZXNldEdvbmdKaUppU2h1KCk7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LllYX0dvbmdqaWFuc2hvdVNraWxsKTtcclxuICAgICAgICBsZXQgZ2pEYXRhPXN1cGVyLmdldEdvbmdKaURhdGEoRGFtYWdlVHlwZS5Ta2lsbCxmYWxzZSxTa2lsbFR5cGUuQWN0aXZlLHRoaXMuaGVyb19kYXRhLmdldFNraWxsVmFsdWUyKFNraWxsVHlwZS5BY3RpdmUpKTsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgbGV0IHBpMj1NYXRoLlBJKjI7XHJcbiAgICAgICAgbGV0IHJhZGl1cz10aGlzLmhlcm9fZGF0YS5nZXRTa2lsbFZhbHVlMShTa2lsbFR5cGUuQWN0aXZlKTtcclxuICAgICAgICBsZXQgY3JlYXRlSmlhblNoaT0oKT0+e1xyXG4gICAgICAgICAgICAvL+WNiuW+hOmaj+aculxyXG4gICAgICAgICAgICBsZXQgcj1NYXRoLnJhbmRvbSgpKnJhZGl1cztcclxuICAgICAgICAgICAgLy/lvKfluqbpmo/mnLpcclxuICAgICAgICAgICAgbGV0IGh1ZHU9TWF0aC5yYW5kb20oKSpwaTI7XHJcbiAgICAgICAgICAgIC8v5rGC54K5XHJcbiAgICAgICAgICAgIGxldCBwb3NYPXBvcy54K01hdGguY29zKGh1ZHUpKnI7XHJcbiAgICAgICAgICAgIGxldCBwb3NZPXBvcy55K01hdGguc2luKGh1ZHUpKnI7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgc3RhcnRQb3M9Y2MudjIocG9zWCtNYXRoLnJhbmRvbSgpKnJhZGl1cyoyLXJhZGl1cywxMjgwK3Bvc1kpO1xyXG4gICAgICAgICAgICBsZXQgZW5kUG9zPWNjLnYyKHBvc1gscG9zWSk7XHJcbiAgICAgICAgICAgIGxldCBvZmZzZXRQb3M9ZW5kUG9zLnN1YihzdGFydFBvcyk7XHJcbiAgICAgICAgICAgIGxldCBhbmdsZT1NeVRvb2wucmFkaWFuVG9BbmdsZShNYXRoLmF0YW4yKG9mZnNldFBvcy55LG9mZnNldFBvcy54KSkrOTA7XHJcbiAgICAgICAgICAgIGxldCBqaWFuc2hpPUdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5zaGVzaG91X2ppYW5zaGlfc3VwZXJfc2tpbGxfMixzdGFydFBvcyk7XHJcbiAgICAgICAgICAgIGppYW5zaGkuc2NhbGU9MjtcclxuICAgICAgICAgICAgamlhbnNoaS5hbmdsZT1hbmdsZTtcclxuICAgICAgICAgICAgY2MudHdlZW4oamlhbnNoaSkudG8oTWF0aC5yYW5kb20oKSowLjMrMC4yLHt4OmVuZFBvcy54LHk6ZW5kUG9zLnksc2NhbGU6MC4zfSkuY2FsbCgobm9kZTpjYy5Ob2RlKT0+e1xyXG4gICAgICAgICAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZGVzdHJveUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5zaGVzaG91X2ppYW5zaGlfc3VwZXJfc2tpbGxfMixqaWFuc2hpKTtcclxuICAgICAgICAgICAgICAgIGxldCBqaWFudG91PUdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5zaGVzaG91X2ppYW5zaGlfc3VwZXJfc2tpbGxfMyxub2RlLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgICAgICAgICAgamlhbnRvdS5vcGFjaXR5PTI1NTtcclxuICAgICAgICAgICAgICAgIGppYW50b3UuYW5nbGU9YW5nbGU7XHJcbiAgICAgICAgICAgICAgICBsZXQgaGl0PUdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5zaGVzaG91X2ppYW5zaGlfc3VwZXJfc2tpbGxfMSxub2RlLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgICAgICAgICAgaGl0Lm9wYWNpdHk9MjU1O1xyXG4gICAgICAgICAgICAgICAgaGl0LnNjYWxlPTAuNDtcclxuICAgICAgICAgICAgICAgIGxldCBoaXRTcGluZT1oaXQuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcclxuICAgICAgICAgICAgICAgIGhpdFNwaW5lLnNldEFuaW1hdGlvbigwLCdTa2lsbF9IaXQnLGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIGNjLnR3ZWVuKGhpdCkuZGVsYXkoMC45KS50bygwLjUse29wYWNpdHk6MH0pLmNhbGwoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5kZXN0cm95R2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLnNoZXNob3VfamlhbnNoaV9zdXBlcl9za2lsbF8xLGhpdCk7ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgY2MudHdlZW4oamlhbnRvdSkuYnkoMC4xLHthbmdsZTpNYXRoLnJhbmRvbSgpKjEwfSkuYnkoMC4xLHthbmdsZTotKE1hdGgucmFuZG9tKCkqMTApfSkuYnkoMC4xLHthbmdsZTpNYXRoLnJhbmRvbSgpKjEwfSkuYnkoMC4xLHthbmdsZTotKE1hdGgucmFuZG9tKCkqMTApfSkuZGVsYXkoMC41KS50bygwLjUse29wYWNpdHk6MH0pLmNhbGwoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5kZXN0cm95R2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLnNoZXNob3VfamlhbnNoaV9zdXBlcl9za2lsbF8zLGppYW50b3UpO1xyXG4gICAgICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZXhOdW09MDtcclxuICAgICAgICBsZXQgZXgxPXRoaXMuaGVyb19kYXRhLkV4Y2x1c2l2ZVdlYXBvblNraWxsVmFsdWVfMTtcclxuICAgICAgICBpZihleDEmJmV4MT4wKXtcclxuICAgICAgICAgICAgZXhOdW09ZXgxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgdG90YWxOdW09NjArZXhOdW0qNDtcclxuICAgICAgICAvL+WIm+W7uuWPkeWwhOeahOeureefolxyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPCh0b3RhbE51bSk7IGkrKyl7XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgICAgICAgICBjcmVhdGVKaWFuU2hpKCk7XHJcbiAgICAgICAgICAgIH0sTWF0aC5yYW5kb20oKSozKTtcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUppYW5TaGkoKTtcclxuICAgICAgICAgICAgfSxpKjMvKHRvdGFsTnVtKSk7XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICAgICAgbGV0IG51bT0wO1xyXG4gICAgICAgIGxldCBkYW1hZ2VOdW09MTUrZXhOdW07XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZSgoKT0+e1xyXG4gICAgICAgICAgICBpZihudW09PTApe1xyXG4gICAgICAgICAgICAgICAgTXlUb29sLnJhbmRvbVNjZW5lU2hha2UoLTUsNSwwLjAyLDYpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG51bSsrOy8vY2MubG9nKG51bSk7XHJcbiAgICAgICAgICAgIGxldCBtb25zdGVycz1Nb25zdGVyTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1vbnN0ZXJzRm9yQ2VudGVyUG9zKC0xLHBvcyxyYWRpdXMpO1xyXG4gICAgICAgICAgICBpZihtb25zdGVycyl7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxtb25zdGVycy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1vbnN0ZXJUcz1tb25zdGVyc1tpXS5nZXRDb21wb25lbnQoTW9uc3Rlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgbW9uc3RlclRzLmJlRmxhc2hJbmp1cmVkKGdqRGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LDMvZGFtYWdlTnVtLGRhbWFnZU51bS0xKTtcclxuICAgICAgICBTa2lsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJc1NraWxsU3RhdGUoZmFsc2UpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==