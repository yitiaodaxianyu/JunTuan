export class JsonExclusiveWeaponSkill {
    /**专武技能ID */
    public ExclusiveWeaponSkillID:number = 0 ;
    /**技能等级 */
    public SkillLevel:number = 0 ;
    /**英雄ID */
    public HeroID:number = 0 ;
    /**技能参数1 */
    public ExclusiveWeaponSkillValue_1:number = 0 ;
    /**技能参数2 */
    public ExclusiveWeaponSkillValue_2:number = 0 ;
    /**技能参数3 */
    public ExclusiveWeaponSkillValue_3:number = 0 ;
    /**技能参数4 */
    public ExclusiveWeaponSkillValue_4:number = 0 ;
}

export class ExclusiveWeaponSkillManager {
    private static _instance: ExclusiveWeaponSkillManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonExclusiveWeaponSkill>=null;
    private is_load_completed:boolean=false;

    public static getInstance():ExclusiveWeaponSkillManager {
        if(this._instance==null) {
            this._instance=new ExclusiveWeaponSkillManager();
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
        LoadManager.loadJson('ExclusiveWeaponSkill',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonExclusiveWeaponSkill成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonExclusiveWeaponSkill();
                jsonData=json[i];
                this.data.set(jsonData.ExclusiveWeaponSkillID,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonExclusiveWeaponSkill(id:number):JsonExclusiveWeaponSkill {
        return this.data.get(id);
    }
    /**根据专武技能ID获取技能等级 */
    public getSkillLevel(id:number): number {
        return this.data.get(id).SkillLevel;
    }
    /**根据专武技能ID获取英雄ID */
    public getHeroID(id:number): number {
        return this.data.get(id).HeroID;
    }
    /**根据专武技能ID获取技能参数1 */
    public getExclusiveWeaponSkillValue_1(id:number): number {
        return this.data.get(id).ExclusiveWeaponSkillValue_1;
    }
    /**根据专武技能ID获取技能参数2 */
    public getExclusiveWeaponSkillValue_2(id:number): number {
        return this.data.get(id).ExclusiveWeaponSkillValue_2;
    }
    /**根据专武技能ID获取技能参数3 */
    public getExclusiveWeaponSkillValue_3(id:number): number {
        return this.data.get(id).ExclusiveWeaponSkillValue_3;
    }
    /**根据专武技能ID获取技能参数4 */
    public getExclusiveWeaponSkillValue_4(id:number): number {
        return this.data.get(id).ExclusiveWeaponSkillValue_4;
    }

    /** 静态方法，获取最大的 专武技能ID*/
    public static getMaxExclusiveWeaponSkillID():number {
        return 120006;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
