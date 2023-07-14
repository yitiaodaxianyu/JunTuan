
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Game/GameEffectsManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcR2FtZVxcR2FtZUVmZmVjdHNNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBd0M7QUFFeEMsSUFBWSxZQXFaWDtBQXJaRCxXQUFZLFlBQVk7SUFDcEIsT0FBTztJQUNQLCtDQUFNLENBQUE7SUFDTixpQkFBaUI7SUFDakIsMkVBQW9CLENBQUE7SUFDcEIsWUFBWTtJQUNaLHFEQUFTLENBQUE7SUFDVCxjQUFjO0lBQ2Qsd0VBQW1CLENBQUE7SUFDbkIsY0FBYztJQUNkLG9FQUFpQixDQUFBO0lBQ2pCLGNBQWM7SUFDZCxrRUFBZ0IsQ0FBQTtJQUNoQixhQUFhO0lBQ2IsOEVBQXNCLENBQUE7SUFDdEIsWUFBWTtJQUNaLDBFQUFvQixDQUFBO0lBQ3BCLGVBQWU7SUFDZiwrRUFBdUIsQ0FBQTtJQUN2QixpQkFBaUI7SUFDakIsbUZBQXlCLENBQUE7SUFDekIsb0JBQW9CO0lBQ3BCLHVGQUEyQixDQUFBO0lBQzNCLG1CQUFtQjtJQUNuQix1RkFBMkIsQ0FBQTtJQUMzQixxQkFBcUI7SUFDckIsbUdBQWlDLENBQUE7SUFDakMsbUdBQWlDLENBQUE7SUFDakMsbUdBQWlDLENBQUE7SUFDakMsZ0JBQWdCO0lBQ2hCLFlBQVk7SUFDWiw2RUFBc0IsQ0FBQTtJQUN0QixZQUFZO0lBQ1osaUZBQXdCLENBQUE7SUFDeEIsaUJBQWlCO0lBQ2pCLDJFQUFxQixDQUFBO0lBQ3JCLDJCQUEyQjtJQUMzQixlQUFlO0lBQ2YsdUZBQTJCLENBQUE7SUFDM0IsaUJBQWlCO0lBQ2pCLDZFQUFzQixDQUFBO0lBQ3RCLGVBQWU7SUFDZix1RUFBbUIsQ0FBQTtJQUNuQixlQUFlO0lBQ2YscUZBQTBCLENBQUE7SUFDMUIsZUFBZTtJQUNmLHFGQUEwQixDQUFBO0lBQzFCLCtGQUErQixDQUFBO0lBQy9CLGFBQWE7SUFDYix5RkFBNEIsQ0FBQTtJQUM1QixZQUFZ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LDRCQUFTLEdBQXVCLElBQUksQ0FBQztJQUgzQyxrQkFBa0I7UUFEOUIsT0FBTztPQUNLLGtCQUFrQixDQWtLOUI7SUFBRCx5QkFBQztDQWxLRCxBQWtLQyxDQWxLdUMscUJBQVcsR0FrS2xEO0FBbEtZLGdEQUFrQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBNYXBOb2RlUG9vbCBmcm9tIFwiLi9NYXBOb2RlUG9vbFwiO1xyXG5cclxuZXhwb3J0IGVudW0gR2FtZUVmZmVjdElke1xyXG4gICAgLyoq5pegICovXHJcbiAgICBOdWxsPTAsXHJcbiAgICAvKirov5HmiJjmgKrnianpgJrnlKjnmoTmlLvlh7vnibnmlYggKi9cclxuICAgIG1vbnN0ZXJfbm9ybWFsX2F0dD0xLFxyXG4gICAgLyoq55yp5pmV6YCa55So54m55pWIICovXHJcbiAgICB4dWFueXVuPTIsXHJcbiAgICAvKiroi7Hpm4TmjIfnpLrlmagt5ZyG5b2iICovXHJcbiAgICBza2lsbF90aXBfY2lyY2xlPTExLFxyXG4gICAgLyoq6Iux6ZuE5oyH56S65ZmoLeefqeW9oiAqL1xyXG4gICAgc2tpbGxfdGlwX3JlY3Q9MTIsXHJcbiAgICAvKiroi7Hpm4TmjIfnpLrlmagt5pa55ZCRICovXHJcbiAgICBza2lsbF90aXBfZGlyPTEzLFxyXG4gICAgLyoq6Iux6ZuE5Lyk5a6z6K6w5b2V5ZmoICovXHJcbiAgICBza2lsbF9kYW1hZ2VfcmVjb3JkPTIwLFxyXG4gICAgLyoq6Iux6ZuE6YCa55So6JOE5YqbICovXHJcbiAgICBoZXJvX3NraWxsX2NvbW1vbj05OSxcclxuICAgIC8qKuWwhOaJi+aZrumAmuaUu+WHu+eahOeureefoiAqL1xyXG4gICAgc2hlc2hvdV9qaWFuc2hpX2F0dD0xMDEsXHJcbiAgICAvKirlsITmiYvooqvliqjmioDog73mlLvlh7vnmoTnrq3nn6IgKi9cclxuICAgIHNoZXNob3VfamlhbnNoaV9za2lsbD0xMDIsXHJcbiAgICAvKirlsITmiYvmma7pgJrmlLvlh7vmmrTlh7vlkb3kuK3lkI7nmoTnibnmlYggKi9cclxuICAgIHNoZXNob3VfYXR0YWNrX2N0cmxfaGl0PTEwMyxcclxuICAgIC8qKuWwhOaJi+aZrumAmuaUu+WHu+eureefouWRveS4reeahOeJueaViCAqL1xyXG4gICAgc2hlc2hvdV9qaWFuc2hpX2F0dF9oaXQ9MTExLFxyXG4gICAgLyoq5bCE5omL5aSn5oub6JOE5YqbL+WPkeWwhC/lkb3kuK0v54m55pWIICovXHJcbiAgICBzaGVzaG91X2ppYW5zaGlfc3VwZXJfc2tpbGxfMT0xMjEsXHJcbiAgICBzaGVzaG91X2ppYW5zaGlfc3VwZXJfc2tpbGxfMj0xMjIsXHJcbiAgICBzaGVzaG91X2ppYW5zaGlfc3VwZXJfc2tpbGxfMz0xMjMsXHJcbiAgICAvKirlsITmiYvlpKfmi5vnp7vliqjnrq3nn6LnibnmlYggKi9cclxuICAgIC8qKueCruaJi+aZrumAmueCruW8uSAqL1xyXG4gICAgcGFvc2hvdV9wYW9kYW5fYXR0PTIwMSxcclxuICAgIC8qKueCruaJi+aKgOiDveeCruW8uSAqL1xyXG4gICAgcGFvc2hvdV9wYW9kYW5fc2tpbGw9MjAyLFxyXG4gICAgLyoq54Ku5omL54Ku5by56JC95Zyw54iG54K455qE54m55pWIICovXHJcbiAgICBwYW9zaG91X3NraWxsX2hpdD0yMDMsXHJcbiAgICAvL3Bhb3Nob3VfcGFvZGFuX2x1b2RpPTIwMyxcclxuICAgIC8qKueCruaJi+S4k+atpuaKgOiDveeahOeCruW8uSAqL1xyXG4gICAgcGFvc2hvdV9wYW9kYW5fc2tpbGxfZXg9MjA0LFxyXG4gICAgLyoq54Ku5omL54Ku5by55ZG95Lit54iG54K455qE54m55pWIICovXHJcbiAgICBwYW9zaG91X3Bhb2Rhbl9oaXQ9MjExLFxyXG4gICAgLyoq54Ku5omL6KKr5Yqo5oqA6IO9MueJueaViCAqL1xyXG4gICAgcGFvc2hvdV9za2lsbF8yPTIyMSxcclxuICAgIC8qKueCruaJi+iiq+WKqOaKgOiDvTLnibnmlYggKi9cclxuICAgIHBhb3Nob3VfYWN0aXZlX3NraWxsXzE9MjMxLFxyXG4gICAgLyoq54Ku5omL6KKr5Yqo5oqA6IO9MueJueaViCAqL1xyXG4gICAgcGFvc2hvdV9hY3RpdmVfc2tpbGxfMj0yMzIsXHJcbiAgICBwYW9zaG91X2FjdGl2ZV9za2lsbF90b3VkYW49MjMzLFxyXG4gICAgLyoq54Ku5omL5aSn5oub5L+h5Y+35by5ICovXHJcbiAgICBwYW9zaG91X2Rhemhhb194aW5oYW9kYW49MjQxLFxyXG4gICAgLyoq54Ku5omL5aSn5oub5bC+54OfICovXHJcbiAgICBwYW9zaG91X2Rhemhhb193ZWl5YW49MjQyLFxyXG4gICAgLyoq54Ku5omL5aSn5oub5L+h5Y+35by56JC95Zyw5ZCO55qE556E5YeG5pWI5p6cICovXHJcbiAgICBwYW9zaG91X2Rhemhhb194aW5oYW9kYW5fbWlhb3podW49MjQzLFxyXG4gICAgLyoq54Ku5omL5aSn5oubLeS/oeWPt+W8ueiQveWcsOe7k+adn+WQjueahOWwvueDnyAqL1xyXG4gICAgcGFvc2hvdV9kYXpoYW9fd2VpeWFuX2VuZD0yNDQsXHJcbiAgICAvKirlpbPlt6vnmoTmma7pgJrmlLvlh7sgKi9cclxuICAgIG52d3VfYXR0YWNrX2J1bGxlY3Q9MzAxLFxyXG4gICAgLyoq5aWz5ber55qE5pmu6YCa5pS75Ye75ZG95LitICovXHJcbiAgICBudnd1X2F0dGFja19idWxsZWN0X2hpdD0zMDIsXHJcbiAgICAvKirlpbPlt6vnmoTkuLvliqjmioDog70gKi9cclxuICAgIG52d3VfYWN0aXZlX3NraWxsPTMxMSxcclxuICAgIC8qKuW+t+mygeS8iuaZrumAmuaUu+WHu+mjnuW8uSAqL1xyXG4gICAgZGVsdXlpX2F0dD00MDEsXHJcbiAgICAvKirlvrfpsoHkvIrmma7pgJrmlLvlh7vlkb3kuK3nibnmlYggKi9cclxuICAgIGRlbHV5aV9hdHRfaGl0PTQwMixcclxuICAgIC8qKuW+t+mygeS8iuiiq+WKqOaUu+WHu+eahOaatOWHu+eJueaViCAqL1xyXG4gICAgZGVsdXlpX2F0dF9iYW9qaT00MDMsXHJcbiAgICAvKirlvrfpsoHkvIrooqvliqjmlLvlh7vmmrTlh7vnmoTolJPol6TnnKnmmZUgKi9cclxuICAgIGRlbHV5aV9za2lsbF9tYW50ZW5nPTQwNCxcclxuICAgIC8qKuW+t+mygeS8iuiiq+WKqOinpuWPkeeahOeJueaViCAqL1xyXG4gICAgZGVsdXlpX3NraWxsX2JlaWRvbmdfY3JlYXRlPTQwNSxcclxuICAgIC8qKuW+t+mygeS8iuS4u+WKqOaKgOiDveeJueaViCAqL1xyXG4gICAgZGVsdXlpX2FjdGl2ZV9za2lsbD00MTEsXHJcbiAgICAvKirlvrfpsoHkvIrkuLvliqjmioDog73lkb3kuK3nibnmlYggKi9cclxuICAgIGRlbHV5aV9hY3RpdmVfc2tpbGxfaGl0PTQxMixcclxuICAgIC8qKueLguaImOWjq+aZrumAmuaUu+WHuyAqL1xyXG4gICAga3Vhbmd6aGFuc2hpX2F0dGFjaz01MDEsXHJcbiAgICAvKirni4LmiJjlo6vmma7pgJrmlLvlh7st5ZG95LitICovXHJcbiAgICBrdWFuZ3poYW5zaGlfYXR0YWNrX2hpdD01MDIsXHJcbiAgICAvKirni4LmiJjlo6vmma7pgJrmlLvlh7st56m/6YCPICovXHJcbiAgICBrdWFuZ3poYW5zaGlfYXR0YWNrX2NodWFudG91PTUwMyxcclxuICAgIC8qKueLguaImOWjq+iiq+WKqOacgOWkp+WxgueahOaWp+WktOaUu+WHuyAqL1xyXG4gICAga3Vhbmd6aGFuc2hpX2F0dGFja19tYXg9NTA0LFxyXG4gICAgLyoq6LSe5b635pmu6YCa5pS75Ye7ICovXHJcbiAgICB6aGVuX2RlX2F0dGFjaz02MDEsXHJcbiAgICAvKirotJ7lvrfmma7pgJrmlLvlh7vlkb3kuK0gKi9cclxuICAgIHpoZW5fZGVfYXR0YWNrX2hpdD02MDIsXHJcbiAgICAvKirotJ7lvrfooqvliqjmioDog70yICovXHJcbiAgICB6aGVuX2RlX2JlaWRvbmdfc2tpbGw9NjExLFxyXG4gICAgLyoq6LSe5b636KKr5Yqo5oqA6IO9MSAqL1xyXG4gICAgemhlbl9kZV9iZWlkb25nX3NraWxsX3dhbGw9NjEyLFxyXG4gICAgLyoq6LSe5b635Li75Yqo5oqA6IO9MS0xICovXHJcbiAgICB6aGVuX2RlX2FjdGl2ZV9za2lsbF8xPTYyMSxcclxuICAgIC8qKui0nuW+t+S4u+WKqOaKgOiDvTEtMiAqL1xyXG4gICAgemhlbl9kZV9hY3RpdmVfc2tpbGxfMj02MjIsXHJcbiAgICAvKirotJ7lvrfkuLvliqjmioDog70xLTMgKi9cclxuICAgIHpoZW5fZGVfYWN0aXZlX3NraWxsXzM9NjIzLFxyXG4gICAgLyoq5YW9546L5pmu6YCa5pS75Ye755qE566t55+iICovXHJcbiAgICBzaG91X3dhbmdfamlhbnNoaV9hdHRhY2s9NzAxLFxyXG4gICAgLyoq5YW9546L6KKr5Yqo5oqA6IO9MeeahOeureefoiznqb/pgI8gKi9cclxuICAgIHNob3Vfd2FuZ19qaWFuc2hpX3NraWxsMT03MDIsXHJcbiAgICAvKirlhb3njovooqvliqjmioDog70x55qE566t55+iLOepv+mAj+eJueaViCAqL1xyXG4gICAgc2hvdV93YW5nX2ppYW5zaGlfc2tpbGwxX2hpdD03MDMsXHJcbiAgICAvKirplb/nn5vmiYvnmoTmma7pgJrmlLvlh7sgKi9cclxuICAgIGNoYW5nX21hb19zaG91X2F0dGFjaz04MDEsXHJcbiAgICAvKirplb/nn5vmiYvnmoTmma7pgJrmlLvlh7vlkb3kuK0gKi9cclxuICAgIGNoYW5nX21hb19zaG91X2F0dGFja19oaXQ9ODAyLFxyXG4gICAgLyoq6ZW/55+b5omL55qE6KKr5Yqo5oqA6IO9LeeIquWtkCAqL1xyXG4gICAgY2hhbmdfbWFvX3Nob3Vfc2tpbGxfemh1YXppPTgwMyxcclxuICAgIC8qKumVv+efm+aJi+eahOS4u+WKqOaKgOiDvWJ1ZmYgKi9cclxuICAgIGNoYW5nX21hb19zaG91X3NraWxsX2FjdGl2ZV8xPTgxMSxcclxuICAgIC8qKumVv+efm+aJi+eahOS4u+WKqOaKgOiDvWJ1ZmYgKi9cclxuICAgIGNoYW5nX21hb19zaG91X3NraWxsX2FjdGl2ZV8yPTgxMixcclxuICAgIC8qKuWGsOWls+eahOaZrumAmuaUu+WHuyAqL1xyXG4gICAgYmluZ19udl9hdHRhY2s9OTAxLFxyXG4gICAgLyoq5Yaw5aWz55qE5pmu6YCa5pS75Ye7ICovXHJcbiAgICBiaW5nX252X2F0dGFja19oaXQ9OTAyLFxyXG4gICAgLyoq5Yaw5aWz55qE6KKr5Yqo5oqA6IO96Kem5Y+R55qE54iG54K454m55pWIICovXHJcbiAgICBiaW5nX252X2JlaWRvbmdfc2tpbGxfY3JlYXRlPTkxMCxcclxuICAgIC8qKuWGsOWls+eahOiiq+WKqOaKgOiDveaUu+WHuyAqL1xyXG4gICAgYmluZ19udl9iZWlkb25nX3NraWxsPTkxMSxcclxuICAgIC8qKuWGsOWls+eahOiiq+WKqOaKgOiDveaUu+WHu+WRveS4rSAqL1xyXG4gICAgYmluZ19udl9iZWlkb25nX3NraWxsX2hpdD05MTIsXHJcbiAgICAvKirlhrDlpbPnmoTooqvliqjmioDog70y5pS75Ye7ICovXHJcbiAgICBiaW5nX252X2JlaWRvbmdfc2tpbGxfMj05MTMsXHJcbiAgICAvKirlhrDlpbPnmoTkuLvliqjmioDog73nmoTlhrDlopkgKi9cclxuICAgIGJpbmdfbnZfYWN0aXZlX3NraWxsX3dhbGw9OTIyLFxyXG4gICAgLyoq6Zi/5Yqq5q+U5pav55qE5pmu6YCa5pS75Ye7ICovXHJcbiAgICBhX251X2JpX3NpX2F0dGFjaz0xMDAxLFxyXG4gICAgLyoq6Zi/5Yqq5q+U5pav55qE5pmu6YCa5pS75Ye75ZG95LitICovXHJcbiAgICBhX251X2JpX3NpX2F0dGFja19oaXQ9MTAwMixcclxuICAgIC8qKumYv+WKquavlOaWr+iiq+WKqDEgKi9cclxuICAgIGFfbnVfYmlfc2lfYmVpZG9uZ19za2lsbF8xPTEwMTEsXHJcbiAgICAvKirpmL/liqrmr5Tmlq/ooqvliqgyICovXHJcbiAgICBhX251X2JpX3NpX2JlaWRvbmdfc2tpbGxfMj0xMDEyLFxyXG4gICAgLyoq6Zi/5Yqq5q+U5pav5Li75YqoMSAqL1xyXG4gICAgYV9udV9iaV9zaV9hY3RpdmVfc2tpbGxfMT0xMDIxLFxyXG4gICAgLyoq6Zi/5Yqq5q+U5pav5Li75Yqo6aOOICovXHJcbiAgICBhX251X2JpX3NpX2FjdGl2ZV9za2lsbF93aW5kPTEwMjIsXHJcbiAgICAvKirpmL/liqrmr5Tmlq/kuLvliqjnur8gKi9cclxuICAgIGFfbnVfYmlfc2lfYWN0aXZlX3NraWxsX2xpbmU9MTAyMyxcclxuICAgIC8qKumYv+WKquavlOaWr+S4u+WKqOWciCAqL1xyXG4gICAgYV9udV9iaV9zaV9hY3RpdmVfc2tpbGxfcmluZz0xMDI0LFxyXG4gICAgLyoq6a2F6a2U5pmu6YCa5pS75Ye754m55pWIICovXHJcbiAgICBtZWlfbW9fYXR0YWNrPTExMDEsXHJcbiAgICAvKirprYXprZTmma7pgJrmlLvlh7vlkb3kuK3nibnmlYggKi9cclxuICAgIG1laV9tb19hdHRhY2tfaGl0PTExMDIsXHJcbiAgICAvKirprYXprZTooqvliqjmioDog70x54iG54K45pWI5p6cICovXHJcbiAgICBtZWlfbW9fYmVpZG9uZ19za2lsbDFfYmFvemhhPTExMTEsXHJcbiAgICAvKirprYXprZTooqvliqjmioDog70x54iG54K45ZCO55qE5pS76YCfICovXHJcbiAgICBtZWlfbW9fYmVpZG9uZ19za2lsbDFfZ29uZ3N1PTExMTIsXHJcbiAgICAvKirprYXprZTooqvliqjmioDog70y5ZG95LitICovXHJcbiAgICBtZWlfbW9fYmVpZG9uZ19za2lsbDJfaGl0PTExMTMsXHJcbiAgICAvKirprYXprZTkuLvliqjmioDog73lkb3kuK0gKi9cclxuICAgIG1laV9tb196aHVkb25nX3NraWxsX2hlcm89MTEyMSxcclxuICAgIC8qKumthemtlOS4u+WKqOaKgOiDveWRveS4rSAqL1xyXG4gICAgbWVpX21vX3podWRvbmdfc2tpbGxfZ291bmQ9MTEyMixcclxuICAgIC8qKumthemtlOS4u+WKqOaKgOiDveWRveS4rSAqL1xyXG4gICAgbWVpX21vX3podWRvbmdfc2tpbGxfYmFvemhhPTExMjMsXHJcbiAgICAvKirprYXprZTkuLvliqjmioDog73lkb3kuK0gKi9cclxuICAgIG1laV9tb196aHVkb25nX3NraWxsX21vbnN0ZXI9MTEyNCxcclxuICAgIC8qKumbt+elnuaZrumAmueahOmXqueUteeJueaViCAqL1xyXG4gICAgbGVpX3NoZW5fc2hhbmRpYW49MTIwMSxcclxuICAgIC8qKumbt+elnuaZrumAmueahOmXqueUteWRveS4reeahOeJueaViCAqL1xyXG4gICAgbGVpX3NoZW5fc2hhbmRpYW5faGl0PTEyMDIsXHJcbiAgICAvKirpm7fnpZ7lpKfmi5vnmoTpl6rnlLUt5Zyw5p2/54m55pWIICovXHJcbiAgICBsZWlfc2hlbl9za2lsbF9ncm91bmQ9MTIxMSxcclxuICAgIC8qKumbt+elnuWkp+aLm+eahOmXqueUtS3nqbrkuK3nibnmlYggKi9cclxuICAgIGxlaV9zaGVuX3NraWxsX3NreT0xMjEyLFxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3ln47lopktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvKirln47lopnnmoTmiqTnm74gKi9cclxuICAgIHdhbGxfc2hpZWxkPTEwMDAxLFxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3mgKrniaktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvKirnrKzkuIDkuKpCT1NT5pS75Ye755qE56e75Yqo54m55pWIICovXHJcbiAgICBib3NzMV9hdHRfbW92ZT0yMDEwMSxcclxuICAgIC8qKuesrOS4gOS4qkJPU1PmlLvlh7vnmoTnu5PmnZ/niIbngrjnibnmlYggKi9cclxuICAgIGJvc3MxX2F0dF9lbmQ9MjAxMDIsXHJcbiAgICAvKirnrKwy5LiqQk9TU+aUu+WHu+eahOe7k+adn+eJueaViCAqL1xyXG4gICAgYm9zczJfYXR0X2VuZD0yMDIwMSxcclxuICAgIC8qKuesrDLkuKpCT1NT5oqA6IO955qE54m55pWIICovXHJcbiAgICBib3NzMl9za2lsbF9tb3ZlPTIwMjAyLFxyXG4gICAgYm9zczJfc2tpbGxfZW5kPTIwMjAzLFxyXG4gICAgLyoq56ysM+S4qkJPU1PmlLvlh7vnmoTnp7vliqjnibnmlYggKi9cclxuICAgIGJvc3MzX2F0dF9tb3ZlPTIwMzAxLFxyXG4gICAgLyoq56ysM+S4qkJPU1PmlLvlh7vnmoTnu5PmnZ/niIbngrjnibnmlYggKi9cclxuICAgIGJvc3MzX2F0dF9lbmQ9MjAzMDIsXHJcbiAgICAvKirnrKwz5LiqQk9TU+aKgOiDveeahOeJueaViCAqL1xyXG4gICAgYm9zczNfc2tpbGxfbW92ZT0yMDMwMyxcclxuICAgIC8qKmJvc3PooYDmnaEgKi9cclxuICAgIGJvc3NfaHA9MjAwMDAsXHJcbiAgICAvKipib3Nz5Ye65Zy65Yqo55S7ICovXHJcbiAgICBib3NzX2NvbWluZz0yMDAwMSxcclxuICAgIC8qKui/nOeoi+aAqueJqemAmueUqOaUu+WHuyAqL1xyXG4gICAgbW9uc3Rlcl9mYXJfYXR0PTIwMDAyLFxyXG4gICAgLyoq6L+c56iL5oCq54mp5pmu6YCa5pS75Ye75ZG95Lit54m55pWIICovXHJcbiAgICBtb25zdGVyX2Zhcl9hdHRfaGl0PTIwMDAzLFxyXG4gICAgLyoq5oCq54mp5q275Lqh54m55pWIICovXHJcbiAgICBtb25zdGVyX2RpZT0yMDAwNCwgIFxyXG4gICAgLyoq5Y+s5ZSk5oCq54mp54m55pWIICovICBcclxuICAgIG1vbnN0ZXJfemhhb2h1YW49MjAwMDUsXHJcbiAgICAvKirmgKrniankuK3mr5LnibnmlYggKi9cclxuICAgIG1vbnN0ZXJfemhvbmdkdT0yMTAwMSxcclxuICAgIC8qKuayu+eWl+WFieeOryAqL1xyXG4gICAgbW9uc3Rlcl96aGlsaWFvX2hhbG89MjEwMDIsXHJcbiAgICAvKirmsrvnlpflhYnnjq/miJDlip/liqDooYAgKi9cclxuICAgIG1vbnN0ZXJfemhpbGlhb19oYWxvX2hpdD0yMTAwMyxcclxuXHJcbiAgICAvKirnsr7oi7HmgKotMTkt5bm954G1LeeahOS4u+WKqOW8leWvvOaKgOiDvSAqL1xyXG4gICAgbW9uc3RlcjE5X3lvdWxpbmdfc2tpbGw9MjE5MDEsXHJcbiAgICAvKirnsr7oi7HmgKotMTkt5bm954G1LeeahOS4u+WKqOaKgOiDveWRveS4rSAqL1xyXG4gICAgbW9uc3RlcjE5X3lvdWxpbmdfc2tpbGxfaGl0PTIxOTAyLFxyXG4gICAgLyoq57K+6Iux5oCqLTMwLeidmeidoO+8iOWgleiQveWkqeS9v++8iS3nmoTooqvliqjlhYnnjq8gKi9cclxuICAgIG1vbnN0ZXIzMF9iaWFuZnVfc2tpbGw9MjMwMDEsXHJcbiAgICAvKirnsr7oi7HmgKotNjUt6Zyc5beo5Lq6LeaZrumAmuaUu+WHuyAqL1xyXG4gICAgbW9uc3RlcjY1X3NodWFuZ2p1cmVuX2F0dD0yNjUwMSxcclxuICAgIC8qKueyvuiLseaAqi02NS3pnJzlt6jkurot5pmu6YCa5pS75Ye75ZG95LitICovXHJcbiAgICBtb25zdGVyNjVfc2h1YW5nanVyZW5fYXR0X2hpdD0yNjUwMixcclxuICAgIC8qKueyvuiLseaAqi02NS3pnJzlt6jkurot5pmu6YCa5pS75Ye75ZG95Lit5bm25pq05Ye7ICovXHJcbiAgICBtb25zdGVyNjVfc2h1YW5nanVyZW5fYXR0X2hpdF9jcml0PTI2NTAzLFxyXG4gICAgLyoq57K+6Iux5oCqLTY3LeawtOaZtuW5vOm+mS3mma7mlLvmlLvlh7sgKi9cclxuICAgIG1vbnN0ZXI2N19zaHVpamluZ3lvdWxvbmdfYXR0PTI2NzAxLFxyXG4gICAgLyoq57K+6Iux5oCqLTY3LeawtOaZtuW5vOm+mS3mma7mlLvmlLvlh7vlkb3kuK0gKi9cclxuICAgIG1vbnN0ZXI2N19zaHVpamluZ3lvdWxvbmdfYXR0X2hpdD0yNjcwMixcclxuICAgIC8qKueyvuiLseaAqi02OC3niZvlpLTlsIblhpst5YWJ546vICovXHJcbiAgICBtb25zdGVyNjhfbml1amlhbmdqdW5fc2tpbGw9MjY4MTEsXHJcbiAgICAvKirnsr7oi7HmgKotNjkt54mb5aS06JCo5ruhLeaZrumAmuaUu+WHuyAqL1xyXG4gICAgbW9uc3RlcjY5X25pdXNhbWFuX2F0dD0yNjkwMSxcclxuICAgIC8qKueyvuiLseaAqi03MC3lt6jlnovlj7LojrHlp4Yt5q275Lqh54iG5by5ICovXHJcbiAgICBtb25zdGVyNzBfc2lsYWltdV9xcT0yNzAwMSxcclxuICAgIC8qKuWwj+aAqi00NC3msLTmmbblrojljast5pmu5pS75pS75Ye7ICovXHJcbiAgICBtb25zdGVyNDRfc2h1aWppbmdzaG91d2VpX2F0dD0yNDQwMSxcclxuICAgIC8qKuWwj+aAqi00Ny3niZvlpLTpo57liIDmiYst5pmu5pS75pS75Ye7ICovXHJcbiAgICBtb25zdGVyNDdfYXR0PTI0NzAxLFxyXG4gICAgLyoq5bCP5oCqLTUzLeW5veeBteaequaJiy3mma7mlLvmlLvlh7sgKi9cclxuICAgIG1vbnN0ZXI1M19hdHQ9MjUzMDEsXHJcbiAgICAvKirnsr7oi7HmgKotNzIt5bm954G15beo54Ku5omLLeaZruaUu+aUu+WHuyAqL1xyXG4gICAgbW9uc3RlcjcyX2F0dD0yNzIwMSxcclxuICAgIC8qKueyvuiLseaAqi03My3lub3ngbXoiLXmiYst5oqA6IO9LemUgemTviAqL1xyXG4gICAgbW9uc3RlcjczX3NraWxsX2xpYW5fcm9vdD0yNzMxMCxcclxuICAgIC8qKueyvuiLseaAqi03My3lub3ngbXoiLXmiYst5oqA6IO9LemUmiAqL1xyXG4gICAgbW9uc3RlcjczX3NraWxsX21hbz0yNzMxMSxcclxuICAgIC8qKueyvuiLseaAqi03My3lub3ngbXoiLXmiYst5oqA6IO9LemTgemTviAqL1xyXG4gICAgbW9uc3RlcjczX3NraWxsX2xpYW49MjczMTIsXHJcbiAgICAvKirnsr7oi7HmgKotNTct6aOO57K+54G1LeaZrumAmuaUu+WHu+eahOmjjiovXHJcbiAgICBtb25zdGVyNTdfYXR0YWNrX3dpbmQ9MjU3MDEsXHJcbiAgICAvKirlsI/mgKotNTgt5L6P5YSS5bel56iL5biILeaZrumAmuaUu+WHu+eahOa/gOWFieW8uSovXHJcbiAgICBtb25zdGVyNThfYXR0YWNrX2J1bGxlY3Q9MjU4MDEsXHJcbiAgICAvKirnsr7oi7HmgKotNzYt55uR552j6ICFLeaZrumAmuaUu+WHu+eahOW8uSovXHJcbiAgICBtb25zdGVyNzZfYXR0YWNrX2J1bGxlY3Q9Mjc2MDEsXHJcbiAgICAvKirnsr7oi7HmgKotNzYt55uR552j6ICFLemAn+W6puWFieeOryovXHJcbiAgICBtb25zdGVyNzZfYXR0YWNrX2d1YW5naHVhbj0yNzYxMSxcclxuICAgIC8qKueyvuiLseaAqi02Mi3ngavnhLDnsr7ngbUt5pmu6YCa5pS75Ye755qE5by5Ki9cclxuICAgIG1vbnN0ZXI2Ml9hdHRhY2tfYnVsbGVjdD0yNjIwMSxcclxuICAgIC8qKueyvuiLseaAqi03OC3nhpTlsqnlt6jkurot5pmu6YCa5pS75Ye755qE5by5Ki9cclxuICAgIG1vbnN0ZXI3OF9hdHRhY2tfYnVsbGVjdD0yNzgwMSxcclxuICAgIC8qKueyvuiLseaAqi03OC3nhpTlsqnlt6jkurot5pmu6YCa5pS75Ye755qE5oqA6IO9Ki9cclxuICAgIG1vbnN0ZXI3OF9za2lsbF9idWxsZWN0PTI3ODExLFxyXG4gICAgLyoq57K+6Iux5oCqLTc4LeeGlOWyqeW3qOS6ui3mma7pgJrmlLvlh7vnmoTmioDog70qL1xyXG4gICAgbW9uc3Rlcjc4X3NraWxsX2J1bGxlY3RfaGl0PTI3ODEyLFxyXG4gICAgLyoq57K+6Iux5oCqIDM3Leefs+WktOS6uuWGsuaSnuWQjueJueaViCAqL1xyXG4gICAgbW9uc3RlcjM3X3NoaXRvdXJlbj0yMzcwMSxcclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tQm9zcy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvKipib3NzMe+8iOWkp+agke+8ieaZrumAmuaUu+WHuyAqL1xyXG4gICAgYm9zczFfbm9ybWFsX2F0dD01MDEwMSxcclxuICAgIC8qKmJvc3Mx77yI5aSn5qCR77yJ5pmu6YCa5pS75Ye75ZG95LitICovXHJcbiAgICBib3NzMV9ub3JtYWxfYXR0X2hpdD01MDEwMixcclxuICAgIC8qKmJvc3Mx77yI5aSn5qCR77yJ5oqA6IO95pS75Ye7ICovXHJcbiAgICBib3NzMV9ub3JtYWxfc2tpbGw9NTAxMTEsXHJcbiAgICAvKipib3NzMe+8iOWkp+agke+8ieaKgOiDveWRveS4rSAqL1xyXG4gICAgYm9zczFfbm9ybWFsX3NraWxsX2hpdD01MDExMixcclxuICAgIC8qKkJPU1MyKOmHkeWIminmma7pgJrmlLvlh7sgKi9cclxuICAgIGJvc3MyX25vcm1hbF9hdHQ9NTAyMDEsXHJcbiAgICAvKipCT1NTMijph5HliJop5pmu6YCa5pS75Ye75ZG95LitMSAqL1xyXG4gICAgYm9zczJfbm9ybWFsX2F0dF9oaXQxPTUwMjAyLFxyXG4gICAgLyoqQk9TUzIo6YeR5YiaKeaZrumAmuaUu+WHu+WRveS4rTIgKi9cclxuICAgIGJvc3MyX25vcm1hbF9hdHRfaGl0Mj01MDIwMyxcclxuICAgIC8qKkJPU1MyKOmHkeWIminmioDog73mlLvlh7sgKi9cclxuICAgIGJvc3MyX25vcm1hbF9za2lsbD01MDIxMSxcclxuICAgIC8qKkJPU1MyKOmHkeWIminmioDog73mlLvlh7vlkb3kuK0gKi9cclxuICAgIGJvc3MyX25vcm1hbF9za2lsbF9oaXQ9NTAyMTIsXHJcbiAgICAvKipCT1NTM++8iOmbquS6uu+8ieeahOaZrumAmuaUu+WHuyAqL1xyXG4gICAgYm9zczNfbm9ybWFsX2F0dGFjaz01MDMwMSxcclxuICAgIC8qKkJPU1Mz77yI6Zuq5Lq677yJ55qE5pmu6YCa5pS75Ye75ZG95LitICovXHJcbiAgICBib3NzM19ub3JtYWxfYXR0YWNrX2hpdD01MDMwMixcclxuICAgIC8qKkJPU1Mz77yI6Zuq5Lq677yJ55qE5oqA6IO9MeaUu+WHuyAqL1xyXG4gICAgYm9zczNfc2tpbGxfMT01MDMxMSxcclxuICAgIC8qKkJPU1Mz77yI6Zuq5Lq677yJ55qE5oqA6IO9MeaUu+WHu+WRveS4rSAqL1xyXG4gICAgYm9zczNfc2tpbGxfMV9oaXQ9NTAzMTIsXHJcbiAgICAvKipCT1NTM++8iOmbquS6uu+8ieeahOaKgOiDvTLnm77niYwgKi9cclxuICAgIGJvc3MzX3NraWxsXzJfZHVucGFpPTUwMzIxLFxyXG4gICAgLyoqQk9TUzPvvIjpm6rkurrvvInnmoTmioDog70y5pS75Ye7ICovXHJcbiAgICBib3NzM19za2lsbF8yPTUwMzIyLFxyXG4gICAgLyoqQk9TUzPvvIjpm6rkurrvvInnmoTmioDog70y5pS75Ye75ZG95LitICovXHJcbiAgICBib3NzM19za2lsbF8yX2hpdD01MDMyMyxcclxuICAgIC8qKkJPU1Mz77yI6Zuq5Lq677yJ55qE5oqA6IO9Mi3pm6rljbAgKi9cclxuICAgIGJvc3MzX3NraWxsXzJfeHVleWluPTUwMzI0LFxyXG4gICAgLyoqQk9TUzTvvIjkuprpvpnvvInnmoTmma7pgJrmlLvlh7vlkb3kuK0gKi9cclxuICAgIGJvc3M0X25vcm1hbF9hdHRhY2tfaGl0PTUwNDAxLFxyXG4gICAgLyoqQk9TUzTvvIjkuprpvpnvvInnmoTmioDog73llrfngasgKi9cclxuICAgIGJvc3M0X25vcm1hbF9za2lsbF9wZW5odW89NTA0MTEsXHJcbiAgICAvKipCT1NTNe+8iOeJm+mtlOeOi++8ieeahOaZrumAmuaUu+WHu+WRveS4rSAqL1xyXG4gICAgYm9zczVfbm9ybWFsX2F0dGFja19oaXQ9NTA1MDEsXHJcbiAgICAvKipCT1NTNe+8iOeJm+mtlOeOi++8ieeahOaKgOiDveeIhueCuCAqL1xyXG4gICAgYm9zczVfc2tpbGxfYmFvemhhPTUwNTExLFxyXG4gICAgLyoqQk9TUzXvvIjniZvprZTnjovvvInnmoTmioDog73ph4rmlL4gKi9cclxuICAgIGJvc3M1X3NraWxsX3JlbGVhc2U9NTA1MTIsXHJcbiAgICAvKipCT1NTNijohZDotKXlt6jlhb0p55qE5pmu6YCa5pS75Ye7ICovXHJcbiAgICBib3NzNl9hdHRhY2s9NTA2MDEsXHJcbiAgICAvKipCT1NTNijohZDotKXlt6jlhb0p55qE5pmu6YCa5pS75Ye75ZG95LitICovXHJcbiAgICBib3NzNl9hdHRhY2tfaGl0PTUwNjAyLFxyXG4gICAgLyoqQk9TUzYo6IWQ6LSl5beo5YW9KeeahOaKgOiDvTIgKi9cclxuICAgIGJvc3M2X3NraWxsMj01MDYxMSxcclxuICAgIC8qKkJPU1M2KOiFkOi0peW3qOWFvSnnmoTmioDog70y5ZG95LitICovXHJcbiAgICBib3NzNl9za2lsbDJfaGl0PTUwNjEyLFxyXG4gICAgLyoqQk9TUzco6Ii56ZW/KeaZrumAmuaUu+WHu+WtkOW8uSAqL1xyXG4gICAgYm9zczdfYXR0YWNrX2J1bGxlY3Q9NTA3MDEsXHJcbiAgICAvKipCT1NTNyjoiLnplb8p5pmu6YCa5pS75Ye75a2Q5by55ZG95LitICovXHJcbiAgICBib3NzN19hdHRhY2tfYnVsbGVjdF9oaXQ9NTA3MDIsXHJcbiAgICAvKipCT1NTNyjoiLnplb8p5oqA6IO954Ku5by5ICovXHJcbiAgICBib3NzN19za2lsbF9idWxsZWN0PTUwNzExLFxyXG4gICAgLyoqQk9TUzco6Ii56ZW/KeaKgOiDveeCruW8ueWRveS4rSAqL1xyXG4gICAgYm9zczdfc2tpbGxfYnVsbGVjdF9oaXQ9NTA3MTIsXHJcbiAgICAvKipCT1NTOCjmspnomasp5pmu5pS75pS75Ye7ICovXHJcbiAgICBib3NzOF9hdHRhY2tfYnVsbGVjdD01MDgwMSxcclxuICAgIC8qKkJPU1M4KOaymeiZqynmma7pgJrmlLvlh7vlkb3kuK0gKi9cclxuICAgIGJvc3M4X2F0dGFja19idWxsZWN0X2hpdD01MDgwMixcclxuICAgIC8qKkJPU1M4KOaymeiZqynmioDog73ngq7lvLkgKi9cclxuICAgIGJvc3M4X3NraWxsX2J1bGxlY3Q9NTA4MTEsXHJcbiAgICAvKipCT1NTOCjmspnomasp5oqA6IO954Ku5by55ZG95LitICovXHJcbiAgICBib3NzOF9za2lsbF9idWxsZWN0X2hpdD01MDgxMixcclxuICAgIC8qKkJPU1M5KOWFsOWNminmma7mlLvmlLvlh7sgKi9cclxuICAgIGJvc3M5X2F0dGFja19idWxsZWN0PTUwOTAxLFxyXG4gICAgLyoqQk9TUzko5YWw5Y2aKeaZrumAmuaUu+WHu+WRveS4rSAqL1xyXG4gICAgYm9zczlfYXR0YWNrX2J1bGxlY3RfaGl0PTUwOTAyLFxyXG4gICAgLyoqQk9TUzko5YWw5Y2aKeWWt+eBqyAqL1xyXG4gICAgYm9zczlfc2tpbGwyX3Blbmh1bz01MDkxMSxcclxuICAgIC8qKkJPU1M5KOWFsOWNminmiqTnm74gKi9cclxuICAgIGJvc3M5X3NraWxsM19odWR1bj01MDkyMSxcclxuICAgIC8qKkJPU1M5KOWFsOWNminov4fovb0t5YaS54OfICovXHJcbiAgICBib3NzOV9za2lsbDNfbWFveWFuPTUwOTMxLFxyXG4gICAgLyoqQk9TUzko5YWw5Y2aKei/h+i9vS3niIboo4IgKi9cclxuICAgIGJvc3M5X3NraWxsM19iYW9saWU9NTA5MzIsXHJcbiAgICAvKipCT1NTMTAo54aU5bKp5beo5YW9KeeahOaZrumAmuaUu+WHuyAqL1xyXG4gICAgYm9zczEwX2F0dGFjaz01MTAwMSxcclxuICAgIC8qKkJPU1MxMCjnhpTlsqnlt6jlhb0p55qE5pmu6YCa5pS75Ye75ZG95LitICovXHJcbiAgICBib3NzMTBfYXR0YWNrX2hpdD01MTAwMixcclxuICAgIC8qKkJPU1MxMCjnhpTlsqnlt6jlhb0p55qE5oqA6IO9MiAqL1xyXG4gICAgYm9zczEwX3NraWxsMl8wPTUxMDExLFxyXG4gICAgLyoqQk9TUzEwKOeGlOWyqeW3qOWFvSnnmoTmioDog70y5ZG95LitICovXHJcbiAgICBib3NzMTBfc2tpbGwyX2hpdD01MTAxMixcclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t5a6g54mpLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvKirlrqDnianmma7pgJrmlLvlh7sxLeebtOe6vyAqL1xyXG4gICAgcGV0X2F0dGFja3RfbGluZV8xPTMwMDAxLFxyXG4gICAgLyoq5a6g54mp5pmu6YCa5pS75Ye7Mi3mm7Lnur8gKi9cclxuICAgIHBldF9hdHRhY2t0X2N1cnZlXzE9MzAwMDIsXHJcbiAgICAvKirlrqDnianmm7Lnur/mi5blsL7nibnmlYggKi9cclxuICAgIHBldF9hdHRhY2t0X3R1b3dlaV8yPTMwMDA0LFxyXG4gICAgLyoq5a6g54mp5pS75Ye75ZG95Lit54m55pWIMS3niIbngrggKi9cclxuICAgIHBldF9hdHRhY2t0X2hpdF8xPTMwMDA1LFxyXG4gICAgLyoq5a6g54mp5pS75Ye75ZG95Lit54m55pWIMi3lnLDpnaIgKi9cclxuICAgIHBldF9hdHRhY2t0X2hpdF8yPTMwMDA2LFxyXG4gICAgLyoq5a6g54mp5pmu6YCa5pS75Ye7MS3nm7Tnur8t5ZG95Lit54m55pWIICovXHJcbiAgICBwZXRfYXR0YWNrX2xpbmVfaGl0PTMwMDA3LFxyXG4gICAgLyoq5a6g54mp5pmu6YCa5pS75Ye7My3mm7Lnur8gKi9cclxuICAgIHBldF9hdHRhY2t0X2N1cnZlXzM9MzAwMDgsXHJcbiAgICAvKirlrqDnianmm7Lnur/mi5blsL7lsL7ng5/nibnmlYggKi9cclxuICAgIHBldF9hdHRhY2t0X3R1b3dlaV8zPTMwMDA5LFxyXG4gICAgLyoq5a6g54mp5pS75Ye75ZG95Lit54m55pWIMy3niIbngrggKi9cclxuICAgIHBldF9hdHRhY2t0X2hpdF8zPTMwMDEwLFxyXG4gICAgLyoq5a6g54mp5pS75Ye75ZG95Lit54m55pWIMy3lnLDpnaIgKi9cclxuICAgIHBldF9hdHRhY2t0X2hpdF80PTMwMDExLFxyXG4gICAgLyoq5Yaw5a6g54mp55qE5pS75Ye7ICovXHJcbiAgICBwZXQxX2F0dGFjaz0zMDEwMSxcclxuICAgIC8qKuWGsOWuoOeJqeeahOWRveS4rSAqL1xyXG4gICAgcGV0MV9hdHRhY2tfaGl0PTMwMTAyLFxyXG4gICAgLyoq54Gr5a6g54mp55qE5pmu5pS75pS75Ye7ICovXHJcbiAgICBwZXQyX2F0dGFjaz0zMDIwMSxcclxuICAgIC8qKueBq+WuoOeJqeeahOaZruaUu+WRveS4rSAqL1xyXG4gICAgcGV0Ml9hdHRhY2tfaGl0PTMwMjAyLFxyXG4gICAgLyoq54Gr5a6g54mp55qE5oqA6IO9LeeBq+WghiAqL1xyXG4gICAgcGV0Ml9za2lsbD0zMDIxMSxcclxuICAgIC8qKumjjuWuoOeJqeeahOaKgOiDvS3og4zlkI4gKi9cclxuICAgIHBldDNfc2tpbGxfYmFjaz0zMDMxMSxcclxuICAgIC8qKumjjuWuoOeJqeeahOaKgOiDvS3liY0gKi9cclxuICAgIHBldDNfc2tpbGxfZnJvbnQ9MzAzMTIsXHJcbiAgICAvKirpm7flrqDniannmoTmma7pgJrmlLvlh7sgKi9cclxuICAgIHBldDRfc2tpbGw9MzA0MDEsXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLeWtl+S9ky0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgZnJvbnRfbm9ybWFsX2F0dGFja190ZXh0XzE9NDAwMDEsXHJcbiAgICBmcm9udF9ub3JtYWxfYXR0YWNrX3RleHRfMj00MDAwMixcclxuICAgIGZyb250X25vcm1hbF9hdHRhY2tfdGV4dF8zPTQwMDAzLFxyXG4gICAgZnJvbnRfbm9ybWFsX2F0dGFja190ZXh0XzQ9NDAwMDQsXHJcbiAgICBmcm9udF9ub3JtYWxfYXR0YWNrX3RleHRfNT00MDAwNSxcclxuICAgIGZyb250X3Jlc3RvcmVfdGV4dD00MDAwNixcclxuICAgIGZyb250X2NyaXRfdGV4dD00MDAwNyxcclxuICAgIC8qKuaAqueJqea9ruitpuWRiiAqL1xyXG4gICAgdWlfbW9uc3Rlcl93YXJuaW5nPTQxMDAxLCAgICBcclxuICAgIC8v5ri45oiP5YaF6YGT5YW3XHJcbiAgICAvKirpmLTlvbEgKi9cclxuICAgIHNoYWRvdz01MDAwMDAsXHJcbiAgICBkcm9wX2NvaW49NTAwMDAxLFxyXG4gICAgZHJvcF9nZW09NTAwMDAyLFxyXG4gICAgZHJvcF9nZW1fc2hhZG93PTUwMDAwMyxcclxuICAgIGRyb3BfY29pbl9zaGFkb3c9NTAwMDA0LFxyXG59XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuLy/otJ/otKPlrZDlvLnnmoTnlJ/miJAt6ZSA5q+BXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBjbGFzcyBHYW1lRWZmZWN0c01hbmFnZXIgZXh0ZW5kcyBNYXBOb2RlUG9vbCAge1xyXG5cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IEdhbWVFZmZlY3RzTWFuYWdlciA9IG51bGw7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOkdhbWVFZmZlY3RzTWFuYWdlclxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5faW5zdGFuY2U9dGhpcztcclxuICAgICAgICBzdXBlci5vbkxvYWQoKTtcclxuICAgICAgICB0aGlzLmFkZEVmZmVjdFBvb2xCeUlkKEdhbWVFZmZlY3RJZC5zaGFkb3csMzIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIub25EZXN0cm95KCk7XHJcbiAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLl9pbnN0YW5jZT1udWxsO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBpZCDmuLjmiI/nibnmlYhpZFxyXG4gICAgICogQHBhcmFtIHBhdGgg54m55pWI5paH5Lu26aKE5Yi25L2T5omA5Zyo55qE6Lev5b6EXHJcbiAgICAgKiBAcGFyYW0gaW5pdENvdW50IOWIneWni+WMlueahOaVsOmHj1xyXG4gICAgICovXHJcbiAgICBhZGRFZmZlY3RQb29sQnlQYXRoKGlkOkdhbWVFZmZlY3RJZCxwYXRoOnN0cmluZyxpbml0Q291bnQ6bnVtYmVyPTQpe1xyXG4gICAgICAgIHN1cGVyLmFkZE5vZGVQb29sKGlkLHBhdGgsaW5pdENvdW50KTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gaWQg5ri45oiP54m55pWIaWRcclxuICAgICAqIEBwYXJhbSBpbml0Q291bnQg5Yid5aeL5YyW55qE5pWw6YePXHJcbiAgICAgKi9cclxuICAgIGFkZEVmZmVjdFBvb2xCeUlkKGlkOkdhbWVFZmZlY3RJZCxpbml0Q291bnQ6bnVtYmVyPTQsbG9hZENhbGxiYWNrPzpGdW5jdGlvbik6Ym9vbGVhbntcclxuICAgICAgICBsZXQgcGF0aDpzdHJpbmc9XCJlZmZlY3RzL2dhbWUvXCIraWQ7XHJcbiAgICAgICAgcmV0dXJuIHN1cGVyLmFkZE5vZGVQb29sKGlkLHBhdGgsaW5pdENvdW50LGxvYWRDYWxsYmFjayk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5qC55o2uaWTliJvlu7rkuIDkuKrnibnmlYgqL1xyXG4gICAgY3JlYXRlR2FtZUVmZmVjdEJ5SWQoaWQ6R2FtZUVmZmVjdElkLHBvczpjYy5WZWMyLGVuZENhbGxiYWNrPzpGdW5jdGlvbik6Y2MuTm9kZVxyXG4gICAge1xyXG4gICAgICAgIGxldCBub2RlPXN1cGVyLmdldE5vZGVCeUlkKGlkKTtcclxuICAgICAgICAvL3Rlc3RcclxuICAgICAgICBpZihub2RlPT1udWxsKXtcclxuICAgICAgICAgICAgY2MuZXJyb3IoaWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgbm9kZS5zZXRQb3NpdGlvbihwb3MpO1xyXG4gICAgICAgIHRoaXMuZGVhbEFuaW1hdGlvbihpZCxub2RlLGVuZENhbGxiYWNrKTtcclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgIH1cclxuXHJcbiAgICAvKirmoLnmja5pZOWIm+W7uuS4gOS4queJueaViCovXHJcbiAgICBjcmVhdGVHYW1lRWZmZWN0Rm9yUGFyZW50KGlkOkdhbWVFZmZlY3RJZCxwb3M6Y2MuVmVjMixwYXJlbnQ6Y2MuTm9kZSxlbmRDYWxsYmFjaz86RnVuY3Rpb24saXNEZWxheTpib29sZWFuPWZhbHNlKTpjYy5Ob2RlXHJcbiAgICB7ICAgICAgICBcclxuICAgICAgICBsZXQgbm9kZT1zdXBlci5nZXROb2RlQnlJZChpZCk7XHJcbiAgICAgICAgbm9kZS5uYW1lPWlkLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgcGFyZW50LmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgIG5vZGUuc2V0UG9zaXRpb24ocG9zKTtcclxuICAgICAgICBub2RlLnNldFNpYmxpbmdJbmRleChpZCk7XHJcbiAgICAgICAgdGhpcy5kZWFsQW5pbWF0aW9uKGlkLG5vZGUsZW5kQ2FsbGJhY2spO1xyXG4gICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuagueaNrmlk77yM6IqC54K55Zue5pS25LiA5Liq54m55pWIKi9cclxuICAgIGRlc3Ryb3lHYW1lRWZmZWN0QnlJZChpZDpHYW1lRWZmZWN0SWQsbm9kZTpjYy5Ob2RlKVxyXG4gICAgeyAgICAgICAgXHJcbiAgICAgICAgc3VwZXIuZGVzdHJveU5vZGUoaWQsbm9kZSk7XHJcbiAgICAgICAgLy9ub2RlLnJlbW92ZUZyb21QYXJlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVBbGxFZmZlY3QoKXtcclxuICAgICAgICB0aGlzLm5vZGUucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoq5aSE55CG5ZCE6Ieq5a+55bqU55qE54m55pWIICovXHJcbiAgICBwcml2YXRlIGRlYWxBbmltYXRpb24oaWQ6R2FtZUVmZmVjdElkLG5vZGU6Y2MuTm9kZSxlbmRDYWxsYmFjazpGdW5jdGlvbil7XHJcbiAgICAgICAgc3dpdGNoKGlkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy/mkq3mlL7nu5PmnZ/lkI7nm7TmjqXlm57mlLZcclxuICAgICAgICAgICAgY2FzZSBHYW1lRWZmZWN0SWQubW9uc3Rlcl9ub3JtYWxfYXR0OlxyXG4gICAgICAgICAgICBjYXNlIEdhbWVFZmZlY3RJZC5zaGVzaG91X2ppYW5zaGlfYXR0X2hpdDpcclxuICAgICAgICAgICAgY2FzZSBHYW1lRWZmZWN0SWQuc2hlc2hvdV9hdHRhY2tfY3RybF9oaXQ6XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZUVmZmVjdElkLnBhb3Nob3VfcGFvZGFuX2hpdDpcclxuICAgICAgICAgICAgY2FzZSBHYW1lRWZmZWN0SWQucGFvc2hvdV9za2lsbF9oaXQ6XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZUVmZmVjdElkLmRlbHV5aV9hdHRfaGl0OlxyXG4gICAgICAgICAgICBjYXNlIEdhbWVFZmZlY3RJZC5kZWx1eWlfYXR0X2Jhb2ppOlxyXG4gICAgICAgICAgICBjYXNlIEdhbWVFZmZlY3RJZC5ib3NzM19hdHRfZW5kOlxyXG4gICAgICAgICAgICBjYXNlIEdhbWVFZmZlY3RJZC5ib3NzMl9hdHRfZW5kOlxyXG4gICAgICAgICAgICBjYXNlIEdhbWVFZmZlY3RJZC5ib3NzMl9za2lsbF9lbmQ6XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZUVmZmVjdElkLmJvc3MxX2F0dF9lbmQ6XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZUVmZmVjdElkLm1vbnN0ZXJfZmFyX2F0dF9oaXQ6XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZUVmZmVjdElkLnNob3Vfd2FuZ19qaWFuc2hpX3NraWxsMV9oaXQ6XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZUVmZmVjdElkLmJvc3MxX25vcm1hbF9hdHRfaGl0OlxyXG4gICAgICAgICAgICBjYXNlIEdhbWVFZmZlY3RJZC5ib3NzMV9ub3JtYWxfc2tpbGxfaGl0OlxyXG4gICAgICAgICAgICBjYXNlIEdhbWVFZmZlY3RJZC5sZWlfc2hlbl9za2lsbF9ncm91bmQ6XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZUVmZmVjdElkLmxlaV9zaGVuX3NraWxsX3NreTpcclxuICAgICAgICAgICAgY2FzZSBHYW1lRWZmZWN0SWQuYm9zczJfbm9ybWFsX2F0dF9oaXQxOlxyXG4gICAgICAgICAgICBjYXNlIEdhbWVFZmZlY3RJZC5ib3NzMl9ub3JtYWxfc2tpbGxfaGl0OlxyXG4gICAgICAgICAgICBjYXNlIEdhbWVFZmZlY3RJZC5ib3NzMl9ub3JtYWxfc2tpbGw6XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZUVmZmVjdElkLm1vbnN0ZXIxOV95b3VsaW5nX3NraWxsX2hpdDpcclxuICAgICAgICAgICAgY2FzZSBHYW1lRWZmZWN0SWQubW9uc3Rlcl9kaWU6XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZUVmZmVjdElkLmJvc3MzX25vcm1hbF9hdHRhY2tfaGl0OlxyXG4gICAgICAgICAgICBjYXNlIEdhbWVFZmZlY3RJZC5ib3NzM19za2lsbF8xX2hpdDpcclxuICAgICAgICAgICAgY2FzZSBHYW1lRWZmZWN0SWQuYm9zczNfc2tpbGxfMl9oaXQ6XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZUVmZmVjdElkLm1vbnN0ZXJfemhpbGlhb19oYWxvX2hpdDpcclxuICAgICAgICAgICAgY2FzZSBHYW1lRWZmZWN0SWQubW9uc3RlcjY1X3NodWFuZ2p1cmVuX2F0dF9oaXQ6XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZUVmZmVjdElkLm1vbnN0ZXI2NV9zaHVhbmdqdXJlbl9hdHRfaGl0X2NyaXQ6XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZUVmZmVjdElkLnpoZW5fZGVfYXR0YWNrX2hpdDpcclxuICAgICAgICAgICAgY2FzZSBHYW1lRWZmZWN0SWQuemhlbl9kZV9iZWlkb25nX3NraWxsOlxyXG4gICAgICAgICAgICBjYXNlIEdhbWVFZmZlY3RJZC56aGVuX2RlX2FjdGl2ZV9za2lsbF8yOlxyXG4gICAgICAgICAgICBjYXNlIEdhbWVFZmZlY3RJZC5iaW5nX252X2F0dGFja19oaXQ6XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZUVmZmVjdElkLmJpbmdfbnZfYmVpZG9uZ19za2lsbF9oaXQ6XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZUVmZmVjdElkLmJvc3M0X25vcm1hbF9hdHRhY2tfaGl0OlxyXG4gICAgICAgICAgICBjYXNlIEdhbWVFZmZlY3RJZC5tb25zdGVyNjdfc2h1aWppbmd5b3Vsb25nX2F0dF9oaXQ6XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZUVmZmVjdElkLm1vbnN0ZXI2OF9uaXVqaWFuZ2p1bl9za2lsbDpcclxuICAgICAgICAgICAgY2FzZSBHYW1lRWZmZWN0SWQuYV9udV9iaV9zaV9hdHRhY2tfaGl0OlxyXG4gICAgICAgICAgICBjYXNlIEdhbWVFZmZlY3RJZC5hX251X2JpX3NpX2JlaWRvbmdfc2tpbGxfMTpcclxuICAgICAgICAgICAgY2FzZSBHYW1lRWZmZWN0SWQua3Vhbmd6aGFuc2hpX2F0dGFja19oaXQ6XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZUVmZmVjdElkLmt1YW5nemhhbnNoaV9hdHRhY2tfY2h1YW50b3U6XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZUVmZmVjdElkLmJvc3M1X25vcm1hbF9hdHRhY2tfaGl0OlxyXG4gICAgICAgICAgICBjYXNlIEdhbWVFZmZlY3RJZC5ib3NzNV9za2lsbF9iYW96aGE6XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZUVmZmVjdElkLmJvc3M1X3NraWxsX3JlbGVhc2U6XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZUVmZmVjdElkLnBldDFfYXR0YWNrX2hpdDpcclxuICAgICAgICAgICAgY2FzZSBHYW1lRWZmZWN0SWQucGV0Ml9hdHRhY2tfaGl0OlxyXG4gICAgICAgICAgICBjYXNlIEdhbWVFZmZlY3RJZC5hX251X2JpX3NpX2FjdGl2ZV9za2lsbF9yaW5nOlxyXG4gICAgICAgICAgICBjYXNlIEdhbWVFZmZlY3RJZC5tZWlfbW9fYXR0YWNrX2hpdDpcclxuICAgICAgICAgICAgY2FzZSBHYW1lRWZmZWN0SWQubWVpX21vX2JlaWRvbmdfc2tpbGwxX2Jhb3poYTpcclxuICAgICAgICAgICAgY2FzZSBHYW1lRWZmZWN0SWQubWVpX21vX3podWRvbmdfc2tpbGxfYmFvemhhOlxyXG4gICAgICAgICAgICBjYXNlIEdhbWVFZmZlY3RJZC5tZWlfbW9fYmVpZG9uZ19za2lsbDJfaGl0OlxyXG4gICAgICAgICAgICBjYXNlIEdhbWVFZmZlY3RJZC5tZWlfbW9femh1ZG9uZ19za2lsbF9nb3VuZDpcclxuICAgICAgICAgICAgY2FzZSBHYW1lRWZmZWN0SWQuYm9zczZfYXR0YWNrX2hpdDpcclxuICAgICAgICAgICAgY2FzZSBHYW1lRWZmZWN0SWQuYm9zczZfc2tpbGwyX2hpdDpcclxuICAgICAgICAgICAgY2FzZSBHYW1lRWZmZWN0SWQuYm9zczdfYXR0YWNrX2J1bGxlY3RfaGl0OlxyXG4gICAgICAgICAgICBjYXNlIEdhbWVFZmZlY3RJZC5ib3NzN19za2lsbF9idWxsZWN0X2hpdDpcclxuICAgICAgICAgICAgY2FzZSBHYW1lRWZmZWN0SWQuYm9zczhfYXR0YWNrX2J1bGxlY3RfaGl0OlxyXG4gICAgICAgICAgICBjYXNlIEdhbWVFZmZlY3RJZC5ib3NzOF9za2lsbF9idWxsZWN0X2hpdDpcclxuICAgICAgICAgICAgY2FzZSBHYW1lRWZmZWN0SWQubnZ3dV9hdHRhY2tfYnVsbGVjdF9oaXQ6XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZUVmZmVjdElkLm52d3VfYWN0aXZlX3NraWxsOlxyXG4gICAgICAgICAgICBjYXNlIEdhbWVFZmZlY3RJZC5ib3NzOV9za2lsbDNfYmFvbGllOlxyXG4gICAgICAgICAgICBjYXNlIEdhbWVFZmZlY3RJZC5ib3NzOV9hdHRhY2tfYnVsbGVjdF9oaXQ6XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZUVmZmVjdElkLmJvc3MxMF9hdHRhY2tfaGl0OlxyXG4gICAgICAgICAgICBjYXNlIEdhbWVFZmZlY3RJZC5ib3NzMTBfc2tpbGwyX2hpdDpcclxuICAgICAgICAgICAgY2FzZSBHYW1lRWZmZWN0SWQubW9uc3Rlcjc4X3NraWxsX2J1bGxlY3RfaGl0OlxyXG4gICAgICAgICAgICBjYXNlIEdhbWVFZmZlY3RJZC5sZWlfc2hlbl9zaGFuZGlhbl9oaXQ6XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZUVmZmVjdElkLmJpbmdfbnZfYmVpZG9uZ19za2lsbF9jcmVhdGU6XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZUVmZmVjdElkLmRlbHV5aV9za2lsbF9iZWlkb25nX2NyZWF0ZTpcclxuICAgICAgICAgICAgY2FzZSBHYW1lRWZmZWN0SWQubW9uc3RlcjM3X3NoaXRvdXJlbjpcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxldCBhbmltYXRpb249bm9kZS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKTtcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbi5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb24ub24oY2MuQW5pbWF0aW9uLkV2ZW50VHlwZS5GSU5JU0hFRCwoKT0+eyAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uLm9mZihjYy5BbmltYXRpb24uRXZlbnRUeXBlLkZJTklTSEVEKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlc3Ryb3lHYW1lRWZmZWN0QnlJZChpZCxub2RlKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGVuZENhbGxiYWNrKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5kQ2FsbGJhY2soKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==