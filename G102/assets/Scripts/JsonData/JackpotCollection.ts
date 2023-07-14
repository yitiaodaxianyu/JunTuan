import { LoadManager } from "../Loading/LoadManager";

export class JsonJackpotCollection {
    /**奖池ID */
    public JackpotID:number = 0 ;
    /**总权重数 */
    public Weight_Sum:number = 0 ;
    /**掉落组列 */
    public Drop_Array:number[] = [] ;
    /**掉落数量 */
    public Drop_Num:number[] = [] ;
    /**各个权重 */
    public Weight:number[] = [] ;
}

export class JackpotCollectionManager {
    private static _instance: JackpotCollectionManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonJackpotCollection>=null;
    private is_load_completed:boolean=false;

    public static getInstance():JackpotCollectionManager {
        if(this._instance==null) {
            this._instance=new JackpotCollectionManager();
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
        LoadManager.loadJson('JackpotCollection',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonJackpotCollection成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonJackpotCollection();
                jsonData=json[i];
                this.data.set(jsonData.JackpotID,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonJackpotCollection(id:number):JsonJackpotCollection {
        return this.data.get(id);
    }
    /**根据奖池ID获取总权重数 */
    public getWeight_Sum(id:number): number {
        return this.data.get(id).Weight_Sum;
    }
    /**根据奖池ID获取掉落组列 */
    public getDrop_Array(id:number): number[] {
        return this.data.get(id).Drop_Array;
    }
    /**根据奖池ID获取掉落数量 */
    public getDrop_Num(id:number): number[] {
        return this.data.get(id).Drop_Num;
    }
    /**根据奖池ID获取各个权重 */
    public getWeight(id:number): number[] {
        return this.data.get(id).Weight;
    }

    /** 静态方法，获取最大的 奖池ID*/
    public static getMaxJackpotID():number {
        return 1010002;
    }

    //以上格式统一，以下写每个json数据的特殊需求
    /**
     * 
     * @param jackpotCollectID 奖池集id
     * @param jackpotID 奖池id
     */
    public getRateByJackpotId(jackpotCollectID:number,jackpotID:number):number{

        let rate=0;
        let jj=this.getJsonJackpotCollection(jackpotCollectID);
        let totalWeight=jj.Weight_Sum;
        let arrLen=jj.Weight.length;
        //如果总权重为0，就自己算算
        if(totalWeight<=0)
        {
            for(let w=0; w<arrLen; w++)
            {
                let weightNum=jj.Weight[w];
                totalWeight+=weightNum;
            }
        }
        let index=jj.Drop_Array.indexOf(jackpotID);
        if(index!=-1){
            rate=jj.Weight[index]/totalWeight;
        }
        return rate;
    }

    /** 根据奖池集id 随机获取奖池id*/
    public getJackpotIdByJCId(id:number):number
    {
        let jId=0;
        let jj=this.getJsonJackpotCollection(id);
        //根据权重随机
        let totalWeight=jj.Weight_Sum;
        let arrLen=jj.Weight.length;
        //如果总权重为0，就自己算算
        if(totalWeight<=0)
        {
            for(let w=0; w<arrLen; w++)
            {
                let weightNum=jj.Weight[w];
                totalWeight+=weightNum;
            }
        }
        let randWeight=Math.random()*totalWeight;                
        let curWeight=0;
        //判断权重在哪个奖品上
        for(let w=0; w<arrLen; w++)
        {
            let weightNum=jj.Weight[w]
            curWeight+=weightNum;
            if(randWeight<curWeight)
            {
                jId=jj.Drop_Array[w];
                break;
            }
        }
        return jId;
    }
}
