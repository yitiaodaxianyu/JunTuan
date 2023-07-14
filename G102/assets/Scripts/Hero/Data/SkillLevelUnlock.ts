import { LoadManager } from "../../Loading/LoadManager";

export class JsonSkillLevelUnlock {
    /**技能槽位 */
    public SkillPosition:number = 0 ;
    /**英雄等级 */
    public HeroLevel:number = 0 ;
}

export class SkillLevelUnlockManager {
    private static _instance: SkillLevelUnlockManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonSkillLevelUnlock>=null;
    private is_load_completed:boolean=false;

    public static getInstance():SkillLevelUnlockManager {
        if(this._instance==null) {
            this._instance=new SkillLevelUnlockManager();
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
        LoadManager.loadJson('SkillLevelUnlock',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonSkillLevelUnlock成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonSkillLevelUnlock();
                jsonData=json[i];
                this.data.set(jsonData.SkillPosition,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonSkillLevelUnlock(id:number):JsonSkillLevelUnlock {
        return this.data.get(id);
    }
    /**根据技能槽位获取英雄等级 */
    public getHeroLevel(id:number): number {
        return this.data.get(id).HeroLevel;
    }

    /** 静态方法，获取最大的 技能槽位*/
    public static getMaxSkillPosition():number {
        return 4;
    }

    //以上格式统一，以下写每个json数据的特殊需求

   

    static getId(skillSlot: number, heroSkillLevel: number): number {
        return skillSlot * 100 + heroSkillLevel;
    }
}
