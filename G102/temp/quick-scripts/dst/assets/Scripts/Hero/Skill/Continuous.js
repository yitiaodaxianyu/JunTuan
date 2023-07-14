
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Hero/Skill/Continuous.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0b2cdW0jIZEaajKLWn3ZBpR', 'Continuous');
// Scripts/Hero/Skill/Continuous.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Continuous = /** @class */ (function (_super) {
    __extends(Continuous, _super);
    function Continuous() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.game_effect_id = GameEffectsManager_1.GameEffectId.Null;
        _this.jishu = 0;
        _this.other_value_1 = 0;
        _this.other_value_2 = 0;
        _this.buff_id = 0;
        _this.is_recycled = false;
        _this.buff_floor_num = 0;
        _this.gong_ji_data = null;
        return _this;
    }
    /**
     *
     * @param totalTime 持续的总时长
     * @param damage 每次触发的真实伤害
     * @param dt
     */
    Continuous.prototype.init = function (data, listen, gjData) {
        this.remain_time = data.remain_time;
        this.damage_num = data.damage_num;
        this.jiange_time = data.jiange_time;
        this.hero_type = data.hero_type;
        this.other_value_1 = data.other_value_1;
        this.other_value_2 = data.other_value_2;
        this.buff_id = data.buff_id;
        this.gong_ji_data = gjData;
        this.is_recycled = false;
        this.addDamageListen(listen);
        this.buff_floor_num = 1;
    };
    Continuous.prototype.refreshData = function (data) {
        this.remain_time = data.remain_time;
        this.damage_num = data.damage_num;
        this.jiange_time = data.jiange_time;
        this.buff_floor_num++;
    };
    Continuous.prototype.addDamageListen = function (listen) {
        this.damage_listen = listen;
    };
    Continuous.prototype.doDamage = function () {
        if (this.damage_listen) {
            var num = this.damage_num;
            if (this.buff_id == EnemyConfig_1.Enemy_DeBuff_Type.LiuXue_RenZhe_Active_Skill) {
                num *= this.buff_floor_num;
            }
            this.damage_listen.doDamage(this.gong_ji_data);
        }
    };
    /**
     * 删除自身，回收至特效管理器
     * @param isSelf 是否自身调用，如果是，则需要触发回调。
     */
    Continuous.prototype.destroySelf = function (isSelf) {
        if (this.is_recycled == false) {
            GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(this.game_effect_id, this.node);
            this.is_recycled = true;
        }
        // if(isSelf && this.damage_listen){
        //     this.damage_listen.end(this.is_recycled);
        // }
        this.damage_listen = null;
    };
    Continuous.prototype.update = function (dt) {
        this.remain_time -= dt;
        if (this.remain_time > 0) {
            this.jishu += dt;
            if (this.jishu >= this.jiange_time) {
                this.jishu = 0;
                this.doDamage();
            }
        }
        else {
            this.destroySelf(true);
        }
    };
    __decorate([
        property({ type: cc.Enum(GameEffectsManager_1.GameEffectId) })
    ], Continuous.prototype, "game_effect_id", void 0);
    Continuous = __decorate([
        ccclass
    ], Continuous);
    return Continuous;
}(cc.Component));
exports.default = Continuous;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcU2tpbGxcXENvbnRpbnVvdXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdURBQTREO0FBQzVELG9FQUFpRjtBQU0zRSxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUF3Qyw4QkFBWTtJQUFwRDtRQUFBLHFFQXFGQztRQWxGRyxvQkFBYyxHQUFjLGlDQUFZLENBQUMsSUFBSSxDQUFDO1FBTzlDLFdBQUssR0FBUSxDQUFDLENBQUM7UUFDZixtQkFBYSxHQUFRLENBQUMsQ0FBQztRQUN2QixtQkFBYSxHQUFRLENBQUMsQ0FBQztRQUN2QixhQUFPLEdBQVEsQ0FBQyxDQUFDO1FBQ2pCLGlCQUFXLEdBQVMsS0FBSyxDQUFDO1FBQzFCLG9CQUFjLEdBQVEsQ0FBQyxDQUFDO1FBQ3hCLGtCQUFZLEdBQVksSUFBSSxDQUFDOztJQXFFakMsQ0FBQztJQXBFRzs7Ozs7T0FLRztJQUNILHlCQUFJLEdBQUosVUFBSyxJQUFvQixFQUFDLE1BQW9CLEVBQUMsTUFBaUI7UUFDNUQsSUFBSSxDQUFDLFdBQVcsR0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxVQUFVLEdBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUNoQyxJQUFJLENBQUMsV0FBVyxHQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDbEMsSUFBSSxDQUFDLFNBQVMsR0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQzlCLElBQUksQ0FBQyxhQUFhLEdBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUN0QyxJQUFJLENBQUMsYUFBYSxHQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDdEMsSUFBSSxDQUFDLE9BQU8sR0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQzFCLElBQUksQ0FBQyxZQUFZLEdBQUMsTUFBTSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxXQUFXLEdBQUMsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLGNBQWMsR0FBQyxDQUFDLENBQUM7SUFFMUIsQ0FBQztJQUVELGdDQUFXLEdBQVgsVUFBWSxJQUFvQjtRQUM1QixJQUFJLENBQUMsV0FBVyxHQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDbEMsSUFBSSxDQUFDLFVBQVUsR0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxXQUFXLEdBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUNsQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVELG9DQUFlLEdBQWYsVUFBZ0IsTUFBb0I7UUFDaEMsSUFBSSxDQUFDLGFBQWEsR0FBQyxNQUFNLENBQUM7SUFDOUIsQ0FBQztJQUVELDZCQUFRLEdBQVI7UUFDSSxJQUFHLElBQUksQ0FBQyxhQUFhLEVBQUM7WUFDbEIsSUFBSSxHQUFHLEdBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztZQUN4QixJQUFHLElBQUksQ0FBQyxPQUFPLElBQUUsK0JBQWlCLENBQUMsMEJBQTBCLEVBQUM7Z0JBQzFELEdBQUcsSUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDO2FBQzVCO1lBQ0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ2xEO0lBQ0wsQ0FBQztJQUNEOzs7T0FHRztJQUNILGdDQUFXLEdBQVgsVUFBWSxNQUFjO1FBQ3RCLElBQUcsSUFBSSxDQUFDLFdBQVcsSUFBRSxLQUFLLEVBQUM7WUFDdkIsdUNBQWtCLENBQUMsV0FBVyxFQUFFLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdEYsSUFBSSxDQUFDLFdBQVcsR0FBQyxJQUFJLENBQUM7U0FDekI7UUFDRCxvQ0FBb0M7UUFDcEMsZ0RBQWdEO1FBQ2hELElBQUk7UUFDSixJQUFJLENBQUMsYUFBYSxHQUFDLElBQUksQ0FBQztJQUM1QixDQUFDO0lBRVMsMkJBQU0sR0FBaEIsVUFBaUIsRUFBVTtRQUN2QixJQUFJLENBQUMsV0FBVyxJQUFFLEVBQUUsQ0FBQztRQUNyQixJQUFHLElBQUksQ0FBQyxXQUFXLEdBQUMsQ0FBQyxFQUFDO1lBQ2xCLElBQUksQ0FBQyxLQUFLLElBQUUsRUFBRSxDQUFDO1lBQ2YsSUFBRyxJQUFJLENBQUMsS0FBSyxJQUFFLElBQUksQ0FBQyxXQUFXLEVBQUM7Z0JBQzVCLElBQUksQ0FBQyxLQUFLLEdBQUMsQ0FBQyxDQUFDO2dCQUNiLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQzthQUNuQjtTQUNKO2FBQUk7WUFDRCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzFCO0lBQ0wsQ0FBQztJQWpGRDtRQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGlDQUFZLENBQUMsRUFBQyxDQUFDO3NEQUNPO0lBSDdCLFVBQVU7UUFEOUIsT0FBTztPQUNhLFVBQVUsQ0FxRjlCO0lBQUQsaUJBQUM7Q0FyRkQsQUFxRkMsQ0FyRnVDLEVBQUUsQ0FBQyxTQUFTLEdBcUZuRDtrQkFyRm9CLFVBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbmVteV9EZUJ1ZmZfVHlwZSB9IGZyb20gXCIuLi8uLi9FbmVteS9FbmVteUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBHYW1lRWZmZWN0SWQsIEdhbWVFZmZlY3RzTWFuYWdlciB9IGZyb20gXCIuLi8uLi9HYW1lL0dhbWVFZmZlY3RzTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBHb25nSmlEYXRhIH0gZnJvbSBcIi4uL0RhdGEvSGVyb0RhdGFcIjtcclxuaW1wb3J0IHsgSGVyb19UeXBlIH0gZnJvbSBcIi4uL0dhbWUvSGVyb0NvbmZpZ1wiO1xyXG5pbXBvcnQgeyBDb250aW51b3VzU2tpbGwsIERhbWFnZUxpc3RlbiB9IGZyb20gXCIuL1NraWxsQ29uZmlnXCI7XHJcblxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250aW51b3VzIGV4dGVuZHMgY2MuQ29tcG9uZW50IGltcGxlbWVudHMgQ29udGludW91c1NraWxsIHtcclxuXHJcbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuRW51bShHYW1lRWZmZWN0SWQpfSlcclxuICAgIGdhbWVfZWZmZWN0X2lkOkdhbWVFZmZlY3RJZD1HYW1lRWZmZWN0SWQuTnVsbDtcclxuXHJcbiAgICByZW1haW5fdGltZTogbnVtYmVyO1xyXG4gICAgZGFtYWdlX251bTogbnVtYmVyO1xyXG4gICAgamlhbmdlX3RpbWU6IG51bWJlcjtcclxuICAgIGhlcm9fdHlwZTpIZXJvX1R5cGU7XHJcbiAgICBkYW1hZ2VfbGlzdGVuOiBEYW1hZ2VMaXN0ZW47XHJcbiAgICBqaXNodTpudW1iZXI9MDtcclxuICAgIG90aGVyX3ZhbHVlXzE6bnVtYmVyPTA7XHJcbiAgICBvdGhlcl92YWx1ZV8yOm51bWJlcj0wO1xyXG4gICAgYnVmZl9pZDpudW1iZXI9MDtcclxuICAgIGlzX3JlY3ljbGVkOmJvb2xlYW49ZmFsc2U7XHJcbiAgICBidWZmX2Zsb29yX251bTpudW1iZXI9MDtcclxuICAgIGdvbmdfamlfZGF0YTpHb25nSmlEYXRhPW51bGw7XHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHRvdGFsVGltZSDmjIHnu63nmoTmgLvml7bplb9cclxuICAgICAqIEBwYXJhbSBkYW1hZ2Ug5q+P5qyh6Kem5Y+R55qE55yf5a6e5Lyk5a6zXHJcbiAgICAgKiBAcGFyYW0gZHQgXHJcbiAgICAgKi9cclxuICAgIGluaXQoZGF0YTpDb250aW51b3VzU2tpbGwsbGlzdGVuOiBEYW1hZ2VMaXN0ZW4sZ2pEYXRhOkdvbmdKaURhdGEpe1xyXG4gICAgICAgIHRoaXMucmVtYWluX3RpbWU9ZGF0YS5yZW1haW5fdGltZTtcclxuICAgICAgICB0aGlzLmRhbWFnZV9udW09ZGF0YS5kYW1hZ2VfbnVtO1xyXG4gICAgICAgIHRoaXMuamlhbmdlX3RpbWU9ZGF0YS5qaWFuZ2VfdGltZTtcclxuICAgICAgICB0aGlzLmhlcm9fdHlwZT1kYXRhLmhlcm9fdHlwZTtcclxuICAgICAgICB0aGlzLm90aGVyX3ZhbHVlXzE9ZGF0YS5vdGhlcl92YWx1ZV8xO1xyXG4gICAgICAgIHRoaXMub3RoZXJfdmFsdWVfMj1kYXRhLm90aGVyX3ZhbHVlXzI7XHJcbiAgICAgICAgdGhpcy5idWZmX2lkPWRhdGEuYnVmZl9pZDtcclxuICAgICAgICB0aGlzLmdvbmdfamlfZGF0YT1nakRhdGE7XHJcbiAgICAgICAgdGhpcy5pc19yZWN5Y2xlZD1mYWxzZTtcclxuICAgICAgICB0aGlzLmFkZERhbWFnZUxpc3RlbihsaXN0ZW4pO1xyXG4gICAgICAgIHRoaXMuYnVmZl9mbG9vcl9udW09MTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICByZWZyZXNoRGF0YShkYXRhOkNvbnRpbnVvdXNTa2lsbCl7XHJcbiAgICAgICAgdGhpcy5yZW1haW5fdGltZT1kYXRhLnJlbWFpbl90aW1lO1xyXG4gICAgICAgIHRoaXMuZGFtYWdlX251bT1kYXRhLmRhbWFnZV9udW07XHJcbiAgICAgICAgdGhpcy5qaWFuZ2VfdGltZT1kYXRhLmppYW5nZV90aW1lO1xyXG4gICAgICAgIHRoaXMuYnVmZl9mbG9vcl9udW0rKztcclxuICAgIH1cclxuXHJcbiAgICBhZGREYW1hZ2VMaXN0ZW4obGlzdGVuOiBEYW1hZ2VMaXN0ZW4pIHtcclxuICAgICAgICB0aGlzLmRhbWFnZV9saXN0ZW49bGlzdGVuO1xyXG4gICAgfVxyXG5cclxuICAgIGRvRGFtYWdlKCl7XHJcbiAgICAgICAgaWYodGhpcy5kYW1hZ2VfbGlzdGVuKXtcclxuICAgICAgICAgICAgbGV0IG51bT10aGlzLmRhbWFnZV9udW07XHJcbiAgICAgICAgICAgIGlmKHRoaXMuYnVmZl9pZD09RW5lbXlfRGVCdWZmX1R5cGUuTGl1WHVlX1JlblpoZV9BY3RpdmVfU2tpbGwpe1xyXG4gICAgICAgICAgICAgICAgbnVtKj10aGlzLmJ1ZmZfZmxvb3JfbnVtO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuZGFtYWdlX2xpc3Rlbi5kb0RhbWFnZSh0aGlzLmdvbmdfamlfZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDliKDpmaToh6rouqvvvIzlm57mlLboh7PnibnmlYjnrqHnkIblmahcclxuICAgICAqIEBwYXJhbSBpc1NlbGYg5piv5ZCm6Ieq6Lqr6LCD55So77yM5aaC5p6c5piv77yM5YiZ6ZyA6KaB6Kem5Y+R5Zue6LCD44CCXHJcbiAgICAgKi9cclxuICAgIGRlc3Ryb3lTZWxmKGlzU2VsZjpib29sZWFuKXtcclxuICAgICAgICBpZih0aGlzLmlzX3JlY3ljbGVkPT1mYWxzZSl7XHJcbiAgICAgICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmRlc3Ryb3lHYW1lRWZmZWN0QnlJZCh0aGlzLmdhbWVfZWZmZWN0X2lkLHRoaXMubm9kZSk7XHJcbiAgICAgICAgICAgIHRoaXMuaXNfcmVjeWNsZWQ9dHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gaWYoaXNTZWxmICYmIHRoaXMuZGFtYWdlX2xpc3Rlbil7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuZGFtYWdlX2xpc3Rlbi5lbmQodGhpcy5pc19yZWN5Y2xlZCk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIHRoaXMuZGFtYWdlX2xpc3Rlbj1udWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCB1cGRhdGUoZHQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucmVtYWluX3RpbWUtPWR0O1xyXG4gICAgICAgIGlmKHRoaXMucmVtYWluX3RpbWU+MCl7XHJcbiAgICAgICAgICAgIHRoaXMuamlzaHUrPWR0O1xyXG4gICAgICAgICAgICBpZih0aGlzLmppc2h1Pj10aGlzLmppYW5nZV90aW1lKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuamlzaHU9MDtcclxuICAgICAgICAgICAgICAgIHRoaXMuZG9EYW1hZ2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3lTZWxmKHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=