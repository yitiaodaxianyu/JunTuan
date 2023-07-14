import { LoadManager } from "../../Loading/LoadManager";


export class JsonMazeRoad {
    /**ID */
    public rId:number = 0 ;
    /**第2列 */
    public c1:number = 0 ;
    /**第3列 */
    public c2:number = 0 ;
    /**第4列 */
    public c3:number = 0 ;
}

export class MazeRoadManager {
    private static _instance: MazeRoadManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonMazeRoad>=null;
    private is_load_completed:boolean=false;

    public static getInstance():MazeRoadManager {
        if(this._instance==null) {
            this._instance=new MazeRoadManager();
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
        LoadManager.loadJson('MazeRoad',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonMazeRoad成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonMazeRoad();
                jsonData=json[i];
                this.data.set(jsonData.rId,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonMazeRoad(id:number):JsonMazeRoad {
        return this.data.get(id);
    }
    /**根据ID获取第2列 */
    public getc1(id:number): number {
        return this.data.get(id).c1;
    }
    /**根据ID获取第3列 */
    public getc2(id:number): number {
        return this.data.get(id).c2;
    }
    /**根据ID获取第4列 */
    public getc3(id:number): number {
        return this.data.get(id).c3;
    }

    /** 静态方法，获取最大的 ID*/
    public static getMaxrId():number {
        return 1;
    }

    //以上格式统一，以下写每个json数据的特殊需求
    public getMazeRoad() :Array<Array<number>>{
        let arr =new Array<Array<number>>();
        let len=this.data.size;
        for(let r=1; r<=len; r++){
            let jsonData=this.data.get(r)
            let nums=new Array();
            for(let i=1; i<=3; i++){
                nums.push(jsonData["c"+i]);
            }
            arr.push(nums);
        }
        cc.log(arr);
        return arr;
    }

}
