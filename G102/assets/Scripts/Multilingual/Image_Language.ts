import { LoadManager } from "../Loading/LoadManager";

export class JsonImage_Language {
    /**图片ID */
    public Spirit_ID:number = 0 ;
    /**图集ID */
    public Atlas:string = '' ;
    /**英语 */
    public English:string = '' ;
    /**汉语 */
    public Chinese:string = '' ;
    /**印尼语 */
    public Indonesian:string = '' ;
    /**俄语 */
    public Russian:string = '' ;
    /**泰语 */
    public Thai:string = '' ;
    /**韩国 */
    public Korea:string = '' ;
}

export class Image_LanguageManager {
    private static _instance: Image_LanguageManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonImage_Language>=null;
    private is_load_completed:boolean=false;

    public static getInstance():Image_LanguageManager {
        if(this._instance==null) {
            this._instance=new Image_LanguageManager();
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
        LoadManager.loadJson('Image_Language',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonImage_Language成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonImage_Language();
                jsonData=json[i];
                this.data.set(jsonData.Spirit_ID,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonImage_Language(id:number):JsonImage_Language {
        return this.data.get(id);
    }
    /**根据图片ID获取图集ID */
    public getAtlas(id:number): string {
        return this.data.get(id).Atlas;
    }
    /**根据图片ID获取英语 */
    public getEnglish(id:number): string {        
        try{
            return this.data.get(id).English;
        }catch(error){
            console.error("这个多语言图片id有问题,id:" + id + " err:" + error);
        }
    }
    /**根据图片ID获取汉语 */
    public getChinese(id:number): string {
        try{
            return this.data.get(id).Chinese;
        }catch(error){
            console.error("这个多语言图片id有问题,id:" + id + " err:" + error);
        }
    }
    /**根据图片ID获取印尼语 */
    public getIndonesian(id:number): string {
        return this.data.get(id).Indonesian;
    }
    /**根据图片ID获取俄语 */
    public getRussian(id:number): string {
        return this.data.get(id).Russian;
    }
    /**根据图片ID获取泰语 */
    public getThai(id:number): string {
        return this.data.get(id).Thai;
    }
    /**根据图片ID获取韩国 */
    public getKorea(id:number): string {
        return this.data.get(id).Korea;
    }

    /** 静态方法，获取最大的 图片ID*/
    public static getMaxSpirit_ID():number {
        return 4;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
