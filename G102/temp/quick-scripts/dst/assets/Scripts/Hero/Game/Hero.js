
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Hero/Game/Hero.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '47edbULhwZPhobdLMcwk04c', 'Hero');
// Scripts/Hero/Game/Hero.ts

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
var HeroConfig_1 = require("./HeroConfig");
var HeroData_1 = require("../Data/HeroData");
var GameManager_1 = require("../../GameManager");
var GameEffectsManager_1 = require("../../Game/GameEffectsManager");
var MonsterManager_1 = require("../../Monster/MonsterManager");
var Constants_1 = require("../../Constants");
var BuffStateManager_1 = require("../../Game/BuffStateManager");
var MonsterData_1 = require("../../Monster/MonsterData");
var SkillManager_1 = require("../../Game/SkillManager");
var BuffTimer_1 = require("./BuffTimer");
var BuffData_1 = require("./BuffData");
var SkillTip_1 = require("./SkillTip");
var SkyManager_1 = require("../../Game/SkyManager");
var LanguageManager_1 = require("../../multiLanguage/LanguageManager");
var TaskManager_1 = require("../../Task/TaskManager");
var TaskEnum_1 = require("../../Task/TaskEnum");
var WallManager_1 = require("../../Wall/WallManager");
var EndlessConfig_1 = require("../../copy/endlesschallenges/EndlessConfig");
var SpiritAttribute_1 = require("../../Pet/Data/SpiritAttribute");
var FirePet_1 = require("../../Pet/Game/FirePet");
var HeroBaseInfo_1 = require("../Data/HeroBaseInfo");
var IcePet_1 = require("../../Pet/Game/IcePet");
var WindPet_1 = require("../../Pet/Game/WindPet");
var RayPet_1 = require("../../Pet/Game/RayPet");
var Monster_1 = require("../../Monster/Monster");
var TouchPlane_1 = require("../../Game/TouchPlane/TouchPlane");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Hero = /** @class */ (function (_super) {
    __extends(Hero, _super);
    function Hero() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**所需的动画加载是否ok */
        _this.is_load_ok = false;
        _this.cur_load_num = 0;
        _this.need_load_num = 0;
        _this.is_LoadLoad = false; //异步加载资源锁
        _this.hero_type = HeroConfig_1.Hero_Type.ChangMaoShou;
        _this.prefab_skill_tip = null;
        //骨骼动画
        _this.spine = null;
        /**当前英雄的面向 */
        _this.cur_fangxiang = HeroConfig_1.GongJi_FangXiang.zuo;
        /**英雄的状态 */
        _this.hero_state = HeroConfig_1.Hero_State.idle;
        //攻击计数
        _this.gongji_jishu = 1;
        /**是否可以攻击 */
        _this.is_can_gongji = false;
        /**是否可以攻击计数 */
        _this.is_can_jishu = true;
        //最大的攻击次数
        _this.max_gongji_num = 1;
        //技能剩余的冷却时间
        _this.skill_cd_time = 0;
        /**主动技能技能最大冷却*/
        _this.skill_total_time = 5;
        /**施法距离 */
        _this.casting_distance = 1000;
        /**子弹速度 */
        _this.bullet_speed = 1000;
        //消耗的MP值
        _this.cost_mp = 20;
        //英雄位置
        _this.posIndex = -1;
        //游戏内的等级
        _this.hero_lvl = 0;
        _this.mp_progress = null;
        /**英雄当前拥有的buff */
        _this.hero_buff = null;
        /**英雄当前拥有的debuff */
        _this.hero_debuff = null;
        /**无尽buff */
        _this.map_endless_buff = null;
        /**眩晕位置 */
        _this.xuanyun_pos = null;
        /**子弹生成的位置 */
        _this.bullet_pos = [];
        //英雄的数据
        _this.hero_data = null;
        _this.is_show_mp_hint = false;
        /**当前的韧性 */
        _this.cur_toughness = 0;
        _this.zhishiqi_type = HeroConfig_1.SkillIndicatorType.beeline;
        /**技能释放回调 */
        _this.skill_callback = null;
        /**攻击释放回调 */
        _this.attack_callback = null;
        _this.xuanyun_callback = null;
        /**命中回调 */
        _this.hit_callback = null;
        /**重置回调 */
        _this.reset_callback = null;
        /**胜利回调 */
        _this.win_callback = null;
        /**加载完毕回调回调 */
        _this.loaded_callback = null;
        /**宠物 */
        _this.pet = null;
        /**宠物技能的一些被动 */
        /**此次伤害必定暴击 */
        _this.must_crit = 0;
        /**宠物21可以触发增伤次数 */
        _this.crit_increase_cd_3_num = 0;
        _this.setup_scale = 0.50;
        _this.base_att_jiange = 0;
        /**buff状态 */
        _this.map_buff_state = null;
        /**debuff状态 */
        _this.map_debuff_state = null;
        /**是否需要检查技能释放距离 */
        _this.is_need_check_distance = true;
        /**指示器类型 */
        _this.skill_tip_type = HeroConfig_1.SkillTipType.Full;
        /**是否可以处理触摸事件，当技能CD完毕切按下了英雄时为true */
        _this.is_can_touch = false;
        _this.skill_tip = null;
        /**是否触发自动释放逻辑 */
        _this.is_auto_release = false;
        _this.touch_rect = null;
        /**总共使用技能的次数 */
        _this.use_skill_num = 0;
        _this.node_shadow = null;
        /**点击剩余 */
        _this.click_remain = 0;
        /**攻速记录值，不作判断 */
        _this.gongji_sudu = 0;
        /**技能队列 */
        _this.skill_queue = [];
        /**是否连续攻击 */
        _this.is_double_attack = false;
        /**层级*/
        _this.v_Index = 0;
        _this.posX = 0; //初始化时候的位置
        _this.targetX = 0;
        _this.easing = 0.1;
        return _this;
    }
    Hero_1 = Hero;
    /**眩晕回调 */ ;
    //----------------------------------------------LOAD---------------------------------------------
    Hero.prototype.onLoad = function () {
        GameManager_1.default.getInstance().all_hero.set(this.hero_type, this);
        this.spine = this.node.getComponent(sp.Skeleton);
        //this.setSkin();
        this.touchListen();
        this.initPos();
        // if(this.hero_type==Hero_Type.DeLuYi){
        //     this.setup_scale=0.22;
        // }
        // if(this.hero_type==Hero_Type.LeiShen||this.hero_type==Hero_Type.ShouWang){
        //     this.setup_scale=1;
        // }
        this.node.scale = this.setup_scale;
        this.node.scaleX = -this.setup_scale;
        this.addLoadByGameEffectId(GameEffectsManager_1.GameEffectId.hero_skill_common, 2);
        this.addLoadByGameEffectId(GameEffectsManager_1.GameEffectId.skill_damage_record, 2);
        this.node.zIndex = 1;
        this.map_buff_state = new Map();
        this.map_debuff_state = new Map();
        this.hero_buff = new Map();
        this.hero_debuff = new Map();
        this.map_endless_buff = new Map();
        this.addSkillTipType();
    };
    Hero.prototype.start = function () {
        //加载数据
        this.hero_data = GameManager_1.default.getInstance().game_hero_data.get(this.hero_type);
        this.hero_lvl = 0;
        GameManager_1.default.getInstance().refreshMainWallDataByaddHero();
        this.bullet_speed = HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getBaseBulletSpeed(this.hero_type);
        this.gongji_jishu = this.hero_data.gongji_jiange;
        this.gongji_sudu = this.getAttackSpeed();
        this.setHeroState(HeroConfig_1.Hero_State.idle, HeroConfig_1.GongJi_FangXiang.zhong);
        //this.playSpineAnimaton(Hero_State_Name.Idle,true,null,null);
        //加载mp进度条
        this.loadMpProgress();
        this.loadPet();
        var selfShadow = this.node.getChildByName('Monster_Shadow');
        this.pos = selfShadow.getPosition();
        this.node_shadow = cc.instantiate(selfShadow);
        this.node_shadow.parent = cc.find('Canvas/Hero_Shadow_Root');
        this.node_shadow.scale = this.setup_scale;
        this.node_shadow.setPosition(cc.v2(this.node.x + this.pos.x * this.setup_scale, this.node.y + this.pos.y * this.setup_scale));
        selfShadow.removeFromParent();
        if (this.getHeroState() == HeroConfig_1.Hero_State.exit) {
            this.node_shadow.opacity = 0;
        }
        // this.node.zIndex = 2;
        this.casting_distance = this.hero_data.gongji_fanwei;
        if (cc.winSize.height / cc.winSize.width > 2) {
            this.casting_distance = this.hero_data.gongji_fanwei + 200;
        }
        // if(this.hero_type==Hero_Type.NvWu){
        //     this.casting_distance=192*3+GameManager.getInstance().enemy_att_y-this.node.y
        // }
        this.setTouchRect();
    };
    Hero.prototype.onDestroy = function () {
        //取消监听触摸事件
        var touchNode = this.node.getChildByName('touchNode');
        if (touchNode) {
            // touchNode.off(cc.Node.EventType.TOUCH_START,this.onTouchStart,this);
            // touchNode.off(cc.Node.EventType.TOUCH_MOVE,this.onTouchMove,this);
            // touchNode.off(cc.Node.EventType.TOUCH_END,this.onTouchEnd,this);
            // touchNode.off(cc.Node.EventType.TOUCH_CANCEL,this.onTouchCancel,this);
            // instance.off(cc.Node.EventType.TOUCH_START, this.onTouchStartByJoy, this);
            // instance.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMoveByJoy, this);
            TouchPlane_1.instance.off(cc.Node.EventType.TOUCH_END, this.onTouchEndByJoy, this);
        }
        GameManager_1.default.getInstance().all_hero.delete(this.hero_type);
    };
    Hero.prototype.addSkillTipType = function () {
        var node = cc.instantiate(this.prefab_skill_tip);
        this.skill_tip = node.getComponent(SkillTip_1.default);
        this.skill_tip_type = this.skill_tip.getSkillTipType();
        this.skill_tip.node.active = false;
        switch (this.skill_tip_type) {
            case HeroConfig_1.SkillTipType.Full:
                {
                    SkillManager_1.default.getInstance().node.addChild(node);
                }
                break;
            case HeroConfig_1.SkillTipType.Circle:
                {
                    SkillManager_1.default.getInstance().node.addChild(node);
                }
                break;
            case HeroConfig_1.SkillTipType.Rect:
                {
                    SkillManager_1.default.getInstance().node.addChild(node);
                }
                break;
            case HeroConfig_1.SkillTipType.Dir:
                {
                    SkillManager_1.default.getInstance().node.addChild(node);
                }
                break;
        }
    };
    Hero.prototype.setTouchRect = function () {
        var touchNode = this.node.getChildByName('touchNode');
        this.touch_rect = cc.rect(this.node.x + touchNode.x * this.setup_scale - (touchNode.width * this.setup_scale / 2), this.node.y + touchNode.y * this.setup_scale - (touchNode.height * this.setup_scale / 2), touchNode.width * this.setup_scale, touchNode.height * this.setup_scale);
        // let gg=cc.find('Canvas/Fighting_Root').getComponent(cc.Graphics);
        // gg.rect(this.touch_rect.x,this.touch_rect.y,this.touch_rect.width,this.touch_rect.height);
        // gg.stroke();
    };
    Hero.prototype.setSkillTipSize = function (width, height) {
        this.skill_tip.node.width = width;
        this.skill_tip.node.height = height;
    };
    Hero.prototype.getSkillTipSize = function () {
        return this.skill_tip.node.getContentSize();
    };
    Hero.prototype.touchListen = function () {
        //监听触摸事件
        var touchNode = this.node.getChildByName('touchNode');
        if (touchNode) {
            // touchNode.on(cc.Node.EventType.TOUCH_START,this.onTouchStart,this);
            // touchNode.on(cc.Node.EventType.TOUCH_MOVE,this.onTouchMove,this);
            // touchNode.on(cc.Node.EventType.TOUCH_END,this.onTouchEnd,this);
            // touchNode.on(cc.Node.EventType.TOUCH_CANCEL,this.onTouchCancel,this);
            // instance.on(cc.Node.EventType.TOUCH_START, this.onTouchStartByJoy, this);
            // instance.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMoveByJoy, this);
            TouchPlane_1.instance.on(cc.Node.EventType.TOUCH_END, this.onTouchEndByJoy, this);
        }
    };
    Hero.prototype.initPos = function () {
        var xuanyun = this.node.getChildByName('xuanyun');
        this.xuanyun_pos = xuanyun.getPosition();
        xuanyun.removeFromParent();
        this.bullet_pos = new Array();
        var bullet1 = this.node.getChildByName('bullet1');
        var bullet2 = this.node.getChildByName('bullet2');
        this.bullet_pos.push(bullet2.getPosition());
        this.bullet_pos.push(bullet1.getPosition());
        this.bullet_pos.push(bullet2.getPosition());
        bullet1.removeFromParent();
        bullet2.removeFromParent();
    };
    Hero.prototype.onGameWin = function () {
        this.skill_queue = new Array();
        this.setHeroState(HeroConfig_1.Hero_State.idle, HeroConfig_1.GongJi_FangXiang.zhong);
        this.gongji_jishu = 0;
        if (this.win_callback) {
            this.win_callback();
        }
    };
    Hero.prototype.addSkillListen = function (callBack) {
        this.skill_callback = callBack;
    };
    Hero.prototype.addAttackListen = function (callBack) {
        this.attack_callback = callBack;
    };
    Hero.prototype.addHitListen = function (callBack) {
        this.hit_callback = callBack;
    };
    Hero.prototype.addResetListen = function (callBack) {
        this.reset_callback = callBack;
    };
    Hero.prototype.addGameWinListen = function (callBack) {
        this.win_callback = callBack;
    };
    Hero.prototype.addLoadedListen = function (callBack) {
        this.loaded_callback = callBack;
    };
    Hero.prototype.loadMpProgress = function () {
        // cc.resources.load('heros/skill_icon',cc.Prefab,(error: Error, assets:cc.Prefab)=>{
        //     if(error)
        //     {
        //         console.log(error);
        //         return;
        //     }
        //     let mpNode=cc.instantiate(assets);
        //     mpNode.parent=cc.find('Canvas/Fighting_Ui');
        //     mpNode.setPosition(cc.v2(this.node.x,this.node.y+15));
        //     this.mp_progress=mpNode.getComponent(MpProgress);
        //     this.mp_progress.init(this.hero_type);
        //     this.changeCD(this.hero_data.getSkillColdDown(SkillType.Active)/3);
        //     this.skill_total_time=this.hero_data.getSkillColdDown(SkillType.Active);
        //     if(this.getHeroState()==Hero_State.exit){
        //         this.mp_progress.hide();
        //     }
        // });
    };
    Hero.prototype.loadZhiShiQi = function (zhishiqi, type) {
        this.zhishiqi_type = type;
        console.log("加载hero" + zhishiqi);
        cc.resources.load('heros/' + zhishiqi, cc.Prefab, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
        });
    };
    Hero.prototype.addLoadByGameEffectId = function (id, initCount) {
        var _this = this;
        this.need_load_num++;
        if (GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(id, initCount, function () {
            _this.cur_load_num++;
            if (_this.cur_load_num >= _this.need_load_num && _this.is_LoadLoad == true) {
                if (_this.is_load_ok == false) {
                    _this.is_load_ok = true;
                    Hero_1.cur_loaded_num++;
                    if (_this.loaded_callback) {
                        _this.loaded_callback();
                    }
                }
            }
        }) == true) {
        }
    };
    /**加载宠物 */
    Hero.prototype.loadPet = function () {
        var _this = this;
        if (this.hero_data.pet_id > 0) {
            var type_1 = SpiritAttribute_1.SpiritAttributeManager.getInstance().getSpiritType(this.hero_data.pet_id);
            this.need_load_num++;
            cc.resources.load('pet/pet' + type_1, cc.Prefab, function (error, assets) {
                if (error) {
                    console.log(error);
                    return;
                }
                var node = cc.instantiate(assets);
                cc.find('Canvas/Pet_Root').addChild(node);
                switch (type_1) {
                    case 1:
                        {
                            _this.pet = node.addComponent(IcePet_1.default);
                        }
                        ;
                        break;
                    case 2:
                        {
                            _this.pet = node.addComponent(FirePet_1.default);
                        }
                        ;
                        break;
                    case 3:
                        {
                            _this.pet = node.addComponent(WindPet_1.default);
                        }
                        ;
                        break;
                    case 4:
                        {
                            _this.pet = node.addComponent(RayPet_1.default);
                        }
                        ;
                        break;
                }
                _this.pet.init(_this.hero_data.pet_id, _this.hero_type, cc.v2(_this.node.x - 64, _this.node.y + 64));
                _this.pet.setHeroData(_this.hero_data);
                _this.cur_load_num++;
                node.zIndex = 1000 - node.y;
                if (_this.cur_load_num >= _this.need_load_num) {
                    _this.is_load_ok = true;
                    Hero_1.cur_loaded_num++;
                }
            });
        }
    };
    /**隐藏英雄，此时英雄不能攻击或者释放技能 */
    Hero.prototype.hideHero = function () {
        this.hero_state = HeroConfig_1.Hero_State.exit;
        this.node.opacity = 0;
        if (this.node_shadow) {
            this.node_shadow.opacity = 0;
        }
        if (this.mp_progress) {
            this.mp_progress.hide();
        }
    };
    Hero.prototype.showHero = function () {
        this.setHeroState(HeroConfig_1.Hero_State.idle, HeroConfig_1.GongJi_FangXiang.zhong);
        this.node.opacity = 255;
        this.node_shadow.opacity = 255;
        //this.mp_progress.show();
    };
    Hero.prototype.onTouchEndByJoy = function (event, data) {
        this.targetX = (GameManager_1.default.getInstance().aniType - 4) * 75 + this.posX;
    };
    //----------------------------------【皮肤】----------------------------------------------
    Hero.prototype.setSkin = function () {
        //let heroQuality=HeroManager.getInstance().getHeroQuality(this.hero_type);
        //let tier=HeroQualityManager.getInstance().getTier(heroQuality);
        //this.spine.setSkin('stage'+(HeroManager.getSkinIndex(tier)));
    };
    /**---------------------------------操作相关---------------------------------------------- */
    //-----------------------------------触摸移动事件------------------------------------------------------------
    // leaterNum: number = 0;//延迟数据播放动画
    // leaterSpeed: number = 5;
    // newPos: cc.Vec2;
    // posYTemp: number;
    // speedType: SpeedType = SpeedType.STOP;
    // moveDir = cc.v2(0, 1);
    // //抄别人的，本来有两种速度，现在先用一个数据
    // normalSpeed = 600;
    // fastSpeed = 600;
    // stopSpeed = 0;
    // moveSpeed = 0;
    /**
  * 移动
  */
    // move() {
    //     // this.node.angle =
    //     //   cc.misc.radiansToDegrees(Math.atan2(this.moveDir.y, this.moveDir.x)) - 90;
    //     // if (this.rigidbody) {
    //     //   this._body.applyForceToCenter(
    //     //     cc.v2(this.moveDir.x * 200, this.moveDir.y * 200),
    //     //     true
    //     //   );
    //     // } else {
    //     //   const oldPos = cc.v2();
    //     //   this.node.getPosition(oldPos);
    //     //   const newPos = oldPos.add(this.moveDir.mul(this._moveSpeed / 120));
    //     //   this.node.setPosition(newPos);
    //     // }
    //     if (this.speedType !== SpeedType.STOP) {
    //         const oldPos = cc.v2();
    //         this.node.getPosition(oldPos);
    //         this.newPos = oldPos.add(this.moveDir.mul(this.moveSpeed / 120));
    //         this.newPos.y = oldPos.y;
    //         this.posYTemp = oldPos.y;
    //     }
    //     if (this.leaterNum == 0) {
    //         GameManager.getInstance().moveData.unshift(this.newPos);
    //     }
    //     if (GameManager.getInstance().moveData[this.leaterNum * this.leaterSpeed] != null) {
    //         const newPosTepm = GameManager.getInstance().moveData[this.leaterNum * this.leaterSpeed];
    //         newPosTepm.y=this.posYTemp;
    //         this.node.setPosition(newPosTepm);
    //     }
    //     if(GameManager.getInstance().moveData.length>60){
    //         GameManager.getInstance().moveData.splice(60,GameManager.getInstance().moveData.length-60);
    //     }
    //     this.node_shadow.setPosition(cc.v2(this.node.x + this.pos.x * this.setup_scale, this.node.y + this.pos.y * this.setup_scale));
    // }
    // onTouchStartByJoy() { }
    // onTouchMoveByJoy(event: cc.Event.EventTouch, data) {
    //     this.speedType = data.speedType;
    //     this.moveDir = data.moveDistance;
    // }
    // onTouchEndByJoy(event: cc.Event.EventTouch, data) {
    //     this.speedType = data.speedType;
    // }
    /**---------------------------------操作相关---------------------------------------------- */
    //-----------------------------------触摸事件------------------------------------------------------------//旧版功能
    Hero.prototype.onTouchStart = function (e) {
        if (this.isHaveDeBuff(HeroConfig_1.BuffId.Monster_XuanYun) && this.hero_type != HeroConfig_1.Hero_Type.ZhenDe) {
            this.is_can_touch = false;
            GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getStrByTextId(170002), 1);
            return false;
        }
        if (this.skill_cd_time > 0) {
            this.is_can_touch = false;
            if (this.click_remain > 0) {
                return false;
            }
            GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getStrByTextId(170001), 1);
            return false;
        }
        if (GameManager_1.default.getInstance().cur_game_state != Constants_1.GameState.Game_Playing)
            return false;
        this.is_can_touch = true;
        this.is_auto_release = true;
        this.click_remain = 1;
        SkillManager_1.default.getInstance().releaseSkillResult(false);
        var pos = SkyManager_1.default.getInstance().node.convertToNodeSpaceAR(e.getLocation());
        //如果可以释放，显示指示器
        switch (this.skill_tip_type) {
            case HeroConfig_1.SkillTipType.Full:
                {
                    this.skill_tip.node.setPosition(cc.v2(0, -cc.winSize.height / 2));
                    this.skill_tip.node.active = false;
                    this.skill_tip.setIsCanRelease(false);
                }
                break;
            case HeroConfig_1.SkillTipType.Circle:
                {
                    this.skill_tip.node.setPosition(pos);
                    this.skill_tip.node.active = true;
                    this.skill_tip.setIsCanRelease(false);
                }
                break;
            case HeroConfig_1.SkillTipType.Rect:
                {
                    this.skill_tip.node.setPosition(pos);
                    this.skill_tip.node.active = true;
                    this.skill_tip.setIsCanRelease(false);
                }
                break;
            case HeroConfig_1.SkillTipType.Dir:
                {
                    this.skill_tip.node.setPosition(this.node.getPosition());
                    this.skill_tip.node.active = true;
                    this.skill_tip.setIsCanRelease(false);
                }
                break;
        }
        //显示范围指示器
        SkillManager_1.default.getInstance().showSkillRange(this.node.y, this.casting_distance);
    };
    Hero.prototype.onTouchMove = function (e) {
        if (this.is_can_touch == false || GameManager_1.default.getInstance().cur_game_state != Constants_1.GameState.Game_Playing)
            return;
        var pos = SkyManager_1.default.getInstance().node.convertToNodeSpaceAR(e.getLocation());
        if (!this.touch_rect.contains(pos)) {
            this.is_auto_release = false;
        }
        switch (this.skill_tip_type) {
            case HeroConfig_1.SkillTipType.Full:
                {
                }
                break;
            case HeroConfig_1.SkillTipType.Circle:
                {
                    this.skill_tip.node.setPosition(pos);
                }
                break;
            case HeroConfig_1.SkillTipType.Rect:
                {
                    this.skill_tip.node.setPosition(pos);
                }
                break;
            case HeroConfig_1.SkillTipType.Dir:
                {
                }
                break;
        }
        if (pos.y > GameManager_1.default.getInstance().enemy_att_y) {
            var distance = pos.y - this.node.y;
            if (distance <= this.casting_distance) {
                this.skill_tip.setIsCanRelease(true);
            }
            else {
                this.skill_tip.setIsCanRelease(false);
            }
        }
        else {
            this.skill_tip.setIsCanRelease(false);
        }
    };
    Hero.prototype.onTouchEnd = function (e) {
        SkillManager_1.default.getInstance().releaseSkillResult(true);
        SkillManager_1.default.getInstance().hideSkillRange();
        this.skill_tip.node.active = false;
        if (this.is_can_touch == false || GameManager_1.default.getInstance().cur_game_state != Constants_1.GameState.Game_Playing)
            return;
        var pos = SkyManager_1.default.getInstance().node.convertToNodeSpaceAR(e.getLocation());
        //判断坐标
        if (pos.y > GameManager_1.default.getInstance().enemy_att_y) {
            var distance = pos.y - this.node.y;
            if (distance <= this.casting_distance) {
                this.releaseSkill(pos);
            }
        }
        else {
            if (this.is_auto_release) {
                if (this.startAutoRelease() == false) {
                    GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getStrByTextId(140023));
                }
            }
        }
    };
    Hero.prototype.onTouchCancel = function (e) {
        SkillManager_1.default.getInstance().releaseSkillResult(true);
        SkillManager_1.default.getInstance().hideSkillRange();
        this.skill_tip.node.active = false;
        if (this.is_can_touch == false || GameManager_1.default.getInstance().cur_game_state != Constants_1.GameState.Game_Playing)
            return;
        var pos = SkyManager_1.default.getInstance().node.convertToNodeSpaceAR(e.getLocation());
        if (pos.y > GameManager_1.default.getInstance().enemy_att_y) {
            var distance = pos.y - this.node.y;
            if (distance <= this.casting_distance) {
                this.releaseSkill(pos);
            }
        }
        else {
            if (this.is_auto_release) {
                this.startAutoRelease();
            }
        }
    };
    Hero.prototype.startAutoRelease = function () {
        //找怪，找不到就不放
        var enemys = MonsterManager_1.default.getInstance().getMonstersForNearestBySkill(1, this.node.y, this.casting_distance);
        if (this.cur_load_num >= this.need_load_num && this.is_LoadLoad == true && enemys) {
            //最前的敌人
            var enemyPos = enemys[0].getComponent(Monster_1.default).getCenterPos();
            this.releaseSkill(enemyPos);
            return true;
        }
        else {
            return false;
        }
    };
    /**触摸的位置 */
    Hero.prototype.releaseSkill = function (touchPos) {
        if (GameManager_1.default.getInstance().cur_game_state != Constants_1.GameState.Game_Playing)
            return;
        this.use_skill_num++;
        //this.mp_progress.showLight();
        if (this.skill_callback) {
            this.skill_callback(touchPos);
        }
        this.resetCD();
        TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.释放X次人物技能);
    };
    Hero.prototype.getSkillReleaseId = function () {
        return this.hero_type * 10000 + this.use_skill_num;
    };
    /**获得子弹生成的位置 */
    Hero.prototype.getCreateBulletPos = function () {
        var pos = this.bullet_pos[this.cur_fangxiang];
        return cc.v2(this.node.x + pos.x * this.node.scaleX, this.node.y + pos.y * this.node.scaleY);
    };
    /**获得子弹相对英雄的位置 */
    Hero.prototype.getHeroBulletPos = function () {
        return this.bullet_pos[this.cur_fangxiang];
    };
    //----------------------------------无尽buff-------------------------------------------
    /**
     * 添加无尽buff
     * @param endlessBuff EndlessBuff的实例
     */
    //  Administrator:
    //  1.攻击力+x%
    //  2.攻速+x%
    //  3.暴击值+x
    //  4.暴击增幅+x%
    //  5.防御力+x%
    //  6.最大生命值+x% 
    //  7.每秒回复最大生命值x%
    //  8.立即回复最大生命值x%（注：该buff生效后立即消失）
    //  9.连续攻击 概率x%
    //  10.主动技能冷却时间减少x%
    //  11.最终伤害加成x%
    Hero.prototype.addEndlessBuff = function (endlessBuff) {
        if (!this.isHaveEndlessId(endlessBuff.id)) {
            this.map_endless_buff.set(endlessBuff.id, endlessBuff);
            switch (endlessBuff.type) {
                case EndlessConfig_1.EndlessBuffType.Attack:
                    {
                        this.hero_data.total_attack += this.hero_data.fixed_attck * endlessBuff.value;
                    }
                    break;
                case EndlessConfig_1.EndlessBuffType.AttackSpeed:
                    {
                        this.changeAttackSpeed(endlessBuff.value);
                    }
                    break;
                case EndlessConfig_1.EndlessBuffType.CritRate:
                    {
                        this.hero_data.Critical += endlessBuff.value;
                    }
                    break;
                case EndlessConfig_1.EndlessBuffType.CritDamage:
                    {
                        this.hero_data.ExtraCritical += endlessBuff.value;
                    }
                    break;
                case EndlessConfig_1.EndlessBuffType.Defense:
                    {
                        this.hero_data.total_defense += this.hero_data.fix_defense * endlessBuff.value;
                    }
                    break;
                case EndlessConfig_1.EndlessBuffType.HealthMax:
                    {
                        this.hero_data.total_hp += this.hero_data.fixed_hp * endlessBuff.value;
                        // console.log("城墙加血:",this.hero_data.total_hp,this.hero_data.fixed_hp,endlessBuff.value)
                        GameManager_1.default.getInstance().refreshMainWallData();
                    }
                    break;
                case EndlessConfig_1.EndlessBuffType.HealthSec:
                    {
                        var buffData = new BuffData_1.BuffData();
                        buffData.buff_id = HeroConfig_1.BuffId.Wall_Endless_Add_hp + this.hero_type;
                        buffData.buff_type = HeroConfig_1.BuffType.Gain;
                        buffData.buff_value = [endlessBuff.value * WallManager_1.default.getInstance().getMainWall().getMaxHp()];
                        buffData.remain_time = 66666666;
                        // buffData.game_effect_id=GameEffectId.chang_mao_shou_skill_active_1;
                        buffData.recovery_jiange_time = 1;
                        WallManager_1.default.getInstance().getMainWall().addBuff(buffData);
                    }
                    break;
                case EndlessConfig_1.EndlessBuffType.HealthTeamAdd:
                    {
                        // let hp=WallManager.getInstance().getMainWall().getCurHp()+(endlessBuff.value*WallManager.getInstance().getMainWall().getMaxHp())
                        // WallManager.getInstance().getMainWall().changeHp(hp)
                        //及时用
                    }
                    break;
                case EndlessConfig_1.EndlessBuffType.DoubleAttack:
                    {
                        //连续攻击,不用加buff
                    }
                    break;
                case EndlessConfig_1.EndlessBuffType.ActiveSkillCd:
                    {
                        this.skill_total_time -= this.hero_data.getSkillColdDown(HeroConfig_1.SkillType.Active) * endlessBuff.value;
                    }
                    break;
                case EndlessConfig_1.EndlessBuffType.AddDamage:
                    {
                        this.hero_data.all_increase_damage += endlessBuff.value;
                    }
                    break;
            }
        }
    };
    /**
     * 删除无尽buff
     * @param id 无尽buff-id
     */
    Hero.prototype.removeEndlessBuff = function (id) {
        if (!this.isHaveEndlessId(id)) {
            var endlessBuff = this.map_endless_buff.get(id);
            this.map_endless_buff.delete(id);
            switch (endlessBuff.type) {
                case EndlessConfig_1.EndlessBuffType.Attack:
                    {
                        this.hero_data.total_attack -= this.hero_data.fixed_attck * endlessBuff.value;
                    }
                    break;
                case EndlessConfig_1.EndlessBuffType.AttackSpeed:
                    {
                        this.changeAttackSpeed(-endlessBuff.value);
                    }
                    break;
                case EndlessConfig_1.EndlessBuffType.CritRate:
                    {
                        this.hero_data.Critical -= endlessBuff.value;
                    }
                    break;
                case EndlessConfig_1.EndlessBuffType.CritDamage:
                    {
                        this.hero_data.ExtraCritical -= endlessBuff.value;
                    }
                    break;
                case EndlessConfig_1.EndlessBuffType.Defense:
                    {
                        this.hero_data.total_defense -= this.hero_data.fix_defense * endlessBuff.value;
                    }
                    break;
                case EndlessConfig_1.EndlessBuffType.HealthMax:
                    {
                        this.hero_data.total_hp -= this.hero_data.fixed_hp * endlessBuff.value;
                    }
                    break;
                case EndlessConfig_1.EndlessBuffType.HealthSec:
                    {
                        WallManager_1.default.getInstance().getMainWall().subBuff(HeroConfig_1.BuffId.Wall_Endless_Add_hp + this.hero_type);
                    }
                    break;
                case EndlessConfig_1.EndlessBuffType.HealthTeamAdd:
                    {
                    }
                    break;
                case EndlessConfig_1.EndlessBuffType.DoubleAttack:
                    {
                    }
                    break;
                case EndlessConfig_1.EndlessBuffType.ActiveSkillCd:
                    {
                        this.skill_total_time += this.hero_data.getSkillColdDown(HeroConfig_1.SkillType.Active) * endlessBuff.value;
                    }
                    break;
                case EndlessConfig_1.EndlessBuffType.AddDamage:
                    {
                        this.hero_data.all_increase_damage -= endlessBuff.value;
                    }
                    break;
            }
        }
    };
    /**是否拥有一个无尽buff id */
    Hero.prototype.isHaveEndlessId = function (id) {
        // console.log("++++++++",id,this.map_endless_buff)
        return this.map_endless_buff.has(id);
    };
    /**是否拥有一个无尽buff 类型 */
    Hero.prototype.getEndlessByType = function (type) {
        var buff = null;
        this.map_endless_buff.forEach(function (v, k) {
            if (v.type == type) {
                buff = v;
            }
        });
        return buff;
    };
    /**获得一个无尽buff */
    Hero.prototype.getEndlessBuff = function (id) {
        return this.map_endless_buff.get(id);
    };
    //----------------------------------BUFF--------------------------------------------------
    Hero.prototype.addBuff = function (buffData) {
        var buffId = buffData.buff_id;
        if (!this.isHaveBuff(buffId)) {
            //添加buff节点和特效       
            var node = null;
            if (buffData.game_effect_id == GameEffectsManager_1.GameEffectId.Null) {
                node = new cc.Node(buffData.game_effect_id.toString());
                this.node.addChild(node);
            }
            else {
                node = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectForParent(buffData.game_effect_id, this.xuanyun_pos, this.node);
                //node.scale=this.node.width/200;
            }
            //添加buff
            var buff = node.getComponent(BuffTimer_1.default);
            if (!buff) {
                buff = node.addComponent(BuffTimer_1.default);
            }
            buff.init(buffData);
            //buff销毁时处理
            buff.addDestroyListen(this.onBuffDestory.bind(this));
            //buff治疗触发时处理
            if (buffData.recovery_jiange_time > 0) {
                buff.addRecoveryListen({
                    doRecovery: function (num) {
                        WallManager_1.default.getInstance().getMainWall().changeHp(num);
                    }
                }, buff.getFirstBuffValue());
            }
            this.hero_buff.set(buffData.buff_id, buff);
            node.scale = 1 / this.setup_scale;
            switch (buffId) {
                case HeroConfig_1.BuffId.Pet3_JiaSu:
                case HeroConfig_1.BuffId.Hero_MeiMo_GongSu:
                case HeroConfig_1.BuffId.Hero_ZhenDe_Gongsu:
                case HeroConfig_1.BuffId.Hero_KuangZhanShi_DaZhao:
                    {
                        this.changeAttackSpeed(buffData.buff_value[0]);
                    }
                    break;
                case HeroConfig_1.BuffId.Hero_ChangMaoShow_GongSu:
                    {
                        this.changeAttackSpeed(buffData.buff_value[0]);
                        node.setPosition(cc.v2(0, 0));
                        //新增一个背后特效
                        buff.addTeXiao(GameEffectsManager_1.GameEffectId.chang_mao_shou_skill_active_2, this.node.getPosition(), cc.find('Canvas/Hero_Shadow_Root'));
                    }
                    break;
                case HeroConfig_1.BuffId.Hero_ZhenDe_BaoJiMingZhongLv:
                    {
                        this.hero_data.crit_ex += buffData.buff_value[0];
                        this.hero_data.hit_ex += buffData.buff_value[0];
                    }
                    break;
            }
            this.addBuffState(buffId, buffData.remain_time);
            return buff;
        }
        else {
            var buff = this.hero_buff.get(buffId);
            buff.refreshBuff(buffData);
            this.addBuffState(buffId, buffData.remain_time);
            return buff;
        }
        return null;
    };
    Hero.prototype.subBuff = function (buffId) {
        var buff = this.hero_buff.get(buffId);
        if (buff) {
            buff.destroySelf();
            return true;
        }
        return false;
    };
    Hero.prototype.onBuffDestory = function (buffData) {
        this.hero_buff.delete(buffData.buff_id);
        switch (buffData.buff_id) {
            case HeroConfig_1.BuffId.Pet3_JiaSu:
            case HeroConfig_1.BuffId.Hero_MeiMo_GongSu:
            case HeroConfig_1.BuffId.Hero_KuangZhanShi_DaZhao:
            case HeroConfig_1.BuffId.Hero_ZhenDe_Gongsu:
            case HeroConfig_1.BuffId.Hero_ChangMaoShow_GongSu:
                {
                    this.changeAttackSpeed(-buffData.buff_value[0]);
                }
                break;
            case HeroConfig_1.BuffId.Hero_ZhenDe_BaoJiMingZhongLv:
                {
                    this.hero_data.crit_ex -= buffData.buff_value[0];
                    this.hero_data.hit_ex -= buffData.buff_value[0];
                }
                break;
        }
    };
    Hero.prototype.isHaveBuff = function (buff) {
        return this.hero_buff.has(buff);
    };
    Hero.prototype.removeAllBuff = function () {
        var _this = this;
        this.hero_buff.forEach(function (buff) {
            _this.subBuff(buff.getBuffId());
        });
    };
    Hero.prototype.addDeBuff = function (buffData, insight) {
        if (insight === void 0) { insight = 0; }
        if (!this.isHaveDeBuff(buffData.buff_id)) {
            //控制类的debuff需要根据韧性来实现具体的效果
            if (buffData.buff_type == HeroConfig_1.BuffType.Vertigo) {
                if (this.cur_toughness >= 1) {
                    return false;
                }
                if (this.hero_type != HeroConfig_1.Hero_Type.ZhenDe) {
                    //this.mp_progress.setDisable(true);
                    SkillManager_1.default.getInstance().hideSkillRange();
                    this.skill_tip.node.active = false;
                }
                this.gongji_jishu = 0;
                this.spine.paused = true;
                this.is_can_touch = false;
                if (insight > 0) {
                    buffData.remain_time = MonsterData_1.InjuredData.calcControlTime(buffData.remain_time, this.cur_toughness, insight);
                }
                if (this.xuanyun_callback) {
                    this.xuanyun_callback(true);
                }
                WallManager_1.default.getInstance().getMainWall().showVertigo(buffData.remain_time);
                //关闭时停
                SkillManager_1.default.getInstance().setTimeStop(false);
                SkillManager_1.default.getInstance().setIsSkillState(false);
            }
            //添加buff节点和特效       
            var node = null;
            if (buffData.game_effect_id == GameEffectsManager_1.GameEffectId.Null) {
                node = new cc.Node(buffData.game_effect_id.toString());
                this.node.addChild(node);
            }
            else {
                node = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectForParent(buffData.game_effect_id, this.xuanyun_pos, this.node);
                node.scale = this.node.width / 200;
            }
            //添加buff
            var buff = node.getComponent(BuffTimer_1.default);
            if (!buff) {
                buff = node.addComponent(BuffTimer_1.default);
            }
            buff.init(buffData);
            //buff销毁时处理
            buff.addDestroyListen(this.onDeBuffDestory.bind(this));
            this.hero_debuff.set(buffData.buff_id, buff);
            node.scale = 1 / this.setup_scale;
            switch (buffData.buff_id) {
                case HeroConfig_1.BuffId.Boss6_Skill_2_jiangongsu:
                case HeroConfig_1.BuffId.Boss3_JIAN_GongSu:
                    {
                        this.changeAttackSpeed(-buffData.buff_value[0]);
                    }
                    break;
                case HeroConfig_1.BuffId.Boss8_Skill_2_attack:
                    {
                        this.hero_data.total_attack -= buffData.buff_value[0] * this.hero_data.fixed_attck;
                    }
                    break;
            }
            this.addDeBuffState(buffData.buff_id, buffData.remain_time);
            return true;
        }
        else {
            var buff = this.hero_debuff.get(buffData.buff_id);
            buff.refreshBuff(buffData);
            this.addDeBuffState(buffData.buff_id, buffData.remain_time);
            switch (buffData.buff_id) {
                case HeroConfig_1.BuffId.Boss6_Skill_2_jiangongsu:
                    {
                        if (buff.getFloorNum() < buffData.max_floor) {
                            this.changeAttackSpeed(-buffData.buff_value[0]);
                        }
                    }
                    break;
            }
        }
        return false;
    };
    /**
     * 去除一个debuff
     * @param buff debuff类型
     * @param isNeedRecycle 是否需要调用回收
     * @returns
     */
    Hero.prototype.subDeBuff = function (buffId) {
        var buff = this.hero_debuff.get(buffId);
        if (buff) {
            buff.destroySelf();
            return true;
        }
        return false;
    };
    Hero.prototype.onDeBuffDestory = function (buffData) {
        // let buffState=this.map_debuff_state.get(BuffStateManager.getInstance().getDeBuffType(buffData.buff_id));
        // if(buffState){
        //     buffState.destroySelf();
        // }
        this.hero_debuff.delete(buffData.buff_id);
        switch (buffData.buff_id) {
            case HeroConfig_1.BuffId.Monster_XuanYun:
                {
                    if (this.hero_type != HeroConfig_1.Hero_Type.ZhenDe)
                        // this.mp_progress.setDisable(false);
                        this.gongji_jishu = 0;
                    this.spine.paused = false;
                    this.is_can_touch = true;
                    WallManager_1.default.getInstance().getMainWall().hideVertigo();
                    if (this.xuanyun_callback) {
                        this.xuanyun_callback(false);
                    }
                }
                break;
            case HeroConfig_1.BuffId.Boss3_JIAN_GongSu:
                {
                    this.changeAttackSpeed(buffData.buff_value[0]);
                    var buffState = this.map_debuff_state.get(HeroConfig_1.BuffStateType.AttackSpeed);
                    if (buffState) {
                        buffState.destroySelf();
                    }
                }
                break;
            case HeroConfig_1.BuffId.Boss6_Skill_2_jiangongsu:
                {
                    this.changeAttackSpeed(buffData.buff_value[0] * buffData.cur_floor);
                    var buffState = this.map_debuff_state.get(HeroConfig_1.BuffStateType.AttackSpeed);
                    if (buffState) {
                        buffState.destroySelf();
                    }
                }
                break;
            case HeroConfig_1.BuffId.Boss8_Skill_2_attack:
                {
                    this.hero_data.total_attack += buffData.buff_value[0] * this.hero_data.fixed_attck;
                    var buffState = this.map_debuff_state.get(HeroConfig_1.BuffStateType.Attack);
                    if (buffState) {
                        buffState.destroySelf();
                    }
                }
                break;
        }
    };
    Hero.prototype.isHaveDeBuff = function (buffId) {
        return this.hero_debuff.has(buffId);
    };
    Hero.prototype.removeAllDeBuff = function () {
        var _this = this;
        this.hero_debuff.forEach(function (v, k) {
            _this.subDeBuff(v.getBuffId());
        });
    };
    Hero.prototype.getGameEffectIdByDebuff = function (buff) {
        var gameEffectId = GameEffectsManager_1.GameEffectId.Null;
        switch (buff) {
            case HeroConfig_1.Hero_DeBuff.XuanYun:
                {
                    gameEffectId = GameEffectsManager_1.GameEffectId.xuanyun;
                }
                break;
        }
        return gameEffectId;
    };
    Hero.prototype.getGameEffectNameByDebuff = function (buff) {
        var name = '0';
        switch (buff) {
            case HeroConfig_1.Hero_DeBuff.XuanYun:
                {
                    name = GameEffectsManager_1.GameEffectId.xuanyun + '';
                }
                break;
        }
        return name;
    };
    Hero.prototype.addXuanYunListen = function (callback) {
        this.xuanyun_callback = callback;
    };
    Hero.prototype.resetState = function () {
        this.setCD(1 / 3);
        this.removeAllBuff();
        this.removeAllDeBuff();
        this.map_buff_state.forEach(function (v, k) {
            v.destroySelf();
        });
        this.map_debuff_state.forEach(function (v, k) {
            v.destroySelf();
        });
        if (this.reset_callback) {
            this.reset_callback();
        }
        //同步数据信息
        this.hero_data = GameManager_1.default.getInstance().game_hero_data.get(this.hero_type);
    };
    /**添加一个buff状态图标 */
    Hero.prototype.addBuffState = function (buffId, remainTime) {
        var types = BuffStateManager_1.default.getInstance().getBuffType(buffId);
        for (var i = 0; i < types.length; i++) {
            var type = types[i];
            if (this.map_buff_state.has(type)) {
                this.map_buff_state.get(type).refreshTime(remainTime);
            }
            else {
                var bfState = BuffStateManager_1.default.getInstance().createBuffState(type, this.hero_type);
                bfState.init(type, remainTime, this.onBuffStateDestory.bind(this));
                this.map_buff_state.set(type, bfState);
                //this.node.addChild(shield.node);
            }
        }
    };
    Hero.prototype.onBuffStateDestory = function (type) {
        this.map_buff_state.delete(type);
    };
    /**添加一个buff状态图标 */
    Hero.prototype.addDeBuffState = function (buffId, remainTime) {
        var types = BuffStateManager_1.default.getInstance().getDeBuffType(buffId);
        for (var i = 0; i < types.length; i++) {
            var type = types[i];
            if (this.map_debuff_state.has(type)) {
                this.map_debuff_state.get(type).refreshTime(remainTime);
            }
            else {
                var bfState = BuffStateManager_1.default.getInstance().createDeBuffState(type, this.hero_type);
                bfState.init(type, remainTime, this.onDeBuffStateDestory.bind(this));
                this.map_debuff_state.set(type, bfState);
                //this.node.addChild(shield.node);
            }
        }
    };
    Hero.prototype.onDeBuffStateDestory = function (type) {
        this.map_debuff_state.delete(type);
    };
    /**设置攻速，每秒攻击次数 */
    Hero.prototype.setAttackSpeed = function (numSec) {
        this.gongji_sudu = numSec;
        if (numSec > 10) {
            numSec = 10;
        }
        if (numSec < 0.1) {
            numSec = 0.1;
        }
        this.hero_data.gongji_jiange = 1 / numSec;
    };
    /**改变当前攻速,buffData:比率 */
    Hero.prototype.changeAttackSpeed = function (rate) {
        var gjsd = this.getAttackSpeed();
        gjsd += (rate) * (1 / this.hero_data.base_jiange);
        this.setAttackSpeed(gjsd);
    };
    /**获得当前攻速 */
    Hero.prototype.getAttackSpeed = function () {
        return 1 / this.hero_data.gongji_jiange;
    };
    //---------------------------状态,动画----------------------------------------------
    Hero.prototype.setHeroState = function (state, fangxiang, data, endCallback) {
        this.hero_state = state;
        this.cur_fangxiang = fangxiang;
        switch (this.cur_fangxiang) {
            case HeroConfig_1.GongJi_FangXiang.zuo:
                {
                    this.node.scaleX = this.setup_scale;
                    //this.node.scaleX = -this.setup_scale;
                }
                break;
            case HeroConfig_1.GongJi_FangXiang.zhong:
                {
                    this.node.scaleX = this.setup_scale;
                }
                break;
            case HeroConfig_1.GongJi_FangXiang.you:
                {
                    this.node.scaleX = this.setup_scale;
                }
                break;
        }
        //播放动画
        switch (this.hero_state) {
            case HeroConfig_1.Hero_State.idle:
                {
                    this.playSpineAnimation(this.getSpineName(), true, null, null);
                }
                break;
            case HeroConfig_1.Hero_State.attack:
                {
                    this.playSpineAnimation(this.getSpineName(), false, data, endCallback);
                }
                break;
            case HeroConfig_1.Hero_State.skill:
                {
                    this.playSpineAnimation(this.getSpineName(), false, data, endCallback);
                }
                break;
        }
    };
    Hero.prototype.setHeroStateAndAnimation = function (state, name, loop, data, endCallback) {
        this.hero_state = state;
        this.playSpineAnimation(name, loop, data, endCallback);
    };
    Hero.prototype.getHeroState = function () {
        return this.hero_state;
    };
    /**根据敌人位置获得攻击方向 */
    Hero.prototype.getFangXiangByPos = function (pos) {
        //对敌人单位进行方向判断，确定打击方向
        var fangxiang = HeroConfig_1.GongJi_FangXiang.zhong;
        var offsetPos = pos.sub(this.node.getPosition());
        var pi2 = Math.PI * 2;
        var radian = (Math.atan2(offsetPos.y, offsetPos.x) + pi2) % pi2;
        var angle = 180 * radian / Math.PI;
        if (angle <= 60) {
            fangxiang = HeroConfig_1.GongJi_FangXiang.you;
        }
        else if (angle > 60 && angle < 120) {
            fangxiang = HeroConfig_1.GongJi_FangXiang.zhong;
        }
        else if (angle >= 120 && angle <= 180) {
            fangxiang = HeroConfig_1.GongJi_FangXiang.zuo;
        }
        return fangxiang;
    };
    Hero.prototype.getSpineName = function () {
        switch (this.hero_state) {
            case HeroConfig_1.Hero_State.attack:
                {
                    return HeroConfig_1.Hero_State_Name.Attack;
                }
                break;
            case HeroConfig_1.Hero_State.skill:
                {
                    return HeroConfig_1.Hero_State_Name.Skill;
                }
                break;
            case HeroConfig_1.Hero_State.idle:
                {
                    return HeroConfig_1.Hero_State_Name.Idle;
                }
                break;
        }
    };
    /**
     * 播放一个骨骼动画
     * @param name 骨骼动画名称
     * @param isLoop 是否循环
     * @param data 是否监听关键帧，关键帧数据包含关键帧名称，监听到关键帧后的回调
     * @param endCallback 播放结束后的回调
     */
    Hero.prototype.playSpineAnimation = function (name, isLoop, data, endCallback) {
        if (isLoop === void 0) { isLoop = false; }
        var anima = this.spine.setAnimation(0, name, isLoop);
        if (data) {
            this.spine.setTrackEventListener(anima, function (entry, event) {
                for (var i = 0; i < data.length; i++) {
                    if (event.data.name == data[i].name) {
                        data[i].callback();
                    }
                }
            });
        }
        if (endCallback) {
            this.spine.setTrackCompleteListener(anima, function (entry, event) {
                anima.listener = null;
                endCallback();
            });
        }
    };
    //------------------------------CD--------------------------------------
    Hero.prototype.resetSkill = function () {
        this.skill_cd_time = 0;
        this.showCD();
    };
    Hero.prototype.resetCD = function () {
        this.skill_cd_time = this.skill_total_time;
        this.showCD();
        //释放了技能，立马减去MP
        //GameManager.getInstance().wall_data.changeMp(-this.hero_data.cost_mp);
    };
    /**百分比 */
    Hero.prototype.setCD = function (perTime) {
        this.skill_cd_time = perTime * this.hero_data.getSkillColdDown(HeroConfig_1.SkillType.Active);
        ;
        this.changeCD(0);
    };
    Hero.prototype.changeCD = function (time) {
        this.skill_cd_time += time;
        if (this.skill_cd_time <= 0) {
            this.skill_cd_time = 0;
            if (this.mp_progress) {
                this.mp_progress.setNormalSP();
            }
            if (GameManager_1.default.getInstance().auto_fighting && GameManager_1.default.getInstance().cur_game_state == Constants_1.GameState.Game_Playing && this.getIsCanSkill() && SkillManager_1.default.getInstance().getIsSkillState() == false) {
                this.startAutoRelease();
            }
        }
        else {
            //显示蒙板和倒计时
            if (this.mp_progress) {
                this.mp_progress.setCDSP();
            }
        }
        this.showCD();
    };
    Hero.prototype.showCD = function () {
        if (this.mp_progress) {
            var progress = 1 - this.skill_cd_time / this.skill_total_time;
            this.mp_progress.setProgress(progress);
        }
    };
    Hero.prototype.getIsCanSkill = function () {
        if (this.isHaveDeBuff(HeroConfig_1.BuffId.Monster_XuanYun) || this.getHeroState() == HeroConfig_1.Hero_State.exit) {
            return false;
        }
        this.is_show_mp_hint = false;
        if (this.skill_cd_time <= 0) {
            if (this.is_need_check_distance) {
                //如果需要判断释放距离的，则需要判断释放距离内有没有怪物，没有则返回false
                var enemys = MonsterManager_1.default.getInstance().getMonstersForNearestBySkill(this.max_gongji_num, this.node.y, this.casting_distance);
                if (enemys == null) {
                    return false;
                }
            }
            return true;
        }
        return false;
    };
    /**
     *
     * @param damage 本次不暴击的伤害值
     * @param isBullet 是否子弹类型
     * @param skillType 技能类型
     * @param skillRate 如果是技能，技能的比率
     * @param continuousRate 伤害比率-应用在持续伤害比率
     * @returns 攻击数据
     */
    Hero.prototype.getGongJiData = function (damageType, isBullet, skillType, skillRate, continuousRate) {
        if (skillRate === void 0) { skillRate = 1; }
        if (continuousRate === void 0) { continuousRate = 0; }
        var gjData = new HeroData_1.GongJiData();
        gjData.hero_data = cc.instantiate(this.hero_data);
        gjData.hero_data.attack_increase_damage = GameManager_1.default.getInstance().getCharioAttackRotio() + this.getLvlGonji();
        gjData.is_bullet = isBullet;
        gjData.damage_type = damageType;
        gjData.hero_type = this.hero_type;
        if (damageType == HeroConfig_1.DamageType.Normal) {
        }
        else {
            //技能伤害比率
            gjData.skill_damage_rate = skillRate;
            gjData.continuous_damage_rate = continuousRate;
            if (skillType == HeroConfig_1.SkillType.Active) {
                gjData.skill_release_id = this.getSkillReleaseId();
            }
        }
        return gjData;
    };
    //获取因为游戏内等级变化导致的额外攻击力
    Hero.prototype.getLvlGonji = function () {
        var numGongji = 0;
        if (this.hero_type == HeroConfig_1.Hero_Type.ChangMaoShou) {
            numGongji = this.hero_lvl * 0.05;
            if (this.isHaveBuff(HeroConfig_1.BuffId.Hero_ChangMaoShow_GongSu)) {
                numGongji += this.hero_lvl * 0.05;
            }
        }
        else if (this.hero_type == HeroConfig_1.Hero_Type.ShouWang) {
            numGongji = this.hero_lvl * 0.05;
        }
        else if (this.hero_type == HeroConfig_1.Hero_Type.PaoShou) {
            numGongji = this.hero_lvl * 0.05;
        }
        else if (this.hero_type == HeroConfig_1.Hero_Type.DeLuYi) {
            numGongji = this.hero_lvl * 0.05;
        }
        else if (this.hero_type == HeroConfig_1.Hero_Type.KuangZhanShi) {
            numGongji = this.hero_lvl * 0.1;
            if (this.isHaveBuff(HeroConfig_1.BuffId.Hero_KuangZhanShi_DaZhao)) {
                numGongji += this.hero_lvl * 0.1;
            }
        }
        else if (this.hero_type == HeroConfig_1.Hero_Type.ZhenDe) {
            numGongji = this.hero_lvl * 0.1;
        }
        else if (this.hero_type == HeroConfig_1.Hero_Type.NvWu) {
            numGongji = this.hero_lvl * 0.1;
        }
        else if (this.hero_type == HeroConfig_1.Hero_Type.GongJianShou) {
            numGongji = this.hero_lvl * 0.1;
        }
        else if (this.hero_type == HeroConfig_1.Hero_Type.BingNv) {
            numGongji = this.hero_lvl * 0.15;
        }
        else if (this.hero_type == HeroConfig_1.Hero_Type.ANuBiSi) {
            numGongji = this.hero_lvl * 0.15;
        }
        else if (this.hero_type == HeroConfig_1.Hero_Type.MeiMo) {
            numGongji = this.hero_lvl * 0.15;
        }
        else if (this.hero_type == HeroConfig_1.Hero_Type.LeiShen) {
            numGongji = this.hero_lvl * 0.15;
        }
        return numGongji;
    };
    Hero.prototype.onDamageMonster = function (damageType, isCrit, monster) {
        if (damageType == HeroConfig_1.DamageType.Normal) {
            if (this.pet) {
                this.pet.onHeroHitMonster(monster);
            }
        }
        if (this.hit_callback) {
            this.hit_callback(damageType, isCrit, monster);
        }
    };
    Hero.prototype.resetGongJiJiShu = function () {
        this.gongji_jishu = 0;
        this.is_can_jishu = true;
    };
    Hero.prototype.resetNormalAttack = function () {
        this.gongji_jishu = this.hero_data.gongji_jiange;
        this.is_can_jishu = true;
    };
    Hero.prototype.setAttSpineScale = function () {
        this.spine.timeScale = this.hero_data.base_jiange / this.hero_data.gongji_jiange;
    };
    Hero.prototype.startNormalAttack = function (monster) {
        var isDouble = this.is_double_attack;
        this.setAttSpineScale();
        if (this.is_double_attack) {
            this.spine.timeScale = this.hero_data.base_jiange / this.hero_data.gongji_jiange * 2;
        }
        this.is_double_attack = false;
        this.attack_callback(monster);
        if (this.pet) {
            this.pet.startReleaseSkill(monster);
        }
        if (GameManager_1.default.getInstance().cur_game_mode == Constants_1.GameMode.Endless) {
            if (isDouble == false) {
                var buff = this.getEndlessByType(EndlessConfig_1.EndlessBuffType.DoubleAttack);
                if (buff) {
                    //概率
                    var rate = buff.value;
                    if (Math.random() < rate) {
                        this.is_double_attack = true;
                        this.spine.timeScale = this.hero_data.base_jiange / this.hero_data.gongji_jiange * 2;
                    }
                }
            }
        }
    };
    //---------------------------UPDATE-----------------------------------
    Hero.prototype.update = function (dt) {
        if (GameManager_1.default.getInstance().cur_game_state != Constants_1.GameState.Game_Playing || HeroConfig_1.Hero_State.exit == this.getHeroState())
            return;
        this.checkSkill(dt);
        if (this.isHaveDeBuff(HeroConfig_1.BuffId.Monster_XuanYun)) {
            return;
        }
        this.checkAttack(dt);
        if (this.click_remain > 0) {
            this.click_remain -= dt;
        }
        var vx = (this.targetX - this.node.x) * this.easing;
        this.node.x += vx;
        if (this.posIndex == 2) {
            GameManager_1.default.getInstance().charPosX = this.node.x;
        }
        if (this.node_shadow) {
            this.node_shadow.setPosition(cc.v2(this.node.x + this.pos.x * this.setup_scale, this.node.y + this.pos.y * this.setup_scale));
        }
        // switch (this.speedType) {
        //     case SpeedType.STOP:
        //         this.moveSpeed = this.stopSpeed;
        //         break;
        //     case SpeedType.NORMAL:
        //         this.moveSpeed = this.normalSpeed;
        //         break;
        //     case SpeedType.FAST:
        //         this.moveSpeed = this.fastSpeed;
        //         break;
        //     default:
        //         break;
        // }
        // this.move();
    };
    Hero.prototype.updateCheck = function (dt) {
        if (this.isHaveDeBuff(HeroConfig_1.BuffId.Monster_XuanYun)) {
            return false;
        }
        this.checkAttack(dt);
        return true;
    };
    Hero.prototype.checkSkill = function (dt) {
        if (this.hero_state != HeroConfig_1.Hero_State.skill) {
            this.changeCD(-dt);
        }
    };
    Hero.prototype.checkAttack = function (dt) {
        if (this.is_can_jishu && this.is_load_ok) {
            this.gongji_jishu += dt;
            if (this.gongji_jishu >= this.hero_data.gongji_jiange) {
                //开始攻击
                this.gongji_jishu = 0;
                this.is_can_gongji = true;
            }
        }
        //自动攻击
        if (this.is_can_gongji && this.getHeroState() != HeroConfig_1.Hero_State.skill) {
            this.is_can_gongji = false;
            var monsters = MonsterManager_1.default.getInstance().getMonstersForNearest(this.max_gongji_num, this.node.getPosition(), this.hero_data.gongji_fanwei, this.posIndex);
            if (monsters) {
                this.gongji_jishu = 0;
                this.is_can_gongji = true;
                this.setAttSpineScale();
                this.startNormalAttack(monsters[0]);
            }
        }
    };
    var Hero_1;
    /**所有的英雄及其所需资源是否加载完毕 */
    Hero.max_load_num = 0;
    Hero.cur_loaded_num = 0;
    __decorate([
        property({ type: cc.Enum(HeroConfig_1.Hero_Type) })
    ], Hero.prototype, "hero_type", void 0);
    __decorate([
        property(cc.Prefab)
    ], Hero.prototype, "prefab_skill_tip", void 0);
    Hero = Hero_1 = __decorate([
        ccclass
    ], Hero);
    return Hero;
}(cc.Component));
exports.default = Hero;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcR2FtZVxcSGVyby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBK0w7QUFHL0wsNkNBQXdEO0FBRXhELGlEQUE0QztBQUM1QyxvRUFBaUY7QUFFakYsK0RBQTBEO0FBQzFELDZDQUFzRDtBQUN0RCxnRUFBMkQ7QUFDM0QseURBQXNFO0FBQ3RFLHdEQUFtRDtBQUNuRCx5Q0FBb0M7QUFDcEMsdUNBQXNDO0FBQ3RDLHVDQUFrQztBQUNsQyxvREFBK0M7QUFDL0MsdUVBQWtFO0FBQ2xFLHNEQUFpRDtBQUNqRCxnREFBK0M7QUFDL0Msc0RBQWlEO0FBQ2pELDRFQUEwRjtBQUMxRixrRUFBd0U7QUFDeEUsa0RBQTZDO0FBQzdDLHFEQUEyRDtBQUMzRCxnREFBMkM7QUFDM0Msa0RBQTZDO0FBQzdDLGdEQUEyQztBQUMzQyxpREFBNEM7QUFDNUMsK0RBQTREO0FBSXRELElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQWtDLHdCQUFZO0lBQTlDO1FBQUEscUVBZzlDQztRQTU4Q0csaUJBQWlCO1FBQ2pCLGdCQUFVLEdBQVksS0FBSyxDQUFDO1FBQzVCLGtCQUFZLEdBQVcsQ0FBQyxDQUFDO1FBQ3pCLG1CQUFhLEdBQVcsQ0FBQyxDQUFDO1FBRTFCLGlCQUFXLEdBQVksS0FBSyxDQUFDLENBQUEsU0FBUztRQUd0QyxlQUFTLEdBQWMsc0JBQVMsQ0FBQyxZQUFZLENBQUM7UUFHOUMsc0JBQWdCLEdBQWMsSUFBSSxDQUFDO1FBRW5DLE1BQU07UUFDTixXQUFLLEdBQWdCLElBQUksQ0FBQztRQUMxQixhQUFhO1FBQ2IsbUJBQWEsR0FBcUIsNkJBQWdCLENBQUMsR0FBRyxDQUFDO1FBQ3ZELFdBQVc7UUFDWCxnQkFBVSxHQUFlLHVCQUFVLENBQUMsSUFBSSxDQUFDO1FB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N0M7a0JBaDlDb0IsSUFBSSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJ1ZmZJZCwgQnVmZlN0YXRlVHlwZSwgQnVmZlR5cGUsIERhbWFnZVR5cGUsIEdvbmdKaV9GYW5nWGlhbmcsIEhlcm9fRGVCdWZmLCBIZXJvX1N0YXRlLCBIZXJvX1N0YXRlX05hbWUsIEhlcm9fVHlwZSwgU2tpbGxJbmRpY2F0b3JUeXBlLCBTa2lsbFRpcFR5cGUsIFNraWxsVHlwZSB9IGZyb20gXCIuL0hlcm9Db25maWdcIjtcclxuaW1wb3J0IE1wUHJvZ3Jlc3MgZnJvbSBcIi4vTXBQcm9ncmVzc1wiO1xyXG5pbXBvcnQgQnVmZlN0YXRlIGZyb20gXCIuL0J1ZmZTdGF0ZVwiO1xyXG5pbXBvcnQgeyBHb25nSmlEYXRhLCBIZXJvRGF0YSB9IGZyb20gXCIuLi9EYXRhL0hlcm9EYXRhXCI7XHJcbmltcG9ydCBQZXQgZnJvbSBcIi4uLy4uL1BldC9HYW1lL1BldFwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uLy4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEdhbWVFZmZlY3RJZCwgR2FtZUVmZmVjdHNNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0dhbWUvR2FtZUVmZmVjdHNNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEhlcm9NYW5hZ2VyIH0gZnJvbSBcIi4uL0RhdGEvSGVyb01hbmFnZXJcIjtcclxuaW1wb3J0IE1vbnN0ZXJNYW5hZ2VyIGZyb20gXCIuLi8uLi9Nb25zdGVyL01vbnN0ZXJNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEdhbWVNb2RlLCBHYW1lU3RhdGUgfSBmcm9tIFwiLi4vLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBCdWZmU3RhdGVNYW5hZ2VyIGZyb20gXCIuLi8uLi9HYW1lL0J1ZmZTdGF0ZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgSW5qdXJlZERhdGEsIEtleUZyYW1lRGF0YSB9IGZyb20gXCIuLi8uLi9Nb25zdGVyL01vbnN0ZXJEYXRhXCI7XHJcbmltcG9ydCBTa2lsbE1hbmFnZXIgZnJvbSBcIi4uLy4uL0dhbWUvU2tpbGxNYW5hZ2VyXCI7XHJcbmltcG9ydCBCdWZmVGltZXIgZnJvbSBcIi4vQnVmZlRpbWVyXCI7XHJcbmltcG9ydCB7IEJ1ZmZEYXRhIH0gZnJvbSBcIi4vQnVmZkRhdGFcIjtcclxuaW1wb3J0IFNraWxsVGlwIGZyb20gXCIuL1NraWxsVGlwXCI7XHJcbmltcG9ydCBTa3lNYW5hZ2VyIGZyb20gXCIuLi8uLi9HYW1lL1NreU1hbmFnZXJcIjtcclxuaW1wb3J0IExhbmd1YWdlTWFuYWdlciBmcm9tIFwiLi4vLi4vbXVsdGlMYW5ndWFnZS9MYW5ndWFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IFRhc2tNYW5hZ2VyIGZyb20gXCIuLi8uLi9UYXNrL1Rhc2tNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFRhc2tJdGVtIH0gZnJvbSBcIi4uLy4uL1Rhc2svVGFza0VudW1cIjtcclxuaW1wb3J0IFdhbGxNYW5hZ2VyIGZyb20gXCIuLi8uLi9XYWxsL1dhbGxNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEVuZGxlc3NCdWZmLCBFbmRsZXNzQnVmZlR5cGUgfSBmcm9tIFwiLi4vLi4vY29weS9lbmRsZXNzY2hhbGxlbmdlcy9FbmRsZXNzQ29uZmlnXCI7XHJcbmltcG9ydCB7IFNwaXJpdEF0dHJpYnV0ZU1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vUGV0L0RhdGEvU3Bpcml0QXR0cmlidXRlXCI7XHJcbmltcG9ydCBGaXJlUGV0IGZyb20gXCIuLi8uLi9QZXQvR2FtZS9GaXJlUGV0XCI7XHJcbmltcG9ydCB7IEhlcm9CYXNlSW5mb01hbmFnZXIgfSBmcm9tIFwiLi4vRGF0YS9IZXJvQmFzZUluZm9cIjtcclxuaW1wb3J0IEljZVBldCBmcm9tIFwiLi4vLi4vUGV0L0dhbWUvSWNlUGV0XCI7XHJcbmltcG9ydCBXaW5kUGV0IGZyb20gXCIuLi8uLi9QZXQvR2FtZS9XaW5kUGV0XCI7XHJcbmltcG9ydCBSYXlQZXQgZnJvbSBcIi4uLy4uL1BldC9HYW1lL1JheVBldFwiO1xyXG5pbXBvcnQgTW9uc3RlciBmcm9tIFwiLi4vLi4vTW9uc3Rlci9Nb25zdGVyXCI7XHJcbmltcG9ydCB7IGluc3RhbmNlIH0gZnJvbSBcIi4uLy4uL0dhbWUvVG91Y2hQbGFuZS9Ub3VjaFBsYW5lXCI7XHJcblxyXG5cclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIZXJvIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuICAgIC8qKuaJgOacieeahOiLsembhOWPiuWFtuaJgOmcgOi1hOa6kOaYr+WQpuWKoOi9veWujOavlSAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBtYXhfbG9hZF9udW06IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgc3RhdGljIGN1cl9sb2FkZWRfbnVtOiBudW1iZXIgPSAwO1xyXG4gICAgLyoq5omA6ZyA55qE5Yqo55S75Yqg6L295piv5ZCmb2sgKi9cclxuICAgIGlzX2xvYWRfb2s6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIGN1cl9sb2FkX251bTogbnVtYmVyID0gMDtcclxuICAgIG5lZWRfbG9hZF9udW06IG51bWJlciA9IDA7XHJcblxyXG4gICAgaXNfTG9hZExvYWQ6IGJvb2xlYW4gPSBmYWxzZTsvL+W8guatpeWKoOi9vei1hOa6kOmUgVxyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkVudW0oSGVyb19UeXBlKSB9KVxyXG4gICAgaGVyb190eXBlOiBIZXJvX1R5cGUgPSBIZXJvX1R5cGUuQ2hhbmdNYW9TaG91O1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICBwcmVmYWJfc2tpbGxfdGlwOiBjYy5QcmVmYWIgPSBudWxsO1xyXG5cclxuICAgIC8v6aqo6aq85Yqo55S7XHJcbiAgICBzcGluZTogc3AuU2tlbGV0b24gPSBudWxsO1xyXG4gICAgLyoq5b2T5YmN6Iux6ZuE55qE6Z2i5ZCRICovXHJcbiAgICBjdXJfZmFuZ3hpYW5nOiBHb25nSmlfRmFuZ1hpYW5nID0gR29uZ0ppX0ZhbmdYaWFuZy56dW87XHJcbiAgICAvKiroi7Hpm4TnmoTnirbmgIEgKi9cclxuICAgIGhlcm9fc3RhdGU6IEhlcm9fU3RhdGUgPSBIZXJvX1N0YXRlLmlkbGU7XHJcbiAgICAvL+aUu+WHu+iuoeaVsFxyXG4gICAgZ29uZ2ppX2ppc2h1OiBudW1iZXIgPSAxO1xyXG4gICAgLyoq5piv5ZCm5Y+v5Lul5pS75Ye7ICovXHJcbiAgICBpc19jYW5fZ29uZ2ppOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAvKirmmK/lkKblj6/ku6XmlLvlh7vorqHmlbAgKi9cclxuICAgIGlzX2Nhbl9qaXNodTogYm9vbGVhbiA9IHRydWU7XHJcbiAgICAvL+acgOWkp+eahOaUu+WHu+asoeaVsFxyXG4gICAgbWF4X2dvbmdqaV9udW0gPSAxO1xyXG4gICAgLy/mioDog73liankvZnnmoTlhrfljbTml7bpl7RcclxuICAgIHNraWxsX2NkX3RpbWU6IG51bWJlciA9IDA7XHJcbiAgICAvKirkuLvliqjmioDog73mioDog73mnIDlpKflhrfljbQqL1xyXG4gICAgc2tpbGxfdG90YWxfdGltZTogbnVtYmVyID0gNTtcclxuICAgIC8qKuaWveazlei3neemuyAqL1xyXG4gICAgY2FzdGluZ19kaXN0YW5jZTogbnVtYmVyID0gMTAwMDtcclxuICAgIC8qKuWtkOW8uemAn+W6piAqL1xyXG4gICAgYnVsbGV0X3NwZWVkOiBudW1iZXIgPSAxMDAwO1xyXG4gICAgLy/mtojogJfnmoRNUOWAvFxyXG4gICAgY29zdF9tcDogbnVtYmVyID0gMjA7XHJcbiAgICAvL+iLsembhOS9jee9rlxyXG4gICAgcG9zSW5kZXg6IG51bWJlciA9IC0xO1xyXG4gICAgLy/muLjmiI/lhoXnmoTnrYnnuqdcclxuICAgIGhlcm9fbHZsOiBudW1iZXIgPSAwO1xyXG4gICAgbXBfcHJvZ3Jlc3M6IE1wUHJvZ3Jlc3MgPSBudWxsO1xyXG4gICAgLyoq6Iux6ZuE5b2T5YmN5oul5pyJ55qEYnVmZiAqL1xyXG4gICAgcHJvdGVjdGVkIGhlcm9fYnVmZjogTWFwPEJ1ZmZJZCwgQnVmZlRpbWVyPiA9IG51bGw7XHJcbiAgICAvKiroi7Hpm4TlvZPliY3mi6XmnInnmoRkZWJ1ZmYgKi9cclxuICAgIHByb3RlY3RlZCBoZXJvX2RlYnVmZjogTWFwPEJ1ZmZJZCwgQnVmZlRpbWVyPiA9IG51bGw7XHJcbiAgICAvKirml6DlsL1idWZmICovXHJcbiAgICBwcm90ZWN0ZWQgbWFwX2VuZGxlc3NfYnVmZjogTWFwPG51bWJlciwgRW5kbGVzc0J1ZmY+ID0gbnVsbDtcclxuICAgIC8qKuecqeaZleS9jee9riAqL1xyXG4gICAgeHVhbnl1bl9wb3M6IGNjLlZlYzIgPSBudWxsO1xyXG4gICAgLyoq5a2Q5by555Sf5oiQ55qE5L2N572uICovXHJcbiAgICBidWxsZXRfcG9zOiBjYy5WZWMyW10gPSBbXTtcclxuICAgIC8v6Iux6ZuE55qE5pWw5o2uXHJcbiAgICBoZXJvX2RhdGE6IEhlcm9EYXRhID0gbnVsbDtcclxuICAgIGlzX3Nob3dfbXBfaGludDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIC8qKuW9k+WJjeeahOmfp+aApyAqL1xyXG4gICAgcHJvdGVjdGVkIGN1cl90b3VnaG5lc3M6IG51bWJlciA9IDA7XHJcbiAgICB6aGlzaGlxaV90eXBlOiBTa2lsbEluZGljYXRvclR5cGUgPSBTa2lsbEluZGljYXRvclR5cGUuYmVlbGluZTtcclxuICAgIC8qKuaKgOiDvemHiuaUvuWbnuiwgyAqL1xyXG4gICAgc2tpbGxfY2FsbGJhY2s6IEZ1bmN0aW9uID0gbnVsbDtcclxuICAgIC8qKuaUu+WHu+mHiuaUvuWbnuiwgyAqL1xyXG4gICAgYXR0YWNrX2NhbGxiYWNrOiBGdW5jdGlvbiA9IG51bGw7XHJcbiAgICAvKirnnKnmmZXlm57osIMgKi87XHJcbiAgICB4dWFueXVuX2NhbGxiYWNrOiBGdW5jdGlvbiA9IG51bGw7XHJcbiAgICAvKirlkb3kuK3lm57osIMgKi9cclxuICAgIGhpdF9jYWxsYmFjazogRnVuY3Rpb24gPSBudWxsO1xyXG4gICAgLyoq6YeN572u5Zue6LCDICovXHJcbiAgICByZXNldF9jYWxsYmFjazogRnVuY3Rpb24gPSBudWxsO1xyXG4gICAgLyoq6IOc5Yip5Zue6LCDICovXHJcbiAgICB3aW5fY2FsbGJhY2s6IEZ1bmN0aW9uID0gbnVsbDtcclxuICAgIC8qKuWKoOi9veWujOavleWbnuiwg+WbnuiwgyAqL1xyXG4gICAgbG9hZGVkX2NhbGxiYWNrOiBGdW5jdGlvbiA9IG51bGw7XHJcbiAgICAvKirlrqDniakgKi9cclxuICAgIHBldDogUGV0ID0gbnVsbDtcclxuICAgIC8qKuWuoOeJqeaKgOiDveeahOS4gOS6m+iiq+WKqCAqL1xyXG4gICAgLyoq5q2k5qyh5Lyk5a6z5b+F5a6a5pq05Ye7ICovXHJcbiAgICBtdXN0X2NyaXQ6IG51bWJlciA9IDA7XHJcbiAgICAvKirlrqDniakyMeWPr+S7peinpuWPkeWinuS8pOasoeaVsCAqL1xyXG4gICAgY3JpdF9pbmNyZWFzZV9jZF8zX251bTogbnVtYmVyID0gMDtcclxuXHJcbiAgICBzZXR1cF9zY2FsZTogbnVtYmVyID0gMC41MDtcclxuICAgIGJhc2VfYXR0X2ppYW5nZTogbnVtYmVyID0gMDtcclxuXHJcbiAgICAvKipidWZm54q25oCBICovXHJcbiAgICBtYXBfYnVmZl9zdGF0ZTogTWFwPG51bWJlciwgQnVmZlN0YXRlPiA9IG51bGw7XHJcbiAgICAvKipkZWJ1ZmbnirbmgIEgKi9cclxuICAgIG1hcF9kZWJ1ZmZfc3RhdGU6IE1hcDxudW1iZXIsIEJ1ZmZTdGF0ZT4gPSBudWxsO1xyXG4gICAgLyoq5piv5ZCm6ZyA6KaB5qOA5p+l5oqA6IO96YeK5pS+6Led56a7ICovXHJcbiAgICBpc19uZWVkX2NoZWNrX2Rpc3RhbmNlOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIC8qKuaMh+ekuuWZqOexu+WeiyAqL1xyXG4gICAgcHJvdGVjdGVkIHNraWxsX3RpcF90eXBlOiBTa2lsbFRpcFR5cGUgPSBTa2lsbFRpcFR5cGUuRnVsbDtcclxuICAgIC8qKuaYr+WQpuWPr+S7peWkhOeQhuinpuaRuOS6i+S7tu+8jOW9k+aKgOiDvUNE5a6M5q+V5YiH5oyJ5LiL5LqG6Iux6ZuE5pe25Li6dHJ1ZSAqL1xyXG4gICAgcHJpdmF0ZSBpc19jYW5fdG91Y2g6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgc2tpbGxfdGlwOiBTa2lsbFRpcCA9IG51bGw7XHJcbiAgICAvKirmmK/lkKbop6blj5Hoh6rliqjph4rmlL7pgLvovpEgKi9cclxuICAgIHByaXZhdGUgaXNfYXV0b19yZWxlYXNlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIHRvdWNoX3JlY3Q6IGNjLlJlY3QgPSBudWxsO1xyXG4gICAgLyoq5oC75YWx5L2/55So5oqA6IO955qE5qyh5pWwICovXHJcbiAgICBwcm90ZWN0ZWQgdXNlX3NraWxsX251bTogbnVtYmVyID0gMDtcclxuICAgIHByb3RlY3RlZCBub2RlX3NoYWRvdzogY2MuTm9kZSA9IG51bGw7XHJcbiAgICAvKirngrnlh7vliankvZkgKi9cclxuICAgIHByb3RlY3RlZCBjbGlja19yZW1haW46IG51bWJlciA9IDA7XHJcbiAgICAvKirmlLvpgJ/orrDlvZXlgLzvvIzkuI3kvZzliKTmlq0gKi9cclxuICAgIGdvbmdqaV9zdWR1OiBudW1iZXIgPSAwO1xyXG4gICAgLyoq5oqA6IO96Zif5YiXICovXHJcbiAgICBza2lsbF9xdWV1ZTogU2tpbGxUeXBlW10gPSBbXTtcclxuICAgIC8qKuaYr+WQpui/nue7reaUu+WHuyAqL1xyXG4gICAgaXNfZG91YmxlX2F0dGFjazogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgLyoq5bGC57qnKi9cclxuICAgIHB1YmxpYyB2X0luZGV4OiBudW1iZXIgPSAwO1xyXG5cclxuICAgIHBvczogY2MuVmVjMjtcclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1MT0FELS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBwcm90ZWN0ZWQgb25Mb2FkKCkge1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWxsX2hlcm8uc2V0KHRoaXMuaGVyb190eXBlLCB0aGlzKTtcclxuXHJcbiAgICAgICAgdGhpcy5zcGluZSA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pO1xyXG4gICAgICAgIC8vdGhpcy5zZXRTa2luKCk7XHJcbiAgICAgICAgdGhpcy50b3VjaExpc3RlbigpO1xyXG4gICAgICAgIHRoaXMuaW5pdFBvcygpO1xyXG4gICAgICAgIC8vIGlmKHRoaXMuaGVyb190eXBlPT1IZXJvX1R5cGUuRGVMdVlpKXtcclxuICAgICAgICAvLyAgICAgdGhpcy5zZXR1cF9zY2FsZT0wLjIyO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyBpZih0aGlzLmhlcm9fdHlwZT09SGVyb19UeXBlLkxlaVNoZW58fHRoaXMuaGVyb190eXBlPT1IZXJvX1R5cGUuU2hvdVdhbmcpe1xyXG4gICAgICAgIC8vICAgICB0aGlzLnNldHVwX3NjYWxlPTE7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIHRoaXMubm9kZS5zY2FsZSA9IHRoaXMuc2V0dXBfc2NhbGU7XHJcbiAgICAgICAgdGhpcy5ub2RlLnNjYWxlWCA9IC10aGlzLnNldHVwX3NjYWxlO1xyXG4gICAgICAgIHRoaXMuYWRkTG9hZEJ5R2FtZUVmZmVjdElkKEdhbWVFZmZlY3RJZC5oZXJvX3NraWxsX2NvbW1vbiwgMik7XHJcbiAgICAgICAgdGhpcy5hZGRMb2FkQnlHYW1lRWZmZWN0SWQoR2FtZUVmZmVjdElkLnNraWxsX2RhbWFnZV9yZWNvcmQsIDIpO1xyXG4gICAgICAgIHRoaXMubm9kZS56SW5kZXggPSAxO1xyXG4gICAgICAgIHRoaXMubWFwX2J1ZmZfc3RhdGUgPSBuZXcgTWFwPG51bWJlciwgQnVmZlN0YXRlPigpO1xyXG4gICAgICAgIHRoaXMubWFwX2RlYnVmZl9zdGF0ZSA9IG5ldyBNYXA8bnVtYmVyLCBCdWZmU3RhdGU+KCk7XHJcbiAgICAgICAgdGhpcy5oZXJvX2J1ZmYgPSBuZXcgTWFwPEJ1ZmZJZCwgQnVmZlRpbWVyPigpO1xyXG4gICAgICAgIHRoaXMuaGVyb19kZWJ1ZmYgPSBuZXcgTWFwPEJ1ZmZJZCwgQnVmZlRpbWVyPigpO1xyXG4gICAgICAgIHRoaXMubWFwX2VuZGxlc3NfYnVmZiA9IG5ldyBNYXA8QnVmZklkLCBFbmRsZXNzQnVmZj4oKTtcclxuICAgICAgICB0aGlzLmFkZFNraWxsVGlwVHlwZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBzdGFydCgpIHtcclxuICAgICAgICAvL+WKoOi9veaVsOaNrlxyXG4gICAgICAgIHRoaXMuaGVyb19kYXRhID0gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nYW1lX2hlcm9fZGF0YS5nZXQodGhpcy5oZXJvX3R5cGUpO1xyXG4gICAgICAgIHRoaXMuaGVyb19sdmw9MDtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlZnJlc2hNYWluV2FsbERhdGFCeWFkZEhlcm8oKVxyXG4gICAgICAgIHRoaXMuYnVsbGV0X3NwZWVkID0gSGVyb0Jhc2VJbmZvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEJhc2VCdWxsZXRTcGVlZCh0aGlzLmhlcm9fdHlwZSk7XHJcbiAgICAgICAgdGhpcy5nb25namlfamlzaHUgPSB0aGlzLmhlcm9fZGF0YS5nb25namlfamlhbmdlO1xyXG4gICAgICAgIHRoaXMuZ29uZ2ppX3N1ZHUgPSB0aGlzLmdldEF0dGFja1NwZWVkKCk7XHJcbiAgICAgICAgdGhpcy5zZXRIZXJvU3RhdGUoSGVyb19TdGF0ZS5pZGxlLCBHb25nSmlfRmFuZ1hpYW5nLnpob25nKTtcclxuICAgICAgICAvL3RoaXMucGxheVNwaW5lQW5pbWF0b24oSGVyb19TdGF0ZV9OYW1lLklkbGUsdHJ1ZSxudWxsLG51bGwpO1xyXG4gICAgICAgIC8v5Yqg6L29bXDov5vluqbmnaFcclxuICAgICAgICB0aGlzLmxvYWRNcFByb2dyZXNzKCk7XHJcbiAgICAgICAgdGhpcy5sb2FkUGV0KCk7XHJcbiAgICAgICAgbGV0IHNlbGZTaGFkb3cgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ01vbnN0ZXJfU2hhZG93Jyk7XHJcbiAgICAgICAgdGhpcy5wb3MgPSBzZWxmU2hhZG93LmdldFBvc2l0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5ub2RlX3NoYWRvdyA9IGNjLmluc3RhbnRpYXRlKHNlbGZTaGFkb3cpO1xyXG4gICAgICAgIHRoaXMubm9kZV9zaGFkb3cucGFyZW50ID0gY2MuZmluZCgnQ2FudmFzL0hlcm9fU2hhZG93X1Jvb3QnKTtcclxuICAgICAgICB0aGlzLm5vZGVfc2hhZG93LnNjYWxlID0gdGhpcy5zZXR1cF9zY2FsZTtcclxuICAgICAgICB0aGlzLm5vZGVfc2hhZG93LnNldFBvc2l0aW9uKGNjLnYyKHRoaXMubm9kZS54ICsgdGhpcy5wb3MueCAqIHRoaXMuc2V0dXBfc2NhbGUsIHRoaXMubm9kZS55ICsgdGhpcy5wb3MueSAqIHRoaXMuc2V0dXBfc2NhbGUpKTtcclxuICAgICAgICBzZWxmU2hhZG93LnJlbW92ZUZyb21QYXJlbnQoKTtcclxuICAgICAgICBpZiAodGhpcy5nZXRIZXJvU3RhdGUoKSA9PSBIZXJvX1N0YXRlLmV4aXQpIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlX3NoYWRvdy5vcGFjaXR5ID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gdGhpcy5ub2RlLnpJbmRleCA9IDI7XHJcbiAgICAgICAgdGhpcy5jYXN0aW5nX2Rpc3RhbmNlID0gdGhpcy5oZXJvX2RhdGEuZ29uZ2ppX2ZhbndlaTtcclxuICAgICAgICBpZiAoY2Mud2luU2l6ZS5oZWlnaHQgLyBjYy53aW5TaXplLndpZHRoID4gMikge1xyXG4gICAgICAgICAgICB0aGlzLmNhc3RpbmdfZGlzdGFuY2UgPSB0aGlzLmhlcm9fZGF0YS5nb25namlfZmFud2VpICsgMjAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBpZih0aGlzLmhlcm9fdHlwZT09SGVyb19UeXBlLk52V3Upe1xyXG4gICAgICAgIC8vICAgICB0aGlzLmNhc3RpbmdfZGlzdGFuY2U9MTkyKjMrR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5lbmVteV9hdHRfeS10aGlzLm5vZGUueVxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICB0aGlzLnNldFRvdWNoUmVjdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRGVzdHJveSgpIHtcclxuICAgICAgICAvL+WPlua2iOebkeWQrOinpuaRuOS6i+S7tlxyXG4gICAgICAgIGxldCB0b3VjaE5vZGUgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3RvdWNoTm9kZScpO1xyXG4gICAgICAgIGlmICh0b3VjaE5vZGUpIHtcclxuICAgICAgICAgICAgLy8gdG91Y2hOb2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCx0aGlzLm9uVG91Y2hTdGFydCx0aGlzKTtcclxuICAgICAgICAgICAgLy8gdG91Y2hOb2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9NT1ZFLHRoaXMub25Ub3VjaE1vdmUsdGhpcyk7XHJcbiAgICAgICAgICAgIC8vIHRvdWNoTm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELHRoaXMub25Ub3VjaEVuZCx0aGlzKTtcclxuICAgICAgICAgICAgLy8gdG91Y2hOb2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9DQU5DRUwsdGhpcy5vblRvdWNoQ2FuY2VsLHRoaXMpO1xyXG4gICAgICAgICAgICAvLyBpbnN0YW5jZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIHRoaXMub25Ub3VjaFN0YXJ0QnlKb3ksIHRoaXMpO1xyXG4gICAgICAgICAgICAvLyBpbnN0YW5jZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfTU9WRSwgdGhpcy5vblRvdWNoTW92ZUJ5Sm95LCB0aGlzKTtcclxuICAgICAgICAgICAgaW5zdGFuY2Uub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vblRvdWNoRW5kQnlKb3ksIHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFsbF9oZXJvLmRlbGV0ZSh0aGlzLmhlcm9fdHlwZSlcclxuICAgIH1cclxuXHJcbiAgICBhZGRTa2lsbFRpcFR5cGUoKSB7XHJcbiAgICAgICAgbGV0IG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnByZWZhYl9za2lsbF90aXApO1xyXG4gICAgICAgIHRoaXMuc2tpbGxfdGlwID0gbm9kZS5nZXRDb21wb25lbnQoU2tpbGxUaXApO1xyXG4gICAgICAgIHRoaXMuc2tpbGxfdGlwX3R5cGUgPSB0aGlzLnNraWxsX3RpcC5nZXRTa2lsbFRpcFR5cGUoKTtcclxuICAgICAgICB0aGlzLnNraWxsX3RpcC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5za2lsbF90aXBfdHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIFNraWxsVGlwVHlwZS5GdWxsOiB7XHJcbiAgICAgICAgICAgICAgICBTa2lsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFNraWxsVGlwVHlwZS5DaXJjbGU6IHtcclxuICAgICAgICAgICAgICAgIFNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgU2tpbGxUaXBUeXBlLlJlY3Q6IHtcclxuICAgICAgICAgICAgICAgIFNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgU2tpbGxUaXBUeXBlLkRpcjoge1xyXG4gICAgICAgICAgICAgICAgU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VG91Y2hSZWN0KCkge1xyXG4gICAgICAgIGxldCB0b3VjaE5vZGUgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3RvdWNoTm9kZScpO1xyXG4gICAgICAgIHRoaXMudG91Y2hfcmVjdCA9IGNjLnJlY3QodGhpcy5ub2RlLnggKyB0b3VjaE5vZGUueCAqIHRoaXMuc2V0dXBfc2NhbGUgLSAodG91Y2hOb2RlLndpZHRoICogdGhpcy5zZXR1cF9zY2FsZSAvIDIpLCB0aGlzLm5vZGUueSArIHRvdWNoTm9kZS55ICogdGhpcy5zZXR1cF9zY2FsZSAtICh0b3VjaE5vZGUuaGVpZ2h0ICogdGhpcy5zZXR1cF9zY2FsZSAvIDIpLCB0b3VjaE5vZGUud2lkdGggKiB0aGlzLnNldHVwX3NjYWxlLCB0b3VjaE5vZGUuaGVpZ2h0ICogdGhpcy5zZXR1cF9zY2FsZSk7XHJcbiAgICAgICAgLy8gbGV0IGdnPWNjLmZpbmQoJ0NhbnZhcy9GaWdodGluZ19Sb290JykuZ2V0Q29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICAvLyBnZy5yZWN0KHRoaXMudG91Y2hfcmVjdC54LHRoaXMudG91Y2hfcmVjdC55LHRoaXMudG91Y2hfcmVjdC53aWR0aCx0aGlzLnRvdWNoX3JlY3QuaGVpZ2h0KTtcclxuICAgICAgICAvLyBnZy5zdHJva2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRTa2lsbFRpcFNpemUod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnNraWxsX3RpcC5ub2RlLndpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgdGhpcy5za2lsbF90aXAubm9kZS5oZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U2tpbGxUaXBTaXplKCk6IGNjLlNpemUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNraWxsX3RpcC5ub2RlLmdldENvbnRlbnRTaXplKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0b3VjaExpc3RlbigpIHtcclxuICAgICAgICAvL+ebkeWQrOinpuaRuOS6i+S7tlxyXG4gICAgICAgIGxldCB0b3VjaE5vZGUgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3RvdWNoTm9kZScpO1xyXG4gICAgICAgIGlmICh0b3VjaE5vZGUpIHtcclxuICAgICAgICAgICAgLy8gdG91Y2hOb2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULHRoaXMub25Ub3VjaFN0YXJ0LHRoaXMpO1xyXG4gICAgICAgICAgICAvLyB0b3VjaE5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfTU9WRSx0aGlzLm9uVG91Y2hNb3ZlLHRoaXMpO1xyXG4gICAgICAgICAgICAvLyB0b3VjaE5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELHRoaXMub25Ub3VjaEVuZCx0aGlzKTtcclxuICAgICAgICAgICAgLy8gdG91Y2hOb2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0NBTkNFTCx0aGlzLm9uVG91Y2hDYW5jZWwsdGhpcyk7XHJcbiAgICAgICAgICAgIC8vIGluc3RhbmNlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCB0aGlzLm9uVG91Y2hTdGFydEJ5Sm95LCB0aGlzKTtcclxuICAgICAgICAgICAgLy8gaW5zdGFuY2Uub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfTU9WRSwgdGhpcy5vblRvdWNoTW92ZUJ5Sm95LCB0aGlzKTtcclxuICAgICAgICAgICAgaW5zdGFuY2Uub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uVG91Y2hFbmRCeUpveSwgdGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdFBvcygpIHtcclxuICAgICAgICBsZXQgeHVhbnl1biA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgneHVhbnl1bicpO1xyXG4gICAgICAgIHRoaXMueHVhbnl1bl9wb3MgPSB4dWFueXVuLmdldFBvc2l0aW9uKCk7XHJcbiAgICAgICAgeHVhbnl1bi5yZW1vdmVGcm9tUGFyZW50KCk7XHJcbiAgICAgICAgdGhpcy5idWxsZXRfcG9zID0gbmV3IEFycmF5KCk7XHJcbiAgICAgICAgbGV0IGJ1bGxldDEgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2J1bGxldDEnKTtcclxuICAgICAgICBsZXQgYnVsbGV0MiA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnYnVsbGV0MicpO1xyXG4gICAgICAgIHRoaXMuYnVsbGV0X3Bvcy5wdXNoKGJ1bGxldDIuZ2V0UG9zaXRpb24oKSk7XHJcbiAgICAgICAgdGhpcy5idWxsZXRfcG9zLnB1c2goYnVsbGV0MS5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICB0aGlzLmJ1bGxldF9wb3MucHVzaChidWxsZXQyLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgIGJ1bGxldDEucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgICAgIGJ1bGxldDIucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uR2FtZVdpbigpIHtcclxuICAgICAgICB0aGlzLnNraWxsX3F1ZXVlID0gbmV3IEFycmF5KCk7XHJcbiAgICAgICAgdGhpcy5zZXRIZXJvU3RhdGUoSGVyb19TdGF0ZS5pZGxlLCBHb25nSmlfRmFuZ1hpYW5nLnpob25nKTtcclxuICAgICAgICB0aGlzLmdvbmdqaV9qaXNodSA9IDA7XHJcbiAgICAgICAgaWYgKHRoaXMud2luX2NhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMud2luX2NhbGxiYWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBhZGRTa2lsbExpc3RlbihjYWxsQmFjazogRnVuY3Rpb24pIHtcclxuICAgICAgICB0aGlzLnNraWxsX2NhbGxiYWNrID0gY2FsbEJhY2s7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGFkZEF0dGFja0xpc3RlbihjYWxsQmFjazogRnVuY3Rpb24pIHtcclxuICAgICAgICB0aGlzLmF0dGFja19jYWxsYmFjayA9IGNhbGxCYWNrO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBhZGRIaXRMaXN0ZW4oY2FsbEJhY2s6IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5oaXRfY2FsbGJhY2sgPSBjYWxsQmFjaztcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgYWRkUmVzZXRMaXN0ZW4oY2FsbEJhY2s6IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5yZXNldF9jYWxsYmFjayA9IGNhbGxCYWNrO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBhZGRHYW1lV2luTGlzdGVuKGNhbGxCYWNrOiBGdW5jdGlvbikge1xyXG4gICAgICAgIHRoaXMud2luX2NhbGxiYWNrID0gY2FsbEJhY2s7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGFkZExvYWRlZExpc3RlbihjYWxsQmFjazogRnVuY3Rpb24pIHtcclxuICAgICAgICB0aGlzLmxvYWRlZF9jYWxsYmFjayA9IGNhbGxCYWNrO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbG9hZE1wUHJvZ3Jlc3MoKSB7XHJcbiAgICAgICAgLy8gY2MucmVzb3VyY2VzLmxvYWQoJ2hlcm9zL3NraWxsX2ljb24nLGNjLlByZWZhYiwoZXJyb3I6IEVycm9yLCBhc3NldHM6Y2MuUHJlZmFiKT0+e1xyXG4gICAgICAgIC8vICAgICBpZihlcnJvcilcclxuICAgICAgICAvLyAgICAge1xyXG4gICAgICAgIC8vICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgIC8vICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gICAgIGxldCBtcE5vZGU9Y2MuaW5zdGFudGlhdGUoYXNzZXRzKTtcclxuICAgICAgICAvLyAgICAgbXBOb2RlLnBhcmVudD1jYy5maW5kKCdDYW52YXMvRmlnaHRpbmdfVWknKTtcclxuICAgICAgICAvLyAgICAgbXBOb2RlLnNldFBvc2l0aW9uKGNjLnYyKHRoaXMubm9kZS54LHRoaXMubm9kZS55KzE1KSk7XHJcbiAgICAgICAgLy8gICAgIHRoaXMubXBfcHJvZ3Jlc3M9bXBOb2RlLmdldENvbXBvbmVudChNcFByb2dyZXNzKTtcclxuICAgICAgICAvLyAgICAgdGhpcy5tcF9wcm9ncmVzcy5pbml0KHRoaXMuaGVyb190eXBlKTtcclxuICAgICAgICAvLyAgICAgdGhpcy5jaGFuZ2VDRCh0aGlzLmhlcm9fZGF0YS5nZXRTa2lsbENvbGREb3duKFNraWxsVHlwZS5BY3RpdmUpLzMpO1xyXG4gICAgICAgIC8vICAgICB0aGlzLnNraWxsX3RvdGFsX3RpbWU9dGhpcy5oZXJvX2RhdGEuZ2V0U2tpbGxDb2xkRG93bihTa2lsbFR5cGUuQWN0aXZlKTtcclxuICAgICAgICAvLyAgICAgaWYodGhpcy5nZXRIZXJvU3RhdGUoKT09SGVyb19TdGF0ZS5leGl0KXtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMubXBfcHJvZ3Jlc3MuaGlkZSgpO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGxvYWRaaGlTaGlRaSh6aGlzaGlxaTogc3RyaW5nLCB0eXBlOiBTa2lsbEluZGljYXRvclR5cGUpIHtcclxuICAgICAgICB0aGlzLnpoaXNoaXFpX3R5cGUgPSB0eXBlO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi5Yqg6L29aGVyb1wiICsgemhpc2hpcWkpO1xyXG5cclxuICAgICAgICBjYy5yZXNvdXJjZXMubG9hZCgnaGVyb3MvJyArIHpoaXNoaXFpLCBjYy5QcmVmYWIsIChlcnJvcjogRXJyb3IsIGFzc2V0czogY2MuUHJlZmFiKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkTG9hZEJ5R2FtZUVmZmVjdElkKGlkOiBHYW1lRWZmZWN0SWQsIGluaXRDb3VudDogbnVtYmVyKSB7XHJcblxyXG4gICAgICAgIHRoaXMubmVlZF9sb2FkX251bSsrO1xyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRFZmZlY3RQb29sQnlJZChpZCwgaW5pdENvdW50LCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VyX2xvYWRfbnVtKys7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5jdXJfbG9hZF9udW0gPj0gdGhpcy5uZWVkX2xvYWRfbnVtICYmIHRoaXMuaXNfTG9hZExvYWQgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNfbG9hZF9vayA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNfbG9hZF9vayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgSGVyby5jdXJfbG9hZGVkX251bSsrO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmxvYWRlZF9jYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRlZF9jYWxsYmFjaygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pID09IHRydWUpIHtcclxuXHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKirliqDovb3lrqDniakgKi9cclxuICAgIGxvYWRQZXQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaGVyb19kYXRhLnBldF9pZCA+IDApIHtcclxuICAgICAgICAgICAgbGV0IHR5cGUgPSBTcGlyaXRBdHRyaWJ1dGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3Bpcml0VHlwZSh0aGlzLmhlcm9fZGF0YS5wZXRfaWQpO1xyXG4gICAgICAgICAgICB0aGlzLm5lZWRfbG9hZF9udW0rKztcclxuICAgICAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQoJ3BldC9wZXQnICsgdHlwZSwgY2MuUHJlZmFiLCAoZXJyb3I6IEVycm9yLCBhc3NldHM6IGNjLlByZWZhYikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCBub2RlID0gY2MuaW5zdGFudGlhdGUoYXNzZXRzKTtcclxuICAgICAgICAgICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9QZXRfUm9vdCcpLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGV0ID0gbm9kZS5hZGRDb21wb25lbnQoSWNlUGV0KTtcclxuICAgICAgICAgICAgICAgICAgICB9OyBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wZXQgPSBub2RlLmFkZENvbXBvbmVudChGaXJlUGV0KTtcclxuICAgICAgICAgICAgICAgICAgICB9OyBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wZXQgPSBub2RlLmFkZENvbXBvbmVudChXaW5kUGV0KTtcclxuICAgICAgICAgICAgICAgICAgICB9OyBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wZXQgPSBub2RlLmFkZENvbXBvbmVudChSYXlQZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH07IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5wZXQuaW5pdCh0aGlzLmhlcm9fZGF0YS5wZXRfaWQsIHRoaXMuaGVyb190eXBlLCBjYy52Mih0aGlzLm5vZGUueCAtIDY0LCB0aGlzLm5vZGUueSArIDY0KSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBldC5zZXRIZXJvRGF0YSh0aGlzLmhlcm9fZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cl9sb2FkX251bSsrO1xyXG4gICAgICAgICAgICAgICAgbm9kZS56SW5kZXggPSAxMDAwIC0gbm9kZS55O1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VyX2xvYWRfbnVtID49IHRoaXMubmVlZF9sb2FkX251bSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNfbG9hZF9vayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgSGVyby5jdXJfbG9hZGVkX251bSsrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoq6ZqQ6JeP6Iux6ZuE77yM5q2k5pe26Iux6ZuE5LiN6IO95pS75Ye75oiW6ICF6YeK5pS+5oqA6IO9ICovXHJcbiAgICBoaWRlSGVybygpIHtcclxuICAgICAgICB0aGlzLmhlcm9fc3RhdGUgPSBIZXJvX1N0YXRlLmV4aXQ7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHkgPSAwO1xyXG4gICAgICAgIGlmICh0aGlzLm5vZGVfc2hhZG93KSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZV9zaGFkb3cub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLm1wX3Byb2dyZXNzKSB7XHJcbiAgICAgICAgICAgIHRoaXMubXBfcHJvZ3Jlc3MuaGlkZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzaG93SGVybygpIHtcclxuICAgICAgICB0aGlzLnNldEhlcm9TdGF0ZShIZXJvX1N0YXRlLmlkbGUsIEdvbmdKaV9GYW5nWGlhbmcuemhvbmcpO1xyXG4gICAgICAgIHRoaXMubm9kZS5vcGFjaXR5ID0gMjU1O1xyXG4gICAgICAgIHRoaXMubm9kZV9zaGFkb3cub3BhY2l0eSA9IDI1NTtcclxuICAgICAgICAvL3RoaXMubXBfcHJvZ3Jlc3Muc2hvdygpO1xyXG4gICAgfVxyXG4gICAgcG9zWDogbnVtYmVyID0gMDsvL+WIneWni+WMluaXtuWAmeeahOS9jee9rlxyXG4gICAgdGFyZ2V0WDogbnVtYmVyID0gMDtcclxuICAgIGVhc2luZzogbnVtYmVyID0gMC4xO1xyXG4gICAgb25Ub3VjaEVuZEJ5Sm95KGV2ZW50OiBjYy5FdmVudC5FdmVudFRvdWNoLCBkYXRhKSB7XHJcbiAgICAgICAgdGhpcy50YXJnZXRYID0gKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuYW5pVHlwZSAtIDQpICogNzUgKyB0aGlzLnBvc1g7XHJcbiAgICB9XHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3jgJDnmq7ogqTjgJEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBwcm90ZWN0ZWQgc2V0U2tpbigpIHtcclxuICAgICAgICAvL2xldCBoZXJvUXVhbGl0eT1IZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9RdWFsaXR5KHRoaXMuaGVyb190eXBlKTtcclxuICAgICAgICAvL2xldCB0aWVyPUhlcm9RdWFsaXR5TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFRpZXIoaGVyb1F1YWxpdHkpO1xyXG4gICAgICAgIC8vdGhpcy5zcGluZS5zZXRTa2luKCdzdGFnZScrKEhlcm9NYW5hZ2VyLmdldFNraW5JbmRleCh0aWVyKSkpO1xyXG4gICAgfVxyXG4gICAgLyoqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t5pON5L2c55u45YWzLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLeinpuaRuOenu+WKqOS6i+S7ti0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIC8vIGxlYXRlck51bTogbnVtYmVyID0gMDsvL+W7tui/n+aVsOaNruaSreaUvuWKqOeUu1xyXG4gICAgLy8gbGVhdGVyU3BlZWQ6IG51bWJlciA9IDU7XHJcblxyXG4gICAgLy8gbmV3UG9zOiBjYy5WZWMyO1xyXG4gICAgLy8gcG9zWVRlbXA6IG51bWJlcjtcclxuXHJcbiAgICAvLyBzcGVlZFR5cGU6IFNwZWVkVHlwZSA9IFNwZWVkVHlwZS5TVE9QO1xyXG4gICAgLy8gbW92ZURpciA9IGNjLnYyKDAsIDEpO1xyXG4gICAgLy8gLy/mioTliKvkurrnmoTvvIzmnKzmnaXmnInkuKTnp43pgJ/luqbvvIznjrDlnKjlhYjnlKjkuIDkuKrmlbDmja5cclxuICAgIC8vIG5vcm1hbFNwZWVkID0gNjAwO1xyXG4gICAgLy8gZmFzdFNwZWVkID0gNjAwO1xyXG5cclxuICAgIC8vIHN0b3BTcGVlZCA9IDA7XHJcblxyXG4gICAgLy8gbW92ZVNwZWVkID0gMDtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgKiDnp7vliqhcclxuICAqL1xyXG4gICAgLy8gbW92ZSgpIHtcclxuICAgIC8vICAgICAvLyB0aGlzLm5vZGUuYW5nbGUgPVxyXG4gICAgLy8gICAgIC8vICAgY2MubWlzYy5yYWRpYW5zVG9EZWdyZWVzKE1hdGguYXRhbjIodGhpcy5tb3ZlRGlyLnksIHRoaXMubW92ZURpci54KSkgLSA5MDtcclxuXHJcbiAgICAvLyAgICAgLy8gaWYgKHRoaXMucmlnaWRib2R5KSB7XHJcbiAgICAvLyAgICAgLy8gICB0aGlzLl9ib2R5LmFwcGx5Rm9yY2VUb0NlbnRlcihcclxuICAgIC8vICAgICAvLyAgICAgY2MudjIodGhpcy5tb3ZlRGlyLnggKiAyMDAsIHRoaXMubW92ZURpci55ICogMjAwKSxcclxuICAgIC8vICAgICAvLyAgICAgdHJ1ZVxyXG4gICAgLy8gICAgIC8vICAgKTtcclxuICAgIC8vICAgICAvLyB9IGVsc2Uge1xyXG4gICAgLy8gICAgIC8vICAgY29uc3Qgb2xkUG9zID0gY2MudjIoKTtcclxuICAgIC8vICAgICAvLyAgIHRoaXMubm9kZS5nZXRQb3NpdGlvbihvbGRQb3MpO1xyXG4gICAgLy8gICAgIC8vICAgY29uc3QgbmV3UG9zID0gb2xkUG9zLmFkZCh0aGlzLm1vdmVEaXIubXVsKHRoaXMuX21vdmVTcGVlZCAvIDEyMCkpO1xyXG4gICAgLy8gICAgIC8vICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKG5ld1Bvcyk7XHJcbiAgICAvLyAgICAgLy8gfVxyXG5cclxuICAgIC8vICAgICBpZiAodGhpcy5zcGVlZFR5cGUgIT09IFNwZWVkVHlwZS5TVE9QKSB7XHJcbiAgICAvLyAgICAgICAgIGNvbnN0IG9sZFBvcyA9IGNjLnYyKCk7XHJcbiAgICAvLyAgICAgICAgIHRoaXMubm9kZS5nZXRQb3NpdGlvbihvbGRQb3MpO1xyXG4gICAgLy8gICAgICAgICB0aGlzLm5ld1BvcyA9IG9sZFBvcy5hZGQodGhpcy5tb3ZlRGlyLm11bCh0aGlzLm1vdmVTcGVlZCAvIDEyMCkpO1xyXG4gICAgLy8gICAgICAgICB0aGlzLm5ld1Bvcy55ID0gb2xkUG9zLnk7XHJcbiAgICAvLyAgICAgICAgIHRoaXMucG9zWVRlbXAgPSBvbGRQb3MueTtcclxuXHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gICAgIGlmICh0aGlzLmxlYXRlck51bSA9PSAwKSB7XHJcbiAgICAvLyAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkubW92ZURhdGEudW5zaGlmdCh0aGlzLm5ld1Bvcyk7XHJcblxyXG4gICAgLy8gICAgIH1cclxuXHJcblxyXG4gICAgLy8gICAgIGlmIChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLm1vdmVEYXRhW3RoaXMubGVhdGVyTnVtICogdGhpcy5sZWF0ZXJTcGVlZF0gIT0gbnVsbCkge1xyXG4gICAgLy8gICAgICAgICBjb25zdCBuZXdQb3NUZXBtID0gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5tb3ZlRGF0YVt0aGlzLmxlYXRlck51bSAqIHRoaXMubGVhdGVyU3BlZWRdO1xyXG4gICAgLy8gICAgICAgICBuZXdQb3NUZXBtLnk9dGhpcy5wb3NZVGVtcDtcclxuICAgIC8vICAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKG5ld1Bvc1RlcG0pO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vICAgICBpZihHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLm1vdmVEYXRhLmxlbmd0aD42MCl7XHJcblxyXG4gICAgLy8gICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLm1vdmVEYXRhLnNwbGljZSg2MCxHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLm1vdmVEYXRhLmxlbmd0aC02MCk7XHJcblxyXG5cclxuICAgIC8vICAgICB9XHJcblxyXG4gICAgLy8gICAgIHRoaXMubm9kZV9zaGFkb3cuc2V0UG9zaXRpb24oY2MudjIodGhpcy5ub2RlLnggKyB0aGlzLnBvcy54ICogdGhpcy5zZXR1cF9zY2FsZSwgdGhpcy5ub2RlLnkgKyB0aGlzLnBvcy55ICogdGhpcy5zZXR1cF9zY2FsZSkpO1xyXG4gICAgLy8gfVxyXG4gICAgLy8gb25Ub3VjaFN0YXJ0QnlKb3koKSB7IH1cclxuXHJcbiAgICAvLyBvblRvdWNoTW92ZUJ5Sm95KGV2ZW50OiBjYy5FdmVudC5FdmVudFRvdWNoLCBkYXRhKSB7XHJcbiAgICAvLyAgICAgdGhpcy5zcGVlZFR5cGUgPSBkYXRhLnNwZWVkVHlwZTtcclxuICAgIC8vICAgICB0aGlzLm1vdmVEaXIgPSBkYXRhLm1vdmVEaXN0YW5jZTtcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyBvblRvdWNoRW5kQnlKb3koZXZlbnQ6IGNjLkV2ZW50LkV2ZW50VG91Y2gsIGRhdGEpIHtcclxuICAgIC8vICAgICB0aGlzLnNwZWVkVHlwZSA9IGRhdGEuc3BlZWRUeXBlO1xyXG4gICAgLy8gfVxyXG4gICAgLyoqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t5pON5L2c55u45YWzLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLeinpuaRuOS6i+S7ti0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8v5pen54mI5Yqf6IO9XHJcbiAgICBvblRvdWNoU3RhcnQoZTogY2MuRXZlbnQuRXZlbnRUb3VjaCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzSGF2ZURlQnVmZihCdWZmSWQuTW9uc3Rlcl9YdWFuWXVuKSAmJiB0aGlzLmhlcm9fdHlwZSAhPSBIZXJvX1R5cGUuWmhlbkRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNfY2FuX3RvdWNoID0gZmFsc2U7XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTcwMDAyKSwgMSk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuc2tpbGxfY2RfdGltZSA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5pc19jYW5fdG91Y2ggPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2xpY2tfcmVtYWluID4gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTcwMDAxKSwgMSk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfc3RhdGUgIT0gR2FtZVN0YXRlLkdhbWVfUGxheWluZylcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXNfY2FuX3RvdWNoID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmlzX2F1dG9fcmVsZWFzZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5jbGlja19yZW1haW4gPSAxO1xyXG4gICAgICAgIFNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlbGVhc2VTa2lsbFJlc3VsdChmYWxzZSk7XHJcbiAgICAgICAgbGV0IHBvcyA9IFNreU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKGUuZ2V0TG9jYXRpb24oKSk7XHJcbiAgICAgICAgLy/lpoLmnpzlj6/ku6Xph4rmlL7vvIzmmL7npLrmjIfnpLrlmahcclxuICAgICAgICBzd2l0Y2ggKHRoaXMuc2tpbGxfdGlwX3R5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBTa2lsbFRpcFR5cGUuRnVsbDoge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5za2lsbF90aXAubm9kZS5zZXRQb3NpdGlvbihjYy52MigwLCAtY2Mud2luU2l6ZS5oZWlnaHQgLyAyKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNraWxsX3RpcC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5za2lsbF90aXAuc2V0SXNDYW5SZWxlYXNlKGZhbHNlKTtcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBTa2lsbFRpcFR5cGUuQ2lyY2xlOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNraWxsX3RpcC5ub2RlLnNldFBvc2l0aW9uKHBvcyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNraWxsX3RpcC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNraWxsX3RpcC5zZXRJc0NhblJlbGVhc2UoZmFsc2UpO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFNraWxsVGlwVHlwZS5SZWN0OiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNraWxsX3RpcC5ub2RlLnNldFBvc2l0aW9uKHBvcyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNraWxsX3RpcC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNraWxsX3RpcC5zZXRJc0NhblJlbGVhc2UoZmFsc2UpO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFNraWxsVGlwVHlwZS5EaXI6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxfdGlwLm5vZGUuc2V0UG9zaXRpb24odGhpcy5ub2RlLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5za2lsbF90aXAubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5za2lsbF90aXAuc2V0SXNDYW5SZWxlYXNlKGZhbHNlKTtcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/mmL7npLrojIPlm7TmjIfnpLrlmahcclxuICAgICAgICBTa2lsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93U2tpbGxSYW5nZSh0aGlzLm5vZGUueSwgdGhpcy5jYXN0aW5nX2Rpc3RhbmNlKTtcclxuICAgIH1cclxuXHJcbiAgICBvblRvdWNoTW92ZShlOiBjYy5FdmVudC5FdmVudFRvdWNoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNfY2FuX3RvdWNoID09IGZhbHNlIHx8IEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfc3RhdGUgIT0gR2FtZVN0YXRlLkdhbWVfUGxheWluZylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGxldCBwb3MgPSBTa3lNYW5hZ2VyLmdldEluc3RhbmNlKCkubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihlLmdldExvY2F0aW9uKCkpO1xyXG4gICAgICAgIGlmICghdGhpcy50b3VjaF9yZWN0LmNvbnRhaW5zKHBvcykpIHtcclxuICAgICAgICAgICAgdGhpcy5pc19hdXRvX3JlbGVhc2UgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLnNraWxsX3RpcF90eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgU2tpbGxUaXBUeXBlLkZ1bGw6IHtcclxuXHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgU2tpbGxUaXBUeXBlLkNpcmNsZToge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5za2lsbF90aXAubm9kZS5zZXRQb3NpdGlvbihwb3MpO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFNraWxsVGlwVHlwZS5SZWN0OiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNraWxsX3RpcC5ub2RlLnNldFBvc2l0aW9uKHBvcyk7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgU2tpbGxUaXBUeXBlLkRpcjoge1xyXG5cclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChwb3MueSA+IEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW5lbXlfYXR0X3kpIHtcclxuICAgICAgICAgICAgbGV0IGRpc3RhbmNlID0gcG9zLnkgLSB0aGlzLm5vZGUueTtcclxuICAgICAgICAgICAgaWYgKGRpc3RhbmNlIDw9IHRoaXMuY2FzdGluZ19kaXN0YW5jZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5za2lsbF90aXAuc2V0SXNDYW5SZWxlYXNlKHRydWUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5za2lsbF90aXAuc2V0SXNDYW5SZWxlYXNlKGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2tpbGxfdGlwLnNldElzQ2FuUmVsZWFzZShmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uVG91Y2hFbmQoZTogY2MuRXZlbnQuRXZlbnRUb3VjaCkge1xyXG4gICAgICAgIFNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlbGVhc2VTa2lsbFJlc3VsdCh0cnVlKTtcclxuICAgICAgICBTa2lsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5oaWRlU2tpbGxSYW5nZSgpO1xyXG4gICAgICAgIHRoaXMuc2tpbGxfdGlwLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNfY2FuX3RvdWNoID09IGZhbHNlIHx8IEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfc3RhdGUgIT0gR2FtZVN0YXRlLkdhbWVfUGxheWluZylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGxldCBwb3MgPSBTa3lNYW5hZ2VyLmdldEluc3RhbmNlKCkubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihlLmdldExvY2F0aW9uKCkpO1xyXG4gICAgICAgIC8v5Yik5pat5Z2Q5qCHXHJcbiAgICAgICAgaWYgKHBvcy55ID4gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5lbmVteV9hdHRfeSkge1xyXG4gICAgICAgICAgICBsZXQgZGlzdGFuY2UgPSBwb3MueSAtIHRoaXMubm9kZS55O1xyXG4gICAgICAgICAgICBpZiAoZGlzdGFuY2UgPD0gdGhpcy5jYXN0aW5nX2Rpc3RhbmNlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbGVhc2VTa2lsbChwb3MpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNfYXV0b19yZWxlYXNlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGFydEF1dG9SZWxlYXNlKCkgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDE0MDAyMykpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uVG91Y2hDYW5jZWwoZTogY2MuRXZlbnQuRXZlbnRUb3VjaCkge1xyXG4gICAgICAgIFNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlbGVhc2VTa2lsbFJlc3VsdCh0cnVlKTtcclxuICAgICAgICBTa2lsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5oaWRlU2tpbGxSYW5nZSgpO1xyXG4gICAgICAgIHRoaXMuc2tpbGxfdGlwLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNfY2FuX3RvdWNoID09IGZhbHNlIHx8IEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfc3RhdGUgIT0gR2FtZVN0YXRlLkdhbWVfUGxheWluZylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGxldCBwb3MgPSBTa3lNYW5hZ2VyLmdldEluc3RhbmNlKCkubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihlLmdldExvY2F0aW9uKCkpO1xyXG4gICAgICAgIGlmIChwb3MueSA+IEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW5lbXlfYXR0X3kpIHtcclxuICAgICAgICAgICAgbGV0IGRpc3RhbmNlID0gcG9zLnkgLSB0aGlzLm5vZGUueTtcclxuICAgICAgICAgICAgaWYgKGRpc3RhbmNlIDw9IHRoaXMuY2FzdGluZ19kaXN0YW5jZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWxlYXNlU2tpbGwocG9zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzX2F1dG9fcmVsZWFzZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydEF1dG9SZWxlYXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRBdXRvUmVsZWFzZSgpOiBib29sZWFuIHtcclxuICAgICAgICAvL+aJvuaAqu+8jOaJvuS4jeWIsOWwseS4jeaUvlxyXG4gICAgICAgIGxldCBlbmVteXMgPSBNb25zdGVyTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1vbnN0ZXJzRm9yTmVhcmVzdEJ5U2tpbGwoMSwgdGhpcy5ub2RlLnksIHRoaXMuY2FzdGluZ19kaXN0YW5jZSk7XHJcbiAgICAgICAgaWYgKHRoaXMuY3VyX2xvYWRfbnVtID49IHRoaXMubmVlZF9sb2FkX251bSAmJiB0aGlzLmlzX0xvYWRMb2FkID09IHRydWUmJmVuZW15cykge1xyXG4gICAgICAgICAgICAvL+acgOWJjeeahOaVjOS6ulxyXG4gICAgICAgICAgICBsZXQgZW5lbXlQb3MgPSBlbmVteXNbMF0uZ2V0Q29tcG9uZW50KE1vbnN0ZXIpLmdldENlbnRlclBvcygpO1xyXG4gICAgICAgICAgICB0aGlzLnJlbGVhc2VTa2lsbChlbmVteVBvcyk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoq6Kem5pG455qE5L2N572uICovXHJcbiAgICByZWxlYXNlU2tpbGwodG91Y2hQb3M6IGNjLlZlYzIpIHtcclxuICAgICAgICBpZiAoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zdGF0ZSAhPSBHYW1lU3RhdGUuR2FtZV9QbGF5aW5nKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy51c2Vfc2tpbGxfbnVtKys7XHJcbiAgICAgICAgLy90aGlzLm1wX3Byb2dyZXNzLnNob3dMaWdodCgpO1xyXG4gICAgICAgIGlmICh0aGlzLnNraWxsX2NhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2tpbGxfY2FsbGJhY2sodG91Y2hQb3MpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlc2V0Q0QoKTtcclxuICAgICAgICBUYXNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmVtaXRUYXNrKFRhc2tJdGVtLumHiuaUvljmrKHkurrnianmioDog70pO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBnZXRTa2lsbFJlbGVhc2VJZCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmhlcm9fdHlwZSAqIDEwMDAwICsgdGhpcy51c2Vfc2tpbGxfbnVtO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuiOt+W+l+WtkOW8ueeUn+aIkOeahOS9jee9riAqL1xyXG4gICAgZ2V0Q3JlYXRlQnVsbGV0UG9zKCk6IGNjLlZlYzIge1xyXG4gICAgICAgIGxldCBwb3MgPSB0aGlzLmJ1bGxldF9wb3NbdGhpcy5jdXJfZmFuZ3hpYW5nXTtcclxuICAgICAgICByZXR1cm4gY2MudjIodGhpcy5ub2RlLnggKyBwb3MueCAqIHRoaXMubm9kZS5zY2FsZVgsIHRoaXMubm9kZS55ICsgcG9zLnkgKiB0aGlzLm5vZGUuc2NhbGVZKTtcclxuICAgIH1cclxuICAgIC8qKuiOt+W+l+WtkOW8ueebuOWvueiLsembhOeahOS9jee9riAqL1xyXG4gICAgZ2V0SGVyb0J1bGxldFBvcygpOiBjYy5WZWMyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5idWxsZXRfcG9zW3RoaXMuY3VyX2Zhbmd4aWFuZ107XHJcbiAgICB9XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t5peg5bC9YnVmZi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8qKlxyXG4gICAgICog5re75Yqg5peg5bC9YnVmZlxyXG4gICAgICogQHBhcmFtIGVuZGxlc3NCdWZmIEVuZGxlc3NCdWZm55qE5a6e5L6LXHJcbiAgICAgKi9cclxuICAgIC8vICBBZG1pbmlzdHJhdG9yOlxyXG4gICAgLy8gIDEu5pS75Ye75YqbK3glXHJcbiAgICAvLyAgMi7mlLvpgJ8reCVcclxuICAgIC8vICAzLuaatOWHu+WAvCt4XHJcbiAgICAvLyAgNC7mmrTlh7vlop7luYUreCVcclxuICAgIC8vICA1LumYsuW+oeWKmyt4JVxyXG4gICAgLy8gIDYu5pyA5aSn55Sf5ZG95YC8K3glIFxyXG4gICAgLy8gIDcu5q+P56eS5Zue5aSN5pyA5aSn55Sf5ZG95YC8eCVcclxuICAgIC8vICA4Lueri+WNs+WbnuWkjeacgOWkp+eUn+WRveWAvHgl77yI5rOo77ya6K+lYnVmZueUn+aViOWQjueri+WNs+a2iOWkse+8iVxyXG4gICAgLy8gIDku6L+e57ut5pS75Ye7IOamgueOh3glXHJcbiAgICAvLyAgMTAu5Li75Yqo5oqA6IO95Ya35Y205pe26Ze05YeP5bCReCVcclxuICAgIC8vICAxMS7mnIDnu4jkvKTlrrPliqDmiJB4JVxyXG4gICAgYWRkRW5kbGVzc0J1ZmYoZW5kbGVzc0J1ZmY6IEVuZGxlc3NCdWZmKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzSGF2ZUVuZGxlc3NJZChlbmRsZXNzQnVmZi5pZCkpIHtcclxuICAgICAgICAgICAgdGhpcy5tYXBfZW5kbGVzc19idWZmLnNldChlbmRsZXNzQnVmZi5pZCwgZW5kbGVzc0J1ZmYpO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGVuZGxlc3NCdWZmLnR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgRW5kbGVzc0J1ZmZUeXBlLkF0dGFjazoge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVyb19kYXRhLnRvdGFsX2F0dGFjayArPSB0aGlzLmhlcm9fZGF0YS5maXhlZF9hdHRjayAqIGVuZGxlc3NCdWZmLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgRW5kbGVzc0J1ZmZUeXBlLkF0dGFja1NwZWVkOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VBdHRhY2tTcGVlZChlbmRsZXNzQnVmZi52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBFbmRsZXNzQnVmZlR5cGUuQ3JpdFJhdGU6IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlcm9fZGF0YS5Dcml0aWNhbCArPSBlbmRsZXNzQnVmZi52YWx1ZTtcclxuICAgICAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEVuZGxlc3NCdWZmVHlwZS5Dcml0RGFtYWdlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZXJvX2RhdGEuRXh0cmFDcml0aWNhbCArPSBlbmRsZXNzQnVmZi52YWx1ZTtcclxuICAgICAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEVuZGxlc3NCdWZmVHlwZS5EZWZlbnNlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZXJvX2RhdGEudG90YWxfZGVmZW5zZSArPSB0aGlzLmhlcm9fZGF0YS5maXhfZGVmZW5zZSAqIGVuZGxlc3NCdWZmLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgRW5kbGVzc0J1ZmZUeXBlLkhlYWx0aE1heDoge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVyb19kYXRhLnRvdGFsX2hwICs9IHRoaXMuaGVyb19kYXRhLmZpeGVkX2hwICogZW5kbGVzc0J1ZmYudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCLln47lopnliqDooYA6XCIsdGhpcy5oZXJvX2RhdGEudG90YWxfaHAsdGhpcy5oZXJvX2RhdGEuZml4ZWRfaHAsZW5kbGVzc0J1ZmYudmFsdWUpXHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZWZyZXNoTWFpbldhbGxEYXRhKClcclxuICAgICAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEVuZGxlc3NCdWZmVHlwZS5IZWFsdGhTZWM6IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYnVmZkRhdGEgPSBuZXcgQnVmZkRhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5idWZmX2lkID0gQnVmZklkLldhbGxfRW5kbGVzc19BZGRfaHAgKyB0aGlzLmhlcm9fdHlwZTtcclxuICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5idWZmX3R5cGUgPSBCdWZmVHlwZS5HYWluO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLmJ1ZmZfdmFsdWUgPSBbZW5kbGVzc0J1ZmYudmFsdWUgKiBXYWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1haW5XYWxsKCkuZ2V0TWF4SHAoKV07XHJcbiAgICAgICAgICAgICAgICAgICAgYnVmZkRhdGEucmVtYWluX3RpbWUgPSA2NjY2NjY2NjtcclxuICAgICAgICAgICAgICAgICAgICAvLyBidWZmRGF0YS5nYW1lX2VmZmVjdF9pZD1HYW1lRWZmZWN0SWQuY2hhbmdfbWFvX3Nob3Vfc2tpbGxfYWN0aXZlXzE7XHJcbiAgICAgICAgICAgICAgICAgICAgYnVmZkRhdGEucmVjb3ZlcnlfamlhbmdlX3RpbWUgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIFdhbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWFpbldhbGwoKS5hZGRCdWZmKGJ1ZmZEYXRhKVxyXG4gICAgICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgRW5kbGVzc0J1ZmZUeXBlLkhlYWx0aFRlYW1BZGQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBsZXQgaHA9V2FsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYWluV2FsbCgpLmdldEN1ckhwKCkrKGVuZGxlc3NCdWZmLnZhbHVlKldhbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWFpbldhbGwoKS5nZXRNYXhIcCgpKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFdhbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWFpbldhbGwoKS5jaGFuZ2VIcChocClcclxuICAgICAgICAgICAgICAgICAgICAvL+WPiuaXtueUqFxyXG4gICAgICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgRW5kbGVzc0J1ZmZUeXBlLkRvdWJsZUF0dGFjazoge1xyXG4gICAgICAgICAgICAgICAgICAgIC8v6L+e57ut5pS75Ye7LOS4jeeUqOWKoGJ1ZmZcclxuICAgICAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEVuZGxlc3NCdWZmVHlwZS5BY3RpdmVTa2lsbENkOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5za2lsbF90b3RhbF90aW1lIC09IHRoaXMuaGVyb19kYXRhLmdldFNraWxsQ29sZERvd24oU2tpbGxUeXBlLkFjdGl2ZSkgKiBlbmRsZXNzQnVmZi52YWx1ZVxyXG4gICAgICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgRW5kbGVzc0J1ZmZUeXBlLkFkZERhbWFnZToge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVyb19kYXRhLmFsbF9pbmNyZWFzZV9kYW1hZ2UgKz0gZW5kbGVzc0J1ZmYudmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDliKDpmaTml6DlsL1idWZmXHJcbiAgICAgKiBAcGFyYW0gaWQg5peg5bC9YnVmZi1pZFxyXG4gICAgICovXHJcbiAgICByZW1vdmVFbmRsZXNzQnVmZihpZDogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzSGF2ZUVuZGxlc3NJZChpZCkpIHtcclxuICAgICAgICAgICAgbGV0IGVuZGxlc3NCdWZmID0gdGhpcy5tYXBfZW5kbGVzc19idWZmLmdldChpZCk7XHJcbiAgICAgICAgICAgIHRoaXMubWFwX2VuZGxlc3NfYnVmZi5kZWxldGUoaWQpO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGVuZGxlc3NCdWZmLnR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgRW5kbGVzc0J1ZmZUeXBlLkF0dGFjazoge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVyb19kYXRhLnRvdGFsX2F0dGFjayAtPSB0aGlzLmhlcm9fZGF0YS5maXhlZF9hdHRjayAqIGVuZGxlc3NCdWZmLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgRW5kbGVzc0J1ZmZUeXBlLkF0dGFja1NwZWVkOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VBdHRhY2tTcGVlZCgtZW5kbGVzc0J1ZmYudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgRW5kbGVzc0J1ZmZUeXBlLkNyaXRSYXRlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZXJvX2RhdGEuQ3JpdGljYWwgLT0gZW5kbGVzc0J1ZmYudmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBFbmRsZXNzQnVmZlR5cGUuQ3JpdERhbWFnZToge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVyb19kYXRhLkV4dHJhQ3JpdGljYWwgLT0gZW5kbGVzc0J1ZmYudmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBFbmRsZXNzQnVmZlR5cGUuRGVmZW5zZToge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVyb19kYXRhLnRvdGFsX2RlZmVuc2UgLT0gdGhpcy5oZXJvX2RhdGEuZml4X2RlZmVuc2UgKiBlbmRsZXNzQnVmZi52YWx1ZTtcclxuICAgICAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEVuZGxlc3NCdWZmVHlwZS5IZWFsdGhNYXg6IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlcm9fZGF0YS50b3RhbF9ocCAtPSB0aGlzLmhlcm9fZGF0YS5maXhlZF9ocCAqIGVuZGxlc3NCdWZmLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgRW5kbGVzc0J1ZmZUeXBlLkhlYWx0aFNlYzoge1xyXG4gICAgICAgICAgICAgICAgICAgIFdhbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWFpbldhbGwoKS5zdWJCdWZmKEJ1ZmZJZC5XYWxsX0VuZGxlc3NfQWRkX2hwICsgdGhpcy5oZXJvX3R5cGUpXHJcbiAgICAgICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBFbmRsZXNzQnVmZlR5cGUuSGVhbHRoVGVhbUFkZDoge1xyXG5cclxuICAgICAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEVuZGxlc3NCdWZmVHlwZS5Eb3VibGVBdHRhY2s6IHtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBFbmRsZXNzQnVmZlR5cGUuQWN0aXZlU2tpbGxDZDoge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxfdG90YWxfdGltZSArPSB0aGlzLmhlcm9fZGF0YS5nZXRTa2lsbENvbGREb3duKFNraWxsVHlwZS5BY3RpdmUpICogZW5kbGVzc0J1ZmYudmFsdWVcclxuICAgICAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEVuZGxlc3NCdWZmVHlwZS5BZGREYW1hZ2U6IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlcm9fZGF0YS5hbGxfaW5jcmVhc2VfZGFtYWdlIC09IGVuZGxlc3NCdWZmLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKuaYr+WQpuaLpeacieS4gOS4quaXoOWwvWJ1ZmYgaWQgKi9cclxuICAgIGlzSGF2ZUVuZGxlc3NJZChpZDogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCIrKysrKysrK1wiLGlkLHRoaXMubWFwX2VuZGxlc3NfYnVmZilcclxuICAgICAgICByZXR1cm4gdGhpcy5tYXBfZW5kbGVzc19idWZmLmhhcyhpZCk7XHJcbiAgICB9XHJcbiAgICAvKirmmK/lkKbmi6XmnInkuIDkuKrml6DlsL1idWZmIOexu+WeiyAqL1xyXG4gICAgZ2V0RW5kbGVzc0J5VHlwZSh0eXBlOiBudW1iZXIpOiBFbmRsZXNzQnVmZiB7XHJcbiAgICAgICAgbGV0IGJ1ZmY6IEVuZGxlc3NCdWZmID0gbnVsbDtcclxuICAgICAgICB0aGlzLm1hcF9lbmRsZXNzX2J1ZmYuZm9yRWFjaCgodiwgaykgPT4ge1xyXG4gICAgICAgICAgICBpZiAodi50eXBlID09IHR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGJ1ZmYgPSB2O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGJ1ZmY7XHJcbiAgICB9XHJcbiAgICAvKirojrflvpfkuIDkuKrml6DlsL1idWZmICovXHJcbiAgICBnZXRFbmRsZXNzQnVmZihpZDogbnVtYmVyKTogRW5kbGVzc0J1ZmYge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1hcF9lbmRsZXNzX2J1ZmYuZ2V0KGlkKTtcclxuICAgIH1cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1CVUZGLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICBhZGRCdWZmKGJ1ZmZEYXRhOiBCdWZmRGF0YSk6IEJ1ZmZUaW1lciB7XHJcbiAgICAgICAgbGV0IGJ1ZmZJZCA9IGJ1ZmZEYXRhLmJ1ZmZfaWQ7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzSGF2ZUJ1ZmYoYnVmZklkKSkge1xyXG4gICAgICAgICAgICAvL+a3u+WKoGJ1ZmboioLngrnlkoznibnmlYggICAgICAgXHJcbiAgICAgICAgICAgIGxldCBub2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgICAgICAgICAgaWYgKGJ1ZmZEYXRhLmdhbWVfZWZmZWN0X2lkID09IEdhbWVFZmZlY3RJZC5OdWxsKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlID0gbmV3IGNjLk5vZGUoYnVmZkRhdGEuZ2FtZV9lZmZlY3RfaWQudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBub2RlID0gR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEZvclBhcmVudChidWZmRGF0YS5nYW1lX2VmZmVjdF9pZCwgdGhpcy54dWFueXVuX3BvcywgdGhpcy5ub2RlKTtcclxuICAgICAgICAgICAgICAgIC8vbm9kZS5zY2FsZT10aGlzLm5vZGUud2lkdGgvMjAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8v5re75YqgYnVmZlxyXG4gICAgICAgICAgICBsZXQgYnVmZjogQnVmZlRpbWVyID0gbm9kZS5nZXRDb21wb25lbnQoQnVmZlRpbWVyKTtcclxuICAgICAgICAgICAgaWYgKCFidWZmKSB7XHJcbiAgICAgICAgICAgICAgICBidWZmID0gbm9kZS5hZGRDb21wb25lbnQoQnVmZlRpbWVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBidWZmLmluaXQoYnVmZkRhdGEpO1xyXG4gICAgICAgICAgICAvL2J1ZmbplIDmr4Hml7blpITnkIZcclxuICAgICAgICAgICAgYnVmZi5hZGREZXN0cm95TGlzdGVuKHRoaXMub25CdWZmRGVzdG9yeS5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgLy9idWZm5rK755aX6Kem5Y+R5pe25aSE55CGXHJcbiAgICAgICAgICAgIGlmIChidWZmRGF0YS5yZWNvdmVyeV9qaWFuZ2VfdGltZSA+IDApIHtcclxuICAgICAgICAgICAgICAgIGJ1ZmYuYWRkUmVjb3ZlcnlMaXN0ZW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIGRvUmVjb3Zlcnk6IChudW06IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBXYWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1haW5XYWxsKCkuY2hhbmdlSHAobnVtKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LCBidWZmLmdldEZpcnN0QnVmZlZhbHVlKCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaGVyb19idWZmLnNldChidWZmRGF0YS5idWZmX2lkLCBidWZmKTtcclxuICAgICAgICAgICAgbm9kZS5zY2FsZSA9IDEgLyB0aGlzLnNldHVwX3NjYWxlO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGJ1ZmZJZCkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBCdWZmSWQuUGV0M19KaWFTdTpcclxuICAgICAgICAgICAgICAgIGNhc2UgQnVmZklkLkhlcm9fTWVpTW9fR29uZ1N1OlxyXG4gICAgICAgICAgICAgICAgY2FzZSBCdWZmSWQuSGVyb19aaGVuRGVfR29uZ3N1OlxyXG4gICAgICAgICAgICAgICAgY2FzZSBCdWZmSWQuSGVyb19LdWFuZ1poYW5TaGlfRGFaaGFvOlxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VBdHRhY2tTcGVlZChidWZmRGF0YS5idWZmX3ZhbHVlWzBdKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBCdWZmSWQuSGVyb19DaGFuZ01hb1Nob3dfR29uZ1N1OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VBdHRhY2tTcGVlZChidWZmRGF0YS5idWZmX3ZhbHVlWzBdKTtcclxuICAgICAgICAgICAgICAgICAgICBub2RlLnNldFBvc2l0aW9uKGNjLnYyKDAsIDApKTtcclxuICAgICAgICAgICAgICAgICAgICAvL+aWsOWinuS4gOS4quiDjOWQjueJueaViFxyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmYuYWRkVGVYaWFvKEdhbWVFZmZlY3RJZC5jaGFuZ19tYW9fc2hvdV9za2lsbF9hY3RpdmVfMiwgdGhpcy5ub2RlLmdldFBvc2l0aW9uKCksIGNjLmZpbmQoJ0NhbnZhcy9IZXJvX1NoYWRvd19Sb290JykpXHJcbiAgICAgICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBCdWZmSWQuSGVyb19aaGVuRGVfQmFvSmlNaW5nWmhvbmdMdjoge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVyb19kYXRhLmNyaXRfZXggKz0gYnVmZkRhdGEuYnVmZl92YWx1ZVswXTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlcm9fZGF0YS5oaXRfZXggKz0gYnVmZkRhdGEuYnVmZl92YWx1ZVswXTtcclxuICAgICAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5hZGRCdWZmU3RhdGUoYnVmZklkLCBidWZmRGF0YS5yZW1haW5fdGltZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBidWZmO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBidWZmID0gdGhpcy5oZXJvX2J1ZmYuZ2V0KGJ1ZmZJZCk7XHJcbiAgICAgICAgICAgIGJ1ZmYucmVmcmVzaEJ1ZmYoYnVmZkRhdGEpO1xyXG4gICAgICAgICAgICB0aGlzLmFkZEJ1ZmZTdGF0ZShidWZmSWQsIGJ1ZmZEYXRhLnJlbWFpbl90aW1lKTtcclxuICAgICAgICAgICAgcmV0dXJuIGJ1ZmY7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHN1YkJ1ZmYoYnVmZklkOiBCdWZmSWQpOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgYnVmZiA9IHRoaXMuaGVyb19idWZmLmdldChidWZmSWQpO1xyXG4gICAgICAgIGlmIChidWZmKSB7XHJcbiAgICAgICAgICAgIGJ1ZmYuZGVzdHJveVNlbGYoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBvbkJ1ZmZEZXN0b3J5KGJ1ZmZEYXRhOiBCdWZmRGF0YSkge1xyXG4gICAgICAgIHRoaXMuaGVyb19idWZmLmRlbGV0ZShidWZmRGF0YS5idWZmX2lkKTtcclxuICAgICAgICBzd2l0Y2ggKGJ1ZmZEYXRhLmJ1ZmZfaWQpIHtcclxuICAgICAgICAgICAgY2FzZSBCdWZmSWQuUGV0M19KaWFTdTpcclxuICAgICAgICAgICAgY2FzZSBCdWZmSWQuSGVyb19NZWlNb19Hb25nU3U6XHJcbiAgICAgICAgICAgIGNhc2UgQnVmZklkLkhlcm9fS3VhbmdaaGFuU2hpX0RhWmhhbzpcclxuICAgICAgICAgICAgY2FzZSBCdWZmSWQuSGVyb19aaGVuRGVfR29uZ3N1OlxyXG4gICAgICAgICAgICBjYXNlIEJ1ZmZJZC5IZXJvX0NoYW5nTWFvU2hvd19Hb25nU3U6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlQXR0YWNrU3BlZWQoLWJ1ZmZEYXRhLmJ1ZmZfdmFsdWVbMF0pO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEJ1ZmZJZC5IZXJvX1poZW5EZV9CYW9KaU1pbmdaaG9uZ0x2OiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhlcm9fZGF0YS5jcml0X2V4IC09IGJ1ZmZEYXRhLmJ1ZmZfdmFsdWVbMF07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhlcm9fZGF0YS5oaXRfZXggLT0gYnVmZkRhdGEuYnVmZl92YWx1ZVswXTtcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaXNIYXZlQnVmZihidWZmOiBCdWZmSWQpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5oZXJvX2J1ZmYuaGFzKGJ1ZmYpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZUFsbEJ1ZmYoKSB7XHJcbiAgICAgICAgdGhpcy5oZXJvX2J1ZmYuZm9yRWFjaCgoYnVmZjogQnVmZlRpbWVyKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc3ViQnVmZihidWZmLmdldEJ1ZmZJZCgpKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBhZGREZUJ1ZmYoYnVmZkRhdGE6IEJ1ZmZEYXRhLCBpbnNpZ2h0OiBudW1iZXIgPSAwKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzSGF2ZURlQnVmZihidWZmRGF0YS5idWZmX2lkKSkge1xyXG4gICAgICAgICAgICAvL+aOp+WItuexu+eahGRlYnVmZumcgOimgeagueaNrumfp+aAp+adpeWunueOsOWFt+S9k+eahOaViOaenFxyXG4gICAgICAgICAgICBpZiAoYnVmZkRhdGEuYnVmZl90eXBlID09IEJ1ZmZUeXBlLlZlcnRpZ28pIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1cl90b3VnaG5lc3MgPj0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmhlcm9fdHlwZSAhPSBIZXJvX1R5cGUuWmhlbkRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLm1wX3Byb2dyZXNzLnNldERpc2FibGUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuaGlkZVNraWxsUmFuZ2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNraWxsX3RpcC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5nb25namlfamlzaHUgPSAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zcGluZS5wYXVzZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc19jYW5fdG91Y2ggPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGlmIChpbnNpZ2h0ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLnJlbWFpbl90aW1lID0gSW5qdXJlZERhdGEuY2FsY0NvbnRyb2xUaW1lKGJ1ZmZEYXRhLnJlbWFpbl90aW1lLCB0aGlzLmN1cl90b3VnaG5lc3MsIGluc2lnaHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMueHVhbnl1bl9jYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMueHVhbnl1bl9jYWxsYmFjayh0cnVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFdhbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWFpbldhbGwoKS5zaG93VmVydGlnbyhidWZmRGF0YS5yZW1haW5fdGltZSk7XHJcbiAgICAgICAgICAgICAgICAvL+WFs+mXreaXtuWBnFxyXG4gICAgICAgICAgICAgICAgU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0VGltZVN0b3AoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXNTa2lsbFN0YXRlKGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL+a3u+WKoGJ1ZmboioLngrnlkoznibnmlYggICAgICAgXHJcbiAgICAgICAgICAgIGxldCBub2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgICAgICAgICAgaWYgKGJ1ZmZEYXRhLmdhbWVfZWZmZWN0X2lkID09IEdhbWVFZmZlY3RJZC5OdWxsKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlID0gbmV3IGNjLk5vZGUoYnVmZkRhdGEuZ2FtZV9lZmZlY3RfaWQudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBub2RlID0gR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEZvclBhcmVudChidWZmRGF0YS5nYW1lX2VmZmVjdF9pZCwgdGhpcy54dWFueXVuX3BvcywgdGhpcy5ub2RlKTtcclxuICAgICAgICAgICAgICAgIG5vZGUuc2NhbGUgPSB0aGlzLm5vZGUud2lkdGggLyAyMDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy/mt7vliqBidWZmXHJcbiAgICAgICAgICAgIGxldCBidWZmOiBCdWZmVGltZXIgPSBub2RlLmdldENvbXBvbmVudChCdWZmVGltZXIpO1xyXG4gICAgICAgICAgICBpZiAoIWJ1ZmYpIHtcclxuICAgICAgICAgICAgICAgIGJ1ZmYgPSBub2RlLmFkZENvbXBvbmVudChCdWZmVGltZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJ1ZmYuaW5pdChidWZmRGF0YSk7XHJcbiAgICAgICAgICAgIC8vYnVmZumUgOavgeaXtuWkhOeQhlxyXG4gICAgICAgICAgICBidWZmLmFkZERlc3Ryb3lMaXN0ZW4odGhpcy5vbkRlQnVmZkRlc3RvcnkuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgIHRoaXMuaGVyb19kZWJ1ZmYuc2V0KGJ1ZmZEYXRhLmJ1ZmZfaWQsIGJ1ZmYpO1xyXG4gICAgICAgICAgICBub2RlLnNjYWxlID0gMSAvIHRoaXMuc2V0dXBfc2NhbGU7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoYnVmZkRhdGEuYnVmZl9pZCkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBCdWZmSWQuQm9zczZfU2tpbGxfMl9qaWFuZ29uZ3N1OlxyXG4gICAgICAgICAgICAgICAgY2FzZSBCdWZmSWQuQm9zczNfSklBTl9Hb25nU3U6IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZUF0dGFja1NwZWVkKC1idWZmRGF0YS5idWZmX3ZhbHVlWzBdKTtcclxuICAgICAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJ1ZmZJZC5Cb3NzOF9Ta2lsbF8yX2F0dGFjazoge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVyb19kYXRhLnRvdGFsX2F0dGFjayAtPSBidWZmRGF0YS5idWZmX3ZhbHVlWzBdICogdGhpcy5oZXJvX2RhdGEuZml4ZWRfYXR0Y2s7XHJcbiAgICAgICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuYWRkRGVCdWZmU3RhdGUoYnVmZkRhdGEuYnVmZl9pZCwgYnVmZkRhdGEucmVtYWluX3RpbWUpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgYnVmZiA9IHRoaXMuaGVyb19kZWJ1ZmYuZ2V0KGJ1ZmZEYXRhLmJ1ZmZfaWQpO1xyXG4gICAgICAgICAgICBidWZmLnJlZnJlc2hCdWZmKGJ1ZmZEYXRhKTtcclxuICAgICAgICAgICAgdGhpcy5hZGREZUJ1ZmZTdGF0ZShidWZmRGF0YS5idWZmX2lkLCBidWZmRGF0YS5yZW1haW5fdGltZSk7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoYnVmZkRhdGEuYnVmZl9pZCkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBCdWZmSWQuQm9zczZfU2tpbGxfMl9qaWFuZ29uZ3N1OlxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJ1ZmYuZ2V0Rmxvb3JOdW0oKSA8IGJ1ZmZEYXRhLm1heF9mbG9vcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VBdHRhY2tTcGVlZCgtYnVmZkRhdGEuYnVmZl92YWx1ZVswXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWOu+mZpOS4gOS4qmRlYnVmZlxyXG4gICAgICogQHBhcmFtIGJ1ZmYgZGVidWZm57G75Z6LXHJcbiAgICAgKiBAcGFyYW0gaXNOZWVkUmVjeWNsZSDmmK/lkKbpnIDopoHosIPnlKjlm57mlLZcclxuICAgICAqIEByZXR1cm5zIFxyXG4gICAgICovXHJcbiAgICBzdWJEZUJ1ZmYoYnVmZklkOiBCdWZmSWQpOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgYnVmZiA9IHRoaXMuaGVyb19kZWJ1ZmYuZ2V0KGJ1ZmZJZCk7XHJcbiAgICAgICAgaWYgKGJ1ZmYpIHtcclxuICAgICAgICAgICAgYnVmZi5kZXN0cm95U2VsZigpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRGVCdWZmRGVzdG9yeShidWZmRGF0YTogQnVmZkRhdGEpIHtcclxuICAgICAgICAvLyBsZXQgYnVmZlN0YXRlPXRoaXMubWFwX2RlYnVmZl9zdGF0ZS5nZXQoQnVmZlN0YXRlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldERlQnVmZlR5cGUoYnVmZkRhdGEuYnVmZl9pZCkpO1xyXG4gICAgICAgIC8vIGlmKGJ1ZmZTdGF0ZSl7XHJcbiAgICAgICAgLy8gICAgIGJ1ZmZTdGF0ZS5kZXN0cm95U2VsZigpO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICB0aGlzLmhlcm9fZGVidWZmLmRlbGV0ZShidWZmRGF0YS5idWZmX2lkKTtcclxuICAgICAgICBzd2l0Y2ggKGJ1ZmZEYXRhLmJ1ZmZfaWQpIHtcclxuICAgICAgICAgICAgY2FzZSBCdWZmSWQuTW9uc3Rlcl9YdWFuWXVuOiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5oZXJvX3R5cGUgIT0gSGVyb19UeXBlLlpoZW5EZSlcclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLm1wX3Byb2dyZXNzLnNldERpc2FibGUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nb25namlfamlzaHUgPSAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zcGluZS5wYXVzZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNfY2FuX3RvdWNoID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIFdhbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWFpbldhbGwoKS5oaWRlVmVydGlnbygpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMueHVhbnl1bl9jYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMueHVhbnl1bl9jYWxsYmFjayhmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQnVmZklkLkJvc3MzX0pJQU5fR29uZ1N1OiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZUF0dGFja1NwZWVkKGJ1ZmZEYXRhLmJ1ZmZfdmFsdWVbMF0pO1xyXG4gICAgICAgICAgICAgICAgbGV0IGJ1ZmZTdGF0ZSA9IHRoaXMubWFwX2RlYnVmZl9zdGF0ZS5nZXQoQnVmZlN0YXRlVHlwZS5BdHRhY2tTcGVlZCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYnVmZlN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnVmZlN0YXRlLmRlc3Ryb3lTZWxmKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQnVmZklkLkJvc3M2X1NraWxsXzJfamlhbmdvbmdzdToge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VBdHRhY2tTcGVlZChidWZmRGF0YS5idWZmX3ZhbHVlWzBdICogYnVmZkRhdGEuY3VyX2Zsb29yKTtcclxuICAgICAgICAgICAgICAgIGxldCBidWZmU3RhdGUgPSB0aGlzLm1hcF9kZWJ1ZmZfc3RhdGUuZ2V0KEJ1ZmZTdGF0ZVR5cGUuQXR0YWNrU3BlZWQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGJ1ZmZTdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZTdGF0ZS5kZXN0cm95U2VsZigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEJ1ZmZJZC5Cb3NzOF9Ta2lsbF8yX2F0dGFjazoge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oZXJvX2RhdGEudG90YWxfYXR0YWNrICs9IGJ1ZmZEYXRhLmJ1ZmZfdmFsdWVbMF0gKiB0aGlzLmhlcm9fZGF0YS5maXhlZF9hdHRjaztcclxuICAgICAgICAgICAgICAgIGxldCBidWZmU3RhdGUgPSB0aGlzLm1hcF9kZWJ1ZmZfc3RhdGUuZ2V0KEJ1ZmZTdGF0ZVR5cGUuQXR0YWNrKTtcclxuICAgICAgICAgICAgICAgIGlmIChidWZmU3RhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBidWZmU3RhdGUuZGVzdHJveVNlbGYoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaXNIYXZlRGVCdWZmKGJ1ZmZJZDogQnVmZklkKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaGVyb19kZWJ1ZmYuaGFzKGJ1ZmZJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlQWxsRGVCdWZmKCkge1xyXG4gICAgICAgIHRoaXMuaGVyb19kZWJ1ZmYuZm9yRWFjaCgodiwgaykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnN1YkRlQnVmZih2LmdldEJ1ZmZJZCgpKVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBnZXRHYW1lRWZmZWN0SWRCeURlYnVmZihidWZmOiBIZXJvX0RlQnVmZik6IEdhbWVFZmZlY3RJZCB7XHJcbiAgICAgICAgbGV0IGdhbWVFZmZlY3RJZCA9IEdhbWVFZmZlY3RJZC5OdWxsO1xyXG4gICAgICAgIHN3aXRjaCAoYnVmZikge1xyXG4gICAgICAgICAgICBjYXNlIEhlcm9fRGVCdWZmLlh1YW5ZdW46IHtcclxuICAgICAgICAgICAgICAgIGdhbWVFZmZlY3RJZCA9IEdhbWVFZmZlY3RJZC54dWFueXVuO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZ2FtZUVmZmVjdElkO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEdhbWVFZmZlY3ROYW1lQnlEZWJ1ZmYoYnVmZjogSGVyb19EZUJ1ZmYpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCBuYW1lID0gJzAnO1xyXG4gICAgICAgIHN3aXRjaCAoYnVmZikge1xyXG4gICAgICAgICAgICBjYXNlIEhlcm9fRGVCdWZmLlh1YW5ZdW46IHtcclxuICAgICAgICAgICAgICAgIG5hbWUgPSBHYW1lRWZmZWN0SWQueHVhbnl1biArICcnO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRYdWFuWXVuTGlzdGVuKGNhbGxiYWNrOiBGdW5jdGlvbikge1xyXG4gICAgICAgIHRoaXMueHVhbnl1bl9jYWxsYmFjayA9IGNhbGxiYWNrO1xyXG4gICAgfVxyXG5cclxuICAgIHJlc2V0U3RhdGUoKSB7XHJcbiAgICAgICAgdGhpcy5zZXRDRCgxIC8gMyk7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVBbGxCdWZmKCk7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVBbGxEZUJ1ZmYoKTtcclxuICAgICAgICB0aGlzLm1hcF9idWZmX3N0YXRlLmZvckVhY2goKHYsIGspID0+IHtcclxuICAgICAgICAgICAgdi5kZXN0cm95U2VsZigpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMubWFwX2RlYnVmZl9zdGF0ZS5mb3JFYWNoKCh2LCBrKSA9PiB7XHJcbiAgICAgICAgICAgIHYuZGVzdHJveVNlbGYoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAodGhpcy5yZXNldF9jYWxsYmFjaykge1xyXG4gICAgICAgICAgICB0aGlzLnJlc2V0X2NhbGxiYWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5ZCM5q2l5pWw5o2u5L+h5oGvXHJcbiAgICAgICAgdGhpcy5oZXJvX2RhdGEgPSBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdhbWVfaGVyb19kYXRhLmdldCh0aGlzLmhlcm9fdHlwZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5re75Yqg5LiA5LiqYnVmZueKtuaAgeWbvuaghyAqL1xyXG4gICAgYWRkQnVmZlN0YXRlKGJ1ZmZJZDogQnVmZklkLCByZW1haW5UaW1lOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgdHlwZXMgPSBCdWZmU3RhdGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0QnVmZlR5cGUoYnVmZklkKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHR5cGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCB0eXBlID0gdHlwZXNbaV07XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1hcF9idWZmX3N0YXRlLmhhcyh0eXBlKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXBfYnVmZl9zdGF0ZS5nZXQodHlwZSkucmVmcmVzaFRpbWUocmVtYWluVGltZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYmZTdGF0ZSA9IEJ1ZmZTdGF0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVCdWZmU3RhdGUodHlwZSwgdGhpcy5oZXJvX3R5cGUpO1xyXG4gICAgICAgICAgICAgICAgYmZTdGF0ZS5pbml0KHR5cGUsIHJlbWFpblRpbWUsIHRoaXMub25CdWZmU3RhdGVEZXN0b3J5LmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXBfYnVmZl9zdGF0ZS5zZXQodHlwZSwgYmZTdGF0ZSk7XHJcbiAgICAgICAgICAgICAgICAvL3RoaXMubm9kZS5hZGRDaGlsZChzaGllbGQubm9kZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25CdWZmU3RhdGVEZXN0b3J5KHR5cGU6IEJ1ZmZTdGF0ZVR5cGUpIHtcclxuICAgICAgICB0aGlzLm1hcF9idWZmX3N0YXRlLmRlbGV0ZSh0eXBlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKirmt7vliqDkuIDkuKpidWZm54q25oCB5Zu+5qCHICovXHJcbiAgICBhZGREZUJ1ZmZTdGF0ZShidWZmSWQ6IEJ1ZmZJZCwgcmVtYWluVGltZTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHR5cGVzID0gQnVmZlN0YXRlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldERlQnVmZlR5cGUoYnVmZklkKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHR5cGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCB0eXBlID0gdHlwZXNbaV07XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1hcF9kZWJ1ZmZfc3RhdGUuaGFzKHR5cGUpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hcF9kZWJ1ZmZfc3RhdGUuZ2V0KHR5cGUpLnJlZnJlc2hUaW1lKHJlbWFpblRpbWUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbGV0IGJmU3RhdGUgPSBCdWZmU3RhdGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlRGVCdWZmU3RhdGUodHlwZSwgdGhpcy5oZXJvX3R5cGUpO1xyXG4gICAgICAgICAgICAgICAgYmZTdGF0ZS5pbml0KHR5cGUsIHJlbWFpblRpbWUsIHRoaXMub25EZUJ1ZmZTdGF0ZURlc3RvcnkuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hcF9kZWJ1ZmZfc3RhdGUuc2V0KHR5cGUsIGJmU3RhdGUpO1xyXG4gICAgICAgICAgICAgICAgLy90aGlzLm5vZGUuYWRkQ2hpbGQoc2hpZWxkLm5vZGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uRGVCdWZmU3RhdGVEZXN0b3J5KHR5cGU6IEJ1ZmZTdGF0ZVR5cGUpIHtcclxuICAgICAgICB0aGlzLm1hcF9kZWJ1ZmZfc3RhdGUuZGVsZXRlKHR5cGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuiuvue9ruaUu+mAn++8jOavj+enkuaUu+WHu+asoeaVsCAqL1xyXG4gICAgcHJpdmF0ZSBzZXRBdHRhY2tTcGVlZChudW1TZWM6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuZ29uZ2ppX3N1ZHUgPSBudW1TZWM7XHJcbiAgICAgICAgaWYgKG51bVNlYyA+IDEwKSB7XHJcbiAgICAgICAgICAgIG51bVNlYyA9IDEwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobnVtU2VjIDwgMC4xKSB7XHJcbiAgICAgICAgICAgIG51bVNlYyA9IDAuMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5oZXJvX2RhdGEuZ29uZ2ppX2ppYW5nZSA9IDEgLyBudW1TZWM7XHJcbiAgICB9XHJcbiAgICAvKirmlLnlj5jlvZPliY3mlLvpgJ8sYnVmZkRhdGE65q+U546HICovXHJcbiAgICBwcml2YXRlIGNoYW5nZUF0dGFja1NwZWVkKHJhdGU6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBnanNkID0gdGhpcy5nZXRBdHRhY2tTcGVlZCgpO1xyXG4gICAgICAgIGdqc2QgKz0gKHJhdGUpICogKDEgLyB0aGlzLmhlcm9fZGF0YS5iYXNlX2ppYW5nZSk7XHJcbiAgICAgICAgdGhpcy5zZXRBdHRhY2tTcGVlZChnanNkKTtcclxuICAgIH1cclxuICAgIC8qKuiOt+W+l+W9k+WJjeaUu+mAnyAqL1xyXG4gICAgcHJpdmF0ZSBnZXRBdHRhY2tTcGVlZCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiAxIC8gdGhpcy5oZXJvX2RhdGEuZ29uZ2ppX2ppYW5nZTtcclxuICAgIH1cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLeeKtuaAgSzliqjnlLstLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBwdWJsaWMgc2V0SGVyb1N0YXRlKHN0YXRlOiBIZXJvX1N0YXRlLCBmYW5neGlhbmc6IEdvbmdKaV9GYW5nWGlhbmcsIGRhdGE/OiBLZXlGcmFtZURhdGFbXSwgZW5kQ2FsbGJhY2s/OiBGdW5jdGlvbikge1xyXG4gICAgICAgIHRoaXMuaGVyb19zdGF0ZSA9IHN0YXRlO1xyXG4gICAgICAgIHRoaXMuY3VyX2Zhbmd4aWFuZyA9IGZhbmd4aWFuZztcclxuICAgICAgICBzd2l0Y2ggKHRoaXMuY3VyX2Zhbmd4aWFuZykge1xyXG4gICAgICAgICAgICBjYXNlIEdvbmdKaV9GYW5nWGlhbmcuenVvOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc2NhbGVYID0gdGhpcy5zZXR1cF9zY2FsZTtcclxuICAgICAgICAgICAgICAgIC8vdGhpcy5ub2RlLnNjYWxlWCA9IC10aGlzLnNldHVwX3NjYWxlO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdvbmdKaV9GYW5nWGlhbmcuemhvbmc6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zY2FsZVggPSB0aGlzLnNldHVwX3NjYWxlO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdvbmdKaV9GYW5nWGlhbmcueW91OiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc2NhbGVYID0gdGhpcy5zZXR1cF9zY2FsZTtcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/mkq3mlL7liqjnlLtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMuaGVyb19zdGF0ZSkge1xyXG4gICAgICAgICAgICBjYXNlIEhlcm9fU3RhdGUuaWRsZToge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5U3BpbmVBbmltYXRpb24odGhpcy5nZXRTcGluZU5hbWUoKSwgdHJ1ZSwgbnVsbCwgbnVsbCk7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgSGVyb19TdGF0ZS5hdHRhY2s6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheVNwaW5lQW5pbWF0aW9uKHRoaXMuZ2V0U3BpbmVOYW1lKCksIGZhbHNlLCBkYXRhLCBlbmRDYWxsYmFjayk7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgSGVyb19TdGF0ZS5za2lsbDpcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXlTcGluZUFuaW1hdGlvbih0aGlzLmdldFNwaW5lTmFtZSgpLCBmYWxzZSwgZGF0YSwgZW5kQ2FsbGJhY2spO1xyXG4gICAgICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHNldEhlcm9TdGF0ZUFuZEFuaW1hdGlvbihzdGF0ZTogSGVyb19TdGF0ZSwgbmFtZTogc3RyaW5nLCBsb29wOiBib29sZWFuLCBkYXRhPzogS2V5RnJhbWVEYXRhW10sIGVuZENhbGxiYWNrPzogRnVuY3Rpb24pIHtcclxuICAgICAgICB0aGlzLmhlcm9fc3RhdGUgPSBzdGF0ZTtcclxuICAgICAgICB0aGlzLnBsYXlTcGluZUFuaW1hdGlvbihuYW1lLCBsb29wLCBkYXRhLCBlbmRDYWxsYmFjayk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SGVyb1N0YXRlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmhlcm9fc3RhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5qC55o2u5pWM5Lq65L2N572u6I635b6X5pS75Ye75pa55ZCRICovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0RmFuZ1hpYW5nQnlQb3MocG9zOiBjYy5WZWMyKTogR29uZ0ppX0ZhbmdYaWFuZyB7XHJcbiAgICAgICAgLy/lr7nmlYzkurrljZXkvY3ov5vooYzmlrnlkJHliKTmlq3vvIznoa7lrprmiZPlh7vmlrnlkJFcclxuICAgICAgICBsZXQgZmFuZ3hpYW5nID0gR29uZ0ppX0ZhbmdYaWFuZy56aG9uZztcclxuICAgICAgICBsZXQgb2Zmc2V0UG9zID0gcG9zLnN1Yih0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKSk7XHJcbiAgICAgICAgbGV0IHBpMiA9IE1hdGguUEkgKiAyO1xyXG4gICAgICAgIGxldCByYWRpYW4gPSAoTWF0aC5hdGFuMihvZmZzZXRQb3MueSwgb2Zmc2V0UG9zLngpICsgcGkyKSAlIHBpMjtcclxuICAgICAgICBsZXQgYW5nbGUgPSAxODAgKiByYWRpYW4gLyBNYXRoLlBJO1xyXG4gICAgICAgIGlmIChhbmdsZSA8PSA2MCkge1xyXG4gICAgICAgICAgICBmYW5neGlhbmcgPSBHb25nSmlfRmFuZ1hpYW5nLnlvdTtcclxuICAgICAgICB9IGVsc2UgaWYgKGFuZ2xlID4gNjAgJiYgYW5nbGUgPCAxMjApIHtcclxuICAgICAgICAgICAgZmFuZ3hpYW5nID0gR29uZ0ppX0ZhbmdYaWFuZy56aG9uZztcclxuICAgICAgICB9IGVsc2UgaWYgKGFuZ2xlID49IDEyMCAmJiBhbmdsZSA8PSAxODApIHtcclxuICAgICAgICAgICAgZmFuZ3hpYW5nID0gR29uZ0ppX0ZhbmdYaWFuZy56dW87XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYW5neGlhbmc7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U3BpbmVOYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLmhlcm9fc3RhdGUpIHtcclxuICAgICAgICAgICAgY2FzZSBIZXJvX1N0YXRlLmF0dGFjazoge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEhlcm9fU3RhdGVfTmFtZS5BdHRhY2s7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgSGVyb19TdGF0ZS5za2lsbDoge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEhlcm9fU3RhdGVfTmFtZS5Ta2lsbDtcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBIZXJvX1N0YXRlLmlkbGU6IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBIZXJvX1N0YXRlX05hbWUuSWRsZTtcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOaSreaUvuS4gOS4qumqqOmqvOWKqOeUu1xyXG4gICAgICogQHBhcmFtIG5hbWUg6aqo6aq85Yqo55S75ZCN56ewXHJcbiAgICAgKiBAcGFyYW0gaXNMb29wIOaYr+WQpuW+queOr1xyXG4gICAgICogQHBhcmFtIGRhdGEg5piv5ZCm55uR5ZCs5YWz6ZSu5bin77yM5YWz6ZSu5bin5pWw5o2u5YyF5ZCr5YWz6ZSu5bin5ZCN56ew77yM55uR5ZCs5Yiw5YWz6ZSu5bin5ZCO55qE5Zue6LCDXHJcbiAgICAgKiBAcGFyYW0gZW5kQ2FsbGJhY2sg5pKt5pS+57uT5p2f5ZCO55qE5Zue6LCDXHJcbiAgICAgKi9cclxuICAgIHBsYXlTcGluZUFuaW1hdGlvbihuYW1lOiBzdHJpbmcsIGlzTG9vcDogYm9vbGVhbiA9IGZhbHNlLCBkYXRhPzogS2V5RnJhbWVEYXRhW10sIGVuZENhbGxiYWNrPzogRnVuY3Rpb24pIHtcclxuICAgICAgICBsZXQgYW5pbWEgPSB0aGlzLnNwaW5lLnNldEFuaW1hdGlvbigwLCBuYW1lLCBpc0xvb3ApO1xyXG4gICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3BpbmUuc2V0VHJhY2tFdmVudExpc3RlbmVyKGFuaW1hLCAoZW50cnk6IHNwLnNwaW5lLlRyYWNrRW50cnksIGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnQuZGF0YS5uYW1lID09IGRhdGFbaV0ubmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhW2ldLmNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZW5kQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgdGhpcy5zcGluZS5zZXRUcmFja0NvbXBsZXRlTGlzdGVuZXIoYW5pbWEsIChlbnRyeTogc3Auc3BpbmUuVHJhY2tFbnRyeSwgZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgIGFuaW1hLmxpc3RlbmVyID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGVuZENhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tQ0QtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIHB1YmxpYyByZXNldFNraWxsKCkge1xyXG4gICAgICAgIHRoaXMuc2tpbGxfY2RfdGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy5zaG93Q0QoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVzZXRDRCgpIHtcclxuICAgICAgICB0aGlzLnNraWxsX2NkX3RpbWUgPSB0aGlzLnNraWxsX3RvdGFsX3RpbWU7XHJcbiAgICAgICAgdGhpcy5zaG93Q0QoKTtcclxuICAgICAgICAvL+mHiuaUvuS6huaKgOiDve+8jOeri+mprOWHj+WOu01QXHJcbiAgICAgICAgLy9HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLndhbGxfZGF0YS5jaGFuZ2VNcCgtdGhpcy5oZXJvX2RhdGEuY29zdF9tcCk7XHJcbiAgICB9XHJcbiAgICAvKirnmb7liIbmr5QgKi9cclxuICAgIHB1YmxpYyBzZXRDRChwZXJUaW1lOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnNraWxsX2NkX3RpbWUgPSBwZXJUaW1lICogdGhpcy5oZXJvX2RhdGEuZ2V0U2tpbGxDb2xkRG93bihTa2lsbFR5cGUuQWN0aXZlKTs7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VDRCgwKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2hhbmdlQ0QodGltZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5za2lsbF9jZF90aW1lICs9IHRpbWU7XHJcbiAgICAgICAgaWYgKHRoaXMuc2tpbGxfY2RfdGltZSA8PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2tpbGxfY2RfdGltZSA9IDA7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1wX3Byb2dyZXNzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1wX3Byb2dyZXNzLnNldE5vcm1hbFNQKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuYXV0b19maWdodGluZyAmJiBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX3N0YXRlID09IEdhbWVTdGF0ZS5HYW1lX1BsYXlpbmcgJiYgdGhpcy5nZXRJc0NhblNraWxsKCkgJiYgU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SXNTa2lsbFN0YXRlKCkgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRBdXRvUmVsZWFzZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy/mmL7npLrokpnmnb/lkozlgJLorqHml7ZcclxuICAgICAgICAgICAgaWYgKHRoaXMubXBfcHJvZ3Jlc3MpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubXBfcHJvZ3Jlc3Muc2V0Q0RTUCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2hvd0NEKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzaG93Q0QoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubXBfcHJvZ3Jlc3MpIHtcclxuICAgICAgICAgICAgbGV0IHByb2dyZXNzID0gMSAtIHRoaXMuc2tpbGxfY2RfdGltZSAvIHRoaXMuc2tpbGxfdG90YWxfdGltZTtcclxuICAgICAgICAgICAgdGhpcy5tcF9wcm9ncmVzcy5zZXRQcm9ncmVzcyhwcm9ncmVzcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldElzQ2FuU2tpbGwoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNIYXZlRGVCdWZmKEJ1ZmZJZC5Nb25zdGVyX1h1YW5ZdW4pIHx8IHRoaXMuZ2V0SGVyb1N0YXRlKCkgPT0gSGVyb19TdGF0ZS5leGl0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5pc19zaG93X21wX2hpbnQgPSBmYWxzZTtcclxuICAgICAgICBpZiAodGhpcy5za2lsbF9jZF90aW1lIDw9IDApIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNfbmVlZF9jaGVja19kaXN0YW5jZSkge1xyXG4gICAgICAgICAgICAgICAgLy/lpoLmnpzpnIDopoHliKTmlq3ph4rmlL7ot53nprvnmoTvvIzliJnpnIDopoHliKTmlq3ph4rmlL7ot53nprvlhoXmnInmsqHmnInmgKrnianvvIzmsqHmnInliJnov5Tlm55mYWxzZVxyXG4gICAgICAgICAgICAgICAgbGV0IGVuZW15cyA9IE1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TW9uc3RlcnNGb3JOZWFyZXN0QnlTa2lsbCh0aGlzLm1heF9nb25namlfbnVtLCB0aGlzLm5vZGUueSwgdGhpcy5jYXN0aW5nX2Rpc3RhbmNlKTtcclxuICAgICAgICAgICAgICAgIGlmIChlbmVteXMgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBkYW1hZ2Ug5pys5qyh5LiN5pq05Ye755qE5Lyk5a6z5YC8XHJcbiAgICAgKiBAcGFyYW0gaXNCdWxsZXQg5piv5ZCm5a2Q5by557G75Z6LXHJcbiAgICAgKiBAcGFyYW0gc2tpbGxUeXBlIOaKgOiDveexu+Wei1xyXG4gICAgICogQHBhcmFtIHNraWxsUmF0ZSDlpoLmnpzmmK/mioDog73vvIzmioDog73nmoTmr5TnjodcclxuICAgICAqIEBwYXJhbSBjb250aW51b3VzUmF0ZSDkvKTlrrPmr5Tnjoct5bqU55So5Zyo5oyB57ut5Lyk5a6z5q+U546HXHJcbiAgICAgKiBAcmV0dXJucyDmlLvlh7vmlbDmja5cclxuICAgICAqL1xyXG4gICAgZ2V0R29uZ0ppRGF0YShkYW1hZ2VUeXBlOiBEYW1hZ2VUeXBlLCBpc0J1bGxldDogYm9vbGVhbiwgc2tpbGxUeXBlOiBTa2lsbFR5cGUsIHNraWxsUmF0ZTogbnVtYmVyID0gMSwgY29udGludW91c1JhdGU6IG51bWJlciA9IDApOiBHb25nSmlEYXRhIHtcclxuICAgICAgICBsZXQgZ2pEYXRhID0gbmV3IEdvbmdKaURhdGEoKTtcclxuICAgICAgICBnakRhdGEuaGVyb19kYXRhID0gY2MuaW5zdGFudGlhdGUodGhpcy5oZXJvX2RhdGEpO1xyXG4gICAgICAgIGdqRGF0YS5oZXJvX2RhdGEuYXR0YWNrX2luY3JlYXNlX2RhbWFnZSA9IEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Q2hhcmlvQXR0YWNrUm90aW8oKSArIHRoaXMuZ2V0THZsR29uamkoKTtcclxuICAgICAgICBnakRhdGEuaXNfYnVsbGV0ID0gaXNCdWxsZXQ7XHJcbiAgICAgICAgZ2pEYXRhLmRhbWFnZV90eXBlID0gZGFtYWdlVHlwZTtcclxuICAgICAgICBnakRhdGEuaGVyb190eXBlID0gdGhpcy5oZXJvX3R5cGU7XHJcbiAgICAgICAgaWYgKGRhbWFnZVR5cGUgPT0gRGFtYWdlVHlwZS5Ob3JtYWwpIHtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy/mioDog73kvKTlrrPmr5TnjodcclxuICAgICAgICAgICAgZ2pEYXRhLnNraWxsX2RhbWFnZV9yYXRlID0gc2tpbGxSYXRlO1xyXG4gICAgICAgICAgICBnakRhdGEuY29udGludW91c19kYW1hZ2VfcmF0ZSA9IGNvbnRpbnVvdXNSYXRlO1xyXG4gICAgICAgICAgICBpZiAoc2tpbGxUeXBlID09IFNraWxsVHlwZS5BY3RpdmUpIHtcclxuICAgICAgICAgICAgICAgIGdqRGF0YS5za2lsbF9yZWxlYXNlX2lkID0gdGhpcy5nZXRTa2lsbFJlbGVhc2VJZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBnakRhdGE7XHJcbiAgICB9XHJcbiAgICAvL+iOt+WPluWboOS4uua4uOaIj+WGheetiee6p+WPmOWMluWvvOiHtOeahOmineWkluaUu+WHu+WKm1xyXG4gICAgZ2V0THZsR29uamkoKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgbnVtR29uZ2ppOiBudW1iZXIgPSAwO1xyXG4gICAgICAgIGlmICh0aGlzLmhlcm9fdHlwZSA9PSBIZXJvX1R5cGUuQ2hhbmdNYW9TaG91KSB7XHJcbiAgICAgICAgICAgIG51bUdvbmdqaSA9IHRoaXMuaGVyb19sdmwgKiAwLjA1O1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc0hhdmVCdWZmKEJ1ZmZJZC5IZXJvX0NoYW5nTWFvU2hvd19Hb25nU3UpKSB7XHJcbiAgICAgICAgICAgICAgICBudW1Hb25namkgKz0gdGhpcy5oZXJvX2x2bCAqIDAuMDU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmhlcm9fdHlwZSA9PSBIZXJvX1R5cGUuU2hvdVdhbmcpIHtcclxuICAgICAgICAgICAgbnVtR29uZ2ppID0gdGhpcy5oZXJvX2x2bCAqIDAuMDU7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmhlcm9fdHlwZSA9PSBIZXJvX1R5cGUuUGFvU2hvdSkge1xyXG4gICAgICAgICAgICBudW1Hb25namkgPSB0aGlzLmhlcm9fbHZsICogMC4wNTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaGVyb190eXBlID09IEhlcm9fVHlwZS5EZUx1WWkpIHtcclxuICAgICAgICAgICAgbnVtR29uZ2ppID0gdGhpcy5oZXJvX2x2bCAqIDAuMDU7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmhlcm9fdHlwZSA9PSBIZXJvX1R5cGUuS3VhbmdaaGFuU2hpKSB7XHJcbiAgICAgICAgICAgIG51bUdvbmdqaSA9IHRoaXMuaGVyb19sdmwgKiAwLjE7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzSGF2ZUJ1ZmYoQnVmZklkLkhlcm9fS3VhbmdaaGFuU2hpX0RhWmhhbykpIHtcclxuICAgICAgICAgICAgICAgIG51bUdvbmdqaSArPSB0aGlzLmhlcm9fbHZsICowLjE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaGVyb190eXBlID09IEhlcm9fVHlwZS5aaGVuRGUpIHtcclxuICAgICAgICAgICAgbnVtR29uZ2ppID0gdGhpcy5oZXJvX2x2bCAqIDAuMTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaGVyb190eXBlID09IEhlcm9fVHlwZS5Odld1KSB7XHJcbiAgICAgICAgICAgIG51bUdvbmdqaSA9IHRoaXMuaGVyb19sdmwgKiAwLjE7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmhlcm9fdHlwZSA9PSBIZXJvX1R5cGUuR29uZ0ppYW5TaG91KSB7XHJcbiAgICAgICAgICAgIG51bUdvbmdqaSA9IHRoaXMuaGVyb19sdmwgKiAwLjE7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmhlcm9fdHlwZSA9PSBIZXJvX1R5cGUuQmluZ052KSB7XHJcbiAgICAgICAgICAgIG51bUdvbmdqaSA9IHRoaXMuaGVyb19sdmwgKiAwLjE1O1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5oZXJvX3R5cGUgPT0gSGVyb19UeXBlLkFOdUJpU2kpIHtcclxuICAgICAgICAgICAgbnVtR29uZ2ppID0gdGhpcy5oZXJvX2x2bCAqIDAuMTU7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmhlcm9fdHlwZSA9PSBIZXJvX1R5cGUuTWVpTW8pIHtcclxuICAgICAgICAgICAgbnVtR29uZ2ppID0gdGhpcy5oZXJvX2x2bCAqIDAuMTU7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmhlcm9fdHlwZSA9PSBIZXJvX1R5cGUuTGVpU2hlbikge1xyXG4gICAgICAgICAgICBudW1Hb25namkgPSB0aGlzLmhlcm9fbHZsICogMC4xNTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBudW1Hb25namk7XHJcblxyXG4gICAgfVxyXG4gICAgb25EYW1hZ2VNb25zdGVyKGRhbWFnZVR5cGU6IERhbWFnZVR5cGUsIGlzQ3JpdDogYm9vbGVhbiwgbW9uc3RlcjogY2MuTm9kZSkge1xyXG4gICAgICAgIGlmIChkYW1hZ2VUeXBlID09IERhbWFnZVR5cGUuTm9ybWFsKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBldCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wZXQub25IZXJvSGl0TW9uc3Rlcihtb25zdGVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5oaXRfY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgdGhpcy5oaXRfY2FsbGJhY2soZGFtYWdlVHlwZSwgaXNDcml0LCBtb25zdGVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVzZXRHb25nSmlKaVNodSgpIHtcclxuICAgICAgICB0aGlzLmdvbmdqaV9qaXNodSA9IDA7XHJcbiAgICAgICAgdGhpcy5pc19jYW5famlzaHUgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHJlc2V0Tm9ybWFsQXR0YWNrKCkge1xyXG4gICAgICAgIHRoaXMuZ29uZ2ppX2ppc2h1ID0gdGhpcy5oZXJvX2RhdGEuZ29uZ2ppX2ppYW5nZTtcclxuICAgICAgICB0aGlzLmlzX2Nhbl9qaXNodSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0QXR0U3BpbmVTY2FsZSgpIHtcclxuICAgICAgICB0aGlzLnNwaW5lLnRpbWVTY2FsZSA9IHRoaXMuaGVyb19kYXRhLmJhc2VfamlhbmdlIC8gdGhpcy5oZXJvX2RhdGEuZ29uZ2ppX2ppYW5nZTtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydE5vcm1hbEF0dGFjayhtb25zdGVyOiBjYy5Ob2RlKSB7XHJcbiAgICAgICAgbGV0IGlzRG91YmxlOiBib29sZWFuID0gdGhpcy5pc19kb3VibGVfYXR0YWNrO1xyXG4gICAgICAgIHRoaXMuc2V0QXR0U3BpbmVTY2FsZSgpO1xyXG4gICAgICAgIGlmICh0aGlzLmlzX2RvdWJsZV9hdHRhY2spIHtcclxuICAgICAgICAgICAgdGhpcy5zcGluZS50aW1lU2NhbGUgPSB0aGlzLmhlcm9fZGF0YS5iYXNlX2ppYW5nZSAvIHRoaXMuaGVyb19kYXRhLmdvbmdqaV9qaWFuZ2UgKiAyO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmlzX2RvdWJsZV9hdHRhY2sgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmF0dGFja19jYWxsYmFjayhtb25zdGVyKTtcclxuICAgICAgICBpZiAodGhpcy5wZXQpIHtcclxuICAgICAgICAgICAgdGhpcy5wZXQuc3RhcnRSZWxlYXNlU2tpbGwobW9uc3Rlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX21vZGUgPT0gR2FtZU1vZGUuRW5kbGVzcykge1xyXG4gICAgICAgICAgICBpZiAoaXNEb3VibGUgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIGxldCBidWZmID0gdGhpcy5nZXRFbmRsZXNzQnlUeXBlKEVuZGxlc3NCdWZmVHlwZS5Eb3VibGVBdHRhY2spXHJcbiAgICAgICAgICAgICAgICBpZiAoYnVmZikge1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5qaC546HXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJhdGUgPSBidWZmLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChNYXRoLnJhbmRvbSgpIDwgcmF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzX2RvdWJsZV9hdHRhY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNwaW5lLnRpbWVTY2FsZSA9IHRoaXMuaGVyb19kYXRhLmJhc2VfamlhbmdlIC8gdGhpcy5oZXJvX2RhdGEuZ29uZ2ppX2ppYW5nZSAqIDI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tVVBEQVRFLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIHVwZGF0ZShkdDogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfc3RhdGUgIT0gR2FtZVN0YXRlLkdhbWVfUGxheWluZyB8fCBIZXJvX1N0YXRlLmV4aXQgPT0gdGhpcy5nZXRIZXJvU3RhdGUoKSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuY2hlY2tTa2lsbChkdCk7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNIYXZlRGVCdWZmKEJ1ZmZJZC5Nb25zdGVyX1h1YW5ZdW4pKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jaGVja0F0dGFjayhkdCk7XHJcbiAgICAgICAgaWYgKHRoaXMuY2xpY2tfcmVtYWluID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmNsaWNrX3JlbWFpbiAtPSBkdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB2eDogbnVtYmVyID0gKHRoaXMudGFyZ2V0WCAtIHRoaXMubm9kZS54KSAqIHRoaXMuZWFzaW5nO1xyXG4gICAgICAgIHRoaXMubm9kZS54ICs9IHZ4O1xyXG4gICAgICAgIGlmICh0aGlzLnBvc0luZGV4ID09IDIpIHtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFyUG9zWCA9IHRoaXMubm9kZS54O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5ub2RlX3NoYWRvdykge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGVfc2hhZG93LnNldFBvc2l0aW9uKGNjLnYyKHRoaXMubm9kZS54ICsgdGhpcy5wb3MueCAqIHRoaXMuc2V0dXBfc2NhbGUsIHRoaXMubm9kZS55ICsgdGhpcy5wb3MueSAqIHRoaXMuc2V0dXBfc2NhbGUpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gc3dpdGNoICh0aGlzLnNwZWVkVHlwZSkge1xyXG4gICAgICAgIC8vICAgICBjYXNlIFNwZWVkVHlwZS5TVE9QOlxyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5tb3ZlU3BlZWQgPSB0aGlzLnN0b3BTcGVlZDtcclxuICAgICAgICAvLyAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIC8vICAgICBjYXNlIFNwZWVkVHlwZS5OT1JNQUw6XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLm1vdmVTcGVlZCA9IHRoaXMubm9ybWFsU3BlZWQ7XHJcbiAgICAgICAgLy8gICAgICAgICBicmVhaztcclxuICAgICAgICAvLyAgICAgY2FzZSBTcGVlZFR5cGUuRkFTVDpcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMubW92ZVNwZWVkID0gdGhpcy5mYXN0U3BlZWQ7XHJcbiAgICAgICAgLy8gICAgICAgICBicmVhaztcclxuICAgICAgICAvLyAgICAgZGVmYXVsdDpcclxuICAgICAgICAvLyAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIC8vIH1cclxuXHJcblxyXG4gICAgICAgIC8vIHRoaXMubW92ZSgpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgdXBkYXRlQ2hlY2soZHQpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAodGhpcy5pc0hhdmVEZUJ1ZmYoQnVmZklkLk1vbnN0ZXJfWHVhbll1bikpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNoZWNrQXR0YWNrKGR0KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjaGVja1NraWxsKGR0OiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5oZXJvX3N0YXRlICE9IEhlcm9fU3RhdGUuc2tpbGwpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VDRCgtZHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNoZWNrQXR0YWNrKGR0KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNfY2FuX2ppc2h1ICYmIHRoaXMuaXNfbG9hZF9vaykge1xyXG4gICAgICAgICAgICB0aGlzLmdvbmdqaV9qaXNodSArPSBkdDtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZ29uZ2ppX2ppc2h1ID49IHRoaXMuaGVyb19kYXRhLmdvbmdqaV9qaWFuZ2UpIHtcclxuICAgICAgICAgICAgICAgIC8v5byA5aeL5pS75Ye7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdvbmdqaV9qaXNodSA9IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzX2Nhbl9nb25namkgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v6Ieq5Yqo5pS75Ye7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNfY2FuX2dvbmdqaSAmJiB0aGlzLmdldEhlcm9TdGF0ZSgpICE9IEhlcm9fU3RhdGUuc2tpbGwpIHtcclxuICAgICAgICAgICAgdGhpcy5pc19jYW5fZ29uZ2ppID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGxldCBtb25zdGVycyA9IE1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TW9uc3RlcnNGb3JOZWFyZXN0KHRoaXMubWF4X2dvbmdqaV9udW0sIHRoaXMubm9kZS5nZXRQb3NpdGlvbigpLCB0aGlzLmhlcm9fZGF0YS5nb25namlfZmFud2VpLCB0aGlzLnBvc0luZGV4KTtcclxuICAgICAgICAgICAgaWYgKG1vbnN0ZXJzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdvbmdqaV9qaXNodSA9IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzX2Nhbl9nb25namkgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRBdHRTcGluZVNjYWxlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0Tm9ybWFsQXR0YWNrKG1vbnN0ZXJzWzBdKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==