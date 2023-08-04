
import WXManagerEX from "../../startscene/WXManagerEX";
import { AccessName, HttpManager } from ".././NetWork/HttpManager";
import ApkManager from "../Ads/ApkManager";
import { Go_Type } from "../Constants";
import EquipItem from "../Equipment/Ui/EquipItem";
import GameManager from "../GameManager";
import ChallengeRoundPop from "../GuaJi/ChallengeRoundPop";
import MapManager from "../GuaJi/MapManager";
import { Hero_Type } from "../Hero/Game/HeroConfig";
import Home from "../Home";
import { LevelManager } from "../Level/LevelManager";
import { Follow_Type } from "../multiLanguage/FollowConstants";
import FollowManager from "../multiLanguage/FollowManager";
import { ItemManager } from "../Prop/Data/Item";
import Prop from "../Prop/Prop";
import { PropAction, PropId } from "../Prop/PropConfig";
import { PropManager } from "../Prop/PropManager";
import { SoundIndex } from "../Sound/AudioConstants";
import { StorageKey } from "../Storage/StorageConfig";
import { TheStorageManager } from "../Storage/StorageManager";
import { EventManager, RedEventString, RedEventType } from "../Tools/EventManager";
import Turmtable from "../Turntable/Turmtable";
import GoldMallUi from "../UI/home/GoldMallUi";
import MainUi from "../UI/home/MainUi";
import UIComponent from "../UI/UIComponent";
import { UILayerLevel, UIPath } from "../UI/UIConfig";
import { UiAction } from "../UI/UiInterface";
import { UIManager } from "../UI/UIManager";
import UserData from "../UserData";
import { UserInfo } from "../UserInfo/UserInfo";
import WishingUi from "../Wish/WishingUi";
import { AccumulatedInformationManager } from "./Data/AccumulatedInformation";
import { JsonAchievenmentTask } from "./Data/AchievenmentTask";
import { JsonTaskInformation, TaskInformationManager } from "./Data/TaskInformation";
import { ThreadTaskInformationManager } from "./Data/ThreadTaskInformation";
import { TaskState, TaskItem } from "./TaskEnum";
import TaskItemUi from "./TaskItemUi";
import TaskMainItemUi from "./TaskMainItemUi";
import TaskManager from "./TaskManager";

const { ccclass, property } = cc._decorator;

enum TaskUiState {
    Daily = 0,
    Achievement,
}

@ccclass
export default class TaskUi extends cc.Component {

    @property(cc.Prefab)
    task_item: cc.Prefab = null;
    @property(cc.SpriteAtlas)
    task_ui: cc.SpriteAtlas = null;

    state: TaskUiState = TaskUiState.Daily;

    protected onLoad(): void {
        this.node.on(cc.Node.EventType.POSITION_CHANGED, this.onPositionChange, this);
    }

    protected onDestroy(): void {
        this.node.off(cc.Node.EventType.POSITION_CHANGED, this.onPositionChange, this);
    }

    onPositionChange() {
        if (this.node.x == 0) {
            this.refreshAchievementTask();
            this.refreshDailyTask();
        }
    }

    protected start(): void {
        this.onInitUi();
    }

