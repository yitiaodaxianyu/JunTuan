import { AccessName, HeroObject, HttpManager, TaskObject } from ".././NetWork/HttpManager";
import { Hero_Type } from "../Hero/Game/HeroConfig";
import { StorageKey } from "../Storage/StorageConfig";
import { TheStorageManager } from "../Storage/StorageManager";
import UserData from "../UserData";

export class UserInfo{

    //连续签到天数 新手7天签到
    signInDays:number = 0;
    // 是否领取七日礼包
    isSignGift:number = 0;
    // 最后一次签到时间 新手7天签到
    lastSignTime:number = 0;
    // 最后一次签到时间时间戳 毫秒级时间戳
    lastSignTimeTS:number = 0;
    // 付费宝石数量
    payGem:number = 0
    // 波数
    waveNumber:number = 0

    // 伤害数
    damageNumber:number = 0

    // Boss轮换顺序
    RotationOrder:number = 1

    heroList:HeroObject[] = [];

    dailyTaskList:TaskObject[] = [];

    achievementTaskList:TaskObject[] = [];

    mainTaskList:TaskObject[] = [];

    // Boss挑战每周奖励领取状态   是否能领取   0>未领取   -1已领取
    damageNumberLast:number = -1
    private static _instance: UserInfo = null;

    public static getInstance():UserInfo {
        if(this._instance==null) {
            this._instance=new UserInfo();
            this._instance.init();
        }
        return this._instance;
    }

    init(){
        this.refreshData();
        this.getHeroList();
        this.getVIPData();
        this.getTaskData();
    }

    refreshData(){
        HttpManager.gameTimePost(AccessName.getServerTime,this.getUserInfoJsonString()).then((data:any)=>{
            if(data.serverTime){
                let nowTime = data.serverTime;
                this.getStoreData(nowTime * 1000);
                HttpManager.post(AccessName.userInfo,this.getUserInfoJsonString()).then((data:any)=>{
                    this.signInDays = data.signDays;
                    this.isSignGift = data.isSignGift;
                    this.lastSignTime = data.lastSignTime;
                    //this.lastSignTimeTS = data.lastSignTimeTS;
                    this.lastSignTimeTS =TheStorageManager.getInstance().getNumber(StorageKey.NewPlayerSavenDaySignInTime,0);
                    this.payGem = data.payGem;
                    this.waveNumber = data.waveNumber;
                    this.damageNumber = data.damageNumber;
                    this.damageNumberLast=data.damageNumberLast;
                    TheStorageManager.getInstance().setItem(StorageKey.NewPlayerSavenDaySignInNum,this.signInDays);
                    TheStorageManager.getInstance().setItem(StorageKey.NewPlayerSavenDaySignInOver,this.isSignGift);
                    
                    if(this.isSignGift == 0){
                        //let signInDate = new Date(this.lastSignTimeTS * 1000);
                        let signInDate = new Date(this.lastSignTimeTS);
                        let n1 = signInDate.getDate();
                        let n2 = new Date((nowTime * 1000)).getDate();
                        if(signInDate.getDate() == new Date().getDate()){
                            TheStorageManager.getInstance().setItem(StorageKey.CanSignIn,1);
                        }else{
                            TheStorageManager.getInstance().setItem(StorageKey.CanSignIn,0);
                        }
                    }else{
                        // 拉取三十天签到数据
                        this.getSignInData(nowTime);
                    }
                });
            }
        });

        HttpManager.post(AccessName.getBoss,"").then((data:any)=>{
            this.RotationOrder = data;
        });
    }

    getSignInData(nowTime:number){
        HttpManager.post(AccessName.getSignRecord,this.getUserInfoJsonString()).then((data:any)=>{
            if(data){
                // 标记累计奖励领取记录
                data.signGift.forEach((v,k)=>{
                    TheStorageManager.getInstance().setItem(StorageKey.DailySignInCumulativeDay + v.type,1);
                });
                // 标记签到记录
                data.signDetail.forEach((v,k)=>{
                    TheStorageManager.getInstance().setItem(StorageKey.DailySignInDay + new Date(v.signDateTS).getDate(),1);
                });

                if(data.signDetail.length > 0){
                    let lastSignTimeTS = data.signDetail[data.signDetail.length - 1].signDateTS;
                    if(new Date(nowTime).getDate() == new Date(lastSignTimeTS).getDate()){
                        TheStorageManager.getInstance().setItem(StorageKey.CanSignIn,1);
                    }else{
                        TheStorageManager.getInstance().setItem(StorageKey.CanSignIn,0);
                    }
                }else{
                    TheStorageManager.getInstance().setItem(StorageKey.CanSignIn,0);
                }
            }
        });
    }

