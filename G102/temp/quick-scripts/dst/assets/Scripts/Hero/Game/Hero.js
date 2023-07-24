
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
        this.mp_progress.show();
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
        if (enemys) {
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
                    this.mp_progress.setDisable(true);
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
                        this.mp_progress.setDisable(false);
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
        gjData.hero_data.attack_increase_damage = GameManager_1.default.getInstance().getCharioAttackRotio();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcR2FtZVxcSGVyby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBK0w7QUFHL0wsNkNBQXdEO0FBRXhELGlEQUE0QztBQUM1QyxvRUFBaUY7QUFFakYsK0RBQTBEO0FBQzFELDZDQUFzRDtBQUN0RCxnRUFBMkQ7QUFDM0QseURBQXNFO0FBQ3RFLHdEQUFtRDtBQUNuRCx5Q0FBb0M7QUFDcEMsdUNBQXNDO0FBQ3RDLHVDQUFrQztBQUNsQyxvREFBK0M7QUFDL0MsdUVBQWtFO0FBQ2xFLHNEQUFpRDtBQUNqRCxnREFBK0M7QUFDL0Msc0RBQWlEO0FBQ2pELDRFQUEwRjtBQUMxRixrRUFBd0U7QUFDeEUsa0RBQTZDO0FBQzdDLHFEQUEyRDtBQUMzRCxnREFBMkM7QUFDM0Msa0RBQTZDO0FBQzdDLGdEQUEyQztBQUMzQyxpREFBNEM7QUFDNUMsK0RBQTREO0FBSXRELElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQWtDLHdCQUFZO0lBQTlDO1FBQUEscUVBczZDQztRQWw2Q0csaUJBQWlCO1FBQ2pCLGdCQUFVLEdBQVksS0FBSyxDQUFDO1FBQzVCLGtCQUFZLEdBQVcsQ0FBQyxDQUFDO1FBQ3pCLG1CQUFhLEdBQVcsQ0FBQyxDQUFDO1FBRTFCLGlCQUFXLEdBQVMsS0FBSyxDQUFDLENBQUEsU0FBUztRQUduQyxlQUFTLEdBQWMsc0JBQVMsQ0FBQyxZQUFZLENBQUM7UUFHOUMsc0JBQWdCLEdBQWMsSUFBSSxDQUFDO1FBRW5DLE1BQU07UUFDTixXQUFLLEdBQWdCLElBQUksQ0FBQztRQUMxQixhQUFhO1FBQ2IsbUJBQWEsR0FBcUIsNkJBQWdCLENBQUMsR0FBRyxDQUFDO1FBQ3ZELFdBQVc7UUFDWCxnQkFBVSxHQUFlLHVCQUFVLENBQUMsSUFBSSxDQUFDO1FB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LEVBQUUsQ0FBQyxJQUFJLENBQUMsc0JBQVMsQ0FBQyxFQUFFLENBQUM7MkNBQ087SUFHOUM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztrREFDZTtJQWZsQixJQUFJO1FBRHhCLE9BQU87T0FDYSxJQUFJLENBczZDeEI7SUFBRCxXQUFDO0NBdDZDRCxBQXM2Q0MsQ0F0NkNpQyxFQUFFLENBQUMsU0FBUyxHQXM2QzdDO2tCQXQ2Q29CLElBQUkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCdWZmSWQsIEJ1ZmZTdGF0ZVR5cGUsIEJ1ZmZUeXBlLCBEYW1hZ2VUeXBlLCBHb25nSmlfRmFuZ1hpYW5nLCBIZXJvX0RlQnVmZiwgSGVyb19TdGF0ZSwgSGVyb19TdGF0ZV9OYW1lLCBIZXJvX1R5cGUsIFNraWxsSW5kaWNhdG9yVHlwZSwgU2tpbGxUaXBUeXBlLCBTa2lsbFR5cGUgfSBmcm9tIFwiLi9IZXJvQ29uZmlnXCI7XHJcbmltcG9ydCBNcFByb2dyZXNzIGZyb20gXCIuL01wUHJvZ3Jlc3NcIjtcclxuaW1wb3J0IEJ1ZmZTdGF0ZSBmcm9tIFwiLi9CdWZmU3RhdGVcIjtcclxuaW1wb3J0IHsgR29uZ0ppRGF0YSwgSGVyb0RhdGEgfSBmcm9tIFwiLi4vRGF0YS9IZXJvRGF0YVwiO1xyXG5pbXBvcnQgUGV0IGZyb20gXCIuLi8uLi9QZXQvR2FtZS9QZXRcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi8uLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBHYW1lRWZmZWN0SWQsIEdhbWVFZmZlY3RzTWFuYWdlciB9IGZyb20gXCIuLi8uLi9HYW1lL0dhbWVFZmZlY3RzTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBIZXJvTWFuYWdlciB9IGZyb20gXCIuLi9EYXRhL0hlcm9NYW5hZ2VyXCI7XHJcbmltcG9ydCBNb25zdGVyTWFuYWdlciBmcm9tIFwiLi4vLi4vTW9uc3Rlci9Nb25zdGVyTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBHYW1lTW9kZSwgR2FtZVN0YXRlIH0gZnJvbSBcIi4uLy4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgQnVmZlN0YXRlTWFuYWdlciBmcm9tIFwiLi4vLi4vR2FtZS9CdWZmU3RhdGVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEluanVyZWREYXRhLCBLZXlGcmFtZURhdGEgfSBmcm9tIFwiLi4vLi4vTW9uc3Rlci9Nb25zdGVyRGF0YVwiO1xyXG5pbXBvcnQgU2tpbGxNYW5hZ2VyIGZyb20gXCIuLi8uLi9HYW1lL1NraWxsTWFuYWdlclwiO1xyXG5pbXBvcnQgQnVmZlRpbWVyIGZyb20gXCIuL0J1ZmZUaW1lclwiO1xyXG5pbXBvcnQgeyBCdWZmRGF0YSB9IGZyb20gXCIuL0J1ZmZEYXRhXCI7XHJcbmltcG9ydCBTa2lsbFRpcCBmcm9tIFwiLi9Ta2lsbFRpcFwiO1xyXG5pbXBvcnQgU2t5TWFuYWdlciBmcm9tIFwiLi4vLi4vR2FtZS9Ta3lNYW5hZ2VyXCI7XHJcbmltcG9ydCBMYW5ndWFnZU1hbmFnZXIgZnJvbSBcIi4uLy4uL211bHRpTGFuZ3VhZ2UvTGFuZ3VhZ2VNYW5hZ2VyXCI7XHJcbmltcG9ydCBUYXNrTWFuYWdlciBmcm9tIFwiLi4vLi4vVGFzay9UYXNrTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBUYXNrSXRlbSB9IGZyb20gXCIuLi8uLi9UYXNrL1Rhc2tFbnVtXCI7XHJcbmltcG9ydCBXYWxsTWFuYWdlciBmcm9tIFwiLi4vLi4vV2FsbC9XYWxsTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBFbmRsZXNzQnVmZiwgRW5kbGVzc0J1ZmZUeXBlIH0gZnJvbSBcIi4uLy4uL2NvcHkvZW5kbGVzc2NoYWxsZW5nZXMvRW5kbGVzc0NvbmZpZ1wiO1xyXG5pbXBvcnQgeyBTcGlyaXRBdHRyaWJ1dGVNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL1BldC9EYXRhL1NwaXJpdEF0dHJpYnV0ZVwiO1xyXG5pbXBvcnQgRmlyZVBldCBmcm9tIFwiLi4vLi4vUGV0L0dhbWUvRmlyZVBldFwiO1xyXG5pbXBvcnQgeyBIZXJvQmFzZUluZm9NYW5hZ2VyIH0gZnJvbSBcIi4uL0RhdGEvSGVyb0Jhc2VJbmZvXCI7XHJcbmltcG9ydCBJY2VQZXQgZnJvbSBcIi4uLy4uL1BldC9HYW1lL0ljZVBldFwiO1xyXG5pbXBvcnQgV2luZFBldCBmcm9tIFwiLi4vLi4vUGV0L0dhbWUvV2luZFBldFwiO1xyXG5pbXBvcnQgUmF5UGV0IGZyb20gXCIuLi8uLi9QZXQvR2FtZS9SYXlQZXRcIjtcclxuaW1wb3J0IE1vbnN0ZXIgZnJvbSBcIi4uLy4uL01vbnN0ZXIvTW9uc3RlclwiO1xyXG5pbXBvcnQgeyBpbnN0YW5jZSB9IGZyb20gXCIuLi8uLi9HYW1lL1RvdWNoUGxhbmUvVG91Y2hQbGFuZVwiO1xyXG5cclxuXHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGVybyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICAvKirmiYDmnInnmoToi7Hpm4Tlj4rlhbbmiYDpnIDotYTmupDmmK/lkKbliqDovb3lrozmr5UgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgbWF4X2xvYWRfbnVtOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIHN0YXRpYyBjdXJfbG9hZGVkX251bTogbnVtYmVyID0gMDtcclxuICAgIC8qKuaJgOmcgOeahOWKqOeUu+WKoOi9veaYr+WQpm9rICovXHJcbiAgICBpc19sb2FkX29rOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBjdXJfbG9hZF9udW06IG51bWJlciA9IDA7XHJcbiAgICBuZWVkX2xvYWRfbnVtOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIGlzX0xvYWRMb2FkOmJvb2xlYW49ZmFsc2U7Ly/lvILmraXliqDovb3otYTmupDplIFcclxuXHJcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5FbnVtKEhlcm9fVHlwZSkgfSlcclxuICAgIGhlcm9fdHlwZTogSGVyb19UeXBlID0gSGVyb19UeXBlLkNoYW5nTWFvU2hvdTtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgcHJlZmFiX3NraWxsX3RpcDogY2MuUHJlZmFiID0gbnVsbDtcclxuXHJcbiAgICAvL+mqqOmqvOWKqOeUu1xyXG4gICAgc3BpbmU6IHNwLlNrZWxldG9uID0gbnVsbDtcclxuICAgIC8qKuW9k+WJjeiLsembhOeahOmdouWQkSAqL1xyXG4gICAgY3VyX2Zhbmd4aWFuZzogR29uZ0ppX0ZhbmdYaWFuZyA9IEdvbmdKaV9GYW5nWGlhbmcuenVvO1xyXG4gICAgLyoq6Iux6ZuE55qE54q25oCBICovXHJcbiAgICBoZXJvX3N0YXRlOiBIZXJvX1N0YXRlID0gSGVyb19TdGF0ZS5pZGxlO1xyXG4gICAgLy/mlLvlh7vorqHmlbBcclxuICAgIGdvbmdqaV9qaXNodTogbnVtYmVyID0gMTtcclxuICAgIC8qKuaYr+WQpuWPr+S7peaUu+WHuyAqL1xyXG4gICAgaXNfY2FuX2dvbmdqaTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgLyoq5piv5ZCm5Y+v5Lul5pS75Ye76K6h5pWwICovXHJcbiAgICBpc19jYW5famlzaHU6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgLy/mnIDlpKfnmoTmlLvlh7vmrKHmlbBcclxuICAgIG1heF9nb25namlfbnVtID0gMTtcclxuICAgIC8v5oqA6IO95Ymp5L2Z55qE5Ya35Y205pe26Ze0XHJcbiAgICBza2lsbF9jZF90aW1lOiBudW1iZXIgPSAwO1xyXG4gICAgLyoq5Li75Yqo5oqA6IO95oqA6IO95pyA5aSn5Ya35Y20Ki9cclxuICAgIHNraWxsX3RvdGFsX3RpbWU6IG51bWJlciA9IDU7XHJcbiAgICAvKirmlr3ms5Xot53nprsgKi9cclxuICAgIGNhc3RpbmdfZGlzdGFuY2U6IG51bWJlciA9IDEwMDA7XHJcbiAgICAvKirlrZDlvLnpgJ/luqYgKi9cclxuICAgIGJ1bGxldF9zcGVlZDogbnVtYmVyID0gMTAwMDtcclxuICAgIC8v5raI6ICX55qETVDlgLxcclxuICAgIGNvc3RfbXA6IG51bWJlciA9IDIwO1xyXG4gICAgLy/oi7Hpm4TkvY3nva5cclxuICAgIHBvc0luZGV4Om51bWJlcj0tMTtcclxuICAgIG1wX3Byb2dyZXNzOiBNcFByb2dyZXNzID0gbnVsbDtcclxuICAgIC8qKuiLsembhOW9k+WJjeaLpeacieeahGJ1ZmYgKi9cclxuICAgIHByb3RlY3RlZCBoZXJvX2J1ZmY6IE1hcDxCdWZmSWQsIEJ1ZmZUaW1lcj4gPSBudWxsO1xyXG4gICAgLyoq6Iux6ZuE5b2T5YmN5oul5pyJ55qEZGVidWZmICovXHJcbiAgICBwcm90ZWN0ZWQgaGVyb19kZWJ1ZmY6IE1hcDxCdWZmSWQsIEJ1ZmZUaW1lcj4gPSBudWxsO1xyXG4gICAgLyoq5peg5bC9YnVmZiAqL1xyXG4gICAgcHJvdGVjdGVkIG1hcF9lbmRsZXNzX2J1ZmY6IE1hcDxudW1iZXIsIEVuZGxlc3NCdWZmPiA9IG51bGw7XHJcbiAgICAvKirnnKnmmZXkvY3nva4gKi9cclxuICAgIHh1YW55dW5fcG9zOiBjYy5WZWMyID0gbnVsbDtcclxuICAgIC8qKuWtkOW8ueeUn+aIkOeahOS9jee9riAqL1xyXG4gICAgYnVsbGV0X3BvczogY2MuVmVjMltdID0gW107XHJcbiAgICAvL+iLsembhOeahOaVsOaNrlxyXG4gICAgaGVyb19kYXRhOiBIZXJvRGF0YSA9IG51bGw7XHJcbiAgICBpc19zaG93X21wX2hpbnQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICAvKirlvZPliY3nmoTpn6fmgKcgKi9cclxuICAgIHByb3RlY3RlZCBjdXJfdG91Z2huZXNzOiBudW1iZXIgPSAwO1xyXG4gICAgemhpc2hpcWlfdHlwZTogU2tpbGxJbmRpY2F0b3JUeXBlID0gU2tpbGxJbmRpY2F0b3JUeXBlLmJlZWxpbmU7XHJcbiAgICAvKirmioDog73ph4rmlL7lm57osIMgKi9cclxuICAgIHNraWxsX2NhbGxiYWNrOiBGdW5jdGlvbiA9IG51bGw7XHJcbiAgICAvKirmlLvlh7vph4rmlL7lm57osIMgKi9cclxuICAgIGF0dGFja19jYWxsYmFjazogRnVuY3Rpb24gPSBudWxsO1xyXG4gICAgLyoq55yp5pmV5Zue6LCDICovO1xyXG4gICAgeHVhbnl1bl9jYWxsYmFjazogRnVuY3Rpb24gPSBudWxsO1xyXG4gICAgLyoq5ZG95Lit5Zue6LCDICovXHJcbiAgICBoaXRfY2FsbGJhY2s6IEZ1bmN0aW9uID0gbnVsbDtcclxuICAgIC8qKumHjee9ruWbnuiwgyAqL1xyXG4gICAgcmVzZXRfY2FsbGJhY2s6IEZ1bmN0aW9uID0gbnVsbDtcclxuICAgIC8qKuiDnOWIqeWbnuiwgyAqL1xyXG4gICAgd2luX2NhbGxiYWNrOiBGdW5jdGlvbiA9IG51bGw7XHJcbiAgICAvKirliqDovb3lrozmr5Xlm57osIPlm57osIMgKi9cclxuICAgIGxvYWRlZF9jYWxsYmFjazogRnVuY3Rpb24gPSBudWxsO1xyXG4gICAgLyoq5a6g54mpICovXHJcbiAgICBwZXQ6IFBldCA9IG51bGw7XHJcbiAgICAvKirlrqDnianmioDog73nmoTkuIDkupvooqvliqggKi9cclxuICAgIC8qKuatpOasoeS8pOWus+W/heWumuaatOWHuyAqL1xyXG4gICAgbXVzdF9jcml0OiBudW1iZXIgPSAwO1xyXG4gICAgLyoq5a6g54mpMjHlj6/ku6Xop6blj5Hlop7kvKTmrKHmlbAgKi9cclxuICAgIGNyaXRfaW5jcmVhc2VfY2RfM19udW06IG51bWJlciA9IDA7XHJcblxyXG4gICAgc2V0dXBfc2NhbGU6IG51bWJlciA9IDAuNTA7XHJcbiAgICBiYXNlX2F0dF9qaWFuZ2U6IG51bWJlciA9IDA7XHJcblxyXG4gICAgLyoqYnVmZueKtuaAgSAqL1xyXG4gICAgbWFwX2J1ZmZfc3RhdGU6IE1hcDxudW1iZXIsIEJ1ZmZTdGF0ZT4gPSBudWxsO1xyXG4gICAgLyoqZGVidWZm54q25oCBICovXHJcbiAgICBtYXBfZGVidWZmX3N0YXRlOiBNYXA8bnVtYmVyLCBCdWZmU3RhdGU+ID0gbnVsbDtcclxuICAgIC8qKuaYr+WQpumcgOimgeajgOafpeaKgOiDvemHiuaUvui3neemuyAqL1xyXG4gICAgaXNfbmVlZF9jaGVja19kaXN0YW5jZTogYm9vbGVhbiA9IHRydWU7XHJcbiAgICAvKirmjIfnpLrlmajnsbvlnosgKi9cclxuICAgIHByb3RlY3RlZCBza2lsbF90aXBfdHlwZTogU2tpbGxUaXBUeXBlID0gU2tpbGxUaXBUeXBlLkZ1bGw7XHJcbiAgICAvKirmmK/lkKblj6/ku6XlpITnkIbop6bmkbjkuovku7bvvIzlvZPmioDog71DROWujOavleWIh+aMieS4i+S6huiLsembhOaXtuS4unRydWUgKi9cclxuICAgIHByaXZhdGUgaXNfY2FuX3RvdWNoOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIHNraWxsX3RpcDogU2tpbGxUaXAgPSBudWxsO1xyXG4gICAgLyoq5piv5ZCm6Kem5Y+R6Ieq5Yqo6YeK5pS+6YC76L6RICovXHJcbiAgICBwcml2YXRlIGlzX2F1dG9fcmVsZWFzZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSB0b3VjaF9yZWN0OiBjYy5SZWN0ID0gbnVsbDtcclxuICAgIC8qKuaAu+WFseS9v+eUqOaKgOiDveeahOasoeaVsCAqL1xyXG4gICAgcHJvdGVjdGVkIHVzZV9za2lsbF9udW06IG51bWJlciA9IDA7XHJcbiAgICBwcm90ZWN0ZWQgbm9kZV9zaGFkb3c6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgLyoq54K55Ye75Ymp5L2ZICovXHJcbiAgICBwcm90ZWN0ZWQgY2xpY2tfcmVtYWluOiBudW1iZXIgPSAwO1xyXG4gICAgLyoq5pS76YCf6K6w5b2V5YC877yM5LiN5L2c5Yik5patICovXHJcbiAgICBnb25namlfc3VkdTogbnVtYmVyID0gMDtcclxuICAgIC8qKuaKgOiDvemYn+WIlyAqL1xyXG4gICAgc2tpbGxfcXVldWU6IFNraWxsVHlwZVtdID0gW107XHJcbiAgICAvKirmmK/lkKbov57nu63mlLvlh7sgKi9cclxuICAgIGlzX2RvdWJsZV9hdHRhY2s6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIC8qKuWxgue6pyovXHJcbiAgICBwdWJsaWMgdl9JbmRleDogbnVtYmVyID0gMDtcclxuXHJcbiAgICBwb3M6IGNjLlZlYzI7XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tTE9BRC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgcHJvdGVjdGVkIG9uTG9hZCgpIHtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFsbF9oZXJvLnNldCh0aGlzLmhlcm9fdHlwZSwgdGhpcyk7XHJcbiAgIFxyXG4gICAgICAgIHRoaXMuc3BpbmUgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcclxuICAgICAgICAvL3RoaXMuc2V0U2tpbigpO1xyXG4gICAgICAgIHRoaXMudG91Y2hMaXN0ZW4oKTtcclxuICAgICAgICB0aGlzLmluaXRQb3MoKTtcclxuICAgICAgICAvLyBpZih0aGlzLmhlcm9fdHlwZT09SGVyb19UeXBlLkRlTHVZaSl7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuc2V0dXBfc2NhbGU9MC4yMjtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gaWYodGhpcy5oZXJvX3R5cGU9PUhlcm9fVHlwZS5MZWlTaGVufHx0aGlzLmhlcm9fdHlwZT09SGVyb19UeXBlLlNob3VXYW5nKXtcclxuICAgICAgICAvLyAgICAgdGhpcy5zZXR1cF9zY2FsZT0xO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICB0aGlzLm5vZGUuc2NhbGUgPSB0aGlzLnNldHVwX3NjYWxlO1xyXG4gICAgICAgIHRoaXMubm9kZS5zY2FsZVggPSAtdGhpcy5zZXR1cF9zY2FsZTtcclxuICAgICAgICB0aGlzLmFkZExvYWRCeUdhbWVFZmZlY3RJZChHYW1lRWZmZWN0SWQuaGVyb19za2lsbF9jb21tb24sIDIpO1xyXG4gICAgICAgIHRoaXMuYWRkTG9hZEJ5R2FtZUVmZmVjdElkKEdhbWVFZmZlY3RJZC5za2lsbF9kYW1hZ2VfcmVjb3JkLCAyKTtcclxuICAgICAgICB0aGlzLm5vZGUuekluZGV4ID0gMTtcclxuICAgICAgICB0aGlzLm1hcF9idWZmX3N0YXRlID0gbmV3IE1hcDxudW1iZXIsIEJ1ZmZTdGF0ZT4oKTtcclxuICAgICAgICB0aGlzLm1hcF9kZWJ1ZmZfc3RhdGUgPSBuZXcgTWFwPG51bWJlciwgQnVmZlN0YXRlPigpO1xyXG4gICAgICAgIHRoaXMuaGVyb19idWZmID0gbmV3IE1hcDxCdWZmSWQsIEJ1ZmZUaW1lcj4oKTtcclxuICAgICAgICB0aGlzLmhlcm9fZGVidWZmID0gbmV3IE1hcDxCdWZmSWQsIEJ1ZmZUaW1lcj4oKTtcclxuICAgICAgICB0aGlzLm1hcF9lbmRsZXNzX2J1ZmYgPSBuZXcgTWFwPEJ1ZmZJZCwgRW5kbGVzc0J1ZmY+KCk7XHJcbiAgICAgICAgdGhpcy5hZGRTa2lsbFRpcFR5cGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgc3RhcnQoKSB7XHJcbiAgICAgICAgLy/liqDovb3mlbDmja5cclxuICAgICAgICB0aGlzLmhlcm9fZGF0YSA9IEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2FtZV9oZXJvX2RhdGEuZ2V0KHRoaXMuaGVyb190eXBlKTtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlZnJlc2hNYWluV2FsbERhdGFCeWFkZEhlcm8oKVxyXG4gICAgICAgIHRoaXMuYnVsbGV0X3NwZWVkID0gSGVyb0Jhc2VJbmZvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEJhc2VCdWxsZXRTcGVlZCh0aGlzLmhlcm9fdHlwZSk7XHJcbiAgICAgICAgdGhpcy5nb25namlfamlzaHUgPSB0aGlzLmhlcm9fZGF0YS5nb25namlfamlhbmdlO1xyXG4gICAgICAgIHRoaXMuZ29uZ2ppX3N1ZHUgPSB0aGlzLmdldEF0dGFja1NwZWVkKCk7XHJcbiAgICAgICAgdGhpcy5zZXRIZXJvU3RhdGUoSGVyb19TdGF0ZS5pZGxlLCBHb25nSmlfRmFuZ1hpYW5nLnpob25nKTtcclxuICAgICAgICAvL3RoaXMucGxheVNwaW5lQW5pbWF0b24oSGVyb19TdGF0ZV9OYW1lLklkbGUsdHJ1ZSxudWxsLG51bGwpO1xyXG4gICAgICAgIC8v5Yqg6L29bXDov5vluqbmnaFcclxuICAgICAgICB0aGlzLmxvYWRNcFByb2dyZXNzKCk7XHJcbiAgICAgICAgdGhpcy5sb2FkUGV0KCk7XHJcbiAgICAgICAgbGV0IHNlbGZTaGFkb3cgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ01vbnN0ZXJfU2hhZG93Jyk7XHJcbiAgICAgICAgdGhpcy5wb3MgPSBzZWxmU2hhZG93LmdldFBvc2l0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5ub2RlX3NoYWRvdyA9IGNjLmluc3RhbnRpYXRlKHNlbGZTaGFkb3cpO1xyXG4gICAgICAgIHRoaXMubm9kZV9zaGFkb3cucGFyZW50ID0gY2MuZmluZCgnQ2FudmFzL0hlcm9fU2hhZG93X1Jvb3QnKTtcclxuICAgICAgICB0aGlzLm5vZGVfc2hhZG93LnNjYWxlID0gdGhpcy5zZXR1cF9zY2FsZTtcclxuICAgICAgICB0aGlzLm5vZGVfc2hhZG93LnNldFBvc2l0aW9uKGNjLnYyKHRoaXMubm9kZS54ICsgdGhpcy5wb3MueCAqIHRoaXMuc2V0dXBfc2NhbGUsIHRoaXMubm9kZS55ICsgdGhpcy5wb3MueSAqIHRoaXMuc2V0dXBfc2NhbGUpKTtcclxuICAgICAgICBzZWxmU2hhZG93LnJlbW92ZUZyb21QYXJlbnQoKTtcclxuICAgICAgICBpZiAodGhpcy5nZXRIZXJvU3RhdGUoKSA9PSBIZXJvX1N0YXRlLmV4aXQpIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlX3NoYWRvdy5vcGFjaXR5ID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gdGhpcy5ub2RlLnpJbmRleCA9IDI7XHJcbiAgICAgICAgdGhpcy5jYXN0aW5nX2Rpc3RhbmNlID0gdGhpcy5oZXJvX2RhdGEuZ29uZ2ppX2ZhbndlaTtcclxuICAgICAgICBpZiAoY2Mud2luU2l6ZS5oZWlnaHQgLyBjYy53aW5TaXplLndpZHRoID4gMikge1xyXG4gICAgICAgICAgICB0aGlzLmNhc3RpbmdfZGlzdGFuY2UgPSB0aGlzLmhlcm9fZGF0YS5nb25namlfZmFud2VpICsgMjAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBpZih0aGlzLmhlcm9fdHlwZT09SGVyb19UeXBlLk52V3Upe1xyXG4gICAgICAgIC8vICAgICB0aGlzLmNhc3RpbmdfZGlzdGFuY2U9MTkyKjMrR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5lbmVteV9hdHRfeS10aGlzLm5vZGUueVxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICB0aGlzLnNldFRvdWNoUmVjdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRGVzdHJveSgpIHtcclxuICAgICAgICAvL+WPlua2iOebkeWQrOinpuaRuOS6i+S7tlxyXG4gICAgICAgIGxldCB0b3VjaE5vZGUgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3RvdWNoTm9kZScpO1xyXG4gICAgICAgIGlmICh0b3VjaE5vZGUpIHtcclxuICAgICAgICAgICAgLy8gdG91Y2hOb2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCx0aGlzLm9uVG91Y2hTdGFydCx0aGlzKTtcclxuICAgICAgICAgICAgLy8gdG91Y2hOb2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9NT1ZFLHRoaXMub25Ub3VjaE1vdmUsdGhpcyk7XHJcbiAgICAgICAgICAgIC8vIHRvdWNoTm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELHRoaXMub25Ub3VjaEVuZCx0aGlzKTtcclxuICAgICAgICAgICAgLy8gdG91Y2hOb2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9DQU5DRUwsdGhpcy5vblRvdWNoQ2FuY2VsLHRoaXMpO1xyXG4gICAgICAgICAgICAvLyBpbnN0YW5jZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIHRoaXMub25Ub3VjaFN0YXJ0QnlKb3ksIHRoaXMpO1xyXG4gICAgICAgICAgICAvLyBpbnN0YW5jZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfTU9WRSwgdGhpcy5vblRvdWNoTW92ZUJ5Sm95LCB0aGlzKTtcclxuICAgICAgICAgICAgaW5zdGFuY2Uub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vblRvdWNoRW5kQnlKb3ksIHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFsbF9oZXJvLmRlbGV0ZSh0aGlzLmhlcm9fdHlwZSlcclxuICAgIH1cclxuXHJcbiAgICBhZGRTa2lsbFRpcFR5cGUoKSB7XHJcbiAgICAgICAgbGV0IG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnByZWZhYl9za2lsbF90aXApO1xyXG4gICAgICAgIHRoaXMuc2tpbGxfdGlwID0gbm9kZS5nZXRDb21wb25lbnQoU2tpbGxUaXApO1xyXG4gICAgICAgIHRoaXMuc2tpbGxfdGlwX3R5cGUgPSB0aGlzLnNraWxsX3RpcC5nZXRTa2lsbFRpcFR5cGUoKTtcclxuICAgICAgICB0aGlzLnNraWxsX3RpcC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5za2lsbF90aXBfdHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIFNraWxsVGlwVHlwZS5GdWxsOiB7XHJcbiAgICAgICAgICAgICAgICBTa2lsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFNraWxsVGlwVHlwZS5DaXJjbGU6IHtcclxuICAgICAgICAgICAgICAgIFNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgU2tpbGxUaXBUeXBlLlJlY3Q6IHtcclxuICAgICAgICAgICAgICAgIFNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgU2tpbGxUaXBUeXBlLkRpcjoge1xyXG4gICAgICAgICAgICAgICAgU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VG91Y2hSZWN0KCkge1xyXG4gICAgICAgIGxldCB0b3VjaE5vZGUgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3RvdWNoTm9kZScpO1xyXG4gICAgICAgIHRoaXMudG91Y2hfcmVjdCA9IGNjLnJlY3QodGhpcy5ub2RlLnggKyB0b3VjaE5vZGUueCAqIHRoaXMuc2V0dXBfc2NhbGUgLSAodG91Y2hOb2RlLndpZHRoICogdGhpcy5zZXR1cF9zY2FsZSAvIDIpLCB0aGlzLm5vZGUueSArIHRvdWNoTm9kZS55ICogdGhpcy5zZXR1cF9zY2FsZSAtICh0b3VjaE5vZGUuaGVpZ2h0ICogdGhpcy5zZXR1cF9zY2FsZSAvIDIpLCB0b3VjaE5vZGUud2lkdGggKiB0aGlzLnNldHVwX3NjYWxlLCB0b3VjaE5vZGUuaGVpZ2h0ICogdGhpcy5zZXR1cF9zY2FsZSk7XHJcbiAgICAgICAgLy8gbGV0IGdnPWNjLmZpbmQoJ0NhbnZhcy9GaWdodGluZ19Sb290JykuZ2V0Q29tcG9uZW50KGNjLkdyYXBoaWNzKTtcclxuICAgICAgICAvLyBnZy5yZWN0KHRoaXMudG91Y2hfcmVjdC54LHRoaXMudG91Y2hfcmVjdC55LHRoaXMudG91Y2hfcmVjdC53aWR0aCx0aGlzLnRvdWNoX3JlY3QuaGVpZ2h0KTtcclxuICAgICAgICAvLyBnZy5zdHJva2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRTa2lsbFRpcFNpemUod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnNraWxsX3RpcC5ub2RlLndpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgdGhpcy5za2lsbF90aXAubm9kZS5oZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U2tpbGxUaXBTaXplKCk6IGNjLlNpemUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNraWxsX3RpcC5ub2RlLmdldENvbnRlbnRTaXplKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0b3VjaExpc3RlbigpIHtcclxuICAgICAgICAvL+ebkeWQrOinpuaRuOS6i+S7tlxyXG4gICAgICAgIGxldCB0b3VjaE5vZGUgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3RvdWNoTm9kZScpO1xyXG4gICAgICAgIGlmICh0b3VjaE5vZGUpIHtcclxuICAgICAgICAgICAgLy8gdG91Y2hOb2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULHRoaXMub25Ub3VjaFN0YXJ0LHRoaXMpO1xyXG4gICAgICAgICAgICAvLyB0b3VjaE5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfTU9WRSx0aGlzLm9uVG91Y2hNb3ZlLHRoaXMpO1xyXG4gICAgICAgICAgICAvLyB0b3VjaE5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELHRoaXMub25Ub3VjaEVuZCx0aGlzKTtcclxuICAgICAgICAgICAgLy8gdG91Y2hOb2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0NBTkNFTCx0aGlzLm9uVG91Y2hDYW5jZWwsdGhpcyk7XHJcbiAgICAgICAgICAgIC8vIGluc3RhbmNlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCB0aGlzLm9uVG91Y2hTdGFydEJ5Sm95LCB0aGlzKTtcclxuICAgICAgICAgICAgLy8gaW5zdGFuY2Uub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfTU9WRSwgdGhpcy5vblRvdWNoTW92ZUJ5Sm95LCB0aGlzKTtcclxuICAgICAgICAgICAgaW5zdGFuY2Uub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uVG91Y2hFbmRCeUpveSwgdGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdFBvcygpIHtcclxuICAgICAgICBsZXQgeHVhbnl1biA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgneHVhbnl1bicpO1xyXG4gICAgICAgIHRoaXMueHVhbnl1bl9wb3MgPSB4dWFueXVuLmdldFBvc2l0aW9uKCk7XHJcbiAgICAgICAgeHVhbnl1bi5yZW1vdmVGcm9tUGFyZW50KCk7XHJcbiAgICAgICAgdGhpcy5idWxsZXRfcG9zID0gbmV3IEFycmF5KCk7XHJcbiAgICAgICAgbGV0IGJ1bGxldDEgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2J1bGxldDEnKTtcclxuICAgICAgICBsZXQgYnVsbGV0MiA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnYnVsbGV0MicpO1xyXG4gICAgICAgIHRoaXMuYnVsbGV0X3Bvcy5wdXNoKGJ1bGxldDIuZ2V0UG9zaXRpb24oKSk7XHJcbiAgICAgICAgdGhpcy5idWxsZXRfcG9zLnB1c2goYnVsbGV0MS5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICB0aGlzLmJ1bGxldF9wb3MucHVzaChidWxsZXQyLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgIGJ1bGxldDEucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgICAgIGJ1bGxldDIucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uR2FtZVdpbigpIHtcclxuICAgICAgICB0aGlzLnNraWxsX3F1ZXVlID0gbmV3IEFycmF5KCk7XHJcbiAgICAgICAgdGhpcy5zZXRIZXJvU3RhdGUoSGVyb19TdGF0ZS5pZGxlLCBHb25nSmlfRmFuZ1hpYW5nLnpob25nKTtcclxuICAgICAgICB0aGlzLmdvbmdqaV9qaXNodSA9IDA7XHJcbiAgICAgICAgaWYgKHRoaXMud2luX2NhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMud2luX2NhbGxiYWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBhZGRTa2lsbExpc3RlbihjYWxsQmFjazogRnVuY3Rpb24pIHtcclxuICAgICAgICB0aGlzLnNraWxsX2NhbGxiYWNrID0gY2FsbEJhY2s7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGFkZEF0dGFja0xpc3RlbihjYWxsQmFjazogRnVuY3Rpb24pIHtcclxuICAgICAgICB0aGlzLmF0dGFja19jYWxsYmFjayA9IGNhbGxCYWNrO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBhZGRIaXRMaXN0ZW4oY2FsbEJhY2s6IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5oaXRfY2FsbGJhY2sgPSBjYWxsQmFjaztcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgYWRkUmVzZXRMaXN0ZW4oY2FsbEJhY2s6IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5yZXNldF9jYWxsYmFjayA9IGNhbGxCYWNrO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBhZGRHYW1lV2luTGlzdGVuKGNhbGxCYWNrOiBGdW5jdGlvbikge1xyXG4gICAgICAgIHRoaXMud2luX2NhbGxiYWNrID0gY2FsbEJhY2s7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGFkZExvYWRlZExpc3RlbihjYWxsQmFjazogRnVuY3Rpb24pIHtcclxuICAgICAgICB0aGlzLmxvYWRlZF9jYWxsYmFjayA9IGNhbGxCYWNrO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbG9hZE1wUHJvZ3Jlc3MoKSB7XHJcbiAgICAgICAgLy8gY2MucmVzb3VyY2VzLmxvYWQoJ2hlcm9zL3NraWxsX2ljb24nLGNjLlByZWZhYiwoZXJyb3I6IEVycm9yLCBhc3NldHM6Y2MuUHJlZmFiKT0+e1xyXG4gICAgICAgIC8vICAgICBpZihlcnJvcilcclxuICAgICAgICAvLyAgICAge1xyXG4gICAgICAgIC8vICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgIC8vICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gICAgIGxldCBtcE5vZGU9Y2MuaW5zdGFudGlhdGUoYXNzZXRzKTtcclxuICAgICAgICAvLyAgICAgbXBOb2RlLnBhcmVudD1jYy5maW5kKCdDYW52YXMvRmlnaHRpbmdfVWknKTtcclxuICAgICAgICAvLyAgICAgbXBOb2RlLnNldFBvc2l0aW9uKGNjLnYyKHRoaXMubm9kZS54LHRoaXMubm9kZS55KzE1KSk7XHJcbiAgICAgICAgLy8gICAgIHRoaXMubXBfcHJvZ3Jlc3M9bXBOb2RlLmdldENvbXBvbmVudChNcFByb2dyZXNzKTtcclxuICAgICAgICAvLyAgICAgdGhpcy5tcF9wcm9ncmVzcy5pbml0KHRoaXMuaGVyb190eXBlKTtcclxuICAgICAgICAvLyAgICAgdGhpcy5jaGFuZ2VDRCh0aGlzLmhlcm9fZGF0YS5nZXRTa2lsbENvbGREb3duKFNraWxsVHlwZS5BY3RpdmUpLzMpO1xyXG4gICAgICAgIC8vICAgICB0aGlzLnNraWxsX3RvdGFsX3RpbWU9dGhpcy5oZXJvX2RhdGEuZ2V0U2tpbGxDb2xkRG93bihTa2lsbFR5cGUuQWN0aXZlKTtcclxuICAgICAgICAvLyAgICAgaWYodGhpcy5nZXRIZXJvU3RhdGUoKT09SGVyb19TdGF0ZS5leGl0KXtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMubXBfcHJvZ3Jlc3MuaGlkZSgpO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGxvYWRaaGlTaGlRaSh6aGlzaGlxaTogc3RyaW5nLCB0eXBlOiBTa2lsbEluZGljYXRvclR5cGUpIHtcclxuICAgICAgICB0aGlzLnpoaXNoaXFpX3R5cGUgPSB0eXBlO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi5Yqg6L29aGVyb1wiICsgemhpc2hpcWkpO1xyXG5cclxuICAgICAgICBjYy5yZXNvdXJjZXMubG9hZCgnaGVyb3MvJyArIHpoaXNoaXFpLCBjYy5QcmVmYWIsIChlcnJvcjogRXJyb3IsIGFzc2V0czogY2MuUHJlZmFiKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkTG9hZEJ5R2FtZUVmZmVjdElkKGlkOiBHYW1lRWZmZWN0SWQsIGluaXRDb3VudDogbnVtYmVyKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5uZWVkX2xvYWRfbnVtKys7XHJcbiAgICAgICBcclxuICAgICAgICBpZiAoR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRWZmZWN0UG9vbEJ5SWQoaWQsIGluaXRDb3VudCwgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmN1cl9sb2FkX251bSsrO1xyXG4gICAgICAgICBcclxuICAgICAgICAgICAgaWYgKHRoaXMuY3VyX2xvYWRfbnVtID49IHRoaXMubmVlZF9sb2FkX251bSYmdGhpcy5pc19Mb2FkTG9hZD09dHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNfbG9hZF9vayA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNfbG9hZF9vayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgSGVyby5jdXJfbG9hZGVkX251bSsrO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmxvYWRlZF9jYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRlZF9jYWxsYmFjaygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pID09IHRydWUpIHtcclxuICAgICAgICAgICBcclxuICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKuWKoOi9veWuoOeJqSAqL1xyXG4gICAgbG9hZFBldCgpIHtcclxuICAgICAgICBpZiAodGhpcy5oZXJvX2RhdGEucGV0X2lkID4gMCkge1xyXG4gICAgICAgICAgICBsZXQgdHlwZSA9IFNwaXJpdEF0dHJpYnV0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTcGlyaXRUeXBlKHRoaXMuaGVyb19kYXRhLnBldF9pZCk7XHJcbiAgICAgICAgICAgIHRoaXMubmVlZF9sb2FkX251bSsrO1xyXG4gICAgICAgICAgICBjYy5yZXNvdXJjZXMubG9hZCgncGV0L3BldCcgKyB0eXBlLCBjYy5QcmVmYWIsIChlcnJvcjogRXJyb3IsIGFzc2V0czogY2MuUHJlZmFiKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGUgPSBjYy5pbnN0YW50aWF0ZShhc3NldHMpO1xyXG4gICAgICAgICAgICAgICAgY2MuZmluZCgnQ2FudmFzL1BldF9Sb290JykuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wZXQgPSBub2RlLmFkZENvbXBvbmVudChJY2VQZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH07IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBldCA9IG5vZGUuYWRkQ29tcG9uZW50KEZpcmVQZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH07IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBldCA9IG5vZGUuYWRkQ29tcG9uZW50KFdpbmRQZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH07IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBldCA9IG5vZGUuYWRkQ29tcG9uZW50KFJheVBldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfTsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBldC5pbml0KHRoaXMuaGVyb19kYXRhLnBldF9pZCwgdGhpcy5oZXJvX3R5cGUsIGNjLnYyKHRoaXMubm9kZS54IC0gNjQsIHRoaXMubm9kZS55ICsgNjQpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGV0LnNldEhlcm9EYXRhKHRoaXMuaGVyb19kYXRhKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VyX2xvYWRfbnVtKys7XHJcbiAgICAgICAgICAgICAgICBub2RlLnpJbmRleCA9IDEwMDAgLSBub2RlLnk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jdXJfbG9hZF9udW0gPj0gdGhpcy5uZWVkX2xvYWRfbnVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc19sb2FkX29rID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBIZXJvLmN1cl9sb2FkZWRfbnVtKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKirpmpDol4/oi7Hpm4TvvIzmraTml7boi7Hpm4TkuI3og73mlLvlh7vmiJbogIXph4rmlL7mioDog70gKi9cclxuICAgIGhpZGVIZXJvKCkge1xyXG4gICAgICAgIHRoaXMuaGVyb19zdGF0ZSA9IEhlcm9fU3RhdGUuZXhpdDtcclxuICAgICAgICB0aGlzLm5vZGUub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgaWYgKHRoaXMubm9kZV9zaGFkb3cpIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlX3NoYWRvdy5vcGFjaXR5ID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMubXBfcHJvZ3Jlc3MpIHtcclxuICAgICAgICAgICAgdGhpcy5tcF9wcm9ncmVzcy5oaWRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNob3dIZXJvKCkge1xyXG4gICAgICAgIHRoaXMuc2V0SGVyb1N0YXRlKEhlcm9fU3RhdGUuaWRsZSwgR29uZ0ppX0ZhbmdYaWFuZy56aG9uZyk7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHkgPSAyNTU7XHJcbiAgICAgICAgdGhpcy5ub2RlX3NoYWRvdy5vcGFjaXR5ID0gMjU1O1xyXG4gICAgICAgIHRoaXMubXBfcHJvZ3Jlc3Muc2hvdygpO1xyXG4gICAgfVxyXG4gICAgcG9zWDogbnVtYmVyID0gMDsvL+WIneWni+WMluaXtuWAmeeahOS9jee9rlxyXG4gICAgdGFyZ2V0WDogbnVtYmVyID0gMDtcclxuICAgIGVhc2luZzogbnVtYmVyID0gMC4xO1xyXG4gICAgb25Ub3VjaEVuZEJ5Sm95KGV2ZW50OiBjYy5FdmVudC5FdmVudFRvdWNoLCBkYXRhKSB7XHJcbiAgICAgICAgdGhpcy50YXJnZXRYID0gKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuYW5pVHlwZSAtIDQpICogNzUgKyB0aGlzLnBvc1g7XHJcbiAgICB9XHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3jgJDnmq7ogqTjgJEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBwcm90ZWN0ZWQgc2V0U2tpbigpIHtcclxuICAgICAgICAvL2xldCBoZXJvUXVhbGl0eT1IZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9RdWFsaXR5KHRoaXMuaGVyb190eXBlKTtcclxuICAgICAgICAvL2xldCB0aWVyPUhlcm9RdWFsaXR5TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFRpZXIoaGVyb1F1YWxpdHkpO1xyXG4gICAgICAgIC8vdGhpcy5zcGluZS5zZXRTa2luKCdzdGFnZScrKEhlcm9NYW5hZ2VyLmdldFNraW5JbmRleCh0aWVyKSkpO1xyXG4gICAgfVxyXG4gICAgLyoqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t5pON5L2c55u45YWzLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLeinpuaRuOenu+WKqOS6i+S7ti0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIC8vIGxlYXRlck51bTogbnVtYmVyID0gMDsvL+W7tui/n+aVsOaNruaSreaUvuWKqOeUu1xyXG4gICAgLy8gbGVhdGVyU3BlZWQ6IG51bWJlciA9IDU7XHJcblxyXG4gICAgLy8gbmV3UG9zOiBjYy5WZWMyO1xyXG4gICAgLy8gcG9zWVRlbXA6IG51bWJlcjtcclxuXHJcbiAgICAvLyBzcGVlZFR5cGU6IFNwZWVkVHlwZSA9IFNwZWVkVHlwZS5TVE9QO1xyXG4gICAgLy8gbW92ZURpciA9IGNjLnYyKDAsIDEpO1xyXG4gICAgLy8gLy/mioTliKvkurrnmoTvvIzmnKzmnaXmnInkuKTnp43pgJ/luqbvvIznjrDlnKjlhYjnlKjkuIDkuKrmlbDmja5cclxuICAgIC8vIG5vcm1hbFNwZWVkID0gNjAwO1xyXG4gICAgLy8gZmFzdFNwZWVkID0gNjAwO1xyXG5cclxuICAgIC8vIHN0b3BTcGVlZCA9IDA7XHJcblxyXG4gICAgLy8gbW92ZVNwZWVkID0gMDtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgKiDnp7vliqhcclxuICAqL1xyXG4gICAgLy8gbW92ZSgpIHtcclxuICAgIC8vICAgICAvLyB0aGlzLm5vZGUuYW5nbGUgPVxyXG4gICAgLy8gICAgIC8vICAgY2MubWlzYy5yYWRpYW5zVG9EZWdyZWVzKE1hdGguYXRhbjIodGhpcy5tb3ZlRGlyLnksIHRoaXMubW92ZURpci54KSkgLSA5MDtcclxuXHJcbiAgICAvLyAgICAgLy8gaWYgKHRoaXMucmlnaWRib2R5KSB7XHJcbiAgICAvLyAgICAgLy8gICB0aGlzLl9ib2R5LmFwcGx5Rm9yY2VUb0NlbnRlcihcclxuICAgIC8vICAgICAvLyAgICAgY2MudjIodGhpcy5tb3ZlRGlyLnggKiAyMDAsIHRoaXMubW92ZURpci55ICogMjAwKSxcclxuICAgIC8vICAgICAvLyAgICAgdHJ1ZVxyXG4gICAgLy8gICAgIC8vICAgKTtcclxuICAgIC8vICAgICAvLyB9IGVsc2Uge1xyXG4gICAgLy8gICAgIC8vICAgY29uc3Qgb2xkUG9zID0gY2MudjIoKTtcclxuICAgIC8vICAgICAvLyAgIHRoaXMubm9kZS5nZXRQb3NpdGlvbihvbGRQb3MpO1xyXG4gICAgLy8gICAgIC8vICAgY29uc3QgbmV3UG9zID0gb2xkUG9zLmFkZCh0aGlzLm1vdmVEaXIubXVsKHRoaXMuX21vdmVTcGVlZCAvIDEyMCkpO1xyXG4gICAgLy8gICAgIC8vICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKG5ld1Bvcyk7XHJcbiAgICAvLyAgICAgLy8gfVxyXG5cclxuICAgIC8vICAgICBpZiAodGhpcy5zcGVlZFR5cGUgIT09IFNwZWVkVHlwZS5TVE9QKSB7XHJcbiAgICAvLyAgICAgICAgIGNvbnN0IG9sZFBvcyA9IGNjLnYyKCk7XHJcbiAgICAvLyAgICAgICAgIHRoaXMubm9kZS5nZXRQb3NpdGlvbihvbGRQb3MpO1xyXG4gICAgLy8gICAgICAgICB0aGlzLm5ld1BvcyA9IG9sZFBvcy5hZGQodGhpcy5tb3ZlRGlyLm11bCh0aGlzLm1vdmVTcGVlZCAvIDEyMCkpO1xyXG4gICAgLy8gICAgICAgICB0aGlzLm5ld1Bvcy55ID0gb2xkUG9zLnk7XHJcbiAgICAvLyAgICAgICAgIHRoaXMucG9zWVRlbXAgPSBvbGRQb3MueTtcclxuXHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gICAgIGlmICh0aGlzLmxlYXRlck51bSA9PSAwKSB7XHJcbiAgICAvLyAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkubW92ZURhdGEudW5zaGlmdCh0aGlzLm5ld1Bvcyk7XHJcblxyXG4gICAgLy8gICAgIH1cclxuXHJcblxyXG4gICAgLy8gICAgIGlmIChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLm1vdmVEYXRhW3RoaXMubGVhdGVyTnVtICogdGhpcy5sZWF0ZXJTcGVlZF0gIT0gbnVsbCkge1xyXG4gICAgLy8gICAgICAgICBjb25zdCBuZXdQb3NUZXBtID0gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5tb3ZlRGF0YVt0aGlzLmxlYXRlck51bSAqIHRoaXMubGVhdGVyU3BlZWRdO1xyXG4gICAgLy8gICAgICAgICBuZXdQb3NUZXBtLnk9dGhpcy5wb3NZVGVtcDtcclxuICAgIC8vICAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKG5ld1Bvc1RlcG0pO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vICAgICBpZihHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLm1vdmVEYXRhLmxlbmd0aD42MCl7XHJcblxyXG4gICAgLy8gICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLm1vdmVEYXRhLnNwbGljZSg2MCxHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLm1vdmVEYXRhLmxlbmd0aC02MCk7XHJcblxyXG5cclxuICAgIC8vICAgICB9XHJcblxyXG4gICAgLy8gICAgIHRoaXMubm9kZV9zaGFkb3cuc2V0UG9zaXRpb24oY2MudjIodGhpcy5ub2RlLnggKyB0aGlzLnBvcy54ICogdGhpcy5zZXR1cF9zY2FsZSwgdGhpcy5ub2RlLnkgKyB0aGlzLnBvcy55ICogdGhpcy5zZXR1cF9zY2FsZSkpO1xyXG4gICAgLy8gfVxyXG4gICAgLy8gb25Ub3VjaFN0YXJ0QnlKb3koKSB7IH1cclxuXHJcbiAgICAvLyBvblRvdWNoTW92ZUJ5Sm95KGV2ZW50OiBjYy5FdmVudC5FdmVudFRvdWNoLCBkYXRhKSB7XHJcbiAgICAvLyAgICAgdGhpcy5zcGVlZFR5cGUgPSBkYXRhLnNwZWVkVHlwZTtcclxuICAgIC8vICAgICB0aGlzLm1vdmVEaXIgPSBkYXRhLm1vdmVEaXN0YW5jZTtcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyBvblRvdWNoRW5kQnlKb3koZXZlbnQ6IGNjLkV2ZW50LkV2ZW50VG91Y2gsIGRhdGEpIHtcclxuICAgIC8vICAgICB0aGlzLnNwZWVkVHlwZSA9IGRhdGEuc3BlZWRUeXBlO1xyXG4gICAgLy8gfVxyXG4gICAgLyoqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t5pON5L2c55u45YWzLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLeinpuaRuOS6i+S7ti0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8v5pen54mI5Yqf6IO9XHJcbiAgICBvblRvdWNoU3RhcnQoZTogY2MuRXZlbnQuRXZlbnRUb3VjaCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzSGF2ZURlQnVmZihCdWZmSWQuTW9uc3Rlcl9YdWFuWXVuKSAmJiB0aGlzLmhlcm9fdHlwZSAhPSBIZXJvX1R5cGUuWmhlbkRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNfY2FuX3RvdWNoID0gZmFsc2U7XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTcwMDAyKSwgMSk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuc2tpbGxfY2RfdGltZSA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5pc19jYW5fdG91Y2ggPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2xpY2tfcmVtYWluID4gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTcwMDAxKSwgMSk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfc3RhdGUgIT0gR2FtZVN0YXRlLkdhbWVfUGxheWluZylcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXNfY2FuX3RvdWNoID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmlzX2F1dG9fcmVsZWFzZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5jbGlja19yZW1haW4gPSAxO1xyXG4gICAgICAgIFNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlbGVhc2VTa2lsbFJlc3VsdChmYWxzZSk7XHJcbiAgICAgICAgbGV0IHBvcyA9IFNreU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKGUuZ2V0TG9jYXRpb24oKSk7XHJcbiAgICAgICAgLy/lpoLmnpzlj6/ku6Xph4rmlL7vvIzmmL7npLrmjIfnpLrlmahcclxuICAgICAgICBzd2l0Y2ggKHRoaXMuc2tpbGxfdGlwX3R5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBTa2lsbFRpcFR5cGUuRnVsbDoge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5za2lsbF90aXAubm9kZS5zZXRQb3NpdGlvbihjYy52MigwLCAtY2Mud2luU2l6ZS5oZWlnaHQgLyAyKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNraWxsX3RpcC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5za2lsbF90aXAuc2V0SXNDYW5SZWxlYXNlKGZhbHNlKTtcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBTa2lsbFRpcFR5cGUuQ2lyY2xlOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNraWxsX3RpcC5ub2RlLnNldFBvc2l0aW9uKHBvcyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNraWxsX3RpcC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNraWxsX3RpcC5zZXRJc0NhblJlbGVhc2UoZmFsc2UpO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFNraWxsVGlwVHlwZS5SZWN0OiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNraWxsX3RpcC5ub2RlLnNldFBvc2l0aW9uKHBvcyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNraWxsX3RpcC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNraWxsX3RpcC5zZXRJc0NhblJlbGVhc2UoZmFsc2UpO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFNraWxsVGlwVHlwZS5EaXI6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxfdGlwLm5vZGUuc2V0UG9zaXRpb24odGhpcy5ub2RlLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5za2lsbF90aXAubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5za2lsbF90aXAuc2V0SXNDYW5SZWxlYXNlKGZhbHNlKTtcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/mmL7npLrojIPlm7TmjIfnpLrlmahcclxuICAgICAgICBTa2lsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93U2tpbGxSYW5nZSh0aGlzLm5vZGUueSwgdGhpcy5jYXN0aW5nX2Rpc3RhbmNlKTtcclxuICAgIH1cclxuXHJcbiAgICBvblRvdWNoTW92ZShlOiBjYy5FdmVudC5FdmVudFRvdWNoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNfY2FuX3RvdWNoID09IGZhbHNlIHx8IEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfc3RhdGUgIT0gR2FtZVN0YXRlLkdhbWVfUGxheWluZylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGxldCBwb3MgPSBTa3lNYW5hZ2VyLmdldEluc3RhbmNlKCkubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihlLmdldExvY2F0aW9uKCkpO1xyXG4gICAgICAgIGlmICghdGhpcy50b3VjaF9yZWN0LmNvbnRhaW5zKHBvcykpIHtcclxuICAgICAgICAgICAgdGhpcy5pc19hdXRvX3JlbGVhc2UgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLnNraWxsX3RpcF90eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgU2tpbGxUaXBUeXBlLkZ1bGw6IHtcclxuXHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgU2tpbGxUaXBUeXBlLkNpcmNsZToge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5za2lsbF90aXAubm9kZS5zZXRQb3NpdGlvbihwb3MpO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFNraWxsVGlwVHlwZS5SZWN0OiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNraWxsX3RpcC5ub2RlLnNldFBvc2l0aW9uKHBvcyk7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgU2tpbGxUaXBUeXBlLkRpcjoge1xyXG5cclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChwb3MueSA+IEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW5lbXlfYXR0X3kpIHtcclxuICAgICAgICAgICAgbGV0IGRpc3RhbmNlID0gcG9zLnkgLSB0aGlzLm5vZGUueTtcclxuICAgICAgICAgICAgaWYgKGRpc3RhbmNlIDw9IHRoaXMuY2FzdGluZ19kaXN0YW5jZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5za2lsbF90aXAuc2V0SXNDYW5SZWxlYXNlKHRydWUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5za2lsbF90aXAuc2V0SXNDYW5SZWxlYXNlKGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2tpbGxfdGlwLnNldElzQ2FuUmVsZWFzZShmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uVG91Y2hFbmQoZTogY2MuRXZlbnQuRXZlbnRUb3VjaCkge1xyXG4gICAgICAgIFNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlbGVhc2VTa2lsbFJlc3VsdCh0cnVlKTtcclxuICAgICAgICBTa2lsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5oaWRlU2tpbGxSYW5nZSgpO1xyXG4gICAgICAgIHRoaXMuc2tpbGxfdGlwLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNfY2FuX3RvdWNoID09IGZhbHNlIHx8IEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfc3RhdGUgIT0gR2FtZVN0YXRlLkdhbWVfUGxheWluZylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGxldCBwb3MgPSBTa3lNYW5hZ2VyLmdldEluc3RhbmNlKCkubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihlLmdldExvY2F0aW9uKCkpO1xyXG4gICAgICAgIC8v5Yik5pat5Z2Q5qCHXHJcbiAgICAgICAgaWYgKHBvcy55ID4gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5lbmVteV9hdHRfeSkge1xyXG4gICAgICAgICAgICBsZXQgZGlzdGFuY2UgPSBwb3MueSAtIHRoaXMubm9kZS55O1xyXG4gICAgICAgICAgICBpZiAoZGlzdGFuY2UgPD0gdGhpcy5jYXN0aW5nX2Rpc3RhbmNlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbGVhc2VTa2lsbChwb3MpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNfYXV0b19yZWxlYXNlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGFydEF1dG9SZWxlYXNlKCkgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDE0MDAyMykpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uVG91Y2hDYW5jZWwoZTogY2MuRXZlbnQuRXZlbnRUb3VjaCkge1xyXG4gICAgICAgIFNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlbGVhc2VTa2lsbFJlc3VsdCh0cnVlKTtcclxuICAgICAgICBTa2lsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5oaWRlU2tpbGxSYW5nZSgpO1xyXG4gICAgICAgIHRoaXMuc2tpbGxfdGlwLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNfY2FuX3RvdWNoID09IGZhbHNlIHx8IEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfc3RhdGUgIT0gR2FtZVN0YXRlLkdhbWVfUGxheWluZylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGxldCBwb3MgPSBTa3lNYW5hZ2VyLmdldEluc3RhbmNlKCkubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihlLmdldExvY2F0aW9uKCkpO1xyXG4gICAgICAgIGlmIChwb3MueSA+IEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW5lbXlfYXR0X3kpIHtcclxuICAgICAgICAgICAgbGV0IGRpc3RhbmNlID0gcG9zLnkgLSB0aGlzLm5vZGUueTtcclxuICAgICAgICAgICAgaWYgKGRpc3RhbmNlIDw9IHRoaXMuY2FzdGluZ19kaXN0YW5jZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWxlYXNlU2tpbGwocG9zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzX2F1dG9fcmVsZWFzZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydEF1dG9SZWxlYXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRBdXRvUmVsZWFzZSgpOiBib29sZWFuIHtcclxuICAgICAgICAvL+aJvuaAqu+8jOaJvuS4jeWIsOWwseS4jeaUvlxyXG4gICAgICAgIGxldCBlbmVteXMgPSBNb25zdGVyTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1vbnN0ZXJzRm9yTmVhcmVzdEJ5U2tpbGwoMSwgdGhpcy5ub2RlLnksIHRoaXMuY2FzdGluZ19kaXN0YW5jZSk7XHJcbiAgICAgICAgaWYgKGVuZW15cykge1xyXG4gICAgICAgICAgICAvL+acgOWJjeeahOaVjOS6ulxyXG4gICAgICAgICAgICBsZXQgZW5lbXlQb3MgPSBlbmVteXNbMF0uZ2V0Q29tcG9uZW50KE1vbnN0ZXIpLmdldENlbnRlclBvcygpO1xyXG4gICAgICAgICAgICB0aGlzLnJlbGVhc2VTa2lsbChlbmVteVBvcyk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoq6Kem5pG455qE5L2N572uICovXHJcbiAgICByZWxlYXNlU2tpbGwodG91Y2hQb3M6IGNjLlZlYzIpIHtcclxuICAgICAgICBpZiAoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zdGF0ZSAhPSBHYW1lU3RhdGUuR2FtZV9QbGF5aW5nKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy51c2Vfc2tpbGxfbnVtKys7XHJcbiAgICAgICAgLy90aGlzLm1wX3Byb2dyZXNzLnNob3dMaWdodCgpO1xyXG4gICAgICAgIGlmICh0aGlzLnNraWxsX2NhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2tpbGxfY2FsbGJhY2sodG91Y2hQb3MpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlc2V0Q0QoKTtcclxuICAgICAgICBUYXNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmVtaXRUYXNrKFRhc2tJdGVtLumHiuaUvljmrKHkurrnianmioDog70pO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBnZXRTa2lsbFJlbGVhc2VJZCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmhlcm9fdHlwZSAqIDEwMDAwICsgdGhpcy51c2Vfc2tpbGxfbnVtO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuiOt+W+l+WtkOW8ueeUn+aIkOeahOS9jee9riAqL1xyXG4gICAgZ2V0Q3JlYXRlQnVsbGV0UG9zKCk6IGNjLlZlYzIge1xyXG4gICAgICAgIGxldCBwb3MgPSB0aGlzLmJ1bGxldF9wb3NbdGhpcy5jdXJfZmFuZ3hpYW5nXTtcclxuICAgICAgICByZXR1cm4gY2MudjIodGhpcy5ub2RlLnggKyBwb3MueCAqIHRoaXMubm9kZS5zY2FsZVgsIHRoaXMubm9kZS55ICsgcG9zLnkgKiB0aGlzLm5vZGUuc2NhbGVZKTtcclxuICAgIH1cclxuICAgIC8qKuiOt+W+l+WtkOW8ueebuOWvueiLsembhOeahOS9jee9riAqL1xyXG4gICAgZ2V0SGVyb0J1bGxldFBvcygpOiBjYy5WZWMyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5idWxsZXRfcG9zW3RoaXMuY3VyX2Zhbmd4aWFuZ107XHJcbiAgICB9XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t5peg5bC9YnVmZi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8qKlxyXG4gICAgICog5re75Yqg5peg5bC9YnVmZlxyXG4gICAgICogQHBhcmFtIGVuZGxlc3NCdWZmIEVuZGxlc3NCdWZm55qE5a6e5L6LXHJcbiAgICAgKi9cclxuICAgIC8vICBBZG1pbmlzdHJhdG9yOlxyXG4gICAgLy8gIDEu5pS75Ye75YqbK3glXHJcbiAgICAvLyAgMi7mlLvpgJ8reCVcclxuICAgIC8vICAzLuaatOWHu+WAvCt4XHJcbiAgICAvLyAgNC7mmrTlh7vlop7luYUreCVcclxuICAgIC8vICA1LumYsuW+oeWKmyt4JVxyXG4gICAgLy8gIDYu5pyA5aSn55Sf5ZG95YC8K3glIFxyXG4gICAgLy8gIDcu5q+P56eS5Zue5aSN5pyA5aSn55Sf5ZG95YC8eCVcclxuICAgIC8vICA4Lueri+WNs+WbnuWkjeacgOWkp+eUn+WRveWAvHgl77yI5rOo77ya6K+lYnVmZueUn+aViOWQjueri+WNs+a2iOWkse+8iVxyXG4gICAgLy8gIDku6L+e57ut5pS75Ye7IOamgueOh3glXHJcbiAgICAvLyAgMTAu5Li75Yqo5oqA6IO95Ya35Y205pe26Ze05YeP5bCReCVcclxuICAgIC8vICAxMS7mnIDnu4jkvKTlrrPliqDmiJB4JVxyXG4gICAgYWRkRW5kbGVzc0J1ZmYoZW5kbGVzc0J1ZmY6IEVuZGxlc3NCdWZmKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzSGF2ZUVuZGxlc3NJZChlbmRsZXNzQnVmZi5pZCkpIHtcclxuICAgICAgICAgICAgdGhpcy5tYXBfZW5kbGVzc19idWZmLnNldChlbmRsZXNzQnVmZi5pZCwgZW5kbGVzc0J1ZmYpO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGVuZGxlc3NCdWZmLnR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgRW5kbGVzc0J1ZmZUeXBlLkF0dGFjazoge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVyb19kYXRhLnRvdGFsX2F0dGFjayArPSB0aGlzLmhlcm9fZGF0YS5maXhlZF9hdHRjayAqIGVuZGxlc3NCdWZmLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgRW5kbGVzc0J1ZmZUeXBlLkF0dGFja1NwZWVkOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VBdHRhY2tTcGVlZChlbmRsZXNzQnVmZi52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBFbmRsZXNzQnVmZlR5cGUuQ3JpdFJhdGU6IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlcm9fZGF0YS5Dcml0aWNhbCArPSBlbmRsZXNzQnVmZi52YWx1ZTtcclxuICAgICAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEVuZGxlc3NCdWZmVHlwZS5Dcml0RGFtYWdlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZXJvX2RhdGEuRXh0cmFDcml0aWNhbCArPSBlbmRsZXNzQnVmZi52YWx1ZTtcclxuICAgICAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEVuZGxlc3NCdWZmVHlwZS5EZWZlbnNlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZXJvX2RhdGEudG90YWxfZGVmZW5zZSArPSB0aGlzLmhlcm9fZGF0YS5maXhfZGVmZW5zZSAqIGVuZGxlc3NCdWZmLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgRW5kbGVzc0J1ZmZUeXBlLkhlYWx0aE1heDoge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVyb19kYXRhLnRvdGFsX2hwICs9IHRoaXMuaGVyb19kYXRhLmZpeGVkX2hwICogZW5kbGVzc0J1ZmYudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCLln47lopnliqDooYA6XCIsdGhpcy5oZXJvX2RhdGEudG90YWxfaHAsdGhpcy5oZXJvX2RhdGEuZml4ZWRfaHAsZW5kbGVzc0J1ZmYudmFsdWUpXHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZWZyZXNoTWFpbldhbGxEYXRhKClcclxuICAgICAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEVuZGxlc3NCdWZmVHlwZS5IZWFsdGhTZWM6IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYnVmZkRhdGEgPSBuZXcgQnVmZkRhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5idWZmX2lkID0gQnVmZklkLldhbGxfRW5kbGVzc19BZGRfaHAgKyB0aGlzLmhlcm9fdHlwZTtcclxuICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5idWZmX3R5cGUgPSBCdWZmVHlwZS5HYWluO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLmJ1ZmZfdmFsdWUgPSBbZW5kbGVzc0J1ZmYudmFsdWUgKiBXYWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1haW5XYWxsKCkuZ2V0TWF4SHAoKV07XHJcbiAgICAgICAgICAgICAgICAgICAgYnVmZkRhdGEucmVtYWluX3RpbWUgPSA2NjY2NjY2NjtcclxuICAgICAgICAgICAgICAgICAgICAvLyBidWZmRGF0YS5nYW1lX2VmZmVjdF9pZD1HYW1lRWZmZWN0SWQuY2hhbmdfbWFvX3Nob3Vfc2tpbGxfYWN0aXZlXzE7XHJcbiAgICAgICAgICAgICAgICAgICAgYnVmZkRhdGEucmVjb3ZlcnlfamlhbmdlX3RpbWUgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIFdhbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWFpbldhbGwoKS5hZGRCdWZmKGJ1ZmZEYXRhKVxyXG4gICAgICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgRW5kbGVzc0J1ZmZUeXBlLkhlYWx0aFRlYW1BZGQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBsZXQgaHA9V2FsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYWluV2FsbCgpLmdldEN1ckhwKCkrKGVuZGxlc3NCdWZmLnZhbHVlKldhbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWFpbldhbGwoKS5nZXRNYXhIcCgpKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFdhbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWFpbldhbGwoKS5jaGFuZ2VIcChocClcclxuICAgICAgICAgICAgICAgICAgICAvL+WPiuaXtueUqFxyXG4gICAgICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgRW5kbGVzc0J1ZmZUeXBlLkRvdWJsZUF0dGFjazoge1xyXG4gICAgICAgICAgICAgICAgICAgIC8v6L+e57ut5pS75Ye7LOS4jeeUqOWKoGJ1ZmZcclxuICAgICAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEVuZGxlc3NCdWZmVHlwZS5BY3RpdmVTa2lsbENkOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5za2lsbF90b3RhbF90aW1lIC09IHRoaXMuaGVyb19kYXRhLmdldFNraWxsQ29sZERvd24oU2tpbGxUeXBlLkFjdGl2ZSkgKiBlbmRsZXNzQnVmZi52YWx1ZVxyXG4gICAgICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgRW5kbGVzc0J1ZmZUeXBlLkFkZERhbWFnZToge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVyb19kYXRhLmFsbF9pbmNyZWFzZV9kYW1hZ2UgKz0gZW5kbGVzc0J1ZmYudmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDliKDpmaTml6DlsL1idWZmXHJcbiAgICAgKiBAcGFyYW0gaWQg5peg5bC9YnVmZi1pZFxyXG4gICAgICovXHJcbiAgICByZW1vdmVFbmRsZXNzQnVmZihpZDogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzSGF2ZUVuZGxlc3NJZChpZCkpIHtcclxuICAgICAgICAgICAgbGV0IGVuZGxlc3NCdWZmID0gdGhpcy5tYXBfZW5kbGVzc19idWZmLmdldChpZCk7XHJcbiAgICAgICAgICAgIHRoaXMubWFwX2VuZGxlc3NfYnVmZi5kZWxldGUoaWQpO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGVuZGxlc3NCdWZmLnR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgRW5kbGVzc0J1ZmZUeXBlLkF0dGFjazoge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVyb19kYXRhLnRvdGFsX2F0dGFjayAtPSB0aGlzLmhlcm9fZGF0YS5maXhlZF9hdHRjayAqIGVuZGxlc3NCdWZmLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgRW5kbGVzc0J1ZmZUeXBlLkF0dGFja1NwZWVkOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VBdHRhY2tTcGVlZCgtZW5kbGVzc0J1ZmYudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgRW5kbGVzc0J1ZmZUeXBlLkNyaXRSYXRlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZXJvX2RhdGEuQ3JpdGljYWwgLT0gZW5kbGVzc0J1ZmYudmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBFbmRsZXNzQnVmZlR5cGUuQ3JpdERhbWFnZToge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVyb19kYXRhLkV4dHJhQ3JpdGljYWwgLT0gZW5kbGVzc0J1ZmYudmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBFbmRsZXNzQnVmZlR5cGUuRGVmZW5zZToge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVyb19kYXRhLnRvdGFsX2RlZmVuc2UgLT0gdGhpcy5oZXJvX2RhdGEuZml4X2RlZmVuc2UgKiBlbmRsZXNzQnVmZi52YWx1ZTtcclxuICAgICAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEVuZGxlc3NCdWZmVHlwZS5IZWFsdGhNYXg6IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlcm9fZGF0YS50b3RhbF9ocCAtPSB0aGlzLmhlcm9fZGF0YS5maXhlZF9ocCAqIGVuZGxlc3NCdWZmLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgRW5kbGVzc0J1ZmZUeXBlLkhlYWx0aFNlYzoge1xyXG4gICAgICAgICAgICAgICAgICAgIFdhbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWFpbldhbGwoKS5zdWJCdWZmKEJ1ZmZJZC5XYWxsX0VuZGxlc3NfQWRkX2hwICsgdGhpcy5oZXJvX3R5cGUpXHJcbiAgICAgICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBFbmRsZXNzQnVmZlR5cGUuSGVhbHRoVGVhbUFkZDoge1xyXG5cclxuICAgICAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEVuZGxlc3NCdWZmVHlwZS5Eb3VibGVBdHRhY2s6IHtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBFbmRsZXNzQnVmZlR5cGUuQWN0aXZlU2tpbGxDZDoge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxfdG90YWxfdGltZSArPSB0aGlzLmhlcm9fZGF0YS5nZXRTa2lsbENvbGREb3duKFNraWxsVHlwZS5BY3RpdmUpICogZW5kbGVzc0J1ZmYudmFsdWVcclxuICAgICAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEVuZGxlc3NCdWZmVHlwZS5BZGREYW1hZ2U6IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlcm9fZGF0YS5hbGxfaW5jcmVhc2VfZGFtYWdlIC09IGVuZGxlc3NCdWZmLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKuaYr+WQpuaLpeacieS4gOS4quaXoOWwvWJ1ZmYgaWQgKi9cclxuICAgIGlzSGF2ZUVuZGxlc3NJZChpZDogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCIrKysrKysrK1wiLGlkLHRoaXMubWFwX2VuZGxlc3NfYnVmZilcclxuICAgICAgICByZXR1cm4gdGhpcy5tYXBfZW5kbGVzc19idWZmLmhhcyhpZCk7XHJcbiAgICB9XHJcbiAgICAvKirmmK/lkKbmi6XmnInkuIDkuKrml6DlsL1idWZmIOexu+WeiyAqL1xyXG4gICAgZ2V0RW5kbGVzc0J5VHlwZSh0eXBlOiBudW1iZXIpOiBFbmRsZXNzQnVmZiB7XHJcbiAgICAgICAgbGV0IGJ1ZmY6IEVuZGxlc3NCdWZmID0gbnVsbDtcclxuICAgICAgICB0aGlzLm1hcF9lbmRsZXNzX2J1ZmYuZm9yRWFjaCgodiwgaykgPT4ge1xyXG4gICAgICAgICAgICBpZiAodi50eXBlID09IHR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGJ1ZmYgPSB2O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGJ1ZmY7XHJcbiAgICB9XHJcbiAgICAvKirojrflvpfkuIDkuKrml6DlsL1idWZmICovXHJcbiAgICBnZXRFbmRsZXNzQnVmZihpZDogbnVtYmVyKTogRW5kbGVzc0J1ZmYge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1hcF9lbmRsZXNzX2J1ZmYuZ2V0KGlkKTtcclxuICAgIH1cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1CVUZGLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICBhZGRCdWZmKGJ1ZmZEYXRhOiBCdWZmRGF0YSk6IEJ1ZmZUaW1lciB7XHJcbiAgICAgICAgbGV0IGJ1ZmZJZCA9IGJ1ZmZEYXRhLmJ1ZmZfaWQ7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzSGF2ZUJ1ZmYoYnVmZklkKSkge1xyXG4gICAgICAgICAgICAvL+a3u+WKoGJ1ZmboioLngrnlkoznibnmlYggICAgICAgXHJcbiAgICAgICAgICAgIGxldCBub2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgICAgICAgICAgaWYgKGJ1ZmZEYXRhLmdhbWVfZWZmZWN0X2lkID09IEdhbWVFZmZlY3RJZC5OdWxsKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlID0gbmV3IGNjLk5vZGUoYnVmZkRhdGEuZ2FtZV9lZmZlY3RfaWQudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBub2RlID0gR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEZvclBhcmVudChidWZmRGF0YS5nYW1lX2VmZmVjdF9pZCwgdGhpcy54dWFueXVuX3BvcywgdGhpcy5ub2RlKTtcclxuICAgICAgICAgICAgICAgIC8vbm9kZS5zY2FsZT10aGlzLm5vZGUud2lkdGgvMjAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8v5re75YqgYnVmZlxyXG4gICAgICAgICAgICBsZXQgYnVmZjogQnVmZlRpbWVyID0gbm9kZS5nZXRDb21wb25lbnQoQnVmZlRpbWVyKTtcclxuICAgICAgICAgICAgaWYgKCFidWZmKSB7XHJcbiAgICAgICAgICAgICAgICBidWZmID0gbm9kZS5hZGRDb21wb25lbnQoQnVmZlRpbWVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBidWZmLmluaXQoYnVmZkRhdGEpO1xyXG4gICAgICAgICAgICAvL2J1ZmbplIDmr4Hml7blpITnkIZcclxuICAgICAgICAgICAgYnVmZi5hZGREZXN0cm95TGlzdGVuKHRoaXMub25CdWZmRGVzdG9yeS5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgLy9idWZm5rK755aX6Kem5Y+R5pe25aSE55CGXHJcbiAgICAgICAgICAgIGlmIChidWZmRGF0YS5yZWNvdmVyeV9qaWFuZ2VfdGltZSA+IDApIHtcclxuICAgICAgICAgICAgICAgIGJ1ZmYuYWRkUmVjb3ZlcnlMaXN0ZW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIGRvUmVjb3Zlcnk6IChudW06IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBXYWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1haW5XYWxsKCkuY2hhbmdlSHAobnVtKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LCBidWZmLmdldEZpcnN0QnVmZlZhbHVlKCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaGVyb19idWZmLnNldChidWZmRGF0YS5idWZmX2lkLCBidWZmKTtcclxuICAgICAgICAgICAgbm9kZS5zY2FsZSA9IDEgLyB0aGlzLnNldHVwX3NjYWxlO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGJ1ZmZJZCkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBCdWZmSWQuUGV0M19KaWFTdTpcclxuICAgICAgICAgICAgICAgIGNhc2UgQnVmZklkLkhlcm9fTWVpTW9fR29uZ1N1OlxyXG4gICAgICAgICAgICAgICAgY2FzZSBCdWZmSWQuSGVyb19aaGVuRGVfR29uZ3N1OlxyXG4gICAgICAgICAgICAgICAgY2FzZSBCdWZmSWQuSGVyb19LdWFuZ1poYW5TaGlfRGFaaGFvOlxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VBdHRhY2tTcGVlZChidWZmRGF0YS5idWZmX3ZhbHVlWzBdKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBCdWZmSWQuSGVyb19DaGFuZ01hb1Nob3dfR29uZ1N1OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VBdHRhY2tTcGVlZChidWZmRGF0YS5idWZmX3ZhbHVlWzBdKTtcclxuICAgICAgICAgICAgICAgICAgICBub2RlLnNldFBvc2l0aW9uKGNjLnYyKDAsIDApKTtcclxuICAgICAgICAgICAgICAgICAgICAvL+aWsOWinuS4gOS4quiDjOWQjueJueaViFxyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmYuYWRkVGVYaWFvKEdhbWVFZmZlY3RJZC5jaGFuZ19tYW9fc2hvdV9za2lsbF9hY3RpdmVfMiwgdGhpcy5ub2RlLmdldFBvc2l0aW9uKCksIGNjLmZpbmQoJ0NhbnZhcy9IZXJvX1NoYWRvd19Sb290JykpXHJcbiAgICAgICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBCdWZmSWQuSGVyb19aaGVuRGVfQmFvSmlNaW5nWmhvbmdMdjoge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVyb19kYXRhLmNyaXRfZXggKz0gYnVmZkRhdGEuYnVmZl92YWx1ZVswXTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlcm9fZGF0YS5oaXRfZXggKz0gYnVmZkRhdGEuYnVmZl92YWx1ZVswXTtcclxuICAgICAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5hZGRCdWZmU3RhdGUoYnVmZklkLCBidWZmRGF0YS5yZW1haW5fdGltZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBidWZmO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBidWZmID0gdGhpcy5oZXJvX2J1ZmYuZ2V0KGJ1ZmZJZCk7XHJcbiAgICAgICAgICAgIGJ1ZmYucmVmcmVzaEJ1ZmYoYnVmZkRhdGEpO1xyXG4gICAgICAgICAgICB0aGlzLmFkZEJ1ZmZTdGF0ZShidWZmSWQsIGJ1ZmZEYXRhLnJlbWFpbl90aW1lKTtcclxuICAgICAgICAgICAgcmV0dXJuIGJ1ZmY7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHN1YkJ1ZmYoYnVmZklkOiBCdWZmSWQpOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgYnVmZiA9IHRoaXMuaGVyb19idWZmLmdldChidWZmSWQpO1xyXG4gICAgICAgIGlmIChidWZmKSB7XHJcbiAgICAgICAgICAgIGJ1ZmYuZGVzdHJveVNlbGYoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBvbkJ1ZmZEZXN0b3J5KGJ1ZmZEYXRhOiBCdWZmRGF0YSkge1xyXG4gICAgICAgIHRoaXMuaGVyb19idWZmLmRlbGV0ZShidWZmRGF0YS5idWZmX2lkKTtcclxuICAgICAgICBzd2l0Y2ggKGJ1ZmZEYXRhLmJ1ZmZfaWQpIHtcclxuICAgICAgICAgICAgY2FzZSBCdWZmSWQuUGV0M19KaWFTdTpcclxuICAgICAgICAgICAgY2FzZSBCdWZmSWQuSGVyb19NZWlNb19Hb25nU3U6XHJcbiAgICAgICAgICAgIGNhc2UgQnVmZklkLkhlcm9fS3VhbmdaaGFuU2hpX0RhWmhhbzpcclxuICAgICAgICAgICAgY2FzZSBCdWZmSWQuSGVyb19aaGVuRGVfR29uZ3N1OlxyXG4gICAgICAgICAgICBjYXNlIEJ1ZmZJZC5IZXJvX0NoYW5nTWFvU2hvd19Hb25nU3U6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlQXR0YWNrU3BlZWQoLWJ1ZmZEYXRhLmJ1ZmZfdmFsdWVbMF0pO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEJ1ZmZJZC5IZXJvX1poZW5EZV9CYW9KaU1pbmdaaG9uZ0x2OiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhlcm9fZGF0YS5jcml0X2V4IC09IGJ1ZmZEYXRhLmJ1ZmZfdmFsdWVbMF07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhlcm9fZGF0YS5oaXRfZXggLT0gYnVmZkRhdGEuYnVmZl92YWx1ZVswXTtcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaXNIYXZlQnVmZihidWZmOiBCdWZmSWQpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5oZXJvX2J1ZmYuaGFzKGJ1ZmYpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZUFsbEJ1ZmYoKSB7XHJcbiAgICAgICAgdGhpcy5oZXJvX2J1ZmYuZm9yRWFjaCgoYnVmZjogQnVmZlRpbWVyKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc3ViQnVmZihidWZmLmdldEJ1ZmZJZCgpKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBhZGREZUJ1ZmYoYnVmZkRhdGE6IEJ1ZmZEYXRhLCBpbnNpZ2h0OiBudW1iZXIgPSAwKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzSGF2ZURlQnVmZihidWZmRGF0YS5idWZmX2lkKSkge1xyXG4gICAgICAgICAgICAvL+aOp+WItuexu+eahGRlYnVmZumcgOimgeagueaNrumfp+aAp+adpeWunueOsOWFt+S9k+eahOaViOaenFxyXG4gICAgICAgICAgICBpZiAoYnVmZkRhdGEuYnVmZl90eXBlID09IEJ1ZmZUeXBlLlZlcnRpZ28pIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1cl90b3VnaG5lc3MgPj0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmhlcm9fdHlwZSAhPSBIZXJvX1R5cGUuWmhlbkRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tcF9wcm9ncmVzcy5zZXREaXNhYmxlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIFNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmhpZGVTa2lsbFJhbmdlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5za2lsbF90aXAubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuZ29uZ2ppX2ppc2h1ID0gMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3BpbmUucGF1c2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNfY2FuX3RvdWNoID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5zaWdodCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5yZW1haW5fdGltZSA9IEluanVyZWREYXRhLmNhbGNDb250cm9sVGltZShidWZmRGF0YS5yZW1haW5fdGltZSwgdGhpcy5jdXJfdG91Z2huZXNzLCBpbnNpZ2h0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnh1YW55dW5fY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnh1YW55dW5fY2FsbGJhY2sodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBXYWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1haW5XYWxsKCkuc2hvd1ZlcnRpZ28oYnVmZkRhdGEucmVtYWluX3RpbWUpO1xyXG4gICAgICAgICAgICAgICAgLy/lhbPpl63ml7blgZxcclxuICAgICAgICAgICAgICAgIFNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldFRpbWVTdG9wKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIFNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldElzU2tpbGxTdGF0ZShmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy/mt7vliqBidWZm6IqC54K55ZKM54m55pWIICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgbm9kZTogY2MuTm9kZSA9IG51bGw7XHJcbiAgICAgICAgICAgIGlmIChidWZmRGF0YS5nYW1lX2VmZmVjdF9pZCA9PSBHYW1lRWZmZWN0SWQuTnVsbCkge1xyXG4gICAgICAgICAgICAgICAgbm9kZSA9IG5ldyBjYy5Ob2RlKGJ1ZmZEYXRhLmdhbWVfZWZmZWN0X2lkLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbm9kZSA9IEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RGb3JQYXJlbnQoYnVmZkRhdGEuZ2FtZV9lZmZlY3RfaWQsIHRoaXMueHVhbnl1bl9wb3MsIHRoaXMubm9kZSk7XHJcbiAgICAgICAgICAgICAgICBub2RlLnNjYWxlID0gdGhpcy5ub2RlLndpZHRoIC8gMjAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8v5re75YqgYnVmZlxyXG4gICAgICAgICAgICBsZXQgYnVmZjogQnVmZlRpbWVyID0gbm9kZS5nZXRDb21wb25lbnQoQnVmZlRpbWVyKTtcclxuICAgICAgICAgICAgaWYgKCFidWZmKSB7XHJcbiAgICAgICAgICAgICAgICBidWZmID0gbm9kZS5hZGRDb21wb25lbnQoQnVmZlRpbWVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBidWZmLmluaXQoYnVmZkRhdGEpO1xyXG4gICAgICAgICAgICAvL2J1ZmbplIDmr4Hml7blpITnkIZcclxuICAgICAgICAgICAgYnVmZi5hZGREZXN0cm95TGlzdGVuKHRoaXMub25EZUJ1ZmZEZXN0b3J5LmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICB0aGlzLmhlcm9fZGVidWZmLnNldChidWZmRGF0YS5idWZmX2lkLCBidWZmKTtcclxuICAgICAgICAgICAgbm9kZS5zY2FsZSA9IDEgLyB0aGlzLnNldHVwX3NjYWxlO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGJ1ZmZEYXRhLmJ1ZmZfaWQpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgQnVmZklkLkJvc3M2X1NraWxsXzJfamlhbmdvbmdzdTpcclxuICAgICAgICAgICAgICAgIGNhc2UgQnVmZklkLkJvc3MzX0pJQU5fR29uZ1N1OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VBdHRhY2tTcGVlZCgtYnVmZkRhdGEuYnVmZl92YWx1ZVswXSk7XHJcbiAgICAgICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBCdWZmSWQuQm9zczhfU2tpbGxfMl9hdHRhY2s6IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlcm9fZGF0YS50b3RhbF9hdHRhY2sgLT0gYnVmZkRhdGEuYnVmZl92YWx1ZVswXSAqIHRoaXMuaGVyb19kYXRhLmZpeGVkX2F0dGNrO1xyXG4gICAgICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmFkZERlQnVmZlN0YXRlKGJ1ZmZEYXRhLmJ1ZmZfaWQsIGJ1ZmZEYXRhLnJlbWFpbl90aW1lKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IGJ1ZmYgPSB0aGlzLmhlcm9fZGVidWZmLmdldChidWZmRGF0YS5idWZmX2lkKTtcclxuICAgICAgICAgICAgYnVmZi5yZWZyZXNoQnVmZihidWZmRGF0YSk7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkRGVCdWZmU3RhdGUoYnVmZkRhdGEuYnVmZl9pZCwgYnVmZkRhdGEucmVtYWluX3RpbWUpO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGJ1ZmZEYXRhLmJ1ZmZfaWQpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgQnVmZklkLkJvc3M2X1NraWxsXzJfamlhbmdvbmdzdTpcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChidWZmLmdldEZsb29yTnVtKCkgPCBidWZmRGF0YS5tYXhfZmxvb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlQXR0YWNrU3BlZWQoLWJ1ZmZEYXRhLmJ1ZmZfdmFsdWVbMF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDljrvpmaTkuIDkuKpkZWJ1ZmZcclxuICAgICAqIEBwYXJhbSBidWZmIGRlYnVmZuexu+Wei1xyXG4gICAgICogQHBhcmFtIGlzTmVlZFJlY3ljbGUg5piv5ZCm6ZyA6KaB6LCD55So5Zue5pS2XHJcbiAgICAgKiBAcmV0dXJucyBcclxuICAgICAqL1xyXG4gICAgc3ViRGVCdWZmKGJ1ZmZJZDogQnVmZklkKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IGJ1ZmYgPSB0aGlzLmhlcm9fZGVidWZmLmdldChidWZmSWQpO1xyXG4gICAgICAgIGlmIChidWZmKSB7XHJcbiAgICAgICAgICAgIGJ1ZmYuZGVzdHJveVNlbGYoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBvbkRlQnVmZkRlc3RvcnkoYnVmZkRhdGE6IEJ1ZmZEYXRhKSB7XHJcbiAgICAgICAgLy8gbGV0IGJ1ZmZTdGF0ZT10aGlzLm1hcF9kZWJ1ZmZfc3RhdGUuZ2V0KEJ1ZmZTdGF0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXREZUJ1ZmZUeXBlKGJ1ZmZEYXRhLmJ1ZmZfaWQpKTtcclxuICAgICAgICAvLyBpZihidWZmU3RhdGUpe1xyXG4gICAgICAgIC8vICAgICBidWZmU3RhdGUuZGVzdHJveVNlbGYoKTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgdGhpcy5oZXJvX2RlYnVmZi5kZWxldGUoYnVmZkRhdGEuYnVmZl9pZCk7XHJcbiAgICAgICAgc3dpdGNoIChidWZmRGF0YS5idWZmX2lkKSB7XHJcbiAgICAgICAgICAgIGNhc2UgQnVmZklkLk1vbnN0ZXJfWHVhbll1bjoge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaGVyb190eXBlICE9IEhlcm9fVHlwZS5aaGVuRGUpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tcF9wcm9ncmVzcy5zZXREaXNhYmxlKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ29uZ2ppX2ppc2h1ID0gMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3BpbmUucGF1c2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzX2Nhbl90b3VjaCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBXYWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1haW5XYWxsKCkuaGlkZVZlcnRpZ28oKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnh1YW55dW5fY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnh1YW55dW5fY2FsbGJhY2soZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEJ1ZmZJZC5Cb3NzM19KSUFOX0dvbmdTdToge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VBdHRhY2tTcGVlZChidWZmRGF0YS5idWZmX3ZhbHVlWzBdKTtcclxuICAgICAgICAgICAgICAgIGxldCBidWZmU3RhdGUgPSB0aGlzLm1hcF9kZWJ1ZmZfc3RhdGUuZ2V0KEJ1ZmZTdGF0ZVR5cGUuQXR0YWNrU3BlZWQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGJ1ZmZTdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZTdGF0ZS5kZXN0cm95U2VsZigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEJ1ZmZJZC5Cb3NzNl9Ta2lsbF8yX2ppYW5nb25nc3U6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlQXR0YWNrU3BlZWQoYnVmZkRhdGEuYnVmZl92YWx1ZVswXSAqIGJ1ZmZEYXRhLmN1cl9mbG9vcik7XHJcbiAgICAgICAgICAgICAgICBsZXQgYnVmZlN0YXRlID0gdGhpcy5tYXBfZGVidWZmX3N0YXRlLmdldChCdWZmU3RhdGVUeXBlLkF0dGFja1NwZWVkKTtcclxuICAgICAgICAgICAgICAgIGlmIChidWZmU3RhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBidWZmU3RhdGUuZGVzdHJveVNlbGYoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBCdWZmSWQuQm9zczhfU2tpbGxfMl9hdHRhY2s6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGVyb19kYXRhLnRvdGFsX2F0dGFjayArPSBidWZmRGF0YS5idWZmX3ZhbHVlWzBdICogdGhpcy5oZXJvX2RhdGEuZml4ZWRfYXR0Y2s7XHJcbiAgICAgICAgICAgICAgICBsZXQgYnVmZlN0YXRlID0gdGhpcy5tYXBfZGVidWZmX3N0YXRlLmdldChCdWZmU3RhdGVUeXBlLkF0dGFjayk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYnVmZlN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnVmZlN0YXRlLmRlc3Ryb3lTZWxmKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlzSGF2ZURlQnVmZihidWZmSWQ6IEJ1ZmZJZCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmhlcm9fZGVidWZmLmhhcyhidWZmSWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZUFsbERlQnVmZigpIHtcclxuICAgICAgICB0aGlzLmhlcm9fZGVidWZmLmZvckVhY2goKHYsIGspID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zdWJEZUJ1ZmYodi5nZXRCdWZmSWQoKSlcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0R2FtZUVmZmVjdElkQnlEZWJ1ZmYoYnVmZjogSGVyb19EZUJ1ZmYpOiBHYW1lRWZmZWN0SWQge1xyXG4gICAgICAgIGxldCBnYW1lRWZmZWN0SWQgPSBHYW1lRWZmZWN0SWQuTnVsbDtcclxuICAgICAgICBzd2l0Y2ggKGJ1ZmYpIHtcclxuICAgICAgICAgICAgY2FzZSBIZXJvX0RlQnVmZi5YdWFuWXVuOiB7XHJcbiAgICAgICAgICAgICAgICBnYW1lRWZmZWN0SWQgPSBHYW1lRWZmZWN0SWQueHVhbnl1bjtcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGdhbWVFZmZlY3RJZDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRHYW1lRWZmZWN0TmFtZUJ5RGVidWZmKGJ1ZmY6IEhlcm9fRGVCdWZmKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgbmFtZSA9ICcwJztcclxuICAgICAgICBzd2l0Y2ggKGJ1ZmYpIHtcclxuICAgICAgICAgICAgY2FzZSBIZXJvX0RlQnVmZi5YdWFuWXVuOiB7XHJcbiAgICAgICAgICAgICAgICBuYW1lID0gR2FtZUVmZmVjdElkLnh1YW55dW4gKyAnJztcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkWHVhbll1bkxpc3RlbihjYWxsYmFjazogRnVuY3Rpb24pIHtcclxuICAgICAgICB0aGlzLnh1YW55dW5fY2FsbGJhY2sgPSBjYWxsYmFjaztcclxuICAgIH1cclxuXHJcbiAgICByZXNldFN0YXRlKCkge1xyXG4gICAgICAgIHRoaXMuc2V0Q0QoMSAvIDMpO1xyXG4gICAgICAgIHRoaXMucmVtb3ZlQWxsQnVmZigpO1xyXG4gICAgICAgIHRoaXMucmVtb3ZlQWxsRGVCdWZmKCk7XHJcbiAgICAgICAgdGhpcy5tYXBfYnVmZl9zdGF0ZS5mb3JFYWNoKCh2LCBrKSA9PiB7XHJcbiAgICAgICAgICAgIHYuZGVzdHJveVNlbGYoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLm1hcF9kZWJ1ZmZfc3RhdGUuZm9yRWFjaCgodiwgaykgPT4ge1xyXG4gICAgICAgICAgICB2LmRlc3Ryb3lTZWxmKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKHRoaXMucmVzZXRfY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgdGhpcy5yZXNldF9jYWxsYmFjaygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+WQjOatpeaVsOaNruS/oeaBr1xyXG4gICAgICAgIHRoaXMuaGVyb19kYXRhID0gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nYW1lX2hlcm9fZGF0YS5nZXQodGhpcy5oZXJvX3R5cGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKua3u+WKoOS4gOS4qmJ1ZmbnirbmgIHlm77moIcgKi9cclxuICAgIGFkZEJ1ZmZTdGF0ZShidWZmSWQ6IEJ1ZmZJZCwgcmVtYWluVGltZTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHR5cGVzID0gQnVmZlN0YXRlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEJ1ZmZUeXBlKGJ1ZmZJZCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0eXBlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgdHlwZSA9IHR5cGVzW2ldO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5tYXBfYnVmZl9zdGF0ZS5oYXModHlwZSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFwX2J1ZmZfc3RhdGUuZ2V0KHR5cGUpLnJlZnJlc2hUaW1lKHJlbWFpblRpbWUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbGV0IGJmU3RhdGUgPSBCdWZmU3RhdGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlQnVmZlN0YXRlKHR5cGUsIHRoaXMuaGVyb190eXBlKTtcclxuICAgICAgICAgICAgICAgIGJmU3RhdGUuaW5pdCh0eXBlLCByZW1haW5UaW1lLCB0aGlzLm9uQnVmZlN0YXRlRGVzdG9yeS5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFwX2J1ZmZfc3RhdGUuc2V0KHR5cGUsIGJmU3RhdGUpO1xyXG4gICAgICAgICAgICAgICAgLy90aGlzLm5vZGUuYWRkQ2hpbGQoc2hpZWxkLm5vZGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uQnVmZlN0YXRlRGVzdG9yeSh0eXBlOiBCdWZmU3RhdGVUeXBlKSB7XHJcbiAgICAgICAgdGhpcy5tYXBfYnVmZl9zdGF0ZS5kZWxldGUodHlwZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5re75Yqg5LiA5LiqYnVmZueKtuaAgeWbvuaghyAqL1xyXG4gICAgYWRkRGVCdWZmU3RhdGUoYnVmZklkOiBCdWZmSWQsIHJlbWFpblRpbWU6IG51bWJlcikge1xyXG4gICAgICAgIGxldCB0eXBlcyA9IEJ1ZmZTdGF0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXREZUJ1ZmZUeXBlKGJ1ZmZJZCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0eXBlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgdHlwZSA9IHR5cGVzW2ldO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5tYXBfZGVidWZmX3N0YXRlLmhhcyh0eXBlKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXBfZGVidWZmX3N0YXRlLmdldCh0eXBlKS5yZWZyZXNoVGltZShyZW1haW5UaW1lKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxldCBiZlN0YXRlID0gQnVmZlN0YXRlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZURlQnVmZlN0YXRlKHR5cGUsIHRoaXMuaGVyb190eXBlKTtcclxuICAgICAgICAgICAgICAgIGJmU3RhdGUuaW5pdCh0eXBlLCByZW1haW5UaW1lLCB0aGlzLm9uRGVCdWZmU3RhdGVEZXN0b3J5LmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXBfZGVidWZmX3N0YXRlLnNldCh0eXBlLCBiZlN0YXRlKTtcclxuICAgICAgICAgICAgICAgIC8vdGhpcy5ub2RlLmFkZENoaWxkKHNoaWVsZC5ub2RlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkRlQnVmZlN0YXRlRGVzdG9yeSh0eXBlOiBCdWZmU3RhdGVUeXBlKSB7XHJcbiAgICAgICAgdGhpcy5tYXBfZGVidWZmX3N0YXRlLmRlbGV0ZSh0eXBlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKirorr7nva7mlLvpgJ/vvIzmr4/np5LmlLvlh7vmrKHmlbAgKi9cclxuICAgIHByaXZhdGUgc2V0QXR0YWNrU3BlZWQobnVtU2VjOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmdvbmdqaV9zdWR1ID0gbnVtU2VjO1xyXG4gICAgICAgIGlmIChudW1TZWMgPiAxMCkge1xyXG4gICAgICAgICAgICBudW1TZWMgPSAxMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG51bVNlYyA8IDAuMSkge1xyXG4gICAgICAgICAgICBudW1TZWMgPSAwLjE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaGVyb19kYXRhLmdvbmdqaV9qaWFuZ2UgPSAxIC8gbnVtU2VjO1xyXG4gICAgfVxyXG4gICAgLyoq5pS55Y+Y5b2T5YmN5pS76YCfLGJ1ZmZEYXRhOuavlOeOhyAqL1xyXG4gICAgcHJpdmF0ZSBjaGFuZ2VBdHRhY2tTcGVlZChyYXRlOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgZ2pzZCA9IHRoaXMuZ2V0QXR0YWNrU3BlZWQoKTtcclxuICAgICAgICBnanNkICs9IChyYXRlKSAqICgxIC8gdGhpcy5oZXJvX2RhdGEuYmFzZV9qaWFuZ2UpO1xyXG4gICAgICAgIHRoaXMuc2V0QXR0YWNrU3BlZWQoZ2pzZCk7XHJcbiAgICB9XHJcbiAgICAvKirojrflvpflvZPliY3mlLvpgJ8gKi9cclxuICAgIHByaXZhdGUgZ2V0QXR0YWNrU3BlZWQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gMSAvIHRoaXMuaGVyb19kYXRhLmdvbmdqaV9qaWFuZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3nirbmgIEs5Yqo55S7LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgcHVibGljIHNldEhlcm9TdGF0ZShzdGF0ZTogSGVyb19TdGF0ZSwgZmFuZ3hpYW5nOiBHb25nSmlfRmFuZ1hpYW5nLCBkYXRhPzogS2V5RnJhbWVEYXRhW10sIGVuZENhbGxiYWNrPzogRnVuY3Rpb24pIHtcclxuICAgICAgICB0aGlzLmhlcm9fc3RhdGUgPSBzdGF0ZTtcclxuICAgICAgICB0aGlzLmN1cl9mYW5neGlhbmcgPSBmYW5neGlhbmc7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLmN1cl9mYW5neGlhbmcpIHtcclxuICAgICAgICAgICAgY2FzZSBHb25nSmlfRmFuZ1hpYW5nLnp1bzoge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnNjYWxlWCA9IHRoaXMuc2V0dXBfc2NhbGU7XHJcbiAgICAgICAgICAgICAgICAvL3RoaXMubm9kZS5zY2FsZVggPSAtdGhpcy5zZXR1cF9zY2FsZTtcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBHb25nSmlfRmFuZ1hpYW5nLnpob25nOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc2NhbGVYID0gdGhpcy5zZXR1cF9zY2FsZTtcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBHb25nSmlfRmFuZ1hpYW5nLnlvdToge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnNjYWxlWCA9IHRoaXMuc2V0dXBfc2NhbGU7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5pKt5pS+5Yqo55S7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLmhlcm9fc3RhdGUpIHtcclxuICAgICAgICAgICAgY2FzZSBIZXJvX1N0YXRlLmlkbGU6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheVNwaW5lQW5pbWF0aW9uKHRoaXMuZ2V0U3BpbmVOYW1lKCksIHRydWUsIG51bGwsIG51bGwpO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEhlcm9fU3RhdGUuYXR0YWNrOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXlTcGluZUFuaW1hdGlvbih0aGlzLmdldFNwaW5lTmFtZSgpLCBmYWxzZSwgZGF0YSwgZW5kQ2FsbGJhY2spO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEhlcm9fU3RhdGUuc2tpbGw6XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5U3BpbmVBbmltYXRpb24odGhpcy5nZXRTcGluZU5hbWUoKSwgZmFsc2UsIGRhdGEsIGVuZENhbGxiYWNrKTtcclxuICAgICAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBzZXRIZXJvU3RhdGVBbmRBbmltYXRpb24oc3RhdGU6IEhlcm9fU3RhdGUsIG5hbWU6IHN0cmluZywgbG9vcDogYm9vbGVhbiwgZGF0YT86IEtleUZyYW1lRGF0YVtdLCBlbmRDYWxsYmFjaz86IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5oZXJvX3N0YXRlID0gc3RhdGU7XHJcbiAgICAgICAgdGhpcy5wbGF5U3BpbmVBbmltYXRpb24obmFtZSwgbG9vcCwgZGF0YSwgZW5kQ2FsbGJhY2spO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEhlcm9TdGF0ZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5oZXJvX3N0YXRlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuagueaNruaVjOS6uuS9jee9ruiOt+W+l+aUu+WHu+aWueWQkSAqL1xyXG4gICAgcHJvdGVjdGVkIGdldEZhbmdYaWFuZ0J5UG9zKHBvczogY2MuVmVjMik6IEdvbmdKaV9GYW5nWGlhbmcge1xyXG4gICAgICAgIC8v5a+55pWM5Lq65Y2V5L2N6L+b6KGM5pa55ZCR5Yik5pat77yM56Gu5a6a5omT5Ye75pa55ZCRXHJcbiAgICAgICAgbGV0IGZhbmd4aWFuZyA9IEdvbmdKaV9GYW5nWGlhbmcuemhvbmc7XHJcbiAgICAgICAgbGV0IG9mZnNldFBvcyA9IHBvcy5zdWIodGhpcy5ub2RlLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgIGxldCBwaTIgPSBNYXRoLlBJICogMjtcclxuICAgICAgICBsZXQgcmFkaWFuID0gKE1hdGguYXRhbjIob2Zmc2V0UG9zLnksIG9mZnNldFBvcy54KSArIHBpMikgJSBwaTI7XHJcbiAgICAgICAgbGV0IGFuZ2xlID0gMTgwICogcmFkaWFuIC8gTWF0aC5QSTtcclxuICAgICAgICBpZiAoYW5nbGUgPD0gNjApIHtcclxuICAgICAgICAgICAgZmFuZ3hpYW5nID0gR29uZ0ppX0ZhbmdYaWFuZy55b3U7XHJcbiAgICAgICAgfSBlbHNlIGlmIChhbmdsZSA+IDYwICYmIGFuZ2xlIDwgMTIwKSB7XHJcbiAgICAgICAgICAgIGZhbmd4aWFuZyA9IEdvbmdKaV9GYW5nWGlhbmcuemhvbmc7XHJcbiAgICAgICAgfSBlbHNlIGlmIChhbmdsZSA+PSAxMjAgJiYgYW5nbGUgPD0gMTgwKSB7XHJcbiAgICAgICAgICAgIGZhbmd4aWFuZyA9IEdvbmdKaV9GYW5nWGlhbmcuenVvO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFuZ3hpYW5nO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFNwaW5lTmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5oZXJvX3N0YXRlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgSGVyb19TdGF0ZS5hdHRhY2s6IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBIZXJvX1N0YXRlX05hbWUuQXR0YWNrO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEhlcm9fU3RhdGUuc2tpbGw6IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBIZXJvX1N0YXRlX05hbWUuU2tpbGw7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgSGVyb19TdGF0ZS5pZGxlOiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSGVyb19TdGF0ZV9OYW1lLklkbGU7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDmkq3mlL7kuIDkuKrpqqjpqrzliqjnlLtcclxuICAgICAqIEBwYXJhbSBuYW1lIOmqqOmqvOWKqOeUu+WQjeensFxyXG4gICAgICogQHBhcmFtIGlzTG9vcCDmmK/lkKblvqrnjq9cclxuICAgICAqIEBwYXJhbSBkYXRhIOaYr+WQpuebkeWQrOWFs+mUruW4p++8jOWFs+mUruW4p+aVsOaNruWMheWQq+WFs+mUruW4p+WQjeensO+8jOebkeWQrOWIsOWFs+mUruW4p+WQjueahOWbnuiwg1xyXG4gICAgICogQHBhcmFtIGVuZENhbGxiYWNrIOaSreaUvue7k+adn+WQjueahOWbnuiwg1xyXG4gICAgICovXHJcbiAgICBwbGF5U3BpbmVBbmltYXRpb24obmFtZTogc3RyaW5nLCBpc0xvb3A6IGJvb2xlYW4gPSBmYWxzZSwgZGF0YT86IEtleUZyYW1lRGF0YVtdLCBlbmRDYWxsYmFjaz86IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgbGV0IGFuaW1hID0gdGhpcy5zcGluZS5zZXRBbmltYXRpb24oMCwgbmFtZSwgaXNMb29wKTtcclxuICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLnNwaW5lLnNldFRyYWNrRXZlbnRMaXN0ZW5lcihhbmltYSwgKGVudHJ5OiBzcC5zcGluZS5UcmFja0VudHJ5LCBldmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50LmRhdGEubmFtZSA9PSBkYXRhW2ldLm5hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVtpXS5jYWxsYmFjaygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGVuZENhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3BpbmUuc2V0VHJhY2tDb21wbGV0ZUxpc3RlbmVyKGFuaW1hLCAoZW50cnk6IHNwLnNwaW5lLlRyYWNrRW50cnksIGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBhbmltYS5saXN0ZW5lciA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBlbmRDYWxsYmFjaygpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUNELS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICBwdWJsaWMgcmVzZXRTa2lsbCgpIHtcclxuICAgICAgICB0aGlzLnNraWxsX2NkX3RpbWUgPSAwO1xyXG4gICAgICAgIHRoaXMuc2hvd0NEKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlc2V0Q0QoKSB7XHJcbiAgICAgICAgdGhpcy5za2lsbF9jZF90aW1lID0gdGhpcy5za2lsbF90b3RhbF90aW1lO1xyXG4gICAgICAgIHRoaXMuc2hvd0NEKCk7XHJcbiAgICAgICAgLy/ph4rmlL7kuobmioDog73vvIznq4vpqazlh4/ljrtNUFxyXG4gICAgICAgIC8vR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS53YWxsX2RhdGEuY2hhbmdlTXAoLXRoaXMuaGVyb19kYXRhLmNvc3RfbXApO1xyXG4gICAgfVxyXG4gICAgLyoq55m+5YiG5q+UICovXHJcbiAgICBwdWJsaWMgc2V0Q0QocGVyVGltZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5za2lsbF9jZF90aW1lID0gcGVyVGltZSAqIHRoaXMuaGVyb19kYXRhLmdldFNraWxsQ29sZERvd24oU2tpbGxUeXBlLkFjdGl2ZSk7O1xyXG4gICAgICAgIHRoaXMuY2hhbmdlQ0QoMCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNoYW5nZUNEKHRpbWU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuc2tpbGxfY2RfdGltZSArPSB0aW1lO1xyXG4gICAgICAgIGlmICh0aGlzLnNraWxsX2NkX3RpbWUgPD0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLnNraWxsX2NkX3RpbWUgPSAwO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5tcF9wcm9ncmVzcykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tcF9wcm9ncmVzcy5zZXROb3JtYWxTUCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmF1dG9fZmlnaHRpbmcgJiYgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zdGF0ZSA9PSBHYW1lU3RhdGUuR2FtZV9QbGF5aW5nICYmIHRoaXMuZ2V0SXNDYW5Ta2lsbCgpICYmIFNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldElzU2tpbGxTdGF0ZSgpID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0QXV0b1JlbGVhc2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8v5pi+56S66JKZ5p2/5ZKM5YCS6K6h5pe2XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1wX3Byb2dyZXNzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1wX3Byb2dyZXNzLnNldENEU1AoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNob3dDRCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2hvd0NEKCkge1xyXG4gICAgICAgIGlmICh0aGlzLm1wX3Byb2dyZXNzKSB7XHJcbiAgICAgICAgICAgIGxldCBwcm9ncmVzcyA9IDEgLSB0aGlzLnNraWxsX2NkX3RpbWUgLyB0aGlzLnNraWxsX3RvdGFsX3RpbWU7XHJcbiAgICAgICAgICAgIHRoaXMubXBfcHJvZ3Jlc3Muc2V0UHJvZ3Jlc3MocHJvZ3Jlc3MpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRJc0NhblNraWxsKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICh0aGlzLmlzSGF2ZURlQnVmZihCdWZmSWQuTW9uc3Rlcl9YdWFuWXVuKSB8fCB0aGlzLmdldEhlcm9TdGF0ZSgpID09IEhlcm9fU3RhdGUuZXhpdCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaXNfc2hvd19tcF9oaW50ID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKHRoaXMuc2tpbGxfY2RfdGltZSA8PSAwKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzX25lZWRfY2hlY2tfZGlzdGFuY2UpIHtcclxuICAgICAgICAgICAgICAgIC8v5aaC5p6c6ZyA6KaB5Yik5pat6YeK5pS+6Led56a755qE77yM5YiZ6ZyA6KaB5Yik5pat6YeK5pS+6Led56a75YaF5pyJ5rKh5pyJ5oCq54mp77yM5rKh5pyJ5YiZ6L+U5ZueZmFsc2VcclxuICAgICAgICAgICAgICAgIGxldCBlbmVteXMgPSBNb25zdGVyTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1vbnN0ZXJzRm9yTmVhcmVzdEJ5U2tpbGwodGhpcy5tYXhfZ29uZ2ppX251bSwgdGhpcy5ub2RlLnksIHRoaXMuY2FzdGluZ19kaXN0YW5jZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZW5lbXlzID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gZGFtYWdlIOacrOasoeS4jeaatOWHu+eahOS8pOWus+WAvFxyXG4gICAgICogQHBhcmFtIGlzQnVsbGV0IOaYr+WQpuWtkOW8ueexu+Wei1xyXG4gICAgICogQHBhcmFtIHNraWxsVHlwZSDmioDog73nsbvlnotcclxuICAgICAqIEBwYXJhbSBza2lsbFJhdGUg5aaC5p6c5piv5oqA6IO977yM5oqA6IO955qE5q+U546HXHJcbiAgICAgKiBAcGFyYW0gY29udGludW91c1JhdGUg5Lyk5a6z5q+U546HLeW6lOeUqOWcqOaMgee7reS8pOWus+avlOeOh1xyXG4gICAgICogQHJldHVybnMg5pS75Ye75pWw5o2uXHJcbiAgICAgKi9cclxuICAgIGdldEdvbmdKaURhdGEoZGFtYWdlVHlwZTogRGFtYWdlVHlwZSwgaXNCdWxsZXQ6IGJvb2xlYW4sIHNraWxsVHlwZTogU2tpbGxUeXBlLCBza2lsbFJhdGU6IG51bWJlciA9IDEsIGNvbnRpbnVvdXNSYXRlOiBudW1iZXIgPSAwKTogR29uZ0ppRGF0YSB7XHJcbiAgICAgICAgbGV0IGdqRGF0YSA9IG5ldyBHb25nSmlEYXRhKCk7XHJcbiAgICAgICAgZ2pEYXRhLmhlcm9fZGF0YSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuaGVyb19kYXRhKTtcclxuICAgICAgICBnakRhdGEuaGVyb19kYXRhLmF0dGFja19pbmNyZWFzZV9kYW1hZ2U9R2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRDaGFyaW9BdHRhY2tSb3RpbygpO1xyXG4gICAgICAgIGdqRGF0YS5pc19idWxsZXQgPSBpc0J1bGxldDtcclxuICAgICAgICBnakRhdGEuZGFtYWdlX3R5cGUgPSBkYW1hZ2VUeXBlO1xyXG4gICAgICAgIGdqRGF0YS5oZXJvX3R5cGUgPSB0aGlzLmhlcm9fdHlwZTtcclxuICAgICAgICBpZiAoZGFtYWdlVHlwZSA9PSBEYW1hZ2VUeXBlLk5vcm1hbCkge1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvL+aKgOiDveS8pOWus+avlOeOh1xyXG4gICAgICAgICAgICBnakRhdGEuc2tpbGxfZGFtYWdlX3JhdGUgPSBza2lsbFJhdGU7XHJcbiAgICAgICAgICAgIGdqRGF0YS5jb250aW51b3VzX2RhbWFnZV9yYXRlID0gY29udGludW91c1JhdGU7XHJcbiAgICAgICAgICAgIGlmIChza2lsbFR5cGUgPT0gU2tpbGxUeXBlLkFjdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgZ2pEYXRhLnNraWxsX3JlbGVhc2VfaWQgPSB0aGlzLmdldFNraWxsUmVsZWFzZUlkKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGdqRGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBvbkRhbWFnZU1vbnN0ZXIoZGFtYWdlVHlwZTogRGFtYWdlVHlwZSwgaXNDcml0OiBib29sZWFuLCBtb25zdGVyOiBjYy5Ob2RlKSB7XHJcbiAgICAgICAgaWYgKGRhbWFnZVR5cGUgPT0gRGFtYWdlVHlwZS5Ob3JtYWwpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGV0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBldC5vbkhlcm9IaXRNb25zdGVyKG1vbnN0ZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmhpdF9jYWxsYmFjaykge1xyXG4gICAgICAgICAgICB0aGlzLmhpdF9jYWxsYmFjayhkYW1hZ2VUeXBlLCBpc0NyaXQsIG1vbnN0ZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXNldEdvbmdKaUppU2h1KCkge1xyXG4gICAgICAgIHRoaXMuZ29uZ2ppX2ppc2h1ID0gMDtcclxuICAgICAgICB0aGlzLmlzX2Nhbl9qaXNodSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzZXROb3JtYWxBdHRhY2soKSB7XHJcbiAgICAgICAgdGhpcy5nb25namlfamlzaHUgPSB0aGlzLmhlcm9fZGF0YS5nb25namlfamlhbmdlO1xyXG4gICAgICAgIHRoaXMuaXNfY2FuX2ppc2h1ID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRBdHRTcGluZVNjYWxlKCkge1xyXG4gICAgICAgIHRoaXMuc3BpbmUudGltZVNjYWxlID0gdGhpcy5oZXJvX2RhdGEuYmFzZV9qaWFuZ2UgLyB0aGlzLmhlcm9fZGF0YS5nb25namlfamlhbmdlO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0Tm9ybWFsQXR0YWNrKG1vbnN0ZXI6IGNjLk5vZGUpIHtcclxuICAgICAgICBsZXQgaXNEb3VibGU6IGJvb2xlYW4gPSB0aGlzLmlzX2RvdWJsZV9hdHRhY2s7XHJcbiAgICAgICAgdGhpcy5zZXRBdHRTcGluZVNjYWxlKCk7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNfZG91YmxlX2F0dGFjaykge1xyXG4gICAgICAgICAgICB0aGlzLnNwaW5lLnRpbWVTY2FsZSA9IHRoaXMuaGVyb19kYXRhLmJhc2VfamlhbmdlIC8gdGhpcy5oZXJvX2RhdGEuZ29uZ2ppX2ppYW5nZSAqIDI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaXNfZG91YmxlX2F0dGFjayA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYXR0YWNrX2NhbGxiYWNrKG1vbnN0ZXIpO1xyXG4gICAgICAgIGlmICh0aGlzLnBldCkge1xyXG4gICAgICAgICAgICB0aGlzLnBldC5zdGFydFJlbGVhc2VTa2lsbChtb25zdGVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZSA9PSBHYW1lTW9kZS5FbmRsZXNzKSB7XHJcbiAgICAgICAgICAgIGlmIChpc0RvdWJsZSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGJ1ZmYgPSB0aGlzLmdldEVuZGxlc3NCeVR5cGUoRW5kbGVzc0J1ZmZUeXBlLkRvdWJsZUF0dGFjaylcclxuICAgICAgICAgICAgICAgIGlmIChidWZmKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/mpoLnjodcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcmF0ZSA9IGJ1ZmYudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKE1hdGgucmFuZG9tKCkgPCByYXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNfZG91YmxlX2F0dGFjayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3BpbmUudGltZVNjYWxlID0gdGhpcy5oZXJvX2RhdGEuYmFzZV9qaWFuZ2UgLyB0aGlzLmhlcm9fZGF0YS5nb25namlfamlhbmdlICogMjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1VUERBVEUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgdXBkYXRlKGR0OiBudW1iZXIpIHtcclxuICAgICAgICBpZiAoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zdGF0ZSAhPSBHYW1lU3RhdGUuR2FtZV9QbGF5aW5nIHx8IEhlcm9fU3RhdGUuZXhpdCA9PSB0aGlzLmdldEhlcm9TdGF0ZSgpKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy5jaGVja1NraWxsKGR0KTtcclxuICAgICAgICBpZiAodGhpcy5pc0hhdmVEZUJ1ZmYoQnVmZklkLk1vbnN0ZXJfWHVhbll1bikpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNoZWNrQXR0YWNrKGR0KTtcclxuICAgICAgICBpZiAodGhpcy5jbGlja19yZW1haW4gPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xpY2tfcmVtYWluIC09IGR0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHZ4OiBudW1iZXIgPSAodGhpcy50YXJnZXRYIC0gdGhpcy5ub2RlLngpICogdGhpcy5lYXNpbmc7XHJcbiAgICAgICAgdGhpcy5ub2RlLnggKz0gdng7XHJcbiAgICAgICAgaWYodGhpcy5wb3NJbmRleD09Mil7XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhclBvc1g9dGhpcy5ub2RlLng7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMubm9kZV9zaGFkb3cpe1xyXG4gICAgICAgICAgICB0aGlzLm5vZGVfc2hhZG93LnNldFBvc2l0aW9uKGNjLnYyKHRoaXMubm9kZS54ICsgdGhpcy5wb3MueCAqIHRoaXMuc2V0dXBfc2NhbGUsIHRoaXMubm9kZS55ICsgdGhpcy5wb3MueSAqIHRoaXMuc2V0dXBfc2NhbGUpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gc3dpdGNoICh0aGlzLnNwZWVkVHlwZSkge1xyXG4gICAgICAgIC8vICAgICBjYXNlIFNwZWVkVHlwZS5TVE9QOlxyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5tb3ZlU3BlZWQgPSB0aGlzLnN0b3BTcGVlZDtcclxuICAgICAgICAvLyAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIC8vICAgICBjYXNlIFNwZWVkVHlwZS5OT1JNQUw6XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLm1vdmVTcGVlZCA9IHRoaXMubm9ybWFsU3BlZWQ7XHJcbiAgICAgICAgLy8gICAgICAgICBicmVhaztcclxuICAgICAgICAvLyAgICAgY2FzZSBTcGVlZFR5cGUuRkFTVDpcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMubW92ZVNwZWVkID0gdGhpcy5mYXN0U3BlZWQ7XHJcbiAgICAgICAgLy8gICAgICAgICBicmVhaztcclxuICAgICAgICAvLyAgICAgZGVmYXVsdDpcclxuICAgICAgICAvLyAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIC8vIH1cclxuXHJcblxyXG4gICAgICAgIC8vIHRoaXMubW92ZSgpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgdXBkYXRlQ2hlY2soZHQpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAodGhpcy5pc0hhdmVEZUJ1ZmYoQnVmZklkLk1vbnN0ZXJfWHVhbll1bikpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNoZWNrQXR0YWNrKGR0KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjaGVja1NraWxsKGR0OiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5oZXJvX3N0YXRlICE9IEhlcm9fU3RhdGUuc2tpbGwpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VDRCgtZHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNoZWNrQXR0YWNrKGR0KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNfY2FuX2ppc2h1ICYmIHRoaXMuaXNfbG9hZF9vaykge1xyXG4gICAgICAgICAgICB0aGlzLmdvbmdqaV9qaXNodSArPSBkdDtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZ29uZ2ppX2ppc2h1ID49IHRoaXMuaGVyb19kYXRhLmdvbmdqaV9qaWFuZ2UpIHtcclxuICAgICAgICAgICAgICAgIC8v5byA5aeL5pS75Ye7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdvbmdqaV9qaXNodSA9IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzX2Nhbl9nb25namkgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v6Ieq5Yqo5pS75Ye7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNfY2FuX2dvbmdqaSAmJiB0aGlzLmdldEhlcm9TdGF0ZSgpICE9IEhlcm9fU3RhdGUuc2tpbGwpIHtcclxuICAgICAgICAgICAgdGhpcy5pc19jYW5fZ29uZ2ppID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGxldCBtb25zdGVycyA9IE1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TW9uc3RlcnNGb3JOZWFyZXN0KHRoaXMubWF4X2dvbmdqaV9udW0sIHRoaXMubm9kZS5nZXRQb3NpdGlvbigpLCB0aGlzLmhlcm9fZGF0YS5nb25namlfZmFud2VpLHRoaXMucG9zSW5kZXgpO1xyXG4gICAgICAgICAgICBpZiAobW9uc3RlcnMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ29uZ2ppX2ppc2h1ID0gMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNfY2FuX2dvbmdqaSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEF0dFNwaW5lU2NhbGUoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnROb3JtYWxBdHRhY2sobW9uc3RlcnNbMF0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuIl19