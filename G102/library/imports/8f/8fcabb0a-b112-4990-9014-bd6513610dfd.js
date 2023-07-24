"use strict";
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