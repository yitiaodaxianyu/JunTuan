import MapNodePool from "./MapNodePool";

export enum GameEffectId{
    /**无 */
    Null=0,
    /**近战怪物通用的攻击特效 */
    monster_normal_att=1,
    /**眩晕通用特效 */
    xuanyun=2,
    /**英雄指示器-圆形 */
    skill_tip_circle=11,
    /**英雄指示器-矩形 */
    skill_tip_rect=12,
    /**英雄指示器-方向 */
    skill_tip_dir=13,
    /**英雄伤害记录器 */
    skill_damage_record=20,
    /**英雄通用蓄力 */
    hero_skill_common=99,
    /**射手普通攻击的箭矢 */
    sheshou_jianshi_att=101,
    /**射手被动技能攻击的箭矢 */
    sheshou_jianshi_skill=102,
    /**射手普通攻击暴击命中后的特效 */
    sheshou_attack_ctrl_hit=103,
    /**射手普通攻击箭矢命中的特效 */
    sheshou_jianshi_att_hit=111,
    /**射手大招蓄力/发射/命中/特效 */
    sheshou_jianshi_super_skill_1=121,
    sheshou_jianshi_super_skill_2=122,
    sheshou_jianshi_super_skill_3=123,
    /**射手大招移动箭矢特效 */
    /**炮手普通炮弹 */
    paoshou_paodan_att=201,
    /**炮手技能炮弹 */
    paoshou_paodan_skill=202,
    /**炮手炮弹落地爆炸的特效 */
    paoshou_skill_hit=203,
    //paoshou_paodan_luodi=203,
    /**炮手专武技能的炮弹 */
    paoshou_paodan_skill_ex=204,
    /**炮手炮弹命中爆炸的特效 */
    paoshou_paodan_hit=211,
    /**炮手被动技能2特效 */
    paoshou_skill_2=221,
    /**炮手被动技能2特效 */
    paoshou_active_skill_1=231,
    /**炮手被动技能2特效 */
    paoshou_active_skill_2=232,
    paoshou_active_skill_toudan=233,
    /**炮手大招信号弹 */
    paoshou_dazhao_xinhaodan=241,
    /**炮手大招尾烟 */
    paoshou_dazhao_weiyan=242,
    /**炮手大招信号弹落地后的瞄准效果 */
    paoshou_dazhao_xinhaodan_miaozhun=243,
    /**炮手大招-信号弹落地结束后的尾烟 */
    paoshou_dazhao_weiyan_end=244,
    /**女巫的普通攻击 */
    nvwu_attack_bullect=301,
    /**女巫的普通攻击命中 */
    nvwu_attack_bullect_hit=302,
    /**女巫的主动技能 */
    nvwu_active_skill=311,
    /**德鲁伊普通攻击飞弹 */
    deluyi_att=401,
    /**德鲁伊普通攻击命中特效 */
    deluyi_att_hit=402,
    /**德鲁伊被动攻击的暴击特效 */
    deluyi_att_baoji=403,
    /**德鲁伊被动攻击暴击的蔓藤眩晕 */
    deluyi_skill_manteng=404,
    /**德鲁伊被动触发的特效 */
    deluyi_skill_beidong_create=405,
    /**德鲁伊主动技能特效 */
    deluyi_active_skill=411,
    /**德鲁伊主动技能命中特效 */
    deluyi_active_skill_hit=412,
    /**狂战士普通攻击 */
    kuangzhanshi_attack=501,
    /**狂战士普通攻击-命中 */
    kuangzhanshi_attack_hit=502,
    /**狂战士普通攻击-穿透 */
    kuangzhanshi_attack_chuantou=503,
    /**狂战士被动最大层的斧头攻击 */
    kuangzhanshi_attack_max=504,
    /**贞德普通攻击 */
    zhen_de_attack=601,
    /**贞德普通攻击命中 */
    zhen_de_attack_hit=602,
    /**贞德被动技能2 */
    zhen_de_beidong_skill=611,
    /**贞德被动技能1 */
    zhen_de_beidong_skill_wall=612,
    /**贞德主动技能1-1 */
    zhen_de_active_skill_1=621,
    /**贞德主动技能1-2 */
    zhen_de_active_skill_2=622,
    /**贞德主动技能1-3 */
    zhen_de_active_skill_3=623,
    /**兽王普通攻击的箭矢 */
    shou_wang_jianshi_attack=701,
    /**兽王被动技能1的箭矢,穿透 */
    shou_wang_jianshi_skill1=702,
    /**兽王被动技能1的箭矢,穿透特效 */
    shou_wang_jianshi_skill1_hit=703,
    /**长矛手的普通攻击 */
    chang_mao_shou_attack=801,
    /**长矛手的普通攻击命中 */
    chang_mao_shou_attack_hit=802,
    /**长矛手的被动技能-爪子 */
    chang_mao_shou_skill_zhuazi=803,
    /**长矛手的主动技能buff */
    chang_mao_shou_skill_active_1=811,
    /**长矛手的主动技能buff */
    chang_mao_shou_skill_active_2=812,
    /**冰女的普通攻击 */
    bing_nv_attack=901,
    /**冰女的普通攻击 */
    bing_nv_attack_hit=902,
    /**冰女的被动技能触发的爆炸特效 */
    bing_nv_beidong_skill_create=910,
    /**冰女的被动技能攻击 */
    bing_nv_beidong_skill=911,
    /**冰女的被动技能攻击命中 */
    bing_nv_beidong_skill_hit=912,
    /**冰女的被动技能2攻击 */
    bing_nv_beidong_skill_2=913,
    /**冰女的主动技能的冰墙 */
    bing_nv_active_skill_wall=922,
    /**阿努比斯的普通攻击 */
    a_nu_bi_si_attack=1001,
    /**阿努比斯的普通攻击命中 */
    a_nu_bi_si_attack_hit=1002,
    /**阿努比斯被动1 */
    a_nu_bi_si_beidong_skill_1=1011,
    /**阿努比斯被动2 */
    a_nu_bi_si_beidong_skill_2=1012,
    /**阿努比斯主动1 */
    a_nu_bi_si_active_skill_1=1021,
    /**阿努比斯主动风 */
    a_nu_bi_si_active_skill_wind=1022,
    /**阿努比斯主动线 */
    a_nu_bi_si_active_skill_line=1023,
    /**阿努比斯主动圈 */
    a_nu_bi_si_active_skill_ring=1024,
    /**魅魔普通攻击特效 */
    mei_mo_attack=1101,
    /**魅魔普通攻击命中特效 */
    mei_mo_attack_hit=1102,
    /**魅魔被动技能1爆炸效果 */
    mei_mo_beidong_skill1_baozha=1111,
    /**魅魔被动技能1爆炸后的攻速 */
    mei_mo_beidong_skill1_gongsu=1112,
    /**魅魔被动技能2命中 */
    mei_mo_beidong_skill2_hit=1113,
    /**魅魔主动技能命中 */
    mei_mo_zhudong_skill_hero=1121,
    /**魅魔主动技能命中 */
    mei_mo_zhudong_skill_gound=1122,
    /**魅魔主动技能命中 */
    mei_mo_zhudong_skill_baozha=1123,
    /**魅魔主动技能命中 */
    mei_mo_zhudong_skill_monster=1124,
    /**雷神普通的闪电特效 */
    lei_shen_shandian=1201,
    /**雷神普通的闪电命中的特效 */
    lei_shen_shandian_hit=1202,
    /**雷神大招的闪电-地板特效 */
    lei_shen_skill_ground=1211,
    /**雷神大招的闪电-空中特效 */
    lei_shen_skill_sky=1212,
    //---------------------------------------城墙-------------------------------------------------
    /**城墙的护盾 */
    wall_shield=10001,
    //---------------------------------------怪物-------------------------------------------------
    /**第一个BOSS攻击的移动特效 */
    boss1_att_move=20101,
    /**第一个BOSS攻击的结束爆炸特效 */
    boss1_att_end=20102,
    /**第2个BOSS攻击的结束特效 */
    boss2_att_end=20201,
    /**第2个BOSS技能的特效 */
    boss2_skill_move=20202,
    boss2_skill_end=20203,
    /**第3个BOSS攻击的移动特效 */
    boss3_att_move=20301,
    /**第3个BOSS攻击的结束爆炸特效 */
    boss3_att_end=20302,
    /**第3个BOSS技能的特效 */
    boss3_skill_move=20303,
    /**boss血条 */
    boss_hp=20000,
    /**boss出场动画 */
    boss_coming=20001,
    /**远程怪物通用攻击 */
    monster_far_att=20002,
    /**远程怪物普通攻击命中特效 */
    monster_far_att_hit=20003,
    /**怪物死亡特效 */
    monster_die=20004,  
    /**召唤怪物特效 */  
    monster_zhaohuan=20005,
    /**怪物中毒特效 */
    monster_zhongdu=21001,
    /**治疗光环 */
    monster_zhiliao_halo=21002,
    /**治疗光环成功加血 */
    monster_zhiliao_halo_hit=21003,

