// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import MapManager from "../GuaJi/MapManager";
import { LevelManager } from "../Level/LevelManager";
import { MissionLevelManager } from "../Level/MissionLevel";
import TextLanguage from "../multiLanguage/TextLanguage";
import ChapterPop from "./ChapterPop";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BigMap extends cc.Component {

    // @property(cc.Label)
    // label: cc.Label = null;

    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    @property(cc.Node)
    Btn_Close:cc.Node = null;//关闭按钮

    @property(cc.Node)
    Flag:cc.Node= null;//状态
    @property(cc.Node)
    txt:cc.Node= null;//文字
    @property(cc.Node)
    Frame:cc.Node= null;//文字背景

    @property(cc.SpriteFrame)
    spriteFrame:cc.SpriteFrame[]= [];//状态图片   0:打过了   1:还没打过
    @property(cc.Node)
    Chapter:cc.Node= null;//地图

    @property(cc.Node)
    Map_Sword:cc.Node= null;//剑

    @property(cc.Node)
    ChapterPop:cc.Node= null;//大地图弹窗
    
    // @property(cc.Node)
    // Trascina:cc.Node= null;//大地图弹窗
    
    start () {
        this.Btn_Close.on(cc.Node.EventType.TOUCH_END,this.onBtn_Close,this);
        for (let index = 0; index < this.Flag.children.length; index++) {
            this.Flag.children[index].on(cc.Node.EventType.TOUCH_END,(()=>{
                this.onBtn_Chapter(index);
            }),this);
            this.Frame.children[index].on(cc.Node.EventType.TOUCH_END,(()=>{
                this.onBtn_Chapter(index);
            }),this);
            
            // let clickEvent=new cc.Component.EventHandler();
            // clickEvent.target=this.node;
            // clickEvent.component='BigMap';
            // clickEvent.handler='onBtn_Chapter';
            // clickEvent.customEventData = ""+index;
            // this.Chapter.children[index].getComponent(cc.Button).clickEvents.push(clickEvent);
        }
        // this.Trascina.on(cc.Node.EventType.TOUCH_START,((e:cc.Event.EventTouch)=>{//当手指触摸到屏幕时
        //     this.onBtnTOUCH_START(e)
        // }),this);
        // this.Trascina.on(cc.Node.EventType.TOUCH_MOVE,((e:cc.Event.EventTouch)=>{//当手指在屏幕上移动时
        //     this.onBtnTOUCH_MOVE(e)
        // }),this);
        // this.Trascina.on(cc.Node.EventType.TOUCH_END,((e:cc.Event.EventTouch)=>{//当手指在目标节点区域内离开屏幕时
        //     this.onBtnTOUCH_END(e)
        // }),this);
        // this.Trascina.on(cc.Node.EventType.TOUCH_CANCEL,((e:cc.Event.EventTouch)=>{//当手指在目标节点区域外离开屏幕时
        //     this.onBtnTOUCH_CANCEL(e)
        // }),this);
        
    }
    // onBtnTOUCH_START(e:cc.Event.EventTouch) {
    //     throw new Error("Method not implemented.");
    // }
    // onBtnTOUCH_MOVE(e:cc.Event.EventTouch) {
    //     throw new Error("Method not implemented.");
    // }
    // onBtnTOUCH_END(e:cc.Event.EventTouch) {
    //     throw new Error("Method not implemented.");
    // }
    // onBtnTOUCH_CANCEL(e:cc.Event.EventTouch) {
    //     throw new Error("Method not implemented.");
    // }

    protected onEnable(): void {
        this.ChapterPop.active=false
        let myCurrentlevel=LevelManager.getInstance().finish_level+1;//当前最大关卡
        if(MapManager.Currentlevel==0){

        }else{
            myCurrentlevel=MapManager.Currentlevel;//当前点击的关卡
        }
        if(myCurrentlevel>=MissionLevelManager.getMaxLevel()){
            myCurrentlevel=LevelManager.getInstance().finish_level
            // GameManager.getInstance().showMessage("你太厉害啦，测试版本暂时没有了，敬请期待后续版本！记得加id",3);
        }
        // console.log("++++++++",myCurrentlevel,MissionLevelManager.getMaxLevel())
        let Chapter=MissionLevelManager.getInstance().getChapter(myCurrentlevel)//当前关卡的章节
        for (let index = 0; index < this.Flag.children.length; index++) {
            let myChapter=0
            if(LevelManager.getInstance().finish_level<MissionLevelManager.getMaxLevel()){
                myChapter=MissionLevelManager.getInstance().getChapter(LevelManager.getInstance().finish_level+1)
            }else{
                myChapter=MissionLevelManager.getInstance().getChapter(LevelManager.getInstance().finish_level)
            }

            if((index+1)>myChapter){
                this.Flag.children[index].getComponent(cc.Sprite).spriteFrame=this.spriteFrame[1]
                this.Chapter.children[index].getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
                this.txt.children[index].getComponent(TextLanguage).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
                this.Frame.children[index].getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
                
            }
            if((index+1)<=myChapter){
                this.Flag.children[index].getComponent(cc.Sprite).spriteFrame=this.spriteFrame[0]
                this.Chapter.children[index].getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));

                this.txt.children[index].getComponent(TextLanguage).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
                this.Frame.children[index].getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
                if((index+1)==Chapter){
                    this.Map_Sword.setPosition(this.Flag.children[index].getPosition().x,this.Flag.children[index].getPosition().y+60,0)
                }
            }
            this.txt.children[index].getComponent(TextLanguage).setReplaceValue('~',(index+1) + '');
        }
        // this.ScrollView.getComponent(cc.ScrollView).scrollToBottom(2)
    }
    onBtn_Close(){
        MapManager.getInstance().instantiatelevelnode();
        this.node.active=false
    }
    onBtn_Chapter(level){
        this.ChapterPop.getComponent(ChapterPop).parent=this.node
        this.ChapterPop.getComponent(ChapterPop).level=Number(level)
        this.ChapterPop.active=true
    }
    // update (dt) {}
}
