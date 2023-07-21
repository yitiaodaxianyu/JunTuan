export class JsonSpiritSkill {
    /**灵宠技能 */
    public SpiritSkill:number = 0 ;
    /**灵宠种类 */
    public SpiritType:number = 0 ;
    /**技能等级 */
    public SkillLevel:number = 0 ;
    /**冷却时间 */
    public CoolDown:number = 0 ;
    /**技能参数1 */
    public SkillParameter_1:number = 0 ;
    /**技能参数2 */
    public SkillParameter_2:number = 0 ;
    /**技能参数3 */
    public SkillParameter_3:number = 0 ;
}

export class SpiritSkillManager {
    private static _instance: SpiritSkillManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonSpiritSkill>=null;
    private is_load_completed:boolean=false;

    public static getInstance():SpiritSkillManager {
        if(this._instance==null) {
            this._instance=new SpiritSkillManager();
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
        LoadManager.loadJson('SpiritSkill',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonSpiritSkill成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonSpiritSkill();
                jsonData=json[i];
                this.data.set(jsonData.SpiritSkill,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonSpiritSkill(id:number):JsonSpiritSkill {
        return this.data.get(id);
    }
    /**根据灵宠技能获取灵宠种类 */
    public getSpiritType(id:number): number {
        return this.data.get(id).SpiritType;
    }
    /**根据灵宠技能获取技能等级 */
    public getSkillLevel(id:number): number {
        return this.data.get(id).SkillLevel;
    }
    /**根据灵宠技能获取冷却时间 */
    public getCoolDown(id:number): number {
        return this.data.get(id).CoolDown;
    }
    /**根据灵宠技能获取技能参数1 */
    public getSkillParameter_1(id:number): number {
        return this.data.get(id).SkillParameter_1;
    }
    /**根据灵宠技能获取技能参数2 */
    public getSkillParameter_2(id:number): number {
        return this.data.get(id).SkillParameter_2;
    }
    /**根据灵宠技能获取技能参数3 */
    public getSkillParameter_3(id:number): number {
        return this.data.get(id).SkillParameter_3;
    }

    /** 静态方法，获取最大的 灵宠技能*/
    public static getMaxSpiritSkill():number {
        return 403;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
