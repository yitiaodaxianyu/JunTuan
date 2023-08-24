import { ValueType, ValueUnit } from "../Constants";
import { LoadManager } from "../Loading/LoadManager";
import LanguageManager from "../multiLanguage/LanguageManager";
import UserData from "../UserData";

export class JsonTextManagement {
    /**文本ID */
    public Text_ID:number = 0 ;
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

export class TextManagementManager {
    private static _instance: TextManagementManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonTextManagement>=null;
    private is_load_completed:boolean=false;

    public static getInstance():TextManagementManager {
        if(this._instance==null) {
            this._instance=new TextManagementManager();
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
        LoadManager.loadJson('TextManagement',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonTextManagement成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonTextManagement();
                jsonData=json[i];
                this.data.set(jsonData.Text_ID,jsonData);
            }
            this.is_load_completed=true;
            UserData.getInstance().HttpPostCheckVersion();
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonTextManagement(id:number):JsonTextManagement {
        return this.data.get(id);
    }
    /**根据文本ID获取英语 */
    public getEnglish(id:number): string {
        return this.data.get(id).English;
    }
    /**根据文本ID获取汉语 */
    public getChinese(id:number): string {
       
       
        return this.data.get(id).Chinese;
    }
    /**根据文本ID获取印尼语 */
    public getIndonesian(id:number): string {
        return this.data.get(id).Indonesian;
    }
    /**根据文本ID获取俄语 */
    public getRussian(id:number): string {
        return this.data.get(id).Russian;
    }
    /**根据文本ID获取泰语 */
    public getThai(id:number): string {
        return this.data.get(id).Thai;
    }
    /**根据文本ID获取韩国 */
    public getKorea(id:number): string {
        return this.data.get(id).Korea;
    }

    /** 静态方法，获取最大的 文本ID*/
    public static getMaxText_ID():number {
        return 1600010;
    }

    //以上格式统一，以下写每个json数据的特殊需求

    /*获得富文本字符串
    * textId 文本id
    * value 数值
    * valueType 数值类型
    */
    static getRichString(textId:number,value:number,valueType:ValueType):string{
        //获取文本内容，查找特殊符号~替换数值
        let textStr=LanguageManager.getInstance().getStrByTextId(textId);
        let valueStr=this.getValueUnit(value,valueType);
        //加上色值
        valueStr=this.getColorStr(valueStr);
        let newStr=textStr.replace("~",valueStr);
        return newStr;
    }

    /**根据数值和数值类型获得数值+单位字符串 */
    static getValueUnit(value:number,type:ValueType):string{
        switch(type){
            case ValueType.None:return value.toFixed(1)+ValueUnit.None;
            case ValueType.Percent:return (value*100).toFixed(1)+ValueUnit.Percent;
            case ValueType.Thousandths:return (value*100).toFixed(1)+ValueUnit.Thousandths;
            case ValueType.Second:return value.toFixed(1)+ValueUnit.Second;
        }
    }
    /**返回适合富文本的字符串，默认绿色 */
    static getColorStr(str:string):string{
        return '<color=green>'+str+'</color>';
    }
}
