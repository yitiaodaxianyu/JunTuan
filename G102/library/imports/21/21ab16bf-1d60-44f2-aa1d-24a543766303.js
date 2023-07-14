"use strict";
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
                    _this.lastSignTimeTS = data.lastSignTimeTS;
                    _this.payGem = data.payGem;
                    _this.waveNumber = data.waveNumber;
                    _this.damageNumber = data.damageNumber;
                    _this.damageNumberLast = data.damageNumberLast;
                    StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.NewPlayerSavenDaySignInNum, _this.signInDays);
                    StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.NewPlayerSavenDaySignInOver, _this.isSignGift);
                    if (_this.isSignGift == 0) {
                        var signInDate = new Date(_this.lastSignTimeTS * 1000);
                        var n1 = signInDate.getDate();
                        var n2 = new Date((nowTime_1 * 1000)).getDate();
                        if (signInDate.getDate() == new Date((nowTime_1 * 1000)).getDate()) {
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
                            StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TaskMainShowIndex, v.progress);
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