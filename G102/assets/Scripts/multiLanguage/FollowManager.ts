import ApkManager from "../Ads/ApkManager";
import { Follow_Type } from "./FollowConstants";

const {ccclass, property} = cc._decorator;

@ccclass
export default class FollowManager {

    private static _instance: FollowManager = null;

    public static getInstance():FollowManager
    {
        if(this._instance==null)
        {
            this._instance=new FollowManager();
        }
        return this._instance;
    }

    followEvent(eventName:string)
    {
        console.log(eventName);
        ApkManager.getInstance().followEvent(eventName);
    }

    // followNeiBu(level:number,total:number,name:string)
    // {
    //     console.log('level:'+level+',total:'+total);
    //     if (cc.sys.os === cc.sys.OS_ANDROID) {
    //         let className = "org/cocos2dx/javascript/FollowManager";
    //         let methodName = "followNeiBu";
    //         let methodSignature = "(IILjava/lang/String;)V";//如果是string：Ljava/lang/String;, bool:Z,int:I
    //         jsb.reflection.callStaticMethod(className, methodName, methodSignature,level,total,name);
    //     }
    // }
    
    // cheakTime()
    // {
    //     if (cc.sys.os === cc.sys.OS_ANDROID) {
    //         let className = "org/cocos2dx/javascript/FollowManager";
    //         let methodName = "cheakTime";
    //         let methodSignature = "()V";//如果是string：Ljava/lang/String;, bool:Z,int:I
    //         jsb.reflection.callStaticMethod(className, methodName, methodSignature);
    //     }
    // }

    addTotal(type:string,addNum:number){
        let num=this.getTotal(type)+addNum;
        cc.sys.localStorage.setItem('total_'+type,num);
        this.followEvent(type+num)
    }

    getTotal(type:string):number{
        let num=cc.sys.localStorage.getItem('total_'+type);
        if(num==="" || num===null)
        {
            num=0;
        }else
        {
            num=parseInt(num);            
        }
        return num;
    }

    addFirstDo(type:string){
        let num=this.getFirstDo(type)+1;
        cc.sys.localStorage.setItem('do_'+type,num);
    }

    getFirstDo(type:string):number{
        let num=cc.sys.localStorage.getItem('do_'+type);
        if(num==="" || num===null)
        {
            num=0;
        }else
        {
            num=parseInt(num);            
        }
        return num;
    }
}

