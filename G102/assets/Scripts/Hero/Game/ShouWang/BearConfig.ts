


export enum BearAnimaName  {
   Attack='Attack',
   Idle='Idle',
   Run='Run',
   Start='Start',
   Walk='Walk'
   
}

export enum BearState{
    /**生成 */
    born=0,
    /**待机 */
    idle=1,
    /**移动 */
    move=2,
    /**攻击 */
    attack=3,
    /**消失 */
    destory=4,
}

export const BearMoveSpeed:number=150;
export const BearAttackSpeed:number=2;
export const BearAttackDistance:number=40;
