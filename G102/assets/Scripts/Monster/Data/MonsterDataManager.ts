import { AssetsEventType, EventManager } from "../../Tools/EventManager";
import { Enemy_Type } from "../../Enemy/EnemyConfig";
import { MonsterAttributeManager } from "./MonsterAttribute";
import { MonsterFeatureManager } from "./MonsterFeature";
import { MonsterManualManager } from "./MonsterManual";
import { MonsterConfigureManager } from "./MonsterConfigure";
import { MonsterGrowthAttributesManager } from "./MonsterGrowthAttributes";
import { MonsterGroupConfigureManager } from "./MonsterGroupConfigure";
import { MonsterSkillManager } from "./MonsterSkill";


export class MonsterDataManager {

    private static _instance: MonsterDataManager = null;
    //资源

    //怪物数据
    //消灭的敌人数量统计
    private kill_enemys:number[]=[];

    public static getInstance():MonsterDataManager {
        if(this._instance==null) {
            this._instance=new MonsterDataManager();
            this._instance.init();
        }
        return this._instance;
    }
    //初始化游戏数据
    private init () {
        MonsterAttributeManager.getInstance();
        MonsterFeatureManager.getInstance();
        MonsterManualManager.getInstance();
        MonsterConfigureManager.getInstance();
        MonsterGrowthAttributesManager.getInstance();
        MonsterGroupConfigureManager.getInstance()
        MonsterSkillManager.getInstance();
        //this.loadAllKillEnemy();
    }
    

    //********************************************敌人的*************************************************
    private loadAllKillEnemy()
    {
        this.kill_enemys=new Array<number>();
        for(let i=0; i<Enemy_Type.enemy_num; i++)
        {
            let num=cc.sys.localStorage.getItem('kill_enemy_'+i);
            if(num==="" || num===null)
            {
                num=0;
                this.saveKillEnemy(i,num);
            }else
            {
                num=parseInt(num);
                // if(IsDebug)
                // num=99999;
                this.kill_enemys[i]=num;
            }
        }
    }

    getKillEnemy(type:Enemy_Type):number
    {
        return this.kill_enemys[type];
    }

    addKillEnemy(type:Enemy_Type,addNum:number)
    {
        this.kill_enemys[type]+=addNum;
    }

    saveKillEnemy(type:Enemy_Type,num:number)
    {
        this.kill_enemys[type]=num;
        cc.sys.localStorage.setItem('kill_enemy_'+type,num);
    }

    saveAllKillEnemy()
    {
        for(let i=0; i<Enemy_Type.enemy_num; i++)
        {
            cc.sys.localStorage.setItem('kill_enemy_'+i,this.kill_enemys[i]);
        }
        //EventManager.postAssetsEvent(AssetsEventType.KILL_ENEMY);
    }

    //获取击杀奖励阶段
    getKillRewardLevel(type:Enemy_Type):number
    {
        let num=cc.sys.localStorage.getItem('kill_reward_level_'+type);
        if(num==="" || num===null)
        {
            num=0;
        }else
        {
            num=parseInt(num);
        }
        return num;
    }

    saveKillRewardLevel(type:Enemy_Type,num:number)
    {
        // let enemyData=EnemyJsonData[type];
        // let killNums=enemyData.kill_num.split('|');
        // let maxLevel=killNums.length;
        // if(num<=maxLevel)
        
        cc.sys.localStorage.setItem('kill_reward_level_'+type,num);
    }

    getIsCanGetKillReward(enemyType:Enemy_Type):boolean
    {
        let jieduan=this.getKillRewardLevel(enemyType);
        let id=this.getMonsterIdByType(enemyType);
        let killNums=MonsterManualManager.getInstance().getKillNumber(id);
        if(jieduan>killNums.length)
        {
            return false;
        }else
        {
            if(jieduan==killNums.length)
            {
                jieduan=killNums.length-1;
            }
            let needNum=killNums[jieduan];
            let killNum=this.kill_enemys[enemyType];
            if(killNum>=needNum)
            {
                return true;
            }
        }
        return false;
    }

    getIsUnlockEnemy(enemyType:Enemy_Type):boolean
    {
        return this.kill_enemys[enemyType]>0?true:false;
    }


    
    /**根据怪物类型获取怪物ID */
    public getMonsterIdByType(type:Enemy_Type): number {
        return 50000+(type)*10;
    }
    /**根据怪物类型和击杀阶段获取钻石奖励的数量 */
    public getDiamondRewardByLevel(type:Enemy_Type,level:number){
        let id=this.getMonsterIdByType(type);
        let diamondNums=MonsterManualManager.getInstance().getDiamondReward(id);
        if(level>=diamondNums.length)
        {
            level=diamondNums.length-1;
        }
        return diamondNums[level];
    }
}
