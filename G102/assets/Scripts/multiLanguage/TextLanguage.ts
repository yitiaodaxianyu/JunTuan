import { TextManagementManager } from "../JsonData/TextManagement";
import { LanguageType, OnLanguageChange } from "./LanguageConstants";
import LanguageManager from "./LanguageManager";


const {ccclass, property} = cc._decorator;

@ccclass
export default class TextLanguage extends cc.Label {

    @property({tooltip:"当前的文本id,使用文本表内预设的id"})
    private cur_text_id: number|number[] = 0;
    //保存原本设定的Index，方便修改后恢复
    private original_text_id: number|number[] = 0;
    private cur_language_type: LanguageType = LanguageType.en;
    /**替换的符号字符串，如 ~  */
    private replace_str:string[]=[];
    /**替换的值字符串，如10% */
    private replace_value:string[]=[];
    /**链接几个id之间的字符串，如：，、 */
    private link_str:string[]=[];
    /**前缀字符串 */
    private prefix_str:string='';
    private is_translation:boolean=false;

    protected onLoad () {
        this.original_text_id=this.cur_text_id;
        if(!this.is_translation){
            this.startTranslation();
        }
        this.addListen();
    }

    /**
     * 
     * @param id 文本id或文本id数组
     * @param linkStr 链接文本id数组的字符串
     */
    setTextId(id :number|number[],linkStr:string|string[]=[]){
        this.cur_text_id=id;
        if(typeof linkStr == "string"){
            this.link_str[0]=linkStr;            
        }else{
            this.link_str=linkStr;
        }
        this.startTranslation();
    }

    getTextId():number|number[]{
        return this.cur_text_id;
    }

    setReplaceValue(replaceStr:string|string[],replaceValue:string|string[]){
        if(typeof replaceStr == "string"){
            this.replace_str[0]=replaceStr;            
        }else{
            this.replace_str=replaceStr;
        }
        if(typeof replaceValue == "string"){
            this.replace_value[0]=replaceValue;            
        }else{
            this.replace_value=replaceValue;
        }
        this.startTranslation();
        this.startReplace();
    }

    getOriginalTextId(){
        return this.original_text_id;
    }

    //开始翻译 
    startTranslation () {
        this.cur_language_type=LanguageManager.getInstance().getCurLanguageType();
        if(this.cur_text_id!=0&&TextManagementManager.getInstance().getIsLoadCompleted())
        {
            this.is_translation=true;
            if(typeof this.cur_text_id == "number"){
                this.setString(LanguageManager.getInstance().getStrByTextId(this.cur_text_id));
            }else{
                let str='';
                for(let i=0; i<this.cur_text_id.length; i++){
                    let id=this.cur_text_id[i];
                    if(id!=0){
                        str+=LanguageManager.getInstance().getStrByTextId(id);
                        if(i<this.link_str.length)
                            str+=this.link_str[i];
                    }
                }
                this.setString(str);
            }
        }
    }

    /**设置前缀 */
    setPrefix(str:string){
        this.prefix_str=str;
    }

    /**开始替换 */
    private startReplace(){
        for(let i=0; i<this.replace_str.length; i++){
            let str=this.replace_str[i];
            if(str!=''){
                let nowStr=this.string;
                this.setString(nowStr.replace(str,this.replace_value[i]));
            }
        }
    }

    private setString(str:string){
        if(this.prefix_str!=''){
            if(this.string.substring(0,this.prefix_str.length)==this.prefix_str){
                this.string=str;
            }else{
                this.string=this.prefix_str+str;
            }                
        }else{
            this.string=str;
        }
    }

    /**如果需要动态切换语言-事件监听 */
    public addListen()
    {
        cc.director.on(OnLanguageChange,this.onLanguageChange,this);
    }

    /**事件移除 */
    public removeListen()
    {
        cc.director.off(OnLanguageChange,this.onLanguageChange,this);
    }
   
    onLanguageChange(){
        if(this.cur_language_type!=LanguageManager.getInstance().getCurLanguageType())
        {
            this.startTranslation();
            this.startReplace();
        }
    }
    
    // //如果需要动态切换语言就开启以下代码
    // update(dt)
    // {
    //     if(this.cur_language_type!=LanguageManager.getInstance().getCurLanguageType())
    //     {
    //         this.startTranslation();
    //         this.startReplace();
    //     }
    // }    

    protected onDestroy()
    {
        super.onDestroy();
        this.removeListen();
    }
}
