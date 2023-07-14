
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Monster/Elite/ShuiJingJuXie.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'aa5d4KyYaFEMYlw5Xg/iDUY', 'ShuiJingJuXie');
// Scripts/Monster/Elite/ShuiJingJuXie.ts

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
var MyTool_1 = require("../../Tools/MyTool");
var MonsterNewNormal_1 = require("../MonsterNewNormal");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ShuiJingJuXie = /** @class */ (function (_super) {
    __extends(ShuiJingJuXie, _super);
    function ShuiJingJuXie() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShuiJingJuXie.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        _super.prototype.addMonsterNormalInited.call(this, this.onMonsterNormalInited);
    };
    ShuiJingJuXie.prototype.onMonsterNormalInited = function () {
        var _this = this;
        //钻地
        this.unschedule(this.idleToMove);
        this.setEnemyState(EnemyConfig_1.Enemy_State.born);
        this.collider.enabled = false;
        //设置一个随机的坐标
        this.node.y = MyTool_1.default.randomRangeInt(-100, 100);
        _super.prototype.playSpinAnimaton.call(this, "Side_Skill2", false, null, function () {
            _this.collider.enabled = true;
            _super.prototype.playSpinAnimaton.call(_this, "Side_Skill", false, null, function () {
                //恢复移动
                _this.idleToMove();
            });
        });
    };
    ShuiJingJuXie = __decorate([
        ccclass
    ], ShuiJingJuXie);
    return ShuiJingJuXie;
}(MonsterNewNormal_1.default));
exports.default = ShuiJingJuXie;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTW9uc3RlclxcRWxpdGVcXFNodWlKaW5nSnVYaWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsdURBQXNEO0FBQ3RELDZDQUF3QztBQUN4Qyx3REFBbUQ7QUFHN0MsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBMkMsaUNBQWdCO0lBQTNEOztJQXdCQSxDQUFDO0lBdEJhLDhCQUFNLEdBQWhCO1FBQ0ksaUJBQU0sTUFBTSxXQUFFLENBQUM7UUFDZixpQkFBTSxzQkFBc0IsWUFBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQsNkNBQXFCLEdBQXJCO1FBQUEsaUJBY0M7UUFiRyxJQUFJO1FBQ0osSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLGFBQWEsQ0FBQyx5QkFBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxHQUFDLEtBQUssQ0FBQztRQUM1QixXQUFXO1FBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUMsZ0JBQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLENBQUM7UUFDNUMsaUJBQU0sZ0JBQWdCLFlBQUMsYUFBYSxFQUFDLEtBQUssRUFBQyxJQUFJLEVBQUM7WUFDNUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEdBQUMsSUFBSSxDQUFDO1lBQzNCLGlCQUFNLGdCQUFnQixhQUFDLFlBQVksRUFBQyxLQUFLLEVBQUMsSUFBSSxFQUFDO2dCQUMzQyxNQUFNO2dCQUNOLEtBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUN0QixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQXJCZ0IsYUFBYTtRQURqQyxPQUFPO09BQ2EsYUFBYSxDQXdCakM7SUFBRCxvQkFBQztDQXhCRCxBQXdCQyxDQXhCMEMsMEJBQWdCLEdBd0IxRDtrQkF4Qm9CLGFBQWEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHsgRW5lbXlfU3RhdGUgfSBmcm9tIFwiLi4vLi4vRW5lbXkvRW5lbXlDb25maWdcIjtcclxuaW1wb3J0IE15VG9vbCBmcm9tIFwiLi4vLi4vVG9vbHMvTXlUb29sXCI7XHJcbmltcG9ydCBNb25zdGVyTmV3Tm9ybWFsIGZyb20gXCIuLi9Nb25zdGVyTmV3Tm9ybWFsXCI7XHJcblxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaHVpSmluZ0p1WGllIGV4dGVuZHMgTW9uc3Rlck5ld05vcm1hbCB7XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uTG9hZCgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5vbkxvYWQoKTtcclxuICAgICAgICBzdXBlci5hZGRNb25zdGVyTm9ybWFsSW5pdGVkKHRoaXMub25Nb25zdGVyTm9ybWFsSW5pdGVkKTtcclxuICAgIH1cclxuXHJcbiAgICBvbk1vbnN0ZXJOb3JtYWxJbml0ZWQgKCkge1xyXG4gICAgICAgIC8v6ZK75ZywXHJcbiAgICAgICAgdGhpcy51bnNjaGVkdWxlKHRoaXMuaWRsZVRvTW92ZSk7XHJcbiAgICAgICAgdGhpcy5zZXRFbmVteVN0YXRlKEVuZW15X1N0YXRlLmJvcm4pO1xyXG4gICAgICAgIHRoaXMuY29sbGlkZXIuZW5hYmxlZD1mYWxzZTtcclxuICAgICAgICAvL+iuvue9ruS4gOS4qumaj+acuueahOWdkOagh1xyXG4gICAgICAgIHRoaXMubm9kZS55PU15VG9vbC5yYW5kb21SYW5nZUludCgtMTAwLDEwMCk7XHJcbiAgICAgICAgc3VwZXIucGxheVNwaW5BbmltYXRvbihcIlNpZGVfU2tpbGwyXCIsZmFsc2UsbnVsbCwoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLmNvbGxpZGVyLmVuYWJsZWQ9dHJ1ZTtcclxuICAgICAgICAgICAgc3VwZXIucGxheVNwaW5BbmltYXRvbihcIlNpZGVfU2tpbGxcIixmYWxzZSxudWxsLCgpPT57XHJcbiAgICAgICAgICAgICAgICAvL+aBouWkjeenu+WKqFxyXG4gICAgICAgICAgICAgICAgdGhpcy5pZGxlVG9Nb3ZlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuIl19