
import { AccessName, HttpManager } from "./NetWork/HttpManager";
import ApkManager from "./Ads/ApkManager";
import { CurVersionCode, IsDebug } from "./Constants";
import GameManager from "./GameManager";
import { PlayerLevelUpManager } from "./JsonData/PlayerLevelUp";
import { UILayerLevel, UIPath } from "./UI/UIConfig";
import { UIManager } from "./UI/UIManager";
import WXManagerEX from "../startscene/WXManagerEX";

export default class UserData {

    private static _instance: UserData = null;
    /**用户的服务器数据是否加载完毕 */
    public is_load_ok:boolean=false;

    /**版本检测是否完毕 */
    public version_is_ok:boolean=false;

    //初始化游戏数据    
    init () {
        if(!this.getUserID()){
            this.HttpPostGetUserId(this.randomDeviceId(16),"Organic");
        }else{
            this.is_load_ok=true;
        }        
    }


    
    public static getInstance():UserData
    {
        if(this._instance==null)
        {
            this._instance=new UserData();
            this._instance.init();
        }
        return this._instance;
    }

    randomLetter(len:number):string 
    {
        const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let res = ''
        for (let i = 0; i < len; i++) {
            let n = Math.floor(Math.random() * letters.length)
            res += letters[n]
        }
        return res
    }

    randomDeviceId(len:number):string 
    {
        const letters = "abcdefghijklmnopqrstuvwxyz0123456789";
        let res = ''
        for (let i = 0; i < len; i++) {
            let n = Math.floor(Math.random() * letters.length)
            res += letters[n]
        }
        return res
    }

    //添加
    addUserLevel(num:number):boolean
    {
        let newNum=this.getUserLevel()+num;
        if(newNum>=0) {
            this.saveUserLevel(newNum);
            return true;
        }
        return false;
    }

    getUserLevel():number{
        let num=cc.sys.localStorage.getItem('user_level');
        if(num==="" || num===null)
        {
            num=1;
        }else
        {
            num=parseInt(num);            
        }
        return num;
    }

    //保存数量
    saveUserLevel(newNum:number)
    {
        cc.sys.localStorage.setItem('user_level', newNum);
    }

    //更改数量
    changeUserExp(num:number):boolean
    {
        let newNum=this.getUserExp()+num;
        if(newNum>=0) {
            this.saveUserExp(newNum);
            return true;
        }
        return false;
    }

    getUserExp():number{
        let num=cc.sys.localStorage.getItem('user_exp');
        if(num==="" || num===null)
        {
            num=0;            
        }else
        {
            num=parseInt(num);            
        }
        return num;
    }

    //保存数量
    saveUserExp(newNum:number)
    {
        cc.sys.localStorage.setItem('user_exp', newNum);
        let level=this.getUserLevel();
        let maxLevel=PlayerLevelUpManager.getMaxPlayerLevel();
        GameManager.getInstance().refreshUserExpShow();
        if(level<maxLevel && newNum >= PlayerLevelUpManager.getInstance().getPlayerExpCost(level)){
            //显示玩家升级
            // UIManager.getInstance().showUserLevelUi();
            UIManager.getInstance().showUiDialog(UIPath.UserLevel,UILayerLevel.One,{onCompleted:(uiNode)=> {},});
        }
    }

    //********************************************账户信息*************************************************   
    getUserName():string
    {
        let str=cc.sys.localStorage.getItem('user_name');
        if(str==='' || str===null)
        {
            str=this.randomLetter(8);
            this.saveUserName(str);
        }
        return str;
    }

    saveUserName(str:string)
    {
        cc.sys.localStorage.setItem('user_name',str);
    }

    getUserID():string
    {
        let str=cc.sys.localStorage.getItem('user_id');
        if(str==='' || str===null)
        {
            //请求网络获得uid
            str="";
            this.saveUserID(str);
        }
        // if(cc.sys.isNative==false)
        // {
        //     if(str==='' || str===null){
        //         str="Unattributed16520878400a0";
        //         this.saveUserID(str);
        //     }
        // }
        return str;
    }

    saveUserID(str:string)
    {
        cc.sys.localStorage.setItem('user_id',str);
    }

    getVersion():string
    {
        let str=cc.sys.localStorage.getItem('game_version');
        if(str==='' || str===null)
        {
            str='1.2.2'
            //this.saveVersion(str);
        }
        return str;
    }

    saveVersion(str:string)
    {
        cc.sys.localStorage.setItem('game_version',str);
    }

    getUserAvatar():number
    {
        let str=cc.sys.localStorage.getItem('user_avatar');
        if(str==='' || str===null)
        {
            str=8;
            this.saveUserAvatar(str);
        }
        str=parseInt(str);
        return str;
    }

    saveUserAvatar(str:string)
    {
        cc.sys.localStorage.setItem('user_avatar',str);
    }
    

    /**请求网络生成一个uuid */
    HttpPostGetUserId(deviceId:string,network:string){
        if(this.getUserID()){
            return
        }
        let json={
            uid:"",//传空表示获得生成
            network:network,
            user:network,
            appVer:"",
            phoneModel:"HuaWei",
            pkg:"com.IdleHeroCastleDefense",
            sysVer:31,
            lang:"zh",
            maxLevel:"0",
            totalOnlineDur:"0",
            deviceId:deviceId,
            name:"Test-"+this.randomLetter(4)
        }
        //this.saveUserID("123456789");
        // this.is_load_ok=true;
        HttpManager.post(AccessName.userBasic,JSON.stringify(json)).then((data:any)=>{
            if(data.uid){
                this.saveUserID(data.uid);
                this.is_load_ok=true;
            }
        }).catch((error)=>{
            cc.error(error);
            //反复请求
            this.HttpPostGetUserId(deviceId,network);
        });
    }

    /**请求网络检测版本 */
    HttpPostCheckVersion(){
        // if(cc.sys.isNative){
        //     HttpManager.post(AccessName.versionGet,JSON.stringify({})).then((data:any)=>{
        //         if(data){
        //             if(data>CurVersionCode){
        //                 WXManagerEX.getInstance().resourcesBundle.load("loading/version_tip",cc.Prefab,(error: Error, assets:cc.Prefab)=>{  
        //                     if(error){
        //                         cc.log(error);
        //                         return;
        //                     }
        //                     let node=cc.instantiate(assets);
        //                     node.x=0;
        //                     node.y=0;
        //                     cc.find("Canvas").addChild(node);
        //                 });
        //             }else{
        //                 this.version_is_ok=true;
        //             }                
        //         }else{
        //             this.version_is_ok=true;
        //         }
        //     }).catch((error)=>{
        //         cc.error(error);
        //         this.version_is_ok=true;
        //     });
        // }else
        // {
            this.version_is_ok=true;
        //}
    }
}

