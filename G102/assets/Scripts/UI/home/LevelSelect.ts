import GameData from "../../GameData";
import { LevelManager } from "../../Level/LevelManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LevelSelect extends cc.Component {

    content:cc.Node=null;
    level_scrollView:cc.ScrollView=null;
    touch_action:cc.Tween=null;
    click_action:cc.Tween=null;

    onLoad () {
        this.level_scrollView=this.node.getComponent(cc.ScrollView);
        this.content=this.level_scrollView.content;
    }

    start () {        
        let levelBtns=this.content.children;

        this.content.x=-levelBtns[LevelManager.getInstance().start_level-1].x;
    }

    //--------------------------------------关卡按钮----------------------------------------------
    update (dt) {
        let levelBtns=this.content.children;
        let len=this.content.childrenCount;
        for(let i=0; i<len; i++)
        {
            let levelBtn=levelBtns[i];
            let scale=0.9-Math.abs(levelBtn.x+this.content.x)/240*0.4;
            if(scale<0.5)
            {
                scale=0.5;
            }
            levelBtn.scale=scale;
        }
    }

    onTouchScrollView(e:cc.ScrollView,eventType:cc.ScrollView.EventType)
    {
        if(eventType==cc.ScrollView.EventType.SCROLL_ENDED)
        {
            this.onTouchEnd();
        }else if(eventType==cc.ScrollView.EventType.SCROLL_BEGAN)
        {
            if(this.click_action)
            {
                this.click_action.stop();
            }
            if(this.touch_action)
            {
                this.touch_action.stop();
            }
            //this.content.stopAllActions();
        }
    }

    onTouchEnd()
    {
        //算出levelBtn.x+this.content.x最靠近0的levelBtn
        let minX=350;
        let minIndex=0;
        let levelBtns=this.content.children;
        let len=this.content.childrenCount;
        for(let i=0; i<len; i++)
        {
            let levelBtn=levelBtns[i];
            let offsetX=Math.abs(levelBtn.x+this.content.x);
            if(offsetX<minX)
            {
                minIndex=i;
                minX=offsetX;
            }
        }
        if(this.click_action)
        {
            this.click_action.stop();
        }
        if(this.touch_action)
        {
            this.touch_action.stop();
        }
        //然后让content滚动至levelBtn的坐标位置.
        this.touch_action=cc.tween(this.content).to(0.2,{x:-levelBtns[minIndex].x}).start();
    }

    clickBtnLevel(b,strIndex:string)
    {
        let index=parseInt(strIndex);
        let levelBtns=this.content.children;
        if(this.click_action)
        {
            this.click_action.stop();
        }
        if(this.touch_action)
        {
            this.touch_action.stop();
        }
        this.click_action=cc.tween(this.content).to(0.2,{x:-levelBtns[index].x}).start();
    }
}