    onInitUi() {
        this.state = TaskUiState.Daily;
        let content = this.node.getChildByName("content");
        let top = this.node.getChildByName("top");
        let dailyT = top.getChildByName("daily");
        let dailyC = content.getChildByName("daily");
        if(WXManagerEX.getInstance().statusBarHeight>20){   
            top.getComponent(cc.Widget).top = 100;
            content.getComponent(cc.Widget).top = 100;
        }else{
            top.getComponent(cc.Widget).top = 0;
            content.getComponent(cc.Widget).top = 0;
           // dailyT.getComponent(cc.Widget).top = 158.50;
            
        }
        top.children[0].getChildByName("tag1").getComponent(cc.Sprite).spriteFrame = this.task_ui.getSpriteFrame("Task_Bg_2");
        top.children[0].getChildByName("tag2").getComponent(cc.Sprite).spriteFrame = this.task_ui.getSpriteFrame("Task_Bg_3");
        top.children[0].getChildByName("tagLabel1").color = cc.color(116, 82, 55);
        top.children[0].getChildByName("tagLabel2").color = cc.color(91, 69, 52);

        // let daily = this.node.getChildByName("daily");
        let achievement = content.getChildByName("achievement");


        // 总活跃 1天100 一周500
        let weekActivityNum = TheStorageManager.getInstance().getNumber(StorageKey.TaskWeekActivityNum, 0);
        let dailyActivityNum = TheStorageManager.getInstance().getNumber(StorageKey.TaskDailyActivityNum, 0);
        dailyT.getChildByName("weekActivityNum").getComponent(cc.Label).string = weekActivityNum + '';
        dailyT.getChildByName("dailyActivityNum").getComponent(cc.Label).string = dailyActivityNum + '';

        // 活跃进度条
        dailyT.getChildByName("weekActivity1").getComponent(cc.Sprite).fillRange = weekActivityNum / 500;
        if (weekActivityNum >= 500) {
            dailyT.getChildByName("weekActivity2").active = true;
        } else {
            dailyT.getChildByName("weekActivity2").active = false;
        }

        dailyT.getChildByName("dailyActivity1").getComponent(cc.Sprite).fillRange = dailyActivityNum / 100;
        if (dailyActivityNum >= 100) {
            dailyT.getChildByName("dailyActivity2").active = true;
        } else {
            dailyT.getChildByName("dailyActivity2").active = false;
        }
        // 处理累计积分奖励
        let weekAccumulateData = AccumulatedInformationManager.getInstance().getRewardByTaskType(2);
        let dailyAccumulateData = AccumulatedInformationManager.getInstance().getRewardByTaskType(1);

        weekAccumulateData.forEach((v, k) => {
            let item: cc.Node;
            let itemRoot = dailyT.getChildByName("week" + (k + 1));
            if (weekActivityNum >= v.AccumulatedPoints
                && TheStorageManager.getInstance().getNumber(StorageKey.TaskWeeklyActivityState + v.AccumulatedPoints, 0) == 0) {
                item = PropManager.getInstance().createPropItem(v.PropID_1, v.PropNum_1, PropAction.Null);
                itemRoot.children[0].active = true;
                item.on(cc.Node.EventType.TOUCH_END, function FF() {
                    // 领取奖励
                    FollowManager.getInstance().followEvent(Follow_Type.周活跃每一档奖励的领取次数 + v.AccumulatedPointsID);
                    itemRoot.children[0].active = false;
                    PropManager.getInstance().changePropNum(v.PropID_1, v.PropNum_1);
                    TheStorageManager.getInstance().setItem(StorageKey.TaskWeeklyActivityState + v.AccumulatedPoints, 1);
                    GameManager.getInstance().showGetTip(item);
                    item.off(cc.Node.EventType.TOUCH_END, FF);
                    let type = ItemManager.getInstance().getType(v.PropID_1);
                    if (type == 3) {
                        item.getComponent(EquipItem).init(Hero_Type.NULL, v.PropID_1, PropAction.Look);
                    } else {
                        item.getComponent(Prop).init(v.PropID_1, v.PropNum_1, PropAction.Look);
                    }
                    let mask = new cc.Node();
                    mask.opacity = 150;
                    mask.addComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByName("Item_frame_Dark");
                    let gou = new cc.Node();
                    gou.addComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByName("SignIn_Got");
                    mask.addChild(gou);
                    item.addChild(mask);
                    EventManager.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Task);
                    HttpManager.post(AccessName.saveGameTask,UserInfo.getInstance().getSaveGameTaskJsonString(v.AccumulatedPoints,5));
                });
            } else if (weekActivityNum >= v.AccumulatedPoints
                && TheStorageManager.getInstance().getNumber(StorageKey.TaskWeeklyActivityState + v.AccumulatedPoints, 0) == 1) {
                item = PropManager.getInstance().createPropItem(v.PropID_1, v.PropNum_1);
                itemRoot.children[0].active = false;
                let mask = new cc.Node();
                mask.opacity = 150;
                mask.addComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByName("Item_frame_Dark");
                let gou = new cc.Node();
                gou.addComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByName("SignIn_Got");
                mask.addChild(gou);
                item.addChild(mask);
            } else if (weekActivityNum < v.AccumulatedPoints) {
                itemRoot.children[0].active = false;
                item = PropManager.getInstance().createPropItem(v.PropID_1, v.PropNum_1);
            }
            item.scale = 0.7;
            itemRoot.addChild(item);
        });

