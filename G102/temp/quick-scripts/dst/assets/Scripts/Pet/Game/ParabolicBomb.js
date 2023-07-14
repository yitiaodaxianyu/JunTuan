
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Pet/Game/ParabolicBomb.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'aa142/ZfQJBW5H5/cVP5nRV', 'ParabolicBomb');
// Scripts/Pet/Game/ParabolicBomb.ts

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
var GameManager_1 = require("../../GameManager");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var GameEffectsManager_1 = require("../../Game/GameEffectsManager");
var GroundManager_1 = require("../../Game/GroundManager");
var Constants_1 = require("../../Constants");
var MonsterManager_1 = require("../../Monster/MonsterManager");
var Monster_1 = require("../../Monster/Monster");
var GongJi_1 = require("../../Hero/Game/GongJi");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ParabolicBomb = /** @class */ (function (_super) {
    __extends(ParabolicBomb, _super);
    function ParabolicBomb() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.tuowei = null;
        _this.game_effect_id = GameEffectsManager_1.GameEffectId.Null;
        _this.move_speed = 700;
        _this.move_direction = Math.PI / 2;
        _this.bomb_size = 100;
        //目标地点，到达后爆炸
        _this.target_pos = null;
        _this.tuo_wei = null;
        _this.prev_pos = cc.v2(0, 0);
        /**蔓延特效 */
        _this.spread_time = 0.2;
        /**蔓延位置 */
        _this.spread_pos = [];
        return _this;
    }
    ParabolicBomb.prototype.init = function (id, speed, targetPos, gjData, size) {
        _super.prototype.initData.call(this, gjData);
        this.game_effect_id = id;
        this.move_speed = speed;
        this.target_pos = targetPos;
        var offsetPos = targetPos.sub(this.node.getPosition());
        this.move_direction = Math.atan2(offsetPos.y, offsetPos.x);
        //距离
        var distance = offsetPos.mag();
        //let dt=cc.director.getDeltaTime();
        var sp = this.move_speed / GameManager_1.default.getInstance().getGameRate();
        this.spread_time = 0.02 * GameManager_1.default.getInstance().getGameRate();
        //帧率比，适配高刷率设备
        //let frameRate=cc.director.getDeltaTime()
        var jtTime = distance / sp / GameManager_1.default.getInstance().getGameRate();
        this.node.scale = 0.5;
        cc.tween(this.node).then(cc.spawn(cc.sequence(cc.scaleTo(jtTime / 4, 1.1), cc.scaleTo(jtTime * 3 / 4, 0.8)), cc.jumpTo(jtTime, targetPos, distance / 2.5, 1))).call(this.destroySelf, this).start();
        this.bomb_size = size;
        // let node=GroundManager.getInstance().createGameEffectById(GameEffectId.pet_attackt_hit_2,this.target_pos);
        // node.setContentSize(size);
        // cc.tween(node).delay(jtTime).call(()=>{
        //     GameEffectsManager.getInstance().destroyGameEffectById(GameEffectId.pet_attackt_hit_2,node);
        // }).start();
        this.tuo_wei = cc.instantiate(this.tuowei);
        this.tuo_wei.parent = this.node.parent;
        this.node.zIndex = 1;
        this.prev_pos = this.node.getPosition();
        var ms = this.tuo_wei.getComponent(cc.MotionStreak);
        ms.fadeTime = ms.fadeTime * GameManager_1.default.getInstance().getGameRate();
        this.spread_pos = new Array(4);
        var len = this.spread_pos.length;
        for (var i = 0; i < len; i++) {
            this.spread_pos[i] = this.node.getPosition();
        }
    };
    ParabolicBomb.prototype.destroySelf = function () {
        if (this.tuo_wei) {
            cc.tween(this.tuo_wei).delay(this.tuo_wei.getComponent(cc.MotionStreak).fadeTime / (10 * GameManager_1.default.getInstance().getGameRate())).removeSelf().start();
        }
        if (this.game_effect_id == GameEffectsManager_1.GameEffectId.pet_attackt_curve_1) {
            this.createBomb1();
        }
        else if (this.game_effect_id == GameEffectsManager_1.GameEffectId.pet_attackt_curve_3) {
            this.createBomb2();
        }
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_boom2);
        GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(this.game_effect_id, this.node);
        this.tuo_wei = null;
    };
    ParabolicBomb.prototype.setDirection = function (dir) {
        this.move_direction = dir;
        //this.node.angle=180*dir/Math.PI;
    };
    ParabolicBomb.prototype.createBomb1 = function () {
        var baozha = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.pet_attackt_hit_1, this.target_pos);
        GroundManager_1.default.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.pet_attackt_hit_2, this.target_pos);
        var monsters = MonsterManager_1.default.getInstance().getMonstersForCenterPos(-1, this.target_pos, 80);
        if (monsters) {
            for (var i = 0; i < monsters.length; i++) {
                var monsterTs = monsters[i].getComponent(Monster_1.default);
                monsterTs.beFlashInjured(this.gongji_data);
            }
        }
    };
    ParabolicBomb.prototype.createBomb2 = function () {
        var baozha = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.pet_attackt_hit_3, this.target_pos);
        GroundManager_1.default.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.pet_attackt_hit_4, this.target_pos);
        var monsters = MonsterManager_1.default.getInstance().getMonstersForCenterPos(-1, this.target_pos, 80);
        if (monsters) {
            for (var i = 0; i < monsters.length; i++) {
                var monsterTs = monsters[i].getComponent(Monster_1.default);
                monsterTs.beFlashInjured(this.gongji_data);
            }
        }
    };
    ParabolicBomb.prototype.createSpread = function () {
        var weiyanId = GameEffectsManager_1.GameEffectId.pet_attackt_tuowei_2;
        if (this.game_effect_id == GameEffectsManager_1.GameEffectId.pet_attackt_curve_1) {
            weiyanId = GameEffectsManager_1.GameEffectId.pet_attackt_tuowei_2;
        }
        else if (this.game_effect_id == GameEffectsManager_1.GameEffectId.pet_attackt_curve_3) {
            weiyanId = GameEffectsManager_1.GameEffectId.pet_attackt_tuowei_3;
        }
        var node = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(weiyanId, this.spread_pos[this.getPosIndex()]);
        node.angle = Math.random() * 360;
        node.scale = Math.random() * 0.5 + 0.8;
    };
    ParabolicBomb.prototype.getPosIndex = function () {
        var maxCL = this.spread_pos.length - 1;
        var index = Math.floor(this.spread_pos.length / GameManager_1.default.getInstance().getGameRate());
        if (index >= maxCL) {
            index = maxCL;
        }
        return index;
    };
    ParabolicBomb.prototype.update = function (dt) {
        if (GameManager_1.default.getInstance().cur_game_state != Constants_1.GameState.Game_Playing)
            return;
        if (this.tuo_wei) {
            var gr = GameManager_1.default.getInstance().getGameRate();
            if (gr < 1) {
                gr = 1;
            }
            var pos = this.node.getPosition();
            //添加在子弹前面            
            var offsetPos = pos.sub(this.prev_pos);
            var distance = offsetPos.mag() * 4 / gr;
            var dir = Math.atan2(offsetPos.y, offsetPos.x);
            var xx = pos.x + Math.cos(dir) * distance;
            var yy = pos.y + Math.sin(dir) * distance;
            this.tuo_wei.setPosition(cc.v2(xx, yy));
            //this.tuo_wei.setPosition(this.node.position);
            this.prev_pos = this.node.getPosition();
            this.spread_time -= dt;
            this.update_locus_shadow();
            if (this.spread_time <= 0) {
                this.spread_time = 0.02 * GameManager_1.default.getInstance().getGameRate();
                this.createSpread();
            }
        }
    };
    ParabolicBomb.prototype.update_locus_shadow = function () {
        //加入头部
        this.spread_pos.unshift(this.node.getPosition());
        //删除尾部
        this.spread_pos.pop();
    };
    __decorate([
        property({ type: cc.Prefab })
    ], ParabolicBomb.prototype, "tuowei", void 0);
    ParabolicBomb = __decorate([
        ccclass
    ], ParabolicBomb);
    return ParabolicBomb;
}(GongJi_1.default));
exports.default = ParabolicBomb;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcUGV0XFxHYW1lXFxQYXJhYm9saWNCb21iLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLGlEQUE0QztBQUM1Qyw2REFBd0Q7QUFDeEQsb0VBQWlGO0FBQ2pGLDBEQUFxRDtBQUVyRCw2Q0FBNEM7QUFDNUMsK0RBQTBEO0FBQzFELGlEQUE0QztBQUM1QyxpREFBNEM7QUFFdEMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBMkMsaUNBQU07SUFBakQ7UUFBQSxxRUFzS0M7UUFuS0csWUFBTSxHQUFXLElBQUksQ0FBQztRQUV0QixvQkFBYyxHQUFjLGlDQUFZLENBQUMsSUFBSSxDQUFDO1FBQzlDLGdCQUFVLEdBQVEsR0FBRyxDQUFDO1FBQ3RCLG9CQUFjLEdBQVEsSUFBSSxDQUFDLEVBQUUsR0FBQyxDQUFDLENBQUM7UUFFaEMsZUFBUyxHQUFRLEdBQUcsQ0FBQztRQUNyQixZQUFZO1FBQ1osZ0JBQVUsR0FBUyxJQUFJLENBQUM7UUFFeEIsYUFBTyxHQUFTLElBQUksQ0FBQztRQUNyQixjQUFRLEdBQVMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUIsVUFBVTtRQUNWLGlCQUFXLEdBQVEsR0FBRyxDQUFDO1FBQ3ZCLFVBQVU7UUFDVixnQkFBVSxHQUFXLEVBQUUsQ0FBQzs7SUFvSjVCLENBQUM7SUFsSkcsNEJBQUksR0FBSixVQUFLLEVBQWUsRUFBQyxLQUFZLEVBQUMsU0FBaUIsRUFBQyxNQUFpQixFQUFDLElBQVc7UUFFN0UsaUJBQU0sUUFBUSxZQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxjQUFjLEdBQUMsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLEdBQUMsS0FBSyxDQUFDO1FBQ3RCLElB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QUFDLEVBQUM7Z0JBQ25CLElBQUksQ0FBQyxXQUFXLEdBQUMsSUFBSSxHQUFDLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQzlELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzthQUN2QjtTQUVKO0lBQ0wsQ0FBQztJQUVELDJDQUFtQixHQUFuQjtRQUVJLE1BQU07UUFDTixJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFDakQsTUFBTTtRQUNOLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQWxLRDtRQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBQyxFQUFFLENBQUMsTUFBTSxFQUFDLENBQUM7aURBQ0w7SUFITCxhQUFhO1FBRGpDLE9BQU87T0FDYSxhQUFhLENBc0tqQztJQUFELG9CQUFDO0NBdEtELEFBc0tDLENBdEswQyxnQkFBTSxHQXNLaEQ7a0JBdEtvQixhQUFhIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU291bmRJbmRleCB9IGZyb20gXCIuLi8uLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBHYW1lRWZmZWN0SWQsIEdhbWVFZmZlY3RzTWFuYWdlciB9IGZyb20gXCIuLi8uLi9HYW1lL0dhbWVFZmZlY3RzTWFuYWdlclwiO1xyXG5pbXBvcnQgR3JvdW5kTWFuYWdlciBmcm9tIFwiLi4vLi4vR2FtZS9Hcm91bmRNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEdvbmdKaURhdGEgfSBmcm9tIFwiLi4vLi4vSGVyby9EYXRhL0hlcm9EYXRhXCI7XHJcbmltcG9ydCB7IEdhbWVTdGF0ZSB9IGZyb20gXCIuLi8uLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IE1vbnN0ZXJNYW5hZ2VyIGZyb20gXCIuLi8uLi9Nb25zdGVyL01vbnN0ZXJNYW5hZ2VyXCI7XHJcbmltcG9ydCBNb25zdGVyIGZyb20gXCIuLi8uLi9Nb25zdGVyL01vbnN0ZXJcIjtcclxuaW1wb3J0IEdvbmdKaSBmcm9tIFwiLi4vLi4vSGVyby9HYW1lL0dvbmdKaVwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYXJhYm9saWNCb21iIGV4dGVuZHMgR29uZ0ppIHtcclxuICAgIFxyXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLlByZWZhYn0pXHJcbiAgICB0dW93ZWk6Y2MuUHJlZmFiPW51bGw7XHJcblxyXG4gICAgZ2FtZV9lZmZlY3RfaWQ6R2FtZUVmZmVjdElkPUdhbWVFZmZlY3RJZC5OdWxsO1xyXG4gICAgbW92ZV9zcGVlZDpudW1iZXI9NzAwO1xyXG4gICAgbW92ZV9kaXJlY3Rpb246bnVtYmVyPU1hdGguUEkvMjtcclxuXHJcbiAgICBib21iX3NpemU6bnVtYmVyPTEwMDtcclxuICAgIC8v55uu5qCH5Zyw54K577yM5Yiw6L6+5ZCO54iG54K4XHJcbiAgICB0YXJnZXRfcG9zOmNjLlZlYzI9bnVsbDtcclxuXHJcbiAgICB0dW9fd2VpOmNjLk5vZGU9bnVsbDtcclxuICAgIHByZXZfcG9zOmNjLlZlYzI9Y2MudjIoMCwwKTtcclxuICAgIC8qKuiUk+W7tueJueaViCAqL1xyXG4gICAgc3ByZWFkX3RpbWU6bnVtYmVyPTAuMjtcclxuICAgIC8qKuiUk+W7tuS9jee9riAqL1xyXG4gICAgc3ByZWFkX3BvczpjYy5WZWMyW109W107XHJcblxyXG4gICAgaW5pdChpZDpHYW1lRWZmZWN0SWQsc3BlZWQ6bnVtYmVyLHRhcmdldFBvczpjYy5WZWMyLGdqRGF0YTpHb25nSmlEYXRhLHNpemU6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyLmluaXREYXRhKGdqRGF0YSk7XHJcbiAgICAgICAgdGhpcy5nYW1lX2VmZmVjdF9pZD1pZDtcclxuICAgICAgICB0aGlzLm1vdmVfc3BlZWQ9c3BlZWQ7XHJcbiAgICAgICAgdGhpcy50YXJnZXRfcG9zPXRhcmdldFBvczsgICAgICAgIFxyXG5cclxuICAgICAgICBsZXQgb2Zmc2V0UG9zPXRhcmdldFBvcy5zdWIodGhpcy5ub2RlLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgIHRoaXMubW92ZV9kaXJlY3Rpb249TWF0aC5hdGFuMihvZmZzZXRQb3MueSxvZmZzZXRQb3MueCk7XHJcbiAgICAgICAgLy/ot53nprtcclxuICAgICAgICBsZXQgZGlzdGFuY2U9b2Zmc2V0UG9zLm1hZygpO1xyXG4gICAgICAgIC8vbGV0IGR0PWNjLmRpcmVjdG9yLmdldERlbHRhVGltZSgpO1xyXG4gICAgICAgIGxldCBzcD10aGlzLm1vdmVfc3BlZWQvR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRHYW1lUmF0ZSgpO1xyXG4gICAgICAgIHRoaXMuc3ByZWFkX3RpbWU9MC4wMipHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEdhbWVSYXRlKCk7XHJcbiAgICAgICAgLy/luKfnjofmr5TvvIzpgILphY3pq5jliLfnjoforr7lpIdcclxuICAgICAgICAvL2xldCBmcmFtZVJhdGU9Y2MuZGlyZWN0b3IuZ2V0RGVsdGFUaW1lKClcclxuICAgICAgICBsZXQganRUaW1lPWRpc3RhbmNlL3NwL0dhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0R2FtZVJhdGUoKTtcclxuICAgICAgICB0aGlzLm5vZGUuc2NhbGU9MC41O1xyXG4gICAgICAgIGNjLnR3ZWVuKHRoaXMubm9kZSkudGhlbihjYy5zcGF3bihjYy5zZXF1ZW5jZShjYy5zY2FsZVRvKGp0VGltZS80LDEuMSksY2Muc2NhbGVUbyhqdFRpbWUqMy80LDAuOCkpLGNjLmp1bXBUbyhqdFRpbWUsdGFyZ2V0UG9zLGRpc3RhbmNlLzIuNSwxKSkpLmNhbGwodGhpcy5kZXN0cm95U2VsZix0aGlzKS5zdGFydCgpO1xyXG4gICAgICAgIHRoaXMuYm9tYl9zaXplPXNpemU7XHJcbiAgICAgICAgLy8gbGV0IG5vZGU9R3JvdW5kTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5wZXRfYXR0YWNrdF9oaXRfMix0aGlzLnRhcmdldF9wb3MpO1xyXG4gICAgICAgIC8vIG5vZGUuc2V0Q29udGVudFNpemUoc2l6ZSk7XHJcbiAgICAgICAgLy8gY2MudHdlZW4obm9kZSkuZGVsYXkoanRUaW1lKS5jYWxsKCgpPT57XHJcbiAgICAgICAgLy8gICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmRlc3Ryb3lHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQucGV0X2F0dGFja3RfaGl0XzIsbm9kZSk7XHJcbiAgICAgICAgLy8gfSkuc3RhcnQoKTtcclxuXHJcbiAgICAgICAgdGhpcy50dW9fd2VpPWNjLmluc3RhbnRpYXRlKHRoaXMudHVvd2VpKVxyXG4gICAgICAgIHRoaXMudHVvX3dlaS5wYXJlbnQ9dGhpcy5ub2RlLnBhcmVudDtcclxuICAgICAgICB0aGlzLm5vZGUuekluZGV4PTE7XHJcbiAgICAgICAgdGhpcy5wcmV2X3Bvcz10aGlzLm5vZGUuZ2V0UG9zaXRpb24oKTtcclxuICAgICAgICBsZXQgbXM9dGhpcy50dW9fd2VpLmdldENvbXBvbmVudChjYy5Nb3Rpb25TdHJlYWspO1xyXG4gICAgICAgIG1zLmZhZGVUaW1lPW1zLmZhZGVUaW1lKkdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0R2FtZVJhdGUoKTtcclxuXHJcbiAgICAgICAgdGhpcy5zcHJlYWRfcG9zPW5ldyBBcnJheSg0KTtcclxuICAgICAgICBsZXQgbGVuPXRoaXMuc3ByZWFkX3Bvcy5sZW5ndGg7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8bGVuOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnNwcmVhZF9wb3NbaV09dGhpcy5ub2RlLmdldFBvc2l0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRlc3Ryb3lTZWxmKClcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLnR1b193ZWkpe1xyXG4gICAgICAgICAgICBjYy50d2Vlbih0aGlzLnR1b193ZWkpLmRlbGF5KHRoaXMudHVvX3dlaS5nZXRDb21wb25lbnQoY2MuTW90aW9uU3RyZWFrKS5mYWRlVGltZS8oMTAqR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRHYW1lUmF0ZSgpKSkucmVtb3ZlU2VsZigpLnN0YXJ0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuZ2FtZV9lZmZlY3RfaWQ9PUdhbWVFZmZlY3RJZC5wZXRfYXR0YWNrdF9jdXJ2ZV8xKXtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVCb21iMSgpO1xyXG4gICAgICAgIH1lbHNlIGlmKHRoaXMuZ2FtZV9lZmZlY3RfaWQ9PUdhbWVFZmZlY3RJZC5wZXRfYXR0YWNrdF9jdXJ2ZV8zKXtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVCb21iMigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguWVhfYm9vbTIpO1xyXG4gICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmRlc3Ryb3lHYW1lRWZmZWN0QnlJZCh0aGlzLmdhbWVfZWZmZWN0X2lkLHRoaXMubm9kZSk7XHJcbiAgICAgICAgdGhpcy50dW9fd2VpPW51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0RGlyZWN0aW9uKGRpcjpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5tb3ZlX2RpcmVjdGlvbj1kaXI7XHJcbiAgICAgICAgLy90aGlzLm5vZGUuYW5nbGU9MTgwKmRpci9NYXRoLlBJO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUJvbWIxKCl7XHJcbiAgICAgICAgbGV0IGJhb3poYT1HYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQucGV0X2F0dGFja3RfaGl0XzEsdGhpcy50YXJnZXRfcG9zKTtcclxuICAgICAgICBHcm91bmRNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLnBldF9hdHRhY2t0X2hpdF8yLHRoaXMudGFyZ2V0X3Bvcyk7XHJcbiAgICAgICAgbGV0IG1vbnN0ZXJzPU1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TW9uc3RlcnNGb3JDZW50ZXJQb3MoLTEsdGhpcy50YXJnZXRfcG9zLDgwKTtcclxuICAgICAgICBpZihtb25zdGVycyl7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPG1vbnN0ZXJzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGxldCBtb25zdGVyVHM9bW9uc3RlcnNbaV0uZ2V0Q29tcG9uZW50KE1vbnN0ZXIpO1xyXG4gICAgICAgICAgICAgICAgbW9uc3RlclRzLmJlRmxhc2hJbmp1cmVkKHRoaXMuZ29uZ2ppX2RhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUJvbWIyKCl7XHJcbiAgICAgICAgbGV0IGJhb3poYT1HYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQucGV0X2F0dGFja3RfaGl0XzMsdGhpcy50YXJnZXRfcG9zKTtcclxuICAgICAgICBHcm91bmRNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLnBldF9hdHRhY2t0X2hpdF80LHRoaXMudGFyZ2V0X3Bvcyk7XHJcbiAgICAgICAgbGV0IG1vbnN0ZXJzPU1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TW9uc3RlcnNGb3JDZW50ZXJQb3MoLTEsdGhpcy50YXJnZXRfcG9zLDgwKTtcclxuICAgICAgICBpZihtb25zdGVycyl7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPG1vbnN0ZXJzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGxldCBtb25zdGVyVHM9bW9uc3RlcnNbaV0uZ2V0Q29tcG9uZW50KE1vbnN0ZXIpO1xyXG4gICAgICAgICAgICAgICAgbW9uc3RlclRzLmJlRmxhc2hJbmp1cmVkKHRoaXMuZ29uZ2ppX2RhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZVNwcmVhZCgpe1xyXG4gICAgICAgIGxldCB3ZWl5YW5JZD1HYW1lRWZmZWN0SWQucGV0X2F0dGFja3RfdHVvd2VpXzI7XHJcbiAgICAgICAgaWYodGhpcy5nYW1lX2VmZmVjdF9pZD09R2FtZUVmZmVjdElkLnBldF9hdHRhY2t0X2N1cnZlXzEpe1xyXG4gICAgICAgICAgICB3ZWl5YW5JZD1HYW1lRWZmZWN0SWQucGV0X2F0dGFja3RfdHVvd2VpXzI7XHJcbiAgICAgICAgfWVsc2UgaWYodGhpcy5nYW1lX2VmZmVjdF9pZD09R2FtZUVmZmVjdElkLnBldF9hdHRhY2t0X2N1cnZlXzMpe1xyXG4gICAgICAgICAgICB3ZWl5YW5JZD1HYW1lRWZmZWN0SWQucGV0X2F0dGFja3RfdHVvd2VpXzM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBub2RlPUdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKHdlaXlhbklkLHRoaXMuc3ByZWFkX3Bvc1t0aGlzLmdldFBvc0luZGV4KCldKVxyXG4gICAgICAgIG5vZGUuYW5nbGU9TWF0aC5yYW5kb20oKSozNjA7XHJcbiAgICAgICAgbm9kZS5zY2FsZT1NYXRoLnJhbmRvbSgpKjAuNSswLjg7XHJcbiAgICB9XHJcbiAgICBcclxuXHJcbiAgICBwcml2YXRlIGdldFBvc0luZGV4KCk6bnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IG1heENMPXRoaXMuc3ByZWFkX3Bvcy5sZW5ndGgtMTtcclxuICAgICAgICBsZXQgaW5kZXg9TWF0aC5mbG9vcih0aGlzLnNwcmVhZF9wb3MubGVuZ3RoL0dhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0R2FtZVJhdGUoKSk7XHJcbiAgICAgICAgaWYoaW5kZXg+PW1heENMKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW5kZXg9bWF4Q0w7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpbmRleDtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUgKGR0KSB7XHJcbiAgICAgICAgaWYoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zdGF0ZSE9R2FtZVN0YXRlLkdhbWVfUGxheWluZylcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgICAgaWYodGhpcy50dW9fd2VpKXtcclxuICAgICAgICAgICAgbGV0IGdyPUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0R2FtZVJhdGUoKTtcclxuICAgICAgICAgICAgaWYoZ3I8MSl7XHJcbiAgICAgICAgICAgICAgICBncj0xO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBwb3M9dGhpcy5ub2RlLmdldFBvc2l0aW9uKCk7XHJcbiAgICAgICAgICAgIC8v5re75Yqg5Zyo5a2Q5by55YmN6Z2iICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBvZmZzZXRQb3M9cG9zLnN1Yih0aGlzLnByZXZfcG9zKTtcclxuICAgICAgICAgICAgbGV0IGRpc3RhbmNlPW9mZnNldFBvcy5tYWcoKSo0L2dyO1xyXG4gICAgICAgICAgICBsZXQgZGlyPU1hdGguYXRhbjIob2Zmc2V0UG9zLnksb2Zmc2V0UG9zLngpO1xyXG4gICAgICAgICAgICBsZXQgeHg9cG9zLngrTWF0aC5jb3MoZGlyKSpkaXN0YW5jZTtcclxuICAgICAgICAgICAgbGV0IHl5PXBvcy55K01hdGguc2luKGRpcikqZGlzdGFuY2U7XHJcbiAgICAgICAgICAgIHRoaXMudHVvX3dlaS5zZXRQb3NpdGlvbihjYy52Mih4eCx5eSkpO1xyXG4gICAgICAgICAgICAvL3RoaXMudHVvX3dlaS5zZXRQb3NpdGlvbih0aGlzLm5vZGUucG9zaXRpb24pO1xyXG4gICAgICAgICAgICB0aGlzLnByZXZfcG9zPXRoaXMubm9kZS5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgICAgICB0aGlzLnNwcmVhZF90aW1lLT1kdDtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVfbG9jdXNfc2hhZG93KCk7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuc3ByZWFkX3RpbWU8PTApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zcHJlYWRfdGltZT0wLjAyKkdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0R2FtZVJhdGUoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlU3ByZWFkKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZV9sb2N1c19zaGFkb3coKVxyXG4gICAge1xyXG4gICAgICAgIC8v5Yqg5YWl5aS06YOoXHJcbiAgICAgICAgdGhpcy5zcHJlYWRfcG9zLnVuc2hpZnQodGhpcy5ub2RlLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgIC8v5Yig6Zmk5bC+6YOoXHJcbiAgICAgICAgdGhpcy5zcHJlYWRfcG9zLnBvcCgpOyAgXHJcbiAgICB9XHJcbn1cclxuIl19