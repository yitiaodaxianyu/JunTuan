import GameManager from "../GameManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Dialog extends cc.Component {

    @property({tooltip:'按钮与底部的距离'})
    btn_bottom:number=30;
    @property({tooltip:'文字与顶部的距离'})
    text_top:number=20;

    @property({tooltip:'文字与按钮的距离'})
    text_btn:number=20;
    @property({tooltip:'整体补间高度'})
    filling_height:number = 40;

    yes_callback:Function=null;
    no_callback:Function=null;

    clickBtnYes()
    {
        GameManager.getInstance().is_show_exit=false;
        if(this.yes_callback)
        {
            this.yes_callback();
        }
        this.node.removeFromParent();        
    }

    clickBtnNo()
    {
        GameManager.getInstance().is_show_exit=false;
        if(this.no_callback)
        {
            this.no_callback();
        }
        this.node.removeFromParent();
    }
    /**
     * 
     * @param message 显示的消息
     * @param yesCallback 点击yes按钮的回调
     * @param noCallback 点击no按钮的回调
     * @param showType 显示类型，0或者不填就是普通类型，1：视频，2：计费
     */
    showDialog(message:string,yesCallback:Function,noCallback:Function,showType?:number,num?:number | string,currency?:string)
    {
        this.yes_callback=yesCallback;
        this.no_callback=noCallback;
        let hintLabel=this.node.getChildByName('hintLabel').getComponent(cc.Label);
        hintLabel.string=message;
        this.node.opacity=0;
        hintLabel.enabled=false;
        cc.tween(this.node).delay(0.05).call(()=>{
            hintLabel.enabled=true;
            let btnYes=this.node.getChildByName('btnYes');
            let btnNo=this.node.getChildByName('btnNo');
            let btnHeight=btnYes.height;
            this.node.height=hintLabel.node.height+btnHeight+this.btn_bottom+this.text_top+this.text_top + this.filling_height;
            hintLabel.node.y=this.node.height/2-this.text_top;
            btnYes.y=-this.node.height/2+this.btn_bottom+btnHeight/2;
            this.node.getChildByName("line").y = btnYes.y + 70;
            btnNo.y=btnYes.y;
            if(showType==1)
            {
                btnYes.getChildByName('layout').getChildByName('ads').active=true;
            }
            if(showType==2)
            {
                // btnYes.getChildByName('layout').getChildByName('yes').getComponent(cc.Label).string=num+currency;
                btnYes.getChildByName('layout').getChildByName('yes').getComponent(cc.Label).string=String(num);
            }
        }).to(0.2,{opacity:255}).start();
        // this.scheduleOnce(()=>{
        //     this.node.opacity=255;
        //     hintLabel.enabled=true;
        //     let btnYes=this.node.getChildByName('btnYes');
        //     let btnNo=this.node.getChildByName('btnNo');
        //     let btnHeight=btnYes.height;
        //     this.node.height=hintLabel.node.height+btnHeight+this.btn_bottom+this.text_top+this.text_top;
        //     hintLabel.node.y=this.node.height/2-this.text_top;
        //     btnYes.y=-this.node.height/2+this.btn_bottom+btnHeight/2;
        //     btnNo.y=btnYes.y;
        //     if(isVideo==true)
        //     {
        //         btnYes.getChildByName('layout').getChildByName('ads').active=true;
        //     }
        // },0.05);
    }
}

