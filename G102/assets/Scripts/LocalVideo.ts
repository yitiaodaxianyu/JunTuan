import GameManager from "./GameManager";
import { SoundIndex } from "./Sound/AudioConstants";


const {ccclass, property} = cc._decorator;

@ccclass
export default class LocalVideo extends cc.Component {

   
    remain_time:number=10;
    yes_callback:Function=null;
    no_callback:Function=null;
    interval:any=null;

    init (yesCallback:Function,noCallback:Function) {
        this.yes_callback=yesCallback;
        this.no_callback=noCallback;
        this.remain_time=11+Math.floor(Math.random()*6);
        this.showRemain();        
        this.interval=setInterval(()=>{
            this.showRemain();
        },1000);
        let bg=this.node.getChildByName('bg');
        let touchNum=0;
        bg.on(cc.Node.EventType.TOUCH_START,()=>{
            touchNum++;
            if(touchNum>=5)
            {
                this.clickBtnNo();
            }
        },this);
    }

    showRemain()
    {
        this.remain_time--;
        let remainLabel=this.node.getChildByName('remainLabel').getComponent(cc.Label);
        remainLabel.string=''+this.remain_time;
        let btnYes=this.node.getChildByName('btnYes');
        let text=btnYes.getChildByName('text').getComponent(cc.Label);        
        if(this.remain_time>0)
        {
            text.string='取消';
            // setInterval(()=>{
            //     this.showRemain();
            // },1000);
        }else
        {
            text.string='领取奖励';
            remainLabel.string='观看完毕';
            this.node.getChildByName('hintLabel').active=false;
            btnYes.x=-270+Math.random()*540;
            btnYes.y=-114+Math.random()*228;
            clearInterval(this.interval);
            // let btnNo=this.node.getChildByName('btnNo');
            // btnNo.active=true;
            // btnNo.x=-270+Math.random()*540;
            // btnNo.y=-114+Math.random()*228;
        }
    }

    clickBtnNo()
    {
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        this.node.removeFromParent();
    }

    clickBtnYes()
    {
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);        
        if(this.remain_time>0)
        {
            if(this.no_callback)
            {
                this.no_callback();
            }
        }else
        {
            if(this.yes_callback)
            {
                this.yes_callback();
            }
        }
        this.node.removeFromParent();
    }


    // update (dt) {}
}
