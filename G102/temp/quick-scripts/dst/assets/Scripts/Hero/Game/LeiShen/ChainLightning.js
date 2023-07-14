
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Hero/Game/LeiShen/ChainLightning.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcR2FtZVxcTGVpU2hlblxcQ2hhaW5MaWdodG5pbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLFNBQVM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVULGdEQUErQztBQUMvQyx1RUFBb0Y7QUFDcEYsb0RBQStDO0FBRS9DLGdEQUEyQztBQUVyQyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUE0QyxrQ0FBWTtJQUF4RDtRQUVJLDhCQUE4QjtRQUM5QixvQ0FBb0M7UUFIeEMscUVBeUlDO1FBcElHLDhCQUE4QjtRQUM5QiwwQ0FBMEM7UUFFMUMsb0JBQWMsR0FBYyxpQ0FBWSxDQUFDLGlCQUFpQixDQUFDO1FBQzNELFNBQUcsR0FBVyxJQUFJLENBQUM7UUFDbkIsa0JBQVksR0FBUSxDQUFDLENBQUM7UUFDdEIsb0JBQW9CO1FBQ3BCLG1CQUFhLEdBQVMsSUFBSSxDQUFDO1FBQzNCLG9CQUFvQjtRQUNwQixpQkFBVyxHQUFTLElBQUksQ0FBQztRQUN6QixVQUFVO1FBQ1Ysb0JBQWMsR0FBUSxJQUFJLENBQUM7UUFDM0IsV0FBVztRQUNYLFdBQUssR0FBUSxDQUFDLENBQUM7UUFDZixjQUFjO1FBQ2Qsa0JBQVksR0FBUSxDQUFDLENBQUM7UUFDdEIsU0FBUztRQUNULGVBQVMsR0FBUSxHQUFHLENBQUM7UUFDckIsK0JBQStCO1FBQy9CLHFCQUFlLEdBQVEsQ0FBQyxDQUFDO1FBQ3pCLHFCQUFlLEdBQVEsR0FBRyxDQUFDO1FBQzNCLFVBQVU7UUFDVixrQkFBWSxHQUFVLElBQUksQ0FBQztRQUMzQixjQUFjO1FBQ2Qsb0JBQWMsR0FBUyxJQUFJLENBQUM7O0lBNEdoQyxDQUFDO0lBMUdHLCtCQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsU0FBUyxD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QUFDO1lBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztTQUM1RDtRQUNELFlBQVk7UUFDWixJQUFJLFNBQVMsR0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFDM0UsSUFBSSxHQUFHLEdBQUMsSUFBSSxDQUFDLEVBQUUsR0FBQyxDQUFDLENBQUM7UUFDbEIsSUFBSSxHQUFHLEdBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFDLEdBQUcsQ0FBQyxHQUFDLEdBQUcsQ0FBQztRQUN0RCxJQUFJLEtBQUssR0FBQyxnQkFBTSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsR0FBQyxFQUFFLENBQUM7UUFDdkMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUMsS0FBSyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBeElnQixjQUFjO1FBRGxDLE9BQU87T0FDYSxjQUFjLENBeUlsQztJQUFELHFCQUFDO0NBeklELEFBeUlDLENBekkyQyxFQUFFLENBQUMsU0FBUyxHQXlJdkQ7a0JBeklvQixjQUFjIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLyoq6Zeq55S16ZO+ICovXHJcblxyXG5pbXBvcnQgeyBHYW1lU3RhdGUgfSBmcm9tIFwiLi4vLi4vLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IEdhbWVFZmZlY3RJZCwgR2FtZUVmZmVjdHNNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uLy4uL0dhbWUvR2FtZUVmZmVjdHNNYW5hZ2VyXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vLi4vLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IE1vbnN0ZXIgZnJvbSBcIi4uLy4uLy4uL01vbnN0ZXIvTW9uc3RlclwiO1xyXG5pbXBvcnQgTXlUb29sIGZyb20gXCIuLi8uLi8uLi9Ub29scy9NeVRvb2xcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2hhaW5MaWdodG5pbmcgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIC8vIEBwcm9wZXJ0eShbY2MuU3ByaXRlRnJhbWVdKVxyXG4gICAgLy8gc3BfbGlnaHRzOiBjYy5TcHJpdGVGcmFtZVtdID0gW107XHJcblxyXG4gICAgLy8gQHByb3BlcnR5KFtjYy5TcHJpdGVGcmFtZV0pXHJcbiAgICAvLyBzcF9saWdodHNfc21hbGw6IGNjLlNwcml0ZUZyYW1lW10gPSBbXTtcclxuXHJcbiAgICBnYW1lX2VmZmVjdF9pZDpHYW1lRWZmZWN0SWQ9R2FtZUVmZmVjdElkLmxlaV9zaGVuX3NoYW5kaWFuO1xyXG4gICAgX3NwOmNjLlNwcml0ZT1udWxsO1xyXG4gICAgY3VyX3NwX2luZGV4Om51bWJlcj0wO1xyXG4gICAgLyoq6aaW5Liq5pWM5Lq677yM5Li6TlVMTOaXtuaYr+iLsembhCAqL1xyXG4gICAgZmlyc3RfbW9uc3RlcjpNb25zdGVyPW51bGw7XHJcbiAgICAvL0Bwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgZW5kX21vbnN0ZXI6TW9uc3Rlcj1udWxsO1xyXG4gICAgLyoq5Yi35paw6Ze06ZqUICovXHJcbiAgICByZWZyZXNoX2ppYW5nZTpudW1iZXI9MC4wNTtcclxuICAgIC8qKuaXtumXtOiuoeaVsOWAvCAqL1xyXG4gICAgamlzaHU6bnVtYmVyPTA7XHJcbiAgICAvKirlvZPliY3pl6rnlLXpk77nmoTplb/luqYgKi9cclxuICAgIGN1cl9tb3ZlX2xlbjpudW1iZXI9MDtcclxuICAgIC8qKuWKoOmAn+W6piAqL1xyXG4gICAgamlhc3VfbnVtOm51bWJlcj0wLjA7XHJcbiAgICAvKirliLDovr7ml7bpl7Qs6L+Z5Liq5pe26Ze057Sv6K6h5Yiw5LiA5a6a5pe26Ze05ZCO77yM6Zeq55S16KaB5byA5aeL5raI5aSxICovXHJcbiAgICBlbmRfcmVtYWluX3RpbWU6bnVtYmVyPTA7XHJcbiAgICBtYXhfcmVtYWluX3RpbWU6bnVtYmVyPTAuMjtcclxuICAgIC8qKuWIsOi+vuWbnuiwgyAqL1xyXG4gICAgZW5kX2NhbGxiYWNrOkZ1bmN0aW9uPW51bGw7XHJcbiAgICAvKirph4rmlL7pnIDopoHnu6fnu63liKTmlq0gKi9cclxuICAgIGlzX25lZWRfdXBkYXRlOmJvb2xlYW49dHJ1ZTtcclxuXHJcbiAgICBvbkxvYWQoKXtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikub24oY2MuQW5pbWF0aW9uLkV2ZW50VHlwZS5GSU5JU0hFRCx0aGlzLmRlc3Ryb3lTZWxmLmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXQoZ2FtZUVmZmVjdElkOkdhbWVFZmZlY3RJZCxmaXJzdDpNb25zdGVyLGVuZDpNb25zdGVyLGVuZENhbGxiYWNrOkZ1bmN0aW9uKXtcclxuICAgICAgICAvLyBpZighdGhpcy5fc3Ape1xyXG4gICAgICAgIC8vICAgICB0aGlzLl9zcD10aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIHRoaXMuZW5kX2NhbGxiYWNrPWVuZENhbGxiYWNrO1xyXG4gICAgICAgIHRoaXMuZ2FtZV9lZmZlY3RfaWQ9Z2FtZUVmZmVjdElkO1xyXG4gICAgICAgIHRoaXMuZmlyc3RfbW9uc3Rlcj1maXJzdDtcclxuICAgICAgICB0aGlzLmVuZF9tb25zdGVyPWVuZDtcclxuICAgICAgICB0aGlzLmppYXN1X251bT0wO1xyXG4gICAgICAgIHRoaXMuZW5kX3JlbWFpbl90aW1lPXRoaXMubWF4X3JlbWFpbl90aW1lO1xyXG4gICAgICAgIC8vIHRoaXMuX3NwLmZpbGxTdGFydD0wO1xyXG4gICAgICAgIC8vIHRoaXMuX3NwLmZpbGxSYW5nZT0wO1xyXG4gICAgICAgIHRoaXMuaXNfbmVlZF91cGRhdGU9dHJ1ZTtcclxuICAgICAgICBsZXQgYW5pbWF0aW9uPXRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKTtcclxuICAgICAgICBhbmltYXRpb24ucGxheSgpOyAgICAgICAgXHJcbiAgICAgICAgdGhpcy5zZXRTaGFuRGlhbigpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uTmV4dCgpe1xyXG4gICAgICAgIGlmKHRoaXMuZW5kX2NhbGxiYWNrKXtcclxuICAgICAgICAgICAgdGhpcy5lbmRfY2FsbGJhY2sodGhpcy5lbmRfbW9uc3Rlcik7XHJcbiAgICAgICAgICAgIHRoaXMuZW5kX2NhbGxiYWNrPW51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRlc3Ryb3lTZWxmKCl7XHJcbiAgICAgICAgdGhpcy5pc19uZWVkX3VwZGF0ZT1mYWxzZTtcclxuICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5kZXN0cm95R2FtZUVmZmVjdEJ5SWQodGhpcy5nYW1lX2VmZmVjdF9pZCx0aGlzLm5vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBsYXRlVXBkYXRlKGR0OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZihHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX3N0YXRlIT1HYW1lU3RhdGUuR2FtZV9QbGF5aW5nfHx0aGlzLmlzX25lZWRfdXBkYXRlPT1mYWxzZSl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXRTaGFuRGlhbigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHVwZGF0ZSAoZHQ6bnVtYmVyKSB7XHJcbiAgICAvLyAgICAgaWYoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zdGF0ZSE9R2FtZVN0YXRlLkdhbWVfUGxheWluZ3x8dGhpcy5pc19uZWVkX3VwZGF0ZT09ZmFsc2Upe1xyXG4gICAgLy8gICAgICAgICByZXR1cm47XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gICAgIHRoaXMuc2V0U2hhbkRpYW4oKTtcclxuICAgIC8vICAgICAvLyB0aGlzLmppc2h1Kz1kdDtcclxuICAgIC8vICAgICAvLyBpZih0aGlzLmppc2h1Pj10aGlzLnJlZnJlc2hfamlhbmdlKXtcclxuICAgIC8vICAgICAvLyAgICAgdGhpcy5qaXNodT0wOyAgICAgICAgICAgIFxyXG4gICAgLy8gICAgIC8vICAgICAvL+WIt+aWsOW4p1xyXG4gICAgLy8gICAgIC8vICAgICBpZih0aGlzLm5vZGUuaGVpZ2h0Pj0xNTApe1xyXG4gICAgLy8gICAgIC8vICAgICAgICAgdGhpcy5jdXJfc3BfaW5kZXg9TXlUb29sLmdldFJhbmRvbUluZGV4KHRoaXMuc3BfbGlnaHRzLmxlbmd0aCx0aGlzLmN1cl9zcF9pbmRleCk7XHJcbiAgICAvLyAgICAgLy8gICAgICAgICB0aGlzLl9zcC5zcHJpdGVGcmFtZT10aGlzLnNwX2xpZ2h0c1t0aGlzLmN1cl9zcF9pbmRleF07XHJcbiAgICAvLyAgICAgLy8gICAgICAgICAvLyB0aGlzLm5vZGUuc2NhbGVYPXRoaXMubm9kZS5oZWlnaHQvMzAwO1xyXG4gICAgLy8gICAgIC8vICAgICAgICAgLy8gaWYodGhpcy5ub2RlLnNjYWxlWD4xKXtcclxuICAgIC8vICAgICAvLyAgICAgICAgIC8vICAgICB0aGlzLm5vZGUuc2NhbGVYPTE7XHJcbiAgICAvLyAgICAgLy8gICAgICAgICAvLyB9ZWxzZSBpZih0aGlzLm5vZGUuc2NhbGVYPDAuNSl7XHJcbiAgICAvLyAgICAgLy8gICAgICAgICAvLyAgICAgdGhpcy5ub2RlLnNjYWxlWD0wLjU7XHJcbiAgICAvLyAgICAgLy8gICAgICAgICAvLyB9XHJcbiAgICAvLyAgICAgLy8gICAgIH1lbHNle1xyXG4gICAgLy8gICAgIC8vICAgICAgICAgdGhpcy5jdXJfc3BfaW5kZXg9TXlUb29sLmdldFJhbmRvbUluZGV4KHRoaXMuc3BfbGlnaHRzX3NtYWxsLmxlbmd0aCx0aGlzLmN1cl9zcF9pbmRleCk7XHJcbiAgICAvLyAgICAgLy8gICAgICAgICB0aGlzLl9zcC5zcHJpdGVGcmFtZT10aGlzLnNwX2xpZ2h0c19zbWFsbFt0aGlzLmN1cl9zcF9pbmRleF07XHJcbiAgICAvLyAgICAgLy8gICAgICAgICAvLyB0aGlzLm5vZGUuc2NhbGVYPXRoaXMubm9kZS5oZWlnaHQvMTUwO1xyXG4gICAgLy8gICAgIC8vICAgICAgICAgLy8gaWYodGhpcy5ub2RlLnNjYWxlWD4xKXtcclxuICAgIC8vICAgICAvLyAgICAgICAgIC8vICAgICB0aGlzLm5vZGUuc2NhbGVYPTE7XHJcbiAgICAvLyAgICAgLy8gICAgICAgICAvLyB9ZWxzZSBpZih0aGlzLm5vZGUuc2NhbGVYPDAuNSl7XHJcbiAgICAvLyAgICAgLy8gICAgICAgICAvLyAgICAgdGhpcy5ub2RlLnNjYWxlWD0wLjU7XHJcbiAgICAvLyAgICAgLy8gICAgICAgICAvLyB9XHJcbiAgICAvLyAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAvLyAgICAgLy8gfVxyXG5cclxuICAgIC8vICAgICAvLyB0aGlzLmppYXN1X251bSs9MTtcclxuICAgIC8vICAgICAvLyBsZXQgcmFuZ2U9dGhpcy5fc3AuZmlsbFJhbmdlK2R0KigxK3RoaXMuamlhc3VfbnVtKTtcclxuICAgIC8vICAgICAvLyBpZiggcmFuZ2U+PTEpe1xyXG4gICAgLy8gICAgIC8vICAgICByYW5nZT0xO1xyXG4gICAgLy8gICAgIC8vICAgICB0aGlzLmVuZF9yZW1haW5fdGltZS09ZHQ7XHJcbiAgICAvLyAgICAgLy8gICAgIGlmKHRoaXMuZW5kX3JlbWFpbl90aW1lPDApe1xyXG4gICAgLy8gICAgIC8vICAgICAgICAgdGhpcy5lbmRfcmVtYWluX3RpbWU9MDtcclxuICAgIC8vICAgICAvLyAgICAgfVxyXG4gICAgLy8gICAgIC8vICAgICB0aGlzLl9zcC5maWxsU3RhcnQ9KHRoaXMubWF4X3JlbWFpbl90aW1lLXRoaXMuZW5kX3JlbWFpbl90aW1lKS90aGlzLm1heF9yZW1haW5fdGltZTsgICAgICAgICAgICBcclxuICAgIC8vICAgICAvLyAgICAgaWYodGhpcy5fc3AuZmlsbFN0YXJ0Pj0xKXtcclxuICAgIC8vICAgICAvLyAgICAgICAgIHRoaXMuZGVzdHJveVNlbGYoKTtcclxuICAgIC8vICAgICAvLyAgICAgfVxyXG4gICAgLy8gICAgIC8vIH1cclxuICAgIC8vICAgICAvLyB0aGlzLl9zcC5maWxsUmFuZ2U9cmFuZ2U7XHJcbiAgICAvLyAgICAgLy8gaWYocmFuZ2U+PTEpe1xyXG4gICAgLy8gICAgIC8vICAgICBpZih0aGlzLmVuZF9jYWxsYmFjayl7XHJcbiAgICAvLyAgICAgLy8gICAgICAgICB0aGlzLmVuZF9jYWxsYmFjayh0aGlzLmVuZF9tb25zdGVyKTtcclxuICAgIC8vICAgICAvLyAgICAgICAgIHRoaXMuZW5kX2NhbGxiYWNrPW51bGw7XHJcbiAgICAvLyAgICAgLy8gICAgIH1cclxuICAgIC8vICAgICAvLyB9XHJcbiAgICAvLyB9XHJcblxyXG4gICAgc2V0U2hhbkRpYW4oKXtcclxuICAgICAgICBpZih0aGlzLmZpcnN0X21vbnN0ZXIpe1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24odGhpcy5maXJzdF9tb25zdGVyLmdldENlbnRlclBvcygpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/ot5/pmo/pl6rnlLXpk77nmoTmnKvnq6/nm67moIdcclxuICAgICAgICBsZXQgb2Zmc2V0UG9zPXRoaXMuZW5kX21vbnN0ZXIuZ2V0Q2VudGVyUG9zKCkuc3ViKHRoaXMubm9kZS5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICBsZXQgcGkyPU1hdGguUEkqMjtcclxuICAgICAgICBsZXQgZGlyPShNYXRoLmF0YW4yKG9mZnNldFBvcy55LG9mZnNldFBvcy54KStwaTIpJXBpMjtcclxuICAgICAgICBsZXQgYW5nbGU9TXlUb29sLnJhZGlhblRvQW5nbGUoZGlyKS05MDtcclxuICAgICAgICB0aGlzLm5vZGUuYW5nbGU9YW5nbGU7XHJcbiAgICAgICAgdGhpcy5ub2RlLmhlaWdodD1vZmZzZXRQb3MubWFnKCk7XHJcbiAgICB9XHJcbn1cclxuIl19