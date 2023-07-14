

const {ccclass, property} = cc._decorator;

@ccclass
export default class UnlockSkill extends cc.Component {

    yes_callback:Function=null;
    no_callback:Function=null;

    init(yesCallback:Function,noCallback:Function)
    {
        this.yes_callback=yesCallback;
        this.no_callback=noCallback;
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
        if(this.yes_callback)
        {
            this.no_callback();
        }
        this.node.removeFromParent();
    }

}
