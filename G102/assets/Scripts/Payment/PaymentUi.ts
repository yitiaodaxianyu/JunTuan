
import GameManager from "../GameManager";
import { Follow_Type } from "../multiLanguage/FollowConstants";
import FollowManager from "../multiLanguage/FollowManager";
import TextLanguage from "../multiLanguage/TextLanguage";
import { SoundIndex } from "../Sound/AudioConstants";
import { EventManager, RedEventString, RedEventType } from "../Tools/EventManager";
import UIComponent from "../UI/UIComponent";
import { UIManager } from "../UI/UIManager";


const {ccclass, property} = cc._decorator;

@ccclass
export default class PaymentUi extends UIComponent {

    static _instance:PaymentUi=null;

    @property([cc.Node])
    all_ui:cc.Node[]=[];

    cur_selected_index:number=0;


    onLoad () {
        PaymentUi._instance=this;
    }

    protected onDestroy(): void {
        PaymentUi._instance=null;
    }

    initData(showIndex:number){
        this.cur_selected_index=showIndex;
    }

    start () {
        this.adaptation();
        this.setBtnShow();
    }

    private adaptation()
    {
        let wp=cc.winSize;
        let bottom=this.node.getChildByName('bottom');
        bottom.y=-wp.height/2;
        bottom.zIndex=1;
        this.node.getChildByName('top').y=wp.height/2;
        let rate=wp.height/wp.width;
        if(rate<2){
            this.node.getChildByName('premium_card').scale=rate-1;
        }
    }

    showIndex(index:number){
        this.cur_selected_index=index;
        this.setBtnShow();
    }

    setBtnShow(){
        let down=this.node.getChildByName('bottom');
        let content=down.getChildByName('btnScrollView').getComponent(cc.ScrollView).content;
        let textId:number|number[]=0;
        for(let i=0; i<6; i++)
        {
            let btn=content.children[i];   
            let btns=btn.getComponents(cc.Button);
            let isCanBtn=this.cur_selected_index!=i;
            this.all_ui[i].active=!isCanBtn;
            if(!isCanBtn){
                textId=btn.getChildByName('nameText').getComponent(TextLanguage).getTextId();
            }
            for(let n=0; n<btns.length; n++){
                btns[n].interactable=isCanBtn;
            }            
        }
        //标题名称
        let top=this.node.getChildByName('top')
        top.getChildByName('titleText').getComponent(TextLanguage).setTextId(textId);        
        if(this.cur_selected_index == 0 || this.cur_selected_index == 5){
            this.node.getChildByName("top").getChildByName("btnHelp").active = true;
        }else{
            this.node.getChildByName("top").getChildByName("btnHelp").active = false;
        }
        //titleText.setTextId()
    }

    clickBtnBottom(btn,indexStr:string){        
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        let index=parseInt(indexStr);
        switch(index){
            case 0:
                FollowManager.getInstance().followEvent(Follow_Type.商城_尊享卡页签点击次数);
            break;
            case 1:
                FollowManager.getInstance().followEvent(Follow_Type.商城_龙晶充值页签点击次数);
            break;
            case 2:
                FollowManager.getInstance().followEvent(Follow_Type.商城_热卖礼包签点击次数);
            break;
            case 3:
                FollowManager.getInstance().followEvent(Follow_Type.商城_通关返利签点击次数);
            break;
            case 4:
                FollowManager.getInstance().followEvent(Follow_Type.商城_累计充值页签点击次数);
            break;
            case 5:
                FollowManager.getInstance().followEvent(Follow_Type.商城_战令页签点击次数);
            break;
        }
        if(this.cur_selected_index!=index){
            this.cur_selected_index=index;
            this.setBtnShow();
        }
    }

    clickBtnHelp(e){
       GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
       if(this.cur_selected_index == 0){
            UIManager.getInstance().showHelpTipsUi(null,100003,[1400201,1400202,1400203]);
        }else if(this.cur_selected_index == 5){
            UIManager.getInstance().showHelpTipsUi(null,100003,[1450004,1450005,1450006]);
        }
    }

    clickBtnClose(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        EventManager.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Main_Shop);
        super.onClose();
    }

}
