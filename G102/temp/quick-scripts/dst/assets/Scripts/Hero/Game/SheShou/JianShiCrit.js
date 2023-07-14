
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Hero/Game/SheShou/JianShiCrit.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c617196j3pHe5HEiYej045D', 'JianShiCrit');
// Scripts/Hero/Game/SheShou/JianShiCrit.ts

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
var Constants_1 = require("../../../Constants");
var GameEffectsManager_1 = require("../../../Game/GameEffectsManager");
var GameManager_1 = require("../../../GameManager");
var Monster_1 = require("../../../Monster/Monster");
var GongJi_1 = require("../GongJi");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var JianShiCrit = /** @class */ (function (_super) {
    __extends(JianShiCrit, _super);
    function JianShiCrit() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.game_effect_id = GameEffectsManager_1.GameEffectId.sheshou_attack_ctrl_hit;
        return _this;
    }
    JianShiCrit.prototype.init = function (id, gjData) {
        _super.prototype.initData.call(this, gjData);
        this.game_effect_id = id;
    };
    ////--------------------------------------碰撞开始----------------------------------------------------
    JianShiCrit.prototype.onCollisionEnter = function (other, self) {
        var gm = GameManager_1.default.getInstance();
        if (gm.cur_game_state == Constants_1.GameState.Game_Lose)
            return;
        var group = other.node.group;
        switch (group) {
            case 'enemy':
                {
                    var monsterTs = other.node.getComponent(Monster_1.default);
                    if (monsterTs) {
                        var data = monsterTs.beFlashInjured(this.gongji_data);
                        if (data.getDamageNum() > 0) {
                            //本次攻击有效
                            var node = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.sheshou_jianshi_att_hit, monsterTs.getJuJiPos());
                            //node.scale=monsterTs.getSheShouAttackScale();
                        }
                    }
                }
                break;
        }
    };
    JianShiCrit = __decorate([
        ccclass
    ], JianShiCrit);
    return JianShiCrit;
}(GongJi_1.default));
exports.default = JianShiCrit;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcR2FtZVxcU2hlU2hvdVxcSmlhblNoaUNyaXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsZ0RBQStDO0FBQy9DLHVFQUFvRjtBQUNwRixvREFBK0M7QUFDL0Msb0RBQStDO0FBRS9DLG9DQUErQjtBQUd6QixJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUF5QywrQkFBTTtJQUEvQztRQUFBLHFFQTZCQztRQTNCRyxvQkFBYyxHQUFjLGlDQUFZLENBQUMsdUJBQXVCLENBQUM7O0lBMkJyRSxDQUFDO0lBekJHLDBCQUFJLEdBQUosVUFBSyxFQUFlLEVBQUMsTUFBaUI7UUFDbEMsaUJBQU0sUUFBUSxZQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxjQUFjLEdBQUMsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCxrR0FBa0c7SUFDbEcsc0NBQWdCLEdBQWhCLFVBQWlCLEtBQWlCLEVBQUMsSUFBZ0I7UUFDL0MsSUFBSSxFQUFFLEdBQUMscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNqQyxJQUFHLEVBQUUsQ0FBQyxjQUFjLElBQUUscUJBQVMsQ0FBQyxTQUFTO1lBQ3JDLE9BQU87UUFDWCxJQUFJLEtBQUssR0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUMzQixRQUFPLEtBQUssRUFBQztZQUNULEtBQUssT0FBTztnQkFBQztvQkFDVCxJQUFJLFNBQVMsR0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxpQkFBTyxDQUFDLENBQUM7b0JBQy9DLElBQUcsU0FBUyxFQUFDO3dCQUNULElBQUksSUFBSSxHQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO3dCQUNwRCxJQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsR0FBQyxDQUFDLEVBQUM7NEJBQ3JCLFFBQVE7NEJBQ1IsSUFBSSxJQUFJLEdBQUMsdUNBQWtCLENBQUMsV0FBVyxFQUFFLENBQUMsb0JBQW9CLENBQUMsaUNBQVksQ0FBQyx1QkFBdUIsRUFBQyxTQUFTLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQzs0QkFDNUgsK0NBQStDO3lCQUNsRDtxQkFDSjtpQkFDSjtnQkFBQSxNQUFNO1NBQ1Y7SUFDTCxDQUFDO0lBNUJnQixXQUFXO1FBRC9CLE9BQU87T0FDYSxXQUFXLENBNkIvQjtJQUFELGtCQUFDO0NBN0JELEFBNkJDLENBN0J3QyxnQkFBTSxHQTZCOUM7a0JBN0JvQixXQUFXIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7IEdhbWVTdGF0ZSB9IGZyb20gXCIuLi8uLi8uLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgR2FtZUVmZmVjdElkLCBHYW1lRWZmZWN0c01hbmFnZXIgfSBmcm9tIFwiLi4vLi4vLi4vR2FtZS9HYW1lRWZmZWN0c01hbmFnZXJcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi8uLi8uLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgTW9uc3RlciBmcm9tIFwiLi4vLi4vLi4vTW9uc3Rlci9Nb25zdGVyXCI7XHJcbmltcG9ydCB7IEdvbmdKaURhdGEgfSBmcm9tIFwiLi4vLi4vRGF0YS9IZXJvRGF0YVwiO1xyXG5pbXBvcnQgR29uZ0ppIGZyb20gXCIuLi9Hb25nSmlcIjtcclxuXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEppYW5TaGlDcml0IGV4dGVuZHMgR29uZ0ppIHtcclxuXHJcbiAgICBnYW1lX2VmZmVjdF9pZDpHYW1lRWZmZWN0SWQ9R2FtZUVmZmVjdElkLnNoZXNob3VfYXR0YWNrX2N0cmxfaGl0O1xyXG5cclxuICAgIGluaXQoaWQ6R2FtZUVmZmVjdElkLGdqRGF0YTpHb25nSmlEYXRhKXtcclxuICAgICAgICBzdXBlci5pbml0RGF0YShnakRhdGEpO1xyXG4gICAgICAgIHRoaXMuZ2FtZV9lZmZlY3RfaWQ9aWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy8vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t56Kw5pKe5byA5aeLLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgb25Db2xsaXNpb25FbnRlcihvdGhlcjpjYy5Db2xsaWRlcixzZWxmOmNjLkNvbGxpZGVyKSB7XHJcbiAgICAgICAgbGV0IGdtPUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCk7ICAgICAgICBcclxuICAgICAgICBpZihnbS5jdXJfZ2FtZV9zdGF0ZT09R2FtZVN0YXRlLkdhbWVfTG9zZSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGxldCBncm91cD1vdGhlci5ub2RlLmdyb3VwO1xyXG4gICAgICAgIHN3aXRjaChncm91cCl7XHJcbiAgICAgICAgICAgIGNhc2UgJ2VuZW15Jzp7XHJcbiAgICAgICAgICAgICAgICBsZXQgbW9uc3RlclRzPW90aGVyLm5vZGUuZ2V0Q29tcG9uZW50KE1vbnN0ZXIpO1xyXG4gICAgICAgICAgICAgICAgaWYobW9uc3RlclRzKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YT1tb25zdGVyVHMuYmVGbGFzaEluanVyZWQodGhpcy5nb25namlfZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZGF0YS5nZXREYW1hZ2VOdW0oKT4wKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/mnKzmrKHmlLvlh7vmnInmlYhcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5vZGU9R2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLnNoZXNob3VfamlhbnNoaV9hdHRfaGl0LG1vbnN0ZXJUcy5nZXRKdUppUG9zKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL25vZGUuc2NhbGU9bW9uc3RlclRzLmdldFNoZVNob3VBdHRhY2tTY2FsZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWJyZWFrOyAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==