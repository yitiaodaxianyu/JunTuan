
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
var MpProgress_1 = require("./MpProgress");
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
        _this.setup_scale = 1;
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
        var pos = selfShadow.getPosition();
        this.node_shadow = cc.instantiate(selfShadow);
        this.node_shadow.parent = cc.find('Canvas/Hero_Shadow_Root');
        this.node_shadow.scale = this.setup_scale;
        this.node_shadow.setPosition(cc.v2(this.node.x + pos.x * this.setup_scale, this.node.y + pos.y * this.setup_scale));
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
            touchNode.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
            touchNode.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
            touchNode.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
            touchNode.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
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
            touchNode.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
            touchNode.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
            touchNode.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
            touchNode.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
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
        var _this = this;
        cc.resources.load('heros/skill_icon', cc.Prefab, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            var mpNode = cc.instantiate(assets);
            mpNode.parent = cc.find('Canvas/Fighting_Ui');
            mpNode.setPosition(cc.v2(_this.node.x, _this.node.y + 15));
            _this.mp_progress = mpNode.getComponent(MpProgress_1.default);
            _this.mp_progress.init(_this.hero_type);
            _this.changeCD(_this.hero_data.getSkillColdDown(HeroConfig_1.SkillType.Active) / 3);
            _this.skill_total_time = _this.hero_data.getSkillColdDown(HeroConfig_1.SkillType.Active);
            if (_this.getHeroState() == HeroConfig_1.Hero_State.exit) {
                _this.mp_progress.hide();
            }
        });
    };
    Hero.prototype.loadZhiShiQi = function (zhishiqi, type) {
        this.zhishiqi_type = type;
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
    //----------------------------------【皮肤】----------------------------------------------
    Hero.prototype.setSkin = function () {
        //let heroQuality=HeroManager.getInstance().getHeroQuality(this.hero_type);
        //let tier=HeroQualityManager.getInstance().getTier(heroQuality);
        //this.spine.setSkin('stage'+(HeroManager.getSkinIndex(tier)));
    };
    /**---------------------------------操作相关---------------------------------------------- */
    //-----------------------------------触摸事件------------------------------------------------------------
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcR2FtZVxcSGVyby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBOEw7QUFDOUwsMkNBQXNDO0FBRXRDLDZDQUF3RDtBQUV4RCxpREFBNEM7QUFDNUMsb0VBQWlGO0FBRWpGLCtEQUEwRDtBQUMxRCw2Q0FBc0Q7QUFDdEQsZ0VBQTJEO0FBQzNELHlEQUFzRTtBQUN0RSx3REFBbUQ7QUFDbkQseUNBQW9DO0FBQ3BDLHVDQUFzQztBQUN0Qyx1Q0FBa0M7QUFDbEMsb0RBQStDO0FBQy9DLHVFQUFrRTtBQUNsRSxzREFBaUQ7QUFDakQsZ0RBQStDO0FBQy9DLHNEQUFpRDtBQUNqRCw0RUFBMEY7QUFDMUYsa0VBQXdFO0FBQ3hFLGtEQUE2QztBQUM3QyxxREFBMkQ7QUFDM0QsZ0RBQTJDO0FBQzNDLGtEQUE2QztBQUM3QyxnREFBMkM7QUFDM0MsaURBQTRDO0FBR3RDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQWtDLHdCQUFZO0lBQTlDO1FBQUEscUVBeTBDQztRQXIwQ0csaUJBQWlCO1FBQ2pCLGdCQUFVLEdBQVMsS0FBSyxDQUFDO1FBQ3pCLGtCQUFZLEdBQVEsQ0FBQyxDQUFDO1FBQ3RCLG1CQUFhLEdBQVEsQ0FBQyxDQUFDO1FBR3ZCLGVBQVMsR0FBVyxzQkFBUyxDQUFDLFlBQVksQ0FBQztRQUczQyxzQkFBZ0IsR0FBVyxJQUFJLENBQUM7UUFFaEMsTUFBTTtRQUNOLFdBQUssR0FBYSxJQUFJLENBQUM7UUFDdkIsYUFBYTtRQUNiLG1CQUFhLEdBQWtCLDZCQUFnQixDQUFDLEdBQUcsQ0FBQztRQUNwRCxXQUFXO1FBQ1gsZ0JBQVUsR0FBWSx1QkFBVSxDQUFDLElBQUksQ0FBQztRQUN0QyxNQUFNO1FBQ04sa0JBQVksR0FBUSxDQUFDLENBQUM7UUFD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Q087SUFHM0M7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztrREFDWTtJQWJmLElBQUk7UUFEeEIsT0FBTztPQUNhLElBQUksQ0F5MEN4QjtJQUFELFdBQUM7Q0F6MENELEFBeTBDQyxDQXowQ2lDLEVBQUUsQ0FBQyxTQUFTLEdBeTBDN0M7a0JBejBDb0IsSUFBSSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJ1ZmZJZCwgQnVmZlN0YXRlVHlwZSwgQnVmZlR5cGUsIERhbWFnZVR5cGUsIEdvbmdKaV9GYW5nWGlhbmcsIEhlcm9fRGVCdWZmLCBIZXJvX1N0YXRlLCBIZXJvX1N0YXRlX05hbWUsIEhlcm9fVHlwZSwgU2tpbGxJbmRpY2F0b3JUeXBlLCBTa2lsbFRpcFR5cGUsIFNraWxsVHlwZX0gZnJvbSBcIi4vSGVyb0NvbmZpZ1wiO1xyXG5pbXBvcnQgTXBQcm9ncmVzcyBmcm9tIFwiLi9NcFByb2dyZXNzXCI7XHJcbmltcG9ydCBCdWZmU3RhdGUgZnJvbSBcIi4vQnVmZlN0YXRlXCI7XHJcbmltcG9ydCB7IEdvbmdKaURhdGEsIEhlcm9EYXRhIH0gZnJvbSBcIi4uL0RhdGEvSGVyb0RhdGFcIjtcclxuaW1wb3J0IFBldCBmcm9tIFwiLi4vLi4vUGV0L0dhbWUvUGV0XCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgR2FtZUVmZmVjdElkLCBHYW1lRWZmZWN0c01hbmFnZXIgfSBmcm9tIFwiLi4vLi4vR2FtZS9HYW1lRWZmZWN0c01hbmFnZXJcIjtcclxuaW1wb3J0IHsgSGVyb01hbmFnZXIgfSBmcm9tIFwiLi4vRGF0YS9IZXJvTWFuYWdlclwiO1xyXG5pbXBvcnQgTW9uc3Rlck1hbmFnZXIgZnJvbSBcIi4uLy4uL01vbnN0ZXIvTW9uc3Rlck1hbmFnZXJcIjtcclxuaW1wb3J0IHsgR2FtZU1vZGUsIEdhbWVTdGF0ZSB9IGZyb20gXCIuLi8uLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IEJ1ZmZTdGF0ZU1hbmFnZXIgZnJvbSBcIi4uLy4uL0dhbWUvQnVmZlN0YXRlTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBJbmp1cmVkRGF0YSwgS2V5RnJhbWVEYXRhIH0gZnJvbSBcIi4uLy4uL01vbnN0ZXIvTW9uc3RlckRhdGFcIjtcclxuaW1wb3J0IFNraWxsTWFuYWdlciBmcm9tIFwiLi4vLi4vR2FtZS9Ta2lsbE1hbmFnZXJcIjtcclxuaW1wb3J0IEJ1ZmZUaW1lciBmcm9tIFwiLi9CdWZmVGltZXJcIjtcclxuaW1wb3J0IHsgQnVmZkRhdGEgfSBmcm9tIFwiLi9CdWZmRGF0YVwiO1xyXG5pbXBvcnQgU2tpbGxUaXAgZnJvbSBcIi4vU2tpbGxUaXBcIjtcclxuaW1wb3J0IFNreU1hbmFnZXIgZnJvbSBcIi4uLy4uL0dhbWUvU2t5TWFuYWdlclwiO1xyXG5pbXBvcnQgTGFuZ3VhZ2VNYW5hZ2VyIGZyb20gXCIuLi8uLi9tdWx0aUxhbmd1YWdlL0xhbmd1YWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgVGFza01hbmFnZXIgZnJvbSBcIi4uLy4uL1Rhc2svVGFza01hbmFnZXJcIjtcclxuaW1wb3J0IHsgVGFza0l0ZW0gfSBmcm9tIFwiLi4vLi4vVGFzay9UYXNrRW51bVwiO1xyXG5pbXBvcnQgV2FsbE1hbmFnZXIgZnJvbSBcIi4uLy4uL1dhbGwvV2FsbE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgRW5kbGVzc0J1ZmYsIEVuZGxlc3NCdWZmVHlwZSB9IGZyb20gXCIuLi8uLi9jb3B5L2VuZGxlc3NjaGFsbGVuZ2VzL0VuZGxlc3NDb25maWdcIjtcclxuaW1wb3J0IHsgU3Bpcml0QXR0cmlidXRlTWFuYWdlciB9IGZyb20gXCIuLi8uLi9QZXQvRGF0YS9TcGlyaXRBdHRyaWJ1dGVcIjtcclxuaW1wb3J0IEZpcmVQZXQgZnJvbSBcIi4uLy4uL1BldC9HYW1lL0ZpcmVQZXRcIjtcclxuaW1wb3J0IHsgSGVyb0Jhc2VJbmZvTWFuYWdlciB9IGZyb20gXCIuLi9EYXRhL0hlcm9CYXNlSW5mb1wiO1xyXG5pbXBvcnQgSWNlUGV0IGZyb20gXCIuLi8uLi9QZXQvR2FtZS9JY2VQZXRcIjtcclxuaW1wb3J0IFdpbmRQZXQgZnJvbSBcIi4uLy4uL1BldC9HYW1lL1dpbmRQZXRcIjtcclxuaW1wb3J0IFJheVBldCBmcm9tIFwiLi4vLi4vUGV0L0dhbWUvUmF5UGV0XCI7XHJcbmltcG9ydCBNb25zdGVyIGZyb20gXCIuLi8uLi9Nb25zdGVyL01vbnN0ZXJcIjtcclxuXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhlcm8gZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG4gICAgLyoq5omA5pyJ55qE6Iux6ZuE5Y+K5YW25omA6ZyA6LWE5rqQ5piv5ZCm5Yqg6L295a6M5q+VICovXHJcbiAgICBwdWJsaWMgc3RhdGljIG1heF9sb2FkX251bTpudW1iZXI9MDtcclxuICAgIHB1YmxpYyBzdGF0aWMgY3VyX2xvYWRlZF9udW06bnVtYmVyPTA7XHJcbiAgICAvKirmiYDpnIDnmoTliqjnlLvliqDovb3mmK/lkKZvayAqL1xyXG4gICAgaXNfbG9hZF9vazpib29sZWFuPWZhbHNlO1xyXG4gICAgY3VyX2xvYWRfbnVtOm51bWJlcj0wO1xyXG4gICAgbmVlZF9sb2FkX251bTpudW1iZXI9MDtcclxuXHJcbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuRW51bShIZXJvX1R5cGUpfSlcclxuICAgIGhlcm9fdHlwZTpIZXJvX1R5cGU9SGVyb19UeXBlLkNoYW5nTWFvU2hvdTtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgcHJlZmFiX3NraWxsX3RpcDpjYy5QcmVmYWI9bnVsbDtcclxuXHJcbiAgICAvL+mqqOmqvOWKqOeUu1xyXG4gICAgc3BpbmU6c3AuU2tlbGV0b249bnVsbDtcclxuICAgIC8qKuW9k+WJjeiLsembhOeahOmdouWQkSAqL1xyXG4gICAgY3VyX2Zhbmd4aWFuZzpHb25nSmlfRmFuZ1hpYW5nPUdvbmdKaV9GYW5nWGlhbmcuenVvO1xyXG4gICAgLyoq6Iux6ZuE55qE54q25oCBICovXHJcbiAgICBoZXJvX3N0YXRlOkhlcm9fU3RhdGU9SGVyb19TdGF0ZS5pZGxlO1xyXG4gICAgLy/mlLvlh7vorqHmlbBcclxuICAgIGdvbmdqaV9qaXNodTpudW1iZXI9MTtcclxuICAgIC8qKuaYr+WQpuWPr+S7peaUu+WHuyAqL1xyXG4gICAgaXNfY2FuX2dvbmdqaTpib29sZWFuPWZhbHNlO1xyXG4gICAgLyoq5piv5ZCm5Y+v5Lul5pS75Ye76K6h5pWwICovXHJcbiAgICBpc19jYW5famlzaHU6Ym9vbGVhbj10cnVlO1xyXG4gICAgLy/mnIDlpKfnmoTmlLvlh7vmrKHmlbBcclxuICAgIG1heF9nb25namlfbnVtPTE7XHJcbiAgICAvL+aKgOiDveWJqeS9meeahOWGt+WNtOaXtumXtFxyXG4gICAgc2tpbGxfY2RfdGltZTpudW1iZXI9MDtcclxuICAgIC8qKuS4u+WKqOaKgOiDveaKgOiDveacgOWkp+WGt+WNtCovXHJcbiAgICBza2lsbF90b3RhbF90aW1lOm51bWJlcj01O1xyXG4gICAgLyoq5pa95rOV6Led56a7ICovXHJcbiAgICBjYXN0aW5nX2Rpc3RhbmNlOm51bWJlcj0xMDAwO1xyXG4gICAgLyoq5a2Q5by56YCf5bqmICovXHJcbiAgICBidWxsZXRfc3BlZWQ6bnVtYmVyPTEwMDA7XHJcbiAgICAvL+a2iOiAl+eahE1Q5YC8XHJcbiAgICBjb3N0X21wOm51bWJlcj0yMDtcclxuICAgIG1wX3Byb2dyZXNzOk1wUHJvZ3Jlc3M9bnVsbDtcclxuICAgIC8qKuiLsembhOW9k+WJjeaLpeacieeahGJ1ZmYgKi9cclxuICAgIHByb3RlY3RlZCBoZXJvX2J1ZmY6IE1hcDxCdWZmSWQsQnVmZlRpbWVyPj1udWxsO1xyXG4gICAgLyoq6Iux6ZuE5b2T5YmN5oul5pyJ55qEZGVidWZmICovXHJcbiAgICBwcm90ZWN0ZWQgaGVyb19kZWJ1ZmY6IE1hcDxCdWZmSWQsQnVmZlRpbWVyPj1udWxsO1xyXG4gICAgLyoq5peg5bC9YnVmZiAqL1xyXG4gICAgcHJvdGVjdGVkIG1hcF9lbmRsZXNzX2J1ZmY6TWFwPG51bWJlcixFbmRsZXNzQnVmZj49bnVsbDtcclxuICAgIC8qKuecqeaZleS9jee9riAqL1xyXG4gICAgeHVhbnl1bl9wb3M6Y2MuVmVjMj1udWxsO1xyXG4gICAgLyoq5a2Q5by555Sf5oiQ55qE5L2N572uICovXHJcbiAgICBidWxsZXRfcG9zOmNjLlZlYzJbXT1bXTtcclxuICAgIC8v6Iux6ZuE55qE5pWw5o2uXHJcbiAgICBoZXJvX2RhdGE6SGVyb0RhdGE9bnVsbDsgICAgXHJcbiAgICBpc19zaG93X21wX2hpbnQ6Ym9vbGVhbj1mYWxzZTtcclxuXHJcbiAgICAvKirlvZPliY3nmoTpn6fmgKcgKi9cclxuICAgIHByb3RlY3RlZCBjdXJfdG91Z2huZXNzOm51bWJlcj0wO1xyXG4gICAgemhpc2hpcWlfdHlwZTpTa2lsbEluZGljYXRvclR5cGU9U2tpbGxJbmRpY2F0b3JUeXBlLmJlZWxpbmU7XHJcbiAgICAvKirmioDog73ph4rmlL7lm57osIMgKi9cclxuICAgIHNraWxsX2NhbGxiYWNrOkZ1bmN0aW9uPW51bGw7XHJcbiAgICAvKirmlLvlh7vph4rmlL7lm57osIMgKi9cclxuICAgIGF0dGFja19jYWxsYmFjazpGdW5jdGlvbj1udWxsO1xyXG4gICAgLyoq55yp5pmV5Zue6LCDICovO1xyXG4gICAgeHVhbnl1bl9jYWxsYmFjazpGdW5jdGlvbj1udWxsO1xyXG4gICAgLyoq5ZG95Lit5Zue6LCDICovXHJcbiAgICBoaXRfY2FsbGJhY2s6RnVuY3Rpb249bnVsbDtcclxuICAgIC8qKumHjee9ruWbnuiwgyAqL1xyXG4gICAgcmVzZXRfY2FsbGJhY2s6RnVuY3Rpb249bnVsbDtcclxuICAgIC8qKuiDnOWIqeWbnuiwgyAqL1xyXG4gICAgd2luX2NhbGxiYWNrOkZ1bmN0aW9uPW51bGw7XHJcbiAgICAvKirliqDovb3lrozmr5Xlm57osIPlm57osIMgKi9cclxuICAgIGxvYWRlZF9jYWxsYmFjazpGdW5jdGlvbj1udWxsO1xyXG4gICAgLyoq5a6g54mpICovXHJcbiAgICBwZXQ6UGV0PW51bGw7XHJcbiAgICAvKirlrqDnianmioDog73nmoTkuIDkupvooqvliqggKi9cclxuICAgIC8qKuatpOasoeS8pOWus+W/heWumuaatOWHuyAqL1xyXG4gICAgbXVzdF9jcml0Om51bWJlcj0wO1xyXG4gICAgLyoq5a6g54mpMjHlj6/ku6Xop6blj5Hlop7kvKTmrKHmlbAgKi9cclxuICAgIGNyaXRfaW5jcmVhc2VfY2RfM19udW06bnVtYmVyPTA7XHJcbiAgICBcclxuICAgIHNldHVwX3NjYWxlOm51bWJlcj0xO1xyXG4gICAgYmFzZV9hdHRfamlhbmdlOm51bWJlcj0wO1xyXG5cclxuICAgIC8qKmJ1ZmbnirbmgIEgKi9cclxuICAgIG1hcF9idWZmX3N0YXRlOk1hcDxudW1iZXIsQnVmZlN0YXRlPj1udWxsO1xyXG4gICAgLyoqZGVidWZm54q25oCBICovXHJcbiAgICBtYXBfZGVidWZmX3N0YXRlOk1hcDxudW1iZXIsQnVmZlN0YXRlPj1udWxsO1xyXG4gICAgLyoq5piv5ZCm6ZyA6KaB5qOA5p+l5oqA6IO96YeK5pS+6Led56a7ICovXHJcbiAgICBpc19uZWVkX2NoZWNrX2Rpc3RhbmNlOmJvb2xlYW49dHJ1ZTtcclxuICAgIC8qKuaMh+ekuuWZqOexu+WeiyAqL1xyXG4gICAgcHJvdGVjdGVkIHNraWxsX3RpcF90eXBlOlNraWxsVGlwVHlwZT1Ta2lsbFRpcFR5cGUuRnVsbDtcclxuICAgIC8qKuaYr+WQpuWPr+S7peWkhOeQhuinpuaRuOS6i+S7tu+8jOW9k+aKgOiDvUNE5a6M5q+V5YiH5oyJ5LiL5LqG6Iux6ZuE5pe25Li6dHJ1ZSAqL1xyXG4gICAgcHJpdmF0ZSBpc19jYW5fdG91Y2g6Ym9vbGVhbj1mYWxzZTtcclxuICAgIHByaXZhdGUgc2tpbGxfdGlwOlNraWxsVGlwPW51bGw7XHJcbiAgICAvKirmmK/lkKbop6blj5Hoh6rliqjph4rmlL7pgLvovpEgKi9cclxuICAgIHByaXZhdGUgaXNfYXV0b19yZWxlYXNlOmJvb2xlYW49ZmFsc2U7XHJcbiAgICBwcml2YXRlIHRvdWNoX3JlY3Q6Y2MuUmVjdD1udWxsO1xyXG4gICAgLyoq5oC75YWx5L2/55So5oqA6IO955qE5qyh5pWwICovXHJcbiAgICBwcm90ZWN0ZWQgdXNlX3NraWxsX251bTpudW1iZXI9MDtcclxuICAgIHByb3RlY3RlZCBub2RlX3NoYWRvdzpjYy5Ob2RlPW51bGw7XHJcbiAgICAvKirngrnlh7vliankvZkgKi8gXHJcbiAgICBwcm90ZWN0ZWQgY2xpY2tfcmVtYWluOm51bWJlcj0wO1xyXG4gICAgLyoq5pS76YCf6K6w5b2V5YC877yM5LiN5L2c5Yik5patICovXHJcbiAgICBnb25namlfc3VkdTpudW1iZXI9MDtcclxuICAgIC8qKuaKgOiDvemYn+WIlyAqL1xyXG4gICAgc2tpbGxfcXVldWU6U2tpbGxUeXBlW109W107XHJcbiAgICAvKirmmK/lkKbov57nu63mlLvlh7sgKi9cclxuICAgIGlzX2RvdWJsZV9hdHRhY2s6Ym9vbGVhbj1mYWxzZTtcclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1MT0FELS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBwcm90ZWN0ZWQgb25Mb2FkICgpIHtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFsbF9oZXJvLnNldCh0aGlzLmhlcm9fdHlwZSx0aGlzKTtcclxuICAgICAgICB0aGlzLnNwaW5lPXRoaXMubm9kZS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pO1xyXG4gICAgICAgIC8vdGhpcy5zZXRTa2luKCk7XHJcbiAgICAgICAgdGhpcy50b3VjaExpc3RlbigpO1xyXG4gICAgICAgIHRoaXMuaW5pdFBvcygpO1xyXG4gICAgICAgIC8vIGlmKHRoaXMuaGVyb190eXBlPT1IZXJvX1R5cGUuRGVMdVlpKXtcclxuICAgICAgICAvLyAgICAgdGhpcy5zZXR1cF9zY2FsZT0wLjIyO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyBpZih0aGlzLmhlcm9fdHlwZT09SGVyb19UeXBlLkxlaVNoZW58fHRoaXMuaGVyb190eXBlPT1IZXJvX1R5cGUuU2hvdVdhbmcpe1xyXG4gICAgICAgIC8vICAgICB0aGlzLnNldHVwX3NjYWxlPTE7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIHRoaXMubm9kZS5zY2FsZT10aGlzLnNldHVwX3NjYWxlO1xyXG4gICAgICAgIHRoaXMubm9kZS5zY2FsZVg9LXRoaXMuc2V0dXBfc2NhbGU7XHJcbiAgICAgICAgdGhpcy5hZGRMb2FkQnlHYW1lRWZmZWN0SWQoR2FtZUVmZmVjdElkLmhlcm9fc2tpbGxfY29tbW9uLDIpO1xyXG4gICAgICAgIHRoaXMuYWRkTG9hZEJ5R2FtZUVmZmVjdElkKEdhbWVFZmZlY3RJZC5za2lsbF9kYW1hZ2VfcmVjb3JkLDIpO1xyXG4gICAgICAgIHRoaXMubm9kZS56SW5kZXg9MTtcclxuICAgICAgICB0aGlzLm1hcF9idWZmX3N0YXRlPW5ldyBNYXA8bnVtYmVyLEJ1ZmZTdGF0ZT4oKTtcclxuICAgICAgICB0aGlzLm1hcF9kZWJ1ZmZfc3RhdGU9bmV3IE1hcDxudW1iZXIsQnVmZlN0YXRlPigpO1xyXG4gICAgICAgIHRoaXMuaGVyb19idWZmPW5ldyBNYXA8QnVmZklkLEJ1ZmZUaW1lcj4oKTtcclxuICAgICAgICB0aGlzLmhlcm9fZGVidWZmPW5ldyBNYXA8QnVmZklkLEJ1ZmZUaW1lcj4oKTtcclxuICAgICAgICB0aGlzLm1hcF9lbmRsZXNzX2J1ZmY9bmV3IE1hcDxCdWZmSWQsRW5kbGVzc0J1ZmY+KCk7XHJcbiAgICAgICAgdGhpcy5hZGRTa2lsbFRpcFR5cGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgc3RhcnQoKVxyXG4gICAge1xyXG4gICAgICAgIC8v5Yqg6L295pWw5o2uXHJcbiAgICAgICAgdGhpcy5oZXJvX2RhdGE9R2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nYW1lX2hlcm9fZGF0YS5nZXQodGhpcy5oZXJvX3R5cGUpO1xyXG4gICAgICAgIHRoaXMuYnVsbGV0X3NwZWVkPUhlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRCYXNlQnVsbGV0U3BlZWQodGhpcy5oZXJvX3R5cGUpO1xyXG4gICAgICAgIHRoaXMuZ29uZ2ppX2ppc2h1PXRoaXMuaGVyb19kYXRhLmdvbmdqaV9qaWFuZ2U7XHJcbiAgICAgICAgdGhpcy5nb25namlfc3VkdT10aGlzLmdldEF0dGFja1NwZWVkKCk7XHJcbiAgICAgICAgdGhpcy5zZXRIZXJvU3RhdGUoSGVyb19TdGF0ZS5pZGxlLEdvbmdKaV9GYW5nWGlhbmcuemhvbmcpO1xyXG4gICAgICAgIC8vdGhpcy5wbGF5U3BpbmVBbmltYXRvbihIZXJvX1N0YXRlX05hbWUuSWRsZSx0cnVlLG51bGwsbnVsbCk7XHJcbiAgICAgICAgLy/liqDovb1tcOi/m+W6puadoVxyXG4gICAgICAgIHRoaXMubG9hZE1wUHJvZ3Jlc3MoKTtcclxuICAgICAgICB0aGlzLmxvYWRQZXQoKTtcclxuICAgICAgICBsZXQgc2VsZlNoYWRvdz10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ01vbnN0ZXJfU2hhZG93Jyk7XHJcbiAgICAgICAgbGV0IHBvcz1zZWxmU2hhZG93LmdldFBvc2l0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5ub2RlX3NoYWRvdz1jYy5pbnN0YW50aWF0ZShzZWxmU2hhZG93KTtcclxuICAgICAgICB0aGlzLm5vZGVfc2hhZG93LnBhcmVudD1jYy5maW5kKCdDYW52YXMvSGVyb19TaGFkb3dfUm9vdCcpO1xyXG4gICAgICAgIHRoaXMubm9kZV9zaGFkb3cuc2NhbGU9dGhpcy5zZXR1cF9zY2FsZTtcclxuICAgICAgICB0aGlzLm5vZGVfc2hhZG93LnNldFBvc2l0aW9uKGNjLnYyKHRoaXMubm9kZS54K3Bvcy54KnRoaXMuc2V0dXBfc2NhbGUsdGhpcy5ub2RlLnkrcG9zLnkqdGhpcy5zZXR1cF9zY2FsZSkpO1xyXG4gICAgICAgIHNlbGZTaGFkb3cucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgICAgIGlmKHRoaXMuZ2V0SGVyb1N0YXRlKCk9PUhlcm9fU3RhdGUuZXhpdCl7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZV9zaGFkb3cub3BhY2l0eT0wO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5vZGUuekluZGV4PTI7XHJcbiAgICAgICAgdGhpcy5jYXN0aW5nX2Rpc3RhbmNlPXRoaXMuaGVyb19kYXRhLmdvbmdqaV9mYW53ZWk7XHJcbiAgICAgICAgaWYoY2Mud2luU2l6ZS5oZWlnaHQvY2Mud2luU2l6ZS53aWR0aD4yKXtcclxuICAgICAgICAgICAgdGhpcy5jYXN0aW5nX2Rpc3RhbmNlPXRoaXMuaGVyb19kYXRhLmdvbmdqaV9mYW53ZWkrMjAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBpZih0aGlzLmhlcm9fdHlwZT09SGVyb19UeXBlLk52V3Upe1xyXG4gICAgICAgIC8vICAgICB0aGlzLmNhc3RpbmdfZGlzdGFuY2U9MTkyKjMrR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5lbmVteV9hdHRfeS10aGlzLm5vZGUueVxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICB0aGlzLnNldFRvdWNoUmVjdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRGVzdHJveSgpXHJcbiAgICB7XHJcbiAgICAgICAgLy/lj5bmtojnm5HlkKzop6bmkbjkuovku7ZcclxuICAgICAgICBsZXQgdG91Y2hOb2RlPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgndG91Y2hOb2RlJyk7XHJcbiAgICAgICAgaWYodG91Y2hOb2RlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdG91Y2hOb2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCx0aGlzLm9uVG91Y2hTdGFydCx0aGlzKTtcclxuICAgICAgICAgICAgdG91Y2hOb2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9NT1ZFLHRoaXMub25Ub3VjaE1vdmUsdGhpcyk7XHJcbiAgICAgICAgICAgIHRvdWNoTm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELHRoaXMub25Ub3VjaEVuZCx0aGlzKTtcclxuICAgICAgICAgICAgdG91Y2hOb2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9DQU5DRUwsdGhpcy5vblRvdWNoQ2FuY2VsLHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFsbF9oZXJvLmRlbGV0ZSh0aGlzLmhlcm9fdHlwZSlcclxuICAgIH1cclxuXHJcbiAgICBhZGRTa2lsbFRpcFR5cGUoKXtcclxuICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZSh0aGlzLnByZWZhYl9za2lsbF90aXApOyAgICAgICAgICAgICAgICBcclxuICAgICAgICB0aGlzLnNraWxsX3RpcD1ub2RlLmdldENvbXBvbmVudChTa2lsbFRpcCk7XHJcbiAgICAgICAgdGhpcy5za2lsbF90aXBfdHlwZT10aGlzLnNraWxsX3RpcC5nZXRTa2lsbFRpcFR5cGUoKTtcclxuICAgICAgICB0aGlzLnNraWxsX3RpcC5ub2RlLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICBzd2l0Y2godGhpcy5za2lsbF90aXBfdHlwZSl7XHJcbiAgICAgICAgICAgIGNhc2UgU2tpbGxUaXBUeXBlLkZ1bGw6e1xyXG4gICAgICAgICAgICAgICAgU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFNraWxsVGlwVHlwZS5DaXJjbGU6e1xyXG4gICAgICAgICAgICAgICAgU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFNraWxsVGlwVHlwZS5SZWN0OntcclxuICAgICAgICAgICAgICAgIFNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBTa2lsbFRpcFR5cGUuRGlyOntcclxuICAgICAgICAgICAgICAgIFNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VG91Y2hSZWN0KCl7XHJcbiAgICAgICAgbGV0IHRvdWNoTm9kZT10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3RvdWNoTm9kZScpO1xyXG4gICAgICAgIHRoaXMudG91Y2hfcmVjdD1jYy5yZWN0KHRoaXMubm9kZS54K3RvdWNoTm9kZS54KnRoaXMuc2V0dXBfc2NhbGUtKHRvdWNoTm9kZS53aWR0aCp0aGlzLnNldHVwX3NjYWxlLzIpLHRoaXMubm9kZS55K3RvdWNoTm9kZS55KnRoaXMuc2V0dXBfc2NhbGUtKHRvdWNoTm9kZS5oZWlnaHQqdGhpcy5zZXR1cF9zY2FsZS8yKSx0b3VjaE5vZGUud2lkdGgqdGhpcy5zZXR1cF9zY2FsZSx0b3VjaE5vZGUuaGVpZ2h0KnRoaXMuc2V0dXBfc2NhbGUpO1xyXG4gICAgICAgIC8vIGxldCBnZz1jYy5maW5kKCdDYW52YXMvRmlnaHRpbmdfUm9vdCcpLmdldENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcbiAgICAgICAgLy8gZ2cucmVjdCh0aGlzLnRvdWNoX3JlY3QueCx0aGlzLnRvdWNoX3JlY3QueSx0aGlzLnRvdWNoX3JlY3Qud2lkdGgsdGhpcy50b3VjaF9yZWN0LmhlaWdodCk7XHJcbiAgICAgICAgLy8gZ2cuc3Ryb2tlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0U2tpbGxUaXBTaXplKHdpZHRoOm51bWJlcixoZWlnaHQ6bnVtYmVyKXtcclxuICAgICAgICB0aGlzLnNraWxsX3RpcC5ub2RlLndpZHRoPXdpZHRoO1xyXG4gICAgICAgIHRoaXMuc2tpbGxfdGlwLm5vZGUuaGVpZ2h0PWhlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRTa2lsbFRpcFNpemUoKTpjYy5TaXple1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNraWxsX3RpcC5ub2RlLmdldENvbnRlbnRTaXplKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0b3VjaExpc3Rlbigpe1xyXG4gICAgICAgIC8v55uR5ZCs6Kem5pG45LqL5Lu2XHJcbiAgICAgICAgbGV0IHRvdWNoTm9kZT10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3RvdWNoTm9kZScpO1xyXG4gICAgICAgIGlmKHRvdWNoTm9kZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRvdWNoTm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCx0aGlzLm9uVG91Y2hTdGFydCx0aGlzKTtcclxuICAgICAgICAgICAgdG91Y2hOb2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX01PVkUsdGhpcy5vblRvdWNoTW92ZSx0aGlzKTtcclxuICAgICAgICAgICAgdG91Y2hOb2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCx0aGlzLm9uVG91Y2hFbmQsdGhpcyk7XHJcbiAgICAgICAgICAgIHRvdWNoTm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9DQU5DRUwsdGhpcy5vblRvdWNoQ2FuY2VsLHRoaXMpO1xyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdFBvcygpe1xyXG4gICAgICAgIGxldCB4dWFueXVuPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgneHVhbnl1bicpO1xyXG4gICAgICAgIHRoaXMueHVhbnl1bl9wb3M9eHVhbnl1bi5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgIHh1YW55dW4ucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgICAgIHRoaXMuYnVsbGV0X3Bvcz1uZXcgQXJyYXkoKTtcclxuICAgICAgICBsZXQgYnVsbGV0MT10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2J1bGxldDEnKTtcclxuICAgICAgICBsZXQgYnVsbGV0Mj10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2J1bGxldDInKTsgICAgICAgIFxyXG4gICAgICAgIHRoaXMuYnVsbGV0X3Bvcy5wdXNoKGJ1bGxldDIuZ2V0UG9zaXRpb24oKSk7XHJcbiAgICAgICAgdGhpcy5idWxsZXRfcG9zLnB1c2goYnVsbGV0MS5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICB0aGlzLmJ1bGxldF9wb3MucHVzaChidWxsZXQyLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgIGJ1bGxldDEucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgICAgIGJ1bGxldDIucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uR2FtZVdpbigpe1xyXG4gICAgICAgIHRoaXMuc2tpbGxfcXVldWU9bmV3IEFycmF5KCk7XHJcbiAgICAgICAgdGhpcy5zZXRIZXJvU3RhdGUoSGVyb19TdGF0ZS5pZGxlLEdvbmdKaV9GYW5nWGlhbmcuemhvbmcpO1xyXG4gICAgICAgIHRoaXMuZ29uZ2ppX2ppc2h1PTA7XHJcbiAgICAgICAgaWYodGhpcy53aW5fY2FsbGJhY2spe1xyXG4gICAgICAgICAgICB0aGlzLndpbl9jYWxsYmFjaygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgYWRkU2tpbGxMaXN0ZW4oY2FsbEJhY2s6RnVuY3Rpb24pe1xyXG4gICAgICAgIHRoaXMuc2tpbGxfY2FsbGJhY2s9Y2FsbEJhY2s7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGFkZEF0dGFja0xpc3RlbihjYWxsQmFjazpGdW5jdGlvbil7XHJcbiAgICAgICAgdGhpcy5hdHRhY2tfY2FsbGJhY2s9Y2FsbEJhY2s7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByb3RlY3RlZCBhZGRIaXRMaXN0ZW4oY2FsbEJhY2s6RnVuY3Rpb24pe1xyXG4gICAgICAgIHRoaXMuaGl0X2NhbGxiYWNrPWNhbGxCYWNrO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBhZGRSZXNldExpc3RlbihjYWxsQmFjazpGdW5jdGlvbil7XHJcbiAgICAgICAgdGhpcy5yZXNldF9jYWxsYmFjaz1jYWxsQmFjaztcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgYWRkR2FtZVdpbkxpc3RlbihjYWxsQmFjazpGdW5jdGlvbil7XHJcbiAgICAgICAgdGhpcy53aW5fY2FsbGJhY2s9Y2FsbEJhY2s7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGFkZExvYWRlZExpc3RlbihjYWxsQmFjazpGdW5jdGlvbil7XHJcbiAgICAgICAgdGhpcy5sb2FkZWRfY2FsbGJhY2s9Y2FsbEJhY2s7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBsb2FkTXBQcm9ncmVzcygpXHJcbiAgICB7XHJcbiAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQoJ2hlcm9zL3NraWxsX2ljb24nLGNjLlByZWZhYiwoZXJyb3I6IEVycm9yLCBhc3NldHM6Y2MuUHJlZmFiKT0+e1xyXG4gICAgICAgICAgICBpZihlcnJvcilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBtcE5vZGU9Y2MuaW5zdGFudGlhdGUoYXNzZXRzKTtcclxuICAgICAgICAgICAgbXBOb2RlLnBhcmVudD1jYy5maW5kKCdDYW52YXMvRmlnaHRpbmdfVWknKTtcclxuICAgICAgICAgICAgbXBOb2RlLnNldFBvc2l0aW9uKGNjLnYyKHRoaXMubm9kZS54LHRoaXMubm9kZS55KzE1KSk7XHJcbiAgICAgICAgICAgIHRoaXMubXBfcHJvZ3Jlc3M9bXBOb2RlLmdldENvbXBvbmVudChNcFByb2dyZXNzKTtcclxuICAgICAgICAgICAgdGhpcy5tcF9wcm9ncmVzcy5pbml0KHRoaXMuaGVyb190eXBlKTtcclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VDRCh0aGlzLmhlcm9fZGF0YS5nZXRTa2lsbENvbGREb3duKFNraWxsVHlwZS5BY3RpdmUpLzMpO1xyXG4gICAgICAgICAgICB0aGlzLnNraWxsX3RvdGFsX3RpbWU9dGhpcy5oZXJvX2RhdGEuZ2V0U2tpbGxDb2xkRG93bihTa2lsbFR5cGUuQWN0aXZlKTtcclxuICAgICAgICAgICAgaWYodGhpcy5nZXRIZXJvU3RhdGUoKT09SGVyb19TdGF0ZS5leGl0KXtcclxuICAgICAgICAgICAgICAgIHRoaXMubXBfcHJvZ3Jlc3MuaGlkZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGxvYWRaaGlTaGlRaSh6aGlzaGlxaTpzdHJpbmcsdHlwZTpTa2lsbEluZGljYXRvclR5cGUpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy56aGlzaGlxaV90eXBlPXR5cGU7XHJcbiAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQoJ2hlcm9zLycremhpc2hpcWksY2MuUHJlZmFiLChlcnJvcjogRXJyb3IsIGFzc2V0czpjYy5QcmVmYWIpPT57XHJcbiAgICAgICAgICAgIGlmKGVycm9yKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRMb2FkQnlHYW1lRWZmZWN0SWQoaWQ6R2FtZUVmZmVjdElkLGluaXRDb3VudDpudW1iZXIpeyAgICAgICAgICAgICAgXHJcbiAgICAgICAgaWYoR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRWZmZWN0UG9vbEJ5SWQoaWQsaW5pdENvdW50LCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMuY3VyX2xvYWRfbnVtKys7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuY3VyX2xvYWRfbnVtPj10aGlzLm5lZWRfbG9hZF9udW0pe1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5pc19sb2FkX29rPT1mYWxzZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc19sb2FkX29rPXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgSGVyby5jdXJfbG9hZGVkX251bSsrO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMubG9hZGVkX2NhbGxiYWNrKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkZWRfY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk9PXRydWUpe1xyXG4gICAgICAgICAgICB0aGlzLm5lZWRfbG9hZF9udW0rKzsgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoq5Yqg6L295a6g54mpICovXHJcbiAgICBsb2FkUGV0KCl7XHJcbiAgICAgICAgaWYodGhpcy5oZXJvX2RhdGEucGV0X2lkPjApe1xyXG4gICAgICAgICAgICBsZXQgdHlwZT1TcGlyaXRBdHRyaWJ1dGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3Bpcml0VHlwZSh0aGlzLmhlcm9fZGF0YS5wZXRfaWQpOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5uZWVkX2xvYWRfbnVtKys7XHJcbiAgICAgICAgICAgIGNjLnJlc291cmNlcy5sb2FkKCdwZXQvcGV0Jyt0eXBlLGNjLlByZWZhYiwoZXJyb3I6IEVycm9yLCBhc3NldHM6Y2MuUHJlZmFiKT0+e1xyXG4gICAgICAgICAgICAgICAgaWYoZXJyb3IpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKGFzc2V0cyk7XHJcbiAgICAgICAgICAgICAgICBjYy5maW5kKCdDYW52YXMvUGV0X1Jvb3QnKS5hZGRDaGlsZChub2RlKTsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBzd2l0Y2godHlwZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOntcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wZXQ9bm9kZS5hZGRDb21wb25lbnQoSWNlUGV0KTtcclxuICAgICAgICAgICAgICAgICAgICB9O2JyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjp7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGV0PW5vZGUuYWRkQ29tcG9uZW50KEZpcmVQZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH07YnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOntcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wZXQ9bm9kZS5hZGRDb21wb25lbnQoV2luZFBldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfTticmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBldD1ub2RlLmFkZENvbXBvbmVudChSYXlQZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH07YnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5wZXQuaW5pdCh0aGlzLmhlcm9fZGF0YS5wZXRfaWQsdGhpcy5oZXJvX3R5cGUsY2MudjIodGhpcy5ub2RlLngtNjQsdGhpcy5ub2RlLnkrNjQpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGV0LnNldEhlcm9EYXRhKHRoaXMuaGVyb19kYXRhKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VyX2xvYWRfbnVtKys7XHJcbiAgICAgICAgICAgICAgICBub2RlLnpJbmRleD0xMDAwLW5vZGUueTtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuY3VyX2xvYWRfbnVtPj10aGlzLm5lZWRfbG9hZF9udW0pe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNfbG9hZF9vaz10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIEhlcm8uY3VyX2xvYWRlZF9udW0rKztcclxuICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKirpmpDol4/oi7Hpm4TvvIzmraTml7boi7Hpm4TkuI3og73mlLvlh7vmiJbogIXph4rmlL7mioDog70gKi9cclxuICAgIGhpZGVIZXJvKCl7XHJcbiAgICAgICAgdGhpcy5oZXJvX3N0YXRlPUhlcm9fU3RhdGUuZXhpdDtcclxuICAgICAgICB0aGlzLm5vZGUub3BhY2l0eT0wO1xyXG4gICAgICAgIGlmKHRoaXMubm9kZV9zaGFkb3cpe1xyXG4gICAgICAgICAgICB0aGlzLm5vZGVfc2hhZG93Lm9wYWNpdHk9MDtcclxuICAgICAgICB9ICAgICAgICBcclxuICAgICAgICBpZih0aGlzLm1wX3Byb2dyZXNzKXtcclxuICAgICAgICAgICAgdGhpcy5tcF9wcm9ncmVzcy5oaWRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNob3dIZXJvKCl7XHJcbiAgICAgICAgdGhpcy5zZXRIZXJvU3RhdGUoSGVyb19TdGF0ZS5pZGxlLEdvbmdKaV9GYW5nWGlhbmcuemhvbmcpO1xyXG4gICAgICAgIHRoaXMubm9kZS5vcGFjaXR5PTI1NTtcclxuICAgICAgICB0aGlzLm5vZGVfc2hhZG93Lm9wYWNpdHk9MjU1O1xyXG4gICAgICAgIHRoaXMubXBfcHJvZ3Jlc3Muc2hvdygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLeOAkOearuiCpOOAkS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIHByb3RlY3RlZCBzZXRTa2luKClcclxuICAgIHtcclxuICAgICAgICAvL2xldCBoZXJvUXVhbGl0eT1IZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9RdWFsaXR5KHRoaXMuaGVyb190eXBlKTtcclxuICAgICAgICAvL2xldCB0aWVyPUhlcm9RdWFsaXR5TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFRpZXIoaGVyb1F1YWxpdHkpO1xyXG4gICAgICAgIC8vdGhpcy5zcGluZS5zZXRTa2luKCdzdGFnZScrKEhlcm9NYW5hZ2VyLmdldFNraW5JbmRleCh0aWVyKSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLeaTjeS9nOebuOWFsy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3op6bmkbjkuovku7YtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIG9uVG91Y2hTdGFydChlOmNjLkV2ZW50LkV2ZW50VG91Y2gpe1xyXG4gICAgICAgIGlmKHRoaXMuaXNIYXZlRGVCdWZmKEJ1ZmZJZC5Nb25zdGVyX1h1YW5ZdW4pJiZ0aGlzLmhlcm9fdHlwZSE9SGVyb19UeXBlLlpoZW5EZSl7XHJcbiAgICAgICAgICAgIHRoaXMuaXNfY2FuX3RvdWNoPWZhbHNlO1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDE3MDAwMiksMSk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5za2lsbF9jZF90aW1lPjApe1xyXG4gICAgICAgICAgICB0aGlzLmlzX2Nhbl90b3VjaD1mYWxzZTtcclxuICAgICAgICAgICAgaWYodGhpcy5jbGlja19yZW1haW4+MCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCgxNzAwMDEpLDEpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfc3RhdGUhPUdhbWVTdGF0ZS5HYW1lX1BsYXlpbmcpXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB0aGlzLmlzX2Nhbl90b3VjaD10cnVlO1xyXG4gICAgICAgIHRoaXMuaXNfYXV0b19yZWxlYXNlPXRydWU7XHJcbiAgICAgICAgdGhpcy5jbGlja19yZW1haW49MTtcclxuICAgICAgICBTa2lsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZWxlYXNlU2tpbGxSZXN1bHQoZmFsc2UpO1xyXG4gICAgICAgIGxldCBwb3M9U2t5TWFuYWdlci5nZXRJbnN0YW5jZSgpLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIoZS5nZXRMb2NhdGlvbigpKTsgICAgICAgIFxyXG4gICAgICAgIC8v5aaC5p6c5Y+v5Lul6YeK5pS+77yM5pi+56S65oyH56S65ZmoXHJcbiAgICAgICAgc3dpdGNoKHRoaXMuc2tpbGxfdGlwX3R5cGUpe1xyXG4gICAgICAgICAgICBjYXNlIFNraWxsVGlwVHlwZS5GdWxsOntcclxuICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxfdGlwLm5vZGUuc2V0UG9zaXRpb24oY2MudjIoMCwtY2Mud2luU2l6ZS5oZWlnaHQvMikpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5za2lsbF90aXAubm9kZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNraWxsX3RpcC5zZXRJc0NhblJlbGVhc2UoZmFsc2UpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgU2tpbGxUaXBUeXBlLkNpcmNsZTp7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNraWxsX3RpcC5ub2RlLnNldFBvc2l0aW9uKHBvcyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNraWxsX3RpcC5ub2RlLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5za2lsbF90aXAuc2V0SXNDYW5SZWxlYXNlKGZhbHNlKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFNraWxsVGlwVHlwZS5SZWN0OntcclxuICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxfdGlwLm5vZGUuc2V0UG9zaXRpb24ocG9zKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxfdGlwLm5vZGUuYWN0aXZlPXRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNraWxsX3RpcC5zZXRJc0NhblJlbGVhc2UoZmFsc2UpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgU2tpbGxUaXBUeXBlLkRpcjp7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNraWxsX3RpcC5ub2RlLnNldFBvc2l0aW9uKHRoaXMubm9kZS5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxfdGlwLm5vZGUuYWN0aXZlPXRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNraWxsX3RpcC5zZXRJc0NhblJlbGVhc2UoZmFsc2UpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5pi+56S66IyD5Zu05oyH56S65ZmoXHJcbiAgICAgICAgU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1NraWxsUmFuZ2UodGhpcy5ub2RlLnksdGhpcy5jYXN0aW5nX2Rpc3RhbmNlKTtcclxuICAgIH1cclxuXHJcbiAgICBvblRvdWNoTW92ZShlOmNjLkV2ZW50LkV2ZW50VG91Y2gpe1xyXG4gICAgICAgIGlmKHRoaXMuaXNfY2FuX3RvdWNoPT1mYWxzZXx8R2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zdGF0ZSE9R2FtZVN0YXRlLkdhbWVfUGxheWluZylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGxldCBwb3M9U2t5TWFuYWdlci5nZXRJbnN0YW5jZSgpLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIoZS5nZXRMb2NhdGlvbigpKTsgICAgICAgIFxyXG4gICAgICAgIGlmKCF0aGlzLnRvdWNoX3JlY3QuY29udGFpbnMocG9zKSl7XHJcbiAgICAgICAgICAgIHRoaXMuaXNfYXV0b19yZWxlYXNlPWZhbHNlOyAgXHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICAgICAgc3dpdGNoKHRoaXMuc2tpbGxfdGlwX3R5cGUpe1xyXG4gICAgICAgICAgICBjYXNlIFNraWxsVGlwVHlwZS5GdWxsOntcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgU2tpbGxUaXBUeXBlLkNpcmNsZTp7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNraWxsX3RpcC5ub2RlLnNldFBvc2l0aW9uKHBvcyk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBTa2lsbFRpcFR5cGUuUmVjdDp7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNraWxsX3RpcC5ub2RlLnNldFBvc2l0aW9uKHBvcyk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBTa2lsbFRpcFR5cGUuRGlyOntcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHBvcy55PkdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW5lbXlfYXR0X3kpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgZGlzdGFuY2U9cG9zLnktdGhpcy5ub2RlLnk7XHJcbiAgICAgICAgICAgIGlmKGRpc3RhbmNlPD10aGlzLmNhc3RpbmdfZGlzdGFuY2Upe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5za2lsbF90aXAuc2V0SXNDYW5SZWxlYXNlKHRydWUpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxfdGlwLnNldElzQ2FuUmVsZWFzZShmYWxzZSk7XHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5za2lsbF90aXAuc2V0SXNDYW5SZWxlYXNlKGZhbHNlKTtcclxuICAgICAgICB9ICAgICAgICAgICAgICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBvblRvdWNoRW5kKGU6Y2MuRXZlbnQuRXZlbnRUb3VjaClcclxuICAgIHtcclxuICAgICAgICBTa2lsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZWxlYXNlU2tpbGxSZXN1bHQodHJ1ZSk7XHJcbiAgICAgICAgU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuaGlkZVNraWxsUmFuZ2UoKTtcclxuICAgICAgICB0aGlzLnNraWxsX3RpcC5ub2RlLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICBpZih0aGlzLmlzX2Nhbl90b3VjaD09ZmFsc2V8fEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfc3RhdGUhPUdhbWVTdGF0ZS5HYW1lX1BsYXlpbmcpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBsZXQgcG9zPVNreU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKGUuZ2V0TG9jYXRpb24oKSk7XHJcbiAgICAgICAgLy/liKTmlq3lnZDmoIdcclxuICAgICAgICBpZihwb3MueT5HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmVuZW15X2F0dF95KXtcclxuICAgICAgICAgICAgbGV0IGRpc3RhbmNlPXBvcy55LXRoaXMubm9kZS55O1xyXG4gICAgICAgICAgICBpZihkaXN0YW5jZTw9dGhpcy5jYXN0aW5nX2Rpc3RhbmNlKXtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVsZWFzZVNraWxsKHBvcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgaWYodGhpcy5pc19hdXRvX3JlbGVhc2Upe1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5zdGFydEF1dG9SZWxlYXNlKCk9PWZhbHNlKXtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDE0MDAyMykpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uVG91Y2hDYW5jZWwoZTpjYy5FdmVudC5FdmVudFRvdWNoKVxyXG4gICAge1xyXG4gICAgICAgIFNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlbGVhc2VTa2lsbFJlc3VsdCh0cnVlKTtcclxuICAgICAgICBTa2lsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5oaWRlU2tpbGxSYW5nZSgpO1xyXG4gICAgICAgIHRoaXMuc2tpbGxfdGlwLm5vZGUuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgIGlmKHRoaXMuaXNfY2FuX3RvdWNoPT1mYWxzZXx8R2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zdGF0ZSE9R2FtZVN0YXRlLkdhbWVfUGxheWluZylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGxldCBwb3M9U2t5TWFuYWdlci5nZXRJbnN0YW5jZSgpLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIoZS5nZXRMb2NhdGlvbigpKTtcclxuICAgICAgICBpZihwb3MueT5HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmVuZW15X2F0dF95KXsgICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IGRpc3RhbmNlPXBvcy55LXRoaXMubm9kZS55O1xyXG4gICAgICAgICAgICBpZihkaXN0YW5jZTw9dGhpcy5jYXN0aW5nX2Rpc3RhbmNlKXtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVsZWFzZVNraWxsKHBvcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgaWYodGhpcy5pc19hdXRvX3JlbGVhc2Upe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydEF1dG9SZWxlYXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRBdXRvUmVsZWFzZSgpOmJvb2xlYW57XHJcbiAgICAgICAgLy/mib7mgKrvvIzmib7kuI3liLDlsLHkuI3mlL5cclxuICAgICAgICBsZXQgZW5lbXlzPU1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TW9uc3RlcnNGb3JOZWFyZXN0QnlTa2lsbCgxLHRoaXMubm9kZS55LHRoaXMuY2FzdGluZ19kaXN0YW5jZSk7XHJcbiAgICAgICAgaWYoZW5lbXlzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy/mnIDliY3nmoTmlYzkurpcclxuICAgICAgICAgICAgbGV0IGVuZW15UG9zPWVuZW15c1swXS5nZXRDb21wb25lbnQoTW9uc3RlcikuZ2V0Q2VudGVyUG9zKCk7XHJcbiAgICAgICAgICAgIHRoaXMucmVsZWFzZVNraWxsKGVuZW15UG9zKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoq6Kem5pG455qE5L2N572uICovXHJcbiAgICByZWxlYXNlU2tpbGwodG91Y2hQb3M6Y2MuVmVjMilcclxuICAgIHtcclxuICAgICAgICBpZihHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX3N0YXRlIT1HYW1lU3RhdGUuR2FtZV9QbGF5aW5nKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgICB0aGlzLnVzZV9za2lsbF9udW0rKzsgICAgICAgIFxyXG4gICAgICAgIC8vdGhpcy5tcF9wcm9ncmVzcy5zaG93TGlnaHQoKTtcclxuICAgICAgICBpZih0aGlzLnNraWxsX2NhbGxiYWNrKXtcclxuICAgICAgICAgICAgdGhpcy5za2lsbF9jYWxsYmFjayh0b3VjaFBvcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucmVzZXRDRCgpO1xyXG4gICAgICAgIFRhc2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW1pdFRhc2soVGFza0l0ZW0u6YeK5pS+WOasoeS6uueJqeaKgOiDvSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGdldFNraWxsUmVsZWFzZUlkKCk6bnVtYmVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLmhlcm9fdHlwZSoxMDAwMCt0aGlzLnVzZV9za2lsbF9udW07XHJcbiAgICB9XHJcblxyXG4gICAgLyoq6I635b6X5a2Q5by555Sf5oiQ55qE5L2N572uICovXHJcbiAgICBnZXRDcmVhdGVCdWxsZXRQb3MoKTpjYy5WZWMye1xyXG4gICAgICAgIGxldCBwb3M9dGhpcy5idWxsZXRfcG9zW3RoaXMuY3VyX2Zhbmd4aWFuZ107XHJcbiAgICAgICAgcmV0dXJuIGNjLnYyKHRoaXMubm9kZS54K3Bvcy54KnRoaXMubm9kZS5zY2FsZVgsdGhpcy5ub2RlLnkrcG9zLnkqdGhpcy5ub2RlLnNjYWxlWSk7XHJcbiAgICB9XHJcbiAgICAvKirojrflvpflrZDlvLnnm7jlr7noi7Hpm4TnmoTkvY3nva4gKi9cclxuICAgIGdldEhlcm9CdWxsZXRQb3MoKTpjYy5WZWMye1xyXG4gICAgICAgIHJldHVybiB0aGlzLmJ1bGxldF9wb3NbdGhpcy5jdXJfZmFuZ3hpYW5nXTtcclxuICAgIH1cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3ml6DlsL1idWZmLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgLyoqXHJcbiAgICAgKiDmt7vliqDml6DlsL1idWZmXHJcbiAgICAgKiBAcGFyYW0gZW5kbGVzc0J1ZmYgRW5kbGVzc0J1ZmbnmoTlrp7kvotcclxuICAgICAqL1xyXG4gICAgIC8vICBBZG1pbmlzdHJhdG9yOlxyXG4gICAgLy8gIDEu5pS75Ye75YqbK3glXHJcbiAgICAvLyAgMi7mlLvpgJ8reCVcclxuICAgIC8vICAzLuaatOWHu+WAvCt4XHJcbiAgICAvLyAgNC7mmrTlh7vlop7luYUreCVcclxuICAgIC8vICA1LumYsuW+oeWKmyt4JVxyXG4gICAgLy8gIDYu5pyA5aSn55Sf5ZG95YC8K3glIFxyXG4gICAgLy8gIDcu5q+P56eS5Zue5aSN5pyA5aSn55Sf5ZG95YC8eCVcclxuICAgIC8vICA4Lueri+WNs+WbnuWkjeacgOWkp+eUn+WRveWAvHgl77yI5rOo77ya6K+lYnVmZueUn+aViOWQjueri+WNs+a2iOWkse+8iVxyXG4gICAgLy8gIDku6L+e57ut5pS75Ye7IOamgueOh3glXHJcbiAgICAvLyAgMTAu5Li75Yqo5oqA6IO95Ya35Y205pe26Ze05YeP5bCReCVcclxuICAgIC8vICAxMS7mnIDnu4jkvKTlrrPliqDmiJB4JVxyXG4gICAgYWRkRW5kbGVzc0J1ZmYoZW5kbGVzc0J1ZmY6RW5kbGVzc0J1ZmYpe1xyXG4gICAgICAgIGlmKCF0aGlzLmlzSGF2ZUVuZGxlc3NJZChlbmRsZXNzQnVmZi5pZCkpe1xyXG4gICAgICAgICAgICB0aGlzLm1hcF9lbmRsZXNzX2J1ZmYuc2V0KGVuZGxlc3NCdWZmLmlkLGVuZGxlc3NCdWZmKTtcclxuICAgICAgICAgICAgc3dpdGNoKGVuZGxlc3NCdWZmLnR5cGUpe1xyXG4gICAgICAgICAgICAgICAgY2FzZSBFbmRsZXNzQnVmZlR5cGUuQXR0YWNrOntcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlcm9fZGF0YS50b3RhbF9hdHRhY2srPXRoaXMuaGVyb19kYXRhLmZpeGVkX2F0dGNrKmVuZGxlc3NCdWZmLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBFbmRsZXNzQnVmZlR5cGUuQXR0YWNrU3BlZWQ6e1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlQXR0YWNrU3BlZWQoZW5kbGVzc0J1ZmYudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBFbmRsZXNzQnVmZlR5cGUuQ3JpdFJhdGU6e1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVyb19kYXRhLkNyaXRpY2FsKz1lbmRsZXNzQnVmZi52YWx1ZTtcclxuICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgRW5kbGVzc0J1ZmZUeXBlLkNyaXREYW1hZ2U6e1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVyb19kYXRhLkV4dHJhQ3JpdGljYWwrPWVuZGxlc3NCdWZmLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBFbmRsZXNzQnVmZlR5cGUuRGVmZW5zZTp7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZXJvX2RhdGEudG90YWxfZGVmZW5zZSs9dGhpcy5oZXJvX2RhdGEuZml4X2RlZmVuc2UqZW5kbGVzc0J1ZmYudmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEVuZGxlc3NCdWZmVHlwZS5IZWFsdGhNYXg6e1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVyb19kYXRhLnRvdGFsX2hwKz10aGlzLmhlcm9fZGF0YS5maXhlZF9ocCplbmRsZXNzQnVmZi52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIuWfjuWimeWKoOihgDpcIix0aGlzLmhlcm9fZGF0YS50b3RhbF9ocCx0aGlzLmhlcm9fZGF0YS5maXhlZF9ocCxlbmRsZXNzQnVmZi52YWx1ZSlcclxuICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlZnJlc2hNYWluV2FsbERhdGEoKVxyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBFbmRsZXNzQnVmZlR5cGUuSGVhbHRoU2VjOntcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYnVmZkRhdGE9bmV3IEJ1ZmZEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnVmZkRhdGEuYnVmZl9pZD1CdWZmSWQuV2FsbF9FbmRsZXNzX0FkZF9ocCt0aGlzLmhlcm9fdHlwZTtcclxuICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5idWZmX3R5cGU9QnVmZlR5cGUuR2FpbjtcclxuICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5idWZmX3ZhbHVlPVtlbmRsZXNzQnVmZi52YWx1ZSpXYWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1haW5XYWxsKCkuZ2V0TWF4SHAoKV07XHJcbiAgICAgICAgICAgICAgICAgICAgYnVmZkRhdGEucmVtYWluX3RpbWU9NjY2NjY2NjY7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gYnVmZkRhdGEuZ2FtZV9lZmZlY3RfaWQ9R2FtZUVmZmVjdElkLmNoYW5nX21hb19zaG91X3NraWxsX2FjdGl2ZV8xO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLnJlY292ZXJ5X2ppYW5nZV90aW1lPTE7XHJcbiAgICAgICAgICAgICAgICAgICAgV2FsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYWluV2FsbCgpLmFkZEJ1ZmYoYnVmZkRhdGEpXHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEVuZGxlc3NCdWZmVHlwZS5IZWFsdGhUZWFtQWRkOntcclxuICAgICAgICAgICAgICAgICAgICAvLyBsZXQgaHA9V2FsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYWluV2FsbCgpLmdldEN1ckhwKCkrKGVuZGxlc3NCdWZmLnZhbHVlKldhbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWFpbldhbGwoKS5nZXRNYXhIcCgpKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFdhbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWFpbldhbGwoKS5jaGFuZ2VIcChocClcclxuICAgICAgICAgICAgICAgICAgICAvL+WPiuaXtueUqFxyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBFbmRsZXNzQnVmZlR5cGUuRG91YmxlQXR0YWNrOntcclxuICAgICAgICAgICAgICAgICAgICAvL+i/nue7reaUu+WHuyzkuI3nlKjliqBidWZmXHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEVuZGxlc3NCdWZmVHlwZS5BY3RpdmVTa2lsbENkOntcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNraWxsX3RvdGFsX3RpbWUtPXRoaXMuaGVyb19kYXRhLmdldFNraWxsQ29sZERvd24oU2tpbGxUeXBlLkFjdGl2ZSkqZW5kbGVzc0J1ZmYudmFsdWVcclxuICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgRW5kbGVzc0J1ZmZUeXBlLkFkZERhbWFnZTp7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZXJvX2RhdGEuYWxsX2luY3JlYXNlX2RhbWFnZSs9ZW5kbGVzc0J1ZmYudmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOWIoOmZpOaXoOWwvWJ1ZmZcclxuICAgICAqIEBwYXJhbSBpZCDml6DlsL1idWZmLWlkXHJcbiAgICAgKi9cclxuICAgIHJlbW92ZUVuZGxlc3NCdWZmKGlkOm51bWJlcil7XHJcbiAgICAgICAgaWYoIXRoaXMuaXNIYXZlRW5kbGVzc0lkKGlkKSl7XHJcbiAgICAgICAgICAgIGxldCBlbmRsZXNzQnVmZj10aGlzLm1hcF9lbmRsZXNzX2J1ZmYuZ2V0KGlkKTtcclxuICAgICAgICAgICAgdGhpcy5tYXBfZW5kbGVzc19idWZmLmRlbGV0ZShpZCk7XHJcbiAgICAgICAgICAgIHN3aXRjaChlbmRsZXNzQnVmZi50eXBlKXtcclxuICAgICAgICAgICAgICAgIGNhc2UgRW5kbGVzc0J1ZmZUeXBlLkF0dGFjazp7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZXJvX2RhdGEudG90YWxfYXR0YWNrLT10aGlzLmhlcm9fZGF0YS5maXhlZF9hdHRjayplbmRsZXNzQnVmZi52YWx1ZTtcclxuICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgRW5kbGVzc0J1ZmZUeXBlLkF0dGFja1NwZWVkOntcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZUF0dGFja1NwZWVkKC1lbmRsZXNzQnVmZi52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEVuZGxlc3NCdWZmVHlwZS5Dcml0UmF0ZTp7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZXJvX2RhdGEuQ3JpdGljYWwtPWVuZGxlc3NCdWZmLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBFbmRsZXNzQnVmZlR5cGUuQ3JpdERhbWFnZTp7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZXJvX2RhdGEuRXh0cmFDcml0aWNhbC09ZW5kbGVzc0J1ZmYudmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEVuZGxlc3NCdWZmVHlwZS5EZWZlbnNlOntcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlcm9fZGF0YS50b3RhbF9kZWZlbnNlLT10aGlzLmhlcm9fZGF0YS5maXhfZGVmZW5zZSplbmRsZXNzQnVmZi52YWx1ZTtcclxuICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgRW5kbGVzc0J1ZmZUeXBlLkhlYWx0aE1heDp7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZXJvX2RhdGEudG90YWxfaHAtPXRoaXMuaGVyb19kYXRhLmZpeGVkX2hwKmVuZGxlc3NCdWZmLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBFbmRsZXNzQnVmZlR5cGUuSGVhbHRoU2VjOntcclxuICAgICAgICAgICAgICAgICAgICBXYWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1haW5XYWxsKCkuc3ViQnVmZihCdWZmSWQuV2FsbF9FbmRsZXNzX0FkZF9ocCt0aGlzLmhlcm9fdHlwZSlcclxuICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgRW5kbGVzc0J1ZmZUeXBlLkhlYWx0aFRlYW1BZGQ6e1xyXG5cclxuICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgRW5kbGVzc0J1ZmZUeXBlLkRvdWJsZUF0dGFjazp7XHJcblxyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBFbmRsZXNzQnVmZlR5cGUuQWN0aXZlU2tpbGxDZDp7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5za2lsbF90b3RhbF90aW1lKz10aGlzLmhlcm9fZGF0YS5nZXRTa2lsbENvbGREb3duKFNraWxsVHlwZS5BY3RpdmUpKmVuZGxlc3NCdWZmLnZhbHVlXHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEVuZGxlc3NCdWZmVHlwZS5BZGREYW1hZ2U6e1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVyb19kYXRhLmFsbF9pbmNyZWFzZV9kYW1hZ2UtPWVuZGxlc3NCdWZmLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoq5piv5ZCm5oul5pyJ5LiA5Liq5peg5bC9YnVmZiBpZCAqL1xyXG4gICAgaXNIYXZlRW5kbGVzc0lkKGlkOm51bWJlcik6Ym9vbGVhbntcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIisrKysrKysrXCIsaWQsdGhpcy5tYXBfZW5kbGVzc19idWZmKVxyXG4gICAgICAgIHJldHVybiB0aGlzLm1hcF9lbmRsZXNzX2J1ZmYuaGFzKGlkKTtcclxuICAgIH1cclxuICAgIC8qKuaYr+WQpuaLpeacieS4gOS4quaXoOWwvWJ1ZmYg57G75Z6LICovXHJcbiAgICBnZXRFbmRsZXNzQnlUeXBlKHR5cGU6bnVtYmVyKTpFbmRsZXNzQnVmZntcclxuICAgICAgICBsZXQgYnVmZjpFbmRsZXNzQnVmZj1udWxsO1xyXG4gICAgICAgIHRoaXMubWFwX2VuZGxlc3NfYnVmZi5mb3JFYWNoKCh2LGspPT57XHJcbiAgICAgICAgICAgIGlmKHYudHlwZT09dHlwZSl7XHJcbiAgICAgICAgICAgICAgICBidWZmPXY7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gYnVmZjtcclxuICAgIH1cclxuICAgIC8qKuiOt+W+l+S4gOS4quaXoOWwvWJ1ZmYgKi9cclxuICAgIGdldEVuZGxlc3NCdWZmKGlkOm51bWJlcik6RW5kbGVzc0J1ZmZ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwX2VuZGxlc3NfYnVmZi5nZXQoaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUJVRkYtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIGFkZEJ1ZmYoYnVmZkRhdGE6QnVmZkRhdGEpOiBCdWZmVGltZXIge1xyXG4gICAgICAgIGxldCBidWZmSWQ9YnVmZkRhdGEuYnVmZl9pZDtcclxuICAgICAgICBpZighdGhpcy5pc0hhdmVCdWZmKGJ1ZmZJZCkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL+a3u+WKoGJ1ZmboioLngrnlkoznibnmlYggICAgICAgXHJcbiAgICAgICAgICAgIGxldCBub2RlOmNjLk5vZGU9bnVsbDtcclxuICAgICAgICAgICAgaWYoYnVmZkRhdGEuZ2FtZV9lZmZlY3RfaWQ9PUdhbWVFZmZlY3RJZC5OdWxsKXtcclxuICAgICAgICAgICAgICAgIG5vZGU9bmV3IGNjLk5vZGUoYnVmZkRhdGEuZ2FtZV9lZmZlY3RfaWQudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgbm9kZT1HYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0Rm9yUGFyZW50KGJ1ZmZEYXRhLmdhbWVfZWZmZWN0X2lkLHRoaXMueHVhbnl1bl9wb3MsdGhpcy5ub2RlKTtcclxuICAgICAgICAgICAgICAgIC8vbm9kZS5zY2FsZT10aGlzLm5vZGUud2lkdGgvMjAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8v5re75YqgYnVmZlxyXG4gICAgICAgICAgICBsZXQgYnVmZjpCdWZmVGltZXI9bm9kZS5nZXRDb21wb25lbnQoQnVmZlRpbWVyKTtcclxuICAgICAgICAgICAgaWYoIWJ1ZmYpe1xyXG4gICAgICAgICAgICAgICAgYnVmZj1ub2RlLmFkZENvbXBvbmVudChCdWZmVGltZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJ1ZmYuaW5pdChidWZmRGF0YSk7XHJcbiAgICAgICAgICAgIC8vYnVmZumUgOavgeaXtuWkhOeQhlxyXG4gICAgICAgICAgICBidWZmLmFkZERlc3Ryb3lMaXN0ZW4odGhpcy5vbkJ1ZmZEZXN0b3J5LmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICAvL2J1Zmbmsrvnlpfop6blj5Hml7blpITnkIZcclxuICAgICAgICAgICAgaWYoYnVmZkRhdGEucmVjb3ZlcnlfamlhbmdlX3RpbWU+MCl7XHJcbiAgICAgICAgICAgICAgICBidWZmLmFkZFJlY292ZXJ5TGlzdGVuKHtcclxuICAgICAgICAgICAgICAgICAgICBkb1JlY292ZXJ5OihudW06bnVtYmVyKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBXYWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1haW5XYWxsKCkuY2hhbmdlSHAobnVtKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LGJ1ZmYuZ2V0Rmlyc3RCdWZmVmFsdWUoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5oZXJvX2J1ZmYuc2V0KGJ1ZmZEYXRhLmJ1ZmZfaWQsYnVmZik7XHJcbiAgICAgICAgICAgIG5vZGUuc2NhbGU9MS90aGlzLnNldHVwX3NjYWxlO1xyXG4gICAgICAgICAgICBzd2l0Y2goYnVmZklkKXtcclxuICAgICAgICAgICAgICAgIGNhc2UgQnVmZklkLlBldDNfSmlhU3U6XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJ1ZmZJZC5IZXJvX01laU1vX0dvbmdTdTpcclxuICAgICAgICAgICAgICAgIGNhc2UgQnVmZklkLkhlcm9fWmhlbkRlX0dvbmdzdTpcclxuICAgICAgICAgICAgICAgIGNhc2UgQnVmZklkLkhlcm9fS3VhbmdaaGFuU2hpX0RhWmhhbzpcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZUF0dGFja1NwZWVkKGJ1ZmZEYXRhLmJ1ZmZfdmFsdWVbMF0pO1xyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBCdWZmSWQuSGVyb19DaGFuZ01hb1Nob3dfR29uZ1N1OntcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZUF0dGFja1NwZWVkKGJ1ZmZEYXRhLmJ1ZmZfdmFsdWVbMF0pO1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUuc2V0UG9zaXRpb24oY2MudjIoMCwwKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/mlrDlop7kuIDkuKrog4zlkI7nibnmlYhcclxuICAgICAgICAgICAgICAgICAgICBidWZmLmFkZFRlWGlhbyhHYW1lRWZmZWN0SWQuY2hhbmdfbWFvX3Nob3Vfc2tpbGxfYWN0aXZlXzIsdGhpcy5ub2RlLmdldFBvc2l0aW9uKCksY2MuZmluZCgnQ2FudmFzL0hlcm9fU2hhZG93X1Jvb3QnKSlcclxuICAgICAgICAgICAgICAgIH1icmVhazsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBjYXNlIEJ1ZmZJZC5IZXJvX1poZW5EZV9CYW9KaU1pbmdaaG9uZ0x2OntcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlcm9fZGF0YS5jcml0X2V4Kz1idWZmRGF0YS5idWZmX3ZhbHVlWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVyb19kYXRhLmhpdF9leCs9YnVmZkRhdGEuYnVmZl92YWx1ZVswXTtcclxuICAgICAgICAgICAgICAgIH1icmVhazsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5hZGRCdWZmU3RhdGUoYnVmZklkLGJ1ZmZEYXRhLnJlbWFpbl90aW1lKTtcclxuICAgICAgICAgICAgcmV0dXJuIGJ1ZmY7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGxldCBidWZmPXRoaXMuaGVyb19idWZmLmdldChidWZmSWQpO1xyXG4gICAgICAgICAgICBidWZmLnJlZnJlc2hCdWZmKGJ1ZmZEYXRhKTtcclxuICAgICAgICAgICAgdGhpcy5hZGRCdWZmU3RhdGUoYnVmZklkLGJ1ZmZEYXRhLnJlbWFpbl90aW1lKTsgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gYnVmZjtcclxuICAgICAgICB9ICBcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBzdWJCdWZmKGJ1ZmZJZDogQnVmZklkKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IGJ1ZmY9dGhpcy5oZXJvX2J1ZmYuZ2V0KGJ1ZmZJZCk7XHJcbiAgICAgICAgaWYoYnVmZilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJ1ZmYuZGVzdHJveVNlbGYoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBvbkJ1ZmZEZXN0b3J5KGJ1ZmZEYXRhOkJ1ZmZEYXRhKXtcclxuICAgICAgICB0aGlzLmhlcm9fYnVmZi5kZWxldGUoYnVmZkRhdGEuYnVmZl9pZCk7XHJcbiAgICAgICAgc3dpdGNoKGJ1ZmZEYXRhLmJ1ZmZfaWQpe1xyXG4gICAgICAgICAgICBjYXNlIEJ1ZmZJZC5QZXQzX0ppYVN1OlxyXG4gICAgICAgICAgICBjYXNlIEJ1ZmZJZC5IZXJvX01laU1vX0dvbmdTdTpcclxuICAgICAgICAgICAgY2FzZSBCdWZmSWQuSGVyb19LdWFuZ1poYW5TaGlfRGFaaGFvOlxyXG4gICAgICAgICAgICBjYXNlIEJ1ZmZJZC5IZXJvX1poZW5EZV9Hb25nc3U6XHJcbiAgICAgICAgICAgIGNhc2UgQnVmZklkLkhlcm9fQ2hhbmdNYW9TaG93X0dvbmdTdTp7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZUF0dGFja1NwZWVkKC1idWZmRGF0YS5idWZmX3ZhbHVlWzBdKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEJ1ZmZJZC5IZXJvX1poZW5EZV9CYW9KaU1pbmdaaG9uZ0x2OntcclxuICAgICAgICAgICAgICAgIHRoaXMuaGVyb19kYXRhLmNyaXRfZXgtPWJ1ZmZEYXRhLmJ1ZmZfdmFsdWVbMF07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhlcm9fZGF0YS5oaXRfZXgtPWJ1ZmZEYXRhLmJ1ZmZfdmFsdWVbMF07XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaXNIYXZlQnVmZihidWZmOiBCdWZmSWQpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5oZXJvX2J1ZmYuaGFzKGJ1ZmYpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZUFsbEJ1ZmYoKXtcclxuICAgICAgICB0aGlzLmhlcm9fYnVmZi5mb3JFYWNoKChidWZmOkJ1ZmZUaW1lcik9PntcclxuICAgICAgICAgICAgdGhpcy5zdWJCdWZmKGJ1ZmYuZ2V0QnVmZklkKCkpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICBcclxuICAgIGFkZERlQnVmZihidWZmRGF0YTpCdWZmRGF0YSxpbnNpZ2h0Om51bWJlcj0wKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYoIXRoaXMuaXNIYXZlRGVCdWZmKGJ1ZmZEYXRhLmJ1ZmZfaWQpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy/mjqfliLbnsbvnmoRkZWJ1ZmbpnIDopoHmoLnmja7pn6fmgKfmnaXlrp7njrDlhbfkvZPnmoTmlYjmnpxcclxuICAgICAgICAgICAgaWYoYnVmZkRhdGEuYnVmZl90eXBlPT1CdWZmVHlwZS5WZXJ0aWdvKXtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuY3VyX3RvdWdobmVzcz49MSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5oZXJvX3R5cGUhPUhlcm9fVHlwZS5aaGVuRGUpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubXBfcHJvZ3Jlc3Muc2V0RGlzYWJsZSh0cnVlKTsgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIFNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmhpZGVTa2lsbFJhbmdlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5za2lsbF90aXAubm9kZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMuZ29uZ2ppX2ppc2h1PTA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNwaW5lLnBhdXNlZD10cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc19jYW5fdG91Y2g9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBpZihpbnNpZ2h0PjApe1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLnJlbWFpbl90aW1lPUluanVyZWREYXRhLmNhbGNDb250cm9sVGltZShidWZmRGF0YS5yZW1haW5fdGltZSx0aGlzLmN1cl90b3VnaG5lc3MsaW5zaWdodCk7XHJcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy54dWFueXVuX2NhbGxiYWNrKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnh1YW55dW5fY2FsbGJhY2sodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBXYWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1haW5XYWxsKCkuc2hvd1ZlcnRpZ28oYnVmZkRhdGEucmVtYWluX3RpbWUpO1xyXG4gICAgICAgICAgICAgICAgLy/lhbPpl63ml7blgZxcclxuICAgICAgICAgICAgICAgIFNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldFRpbWVTdG9wKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIFNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldElzU2tpbGxTdGF0ZShmYWxzZSk7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8v5re75YqgYnVmZuiKgueCueWSjOeJueaViCAgICAgICBcclxuICAgICAgICAgICAgbGV0IG5vZGU6Y2MuTm9kZT1udWxsO1xyXG4gICAgICAgICAgICBpZihidWZmRGF0YS5nYW1lX2VmZmVjdF9pZD09R2FtZUVmZmVjdElkLk51bGwpe1xyXG4gICAgICAgICAgICAgICAgbm9kZT1uZXcgY2MuTm9kZShidWZmRGF0YS5nYW1lX2VmZmVjdF9pZC50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBub2RlPUdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RGb3JQYXJlbnQoYnVmZkRhdGEuZ2FtZV9lZmZlY3RfaWQsdGhpcy54dWFueXVuX3Bvcyx0aGlzLm5vZGUpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5zY2FsZT10aGlzLm5vZGUud2lkdGgvMjAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8v5re75YqgYnVmZlxyXG4gICAgICAgICAgICBsZXQgYnVmZjpCdWZmVGltZXI9bm9kZS5nZXRDb21wb25lbnQoQnVmZlRpbWVyKTtcclxuICAgICAgICAgICAgaWYoIWJ1ZmYpe1xyXG4gICAgICAgICAgICAgICAgYnVmZj1ub2RlLmFkZENvbXBvbmVudChCdWZmVGltZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJ1ZmYuaW5pdChidWZmRGF0YSk7XHJcbiAgICAgICAgICAgIC8vYnVmZumUgOavgeaXtuWkhOeQhlxyXG4gICAgICAgICAgICBidWZmLmFkZERlc3Ryb3lMaXN0ZW4odGhpcy5vbkRlQnVmZkRlc3RvcnkuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgIHRoaXMuaGVyb19kZWJ1ZmYuc2V0KGJ1ZmZEYXRhLmJ1ZmZfaWQsYnVmZik7XHJcbiAgICAgICAgICAgIG5vZGUuc2NhbGU9MS90aGlzLnNldHVwX3NjYWxlO1xyXG4gICAgICAgICAgICBzd2l0Y2goYnVmZkRhdGEuYnVmZl9pZCl7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJ1ZmZJZC5Cb3NzNl9Ta2lsbF8yX2ppYW5nb25nc3U6XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJ1ZmZJZC5Cb3NzM19KSUFOX0dvbmdTdTp7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VBdHRhY2tTcGVlZCgtYnVmZkRhdGEuYnVmZl92YWx1ZVswXSk7XHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJ1ZmZJZC5Cb3NzOF9Ta2lsbF8yX2F0dGFjazp7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZXJvX2RhdGEudG90YWxfYXR0YWNrLT1idWZmRGF0YS5idWZmX3ZhbHVlWzBdKnRoaXMuaGVyb19kYXRhLmZpeGVkX2F0dGNrO1xyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuYWRkRGVCdWZmU3RhdGUoYnVmZkRhdGEuYnVmZl9pZCxidWZmRGF0YS5yZW1haW5fdGltZSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgIGxldCBidWZmPXRoaXMuaGVyb19kZWJ1ZmYuZ2V0KGJ1ZmZEYXRhLmJ1ZmZfaWQpO1xyXG4gICAgICAgICAgIGJ1ZmYucmVmcmVzaEJ1ZmYoYnVmZkRhdGEpO1xyXG4gICAgICAgICAgIHRoaXMuYWRkRGVCdWZmU3RhdGUoYnVmZkRhdGEuYnVmZl9pZCxidWZmRGF0YS5yZW1haW5fdGltZSk7XHJcbiAgICAgICAgICAgc3dpdGNoKGJ1ZmZEYXRhLmJ1ZmZfaWQpe1xyXG4gICAgICAgICAgICBjYXNlIEJ1ZmZJZC5Cb3NzNl9Ta2lsbF8yX2ppYW5nb25nc3U6XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKGJ1ZmYuZ2V0Rmxvb3JOdW0oKTxidWZmRGF0YS5tYXhfZmxvb3Ipe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlQXR0YWNrU3BlZWQoLWJ1ZmZEYXRhLmJ1ZmZfdmFsdWVbMF0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDljrvpmaTkuIDkuKpkZWJ1ZmZcclxuICAgICAqIEBwYXJhbSBidWZmIGRlYnVmZuexu+Wei1xyXG4gICAgICogQHBhcmFtIGlzTmVlZFJlY3ljbGUg5piv5ZCm6ZyA6KaB6LCD55So5Zue5pS2XHJcbiAgICAgKiBAcmV0dXJucyBcclxuICAgICAqL1xyXG4gICAgc3ViRGVCdWZmKGJ1ZmZJZDogQnVmZklkKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IGJ1ZmY9dGhpcy5oZXJvX2RlYnVmZi5nZXQoYnVmZklkKTtcclxuICAgICAgICBpZihidWZmKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYnVmZi5kZXN0cm95U2VsZigpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRGVCdWZmRGVzdG9yeShidWZmRGF0YTpCdWZmRGF0YSl7XHJcbiAgICAgICAgLy8gbGV0IGJ1ZmZTdGF0ZT10aGlzLm1hcF9kZWJ1ZmZfc3RhdGUuZ2V0KEJ1ZmZTdGF0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXREZUJ1ZmZUeXBlKGJ1ZmZEYXRhLmJ1ZmZfaWQpKTtcclxuICAgICAgICAvLyBpZihidWZmU3RhdGUpe1xyXG4gICAgICAgIC8vICAgICBidWZmU3RhdGUuZGVzdHJveVNlbGYoKTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgdGhpcy5oZXJvX2RlYnVmZi5kZWxldGUoYnVmZkRhdGEuYnVmZl9pZCk7XHJcbiAgICAgICAgc3dpdGNoKGJ1ZmZEYXRhLmJ1ZmZfaWQpeyAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNhc2UgQnVmZklkLk1vbnN0ZXJfWHVhbll1bjp7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmhlcm9fdHlwZSE9SGVyb19UeXBlLlpoZW5EZSkgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tcF9wcm9ncmVzcy5zZXREaXNhYmxlKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ29uZ2ppX2ppc2h1PTA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNwaW5lLnBhdXNlZD1mYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNfY2FuX3RvdWNoPXRydWU7XHJcbiAgICAgICAgICAgICAgICBXYWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1haW5XYWxsKCkuaGlkZVZlcnRpZ28oKTtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMueHVhbnl1bl9jYWxsYmFjayl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy54dWFueXVuX2NhbGxiYWNrKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEJ1ZmZJZC5Cb3NzM19KSUFOX0dvbmdTdTp7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZUF0dGFja1NwZWVkKGJ1ZmZEYXRhLmJ1ZmZfdmFsdWVbMF0pO1xyXG4gICAgICAgICAgICAgICAgbGV0IGJ1ZmZTdGF0ZT10aGlzLm1hcF9kZWJ1ZmZfc3RhdGUuZ2V0KEJ1ZmZTdGF0ZVR5cGUuQXR0YWNrU3BlZWQpO1xyXG4gICAgICAgICAgICAgICAgaWYoYnVmZlN0YXRlKXtcclxuICAgICAgICAgICAgICAgICAgICBidWZmU3RhdGUuZGVzdHJveVNlbGYoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEJ1ZmZJZC5Cb3NzNl9Ta2lsbF8yX2ppYW5nb25nc3U6e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VBdHRhY2tTcGVlZChidWZmRGF0YS5idWZmX3ZhbHVlWzBdKmJ1ZmZEYXRhLmN1cl9mbG9vcik7XHJcbiAgICAgICAgICAgICAgICBsZXQgYnVmZlN0YXRlPXRoaXMubWFwX2RlYnVmZl9zdGF0ZS5nZXQoQnVmZlN0YXRlVHlwZS5BdHRhY2tTcGVlZCk7XHJcbiAgICAgICAgICAgICAgICBpZihidWZmU3RhdGUpe1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZTdGF0ZS5kZXN0cm95U2VsZigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQnVmZklkLkJvc3M4X1NraWxsXzJfYXR0YWNrOntcclxuICAgICAgICAgICAgICAgIHRoaXMuaGVyb19kYXRhLnRvdGFsX2F0dGFjays9YnVmZkRhdGEuYnVmZl92YWx1ZVswXSp0aGlzLmhlcm9fZGF0YS5maXhlZF9hdHRjaztcclxuICAgICAgICAgICAgICAgIGxldCBidWZmU3RhdGU9dGhpcy5tYXBfZGVidWZmX3N0YXRlLmdldChCdWZmU3RhdGVUeXBlLkF0dGFjayk7XHJcbiAgICAgICAgICAgICAgICBpZihidWZmU3RhdGUpe1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZTdGF0ZS5kZXN0cm95U2VsZigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBpc0hhdmVEZUJ1ZmYoYnVmZklkOiBCdWZmSWQpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5oZXJvX2RlYnVmZi5oYXMoYnVmZklkKTtcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVBbGxEZUJ1ZmYoKXtcclxuICAgICAgICB0aGlzLmhlcm9fZGVidWZmLmZvckVhY2goKHYsayk9PntcclxuICAgICAgICAgICAgdGhpcy5zdWJEZUJ1ZmYodi5nZXRCdWZmSWQoKSlcclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBnZXRHYW1lRWZmZWN0SWRCeURlYnVmZihidWZmOiBIZXJvX0RlQnVmZik6R2FtZUVmZmVjdElke1xyXG4gICAgICAgIGxldCBnYW1lRWZmZWN0SWQ9R2FtZUVmZmVjdElkLk51bGw7XHJcbiAgICAgICAgc3dpdGNoKGJ1ZmYpe1xyXG4gICAgICAgICAgICBjYXNlIEhlcm9fRGVCdWZmLlh1YW5ZdW46e1xyXG4gICAgICAgICAgICAgICAgZ2FtZUVmZmVjdElkPUdhbWVFZmZlY3RJZC54dWFueXVuO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBnYW1lRWZmZWN0SWQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0R2FtZUVmZmVjdE5hbWVCeURlYnVmZihidWZmOiBIZXJvX0RlQnVmZik6c3RyaW5ne1xyXG4gICAgICAgIGxldCBuYW1lPScwJztcclxuICAgICAgICBzd2l0Y2goYnVmZil7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjYXNlIEhlcm9fRGVCdWZmLlh1YW5ZdW46e1xyXG4gICAgICAgICAgICAgICAgbmFtZT1HYW1lRWZmZWN0SWQueHVhbnl1bisnJztcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRYdWFuWXVuTGlzdGVuKGNhbGxiYWNrOkZ1bmN0aW9uKXtcclxuICAgICAgICB0aGlzLnh1YW55dW5fY2FsbGJhY2s9Y2FsbGJhY2s7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzZXRTdGF0ZSgpe1xyXG4gICAgICAgIHRoaXMuc2V0Q0QoMS8zKTtcclxuICAgICAgICB0aGlzLnJlbW92ZUFsbEJ1ZmYoKTtcclxuICAgICAgICB0aGlzLnJlbW92ZUFsbERlQnVmZigpO1xyXG4gICAgICAgIHRoaXMubWFwX2J1ZmZfc3RhdGUuZm9yRWFjaCgodixrKT0+e1xyXG4gICAgICAgICAgICB2LmRlc3Ryb3lTZWxmKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5tYXBfZGVidWZmX3N0YXRlLmZvckVhY2goKHYsayk9PntcclxuICAgICAgICAgICAgdi5kZXN0cm95U2VsZigpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmKHRoaXMucmVzZXRfY2FsbGJhY2spe1xyXG4gICAgICAgICAgICB0aGlzLnJlc2V0X2NhbGxiYWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5ZCM5q2l5pWw5o2u5L+h5oGvXHJcbiAgICAgICAgdGhpcy5oZXJvX2RhdGE9R2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nYW1lX2hlcm9fZGF0YS5nZXQodGhpcy5oZXJvX3R5cGUpOyAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoq5re75Yqg5LiA5LiqYnVmZueKtuaAgeWbvuaghyAqL1xyXG4gICAgYWRkQnVmZlN0YXRlKGJ1ZmZJZDpCdWZmSWQscmVtYWluVGltZTpudW1iZXIpe1xyXG4gICAgICAgIGxldCB0eXBlcz1CdWZmU3RhdGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0QnVmZlR5cGUoYnVmZklkKTtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTx0eXBlcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCB0eXBlPXR5cGVzW2ldO1xyXG4gICAgICAgICAgICBpZih0aGlzLm1hcF9idWZmX3N0YXRlLmhhcyh0eXBlKSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hcF9idWZmX3N0YXRlLmdldCh0eXBlKS5yZWZyZXNoVGltZShyZW1haW5UaW1lKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBsZXQgYmZTdGF0ZT1CdWZmU3RhdGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlQnVmZlN0YXRlKHR5cGUsdGhpcy5oZXJvX3R5cGUpO1xyXG4gICAgICAgICAgICAgICAgYmZTdGF0ZS5pbml0KHR5cGUscmVtYWluVGltZSx0aGlzLm9uQnVmZlN0YXRlRGVzdG9yeS5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFwX2J1ZmZfc3RhdGUuc2V0KHR5cGUsYmZTdGF0ZSk7XHJcbiAgICAgICAgICAgICAgICAvL3RoaXMubm9kZS5hZGRDaGlsZChzaGllbGQubm9kZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25CdWZmU3RhdGVEZXN0b3J5KHR5cGU6QnVmZlN0YXRlVHlwZSl7XHJcbiAgICAgICAgdGhpcy5tYXBfYnVmZl9zdGF0ZS5kZWxldGUodHlwZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5re75Yqg5LiA5LiqYnVmZueKtuaAgeWbvuaghyAqL1xyXG4gICAgYWRkRGVCdWZmU3RhdGUoYnVmZklkOkJ1ZmZJZCxyZW1haW5UaW1lOm51bWJlcil7XHJcbiAgICAgICAgbGV0IHR5cGVzPUJ1ZmZTdGF0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXREZUJ1ZmZUeXBlKGJ1ZmZJZCk7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8dHlwZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgdHlwZT10eXBlc1tpXTtcclxuICAgICAgICAgICAgaWYodGhpcy5tYXBfZGVidWZmX3N0YXRlLmhhcyh0eXBlKSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hcF9kZWJ1ZmZfc3RhdGUuZ2V0KHR5cGUpLnJlZnJlc2hUaW1lKHJlbWFpblRpbWUpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGxldCBiZlN0YXRlPUJ1ZmZTdGF0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVEZUJ1ZmZTdGF0ZSh0eXBlLHRoaXMuaGVyb190eXBlKTtcclxuICAgICAgICAgICAgICAgIGJmU3RhdGUuaW5pdCh0eXBlLHJlbWFpblRpbWUsdGhpcy5vbkRlQnVmZlN0YXRlRGVzdG9yeS5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFwX2RlYnVmZl9zdGF0ZS5zZXQodHlwZSxiZlN0YXRlKTtcclxuICAgICAgICAgICAgICAgIC8vdGhpcy5ub2RlLmFkZENoaWxkKHNoaWVsZC5ub2RlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkRlQnVmZlN0YXRlRGVzdG9yeSh0eXBlOkJ1ZmZTdGF0ZVR5cGUpe1xyXG4gICAgICAgIHRoaXMubWFwX2RlYnVmZl9zdGF0ZS5kZWxldGUodHlwZSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKuiuvue9ruaUu+mAn++8jOavj+enkuaUu+WHu+asoeaVsCAqL1xyXG4gICAgcHJpdmF0ZSBzZXRBdHRhY2tTcGVlZChudW1TZWM6bnVtYmVyKXtcclxuICAgICAgICB0aGlzLmdvbmdqaV9zdWR1PW51bVNlYztcclxuICAgICAgICBpZihudW1TZWM+MTApe1xyXG4gICAgICAgICAgICBudW1TZWM9MTA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKG51bVNlYzwwLjEpe1xyXG4gICAgICAgICAgICBudW1TZWM9MC4xO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmhlcm9fZGF0YS5nb25namlfamlhbmdlPTEvbnVtU2VjO1xyXG4gICAgfVxyXG4gICAgLyoq5pS55Y+Y5b2T5YmN5pS76YCfLGJ1ZmZEYXRhOuavlOeOhyAqL1xyXG4gICAgcHJpdmF0ZSBjaGFuZ2VBdHRhY2tTcGVlZChyYXRlOm51bWJlcil7XHJcbiAgICAgICAgbGV0IGdqc2Q9dGhpcy5nZXRBdHRhY2tTcGVlZCgpO1xyXG4gICAgICAgIGdqc2QrPShyYXRlKSooMS90aGlzLmhlcm9fZGF0YS5iYXNlX2ppYW5nZSk7XHJcbiAgICAgICAgdGhpcy5zZXRBdHRhY2tTcGVlZChnanNkKTtcclxuICAgIH1cclxuICAgIC8qKuiOt+W+l+W9k+WJjeaUu+mAnyAqL1xyXG4gICAgcHJpdmF0ZSBnZXRBdHRhY2tTcGVlZCgpOm51bWJlcntcclxuICAgICAgICByZXR1cm4gMS90aGlzLmhlcm9fZGF0YS5nb25namlfamlhbmdlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t54q25oCBLOWKqOeUuy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIHB1YmxpYyBzZXRIZXJvU3RhdGUoc3RhdGU6SGVyb19TdGF0ZSxmYW5neGlhbmc6R29uZ0ppX0ZhbmdYaWFuZyxkYXRhPzpLZXlGcmFtZURhdGFbXSxlbmRDYWxsYmFjaz86RnVuY3Rpb24pXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5oZXJvX3N0YXRlPXN0YXRlO1xyXG4gICAgICAgIHRoaXMuY3VyX2Zhbmd4aWFuZz1mYW5neGlhbmc7XHJcbiAgICAgICAgc3dpdGNoKHRoaXMuY3VyX2Zhbmd4aWFuZyl7XHJcbiAgICAgICAgICAgIGNhc2UgR29uZ0ppX0ZhbmdYaWFuZy56dW86e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnNjYWxlWD0tdGhpcy5zZXR1cF9zY2FsZTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdvbmdKaV9GYW5nWGlhbmcuemhvbmc6e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnNjYWxlWD10aGlzLnNldHVwX3NjYWxlO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR29uZ0ppX0ZhbmdYaWFuZy55b3U6e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnNjYWxlWD10aGlzLnNldHVwX3NjYWxlO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5pKt5pS+5Yqo55S7XHJcbiAgICAgICAgc3dpdGNoKHRoaXMuaGVyb19zdGF0ZSl7XHJcbiAgICAgICAgICAgIGNhc2UgSGVyb19TdGF0ZS5pZGxlOntcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheVNwaW5lQW5pbWF0aW9uKHRoaXMuZ2V0U3BpbmVOYW1lKCksdHJ1ZSxudWxsLG51bGwpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgSGVyb19TdGF0ZS5hdHRhY2s6e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5U3BpbmVBbmltYXRpb24odGhpcy5nZXRTcGluZU5hbWUoKSxmYWxzZSxkYXRhLGVuZENhbGxiYWNrKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEhlcm9fU3RhdGUuc2tpbGw6XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheVNwaW5lQW5pbWF0aW9uKHRoaXMuZ2V0U3BpbmVOYW1lKCksZmFsc2UsZGF0YSxlbmRDYWxsYmFjayk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHNldEhlcm9TdGF0ZUFuZEFuaW1hdGlvbihzdGF0ZTpIZXJvX1N0YXRlLG5hbWU6c3RyaW5nLGxvb3A6Ym9vbGVhbixkYXRhPzpLZXlGcmFtZURhdGFbXSxlbmRDYWxsYmFjaz86RnVuY3Rpb24pe1xyXG4gICAgICAgIHRoaXMuaGVyb19zdGF0ZT1zdGF0ZTtcclxuICAgICAgICB0aGlzLnBsYXlTcGluZUFuaW1hdGlvbihuYW1lLGxvb3AsZGF0YSxlbmRDYWxsYmFjayk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SGVyb1N0YXRlKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaGVyb19zdGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKirmoLnmja7mlYzkurrkvY3nva7ojrflvpfmlLvlh7vmlrnlkJEgKi9cclxuICAgIHByb3RlY3RlZCBnZXRGYW5nWGlhbmdCeVBvcyhwb3M6Y2MuVmVjMik6R29uZ0ppX0ZhbmdYaWFuZ1xyXG4gICAge1xyXG4gICAgICAgIC8v5a+55pWM5Lq65Y2V5L2N6L+b6KGM5pa55ZCR5Yik5pat77yM56Gu5a6a5omT5Ye75pa55ZCRXHJcbiAgICAgICAgbGV0IGZhbmd4aWFuZz1Hb25nSmlfRmFuZ1hpYW5nLnpob25nO1xyXG4gICAgICAgIGxldCBvZmZzZXRQb3M9cG9zLnN1Yih0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKSk7XHJcbiAgICAgICAgbGV0IHBpMj1NYXRoLlBJKjI7XHJcbiAgICAgICAgbGV0IHJhZGlhbj0oTWF0aC5hdGFuMihvZmZzZXRQb3MueSxvZmZzZXRQb3MueCkrcGkyKSVwaTI7XHJcbiAgICAgICAgbGV0IGFuZ2xlPTE4MCpyYWRpYW4vTWF0aC5QSTtcclxuICAgICAgICBpZihhbmdsZTw9NjApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmYW5neGlhbmc9R29uZ0ppX0ZhbmdYaWFuZy55b3U7XHJcbiAgICAgICAgfWVsc2UgaWYoYW5nbGU+NjAgJiYgYW5nbGU8MTIwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmFuZ3hpYW5nPUdvbmdKaV9GYW5nWGlhbmcuemhvbmc7XHJcbiAgICAgICAgfWVsc2UgaWYoYW5nbGU+PTEyMCAmJiBhbmdsZTw9MTgwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmFuZ3hpYW5nPUdvbmdKaV9GYW5nWGlhbmcuenVvO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFuZ3hpYW5nO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFNwaW5lTmFtZSgpOnN0cmluZ3tcclxuICAgICAgICBzd2l0Y2godGhpcy5oZXJvX3N0YXRlKXtcclxuICAgICAgICAgICAgY2FzZSBIZXJvX1N0YXRlLmF0dGFjazp7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSGVyb19TdGF0ZV9OYW1lLkF0dGFjaztcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEhlcm9fU3RhdGUuc2tpbGw6e1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEhlcm9fU3RhdGVfTmFtZS5Ta2lsbDtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEhlcm9fU3RhdGUuaWRsZTp7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSGVyb19TdGF0ZV9OYW1lLklkbGU7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOaSreaUvuS4gOS4qumqqOmqvOWKqOeUu1xyXG4gICAgICogQHBhcmFtIG5hbWUg6aqo6aq85Yqo55S75ZCN56ewXHJcbiAgICAgKiBAcGFyYW0gaXNMb29wIOaYr+WQpuW+queOr1xyXG4gICAgICogQHBhcmFtIGRhdGEg5piv5ZCm55uR5ZCs5YWz6ZSu5bin77yM5YWz6ZSu5bin5pWw5o2u5YyF5ZCr5YWz6ZSu5bin5ZCN56ew77yM55uR5ZCs5Yiw5YWz6ZSu5bin5ZCO55qE5Zue6LCDXHJcbiAgICAgKiBAcGFyYW0gZW5kQ2FsbGJhY2sg5pKt5pS+57uT5p2f5ZCO55qE5Zue6LCDXHJcbiAgICAgKi9cclxuICAgICBwbGF5U3BpbmVBbmltYXRpb24obmFtZTpzdHJpbmcsaXNMb29wOmJvb2xlYW49ZmFsc2UsZGF0YT86S2V5RnJhbWVEYXRhW10sZW5kQ2FsbGJhY2s/OkZ1bmN0aW9uKXsgICAgICAgIFxyXG4gICAgICAgIGxldCBhbmltYT10aGlzLnNwaW5lLnNldEFuaW1hdGlvbigwLG5hbWUsaXNMb29wKTtcclxuICAgICAgICBpZihkYXRhKXtcclxuICAgICAgICAgICAgdGhpcy5zcGluZS5zZXRUcmFja0V2ZW50TGlzdGVuZXIoYW5pbWEsKGVudHJ5OiBzcC5zcGluZS5UcmFja0VudHJ5LCBldmVudCkgPT57XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxkYXRhLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgICAgICBpZihldmVudC5kYXRhLm5hbWU9PWRhdGFbaV0ubmFtZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFbaV0uY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGVuZENhbGxiYWNrKXtcclxuICAgICAgICAgICAgdGhpcy5zcGluZS5zZXRUcmFja0NvbXBsZXRlTGlzdGVuZXIoYW5pbWEsKGVudHJ5OiBzcC5zcGluZS5UcmFja0VudHJ5LCBldmVudCkgPT57XHJcbiAgICAgICAgICAgICAgICBhbmltYS5saXN0ZW5lcj1udWxsOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGVuZENhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgICAgIFxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1DRC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgcHVibGljIHJlc2V0U2tpbGwoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuc2tpbGxfY2RfdGltZT0wO1xyXG4gICAgICAgIHRoaXMuc2hvd0NEKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlc2V0Q0QoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuc2tpbGxfY2RfdGltZT10aGlzLnNraWxsX3RvdGFsX3RpbWU7XHJcbiAgICAgICAgdGhpcy5zaG93Q0QoKTtcclxuICAgICAgICAvL+mHiuaUvuS6huaKgOiDve+8jOeri+mprOWHj+WOu01QXHJcbiAgICAgICAgLy9HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLndhbGxfZGF0YS5jaGFuZ2VNcCgtdGhpcy5oZXJvX2RhdGEuY29zdF9tcCk7XHJcbiAgICB9XHJcbiAgICAvKirnmb7liIbmr5QgKi9cclxuICAgIHB1YmxpYyBzZXRDRChwZXJUaW1lOm51bWJlcil7XHJcbiAgICAgICAgdGhpcy5za2lsbF9jZF90aW1lPXBlclRpbWUqdGhpcy5oZXJvX2RhdGEuZ2V0U2tpbGxDb2xkRG93bihTa2lsbFR5cGUuQWN0aXZlKTs7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VDRCgwKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2hhbmdlQ0QodGltZTpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5za2lsbF9jZF90aW1lKz10aW1lO1xyXG4gICAgICAgIGlmKHRoaXMuc2tpbGxfY2RfdGltZTw9MClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuc2tpbGxfY2RfdGltZT0wO1xyXG4gICAgICAgICAgICBpZih0aGlzLm1wX3Byb2dyZXNzKXtcclxuICAgICAgICAgICAgICAgIHRoaXMubXBfcHJvZ3Jlc3Muc2V0Tm9ybWFsU1AoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmF1dG9fZmlnaHRpbmcmJkdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfc3RhdGU9PUdhbWVTdGF0ZS5HYW1lX1BsYXlpbmcgJiYgdGhpcy5nZXRJc0NhblNraWxsKCkgJiYgU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SXNTa2lsbFN0YXRlKCk9PWZhbHNlKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRBdXRvUmVsZWFzZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8v5pi+56S66JKZ5p2/5ZKM5YCS6K6h5pe2XHJcbiAgICAgICAgICAgIGlmKHRoaXMubXBfcHJvZ3Jlc3Mpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tcF9wcm9ncmVzcy5zZXRDRFNQKCk7XHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zaG93Q0QoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNob3dDRCgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5tcF9wcm9ncmVzcylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCBwcm9ncmVzcz0xLXRoaXMuc2tpbGxfY2RfdGltZS90aGlzLnNraWxsX3RvdGFsX3RpbWU7XHJcbiAgICAgICAgICAgIHRoaXMubXBfcHJvZ3Jlc3Muc2V0UHJvZ3Jlc3MocHJvZ3Jlc3MpO1xyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGdldElzQ2FuU2tpbGwoKTpib29sZWFuXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5pc0hhdmVEZUJ1ZmYoQnVmZklkLk1vbnN0ZXJfWHVhbll1bil8fHRoaXMuZ2V0SGVyb1N0YXRlKCk9PUhlcm9fU3RhdGUuZXhpdCl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5pc19zaG93X21wX2hpbnQ9ZmFsc2U7XHJcbiAgICAgICAgaWYodGhpcy5za2lsbF9jZF90aW1lPD0wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5pc19uZWVkX2NoZWNrX2Rpc3RhbmNlKXtcclxuICAgICAgICAgICAgICAgIC8v5aaC5p6c6ZyA6KaB5Yik5pat6YeK5pS+6Led56a755qE77yM5YiZ6ZyA6KaB5Yik5pat6YeK5pS+6Led56a75YaF5pyJ5rKh5pyJ5oCq54mp77yM5rKh5pyJ5YiZ6L+U5ZueZmFsc2VcclxuICAgICAgICAgICAgICAgIGxldCBlbmVteXM9TW9uc3Rlck1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNb25zdGVyc0Zvck5lYXJlc3RCeVNraWxsKHRoaXMubWF4X2dvbmdqaV9udW0sdGhpcy5ub2RlLnksdGhpcy5jYXN0aW5nX2Rpc3RhbmNlKTtcclxuICAgICAgICAgICAgICAgIGlmKGVuZW15cz09bnVsbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIGRhbWFnZSDmnKzmrKHkuI3mmrTlh7vnmoTkvKTlrrPlgLxcclxuICAgICAqIEBwYXJhbSBpc0J1bGxldCDmmK/lkKblrZDlvLnnsbvlnotcclxuICAgICAqIEBwYXJhbSBza2lsbFR5cGUg5oqA6IO957G75Z6LXHJcbiAgICAgKiBAcGFyYW0gc2tpbGxSYXRlIOWmguaenOaYr+aKgOiDve+8jOaKgOiDveeahOavlOeOh1xyXG4gICAgICogQHBhcmFtIGNvbnRpbnVvdXNSYXRlIOS8pOWus+avlOeOhy3lupTnlKjlnKjmjIHnu63kvKTlrrPmr5TnjodcclxuICAgICAqIEByZXR1cm5zIOaUu+WHu+aVsOaNrlxyXG4gICAgICovXHJcbiAgICBnZXRHb25nSmlEYXRhKGRhbWFnZVR5cGU6RGFtYWdlVHlwZSxpc0J1bGxldDpib29sZWFuLHNraWxsVHlwZTpTa2lsbFR5cGUsc2tpbGxSYXRlOm51bWJlcj0xLGNvbnRpbnVvdXNSYXRlOm51bWJlcj0wKTpHb25nSmlEYXRhe1xyXG4gICAgICAgIGxldCBnakRhdGE9bmV3IEdvbmdKaURhdGEoKTtcclxuICAgICAgICBnakRhdGEuaGVyb19kYXRhPWNjLmluc3RhbnRpYXRlKHRoaXMuaGVyb19kYXRhKTsgICAgICAgXHJcbiAgICAgICAgZ2pEYXRhLmlzX2J1bGxldD1pc0J1bGxldDtcclxuICAgICAgICBnakRhdGEuZGFtYWdlX3R5cGU9ZGFtYWdlVHlwZTtcclxuICAgICAgICBnakRhdGEuaGVyb190eXBlPXRoaXMuaGVyb190eXBlOyAgICAgICAgXHJcbiAgICAgICAgaWYoZGFtYWdlVHlwZT09RGFtYWdlVHlwZS5Ob3JtYWwpe1xyXG5cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgLy/mioDog73kvKTlrrPmr5TnjodcclxuICAgICAgICAgICAgZ2pEYXRhLnNraWxsX2RhbWFnZV9yYXRlPXNraWxsUmF0ZTtcclxuICAgICAgICAgICAgZ2pEYXRhLmNvbnRpbnVvdXNfZGFtYWdlX3JhdGU9Y29udGludW91c1JhdGU7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKHNraWxsVHlwZT09U2tpbGxUeXBlLkFjdGl2ZSl7XHJcbiAgICAgICAgICAgICAgICBnakRhdGEuc2tpbGxfcmVsZWFzZV9pZD10aGlzLmdldFNraWxsUmVsZWFzZUlkKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ICAgICAgICBcclxuICAgICAgICByZXR1cm4gZ2pEYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRGFtYWdlTW9uc3RlcihkYW1hZ2VUeXBlOkRhbWFnZVR5cGUsaXNDcml0OmJvb2xlYW4sbW9uc3RlcjpjYy5Ob2RlKXtcclxuICAgICAgICBpZihkYW1hZ2VUeXBlPT1EYW1hZ2VUeXBlLk5vcm1hbCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMucGV0KXtcclxuICAgICAgICAgICAgICAgIHRoaXMucGV0Lm9uSGVyb0hpdE1vbnN0ZXIobW9uc3Rlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5oaXRfY2FsbGJhY2spe1xyXG4gICAgICAgICAgICB0aGlzLmhpdF9jYWxsYmFjayhkYW1hZ2VUeXBlLGlzQ3JpdCxtb25zdGVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVzZXRHb25nSmlKaVNodSgpe1xyXG4gICAgICAgIHRoaXMuZ29uZ2ppX2ppc2h1PTA7XHJcbiAgICAgICAgdGhpcy5pc19jYW5famlzaHU9dHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICByZXNldE5vcm1hbEF0dGFjaygpe1xyXG4gICAgICAgIHRoaXMuZ29uZ2ppX2ppc2h1PXRoaXMuaGVyb19kYXRhLmdvbmdqaV9qaWFuZ2U7XHJcbiAgICAgICAgdGhpcy5pc19jYW5famlzaHU9dHJ1ZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgc2V0QXR0U3BpbmVTY2FsZSgpe1xyXG4gICAgICAgIHRoaXMuc3BpbmUudGltZVNjYWxlPXRoaXMuaGVyb19kYXRhLmJhc2VfamlhbmdlL3RoaXMuaGVyb19kYXRhLmdvbmdqaV9qaWFuZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnROb3JtYWxBdHRhY2sobW9uc3RlcjpjYy5Ob2RlKXtcclxuICAgICAgICBsZXQgaXNEb3VibGU6Ym9vbGVhbj10aGlzLmlzX2RvdWJsZV9hdHRhY2s7XHJcbiAgICAgICAgaWYodGhpcy5pc19kb3VibGVfYXR0YWNrKXtcclxuICAgICAgICAgICAgdGhpcy5zcGluZS50aW1lU2NhbGU9dGhpcy5oZXJvX2RhdGEuYmFzZV9qaWFuZ2UvdGhpcy5oZXJvX2RhdGEuZ29uZ2ppX2ppYW5nZSoyOyAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmlzX2RvdWJsZV9hdHRhY2s9ZmFsc2U7XHJcbiAgICAgICAgdGhpcy5hdHRhY2tfY2FsbGJhY2sobW9uc3Rlcik7XHJcbiAgICAgICAgaWYodGhpcy5wZXQpe1xyXG4gICAgICAgICAgICB0aGlzLnBldC5zdGFydFJlbGVhc2VTa2lsbChtb25zdGVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9tb2RlPT1HYW1lTW9kZS5FbmRsZXNzKXtcclxuICAgICAgICAgICAgaWYoaXNEb3VibGU9PWZhbHNlKXtcclxuICAgICAgICAgICAgICAgIGxldCBidWZmPXRoaXMuZ2V0RW5kbGVzc0J5VHlwZShFbmRsZXNzQnVmZlR5cGUuRG91YmxlQXR0YWNrKVxyXG4gICAgICAgICAgICAgICAgaWYoYnVmZil7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/mpoLnjodcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcmF0ZT1idWZmLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKE1hdGgucmFuZG9tKCk8cmF0ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNfZG91YmxlX2F0dGFjaz10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNwaW5lLnRpbWVTY2FsZT10aGlzLmhlcm9fZGF0YS5iYXNlX2ppYW5nZS90aGlzLmhlcm9fZGF0YS5nb25namlfamlhbmdlKjI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSAgICAgICAgICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVVQREFURS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICB1cGRhdGUoZHQ6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIGlmKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfc3RhdGUhPUdhbWVTdGF0ZS5HYW1lX1BsYXlpbmd8fEhlcm9fU3RhdGUuZXhpdD09dGhpcy5nZXRIZXJvU3RhdGUoKSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuY2hlY2tTa2lsbChkdCk7XHJcbiAgICAgICAgaWYodGhpcy5pc0hhdmVEZUJ1ZmYoQnVmZklkLk1vbnN0ZXJfWHVhbll1bikpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2hlY2tBdHRhY2soZHQpO1xyXG4gICAgICAgIGlmKHRoaXMuY2xpY2tfcmVtYWluPjApe1xyXG4gICAgICAgICAgICB0aGlzLmNsaWNrX3JlbWFpbi09ZHQ7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCB1cGRhdGVDaGVjayhkdCk6Ym9vbGVhblxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuaXNIYXZlRGVCdWZmKEJ1ZmZJZC5Nb25zdGVyX1h1YW5ZdW4pKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNoZWNrQXR0YWNrKGR0KTtcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNoZWNrU2tpbGwoZHQ6bnVtYmVyKXtcclxuICAgICAgICBpZih0aGlzLmhlcm9fc3RhdGUhPUhlcm9fU3RhdGUuc2tpbGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZUNEKC1kdCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2hlY2tBdHRhY2soZHQpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5pc19jYW5famlzaHUmJnRoaXMuaXNfbG9hZF9vaylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuZ29uZ2ppX2ppc2h1Kz1kdDtcclxuICAgICAgICAgICAgaWYodGhpcy5nb25namlfamlzaHU+PXRoaXMuaGVyb19kYXRhLmdvbmdqaV9qaWFuZ2UpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8v5byA5aeL5pS75Ye7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdvbmdqaV9qaXNodT0wO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc19jYW5fZ29uZ2ppPXRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy/oh6rliqjmlLvlh7tcclxuICAgICAgICBpZih0aGlzLmlzX2Nhbl9nb25namkgJiYgdGhpcy5nZXRIZXJvU3RhdGUoKSE9SGVyb19TdGF0ZS5za2lsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNfY2FuX2dvbmdqaT1mYWxzZTtcclxuICAgICAgICAgICAgbGV0IG1vbnN0ZXJzPU1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TW9uc3RlcnNGb3JOZWFyZXN0KHRoaXMubWF4X2dvbmdqaV9udW0sdGhpcy5ub2RlLmdldFBvc2l0aW9uKCksdGhpcy5oZXJvX2RhdGEuZ29uZ2ppX2ZhbndlaSk7XHJcbiAgICAgICAgICAgIGlmKG1vbnN0ZXJzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdvbmdqaV9qaXNodT0wO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc19jYW5fZ29uZ2ppPXRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEF0dFNwaW5lU2NhbGUoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnROb3JtYWxBdHRhY2sobW9uc3RlcnNbMF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuIl19