
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Hero/Game/PaoShou/PaoShou.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8fcabsKsRJJkJAUvWUTYQ39', 'PaoShou');
// Scripts/Hero/Game/PaoShou/PaoShou.ts

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
var SkyManager_1 = require("../../../Game/SkyManager");
var GameManager_1 = require("../../../GameManager");
var LevelManager_1 = require("../../../Level/LevelManager");
var MonsterData_1 = require("../../../Monster/MonsterData");
var AudioConstants_1 = require("../../../Sound/AudioConstants");
var TutorailsManager_1 = require("../../../Tutorials/TutorailsManager");
var Hero_1 = require("../Hero");
var HeroConfig_1 = require("../HeroConfig");
var PaoDan_1 = require("./PaoDan");
var PaoDanNormal_1 = require("./PaoDanNormal");
var TouDan_1 = require("./TouDan");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PaoShou = /** @class */ (function (_super) {
    __extends(PaoShou, _super);
    function PaoShou() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**没有触发被动炮弹的次数 */
        _this.no_paopao_num = 0;
        return _this;
    }
    PaoShou.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.paoshou_paodan_att, 8);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.paoshou_paodan_skill, 8);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.paoshou_paodan_skill_ex, 2);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.paoshou_paodan_hit, 8);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.paoshou_skill_hit, 8);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.xuanyun, 4);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.paoshou_skill_2, 1);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.paoshou_active_skill_1, 1);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.paoshou_active_skill_2, 6);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.paoshou_active_skill_toudan, 6);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.paoshou_dazhao_xinhaodan, 6);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.paoshou_dazhao_weiyan, 6);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.paoshou_dazhao_weiyan_end, 1);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.paoshou_dazhao_xinhaodan_miaozhun, 1);
        this.is_LoadLoad = true;
        this.addSkillListen(this.useSkill);
        this.addAttackListen(this.normalAttack);
        this.addXuanYunListen(this.onXuanYunResult);
    };
    PaoShou.prototype.start = function () {
        _super.prototype.start.call(this);
        // if(this.hero_data.getSkillValue1(SkillType.Passive_2)){
        //     this.schedule(this.checkSkill2,this.hero_data.getSkillColdDown(SkillType.Passive_2));
        // }
        this.is_need_check_distance = true;
        _super.prototype.setSkillTipSize.call(this, 400, 400);
        if (LevelManager_1.LevelManager.getInstance().start_level == 2 && TutorailsManager_1.default.getInstance().isShowTutorials(206)) {
            //this.hideHero();
        }
    };
    PaoShou.prototype.onXuanYunResult = function (isXuanYun) {
        if (isXuanYun) {
            this.unscheduleAllCallbacks();
            // if(this.hero_data.getSkillValue1(SkillType.Passive_2)){
            //     this.schedule(this.checkSkill2,this.hero_data.getSkillColdDown(SkillType.Passive_2));
            // }
        }
        else {
            //根据上个状态判断需要做什么
            this.setHeroState(HeroConfig_1.Hero_State.idle, HeroConfig_1.GongJi_FangXiang.zhong);
        }
    };
    //---------------------------------------------攻击----------------------------------------------
    PaoShou.prototype.createPaoDan = function (id, pos, targetPos, speed, size, gjData) {
        var node = FightingManager_1.default.getInstance().createGameEffectById(id, pos);
        node.getComponent(PaoDan_1.default).init(id, speed, targetPos, gjData, size);
    };
    PaoShou.prototype.createNormalPaoDan = function (id, pos, dir, speed, gjData) {
        var node = FightingManager_1.default.getInstance().createGameEffectById(id, pos);
        node.getComponent(PaoDanNormal_1.default).init(id, speed, dir, gjData);
    };
    PaoShou.prototype.normalAttack = function (monster) {
        if (GameManager_1.default.getInstance().cur_game_state != Constants_1.GameState.Game_Playing)
            return;
        this.is_can_gongji = false;
        this.startAttack(monster.getPosition());
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_PaoshouAttack);
    };
    /**每次攻击会对半径{参数1}范围内造成{参数2}%伤害 */
    PaoShou.prototype.startAttack = function (enemyPos) {
        var _this = this;
        var fangxiang = _super.prototype.getFangXiangByPos.call(this, enemyPos);
        var data = new MonsterData_1.KeyFrameData();
        data.name = "Attack";
        data.callback = function () {
            //正中心
            var gjData = _super.prototype.getGongJiData.call(_this, HeroConfig_1.DamageType.Skill, false, HeroConfig_1.SkillType.Passive_1, _this.hero_data.getSkillValue2(HeroConfig_1.SkillType.Passive_1));
            var bullectPos = _super.prototype.getCreateBulletPos.call(_this);
            var paoDanId = GameEffectsManager_1.GameEffectId.paoshou_paodan_skill;
            var size = _this.hero_data.getSkillValue1(HeroConfig_1.SkillType.Passive_1);
            _this.createPaoDan(paoDanId, bullectPos, enemyPos, _this.bullet_speed, size, gjData);
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
    // checkSkill1(enemyPos:cc.Vec2):boolean{
    //     //概率
    //     let rate=this.hero_data.getSkillValue1(SkillType.Passive_1);
    //     let paoDanId=GameEffectId.paoshou_paodan_skill;
    //     if(this.hero_data.ExclusiveWeaponSkillValue_1>0 && this.no_paopao_num>=this.hero_data.ExclusiveWeaponSkillValue_1)
    //     {
    //         rate=1;
    //         paoDanId=GameEffectId.paoshou_paodan_skill_ex;
    //     }
    //     if(rate&&Math.random()<rate){
    //         this.is_can_jishu=false;
    //         let data=new KeyFrameData();
    //         data.name="Attack";
    //         data.callback=()=>{
    //             let bullectPos=super.getCreateBulletPos();    
    //             let gjData=super.getGongJiData(DamageType.Skill,false,SkillType.Passive_1,this.hero_data.getSkillValue3(SkillType.Passive_1));
    //             //码数*2
    //             let size=this.hero_data.getSkillValue2(SkillType.Passive_1);
    //             this.createPaoDan(paoDanId,bullectPos,enemyPos,this.bullet_speed,size,gjData);
    //             GameManager.getInstance().sound_manager.playSound(SoundIndex.cannon);
    //         }
    //         super.setHeroStateAndAnimation(Hero_State.skill,'KaiShi_Attack',false,[data],()=>{
    //             this.is_can_jishu=true;
    //             super.setHeroState(Hero_State.idle,this.cur_fangxiang);
    //         })
    //         this.no_paopao_num=0;
    //         return true;
    //     }else{
    //         this.no_paopao_num++;
    //         return false;;
    //     }
    // }
    // /**BUG：可能被眩晕后无法再次释放了,使用update计数 */
    // checkSkill2(){
    //     if(GameManager.getInstance().cur_game_state!=GameState.Game_Playing){
    //         return;
    //     }
    //     let node=this.node.getChildByName('progressBar');
    //     node.active=true;
    //     let progressBar=node.getComponent(cc.ProgressBar);
    //     progressBar.progress=0;
    //     this.is_can_jishu=false;
    //     super.setHeroStateAndAnimation(Hero_State.skill,'Buff',false,null,()=>{
    //         this.is_can_jishu=true;
    //         super.setHeroState(Hero_State.idle,this.cur_fangxiang);
    //     })
    //     cc.tween(progressBar).to(0.5,{progress:1}).call(()=>{
    //         //加血10秒
    //         // let buffData=new BuffData();
    //         // buffData.buff_id=BuffId.Hero_PaoShou_Skill_2_Add_Hp;
    //         // buffData.buff_type=BuffType.Normal;
    //         // buffData.buff_value=[this.hero_data.getSkillValue2(SkillType.Passive_2)+this.hero_data.getSkillValue3(SkillType.Passive_2)*GameManager.getInstance().wall_data.getMaxHp()];
    //         // buffData.recovery_jiange_time=1;
    //         // buffData.remain_time=10;
    //         // super.addBuff(buffData)
    //         // node.active=false;
    //         // //加伤害5秒
    //         // let buffData1=new BuffData();
    //         // buffData1.buff_id=BuffId.Hero_PaoShou_Skill_2_Add_Damage;
    //         // buffData1.buff_type=BuffType.Normal;
    //         // buffData1.game_effect_id=GameEffectId.paoshou_skill_2;
    //         // buffData1.buff_value=[this.hero_data.getSkillValue1(SkillType.Passive_2)];
    //         // buffData1.remain_time=5;
    //         // super.addBuff(buffData1)
    //     }).start();
    // }
    PaoShou.prototype.useSkill = function (pos) {
        var _this = this;
        SkillManager_1.default.getInstance().releaseSkill(function () {
            _this.startSelfXuLi(pos);
        }, this.node);
        return 1;
    };
    PaoShou.prototype.startSelfXuLi = function (pos) {
        var _this = this;
        //蓄力帧监听
        var heroRoot = cc.find('Canvas/Hero_Root');
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
    /**发射数枚炮弹，对半径200的目标区域进行{参数1}次轰炸，每次造成{参数2}%伤害 */
    PaoShou.prototype.startLaunch = function (pos) {
        _super.prototype.setAttSpineScale.call(this);
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_PaoShouSkill1);
        var num = this.hero_data.getSkillValue1(HeroConfig_1.SkillType.Active);
        var gjData = _super.prototype.getGongJiData.call(this, HeroConfig_1.DamageType.Skill, false, HeroConfig_1.SkillType.Active, this.hero_data.getSkillValue2(HeroConfig_1.SkillType.Active));
        var pi2 = Math.PI * 2;
        for (var i = 0; i < num; i++) {
            this.scheduleOnce(function () {
                //半径随机
                var r = Math.random() * 200;
                //弧度随机
                var hudu = Math.random() * pi2;
                //求点
                var posX = pos.x + Math.cos(hudu) * r;
                var posY = pos.y + Math.sin(hudu) * r;
                var toudan = SkyManager_1.default.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.paoshou_active_skill_toudan, cc.v2(posX, posY + 1600));
                toudan.getComponent(TouDan_1.default).init(GameEffectsManager_1.GameEffectId.paoshou_active_skill_toudan, cc.v2(posX, posY), gjData);
            }, 0.15 * i);
        }
        SkillManager_1.default.getInstance().setIsSkillState(false);
        // let xinhaodan=GameEffectsManager.getInstance().createGameEffectForParent(GameEffectId.paoshou_dazhao_xinhaodan,this.getCreateBulletPos(),SkillManager.getInstance().node);
        // let cenPos=GameManager.getInstance().getFightCenter();
        // let oldParent=this.node.parent;
        // this.node.parent=SkillManager.getInstance().node;
        // SkillManager.getInstance().setTimeStop(true);
        // SkillManager.getInstance().startBaiPing();
        // MyTool.randomSceneShake(-5,5,0.02,6);
        // let monsters=MonsterManager.getInstance().getMonstersForMaxAttak(1,this.node.getPosition(),this.hero_data.gongji_fanwei);        
        // if(monsters){
        //     cenPos=monsters[0].getPosition().add(cc.v2(0,-25));
        //     if(cenPos.y<GameManager.getInstance().enemy_att_y){
        //         cenPos=monsters[0].getPosition();
        //     }
        // }
        // this.spine.timeScale=JiaSu;
        // xinhaodan.getComponent(SignalFlare).init(GameEffectId.paoshou_dazhao_xinhaodan,600,cenPos,()=>{            
        //     this.node.parent=oldParent;
        //     this.node.zIndex=2;
        //     this.spine.timeScale=1;
        //     SkillManager.getInstance().setTimeStop(false);
        //     this.resetGongJiJiShu();
        //     super.setHeroState(Hero_State.idle,this.cur_fangxiang);
        //     let startY=-(cc.winSize.height/2+200)
        //     let endY=cc.winSize.height+400;
        //     let speed=(endY-startY)/3;
        //     let node=SkyManager.getInstance().createGameEffectById(GameEffectId.paoshou_active_skill_1,cc.v2(0,startY));
        //     let gjData=super.getGongJiData(DamageType.Skill,false,this.hero_data.getSkillValue2(SkillType.Active));
        //     cc.tween(node).by(3,{y:endY}).call(()=>{
        //         GameEffectsManager.getInstance().destroyGameEffectById(GameEffectId.paoshou_active_skill_1,node);
        //     }).start();
        //     let paoNum=0;
        //     let radius=50;
        //     let toudanCall=()=>{
        //         let radian=(paoNum*Math.PI/3)
        //         let posX=cenPos.x+Math.cos(radian)*radius;
        //         let posY=cenPos.y+Math.sin(radian)*radius;
        //         let toudan=SkyManager.getInstance().createGameEffectById(GameEffectId.paoshou_active_skill_toudan,cc.v2(posX,posY+1600));
        //         // let toudan=SkyManager.getInstance().createGameEffectById(GameEffectId.paoshou_active_skill_toudan,cc.v2(posX,(cc.winSize.height/2+200+speed*paoNum)));
        //         // let xx=108*(paoNum%2==0?-1:1);
        //         // let yy=node.y+100;
        //         toudan.getComponent(TouDan).init(GameEffectId.paoshou_active_skill_toudan,cc.v2(posX,posY),gjData);
        //         paoNum++;
        //     };
        //     this.schedule(toudanCall,0.25,5,1);
        //     SkillManager.getInstance().setIsSkillState(false);
        // });                    
        // GameManager.getInstance().wall_data.addShieldValue(ShieldId.PaoShou_ActiveSkill,ShieldType.All,5,this.hero_data.total_attack*this.hero_data.getSkillValue1(SkillType.Active));
    };
    PaoShou = __decorate([
        ccclass
    ], PaoShou);
    return PaoShou;
}(Hero_1.default));
exports.default = PaoShou;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcR2FtZVxcUGFvU2hvdVxcUGFvU2hvdS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxnREFBc0Q7QUFDdEQsaUVBQTREO0FBQzVELHVFQUFnRTtBQUNoRSwyREFBc0Q7QUFDdEQsdURBQWtEO0FBQ2xELG9EQUErQztBQUMvQyw0REFBMkQ7QUFDM0QsNERBQTREO0FBQzVELGdFQUEyRDtBQUMzRCx3RUFBbUU7QUFFbkUsZ0NBQTJCO0FBQzNCLDRDQUEwRztBQUMxRyxtQ0FBOEI7QUFDOUIsK0NBQTBDO0FBQzFDLG1DQUE4QjtBQUV4QixJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFxQywyQkFBSTtJQUF6QztRQUFBLHFFQXdRQztRQXRRRyxpQkFBaUI7UUFDakIsbUJBQWEsR0FBUSxDQUFDLENBQUM7O0lBcVEzQixDQUFDO0lBblFHLHdCQUFNLEdBQU47UUFFSSxpQkFBTSxNQUFNLFdBQUUsQ0FBQztRQUNmLGlCQUFNLHFCQUFxQixZQUFDLGlDQUFZLENBQUMsa0JBQWtCLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0QsaUJBQU0scUJBQXFCLFlBQUMsaUNBQVksQ0FBQyxvQkFBb0IsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUNqRSxpQkFBTSxxQkFBcUIsWUFBQyxpQ0FBWSxDQUFDLHVCQUF1QixFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BFLGlCQUFNLHFCQUFxQixZQUFDLGlDQUFZLENBQUMsa0JBQWtCLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0QsaUJBQU0scUJBQXFCLFlBQUMsaUNBQVksQ0FBQyxpQkFBaUIsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUM5RCxpQkFBTSxxQkFBcUIsWUFBQyxpQ0FBWSxDQUFDLE9BQU8sRUFBQyxDQUFDLENBQUMsQ0FBQztRQUNwRCxpQkFBTSxxQkFBcUIsWUFBQyxpQ0FBWSxDQUFDLGVBQWUsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUM1RCxpQkFBTSxxQkFBcUIsWUFBQyxpQ0FBWSxDQUFDLHNCQUFzQixFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25FLGlCQUFNLHFCQUFxQixZQUFDLGlDQUFZLENBQUMsc0JBQXNCLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkUsaUJBQU0scUJBQXFCLFlBQUMsaUNBQVksQ0FBQywyQkFBMkIsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUN4RSxpQkFBTSxxQkFBcUIsWUFBQyxpQ0FBWSxDQUFDLHdCQUF3QixFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JFLGlCQUFNLHFCQUFxQixZQUFDLGlDQUFZLENBQUMscUJBQXFCLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEUsaUJBQU0scUJBQXFCLFlBQUMsaUNBQVksQ0FBQyx5QkFBeUIsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUN0RSxpQkFBTSxxQkFBcUIsWUFBQyxpQ0FBWSxDQUFDLGlDQUFpQyxFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlFLElBQUksQ0FBQyxXQUFXLEdBQUMsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVELHVCQUFLLEdBQUw7UUFFSSxpQkFBTSxLQUFLLFdBQUUsQ0FBQztRQUNkLDBEQUEwRDtRQUMxRCw0RkFBNEY7UUFDNUYsSUFBSTtRQUNKLElBQUksQ0FBQyxzQkFBc0IsR0FBQyxJQUFJLENBQUM7UUFDakMsaUJBQU0sZUFBZSxZQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsQ0FBQztRQUMvQixJQUFHLDJCQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxJQUFFLENBQUMsSUFBRSwwQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLEVBQUM7WUFDOUYsa0JBQWtCO1NBQ3JCO0lBQ0wsQ0FBQztJQUVELGlDQUFlLEdBQWYsVUFBZ0IsU0FBaUI7UUFDN0IsSUFBRyxTQUFTLEVBQUM7WUFDVCxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztZQUM5QiwwREFBMEQ7WUFDMUQsNEZBQTRGO1lBQzVGLElBQUk7U0FDUDthQUFJO1lBQ0QsZUFBZTtZQUNmLElBQUksQ0FBQyxZQUFZLENBQUMsdUJBQVUsQ0FBQyxJQUFJLEVBQUMsNkJBQWdCLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDN0Q7SUFDTCxDQUFDO0lBQ0QsK0ZBQStGO0lBQy9GLDhCQUFZLEdBQVosVUFBYSxFQUFlLEVBQUMsR0FBVyxFQUFDLFNBQWlCLEVBQUMsS0FBWSxFQUFDLElBQVcsRUFBQyxNQUFpQjtRQUNqRyxJQUFJLElBQUksR0FBQyx5QkFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDLG9CQUFvQixDQUFDLEVBQUUsRUFBQyxHQUFHLENBQUMsQ0FBQztRQUNwRSxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFDLEtBQUssRUFBQyxTQUFTLEVBQUMsTUFBTSxFQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFFRCxvQ0FBa0IsR0FBbEIsVUFBbUIsRUFBZSxFQUFDLEdBQVcsRUFBQyxHQUFVLEVBQUMsS0FBWSxFQUFDLE1BQWlCO1FBQ3BGLElBQUksSUFBSSxHQUFDLHlCQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsb0JBQW9CLENBQUMsRUFBRSxFQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3BFLElBQUksQ0FBQyxZQUFZLENBQUMsc0JBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUMsS0FBSyxFQUFDLEdBQUcsRUFBQyxNQUFNLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRUQsOEJBQVksR0FBWixVQUFhLE9BQWU7UUFFeEIsSUFBRyxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsSUFBRSxxQkFBUyxDQUFDLFlBQVk7WUFDL0QsT0FBTztRQUNYLElBQUksQ0FBQyxhQUFhLEdBQUMsS0FBSyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFDeEMscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLDJCQUFVLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUNuRixDQUFDO0lBQ0QsZ0NBQWdDO0lBQ2hDLDZCQUFXLEdBQVgsVUFBWSxRQUFnQjtRQUE1QixpQkFxQkM7UUFuQkcsSUFBSSxTQUFTLEdBQUMsaUJBQU0saUJBQWlCLFlBQUMsUUFBUSxDQUFDLENBQUM7UUFDaEQsSUFBSSxJQUFJLEdBQUMsSUFBSSwwQkFBWSxFQUFFLENBQUM7UUFDNUIsSUFBSSxDQUFDLElBQUksR0FBQyxRQUFRLENBQUM7UUFDbkIsSUFBSSxDQUFDLFFBQVEsR0FBQztZQUNWLEtBQUs7WUFDTCxJQUFJLE1BQU0sR0FBQyxpQkFBTSxhQUFhLGFBQUMsdUJBQVUsQ0FBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLHNCQUFTLENBQUMsU0FBUyxFQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLHNCQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUM5SCxJQUFJLFVBQVUsR0FBQyxpQkFBTSxrQkFBa0IsWUFBRSxDQUFDO1lBQzFDLElBQUksUUFBUSxHQUFDLGlDQUFZLENBQUMsb0JBQW9CLENBQUM7WUFDL0MsSUFBSSxJQUFJLEdBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsc0JBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUM1RCxLQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBQyxVQUFVLEVBQUMsUUFBUSxFQUFDLEtBQUksQ0FBQyxZQUFZLEVBQUMsSUFBSSxFQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzlFLElBQUcsS0FBSSxDQUFDLGdCQUFnQixFQUFDO2dCQUNyQixLQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQzthQUM1QjtpQkFBSTtnQkFDRCxLQUFJLENBQUMsWUFBWSxHQUFDLENBQUMsQ0FBQzthQUN2QjtRQUNMLENBQUMsQ0FBQTtRQUNELGlCQUFNLFlBQVksWUFBQyx1QkFBVSxDQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsQ0FBQyxJQUFJLENBQUMsRUFBQztZQUNsRCxpQkFBTSxZQUFZLGFBQUMsdUJBQVUsQ0FBQyxJQUFJLEVBQUMsU0FBUyxDQUFDLENBQUM7UUFDbEQsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQseUNBQXlDO0lBQ3pDLFdBQVc7SUFDWCxtRUFBbUU7SUFDbkUsc0RBQXNEO0lBQ3RELHlIQUF5SDtJQUN6SCxRQUFRO0lBQ1Isa0JBQWtCO0lBQ2xCLHlEQUF5RDtJQUN6RCxRQUFRO0lBRVIsb0NBQW9DO0lBQ3BDLG1DQUFtQztJQUNuQyx1Q0FBdUM7SUFDdkMsOEJBQThCO0lBQzlCLDhCQUE4QjtJQUM5Qiw2REFBNkQ7SUFDN0QsNklBQTZJO0lBQzdJLHFCQUFxQjtJQUNyQiwyRUFBMkU7SUFDM0UsNkZBQTZGO0lBQzdGLG9GQUFvRjtJQUNwRixZQUFZO0lBQ1osNkZBQTZGO0lBQzdGLHNDQUFzQztJQUN0QyxzRUFBc0U7SUFDdEUsYUFBYTtJQUNiLGdDQUFnQztJQUNoQyx1QkFBdUI7SUFDdkIsYUFBYTtJQUNiLGdDQUFnQztJQUNoQyx5QkFBeUI7SUFDekIsUUFBUTtJQUNSLElBQUk7SUFDSixxQ0FBcUM7SUFDckMsaUJBQWlCO0lBQ2pCLDRFQUE0RTtJQUM1RSxrQkFBa0I7SUFDbEIsUUFBUTtJQUNSLHdEQUF3RDtJQUN4RCx3QkFBd0I7SUFDeEIseURBQXlEO0lBQ3pELDhCQUE4QjtJQUM5QiwrQkFBK0I7SUFDL0IsOEVBQThFO0lBQzlFLGtDQUFrQztJQUNsQyxrRUFBa0U7SUFDbEUsU0FBUztJQUNULDREQUE0RDtJQUU1RCxrQkFBa0I7SUFDbEIsMENBQTBDO0lBQzFDLGtFQUFrRTtJQUNsRSxpREFBaUQ7SUFDakQseUxBQXlMO0lBQ3pMLDhDQUE4QztJQUM5QyxzQ0FBc0M7SUFDdEMscUNBQXFDO0lBQ3JDLGdDQUFnQztJQUNoQyxxQkFBcUI7SUFDckIsMkNBQTJDO0lBQzNDLHVFQUF1RTtJQUN2RSxrREFBa0Q7SUFDbEQsb0VBQW9FO0lBQ3BFLHdGQUF3RjtJQUN4RixzQ0FBc0M7SUFDdEMsc0NBQXNDO0lBQ3RDLGtCQUFrQjtJQUNsQixJQUFJO0lBRUosMEJBQVEsR0FBUixVQUFTLEdBQVc7UUFBcEIsaUJBTUM7UUFKRyxzQkFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQztZQUNwQyxLQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzVCLENBQUMsRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDYixPQUFPLENBQUMsQ0FBQztJQUNiLENBQUM7SUFFRCwrQkFBYSxHQUFiLFVBQWMsR0FBVztRQUF6QixpQkFvQkM7UUFuQkcsT0FBTztRQUNQLElBQUksUUFBUSxHQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUN6QyxPQUFPO1FBQ1AsSUFBSSxTQUFTLEdBQUMsSUFBSSwwQkFBWSxFQUFFLENBQUM7UUFDakMsU0FBUyxDQUFDLElBQUksR0FBQyxPQUFPLENBQUM7UUFDdkIsU0FBUyxDQUFDLFFBQVEsR0FBQztZQUNmLE1BQU07WUFDTixzQkFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM5QyxLQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBQyxRQUFRLENBQUM7WUFDMUIsS0FBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDO1lBQ25CLEtBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDMUIsQ0FBQyxDQUFBO1FBQ0QsUUFBUTtRQUNSLElBQUksQ0FBQyxZQUFZLENBQUMsdUJBQVUsQ0FBQyxLQUFLLEVBQUMsNkJBQWdCLENBQUMsS0FBSyxFQUFDLENBQUMsU0FBUyxDQUFDLEVBQUM7WUFDbEUsd0JBQXdCO1lBQ3hCLEtBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQ3hCLEtBQUksQ0FBQyxZQUFZLENBQUMsdUJBQVUsQ0FBQyxJQUFJLEVBQUMsNkJBQWdCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDOUQsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBQyxpQkFBSyxDQUFDO0lBQy9CLENBQUM7SUFDRCwrQ0FBK0M7SUFDL0MsNkJBQVcsR0FBWCxVQUFZLEdBQVc7UUFDbkIsaUJBQU0sZ0JBQWdCLFdBQUUsQ0FBQztRQUN6QixxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsMkJBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQy9FLElBQUksR0FBRyxHQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLHNCQUFTLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDdkQsSUFBSSxNQUFNLEdBQUMsaUJBQU0sYUFBYSxZQUFDLHVCQUFVLENBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxzQkFBUyxDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxzQkFBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDeEgsSUFBSSxHQUFHLEdBQUMsSUFBSSxDQUFDLEVBQUUsR0FBQyxDQUFDLENBQUM7UUFDbEIsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBQztZQUNwQixJQUFJLENBQUMsWUFBWSxDQUFDO2dCQUNkLE1BQU07Z0JBQ04sSUFBSSxDQUFDLEdBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFDLEdBQUcsQ0FBQztnQkFDeEIsTUFBTTtnQkFDTixJQUFJLElBQUksR0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUMsR0FBRyxDQUFDO2dCQUMzQixJQUFJO2dCQUNKLElBQUksSUFBSSxHQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBQyxDQUFDLENBQUM7Z0JBQ2hDLElBQUksSUFBSSxHQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBQyxDQUFDLENBQUM7Z0JBQ2hDLElBQUksTUFBTSxHQUFDLG9CQUFVLENBQUMsV0FBVyxFQUFFLENBQUMsb0JBQW9CLENBQUMsaUNBQVksQ0FBQywyQkFBMkIsRUFBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksRUFBQyxJQUFJLEdBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDekgsTUFBTSxDQUFDLFlBQVksQ0FBQyxnQkFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLGlDQUFZLENBQUMsMkJBQTJCLEVBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLEVBQUMsTUFBTSxDQUFDLENBQUM7WUFDdkcsQ0FBQyxFQUFDLElBQUksR0FBQyxDQUFDLENBQUMsQ0FBQztTQUNiO1FBQ0Qsc0JBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbEQsNktBQTZLO1FBQzdLLHlEQUF5RDtRQUN6RCxrQ0FBa0M7UUFDbEMsb0RBQW9EO1FBQ3BELGdEQUFnRDtRQUNoRCw2Q0FBNkM7UUFDN0Msd0NBQXdDO1FBQ3hDLG9JQUFvSTtRQUNwSSxnQkFBZ0I7UUFDaEIsMERBQTBEO1FBQzFELDBEQUEwRDtRQUMxRCw0Q0FBNEM7UUFDNUMsUUFBUTtRQUNSLElBQUk7UUFDSiw4QkFBOEI7UUFDOUIsOEdBQThHO1FBQzlHLGtDQUFrQztRQUNsQywwQkFBMEI7UUFDMUIsOEJBQThCO1FBQzlCLHFEQUFxRDtRQUNyRCwrQkFBK0I7UUFDL0IsOERBQThEO1FBQzlELDRDQUE0QztRQUM1QyxzQ0FBc0M7UUFDdEMsaUNBQWlDO1FBQ2pDLG1IQUFtSDtRQUNuSCw4R0FBOEc7UUFDOUcsK0NBQStDO1FBQy9DLDRHQUE0RztRQUM1RyxrQkFBa0I7UUFDbEIsb0JBQW9CO1FBQ3BCLHFCQUFxQjtRQUNyQiwyQkFBMkI7UUFFM0Isd0NBQXdDO1FBQ3hDLHFEQUFxRDtRQUNyRCxxREFBcUQ7UUFDckQsb0lBQW9JO1FBQ3BJLG9LQUFvSztRQUNwSyw0Q0FBNEM7UUFDNUMsZ0NBQWdDO1FBQ2hDLDhHQUE4RztRQUM5RyxvQkFBb0I7UUFDcEIsU0FBUztRQUNULDBDQUEwQztRQUMxQyx5REFBeUQ7UUFDekQsMEJBQTBCO1FBQzFCLGlMQUFpTDtJQUNyTCxDQUFDO0lBdFFnQixPQUFPO1FBRDNCLE9BQU87T0FDYSxPQUFPLENBd1EzQjtJQUFELGNBQUM7Q0F4UUQsQUF3UUMsQ0F4UW9DLGNBQUksR0F3UXhDO2tCQXhRb0IsT0FBTyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgeyBHYW1lU3RhdGUsIEppYVN1IH0gZnJvbSBcIi4uLy4uLy4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgRmlnaHRpbmdNYW5hZ2VyIGZyb20gXCIuLi8uLi8uLi9HYW1lL0ZpZ2h0aW5nTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBHYW1lRWZmZWN0SWQgfSBmcm9tIFwiLi4vLi4vLi4vR2FtZS9HYW1lRWZmZWN0c01hbmFnZXJcIjtcclxuaW1wb3J0IFNraWxsTWFuYWdlciBmcm9tIFwiLi4vLi4vLi4vR2FtZS9Ta2lsbE1hbmFnZXJcIjtcclxuaW1wb3J0IFNreU1hbmFnZXIgZnJvbSBcIi4uLy4uLy4uL0dhbWUvU2t5TWFuYWdlclwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uLy4uLy4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IExldmVsTWFuYWdlciB9IGZyb20gXCIuLi8uLi8uLi9MZXZlbC9MZXZlbE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgS2V5RnJhbWVEYXRhIH0gZnJvbSBcIi4uLy4uLy4uL01vbnN0ZXIvTW9uc3RlckRhdGFcIjtcclxuaW1wb3J0IHsgU291bmRJbmRleCB9IGZyb20gXCIuLi8uLi8uLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgVHV0b3JhaWxzTWFuYWdlciBmcm9tIFwiLi4vLi4vLi4vVHV0b3JpYWxzL1R1dG9yYWlsc01hbmFnZXJcIjtcclxuaW1wb3J0IHsgR29uZ0ppRGF0YSB9IGZyb20gXCIuLi8uLi9EYXRhL0hlcm9EYXRhXCI7XHJcbmltcG9ydCBIZXJvIGZyb20gXCIuLi9IZXJvXCI7XHJcbmltcG9ydCB7IERhbWFnZVR5cGUsIEdvbmdKaV9GYW5nWGlhbmcsIEhlcm9fU3RhdGUsIFNoaWVsZElkLCBTaGllbGRUeXBlLCBTa2lsbFR5cGUgfSBmcm9tIFwiLi4vSGVyb0NvbmZpZ1wiO1xyXG5pbXBvcnQgUGFvRGFuIGZyb20gXCIuL1Bhb0RhblwiO1xyXG5pbXBvcnQgUGFvRGFuTm9ybWFsIGZyb20gXCIuL1Bhb0Rhbk5vcm1hbFwiO1xyXG5pbXBvcnQgVG91RGFuIGZyb20gXCIuL1RvdURhblwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYW9TaG91IGV4dGVuZHMgSGVybyB7XHJcbiAgICBcclxuICAgIC8qKuayoeacieinpuWPkeiiq+WKqOeCruW8ueeahOasoeaVsCAqL1xyXG4gICAgbm9fcGFvcGFvX251bTpudW1iZXI9MDtcclxuXHJcbiAgICBvbkxvYWQoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xyXG4gICAgICAgIHN1cGVyLmFkZExvYWRCeUdhbWVFZmZlY3RJZChHYW1lRWZmZWN0SWQucGFvc2hvdV9wYW9kYW5fYXR0LDgpO1xyXG4gICAgICAgIHN1cGVyLmFkZExvYWRCeUdhbWVFZmZlY3RJZChHYW1lRWZmZWN0SWQucGFvc2hvdV9wYW9kYW5fc2tpbGwsOCk7XHJcbiAgICAgICAgc3VwZXIuYWRkTG9hZEJ5R2FtZUVmZmVjdElkKEdhbWVFZmZlY3RJZC5wYW9zaG91X3Bhb2Rhbl9za2lsbF9leCwyKTtcclxuICAgICAgICBzdXBlci5hZGRMb2FkQnlHYW1lRWZmZWN0SWQoR2FtZUVmZmVjdElkLnBhb3Nob3VfcGFvZGFuX2hpdCw4KTtcclxuICAgICAgICBzdXBlci5hZGRMb2FkQnlHYW1lRWZmZWN0SWQoR2FtZUVmZmVjdElkLnBhb3Nob3Vfc2tpbGxfaGl0LDgpO1xyXG4gICAgICAgIHN1cGVyLmFkZExvYWRCeUdhbWVFZmZlY3RJZChHYW1lRWZmZWN0SWQueHVhbnl1biw0KTtcclxuICAgICAgICBzdXBlci5hZGRMb2FkQnlHYW1lRWZmZWN0SWQoR2FtZUVmZmVjdElkLnBhb3Nob3Vfc2tpbGxfMiwxKTtcclxuICAgICAgICBzdXBlci5hZGRMb2FkQnlHYW1lRWZmZWN0SWQoR2FtZUVmZmVjdElkLnBhb3Nob3VfYWN0aXZlX3NraWxsXzEsMSk7XHJcbiAgICAgICAgc3VwZXIuYWRkTG9hZEJ5R2FtZUVmZmVjdElkKEdhbWVFZmZlY3RJZC5wYW9zaG91X2FjdGl2ZV9za2lsbF8yLDYpO1xyXG4gICAgICAgIHN1cGVyLmFkZExvYWRCeUdhbWVFZmZlY3RJZChHYW1lRWZmZWN0SWQucGFvc2hvdV9hY3RpdmVfc2tpbGxfdG91ZGFuLDYpO1xyXG4gICAgICAgIHN1cGVyLmFkZExvYWRCeUdhbWVFZmZlY3RJZChHYW1lRWZmZWN0SWQucGFvc2hvdV9kYXpoYW9feGluaGFvZGFuLDYpO1xyXG4gICAgICAgIHN1cGVyLmFkZExvYWRCeUdhbWVFZmZlY3RJZChHYW1lRWZmZWN0SWQucGFvc2hvdV9kYXpoYW9fd2VpeWFuLDYpO1xyXG4gICAgICAgIHN1cGVyLmFkZExvYWRCeUdhbWVFZmZlY3RJZChHYW1lRWZmZWN0SWQucGFvc2hvdV9kYXpoYW9fd2VpeWFuX2VuZCwxKTtcclxuICAgICAgICBzdXBlci5hZGRMb2FkQnlHYW1lRWZmZWN0SWQoR2FtZUVmZmVjdElkLnBhb3Nob3VfZGF6aGFvX3hpbmhhb2Rhbl9taWFvemh1biwxKTtcclxuICAgICAgICB0aGlzLmlzX0xvYWRMb2FkPXRydWU7XHJcbiAgICAgICAgdGhpcy5hZGRTa2lsbExpc3Rlbih0aGlzLnVzZVNraWxsKTtcclxuICAgICAgICB0aGlzLmFkZEF0dGFja0xpc3Rlbih0aGlzLm5vcm1hbEF0dGFjayk7XHJcbiAgICAgICAgdGhpcy5hZGRYdWFuWXVuTGlzdGVuKHRoaXMub25YdWFuWXVuUmVzdWx0KTsgICAgICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBzdGFydCgpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIuc3RhcnQoKTtcclxuICAgICAgICAvLyBpZih0aGlzLmhlcm9fZGF0YS5nZXRTa2lsbFZhbHVlMShTa2lsbFR5cGUuUGFzc2l2ZV8yKSl7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuc2NoZWR1bGUodGhpcy5jaGVja1NraWxsMix0aGlzLmhlcm9fZGF0YS5nZXRTa2lsbENvbGREb3duKFNraWxsVHlwZS5QYXNzaXZlXzIpKTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgdGhpcy5pc19uZWVkX2NoZWNrX2Rpc3RhbmNlPXRydWU7XHJcbiAgICAgICAgc3VwZXIuc2V0U2tpbGxUaXBTaXplKDQwMCw0MDApO1xyXG4gICAgICAgIGlmKExldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnN0YXJ0X2xldmVsPT0yJiZUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNTaG93VHV0b3JpYWxzKDIwNikpe1xyXG4gICAgICAgICAgICAvL3RoaXMuaGlkZUhlcm8oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25YdWFuWXVuUmVzdWx0KGlzWHVhbll1bjpib29sZWFuKXtcclxuICAgICAgICBpZihpc1h1YW5ZdW4pe1xyXG4gICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGVBbGxDYWxsYmFja3MoKTtcclxuICAgICAgICAgICAgLy8gaWYodGhpcy5oZXJvX2RhdGEuZ2V0U2tpbGxWYWx1ZTEoU2tpbGxUeXBlLlBhc3NpdmVfMikpe1xyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLmNoZWNrU2tpbGwyLHRoaXMuaGVyb19kYXRhLmdldFNraWxsQ29sZERvd24oU2tpbGxUeXBlLlBhc3NpdmVfMikpO1xyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIC8v5qC55o2u5LiK5Liq54q25oCB5Yik5pat6ZyA6KaB5YGa5LuA5LmIXHJcbiAgICAgICAgICAgIHRoaXMuc2V0SGVyb1N0YXRlKEhlcm9fU3RhdGUuaWRsZSxHb25nSmlfRmFuZ1hpYW5nLnpob25nKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLeaUu+WHuy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIGNyZWF0ZVBhb0RhbihpZDpHYW1lRWZmZWN0SWQscG9zOmNjLlZlYzIsdGFyZ2V0UG9zOmNjLlZlYzIsc3BlZWQ6bnVtYmVyLHNpemU6bnVtYmVyLGdqRGF0YTpHb25nSmlEYXRhKXtcclxuICAgICAgICBsZXQgbm9kZT1GaWdodGluZ01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChpZCxwb3MpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFBhb0RhbikuaW5pdChpZCxzcGVlZCx0YXJnZXRQb3MsZ2pEYXRhLHNpemUpO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZU5vcm1hbFBhb0RhbihpZDpHYW1lRWZmZWN0SWQscG9zOmNjLlZlYzIsZGlyOm51bWJlcixzcGVlZDpudW1iZXIsZ2pEYXRhOkdvbmdKaURhdGEpe1xyXG4gICAgICAgIGxldCBub2RlPUZpZ2h0aW5nTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKGlkLHBvcyk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoUGFvRGFuTm9ybWFsKS5pbml0KGlkLHNwZWVkLGRpcixnakRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIG5vcm1hbEF0dGFjayhtb25zdGVyOmNjLk5vZGUpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zdGF0ZSE9R2FtZVN0YXRlLkdhbWVfUGxheWluZylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuaXNfY2FuX2dvbmdqaT1mYWxzZTtcclxuICAgICAgICB0aGlzLnN0YXJ0QXR0YWNrKG1vbnN0ZXIuZ2V0UG9zaXRpb24oKSk7ICAgICAgXHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LllYX1Bhb3Nob3VBdHRhY2spO1xyXG4gICAgfVxyXG4gICAgLyoq5q+P5qyh5pS75Ye75Lya5a+55Y2K5b6Ee+WPguaVsDF96IyD5Zu05YaF6YCg5oiQe+WPguaVsDJ9JeS8pOWusyAqL1xyXG4gICAgc3RhcnRBdHRhY2soZW5lbXlQb3M6Y2MuVmVjMilcclxuICAgIHtcclxuICAgICAgICBsZXQgZmFuZ3hpYW5nPXN1cGVyLmdldEZhbmdYaWFuZ0J5UG9zKGVuZW15UG9zKTtcclxuICAgICAgICBsZXQgZGF0YT1uZXcgS2V5RnJhbWVEYXRhKCk7XHJcbiAgICAgICAgZGF0YS5uYW1lPVwiQXR0YWNrXCI7XHJcbiAgICAgICAgZGF0YS5jYWxsYmFjaz0oKT0+e1xyXG4gICAgICAgICAgICAvL+ato+S4reW/g1xyXG4gICAgICAgICAgICBsZXQgZ2pEYXRhPXN1cGVyLmdldEdvbmdKaURhdGEoRGFtYWdlVHlwZS5Ta2lsbCxmYWxzZSxTa2lsbFR5cGUuUGFzc2l2ZV8xLHRoaXMuaGVyb19kYXRhLmdldFNraWxsVmFsdWUyKFNraWxsVHlwZS5QYXNzaXZlXzEpKTtcclxuICAgICAgICAgICAgbGV0IGJ1bGxlY3RQb3M9c3VwZXIuZ2V0Q3JlYXRlQnVsbGV0UG9zKCk7ICBcclxuICAgICAgICAgICAgbGV0IHBhb0RhbklkPUdhbWVFZmZlY3RJZC5wYW9zaG91X3Bhb2Rhbl9za2lsbDtcclxuICAgICAgICAgICAgbGV0IHNpemU9dGhpcy5oZXJvX2RhdGEuZ2V0U2tpbGxWYWx1ZTEoU2tpbGxUeXBlLlBhc3NpdmVfMSk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlUGFvRGFuKHBhb0RhbklkLGJ1bGxlY3RQb3MsZW5lbXlQb3MsdGhpcy5idWxsZXRfc3BlZWQsc2l6ZSxnakRhdGEpO1xyXG4gICAgICAgICAgICBpZih0aGlzLmlzX2RvdWJsZV9hdHRhY2spe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXNldE5vcm1hbEF0dGFjaygpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ29uZ2ppX2ppc2h1PTA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgc3VwZXIuc2V0SGVyb1N0YXRlKEhlcm9fU3RhdGUuYXR0YWNrLGZhbmd4aWFuZyxbZGF0YV0sKCk9PnsgICAgICAgICAgICBcclxuICAgICAgICAgICAgc3VwZXIuc2V0SGVyb1N0YXRlKEhlcm9fU3RhdGUuaWRsZSxmYW5neGlhbmcpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGNoZWNrU2tpbGwxKGVuZW15UG9zOmNjLlZlYzIpOmJvb2xlYW57XHJcbiAgICAvLyAgICAgLy/mpoLnjodcclxuICAgIC8vICAgICBsZXQgcmF0ZT10aGlzLmhlcm9fZGF0YS5nZXRTa2lsbFZhbHVlMShTa2lsbFR5cGUuUGFzc2l2ZV8xKTtcclxuICAgIC8vICAgICBsZXQgcGFvRGFuSWQ9R2FtZUVmZmVjdElkLnBhb3Nob3VfcGFvZGFuX3NraWxsO1xyXG4gICAgLy8gICAgIGlmKHRoaXMuaGVyb19kYXRhLkV4Y2x1c2l2ZVdlYXBvblNraWxsVmFsdWVfMT4wICYmIHRoaXMubm9fcGFvcGFvX251bT49dGhpcy5oZXJvX2RhdGEuRXhjbHVzaXZlV2VhcG9uU2tpbGxWYWx1ZV8xKVxyXG4gICAgLy8gICAgIHtcclxuICAgIC8vICAgICAgICAgcmF0ZT0xO1xyXG4gICAgLy8gICAgICAgICBwYW9EYW5JZD1HYW1lRWZmZWN0SWQucGFvc2hvdV9wYW9kYW5fc2tpbGxfZXg7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgLy8gICAgIGlmKHJhdGUmJk1hdGgucmFuZG9tKCk8cmF0ZSl7XHJcbiAgICAvLyAgICAgICAgIHRoaXMuaXNfY2FuX2ppc2h1PWZhbHNlO1xyXG4gICAgLy8gICAgICAgICBsZXQgZGF0YT1uZXcgS2V5RnJhbWVEYXRhKCk7XHJcbiAgICAvLyAgICAgICAgIGRhdGEubmFtZT1cIkF0dGFja1wiO1xyXG4gICAgLy8gICAgICAgICBkYXRhLmNhbGxiYWNrPSgpPT57XHJcbiAgICAvLyAgICAgICAgICAgICBsZXQgYnVsbGVjdFBvcz1zdXBlci5nZXRDcmVhdGVCdWxsZXRQb3MoKTsgICAgXHJcbiAgICAvLyAgICAgICAgICAgICBsZXQgZ2pEYXRhPXN1cGVyLmdldEdvbmdKaURhdGEoRGFtYWdlVHlwZS5Ta2lsbCxmYWxzZSxTa2lsbFR5cGUuUGFzc2l2ZV8xLHRoaXMuaGVyb19kYXRhLmdldFNraWxsVmFsdWUzKFNraWxsVHlwZS5QYXNzaXZlXzEpKTtcclxuICAgIC8vICAgICAgICAgICAgIC8v56CB5pWwKjJcclxuICAgIC8vICAgICAgICAgICAgIGxldCBzaXplPXRoaXMuaGVyb19kYXRhLmdldFNraWxsVmFsdWUyKFNraWxsVHlwZS5QYXNzaXZlXzEpO1xyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5jcmVhdGVQYW9EYW4ocGFvRGFuSWQsYnVsbGVjdFBvcyxlbmVteVBvcyx0aGlzLmJ1bGxldF9zcGVlZCxzaXplLGdqRGF0YSk7XHJcbiAgICAvLyAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2Fubm9uKTtcclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICBzdXBlci5zZXRIZXJvU3RhdGVBbmRBbmltYXRpb24oSGVyb19TdGF0ZS5za2lsbCwnS2FpU2hpX0F0dGFjaycsZmFsc2UsW2RhdGFdLCgpPT57XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLmlzX2Nhbl9qaXNodT10cnVlO1xyXG4gICAgLy8gICAgICAgICAgICAgc3VwZXIuc2V0SGVyb1N0YXRlKEhlcm9fU3RhdGUuaWRsZSx0aGlzLmN1cl9mYW5neGlhbmcpO1xyXG4gICAgLy8gICAgICAgICB9KVxyXG4gICAgLy8gICAgICAgICB0aGlzLm5vX3Bhb3Bhb19udW09MDtcclxuICAgIC8vICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAvLyAgICAgfWVsc2V7XHJcbiAgICAvLyAgICAgICAgIHRoaXMubm9fcGFvcGFvX251bSsrO1xyXG4gICAgLy8gICAgICAgICByZXR1cm4gZmFsc2U7O1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH1cclxuICAgIC8vIC8qKkJVR++8muWPr+iDveiiq+ecqeaZleWQjuaXoOazleWGjeasoemHiuaUvuS6hizkvb/nlKh1cGRhdGXorqHmlbAgKi9cclxuICAgIC8vIGNoZWNrU2tpbGwyKCl7XHJcbiAgICAvLyAgICAgaWYoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zdGF0ZSE9R2FtZVN0YXRlLkdhbWVfUGxheWluZyl7XHJcbiAgICAvLyAgICAgICAgIHJldHVybjtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgICAgbGV0IG5vZGU9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdwcm9ncmVzc0JhcicpO1xyXG4gICAgLy8gICAgIG5vZGUuYWN0aXZlPXRydWU7XHJcbiAgICAvLyAgICAgbGV0IHByb2dyZXNzQmFyPW5vZGUuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKTtcclxuICAgIC8vICAgICBwcm9ncmVzc0Jhci5wcm9ncmVzcz0wO1xyXG4gICAgLy8gICAgIHRoaXMuaXNfY2FuX2ppc2h1PWZhbHNlO1xyXG4gICAgLy8gICAgIHN1cGVyLnNldEhlcm9TdGF0ZUFuZEFuaW1hdGlvbihIZXJvX1N0YXRlLnNraWxsLCdCdWZmJyxmYWxzZSxudWxsLCgpPT57XHJcbiAgICAvLyAgICAgICAgIHRoaXMuaXNfY2FuX2ppc2h1PXRydWU7XHJcbiAgICAvLyAgICAgICAgIHN1cGVyLnNldEhlcm9TdGF0ZShIZXJvX1N0YXRlLmlkbGUsdGhpcy5jdXJfZmFuZ3hpYW5nKTtcclxuICAgIC8vICAgICB9KVxyXG4gICAgLy8gICAgIGNjLnR3ZWVuKHByb2dyZXNzQmFyKS50bygwLjUse3Byb2dyZXNzOjF9KS5jYWxsKCgpPT57XHJcbiAgICAgICAgICAgIFxyXG4gICAgLy8gICAgICAgICAvL+WKoOihgDEw56eSXHJcbiAgICAvLyAgICAgICAgIC8vIGxldCBidWZmRGF0YT1uZXcgQnVmZkRhdGEoKTtcclxuICAgIC8vICAgICAgICAgLy8gYnVmZkRhdGEuYnVmZl9pZD1CdWZmSWQuSGVyb19QYW9TaG91X1NraWxsXzJfQWRkX0hwO1xyXG4gICAgLy8gICAgICAgICAvLyBidWZmRGF0YS5idWZmX3R5cGU9QnVmZlR5cGUuTm9ybWFsO1xyXG4gICAgLy8gICAgICAgICAvLyBidWZmRGF0YS5idWZmX3ZhbHVlPVt0aGlzLmhlcm9fZGF0YS5nZXRTa2lsbFZhbHVlMihTa2lsbFR5cGUuUGFzc2l2ZV8yKSt0aGlzLmhlcm9fZGF0YS5nZXRTa2lsbFZhbHVlMyhTa2lsbFR5cGUuUGFzc2l2ZV8yKSpHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLndhbGxfZGF0YS5nZXRNYXhIcCgpXTtcclxuICAgIC8vICAgICAgICAgLy8gYnVmZkRhdGEucmVjb3ZlcnlfamlhbmdlX3RpbWU9MTtcclxuICAgIC8vICAgICAgICAgLy8gYnVmZkRhdGEucmVtYWluX3RpbWU9MTA7XHJcbiAgICAvLyAgICAgICAgIC8vIHN1cGVyLmFkZEJ1ZmYoYnVmZkRhdGEpXHJcbiAgICAvLyAgICAgICAgIC8vIG5vZGUuYWN0aXZlPWZhbHNlO1xyXG4gICAgLy8gICAgICAgICAvLyAvL+WKoOS8pOWuszXnp5JcclxuICAgIC8vICAgICAgICAgLy8gbGV0IGJ1ZmZEYXRhMT1uZXcgQnVmZkRhdGEoKTtcclxuICAgIC8vICAgICAgICAgLy8gYnVmZkRhdGExLmJ1ZmZfaWQ9QnVmZklkLkhlcm9fUGFvU2hvdV9Ta2lsbF8yX0FkZF9EYW1hZ2U7XHJcbiAgICAvLyAgICAgICAgIC8vIGJ1ZmZEYXRhMS5idWZmX3R5cGU9QnVmZlR5cGUuTm9ybWFsO1xyXG4gICAgLy8gICAgICAgICAvLyBidWZmRGF0YTEuZ2FtZV9lZmZlY3RfaWQ9R2FtZUVmZmVjdElkLnBhb3Nob3Vfc2tpbGxfMjtcclxuICAgIC8vICAgICAgICAgLy8gYnVmZkRhdGExLmJ1ZmZfdmFsdWU9W3RoaXMuaGVyb19kYXRhLmdldFNraWxsVmFsdWUxKFNraWxsVHlwZS5QYXNzaXZlXzIpXTtcclxuICAgIC8vICAgICAgICAgLy8gYnVmZkRhdGExLnJlbWFpbl90aW1lPTU7XHJcbiAgICAvLyAgICAgICAgIC8vIHN1cGVyLmFkZEJ1ZmYoYnVmZkRhdGExKVxyXG4gICAgLy8gICAgIH0pLnN0YXJ0KCk7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgdXNlU2tpbGwocG9zOmNjLlZlYzIpOm51bWJlclxyXG4gICAge1xyXG4gICAgICAgIFNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlbGVhc2VTa2lsbCgoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0U2VsZlh1TGkocG9zKTtcclxuICAgICAgICB9LHRoaXMubm9kZSk7XHJcbiAgICAgICAgcmV0dXJuIDE7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRTZWxmWHVMaShwb3M6Y2MuVmVjMil7XHJcbiAgICAgICAgLy/ok4TlipvluKfnm5HlkKxcclxuICAgICAgICBsZXQgaGVyb1Jvb3Q9Y2MuZmluZCgnQ2FudmFzL0hlcm9fUm9vdCcpOyAgICAgICAgXHJcbiAgICAgICAgLy/lj5HlsITluKfnm5HlkKxcclxuICAgICAgICBsZXQgZmFzaGVEYXRhPW5ldyBLZXlGcmFtZURhdGEoKTtcclxuICAgICAgICBmYXNoZURhdGEubmFtZT1cIkZhU2hlXCI7XHJcbiAgICAgICAgZmFzaGVEYXRhLmNhbGxiYWNrPSgpPT57XHJcbiAgICAgICAgICAgIC8v5Y+v5Lul5Y+R5bCEXHJcbiAgICAgICAgICAgIFNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldFRpbWVTdG9wKGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnBhcmVudD1oZXJvUm9vdDtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnpJbmRleD0yOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0TGF1bmNoKHBvcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v6Iux6ZuE5Yqo5L2c5pKt5pS+XHJcbiAgICAgICAgdGhpcy5zZXRIZXJvU3RhdGUoSGVyb19TdGF0ZS5za2lsbCxHb25nSmlfRmFuZ1hpYW5nLnpob25nLFtmYXNoZURhdGFdLCgpPT57XHJcbiAgICAgICAgICAgIC8v5Yqo5L2c5a6M5q+V5ZCO54q25oCB6L+Y5piv5oqA6IO954q25oCB77yM5Yqo55S76KaB5pKt5pS+5b6F5py655qEXHJcbiAgICAgICAgICAgIHRoaXMucmVzZXRHb25nSmlKaVNodSgpO1xyXG4gICAgICAgICAgICB0aGlzLnNldEhlcm9TdGF0ZShIZXJvX1N0YXRlLmlkbGUsR29uZ0ppX0ZhbmdYaWFuZy56aG9uZyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5zcGluZS50aW1lU2NhbGU9SmlhU3U7XHJcbiAgICB9XHJcbiAgICAvKirlj5HlsITmlbDmnprngq7lvLnvvIzlr7nljYrlvoQyMDDnmoTnm67moIfljLrln5/ov5vooYx75Y+C5pWwMX3mrKHovbDngrjvvIzmr4/mrKHpgKDmiJB75Y+C5pWwMn0l5Lyk5a6zICovXHJcbiAgICBzdGFydExhdW5jaChwb3M6Y2MuVmVjMil7XHJcbiAgICAgICAgc3VwZXIuc2V0QXR0U3BpbmVTY2FsZSgpO1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5ZWF9QYW9TaG91U2tpbGwxKTtcclxuICAgICAgICBsZXQgbnVtPXRoaXMuaGVyb19kYXRhLmdldFNraWxsVmFsdWUxKFNraWxsVHlwZS5BY3RpdmUpXHJcbiAgICAgICAgbGV0IGdqRGF0YT1zdXBlci5nZXRHb25nSmlEYXRhKERhbWFnZVR5cGUuU2tpbGwsZmFsc2UsU2tpbGxUeXBlLkFjdGl2ZSx0aGlzLmhlcm9fZGF0YS5nZXRTa2lsbFZhbHVlMihTa2lsbFR5cGUuQWN0aXZlKSk7XHJcbiAgICAgICAgbGV0IHBpMj1NYXRoLlBJKjI7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8bnVtOyBpKyspe1xyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICAgICAgLy/ljYrlvoTpmo/mnLpcclxuICAgICAgICAgICAgICAgIGxldCByPU1hdGgucmFuZG9tKCkqMjAwO1xyXG4gICAgICAgICAgICAgICAgLy/lvKfluqbpmo/mnLpcclxuICAgICAgICAgICAgICAgIGxldCBodWR1PU1hdGgucmFuZG9tKCkqcGkyO1xyXG4gICAgICAgICAgICAgICAgLy/msYLngrlcclxuICAgICAgICAgICAgICAgIGxldCBwb3NYPXBvcy54K01hdGguY29zKGh1ZHUpKnI7XHJcbiAgICAgICAgICAgICAgICBsZXQgcG9zWT1wb3MueStNYXRoLnNpbihodWR1KSpyO1xyXG4gICAgICAgICAgICAgICAgbGV0IHRvdWRhbj1Ta3lNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLnBhb3Nob3VfYWN0aXZlX3NraWxsX3RvdWRhbixjYy52Mihwb3NYLHBvc1krMTYwMCkpO1xyXG4gICAgICAgICAgICAgICAgdG91ZGFuLmdldENvbXBvbmVudChUb3VEYW4pLmluaXQoR2FtZUVmZmVjdElkLnBhb3Nob3VfYWN0aXZlX3NraWxsX3RvdWRhbixjYy52Mihwb3NYLHBvc1kpLGdqRGF0YSk7XHJcbiAgICAgICAgICAgIH0sMC4xNSppKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXNTa2lsbFN0YXRlKGZhbHNlKTtcclxuICAgICAgICAvLyBsZXQgeGluaGFvZGFuPUdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RGb3JQYXJlbnQoR2FtZUVmZmVjdElkLnBhb3Nob3VfZGF6aGFvX3hpbmhhb2Rhbix0aGlzLmdldENyZWF0ZUJ1bGxldFBvcygpLFNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLm5vZGUpO1xyXG4gICAgICAgIC8vIGxldCBjZW5Qb3M9R2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGaWdodENlbnRlcigpO1xyXG4gICAgICAgIC8vIGxldCBvbGRQYXJlbnQ9dGhpcy5ub2RlLnBhcmVudDtcclxuICAgICAgICAvLyB0aGlzLm5vZGUucGFyZW50PVNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLm5vZGU7XHJcbiAgICAgICAgLy8gU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0VGltZVN0b3AodHJ1ZSk7XHJcbiAgICAgICAgLy8gU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc3RhcnRCYWlQaW5nKCk7XHJcbiAgICAgICAgLy8gTXlUb29sLnJhbmRvbVNjZW5lU2hha2UoLTUsNSwwLjAyLDYpO1xyXG4gICAgICAgIC8vIGxldCBtb25zdGVycz1Nb25zdGVyTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1vbnN0ZXJzRm9yTWF4QXR0YWsoMSx0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKSx0aGlzLmhlcm9fZGF0YS5nb25namlfZmFud2VpKTsgICAgICAgIFxyXG4gICAgICAgIC8vIGlmKG1vbnN0ZXJzKXtcclxuICAgICAgICAvLyAgICAgY2VuUG9zPW1vbnN0ZXJzWzBdLmdldFBvc2l0aW9uKCkuYWRkKGNjLnYyKDAsLTI1KSk7XHJcbiAgICAgICAgLy8gICAgIGlmKGNlblBvcy55PEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW5lbXlfYXR0X3kpe1xyXG4gICAgICAgIC8vICAgICAgICAgY2VuUG9zPW1vbnN0ZXJzWzBdLmdldFBvc2l0aW9uKCk7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gdGhpcy5zcGluZS50aW1lU2NhbGU9SmlhU3U7XHJcbiAgICAgICAgLy8geGluaGFvZGFuLmdldENvbXBvbmVudChTaWduYWxGbGFyZSkuaW5pdChHYW1lRWZmZWN0SWQucGFvc2hvdV9kYXpoYW9feGluaGFvZGFuLDYwMCxjZW5Qb3MsKCk9PnsgICAgICAgICAgICBcclxuICAgICAgICAvLyAgICAgdGhpcy5ub2RlLnBhcmVudD1vbGRQYXJlbnQ7XHJcbiAgICAgICAgLy8gICAgIHRoaXMubm9kZS56SW5kZXg9MjtcclxuICAgICAgICAvLyAgICAgdGhpcy5zcGluZS50aW1lU2NhbGU9MTtcclxuICAgICAgICAvLyAgICAgU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0VGltZVN0b3AoZmFsc2UpO1xyXG4gICAgICAgIC8vICAgICB0aGlzLnJlc2V0R29uZ0ppSmlTaHUoKTtcclxuICAgICAgICAvLyAgICAgc3VwZXIuc2V0SGVyb1N0YXRlKEhlcm9fU3RhdGUuaWRsZSx0aGlzLmN1cl9mYW5neGlhbmcpO1xyXG4gICAgICAgIC8vICAgICBsZXQgc3RhcnRZPS0oY2Mud2luU2l6ZS5oZWlnaHQvMisyMDApXHJcbiAgICAgICAgLy8gICAgIGxldCBlbmRZPWNjLndpblNpemUuaGVpZ2h0KzQwMDtcclxuICAgICAgICAvLyAgICAgbGV0IHNwZWVkPShlbmRZLXN0YXJ0WSkvMztcclxuICAgICAgICAvLyAgICAgbGV0IG5vZGU9U2t5TWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5wYW9zaG91X2FjdGl2ZV9za2lsbF8xLGNjLnYyKDAsc3RhcnRZKSk7XHJcbiAgICAgICAgLy8gICAgIGxldCBnakRhdGE9c3VwZXIuZ2V0R29uZ0ppRGF0YShEYW1hZ2VUeXBlLlNraWxsLGZhbHNlLHRoaXMuaGVyb19kYXRhLmdldFNraWxsVmFsdWUyKFNraWxsVHlwZS5BY3RpdmUpKTtcclxuICAgICAgICAvLyAgICAgY2MudHdlZW4obm9kZSkuYnkoMyx7eTplbmRZfSkuY2FsbCgoKT0+e1xyXG4gICAgICAgIC8vICAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZGVzdHJveUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5wYW9zaG91X2FjdGl2ZV9za2lsbF8xLG5vZGUpO1xyXG4gICAgICAgIC8vICAgICB9KS5zdGFydCgpO1xyXG4gICAgICAgIC8vICAgICBsZXQgcGFvTnVtPTA7XHJcbiAgICAgICAgLy8gICAgIGxldCByYWRpdXM9NTA7XHJcbiAgICAgICAgLy8gICAgIGxldCB0b3VkYW5DYWxsPSgpPT57XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAvLyAgICAgICAgIGxldCByYWRpYW49KHBhb051bSpNYXRoLlBJLzMpXHJcbiAgICAgICAgLy8gICAgICAgICBsZXQgcG9zWD1jZW5Qb3MueCtNYXRoLmNvcyhyYWRpYW4pKnJhZGl1cztcclxuICAgICAgICAvLyAgICAgICAgIGxldCBwb3NZPWNlblBvcy55K01hdGguc2luKHJhZGlhbikqcmFkaXVzO1xyXG4gICAgICAgIC8vICAgICAgICAgbGV0IHRvdWRhbj1Ta3lNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLnBhb3Nob3VfYWN0aXZlX3NraWxsX3RvdWRhbixjYy52Mihwb3NYLHBvc1krMTYwMCkpO1xyXG4gICAgICAgIC8vICAgICAgICAgLy8gbGV0IHRvdWRhbj1Ta3lNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLnBhb3Nob3VfYWN0aXZlX3NraWxsX3RvdWRhbixjYy52Mihwb3NYLChjYy53aW5TaXplLmhlaWdodC8yKzIwMCtzcGVlZCpwYW9OdW0pKSk7XHJcbiAgICAgICAgLy8gICAgICAgICAvLyBsZXQgeHg9MTA4KihwYW9OdW0lMj09MD8tMToxKTtcclxuICAgICAgICAvLyAgICAgICAgIC8vIGxldCB5eT1ub2RlLnkrMTAwO1xyXG4gICAgICAgIC8vICAgICAgICAgdG91ZGFuLmdldENvbXBvbmVudChUb3VEYW4pLmluaXQoR2FtZUVmZmVjdElkLnBhb3Nob3VfYWN0aXZlX3NraWxsX3RvdWRhbixjYy52Mihwb3NYLHBvc1kpLGdqRGF0YSk7XHJcbiAgICAgICAgLy8gICAgICAgICBwYW9OdW0rKztcclxuICAgICAgICAvLyAgICAgfTtcclxuICAgICAgICAvLyAgICAgdGhpcy5zY2hlZHVsZSh0b3VkYW5DYWxsLDAuMjUsNSwxKTtcclxuICAgICAgICAvLyAgICAgU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXNTa2lsbFN0YXRlKGZhbHNlKTtcclxuICAgICAgICAvLyB9KTsgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIC8vIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkud2FsbF9kYXRhLmFkZFNoaWVsZFZhbHVlKFNoaWVsZElkLlBhb1Nob3VfQWN0aXZlU2tpbGwsU2hpZWxkVHlwZS5BbGwsNSx0aGlzLmhlcm9fZGF0YS50b3RhbF9hdHRhY2sqdGhpcy5oZXJvX2RhdGEuZ2V0U2tpbGxWYWx1ZTEoU2tpbGxUeXBlLkFjdGl2ZSkpO1xyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuIl19