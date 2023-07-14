
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Monster/Elite/Elite72.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9d312Tvw/JOzbTCihFR9DEX', 'Elite72');
// Scripts/Monster/Elite/Elite72.ts

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
var MonsterNewNormal_1 = require("../MonsterNewNormal");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Elite72 = /** @class */ (function (_super) {
    __extends(Elite72, _super);
    function Elite72() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Elite72.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        _super.prototype.addMonsterNormalInited.call(this, this.onMonsterNormalInited);
    };
    Elite72.prototype.onMonsterNormalInited = function () {
        //最大生命值的技能
        this.cur_hp = this.max_hp = this.monster_data.Health * (1 + 1);
    };
    Elite72 = __decorate([
        ccclass
    ], Elite72);
    return Elite72;
}(MonsterNewNormal_1.default));
exports.default = Elite72;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTW9uc3RlclxcRWxpdGVcXEVsaXRlNzIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esd0RBQW1EO0FBRTdDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXFDLDJCQUFnQjtJQUFyRDs7SUFlQSxDQUFDO0lBYmEsd0JBQU0sR0FBaEI7UUFDSSxpQkFBTSxNQUFNLFdBQUUsQ0FBQztRQUNmLGlCQUFNLHNCQUFzQixZQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFRCx1Q0FBcUIsR0FBckI7UUFDSSxVQUFVO1FBQ1YsSUFBSSxDQUFDLE1BQU0sR0FBQyxJQUFJLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFWZ0IsT0FBTztRQUQzQixPQUFPO09BQ2EsT0FBTyxDQWUzQjtJQUFELGNBQUM7Q0FmRCxBQWVDLENBZm9DLDBCQUFnQixHQWVwRDtrQkFmb0IsT0FBTyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgTW9uc3Rlck5ld05vcm1hbCBmcm9tIFwiLi4vTW9uc3Rlck5ld05vcm1hbFwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbGl0ZTcyIGV4dGVuZHMgTW9uc3Rlck5ld05vcm1hbCB7XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uTG9hZCgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5vbkxvYWQoKTtcclxuICAgICAgICBzdXBlci5hZGRNb25zdGVyTm9ybWFsSW5pdGVkKHRoaXMub25Nb25zdGVyTm9ybWFsSW5pdGVkKTtcclxuICAgIH1cclxuXHJcbiAgICBvbk1vbnN0ZXJOb3JtYWxJbml0ZWQgKCkge1xyXG4gICAgICAgIC8v5pyA5aSn55Sf5ZG95YC855qE5oqA6IO9XHJcbiAgICAgICAgdGhpcy5jdXJfaHA9dGhpcy5tYXhfaHA9dGhpcy5tb25zdGVyX2RhdGEuSGVhbHRoKigxKzEpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBcclxuXHJcbn1cclxuIl19