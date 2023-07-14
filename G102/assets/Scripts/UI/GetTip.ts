import { VipManager } from "../Ads/VipManager";
import { GameScene } from "../Constants";
import GameManager from "../GameManager";
import Prop from "../Prop/Prop";
import { PropManager } from "../Prop/PropManager";
import { PropData, PropId } from "../Prop/PropConfig";
import MyTool from "../Tools/MyTool";
import { SoundIndex } from "../Sound/AudioConstants";


const {ccclass, property} = cc._decorator;

@ccclass
export default class GetTip extends cc.Component {

    close_callback:Function=null;
    is_can_touch:boolean=false;
    node_list:cc.Node[]=[];

    onLoad () {
        let bg=this.node.getChildByName('bg0');
        bg.on(cc.Node.EventType.TOUCH_START,this.onTouchStart,this);
        this.close_callback=null;
        // if(VipManager.getIsVip()==true)
        // {
        //     if(VipManager.getVipFreeNum()>0)
        //     {
        //         let vipTip=this.node.getChildByName('vipTip');
        //         vipTip.active=true;
        //     }
        // }
        this.node_list=new Array();
    }

    onDestroy () {
        let bg=this.node.getChildByName('bg0');
        if(bg)
        {
            bg.off(cc.Node.EventType.TOUCH_START,this.onTouchStart,this);
        }        
    }

    onTouchStart(){
        if(this.is_can_touch){
            this.startFly();        
            if(this.close_callback)
            {
                this.close_callback();
            }
            this.node.removeFromParent();
        }        
    }

    addShowGetPorp(prop:cc.Node,callBack?:Function)
    {
        // this.node.getChildByName('propsScrollView').active=false;
        this.close_callback=callBack;
        let content = this.node.getChildByName("propsScrollView").getComponent(cc.ScrollView).content;
        content.getComponent(cc.Layout).enabled = false;
        content.parent.parent.getComponent(cc.ScrollView).enabled = false;
        let acT=0.2;
        if(prop.parent == null){
            prop.parent = this.node;
            prop.scale = 0;
            prop.setPosition(cc.v2(0,-50));
            cc.tween(prop).to(acT,{scale:1}).start();
        }else{
            let item = cc.instantiate(prop);
            item.scale = 0;
            item.parent = this.node;
            item.setPosition(cc.v2(0,-50));
            cc.tween(item).to(acT,{scale:1}).start();
        }
        this.node_list.push(prop);
        this.scheduleOnce(()=>{
            this.is_can_touch=true;
        },acT)
        // if(prop.parent==null)
        // {
        //     prop.parent=this.node;
        //     prop.scale=1;
        // }else
        // {
        //     let node=cc.instantiate(prop);
        //     node.opacity=255;
        //     node.angle=0;
        //     //node.scale=1;
        //     node.setPosition(cc.v2(0,0));
        //     this.node.addChild(node);
        //     prop.scale=1;
        // }
        // this.node_list.push(prop);
        // this.is_can_touch=true;
    }

