
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Hero/Game/PaoShou/TouDan.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1159f461VdHIojYp3LicB3Y', 'TouDan');
// Scripts/Hero/Game/PaoShou/TouDan.ts

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
var GameEffectsManager_1 = require("../../../Game/GameEffectsManager");
var GameManager_1 = require("../../../GameManager");
var Monster_1 = require("../../../Monster/Monster");
var MonsterManager_1 = require("../../../Monster/MonsterManager");
var AudioConstants_1 = require("../../../Sound/AudioConstants");
var MyTool_1 = require("../../../Tools/MyTool");
var GongJi_1 = require("../GongJi");
var HeroConfig_1 = require("../HeroConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TouDan = /** @class */ (function (_super) {
    __extends(TouDan, _super);
    function TouDan() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.paodan_type = HeroConfig_1.PaoDan_Type.skill;
        _this.game_effect_id = GameEffectsManager_1.GameEffectId.Null;
        //目标地点，到达后爆炸
        _this.target_pos = null;
        return _this;
    }
    TouDan.prototype.init = function (id, targetPos, gjData) {
        _super.prototype.initData.call(this, gjData);
        this.game_effect_id = id;
        this.target_pos = targetPos;
        //距离
        var jtTime = 0.6;
        this.node.scale = 3;
        this.node.x = targetPos.x;
        var yy = GameManager_1.default.getInstance().enemy_att_y;
        var disScale = 1.5 - (this.target_pos.y - yy) / 1000;
        //this.node.y=cc.winSize.height/2+200;
        cc.tween(this.node).then(cc.spawn(cc.scaleTo(jtTime, disScale), cc.moveTo(jtTime, targetPos))).call(this.destroySelf, this).start();
        // let node=GroundManager.getInstance().createGameEffectById(GameEffectId.paoshou_paodan_luodi,this.target_pos);
        // cc.tween(node).delay(jtTime).call(()=>{
        //     GameEffectsManager.getInstance().destroyGameEffectById(GameEffectId.paoshou_paodan_luodi,node);
        // }).start();
    };
    TouDan.prototype.destroySelf = function () {
        //判断是否是分裂出来的,分裂过就不能分裂了
        this.createBomb();
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_PaoShouSkill2);
        GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(this.game_effect_id, this.node);
    };
    TouDan.prototype.createBomb = function () {
        var baozha = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.paoshou_paodan_hit, this.target_pos);
        // baozha.getComponent(PaoDanBaoZha).init(GameEffectId.paoshou_active_skill_2,PaoDan_Type.super,this.gongji_data);
        // //baozha.scale=this.gongji_data.hero_data.SkillValue_2/100;
        var sheshouEx1 = this.gongji_data.hero_data.ExclusiveWeaponSkillValue_1;
        var aoe = 0;
        if (sheshouEx1 && sheshouEx1 > 0) {
            //范围提升
            aoe = sheshouEx1;
        }
        MyTool_1.default.randomSceneShake(-5, 5, 0.02, 6);
        var monsters = MonsterManager_1.default.getInstance().getMonstersForCenterPos(-1, this.node.getPosition(), 120 * (1 + aoe));
        if (monsters) {
            for (var i = 0; i < monsters.length; i++) {
                var monsterTs = monsters[i].getComponent(Monster_1.default);
                monsterTs.beFlashInjured(this.gongji_data);
            }
        }
        baozha.scale = 1.75;
    };
    __decorate([
        property({ type: cc.Enum(HeroConfig_1.PaoDan_Type) })
    ], TouDan.prototype, "paodan_type", void 0);
    TouDan = __decorate([
        ccclass
    ], TouDan);
    return TouDan;
}(GongJi_1.default));
exports.default = TouDan;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcR2FtZVxcUGFvU2hvdVxcVG91RGFuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVFQUFvRjtBQUNwRixvREFBK0M7QUFDL0Msb0RBQStDO0FBQy9DLGtFQUE2RDtBQUM3RCxnRUFBMkQ7QUFDM0QsZ0RBQTJDO0FBRTNDLG9DQUErQjtBQUMvQiw0Q0FBNEM7QUFLdEMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBb0MsMEJBQU07SUFBMUM7UUFBQSxxRUF3REM7UUFyREcsaUJBQVcsR0FBYSx3QkFBVyxDQUFDLEtBQUssQ0FBQztRQUUxQyxvQkFBYyxHQUFjLGlDQUFZLENBQUMsSUFBSSxDQUFDO1FBQzlDLFlBQVk7UUFDWixnQkFBVSxHQUFTLElBQUksQ0FBQzs7SUFpRDVCLENBQUM7SUEvQ0cscUJBQUksR0FBSixVQUFLLEVBQWUsRUFBQyxTQUFpQixFQUFDLE1BQWlCO1FBRXBELGlCQUFNLFFBQVEsWUFBQyxNQUFNLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsY0FBYyxHQUFDLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsVUFBVSxHQUFDLFNBQVMsQ0FBQztRQUMxQixJQUFJO1FBQ0osSUFBSSxNQUFNLEdBQUMsR0FBRyxDQUFDO1FBQ2YsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUMsQ0FBQyxDQUFDO1FBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDeEIsSUFBSSxFQUFFLEdBQUMscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUM7UUFDN0MsSUFBSSxRQUFRLEdBQUMsR0FBRyxHQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLEdBQUMsSUFBSSxDQUFDO1FBQzdDLHNDQUFzQztRQUN0QyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBQyxRQUFRLENBQUMsRUFBQyxFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDaEksZ0hBQWdIO1FBQ2hILDBDQUEwQztRQUMxQyxzR0FBc0c7UUFDdEcsY0FBYztJQUNsQixDQUFDO0lBRUQsNEJBQVcsR0FBWDtRQUVJLHNCQUFzQjtRQUN0QixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbEIscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLDJCQUFVLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUMvRSx1Q0FBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxRixDQUFDO0lBRUQsMkJBQVUsR0FBVjtRQUNJLElBQUksTUFBTSxHQUFDLHVDQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDLG9CQUFvQixDQUFDLGlDQUFZLENBQUMsa0JBQWtCLEVBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2xILGtIQUFrSDtRQUNsSCw4REFBOEQ7UUFDOUQsSUFBSSxVQUFVLEdBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsMkJBQTJCLENBQUM7UUFDdEUsSUFBSSxHQUFHLEdBQUMsQ0FBQyxDQUFDO1FBQ1YsSUFBRyxVQUFVLElBQUUsVUFBVSxHQUFDLENBQUMsRUFBQztZQUN4QixNQUFNO1lBQ04sR0FBRyxHQUFDLFVBQVUsQ0FBQztTQUNsQjtRQUNELGdCQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLElBQUksRUFBQyxDQUFDLENBQUMsQ0FBQztRQUNyQyxJQUFJLFFBQVEsR0FBQyx3QkFBYyxDQUFDLFdBQVcsRUFBRSxDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUMsR0FBRyxHQUFDLENBQUMsQ0FBQyxHQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDMUcsSUFBRyxRQUFRLEVBQUM7WUFDUixLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQztnQkFDaEMsSUFBSSxTQUFTLEdBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxpQkFBTyxDQUFDLENBQUM7Z0JBQ2hELFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2FBQzlDO1NBQ0o7UUFDRCxNQUFNLENBQUMsS0FBSyxHQUFDLElBQUksQ0FBQztJQUN0QixDQUFDO0lBcEREO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsd0JBQVcsQ0FBQyxFQUFDLENBQUM7K0NBQ0k7SUFIekIsTUFBTTtRQUQxQixPQUFPO09BQ2EsTUFBTSxDQXdEMUI7SUFBRCxhQUFDO0NBeERELEFBd0RDLENBeERtQyxnQkFBTSxHQXdEekM7a0JBeERvQixNQUFNIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR2FtZUVmZmVjdElkLCBHYW1lRWZmZWN0c01hbmFnZXIgfSBmcm9tIFwiLi4vLi4vLi4vR2FtZS9HYW1lRWZmZWN0c01hbmFnZXJcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi8uLi8uLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgTW9uc3RlciBmcm9tIFwiLi4vLi4vLi4vTW9uc3Rlci9Nb25zdGVyXCI7XHJcbmltcG9ydCBNb25zdGVyTWFuYWdlciBmcm9tIFwiLi4vLi4vLi4vTW9uc3Rlci9Nb25zdGVyTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTb3VuZEluZGV4IH0gZnJvbSBcIi4uLy4uLy4uL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBNeVRvb2wgZnJvbSBcIi4uLy4uLy4uL1Rvb2xzL015VG9vbFwiO1xyXG5pbXBvcnQgeyBHb25nSmlEYXRhIH0gZnJvbSBcIi4uLy4uL0RhdGEvSGVyb0RhdGFcIjtcclxuaW1wb3J0IEdvbmdKaSBmcm9tIFwiLi4vR29uZ0ppXCI7XHJcbmltcG9ydCB7IFBhb0Rhbl9UeXBlIH0gZnJvbSBcIi4uL0hlcm9Db25maWdcIjtcclxuaW1wb3J0IFBhb0RhbkJhb1poYSBmcm9tIFwiLi9QYW9EYW5CYW9aaGFcIjtcclxuXHJcblxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUb3VEYW4gZXh0ZW5kcyBHb25nSmkge1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5FbnVtKFBhb0Rhbl9UeXBlKX0pXHJcbiAgICBwYW9kYW5fdHlwZTpQYW9EYW5fVHlwZT1QYW9EYW5fVHlwZS5za2lsbDtcclxuXHJcbiAgICBnYW1lX2VmZmVjdF9pZDpHYW1lRWZmZWN0SWQ9R2FtZUVmZmVjdElkLk51bGw7ICAgIFxyXG4gICAgLy/nm67moIflnLDngrnvvIzliLDovr7lkI7niIbngrhcclxuICAgIHRhcmdldF9wb3M6Y2MuVmVjMj1udWxsO1xyXG5cclxuICAgIGluaXQoaWQ6R2FtZUVmZmVjdElkLHRhcmdldFBvczpjYy5WZWMyLGdqRGF0YTpHb25nSmlEYXRhKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyLmluaXREYXRhKGdqRGF0YSk7XHJcbiAgICAgICAgdGhpcy5nYW1lX2VmZmVjdF9pZD1pZDtcclxuICAgICAgICB0aGlzLnRhcmdldF9wb3M9dGFyZ2V0UG9zO1xyXG4gICAgICAgIC8v6Led56a7XHJcbiAgICAgICAgbGV0IGp0VGltZT0wLjY7XHJcbiAgICAgICAgdGhpcy5ub2RlLnNjYWxlPTM7XHJcbiAgICAgICAgdGhpcy5ub2RlLng9dGFyZ2V0UG9zLng7XHJcbiAgICAgICAgbGV0IHl5PUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW5lbXlfYXR0X3k7XHJcbiAgICAgICAgbGV0IGRpc1NjYWxlPTEuNS0odGhpcy50YXJnZXRfcG9zLnkteXkpLzEwMDA7XHJcbiAgICAgICAgLy90aGlzLm5vZGUueT1jYy53aW5TaXplLmhlaWdodC8yKzIwMDtcclxuICAgICAgICBjYy50d2Vlbih0aGlzLm5vZGUpLnRoZW4oY2Muc3Bhd24oY2Muc2NhbGVUbyhqdFRpbWUsZGlzU2NhbGUpLGNjLm1vdmVUbyhqdFRpbWUsdGFyZ2V0UG9zKSkpLmNhbGwodGhpcy5kZXN0cm95U2VsZix0aGlzKS5zdGFydCgpOyAgICAgICAgXHJcbiAgICAgICAgLy8gbGV0IG5vZGU9R3JvdW5kTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5wYW9zaG91X3Bhb2Rhbl9sdW9kaSx0aGlzLnRhcmdldF9wb3MpO1xyXG4gICAgICAgIC8vIGNjLnR3ZWVuKG5vZGUpLmRlbGF5KGp0VGltZSkuY2FsbCgoKT0+e1xyXG4gICAgICAgIC8vICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5kZXN0cm95R2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLnBhb3Nob3VfcGFvZGFuX2x1b2RpLG5vZGUpO1xyXG4gICAgICAgIC8vIH0pLnN0YXJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVzdHJveVNlbGYoKVxyXG4gICAge1xyXG4gICAgICAgIC8v5Yik5pat5piv5ZCm5piv5YiG6KOC5Ye65p2l55qELOWIhuijgui/h+WwseS4jeiDveWIhuijguS6hlxyXG4gICAgICAgIHRoaXMuY3JlYXRlQm9tYigpO1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5ZWF9QYW9TaG91U2tpbGwyKTtcclxuICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5kZXN0cm95R2FtZUVmZmVjdEJ5SWQodGhpcy5nYW1lX2VmZmVjdF9pZCx0aGlzLm5vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUJvbWIoKXtcclxuICAgICAgICBsZXQgYmFvemhhPUdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5wYW9zaG91X3Bhb2Rhbl9oaXQsdGhpcy50YXJnZXRfcG9zKTtcclxuICAgICAgICAvLyBiYW96aGEuZ2V0Q29tcG9uZW50KFBhb0RhbkJhb1poYSkuaW5pdChHYW1lRWZmZWN0SWQucGFvc2hvdV9hY3RpdmVfc2tpbGxfMixQYW9EYW5fVHlwZS5zdXBlcix0aGlzLmdvbmdqaV9kYXRhKTtcclxuICAgICAgICAvLyAvL2Jhb3poYS5zY2FsZT10aGlzLmdvbmdqaV9kYXRhLmhlcm9fZGF0YS5Ta2lsbFZhbHVlXzIvMTAwO1xyXG4gICAgICAgIGxldCBzaGVzaG91RXgxPXRoaXMuZ29uZ2ppX2RhdGEuaGVyb19kYXRhLkV4Y2x1c2l2ZVdlYXBvblNraWxsVmFsdWVfMTtcclxuICAgICAgICBsZXQgYW9lPTA7XHJcbiAgICAgICAgaWYoc2hlc2hvdUV4MSYmc2hlc2hvdUV4MT4wKXtcclxuICAgICAgICAgICAgLy/ojIPlm7Tmj5DljYdcclxuICAgICAgICAgICAgYW9lPXNoZXNob3VFeDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIE15VG9vbC5yYW5kb21TY2VuZVNoYWtlKC01LDUsMC4wMiw2KTtcclxuICAgICAgICBsZXQgbW9uc3RlcnM9TW9uc3Rlck1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNb25zdGVyc0ZvckNlbnRlclBvcygtMSx0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKSwxMjAqKDErYW9lKSk7XHJcbiAgICAgICAgaWYobW9uc3RlcnMpeyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxtb25zdGVycy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQgbW9uc3RlclRzPW1vbnN0ZXJzW2ldLmdldENvbXBvbmVudChNb25zdGVyKTtcclxuICAgICAgICAgICAgICAgIG1vbnN0ZXJUcy5iZUZsYXNoSW5qdXJlZCh0aGlzLmdvbmdqaV9kYXRhKTsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgYmFvemhhLnNjYWxlPTEuNzU7XHJcbiAgICB9XHJcbn1cclxuIl19