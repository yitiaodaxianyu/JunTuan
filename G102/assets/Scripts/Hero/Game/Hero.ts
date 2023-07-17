import { BuffId, BuffStateType, BuffType, DamageType, GongJi_FangXiang, Hero_DeBuff, Hero_State, Hero_State_Name, Hero_Type, SkillIndicatorType, SkillTipType, SkillType } from "./HeroConfig";
import MpProgress from "./MpProgress";
import BuffState from "./BuffState";
import { GongJiData, HeroData } from "../Data/HeroData";
import Pet from "../../Pet/Game/Pet";
import GameManager from "../../GameManager";
import { GameEffectId, GameEffectsManager } from "../../Game/GameEffectsManager";
import { HeroManager } from "../Data/HeroManager";
import MonsterManager from "../../Monster/MonsterManager";
import { GameMode, GameState } from "../../Constants";
import BuffStateManager from "../../Game/BuffStateManager";
import { InjuredData, KeyFrameData } from "../../Monster/MonsterData";
import SkillManager from "../../Game/SkillManager";
import BuffTimer from "./BuffTimer";
import { BuffData } from "./BuffData";
import SkillTip from "./SkillTip";
import SkyManager from "../../Game/SkyManager";
import LanguageManager from "../../multiLanguage/LanguageManager";
import TaskManager from "../../Task/TaskManager";
import { TaskItem } from "../../Task/TaskEnum";
import WallManager from "../../Wall/WallManager";
import { EndlessBuff, EndlessBuffType } from "../../copy/endlesschallenges/EndlessConfig";
import { SpiritAttributeManager } from "../../Pet/Data/SpiritAttribute";
import FirePet from "../../Pet/Game/FirePet";
import { HeroBaseInfoManager } from "../Data/HeroBaseInfo";
import IcePet from "../../Pet/Game/IcePet";
import WindPet from "../../Pet/Game/WindPet";
import RayPet from "../../Pet/Game/RayPet";
import Monster from "../../Monster/Monster";

import { SpeedType, instance } from "../../Joystick/Joystick";


const { ccclass, property } = cc._decorator;

@ccclass
export default class Hero extends cc.Component {
    /**所有的英雄及其所需资源是否加载完毕 */
    public static max_load_num: number = 0;
    public static cur_loaded_num: number = 0;
    /**所需的动画加载是否ok */
    is_load_ok: boolean = false;
    cur_load_num: number = 0;
    need_load_num: number = 0;

    @property({ type: cc.Enum(Hero_Type) })
    hero_type: Hero_Type = Hero_Type.ChangMaoShou;

    @property(cc.Prefab)
    prefab_skill_tip: cc.Prefab = null;

    //骨骼动画
    spine: sp.Skeleton = null;
    /**当前英雄的面向 */
    cur_fangxiang: GongJi_FangXiang = GongJi_FangXiang.zuo;
    /**英雄的状态 */
    hero_state: Hero_State = Hero_State.idle;
    //攻击计数
    gongji_jishu: number = 1;
    /**是否可以攻击 */
    is_can_gongji: boolean = false;
    /**是否可以攻击计数 */
    is_can_jishu: boolean = true;
    //最大的攻击次数
    max_gongji_num = 1;
    //技能剩余的冷却时间
    skill_cd_time: number = 0;
    /**主动技能技能最大冷却*/
    skill_total_time: number = 5;
    /**施法距离 */
    casting_distance: number = 1000;
    /**子弹速度 */
    bullet_speed: number = 1000;
    //消耗的MP值
    cost_mp: number = 20;
    mp_progress: MpProgress = null;
    /**英雄当前拥有的buff */
    protected hero_buff: Map<BuffId, BuffTimer> = null;
    /**英雄当前拥有的debuff */
    protected hero_debuff: Map<BuffId, BuffTimer> = null;
    /**无尽buff */
    protected map_endless_buff: Map<number, EndlessBuff> = null;
    /**眩晕位置 */
    xuanyun_pos: cc.Vec2 = null;
    /**子弹生成的位置 */
    bullet_pos: cc.Vec2[] = [];
    //英雄的数据
    hero_data: HeroData = null;
    is_show_mp_hint: boolean = false;

    /**当前的韧性 */
    protected cur_toughness: number = 0;
    zhishiqi_type: SkillIndicatorType = SkillIndicatorType.beeline;
    /**技能释放回调 */
    skill_callback: Function = null;
    /**攻击释放回调 */
    attack_callback: Function = null;
    /**眩晕回调 */;
    xuanyun_callback: Function = null;
    /**命中回调 */
    hit_callback: Function = null;
    /**重置回调 */
    reset_callback: Function = null;
    /**胜利回调 */
    win_callback: Function = null;
    /**加载完毕回调回调 */
    loaded_callback: Function = null;
    /**宠物 */
    pet: Pet = null;
    /**宠物技能的一些被动 */
    /**此次伤害必定暴击 */
    must_crit: number = 0;
    /**宠物21可以触发增伤次数 */
    crit_increase_cd_3_num: number = 0;

    setup_scale: number = 0.60;
    base_att_jiange: number = 0;

    /**buff状态 */
    map_buff_state: Map<number, BuffState> = null;
    /**debuff状态 */
    map_debuff_state: Map<number, BuffState> = null;
    /**是否需要检查技能释放距离 */
    is_need_check_distance: boolean = true;
    /**指示器类型 */
    protected skill_tip_type: SkillTipType = SkillTipType.Full;
    /**是否可以处理触摸事件，当技能CD完毕切按下了英雄时为true */
    private is_can_touch: boolean = false;
    private skill_tip: SkillTip = null;
    /**是否触发自动释放逻辑 */
    private is_auto_release: boolean = false;
    private touch_rect: cc.Rect = null;
    /**总共使用技能的次数 */
    protected use_skill_num: number = 0;
    protected node_shadow: cc.Node = null;
    /**点击剩余 */
    protected click_remain: number = 0;
    /**攻速记录值，不作判断 */
    gongji_sudu: number = 0;
    /**技能队列 */
    skill_queue: SkillType[] = [];
    /**是否连续攻击 */
    is_double_attack: boolean = false;
    /**层级*/
    public v_Index: number = 0;

    pos: cc.Vec2;

