import { OfflineRevenueManager } from "../../JsonData/OfflineRevenue";
import { Follow_Type } from "../../multiLanguage/FollowConstants";
import FollowManager from "../../multiLanguage/FollowManager";
import { EventManager, RedEventString, RedEventType } from "../../Tools/EventManager";
import { UILayerLevel, UIPath } from "../../UI/UIConfig";
import { UIManager } from "../../UI/UIManager";
import OfflineUi from "./OfflineUi";



const {ccclass, property} = cc._decorator;

@ccclass
export default class GuaJiGift extends cc.Component {

    reward_num:number=0;
    skeleton:sp.Skeleton=null;
    icon_index:number=0;
    is_press:boolean=false;

    protected onLoad(): void {
        this.skeleton=this.node.getComponent(sp.Skeleton);
        // this.node.on(cc.Node.EventType.TOUCH_START,()=>{
        //     this.skeleton.setAnimation(0,"chest_start"+this.icon_index,true);
        //     this.is_press=true;
        // },this);
        // this.node.on(cc.Node.EventType.TOUCH_END,this.onClick,this);
        // this.node.on(cc.Node.EventType.TOUCH_CANCEL,()=>{
        //     this.skeleton.setAnimation(0,"chest_idle"+this.icon_index,true);
        //     this.is_press=false;
        // },this);
    }

    onEnable () {
        this.cheak();
        this.unschedule(this.cheak);
        this.schedule(this.cheak,10);
    }

    cheak()
    {
        let offsetMin=OfflineRevenueManager.getGuaJiMin();
        if(offsetMin>480)
        {
            offsetMin=480;
        }
        if(offsetMin<0)
        {
            offsetMin=0;
        }
        let iconIndex=0;
        if(offsetMin<30){
            iconIndex=0;
        }else if(offsetMin<60){
            iconIndex=1;
        }else if(offsetMin<90){
            iconIndex=2;
        }else if(offsetMin<120){
            iconIndex=3;
        }else if(offsetMin<150){
            iconIndex=4;            
        }else{
            iconIndex=5;
        }
        this.icon_index=iconIndex;        
        if(this.is_press==false){
            //this.skeleton.setAnimation(0,"chest_idle"+this.icon_index,true);
        }        
    }

    onClick()
    {        
        // FollowManager.getInstance().followEvent(Follow_Type.挂机奖励点击用户数);
        FollowManager.getInstance().followEvent(Follow_Type.离线奖励点击次数);
        //this.skeleton.setAnimation(0,"chest_idle"+this.icon_index,true);        
        UIManager.getInstance().showUiDialog(UIPath.Guaji,UILayerLevel.One,{onCompleted:(uiNode)=> {
            uiNode.getComponent(OfflineUi).init({
                onRefresh:()=>{
                    this.cheak();
                    EventManager.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Main_Guaji);
                }
            })
        },})
        this.is_press=false;
        this.cheak();        
    }



    
}
