// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class WXManagerEX extends cc.Component {

    private static _instance: WXManagerEX = null;

    public statusBarHeight: number = 0;

    public resourcesBundle: cc.AssetManager.Bundle = cc.resources;

    //转盘奖励
    public zhuanpanShipin;
    //复活奖励
    public fuhuoShipin;
    //七日签到视频
    public qiriQiandaoShipin;
    //快速挂机视频
    public kuaisuGuajiShipin;

    //战令解锁视频
    public zhanlingjiesuoShipin;
    //免费钻石
    public zuanshiiShipin;
    //免费金币
    public jinbiShipin;
    //装备库抽奖
    public zhuangbeikuShipin;
    //门票购买
    public cardByAd;


    public static getInstance(): WXManagerEX {
        if (this._instance == null) {
            this._instance = new WXManagerEX();
        }
        return this._instance;
    }

   
    public initData(): void {
        this.getSystemInfo();
        
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            //wx.cloud.init();
  
            // this.fuhuoShipin = wx.createRewardedVideoAd({
            //     adUnitId: 'adunit-81a1f1f3d7c367bb'
            // });
  
           
          
           
           

         

           

            wx.onShow(this.showWX);
            
        }
    }
    private showWX(res):void{
        console.log(JSON.stringify(res));
       
            if(this.sharFlag==true){
                WXManagerEX.getInstance().sharFlag=false;
                
            }

        
        
    }
    public vibrateShort(): void {
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            wx.vibrateShort({ type: "medium" });
        }

    }
    public sharFlag:boolean=false;
    public shareAppMessage():void{
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            wx.shareAppMessage({
                imageUrlId: "d2CFfPcmRESFpy28mMsJWA==",
                imageUrl: "https://mmocgame.qpic.cn/wechatgame/EGmcoSgicQus18ObjEjwSIjSJzMu2XD3z3gFVeuTXBGPD3n1UyfbgO8OlUebNibDVr/0"
              })
        }
        
    }

   
    public getSystemInfo(): void {
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            try {
                const res = wx.getSystemInfoSync()
                console.log("wx:" + res.model);
                console.log("statusBarHeight:" + res.statusBarHeight);
                if (res.statusBarHeight > 20) {
                    WXManagerEX.getInstance().statusBarHeight = res.statusBarHeight;
                }
                wx.showShareMenu({
                    withShareTicket: true,
                    menus: ['shareAppMessage', 'shareTimeline']
                })

                wx.onShareAppMessage(function () {
                    return {
                      imageUrlId: "d2CFfPcmRESFpy28mMsJWA==",
                      imageUrl: "https://mmocgame.qpic.cn/wechatgame/EGmcoSgicQus18ObjEjwSIjSJzMu2XD3z3gFVeuTXBGPD3n1UyfbgO8OlUebNibDVr/0"
                    }
                  })
        

            } catch (e) {
                // Do something when catch error
            }
        }

    }
    start() {
    }

    // update (dt) {}
}
export enum WXADEnvnt {
    //转盘奖励
    ZHUANPANJIANGLISHIPIN="ZHUANPANJIANGLISHIPIN",
    //签到双倍领取
    QIRIQIANDAOSHIPIN="QIRIQIANDAOSHIPIN",
    //快速挂机
    KUAISUGUAJISHIPIN="KUAISUGUAJISHIPIN",
    //战令解锁
    ZHANLINGJIESUOSHIPIN="ZHANLINGJIESUOSHIPIN",
    //免费钻石
    ZUANSHILINGQUSHIPIN="ZUANSHILINGQU",
    //免费金币
    JINBISHIPIN="JINBISHIPIN",
    //装备库抽奖
    ZHUANGBEICHOUJIANG="ZHUANGBEICHOUJIANG",
    //局内复活
    JUNEIFUHUOSHIPIN="JUNEIFUHUOSHIPIN"


}