    //----------------------------------------------LOAD---------------------------------------------
    protected onLoad() {
        GameManager.getInstance().all_hero.set(this.hero_type, this);
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
        this.addLoadByGameEffectId(GameEffectId.hero_skill_common, 2);
        this.addLoadByGameEffectId(GameEffectId.skill_damage_record, 2);
        this.node.zIndex = 1;
        this.map_buff_state = new Map<number, BuffState>();
        this.map_debuff_state = new Map<number, BuffState>();
        this.hero_buff = new Map<BuffId, BuffTimer>();
        this.hero_debuff = new Map<BuffId, BuffTimer>();
        this.map_endless_buff = new Map<BuffId, EndlessBuff>();
        this.addSkillTipType();
    }

    protected start() {
        //加载数据
        this.hero_data = GameManager.getInstance().game_hero_data.get(this.hero_type);
        this.bullet_speed = HeroBaseInfoManager.getInstance().getBaseBulletSpeed(this.hero_type);
        this.gongji_jishu = this.hero_data.gongji_jiange;
        this.gongji_sudu = this.getAttackSpeed();
        this.setHeroState(Hero_State.idle, GongJi_FangXiang.zhong);
        //this.playSpineAnimaton(Hero_State_Name.Idle,true,null,null);
        //加载mp进度条
        this.loadMpProgress();
        this.loadPet();
        let selfShadow = this.node.getChildByName('Monster_Shadow');
        this.pos = selfShadow.getPosition();
        this.node_shadow = cc.instantiate(selfShadow);
        this.node_shadow.parent = cc.find('Canvas/Hero_Shadow_Root');
        this.node_shadow.scale = this.setup_scale;
        this.node_shadow.setPosition(cc.v2(this.node.x + this.pos.x * this.setup_scale, this.node.y + this.pos.y * this.setup_scale));
        selfShadow.removeFromParent();
        if (this.getHeroState() == Hero_State.exit) {
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
    }

    onDestroy() {
        //取消监听触摸事件
        let touchNode = this.node.getChildByName('touchNode');
        if (touchNode) {
            // touchNode.off(cc.Node.EventType.TOUCH_START,this.onTouchStart,this);
            // touchNode.off(cc.Node.EventType.TOUCH_MOVE,this.onTouchMove,this);
            // touchNode.off(cc.Node.EventType.TOUCH_END,this.onTouchEnd,this);
            // touchNode.off(cc.Node.EventType.TOUCH_CANCEL,this.onTouchCancel,this);
            instance.off(cc.Node.EventType.TOUCH_START, this.onTouchStartByJoy, this);
            instance.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMoveByJoy, this);
            instance.off(cc.Node.EventType.TOUCH_END, this.onTouchEndByJoy, this);
        }
        GameManager.getInstance().all_hero.delete(this.hero_type)
    }

    addSkillTipType() {
        let node = cc.instantiate(this.prefab_skill_tip);
        this.skill_tip = node.getComponent(SkillTip);
        this.skill_tip_type = this.skill_tip.getSkillTipType();
        this.skill_tip.node.active = false;
        switch (this.skill_tip_type) {
            case SkillTipType.Full: {
                SkillManager.getInstance().node.addChild(node);
            } break;
            case SkillTipType.Circle: {
                SkillManager.getInstance().node.addChild(node);
            } break;
            case SkillTipType.Rect: {
                SkillManager.getInstance().node.addChild(node);
            } break;
            case SkillTipType.Dir: {
                SkillManager.getInstance().node.addChild(node);
            } break;
        }
    }

    setTouchRect() {
        let touchNode = this.node.getChildByName('touchNode');
        this.touch_rect = cc.rect(this.node.x + touchNode.x * this.setup_scale - (touchNode.width * this.setup_scale / 2), this.node.y + touchNode.y * this.setup_scale - (touchNode.height * this.setup_scale / 2), touchNode.width * this.setup_scale, touchNode.height * this.setup_scale);
        // let gg=cc.find('Canvas/Fighting_Root').getComponent(cc.Graphics);
        // gg.rect(this.touch_rect.x,this.touch_rect.y,this.touch_rect.width,this.touch_rect.height);
        // gg.stroke();
    }

    setSkillTipSize(width: number, height: number) {
        this.skill_tip.node.width = width;
        this.skill_tip.node.height = height;
    }

    getSkillTipSize(): cc.Size {
        return this.skill_tip.node.getContentSize();
    }

