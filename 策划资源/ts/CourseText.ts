export class JsonCourseText {
    /**引导ID */
    public xs_id:number = 0 ;
    /**英雄名文本ID */
    public hero_text_id:number = 0 ;
    /**引导文本ID */
    public guidance_text_id:number = 0 ;
}

export class CourseTextManager {
    private static _instance: CourseTextManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonCourseText>=null;
    private is_load_completed:boolean=false;

    public static getInstance():CourseTextManager {
        if(this._instance==null) {
            this._instance=new CourseTextManager();
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
        LoadManager.loadJson('CourseText',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonCourseText成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonCourseText();
                jsonData=json[i];
                this.data.set(jsonData.xs_id,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonCourseText(id:number):JsonCourseText {
        return this.data.get(id);
    }
    /**根据引导ID获取英雄名文本ID */
    public gethero_text_id(id:number): number {
        return this.data.get(id).hero_text_id;
    }
    /**根据引导ID获取引导文本ID */
    public getguidance_text_id(id:number): number {
        return this.data.get(id).guidance_text_id;
    }

    /** 静态方法，获取最大的 引导ID*/
    public static getMaxxs_id():number {
        return 341;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
