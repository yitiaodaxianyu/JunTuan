
import LanguageManager from "../multiLanguage/LanguageManager";


const {ccclass, property} = cc._decorator;

@ccclass
export default class VideoTip extends cc.Component {

    remain_sec:number=5;
    yes_callback:Function=null;
    no_callback:Function=null;

    init(yesCallback:Function,noCallback:Function): void {
        this.yes_callback=yesCallback;
        this.no_callback=noCallback;
        let text=this.node.getChildByName('jobLabel');
        text.getComponent(cc.Label).string=LanguageManager.getInstance().getStrByTextId(110008);
        let okText=this.node.getChildByName('btnVideo').getChildByName('text');
        okText.getComponent(cc.Label).string=LanguageManager.getInstance().getStrByTextId(100001);        
    }

    clickBtnYes()
    {
        if(this.yes_callback)
        {
            this.yes_callback();
        }
        this.node.removeFromParent();
    }

    clickBtnNo()
    {
        if(this.no_callback)
        {
            this.no_callback();
        }
        this.node.removeFromParent();
    }

}
