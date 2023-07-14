import { IsDebug, IsTestServer } from "../Constants";
import { UIManager } from "../UI/UIManager";
export let WWW= 'http://124.222.212.141:8872';//http://api.super-bossgame.com
export let TEST='http://47.243.114.126:10018';//http://47.243.114.126:10018

/**要访问的接口名称 */
export enum AccessName
{
    /**获取用户现有的游戏道具 */
    getUserItems="/user/getUserItems",       
    /**获取服务器时间戳接口 */
    getServerTime = "/clientSync/seconds",
    /**抽奖接口 */
    tryPrize = "/user/userPrize",
    /**更新用户数据信息 */
    updateUserInfo = "/user/updateUserInfo",
    /**更新用户数据信息-BOSS每周奖励领取状态 */
    updateUserInfoDNL = "/user/updateUserInfoDNL",
    /**修改头像，名字 */
    updateAvatar = "/user/updateAvatar",
    /**转盘抽奖接口 */
    userTurnPrize = "/user/userTurnPrize",
    /**获取战力排行榜接口 */
    leaderboardByUser = "/user/leaderboardByUser",
    /**道具数据上报 */
    setProp ="/item/report",
    /**道具数据下发 */
    getProp="/item/list",
    /**查询用户任务进度及任务奖励领取状态 */
    queryGameTask = "/userTask/queryGameTask",
    /**保存用户任务进度 */
    saveGameTask = "/userTask/saveGameTask",
    /**获取用户信息 */
    userInfo = "/user/info",
    /**Boss获取轮换顺序 */
    getBoss = "/copy/getBoss",
    /**上传用户id，传""值会生成一个用户id*/
    userBasic="/user/basic",
    /**版本获取 */
    versionGet="/version/get",
    /**获取英雄列表 */
    getHeroList = "/hero/list",
    /**上报英雄列表 */
    reportHeroList = "/hero/report",
    /**七天签到 */
    sevenSign = "/sign/sevenSign",
    /**七天签到结束 */
    updateSevenGift = "/sign/updateSevenGift",
    /**月签到 */
    monthSign = "/sign/monthSign",
    /**月签到累计奖励 */
    addSignGift = "/sign/addSignGift",
    /**查询月签到和月签到累计奖励领取记录 */
    getSignRecord = "/sign/getSignRecord",
    /**任务查询 */
    queryGameAchievementTask = "/achievementTask/queryGameAchievementTask",
    /**任务修改 */
    changeGameAchievementTask = "/achievementTask/changeGameAchievementTask",
    /**任务新增 */
    saveGameAchievementTask = "/achievementTask/saveGameAchievementTask",

}

export class TaskObject{
    ///**用户id */
    // uid:string = "";
    /**日期 */
    today:string = "";
    /**主线任务显示进度 */
    progress:number = 0;
    /**任务id */
    taskId:number = 0;
    /**任务维度 1-每日任务 2-成就任务 3-主线任务 */
    dimension:number = 0;
    /**任务类型 */
    taskType:number = 0;
    /**触发次数 */
    emit:number = 0;
    /**任务阶段 */
    stage:number = 0;
    /**任务状态 -1 已完成 -2 已领取 */
    status:number = 0;
}

export class HeroObject{
    /**英雄id */
    heroId:number = 0;
    /**英雄等级 */
    heroLevel:number = 0;
    /**英雄阶段 */
    heroStage:number = 0;
    /**专武阶段 */
    heroWeaponStage:number = 0;
    /**武器id */
    weapons:number = 0;
    /**护甲id */
    armor:number = 0;
    /**饰品id */
    accessories:number = 0;
    /**鞋子id */
    shoes:number = 0;
    /**宠物id */
    pet:number = 0;
}

export enum Params_Type
{
    /**只带UID的NULL */
    Null=0,
    
    
    num,
}

export class PropObject{
    itemsId:number=0;
    itemsNum:number=1;
}

export class HttpManager {
    private static AesKey: string="abc12345";
    private static CBCIV: string="cba76321";

