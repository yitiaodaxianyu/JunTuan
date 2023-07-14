
import { Enemy_State } from "../../Enemy/EnemyConfig";
import MyTool from "../../Tools/MyTool";
import MonsterNewNormal from "../MonsterNewNormal";


const {ccclass, property} = cc._decorator;

@ccclass
export default class ShuiJingJuXie extends MonsterNewNormal {

    protected onLoad(): void {
        super.onLoad();
        super.addMonsterNormalInited(this.onMonsterNormalInited);
    }

    onMonsterNormalInited () {
        //钻地
        this.unschedule(this.idleToMove);
        this.setEnemyState(Enemy_State.born);
        this.collider.enabled=false;
        //设置一个随机的坐标
        this.node.y=MyTool.randomRangeInt(-100,100);
        super.playSpinAnimaton("Side_Skill2",false,null,()=>{
            this.collider.enabled=true;
            super.playSpinAnimaton("Side_Skill",false,null,()=>{
                //恢复移动
                this.idleToMove();
            });
        });
    }


}
