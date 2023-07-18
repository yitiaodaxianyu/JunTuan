
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcR2FtZVxcSGVyby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBK0w7QUFHL0wsNkNBQXdEO0FBRXhELGlEQUE0QztBQUM1QyxvRUFBaUY7QUFFakYsK0RBQTBEO0FBQzFELDZDQUFzRDtBQUN0RCxnRUFBMkQ7QUFDM0QseURBQXNFO0FBQ3RFLHdEQUFtRDtBQUNuRCx5Q0FBb0M7QUFDcEMsdUNBQXNDO0FBQ3RDLHVDQUFrQztBQUNsQyxvREFBK0M7QUFDL0MsdUVBQWtFO0FBQ2xFLHNEQUFpRDtBQUNqRCxnREFBK0M7QUFDL0Msc0RBQWlEO0FBQ2pELDRFQUEwRjtBQUMxRixrRUFBd0U7QUFDeEUsa0RBQTZDO0FBQzdDLHFEQUEyRDtBQUMzRCxnREFBMkM7QUFDM0Msa0RBQTZDO0FBQzdDLGdEQUEyQztBQUMzQyxpREFBNEM7QUFDNUMsK0RBQTREO0FBSXRELElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQWtDLHdCQUFZO0lBQTlDO1FBQUEscUVBMjVDQztRQXY1Q0csaUJBQWlCO1FBQ2pCLGdCQUFVLEdBQVksS0FBSyxDQUFDO1FBQzVCLGtCQUFZLEdBQVcsQ0FBQyxDQUFDO1FBQ3pCLG1CQUFhLEdBQVcsQ0FBQyxDQUFDO1FBRzFCLGVBQVMsR0FBYyxzQkFBUyxDQUFDLFlBQVksQ0FBQztRQUc5QyxzQkFBZ0IsR0FBYyxJQUFJLENBQUM7UUFFbkMsTUFBTTtRQUNOLFdBQUssR0FBZ0IsSUFBSSxDQUFDO1FBQzFCLGFBQWE7UUFDYixtQkFBYSxHQUFxQiw2QkFBZ0IsQ0FBQyxHQUFHLENBQUM7UUFDdkQsV0FBVztRQUNYLGdCQUFVLEdBQWUsdUJBQVUsQ0FBQyxJQUFJLENBQUM7UUFDekMsTUFBTTtRQUNOLGtCQUFZLEdBQVcsQ0FBQyxDQUFDO1FB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InNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJ1ZmZJZCwgQnVmZlN0YXRlVHlwZSwgQnVmZlR5cGUsIERhbWFnZVR5cGUsIEdvbmdKaV9GYW5nWGlhbmcsIEhlcm9fRGVCdWZmLCBIZXJvX1N0YXRlLCBIZXJvX1N0YXRlX05hbWUsIEhlcm9fVHlwZSwgU2tpbGxJbmRpY2F0b3JUeXBlLCBTa2lsbFRpcFR5cGUsIFNraWxsVHlwZSB9IGZyb20gXCIuL0hlcm9Db25maWdcIjtcclxuaW1wb3J0IE1wUHJvZ3Jlc3MgZnJvbSBcIi4vTXBQcm9ncmVzc1wiO1xyXG5pbXBvcnQgQnVmZlN0YXRlIGZyb20gXCIuL0J1ZmZTdGF0ZVwiO1xyXG5pbXBvcnQgeyBHb25nSmlEYXRhLCBIZXJvRGF0YSB9IGZyb20gXCIuLi9EYXRhL0hlcm9EYXRhXCI7XHJcbmltcG9ydCBQZXQgZnJvbSBcIi4uLy4uL1BldC9HYW1lL1BldFwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uLy4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEdhbWVFZmZlY3RJZCwgR2FtZUVmZmVjdHNNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0dhbWUvR2FtZUVmZmVjdHNNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEhlcm9NYW5hZ2VyIH0gZnJvbSBcIi4uL0RhdGEvSGVyb01hbmFnZXJcIjtcclxuaW1wb3J0IE1vbnN0ZXJNYW5hZ2VyIGZyb20gXCIuLi8uLi9Nb25zdGVyL01vbnN0ZXJNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEdhbWVNb2RlLCBHYW1lU3RhdGUgfSBmcm9tIFwiLi4vLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBCdWZmU3RhdGVNYW5hZ2VyIGZyb20gXCIuLi8uLi9HYW1lL0J1ZmZTdGF0ZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgSW5qdXJlZERhdGEsIEtleUZyYW1lRGF0YSB9IGZyb20gXCIuLi8uLi9Nb25zdGVyL01vbnN0ZXJEYXRhXCI7XHJcbmltcG9ydCBTa2lsbE1hbmFnZXIgZnJvbSBcIi4uLy4uL0dhbWUvU2tpbGxNYW5hZ2VyXCI7XHJcbmltcG9ydCBCdWZmVGltZXIgZnJvbSBcIi4vQnVmZlRpbWVyXCI7XHJcbmltcG9ydCB7IEJ1ZmZEYXRhIH0gZnJvbSBcIi4vQnVmZkRhdGFcIjtcclxuaW1wb3J0IFNraWxsVGlwIGZyb20gXCIuL1NraWxsVGlwXCI7XHJcbmltcG9ydCBTa3lNYW5hZ2VyIGZyb20gXCIuLi8uLi9HYW1lL1NreU1hbmFnZXJcIjtcclxuaW1wb3J0IExhbmd1YWdlTWFuYWdlciBmcm9tIFwiLi4vLi4vbXVsdGlMYW5ndWFnZS9MYW5ndWFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IFRhc2tNYW5hZ2VyIGZyb20gXCIuLi8uLi9UYXNrL1Rhc2tNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFRhc2tJdGVtIH0gZnJvbSBcIi4uLy4uL1Rhc2svVGFza0VudW1cIjtcclxuaW1wb3J0IFdhbGxNYW5hZ2VyIGZyb20gXCIuLi8uLi9XYWxsL1dhbGxNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEVuZGxlc3NCdWZmLCBFbmRsZXNzQnVmZlR5cGUgfSBmcm9tIFwiLi4vLi4vY29weS9lbmRsZXNzY2hhbGxlbmdlcy9FbmRsZXNzQ29uZmlnXCI7XHJcbmltcG9ydCB7IFNwaXJpdEF0dHJpYnV0ZU1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vUGV0L0RhdGEvU3Bpcml0QXR0cmlidXRlXCI7XHJcbmltcG9ydCBGaXJlUGV0IGZyb20gXCIuLi8uLi9QZXQvR2FtZS9GaXJlUGV0XCI7XHJcbmltcG9ydCB7IEhlcm9CYXNlSW5mb01hbmFnZXIgfSBmcm9tIFwiLi4vRGF0YS9IZXJvQmFzZUluZm9cIjtcclxuaW1wb3J0IEljZVBldCBmcm9tIFwiLi4vLi4vUGV0L0dhbWUvSWNlUGV0XCI7XHJcbmltcG9ydCBXaW5kUGV0IGZyb20gXCIuLi8uLi9QZXQvR2FtZS9XaW5kUGV0XCI7XHJcbmltcG9ydCBSYXlQZXQgZnJvbSBcIi4uLy4uL1BldC9HYW1lL1JheVBldFwiO1xyXG5pbXBvcnQgTW9uc3RlciBmcm9tIFwiLi4vLi4vTW9uc3Rlci9Nb25zdGVyXCI7XHJcbmltcG9ydCB7IGluc3RhbmNlIH0gZnJvbSBcIi4uLy4uL0dhbWUvVG91Y2hQbGFuZS9Ub3VjaFBsYW5lXCI7XHJcblxyXG5cclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIZXJvIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuICAgIC8qKuaJgOacieeahOiLsembhOWPiuWFtuaJgOmcgOi1hOa6kOaYr+WQpuWKoOi9veWujOavlSAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBtYXhfbG9hZF9udW06IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgc3RhdGljIGN1cl9sb2FkZWRfbnVtOiBudW1iZXIgPSAwO1xyXG4gICAgLyoq5omA6ZyA55qE5Yqo55S75Yqg6L295piv5ZCmb2sgKi9cclxuICAgIGlzX2xvYWRfb2s6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIGN1cl9sb2FkX251bTogbnVtYmVyID0gMDtcclxuICAgIG5lZWRfbG9hZF9udW06IG51bWJlciA9IDA7XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuRW51bShIZXJvX1R5cGUpIH0pXHJcbiAgICBoZXJvX3R5cGU6IEhlcm9fVHlwZSA9IEhlcm9fVHlwZS5DaGFuZ01hb1Nob3U7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIHByZWZhYl9za2lsbF90aXA6IGNjLlByZWZhYiA9IG51bGw7XHJcblxyXG4gICAgLy/pqqjpqrzliqjnlLtcclxuICAgIHNwaW5lOiBzcC5Ta2VsZXRvbiA9IG51bGw7XHJcbiAgICAvKirlvZPliY3oi7Hpm4TnmoTpnaLlkJEgKi9cclxuICAgIGN1cl9mYW5neGlhbmc6IEdvbmdKaV9GYW5nWGlhbmcgPSBHb25nSmlfRmFuZ1hpYW5nLnp1bztcclxuICAgIC8qKuiLsembhOeahOeKtuaAgSAqL1xyXG4gICAgaGVyb19zdGF0ZTogSGVyb19TdGF0ZSA9IEhlcm9fU3RhdGUuaWRsZTtcclxuICAgIC8v5pS75Ye76K6h5pWwXHJcbiAgICBnb25namlfamlzaHU6IG51bWJlciA9IDE7XHJcbiAgICAvKirmmK/lkKblj6/ku6XmlLvlh7sgKi9cclxuICAgIGlzX2Nhbl9nb25namk6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIC8qKuaYr+WQpuWPr+S7peaUu+WHu+iuoeaVsCAqL1xyXG4gICAgaXNfY2FuX2ppc2h1OiBib29sZWFuID0gdHJ1ZTtcclxuICAgIC8v5pyA5aSn55qE5pS75Ye75qyh5pWwXHJcbiAgICBtYXhfZ29uZ2ppX251bSA9IDE7XHJcbiAgICAvL+aKgOiDveWJqeS9meeahOWGt+WNtOaXtumXtFxyXG4gICAgc2tpbGxfY2RfdGltZTogbnVtYmVyID0gMDtcclxuICAgIC8qKuS4u+WKqOaKgOiDveaKgOiDveacgOWkp+WGt+WNtCovXHJcbiAgICBza2lsbF90b3RhbF90aW1lOiBudW1iZXIgPSA1O1xyXG4gICAgLyoq5pa95rOV6Led56a7ICovXHJcbiAgICBjYXN0aW5nX2Rpc3RhbmNlOiBudW1iZXIgPSAxMDAwO1xyXG4gICAgLyoq5a2Q5by56YCf5bqmICovXHJcbiAgICBidWxsZXRfc3BlZWQ6IG51bWJlciA9IDEwMDA7XHJcbiAgICAvL+a2iOiAl+eahE1Q5YC8XHJcbiAgICBjb3N0X21wOiBudW1iZXIgPSAyMDtcclxuICAgIC8v6Iux6ZuE5L2N572uXHJcbiAgICBwb3NJbmRleDpudW1iZXI9LTE7XHJcbiAgICBtcF9wcm9ncmVzczogTXBQcm9ncmVzcyA9IG51bGw7XHJcbiAgICAvKiroi7Hpm4TlvZPliY3mi6XmnInnmoRidWZmICovXHJcbiAgICBwcm90ZWN0ZWQgaGVyb19idWZmOiBNYXA8QnVmZklkLCBCdWZmVGltZXI+ID0gbnVsbDtcclxuICAgIC8qKuiLsembhOW9k+WJjeaLpeacieeahGRlYnVmZiAqL1xyXG4gICAgcHJvdGVjdGVkIGhlcm9fZGVidWZmOiBNYXA8QnVmZklkLCBCdWZmVGltZXI+ID0gbnVsbDtcclxuICAgIC8qKuaXoOWwvWJ1ZmYgKi9cclxuICAgIHByb3RlY3RlZCBtYXBfZW5kbGVzc19idWZmOiBNYXA8bnVtYmVyLCBFbmRsZXNzQnVmZj4gPSBudWxsO1xyXG4gICAgLyoq55yp5pmV5L2N572uICovXHJcbiAgICB4dWFueXVuX3BvczogY2MuVmVjMiA9IG51bGw7XHJcbiAgICAvKirlrZDlvLnnlJ/miJDnmoTkvY3nva4gKi9cclxuICAgIGJ1bGxldF9wb3M6IGNjLlZlYzJbXSA9IFtdO1xyXG4gICAgLy/oi7Hpm4TnmoTmlbDmja5cclxuICAgIGhlcm9fZGF0YTogSGVyb0RhdGEgPSBudWxsO1xyXG4gICAgaXNfc2hvd19tcF9oaW50OiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgLyoq5b2T5YmN55qE6Z+n5oCnICovXHJcbiAgICBwcm90ZWN0ZWQgY3VyX3RvdWdobmVzczogbnVtYmVyID0gMDtcclxuICAgIHpoaXNoaXFpX3R5cGU6IFNraWxsSW5kaWNhdG9yVHlwZSA9IFNraWxsSW5kaWNhdG9yVHlwZS5iZWVsaW5lO1xyXG4gICAgLyoq5oqA6IO96YeK5pS+5Zue6LCDICovXHJcbiAgICBza2lsbF9jYWxsYmFjazogRnVuY3Rpb24gPSBudWxsO1xyXG4gICAgLyoq5pS75Ye76YeK5pS+5Zue6LCDICovXHJcbiAgICBhdHRhY2tfY2FsbGJhY2s6IEZ1bmN0aW9uID0gbnVsbDtcclxuICAgIC8qKuecqeaZleWbnuiwgyAqLztcclxuICAgIHh1YW55dW5fY2FsbGJhY2s6IEZ1bmN0aW9uID0gbnVsbDtcclxuICAgIC8qKuWRveS4reWbnuiwgyAqL1xyXG4gICAgaGl0X2NhbGxiYWNrOiBGdW5jdGlvbiA9IG51bGw7XHJcbiAgICAvKirph43nva7lm57osIMgKi9cclxuICAgIHJlc2V0X2NhbGxiYWNrOiBGdW5jdGlvbiA9IG51bGw7XHJcbiAgICAvKirog5zliKnlm57osIMgKi9cclxuICAgIHdpbl9jYWxsYmFjazogRnVuY3Rpb24gPSBudWxsO1xyXG4gICAgLyoq5Yqg6L295a6M5q+V5Zue6LCD5Zue6LCDICovXHJcbiAgICBsb2FkZWRfY2FsbGJhY2s6IEZ1bmN0aW9uID0gbnVsbDtcclxuICAgIC8qKuWuoOeJqSAqL1xyXG4gICAgcGV0OiBQZXQgPSBudWxsO1xyXG4gICAgLyoq5a6g54mp5oqA6IO955qE5LiA5Lqb6KKr5YqoICovXHJcbiAgICAvKirmraTmrKHkvKTlrrPlv4XlrprmmrTlh7sgKi9cclxuICAgIG11c3RfY3JpdDogbnVtYmVyID0gMDtcclxuICAgIC8qKuWuoOeJqTIx5Y+v5Lul6Kem5Y+R5aKe5Lyk5qyh5pWwICovXHJcbiAgICBjcml0X2luY3JlYXNlX2NkXzNfbnVtOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIHNldHVwX3NjYWxlOiBudW1iZXIgPSAwLjUwO1xyXG4gICAgYmFzZV9hdHRfamlhbmdlOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIC8qKmJ1ZmbnirbmgIEgKi9cclxuICAgIG1hcF9idWZmX3N0YXRlOiBNYXA8bnVtYmVyLCBCdWZmU3RhdGU+ID0gbnVsbDtcclxuICAgIC8qKmRlYnVmZueKtuaAgSAqL1xyXG4gICAgbWFwX2RlYnVmZl9zdGF0ZTogTWFwPG51bWJlciwgQnVmZlN0YXRlPiA9IG51bGw7XHJcbiAgICAvKirmmK/lkKbpnIDopoHmo4Dmn6XmioDog73ph4rmlL7ot53nprsgKi9cclxuICAgIGlzX25lZWRfY2hlY2tfZGlzdGFuY2U6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgLyoq5oyH56S65Zmo57G75Z6LICovXHJcbiAgICBwcm90ZWN0ZWQgc2tpbGxfdGlwX3R5cGU6IFNraWxsVGlwVHlwZSA9IFNraWxsVGlwVHlwZS5GdWxsO1xyXG4gICAgLyoq5piv5ZCm5Y+v5Lul5aSE55CG6Kem5pG45LqL5Lu277yM5b2T5oqA6IO9Q0Tlrozmr5XliIfmjInkuIvkuoboi7Hpm4Tml7bkuLp0cnVlICovXHJcbiAgICBwcml2YXRlIGlzX2Nhbl90b3VjaDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBza2lsbF90aXA6IFNraWxsVGlwID0gbnVsbDtcclxuICAgIC8qKuaYr+WQpuinpuWPkeiHquWKqOmHiuaUvumAu+i+kSAqL1xyXG4gICAgcHJpdmF0ZSBpc19hdXRvX3JlbGVhc2U6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgdG91Y2hfcmVjdDogY2MuUmVjdCA9IG51bGw7XHJcbiAgICAvKirmgLvlhbHkvb/nlKjmioDog73nmoTmrKHmlbAgKi9cclxuICAgIHByb3RlY3RlZCB1c2Vfc2tpbGxfbnVtOiBudW1iZXIgPSAwO1xyXG4gICAgcHJvdGVjdGVkIG5vZGVfc2hhZG93OiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIC8qKueCueWHu+WJqeS9mSAqL1xyXG4gICAgcHJvdGVjdGVkIGNsaWNrX3JlbWFpbjogbnVtYmVyID0gMDtcclxuICAgIC8qKuaUu+mAn+iusOW9leWAvO+8jOS4jeS9nOWIpOaWrSAqL1xyXG4gICAgZ29uZ2ppX3N1ZHU6IG51bWJlciA9IDA7XHJcbiAgICAvKirmioDog73pmJ/liJcgKi9cclxuICAgIHNraWxsX3F1ZXVlOiBTa2lsbFR5cGVbXSA9IFtdO1xyXG4gICAgLyoq5piv5ZCm6L+e57ut5pS75Ye7ICovXHJcbiAgICBpc19kb3VibGVfYXR0YWNrOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAvKirlsYLnuqcqL1xyXG4gICAgcHVibGljIHZfSW5kZXg6IG51bWJlciA9IDA7XHJcblxyXG4gICAgcG9zOiBjYy5WZWMyO1xyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUxPQUQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIHByb3RlY3RlZCBvbkxvYWQoKSB7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hbGxfaGVyby5zZXQodGhpcy5oZXJvX3R5cGUsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuc3BpbmUgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcclxuICAgICAgICAvL3RoaXMuc2V0U2tpbigpO1xyXG4gICAgICAgIHRoaXMudG91Y2hMaXN0ZW4oKTtcclxuICAgICAgICB0aGlzLmluaXRQb3MoKTtcclxuICAgICAgICAvLyBpZih0aGlzLmhlcm9fdHlwZT09SGVyb19UeXBlLkRlTHVZaSl7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuc2V0dXBfc2NhbGU9MC4yMjtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gaWYodGhpcy5oZXJvX3R5cGU9PUhlcm9fVHlwZS5MZWlTaGVufHx0aGlzLmhlcm9fdHlwZT09SGVyb19UeXBlLlNob3VXYW5nKXtcclxuICAgICAgICAvLyAgICAgdGhpcy5zZXR1cF9zY2FsZT0xO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICB0aGlzLm5vZGUuc2NhbGUgPSB0aGlzLnNldHVwX3NjYWxlO1xyXG4gICAgICAgIHRoaXMubm9kZS5zY2FsZVggPSAtdGhpcy5zZXR1cF9zY2FsZTtcclxuICAgICAgICB0aGlzLmFkZExvYWRCeUdhbWVFZmZlY3RJZChHYW1lRWZmZWN0SWQuaGVyb19za2lsbF9jb21tb24sIDIpO1xyXG4gICAgICAgIHRoaXMuYWRkTG9hZEJ5R2FtZUVmZmVjdElkKEdhbWVFZmZlY3RJZC5za2lsbF9kYW1hZ2VfcmVjb3JkLCAyKTtcclxuICAgICAgICB0aGlzLm5vZGUuekluZGV4ID0gMTtcclxuICAgICAgICB0aGlzLm1hcF9idWZmX3N0YXRlID0gbmV3IE1hcDxudW1iZXIsIEJ1ZmZTdGF0ZT4oKTtcclxuICAgICAgICB0aGlzLm1hcF9kZWJ1ZmZfc3RhdGUgPSBuZXcgTWFwPG51bWJlciwgQnVmZlN0YXRlPigpO1xyXG4gICAgICAgIHRoaXMuaGVyb19idWZmID0gbmV3IE1hcDxCdWZmSWQsIEJ1ZmZUaW1lcj4oKTtcclxuICAgICAgICB0aGlzLmhlcm9fZGVidWZmID0gbmV3IE1hcDxCdWZmSWQsIEJ1ZmZUaW1lcj4oKTtcclxuICAgICAgICB0aGlzLm1hcF9lbmRsZXNzX2J1ZmYgPSBuZXcgTWFwPEJ1ZmZJZCwgRW5kbGVzc0J1ZmY+KCk7XHJcbiAgICAgICAgdGhpcy5hZGRTa2lsbFRpcFR5cGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgc3RhcnQoKSB7XHJcbiAgICAgICAgLy/liqDovb3mlbDmja5cclxuICAgICAgICB0aGlzLmhlcm9fZGF0YSA9IEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2FtZV9oZXJvX2RhdGEuZ2V0KHRoaXMuaGVyb190eXBlKTtcclxuICAgICAgICB0aGlzLmJ1bGxldF9zcGVlZCA9IEhlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRCYXNlQnVsbGV0U3BlZWQodGhpcy5oZXJvX3R5cGUpO1xyXG4gICAgICAgIHRoaXMuZ29uZ2ppX2ppc2h1ID0gdGhpcy5oZXJvX2RhdGEuZ29uZ2ppX2ppYW5nZTtcclxuICAgICAgICB0aGlzLmdvbmdqaV9zdWR1ID0gdGhpcy5nZXRBdHRhY2tTcGVlZCgpO1xyXG4gICAgICAgIHRoaXMuc2V0SGVyb1N0YXRlKEhlcm9fU3RhdGUuaWRsZSwgR29uZ0ppX0ZhbmdYaWFuZy56aG9uZyk7XHJcbiAgICAgICAgLy90aGlzLnBsYXlTcGluZUFuaW1hdG9uKEhlcm9fU3RhdGVfTmFtZS5JZGxlLHRydWUsbnVsbCxudWxsKTtcclxuICAgICAgICAvL+WKoOi9vW1w6L+b5bqm5p2hXHJcbiAgICAgICAgdGhpcy5sb2FkTXBQcm9ncmVzcygpO1xyXG4gICAgICAgIHRoaXMubG9hZFBldCgpO1xyXG4gICAgICAgIGxldCBzZWxmU2hhZG93ID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdNb25zdGVyX1NoYWRvdycpO1xyXG4gICAgICAgIHRoaXMucG9zID0gc2VsZlNoYWRvdy5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgIHRoaXMubm9kZV9zaGFkb3cgPSBjYy5pbnN0YW50aWF0ZShzZWxmU2hhZG93KTtcclxuICAgICAgICB0aGlzLm5vZGVfc2hhZG93LnBhcmVudCA9IGNjLmZpbmQoJ0NhbnZhcy9IZXJvX1NoYWRvd19Sb290Jyk7XHJcbiAgICAgICAgdGhpcy5ub2RlX3NoYWRvdy5zY2FsZSA9IHRoaXMuc2V0dXBfc2NhbGU7XHJcbiAgICAgICAgdGhpcy5ub2RlX3NoYWRvdy5zZXRQb3NpdGlvbihjYy52Mih0aGlzLm5vZGUueCArIHRoaXMucG9zLnggKiB0aGlzLnNldHVwX3NjYWxlLCB0aGlzLm5vZGUueSArIHRoaXMucG9zLnkgKiB0aGlzLnNldHVwX3NjYWxlKSk7XHJcbiAgICAgICAgc2VsZlNoYWRvdy5yZW1vdmVGcm9tUGFyZW50KCk7XHJcbiAgICAgICAgaWYgKHRoaXMuZ2V0SGVyb1N0YXRlKCkgPT0gSGVyb19TdGF0ZS5leGl0KSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZV9zaGFkb3cub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHRoaXMubm9kZS56SW5kZXggPSAyO1xyXG4gICAgICAgIHRoaXMuY2FzdGluZ19kaXN0YW5jZSA9IHRoaXMuaGVyb19kYXRhLmdvbmdqaV9mYW53ZWk7XHJcbiAgICAgICAgaWYgKGNjLndpblNpemUuaGVpZ2h0IC8gY2Mud2luU2l6ZS53aWR0aCA+IDIpIHtcclxuICAgICAgICAgICAgdGhpcy5jYXN0aW5nX2Rpc3RhbmNlID0gdGhpcy5oZXJvX2RhdGEuZ29uZ2ppX2ZhbndlaSArIDIwMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gaWYodGhpcy5oZXJvX3R5cGU9PUhlcm9fVHlwZS5Odld1KXtcclxuICAgICAgICAvLyAgICAgdGhpcy5jYXN0aW5nX2Rpc3RhbmNlPTE5MiozK0dhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW5lbXlfYXR0X3ktdGhpcy5ub2RlLnlcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgdGhpcy5zZXRUb3VjaFJlY3QoKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgLy/lj5bmtojnm5HlkKzop6bmkbjkuovku7ZcclxuICAgICAgICBsZXQgdG91Y2hOb2RlID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCd0b3VjaE5vZGUnKTtcclxuICAgICAgICBpZiAodG91Y2hOb2RlKSB7XHJcbiAgICAgICAgICAgIC8vIHRvdWNoTm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsdGhpcy5vblRvdWNoU3RhcnQsdGhpcyk7XHJcbiAgICAgICAgICAgIC8vIHRvdWNoTm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfTU9WRSx0aGlzLm9uVG91Y2hNb3ZlLHRoaXMpO1xyXG4gICAgICAgICAgICAvLyB0b3VjaE5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCx0aGlzLm9uVG91Y2hFbmQsdGhpcyk7XHJcbiAgICAgICAgICAgIC8vIHRvdWNoTm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfQ0FOQ0VMLHRoaXMub25Ub3VjaENhbmNlbCx0aGlzKTtcclxuICAgICAgICAgICAgLy8gaW5zdGFuY2Uub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCB0aGlzLm9uVG91Y2hTdGFydEJ5Sm95LCB0aGlzKTtcclxuICAgICAgICAgICAgLy8gaW5zdGFuY2Uub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX01PVkUsIHRoaXMub25Ub3VjaE1vdmVCeUpveSwgdGhpcyk7XHJcbiAgICAgICAgICAgIGluc3RhbmNlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMub25Ub3VjaEVuZEJ5Sm95LCB0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hbGxfaGVyby5kZWxldGUodGhpcy5oZXJvX3R5cGUpXHJcbiAgICB9XHJcblxyXG4gICAgYWRkU2tpbGxUaXBUeXBlKCkge1xyXG4gICAgICAgIGxldCBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5wcmVmYWJfc2tpbGxfdGlwKTtcclxuICAgICAgICB0aGlzLnNraWxsX3RpcCA9IG5vZGUuZ2V0Q29tcG9uZW50KFNraWxsVGlwKTtcclxuICAgICAgICB0aGlzLnNraWxsX3RpcF90eXBlID0gdGhpcy5za2lsbF90aXAuZ2V0U2tpbGxUaXBUeXBlKCk7XHJcbiAgICAgICAgdGhpcy5za2lsbF90aXAubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMuc2tpbGxfdGlwX3R5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBTa2lsbFRpcFR5cGUuRnVsbDoge1xyXG4gICAgICAgICAgICAgICAgU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBTa2lsbFRpcFR5cGUuQ2lyY2xlOiB7XHJcbiAgICAgICAgICAgICAgICBTa2lsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFNraWxsVGlwVHlwZS5SZWN0OiB7XHJcbiAgICAgICAgICAgICAgICBTa2lsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFNraWxsVGlwVHlwZS5EaXI6IHtcclxuICAgICAgICAgICAgICAgIFNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNldFRvdWNoUmVjdCgpIHtcclxuICAgICAgICBsZXQgdG91Y2hOb2RlID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCd0b3VjaE5vZGUnKTtcclxuICAgICAgICB0aGlzLnRvdWNoX3JlY3QgPSBjYy5yZWN0KHRoaXMubm9kZS54ICsgdG91Y2hOb2RlLnggKiB0aGlzLnNldHVwX3NjYWxlIC0gKHRvdWNoTm9kZS53aWR0aCAqIHRoaXMuc2V0dXBfc2NhbGUgLyAyKSwgdGhpcy5ub2RlLnkgKyB0b3VjaE5vZGUueSAqIHRoaXMuc2V0dXBfc2NhbGUgLSAodG91Y2hOb2RlLmhlaWdodCAqIHRoaXMuc2V0dXBfc2NhbGUgLyAyKSwgdG91Y2hOb2RlLndpZHRoICogdGhpcy5zZXR1cF9zY2FsZSwgdG91Y2hOb2RlLmhlaWdodCAqIHRoaXMuc2V0dXBfc2NhbGUpO1xyXG4gICAgICAgIC8vIGxldCBnZz1jYy5maW5kKCdDYW52YXMvRmlnaHRpbmdfUm9vdCcpLmdldENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgLy8gZ2cucmVjdCh0aGlzLnRvdWNoX3JlY3QueCx0aGlzLnRvdWNoX3JlY3QueSx0aGlzLnRvdWNoX3JlY3Qud2lkdGgsdGhpcy50b3VjaF9yZWN0LmhlaWdodCk7XHJcbiAgICAgICAgLy8gZ2cuc3Ryb2tlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0U2tpbGxUaXBTaXplKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5za2lsbF90aXAubm9kZS53aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIHRoaXMuc2tpbGxfdGlwLm5vZGUuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIGdldFNraWxsVGlwU2l6ZSgpOiBjYy5TaXplIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5za2lsbF90aXAubm9kZS5nZXRDb250ZW50U2l6ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdG91Y2hMaXN0ZW4oKSB7XHJcbiAgICAgICAgLy/nm5HlkKzop6bmkbjkuovku7ZcclxuICAgICAgICBsZXQgdG91Y2hOb2RlID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCd0b3VjaE5vZGUnKTtcclxuICAgICAgICBpZiAodG91Y2hOb2RlKSB7XHJcbiAgICAgICAgICAgIC8vIHRvdWNoTm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCx0aGlzLm9uVG91Y2hTdGFydCx0aGlzKTtcclxuICAgICAgICAgICAgLy8gdG91Y2hOb2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX01PVkUsdGhpcy5vblRvdWNoTW92ZSx0aGlzKTtcclxuICAgICAgICAgICAgLy8gdG91Y2hOb2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCx0aGlzLm9uVG91Y2hFbmQsdGhpcyk7XHJcbiAgICAgICAgICAgIC8vIHRvdWNoTm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9DQU5DRUwsdGhpcy5vblRvdWNoQ2FuY2VsLHRoaXMpO1xyXG4gICAgICAgICAgICAvLyBpbnN0YW5jZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgdGhpcy5vblRvdWNoU3RhcnRCeUpveSwgdGhpcyk7XHJcbiAgICAgICAgICAgIC8vIGluc3RhbmNlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX01PVkUsIHRoaXMub25Ub3VjaE1vdmVCeUpveSwgdGhpcyk7XHJcbiAgICAgICAgICAgIGluc3RhbmNlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vblRvdWNoRW5kQnlKb3ksIHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRQb3MoKSB7XHJcbiAgICAgICAgbGV0IHh1YW55dW4gPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3h1YW55dW4nKTtcclxuICAgICAgICB0aGlzLnh1YW55dW5fcG9zID0geHVhbnl1bi5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgIHh1YW55dW4ucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgICAgIHRoaXMuYnVsbGV0X3BvcyA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgIGxldCBidWxsZXQxID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdidWxsZXQxJyk7XHJcbiAgICAgICAgbGV0IGJ1bGxldDIgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2J1bGxldDInKTtcclxuICAgICAgICB0aGlzLmJ1bGxldF9wb3MucHVzaChidWxsZXQyLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgIHRoaXMuYnVsbGV0X3Bvcy5wdXNoKGJ1bGxldDEuZ2V0UG9zaXRpb24oKSk7XHJcbiAgICAgICAgdGhpcy5idWxsZXRfcG9zLnB1c2goYnVsbGV0Mi5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICBidWxsZXQxLnJlbW92ZUZyb21QYXJlbnQoKTtcclxuICAgICAgICBidWxsZXQyLnJlbW92ZUZyb21QYXJlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkdhbWVXaW4oKSB7XHJcbiAgICAgICAgdGhpcy5za2lsbF9xdWV1ZSA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgIHRoaXMuc2V0SGVyb1N0YXRlKEhlcm9fU3RhdGUuaWRsZSwgR29uZ0ppX0ZhbmdYaWFuZy56aG9uZyk7XHJcbiAgICAgICAgdGhpcy5nb25namlfamlzaHUgPSAwO1xyXG4gICAgICAgIGlmICh0aGlzLndpbl9jYWxsYmFjaykge1xyXG4gICAgICAgICAgICB0aGlzLndpbl9jYWxsYmFjaygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgYWRkU2tpbGxMaXN0ZW4oY2FsbEJhY2s6IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5za2lsbF9jYWxsYmFjayA9IGNhbGxCYWNrO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBhZGRBdHRhY2tMaXN0ZW4oY2FsbEJhY2s6IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5hdHRhY2tfY2FsbGJhY2sgPSBjYWxsQmFjaztcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgYWRkSGl0TGlzdGVuKGNhbGxCYWNrOiBGdW5jdGlvbikge1xyXG4gICAgICAgIHRoaXMuaGl0X2NhbGxiYWNrID0gY2FsbEJhY2s7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGFkZFJlc2V0TGlzdGVuKGNhbGxCYWNrOiBGdW5jdGlvbikge1xyXG4gICAgICAgIHRoaXMucmVzZXRfY2FsbGJhY2sgPSBjYWxsQmFjaztcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgYWRkR2FtZVdpbkxpc3RlbihjYWxsQmFjazogRnVuY3Rpb24pIHtcclxuICAgICAgICB0aGlzLndpbl9jYWxsYmFjayA9IGNhbGxCYWNrO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBhZGRMb2FkZWRMaXN0ZW4oY2FsbEJhY2s6IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5sb2FkZWRfY2FsbGJhY2sgPSBjYWxsQmFjaztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGxvYWRNcFByb2dyZXNzKCkge1xyXG4gICAgICAgIC8vIGNjLnJlc291cmNlcy5sb2FkKCdoZXJvcy9za2lsbF9pY29uJyxjYy5QcmVmYWIsKGVycm9yOiBFcnJvciwgYXNzZXRzOmNjLlByZWZhYik9PntcclxuICAgICAgICAvLyAgICAgaWYoZXJyb3IpXHJcbiAgICAgICAgLy8gICAgIHtcclxuICAgICAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAvLyAgICAgICAgIHJldHVybjtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vICAgICBsZXQgbXBOb2RlPWNjLmluc3RhbnRpYXRlKGFzc2V0cyk7XHJcbiAgICAgICAgLy8gICAgIG1wTm9kZS5wYXJlbnQ9Y2MuZmluZCgnQ2FudmFzL0ZpZ2h0aW5nX1VpJyk7XHJcbiAgICAgICAgLy8gICAgIG1wTm9kZS5zZXRQb3NpdGlvbihjYy52Mih0aGlzLm5vZGUueCx0aGlzLm5vZGUueSsxNSkpO1xyXG4gICAgICAgIC8vICAgICB0aGlzLm1wX3Byb2dyZXNzPW1wTm9kZS5nZXRDb21wb25lbnQoTXBQcm9ncmVzcyk7XHJcbiAgICAgICAgLy8gICAgIHRoaXMubXBfcHJvZ3Jlc3MuaW5pdCh0aGlzLmhlcm9fdHlwZSk7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuY2hhbmdlQ0QodGhpcy5oZXJvX2RhdGEuZ2V0U2tpbGxDb2xkRG93bihTa2lsbFR5cGUuQWN0aXZlKS8zKTtcclxuICAgICAgICAvLyAgICAgdGhpcy5za2lsbF90b3RhbF90aW1lPXRoaXMuaGVyb19kYXRhLmdldFNraWxsQ29sZERvd24oU2tpbGxUeXBlLkFjdGl2ZSk7XHJcbiAgICAgICAgLy8gICAgIGlmKHRoaXMuZ2V0SGVyb1N0YXRlKCk9PUhlcm9fU3RhdGUuZXhpdCl7XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLm1wX3Byb2dyZXNzLmhpZGUoKTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBsb2FkWmhpU2hpUWkoemhpc2hpcWk6IHN0cmluZywgdHlwZTogU2tpbGxJbmRpY2F0b3JUeXBlKSB7XHJcbiAgICAgICAgdGhpcy56aGlzaGlxaV90eXBlID0gdHlwZTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIuWKoOi9vWhlcm9cIiArIHpoaXNoaXFpKTtcclxuXHJcbiAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQoJ2hlcm9zLycgKyB6aGlzaGlxaSwgY2MuUHJlZmFiLCAoZXJyb3I6IEVycm9yLCBhc3NldHM6IGNjLlByZWZhYikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZExvYWRCeUdhbWVFZmZlY3RJZChpZDogR2FtZUVmZmVjdElkLCBpbml0Q291bnQ6IG51bWJlcikge1xyXG4gICAgICAgIGlmIChHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRFZmZlY3RQb29sQnlJZChpZCwgaW5pdENvdW50LCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VyX2xvYWRfbnVtKys7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmN1cl9sb2FkX251bSA+PSB0aGlzLm5lZWRfbG9hZF9udW0pIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzX2xvYWRfb2sgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzX2xvYWRfb2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIEhlcm8uY3VyX2xvYWRlZF9udW0rKztcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5sb2FkZWRfY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkZWRfY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMubmVlZF9sb2FkX251bSsrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKirliqDovb3lrqDniakgKi9cclxuICAgIGxvYWRQZXQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaGVyb19kYXRhLnBldF9pZCA+IDApIHtcclxuICAgICAgICAgICAgbGV0IHR5cGUgPSBTcGlyaXRBdHRyaWJ1dGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3Bpcml0VHlwZSh0aGlzLmhlcm9fZGF0YS5wZXRfaWQpO1xyXG4gICAgICAgICAgICB0aGlzLm5lZWRfbG9hZF9udW0rKztcclxuICAgICAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQoJ3BldC9wZXQnICsgdHlwZSwgY2MuUHJlZmFiLCAoZXJyb3I6IEVycm9yLCBhc3NldHM6IGNjLlByZWZhYikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCBub2RlID0gY2MuaW5zdGFudGlhdGUoYXNzZXRzKTtcclxuICAgICAgICAgICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9QZXRfUm9vdCcpLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGV0ID0gbm9kZS5hZGRDb21wb25lbnQoSWNlUGV0KTtcclxuICAgICAgICAgICAgICAgICAgICB9OyBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wZXQgPSBub2RlLmFkZENvbXBvbmVudChGaXJlUGV0KTtcclxuICAgICAgICAgICAgICAgICAgICB9OyBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wZXQgPSBub2RlLmFkZENvbXBvbmVudChXaW5kUGV0KTtcclxuICAgICAgICAgICAgICAgICAgICB9OyBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wZXQgPSBub2RlLmFkZENvbXBvbmVudChSYXlQZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH07IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5wZXQuaW5pdCh0aGlzLmhlcm9fZGF0YS5wZXRfaWQsIHRoaXMuaGVyb190eXBlLCBjYy52Mih0aGlzLm5vZGUueCAtIDY0LCB0aGlzLm5vZGUueSArIDY0KSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBldC5zZXRIZXJvRGF0YSh0aGlzLmhlcm9fZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cl9sb2FkX251bSsrO1xyXG4gICAgICAgICAgICAgICAgbm9kZS56SW5kZXggPSAxMDAwIC0gbm9kZS55O1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VyX2xvYWRfbnVtID49IHRoaXMubmVlZF9sb2FkX251bSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNfbG9hZF9vayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgSGVyby5jdXJfbG9hZGVkX251bSsrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoq6ZqQ6JeP6Iux6ZuE77yM5q2k5pe26Iux6ZuE5LiN6IO95pS75Ye75oiW6ICF6YeK5pS+5oqA6IO9ICovXHJcbiAgICBoaWRlSGVybygpIHtcclxuICAgICAgICB0aGlzLmhlcm9fc3RhdGUgPSBIZXJvX1N0YXRlLmV4aXQ7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHkgPSAwO1xyXG4gICAgICAgIGlmICh0aGlzLm5vZGVfc2hhZG93KSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZV9zaGFkb3cub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLm1wX3Byb2dyZXNzKSB7XHJcbiAgICAgICAgICAgIHRoaXMubXBfcHJvZ3Jlc3MuaGlkZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzaG93SGVybygpIHtcclxuICAgICAgICB0aGlzLnNldEhlcm9TdGF0ZShIZXJvX1N0YXRlLmlkbGUsIEdvbmdKaV9GYW5nWGlhbmcuemhvbmcpO1xyXG4gICAgICAgIHRoaXMubm9kZS5vcGFjaXR5ID0gMjU1O1xyXG4gICAgICAgIHRoaXMubm9kZV9zaGFkb3cub3BhY2l0eSA9IDI1NTtcclxuICAgICAgICB0aGlzLm1wX3Byb2dyZXNzLnNob3coKTtcclxuICAgIH1cclxuICAgIHBvc1g6IG51bWJlciA9IDA7Ly/liJ3lp4vljJbml7blgJnnmoTkvY3nva5cclxuICAgIHRhcmdldFg6IG51bWJlciA9IDA7XHJcbiAgICBlYXNpbmc6IG51bWJlciA9IDAuMTtcclxuICAgIG9uVG91Y2hFbmRCeUpveShldmVudDogY2MuRXZlbnQuRXZlbnRUb3VjaCwgZGF0YSkge1xyXG4gICAgICAgIHRoaXMudGFyZ2V0WCA9IChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFuaVR5cGUgLSA0KSAqIDc1ICsgdGhpcy5wb3NYO1xyXG4gICAgfVxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t44CQ55qu6IKk44CRLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgcHJvdGVjdGVkIHNldFNraW4oKSB7XHJcbiAgICAgICAgLy9sZXQgaGVyb1F1YWxpdHk9SGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvUXVhbGl0eSh0aGlzLmhlcm9fdHlwZSk7XHJcbiAgICAgICAgLy9sZXQgdGllcj1IZXJvUXVhbGl0eU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRUaWVyKGhlcm9RdWFsaXR5KTtcclxuICAgICAgICAvL3RoaXMuc3BpbmUuc2V0U2tpbignc3RhZ2UnKyhIZXJvTWFuYWdlci5nZXRTa2luSW5kZXgodGllcikpKTtcclxuICAgIH1cclxuICAgIC8qKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLeaTjeS9nOebuOWFsy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3op6bmkbjnp7vliqjkuovku7YtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICAvLyBsZWF0ZXJOdW06IG51bWJlciA9IDA7Ly/lu7bov5/mlbDmja7mkq3mlL7liqjnlLtcclxuICAgIC8vIGxlYXRlclNwZWVkOiBudW1iZXIgPSA1O1xyXG5cclxuICAgIC8vIG5ld1BvczogY2MuVmVjMjtcclxuICAgIC8vIHBvc1lUZW1wOiBudW1iZXI7XHJcblxyXG4gICAgLy8gc3BlZWRUeXBlOiBTcGVlZFR5cGUgPSBTcGVlZFR5cGUuU1RPUDtcclxuICAgIC8vIG1vdmVEaXIgPSBjYy52MigwLCAxKTtcclxuICAgIC8vIC8v5oqE5Yir5Lq655qE77yM5pys5p2l5pyJ5Lik56eN6YCf5bqm77yM546w5Zyo5YWI55So5LiA5Liq5pWw5o2uXHJcbiAgICAvLyBub3JtYWxTcGVlZCA9IDYwMDtcclxuICAgIC8vIGZhc3RTcGVlZCA9IDYwMDtcclxuXHJcbiAgICAvLyBzdG9wU3BlZWQgPSAwO1xyXG5cclxuICAgIC8vIG1vdmVTcGVlZCA9IDA7XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICog56e75YqoXHJcbiAgKi9cclxuICAgIC8vIG1vdmUoKSB7XHJcbiAgICAvLyAgICAgLy8gdGhpcy5ub2RlLmFuZ2xlID1cclxuICAgIC8vICAgICAvLyAgIGNjLm1pc2MucmFkaWFuc1RvRGVncmVlcyhNYXRoLmF0YW4yKHRoaXMubW92ZURpci55LCB0aGlzLm1vdmVEaXIueCkpIC0gOTA7XHJcblxyXG4gICAgLy8gICAgIC8vIGlmICh0aGlzLnJpZ2lkYm9keSkge1xyXG4gICAgLy8gICAgIC8vICAgdGhpcy5fYm9keS5hcHBseUZvcmNlVG9DZW50ZXIoXHJcbiAgICAvLyAgICAgLy8gICAgIGNjLnYyKHRoaXMubW92ZURpci54ICogMjAwLCB0aGlzLm1vdmVEaXIueSAqIDIwMCksXHJcbiAgICAvLyAgICAgLy8gICAgIHRydWVcclxuICAgIC8vICAgICAvLyAgICk7XHJcbiAgICAvLyAgICAgLy8gfSBlbHNlIHtcclxuICAgIC8vICAgICAvLyAgIGNvbnN0IG9sZFBvcyA9IGNjLnYyKCk7XHJcbiAgICAvLyAgICAgLy8gICB0aGlzLm5vZGUuZ2V0UG9zaXRpb24ob2xkUG9zKTtcclxuICAgIC8vICAgICAvLyAgIGNvbnN0IG5ld1BvcyA9IG9sZFBvcy5hZGQodGhpcy5tb3ZlRGlyLm11bCh0aGlzLl9tb3ZlU3BlZWQgLyAxMjApKTtcclxuICAgIC8vICAgICAvLyAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbihuZXdQb3MpO1xyXG4gICAgLy8gICAgIC8vIH1cclxuXHJcbiAgICAvLyAgICAgaWYgKHRoaXMuc3BlZWRUeXBlICE9PSBTcGVlZFR5cGUuU1RPUCkge1xyXG4gICAgLy8gICAgICAgICBjb25zdCBvbGRQb3MgPSBjYy52MigpO1xyXG4gICAgLy8gICAgICAgICB0aGlzLm5vZGUuZ2V0UG9zaXRpb24ob2xkUG9zKTtcclxuICAgIC8vICAgICAgICAgdGhpcy5uZXdQb3MgPSBvbGRQb3MuYWRkKHRoaXMubW92ZURpci5tdWwodGhpcy5tb3ZlU3BlZWQgLyAxMjApKTtcclxuICAgIC8vICAgICAgICAgdGhpcy5uZXdQb3MueSA9IG9sZFBvcy55O1xyXG4gICAgLy8gICAgICAgICB0aGlzLnBvc1lUZW1wID0gb2xkUG9zLnk7XHJcblxyXG4gICAgLy8gICAgIH1cclxuICAgIC8vICAgICBpZiAodGhpcy5sZWF0ZXJOdW0gPT0gMCkge1xyXG4gICAgLy8gICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLm1vdmVEYXRhLnVuc2hpZnQodGhpcy5uZXdQb3MpO1xyXG5cclxuICAgIC8vICAgICB9XHJcblxyXG5cclxuICAgIC8vICAgICBpZiAoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5tb3ZlRGF0YVt0aGlzLmxlYXRlck51bSAqIHRoaXMubGVhdGVyU3BlZWRdICE9IG51bGwpIHtcclxuICAgIC8vICAgICAgICAgY29uc3QgbmV3UG9zVGVwbSA9IEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkubW92ZURhdGFbdGhpcy5sZWF0ZXJOdW0gKiB0aGlzLmxlYXRlclNwZWVkXTtcclxuICAgIC8vICAgICAgICAgbmV3UG9zVGVwbS55PXRoaXMucG9zWVRlbXA7XHJcbiAgICAvLyAgICAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbihuZXdQb3NUZXBtKTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgICAgaWYoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5tb3ZlRGF0YS5sZW5ndGg+NjApe1xyXG5cclxuICAgIC8vICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5tb3ZlRGF0YS5zcGxpY2UoNjAsR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5tb3ZlRGF0YS5sZW5ndGgtNjApO1xyXG5cclxuXHJcbiAgICAvLyAgICAgfVxyXG5cclxuICAgIC8vICAgICB0aGlzLm5vZGVfc2hhZG93LnNldFBvc2l0aW9uKGNjLnYyKHRoaXMubm9kZS54ICsgdGhpcy5wb3MueCAqIHRoaXMuc2V0dXBfc2NhbGUsIHRoaXMubm9kZS55ICsgdGhpcy5wb3MueSAqIHRoaXMuc2V0dXBfc2NhbGUpKTtcclxuICAgIC8vIH1cclxuICAgIC8vIG9uVG91Y2hTdGFydEJ5Sm95KCkgeyB9XHJcblxyXG4gICAgLy8gb25Ub3VjaE1vdmVCeUpveShldmVudDogY2MuRXZlbnQuRXZlbnRUb3VjaCwgZGF0YSkge1xyXG4gICAgLy8gICAgIHRoaXMuc3BlZWRUeXBlID0gZGF0YS5zcGVlZFR5cGU7XHJcbiAgICAvLyAgICAgdGhpcy5tb3ZlRGlyID0gZGF0YS5tb3ZlRGlzdGFuY2U7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gb25Ub3VjaEVuZEJ5Sm95KGV2ZW50OiBjYy5FdmVudC5FdmVudFRvdWNoLCBkYXRhKSB7XHJcbiAgICAvLyAgICAgdGhpcy5zcGVlZFR5cGUgPSBkYXRhLnNwZWVkVHlwZTtcclxuICAgIC8vIH1cclxuICAgIC8qKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLeaTjeS9nOebuOWFsy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3op6bmkbjkuovku7YtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL+aXp+eJiOWKn+iDvVxyXG4gICAgb25Ub3VjaFN0YXJ0KGU6IGNjLkV2ZW50LkV2ZW50VG91Y2gpIHtcclxuICAgICAgICBpZiAodGhpcy5pc0hhdmVEZUJ1ZmYoQnVmZklkLk1vbnN0ZXJfWHVhbll1bikgJiYgdGhpcy5oZXJvX3R5cGUgIT0gSGVyb19UeXBlLlpoZW5EZSkge1xyXG4gICAgICAgICAgICB0aGlzLmlzX2Nhbl90b3VjaCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDE3MDAwMiksIDEpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnNraWxsX2NkX3RpbWUgPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNfY2FuX3RvdWNoID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNsaWNrX3JlbWFpbiA+IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDE3MDAwMSksIDEpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX3N0YXRlICE9IEdhbWVTdGF0ZS5HYW1lX1BsYXlpbmcpXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB0aGlzLmlzX2Nhbl90b3VjaCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5pc19hdXRvX3JlbGVhc2UgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuY2xpY2tfcmVtYWluID0gMTtcclxuICAgICAgICBTa2lsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZWxlYXNlU2tpbGxSZXN1bHQoZmFsc2UpO1xyXG4gICAgICAgIGxldCBwb3MgPSBTa3lNYW5hZ2VyLmdldEluc3RhbmNlKCkubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihlLmdldExvY2F0aW9uKCkpO1xyXG4gICAgICAgIC8v5aaC5p6c5Y+v5Lul6YeK5pS+77yM5pi+56S65oyH56S65ZmoXHJcbiAgICAgICAgc3dpdGNoICh0aGlzLnNraWxsX3RpcF90eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgU2tpbGxUaXBUeXBlLkZ1bGw6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxfdGlwLm5vZGUuc2V0UG9zaXRpb24oY2MudjIoMCwgLWNjLndpblNpemUuaGVpZ2h0IC8gMikpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5za2lsbF90aXAubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxfdGlwLnNldElzQ2FuUmVsZWFzZShmYWxzZSk7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgU2tpbGxUaXBUeXBlLkNpcmNsZToge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5za2lsbF90aXAubm9kZS5zZXRQb3NpdGlvbihwb3MpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5za2lsbF90aXAubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5za2lsbF90aXAuc2V0SXNDYW5SZWxlYXNlKGZhbHNlKTtcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBTa2lsbFRpcFR5cGUuUmVjdDoge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5za2lsbF90aXAubm9kZS5zZXRQb3NpdGlvbihwb3MpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5za2lsbF90aXAubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5za2lsbF90aXAuc2V0SXNDYW5SZWxlYXNlKGZhbHNlKTtcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBTa2lsbFRpcFR5cGUuRGlyOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNraWxsX3RpcC5ub2RlLnNldFBvc2l0aW9uKHRoaXMubm9kZS5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxfdGlwLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxfdGlwLnNldElzQ2FuUmVsZWFzZShmYWxzZSk7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5pi+56S66IyD5Zu05oyH56S65ZmoXHJcbiAgICAgICAgU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1NraWxsUmFuZ2UodGhpcy5ub2RlLnksIHRoaXMuY2FzdGluZ19kaXN0YW5jZSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25Ub3VjaE1vdmUoZTogY2MuRXZlbnQuRXZlbnRUb3VjaCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzX2Nhbl90b3VjaCA9PSBmYWxzZSB8fCBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX3N0YXRlICE9IEdhbWVTdGF0ZS5HYW1lX1BsYXlpbmcpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBsZXQgcG9zID0gU2t5TWFuYWdlci5nZXRJbnN0YW5jZSgpLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIoZS5nZXRMb2NhdGlvbigpKTtcclxuICAgICAgICBpZiAoIXRoaXMudG91Y2hfcmVjdC5jb250YWlucyhwb3MpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNfYXV0b19yZWxlYXNlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN3aXRjaCAodGhpcy5za2lsbF90aXBfdHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIFNraWxsVGlwVHlwZS5GdWxsOiB7XHJcblxyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFNraWxsVGlwVHlwZS5DaXJjbGU6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxfdGlwLm5vZGUuc2V0UG9zaXRpb24ocG9zKTtcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBTa2lsbFRpcFR5cGUuUmVjdDoge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5za2lsbF90aXAubm9kZS5zZXRQb3NpdGlvbihwb3MpO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFNraWxsVGlwVHlwZS5EaXI6IHtcclxuXHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocG9zLnkgPiBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmVuZW15X2F0dF95KSB7XHJcbiAgICAgICAgICAgIGxldCBkaXN0YW5jZSA9IHBvcy55IC0gdGhpcy5ub2RlLnk7XHJcbiAgICAgICAgICAgIGlmIChkaXN0YW5jZSA8PSB0aGlzLmNhc3RpbmdfZGlzdGFuY2UpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxfdGlwLnNldElzQ2FuUmVsZWFzZSh0cnVlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxfdGlwLnNldElzQ2FuUmVsZWFzZShmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNraWxsX3RpcC5zZXRJc0NhblJlbGVhc2UoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvblRvdWNoRW5kKGU6IGNjLkV2ZW50LkV2ZW50VG91Y2gpIHtcclxuICAgICAgICBTa2lsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZWxlYXNlU2tpbGxSZXN1bHQodHJ1ZSk7XHJcbiAgICAgICAgU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuaGlkZVNraWxsUmFuZ2UoKTtcclxuICAgICAgICB0aGlzLnNraWxsX3RpcC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLmlzX2Nhbl90b3VjaCA9PSBmYWxzZSB8fCBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX3N0YXRlICE9IEdhbWVTdGF0ZS5HYW1lX1BsYXlpbmcpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBsZXQgcG9zID0gU2t5TWFuYWdlci5nZXRJbnN0YW5jZSgpLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIoZS5nZXRMb2NhdGlvbigpKTtcclxuICAgICAgICAvL+WIpOaWreWdkOagh1xyXG4gICAgICAgIGlmIChwb3MueSA+IEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW5lbXlfYXR0X3kpIHtcclxuICAgICAgICAgICAgbGV0IGRpc3RhbmNlID0gcG9zLnkgLSB0aGlzLm5vZGUueTtcclxuICAgICAgICAgICAgaWYgKGRpc3RhbmNlIDw9IHRoaXMuY2FzdGluZ19kaXN0YW5jZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWxlYXNlU2tpbGwocG9zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzX2F1dG9fcmVsZWFzZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhcnRBdXRvUmVsZWFzZSgpID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCgxNDAwMjMpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvblRvdWNoQ2FuY2VsKGU6IGNjLkV2ZW50LkV2ZW50VG91Y2gpIHtcclxuICAgICAgICBTa2lsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZWxlYXNlU2tpbGxSZXN1bHQodHJ1ZSk7XHJcbiAgICAgICAgU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuaGlkZVNraWxsUmFuZ2UoKTtcclxuICAgICAgICB0aGlzLnNraWxsX3RpcC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLmlzX2Nhbl90b3VjaCA9PSBmYWxzZSB8fCBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX3N0YXRlICE9IEdhbWVTdGF0ZS5HYW1lX1BsYXlpbmcpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBsZXQgcG9zID0gU2t5TWFuYWdlci5nZXRJbnN0YW5jZSgpLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIoZS5nZXRMb2NhdGlvbigpKTtcclxuICAgICAgICBpZiAocG9zLnkgPiBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmVuZW15X2F0dF95KSB7XHJcbiAgICAgICAgICAgIGxldCBkaXN0YW5jZSA9IHBvcy55IC0gdGhpcy5ub2RlLnk7XHJcbiAgICAgICAgICAgIGlmIChkaXN0YW5jZSA8PSB0aGlzLmNhc3RpbmdfZGlzdGFuY2UpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVsZWFzZVNraWxsKHBvcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc19hdXRvX3JlbGVhc2UpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRBdXRvUmVsZWFzZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0QXV0b1JlbGVhc2UoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgLy/mib7mgKrvvIzmib7kuI3liLDlsLHkuI3mlL5cclxuICAgICAgICBsZXQgZW5lbXlzID0gTW9uc3Rlck1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNb25zdGVyc0Zvck5lYXJlc3RCeVNraWxsKDEsIHRoaXMubm9kZS55LCB0aGlzLmNhc3RpbmdfZGlzdGFuY2UpO1xyXG4gICAgICAgIGlmIChlbmVteXMpIHtcclxuICAgICAgICAgICAgLy/mnIDliY3nmoTmlYzkurpcclxuICAgICAgICAgICAgbGV0IGVuZW15UG9zID0gZW5lbXlzWzBdLmdldENvbXBvbmVudChNb25zdGVyKS5nZXRDZW50ZXJQb3MoKTtcclxuICAgICAgICAgICAgdGhpcy5yZWxlYXNlU2tpbGwoZW5lbXlQb3MpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKuinpuaRuOeahOS9jee9riAqL1xyXG4gICAgcmVsZWFzZVNraWxsKHRvdWNoUG9zOiBjYy5WZWMyKSB7XHJcbiAgICAgICAgaWYgKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfc3RhdGUgIT0gR2FtZVN0YXRlLkdhbWVfUGxheWluZylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMudXNlX3NraWxsX251bSsrO1xyXG4gICAgICAgIC8vdGhpcy5tcF9wcm9ncmVzcy5zaG93TGlnaHQoKTtcclxuICAgICAgICBpZiAodGhpcy5za2lsbF9jYWxsYmFjaykge1xyXG4gICAgICAgICAgICB0aGlzLnNraWxsX2NhbGxiYWNrKHRvdWNoUG9zKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yZXNldENEKCk7XHJcbiAgICAgICAgVGFza01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5lbWl0VGFzayhUYXNrSXRlbS7ph4rmlL5Y5qyh5Lq654mp5oqA6IO9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZ2V0U2tpbGxSZWxlYXNlSWQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5oZXJvX3R5cGUgKiAxMDAwMCArIHRoaXMudXNlX3NraWxsX251bTtcclxuICAgIH1cclxuXHJcbiAgICAvKirojrflvpflrZDlvLnnlJ/miJDnmoTkvY3nva4gKi9cclxuICAgIGdldENyZWF0ZUJ1bGxldFBvcygpOiBjYy5WZWMyIHtcclxuICAgICAgICBsZXQgcG9zID0gdGhpcy5idWxsZXRfcG9zW3RoaXMuY3VyX2Zhbmd4aWFuZ107XHJcbiAgICAgICAgcmV0dXJuIGNjLnYyKHRoaXMubm9kZS54ICsgcG9zLnggKiB0aGlzLm5vZGUuc2NhbGVYLCB0aGlzLm5vZGUueSArIHBvcy55ICogdGhpcy5ub2RlLnNjYWxlWSk7XHJcbiAgICB9XHJcbiAgICAvKirojrflvpflrZDlvLnnm7jlr7noi7Hpm4TnmoTkvY3nva4gKi9cclxuICAgIGdldEhlcm9CdWxsZXRQb3MoKTogY2MuVmVjMiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYnVsbGV0X3Bvc1t0aGlzLmN1cl9mYW5neGlhbmddO1xyXG4gICAgfVxyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLeaXoOWwvWJ1ZmYtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvKipcclxuICAgICAqIOa3u+WKoOaXoOWwvWJ1ZmZcclxuICAgICAqIEBwYXJhbSBlbmRsZXNzQnVmZiBFbmRsZXNzQnVmZueahOWunuS+i1xyXG4gICAgICovXHJcbiAgICAvLyAgQWRtaW5pc3RyYXRvcjpcclxuICAgIC8vICAxLuaUu+WHu+WKmyt4JVxyXG4gICAgLy8gIDIu5pS76YCfK3glXHJcbiAgICAvLyAgMy7mmrTlh7vlgLwreFxyXG4gICAgLy8gIDQu5pq05Ye75aKe5bmFK3glXHJcbiAgICAvLyAgNS7pmLLlvqHlipsreCVcclxuICAgIC8vICA2LuacgOWkp+eUn+WRveWAvCt4JSBcclxuICAgIC8vICA3Luavj+enkuWbnuWkjeacgOWkp+eUn+WRveWAvHglXHJcbiAgICAvLyAgOC7nq4vljbPlm57lpI3mnIDlpKfnlJ/lkb3lgLx4Je+8iOazqO+8muivpWJ1ZmbnlJ/mlYjlkI7nq4vljbPmtojlpLHvvIlcclxuICAgIC8vICA5Lui/nue7reaUu+WHuyDmpoLnjod4JVxyXG4gICAgLy8gIDEwLuS4u+WKqOaKgOiDveWGt+WNtOaXtumXtOWHj+WwkXglXHJcbiAgICAvLyAgMTEu5pyA57uI5Lyk5a6z5Yqg5oiQeCVcclxuICAgIGFkZEVuZGxlc3NCdWZmKGVuZGxlc3NCdWZmOiBFbmRsZXNzQnVmZikge1xyXG4gICAgICAgIGlmICghdGhpcy5pc0hhdmVFbmRsZXNzSWQoZW5kbGVzc0J1ZmYuaWQpKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWFwX2VuZGxlc3NfYnVmZi5zZXQoZW5kbGVzc0J1ZmYuaWQsIGVuZGxlc3NCdWZmKTtcclxuICAgICAgICAgICAgc3dpdGNoIChlbmRsZXNzQnVmZi50eXBlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEVuZGxlc3NCdWZmVHlwZS5BdHRhY2s6IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlcm9fZGF0YS50b3RhbF9hdHRhY2sgKz0gdGhpcy5oZXJvX2RhdGEuZml4ZWRfYXR0Y2sgKiBlbmRsZXNzQnVmZi52YWx1ZTtcclxuICAgICAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEVuZGxlc3NCdWZmVHlwZS5BdHRhY2tTcGVlZDoge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlQXR0YWNrU3BlZWQoZW5kbGVzc0J1ZmYudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgRW5kbGVzc0J1ZmZUeXBlLkNyaXRSYXRlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZXJvX2RhdGEuQ3JpdGljYWwgKz0gZW5kbGVzc0J1ZmYudmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBFbmRsZXNzQnVmZlR5cGUuQ3JpdERhbWFnZToge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVyb19kYXRhLkV4dHJhQ3JpdGljYWwgKz0gZW5kbGVzc0J1ZmYudmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBFbmRsZXNzQnVmZlR5cGUuRGVmZW5zZToge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVyb19kYXRhLnRvdGFsX2RlZmVuc2UgKz0gdGhpcy5oZXJvX2RhdGEuZml4X2RlZmVuc2UgKiBlbmRsZXNzQnVmZi52YWx1ZTtcclxuICAgICAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEVuZGxlc3NCdWZmVHlwZS5IZWFsdGhNYXg6IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlcm9fZGF0YS50b3RhbF9ocCArPSB0aGlzLmhlcm9fZGF0YS5maXhlZF9ocCAqIGVuZGxlc3NCdWZmLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwi5Z+O5aKZ5Yqg6KGAOlwiLHRoaXMuaGVyb19kYXRhLnRvdGFsX2hwLHRoaXMuaGVyb19kYXRhLmZpeGVkX2hwLGVuZGxlc3NCdWZmLnZhbHVlKVxyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkucmVmcmVzaE1haW5XYWxsRGF0YSgpXHJcbiAgICAgICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBFbmRsZXNzQnVmZlR5cGUuSGVhbHRoU2VjOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJ1ZmZEYXRhID0gbmV3IEJ1ZmZEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnVmZkRhdGEuYnVmZl9pZCA9IEJ1ZmZJZC5XYWxsX0VuZGxlc3NfQWRkX2hwICsgdGhpcy5oZXJvX3R5cGU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnVmZkRhdGEuYnVmZl90eXBlID0gQnVmZlR5cGUuR2FpbjtcclxuICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5idWZmX3ZhbHVlID0gW2VuZGxlc3NCdWZmLnZhbHVlICogV2FsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYWluV2FsbCgpLmdldE1heEhwKCldO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLnJlbWFpbl90aW1lID0gNjY2NjY2NjY7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gYnVmZkRhdGEuZ2FtZV9lZmZlY3RfaWQ9R2FtZUVmZmVjdElkLmNoYW5nX21hb19zaG91X3NraWxsX2FjdGl2ZV8xO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLnJlY292ZXJ5X2ppYW5nZV90aW1lID0gMTtcclxuICAgICAgICAgICAgICAgICAgICBXYWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1haW5XYWxsKCkuYWRkQnVmZihidWZmRGF0YSlcclxuICAgICAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEVuZGxlc3NCdWZmVHlwZS5IZWFsdGhUZWFtQWRkOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbGV0IGhwPVdhbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWFpbldhbGwoKS5nZXRDdXJIcCgpKyhlbmRsZXNzQnVmZi52YWx1ZSpXYWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1haW5XYWxsKCkuZ2V0TWF4SHAoKSlcclxuICAgICAgICAgICAgICAgICAgICAvLyBXYWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1haW5XYWxsKCkuY2hhbmdlSHAoaHApXHJcbiAgICAgICAgICAgICAgICAgICAgLy/lj4rml7bnlKhcclxuICAgICAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEVuZGxlc3NCdWZmVHlwZS5Eb3VibGVBdHRhY2s6IHtcclxuICAgICAgICAgICAgICAgICAgICAvL+i/nue7reaUu+WHuyzkuI3nlKjliqBidWZmXHJcbiAgICAgICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBFbmRsZXNzQnVmZlR5cGUuQWN0aXZlU2tpbGxDZDoge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxfdG90YWxfdGltZSAtPSB0aGlzLmhlcm9fZGF0YS5nZXRTa2lsbENvbGREb3duKFNraWxsVHlwZS5BY3RpdmUpICogZW5kbGVzc0J1ZmYudmFsdWVcclxuICAgICAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEVuZGxlc3NCdWZmVHlwZS5BZGREYW1hZ2U6IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlcm9fZGF0YS5hbGxfaW5jcmVhc2VfZGFtYWdlICs9IGVuZGxlc3NCdWZmLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5Yig6Zmk5peg5bC9YnVmZlxyXG4gICAgICogQHBhcmFtIGlkIOaXoOWwvWJ1ZmYtaWRcclxuICAgICAqL1xyXG4gICAgcmVtb3ZlRW5kbGVzc0J1ZmYoaWQ6IG51bWJlcikge1xyXG4gICAgICAgIGlmICghdGhpcy5pc0hhdmVFbmRsZXNzSWQoaWQpKSB7XHJcbiAgICAgICAgICAgIGxldCBlbmRsZXNzQnVmZiA9IHRoaXMubWFwX2VuZGxlc3NfYnVmZi5nZXQoaWQpO1xyXG4gICAgICAgICAgICB0aGlzLm1hcF9lbmRsZXNzX2J1ZmYuZGVsZXRlKGlkKTtcclxuICAgICAgICAgICAgc3dpdGNoIChlbmRsZXNzQnVmZi50eXBlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEVuZGxlc3NCdWZmVHlwZS5BdHRhY2s6IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlcm9fZGF0YS50b3RhbF9hdHRhY2sgLT0gdGhpcy5oZXJvX2RhdGEuZml4ZWRfYXR0Y2sgKiBlbmRsZXNzQnVmZi52YWx1ZTtcclxuICAgICAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEVuZGxlc3NCdWZmVHlwZS5BdHRhY2tTcGVlZDoge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlQXR0YWNrU3BlZWQoLWVuZGxlc3NCdWZmLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEVuZGxlc3NCdWZmVHlwZS5Dcml0UmF0ZToge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVyb19kYXRhLkNyaXRpY2FsIC09IGVuZGxlc3NCdWZmLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgRW5kbGVzc0J1ZmZUeXBlLkNyaXREYW1hZ2U6IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlcm9fZGF0YS5FeHRyYUNyaXRpY2FsIC09IGVuZGxlc3NCdWZmLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgRW5kbGVzc0J1ZmZUeXBlLkRlZmVuc2U6IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlcm9fZGF0YS50b3RhbF9kZWZlbnNlIC09IHRoaXMuaGVyb19kYXRhLmZpeF9kZWZlbnNlICogZW5kbGVzc0J1ZmYudmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBFbmRsZXNzQnVmZlR5cGUuSGVhbHRoTWF4OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZXJvX2RhdGEudG90YWxfaHAgLT0gdGhpcy5oZXJvX2RhdGEuZml4ZWRfaHAgKiBlbmRsZXNzQnVmZi52YWx1ZTtcclxuICAgICAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEVuZGxlc3NCdWZmVHlwZS5IZWFsdGhTZWM6IHtcclxuICAgICAgICAgICAgICAgICAgICBXYWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1haW5XYWxsKCkuc3ViQnVmZihCdWZmSWQuV2FsbF9FbmRsZXNzX0FkZF9ocCArIHRoaXMuaGVyb190eXBlKVxyXG4gICAgICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgRW5kbGVzc0J1ZmZUeXBlLkhlYWx0aFRlYW1BZGQ6IHtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBFbmRsZXNzQnVmZlR5cGUuRG91YmxlQXR0YWNrOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgRW5kbGVzc0J1ZmZUeXBlLkFjdGl2ZVNraWxsQ2Q6IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNraWxsX3RvdGFsX3RpbWUgKz0gdGhpcy5oZXJvX2RhdGEuZ2V0U2tpbGxDb2xkRG93bihTa2lsbFR5cGUuQWN0aXZlKSAqIGVuZGxlc3NCdWZmLnZhbHVlXHJcbiAgICAgICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBFbmRsZXNzQnVmZlR5cGUuQWRkRGFtYWdlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZXJvX2RhdGEuYWxsX2luY3JlYXNlX2RhbWFnZSAtPSBlbmRsZXNzQnVmZi52YWx1ZTtcclxuICAgICAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKirmmK/lkKbmi6XmnInkuIDkuKrml6DlsL1idWZmIGlkICovXHJcbiAgICBpc0hhdmVFbmRsZXNzSWQoaWQ6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiKysrKysrKytcIixpZCx0aGlzLm1hcF9lbmRsZXNzX2J1ZmYpXHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwX2VuZGxlc3NfYnVmZi5oYXMoaWQpO1xyXG4gICAgfVxyXG4gICAgLyoq5piv5ZCm5oul5pyJ5LiA5Liq5peg5bC9YnVmZiDnsbvlnosgKi9cclxuICAgIGdldEVuZGxlc3NCeVR5cGUodHlwZTogbnVtYmVyKTogRW5kbGVzc0J1ZmYge1xyXG4gICAgICAgIGxldCBidWZmOiBFbmRsZXNzQnVmZiA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5tYXBfZW5kbGVzc19idWZmLmZvckVhY2goKHYsIGspID0+IHtcclxuICAgICAgICAgICAgaWYgKHYudHlwZSA9PSB0eXBlKSB7XHJcbiAgICAgICAgICAgICAgICBidWZmID0gdjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBidWZmO1xyXG4gICAgfVxyXG4gICAgLyoq6I635b6X5LiA5Liq5peg5bC9YnVmZiAqL1xyXG4gICAgZ2V0RW5kbGVzc0J1ZmYoaWQ6IG51bWJlcik6IEVuZGxlc3NCdWZmIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tYXBfZW5kbGVzc19idWZmLmdldChpZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tQlVGRi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgYWRkQnVmZihidWZmRGF0YTogQnVmZkRhdGEpOiBCdWZmVGltZXIge1xyXG4gICAgICAgIGxldCBidWZmSWQgPSBidWZmRGF0YS5idWZmX2lkO1xyXG4gICAgICAgIGlmICghdGhpcy5pc0hhdmVCdWZmKGJ1ZmZJZCkpIHtcclxuICAgICAgICAgICAgLy/mt7vliqBidWZm6IqC54K55ZKM54m55pWIICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgbm9kZTogY2MuTm9kZSA9IG51bGw7XHJcbiAgICAgICAgICAgIGlmIChidWZmRGF0YS5nYW1lX2VmZmVjdF9pZCA9PSBHYW1lRWZmZWN0SWQuTnVsbCkge1xyXG4gICAgICAgICAgICAgICAgbm9kZSA9IG5ldyBjYy5Ob2RlKGJ1ZmZEYXRhLmdhbWVfZWZmZWN0X2lkLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbm9kZSA9IEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RGb3JQYXJlbnQoYnVmZkRhdGEuZ2FtZV9lZmZlY3RfaWQsIHRoaXMueHVhbnl1bl9wb3MsIHRoaXMubm9kZSk7XHJcbiAgICAgICAgICAgICAgICAvL25vZGUuc2NhbGU9dGhpcy5ub2RlLndpZHRoLzIwMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL+a3u+WKoGJ1ZmZcclxuICAgICAgICAgICAgbGV0IGJ1ZmY6IEJ1ZmZUaW1lciA9IG5vZGUuZ2V0Q29tcG9uZW50KEJ1ZmZUaW1lcik7XHJcbiAgICAgICAgICAgIGlmICghYnVmZikge1xyXG4gICAgICAgICAgICAgICAgYnVmZiA9IG5vZGUuYWRkQ29tcG9uZW50KEJ1ZmZUaW1lcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYnVmZi5pbml0KGJ1ZmZEYXRhKTtcclxuICAgICAgICAgICAgLy9idWZm6ZSA5q+B5pe25aSE55CGXHJcbiAgICAgICAgICAgIGJ1ZmYuYWRkRGVzdHJveUxpc3Rlbih0aGlzLm9uQnVmZkRlc3RvcnkuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgIC8vYnVmZuayu+eWl+inpuWPkeaXtuWkhOeQhlxyXG4gICAgICAgICAgICBpZiAoYnVmZkRhdGEucmVjb3ZlcnlfamlhbmdlX3RpbWUgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBidWZmLmFkZFJlY292ZXJ5TGlzdGVuKHtcclxuICAgICAgICAgICAgICAgICAgICBkb1JlY292ZXJ5OiAobnVtOiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgV2FsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYWluV2FsbCgpLmNoYW5nZUhwKG51bSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSwgYnVmZi5nZXRGaXJzdEJ1ZmZWYWx1ZSgpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmhlcm9fYnVmZi5zZXQoYnVmZkRhdGEuYnVmZl9pZCwgYnVmZik7XHJcbiAgICAgICAgICAgIG5vZGUuc2NhbGUgPSAxIC8gdGhpcy5zZXR1cF9zY2FsZTtcclxuICAgICAgICAgICAgc3dpdGNoIChidWZmSWQpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgQnVmZklkLlBldDNfSmlhU3U6XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJ1ZmZJZC5IZXJvX01laU1vX0dvbmdTdTpcclxuICAgICAgICAgICAgICAgIGNhc2UgQnVmZklkLkhlcm9fWmhlbkRlX0dvbmdzdTpcclxuICAgICAgICAgICAgICAgIGNhc2UgQnVmZklkLkhlcm9fS3VhbmdaaGFuU2hpX0RhWmhhbzpcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlQXR0YWNrU3BlZWQoYnVmZkRhdGEuYnVmZl92YWx1ZVswXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgQnVmZklkLkhlcm9fQ2hhbmdNYW9TaG93X0dvbmdTdToge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlQXR0YWNrU3BlZWQoYnVmZkRhdGEuYnVmZl92YWx1ZVswXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5zZXRQb3NpdGlvbihjYy52MigwLCAwKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/mlrDlop7kuIDkuKrog4zlkI7nibnmlYhcclxuICAgICAgICAgICAgICAgICAgICBidWZmLmFkZFRlWGlhbyhHYW1lRWZmZWN0SWQuY2hhbmdfbWFvX3Nob3Vfc2tpbGxfYWN0aXZlXzIsIHRoaXMubm9kZS5nZXRQb3NpdGlvbigpLCBjYy5maW5kKCdDYW52YXMvSGVyb19TaGFkb3dfUm9vdCcpKVxyXG4gICAgICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgQnVmZklkLkhlcm9fWmhlbkRlX0Jhb0ppTWluZ1pob25nTHY6IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlcm9fZGF0YS5jcml0X2V4ICs9IGJ1ZmZEYXRhLmJ1ZmZfdmFsdWVbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZXJvX2RhdGEuaGl0X2V4ICs9IGJ1ZmZEYXRhLmJ1ZmZfdmFsdWVbMF07XHJcbiAgICAgICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuYWRkQnVmZlN0YXRlKGJ1ZmZJZCwgYnVmZkRhdGEucmVtYWluX3RpbWUpO1xyXG4gICAgICAgICAgICByZXR1cm4gYnVmZjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgYnVmZiA9IHRoaXMuaGVyb19idWZmLmdldChidWZmSWQpO1xyXG4gICAgICAgICAgICBidWZmLnJlZnJlc2hCdWZmKGJ1ZmZEYXRhKTtcclxuICAgICAgICAgICAgdGhpcy5hZGRCdWZmU3RhdGUoYnVmZklkLCBidWZmRGF0YS5yZW1haW5fdGltZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBidWZmO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBzdWJCdWZmKGJ1ZmZJZDogQnVmZklkKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IGJ1ZmYgPSB0aGlzLmhlcm9fYnVmZi5nZXQoYnVmZklkKTtcclxuICAgICAgICBpZiAoYnVmZikge1xyXG4gICAgICAgICAgICBidWZmLmRlc3Ryb3lTZWxmKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgb25CdWZmRGVzdG9yeShidWZmRGF0YTogQnVmZkRhdGEpIHtcclxuICAgICAgICB0aGlzLmhlcm9fYnVmZi5kZWxldGUoYnVmZkRhdGEuYnVmZl9pZCk7XHJcbiAgICAgICAgc3dpdGNoIChidWZmRGF0YS5idWZmX2lkKSB7XHJcbiAgICAgICAgICAgIGNhc2UgQnVmZklkLlBldDNfSmlhU3U6XHJcbiAgICAgICAgICAgIGNhc2UgQnVmZklkLkhlcm9fTWVpTW9fR29uZ1N1OlxyXG4gICAgICAgICAgICBjYXNlIEJ1ZmZJZC5IZXJvX0t1YW5nWmhhblNoaV9EYVpoYW86XHJcbiAgICAgICAgICAgIGNhc2UgQnVmZklkLkhlcm9fWmhlbkRlX0dvbmdzdTpcclxuICAgICAgICAgICAgY2FzZSBCdWZmSWQuSGVyb19DaGFuZ01hb1Nob3dfR29uZ1N1OiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZUF0dGFja1NwZWVkKC1idWZmRGF0YS5idWZmX3ZhbHVlWzBdKTtcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBCdWZmSWQuSGVyb19aaGVuRGVfQmFvSmlNaW5nWmhvbmdMdjoge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oZXJvX2RhdGEuY3JpdF9leCAtPSBidWZmRGF0YS5idWZmX3ZhbHVlWzBdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oZXJvX2RhdGEuaGl0X2V4IC09IGJ1ZmZEYXRhLmJ1ZmZfdmFsdWVbMF07XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlzSGF2ZUJ1ZmYoYnVmZjogQnVmZklkKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaGVyb19idWZmLmhhcyhidWZmKTtcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVBbGxCdWZmKCkge1xyXG4gICAgICAgIHRoaXMuaGVyb19idWZmLmZvckVhY2goKGJ1ZmY6IEJ1ZmZUaW1lcikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnN1YkJ1ZmYoYnVmZi5nZXRCdWZmSWQoKSk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcblxyXG4gICAgYWRkRGVCdWZmKGJ1ZmZEYXRhOiBCdWZmRGF0YSwgaW5zaWdodDogbnVtYmVyID0gMCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICghdGhpcy5pc0hhdmVEZUJ1ZmYoYnVmZkRhdGEuYnVmZl9pZCkpIHtcclxuICAgICAgICAgICAgLy/mjqfliLbnsbvnmoRkZWJ1ZmbpnIDopoHmoLnmja7pn6fmgKfmnaXlrp7njrDlhbfkvZPnmoTmlYjmnpxcclxuICAgICAgICAgICAgaWYgKGJ1ZmZEYXRhLmJ1ZmZfdHlwZSA9PSBCdWZmVHlwZS5WZXJ0aWdvKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jdXJfdG91Z2huZXNzID49IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5oZXJvX3R5cGUgIT0gSGVyb19UeXBlLlpoZW5EZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubXBfcHJvZ3Jlc3Muc2V0RGlzYWJsZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICBTa2lsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5oaWRlU2tpbGxSYW5nZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxfdGlwLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdvbmdqaV9qaXNodSA9IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNwaW5lLnBhdXNlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzX2Nhbl90b3VjaCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgaWYgKGluc2lnaHQgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnVmZkRhdGEucmVtYWluX3RpbWUgPSBJbmp1cmVkRGF0YS5jYWxjQ29udHJvbFRpbWUoYnVmZkRhdGEucmVtYWluX3RpbWUsIHRoaXMuY3VyX3RvdWdobmVzcywgaW5zaWdodCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy54dWFueXVuX2NhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy54dWFueXVuX2NhbGxiYWNrKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgV2FsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYWluV2FsbCgpLnNob3dWZXJ0aWdvKGJ1ZmZEYXRhLnJlbWFpbl90aW1lKTtcclxuICAgICAgICAgICAgICAgIC8v5YWz6Zet5pe25YGcXHJcbiAgICAgICAgICAgICAgICBTa2lsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRUaW1lU3RvcChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBTa2lsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJc1NraWxsU3RhdGUoZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8v5re75YqgYnVmZuiKgueCueWSjOeJueaViCAgICAgICBcclxuICAgICAgICAgICAgbGV0IG5vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgICAgICAgICBpZiAoYnVmZkRhdGEuZ2FtZV9lZmZlY3RfaWQgPT0gR2FtZUVmZmVjdElkLk51bGwpIHtcclxuICAgICAgICAgICAgICAgIG5vZGUgPSBuZXcgY2MuTm9kZShidWZmRGF0YS5nYW1lX2VmZmVjdF9pZC50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG5vZGUgPSBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0Rm9yUGFyZW50KGJ1ZmZEYXRhLmdhbWVfZWZmZWN0X2lkLCB0aGlzLnh1YW55dW5fcG9zLCB0aGlzLm5vZGUpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5zY2FsZSA9IHRoaXMubm9kZS53aWR0aCAvIDIwMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL+a3u+WKoGJ1ZmZcclxuICAgICAgICAgICAgbGV0IGJ1ZmY6IEJ1ZmZUaW1lciA9IG5vZGUuZ2V0Q29tcG9uZW50KEJ1ZmZUaW1lcik7XHJcbiAgICAgICAgICAgIGlmICghYnVmZikge1xyXG4gICAgICAgICAgICAgICAgYnVmZiA9IG5vZGUuYWRkQ29tcG9uZW50KEJ1ZmZUaW1lcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYnVmZi5pbml0KGJ1ZmZEYXRhKTtcclxuICAgICAgICAgICAgLy9idWZm6ZSA5q+B5pe25aSE55CGXHJcbiAgICAgICAgICAgIGJ1ZmYuYWRkRGVzdHJveUxpc3Rlbih0aGlzLm9uRGVCdWZmRGVzdG9yeS5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgdGhpcy5oZXJvX2RlYnVmZi5zZXQoYnVmZkRhdGEuYnVmZl9pZCwgYnVmZik7XHJcbiAgICAgICAgICAgIG5vZGUuc2NhbGUgPSAxIC8gdGhpcy5zZXR1cF9zY2FsZTtcclxuICAgICAgICAgICAgc3dpdGNoIChidWZmRGF0YS5idWZmX2lkKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJ1ZmZJZC5Cb3NzNl9Ta2lsbF8yX2ppYW5nb25nc3U6XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJ1ZmZJZC5Cb3NzM19KSUFOX0dvbmdTdToge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlQXR0YWNrU3BlZWQoLWJ1ZmZEYXRhLmJ1ZmZfdmFsdWVbMF0pO1xyXG4gICAgICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgQnVmZklkLkJvc3M4X1NraWxsXzJfYXR0YWNrOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZXJvX2RhdGEudG90YWxfYXR0YWNrIC09IGJ1ZmZEYXRhLmJ1ZmZfdmFsdWVbMF0gKiB0aGlzLmhlcm9fZGF0YS5maXhlZF9hdHRjaztcclxuICAgICAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5hZGREZUJ1ZmZTdGF0ZShidWZmRGF0YS5idWZmX2lkLCBidWZmRGF0YS5yZW1haW5fdGltZSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBidWZmID0gdGhpcy5oZXJvX2RlYnVmZi5nZXQoYnVmZkRhdGEuYnVmZl9pZCk7XHJcbiAgICAgICAgICAgIGJ1ZmYucmVmcmVzaEJ1ZmYoYnVmZkRhdGEpO1xyXG4gICAgICAgICAgICB0aGlzLmFkZERlQnVmZlN0YXRlKGJ1ZmZEYXRhLmJ1ZmZfaWQsIGJ1ZmZEYXRhLnJlbWFpbl90aW1lKTtcclxuICAgICAgICAgICAgc3dpdGNoIChidWZmRGF0YS5idWZmX2lkKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJ1ZmZJZC5Cb3NzNl9Ta2lsbF8yX2ppYW5nb25nc3U6XHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYnVmZi5nZXRGbG9vck51bSgpIDwgYnVmZkRhdGEubWF4X2Zsb29yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZUF0dGFja1NwZWVkKC1idWZmRGF0YS5idWZmX3ZhbHVlWzBdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Y676Zmk5LiA5LiqZGVidWZmXHJcbiAgICAgKiBAcGFyYW0gYnVmZiBkZWJ1ZmbnsbvlnotcclxuICAgICAqIEBwYXJhbSBpc05lZWRSZWN5Y2xlIOaYr+WQpumcgOimgeiwg+eUqOWbnuaUtlxyXG4gICAgICogQHJldHVybnMgXHJcbiAgICAgKi9cclxuICAgIHN1YkRlQnVmZihidWZmSWQ6IEJ1ZmZJZCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCBidWZmID0gdGhpcy5oZXJvX2RlYnVmZi5nZXQoYnVmZklkKTtcclxuICAgICAgICBpZiAoYnVmZikge1xyXG4gICAgICAgICAgICBidWZmLmRlc3Ryb3lTZWxmKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgb25EZUJ1ZmZEZXN0b3J5KGJ1ZmZEYXRhOiBCdWZmRGF0YSkge1xyXG4gICAgICAgIC8vIGxldCBidWZmU3RhdGU9dGhpcy5tYXBfZGVidWZmX3N0YXRlLmdldChCdWZmU3RhdGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RGVCdWZmVHlwZShidWZmRGF0YS5idWZmX2lkKSk7XHJcbiAgICAgICAgLy8gaWYoYnVmZlN0YXRlKXtcclxuICAgICAgICAvLyAgICAgYnVmZlN0YXRlLmRlc3Ryb3lTZWxmKCk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIHRoaXMuaGVyb19kZWJ1ZmYuZGVsZXRlKGJ1ZmZEYXRhLmJ1ZmZfaWQpO1xyXG4gICAgICAgIHN3aXRjaCAoYnVmZkRhdGEuYnVmZl9pZCkge1xyXG4gICAgICAgICAgICBjYXNlIEJ1ZmZJZC5Nb25zdGVyX1h1YW5ZdW46IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmhlcm9fdHlwZSAhPSBIZXJvX1R5cGUuWmhlbkRlKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubXBfcHJvZ3Jlc3Muc2V0RGlzYWJsZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdvbmdqaV9qaXNodSA9IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNwaW5lLnBhdXNlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc19jYW5fdG91Y2ggPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgV2FsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYWluV2FsbCgpLmhpZGVWZXJ0aWdvKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy54dWFueXVuX2NhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy54dWFueXVuX2NhbGxiYWNrKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBCdWZmSWQuQm9zczNfSklBTl9Hb25nU3U6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlQXR0YWNrU3BlZWQoYnVmZkRhdGEuYnVmZl92YWx1ZVswXSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgYnVmZlN0YXRlID0gdGhpcy5tYXBfZGVidWZmX3N0YXRlLmdldChCdWZmU3RhdGVUeXBlLkF0dGFja1NwZWVkKTtcclxuICAgICAgICAgICAgICAgIGlmIChidWZmU3RhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBidWZmU3RhdGUuZGVzdHJveVNlbGYoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBCdWZmSWQuQm9zczZfU2tpbGxfMl9qaWFuZ29uZ3N1OiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZUF0dGFja1NwZWVkKGJ1ZmZEYXRhLmJ1ZmZfdmFsdWVbMF0gKiBidWZmRGF0YS5jdXJfZmxvb3IpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGJ1ZmZTdGF0ZSA9IHRoaXMubWFwX2RlYnVmZl9zdGF0ZS5nZXQoQnVmZlN0YXRlVHlwZS5BdHRhY2tTcGVlZCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYnVmZlN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnVmZlN0YXRlLmRlc3Ryb3lTZWxmKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQnVmZklkLkJvc3M4X1NraWxsXzJfYXR0YWNrOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhlcm9fZGF0YS50b3RhbF9hdHRhY2sgKz0gYnVmZkRhdGEuYnVmZl92YWx1ZVswXSAqIHRoaXMuaGVyb19kYXRhLmZpeGVkX2F0dGNrO1xyXG4gICAgICAgICAgICAgICAgbGV0IGJ1ZmZTdGF0ZSA9IHRoaXMubWFwX2RlYnVmZl9zdGF0ZS5nZXQoQnVmZlN0YXRlVHlwZS5BdHRhY2spO1xyXG4gICAgICAgICAgICAgICAgaWYgKGJ1ZmZTdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZTdGF0ZS5kZXN0cm95U2VsZigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpc0hhdmVEZUJ1ZmYoYnVmZklkOiBCdWZmSWQpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5oZXJvX2RlYnVmZi5oYXMoYnVmZklkKTtcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVBbGxEZUJ1ZmYoKSB7XHJcbiAgICAgICAgdGhpcy5oZXJvX2RlYnVmZi5mb3JFYWNoKCh2LCBrKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc3ViRGVCdWZmKHYuZ2V0QnVmZklkKCkpXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGdldEdhbWVFZmZlY3RJZEJ5RGVidWZmKGJ1ZmY6IEhlcm9fRGVCdWZmKTogR2FtZUVmZmVjdElkIHtcclxuICAgICAgICBsZXQgZ2FtZUVmZmVjdElkID0gR2FtZUVmZmVjdElkLk51bGw7XHJcbiAgICAgICAgc3dpdGNoIChidWZmKSB7XHJcbiAgICAgICAgICAgIGNhc2UgSGVyb19EZUJ1ZmYuWHVhbll1bjoge1xyXG4gICAgICAgICAgICAgICAgZ2FtZUVmZmVjdElkID0gR2FtZUVmZmVjdElkLnh1YW55dW47XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBnYW1lRWZmZWN0SWQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0R2FtZUVmZmVjdE5hbWVCeURlYnVmZihidWZmOiBIZXJvX0RlQnVmZik6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IG5hbWUgPSAnMCc7XHJcbiAgICAgICAgc3dpdGNoIChidWZmKSB7XHJcbiAgICAgICAgICAgIGNhc2UgSGVyb19EZUJ1ZmYuWHVhbll1bjoge1xyXG4gICAgICAgICAgICAgICAgbmFtZSA9IEdhbWVFZmZlY3RJZC54dWFueXVuICsgJyc7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZFh1YW5ZdW5MaXN0ZW4oY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgdGhpcy54dWFueXVuX2NhbGxiYWNrID0gY2FsbGJhY2s7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzZXRTdGF0ZSgpIHtcclxuICAgICAgICB0aGlzLnNldENEKDEgLyAzKTtcclxuICAgICAgICB0aGlzLnJlbW92ZUFsbEJ1ZmYoKTtcclxuICAgICAgICB0aGlzLnJlbW92ZUFsbERlQnVmZigpO1xyXG4gICAgICAgIHRoaXMubWFwX2J1ZmZfc3RhdGUuZm9yRWFjaCgodiwgaykgPT4ge1xyXG4gICAgICAgICAgICB2LmRlc3Ryb3lTZWxmKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5tYXBfZGVidWZmX3N0YXRlLmZvckVhY2goKHYsIGspID0+IHtcclxuICAgICAgICAgICAgdi5kZXN0cm95U2VsZigpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICh0aGlzLnJlc2V0X2NhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVzZXRfY2FsbGJhY2soKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/lkIzmraXmlbDmja7kv6Hmga9cclxuICAgICAgICB0aGlzLmhlcm9fZGF0YSA9IEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2FtZV9oZXJvX2RhdGEuZ2V0KHRoaXMuaGVyb190eXBlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKirmt7vliqDkuIDkuKpidWZm54q25oCB5Zu+5qCHICovXHJcbiAgICBhZGRCdWZmU3RhdGUoYnVmZklkOiBCdWZmSWQsIHJlbWFpblRpbWU6IG51bWJlcikge1xyXG4gICAgICAgIGxldCB0eXBlcyA9IEJ1ZmZTdGF0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRCdWZmVHlwZShidWZmSWQpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdHlwZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHR5cGUgPSB0eXBlc1tpXTtcclxuICAgICAgICAgICAgaWYgKHRoaXMubWFwX2J1ZmZfc3RhdGUuaGFzKHR5cGUpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hcF9idWZmX3N0YXRlLmdldCh0eXBlKS5yZWZyZXNoVGltZShyZW1haW5UaW1lKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxldCBiZlN0YXRlID0gQnVmZlN0YXRlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUJ1ZmZTdGF0ZSh0eXBlLCB0aGlzLmhlcm9fdHlwZSk7XHJcbiAgICAgICAgICAgICAgICBiZlN0YXRlLmluaXQodHlwZSwgcmVtYWluVGltZSwgdGhpcy5vbkJ1ZmZTdGF0ZURlc3RvcnkuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hcF9idWZmX3N0YXRlLnNldCh0eXBlLCBiZlN0YXRlKTtcclxuICAgICAgICAgICAgICAgIC8vdGhpcy5ub2RlLmFkZENoaWxkKHNoaWVsZC5ub2RlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkJ1ZmZTdGF0ZURlc3RvcnkodHlwZTogQnVmZlN0YXRlVHlwZSkge1xyXG4gICAgICAgIHRoaXMubWFwX2J1ZmZfc3RhdGUuZGVsZXRlKHR5cGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKua3u+WKoOS4gOS4qmJ1ZmbnirbmgIHlm77moIcgKi9cclxuICAgIGFkZERlQnVmZlN0YXRlKGJ1ZmZJZDogQnVmZklkLCByZW1haW5UaW1lOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgdHlwZXMgPSBCdWZmU3RhdGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RGVCdWZmVHlwZShidWZmSWQpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdHlwZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHR5cGUgPSB0eXBlc1tpXTtcclxuICAgICAgICAgICAgaWYgKHRoaXMubWFwX2RlYnVmZl9zdGF0ZS5oYXModHlwZSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFwX2RlYnVmZl9zdGF0ZS5nZXQodHlwZSkucmVmcmVzaFRpbWUocmVtYWluVGltZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYmZTdGF0ZSA9IEJ1ZmZTdGF0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVEZUJ1ZmZTdGF0ZSh0eXBlLCB0aGlzLmhlcm9fdHlwZSk7XHJcbiAgICAgICAgICAgICAgICBiZlN0YXRlLmluaXQodHlwZSwgcmVtYWluVGltZSwgdGhpcy5vbkRlQnVmZlN0YXRlRGVzdG9yeS5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFwX2RlYnVmZl9zdGF0ZS5zZXQodHlwZSwgYmZTdGF0ZSk7XHJcbiAgICAgICAgICAgICAgICAvL3RoaXMubm9kZS5hZGRDaGlsZChzaGllbGQubm9kZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25EZUJ1ZmZTdGF0ZURlc3RvcnkodHlwZTogQnVmZlN0YXRlVHlwZSkge1xyXG4gICAgICAgIHRoaXMubWFwX2RlYnVmZl9zdGF0ZS5kZWxldGUodHlwZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq6K6+572u5pS76YCf77yM5q+P56eS5pS75Ye75qyh5pWwICovXHJcbiAgICBwcml2YXRlIHNldEF0dGFja1NwZWVkKG51bVNlYzogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5nb25namlfc3VkdSA9IG51bVNlYztcclxuICAgICAgICBpZiAobnVtU2VjID4gMTApIHtcclxuICAgICAgICAgICAgbnVtU2VjID0gMTA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChudW1TZWMgPCAwLjEpIHtcclxuICAgICAgICAgICAgbnVtU2VjID0gMC4xO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmhlcm9fZGF0YS5nb25namlfamlhbmdlID0gMSAvIG51bVNlYztcclxuICAgIH1cclxuICAgIC8qKuaUueWPmOW9k+WJjeaUu+mAnyxidWZmRGF0YTrmr5TnjocgKi9cclxuICAgIHByaXZhdGUgY2hhbmdlQXR0YWNrU3BlZWQocmF0ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IGdqc2QgPSB0aGlzLmdldEF0dGFja1NwZWVkKCk7XHJcbiAgICAgICAgZ2pzZCArPSAocmF0ZSkgKiAoMSAvIHRoaXMuaGVyb19kYXRhLmJhc2VfamlhbmdlKTtcclxuICAgICAgICB0aGlzLnNldEF0dGFja1NwZWVkKGdqc2QpO1xyXG4gICAgfVxyXG4gICAgLyoq6I635b6X5b2T5YmN5pS76YCfICovXHJcbiAgICBwcml2YXRlIGdldEF0dGFja1NwZWVkKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIDEgLyB0aGlzLmhlcm9fZGF0YS5nb25namlfamlhbmdlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t54q25oCBLOWKqOeUuy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIHB1YmxpYyBzZXRIZXJvU3RhdGUoc3RhdGU6IEhlcm9fU3RhdGUsIGZhbmd4aWFuZzogR29uZ0ppX0ZhbmdYaWFuZywgZGF0YT86IEtleUZyYW1lRGF0YVtdLCBlbmRDYWxsYmFjaz86IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5oZXJvX3N0YXRlID0gc3RhdGU7XHJcbiAgICAgICAgdGhpcy5jdXJfZmFuZ3hpYW5nID0gZmFuZ3hpYW5nO1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5jdXJfZmFuZ3hpYW5nKSB7XHJcbiAgICAgICAgICAgIGNhc2UgR29uZ0ppX0ZhbmdYaWFuZy56dW86IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zY2FsZVggPSB0aGlzLnNldHVwX3NjYWxlO1xyXG4gICAgICAgICAgICAgICAgLy90aGlzLm5vZGUuc2NhbGVYID0gLXRoaXMuc2V0dXBfc2NhbGU7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR29uZ0ppX0ZhbmdYaWFuZy56aG9uZzoge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnNjYWxlWCA9IHRoaXMuc2V0dXBfc2NhbGU7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR29uZ0ppX0ZhbmdYaWFuZy55b3U6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zY2FsZVggPSB0aGlzLnNldHVwX3NjYWxlO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+aSreaUvuWKqOeUu1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5oZXJvX3N0YXRlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgSGVyb19TdGF0ZS5pZGxlOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXlTcGluZUFuaW1hdGlvbih0aGlzLmdldFNwaW5lTmFtZSgpLCB0cnVlLCBudWxsLCBudWxsKTtcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBIZXJvX1N0YXRlLmF0dGFjazoge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5U3BpbmVBbmltYXRpb24odGhpcy5nZXRTcGluZU5hbWUoKSwgZmFsc2UsIGRhdGEsIGVuZENhbGxiYWNrKTtcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBIZXJvX1N0YXRlLnNraWxsOlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheVNwaW5lQW5pbWF0aW9uKHRoaXMuZ2V0U3BpbmVOYW1lKCksIGZhbHNlLCBkYXRhLCBlbmRDYWxsYmFjayk7XHJcbiAgICAgICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgc2V0SGVyb1N0YXRlQW5kQW5pbWF0aW9uKHN0YXRlOiBIZXJvX1N0YXRlLCBuYW1lOiBzdHJpbmcsIGxvb3A6IGJvb2xlYW4sIGRhdGE/OiBLZXlGcmFtZURhdGFbXSwgZW5kQ2FsbGJhY2s/OiBGdW5jdGlvbikge1xyXG4gICAgICAgIHRoaXMuaGVyb19zdGF0ZSA9IHN0YXRlO1xyXG4gICAgICAgIHRoaXMucGxheVNwaW5lQW5pbWF0aW9uKG5hbWUsIGxvb3AsIGRhdGEsIGVuZENhbGxiYWNrKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRIZXJvU3RhdGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaGVyb19zdGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKirmoLnmja7mlYzkurrkvY3nva7ojrflvpfmlLvlh7vmlrnlkJEgKi9cclxuICAgIHByb3RlY3RlZCBnZXRGYW5nWGlhbmdCeVBvcyhwb3M6IGNjLlZlYzIpOiBHb25nSmlfRmFuZ1hpYW5nIHtcclxuICAgICAgICAvL+WvueaVjOS6uuWNleS9jei/m+ihjOaWueWQkeWIpOaWre+8jOehruWumuaJk+WHu+aWueWQkVxyXG4gICAgICAgIGxldCBmYW5neGlhbmcgPSBHb25nSmlfRmFuZ1hpYW5nLnpob25nO1xyXG4gICAgICAgIGxldCBvZmZzZXRQb3MgPSBwb3Muc3ViKHRoaXMubm9kZS5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICBsZXQgcGkyID0gTWF0aC5QSSAqIDI7XHJcbiAgICAgICAgbGV0IHJhZGlhbiA9IChNYXRoLmF0YW4yKG9mZnNldFBvcy55LCBvZmZzZXRQb3MueCkgKyBwaTIpICUgcGkyO1xyXG4gICAgICAgIGxldCBhbmdsZSA9IDE4MCAqIHJhZGlhbiAvIE1hdGguUEk7XHJcbiAgICAgICAgaWYgKGFuZ2xlIDw9IDYwKSB7XHJcbiAgICAgICAgICAgIGZhbmd4aWFuZyA9IEdvbmdKaV9GYW5nWGlhbmcueW91O1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYW5nbGUgPiA2MCAmJiBhbmdsZSA8IDEyMCkge1xyXG4gICAgICAgICAgICBmYW5neGlhbmcgPSBHb25nSmlfRmFuZ1hpYW5nLnpob25nO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYW5nbGUgPj0gMTIwICYmIGFuZ2xlIDw9IDE4MCkge1xyXG4gICAgICAgICAgICBmYW5neGlhbmcgPSBHb25nSmlfRmFuZ1hpYW5nLnp1bztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbmd4aWFuZztcclxuICAgIH1cclxuXHJcbiAgICBnZXRTcGluZU5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMuaGVyb19zdGF0ZSkge1xyXG4gICAgICAgICAgICBjYXNlIEhlcm9fU3RhdGUuYXR0YWNrOiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSGVyb19TdGF0ZV9OYW1lLkF0dGFjaztcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBIZXJvX1N0YXRlLnNraWxsOiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSGVyb19TdGF0ZV9OYW1lLlNraWxsO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEhlcm9fU3RhdGUuaWRsZToge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEhlcm9fU3RhdGVfTmFtZS5JZGxlO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5pKt5pS+5LiA5Liq6aqo6aq85Yqo55S7XHJcbiAgICAgKiBAcGFyYW0gbmFtZSDpqqjpqrzliqjnlLvlkI3np7BcclxuICAgICAqIEBwYXJhbSBpc0xvb3Ag5piv5ZCm5b6q546vXHJcbiAgICAgKiBAcGFyYW0gZGF0YSDmmK/lkKbnm5HlkKzlhbPplK7luKfvvIzlhbPplK7luKfmlbDmja7ljIXlkKvlhbPplK7luKflkI3np7DvvIznm5HlkKzliLDlhbPplK7luKflkI7nmoTlm57osINcclxuICAgICAqIEBwYXJhbSBlbmRDYWxsYmFjayDmkq3mlL7nu5PmnZ/lkI7nmoTlm57osINcclxuICAgICAqL1xyXG4gICAgcGxheVNwaW5lQW5pbWF0aW9uKG5hbWU6IHN0cmluZywgaXNMb29wOiBib29sZWFuID0gZmFsc2UsIGRhdGE/OiBLZXlGcmFtZURhdGFbXSwgZW5kQ2FsbGJhY2s/OiBGdW5jdGlvbikge1xyXG4gICAgICAgIGxldCBhbmltYSA9IHRoaXMuc3BpbmUuc2V0QW5pbWF0aW9uKDAsIG5hbWUsIGlzTG9vcCk7XHJcbiAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy5zcGluZS5zZXRUcmFja0V2ZW50TGlzdGVuZXIoYW5pbWEsIChlbnRyeTogc3Auc3BpbmUuVHJhY2tFbnRyeSwgZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChldmVudC5kYXRhLm5hbWUgPT0gZGF0YVtpXS5uYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFbaV0uY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChlbmRDYWxsYmFjaykge1xyXG4gICAgICAgICAgICB0aGlzLnNwaW5lLnNldFRyYWNrQ29tcGxldGVMaXN0ZW5lcihhbmltYSwgKGVudHJ5OiBzcC5zcGluZS5UcmFja0VudHJ5LCBldmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgYW5pbWEubGlzdGVuZXIgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgZW5kQ2FsbGJhY2soKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1DRC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgcHVibGljIHJlc2V0U2tpbGwoKSB7XHJcbiAgICAgICAgdGhpcy5za2lsbF9jZF90aW1lID0gMDtcclxuICAgICAgICB0aGlzLnNob3dDRCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldENEKCkge1xyXG4gICAgICAgIHRoaXMuc2tpbGxfY2RfdGltZSA9IHRoaXMuc2tpbGxfdG90YWxfdGltZTtcclxuICAgICAgICB0aGlzLnNob3dDRCgpO1xyXG4gICAgICAgIC8v6YeK5pS+5LqG5oqA6IO977yM56uL6ams5YeP5Y67TVBcclxuICAgICAgICAvL0dhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkud2FsbF9kYXRhLmNoYW5nZU1wKC10aGlzLmhlcm9fZGF0YS5jb3N0X21wKTtcclxuICAgIH1cclxuICAgIC8qKueZvuWIhuavlCAqL1xyXG4gICAgcHVibGljIHNldENEKHBlclRpbWU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuc2tpbGxfY2RfdGltZSA9IHBlclRpbWUgKiB0aGlzLmhlcm9fZGF0YS5nZXRTa2lsbENvbGREb3duKFNraWxsVHlwZS5BY3RpdmUpOztcclxuICAgICAgICB0aGlzLmNoYW5nZUNEKDApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjaGFuZ2VDRCh0aW1lOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnNraWxsX2NkX3RpbWUgKz0gdGltZTtcclxuICAgICAgICBpZiAodGhpcy5za2lsbF9jZF90aW1lIDw9IDApIHtcclxuICAgICAgICAgICAgdGhpcy5za2lsbF9jZF90aW1lID0gMDtcclxuICAgICAgICAgICAgaWYgKHRoaXMubXBfcHJvZ3Jlc3MpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubXBfcHJvZ3Jlc3Muc2V0Tm9ybWFsU1AoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hdXRvX2ZpZ2h0aW5nICYmIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfc3RhdGUgPT0gR2FtZVN0YXRlLkdhbWVfUGxheWluZyAmJiB0aGlzLmdldElzQ2FuU2tpbGwoKSAmJiBTa2lsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRJc1NraWxsU3RhdGUoKSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydEF1dG9SZWxlYXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvL+aYvuekuuiSmeadv+WSjOWAkuiuoeaXtlxyXG4gICAgICAgICAgICBpZiAodGhpcy5tcF9wcm9ncmVzcykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tcF9wcm9ncmVzcy5zZXRDRFNQKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zaG93Q0QoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNob3dDRCgpIHtcclxuICAgICAgICBpZiAodGhpcy5tcF9wcm9ncmVzcykge1xyXG4gICAgICAgICAgICBsZXQgcHJvZ3Jlc3MgPSAxIC0gdGhpcy5za2lsbF9jZF90aW1lIC8gdGhpcy5za2lsbF90b3RhbF90aW1lO1xyXG4gICAgICAgICAgICB0aGlzLm1wX3Byb2dyZXNzLnNldFByb2dyZXNzKHByb2dyZXNzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SXNDYW5Ta2lsbCgpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAodGhpcy5pc0hhdmVEZUJ1ZmYoQnVmZklkLk1vbnN0ZXJfWHVhbll1bikgfHwgdGhpcy5nZXRIZXJvU3RhdGUoKSA9PSBIZXJvX1N0YXRlLmV4aXQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmlzX3Nob3dfbXBfaGludCA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLnNraWxsX2NkX3RpbWUgPD0gMCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc19uZWVkX2NoZWNrX2Rpc3RhbmNlKSB7XHJcbiAgICAgICAgICAgICAgICAvL+WmguaenOmcgOimgeWIpOaWremHiuaUvui3neemu+eahO+8jOWImemcgOimgeWIpOaWremHiuaUvui3neemu+WGheacieayoeacieaAqueJqe+8jOayoeacieWImei/lOWbnmZhbHNlXHJcbiAgICAgICAgICAgICAgICBsZXQgZW5lbXlzID0gTW9uc3Rlck1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNb25zdGVyc0Zvck5lYXJlc3RCeVNraWxsKHRoaXMubWF4X2dvbmdqaV9udW0sIHRoaXMubm9kZS55LCB0aGlzLmNhc3RpbmdfZGlzdGFuY2UpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGVuZW15cyA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIGRhbWFnZSDmnKzmrKHkuI3mmrTlh7vnmoTkvKTlrrPlgLxcclxuICAgICAqIEBwYXJhbSBpc0J1bGxldCDmmK/lkKblrZDlvLnnsbvlnotcclxuICAgICAqIEBwYXJhbSBza2lsbFR5cGUg5oqA6IO957G75Z6LXHJcbiAgICAgKiBAcGFyYW0gc2tpbGxSYXRlIOWmguaenOaYr+aKgOiDve+8jOaKgOiDveeahOavlOeOh1xyXG4gICAgICogQHBhcmFtIGNvbnRpbnVvdXNSYXRlIOS8pOWus+avlOeOhy3lupTnlKjlnKjmjIHnu63kvKTlrrPmr5TnjodcclxuICAgICAqIEByZXR1cm5zIOaUu+WHu+aVsOaNrlxyXG4gICAgICovXHJcbiAgICBnZXRHb25nSmlEYXRhKGRhbWFnZVR5cGU6IERhbWFnZVR5cGUsIGlzQnVsbGV0OiBib29sZWFuLCBza2lsbFR5cGU6IFNraWxsVHlwZSwgc2tpbGxSYXRlOiBudW1iZXIgPSAxLCBjb250aW51b3VzUmF0ZTogbnVtYmVyID0gMCk6IEdvbmdKaURhdGEge1xyXG4gICAgICAgIGxldCBnakRhdGEgPSBuZXcgR29uZ0ppRGF0YSgpO1xyXG4gICAgICAgIGdqRGF0YS5oZXJvX2RhdGEgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmhlcm9fZGF0YSk7XHJcbiAgICAgICAgZ2pEYXRhLmlzX2J1bGxldCA9IGlzQnVsbGV0O1xyXG4gICAgICAgIGdqRGF0YS5kYW1hZ2VfdHlwZSA9IGRhbWFnZVR5cGU7XHJcbiAgICAgICAgZ2pEYXRhLmhlcm9fdHlwZSA9IHRoaXMuaGVyb190eXBlO1xyXG4gICAgICAgIGlmIChkYW1hZ2VUeXBlID09IERhbWFnZVR5cGUuTm9ybWFsKSB7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8v5oqA6IO95Lyk5a6z5q+U546HXHJcbiAgICAgICAgICAgIGdqRGF0YS5za2lsbF9kYW1hZ2VfcmF0ZSA9IHNraWxsUmF0ZTtcclxuICAgICAgICAgICAgZ2pEYXRhLmNvbnRpbnVvdXNfZGFtYWdlX3JhdGUgPSBjb250aW51b3VzUmF0ZTtcclxuICAgICAgICAgICAgaWYgKHNraWxsVHlwZSA9PSBTa2lsbFR5cGUuQWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICBnakRhdGEuc2tpbGxfcmVsZWFzZV9pZCA9IHRoaXMuZ2V0U2tpbGxSZWxlYXNlSWQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZ2pEYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRGFtYWdlTW9uc3RlcihkYW1hZ2VUeXBlOiBEYW1hZ2VUeXBlLCBpc0NyaXQ6IGJvb2xlYW4sIG1vbnN0ZXI6IGNjLk5vZGUpIHtcclxuICAgICAgICBpZiAoZGFtYWdlVHlwZSA9PSBEYW1hZ2VUeXBlLk5vcm1hbCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wZXQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGV0Lm9uSGVyb0hpdE1vbnN0ZXIobW9uc3Rlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuaGl0X2NhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGl0X2NhbGxiYWNrKGRhbWFnZVR5cGUsIGlzQ3JpdCwgbW9uc3Rlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlc2V0R29uZ0ppSmlTaHUoKSB7XHJcbiAgICAgICAgdGhpcy5nb25namlfamlzaHUgPSAwO1xyXG4gICAgICAgIHRoaXMuaXNfY2FuX2ppc2h1ID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICByZXNldE5vcm1hbEF0dGFjaygpIHtcclxuICAgICAgICB0aGlzLmdvbmdqaV9qaXNodSA9IHRoaXMuaGVyb19kYXRhLmdvbmdqaV9qaWFuZ2U7XHJcbiAgICAgICAgdGhpcy5pc19jYW5famlzaHUgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEF0dFNwaW5lU2NhbGUoKSB7XHJcbiAgICAgICAgdGhpcy5zcGluZS50aW1lU2NhbGUgPSB0aGlzLmhlcm9fZGF0YS5iYXNlX2ppYW5nZSAvIHRoaXMuaGVyb19kYXRhLmdvbmdqaV9qaWFuZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnROb3JtYWxBdHRhY2sobW9uc3RlcjogY2MuTm9kZSkge1xyXG4gICAgICAgIGxldCBpc0RvdWJsZTogYm9vbGVhbiA9IHRoaXMuaXNfZG91YmxlX2F0dGFjaztcclxuICAgICAgICBpZiAodGhpcy5pc19kb3VibGVfYXR0YWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3BpbmUudGltZVNjYWxlID0gdGhpcy5oZXJvX2RhdGEuYmFzZV9qaWFuZ2UgLyB0aGlzLmhlcm9fZGF0YS5nb25namlfamlhbmdlICogMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5pc19kb3VibGVfYXR0YWNrID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5hdHRhY2tfY2FsbGJhY2sobW9uc3Rlcik7XHJcbiAgICAgICAgaWYgKHRoaXMucGV0KSB7XHJcbiAgICAgICAgICAgIHRoaXMucGV0LnN0YXJ0UmVsZWFzZVNraWxsKG1vbnN0ZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9tb2RlID09IEdhbWVNb2RlLkVuZGxlc3MpIHtcclxuICAgICAgICAgICAgaWYgKGlzRG91YmxlID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYnVmZiA9IHRoaXMuZ2V0RW5kbGVzc0J5VHlwZShFbmRsZXNzQnVmZlR5cGUuRG91YmxlQXR0YWNrKVxyXG4gICAgICAgICAgICAgICAgaWYgKGJ1ZmYpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL+amgueOh1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCByYXRlID0gYnVmZi52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoTWF0aC5yYW5kb20oKSA8IHJhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc19kb3VibGVfYXR0YWNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zcGluZS50aW1lU2NhbGUgPSB0aGlzLmhlcm9fZGF0YS5iYXNlX2ppYW5nZSAvIHRoaXMuaGVyb19kYXRhLmdvbmdqaV9qaWFuZ2UgKiAyO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVVQREFURS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICB1cGRhdGUoZHQ6IG51bWJlcikge1xyXG4gICAgICAgIGlmIChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX3N0YXRlICE9IEdhbWVTdGF0ZS5HYW1lX1BsYXlpbmcgfHwgSGVyb19TdGF0ZS5leGl0ID09IHRoaXMuZ2V0SGVyb1N0YXRlKCkpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB0aGlzLmNoZWNrU2tpbGwoZHQpO1xyXG4gICAgICAgIGlmICh0aGlzLmlzSGF2ZURlQnVmZihCdWZmSWQuTW9uc3Rlcl9YdWFuWXVuKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2hlY2tBdHRhY2soZHQpO1xyXG4gICAgICAgIGlmICh0aGlzLmNsaWNrX3JlbWFpbiA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5jbGlja19yZW1haW4gLT0gZHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgdng6IG51bWJlciA9ICh0aGlzLnRhcmdldFggLSB0aGlzLm5vZGUueCkgKiB0aGlzLmVhc2luZztcclxuICAgICAgICB0aGlzLm5vZGUueCArPSB2eDtcclxuICAgICAgICBpZih0aGlzLnBvc0luZGV4PT0yKXtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFyUG9zWD10aGlzLm5vZGUueDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5ub2RlX3NoYWRvdyl7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZV9zaGFkb3cuc2V0UG9zaXRpb24oY2MudjIodGhpcy5ub2RlLnggKyB0aGlzLnBvcy54ICogdGhpcy5zZXR1cF9zY2FsZSwgdGhpcy5ub2RlLnkgKyB0aGlzLnBvcy55ICogdGhpcy5zZXR1cF9zY2FsZSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBzd2l0Y2ggKHRoaXMuc3BlZWRUeXBlKSB7XHJcbiAgICAgICAgLy8gICAgIGNhc2UgU3BlZWRUeXBlLlNUT1A6XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLm1vdmVTcGVlZCA9IHRoaXMuc3RvcFNwZWVkO1xyXG4gICAgICAgIC8vICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgLy8gICAgIGNhc2UgU3BlZWRUeXBlLk5PUk1BTDpcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMubW92ZVNwZWVkID0gdGhpcy5ub3JtYWxTcGVlZDtcclxuICAgICAgICAvLyAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIC8vICAgICBjYXNlIFNwZWVkVHlwZS5GQVNUOlxyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5tb3ZlU3BlZWQgPSB0aGlzLmZhc3RTcGVlZDtcclxuICAgICAgICAvLyAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIC8vICAgICBkZWZhdWx0OlxyXG4gICAgICAgIC8vICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuXHJcbiAgICAgICAgLy8gdGhpcy5tb3ZlKCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCB1cGRhdGVDaGVjayhkdCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICh0aGlzLmlzSGF2ZURlQnVmZihCdWZmSWQuTW9uc3Rlcl9YdWFuWXVuKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2hlY2tBdHRhY2soZHQpO1xyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNoZWNrU2tpbGwoZHQ6IG51bWJlcikge1xyXG4gICAgICAgIGlmICh0aGlzLmhlcm9fc3RhdGUgIT0gSGVyb19TdGF0ZS5za2lsbCkge1xyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZUNEKC1kdCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2hlY2tBdHRhY2soZHQpIHtcclxuICAgICAgICBpZiAodGhpcy5pc19jYW5famlzaHUgJiYgdGhpcy5pc19sb2FkX29rKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ29uZ2ppX2ppc2h1ICs9IGR0O1xyXG4gICAgICAgICAgICBpZiAodGhpcy5nb25namlfamlzaHUgPj0gdGhpcy5oZXJvX2RhdGEuZ29uZ2ppX2ppYW5nZSkge1xyXG4gICAgICAgICAgICAgICAgLy/lvIDlp4vmlLvlh7tcclxuICAgICAgICAgICAgICAgIHRoaXMuZ29uZ2ppX2ppc2h1ID0gMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNfY2FuX2dvbmdqaSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy/oh6rliqjmlLvlh7tcclxuICAgICAgICBpZiAodGhpcy5pc19jYW5fZ29uZ2ppICYmIHRoaXMuZ2V0SGVyb1N0YXRlKCkgIT0gSGVyb19TdGF0ZS5za2lsbCkge1xyXG4gICAgICAgICAgICB0aGlzLmlzX2Nhbl9nb25namkgPSBmYWxzZTtcclxuICAgICAgICAgICAgbGV0IG1vbnN0ZXJzID0gTW9uc3Rlck1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNb25zdGVyc0Zvck5lYXJlc3QodGhpcy5tYXhfZ29uZ2ppX251bSwgdGhpcy5ub2RlLmdldFBvc2l0aW9uKCksIHRoaXMuaGVyb19kYXRhLmdvbmdqaV9mYW53ZWksdGhpcy5wb3NJbmRleCk7XHJcbiAgICAgICAgICAgIGlmIChtb25zdGVycykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nb25namlfamlzaHUgPSAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc19jYW5fZ29uZ2ppID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0QXR0U3BpbmVTY2FsZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydE5vcm1hbEF0dGFjayhtb25zdGVyc1swXSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=