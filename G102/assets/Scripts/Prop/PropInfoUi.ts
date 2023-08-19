import GameManager from "../GameManager";
import { ItemManager } from "./Data/Item";
import LanguageManager from "../multiLanguage/LanguageManager";
import { SoundIndex } from "../Sound/AudioConstants";
import UIComponent from "../UI/UIComponent";
import { PropManager } from "./PropManager";
import { PropAction, PropData, PropId } from "./PropConfig";
import MyTool from "../Tools/MyTool";
import PressButton from "../Tools/PressButton";
import { OfflineRevenueManager } from "../JsonData/OfflineRevenue";
import Turmtable from "../Turntable/Turmtable";
import { UIPath, UILayerLevel } from "../UI/UIConfig";
import { UIManager } from "../UI/UIManager";


const {ccclass, property} = cc._decorator;

@ccclass
export default class PropInfoUi extends UIComponent {

    prop_data:PropData=null;
    prop_action:PropAction=PropAction.Null;

    use_num:number=1;

    buy_callback:Function=null;
    use_callback:Function=null;

    public addBuyListen(callback:Function) {
        this.buy_callback=callback;
    }

    public addUseListen(callback:Function) {
        this.use_callback=callback;
    }

    /**
     * 
     * @param id 道具id
     * @param propAc 道具的行为，查看/使用/购买/等
     */
    initData(data:PropData,propAc:PropAction){
        this.prop_data=data;
        this.prop_action=propAc;
        this.use_num=this.prop_data.prop_num;
        this.initUi();
    }

    initUi () {
        let LM=LanguageManager.getInstance();
        let item=PropManager.getInstance().createPropItem(this.prop_data.prop_id,0,PropAction.Null);
        let propRoot=this.node.getChildByName('propRoot');
        propRoot.addChild(item);
        item.setPosition(cc.v2(0,0));
        let jsonData=ItemManager.getInstance().getJsonItem(this.prop_data.prop_id);
        //名称
        let propName=this.node.getChildByName('propName');
        let nameStr=LM.getStrByTextId(jsonData.NameTextId);                
        //内容描述
        let propDetail=this.node.getChildByName('propDetail');
        let detailStr=LM.getStrByTextId(jsonData.DiscripitionTextId);  
        if(jsonData.Type==5){
            let valueStr=24;
            let yushu=jsonData.ItemID%10-1;
            if(yushu<4){
                valueStr=Math.pow(2,yushu);
            }
            nameStr=nameStr.replace('~',valueStr.toString());
            detailStr=detailStr.replace('~',valueStr.toString());
        }
        propName.getComponent(cc.Label).string=nameStr;
        propDetail.getComponent(cc.Label).string=detailStr;
        //数量
        let propNum=this.node.getChildByName('propNum');
        propNum.getComponent(cc.Label).string=''+this.prop_data.prop_num;
        //标题
        let titleLabel=this.node.getChildByName('titleLabel');
        titleLabel.getComponent(cc.Label).string=LM.getStrByTextId(100040);
        this.showAciton();
    }

    showAciton(){
        for(let i=PropAction.Use; i<PropAction.Num; i++){
            let node=this.node.getChildByName('action'+i);
            node.active=this.prop_action==i;
            if(this.prop_action==i){
                this.node.getChildByName("bbg").height=649
                this.node.getChildByName("bbg").y=32
            }else{
                this.node.getChildByName("bbg").height=580
                this.node.getChildByName("bbg").y=69
            }
        }
        
        switch(this.prop_action){
            case PropAction.Use:{
                //数量
                this.showResNum();
            }break;
            case PropAction.Buy:{
                //价格
                let acRoot=this.node.getChildByName('action'+this.prop_action);
                let num=acRoot.getChildByName('num');
                num.getComponent(cc.Label).string=MyTool.getCoinDanwei(this.prop_data.prop_price);
                //按钮能否点击
                let btnYes=acRoot.getChildByName('btnYes');
                let isCanBuy=PropManager.getInstance().getPropNum(this.prop_data.prop_cost_id)>=this.prop_data.prop_price;
                btnYes.getComponent(cc.Button).interactable=isCanBuy;
                acRoot.getChildByName("gem").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByName("Item_" + this.prop_data.prop_cost_id);
            }break;
        }
    }