    getHeroList(){
        let heroJsonData = TheStorageManager.getInstance().getJson(StorageKey.HeroList);
        if(heroJsonData){
            for(let i = 0;i<heroJsonData.length;i++){
                let heroInfo = new HeroObject();
                let info = heroJsonData[i];
                heroInfo.heroId=info.hero_type;
                heroInfo.heroLevel=info.hero_level;
                heroInfo.heroStage=info.hero_stage;
                heroInfo.heroWeaponStage=info.exclusive_equip_stage;
                heroInfo.weapons=info.wear1;
                heroInfo.armor=info.wear2;
                heroInfo.accessories=info.wear3;
                heroInfo.shoes=info.wear4;
                heroInfo.pet=info.pet_id;
                this.heroList.push(heroInfo);
            }
        }else{
            let heroInfo = new HeroObject();
            heroInfo.heroId=Hero_Type.ShouWang;
            heroInfo.heroLevel=1;
            heroInfo.heroStage=0;
            heroInfo.heroWeaponStage=0;
            heroInfo.weapons=0;
            heroInfo.armor=0;
            heroInfo.accessories=0;
            heroInfo.shoes=0;
            heroInfo.pet=0;
            this.heroList.push(heroInfo);

            heroInfo = new HeroObject();
            heroInfo.heroId=Hero_Type.PaoShou;
            heroInfo.heroLevel=1;
            heroInfo.heroStage=0;
            heroInfo.heroWeaponStage=0;
            heroInfo.weapons=0;
            heroInfo.armor=0;
            heroInfo.accessories=0;
            heroInfo.shoes=0;
            heroInfo.pet=0;
            this.heroList.push(heroInfo);

            heroInfo = new HeroObject();
            heroInfo.heroId=Hero_Type.DeLuYi;
            heroInfo.heroLevel=1;
            heroInfo.heroStage=0;
            heroInfo.heroWeaponStage=0;
            heroInfo.weapons=0;
            heroInfo.armor=0;
            heroInfo.accessories=0;
            heroInfo.shoes=0;
            heroInfo.pet=0;
            this.heroList.push(heroInfo);
        }
        HttpManager.post(AccessName.getHeroList,this.getUserInfoJsonString(),false).then((data:any)=>{
            if(data){
                this.heroList = [];
                if(data.length != 0){
                    data.forEach((v,k)=>{
                        let heroInfo = new HeroObject();
                        heroInfo.heroId=v.heroId;
                        heroInfo.heroLevel=v.heroLevel;
                        heroInfo.heroStage=v.heroStage;
                        heroInfo.heroWeaponStage=v.heroWeaponStage;
                        heroInfo.weapons=v.weapons;
                        heroInfo.armor=v.armor;
                        heroInfo.accessories=v.accessories;
                        heroInfo.shoes=v.shoes;
                        heroInfo.pet=v.pet;
                        this.heroList.push(heroInfo);
                    });
                }else{
                    let heroInfo = new HeroObject();
                    heroInfo.heroId=Hero_Type.ShouWang;
                    heroInfo.heroLevel=1;
                    heroInfo.heroStage=0;
                    heroInfo.heroWeaponStage=0;
                    heroInfo.weapons=0;
                    heroInfo.armor=0;
                    heroInfo.accessories=0;
                    heroInfo.shoes=0;
                    heroInfo.pet=0;
                    this.heroList.push(heroInfo);

                    heroInfo = new HeroObject();
                    heroInfo.heroId=Hero_Type.PaoShou;
                    heroInfo.heroLevel=1;
                    heroInfo.heroStage=0;
                    heroInfo.heroWeaponStage=0;
                    heroInfo.weapons=0;
                    heroInfo.armor=0;
                    heroInfo.accessories=0;
                    heroInfo.shoes=0;
                    heroInfo.pet=0;
                    this.heroList.push(heroInfo);

                    heroInfo = new HeroObject();
                    heroInfo.heroId=Hero_Type.DeLuYi;
                    heroInfo.heroLevel=1;
                    heroInfo.heroStage=0;
                    heroInfo.heroWeaponStage=0;
                    heroInfo.weapons=0;
                    heroInfo.armor=0;
                    heroInfo.accessories=0;
                    heroInfo.shoes=0;
                    heroInfo.pet=0;
                    this.heroList.push(heroInfo);
                }
            }
        }).catch((err)=>{
            console.log("网络请求出现问题，这里拿本地数据作为游戏依据");
        });
    }

