
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
        _this.easing = 0.2;
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
        this.node.zIndex = 2;
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
        if (GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(id, initCount, function () {
            _this.cur_load_num++;
            if (_this.cur_load_num >= _this.need_load_num) {
                if (_this.is_load_ok == false) {
                    _this.is_load_ok = true;
                    Hero_1.cur_loaded_num++;
                    if (_this.loaded_callback) {
                        _this.loaded_callback();
                    }
                }
            }
        }) == true) {
            this.need_load_num++;
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
        this.targetX = (GameManager_1.default.getInstance().aniType - 2) * 150 + this.posX;
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
                    this.node.scaleX = -this.setup_scale;
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
            var monsters = MonsterManager_1.default.getInstance().getMonstersForNearest(this.max_gongji_num, this.node.getPosition(), this.hero_data.gongji_fanwei);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcR2FtZVxcSGVyby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBK0w7QUFHL0wsNkNBQXdEO0FBRXhELGlEQUE0QztBQUM1QyxvRUFBaUY7QUFFakYsK0RBQTBEO0FBQzFELDZDQUFzRDtBQUN0RCxnRUFBMkQ7QUFDM0QseURBQXNFO0FBQ3RFLHdEQUFtRDtBQUNuRCx5Q0FBb0M7QUFDcEMsdUNBQXNDO0FBQ3RDLHVDQUFrQztBQUNsQyxvREFBK0M7QUFDL0MsdUVBQWtFO0FBQ2xFLHNEQUFpRDtBQUNqRCxnREFBK0M7QUFDL0Msc0RBQWlEO0FBQ2pELDRFQUEwRjtBQUMxRixrRUFBd0U7QUFDeEUsa0RBQTZDO0FBQzdDLHFEQUEyRDtBQUMzRCxnREFBMkM7QUFDM0Msa0RBQTZDO0FBQzdDLGdEQUEyQztBQUMzQyxpREFBNEM7QUFDNUMsK0RBQTREO0FBSXRELElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQWtDLHdCQUFZO0lBQTlDO1FBQUEscUVBcTVDQztRQWo1Q0csaUJBQWlCO1FBQ2pCLGdCQUFVLEdBQVksS0FBSyxDQUFDO1FBQzVCLGtCQUFZLEdBQVcsQ0FBQyxDQUFDO1FBQ3pCLG1CQUFhLEdBQVcsQ0FBQyxDQUFDO1FBRzFCLGVBQVMsR0FBYyxzQkFBUyxDQUFDLFlBQVksQ0FBQztRQUc5QyxzQkFBZ0IsR0FBYyxJQUFJLENBQUM7UUFFbkMsTUFBTTtRQUNOLFdBQUssR0FBZ0IsSUFBSSxDQUFDO1FBQzFCLGFBQWE7UUFDYixtQkFBYSxHQUFxQiw2QkFBZ0IsQ0FBQyxHQUFHLENBQUM7UUFDdkQsV0FBVztRQUNYLGdCQUFVLEdBQWUsdUJBQVUsQ0FBQyxJQUFJLENBQUM7UUFDekMsTUFBTTtRQUNOLGtCQUFZLEdBQVcsQ0FBQyxDQUFDO1FB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VSxDQUFDLEtBQUssRUFBRTtZQUMvRCxJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztZQUMzQixJQUFJLFFBQVEsR0FBRyx3QkFBYyxDQUFDLFdBQVcsRUFBRSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQzlJLElBQUksUUFBUSxFQUFFO2dCQUNWLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO2dCQUN0QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztnQkFDMUIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7Z0JBQ3hCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN2QztTQUVKO0lBQ0wsQ0FBQzs7SUFsNUNELHVCQUF1QjtJQUNULGlCQUFZLEdBQVcsQ0FBQyxDQUFDO0lBQ3pCLG1CQUFjLEdBQVcsQ0FBQyxDQUFDO0lBT3pDO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsc0JBQVMsQ0FBQyxFQUFFLENBQUM7MkNBQ087SUFHOUM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztrREFDZTtJQWJsQixJQUFJO1FBRHhCLE9BQU87T0FDYSxJQUFJLENBcTVDeEI7SUFBRCxXQUFDO0NBcjVDRCxBQXE1Q0MsQ0FyNUNpQyxFQUFFLENBQUMsU0FBUyxHQXE1QzdDO2tCQXI1Q29CLElBQUkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCdWZmSWQsIEJ1ZmZTdGF0ZVR5cGUsIEJ1ZmZUeXBlLCBEYW1hZ2VUeXBlLCBHb25nSmlfRmFuZ1hpYW5nLCBIZXJvX0RlQnVmZiwgSGVyb19TdGF0ZSwgSGVyb19TdGF0ZV9OYW1lLCBIZXJvX1R5cGUsIFNraWxsSW5kaWNhdG9yVHlwZSwgU2tpbGxUaXBUeXBlLCBTa2lsbFR5cGUgfSBmcm9tIFwiLi9IZXJvQ29uZmlnXCI7XHJcbmltcG9ydCBNcFByb2dyZXNzIGZyb20gXCIuL01wUHJvZ3Jlc3NcIjtcclxuaW1wb3J0IEJ1ZmZTdGF0ZSBmcm9tIFwiLi9CdWZmU3RhdGVcIjtcclxuaW1wb3J0IHsgR29uZ0ppRGF0YSwgSGVyb0RhdGEgfSBmcm9tIFwiLi4vRGF0YS9IZXJvRGF0YVwiO1xyXG5pbXBvcnQgUGV0IGZyb20gXCIuLi8uLi9QZXQvR2FtZS9QZXRcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi8uLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBHYW1lRWZmZWN0SWQsIEdhbWVFZmZlY3RzTWFuYWdlciB9IGZyb20gXCIuLi8uLi9HYW1lL0dhbWVFZmZlY3RzTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBIZXJvTWFuYWdlciB9IGZyb20gXCIuLi9EYXRhL0hlcm9NYW5hZ2VyXCI7XHJcbmltcG9ydCBNb25zdGVyTWFuYWdlciBmcm9tIFwiLi4vLi4vTW9uc3Rlci9Nb25zdGVyTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBHYW1lTW9kZSwgR2FtZVN0YXRlIH0gZnJvbSBcIi4uLy4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgQnVmZlN0YXRlTWFuYWdlciBmcm9tIFwiLi4vLi4vR2FtZS9CdWZmU3RhdGVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEluanVyZWREYXRhLCBLZXlGcmFtZURhdGEgfSBmcm9tIFwiLi4vLi4vTW9uc3Rlci9Nb25zdGVyRGF0YVwiO1xyXG5pbXBvcnQgU2tpbGxNYW5hZ2VyIGZyb20gXCIuLi8uLi9HYW1lL1NraWxsTWFuYWdlclwiO1xyXG5pbXBvcnQgQnVmZlRpbWVyIGZyb20gXCIuL0J1ZmZUaW1lclwiO1xyXG5pbXBvcnQgeyBCdWZmRGF0YSB9IGZyb20gXCIuL0J1ZmZEYXRhXCI7XHJcbmltcG9ydCBTa2lsbFRpcCBmcm9tIFwiLi9Ta2lsbFRpcFwiO1xyXG5pbXBvcnQgU2t5TWFuYWdlciBmcm9tIFwiLi4vLi4vR2FtZS9Ta3lNYW5hZ2VyXCI7XHJcbmltcG9ydCBMYW5ndWFnZU1hbmFnZXIgZnJvbSBcIi4uLy4uL211bHRpTGFuZ3VhZ2UvTGFuZ3VhZ2VNYW5hZ2VyXCI7XHJcbmltcG9ydCBUYXNrTWFuYWdlciBmcm9tIFwiLi4vLi4vVGFzay9UYXNrTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBUYXNrSXRlbSB9IGZyb20gXCIuLi8uLi9UYXNrL1Rhc2tFbnVtXCI7XHJcbmltcG9ydCBXYWxsTWFuYWdlciBmcm9tIFwiLi4vLi4vV2FsbC9XYWxsTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBFbmRsZXNzQnVmZiwgRW5kbGVzc0J1ZmZUeXBlIH0gZnJvbSBcIi4uLy4uL2NvcHkvZW5kbGVzc2NoYWxsZW5nZXMvRW5kbGVzc0NvbmZpZ1wiO1xyXG5pbXBvcnQgeyBTcGlyaXRBdHRyaWJ1dGVNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL1BldC9EYXRhL1NwaXJpdEF0dHJpYnV0ZVwiO1xyXG5pbXBvcnQgRmlyZVBldCBmcm9tIFwiLi4vLi4vUGV0L0dhbWUvRmlyZVBldFwiO1xyXG5pbXBvcnQgeyBIZXJvQmFzZUluZm9NYW5hZ2VyIH0gZnJvbSBcIi4uL0RhdGEvSGVyb0Jhc2VJbmZvXCI7XHJcbmltcG9ydCBJY2VQZXQgZnJvbSBcIi4uLy4uL1BldC9HYW1lL0ljZVBldFwiO1xyXG5pbXBvcnQgV2luZFBldCBmcm9tIFwiLi4vLi4vUGV0L0dhbWUvV2luZFBldFwiO1xyXG5pbXBvcnQgUmF5UGV0IGZyb20gXCIuLi8uLi9QZXQvR2FtZS9SYXlQZXRcIjtcclxuaW1wb3J0IE1vbnN0ZXIgZnJvbSBcIi4uLy4uL01vbnN0ZXIvTW9uc3RlclwiO1xyXG5pbXBvcnQgeyBpbnN0YW5jZSB9IGZyb20gXCIuLi8uLi9HYW1lL1RvdWNoUGxhbmUvVG91Y2hQbGFuZVwiO1xyXG5cclxuXHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGVybyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICAvKirmiYDmnInnmoToi7Hpm4Tlj4rlhbbmiYDpnIDotYTmupDmmK/lkKbliqDovb3lrozmr5UgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgbWF4X2xvYWRfbnVtOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIHN0YXRpYyBjdXJfbG9hZGVkX251bTogbnVtYmVyID0gMDtcclxuICAgIC8qKuaJgOmcgOeahOWKqOeUu+WKoOi9veaYr+WQpm9rICovXHJcbiAgICBpc19sb2FkX29rOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBjdXJfbG9hZF9udW06IG51bWJlciA9IDA7XHJcbiAgICBuZWVkX2xvYWRfbnVtOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkVudW0oSGVyb19UeXBlKSB9KVxyXG4gICAgaGVyb190eXBlOiBIZXJvX1R5cGUgPSBIZXJvX1R5cGUuQ2hhbmdNYW9TaG91O1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICBwcmVmYWJfc2tpbGxfdGlwOiBjYy5QcmVmYWIgPSBudWxsO1xyXG5cclxuICAgIC8v6aqo6aq85Yqo55S7XHJcbiAgICBzcGluZTogc3AuU2tlbGV0b24gPSBudWxsO1xyXG4gICAgLyoq5b2T5YmN6Iux6ZuE55qE6Z2i5ZCRICovXHJcbiAgICBjdXJfZmFuZ3hpYW5nOiBHb25nSmlfRmFuZ1hpYW5nID0gR29uZ0ppX0ZhbmdYaWFuZy56dW87XHJcbiAgICAvKiroi7Hpm4TnmoTnirbmgIEgKi9cclxuICAgIGhlcm9fc3RhdGU6IEhlcm9fU3RhdGUgPSBIZXJvX1N0YXRlLmlkbGU7XHJcbiAgICAvL+aUu+WHu+iuoeaVsFxyXG4gICAgZ29uZ2ppX2ppc2h1OiBudW1iZXIgPSAxO1xyXG4gICAgLyoq5piv5ZCm5Y+v5Lul5pS75Ye7ICovXHJcbiAgICBpc19jYW5fZ29uZ2ppOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAvKirmmK/lkKblj6/ku6XmlLvlh7vorqHmlbAgKi9cclxuICAgIGlzX2Nhbl9qaXNodTogYm9vbGVhbiA9IHRydWU7XHJcbiAgICAvL+acgOWkp+eahOaUu+WHu+asoeaVsFxyXG4gICAgbWF4X2dvbmdqaV9udW0gPSAxO1xyXG4gICAgLy/mioDog73liankvZnnmoTlhrfljbTml7bpl7RcclxuICAgIHNraWxsX2NkX3RpbWU6IG51bWJlciA9IDA7XHJcbiAgICAvKirkuLvliqjmioDog73mioDog73mnIDlpKflhrfljbQqL1xyXG4gICAgc2tpbGxfdG90YWxfdGltZTogbnVtYmVyID0gNTtcclxuICAgIC8qKuaWveazlei3neemuyAqL1xyXG4gICAgY2FzdGluZ19kaXN0YW5jZTogbnVtYmVyID0gMTAwMDtcclxuICAgIC8qKuWtkOW8uemAn+W6piAqL1xyXG4gICAgYnVsbGV0X3NwZWVkOiBudW1iZXIgPSAxMDAwO1xyXG4gICAgLy/mtojogJfnmoRNUOWAvFxyXG4gICAgY29zdF9tcDogbnVtYmVyID0gMjA7XHJcbiAgICBtcF9wcm9ncmVzczogTXBQcm9ncmVzcyA9IG51bGw7XHJcbiAgICAvKiroi7Hpm4TlvZPliY3mi6XmnInnmoRidWZmICovXHJcbiAgICBwcm90ZWN0ZWQgaGVyb19idWZmOiBNYXA8QnVmZklkLCBCdWZmVGltZXI+ID0gbnVsbDtcclxuICAgIC8qKuiLsembhOW9k+WJjeaLpeacieeahGRlYnVmZiAqL1xyXG4gICAgcHJvdGVjdGVkIGhlcm9fZGVidWZmOiBNYXA8QnVmZklkLCBCdWZmVGltZXI+ID0gbnVsbDtcclxuICAgIC8qKuaXoOWwvWJ1ZmYgKi9cclxuICAgIHByb3RlY3RlZCBtYXBfZW5kbGVzc19idWZmOiBNYXA8bnVtYmVyLCBFbmRsZXNzQnVmZj4gPSBudWxsO1xyXG4gICAgLyoq55yp5pmV5L2N572uICovXHJcbiAgICB4dWFueXVuX3BvczogY2MuVmVjMiA9IG51bGw7XHJcbiAgICAvKirlrZDlvLnnlJ/miJDnmoTkvY3nva4gKi9cclxuICAgIGJ1bGxldF9wb3M6IGNjLlZlYzJbXSA9IFtdO1xyXG4gICAgLy/oi7Hpm4TnmoTmlbDmja5cclxuICAgIGhlcm9fZGF0YTogSGVyb0RhdGEgPSBudWxsO1xyXG4gICAgaXNfc2hvd19tcF9oaW50OiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgLyoq5b2T5YmN55qE6Z+n5oCnICovXHJcbiAgICBwcm90ZWN0ZWQgY3VyX3RvdWdobmVzczogbnVtYmVyID0gMDtcclxuICAgIHpoaXNoaXFpX3R5cGU6IFNraWxsSW5kaWNhdG9yVHlwZSA9IFNraWxsSW5kaWNhdG9yVHlwZS5iZWVsaW5lO1xyXG4gICAgLyoq5oqA6IO96YeK5pS+5Zue6LCDICovXHJcbiAgICBza2lsbF9jYWxsYmFjazogRnVuY3Rpb24gPSBudWxsO1xyXG4gICAgLyoq5pS75Ye76YeK5pS+5Zue6LCDICovXHJcbiAgICBhdHRhY2tfY2FsbGJhY2s6IEZ1bmN0aW9uID0gbnVsbDtcclxuICAgIC8qKuecqeaZleWbnuiwgyAqLztcclxuICAgIHh1YW55dW5fY2FsbGJhY2s6IEZ1bmN0aW9uID0gbnVsbDtcclxuICAgIC8qKuWRveS4reWbnuiwgyAqL1xyXG4gICAgaGl0X2NhbGxiYWNrOiBGdW5jdGlvbiA9IG51bGw7XHJcbiAgICAvKirph43nva7lm57osIMgKi9cclxuICAgIHJlc2V0X2NhbGxiYWNrOiBGdW5jdGlvbiA9IG51bGw7XHJcbiAgICAvKirog5zliKnlm57osIMgKi9cclxuICAgIHdpbl9jYWxsYmFjazogRnVuY3Rpb24gPSBudWxsO1xyXG4gICAgLyoq5Yqg6L295a6M5q+V5Zue6LCD5Zue6LCDICovXHJcbiAgICBsb2FkZWRfY2FsbGJhY2s6IEZ1bmN0aW9uID0gbnVsbDtcclxuICAgIC8qKuWuoOeJqSAqL1xyXG4gICAgcGV0OiBQZXQgPSBudWxsO1xyXG4gICAgLyoq5a6g54mp5oqA6IO955qE5LiA5Lqb6KKr5YqoICovXHJcbiAgICAvKirmraTmrKHkvKTlrrPlv4XlrprmmrTlh7sgKi9cclxuICAgIG11c3RfY3JpdDogbnVtYmVyID0gMDtcclxuICAgIC8qKuWuoOeJqTIx5Y+v5Lul6Kem5Y+R5aKe5Lyk5qyh5pWwICovXHJcbiAgICBjcml0X2luY3JlYXNlX2NkXzNfbnVtOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIHNldHVwX3NjYWxlOiBudW1iZXIgPSAwLjUwO1xyXG4gICAgYmFzZV9hdHRfamlhbmdlOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIC8qKmJ1ZmbnirbmgIEgKi9cclxuICAgIG1hcF9idWZmX3N0YXRlOiBNYXA8bnVtYmVyLCBCdWZmU3RhdGU+ID0gbnVsbDtcclxuICAgIC8qKmRlYnVmZueKtuaAgSAqL1xyXG4gICAgbWFwX2RlYnVmZl9zdGF0ZTogTWFwPG51bWJlciwgQnVmZlN0YXRlPiA9IG51bGw7XHJcbiAgICAvKirmmK/lkKbpnIDopoHmo4Dmn6XmioDog73ph4rmlL7ot53nprsgKi9cclxuICAgIGlzX25lZWRfY2hlY2tfZGlzdGFuY2U6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgLyoq5oyH56S65Zmo57G75Z6LICovXHJcbiAgICBwcm90ZWN0ZWQgc2tpbGxfdGlwX3R5cGU6IFNraWxsVGlwVHlwZSA9IFNraWxsVGlwVHlwZS5GdWxsO1xyXG4gICAgLyoq5piv5ZCm5Y+v5Lul5aSE55CG6Kem5pG45LqL5Lu277yM5b2T5oqA6IO9Q0Tlrozmr5XliIfmjInkuIvkuoboi7Hpm4Tml7bkuLp0cnVlICovXHJcbiAgICBwcml2YXRlIGlzX2Nhbl90b3VjaDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBza2lsbF90aXA6IFNraWxsVGlwID0gbnVsbDtcclxuICAgIC8qKuaYr+WQpuinpuWPkeiHquWKqOmHiuaUvumAu+i+kSAqL1xyXG4gICAgcHJpdmF0ZSBpc19hdXRvX3JlbGVhc2U6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgdG91Y2hfcmVjdDogY2MuUmVjdCA9IG51bGw7XHJcbiAgICAvKirmgLvlhbHkvb/nlKjmioDog73nmoTmrKHmlbAgKi9cclxuICAgIHByb3RlY3RlZCB1c2Vfc2tpbGxfbnVtOiBudW1iZXIgPSAwO1xyXG4gICAgcHJvdGVjdGVkIG5vZGVfc2hhZG93OiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIC8qKueCueWHu+WJqeS9mSAqL1xyXG4gICAgcHJvdGVjdGVkIGNsaWNrX3JlbWFpbjogbnVtYmVyID0gMDtcclxuICAgIC8qKuaUu+mAn+iusOW9leWAvO+8jOS4jeS9nOWIpOaWrSAqL1xyXG4gICAgZ29uZ2ppX3N1ZHU6IG51bWJlciA9IDA7XHJcbiAgICAvKirmioDog73pmJ/liJcgKi9cclxuICAgIHNraWxsX3F1ZXVlOiBTa2lsbFR5cGVbXSA9IFtdO1xyXG4gICAgLyoq5piv5ZCm6L+e57ut5pS75Ye7ICovXHJcbiAgICBpc19kb3VibGVfYXR0YWNrOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAvKirlsYLnuqcqL1xyXG4gICAgcHVibGljIHZfSW5kZXg6IG51bWJlciA9IDA7XHJcblxyXG4gICAgcG9zOiBjYy5WZWMyO1xyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUxPQUQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIHByb3RlY3RlZCBvbkxvYWQoKSB7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hbGxfaGVyby5zZXQodGhpcy5oZXJvX3R5cGUsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuc3BpbmUgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcclxuICAgICAgICAvL3RoaXMuc2V0U2tpbigpO1xyXG4gICAgICAgIHRoaXMudG91Y2hMaXN0ZW4oKTtcclxuICAgICAgICB0aGlzLmluaXRQb3MoKTtcclxuICAgICAgICAvLyBpZih0aGlzLmhlcm9fdHlwZT09SGVyb19UeXBlLkRlTHVZaSl7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuc2V0dXBfc2NhbGU9MC4yMjtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gaWYodGhpcy5oZXJvX3R5cGU9PUhlcm9fVHlwZS5MZWlTaGVufHx0aGlzLmhlcm9fdHlwZT09SGVyb19UeXBlLlNob3VXYW5nKXtcclxuICAgICAgICAvLyAgICAgdGhpcy5zZXR1cF9zY2FsZT0xO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICB0aGlzLm5vZGUuc2NhbGUgPSB0aGlzLnNldHVwX3NjYWxlO1xyXG4gICAgICAgIHRoaXMubm9kZS5zY2FsZVggPSAtdGhpcy5zZXR1cF9zY2FsZTtcclxuICAgICAgICB0aGlzLmFkZExvYWRCeUdhbWVFZmZlY3RJZChHYW1lRWZmZWN0SWQuaGVyb19za2lsbF9jb21tb24sIDIpO1xyXG4gICAgICAgIHRoaXMuYWRkTG9hZEJ5R2FtZUVmZmVjdElkKEdhbWVFZmZlY3RJZC5za2lsbF9kYW1hZ2VfcmVjb3JkLCAyKTtcclxuICAgICAgICB0aGlzLm5vZGUuekluZGV4ID0gMTtcclxuICAgICAgICB0aGlzLm1hcF9idWZmX3N0YXRlID0gbmV3IE1hcDxudW1iZXIsIEJ1ZmZTdGF0ZT4oKTtcclxuICAgICAgICB0aGlzLm1hcF9kZWJ1ZmZfc3RhdGUgPSBuZXcgTWFwPG51bWJlciwgQnVmZlN0YXRlPigpO1xyXG4gICAgICAgIHRoaXMuaGVyb19idWZmID0gbmV3IE1hcDxCdWZmSWQsIEJ1ZmZUaW1lcj4oKTtcclxuICAgICAgICB0aGlzLmhlcm9fZGVidWZmID0gbmV3IE1hcDxCdWZmSWQsIEJ1ZmZUaW1lcj4oKTtcclxuICAgICAgICB0aGlzLm1hcF9lbmRsZXNzX2J1ZmYgPSBuZXcgTWFwPEJ1ZmZJZCwgRW5kbGVzc0J1ZmY+KCk7XHJcbiAgICAgICAgdGhpcy5hZGRTa2lsbFRpcFR5cGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgc3RhcnQoKSB7XHJcbiAgICAgICAgLy/liqDovb3mlbDmja5cclxuICAgICAgICB0aGlzLmhlcm9fZGF0YSA9IEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2FtZV9oZXJvX2RhdGEuZ2V0KHRoaXMuaGVyb190eXBlKTtcclxuICAgICAgICB0aGlzLmJ1bGxldF9zcGVlZCA9IEhlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRCYXNlQnVsbGV0U3BlZWQodGhpcy5oZXJvX3R5cGUpO1xyXG4gICAgICAgIHRoaXMuZ29uZ2ppX2ppc2h1ID0gdGhpcy5oZXJvX2RhdGEuZ29uZ2ppX2ppYW5nZTtcclxuICAgICAgICB0aGlzLmdvbmdqaV9zdWR1ID0gdGhpcy5nZXRBdHRhY2tTcGVlZCgpO1xyXG4gICAgICAgIHRoaXMuc2V0SGVyb1N0YXRlKEhlcm9fU3RhdGUuaWRsZSwgR29uZ0ppX0ZhbmdYaWFuZy56aG9uZyk7XHJcbiAgICAgICAgLy90aGlzLnBsYXlTcGluZUFuaW1hdG9uKEhlcm9fU3RhdGVfTmFtZS5JZGxlLHRydWUsbnVsbCxudWxsKTtcclxuICAgICAgICAvL+WKoOi9vW1w6L+b5bqm5p2hXHJcbiAgICAgICAgdGhpcy5sb2FkTXBQcm9ncmVzcygpO1xyXG4gICAgICAgIHRoaXMubG9hZFBldCgpO1xyXG4gICAgICAgIGxldCBzZWxmU2hhZG93ID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdNb25zdGVyX1NoYWRvdycpO1xyXG4gICAgICAgIHRoaXMucG9zID0gc2VsZlNoYWRvdy5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgIHRoaXMubm9kZV9zaGFkb3cgPSBjYy5pbnN0YW50aWF0ZShzZWxmU2hhZG93KTtcclxuICAgICAgICB0aGlzLm5vZGVfc2hhZG93LnBhcmVudCA9IGNjLmZpbmQoJ0NhbnZhcy9IZXJvX1NoYWRvd19Sb290Jyk7XHJcbiAgICAgICAgdGhpcy5ub2RlX3NoYWRvdy5zY2FsZSA9IHRoaXMuc2V0dXBfc2NhbGU7XHJcbiAgICAgICAgdGhpcy5ub2RlX3NoYWRvdy5zZXRQb3NpdGlvbihjYy52Mih0aGlzLm5vZGUueCArIHRoaXMucG9zLnggKiB0aGlzLnNldHVwX3NjYWxlLCB0aGlzLm5vZGUueSArIHRoaXMucG9zLnkgKiB0aGlzLnNldHVwX3NjYWxlKSk7XHJcbiAgICAgICAgc2VsZlNoYWRvdy5yZW1vdmVGcm9tUGFyZW50KCk7XHJcbiAgICAgICAgaWYgKHRoaXMuZ2V0SGVyb1N0YXRlKCkgPT0gSGVyb19TdGF0ZS5leGl0KSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZV9zaGFkb3cub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubm9kZS56SW5kZXggPSAyO1xyXG4gICAgICAgIHRoaXMuY2FzdGluZ19kaXN0YW5jZSA9IHRoaXMuaGVyb19kYXRhLmdvbmdqaV9mYW53ZWk7XHJcbiAgICAgICAgaWYgKGNjLndpblNpemUuaGVpZ2h0IC8gY2Mud2luU2l6ZS53aWR0aCA+IDIpIHtcclxuICAgICAgICAgICAgdGhpcy5jYXN0aW5nX2Rpc3RhbmNlID0gdGhpcy5oZXJvX2RhdGEuZ29uZ2ppX2ZhbndlaSArIDIwMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gaWYodGhpcy5oZXJvX3R5cGU9PUhlcm9fVHlwZS5Odld1KXtcclxuICAgICAgICAvLyAgICAgdGhpcy5jYXN0aW5nX2Rpc3RhbmNlPTE5MiozK0dhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW5lbXlfYXR0X3ktdGhpcy5ub2RlLnlcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgdGhpcy5zZXRUb3VjaFJlY3QoKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgLy/lj5bmtojnm5HlkKzop6bmkbjkuovku7ZcclxuICAgICAgICBsZXQgdG91Y2hOb2RlID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCd0b3VjaE5vZGUnKTtcclxuICAgICAgICBpZiAodG91Y2hOb2RlKSB7XHJcbiAgICAgICAgICAgIC8vIHRvdWNoTm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsdGhpcy5vblRvdWNoU3RhcnQsdGhpcyk7XHJcbiAgICAgICAgICAgIC8vIHRvdWNoTm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfTU9WRSx0aGlzLm9uVG91Y2hNb3ZlLHRoaXMpO1xyXG4gICAgICAgICAgICAvLyB0b3VjaE5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCx0aGlzLm9uVG91Y2hFbmQsdGhpcyk7XHJcbiAgICAgICAgICAgIC8vIHRvdWNoTm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfQ0FOQ0VMLHRoaXMub25Ub3VjaENhbmNlbCx0aGlzKTtcclxuICAgICAgICAgICAgLy8gaW5zdGFuY2Uub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCB0aGlzLm9uVG91Y2hTdGFydEJ5Sm95LCB0aGlzKTtcclxuICAgICAgICAgICAgLy8gaW5zdGFuY2Uub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX01PVkUsIHRoaXMub25Ub3VjaE1vdmVCeUpveSwgdGhpcyk7XHJcbiAgICAgICAgICAgIGluc3RhbmNlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMub25Ub3VjaEVuZEJ5Sm95LCB0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hbGxfaGVyby5kZWxldGUodGhpcy5oZXJvX3R5cGUpXHJcbiAgICB9XHJcblxyXG4gICAgYWRkU2tpbGxUaXBUeXBlKCkge1xyXG4gICAgICAgIGxldCBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5wcmVmYWJfc2tpbGxfdGlwKTtcclxuICAgICAgICB0aGlzLnNraWxsX3RpcCA9IG5vZGUuZ2V0Q29tcG9uZW50KFNraWxsVGlwKTtcclxuICAgICAgICB0aGlzLnNraWxsX3RpcF90eXBlID0gdGhpcy5za2lsbF90aXAuZ2V0U2tpbGxUaXBUeXBlKCk7XHJcbiAgICAgICAgdGhpcy5za2lsbF90aXAubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMuc2tpbGxfdGlwX3R5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBTa2lsbFRpcFR5cGUuRnVsbDoge1xyXG4gICAgICAgICAgICAgICAgU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBTa2lsbFRpcFR5cGUuQ2lyY2xlOiB7XHJcbiAgICAgICAgICAgICAgICBTa2lsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFNraWxsVGlwVHlwZS5SZWN0OiB7XHJcbiAgICAgICAgICAgICAgICBTa2lsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFNraWxsVGlwVHlwZS5EaXI6IHtcclxuICAgICAgICAgICAgICAgIFNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNldFRvdWNoUmVjdCgpIHtcclxuICAgICAgICBsZXQgdG91Y2hOb2RlID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCd0b3VjaE5vZGUnKTtcclxuICAgICAgICB0aGlzLnRvdWNoX3JlY3QgPSBjYy5yZWN0KHRoaXMubm9kZS54ICsgdG91Y2hOb2RlLnggKiB0aGlzLnNldHVwX3NjYWxlIC0gKHRvdWNoTm9kZS53aWR0aCAqIHRoaXMuc2V0dXBfc2NhbGUgLyAyKSwgdGhpcy5ub2RlLnkgKyB0b3VjaE5vZGUueSAqIHRoaXMuc2V0dXBfc2NhbGUgLSAodG91Y2hOb2RlLmhlaWdodCAqIHRoaXMuc2V0dXBfc2NhbGUgLyAyKSwgdG91Y2hOb2RlLndpZHRoICogdGhpcy5zZXR1cF9zY2FsZSwgdG91Y2hOb2RlLmhlaWdodCAqIHRoaXMuc2V0dXBfc2NhbGUpO1xyXG4gICAgICAgIC8vIGxldCBnZz1jYy5maW5kKCdDYW52YXMvRmlnaHRpbmdfUm9vdCcpLmdldENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgLy8gZ2cucmVjdCh0aGlzLnRvdWNoX3JlY3QueCx0aGlzLnRvdWNoX3JlY3QueSx0aGlzLnRvdWNoX3JlY3Qud2lkdGgsdGhpcy50b3VjaF9yZWN0LmhlaWdodCk7XHJcbiAgICAgICAgLy8gZ2cuc3Ryb2tlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0U2tpbGxUaXBTaXplKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5za2lsbF90aXAubm9kZS53aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIHRoaXMuc2tpbGxfdGlwLm5vZGUuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIGdldFNraWxsVGlwU2l6ZSgpOiBjYy5TaXplIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5za2lsbF90aXAubm9kZS5nZXRDb250ZW50U2l6ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdG91Y2hMaXN0ZW4oKSB7XHJcbiAgICAgICAgLy/nm5HlkKzop6bmkbjkuovku7ZcclxuICAgICAgICBsZXQgdG91Y2hOb2RlID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCd0b3VjaE5vZGUnKTtcclxuICAgICAgICBpZiAodG91Y2hOb2RlKSB7XHJcbiAgICAgICAgICAgIC8vIHRvdWNoTm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCx0aGlzLm9uVG91Y2hTdGFydCx0aGlzKTtcclxuICAgICAgICAgICAgLy8gdG91Y2hOb2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX01PVkUsdGhpcy5vblRvdWNoTW92ZSx0aGlzKTtcclxuICAgICAgICAgICAgLy8gdG91Y2hOb2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCx0aGlzLm9uVG91Y2hFbmQsdGhpcyk7XHJcbiAgICAgICAgICAgIC8vIHRvdWNoTm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9DQU5DRUwsdGhpcy5vblRvdWNoQ2FuY2VsLHRoaXMpO1xyXG4gICAgICAgICAgICAvLyBpbnN0YW5jZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgdGhpcy5vblRvdWNoU3RhcnRCeUpveSwgdGhpcyk7XHJcbiAgICAgICAgICAgIC8vIGluc3RhbmNlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX01PVkUsIHRoaXMub25Ub3VjaE1vdmVCeUpveSwgdGhpcyk7XHJcbiAgICAgICAgICAgIGluc3RhbmNlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vblRvdWNoRW5kQnlKb3ksIHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRQb3MoKSB7XHJcbiAgICAgICAgbGV0IHh1YW55dW4gPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3h1YW55dW4nKTtcclxuICAgICAgICB0aGlzLnh1YW55dW5fcG9zID0geHVhbnl1bi5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgIHh1YW55dW4ucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgICAgIHRoaXMuYnVsbGV0X3BvcyA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgIGxldCBidWxsZXQxID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdidWxsZXQxJyk7XHJcbiAgICAgICAgbGV0IGJ1bGxldDIgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2J1bGxldDInKTtcclxuICAgICAgICB0aGlzLmJ1bGxldF9wb3MucHVzaChidWxsZXQyLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgIHRoaXMuYnVsbGV0X3Bvcy5wdXNoKGJ1bGxldDEuZ2V0UG9zaXRpb24oKSk7XHJcbiAgICAgICAgdGhpcy5idWxsZXRfcG9zLnB1c2goYnVsbGV0Mi5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICBidWxsZXQxLnJlbW92ZUZyb21QYXJlbnQoKTtcclxuICAgICAgICBidWxsZXQyLnJlbW92ZUZyb21QYXJlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkdhbWVXaW4oKSB7XHJcbiAgICAgICAgdGhpcy5za2lsbF9xdWV1ZSA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgIHRoaXMuc2V0SGVyb1N0YXRlKEhlcm9fU3RhdGUuaWRsZSwgR29uZ0ppX0ZhbmdYaWFuZy56aG9uZyk7XHJcbiAgICAgICAgdGhpcy5nb25namlfamlzaHUgPSAwO1xyXG4gICAgICAgIGlmICh0aGlzLndpbl9jYWxsYmFjaykge1xyXG4gICAgICAgICAgICB0aGlzLndpbl9jYWxsYmFjaygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgYWRkU2tpbGxMaXN0ZW4oY2FsbEJhY2s6IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5za2lsbF9jYWxsYmFjayA9IGNhbGxCYWNrO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBhZGRBdHRhY2tMaXN0ZW4oY2FsbEJhY2s6IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5hdHRhY2tfY2FsbGJhY2sgPSBjYWxsQmFjaztcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgYWRkSGl0TGlzdGVuKGNhbGxCYWNrOiBGdW5jdGlvbikge1xyXG4gICAgICAgIHRoaXMuaGl0X2NhbGxiYWNrID0gY2FsbEJhY2s7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGFkZFJlc2V0TGlzdGVuKGNhbGxCYWNrOiBGdW5jdGlvbikge1xyXG4gICAgICAgIHRoaXMucmVzZXRfY2FsbGJhY2sgPSBjYWxsQmFjaztcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgYWRkR2FtZVdpbkxpc3RlbihjYWxsQmFjazogRnVuY3Rpb24pIHtcclxuICAgICAgICB0aGlzLndpbl9jYWxsYmFjayA9IGNhbGxCYWNrO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBhZGRMb2FkZWRMaXN0ZW4oY2FsbEJhY2s6IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5sb2FkZWRfY2FsbGJhY2sgPSBjYWxsQmFjaztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGxvYWRNcFByb2dyZXNzKCkge1xyXG4gICAgICAgIC8vIGNjLnJlc291cmNlcy5sb2FkKCdoZXJvcy9za2lsbF9pY29uJyxjYy5QcmVmYWIsKGVycm9yOiBFcnJvciwgYXNzZXRzOmNjLlByZWZhYik9PntcclxuICAgICAgICAvLyAgICAgaWYoZXJyb3IpXHJcbiAgICAgICAgLy8gICAgIHtcclxuICAgICAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAvLyAgICAgICAgIHJldHVybjtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vICAgICBsZXQgbXBOb2RlPWNjLmluc3RhbnRpYXRlKGFzc2V0cyk7XHJcbiAgICAgICAgLy8gICAgIG1wTm9kZS5wYXJlbnQ9Y2MuZmluZCgnQ2FudmFzL0ZpZ2h0aW5nX1VpJyk7XHJcbiAgICAgICAgLy8gICAgIG1wTm9kZS5zZXRQb3NpdGlvbihjYy52Mih0aGlzLm5vZGUueCx0aGlzLm5vZGUueSsxNSkpO1xyXG4gICAgICAgIC8vICAgICB0aGlzLm1wX3Byb2dyZXNzPW1wTm9kZS5nZXRDb21wb25lbnQoTXBQcm9ncmVzcyk7XHJcbiAgICAgICAgLy8gICAgIHRoaXMubXBfcHJvZ3Jlc3MuaW5pdCh0aGlzLmhlcm9fdHlwZSk7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuY2hhbmdlQ0QodGhpcy5oZXJvX2RhdGEuZ2V0U2tpbGxDb2xkRG93bihTa2lsbFR5cGUuQWN0aXZlKS8zKTtcclxuICAgICAgICAvLyAgICAgdGhpcy5za2lsbF90b3RhbF90aW1lPXRoaXMuaGVyb19kYXRhLmdldFNraWxsQ29sZERvd24oU2tpbGxUeXBlLkFjdGl2ZSk7XHJcbiAgICAgICAgLy8gICAgIGlmKHRoaXMuZ2V0SGVyb1N0YXRlKCk9PUhlcm9fU3RhdGUuZXhpdCl7XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLm1wX3Byb2dyZXNzLmhpZGUoKTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBsb2FkWmhpU2hpUWkoemhpc2hpcWk6IHN0cmluZywgdHlwZTogU2tpbGxJbmRpY2F0b3JUeXBlKSB7XHJcbiAgICAgICAgdGhpcy56aGlzaGlxaV90eXBlID0gdHlwZTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIuWKoOi9vWhlcm9cIiArIHpoaXNoaXFpKTtcclxuXHJcbiAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQoJ2hlcm9zLycgKyB6aGlzaGlxaSwgY2MuUHJlZmFiLCAoZXJyb3I6IEVycm9yLCBhc3NldHM6IGNjLlByZWZhYikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZExvYWRCeUdhbWVFZmZlY3RJZChpZDogR2FtZUVmZmVjdElkLCBpbml0Q291bnQ6IG51bWJlcikge1xyXG4gICAgICAgIGlmIChHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRFZmZlY3RQb29sQnlJZChpZCwgaW5pdENvdW50LCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VyX2xvYWRfbnVtKys7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmN1cl9sb2FkX251bSA+PSB0aGlzLm5lZWRfbG9hZF9udW0pIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzX2xvYWRfb2sgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzX2xvYWRfb2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIEhlcm8uY3VyX2xvYWRlZF9udW0rKztcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5sb2FkZWRfY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkZWRfY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMubmVlZF9sb2FkX251bSsrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKirliqDovb3lrqDniakgKi9cclxuICAgIGxvYWRQZXQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaGVyb19kYXRhLnBldF9pZCA+IDApIHtcclxuICAgICAgICAgICAgbGV0IHR5cGUgPSBTcGlyaXRBdHRyaWJ1dGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3Bpcml0VHlwZSh0aGlzLmhlcm9fZGF0YS5wZXRfaWQpO1xyXG4gICAgICAgICAgICB0aGlzLm5lZWRfbG9hZF9udW0rKztcclxuICAgICAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQoJ3BldC9wZXQnICsgdHlwZSwgY2MuUHJlZmFiLCAoZXJyb3I6IEVycm9yLCBhc3NldHM6IGNjLlByZWZhYikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCBub2RlID0gY2MuaW5zdGFudGlhdGUoYXNzZXRzKTtcclxuICAgICAgICAgICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9QZXRfUm9vdCcpLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGV0ID0gbm9kZS5hZGRDb21wb25lbnQoSWNlUGV0KTtcclxuICAgICAgICAgICAgICAgICAgICB9OyBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wZXQgPSBub2RlLmFkZENvbXBvbmVudChGaXJlUGV0KTtcclxuICAgICAgICAgICAgICAgICAgICB9OyBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wZXQgPSBub2RlLmFkZENvbXBvbmVudChXaW5kUGV0KTtcclxuICAgICAgICAgICAgICAgICAgICB9OyBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wZXQgPSBub2RlLmFkZENvbXBvbmVudChSYXlQZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH07IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5wZXQuaW5pdCh0aGlzLmhlcm9fZGF0YS5wZXRfaWQsIHRoaXMuaGVyb190eXBlLCBjYy52Mih0aGlzLm5vZGUueCAtIDY0LCB0aGlzLm5vZGUueSArIDY0KSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBldC5zZXRIZXJvRGF0YSh0aGlzLmhlcm9fZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cl9sb2FkX251bSsrO1xyXG4gICAgICAgICAgICAgICAgbm9kZS56SW5kZXggPSAxMDAwIC0gbm9kZS55O1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VyX2xvYWRfbnVtID49IHRoaXMubmVlZF9sb2FkX251bSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNfbG9hZF9vayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgSGVyby5jdXJfbG9hZGVkX251bSsrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoq6ZqQ6JeP6Iux6ZuE77yM5q2k5pe26Iux6ZuE5LiN6IO95pS75Ye75oiW6ICF6YeK5pS+5oqA6IO9ICovXHJcbiAgICBoaWRlSGVybygpIHtcclxuICAgICAgICB0aGlzLmhlcm9fc3RhdGUgPSBIZXJvX1N0YXRlLmV4aXQ7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHkgPSAwO1xyXG4gICAgICAgIGlmICh0aGlzLm5vZGVfc2hhZG93KSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZV9zaGFkb3cub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLm1wX3Byb2dyZXNzKSB7XHJcbiAgICAgICAgICAgIHRoaXMubXBfcHJvZ3Jlc3MuaGlkZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzaG93SGVybygpIHtcclxuICAgICAgICB0aGlzLnNldEhlcm9TdGF0ZShIZXJvX1N0YXRlLmlkbGUsIEdvbmdKaV9GYW5nWGlhbmcuemhvbmcpO1xyXG4gICAgICAgIHRoaXMubm9kZS5vcGFjaXR5ID0gMjU1O1xyXG4gICAgICAgIHRoaXMubm9kZV9zaGFkb3cub3BhY2l0eSA9IDI1NTtcclxuICAgICAgICB0aGlzLm1wX3Byb2dyZXNzLnNob3coKTtcclxuICAgIH1cclxuICAgIHBvc1g6IG51bWJlciA9IDA7Ly/liJ3lp4vljJbml7blgJnnmoTkvY3nva5cclxuICAgIHRhcmdldFg6IG51bWJlciA9IDA7XHJcbiAgICBlYXNpbmc6IG51bWJlciA9IDAuMjtcclxuICAgIG9uVG91Y2hFbmRCeUpveShldmVudDogY2MuRXZlbnQuRXZlbnRUb3VjaCwgZGF0YSkge1xyXG4gICAgICAgIHRoaXMudGFyZ2V0WCA9IChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFuaVR5cGUgLSAyKSAqIDE1MCArIHRoaXMucG9zWDtcclxuICAgIH1cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLeOAkOearuiCpOOAkS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIHByb3RlY3RlZCBzZXRTa2luKCkge1xyXG4gICAgICAgIC8vbGV0IGhlcm9RdWFsaXR5PUhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb1F1YWxpdHkodGhpcy5oZXJvX3R5cGUpO1xyXG4gICAgICAgIC8vbGV0IHRpZXI9SGVyb1F1YWxpdHlNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VGllcihoZXJvUXVhbGl0eSk7XHJcbiAgICAgICAgLy90aGlzLnNwaW5lLnNldFNraW4oJ3N0YWdlJysoSGVyb01hbmFnZXIuZ2V0U2tpbkluZGV4KHRpZXIpKSk7XHJcbiAgICB9XHJcbiAgICAvKiotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3mk43kvZznm7jlhbMtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t6Kem5pG456e75Yqo5LqL5Lu2LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgLy8gbGVhdGVyTnVtOiBudW1iZXIgPSAwOy8v5bu26L+f5pWw5o2u5pKt5pS+5Yqo55S7XHJcbiAgICAvLyBsZWF0ZXJTcGVlZDogbnVtYmVyID0gNTtcclxuXHJcbiAgICAvLyBuZXdQb3M6IGNjLlZlYzI7XHJcbiAgICAvLyBwb3NZVGVtcDogbnVtYmVyO1xyXG5cclxuICAgIC8vIHNwZWVkVHlwZTogU3BlZWRUeXBlID0gU3BlZWRUeXBlLlNUT1A7XHJcbiAgICAvLyBtb3ZlRGlyID0gY2MudjIoMCwgMSk7XHJcbiAgICAvLyAvL+aKhOWIq+S6uueahO+8jOacrOadpeacieS4pOenjemAn+W6pu+8jOeOsOWcqOWFiOeUqOS4gOS4quaVsOaNrlxyXG4gICAgLy8gbm9ybWFsU3BlZWQgPSA2MDA7XHJcbiAgICAvLyBmYXN0U3BlZWQgPSA2MDA7XHJcblxyXG4gICAgLy8gc3RvcFNwZWVkID0gMDtcclxuXHJcbiAgICAvLyBtb3ZlU3BlZWQgPSAwO1xyXG5cclxuXHJcbiAgICAvKipcclxuICAqIOenu+WKqFxyXG4gICovXHJcbiAgICAvLyBtb3ZlKCkge1xyXG4gICAgLy8gICAgIC8vIHRoaXMubm9kZS5hbmdsZSA9XHJcbiAgICAvLyAgICAgLy8gICBjYy5taXNjLnJhZGlhbnNUb0RlZ3JlZXMoTWF0aC5hdGFuMih0aGlzLm1vdmVEaXIueSwgdGhpcy5tb3ZlRGlyLngpKSAtIDkwO1xyXG5cclxuICAgIC8vICAgICAvLyBpZiAodGhpcy5yaWdpZGJvZHkpIHtcclxuICAgIC8vICAgICAvLyAgIHRoaXMuX2JvZHkuYXBwbHlGb3JjZVRvQ2VudGVyKFxyXG4gICAgLy8gICAgIC8vICAgICBjYy52Mih0aGlzLm1vdmVEaXIueCAqIDIwMCwgdGhpcy5tb3ZlRGlyLnkgKiAyMDApLFxyXG4gICAgLy8gICAgIC8vICAgICB0cnVlXHJcbiAgICAvLyAgICAgLy8gICApO1xyXG4gICAgLy8gICAgIC8vIH0gZWxzZSB7XHJcbiAgICAvLyAgICAgLy8gICBjb25zdCBvbGRQb3MgPSBjYy52MigpO1xyXG4gICAgLy8gICAgIC8vICAgdGhpcy5ub2RlLmdldFBvc2l0aW9uKG9sZFBvcyk7XHJcbiAgICAvLyAgICAgLy8gICBjb25zdCBuZXdQb3MgPSBvbGRQb3MuYWRkKHRoaXMubW92ZURpci5tdWwodGhpcy5fbW92ZVNwZWVkIC8gMTIwKSk7XHJcbiAgICAvLyAgICAgLy8gICB0aGlzLm5vZGUuc2V0UG9zaXRpb24obmV3UG9zKTtcclxuICAgIC8vICAgICAvLyB9XHJcblxyXG4gICAgLy8gICAgIGlmICh0aGlzLnNwZWVkVHlwZSAhPT0gU3BlZWRUeXBlLlNUT1ApIHtcclxuICAgIC8vICAgICAgICAgY29uc3Qgb2xkUG9zID0gY2MudjIoKTtcclxuICAgIC8vICAgICAgICAgdGhpcy5ub2RlLmdldFBvc2l0aW9uKG9sZFBvcyk7XHJcbiAgICAvLyAgICAgICAgIHRoaXMubmV3UG9zID0gb2xkUG9zLmFkZCh0aGlzLm1vdmVEaXIubXVsKHRoaXMubW92ZVNwZWVkIC8gMTIwKSk7XHJcbiAgICAvLyAgICAgICAgIHRoaXMubmV3UG9zLnkgPSBvbGRQb3MueTtcclxuICAgIC8vICAgICAgICAgdGhpcy5wb3NZVGVtcCA9IG9sZFBvcy55O1xyXG5cclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgICAgaWYgKHRoaXMubGVhdGVyTnVtID09IDApIHtcclxuICAgIC8vICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5tb3ZlRGF0YS51bnNoaWZ0KHRoaXMubmV3UG9zKTtcclxuXHJcbiAgICAvLyAgICAgfVxyXG5cclxuXHJcbiAgICAvLyAgICAgaWYgKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkubW92ZURhdGFbdGhpcy5sZWF0ZXJOdW0gKiB0aGlzLmxlYXRlclNwZWVkXSAhPSBudWxsKSB7XHJcbiAgICAvLyAgICAgICAgIGNvbnN0IG5ld1Bvc1RlcG0gPSBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLm1vdmVEYXRhW3RoaXMubGVhdGVyTnVtICogdGhpcy5sZWF0ZXJTcGVlZF07XHJcbiAgICAvLyAgICAgICAgIG5ld1Bvc1RlcG0ueT10aGlzLnBvc1lUZW1wO1xyXG4gICAgLy8gICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24obmV3UG9zVGVwbSk7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gICAgIGlmKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkubW92ZURhdGEubGVuZ3RoPjYwKXtcclxuXHJcbiAgICAvLyAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkubW92ZURhdGEuc3BsaWNlKDYwLEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkubW92ZURhdGEubGVuZ3RoLTYwKTtcclxuXHJcblxyXG4gICAgLy8gICAgIH1cclxuXHJcbiAgICAvLyAgICAgdGhpcy5ub2RlX3NoYWRvdy5zZXRQb3NpdGlvbihjYy52Mih0aGlzLm5vZGUueCArIHRoaXMucG9zLnggKiB0aGlzLnNldHVwX3NjYWxlLCB0aGlzLm5vZGUueSArIHRoaXMucG9zLnkgKiB0aGlzLnNldHVwX3NjYWxlKSk7XHJcbiAgICAvLyB9XHJcbiAgICAvLyBvblRvdWNoU3RhcnRCeUpveSgpIHsgfVxyXG5cclxuICAgIC8vIG9uVG91Y2hNb3ZlQnlKb3koZXZlbnQ6IGNjLkV2ZW50LkV2ZW50VG91Y2gsIGRhdGEpIHtcclxuICAgIC8vICAgICB0aGlzLnNwZWVkVHlwZSA9IGRhdGEuc3BlZWRUeXBlO1xyXG4gICAgLy8gICAgIHRoaXMubW92ZURpciA9IGRhdGEubW92ZURpc3RhbmNlO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIG9uVG91Y2hFbmRCeUpveShldmVudDogY2MuRXZlbnQuRXZlbnRUb3VjaCwgZGF0YSkge1xyXG4gICAgLy8gICAgIHRoaXMuc3BlZWRUeXBlID0gZGF0YS5zcGVlZFR5cGU7XHJcbiAgICAvLyB9XHJcbiAgICAvKiotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3mk43kvZznm7jlhbMtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t6Kem5pG45LqL5Lu2LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy/ml6fniYjlip/og71cclxuICAgIG9uVG91Y2hTdGFydChlOiBjYy5FdmVudC5FdmVudFRvdWNoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNIYXZlRGVCdWZmKEJ1ZmZJZC5Nb25zdGVyX1h1YW5ZdW4pICYmIHRoaXMuaGVyb190eXBlICE9IEhlcm9fVHlwZS5aaGVuRGUpIHtcclxuICAgICAgICAgICAgdGhpcy5pc19jYW5fdG91Y2ggPSBmYWxzZTtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCgxNzAwMDIpLCAxKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5za2lsbF9jZF90aW1lID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmlzX2Nhbl90b3VjaCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jbGlja19yZW1haW4gPiAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCgxNzAwMDEpLCAxKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zdGF0ZSAhPSBHYW1lU3RhdGUuR2FtZV9QbGF5aW5nKVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc19jYW5fdG91Y2ggPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuaXNfYXV0b19yZWxlYXNlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmNsaWNrX3JlbWFpbiA9IDE7XHJcbiAgICAgICAgU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkucmVsZWFzZVNraWxsUmVzdWx0KGZhbHNlKTtcclxuICAgICAgICBsZXQgcG9zID0gU2t5TWFuYWdlci5nZXRJbnN0YW5jZSgpLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIoZS5nZXRMb2NhdGlvbigpKTtcclxuICAgICAgICAvL+WmguaenOWPr+S7pemHiuaUvu+8jOaYvuekuuaMh+ekuuWZqFxyXG4gICAgICAgIHN3aXRjaCAodGhpcy5za2lsbF90aXBfdHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIFNraWxsVGlwVHlwZS5GdWxsOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNraWxsX3RpcC5ub2RlLnNldFBvc2l0aW9uKGNjLnYyKDAsIC1jYy53aW5TaXplLmhlaWdodCAvIDIpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxfdGlwLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNraWxsX3RpcC5zZXRJc0NhblJlbGVhc2UoZmFsc2UpO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFNraWxsVGlwVHlwZS5DaXJjbGU6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxfdGlwLm5vZGUuc2V0UG9zaXRpb24ocG9zKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxfdGlwLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxfdGlwLnNldElzQ2FuUmVsZWFzZShmYWxzZSk7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgU2tpbGxUaXBUeXBlLlJlY3Q6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxfdGlwLm5vZGUuc2V0UG9zaXRpb24ocG9zKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxfdGlwLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxfdGlwLnNldElzQ2FuUmVsZWFzZShmYWxzZSk7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgU2tpbGxUaXBUeXBlLkRpcjoge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5za2lsbF90aXAubm9kZS5zZXRQb3NpdGlvbih0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNraWxsX3RpcC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNraWxsX3RpcC5zZXRJc0NhblJlbGVhc2UoZmFsc2UpO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+aYvuekuuiMg+WbtOaMh+ekuuWZqFxyXG4gICAgICAgIFNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dTa2lsbFJhbmdlKHRoaXMubm9kZS55LCB0aGlzLmNhc3RpbmdfZGlzdGFuY2UpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uVG91Y2hNb3ZlKGU6IGNjLkV2ZW50LkV2ZW50VG91Y2gpIHtcclxuICAgICAgICBpZiAodGhpcy5pc19jYW5fdG91Y2ggPT0gZmFsc2UgfHwgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zdGF0ZSAhPSBHYW1lU3RhdGUuR2FtZV9QbGF5aW5nKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgbGV0IHBvcyA9IFNreU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKGUuZ2V0TG9jYXRpb24oKSk7XHJcbiAgICAgICAgaWYgKCF0aGlzLnRvdWNoX3JlY3QuY29udGFpbnMocG9zKSkge1xyXG4gICAgICAgICAgICB0aGlzLmlzX2F1dG9fcmVsZWFzZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzd2l0Y2ggKHRoaXMuc2tpbGxfdGlwX3R5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBTa2lsbFRpcFR5cGUuRnVsbDoge1xyXG5cclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBTa2lsbFRpcFR5cGUuQ2lyY2xlOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNraWxsX3RpcC5ub2RlLnNldFBvc2l0aW9uKHBvcyk7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgU2tpbGxUaXBUeXBlLlJlY3Q6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxfdGlwLm5vZGUuc2V0UG9zaXRpb24ocG9zKTtcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBTa2lsbFRpcFR5cGUuRGlyOiB7XHJcblxyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHBvcy55ID4gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5lbmVteV9hdHRfeSkge1xyXG4gICAgICAgICAgICBsZXQgZGlzdGFuY2UgPSBwb3MueSAtIHRoaXMubm9kZS55O1xyXG4gICAgICAgICAgICBpZiAoZGlzdGFuY2UgPD0gdGhpcy5jYXN0aW5nX2Rpc3RhbmNlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNraWxsX3RpcC5zZXRJc0NhblJlbGVhc2UodHJ1ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNraWxsX3RpcC5zZXRJc0NhblJlbGVhc2UoZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5za2lsbF90aXAuc2V0SXNDYW5SZWxlYXNlKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25Ub3VjaEVuZChlOiBjYy5FdmVudC5FdmVudFRvdWNoKSB7XHJcbiAgICAgICAgU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkucmVsZWFzZVNraWxsUmVzdWx0KHRydWUpO1xyXG4gICAgICAgIFNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmhpZGVTa2lsbFJhbmdlKCk7XHJcbiAgICAgICAgdGhpcy5za2lsbF90aXAubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBpZiAodGhpcy5pc19jYW5fdG91Y2ggPT0gZmFsc2UgfHwgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zdGF0ZSAhPSBHYW1lU3RhdGUuR2FtZV9QbGF5aW5nKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgbGV0IHBvcyA9IFNreU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKGUuZ2V0TG9jYXRpb24oKSk7XHJcbiAgICAgICAgLy/liKTmlq3lnZDmoIdcclxuICAgICAgICBpZiAocG9zLnkgPiBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmVuZW15X2F0dF95KSB7XHJcbiAgICAgICAgICAgIGxldCBkaXN0YW5jZSA9IHBvcy55IC0gdGhpcy5ub2RlLnk7XHJcbiAgICAgICAgICAgIGlmIChkaXN0YW5jZSA8PSB0aGlzLmNhc3RpbmdfZGlzdGFuY2UpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVsZWFzZVNraWxsKHBvcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc19hdXRvX3JlbGVhc2UpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXJ0QXV0b1JlbGVhc2UoKSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTQwMDIzKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25Ub3VjaENhbmNlbChlOiBjYy5FdmVudC5FdmVudFRvdWNoKSB7XHJcbiAgICAgICAgU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkucmVsZWFzZVNraWxsUmVzdWx0KHRydWUpO1xyXG4gICAgICAgIFNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmhpZGVTa2lsbFJhbmdlKCk7XHJcbiAgICAgICAgdGhpcy5za2lsbF90aXAubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBpZiAodGhpcy5pc19jYW5fdG91Y2ggPT0gZmFsc2UgfHwgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zdGF0ZSAhPSBHYW1lU3RhdGUuR2FtZV9QbGF5aW5nKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgbGV0IHBvcyA9IFNreU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKGUuZ2V0TG9jYXRpb24oKSk7XHJcbiAgICAgICAgaWYgKHBvcy55ID4gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5lbmVteV9hdHRfeSkge1xyXG4gICAgICAgICAgICBsZXQgZGlzdGFuY2UgPSBwb3MueSAtIHRoaXMubm9kZS55O1xyXG4gICAgICAgICAgICBpZiAoZGlzdGFuY2UgPD0gdGhpcy5jYXN0aW5nX2Rpc3RhbmNlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbGVhc2VTa2lsbChwb3MpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNfYXV0b19yZWxlYXNlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0QXV0b1JlbGVhc2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGFydEF1dG9SZWxlYXNlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIC8v5om+5oCq77yM5om+5LiN5Yiw5bCx5LiN5pS+XHJcbiAgICAgICAgbGV0IGVuZW15cyA9IE1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TW9uc3RlcnNGb3JOZWFyZXN0QnlTa2lsbCgxLCB0aGlzLm5vZGUueSwgdGhpcy5jYXN0aW5nX2Rpc3RhbmNlKTtcclxuICAgICAgICBpZiAoZW5lbXlzKSB7XHJcbiAgICAgICAgICAgIC8v5pyA5YmN55qE5pWM5Lq6XHJcbiAgICAgICAgICAgIGxldCBlbmVteVBvcyA9IGVuZW15c1swXS5nZXRDb21wb25lbnQoTW9uc3RlcikuZ2V0Q2VudGVyUG9zKCk7XHJcbiAgICAgICAgICAgIHRoaXMucmVsZWFzZVNraWxsKGVuZW15UG9zKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKirop6bmkbjnmoTkvY3nva4gKi9cclxuICAgIHJlbGVhc2VTa2lsbCh0b3VjaFBvczogY2MuVmVjMikge1xyXG4gICAgICAgIGlmIChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX3N0YXRlICE9IEdhbWVTdGF0ZS5HYW1lX1BsYXlpbmcpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB0aGlzLnVzZV9za2lsbF9udW0rKztcclxuICAgICAgICAvL3RoaXMubXBfcHJvZ3Jlc3Muc2hvd0xpZ2h0KCk7XHJcbiAgICAgICAgaWYgKHRoaXMuc2tpbGxfY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgdGhpcy5za2lsbF9jYWxsYmFjayh0b3VjaFBvcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucmVzZXRDRCgpO1xyXG4gICAgICAgIFRhc2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW1pdFRhc2soVGFza0l0ZW0u6YeK5pS+WOasoeS6uueJqeaKgOiDvSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGdldFNraWxsUmVsZWFzZUlkKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaGVyb190eXBlICogMTAwMDAgKyB0aGlzLnVzZV9za2lsbF9udW07XHJcbiAgICB9XHJcblxyXG4gICAgLyoq6I635b6X5a2Q5by555Sf5oiQ55qE5L2N572uICovXHJcbiAgICBnZXRDcmVhdGVCdWxsZXRQb3MoKTogY2MuVmVjMiB7XHJcbiAgICAgICAgbGV0IHBvcyA9IHRoaXMuYnVsbGV0X3Bvc1t0aGlzLmN1cl9mYW5neGlhbmddO1xyXG4gICAgICAgIHJldHVybiBjYy52Mih0aGlzLm5vZGUueCArIHBvcy54ICogdGhpcy5ub2RlLnNjYWxlWCwgdGhpcy5ub2RlLnkgKyBwb3MueSAqIHRoaXMubm9kZS5zY2FsZVkpO1xyXG4gICAgfVxyXG4gICAgLyoq6I635b6X5a2Q5by555u45a+56Iux6ZuE55qE5L2N572uICovXHJcbiAgICBnZXRIZXJvQnVsbGV0UG9zKCk6IGNjLlZlYzIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmJ1bGxldF9wb3NbdGhpcy5jdXJfZmFuZ3hpYW5nXTtcclxuICAgIH1cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3ml6DlsL1idWZmLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgLyoqXHJcbiAgICAgKiDmt7vliqDml6DlsL1idWZmXHJcbiAgICAgKiBAcGFyYW0gZW5kbGVzc0J1ZmYgRW5kbGVzc0J1ZmbnmoTlrp7kvotcclxuICAgICAqL1xyXG4gICAgLy8gIEFkbWluaXN0cmF0b3I6XHJcbiAgICAvLyAgMS7mlLvlh7vlipsreCVcclxuICAgIC8vICAyLuaUu+mAnyt4JVxyXG4gICAgLy8gIDMu5pq05Ye75YC8K3hcclxuICAgIC8vICA0LuaatOWHu+WinuW5hSt4JVxyXG4gICAgLy8gIDUu6Ziy5b6h5YqbK3glXHJcbiAgICAvLyAgNi7mnIDlpKfnlJ/lkb3lgLwreCUgXHJcbiAgICAvLyAgNy7mr4/np5Llm57lpI3mnIDlpKfnlJ/lkb3lgLx4JVxyXG4gICAgLy8gIDgu56uL5Y2z5Zue5aSN5pyA5aSn55Sf5ZG95YC8eCXvvIjms6jvvJror6VidWZm55Sf5pWI5ZCO56uL5Y2z5raI5aSx77yJXHJcbiAgICAvLyAgOS7ov57nu63mlLvlh7sg5qaC546HeCVcclxuICAgIC8vICAxMC7kuLvliqjmioDog73lhrfljbTml7bpl7Tlh4/lsJF4JVxyXG4gICAgLy8gIDExLuacgOe7iOS8pOWus+WKoOaIkHglXHJcbiAgICBhZGRFbmRsZXNzQnVmZihlbmRsZXNzQnVmZjogRW5kbGVzc0J1ZmYpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNIYXZlRW5kbGVzc0lkKGVuZGxlc3NCdWZmLmlkKSkge1xyXG4gICAgICAgICAgICB0aGlzLm1hcF9lbmRsZXNzX2J1ZmYuc2V0KGVuZGxlc3NCdWZmLmlkLCBlbmRsZXNzQnVmZik7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoZW5kbGVzc0J1ZmYudHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBFbmRsZXNzQnVmZlR5cGUuQXR0YWNrOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZXJvX2RhdGEudG90YWxfYXR0YWNrICs9IHRoaXMuaGVyb19kYXRhLmZpeGVkX2F0dGNrICogZW5kbGVzc0J1ZmYudmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBFbmRsZXNzQnVmZlR5cGUuQXR0YWNrU3BlZWQ6IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZUF0dGFja1NwZWVkKGVuZGxlc3NCdWZmLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEVuZGxlc3NCdWZmVHlwZS5Dcml0UmF0ZToge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVyb19kYXRhLkNyaXRpY2FsICs9IGVuZGxlc3NCdWZmLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgRW5kbGVzc0J1ZmZUeXBlLkNyaXREYW1hZ2U6IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlcm9fZGF0YS5FeHRyYUNyaXRpY2FsICs9IGVuZGxlc3NCdWZmLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgRW5kbGVzc0J1ZmZUeXBlLkRlZmVuc2U6IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlcm9fZGF0YS50b3RhbF9kZWZlbnNlICs9IHRoaXMuaGVyb19kYXRhLmZpeF9kZWZlbnNlICogZW5kbGVzc0J1ZmYudmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBFbmRsZXNzQnVmZlR5cGUuSGVhbHRoTWF4OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZXJvX2RhdGEudG90YWxfaHAgKz0gdGhpcy5oZXJvX2RhdGEuZml4ZWRfaHAgKiBlbmRsZXNzQnVmZi52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIuWfjuWimeWKoOihgDpcIix0aGlzLmhlcm9fZGF0YS50b3RhbF9ocCx0aGlzLmhlcm9fZGF0YS5maXhlZF9ocCxlbmRsZXNzQnVmZi52YWx1ZSlcclxuICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlZnJlc2hNYWluV2FsbERhdGEoKVxyXG4gICAgICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgRW5kbGVzc0J1ZmZUeXBlLkhlYWx0aFNlYzoge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBidWZmRGF0YSA9IG5ldyBCdWZmRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLmJ1ZmZfaWQgPSBCdWZmSWQuV2FsbF9FbmRsZXNzX0FkZF9ocCArIHRoaXMuaGVyb190eXBlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLmJ1ZmZfdHlwZSA9IEJ1ZmZUeXBlLkdhaW47XHJcbiAgICAgICAgICAgICAgICAgICAgYnVmZkRhdGEuYnVmZl92YWx1ZSA9IFtlbmRsZXNzQnVmZi52YWx1ZSAqIFdhbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWFpbldhbGwoKS5nZXRNYXhIcCgpXTtcclxuICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5yZW1haW5fdGltZSA9IDY2NjY2NjY2O1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGJ1ZmZEYXRhLmdhbWVfZWZmZWN0X2lkPUdhbWVFZmZlY3RJZC5jaGFuZ19tYW9fc2hvdV9za2lsbF9hY3RpdmVfMTtcclxuICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5yZWNvdmVyeV9qaWFuZ2VfdGltZSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgV2FsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYWluV2FsbCgpLmFkZEJ1ZmYoYnVmZkRhdGEpXHJcbiAgICAgICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBFbmRsZXNzQnVmZlR5cGUuSGVhbHRoVGVhbUFkZDoge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGxldCBocD1XYWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1haW5XYWxsKCkuZ2V0Q3VySHAoKSsoZW5kbGVzc0J1ZmYudmFsdWUqV2FsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYWluV2FsbCgpLmdldE1heEhwKCkpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gV2FsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYWluV2FsbCgpLmNoYW5nZUhwKGhwKVxyXG4gICAgICAgICAgICAgICAgICAgIC8v5Y+K5pe255SoXHJcbiAgICAgICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBFbmRsZXNzQnVmZlR5cGUuRG91YmxlQXR0YWNrOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/ov57nu63mlLvlh7ss5LiN55So5YqgYnVmZlxyXG4gICAgICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgRW5kbGVzc0J1ZmZUeXBlLkFjdGl2ZVNraWxsQ2Q6IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNraWxsX3RvdGFsX3RpbWUgLT0gdGhpcy5oZXJvX2RhdGEuZ2V0U2tpbGxDb2xkRG93bihTa2lsbFR5cGUuQWN0aXZlKSAqIGVuZGxlc3NCdWZmLnZhbHVlXHJcbiAgICAgICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBFbmRsZXNzQnVmZlR5cGUuQWRkRGFtYWdlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZXJvX2RhdGEuYWxsX2luY3JlYXNlX2RhbWFnZSArPSBlbmRsZXNzQnVmZi52YWx1ZTtcclxuICAgICAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOWIoOmZpOaXoOWwvWJ1ZmZcclxuICAgICAqIEBwYXJhbSBpZCDml6DlsL1idWZmLWlkXHJcbiAgICAgKi9cclxuICAgIHJlbW92ZUVuZGxlc3NCdWZmKGlkOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNIYXZlRW5kbGVzc0lkKGlkKSkge1xyXG4gICAgICAgICAgICBsZXQgZW5kbGVzc0J1ZmYgPSB0aGlzLm1hcF9lbmRsZXNzX2J1ZmYuZ2V0KGlkKTtcclxuICAgICAgICAgICAgdGhpcy5tYXBfZW5kbGVzc19idWZmLmRlbGV0ZShpZCk7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoZW5kbGVzc0J1ZmYudHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBFbmRsZXNzQnVmZlR5cGUuQXR0YWNrOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZXJvX2RhdGEudG90YWxfYXR0YWNrIC09IHRoaXMuaGVyb19kYXRhLmZpeGVkX2F0dGNrICogZW5kbGVzc0J1ZmYudmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBFbmRsZXNzQnVmZlR5cGUuQXR0YWNrU3BlZWQ6IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZUF0dGFja1NwZWVkKC1lbmRsZXNzQnVmZi52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBFbmRsZXNzQnVmZlR5cGUuQ3JpdFJhdGU6IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlcm9fZGF0YS5Dcml0aWNhbCAtPSBlbmRsZXNzQnVmZi52YWx1ZTtcclxuICAgICAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEVuZGxlc3NCdWZmVHlwZS5Dcml0RGFtYWdlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZXJvX2RhdGEuRXh0cmFDcml0aWNhbCAtPSBlbmRsZXNzQnVmZi52YWx1ZTtcclxuICAgICAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEVuZGxlc3NCdWZmVHlwZS5EZWZlbnNlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZXJvX2RhdGEudG90YWxfZGVmZW5zZSAtPSB0aGlzLmhlcm9fZGF0YS5maXhfZGVmZW5zZSAqIGVuZGxlc3NCdWZmLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgRW5kbGVzc0J1ZmZUeXBlLkhlYWx0aE1heDoge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVyb19kYXRhLnRvdGFsX2hwIC09IHRoaXMuaGVyb19kYXRhLmZpeGVkX2hwICogZW5kbGVzc0J1ZmYudmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBFbmRsZXNzQnVmZlR5cGUuSGVhbHRoU2VjOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgV2FsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYWluV2FsbCgpLnN1YkJ1ZmYoQnVmZklkLldhbGxfRW5kbGVzc19BZGRfaHAgKyB0aGlzLmhlcm9fdHlwZSlcclxuICAgICAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEVuZGxlc3NCdWZmVHlwZS5IZWFsdGhUZWFtQWRkOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgRW5kbGVzc0J1ZmZUeXBlLkRvdWJsZUF0dGFjazoge1xyXG5cclxuICAgICAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEVuZGxlc3NCdWZmVHlwZS5BY3RpdmVTa2lsbENkOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5za2lsbF90b3RhbF90aW1lICs9IHRoaXMuaGVyb19kYXRhLmdldFNraWxsQ29sZERvd24oU2tpbGxUeXBlLkFjdGl2ZSkgKiBlbmRsZXNzQnVmZi52YWx1ZVxyXG4gICAgICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgRW5kbGVzc0J1ZmZUeXBlLkFkZERhbWFnZToge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVyb19kYXRhLmFsbF9pbmNyZWFzZV9kYW1hZ2UgLT0gZW5kbGVzc0J1ZmYudmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoq5piv5ZCm5oul5pyJ5LiA5Liq5peg5bC9YnVmZiBpZCAqL1xyXG4gICAgaXNIYXZlRW5kbGVzc0lkKGlkOiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIisrKysrKysrXCIsaWQsdGhpcy5tYXBfZW5kbGVzc19idWZmKVxyXG4gICAgICAgIHJldHVybiB0aGlzLm1hcF9lbmRsZXNzX2J1ZmYuaGFzKGlkKTtcclxuICAgIH1cclxuICAgIC8qKuaYr+WQpuaLpeacieS4gOS4quaXoOWwvWJ1ZmYg57G75Z6LICovXHJcbiAgICBnZXRFbmRsZXNzQnlUeXBlKHR5cGU6IG51bWJlcik6IEVuZGxlc3NCdWZmIHtcclxuICAgICAgICBsZXQgYnVmZjogRW5kbGVzc0J1ZmYgPSBudWxsO1xyXG4gICAgICAgIHRoaXMubWFwX2VuZGxlc3NfYnVmZi5mb3JFYWNoKCh2LCBrKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh2LnR5cGUgPT0gdHlwZSkge1xyXG4gICAgICAgICAgICAgICAgYnVmZiA9IHY7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gYnVmZjtcclxuICAgIH1cclxuICAgIC8qKuiOt+W+l+S4gOS4quaXoOWwvWJ1ZmYgKi9cclxuICAgIGdldEVuZGxlc3NCdWZmKGlkOiBudW1iZXIpOiBFbmRsZXNzQnVmZiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwX2VuZGxlc3NfYnVmZi5nZXQoaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUJVRkYtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIGFkZEJ1ZmYoYnVmZkRhdGE6IEJ1ZmZEYXRhKTogQnVmZlRpbWVyIHtcclxuICAgICAgICBsZXQgYnVmZklkID0gYnVmZkRhdGEuYnVmZl9pZDtcclxuICAgICAgICBpZiAoIXRoaXMuaXNIYXZlQnVmZihidWZmSWQpKSB7XHJcbiAgICAgICAgICAgIC8v5re75YqgYnVmZuiKgueCueWSjOeJueaViCAgICAgICBcclxuICAgICAgICAgICAgbGV0IG5vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgICAgICAgICBpZiAoYnVmZkRhdGEuZ2FtZV9lZmZlY3RfaWQgPT0gR2FtZUVmZmVjdElkLk51bGwpIHtcclxuICAgICAgICAgICAgICAgIG5vZGUgPSBuZXcgY2MuTm9kZShidWZmRGF0YS5nYW1lX2VmZmVjdF9pZC50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG5vZGUgPSBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0Rm9yUGFyZW50KGJ1ZmZEYXRhLmdhbWVfZWZmZWN0X2lkLCB0aGlzLnh1YW55dW5fcG9zLCB0aGlzLm5vZGUpO1xyXG4gICAgICAgICAgICAgICAgLy9ub2RlLnNjYWxlPXRoaXMubm9kZS53aWR0aC8yMDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy/mt7vliqBidWZmXHJcbiAgICAgICAgICAgIGxldCBidWZmOiBCdWZmVGltZXIgPSBub2RlLmdldENvbXBvbmVudChCdWZmVGltZXIpO1xyXG4gICAgICAgICAgICBpZiAoIWJ1ZmYpIHtcclxuICAgICAgICAgICAgICAgIGJ1ZmYgPSBub2RlLmFkZENvbXBvbmVudChCdWZmVGltZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJ1ZmYuaW5pdChidWZmRGF0YSk7XHJcbiAgICAgICAgICAgIC8vYnVmZumUgOavgeaXtuWkhOeQhlxyXG4gICAgICAgICAgICBidWZmLmFkZERlc3Ryb3lMaXN0ZW4odGhpcy5vbkJ1ZmZEZXN0b3J5LmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICAvL2J1Zmbmsrvnlpfop6blj5Hml7blpITnkIZcclxuICAgICAgICAgICAgaWYgKGJ1ZmZEYXRhLnJlY292ZXJ5X2ppYW5nZV90aW1lID4gMCkge1xyXG4gICAgICAgICAgICAgICAgYnVmZi5hZGRSZWNvdmVyeUxpc3Rlbih7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9SZWNvdmVyeTogKG51bTogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFdhbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWFpbldhbGwoKS5jaGFuZ2VIcChudW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sIGJ1ZmYuZ2V0Rmlyc3RCdWZmVmFsdWUoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5oZXJvX2J1ZmYuc2V0KGJ1ZmZEYXRhLmJ1ZmZfaWQsIGJ1ZmYpO1xyXG4gICAgICAgICAgICBub2RlLnNjYWxlID0gMSAvIHRoaXMuc2V0dXBfc2NhbGU7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoYnVmZklkKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJ1ZmZJZC5QZXQzX0ppYVN1OlxyXG4gICAgICAgICAgICAgICAgY2FzZSBCdWZmSWQuSGVyb19NZWlNb19Hb25nU3U6XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJ1ZmZJZC5IZXJvX1poZW5EZV9Hb25nc3U6XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJ1ZmZJZC5IZXJvX0t1YW5nWmhhblNoaV9EYVpoYW86XHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZUF0dGFja1NwZWVkKGJ1ZmZEYXRhLmJ1ZmZfdmFsdWVbMF0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJ1ZmZJZC5IZXJvX0NoYW5nTWFvU2hvd19Hb25nU3U6IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZUF0dGFja1NwZWVkKGJ1ZmZEYXRhLmJ1ZmZfdmFsdWVbMF0pO1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUuc2V0UG9zaXRpb24oY2MudjIoMCwgMCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5paw5aKe5LiA5Liq6IOM5ZCO54m55pWIXHJcbiAgICAgICAgICAgICAgICAgICAgYnVmZi5hZGRUZVhpYW8oR2FtZUVmZmVjdElkLmNoYW5nX21hb19zaG91X3NraWxsX2FjdGl2ZV8yLCB0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKSwgY2MuZmluZCgnQ2FudmFzL0hlcm9fU2hhZG93X1Jvb3QnKSlcclxuICAgICAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJ1ZmZJZC5IZXJvX1poZW5EZV9CYW9KaU1pbmdaaG9uZ0x2OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZXJvX2RhdGEuY3JpdF9leCArPSBidWZmRGF0YS5idWZmX3ZhbHVlWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVyb19kYXRhLmhpdF9leCArPSBidWZmRGF0YS5idWZmX3ZhbHVlWzBdO1xyXG4gICAgICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmFkZEJ1ZmZTdGF0ZShidWZmSWQsIGJ1ZmZEYXRhLnJlbWFpbl90aW1lKTtcclxuICAgICAgICAgICAgcmV0dXJuIGJ1ZmY7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IGJ1ZmYgPSB0aGlzLmhlcm9fYnVmZi5nZXQoYnVmZklkKTtcclxuICAgICAgICAgICAgYnVmZi5yZWZyZXNoQnVmZihidWZmRGF0YSk7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkQnVmZlN0YXRlKGJ1ZmZJZCwgYnVmZkRhdGEucmVtYWluX3RpbWUpO1xyXG4gICAgICAgICAgICByZXR1cm4gYnVmZjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgc3ViQnVmZihidWZmSWQ6IEJ1ZmZJZCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCBidWZmID0gdGhpcy5oZXJvX2J1ZmYuZ2V0KGJ1ZmZJZCk7XHJcbiAgICAgICAgaWYgKGJ1ZmYpIHtcclxuICAgICAgICAgICAgYnVmZi5kZXN0cm95U2VsZigpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQnVmZkRlc3RvcnkoYnVmZkRhdGE6IEJ1ZmZEYXRhKSB7XHJcbiAgICAgICAgdGhpcy5oZXJvX2J1ZmYuZGVsZXRlKGJ1ZmZEYXRhLmJ1ZmZfaWQpO1xyXG4gICAgICAgIHN3aXRjaCAoYnVmZkRhdGEuYnVmZl9pZCkge1xyXG4gICAgICAgICAgICBjYXNlIEJ1ZmZJZC5QZXQzX0ppYVN1OlxyXG4gICAgICAgICAgICBjYXNlIEJ1ZmZJZC5IZXJvX01laU1vX0dvbmdTdTpcclxuICAgICAgICAgICAgY2FzZSBCdWZmSWQuSGVyb19LdWFuZ1poYW5TaGlfRGFaaGFvOlxyXG4gICAgICAgICAgICBjYXNlIEJ1ZmZJZC5IZXJvX1poZW5EZV9Hb25nc3U6XHJcbiAgICAgICAgICAgIGNhc2UgQnVmZklkLkhlcm9fQ2hhbmdNYW9TaG93X0dvbmdTdToge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VBdHRhY2tTcGVlZCgtYnVmZkRhdGEuYnVmZl92YWx1ZVswXSk7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQnVmZklkLkhlcm9fWmhlbkRlX0Jhb0ppTWluZ1pob25nTHY6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGVyb19kYXRhLmNyaXRfZXggLT0gYnVmZkRhdGEuYnVmZl92YWx1ZVswXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGVyb19kYXRhLmhpdF9leCAtPSBidWZmRGF0YS5idWZmX3ZhbHVlWzBdO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpc0hhdmVCdWZmKGJ1ZmY6IEJ1ZmZJZCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmhlcm9fYnVmZi5oYXMoYnVmZik7XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlQWxsQnVmZigpIHtcclxuICAgICAgICB0aGlzLmhlcm9fYnVmZi5mb3JFYWNoKChidWZmOiBCdWZmVGltZXIpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zdWJCdWZmKGJ1ZmYuZ2V0QnVmZklkKCkpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG5cclxuICAgIGFkZERlQnVmZihidWZmRGF0YTogQnVmZkRhdGEsIGluc2lnaHQ6IG51bWJlciA9IDApOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNIYXZlRGVCdWZmKGJ1ZmZEYXRhLmJ1ZmZfaWQpKSB7XHJcbiAgICAgICAgICAgIC8v5o6n5Yi257G755qEZGVidWZm6ZyA6KaB5qC55o2u6Z+n5oCn5p2l5a6e546w5YW35L2T55qE5pWI5p6cXHJcbiAgICAgICAgICAgIGlmIChidWZmRGF0YS5idWZmX3R5cGUgPT0gQnVmZlR5cGUuVmVydGlnbykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VyX3RvdWdobmVzcyA+PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaGVyb190eXBlICE9IEhlcm9fVHlwZS5aaGVuRGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1wX3Byb2dyZXNzLnNldERpc2FibGUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuaGlkZVNraWxsUmFuZ2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNraWxsX3RpcC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5nb25namlfamlzaHUgPSAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zcGluZS5wYXVzZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc19jYW5fdG91Y2ggPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGlmIChpbnNpZ2h0ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLnJlbWFpbl90aW1lID0gSW5qdXJlZERhdGEuY2FsY0NvbnRyb2xUaW1lKGJ1ZmZEYXRhLnJlbWFpbl90aW1lLCB0aGlzLmN1cl90b3VnaG5lc3MsIGluc2lnaHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMueHVhbnl1bl9jYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMueHVhbnl1bl9jYWxsYmFjayh0cnVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFdhbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWFpbldhbGwoKS5zaG93VmVydGlnbyhidWZmRGF0YS5yZW1haW5fdGltZSk7XHJcbiAgICAgICAgICAgICAgICAvL+WFs+mXreaXtuWBnFxyXG4gICAgICAgICAgICAgICAgU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0VGltZVN0b3AoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXNTa2lsbFN0YXRlKGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL+a3u+WKoGJ1ZmboioLngrnlkoznibnmlYggICAgICAgXHJcbiAgICAgICAgICAgIGxldCBub2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgICAgICAgICAgaWYgKGJ1ZmZEYXRhLmdhbWVfZWZmZWN0X2lkID09IEdhbWVFZmZlY3RJZC5OdWxsKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlID0gbmV3IGNjLk5vZGUoYnVmZkRhdGEuZ2FtZV9lZmZlY3RfaWQudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBub2RlID0gR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEZvclBhcmVudChidWZmRGF0YS5nYW1lX2VmZmVjdF9pZCwgdGhpcy54dWFueXVuX3BvcywgdGhpcy5ub2RlKTtcclxuICAgICAgICAgICAgICAgIG5vZGUuc2NhbGUgPSB0aGlzLm5vZGUud2lkdGggLyAyMDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy/mt7vliqBidWZmXHJcbiAgICAgICAgICAgIGxldCBidWZmOiBCdWZmVGltZXIgPSBub2RlLmdldENvbXBvbmVudChCdWZmVGltZXIpO1xyXG4gICAgICAgICAgICBpZiAoIWJ1ZmYpIHtcclxuICAgICAgICAgICAgICAgIGJ1ZmYgPSBub2RlLmFkZENvbXBvbmVudChCdWZmVGltZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJ1ZmYuaW5pdChidWZmRGF0YSk7XHJcbiAgICAgICAgICAgIC8vYnVmZumUgOavgeaXtuWkhOeQhlxyXG4gICAgICAgICAgICBidWZmLmFkZERlc3Ryb3lMaXN0ZW4odGhpcy5vbkRlQnVmZkRlc3RvcnkuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgIHRoaXMuaGVyb19kZWJ1ZmYuc2V0KGJ1ZmZEYXRhLmJ1ZmZfaWQsIGJ1ZmYpO1xyXG4gICAgICAgICAgICBub2RlLnNjYWxlID0gMSAvIHRoaXMuc2V0dXBfc2NhbGU7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoYnVmZkRhdGEuYnVmZl9pZCkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBCdWZmSWQuQm9zczZfU2tpbGxfMl9qaWFuZ29uZ3N1OlxyXG4gICAgICAgICAgICAgICAgY2FzZSBCdWZmSWQuQm9zczNfSklBTl9Hb25nU3U6IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZUF0dGFja1NwZWVkKC1idWZmRGF0YS5idWZmX3ZhbHVlWzBdKTtcclxuICAgICAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJ1ZmZJZC5Cb3NzOF9Ta2lsbF8yX2F0dGFjazoge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVyb19kYXRhLnRvdGFsX2F0dGFjayAtPSBidWZmRGF0YS5idWZmX3ZhbHVlWzBdICogdGhpcy5oZXJvX2RhdGEuZml4ZWRfYXR0Y2s7XHJcbiAgICAgICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuYWRkRGVCdWZmU3RhdGUoYnVmZkRhdGEuYnVmZl9pZCwgYnVmZkRhdGEucmVtYWluX3RpbWUpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgYnVmZiA9IHRoaXMuaGVyb19kZWJ1ZmYuZ2V0KGJ1ZmZEYXRhLmJ1ZmZfaWQpO1xyXG4gICAgICAgICAgICBidWZmLnJlZnJlc2hCdWZmKGJ1ZmZEYXRhKTtcclxuICAgICAgICAgICAgdGhpcy5hZGREZUJ1ZmZTdGF0ZShidWZmRGF0YS5idWZmX2lkLCBidWZmRGF0YS5yZW1haW5fdGltZSk7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoYnVmZkRhdGEuYnVmZl9pZCkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBCdWZmSWQuQm9zczZfU2tpbGxfMl9qaWFuZ29uZ3N1OlxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJ1ZmYuZ2V0Rmxvb3JOdW0oKSA8IGJ1ZmZEYXRhLm1heF9mbG9vcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VBdHRhY2tTcGVlZCgtYnVmZkRhdGEuYnVmZl92YWx1ZVswXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWOu+mZpOS4gOS4qmRlYnVmZlxyXG4gICAgICogQHBhcmFtIGJ1ZmYgZGVidWZm57G75Z6LXHJcbiAgICAgKiBAcGFyYW0gaXNOZWVkUmVjeWNsZSDmmK/lkKbpnIDopoHosIPnlKjlm57mlLZcclxuICAgICAqIEByZXR1cm5zIFxyXG4gICAgICovXHJcbiAgICBzdWJEZUJ1ZmYoYnVmZklkOiBCdWZmSWQpOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgYnVmZiA9IHRoaXMuaGVyb19kZWJ1ZmYuZ2V0KGJ1ZmZJZCk7XHJcbiAgICAgICAgaWYgKGJ1ZmYpIHtcclxuICAgICAgICAgICAgYnVmZi5kZXN0cm95U2VsZigpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRGVCdWZmRGVzdG9yeShidWZmRGF0YTogQnVmZkRhdGEpIHtcclxuICAgICAgICAvLyBsZXQgYnVmZlN0YXRlPXRoaXMubWFwX2RlYnVmZl9zdGF0ZS5nZXQoQnVmZlN0YXRlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldERlQnVmZlR5cGUoYnVmZkRhdGEuYnVmZl9pZCkpO1xyXG4gICAgICAgIC8vIGlmKGJ1ZmZTdGF0ZSl7XHJcbiAgICAgICAgLy8gICAgIGJ1ZmZTdGF0ZS5kZXN0cm95U2VsZigpO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICB0aGlzLmhlcm9fZGVidWZmLmRlbGV0ZShidWZmRGF0YS5idWZmX2lkKTtcclxuICAgICAgICBzd2l0Y2ggKGJ1ZmZEYXRhLmJ1ZmZfaWQpIHtcclxuICAgICAgICAgICAgY2FzZSBCdWZmSWQuTW9uc3Rlcl9YdWFuWXVuOiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5oZXJvX3R5cGUgIT0gSGVyb19UeXBlLlpoZW5EZSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1wX3Byb2dyZXNzLnNldERpc2FibGUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nb25namlfamlzaHUgPSAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zcGluZS5wYXVzZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNfY2FuX3RvdWNoID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIFdhbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWFpbldhbGwoKS5oaWRlVmVydGlnbygpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMueHVhbnl1bl9jYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMueHVhbnl1bl9jYWxsYmFjayhmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQnVmZklkLkJvc3MzX0pJQU5fR29uZ1N1OiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZUF0dGFja1NwZWVkKGJ1ZmZEYXRhLmJ1ZmZfdmFsdWVbMF0pO1xyXG4gICAgICAgICAgICAgICAgbGV0IGJ1ZmZTdGF0ZSA9IHRoaXMubWFwX2RlYnVmZl9zdGF0ZS5nZXQoQnVmZlN0YXRlVHlwZS5BdHRhY2tTcGVlZCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYnVmZlN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnVmZlN0YXRlLmRlc3Ryb3lTZWxmKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQnVmZklkLkJvc3M2X1NraWxsXzJfamlhbmdvbmdzdToge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VBdHRhY2tTcGVlZChidWZmRGF0YS5idWZmX3ZhbHVlWzBdICogYnVmZkRhdGEuY3VyX2Zsb29yKTtcclxuICAgICAgICAgICAgICAgIGxldCBidWZmU3RhdGUgPSB0aGlzLm1hcF9kZWJ1ZmZfc3RhdGUuZ2V0KEJ1ZmZTdGF0ZVR5cGUuQXR0YWNrU3BlZWQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGJ1ZmZTdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZTdGF0ZS5kZXN0cm95U2VsZigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEJ1ZmZJZC5Cb3NzOF9Ta2lsbF8yX2F0dGFjazoge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oZXJvX2RhdGEudG90YWxfYXR0YWNrICs9IGJ1ZmZEYXRhLmJ1ZmZfdmFsdWVbMF0gKiB0aGlzLmhlcm9fZGF0YS5maXhlZF9hdHRjaztcclxuICAgICAgICAgICAgICAgIGxldCBidWZmU3RhdGUgPSB0aGlzLm1hcF9kZWJ1ZmZfc3RhdGUuZ2V0KEJ1ZmZTdGF0ZVR5cGUuQXR0YWNrKTtcclxuICAgICAgICAgICAgICAgIGlmIChidWZmU3RhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBidWZmU3RhdGUuZGVzdHJveVNlbGYoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaXNIYXZlRGVCdWZmKGJ1ZmZJZDogQnVmZklkKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaGVyb19kZWJ1ZmYuaGFzKGJ1ZmZJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlQWxsRGVCdWZmKCkge1xyXG4gICAgICAgIHRoaXMuaGVyb19kZWJ1ZmYuZm9yRWFjaCgodiwgaykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnN1YkRlQnVmZih2LmdldEJ1ZmZJZCgpKVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBnZXRHYW1lRWZmZWN0SWRCeURlYnVmZihidWZmOiBIZXJvX0RlQnVmZik6IEdhbWVFZmZlY3RJZCB7XHJcbiAgICAgICAgbGV0IGdhbWVFZmZlY3RJZCA9IEdhbWVFZmZlY3RJZC5OdWxsO1xyXG4gICAgICAgIHN3aXRjaCAoYnVmZikge1xyXG4gICAgICAgICAgICBjYXNlIEhlcm9fRGVCdWZmLlh1YW5ZdW46IHtcclxuICAgICAgICAgICAgICAgIGdhbWVFZmZlY3RJZCA9IEdhbWVFZmZlY3RJZC54dWFueXVuO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZ2FtZUVmZmVjdElkO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEdhbWVFZmZlY3ROYW1lQnlEZWJ1ZmYoYnVmZjogSGVyb19EZUJ1ZmYpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCBuYW1lID0gJzAnO1xyXG4gICAgICAgIHN3aXRjaCAoYnVmZikge1xyXG4gICAgICAgICAgICBjYXNlIEhlcm9fRGVCdWZmLlh1YW5ZdW46IHtcclxuICAgICAgICAgICAgICAgIG5hbWUgPSBHYW1lRWZmZWN0SWQueHVhbnl1biArICcnO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRYdWFuWXVuTGlzdGVuKGNhbGxiYWNrOiBGdW5jdGlvbikge1xyXG4gICAgICAgIHRoaXMueHVhbnl1bl9jYWxsYmFjayA9IGNhbGxiYWNrO1xyXG4gICAgfVxyXG5cclxuICAgIHJlc2V0U3RhdGUoKSB7XHJcbiAgICAgICAgdGhpcy5zZXRDRCgxIC8gMyk7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVBbGxCdWZmKCk7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVBbGxEZUJ1ZmYoKTtcclxuICAgICAgICB0aGlzLm1hcF9idWZmX3N0YXRlLmZvckVhY2goKHYsIGspID0+IHtcclxuICAgICAgICAgICAgdi5kZXN0cm95U2VsZigpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMubWFwX2RlYnVmZl9zdGF0ZS5mb3JFYWNoKCh2LCBrKSA9PiB7XHJcbiAgICAgICAgICAgIHYuZGVzdHJveVNlbGYoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAodGhpcy5yZXNldF9jYWxsYmFjaykge1xyXG4gICAgICAgICAgICB0aGlzLnJlc2V0X2NhbGxiYWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5ZCM5q2l5pWw5o2u5L+h5oGvXHJcbiAgICAgICAgdGhpcy5oZXJvX2RhdGEgPSBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdhbWVfaGVyb19kYXRhLmdldCh0aGlzLmhlcm9fdHlwZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5re75Yqg5LiA5LiqYnVmZueKtuaAgeWbvuaghyAqL1xyXG4gICAgYWRkQnVmZlN0YXRlKGJ1ZmZJZDogQnVmZklkLCByZW1haW5UaW1lOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgdHlwZXMgPSBCdWZmU3RhdGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0QnVmZlR5cGUoYnVmZklkKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHR5cGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCB0eXBlID0gdHlwZXNbaV07XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1hcF9idWZmX3N0YXRlLmhhcyh0eXBlKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXBfYnVmZl9zdGF0ZS5nZXQodHlwZSkucmVmcmVzaFRpbWUocmVtYWluVGltZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYmZTdGF0ZSA9IEJ1ZmZTdGF0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVCdWZmU3RhdGUodHlwZSwgdGhpcy5oZXJvX3R5cGUpO1xyXG4gICAgICAgICAgICAgICAgYmZTdGF0ZS5pbml0KHR5cGUsIHJlbWFpblRpbWUsIHRoaXMub25CdWZmU3RhdGVEZXN0b3J5LmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXBfYnVmZl9zdGF0ZS5zZXQodHlwZSwgYmZTdGF0ZSk7XHJcbiAgICAgICAgICAgICAgICAvL3RoaXMubm9kZS5hZGRDaGlsZChzaGllbGQubm9kZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25CdWZmU3RhdGVEZXN0b3J5KHR5cGU6IEJ1ZmZTdGF0ZVR5cGUpIHtcclxuICAgICAgICB0aGlzLm1hcF9idWZmX3N0YXRlLmRlbGV0ZSh0eXBlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKirmt7vliqDkuIDkuKpidWZm54q25oCB5Zu+5qCHICovXHJcbiAgICBhZGREZUJ1ZmZTdGF0ZShidWZmSWQ6IEJ1ZmZJZCwgcmVtYWluVGltZTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHR5cGVzID0gQnVmZlN0YXRlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldERlQnVmZlR5cGUoYnVmZklkKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHR5cGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCB0eXBlID0gdHlwZXNbaV07XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1hcF9kZWJ1ZmZfc3RhdGUuaGFzKHR5cGUpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hcF9kZWJ1ZmZfc3RhdGUuZ2V0KHR5cGUpLnJlZnJlc2hUaW1lKHJlbWFpblRpbWUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbGV0IGJmU3RhdGUgPSBCdWZmU3RhdGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlRGVCdWZmU3RhdGUodHlwZSwgdGhpcy5oZXJvX3R5cGUpO1xyXG4gICAgICAgICAgICAgICAgYmZTdGF0ZS5pbml0KHR5cGUsIHJlbWFpblRpbWUsIHRoaXMub25EZUJ1ZmZTdGF0ZURlc3RvcnkuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hcF9kZWJ1ZmZfc3RhdGUuc2V0KHR5cGUsIGJmU3RhdGUpO1xyXG4gICAgICAgICAgICAgICAgLy90aGlzLm5vZGUuYWRkQ2hpbGQoc2hpZWxkLm5vZGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uRGVCdWZmU3RhdGVEZXN0b3J5KHR5cGU6IEJ1ZmZTdGF0ZVR5cGUpIHtcclxuICAgICAgICB0aGlzLm1hcF9kZWJ1ZmZfc3RhdGUuZGVsZXRlKHR5cGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuiuvue9ruaUu+mAn++8jOavj+enkuaUu+WHu+asoeaVsCAqL1xyXG4gICAgcHJpdmF0ZSBzZXRBdHRhY2tTcGVlZChudW1TZWM6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuZ29uZ2ppX3N1ZHUgPSBudW1TZWM7XHJcbiAgICAgICAgaWYgKG51bVNlYyA+IDEwKSB7XHJcbiAgICAgICAgICAgIG51bVNlYyA9IDEwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobnVtU2VjIDwgMC4xKSB7XHJcbiAgICAgICAgICAgIG51bVNlYyA9IDAuMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5oZXJvX2RhdGEuZ29uZ2ppX2ppYW5nZSA9IDEgLyBudW1TZWM7XHJcbiAgICB9XHJcbiAgICAvKirmlLnlj5jlvZPliY3mlLvpgJ8sYnVmZkRhdGE65q+U546HICovXHJcbiAgICBwcml2YXRlIGNoYW5nZUF0dGFja1NwZWVkKHJhdGU6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBnanNkID0gdGhpcy5nZXRBdHRhY2tTcGVlZCgpO1xyXG4gICAgICAgIGdqc2QgKz0gKHJhdGUpICogKDEgLyB0aGlzLmhlcm9fZGF0YS5iYXNlX2ppYW5nZSk7XHJcbiAgICAgICAgdGhpcy5zZXRBdHRhY2tTcGVlZChnanNkKTtcclxuICAgIH1cclxuICAgIC8qKuiOt+W+l+W9k+WJjeaUu+mAnyAqL1xyXG4gICAgcHJpdmF0ZSBnZXRBdHRhY2tTcGVlZCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiAxIC8gdGhpcy5oZXJvX2RhdGEuZ29uZ2ppX2ppYW5nZTtcclxuICAgIH1cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLeeKtuaAgSzliqjnlLstLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBwdWJsaWMgc2V0SGVyb1N0YXRlKHN0YXRlOiBIZXJvX1N0YXRlLCBmYW5neGlhbmc6IEdvbmdKaV9GYW5nWGlhbmcsIGRhdGE/OiBLZXlGcmFtZURhdGFbXSwgZW5kQ2FsbGJhY2s/OiBGdW5jdGlvbikge1xyXG4gICAgICAgIHRoaXMuaGVyb19zdGF0ZSA9IHN0YXRlO1xyXG4gICAgICAgIHRoaXMuY3VyX2Zhbmd4aWFuZyA9IGZhbmd4aWFuZztcclxuICAgICAgICBzd2l0Y2ggKHRoaXMuY3VyX2Zhbmd4aWFuZykge1xyXG4gICAgICAgICAgICBjYXNlIEdvbmdKaV9GYW5nWGlhbmcuenVvOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc2NhbGVYID0gLXRoaXMuc2V0dXBfc2NhbGU7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR29uZ0ppX0ZhbmdYaWFuZy56aG9uZzoge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnNjYWxlWCA9IHRoaXMuc2V0dXBfc2NhbGU7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR29uZ0ppX0ZhbmdYaWFuZy55b3U6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zY2FsZVggPSB0aGlzLnNldHVwX3NjYWxlO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+aSreaUvuWKqOeUu1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5oZXJvX3N0YXRlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgSGVyb19TdGF0ZS5pZGxlOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXlTcGluZUFuaW1hdGlvbih0aGlzLmdldFNwaW5lTmFtZSgpLCB0cnVlLCBudWxsLCBudWxsKTtcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBIZXJvX1N0YXRlLmF0dGFjazoge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5U3BpbmVBbmltYXRpb24odGhpcy5nZXRTcGluZU5hbWUoKSwgZmFsc2UsIGRhdGEsIGVuZENhbGxiYWNrKTtcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBIZXJvX1N0YXRlLnNraWxsOlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheVNwaW5lQW5pbWF0aW9uKHRoaXMuZ2V0U3BpbmVOYW1lKCksIGZhbHNlLCBkYXRhLCBlbmRDYWxsYmFjayk7XHJcbiAgICAgICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgc2V0SGVyb1N0YXRlQW5kQW5pbWF0aW9uKHN0YXRlOiBIZXJvX1N0YXRlLCBuYW1lOiBzdHJpbmcsIGxvb3A6IGJvb2xlYW4sIGRhdGE/OiBLZXlGcmFtZURhdGFbXSwgZW5kQ2FsbGJhY2s/OiBGdW5jdGlvbikge1xyXG4gICAgICAgIHRoaXMuaGVyb19zdGF0ZSA9IHN0YXRlO1xyXG4gICAgICAgIHRoaXMucGxheVNwaW5lQW5pbWF0aW9uKG5hbWUsIGxvb3AsIGRhdGEsIGVuZENhbGxiYWNrKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRIZXJvU3RhdGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaGVyb19zdGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKirmoLnmja7mlYzkurrkvY3nva7ojrflvpfmlLvlh7vmlrnlkJEgKi9cclxuICAgIHByb3RlY3RlZCBnZXRGYW5nWGlhbmdCeVBvcyhwb3M6IGNjLlZlYzIpOiBHb25nSmlfRmFuZ1hpYW5nIHtcclxuICAgICAgICAvL+WvueaVjOS6uuWNleS9jei/m+ihjOaWueWQkeWIpOaWre+8jOehruWumuaJk+WHu+aWueWQkVxyXG4gICAgICAgIGxldCBmYW5neGlhbmcgPSBHb25nSmlfRmFuZ1hpYW5nLnpob25nO1xyXG4gICAgICAgIGxldCBvZmZzZXRQb3MgPSBwb3Muc3ViKHRoaXMubm9kZS5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICBsZXQgcGkyID0gTWF0aC5QSSAqIDI7XHJcbiAgICAgICAgbGV0IHJhZGlhbiA9IChNYXRoLmF0YW4yKG9mZnNldFBvcy55LCBvZmZzZXRQb3MueCkgKyBwaTIpICUgcGkyO1xyXG4gICAgICAgIGxldCBhbmdsZSA9IDE4MCAqIHJhZGlhbiAvIE1hdGguUEk7XHJcbiAgICAgICAgaWYgKGFuZ2xlIDw9IDYwKSB7XHJcbiAgICAgICAgICAgIGZhbmd4aWFuZyA9IEdvbmdKaV9GYW5nWGlhbmcueW91O1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYW5nbGUgPiA2MCAmJiBhbmdsZSA8IDEyMCkge1xyXG4gICAgICAgICAgICBmYW5neGlhbmcgPSBHb25nSmlfRmFuZ1hpYW5nLnpob25nO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYW5nbGUgPj0gMTIwICYmIGFuZ2xlIDw9IDE4MCkge1xyXG4gICAgICAgICAgICBmYW5neGlhbmcgPSBHb25nSmlfRmFuZ1hpYW5nLnp1bztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbmd4aWFuZztcclxuICAgIH1cclxuXHJcbiAgICBnZXRTcGluZU5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMuaGVyb19zdGF0ZSkge1xyXG4gICAgICAgICAgICBjYXNlIEhlcm9fU3RhdGUuYXR0YWNrOiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSGVyb19TdGF0ZV9OYW1lLkF0dGFjaztcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBIZXJvX1N0YXRlLnNraWxsOiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSGVyb19TdGF0ZV9OYW1lLlNraWxsO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEhlcm9fU3RhdGUuaWRsZToge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEhlcm9fU3RhdGVfTmFtZS5JZGxlO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5pKt5pS+5LiA5Liq6aqo6aq85Yqo55S7XHJcbiAgICAgKiBAcGFyYW0gbmFtZSDpqqjpqrzliqjnlLvlkI3np7BcclxuICAgICAqIEBwYXJhbSBpc0xvb3Ag5piv5ZCm5b6q546vXHJcbiAgICAgKiBAcGFyYW0gZGF0YSDmmK/lkKbnm5HlkKzlhbPplK7luKfvvIzlhbPplK7luKfmlbDmja7ljIXlkKvlhbPplK7luKflkI3np7DvvIznm5HlkKzliLDlhbPplK7luKflkI7nmoTlm57osINcclxuICAgICAqIEBwYXJhbSBlbmRDYWxsYmFjayDmkq3mlL7nu5PmnZ/lkI7nmoTlm57osINcclxuICAgICAqL1xyXG4gICAgcGxheVNwaW5lQW5pbWF0aW9uKG5hbWU6IHN0cmluZywgaXNMb29wOiBib29sZWFuID0gZmFsc2UsIGRhdGE/OiBLZXlGcmFtZURhdGFbXSwgZW5kQ2FsbGJhY2s/OiBGdW5jdGlvbikge1xyXG4gICAgICAgIGxldCBhbmltYSA9IHRoaXMuc3BpbmUuc2V0QW5pbWF0aW9uKDAsIG5hbWUsIGlzTG9vcCk7XHJcbiAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy5zcGluZS5zZXRUcmFja0V2ZW50TGlzdGVuZXIoYW5pbWEsIChlbnRyeTogc3Auc3BpbmUuVHJhY2tFbnRyeSwgZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChldmVudC5kYXRhLm5hbWUgPT0gZGF0YVtpXS5uYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFbaV0uY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChlbmRDYWxsYmFjaykge1xyXG4gICAgICAgICAgICB0aGlzLnNwaW5lLnNldFRyYWNrQ29tcGxldGVMaXN0ZW5lcihhbmltYSwgKGVudHJ5OiBzcC5zcGluZS5UcmFja0VudHJ5LCBldmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgYW5pbWEubGlzdGVuZXIgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgZW5kQ2FsbGJhY2soKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1DRC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgcHVibGljIHJlc2V0U2tpbGwoKSB7XHJcbiAgICAgICAgdGhpcy5za2lsbF9jZF90aW1lID0gMDtcclxuICAgICAgICB0aGlzLnNob3dDRCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldENEKCkge1xyXG4gICAgICAgIHRoaXMuc2tpbGxfY2RfdGltZSA9IHRoaXMuc2tpbGxfdG90YWxfdGltZTtcclxuICAgICAgICB0aGlzLnNob3dDRCgpO1xyXG4gICAgICAgIC8v6YeK5pS+5LqG5oqA6IO977yM56uL6ams5YeP5Y67TVBcclxuICAgICAgICAvL0dhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkud2FsbF9kYXRhLmNoYW5nZU1wKC10aGlzLmhlcm9fZGF0YS5jb3N0X21wKTtcclxuICAgIH1cclxuICAgIC8qKueZvuWIhuavlCAqL1xyXG4gICAgcHVibGljIHNldENEKHBlclRpbWU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuc2tpbGxfY2RfdGltZSA9IHBlclRpbWUgKiB0aGlzLmhlcm9fZGF0YS5nZXRTa2lsbENvbGREb3duKFNraWxsVHlwZS5BY3RpdmUpOztcclxuICAgICAgICB0aGlzLmNoYW5nZUNEKDApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjaGFuZ2VDRCh0aW1lOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnNraWxsX2NkX3RpbWUgKz0gdGltZTtcclxuICAgICAgICBpZiAodGhpcy5za2lsbF9jZF90aW1lIDw9IDApIHtcclxuICAgICAgICAgICAgdGhpcy5za2lsbF9jZF90aW1lID0gMDtcclxuICAgICAgICAgICAgaWYgKHRoaXMubXBfcHJvZ3Jlc3MpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubXBfcHJvZ3Jlc3Muc2V0Tm9ybWFsU1AoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hdXRvX2ZpZ2h0aW5nICYmIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfc3RhdGUgPT0gR2FtZVN0YXRlLkdhbWVfUGxheWluZyAmJiB0aGlzLmdldElzQ2FuU2tpbGwoKSAmJiBTa2lsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRJc1NraWxsU3RhdGUoKSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydEF1dG9SZWxlYXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvL+aYvuekuuiSmeadv+WSjOWAkuiuoeaXtlxyXG4gICAgICAgICAgICBpZiAodGhpcy5tcF9wcm9ncmVzcykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tcF9wcm9ncmVzcy5zZXRDRFNQKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zaG93Q0QoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNob3dDRCgpIHtcclxuICAgICAgICBpZiAodGhpcy5tcF9wcm9ncmVzcykge1xyXG4gICAgICAgICAgICBsZXQgcHJvZ3Jlc3MgPSAxIC0gdGhpcy5za2lsbF9jZF90aW1lIC8gdGhpcy5za2lsbF90b3RhbF90aW1lO1xyXG4gICAgICAgICAgICB0aGlzLm1wX3Byb2dyZXNzLnNldFByb2dyZXNzKHByb2dyZXNzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SXNDYW5Ta2lsbCgpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAodGhpcy5pc0hhdmVEZUJ1ZmYoQnVmZklkLk1vbnN0ZXJfWHVhbll1bikgfHwgdGhpcy5nZXRIZXJvU3RhdGUoKSA9PSBIZXJvX1N0YXRlLmV4aXQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmlzX3Nob3dfbXBfaGludCA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLnNraWxsX2NkX3RpbWUgPD0gMCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc19uZWVkX2NoZWNrX2Rpc3RhbmNlKSB7XHJcbiAgICAgICAgICAgICAgICAvL+WmguaenOmcgOimgeWIpOaWremHiuaUvui3neemu+eahO+8jOWImemcgOimgeWIpOaWremHiuaUvui3neemu+WGheacieayoeacieaAqueJqe+8jOayoeacieWImei/lOWbnmZhbHNlXHJcbiAgICAgICAgICAgICAgICBsZXQgZW5lbXlzID0gTW9uc3Rlck1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNb25zdGVyc0Zvck5lYXJlc3RCeVNraWxsKHRoaXMubWF4X2dvbmdqaV9udW0sIHRoaXMubm9kZS55LCB0aGlzLmNhc3RpbmdfZGlzdGFuY2UpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGVuZW15cyA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIGRhbWFnZSDmnKzmrKHkuI3mmrTlh7vnmoTkvKTlrrPlgLxcclxuICAgICAqIEBwYXJhbSBpc0J1bGxldCDmmK/lkKblrZDlvLnnsbvlnotcclxuICAgICAqIEBwYXJhbSBza2lsbFR5cGUg5oqA6IO957G75Z6LXHJcbiAgICAgKiBAcGFyYW0gc2tpbGxSYXRlIOWmguaenOaYr+aKgOiDve+8jOaKgOiDveeahOavlOeOh1xyXG4gICAgICogQHBhcmFtIGNvbnRpbnVvdXNSYXRlIOS8pOWus+avlOeOhy3lupTnlKjlnKjmjIHnu63kvKTlrrPmr5TnjodcclxuICAgICAqIEByZXR1cm5zIOaUu+WHu+aVsOaNrlxyXG4gICAgICovXHJcbiAgICBnZXRHb25nSmlEYXRhKGRhbWFnZVR5cGU6IERhbWFnZVR5cGUsIGlzQnVsbGV0OiBib29sZWFuLCBza2lsbFR5cGU6IFNraWxsVHlwZSwgc2tpbGxSYXRlOiBudW1iZXIgPSAxLCBjb250aW51b3VzUmF0ZTogbnVtYmVyID0gMCk6IEdvbmdKaURhdGEge1xyXG4gICAgICAgIGxldCBnakRhdGEgPSBuZXcgR29uZ0ppRGF0YSgpO1xyXG4gICAgICAgIGdqRGF0YS5oZXJvX2RhdGEgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmhlcm9fZGF0YSk7XHJcbiAgICAgICAgZ2pEYXRhLmlzX2J1bGxldCA9IGlzQnVsbGV0O1xyXG4gICAgICAgIGdqRGF0YS5kYW1hZ2VfdHlwZSA9IGRhbWFnZVR5cGU7XHJcbiAgICAgICAgZ2pEYXRhLmhlcm9fdHlwZSA9IHRoaXMuaGVyb190eXBlO1xyXG4gICAgICAgIGlmIChkYW1hZ2VUeXBlID09IERhbWFnZVR5cGUuTm9ybWFsKSB7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8v5oqA6IO95Lyk5a6z5q+U546HXHJcbiAgICAgICAgICAgIGdqRGF0YS5za2lsbF9kYW1hZ2VfcmF0ZSA9IHNraWxsUmF0ZTtcclxuICAgICAgICAgICAgZ2pEYXRhLmNvbnRpbnVvdXNfZGFtYWdlX3JhdGUgPSBjb250aW51b3VzUmF0ZTtcclxuICAgICAgICAgICAgaWYgKHNraWxsVHlwZSA9PSBTa2lsbFR5cGUuQWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICBnakRhdGEuc2tpbGxfcmVsZWFzZV9pZCA9IHRoaXMuZ2V0U2tpbGxSZWxlYXNlSWQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZ2pEYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRGFtYWdlTW9uc3RlcihkYW1hZ2VUeXBlOiBEYW1hZ2VUeXBlLCBpc0NyaXQ6IGJvb2xlYW4sIG1vbnN0ZXI6IGNjLk5vZGUpIHtcclxuICAgICAgICBpZiAoZGFtYWdlVHlwZSA9PSBEYW1hZ2VUeXBlLk5vcm1hbCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wZXQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGV0Lm9uSGVyb0hpdE1vbnN0ZXIobW9uc3Rlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuaGl0X2NhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGl0X2NhbGxiYWNrKGRhbWFnZVR5cGUsIGlzQ3JpdCwgbW9uc3Rlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlc2V0R29uZ0ppSmlTaHUoKSB7XHJcbiAgICAgICAgdGhpcy5nb25namlfamlzaHUgPSAwO1xyXG4gICAgICAgIHRoaXMuaXNfY2FuX2ppc2h1ID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICByZXNldE5vcm1hbEF0dGFjaygpIHtcclxuICAgICAgICB0aGlzLmdvbmdqaV9qaXNodSA9IHRoaXMuaGVyb19kYXRhLmdvbmdqaV9qaWFuZ2U7XHJcbiAgICAgICAgdGhpcy5pc19jYW5famlzaHUgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEF0dFNwaW5lU2NhbGUoKSB7XHJcbiAgICAgICAgdGhpcy5zcGluZS50aW1lU2NhbGUgPSB0aGlzLmhlcm9fZGF0YS5iYXNlX2ppYW5nZSAvIHRoaXMuaGVyb19kYXRhLmdvbmdqaV9qaWFuZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnROb3JtYWxBdHRhY2sobW9uc3RlcjogY2MuTm9kZSkge1xyXG4gICAgICAgIGxldCBpc0RvdWJsZTogYm9vbGVhbiA9IHRoaXMuaXNfZG91YmxlX2F0dGFjaztcclxuICAgICAgICBpZiAodGhpcy5pc19kb3VibGVfYXR0YWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3BpbmUudGltZVNjYWxlID0gdGhpcy5oZXJvX2RhdGEuYmFzZV9qaWFuZ2UgLyB0aGlzLmhlcm9fZGF0YS5nb25namlfamlhbmdlICogMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5pc19kb3VibGVfYXR0YWNrID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5hdHRhY2tfY2FsbGJhY2sobW9uc3Rlcik7XHJcbiAgICAgICAgaWYgKHRoaXMucGV0KSB7XHJcbiAgICAgICAgICAgIHRoaXMucGV0LnN0YXJ0UmVsZWFzZVNraWxsKG1vbnN0ZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9tb2RlID09IEdhbWVNb2RlLkVuZGxlc3MpIHtcclxuICAgICAgICAgICAgaWYgKGlzRG91YmxlID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYnVmZiA9IHRoaXMuZ2V0RW5kbGVzc0J5VHlwZShFbmRsZXNzQnVmZlR5cGUuRG91YmxlQXR0YWNrKVxyXG4gICAgICAgICAgICAgICAgaWYgKGJ1ZmYpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL+amgueOh1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCByYXRlID0gYnVmZi52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoTWF0aC5yYW5kb20oKSA8IHJhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc19kb3VibGVfYXR0YWNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zcGluZS50aW1lU2NhbGUgPSB0aGlzLmhlcm9fZGF0YS5iYXNlX2ppYW5nZSAvIHRoaXMuaGVyb19kYXRhLmdvbmdqaV9qaWFuZ2UgKiAyO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVVQREFURS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICB1cGRhdGUoZHQ6IG51bWJlcikge1xyXG4gICAgICAgIGlmIChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX3N0YXRlICE9IEdhbWVTdGF0ZS5HYW1lX1BsYXlpbmcgfHwgSGVyb19TdGF0ZS5leGl0ID09IHRoaXMuZ2V0SGVyb1N0YXRlKCkpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB0aGlzLmNoZWNrU2tpbGwoZHQpO1xyXG4gICAgICAgIGlmICh0aGlzLmlzSGF2ZURlQnVmZihCdWZmSWQuTW9uc3Rlcl9YdWFuWXVuKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2hlY2tBdHRhY2soZHQpO1xyXG4gICAgICAgIGlmICh0aGlzLmNsaWNrX3JlbWFpbiA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5jbGlja19yZW1haW4gLT0gZHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgdng6IG51bWJlciA9ICh0aGlzLnRhcmdldFggLSB0aGlzLm5vZGUueCkgKiB0aGlzLmVhc2luZztcclxuICAgICAgICB0aGlzLm5vZGUueCArPSB2eDtcclxuICAgICAgICBpZih0aGlzLm5vZGVfc2hhZG93KXtcclxuICAgICAgICAgICAgdGhpcy5ub2RlX3NoYWRvdy5zZXRQb3NpdGlvbihjYy52Mih0aGlzLm5vZGUueCArIHRoaXMucG9zLnggKiB0aGlzLnNldHVwX3NjYWxlLCB0aGlzLm5vZGUueSArIHRoaXMucG9zLnkgKiB0aGlzLnNldHVwX3NjYWxlKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHN3aXRjaCAodGhpcy5zcGVlZFR5cGUpIHtcclxuICAgICAgICAvLyAgICAgY2FzZSBTcGVlZFR5cGUuU1RPUDpcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMubW92ZVNwZWVkID0gdGhpcy5zdG9wU3BlZWQ7XHJcbiAgICAgICAgLy8gICAgICAgICBicmVhaztcclxuICAgICAgICAvLyAgICAgY2FzZSBTcGVlZFR5cGUuTk9STUFMOlxyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5tb3ZlU3BlZWQgPSB0aGlzLm5vcm1hbFNwZWVkO1xyXG4gICAgICAgIC8vICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgLy8gICAgIGNhc2UgU3BlZWRUeXBlLkZBU1Q6XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLm1vdmVTcGVlZCA9IHRoaXMuZmFzdFNwZWVkO1xyXG4gICAgICAgIC8vICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgLy8gICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgLy8gICAgICAgICBicmVhaztcclxuICAgICAgICAvLyB9XHJcblxyXG5cclxuICAgICAgICAvLyB0aGlzLm1vdmUoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHVwZGF0ZUNoZWNrKGR0KTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNIYXZlRGVCdWZmKEJ1ZmZJZC5Nb25zdGVyX1h1YW5ZdW4pKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jaGVja0F0dGFjayhkdCk7XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2hlY2tTa2lsbChkdDogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaGVyb19zdGF0ZSAhPSBIZXJvX1N0YXRlLnNraWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlQ0QoLWR0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjaGVja0F0dGFjayhkdCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzX2Nhbl9qaXNodSAmJiB0aGlzLmlzX2xvYWRfb2spIHtcclxuICAgICAgICAgICAgdGhpcy5nb25namlfamlzaHUgKz0gZHQ7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmdvbmdqaV9qaXNodSA+PSB0aGlzLmhlcm9fZGF0YS5nb25namlfamlhbmdlKSB7XHJcbiAgICAgICAgICAgICAgICAvL+W8gOWni+aUu+WHu1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nb25namlfamlzaHUgPSAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc19jYW5fZ29uZ2ppID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL+iHquWKqOaUu+WHu1xyXG4gICAgICAgIGlmICh0aGlzLmlzX2Nhbl9nb25namkgJiYgdGhpcy5nZXRIZXJvU3RhdGUoKSAhPSBIZXJvX1N0YXRlLnNraWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNfY2FuX2dvbmdqaSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBsZXQgbW9uc3RlcnMgPSBNb25zdGVyTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1vbnN0ZXJzRm9yTmVhcmVzdCh0aGlzLm1heF9nb25namlfbnVtLCB0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKSwgdGhpcy5oZXJvX2RhdGEuZ29uZ2ppX2ZhbndlaSk7XHJcbiAgICAgICAgICAgIGlmIChtb25zdGVycykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nb25namlfamlzaHUgPSAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc19jYW5fZ29uZ2ppID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0QXR0U3BpbmVTY2FsZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydE5vcm1hbEF0dGFjayhtb25zdGVyc1swXSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=