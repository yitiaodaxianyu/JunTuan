"use strict";
cc._RF.push(module, '62bd8QrACBKzZel1xMJyvNr', 'Boss');
// Scripts/Boss/Boss.ts

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
var Constants_1 = require("../Constants");
var BossHpProgressBar_1 = require("./BossHpProgressBar");
var EnemyConfig_1 = require("../Enemy/EnemyConfig");
var GameEffectsManager_1 = require("../Game/GameEffectsManager");
var GameManager_1 = require("../GameManager");
var Monster_1 = require("../Monster/Monster");
var HeroConfig_1 = require("../Hero/Game/HeroConfig");
var BuffData_1 = require("../Hero/Game/BuffData");
var PosType;
(function (PosType) {
    PosType[PosType["ZhongXin"] = 0] = "ZhongXin";
    PosType[PosType["Radian0"] = 1] = "Radian0";
    PosType[PosType["Radian60"] = 2] = "Radian60";
    PosType[PosType["Radian120"] = 3] = "Radian120";
    PosType[PosType["Radian180"] = 4] = "Radian180";
    PosType[PosType["Radian240"] = 5] = "Radian240";
    PosType[PosType["Radian300"] = 6] = "Radian300";
    PosType[PosType["Num"] = 7] = "Num";
})(PosType || (PosType = {}));
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Boss = /** @class */ (function (_super) {
    __extends(Boss, _super);
    function Boss() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**血条进度条 */
        _this.boss_hp_progress = null;
        /**怪物血量发生变化时的回调 */
        _this.change_boss_hp_callback = null;
        /**初始化回调 */
        _this.boss_init_callback = null;
        /**-------------------------------统一移动相关属性-------------------------------------- */
        /**当前所处的位置类型 */
        _this.cur_pos_type = PosType.ZhongXin;
        /**下一个要移动到的位置类型 */
        _this.next_pos_type = PosType.ZhongXin;
        /**移动轨迹数组 */
        _this.moving_track = [];
        /**攻击触发的回调 */
        _this.att_callback = null;
        /**开始移动的触发的回调 */
        _this.move_callback = null;
        _this.is_init_hp = false;
        return _this;
        /**--------------------------------------------统一移动---------------------------------------- */
        /**初始化移动轨迹 */
        // initMovingTrack(){
        //     let width=222;
        //     let cPos=GameManager.getInstance().getFightCenter();
        //     let aRadian=Math.PI/3;
        //     this.moving_track=new Array();
        //     this.moving_track.push(cPos);
        //     // let gg=cc.find('Canvas/Fighting_Root').getComponent(cc.Graphics);
        //     // gg.moveTo(cPos.x,cPos.y);
        //     for(let i=PosType.Radian0; i<PosType.Num; i++){
        //         let radian=(i-1)*aRadian;
        //         let posX=cPos.x+width*Math.cos(radian);
        //         let posY=cPos.y+width*Math.sin(radian);
        //         this.moving_track.push(cc.v2(posX,posY));
        //         //gg.lineTo(posX,posY);
        //     }
        //     //gg.stroke();
        // }
        // /**获取下一个目标地点的坐标 */
        // getNextPos():cc.Vec2{
        //     return this.moving_track[this.next_pos_type];
        // }
        // /**获取一个随机的目标的坐标 */
        // getRandomPos():cc.Vec2{
        //     let pos=cc.v2(0,0);
        //     let randType=[];
        //     if(this.cur_pos_type==PosType.ZhongXin){
        //         for(let i=PosType.Radian0; i<PosType.Num; i++){
        //             randType.push(i);
        //         }
        //     }else{
        //         let nextType=this.cur_pos_type+1;
        //             if(nextType>=PosType.Num){
        //                 nextType=PosType.Radian0;
        //             }
        //             let prevType=this.cur_pos_type-1;
        //             if(prevType<=PosType.ZhongXin){
        //                 prevType=PosType.Radian300;
        //             }
        //             randType=[PosType.ZhongXin,nextType,prevType];
        //     }        
        //     let randIndex=Math.floor(Math.random()*randType.length);
        //     this.next_pos_type=randType[randIndex]
        //     pos=this.moving_track[this.next_pos_type];
        //     return pos;
        // }
        // /**开始移动 */
        // startMove(dt:number,pos?:cc.Vec2){
        //     super.setEnemyState(Enemy_State.move);        
        //     pos=pos?pos:this.getRandomPos();
        //     this.setTargetPos(pos,()=>{
        //         this.cur_pos_type=this.next_pos_type;
        //         if(this.node.x<-128){
        //             this.node.scaleX=this.setup_scale;
        //         }
        //         if(this.node.x>128){
        //             this.node.scaleX=-this.setup_scale;
        //         }
        //         this.startAttack();
        //     })
        //     if(this.move_callback){
        //         this.move_callback();
        //     }
        // }
        // /**设置要移动到的目标地点坐标 */
        // setTargetPos(pos:cc.Vec2,endCallback:Function){
        //     this.move_target_pos=pos;
        //     this.move_end_callback=endCallback;
        // }
        // /**开始攻击 */
        // startAttack(){
        //     //有前摇动作
        //     this.unschedule(this.startMove);
        //     super.setEnemyState(Enemy_State.att);
        //     if(this.att_callback){
        //         this.att_callback();
        //     }
        // }
    }
    Boss.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        this.addChangeHpListen(this.onChangeBossHp);
        this.addInitListen(this.onInited);
        //this.initMovingTrack();        
    };
    Boss.prototype.onInited = function () {
        var _this = this;
        if (GameManager_1.default.getInstance().cur_game_mode != Constants_1.GameMode.Boss_Challenge) {
            GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.boss_hp, 1, function () {
                var hpRoot = cc.find('Canvas/Ui_Root/top_ui/BossHpRoot');
                hpRoot.y = -108;
                var hpNode = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectForParent(GameEffectsManager_1.GameEffectId.boss_hp, cc.v2(0, 0), hpRoot);
                _this.boss_hp_progress = hpNode.getComponent(BossHpProgressBar_1.default);
                _this.boss_hp_progress.init(_this.getMaxHp(), _this.monster_id, _this.monster_level);
            });
        }
        if (this.boss_hp_progress) {
            this.boss_hp_progress.init(this.getMaxHp(), this.monster_id, this.monster_level);
        }
        if (this.boss_init_callback) {
            this.boss_init_callback();
        }
        this.node.opacity = 0;
        this.setEnemyState(EnemyConfig_1.Enemy_State.born);
        cc.tween(this.node).to(1, { opacity: 255 }).call(function () {
            _this.setEnemyState(EnemyConfig_1.Enemy_State.standby);
        }).start();
        if (GameManager_1.default.getInstance().cur_game_mode == Constants_1.GameMode.Boss_Challenge) {
            var buffData = new BuffData_1.BuffData();
            buffData.buff_id = HeroConfig_1.BuffId.Boss_Mode_JianShang;
            buffData.buff_value = [-1.2];
            buffData.remain_time = 30;
            _super.prototype.addDeBuff.call(this, buffData, null);
        }
    };
    Boss.prototype.addBossInitedListen = function (callback) {
        this.boss_init_callback = callback;
    };
    Boss.prototype.addChangeBossHpListen = function (callback) {
        this.change_boss_hp_callback = callback;
    };
    Boss.prototype.addAttackListen = function (callback) {
        this.att_callback = callback;
    };
    Boss.prototype.addMoveListen = function (callback) {
        this.move_callback = callback;
    };
    Boss.prototype.onChangeBossHp = function (num) {
        if (this.boss_hp_progress) {
            this.boss_hp_progress.setHp(this.getCurHp());
        }
        if (this.change_boss_hp_callback) {
            this.change_boss_hp_callback(num);
        }
    };
    Boss = __decorate([
        ccclass
    ], Boss);
    return Boss;
}(Monster_1.default));
exports.default = Boss;

cc._RF.pop();