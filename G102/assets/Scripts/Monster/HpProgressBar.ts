
const {ccclass, property} = cc._decorator;

@ccclass
export default class HpProgressBar extends cc.ProgressBar {

    yellow:cc.Node=null;
    @property()
    min_width:number=17;  
    @property()  
    min_pro:number=0.2;
    @property()
    speed:number=56;
    @property()
    is_need_hide:boolean=true;

    onLoad()
    {
        this.yellow=this.node.getChildByName('yellow');
        this.min_pro=this.min_width/this.totalLength;
    }

    changeProgress(num:number)
    {
        if(this.is_need_hide)
        {
            if(num>=1 || num<=0)
            {
                this.node.opacity=0;
            }else
            {
                this.node.opacity=255;
            }
        }        
        if(num<this.min_pro)
        {
            num=this.min_pro;
        }
        this.progress=num;
    }

    setPos(x:number,y:number)
    {
        this.node.x=x;
        this.node.y=y;
        let z=Math.round(8000-this.node.y*10)
        if(z<0){
            z=0;
        }
        if(z>8000){
            z=8000;
        }
        this.node.zIndex=z;
    }

    //显示黄色
    update(dt)
    {
        let curWidth=this.progress*this.totalLength;
        if(this.yellow.width>curWidth)
        {
            this.yellow.width-=this.speed*dt;
            if(this.yellow.width<curWidth)
            {
                this.yellow.width=curWidth;
            }
        }else if(this.yellow.width<curWidth)
        {
            this.yellow.width=curWidth;
        }
    }
}