    getStoreData(nowTime:number){
        HttpManager.post(AccessName.queryGameTask,this.getQueryGameTaskJsonString(10)).then((data:any)=>{
            if(data){
                let date = new Date(nowTime);
                data.forEach((v,k)=>{
                    // let d1 = new Date(v.createTime);
                    // console.log(d1.getDate(),date.getDate());
                    if(new Date(v.createTime).getDate() == date.getDate()){
                        TheStorageManager.getInstance().setItem(StorageKey.StoreDailyShopNum + v.playLevel,1);
                    }
                });
            }
        });
    }

    getVIPData(){
        HttpManager.post(AccessName.queryGameTask,this.getQueryGameTaskJsonString(1)).then((data:any)=>{
            if(data){
                data.forEach((v,k)=>{
                    TheStorageManager.getInstance().setItem(StorageKey.VipFreeRewardStatus+v.playLevel,1);
                });
            }
        });
        HttpManager.post(AccessName.queryGameTask,this.getQueryGameTaskJsonString(2)).then((data:any)=>{
            if(data){
                data.forEach((v,k)=>{
                    // TheStorageManager.getInstance().setItem(StorageKey.VipFreeRewardStatus+v.playLevel,1);
                    TheStorageManager.getInstance().setItem(StorageKey.VipAdvancedRewardStatus+v.playLevel,1)
                });
            }
        });
    }

