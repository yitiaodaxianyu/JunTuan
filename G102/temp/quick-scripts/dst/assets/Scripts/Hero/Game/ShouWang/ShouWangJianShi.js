
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Hero/Game/ShouWang/ShouWangJianShi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '260f4TkqS5Ej7yfCmFaCfyx', 'ShouWangJianShi');
// Scripts/Hero/Game/ShouWang/ShouWangJianShi.ts

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
var Bullect_1 = require("../Bullect");
var HeroConfig_1 = require("../HeroConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ShouWangJianShi = /** @class */ (function (_super) {
    __extends(ShouWangJianShi, _super);
    function ShouWangJianShi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.jianshi_type = HeroConfig_1.JianShi_Type.putong;
        /**穿透数量 */
        _this.penetration_num = 0;
        /**原来的增伤数值 */
        _this.old_skill_rate = 0;
        _this.hero_lvl = 0;
        return _this;
    }
    ShouWangJianShi.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        _super.prototype.addCollisionMonsterListen.call(this, this.onCollisionMonster);
        _super.prototype.addInitFinishedListen.call(this, this.onInitFinished);
    };
    ShouWangJianShi.prototype.onInitFinished = function () {
        this.penetration_num = 0;
        this.old_skill_rate = this.gongji_data.skill_damage_rate;
    };
    ////--------------------------------------碰撞开始----------------------------------------------------
    ShouWangJianShi.prototype.onCollisionMonster = function (monsterTs) {
        if (monsterTs) {
            switch (this.jianshi_type) {
                case HeroConfig_1.JianShi_Type.putong:
                    {
                        var data = monsterTs.beFlashInjured(this.gongji_data);
                        if (data.getDamageNum() > 0) {
                            //本次攻击有效
                            var node = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.sheshou_jianshi_att_hit, this.getHeadPos());
                            //node.scale=monsterTs.getSheShouAttackScale();                            
                        }
                        this.is_att = true;
                        this.destroySelf();
                    }
                    break;
                case HeroConfig_1.JianShi_Type.jineng:
                    {
                        //被动技能1的箭矢，可以穿透，并且首个目标伤害增加
                        //游戏中自身等级个数决定穿透几个
                        if (this.penetration_num >= (3 + this.hero_lvl)) {
                            this.destroySelf();
                        }
                        if (this.penetration_num == 0) {
                            this.gongji_data.skill_damage_rate = 1;
                        }
                        else {
                            this.gongji_data.skill_damage_rate = this.old_skill_rate;
                        }
                        this.is_att = false;
                        this.penetration_num++;
                        var data = monsterTs.beFlashInjured(this.gongji_data);
                        if (data.getDamageNum() > 0) {
                            //本次攻击有效
                            var node = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.shou_wang_jianshi_skill1_hit, this.getHeadPos());
                            //node.scale=monsterTs.getSheShouAttackScale();
                        }
                    }
                    break;
            }
        }
    };
    __decorate([
        property({ type: cc.Enum(HeroConfig_1.JianShi_Type) })
    ], ShouWangJianShi.prototype, "jianshi_type", void 0);
    ShouWangJianShi = __decorate([
        ccclass
    ], ShouWangJianShi);
    return ShouWangJianShi;
}(Bullect_1.default));
exports.default = ShouWangJianShi;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcR2FtZVxcU2hvdVdhbmdcXFNob3VXYW5nSmlhblNoaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSx1RUFBb0Y7QUFHcEYsc0NBQWlDO0FBQ2pDLDRDQUF3RDtBQUVsRCxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUE2QyxtQ0FBTztJQUFwRDtRQUFBLHFFQThEQztRQTNERyxrQkFBWSxHQUFpQix5QkFBWSxDQUFDLE1BQU0sQ0FBQztRQUVqRCxVQUFVO1FBQ1YscUJBQWUsR0FBVyxDQUFDLENBQUM7UUFDNUIsYUFBYTtRQUNiLG9CQUFjLEdBQVcsQ0FBQyxDQUFDO1FBRTNCLGNBQVEsR0FBVyxDQUFDLENBQUM7O0lBb0R6QixDQUFDO0lBbERHLGdDQUFNLEdBQU47UUFDSSxpQkFBTSxNQUFNLFdBQUUsQ0FBQztRQUNmLGlCQUFNLHlCQUF5QixZQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ3pELGlCQUFNLHFCQUFxQixZQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRUQsd0NBQWMsR0FBZDtRQUNJLElBQUksQ0FBQyxlQUFlLEdBQUcsQ0FBQyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQztJQUM3RCxDQUFDO0lBRUQsa0dBQWtHO0lBQ2xHLDRDQUFrQixHQUFsQixVQUFtQixTQUFrQjtRQUNqQyxJQUFJLFNBQVMsRUFBRTtZQUNYLFFBQVEsSUFBSSxDQUFDLFlBQVksRUFBRTtnQkFDdkIsS0FBSyx5QkFBWSxDQUFDLE1BQU07b0JBQUU7d0JBQ3RCLElBQUksSUFBSSxHQUFHLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO3dCQUN0RCxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUUsR0FBRyxDQUFDLEVBQUU7NEJBQ3pCLFFBQVE7NEJBQ1IsSUFBSSxJQUFJLEdBQUcsdUNBQWtCLENBQUMsV0FBVyxFQUFFLENBQUMsb0JBQW9CLENBQUMsaUNBQVksQ0FBQyx1QkFBdUIsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQzs0QkFDMUgsMkVBQTJFO3lCQUM5RTt3QkFDRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQzt3QkFDbkIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO3FCQUN0QjtvQkFBQyxNQUFNO2dCQUNSLEtBQUsseUJBQVksQ0FBQyxNQUFNO29CQUFFO3dCQUN0QiwwQkFBMEI7d0JBQzFCLGlCQUFpQjt3QkFDakIsSUFBSSxJQUFJLENBQUMsZUFBZSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRTs0QkFDN0MsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO3lCQUN0Qjt3QkFDRCxJQUFJLElBQUksQ0FBQyxlQUFlLElBQUksQ0FBQyxFQUFFOzRCQUMzQixJQUFJLENBQUMsV0FBVyxDQUFDLGlCQUFpQixHQUFHLENBQUMsQ0FBQzt5QkFDMUM7NkJBQU07NEJBQ0gsSUFBSSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO3lCQUM1RDt3QkFDRCxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQzt3QkFDcEIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO3dCQUN2QixJQUFJLElBQUksR0FBRyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQzt3QkFDdEQsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFLEdBQUcsQ0FBQyxFQUFFOzRCQUN6QixRQUFROzRCQUNSLElBQUksSUFBSSxHQUFHLHVDQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDLG9CQUFvQixDQUFDLGlDQUFZLENBQUMsNEJBQTRCLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7NEJBQy9ILCtDQUErQzt5QkFDbEQ7cUJBQ0o7b0JBQUMsTUFBTTthQUVYO1NBRUo7SUFDTCxDQUFDO0lBMUREO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMseUJBQVksQ0FBQyxFQUFFLENBQUM7eURBQ087SUFIaEMsZUFBZTtRQURuQyxPQUFPO09BQ2EsZUFBZSxDQThEbkM7SUFBRCxzQkFBQztDQTlERCxBQThEQyxDQTlENEMsaUJBQU8sR0E4RG5EO2tCQTlEb0IsZUFBZSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgeyBHYW1lRWZmZWN0c01hbmFnZXIsIEdhbWVFZmZlY3RJZCB9IGZyb20gXCIuLi8uLi8uLi9HYW1lL0dhbWVFZmZlY3RzTWFuYWdlclwiO1xyXG5pbXBvcnQgTW9uc3RlciBmcm9tIFwiLi4vLi4vLi4vTW9uc3Rlci9Nb25zdGVyXCI7XHJcbmltcG9ydCB7IEZlZWRCYWNrVHlwZSB9IGZyb20gXCIuLi8uLi8uLi9Nb25zdGVyL01vbnN0ZXJEYXRhXCI7XHJcbmltcG9ydCBCdWxsZWN0IGZyb20gXCIuLi9CdWxsZWN0XCI7XHJcbmltcG9ydCB7IEppYW5TaGlfVHlwZSwgU2tpbGxUeXBlIH0gZnJvbSBcIi4uL0hlcm9Db25maWdcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaG91V2FuZ0ppYW5TaGkgZXh0ZW5kcyBCdWxsZWN0IHtcclxuXHJcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5FbnVtKEppYW5TaGlfVHlwZSkgfSlcclxuICAgIGppYW5zaGlfdHlwZTogSmlhblNoaV9UeXBlID0gSmlhblNoaV9UeXBlLnB1dG9uZztcclxuXHJcbiAgICAvKirnqb/pgI/mlbDph48gKi9cclxuICAgIHBlbmV0cmF0aW9uX251bTogbnVtYmVyID0gMDtcclxuICAgIC8qKuWOn+adpeeahOWinuS8pOaVsOWAvCAqL1xyXG4gICAgb2xkX3NraWxsX3JhdGU6IG51bWJlciA9IDA7XHJcblxyXG4gICAgaGVyb19sdmw6IG51bWJlciA9IDA7XHJcblxyXG4gICAgb25Mb2FkKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xyXG4gICAgICAgIHN1cGVyLmFkZENvbGxpc2lvbk1vbnN0ZXJMaXN0ZW4odGhpcy5vbkNvbGxpc2lvbk1vbnN0ZXIpO1xyXG4gICAgICAgIHN1cGVyLmFkZEluaXRGaW5pc2hlZExpc3Rlbih0aGlzLm9uSW5pdEZpbmlzaGVkKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkluaXRGaW5pc2hlZCgpIHtcclxuICAgICAgICB0aGlzLnBlbmV0cmF0aW9uX251bSA9IDA7XHJcbiAgICAgICAgdGhpcy5vbGRfc2tpbGxfcmF0ZSA9IHRoaXMuZ29uZ2ppX2RhdGEuc2tpbGxfZGFtYWdlX3JhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgLy8vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t56Kw5pKe5byA5aeLLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgb25Db2xsaXNpb25Nb25zdGVyKG1vbnN0ZXJUczogTW9uc3Rlcikge1xyXG4gICAgICAgIGlmIChtb25zdGVyVHMpIHtcclxuICAgICAgICAgICAgc3dpdGNoICh0aGlzLmppYW5zaGlfdHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBKaWFuU2hpX1R5cGUucHV0b25nOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGEgPSBtb25zdGVyVHMuYmVGbGFzaEluanVyZWQodGhpcy5nb25namlfZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuZ2V0RGFtYWdlTnVtKCkgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v5pys5qyh5pS75Ye75pyJ5pWIXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBub2RlID0gR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLnNoZXNob3VfamlhbnNoaV9hdHRfaGl0LCB0aGlzLmdldEhlYWRQb3MoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbm9kZS5zY2FsZT1tb25zdGVyVHMuZ2V0U2hlU2hvdUF0dGFja1NjYWxlKCk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzX2F0dCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXN0cm95U2VsZigpO1xyXG4gICAgICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgSmlhblNoaV9UeXBlLmppbmVuZzoge1xyXG4gICAgICAgICAgICAgICAgICAgIC8v6KKr5Yqo5oqA6IO9MeeahOeureefou+8jOWPr+S7peepv+mAj++8jOW5tuS4lOmmluS4quebruagh+S8pOWus+WinuWKoFxyXG4gICAgICAgICAgICAgICAgICAgIC8v5ri45oiP5Lit6Ieq6Lqr562J57qn5Liq5pWw5Yaz5a6a56m/6YCP5Yeg5LiqXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucGVuZXRyYXRpb25fbnVtID49ICgzICsgdGhpcy5oZXJvX2x2bCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXN0cm95U2VsZigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wZW5ldHJhdGlvbl9udW0gPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdvbmdqaV9kYXRhLnNraWxsX2RhbWFnZV9yYXRlID0gMTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdvbmdqaV9kYXRhLnNraWxsX2RhbWFnZV9yYXRlID0gdGhpcy5vbGRfc2tpbGxfcmF0ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc19hdHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBlbmV0cmF0aW9uX251bSsrO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkYXRhID0gbW9uc3RlclRzLmJlRmxhc2hJbmp1cmVkKHRoaXMuZ29uZ2ppX2RhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmdldERhbWFnZU51bSgpID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+acrOasoeaUu+WHu+acieaViFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbm9kZSA9IEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5zaG91X3dhbmdfamlhbnNoaV9za2lsbDFfaGl0LCB0aGlzLmdldEhlYWRQb3MoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbm9kZS5zY2FsZT1tb25zdGVyVHMuZ2V0U2hlU2hvdUF0dGFja1NjYWxlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBicmVhaztcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==