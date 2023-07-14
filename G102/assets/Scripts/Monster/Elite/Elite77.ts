
import MonsterNewNormal from "../MonsterNewNormal";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Elite61 extends MonsterNewNormal {

    protected onLoad(): void {
        super.onLoad();
        super.addMonsterNormalInited(this.onMonsterNormalInited);
    }

    onMonsterNormalInited () {
        //最大生命值的技能
        switch(this.monster_id){
            case 20771:{
                this.cur_hp=this.max_hp=this.monster_data.Health*(1+1);
            }break;
            case 20772:{
                this.cur_hp=this.max_hp=this.monster_data.Health*(1+1.5);
            }break;
        }
        
    }


    

}
