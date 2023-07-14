import AdManager from "./AdManager";

// Battle racing  65398
// banner  ca-app-pub-2476175026271293/9535537102
// interstitial  ca-app-pub-2476175026271293/5005582382
// rewarded ca-app-pub-2476175026271293/3339478623

const {ccclass, property} = cc._decorator;

@ccclass
export default class WXManager {

    private static _instance: WXManager = null;
    private banner_id:string='ca-app-pub-2476175026271293/9535537102';
    private interstitial_id:string='ca-app-pub-2476175026271293/5005582382';
    private reward_id:string='ca-app-pub-2476175026271293/3339478623';


    private perv_inst_time=0;
    private perv_video_time=0;

    public static getInstance():WXManager
    {
        if(this._instance==null)
        {
            this._instance=new WXManager();
        }
        return this._instance;
    }
    //初始化游戏数据
    init () {
        this.initAds();
    }

    initAds()
    {
        if(cc.sys.platform===cc.sys.WECHAT_GAME)
        {
            wx.showShareMenu({
                withShareTicket: true
              });
        }
    };
    
    showBanner()
    {        
           
    };
    showInterstitial()
    {
        let curTime=new Date().getTime();
        let isCanAd=false;
        if(curTime-this.perv_inst_time>1000*10)
        {
            isCanAd=true;
            this.perv_inst_time=curTime;
        }
        if(isCanAd==false)
        {
            return;
        }
        
    };
    //callback，视频播放是否成功的回调函数
    showVideo(callback)
    {
        let curDate = new Date();
        let curTime=curDate.getTime();
        let reward_time=cc.sys.localStorage.getItem('reward_time');                
        if(reward_time!=""&&reward_time!=null)
        {
            reward_time=parseInt(reward_time);
            let offsetT=curTime-reward_time;
            let tt=3*60*1000;
            if(offsetT>=tt)
            {
                callback(true);
                cc.sys.localStorage.setItem('reward_time',curTime);
            }else
            {
                callback(false);
                let sy=Math.round((tt-offsetT)/1000);
                //AdManager.getInstance().showMessage('内测期间,暂无激励广告,每3分钟可以免费领取一次奖励，还差 '+sy+' 秒可以领取');
            }    

        }else
        {
            callback(true);
            cc.sys.localStorage.setItem('reward_time',curTime);
        }

        
        
        
        

        // let curTime=new Date().getTime();
        // let isCanAd=false;
        // let offsetTime=Math.round((curTime-this.perv_video_time)/1000);
        // if(offsetTime>120)
        // {
        //     isCanAd=true;
        //     this.perv_video_time=curTime;
        // }
          
    };
}

