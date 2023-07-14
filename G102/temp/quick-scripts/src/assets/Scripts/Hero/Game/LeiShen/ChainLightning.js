"use strict";
cc._RF.push(module, 'd8d26GoHC1FhbUQqyCxKAGG', 'ChainLightning');
// Scripts/Hero/Game/LeiShen/ChainLightning.ts

"use strict";
/**闪电链 */
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
var GameEffectsManager_1 = require("../../../Game/GameEffectsManager");
var GameManager_1 = require("../../../GameManager");
var MyTool_1 = require("../../../Tools/MyTool");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ChainLightning = /** @class */ (function (_super) {
    __extends(ChainLightning, _super);
    function ChainLightning() {
        // @property([cc.SpriteFrame])
        // sp_lights: cc.SpriteFrame[] = [];
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // @property([cc.SpriteFrame])
        // sp_lights_small: cc.SpriteFrame[] = [];
        _this.game_effect_id = GameEffectsManager_1.GameEffectId.lei_shen_shandian;
        _this._sp = null;
        _this.cur_sp_index = 0;
        /**首个敌人，为NULL时是英雄 */
        _this.first_monster = null;
        //@property(cc.Node)
        _this.end_monster = null;
        /**刷新间隔 */
        _this.refresh_jiange = 0.05;
        /**时间计数值 */
        _this.jishu = 0;
        /**当前闪电链的长度 */
        _this.cur_move_len = 0;
        /**加速度 */
        _this.jiasu_num = 0.0;
        /**到达时间,这个时间累计到一定时间后，闪电要开始消失 */
        _this.end_remain_time = 0;
        _this.max_remain_time = 0.2;
        /**到达回调 */
        _this.end_callback = null;
        /**释放需要继续判断 */
        _this.is_need_update = true;
        return _this;
    }
    ChainLightning.prototype.onLoad = function () {
        this.node.getComponent(cc.Animation).on(cc.Animation.EventType.FINISHED, this.destroySelf.bind(this));
    };
    ChainLightning.prototype.init = function (gameEffectId, first, end, endCallback) {
        // if(!this._sp){
        //     this._sp=this.node.getComponent(cc.Sprite);
        // }
        this.end_callback = endCallback;
        this.game_effect_id = gameEffectId;
        this.first_monster = first;
        this.end_monster = end;
        this.jiasu_num = 0;
        this.end_remain_time = this.max_remain_time;
        // this._sp.fillStart=0;
        // this._sp.fillRange=0;
        this.is_need_update = true;
        var animation = this.node.getComponent(cc.Animation);
        animation.play();
        this.setShanDian();
    };
    ChainLightning.prototype.onNext = function () {
        if (this.end_callback) {
            this.end_callback(this.end_monster);
            this.end_callback = null;
        }
    };
    ChainLightning.prototype.destroySelf = function () {
        this.is_need_update = false;
        GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(this.game_effect_id, this.node);
    };
    ChainLightning.prototype.lateUpdate = function (dt) {
        if (GameManager_1.default.getInstance().cur_game_state != Constants_1.GameState.Game_Playing || this.is_need_update == false) {
            return;
        }
        this.setShanDian();
    };
    // update (dt:number) {
    //     if(GameManager.getInstance().cur_game_state!=GameState.Game_Playing||this.is_need_update==false){
    //         return;
    //     }
    //     this.setShanDian();
    //     // this.jishu+=dt;
    //     // if(this.jishu>=this.refresh_jiange){
    //     //     this.jishu=0;            
    //     //     //刷新帧
    //     //     if(this.node.height>=150){
    //     //         this.cur_sp_index=MyTool.getRandomIndex(this.sp_lights.length,this.cur_sp_index);
    //     //         this._sp.spriteFrame=this.sp_lights[this.cur_sp_index];
    //     //         // this.node.scaleX=this.node.height/300;
    //     //         // if(this.node.scaleX>1){
    //     //         //     this.node.scaleX=1;
    //     //         // }else if(this.node.scaleX<0.5){
    //     //         //     this.node.scaleX=0.5;
    //     //         // }
    //     //     }else{
    //     //         this.cur_sp_index=MyTool.getRandomIndex(this.sp_lights_small.length,this.cur_sp_index);
    //     //         this._sp.spriteFrame=this.sp_lights_small[this.cur_sp_index];
    //     //         // this.node.scaleX=this.node.height/150;
    //     //         // if(this.node.scaleX>1){
    //     //         //     this.node.scaleX=1;
    //     //         // }else if(this.node.scaleX<0.5){
    //     //         //     this.node.scaleX=0.5;
    //     //         // }
    //     //     }
    //     // }
    //     // this.jiasu_num+=1;
    //     // let range=this._sp.fillRange+dt*(1+this.jiasu_num);
    //     // if( range>=1){
    //     //     range=1;
    //     //     this.end_remain_time-=dt;
    //     //     if(this.end_remain_time<0){
    //     //         this.end_remain_time=0;
    //     //     }
    //     //     this._sp.fillStart=(this.max_remain_time-this.end_remain_time)/this.max_remain_time;            
    //     //     if(this._sp.fillStart>=1){
    //     //         this.destroySelf();
    //     //     }
    //     // }
    //     // this._sp.fillRange=range;
    //     // if(range>=1){
    //     //     if(this.end_callback){
    //     //         this.end_callback(this.end_monster);
    //     //         this.end_callback=null;
    //     //     }
    //     // }
    // }
    ChainLightning.prototype.setShanDian = function () {
        if (this.first_monster) {
            this.node.setPosition(this.first_monster.getCenterPos());
        }
        //跟随闪电链的末端目标
        var offsetPos = this.end_monster.getCenterPos().sub(this.node.getPosition());
        var pi2 = Math.PI * 2;
        var dir = (Math.atan2(offsetPos.y, offsetPos.x) + pi2) % pi2;
        var angle = MyTool_1.default.radianToAngle(dir) - 90;
        this.node.angle = angle;
        this.node.height = offsetPos.mag();
    };
    ChainLightning = __decorate([
        ccclass
    ], ChainLightning);
    return ChainLightning;
}(cc.Component));
exports.default = ChainLightning;

cc._RF.pop();