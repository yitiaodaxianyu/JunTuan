// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameManager from "../GameManager";
import MapManager from "../GuaJi/MapManager";
import { OfflineRevenueManager } from "../JsonData/OfflineRevenue";
import { LevelManager } from "../Level/LevelManager";
import { MissionLevelManager } from "../Level/MissionLevel";
import { OfflineRevenueShowManager } from "../Level/OfflineRevenueShow";
import LabelLanguage from "../multiLanguage/LabelLanguage";
import LanguageManager from "../multiLanguage/LanguageManager";
import TextLanguage from "../multiLanguage/TextLanguage";
import { PropManager } from "../Prop/PropManager";
import BigMap from "./BigMap";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    // @property(cc.Label)
    // label: cc.Label = null;

    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    @property(cc.Node)
    txtScrollView: cc.Node = null;
    level:number=0//默认第0关
    @property(cc.Node)
    bt: cc.Node = null;//标题名字
    @property(cc.Node)
    gushi: cc.Node = null;//章节故事
    @property(cc.Node)
    needNum: cc.Node = null;//每小时增加多少金币
    @property(cc.Node)
    content: cc.Node = null;//新增奖励
    @property(cc.Node)
    txt: cc.Node = null;//无新增奖励文本

    @property(cc.Node)
    btnReplace: cc.Node = null;//蓝色按钮   未抵达100106  变灰    前往100034   变蓝色

    parent = null;//父节点

    @property(cc.Node)
    Map_Window_1: cc.Node = null;//背景图

    
    @property(cc.SpriteAtlas)
    Map_Window: cc.SpriteAtlas = null;//背景图
    
    start () {

    }
    protected onEnable(): void {
        this.txtScrollView.getComponent(cc.ScrollView).scrollToTop(0)
        this.txtScrollView.getComponent(cc.ScrollView).scrollToBottom(4)

        this.bt.getComponent(TextLanguage).setReplaceValue('~',(this.level+1) + '');//.setTextId(OfflineRevenueShowManager.getInstance().getTitletext(this.level+1))
        
        this.gushi.getComponent(TextLanguage).setTextId(OfflineRevenueShowManager.getInstance().getChapterIntroduction(this.level+1))

        this.needNum.getComponent(cc.Label).string="+"+OfflineRevenueShowManager.getInstance().getGetCoins(this.level+1)+"/h"

        let UnlockProps=OfflineRevenueShowManager.getInstance().getUnlockProps(this.level+1)

        // console.log("精灵图：",this.Map_Window.getSpriteFrame("Map_Window_1"),this.level+1)
        this.Map_Window_1.getComponent(cc.Sprite).spriteFrame=this.Map_Window.getSpriteFrame("Map_Window_"+(this.level+1))

        if(UnlockProps.length==0){
            this.txt.active=true
        }else{
            this.txt.active=false
            for (let index = 0; index < UnlockProps.length; index++) {
                let item=PropManager.getInstance().createPropItem(UnlockProps[index],0);
                item.scale=0.9;
                item.parent=this.content;
            }
        }
        let myChapter=0
        if(LevelManager.getInstance().finish_level<MissionLevelManager.getMaxLevel()){
            myChapter=MissionLevelManager.getInstance().getChapter(LevelManager.getInstance().finish_level+1)
        }else{
            myChapter=MissionLevelManager.getInstance().getChapter(LevelManager.getInstance().finish_level)
        }
        if((this.level+1)>myChapter){
            // this.Flag.children[this.level].getComponent(cc.Sprite).spriteFrame=this.spriteFrame[1]
            this.btnReplace.getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
            this.btnReplace.getChildByName("label").getComponent(TextLanguage).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
            this.btnReplace.getChildByName("label").getComponent(TextLanguage).setTextId(100106)
        }
        if((this.level+1)<=myChapter){
            this.btnReplace.getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
            this.btnReplace.getChildByName("label").getComponent(TextLanguage).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
            this.btnReplace.getChildByName("label").getComponent(TextLanguage).setTextId(100034)
            // this.Flag.children[this.level].getComponent(cc.Sprite).spriteFrame=this.spriteFrame[0]
            // if((this.level+1)==Chapter){
            //     this.Map_Sword.setPosition(this.Flag.children[this.level].getPosition().x,this.Flag.children[this.level].getPosition().y+100,0)
            // }
        }
    }
    onBtn_Close(){
        for (let index = 0; index < this.content.children.length; index++) {
            this.content.children[index].destroy()
        }
        this.node.active=false
    }
    onBtn_Replace(){
        // @ts-ignore
        if(this.btnReplace.getComponent(cc.Sprite).getMaterial(0)._name== 'builtin-2d-gray-sprite (Instance)'){
            GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(100108))//暂未解锁该章节
        }else{
            MapManager.Currentlevel=MissionLevelManager.getInstance().getChapterLevel(this.level+1)
            // console.log("________",MapManager.Currentlevel,this.level)
            this.onBtn_Close()
            this.parent.getComponent(BigMap).onBtn_Close()
            //进入这个章节
        }
    }

    // update (dt) {}
}
