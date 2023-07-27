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



    start() {
        console.log("开始加载分包");
        // cc.director.loadScene("load");
        WXManagerEX.getInstance().initData();
        cc.loader.downloader.loadSubpackage('MainScript', function (err) {
            if (err) { 
                console.error("加载分包失败");
                return console.error(err); 
            } 
            console.log('load subpackage successfully.');
            cc.director.loadScene("load");
        });
       
        
    }
   
    // update (dt) {}
}
