

const {ccclass, property} = cc._decorator;

@ccclass
export default class PressButton extends cc.Component {

    @property([cc.Component.EventHandler])
    press_events: cc.Component.EventHandler[]=[];

    // @property([cc.Component.EventHandler])
    // release_events: cc.Component.EventHandler[]=[];

    @property()
    interval:number=0.1;

    private is_can_press:boolean=true;

    private is_click:boolean=false;
    private is_press:boolean=false;

    onLoad(): void {
        this.node.on(cc.Node.EventType.TOUCH_START,this.onTouchStart,this);
        this.node.on(cc.Node.EventType.TOUCH_END,this.onTouchEnd,this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL,this.onTouchEnd,this);
        if(this.interval<=0){
            this.interval=0.1;
        }
    }
    
    onDestroy(): void {
        this.node.off(cc.Node.EventType.TOUCH_START,this.onTouchStart,this);
        this.node.off(cc.Node.EventType.TOUCH_END,this.onTouchEnd,this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL,this.onTouchEnd,this);
    }

    onTouchStart(btn:cc.Event.EventTouch)
    {
        if(this.is_can_press){
            //默认使用放大处理按下操作
            this.is_press=true;
            cc.tween(btn.currentTarget).to(0.1,{scale:0.9}).start();
            this.is_click=false;
            this.onClick(btn);
            this.schedule(this.onClick,this.interval);            
            //cc.log('onTouchStart');
        }
    }

    onTouchEnd(btn:cc.Event.EventTouch)
    {
        if(this.is_press){
            this.is_press=false;
            cc.tween(btn.currentTarget).to(0.1,{scale:1.0}).start();
            this.unschedule(this.onClick);
            if(!this.is_click){
                this.onClick(btn);
            }
            // for(let i=0; i<this.release_events.length; i++){
            //     this.release_events[i].emit([btn]);
            // }
            //cc.log('onTouchEnd');
        }
    }
    
    onClick(btn:cc.Event.EventTouch){
        this.is_click=true;
        for(let i=0; i<this.press_events.length; i++){
            this.press_events[i].emit([this.node]);
        }
    }

    setIsCanPress(isCan:boolean){
        this.is_can_press=isCan;
        this.setMat();
    }

    getIsCanPress():boolean{
        return this.is_can_press;
    }

    setMat(){
        let normalMaterial=cc.Material.getBuiltinMaterial('2d-sprite');
        let grayMaterial=cc.Material.getBuiltinMaterial('2d-gray-sprite');
        this.node.getComponent(cc.Sprite).setMaterial(0,this.is_can_press?normalMaterial:grayMaterial);
        if(this.is_can_press==false){
            this.unschedule(this.onClick);
        }
    }
}
