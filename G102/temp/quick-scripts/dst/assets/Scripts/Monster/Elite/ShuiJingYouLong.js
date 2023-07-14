
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Monster/Elite/ShuiJingYouLong.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '08463xU4FFIKreDYrfvjUlb', 'ShuiJingYouLong');
// Scripts/Monster/Elite/ShuiJingYouLong.ts

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
var HeroConfig_1 = require("../../Hero/Game/HeroConfig");
var MonsterData_1 = require("../MonsterData");
var MonsterNewNormal_1 = require("../MonsterNewNormal");
var EliteAtt67_1 = require("./EliteAtt67");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ShuiJingYouLong = /** @class */ (function (_super) {
    __extends(ShuiJingYouLong, _super);
    function ShuiJingYouLong() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShuiJingYouLong.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        _super.prototype.addMonsterNormalInited.call(this, this.onMonsterNormalInited);
        _super.prototype.addMonsterNormalAttack.call(this, this.onMonsterNormalAttack);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.monster67_shuijingyoulong_att, 1);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.monster67_shuijingyoulong_att_hit, 1);
    };
    ShuiJingYouLong.prototype.onMonsterNormalInited = function () {
    };
    /**怪物开始攻击，返回是否截获本次攻击 */
    ShuiJingYouLong.prototype.onMonsterNormalAttack = function () {
        var _this = this;
        this.att_jishu = 0;
        _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.att);
        var data = new MonsterData_1.KeyFrameData();
        data.name = 'OnDamaging';
        data.callback = function () {
            _this.att_jishu = 0;
            if (_this.getIsDie()) {
                return;
            }
            var attNode = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.monster67_shuijingyoulong_att, _super.prototype.getAttPos.call(_this));
            var attData = _super.prototype.getAttData.call(_this, HeroConfig_1.DamageType.Normal, true);
            attData.zengshang_rate += _this.skill_data.getSkillValue1(1);
            attNode.getComponent(EliteAtt67_1.default).init(attData, GameEffectsManager_1.GameEffectId.monster67_shuijingyoulong_att, 1200, Math.PI * 3 / 2, _this.node.y);
        };
        _super.prototype.playSpinAnimaton.call(this, this.getAnimaName(MonsterData_1.MonsterActionName.Attack), false, data, function () {
            _this.startIdle();
            _super.prototype.setEnemyState.call(_this, EnemyConfig_1.Enemy_State.move);
            if (_this.att_wall) {
                _this.move_direction = Math.random() > 0.5 ? Math.PI : 0;
            }
        });
        return true;
    };
    ShuiJingYouLong = __decorate([
        ccclass
    ], ShuiJingYouLong);
    return ShuiJingYouLong;
}(MonsterNewNormal_1.default));
exports.default = ShuiJingYouLong;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTW9uc3RlclxcRWxpdGVcXFNodWlKaW5nWW91TG9uZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1REFBc0Q7QUFDdEQsb0VBQWlGO0FBQ2pGLHlEQUF3RDtBQUN4RCw4Q0FBNkU7QUFDN0Usd0RBQW1EO0FBQ25ELDJDQUFzQztBQUdoQyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUE2QyxtQ0FBZ0I7SUFBN0Q7O0lBd0NBLENBQUM7SUF0Q2EsZ0NBQU0sR0FBaEI7UUFDSSxpQkFBTSxNQUFNLFdBQUUsQ0FBQztRQUNmLGlCQUFNLHNCQUFzQixZQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ3pELGlCQUFNLHNCQUFzQixZQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ3pELHVDQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDLGlCQUFpQixDQUFDLGlDQUFZLENBQUMsNkJBQTZCLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakcsdUNBQWtCLENBQUMsV0FBVyxFQUFFLENBQUMsaUJBQWlCLENBQUMsaUNBQVksQ0FBQyxpQ0FBaUMsRUFBQyxDQUFDLENBQUMsQ0FBQztJQUN6RyxDQUFDO0lBRUQsK0NBQXFCLEdBQXJCO0lBRUEsQ0FBQztJQUdELHVCQUF1QjtJQUN2QiwrQ0FBcUIsR0FBckI7UUFBQSxpQkF1QkM7UUF0QkcsSUFBSSxDQUFDLFNBQVMsR0FBQyxDQUFDLENBQUM7UUFDakIsaUJBQU0sYUFBYSxZQUFDLHlCQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDckMsSUFBSSxJQUFJLEdBQUMsSUFBSSwwQkFBWSxFQUFFLENBQUM7UUFDNUIsSUFBSSxDQUFDLElBQUksR0FBQyxZQUFZLENBQUM7UUFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBQztZQUNWLEtBQUksQ0FBQyxTQUFTLEdBQUMsQ0FBQyxDQUFDO1lBQ2pCLElBQUcsS0FBSSxDQUFDLFFBQVEsRUFBRSxFQUFDO2dCQUNmLE9BQU87YUFDVjtZQUNELElBQUksT0FBTyxHQUFDLHVDQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDLG9CQUFvQixDQUFDLGlDQUFZLENBQUMsNkJBQTZCLEVBQUMsaUJBQU0sU0FBUyxZQUFFLENBQUMsQ0FBQztZQUNoSSxJQUFJLE9BQU8sR0FBQyxpQkFBTSxVQUFVLGFBQUMsdUJBQVUsQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLENBQUM7WUFDckQsT0FBTyxDQUFDLGNBQWMsSUFBRSxLQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxRCxPQUFPLENBQUMsWUFBWSxDQUFDLG9CQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFDLGlDQUFZLENBQUMsNkJBQTZCLEVBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxFQUFFLEdBQUMsQ0FBQyxHQUFDLENBQUMsRUFBQyxLQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNILENBQUMsQ0FBQTtRQUNELGlCQUFNLGdCQUFnQixZQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsK0JBQWlCLENBQUMsTUFBTSxDQUFDLEVBQUMsS0FBSyxFQUFDLElBQUksRUFBQztZQUMxRSxLQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDakIsaUJBQU0sYUFBYSxhQUFDLHlCQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdEMsSUFBRyxLQUFJLENBQUMsUUFBUSxFQUFDO2dCQUNiLEtBQUksQ0FBQyxjQUFjLEdBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFDLEdBQUcsQ0FBQSxDQUFDLENBQUEsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLENBQUEsQ0FBQyxDQUFDO2FBQ25EO1FBQ0wsQ0FBQyxDQUFDLENBQUE7UUFDRixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBdkNnQixlQUFlO1FBRG5DLE9BQU87T0FDYSxlQUFlLENBd0NuQztJQUFELHNCQUFDO0NBeENELEFBd0NDLENBeEM0QywwQkFBZ0IsR0F3QzVEO2tCQXhDb0IsZUFBZSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVuZW15X1N0YXRlIH0gZnJvbSBcIi4uLy4uL0VuZW15L0VuZW15Q29uZmlnXCI7XHJcbmltcG9ydCB7IEdhbWVFZmZlY3RJZCwgR2FtZUVmZmVjdHNNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0dhbWUvR2FtZUVmZmVjdHNNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IERhbWFnZVR5cGUgfSBmcm9tIFwiLi4vLi4vSGVyby9HYW1lL0hlcm9Db25maWdcIjtcclxuaW1wb3J0IHsgS2V5RnJhbWVEYXRhLCBHb25nSmlNb2RlLCBNb25zdGVyQWN0aW9uTmFtZSB9IGZyb20gXCIuLi9Nb25zdGVyRGF0YVwiO1xyXG5pbXBvcnQgTW9uc3Rlck5ld05vcm1hbCBmcm9tIFwiLi4vTW9uc3Rlck5ld05vcm1hbFwiO1xyXG5pbXBvcnQgRWxpdGVBdHQ2NyBmcm9tIFwiLi9FbGl0ZUF0dDY3XCI7XHJcblxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaHVpSmluZ1lvdUxvbmcgZXh0ZW5kcyBNb25zdGVyTmV3Tm9ybWFsIHtcclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Mb2FkKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xyXG4gICAgICAgIHN1cGVyLmFkZE1vbnN0ZXJOb3JtYWxJbml0ZWQodGhpcy5vbk1vbnN0ZXJOb3JtYWxJbml0ZWQpO1xyXG4gICAgICAgIHN1cGVyLmFkZE1vbnN0ZXJOb3JtYWxBdHRhY2sodGhpcy5vbk1vbnN0ZXJOb3JtYWxBdHRhY2spO1xyXG4gICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEVmZmVjdFBvb2xCeUlkKEdhbWVFZmZlY3RJZC5tb25zdGVyNjdfc2h1aWppbmd5b3Vsb25nX2F0dCwxKTtcclxuICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRFZmZlY3RQb29sQnlJZChHYW1lRWZmZWN0SWQubW9uc3RlcjY3X3NodWlqaW5neW91bG9uZ19hdHRfaGl0LDEpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uTW9uc3Rlck5vcm1hbEluaXRlZCAoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKirmgKrnianlvIDlp4vmlLvlh7vvvIzov5Tlm57mmK/lkKbmiKrojrfmnKzmrKHmlLvlh7sgKi9cclxuICAgIG9uTW9uc3Rlck5vcm1hbEF0dGFjayAoKTpib29sZWFuIHtcclxuICAgICAgICB0aGlzLmF0dF9qaXNodT0wO1xyXG4gICAgICAgIHN1cGVyLnNldEVuZW15U3RhdGUoRW5lbXlfU3RhdGUuYXR0KTtcclxuICAgICAgICBsZXQgZGF0YT1uZXcgS2V5RnJhbWVEYXRhKCk7XHJcbiAgICAgICAgZGF0YS5uYW1lPSdPbkRhbWFnaW5nJztcclxuICAgICAgICBkYXRhLmNhbGxiYWNrPSgpPT57XHJcbiAgICAgICAgICAgIHRoaXMuYXR0X2ppc2h1PTA7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZ2V0SXNEaWUoKSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGF0dE5vZGU9R2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLm1vbnN0ZXI2N19zaHVpamluZ3lvdWxvbmdfYXR0LHN1cGVyLmdldEF0dFBvcygpKTtcclxuICAgICAgICAgICAgbGV0IGF0dERhdGE9c3VwZXIuZ2V0QXR0RGF0YShEYW1hZ2VUeXBlLk5vcm1hbCx0cnVlKTtcclxuICAgICAgICAgICAgYXR0RGF0YS56ZW5nc2hhbmdfcmF0ZSs9dGhpcy5za2lsbF9kYXRhLmdldFNraWxsVmFsdWUxKDEpO1xyXG4gICAgICAgICAgICBhdHROb2RlLmdldENvbXBvbmVudChFbGl0ZUF0dDY3KS5pbml0KGF0dERhdGEsR2FtZUVmZmVjdElkLm1vbnN0ZXI2N19zaHVpamluZ3lvdWxvbmdfYXR0LDEyMDAsTWF0aC5QSSozLzIsdGhpcy5ub2RlLnkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdXBlci5wbGF5U3BpbkFuaW1hdG9uKHRoaXMuZ2V0QW5pbWFOYW1lKE1vbnN0ZXJBY3Rpb25OYW1lLkF0dGFjayksZmFsc2UsZGF0YSwoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0SWRsZSgpO1xyXG4gICAgICAgICAgICBzdXBlci5zZXRFbmVteVN0YXRlKEVuZW15X1N0YXRlLm1vdmUpO1xyXG4gICAgICAgICAgICBpZih0aGlzLmF0dF93YWxsKXtcclxuICAgICAgICAgICAgICAgIHRoaXMubW92ZV9kaXJlY3Rpb249TWF0aC5yYW5kb20oKT4wLjU/TWF0aC5QSTowO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxufVxyXG4iXX0=