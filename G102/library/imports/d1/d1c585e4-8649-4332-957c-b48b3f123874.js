"use strict";
cc._RF.push(module, 'd1c58XkhklDMpV8tIs/Ejh0', 'PaoDanBaoZha');
// Scripts/Hero/Game/PaoShou/PaoDanBaoZha.ts

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
var BuffData_1 = require("../BuffData");
var GongJi_1 = require("../GongJi");
var HeroConfig_1 = require("../HeroConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PaoDanBaoZha = /** @class */ (function (_super) {
    __extends(PaoDanBaoZha, _super);
    function PaoDanBaoZha() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.game_effect_id = GameEffectsManager_1.GameEffectId.Null;
        _this.paodan_type = HeroConfig_1.PaoDan_Type.skill;
        return _this;
    }
    PaoDanBaoZha.prototype.init = function (id, paodanType, gjData) {
        _super.prototype.initData.call(this, gjData);
        this.game_effect_id = id;
        this.paodan_type = paodanType;
    };
    ////--------------------------------------碰撞开始----------------------------------------------------
    PaoDanBaoZha.prototype.onCollisionEnter = function (other, self) {
        var gm = GameManager_1.default.getInstance();
        if (gm.cur_game_state == Constants_1.GameState.Game_Lose)
            return;
        var group = other.node.group;
        switch (group) {
            case 'enemy':
                {
                    var monsterTs = other.node.getComponent(Monster_1.default);
                    if (monsterTs) {
                        switch (this.paodan_type) {
                            case HeroConfig_1.PaoDan_Type.skill:
                                {
                                    var data = monsterTs.beFlashInjured(this.gongji_data);
                                    if (!data.is_die) {
                                    }
                                }
                                break;
                            case HeroConfig_1.PaoDan_Type.exclusive:
                                {
                                    var data = monsterTs.beFlashInjured(this.gongji_data);
                                    if (!data.is_die) {
                                        //眩晕概率
                                        // if(this.gongji_data.hero_data.hero_info.exclusive_equip_level>0){
                                        //     // monsterTs.addDeBuff(Enemy_DeBuff_Type.XuanYun,{
                                        //     //     remain_time: this.gongji_data.hero_data.ExclusiveWeaponSkillValue_2,
                                        //     //     damage_num: 0,
                                        //     //     jiange_time: 1,
                                        //     //     hero_type: this.gongji_data.hero_type,
                                        //     // },this.gongji_data)
                                        //     let buffData=new BuffData();
                                        //     buffData.buff_id=BuffId.Hero_XuanYun;
                                        //     buffData.buff_type=BuffType.Vertigo;
                                        //     buffData.buff_value=[0];
                                        //     buffData.remain_time=this.gongji_data.hero_data.ExclusiveWeaponSkillValue_2;
                                        //     buffData.game_effect_id=GameEffectId.xuanyun;
                                        //     monsterTs.addDeBuff(buffData,this.gongji_data);
                                        // }                                
                                    }
                                }
                                break;
                            case HeroConfig_1.PaoDan_Type.super: {
                                var data = monsterTs.beFlashInjured(this.gongji_data);
                                if (!data.is_die) {
                                    //被弹开
                                    // let monsterPos=monsterTs.node.getPosition();
                                    // let offsetPos=monsterPos.sub(this.node.getPosition());
                                    // let distance=150-(offsetPos.mag()+Math.random()*40-20);
                                    // if(distance<0){
                                    //     distance=0;
                                    // }
                                    // let dir=Math.atan2(offsetPos.y,offsetPos.x);
                                    // let xx=Math.cos(dir)*(distance);
                                    // let yy=Math.sin(dir)*(distance);
                                    // if(xx+monsterTs.node.x>192){
                                    //     xx=192-monsterTs.node.x;
                                    // }
                                    // if(xx+monsterTs.node.x<-192){
                                    //     xx=-192-monsterTs.node.x;
                                    // }
                                    // cc.tween(monsterTs.node).by(distance/150*0.3,{x:xx,y:yy},{easing:'sineIn'}).call(()=>{
                                    //     monsterTs.addDeBuff(Enemy_DeBuff_Type.XuanYun,{
                                    //         remain_time: 0.5,
                                    //         damage_num: 0,
                                    //         jiange_time: 1,
                                    //         hero_type: this.gongji_data.hero_type,
                                    //     },this.gongji_data)
                                    // }).start();
                                    // monsterTs.addDeBuff(Enemy_DeBuff_Type.XuanYun,{
                                    //     remain_time: 0.5,
                                    //     damage_num: 0,
                                    //     jiange_time: 1,
                                    //     hero_type: this.gongji_data.hero_type,
                                    // },this.gongji_data)
                                    var buffData = new BuffData_1.BuffData();
                                    buffData.buff_id = HeroConfig_1.BuffId.Hero_XuanYun;
                                    buffData.buff_type = HeroConfig_1.BuffType.Vertigo;
                                    buffData.buff_value = [0];
                                    buffData.remain_time = 0.5;
                                    buffData.game_effect_id = GameEffectsManager_1.GameEffectId.xuanyun;
                                    monsterTs.addDeBuff(buffData, this.gongji_data);
                                }
                            }
                        }
                    }
                }
                break;
        }
    };
    PaoDanBaoZha = __decorate([
        ccclass
    ], PaoDanBaoZha);
    return PaoDanBaoZha;
}(GongJi_1.default));
exports.default = PaoDanBaoZha;

cc._RF.pop();