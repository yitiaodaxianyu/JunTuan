import { IsDebug } from "../Constants";
import { StorageKey } from "../Storage/StorageConfig";
import { TheStorageManager } from "../Storage/StorageManager";
import { TowerLevelManager } from "./TowerLevel";
import { TowerRewardManager } from "./TowerReward";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TowerManager extends cc.Component {
    private static _instance: TowerManager = null;
    //资源
    @property(cc.SpriteAtlas)
    tower_atlas:cc.SpriteAtlas=null;

    static is_show_tower:boolean=false;

    public static getInstance():TowerManager {
        return this._instance;
    }

    protected onLoad(): void {
        TowerManager._instance=this;
        this.init();
    }

    protected onDestroy(): void {
        TowerManager._instance=null;
    }

    //初始化游戏数据
    private init () {

    }

    public getSpByName(name:string):cc.SpriteFrame{
        return this.tower_atlas.getSpriteFrame(name);
    }

    /**获得正在挑战的塔的等级 */
    static getTowerLevel():number{
        let level=cc.sys.localStorage.getItem('tower_level');
        if(level==="" || level===null)
        {
            level=1;            
        }else
        {
            level=parseInt(level);            
        }
        return level;
    }

    static addTowerLevel(level:number){
        let newLevel=this.getTowerLevel()+level;
        // let maxLevel=TowerLevelManager.getMaxFloor();
        // if(newLevel<=maxLevel){
        //     this.saveTowerLevel(newLevel);
        // }
        this.saveTowerLevel(newLevel);
    }

    static saveTowerLevel(level:number){
        cc.sys.localStorage.setItem('tower_level',level);
    }

    static getTodayPassNum():number{
        return TheStorageManager.getInstance().getInt(StorageKey.TowerPassNum,0);
    }
    
    static addTodayPassNum(){
        TheStorageManager.getInstance().setItem(StorageKey.TowerPassNum,1+this.getTodayPassNum());
    }

    static resetTodayPassNum(){
        TheStorageManager.getInstance().setItem(StorageKey.TowerPassNum,0);
    }
}