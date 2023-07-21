export class JsonSkillLevel {
    /**技能等级ID */
    public SkillLevelId:number = 0 ;
    /**技能等级 */
    public SkillLevel:number = 0 ;
    /**技能槽位 */
    public SkillPosition:number = 0 ;
    /**灵宠等级 */
    public SpiritLevel:number = 0 ;
    /**觉醒阶段 */
    public AwakenStage:number = 0 ;
}

export class SkillLevelManager {
    private static _instance: SkillLevelManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonSkillLevel>=null;
    private is_load_completed:boolean=false;

    public static getInstance():SkillLevelManager {
        if(this._instance==null) {
            this._instance=new SkillLevelManager();
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
        LoadManager.loadJson('SkillLevel',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonSkillLevel成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonSkillLevel();
                jsonData=json[i];
                this.data.set(jsonData.SkillLevelId,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonSkillLevel(id:number):JsonSkillLevel {
        return this.data.get(id);
    }
    /**根据技能等级ID获取技能等级 */
    public getSkillLevel(id:number): number {
        return this.data.get(id).SkillLevel;
    }
    /**根据技能等级ID获取技能槽位 */
    public getSkillPosition(id:number): number {
        return this.data.get(id).SkillPosition;
    }
    /**根据技能等级ID获取灵宠等级 */
    public getSpiritLevel(id:number): number {
        return this.data.get(id).SpiritLevel;
    }
    /**根据技能等级ID获取觉醒阶段 */
    public getAwakenStage(id:number): number {
        return this.data.get(id).AwakenStage;
    }

    /** 静态方法，获取最大的 技能等级ID*/
    public static getMaxSkillLevelId():number {
        return 403;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
