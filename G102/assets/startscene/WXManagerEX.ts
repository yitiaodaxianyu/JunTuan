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

    public static getInstance(): WXManagerEX {
        if (this._instance == null) {
            this._instance = new WXManagerEX();
        }
        return this._instance;
    }
    public initData(): void {
        this.getSystemInfo();
    }
    public vibrateShort():void{
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            wx.vibrateShort({type:"medium"});
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


            } catch (e) {
                // Do something when catch error
            }
        }

    }
    start() {
    }

    // update (dt) {}
}
