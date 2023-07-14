import { LanguageIndex, LanguageType } from "./LanguageConstants";
import LanguageManager from "./LanguageManager";


const {ccclass, property} = cc._decorator;

@ccclass
export default class LabelLanguage extends cc.Label {

    //enableBold:boolean=true;
    @property({type:cc.Enum(LanguageIndex)})
    private cur_language_index: LanguageIndex = LanguageIndex.NULL;
    //保存原本设定的Index，方便修改后恢复
    private original_index:LanguageIndex = LanguageIndex.NULL;
    private cur_language_type: LanguageType = LanguageType.en;

    @property
    get str_translation () {
        return this.string;
    }

    set str_translation (newValue) {
        let oldValue = this.string;            
            if (newValue !== oldValue) {
                this.startTranslationByStr(newValue);
            }
    }
    
    onLoad () {
        this.original_index=this.cur_language_index;
        this.startTranslation();
    }

    setLanguageIndex(index :LanguageIndex){
        this.cur_language_index=index;
        this.startTranslation();
    }

    getOriginalIndex(){
        return this.original_index;
    }

    //开始翻译 
    startTranslation () {
        this.cur_language_type=LanguageManager.getInstance().getCurLanguageType();
         //2.根据当前的字符串索引设置，如果为Null即没有预设,那么则开始查找，找不到就不翻译，维持原样
         if(this.cur_language_index!=LanguageIndex.NULL)
         {
             this.string=LanguageManager.getInstance().getString(this.cur_language_index);
         }else
         {
             if(this.string!='')
             {
                 let str=LanguageManager.getInstance().getStringByStr(this.string);
                 if(str!='')
                 {
                     this.string=str;
                 }
             }                
         }
    }
    //开始翻译 
    startTranslationByStr(newStr:string)
    {
        //2.根据当前的字符串开始查找，找不到就不翻译，维持原样
        if(newStr!='')
        {
            let str=LanguageManager.getInstance().getStringByStr(newStr);
            if(str!='')
            {
                this.string=str;
            }else
            {
                this.string=newStr;
            }
        }           
    }
    //如果需要动态切换语言就开启以下代码
    update(dt)
    {
        if(this.cur_language_type!=LanguageManager.getInstance().getCurLanguageType())
        {
            this.startTranslation();
        }
    }

    onDestroy()
    {
        super.onDestroy();
    }
}
