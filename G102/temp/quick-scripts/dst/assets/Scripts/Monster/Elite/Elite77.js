
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Monster/Elite/Elite77.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '62ca7ZMCtJMpZccRAOd4ywe', 'Elite77');
// Scripts/Monster/Elite/Elite77.ts

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
var Elite61 = /** @class */ (function (_super) {
    __extends(Elite61, _super);
    function Elite61() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Elite61.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        _super.prototype.addMonsterNormalInited.call(this, this.onMonsterNormalInited);
    };
    Elite61.prototype.onMonsterNormalInited = function () {
        //最大生命值的技能
        switch (this.monster_id) {
            case 20771:
                {
                    this.cur_hp = this.max_hp = this.monster_data.Health * (1 + 1);
                }
                break;
            case 20772:
                {
                    this.cur_hp = this.max_hp = this.monster_data.Health * (1 + 1.5);
                }
                break;
        }
    };
    Elite61 = __decorate([
        ccclass
    ], Elite61);
    return Elite61;
}(MonsterNewNormal_1.default));
exports.default = Elite61;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTW9uc3RlclxcRWxpdGVcXEVsaXRlNzcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esd0RBQW1EO0FBRTdDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXFDLDJCQUFnQjtJQUFyRDs7SUF1QkEsQ0FBQztJQXJCYSx3QkFBTSxHQUFoQjtRQUNJLGlCQUFNLE1BQU0sV0FBRSxDQUFDO1FBQ2YsaUJBQU0sc0JBQXNCLFlBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUVELHVDQUFxQixHQUFyQjtRQUNJLFVBQVU7UUFDVixRQUFPLElBQUksQ0FBQyxVQUFVLEVBQUM7WUFDbkIsS0FBSyxLQUFLO2dCQUFDO29CQUNQLElBQUksQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFDLE1BQU0sR0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDMUQ7Z0JBQUEsTUFBTTtZQUNQLEtBQUssS0FBSztnQkFBQztvQkFDUCxJQUFJLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLEdBQUMsR0FBRyxDQUFDLENBQUM7aUJBQzVEO2dCQUFBLE1BQU07U0FDVjtJQUVMLENBQUM7SUFsQmdCLE9BQU87UUFEM0IsT0FBTztPQUNhLE9BQU8sQ0F1QjNCO0lBQUQsY0FBQztDQXZCRCxBQXVCQyxDQXZCb0MsMEJBQWdCLEdBdUJwRDtrQkF2Qm9CLE9BQU8iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IE1vbnN0ZXJOZXdOb3JtYWwgZnJvbSBcIi4uL01vbnN0ZXJOZXdOb3JtYWxcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWxpdGU2MSBleHRlbmRzIE1vbnN0ZXJOZXdOb3JtYWwge1xyXG5cclxuICAgIHByb3RlY3RlZCBvbkxvYWQoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIub25Mb2FkKCk7XHJcbiAgICAgICAgc3VwZXIuYWRkTW9uc3Rlck5vcm1hbEluaXRlZCh0aGlzLm9uTW9uc3Rlck5vcm1hbEluaXRlZCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25Nb25zdGVyTm9ybWFsSW5pdGVkICgpIHtcclxuICAgICAgICAvL+acgOWkp+eUn+WRveWAvOeahOaKgOiDvVxyXG4gICAgICAgIHN3aXRjaCh0aGlzLm1vbnN0ZXJfaWQpe1xyXG4gICAgICAgICAgICBjYXNlIDIwNzcxOntcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VyX2hwPXRoaXMubWF4X2hwPXRoaXMubW9uc3Rlcl9kYXRhLkhlYWx0aCooMSsxKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDIwNzcyOntcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VyX2hwPXRoaXMubWF4X2hwPXRoaXMubW9uc3Rlcl9kYXRhLkhlYWx0aCooMSsxLjUpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBcclxuXHJcbn1cclxuIl19