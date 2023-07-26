import { Enemy_Injured_Type } from "../Enemy/EnemyConfig";
import { DamageType } from "../Hero/Game/HeroConfig";
import { JsonMonsterGrowthAttributes } from "./Data/MonsterGrowthAttributes";
import Monster from "./Monster";



/**怪物动作名称 */
export enum MonsterActionName{
    /**待机 */
    Idle="Idle",
    /**走路 */
    Walk="Walk",
    /**攻击 */
    Attack="Attack",
    /**死亡 */
    Death="Death",
    /**受击 */
    Hurt="Hurt",
    /**超级技能 */
    SupportSkill="SupportSkill",
}

/**怪物朝向名称 */
export enum MonsterFaceName{
    /**背面 */
    Back="Back",
    /**正面 */
    Front="Front",
    /**向右侧面 */
    SideR="Side",
    /**向左侧面 */
    SideL="Side",  
}

/**怪物皮肤类型 */
export enum MonsterSkinType{
    /**皮肤1 */
    Skin1=1,
    /**皮肤2 */
    Skin2,
    /**皮肤3 */
    Skin3,
    /**皮肤4 */
    Skin4,
}

export enum ColorType{
    /**无，表示白色 */
    Null=0,
    /**受伤，表示红色 */
    Injured,
    /**减速，表示蓝色 */
    SlowDown,
    
}

/**关键事件帧数据 */
export class KeyFrameData{
    /**名称 */
    name:string='Attack';
    /**触发事件帧时的回调函数 */
    callback:Function=null;
}

/**反馈类型 */
export enum FeedBackType{
    /**无 */
    Null=0,
    /**闪避 */
    ShanBi,
    /**格挡 */
    GeDang,
    /**免疫 */
    MainYi,
    /**已经死亡 */
    Die,
    /**暴击 */
    BaoJi,
    /**免疫 */
}
/**受伤数据 */
export class InjuredData{
    /**是否死亡 */
    is_die:boolean=false;
    /**造成的最终伤害数值 */
    private damage_num:number=0;    
    /**伤害反馈的类型 */
    feedback_type:FeedBackType=FeedBackType.Null;
    /**伤害文本类型 */
    text_type:Enemy_Injured_Type=Enemy_Injured_Type.Normal_Attack;
    /**设置伤害值 */
    setDamageNum(num:number){
        if(num<0){
            num=0;
        }
        this.damage_num=num;
    }
    /**获得本次的伤害值 */
    getDamageNum():number{
        return this.damage_num;
    }

