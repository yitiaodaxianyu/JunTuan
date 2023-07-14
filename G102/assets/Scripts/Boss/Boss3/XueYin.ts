

const {ccclass, property} = cc._decorator;

@ccclass
export default class XueYin extends cc.Component {

    @property([cc.SpriteFrame])
    sp_xueyin:cc.SpriteFrame[]=[];

    setFloor(num:number){
        for(let i=1; i<=5; i++){
            let nodeSp=this.node.getChildByName(i.toString()).getComponent(cc.Sprite);
            nodeSp.spriteFrame=this.sp_xueyin[i<=num?1:0];
        }
    }
}
