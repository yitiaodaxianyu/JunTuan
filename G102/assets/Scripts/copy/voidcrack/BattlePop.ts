// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { FightingInfo, GameMode } from "../../Constants";
import GameManager from "../../GameManager";
import MapManager from "../../GuaJi/MapManager";
import { LevelManager } from "../../Level/LevelManager";
import { MazeManager } from "../../Maze/MazeManager";
import { MonsterConfigureManager } from "../../Monster/Data/MonsterConfigure";
import TextLanguage from "../../multiLanguage/TextLanguage";
import { PropManager } from "../../Prop/PropManager";
import { SoundIndex } from "../../Sound/AudioConstants";
import Times from "../../Turntable/Times";
import ToPlayMainUi from "../../UI/home/ToPlayMainUi";
import UIComponent from "../../UI/UIComponent";
import { UIPath, UILayerLevel } from "../../UI/UIConfig";
import { UIManager } from "../../UI/UIManager";
import { RogueHexagonTypesManager } from "./RogueHexagonTypes";
import { RogueLevelManager } from "./RogueLevel";
import VoidScene from "./VoidScene";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BattlePop extends UIComponent {

    // @property(cc.Label)
    // label: cc.Label = null;

    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    type:number=0//打的那个的id
    mynode:cc.Node=null//选择格子的界面
    index:number=0//行数
    myindex:number=0//位置

    @property(cc.Node)
    item: cc.Node[] =[];
    @property(cc.Node)
    heroitem: cc.Node =null;//怪物item
    @property(cc.Node)
    content: cc.Node =null;//怪物item父节点
    @property(cc.Node)
    loy: cc.Node =null;//怪物item父节点  为了小于5个的时候居中|
    

    @property(cc.SpriteFrame)
    MStat_Frame:cc.SpriteFrame[]=[]//标签框

    //资源-图集
    @property(cc.SpriteAtlas)
    icon_atlas:cc.SpriteAtlas=null;
    
    @property(cc.SpriteFrame)
    Maze_IconSprite:cc.SpriteFrame[]=[];//头像
    @property(cc.Node)
    Maze_Icon: cc.Node =null;//头像。
    @property(cc.Node)
    bttxt: cc.Node =null;//标题文字
    // mytype:number=0//层数
    initUi(type,mynode,index,myindex) {//战役  是哪个位置的奖励   格子节点  //行数   位置   层数
        this.type=type//id
        this.mynode=mynode//格子界面
        this.index=index//行数
        this.myindex=myindex//位置
        // this.mytype=mytype//层数

        let xagonType= RogueHexagonTypesManager.getInstance().getHexagonType(this.type)
        if(xagonType==1){
            this.bttxt.getComponent(TextLanguage).setTextId(830002)
            this.Maze_Icon.getComponent(cc.Sprite).spriteFrame=this.Maze_IconSprite[0]
        }
        if(xagonType==3){
            this.bttxt.getComponent(TextLanguage).setTextId(830003)
            this.Maze_Icon.getComponent(cc.Sprite).spriteFrame=this.Maze_IconSprite[1]
        }
        if(xagonType==5){
            this.bttxt.getComponent(TextLanguage).setTextId(830004)
            this.Maze_Icon.getComponent(cc.Sprite).spriteFrame=this.Maze_IconSprite[2]
        }
        
        let Prop1_ID=RogueHexagonTypesManager.getInstance().getRogueProp1_ID(this.type)
        let Prop1_Sum=RogueHexagonTypesManager.getInstance().getRogueProp1_Sum(this.type)
        let ietm1=PropManager.getInstance().createPropItem(Prop1_ID,Prop1_Sum);
        ietm1.scale=0.9
        ietm1.parent=this.item[0]
        let Prop2_ID=RogueHexagonTypesManager.getInstance().getRogueProp2_ID(this.type)

        let ietm2=PropManager.getInstance().createPropItem(Prop2_ID,1);
        ietm2.scale=0.9
        ietm2.parent=this.item[1]

        let fightingInfo:FightingInfo=null;
        Times.voidsensid=this.type
        fightingInfo=MazeManager.getInstance().getFightingInfo(type);
        let list=fightingInfo.getOnlyMonsterDataList();

        let bossarr=[]
        let jyarr=[]
        let put=[]
        for (let bossindex = 0; bossindex < list.length; bossindex++) {
            if(MonsterConfigureManager.getInstance().getStrengthType(list[bossindex].id)==3){
                bossarr.push(list[bossindex])
            }
            if(MonsterConfigureManager.getInstance().getStrengthType(list[bossindex].id)==2){
                jyarr.push(list[bossindex])
            }
            if(MonsterConfigureManager.getInstance().getStrengthType(list[bossindex].id)==1){
                put.push(list[bossindex])
            }
        }
        //插入
        let MonsterDetailsarr=[]
        MonsterDetailsarr.splice.apply(MonsterDetailsarr,[MonsterDetailsarr.length,0].concat(bossarr));
        MonsterDetailsarr.splice.apply(MonsterDetailsarr,[MonsterDetailsarr.length,0].concat(jyarr));
        MonsterDetailsarr.splice.apply(MonsterDetailsarr,[MonsterDetailsarr.length,0].concat(put));
        //怪物刷新
        
        //let elementid=RogueLevelManager.getInstance().getMonsterGroupConfigure(type)//这个位置所有的怪物
        this.loy.getComponent(cc.Layout).resizeMode=cc.Layout.ResizeMode.CONTAINER
        // this.loy.width=10
        // this.content.width=10
        let monmanger=MonsterConfigureManager.getInstance()
        for (let index = 0; index < MonsterDetailsarr.length; index++) {
            let hero=cc.instantiate(this.heroitem)
            let qiangdu=monmanger.getStrengthType(MonsterDetailsarr[index].id)-1
            hero.getChildByName("frame_kuang").getComponent(cc.Sprite).spriteFrame=this.MStat_Frame[qiangdu]
            hero.getChildByName("Item_mask").getChildByName("Item_icon").getComponent(cc.Sprite).spriteFrame=this.icon_atlas.getSpriteFrame("Avatar_Monster_"+MonsterDetailsarr[index].id);
            hero.active=true
            hero.parent=this.content
            this.content.width=(index+1)*106
        }
        this.scheduleOnce(function(){
            // console.log("++++++++",this.loy.width)
            if(this.loy.width>488){
                this.loy.getComponent(cc.Layout).resizeMode=cc.Layout.ResizeMode.NONE
                this.loy.width=488
                this.content.x=-244
                // console.log("++++++",this.loy)
            }else{
                this.content.x=-(this.loy.width/2)
            }
        },0.05)

    }
    clickBtnShow(){//确认按钮
        // let type=RogueHexagonTypesManager.getInstance().getLayers(this.type)
        // this.mynode.getComponent(VoidScene).initUi(type,this.index,this.myindex)
        // return
        // this.mynode.getComponent(VoidScene).Rowsnumber=this.index//行数
        // this.mynode.getComponent(VoidScene).Positionnumber=this.myindex//位置数
        // this.mynode.getComponent(VoidScene).Refresh()
        // return
        // this.type=type//层数
        this.clickBtnClose();
        this.mynode.getComponent(VoidScene).onClose()
        // this.type=type
        GameManager.getInstance().cur_game_mode=GameMode.Maze;       
        UIManager.getInstance().showUiDialog(UIPath.ToPlay,UILayerLevel.One,{onCompleted:(uiNode)=> {
            uiNode.getComponent(ToPlayMainUi).Mazeid=this.type
            uiNode.getComponent(ToPlayMainUi).init({onClose:()=>{
            }});
        },})
        
        // this.mynode.getComponent(VoidScene).Rowsnumber=this.index//行数
        // this.mynode.getComponent(VoidScene).Positionnumber=this.myindex//位置数
        // this.mynode.getComponent(VoidScene).Refresh()

        // console.log("____________",this.mytype,this.index,this.myindex)
        // this.mynode.getComponent(VoidScene).initUi(this.mytype,this.index,this.myindex)

    }
    clickBtnClose()//关闭
    {
        this.content.removeAllChildren()
        this.content.width=0
        this.item[0].children[0].destroy()
        this.item[1].children[0].destroy()
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        this.onClose();
    
    }

    // update (dt) {}
}