    /**精英怪-19-幽灵-的主动引导技能 */
    monster19_youling_skill=21901,
    /**精英怪-19-幽灵-的主动技能命中 */
    monster19_youling_skill_hit=21902,
    /**精英怪-30-蝙蝠（堕落天使）-的被动光环 */
    monster30_bianfu_skill=23001,
    /**精英怪-65-霜巨人-普通攻击 */
    monster65_shuangjuren_att=26501,
    /**精英怪-65-霜巨人-普通攻击命中 */
    monster65_shuangjuren_att_hit=26502,
    /**精英怪-65-霜巨人-普通攻击命中并暴击 */
    monster65_shuangjuren_att_hit_crit=26503,
    /**精英怪-67-水晶幼龙-普攻攻击 */
    monster67_shuijingyoulong_att=26701,
    /**精英怪-67-水晶幼龙-普攻攻击命中 */
    monster67_shuijingyoulong_att_hit=26702,
    /**精英怪-68-牛头将军-光环 */
    monster68_niujiangjun_skill=26811,
    /**精英怪-69-牛头萨满-普通攻击 */
    monster69_niusaman_att=26901,
    /**精英怪-70-巨型史莱姆-死亡爆弹 */
    monster70_silaimu_qq=27001,
    /**小怪-44-水晶守卫-普攻攻击 */
    monster44_shuijingshouwei_att=24401,
    /**小怪-47-牛头飞刀手-普攻攻击 */
    monster47_att=24701,
    /**小怪-53-幽灵枪手-普攻攻击 */
    monster53_att=25301,
    /**精英怪-72-幽灵巨炮手-普攻攻击 */
    monster72_att=27201,
    /**精英怪-73-幽灵舵手-技能-锁链 */
    monster73_skill_lian_root=27310,
    /**精英怪-73-幽灵舵手-技能-锚 */
    monster73_skill_mao=27311,
    /**精英怪-73-幽灵舵手-技能-铁链 */
    monster73_skill_lian=27312,
    /**精英怪-57-风精灵-普通攻击的风*/
    monster57_attack_wind=25701,
    /**小怪-58-侏儒工程师-普通攻击的激光弹*/
    monster58_attack_bullect=25801,
    /**精英怪-76-监督者-普通攻击的弹*/
    monster76_attack_bullect=27601,
    /**精英怪-76-监督者-速度光环*/
    monster76_attack_guanghuan=27611,
    /**精英怪-62-火焰精灵-普通攻击的弹*/
    monster62_attack_bullect=26201,
    /**精英怪-78-熔岩巨人-普通攻击的弹*/
    monster78_attack_bullect=27801,
    /**精英怪-78-熔岩巨人-普通攻击的技能*/
    monster78_skill_bullect=27811,
    /**精英怪-78-熔岩巨人-普通攻击的技能*/
    monster78_skill_bullect_hit=27812,
    /**精英怪 37-石头人冲撞后特效 */
    monster37_shitouren=23701,
    //---------------------------------------Boss--------------------------------------------------
    /**boss1（大树）普通攻击 */
    boss1_normal_att=50101,
    /**boss1（大树）普通攻击命中 */
    boss1_normal_att_hit=50102,
    /**boss1（大树）技能攻击 */
    boss1_normal_skill=50111,
    /**boss1（大树）技能命中 */
    boss1_normal_skill_hit=50112,
    /**BOSS2(金刚)普通攻击 */
    boss2_normal_att=50201,
    /**BOSS2(金刚)普通攻击命中1 */
    boss2_normal_att_hit1=50202,
    /**BOSS2(金刚)普通攻击命中2 */
    boss2_normal_att_hit2=50203,
    /**BOSS2(金刚)技能攻击 */
    boss2_normal_skill=50211,
    /**BOSS2(金刚)技能攻击命中 */
    boss2_normal_skill_hit=50212,
    /**BOSS3（雪人）的普通攻击 */
    boss3_normal_attack=50301,
    /**BOSS3（雪人）的普通攻击命中 */
    boss3_normal_attack_hit=50302,
    /**BOSS3（雪人）的技能1攻击 */
    boss3_skill_1=50311,
    /**BOSS3（雪人）的技能1攻击命中 */
    boss3_skill_1_hit=50312,
    /**BOSS3（雪人）的技能2盾牌 */
    boss3_skill_2_dunpai=50321,
    /**BOSS3（雪人）的技能2攻击 */
    boss3_skill_2=50322,
    /**BOSS3（雪人）的技能2攻击命中 */
    boss3_skill_2_hit=50323,
    /**BOSS3（雪人）的技能2-雪印 */
    boss3_skill_2_xueyin=50324,
    /**BOSS4（亚龙）的普通攻击命中 */
    boss4_normal_attack_hit=50401,
    /**BOSS4（亚龙）的技能喷火 */
    boss4_normal_skill_penhuo=50411,
    /**BOSS5（牛魔王）的普通攻击命中 */
    boss5_normal_attack_hit=50501,
    /**BOSS5（牛魔王）的技能爆炸 */
    boss5_skill_baozha=50511,
    /**BOSS5（牛魔王）的技能释放 */
    boss5_skill_release=50512,
    /**BOSS6(腐败巨兽)的普通攻击 */
    boss6_attack=50601,
    /**BOSS6(腐败巨兽)的普通攻击命中 */
    boss6_attack_hit=50602,
    /**BOSS6(腐败巨兽)的技能2 */
    boss6_skill2=50611,
    /**BOSS6(腐败巨兽)的技能2命中 */
    boss6_skill2_hit=50612,
    /**BOSS7(船长)普通攻击子弹 */
    boss7_attack_bullect=50701,
    /**BOSS7(船长)普通攻击子弹命中 */
    boss7_attack_bullect_hit=50702,
    /**BOSS7(船长)技能炮弹 */
    boss7_skill_bullect=50711,
    /**BOSS7(船长)技能炮弹命中 */
    boss7_skill_bullect_hit=50712,
    /**BOSS8(沙虫)普攻攻击 */
    boss8_attack_bullect=50801,
    /**BOSS8(沙虫)普通攻击命中 */
    boss8_attack_bullect_hit=50802,
    /**BOSS8(沙虫)技能炮弹 */
    boss8_skill_bullect=50811,
    /**BOSS8(沙虫)技能炮弹命中 */
    boss8_skill_bullect_hit=50812,
    /**BOSS9(兰博)普攻攻击 */
    boss9_attack_bullect=50901,
    /**BOSS9(兰博)普通攻击命中 */
    boss9_attack_bullect_hit=50902,
    /**BOSS9(兰博)喷火 */
    boss9_skill2_penhuo=50911,
    /**BOSS9(兰博)护盾 */
    boss9_skill3_hudun=50921,
    /**BOSS9(兰博)过载-冒烟 */
    boss9_skill3_maoyan=50931,
    /**BOSS9(兰博)过载-爆裂 */
    boss9_skill3_baolie=50932,
    /**BOSS10(熔岩巨兽)的普通攻击 */
    boss10_attack=51001,
    /**BOSS10(熔岩巨兽)的普通攻击命中 */
    boss10_attack_hit=51002,
    /**BOSS10(熔岩巨兽)的技能2 */
    boss10_skill2_0=51011,
    /**BOSS10(熔岩巨兽)的技能2命中 */
    boss10_skill2_hit=51012,
    //---------------------------------------宠物---------------------------------------------------
    /**宠物普通攻击1-直线 */
    pet_attackt_line_1=30001,
    /**宠物普通攻击2-曲线 */
    pet_attackt_curve_1=30002,
    /**宠物曲线拖尾特效 */
    pet_attackt_tuowei_2=30004,
    /**宠物攻击命中特效1-爆炸 */
    pet_attackt_hit_1=30005,
    /**宠物攻击命中特效2-地面 */
    pet_attackt_hit_2=30006,
    /**宠物普通攻击1-直线-命中特效 */
    pet_attack_line_hit=30007,
    /**宠物普通攻击3-曲线 */
    pet_attackt_curve_3=30008,
    /**宠物曲线拖尾尾烟特效 */
    pet_attackt_tuowei_3=30009,
    /**宠物攻击命中特效3-爆炸 */
    pet_attackt_hit_3=30010,
    /**宠物攻击命中特效3-地面 */
    pet_attackt_hit_4=30011,
    /**冰宠物的攻击 */
    pet1_attack=30101,
    /**冰宠物的命中 */
    pet1_attack_hit=30102,
    /**火宠物的普攻攻击 */
    pet2_attack=30201,
    /**火宠物的普攻命中 */
    pet2_attack_hit=30202,
    /**火宠物的技能-火堆 */
    pet2_skill=30211,
    /**风宠物的技能-背后 */
    pet3_skill_back=30311,
    /**风宠物的技能-前 */
    pet3_skill_front=30312,
    /**雷宠物的普通攻击 */
    pet4_skill=30401,
    //---------------------------------------字体---------------------------------------------------
    front_normal_attack_text_1=40001,
    front_normal_attack_text_2=40002,
    front_normal_attack_text_3=40003,
    front_normal_attack_text_4=40004,
    front_normal_attack_text_5=40005,
    front_restore_text=40006,
    front_crit_text=40007,
    /**怪物潮警告 */
    ui_monster_warning=41001,    
    //游戏内道具
    /**阴影 */
    shadow=500000,
    drop_coin=500001,
    drop_gem=500002,
    drop_gem_shadow=500003,
    drop_coin_shadow=500004,
}

