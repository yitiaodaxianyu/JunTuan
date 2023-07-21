export class JsonSkillConfiguration {
    /**技能ID */
    public Skill:number = 0 ;
    /**绑定英雄 */
    public BindHero:number = 0 ;
    /**技能槽位 */
    public SkillPosition:number = 0 ;
    /**技能等级 */
    public SkillLevel:number = 0 ;
    /**冷却时间 */
    public ColdDown:number = 0 ;
    /**技能参数1 */
    public SkillValue_1:number = 0 ;
    /**技能参数2 */
    public SkillValue_2:number = 0 ;
    /**技能参数3 */
    public SkillValue_3:number = 0 ;
    /**技能参数4 */
    public SkillValue_4:number = 0 ;
}

export class SkillConfigurationManager {
    private static _instance: SkillConfigurationManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonSkillConfiguration>=null;
    private is_load_completed:boolean=false;

    public static getInstance():SkillConfigurationManager {
        if(this._instance==null) {
            this._instance=new SkillConfigurationManager();
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
        LoadManager.loadJson('SkillConfiguration',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonSkillConfiguration成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonSkillConfiguration();
                jsonData=json[i];
                this.data.set(jsonData.Skill,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonSkillConfiguration(id:number):JsonSkillConfiguration {
        return this.data.get(id);
    }
    /**根据技能ID获取绑定英雄 */
    public getBindHero(id:number): number {
        return this.data.get(id).BindHero;
    }
    /**根据技能ID获取技能槽位 */
    public getSkillPosition(id:number): number {
        return this.data.get(id).SkillPosition;
    }
    /**根据技能ID获取技能等级 */
    public getSkillLevel(id:number): number {
        return this.data.get(id).SkillLevel;
    }
    /**根据技能ID获取冷却时间 */
    public getColdDown(id:number): number {
        return this.data.get(id).ColdDown;
    }
    /**根据技能ID获取技能参数1 */
    public getSkillValue_1(id:number): number {
        return this.data.get(id).SkillValue_1;
    }
    /**根据技能ID获取技能参数2 */
    public getSkillValue_2(id:number): number {
        return this.data.get(id).SkillValue_2;
    }
    /**根据技能ID获取技能参数3 */
    public getSkillValue_3(id:number): number {
        return this.data.get(id).SkillValue_3;
    }
    /**根据技能ID获取技能参数4 */
    public getSkillValue_4(id:number): number {
        return this.data.get(id).SkillValue_4;
    }

    /** 静态方法，获取最大的 技能ID*/
    public static getMaxSkill():number {
        return 12306;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
