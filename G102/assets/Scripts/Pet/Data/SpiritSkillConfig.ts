import { LoadManager } from "../../Loading/LoadManager";


export class JsonSpiritSkillConfig {
    /**技能ID */
    public SkillId:number = 0 ;
    /**灵宠ID */
    public SpiritId:number = 0 ;
    /**技能槽位 */
    public SkillPosition:number = 0 ;
    /**冷却时间 */
    public CoolDown:number = 0 ;
    /**释放距离 */
    public SkillRange:number = 0 ;
    /**技能等级 */
    public SkillLevel:number = 0 ;
    /**技能参数1 */
    public SkillParameter_1:number = 0 ;
    /**技能参数2 */
    public SkillParameter_2:number = 0 ;
    /**技能参数3 */
    public SkillParameter_3:number = 0 ;
}

export class SpiritSkillConfigManager {
    private static _instance: SpiritSkillConfigManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonSpiritSkillConfig>=null;
    private is_load_completed:boolean=false;

    public static getInstance():SpiritSkillConfigManager {
        if(this._instance==null) {
            this._instance=new SpiritSkillConfigManager();
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
        LoadManager.loadJson('SpiritSkillConfig',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonSpiritSkillConfig成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonSpiritSkillConfig();
                jsonData=json[i];
                this.data.set(jsonData.SkillId,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonSpiritSkillConfig(id:number):JsonSpiritSkillConfig {
        return this.data.get(id);
    }
    /**根据技能ID获取灵宠ID */
    public getSpiritId(id:number): number {
        return this.data.get(id).SpiritId;
    }
    /**根据技能ID获取技能槽位 */
    public getSkillPosition(id:number): number {
        return this.data.get(id).SkillPosition;
    }
    /**根据技能ID获取冷却时间 */
    public getCoolDown(id:number): number {
        return this.data.get(id).CoolDown;
    }
    /**根据技能ID获取释放距离 */
    public getSkillRange(id:number): number {
        return this.data.get(id).SkillRange;
    }
    /**根据技能ID获取技能等级 */
    public getSkillLevel(id:number): number {
        return this.data.get(id).SkillLevel;
    }
    /**根据技能ID获取技能参数1 */
    public getSkillParameter_1(id:number): number {
        return this.data.get(id).SkillParameter_1;
    }
    /**根据技能ID获取技能参数2 */
    public getSkillParameter_2(id:number): number {
        return this.data.get(id).SkillParameter_2;
    }
    /**根据技能ID获取技能参数3 */
    public getSkillParameter_3(id:number): number {
        return this.data.get(id).SkillParameter_3;
    }

    /** 静态方法，获取最大的 技能ID*/
    public static getMaxSkillId():number {
        return 2143;
    }

    //以上格式统一，以下写每个json数据的特殊需求
    /**
     * 
     * @param petId 宠物id
     * @param skillSlot 技能槽位
     * @param skillLevel 技能等级
     * @returns 
     */
    public static getId(petId:number,skillSlot:number,skillLevel:number):number{
        return petId*100+skillSlot*10+skillLevel
    }
}
