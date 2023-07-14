import { LoadManager } from "../Loading/LoadManager";

export class JsonDrawCardProbability {
    /**概率行ID */
    public ProbabilityID:number = 0 ;
    /**概率文本 */
    public PropbabilityText:number = 0 ;
    /**概率参数 */
    public PropbabilityNum:number = 0 ;
}

export class DrawCardProbabilityManager {
    private static _instance: DrawCardProbabilityManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonDrawCardProbability>=null;
    private is_load_completed:boolean=false;

    public static getInstance():DrawCardProbabilityManager {
        if(this._instance==null) {
            this._instance=new DrawCardProbabilityManager();
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
        LoadManager.loadJson('DrawCardProbability',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonDrawCardProbability成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonDrawCardProbability();
                jsonData=json[i];
                this.data.set(jsonData.ProbabilityID,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonDrawCardProbability(id:number):JsonDrawCardProbability {
        return this.data.get(id);
    }
    /**根据概率行ID获取概率文本 */
    public getPropbabilityText(id:number): number {
        return this.data.get(id).PropbabilityText;
    }
    /**根据概率行ID获取概率参数 */
    public getPropbabilityNum(id:number): number {
        return this.data.get(id).PropbabilityNum;
    }

    /** 静态方法，获取最大的 概率行ID*/
    public static getMaxProbabilityID():number {
        return 10;
    }

    //以上格式统一，以下写每个json数据的特殊需求

    getData():JsonDrawCardProbability[]{
        let info = [];
        this.data.forEach((v,k)=>{
            info.push(v);
        });
        return info;
    }
}