    //显示资源数量
    showResNum(){
        let action2=this.node.getChildByName('action2');
        let editbox=action2.getChildByName('editbox');
        let newNum=editbox.getChildByName('newNum')
        newNum.getComponent(cc.Label).string=""+this.use_num;       
    }

    onEditFinish(editbox:cc.EditBox){
        let num=parseInt(editbox.string)
        if(num){
            if(num>this.prop_data.prop_num){
                num=this.prop_data.prop_num;
            }
            if(num<1){
                num=1;
            }
            this.use_num=num;
            this.showResNum();
        }else{
            this.use_num=1;
            this.showResNum();
        }
    }

    onEditStart(editbox:cc.EditBox){
        editbox.string=this.use_num+'';
    }

    setSubAddBtn(){
        let action2=this.node.getChildByName('action2');
        let btnAdd=action2.getChildByName('btnAdd');
        let num=this.use_num;
        let isCanAdd=num<this.prop_data.prop_num;
        btnAdd.getComponent(PressButton).setIsCanPress(isCanAdd);
        let btnSub=action2.getChildByName('btnSub');
        num=this.use_num;
        let isCanSub=num>1;
        btnSub.getComponent(PressButton).setIsCanPress(isCanSub);
    }

    clickBtnAdd()
    {
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);        
        let num=this.use_num+1;
        if(num<=this.prop_data.prop_num)
        {
            this.use_num=num;
            this.showResNum();
            this.setSubAddBtn();
        }
    }

    clickBtnSub()
    {
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        let num=this.use_num-1;
        if(num>=1)
        {
            this.use_num=num;
            this.showResNum();
            this.setSubAddBtn();
        }
    }


    clickBtnBuy(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);        
        if(PropManager.getInstance().changePropNum(this.prop_data.prop_cost_id,-this.prop_data.prop_price)){
            PropManager.getInstance().changePropNum(this.prop_data.prop_id,this.prop_data.prop_num);
            let item=PropManager.getInstance().createPropItem(this.prop_data.prop_id,this.prop_data.prop_num);
            GameManager.getInstance().showGetTip(item);
            GameManager.getInstance().refreshGemShow();
            GameManager.getInstance().refreshCoinShow();
            if(this.buy_callback){
                this.buy_callback();
            }
            super.onClose();
        }else{
            //GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(100041));
            UIManager.getInstance().showUiDialog(UIPath.Turntable,UILayerLevel.One,{onCompleted:(uiNode)=> {
                uiNode.getComponent(Turmtable).initUi()
            },});//转盘
        }        
    }

    clickBtnUse(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        switch(this.prop_data.prop_id){
            case 50011:{
                //金币挂机*1
                let num=OfflineRevenueManager.getInstance().getOfflineReward60()*this.use_num;                
                PropManager.getInstance().changePropNum(this.prop_data.prop_id,-this.use_num);
                PropManager.getInstance().changePropNum(PropId.Coin,num);
                let item=PropManager.getInstance().createPropItem(PropId.Coin,num);
                GameManager.getInstance().showGetTip(item);
            }break;
            case 50012:{
                //金币挂机*2
                let num=OfflineRevenueManager.getInstance().getOfflineReward60()*this.use_num*2;
                PropManager.getInstance().changePropNum(this.prop_data.prop_id,-this.use_num);
                PropManager.getInstance().changePropNum(PropId.Coin,num);
                let item=PropManager.getInstance().createPropItem(PropId.Coin,num);
                GameManager.getInstance().showGetTip(item);
            }break;
            case 50013:{
                //金币挂机*4
                let num=OfflineRevenueManager.getInstance().getOfflineReward60()*this.use_num*4;
                PropManager.getInstance().changePropNum(this.prop_data.prop_id,-this.use_num);
                PropManager.getInstance().changePropNum(PropId.Coin,num);
                let item=PropManager.getInstance().createPropItem(PropId.Coin,num);
                GameManager.getInstance().showGetTip(item);
            }break;
            case 50014:{
                //金币挂机*8
                let num=OfflineRevenueManager.getInstance().getOfflineReward60()*this.use_num*8;
                PropManager.getInstance().changePropNum(this.prop_data.prop_id,-this.use_num);
                PropManager.getInstance().changePropNum(PropId.Coin,num);
                let item=PropManager.getInstance().createPropItem(PropId.Coin,num);
                GameManager.getInstance().showGetTip(item);
            }break;
            case 50015:{
                //金币挂机*24
                let num=OfflineRevenueManager.getInstance().getOfflineReward60()*this.use_num*24;
                PropManager.getInstance().changePropNum(this.prop_data.prop_id,-this.use_num);
                PropManager.getInstance().changePropNum(PropId.Coin,num);
                let item=PropManager.getInstance().createPropItem(PropId.Coin,num);
                GameManager.getInstance().showGetTip(item);
            }break;
            case 50021:{
                //英雄经验挂机*1
                let num=OfflineRevenueManager.getInstance().getOfflineHeroExp60()*this.use_num;
                PropManager.getInstance().changePropNum(this.prop_data.prop_id,-this.use_num);
                PropManager.getInstance().changePropNum(PropId.HeroExp,num);
                let item=PropManager.getInstance().createPropItem(PropId.HeroExp,num);
                GameManager.getInstance().showGetTip(item);
            }break;
            case 50022:{
                //英雄经验挂机*2
                let num=OfflineRevenueManager.getInstance().getOfflineHeroExp60()*this.use_num*2;
                PropManager.getInstance().changePropNum(this.prop_data.prop_id,-this.use_num);
                PropManager.getInstance().changePropNum(PropId.HeroExp,num);
                let item=PropManager.getInstance().createPropItem(PropId.HeroExp,num);
                GameManager.getInstance().showGetTip(item);
            }break;
            case 50023:{
                //英雄经验挂机*4
                let num=OfflineRevenueManager.getInstance().getOfflineHeroExp60()*this.use_num*4;
                PropManager.getInstance().changePropNum(this.prop_data.prop_id,-this.use_num);
                PropManager.getInstance().changePropNum(PropId.HeroExp,num);
                let item=PropManager.getInstance().createPropItem(PropId.HeroExp,num);
                GameManager.getInstance().showGetTip(item);
            }break;
            case 50024:{
                //英雄经验挂机*8
                let num=OfflineRevenueManager.getInstance().getOfflineHeroExp60()*this.use_num*8;
                PropManager.getInstance().changePropNum(this.prop_data.prop_id,-this.use_num);
                PropManager.getInstance().changePropNum(PropId.HeroExp,num);
                let item=PropManager.getInstance().createPropItem(PropId.HeroExp,num);
                GameManager.getInstance().showGetTip(item);
            }break;
            case 50025:{
                //英雄经验挂机*24
                let num=OfflineRevenueManager.getInstance().getOfflineHeroExp60()*this.use_num*24;
                PropManager.getInstance().changePropNum(this.prop_data.prop_id,-this.use_num);
                PropManager.getInstance().changePropNum(PropId.HeroExp,num);
                let item=PropManager.getInstance().createPropItem(PropId.HeroExp,num);
                GameManager.getInstance().showGetTip(item);
            }break;
            case 50031:{
                //魂石挂机*1
                let num=OfflineRevenueManager.getInstance().getOfflineHeroStone60()*this.use_num;
                PropManager.getInstance().changePropNum(this.prop_data.prop_id,-this.use_num);
                PropManager.getInstance().changePropNum(PropId.HeroStone,num);
                let item=PropManager.getInstance().createPropItem(PropId.HeroStone,num);
                GameManager.getInstance().showGetTip(item);
            }break;
            case 50032:{
                //魂石挂机*2
                let num=OfflineRevenueManager.getInstance().getOfflineHeroStone60()*this.use_num*2;
                PropManager.getInstance().changePropNum(this.prop_data.prop_id,-this.use_num);
                PropManager.getInstance().changePropNum(PropId.HeroStone,num);
                let item=PropManager.getInstance().createPropItem(PropId.HeroStone,num);
                GameManager.getInstance().showGetTip(item);
            }break;
            case 50033:{
                //魂石挂机*4
                let num=OfflineRevenueManager.getInstance().getOfflineHeroStone60()*this.use_num*4;
                PropManager.getInstance().changePropNum(this.prop_data.prop_id,-this.use_num);
                PropManager.getInstance().changePropNum(PropId.HeroStone,num);
                let item=PropManager.getInstance().createPropItem(PropId.HeroStone,num);
                GameManager.getInstance().showGetTip(item);
            }break;
            case 50034:{
                //魂石挂机*8
                let num=OfflineRevenueManager.getInstance().getOfflineHeroStone60()*this.use_num*8;
                PropManager.getInstance().changePropNum(this.prop_data.prop_id,-this.use_num);
                PropManager.getInstance().changePropNum(PropId.HeroStone,num);
                let item=PropManager.getInstance().createPropItem(PropId.HeroStone,num);
                GameManager.getInstance().showGetTip(item);
            }break;
            case 50035:{
                //魂石挂机*24
                let num=OfflineRevenueManager.getInstance().getOfflineHeroStone60()*this.use_num*24;
                PropManager.getInstance().changePropNum(this.prop_data.prop_id,-this.use_num);
                PropManager.getInstance().changePropNum(PropId.HeroStone,num);
                let item=PropManager.getInstance().createPropItem(PropId.HeroStone,num);
                GameManager.getInstance().showGetTip(item);
            }break;
            case 50041:{
                //兽粮挂机*1
                let num=OfflineRevenueManager.getInstance().getOfflineAnimalFood60()*this.use_num;
                PropManager.getInstance().changePropNum(this.prop_data.prop_id,-this.use_num);
                PropManager.getInstance().changePropNum(PropId.AnimalFood,num);
                let item=PropManager.getInstance().createPropItem(PropId.AnimalFood,num);
                GameManager.getInstance().showGetTip(item);
            }break;
            case 50042:{
                //兽粮挂机*2
                let num=OfflineRevenueManager.getInstance().getOfflineAnimalFood60()*this.use_num*2;
                PropManager.getInstance().changePropNum(this.prop_data.prop_id,-this.use_num);
                PropManager.getInstance().changePropNum(PropId.AnimalFood,num);
                let item=PropManager.getInstance().createPropItem(PropId.AnimalFood,num);
                GameManager.getInstance().showGetTip(item);
            }break;
            case 50043:{
                //兽粮挂机*4
                let num=OfflineRevenueManager.getInstance().getOfflineAnimalFood60()*this.use_num*4;
                PropManager.getInstance().changePropNum(this.prop_data.prop_id,-this.use_num);
                PropManager.getInstance().changePropNum(PropId.AnimalFood,num);
                let item=PropManager.getInstance().createPropItem(PropId.AnimalFood,num);
                GameManager.getInstance().showGetTip(item);
            }break;
            case 50044:{
                //兽粮挂机*8
                let num=OfflineRevenueManager.getInstance().getOfflineAnimalFood60()*this.use_num*8;
                PropManager.getInstance().changePropNum(this.prop_data.prop_id,-this.use_num);
                PropManager.getInstance().changePropNum(PropId.AnimalFood,num);
                let item=PropManager.getInstance().createPropItem(PropId.AnimalFood,num);
                GameManager.getInstance().showGetTip(item);
            }break;
            case 50045:{
                //兽粮挂机*24
                let num=OfflineRevenueManager.getInstance().getOfflineAnimalFood60()*this.use_num*24;
                PropManager.getInstance().changePropNum(this.prop_data.prop_id,-this.use_num);
                PropManager.getInstance().changePropNum(PropId.AnimalFood,num);
                let item=PropManager.getInstance().createPropItem(PropId.AnimalFood,num);
                GameManager.getInstance().showGetTip(item);
            }break;
        }
        if(this.use_callback){
            this.use_callback();
        }
        super.onClose();
    }

    clickBtnClose(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        super.onClose();
    }

    // update (dt) {}
}