    addMultiplePorp(props:cc.Node[],callBack?:Function)
    {
        // this.node.getChildByName('light').active=false;
        // this.node.getChildByName('kuang').active=false;
        this.close_callback=callBack;
        let content=this.node.getChildByName('propsScrollView').getComponent(cc.ScrollView).content;        
        let len=props.length;
        let jgT=0.2;
        let delyT=len*jgT;   
        // console.log("本次长度： " + len);
        // console.log(3 / 2);
        if(props.length <= 5){
            content.getComponent(cc.Layout).enabled = false;
            content.parent.parent.getComponent(cc.ScrollView).enabled = false;
        }
        
        for(let i = 0;i < len;i++){
            this.scheduleOnce(()=>{
                let prop = props[i];cc.log(i);
                if(prop.parent == null){
                    prop.parent = content;
                    if(props.length <= 5){
                        if(props.length % 2 == 0){
                            prop.x = (prop.width + content.getComponent(cc.Layout).spacingX) * 0.5 + (prop.width + content.getComponent(cc.Layout).spacingX) * i - (props.length / 2) * (prop.width + content.getComponent(cc.Layout).spacingX);
                        }else{
                            prop.x = (prop.width + content.getComponent(cc.Layout).spacingX) * i - (props.length / 2 - 0.5) * (prop.width + content.getComponent(cc.Layout).spacingX) ;
                        }
                    }
                    prop.scale = 0;
                    cc.tween(prop).to(0.2,{scale:1}).start();
                }else{
                    if(props.length <= 5){
                        if(props.length % 2 == 0){
                            prop.x = (prop.width + content.getComponent(cc.Layout).spacingX) * 0.5 + (prop.width + content.getComponent(cc.Layout).spacingX) * i - (props.length / 2) * (prop.width + content.getComponent(cc.Layout).spacingX);
                        }else{
                            prop.x = (prop.width + content.getComponent(cc.Layout).spacingX) * i - (props.length / 2) * (prop.width + content.getComponent(cc.Layout).spacingX) ;
                        }
                    }
                    let item = cc.instantiate(prop);
                    item.scale = 0;
                    item.parent = content;
                    item.setPosition(cc.v2(0,0));
                    cc.tween(item).to(0.2,{scale:1}).start();
                }
            },jgT * i);
        }
        this.node_list=props;
        this.scheduleOnce(()=>{
            this.is_can_touch=true;
        },delyT)
        // let content=this.node.getChildByName('propsScrollView').getComponent(cc.ScrollView).content;        
        // let len=props.length;
        // let jgT=0.1;
        // let delyT=len*jgT;        
        // for(let i=0; i<len; i++)
        // {
        //     this.scheduleOnce(()=>{
        //         let prop=props[i];
        //         if(prop.parent==null)
        //         {
        //             content.addChild(prop);
        //         }else
        //         {
        //             let node=cc.instantiate(prop);
        //             node.opacity=255;
        //             node.angle=0;
        //             //node.scale=1;
        //             node.setPosition(cc.v2(0,0));
        //             content.addChild(node);
        //         }
        //     },jgT*i);
        //     //起飞        
        // }
        // this.node_list=props;
        // this.scheduleOnce(()=>{
        //     this.is_can_touch=true;
        // },delyT)
    }

    showGetPropTip(propData:PropData[],callBack?:Function){
        // this.close_callback=callBack;
        // let content = this.node.getChildByName("propsScrollView").getComponent(cc.ScrollView).content

        // let jgT=0.3;
        // let delyT=propData.length*jgT;
        // if(propData.length > 5){
        //     content.x = 0;
        // }else{
        //     content.x -= (propData.length - 1) * 60;
        // }
        // for(let i = 0;i < propData.length;i++){
        //     this.scheduleOnce(()=>{
        //         let prop = PropManager.getInstance().createPropItem(propData[i].type,propData[i].num);
        //         content.addChild(prop);
        //         prop.scale = 0;
        //         cc.tween(prop).to(jgT,{scale:1}).start();
        //     },jgT*i)
        // }
        // // this.node_list=propData;
        // this.scheduleOnce(()=>{
        //     this.is_can_touch=true;
        // },delyT)
    }

