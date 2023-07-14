import { LoadManager } from "../../Loading/LoadManager";


export class JsonRogueBuff {
    /**战利品ID */
    public RogueBuff_ID:number = 0 ;
    /**战利品品质 */
    public RogueBuff_Quality:number = 0 ;
    /**战利品名称 */
    public RogueBuff_Name:number = 0 ;
    /**战利品文本1_ID */
    public RogueBuffText_ID:number = 0 ;
    /**战利品类型 */
    public RogueBuff_Type:number = 0 ;
    /**战利品加成1 */
    public RogueBuff1_Value:number = 0 ;
    /**战利品加成2 */
    public RogueBuff2_Value:number = 0 ;
    /**战利品加成3 */
    public RogueBuff3_Value:number = 0 ;
}

export class RogueBuffManager {
    private static _instance: RogueBuffManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonRogueBuff>=null;
    private is_load_completed:boolean=false;

    public static getInstance():RogueBuffManager {
        if(this._instance==null) {
            this._instance=new RogueBuffManager();
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
        LoadManager.loadJson('RogueBuff',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonRogueBuff成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonRogueBuff();
                jsonData=json[i];
                this.data.set(jsonData.RogueBuff_ID,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonRogueBuff(id:number):JsonRogueBuff {
        return this.data.get(id);
    }
    /**根据战利品ID获取战利品品质 */
    public getRogueBuff_Quality(id:number): number {
        return this.data.get(id).RogueBuff_Quality;
    }
    /**根据战利品ID获取战利品名称 */
    public getRogueBuff_Name(id:number): number {
        return this.data.get(id).RogueBuff_Name;
    }
    /**根据战利品ID获取战利品文本1_ID */
    public getRogueBuffText_ID(id:number): number {
        return this.data.get(id).RogueBuffText_ID;
    }
    /**根据战利品ID获取战利品类型 */
    public getRogueBuff_Type(id:number): number {
        return this.data.get(id).RogueBuff_Type;
    }
    /**根据战利品ID获取战利品加成1 */
    public getRogueBuff1_Value(id:number): number {
        return this.data.get(id).RogueBuff1_Value;
    }
    /**根据战利品ID获取战利品加成2 */
    public getRogueBuff2_Value(id:number): number {
        return this.data.get(id).RogueBuff2_Value;
    }
    /**根据战利品ID获取战利品加成3 */
    public getRogueBuff3_Value(id:number): number {
        return this.data.get(id).RogueBuff3_Value;
    }

    /** 静态方法，获取最大的 战利品ID*/
    public static getMaxRogueBuff_ID():number {
        return 9003;
    }

    //以上格式统一，以下写每个json数据的特殊需求
    /**
     * 
     * @param excludeList 排除列表，当id存在时，不加入列表中
     * @returns 返回可以参与随机的列表
     */
    public getBuffArr(excludeList:number[]):number[][]{
        let buffArr=[[],[],[]];
        //把相同品质的放一起
        this.data.forEach((jsonData:JsonRogueBuff)=>{
            if(excludeList.indexOf(jsonData.RogueBuff_ID)==-1){
                buffArr[jsonData.RogueBuff_Quality-1].push(jsonData.RogueBuff_ID);
            }            
        })
        return buffArr;
    }

    public getBuffIdList():number[]{
        let buffList=[];
        //把相同品质的放一起
        this.data.forEach((jsonData:JsonRogueBuff)=>{
            buffList.push(jsonData.RogueBuff_ID);
        })
        return buffList;
    }

    getData():Map<number,JsonRogueBuff>{
        return this.data;
    }
}
