
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
        // let enemyPos=monster.getComponent(Monster).getSheShouPos();
        // if(this.checkSkill1(enemyPos)==false){
        //     this.startAttack(monster);
        // } 
        this.checkSkill1();
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
        if (pos === void 0) { pos = null; }
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
                var offsetPos = cc.v2(0, 10);
                ;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcR2FtZVxcU2hlU2hvdVxcU2hlU2hvdS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxnREFBc0Q7QUFDdEQsaUVBQTREO0FBQzVELHVFQUFvRjtBQUNwRiwyREFBc0Q7QUFFdEQsb0RBQStDO0FBQy9DLG9EQUErQztBQUMvQyw0REFBNEQ7QUFDNUQsa0VBQTZEO0FBQzdELGdFQUEyRDtBQUMzRCxnREFBMkM7QUFHM0MsZ0NBQTJCO0FBQzNCLDRDQUEySDtBQUMzSCxxQ0FBZ0M7QUFHMUIsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBcUMsMkJBQUk7SUFBekM7UUFBQSxxRUF1U0M7UUFyU0csZ0JBQVUsR0FBUSxDQUFDLENBQUM7UUFDcEIsaUJBQVcsR0FBUSxDQUFDLENBQUM7O0lBb1N6QixDQUFDO0lBblNELCtGQUErRjtJQUMzRix3QkFBTSxHQUFOO1FBRUksaUJBQU0sTUFBTSxXQUFFLENBQUM7UUFDZixTQUFTO1FBQ1QsaUJBQU0scUJBQXFCLFlBQUMsaUNBQVksQ0FBQyxtQkFBbUIsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUNoRSxpQkFBTSxxQkFBcUIsWUFBQyxpQ0FBWSxDQUFDLHFCQUFxQixFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xFLGlCQUFNLHFCQUFxQixZQUFDLGlDQUFZLENBQUMsdUJBQXVCLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEUsaUJBQU0scUJBQXFCLFlBQUMsaUNBQVksQ0FBQyx1QkFBdUIsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUNwRSxpQkFBTSxxQkFBcUIsWUFBQyxpQ0FBWSxDQUFDLDZCQUE2QixFQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzNFLGlCQUFNLHFCQUFxQixZQUFDLGlDQUFZLENBQUMsNkJBQTZCLEVBQUMsRUFB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QyxDQUFDLENBQUMsWUFBWSxDQUFDLGlCQUFPLENBQUMsQ0FBQztvQkFDaEQsU0FBUyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDcEM7YUFDSjtRQUNMLENBQUMsRUFBQyxDQUFDLEdBQUMsU0FBUyxFQUFDLFNBQVMsR0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzQixzQkFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBdFNnQixPQUFPO1FBRDNCLE9BQU87T0FDYSxPQUFPLENBdVMzQjtJQUFELGNBQUM7Q0F2U0QsQUF1U0MsQ0F2U29DLGNBQUksR0F1U3hDO2tCQXZTb0IsT0FBTyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgeyBHYW1lU3RhdGUsIEppYVN1IH0gZnJvbSBcIi4uLy4uLy4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgRmlnaHRpbmdNYW5hZ2VyIGZyb20gXCIuLi8uLi8uLi9HYW1lL0ZpZ2h0aW5nTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBHYW1lRWZmZWN0SWQsIEdhbWVFZmZlY3RzTWFuYWdlciB9IGZyb20gXCIuLi8uLi8uLi9HYW1lL0dhbWVFZmZlY3RzTWFuYWdlclwiO1xyXG5pbXBvcnQgU2tpbGxNYW5hZ2VyIGZyb20gXCIuLi8uLi8uLi9HYW1lL1NraWxsTWFuYWdlclwiO1xyXG5pbXBvcnQgU2t5TWFuYWdlciBmcm9tIFwiLi4vLi4vLi4vR2FtZS9Ta3lNYW5hZ2VyXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vLi4vLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IE1vbnN0ZXIgZnJvbSBcIi4uLy4uLy4uL01vbnN0ZXIvTW9uc3RlclwiO1xyXG5pbXBvcnQgeyBLZXlGcmFtZURhdGEgfSBmcm9tIFwiLi4vLi4vLi4vTW9uc3Rlci9Nb25zdGVyRGF0YVwiO1xyXG5pbXBvcnQgTW9uc3Rlck1hbmFnZXIgZnJvbSBcIi4uLy4uLy4uL01vbnN0ZXIvTW9uc3Rlck1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU291bmRJbmRleCB9IGZyb20gXCIuLi8uLi8uLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgTXlUb29sIGZyb20gXCIuLi8uLi8uLi9Ub29scy9NeVRvb2xcIjtcclxuaW1wb3J0IHsgR29uZ0ppRGF0YSB9IGZyb20gXCIuLi8uLi9EYXRhL0hlcm9EYXRhXCI7XHJcbmltcG9ydCB7IEJ1ZmZEYXRhIH0gZnJvbSBcIi4uL0J1ZmZEYXRhXCI7XHJcbmltcG9ydCBIZXJvIGZyb20gXCIuLi9IZXJvXCI7XHJcbmltcG9ydCB7IEJ1ZmZJZCwgQnVmZlR5cGUsIERhbWFnZVR5cGUsIEdvbmdKaV9GYW5nWGlhbmcsIEhlcm9fU3RhdGUsICBTa2lsbEluZGljYXRvclR5cGUsIFNraWxsVHlwZSB9IGZyb20gXCIuLi9IZXJvQ29uZmlnXCI7XHJcbmltcG9ydCBKaWFuU2hpIGZyb20gXCIuL0ppYW5TaGlcIjtcclxuaW1wb3J0IEppYW5TaGlDcml0IGZyb20gXCIuL0ppYW5TaGlDcml0XCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoZVNob3UgZXh0ZW5kcyBIZXJvIHtcclxuICAgIFxyXG4gICAgamlhbnl1X251bTpudW1iZXI9MDtcclxuICAgIHRlc3RfZmVuemhpOm51bWJlcj0xO1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLeWKoOi9vS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIG9uTG9hZCgpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIub25Mb2FkKCk7XHJcbiAgICAgICAgLy/liqDovb3mioDog73mjIfnpLrlmahcclxuICAgICAgICBzdXBlci5hZGRMb2FkQnlHYW1lRWZmZWN0SWQoR2FtZUVmZmVjdElkLnNoZXNob3VfamlhbnNoaV9hdHQsOCk7XHJcbiAgICAgICAgc3VwZXIuYWRkTG9hZEJ5R2FtZUVmZmVjdElkKEdhbWVFZmZlY3RJZC5zaGVzaG91X2ppYW5zaGlfc2tpbGwsOCk7XHJcbiAgICAgICAgc3VwZXIuYWRkTG9hZEJ5R2FtZUVmZmVjdElkKEdhbWVFZmZlY3RJZC5zaGVzaG91X2ppYW5zaGlfYXR0X2hpdCw4KTtcclxuICAgICAgICBzdXBlci5hZGRMb2FkQnlHYW1lRWZmZWN0SWQoR2FtZUVmZmVjdElkLnNoZXNob3VfYXR0YWNrX2N0cmxfaGl0LDIpO1xyXG4gICAgICAgIHN1cGVyLmFkZExvYWRCeUdhbWVFZmZlY3RJZChHYW1lRWZmZWN0SWQuc2hlc2hvdV9qaWFuc2hpX3N1cGVyX3NraWxsXzEsMTYpO1xyXG4gICAgICAgIHN1cGVyLmFkZExvYWRCeUdhbWVFZmZlY3RJZChHYW1lRWZmZWN0SWQuc2hlc2hvdV9qaWFuc2hpX3N1cGVyX3NraWxsXzIsMTYpO1xyXG4gICAgICAgIHN1cGVyLmFkZExvYWRCeUdhbWVFZmZlY3RJZChHYW1lRWZmZWN0SWQuc2hlc2hvdV9qaWFuc2hpX3N1cGVyX3NraWxsXzMsMTYpOyBcclxuICAgICAgICB0aGlzLmlzX0xvYWRMb2FkPXRydWU7IFxyXG4gICAgICAgIHRoaXMuYWRkU2tpbGxMaXN0ZW4odGhpcy51c2VTa2lsbCk7XHJcbiAgICAgICAgdGhpcy5hZGRBdHRhY2tMaXN0ZW4odGhpcy5ub3JtYWxBdHRhY2spO1xyXG4gICAgICAgIHRoaXMuYWRkWHVhbll1bkxpc3Rlbih0aGlzLm9uWHVhbll1blJlc3VsdCk7XHJcbiAgICAgICAgdGhpcy5hZGRIaXRMaXN0ZW4odGhpcy5vbkhpdE1vbnN0ZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0KClcclxuICAgIHtcclxuICAgICAgICBzdXBlci5zdGFydCgpO1xyXG4gICAgICAgIHRoaXMuaXNfbmVlZF9jaGVja19kaXN0YW5jZT10cnVlO1xyXG4gICAgICAgIGxldCB6aGlqaW5nPXRoaXMuaGVyb19kYXRhLmdldFNraWxsVmFsdWUxKFNraWxsVHlwZS5BY3RpdmUpKjI7XHJcbiAgICAgICAgc3VwZXIuc2V0U2tpbGxUaXBTaXplKHpoaWppbmcsemhpamluZyk7XHJcbiAgICB9XHJcblxyXG4gICAgb25YdWFuWXVuUmVzdWx0KGlzWHVhbll1bjpib29sZWFuKXtcclxuICAgICAgICBpZihpc1h1YW5ZdW4pe1xyXG4gICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGVBbGxDYWxsYmFja3MoKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgLy/moLnmja7kuIrkuKrnirbmgIHliKTmlq3pnIDopoHlgZrku4DkuYhcclxuICAgICAgICAgICAgdGhpcy5zZXRIZXJvU3RhdGUoSGVyb19TdGF0ZS5pZGxlLEdvbmdKaV9GYW5nWGlhbmcuemhvbmcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGFydGVJZGxlKCl7XHJcbiAgICAgICAgdGhpcy5zZXRIZXJvU3RhdGUoSGVyb19TdGF0ZS5pZGxlLHRoaXMuY3VyX2Zhbmd4aWFuZyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3mlLvlh7stLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvKirmmrTlh7vml7bkuqfnlJ8xMDAqMjAw6ZSl5b2i6IyD5Zu055qE5rqF5bCE5pWI5p6c77yM5Y+X5pS75Ye755qE5pWM5Lq65ZKM6KKr5rqF5bCE55qE5Lq66aKd5aSW5Y+X5Yiwe+WPguaVsDF9JeS8pOWusyAqL1xyXG4gICAgb25IaXRNb25zdGVyKGRhbWFnZVR5cGU6RGFtYWdlVHlwZSxpc0NyaXQ6Ym9vbGVhbixtb25zdGVyOmNjLk5vZGUpe1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVKaWFuU2hpKGlkOkdhbWVFZmZlY3RJZCxqaWFuc2hpUG9zOmNjLlZlYzIsc3BlZWQ6bnVtYmVyLGRpcjpudW1iZXIsZ2pEYXRhOkdvbmdKaURhdGEpOmNjLk5vZGV7XHJcbiAgICAgICAgbGV0IG5vZGU9RmlnaHRpbmdNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoaWQsamlhbnNoaVBvcyk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoSmlhblNoaSkuaW5pdChpZCxzcGVlZCxkaXIsZ2pEYXRhKTtcclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgIH1cclxuICAgIC8v6I635Y+W5bCE5Ye75pa55ZCRXHJcbiAgICBnZXRTSkZYQnlQb3MocG9zOmNjLlZlYzIsc2VsZlBvczpjYy5WZWMyKTpHb25nSmlfRmFuZ1hpYW5nXHJcbiAgICB7XHJcbiAgICAgICAgLy/lr7nmlYzkurrljZXkvY3ov5vooYzmlrnlkJHliKTmlq3vvIznoa7lrprmiZPlh7vmlrnlkJFcclxuICAgICAgICBsZXQgZmFuZ3hpYW5nPUdvbmdKaV9GYW5nWGlhbmcuemhvbmc7XHJcbiAgICAgICAgbGV0IG9mZnNldFBvcz1wb3Muc3ViKHNlbGZQb3MpO1xyXG4gICAgICAgIGxldCBwaTI9TWF0aC5QSSoyO1xyXG4gICAgICAgIGxldCByYWRpYW49KE1hdGguYXRhbjIob2Zmc2V0UG9zLnksb2Zmc2V0UG9zLngpK3BpMiklcGkyO1xyXG4gICAgICAgIGxldCBhbmdsZT0xODAqcmFkaWFuL01hdGguUEk7XHJcbiAgICAgICAgaWYoYW5nbGU8PTc1KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmFuZ3hpYW5nPUdvbmdKaV9GYW5nWGlhbmcueW91O1xyXG4gICAgICAgIH1lbHNlIGlmKGFuZ2xlPjc1ICYmIGFuZ2xlPDEwNSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZhbmd4aWFuZz1Hb25nSmlfRmFuZ1hpYW5nLnpob25nO1xyXG4gICAgICAgIH1lbHNlIGlmKGFuZ2xlPj0xMDUgJiYgYW5nbGU8PTE4MClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZhbmd4aWFuZz1Hb25nSmlfRmFuZ1hpYW5nLnp1bztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbmd4aWFuZztcclxuICAgIH1cclxuICAgIC8qKuavj+asoeaZrumAmuaUu+WHu+aciXvlj4LmlbAxfSXlh6DnjofmlLnkuLrlsITlh7rkuIDms6Lnrq3pm6jvvIznrq3pm6jlkKt75Y+C5pWwMn3mlK/nrq3vvIzmr4/mlK/nrq3pgKDmiJB75Y+C5pWwM30l5Lyk5a6zICovXHJcbiAgICBub3JtYWxBdHRhY2sobW9uc3RlcjpjYy5Ob2RlKVxyXG4gICAge1xyXG4gICAgICAgIGlmKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfc3RhdGUhPUdhbWVTdGF0ZS5HYW1lX1BsYXlpbmcpXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIC8vIGxldCBlbmVteVBvcz1tb25zdGVyLmdldENvbXBvbmVudChNb25zdGVyKS5nZXRTaGVTaG91UG9zKCk7XHJcbiAgICAgICAgLy8gaWYodGhpcy5jaGVja1NraWxsMShlbmVteVBvcyk9PWZhbHNlKXtcclxuICAgICAgICAvLyAgICAgdGhpcy5zdGFydEF0dGFjayhtb25zdGVyKTtcclxuICAgICAgICAvLyB9IFxyXG4gICAgICAgIHRoaXMuY2hlY2tTa2lsbDEoKTsgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRBdHRhY2soZW5lbXlOb2RlOmNjLk5vZGUpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5pc19jYW5fZ29uZ2ppPWZhbHNlO1xyXG4gICAgICAgIGxldCBmYW5neGlhbmc9dGhpcy5nZXRTSkZYQnlQb3MoZW5lbXlOb2RlLmdldFBvc2l0aW9uKCksdGhpcy5ub2RlLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgIGxldCBkYXRhPW5ldyBLZXlGcmFtZURhdGEoKTtcclxuICAgICAgICBkYXRhLm5hbWU9XCJBdHRhY2tcIjtcclxuICAgICAgICBkYXRhLmNhbGxiYWNrPSgpPT57ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8v5q2j5Lit5b+DICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBlbmVteVBvcz1lbmVteU5vZGUuZ2V0Q29tcG9uZW50KE1vbnN0ZXIpLmdldFNoZVNob3VQb3MoKTtcclxuICAgICAgICAgICAgbGV0IGppYW5zaGlQb3M9dGhpcy5nZXRDcmVhdGVCdWxsZXRQb3MoKTtcclxuICAgICAgICAgICAgbGV0IG9mZnNldFBvcz1lbmVteVBvcy5zdWIoamlhbnNoaVBvcyk7XHJcbiAgICAgICAgICAgIGxldCBqaWFuc2hpRGlyPU1hdGguYXRhbjIob2Zmc2V0UG9zLnksb2Zmc2V0UG9zLngpO1xyXG4gICAgICAgICAgICBsZXQgZ2pEYXRhPXN1cGVyLmdldEdvbmdKaURhdGEoRGFtYWdlVHlwZS5Ob3JtYWwsdHJ1ZSxTa2lsbFR5cGUuTnVsbCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlSmlhblNoaShHYW1lRWZmZWN0SWQuc2hlc2hvdV9qaWFuc2hpX2F0dCxqaWFuc2hpUG9zLHRoaXMuYnVsbGV0X3NwZWVkLGppYW5zaGlEaXIsZ2pEYXRhKTtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LllYX0dvbmdqaWFuc2hvdUF0dGFjayk7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuaXNfZG91YmxlX2F0dGFjayl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0Tm9ybWFsQXR0YWNrKCk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nb25namlfamlzaHU9MDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBzdXBlci5zZXRIZXJvU3RhdGUoSGVyb19TdGF0ZS5hdHRhY2ssZmFuZ3hpYW5nLFtkYXRhXSwoKT0+eyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBzdXBlci5zZXRIZXJvU3RhdGUoSGVyb19TdGF0ZS5pZGxlLGZhbmd4aWFuZyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvKirooqvliqjmioDog70x6Kem5Y+R5Yik5patLeavj+asoeaZrumAmuaUu+WHu+aciXvlj4LmlbAxfSXlh6DnjofmlLnkuLrlsITlh7rkuIDms6Lnrq3pm6jvvIznrq3pm6jlkKt75Y+C5pWwMn3mlK/nrq3vvIzmr4/mlK/nrq3pgKDmiJB75Y+C5pWwM30l5Lyk5a6zICovXHJcbiAgICBjaGVja1NraWxsMShwb3M6Y2MuVmVjMj1udWxsKTpib29sZWFue1xyXG4gICAgICAgIC8v5qaC546HXHJcbiAgICAgICAgbGV0IHJhdGU9dGhpcy5oZXJvX2RhdGEuZ2V0U2tpbGxWYWx1ZTEoU2tpbGxUeXBlLlBhc3NpdmVfMSk7XHJcbiAgICAgICAgaWYodGhpcy5qaWFueXVfbnVtPjApe1xyXG4gICAgICAgICAgICByYXRlPTE7XHJcbiAgICAgICAgICAgIHRoaXMuamlhbnl1X251bS0tO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihyYXRlJiZNYXRoLnJhbmRvbSgpPHJhdGUpe1xyXG4gICAgICAgICAgICB0aGlzLmlzX2Nhbl9nb25namk9ZmFsc2U7ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IGRhdGE9bmV3IEtleUZyYW1lRGF0YSgpO1xyXG4gICAgICAgICAgICBkYXRhLm5hbWU9XCJBdHRhY2tcIjtcclxuICAgICAgICAgICAgZGF0YS5jYWxsYmFjaz0oKT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nb25namlfamlzaHU9MDsgXHJcbiAgICAgICAgICAgICAgICBsZXQgamlhbnNoaVBvcz1zdXBlci5nZXRDcmVhdGVCdWxsZXRQb3MoKTtcclxuICAgICAgICAgICAgICAgIGxldCBvZmZzZXRQb3M9Y2MudjIoMCwgMTApOztcclxuICAgICAgICAgICAgICAgIGxldCBwaTI9TWF0aC5QSSoyO1xyXG4gICAgICAgICAgICAgICAgLy/kuK3lv4PmlrnlkJFcclxuICAgICAgICAgICAgICAgIGxldCByYWRpYW49KE1hdGguYXRhbjIob2Zmc2V0UG9zLnksb2Zmc2V0UG9zLngpK3BpMiklcGkyO1xyXG4gICAgICAgICAgICAgICAgLy9sZXQgYW5nbGU9TXlUb29sLnJhZGlhblRvQW5nbGUocmFkaWFuKTtcclxuICAgICAgICAgICAgICAgIC8v5byn5b2i6IyD5Zu0LOacgOWkpzMwwrDvvIzpl7TpmpQzwrBcclxuICAgICAgICAgICAgICAgIGxldCBodWR1RmFuV2VpPU1hdGguUEkvNjA7XHJcbiAgICAgICAgICAgICAgICBsZXQgYWxsTnVtPXRoaXMuaGVyb19kYXRhLmdldFNraWxsVmFsdWUyKFNraWxsVHlwZS5QYXNzaXZlXzEpK3RoaXMuaGVyb19sdmw7XHJcbiAgICAgICAgICAgICAgICBsZXQgd2F2ZU51bT1NYXRoLmZsb29yKGFsbE51bS8xMCkrMTtcclxuICAgICAgICAgICAgICAgIGlmKGFsbE51bSUxMD09MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgd2F2ZU51bS0tO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy/msYLlubPlnYfmlbDvvIznrKzkuIDms6LmnIDlpJpcclxuICAgICAgICAgICAgICAgIGxldCBhdmVyYWdlPU1hdGguZmxvb3IoYWxsTnVtL3dhdmVOdW0pO1xyXG4gICAgICAgICAgICAgICAgLy/nrKzkuIDms6LmlbDph49cclxuICAgICAgICAgICAgICAgIGxldCBmaXJzdE51bT1hdmVyYWdlK2FsbE51bSV3YXZlTnVtO1xyXG4gICAgICAgICAgICAgICAgbGV0IGdqRGF0YT1zdXBlci5nZXRHb25nSmlEYXRhKERhbWFnZVR5cGUuU2tpbGwsdHJ1ZSxTa2lsbFR5cGUuUGFzc2l2ZV8xLHRoaXMuaGVyb19kYXRhLmdldFNraWxsVmFsdWUzKFNraWxsVHlwZS5QYXNzaXZlXzEpKTtcclxuICAgICAgICAgICAgICAgIGxldCBqaWFuZ2U9MC4yO1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8d2F2ZU51bTsgaSsrKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBudW09aT09MD9maXJzdE51bTphdmVyYWdlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBuPTA7IG48bnVtOyBuKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBqaWFuc2hpRGlyPXJhZGlhbisobi1udW0vMikqaHVkdUZhbldlaTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlSmlhblNoaShHYW1lRWZmZWN0SWQuc2hlc2hvdV9qaWFuc2hpX3NraWxsLGppYW5zaGlQb3MsdGhpcy5idWxsZXRfc3BlZWQsamlhbnNoaURpcixnakRhdGEpOyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9LGppYW5nZSooaSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LllYX0dvbmdqaWFuc2hvdVNraWxsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzdXBlci5zZXRIZXJvU3RhdGUoSGVyb19TdGF0ZS5hdHRhY2ssR29uZ0ppX0ZhbmdYaWFuZy56aG9uZyxbZGF0YV0sKCk9PntcclxuICAgICAgICAgICAgICAgIHN1cGVyLnNldEhlcm9TdGF0ZShIZXJvX1N0YXRlLmlkbGUsR29uZ0ppX0ZhbmdYaWFuZy56aG9uZyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHVzZVNraWxsKHBvczpjYy5WZWMyKTpudW1iZXJcclxuICAgIHsgICAgICAgIFxyXG4gICAgICAgIFNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlbGVhc2VTa2lsbCgoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0U2VsZlh1TGkocG9zKTtcclxuICAgICAgICB9LHRoaXMubm9kZSk7XHJcbiAgICAgICAgcmV0dXJuIDI7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRTZWxmWHVMaShwb3M6Y2MuVmVjMil7XHJcbiAgICAgICAgLy/ok4TlipvluKfnm5HlkKxcclxuICAgICAgICBsZXQgaGVyb1Jvb3Q9Y2MuZmluZCgnQ2FudmFzL0hlcm9fUm9vdCcpO1xyXG4gICAgICAgIC8vIGxldCB4dWxpRGF0YT1uZXcgS2V5RnJhbWVEYXRhKCk7XHJcbiAgICAgICAgLy8geHVsaURhdGEubmFtZT0nWHVMaSc7XHJcbiAgICAgICAgLy8geHVsaURhdGEuY2FsbGJhY2s9KCk9PntcclxuICAgICAgICAvLyAgICAgLy/liJvlu7roi7Hpm4TnmoTok4TlipvliqjnlLvnibnmlYjjgIJcclxuICAgICAgICAvLyAgICAgbGV0IGFzc2VtYmxlPVNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5zaGVzaG91X2ppYW5zaGlfc3VwZXJfc2tpbGxfMSxzdXBlci5nZXRDcmVhdGVCdWxsZXRQb3MoKS5hZGQoY2MudjIoMCw1MCkpKTtcclxuICAgICAgICAvLyAgICAgYXNzZW1ibGUuc2NhbGU9MTtcclxuICAgICAgICAvLyAgICAgYXNzZW1ibGUub3BhY2l0eT0yNTU7XHJcbiAgICAgICAgLy8gICAgIGxldCB4dWVsaVNwaW5lPWFzc2VtYmxlLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbik7XHJcbiAgICAgICAgLy8gICAgIHh1ZWxpU3BpbmUudGltZVNjYWxlPUppYVN1O1xyXG4gICAgICAgIC8vICAgICB4dWVsaVNwaW5lLnNldEFuaW1hdGlvbigwLCdTa2lsbF9YdUxpJyxmYWxzZSk7XHJcbiAgICAgICAgLy8gICAgIC8v55uR5ZCs6JOE5Yqb5Yqo5L2c5a6M5oiQXHJcbiAgICAgICAgLy8gICAgIHh1ZWxpU3BpbmUuc2V0Q29tcGxldGVMaXN0ZW5lcigoKT0+e1xyXG4gICAgICAgIC8vICAgICAgICAgeHVlbGlTcGluZS5zZXRDb21wbGV0ZUxpc3RlbmVyKG51bGwpO1xyXG4gICAgICAgIC8vICAgICAgICAgLy/ok4TlipvlrozmiJDvvIzlj5HlsITnmb3lhYlcclxuICAgICAgICAvLyAgICAgICAgIFNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldFRpbWVTdG9wKGZhbHNlKTtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMubm9kZS5wYXJlbnQ9aGVyb1Jvb3Q7XHJcbiAgICAgICAgLy8gICAgICAgICBsZXQgYW5pbWE9eHVlbGlTcGluZS5zZXRBbmltYXRpb24oMCwnU2tpbGxfRmFTaGUnLGZhbHNlKTtcclxuICAgICAgICAvLyAgICAgICAgIHh1ZWxpU3BpbmUudGltZVNjYWxlPTE7XHJcbiAgICAgICAgLy8gICAgICAgICAvL+iThOWKm+WujOaIkO+8jOebkeWQrOeZveWFieW4p1xyXG4gICAgICAgIC8vICAgICAgICAgeHVlbGlTcGluZS5zZXRUcmFja0V2ZW50TGlzdGVuZXIoYW5pbWEsKGVudHJ5OiBzcC5zcGluZS5UcmFja0VudHJ5LCBldmVudCk9PntcclxuICAgICAgICAvLyAgICAgICAgICAgICBpZihldmVudC5kYXRhLm5hbWU9PSdCYWknKXtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc3RhcnRCYWlQaW5nKCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICAgfSlcclxuICAgICAgICAvLyAgICAgfSlcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy/lj5HlsITluKfnm5HlkKxcclxuICAgICAgICBsZXQgZmFzaGVEYXRhPW5ldyBLZXlGcmFtZURhdGEoKTtcclxuICAgICAgICBmYXNoZURhdGEubmFtZT1cIkZhU2hlXCI7XHJcbiAgICAgICAgZmFzaGVEYXRhLmNhbGxiYWNrPSgpPT57XHJcbiAgICAgICAgICAgIC8v5Y+v5Lul5Y+R5bCEXHJcbiAgICAgICAgICAgIFNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldFRpbWVTdG9wKGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnBhcmVudD1oZXJvUm9vdDtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnpJbmRleD0yO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0TGF1bmNoKHBvcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v6Iux6ZuE5Yqo5L2c5pKt5pS+XHJcbiAgICAgICAgdGhpcy5zZXRIZXJvU3RhdGUoSGVyb19TdGF0ZS5za2lsbCxHb25nSmlfRmFuZ1hpYW5nLnpob25nLFtmYXNoZURhdGFdLCgpPT57XHJcbiAgICAgICAgICAgIC8v5Yqo5L2c5a6M5q+V5ZCO54q25oCB6L+Y5piv5oqA6IO954q25oCB77yM5Yqo55S76KaB5pKt5pS+5b6F5py655qEXHJcbiAgICAgICAgICAgIHRoaXMucmVzZXRHb25nSmlKaVNodSgpO1xyXG4gICAgICAgICAgICB0aGlzLnNldEhlcm9TdGF0ZShIZXJvX1N0YXRlLmlkbGUsR29uZ0ppX0ZhbmdYaWFuZy56aG9uZyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5zcGluZS50aW1lU2NhbGU9SmlhU3U7XHJcbiAgICB9XHJcbiAgICAvKirok4TlipvlkI7lj5HlsITkuIDms6Lnrq3pm6jvvIzlr7nljYrlvoR75Y+C5pWwMX3ojIPlm7TlhoXnmoTmlYzkurrlnKgz56eS5YaF6YCg5oiQMTXmrKF75Y+C5pWwMn0l5Lyk5a6zICovXHJcbiAgICBzdGFydExhdW5jaChwb3M6Y2MuVmVjMil7XHJcbiAgICAgICAgc3VwZXIuc2V0QXR0U3BpbmVTY2FsZSgpO1xyXG4gICAgICAgIHRoaXMucmVzZXRHb25nSmlKaVNodSgpO1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5ZWF9Hb25namlhbnNob3VTa2lsbCk7XHJcbiAgICAgICAgbGV0IGdqRGF0YT1zdXBlci5nZXRHb25nSmlEYXRhKERhbWFnZVR5cGUuU2tpbGwsZmFsc2UsU2tpbGxUeXBlLkFjdGl2ZSx0aGlzLmhlcm9fZGF0YS5nZXRTa2lsbFZhbHVlMihTa2lsbFR5cGUuQWN0aXZlKSk7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIGxldCBwaTI9TWF0aC5QSSoyO1xyXG4gICAgICAgIGxldCByYWRpdXM9dGhpcy5oZXJvX2RhdGEuZ2V0U2tpbGxWYWx1ZTEoU2tpbGxUeXBlLkFjdGl2ZSk7XHJcbiAgICAgICAgbGV0IGNyZWF0ZUppYW5TaGk9KCk9PntcclxuICAgICAgICAgICAgLy/ljYrlvoTpmo/mnLpcclxuICAgICAgICAgICAgbGV0IHI9TWF0aC5yYW5kb20oKSpyYWRpdXM7XHJcbiAgICAgICAgICAgIC8v5byn5bqm6ZqP5py6XHJcbiAgICAgICAgICAgIGxldCBodWR1PU1hdGgucmFuZG9tKCkqcGkyO1xyXG4gICAgICAgICAgICAvL+axgueCuVxyXG4gICAgICAgICAgICBsZXQgcG9zWD1wb3MueCtNYXRoLmNvcyhodWR1KSpyO1xyXG4gICAgICAgICAgICBsZXQgcG9zWT1wb3MueStNYXRoLnNpbihodWR1KSpyOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IHN0YXJ0UG9zPWNjLnYyKHBvc1grTWF0aC5yYW5kb20oKSpyYWRpdXMqMi1yYWRpdXMsMTI4MCtwb3NZKTtcclxuICAgICAgICAgICAgbGV0IGVuZFBvcz1jYy52Mihwb3NYLHBvc1kpO1xyXG4gICAgICAgICAgICBsZXQgb2Zmc2V0UG9zPWVuZFBvcy5zdWIoc3RhcnRQb3MpO1xyXG4gICAgICAgICAgICBsZXQgYW5nbGU9TXlUb29sLnJhZGlhblRvQW5nbGUoTWF0aC5hdGFuMihvZmZzZXRQb3MueSxvZmZzZXRQb3MueCkpKzkwO1xyXG4gICAgICAgICAgICBsZXQgamlhbnNoaT1HYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQuc2hlc2hvdV9qaWFuc2hpX3N1cGVyX3NraWxsXzIsc3RhcnRQb3MpO1xyXG4gICAgICAgICAgICBqaWFuc2hpLnNjYWxlPTI7XHJcbiAgICAgICAgICAgIGppYW5zaGkuYW5nbGU9YW5nbGU7XHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKGppYW5zaGkpLnRvKE1hdGgucmFuZG9tKCkqMC4zKzAuMix7eDplbmRQb3MueCx5OmVuZFBvcy55LHNjYWxlOjAuM30pLmNhbGwoKG5vZGU6Y2MuTm9kZSk9PntcclxuICAgICAgICAgICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmRlc3Ryb3lHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQuc2hlc2hvdV9qaWFuc2hpX3N1cGVyX3NraWxsXzIsamlhbnNoaSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgamlhbnRvdT1HYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQuc2hlc2hvdV9qaWFuc2hpX3N1cGVyX3NraWxsXzMsbm9kZS5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICAgICAgICAgIGppYW50b3Uub3BhY2l0eT0yNTU7XHJcbiAgICAgICAgICAgICAgICBqaWFudG91LmFuZ2xlPWFuZ2xlO1xyXG4gICAgICAgICAgICAgICAgbGV0IGhpdD1HYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQuc2hlc2hvdV9qaWFuc2hpX3N1cGVyX3NraWxsXzEsbm9kZS5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICAgICAgICAgIGhpdC5vcGFjaXR5PTI1NTtcclxuICAgICAgICAgICAgICAgIGhpdC5zY2FsZT0wLjQ7XHJcbiAgICAgICAgICAgICAgICBsZXQgaGl0U3BpbmU9aGl0LmdldENvbXBvbmVudChzcC5Ta2VsZXRvbik7XHJcbiAgICAgICAgICAgICAgICBoaXRTcGluZS5zZXRBbmltYXRpb24oMCwnU2tpbGxfSGl0JyxmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBjYy50d2VlbihoaXQpLmRlbGF5KDAuOSkudG8oMC41LHtvcGFjaXR5OjB9KS5jYWxsKCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZGVzdHJveUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5zaGVzaG91X2ppYW5zaGlfc3VwZXJfc2tpbGxfMSxoaXQpOyAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgICAgIGNjLnR3ZWVuKGppYW50b3UpLmJ5KDAuMSx7YW5nbGU6TWF0aC5yYW5kb20oKSoxMH0pLmJ5KDAuMSx7YW5nbGU6LShNYXRoLnJhbmRvbSgpKjEwKX0pLmJ5KDAuMSx7YW5nbGU6TWF0aC5yYW5kb20oKSoxMH0pLmJ5KDAuMSx7YW5nbGU6LShNYXRoLnJhbmRvbSgpKjEwKX0pLmRlbGF5KDAuNSkudG8oMC41LHtvcGFjaXR5OjB9KS5jYWxsKCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZGVzdHJveUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5zaGVzaG91X2ppYW5zaGlfc3VwZXJfc2tpbGxfMyxqaWFudG91KTtcclxuICAgICAgICAgICAgfSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgfSkuc3RhcnQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGV4TnVtPTA7XHJcbiAgICAgICAgbGV0IGV4MT10aGlzLmhlcm9fZGF0YS5FeGNsdXNpdmVXZWFwb25Ta2lsbFZhbHVlXzE7XHJcbiAgICAgICAgaWYoZXgxJiZleDE+MCl7XHJcbiAgICAgICAgICAgIGV4TnVtPWV4MTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHRvdGFsTnVtPTYwK2V4TnVtKjQ7XHJcbiAgICAgICAgLy/liJvlu7rlj5HlsITnmoTnrq3nn6JcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTwodG90YWxOdW0pOyBpKyspe1xyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICAgICAgY3JlYXRlSmlhblNoaSgpO1xyXG4gICAgICAgICAgICB9LE1hdGgucmFuZG9tKCkqMyk7XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgICAgICAgICBjcmVhdGVKaWFuU2hpKCk7XHJcbiAgICAgICAgICAgIH0saSozLyh0b3RhbE51bSkpO1xyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgICAgIGxldCBudW09MDtcclxuICAgICAgICBsZXQgZGFtYWdlTnVtPTE1K2V4TnVtO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGUoKCk9PntcclxuICAgICAgICAgICAgaWYobnVtPT0wKXtcclxuICAgICAgICAgICAgICAgIE15VG9vbC5yYW5kb21TY2VuZVNoYWtlKC01LDUsMC4wMiw2KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBudW0rKzsvL2NjLmxvZyhudW0pO1xyXG4gICAgICAgICAgICBsZXQgbW9uc3RlcnM9TW9uc3Rlck1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNb25zdGVyc0ZvckNlbnRlclBvcygtMSxwb3MscmFkaXVzKTtcclxuICAgICAgICAgICAgaWYobW9uc3RlcnMpe1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8bW9uc3RlcnMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBtb25zdGVyVHM9bW9uc3RlcnNbaV0uZ2V0Q29tcG9uZW50KE1vbnN0ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIG1vbnN0ZXJUcy5iZUZsYXNoSW5qdXJlZChnakRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwzL2RhbWFnZU51bSxkYW1hZ2VOdW0tMSk7XHJcbiAgICAgICAgU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXNTa2lsbFN0YXRlKGZhbHNlKTtcclxuICAgIH1cclxufVxyXG4iXX0=