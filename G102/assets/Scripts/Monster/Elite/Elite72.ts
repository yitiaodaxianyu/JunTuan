
import MonsterNewNormal from "../MonsterNewNormal";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Elite72 extends MonsterNewNormal {

    protected onLoad(): void {
        super.onLoad();
        super.addMonsterNormalInited(this.onMonsterNormalInited);
    }

    onMonsterNormalInited () {
        //最大生命值的技能
        this.cur_hp=this.max_hp=this.monster_data.Health*(1+1);
    }


    

}