        dailyAccumulateData.forEach((v, k) => {
            let item: cc.Node;
            let itemRoot = dailyT.getChildByName("daily" + (k + 1));
            if (dailyActivityNum >= v.AccumulatedPoints
                && TheStorageManager.getInstance().getNumber(StorageKey.TaskDailyActivityState + v.AccumulatedPoints, 0) == 0) {
                item = PropManager.getInstance().createPropItem(v.PropID_1, v.PropNum_1, PropAction.Null);
                itemRoot.children[0].active = true;
                item.on(cc.Node.EventType.TOUCH_END, function FF() {
                    // 领取奖励
                    FollowManager.getInstance().followEvent(Follow_Type.日活跃每一档奖励的领取次数 + v.AccumulatedPointsID);
                    itemRoot.children[0].active = false;
                    PropManager.getInstance().changePropNum(v.PropID_1, v.PropNum_1);
                    TheStorageManager.getInstance().setItem(StorageKey.TaskDailyActivityState + v.AccumulatedPoints, 1);
                    GameManager.getInstance().showGetTip(item);
                    item.off(cc.Node.EventType.TOUCH_END, FF);
                    let type = ItemManager.getInstance().getType(v.PropID_1);
                    if (type == 3) {
                        item.getComponent(EquipItem).init(Hero_Type.NULL, v.PropID_1, PropAction.Look);
                    } else {
                        item.getComponent(Prop).init(v.PropID_1, v.PropNum_1, PropAction.Look);
                    }
                    let mask = new cc.Node();
                    mask.opacity = 150;
                    mask.addComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByName("Item_frame_Dark");
                    let gou = new cc.Node();
                    gou.addComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByName("SignIn_Got");
                    mask.addChild(gou);
                    item.addChild(mask);
                    EventManager.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Task);
                    HttpManager.post(AccessName.saveGameTask,UserInfo.getInstance().getSaveGameTaskJsonString(v.AccumulatedPoints,4));
                });
            } else if (dailyActivityNum >= v.AccumulatedPoints
                && TheStorageManager.getInstance().getNumber(StorageKey.TaskDailyActivityState + v.AccumulatedPoints, 0) == 1) {
                itemRoot.children[0].active = false;
                item = PropManager.getInstance().createPropItem(v.PropID_1, v.PropNum_1);
                let mask = new cc.Node();
                mask.opacity = 150;
                mask.addComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByName("Item_frame_Dark");
                let gou = new cc.Node();
                gou.addComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByName("SignIn_Got");
                mask.addChild(gou);
                item.addChild(mask);
            } else if (dailyActivityNum < v.AccumulatedPoints) {
                itemRoot.children[0].active = false;
                item = PropManager.getInstance().createPropItem(v.PropID_1, v.PropNum_1);
            }
            item.scale = 0.7;
            itemRoot.addChild(item);
        });

        // 处理任务
        TaskManager.getInstance().sortDailyTask();
        let dailyTask = TaskManager.getInstance().getDailyTaskList();
        let dailyContent = dailyC.getChildByName("scroll").getComponent(cc.ScrollView).content;
        dailyTask.forEach((v, k) => {
            let item = cc.instantiate(this.task_item);
            item.name = "task" + k;
            let state = TheStorageManager.getInstance().getNumber(StorageKey.TaskState + v.TaskID, 0);
            switch (state) {
                case TaskState.Ongoing:
                    item.getComponent(TaskItemUi).initGoingItem(v, () => {
                        this.onClickGoBtn(v.TaskID);
                    });
                    break;
                case TaskState.Completed:
                    item.getComponent(TaskItemUi).initFinishItem(v, () => {
                        this.onClickDailyTaskFinish(item, v);
                    });
                    break;
                case TaskState.Received:
                    item.getComponent(TaskItemUi).initReceivedItem(v);
                    break;
            }
            dailyContent.addChild(item);
        });

        let achievementTask = TaskManager.getInstance().getAchievementTaskData();
        let achievementContent = achievement.getChildByName("scroll").getComponent(cc.ScrollView).content;
        achievementTask.forEach((v, k) => {
            if (v == null) {
                return;
            }
            let item = cc.instantiate(this.task_item);
            item.name = "task" + k;
            let state = TheStorageManager.getInstance().getNumber(StorageKey.TaskState + v.TaskID, 0);
            switch (state) {
                case TaskState.Ongoing:
                    item.getComponent(TaskItemUi).initGoingItem(v, () => {
                        let id = v.AchievenmentTaskType * 100000 + 1;
                        this.onClickGoBtn(id);
                    }, true);
                    break;
                case TaskState.Completed:
                    item.getComponent(TaskItemUi).initFinishItem(v, () => {
                        this.onClickAchievementTaskFinish(item, v);
                    }, true);
                    break;
                case TaskState.Received:
                    item.getComponent(TaskItemUi).initReceivedItem(v, true);
                    break;
            }
            achievementContent.addChild(item);
        });
    }

    refreshDailyTask() {
        let content = this.node.getChildByName("content");
        let top = this.node.getChildByName("top");

        let dailyT = top.getChildByName("daily");
        let dailyC = content.getChildByName("daily");
        // 总活跃 1天100 一周500
        let weekActivityNum = TheStorageManager.getInstance().getNumber(StorageKey.TaskWeekActivityNum, 0);
        let dailyActivityNum = TheStorageManager.getInstance().getNumber(StorageKey.TaskDailyActivityNum, 0);
        dailyT.getChildByName("weekActivityNum").getComponent(cc.Label).string = weekActivityNum + '';
        dailyT.getChildByName("dailyActivityNum").getComponent(cc.Label).string = dailyActivityNum + '';

        // 活跃进度条
        dailyT.getChildByName("weekActivity1").getComponent(cc.Sprite).fillRange = weekActivityNum / 500;
        if (weekActivityNum >= 500) {
            dailyT.getChildByName("weekActivity2").active = true;
        } else {
            dailyT.getChildByName("weekActivity2").active = false;
        }

        dailyT.getChildByName("dailyActivity1").getComponent(cc.Sprite).fillRange = dailyActivityNum / 100;
        if (dailyActivityNum >= 100) {
            dailyT.getChildByName("dailyActivity2").active = true;
        } else {
            dailyT.getChildByName("dailyActivity2").active = false;
        }
        // 处理累计积分奖励
        let weekAccumulateData = AccumulatedInformationManager.getInstance().getRewardByTaskType(2);
        let dailyAccumulateData = AccumulatedInformationManager.getInstance().getRewardByTaskType(1);

        weekAccumulateData.forEach((v, k) => {
            let item: cc.Node;
            let itemRoot = dailyT.getChildByName("week" + (k + 1));
            if (weekActivityNum >= v.AccumulatedPoints
                && TheStorageManager.getInstance().getNumber(StorageKey.TaskWeeklyActivityState + v.AccumulatedPoints, 0) == 0) {
                itemRoot.children[0].active = true;
                item = itemRoot.children[1];
                let type = ItemManager.getInstance().getType(v.PropID_1);
                if (type == 3) {
                    item.getComponent(EquipItem).init(Hero_Type.NULL, v.PropID_1, PropAction.Null);
                } else {
                    item.getComponent(Prop).init(v.PropID_1, v.PropNum_1, PropAction.Null);
                }
                item.off(cc.Node.EventType.TOUCH_END);
                item.on(cc.Node.EventType.TOUCH_END, function FF() {
                    // 领取奖励
                    FollowManager.getInstance().followEvent(Follow_Type.周活跃每一档奖励的领取次数 + v.AccumulatedPointsID);
                    itemRoot.children[0].active = false;
                    PropManager.getInstance().changePropNum(v.PropID_1, v.PropNum_1);
                    TheStorageManager.getInstance().setItem(StorageKey.TaskWeeklyActivityState + v.AccumulatedPoints, 1);
                    GameManager.getInstance().showGetTip(item);
                    item.off(cc.Node.EventType.TOUCH_END, FF);
                    // let type = ItemManager.getInstance().getType(v.PropID_1);
                    if (type == 3) {
                        item.getComponent(EquipItem).init(Hero_Type.NULL, v.PropID_1, PropAction.Look);
                        item.on(cc.Node.EventType.TOUCH_END, () => {
                            item.getComponent(EquipItem).onClick();
                        });
                    } else {
                        item.getComponent(Prop).init(v.PropID_1, v.PropNum_1, PropAction.Look);
                        item.on(cc.Node.EventType.TOUCH_END, () => {
                            item.getComponent(Prop).onClick();
                        });
                    }
                    let mask = new cc.Node();
                    mask.opacity = 150;
                    mask.addComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByName("Item_frame_Dark");
                    let gou = new cc.Node();
                    gou.addComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByName("SignIn_Got");
                    mask.addChild(gou);
                    item.addChild(mask);
                    EventManager.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Task);
                    HttpManager.post(AccessName.saveGameTask,UserInfo.getInstance().getSaveGameTaskJsonString(v.AccumulatedPoints,5));
                });
            }else{
                itemRoot.children[0].active = false;
            }
        });

        dailyAccumulateData.forEach((v, k) => {
            let item: cc.Node;
            let itemRoot = dailyT.getChildByName("daily" + (k + 1));
            if (dailyActivityNum >= v.AccumulatedPoints
                && TheStorageManager.getInstance().getNumber(StorageKey.TaskDailyActivityState + v.AccumulatedPoints, 0) == 0) {
                itemRoot.children[0].active = true;
                item = itemRoot.children[1];
                let type = ItemManager.getInstance().getType(v.PropID_1);
                if (type == 3) {
                    item.getComponent(EquipItem).init(Hero_Type.NULL, v.PropID_1, PropAction.Null);
                } else {
                    item.getComponent(Prop).init(v.PropID_1, v.PropNum_1, PropAction.Null);
                }
                item.off(cc.Node.EventType.TOUCH_END);
                item.on(cc.Node.EventType.TOUCH_END, function FF() {
                    // 领取奖励
                    FollowManager.getInstance().followEvent(Follow_Type.日活跃每一档奖励的领取次数 + v.AccumulatedPointsID);
                    itemRoot.children[0].active = false;
                    PropManager.getInstance().changePropNum(v.PropID_1, v.PropNum_1);
                    TheStorageManager.getInstance().setItem(StorageKey.TaskDailyActivityState + v.AccumulatedPoints, 1);
                    GameManager.getInstance().showGetTip(item);
                    item.off(cc.Node.EventType.TOUCH_END, FF);
                    // let type = ItemManager.getInstance().getType(v.PropID_1);
                    if (type == 3) {
                        item.getComponent(EquipItem).init(Hero_Type.NULL, v.PropID_1, PropAction.Look);
                        item.on(cc.Node.EventType.TOUCH_END, () => {
                            item.getComponent(EquipItem).onClick();
                        });
                    } else {
                        item.getComponent(Prop).init(v.PropID_1, v.PropNum_1, PropAction.Look);
                        item.on(cc.Node.EventType.TOUCH_END, () => {
                            item.getComponent(Prop).onClick();
                        });
                    }
                    let mask = new cc.Node();
                    mask.opacity = 150;
                    mask.addComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByName("Item_frame_Dark");
                    let gou = new cc.Node();
                    gou.addComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByName("SignIn_Got");
                    mask.addChild(gou);
                    item.addChild(mask);
                    EventManager.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Task);
                    HttpManager.post(AccessName.saveGameTask,UserInfo.getInstance().getSaveGameTaskJsonString(v.AccumulatedPoints,4));
                });
            }else{
                itemRoot.children[0].active = false;
            }
        });


        // 处理任务
        TaskManager.getInstance().sortDailyTask();
        let dailyTask = TaskManager.getInstance().getDailyTaskList();
        let dailyContent = dailyC.getChildByName("scroll").getComponent(cc.ScrollView).content;
        if (dailyContent.childrenCount == 0) {
            dailyTask.forEach((v, k) => {
                let item = cc.instantiate(this.task_item);
                item.name = "task" + k;
                let state = TheStorageManager.getInstance().getNumber(StorageKey.TaskState + v.TaskID, 0);
                switch (state) {
                    case TaskState.Ongoing:
                        item.getComponent(TaskItemUi).initGoingItem(v, () => {
                            this.onClickGoBtn(v.TaskID);
                        });
                        break;
                    case TaskState.Completed:
                        item.getComponent(TaskItemUi).initFinishItem(v, () => {
                            this.onClickDailyTaskFinish(item, v);
                        });
                        break;
                    case TaskState.Received:
                        item.getComponent(TaskItemUi).initReceivedItem(v);
                        break;
                }
                dailyContent.addChild(item);
            });
        } else {
            dailyTask.forEach((v, k) => {
                let item = dailyContent.getChildByName("task" + k);
                let state = TheStorageManager.getInstance().getNumber(StorageKey.TaskState + v.TaskID, 0);
                switch (state) {
                    case TaskState.Ongoing:
                        item.getComponent(TaskItemUi).initGoingItem(v, () => {
                            this.onClickGoBtn(v.TaskID);
                        });
                        break;
                    case TaskState.Completed:
                        item.getComponent(TaskItemUi).initFinishItem(v, () => {
                            this.onClickDailyTaskFinish(item, v);
                        });
                        break;
                    case TaskState.Received:
                        item.getComponent(TaskItemUi).initReceivedItem(v);
                        break;
                }
            });
        }
    }

    refreshAchievementTask() {
        let content = this.node.getChildByName("content");
        let achievement = content.getChildByName("achievement");
        TaskManager.getInstance().sortAchievementTask();
        let achievementTask = TaskManager.getInstance().getAchievementTaskData();
        let achievementContent = achievement.getChildByName("scroll").getComponent(cc.ScrollView).content;
        achievementTask.forEach((v, k) => {
            let item = achievementContent.getChildByName("task" + k);
            if(item == null) return;
            if (v == null) {
                achievementContent.removeChild(item);
                return;
            }
            let state = TheStorageManager.getInstance().getNumber(StorageKey.TaskState + v.TaskID, 0);
            switch (state) {
                case TaskState.Ongoing:
                    item.getComponent(TaskItemUi).initGoingItem(v, () => {
                        let id = v.AchievenmentTaskType * 100000 + 1;
                        this.onClickGoBtn(id);
                    }, true);
                    break;
                case TaskState.Completed:
                    item.getComponent(TaskItemUi).initFinishItem(v, () => {
                        this.onClickAchievementTaskFinish(item, v);
                    }, true);
                    break;
                case TaskState.Received:
                    achievementContent.removeChild(item);
                    break;
            }
        });
    }

    onClickDailyTaskFinish(taskItem: cc.Node, info: JsonTaskInformation) {
        TaskManager.getInstance().overTask(info.TaskID);
        FollowManager.getInstance().followEvent(Follow_Type.每日任务完成数量 + info.TaskID);
        // 刷新日常任务
        this.refreshDailyTask();
        EventManager.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Task);
    }

    onClickAchievementTaskFinish(taskItem: cc.Node, info: JsonAchievenmentTask) {
        TaskManager.getInstance().overTask(info.TaskID);
        PropManager.getInstance().changePropNum(info.RewardPropID, info.RewardPropNum);
        let reward = PropManager.getInstance().createPropItem(info.RewardPropID, info.RewardPropNum);
        GameManager.getInstance().showGetTip(reward);
        FollowManager.getInstance().followEvent(Follow_Type.成就任务完成数量 + info.TaskID);
        //刷新成就任务
        this.refreshAchievementTask();
        EventManager.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Task);
    }

    onClickGoBtn(taskItem: TaskItem) {
        switch (taskItem) {
            case TaskItem.升级1次英雄:
            case TaskItem.升星1次英雄:
            case TaskItem.升级1次装备:
            case TaskItem.升级1次装备品级:
            case TaskItem.升级1次宠物:
            case TaskItem.升级1次专武:
            case TaskItem.将任意X名英雄升到10级:
            case TaskItem.为任意X名英雄穿戴1件装备:
            case TaskItem.将炮手升至1大星:
            case TaskItem.合成X次装备:
            case TaskItem.累计1个英雄升到X级:
            case TaskItem.累计1个英雄升到X星:
            case TaskItem.累计X件装备到达品质6:
            case TaskItem.升级X次灵宠:
            case TaskItem.累计将X只宠物升至最高品质:
                // 跳转到英雄列表
                GameManager.getInstance().game_to_home = Go_Type.Role;
                GameManager.getInstance().jumoAndShowUi();
                break;
            case TaskItem.挑战1次关卡:
            case TaskItem.挑战3次关卡:
            case TaskItem.登录游戏1次:
            case TaskItem.观看任意1次广告:
            case TaskItem.登录X次游戏:
            case TaskItem.释放X次人物技能:
            case TaskItem.上阵X名英雄:
            case TaskItem.累计通过X关:
            case TaskItem.转动转盘1次:
            case TaskItem.通过第X章:
            case TaskItem.累计登录X天:
                        // 跳转到战斗
                        GameManager.getInstance().game_to_home = Go_Type.Main;
                        GameManager.getInstance().jumoAndShowUi();
                        break;
            case TaskItem.转盘X次:
                UIManager.getInstance().showUiDialog(UIPath.Turntable,UILayerLevel.One,{onCompleted:(uiNode)=> {
                    uiNode.getComponent(Turmtable).initUi()
                },});
                break;
            case TaskItem.通关X:
                MapManager.ChallengeRoundPops.getComponent(ChallengeRoundPop).init(LevelManager.getInstance().finish_level+1);
                break;
            case TaskItem.挑战1次无尽挑战:
            case TaskItem.挑战X次无尽挑战:
            case TaskItem.挑战1次BOSS狩猎:
            case TaskItem.挑战X次boss狩猎:
            case TaskItem.挑战1次爬塔:
            case TaskItem.挑战1次冰河探险:
            case TaskItem.挑战3次无尽挑战:
            case TaskItem.挑战3次BOSS狩猎:
            case TaskItem.挑战3次爬塔:
                //跳转到副本
                GameManager.getInstance().game_to_home = Go_Type.Activity;
                GameManager.getInstance().jumoAndShowUi();
                break;
            case TaskItem.进行1次开启装备:
            case TaskItem.进行1次宠物招募:
            case TaskItem.进行1次英雄招募:
            case TaskItem.商店中购买物品1次:
            case TaskItem.购买1次商店中的金币:
            case TaskItem.招募X次英雄:
            case TaskItem.前往商城购买X次商品:
            case TaskItem.前往商城孵化X次宠物:
            case TaskItem.累计收集X个英雄:
            case TaskItem.累计获得X件装备:
            case TaskItem.累计招募X个英雄:
            case TaskItem.累计孵化灵宠蛋X次:
            case TaskItem.进行10次开启装备:
            case TaskItem.进行10次宠物孵化:
            case TaskItem.进行10次英雄招募:
                // 跳转到商店
                GameManager.getInstance().game_to_home = Go_Type.City;
                GameManager.getInstance().jumoAndShowUi();
                break;
            case TaskItem.完成X次每日任务:
                this.onClickTagBtn(null,TaskUiState.Daily)
                GameManager.getInstance().game_to_home = Go_Type.PetList;
                GameManager.getInstance().jumoAndShowUi();
                break;
            case TaskItem.完成X次成就任务:
                this.onClickTagBtn(null,TaskUiState.Achievement)
                GameManager.getInstance().game_to_home = Go_Type.PetList;
                GameManager.getInstance().jumoAndShowUi();
                break;
            case TaskItem.领取挂机奖励2次:
            case TaskItem.领取快速挂机1次:
                // 跳转到挂机
                GameManager.getInstance().game_to_home = Go_Type.Main;
                GameManager.getInstance().jumoAndShowUi();
                break;
            case TaskItem.进行账号绑定:
                // 弹出设置界面
                cc.find("Canvas").getComponent(Home).clickBtnSetting();
                break;
            // 升级1次英雄=11001,
            // 升星1次英雄=12001,
            // 升级1次装备=13001,
            // 升级1次装备品级=14001,
            // 升级1次宠物=15001,
            // 升级1次专武=16001,
            // 挑战1次关卡=21001,
            // 挑战1次无尽挑战=22001,
            // 挑战1次BOSS狩猎=23001,
            // 挑战1次爬塔=24001,
            // 挑战1次冰河探险=25001,
            // 挑战3次关卡=21002,
            // 挑战3次无尽挑战=22002,
            // 挑战3次BOSS狩猎=23002,
            // 挑战3次爬塔=24002,
            // 进行1次开启装备=31001,
            // 进行1次宠物招募=32002,
            // 进行1次英雄招募=33001,
            // 商店中购买物品1次=34001,
            // 购买1次商店中的金币=35001,
            // 登录游戏1次=41001,
            // 领取挂机奖励2次=42002,
            // 领取快速挂机1次=43003,
            // 观看任意1次广告=44004,
            // // 主线任务
            // 登录1次游戏=101,
            // 释放1次人物技能=102,
            // 通关1_1=103,
            // 上阵2名英雄=104,
            // 通关1_4=105,
            // 招募1次英雄=106,
            // 上阵4名英雄=107,
            // 通关1_5=108,
            // 通关2_1=109,
            // 将任意1名英雄升到10级=110,
            // 通关2_3=111,
            // 为任意1名英雄穿戴1件装备=112,
            // 通关2_5=113,
            // 将炮手升至1大星=114,
            // 通关2_6=115,
            // 完成1次每日任务=116,
            // 完成1次成就任务=117,
            // 通关2_7=118,
            // 前往商城购买1次商品=119,
            // 合成1次装备=120,
            // 通关2_10=121,
            // 通关3_5=122,
            // 前往商城孵化1次宠物=123,
            // 通关3_10=124,
            // // 成就任务
            // 累计通过X关 = 100001,
            // 累计1个英雄升到X级 = 200001,
            // 累计收集X个英雄 = 300001,
            // 累计1个英雄升到X星 = 400001,
            // 累计获得X件装备 = 500001,
            // 累计X件装备到达品质5 = 600001,
            // 累计招募X个英雄 = 700001
        }
    }

    onClickTagBtn(e, state: number) {
        let content = this.node.getChildByName("content");
        let top = this.node.getChildByName("top");
        state = Number(state);
        switch (state) {
            case TaskUiState.Daily:
                this.state = TaskUiState.Daily;
                FollowManager.getInstance().followEvent(Follow_Type.任务_日常页签点击次数);
                top.children[0].getChildByName("tag1").getComponent(cc.Sprite).spriteFrame = this.task_ui.getSpriteFrame("Task_Bg_2");
                top.children[0].getChildByName("tag2").getComponent(cc.Sprite).spriteFrame = this.task_ui.getSpriteFrame("Task_Bg_3");
                top.children[0].getChildByName("tagLabel1").color = cc.color(116, 82, 55);
                top.children[0].getChildByName("tagLabel2").color = cc.color(91, 69, 52);
                content.getChildByName("achievement").active = false;
                content.getChildByName("daily").active = true;
                top.getChildByName("daily").active = true;
                break;
            case TaskUiState.Achievement:
                this.state = TaskUiState.Achievement;
                FollowManager.getInstance().followEvent(Follow_Type.任务_成就页签点击次数);
                top.children[0].getChildByName("tag2").getComponent(cc.Sprite).spriteFrame = this.task_ui.getSpriteFrame("Task_Bg_2");
                top.children[0].getChildByName("tag1").getComponent(cc.Sprite).spriteFrame = this.task_ui.getSpriteFrame("Task_Bg_3");
                top.children[0].getChildByName("tagLabel2").color = cc.color(116, 82, 55);
                top.children[0].getChildByName("tagLabel1").color = cc.color(91, 69, 52);
                content.getChildByName("achievement").active = true;
                content.getChildByName("daily").active = false;
                top.getChildByName("daily").active = false;
                break;
        }
    }

    onClickMainTaskUi() {
        let taskInfo = TaskManager.getInstance().getMainTaskData();
        let taskState = TheStorageManager.getInstance().getNumber(StorageKey.TaskState + taskInfo.ThreadTaskID, 0);
        switch (taskState) {
            case 0:
                let id = Math.floor(taskInfo.ThreadTaskID / 1000) * 1000 + 1;
                this.onClickGoBtn(id);
                return;
                break;
            case 1:
                TaskManager.getInstance().overTask(taskInfo.ThreadTaskID);
                PropManager.getInstance().changePropNum(taskInfo.PropID_1, taskInfo.PropNum_1);
                PropManager.getInstance().changePropNum(taskInfo.PropID_2, taskInfo.PropNum_2);
                let reward1 = PropManager.getInstance().createPropItem(taskInfo.PropID_1, taskInfo.PropNum_1);
                let reward2 = PropManager.getInstance().createPropItem(taskInfo.PropID_2, taskInfo.PropNum_2);
                GameManager.getInstance().showMultipleGetTip([reward1, reward2]);
                FollowManager.getInstance().followEvent(Follow_Type.主线任务完成人数数量_x+taskInfo.ThreadTaskID);
                //刷新主线任务显示
                this.scheduleOnce(() => {
                    cc.find('Canvas/main_ui').getComponent(MainUi).refreshMainTaskUi();
                }, 0.01);
                return;
                break;
            case 2:

                break;
        }
    }
    
}
