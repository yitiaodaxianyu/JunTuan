
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Monster/Elite/Block75.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '41d5bNOIR1O6ICeK/v7BH80', 'Block75');
// Scripts/Monster/Elite/Block75.ts

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
var Constants_1 = require("../../Constants");
var GameManager_1 = require("../../GameManager");
var GongJi_1 = require("../../Hero/Game/GongJi");
var Monster_1 = require("../Monster");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Block75 = /** @class */ (function (_super) {
    __extends(Block75, _super);
    function Block75() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.monster_ts = null;
        return _this;
    }
    ////--------------------------------------碰撞开始----------------------------------------------------
    Block75.prototype.onCollisionEnter = function (other, self) {
        var gm = GameManager_1.default.getInstance();
        if (gm.cur_game_state != Constants_1.GameState.Game_Playing)
            return;
        var group = other.node.group;
        switch (group) {
            case 'gongji':
                {
                    var gjData = other.node.getComponent(GongJi_1.default);
                    //本次伤害直接减伤
                    if (gjData) {
                        this.monster_ts.jianshang_rate += this.monster_ts.skill_data.getSkillValue1(1);
                        this.monster_ts.beFlashInjured(gjData.gongji_data);
                        this.monster_ts.jianshang_rate -= this.monster_ts.skill_data.getSkillValue1(1);
                        //直接销毁
                        gjData.node.removeFromParent();
                    }
                }
                break;
        }
    };
    __decorate([
        property(Monster_1.default)
    ], Block75.prototype, "monster_ts", void 0);
    Block75 = __decorate([
        ccclass
    ], Block75);
    return Block75;
}(cc.CircleCollider));
exports.default = Block75;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTW9uc3RlclxcRWxpdGVcXEJsb2NrNzUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQTRDO0FBQzVDLGlEQUE0QztBQUM1QyxpREFBNEM7QUFDNUMsc0NBQWlDO0FBRzNCLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXFDLDJCQUFpQjtJQUF0RDtRQUFBLHFFQTJCQztRQXhCRyxnQkFBVSxHQUFTLElBQUksQ0FBQzs7SUF3QjVCLENBQUM7SUFyQkcsa0dBQWtHO0lBQ2xHLGtDQUFnQixHQUFoQixVQUFpQixLQUFpQixFQUFDLElBQWdCO1FBQy9DLElBQUksRUFBRSxHQUFDLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDakMsSUFBRyxFQUFFLENBQUMsY0FBYyxJQUFFLHFCQUFTLENBQUMsWUFBWTtZQUN4QyxPQUFPO1FBQ1gsSUFBSSxLQUFLLEdBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDM0IsUUFBTyxLQUFLLEVBQUM7WUFDVCxLQUFLLFFBQVE7Z0JBQUM7b0JBQ1YsSUFBSSxNQUFNLEdBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQU0sQ0FBQyxDQUFDO29CQUMzQyxVQUFVO29CQUNWLElBQUcsTUFBTSxFQUFDO3dCQUNOLElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxJQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDN0UsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO3dCQUNuRCxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsSUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzdFLE1BQU07d0JBQ04sTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO3FCQUNsQztpQkFDSjtnQkFBQSxNQUFNO1NBQ1Y7SUFDTCxDQUFDO0lBdEJEO1FBREMsUUFBUSxDQUFDLGlCQUFPLENBQUM7K0NBQ007SUFIUCxPQUFPO1FBRDNCLE9BQU87T0FDYSxPQUFPLENBMkIzQjtJQUFELGNBQUM7Q0EzQkQsQUEyQkMsQ0EzQm9DLEVBQUUsQ0FBQyxjQUFjLEdBMkJyRDtrQkEzQm9CLE9BQU8iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHYW1lU3RhdGUgfSBmcm9tIFwiLi4vLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IEdvbmdKaSBmcm9tIFwiLi4vLi4vSGVyby9HYW1lL0dvbmdKaVwiO1xyXG5pbXBvcnQgTW9uc3RlciBmcm9tIFwiLi4vTW9uc3RlclwiO1xyXG5cclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmxvY2s3NSBleHRlbmRzIGNjLkNpcmNsZUNvbGxpZGVyIHtcclxuICAgIFxyXG4gICAgQHByb3BlcnR5KE1vbnN0ZXIpXHJcbiAgICBtb25zdGVyX3RzOk1vbnN0ZXI9bnVsbDtcclxuXHJcblxyXG4gICAgLy8vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t56Kw5pKe5byA5aeLLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgb25Db2xsaXNpb25FbnRlcihvdGhlcjpjYy5Db2xsaWRlcixzZWxmOmNjLkNvbGxpZGVyKSB7XHJcbiAgICAgICAgbGV0IGdtPUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgaWYoZ20uY3VyX2dhbWVfc3RhdGUhPUdhbWVTdGF0ZS5HYW1lX1BsYXlpbmcpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBsZXQgZ3JvdXA9b3RoZXIubm9kZS5ncm91cDtcclxuICAgICAgICBzd2l0Y2goZ3JvdXApe1xyXG4gICAgICAgICAgICBjYXNlICdnb25namknOntcclxuICAgICAgICAgICAgICAgIGxldCBnakRhdGE9b3RoZXIubm9kZS5nZXRDb21wb25lbnQoR29uZ0ppKTtcclxuICAgICAgICAgICAgICAgIC8v5pys5qyh5Lyk5a6z55u05o6l5YeP5LykXHJcbiAgICAgICAgICAgICAgICBpZihnakRhdGEpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW9uc3Rlcl90cy5qaWFuc2hhbmdfcmF0ZSs9dGhpcy5tb25zdGVyX3RzLnNraWxsX2RhdGEuZ2V0U2tpbGxWYWx1ZTEoMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb25zdGVyX3RzLmJlRmxhc2hJbmp1cmVkKGdqRGF0YS5nb25namlfZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb25zdGVyX3RzLmppYW5zaGFuZ19yYXRlLT10aGlzLm1vbnN0ZXJfdHMuc2tpbGxfZGF0YS5nZXRTa2lsbFZhbHVlMSgxKTtcclxuICAgICAgICAgICAgICAgICAgICAvL+ebtOaOpemUgOavgVxyXG4gICAgICAgICAgICAgICAgICAgIGdqRGF0YS5ub2RlLnJlbW92ZUZyb21QYXJlbnQoKTtcclxuICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==