    /**
     * 
     * @param missValue 受击方-闪避值
     * @param hitValue 打击方-命中值
     * @returns 闪避率
     */
    static calcMissRate(missValue:number,hitValue:number):number{
        //闪避率计算,先计算 差值=受击方闪避值-攻击方命中值,30点及以下的差值每一点转换成1.5%闪避率,300点以上的差值每一点转换为1%闪避率,闪避率最小为0，必定无法闪避；闪避最大为100%，必定闪避
        let value=missValue-hitValue;
        let rate=value<300?value*0.001:value*0.0005;
        if(rate<0){
            rate=0;
        }else if(rate>1){
            rate=1;
        }
        return rate;
    }
    /**
     * 
     * @param critValue 打击方-暴击值
     * @param antiCritValue 被击方-防暴值
     * @returns 暴击率
     */
    static calcCritRate(critValue:number,antiCritValue:number):number{
        //暴击率 先计算 差值=攻击方暴击值-受击方防暴值,30点及以下的差值每一点转换成1.5%暴击率,300点以上的差值每一点转换为1%暴击率,暴击率最小为0，必定无法暴击；暴击率最大为100%，必定暴击
        let value=critValue-antiCritValue;
        let rate=value<300?value*0.001:value*0.0005;
        if(rate<0){
            rate=0;
        }else if(rate>1){
            rate=1;
        }
        return rate;
    }
    /**
     * 
     * @param rateArr 概率数组，数据根据优先级排列
     * @returns 返回产生对应概率的下标，表示其类型
     * @example 
     * let type1=0.2;//--闪避率
     * let type2=0.3;//--暴击率
     * let type3=1;//命中
		let type=InjuredData.getOnceType([type1,type2,type3]);//计算后数组的值会变为[0.2,0.3,0.5],然后从这3个中随机一个类型下标并且返回
        type=1;
     */
    static calcOnceType(rateArr:number[]):number{
        //cc.log("之前:"+rateArr);
        //先处理数组
        let remainRate=1;
        for(let i=0; i<rateArr.length; i++){
            if(remainRate>0){
                let rate=rateArr[i];
                let newRemainRate=remainRate-rate;
                if(newRemainRate>0){                    
                    //末尾的还剩余概率
                    if(i==rateArr.length-1){
                        rateArr[i]=remainRate;
                    }else{
                        remainRate=newRemainRate;
                    }
                }else{
                    rateArr[i]=remainRate;
                    remainRate=0;
                }
            }else{
                rateArr[i]=0;
            }                        
        }
        //cc.log("后来:"+rateArr);
        //根据权重随机一个
        let curValue=0;
        let randValue=Math.random();;
        let type=0;
        for(let i=0; i<rateArr.length; i++){
            curValue+=rateArr[i];
            if(randValue<curValue){
                type=i;
                break;
            }
        }
        //cc.log("使用:"+type);
        return type;
    }
    /**
     * 计算普通攻击不暴击（攻方攻击力*（1±3%）-防方防御力）*（1+攻方增伤率）*（1-防方减伤率）实际普攻伤害低于5时，触发保底机制，随机造成5~10点伤害
     * @param attack 打击方-攻击力
     * @param defense 受击方-防御力
     * @param zengShang 攻击方-增伤比率
     * @param jianShang 受击方-减伤比率
     * @returns 最终普攻伤害
     */
    static calcNormalDamageNum(attack:number,defense:number,zengShang:number,jianShang:number):number{
        //（攻方攻击力*（1±3%）-防方防御力）*（1+攻方增伤率）*（1-防方减伤率）实际普攻伤害低于5时，触发保底机制，随机造成5~10点伤害      
        
          
        let randNum=Math.random()*0.03;
        attack=Math.random()>0.5?(attack*(1-randNum)):(attack*(1+randNum));
        //（攻方攻击力*（1±3%）-防方防御力）
        let num=attack-defense;
        //（1+攻方增伤率）*（1-防方减伤率）
        num=num*(1+zengShang)*(1-jianShang);        
        //实际普攻伤害低于5时，触发保底机制，随机造成5~10点伤害
        num=num<5?(Math.random()*5+5):num;
        num=Math.round(num);
        return num;
    }
    /**
     * 计算普通攻击暴击伤害数值,（攻方攻击力*（1±3%）*最终暴击增幅-防方防御力）*（1+攻方增伤率）*（1-防方减伤率）
     * @param attack 打击方-攻击力
     * @param defense 受击方-防御力
     * @param zengShang 攻击方-增伤比率
     * @param jianShang 受击方-减伤比率
     * @param finalExtraCrit 最终暴击增幅
     * @returns 最终暴击后的伤害
     */
    static calcNormalCritDamageNum(attack:number,defense:number,zengShang:number,jianShang:number,finalExtraCrit:number):number{
        //（攻方攻击力*（1±3%）
        let randNum=Math.random()*0.03;
        attack=Math.random()>0.5?(attack*(1-randNum)):(attack*(1+randNum));
        //（攻方攻击力*（1±3%）*最终暴击增幅-防方防御力）
        let num=attack*finalExtraCrit-defense;
        //（1+攻方增伤率）*（1-防方减伤率）
        num=num*(1+zengShang)*(1-jianShang);        
        //实际普攻伤害低于5时，触发保底机制，随机造成5~10点伤害
        num=num<5?(Math.random()*5+5):num;
        num=Math.round(num);
        return num;
    }

    /**
     * 计算技能不暴击（攻方攻击力*技能伤害系数-防方防御力）*（1+攻方增伤率）*（1-防方减伤率）
     * @param attack 打击方-攻击力
     * @param damageRate 伤害比率
     * @param defense 受击方-防御力
     * @param zengShang 攻击方-增伤比率
     * @param jianShang 受击方-减伤比率
     * @returns 最终技能伤害
     */
     static calcSkillDamageNum(attack:number,damageRate:number,defense:number,zengShang:number,jianShang:number):number{
        //（攻方攻击力*技能伤害系数-防方防御力）*（1+攻方增伤率）*（1-防方减伤率）
        //（攻方攻击力*技能伤害系数）
        attack*=damageRate;
        //（攻方攻击力*（1±3%）
        let randNum=Math.random()*0.03;
        attack=Math.random()>0.5?(attack*(1-randNum)):(attack*(1+randNum));
        //（攻方攻击力*技能伤害系数-防方防御力）
        let num=attack-defense;
        //（1+攻方增伤率）*（1-防方减伤率）
        num=num*(1+zengShang)*(1-jianShang);        
        //实际普攻伤害低于5时，触发保底机制，随机造成5~10点伤害
        num=num<1?1:num;
        num=Math.round(num);
        return num;
    }    

