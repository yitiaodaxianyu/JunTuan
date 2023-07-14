import { LoadManager } from "../../Loading/LoadManager";

export class JsonSpiritMessage {
    /**灵宠种类 */
    public SpiritType:number = 0 ;
    /**灵宠名字 */
    public SpiritName:number = 0 ;
    /**初始品质 */
    public InitialQuality:number = 0 ;
    /**阶段上限 */
    public StageLimit:number = 0 ;
    /**宠物技能介绍 */
    public ActiveSkillsIntro:number = 0 ;
    /**宠物技能名字 */
    public SpiritSkillName:number = 0 ;
}

export class SpiritMessageManager {
    private static _instance: SpiritMessageManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonSpiritMessage>=null;
    private is_load_completed:boolean=false;

    public static getInstance():SpiritMessageManager {
        if(this._instance==null) {
            this._instance=new SpiritMessageManager();
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
        LoadManager.loadJson('SpiritMessage',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonSpiritMessage成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonSpiritMessage();
                jsonData=json[i];
                this.data.set(jsonData.SpiritType,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonSpiritMessage(id:number):JsonSpiritMessage {
        return this.data.get(id);
    }
    /**根据灵宠种类获取灵宠名字 */
    public getSpiritName(id:number): number {
        return this.data.get(id).SpiritName;
    }
    /**根据灵宠种类获取初始品质 */
    public getInitialQuality(id:number): number {
        return this.data.get(id).InitialQuality;
    }
    /**根据灵宠种类获取阶段上限 */
    public getStageLimit(id:number): number {
        return this.data.get(id).StageLimit;
    }
    /**根据灵宠种类获取宠物技能介绍 */
    public getActiveSkillsIntro(id:number): number {
        return this.data.get(id).ActiveSkillsIntro;
    }
    /**根据灵宠种类获取宠物技能名字 */
    public getSpiritSkillName(id:number): number {
        return this.data.get(id).SpiritSkillName;
    }

    /** 静态方法，获取最大的 灵宠种类*/
    public static getMaxSpiritType():number {
        return 7;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
