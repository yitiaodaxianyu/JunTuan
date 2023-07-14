import { RewardData } from "../JsonData/LevelJsonData";
import { LoadManager } from "../Loading/LoadManager";
import { PropId } from "../Prop/PropConfig";

export class JsonTowerReward {
    /**层数 */
    public Floor:number = 0 ;
    /**金币 */
    public Coin:number = 0 ;
    /**英雄经验 */
    public HeroExp:number = 0 ;
    /**钻石 */
    public Gem:number = 0 ;
    /**奖励道具1 */
    public ItemReward_1:number = 0 ;
    /**奖励数量1 */
    public Reward_1:number = 0 ;
    /**奖励道具2 */
    public ItemReward_2:number = 0 ;
    /**奖励数量2 */
    public Reward_2:number = 0 ;
    /**奖励道具3 */
    public ItemReward_3:number = 0 ;
    /**奖励数量3 */
    public Reward_3:number = 0 ;
}

export class TowerRewardManager {
    private static _instance: TowerRewardManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonTowerReward>=null;
    private is_load_completed:boolean=false;

    public static getInstance():TowerRewardManager {
        if(this._instance==null) {
            this._instance=new TowerRewardManager();
            this._instance.init();
        }
        return this._instance;
    }
    //初始化游戏数据
    private init() {
        if(!this.data) {
            this.loadJson();
        }
    }
    //加载json
    private loadJson() {
        LoadManager.loadJson('TowerReward',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonTowerReward成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonTowerReward();
                jsonData=json[i];
                this.data.set(jsonData.Floor,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonTowerReward(id:number):JsonTowerReward {
        return this.data.get(id);
    }
    /**根据层数获取金币 */
    public getCoin(id:number): number {
        return this.data.get(id).Coin;
    }
    /**根据层数获取英雄经验 */
    public getHeroExp(id:number): number {
        return this.data.get(id).HeroExp;
    }
    /**根据层数获取钻石 */
    public getGem(id:number): number {
        return this.data.get(id).Gem;
    }
    /**根据层数获取奖励道具1 */
    public getItemReward_1(id:number): number {
        return this.data.get(id).ItemReward_1;
    }
    /**根据层数获取奖励数量1 */
    public getReward_1(id:number): number {
        return this.data.get(id).Reward_1;
    }
    /**根据层数获取奖励道具2 */
    public getItemReward_2(id:number): number {
        return this.data.get(id).ItemReward_2;
    }
    /**根据层数获取奖励数量2 */
    public getReward_2(id:number): number {
        return this.data.get(id).Reward_2;
    }
    /**根据层数获取奖励道具3 */
    public getItemReward_3(id:number): number {
        return this.data.get(id).ItemReward_3;
    }
    /**根据层数获取奖励数量3 */
    public getReward_3(id:number): number {
        return this.data.get(id).Reward_3;
    }

    /** 静态方法，获取最大的 层数*/
    public static getMaxFloor():number {
        return 480;
    }

    //以上格式统一，以下写每个json数据的特殊需求

    getRewardDatas(level:number):Array<RewardData>{
        let allRewardData=new Array<RewardData>();
        let jsonData=this.getJsonTowerReward(level);
        for(let i=1; i<=3; i++){
            if(jsonData['ItemReward_'+i]>0 && jsonData['Reward_'+i]>0){
                let rd=new RewardData();
                rd.reward_id=jsonData['ItemReward_'+i];
                rd.reward_num=jsonData['Reward_'+i];
                allRewardData.push(rd);
            }
        }
        
        //英雄经验
        if(jsonData.HeroExp>0){
            let rd=new RewardData();
            rd.reward_id=PropId.HeroExp;
            rd.reward_num=jsonData.HeroExp;
            allRewardData.push(rd);
        }
        //玩家经验
        if(jsonData.Coin>0){
            let rd=new RewardData();
            rd.reward_id=PropId.Coin;
            rd.reward_num=jsonData.Coin;
            allRewardData.push(rd);
        }
        //钻石
        if(jsonData.Gem>0){
            let rd=new RewardData();
            rd.reward_id=PropId.Gem;
            rd.reward_num=jsonData.Gem;
            allRewardData.push(rd);
        }   
        return allRewardData;    
    }
    
}
