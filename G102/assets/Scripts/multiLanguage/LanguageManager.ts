import ApkManager from "../Ads/ApkManager";
import { CUR_Platform, IsDebug, Release_Platform, ValueType } from "../Constants";
import { TextManagementManager } from "../JsonData/TextManagement";
import { Image_LanguageManager } from "../Multilingual/Image_Language";
import { LanguageType,LanguageIndex,AllLanguageString, SpriteIndex, AllLanSpriteFrame, OnLanguageChange } from "./LanguageConstants";
const {ccclass, property} = cc._decorator;

@ccclass
export default class LanguageManager {

    private cur_language_type: LanguageType =LanguageType.zh;
    private prev_language_type: LanguageType =LanguageType.zh;
    private static _instance: LanguageManager = null;
    private sp_atlas:cc.SpriteAtlas=null;
    private ImagerLanguage_sprite:Map<string,cc.SpriteFrame>=null;

    public static getInstance():LanguageManager
    {
        if(this._instance==null)
        {
            this._instance=new LanguageManager();
            this._instance.init();
        }
        return this._instance;
    }
    init()
    {
        let curLan=this.readLanguage();
        this.loadSpriteAtlas();
        this.loadSpImagerLanguage_sprite();

        if(CUR_Platform==Release_Platform.APK)
        {
            cc.LM=this;
            //先判断有没有保存一种语言
            if(curLan==null)
            {
                ApkManager.getInstance().getAndroidLanguage();
            }
        }
        if(IsDebug)
        {
            this.cur_language_type=LanguageType.zh;
        }

    }

    private loadSpImagerLanguage_sprite(){
        if(this.ImagerLanguage_sprite){
            return;
        }
        this.ImagerLanguage_sprite=new Map<string,cc.SpriteFrame>();
        cc.resources.loadDir('Multilingual',cc.SpriteFrame,(error: Error, assets:cc.SpriteFrame[])=>{
            if(error)
            {
                console.log(error);
                return;
            }
            let len=assets.length;
            for(let i=0; i<len; i++)
            {
                let sp=assets[i];
                let name=sp.name;
                this.ImagerLanguage_sprite.set(name,sp);
            }
        })   
    }


    public getSpBySpriteId(id:number):cc.SpriteFrame{
        let ilm=Image_LanguageManager.getInstance();     
        let name='';
        switch(this.cur_language_type)
        {
            case LanguageType.en:{
                name=ilm.getEnglish(id);
            }break;
            case LanguageType.zh:{
                name=ilm.getChinese(id);
            }break;
            case LanguageType.id:{
                name=ilm.getIndonesian(id);
            }break;
            case LanguageType.be:{
                name=ilm.getRussian(id);
            }break;
            case LanguageType.th:{
                name=ilm.getThai(id);
            }break;
            case LanguageType.kr:{
                name=ilm.getKorea(id);
            }break;
            default:{
                name=ilm.getEnglish(id);
            }break;
        }
        return this.ImagerLanguage_sprite.get(name);
    }

    private readLanguage():LanguageType
    {
        let str=cc.sys.localStorage.getItem('cur_language');
        if(str==='' || str===null)
        {
            str=null;
        }else{
            str=parseInt(str);
            this.prev_language_type=this.cur_language_type=str;
        }
        return str;
    }

    private saveLanguage(type:LanguageType)
    {
        cc.sys.localStorage.setItem('cur_language',type);
    }

    //切换当前语言
    switchLanguage(type:LanguageType):boolean
    {
        if(this.cur_language_type!=type)
        {
            this.setCurLanguageType(type);
            return true;
        }
        return false;
    }

    setLanguage(type)
    {
        cc.log('setLanguage：'+type);
        let curType=parseInt(type);
        this.switchLanguage(curType);
        this.saveLanguage(curType);
        cc.director.emit(OnLanguageChange);
    }

    private setCurLanguageType(type:LanguageType)
    {
        this.setPrevLanguageType(this.cur_language_type);
        this.cur_language_type=type;
    }

    getCurLanguageType():LanguageType
    {
        return this.cur_language_type;
    }

    private setPrevLanguageType(type:LanguageType)
    {
        this.prev_language_type=type;
    }
    private getPrevLanguageType():LanguageType
    {
        return this.prev_language_type;
    }

    private isSameLanguageType():boolean
    {
        return this.prev_language_type==this.cur_language_type?true:false;
    }

    getString(index:LanguageIndex):string
    {
        return AllLanguageString[index][this.cur_language_type];
    }
    /*根据一个任意语言类型的字符串，获得当前对应语言的字符串*/
    getStringByStr(str:string):string
    {
        let len=AllLanguageString.length;
        for(let i=0; i<len; i++)
        {
            for(let lanType=0; lanType<LanguageType.num; lanType++)
            {
                if(AllLanguageString[i][lanType]==str)
                {
                    return this.getString(i);
                }
            }
        }
        return '';
    }
    /*根据文本id获得一个字符串*/
    public getStrByTextId(textId:number):string{
        let tm=TextManagementManager.getInstance();        
        switch(this.cur_language_type)
        {
            case LanguageType.en:{
                return tm.getEnglish(textId);
            }break;
            case LanguageType.zh:{
                return tm.getChinese(textId);
            }break;
            case LanguageType.id:{
                return tm.getIndonesian(textId);
            }break;
            case LanguageType.be:{
                return tm.getRussian(textId);
            }break;
            case LanguageType.th:{
                return tm.getThai(textId);
            }break;
            case LanguageType.kr:{
                return tm.getKorea(textId);
            }break;
            default:{
                return tm.getEnglish(textId);
            }break;
        }
    }

    //图片翻译的
    loadSpriteAtlas()
    {
        cc.resources.load('sp/language_sprite',cc.SpriteAtlas,(error: Error, assets:cc.SpriteAtlas)=>{
            if(error)
            {
                console.log(error);
                return;
            }
            this.sp_atlas=assets;
        });
    }

    getSpriteFrame(index:SpriteIndex):cc.SpriteFrame
    {
        if(this.sp_atlas)
        {
            let sp=this.sp_atlas.getSpriteFrame(AllLanSpriteFrame[index][this.cur_language_type]);
            if(sp==null)
            {
                sp=this.sp_atlas.getSpriteFrame(AllLanSpriteFrame[index][LanguageType.en]);
            }
            return sp;
        }        
    }

}

