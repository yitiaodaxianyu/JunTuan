
const {ccclass, property} = cc._decorator;

@ccclass
export default class FixedPos extends cc.Component {

    //目标
    @property(cc.Node)
    target_node:cc.Node=null;
    @property()
    fixed_pos:cc.Vec2=cc.v2(0,0);
    //content,如果有这个参数说明是在滚动容器里
    @property(cc.Node)
    content:cc.Node=null;

    init (targetNode:cc.Node,fixedPos:cc.Vec2,content?:cc.Node) {
        this.target_node=targetNode;
        this.fixed_pos=fixedPos;
        this.content=content;
    }

    update(dt)
    {
        if(this.target_node){
            if(this.content){
                this.node.setPosition(this.target_node.getPosition().add(this.fixed_pos).add(cc.v2(this.content.x,this.content.y)));
            }else{
                this.node.setPosition(this.target_node.getPosition().add(this.fixed_pos));
            }            
        }
    }
}