    getTaskData(){
        HttpManager.gameTimePost(AccessName.getServerTime,this.getUserInfoJsonString()).then((data:any)=>{
            if(data.serverTime){
                let timeS = data.serverTime * 1000;
                let date = new Date(timeS);
                // 获取每日任务数据
                this.dailyTaskList = [];
                HttpManager.post(AccessName.queryGameAchievementTask,this.getTaskInfoJsonString(1)).then((data:any)=>{
                    if(data){
                        data.forEach((v,k)=>{
                            let createDate = new Date(v.createTime);
                            if(date.getDate() == createDate.getDate()){
                                let taskItem:TaskObject = new TaskObject();
                                taskItem.taskId = v.taskId;
                                taskItem.dimension = v.dimension;
                                taskItem.status = v.status;
                                taskItem.emit = v.emit;
                                // taskItem.stage = v.stage;
                                this.dailyTaskList.push(taskItem);
                            }
                        });
                        this.dailyTaskList.forEach((v,k)=>{
                            // 设置每日任务id
                            TheStorageManager.getInstance().setItem(StorageKey.TaskId + k,v.taskId);
                            // 设置每日任务状态
                            TheStorageManager.getInstance().setItem(StorageKey.TaskState + v.taskId,v.status);
                            // 设置每日任务数据
                            TheStorageManager.getInstance().setItem(StorageKey.TaskNum + v.taskId,v.emit);
                        });
                        //TODO 检查是否所有任务数据都加载完毕
                    }
                });

                // 获取成就任务数据
                this.achievementTaskList = [];
                HttpManager.post(AccessName.queryGameAchievementTask,this.getTaskInfoJsonString(2)).then((data:any)=>{
                    if(data){
                        data.forEach((v,k)=>{
                            let taskItem:TaskObject = new TaskObject();
                            // taskItem.taskId = v.taskId;
                            // taskItem.dimension = v.dimension;
                            taskItem.status = v.status;
                            taskItem.emit = v.emit;
                            taskItem.stage = v.stage;
                            taskItem.taskType = v.taskType;
                            this.achievementTaskList.push(taskItem);
                        });
                        // 是新建成就任务的数据
                        if(this.achievementTaskList.length == 0){
                            for(let i = 1;i < 15;i++){
                                let taskItem:TaskObject = new TaskObject();
                                // taskItem.uid = UserData.getInstance().getUserID();
                                taskItem.dimension = 2;
                                taskItem.taskType = i;
                                taskItem.taskId = i*100000+1;
                                taskItem.status = 0;
                                taskItem.stage = 0;
                                taskItem.emit = 0;
                                this.achievementTaskList.push(taskItem);
                                HttpManager.post(AccessName.saveGameAchievementTask,this.getSaveGameAchievementTaskJson(taskItem));
                            }
                        }
                        // 这里是用任务的类型和阶段算出任务id
                        this.achievementTaskList.forEach((v,k)=>{
                            TheStorageManager.getInstance().setItem(StorageKey.TaskAchievementIndex + v.taskType,v.stage);
                            TheStorageManager.getInstance().setItem(StorageKey.TaskAchievementNum + v.taskType,v.emit);
                            TheStorageManager.getInstance().setItem(StorageKey.TaskState + (v.taskType * 100000 + v.stage + 1),v.status);
                        });

                    }
                });
                // 获取主线任务数据
                this.mainTaskList = [];
                HttpManager.post(AccessName.queryGameAchievementTask,this.getTaskInfoJsonString(3)).then((data:any)=>{
                    if(data){
                        data.forEach((v,k)=>{
                            let taskItem:TaskObject = new TaskObject();
                            // taskItem.taskId = v.taskId;
                            // taskItem.dimension = v.dimension;
                            taskItem.status = v.status;
                            taskItem.emit = v.emit;
                            taskItem.progress = v.progress;
                            taskItem.stage = v.stage;
                            taskItem.taskType = v.taskType;
                            this.mainTaskList.push(taskItem);
                        });
                        // 新建主线任务的数据
                        if(this.mainTaskList.length == 0){
                            for(let i = 1;i < 19;i++){
                                let taskItem:TaskObject = new TaskObject();
                                // taskItem.uid = UserData.getInstance().getUserID();
                                taskItem.dimension = 3;
                                taskItem.taskType = i;
                                taskItem.taskId = i*100000+1;
                                taskItem.status = 0;
                                taskItem.stage = 0;
                                taskItem.emit = 0;
                                taskItem.progress = 0;
                                this.mainTaskList.push(taskItem);
                                HttpManager.post(AccessName.saveGameAchievementTask,this.getSaveGameAchievementTaskJson(taskItem));
                            }
                        }
                        // 这里是用任务的类型和阶段算出任务id
                        this.mainTaskList.forEach((v,k)=>{
                            TheStorageManager.getInstance().setItem(StorageKey.TaskMainIndex + v.taskType,v.stage);
                            TheStorageManager.getInstance().setItem(StorageKey.TaskMainNum + v.taskType,v.emit);
                            TheStorageManager.getInstance().setItem(StorageKey.TaskState + (v.taskType * 10000000 + v.stage + 1),v.status);
                            //TheStorageManager.getInstance().setItem(StorageKey.TaskMainShowIndex,v.progress);
                        });

                    }
                });

                // 任务日活跃奖励领取
                HttpManager.post(AccessName.queryGameTask,this.getQueryGameTaskJsonString(4)).then((data:any)=>{
                    if(data){
                        data.forEach((v,k)=>{
                            let createDate = new Date(v.createTime);
                            if(date.getDate() == createDate.getDate()){
                                // 代表是今天内的数据
                                TheStorageManager.getInstance().setItem(StorageKey.TaskDailyActivityState + v.playLevel,1);
                            }
                        });
                    }
                }); 
                // 任务周活跃领取
                HttpManager.post(AccessName.queryGameTask,this.getQueryGameTaskJsonString(5)).then((data:any)=>{
                    if(data){
                        // let date = new Date(timeS);
                        data.forEach((v,k)=>{
                            let createDate = new Date(v.createTime);
                            if(this.getYearWeek(date) == this.getYearWeek(createDate)){
                                // 代表是本周内的数据
                                TheStorageManager.getInstance().setItem(StorageKey.TaskWeeklyActivityState + v.playLevel,1);
                            }
                        });
                    }
                });
                // 任务日活跃数
                HttpManager.post(AccessName.queryGameTask,this.getQueryGameTaskJsonString(8)).then((data:any)=>{
                    if(data){
                        data.forEach((v,k)=>{
                            // let date = new Date(timeS);
                            let createDate = new Date(v.createTime);
                            if(date.getDate() == createDate.getDate()){
                                // 代表是今天内的数据
                                TheStorageManager.getInstance().setItem(StorageKey.TaskDailyActivityNum,v.playLevel);
                            }
                        });
                    }
                });
                // 任务周活跃数
                HttpManager.post(AccessName.queryGameTask,this.getQueryGameTaskJsonString(9)).then((data:any)=>{
                    if(data){
                        // let date = new Date(timeS);
                        data.forEach((v,k)=>{
                            let createDate = new Date(v.createTime);
                            if(this.getYearWeek(date) == this.getYearWeek(createDate)){
                                // 代表是本周内的数据
                                TheStorageManager.getInstance().setItem(StorageKey.TaskWeekActivityNum,v.playLevel);
                            }
                        });
                    }
                });
            }
        });

    }

