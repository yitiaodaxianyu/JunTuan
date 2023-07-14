import MyTool from "../Tools/MyTool";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TextInfo extends cc.Component {

    content:cc.RichText=null;
    title:cc.Label=null;
    bg:cc.Node=null;
    xian:cc.Node=null;
    //title字体至上方的高度
    top:number=22;
    //content字体至下方的高度
    bottom:number=22;
    //间隔线占用的高度
    xian_height:number=36;

    protected onLoad(): void {
        this.bg=this.node.getChildByName('bg');
        this.xian=this.node.getChildByName('xian');
        this.content=this.node.getChildByName('content').getComponent(cc.RichText);
        this.title=this.node.getChildByName('title').getComponent(cc.Label);        
        this.node.on(cc.Node.EventType.TOUCH_START,()=>{
            MyTool.allFadeOut(this.node,()=>{
                this.node.removeFromParent();
            })
        },this);
        this.node._touchListener.setSwallowTouches(false);
    }

    start () {
        this.node.zIndex=9999;        
    }

    showInfo(titleText:string,contentStr:string)
    {
        this.title.string=titleText;
        this.content.string=contentStr;
        this.node.opacity=0;
        this.content.enabled=false;
        this.scheduleOnce(()=>{
            this.node.opacity=255;
            this.content.enabled=true;
            this.bg.height=this.top+this.title.node.height+this.xian_height+this.bottom+this.content.node.height;
            this.title.node.y=this.bg.height/2-this.title.node.height/2-this.top;
            this.xian.y=this.title.node.y-this.title.node.height/2-this.xian_height/2;
            this.content.node.y=this.xian.y-this.xian_height/2;
            MyTool.allFadeIn(this.node);
        },cc.director.getDeltaTime());
    }

}
