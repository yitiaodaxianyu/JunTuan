import { LoadManager } from "../../Loading/LoadManager";


export class JsonAwakenCultivation {
    /**觉醒ID */
    public AwenkenId:number = 0 ;
    /**灵宠稀有度 */
    public SpiritRarity:number = 0 ;
    /**觉醒阶段 */
    public AwakenStage:number = 0 ;
    /**本阶段星脉数量 */
    public CurrentStarVeinsNum:number = 0 ;
    /**本阶段星脉 */
    public CurrentStarVeins:number[] = [] ;
    /**连携技能等级 */
    public FetterSkillLevel:number = 0 ;
}

export class AwakenCultivationManager {
    private static _instance: AwakenCultivationManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonAwakenCultivation>=null;
    private is_load_completed:boolean=false;

    public static getInstance():AwakenCultivationManager {
        if(this._instance==null) {
            this._instance=new AwakenCultivationManager();
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
        LoadManager.loadJson('AwakenCultivation',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonAwakenCultivation成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonAwakenCultivation();
                jsonData=json[i];
                this.data.set(jsonData.AwenkenId,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonAwakenCultivation(id:number):JsonAwakenCultivation {
        return this.data.get(id);
    }
    /**根据觉醒ID获取灵宠稀有度 */
    public getSpiritRarity(id:number): number {
        return this.data.get(id).SpiritRarity;
    }
    /**根据觉醒ID获取觉醒阶段 */
    public getAwakenStage(id:number): number {
        return this.data.get(id).AwakenStage;
    }
    /**根据觉醒ID获取本阶段星脉数量 */
    public getCurrentStarVeinsNum(id:number): number {
        return this.data.get(id).CurrentStarVeinsNum;
    }
    /**根据觉醒ID获取本阶段星脉 */
    public getCurrentStarVeins(id:number): number[] {
        return this.data.get(id).CurrentStarVeins;
    }
    /**根据觉醒ID获取连携技能等级 */
    public getFetterSkillLevel(id:number): number {
        return this.data.get(id).FetterSkillLevel;
    }

    /** 静态方法，获取最大的 觉醒ID*/
    public static getMaxAwenkenId():number {
        return 404;
    }

    //以上格式统一，以下写每个json数据的特殊需求
    /**
     * 获得觉醒id
     * @param spiritRarity 灵宠稀有度
     * @param awakenStage 觉醒阶段
     * @returns id
     */
    public static getId(spiritRarity:number,awakenStage:number):number{
        return spiritRarity*100+awakenStage;
    }
}
