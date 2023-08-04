
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/UserInfo/UserInfo.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '21ab1a/HWBE8qodJKVDdmMD', 'UserInfo');
// Scripts/UserInfo/UserInfo.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInfo = void 0;
var HttpManager_1 = require(".././NetWork/HttpManager");
var HeroConfig_1 = require("../Hero/Game/HeroConfig");
var StorageConfig_1 = require("../Storage/StorageConfig");
var StorageManager_1 = require("../Storage/StorageManager");
var UserData_1 = require("../UserData");
var UserInfo = /** @class */ (function () {
    function UserInfo() {
        //连续签到天数 新手7天签到
        this.signInDays = 0;
        // 是否领取七日礼包
        this.isSignGift = 0;
        // 最后一次签到时间 新手7天签到
        this.lastSignTime = 0;
        // 最后一次签到时间时间戳 毫秒级时间戳
        this.lastSignTimeTS = 0;
        // 付费宝石数量
        this.payGem = 0;
        // 波数
        this.waveNumber = 0;
        // 伤害数
        this.damageNumber = 0;
        // Boss轮换顺序
        this.RotationOrder = 1;
        this.heroList = [];
        this.dailyTaskList = [];
        this.achievementTaskList = [];
        this.mainTaskList = [];
        // Boss挑战每周奖励领取状态   是否能领取   0>未领取   -1已领取
        this.damageNumberLast = -1;
    }
    UserInfo.getInstance = function () {
        if (this._instance == null) {
            this._instance = new UserInfo();
            this._instance.init();
        }
        return this._instance;
    };
    UserInfo.prototype.init = function () {
        this.refreshData();
        this.getHeroList();
        this.getVIPData();
        this.getTaskData();
    };
    UserInfo.prototype.refreshData = function () {
        var _this = this;
        HttpManager_1.HttpManager.gameTimePost(HttpManager_1.AccessName.getServerTime, this.getUserInfoJsonString()).then(function (data) {
            if (data.serverTime) {
                var nowTime_1 = data.serverTime;
                _this.getStoreData(nowTime_1 * 1000);
                HttpManager_1.HttpManager.post(HttpManager_1.AccessName.userInfo, _this.getUserInfoJsonString()).then(function (data) {
                    _this.signInDays = data.signDays;
                    _this.isSignGift = data.isSignGift;
                    _this.lastSignTime = data.lastSignTime;
                    //this.lastSignTimeTS = data.lastSignTimeTS;
                    _this.lastSignTimeTS = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.NewPlayerSavenDaySignInTime, 0);
                    _this.payGem = data.payGem;
                    _this.waveNumber = data.waveNumber;
                    _this.damageNumber = data.damageNumber;
                    _this.damageNumberLast = data.damageNumberLast;
                    StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.NewPlayerSavenDaySignInNum, _this.signInDays);
                    StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.NewPlayerSavenDaySignInOver, _this.isSignGift);
                    if (_this.isSignGift == 0) {
                        //let signInDate = new Date(this.lastSignTimeTS * 1000);
                        var signInDate = new Date(_this.lastSignTimeTS);
                        var n1 = signInDate.getDate();
                        var n2 = new Date((nowTime_1 * 1000)).getDate();
                        if (signInDate.getDate() == new Date().getDate()) {
                            StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.CanSignIn, 1);
                        }
                        else {
                            StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.CanSignIn, 0);
                        }
                    }
                    else {
                        // 拉取三十天签到数据
                        _this.getSignInData(nowTime_1);
                    }
                });
            }
        });
        HttpManager_1.HttpManager.post(HttpManager_1.AccessName.getBoss, "").then(function (data) {
            _this.RotationOrder = data;
        });
    };
    UserInfo.prototype.getSignInData = function (nowTime) {
        HttpManager_1.HttpManager.post(HttpManager_1.AccessName.getSignRecord, this.getUserInfoJsonString()).then(function (data) {
            if (data) {
                // 标记累计奖励领取记录
                data.signGift.forEach(function (v, k) {
                    StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.DailySignInCumulativeDay + v.type, 1);
                });
                // 标记签到记录
                data.signDetail.forEach(function (v, k) {
                    StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.DailySignInDay + new Date(v.signDateTS).getDate(), 1);
                });
                if (data.signDetail.length > 0) {
                    var lastSignTimeTS = data.signDetail[data.signDetail.length - 1].signDateTS;
                    if (new Date(nowTime).getDate() == new Date(lastSignTimeTS).getDate()) {
                        StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.CanSignIn, 1);
                    }
                    else {
                        StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.CanSignIn, 0);
                    }
                }
                else {
                    StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.CanSignIn, 0);
                }
            }
        });
    };
    UserInfo.prototype.getHeroList = function () {
        var _this = this;
        var heroJsonData = StorageManager_1.TheStorageManager.getInstance().getJson(StorageConfig_1.StorageKey.HeroList);
        if (heroJsonData) {
            for (var i = 0; i < heroJsonData.length; i++) {
                var heroInfo = new HttpManager_1.HeroObject();
                var info = heroJsonData[i];
                heroInfo.heroId = info.hero_type;
                heroInfo.heroLevel = info.hero_level;
                heroInfo.heroStage = info.hero_stage;
                heroInfo.heroWeaponStage = info.exclusive_equip_stage;
                heroInfo.weapons = info.wear1;
                heroInfo.armor = info.wear2;
                heroInfo.accessories = info.wear3;
                heroInfo.shoes = info.wear4;
                heroInfo.pet = info.pet_id;
                this.heroList.push(heroInfo);
            }
        }
        else {
            var heroInfo = new HttpManager_1.HeroObject();
            heroInfo.heroId = HeroConfig_1.Hero_Type.ShouWang;
            heroInfo.heroLevel = 1;
            heroInfo.heroStage = 0;
            heroInfo.heroWeaponStage = 0;
            heroInfo.weapons = 0;
            heroInfo.armor = 0;
            heroInfo.accessories = 0;
            heroInfo.shoes = 0;
            heroInfo.pet = 0;
            this.heroList.push(heroInfo);
            heroInfo = new HttpManager_1.HeroObject();
            heroInfo.heroId = HeroConfig_1.Hero_Type.PaoShou;
            heroInfo.heroLevel = 1;
            heroInfo.heroStage = 0;
            heroInfo.heroWeaponStage = 0;
            heroInfo.weapons = 0;
            heroInfo.armor = 0;
            heroInfo.accessories = 0;
            heroInfo.shoes = 0;
            heroInfo.pet = 0;
            this.heroList.push(heroInfo);
            heroInfo = new HttpManager_1.HeroObject();
            heroInfo.heroId = HeroConfig_1.Hero_Type.DeLuYi;
            heroInfo.heroLevel = 1;
            heroInfo.heroStage = 0;
            heroInfo.heroWeaponStage = 0;
            heroInfo.weapons = 0;
            heroInfo.armor = 0;
            heroInfo.accessories = 0;
            heroInfo.shoes = 0;
            heroInfo.pet = 0;
            this.heroList.push(heroInfo);
        }
        HttpManager_1.HttpManager.post(HttpManager_1.AccessName.getHeroList, this.getUserInfoJsonString(), false).then(function (data) {
            if (data) {
                _this.heroList = [];
                if (data.length != 0) {
                    data.forEach(function (v, k) {
                        var heroInfo = new HttpManager_1.HeroObject();
                        heroInfo.heroId = v.heroId;
                        heroInfo.heroLevel = v.heroLevel;
                        heroInfo.heroStage = v.heroStage;
                        heroInfo.heroWeaponStage = v.heroWeaponStage;
                        heroInfo.weapons = v.weapons;
                        heroInfo.armor = v.armor;
                        heroInfo.accessories = v.accessories;
                        heroInfo.shoes = v.shoes;
                        heroInfo.pet = v.pet;
                        _this.heroList.push(heroInfo);
                    });
                }
                else {
                    var heroInfo = new HttpManager_1.HeroObject();
                    heroInfo.heroId = HeroConfig_1.Hero_Type.ShouWang;
                    heroInfo.heroLevel = 1;
                    heroInfo.heroStage = 0;
                    heroInfo.heroWeaponStage = 0;
                    heroInfo.weapons = 0;
                    heroInfo.armor = 0;
                    heroInfo.accessories = 0;
                    heroInfo.shoes = 0;
                    heroInfo.pet = 0;
                    _this.heroList.push(heroInfo);
                    heroInfo = new HttpManager_1.HeroObject();
                    heroInfo.heroId = HeroConfig_1.Hero_Type.PaoShou;
                    heroInfo.heroLevel = 1;
                    heroInfo.heroStage = 0;
                    heroInfo.heroWeaponStage = 0;
                    heroInfo.weapons = 0;
                    heroInfo.armor = 0;
                    heroInfo.accessories = 0;
                    heroInfo.shoes = 0;
                    heroInfo.pet = 0;
                    _this.heroList.push(heroInfo);
                    heroInfo = new HttpManager_1.HeroObject();
                    heroInfo.heroId = HeroConfig_1.Hero_Type.DeLuYi;
                    heroInfo.heroLevel = 1;
                    heroInfo.heroStage = 0;
                    heroInfo.heroWeaponStage = 0;
                    heroInfo.weapons = 0;
                    heroInfo.armor = 0;
                    heroInfo.accessories = 0;
                    heroInfo.shoes = 0;
                    heroInfo.pet = 0;
                    _this.heroList.push(heroInfo);
                }
            }
        }).catch(function (err) {
            console.log("网络请求出现问题，这里拿本地数据作为游戏依据");
        });
    };
    UserInfo.prototype.getStoreData = function (nowTime) {
        HttpManager_1.HttpManager.post(HttpManager_1.AccessName.queryGameTask, this.getQueryGameTaskJsonString(10)).then(function (data) {
            if (data) {
                var date_1 = new Date(nowTime);
                data.forEach(function (v, k) {
                    // let d1 = new Date(v.createTime);
                    // console.log(d1.getDate(),date.getDate());
                    if (new Date(v.createTime).getDate() == date_1.getDate()) {
                        StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.StoreDailyShopNum + v.playLevel, 1);
                    }
                });
            }
        });
    };
    UserInfo.prototype.getVIPData = function () {
        HttpManager_1.HttpManager.post(HttpManager_1.AccessName.queryGameTask, this.getQueryGameTaskJsonString(1)).then(function (data) {
            if (data) {
                data.forEach(function (v, k) {
                    StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.VipFreeRewardStatus + v.playLevel, 1);
                });
            }
        });
        HttpManager_1.HttpManager.post(HttpManager_1.AccessName.queryGameTask, this.getQueryGameTaskJsonString(2)).then(function (data) {
            if (data) {
                data.forEach(function (v, k) {
                    // TheStorageManager.getInstance().setItem(StorageKey.VipFreeRewardStatus+v.playLevel,1);
                    StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.VipAdvancedRewardStatus + v.playLevel, 1);
                });
            }
        });
    };
    UserInfo.prototype.getTaskData = function () {
        var _this = this;
        HttpManager_1.HttpManager.gameTimePost(HttpManager_1.AccessName.getServerTime, this.getUserInfoJsonString()).then(function (data) {
            if (data.serverTime) {
                var timeS = data.serverTime * 1000;
                var date_2 = new Date(timeS);
                // 获取每日任务数据
                _this.dailyTaskList = [];
                HttpManager_1.HttpManager.post(HttpManager_1.AccessName.queryGameAchievementTask, _this.getTaskInfoJsonString(1)).then(function (data) {
                    if (data) {
                        data.forEach(function (v, k) {
                            var createDate = new Date(v.createTime);
                            if (date_2.getDate() == createDate.getDate()) {
                                var taskItem = new HttpManager_1.TaskObject();
                                taskItem.taskId = v.taskId;
                                taskItem.dimension = v.dimension;
                                taskItem.status = v.status;
                                taskItem.emit = v.emit;
                                // taskItem.stage = v.stage;
                                _this.dailyTaskList.push(taskItem);
                            }
                        });
                        _this.dailyTaskList.forEach(function (v, k) {
                            // 设置每日任务id
                            StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TaskId + k, v.taskId);
                            // 设置每日任务状态
                            StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TaskState + v.taskId, v.status);
                            // 设置每日任务数据
                            StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TaskNum + v.taskId, v.emit);
                        });
                        //TODO 检查是否所有任务数据都加载完毕
                    }
                });
                // 获取成就任务数据
                _this.achievementTaskList = [];
                HttpManager_1.HttpManager.post(HttpManager_1.AccessName.queryGameAchievementTask, _this.getTaskInfoJsonString(2)).then(function (data) {
                    if (data) {
                        data.forEach(function (v, k) {
                            var taskItem = new HttpManager_1.TaskObject();
                            // taskItem.taskId = v.taskId;
                            // taskItem.dimension = v.dimension;
                            taskItem.status = v.status;
                            taskItem.emit = v.emit;
                            taskItem.stage = v.stage;
                            taskItem.taskType = v.taskType;
                            _this.achievementTaskList.push(taskItem);
                        });
                        // 是新建成就任务的数据
                        if (_this.achievementTaskList.length == 0) {
                            for (var i = 1; i < 15; i++) {
                                var taskItem = new HttpManager_1.TaskObject();
                                // taskItem.uid = UserData.getInstance().getUserID();
                                taskItem.dimension = 2;
                                taskItem.taskType = i;
                                taskItem.taskId = i * 100000 + 1;
                                taskItem.status = 0;
                                taskItem.stage = 0;
                                taskItem.emit = 0;
                                _this.achievementTaskList.push(taskItem);
                                HttpManager_1.HttpManager.post(HttpManager_1.AccessName.saveGameAchievementTask, _this.getSaveGameAchievementTaskJson(taskItem));
                            }
                        }
                        // 这里是用任务的类型和阶段算出任务id
                        _this.achievementTaskList.forEach(function (v, k) {
                            StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TaskAchievementIndex + v.taskType, v.stage);
                            StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TaskAchievementNum + v.taskType, v.emit);
                            StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TaskState + (v.taskType * 100000 + v.stage + 1), v.status);
                        });
                    }
                });
                // 获取主线任务数据
                _this.mainTaskList = [];
                HttpManager_1.HttpManager.post(HttpManager_1.AccessName.queryGameAchievementTask, _this.getTaskInfoJsonString(3)).then(function (data) {
                    if (data) {
                        data.forEach(function (v, k) {
                            var taskItem = new HttpManager_1.TaskObject();
                            // taskItem.taskId = v.taskId;
                            // taskItem.dimension = v.dimension;
                            taskItem.status = v.status;
                            taskItem.emit = v.emit;
                            taskItem.progress = v.progress;
                            taskItem.stage = v.stage;
                            taskItem.taskType = v.taskType;
                            _this.mainTaskList.push(taskItem);
                        });
                        // 新建主线任务的数据
                        if (_this.mainTaskList.length == 0) {
                            for (var i = 1; i < 19; i++) {
                                var taskItem = new HttpManager_1.TaskObject();
                                // taskItem.uid = UserData.getInstance().getUserID();
                                taskItem.dimension = 3;
                                taskItem.taskType = i;
                                taskItem.taskId = i * 100000 + 1;
                                taskItem.status = 0;
                                taskItem.stage = 0;
                                taskItem.emit = 0;
                                taskItem.progress = 0;
                                _this.mainTaskList.push(taskItem);
                                HttpManager_1.HttpManager.post(HttpManager_1.AccessName.saveGameAchievementTask, _this.getSaveGameAchievementTaskJson(taskItem));
                            }
                        }
                        // 这里是用任务的类型和阶段算出任务id
                        _this.mainTaskList.forEach(function (v, k) {
                            StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TaskMainIndex + v.taskType, v.stage);
                            StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TaskMainNum + v.taskType, v.emit);
                            StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TaskState + (v.taskType * 10000000 + v.stage + 1), v.status);
                            //TheStorageManager.getInstance().setItem(StorageKey.TaskMainShowIndex,v.progress);
                        });
                    }
                });
                // 任务日活跃奖励领取
                HttpManager_1.HttpManager.post(HttpManager_1.AccessName.queryGameTask, _this.getQueryGameTaskJsonString(4)).then(function (data) {
                    if (data) {
                        data.forEach(function (v, k) {
                            var createDate = new Date(v.createTime);
                            if (date_2.getDate() == createDate.getDate()) {
                                // 代表是今天内的数据
                                StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TaskDailyActivityState + v.playLevel, 1);
                            }
                        });
                    }
                });
                // 任务周活跃领取
                HttpManager_1.HttpManager.post(HttpManager_1.AccessName.queryGameTask, _this.getQueryGameTaskJsonString(5)).then(function (data) {
                    if (data) {
                        // let date = new Date(timeS);
                        data.forEach(function (v, k) {
                            var createDate = new Date(v.createTime);
                            if (_this.getYearWeek(date_2) == _this.getYearWeek(createDate)) {
                                // 代表是本周内的数据
                                StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TaskWeeklyActivityState + v.playLevel, 1);
                            }
                        });
                    }
                });
                // 任务日活跃数
                HttpManager_1.HttpManager.post(HttpManager_1.AccessName.queryGameTask, _this.getQueryGameTaskJsonString(8)).then(function (data) {
                    if (data) {
                        data.forEach(function (v, k) {
                            // let date = new Date(timeS);
                            var createDate = new Date(v.createTime);
                            if (date_2.getDate() == createDate.getDate()) {
                                // 代表是今天内的数据
                                StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TaskDailyActivityNum, v.playLevel);
                            }
                        });
                    }
                });
                // 任务周活跃数
                HttpManager_1.HttpManager.post(HttpManager_1.AccessName.queryGameTask, _this.getQueryGameTaskJsonString(9)).then(function (data) {
                    if (data) {
                        // let date = new Date(timeS);
                        data.forEach(function (v, k) {
                            var createDate = new Date(v.createTime);
                            if (_this.getYearWeek(date_2) == _this.getYearWeek(createDate)) {
                                // 代表是本周内的数据
                                StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TaskWeekActivityNum, v.playLevel);
                            }
                        });
                    }
                });
            }
        });
    };
    // private getStoreInfoJsonString(type:number):string{
    //     let uid=UserData.getInstance().getUserID();
    //     return JSON.stringify({
    //         uid:uid,
    //         rewardType:type,
    //     }); 
    // }
    UserInfo.prototype.getUserInfoJsonString = function () {
        var uid = UserData_1.default.getInstance().getUserID();
        return JSON.stringify({
            uid: uid,
        });
    };
    /**
     *
     * @param type 任务类型，1-每日任务 2-成就任务 3-主线任务
     * @returns
     */
    UserInfo.prototype.getTaskInfoJsonString = function (type) {
        var uid = UserData_1.default.getInstance().getUserID();
        return JSON.stringify({
            uid: uid,
            dimension: type,
        });
    };
    /**
     *
     * @param type 4-日活跃度奖励,5-周活跃度奖励,8-任务日活跃度，9-任务周活跃度
     * @returns
     */
    UserInfo.prototype.getQueryGameTaskJsonString = function (type) {
        var uid = UserData_1.default.getInstance().getUserID();
        return JSON.stringify({
            uid: uid,
            rewardType: type,
        });
    };
    UserInfo.prototype.getYearWeek = function (endDate) {
        var beginDate = new Date(endDate.getFullYear(), 0, 1);
        var endWeek = endDate.getDay();
        if (endWeek == 0)
            endWeek = 7;
        var beginWeek = beginDate.getDay();
        if (beginWeek == 0)
            beginWeek = 7;
        var millisDiff = endDate.getTime() - beginDate.getTime();
        var dayDiff = Math.floor((millisDiff + (beginWeek - endWeek) * (24 * 60 * 60 * 1000)) / 86400000);
        return Math.ceil(dayDiff / 7) + 1;
    };
    /**
     *
     * @param type 4-日活跃度奖励,5-周活跃度奖励,8-任务日活跃度，9-任务周活跃度
     * @returns
     */
    UserInfo.prototype.getSaveGameTaskJsonString = function (value, type) {
        var uid = UserData_1.default.getInstance().getUserID();
        var num = value;
        return JSON.stringify({
            uid: uid,
            playLevel: num,
            rewardType: type,
        });
    };
    /**获取成就任务上报参数 */
    UserInfo.prototype.getSaveGameAchievementTaskJson = function (taskItem) {
        var uid = UserData_1.default.getInstance().getUserID();
        return JSON.stringify({
            uid: uid,
            dimension: taskItem.dimension,
            taskType: taskItem.taskType,
            taskId: taskItem.taskId,
            progress: taskItem.progress,
            status: taskItem.status,
            stage: taskItem.stage,
            emit: taskItem.emit,
        });
    };
    UserInfo.prototype.getNowDay = function () {
        var s = "";
        var date = new Date();
        s += date.getFullYear();
        if (date.getMonth() + 1 < 10) {
            s += "-0" + (date.getMonth() + 1);
        }
        else {
            s += "-" + (date.getMonth() + 1);
        }
        if (date.getDate() < 10) {
            s += "-0" + date.getDate();
        }
        else {
            s += "-" + date.getDate();
        }
        return s;
    };
    UserInfo._instance = null;
    return UserInfo;
}());
exports.UserInfo = UserInfo;

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVXNlckluZm9cXFVzZXJJbmZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHdEQUEyRjtBQUMzRixzREFBb0Q7QUFDcEQsMERBQXNEO0FBQ3RELDREQUE4RDtBQUM5RCx3Q0FBbUM7QUFFbkM7SUFBQTtRQUVJLGVBQWU7UUFDZixlQUFVLEdBQVUsQ0FBQyxDQUFDO1FBQ3RCLFdBQVc7UUFDWCxlQUFVLEdBQVUsQ0FBQyxDQUFDO1FBQ3RCLGtCQUFrQjtRQUNsQixpQkFBWSxHQUFVLENBQUMsQ0FBQztRQUN4QixxQkFBcUI7UUFDckIsbUJBQWMsR0FBVSxDQUFDLENBQUM7UUFDMUIsU0FBUztRQUNULFdBQU0sR0FBVSxDQUFDLENBQUE7UUFDakIsS0FBSztRQUNMLGVBQVUsR0FBVSxDQUFDLENBQUE7UUFFckIsTUFBTTtRQUNOLGlCQUFZLEdBQVUsQ0FBQyxDQUFBO1FBRXZCLFdBQVc7UUFDWCxrQkFBYSxHQUFVLENBQUMsQ0FBQTtRQUV4QixhQUFRLEdBQWdCLEVBQUUsQ0FBQztRQUUzQixrQkFBYSxHQUFnQixFQUFFLENBQUM7UUFFaEMsd0JBQW1CLEdBQWdCLEVBQUUsQ0FBQztRQUV0QyxpQkFBWSxHQUFnQixFQUFFLENBQUM7UUFFL0IseUNBQXlDO1FBQ3pDLHFCQUFnQixHQUFVLENBQUMsQ0FBQyxDQUFBO0lBa2ZoQyxDQUFDO0lBL2VpQixvQkFBVyxHQUF6QjtRQUNJLElBQUcsSUFBSSxDQUFDLFNBQVMsSUFBRSxJQUFJLEVBQUU7WUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBQyxJQUFJLFFBQVEsRUFBRSxDQUFDO1lBQzlCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDekI7UUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUVELHVCQUFJLEdBQUo7UUFDSSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsSUFBSSxD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LENBQUMsTUFBTTtZQUN0QixRQUFRLEVBQUMsUUFBUSxDQUFDLFFBQVE7WUFDMUIsTUFBTSxFQUFDLFFBQVEsQ0FBQyxNQUFNO1lBQ3RCLEtBQUssRUFBQyxRQUFRLENBQUMsS0FBSztZQUNwQixJQUFJLEVBQUMsUUFBUSxDQUFDLElBQUk7U0FDckIsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVELDRCQUFTLEdBQVQ7UUFDSSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDWCxJQUFJLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ3RCLENBQUMsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDeEIsSUFBRyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsRUFBQztZQUN4QixDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ3JDO2FBQUk7WUFDRCxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ3BDO1FBQ0QsSUFBRyxJQUFJLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxFQUFDO1lBQ25CLENBQUMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQzlCO2FBQUk7WUFDRCxDQUFDLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUM3QjtRQUNELE9BQU8sQ0FBQyxDQUFDO0lBQ2IsQ0FBQztJQWhmYyxrQkFBUyxHQUFhLElBQUksQ0FBQztJQWlmOUMsZUFBQztDQWhoQkQsQUFnaEJDLElBQUE7QUFoaEJZLDRCQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWNjZXNzTmFtZSwgSGVyb09iamVjdCwgSHR0cE1hbmFnZXIsIFRhc2tPYmplY3QgfSBmcm9tIFwiLi4vLi9OZXRXb3JrL0h0dHBNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEhlcm9fVHlwZSB9IGZyb20gXCIuLi9IZXJvL0dhbWUvSGVyb0NvbmZpZ1wiO1xyXG5pbXBvcnQgeyBTdG9yYWdlS2V5IH0gZnJvbSBcIi4uL1N0b3JhZ2UvU3RvcmFnZUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBUaGVTdG9yYWdlTWFuYWdlciB9IGZyb20gXCIuLi9TdG9yYWdlL1N0b3JhZ2VNYW5hZ2VyXCI7XHJcbmltcG9ydCBVc2VyRGF0YSBmcm9tIFwiLi4vVXNlckRhdGFcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBVc2VySW5mb3tcclxuXHJcbiAgICAvL+i/nue7reetvuWIsOWkqeaVsCDmlrDmiYs35aSp562+5YiwXHJcbiAgICBzaWduSW5EYXlzOm51bWJlciA9IDA7XHJcbiAgICAvLyDmmK/lkKbpooblj5bkuIPml6XnpLzljIVcclxuICAgIGlzU2lnbkdpZnQ6bnVtYmVyID0gMDtcclxuICAgIC8vIOacgOWQjuS4gOasoeetvuWIsOaXtumXtCDmlrDmiYs35aSp562+5YiwXHJcbiAgICBsYXN0U2lnblRpbWU6bnVtYmVyID0gMDtcclxuICAgIC8vIOacgOWQjuS4gOasoeetvuWIsOaXtumXtOaXtumXtOaIsyDmr6vnp5Lnuqfml7bpl7TmiLNcclxuICAgIGxhc3RTaWduVGltZVRTOm51bWJlciA9IDA7XHJcbiAgICAvLyDku5jotLnlrp3nn7PmlbDph49cclxuICAgIHBheUdlbTpudW1iZXIgPSAwXHJcbiAgICAvLyDms6LmlbBcclxuICAgIHdhdmVOdW1iZXI6bnVtYmVyID0gMFxyXG5cclxuICAgIC8vIOS8pOWus+aVsFxyXG4gICAgZGFtYWdlTnVtYmVyOm51bWJlciA9IDBcclxuXHJcbiAgICAvLyBCb3Nz6L2u5o2i6aG65bqPXHJcbiAgICBSb3RhdGlvbk9yZGVyOm51bWJlciA9IDFcclxuXHJcbiAgICBoZXJvTGlzdDpIZXJvT2JqZWN0W10gPSBbXTtcclxuXHJcbiAgICBkYWlseVRhc2tMaXN0OlRhc2tPYmplY3RbXSA9IFtdO1xyXG5cclxuICAgIGFjaGlldmVtZW50VGFza0xpc3Q6VGFza09iamVjdFtdID0gW107XHJcblxyXG4gICAgbWFpblRhc2tMaXN0OlRhc2tPYmplY3RbXSA9IFtdO1xyXG5cclxuICAgIC8vIEJvc3PmjJHmiJjmr4/lkajlpZblirHpooblj5bnirbmgIEgICDmmK/lkKbog73pooblj5YgICAwPuacqumihuWPliAgIC0x5bey6aKG5Y+WXHJcbiAgICBkYW1hZ2VOdW1iZXJMYXN0Om51bWJlciA9IC0xXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IFVzZXJJbmZvID0gbnVsbDtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6VXNlckluZm8ge1xyXG4gICAgICAgIGlmKHRoaXMuX2luc3RhbmNlPT1udWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlPW5ldyBVc2VySW5mbygpO1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZS5pbml0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0KCl7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoRGF0YSgpO1xyXG4gICAgICAgIHRoaXMuZ2V0SGVyb0xpc3QoKTtcclxuICAgICAgICB0aGlzLmdldFZJUERhdGEoKTtcclxuICAgICAgICB0aGlzLmdldFRhc2tEYXRhKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVmcmVzaERhdGEoKXtcclxuICAgICAgICBIdHRwTWFuYWdlci5nYW1lVGltZVBvc3QoQWNjZXNzTmFtZS5nZXRTZXJ2ZXJUaW1lLHRoaXMuZ2V0VXNlckluZm9Kc29uU3RyaW5nKCkpLnRoZW4oKGRhdGE6YW55KT0+e1xyXG4gICAgICAgICAgICBpZihkYXRhLnNlcnZlclRpbWUpe1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vd1RpbWUgPSBkYXRhLnNlcnZlclRpbWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldFN0b3JlRGF0YShub3dUaW1lICogMTAwMCk7XHJcbiAgICAgICAgICAgICAgICBIdHRwTWFuYWdlci5wb3N0KEFjY2Vzc05hbWUudXNlckluZm8sdGhpcy5nZXRVc2VySW5mb0pzb25TdHJpbmcoKSkudGhlbigoZGF0YTphbnkpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaWduSW5EYXlzID0gZGF0YS5zaWduRGF5cztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzU2lnbkdpZnQgPSBkYXRhLmlzU2lnbkdpZnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXN0U2lnblRpbWUgPSBkYXRhLmxhc3RTaWduVGltZTtcclxuICAgICAgICAgICAgICAgICAgICAvL3RoaXMubGFzdFNpZ25UaW1lVFMgPSBkYXRhLmxhc3RTaWduVGltZVRTO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGFzdFNpZ25UaW1lVFMgPVRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuTmV3UGxheWVyU2F2ZW5EYXlTaWduSW5UaW1lLDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGF5R2VtID0gZGF0YS5wYXlHZW07XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53YXZlTnVtYmVyID0gZGF0YS53YXZlTnVtYmVyO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGFtYWdlTnVtYmVyID0gZGF0YS5kYW1hZ2VOdW1iZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYW1hZ2VOdW1iZXJMYXN0PWRhdGEuZGFtYWdlTnVtYmVyTGFzdDtcclxuICAgICAgICAgICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5OZXdQbGF5ZXJTYXZlbkRheVNpZ25Jbk51bSx0aGlzLnNpZ25JbkRheXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5Lk5ld1BsYXllclNhdmVuRGF5U2lnbkluT3Zlcix0aGlzLmlzU2lnbkdpZnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuaXNTaWduR2lmdCA9PSAwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9sZXQgc2lnbkluRGF0ZSA9IG5ldyBEYXRlKHRoaXMubGFzdFNpZ25UaW1lVFMgKiAxMDAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNpZ25JbkRhdGUgPSBuZXcgRGF0ZSh0aGlzLmxhc3RTaWduVGltZVRTKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG4xID0gc2lnbkluRGF0ZS5nZXREYXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuMiA9IG5ldyBEYXRlKChub3dUaW1lICogMTAwMCkpLmdldERhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2lnbkluRGF0ZS5nZXREYXRlKCkgPT0gbmV3IERhdGUoKS5nZXREYXRlKCkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuQ2FuU2lnbkluLDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LkNhblNpZ25JbiwwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDmi4nlj5bkuInljYHlpKnnrb7liLDmlbDmja5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRTaWduSW5EYXRhKG5vd1RpbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIEh0dHBNYW5hZ2VyLnBvc3QoQWNjZXNzTmFtZS5nZXRCb3NzLFwiXCIpLnRoZW4oKGRhdGE6YW55KT0+e1xyXG4gICAgICAgICAgICB0aGlzLlJvdGF0aW9uT3JkZXIgPSBkYXRhO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFNpZ25JbkRhdGEobm93VGltZTpudW1iZXIpe1xyXG4gICAgICAgIEh0dHBNYW5hZ2VyLnBvc3QoQWNjZXNzTmFtZS5nZXRTaWduUmVjb3JkLHRoaXMuZ2V0VXNlckluZm9Kc29uU3RyaW5nKCkpLnRoZW4oKGRhdGE6YW55KT0+e1xyXG4gICAgICAgICAgICBpZihkYXRhKXtcclxuICAgICAgICAgICAgICAgIC8vIOagh+iusOe0r+iuoeWlluWKsemihuWPluiusOW9lVxyXG4gICAgICAgICAgICAgICAgZGF0YS5zaWduR2lmdC5mb3JFYWNoKCh2LGspPT57XHJcbiAgICAgICAgICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuRGFpbHlTaWduSW5DdW11bGF0aXZlRGF5ICsgdi50eXBlLDEpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvLyDmoIforrDnrb7liLDorrDlvZVcclxuICAgICAgICAgICAgICAgIGRhdGEuc2lnbkRldGFpbC5mb3JFYWNoKCh2LGspPT57XHJcbiAgICAgICAgICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuRGFpbHlTaWduSW5EYXkgKyBuZXcgRGF0ZSh2LnNpZ25EYXRlVFMpLmdldERhdGUoKSwxKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKGRhdGEuc2lnbkRldGFpbC5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbGFzdFNpZ25UaW1lVFMgPSBkYXRhLnNpZ25EZXRhaWxbZGF0YS5zaWduRGV0YWlsLmxlbmd0aCAtIDFdLnNpZ25EYXRlVFM7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYobmV3IERhdGUobm93VGltZSkuZ2V0RGF0ZSgpID09IG5ldyBEYXRlKGxhc3RTaWduVGltZVRTKS5nZXREYXRlKCkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5DYW5TaWduSW4sMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LkNhblNpZ25JbiwwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5DYW5TaWduSW4sMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRIZXJvTGlzdCgpe1xyXG4gICAgICAgIGxldCBoZXJvSnNvbkRhdGEgPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb24oU3RvcmFnZUtleS5IZXJvTGlzdCk7XHJcbiAgICAgICAgaWYoaGVyb0pzb25EYXRhKXtcclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDtpPGhlcm9Kc29uRGF0YS5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgICAgIGxldCBoZXJvSW5mbyA9IG5ldyBIZXJvT2JqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW5mbyA9IGhlcm9Kc29uRGF0YVtpXTtcclxuICAgICAgICAgICAgICAgIGhlcm9JbmZvLmhlcm9JZD1pbmZvLmhlcm9fdHlwZTtcclxuICAgICAgICAgICAgICAgIGhlcm9JbmZvLmhlcm9MZXZlbD1pbmZvLmhlcm9fbGV2ZWw7XHJcbiAgICAgICAgICAgICAgICBoZXJvSW5mby5oZXJvU3RhZ2U9aW5mby5oZXJvX3N0YWdlO1xyXG4gICAgICAgICAgICAgICAgaGVyb0luZm8uaGVyb1dlYXBvblN0YWdlPWluZm8uZXhjbHVzaXZlX2VxdWlwX3N0YWdlO1xyXG4gICAgICAgICAgICAgICAgaGVyb0luZm8ud2VhcG9ucz1pbmZvLndlYXIxO1xyXG4gICAgICAgICAgICAgICAgaGVyb0luZm8uYXJtb3I9aW5mby53ZWFyMjtcclxuICAgICAgICAgICAgICAgIGhlcm9JbmZvLmFjY2Vzc29yaWVzPWluZm8ud2VhcjM7XHJcbiAgICAgICAgICAgICAgICBoZXJvSW5mby5zaG9lcz1pbmZvLndlYXI0O1xyXG4gICAgICAgICAgICAgICAgaGVyb0luZm8ucGV0PWluZm8ucGV0X2lkO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oZXJvTGlzdC5wdXNoKGhlcm9JbmZvKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBsZXQgaGVyb0luZm8gPSBuZXcgSGVyb09iamVjdCgpO1xyXG4gICAgICAgICAgICBoZXJvSW5mby5oZXJvSWQ9SGVyb19UeXBlLlNob3VXYW5nO1xyXG4gICAgICAgICAgICBoZXJvSW5mby5oZXJvTGV2ZWw9MTtcclxuICAgICAgICAgICAgaGVyb0luZm8uaGVyb1N0YWdlPTA7XHJcbiAgICAgICAgICAgIGhlcm9JbmZvLmhlcm9XZWFwb25TdGFnZT0wO1xyXG4gICAgICAgICAgICBoZXJvSW5mby53ZWFwb25zPTA7XHJcbiAgICAgICAgICAgIGhlcm9JbmZvLmFybW9yPTA7XHJcbiAgICAgICAgICAgIGhlcm9JbmZvLmFjY2Vzc29yaWVzPTA7XHJcbiAgICAgICAgICAgIGhlcm9JbmZvLnNob2VzPTA7XHJcbiAgICAgICAgICAgIGhlcm9JbmZvLnBldD0wO1xyXG4gICAgICAgICAgICB0aGlzLmhlcm9MaXN0LnB1c2goaGVyb0luZm8pO1xyXG5cclxuICAgICAgICAgICAgaGVyb0luZm8gPSBuZXcgSGVyb09iamVjdCgpO1xyXG4gICAgICAgICAgICBoZXJvSW5mby5oZXJvSWQ9SGVyb19UeXBlLlBhb1Nob3U7XHJcbiAgICAgICAgICAgIGhlcm9JbmZvLmhlcm9MZXZlbD0xO1xyXG4gICAgICAgICAgICBoZXJvSW5mby5oZXJvU3RhZ2U9MDtcclxuICAgICAgICAgICAgaGVyb0luZm8uaGVyb1dlYXBvblN0YWdlPTA7XHJcbiAgICAgICAgICAgIGhlcm9JbmZvLndlYXBvbnM9MDtcclxuICAgICAgICAgICAgaGVyb0luZm8uYXJtb3I9MDtcclxuICAgICAgICAgICAgaGVyb0luZm8uYWNjZXNzb3JpZXM9MDtcclxuICAgICAgICAgICAgaGVyb0luZm8uc2hvZXM9MDtcclxuICAgICAgICAgICAgaGVyb0luZm8ucGV0PTA7XHJcbiAgICAgICAgICAgIHRoaXMuaGVyb0xpc3QucHVzaChoZXJvSW5mbyk7XHJcblxyXG4gICAgICAgICAgICBoZXJvSW5mbyA9IG5ldyBIZXJvT2JqZWN0KCk7XHJcbiAgICAgICAgICAgIGhlcm9JbmZvLmhlcm9JZD1IZXJvX1R5cGUuRGVMdVlpO1xyXG4gICAgICAgICAgICBoZXJvSW5mby5oZXJvTGV2ZWw9MTtcclxuICAgICAgICAgICAgaGVyb0luZm8uaGVyb1N0YWdlPTA7XHJcbiAgICAgICAgICAgIGhlcm9JbmZvLmhlcm9XZWFwb25TdGFnZT0wO1xyXG4gICAgICAgICAgICBoZXJvSW5mby53ZWFwb25zPTA7XHJcbiAgICAgICAgICAgIGhlcm9JbmZvLmFybW9yPTA7XHJcbiAgICAgICAgICAgIGhlcm9JbmZvLmFjY2Vzc29yaWVzPTA7XHJcbiAgICAgICAgICAgIGhlcm9JbmZvLnNob2VzPTA7XHJcbiAgICAgICAgICAgIGhlcm9JbmZvLnBldD0wO1xyXG4gICAgICAgICAgICB0aGlzLmhlcm9MaXN0LnB1c2goaGVyb0luZm8pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBIdHRwTWFuYWdlci5wb3N0KEFjY2Vzc05hbWUuZ2V0SGVyb0xpc3QsdGhpcy5nZXRVc2VySW5mb0pzb25TdHJpbmcoKSxmYWxzZSkudGhlbigoZGF0YTphbnkpPT57XHJcbiAgICAgICAgICAgIGlmKGRhdGEpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oZXJvTGlzdCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgaWYoZGF0YS5sZW5ndGggIT0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5mb3JFYWNoKCh2LGspPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBoZXJvSW5mbyA9IG5ldyBIZXJvT2JqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlcm9JbmZvLmhlcm9JZD12Lmhlcm9JZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVyb0luZm8uaGVyb0xldmVsPXYuaGVyb0xldmVsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZXJvSW5mby5oZXJvU3RhZ2U9di5oZXJvU3RhZ2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlcm9JbmZvLmhlcm9XZWFwb25TdGFnZT12Lmhlcm9XZWFwb25TdGFnZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVyb0luZm8ud2VhcG9ucz12LndlYXBvbnM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlcm9JbmZvLmFybW9yPXYuYXJtb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlcm9JbmZvLmFjY2Vzc29yaWVzPXYuYWNjZXNzb3JpZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlcm9JbmZvLnNob2VzPXYuc2hvZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlcm9JbmZvLnBldD12LnBldDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oZXJvTGlzdC5wdXNoKGhlcm9JbmZvKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBoZXJvSW5mbyA9IG5ldyBIZXJvT2JqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVyb0luZm8uaGVyb0lkPUhlcm9fVHlwZS5TaG91V2FuZztcclxuICAgICAgICAgICAgICAgICAgICBoZXJvSW5mby5oZXJvTGV2ZWw9MTtcclxuICAgICAgICAgICAgICAgICAgICBoZXJvSW5mby5oZXJvU3RhZ2U9MDtcclxuICAgICAgICAgICAgICAgICAgICBoZXJvSW5mby5oZXJvV2VhcG9uU3RhZ2U9MDtcclxuICAgICAgICAgICAgICAgICAgICBoZXJvSW5mby53ZWFwb25zPTA7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVyb0luZm8uYXJtb3I9MDtcclxuICAgICAgICAgICAgICAgICAgICBoZXJvSW5mby5hY2Nlc3Nvcmllcz0wO1xyXG4gICAgICAgICAgICAgICAgICAgIGhlcm9JbmZvLnNob2VzPTA7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVyb0luZm8ucGV0PTA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZXJvTGlzdC5wdXNoKGhlcm9JbmZvKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaGVyb0luZm8gPSBuZXcgSGVyb09iamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGhlcm9JbmZvLmhlcm9JZD1IZXJvX1R5cGUuUGFvU2hvdTtcclxuICAgICAgICAgICAgICAgICAgICBoZXJvSW5mby5oZXJvTGV2ZWw9MTtcclxuICAgICAgICAgICAgICAgICAgICBoZXJvSW5mby5oZXJvU3RhZ2U9MDtcclxuICAgICAgICAgICAgICAgICAgICBoZXJvSW5mby5oZXJvV2VhcG9uU3RhZ2U9MDtcclxuICAgICAgICAgICAgICAgICAgICBoZXJvSW5mby53ZWFwb25zPTA7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVyb0luZm8uYXJtb3I9MDtcclxuICAgICAgICAgICAgICAgICAgICBoZXJvSW5mby5hY2Nlc3Nvcmllcz0wO1xyXG4gICAgICAgICAgICAgICAgICAgIGhlcm9JbmZvLnNob2VzPTA7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVyb0luZm8ucGV0PTA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZXJvTGlzdC5wdXNoKGhlcm9JbmZvKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaGVyb0luZm8gPSBuZXcgSGVyb09iamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGhlcm9JbmZvLmhlcm9JZD1IZXJvX1R5cGUuRGVMdVlpO1xyXG4gICAgICAgICAgICAgICAgICAgIGhlcm9JbmZvLmhlcm9MZXZlbD0xO1xyXG4gICAgICAgICAgICAgICAgICAgIGhlcm9JbmZvLmhlcm9TdGFnZT0wO1xyXG4gICAgICAgICAgICAgICAgICAgIGhlcm9JbmZvLmhlcm9XZWFwb25TdGFnZT0wO1xyXG4gICAgICAgICAgICAgICAgICAgIGhlcm9JbmZvLndlYXBvbnM9MDtcclxuICAgICAgICAgICAgICAgICAgICBoZXJvSW5mby5hcm1vcj0wO1xyXG4gICAgICAgICAgICAgICAgICAgIGhlcm9JbmZvLmFjY2Vzc29yaWVzPTA7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVyb0luZm8uc2hvZXM9MDtcclxuICAgICAgICAgICAgICAgICAgICBoZXJvSW5mby5wZXQ9MDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlcm9MaXN0LnB1c2goaGVyb0luZm8pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkuY2F0Y2goKGVycik9PntcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLnvZHnu5zor7fmsYLlh7rnjrDpl67popjvvIzov5nph4zmi7/mnKzlnLDmlbDmja7kvZzkuLrmuLjmiI/kvp3mja5cIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U3RvcmVEYXRhKG5vd1RpbWU6bnVtYmVyKXtcclxuICAgICAgICBIdHRwTWFuYWdlci5wb3N0KEFjY2Vzc05hbWUucXVlcnlHYW1lVGFzayx0aGlzLmdldFF1ZXJ5R2FtZVRhc2tKc29uU3RyaW5nKDEwKSkudGhlbigoZGF0YTphbnkpPT57XHJcbiAgICAgICAgICAgIGlmKGRhdGEpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZShub3dUaW1lKTtcclxuICAgICAgICAgICAgICAgIGRhdGEuZm9yRWFjaCgodixrKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGxldCBkMSA9IG5ldyBEYXRlKHYuY3JlYXRlVGltZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZDEuZ2V0RGF0ZSgpLGRhdGUuZ2V0RGF0ZSgpKTtcclxuICAgICAgICAgICAgICAgICAgICBpZihuZXcgRGF0ZSh2LmNyZWF0ZVRpbWUpLmdldERhdGUoKSA9PSBkYXRlLmdldERhdGUoKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LlN0b3JlRGFpbHlTaG9wTnVtICsgdi5wbGF5TGV2ZWwsMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRWSVBEYXRhKCl7XHJcbiAgICAgICAgSHR0cE1hbmFnZXIucG9zdChBY2Nlc3NOYW1lLnF1ZXJ5R2FtZVRhc2ssdGhpcy5nZXRRdWVyeUdhbWVUYXNrSnNvblN0cmluZygxKSkudGhlbigoZGF0YTphbnkpPT57XHJcbiAgICAgICAgICAgIGlmKGRhdGEpe1xyXG4gICAgICAgICAgICAgICAgZGF0YS5mb3JFYWNoKCh2LGspPT57XHJcbiAgICAgICAgICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuVmlwRnJlZVJld2FyZFN0YXR1cyt2LnBsYXlMZXZlbCwxKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgSHR0cE1hbmFnZXIucG9zdChBY2Nlc3NOYW1lLnF1ZXJ5R2FtZVRhc2ssdGhpcy5nZXRRdWVyeUdhbWVUYXNrSnNvblN0cmluZygyKSkudGhlbigoZGF0YTphbnkpPT57XHJcbiAgICAgICAgICAgIGlmKGRhdGEpe1xyXG4gICAgICAgICAgICAgICAgZGF0YS5mb3JFYWNoKCh2LGspPT57XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuVmlwRnJlZVJld2FyZFN0YXR1cyt2LnBsYXlMZXZlbCwxKTtcclxuICAgICAgICAgICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5WaXBBZHZhbmNlZFJld2FyZFN0YXR1cyt2LnBsYXlMZXZlbCwxKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRUYXNrRGF0YSgpe1xyXG4gICAgICAgIEh0dHBNYW5hZ2VyLmdhbWVUaW1lUG9zdChBY2Nlc3NOYW1lLmdldFNlcnZlclRpbWUsdGhpcy5nZXRVc2VySW5mb0pzb25TdHJpbmcoKSkudGhlbigoZGF0YTphbnkpPT57XHJcbiAgICAgICAgICAgIGlmKGRhdGEuc2VydmVyVGltZSl7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGltZVMgPSBkYXRhLnNlcnZlclRpbWUgKiAxMDAwO1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZSh0aW1lUyk7XHJcbiAgICAgICAgICAgICAgICAvLyDojrflj5bmr4/ml6Xku7vliqHmlbDmja5cclxuICAgICAgICAgICAgICAgIHRoaXMuZGFpbHlUYXNrTGlzdCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgSHR0cE1hbmFnZXIucG9zdChBY2Nlc3NOYW1lLnF1ZXJ5R2FtZUFjaGlldmVtZW50VGFzayx0aGlzLmdldFRhc2tJbmZvSnNvblN0cmluZygxKSkudGhlbigoZGF0YTphbnkpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZGF0YSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuZm9yRWFjaCgodixrKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNyZWF0ZURhdGUgPSBuZXcgRGF0ZSh2LmNyZWF0ZVRpbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZGF0ZS5nZXREYXRlKCkgPT0gY3JlYXRlRGF0ZS5nZXREYXRlKCkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0YXNrSXRlbTpUYXNrT2JqZWN0ID0gbmV3IFRhc2tPYmplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXNrSXRlbS50YXNrSWQgPSB2LnRhc2tJZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXNrSXRlbS5kaW1lbnNpb24gPSB2LmRpbWVuc2lvbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXNrSXRlbS5zdGF0dXMgPSB2LnN0YXR1cztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXNrSXRlbS5lbWl0ID0gdi5lbWl0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRhc2tJdGVtLnN0YWdlID0gdi5zdGFnZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhaWx5VGFza0xpc3QucHVzaCh0YXNrSXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhaWx5VGFza0xpc3QuZm9yRWFjaCgodixrKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g6K6+572u5q+P5pel5Lu75YqhaWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LlRhc2tJZCArIGssdi50YXNrSWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g6K6+572u5q+P5pel5Lu75Yqh54q25oCBXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5UYXNrU3RhdGUgKyB2LnRhc2tJZCx2LnN0YXR1cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDorr7nva7mr4/ml6Xku7vliqHmlbDmja5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LlRhc2tOdW0gKyB2LnRhc2tJZCx2LmVtaXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9UT0RPIOajgOafpeaYr+WQpuaJgOacieS7u+WKoeaVsOaNrumDveWKoOi9veWujOavlVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIOiOt+WPluaIkOWwseS7u+WKoeaVsOaNrlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hY2hpZXZlbWVudFRhc2tMaXN0ID0gW107XHJcbiAgICAgICAgICAgICAgICBIdHRwTWFuYWdlci5wb3N0KEFjY2Vzc05hbWUucXVlcnlHYW1lQWNoaWV2ZW1lbnRUYXNrLHRoaXMuZ2V0VGFza0luZm9Kc29uU3RyaW5nKDIpKS50aGVuKChkYXRhOmFueSk9PntcclxuICAgICAgICAgICAgICAgICAgICBpZihkYXRhKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5mb3JFYWNoKCh2LGspPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGFza0l0ZW06VGFza09iamVjdCA9IG5ldyBUYXNrT2JqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0YXNrSXRlbS50YXNrSWQgPSB2LnRhc2tJZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRhc2tJdGVtLmRpbWVuc2lvbiA9IHYuZGltZW5zaW9uO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFza0l0ZW0uc3RhdHVzID0gdi5zdGF0dXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXNrSXRlbS5lbWl0ID0gdi5lbWl0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFza0l0ZW0uc3RhZ2UgPSB2LnN0YWdlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFza0l0ZW0udGFza1R5cGUgPSB2LnRhc2tUeXBlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hY2hpZXZlbWVudFRhc2tMaXN0LnB1c2godGFza0l0ZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g5piv5paw5bu65oiQ5bCx5Lu75Yqh55qE5pWw5o2uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuYWNoaWV2ZW1lbnRUYXNrTGlzdC5sZW5ndGggPT0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAxO2kgPCAxNTtpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0YXNrSXRlbTpUYXNrT2JqZWN0ID0gbmV3IFRhc2tPYmplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0YXNrSXRlbS51aWQgPSBVc2VyRGF0YS5nZXRJbnN0YW5jZSgpLmdldFVzZXJJRCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhc2tJdGVtLmRpbWVuc2lvbiA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFza0l0ZW0udGFza1R5cGUgPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhc2tJdGVtLnRhc2tJZCA9IGkqMTAwMDAwKzE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFza0l0ZW0uc3RhdHVzID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXNrSXRlbS5zdGFnZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFza0l0ZW0uZW1pdCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hY2hpZXZlbWVudFRhc2tMaXN0LnB1c2godGFza0l0ZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEh0dHBNYW5hZ2VyLnBvc3QoQWNjZXNzTmFtZS5zYXZlR2FtZUFjaGlldmVtZW50VGFzayx0aGlzLmdldFNhdmVHYW1lQWNoaWV2ZW1lbnRUYXNrSnNvbih0YXNrSXRlbSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOi/memHjOaYr+eUqOS7u+WKoeeahOexu+Wei+WSjOmYtuauteeul+WHuuS7u+WKoWlkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWNoaWV2ZW1lbnRUYXNrTGlzdC5mb3JFYWNoKCh2LGspPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5UYXNrQWNoaWV2ZW1lbnRJbmRleCArIHYudGFza1R5cGUsdi5zdGFnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5UYXNrQWNoaWV2ZW1lbnROdW0gKyB2LnRhc2tUeXBlLHYuZW1pdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5UYXNrU3RhdGUgKyAodi50YXNrVHlwZSAqIDEwMDAwMCArIHYuc3RhZ2UgKyAxKSx2LnN0YXR1cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vIOiOt+WPluS4u+e6v+S7u+WKoeaVsOaNrlxyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWluVGFza0xpc3QgPSBbXTtcclxuICAgICAgICAgICAgICAgIEh0dHBNYW5hZ2VyLnBvc3QoQWNjZXNzTmFtZS5xdWVyeUdhbWVBY2hpZXZlbWVudFRhc2ssdGhpcy5nZXRUYXNrSW5mb0pzb25TdHJpbmcoMykpLnRoZW4oKGRhdGE6YW55KT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGRhdGEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmZvckVhY2goKHYsayk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0YXNrSXRlbTpUYXNrT2JqZWN0ID0gbmV3IFRhc2tPYmplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRhc2tJdGVtLnRhc2tJZCA9IHYudGFza0lkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGFza0l0ZW0uZGltZW5zaW9uID0gdi5kaW1lbnNpb247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXNrSXRlbS5zdGF0dXMgPSB2LnN0YXR1cztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhc2tJdGVtLmVtaXQgPSB2LmVtaXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXNrSXRlbS5wcm9ncmVzcyA9IHYucHJvZ3Jlc3M7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXNrSXRlbS5zdGFnZSA9IHYuc3RhZ2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXNrSXRlbS50YXNrVHlwZSA9IHYudGFza1R5cGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1haW5UYXNrTGlzdC5wdXNoKHRhc2tJdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOaWsOW7uuS4u+e6v+S7u+WKoeeahOaVsOaNrlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLm1haW5UYXNrTGlzdC5sZW5ndGggPT0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAxO2kgPCAxOTtpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0YXNrSXRlbTpUYXNrT2JqZWN0ID0gbmV3IFRhc2tPYmplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0YXNrSXRlbS51aWQgPSBVc2VyRGF0YS5nZXRJbnN0YW5jZSgpLmdldFVzZXJJRCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhc2tJdGVtLmRpbWVuc2lvbiA9IDM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFza0l0ZW0udGFza1R5cGUgPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhc2tJdGVtLnRhc2tJZCA9IGkqMTAwMDAwKzE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFza0l0ZW0uc3RhdHVzID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXNrSXRlbS5zdGFnZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFza0l0ZW0uZW1pdCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFza0l0ZW0ucHJvZ3Jlc3MgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFpblRhc2tMaXN0LnB1c2godGFza0l0ZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEh0dHBNYW5hZ2VyLnBvc3QoQWNjZXNzTmFtZS5zYXZlR2FtZUFjaGlldmVtZW50VGFzayx0aGlzLmdldFNhdmVHYW1lQWNoaWV2ZW1lbnRUYXNrSnNvbih0YXNrSXRlbSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOi/memHjOaYr+eUqOS7u+WKoeeahOexu+Wei+WSjOmYtuauteeul+WHuuS7u+WKoWlkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFpblRhc2tMaXN0LmZvckVhY2goKHYsayk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LlRhc2tNYWluSW5kZXggKyB2LnRhc2tUeXBlLHYuc3RhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuVGFza01haW5OdW0gKyB2LnRhc2tUeXBlLHYuZW1pdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5UYXNrU3RhdGUgKyAodi50YXNrVHlwZSAqIDEwMDAwMDAwICsgdi5zdGFnZSArIDEpLHYuc3RhdHVzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuVGFza01haW5TaG93SW5kZXgsdi5wcm9ncmVzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyDku7vliqHml6XmtLvot4PlpZblirHpooblj5ZcclxuICAgICAgICAgICAgICAgIEh0dHBNYW5hZ2VyLnBvc3QoQWNjZXNzTmFtZS5xdWVyeUdhbWVUYXNrLHRoaXMuZ2V0UXVlcnlHYW1lVGFza0pzb25TdHJpbmcoNCkpLnRoZW4oKGRhdGE6YW55KT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGRhdGEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmZvckVhY2goKHYsayk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjcmVhdGVEYXRlID0gbmV3IERhdGUodi5jcmVhdGVUaW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGRhdGUuZ2V0RGF0ZSgpID09IGNyZWF0ZURhdGUuZ2V0RGF0ZSgpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDku6PooajmmK/ku4rlpKnlhoXnmoTmlbDmja5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5UYXNrRGFpbHlBY3Rpdml0eVN0YXRlICsgdi5wbGF5TGV2ZWwsMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pOyBcclxuICAgICAgICAgICAgICAgIC8vIOS7u+WKoeWRqOa0u+i3g+mihuWPllxyXG4gICAgICAgICAgICAgICAgSHR0cE1hbmFnZXIucG9zdChBY2Nlc3NOYW1lLnF1ZXJ5R2FtZVRhc2ssdGhpcy5nZXRRdWVyeUdhbWVUYXNrSnNvblN0cmluZyg1KSkudGhlbigoZGF0YTphbnkpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZGF0YSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxldCBkYXRlID0gbmV3IERhdGUodGltZVMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmZvckVhY2goKHYsayk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjcmVhdGVEYXRlID0gbmV3IERhdGUodi5jcmVhdGVUaW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuZ2V0WWVhcldlZWsoZGF0ZSkgPT0gdGhpcy5nZXRZZWFyV2VlayhjcmVhdGVEYXRlKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g5Luj6KGo5piv5pys5ZGo5YaF55qE5pWw5o2uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuVGFza1dlZWtseUFjdGl2aXR5U3RhdGUgKyB2LnBsYXlMZXZlbCwxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvLyDku7vliqHml6XmtLvot4PmlbBcclxuICAgICAgICAgICAgICAgIEh0dHBNYW5hZ2VyLnBvc3QoQWNjZXNzTmFtZS5xdWVyeUdhbWVUYXNrLHRoaXMuZ2V0UXVlcnlHYW1lVGFza0pzb25TdHJpbmcoOCkpLnRoZW4oKGRhdGE6YW55KT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGRhdGEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmZvckVhY2goKHYsayk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxldCBkYXRlID0gbmV3IERhdGUodGltZVMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNyZWF0ZURhdGUgPSBuZXcgRGF0ZSh2LmNyZWF0ZVRpbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZGF0ZS5nZXREYXRlKCkgPT0gY3JlYXRlRGF0ZS5nZXREYXRlKCkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOS7o+ihqOaYr+S7iuWkqeWGheeahOaVsOaNrlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LlRhc2tEYWlseUFjdGl2aXR5TnVtLHYucGxheUxldmVsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvLyDku7vliqHlkajmtLvot4PmlbBcclxuICAgICAgICAgICAgICAgIEh0dHBNYW5hZ2VyLnBvc3QoQWNjZXNzTmFtZS5xdWVyeUdhbWVUYXNrLHRoaXMuZ2V0UXVlcnlHYW1lVGFza0pzb25TdHJpbmcoOSkpLnRoZW4oKGRhdGE6YW55KT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGRhdGEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBsZXQgZGF0ZSA9IG5ldyBEYXRlKHRpbWVTKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5mb3JFYWNoKCh2LGspPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY3JlYXRlRGF0ZSA9IG5ldyBEYXRlKHYuY3JlYXRlVGltZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmdldFllYXJXZWVrKGRhdGUpID09IHRoaXMuZ2V0WWVhcldlZWsoY3JlYXRlRGF0ZSkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOS7o+ihqOaYr+acrOWRqOWGheeahOaVsOaNrlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LlRhc2tXZWVrQWN0aXZpdHlOdW0sdi5wbGF5TGV2ZWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvLyBwcml2YXRlIGdldFN0b3JlSW5mb0pzb25TdHJpbmcodHlwZTpudW1iZXIpOnN0cmluZ3tcclxuICAgIC8vICAgICBsZXQgdWlkPVVzZXJEYXRhLmdldEluc3RhbmNlKCkuZ2V0VXNlcklEKCk7XHJcbiAgICAvLyAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHtcclxuICAgIC8vICAgICAgICAgdWlkOnVpZCxcclxuICAgIC8vICAgICAgICAgcmV3YXJkVHlwZTp0eXBlLFxyXG4gICAgLy8gICAgIH0pOyBcclxuICAgIC8vIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFVzZXJJbmZvSnNvblN0cmluZygpOnN0cmluZ3tcclxuICAgICAgICBsZXQgdWlkPVVzZXJEYXRhLmdldEluc3RhbmNlKCkuZ2V0VXNlcklEKCk7XHJcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgdWlkOnVpZCxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gdHlwZSDku7vliqHnsbvlnovvvIwxLeavj+aXpeS7u+WKoSAyLeaIkOWwseS7u+WKoSAzLeS4u+e6v+S7u+WKoVxyXG4gICAgICogQHJldHVybnMgXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0VGFza0luZm9Kc29uU3RyaW5nKHR5cGU6bnVtYmVyKTpzdHJpbmd7XHJcbiAgICAgICAgbGV0IHVpZD1Vc2VyRGF0YS5nZXRJbnN0YW5jZSgpLmdldFVzZXJJRCgpO1xyXG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgIHVpZDp1aWQsXHJcbiAgICAgICAgICAgIGRpbWVuc2lvbjp0eXBlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gdHlwZSA0LeaXpea0u+i3g+W6puWlluWKsSw1LeWRqOa0u+i3g+W6puWlluWKsSw4LeS7u+WKoeaXpea0u+i3g+W6pu+8jDkt5Lu75Yqh5ZGo5rS76LeD5bqmXHJcbiAgICAgKiBAcmV0dXJucyBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRRdWVyeUdhbWVUYXNrSnNvblN0cmluZyggdHlwZTogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgdWlkID0gVXNlckRhdGEuZ2V0SW5zdGFuY2UoKS5nZXRVc2VySUQoKTtcclxuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICB1aWQ6IHVpZCxcclxuICAgICAgICAgICAgcmV3YXJkVHlwZTogdHlwZSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRZZWFyV2VlayhlbmREYXRlOkRhdGUpe1xyXG4gICAgICAgIGxldCBiZWdpbkRhdGUgPSBuZXcgRGF0ZShlbmREYXRlLmdldEZ1bGxZZWFyKCksMCwxKTtcclxuICAgICAgICBsZXQgZW5kV2VlayA9IGVuZERhdGUuZ2V0RGF5KCk7XHJcbiAgICAgICAgaWYoZW5kV2VlayA9PSAwKWVuZFdlZWsgPSA3O1xyXG4gICAgICAgIGxldCBiZWdpbldlZWsgPSBiZWdpbkRhdGUuZ2V0RGF5KCk7XHJcbiAgICAgICAgaWYoYmVnaW5XZWVrID09IDApYmVnaW5XZWVrID03O1xyXG4gICAgICAgIGxldCBtaWxsaXNEaWZmID0gZW5kRGF0ZS5nZXRUaW1lKCkgLSBiZWdpbkRhdGUuZ2V0VGltZSgpO1xyXG4gICAgICAgIGxldCBkYXlEaWZmID0gTWF0aC5mbG9vcigobWlsbGlzRGlmZiArIChiZWdpbldlZWsgLSBlbmRXZWVrKSooMjQqNjAqNjAqMTAwMCkpLzg2NDAwMDAwKTtcclxuICAgICAgICByZXR1cm4gTWF0aC5jZWlsKGRheURpZmYvNykgKyAxO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gdHlwZSA0LeaXpea0u+i3g+W6puWlluWKsSw1LeWRqOa0u+i3g+W6puWlluWKsSw4LeS7u+WKoeaXpea0u+i3g+W6pu+8jDkt5Lu75Yqh5ZGo5rS76LeD5bqmXHJcbiAgICAgKiBAcmV0dXJucyBcclxuICAgICAqL1xyXG4gICAgIGdldFNhdmVHYW1lVGFza0pzb25TdHJpbmcodmFsdWU6bnVtYmVyLHR5cGU6IG51bWJlcik6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IHVpZCA9IFVzZXJEYXRhLmdldEluc3RhbmNlKCkuZ2V0VXNlcklEKCk7XHJcbiAgICAgICAgbGV0IG51bSA9IHZhbHVlO1xyXG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgIHVpZDogdWlkLFxyXG4gICAgICAgICAgICBwbGF5TGV2ZWw6bnVtLFxyXG4gICAgICAgICAgICByZXdhcmRUeXBlOiB0eXBlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuiOt+WPluaIkOWwseS7u+WKoeS4iuaKpeWPguaVsCAqL1xyXG4gICAgZ2V0U2F2ZUdhbWVBY2hpZXZlbWVudFRhc2tKc29uKHRhc2tJdGVtOlRhc2tPYmplY3QpOnN0cmluZ3tcclxuICAgICAgICBsZXQgdWlkID0gVXNlckRhdGEuZ2V0SW5zdGFuY2UoKS5nZXRVc2VySUQoKTtcclxuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICB1aWQ6dWlkLFxyXG4gICAgICAgICAgICBkaW1lbnNpb246dGFza0l0ZW0uZGltZW5zaW9uLFxyXG4gICAgICAgICAgICB0YXNrVHlwZTp0YXNrSXRlbS50YXNrVHlwZSxcclxuICAgICAgICAgICAgdGFza0lkOnRhc2tJdGVtLnRhc2tJZCxcclxuICAgICAgICAgICAgcHJvZ3Jlc3M6dGFza0l0ZW0ucHJvZ3Jlc3MsXHJcbiAgICAgICAgICAgIHN0YXR1czp0YXNrSXRlbS5zdGF0dXMsXHJcbiAgICAgICAgICAgIHN0YWdlOnRhc2tJdGVtLnN0YWdlLFxyXG4gICAgICAgICAgICBlbWl0OnRhc2tJdGVtLmVtaXQsXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBnZXROb3dEYXkoKTpzdHJpbmd7XHJcbiAgICAgICAgbGV0IHMgPSBcIlwiO1xyXG4gICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgICBzICs9IGRhdGUuZ2V0RnVsbFllYXIoKTtcclxuICAgICAgICBpZihkYXRlLmdldE1vbnRoKCkgKyAxIDwgMTApe1xyXG4gICAgICAgICAgICBzICs9IFwiLTBcIiArIChkYXRlLmdldE1vbnRoKCkgKyAxKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcyArPSBcIi1cIiArIChkYXRlLmdldE1vbnRoKCkgKyAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZGF0ZS5nZXREYXRlKCkgPCAxMCl7XHJcbiAgICAgICAgICAgIHMgKz0gXCItMFwiICsgZGF0ZS5nZXREYXRlKCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHMgKz0gXCItXCIgKyBkYXRlLmdldERhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHM7XHJcbiAgICB9XHJcbn0iXX0=