    private touchListen() {
        //监听触摸事件
        let touchNode = this.node.getChildByName('touchNode');
        if (touchNode) {
            // touchNode.on(cc.Node.EventType.TOUCH_START,this.onTouchStart,this);
            // touchNode.on(cc.Node.EventType.TOUCH_MOVE,this.onTouchMove,this);
            // touchNode.on(cc.Node.EventType.TOUCH_END,this.onTouchEnd,this);
            // touchNode.on(cc.Node.EventType.TOUCH_CANCEL,this.onTouchCancel,this);
            instance.on(cc.Node.EventType.TOUCH_START, this.onTouchStartByJoy, this);
            instance.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMoveByJoy, this);
            instance.on(cc.Node.EventType.TOUCH_END, this.onTouchEndByJoy, this);
        }
    }

    private initPos() {
        let xuanyun = this.node.getChildByName('xuanyun');
        this.xuanyun_pos = xuanyun.getPosition();
        xuanyun.removeFromParent();
        this.bullet_pos = new Array();
        let bullet1 = this.node.getChildByName('bullet1');
        let bullet2 = this.node.getChildByName('bullet2');
        this.bullet_pos.push(bullet2.getPosition());
        this.bullet_pos.push(bullet1.getPosition());
        this.bullet_pos.push(bullet2.getPosition());
        bullet1.removeFromParent();
        bullet2.removeFromParent();
    }

    onGameWin() {
        this.skill_queue = new Array();
        this.setHeroState(Hero_State.idle, GongJi_FangXiang.zhong);
        this.gongji_jishu = 0;
        if (this.win_callback) {
            this.win_callback();
        }
    }

    protected addSkillListen(callBack: Function) {
        this.skill_callback = callBack;
    }

    protected addAttackListen(callBack: Function) {
        this.attack_callback = callBack;
    }

    protected addHitListen(callBack: Function) {
        this.hit_callback = callBack;
    }

    protected addResetListen(callBack: Function) {
        this.reset_callback = callBack;
    }

    protected addGameWinListen(callBack: Function) {
        this.win_callback = callBack;
    }

    protected addLoadedListen(callBack: Function) {
        this.loaded_callback = callBack;
    }

    private loadMpProgress() {
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
    }

    protected loadZhiShiQi(zhishiqi: string, type: SkillIndicatorType) {
        this.zhishiqi_type = type;
        console.log("加载hero" + zhishiqi);

        cc.resources.load('heros/' + zhishiqi, cc.Prefab, (error: Error, assets: cc.Prefab) => {
            if (error) {
                console.log(error);
                return;
            }
        });
    }

    addLoadByGameEffectId(id: GameEffectId, initCount: number) {
        if (GameEffectsManager.getInstance().addEffectPoolById(id, initCount, () => {
            this.cur_load_num++;
            if (this.cur_load_num >= this.need_load_num) {
                if (this.is_load_ok == false) {
                    this.is_load_ok = true;
                    Hero.cur_loaded_num++;
                    if (this.loaded_callback) {
                        this.loaded_callback();
                    }
                }
            }
        }) == true) {
            this.need_load_num++;
        }
    }

    /**加载宠物 */
    loadPet() {
        if (this.hero_data.pet_id > 0) {
            let type = SpiritAttributeManager.getInstance().getSpiritType(this.hero_data.pet_id);
            this.need_load_num++;
            cc.resources.load('pet/pet' + type, cc.Prefab, (error: Error, assets: cc.Prefab) => {
                if (error) {
                    console.log(error);
                    return;
                }
                let node = cc.instantiate(assets);
                cc.find('Canvas/Pet_Root').addChild(node);
                switch (type) {
                    case 1: {
                        this.pet = node.addComponent(IcePet);
                    }; break;
                    case 2: {
                        this.pet = node.addComponent(FirePet);
                    }; break;
                    case 3: {
                        this.pet = node.addComponent(WindPet);
                    }; break;
                    case 4: {
                        this.pet = node.addComponent(RayPet);
                    }; break;
                }
                this.pet.init(this.hero_data.pet_id, this.hero_type, cc.v2(this.node.x - 64, this.node.y + 64));
                this.pet.setHeroData(this.hero_data);
                this.cur_load_num++;
                node.zIndex = 1000 - node.y;
                if (this.cur_load_num >= this.need_load_num) {
                    this.is_load_ok = true;
                    Hero.cur_loaded_num++;
                }
            });
        }
    }

    /**隐藏英雄，此时英雄不能攻击或者释放技能 */
    hideHero() {
        this.hero_state = Hero_State.exit;
        this.node.opacity = 0;
        if (this.node_shadow) {
            this.node_shadow.opacity = 0;
        }
        if (this.mp_progress) {
            this.mp_progress.hide();
        }
    }

    showHero() {
        this.setHeroState(Hero_State.idle, GongJi_FangXiang.zhong);
        this.node.opacity = 255;
        this.node_shadow.opacity = 255;
        this.mp_progress.show();
    }

    //----------------------------------【皮肤】----------------------------------------------
    protected setSkin() {
        //let heroQuality=HeroManager.getInstance().getHeroQuality(this.hero_type);
        //let tier=HeroQualityManager.getInstance().getTier(heroQuality);
        //this.spine.setSkin('stage'+(HeroManager.getSkinIndex(tier)));
    }
    /**---------------------------------操作相关---------------------------------------------- */
    //-----------------------------------触摸移动事件------------------------------------------------------------

    leaterNum: number = 0;//延迟数据播放动画
    leaterSpeed: number = 10;

    newPos: cc.Vec2;
    posYTemp: number;

    speedType: SpeedType = SpeedType.STOP;
    moveDir = cc.v2(0, 1);
    //抄别人的，本来有两种速度，现在先用一个数据
    normalSpeed = 300;
    fastSpeed = 300;

    stopSpeed = 0;

    moveSpeed = 0;


    /**
  * 移动
  */
    move() {
        // this.node.angle =
        //   cc.misc.radiansToDegrees(Math.atan2(this.moveDir.y, this.moveDir.x)) - 90;

        // if (this.rigidbody) {
        //   this._body.applyForceToCenter(
        //     cc.v2(this.moveDir.x * 200, this.moveDir.y * 200),
        //     true
        //   );
        // } else {
        //   const oldPos = cc.v2();
        //   this.node.getPosition(oldPos);
        //   const newPos = oldPos.add(this.moveDir.mul(this._moveSpeed / 120));
        //   this.node.setPosition(newPos);
        // }

        if (this.speedType !== SpeedType.STOP) {
            const oldPos = cc.v2();
            this.node.getPosition(oldPos);
            this.newPos = oldPos.add(this.moveDir.mul(this.moveSpeed / 120));
            this.newPos.y = oldPos.y;
            this.posYTemp = oldPos.y;

        }
        if (this.leaterNum == 0) {
            GameManager.getInstance().moveData.unshift(this.newPos);
        }


        if (GameManager.getInstance().moveData[this.leaterNum * this.leaterSpeed] != null) {
            const newPosTepm = GameManager.getInstance().moveData[this.leaterNum * this.leaterSpeed];
            newPosTepm.y=this.posYTemp;
            this.node.setPosition(newPosTepm);
        }


        this.node_shadow.setPosition(cc.v2(this.node.x + this.pos.x * this.setup_scale, this.node.y + this.pos.y * this.setup_scale));
    }
    onTouchStartByJoy() { }

    onTouchMoveByJoy(event: cc.Event.EventTouch, data) {
        this.speedType = data.speedType;
        this.moveDir = data.moveDistance;
    }

    onTouchEndByJoy(event: cc.Event.EventTouch, data) {
        this.speedType = data.speedType;
    }
    /**---------------------------------操作相关---------------------------------------------- */
    //-----------------------------------触摸事件------------------------------------------------------------//旧版功能
    onTouchStart(e: cc.Event.EventTouch) {
        if (this.isHaveDeBuff(BuffId.Monster_XuanYun) && this.hero_type != Hero_Type.ZhenDe) {
            this.is_can_touch = false;
            GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(170002), 1);
            return false;
        }
        if (this.skill_cd_time > 0) {
            this.is_can_touch = false;
            if (this.click_remain > 0) {
                return false;
            }
            GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(170001), 1);
            return false;
        }
        if (GameManager.getInstance().cur_game_state != GameState.Game_Playing)
            return false;
        this.is_can_touch = true;
        this.is_auto_release = true;
        this.click_remain = 1;
        SkillManager.getInstance().releaseSkillResult(false);
        let pos = SkyManager.getInstance().node.convertToNodeSpaceAR(e.getLocation());
        //如果可以释放，显示指示器
        switch (this.skill_tip_type) {
            case SkillTipType.Full: {
                this.skill_tip.node.setPosition(cc.v2(0, -cc.winSize.height / 2));
                this.skill_tip.node.active = false;
                this.skill_tip.setIsCanRelease(false);
            } break;
            case SkillTipType.Circle: {
                this.skill_tip.node.setPosition(pos);
                this.skill_tip.node.active = true;
                this.skill_tip.setIsCanRelease(false);
            } break;
            case SkillTipType.Rect: {
                this.skill_tip.node.setPosition(pos);
                this.skill_tip.node.active = true;
                this.skill_tip.setIsCanRelease(false);
            } break;
            case SkillTipType.Dir: {
                this.skill_tip.node.setPosition(this.node.getPosition());
                this.skill_tip.node.active = true;
                this.skill_tip.setIsCanRelease(false);
            } break;
        }
        //显示范围指示器
        SkillManager.getInstance().showSkillRange(this.node.y, this.casting_distance);
    }

    onTouchMove(e: cc.Event.EventTouch) {
        if (this.is_can_touch == false || GameManager.getInstance().cur_game_state != GameState.Game_Playing)
            return;
        let pos = SkyManager.getInstance().node.convertToNodeSpaceAR(e.getLocation());
        if (!this.touch_rect.contains(pos)) {
            this.is_auto_release = false;
        }
        switch (this.skill_tip_type) {
            case SkillTipType.Full: {

            } break;
            case SkillTipType.Circle: {
                this.skill_tip.node.setPosition(pos);
            } break;
            case SkillTipType.Rect: {
                this.skill_tip.node.setPosition(pos);
            } break;
            case SkillTipType.Dir: {

            } break;
        }

        if (pos.y > GameManager.getInstance().enemy_att_y) {
            let distance = pos.y - this.node.y;
            if (distance <= this.casting_distance) {
                this.skill_tip.setIsCanRelease(true);
            } else {
                this.skill_tip.setIsCanRelease(false);
            }
        } else {
            this.skill_tip.setIsCanRelease(false);
        }
    }

    onTouchEnd(e: cc.Event.EventTouch) {
        SkillManager.getInstance().releaseSkillResult(true);
        SkillManager.getInstance().hideSkillRange();
        this.skill_tip.node.active = false;
        if (this.is_can_touch == false || GameManager.getInstance().cur_game_state != GameState.Game_Playing)
            return;
        let pos = SkyManager.getInstance().node.convertToNodeSpaceAR(e.getLocation());
        //判断坐标
        if (pos.y > GameManager.getInstance().enemy_att_y) {
            let distance = pos.y - this.node.y;
            if (distance <= this.casting_distance) {
                this.releaseSkill(pos);
            }
        } else {
            if (this.is_auto_release) {
                if (this.startAutoRelease() == false) {
                    GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(140023));
                }
            }
        }
    }

    onTouchCancel(e: cc.Event.EventTouch) {
        SkillManager.getInstance().releaseSkillResult(true);
        SkillManager.getInstance().hideSkillRange();
        this.skill_tip.node.active = false;
        if (this.is_can_touch == false || GameManager.getInstance().cur_game_state != GameState.Game_Playing)
            return;
        let pos = SkyManager.getInstance().node.convertToNodeSpaceAR(e.getLocation());
        if (pos.y > GameManager.getInstance().enemy_att_y) {
            let distance = pos.y - this.node.y;
            if (distance <= this.casting_distance) {
                this.releaseSkill(pos);
            }
        } else {
            if (this.is_auto_release) {
                this.startAutoRelease();
            }
        }
    }

    startAutoRelease(): boolean {
        //找怪，找不到就不放
        let enemys = MonsterManager.getInstance().getMonstersForNearestBySkill(1, this.node.y, this.casting_distance);
        if (enemys) {
            //最前的敌人
            let enemyPos = enemys[0].getComponent(Monster).getCenterPos();
            this.releaseSkill(enemyPos);
            return true;
        } else {
            return false;
        }
    }

    /**触摸的位置 */
    releaseSkill(touchPos: cc.Vec2) {
        if (GameManager.getInstance().cur_game_state != GameState.Game_Playing)
            return;
        this.use_skill_num++;
        //this.mp_progress.showLight();
        if (this.skill_callback) {
            this.skill_callback(touchPos);
        }
        this.resetCD();
        TaskManager.getInstance().emitTask(TaskItem.释放X次人物技能);
    }

    protected getSkillReleaseId(): number {
        return this.hero_type * 10000 + this.use_skill_num;
    }

    /**获得子弹生成的位置 */
    getCreateBulletPos(): cc.Vec2 {
        let pos = this.bullet_pos[this.cur_fangxiang];
        return cc.v2(this.node.x + pos.x * this.node.scaleX, this.node.y + pos.y * this.node.scaleY);
    }
    /**获得子弹相对英雄的位置 */
    getHeroBulletPos(): cc.Vec2 {
        return this.bullet_pos[this.cur_fangxiang];
    }

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
    addEndlessBuff(endlessBuff: EndlessBuff) {
        if (!this.isHaveEndlessId(endlessBuff.id)) {
            this.map_endless_buff.set(endlessBuff.id, endlessBuff);
            switch (endlessBuff.type) {
                case EndlessBuffType.Attack: {
                    this.hero_data.total_attack += this.hero_data.fixed_attck * endlessBuff.value;
                } break;
                case EndlessBuffType.AttackSpeed: {
                    this.changeAttackSpeed(endlessBuff.value);
                } break;
                case EndlessBuffType.CritRate: {
                    this.hero_data.Critical += endlessBuff.value;
                } break;
                case EndlessBuffType.CritDamage: {
                    this.hero_data.ExtraCritical += endlessBuff.value;
                } break;
                case EndlessBuffType.Defense: {
                    this.hero_data.total_defense += this.hero_data.fix_defense * endlessBuff.value;
                } break;
                case EndlessBuffType.HealthMax: {
                    this.hero_data.total_hp += this.hero_data.fixed_hp * endlessBuff.value;
                    // console.log("城墙加血:",this.hero_data.total_hp,this.hero_data.fixed_hp,endlessBuff.value)
                    GameManager.getInstance().refreshMainWallData()
                } break;
                case EndlessBuffType.HealthSec: {
                    let buffData = new BuffData();
                    buffData.buff_id = BuffId.Wall_Endless_Add_hp + this.hero_type;
                    buffData.buff_type = BuffType.Gain;
                    buffData.buff_value = [endlessBuff.value * WallManager.getInstance().getMainWall().getMaxHp()];
                    buffData.remain_time = 66666666;
                    // buffData.game_effect_id=GameEffectId.chang_mao_shou_skill_active_1;
                    buffData.recovery_jiange_time = 1;
                    WallManager.getInstance().getMainWall().addBuff(buffData)
                } break;
                case EndlessBuffType.HealthTeamAdd: {
                    // let hp=WallManager.getInstance().getMainWall().getCurHp()+(endlessBuff.value*WallManager.getInstance().getMainWall().getMaxHp())
                    // WallManager.getInstance().getMainWall().changeHp(hp)
                    //及时用
                } break;
                case EndlessBuffType.DoubleAttack: {
                    //连续攻击,不用加buff
                } break;
                case EndlessBuffType.ActiveSkillCd: {
                    this.skill_total_time -= this.hero_data.getSkillColdDown(SkillType.Active) * endlessBuff.value
                } break;
                case EndlessBuffType.AddDamage: {
                    this.hero_data.all_increase_damage += endlessBuff.value;
                } break;
            }
        }
    }
    /**
     * 删除无尽buff
     * @param id 无尽buff-id
     */
    removeEndlessBuff(id: number) {
        if (!this.isHaveEndlessId(id)) {
            let endlessBuff = this.map_endless_buff.get(id);
            this.map_endless_buff.delete(id);
            switch (endlessBuff.type) {
                case EndlessBuffType.Attack: {
                    this.hero_data.total_attack -= this.hero_data.fixed_attck * endlessBuff.value;
                } break;
                case EndlessBuffType.AttackSpeed: {
                    this.changeAttackSpeed(-endlessBuff.value);
                } break;
                case EndlessBuffType.CritRate: {
                    this.hero_data.Critical -= endlessBuff.value;
                } break;
                case EndlessBuffType.CritDamage: {
                    this.hero_data.ExtraCritical -= endlessBuff.value;
                } break;
                case EndlessBuffType.Defense: {
                    this.hero_data.total_defense -= this.hero_data.fix_defense * endlessBuff.value;
                } break;
                case EndlessBuffType.HealthMax: {
                    this.hero_data.total_hp -= this.hero_data.fixed_hp * endlessBuff.value;
                } break;
                case EndlessBuffType.HealthSec: {
                    WallManager.getInstance().getMainWall().subBuff(BuffId.Wall_Endless_Add_hp + this.hero_type)
                } break;
                case EndlessBuffType.HealthTeamAdd: {

                } break;
                case EndlessBuffType.DoubleAttack: {

                } break;
                case EndlessBuffType.ActiveSkillCd: {
                    this.skill_total_time += this.hero_data.getSkillColdDown(SkillType.Active) * endlessBuff.value
                } break;
                case EndlessBuffType.AddDamage: {
                    this.hero_data.all_increase_damage -= endlessBuff.value;
                } break;
            }
        }
    }
    /**是否拥有一个无尽buff id */
    isHaveEndlessId(id: number): boolean {
        // console.log("++++++++",id,this.map_endless_buff)
        return this.map_endless_buff.has(id);
    }
    /**是否拥有一个无尽buff 类型 */
    getEndlessByType(type: number): EndlessBuff {
        let buff: EndlessBuff = null;
        this.map_endless_buff.forEach((v, k) => {
            if (v.type == type) {
                buff = v;
            }
        });
        return buff;
    }
    /**获得一个无尽buff */
    getEndlessBuff(id: number): EndlessBuff {
        return this.map_endless_buff.get(id);
    }

    //----------------------------------BUFF--------------------------------------------------

    addBuff(buffData: BuffData): BuffTimer {
        let buffId = buffData.buff_id;
        if (!this.isHaveBuff(buffId)) {
            //添加buff节点和特效       
            let node: cc.Node = null;
            if (buffData.game_effect_id == GameEffectId.Null) {
                node = new cc.Node(buffData.game_effect_id.toString());
                this.node.addChild(node);
            } else {
                node = GameEffectsManager.getInstance().createGameEffectForParent(buffData.game_effect_id, this.xuanyun_pos, this.node);
                //node.scale=this.node.width/200;
            }
            //添加buff
            let buff: BuffTimer = node.getComponent(BuffTimer);
            if (!buff) {
                buff = node.addComponent(BuffTimer);
            }
            buff.init(buffData);
            //buff销毁时处理
            buff.addDestroyListen(this.onBuffDestory.bind(this));
            //buff治疗触发时处理
            if (buffData.recovery_jiange_time > 0) {
                buff.addRecoveryListen({
                    doRecovery: (num: number) => {
                        WallManager.getInstance().getMainWall().changeHp(num);
                    }
                }, buff.getFirstBuffValue());
            }
            this.hero_buff.set(buffData.buff_id, buff);
            node.scale = 1 / this.setup_scale;
            switch (buffId) {
                case BuffId.Pet3_JiaSu:
                case BuffId.Hero_MeiMo_GongSu:
                case BuffId.Hero_ZhenDe_Gongsu:
                case BuffId.Hero_KuangZhanShi_DaZhao:
                    {
                        this.changeAttackSpeed(buffData.buff_value[0]);
                    } break;
                case BuffId.Hero_ChangMaoShow_GongSu: {
                    this.changeAttackSpeed(buffData.buff_value[0]);
                    node.setPosition(cc.v2(0, 0));
                    //新增一个背后特效
                    buff.addTeXiao(GameEffectId.chang_mao_shou_skill_active_2, this.node.getPosition(), cc.find('Canvas/Hero_Shadow_Root'))
                } break;
                case BuffId.Hero_ZhenDe_BaoJiMingZhongLv: {
                    this.hero_data.crit_ex += buffData.buff_value[0];
                    this.hero_data.hit_ex += buffData.buff_value[0];
                } break;
            }
            this.addBuffState(buffId, buffData.remain_time);
            return buff;
        } else {
            let buff = this.hero_buff.get(buffId);
            buff.refreshBuff(buffData);
            this.addBuffState(buffId, buffData.remain_time);
            return buff;
        }
        return null;
    }

    subBuff(buffId: BuffId): boolean {
        let buff = this.hero_buff.get(buffId);
        if (buff) {
            buff.destroySelf();
            return true;
        }
        return false;
    }

    onBuffDestory(buffData: BuffData) {
        this.hero_buff.delete(buffData.buff_id);
        switch (buffData.buff_id) {
            case BuffId.Pet3_JiaSu:
            case BuffId.Hero_MeiMo_GongSu:
            case BuffId.Hero_KuangZhanShi_DaZhao:
            case BuffId.Hero_ZhenDe_Gongsu:
            case BuffId.Hero_ChangMaoShow_GongSu: {
                this.changeAttackSpeed(-buffData.buff_value[0]);
            } break;
            case BuffId.Hero_ZhenDe_BaoJiMingZhongLv: {
                this.hero_data.crit_ex -= buffData.buff_value[0];
                this.hero_data.hit_ex -= buffData.buff_value[0];
            } break;
        }
    }

    isHaveBuff(buff: BuffId): boolean {
        return this.hero_buff.has(buff);
    }

    removeAllBuff() {
        this.hero_buff.forEach((buff: BuffTimer) => {
            this.subBuff(buff.getBuffId());
        })
    }


    addDeBuff(buffData: BuffData, insight: number = 0): boolean {
        if (!this.isHaveDeBuff(buffData.buff_id)) {
            //控制类的debuff需要根据韧性来实现具体的效果
            if (buffData.buff_type == BuffType.Vertigo) {
                if (this.cur_toughness >= 1) {
                    return false;
                }
                if (this.hero_type != Hero_Type.ZhenDe) {
                    this.mp_progress.setDisable(true);
                    SkillManager.getInstance().hideSkillRange();
                    this.skill_tip.node.active = false;
                }
                this.gongji_jishu = 0;
                this.spine.paused = true;
                this.is_can_touch = false;
                if (insight > 0) {
                    buffData.remain_time = InjuredData.calcControlTime(buffData.remain_time, this.cur_toughness, insight);
                }
                if (this.xuanyun_callback) {
                    this.xuanyun_callback(true);
                }
                WallManager.getInstance().getMainWall().showVertigo(buffData.remain_time);
                //关闭时停
                SkillManager.getInstance().setTimeStop(false);
                SkillManager.getInstance().setIsSkillState(false);
            }
            //添加buff节点和特效       
            let node: cc.Node = null;
            if (buffData.game_effect_id == GameEffectId.Null) {
                node = new cc.Node(buffData.game_effect_id.toString());
                this.node.addChild(node);
            } else {
                node = GameEffectsManager.getInstance().createGameEffectForParent(buffData.game_effect_id, this.xuanyun_pos, this.node);
                node.scale = this.node.width / 200;
            }
            //添加buff
            let buff: BuffTimer = node.getComponent(BuffTimer);
            if (!buff) {
                buff = node.addComponent(BuffTimer);
            }
            buff.init(buffData);
            //buff销毁时处理
            buff.addDestroyListen(this.onDeBuffDestory.bind(this));
            this.hero_debuff.set(buffData.buff_id, buff);
            node.scale = 1 / this.setup_scale;
            switch (buffData.buff_id) {
                case BuffId.Boss6_Skill_2_jiangongsu:
                case BuffId.Boss3_JIAN_GongSu: {
                    this.changeAttackSpeed(-buffData.buff_value[0]);
                } break;
                case BuffId.Boss8_Skill_2_attack: {
                    this.hero_data.total_attack -= buffData.buff_value[0] * this.hero_data.fixed_attck;
                } break;
            }
            this.addDeBuffState(buffData.buff_id, buffData.remain_time);
            return true;
        } else {
            let buff = this.hero_debuff.get(buffData.buff_id);
            buff.refreshBuff(buffData);
            this.addDeBuffState(buffData.buff_id, buffData.remain_time);
            switch (buffData.buff_id) {
                case BuffId.Boss6_Skill_2_jiangongsu:
                    {
                        if (buff.getFloorNum() < buffData.max_floor) {
                            this.changeAttackSpeed(-buffData.buff_value[0]);
                        }
                    } break;
            }
        }
        return false;
    }

    /**
     * 去除一个debuff
     * @param buff debuff类型
     * @param isNeedRecycle 是否需要调用回收
     * @returns 
     */
    subDeBuff(buffId: BuffId): boolean {
        let buff = this.hero_debuff.get(buffId);
        if (buff) {
            buff.destroySelf();
            return true;
        }
        return false;
    }

    onDeBuffDestory(buffData: BuffData) {
        // let buffState=this.map_debuff_state.get(BuffStateManager.getInstance().getDeBuffType(buffData.buff_id));
        // if(buffState){
        //     buffState.destroySelf();
        // }
        this.hero_debuff.delete(buffData.buff_id);
        switch (buffData.buff_id) {
            case BuffId.Monster_XuanYun: {
                if (this.hero_type != Hero_Type.ZhenDe)
                    this.mp_progress.setDisable(false);
                this.gongji_jishu = 0;
                this.spine.paused = false;
                this.is_can_touch = true;
                WallManager.getInstance().getMainWall().hideVertigo();
                if (this.xuanyun_callback) {
                    this.xuanyun_callback(false);
                }
            } break;
            case BuffId.Boss3_JIAN_GongSu: {
                this.changeAttackSpeed(buffData.buff_value[0]);
                let buffState = this.map_debuff_state.get(BuffStateType.AttackSpeed);
                if (buffState) {
                    buffState.destroySelf();
                }
            } break;
            case BuffId.Boss6_Skill_2_jiangongsu: {
                this.changeAttackSpeed(buffData.buff_value[0] * buffData.cur_floor);
                let buffState = this.map_debuff_state.get(BuffStateType.AttackSpeed);
                if (buffState) {
                    buffState.destroySelf();
                }
            } break;
            case BuffId.Boss8_Skill_2_attack: {
                this.hero_data.total_attack += buffData.buff_value[0] * this.hero_data.fixed_attck;
                let buffState = this.map_debuff_state.get(BuffStateType.Attack);
                if (buffState) {
                    buffState.destroySelf();
                }
            } break;
        }
    }

    isHaveDeBuff(buffId: BuffId): boolean {
        return this.hero_debuff.has(buffId);
    }

    removeAllDeBuff() {
        this.hero_debuff.forEach((v, k) => {
            this.subDeBuff(v.getBuffId())
        });

    }

    getGameEffectIdByDebuff(buff: Hero_DeBuff): GameEffectId {
        let gameEffectId = GameEffectId.Null;
        switch (buff) {
            case Hero_DeBuff.XuanYun: {
                gameEffectId = GameEffectId.xuanyun;
            } break;
        }
        return gameEffectId;
    }

    getGameEffectNameByDebuff(buff: Hero_DeBuff): string {
        let name = '0';
        switch (buff) {
            case Hero_DeBuff.XuanYun: {
                name = GameEffectId.xuanyun + '';
            } break;
        }
        return name;
    }

    addXuanYunListen(callback: Function) {
        this.xuanyun_callback = callback;
    }

    resetState() {
        this.setCD(1 / 3);
        this.removeAllBuff();
        this.removeAllDeBuff();
        this.map_buff_state.forEach((v, k) => {
            v.destroySelf();
        });
        this.map_debuff_state.forEach((v, k) => {
            v.destroySelf();
        });
        if (this.reset_callback) {
            this.reset_callback();
        }
        //同步数据信息
        this.hero_data = GameManager.getInstance().game_hero_data.get(this.hero_type);
    }

    /**添加一个buff状态图标 */
    addBuffState(buffId: BuffId, remainTime: number) {
        let types = BuffStateManager.getInstance().getBuffType(buffId);
        for (let i = 0; i < types.length; i++) {
            let type = types[i];
            if (this.map_buff_state.has(type)) {
                this.map_buff_state.get(type).refreshTime(remainTime);
            } else {
                let bfState = BuffStateManager.getInstance().createBuffState(type, this.hero_type);
                bfState.init(type, remainTime, this.onBuffStateDestory.bind(this));
                this.map_buff_state.set(type, bfState);
                //this.node.addChild(shield.node);
            }
        }
    }

    onBuffStateDestory(type: BuffStateType) {
        this.map_buff_state.delete(type);
    }

    /**添加一个buff状态图标 */
    addDeBuffState(buffId: BuffId, remainTime: number) {
        let types = BuffStateManager.getInstance().getDeBuffType(buffId);
        for (let i = 0; i < types.length; i++) {
            let type = types[i];
            if (this.map_debuff_state.has(type)) {
                this.map_debuff_state.get(type).refreshTime(remainTime);
            } else {
                let bfState = BuffStateManager.getInstance().createDeBuffState(type, this.hero_type);
                bfState.init(type, remainTime, this.onDeBuffStateDestory.bind(this));
                this.map_debuff_state.set(type, bfState);
                //this.node.addChild(shield.node);
            }
        }
    }

    onDeBuffStateDestory(type: BuffStateType) {
        this.map_debuff_state.delete(type);
    }

    /**设置攻速，每秒攻击次数 */
    private setAttackSpeed(numSec: number) {
        this.gongji_sudu = numSec;
        if (numSec > 10) {
            numSec = 10;
        }
        if (numSec < 0.1) {
            numSec = 0.1;
        }
        this.hero_data.gongji_jiange = 1 / numSec;
    }
    /**改变当前攻速,buffData:比率 */
    private changeAttackSpeed(rate: number) {
        let gjsd = this.getAttackSpeed();
        gjsd += (rate) * (1 / this.hero_data.base_jiange);
        this.setAttackSpeed(gjsd);
    }
    /**获得当前攻速 */
    private getAttackSpeed(): number {
        return 1 / this.hero_data.gongji_jiange;
    }

    //---------------------------状态,动画----------------------------------------------
    public setHeroState(state: Hero_State, fangxiang: GongJi_FangXiang, data?: KeyFrameData[], endCallback?: Function) {
        this.hero_state = state;
        this.cur_fangxiang = fangxiang;
        switch (this.cur_fangxiang) {
            case GongJi_FangXiang.zuo: {
                this.node.scaleX = -this.setup_scale;
            } break;
            case GongJi_FangXiang.zhong: {
                this.node.scaleX = this.setup_scale;
            } break;
            case GongJi_FangXiang.you: {
                this.node.scaleX = this.setup_scale;
            } break;
        }
        //播放动画
        switch (this.hero_state) {
            case Hero_State.idle: {
                this.playSpineAnimation(this.getSpineName(), true, null, null);
            } break;
            case Hero_State.attack: {
                this.playSpineAnimation(this.getSpineName(), false, data, endCallback);
            } break;
            case Hero_State.skill:
                {
                    this.playSpineAnimation(this.getSpineName(), false, data, endCallback);
                } break;
        }
    }

    protected setHeroStateAndAnimation(state: Hero_State, name: string, loop: boolean, data?: KeyFrameData[], endCallback?: Function) {
        this.hero_state = state;
        this.playSpineAnimation(name, loop, data, endCallback);
    }

    getHeroState() {
        return this.hero_state;
    }

    /**根据敌人位置获得攻击方向 */
    protected getFangXiangByPos(pos: cc.Vec2): GongJi_FangXiang {
        //对敌人单位进行方向判断，确定打击方向
        let fangxiang = GongJi_FangXiang.zhong;
        let offsetPos = pos.sub(this.node.getPosition());
        let pi2 = Math.PI * 2;
        let radian = (Math.atan2(offsetPos.y, offsetPos.x) + pi2) % pi2;
        let angle = 180 * radian / Math.PI;
        if (angle <= 60) {
            fangxiang = GongJi_FangXiang.you;
        } else if (angle > 60 && angle < 120) {
            fangxiang = GongJi_FangXiang.zhong;
        } else if (angle >= 120 && angle <= 180) {
            fangxiang = GongJi_FangXiang.zuo;
        }
        return fangxiang;
    }

    getSpineName(): string {
        switch (this.hero_state) {
            case Hero_State.attack: {
                return Hero_State_Name.Attack;
            } break;
            case Hero_State.skill: {
                return Hero_State_Name.Skill;
            } break;
            case Hero_State.idle: {
                return Hero_State_Name.Idle;
            } break;
        }
    }
    /**
     * 播放一个骨骼动画
     * @param name 骨骼动画名称
     * @param isLoop 是否循环
     * @param data 是否监听关键帧，关键帧数据包含关键帧名称，监听到关键帧后的回调
     * @param endCallback 播放结束后的回调
     */
    playSpineAnimation(name: string, isLoop: boolean = false, data?: KeyFrameData[], endCallback?: Function) {
        let anima = this.spine.setAnimation(0, name, isLoop);
        if (data) {
            this.spine.setTrackEventListener(anima, (entry: sp.spine.TrackEntry, event) => {
                for (let i = 0; i < data.length; i++) {
                    if (event.data.name == data[i].name) {
                        data[i].callback();
                    }
                }
            })
        }
        if (endCallback) {
            this.spine.setTrackCompleteListener(anima, (entry: sp.spine.TrackEntry, event) => {
                anima.listener = null;
                endCallback();
            })
        }
    }

    //------------------------------CD--------------------------------------

    public resetSkill() {
        this.skill_cd_time = 0;
        this.showCD();
    }

    public resetCD() {
        this.skill_cd_time = this.skill_total_time;
        this.showCD();
        //释放了技能，立马减去MP
        //GameManager.getInstance().wall_data.changeMp(-this.hero_data.cost_mp);
    }
    /**百分比 */
    public setCD(perTime: number) {
        this.skill_cd_time = perTime * this.hero_data.getSkillColdDown(SkillType.Active);;
        this.changeCD(0);
    }

    public changeCD(time: number) {
        this.skill_cd_time += time;
        if (this.skill_cd_time <= 0) {
            this.skill_cd_time = 0;
            if (this.mp_progress) {
                this.mp_progress.setNormalSP();
            }
            if (GameManager.getInstance().auto_fighting && GameManager.getInstance().cur_game_state == GameState.Game_Playing && this.getIsCanSkill() && SkillManager.getInstance().getIsSkillState() == false) {
                this.startAutoRelease();
            }
        } else {
            //显示蒙板和倒计时
            if (this.mp_progress) {
                this.mp_progress.setCDSP();
            }
        }
        this.showCD();
    }

    private showCD() {
        if (this.mp_progress) {
            let progress = 1 - this.skill_cd_time / this.skill_total_time;
            this.mp_progress.setProgress(progress);
        }
    }

    getIsCanSkill(): boolean {
        if (this.isHaveDeBuff(BuffId.Monster_XuanYun) || this.getHeroState() == Hero_State.exit) {
            return false;
        }
        this.is_show_mp_hint = false;
        if (this.skill_cd_time <= 0) {
            if (this.is_need_check_distance) {
                //如果需要判断释放距离的，则需要判断释放距离内有没有怪物，没有则返回false
                let enemys = MonsterManager.getInstance().getMonstersForNearestBySkill(this.max_gongji_num, this.node.y, this.casting_distance);
                if (enemys == null) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }
    /**
     * 
     * @param damage 本次不暴击的伤害值
     * @param isBullet 是否子弹类型
     * @param skillType 技能类型
     * @param skillRate 如果是技能，技能的比率
     * @param continuousRate 伤害比率-应用在持续伤害比率
     * @returns 攻击数据
     */
    getGongJiData(damageType: DamageType, isBullet: boolean, skillType: SkillType, skillRate: number = 1, continuousRate: number = 0): GongJiData {
        let gjData = new GongJiData();
        gjData.hero_data = cc.instantiate(this.hero_data);
        gjData.is_bullet = isBullet;
        gjData.damage_type = damageType;
        gjData.hero_type = this.hero_type;
        if (damageType == DamageType.Normal) {

        } else {
            //技能伤害比率
            gjData.skill_damage_rate = skillRate;
            gjData.continuous_damage_rate = continuousRate;
            if (skillType == SkillType.Active) {
                gjData.skill_release_id = this.getSkillReleaseId();
            }
        }
        return gjData;
    }

    onDamageMonster(damageType: DamageType, isCrit: boolean, monster: cc.Node) {
        if (damageType == DamageType.Normal) {
            if (this.pet) {
                this.pet.onHeroHitMonster(monster);
            }
        }
        if (this.hit_callback) {
            this.hit_callback(damageType, isCrit, monster);
        }
    }

    resetGongJiJiShu() {
        this.gongji_jishu = 0;
        this.is_can_jishu = true;
    }

    resetNormalAttack() {
        this.gongji_jishu = this.hero_data.gongji_jiange;
        this.is_can_jishu = true;
    }

    setAttSpineScale() {
        this.spine.timeScale = this.hero_data.base_jiange / this.hero_data.gongji_jiange;
    }

    startNormalAttack(monster: cc.Node) {
        let isDouble: boolean = this.is_double_attack;
        if (this.is_double_attack) {
            this.spine.timeScale = this.hero_data.base_jiange / this.hero_data.gongji_jiange * 2;
        }
        this.is_double_attack = false;
        this.attack_callback(monster);
        if (this.pet) {
            this.pet.startReleaseSkill(monster);
        }
        if (GameManager.getInstance().cur_game_mode == GameMode.Endless) {
            if (isDouble == false) {
                let buff = this.getEndlessByType(EndlessBuffType.DoubleAttack)
                if (buff) {
                    //概率
                    let rate = buff.value;
                    if (Math.random() < rate) {
                        this.is_double_attack = true;
                        this.spine.timeScale = this.hero_data.base_jiange / this.hero_data.gongji_jiange * 2;
                    }
                }
            }
        }
    }

    //---------------------------UPDATE-----------------------------------
    update(dt: number) {
        if (GameManager.getInstance().cur_game_state != GameState.Game_Playing || Hero_State.exit == this.getHeroState())
            return;
        this.checkSkill(dt);
        if (this.isHaveDeBuff(BuffId.Monster_XuanYun)) {
            return;
        }
        this.checkAttack(dt);
        if (this.click_remain > 0) {
            this.click_remain -= dt;
        }

        switch (this.speedType) {
            case SpeedType.STOP:
                this.moveSpeed = this.stopSpeed;
                break;
            case SpeedType.NORMAL:
                this.moveSpeed = this.normalSpeed;
                break;
            case SpeedType.FAST:
                this.moveSpeed = this.fastSpeed;
                break;
            default:
                break;
        }


        this.move();

    }

    protected updateCheck(dt): boolean {
        if (this.isHaveDeBuff(BuffId.Monster_XuanYun)) {
            return false;
        }
        this.checkAttack(dt);

        return true;
    }

    private checkSkill(dt: number) {
        if (this.hero_state != Hero_State.skill) {
            this.changeCD(-dt);
        }
    }

    private checkAttack(dt) {
        if (this.is_can_jishu && this.is_load_ok) {
            this.gongji_jishu += dt;
            if (this.gongji_jishu >= this.hero_data.gongji_jiange) {
                //开始攻击
                this.gongji_jishu = 0;
                this.is_can_gongji = true;
            }
        }
        //自动攻击
        if (this.is_can_gongji && this.getHeroState() != Hero_State.skill) {
            this.is_can_gongji = false;
            let monsters = MonsterManager.getInstance().getMonstersForNearest(this.max_gongji_num, this.node.getPosition(), this.hero_data.gongji_fanwei);
            if (monsters) {
                this.gongji_jishu = 0;
                this.is_can_gongji = true;
                this.setAttSpineScale();
                this.startNormalAttack(monsters[0]);
            }

        }
    }

}
