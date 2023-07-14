
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVXNlckluZm9cXFVzZXJJbmZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHdEQUEyRjtBQUMzRixzREFBb0Q7QUFDcEQsMERBQXNEO0FBQ3RELDREQUE4RDtBQUM5RCx3Q0FBbUM7QUFFbkM7SUFBQTtRQUVJLGVBQWU7UUFDZixlQUFVLEdBQVUsQ0FBQyxDQUFDO1FBQ3RCLFdBQVc7UUFDWCxlQUFVLEdBQVUsQ0FBQyxDQUFDO1FBQ3RCLGtCQUFrQjtRQUNsQixpQkFBWSxHQUFVLENBQUMsQ0FBQztRQUN4QixxQkFBcUI7UUFDckIsbUJBQWMsR0FBVSxDQUFDLENBQUM7UUFDMUIsU0FBUztRQUNULFdBQU0sR0FBVSxDQUFDLENBQUE7UUFDakIsS0FBSztRQUNMLGVBQVUsR0FBVSxDQUFDLENBQUE7UUFFckIsTUFBTTtRQUNOLGlCQUFZLEdBQVUsQ0FBQyxDQUFBO1FBRXZCLFdBQVc7UUFDWCxrQkFBYSxHQUFVLENBQUMsQ0FBQTtRQUV4QixhQUFRLEdBQWdCLEVBQUUsQ0FBQztRQUUzQixrQkFBYSxHQUFnQixFQUFFLENBQUM7UUFFaEMsd0JBQW1CLEdBQWdCLEVBQUUsQ0FBQztRQUV0QyxpQkFBWSxHQUFnQixFQUFFLENBQUM7UUFFL0IseUNBQXlDO1FBQ3pDLHFCQUFnQixHQUFVLENBQUMsQ0FBQyxDQUFBO0lBK2VoQyxDQUFDO0lBNWVpQixvQkFBVyxHQUF6QjtRQUNJLElBQUcsSUFBSSxDQUFDLFNBQVMsSUFBRSxJQUFJLEVBQUU7WUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBQyxJQUFJLFFBQVEsRUFBRSxDQUFDO1lBQzlCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDekI7UUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUVELHVCQUFJLEdBQUo7UUFDSSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsSUFBSSxD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UUFBUSxDQUFDLFFBQVE7WUFDMUIsTUFBTSxFQUFDLFFBQVEsQ0FBQyxNQUFNO1lBQ3RCLFFBQVEsRUFBQyxRQUFRLENBQUMsUUFBUTtZQUMxQixNQUFNLEVBQUMsUUFBUSxDQUFDLE1BQU07WUFDdEIsS0FBSyxFQUFDLFFBQVEsQ0FBQyxLQUFLO1lBQ3BCLElBQUksRUFBQyxRQUFRLENBQUMsSUFBSTtTQUNyQixDQUFDLENBQUE7SUFDTixDQUFDO0lBRUQsNEJBQVMsR0FBVDtRQUNJLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNYLElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFDdEIsQ0FBQyxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN4QixJQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFDO1lBQ3hCLENBQUMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDckM7YUFBSTtZQUNELENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDcEM7UUFDRCxJQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLEVBQUM7WUFDbkIsQ0FBQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDOUI7YUFBSTtZQUNELENBQUMsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQzdCO1FBQ0QsT0FBTyxDQUFDLENBQUM7SUFDYixDQUFDO0lBN2VjLGtCQUFTLEdBQWEsSUFBSSxDQUFDO0lBOGU5QyxlQUFDO0NBN2dCRCxBQTZnQkMsSUFBQTtBQTdnQlksNEJBQVEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBY2Nlc3NOYW1lLCBIZXJvT2JqZWN0LCBIdHRwTWFuYWdlciwgVGFza09iamVjdCB9IGZyb20gXCIuLi8uL05ldFdvcmsvSHR0cE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgSGVyb19UeXBlIH0gZnJvbSBcIi4uL0hlcm8vR2FtZS9IZXJvQ29uZmlnXCI7XHJcbmltcG9ydCB7IFN0b3JhZ2VLZXkgfSBmcm9tIFwiLi4vU3RvcmFnZS9TdG9yYWdlQ29uZmlnXCI7XHJcbmltcG9ydCB7IFRoZVN0b3JhZ2VNYW5hZ2VyIH0gZnJvbSBcIi4uL1N0b3JhZ2UvU3RvcmFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IFVzZXJEYXRhIGZyb20gXCIuLi9Vc2VyRGF0YVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFVzZXJJbmZve1xyXG5cclxuICAgIC8v6L+e57ut562+5Yiw5aSp5pWwIOaWsOaJizflpKnnrb7liLBcclxuICAgIHNpZ25JbkRheXM6bnVtYmVyID0gMDtcclxuICAgIC8vIOaYr+WQpumihuWPluS4g+aXpeekvOWMhVxyXG4gICAgaXNTaWduR2lmdDpudW1iZXIgPSAwO1xyXG4gICAgLy8g5pyA5ZCO5LiA5qyh562+5Yiw5pe26Ze0IOaWsOaJizflpKnnrb7liLBcclxuICAgIGxhc3RTaWduVGltZTpudW1iZXIgPSAwO1xyXG4gICAgLy8g5pyA5ZCO5LiA5qyh562+5Yiw5pe26Ze05pe26Ze05oizIOavq+enkue6p+aXtumXtOaIs1xyXG4gICAgbGFzdFNpZ25UaW1lVFM6bnVtYmVyID0gMDtcclxuICAgIC8vIOS7mOi0ueWuneefs+aVsOmHj1xyXG4gICAgcGF5R2VtOm51bWJlciA9IDBcclxuICAgIC8vIOazouaVsFxyXG4gICAgd2F2ZU51bWJlcjpudW1iZXIgPSAwXHJcblxyXG4gICAgLy8g5Lyk5a6z5pWwXHJcbiAgICBkYW1hZ2VOdW1iZXI6bnVtYmVyID0gMFxyXG5cclxuICAgIC8vIEJvc3Pova7mjaLpobrluo9cclxuICAgIFJvdGF0aW9uT3JkZXI6bnVtYmVyID0gMVxyXG5cclxuICAgIGhlcm9MaXN0Okhlcm9PYmplY3RbXSA9IFtdO1xyXG5cclxuICAgIGRhaWx5VGFza0xpc3Q6VGFza09iamVjdFtdID0gW107XHJcblxyXG4gICAgYWNoaWV2ZW1lbnRUYXNrTGlzdDpUYXNrT2JqZWN0W10gPSBbXTtcclxuXHJcbiAgICBtYWluVGFza0xpc3Q6VGFza09iamVjdFtdID0gW107XHJcblxyXG4gICAgLy8gQm9zc+aMkeaImOavj+WRqOWlluWKsemihuWPlueKtuaAgSAgIOaYr+WQpuiDvemihuWPliAgIDA+5pyq6aKG5Y+WICAgLTHlt7Lpooblj5ZcclxuICAgIGRhbWFnZU51bWJlckxhc3Q6bnVtYmVyID0gLTFcclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogVXNlckluZm8gPSBudWxsO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTpVc2VySW5mbyB7XHJcbiAgICAgICAgaWYodGhpcy5faW5zdGFuY2U9PW51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2U9bmV3IFVzZXJJbmZvKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLmluaXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXQoKXtcclxuICAgICAgICB0aGlzLnJlZnJlc2hEYXRhKCk7XHJcbiAgICAgICAgdGhpcy5nZXRIZXJvTGlzdCgpO1xyXG4gICAgICAgIHRoaXMuZ2V0VklQRGF0YSgpO1xyXG4gICAgICAgIHRoaXMuZ2V0VGFza0RhdGEoKTtcclxuICAgIH1cclxuXHJcbiAgICByZWZyZXNoRGF0YSgpe1xyXG4gICAgICAgIEh0dHBNYW5hZ2VyLmdhbWVUaW1lUG9zdChBY2Nlc3NOYW1lLmdldFNlcnZlclRpbWUsdGhpcy5nZXRVc2VySW5mb0pzb25TdHJpbmcoKSkudGhlbigoZGF0YTphbnkpPT57XHJcbiAgICAgICAgICAgIGlmKGRhdGEuc2VydmVyVGltZSl7XHJcbiAgICAgICAgICAgICAgICBsZXQgbm93VGltZSA9IGRhdGEuc2VydmVyVGltZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0U3RvcmVEYXRhKG5vd1RpbWUgKiAxMDAwKTtcclxuICAgICAgICAgICAgICAgIEh0dHBNYW5hZ2VyLnBvc3QoQWNjZXNzTmFtZS51c2VySW5mbyx0aGlzLmdldFVzZXJJbmZvSnNvblN0cmluZygpKS50aGVuKChkYXRhOmFueSk9PntcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNpZ25JbkRheXMgPSBkYXRhLnNpZ25EYXlzO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNTaWduR2lmdCA9IGRhdGEuaXNTaWduR2lmdDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxhc3RTaWduVGltZSA9IGRhdGEubGFzdFNpZ25UaW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGFzdFNpZ25UaW1lVFMgPSBkYXRhLmxhc3RTaWduVGltZVRTO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGF5R2VtID0gZGF0YS5wYXlHZW07XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53YXZlTnVtYmVyID0gZGF0YS53YXZlTnVtYmVyO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGFtYWdlTnVtYmVyID0gZGF0YS5kYW1hZ2VOdW1iZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYW1hZ2VOdW1iZXJMYXN0PWRhdGEuZGFtYWdlTnVtYmVyTGFzdDtcclxuICAgICAgICAgICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5OZXdQbGF5ZXJTYXZlbkRheVNpZ25Jbk51bSx0aGlzLnNpZ25JbkRheXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5Lk5ld1BsYXllclNhdmVuRGF5U2lnbkluT3Zlcix0aGlzLmlzU2lnbkdpZnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuaXNTaWduR2lmdCA9PSAwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNpZ25JbkRhdGUgPSBuZXcgRGF0ZSh0aGlzLmxhc3RTaWduVGltZVRTICogMTAwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuMSA9IHNpZ25JbkRhdGUuZ2V0RGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbjIgPSBuZXcgRGF0ZSgobm93VGltZSAqIDEwMDApKS5nZXREYXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNpZ25JbkRhdGUuZ2V0RGF0ZSgpID09IG5ldyBEYXRlKChub3dUaW1lICogMTAwMCkpLmdldERhdGUoKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5DYW5TaWduSW4sMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuQ2FuU2lnbkluLDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOaLieWPluS4ieWNgeWkqeetvuWIsOaVsOaNrlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFNpZ25JbkRhdGEobm93VGltZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgSHR0cE1hbmFnZXIucG9zdChBY2Nlc3NOYW1lLmdldEJvc3MsXCJcIikudGhlbigoZGF0YTphbnkpPT57XHJcbiAgICAgICAgICAgIHRoaXMuUm90YXRpb25PcmRlciA9IGRhdGE7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U2lnbkluRGF0YShub3dUaW1lOm51bWJlcil7XHJcbiAgICAgICAgSHR0cE1hbmFnZXIucG9zdChBY2Nlc3NOYW1lLmdldFNpZ25SZWNvcmQsdGhpcy5nZXRVc2VySW5mb0pzb25TdHJpbmcoKSkudGhlbigoZGF0YTphbnkpPT57XHJcbiAgICAgICAgICAgIGlmKGRhdGEpe1xyXG4gICAgICAgICAgICAgICAgLy8g5qCH6K6w57Sv6K6h5aWW5Yqx6aKG5Y+W6K6w5b2VXHJcbiAgICAgICAgICAgICAgICBkYXRhLnNpZ25HaWZ0LmZvckVhY2goKHYsayk9PntcclxuICAgICAgICAgICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5EYWlseVNpZ25JbkN1bXVsYXRpdmVEYXkgKyB2LnR5cGUsMSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vIOagh+iusOetvuWIsOiusOW9lVxyXG4gICAgICAgICAgICAgICAgZGF0YS5zaWduRGV0YWlsLmZvckVhY2goKHYsayk9PntcclxuICAgICAgICAgICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5EYWlseVNpZ25JbkRheSArIG5ldyBEYXRlKHYuc2lnbkRhdGVUUykuZ2V0RGF0ZSgpLDEpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoZGF0YS5zaWduRGV0YWlsLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBsYXN0U2lnblRpbWVUUyA9IGRhdGEuc2lnbkRldGFpbFtkYXRhLnNpZ25EZXRhaWwubGVuZ3RoIC0gMV0uc2lnbkRhdGVUUztcclxuICAgICAgICAgICAgICAgICAgICBpZihuZXcgRGF0ZShub3dUaW1lKS5nZXREYXRlKCkgPT0gbmV3IERhdGUobGFzdFNpZ25UaW1lVFMpLmdldERhdGUoKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LkNhblNpZ25JbiwxKTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuQ2FuU2lnbkluLDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LkNhblNpZ25JbiwwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEhlcm9MaXN0KCl7XHJcbiAgICAgICAgbGV0IGhlcm9Kc29uRGF0YSA9IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvbihTdG9yYWdlS2V5Lkhlcm9MaXN0KTtcclxuICAgICAgICBpZihoZXJvSnNvbkRhdGEpe1xyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwO2k8aGVyb0pzb25EYXRhLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IGhlcm9JbmZvID0gbmV3IEhlcm9PYmplY3QoKTtcclxuICAgICAgICAgICAgICAgIGxldCBpbmZvID0gaGVyb0pzb25EYXRhW2ldO1xyXG4gICAgICAgICAgICAgICAgaGVyb0luZm8uaGVyb0lkPWluZm8uaGVyb190eXBlO1xyXG4gICAgICAgICAgICAgICAgaGVyb0luZm8uaGVyb0xldmVsPWluZm8uaGVyb19sZXZlbDtcclxuICAgICAgICAgICAgICAgIGhlcm9JbmZvLmhlcm9TdGFnZT1pbmZvLmhlcm9fc3RhZ2U7XHJcbiAgICAgICAgICAgICAgICBoZXJvSW5mby5oZXJvV2VhcG9uU3RhZ2U9aW5mby5leGNsdXNpdmVfZXF1aXBfc3RhZ2U7XHJcbiAgICAgICAgICAgICAgICBoZXJvSW5mby53ZWFwb25zPWluZm8ud2VhcjE7XHJcbiAgICAgICAgICAgICAgICBoZXJvSW5mby5hcm1vcj1pbmZvLndlYXIyO1xyXG4gICAgICAgICAgICAgICAgaGVyb0luZm8uYWNjZXNzb3JpZXM9aW5mby53ZWFyMztcclxuICAgICAgICAgICAgICAgIGhlcm9JbmZvLnNob2VzPWluZm8ud2VhcjQ7XHJcbiAgICAgICAgICAgICAgICBoZXJvSW5mby5wZXQ9aW5mby5wZXRfaWQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhlcm9MaXN0LnB1c2goaGVyb0luZm8pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGxldCBoZXJvSW5mbyA9IG5ldyBIZXJvT2JqZWN0KCk7XHJcbiAgICAgICAgICAgIGhlcm9JbmZvLmhlcm9JZD1IZXJvX1R5cGUuU2hvdVdhbmc7XHJcbiAgICAgICAgICAgIGhlcm9JbmZvLmhlcm9MZXZlbD0xO1xyXG4gICAgICAgICAgICBoZXJvSW5mby5oZXJvU3RhZ2U9MDtcclxuICAgICAgICAgICAgaGVyb0luZm8uaGVyb1dlYXBvblN0YWdlPTA7XHJcbiAgICAgICAgICAgIGhlcm9JbmZvLndlYXBvbnM9MDtcclxuICAgICAgICAgICAgaGVyb0luZm8uYXJtb3I9MDtcclxuICAgICAgICAgICAgaGVyb0luZm8uYWNjZXNzb3JpZXM9MDtcclxuICAgICAgICAgICAgaGVyb0luZm8uc2hvZXM9MDtcclxuICAgICAgICAgICAgaGVyb0luZm8ucGV0PTA7XHJcbiAgICAgICAgICAgIHRoaXMuaGVyb0xpc3QucHVzaChoZXJvSW5mbyk7XHJcblxyXG4gICAgICAgICAgICBoZXJvSW5mbyA9IG5ldyBIZXJvT2JqZWN0KCk7XHJcbiAgICAgICAgICAgIGhlcm9JbmZvLmhlcm9JZD1IZXJvX1R5cGUuUGFvU2hvdTtcclxuICAgICAgICAgICAgaGVyb0luZm8uaGVyb0xldmVsPTE7XHJcbiAgICAgICAgICAgIGhlcm9JbmZvLmhlcm9TdGFnZT0wO1xyXG4gICAgICAgICAgICBoZXJvSW5mby5oZXJvV2VhcG9uU3RhZ2U9MDtcclxuICAgICAgICAgICAgaGVyb0luZm8ud2VhcG9ucz0wO1xyXG4gICAgICAgICAgICBoZXJvSW5mby5hcm1vcj0wO1xyXG4gICAgICAgICAgICBoZXJvSW5mby5hY2Nlc3Nvcmllcz0wO1xyXG4gICAgICAgICAgICBoZXJvSW5mby5zaG9lcz0wO1xyXG4gICAgICAgICAgICBoZXJvSW5mby5wZXQ9MDtcclxuICAgICAgICAgICAgdGhpcy5oZXJvTGlzdC5wdXNoKGhlcm9JbmZvKTtcclxuXHJcbiAgICAgICAgICAgIGhlcm9JbmZvID0gbmV3IEhlcm9PYmplY3QoKTtcclxuICAgICAgICAgICAgaGVyb0luZm8uaGVyb0lkPUhlcm9fVHlwZS5EZUx1WWk7XHJcbiAgICAgICAgICAgIGhlcm9JbmZvLmhlcm9MZXZlbD0xO1xyXG4gICAgICAgICAgICBoZXJvSW5mby5oZXJvU3RhZ2U9MDtcclxuICAgICAgICAgICAgaGVyb0luZm8uaGVyb1dlYXBvblN0YWdlPTA7XHJcbiAgICAgICAgICAgIGhlcm9JbmZvLndlYXBvbnM9MDtcclxuICAgICAgICAgICAgaGVyb0luZm8uYXJtb3I9MDtcclxuICAgICAgICAgICAgaGVyb0luZm8uYWNjZXNzb3JpZXM9MDtcclxuICAgICAgICAgICAgaGVyb0luZm8uc2hvZXM9MDtcclxuICAgICAgICAgICAgaGVyb0luZm8ucGV0PTA7XHJcbiAgICAgICAgICAgIHRoaXMuaGVyb0xpc3QucHVzaChoZXJvSW5mbyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEh0dHBNYW5hZ2VyLnBvc3QoQWNjZXNzTmFtZS5nZXRIZXJvTGlzdCx0aGlzLmdldFVzZXJJbmZvSnNvblN0cmluZygpLGZhbHNlKS50aGVuKChkYXRhOmFueSk9PntcclxuICAgICAgICAgICAgaWYoZGF0YSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhlcm9MaXN0ID0gW107XHJcbiAgICAgICAgICAgICAgICBpZihkYXRhLmxlbmd0aCAhPSAwKXtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLmZvckVhY2goKHYsayk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGhlcm9JbmZvID0gbmV3IEhlcm9PYmplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVyb0luZm8uaGVyb0lkPXYuaGVyb0lkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZXJvSW5mby5oZXJvTGV2ZWw9di5oZXJvTGV2ZWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlcm9JbmZvLmhlcm9TdGFnZT12Lmhlcm9TdGFnZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVyb0luZm8uaGVyb1dlYXBvblN0YWdlPXYuaGVyb1dlYXBvblN0YWdlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZXJvSW5mby53ZWFwb25zPXYud2VhcG9ucztcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVyb0luZm8uYXJtb3I9di5hcm1vcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVyb0luZm8uYWNjZXNzb3JpZXM9di5hY2Nlc3NvcmllcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVyb0luZm8uc2hvZXM9di5zaG9lcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVyb0luZm8ucGV0PXYucGV0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhlcm9MaXN0LnB1c2goaGVyb0luZm8pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGhlcm9JbmZvID0gbmV3IEhlcm9PYmplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICBoZXJvSW5mby5oZXJvSWQ9SGVyb19UeXBlLlNob3VXYW5nO1xyXG4gICAgICAgICAgICAgICAgICAgIGhlcm9JbmZvLmhlcm9MZXZlbD0xO1xyXG4gICAgICAgICAgICAgICAgICAgIGhlcm9JbmZvLmhlcm9TdGFnZT0wO1xyXG4gICAgICAgICAgICAgICAgICAgIGhlcm9JbmZvLmhlcm9XZWFwb25TdGFnZT0wO1xyXG4gICAgICAgICAgICAgICAgICAgIGhlcm9JbmZvLndlYXBvbnM9MDtcclxuICAgICAgICAgICAgICAgICAgICBoZXJvSW5mby5hcm1vcj0wO1xyXG4gICAgICAgICAgICAgICAgICAgIGhlcm9JbmZvLmFjY2Vzc29yaWVzPTA7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVyb0luZm8uc2hvZXM9MDtcclxuICAgICAgICAgICAgICAgICAgICBoZXJvSW5mby5wZXQ9MDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlcm9MaXN0LnB1c2goaGVyb0luZm8pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBoZXJvSW5mbyA9IG5ldyBIZXJvT2JqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVyb0luZm8uaGVyb0lkPUhlcm9fVHlwZS5QYW9TaG91O1xyXG4gICAgICAgICAgICAgICAgICAgIGhlcm9JbmZvLmhlcm9MZXZlbD0xO1xyXG4gICAgICAgICAgICAgICAgICAgIGhlcm9JbmZvLmhlcm9TdGFnZT0wO1xyXG4gICAgICAgICAgICAgICAgICAgIGhlcm9JbmZvLmhlcm9XZWFwb25TdGFnZT0wO1xyXG4gICAgICAgICAgICAgICAgICAgIGhlcm9JbmZvLndlYXBvbnM9MDtcclxuICAgICAgICAgICAgICAgICAgICBoZXJvSW5mby5hcm1vcj0wO1xyXG4gICAgICAgICAgICAgICAgICAgIGhlcm9JbmZvLmFjY2Vzc29yaWVzPTA7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVyb0luZm8uc2hvZXM9MDtcclxuICAgICAgICAgICAgICAgICAgICBoZXJvSW5mby5wZXQ9MDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlcm9MaXN0LnB1c2goaGVyb0luZm8pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBoZXJvSW5mbyA9IG5ldyBIZXJvT2JqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVyb0luZm8uaGVyb0lkPUhlcm9fVHlwZS5EZUx1WWk7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVyb0luZm8uaGVyb0xldmVsPTE7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVyb0luZm8uaGVyb1N0YWdlPTA7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVyb0luZm8uaGVyb1dlYXBvblN0YWdlPTA7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVyb0luZm8ud2VhcG9ucz0wO1xyXG4gICAgICAgICAgICAgICAgICAgIGhlcm9JbmZvLmFybW9yPTA7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVyb0luZm8uYWNjZXNzb3JpZXM9MDtcclxuICAgICAgICAgICAgICAgICAgICBoZXJvSW5mby5zaG9lcz0wO1xyXG4gICAgICAgICAgICAgICAgICAgIGhlcm9JbmZvLnBldD0wO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVyb0xpc3QucHVzaChoZXJvSW5mbyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS5jYXRjaCgoZXJyKT0+e1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIue9kee7nOivt+axguWHuueOsOmXrumimO+8jOi/memHjOaLv+acrOWcsOaVsOaNruS9nOS4uua4uOaIj+S+neaNrlwiKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRTdG9yZURhdGEobm93VGltZTpudW1iZXIpe1xyXG4gICAgICAgIEh0dHBNYW5hZ2VyLnBvc3QoQWNjZXNzTmFtZS5xdWVyeUdhbWVUYXNrLHRoaXMuZ2V0UXVlcnlHYW1lVGFza0pzb25TdHJpbmcoMTApKS50aGVuKChkYXRhOmFueSk9PntcclxuICAgICAgICAgICAgaWYoZGF0YSl7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKG5vd1RpbWUpO1xyXG4gICAgICAgICAgICAgICAgZGF0YS5mb3JFYWNoKCh2LGspPT57XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbGV0IGQxID0gbmV3IERhdGUodi5jcmVhdGVUaW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhkMS5nZXREYXRlKCksZGF0ZS5nZXREYXRlKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKG5ldyBEYXRlKHYuY3JlYXRlVGltZSkuZ2V0RGF0ZSgpID09IGRhdGUuZ2V0RGF0ZSgpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuU3RvcmVEYWlseVNob3BOdW0gKyB2LnBsYXlMZXZlbCwxKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFZJUERhdGEoKXtcclxuICAgICAgICBIdHRwTWFuYWdlci5wb3N0KEFjY2Vzc05hbWUucXVlcnlHYW1lVGFzayx0aGlzLmdldFF1ZXJ5R2FtZVRhc2tKc29uU3RyaW5nKDEpKS50aGVuKChkYXRhOmFueSk9PntcclxuICAgICAgICAgICAgaWYoZGF0YSl7XHJcbiAgICAgICAgICAgICAgICBkYXRhLmZvckVhY2goKHYsayk9PntcclxuICAgICAgICAgICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5WaXBGcmVlUmV3YXJkU3RhdHVzK3YucGxheUxldmVsLDEpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBIdHRwTWFuYWdlci5wb3N0KEFjY2Vzc05hbWUucXVlcnlHYW1lVGFzayx0aGlzLmdldFF1ZXJ5R2FtZVRhc2tKc29uU3RyaW5nKDIpKS50aGVuKChkYXRhOmFueSk9PntcclxuICAgICAgICAgICAgaWYoZGF0YSl7XHJcbiAgICAgICAgICAgICAgICBkYXRhLmZvckVhY2goKHYsayk9PntcclxuICAgICAgICAgICAgICAgICAgICAvLyBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5WaXBGcmVlUmV3YXJkU3RhdHVzK3YucGxheUxldmVsLDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LlZpcEFkdmFuY2VkUmV3YXJkU3RhdHVzK3YucGxheUxldmVsLDEpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFRhc2tEYXRhKCl7XHJcbiAgICAgICAgSHR0cE1hbmFnZXIuZ2FtZVRpbWVQb3N0KEFjY2Vzc05hbWUuZ2V0U2VydmVyVGltZSx0aGlzLmdldFVzZXJJbmZvSnNvblN0cmluZygpKS50aGVuKChkYXRhOmFueSk9PntcclxuICAgICAgICAgICAgaWYoZGF0YS5zZXJ2ZXJUaW1lKXtcclxuICAgICAgICAgICAgICAgIGxldCB0aW1lUyA9IGRhdGEuc2VydmVyVGltZSAqIDEwMDA7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKHRpbWVTKTtcclxuICAgICAgICAgICAgICAgIC8vIOiOt+WPluavj+aXpeS7u+WKoeaVsOaNrlxyXG4gICAgICAgICAgICAgICAgdGhpcy5kYWlseVRhc2tMaXN0ID0gW107XHJcbiAgICAgICAgICAgICAgICBIdHRwTWFuYWdlci5wb3N0KEFjY2Vzc05hbWUucXVlcnlHYW1lQWNoaWV2ZW1lbnRUYXNrLHRoaXMuZ2V0VGFza0luZm9Kc29uU3RyaW5nKDEpKS50aGVuKChkYXRhOmFueSk9PntcclxuICAgICAgICAgICAgICAgICAgICBpZihkYXRhKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5mb3JFYWNoKCh2LGspPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY3JlYXRlRGF0ZSA9IG5ldyBEYXRlKHYuY3JlYXRlVGltZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihkYXRlLmdldERhdGUoKSA9PSBjcmVhdGVEYXRlLmdldERhdGUoKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRhc2tJdGVtOlRhc2tPYmplY3QgPSBuZXcgVGFza09iamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhc2tJdGVtLnRhc2tJZCA9IHYudGFza0lkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhc2tJdGVtLmRpbWVuc2lvbiA9IHYuZGltZW5zaW9uO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhc2tJdGVtLnN0YXR1cyA9IHYuc3RhdHVzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhc2tJdGVtLmVtaXQgPSB2LmVtaXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGFza0l0ZW0uc3RhZ2UgPSB2LnN0YWdlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGFpbHlUYXNrTGlzdC5wdXNoKHRhc2tJdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGFpbHlUYXNrTGlzdC5mb3JFYWNoKCh2LGspPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDorr7nva7mr4/ml6Xku7vliqFpZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuVGFza0lkICsgayx2LnRhc2tJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDorr7nva7mr4/ml6Xku7vliqHnirbmgIFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LlRhc2tTdGF0ZSArIHYudGFza0lkLHYuc3RhdHVzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOiuvue9ruavj+aXpeS7u+WKoeaVsOaNrlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuVGFza051bSArIHYudGFza0lkLHYuZW1pdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL1RPRE8g5qOA5p+l5piv5ZCm5omA5pyJ5Lu75Yqh5pWw5o2u6YO95Yqg6L295a6M5q+VXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8g6I635Y+W5oiQ5bCx5Lu75Yqh5pWw5o2uXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjaGlldmVtZW50VGFza0xpc3QgPSBbXTtcclxuICAgICAgICAgICAgICAgIEh0dHBNYW5hZ2VyLnBvc3QoQWNjZXNzTmFtZS5xdWVyeUdhbWVBY2hpZXZlbWVudFRhc2ssdGhpcy5nZXRUYXNrSW5mb0pzb25TdHJpbmcoMikpLnRoZW4oKGRhdGE6YW55KT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGRhdGEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmZvckVhY2goKHYsayk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0YXNrSXRlbTpUYXNrT2JqZWN0ID0gbmV3IFRhc2tPYmplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRhc2tJdGVtLnRhc2tJZCA9IHYudGFza0lkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGFza0l0ZW0uZGltZW5zaW9uID0gdi5kaW1lbnNpb247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXNrSXRlbS5zdGF0dXMgPSB2LnN0YXR1cztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhc2tJdGVtLmVtaXQgPSB2LmVtaXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXNrSXRlbS5zdGFnZSA9IHYuc3RhZ2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXNrSXRlbS50YXNrVHlwZSA9IHYudGFza1R5cGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFjaGlldmVtZW50VGFza0xpc3QucHVzaCh0YXNrSXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDmmK/mlrDlu7rmiJDlsLHku7vliqHnmoTmlbDmja5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5hY2hpZXZlbWVudFRhc2tMaXN0Lmxlbmd0aCA9PSAwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDE7aSA8IDE1O2krKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRhc2tJdGVtOlRhc2tPYmplY3QgPSBuZXcgVGFza09iamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRhc2tJdGVtLnVpZCA9IFVzZXJEYXRhLmdldEluc3RhbmNlKCkuZ2V0VXNlcklEKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFza0l0ZW0uZGltZW5zaW9uID0gMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXNrSXRlbS50YXNrVHlwZSA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFza0l0ZW0udGFza0lkID0gaSoxMDAwMDArMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXNrSXRlbS5zdGF0dXMgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhc2tJdGVtLnN0YWdlID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXNrSXRlbS5lbWl0ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFjaGlldmVtZW50VGFza0xpc3QucHVzaCh0YXNrSXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSHR0cE1hbmFnZXIucG9zdChBY2Nlc3NOYW1lLnNhdmVHYW1lQWNoaWV2ZW1lbnRUYXNrLHRoaXMuZ2V0U2F2ZUdhbWVBY2hpZXZlbWVudFRhc2tKc29uKHRhc2tJdGVtKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g6L+Z6YeM5piv55So5Lu75Yqh55qE57G75Z6L5ZKM6Zi25q61566X5Ye65Lu75YqhaWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hY2hpZXZlbWVudFRhc2tMaXN0LmZvckVhY2goKHYsayk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LlRhc2tBY2hpZXZlbWVudEluZGV4ICsgdi50YXNrVHlwZSx2LnN0YWdlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LlRhc2tBY2hpZXZlbWVudE51bSArIHYudGFza1R5cGUsdi5lbWl0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LlRhc2tTdGF0ZSArICh2LnRhc2tUeXBlICogMTAwMDAwICsgdi5zdGFnZSArIDEpLHYuc3RhdHVzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy8g6I635Y+W5Li757q/5Lu75Yqh5pWw5o2uXHJcbiAgICAgICAgICAgICAgICB0aGlzLm1haW5UYXNrTGlzdCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgSHR0cE1hbmFnZXIucG9zdChBY2Nlc3NOYW1lLnF1ZXJ5R2FtZUFjaGlldmVtZW50VGFzayx0aGlzLmdldFRhc2tJbmZvSnNvblN0cmluZygzKSkudGhlbigoZGF0YTphbnkpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZGF0YSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuZm9yRWFjaCgodixrKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRhc2tJdGVtOlRhc2tPYmplY3QgPSBuZXcgVGFza09iamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGFza0l0ZW0udGFza0lkID0gdi50YXNrSWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0YXNrSXRlbS5kaW1lbnNpb24gPSB2LmRpbWVuc2lvbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhc2tJdGVtLnN0YXR1cyA9IHYuc3RhdHVzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFza0l0ZW0uZW1pdCA9IHYuZW1pdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhc2tJdGVtLnByb2dyZXNzID0gdi5wcm9ncmVzcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhc2tJdGVtLnN0YWdlID0gdi5zdGFnZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhc2tJdGVtLnRhc2tUeXBlID0gdi50YXNrVHlwZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFpblRhc2tMaXN0LnB1c2godGFza0l0ZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g5paw5bu65Li757q/5Lu75Yqh55qE5pWw5o2uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMubWFpblRhc2tMaXN0Lmxlbmd0aCA9PSAwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDE7aSA8IDE5O2krKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRhc2tJdGVtOlRhc2tPYmplY3QgPSBuZXcgVGFza09iamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRhc2tJdGVtLnVpZCA9IFVzZXJEYXRhLmdldEluc3RhbmNlKCkuZ2V0VXNlcklEKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFza0l0ZW0uZGltZW5zaW9uID0gMztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXNrSXRlbS50YXNrVHlwZSA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFza0l0ZW0udGFza0lkID0gaSoxMDAwMDArMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXNrSXRlbS5zdGF0dXMgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhc2tJdGVtLnN0YWdlID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXNrSXRlbS5lbWl0ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXNrSXRlbS5wcm9ncmVzcyA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWluVGFza0xpc3QucHVzaCh0YXNrSXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSHR0cE1hbmFnZXIucG9zdChBY2Nlc3NOYW1lLnNhdmVHYW1lQWNoaWV2ZW1lbnRUYXNrLHRoaXMuZ2V0U2F2ZUdhbWVBY2hpZXZlbWVudFRhc2tKc29uKHRhc2tJdGVtKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g6L+Z6YeM5piv55So5Lu75Yqh55qE57G75Z6L5ZKM6Zi25q61566X5Ye65Lu75YqhaWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWluVGFza0xpc3QuZm9yRWFjaCgodixrKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuVGFza01haW5JbmRleCArIHYudGFza1R5cGUsdi5zdGFnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5UYXNrTWFpbk51bSArIHYudGFza1R5cGUsdi5lbWl0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LlRhc2tTdGF0ZSArICh2LnRhc2tUeXBlICogMTAwMDAwMDAgKyB2LnN0YWdlICsgMSksdi5zdGF0dXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuVGFza01haW5TaG93SW5kZXgsdi5wcm9ncmVzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyDku7vliqHml6XmtLvot4PlpZblirHpooblj5ZcclxuICAgICAgICAgICAgICAgIEh0dHBNYW5hZ2VyLnBvc3QoQWNjZXNzTmFtZS5xdWVyeUdhbWVUYXNrLHRoaXMuZ2V0UXVlcnlHYW1lVGFza0pzb25TdHJpbmcoNCkpLnRoZW4oKGRhdGE6YW55KT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGRhdGEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmZvckVhY2goKHYsayk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjcmVhdGVEYXRlID0gbmV3IERhdGUodi5jcmVhdGVUaW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGRhdGUuZ2V0RGF0ZSgpID09IGNyZWF0ZURhdGUuZ2V0RGF0ZSgpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDku6PooajmmK/ku4rlpKnlhoXnmoTmlbDmja5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5UYXNrRGFpbHlBY3Rpdml0eVN0YXRlICsgdi5wbGF5TGV2ZWwsMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pOyBcclxuICAgICAgICAgICAgICAgIC8vIOS7u+WKoeWRqOa0u+i3g+mihuWPllxyXG4gICAgICAgICAgICAgICAgSHR0cE1hbmFnZXIucG9zdChBY2Nlc3NOYW1lLnF1ZXJ5R2FtZVRhc2ssdGhpcy5nZXRRdWVyeUdhbWVUYXNrSnNvblN0cmluZyg1KSkudGhlbigoZGF0YTphbnkpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZGF0YSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxldCBkYXRlID0gbmV3IERhdGUodGltZVMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmZvckVhY2goKHYsayk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjcmVhdGVEYXRlID0gbmV3IERhdGUodi5jcmVhdGVUaW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuZ2V0WWVhcldlZWsoZGF0ZSkgPT0gdGhpcy5nZXRZZWFyV2VlayhjcmVhdGVEYXRlKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g5Luj6KGo5piv5pys5ZGo5YaF55qE5pWw5o2uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuVGFza1dlZWtseUFjdGl2aXR5U3RhdGUgKyB2LnBsYXlMZXZlbCwxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvLyDku7vliqHml6XmtLvot4PmlbBcclxuICAgICAgICAgICAgICAgIEh0dHBNYW5hZ2VyLnBvc3QoQWNjZXNzTmFtZS5xdWVyeUdhbWVUYXNrLHRoaXMuZ2V0UXVlcnlHYW1lVGFza0pzb25TdHJpbmcoOCkpLnRoZW4oKGRhdGE6YW55KT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGRhdGEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmZvckVhY2goKHYsayk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxldCBkYXRlID0gbmV3IERhdGUodGltZVMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNyZWF0ZURhdGUgPSBuZXcgRGF0ZSh2LmNyZWF0ZVRpbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZGF0ZS5nZXREYXRlKCkgPT0gY3JlYXRlRGF0ZS5nZXREYXRlKCkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOS7o+ihqOaYr+S7iuWkqeWGheeahOaVsOaNrlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LlRhc2tEYWlseUFjdGl2aXR5TnVtLHYucGxheUxldmVsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvLyDku7vliqHlkajmtLvot4PmlbBcclxuICAgICAgICAgICAgICAgIEh0dHBNYW5hZ2VyLnBvc3QoQWNjZXNzTmFtZS5xdWVyeUdhbWVUYXNrLHRoaXMuZ2V0UXVlcnlHYW1lVGFza0pzb25TdHJpbmcoOSkpLnRoZW4oKGRhdGE6YW55KT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGRhdGEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBsZXQgZGF0ZSA9IG5ldyBEYXRlKHRpbWVTKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5mb3JFYWNoKCh2LGspPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY3JlYXRlRGF0ZSA9IG5ldyBEYXRlKHYuY3JlYXRlVGltZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmdldFllYXJXZWVrKGRhdGUpID09IHRoaXMuZ2V0WWVhcldlZWsoY3JlYXRlRGF0ZSkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOS7o+ihqOaYr+acrOWRqOWGheeahOaVsOaNrlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LlRhc2tXZWVrQWN0aXZpdHlOdW0sdi5wbGF5TGV2ZWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvLyBwcml2YXRlIGdldFN0b3JlSW5mb0pzb25TdHJpbmcodHlwZTpudW1iZXIpOnN0cmluZ3tcclxuICAgIC8vICAgICBsZXQgdWlkPVVzZXJEYXRhLmdldEluc3RhbmNlKCkuZ2V0VXNlcklEKCk7XHJcbiAgICAvLyAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHtcclxuICAgIC8vICAgICAgICAgdWlkOnVpZCxcclxuICAgIC8vICAgICAgICAgcmV3YXJkVHlwZTp0eXBlLFxyXG4gICAgLy8gICAgIH0pOyBcclxuICAgIC8vIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFVzZXJJbmZvSnNvblN0cmluZygpOnN0cmluZ3tcclxuICAgICAgICBsZXQgdWlkPVVzZXJEYXRhLmdldEluc3RhbmNlKCkuZ2V0VXNlcklEKCk7XHJcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgdWlkOnVpZCxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gdHlwZSDku7vliqHnsbvlnovvvIwxLeavj+aXpeS7u+WKoSAyLeaIkOWwseS7u+WKoSAzLeS4u+e6v+S7u+WKoVxyXG4gICAgICogQHJldHVybnMgXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0VGFza0luZm9Kc29uU3RyaW5nKHR5cGU6bnVtYmVyKTpzdHJpbmd7XHJcbiAgICAgICAgbGV0IHVpZD1Vc2VyRGF0YS5nZXRJbnN0YW5jZSgpLmdldFVzZXJJRCgpO1xyXG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgIHVpZDp1aWQsXHJcbiAgICAgICAgICAgIGRpbWVuc2lvbjp0eXBlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gdHlwZSA0LeaXpea0u+i3g+W6puWlluWKsSw1LeWRqOa0u+i3g+W6puWlluWKsSw4LeS7u+WKoeaXpea0u+i3g+W6pu+8jDkt5Lu75Yqh5ZGo5rS76LeD5bqmXHJcbiAgICAgKiBAcmV0dXJucyBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRRdWVyeUdhbWVUYXNrSnNvblN0cmluZyggdHlwZTogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgdWlkID0gVXNlckRhdGEuZ2V0SW5zdGFuY2UoKS5nZXRVc2VySUQoKTtcclxuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICB1aWQ6IHVpZCxcclxuICAgICAgICAgICAgcmV3YXJkVHlwZTogdHlwZSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRZZWFyV2VlayhlbmREYXRlOkRhdGUpe1xyXG4gICAgICAgIGxldCBiZWdpbkRhdGUgPSBuZXcgRGF0ZShlbmREYXRlLmdldEZ1bGxZZWFyKCksMCwxKTtcclxuICAgICAgICBsZXQgZW5kV2VlayA9IGVuZERhdGUuZ2V0RGF5KCk7XHJcbiAgICAgICAgaWYoZW5kV2VlayA9PSAwKWVuZFdlZWsgPSA3O1xyXG4gICAgICAgIGxldCBiZWdpbldlZWsgPSBiZWdpbkRhdGUuZ2V0RGF5KCk7XHJcbiAgICAgICAgaWYoYmVnaW5XZWVrID09IDApYmVnaW5XZWVrID03O1xyXG4gICAgICAgIGxldCBtaWxsaXNEaWZmID0gZW5kRGF0ZS5nZXRUaW1lKCkgLSBiZWdpbkRhdGUuZ2V0VGltZSgpO1xyXG4gICAgICAgIGxldCBkYXlEaWZmID0gTWF0aC5mbG9vcigobWlsbGlzRGlmZiArIChiZWdpbldlZWsgLSBlbmRXZWVrKSooMjQqNjAqNjAqMTAwMCkpLzg2NDAwMDAwKTtcclxuICAgICAgICByZXR1cm4gTWF0aC5jZWlsKGRheURpZmYvNykgKyAxO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gdHlwZSA0LeaXpea0u+i3g+W6puWlluWKsSw1LeWRqOa0u+i3g+W6puWlluWKsSw4LeS7u+WKoeaXpea0u+i3g+W6pu+8jDkt5Lu75Yqh5ZGo5rS76LeD5bqmXHJcbiAgICAgKiBAcmV0dXJucyBcclxuICAgICAqL1xyXG4gICAgIGdldFNhdmVHYW1lVGFza0pzb25TdHJpbmcodmFsdWU6bnVtYmVyLHR5cGU6IG51bWJlcik6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IHVpZCA9IFVzZXJEYXRhLmdldEluc3RhbmNlKCkuZ2V0VXNlcklEKCk7XHJcbiAgICAgICAgbGV0IG51bSA9IHZhbHVlO1xyXG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgIHVpZDogdWlkLFxyXG4gICAgICAgICAgICBwbGF5TGV2ZWw6bnVtLFxyXG4gICAgICAgICAgICByZXdhcmRUeXBlOiB0eXBlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuiOt+WPluaIkOWwseS7u+WKoeS4iuaKpeWPguaVsCAqL1xyXG4gICAgZ2V0U2F2ZUdhbWVBY2hpZXZlbWVudFRhc2tKc29uKHRhc2tJdGVtOlRhc2tPYmplY3QpOnN0cmluZ3tcclxuICAgICAgICBsZXQgdWlkID0gVXNlckRhdGEuZ2V0SW5zdGFuY2UoKS5nZXRVc2VySUQoKTtcclxuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICB1aWQ6dWlkLFxyXG4gICAgICAgICAgICBkaW1lbnNpb246dGFza0l0ZW0uZGltZW5zaW9uLFxyXG4gICAgICAgICAgICB0YXNrVHlwZTp0YXNrSXRlbS50YXNrVHlwZSxcclxuICAgICAgICAgICAgdGFza0lkOnRhc2tJdGVtLnRhc2tJZCxcclxuICAgICAgICAgICAgcHJvZ3Jlc3M6dGFza0l0ZW0ucHJvZ3Jlc3MsXHJcbiAgICAgICAgICAgIHN0YXR1czp0YXNrSXRlbS5zdGF0dXMsXHJcbiAgICAgICAgICAgIHN0YWdlOnRhc2tJdGVtLnN0YWdlLFxyXG4gICAgICAgICAgICBlbWl0OnRhc2tJdGVtLmVtaXQsXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBnZXROb3dEYXkoKTpzdHJpbmd7XHJcbiAgICAgICAgbGV0IHMgPSBcIlwiO1xyXG4gICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgICBzICs9IGRhdGUuZ2V0RnVsbFllYXIoKTtcclxuICAgICAgICBpZihkYXRlLmdldE1vbnRoKCkgKyAxIDwgMTApe1xyXG4gICAgICAgICAgICBzICs9IFwiLTBcIiArIChkYXRlLmdldE1vbnRoKCkgKyAxKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcyArPSBcIi1cIiArIChkYXRlLmdldE1vbnRoKCkgKyAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZGF0ZS5nZXREYXRlKCkgPCAxMCl7XHJcbiAgICAgICAgICAgIHMgKz0gXCItMFwiICsgZGF0ZS5nZXREYXRlKCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHMgKz0gXCItXCIgKyBkYXRlLmdldERhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHM7XHJcbiAgICB9XHJcbn0iXX0=