    private startFly() {
        if(GameManager.getInstance().cur_game_scene!=GameScene.home)
        {
            return;
        }
        GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_GetReward);
        let uiRoot=cc.find("Canvas/Ui_Root");
        let disPos=cc.v2(0,0)
        let isRefresh=false;
        for(let i=0; i<this.node_list.length; i++){
            let node=this.node_list[i];
            //将这个节点的坐标转换成uiRoot的坐标
            let wordPos=node.parent.convertToWorldSpaceAR(node.getPosition());
            let nodePos=uiRoot.convertToNodeSpaceAR(wordPos);
            let prop=node.getComponent(Prop);
            if(!prop){
                return;
            }
            // console.log("++++++++",prop.prop_id)
            switch(prop.prop_id){
                case PropId.Coin:{
                    let disNode=cc.find('Canvas/Top_Ui/top/iconCoin');
                    wordPos=disNode.parent.convertToWorldSpaceAR(disNode.getPosition());
                    disPos=uiRoot.convertToNodeSpaceAR(wordPos);
                    for(let i=0; i<20; i++){
                        let startPosX=Math.random()*300-200+nodePos.x;
                        let startPosY=Math.random()*300-200+nodePos.y;
                        let startPos=cc.v2(startPosX,startPosY)
                        let newNode=new cc.Node();
                        newNode.addComponent(cc.Sprite).spriteFrame=PropManager.getInstance().getSpByPropId(PropId.Coin);
                        newNode.setPosition(startPos);
                        uiRoot.addChild(newNode);
                        cc.tween(newNode).then(MyTool.getBezierAct(startPos,disPos)).call(()=>{
                            if(!isRefresh){
                                GameManager.getInstance().refreshCoinShow();
                                GameManager.getInstance().refreshGemShow();
                                isRefresh=true;
                            }
                        }).removeSelf().start();
                    }
                }break;
                case PropId.Gem:{
                    let disNode=cc.find('Canvas/Top_Ui/top/iconGem');
                    wordPos=disNode.parent.convertToWorldSpaceAR(disNode.getPosition());
                    disPos=uiRoot.convertToNodeSpaceAR(wordPos);
                    for(let i=0; i<20; i++){
                        let startPosX=Math.random()*300-200+nodePos.x;
                        let startPosY=Math.random()*300-200+nodePos.y;
                        let startPos=cc.v2(startPosX,startPosY)
                        let newNode=new cc.Node();
                        newNode.addComponent(cc.Sprite).spriteFrame=PropManager.getInstance().getSpByPropId(PropId.Gem);
                        newNode.setPosition(startPos);
                        uiRoot.addChild(newNode);
                        cc.tween(newNode).then(MyTool.getBezierAct(startPos,disPos)).call(()=>{
                            if(!isRefresh){
                                GameManager.getInstance().refreshGemShow();
                                GameManager.getInstance().refreshCoinShow();
                                isRefresh=true;
                            }
                        }).removeSelf().start();
                    }
                }break;
                // case PropId.UserExp:{
                //     let disNode=cc.find('Canvas/Top_Ui/top/btnSetting');
                //     wordPos=disNode.parent.convertToWorldSpaceAR(disNode.getPosition());
                //     disPos=uiRoot.convertToNodeSpaceAR(wordPos);
                //     for(let i=0; i<20; i++){
                //         let startPosX=Math.random()*300-200+nodePos.x;
                //         let startPosY=Math.random()*300-200+nodePos.y;
                //         let startPos=cc.v2(startPosX,startPosY)
                //         let newNode=new cc.Node();
                //         newNode.addComponent(cc.Sprite).spriteFrame=PropManager.getInstance().getSpByPropId(PropId.UserExp);
                //         newNode.setPosition(startPos);
                //         uiRoot.addChild(newNode);
                //         cc.tween(newNode).then(MyTool.getBezierAct(startPos,disPos)).removeSelf().start();
                //     }
                // }break;                
                // default:{
                //     let disNode=cc.find('Canvas/Top_Ui/down/btnRole/icon');
                //     wordPos=disNode.parent.convertToWorldSpaceAR(disNode.getPosition());
                //     disPos=uiRoot.convertToNodeSpaceAR(wordPos);
                //     for(let i=0; i<20; i++){
                //         let startPosX=Math.random()*300-200+nodePos.x;
                //         let startPosY=Math.random()*300-200+nodePos.y;
                //         let startPos=cc.v2(startPosX,startPosY)
                //         let newNode=new cc.Node();
                //         newNode.addComponent(cc.Sprite).spriteFrame=PropManager.getInstance().getSpByPropId(PropId.HeroExp);
                //         newNode.setPosition(startPos);
                //         uiRoot.addChild(newNode);
                //         cc.tween(newNode).then(MyTool.getBezierAct(startPos,disPos)).removeSelf().start();
                //     }
                // }break;
            }
        }                                 
    }
    // update (dt) {}
}
