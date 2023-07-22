
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
            this.hideHero();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcR2FtZVxcUGFvU2hvdVxcUGFvU2hvdS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxnREFBc0Q7QUFDdEQsaUVBQTREO0FBQzVELHVFQUFnRTtBQUNoRSwyREFBc0Q7QUFDdEQsdURBQWtEO0FBQ2xELG9EQUErQztBQUMvQyw0REFBMkQ7QUFDM0QsNERBQTREO0FBQzVELGdFQUEyRDtBQUMzRCx3RUFBbUU7QUFFbkUsZ0NBQTJCO0FBQzNCLDRDQUEwRztBQUMxRyxtQ0FBOEI7QUFDOUIsK0NBQTBDO0FBQzFDLG1DQUE4QjtBQUV4QixJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFxQywyQkFBSTtJQUF6QztRQUFBLHFFQXdRQztRQXRRRyxpQkFBaUI7UUFDakIsbUJBQWEsR0FBUSxDQUFDLENBQUM7O0lBcVEzQixDQUFDO0lBblFHLHdCQUFNLEdBQU47UUFFSSxpQkFBTSxNQUFNLFdBQUUsQ0FBQztRQUNmLGlCQUFNLHFCQUFxQixZQUFDLGlDQUFZLENBQUMsa0JBQWtCLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0QsaUJBQU0scUJBQXFCLFlBQUMsaUNBQVksQ0FBQyxvQkFBb0IsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUNqRSxpQkFBTSxxQkFBcUIsWUFBQyxpQ0FBWSxDQUFDLHVCQUF1QixFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BFLGlCQUFNLHFCQUFxQixZQUFDLGlDQUFZLENBQUMsa0JBQWtCLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0QsaUJBQU0scUJBQXFCLFlBQUMsaUNBQVksQ0FBQyxpQkFBaUIsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUM5RCxpQkFBTSxxQkFBcUIsWUFBQyxpQ0FBWSxDQUFDLE9BQU8sRUFBQyxDQUFDLENBQUMsQ0FBQztR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O1FBQ2pDLG1IQUFtSDtRQUNuSCw4R0FBOEc7UUFDOUcsK0NBQStDO1FBQy9DLDRHQUE0RztRQUM1RyxrQkFBa0I7UUFDbEIsb0JBQW9CO1FBQ3BCLHFCQUFxQjtRQUNyQiwyQkFBMkI7UUFFM0Isd0NBQXdDO1FBQ3hDLHFEQUFxRDtRQUNyRCxxREFBcUQ7UUFDckQsb0lBQW9JO1FBQ3BJLG9LQUFvSztRQUNwSyw0Q0FBNEM7UUFDNUMsZ0NBQWdDO1FBQ2hDLDhHQUE4RztRQUM5RyxvQkFBb0I7UUFDcEIsU0FBUztRQUNULDBDQUEwQztRQUMxQyx5REFBeUQ7UUFDekQsMEJBQTBCO1FBQzFCLGlMQUFpTDtJQUNyTCxDQUFDO0lBdFFnQixPQUFPO1FBRDNCLE9BQU87T0FDYSxPQUFPLENBd1EzQjtJQUFELGNBQUM7Q0F4UUQsQUF3UUMsQ0F4UW9DLGNBQUksR0F3UXhDO2tCQXhRb0IsT0FBTyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgeyBHYW1lU3RhdGUsIEppYVN1IH0gZnJvbSBcIi4uLy4uLy4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgRmlnaHRpbmdNYW5hZ2VyIGZyb20gXCIuLi8uLi8uLi9HYW1lL0ZpZ2h0aW5nTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBHYW1lRWZmZWN0SWQgfSBmcm9tIFwiLi4vLi4vLi4vR2FtZS9HYW1lRWZmZWN0c01hbmFnZXJcIjtcclxuaW1wb3J0IFNraWxsTWFuYWdlciBmcm9tIFwiLi4vLi4vLi4vR2FtZS9Ta2lsbE1hbmFnZXJcIjtcclxuaW1wb3J0IFNreU1hbmFnZXIgZnJvbSBcIi4uLy4uLy4uL0dhbWUvU2t5TWFuYWdlclwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uLy4uLy4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IExldmVsTWFuYWdlciB9IGZyb20gXCIuLi8uLi8uLi9MZXZlbC9MZXZlbE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgS2V5RnJhbWVEYXRhIH0gZnJvbSBcIi4uLy4uLy4uL01vbnN0ZXIvTW9uc3RlckRhdGFcIjtcclxuaW1wb3J0IHsgU291bmRJbmRleCB9IGZyb20gXCIuLi8uLi8uLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgVHV0b3JhaWxzTWFuYWdlciBmcm9tIFwiLi4vLi4vLi4vVHV0b3JpYWxzL1R1dG9yYWlsc01hbmFnZXJcIjtcclxuaW1wb3J0IHsgR29uZ0ppRGF0YSB9IGZyb20gXCIuLi8uLi9EYXRhL0hlcm9EYXRhXCI7XHJcbmltcG9ydCBIZXJvIGZyb20gXCIuLi9IZXJvXCI7XHJcbmltcG9ydCB7IERhbWFnZVR5cGUsIEdvbmdKaV9GYW5nWGlhbmcsIEhlcm9fU3RhdGUsIFNoaWVsZElkLCBTaGllbGRUeXBlLCBTa2lsbFR5cGUgfSBmcm9tIFwiLi4vSGVyb0NvbmZpZ1wiO1xyXG5pbXBvcnQgUGFvRGFuIGZyb20gXCIuL1Bhb0RhblwiO1xyXG5pbXBvcnQgUGFvRGFuTm9ybWFsIGZyb20gXCIuL1Bhb0Rhbk5vcm1hbFwiO1xyXG5pbXBvcnQgVG91RGFuIGZyb20gXCIuL1RvdURhblwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYW9TaG91IGV4dGVuZHMgSGVybyB7XHJcbiAgICBcclxuICAgIC8qKuayoeacieinpuWPkeiiq+WKqOeCruW8ueeahOasoeaVsCAqL1xyXG4gICAgbm9fcGFvcGFvX251bTpudW1iZXI9MDtcclxuXHJcbiAgICBvbkxvYWQoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xyXG4gICAgICAgIHN1cGVyLmFkZExvYWRCeUdhbWVFZmZlY3RJZChHYW1lRWZmZWN0SWQucGFvc2hvdV9wYW9kYW5fYXR0LDgpO1xyXG4gICAgICAgIHN1cGVyLmFkZExvYWRCeUdhbWVFZmZlY3RJZChHYW1lRWZmZWN0SWQucGFvc2hvdV9wYW9kYW5fc2tpbGwsOCk7XHJcbiAgICAgICAgc3VwZXIuYWRkTG9hZEJ5R2FtZUVmZmVjdElkKEdhbWVFZmZlY3RJZC5wYW9zaG91X3Bhb2Rhbl9za2lsbF9leCwyKTtcclxuICAgICAgICBzdXBlci5hZGRMb2FkQnlHYW1lRWZmZWN0SWQoR2FtZUVmZmVjdElkLnBhb3Nob3VfcGFvZGFuX2hpdCw4KTtcclxuICAgICAgICBzdXBlci5hZGRMb2FkQnlHYW1lRWZmZWN0SWQoR2FtZUVmZmVjdElkLnBhb3Nob3Vfc2tpbGxfaGl0LDgpO1xyXG4gICAgICAgIHN1cGVyLmFkZExvYWRCeUdhbWVFZmZlY3RJZChHYW1lRWZmZWN0SWQueHVhbnl1biw0KTtcclxuICAgICAgICBzdXBlci5hZGRMb2FkQnlHYW1lRWZmZWN0SWQoR2FtZUVmZmVjdElkLnBhb3Nob3Vfc2tpbGxfMiwxKTtcclxuICAgICAgICBzdXBlci5hZGRMb2FkQnlHYW1lRWZmZWN0SWQoR2FtZUVmZmVjdElkLnBhb3Nob3VfYWN0aXZlX3NraWxsXzEsMSk7XHJcbiAgICAgICAgc3VwZXIuYWRkTG9hZEJ5R2FtZUVmZmVjdElkKEdhbWVFZmZlY3RJZC5wYW9zaG91X2FjdGl2ZV9za2lsbF8yLDYpO1xyXG4gICAgICAgIHN1cGVyLmFkZExvYWRCeUdhbWVFZmZlY3RJZChHYW1lRWZmZWN0SWQucGFvc2hvdV9hY3RpdmVfc2tpbGxfdG91ZGFuLDYpO1xyXG4gICAgICAgIHN1cGVyLmFkZExvYWRCeUdhbWVFZmZlY3RJZChHYW1lRWZmZWN0SWQucGFvc2hvdV9kYXpoYW9feGluaGFvZGFuLDYpO1xyXG4gICAgICAgIHN1cGVyLmFkZExvYWRCeUdhbWVFZmZlY3RJZChHYW1lRWZmZWN0SWQucGFvc2hvdV9kYXpoYW9fd2VpeWFuLDYpO1xyXG4gICAgICAgIHN1cGVyLmFkZExvYWRCeUdhbWVFZmZlY3RJZChHYW1lRWZmZWN0SWQucGFvc2hvdV9kYXpoYW9fd2VpeWFuX2VuZCwxKTtcclxuICAgICAgICBzdXBlci5hZGRMb2FkQnlHYW1lRWZmZWN0SWQoR2FtZUVmZmVjdElkLnBhb3Nob3VfZGF6aGFvX3hpbmhhb2Rhbl9taWFvemh1biwxKTtcclxuICAgICAgICB0aGlzLmlzX0xvYWRMb2FkPXRydWU7XHJcbiAgICAgICAgdGhpcy5hZGRTa2lsbExpc3Rlbih0aGlzLnVzZVNraWxsKTtcclxuICAgICAgICB0aGlzLmFkZEF0dGFja0xpc3Rlbih0aGlzLm5vcm1hbEF0dGFjayk7XHJcbiAgICAgICAgdGhpcy5hZGRYdWFuWXVuTGlzdGVuKHRoaXMub25YdWFuWXVuUmVzdWx0KTsgICAgICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBzdGFydCgpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIuc3RhcnQoKTtcclxuICAgICAgICAvLyBpZih0aGlzLmhlcm9fZGF0YS5nZXRTa2lsbFZhbHVlMShTa2lsbFR5cGUuUGFzc2l2ZV8yKSl7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuc2NoZWR1bGUodGhpcy5jaGVja1NraWxsMix0aGlzLmhlcm9fZGF0YS5nZXRTa2lsbENvbGREb3duKFNraWxsVHlwZS5QYXNzaXZlXzIpKTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgdGhpcy5pc19uZWVkX2NoZWNrX2Rpc3RhbmNlPXRydWU7XHJcbiAgICAgICAgc3VwZXIuc2V0U2tpbGxUaXBTaXplKDQwMCw0MDApO1xyXG4gICAgICAgIGlmKExldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnN0YXJ0X2xldmVsPT0yJiZUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNTaG93VHV0b3JpYWxzKDIwNikpe1xyXG4gICAgICAgICAgICB0aGlzLmhpZGVIZXJvKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uWHVhbll1blJlc3VsdChpc1h1YW5ZdW46Ym9vbGVhbil7XHJcbiAgICAgICAgaWYoaXNYdWFuWXVuKXtcclxuICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzKCk7XHJcbiAgICAgICAgICAgIC8vIGlmKHRoaXMuaGVyb19kYXRhLmdldFNraWxsVmFsdWUxKFNraWxsVHlwZS5QYXNzaXZlXzIpKXtcclxuICAgICAgICAgICAgLy8gICAgIHRoaXMuc2NoZWR1bGUodGhpcy5jaGVja1NraWxsMix0aGlzLmhlcm9fZGF0YS5nZXRTa2lsbENvbGREb3duKFNraWxsVHlwZS5QYXNzaXZlXzIpKTtcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAvL+agueaNruS4iuS4queKtuaAgeWIpOaWremcgOimgeWBmuS7gOS5iFxyXG4gICAgICAgICAgICB0aGlzLnNldEhlcm9TdGF0ZShIZXJvX1N0YXRlLmlkbGUsR29uZ0ppX0ZhbmdYaWFuZy56aG9uZyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3mlLvlh7stLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBjcmVhdGVQYW9EYW4oaWQ6R2FtZUVmZmVjdElkLHBvczpjYy5WZWMyLHRhcmdldFBvczpjYy5WZWMyLHNwZWVkOm51bWJlcixzaXplOm51bWJlcixnakRhdGE6R29uZ0ppRGF0YSl7XHJcbiAgICAgICAgbGV0IG5vZGU9RmlnaHRpbmdNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoaWQscG9zKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChQYW9EYW4pLmluaXQoaWQsc3BlZWQsdGFyZ2V0UG9zLGdqRGF0YSxzaXplKTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVOb3JtYWxQYW9EYW4oaWQ6R2FtZUVmZmVjdElkLHBvczpjYy5WZWMyLGRpcjpudW1iZXIsc3BlZWQ6bnVtYmVyLGdqRGF0YTpHb25nSmlEYXRhKXtcclxuICAgICAgICBsZXQgbm9kZT1GaWdodGluZ01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChpZCxwb3MpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFBhb0Rhbk5vcm1hbCkuaW5pdChpZCxzcGVlZCxkaXIsZ2pEYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICBub3JtYWxBdHRhY2sobW9uc3RlcjpjYy5Ob2RlKVxyXG4gICAge1xyXG4gICAgICAgIGlmKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfc3RhdGUhPUdhbWVTdGF0ZS5HYW1lX1BsYXlpbmcpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB0aGlzLmlzX2Nhbl9nb25namk9ZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zdGFydEF0dGFjayhtb25zdGVyLmdldFBvc2l0aW9uKCkpOyAgICAgIFxyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5ZWF9QYW9zaG91QXR0YWNrKTtcclxuICAgIH1cclxuICAgIC8qKuavj+asoeaUu+WHu+S8muWvueWNiuW+hHvlj4LmlbAxfeiMg+WbtOWGhemAoOaIkHvlj4LmlbAyfSXkvKTlrrMgKi9cclxuICAgIHN0YXJ0QXR0YWNrKGVuZW15UG9zOmNjLlZlYzIpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGZhbmd4aWFuZz1zdXBlci5nZXRGYW5nWGlhbmdCeVBvcyhlbmVteVBvcyk7XHJcbiAgICAgICAgbGV0IGRhdGE9bmV3IEtleUZyYW1lRGF0YSgpO1xyXG4gICAgICAgIGRhdGEubmFtZT1cIkF0dGFja1wiO1xyXG4gICAgICAgIGRhdGEuY2FsbGJhY2s9KCk9PntcclxuICAgICAgICAgICAgLy/mraPkuK3lv4NcclxuICAgICAgICAgICAgbGV0IGdqRGF0YT1zdXBlci5nZXRHb25nSmlEYXRhKERhbWFnZVR5cGUuU2tpbGwsZmFsc2UsU2tpbGxUeXBlLlBhc3NpdmVfMSx0aGlzLmhlcm9fZGF0YS5nZXRTa2lsbFZhbHVlMihTa2lsbFR5cGUuUGFzc2l2ZV8xKSk7XHJcbiAgICAgICAgICAgIGxldCBidWxsZWN0UG9zPXN1cGVyLmdldENyZWF0ZUJ1bGxldFBvcygpOyAgXHJcbiAgICAgICAgICAgIGxldCBwYW9EYW5JZD1HYW1lRWZmZWN0SWQucGFvc2hvdV9wYW9kYW5fc2tpbGw7XHJcbiAgICAgICAgICAgIGxldCBzaXplPXRoaXMuaGVyb19kYXRhLmdldFNraWxsVmFsdWUxKFNraWxsVHlwZS5QYXNzaXZlXzEpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVBhb0RhbihwYW9EYW5JZCxidWxsZWN0UG9zLGVuZW15UG9zLHRoaXMuYnVsbGV0X3NwZWVkLHNpemUsZ2pEYXRhKTtcclxuICAgICAgICAgICAgaWYodGhpcy5pc19kb3VibGVfYXR0YWNrKXtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVzZXROb3JtYWxBdHRhY2soKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdvbmdqaV9qaXNodT0wO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN1cGVyLnNldEhlcm9TdGF0ZShIZXJvX1N0YXRlLmF0dGFjayxmYW5neGlhbmcsW2RhdGFdLCgpPT57ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHN1cGVyLnNldEhlcm9TdGF0ZShIZXJvX1N0YXRlLmlkbGUsZmFuZ3hpYW5nKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBjaGVja1NraWxsMShlbmVteVBvczpjYy5WZWMyKTpib29sZWFue1xyXG4gICAgLy8gICAgIC8v5qaC546HXHJcbiAgICAvLyAgICAgbGV0IHJhdGU9dGhpcy5oZXJvX2RhdGEuZ2V0U2tpbGxWYWx1ZTEoU2tpbGxUeXBlLlBhc3NpdmVfMSk7XHJcbiAgICAvLyAgICAgbGV0IHBhb0RhbklkPUdhbWVFZmZlY3RJZC5wYW9zaG91X3Bhb2Rhbl9za2lsbDtcclxuICAgIC8vICAgICBpZih0aGlzLmhlcm9fZGF0YS5FeGNsdXNpdmVXZWFwb25Ta2lsbFZhbHVlXzE+MCAmJiB0aGlzLm5vX3Bhb3Bhb19udW0+PXRoaXMuaGVyb19kYXRhLkV4Y2x1c2l2ZVdlYXBvblNraWxsVmFsdWVfMSlcclxuICAgIC8vICAgICB7XHJcbiAgICAvLyAgICAgICAgIHJhdGU9MTtcclxuICAgIC8vICAgICAgICAgcGFvRGFuSWQ9R2FtZUVmZmVjdElkLnBhb3Nob3VfcGFvZGFuX3NraWxsX2V4O1xyXG4gICAgLy8gICAgIH1cclxuICAgICAgICBcclxuICAgIC8vICAgICBpZihyYXRlJiZNYXRoLnJhbmRvbSgpPHJhdGUpe1xyXG4gICAgLy8gICAgICAgICB0aGlzLmlzX2Nhbl9qaXNodT1mYWxzZTtcclxuICAgIC8vICAgICAgICAgbGV0IGRhdGE9bmV3IEtleUZyYW1lRGF0YSgpO1xyXG4gICAgLy8gICAgICAgICBkYXRhLm5hbWU9XCJBdHRhY2tcIjtcclxuICAgIC8vICAgICAgICAgZGF0YS5jYWxsYmFjaz0oKT0+e1xyXG4gICAgLy8gICAgICAgICAgICAgbGV0IGJ1bGxlY3RQb3M9c3VwZXIuZ2V0Q3JlYXRlQnVsbGV0UG9zKCk7ICAgIFxyXG4gICAgLy8gICAgICAgICAgICAgbGV0IGdqRGF0YT1zdXBlci5nZXRHb25nSmlEYXRhKERhbWFnZVR5cGUuU2tpbGwsZmFsc2UsU2tpbGxUeXBlLlBhc3NpdmVfMSx0aGlzLmhlcm9fZGF0YS5nZXRTa2lsbFZhbHVlMyhTa2lsbFR5cGUuUGFzc2l2ZV8xKSk7XHJcbiAgICAvLyAgICAgICAgICAgICAvL+eggeaVsCoyXHJcbiAgICAvLyAgICAgICAgICAgICBsZXQgc2l6ZT10aGlzLmhlcm9fZGF0YS5nZXRTa2lsbFZhbHVlMihTa2lsbFR5cGUuUGFzc2l2ZV8xKTtcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMuY3JlYXRlUGFvRGFuKHBhb0RhbklkLGJ1bGxlY3RQb3MsZW5lbXlQb3MsdGhpcy5idWxsZXRfc3BlZWQsc2l6ZSxnakRhdGEpO1xyXG4gICAgLy8gICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNhbm5vbik7XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgc3VwZXIuc2V0SGVyb1N0YXRlQW5kQW5pbWF0aW9uKEhlcm9fU3RhdGUuc2tpbGwsJ0thaVNoaV9BdHRhY2snLGZhbHNlLFtkYXRhXSwoKT0+e1xyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5pc19jYW5famlzaHU9dHJ1ZTtcclxuICAgIC8vICAgICAgICAgICAgIHN1cGVyLnNldEhlcm9TdGF0ZShIZXJvX1N0YXRlLmlkbGUsdGhpcy5jdXJfZmFuZ3hpYW5nKTtcclxuICAgIC8vICAgICAgICAgfSlcclxuICAgIC8vICAgICAgICAgdGhpcy5ub19wYW9wYW9fbnVtPTA7XHJcbiAgICAvLyAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgLy8gICAgIH1lbHNle1xyXG4gICAgLy8gICAgICAgICB0aGlzLm5vX3Bhb3Bhb19udW0rKztcclxuICAgIC8vICAgICAgICAgcmV0dXJuIGZhbHNlOztcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9XHJcbiAgICAvLyAvKipCVUfvvJrlj6/og73ooqvnnKnmmZXlkI7ml6Dms5Xlho3mrKHph4rmlL7kuoYs5L2/55SodXBkYXRl6K6h5pWwICovXHJcbiAgICAvLyBjaGVja1NraWxsMigpe1xyXG4gICAgLy8gICAgIGlmKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfc3RhdGUhPUdhbWVTdGF0ZS5HYW1lX1BsYXlpbmcpe1xyXG4gICAgLy8gICAgICAgICByZXR1cm47XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gICAgIGxldCBub2RlPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgncHJvZ3Jlc3NCYXInKTtcclxuICAgIC8vICAgICBub2RlLmFjdGl2ZT10cnVlO1xyXG4gICAgLy8gICAgIGxldCBwcm9ncmVzc0Jhcj1ub2RlLmdldENvbXBvbmVudChjYy5Qcm9ncmVzc0Jhcik7XHJcbiAgICAvLyAgICAgcHJvZ3Jlc3NCYXIucHJvZ3Jlc3M9MDtcclxuICAgIC8vICAgICB0aGlzLmlzX2Nhbl9qaXNodT1mYWxzZTtcclxuICAgIC8vICAgICBzdXBlci5zZXRIZXJvU3RhdGVBbmRBbmltYXRpb24oSGVyb19TdGF0ZS5za2lsbCwnQnVmZicsZmFsc2UsbnVsbCwoKT0+e1xyXG4gICAgLy8gICAgICAgICB0aGlzLmlzX2Nhbl9qaXNodT10cnVlO1xyXG4gICAgLy8gICAgICAgICBzdXBlci5zZXRIZXJvU3RhdGUoSGVyb19TdGF0ZS5pZGxlLHRoaXMuY3VyX2Zhbmd4aWFuZyk7XHJcbiAgICAvLyAgICAgfSlcclxuICAgIC8vICAgICBjYy50d2Vlbihwcm9ncmVzc0JhcikudG8oMC41LHtwcm9ncmVzczoxfSkuY2FsbCgoKT0+e1xyXG4gICAgICAgICAgICBcclxuICAgIC8vICAgICAgICAgLy/liqDooYAxMOenklxyXG4gICAgLy8gICAgICAgICAvLyBsZXQgYnVmZkRhdGE9bmV3IEJ1ZmZEYXRhKCk7XHJcbiAgICAvLyAgICAgICAgIC8vIGJ1ZmZEYXRhLmJ1ZmZfaWQ9QnVmZklkLkhlcm9fUGFvU2hvdV9Ta2lsbF8yX0FkZF9IcDtcclxuICAgIC8vICAgICAgICAgLy8gYnVmZkRhdGEuYnVmZl90eXBlPUJ1ZmZUeXBlLk5vcm1hbDtcclxuICAgIC8vICAgICAgICAgLy8gYnVmZkRhdGEuYnVmZl92YWx1ZT1bdGhpcy5oZXJvX2RhdGEuZ2V0U2tpbGxWYWx1ZTIoU2tpbGxUeXBlLlBhc3NpdmVfMikrdGhpcy5oZXJvX2RhdGEuZ2V0U2tpbGxWYWx1ZTMoU2tpbGxUeXBlLlBhc3NpdmVfMikqR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS53YWxsX2RhdGEuZ2V0TWF4SHAoKV07XHJcbiAgICAvLyAgICAgICAgIC8vIGJ1ZmZEYXRhLnJlY292ZXJ5X2ppYW5nZV90aW1lPTE7XHJcbiAgICAvLyAgICAgICAgIC8vIGJ1ZmZEYXRhLnJlbWFpbl90aW1lPTEwO1xyXG4gICAgLy8gICAgICAgICAvLyBzdXBlci5hZGRCdWZmKGJ1ZmZEYXRhKVxyXG4gICAgLy8gICAgICAgICAvLyBub2RlLmFjdGl2ZT1mYWxzZTtcclxuICAgIC8vICAgICAgICAgLy8gLy/liqDkvKTlrrM156eSXHJcbiAgICAvLyAgICAgICAgIC8vIGxldCBidWZmRGF0YTE9bmV3IEJ1ZmZEYXRhKCk7XHJcbiAgICAvLyAgICAgICAgIC8vIGJ1ZmZEYXRhMS5idWZmX2lkPUJ1ZmZJZC5IZXJvX1Bhb1Nob3VfU2tpbGxfMl9BZGRfRGFtYWdlO1xyXG4gICAgLy8gICAgICAgICAvLyBidWZmRGF0YTEuYnVmZl90eXBlPUJ1ZmZUeXBlLk5vcm1hbDtcclxuICAgIC8vICAgICAgICAgLy8gYnVmZkRhdGExLmdhbWVfZWZmZWN0X2lkPUdhbWVFZmZlY3RJZC5wYW9zaG91X3NraWxsXzI7XHJcbiAgICAvLyAgICAgICAgIC8vIGJ1ZmZEYXRhMS5idWZmX3ZhbHVlPVt0aGlzLmhlcm9fZGF0YS5nZXRTa2lsbFZhbHVlMShTa2lsbFR5cGUuUGFzc2l2ZV8yKV07XHJcbiAgICAvLyAgICAgICAgIC8vIGJ1ZmZEYXRhMS5yZW1haW5fdGltZT01O1xyXG4gICAgLy8gICAgICAgICAvLyBzdXBlci5hZGRCdWZmKGJ1ZmZEYXRhMSlcclxuICAgIC8vICAgICB9KS5zdGFydCgpO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIHVzZVNraWxsKHBvczpjYy5WZWMyKTpudW1iZXJcclxuICAgIHtcclxuICAgICAgICBTa2lsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZWxlYXNlU2tpbGwoKCk9PntcclxuICAgICAgICAgICAgdGhpcy5zdGFydFNlbGZYdUxpKHBvcyk7XHJcbiAgICAgICAgfSx0aGlzLm5vZGUpO1xyXG4gICAgICAgIHJldHVybiAxO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0U2VsZlh1TGkocG9zOmNjLlZlYzIpe1xyXG4gICAgICAgIC8v6JOE5Yqb5bin55uR5ZCsXHJcbiAgICAgICAgbGV0IGhlcm9Sb290PWNjLmZpbmQoJ0NhbnZhcy9IZXJvX1Jvb3QnKTsgICAgICAgIFxyXG4gICAgICAgIC8v5Y+R5bCE5bin55uR5ZCsXHJcbiAgICAgICAgbGV0IGZhc2hlRGF0YT1uZXcgS2V5RnJhbWVEYXRhKCk7XHJcbiAgICAgICAgZmFzaGVEYXRhLm5hbWU9XCJGYVNoZVwiO1xyXG4gICAgICAgIGZhc2hlRGF0YS5jYWxsYmFjaz0oKT0+e1xyXG4gICAgICAgICAgICAvL+WPr+S7peWPkeWwhFxyXG4gICAgICAgICAgICBTa2lsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRUaW1lU3RvcChmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5wYXJlbnQ9aGVyb1Jvb3Q7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS56SW5kZXg9MjsgICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5zdGFydExhdW5jaChwb3MpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+iLsembhOWKqOS9nOaSreaUvlxyXG4gICAgICAgIHRoaXMuc2V0SGVyb1N0YXRlKEhlcm9fU3RhdGUuc2tpbGwsR29uZ0ppX0ZhbmdYaWFuZy56aG9uZyxbZmFzaGVEYXRhXSwoKT0+e1xyXG4gICAgICAgICAgICAvL+WKqOS9nOWujOavleWQjueKtuaAgei/mOaYr+aKgOiDveeKtuaAge+8jOWKqOeUu+imgeaSreaUvuW+heacuueahFxyXG4gICAgICAgICAgICB0aGlzLnJlc2V0R29uZ0ppSmlTaHUoKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRIZXJvU3RhdGUoSGVyb19TdGF0ZS5pZGxlLEdvbmdKaV9GYW5nWGlhbmcuemhvbmcpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc3BpbmUudGltZVNjYWxlPUppYVN1O1xyXG4gICAgfVxyXG4gICAgLyoq5Y+R5bCE5pWw5p6a54Ku5by577yM5a+55Y2K5b6EMjAw55qE55uu5qCH5Yy65Z+f6L+b6KGMe+WPguaVsDF95qyh6L2w54K477yM5q+P5qyh6YCg5oiQe+WPguaVsDJ9JeS8pOWusyAqL1xyXG4gICAgc3RhcnRMYXVuY2gocG9zOmNjLlZlYzIpe1xyXG4gICAgICAgIHN1cGVyLnNldEF0dFNwaW5lU2NhbGUoKTtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguWVhfUGFvU2hvdVNraWxsMSk7XHJcbiAgICAgICAgbGV0IG51bT10aGlzLmhlcm9fZGF0YS5nZXRTa2lsbFZhbHVlMShTa2lsbFR5cGUuQWN0aXZlKVxyXG4gICAgICAgIGxldCBnakRhdGE9c3VwZXIuZ2V0R29uZ0ppRGF0YShEYW1hZ2VUeXBlLlNraWxsLGZhbHNlLFNraWxsVHlwZS5BY3RpdmUsdGhpcy5oZXJvX2RhdGEuZ2V0U2tpbGxWYWx1ZTIoU2tpbGxUeXBlLkFjdGl2ZSkpO1xyXG4gICAgICAgIGxldCBwaTI9TWF0aC5QSSoyO1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPG51bTsgaSsrKXtcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgICAgIC8v5Y2K5b6E6ZqP5py6XHJcbiAgICAgICAgICAgICAgICBsZXQgcj1NYXRoLnJhbmRvbSgpKjIwMDtcclxuICAgICAgICAgICAgICAgIC8v5byn5bqm6ZqP5py6XHJcbiAgICAgICAgICAgICAgICBsZXQgaHVkdT1NYXRoLnJhbmRvbSgpKnBpMjtcclxuICAgICAgICAgICAgICAgIC8v5rGC54K5XHJcbiAgICAgICAgICAgICAgICBsZXQgcG9zWD1wb3MueCtNYXRoLmNvcyhodWR1KSpyO1xyXG4gICAgICAgICAgICAgICAgbGV0IHBvc1k9cG9zLnkrTWF0aC5zaW4oaHVkdSkqcjtcclxuICAgICAgICAgICAgICAgIGxldCB0b3VkYW49U2t5TWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5wYW9zaG91X2FjdGl2ZV9za2lsbF90b3VkYW4sY2MudjIocG9zWCxwb3NZKzE2MDApKTtcclxuICAgICAgICAgICAgICAgIHRvdWRhbi5nZXRDb21wb25lbnQoVG91RGFuKS5pbml0KEdhbWVFZmZlY3RJZC5wYW9zaG91X2FjdGl2ZV9za2lsbF90b3VkYW4sY2MudjIocG9zWCxwb3NZKSxnakRhdGEpO1xyXG4gICAgICAgICAgICB9LDAuMTUqaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldElzU2tpbGxTdGF0ZShmYWxzZSk7XHJcbiAgICAgICAgLy8gbGV0IHhpbmhhb2Rhbj1HYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0Rm9yUGFyZW50KEdhbWVFZmZlY3RJZC5wYW9zaG91X2Rhemhhb194aW5oYW9kYW4sdGhpcy5nZXRDcmVhdGVCdWxsZXRQb3MoKSxTa2lsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5ub2RlKTtcclxuICAgICAgICAvLyBsZXQgY2VuUG9zPUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RmlnaHRDZW50ZXIoKTtcclxuICAgICAgICAvLyBsZXQgb2xkUGFyZW50PXRoaXMubm9kZS5wYXJlbnQ7XHJcbiAgICAgICAgLy8gdGhpcy5ub2RlLnBhcmVudD1Ta2lsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5ub2RlO1xyXG4gICAgICAgIC8vIFNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldFRpbWVTdG9wKHRydWUpO1xyXG4gICAgICAgIC8vIFNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnN0YXJ0QmFpUGluZygpO1xyXG4gICAgICAgIC8vIE15VG9vbC5yYW5kb21TY2VuZVNoYWtlKC01LDUsMC4wMiw2KTtcclxuICAgICAgICAvLyBsZXQgbW9uc3RlcnM9TW9uc3Rlck1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNb25zdGVyc0Zvck1heEF0dGFrKDEsdGhpcy5ub2RlLmdldFBvc2l0aW9uKCksdGhpcy5oZXJvX2RhdGEuZ29uZ2ppX2ZhbndlaSk7ICAgICAgICBcclxuICAgICAgICAvLyBpZihtb25zdGVycyl7XHJcbiAgICAgICAgLy8gICAgIGNlblBvcz1tb25zdGVyc1swXS5nZXRQb3NpdGlvbigpLmFkZChjYy52MigwLC0yNSkpO1xyXG4gICAgICAgIC8vICAgICBpZihjZW5Qb3MueTxHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmVuZW15X2F0dF95KXtcclxuICAgICAgICAvLyAgICAgICAgIGNlblBvcz1tb25zdGVyc1swXS5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIHRoaXMuc3BpbmUudGltZVNjYWxlPUppYVN1O1xyXG4gICAgICAgIC8vIHhpbmhhb2Rhbi5nZXRDb21wb25lbnQoU2lnbmFsRmxhcmUpLmluaXQoR2FtZUVmZmVjdElkLnBhb3Nob3VfZGF6aGFvX3hpbmhhb2Rhbiw2MDAsY2VuUG9zLCgpPT57ICAgICAgICAgICAgXHJcbiAgICAgICAgLy8gICAgIHRoaXMubm9kZS5wYXJlbnQ9b2xkUGFyZW50O1xyXG4gICAgICAgIC8vICAgICB0aGlzLm5vZGUuekluZGV4PTI7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuc3BpbmUudGltZVNjYWxlPTE7XHJcbiAgICAgICAgLy8gICAgIFNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldFRpbWVTdG9wKGZhbHNlKTtcclxuICAgICAgICAvLyAgICAgdGhpcy5yZXNldEdvbmdKaUppU2h1KCk7XHJcbiAgICAgICAgLy8gICAgIHN1cGVyLnNldEhlcm9TdGF0ZShIZXJvX1N0YXRlLmlkbGUsdGhpcy5jdXJfZmFuZ3hpYW5nKTtcclxuICAgICAgICAvLyAgICAgbGV0IHN0YXJ0WT0tKGNjLndpblNpemUuaGVpZ2h0LzIrMjAwKVxyXG4gICAgICAgIC8vICAgICBsZXQgZW5kWT1jYy53aW5TaXplLmhlaWdodCs0MDA7XHJcbiAgICAgICAgLy8gICAgIGxldCBzcGVlZD0oZW5kWS1zdGFydFkpLzM7XHJcbiAgICAgICAgLy8gICAgIGxldCBub2RlPVNreU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQucGFvc2hvdV9hY3RpdmVfc2tpbGxfMSxjYy52MigwLHN0YXJ0WSkpO1xyXG4gICAgICAgIC8vICAgICBsZXQgZ2pEYXRhPXN1cGVyLmdldEdvbmdKaURhdGEoRGFtYWdlVHlwZS5Ta2lsbCxmYWxzZSx0aGlzLmhlcm9fZGF0YS5nZXRTa2lsbFZhbHVlMihTa2lsbFR5cGUuQWN0aXZlKSk7XHJcbiAgICAgICAgLy8gICAgIGNjLnR3ZWVuKG5vZGUpLmJ5KDMse3k6ZW5kWX0pLmNhbGwoKCk9PntcclxuICAgICAgICAvLyAgICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmRlc3Ryb3lHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQucGFvc2hvdV9hY3RpdmVfc2tpbGxfMSxub2RlKTtcclxuICAgICAgICAvLyAgICAgfSkuc3RhcnQoKTtcclxuICAgICAgICAvLyAgICAgbGV0IHBhb051bT0wO1xyXG4gICAgICAgIC8vICAgICBsZXQgcmFkaXVzPTUwO1xyXG4gICAgICAgIC8vICAgICBsZXQgdG91ZGFuQ2FsbD0oKT0+e1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgLy8gICAgICAgICBsZXQgcmFkaWFuPShwYW9OdW0qTWF0aC5QSS8zKVxyXG4gICAgICAgIC8vICAgICAgICAgbGV0IHBvc1g9Y2VuUG9zLngrTWF0aC5jb3MocmFkaWFuKSpyYWRpdXM7XHJcbiAgICAgICAgLy8gICAgICAgICBsZXQgcG9zWT1jZW5Qb3MueStNYXRoLnNpbihyYWRpYW4pKnJhZGl1cztcclxuICAgICAgICAvLyAgICAgICAgIGxldCB0b3VkYW49U2t5TWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5wYW9zaG91X2FjdGl2ZV9za2lsbF90b3VkYW4sY2MudjIocG9zWCxwb3NZKzE2MDApKTtcclxuICAgICAgICAvLyAgICAgICAgIC8vIGxldCB0b3VkYW49U2t5TWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5wYW9zaG91X2FjdGl2ZV9za2lsbF90b3VkYW4sY2MudjIocG9zWCwoY2Mud2luU2l6ZS5oZWlnaHQvMisyMDArc3BlZWQqcGFvTnVtKSkpO1xyXG4gICAgICAgIC8vICAgICAgICAgLy8gbGV0IHh4PTEwOCoocGFvTnVtJTI9PTA/LTE6MSk7XHJcbiAgICAgICAgLy8gICAgICAgICAvLyBsZXQgeXk9bm9kZS55KzEwMDtcclxuICAgICAgICAvLyAgICAgICAgIHRvdWRhbi5nZXRDb21wb25lbnQoVG91RGFuKS5pbml0KEdhbWVFZmZlY3RJZC5wYW9zaG91X2FjdGl2ZV9za2lsbF90b3VkYW4sY2MudjIocG9zWCxwb3NZKSxnakRhdGEpO1xyXG4gICAgICAgIC8vICAgICAgICAgcGFvTnVtKys7XHJcbiAgICAgICAgLy8gICAgIH07XHJcbiAgICAgICAgLy8gICAgIHRoaXMuc2NoZWR1bGUodG91ZGFuQ2FsbCwwLjI1LDUsMSk7XHJcbiAgICAgICAgLy8gICAgIFNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldElzU2tpbGxTdGF0ZShmYWxzZSk7XHJcbiAgICAgICAgLy8gfSk7ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAvLyBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLndhbGxfZGF0YS5hZGRTaGllbGRWYWx1ZShTaGllbGRJZC5QYW9TaG91X0FjdGl2ZVNraWxsLFNoaWVsZFR5cGUuQWxsLDUsdGhpcy5oZXJvX2RhdGEudG90YWxfYXR0YWNrKnRoaXMuaGVyb19kYXRhLmdldFNraWxsVmFsdWUxKFNraWxsVHlwZS5BY3RpdmUpKTtcclxuICAgIH1cclxuICAgIFxyXG59XHJcbiJdfQ==