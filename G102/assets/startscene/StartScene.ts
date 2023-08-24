// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import WXManagerEX from "./WXManagerEX";

const { ccclass, property } = cc._decorator;

@ccclass
export default class StartScene extends cc.Component {


   
    loadingBar: cc.ProgressBar = null;
    
    loadLabel: cc.Label = null;

   
    tipLabel: cc.Label = null;

    private loadProGress:number=0;
    onLoad() {
        console.log("开始加载分包");
        // cc.director.loadScene("load");
        this.loadingBar=this.node.getChildByName('bg_loading').getChildByName('ProgressBar').getComponent(cc.ProgressBar);
        console.log("1");
        
        this.loadLabel=this.node.getChildByName('bg_loading').getChildByName('ProgressBar').getChildByName('loadLabel').getComponent(cc.Label);
        console.log("2");
        this.tipLabel=this.node.getChildByName('bg_loading').getChildByName('load').getComponent(cc.Label);
        console.log("3");

        this.loadingBar.progress = 0;
        this.loadLabel.string = (0 * 100).toFixed(0) + '%';
        WXManagerEX.getInstance().initData();
        cc.loader.downloader.loadSubpackage('MainScript', function (err) {
            if (err) {
                console.error("加载分包失败");
                return console.error(err);
            }
            console.log('load subpackage successfully.');

            cc.assetManager.loadBundle('ImageBundle', (err, bundle) => {
                if (err) {
                    console.error("加载ImagesBundle失败");
                    return;
                }
                cc.assetManager.loadBundle('resourcesBundle', (err, bundle) => {
                    if (err) {
                        console.error("加载resourcesBundle失败");
                        return;
                    }
                    //因为加载代码引入的原因只能先放到这里
                    WXManagerEX.getInstance().resourcesBundle = cc.assetManager.getBundle('resourcesBundle');
                    cc.director.loadScene("load");
                });
            });

           


        });


    }
    protected update(dt: number): void {
        if(this.loadProGress<100){
            this.loadProGress+=0.2;
        }
        if(this.loadProGress>80){
            this.tipLabel.string="首次进入游戏可能耗时较长...";
        }
        this.loadingBar.progress = this.loadProGress/100;
        this.loadLabel.string = (this.loadProGress).toFixed(0) + '%';
    }

    // update (dt) {}
}
