/**无尽buff的类型 */
export enum EndlessBuffType{
    Null=0,
    /**1.攻击力提升 */
    Attack=1,
    /**2.攻速提升 */
    AttackSpeed=2,
    /**3.暴击率提升 */
    CritRate=3,
    /**4.暴击伤害提升 */
    CritDamage=4,
    /**5.防御力提升 */
    Defense=5,
    /**6.生命值提升 */
    HealthMax=6,
    /**7.每秒回复生命值 */
    HealthSec=7,
    /**8.立即回复生命值（注：该buff生效后立即消失） */
    HealthTeamAdd=8,
    /**9.连续攻击+1 */
    DoubleAttack=9,
    /**10.主动技能百分比冷却缩减 */
    ActiveSkillCd=10,
    /**11.伤害加成 */
    AddDamage=11,
                
}


export class EndlessBuff{
    /**无尽buff的类型 */
    type:EndlessBuffType=EndlessBuffType.Null;
    /**无尽buff的id */
    id:number=0;
    /**无尽buff的强度 */
    rarity:number=0;
    /**无尽buff的参数值 */
    value:number=0;

}