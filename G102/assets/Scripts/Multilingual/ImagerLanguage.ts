// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { HeroManager } from "../Hero/Data/HeroManager";
import { LanguageType, OnLanguageChange } from "../multiLanguage/LanguageConstants";
import LanguageManager from "../multiLanguage/LanguageManager";
import { Image_LanguageManager } from "./Image_Language";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ImagerLanguage extends cc.Sprite {

    // @property(cc.Label)
    // label: cc.Label = null;

    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    @property()
    private cur_text_id: number = 0;//图片的id

    //保存原本设定的Index，方便修改后恢复
    private original_text_id: number = 0;
    private is_translation:boolean=false;
    private cur_language_type: LanguageType = LanguageType.en;

    protected onLoad () {
        this.original_text_id=this.cur_text_id;
        if(!this.is_translation){
            this.startTranslation();
        }
        this.addListen();
    }

    setTextId(id :number){
        this.cur_text_id=id;        
        this.startTranslation();
    }

    /**如果需要动态切换语言-事件监听 */
    startTranslation(){
        this.is_translation=true;
        this.spriteFrame=LanguageManager.getInstance().getSpBySpriteId(this.cur_text_id)
    }
    public addListen()
    {
        cc.director.on(OnLanguageChange,this.onLanguageChange,this);
    }

    /**事件移除 */
    public removeListen()
    {
        cc.director.off(OnLanguageChange,this.onLanguageChange,this);
    }
    
    protected onDestroy(): void {
        this.removeListen()
    }

    onLanguageChange(){
        // console.log("+++++++++++",LanguageManager.getInstance().getCurLanguageType(),this.cur_language_type)
        // if(this.cur_language_type!=LanguageManager.getInstance().getCurLanguageType())
        // {
            this.startTranslation();
        // }
    }

}
