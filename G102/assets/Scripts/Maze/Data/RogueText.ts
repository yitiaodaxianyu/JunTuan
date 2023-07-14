import { LoadManager } from "../../Loading/LoadManager";


export class JsonRogueText {
    /**格子类型 */
    public HexagonType:number = 0 ;
    /**标题文本ID */
    public Roguetitle_ID:number = 0 ;
    /**文本内容ID */
    public RogueText_ID:number = 0 ;
}

export class RogueTextManager {
    private static _instance: RogueTextManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonRogueText>=null;
    private is_load_completed:boolean=false;

    public static getInstance():RogueTextManager {
        if(this._instance==null) {
            this._instance=new RogueTextManager();
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
        LoadManager.loadJson('RogueText',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonRogueText成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonRogueText();
                jsonData=json[i];
                this.data.set(jsonData.HexagonType,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonRogueText(id:number):JsonRogueText {
        return this.data.get(id);
    }
    /**根据格子类型获取标题文本ID */
    public getRoguetitle_ID(id:number): number {
        return this.data.get(id).Roguetitle_ID;
    }
    /**根据格子类型获取文本内容ID */
    public getRogueText_ID(id:number): number {
        return this.data.get(id).RogueText_ID;
    }

    /** 静态方法，获取最大的 格子类型*/
    public static getMaxHexagonType():number {
        return 5;
    }

    //以上格式统一，以下写每个json数据的特殊需求

    
}
