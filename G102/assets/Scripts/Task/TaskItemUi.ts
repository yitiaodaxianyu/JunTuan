import TextLanguage from "../multiLanguage/TextLanguage";
import Prop from "../Prop/Prop";
import { PropAction, PropId } from "../Prop/PropConfig";
import { PropManager } from "../Prop/PropManager";
import { StorageKey } from "../Storage/StorageConfig";
import { TheStorageManager } from "../Storage/StorageManager";
import { AchievenmentTaskManager, JsonAchievenmentTask } from "./Data/AchievenmentTask";
import { JsonTaskInformation, TaskInformationManager } from "./Data/TaskInformation";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TaskItemUi extends cc.Component {

    call_back:Function = null;
    message:JsonTaskInformation | JsonAchievenmentTask = null;

    initGoingItem(message:JsonTaskInformation | JsonAchievenmentTask,callBack:Function,isAchievement:boolean = false){
        this.message = message;
        this.call_back = callBack;
        let root = this.node.getChildByName("root");
        root.opacity = 255;
        this.node.getChildByName("over").active = false;
        root.getChildByName("contentLabel").getComponent(TextLanguage).setTextId(message.TaskDescription);
        root.getChildByName("contentLabel").getComponent(TextLanguage).setReplaceValue('~',message.TaskParameters+'');
        let reward:cc.Node = root.getChildByName("itemRoot").getChildByName("reward") || null;
        if(reward == null){
            reward = PropManager.getInstance().createPropItem(message.RewardPropID,message.RewardPropNum);
            reward.name = "reward";
            reward.scale = 0.9;
            root.getChildByName("itemRoot").addChild(reward);
        }else{
            reward.getComponent(Prop).init(message.RewardPropID,message.RewardPropNum,PropAction.Look);
        }
        if(isAchievement){
            root.getChildByName("progress1").active = false;
            let progress = root.getChildByName("progress2");
            progress.active = true;

            let info = AchievenmentTaskManager.getInstance().getJsonAchievenmentTask(message.TaskID);
            let now = TheStorageManager.getInstance().getNumber(StorageKey.TaskAchievementNum + info.AchievenmentTaskType,0);
            root.getChildByName("num").getComponent(cc.Label).string = now + "/" + info.TaskParameters;
            progress.children[0].getComponent(cc.Sprite).fillRange = now/info.TaskParameters;
        }else{
            let progress = root.getChildByName("progress1");
            root.getChildByName("progress2").active = false;
            progress.active = true;

            let info = TaskInformationManager.getInstance().getJsonTaskInformation(message.TaskID);
            let now = TheStorageManager.getInstance().getNumber(StorageKey.TaskNum + message.TaskID,0);
            root.getChildByName("num").getComponent(cc.Label).string = now + "/" + info.TaskParameters;
            progress.children[0].getComponent(cc.Sprite).fillRange = now/info.TaskParameters;
        }
        root.getChildByName("finishBtn").active = false;
        root.getChildByName("goingBtn").active = true;
    }

    initFinishItem(message:JsonTaskInformation | JsonAchievenmentTask,callBack:Function,isAchievement:boolean = false){
        this.message = message;
        this.call_back = callBack;
        let root = this.node.getChildByName("root");
        root.opacity = 255;
        this.node.getChildByName("over").active = false;
        root.getChildByName("contentLabel").getComponent(TextLanguage).setTextId(message.TaskDescription);
        root.getChildByName("contentLabel").getComponent(TextLanguage).setReplaceValue('~',message.TaskParameters+'');
        let reward:cc.Node = root.getChildByName("itemRoot").getChildByName("reward") || null;
        if(reward == null){
            reward = PropManager.getInstance().createPropItem(message.RewardPropID,message.RewardPropNum);
            reward.name = "reward";
            reward.scale = 0.9;
            root.getChildByName("itemRoot").addChild(reward);
        }else{
            reward.getComponent(Prop).init(message.RewardPropID,message.RewardPropNum,PropAction.Look);
        }
        if(isAchievement){
            root.getChildByName("progress1").active = false;
            let progress = root.getChildByName("progress2");
            progress.active = true;

            let info = AchievenmentTaskManager.getInstance().getJsonAchievenmentTask(message.TaskID);
            let now = TheStorageManager.getInstance().getNumber(StorageKey.TaskAchievementNum + info.AchievenmentTaskType,0);
            root.getChildByName("num").getComponent(cc.Label).string = now + "/" + info.TaskParameters;
            progress.children[0].getComponent(cc.Sprite).fillRange = now/info.TaskParameters;
        }else{
            let progress = root.getChildByName("progress1");
            root.getChildByName("progress2").active = false;
            progress.active = true;

            let info = TaskInformationManager.getInstance().getJsonTaskInformation(message.TaskID);
            let now = TheStorageManager.getInstance().getNumber(StorageKey.TaskNum + message.TaskID,0);
            root.getChildByName("num").getComponent(cc.Label).string = info.TaskParameters + "/" + info.TaskParameters;
            progress.children[0].getComponent(cc.Sprite).fillRange = info.TaskParameters/info.TaskParameters;
        }
        root.getChildByName("finishBtn").active = true;
        root.getChildByName("goingBtn").active = false;
    }

    initReceivedItem(message:JsonTaskInformation | JsonAchievenmentTask,isAchievement:boolean = false){
        this.message = message;
        let root = this.node.getChildByName("root");
        root.opacity = 180;
        this.node.getChildByName("over").active = true;
        root.getChildByName("contentLabel").getComponent(TextLanguage).setTextId(message.TaskDescription);
        root.getChildByName("contentLabel").getComponent(TextLanguage).setReplaceValue('~',message.TaskParameters+'');
        let reward:cc.Node = root.getChildByName("itemRoot").getChildByName("reward") || null;
        if(reward == null){
            reward = PropManager.getInstance().createPropItem(message.RewardPropID,message.RewardPropNum);
            reward.name = "reward";
            reward.scale = 0.9;
            root.getChildByName("itemRoot").addChild(reward);
        }else{
            reward.getComponent(Prop).init(message.RewardPropID,message.RewardPropNum,PropAction.Look);
        }
        if(isAchievement){
            root.getChildByName("progress1").active = false;
            let progress = root.getChildByName("progress2");
            progress.active = true;

            let info = AchievenmentTaskManager.getInstance().getJsonAchievenmentTask(message.TaskID);
            let now = TheStorageManager.getInstance().getNumber(StorageKey.TaskAchievementNum + info.AchievenmentTaskType,0);
            root.getChildByName("num").getComponent(cc.Label).string = now + "/" + info.TaskParameters;
            progress.children[0].getComponent(cc.Sprite).fillRange = now/info.TaskParameters;
        }else{
            let progress = root.getChildByName("progress1");
            root.getChildByName("progress2").active = false;
            progress.active = true;

            let info = TaskInformationManager.getInstance().getJsonTaskInformation(message.TaskID);
            let now = TheStorageManager.getInstance().getNumber(StorageKey.TaskNum + message.TaskID,0);
            root.getChildByName("num").getComponent(cc.Label).string = info.TaskParameters + "/" + info.TaskParameters;
            progress.children[0].getComponent(cc.Sprite).fillRange = info.TaskParameters/info.TaskParameters;
        }
        root.getChildByName("finishBtn").active = false;
        root.getChildByName("goingBtn").active = false;
    }

    onClickBtn(){
        this.call_back();
    }

}
