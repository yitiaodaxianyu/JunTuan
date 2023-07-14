
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Monster/Elite/ShuangJuRen.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a67ed/AlFVEVI2PZb+//qgo', 'ShuangJuRen');
// Scripts/Monster/Elite/ShuangJuRen.ts

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
var EnemyConfig_1 = require("../../Enemy/EnemyConfig");
var GameEffectsManager_1 = require("../../Game/GameEffectsManager");
var GameManager_1 = require("../../GameManager");
var HeroManager_1 = require("../../Hero/Data/HeroManager");
var HeroConfig_1 = require("../../Hero/Game/HeroConfig");
var MonsterData_1 = require("../MonsterData");
var MonsterNewNormal_1 = require("../MonsterNewNormal");
var EliteAtt65_1 = require("./EliteAtt65");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ShuangJuRen = /** @class */ (function (_super) {
    __extends(ShuangJuRen, _super);
    function ShuangJuRen() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShuangJuRen.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        this.addMonsterNormalAttack(this.onMonsterNormalAttack);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.xuanyun, 2);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.monster65_shuangjuren_att);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.monster65_shuangjuren_att_hit);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.monster65_shuangjuren_att_hit_crit);
    };
    /**怪物开始攻击，返回是否截获本次攻击 */
    ShuangJuRen.prototype.onMonsterNormalAttack = function () {
        var _this = this;
        //发射
        this.att_jishu = 0;
        _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.att);
        var data = new MonsterData_1.KeyFrameData();
        data.name = 'OnDamaging';
        data.callback = function () {
            if (_this.getIsDie() == true) {
                return;
            }
            _this.att_jishu = 0;
            var attPos = _super.prototype.getAttPos.call(_this);
            var node = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.monster65_shuangjuren_att, attPos);
            var tss = node.getComponent(EliteAtt65_1.default);
            //随机英雄
            var heroId = HeroManager_1.HeroManager.getInstance().getRandHeroId(GameManager_1.default.getInstance().cur_game_mode);
            if (heroId != HeroConfig_1.Hero_Type.NULL) {
                var heroPos = GameManager_1.default.getInstance().all_hero.get(heroId).node.getPosition();
                var offsetPos = heroPos.sub(attPos);
                var pi2 = Math.PI * 2;
                var attDir = (Math.atan2(offsetPos.y, offsetPos.x) + pi2) % pi2;
                tss.setAttHero(heroId);
                tss.init(_super.prototype.getAttData.call(_this, HeroConfig_1.DamageType.Normal, true, 0), GameEffectsManager_1.GameEffectId.monster65_shuangjuren_att, 1000, attDir, 1280, 270);
            }
        };
        _super.prototype.playSpinAnimaton.call(this, (this.getAnimaName(MonsterData_1.MonsterActionName.Attack)), false, data, function () {
            _super.prototype.setEnemyState.call(_this, EnemyConfig_1.Enemy_State.move);
            _this.startIdle();
            if (_this.att_wall) {
                _this.move_direction = Math.random() > 0.5 ? Math.PI : 0;
            }
        });
        return true;
    };
    ShuangJuRen = __decorate([
        ccclass
    ], ShuangJuRen);
    return ShuangJuRen;
}(MonsterNewNormal_1.default));
exports.default = ShuangJuRen;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTW9uc3RlclxcRWxpdGVcXFNodWFuZ0p1UmVuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHVEQUFzRDtBQUN0RCxvRUFBaUY7QUFDakYsaURBQTRDO0FBQzVDLDJEQUEwRDtBQUMxRCx5REFBMkU7QUFDM0UsOENBQStFO0FBQy9FLHdEQUFtRDtBQUNuRCwyQ0FBc0M7QUFHaEMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBeUMsK0JBQWdCO0lBQXpEOztJQStDQSxDQUFDO0lBN0NhLDRCQUFNLEdBQWhCO1FBQ0ksaUJBQU0sTUFBTSxXQUFFLENBQUM7UUFDZixJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDeEQsdUNBQWtCLENBQUMsV0FBVyxFQUFFLENBQUMsaUJBQWlCLENBQUMsaUNBQVksQ0FBQyxPQUFPLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0UsdUNBQWtCLENBQUMsV0FBVyxFQUFFLENBQUMsaUJBQWlCLENBQUMsaUNBQVksQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1FBQzNGLHVDQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDLGlCQUFpQixDQUFDLGlDQUFZLENBQUMsNkJBQTZCLENBQUMsQ0FBQztRQUMvRix1Q0FBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxpQ0FBWSxDQUFDLGtDQUFrQyxDQUFDLENBQUM7SUFDeEcsQ0FBQztJQUVELHVCQUF1QjtJQUN2QiwyQ0FBcUIsR0FBckI7UUFBQSxpQkFpQ0M7UUFoQ0csSUFBSTtRQUNKLElBQUksQ0FBQyxTQUFTLEdBQUMsQ0FBQyxDQUFDO1FBQ2pCLGlCQUFNLGFBQWEsWUFBQyx5QkFBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JDLElBQUksSUFBSSxHQUFDLElBQUksMEJBQVksRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxJQUFJLEdBQUMsWUFBWSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxRQUFRLEdBQUM7WUFDVixJQUFHLEtBQUksQ0FBQyxRQUFRLEVBQUUsSUFBRSxJQUFJLEVBQUM7Z0JBQ3JCLE9BQU87YUFDVjtZQUNELEtBQUksQ0FBQyxTQUFTLEdBQUMsQ0FBQyxDQUFDO1lBQ2pCLElBQUksTUFBTSxHQUFDLGlCQUFNLFNBQVMsWUFBRSxDQUFDO1lBQzdCLElBQUksSUFBSSxHQUFDLHVDQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDLG9CQUFvQixDQUFDLGlDQUFZLENBQUMseUJBQXlCLEVBQUMsTUFBTSxDQUFDLENBQUM7WUFDOUcsSUFBSSxHQUFHLEdBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxvQkFBVSxDQUFDLENBQUM7WUFDdEMsTUFBTTtZQUNOLElBQUksTUFBTSxHQUFDLHlCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDNUYsSUFBRyxNQUFNLElBQUUsc0JBQVMsQ0FBQyxJQUFJLEVBQUM7Z0JBQ3RCLElBQUksT0FBTyxHQUFDLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQzlFLElBQUksU0FBUyxHQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7Z0JBQ2pDLElBQUksR0FBRyxHQUFDLElBQUksQ0FBQyxFQUFFLEdBQUMsQ0FBQyxDQUFDO2dCQUNsQixJQUFJLE1BQU0sR0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUMsR0FBRyxDQUFDLEdBQUMsR0FBRyxDQUFDO2dCQUN6RCxHQUFHLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN2QixHQUFHLENBQUMsSUFBSSxDQUFDLGlCQUFNLFVBQVUsYUFBQyx1QkFBVSxDQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDLEVBQUMsaUNBQVksQ0FBQyx5QkFBeUIsRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxHQUFHLENBQUMsQ0FBQzthQUNwSDtRQUNMLENBQUMsQ0FBQTtRQUNELGlCQUFNLGdCQUFnQixZQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQywrQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFDLEtBQUssRUFBQyxJQUFJLEVBQUM7WUFDNUUsaUJBQU0sYUFBYSxhQUFDLHlCQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdEMsS0FBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ2pCLElBQUcsS0FBSSxDQUFDLFFBQVEsRUFBQztnQkFDYixLQUFJLENBQUMsY0FBYyxHQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBQyxHQUFHLENBQUEsQ0FBQyxDQUFBLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxDQUFBLENBQUMsQ0FBQzthQUNuRDtRQUNMLENBQUMsQ0FBQyxDQUFBO1FBQ0YsT0FBTyxJQUFJLENBQUE7SUFDZixDQUFDO0lBN0NnQixXQUFXO1FBRC9CLE9BQU87T0FDYSxXQUFXLENBK0MvQjtJQUFELGtCQUFDO0NBL0NELEFBK0NDLENBL0N3QywwQkFBZ0IsR0ErQ3hEO2tCQS9Db0IsV0FBVyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgeyBFbmVteV9TdGF0ZSB9IGZyb20gXCIuLi8uLi9FbmVteS9FbmVteUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBHYW1lRWZmZWN0c01hbmFnZXIsIEdhbWVFZmZlY3RJZCB9IGZyb20gXCIuLi8uLi9HYW1lL0dhbWVFZmZlY3RzTWFuYWdlclwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uLy4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEhlcm9NYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0hlcm8vRGF0YS9IZXJvTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBCdWZmSWQsIERhbWFnZVR5cGUsIEhlcm9fVHlwZSB9IGZyb20gXCIuLi8uLi9IZXJvL0dhbWUvSGVyb0NvbmZpZ1wiO1xyXG5pbXBvcnQgeyBLZXlGcmFtZURhdGEsIE1vbnN0ZXJBY3Rpb25OYW1lLCBTdHJlbmd0aFR5cGUgfSBmcm9tIFwiLi4vTW9uc3RlckRhdGFcIjtcclxuaW1wb3J0IE1vbnN0ZXJOZXdOb3JtYWwgZnJvbSBcIi4uL01vbnN0ZXJOZXdOb3JtYWxcIjtcclxuaW1wb3J0IEVsaXRlQXR0NjUgZnJvbSBcIi4vRWxpdGVBdHQ2NVwiO1xyXG5cclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2h1YW5nSnVSZW4gZXh0ZW5kcyBNb25zdGVyTmV3Tm9ybWFsIHtcclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Mb2FkKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xyXG4gICAgICAgIHRoaXMuYWRkTW9uc3Rlck5vcm1hbEF0dGFjayh0aGlzLm9uTW9uc3Rlck5vcm1hbEF0dGFjayk7XHJcbiAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRWZmZWN0UG9vbEJ5SWQoR2FtZUVmZmVjdElkLnh1YW55dW4sMik7XHJcbiAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRWZmZWN0UG9vbEJ5SWQoR2FtZUVmZmVjdElkLm1vbnN0ZXI2NV9zaHVhbmdqdXJlbl9hdHQpO1xyXG4gICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEVmZmVjdFBvb2xCeUlkKEdhbWVFZmZlY3RJZC5tb25zdGVyNjVfc2h1YW5nanVyZW5fYXR0X2hpdCk7XHJcbiAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRWZmZWN0UG9vbEJ5SWQoR2FtZUVmZmVjdElkLm1vbnN0ZXI2NV9zaHVhbmdqdXJlbl9hdHRfaGl0X2NyaXQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuaAqueJqeW8gOWni+aUu+WHu++8jOi/lOWbnuaYr+WQpuaIquiOt+acrOasoeaUu+WHuyAqL1xyXG4gICAgb25Nb25zdGVyTm9ybWFsQXR0YWNrICgpOmJvb2xlYW4ge1xyXG4gICAgICAgIC8v5Y+R5bCEXHJcbiAgICAgICAgdGhpcy5hdHRfamlzaHU9MDtcclxuICAgICAgICBzdXBlci5zZXRFbmVteVN0YXRlKEVuZW15X1N0YXRlLmF0dCk7XHJcbiAgICAgICAgbGV0IGRhdGE9bmV3IEtleUZyYW1lRGF0YSgpO1xyXG4gICAgICAgIGRhdGEubmFtZT0nT25EYW1hZ2luZyc7XHJcbiAgICAgICAgZGF0YS5jYWxsYmFjaz0oKT0+e1xyXG4gICAgICAgICAgICBpZih0aGlzLmdldElzRGllKCk9PXRydWUpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuYXR0X2ppc2h1PTA7XHJcbiAgICAgICAgICAgIGxldCBhdHRQb3M9c3VwZXIuZ2V0QXR0UG9zKCk7XHJcbiAgICAgICAgICAgIGxldCBub2RlPUdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5tb25zdGVyNjVfc2h1YW5nanVyZW5fYXR0LGF0dFBvcyk7XHJcbiAgICAgICAgICAgIGxldCB0c3M9bm9kZS5nZXRDb21wb25lbnQoRWxpdGVBdHQ2NSk7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8v6ZqP5py66Iux6ZuEXHJcbiAgICAgICAgICAgIGxldCBoZXJvSWQ9SGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRSYW5kSGVyb0lkKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZSk7XHJcbiAgICAgICAgICAgIGlmKGhlcm9JZCE9SGVyb19UeXBlLk5VTEwpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGhlcm9Qb3M9R2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hbGxfaGVyby5nZXQoaGVyb0lkKS5ub2RlLmdldFBvc2l0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgb2Zmc2V0UG9zPWhlcm9Qb3Muc3ViKGF0dFBvcylcclxuICAgICAgICAgICAgICAgIGxldCBwaTI9TWF0aC5QSSoyO1xyXG4gICAgICAgICAgICAgICAgbGV0IGF0dERpcj0oTWF0aC5hdGFuMihvZmZzZXRQb3MueSxvZmZzZXRQb3MueCkrcGkyKSVwaTI7XHJcbiAgICAgICAgICAgICAgICB0c3Muc2V0QXR0SGVybyhoZXJvSWQpO1xyXG4gICAgICAgICAgICAgICAgdHNzLmluaXQoc3VwZXIuZ2V0QXR0RGF0YShEYW1hZ2VUeXBlLk5vcm1hbCx0cnVlLDApLEdhbWVFZmZlY3RJZC5tb25zdGVyNjVfc2h1YW5nanVyZW5fYXR0LDEwMDAsYXR0RGlyLDEyODAsMjcwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBzdXBlci5wbGF5U3BpbkFuaW1hdG9uKCh0aGlzLmdldEFuaW1hTmFtZShNb25zdGVyQWN0aW9uTmFtZS5BdHRhY2spKSxmYWxzZSxkYXRhLCgpPT57XHJcbiAgICAgICAgICAgIHN1cGVyLnNldEVuZW15U3RhdGUoRW5lbXlfU3RhdGUubW92ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRJZGxlKCk7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuYXR0X3dhbGwpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlX2RpcmVjdGlvbj1NYXRoLnJhbmRvbSgpPjAuNT9NYXRoLlBJOjA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiB0cnVlXHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==