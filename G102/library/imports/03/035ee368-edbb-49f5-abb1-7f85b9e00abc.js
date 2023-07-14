"use strict";
cc._RF.push(module, '035eeNo7btJ9auxf4W54Aq8', 'GameEffectsManager');
// Scripts/Game/GameEffectsManager.ts

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
exports.GameEffectsManager = exports.GameEffectId = void 0;
var MapNodePool_1 = require("./MapNodePool");
var GameEffectId;
(function (GameEffectId) {
    /**无 */
    GameEffectId[GameEffectId["Null"] = 0] = "Null";
    /**近战怪物通用的攻击特效 */
    GameEffectId[GameEffectId["monster_normal_att"] = 1] = "monster_normal_att";
    /**眩晕通用特效 */
    GameEffectId[GameEffectId["xuanyun"] = 2] = "xuanyun";
    /**英雄指示器-圆形 */
    GameEffectId[GameEffectId["skill_tip_circle"] = 11] = "skill_tip_circle";
    /**英雄指示器-矩形 */
    GameEffectId[GameEffectId["skill_tip_rect"] = 12] = "skill_tip_rect";
    /**英雄指示器-方向 */
    GameEffectId[GameEffectId["skill_tip_dir"] = 13] = "skill_tip_dir";
    /**英雄伤害记录器 */
    GameEffectId[GameEffectId["skill_damage_record"] = 20] = "skill_damage_record";
    /**英雄通用蓄力 */
    GameEffectId[GameEffectId["hero_skill_common"] = 99] = "hero_skill_common";
    /**射手普通攻击的箭矢 */
    GameEffectId[GameEffectId["sheshou_jianshi_att"] = 101] = "sheshou_jianshi_att";
    /**射手被动技能攻击的箭矢 */
    GameEffectId[GameEffectId["sheshou_jianshi_skill"] = 102] = "sheshou_jianshi_skill";
    /**射手普通攻击暴击命中后的特效 */
    GameEffectId[GameEffectId["sheshou_attack_ctrl_hit"] = 103] = "sheshou_attack_ctrl_hit";
    /**射手普通攻击箭矢命中的特效 */
    GameEffectId[GameEffectId["sheshou_jianshi_att_hit"] = 111] = "sheshou_jianshi_att_hit";
    /**射手大招蓄力/发射/命中/特效 */
    GameEffectId[GameEffectId["sheshou_jianshi_super_skill_1"] = 121] = "sheshou_jianshi_super_skill_1";
    GameEffectId[GameEffectId["sheshou_jianshi_super_skill_2"] = 122] = "sheshou_jianshi_super_skill_2";
    GameEffectId[GameEffectId["sheshou_jianshi_super_skill_3"] = 123] = "sheshou_jianshi_super_skill_3";
    /**射手大招移动箭矢特效 */
    /**炮手普通炮弹 */
    GameEffectId[GameEffectId["paoshou_paodan_att"] = 201] = "paoshou_paodan_att";
    /**炮手技能炮弹 */
    GameEffectId[GameEffectId["paoshou_paodan_skill"] = 202] = "paoshou_paodan_skill";
    /**炮手炮弹落地爆炸的特效 */
    GameEffectId[GameEffectId["paoshou_skill_hit"] = 203] = "paoshou_skill_hit";
    //paoshou_paodan_luodi=203,
    /**炮手专武技能的炮弹 */
    GameEffectId[GameEffectId["paoshou_paodan_skill_ex"] = 204] = "paoshou_paodan_skill_ex";
    /**炮手炮弹命中爆炸的特效 */
    GameEffectId[GameEffectId["paoshou_paodan_hit"] = 211] = "paoshou_paodan_hit";
    /**炮手被动技能2特效 */
    GameEffectId[GameEffectId["paoshou_skill_2"] = 221] = "paoshou_skill_2";
    /**炮手被动技能2特效 */
    GameEffectId[GameEffectId["paoshou_active_skill_1"] = 231] = "paoshou_active_skill_1";
    /**炮手被动技能2特效 */
    GameEffectId[GameEffectId["paoshou_active_skill_2"] = 232] = "paoshou_active_skill_2";
    GameEffectId[GameEffectId["paoshou_active_skill_toudan"] = 233] = "paoshou_active_skill_toudan";
    /**炮手大招信号弹 */
    GameEffectId[GameEffectId["paoshou_dazhao_xinhaodan"] = 241] = "paoshou_dazhao_xinhaodan";
    /**炮手大招尾烟 */
    GameEffectId[GameEffectId["paoshou_dazhao_weiyan"] = 242] = "paoshou_dazhao_weiyan";
    /**炮手大招信号弹落地后的瞄准效果 */
    GameEffectId[GameEffectId["paoshou_dazhao_xinhaodan_miaozhun"] = 243] = "paoshou_dazhao_xinhaodan_miaozhun";
    /**炮手大招-信号弹落地结束后的尾烟 */
    GameEffectId[GameEffectId["paoshou_dazhao_weiyan_end"] = 244] = "paoshou_dazhao_weiyan_end";
    /**女巫的普通攻击 */
    GameEffectId[GameEffectId["nvwu_attack_bullect"] = 301] = "nvwu_attack_bullect";
    /**女巫的普通攻击命中 */
    GameEffectId[GameEffectId["nvwu_attack_bullect_hit"] = 302] = "nvwu_attack_bullect_hit";
    /**女巫的主动技能 */
    GameEffectId[GameEffectId["nvwu_active_skill"] = 311] = "nvwu_active_skill";
    /**德鲁伊普通攻击飞弹 */
    GameEffectId[GameEffectId["deluyi_att"] = 401] = "deluyi_att";
    /**德鲁伊普通攻击命中特效 */
    GameEffectId[GameEffectId["deluyi_att_hit"] = 402] = "deluyi_att_hit";
    /**德鲁伊被动攻击的暴击特效 */
    GameEffectId[GameEffectId["deluyi_att_baoji"] = 403] = "deluyi_att_baoji";
    /**德鲁伊被动攻击暴击的蔓藤眩晕 */
    GameEffectId[GameEffectId["deluyi_skill_manteng"] = 404] = "deluyi_skill_manteng";
    /**德鲁伊被动触发的特效 */
    GameEffectId[GameEffectId["deluyi_skill_beidong_create"] = 405] = "deluyi_skill_beidong_create";
    /**德鲁伊主动技能特效 */
    GameEffectId[GameEffectId["deluyi_active_skill"] = 411] = "deluyi_active_skill";
    /**德鲁伊主动技能命中特效 */
    GameEffectId[GameEffectId["deluyi_active_skill_hit"] = 412] = "deluyi_active_skill_hit";
    /**狂战士普通攻击 */
    GameEffectId[GameEffectId["kuangzhanshi_attack"] = 501] = "kuangzhanshi_attack";
    /**狂战士普通攻击-命中 */
    GameEffectId[GameEffectId["kuangzhanshi_attack_hit"] = 502] = "kuangzhanshi_attack_hit";
    /**狂战士普通攻击-穿透 */
    GameEffectId[GameEffectId["kuangzhanshi_attack_chuantou"] = 503] = "kuangzhanshi_attack_chuantou";
    /**狂战士被动最大层的斧头攻击 */
    GameEffectId[GameEffectId["kuangzhanshi_attack_max"] = 504] = "kuangzhanshi_attack_max";
    /**贞德普通攻击 */
    GameEffectId[GameEffectId["zhen_de_attack"] = 601] = "zhen_de_attack";
    /**贞德普通攻击命中 */
    GameEffectId[GameEffectId["zhen_de_attack_hit"] = 602] = "zhen_de_attack_hit";
    /**贞德被动技能2 */
    GameEffectId[GameEffectId["zhen_de_beidong_skill"] = 611] = "zhen_de_beidong_skill";
    /**贞德被动技能1 */
    GameEffectId[GameEffectId["zhen_de_beidong_skill_wall"] = 612] = "zhen_de_beidong_skill_wall";
    /**贞德主动技能1-1 */
    GameEffectId[GameEffectId["zhen_de_active_skill_1"] = 621] = "zhen_de_active_skill_1";
    /**贞德主动技能1-2 */
    GameEffectId[GameEffectId["zhen_de_active_skill_2"] = 622] = "zhen_de_active_skill_2";
    /**贞德主动技能1-3 */
    GameEffectId[GameEffectId["zhen_de_active_skill_3"] = 623] = "zhen_de_active_skill_3";
    /**兽王普通攻击的箭矢 */
    GameEffectId[GameEffectId["shou_wang_jianshi_attack"] = 701] = "shou_wang_jianshi_attack";
    /**兽王被动技能1的箭矢,穿透 */
    GameEffectId[GameEffectId["shou_wang_jianshi_skill1"] = 702] = "shou_wang_jianshi_skill1";
    /**兽王被动技能1的箭矢,穿透特效 */
    GameEffectId[GameEffectId["shou_wang_jianshi_skill1_hit"] = 703] = "shou_wang_jianshi_skill1_hit";
    /**长矛手的普通攻击 */
    GameEffectId[GameEffectId["chang_mao_shou_attack"] = 801] = "chang_mao_shou_attack";
    /**长矛手的普通攻击命中 */
    GameEffectId[GameEffectId["chang_mao_shou_attack_hit"] = 802] = "chang_mao_shou_attack_hit";
    /**长矛手的被动技能-爪子 */
    GameEffectId[GameEffectId["chang_mao_shou_skill_zhuazi"] = 803] = "chang_mao_shou_skill_zhuazi";
    /**长矛手的主动技能buff */
    GameEffectId[GameEffectId["chang_mao_shou_skill_active_1"] = 811] = "chang_mao_shou_skill_active_1";
    /**长矛手的主动技能buff */
    GameEffectId[GameEffectId["chang_mao_shou_skill_active_2"] = 812] = "chang_mao_shou_skill_active_2";
    /**冰女的普通攻击 */
    GameEffectId[GameEffectId["bing_nv_attack"] = 901] = "bing_nv_attack";
    /**冰女的普通攻击 */
    GameEffectId[GameEffectId["bing_nv_attack_hit"] = 902] = "bing_nv_attack_hit";
    /**冰女的被动技能触发的爆炸特效 */
    GameEffectId[GameEffectId["bing_nv_beidong_skill_create"] = 910] = "bing_nv_beidong_skill_create";
    /**冰女的被动技能攻击 */
    GameEffectId[GameEffectId["bing_nv_beidong_skill"] = 911] = "bing_nv_beidong_skill";
    /**冰女的被动技能攻击命中 */
    GameEffectId[GameEffectId["bing_nv_beidong_skill_hit"] = 912] = "bing_nv_beidong_skill_hit";
    /**冰女的被动技能2攻击 */
    GameEffectId[GameEffectId["bing_nv_beidong_skill_2"] = 913] = "bing_nv_beidong_skill_2";
    /**冰女的主动技能的冰墙 */
    GameEffectId[GameEffectId["bing_nv_active_skill_wall"] = 922] = "bing_nv_active_skill_wall";
    /**阿努比斯的普通攻击 */
    GameEffectId[GameEffectId["a_nu_bi_si_attack"] = 1001] = "a_nu_bi_si_attack";
    /**阿努比斯的普通攻击命中 */
    GameEffectId[GameEffectId["a_nu_bi_si_attack_hit"] = 1002] = "a_nu_bi_si_attack_hit";
    /**阿努比斯被动1 */
    GameEffectId[GameEffectId["a_nu_bi_si_beidong_skill_1"] = 1011] = "a_nu_bi_si_beidong_skill_1";
    /**阿努比斯被动2 */
    GameEffectId[GameEffectId["a_nu_bi_si_beidong_skill_2"] = 1012] = "a_nu_bi_si_beidong_skill_2";
    /**阿努比斯主动1 */
    GameEffectId[GameEffectId["a_nu_bi_si_active_skill_1"] = 1021] = "a_nu_bi_si_active_skill_1";
    /**阿努比斯主动风 */
    GameEffectId[GameEffectId["a_nu_bi_si_active_skill_wind"] = 1022] = "a_nu_bi_si_active_skill_wind";
    /**阿努比斯主动线 */
    GameEffectId[GameEffectId["a_nu_bi_si_active_skill_line"] = 1023] = "a_nu_bi_si_active_skill_line";
    /**阿努比斯主动圈 */
    GameEffectId[GameEffectId["a_nu_bi_si_active_skill_ring"] = 1024] = "a_nu_bi_si_active_skill_ring";
    /**魅魔普通攻击特效 */
    GameEffectId[GameEffectId["mei_mo_attack"] = 1101] = "mei_mo_attack";
    /**魅魔普通攻击命中特效 */
    GameEffectId[GameEffectId["mei_mo_attack_hit"] = 1102] = "mei_mo_attack_hit";
    /**魅魔被动技能1爆炸效果 */
    GameEffectId[GameEffectId["mei_mo_beidong_skill1_baozha"] = 1111] = "mei_mo_beidong_skill1_baozha";
    /**魅魔被动技能1爆炸后的攻速 */
    GameEffectId[GameEffectId["mei_mo_beidong_skill1_gongsu"] = 1112] = "mei_mo_beidong_skill1_gongsu";
    /**魅魔被动技能2命中 */
    GameEffectId[GameEffectId["mei_mo_beidong_skill2_hit"] = 1113] = "mei_mo_beidong_skill2_hit";
    /**魅魔主动技能命中 */
    GameEffectId[GameEffectId["mei_mo_zhudong_skill_hero"] = 1121] = "mei_mo_zhudong_skill_hero";
    /**魅魔主动技能命中 */
    GameEffectId[GameEffectId["mei_mo_zhudong_skill_gound"] = 1122] = "mei_mo_zhudong_skill_gound";
    /**魅魔主动技能命中 */
    GameEffectId[GameEffectId["mei_mo_zhudong_skill_baozha"] = 1123] = "mei_mo_zhudong_skill_baozha";
    /**魅魔主动技能命中 */
    GameEffectId[GameEffectId["mei_mo_zhudong_skill_monster"] = 1124] = "mei_mo_zhudong_skill_monster";
    /**雷神普通的闪电特效 */
    GameEffectId[GameEffectId["lei_shen_shandian"] = 1201] = "lei_shen_shandian";
    /**雷神普通的闪电命中的特效 */
    GameEffectId[GameEffectId["lei_shen_shandian_hit"] = 1202] = "lei_shen_shandian_hit";
    /**雷神大招的闪电-地板特效 */
    GameEffectId[GameEffectId["lei_shen_skill_ground"] = 1211] = "lei_shen_skill_ground";
    /**雷神大招的闪电-空中特效 */
    GameEffectId[GameEffectId["lei_shen_skill_sky"] = 1212] = "lei_shen_skill_sky";
    //---------------------------------------城墙-------------------------------------------------
    /**城墙的护盾 */
    GameEffectId[GameEffectId["wall_shield"] = 10001] = "wall_shield";
    //---------------------------------------怪物-------------------------------------------------
    /**第一个BOSS攻击的移动特效 */
    GameEffectId[GameEffectId["boss1_att_move"] = 20101] = "boss1_att_move";
    /**第一个BOSS攻击的结束爆炸特效 */
    GameEffectId[GameEffectId["boss1_att_end"] = 20102] = "boss1_att_end";
    /**第2个BOSS攻击的结束特效 */
    GameEffectId[GameEffectId["boss2_att_end"] = 20201] = "boss2_att_end";
    /**第2个BOSS技能的特效 */
    GameEffectId[GameEffectId["boss2_skill_move"] = 20202] = "boss2_skill_move";
    GameEffectId[GameEffectId["boss2_skill_end"] = 20203] = "boss2_skill_end";
    /**第3个BOSS攻击的移动特效 */
    GameEffectId[GameEffectId["boss3_att_move"] = 20301] = "boss3_att_move";
    /**第3个BOSS攻击的结束爆炸特效 */
    GameEffectId[GameEffectId["boss3_att_end"] = 20302] = "boss3_att_end";
    /**第3个BOSS技能的特效 */
    GameEffectId[GameEffectId["boss3_skill_move"] = 20303] = "boss3_skill_move";
    /**boss血条 */
    GameEffectId[GameEffectId["boss_hp"] = 20000] = "boss_hp";
    /**boss出场动画 */
    GameEffectId[GameEffectId["boss_coming"] = 20001] = "boss_coming";
    /**远程怪物通用攻击 */
    GameEffectId[GameEffectId["monster_far_att"] = 20002] = "monster_far_att";
    /**远程怪物普通攻击命中特效 */
    GameEffectId[GameEffectId["monster_far_att_hit"] = 20003] = "monster_far_att_hit";
    /**怪物死亡特效 */
    GameEffectId[GameEffectId["monster_die"] = 20004] = "monster_die";
    /**召唤怪物特效 */
    GameEffectId[GameEffectId["monster_zhaohuan"] = 20005] = "monster_zhaohuan";
    /**怪物中毒特效 */
    GameEffectId[GameEffectId["monster_zhongdu"] = 21001] = "monster_zhongdu";
    /**治疗光环 */
    GameEffectId[GameEffectId["monster_zhiliao_halo"] = 21002] = "monster_zhiliao_halo";
    /**治疗光环成功加血 */
    GameEffectId[GameEffectId["monster_zhiliao_halo_hit"] = 21003] = "monster_zhiliao_halo_hit";
    /**精英怪-19-幽灵-的主动引导技能 */
    GameEffectId[GameEffectId["monster19_youling_skill"] = 21901] = "monster19_youling_skill";
    /**精英怪-19-幽灵-的主动技能命中 */
    GameEffectId[GameEffectId["monster19_youling_skill_hit"] = 21902] = "monster19_youling_skill_hit";
    /**精英怪-30-蝙蝠（堕落天使）-的被动光环 */
    GameEffectId[GameEffectId["monster30_bianfu_skill"] = 23001] = "monster30_bianfu_skill";
    /**精英怪-65-霜巨人-普通攻击 */
    GameEffectId[GameEffectId["monster65_shuangjuren_att"] = 26501] = "monster65_shuangjuren_att";
    /**精英怪-65-霜巨人-普通攻击命中 */
    GameEffectId[GameEffectId["monster65_shuangjuren_att_hit"] = 26502] = "monster65_shuangjuren_att_hit";
    /**精英怪-65-霜巨人-普通攻击命中并暴击 */
    GameEffectId[GameEffectId["monster65_shuangjuren_att_hit_crit"] = 26503] = "monster65_shuangjuren_att_hit_crit";
    /**精英怪-67-水晶幼龙-普攻攻击 */
    GameEffectId[GameEffectId["monster67_shuijingyoulong_att"] = 26701] = "monster67_shuijingyoulong_att";
    /**精英怪-67-水晶幼龙-普攻攻击命中 */
    GameEffectId[GameEffectId["monster67_shuijingyoulong_att_hit"] = 26702] = "monster67_shuijingyoulong_att_hit";
    /**精英怪-68-牛头将军-光环 */
    GameEffectId[GameEffectId["monster68_niujiangjun_skill"] = 26811] = "monster68_niujiangjun_skill";
    /**精英怪-69-牛头萨满-普通攻击 */
    GameEffectId[GameEffectId["monster69_niusaman_att"] = 26901] = "monster69_niusaman_att";
    /**精英怪-70-巨型史莱姆-死亡爆弹 */
    GameEffectId[GameEffectId["monster70_silaimu_qq"] = 27001] = "monster70_silaimu_qq";
    /**小怪-44-水晶守卫-普攻攻击 */
    GameEffectId[GameEffectId["monster44_shuijingshouwei_att"] = 24401] = "monster44_shuijingshouwei_att";
    /**小怪-47-牛头飞刀手-普攻攻击 */
    GameEffectId[GameEffectId["monster47_att"] = 24701] = "monster47_att";
    /**小怪-53-幽灵枪手-普攻攻击 */
    GameEffectId[GameEffectId["monster53_att"] = 25301] = "monster53_att";
    /**精英怪-72-幽灵巨炮手-普攻攻击 */
    GameEffectId[GameEffectId["monster72_att"] = 27201] = "monster72_att";
    /**精英怪-73-幽灵舵手-技能-锁链 */
    GameEffectId[GameEffectId["monster73_skill_lian_root"] = 27310] = "monster73_skill_lian_root";
    /**精英怪-73-幽灵舵手-技能-锚 */
    GameEffectId[GameEffectId["monster73_skill_mao"] = 27311] = "monster73_skill_mao";
    /**精英怪-73-幽灵舵手-技能-铁链 */
    GameEffectId[GameEffectId["monster73_skill_lian"] = 27312] = "monster73_skill_lian";
    /**精英怪-57-风精灵-普通攻击的风*/
    GameEffectId[GameEffectId["monster57_attack_wind"] = 25701] = "monster57_attack_wind";
    /**小怪-58-侏儒工程师-普通攻击的激光弹*/
    GameEffectId[GameEffectId["monster58_attack_bullect"] = 25801] = "monster58_attack_bullect";
    /**精英怪-76-监督者-普通攻击的弹*/
    GameEffectId[GameEffectId["monster76_attack_bullect"] = 27601] = "monster76_attack_bullect";
    /**精英怪-76-监督者-速度光环*/
    GameEffectId[GameEffectId["monster76_attack_guanghuan"] = 27611] = "monster76_attack_guanghuan";
    /**精英怪-62-火焰精灵-普通攻击的弹*/
    GameEffectId[GameEffectId["monster62_attack_bullect"] = 26201] = "monster62_attack_bullect";
    /**精英怪-78-熔岩巨人-普通攻击的弹*/
    GameEffectId[GameEffectId["monster78_attack_bullect"] = 27801] = "monster78_attack_bullect";
    /**精英怪-78-熔岩巨人-普通攻击的技能*/
    GameEffectId[GameEffectId["monster78_skill_bullect"] = 27811] = "monster78_skill_bullect";
    /**精英怪-78-熔岩巨人-普通攻击的技能*/
    GameEffectId[GameEffectId["monster78_skill_bullect_hit"] = 27812] = "monster78_skill_bullect_hit";
    /**精英怪 37-石头人冲撞后特效 */
    GameEffectId[GameEffectId["monster37_shitouren"] = 23701] = "monster37_shitouren";
    //---------------------------------------Boss--------------------------------------------------
    /**boss1（大树）普通攻击 */
    GameEffectId[GameEffectId["boss1_normal_att"] = 50101] = "boss1_normal_att";
    /**boss1（大树）普通攻击命中 */
    GameEffectId[GameEffectId["boss1_normal_att_hit"] = 50102] = "boss1_normal_att_hit";
    /**boss1（大树）技能攻击 */
    GameEffectId[GameEffectId["boss1_normal_skill"] = 50111] = "boss1_normal_skill";
    /**boss1（大树）技能命中 */
    GameEffectId[GameEffectId["boss1_normal_skill_hit"] = 50112] = "boss1_normal_skill_hit";
    /**BOSS2(金刚)普通攻击 */
    GameEffectId[GameEffectId["boss2_normal_att"] = 50201] = "boss2_normal_att";
    /**BOSS2(金刚)普通攻击命中1 */
    GameEffectId[GameEffectId["boss2_normal_att_hit1"] = 50202] = "boss2_normal_att_hit1";
    /**BOSS2(金刚)普通攻击命中2 */
    GameEffectId[GameEffectId["boss2_normal_att_hit2"] = 50203] = "boss2_normal_att_hit2";
    /**BOSS2(金刚)技能攻击 */
    GameEffectId[GameEffectId["boss2_normal_skill"] = 50211] = "boss2_normal_skill";
    /**BOSS2(金刚)技能攻击命中 */
    GameEffectId[GameEffectId["boss2_normal_skill_hit"] = 50212] = "boss2_normal_skill_hit";
    /**BOSS3（雪人）的普通攻击 */
    GameEffectId[GameEffectId["boss3_normal_attack"] = 50301] = "boss3_normal_attack";
    /**BOSS3（雪人）的普通攻击命中 */
    GameEffectId[GameEffectId["boss3_normal_attack_hit"] = 50302] = "boss3_normal_attack_hit";
    /**BOSS3（雪人）的技能1攻击 */
    GameEffectId[GameEffectId["boss3_skill_1"] = 50311] = "boss3_skill_1";
    /**BOSS3（雪人）的技能1攻击命中 */
    GameEffectId[GameEffectId["boss3_skill_1_hit"] = 50312] = "boss3_skill_1_hit";
    /**BOSS3（雪人）的技能2盾牌 */
    GameEffectId[GameEffectId["boss3_skill_2_dunpai"] = 50321] = "boss3_skill_2_dunpai";
    /**BOSS3（雪人）的技能2攻击 */
    GameEffectId[GameEffectId["boss3_skill_2"] = 50322] = "boss3_skill_2";
    /**BOSS3（雪人）的技能2攻击命中 */
    GameEffectId[GameEffectId["boss3_skill_2_hit"] = 50323] = "boss3_skill_2_hit";
    /**BOSS3（雪人）的技能2-雪印 */
    GameEffectId[GameEffectId["boss3_skill_2_xueyin"] = 50324] = "boss3_skill_2_xueyin";
    /**BOSS4（亚龙）的普通攻击命中 */
    GameEffectId[GameEffectId["boss4_normal_attack_hit"] = 50401] = "boss4_normal_attack_hit";
    /**BOSS4（亚龙）的技能喷火 */
    GameEffectId[GameEffectId["boss4_normal_skill_penhuo"] = 50411] = "boss4_normal_skill_penhuo";
    /**BOSS5（牛魔王）的普通攻击命中 */
    GameEffectId[GameEffectId["boss5_normal_attack_hit"] = 50501] = "boss5_normal_attack_hit";
    /**BOSS5（牛魔王）的技能爆炸 */
    GameEffectId[GameEffectId["boss5_skill_baozha"] = 50511] = "boss5_skill_baozha";
    /**BOSS5（牛魔王）的技能释放 */
    GameEffectId[GameEffectId["boss5_skill_release"] = 50512] = "boss5_skill_release";
    /**BOSS6(腐败巨兽)的普通攻击 */
    GameEffectId[GameEffectId["boss6_attack"] = 50601] = "boss6_attack";
    /**BOSS6(腐败巨兽)的普通攻击命中 */
    GameEffectId[GameEffectId["boss6_attack_hit"] = 50602] = "boss6_attack_hit";
    /**BOSS6(腐败巨兽)的技能2 */
    GameEffectId[GameEffectId["boss6_skill2"] = 50611] = "boss6_skill2";
    /**BOSS6(腐败巨兽)的技能2命中 */
    GameEffectId[GameEffectId["boss6_skill2_hit"] = 50612] = "boss6_skill2_hit";
    /**BOSS7(船长)普通攻击子弹 */
    GameEffectId[GameEffectId["boss7_attack_bullect"] = 50701] = "boss7_attack_bullect";
    /**BOSS7(船长)普通攻击子弹命中 */
    GameEffectId[GameEffectId["boss7_attack_bullect_hit"] = 50702] = "boss7_attack_bullect_hit";
    /**BOSS7(船长)技能炮弹 */
    GameEffectId[GameEffectId["boss7_skill_bullect"] = 50711] = "boss7_skill_bullect";
    /**BOSS7(船长)技能炮弹命中 */
    GameEffectId[GameEffectId["boss7_skill_bullect_hit"] = 50712] = "boss7_skill_bullect_hit";
    /**BOSS8(沙虫)普攻攻击 */
    GameEffectId[GameEffectId["boss8_attack_bullect"] = 50801] = "boss8_attack_bullect";
    /**BOSS8(沙虫)普通攻击命中 */
    GameEffectId[GameEffectId["boss8_attack_bullect_hit"] = 50802] = "boss8_attack_bullect_hit";
    /**BOSS8(沙虫)技能炮弹 */
    GameEffectId[GameEffectId["boss8_skill_bullect"] = 50811] = "boss8_skill_bullect";
    /**BOSS8(沙虫)技能炮弹命中 */
    GameEffectId[GameEffectId["boss8_skill_bullect_hit"] = 50812] = "boss8_skill_bullect_hit";
    /**BOSS9(兰博)普攻攻击 */
    GameEffectId[GameEffectId["boss9_attack_bullect"] = 50901] = "boss9_attack_bullect";
    /**BOSS9(兰博)普通攻击命中 */
    GameEffectId[GameEffectId["boss9_attack_bullect_hit"] = 50902] = "boss9_attack_bullect_hit";
    /**BOSS9(兰博)喷火 */
    GameEffectId[GameEffectId["boss9_skill2_penhuo"] = 50911] = "boss9_skill2_penhuo";
    /**BOSS9(兰博)护盾 */
    GameEffectId[GameEffectId["boss9_skill3_hudun"] = 50921] = "boss9_skill3_hudun";
    /**BOSS9(兰博)过载-冒烟 */
    GameEffectId[GameEffectId["boss9_skill3_maoyan"] = 50931] = "boss9_skill3_maoyan";
    /**BOSS9(兰博)过载-爆裂 */
    GameEffectId[GameEffectId["boss9_skill3_baolie"] = 50932] = "boss9_skill3_baolie";
    /**BOSS10(熔岩巨兽)的普通攻击 */
    GameEffectId[GameEffectId["boss10_attack"] = 51001] = "boss10_attack";
    /**BOSS10(熔岩巨兽)的普通攻击命中 */
    GameEffectId[GameEffectId["boss10_attack_hit"] = 51002] = "boss10_attack_hit";
    /**BOSS10(熔岩巨兽)的技能2 */
    GameEffectId[GameEffectId["boss10_skill2_0"] = 51011] = "boss10_skill2_0";
    /**BOSS10(熔岩巨兽)的技能2命中 */
    GameEffectId[GameEffectId["boss10_skill2_hit"] = 51012] = "boss10_skill2_hit";
    //---------------------------------------宠物---------------------------------------------------
    /**宠物普通攻击1-直线 */
    GameEffectId[GameEffectId["pet_attackt_line_1"] = 30001] = "pet_attackt_line_1";
    /**宠物普通攻击2-曲线 */
    GameEffectId[GameEffectId["pet_attackt_curve_1"] = 30002] = "pet_attackt_curve_1";
    /**宠物曲线拖尾特效 */
    GameEffectId[GameEffectId["pet_attackt_tuowei_2"] = 30004] = "pet_attackt_tuowei_2";
    /**宠物攻击命中特效1-爆炸 */
    GameEffectId[GameEffectId["pet_attackt_hit_1"] = 30005] = "pet_attackt_hit_1";
    /**宠物攻击命中特效2-地面 */
    GameEffectId[GameEffectId["pet_attackt_hit_2"] = 30006] = "pet_attackt_hit_2";
    /**宠物普通攻击1-直线-命中特效 */
    GameEffectId[GameEffectId["pet_attack_line_hit"] = 30007] = "pet_attack_line_hit";
    /**宠物普通攻击3-曲线 */
    GameEffectId[GameEffectId["pet_attackt_curve_3"] = 30008] = "pet_attackt_curve_3";
    /**宠物曲线拖尾尾烟特效 */
    GameEffectId[GameEffectId["pet_attackt_tuowei_3"] = 30009] = "pet_attackt_tuowei_3";
    /**宠物攻击命中特效3-爆炸 */
    GameEffectId[GameEffectId["pet_attackt_hit_3"] = 30010] = "pet_attackt_hit_3";
    /**宠物攻击命中特效3-地面 */
    GameEffectId[GameEffectId["pet_attackt_hit_4"] = 30011] = "pet_attackt_hit_4";
    /**冰宠物的攻击 */
    GameEffectId[GameEffectId["pet1_attack"] = 30101] = "pet1_attack";
    /**冰宠物的命中 */
    GameEffectId[GameEffectId["pet1_attack_hit"] = 30102] = "pet1_attack_hit";
    /**火宠物的普攻攻击 */
    GameEffectId[GameEffectId["pet2_attack"] = 30201] = "pet2_attack";
    /**火宠物的普攻命中 */
    GameEffectId[GameEffectId["pet2_attack_hit"] = 30202] = "pet2_attack_hit";
    /**火宠物的技能-火堆 */
    GameEffectId[GameEffectId["pet2_skill"] = 30211] = "pet2_skill";
    /**风宠物的技能-背后 */
    GameEffectId[GameEffectId["pet3_skill_back"] = 30311] = "pet3_skill_back";
    /**风宠物的技能-前 */
    GameEffectId[GameEffectId["pet3_skill_front"] = 30312] = "pet3_skill_front";
    /**雷宠物的普通攻击 */
    GameEffectId[GameEffectId["pet4_skill"] = 30401] = "pet4_skill";
    //---------------------------------------字体---------------------------------------------------
    GameEffectId[GameEffectId["front_normal_attack_text_1"] = 40001] = "front_normal_attack_text_1";
    GameEffectId[GameEffectId["front_normal_attack_text_2"] = 40002] = "front_normal_attack_text_2";
    GameEffectId[GameEffectId["front_normal_attack_text_3"] = 40003] = "front_normal_attack_text_3";
    GameEffectId[GameEffectId["front_normal_attack_text_4"] = 40004] = "front_normal_attack_text_4";
    GameEffectId[GameEffectId["front_normal_attack_text_5"] = 40005] = "front_normal_attack_text_5";
    GameEffectId[GameEffectId["front_restore_text"] = 40006] = "front_restore_text";
    GameEffectId[GameEffectId["front_crit_text"] = 40007] = "front_crit_text";
    /**怪物潮警告 */
    GameEffectId[GameEffectId["ui_monster_warning"] = 41001] = "ui_monster_warning";
    //游戏内道具
    /**阴影 */
    GameEffectId[GameEffectId["shadow"] = 500000] = "shadow";
    GameEffectId[GameEffectId["drop_coin"] = 500001] = "drop_coin";
    GameEffectId[GameEffectId["drop_gem"] = 500002] = "drop_gem";
    GameEffectId[GameEffectId["drop_gem_shadow"] = 500003] = "drop_gem_shadow";
    GameEffectId[GameEffectId["drop_coin_shadow"] = 500004] = "drop_coin_shadow";
})(GameEffectId = exports.GameEffectId || (exports.GameEffectId = {}));
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
//负责子弹的生成-销毁
var GameEffectsManager = /** @class */ (function (_super) {
    __extends(GameEffectsManager, _super);
    function GameEffectsManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameEffectsManager_1 = GameEffectsManager;
    GameEffectsManager.getInstance = function () {
        return this._instance;
    };
    GameEffectsManager.prototype.onLoad = function () {
        GameEffectsManager_1._instance = this;
        _super.prototype.onLoad.call(this);
        this.addEffectPoolById(GameEffectId.shadow, 32);
    };
    GameEffectsManager.prototype.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
        GameEffectsManager_1._instance = null;
    };
    /**
     *
     * @param id 游戏特效id
     * @param path 特效文件预制体所在的路径
     * @param initCount 初始化的数量
     */
    GameEffectsManager.prototype.addEffectPoolByPath = function (id, path, initCount) {
        if (initCount === void 0) { initCount = 4; }
        _super.prototype.addNodePool.call(this, id, path, initCount);
    };
    /**
     *
     * @param id 游戏特效id
     * @param initCount 初始化的数量
     */
    GameEffectsManager.prototype.addEffectPoolById = function (id, initCount, loadCallback) {
        if (initCount === void 0) { initCount = 4; }
        var path = "effects/game/" + id;
        return _super.prototype.addNodePool.call(this, id, path, initCount, loadCallback);
    };
    /**根据id创建一个特效*/
    GameEffectsManager.prototype.createGameEffectById = function (id, pos, endCallback) {
        var node = _super.prototype.getNodeById.call(this, id);
        //test
        if (node == null) {
            cc.error(id);
        }
        this.node.addChild(node);
        node.setPosition(pos);
        this.dealAnimation(id, node, endCallback);
        return node;
    };
    /**根据id创建一个特效*/
    GameEffectsManager.prototype.createGameEffectForParent = function (id, pos, parent, endCallback, isDelay) {
        if (isDelay === void 0) { isDelay = false; }
        var node = _super.prototype.getNodeById.call(this, id);
        node.name = id.toString();
        parent.addChild(node);
        node.setPosition(pos);
        node.setSiblingIndex(id);
        this.dealAnimation(id, node, endCallback);
        return node;
    };
    /**根据id，节点回收一个特效*/
    GameEffectsManager.prototype.destroyGameEffectById = function (id, node) {
        _super.prototype.destroyNode.call(this, id, node);
        //node.removeFromParent();
    };
    GameEffectsManager.prototype.removeAllEffect = function () {
        this.node.removeAllChildren();
    };
    /**处理各自对应的特效 */
    GameEffectsManager.prototype.dealAnimation = function (id, node, endCallback) {
        var _this = this;
        switch (id) {
            //播放结束后直接回收
            case GameEffectId.monster_normal_att:
            case GameEffectId.sheshou_jianshi_att_hit:
            case GameEffectId.sheshou_attack_ctrl_hit:
            case GameEffectId.paoshou_paodan_hit:
            case GameEffectId.paoshou_skill_hit:
            case GameEffectId.deluyi_att_hit:
            case GameEffectId.deluyi_att_baoji:
            case GameEffectId.boss3_att_end:
            case GameEffectId.boss2_att_end:
            case GameEffectId.boss2_skill_end:
            case GameEffectId.boss1_att_end:
            case GameEffectId.monster_far_att_hit:
            case GameEffectId.shou_wang_jianshi_skill1_hit:
            case GameEffectId.boss1_normal_att_hit:
            case GameEffectId.boss1_normal_skill_hit:
            case GameEffectId.lei_shen_skill_ground:
            case GameEffectId.lei_shen_skill_sky:
            case GameEffectId.boss2_normal_att_hit1:
            case GameEffectId.boss2_normal_skill_hit:
            case GameEffectId.boss2_normal_skill:
            case GameEffectId.monster19_youling_skill_hit:
            case GameEffectId.monster_die:
            case GameEffectId.boss3_normal_attack_hit:
            case GameEffectId.boss3_skill_1_hit:
            case GameEffectId.boss3_skill_2_hit:
            case GameEffectId.monster_zhiliao_halo_hit:
            case GameEffectId.monster65_shuangjuren_att_hit:
            case GameEffectId.monster65_shuangjuren_att_hit_crit:
            case GameEffectId.zhen_de_attack_hit:
            case GameEffectId.zhen_de_beidong_skill:
            case GameEffectId.zhen_de_active_skill_2:
            case GameEffectId.bing_nv_attack_hit:
            case GameEffectId.bing_nv_beidong_skill_hit:
            case GameEffectId.boss4_normal_attack_hit:
            case GameEffectId.monster67_shuijingyoulong_att_hit:
            case GameEffectId.monster68_niujiangjun_skill:
            case GameEffectId.a_nu_bi_si_attack_hit:
            case GameEffectId.a_nu_bi_si_beidong_skill_1:
            case GameEffectId.kuangzhanshi_attack_hit:
            case GameEffectId.kuangzhanshi_attack_chuantou:
            case GameEffectId.boss5_normal_attack_hit:
            case GameEffectId.boss5_skill_baozha:
            case GameEffectId.boss5_skill_release:
            case GameEffectId.pet1_attack_hit:
            case GameEffectId.pet2_attack_hit:
            case GameEffectId.a_nu_bi_si_active_skill_ring:
            case GameEffectId.mei_mo_attack_hit:
            case GameEffectId.mei_mo_beidong_skill1_baozha:
            case GameEffectId.mei_mo_zhudong_skill_baozha:
            case GameEffectId.mei_mo_beidong_skill2_hit:
            case GameEffectId.mei_mo_zhudong_skill_gound:
            case GameEffectId.boss6_attack_hit:
            case GameEffectId.boss6_skill2_hit:
            case GameEffectId.boss7_attack_bullect_hit:
            case GameEffectId.boss7_skill_bullect_hit:
            case GameEffectId.boss8_attack_bullect_hit:
            case GameEffectId.boss8_skill_bullect_hit:
            case GameEffectId.nvwu_attack_bullect_hit:
            case GameEffectId.nvwu_active_skill:
            case GameEffectId.boss9_skill3_baolie:
            case GameEffectId.boss9_attack_bullect_hit:
            case GameEffectId.boss10_attack_hit:
            case GameEffectId.boss10_skill2_hit:
            case GameEffectId.monster78_skill_bullect_hit:
            case GameEffectId.lei_shen_shandian_hit:
            case GameEffectId.bing_nv_beidong_skill_create:
            case GameEffectId.deluyi_skill_beidong_create:
            case GameEffectId.monster37_shitouren:
                {
                    var animation_1 = node.getComponent(cc.Animation);
                    animation_1.play();
                    animation_1.on(cc.Animation.EventType.FINISHED, function () {
                        animation_1.off(cc.Animation.EventType.FINISHED);
                        _this.destroyGameEffectById(id, node);
                        if (endCallback) {
                            endCallback();
                        }
                    });
                }
                break;
        }
    };
    var GameEffectsManager_1;
    GameEffectsManager._instance = null;
    GameEffectsManager = GameEffectsManager_1 = __decorate([
        ccclass
    ], GameEffectsManager);
    return GameEffectsManager;
}(MapNodePool_1.default));
exports.GameEffectsManager = GameEffectsManager;

cc._RF.pop();