    /**
     * 计算技能暴击伤害数值,（攻方攻击力*技能伤害系数*最终暴击增幅-防方防御力）*（1+攻方增伤率）*（1-防方减伤率）
     * @param attack 打击方-攻击力
     * @param defense 受击方-防御力
     * @param zengShang 攻击方-增伤比率
     * @param jianShang 受击方-减伤比率
     * @param finalExtraCrit 最终暴击增幅
     * @returns 最终暴击后的伤害
     */
    static calcSkillCritDamageNum(attack:number,damageRate:number,defense:number,zengShang:number,jianShang:number,finalExtraCrit:number):number{
        //（攻方攻击力*技能伤害系数*最终暴击增幅-防方防御力）*（1+攻方增伤率）*（1-防方减伤率）
        //（攻方攻击力*技能伤害系数）
        attack*=damageRate;
        //（攻方攻击力*（1±3%）
        let randNum=Math.random()*0.03;
        attack=Math.random()>0.5?(attack*(1-randNum)):(attack*(1+randNum));
        //（攻方攻击力*技能伤害系数-防方防御力）
        let num=attack*finalExtraCrit-defense;
        //（1+攻方增伤率）*（1-防方减伤率）
        num=num*(1+zengShang)*(1-jianShang);        
        //实际普攻伤害低于5时，触发保底机制，随机造成5~10点伤害
        num=num<5?(Math.random()*5+5):num;
        num=Math.round(num);
        return num;
    }

    /**
     * 计算技能真伤(攻方攻击力*技能伤害系数)
     * @param attack 打击方-攻击力
     * @param damageRate 伤害比率
     * @returns 最终技能伤害
     */
     static calcSkillRealDamageNum(attack:number,damageRate:number):number{
        //（攻方攻击力*技能伤害系数）
        let num=attack*damageRate;
        num=num<5?(Math.random()*5+5):num;
        num=Math.round(num);
        return num;
    }

    /**
     * 计算技能暴击真伤(攻方攻击力*技能伤害系数)
     * @param attack 打击方-攻击力
     * @param damageRate 伤害比率
     * @param finalExtraCrit 最终暴击增幅
     * @returns 最终技能伤害
     */
     static calcSkillCritRealDamageNum(attack:number,damageRate:number,finalExtraCrit:number):number{
        //（攻方攻击力*技能伤害系数）
        let num=attack*damageRate*finalExtraCrit;
        num=num<5?(Math.random()*5+5):num;
        num=Math.round(num);
        return num;
    }

    /**
     * 计算普通攻击真伤(攻方攻击力)
     * @param attack 打击方-攻击力
     * @returns 最终伤害
     */
     static calcNormalRealDamageNum(attack:number):number{
        //（攻方攻击力
        let num=attack;
        num=num<5?(Math.random()*5+5):num;
        num=Math.round(num);
        return num;
    }

    /**
     * 计算普通攻击暴击真伤(攻方攻击力*最终暴击增幅)
     * @param attack 打击方-攻击力
     * @param finalExtraCrit 最终暴击增幅
     * @returns 最终伤害
     */
     static calcNormalCritRealDamageNum(attack:number,finalExtraCrit:number):number{
        //（攻方攻击力*最终暴击增幅
        let num=attack*finalExtraCrit;
        num=num<5?(Math.random()*5+5):num;
        num=Math.round(num);
        return num;
    }
    
    /**
     * 最终暴击增幅:攻方暴击增幅-防方暴击抗性
     * @param extraCrit 攻方暴击增幅
     * @param antiExtraCrit 防方暴击抗性
     * @returns 最终暴击增幅
     */
    static calcFinalExtraCrit(extraCrit:number,antiExtraCrit:number):number{
        //*最终暴击增幅:攻方暴击增幅-防方暴击抗性
        let finalExtraCrit=extraCrit-antiExtraCrit;
        if(finalExtraCrit<1.2){
            finalExtraCrit=1.2;
        }
        return finalExtraCrit
    }

    /**
     * 最终防御:防御方防御力*（1-攻方无视防御比率）
     * @param defense 防御方防御力
     * @param ignoreRate 攻方无视防御比率
     * @returns 最终防御
     */
     static calcFinalDefense(defense:number,ignoreRate:number):number{
        //最终防御:防御方防御力*（1-攻方无视防御）
        let finalDefense=defense*(1-ignoreRate);
        if(finalDefense<0){
            finalDefense=0;
        }
        return finalDefense
    }

    /**
     * 
     * @param damage 最终伤害值
     * @param bloodRate 吸血率
     * @param zhongshangRate 重伤率
     * @returns 吸血值
     */
    static calcBloodSucking(damage:number,bloodRate:number,zhongshangRate:number):number{
        //造成普攻伤害时，可以按比例获得普攻伤害的生命值；吸血值=普攻实际伤害*吸血率*（1-重伤率）
        let num=damage*bloodRate*(1-zhongshangRate);
        num=Math.round(num);
        return num;
    }

