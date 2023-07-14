
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Hero/Game/DeLuYi/ManTeng.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b7513VQGa9DVIWtmbBrFSlF', 'ManTeng');
// Scripts/Hero/Game/DeLuYi/ManTeng.ts

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
var ManTeng = /** @class */ (function (_super) {
    __extends(ManTeng, _super);
    function ManTeng() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ManTeng.prototype.init = function (gjData) {
        this.initData(gjData);
    };
    ManTeng.prototype.onCollisionEnter = function (other, self) {
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
                            GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.deluyi_att_hit, monsterTs.getJuJiPos());
                            //流血效果
                            // if(this.gongji_data.hero_data.hero_info.exclusive_equip_level>0){
                            //     let rate=this.gongji_data.hero_data.ExclusiveWeaponSkillValue_1;
                            //     if(rate&&Math.random()<rate){
                            //         if(!data.is_die){
                            //             // monsterTs.addDeBuff(Enemy_DeBuff_Type.LiuXue_WuNv_Ex_Skill,{
                            //             //     remain_time:this.gongji_data.hero_data.ExclusiveWeaponSkillValue_2,
                            //             //     damage_num: this.gongji_data.hero_data.total_attack*0.1,
                            //             //     jiange_time: 1,
                            //             //     hero_type: this.gongji_data.hero_type,
                            //             // },this.gongji_data);
                            //             // let buffData=new BuffData();
                            //             // buffData.buff_id=BuffId.Hero_FaShi_EX_LIUXUE;
                            //             // buffData.buff_type=BuffType.Normal;
                            //             // buffData.buff_value=[this.gongji_data.hero_data.total_attack*0.5];
                            //             // buffData.remain_time=this.gongji_data.hero_data.ExclusiveWeaponSkillValue_2;
                            //             // buffData.game_effect_id=GameEffectId.monster_zhongdu;
                            //             // buffData.damage_jiange_time=1;
                            //             // monsterTs.addDeBuff(buffData,this.gongji_data);
                            //         }
                            //     }
                            // }                        
                        }
                    }
                }
                break;
        }
    };
    ManTeng = __decorate([
        ccclass
    ], ManTeng);
    return ManTeng;
}(GongJi_1.default));
exports.default = ManTeng;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcR2FtZVxcRGVMdVlpXFxNYW5UZW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLGdEQUErQztBQUUvQyx1RUFBb0Y7QUFDcEYsb0RBQStDO0FBQy9DLG9EQUErQztBQUcvQyxvQ0FBK0I7QUFJekIsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBcUMsMkJBQU07SUFBM0M7O0lBOENBLENBQUM7SUEzQ0csc0JBQUksR0FBSixVQUFLLE1BQWlCO1FBQ2xCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUVELGtDQUFnQixHQUFoQixVQUFpQixLQUFpQixFQUFDLElBQWdCO1FBQy9DLElBQUksRUFBRSxHQUFDLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDakMsSUFBRyxFQUFFLENBQUMsY0FBYyxJQUFFLHFCQUFTLENBQUMsU0FBUztZQUNyQyxPQUFPO1FBQ1gsSUFBSSxLQUFLLEdBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDM0IsUUFBTyxLQUFLLEVBQUM7WUFDVCxLQUFLLE9BQU87Z0JBQUM7b0JBQ1QsSUFBSSxTQUFTLEdBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsaUJBQU8sQ0FBQyxDQUFDO29CQUMvQyxJQUFHLFNBQVMsRUFBQzt3QkFDVCxJQUFJLElBQUksR0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQzt3QkFDcEQsSUFBRyxJQUFJLENBQUMsWUFBWSxFQUFFLEdBQUMsQ0FBQyxFQUFDOzRCQUNyQix1Q0FBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxpQ0FBWSxDQUFDLGNBQWMsRUFBQyxTQUFTLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQzs0QkFDMUcsTUFBTTs0QkFDTixvRUFBb0U7NEJBQ3BFLHVFQUF1RTs0QkFDdkUsb0NBQW9DOzRCQUNwQyw0QkFBNEI7NEJBQzVCLDhFQUE4RTs0QkFDOUUseUZBQXlGOzRCQUN6Riw4RUFBOEU7NEJBQzlFLHFDQUFxQzs0QkFDckMsNERBQTREOzRCQUM1RCxzQ0FBc0M7NEJBQ3RDLDhDQUE4Qzs0QkFDOUMsK0RBQStEOzRCQUMvRCxxREFBcUQ7NEJBQ3JELG9GQUFvRjs0QkFDcEYsOEZBQThGOzRCQUM5Rix1RUFBdUU7NEJBQ3ZFLGdEQUFnRDs0QkFDaEQsaUVBQWlFOzRCQUNqRSxZQUFZOzRCQUNaLFFBQVE7NEJBQ1IsNEJBQTRCO3lCQUMvQjtxQkFDSjtpQkFDSjtnQkFBQSxNQUFNO1NBQ1Y7SUFDTCxDQUFDO0lBN0NnQixPQUFPO1FBRDNCLE9BQU87T0FDYSxPQUFPLENBOEMzQjtJQUFELGNBQUM7Q0E5Q0QsQUE4Q0MsQ0E5Q29DLGdCQUFNLEdBOEMxQztrQkE5Q29CLE9BQU8iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHsgR2FtZVN0YXRlIH0gZnJvbSBcIi4uLy4uLy4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBFbmVteV9EZUJ1ZmZfVHlwZSB9IGZyb20gXCIuLi8uLi8uLi9FbmVteS9FbmVteUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBHYW1lRWZmZWN0c01hbmFnZXIsIEdhbWVFZmZlY3RJZCB9IGZyb20gXCIuLi8uLi8uLi9HYW1lL0dhbWVFZmZlY3RzTWFuYWdlclwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uLy4uLy4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCBNb25zdGVyIGZyb20gXCIuLi8uLi8uLi9Nb25zdGVyL01vbnN0ZXJcIjtcclxuaW1wb3J0IHsgR29uZ0ppRGF0YSB9IGZyb20gXCIuLi8uLi9EYXRhL0hlcm9EYXRhXCI7XHJcbmltcG9ydCB7IEJ1ZmZEYXRhIH0gZnJvbSBcIi4uL0J1ZmZEYXRhXCI7XHJcbmltcG9ydCBHb25nSmkgZnJvbSBcIi4uL0dvbmdKaVwiO1xyXG5pbXBvcnQgeyBCdWZmSWQsIEJ1ZmZUeXBlIH0gZnJvbSBcIi4uL0hlcm9Db25maWdcIjtcclxuXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hblRlbmcgZXh0ZW5kcyBHb25nSmkge1xyXG5cclxuXHJcbiAgICBpbml0KGdqRGF0YTpHb25nSmlEYXRhKXtcclxuICAgICAgICB0aGlzLmluaXREYXRhKGdqRGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25Db2xsaXNpb25FbnRlcihvdGhlcjpjYy5Db2xsaWRlcixzZWxmOmNjLkNvbGxpZGVyKSB7XHJcbiAgICAgICAgbGV0IGdtPUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCk7ICAgICAgICBcclxuICAgICAgICBpZihnbS5jdXJfZ2FtZV9zdGF0ZT09R2FtZVN0YXRlLkdhbWVfTG9zZSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGxldCBncm91cD1vdGhlci5ub2RlLmdyb3VwO1xyXG4gICAgICAgIHN3aXRjaChncm91cCl7XHJcbiAgICAgICAgICAgIGNhc2UgJ2VuZW15Jzp7XHJcbiAgICAgICAgICAgICAgICBsZXQgbW9uc3RlclRzPW90aGVyLm5vZGUuZ2V0Q29tcG9uZW50KE1vbnN0ZXIpO1xyXG4gICAgICAgICAgICAgICAgaWYobW9uc3RlclRzKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YT1tb25zdGVyVHMuYmVGbGFzaEluanVyZWQodGhpcy5nb25namlfZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZGF0YS5nZXREYW1hZ2VOdW0oKT4wKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLmRlbHV5aV9hdHRfaGl0LG1vbnN0ZXJUcy5nZXRKdUppUG9zKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+a1geihgOaViOaenFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZih0aGlzLmdvbmdqaV9kYXRhLmhlcm9fZGF0YS5oZXJvX2luZm8uZXhjbHVzaXZlX2VxdWlwX2xldmVsPjApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgbGV0IHJhdGU9dGhpcy5nb25namlfZGF0YS5oZXJvX2RhdGEuRXhjbHVzaXZlV2VhcG9uU2tpbGxWYWx1ZV8xO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgaWYocmF0ZSYmTWF0aC5yYW5kb20oKTxyYXRlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBpZighZGF0YS5pc19kaWUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAvLyBtb25zdGVyVHMuYWRkRGVCdWZmKEVuZW15X0RlQnVmZl9UeXBlLkxpdVh1ZV9XdU52X0V4X1NraWxsLHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgLy8gICAgIHJlbWFpbl90aW1lOnRoaXMuZ29uZ2ppX2RhdGEuaGVyb19kYXRhLkV4Y2x1c2l2ZVdlYXBvblNraWxsVmFsdWVfMixcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgLy8gICAgIGRhbWFnZV9udW06IHRoaXMuZ29uZ2ppX2RhdGEuaGVyb19kYXRhLnRvdGFsX2F0dGFjayowLjEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIC8vICAgICBqaWFuZ2VfdGltZTogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgLy8gICAgIGhlcm9fdHlwZTogdGhpcy5nb25namlfZGF0YS5oZXJvX3R5cGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIC8vIH0sdGhpcy5nb25namlfZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIC8vIGxldCBidWZmRGF0YT1uZXcgQnVmZkRhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgLy8gYnVmZkRhdGEuYnVmZl9pZD1CdWZmSWQuSGVyb19GYVNoaV9FWF9MSVVYVUU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIC8vIGJ1ZmZEYXRhLmJ1ZmZfdHlwZT1CdWZmVHlwZS5Ob3JtYWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIC8vIGJ1ZmZEYXRhLmJ1ZmZfdmFsdWU9W3RoaXMuZ29uZ2ppX2RhdGEuaGVyb19kYXRhLnRvdGFsX2F0dGFjayowLjVdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAvLyBidWZmRGF0YS5yZW1haW5fdGltZT10aGlzLmdvbmdqaV9kYXRhLmhlcm9fZGF0YS5FeGNsdXNpdmVXZWFwb25Ta2lsbFZhbHVlXzI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIC8vIGJ1ZmZEYXRhLmdhbWVfZWZmZWN0X2lkPUdhbWVFZmZlY3RJZC5tb25zdGVyX3pob25nZHU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIC8vIGJ1ZmZEYXRhLmRhbWFnZV9qaWFuZ2VfdGltZT0xO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAvLyBtb25zdGVyVHMuYWRkRGVCdWZmKGJ1ZmZEYXRhLHRoaXMuZ29uZ2ppX2RhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gfSAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH0gICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWJyZWFrOyAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=