import { LanguageType, OnLanguageChange, SpriteIndex } from "./LanguageConstants";
import LanguageManager from "./LanguageManager";


const {ccclass, property} = cc._decorator;

@ccclass
export default class SpriteLanguage extends cc.Sprite {

    @property({type:cc.Enum(SpriteIndex)})
    private cur_sprite_index: SpriteIndex = SpriteIndex.NULL;
    
    private cur_language_type: LanguageType = LanguageType.en;


    onLoad () {
        this.startTranslation();
        this.addListen();
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
            
        }
    }
    
    //开始翻译 
    startTranslation () {
        this.cur_language_type=LanguageManager.getInstance().getCurLanguageType();
         //2.根据当前的字符串索引设置，如果为Null即没有预设,那么则开始查找，找不到就不翻译，维持原样
         if(this.cur_sprite_index!=SpriteIndex.NULL)
         {
             this.spriteFrame=LanguageManager.getInstance().getSpriteFrame(this.cur_sprite_index);
         }
    }    


    onDestroy()
    {
        super.onDestroy();
    }
}
