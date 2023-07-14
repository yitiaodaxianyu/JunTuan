import { GameEffectId, GameEffectsManager } from "./GameEffectsManager";


const {ccclass, property} = cc._decorator;

@ccclass
export default class FightingManager extends cc.Component {

    private static _instance: FightingManager = null;

    public static getInstance():FightingManager
    {
        return this._instance;
    }

    onLoad () {
        FightingManager._instance=this;
    }

    protected onDestroy(): void {
        FightingManager._instance=null;
    }

    /**根据id创建一个特效*/
    createGameEffectById(id:GameEffectId,pos:cc.Vec2):cc.Node
    {
        let node=GameEffectsManager.getInstance().createGameEffectForParent(id,pos,this.node);        
        return node;
    }

    addChild(node:cc.Node,pos:cc.Vec2){
        this.node.addChild(node);
        node.setPosition(pos);
    }
}
