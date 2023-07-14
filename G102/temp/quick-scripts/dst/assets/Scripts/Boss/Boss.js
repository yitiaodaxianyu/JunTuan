
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Boss/Boss.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcQm9zc1xcQm9zcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSwwQ0FBd0M7QUFDeEMseURBQW9EO0FBQ3BELG9EQUFtRDtBQUNuRCxpRUFBOEU7QUFDOUUsOENBQXlDO0FBQ3pDLDhDQUF5QztBQUN6QyxzREFBNkQ7QUFDN0Qsa0RBQWlEO0FBRWpELElBQUssT0FVSjtBQVZELFdBQUssT0FBTztJQUNSLDZDQUFVLENBQUE7SUFDViwyQ0FBTyxDQUFBO0lBQ1AsNkNBQVEsQ0FBQTtJQUNSLCtDQUFTLENBQUE7SUFDVCwrQ0FBUyxDQUFBO0lBQ1QsK0NBQVMsQ0FBQTtJQUNULCtDQUFTLENBQUE7SUFFVCxtQ0FBRyxDQUFBO0FBQ1AsQ0FBQyxFQVZJLE9BQU8sS0FBUCxPQUFPLFFBVVg7QUFHSyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFrQyx3QkFBTztJQUF6QztRQUFBLHFFQXVLQztRQXJLRyxXQUFXO1FBQ0Qsc0JBQWdCLEdBQW9CLElBQUksQ0FBQztRQUNuRCxrQkFBa0I7UUFDViw2QkFBdUIsR0FBVSxJQUFJLENBQUM7UUFFOUMsV0FBVztRQUNILHdCQUFrQixHQUFVLElBQUksQ0FBQztRQUN6QyxtRkFBbUY7UUFDbkYsZUFBZTtRQUNmLGtCQUFZLEdBQVMsT0FBTyxDQUFDLFFBQVEsQ0FBQztRQUN0QyxrQkFBa0I7UUFDbEIsbUJBQWEsR0FBUyxPQUFPLENBQUMsUUFBUSxDQUFDO1FBQ3ZDLFlBQVk7UUFDWixrQkFBWSxHQUFXLEVBQUUsQ0FBQztRQUUxQixhQUFhO1FBQ2Isa0JBQVksR0FBVSxJQUFJLENBQUM7UUFDM0IsZ0JBQWdCO1FBQ2hCLG1CQUFhLEdBQVUsSUFBSSxDQUFDO1FBQzVCLGdCQUFVLEdBQVMsS0FBSyxDQUFDOztRQW1FekIsOEZBQThG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QUksQ0FBQyx1QkFBdUIsR0FBQyxRQUFRLENBQUM7SUFDMUMsQ0FBQztJQUVELDhCQUFlLEdBQWYsVUFBZ0IsUUFBaUI7UUFDN0IsSUFBSSxDQUFDLFlBQVksR0FBQyxRQUFRLENBQUM7SUFDL0IsQ0FBQztJQUVELDRCQUFhLEdBQWIsVUFBYyxRQUFpQjtRQUMzQixJQUFJLENBQUMsYUFBYSxHQUFDLFFBQVEsQ0FBQztJQUNoQyxDQUFDO0lBSUQsNkJBQWMsR0FBZCxVQUFlLEdBQVU7UUFDckIsSUFBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUM7WUFDckIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztTQUNoRDtRQUNELElBQUcsSUFBSSxDQUFDLHVCQUF1QixFQUFDO1lBQzVCLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNyQztJQUNMLENBQUM7SUF0RmdCLElBQUk7UUFEeEIsT0FBTztPQUNhLElBQUksQ0F1S3hCO0lBQUQsV0FBQztDQXZLRCxBQXVLQyxDQXZLaUMsaUJBQU8sR0F1S3hDO2tCQXZLb0IsSUFBSSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5cclxuaW1wb3J0IHsgR2FtZU1vZGUgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBCb3NzSHBQcm9ncmVzc0JhciBmcm9tIFwiLi9Cb3NzSHBQcm9ncmVzc0JhclwiO1xyXG5pbXBvcnQgeyBFbmVteV9TdGF0ZSB9IGZyb20gXCIuLi9FbmVteS9FbmVteUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBHYW1lRWZmZWN0SWQsIEdhbWVFZmZlY3RzTWFuYWdlciB9IGZyb20gXCIuLi9HYW1lL0dhbWVFZmZlY3RzTWFuYWdlclwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCBNb25zdGVyIGZyb20gXCIuLi9Nb25zdGVyL01vbnN0ZXJcIjtcclxuaW1wb3J0IHsgQnVmZklkLCBEYW1hZ2VUeXBlIH0gZnJvbSBcIi4uL0hlcm8vR2FtZS9IZXJvQ29uZmlnXCI7XHJcbmltcG9ydCB7IEJ1ZmZEYXRhIH0gZnJvbSBcIi4uL0hlcm8vR2FtZS9CdWZmRGF0YVwiO1xyXG5cclxuZW51bSBQb3NUeXBle1xyXG4gICAgWmhvbmdYaW49MCxcclxuICAgIFJhZGlhbjAsXHJcbiAgICBSYWRpYW42MCxcclxuICAgIFJhZGlhbjEyMCxcclxuICAgIFJhZGlhbjE4MCxcclxuICAgIFJhZGlhbjI0MCxcclxuICAgIFJhZGlhbjMwMCxcclxuXHJcbiAgICBOdW0sXHJcbn1cclxuXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvc3MgZXh0ZW5kcyBNb25zdGVyIHtcclxuXHJcbiAgICAvKirooYDmnaHov5vluqbmnaEgKi9cclxuICAgIHByb3RlY3RlZCBib3NzX2hwX3Byb2dyZXNzOiBCb3NzSHBQcm9ncmVzc0Jhcj1udWxsOyAgXHJcbiAgICAvKirmgKrnianooYDph4/lj5HnlJ/lj5jljJbml7bnmoTlm57osIMgKi9cclxuICAgIHByaXZhdGUgY2hhbmdlX2Jvc3NfaHBfY2FsbGJhY2s6RnVuY3Rpb249bnVsbDtcclxuXHJcbiAgICAvKirliJ3lp4vljJblm57osIMgKi9cclxuICAgIHByaXZhdGUgYm9zc19pbml0X2NhbGxiYWNrOkZ1bmN0aW9uPW51bGw7XHJcbiAgICAvKiotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t57uf5LiA56e75Yqo55u45YWz5bGe5oCnLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxuICAgIC8qKuW9k+WJjeaJgOWkhOeahOS9jee9ruexu+WeiyAqL1xyXG4gICAgY3VyX3Bvc190eXBlOlBvc1R5cGU9UG9zVHlwZS5aaG9uZ1hpbjtcclxuICAgIC8qKuS4i+S4gOS4quimgeenu+WKqOWIsOeahOS9jee9ruexu+WeiyAqL1xyXG4gICAgbmV4dF9wb3NfdHlwZTpQb3NUeXBlPVBvc1R5cGUuWmhvbmdYaW47XHJcbiAgICAvKirnp7vliqjovajov7nmlbDnu4QgKi9cclxuICAgIG1vdmluZ190cmFjazpjYy5WZWMyW109W107XHJcblxyXG4gICAgLyoq5pS75Ye76Kem5Y+R55qE5Zue6LCDICovXHJcbiAgICBhdHRfY2FsbGJhY2s6RnVuY3Rpb249bnVsbDtcclxuICAgIC8qKuW8gOWni+enu+WKqOeahOinpuWPkeeahOWbnuiwgyAqL1xyXG4gICAgbW92ZV9jYWxsYmFjazpGdW5jdGlvbj1udWxsO1xyXG4gICAgaXNfaW5pdF9ocDpib29sZWFuPWZhbHNlO1xyXG5cclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIHN1cGVyLm9uTG9hZCgpOyAgICAgICAgICAgXHJcbiAgICAgICAgdGhpcy5hZGRDaGFuZ2VIcExpc3Rlbih0aGlzLm9uQ2hhbmdlQm9zc0hwKTtcclxuICAgICAgICB0aGlzLmFkZEluaXRMaXN0ZW4odGhpcy5vbkluaXRlZCk7XHJcbiAgICAgICAgLy90aGlzLmluaXRNb3ZpbmdUcmFjaygpOyAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgb25Jbml0ZWQoKXtcclxuICAgICAgICBpZihHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX21vZGUhPUdhbWVNb2RlLkJvc3NfQ2hhbGxlbmdlKXtcclxuICAgICAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRWZmZWN0UG9vbEJ5SWQoR2FtZUVmZmVjdElkLmJvc3NfaHAsMSwoKT0+e1xyXG4gICAgICAgICAgICAgICAgbGV0IGhwUm9vdD1jYy5maW5kKCdDYW52YXMvVWlfUm9vdC90b3BfdWkvQm9zc0hwUm9vdCcpO1xyXG4gICAgICAgICAgICAgICAgaHBSb290Lnk9LTEwODtcclxuICAgICAgICAgICAgICAgIGxldCBocE5vZGU9R2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEZvclBhcmVudChHYW1lRWZmZWN0SWQuYm9zc19ocCxjYy52MigwLDApLGhwUm9vdCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJvc3NfaHBfcHJvZ3Jlc3M9aHBOb2RlLmdldENvbXBvbmVudChCb3NzSHBQcm9ncmVzc0Jhcik7IFxyXG4gICAgICAgICAgICAgICAgdGhpcy5ib3NzX2hwX3Byb2dyZXNzLmluaXQodGhpcy5nZXRNYXhIcCgpLHRoaXMubW9uc3Rlcl9pZCx0aGlzLm1vbnN0ZXJfbGV2ZWwpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5ib3NzX2hwX3Byb2dyZXNzKXtcclxuICAgICAgICAgICAgdGhpcy5ib3NzX2hwX3Byb2dyZXNzLmluaXQodGhpcy5nZXRNYXhIcCgpLHRoaXMubW9uc3Rlcl9pZCx0aGlzLm1vbnN0ZXJfbGV2ZWwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmJvc3NfaW5pdF9jYWxsYmFjayl7XHJcbiAgICAgICAgICAgIHRoaXMuYm9zc19pbml0X2NhbGxiYWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubm9kZS5vcGFjaXR5PTA7XHJcbiAgICAgICAgdGhpcy5zZXRFbmVteVN0YXRlKEVuZW15X1N0YXRlLmJvcm4pO1xyXG4gICAgICAgIGNjLnR3ZWVuKHRoaXMubm9kZSkudG8oMSx7b3BhY2l0eToyNTV9KS5jYWxsKCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RW5lbXlTdGF0ZShFbmVteV9TdGF0ZS5zdGFuZGJ5KTtcclxuICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgICAgIGlmKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZT09R2FtZU1vZGUuQm9zc19DaGFsbGVuZ2Upe1xyXG4gICAgICAgICAgICBsZXQgYnVmZkRhdGE9bmV3IEJ1ZmZEYXRhKCk7XHJcbiAgICAgICAgICAgIGJ1ZmZEYXRhLmJ1ZmZfaWQ9QnVmZklkLkJvc3NfTW9kZV9KaWFuU2hhbmc7XHJcbiAgICAgICAgICAgIGJ1ZmZEYXRhLmJ1ZmZfdmFsdWU9Wy0xLjJdO1xyXG4gICAgICAgICAgICBidWZmRGF0YS5yZW1haW5fdGltZT0zMDtcclxuICAgICAgICAgICAgc3VwZXIuYWRkRGVCdWZmKGJ1ZmZEYXRhLG51bGwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhZGRCb3NzSW5pdGVkTGlzdGVuKGNhbGxiYWNrOkZ1bmN0aW9uKXtcclxuICAgICAgICB0aGlzLmJvc3NfaW5pdF9jYWxsYmFjaz1jYWxsYmFjaztcclxuICAgIH1cclxuXHJcbiAgICBhZGRDaGFuZ2VCb3NzSHBMaXN0ZW4oY2FsbGJhY2s6RnVuY3Rpb24pe1xyXG4gICAgICAgIHRoaXMuY2hhbmdlX2Jvc3NfaHBfY2FsbGJhY2s9Y2FsbGJhY2s7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkQXR0YWNrTGlzdGVuKGNhbGxiYWNrOkZ1bmN0aW9uKXtcclxuICAgICAgICB0aGlzLmF0dF9jYWxsYmFjaz1jYWxsYmFjaztcclxuICAgIH1cclxuXHJcbiAgICBhZGRNb3ZlTGlzdGVuKGNhbGxiYWNrOkZ1bmN0aW9uKXtcclxuICAgICAgICB0aGlzLm1vdmVfY2FsbGJhY2s9Y2FsbGJhY2s7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgb25DaGFuZ2VCb3NzSHAobnVtOm51bWJlcil7XHJcbiAgICAgICAgaWYodGhpcy5ib3NzX2hwX3Byb2dyZXNzKXtcclxuICAgICAgICAgICAgdGhpcy5ib3NzX2hwX3Byb2dyZXNzLnNldEhwKHRoaXMuZ2V0Q3VySHAoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuY2hhbmdlX2Jvc3NfaHBfY2FsbGJhY2spe1xyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZV9ib3NzX2hwX2NhbGxiYWNrKG51bSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t57uf5LiA56e75YqoLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG4gICAgLyoq5Yid5aeL5YyW56e75Yqo6L2o6L+5ICovXHJcbiAgICAvLyBpbml0TW92aW5nVHJhY2soKXtcclxuICAgIC8vICAgICBsZXQgd2lkdGg9MjIyO1xyXG4gICAgLy8gICAgIGxldCBjUG9zPUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RmlnaHRDZW50ZXIoKTtcclxuICAgIC8vICAgICBsZXQgYVJhZGlhbj1NYXRoLlBJLzM7XHJcbiAgICAvLyAgICAgdGhpcy5tb3ZpbmdfdHJhY2s9bmV3IEFycmF5KCk7XHJcbiAgICAvLyAgICAgdGhpcy5tb3ZpbmdfdHJhY2sucHVzaChjUG9zKTtcclxuICAgIC8vICAgICAvLyBsZXQgZ2c9Y2MuZmluZCgnQ2FudmFzL0ZpZ2h0aW5nX1Jvb3QnKS5nZXRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xyXG4gICAgLy8gICAgIC8vIGdnLm1vdmVUbyhjUG9zLngsY1Bvcy55KTtcclxuICAgIC8vICAgICBmb3IobGV0IGk9UG9zVHlwZS5SYWRpYW4wOyBpPFBvc1R5cGUuTnVtOyBpKyspe1xyXG4gICAgLy8gICAgICAgICBsZXQgcmFkaWFuPShpLTEpKmFSYWRpYW47XHJcbiAgICAvLyAgICAgICAgIGxldCBwb3NYPWNQb3MueCt3aWR0aCpNYXRoLmNvcyhyYWRpYW4pO1xyXG4gICAgLy8gICAgICAgICBsZXQgcG9zWT1jUG9zLnkrd2lkdGgqTWF0aC5zaW4ocmFkaWFuKTtcclxuICAgIC8vICAgICAgICAgdGhpcy5tb3ZpbmdfdHJhY2sucHVzaChjYy52Mihwb3NYLHBvc1kpKTtcclxuICAgIC8vICAgICAgICAgLy9nZy5saW5lVG8ocG9zWCxwb3NZKTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgICAgLy9nZy5zdHJva2UoKTtcclxuICAgIC8vIH1cclxuICAgIC8vIC8qKuiOt+WPluS4i+S4gOS4quebruagh+WcsOeCueeahOWdkOaghyAqL1xyXG4gICAgLy8gZ2V0TmV4dFBvcygpOmNjLlZlYzJ7XHJcbiAgICAvLyAgICAgcmV0dXJuIHRoaXMubW92aW5nX3RyYWNrW3RoaXMubmV4dF9wb3NfdHlwZV07XHJcbiAgICAvLyB9XHJcbiAgICAvLyAvKirojrflj5bkuIDkuKrpmo/mnLrnmoTnm67moIfnmoTlnZDmoIcgKi9cclxuICAgIC8vIGdldFJhbmRvbVBvcygpOmNjLlZlYzJ7XHJcbiAgICAvLyAgICAgbGV0IHBvcz1jYy52MigwLDApO1xyXG4gICAgLy8gICAgIGxldCByYW5kVHlwZT1bXTtcclxuICAgIC8vICAgICBpZih0aGlzLmN1cl9wb3NfdHlwZT09UG9zVHlwZS5aaG9uZ1hpbil7XHJcbiAgICAvLyAgICAgICAgIGZvcihsZXQgaT1Qb3NUeXBlLlJhZGlhbjA7IGk8UG9zVHlwZS5OdW07IGkrKyl7XHJcbiAgICAvLyAgICAgICAgICAgICByYW5kVHlwZS5wdXNoKGkpO1xyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgfWVsc2V7XHJcbiAgICAvLyAgICAgICAgIGxldCBuZXh0VHlwZT10aGlzLmN1cl9wb3NfdHlwZSsxO1xyXG4gICAgLy8gICAgICAgICAgICAgaWYobmV4dFR5cGU+PVBvc1R5cGUuTnVtKXtcclxuICAgIC8vICAgICAgICAgICAgICAgICBuZXh0VHlwZT1Qb3NUeXBlLlJhZGlhbjA7XHJcbiAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgICAgICBsZXQgcHJldlR5cGU9dGhpcy5jdXJfcG9zX3R5cGUtMTtcclxuICAgIC8vICAgICAgICAgICAgIGlmKHByZXZUeXBlPD1Qb3NUeXBlLlpob25nWGluKXtcclxuICAgIC8vICAgICAgICAgICAgICAgICBwcmV2VHlwZT1Qb3NUeXBlLlJhZGlhbjMwMDtcclxuICAgIC8vICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgICAgIHJhbmRUeXBlPVtQb3NUeXBlLlpob25nWGluLG5leHRUeXBlLHByZXZUeXBlXTtcclxuICAgIC8vICAgICB9ICAgICAgICBcclxuICAgIC8vICAgICBsZXQgcmFuZEluZGV4PU1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSpyYW5kVHlwZS5sZW5ndGgpO1xyXG4gICAgLy8gICAgIHRoaXMubmV4dF9wb3NfdHlwZT1yYW5kVHlwZVtyYW5kSW5kZXhdXHJcbiAgICAvLyAgICAgcG9zPXRoaXMubW92aW5nX3RyYWNrW3RoaXMubmV4dF9wb3NfdHlwZV07XHJcbiAgICAvLyAgICAgcmV0dXJuIHBvcztcclxuICAgIC8vIH1cclxuICAgIC8vIC8qKuW8gOWni+enu+WKqCAqL1xyXG4gICAgLy8gc3RhcnRNb3ZlKGR0Om51bWJlcixwb3M/OmNjLlZlYzIpe1xyXG4gICAgLy8gICAgIHN1cGVyLnNldEVuZW15U3RhdGUoRW5lbXlfU3RhdGUubW92ZSk7ICAgICAgICBcclxuICAgIC8vICAgICBwb3M9cG9zP3Bvczp0aGlzLmdldFJhbmRvbVBvcygpO1xyXG4gICAgLy8gICAgIHRoaXMuc2V0VGFyZ2V0UG9zKHBvcywoKT0+e1xyXG4gICAgLy8gICAgICAgICB0aGlzLmN1cl9wb3NfdHlwZT10aGlzLm5leHRfcG9zX3R5cGU7XHJcbiAgICAvLyAgICAgICAgIGlmKHRoaXMubm9kZS54PC0xMjgpe1xyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5ub2RlLnNjYWxlWD10aGlzLnNldHVwX3NjYWxlO1xyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgIGlmKHRoaXMubm9kZS54PjEyOCl7XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLm5vZGUuc2NhbGVYPS10aGlzLnNldHVwX3NjYWxlO1xyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgIHRoaXMuc3RhcnRBdHRhY2soKTtcclxuICAgIC8vICAgICB9KVxyXG4gICAgLy8gICAgIGlmKHRoaXMubW92ZV9jYWxsYmFjayl7XHJcbiAgICAvLyAgICAgICAgIHRoaXMubW92ZV9jYWxsYmFjaygpO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH1cclxuICAgIC8vIC8qKuiuvue9ruimgeenu+WKqOWIsOeahOebruagh+WcsOeCueWdkOaghyAqL1xyXG4gICAgLy8gc2V0VGFyZ2V0UG9zKHBvczpjYy5WZWMyLGVuZENhbGxiYWNrOkZ1bmN0aW9uKXtcclxuICAgIC8vICAgICB0aGlzLm1vdmVfdGFyZ2V0X3Bvcz1wb3M7XHJcbiAgICAvLyAgICAgdGhpcy5tb3ZlX2VuZF9jYWxsYmFjaz1lbmRDYWxsYmFjaztcclxuICAgIC8vIH1cclxuICAgIC8vIC8qKuW8gOWni+aUu+WHuyAqL1xyXG4gICAgLy8gc3RhcnRBdHRhY2soKXtcclxuICAgIC8vICAgICAvL+acieWJjeaRh+WKqOS9nFxyXG4gICAgLy8gICAgIHRoaXMudW5zY2hlZHVsZSh0aGlzLnN0YXJ0TW92ZSk7XHJcbiAgICAvLyAgICAgc3VwZXIuc2V0RW5lbXlTdGF0ZShFbmVteV9TdGF0ZS5hdHQpO1xyXG4gICAgLy8gICAgIGlmKHRoaXMuYXR0X2NhbGxiYWNrKXtcclxuICAgIC8vICAgICAgICAgdGhpcy5hdHRfY2FsbGJhY2soKTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9XHJcbn1cclxuIl19