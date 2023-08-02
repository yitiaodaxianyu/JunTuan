import WXManagerEX from "../../startscene/WXManagerEX";
import { IsGM } from "../Constants";


export enum Load_Mode {
    local=1,//本地下载，将json文件在resources目录下的json目录
    remote=2,//远程下载，将json文件在url的json目录
}

export class LoadManager  {
    //webServer的url，统一以json作为路径
    static remote_url_json:string='http://localhost:8080/json/';
    //使用的下载模式
    static load_mode:Load_Mode=Load_Mode.local;
    //下载成功的文件
    static loaded_completed:number=0;
    static max_num_loading:number=0;

    static init(){
        this.load_mode=IsGM?Load_Mode.remote:Load_Mode.local;
    }

    static loadJson(fileName:string,mode:Load_Mode,onComplete: (err: Error, asset: cc.JsonAsset) => void){
        this.max_num_loading++;
        switch(mode){
            case Load_Mode.local:{
                this.loadLocal('json/'+fileName,cc.JsonAsset,onComplete);
            }break;
        case Load_Mode.remote:{
                this.loadRemote(this.remote_url_json+fileName+'.json',onComplete);
            }break;
        }
    }

    private static loadLocal(url:string,type: typeof cc.Asset,onComplete:(err: Error, asset: cc.Asset) => void){
        WXManagerEX.getInstance().resourcesBundle.load(url,type,(error: Error, assets:cc.Asset)=> {
            if(error){
                console.log(error);
                return;
            }
            this.loaded_completed++;
            onComplete(error,assets);
            cc.assetManager.releaseAsset(assets);
        });
    }

    private static loadRemote(url:string,onComplete:(err: Error, asset: cc.JsonAsset) => void){
        cc.assetManager.loadRemote(url,{cacheEnabled:false},(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            this.loaded_completed++;
            onComplete(error,assets);
        });
        
    }

    public static getIsLoadComplete():boolean{
        return this.loaded_completed>0&&this.loaded_completed>=this.max_num_loading;
    }
}
