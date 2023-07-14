import { PayUiIndex } from "../thirdParty/ThirdParty";
import { EventManager, RedEventString, RedEventType } from "../Tools/EventManager";
import { CrystalRechargeManager } from "./Data/CrystalRecharge";
import LongJingItem from "./LongJingItem";
import { PayManager } from "./PayManager";
import TotalLongJingItem from "./TotalLongJingItem";


const {ccclass, property} = cc._decorator;

@ccclass
export default class LongJingUi extends cc.Component {

    @property(cc.Prefab)
    prefab_long_jing_item:cc.Prefab=null;

    @property(cc.Prefab)
    prefab_total_item:cc.Prefab=null;    

    // onLoad () {}

    start () {
        this.adaptation();
        this.initItem();
        this.initTotalItem();
        PayManager.getInstance().addTodayShow(PayUiIndex.LongJing);
        EventManager.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Main_Shop_LongJing);
    }

    protected onEnable(): void {
        this.refreshTotalItem();
    }

    private adaptation()
    {        
        let bottomNode=this.node.parent.getChildByName('bottom');
        let bottomHeight=bottomNode.height;
        let bottomY=bottomNode.y;        
        let topNode=this.node.parent.getChildByName('top')
        let topHeight=topNode.height;
        let topY=topNode.y;
        let height=((topY-topHeight)-(bottomY+bottomHeight));
        let centerY=(topY-topHeight-height/2);
        let scrollView=this.node.getChildByName('scrollView');
        scrollView.height=height;
        scrollView.y=centerY;
        scrollView.getChildByName('view').height=height;
    }

    initItem(){
        let content=this.node.getChildByName('scrollView').getComponent(cc.ScrollView).content;
        let data=CrystalRechargeManager.getInstance().getData();
        data.forEach((v,k)=>{
            let longjingItem=cc.instantiate(this.prefab_long_jing_item);
            longjingItem.getComponent(LongJingItem).init(v,this);
            content.addChild(longjingItem);
        });
    }

    initTotalItem(){
        //累计        
        let content=this.node.getChildByName('scrollView').getComponent(cc.ScrollView).content;
        let totalItem=cc.instantiate(this.prefab_total_item);
        content.addChild(totalItem);
        this.refreshTotalItem();
    }

    refreshTotalItem(){
        let totalItem=this.node.getChildByName('scrollView').getComponent(cc.ScrollView).content.getChildByName('total_item');
        if(totalItem){
            totalItem.getComponent(TotalLongJingItem).init();
        }        
    }
}

