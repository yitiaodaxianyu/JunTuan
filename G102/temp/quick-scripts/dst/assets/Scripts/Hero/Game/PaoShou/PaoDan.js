
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Hero/Game/PaoShou/PaoDan.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0d71bN0p5tKtotBk5xomm4u', 'PaoDan');
// Scripts/Hero/Game/PaoShou/PaoDan.ts

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
var HeroConfig_1 = require("../HeroConfig");
var GongJi_1 = require("../GongJi");
var GameEffectsManager_1 = require("../../../Game/GameEffectsManager");
var GameManager_1 = require("../../../GameManager");
var AudioConstants_1 = require("../../../Sound/AudioConstants");
var MonsterManager_1 = require("../../../Monster/MonsterManager");
var Monster_1 = require("../../../Monster/Monster");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PaoDan = /** @class */ (function (_super) {
    __extends(PaoDan, _super);
    function PaoDan() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.paodan_type = HeroConfig_1.PaoDan_Type.skill;
        _this.game_effect_id = GameEffectsManager_1.GameEffectId.Null;
        _this.move_speed = 700;
        _this.move_direction = Math.PI / 2;
        _this.bomb_size = 100;
        //目标地点，到达后爆炸
        _this.target_pos = null;
        return _this;
    }
    PaoDan.prototype.init = function (id, speed, targetPos, gjData, size) {
        _super.prototype.initData.call(this, gjData);
        this.game_effect_id = id;
        this.move_speed = speed;
        this.target_pos = targetPos;
        var offsetPos = targetPos.sub(this.node.getPosition());
        this.move_direction = Math.atan2(offsetPos.y, offsetPos.x);
        //距离
        var distance = offsetPos.mag();
        var sp = this.move_speed / GameManager_1.default.getInstance().getGameRate();
        var jtTime = distance / sp / GameManager_1.default.getInstance().getGameRate();
        ;
        this.node.scale = 0.5;
        cc.tween(this.node).then(cc.spawn(cc.sequence(cc.scaleTo(jtTime / 4, 1.1), cc.scaleTo(jtTime * 3 / 4, 0.8)), cc.jumpTo(jtTime, targetPos, distance / 2.5, 1))).call(this.destroySelf, this).start();
        this.bomb_size = size;
        // let node=GroundManager.getInstance().createGameEffectById(GameEffectId.paoshou_paodan_luodi,this.target_pos);
        // node.setContentSize(size);
        // cc.tween(node).delay(jtTime*GameManager.getInstance().getGameRate()).call(()=>{
        //     GameEffectsManager.getInstance().destroyGameEffectById(GameEffectId.paoshou_paodan_luodi,node);
        // }).start();
    };
    PaoDan.prototype.destroySelf = function () {
        //销毁后爆炸
        this.createBomb();
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_boom2);
        GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(this.game_effect_id, this.node);
    };
    /**每次攻击会对半径{参数1}范围内造成{参数2}%伤害 */
    PaoDan.prototype.createBomb = function () {
        var baozha = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.paoshou_skill_hit, this.target_pos);
        //baozha.angle=MyTool.radianToAngle(this.move_direction)-90;
        //MyTool.randomSceneShake(-5,5,0.02,6);
        var monsters = MonsterManager_1.default.getInstance().getMonstersForCenterPos(-1, this.node.getPosition(), this.bomb_size);
        if (monsters) {
            for (var i = 0; i < monsters.length; i++) {
                var monsterTs = monsters[i].getComponent(Monster_1.default);
                monsterTs.beFlashInjured(this.gongji_data);
            }
        }
        //baozha.getComponent(PaoDanBaoZha).init(GameEffectId.paoshou_paodan_hit,this.paodan_type,this.gongji_data);
        baozha.scale = this.bomb_size / 100;
        //baozha.scale=1;
    };
    __decorate([
        property({ type: cc.Enum(HeroConfig_1.PaoDan_Type) })
    ], PaoDan.prototype, "paodan_type", void 0);
    PaoDan = __decorate([
        ccclass
    ], PaoDan);
    return PaoDan;
}(GongJi_1.default));
exports.default = PaoDan;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcR2FtZVxcUGFvU2hvdVxcUGFvRGFuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDRDQUE0QztBQUM1QyxvQ0FBK0I7QUFFL0IsdUVBQW9GO0FBQ3BGLG9EQUErQztBQUMvQyxnRUFBMkQ7QUFHM0Qsa0VBQTZEO0FBQzdELG9EQUErQztBQUV6QyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFvQywwQkFBTTtJQUExQztRQUFBLHFFQTZEQztRQTFERyxpQkFBVyxHQUFhLHdCQUFXLENBQUMsS0FBSyxDQUFDO1FBRTFDLG9CQUFjLEdBQWMsaUNBQVksQ0FBQyxJQUFJLENBQUM7UUFDOUMsZ0JBQVUsR0FBUSxHQUFHLENBQUM7UUFDdEIsb0JBQWMsR0FBUSxJQUFJLENBQUMsRUFBRSxHQUFDLENBQUMsQ0FBQztRQUVoQyxlQUFTLEdBQVEsR0FBRyxDQUFDO1FBQ3JCLFlBQVk7UUFDWixnQkFBVSxHQUFTLElBQUksQ0FBQzs7SUFrRDVCLENBQUM7SUFoREcscUJBQUksR0FBSixVQUFLLEVBQWUsRUFBQyxLQUFZLEVBQUMsU0FBaUIsRUFBQyxNQUFpQixFQUFDLElBQVc7UUFFN0UsaUJBQU0sUUFBUSxZQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxjQUFjLEdBQUMsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLEdBQUMsS0FBSyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxVQUFVLEdBQUMsU0FBUyxDQUFDO1FBRTFCLElBQUksU0FBUyxHQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxjQUFjLEdBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFT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QyxDQTdEbUMsZ0JBQU0sR0E2RHpDO2tCQTdEb0IsTUFBTSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgeyBQYW9EYW5fVHlwZSB9IGZyb20gXCIuLi9IZXJvQ29uZmlnXCI7XHJcbmltcG9ydCBHb25nSmkgZnJvbSBcIi4uL0dvbmdKaVwiO1xyXG5pbXBvcnQgUGFvRGFuQmFvWmhhIGZyb20gXCIuL1Bhb0RhbkJhb1poYVwiO1xyXG5pbXBvcnQgeyBHYW1lRWZmZWN0SWQsIEdhbWVFZmZlY3RzTWFuYWdlciB9IGZyb20gXCIuLi8uLi8uLi9HYW1lL0dhbWVFZmZlY3RzTWFuYWdlclwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uLy4uLy4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFNvdW5kSW5kZXggfSBmcm9tIFwiLi4vLi4vLi4vU291bmQvQXVkaW9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgR29uZ0ppRGF0YSB9IGZyb20gXCIuLi8uLi9EYXRhL0hlcm9EYXRhXCI7XHJcbmltcG9ydCBNeVRvb2wgZnJvbSBcIi4uLy4uLy4uL1Rvb2xzL015VG9vbFwiO1xyXG5pbXBvcnQgTW9uc3Rlck1hbmFnZXIgZnJvbSBcIi4uLy4uLy4uL01vbnN0ZXIvTW9uc3Rlck1hbmFnZXJcIjtcclxuaW1wb3J0IE1vbnN0ZXIgZnJvbSBcIi4uLy4uLy4uL01vbnN0ZXIvTW9uc3RlclwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYW9EYW4gZXh0ZW5kcyBHb25nSmkge1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5FbnVtKFBhb0Rhbl9UeXBlKX0pXHJcbiAgICBwYW9kYW5fdHlwZTpQYW9EYW5fVHlwZT1QYW9EYW5fVHlwZS5za2lsbDtcclxuXHJcbiAgICBnYW1lX2VmZmVjdF9pZDpHYW1lRWZmZWN0SWQ9R2FtZUVmZmVjdElkLk51bGw7XHJcbiAgICBtb3ZlX3NwZWVkOm51bWJlcj03MDA7XHJcbiAgICBtb3ZlX2RpcmVjdGlvbjpudW1iZXI9TWF0aC5QSS8yO1xyXG5cclxuICAgIGJvbWJfc2l6ZTpudW1iZXI9MTAwO1xyXG4gICAgLy/nm67moIflnLDngrnvvIzliLDovr7lkI7niIbngrhcclxuICAgIHRhcmdldF9wb3M6Y2MuVmVjMj1udWxsO1xyXG5cclxuICAgIGluaXQoaWQ6R2FtZUVmZmVjdElkLHNwZWVkOm51bWJlcix0YXJnZXRQb3M6Y2MuVmVjMixnakRhdGE6R29uZ0ppRGF0YSxzaXplOm51bWJlcilcclxuICAgIHtcclxuICAgICAgICBzdXBlci5pbml0RGF0YShnakRhdGEpO1xyXG4gICAgICAgIHRoaXMuZ2FtZV9lZmZlY3RfaWQ9aWQ7XHJcbiAgICAgICAgdGhpcy5tb3ZlX3NwZWVkPXNwZWVkO1xyXG4gICAgICAgIHRoaXMudGFyZ2V0X3Bvcz10YXJnZXRQb3M7ICAgICAgICBcclxuXHJcbiAgICAgICAgbGV0IG9mZnNldFBvcz10YXJnZXRQb3Muc3ViKHRoaXMubm9kZS5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICB0aGlzLm1vdmVfZGlyZWN0aW9uPU1hdGguYXRhbjIob2Zmc2V0UG9zLnksb2Zmc2V0UG9zLngpO1xyXG4gICAgICAgIC8v6Led56a7XHJcbiAgICAgICAgbGV0IGRpc3RhbmNlPW9mZnNldFBvcy5tYWcoKTtcclxuICAgICAgICBsZXQgc3A9dGhpcy5tb3ZlX3NwZWVkL0dhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0R2FtZVJhdGUoKTtcclxuICAgICAgICBsZXQganRUaW1lPWRpc3RhbmNlL3NwL0dhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0R2FtZVJhdGUoKTs7XHJcbiAgICAgICAgdGhpcy5ub2RlLnNjYWxlPTAuNTtcclxuICAgICAgICBjYy50d2Vlbih0aGlzLm5vZGUpLnRoZW4oY2Muc3Bhd24oY2Muc2VxdWVuY2UoY2Muc2NhbGVUbyhqdFRpbWUvNCwxLjEpLGNjLnNjYWxlVG8oanRUaW1lKjMvNCwwLjgpKSxjYy5qdW1wVG8oanRUaW1lLHRhcmdldFBvcyxkaXN0YW5jZS8yLjUsMSkpKS5jYWxsKHRoaXMuZGVzdHJveVNlbGYsdGhpcykuc3RhcnQoKTtcclxuICAgICAgICB0aGlzLmJvbWJfc2l6ZT1zaXplO1xyXG4gICAgICAgIC8vIGxldCBub2RlPUdyb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQucGFvc2hvdV9wYW9kYW5fbHVvZGksdGhpcy50YXJnZXRfcG9zKTtcclxuICAgICAgICAvLyBub2RlLnNldENvbnRlbnRTaXplKHNpemUpO1xyXG4gICAgICAgIC8vIGNjLnR3ZWVuKG5vZGUpLmRlbGF5KGp0VGltZSpHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEdhbWVSYXRlKCkpLmNhbGwoKCk9PntcclxuICAgICAgICAvLyAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZGVzdHJveUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5wYW9zaG91X3Bhb2Rhbl9sdW9kaSxub2RlKTtcclxuICAgICAgICAvLyB9KS5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGRlc3Ryb3lTZWxmKClcclxuICAgIHtcclxuICAgICAgICAvL+mUgOavgeWQjueIhueCuFxyXG4gICAgICAgIHRoaXMuY3JlYXRlQm9tYigpO1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5ZWF9ib29tMik7XHJcbiAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZGVzdHJveUdhbWVFZmZlY3RCeUlkKHRoaXMuZ2FtZV9lZmZlY3RfaWQsdGhpcy5ub2RlKTtcclxuICAgIH1cclxuICAgIC8qKuavj+asoeaUu+WHu+S8muWvueWNiuW+hHvlj4LmlbAxfeiMg+WbtOWGhemAoOaIkHvlj4LmlbAyfSXkvKTlrrMgKi9cclxuICAgIGNyZWF0ZUJvbWIoKXtcclxuICAgICAgICBsZXQgYmFvemhhPUdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5wYW9zaG91X3NraWxsX2hpdCx0aGlzLnRhcmdldF9wb3MpO1xyXG4gICAgICAgIC8vYmFvemhhLmFuZ2xlPU15VG9vbC5yYWRpYW5Ub0FuZ2xlKHRoaXMubW92ZV9kaXJlY3Rpb24pLTkwO1xyXG4gICAgICAgIC8vTXlUb29sLnJhbmRvbVNjZW5lU2hha2UoLTUsNSwwLjAyLDYpO1xyXG4gICAgICAgIGxldCBtb25zdGVycz1Nb25zdGVyTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1vbnN0ZXJzRm9yQ2VudGVyUG9zKC0xLHRoaXMubm9kZS5nZXRQb3NpdGlvbigpLHRoaXMuYm9tYl9zaXplKTtcclxuICAgICAgICBpZihtb25zdGVycyl7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPG1vbnN0ZXJzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGxldCBtb25zdGVyVHM9bW9uc3RlcnNbaV0uZ2V0Q29tcG9uZW50KE1vbnN0ZXIpO1xyXG4gICAgICAgICAgICAgICAgbW9uc3RlclRzLmJlRmxhc2hJbmp1cmVkKHRoaXMuZ29uZ2ppX2RhdGEpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy9iYW96aGEuZ2V0Q29tcG9uZW50KFBhb0RhbkJhb1poYSkuaW5pdChHYW1lRWZmZWN0SWQucGFvc2hvdV9wYW9kYW5faGl0LHRoaXMucGFvZGFuX3R5cGUsdGhpcy5nb25namlfZGF0YSk7XHJcblxyXG4gICAgICAgIGJhb3poYS5zY2FsZT10aGlzLmJvbWJfc2l6ZS8xMDA7XHJcbiAgICAgICAgLy9iYW96aGEuc2NhbGU9MTtcclxuICAgIH1cclxufVxyXG4iXX0=