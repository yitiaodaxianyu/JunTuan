import { GameEffectId, GameEffectsManager } from "./GameEffectsManager";
import MapNodePool from "./MapNodePool";


enum GroundZIndex{
    /**阴影 */
    shadow=1,
    drop=2,
}

const {ccclass, property} = cc._decorator;

@ccclass
export default class GroundManager extends MapNodePool {

    private static _instance: GroundManager = null;

    public static getInstance():GroundManager
    {
        return this._instance;
    }

    onLoad () {
        GroundManager._instance=this;        
    }

    protected onDestroy(): void {
        super.onDestroy();
        GroundManager._instance=null;        
    }

    /**根据id创建一个特效*/
    createGameEffectById(id:GameEffectId,pos:cc.Vec2,zIndex:number=0):cc.Node
    {
        let node=GameEffectsManager.getInstance().createGameEffectForParent(id,pos,this.node);
        if(zIndex){
            node.zIndex=zIndex;
        }
        return node;
    }

    createShadow(pos:cc.Vec2):cc.Node{
        let shadow=GameEffectsManager.getInstance().createGameEffectForParent(GameEffectId.shadow,pos,this.node);
        shadow.setPosition(pos);
        shadow.zIndex=GroundZIndex.shadow;
        return shadow;
    }

    createShadowByParent(parent:cc.Node):cc.Node{
        let shadow=GameEffectsManager.getInstance().createGameEffectForParent(GameEffectId.shadow,cc.v2(0,0),parent);
        shadow.zIndex=GroundZIndex.shadow;
        return shadow;
    }
}
