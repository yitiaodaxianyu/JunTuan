// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { GameScene } from "../Constants";
import GameManager from "../GameManager";
import MapManager from "../GuaJi/MapManager";
import { LevelManager } from "../Level/LevelManager";
import { TutorialLevelManager } from "../Level/TutorialLevel";
import { Follow_Type } from "../multiLanguage/FollowConstants";
import FollowManager from "../multiLanguage/FollowManager";
import TutorailsManager from "../Tutorials/TutorailsManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    // @property(cc.Label)
    // label: cc.Label = null;

    // @property
    // text: string = 'hello';
    @property(cc.Node)
    Comic: cc.Node[] = [];

    @property(cc.Node)
    ProgressBar: cc.Node = null;
    
    time = 0

    @property(cc.Node)
    Loading_Comic: cc.Node = null;
    // LIFE-CYCLE CALLBACKS:
    is_click:boolean=false;
    // onLoad () {}
    protected onEnable(): void {
        // for (let index = 0; index < this.Comic.length; index++) {
            
        let i=0
            this.schedule(function() {
                this.ProgressBar.getComponent(cc.ProgressBar).progress+=0.01
                this.ProgressBar.getChildByName("loadLabel").getComponent(cc.Label).string=(this.ProgressBar.getComponent(cc.ProgressBar).progress*100).toFixed(0)+'%';
                i++
                if(i==100){
                    let time=0.7
                    let times=1
                    this.ProgressBar.parent.active=false
                    this.Loading_Comic.getComponent(sp.Skeleton).setAnimation(0,"animation",false);
                    // cc.tween(this.Comic[0])
                    // // cc.tween()
                    // // .to(1, { scale: 2 }, { easing: 'sineOutIn'})
                    // .to(time, { position:new cc.Vec3(0,465,0)},{ easing: 'quintOut'})
                    // // 当前面的动作都执行完毕后才会调用这个回调函数
                    // .delay(times)
                    // .call(() => { 
                    //     cc.tween(this.Comic[1])
                    //     .to(time, { position:new cc.Vec3(0,164,0)},{ easing: 'quintOut'})
                    //     // 当前面的动作都执行完毕后才会调用这个回调函数
                    //     .delay(times)
                    //     .call(() => { 
                    //         cc.tween(this.Comic[2])
                    //         .to(time, { position:new cc.Vec3(12,-155,0)},{ easing: 'quintOut'})
                    //         // 当前面的动作都执行完毕后才会调用这个回调函数
                    //         .delay(times)
                    //         .call(() => { 
                    //             cc.tween(this.Comic[3])
                    //             .to(time, { position:new cc.Vec3(-30,-474,0)},{ easing: 'quintOut'})
                    //             // 当前面的动作都执行完毕后才会调用这个回调函数
                    //             .call(() => { 
                    //                 // console.log("+++++++")
                    //             })
                    //             .start()
                    //         })
                    //         .start()
                    //     })
                    //     .start()
                    // })
                    // .start()
                }
            }, 0.025, 99);

            // this.scheduleOnce(function() {
                
            // }, 2);
            
            
        // }
    }

    // start () {
        
    // }
    onFirstLevel(){//点击漫画的继续按钮，直接进入下一关\
        if(this.is_click==true)
        return;
        this.is_click=true;
        FollowManager.getInstance().followEvent(Follow_Type.新手引导+200);
        LevelManager.getInstance().start_level=MapManager.Currentlevel=1;
        GameManager.getInstance().fighting_info=TutorialLevelManager.getInstance().getFightingInfo(LevelManager.getInstance().start_level);
        GameManager.getInstance().cur_game_scene=GameScene.game;
        TutorailsManager.getInstance().is_finish_game=false;
        cc.director.loadScene(GameScene.game);
    }

    // update (dt) {
    // this.time+=dt
    // console.log( this.time);
    
    // }
}
