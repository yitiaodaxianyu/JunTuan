import { LoadManager } from "../Loading/LoadManager";

export class JsonExclusiveWeaponMessage {
    /**英雄ID */
    public HeroID:number = 0 ;
    /**专属武器名字文本 */
    public ExclusiveWeaponNameID:number = 0 ;
    /**专武技能名称文本 */
    public ExclusiveWeaponSkillID:number = 0 ;
    /**专属武器技能描述 */
    public ExclusiveWeaponSkillDescription:number = 0 ;
    /**最大阶段 */
    public MaxStage:number = 0 ;
}

export class ExclusiveWeaponMessageManager {
    private static _instance: ExclusiveWeaponMessageManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonExclusiveWeaponMessage>=null;
    private is_load_completed:boolean=false;

    public static getInstance():ExclusiveWeaponMessageManager {
        if(this._instance==null) {
            this._instance=new ExclusiveWeaponMessageManager();
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
        LoadManager.loadJson('ExclusiveWeaponMessage',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonExclusiveWeaponMessage成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonExclusiveWeaponMessage();
                jsonData=json[i];
                this.data.set(jsonData.HeroID,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonExclusiveWeaponMessage(id:number):JsonExclusiveWeaponMessage {
        return this.data.get(id);
    }
    /**根据英雄ID获取专属武器名字文本 */
    public getExclusiveWeaponNameID(id:number): number {
        return this.data.get(id).ExclusiveWeaponNameID;
    }
    /**根据英雄ID获取专武技能名称文本 */
    public getExclusiveWeaponSkillID(id:number): number {
        return this.data.get(id).ExclusiveWeaponSkillID;
    }
    /**根据英雄ID获取专属武器技能描述 */
    public getExclusiveWeaponSkillDescription(id:number): number {
        return this.data.get(id).ExclusiveWeaponSkillDescription;
    }
    /**根据英雄ID获取最大阶段 */
    public getMaxStage(id:number): number {
        return this.data.get(id).MaxStage;
    }

    /** 静态方法，获取最大的 英雄ID*/
    public static getMaxHeroID():number {
        return 12;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
