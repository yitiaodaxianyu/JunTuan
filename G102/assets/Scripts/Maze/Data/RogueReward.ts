import { RewardData } from "../../JsonData/LevelJsonData";
import { LoadManager } from "../../Loading/LoadManager";
import { PropId } from "../../Prop/PropConfig";

export class JsonRogueReward {
    /**格子ID */
    public Hexagon_ID:number = 0 ;
    /**道具1_ID */
    public RogueProp1_ID:number = 0 ;
    /**道具1_数量 */
    public RogueProp1_Sum:number = 0 ;
    /**道具2_ID */
    public RogueProp2_ID:number = 0 ;
    /**道具2_数量 */
    public RogueProp2_Sum:number = 0 ;
    /**道具3_ID */
    public RogueProp3_ID:number = 0 ;
    /**道具3_数量 */
    public RogueProp3_Sum:number = 0 ;
    /**探索币数量 */
    public ExploreCoins_Sum:number = 0 ;
}

export class RogueRewardManager {
    private static _instance: RogueRewardManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonRogueReward>=null;
    private is_load_completed:boolean=false;

    public static getInstance():RogueRewardManager {
        if(this._instance==null) {
            this._instance=new RogueRewardManager();
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
        LoadManager.loadJson('RogueReward',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonRogueReward成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonRogueReward();
                jsonData=json[i];
                this.data.set(jsonData.Hexagon_ID,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonRogueReward(id:number):JsonRogueReward {
        return this.data.get(id);
    }
    /**根据格子ID获取道具1_ID */
    public getRogueProp1_ID(id:number): number {
        return this.data.get(id).RogueProp1_ID;
    }
    /**根据格子ID获取道具1_数量 */
    public getRogueProp1_Sum(id:number): number {
        return this.data.get(id).RogueProp1_Sum;
    }
    /**根据格子ID获取道具2_ID */
    public getRogueProp2_ID(id:number): number {
        return this.data.get(id).RogueProp2_ID;
    }
    /**根据格子ID获取道具2_数量 */
    public getRogueProp2_Sum(id:number): number {
        return this.data.get(id).RogueProp2_Sum;
    }
    /**根据格子ID获取道具3_ID */
    public getRogueProp3_ID(id:number): number {
        return this.data.get(id).RogueProp3_ID;
    }
    /**根据格子ID获取道具3_数量 */
    public getRogueProp3_Sum(id:number): number {
        return this.data.get(id).RogueProp3_Sum;
    }
    /**根据格子ID获取探索币数量 */
    public getExploreCoins_Sum(id:number): number {
        return this.data.get(id).ExploreCoins_Sum;
    }

    /** 静态方法，获取最大的 格子ID*/
    public static getMaxHexagon_ID():number {
        return 30091;
    }

    //以上格式统一，以下写每个json数据的特殊需求

    public getRewardDatas(id:number):RewardData[] {
        let rewadDatas=new Array();
        let jsonData=this.getJsonRogueReward(id);
        //探索币/迷宫币
        let rd1=new RewardData();
        rd1.reward_id=PropId.MazeCoin;
        rd1.reward_num=jsonData.ExploreCoins_Sum;
        rewadDatas.push(rd1);
        for(let i=1; i<=3; i++){
            let rd=new RewardData();            
            rd.reward_id=jsonData['RogueProp'+i+'_ID'];
            rd.reward_num=jsonData['RogueProp'+i+'_Sum'];
            if(rd.reward_id>0&&rd.reward_num){
                rewadDatas.push(rd);
            }            
        }
        return rewadDatas;
    }
}
