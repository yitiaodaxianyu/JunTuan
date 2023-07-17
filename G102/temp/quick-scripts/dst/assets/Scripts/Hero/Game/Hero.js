
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
var Joystick_1 = require("../../Joystick/Joystick");
// import { instance } from "../../Game/TouchPlane/TouchPlane";
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
        /**---------------------------------操作相关---------------------------------------------- */
        //-----------------------------------触摸移动事件------------------------------------------------------------
        // leaterNum: number = 0;//延迟数据播放动画
        // leaterSpeed: number = 5;
        // newPos: cc.Vec2;
        // posYTemp: number;
        _this.speedType = Joystick_1.SpeedType.STOP;
        _this.moveDir = cc.v2(0, 1);
        // //抄别人的，本来有两种速度，现在先用一个数据
        _this.normalSpeed = 600;
        _this.fastSpeed = 600;
        _this.stopSpeed = 0;
        _this.moveSpeed = 0;
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
            Joystick_1.instance.off(cc.Node.EventType.TOUCH_START, this.onTouchStartByJoy, this);
            Joystick_1.instance.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMoveByJoy, this);
            Joystick_1.instance.off(cc.Node.EventType.TOUCH_END, this.onTouchEndByJoy, this);
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
            Joystick_1.instance.on(cc.Node.EventType.TOUCH_START, this.onTouchStartByJoy, this);
            Joystick_1.instance.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMoveByJoy, this);
            Joystick_1.instance.on(cc.Node.EventType.TOUCH_END, this.onTouchEndByJoy, this);
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
    // posX: number = 0;//初始化时候的位置
    // targetX: number = 0;
    // easing: number = 0.2;
    // onTouchEndByJoy(event: cc.Event.EventTouch, data) {
    //     this.targetX = (GameManager.getInstance().aniType - 2) * 150 + this.posX;
    // }
    //----------------------------------【皮肤】----------------------------------------------
    Hero.prototype.setSkin = function () {
        //let heroQuality=HeroManager.getInstance().getHeroQuality(this.hero_type);
        //let tier=HeroQualityManager.getInstance().getTier(heroQuality);
        //this.spine.setSkin('stage'+(HeroManager.getSkinIndex(tier)));
    };
    /**
  * 移动
  */
    Hero.prototype.move = function () {
        // this.node.angle =
        // cc.misc.radiansToDegrees(Math.atan2(this.moveDir.y, this.moveDir.x)) - 90;
        var oldPos = cc.v2();
        this.node.getPosition(oldPos);
        var newPos = oldPos.add(this.moveDir.mul(this.moveSpeed / 120));
        this.node.setPosition(newPos);
    };
    Hero.prototype.onTouchStartByJoy = function () { };
    Hero.prototype.onTouchMoveByJoy = function (event, data) {
        this.speedType = data.speedType;
        this.moveDir = data.moveDistance;
    };
    Hero.prototype.onTouchEndByJoy = function (event, data) {
        this.speedType = data.speedType;
    };
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
        // let vx: number = (this.targetX - this.node.x) * this.easing;
        // this.node.x += vx;
        switch (this.speedType) {
            case Joystick_1.SpeedType.STOP:
                this.moveSpeed = this.stopSpeed;
                break;
            case Joystick_1.SpeedType.NORMAL:
                this.moveSpeed = this.normalSpeed;
                break;
            case Joystick_1.SpeedType.FAST:
                this.moveSpeed = this.fastSpeed;
                break;
            default:
                break;
        }
        if (this.speedType !== Joystick_1.SpeedType.STOP) {
            this.move();
        }
        if (this.node_shadow) {
            this.node_shadow.setPosition(cc.v2(this.node.x + this.pos.x * this.setup_scale, this.node.y + this.pos.y * this.setup_scale));
        }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcR2FtZVxcSGVyby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBK0w7QUFHL0wsNkNBQXdEO0FBRXhELGlEQUE0QztBQUM1QyxvRUFBaUY7QUFFakYsK0RBQTBEO0FBQzFELDZDQUFzRDtBQUN0RCxnRUFBMkQ7QUFDM0QseURBQXNFO0FBQ3RFLHdEQUFtRDtBQUNuRCx5Q0FBb0M7QUFDcEMsdUNBQXNDO0FBQ3RDLHVDQUFrQztBQUNsQyxvREFBK0M7QUFDL0MsdUVBQWtFO0FBQ2xFLHNEQUFpRDtBQUNqRCxnREFBK0M7QUFDL0Msc0RBQWlEO0FBQ2pELDRFQUEwRjtBQUMxRixrRUFBd0U7QUFDeEUsa0RBQTZDO0FBQzdDLHFEQUEyRDtBQUMzRCxnREFBMkM7QUFDM0Msa0RBQTZDO0FBQzdDLGdEQUEyQztBQUMzQyxpREFBNEM7QUFDNUMsb0RBQThEO0FBQzlELCtEQUErRDtBQUl6RCxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUFrQyx3QkFBWTtJQUE5QztRQUFBLHFFQW8zQ0M7UUFoM0NHLGlCQUFpQjtRQUNqQixnQkFBVSxHQUFZLEtBQUssQ0FBQztRQUM1QixrQkFBWSxHQUFXLENBQUMsQ0FBQztRQUN6QixtQkFBYSxHQUFXLENBQUMsQ0FBQztRQUcxQixlQUFTLEdBQWMsc0JBQVMsQ0FBQyxZQUFZLENBQUM7UUFHOUMsc0JBQWdCLEdBQWMsSUFBSSxDQUFDO1FBRW5DLE1BQU07UUFDTixXQUFLLEdBQWdCLElBQUksQ0FBQztRQUMxQixhQUFhO1FBQ2IsbUJBQWEsR0FBcUIsNkJBQWdCLENBQUMsR0FBRyxDQUFDO1FBQ3ZELFdBQVc7UUFDWCxnQkFBVSxHQUFlLHVCQUFVLENBQUMsSUFBSSxDQUFDO1FBQ3pDLE1BQU07UUFDTixrQkFBWSxHQUFX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O0lBajNDRCx1QkFBdUI7SUFDVCxpQkFBWSxHQUFXLENBQUMsQ0FBQztJQUN6QixtQkFBYyxHQUFXLENBQUMsQ0FBQztJQU96QztRQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLHNCQUFTLENBQUMsRUFBRSxDQUFDOzJDQUNPO0lBRzlDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7a0RBQ2U7SUFibEIsSUFBSTtRQUR4QixPQUFPO09BQ2EsSUFBSSxDQW8zQ3hCO0lBQUQsV0FBQztDQXAzQ0QsQUFvM0NDLENBcDNDaUMsRUFBRSxDQUFDLFNBQVMsR0FvM0M3QztrQkFwM0NvQixJQUFJIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQnVmZklkLCBCdWZmU3RhdGVUeXBlLCBCdWZmVHlwZSwgRGFtYWdlVHlwZSwgR29uZ0ppX0ZhbmdYaWFuZywgSGVyb19EZUJ1ZmYsIEhlcm9fU3RhdGUsIEhlcm9fU3RhdGVfTmFtZSwgSGVyb19UeXBlLCBTa2lsbEluZGljYXRvclR5cGUsIFNraWxsVGlwVHlwZSwgU2tpbGxUeXBlIH0gZnJvbSBcIi4vSGVyb0NvbmZpZ1wiO1xyXG5pbXBvcnQgTXBQcm9ncmVzcyBmcm9tIFwiLi9NcFByb2dyZXNzXCI7XHJcbmltcG9ydCBCdWZmU3RhdGUgZnJvbSBcIi4vQnVmZlN0YXRlXCI7XHJcbmltcG9ydCB7IEdvbmdKaURhdGEsIEhlcm9EYXRhIH0gZnJvbSBcIi4uL0RhdGEvSGVyb0RhdGFcIjtcclxuaW1wb3J0IFBldCBmcm9tIFwiLi4vLi4vUGV0L0dhbWUvUGV0XCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgR2FtZUVmZmVjdElkLCBHYW1lRWZmZWN0c01hbmFnZXIgfSBmcm9tIFwiLi4vLi4vR2FtZS9HYW1lRWZmZWN0c01hbmFnZXJcIjtcclxuaW1wb3J0IHsgSGVyb01hbmFnZXIgfSBmcm9tIFwiLi4vRGF0YS9IZXJvTWFuYWdlclwiO1xyXG5pbXBvcnQgTW9uc3Rlck1hbmFnZXIgZnJvbSBcIi4uLy4uL01vbnN0ZXIvTW9uc3Rlck1hbmFnZXJcIjtcclxuaW1wb3J0IHsgR2FtZU1vZGUsIEdhbWVTdGF0ZSB9IGZyb20gXCIuLi8uLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IEJ1ZmZTdGF0ZU1hbmFnZXIgZnJvbSBcIi4uLy4uL0dhbWUvQnVmZlN0YXRlTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBJbmp1cmVkRGF0YSwgS2V5RnJhbWVEYXRhIH0gZnJvbSBcIi4uLy4uL01vbnN0ZXIvTW9uc3RlckRhdGFcIjtcclxuaW1wb3J0IFNraWxsTWFuYWdlciBmcm9tIFwiLi4vLi4vR2FtZS9Ta2lsbE1hbmFnZXJcIjtcclxuaW1wb3J0IEJ1ZmZUaW1lciBmcm9tIFwiLi9CdWZmVGltZXJcIjtcclxuaW1wb3J0IHsgQnVmZkRhdGEgfSBmcm9tIFwiLi9CdWZmRGF0YVwiO1xyXG5pbXBvcnQgU2tpbGxUaXAgZnJvbSBcIi4vU2tpbGxUaXBcIjtcclxuaW1wb3J0IFNreU1hbmFnZXIgZnJvbSBcIi4uLy4uL0dhbWUvU2t5TWFuYWdlclwiO1xyXG5pbXBvcnQgTGFuZ3VhZ2VNYW5hZ2VyIGZyb20gXCIuLi8uLi9tdWx0aUxhbmd1YWdlL0xhbmd1YWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgVGFza01hbmFnZXIgZnJvbSBcIi4uLy4uL1Rhc2svVGFza01hbmFnZXJcIjtcclxuaW1wb3J0IHsgVGFza0l0ZW0gfSBmcm9tIFwiLi4vLi4vVGFzay9UYXNrRW51bVwiO1xyXG5pbXBvcnQgV2FsbE1hbmFnZXIgZnJvbSBcIi4uLy4uL1dhbGwvV2FsbE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgRW5kbGVzc0J1ZmYsIEVuZGxlc3NCdWZmVHlwZSB9IGZyb20gXCIuLi8uLi9jb3B5L2VuZGxlc3NjaGFsbGVuZ2VzL0VuZGxlc3NDb25maWdcIjtcclxuaW1wb3J0IHsgU3Bpcml0QXR0cmlidXRlTWFuYWdlciB9IGZyb20gXCIuLi8uLi9QZXQvRGF0YS9TcGlyaXRBdHRyaWJ1dGVcIjtcclxuaW1wb3J0IEZpcmVQZXQgZnJvbSBcIi4uLy4uL1BldC9HYW1lL0ZpcmVQZXRcIjtcclxuaW1wb3J0IHsgSGVyb0Jhc2VJbmZvTWFuYWdlciB9IGZyb20gXCIuLi9EYXRhL0hlcm9CYXNlSW5mb1wiO1xyXG5pbXBvcnQgSWNlUGV0IGZyb20gXCIuLi8uLi9QZXQvR2FtZS9JY2VQZXRcIjtcclxuaW1wb3J0IFdpbmRQZXQgZnJvbSBcIi4uLy4uL1BldC9HYW1lL1dpbmRQZXRcIjtcclxuaW1wb3J0IFJheVBldCBmcm9tIFwiLi4vLi4vUGV0L0dhbWUvUmF5UGV0XCI7XHJcbmltcG9ydCBNb25zdGVyIGZyb20gXCIuLi8uLi9Nb25zdGVyL01vbnN0ZXJcIjtcclxuaW1wb3J0IHsgU3BlZWRUeXBlLCBpbnN0YW5jZSB9IGZyb20gXCIuLi8uLi9Kb3lzdGljay9Kb3lzdGlja1wiO1xyXG4vLyBpbXBvcnQgeyBpbnN0YW5jZSB9IGZyb20gXCIuLi8uLi9HYW1lL1RvdWNoUGxhbmUvVG91Y2hQbGFuZVwiO1xyXG5cclxuXHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGVybyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICAvKirmiYDmnInnmoToi7Hpm4Tlj4rlhbbmiYDpnIDotYTmupDmmK/lkKbliqDovb3lrozmr5UgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgbWF4X2xvYWRfbnVtOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIHN0YXRpYyBjdXJfbG9hZGVkX251bTogbnVtYmVyID0gMDtcclxuICAgIC8qKuaJgOmcgOeahOWKqOeUu+WKoOi9veaYr+WQpm9rICovXHJcbiAgICBpc19sb2FkX29rOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBjdXJfbG9hZF9udW06IG51bWJlciA9IDA7XHJcbiAgICBuZWVkX2xvYWRfbnVtOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkVudW0oSGVyb19UeXBlKSB9KVxyXG4gICAgaGVyb190eXBlOiBIZXJvX1R5cGUgPSBIZXJvX1R5cGUuQ2hhbmdNYW9TaG91O1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICBwcmVmYWJfc2tpbGxfdGlwOiBjYy5QcmVmYWIgPSBudWxsO1xyXG5cclxuICAgIC8v6aqo6aq85Yqo55S7XHJcbiAgICBzcGluZTogc3AuU2tlbGV0b24gPSBudWxsO1xyXG4gICAgLyoq5b2T5YmN6Iux6ZuE55qE6Z2i5ZCRICovXHJcbiAgICBjdXJfZmFuZ3hpYW5nOiBHb25nSmlfRmFuZ1hpYW5nID0gR29uZ0ppX0ZhbmdYaWFuZy56dW87XHJcbiAgICAvKiroi7Hpm4TnmoTnirbmgIEgKi9cclxuICAgIGhlcm9fc3RhdGU6IEhlcm9fU3RhdGUgPSBIZXJvX1N0YXRlLmlkbGU7XHJcbiAgICAvL+aUu+WHu+iuoeaVsFxyXG4gICAgZ29uZ2ppX2ppc2h1OiBudW1iZXIgPSAxO1xyXG4gICAgLyoq5piv5ZCm5Y+v5Lul5pS75Ye7ICovXHJcbiAgICBpc19jYW5fZ29uZ2ppOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAvKirmmK/lkKblj6/ku6XmlLvlh7vorqHmlbAgKi9cclxuICAgIGlzX2Nhbl9qaXNodTogYm9vbGVhbiA9IHRydWU7XHJcbiAgICAvL+acgOWkp+eahOaUu+WHu+asoeaVsFxyXG4gICAgbWF4X2dvbmdqaV9udW0gPSAxO1xyXG4gICAgLy/mioDog73liankvZnnmoTlhrfljbTml7bpl7RcclxuICAgIHNraWxsX2NkX3RpbWU6IG51bWJlciA9IDA7XHJcbiAgICAvKirkuLvliqjmioDog73mioDog73mnIDlpKflhrfljbQqL1xyXG4gICAgc2tpbGxfdG90YWxfdGltZTogbnVtYmVyID0gNTtcclxuICAgIC8qKuaWveazlei3neemuyAqL1xyXG4gICAgY2FzdGluZ19kaXN0YW5jZTogbnVtYmVyID0gMTAwMDtcclxuICAgIC8qKuWtkOW8uemAn+W6piAqL1xyXG4gICAgYnVsbGV0X3NwZWVkOiBudW1iZXIgPSAxMDAwO1xyXG4gICAgLy/mtojogJfnmoRNUOWAvFxyXG4gICAgY29zdF9tcDogbnVtYmVyID0gMjA7XHJcbiAgICBtcF9wcm9ncmVzczogTXBQcm9ncmVzcyA9IG51bGw7XHJcbiAgICAvKiroi7Hpm4TlvZPliY3mi6XmnInnmoRidWZmICovXHJcbiAgICBwcm90ZWN0ZWQgaGVyb19idWZmOiBNYXA8QnVmZklkLCBCdWZmVGltZXI+ID0gbnVsbDtcclxuICAgIC8qKuiLsembhOW9k+WJjeaLpeacieeahGRlYnVmZiAqL1xyXG4gICAgcHJvdGVjdGVkIGhlcm9fZGVidWZmOiBNYXA8QnVmZklkLCBCdWZmVGltZXI+ID0gbnVsbDtcclxuICAgIC8qKuaXoOWwvWJ1ZmYgKi9cclxuICAgIHByb3RlY3RlZCBtYXBfZW5kbGVzc19idWZmOiBNYXA8bnVtYmVyLCBFbmRsZXNzQnVmZj4gPSBudWxsO1xyXG4gICAgLyoq55yp5pmV5L2N572uICovXHJcbiAgICB4dWFueXVuX3BvczogY2MuVmVjMiA9IG51bGw7XHJcbiAgICAvKirlrZDlvLnnlJ/miJDnmoTkvY3nva4gKi9cclxuICAgIGJ1bGxldF9wb3M6IGNjLlZlYzJbXSA9IFtdO1xyXG4gICAgLy/oi7Hpm4TnmoTmlbDmja5cclxuICAgIGhlcm9fZGF0YTogSGVyb0RhdGEgPSBudWxsO1xyXG4gICAgaXNfc2hvd19tcF9oaW50OiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgLyoq5b2T5YmN55qE6Z+n5oCnICovXHJcbiAgICBwcm90ZWN0ZWQgY3VyX3RvdWdobmVzczogbnVtYmVyID0gMDtcclxuICAgIHpoaXNoaXFpX3R5cGU6IFNraWxsSW5kaWNhdG9yVHlwZSA9IFNraWxsSW5kaWNhdG9yVHlwZS5iZWVsaW5lO1xyXG4gICAgLyoq5oqA6IO96YeK5pS+5Zue6LCDICovXHJcbiAgICBza2lsbF9jYWxsYmFjazogRnVuY3Rpb24gPSBudWxsO1xyXG4gICAgLyoq5pS75Ye76YeK5pS+5Zue6LCDICovXHJcbiAgICBhdHRhY2tfY2FsbGJhY2s6IEZ1bmN0aW9uID0gbnVsbDtcclxuICAgIC8qKuecqeaZleWbnuiwgyAqLztcclxuICAgIHh1YW55dW5fY2FsbGJhY2s6IEZ1bmN0aW9uID0gbnVsbDtcclxuICAgIC8qKuWRveS4reWbnuiwgyAqL1xyXG4gICAgaGl0X2NhbGxiYWNrOiBGdW5jdGlvbiA9IG51bGw7XHJcbiAgICAvKirph43nva7lm57osIMgKi9cclxuICAgIHJlc2V0X2NhbGxiYWNrOiBGdW5jdGlvbiA9IG51bGw7XHJcbiAgICAvKirog5zliKnlm57osIMgKi9cclxuICAgIHdpbl9jYWxsYmFjazogRnVuY3Rpb24gPSBudWxsO1xyXG4gICAgLyoq5Yqg6L295a6M5q+V5Zue6LCD5Zue6LCDICovXHJcbiAgICBsb2FkZWRfY2FsbGJhY2s6IEZ1bmN0aW9uID0gbnVsbDtcclxuICAgIC8qKuWuoOeJqSAqL1xyXG4gICAgcGV0OiBQZXQgPSBudWxsO1xyXG4gICAgLyoq5a6g54mp5oqA6IO955qE5LiA5Lqb6KKr5YqoICovXHJcbiAgICAvKirmraTmrKHkvKTlrrPlv4XlrprmmrTlh7sgKi9cclxuICAgIG11c3RfY3JpdDogbnVtYmVyID0gMDtcclxuICAgIC8qKuWuoOeJqTIx5Y+v5Lul6Kem5Y+R5aKe5Lyk5qyh5pWwICovXHJcbiAgICBjcml0X2luY3JlYXNlX2NkXzNfbnVtOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIHNldHVwX3NjYWxlOiBudW1iZXIgPSAwLjUwO1xyXG4gICAgYmFzZV9hdHRfamlhbmdlOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIC8qKmJ1ZmbnirbmgIEgKi9cclxuICAgIG1hcF9idWZmX3N0YXRlOiBNYXA8bnVtYmVyLCBCdWZmU3RhdGU+ID0gbnVsbDtcclxuICAgIC8qKmRlYnVmZueKtuaAgSAqL1xyXG4gICAgbWFwX2RlYnVmZl9zdGF0ZTogTWFwPG51bWJlciwgQnVmZlN0YXRlPiA9IG51bGw7XHJcbiAgICAvKirmmK/lkKbpnIDopoHmo4Dmn6XmioDog73ph4rmlL7ot53nprsgKi9cclxuICAgIGlzX25lZWRfY2hlY2tfZGlzdGFuY2U6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgLyoq5oyH56S65Zmo57G75Z6LICovXHJcbiAgICBwcm90ZWN0ZWQgc2tpbGxfdGlwX3R5cGU6IFNraWxsVGlwVHlwZSA9IFNraWxsVGlwVHlwZS5GdWxsO1xyXG4gICAgLyoq5piv5ZCm5Y+v5Lul5aSE55CG6Kem5pG45LqL5Lu277yM5b2T5oqA6IO9Q0Tlrozmr5XliIfmjInkuIvkuoboi7Hpm4Tml7bkuLp0cnVlICovXHJcbiAgICBwcml2YXRlIGlzX2Nhbl90b3VjaDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBza2lsbF90aXA6IFNraWxsVGlwID0gbnVsbDtcclxuICAgIC8qKuaYr+WQpuinpuWPkeiHquWKqOmHiuaUvumAu+i+kSAqL1xyXG4gICAgcHJpdmF0ZSBpc19hdXRvX3JlbGVhc2U6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgdG91Y2hfcmVjdDogY2MuUmVjdCA9IG51bGw7XHJcbiAgICAvKirmgLvlhbHkvb/nlKjmioDog73nmoTmrKHmlbAgKi9cclxuICAgIHByb3RlY3RlZCB1c2Vfc2tpbGxfbnVtOiBudW1iZXIgPSAwO1xyXG4gICAgcHJvdGVjdGVkIG5vZGVfc2hhZG93OiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIC8qKueCueWHu+WJqeS9mSAqL1xyXG4gICAgcHJvdGVjdGVkIGNsaWNrX3JlbWFpbjogbnVtYmVyID0gMDtcclxuICAgIC8qKuaUu+mAn+iusOW9leWAvO+8jOS4jeS9nOWIpOaWrSAqL1xyXG4gICAgZ29uZ2ppX3N1ZHU6IG51bWJlciA9IDA7XHJcbiAgICAvKirmioDog73pmJ/liJcgKi9cclxuICAgIHNraWxsX3F1ZXVlOiBTa2lsbFR5cGVbXSA9IFtdO1xyXG4gICAgLyoq5piv5ZCm6L+e57ut5pS75Ye7ICovXHJcbiAgICBpc19kb3VibGVfYXR0YWNrOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAvKirlsYLnuqcqL1xyXG4gICAgcHVibGljIHZfSW5kZXg6IG51bWJlciA9IDA7XHJcblxyXG4gICAgcG9zOiBjYy5WZWMyO1xyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUxPQUQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIHByb3RlY3RlZCBvbkxvYWQoKSB7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hbGxfaGVyby5zZXQodGhpcy5oZXJvX3R5cGUsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuc3BpbmUgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcclxuICAgICAgICAvL3RoaXMuc2V0U2tpbigpO1xyXG4gICAgICAgIHRoaXMudG91Y2hMaXN0ZW4oKTtcclxuICAgICAgICB0aGlzLmluaXRQb3MoKTtcclxuICAgICAgICAvLyBpZih0aGlzLmhlcm9fdHlwZT09SGVyb19UeXBlLkRlTHVZaSl7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuc2V0dXBfc2NhbGU9MC4yMjtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gaWYodGhpcy5oZXJvX3R5cGU9PUhlcm9fVHlwZS5MZWlTaGVufHx0aGlzLmhlcm9fdHlwZT09SGVyb19UeXBlLlNob3VXYW5nKXtcclxuICAgICAgICAvLyAgICAgdGhpcy5zZXR1cF9zY2FsZT0xO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICB0aGlzLm5vZGUuc2NhbGUgPSB0aGlzLnNldHVwX3NjYWxlO1xyXG4gICAgICAgIHRoaXMubm9kZS5zY2FsZVggPSAtdGhpcy5zZXR1cF9zY2FsZTtcclxuICAgICAgICB0aGlzLmFkZExvYWRCeUdhbWVFZmZlY3RJZChHYW1lRWZmZWN0SWQuaGVyb19za2lsbF9jb21tb24sIDIpO1xyXG4gICAgICAgIHRoaXMuYWRkTG9hZEJ5R2FtZUVmZmVjdElkKEdhbWVFZmZlY3RJZC5za2lsbF9kYW1hZ2VfcmVjb3JkLCAyKTtcclxuICAgICAgICB0aGlzLm5vZGUuekluZGV4ID0gMTtcclxuICAgICAgICB0aGlzLm1hcF9idWZmX3N0YXRlID0gbmV3IE1hcDxudW1iZXIsIEJ1ZmZTdGF0ZT4oKTtcclxuICAgICAgICB0aGlzLm1hcF9kZWJ1ZmZfc3RhdGUgPSBuZXcgTWFwPG51bWJlciwgQnVmZlN0YXRlPigpO1xyXG4gICAgICAgIHRoaXMuaGVyb19idWZmID0gbmV3IE1hcDxCdWZmSWQsIEJ1ZmZUaW1lcj4oKTtcclxuICAgICAgICB0aGlzLmhlcm9fZGVidWZmID0gbmV3IE1hcDxCdWZmSWQsIEJ1ZmZUaW1lcj4oKTtcclxuICAgICAgICB0aGlzLm1hcF9lbmRsZXNzX2J1ZmYgPSBuZXcgTWFwPEJ1ZmZJZCwgRW5kbGVzc0J1ZmY+KCk7XHJcbiAgICAgICAgdGhpcy5hZGRTa2lsbFRpcFR5cGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgc3RhcnQoKSB7XHJcbiAgICAgICAgLy/liqDovb3mlbDmja5cclxuICAgICAgICB0aGlzLmhlcm9fZGF0YSA9IEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2FtZV9oZXJvX2RhdGEuZ2V0KHRoaXMuaGVyb190eXBlKTtcclxuICAgICAgICB0aGlzLmJ1bGxldF9zcGVlZCA9IEhlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRCYXNlQnVsbGV0U3BlZWQodGhpcy5oZXJvX3R5cGUpO1xyXG4gICAgICAgIHRoaXMuZ29uZ2ppX2ppc2h1ID0gdGhpcy5oZXJvX2RhdGEuZ29uZ2ppX2ppYW5nZTtcclxuICAgICAgICB0aGlzLmdvbmdqaV9zdWR1ID0gdGhpcy5nZXRBdHRhY2tTcGVlZCgpO1xyXG4gICAgICAgIHRoaXMuc2V0SGVyb1N0YXRlKEhlcm9fU3RhdGUuaWRsZSwgR29uZ0ppX0ZhbmdYaWFuZy56aG9uZyk7XHJcbiAgICAgICAgLy90aGlzLnBsYXlTcGluZUFuaW1hdG9uKEhlcm9fU3RhdGVfTmFtZS5JZGxlLHRydWUsbnVsbCxudWxsKTtcclxuICAgICAgICAvL+WKoOi9vW1w6L+b5bqm5p2hXHJcbiAgICAgICAgdGhpcy5sb2FkTXBQcm9ncmVzcygpO1xyXG4gICAgICAgIHRoaXMubG9hZFBldCgpO1xyXG4gICAgICAgIGxldCBzZWxmU2hhZG93ID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdNb25zdGVyX1NoYWRvdycpO1xyXG4gICAgICAgIHRoaXMucG9zID0gc2VsZlNoYWRvdy5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgIHRoaXMubm9kZV9zaGFkb3cgPSBjYy5pbnN0YW50aWF0ZShzZWxmU2hhZG93KTtcclxuICAgICAgICB0aGlzLm5vZGVfc2hhZG93LnBhcmVudCA9IGNjLmZpbmQoJ0NhbnZhcy9IZXJvX1NoYWRvd19Sb290Jyk7XHJcbiAgICAgICAgdGhpcy5ub2RlX3NoYWRvdy5zY2FsZSA9IHRoaXMuc2V0dXBfc2NhbGU7XHJcbiAgICAgICAgdGhpcy5ub2RlX3NoYWRvdy5zZXRQb3NpdGlvbihjYy52Mih0aGlzLm5vZGUueCArIHRoaXMucG9zLnggKiB0aGlzLnNldHVwX3NjYWxlLCB0aGlzLm5vZGUueSArIHRoaXMucG9zLnkgKiB0aGlzLnNldHVwX3NjYWxlKSk7XHJcbiAgICAgICAgc2VsZlNoYWRvdy5yZW1vdmVGcm9tUGFyZW50KCk7XHJcbiAgICAgICAgaWYgKHRoaXMuZ2V0SGVyb1N0YXRlKCkgPT0gSGVyb19TdGF0ZS5leGl0KSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZV9zaGFkb3cub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubm9kZS56SW5kZXggPSAyO1xyXG4gICAgICAgIHRoaXMuY2FzdGluZ19kaXN0YW5jZSA9IHRoaXMuaGVyb19kYXRhLmdvbmdqaV9mYW53ZWk7XHJcbiAgICAgICAgaWYgKGNjLndpblNpemUuaGVpZ2h0IC8gY2Mud2luU2l6ZS53aWR0aCA+IDIpIHtcclxuICAgICAgICAgICAgdGhpcy5jYXN0aW5nX2Rpc3RhbmNlID0gdGhpcy5oZXJvX2RhdGEuZ29uZ2ppX2ZhbndlaSArIDIwMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gaWYodGhpcy5oZXJvX3R5cGU9PUhlcm9fVHlwZS5Odld1KXtcclxuICAgICAgICAvLyAgICAgdGhpcy5jYXN0aW5nX2Rpc3RhbmNlPTE5MiozK0dhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW5lbXlfYXR0X3ktdGhpcy5ub2RlLnlcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgdGhpcy5zZXRUb3VjaFJlY3QoKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgLy/lj5bmtojnm5HlkKzop6bmkbjkuovku7ZcclxuICAgICAgICBsZXQgdG91Y2hOb2RlID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCd0b3VjaE5vZGUnKTtcclxuICAgICAgICBpZiAodG91Y2hOb2RlKSB7XHJcbiAgICAgICAgICAgIC8vIHRvdWNoTm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsdGhpcy5vblRvdWNoU3RhcnQsdGhpcyk7XHJcbiAgICAgICAgICAgIC8vIHRvdWNoTm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfTU9WRSx0aGlzLm9uVG91Y2hNb3ZlLHRoaXMpO1xyXG4gICAgICAgICAgICAvLyB0b3VjaE5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCx0aGlzLm9uVG91Y2hFbmQsdGhpcyk7XHJcbiAgICAgICAgICAgIC8vIHRvdWNoTm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfQ0FOQ0VMLHRoaXMub25Ub3VjaENhbmNlbCx0aGlzKTtcclxuICAgICAgICAgICAgaW5zdGFuY2Uub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCB0aGlzLm9uVG91Y2hTdGFydEJ5Sm95LCB0aGlzKTtcclxuICAgICAgICAgICAgaW5zdGFuY2Uub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX01PVkUsIHRoaXMub25Ub3VjaE1vdmVCeUpveSwgdGhpcyk7XHJcbiAgICAgICAgICAgIGluc3RhbmNlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMub25Ub3VjaEVuZEJ5Sm95LCB0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hbGxfaGVyby5kZWxldGUodGhpcy5oZXJvX3R5cGUpXHJcbiAgICB9XHJcblxyXG4gICAgYWRkU2tpbGxUaXBUeXBlKCkge1xyXG4gICAgICAgIGxldCBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5wcmVmYWJfc2tpbGxfdGlwKTtcclxuICAgICAgICB0aGlzLnNraWxsX3RpcCA9IG5vZGUuZ2V0Q29tcG9uZW50KFNraWxsVGlwKTtcclxuICAgICAgICB0aGlzLnNraWxsX3RpcF90eXBlID0gdGhpcy5za2lsbF90aXAuZ2V0U2tpbGxUaXBUeXBlKCk7XHJcbiAgICAgICAgdGhpcy5za2lsbF90aXAubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMuc2tpbGxfdGlwX3R5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBTa2lsbFRpcFR5cGUuRnVsbDoge1xyXG4gICAgICAgICAgICAgICAgU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBTa2lsbFRpcFR5cGUuQ2lyY2xlOiB7XHJcbiAgICAgICAgICAgICAgICBTa2lsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFNraWxsVGlwVHlwZS5SZWN0OiB7XHJcbiAgICAgICAgICAgICAgICBTa2lsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFNraWxsVGlwVHlwZS5EaXI6IHtcclxuICAgICAgICAgICAgICAgIFNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNldFRvdWNoUmVjdCgpIHtcclxuICAgICAgICBsZXQgdG91Y2hOb2RlID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCd0b3VjaE5vZGUnKTtcclxuICAgICAgICB0aGlzLnRvdWNoX3JlY3QgPSBjYy5yZWN0KHRoaXMubm9kZS54ICsgdG91Y2hOb2RlLnggKiB0aGlzLnNldHVwX3NjYWxlIC0gKHRvdWNoTm9kZS53aWR0aCAqIHRoaXMuc2V0dXBfc2NhbGUgLyAyKSwgdGhpcy5ub2RlLnkgKyB0b3VjaE5vZGUueSAqIHRoaXMuc2V0dXBfc2NhbGUgLSAodG91Y2hOb2RlLmhlaWdodCAqIHRoaXMuc2V0dXBfc2NhbGUgLyAyKSwgdG91Y2hOb2RlLndpZHRoICogdGhpcy5zZXR1cF9zY2FsZSwgdG91Y2hOb2RlLmhlaWdodCAqIHRoaXMuc2V0dXBfc2NhbGUpO1xyXG4gICAgICAgIC8vIGxldCBnZz1jYy5maW5kKCdDYW52YXMvRmlnaHRpbmdfUm9vdCcpLmdldENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgLy8gZ2cucmVjdCh0aGlzLnRvdWNoX3JlY3QueCx0aGlzLnRvdWNoX3JlY3QueSx0aGlzLnRvdWNoX3JlY3Qud2lkdGgsdGhpcy50b3VjaF9yZWN0LmhlaWdodCk7XHJcbiAgICAgICAgLy8gZ2cuc3Ryb2tlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0U2tpbGxUaXBTaXplKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5za2lsbF90aXAubm9kZS53aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIHRoaXMuc2tpbGxfdGlwLm5vZGUuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIGdldFNraWxsVGlwU2l6ZSgpOiBjYy5TaXplIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5za2lsbF90aXAubm9kZS5nZXRDb250ZW50U2l6ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdG91Y2hMaXN0ZW4oKSB7XHJcbiAgICAgICAgLy/nm5HlkKzop6bmkbjkuovku7ZcclxuICAgICAgICBsZXQgdG91Y2hOb2RlID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCd0b3VjaE5vZGUnKTtcclxuICAgICAgICBpZiAodG91Y2hOb2RlKSB7XHJcbiAgICAgICAgICAgIC8vIHRvdWNoTm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCx0aGlzLm9uVG91Y2hTdGFydCx0aGlzKTtcclxuICAgICAgICAgICAgLy8gdG91Y2hOb2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX01PVkUsdGhpcy5vblRvdWNoTW92ZSx0aGlzKTtcclxuICAgICAgICAgICAgLy8gdG91Y2hOb2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCx0aGlzLm9uVG91Y2hFbmQsdGhpcyk7XHJcbiAgICAgICAgICAgIC8vIHRvdWNoTm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9DQU5DRUwsdGhpcy5vblRvdWNoQ2FuY2VsLHRoaXMpO1xyXG4gICAgICAgICAgICBpbnN0YW5jZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgdGhpcy5vblRvdWNoU3RhcnRCeUpveSwgdGhpcyk7XHJcbiAgICAgICAgICAgIGluc3RhbmNlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX01PVkUsIHRoaXMub25Ub3VjaE1vdmVCeUpveSwgdGhpcyk7XHJcbiAgICAgICAgICAgIGluc3RhbmNlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vblRvdWNoRW5kQnlKb3ksIHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRQb3MoKSB7XHJcbiAgICAgICAgbGV0IHh1YW55dW4gPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3h1YW55dW4nKTtcclxuICAgICAgICB0aGlzLnh1YW55dW5fcG9zID0geHVhbnl1bi5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgIHh1YW55dW4ucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgICAgIHRoaXMuYnVsbGV0X3BvcyA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgIGxldCBidWxsZXQxID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdidWxsZXQxJyk7XHJcbiAgICAgICAgbGV0IGJ1bGxldDIgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2J1bGxldDInKTtcclxuICAgICAgICB0aGlzLmJ1bGxldF9wb3MucHVzaChidWxsZXQyLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgIHRoaXMuYnVsbGV0X3Bvcy5wdXNoKGJ1bGxldDEuZ2V0UG9zaXRpb24oKSk7XHJcbiAgICAgICAgdGhpcy5idWxsZXRfcG9zLnB1c2goYnVsbGV0Mi5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICBidWxsZXQxLnJlbW92ZUZyb21QYXJlbnQoKTtcclxuICAgICAgICBidWxsZXQyLnJlbW92ZUZyb21QYXJlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkdhbWVXaW4oKSB7XHJcbiAgICAgICAgdGhpcy5za2lsbF9xdWV1ZSA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgIHRoaXMuc2V0SGVyb1N0YXRlKEhlcm9fU3RhdGUuaWRsZSwgR29uZ0ppX0ZhbmdYaWFuZy56aG9uZyk7XHJcbiAgICAgICAgdGhpcy5nb25namlfamlzaHUgPSAwO1xyXG4gICAgICAgIGlmICh0aGlzLndpbl9jYWxsYmFjaykge1xyXG4gICAgICAgICAgICB0aGlzLndpbl9jYWxsYmFjaygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgYWRkU2tpbGxMaXN0ZW4oY2FsbEJhY2s6IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5za2lsbF9jYWxsYmFjayA9IGNhbGxCYWNrO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBhZGRBdHRhY2tMaXN0ZW4oY2FsbEJhY2s6IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5hdHRhY2tfY2FsbGJhY2sgPSBjYWxsQmFjaztcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgYWRkSGl0TGlzdGVuKGNhbGxCYWNrOiBGdW5jdGlvbikge1xyXG4gICAgICAgIHRoaXMuaGl0X2NhbGxiYWNrID0gY2FsbEJhY2s7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGFkZFJlc2V0TGlzdGVuKGNhbGxCYWNrOiBGdW5jdGlvbikge1xyXG4gICAgICAgIHRoaXMucmVzZXRfY2FsbGJhY2sgPSBjYWxsQmFjaztcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgYWRkR2FtZVdpbkxpc3RlbihjYWxsQmFjazogRnVuY3Rpb24pIHtcclxuICAgICAgICB0aGlzLndpbl9jYWxsYmFjayA9IGNhbGxCYWNrO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBhZGRMb2FkZWRMaXN0ZW4oY2FsbEJhY2s6IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5sb2FkZWRfY2FsbGJhY2sgPSBjYWxsQmFjaztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGxvYWRNcFByb2dyZXNzKCkge1xyXG4gICAgICAgIC8vIGNjLnJlc291cmNlcy5sb2FkKCdoZXJvcy9za2lsbF9pY29uJyxjYy5QcmVmYWIsKGVycm9yOiBFcnJvciwgYXNzZXRzOmNjLlByZWZhYik9PntcclxuICAgICAgICAvLyAgICAgaWYoZXJyb3IpXHJcbiAgICAgICAgLy8gICAgIHtcclxuICAgICAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAvLyAgICAgICAgIHJldHVybjtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vICAgICBsZXQgbXBOb2RlPWNjLmluc3RhbnRpYXRlKGFzc2V0cyk7XHJcbiAgICAgICAgLy8gICAgIG1wTm9kZS5wYXJlbnQ9Y2MuZmluZCgnQ2FudmFzL0ZpZ2h0aW5nX1VpJyk7XHJcbiAgICAgICAgLy8gICAgIG1wTm9kZS5zZXRQb3NpdGlvbihjYy52Mih0aGlzLm5vZGUueCx0aGlzLm5vZGUueSsxNSkpO1xyXG4gICAgICAgIC8vICAgICB0aGlzLm1wX3Byb2dyZXNzPW1wTm9kZS5nZXRDb21wb25lbnQoTXBQcm9ncmVzcyk7XHJcbiAgICAgICAgLy8gICAgIHRoaXMubXBfcHJvZ3Jlc3MuaW5pdCh0aGlzLmhlcm9fdHlwZSk7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuY2hhbmdlQ0QodGhpcy5oZXJvX2RhdGEuZ2V0U2tpbGxDb2xkRG93bihTa2lsbFR5cGUuQWN0aXZlKS8zKTtcclxuICAgICAgICAvLyAgICAgdGhpcy5za2lsbF90b3RhbF90aW1lPXRoaXMuaGVyb19kYXRhLmdldFNraWxsQ29sZERvd24oU2tpbGxUeXBlLkFjdGl2ZSk7XHJcbiAgICAgICAgLy8gICAgIGlmKHRoaXMuZ2V0SGVyb1N0YXRlKCk9PUhlcm9fU3RhdGUuZXhpdCl7XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLm1wX3Byb2dyZXNzLmhpZGUoKTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBsb2FkWmhpU2hpUWkoemhpc2hpcWk6IHN0cmluZywgdHlwZTogU2tpbGxJbmRpY2F0b3JUeXBlKSB7XHJcbiAgICAgICAgdGhpcy56aGlzaGlxaV90eXBlID0gdHlwZTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIuWKoOi9vWhlcm9cIiArIHpoaXNoaXFpKTtcclxuXHJcbiAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQoJ2hlcm9zLycgKyB6aGlzaGlxaSwgY2MuUHJlZmFiLCAoZXJyb3I6IEVycm9yLCBhc3NldHM6IGNjLlByZWZhYikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZExvYWRCeUdhbWVFZmZlY3RJZChpZDogR2FtZUVmZmVjdElkLCBpbml0Q291bnQ6IG51bWJlcikge1xyXG4gICAgICAgIGlmIChHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRFZmZlY3RQb29sQnlJZChpZCwgaW5pdENvdW50LCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VyX2xvYWRfbnVtKys7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmN1cl9sb2FkX251bSA+PSB0aGlzLm5lZWRfbG9hZF9udW0pIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzX2xvYWRfb2sgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzX2xvYWRfb2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIEhlcm8uY3VyX2xvYWRlZF9udW0rKztcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5sb2FkZWRfY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkZWRfY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMubmVlZF9sb2FkX251bSsrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKirliqDovb3lrqDniakgKi9cclxuICAgIGxvYWRQZXQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaGVyb19kYXRhLnBldF9pZCA+IDApIHtcclxuICAgICAgICAgICAgbGV0IHR5cGUgPSBTcGlyaXRBdHRyaWJ1dGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3Bpcml0VHlwZSh0aGlzLmhlcm9fZGF0YS5wZXRfaWQpO1xyXG4gICAgICAgICAgICB0aGlzLm5lZWRfbG9hZF9udW0rKztcclxuICAgICAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQoJ3BldC9wZXQnICsgdHlwZSwgY2MuUHJlZmFiLCAoZXJyb3I6IEVycm9yLCBhc3NldHM6IGNjLlByZWZhYikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCBub2RlID0gY2MuaW5zdGFudGlhdGUoYXNzZXRzKTtcclxuICAgICAgICAgICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9QZXRfUm9vdCcpLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGV0ID0gbm9kZS5hZGRDb21wb25lbnQoSWNlUGV0KTtcclxuICAgICAgICAgICAgICAgICAgICB9OyBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wZXQgPSBub2RlLmFkZENvbXBvbmVudChGaXJlUGV0KTtcclxuICAgICAgICAgICAgICAgICAgICB9OyBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wZXQgPSBub2RlLmFkZENvbXBvbmVudChXaW5kUGV0KTtcclxuICAgICAgICAgICAgICAgICAgICB9OyBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wZXQgPSBub2RlLmFkZENvbXBvbmVudChSYXlQZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH07IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5wZXQuaW5pdCh0aGlzLmhlcm9fZGF0YS5wZXRfaWQsIHRoaXMuaGVyb190eXBlLCBjYy52Mih0aGlzLm5vZGUueCAtIDY0LCB0aGlzLm5vZGUueSArIDY0KSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBldC5zZXRIZXJvRGF0YSh0aGlzLmhlcm9fZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cl9sb2FkX251bSsrO1xyXG4gICAgICAgICAgICAgICAgbm9kZS56SW5kZXggPSAxMDAwIC0gbm9kZS55O1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VyX2xvYWRfbnVtID49IHRoaXMubmVlZF9sb2FkX251bSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNfbG9hZF9vayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgSGVyby5jdXJfbG9hZGVkX251bSsrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoq6ZqQ6JeP6Iux6ZuE77yM5q2k5pe26Iux6ZuE5LiN6IO95pS75Ye75oiW6ICF6YeK5pS+5oqA6IO9ICovXHJcbiAgICBoaWRlSGVybygpIHtcclxuICAgICAgICB0aGlzLmhlcm9fc3RhdGUgPSBIZXJvX1N0YXRlLmV4aXQ7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHkgPSAwO1xyXG4gICAgICAgIGlmICh0aGlzLm5vZGVfc2hhZG93KSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZV9zaGFkb3cub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLm1wX3Byb2dyZXNzKSB7XHJcbiAgICAgICAgICAgIHRoaXMubXBfcHJvZ3Jlc3MuaGlkZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzaG93SGVybygpIHtcclxuICAgICAgICB0aGlzLnNldEhlcm9TdGF0ZShIZXJvX1N0YXRlLmlkbGUsIEdvbmdKaV9GYW5nWGlhbmcuemhvbmcpO1xyXG4gICAgICAgIHRoaXMubm9kZS5vcGFjaXR5ID0gMjU1O1xyXG4gICAgICAgIHRoaXMubm9kZV9zaGFkb3cub3BhY2l0eSA9IDI1NTtcclxuICAgICAgICB0aGlzLm1wX3Byb2dyZXNzLnNob3coKTtcclxuICAgIH1cclxuICAgIC8vIHBvc1g6IG51bWJlciA9IDA7Ly/liJ3lp4vljJbml7blgJnnmoTkvY3nva5cclxuICAgIC8vIHRhcmdldFg6IG51bWJlciA9IDA7XHJcbiAgICAvLyBlYXNpbmc6IG51bWJlciA9IDAuMjtcclxuICAgIC8vIG9uVG91Y2hFbmRCeUpveShldmVudDogY2MuRXZlbnQuRXZlbnRUb3VjaCwgZGF0YSkge1xyXG4gICAgLy8gICAgIHRoaXMudGFyZ2V0WCA9IChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFuaVR5cGUgLSAyKSAqIDE1MCArIHRoaXMucG9zWDtcclxuICAgIC8vIH1cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLeOAkOearuiCpOOAkS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIHByb3RlY3RlZCBzZXRTa2luKCkge1xyXG4gICAgICAgIC8vbGV0IGhlcm9RdWFsaXR5PUhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb1F1YWxpdHkodGhpcy5oZXJvX3R5cGUpO1xyXG4gICAgICAgIC8vbGV0IHRpZXI9SGVyb1F1YWxpdHlNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VGllcihoZXJvUXVhbGl0eSk7XHJcbiAgICAgICAgLy90aGlzLnNwaW5lLnNldFNraW4oJ3N0YWdlJysoSGVyb01hbmFnZXIuZ2V0U2tpbkluZGV4KHRpZXIpKSk7XHJcbiAgICB9XHJcbiAgICAvKiotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3mk43kvZznm7jlhbMtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t6Kem5pG456e75Yqo5LqL5Lu2LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgLy8gbGVhdGVyTnVtOiBudW1iZXIgPSAwOy8v5bu26L+f5pWw5o2u5pKt5pS+5Yqo55S7XHJcbiAgICAvLyBsZWF0ZXJTcGVlZDogbnVtYmVyID0gNTtcclxuXHJcbiAgICAvLyBuZXdQb3M6IGNjLlZlYzI7XHJcbiAgICAvLyBwb3NZVGVtcDogbnVtYmVyO1xyXG5cclxuICAgIHNwZWVkVHlwZTogU3BlZWRUeXBlID0gU3BlZWRUeXBlLlNUT1A7XHJcbiAgICBtb3ZlRGlyID0gY2MudjIoMCwgMSk7XHJcbiAgICAvLyAvL+aKhOWIq+S6uueahO+8jOacrOadpeacieS4pOenjemAn+W6pu+8jOeOsOWcqOWFiOeUqOS4gOS4quaVsOaNrlxyXG4gICAgbm9ybWFsU3BlZWQgPSA2MDA7XHJcbiAgICBmYXN0U3BlZWQgPSA2MDA7XHJcblxyXG4gICAgc3RvcFNwZWVkID0gMDtcclxuXHJcbiAgICBtb3ZlU3BlZWQgPSAwO1xyXG5cclxuXHJcbiAgICAvKipcclxuICAqIOenu+WKqFxyXG4gICovXHJcbiAgICBtb3ZlKCkge1xyXG4gICAgICAgIC8vIHRoaXMubm9kZS5hbmdsZSA9XHJcbiAgICAgICAgLy8gY2MubWlzYy5yYWRpYW5zVG9EZWdyZWVzKE1hdGguYXRhbjIodGhpcy5tb3ZlRGlyLnksIHRoaXMubW92ZURpci54KSkgLSA5MDtcclxuXHJcbiAgICAgICAgY29uc3Qgb2xkUG9zID0gY2MudjIoKTtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0UG9zaXRpb24ob2xkUG9zKTtcclxuICAgICAgICBjb25zdCBuZXdQb3MgPSBvbGRQb3MuYWRkKHRoaXMubW92ZURpci5tdWwodGhpcy5tb3ZlU3BlZWQgLyAxMjApKTtcclxuICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24obmV3UG9zKTtcclxuICAgICAgXHJcbiAgICB9XHJcbiAgICBvblRvdWNoU3RhcnRCeUpveSgpIHsgfVxyXG5cclxuICAgIG9uVG91Y2hNb3ZlQnlKb3koZXZlbnQ6IGNjLkV2ZW50LkV2ZW50VG91Y2gsIGRhdGEpIHtcclxuICAgICAgICB0aGlzLnNwZWVkVHlwZSA9IGRhdGEuc3BlZWRUeXBlO1xyXG4gICAgICAgIHRoaXMubW92ZURpciA9IGRhdGEubW92ZURpc3RhbmNlO1xyXG4gICAgfVxyXG5cclxuICAgIG9uVG91Y2hFbmRCeUpveShldmVudDogY2MuRXZlbnQuRXZlbnRUb3VjaCwgZGF0YSkge1xyXG4gICAgICAgIHRoaXMuc3BlZWRUeXBlID0gZGF0YS5zcGVlZFR5cGU7XHJcbiAgICB9XHJcbiAgICAvKiotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3mk43kvZznm7jlhbMtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t6Kem5pG45LqL5Lu2LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy/ml6fniYjlip/og71cclxuICAgIG9uVG91Y2hTdGFydChlOiBjYy5FdmVudC5FdmVudFRvdWNoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNIYXZlRGVCdWZmKEJ1ZmZJZC5Nb25zdGVyX1h1YW5ZdW4pICYmIHRoaXMuaGVyb190eXBlICE9IEhlcm9fVHlwZS5aaGVuRGUpIHtcclxuICAgICAgICAgICAgdGhpcy5pc19jYW5fdG91Y2ggPSBmYWxzZTtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCgxNzAwMDIpLCAxKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5za2lsbF9jZF90aW1lID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmlzX2Nhbl90b3VjaCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jbGlja19yZW1haW4gPiAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCgxNzAwMDEpLCAxKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zdGF0ZSAhPSBHYW1lU3RhdGUuR2FtZV9QbGF5aW5nKVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc19jYW5fdG91Y2ggPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuaXNfYXV0b19yZWxlYXNlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmNsaWNrX3JlbWFpbiA9IDE7XHJcbiAgICAgICAgU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkucmVsZWFzZVNraWxsUmVzdWx0KGZhbHNlKTtcclxuICAgICAgICBsZXQgcG9zID0gU2t5TWFuYWdlci5nZXRJbnN0YW5jZSgpLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIoZS5nZXRMb2NhdGlvbigpKTtcclxuICAgICAgICAvL+WmguaenOWPr+S7pemHiuaUvu+8jOaYvuekuuaMh+ekuuWZqFxyXG4gICAgICAgIHN3aXRjaCAodGhpcy5za2lsbF90aXBfdHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIFNraWxsVGlwVHlwZS5GdWxsOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNraWxsX3RpcC5ub2RlLnNldFBvc2l0aW9uKGNjLnYyKDAsIC1jYy53aW5TaXplLmhlaWdodCAvIDIpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxfdGlwLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNraWxsX3RpcC5zZXRJc0NhblJlbGVhc2UoZmFsc2UpO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFNraWxsVGlwVHlwZS5DaXJjbGU6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxfdGlwLm5vZGUuc2V0UG9zaXRpb24ocG9zKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxfdGlwLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxfdGlwLnNldElzQ2FuUmVsZWFzZShmYWxzZSk7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgU2tpbGxUaXBUeXBlLlJlY3Q6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxfdGlwLm5vZGUuc2V0UG9zaXRpb24ocG9zKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxfdGlwLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxfdGlwLnNldElzQ2FuUmVsZWFzZShmYWxzZSk7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgU2tpbGxUaXBUeXBlLkRpcjoge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5za2lsbF90aXAubm9kZS5zZXRQb3NpdGlvbih0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNraWxsX3RpcC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNraWxsX3RpcC5zZXRJc0NhblJlbGVhc2UoZmFsc2UpO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+aYvuekuuiMg+WbtOaMh+ekuuWZqFxyXG4gICAgICAgIFNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dTa2lsbFJhbmdlKHRoaXMubm9kZS55LCB0aGlzLmNhc3RpbmdfZGlzdGFuY2UpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uVG91Y2hNb3ZlKGU6IGNjLkV2ZW50LkV2ZW50VG91Y2gpIHtcclxuICAgICAgICBpZiAodGhpcy5pc19jYW5fdG91Y2ggPT0gZmFsc2UgfHwgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zdGF0ZSAhPSBHYW1lU3RhdGUuR2FtZV9QbGF5aW5nKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgbGV0IHBvcyA9IFNreU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKGUuZ2V0TG9jYXRpb24oKSk7XHJcbiAgICAgICAgaWYgKCF0aGlzLnRvdWNoX3JlY3QuY29udGFpbnMocG9zKSkge1xyXG4gICAgICAgICAgICB0aGlzLmlzX2F1dG9fcmVsZWFzZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzd2l0Y2ggKHRoaXMuc2tpbGxfdGlwX3R5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBTa2lsbFRpcFR5cGUuRnVsbDoge1xyXG5cclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBTa2lsbFRpcFR5cGUuQ2lyY2xlOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNraWxsX3RpcC5ub2RlLnNldFBvc2l0aW9uKHBvcyk7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgU2tpbGxUaXBUeXBlLlJlY3Q6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxfdGlwLm5vZGUuc2V0UG9zaXRpb24ocG9zKTtcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBTa2lsbFRpcFR5cGUuRGlyOiB7XHJcblxyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHBvcy55ID4gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5lbmVteV9hdHRfeSkge1xyXG4gICAgICAgICAgICBsZXQgZGlzdGFuY2UgPSBwb3MueSAtIHRoaXMubm9kZS55O1xyXG4gICAgICAgICAgICBpZiAoZGlzdGFuY2UgPD0gdGhpcy5jYXN0aW5nX2Rpc3RhbmNlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNraWxsX3RpcC5zZXRJc0NhblJlbGVhc2UodHJ1ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNraWxsX3RpcC5zZXRJc0NhblJlbGVhc2UoZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5za2lsbF90aXAuc2V0SXNDYW5SZWxlYXNlKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25Ub3VjaEVuZChlOiBjYy5FdmVudC5FdmVudFRvdWNoKSB7XHJcbiAgICAgICAgU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkucmVsZWFzZVNraWxsUmVzdWx0KHRydWUpO1xyXG4gICAgICAgIFNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmhpZGVTa2lsbFJhbmdlKCk7XHJcbiAgICAgICAgdGhpcy5za2lsbF90aXAubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBpZiAodGhpcy5pc19jYW5fdG91Y2ggPT0gZmFsc2UgfHwgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zdGF0ZSAhPSBHYW1lU3RhdGUuR2FtZV9QbGF5aW5nKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgbGV0IHBvcyA9IFNreU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKGUuZ2V0TG9jYXRpb24oKSk7XHJcbiAgICAgICAgLy/liKTmlq3lnZDmoIdcclxuICAgICAgICBpZiAocG9zLnkgPiBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmVuZW15X2F0dF95KSB7XHJcbiAgICAgICAgICAgIGxldCBkaXN0YW5jZSA9IHBvcy55IC0gdGhpcy5ub2RlLnk7XHJcbiAgICAgICAgICAgIGlmIChkaXN0YW5jZSA8PSB0aGlzLmNhc3RpbmdfZGlzdGFuY2UpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVsZWFzZVNraWxsKHBvcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc19hdXRvX3JlbGVhc2UpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXJ0QXV0b1JlbGVhc2UoKSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTQwMDIzKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25Ub3VjaENhbmNlbChlOiBjYy5FdmVudC5FdmVudFRvdWNoKSB7XHJcbiAgICAgICAgU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkucmVsZWFzZVNraWxsUmVzdWx0KHRydWUpO1xyXG4gICAgICAgIFNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmhpZGVTa2lsbFJhbmdlKCk7XHJcbiAgICAgICAgdGhpcy5za2lsbF90aXAubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBpZiAodGhpcy5pc19jYW5fdG91Y2ggPT0gZmFsc2UgfHwgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zdGF0ZSAhPSBHYW1lU3RhdGUuR2FtZV9QbGF5aW5nKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgbGV0IHBvcyA9IFNreU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKGUuZ2V0TG9jYXRpb24oKSk7XHJcbiAgICAgICAgaWYgKHBvcy55ID4gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5lbmVteV9hdHRfeSkge1xyXG4gICAgICAgICAgICBsZXQgZGlzdGFuY2UgPSBwb3MueSAtIHRoaXMubm9kZS55O1xyXG4gICAgICAgICAgICBpZiAoZGlzdGFuY2UgPD0gdGhpcy5jYXN0aW5nX2Rpc3RhbmNlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbGVhc2VTa2lsbChwb3MpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNfYXV0b19yZWxlYXNlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0QXV0b1JlbGVhc2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGFydEF1dG9SZWxlYXNlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIC8v5om+5oCq77yM5om+5LiN5Yiw5bCx5LiN5pS+XHJcbiAgICAgICAgbGV0IGVuZW15cyA9IE1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TW9uc3RlcnNGb3JOZWFyZXN0QnlTa2lsbCgxLCB0aGlzLm5vZGUueSwgdGhpcy5jYXN0aW5nX2Rpc3RhbmNlKTtcclxuICAgICAgICBpZiAoZW5lbXlzKSB7XHJcbiAgICAgICAgICAgIC8v5pyA5YmN55qE5pWM5Lq6XHJcbiAgICAgICAgICAgIGxldCBlbmVteVBvcyA9IGVuZW15c1swXS5nZXRDb21wb25lbnQoTW9uc3RlcikuZ2V0Q2VudGVyUG9zKCk7XHJcbiAgICAgICAgICAgIHRoaXMucmVsZWFzZVNraWxsKGVuZW15UG9zKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKirop6bmkbjnmoTkvY3nva4gKi9cclxuICAgIHJlbGVhc2VTa2lsbCh0b3VjaFBvczogY2MuVmVjMikge1xyXG4gICAgICAgIGlmIChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX3N0YXRlICE9IEdhbWVTdGF0ZS5HYW1lX1BsYXlpbmcpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB0aGlzLnVzZV9za2lsbF9udW0rKztcclxuICAgICAgICAvL3RoaXMubXBfcHJvZ3Jlc3Muc2hvd0xpZ2h0KCk7XHJcbiAgICAgICAgaWYgKHRoaXMuc2tpbGxfY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgdGhpcy5za2lsbF9jYWxsYmFjayh0b3VjaFBvcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucmVzZXRDRCgpO1xyXG4gICAgICAgIFRhc2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW1pdFRhc2soVGFza0l0ZW0u6YeK5pS+WOasoeS6uueJqeaKgOiDvSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGdldFNraWxsUmVsZWFzZUlkKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaGVyb190eXBlICogMTAwMDAgKyB0aGlzLnVzZV9za2lsbF9udW07XHJcbiAgICB9XHJcblxyXG4gICAgLyoq6I635b6X5a2Q5by555Sf5oiQ55qE5L2N572uICovXHJcbiAgICBnZXRDcmVhdGVCdWxsZXRQb3MoKTogY2MuVmVjMiB7XHJcbiAgICAgICAgbGV0IHBvcyA9IHRoaXMuYnVsbGV0X3Bvc1t0aGlzLmN1cl9mYW5neGlhbmddO1xyXG4gICAgICAgIHJldHVybiBjYy52Mih0aGlzLm5vZGUueCArIHBvcy54ICogdGhpcy5ub2RlLnNjYWxlWCwgdGhpcy5ub2RlLnkgKyBwb3MueSAqIHRoaXMubm9kZS5zY2FsZVkpO1xyXG4gICAgfVxyXG4gICAgLyoq6I635b6X5a2Q5by555u45a+56Iux6ZuE55qE5L2N572uICovXHJcbiAgICBnZXRIZXJvQnVsbGV0UG9zKCk6IGNjLlZlYzIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmJ1bGxldF9wb3NbdGhpcy5jdXJfZmFuZ3hpYW5nXTtcclxuICAgIH1cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3ml6DlsL1idWZmLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgLyoqXHJcbiAgICAgKiDmt7vliqDml6DlsL1idWZmXHJcbiAgICAgKiBAcGFyYW0gZW5kbGVzc0J1ZmYgRW5kbGVzc0J1ZmbnmoTlrp7kvotcclxuICAgICAqL1xyXG4gICAgLy8gIEFkbWluaXN0cmF0b3I6XHJcbiAgICAvLyAgMS7mlLvlh7vlipsreCVcclxuICAgIC8vICAyLuaUu+mAnyt4JVxyXG4gICAgLy8gIDMu5pq05Ye75YC8K3hcclxuICAgIC8vICA0LuaatOWHu+WinuW5hSt4JVxyXG4gICAgLy8gIDUu6Ziy5b6h5YqbK3glXHJcbiAgICAvLyAgNi7mnIDlpKfnlJ/lkb3lgLwreCUgXHJcbiAgICAvLyAgNy7mr4/np5Llm57lpI3mnIDlpKfnlJ/lkb3lgLx4JVxyXG4gICAgLy8gIDgu56uL5Y2z5Zue5aSN5pyA5aSn55Sf5ZG95YC8eCXvvIjms6jvvJror6VidWZm55Sf5pWI5ZCO56uL5Y2z5raI5aSx77yJXHJcbiAgICAvLyAgOS7ov57nu63mlLvlh7sg5qaC546HeCVcclxuICAgIC8vICAxMC7kuLvliqjmioDog73lhrfljbTml7bpl7Tlh4/lsJF4JVxyXG4gICAgLy8gIDExLuacgOe7iOS8pOWus+WKoOaIkHglXHJcbiAgICBhZGRFbmRsZXNzQnVmZihlbmRsZXNzQnVmZjogRW5kbGVzc0J1ZmYpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNIYXZlRW5kbGVzc0lkKGVuZGxlc3NCdWZmLmlkKSkge1xyXG4gICAgICAgICAgICB0aGlzLm1hcF9lbmRsZXNzX2J1ZmYuc2V0KGVuZGxlc3NCdWZmLmlkLCBlbmRsZXNzQnVmZik7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoZW5kbGVzc0J1ZmYudHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBFbmRsZXNzQnVmZlR5cGUuQXR0YWNrOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZXJvX2RhdGEudG90YWxfYXR0YWNrICs9IHRoaXMuaGVyb19kYXRhLmZpeGVkX2F0dGNrICogZW5kbGVzc0J1ZmYudmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBFbmRsZXNzQnVmZlR5cGUuQXR0YWNrU3BlZWQ6IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZUF0dGFja1NwZWVkKGVuZGxlc3NCdWZmLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEVuZGxlc3NCdWZmVHlwZS5Dcml0UmF0ZToge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVyb19kYXRhLkNyaXRpY2FsICs9IGVuZGxlc3NCdWZmLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgRW5kbGVzc0J1ZmZUeXBlLkNyaXREYW1hZ2U6IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlcm9fZGF0YS5FeHRyYUNyaXRpY2FsICs9IGVuZGxlc3NCdWZmLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgRW5kbGVzc0J1ZmZUeXBlLkRlZmVuc2U6IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlcm9fZGF0YS50b3RhbF9kZWZlbnNlICs9IHRoaXMuaGVyb19kYXRhLmZpeF9kZWZlbnNlICogZW5kbGVzc0J1ZmYudmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBFbmRsZXNzQnVmZlR5cGUuSGVhbHRoTWF4OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZXJvX2RhdGEudG90YWxfaHAgKz0gdGhpcy5oZXJvX2RhdGEuZml4ZWRfaHAgKiBlbmRsZXNzQnVmZi52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIuWfjuWimeWKoOihgDpcIix0aGlzLmhlcm9fZGF0YS50b3RhbF9ocCx0aGlzLmhlcm9fZGF0YS5maXhlZF9ocCxlbmRsZXNzQnVmZi52YWx1ZSlcclxuICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlZnJlc2hNYWluV2FsbERhdGEoKVxyXG4gICAgICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgRW5kbGVzc0J1ZmZUeXBlLkhlYWx0aFNlYzoge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBidWZmRGF0YSA9IG5ldyBCdWZmRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLmJ1ZmZfaWQgPSBCdWZmSWQuV2FsbF9FbmRsZXNzX0FkZF9ocCArIHRoaXMuaGVyb190eXBlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLmJ1ZmZfdHlwZSA9IEJ1ZmZUeXBlLkdhaW47XHJcbiAgICAgICAgICAgICAgICAgICAgYnVmZkRhdGEuYnVmZl92YWx1ZSA9IFtlbmRsZXNzQnVmZi52YWx1ZSAqIFdhbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWFpbldhbGwoKS5nZXRNYXhIcCgpXTtcclxuICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5yZW1haW5fdGltZSA9IDY2NjY2NjY2O1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGJ1ZmZEYXRhLmdhbWVfZWZmZWN0X2lkPUdhbWVFZmZlY3RJZC5jaGFuZ19tYW9fc2hvdV9za2lsbF9hY3RpdmVfMTtcclxuICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5yZWNvdmVyeV9qaWFuZ2VfdGltZSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgV2FsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYWluV2FsbCgpLmFkZEJ1ZmYoYnVmZkRhdGEpXHJcbiAgICAgICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBFbmRsZXNzQnVmZlR5cGUuSGVhbHRoVGVhbUFkZDoge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGxldCBocD1XYWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1haW5XYWxsKCkuZ2V0Q3VySHAoKSsoZW5kbGVzc0J1ZmYudmFsdWUqV2FsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYWluV2FsbCgpLmdldE1heEhwKCkpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gV2FsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYWluV2FsbCgpLmNoYW5nZUhwKGhwKVxyXG4gICAgICAgICAgICAgICAgICAgIC8v5Y+K5pe255SoXHJcbiAgICAgICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBFbmRsZXNzQnVmZlR5cGUuRG91YmxlQXR0YWNrOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/ov57nu63mlLvlh7ss5LiN55So5YqgYnVmZlxyXG4gICAgICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgRW5kbGVzc0J1ZmZUeXBlLkFjdGl2ZVNraWxsQ2Q6IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNraWxsX3RvdGFsX3RpbWUgLT0gdGhpcy5oZXJvX2RhdGEuZ2V0U2tpbGxDb2xkRG93bihTa2lsbFR5cGUuQWN0aXZlKSAqIGVuZGxlc3NCdWZmLnZhbHVlXHJcbiAgICAgICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBFbmRsZXNzQnVmZlR5cGUuQWRkRGFtYWdlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZXJvX2RhdGEuYWxsX2luY3JlYXNlX2RhbWFnZSArPSBlbmRsZXNzQnVmZi52YWx1ZTtcclxuICAgICAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOWIoOmZpOaXoOWwvWJ1ZmZcclxuICAgICAqIEBwYXJhbSBpZCDml6DlsL1idWZmLWlkXHJcbiAgICAgKi9cclxuICAgIHJlbW92ZUVuZGxlc3NCdWZmKGlkOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNIYXZlRW5kbGVzc0lkKGlkKSkge1xyXG4gICAgICAgICAgICBsZXQgZW5kbGVzc0J1ZmYgPSB0aGlzLm1hcF9lbmRsZXNzX2J1ZmYuZ2V0KGlkKTtcclxuICAgICAgICAgICAgdGhpcy5tYXBfZW5kbGVzc19idWZmLmRlbGV0ZShpZCk7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoZW5kbGVzc0J1ZmYudHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBFbmRsZXNzQnVmZlR5cGUuQXR0YWNrOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZXJvX2RhdGEudG90YWxfYXR0YWNrIC09IHRoaXMuaGVyb19kYXRhLmZpeGVkX2F0dGNrICogZW5kbGVzc0J1ZmYudmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBFbmRsZXNzQnVmZlR5cGUuQXR0YWNrU3BlZWQ6IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZUF0dGFja1NwZWVkKC1lbmRsZXNzQnVmZi52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBFbmRsZXNzQnVmZlR5cGUuQ3JpdFJhdGU6IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlcm9fZGF0YS5Dcml0aWNhbCAtPSBlbmRsZXNzQnVmZi52YWx1ZTtcclxuICAgICAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEVuZGxlc3NCdWZmVHlwZS5Dcml0RGFtYWdlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZXJvX2RhdGEuRXh0cmFDcml0aWNhbCAtPSBlbmRsZXNzQnVmZi52YWx1ZTtcclxuICAgICAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEVuZGxlc3NCdWZmVHlwZS5EZWZlbnNlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZXJvX2RhdGEudG90YWxfZGVmZW5zZSAtPSB0aGlzLmhlcm9fZGF0YS5maXhfZGVmZW5zZSAqIGVuZGxlc3NCdWZmLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgRW5kbGVzc0J1ZmZUeXBlLkhlYWx0aE1heDoge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVyb19kYXRhLnRvdGFsX2hwIC09IHRoaXMuaGVyb19kYXRhLmZpeGVkX2hwICogZW5kbGVzc0J1ZmYudmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBFbmRsZXNzQnVmZlR5cGUuSGVhbHRoU2VjOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgV2FsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYWluV2FsbCgpLnN1YkJ1ZmYoQnVmZklkLldhbGxfRW5kbGVzc19BZGRfaHAgKyB0aGlzLmhlcm9fdHlwZSlcclxuICAgICAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEVuZGxlc3NCdWZmVHlwZS5IZWFsdGhUZWFtQWRkOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgRW5kbGVzc0J1ZmZUeXBlLkRvdWJsZUF0dGFjazoge1xyXG5cclxuICAgICAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEVuZGxlc3NCdWZmVHlwZS5BY3RpdmVTa2lsbENkOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5za2lsbF90b3RhbF90aW1lICs9IHRoaXMuaGVyb19kYXRhLmdldFNraWxsQ29sZERvd24oU2tpbGxUeXBlLkFjdGl2ZSkgKiBlbmRsZXNzQnVmZi52YWx1ZVxyXG4gICAgICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgRW5kbGVzc0J1ZmZUeXBlLkFkZERhbWFnZToge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVyb19kYXRhLmFsbF9pbmNyZWFzZV9kYW1hZ2UgLT0gZW5kbGVzc0J1ZmYudmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoq5piv5ZCm5oul5pyJ5LiA5Liq5peg5bC9YnVmZiBpZCAqL1xyXG4gICAgaXNIYXZlRW5kbGVzc0lkKGlkOiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIisrKysrKysrXCIsaWQsdGhpcy5tYXBfZW5kbGVzc19idWZmKVxyXG4gICAgICAgIHJldHVybiB0aGlzLm1hcF9lbmRsZXNzX2J1ZmYuaGFzKGlkKTtcclxuICAgIH1cclxuICAgIC8qKuaYr+WQpuaLpeacieS4gOS4quaXoOWwvWJ1ZmYg57G75Z6LICovXHJcbiAgICBnZXRFbmRsZXNzQnlUeXBlKHR5cGU6IG51bWJlcik6IEVuZGxlc3NCdWZmIHtcclxuICAgICAgICBsZXQgYnVmZjogRW5kbGVzc0J1ZmYgPSBudWxsO1xyXG4gICAgICAgIHRoaXMubWFwX2VuZGxlc3NfYnVmZi5mb3JFYWNoKCh2LCBrKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh2LnR5cGUgPT0gdHlwZSkge1xyXG4gICAgICAgICAgICAgICAgYnVmZiA9IHY7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gYnVmZjtcclxuICAgIH1cclxuICAgIC8qKuiOt+W+l+S4gOS4quaXoOWwvWJ1ZmYgKi9cclxuICAgIGdldEVuZGxlc3NCdWZmKGlkOiBudW1iZXIpOiBFbmRsZXNzQnVmZiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwX2VuZGxlc3NfYnVmZi5nZXQoaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUJVRkYtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIGFkZEJ1ZmYoYnVmZkRhdGE6IEJ1ZmZEYXRhKTogQnVmZlRpbWVyIHtcclxuICAgICAgICBsZXQgYnVmZklkID0gYnVmZkRhdGEuYnVmZl9pZDtcclxuICAgICAgICBpZiAoIXRoaXMuaXNIYXZlQnVmZihidWZmSWQpKSB7XHJcbiAgICAgICAgICAgIC8v5re75YqgYnVmZuiKgueCueWSjOeJueaViCAgICAgICBcclxuICAgICAgICAgICAgbGV0IG5vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgICAgICAgICBpZiAoYnVmZkRhdGEuZ2FtZV9lZmZlY3RfaWQgPT0gR2FtZUVmZmVjdElkLk51bGwpIHtcclxuICAgICAgICAgICAgICAgIG5vZGUgPSBuZXcgY2MuTm9kZShidWZmRGF0YS5nYW1lX2VmZmVjdF9pZC50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG5vZGUgPSBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0Rm9yUGFyZW50KGJ1ZmZEYXRhLmdhbWVfZWZmZWN0X2lkLCB0aGlzLnh1YW55dW5fcG9zLCB0aGlzLm5vZGUpO1xyXG4gICAgICAgICAgICAgICAgLy9ub2RlLnNjYWxlPXRoaXMubm9kZS53aWR0aC8yMDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy/mt7vliqBidWZmXHJcbiAgICAgICAgICAgIGxldCBidWZmOiBCdWZmVGltZXIgPSBub2RlLmdldENvbXBvbmVudChCdWZmVGltZXIpO1xyXG4gICAgICAgICAgICBpZiAoIWJ1ZmYpIHtcclxuICAgICAgICAgICAgICAgIGJ1ZmYgPSBub2RlLmFkZENvbXBvbmVudChCdWZmVGltZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJ1ZmYuaW5pdChidWZmRGF0YSk7XHJcbiAgICAgICAgICAgIC8vYnVmZumUgOavgeaXtuWkhOeQhlxyXG4gICAgICAgICAgICBidWZmLmFkZERlc3Ryb3lMaXN0ZW4odGhpcy5vbkJ1ZmZEZXN0b3J5LmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICAvL2J1Zmbmsrvnlpfop6blj5Hml7blpITnkIZcclxuICAgICAgICAgICAgaWYgKGJ1ZmZEYXRhLnJlY292ZXJ5X2ppYW5nZV90aW1lID4gMCkge1xyXG4gICAgICAgICAgICAgICAgYnVmZi5hZGRSZWNvdmVyeUxpc3Rlbih7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9SZWNvdmVyeTogKG51bTogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFdhbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWFpbldhbGwoKS5jaGFuZ2VIcChudW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sIGJ1ZmYuZ2V0Rmlyc3RCdWZmVmFsdWUoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5oZXJvX2J1ZmYuc2V0KGJ1ZmZEYXRhLmJ1ZmZfaWQsIGJ1ZmYpO1xyXG4gICAgICAgICAgICBub2RlLnNjYWxlID0gMSAvIHRoaXMuc2V0dXBfc2NhbGU7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoYnVmZklkKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJ1ZmZJZC5QZXQzX0ppYVN1OlxyXG4gICAgICAgICAgICAgICAgY2FzZSBCdWZmSWQuSGVyb19NZWlNb19Hb25nU3U6XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJ1ZmZJZC5IZXJvX1poZW5EZV9Hb25nc3U6XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJ1ZmZJZC5IZXJvX0t1YW5nWmhhblNoaV9EYVpoYW86XHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZUF0dGFja1NwZWVkKGJ1ZmZEYXRhLmJ1ZmZfdmFsdWVbMF0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJ1ZmZJZC5IZXJvX0NoYW5nTWFvU2hvd19Hb25nU3U6IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZUF0dGFja1NwZWVkKGJ1ZmZEYXRhLmJ1ZmZfdmFsdWVbMF0pO1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUuc2V0UG9zaXRpb24oY2MudjIoMCwgMCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5paw5aKe5LiA5Liq6IOM5ZCO54m55pWIXHJcbiAgICAgICAgICAgICAgICAgICAgYnVmZi5hZGRUZVhpYW8oR2FtZUVmZmVjdElkLmNoYW5nX21hb19zaG91X3NraWxsX2FjdGl2ZV8yLCB0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKSwgY2MuZmluZCgnQ2FudmFzL0hlcm9fU2hhZG93X1Jvb3QnKSlcclxuICAgICAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJ1ZmZJZC5IZXJvX1poZW5EZV9CYW9KaU1pbmdaaG9uZ0x2OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZXJvX2RhdGEuY3JpdF9leCArPSBidWZmRGF0YS5idWZmX3ZhbHVlWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVyb19kYXRhLmhpdF9leCArPSBidWZmRGF0YS5idWZmX3ZhbHVlWzBdO1xyXG4gICAgICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmFkZEJ1ZmZTdGF0ZShidWZmSWQsIGJ1ZmZEYXRhLnJlbWFpbl90aW1lKTtcclxuICAgICAgICAgICAgcmV0dXJuIGJ1ZmY7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IGJ1ZmYgPSB0aGlzLmhlcm9fYnVmZi5nZXQoYnVmZklkKTtcclxuICAgICAgICAgICAgYnVmZi5yZWZyZXNoQnVmZihidWZmRGF0YSk7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkQnVmZlN0YXRlKGJ1ZmZJZCwgYnVmZkRhdGEucmVtYWluX3RpbWUpO1xyXG4gICAgICAgICAgICByZXR1cm4gYnVmZjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgc3ViQnVmZihidWZmSWQ6IEJ1ZmZJZCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCBidWZmID0gdGhpcy5oZXJvX2J1ZmYuZ2V0KGJ1ZmZJZCk7XHJcbiAgICAgICAgaWYgKGJ1ZmYpIHtcclxuICAgICAgICAgICAgYnVmZi5kZXN0cm95U2VsZigpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQnVmZkRlc3RvcnkoYnVmZkRhdGE6IEJ1ZmZEYXRhKSB7XHJcbiAgICAgICAgdGhpcy5oZXJvX2J1ZmYuZGVsZXRlKGJ1ZmZEYXRhLmJ1ZmZfaWQpO1xyXG4gICAgICAgIHN3aXRjaCAoYnVmZkRhdGEuYnVmZl9pZCkge1xyXG4gICAgICAgICAgICBjYXNlIEJ1ZmZJZC5QZXQzX0ppYVN1OlxyXG4gICAgICAgICAgICBjYXNlIEJ1ZmZJZC5IZXJvX01laU1vX0dvbmdTdTpcclxuICAgICAgICAgICAgY2FzZSBCdWZmSWQuSGVyb19LdWFuZ1poYW5TaGlfRGFaaGFvOlxyXG4gICAgICAgICAgICBjYXNlIEJ1ZmZJZC5IZXJvX1poZW5EZV9Hb25nc3U6XHJcbiAgICAgICAgICAgIGNhc2UgQnVmZklkLkhlcm9fQ2hhbmdNYW9TaG93X0dvbmdTdToge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VBdHRhY2tTcGVlZCgtYnVmZkRhdGEuYnVmZl92YWx1ZVswXSk7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQnVmZklkLkhlcm9fWmhlbkRlX0Jhb0ppTWluZ1pob25nTHY6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGVyb19kYXRhLmNyaXRfZXggLT0gYnVmZkRhdGEuYnVmZl92YWx1ZVswXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGVyb19kYXRhLmhpdF9leCAtPSBidWZmRGF0YS5idWZmX3ZhbHVlWzBdO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpc0hhdmVCdWZmKGJ1ZmY6IEJ1ZmZJZCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmhlcm9fYnVmZi5oYXMoYnVmZik7XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlQWxsQnVmZigpIHtcclxuICAgICAgICB0aGlzLmhlcm9fYnVmZi5mb3JFYWNoKChidWZmOiBCdWZmVGltZXIpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zdWJCdWZmKGJ1ZmYuZ2V0QnVmZklkKCkpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG5cclxuICAgIGFkZERlQnVmZihidWZmRGF0YTogQnVmZkRhdGEsIGluc2lnaHQ6IG51bWJlciA9IDApOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNIYXZlRGVCdWZmKGJ1ZmZEYXRhLmJ1ZmZfaWQpKSB7XHJcbiAgICAgICAgICAgIC8v5o6n5Yi257G755qEZGVidWZm6ZyA6KaB5qC55o2u6Z+n5oCn5p2l5a6e546w5YW35L2T55qE5pWI5p6cXHJcbiAgICAgICAgICAgIGlmIChidWZmRGF0YS5idWZmX3R5cGUgPT0gQnVmZlR5cGUuVmVydGlnbykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VyX3RvdWdobmVzcyA+PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaGVyb190eXBlICE9IEhlcm9fVHlwZS5aaGVuRGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1wX3Byb2dyZXNzLnNldERpc2FibGUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuaGlkZVNraWxsUmFuZ2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNraWxsX3RpcC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5nb25namlfamlzaHUgPSAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zcGluZS5wYXVzZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc19jYW5fdG91Y2ggPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGlmIChpbnNpZ2h0ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLnJlbWFpbl90aW1lID0gSW5qdXJlZERhdGEuY2FsY0NvbnRyb2xUaW1lKGJ1ZmZEYXRhLnJlbWFpbl90aW1lLCB0aGlzLmN1cl90b3VnaG5lc3MsIGluc2lnaHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMueHVhbnl1bl9jYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMueHVhbnl1bl9jYWxsYmFjayh0cnVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFdhbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWFpbldhbGwoKS5zaG93VmVydGlnbyhidWZmRGF0YS5yZW1haW5fdGltZSk7XHJcbiAgICAgICAgICAgICAgICAvL+WFs+mXreaXtuWBnFxyXG4gICAgICAgICAgICAgICAgU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0VGltZVN0b3AoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXNTa2lsbFN0YXRlKGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL+a3u+WKoGJ1ZmboioLngrnlkoznibnmlYggICAgICAgXHJcbiAgICAgICAgICAgIGxldCBub2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgICAgICAgICAgaWYgKGJ1ZmZEYXRhLmdhbWVfZWZmZWN0X2lkID09IEdhbWVFZmZlY3RJZC5OdWxsKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlID0gbmV3IGNjLk5vZGUoYnVmZkRhdGEuZ2FtZV9lZmZlY3RfaWQudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBub2RlID0gR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEZvclBhcmVudChidWZmRGF0YS5nYW1lX2VmZmVjdF9pZCwgdGhpcy54dWFueXVuX3BvcywgdGhpcy5ub2RlKTtcclxuICAgICAgICAgICAgICAgIG5vZGUuc2NhbGUgPSB0aGlzLm5vZGUud2lkdGggLyAyMDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy/mt7vliqBidWZmXHJcbiAgICAgICAgICAgIGxldCBidWZmOiBCdWZmVGltZXIgPSBub2RlLmdldENvbXBvbmVudChCdWZmVGltZXIpO1xyXG4gICAgICAgICAgICBpZiAoIWJ1ZmYpIHtcclxuICAgICAgICAgICAgICAgIGJ1ZmYgPSBub2RlLmFkZENvbXBvbmVudChCdWZmVGltZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJ1ZmYuaW5pdChidWZmRGF0YSk7XHJcbiAgICAgICAgICAgIC8vYnVmZumUgOavgeaXtuWkhOeQhlxyXG4gICAgICAgICAgICBidWZmLmFkZERlc3Ryb3lMaXN0ZW4odGhpcy5vbkRlQnVmZkRlc3RvcnkuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgIHRoaXMuaGVyb19kZWJ1ZmYuc2V0KGJ1ZmZEYXRhLmJ1ZmZfaWQsIGJ1ZmYpO1xyXG4gICAgICAgICAgICBub2RlLnNjYWxlID0gMSAvIHRoaXMuc2V0dXBfc2NhbGU7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoYnVmZkRhdGEuYnVmZl9pZCkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBCdWZmSWQuQm9zczZfU2tpbGxfMl9qaWFuZ29uZ3N1OlxyXG4gICAgICAgICAgICAgICAgY2FzZSBCdWZmSWQuQm9zczNfSklBTl9Hb25nU3U6IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZUF0dGFja1NwZWVkKC1idWZmRGF0YS5idWZmX3ZhbHVlWzBdKTtcclxuICAgICAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJ1ZmZJZC5Cb3NzOF9Ta2lsbF8yX2F0dGFjazoge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVyb19kYXRhLnRvdGFsX2F0dGFjayAtPSBidWZmRGF0YS5idWZmX3ZhbHVlWzBdICogdGhpcy5oZXJvX2RhdGEuZml4ZWRfYXR0Y2s7XHJcbiAgICAgICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuYWRkRGVCdWZmU3RhdGUoYnVmZkRhdGEuYnVmZl9pZCwgYnVmZkRhdGEucmVtYWluX3RpbWUpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgYnVmZiA9IHRoaXMuaGVyb19kZWJ1ZmYuZ2V0KGJ1ZmZEYXRhLmJ1ZmZfaWQpO1xyXG4gICAgICAgICAgICBidWZmLnJlZnJlc2hCdWZmKGJ1ZmZEYXRhKTtcclxuICAgICAgICAgICAgdGhpcy5hZGREZUJ1ZmZTdGF0ZShidWZmRGF0YS5idWZmX2lkLCBidWZmRGF0YS5yZW1haW5fdGltZSk7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoYnVmZkRhdGEuYnVmZl9pZCkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBCdWZmSWQuQm9zczZfU2tpbGxfMl9qaWFuZ29uZ3N1OlxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJ1ZmYuZ2V0Rmxvb3JOdW0oKSA8IGJ1ZmZEYXRhLm1heF9mbG9vcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VBdHRhY2tTcGVlZCgtYnVmZkRhdGEuYnVmZl92YWx1ZVswXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWOu+mZpOS4gOS4qmRlYnVmZlxyXG4gICAgICogQHBhcmFtIGJ1ZmYgZGVidWZm57G75Z6LXHJcbiAgICAgKiBAcGFyYW0gaXNOZWVkUmVjeWNsZSDmmK/lkKbpnIDopoHosIPnlKjlm57mlLZcclxuICAgICAqIEByZXR1cm5zIFxyXG4gICAgICovXHJcbiAgICBzdWJEZUJ1ZmYoYnVmZklkOiBCdWZmSWQpOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgYnVmZiA9IHRoaXMuaGVyb19kZWJ1ZmYuZ2V0KGJ1ZmZJZCk7XHJcbiAgICAgICAgaWYgKGJ1ZmYpIHtcclxuICAgICAgICAgICAgYnVmZi5kZXN0cm95U2VsZigpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRGVCdWZmRGVzdG9yeShidWZmRGF0YTogQnVmZkRhdGEpIHtcclxuICAgICAgICAvLyBsZXQgYnVmZlN0YXRlPXRoaXMubWFwX2RlYnVmZl9zdGF0ZS5nZXQoQnVmZlN0YXRlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldERlQnVmZlR5cGUoYnVmZkRhdGEuYnVmZl9pZCkpO1xyXG4gICAgICAgIC8vIGlmKGJ1ZmZTdGF0ZSl7XHJcbiAgICAgICAgLy8gICAgIGJ1ZmZTdGF0ZS5kZXN0cm95U2VsZigpO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICB0aGlzLmhlcm9fZGVidWZmLmRlbGV0ZShidWZmRGF0YS5idWZmX2lkKTtcclxuICAgICAgICBzd2l0Y2ggKGJ1ZmZEYXRhLmJ1ZmZfaWQpIHtcclxuICAgICAgICAgICAgY2FzZSBCdWZmSWQuTW9uc3Rlcl9YdWFuWXVuOiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5oZXJvX3R5cGUgIT0gSGVyb19UeXBlLlpoZW5EZSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1wX3Byb2dyZXNzLnNldERpc2FibGUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nb25namlfamlzaHUgPSAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zcGluZS5wYXVzZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNfY2FuX3RvdWNoID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIFdhbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWFpbldhbGwoKS5oaWRlVmVydGlnbygpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMueHVhbnl1bl9jYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMueHVhbnl1bl9jYWxsYmFjayhmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQnVmZklkLkJvc3MzX0pJQU5fR29uZ1N1OiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZUF0dGFja1NwZWVkKGJ1ZmZEYXRhLmJ1ZmZfdmFsdWVbMF0pO1xyXG4gICAgICAgICAgICAgICAgbGV0IGJ1ZmZTdGF0ZSA9IHRoaXMubWFwX2RlYnVmZl9zdGF0ZS5nZXQoQnVmZlN0YXRlVHlwZS5BdHRhY2tTcGVlZCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYnVmZlN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnVmZlN0YXRlLmRlc3Ryb3lTZWxmKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQnVmZklkLkJvc3M2X1NraWxsXzJfamlhbmdvbmdzdToge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VBdHRhY2tTcGVlZChidWZmRGF0YS5idWZmX3ZhbHVlWzBdICogYnVmZkRhdGEuY3VyX2Zsb29yKTtcclxuICAgICAgICAgICAgICAgIGxldCBidWZmU3RhdGUgPSB0aGlzLm1hcF9kZWJ1ZmZfc3RhdGUuZ2V0KEJ1ZmZTdGF0ZVR5cGUuQXR0YWNrU3BlZWQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGJ1ZmZTdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZTdGF0ZS5kZXN0cm95U2VsZigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEJ1ZmZJZC5Cb3NzOF9Ta2lsbF8yX2F0dGFjazoge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oZXJvX2RhdGEudG90YWxfYXR0YWNrICs9IGJ1ZmZEYXRhLmJ1ZmZfdmFsdWVbMF0gKiB0aGlzLmhlcm9fZGF0YS5maXhlZF9hdHRjaztcclxuICAgICAgICAgICAgICAgIGxldCBidWZmU3RhdGUgPSB0aGlzLm1hcF9kZWJ1ZmZfc3RhdGUuZ2V0KEJ1ZmZTdGF0ZVR5cGUuQXR0YWNrKTtcclxuICAgICAgICAgICAgICAgIGlmIChidWZmU3RhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBidWZmU3RhdGUuZGVzdHJveVNlbGYoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaXNIYXZlRGVCdWZmKGJ1ZmZJZDogQnVmZklkKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaGVyb19kZWJ1ZmYuaGFzKGJ1ZmZJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlQWxsRGVCdWZmKCkge1xyXG4gICAgICAgIHRoaXMuaGVyb19kZWJ1ZmYuZm9yRWFjaCgodiwgaykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnN1YkRlQnVmZih2LmdldEJ1ZmZJZCgpKVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBnZXRHYW1lRWZmZWN0SWRCeURlYnVmZihidWZmOiBIZXJvX0RlQnVmZik6IEdhbWVFZmZlY3RJZCB7XHJcbiAgICAgICAgbGV0IGdhbWVFZmZlY3RJZCA9IEdhbWVFZmZlY3RJZC5OdWxsO1xyXG4gICAgICAgIHN3aXRjaCAoYnVmZikge1xyXG4gICAgICAgICAgICBjYXNlIEhlcm9fRGVCdWZmLlh1YW5ZdW46IHtcclxuICAgICAgICAgICAgICAgIGdhbWVFZmZlY3RJZCA9IEdhbWVFZmZlY3RJZC54dWFueXVuO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZ2FtZUVmZmVjdElkO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEdhbWVFZmZlY3ROYW1lQnlEZWJ1ZmYoYnVmZjogSGVyb19EZUJ1ZmYpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCBuYW1lID0gJzAnO1xyXG4gICAgICAgIHN3aXRjaCAoYnVmZikge1xyXG4gICAgICAgICAgICBjYXNlIEhlcm9fRGVCdWZmLlh1YW5ZdW46IHtcclxuICAgICAgICAgICAgICAgIG5hbWUgPSBHYW1lRWZmZWN0SWQueHVhbnl1biArICcnO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRYdWFuWXVuTGlzdGVuKGNhbGxiYWNrOiBGdW5jdGlvbikge1xyXG4gICAgICAgIHRoaXMueHVhbnl1bl9jYWxsYmFjayA9IGNhbGxiYWNrO1xyXG4gICAgfVxyXG5cclxuICAgIHJlc2V0U3RhdGUoKSB7XHJcbiAgICAgICAgdGhpcy5zZXRDRCgxIC8gMyk7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVBbGxCdWZmKCk7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVBbGxEZUJ1ZmYoKTtcclxuICAgICAgICB0aGlzLm1hcF9idWZmX3N0YXRlLmZvckVhY2goKHYsIGspID0+IHtcclxuICAgICAgICAgICAgdi5kZXN0cm95U2VsZigpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMubWFwX2RlYnVmZl9zdGF0ZS5mb3JFYWNoKCh2LCBrKSA9PiB7XHJcbiAgICAgICAgICAgIHYuZGVzdHJveVNlbGYoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAodGhpcy5yZXNldF9jYWxsYmFjaykge1xyXG4gICAgICAgICAgICB0aGlzLnJlc2V0X2NhbGxiYWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5ZCM5q2l5pWw5o2u5L+h5oGvXHJcbiAgICAgICAgdGhpcy5oZXJvX2RhdGEgPSBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdhbWVfaGVyb19kYXRhLmdldCh0aGlzLmhlcm9fdHlwZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5re75Yqg5LiA5LiqYnVmZueKtuaAgeWbvuaghyAqL1xyXG4gICAgYWRkQnVmZlN0YXRlKGJ1ZmZJZDogQnVmZklkLCByZW1haW5UaW1lOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgdHlwZXMgPSBCdWZmU3RhdGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0QnVmZlR5cGUoYnVmZklkKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHR5cGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCB0eXBlID0gdHlwZXNbaV07XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1hcF9idWZmX3N0YXRlLmhhcyh0eXBlKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXBfYnVmZl9zdGF0ZS5nZXQodHlwZSkucmVmcmVzaFRpbWUocmVtYWluVGltZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYmZTdGF0ZSA9IEJ1ZmZTdGF0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVCdWZmU3RhdGUodHlwZSwgdGhpcy5oZXJvX3R5cGUpO1xyXG4gICAgICAgICAgICAgICAgYmZTdGF0ZS5pbml0KHR5cGUsIHJlbWFpblRpbWUsIHRoaXMub25CdWZmU3RhdGVEZXN0b3J5LmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXBfYnVmZl9zdGF0ZS5zZXQodHlwZSwgYmZTdGF0ZSk7XHJcbiAgICAgICAgICAgICAgICAvL3RoaXMubm9kZS5hZGRDaGlsZChzaGllbGQubm9kZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25CdWZmU3RhdGVEZXN0b3J5KHR5cGU6IEJ1ZmZTdGF0ZVR5cGUpIHtcclxuICAgICAgICB0aGlzLm1hcF9idWZmX3N0YXRlLmRlbGV0ZSh0eXBlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKirmt7vliqDkuIDkuKpidWZm54q25oCB5Zu+5qCHICovXHJcbiAgICBhZGREZUJ1ZmZTdGF0ZShidWZmSWQ6IEJ1ZmZJZCwgcmVtYWluVGltZTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHR5cGVzID0gQnVmZlN0YXRlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldERlQnVmZlR5cGUoYnVmZklkKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHR5cGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCB0eXBlID0gdHlwZXNbaV07XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1hcF9kZWJ1ZmZfc3RhdGUuaGFzKHR5cGUpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hcF9kZWJ1ZmZfc3RhdGUuZ2V0KHR5cGUpLnJlZnJlc2hUaW1lKHJlbWFpblRpbWUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbGV0IGJmU3RhdGUgPSBCdWZmU3RhdGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlRGVCdWZmU3RhdGUodHlwZSwgdGhpcy5oZXJvX3R5cGUpO1xyXG4gICAgICAgICAgICAgICAgYmZTdGF0ZS5pbml0KHR5cGUsIHJlbWFpblRpbWUsIHRoaXMub25EZUJ1ZmZTdGF0ZURlc3RvcnkuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hcF9kZWJ1ZmZfc3RhdGUuc2V0KHR5cGUsIGJmU3RhdGUpO1xyXG4gICAgICAgICAgICAgICAgLy90aGlzLm5vZGUuYWRkQ2hpbGQoc2hpZWxkLm5vZGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uRGVCdWZmU3RhdGVEZXN0b3J5KHR5cGU6IEJ1ZmZTdGF0ZVR5cGUpIHtcclxuICAgICAgICB0aGlzLm1hcF9kZWJ1ZmZfc3RhdGUuZGVsZXRlKHR5cGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuiuvue9ruaUu+mAn++8jOavj+enkuaUu+WHu+asoeaVsCAqL1xyXG4gICAgcHJpdmF0ZSBzZXRBdHRhY2tTcGVlZChudW1TZWM6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuZ29uZ2ppX3N1ZHUgPSBudW1TZWM7XHJcbiAgICAgICAgaWYgKG51bVNlYyA+IDEwKSB7XHJcbiAgICAgICAgICAgIG51bVNlYyA9IDEwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobnVtU2VjIDwgMC4xKSB7XHJcbiAgICAgICAgICAgIG51bVNlYyA9IDAuMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5oZXJvX2RhdGEuZ29uZ2ppX2ppYW5nZSA9IDEgLyBudW1TZWM7XHJcbiAgICB9XHJcbiAgICAvKirmlLnlj5jlvZPliY3mlLvpgJ8sYnVmZkRhdGE65q+U546HICovXHJcbiAgICBwcml2YXRlIGNoYW5nZUF0dGFja1NwZWVkKHJhdGU6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBnanNkID0gdGhpcy5nZXRBdHRhY2tTcGVlZCgpO1xyXG4gICAgICAgIGdqc2QgKz0gKHJhdGUpICogKDEgLyB0aGlzLmhlcm9fZGF0YS5iYXNlX2ppYW5nZSk7XHJcbiAgICAgICAgdGhpcy5zZXRBdHRhY2tTcGVlZChnanNkKTtcclxuICAgIH1cclxuICAgIC8qKuiOt+W+l+W9k+WJjeaUu+mAnyAqL1xyXG4gICAgcHJpdmF0ZSBnZXRBdHRhY2tTcGVlZCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiAxIC8gdGhpcy5oZXJvX2RhdGEuZ29uZ2ppX2ppYW5nZTtcclxuICAgIH1cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLeeKtuaAgSzliqjnlLstLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBwdWJsaWMgc2V0SGVyb1N0YXRlKHN0YXRlOiBIZXJvX1N0YXRlLCBmYW5neGlhbmc6IEdvbmdKaV9GYW5nWGlhbmcsIGRhdGE/OiBLZXlGcmFtZURhdGFbXSwgZW5kQ2FsbGJhY2s/OiBGdW5jdGlvbikge1xyXG4gICAgICAgIHRoaXMuaGVyb19zdGF0ZSA9IHN0YXRlO1xyXG4gICAgICAgIHRoaXMuY3VyX2Zhbmd4aWFuZyA9IGZhbmd4aWFuZztcclxuICAgICAgICBzd2l0Y2ggKHRoaXMuY3VyX2Zhbmd4aWFuZykge1xyXG4gICAgICAgICAgICBjYXNlIEdvbmdKaV9GYW5nWGlhbmcuenVvOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc2NhbGVYID0gLXRoaXMuc2V0dXBfc2NhbGU7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR29uZ0ppX0ZhbmdYaWFuZy56aG9uZzoge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnNjYWxlWCA9IHRoaXMuc2V0dXBfc2NhbGU7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR29uZ0ppX0ZhbmdYaWFuZy55b3U6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zY2FsZVggPSB0aGlzLnNldHVwX3NjYWxlO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+aSreaUvuWKqOeUu1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5oZXJvX3N0YXRlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgSGVyb19TdGF0ZS5pZGxlOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXlTcGluZUFuaW1hdGlvbih0aGlzLmdldFNwaW5lTmFtZSgpLCB0cnVlLCBudWxsLCBudWxsKTtcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBIZXJvX1N0YXRlLmF0dGFjazoge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5U3BpbmVBbmltYXRpb24odGhpcy5nZXRTcGluZU5hbWUoKSwgZmFsc2UsIGRhdGEsIGVuZENhbGxiYWNrKTtcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBIZXJvX1N0YXRlLnNraWxsOlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheVNwaW5lQW5pbWF0aW9uKHRoaXMuZ2V0U3BpbmVOYW1lKCksIGZhbHNlLCBkYXRhLCBlbmRDYWxsYmFjayk7XHJcbiAgICAgICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgc2V0SGVyb1N0YXRlQW5kQW5pbWF0aW9uKHN0YXRlOiBIZXJvX1N0YXRlLCBuYW1lOiBzdHJpbmcsIGxvb3A6IGJvb2xlYW4sIGRhdGE/OiBLZXlGcmFtZURhdGFbXSwgZW5kQ2FsbGJhY2s/OiBGdW5jdGlvbikge1xyXG4gICAgICAgIHRoaXMuaGVyb19zdGF0ZSA9IHN0YXRlO1xyXG4gICAgICAgIHRoaXMucGxheVNwaW5lQW5pbWF0aW9uKG5hbWUsIGxvb3AsIGRhdGEsIGVuZENhbGxiYWNrKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRIZXJvU3RhdGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaGVyb19zdGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKirmoLnmja7mlYzkurrkvY3nva7ojrflvpfmlLvlh7vmlrnlkJEgKi9cclxuICAgIHByb3RlY3RlZCBnZXRGYW5nWGlhbmdCeVBvcyhwb3M6IGNjLlZlYzIpOiBHb25nSmlfRmFuZ1hpYW5nIHtcclxuICAgICAgICAvL+WvueaVjOS6uuWNleS9jei/m+ihjOaWueWQkeWIpOaWre+8jOehruWumuaJk+WHu+aWueWQkVxyXG4gICAgICAgIGxldCBmYW5neGlhbmcgPSBHb25nSmlfRmFuZ1hpYW5nLnpob25nO1xyXG4gICAgICAgIGxldCBvZmZzZXRQb3MgPSBwb3Muc3ViKHRoaXMubm9kZS5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICBsZXQgcGkyID0gTWF0aC5QSSAqIDI7XHJcbiAgICAgICAgbGV0IHJhZGlhbiA9IChNYXRoLmF0YW4yKG9mZnNldFBvcy55LCBvZmZzZXRQb3MueCkgKyBwaTIpICUgcGkyO1xyXG4gICAgICAgIGxldCBhbmdsZSA9IDE4MCAqIHJhZGlhbiAvIE1hdGguUEk7XHJcbiAgICAgICAgaWYgKGFuZ2xlIDw9IDYwKSB7XHJcbiAgICAgICAgICAgIGZhbmd4aWFuZyA9IEdvbmdKaV9GYW5nWGlhbmcueW91O1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYW5nbGUgPiA2MCAmJiBhbmdsZSA8IDEyMCkge1xyXG4gICAgICAgICAgICBmYW5neGlhbmcgPSBHb25nSmlfRmFuZ1hpYW5nLnpob25nO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYW5nbGUgPj0gMTIwICYmIGFuZ2xlIDw9IDE4MCkge1xyXG4gICAgICAgICAgICBmYW5neGlhbmcgPSBHb25nSmlfRmFuZ1hpYW5nLnp1bztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbmd4aWFuZztcclxuICAgIH1cclxuXHJcbiAgICBnZXRTcGluZU5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMuaGVyb19zdGF0ZSkge1xyXG4gICAgICAgICAgICBjYXNlIEhlcm9fU3RhdGUuYXR0YWNrOiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSGVyb19TdGF0ZV9OYW1lLkF0dGFjaztcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBIZXJvX1N0YXRlLnNraWxsOiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSGVyb19TdGF0ZV9OYW1lLlNraWxsO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEhlcm9fU3RhdGUuaWRsZToge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEhlcm9fU3RhdGVfTmFtZS5JZGxlO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5pKt5pS+5LiA5Liq6aqo6aq85Yqo55S7XHJcbiAgICAgKiBAcGFyYW0gbmFtZSDpqqjpqrzliqjnlLvlkI3np7BcclxuICAgICAqIEBwYXJhbSBpc0xvb3Ag5piv5ZCm5b6q546vXHJcbiAgICAgKiBAcGFyYW0gZGF0YSDmmK/lkKbnm5HlkKzlhbPplK7luKfvvIzlhbPplK7luKfmlbDmja7ljIXlkKvlhbPplK7luKflkI3np7DvvIznm5HlkKzliLDlhbPplK7luKflkI7nmoTlm57osINcclxuICAgICAqIEBwYXJhbSBlbmRDYWxsYmFjayDmkq3mlL7nu5PmnZ/lkI7nmoTlm57osINcclxuICAgICAqL1xyXG4gICAgcGxheVNwaW5lQW5pbWF0aW9uKG5hbWU6IHN0cmluZywgaXNMb29wOiBib29sZWFuID0gZmFsc2UsIGRhdGE/OiBLZXlGcmFtZURhdGFbXSwgZW5kQ2FsbGJhY2s/OiBGdW5jdGlvbikge1xyXG4gICAgICAgIGxldCBhbmltYSA9IHRoaXMuc3BpbmUuc2V0QW5pbWF0aW9uKDAsIG5hbWUsIGlzTG9vcCk7XHJcbiAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy5zcGluZS5zZXRUcmFja0V2ZW50TGlzdGVuZXIoYW5pbWEsIChlbnRyeTogc3Auc3BpbmUuVHJhY2tFbnRyeSwgZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChldmVudC5kYXRhLm5hbWUgPT0gZGF0YVtpXS5uYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFbaV0uY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChlbmRDYWxsYmFjaykge1xyXG4gICAgICAgICAgICB0aGlzLnNwaW5lLnNldFRyYWNrQ29tcGxldGVMaXN0ZW5lcihhbmltYSwgKGVudHJ5OiBzcC5zcGluZS5UcmFja0VudHJ5LCBldmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgYW5pbWEubGlzdGVuZXIgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgZW5kQ2FsbGJhY2soKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1DRC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgcHVibGljIHJlc2V0U2tpbGwoKSB7XHJcbiAgICAgICAgdGhpcy5za2lsbF9jZF90aW1lID0gMDtcclxuICAgICAgICB0aGlzLnNob3dDRCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldENEKCkge1xyXG4gICAgICAgIHRoaXMuc2tpbGxfY2RfdGltZSA9IHRoaXMuc2tpbGxfdG90YWxfdGltZTtcclxuICAgICAgICB0aGlzLnNob3dDRCgpO1xyXG4gICAgICAgIC8v6YeK5pS+5LqG5oqA6IO977yM56uL6ams5YeP5Y67TVBcclxuICAgICAgICAvL0dhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkud2FsbF9kYXRhLmNoYW5nZU1wKC10aGlzLmhlcm9fZGF0YS5jb3N0X21wKTtcclxuICAgIH1cclxuICAgIC8qKueZvuWIhuavlCAqL1xyXG4gICAgcHVibGljIHNldENEKHBlclRpbWU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuc2tpbGxfY2RfdGltZSA9IHBlclRpbWUgKiB0aGlzLmhlcm9fZGF0YS5nZXRTa2lsbENvbGREb3duKFNraWxsVHlwZS5BY3RpdmUpOztcclxuICAgICAgICB0aGlzLmNoYW5nZUNEKDApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjaGFuZ2VDRCh0aW1lOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnNraWxsX2NkX3RpbWUgKz0gdGltZTtcclxuICAgICAgICBpZiAodGhpcy5za2lsbF9jZF90aW1lIDw9IDApIHtcclxuICAgICAgICAgICAgdGhpcy5za2lsbF9jZF90aW1lID0gMDtcclxuICAgICAgICAgICAgaWYgKHRoaXMubXBfcHJvZ3Jlc3MpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubXBfcHJvZ3Jlc3Muc2V0Tm9ybWFsU1AoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hdXRvX2ZpZ2h0aW5nICYmIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfc3RhdGUgPT0gR2FtZVN0YXRlLkdhbWVfUGxheWluZyAmJiB0aGlzLmdldElzQ2FuU2tpbGwoKSAmJiBTa2lsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRJc1NraWxsU3RhdGUoKSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydEF1dG9SZWxlYXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvL+aYvuekuuiSmeadv+WSjOWAkuiuoeaXtlxyXG4gICAgICAgICAgICBpZiAodGhpcy5tcF9wcm9ncmVzcykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tcF9wcm9ncmVzcy5zZXRDRFNQKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zaG93Q0QoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNob3dDRCgpIHtcclxuICAgICAgICBpZiAodGhpcy5tcF9wcm9ncmVzcykge1xyXG4gICAgICAgICAgICBsZXQgcHJvZ3Jlc3MgPSAxIC0gdGhpcy5za2lsbF9jZF90aW1lIC8gdGhpcy5za2lsbF90b3RhbF90aW1lO1xyXG4gICAgICAgICAgICB0aGlzLm1wX3Byb2dyZXNzLnNldFByb2dyZXNzKHByb2dyZXNzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SXNDYW5Ta2lsbCgpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAodGhpcy5pc0hhdmVEZUJ1ZmYoQnVmZklkLk1vbnN0ZXJfWHVhbll1bikgfHwgdGhpcy5nZXRIZXJvU3RhdGUoKSA9PSBIZXJvX1N0YXRlLmV4aXQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmlzX3Nob3dfbXBfaGludCA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLnNraWxsX2NkX3RpbWUgPD0gMCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc19uZWVkX2NoZWNrX2Rpc3RhbmNlKSB7XHJcbiAgICAgICAgICAgICAgICAvL+WmguaenOmcgOimgeWIpOaWremHiuaUvui3neemu+eahO+8jOWImemcgOimgeWIpOaWremHiuaUvui3neemu+WGheacieayoeacieaAqueJqe+8jOayoeacieWImei/lOWbnmZhbHNlXHJcbiAgICAgICAgICAgICAgICBsZXQgZW5lbXlzID0gTW9uc3Rlck1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNb25zdGVyc0Zvck5lYXJlc3RCeVNraWxsKHRoaXMubWF4X2dvbmdqaV9udW0sIHRoaXMubm9kZS55LCB0aGlzLmNhc3RpbmdfZGlzdGFuY2UpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGVuZW15cyA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIGRhbWFnZSDmnKzmrKHkuI3mmrTlh7vnmoTkvKTlrrPlgLxcclxuICAgICAqIEBwYXJhbSBpc0J1bGxldCDmmK/lkKblrZDlvLnnsbvlnotcclxuICAgICAqIEBwYXJhbSBza2lsbFR5cGUg5oqA6IO957G75Z6LXHJcbiAgICAgKiBAcGFyYW0gc2tpbGxSYXRlIOWmguaenOaYr+aKgOiDve+8jOaKgOiDveeahOavlOeOh1xyXG4gICAgICogQHBhcmFtIGNvbnRpbnVvdXNSYXRlIOS8pOWus+avlOeOhy3lupTnlKjlnKjmjIHnu63kvKTlrrPmr5TnjodcclxuICAgICAqIEByZXR1cm5zIOaUu+WHu+aVsOaNrlxyXG4gICAgICovXHJcbiAgICBnZXRHb25nSmlEYXRhKGRhbWFnZVR5cGU6IERhbWFnZVR5cGUsIGlzQnVsbGV0OiBib29sZWFuLCBza2lsbFR5cGU6IFNraWxsVHlwZSwgc2tpbGxSYXRlOiBudW1iZXIgPSAxLCBjb250aW51b3VzUmF0ZTogbnVtYmVyID0gMCk6IEdvbmdKaURhdGEge1xyXG4gICAgICAgIGxldCBnakRhdGEgPSBuZXcgR29uZ0ppRGF0YSgpO1xyXG4gICAgICAgIGdqRGF0YS5oZXJvX2RhdGEgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmhlcm9fZGF0YSk7XHJcbiAgICAgICAgZ2pEYXRhLmlzX2J1bGxldCA9IGlzQnVsbGV0O1xyXG4gICAgICAgIGdqRGF0YS5kYW1hZ2VfdHlwZSA9IGRhbWFnZVR5cGU7XHJcbiAgICAgICAgZ2pEYXRhLmhlcm9fdHlwZSA9IHRoaXMuaGVyb190eXBlO1xyXG4gICAgICAgIGlmIChkYW1hZ2VUeXBlID09IERhbWFnZVR5cGUuTm9ybWFsKSB7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8v5oqA6IO95Lyk5a6z5q+U546HXHJcbiAgICAgICAgICAgIGdqRGF0YS5za2lsbF9kYW1hZ2VfcmF0ZSA9IHNraWxsUmF0ZTtcclxuICAgICAgICAgICAgZ2pEYXRhLmNvbnRpbnVvdXNfZGFtYWdlX3JhdGUgPSBjb250aW51b3VzUmF0ZTtcclxuICAgICAgICAgICAgaWYgKHNraWxsVHlwZSA9PSBTa2lsbFR5cGUuQWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICBnakRhdGEuc2tpbGxfcmVsZWFzZV9pZCA9IHRoaXMuZ2V0U2tpbGxSZWxlYXNlSWQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZ2pEYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRGFtYWdlTW9uc3RlcihkYW1hZ2VUeXBlOiBEYW1hZ2VUeXBlLCBpc0NyaXQ6IGJvb2xlYW4sIG1vbnN0ZXI6IGNjLk5vZGUpIHtcclxuICAgICAgICBpZiAoZGFtYWdlVHlwZSA9PSBEYW1hZ2VUeXBlLk5vcm1hbCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wZXQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGV0Lm9uSGVyb0hpdE1vbnN0ZXIobW9uc3Rlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuaGl0X2NhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGl0X2NhbGxiYWNrKGRhbWFnZVR5cGUsIGlzQ3JpdCwgbW9uc3Rlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlc2V0R29uZ0ppSmlTaHUoKSB7XHJcbiAgICAgICAgdGhpcy5nb25namlfamlzaHUgPSAwO1xyXG4gICAgICAgIHRoaXMuaXNfY2FuX2ppc2h1ID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICByZXNldE5vcm1hbEF0dGFjaygpIHtcclxuICAgICAgICB0aGlzLmdvbmdqaV9qaXNodSA9IHRoaXMuaGVyb19kYXRhLmdvbmdqaV9qaWFuZ2U7XHJcbiAgICAgICAgdGhpcy5pc19jYW5famlzaHUgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEF0dFNwaW5lU2NhbGUoKSB7XHJcbiAgICAgICAgdGhpcy5zcGluZS50aW1lU2NhbGUgPSB0aGlzLmhlcm9fZGF0YS5iYXNlX2ppYW5nZSAvIHRoaXMuaGVyb19kYXRhLmdvbmdqaV9qaWFuZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnROb3JtYWxBdHRhY2sobW9uc3RlcjogY2MuTm9kZSkge1xyXG4gICAgICAgIGxldCBpc0RvdWJsZTogYm9vbGVhbiA9IHRoaXMuaXNfZG91YmxlX2F0dGFjaztcclxuICAgICAgICBpZiAodGhpcy5pc19kb3VibGVfYXR0YWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3BpbmUudGltZVNjYWxlID0gdGhpcy5oZXJvX2RhdGEuYmFzZV9qaWFuZ2UgLyB0aGlzLmhlcm9fZGF0YS5nb25namlfamlhbmdlICogMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5pc19kb3VibGVfYXR0YWNrID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5hdHRhY2tfY2FsbGJhY2sobW9uc3Rlcik7XHJcbiAgICAgICAgaWYgKHRoaXMucGV0KSB7XHJcbiAgICAgICAgICAgIHRoaXMucGV0LnN0YXJ0UmVsZWFzZVNraWxsKG1vbnN0ZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9tb2RlID09IEdhbWVNb2RlLkVuZGxlc3MpIHtcclxuICAgICAgICAgICAgaWYgKGlzRG91YmxlID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYnVmZiA9IHRoaXMuZ2V0RW5kbGVzc0J5VHlwZShFbmRsZXNzQnVmZlR5cGUuRG91YmxlQXR0YWNrKVxyXG4gICAgICAgICAgICAgICAgaWYgKGJ1ZmYpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL+amgueOh1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCByYXRlID0gYnVmZi52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoTWF0aC5yYW5kb20oKSA8IHJhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc19kb3VibGVfYXR0YWNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zcGluZS50aW1lU2NhbGUgPSB0aGlzLmhlcm9fZGF0YS5iYXNlX2ppYW5nZSAvIHRoaXMuaGVyb19kYXRhLmdvbmdqaV9qaWFuZ2UgKiAyO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVVQREFURS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICB1cGRhdGUoZHQ6IG51bWJlcikge1xyXG4gICAgICAgIGlmIChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX3N0YXRlICE9IEdhbWVTdGF0ZS5HYW1lX1BsYXlpbmcgfHwgSGVyb19TdGF0ZS5leGl0ID09IHRoaXMuZ2V0SGVyb1N0YXRlKCkpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB0aGlzLmNoZWNrU2tpbGwoZHQpO1xyXG4gICAgICAgIGlmICh0aGlzLmlzSGF2ZURlQnVmZihCdWZmSWQuTW9uc3Rlcl9YdWFuWXVuKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2hlY2tBdHRhY2soZHQpO1xyXG4gICAgICAgIGlmICh0aGlzLmNsaWNrX3JlbWFpbiA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5jbGlja19yZW1haW4gLT0gZHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBsZXQgdng6IG51bWJlciA9ICh0aGlzLnRhcmdldFggLSB0aGlzLm5vZGUueCkgKiB0aGlzLmVhc2luZztcclxuICAgICAgICAvLyB0aGlzLm5vZGUueCArPSB2eDtcclxuICAgICAgXHJcbiAgICAgICAgc3dpdGNoICh0aGlzLnNwZWVkVHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIFNwZWVkVHlwZS5TVE9QOlxyXG4gICAgICAgICAgICAgIHRoaXMubW92ZVNwZWVkID0gdGhpcy5zdG9wU3BlZWQ7XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgU3BlZWRUeXBlLk5PUk1BTDpcclxuICAgICAgICAgICAgICB0aGlzLm1vdmVTcGVlZCA9IHRoaXMubm9ybWFsU3BlZWQ7XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgU3BlZWRUeXBlLkZBU1Q6XHJcbiAgICAgICAgICAgICAgdGhpcy5tb3ZlU3BlZWQgPSB0aGlzLmZhc3RTcGVlZDtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmICh0aGlzLnNwZWVkVHlwZSAhPT0gU3BlZWRUeXBlLlNUT1ApIHtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHRoaXMubm9kZV9zaGFkb3cpe1xyXG4gICAgICAgICAgICB0aGlzLm5vZGVfc2hhZG93LnNldFBvc2l0aW9uKGNjLnYyKHRoaXMubm9kZS54ICsgdGhpcy5wb3MueCAqIHRoaXMuc2V0dXBfc2NhbGUsIHRoaXMubm9kZS55ICsgdGhpcy5wb3MueSAqIHRoaXMuc2V0dXBfc2NhbGUpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCB1cGRhdGVDaGVjayhkdCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICh0aGlzLmlzSGF2ZURlQnVmZihCdWZmSWQuTW9uc3Rlcl9YdWFuWXVuKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2hlY2tBdHRhY2soZHQpO1xyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNoZWNrU2tpbGwoZHQ6IG51bWJlcikge1xyXG4gICAgICAgIGlmICh0aGlzLmhlcm9fc3RhdGUgIT0gSGVyb19TdGF0ZS5za2lsbCkge1xyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZUNEKC1kdCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2hlY2tBdHRhY2soZHQpIHtcclxuICAgICAgICBpZiAodGhpcy5pc19jYW5famlzaHUgJiYgdGhpcy5pc19sb2FkX29rKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ29uZ2ppX2ppc2h1ICs9IGR0O1xyXG4gICAgICAgICAgICBpZiAodGhpcy5nb25namlfamlzaHUgPj0gdGhpcy5oZXJvX2RhdGEuZ29uZ2ppX2ppYW5nZSkge1xyXG4gICAgICAgICAgICAgICAgLy/lvIDlp4vmlLvlh7tcclxuICAgICAgICAgICAgICAgIHRoaXMuZ29uZ2ppX2ppc2h1ID0gMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNfY2FuX2dvbmdqaSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy/oh6rliqjmlLvlh7tcclxuICAgICAgICBpZiAodGhpcy5pc19jYW5fZ29uZ2ppICYmIHRoaXMuZ2V0SGVyb1N0YXRlKCkgIT0gSGVyb19TdGF0ZS5za2lsbCkge1xyXG4gICAgICAgICAgICB0aGlzLmlzX2Nhbl9nb25namkgPSBmYWxzZTtcclxuICAgICAgICAgICAgbGV0IG1vbnN0ZXJzID0gTW9uc3Rlck1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNb25zdGVyc0Zvck5lYXJlc3QodGhpcy5tYXhfZ29uZ2ppX251bSwgdGhpcy5ub2RlLmdldFBvc2l0aW9uKCksIHRoaXMuaGVyb19kYXRhLmdvbmdqaV9mYW53ZWkpO1xyXG4gICAgICAgICAgICBpZiAobW9uc3RlcnMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ29uZ2ppX2ppc2h1ID0gMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNfY2FuX2dvbmdqaSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEF0dFNwaW5lU2NhbGUoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnROb3JtYWxBdHRhY2sobW9uc3RlcnNbMF0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuIl19