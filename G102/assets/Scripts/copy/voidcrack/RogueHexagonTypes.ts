import { LoadManager } from "../../Loading/LoadManager";

export class JsonRogueHexagonTypes {
    /**格子ID */
    public Hexagon_ID:number = 0 ;
    /**章数 */
    public Layers:number = 0 ;
    /**行数 */
    public Rows:number = 0 ;
    /**位置 */
    public Position:number = 0 ;
    /**格子类型 */
    public HexagonType:number = 0 ;
    /**道具1_ID */
    public RogueProp1_ID:number = 0 ;
    /**道具1_数量 */
    public RogueProp1_Sum:number = 0 ;
    /**专武奖池集 */
    public RogueProp2_ID:number = 0 ;
    /**奖励数量 */
    public RogueProp2_Sum:number = 0 ;
}

export class RogueHexagonTypesManager {
    private static _instance: RogueHexagonTypesManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonRogueHexagonTypes>=null;
    private is_load_completed:boolean=false;

    public static getInstance():RogueHexagonTypesManager {
        if(this._instance==null) {
            this._instance=new RogueHexagonTypesManager();
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
        LoadManager.loadJson('RogueHexagonTypes',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonRogueHexagonTypes成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonRogueHexagonTypes();
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
    public getJsonRogueHexagonTypes(id:number):JsonRogueHexagonTypes {
        return this.data.get(id);
    }
    /**根据格子ID获取章数 */
    public getLayers(id:number): number {
        return this.data.get(id).Layers;
    }
    /**根据格子ID获取行数 */
    public getRows(id:number): number {
        return this.data.get(id).Rows;
    }
    /**根据格子ID获取位置 */
    public getPosition(id:number): number {
        return this.data.get(id).Position;
    }
    /**根据格子ID获取格子类型 */
    public getHexagonType(id:number): number {
        return this.data.get(id).HexagonType;
    }
    /**根据格子ID获取道具1_ID */
    public getRogueProp1_ID(id:number): number {
        return this.data.get(id).RogueProp1_ID;
    }
    /**根据格子ID获取道具1_数量 */
    public getRogueProp1_Sum(id:number): number {
        return this.data.get(id).RogueProp1_Sum;
    }
    /**根据格子ID获取专武奖池集 */
    public getRogueProp2_ID(id:number): number {
        return this.data.get(id).RogueProp2_ID;
    }
    /**根据格子ID获取奖励数量 */
    public getRogueProp2_Sum(id:number): number {
        return this.data.get(id).RogueProp2_Sum;
    }

    /** 静态方法，获取最大的 格子ID*/
    public static getMaxHexagon_ID():number {
        return 80092;
    }

    //以上格式统一，以下写每个json数据的特殊需求


    //以上格式统一，以下写每个json数据的特殊需求
    /**
     * 返回一个格子id2
     * 层数*10000+行数+位置
     * @param layer 层数
     * @param row 行数
     * @param position 位置
     * @returns 
     */
     static getId(layer:number,row:number,position:number):number{
        return layer*10000+row*10+position;
    }

    getData():Map<number,JsonRogueHexagonTypes>{
        return this.data;
    }

    /**返回这一层的所有格子id 
     * 层数
    */
    getAllLayerId(layer:number){
        let Allid=[]
        this.data.forEach((v,k)=>{
            if(v.Layers==layer){
                Allid.push(v.Hexagon_ID)
            }
        });
        return Allid
    }
    
}
