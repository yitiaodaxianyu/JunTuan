
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcR2FtZVxcU2hlU2hvdVxcU2hlU2hvdS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxnREFBc0Q7QUFDdEQsaUVBQTREO0FBQzVELHVFQUFvRjtBQUNwRiwyREFBc0Q7QUFFdEQsb0RBQStDO0FBQy9DLG9EQUErQztBQUMvQyw0REFBNEQ7QUFDNUQsa0VBQTZEO0FBQzdELGdFQUEyRDtBQUMzRCxnREFBMkM7QUFHM0MsZ0NBQTJCO0FBQzNCLDRDQUEySDtBQUMzSCxxQ0FBZ0M7QUFHMUIsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBcUMsMkJBQUk7SUFBekM7UUFBQSxxRUFzU0M7UUFwU0csZ0JBQVUsR0FBUSxDQUFDLENBQUM7UUFDcEIsaUJBQVcsR0FBUSxDQUFDLENBQUM7O0lBbVN6QixDQUFDO0lBbFNELCtGQUErRjtJQUMzRix3QkFBTSxHQUFOO1FBRUksaUJBQU0sTUFBTSxXQUFFLENBQUM7UUFDZixTQUFTO1FBQ1QsaUJBQU0scUJBQXFCLFlBQUMsaUNBQVksQ0FBQyxtQkFBbUIsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUNoRSxpQkFBTSxxQkFBcUIsWUFBQyxpQ0FBWSxDQUFDLHFCQUFxQixFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xFLGlCQUFNLHFCQUFxQixZQUFDLGlDQUFZLENBQUMsdUJBQXVCLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEUsaUJBQU0scUJBQXFCLFlBQUMsaUNBQVksQ0FBQyx1QkFBdUIsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUNwRSxpQkFBTSxxQkFBcUIsWUFBQyxpQ0FBWSxDQUFDLDZCQUE2QixFQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzNFLGlCQUFNLHFCQUFxQixZQUFDLGlDQUFZLENBQUMsNkJBQTZCLEVBQUMsRUFB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LElBQUksU0FBUyxHQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsaUJBQU8sQ0FBQyxDQUFDO29CQUNoRCxTQUFTLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUNwQzthQUNKO1FBQ0wsQ0FBQyxFQUFDLENBQUMsR0FBQyxTQUFTLEVBQUMsU0FBUyxHQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNCLHNCQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFyU2dCLE9BQU87UUFEM0IsT0FBTztPQUNhLE9BQU8sQ0FzUzNCO0lBQUQsY0FBQztDQXRTRCxBQXNTQyxDQXRTb0MsY0FBSSxHQXNTeEM7a0JBdFNvQixPQUFPIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7IEdhbWVTdGF0ZSwgSmlhU3UgfSBmcm9tIFwiLi4vLi4vLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBGaWdodGluZ01hbmFnZXIgZnJvbSBcIi4uLy4uLy4uL0dhbWUvRmlnaHRpbmdNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEdhbWVFZmZlY3RJZCwgR2FtZUVmZmVjdHNNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uLy4uL0dhbWUvR2FtZUVmZmVjdHNNYW5hZ2VyXCI7XHJcbmltcG9ydCBTa2lsbE1hbmFnZXIgZnJvbSBcIi4uLy4uLy4uL0dhbWUvU2tpbGxNYW5hZ2VyXCI7XHJcbmltcG9ydCBTa3lNYW5hZ2VyIGZyb20gXCIuLi8uLi8uLi9HYW1lL1NreU1hbmFnZXJcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi8uLi8uLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgTW9uc3RlciBmcm9tIFwiLi4vLi4vLi4vTW9uc3Rlci9Nb25zdGVyXCI7XHJcbmltcG9ydCB7IEtleUZyYW1lRGF0YSB9IGZyb20gXCIuLi8uLi8uLi9Nb25zdGVyL01vbnN0ZXJEYXRhXCI7XHJcbmltcG9ydCBNb25zdGVyTWFuYWdlciBmcm9tIFwiLi4vLi4vLi4vTW9uc3Rlci9Nb25zdGVyTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTb3VuZEluZGV4IH0gZnJvbSBcIi4uLy4uLy4uL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBNeVRvb2wgZnJvbSBcIi4uLy4uLy4uL1Rvb2xzL015VG9vbFwiO1xyXG5pbXBvcnQgeyBHb25nSmlEYXRhIH0gZnJvbSBcIi4uLy4uL0RhdGEvSGVyb0RhdGFcIjtcclxuaW1wb3J0IHsgQnVmZkRhdGEgfSBmcm9tIFwiLi4vQnVmZkRhdGFcIjtcclxuaW1wb3J0IEhlcm8gZnJvbSBcIi4uL0hlcm9cIjtcclxuaW1wb3J0IHsgQnVmZklkLCBCdWZmVHlwZSwgRGFtYWdlVHlwZSwgR29uZ0ppX0ZhbmdYaWFuZywgSGVyb19TdGF0ZSwgIFNraWxsSW5kaWNhdG9yVHlwZSwgU2tpbGxUeXBlIH0gZnJvbSBcIi4uL0hlcm9Db25maWdcIjtcclxuaW1wb3J0IEppYW5TaGkgZnJvbSBcIi4vSmlhblNoaVwiO1xyXG5pbXBvcnQgSmlhblNoaUNyaXQgZnJvbSBcIi4vSmlhblNoaUNyaXRcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hlU2hvdSBleHRlbmRzIEhlcm8ge1xyXG4gICAgXHJcbiAgICBqaWFueXVfbnVtOm51bWJlcj0wO1xyXG4gICAgdGVzdF9mZW56aGk6bnVtYmVyPTE7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t5Yqg6L29LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgb25Mb2FkKClcclxuICAgIHtcclxuICAgICAgICBzdXBlci5vbkxvYWQoKTtcclxuICAgICAgICAvL+WKoOi9veaKgOiDveaMh+ekuuWZqFxyXG4gICAgICAgIHN1cGVyLmFkZExvYWRCeUdhbWVFZmZlY3RJZChHYW1lRWZmZWN0SWQuc2hlc2hvdV9qaWFuc2hpX2F0dCw4KTtcclxuICAgICAgICBzdXBlci5hZGRMb2FkQnlHYW1lRWZmZWN0SWQoR2FtZUVmZmVjdElkLnNoZXNob3VfamlhbnNoaV9za2lsbCw4KTtcclxuICAgICAgICBzdXBlci5hZGRMb2FkQnlHYW1lRWZmZWN0SWQoR2FtZUVmZmVjdElkLnNoZXNob3VfamlhbnNoaV9hdHRfaGl0LDgpO1xyXG4gICAgICAgIHN1cGVyLmFkZExvYWRCeUdhbWVFZmZlY3RJZChHYW1lRWZmZWN0SWQuc2hlc2hvdV9hdHRhY2tfY3RybF9oaXQsMik7XHJcbiAgICAgICAgc3VwZXIuYWRkTG9hZEJ5R2FtZUVmZmVjdElkKEdhbWVFZmZlY3RJZC5zaGVzaG91X2ppYW5zaGlfc3VwZXJfc2tpbGxfMSwxNik7XHJcbiAgICAgICAgc3VwZXIuYWRkTG9hZEJ5R2FtZUVmZmVjdElkKEdhbWVFZmZlY3RJZC5zaGVzaG91X2ppYW5zaGlfc3VwZXJfc2tpbGxfMiwxNik7XHJcbiAgICAgICAgc3VwZXIuYWRkTG9hZEJ5R2FtZUVmZmVjdElkKEdhbWVFZmZlY3RJZC5zaGVzaG91X2ppYW5zaGlfc3VwZXJfc2tpbGxfMywxNik7IFxyXG4gICAgICAgIHRoaXMuaXNfTG9hZExvYWQ9dHJ1ZTsgXHJcbiAgICAgICAgdGhpcy5hZGRTa2lsbExpc3Rlbih0aGlzLnVzZVNraWxsKTtcclxuICAgICAgICB0aGlzLmFkZEF0dGFja0xpc3Rlbih0aGlzLm5vcm1hbEF0dGFjayk7XHJcbiAgICAgICAgdGhpcy5hZGRYdWFuWXVuTGlzdGVuKHRoaXMub25YdWFuWXVuUmVzdWx0KTtcclxuICAgICAgICB0aGlzLmFkZEhpdExpc3Rlbih0aGlzLm9uSGl0TW9uc3Rlcik7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnQoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyLnN0YXJ0KCk7XHJcbiAgICAgICAgdGhpcy5pc19uZWVkX2NoZWNrX2Rpc3RhbmNlPXRydWU7XHJcbiAgICAgICAgbGV0IHpoaWppbmc9dGhpcy5oZXJvX2RhdGEuZ2V0U2tpbGxWYWx1ZTEoU2tpbGxUeXBlLkFjdGl2ZSkqMjtcclxuICAgICAgICBzdXBlci5zZXRTa2lsbFRpcFNpemUoemhpamluZyx6aGlqaW5nKTtcclxuICAgIH1cclxuXHJcbiAgICBvblh1YW5ZdW5SZXN1bHQoaXNYdWFuWXVuOmJvb2xlYW4pe1xyXG4gICAgICAgIGlmKGlzWHVhbll1bil7XHJcbiAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAvL+agueaNruS4iuS4queKtuaAgeWIpOaWremcgOimgeWBmuS7gOS5iFxyXG4gICAgICAgICAgICB0aGlzLnNldEhlcm9TdGF0ZShIZXJvX1N0YXRlLmlkbGUsR29uZ0ppX0ZhbmdYaWFuZy56aG9uZyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0ZUlkbGUoKXtcclxuICAgICAgICB0aGlzLnNldEhlcm9TdGF0ZShIZXJvX1N0YXRlLmlkbGUsdGhpcy5jdXJfZmFuZ3hpYW5nKTtcclxuICAgIH1cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLeaUu+WHuy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8qKuaatOWHu+aXtuS6p+eUnzEwMCoyMDDplKXlvaLojIPlm7TnmoTmuoXlsITmlYjmnpzvvIzlj5fmlLvlh7vnmoTmlYzkurrlkozooqvmuoXlsITnmoTkurrpop3lpJblj5fliLB75Y+C5pWwMX0l5Lyk5a6zICovXHJcbiAgICBvbkhpdE1vbnN0ZXIoZGFtYWdlVHlwZTpEYW1hZ2VUeXBlLGlzQ3JpdDpib29sZWFuLG1vbnN0ZXI6Y2MuTm9kZSl7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUppYW5TaGkoaWQ6R2FtZUVmZmVjdElkLGppYW5zaGlQb3M6Y2MuVmVjMixzcGVlZDpudW1iZXIsZGlyOm51bWJlcixnakRhdGE6R29uZ0ppRGF0YSk6Y2MuTm9kZXtcclxuICAgICAgICBsZXQgbm9kZT1GaWdodGluZ01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChpZCxqaWFuc2hpUG9zKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChKaWFuU2hpKS5pbml0KGlkLHNwZWVkLGRpcixnakRhdGEpO1xyXG4gICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgfVxyXG4gICAgLy/ojrflj5blsITlh7vmlrnlkJFcclxuICAgIGdldFNKRlhCeVBvcyhwb3M6Y2MuVmVjMixzZWxmUG9zOmNjLlZlYzIpOkdvbmdKaV9GYW5nWGlhbmdcclxuICAgIHtcclxuICAgICAgICAvL+WvueaVjOS6uuWNleS9jei/m+ihjOaWueWQkeWIpOaWre+8jOehruWumuaJk+WHu+aWueWQkVxyXG4gICAgICAgIGxldCBmYW5neGlhbmc9R29uZ0ppX0ZhbmdYaWFuZy56aG9uZztcclxuICAgICAgICBsZXQgb2Zmc2V0UG9zPXBvcy5zdWIoc2VsZlBvcyk7XHJcbiAgICAgICAgbGV0IHBpMj1NYXRoLlBJKjI7XHJcbiAgICAgICAgbGV0IHJhZGlhbj0oTWF0aC5hdGFuMihvZmZzZXRQb3MueSxvZmZzZXRQb3MueCkrcGkyKSVwaTI7XHJcbiAgICAgICAgbGV0IGFuZ2xlPTE4MCpyYWRpYW4vTWF0aC5QSTtcclxuICAgICAgICBpZihhbmdsZTw9NzUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmYW5neGlhbmc9R29uZ0ppX0ZhbmdYaWFuZy55b3U7XHJcbiAgICAgICAgfWVsc2UgaWYoYW5nbGU+NzUgJiYgYW5nbGU8MTA1KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmFuZ3hpYW5nPUdvbmdKaV9GYW5nWGlhbmcuemhvbmc7XHJcbiAgICAgICAgfWVsc2UgaWYoYW5nbGU+PTEwNSAmJiBhbmdsZTw9MTgwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmFuZ3hpYW5nPUdvbmdKaV9GYW5nWGlhbmcuenVvO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFuZ3hpYW5nO1xyXG4gICAgfVxyXG4gICAgLyoq5q+P5qyh5pmu6YCa5pS75Ye75pyJe+WPguaVsDF9JeWHoOeOh+aUueS4uuWwhOWHuuS4gOazoueurembqO+8jOeurembqOWQq3vlj4LmlbAyfeaUr+eure+8jOavj+aUr+euremAoOaIkHvlj4LmlbAzfSXkvKTlrrMgKi9cclxuICAgIG5vcm1hbEF0dGFjayhtb25zdGVyOmNjLk5vZGUpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zdGF0ZSE9R2FtZVN0YXRlLkdhbWVfUGxheWluZylcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgICAgbGV0IGVuZW15UG9zPW1vbnN0ZXIuZ2V0Q29tcG9uZW50KE1vbnN0ZXIpLmdldFNoZVNob3VQb3MoKTtcclxuICAgICAgICBpZih0aGlzLmNoZWNrU2tpbGwxKGVuZW15UG9zKT09ZmFsc2Upe1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0QXR0YWNrKG1vbnN0ZXIpO1xyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0QXR0YWNrKGVuZW15Tm9kZTpjYy5Ob2RlKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuaXNfY2FuX2dvbmdqaT1mYWxzZTtcclxuICAgICAgICBsZXQgZmFuZ3hpYW5nPXRoaXMuZ2V0U0pGWEJ5UG9zKGVuZW15Tm9kZS5nZXRQb3NpdGlvbigpLHRoaXMubm9kZS5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICBsZXQgZGF0YT1uZXcgS2V5RnJhbWVEYXRhKCk7XHJcbiAgICAgICAgZGF0YS5uYW1lPVwiQXR0YWNrXCI7XHJcbiAgICAgICAgZGF0YS5jYWxsYmFjaz0oKT0+eyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL+ato+S4reW/gyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgZW5lbXlQb3M9ZW5lbXlOb2RlLmdldENvbXBvbmVudChNb25zdGVyKS5nZXRTaGVTaG91UG9zKCk7XHJcbiAgICAgICAgICAgIGxldCBqaWFuc2hpUG9zPXRoaXMuZ2V0Q3JlYXRlQnVsbGV0UG9zKCk7XHJcbiAgICAgICAgICAgIGxldCBvZmZzZXRQb3M9ZW5lbXlQb3Muc3ViKGppYW5zaGlQb3MpO1xyXG4gICAgICAgICAgICBsZXQgamlhbnNoaURpcj1NYXRoLmF0YW4yKG9mZnNldFBvcy55LG9mZnNldFBvcy54KTtcclxuICAgICAgICAgICAgbGV0IGdqRGF0YT1zdXBlci5nZXRHb25nSmlEYXRhKERhbWFnZVR5cGUuTm9ybWFsLHRydWUsU2tpbGxUeXBlLk51bGwpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUppYW5TaGkoR2FtZUVmZmVjdElkLnNoZXNob3VfamlhbnNoaV9hdHQsamlhbnNoaVBvcyx0aGlzLmJ1bGxldF9zcGVlZCxqaWFuc2hpRGlyLGdqRGF0YSk7XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5ZWF9Hb25namlhbnNob3VBdHRhY2spO1xyXG4gICAgICAgICAgICBpZih0aGlzLmlzX2RvdWJsZV9hdHRhY2spe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXNldE5vcm1hbEF0dGFjaygpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ29uZ2ppX2ppc2h1PTA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgc3VwZXIuc2V0SGVyb1N0YXRlKEhlcm9fU3RhdGUuYXR0YWNrLGZhbmd4aWFuZyxbZGF0YV0sKCk9PnsgICAgICAgICAgICBcclxuICAgICAgICAgICAgc3VwZXIuc2V0SGVyb1N0YXRlKEhlcm9fU3RhdGUuaWRsZSxmYW5neGlhbmcpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgLyoq6KKr5Yqo5oqA6IO9MeinpuWPkeWIpOaWrS3mr4/mrKHmma7pgJrmlLvlh7vmnIl75Y+C5pWwMX0l5Yeg546H5pS55Li65bCE5Ye65LiA5rOi566t6Zuo77yM566t6Zuo5ZCre+WPguaVsDJ95pSv566t77yM5q+P5pSv566t6YCg5oiQe+WPguaVsDN9JeS8pOWusyAqL1xyXG4gICAgY2hlY2tTa2lsbDEocG9zOmNjLlZlYzIpOmJvb2xlYW57XHJcbiAgICAgICAgLy/mpoLnjodcclxuICAgICAgICBsZXQgcmF0ZT10aGlzLmhlcm9fZGF0YS5nZXRTa2lsbFZhbHVlMShTa2lsbFR5cGUuUGFzc2l2ZV8xKTtcclxuICAgICAgICBpZih0aGlzLmppYW55dV9udW0+MCl7XHJcbiAgICAgICAgICAgIHJhdGU9MTtcclxuICAgICAgICAgICAgdGhpcy5qaWFueXVfbnVtLS07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHJhdGUmJk1hdGgucmFuZG9tKCk8cmF0ZSl7XHJcbiAgICAgICAgICAgIHRoaXMuaXNfY2FuX2dvbmdqaT1mYWxzZTsgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgZGF0YT1uZXcgS2V5RnJhbWVEYXRhKCk7XHJcbiAgICAgICAgICAgIGRhdGEubmFtZT1cIkF0dGFja1wiO1xyXG4gICAgICAgICAgICBkYXRhLmNhbGxiYWNrPSgpPT57XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdvbmdqaV9qaXNodT0wOyBcclxuICAgICAgICAgICAgICAgIGxldCBqaWFuc2hpUG9zPXN1cGVyLmdldENyZWF0ZUJ1bGxldFBvcygpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG9mZnNldFBvcz1wb3Muc3ViKGppYW5zaGlQb3MpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHBpMj1NYXRoLlBJKjI7XHJcbiAgICAgICAgICAgICAgICAvL+S4reW/g+aWueWQkVxyXG4gICAgICAgICAgICAgICAgbGV0IHJhZGlhbj0oTWF0aC5hdGFuMihvZmZzZXRQb3MueSxvZmZzZXRQb3MueCkrcGkyKSVwaTI7XHJcbiAgICAgICAgICAgICAgICAvL2xldCBhbmdsZT1NeVRvb2wucmFkaWFuVG9BbmdsZShyYWRpYW4pO1xyXG4gICAgICAgICAgICAgICAgLy/lvKflvaLojIPlm7Qs5pyA5aSnMzDCsO+8jOmXtOmalDPCsFxyXG4gICAgICAgICAgICAgICAgbGV0IGh1ZHVGYW5XZWk9TWF0aC5QSS82MDtcclxuICAgICAgICAgICAgICAgIGxldCBhbGxOdW09dGhpcy5oZXJvX2RhdGEuZ2V0U2tpbGxWYWx1ZTIoU2tpbGxUeXBlLlBhc3NpdmVfMSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgd2F2ZU51bT1NYXRoLmZsb29yKGFsbE51bS8xMCkrMTtcclxuICAgICAgICAgICAgICAgIGlmKGFsbE51bSUxMD09MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgd2F2ZU51bS0tO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy/msYLlubPlnYfmlbDvvIznrKzkuIDms6LmnIDlpJpcclxuICAgICAgICAgICAgICAgIGxldCBhdmVyYWdlPU1hdGguZmxvb3IoYWxsTnVtL3dhdmVOdW0pO1xyXG4gICAgICAgICAgICAgICAgLy/nrKzkuIDms6LmlbDph49cclxuICAgICAgICAgICAgICAgIGxldCBmaXJzdE51bT1hdmVyYWdlK2FsbE51bSV3YXZlTnVtO1xyXG4gICAgICAgICAgICAgICAgbGV0IGdqRGF0YT1zdXBlci5nZXRHb25nSmlEYXRhKERhbWFnZVR5cGUuU2tpbGwsdHJ1ZSxTa2lsbFR5cGUuUGFzc2l2ZV8xLHRoaXMuaGVyb19kYXRhLmdldFNraWxsVmFsdWUzKFNraWxsVHlwZS5QYXNzaXZlXzEpKTtcclxuICAgICAgICAgICAgICAgIGxldCBqaWFuZ2U9MC4yO1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8d2F2ZU51bTsgaSsrKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBudW09aT09MD9maXJzdE51bTphdmVyYWdlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBuPTA7IG48bnVtOyBuKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBqaWFuc2hpRGlyPXJhZGlhbisobi1udW0vMikqaHVkdUZhbldlaTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlSmlhblNoaShHYW1lRWZmZWN0SWQuc2hlc2hvdV9qaWFuc2hpX3NraWxsLGppYW5zaGlQb3MsdGhpcy5idWxsZXRfc3BlZWQsamlhbnNoaURpcixnakRhdGEpOyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9LGppYW5nZSooaSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LllYX0dvbmdqaWFuc2hvdVNraWxsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzdXBlci5zZXRIZXJvU3RhdGUoSGVyb19TdGF0ZS5hdHRhY2ssR29uZ0ppX0ZhbmdYaWFuZy56aG9uZyxbZGF0YV0sKCk9PntcclxuICAgICAgICAgICAgICAgIHN1cGVyLnNldEhlcm9TdGF0ZShIZXJvX1N0YXRlLmlkbGUsR29uZ0ppX0ZhbmdYaWFuZy56aG9uZyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHVzZVNraWxsKHBvczpjYy5WZWMyKTpudW1iZXJcclxuICAgIHsgICAgICAgIFxyXG4gICAgICAgIFNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlbGVhc2VTa2lsbCgoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0U2VsZlh1TGkocG9zKTtcclxuICAgICAgICB9LHRoaXMubm9kZSk7XHJcbiAgICAgICAgcmV0dXJuIDI7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRTZWxmWHVMaShwb3M6Y2MuVmVjMil7XHJcbiAgICAgICAgLy/ok4TlipvluKfnm5HlkKxcclxuICAgICAgICBsZXQgaGVyb1Jvb3Q9Y2MuZmluZCgnQ2FudmFzL0hlcm9fUm9vdCcpO1xyXG4gICAgICAgIC8vIGxldCB4dWxpRGF0YT1uZXcgS2V5RnJhbWVEYXRhKCk7XHJcbiAgICAgICAgLy8geHVsaURhdGEubmFtZT0nWHVMaSc7XHJcbiAgICAgICAgLy8geHVsaURhdGEuY2FsbGJhY2s9KCk9PntcclxuICAgICAgICAvLyAgICAgLy/liJvlu7roi7Hpm4TnmoTok4TlipvliqjnlLvnibnmlYjjgIJcclxuICAgICAgICAvLyAgICAgbGV0IGFzc2VtYmxlPVNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5zaGVzaG91X2ppYW5zaGlfc3VwZXJfc2tpbGxfMSxzdXBlci5nZXRDcmVhdGVCdWxsZXRQb3MoKS5hZGQoY2MudjIoMCw1MCkpKTtcclxuICAgICAgICAvLyAgICAgYXNzZW1ibGUuc2NhbGU9MTtcclxuICAgICAgICAvLyAgICAgYXNzZW1ibGUub3BhY2l0eT0yNTU7XHJcbiAgICAgICAgLy8gICAgIGxldCB4dWVsaVNwaW5lPWFzc2VtYmxlLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbik7XHJcbiAgICAgICAgLy8gICAgIHh1ZWxpU3BpbmUudGltZVNjYWxlPUppYVN1O1xyXG4gICAgICAgIC8vICAgICB4dWVsaVNwaW5lLnNldEFuaW1hdGlvbigwLCdTa2lsbF9YdUxpJyxmYWxzZSk7XHJcbiAgICAgICAgLy8gICAgIC8v55uR5ZCs6JOE5Yqb5Yqo5L2c5a6M5oiQXHJcbiAgICAgICAgLy8gICAgIHh1ZWxpU3BpbmUuc2V0Q29tcGxldGVMaXN0ZW5lcigoKT0+e1xyXG4gICAgICAgIC8vICAgICAgICAgeHVlbGlTcGluZS5zZXRDb21wbGV0ZUxpc3RlbmVyKG51bGwpO1xyXG4gICAgICAgIC8vICAgICAgICAgLy/ok4TlipvlrozmiJDvvIzlj5HlsITnmb3lhYlcclxuICAgICAgICAvLyAgICAgICAgIFNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldFRpbWVTdG9wKGZhbHNlKTtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMubm9kZS5wYXJlbnQ9aGVyb1Jvb3Q7XHJcbiAgICAgICAgLy8gICAgICAgICBsZXQgYW5pbWE9eHVlbGlTcGluZS5zZXRBbmltYXRpb24oMCwnU2tpbGxfRmFTaGUnLGZhbHNlKTtcclxuICAgICAgICAvLyAgICAgICAgIHh1ZWxpU3BpbmUudGltZVNjYWxlPTE7XHJcbiAgICAgICAgLy8gICAgICAgICAvL+iThOWKm+WujOaIkO+8jOebkeWQrOeZveWFieW4p1xyXG4gICAgICAgIC8vICAgICAgICAgeHVlbGlTcGluZS5zZXRUcmFja0V2ZW50TGlzdGVuZXIoYW5pbWEsKGVudHJ5OiBzcC5zcGluZS5UcmFja0VudHJ5LCBldmVudCk9PntcclxuICAgICAgICAvLyAgICAgICAgICAgICBpZihldmVudC5kYXRhLm5hbWU9PSdCYWknKXtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc3RhcnRCYWlQaW5nKCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICAgfSlcclxuICAgICAgICAvLyAgICAgfSlcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy/lj5HlsITluKfnm5HlkKxcclxuICAgICAgICBsZXQgZmFzaGVEYXRhPW5ldyBLZXlGcmFtZURhdGEoKTtcclxuICAgICAgICBmYXNoZURhdGEubmFtZT1cIkZhU2hlXCI7XHJcbiAgICAgICAgZmFzaGVEYXRhLmNhbGxiYWNrPSgpPT57XHJcbiAgICAgICAgICAgIC8v5Y+v5Lul5Y+R5bCEXHJcbiAgICAgICAgICAgIFNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldFRpbWVTdG9wKGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnBhcmVudD1oZXJvUm9vdDtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnpJbmRleD0yO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0TGF1bmNoKHBvcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v6Iux6ZuE5Yqo5L2c5pKt5pS+XHJcbiAgICAgICAgdGhpcy5zZXRIZXJvU3RhdGUoSGVyb19TdGF0ZS5za2lsbCxHb25nSmlfRmFuZ1hpYW5nLnpob25nLFtmYXNoZURhdGFdLCgpPT57XHJcbiAgICAgICAgICAgIC8v5Yqo5L2c5a6M5q+V5ZCO54q25oCB6L+Y5piv5oqA6IO954q25oCB77yM5Yqo55S76KaB5pKt5pS+5b6F5py655qEXHJcbiAgICAgICAgICAgIHRoaXMucmVzZXRHb25nSmlKaVNodSgpO1xyXG4gICAgICAgICAgICB0aGlzLnNldEhlcm9TdGF0ZShIZXJvX1N0YXRlLmlkbGUsR29uZ0ppX0ZhbmdYaWFuZy56aG9uZyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5zcGluZS50aW1lU2NhbGU9SmlhU3U7XHJcbiAgICB9XHJcbiAgICAvKirok4TlipvlkI7lj5HlsITkuIDms6Lnrq3pm6jvvIzlr7nljYrlvoR75Y+C5pWwMX3ojIPlm7TlhoXnmoTmlYzkurrlnKgz56eS5YaF6YCg5oiQMTXmrKF75Y+C5pWwMn0l5Lyk5a6zICovXHJcbiAgICBzdGFydExhdW5jaChwb3M6Y2MuVmVjMil7XHJcbiAgICAgICAgc3VwZXIuc2V0QXR0U3BpbmVTY2FsZSgpO1xyXG4gICAgICAgIHRoaXMucmVzZXRHb25nSmlKaVNodSgpO1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5ZWF9Hb25namlhbnNob3VTa2lsbCk7XHJcbiAgICAgICAgbGV0IGdqRGF0YT1zdXBlci5nZXRHb25nSmlEYXRhKERhbWFnZVR5cGUuU2tpbGwsZmFsc2UsU2tpbGxUeXBlLkFjdGl2ZSx0aGlzLmhlcm9fZGF0YS5nZXRTa2lsbFZhbHVlMihTa2lsbFR5cGUuQWN0aXZlKSk7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIGxldCBwaTI9TWF0aC5QSSoyO1xyXG4gICAgICAgIGxldCByYWRpdXM9dGhpcy5oZXJvX2RhdGEuZ2V0U2tpbGxWYWx1ZTEoU2tpbGxUeXBlLkFjdGl2ZSk7XHJcbiAgICAgICAgbGV0IGNyZWF0ZUppYW5TaGk9KCk9PntcclxuICAgICAgICAgICAgLy/ljYrlvoTpmo/mnLpcclxuICAgICAgICAgICAgbGV0IHI9TWF0aC5yYW5kb20oKSpyYWRpdXM7XHJcbiAgICAgICAgICAgIC8v5byn5bqm6ZqP5py6XHJcbiAgICAgICAgICAgIGxldCBodWR1PU1hdGgucmFuZG9tKCkqcGkyO1xyXG4gICAgICAgICAgICAvL+axgueCuVxyXG4gICAgICAgICAgICBsZXQgcG9zWD1wb3MueCtNYXRoLmNvcyhodWR1KSpyO1xyXG4gICAgICAgICAgICBsZXQgcG9zWT1wb3MueStNYXRoLnNpbihodWR1KSpyOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IHN0YXJ0UG9zPWNjLnYyKHBvc1grTWF0aC5yYW5kb20oKSpyYWRpdXMqMi1yYWRpdXMsMTI4MCtwb3NZKTtcclxuICAgICAgICAgICAgbGV0IGVuZFBvcz1jYy52Mihwb3NYLHBvc1kpO1xyXG4gICAgICAgICAgICBsZXQgb2Zmc2V0UG9zPWVuZFBvcy5zdWIoc3RhcnRQb3MpO1xyXG4gICAgICAgICAgICBsZXQgYW5nbGU9TXlUb29sLnJhZGlhblRvQW5nbGUoTWF0aC5hdGFuMihvZmZzZXRQb3MueSxvZmZzZXRQb3MueCkpKzkwO1xyXG4gICAgICAgICAgICBsZXQgamlhbnNoaT1HYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQuc2hlc2hvdV9qaWFuc2hpX3N1cGVyX3NraWxsXzIsc3RhcnRQb3MpO1xyXG4gICAgICAgICAgICBqaWFuc2hpLnNjYWxlPTI7XHJcbiAgICAgICAgICAgIGppYW5zaGkuYW5nbGU9YW5nbGU7XHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKGppYW5zaGkpLnRvKE1hdGgucmFuZG9tKCkqMC4zKzAuMix7eDplbmRQb3MueCx5OmVuZFBvcy55LHNjYWxlOjAuM30pLmNhbGwoKG5vZGU6Y2MuTm9kZSk9PntcclxuICAgICAgICAgICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmRlc3Ryb3lHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQuc2hlc2hvdV9qaWFuc2hpX3N1cGVyX3NraWxsXzIsamlhbnNoaSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgamlhbnRvdT1HYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQuc2hlc2hvdV9qaWFuc2hpX3N1cGVyX3NraWxsXzMsbm9kZS5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICAgICAgICAgIGppYW50b3Uub3BhY2l0eT0yNTU7XHJcbiAgICAgICAgICAgICAgICBqaWFudG91LmFuZ2xlPWFuZ2xlO1xyXG4gICAgICAgICAgICAgICAgbGV0IGhpdD1HYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQuc2hlc2hvdV9qaWFuc2hpX3N1cGVyX3NraWxsXzEsbm9kZS5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICAgICAgICAgIGhpdC5vcGFjaXR5PTI1NTtcclxuICAgICAgICAgICAgICAgIGhpdC5zY2FsZT0wLjQ7XHJcbiAgICAgICAgICAgICAgICBsZXQgaGl0U3BpbmU9aGl0LmdldENvbXBvbmVudChzcC5Ta2VsZXRvbik7XHJcbiAgICAgICAgICAgICAgICBoaXRTcGluZS5zZXRBbmltYXRpb24oMCwnU2tpbGxfSGl0JyxmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBjYy50d2VlbihoaXQpLmRlbGF5KDAuOSkudG8oMC41LHtvcGFjaXR5OjB9KS5jYWxsKCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZGVzdHJveUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5zaGVzaG91X2ppYW5zaGlfc3VwZXJfc2tpbGxfMSxoaXQpOyAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgICAgIGNjLnR3ZWVuKGppYW50b3UpLmJ5KDAuMSx7YW5nbGU6TWF0aC5yYW5kb20oKSoxMH0pLmJ5KDAuMSx7YW5nbGU6LShNYXRoLnJhbmRvbSgpKjEwKX0pLmJ5KDAuMSx7YW5nbGU6TWF0aC5yYW5kb20oKSoxMH0pLmJ5KDAuMSx7YW5nbGU6LShNYXRoLnJhbmRvbSgpKjEwKX0pLmRlbGF5KDAuNSkudG8oMC41LHtvcGFjaXR5OjB9KS5jYWxsKCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZGVzdHJveUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5zaGVzaG91X2ppYW5zaGlfc3VwZXJfc2tpbGxfMyxqaWFudG91KTtcclxuICAgICAgICAgICAgfSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgfSkuc3RhcnQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGV4TnVtPTA7XHJcbiAgICAgICAgbGV0IGV4MT10aGlzLmhlcm9fZGF0YS5FeGNsdXNpdmVXZWFwb25Ta2lsbFZhbHVlXzE7XHJcbiAgICAgICAgaWYoZXgxJiZleDE+MCl7XHJcbiAgICAgICAgICAgIGV4TnVtPWV4MTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHRvdGFsTnVtPTYwK2V4TnVtKjQ7XHJcbiAgICAgICAgLy/liJvlu7rlj5HlsITnmoTnrq3nn6JcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTwodG90YWxOdW0pOyBpKyspe1xyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICAgICAgY3JlYXRlSmlhblNoaSgpO1xyXG4gICAgICAgICAgICB9LE1hdGgucmFuZG9tKCkqMyk7XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgICAgICAgICBjcmVhdGVKaWFuU2hpKCk7XHJcbiAgICAgICAgICAgIH0saSozLyh0b3RhbE51bSkpO1xyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgICAgIGxldCBudW09MDtcclxuICAgICAgICBsZXQgZGFtYWdlTnVtPTE1K2V4TnVtO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGUoKCk9PntcclxuICAgICAgICAgICAgaWYobnVtPT0wKXtcclxuICAgICAgICAgICAgICAgIE15VG9vbC5yYW5kb21TY2VuZVNoYWtlKC01LDUsMC4wMiw2KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBudW0rKzsvL2NjLmxvZyhudW0pO1xyXG4gICAgICAgICAgICBsZXQgbW9uc3RlcnM9TW9uc3Rlck1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNb25zdGVyc0ZvckNlbnRlclBvcygtMSxwb3MscmFkaXVzKTtcclxuICAgICAgICAgICAgaWYobW9uc3RlcnMpe1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8bW9uc3RlcnMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBtb25zdGVyVHM9bW9uc3RlcnNbaV0uZ2V0Q29tcG9uZW50KE1vbnN0ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIG1vbnN0ZXJUcy5iZUZsYXNoSW5qdXJlZChnakRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwzL2RhbWFnZU51bSxkYW1hZ2VOdW0tMSk7XHJcbiAgICAgICAgU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXNTa2lsbFN0YXRlKGZhbHNlKTtcclxuICAgIH1cclxufVxyXG4iXX0=