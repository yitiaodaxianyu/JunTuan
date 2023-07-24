import GameManager from "../../GameManager";
import { PetInfo } from "../../Pet/PetConfig";
import { AttRangeType, AttributeData, DamageType, HeroInfo, Hero_Type, SkillType } from "../Game/HeroConfig";

/**表格固定数值：英雄技能信息 */
export class HeroSkillInfo {
    /**冷却时间 */
    public ColdDown: number = 0;
    /**技能参数1 */
    public SkillValue_1: number = 0;
    /**技能参数2 */
    public SkillValue_2: number = 0;
    /**技能参数3 */
    public SkillValue_3: number = 0;
    /**技能参数4 */
    public SkillValue_4: number = 0;
}

/**游戏外英雄数据，游戏内数据通过附加计算 */
export class HeroData extends AttributeData {
    /** 总攻击力*/
    total_attack: number = 0;
    /**固定攻击力 */
    fixed_attck: number = 0;
    /**总血量 */
    total_hp: number = 2000;
    /**固定血量 */
    fixed_hp: number = 0;
    /**总防御 */
    total_defense: number = 0;
    /**固定防御 */
    fix_defense: number = 0;
    /**无视防御比率 */
    ignore_defense_rate: number = 0;
    // /**攻击速度，一秒攻击多少次 */
    // attack_speed:number=1;    
    /** 攻击速度,每多少秒攻击一次，换算成攻速显示则是，（1÷攻击间隔）次/每秒*/
    _gongji_jiange: number = 1;
    public get gongji_jiange(): number {
        return this._gongji_jiange*(1-GameManager.getInstance().getCharioSpeedRotio());
    }

    public set gongji_jiange(n: number) {
        this._gongji_jiange = n;
    }
    base_jiange: number = 1;

    // 实际攻速
    atkSpeed: number = 1;
    /**子弹速度 */
    bullet_speed: number = 1;
    /**额外的暴击率*/
    crit_ex: number = 0;
    /**额外的命中率*/
    hit_ex: number = 0;
    // /** 暴击伤害（倍）*/
    // baoji_shanghai:number=2;
    // //---------------------------技能数值--------------------------------------
    // /** 技能释放需要的MP值*/
    // cost_mp:number=15;
    // /** 冷却时间*/
    // cd_time:number=15;
    // /*大招伤害率*/
    // dazhao_shanghai:number=1.2;
    // /** 大招的其他数值*/
    // dazhao_num:number=0;    
    //---------------------------普通攻击数值--------------------------------------
    //攻击范围
    gongji_fanwei: number = 1000;
    //----------------------------绑定的宠物----------------------------------------
    pet_info: PetInfo = null;
    /**绑定的宠物id */
    pet_id: number = 0;
    //----------------------------专属武器----------------------------------------
    // /**专属武器等级 */
    // exclusive_equip_level:number = -1;
    // 英雄信息

    /**专属武器技能参数 */
    /**技能-技能参数1 */
    public ExclusiveWeaponSkillValue_1: number = 0;
    /**被动技能-技能参数2 */
    public ExclusiveWeaponSkillValue_2: number = 0;
    /**被动技能-技能参数3 */
    public ExclusiveWeaponSkillValue_3: number = 0;
    /**被动技能-技能参数4 */
    public ExclusiveWeaponSkillValue_4: number = 0;

    /**英雄技能 */
    getSkillColdDown(type: SkillType): number {
        return this.ColdDown.get(type);
    }

    getSkillValue1(type: SkillType): number {
        return this.SkillValue_x.get(type);
    }

    getSkillValue2(type: SkillType): number {
        return this.SkillValue_y.get(type);
    }

    getSkillValue3(type: SkillType): number {
        return this.SkillValue_z.get(type);
    }

    getSkillValue4(type: SkillType): number {
        return this.SkillValue_4.get(type);
    }

    getIsUnlock(type: SkillType): boolean {
        return this.unlock_state.get(type);
    }
}

export class GongJiData {
    /**是否为子弹类型的攻击 */
    is_bullet: boolean = true;
    /**本次伤害的英雄数据，经过buff统计的 */
    hero_data: HeroData = null;
    /**方便伤害统计,挂载一个职业,表示此次伤害来源 */
    hero_type: Hero_Type = Hero_Type.ChangMaoShou;
    /**伤害类型 */
    damage_type: DamageType = DamageType.Normal;
    /**伤害比率-应用在技能伤害比率*/
    skill_damage_rate: number = 0;
    /**伤害比率-应用在持续伤害比率*/
    continuous_damage_rate: number = 0;
    /**方便伤害统计,挂载一个宠物id,表示此次伤害来源,大于0表示宠物伤害 */
    pet_id: number = 0;
    /**方便单个技能伤害统计，挂载一个技能id:英雄id*10000+技能使用次数 */
    skill_release_id: number = 0;
    /**是否可以计算暴击,用于技能判断是否能计算暴击的 */
    is_can_crit: boolean = false;
}
