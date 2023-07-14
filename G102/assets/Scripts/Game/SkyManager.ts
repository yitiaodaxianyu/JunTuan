import { GameEffectId, GameEffectsManager } from "./GameEffectsManager";
import MapNodePool from "./MapNodePool";


enum GroundZIndex{
    /**阴影 */
    shadow=1,
}

const {ccclass, property} = cc._decorator;

@ccclass
export default class SkyManager extends MapNodePool {

    private static _instance: SkyManager = null;

    public static getInstance():SkyManager
    {
        return this._instance;
    }

    onLoad () {
        SkyManager._instance=this;
    }

    protected onDestroy(): void {
        super.onDestroy();
        SkyManager._instance=null;        
    }

    /**根据id创建一个特效*/
    createGameEffectById(id:GameEffectId,pos:cc.Vec2):cc.Node
    {
        let node=GameEffectsManager.getInstance().createGameEffectForParent(id,pos,this.node);        
        return node;
    }

}
