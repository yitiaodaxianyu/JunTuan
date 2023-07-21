export class JsonMonsterSkill {
    /**怪物技能ID */
    public MonsterSkill:number = 0 ;
    /**怪物ID */
    public MonsterId:number = 0 ;
    /**技能说明 */
    public SkillIntro:number = 0 ;
    /**技能序号 */
    public SkillNum:number = 0 ;
    /**技能等级 */
    public SkillLevel:number = 0 ;
    /**初始冷却时间 */
    public InitialColdDown:number = 0 ;
    /**冷却时间 */
    public ColdDown:number = 0 ;
    /**施法距离 */
    public CastingRange:number = 0 ;
    /**技能参数1 */
    public SkillValue_1:number = 0 ;
    /**技能参数2 */
    public SkillValue_2:number = 0 ;
    /**技能参数3 */
    public SkillValue_3:number = 0 ;
    /**技能参数4 */
    public SkillValue_4:number = 0 ;
}

export class MonsterSkillManager {
    private static _instance: MonsterSkillManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonMonsterSkill>=null;
    private is_load_completed:boolean=false;

    public static getInstance():MonsterSkillManager {
        if(this._instance==null) {
            this._instance=new MonsterSkillManager();
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
        LoadManager.loadJson('MonsterSkill',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonMonsterSkill成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonMonsterSkill();
                jsonData=json[i];
                this.data.set(jsonData.MonsterSkill,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonMonsterSkill(id:number):JsonMonsterSkill {
        return this.data.get(id);
    }
    /**根据怪物技能ID获取怪物ID */
    public getMonsterId(id:number): number {
        return this.data.get(id).MonsterId;
    }
    /**根据怪物技能ID获取技能说明 */
    public getSkillIntro(id:number): number {
        return this.data.get(id).SkillIntro;
    }
    /**根据怪物技能ID获取技能序号 */
    public getSkillNum(id:number): number {
        return this.data.get(id).SkillNum;
    }
    /**根据怪物技能ID获取技能等级 */
    public getSkillLevel(id:number): number {
        return this.data.get(id).SkillLevel;
    }
    /**根据怪物技能ID获取初始冷却时间 */
    public getInitialColdDown(id:number): number {
        return this.data.get(id).InitialColdDown;
    }
    /**根据怪物技能ID获取冷却时间 */
    public getColdDown(id:number): number {
        return this.data.get(id).ColdDown;
    }
    /**根据怪物技能ID获取施法距离 */
    public getCastingRange(id:number): number {
        return this.data.get(id).CastingRange;
    }
    /**根据怪物技能ID获取技能参数1 */
    public getSkillValue_1(id:number): number {
        return this.data.get(id).SkillValue_1;
    }
    /**根据怪物技能ID获取技能参数2 */
    public getSkillValue_2(id:number): number {
        return this.data.get(id).SkillValue_2;
    }
    /**根据怪物技能ID获取技能参数3 */
    public getSkillValue_3(id:number): number {
        return this.data.get(id).SkillValue_3;
    }
    /**根据怪物技能ID获取技能参数4 */
    public getSkillValue_4(id:number): number {
        return this.data.get(id).SkillValue_4;
    }

    /** 静态方法，获取最大的 怪物技能ID*/
    public static getMaxMonsterSkill():number {
        return 30871401;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
