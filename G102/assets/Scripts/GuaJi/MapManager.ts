// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { LevelManager } from "../Level/LevelManager";
import { MissionLevelManager } from "../Level/MissionLevel";
import Loading from "../Loading/Loading";
import levelnode from "./levelnode";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MapManager extends cc.Component {
    private static _instance: MapManager = null;
    /**进入哪个关卡 */
    public static Currentlevel=0    //    0：关闭游戏重新开始游戏
    @property(cc.Prefab)
    levelnode: cc.Prefab = null;//关卡节点
    @property(cc.Node)
    levelpanten: cc.Node = null;//关卡的父节点

    levelarr:cc.Node[]=[]//已生成的关卡节点


    @property(cc.SpriteFrame)
    bjarr:cc.SpriteFrame[]=[];//章节地图
    
    @property(cc.SpriteFrame)
    bjarr1:cc.SpriteFrame[]=[];//章节地图
    
    @property(cc.SpriteFrame)
    bjarr2:cc.SpriteFrame[]=[];//章节地图
    @property(cc.Node)
    Main_Bg: cc.Node = null;//地图背景
    
    @property(cc.Node)
    Main_Bg_Level_2: cc.Node = null;//背景地图下面

    @property(cc.Node)
    Main_Bg_Level_1: cc.Node = null;//背景地图上面
    // @property(cc.SpriteAtlas)
    // bjarr:cc.SpriteAtlas=null;//章节地图
    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}


    @property(cc.Node)
    ChallengeRoundPop: cc.Node = null;//关卡挑战弹窗

    @property(cc.Node)
    WarChariot: cc.Node = null;//战车



    
    @property(cc.Node)
    shan: cc.Node[] = [];//背景山
        
    @property(cc.Node)
    shu: cc.Node[] = [];//树

    @property(cc.Node)
    caodi: cc.Node[] = [];//草地

    @property(cc.Node)
    cao: cc.Node[] = [];//草

    public static ChallengeRoundPops: cc.Node = null;//关卡挑战弹窗
    start () {
        MapManager.ChallengeRoundPops=this.ChallengeRoundPop
        // console.log("_____",MapManager.ChallengeRoundPops)
        this.instantiatelevelnode()
    }
    public static getInstance():MapManager
    {
        return this._instance;
    }
    protected onLoad(): void {
        // if(MapManager._instance==null){
            MapManager._instance=this;
            //拉取主页图片
        // }
    }

    instantiatelevelnode(){
        let startLevel=LevelManager.getInstance().finish_level+1;//当前最大关卡
        let myCurrentlevel=startLevel
        if(startLevel>=MissionLevelManager.getMaxLevel()){
            myCurrentlevel=MissionLevelManager.getMaxLevel()
        }        
        if(MapManager.Currentlevel==0){

        }else{
            myCurrentlevel=MapManager.Currentlevel;//当前最大关卡
        }
        let Chapter=MissionLevelManager.getInstance().getChapter(myCurrentlevel)//当前关卡的章节

        // console.log("章节：",Chapter,this.Main_Bg)
        // console.log("++++++",myCurrentlevel,Chapter)
        this.Main_Bg.getComponent(cc.Sprite).spriteFrame=this.bjarr[Chapter-1]
        this.Main_Bg_Level_2.getComponent(cc.Sprite).spriteFrame=this.bjarr2[Chapter-1]
        this.Main_Bg_Level_1.getComponent(cc.Sprite).spriteFrame=this.bjarr1[Chapter-1]
        this.WarChariot.getComponent(sp.Skeleton).setSkin("WarChariot_"+Chapter)

        // console.log("++++++++++",LevelManager.getInstance().maininterfacemap)


        for (let shanindex = 0; shanindex < this.shan.length; shanindex++) {
            this.shan[shanindex].getComponent(cc.Sprite).spriteFrame=LevelManager.getInstance().maininterfacemap.get("Home_Chapter"+Chapter+"_0");
        }
        for (let caodindex = 0; caodindex < this.caodi.length; caodindex++) {
            this.caodi[caodindex].getComponent(cc.Sprite).spriteFrame=LevelManager.getInstance().maininterfacemap.get("Home_Chapter"+Chapter+"_1");
        }
        for (let shuindex = 0; shuindex < this.shu.length; shuindex++) {
            this.shu[shuindex].getComponent(cc.Sprite).spriteFrame=LevelManager.getInstance().maininterfacemap.get("Home_Chapter"+Chapter+"_2");
        }
        for (let caoindex = 0; caoindex < this.cao.length; caoindex++) {
            this.cao[caoindex].getComponent(cc.Sprite).spriteFrame=LevelManager.getInstance().maininterfacemap.get("Home_Chapter"+Chapter+"_3");
        }
        
        
        // console.log("坐标：",this.Main_Bg.parent.parent.parent.parent.getPosition())
        for (let index = this.levelarr.length; index <= MissionLevelManager.getInstance().getJsonLevelchapterLength(Chapter); index++) {
            let mylevelnode=cc.instantiate(this.levelnode)
            mylevelnode.parent=this.levelpanten
            this.levelarr.push(mylevelnode)
        }
        for (let levelindex = 0; levelindex < this.levelarr.length; levelindex++) {
            if(levelindex<MissionLevelManager.getInstance().getJsonLevelchapterLength(Chapter)){
                let level=MissionLevelManager.getInstance().getJsonLevelchapterwholeLength(Chapter)+levelindex+1
                this.levelarr[levelindex].getComponent(levelnode).init(level)
                
                // let pos=MissionLevelManager.getInstance().getJsonLevelPosXY(poslevel)
                // this.levelarr[levelindex].setPosition(pos)
                // this.levelarr[levelindex].getChildByName("level").getComponent(cc.Label).string=""+MissionLevelManager.getInstance().getLevelName
                this.levelarr[levelindex].active=true
            }else{
                this.levelarr[levelindex].active=false
            }
        }
    }
    OnxiayizhangBtn(){//点击这个按钮进入下一关
        MapManager.Currentlevel+=1
        if(MapManager.Currentlevel>=35){
            MapManager.Currentlevel=1
        }
        this.instantiatelevelnode()
    }
    // update (dt) {}
}