    // private getStoreInfoJsonString(type:number):string{
    //     let uid=UserData.getInstance().getUserID();
    //     return JSON.stringify({
    //         uid:uid,
    //         rewardType:type,
    //     }); 
    // }

    private getUserInfoJsonString():string{
        let uid=UserData.getInstance().getUserID();
        return JSON.stringify({
            uid:uid,
        });
    }
    /**
     * 
     * @param type 任务类型，1-每日任务 2-成就任务 3-主线任务
     * @returns 
     */
    private getTaskInfoJsonString(type:number):string{
        let uid=UserData.getInstance().getUserID();
        return JSON.stringify({
            uid:uid,
            dimension:type,
        });
    }

    /**
     * 
     * @param type 4-日活跃度奖励,5-周活跃度奖励,8-任务日活跃度，9-任务周活跃度
     * @returns 
     */
    private getQueryGameTaskJsonString( type: number): string {
        let uid = UserData.getInstance().getUserID();
        return JSON.stringify({
            uid: uid,
            rewardType: type,
        });
    }

    getYearWeek(endDate:Date){
        let beginDate = new Date(endDate.getFullYear(),0,1);
        let endWeek = endDate.getDay();
        if(endWeek == 0)endWeek = 7;
        let beginWeek = beginDate.getDay();
        if(beginWeek == 0)beginWeek =7;
        let millisDiff = endDate.getTime() - beginDate.getTime();
        let dayDiff = Math.floor((millisDiff + (beginWeek - endWeek)*(24*60*60*1000))/86400000);
        return Math.ceil(dayDiff/7) + 1;
    }

    /**
     * 
     * @param type 4-日活跃度奖励,5-周活跃度奖励,8-任务日活跃度，9-任务周活跃度
     * @returns 
     */
     getSaveGameTaskJsonString(value:number,type: number): string {
        let uid = UserData.getInstance().getUserID();
        let num = value;
        return JSON.stringify({
            uid: uid,
            playLevel:num,
            rewardType: type,
        });
    }

    /**获取成就任务上报参数 */
    getSaveGameAchievementTaskJson(taskItem:TaskObject):string{
        let uid = UserData.getInstance().getUserID();
        return JSON.stringify({
            uid:uid,
            dimension:taskItem.dimension,
            taskType:taskItem.taskType,
            taskId:taskItem.taskId,
            progress:taskItem.progress,
            status:taskItem.status,
            stage:taskItem.stage,
            emit:taskItem.emit,
        })
    }

    getNowDay():string{
        let s = "";
        let date = new Date();
        s += date.getFullYear();
        if(date.getMonth() + 1 < 10){
            s += "-0" + (date.getMonth() + 1);
        }else{
            s += "-" + (date.getMonth() + 1);
        }
        if(date.getDate() < 10){
            s += "-0" + date.getDate();
        }else{
            s += "-" + date.getDate();
        }
        return s;
    }
}