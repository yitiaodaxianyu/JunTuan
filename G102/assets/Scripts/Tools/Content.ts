

const {ccclass, property} = cc._decorator;

@ccclass
export default class Content extends cc.Component {

    view_rect:cc.Rect=null;

    protected start(): void {
        let view=this.node.parent;
        this.view_rect=view.getBoundingBox();
    }

    update (dt) {
        let len=this.node.childrenCount;
        let childArr=this.node.children;
        for(let i=0; i<len; i++){
            let node=childArr[i];
            let rect=node.getBoundingBox();
            rect.x=node.parent.x+rect.x;
            rect.y=node.parent.y+rect.y;
            if(!this.view_rect.containsRect(rect)&&!this.view_rect.intersects(rect)){
                node.opacity=0;
            }else{
                node.opacity=255;
            }
        }
    }

}
