"use strict";
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