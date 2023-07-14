import { LoadManager } from "../../Loading/LoadManager";

export class JsonHeroTitle {
    /**英雄称号id */
    public HeroTitleID:number = 0 ;
    /**英雄id */
    public HeroID:number = 0 ;
    /**英雄星级 */
    public HeroStar:number = 0 ;
    /**英雄称号文本 */
    public HeroTitleText:number = 0 ;
}

export class HeroTitleManager {
    private static _instance: HeroTitleManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonHeroTitle>=null;
    private is_load_completed:boolean=false;

    public static getInstance():HeroTitleManager {
        if(this._instance==null) {
            this._instance=new HeroTitleManager();
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
        LoadManager.loadJson('HeroTitle',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonHeroTitle成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonHeroTitle();
                jsonData=json[i];
                this.data.set(jsonData.HeroTitleID,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonHeroTitle(id:number):JsonHeroTitle {
        return this.data.get(id);
    }
    /**根据英雄称号id获取英雄id */
    public getHeroID(id:number): number {
        return this.data.get(id).HeroID;
    }
    /**根据英雄称号id获取英雄星级 */
    public getHeroStar(id:number): number {
        return this.data.get(id).HeroStar;
    }
    /**根据英雄称号id获取英雄称号文本 */
    public getHeroTitleText(id:number): number {
        return this.data.get(id).HeroTitleText;
    }

    /** 静态方法，获取最大的 英雄称号id*/
    public static getMaxHeroTitleID():number {
        return 12005;
    }

    //以上格式统一，以下写每个json数据的特殊需求

    getHeroTitleTextIdByHeroTypeAndHeroStar(heroType:number,star:number):number{
        let data:JsonHeroTitle;
        this.data.forEach((v, k) => {
            if (v.HeroID == heroType && v.HeroStar == star)
                data = v
        });
        return data.HeroTitleText;
    }
}