    /**
     * 计算具体的减速数值
     * @param baseSpeed 基础移动速度
     * @param subNum 减速效果%
     * @param resistNum 减速抗性
     * @param addNum 加速效果
     * @returns 最终的速度
     */
    static calcSlowDownNum(baseSpeed:number,subNum:number,resistNum:number,addNum:number):number{
        //减速后的移动速度=初始移动速度*（1+加速效果-攻击方减速效果*（1-受击方减速抗性））
        let num=baseSpeed*((1+addNum-subNum)*(1-resistNum));
        if(num<0){
            num=0;
        }
        return num;
    }
    /**
     * 计算减速的持续时间
     * @param subNum 减速效果
     * @param resistNum 减速抗性
     * @param toughness 受击方韧性
     * @param insight 攻击方洞察
     * @returns 最终的持续时间
     */
    static calcSlowDownTime(subNum:number,resistNum:number,toughness:number,insight:number):number{
        //减速后的移动速度=初始移动速度*（1-攻击方减速效果*（1-受击方减速抗性-受击方韧性+攻击方洞察））

        return subNum;
    }
    /**
     * 计算控制时间（眩晕、减速）
     * @param xuanyunTime 眩晕时间
     * @param toughness 受击方韧性
     * @param insight 攻击方洞察力
     * @returns 最终的眩晕时间
     */
     static calcControlTime(xuanyunTime:number,toughness:number,insight:number):number{
        //控制时长=眩晕时间*（1-受击方韧性+攻击方洞察），控制时长最低为0.1秒
        let num=xuanyunTime*(1-toughness+insight);
        if(num<0.1){
            num=0.1;
        }
        return num;
    }
}
/**隐藏属性 */
export class HiddenAttribute{
    /**生命回复 */
    life_recovery:number=0;
    /**穿透值 */
    penetration_value:number=0;
    /**穿透率 */
    penetration_rate:number=0;
    /**吸血率 */
    blood_sucking_rate:number=0;
    /**重伤率 */
    serious_injury_rate:number=0;
    /**减速抗性 */
    slow_resistance:number=0;
    /**韧性 */
    toughness:number=0;
    /**洞察 */
    insight:number=0;
}

export enum GongJiMode{
    /**近战 */
    Melee=1,
    /**远程 */
    Far=2,
}
/**怪物类型 */
export enum StrengthType{
    /**普通怪 */
    Normal=1,
    /**精英怪 */
    Elite=2,
    /**首领怪 */
    Boss=3,
}
/**怪物攻击数据 */
export class MonsterAttData{
    /**是否为子弹类型的攻击 */
    is_bullet:boolean=true;
    /**怪物属性 */
    monster_attribute:JsonMonsterGrowthAttributes=null;
    /**伤害类型 */
    damage_type:DamageType=DamageType.Normal;
    /**技能伤害比率*/
    skill_rate:number=0;
    /**增伤率 */  
    zengshang_rate:number=0;
    /**怪物强度类型 */
    strength_type:StrengthType=StrengthType.Normal;
    monster_ts:Monster=null;
    /**技能震屏效果 */
    is_big:boolean=true;
}

export class MonsterSkillData{

    /**初始冷却时间 */
    public InitColdDown:Map<number,number> = null ;
    /**技能冷却时间 */
    public ColdDown:Map<number,number> = null ;
    /**技能-技能参数1,获得具体技能槽的技能1参数，使用：SkillValue_1.get(1) */
    public SkillValue_1:Map<number,number> = null ;
    /**被动技能-技能参数2 */
    public SkillValue_2:Map<number,number> = null ;
    /**被动技能-技能参数3 */
    public SkillValue_3:Map<number,number> = null ;
    /**被动技能-技能参数4 */
    public SkillValue_4:Map<number,number> = null ;

    public CastingRange:Map<number,number> = null ;
    /**怪物释放距离 */
    getCastingRange(type:number):number{
        return this.CastingRange.get(type);
    }

    /**怪物技能技能冷却时间 */
    getSkillColdDown(type:number):number{
        return this.ColdDown.get(type);
    }

    /**怪物技能初始的技能冷却时间 */
    getSkillInitColdDown(type:number):number{
        return this.ColdDown.get(type);
    }

    getSkillValue1(type:number):number{
        return this.SkillValue_1.get(type);
    }

    getSkillValue2(type:number):number{
        return this.SkillValue_2.get(type);
    }

    getSkillValue3(type:number):number{
        return this.SkillValue_3.get(type);
    }

    getSkillValue4(type:number):number{
        return this.SkillValue_4.get(type);
    }
}