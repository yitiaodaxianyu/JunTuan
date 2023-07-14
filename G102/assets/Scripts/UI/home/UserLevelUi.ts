import { FuncType, GameScene, Go_Type } from "../../Constants";
import GameData from "../../GameData";
import GameManager from "../../GameManager";
import { FunctionDefinitionManager } from "../../JsonData/FunctionDefinition";
import { PlayerLevelUpManager } from "../../JsonData/PlayerLevelUp";
import LanguageManager from "../../multiLanguage/LanguageManager";
import { PropManager } from "../../Prop/PropManager";
import { PropId } from "../../Prop/PropConfig";
import { SoundIndex } from "../../Sound/AudioConstants";
import MyTool from "../../Tools/MyTool";
import UserData from "../../UserData";
import UIComponent from "../UIComponent";


const {ccclass, property} = cc._decorator;

@ccclass
export default class UserLevelUi extends UIComponent {

    // @property(cc.SpriteFrame)
    // sp_kuang:cc.SpriteFrame=null;

    @property(cc.SpriteAtlas)
    atlas:cc.SpriteAtlas=null;

    new_level:number=1;
    new_exp:number=1;
    total_level:number=1;
    is_show_compelete:boolean=true;

    start () {
        this.node.getChildByName('bbg').on(cc.Node.EventType.TOUCH_END,this.destroySelf,this);
        this.staring();
        this.showLevel();     
        
        this.node.zIndex=2;
    }

    //星星之闪烁
    staring(){
        let starRoot=this.node.getChildByName("star_root");
        for(let i=0; i<starRoot.childrenCount; i++){
            let node=starRoot.children[i];
            let oldScale=node.scale;
            let newScale=oldScale+Math.random()*0.5+0.2;
            let act=Math.random()+0.5;
            cc.tween(node).repeatForever(cc.tween().to(act,{scale:newScale}).to(act,{scale:oldScale})).start();
        }
    }

    showLevel(){
        //清算出可以升多少级
        let remainExp=UserData.getInstance().getUserExp();
        let curLevel=UserData.getInstance().getUserLevel();
        let needExp=PlayerLevelUpManager.getInstance().getPlayerExpCost(curLevel);
        let nextLevel=curLevel;
        let maxLevel=PlayerLevelUpManager.getMaxPlayerLevel();
        //let remainExp=allExp;
        while(nextLevel<maxLevel&&remainExp>=needExp){
            remainExp-=needExp;
            nextLevel++;
            needExp=PlayerLevelUpManager.getInstance().getPlayerExpCost(nextLevel);
        }
        
        this.total_level=(nextLevel-curLevel);
        this.new_level=curLevel+this.total_level;
        let isMax=this.new_level>=maxLevel;
        this.new_exp=remainExp;
        let textRoot=this.node.getChildByName('text_root');
        let nextLevelText=textRoot.getChildByName('nextLevel').getComponent(cc.Label);
        let curLevelText=textRoot.getChildByName('curLevel').getComponent(cc.Label);
        // let gemNumText=textRoot.getChildByName('gemNum').getComponent(cc.Label);
        // gemNumText.string=''+10*this.total_level;
        let item = PropManager.getInstance().createPropItem(PropId.Gem,10*this.total_level);
        this.node.getChildByName("reward").addChild(item);
        item.setPosition(cc.v2(0,0));
        if(isMax){
            this.node.getChildByName('arrow').active=false;
            this.node.getChildByName('bgl').active=false;
            this.node.getChildByName('bgr').active=false;
            textRoot.getChildByName('ygTx').active=false;
            nextLevelText.node.active=false;
        }else{
            curLevelText.string=''+(curLevel);
            nextLevelText.string=''+this.new_level;
        }

        //判断升级的区间内解锁的功能
        let unlockList=new Array();
        for(let type=FuncType.LiChengBei; type<FuncType.Num; type++){
            let unlockLevel=FunctionDefinitionManager.getInstance().getUnlockCondictionParameter(type);
            if(unlockLevel>curLevel&&unlockLevel<=this.new_level){
                unlockList.push(type);
            }
        }
        let len=unlockList.length;
        let unlockIcon=this.node.getChildByName('unlockIcon');
        let sroll=this.node.getChildByName("scroll")
        let content = sroll.getComponent(cc.ScrollView).content;
        // let jiange=20;
        // let isJi=unlockList.length%2?true:false;
        // let centerIndex=Math.round(unlockList.length/2);        
        //还需要判断当前解锁的是不是活动模块的功能
        // let isCity=false;//214教程
        // let touchPosCity=cc.v2(0,0);
        // let isActivity=false;//224教程
        // let touchPosActivity=cc.v2(0,0);
        sroll.height=unlockIcon.height*len;
        sroll.getChildByName('view').height=unlockIcon.height*len;
        if(len>0){
            //遍历
            for(let i=1; i<=len; i++){
                let type=unlockList[i-1];
                let unlockItem=cc.instantiate(unlockIcon);
                let icon=unlockItem.getChildByName('icon').getComponent(cc.Sprite);
                icon.spriteFrame=this.atlas.getSpriteFrame("func"+FunctionDefinitionManager.getIconIndex(type));
                let iconName=unlockItem.getChildByName('iconName').getComponent(cc.Label);
                let id=FunctionDefinitionManager.getInstance().getTextID(type);
                iconName.string=LanguageManager.getInstance().getStrByTextId(id);
                let goBtn=unlockItem.getComponent(cc.Button);
                goBtn.clickEvents[0].customEventData=type+"";
                content.addChild(unlockItem);
                // this.node.addChild(unlockItem);
                // let xx=0;
                // if(isJi){
                //     //奇数
                //     xx=(i-centerIndex)*(unlockItem.width+jiange)
                // }else{
                //     //偶数
                //     xx=(i-centerIndex)*(unlockItem.width+jiange)-(unlockItem.width+jiange)/2;
                // }
                // unlockItem.x=xx;                
                // if(isActivity==false){
                //     if(type==FuncType.WuJinTiaoZhan||type==FuncType.GeRenBoss||type==FuncType.ShiJieBoss||type==FuncType.PaTa){                    
                //         isActivity=true;
                //         touchPosActivity=cc.v2(xx,unlockItem.y-3);
                //     }
                // }
                // if(isCity==false){
                //     if(type==FuncType.ZhuangBeiHeCheng||type==FuncType.ChengBaoYangCheng||type==FuncType.TianFu){
                //         isCity=true;
                //         touchPosCity=cc.v2(xx,unlockItem.y-3);
                //     }
                // }                
            }
        }else{
            this.node.getChildByName('bgr').active=false;
            this.node.getChildByName('bgl').active=false;
            textRoot.getChildByName('ygTx').active=false;
        }
        unlockIcon.active=false;
        //教程
        
    }    

