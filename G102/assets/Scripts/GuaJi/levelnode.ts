// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { LevelManager } from "../Level/LevelManager";
import { MissionLevelManager } from "../Level/MissionLevel";
import ChallengeRoundPop from "./ChallengeRoundPop";
import MapManager from "./MapManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class levelnode extends cc.Component {

    // @property(cc.Label)
    // label: cc.Label = null;

    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:
    level:number=0//关卡节点代表的是哪个关卡   默认1
    @property(cc.Node)
    Battletoken:cc.Node=null//正在战斗标识
    @property(cc.Node)
    Bosstoken:cc.Node=null//Boss标识
    @property(cc.Node)
    Star:cc.Node[]=[]//星星
    @property(cc.SpriteFrame)
    StarSpriteFrams:cc.SpriteFrame[]=[];//星星  1:亮起  0:灭掉 
    // onLoad () {}

    start () {
        this.node.on(cc.Node.EventType.TOUCH_END,this.onTouchEnd,this);
    }
    // protected onEnable(): void {
        
    // }
    onTouchEnd(){
        // console.log("++++++++",MapManager.ChallengeRoundPops)
        MapManager.ChallengeRoundPops.getComponent(ChallengeRoundPop).init(this.level)
    }
    init(level){
        this.level=level
        let myCurrentlevel=LevelManager.getInstance().finish_level+1;//当前最大关卡
        //坐标
        let pos=MissionLevelManager.getInstance().getJsonLevelPosXY(level)
        // console.log("_________",pos)
        this.node.setPosition(pos)

        //关卡名字
        this.node.getChildByName("level").getComponent(cc.Label).string="第"+MissionLevelManager.getInstance().getLevelName(level)+"章";

        for (let Starindex = 0; Starindex < this.Star.length; Starindex++) {
            this.Star[Starindex].active=false
        }
        this.Battletoken.active=false
        this.Bosstoken.active=false


        // let Starnumber=0;
        // if(level<myCurrentlevel){
        //     for (let LevelStarindex = 1; LevelStarindex <4; LevelStarindex++) {
        //         if(LevelManager.getInstance().getALevelStar(level,LevelStarindex)){
        //             Starnumber++
        //         }
        //     }
        // }
        // for (let Maskindex = 0; Maskindex < this.Mask.length; Maskindex++) {
        //     if(Maskindex<Starnumber){
        //         this.Mask[Maskindex].active=true
        //         this.lqu[Maskindex].active=true
                
        //     }else{
        //         this.Mask[Maskindex].active=false
        //         this.lqu[Maskindex].active=false
        //     } 
        // }
        let Starnumber=0;
        //是否完成的状态
        if(level<myCurrentlevel){//当前关卡小于最大关卡   代表已完成，有星星数量，没有战斗标识
            for (let LevelStarindex = 1; LevelStarindex <4; LevelStarindex++) {
                if(LevelManager.getInstance().getALevelStar(level,LevelStarindex)){
                    Starnumber++
                }
            }
            for (let Starindex = 0; Starindex < this.Star.length; Starindex++) {
                //亮起几颗星星
                this.Star[Starindex].active=true
                if(Starindex<Starnumber){
                    // console.log("___________",Starindex,Starnumber)
                    this.Star[Starindex].getComponent(cc.Sprite).spriteFrame=this.StarSpriteFrams[1]
                }else{
                    this.Star[Starindex].getComponent(cc.Sprite).spriteFrame=this.StarSpriteFrams[0]
                }
            }
        }

        // console.log("++++++++",Starnumber)
        if(level==myCurrentlevel){//当前关卡等于最大关卡   代表正要前往这个关卡   没有星星数量，有战斗标识
            this.Battletoken.active=true
        }
        if(level>myCurrentlevel){
            if(MissionLevelManager.getInstance().getLevelTypes(level)==3){
                if(Starnumber==0){
                    this.Bosstoken.active=true
                }else{
                    this.Bosstoken.active=false
                }
            }
        }
    }

    // update (dt) {}
}
