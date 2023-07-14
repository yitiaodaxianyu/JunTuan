
// import { _decorator, Component, macro, Game, game } from 'cc';
// import { FramePublic } from './FramePublic';
// import LocalItemName from './LocalItemName';
// import { OfflineReward } from './OfflineReward';
import { StorageKey } from "../Storage/StorageConfig";
import { TheStorageManager } from "../Storage/StorageManager";
import PublicMethods from "./PublicMethods";
import Turmtable from "./Turmtable";

// import { PublicMethods } from './PublicMethods';
const {ccclass, property} = cc._decorator;
/**
 * Predefined variables
 * Name = Time
 * DateTime = Tue Nov 08 2022 17:51:49 GMT+0800 (中国标准时间)
 * Author = dxq0328
 * FileBasename = Time.ts
 * FileBasenameNoExtension = Time
 * URL = db://assets/Scripts/Frame/Time.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */
 @ccclass
 export default class Times extends cc.Component {
    public static timetxt:cc.Node=null;
    public static Turmtablenode:cc.Node=null;

    public static voidsensid:number=0;//虚空裂缝打到那一层的id
    onLoad() {
        var interval = 1;                       // 以秒为单位的时间间隔
        var repeat = cc.macro.REPEAT_FOREVER;   // 重复次数     // cc.macro.REPEAT_FOREVER
        var delay = 0;      
        cc.game.addPersistRootNode(this.node);                    // 开始延时1秒后开始
        this.schedule(this.Management, interval, repeat, delay);
        //从后台到前台的事件
        // cc.game.on(cc.game.EVENT_HIDE, ()=>{
        //     this.GameShow();
        // }, this);

    }
    Management() {//计时器
        // this.SaveLocalTime();//每隔1秒保存一下时间到本地
        let TurmtableFreeYes=TheStorageManager.getInstance().getNumber(StorageKey.TurmtableFreeYes,0);
        if(TurmtableFreeYes==0){
            let num = TheStorageManager.getInstance().getNumber(StorageKey.TurmtableFreeTime, 900);
            num -= 1;
            TheStorageManager.getInstance().setItem(StorageKey.TurmtableFreeTime, "" + num);
            if(Times.timetxt!=null){
                // @ts-ignore
                if(Times.timetxt._name!=""){
                    Times.timetxt.getComponent(cc.Label).string=""+PublicMethods.timeconversions(num)
                }
            }
            if(num==0){
                TheStorageManager.getInstance().setItem(StorageKey.TurmtableFreeYes, 1);
                if(Times.Turmtablenode!=null){
                    // @ts-ignore
                    if(Times.Turmtablenode._name!=""){
                        Times.Turmtablenode.getComponent(Turmtable).Refresh()
                    }
                }
                
            }
        }
    }
    // SaveLocalTime() {//保存一下本地时间
    //     PublicMethods.setCurrentTime();
    // }
    // GameHide() {//游戏隐藏
    //     cc.game.on(cc.game.EVENT_HIDE, function () {
    //         // console.log("游戏进入后台");
    //         this.SaveLocalTime();//
    //     }, this);
    // }
    // GameShow() {//游戏显示
    //     // OfflineReward.shangdian_24();
    //     // OfflineReward.Time_jianshao();
    // }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.3/manual/zh/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.3/manual/zh/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.3/manual/zh/scripting/life-cycle-callbacks.html
 */