    clickBtnGo(btn,index:string){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        let type=parseInt(index);
        if(this.is_show_compelete){
            MyTool.allFadeOut(this.node,()=>{
                this.goTo(type);
            });
        }
    }

    goTo(type:FuncType){
        let goType=Go_Type.Main;
        switch(type)
        {
            case FuncType.LiChengBei:{
                goType=Go_Type.Main_Milestone;
            } break;
            case FuncType.GuaiWuTuJian:{
                goType=Go_Type.Main_EnemyInfo;
            } break;
            case FuncType.ZhuanPan:{
                goType=Go_Type.Main_Spin;
            } break;
            case FuncType.MeiRiRenWu:{
                goType=Go_Type.Main_Task;
            } break;
            case FuncType.QianDao:{
                goType=Go_Type.Main_Sign;
            } break;
            case FuncType.PaiHangBang:{
                goType=Go_Type.Main_Rank;
            } break;
            case FuncType.ZhuangBeiHeCheng: {
                goType=Go_Type.City;
            } break;
            case FuncType.GeRenBoss:
            case FuncType.ShiJieBoss:
            case FuncType.WuJinTiaoZhan:
            case FuncType.MiGong:
            case FuncType.PaTa:{
                goType=Go_Type.Activity;
            } break;
            case FuncType.FanLi:
            case FuncType.LiBao:
            case FuncType.ZhanLing:
            case FuncType.ZhouLiBao:
            case FuncType.NeiGou:
            case FuncType.FirstCharge:
            {
                goType=Go_Type.Main;
            }break;
            case FuncType.Shengtang:
            case FuncType.XuYuanChi:
            case FuncType.LongChao:
            case FuncType.ShangDian:
            case FuncType.TieJiangPu:
            case FuncType.ChongWuXiTong:
            {
                goType=Go_Type.City;
            }break;
        }
        GameManager.getInstance().game_to_home=goType;
        if(GameManager.getInstance().cur_game_scene==GameScene.home){            
            this.destroySelf();
        }else{
            GameManager.getInstance().backToHome();
            this.destroySelf();
        }
    }

    private startFly(node:cc.Node,num:number) {
        if(GameManager.getInstance().cur_game_scene!=GameScene.home){
            return;
        }
        let disPos=cc.v2(0,0)
        let disNode=cc.find('Canvas/Top_Ui/top/iconGem');
        let wordPos=disNode.parent.convertToWorldSpaceAR(disNode.getPosition());
        let uiRoot=cc.find('Canvas/Ui_Root')
        disPos=uiRoot.convertToNodeSpaceAR(wordPos);
        let nodePos=node.getPosition();
        
        for(let i=0; i<num; i++){
            let startPosX=Math.random()*300-200+nodePos.x;
            let startPosY=Math.random()*300-200+nodePos.y;
            let startPos=cc.v2(startPosX,startPosY)
            let newNode=cc.instantiate(node);
            newNode.setPosition(startPos);
            uiRoot.addChild(newNode);
            cc.tween(newNode).then(MyTool.getBezierAct(startPos,disPos)).removeSelf().start();
            let num=newNode.getChildByName('num');
            if(num){
                num.active=false;
            }
        }                                  
     }

     destroySelf(){
        if(this.is_show_compelete){
            PropManager.getInstance().changePropNum(PropId.Gem,10*this.total_level);
            UserData.getInstance().saveUserLevel(this.new_level);
            UserData.getInstance().saveUserExp(this.new_exp);
            GameManager.getInstance().refreshUserExpShow();
            GameManager.getInstance().jumoAndShowUi();
            MyTool.allFadeOut(this.node,()=>{
                // this.startFly(this.node.getChildByName('kuang').getChildByName('icon'),10);
                super.onClose();
            });
            // if(TutorailsManager.getInstance().isShowTutorials(224)){
            //     TutorailsManager.getInstance().saveTutorials(224);
            // }
        }    
     }
}