    public static isSuccessRes:boolean = true;
    /**
     * post请求一个接口
     * @param accessName 请求的接口名称
     * @param params 请求的参数
     * @returns Promise对象
     */
    static post(accessName:AccessName,params:string,isWait:boolean =false):Promise<any>{
        if(!IsTestServer){
            return new Promise((resolve, reject) => {});
        }
        if(isWait){
            if(this.isSuccessRes){
                UIManager.getInstance().showWaitUiDialog();
                this.isSuccessRes = false;
            }else{
                return new Promise((resolve, reject) => {});
            }
        }
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = ()=>{
                //console.log(xhr.status,xhr.readyState);
                if(xhr.readyState == 4)
                {
                    if(xhr.status >= 200 && xhr.status < 400) {
                        var response = xhr.responseText;
                        // cc.log(response);
                        let json=JSON.parse(response);
                        if(json.status=='200')
                        {
                            if(isWait){
                                this.isSuccessRes = true;
                                UIManager.getInstance().closeWaitUiDialog();
                            }
                            resolve(json.data);
                        }else
                        {
                            reject('请求成功,错误码:'+json.status+",错误信息:"+json.message);
                        }
                    }else
                    {
                        //断网或者不存在，可能是返回404
                        reject('请求失败，状态码:'+xhr.status);
                    }
                }                
            };
            let url=this.getUrlByType(accessName);
            xhr.open("POST", url, true);
            //xhr.open()
            //open之后，send之前
            xhr.setRequestHeader("Content-Type","application/json;charset=UTF-8");
            //请求参数（请求体）;
            //let params=this.getIssuedParamsByType(paramsType);
            cc.log('url:'+url+"\nparams:"+params);
            xhr.send(params);    
        })
    }

    static gameTimePost(accessName:AccessName,params:string):Promise<any>{
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = ()=>{
                console.log('gameTimePost:',xhr.readyState)+','+xhr.status;
                if(xhr.readyState == 4)
                {
                    if(xhr.status >= 200 && xhr.status < 400) {
                        var response = xhr.responseText;
                        cc.log(response);
                        let json=JSON.parse(response);
                        if(json.status=='200')
                        {
                            resolve(json);
                        }else
                        {
                            reject('请求成功,错误码:'+json.status);
                        }
                    }else
                    {
                        //断网或者不存在，可能是返回404
                        reject('请求失败，状态码:'+xhr.status);
                    }
                }                
            };
            let url=this.getUrlByType(accessName);
            xhr.open("POST", url, true);
            //xhr.open()
            //open之后，send之前
            xhr.setRequestHeader("Content-Type","application/json;charset=UTF-8");
            //请求参数（请求体）;
            //let params=this.getIssuedParamsByType(paramsType);
            cc.log('url:'+url+"\nparams:"+params);
            xhr.send(params);    
        })
    }

    

    private static getUrlByType(urlType:AccessName):string
    {
        let urlStr=WWW;
        if(IsDebug)
        {
            urlStr=TEST;
        }
        let url=urlStr+urlType;
        return url;
    }

        /**
     * AES加密（CBC模式，需要偏移量）
     * @param data
     * @returns {*}
     */
    private static encrypt(data){
        var key = CryptoJS.enc.Utf8.parse(this.AesKey);
        var secretData = CryptoJS.enc.Utf8.parse(data);
        var encrypted = CryptoJS.AES.encrypt(
            secretData, 
            key, 
            this.getCBCOptions()
        );
        return encrypted.toString();
    }
    
    /**
     * AES解密（CBC模式，需要偏移量）
     * @param data
     * @returns {*}
     */
    private static decrypt(data){
        var key = CryptoJS.enc.Utf8.parse(this.AesKey);
        var decrypt = CryptoJS.AES.decrypt(
            data, 
            key, 
            this.getCBCOptions()
        );
        return CryptoJS.enc.Utf8.stringify(decrypt).toString();
    }

    private static getCBCOptions():any{      
        // 加密选项
        let CBCOptions = {
            iv: CryptoJS.enc.Utf8.parse(this.CBCIV),
            mode:CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }
        return CBCOptions;
    }

    public static testAES(str:string){
        let aa=this.encrypt(str);
        console.log(aa);
        let bb=this.decrypt(aa);
        console.log(bb);
    }
    // ————————————————
    // 版权声明：本文为CSDN博主「myzksky」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
    // 原文链接：https://blog.csdn.net/myzksky/article/details/82052920
}