const {ccclass, property} = cc._decorator;
//负责子弹的生成-销毁
@ccclass
export class GameEffectsManager extends MapNodePool  {


    private static _instance: GameEffectsManager = null;

    public static getInstance():GameEffectsManager
    {
        return this._instance;
    }

    onLoad () {
        GameEffectsManager._instance=this;
        super.onLoad();
        this.addEffectPoolById(GameEffectId.shadow,32);
    }

    protected onDestroy(): void {
        super.onDestroy();
        GameEffectsManager._instance=null;
    }
    /**
     * 
     * @param id 游戏特效id
     * @param path 特效文件预制体所在的路径
     * @param initCount 初始化的数量
     */
    addEffectPoolByPath(id:GameEffectId,path:string,initCount:number=4){
        super.addNodePool(id,path,initCount);
    }
    /**
     * 
     * @param id 游戏特效id
     * @param initCount 初始化的数量
     */
    addEffectPoolById(id:GameEffectId,initCount:number=4,loadCallback?:Function):boolean{
        let path:string="effects/game/"+id;
        return super.addNodePool(id,path,initCount,loadCallback);
    }

    /**根据id创建一个特效*/
    createGameEffectById(id:GameEffectId,pos:cc.Vec2,endCallback?:Function):cc.Node
    {
        let node=super.getNodeById(id);
        //test
        if(node==null){
            cc.error(id);
        }
        this.node.addChild(node);
        node.setPosition(pos);
        this.dealAnimation(id,node,endCallback);
        return node;
    }

    /**根据id创建一个特效*/
    createGameEffectForParent(id:GameEffectId,pos:cc.Vec2,parent:cc.Node,endCallback?:Function,isDelay:boolean=false):cc.Node
    {        
        let node=super.getNodeById(id);
        node.name=id.toString();
        parent.addChild(node);
        node.setPosition(pos);
        node.setSiblingIndex(id);
        this.dealAnimation(id,node,endCallback);
        return node;
    }

    /**根据id，节点回收一个特效*/
    destroyGameEffectById(id:GameEffectId,node:cc.Node)
    {        
        super.destroyNode(id,node);
        //node.removeFromParent();
    }

    removeAllEffect(){
        this.node.removeAllChildren();
    }
    
    /**处理各自对应的特效 */
    private dealAnimation(id:GameEffectId,node:cc.Node,endCallback:Function){
        switch(id)
        {
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
                let animation=node.getComponent(cc.Animation);
                animation.play();
                animation.on(cc.Animation.EventType.FINISHED,()=>{                    
                    animation.off(cc.Animation.EventType.FINISHED);
                    this.destroyGameEffectById(id,node)
                    if(endCallback){
                        endCallback();
                    }
                })
            }break;
        }
    }
}
