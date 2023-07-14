import { AttRangeType } from "../../Hero/Game/HeroConfig";
import { MonsterAttributeManager } from "../../Monster/Data/MonsterAttribute";
import { MonsterDataManager } from "../../Monster/Data/MonsterDataManager";
import { Enemy_Type } from "../EnemyConfig";
import EnemyIconManager from "./EnemyIconManager";


const {ccclass, property} = cc._decorator;

@ccclass
export default class EnemyIcon extends cc.Component {

    enemy_type:Enemy_Type=Enemy_Type.shuyao;
    is_boss:boolean=false;

    init (type:Enemy_Type,isBoss:boolean) {
        this.enemy_type=type;
        this.is_boss=isBoss;
        this.refreshData();
    }

    refreshData(){
        let spName='TX_GuaiWu_0'+(this.enemy_type-1);
        if(this.enemy_type>10)
        {
            spName='TX_GuaiWu_'+(this.enemy_type-1);
        }
        //根据怪物类型设置怪物图标
        this.node.getComponent(cc.Sprite).spriteFrame=EnemyIconManager.getInstance().getSpByName(spName);
        //设置是否boss
        this.node.getChildByName('boss').active=this.is_boss;;
        //设置单位
        let id=MonsterDataManager.getInstance().getMonsterIdByType(this.enemy_type);
        let danweis=MonsterAttributeManager.getInstance().getArea(id);
        let danweiRoot=this.node.getChildByName('danweiRoot');
        for(let i=0; i<danweiRoot.childrenCount; i++)
        {
            let danwei=danweiRoot.children[i];
            if(i<danweis.length)
            {
                danwei.active=true;
                let str='TY_icon_Lu';
                switch(danweis[i])
                {
                    case AttRangeType.LuDi: str='JS_iconSX_06'; break;
                    case AttRangeType.TianKong: str='JS_iconSX_07'; break;
                    case AttRangeType.DunDi: str='JS_iconSX_05'; break;
                }
                danwei.getComponent(cc.Sprite).spriteFrame=EnemyIconManager.getInstance().getSpByName(str);
            }else
            {
                danwei.active=false;
            }
        }
    }

}
