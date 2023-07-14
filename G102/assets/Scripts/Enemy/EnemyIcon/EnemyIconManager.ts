

const {ccclass, property} = cc._decorator;

@ccclass
export default class EnemyIconManager extends cc.Component {
    private static _instance: EnemyIconManager = null;
    //资源
    @property(cc.SpriteAtlas)
    icon_atlas:cc.SpriteAtlas=null;

    public static getInstance():EnemyIconManager {
        return this._instance;
    }
    
    protected onLoad(): void {
        EnemyIconManager._instance=this;
    }

    protected onDestroy(): void {
        EnemyIconManager._instance=null;
    }

    public getSpByName(name:string):cc.SpriteFrame{
        return this.icon_atlas.getSpriteFrame(name);
    }
}