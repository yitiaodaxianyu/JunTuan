import ApkManager from "./ApkManager";
import { CUR_Platform, Release_Platform, VIDEO_TYPE } from "../Constants";
import Hint from "../Hint";
import WXManager from "./WXManager";
// import TaskManger, { MustType, TaskType } from "../Task/TaskManger";

const {ccclass, property} = cc._decorator;

@ccclass
export default class AdManager {

    private static _instance: AdManager = null;
    private adCallback:Function=null;

    public static getInstance():AdManager
    {
        if(this._instance==null)
        {
            this._instance=new AdManager();
            this._instance.init();
        }
        return this._instance;
    }
    //初始化游戏数据
    init () {
        this.initAds();        
    }
    initAds()
    {
        switch(CUR_Platform)
        {
            case Release_Platform.APK: ApkManager.getInstance().init(); break;
            case Release_Platform.CPK_WX: WXManager.getInstance().init(); break;
            //case Release_Platform.CPK_JKW:CpkJKWManager.getInstance().init(); break;
            case Release_Platform.WEB_TEST: break;
        }
        
    };
    
    showBanner()
    {
        switch(CUR_Platform)
        {
            //case Release_Platform.APK: ApkManager.getInstance().showBanner(); break;
            //case Release_Platform.CPK_JKW: CpkJKWManager.getInstance().showBanner(); break;
            case Release_Platform.WEB_TEST: break;
        }   
    };
    
    showInterstitial(message:string)
    {
        cc.log('showInterstitial');
        switch(CUR_Platform)
        {
            case Release_Platform.APK: ApkManager.getInstance().showInterstitial(message); break;
            //case Release_Platform.CPK_JKW: CpkJKWManager.getInstance().showInterstitial(); break;
            case Release_Platform.WEB_TEST: break;
        }  
    };
    //callback，视频播放是否成功的回调函数
    showVideo(callback:(isSuc:boolean)=>void,type:VIDEO_TYPE)
    {
        this.adCallback=callback;
        switch(CUR_Platform)
        {
            case Release_Platform.APK: ApkManager.getInstance().showVideo((isSuc:boolean)=>{
                this.adResult(isSuc);
            },type); break;
            case Release_Platform.CPK_WX: WXManager.getInstance().showVideo(callback); break;
            //case Release_Platform.CPK_JKW: CpkJKWManager.getInstance().showVideo(callback,context); break;
            case Release_Platform.WEB_TEST:{
                this.adResult(true);
            } break;
        }
    };

    adResult(result:boolean)
    {
        if(this.adCallback!=null)
        {
            this.adCallback(result);
            this.adCallback=null;
            if(result==true)
            {
                // TaskManger.getInstance().changeMustProgress(MustType.累计播放视频,1);
            }
        }
    }
}

