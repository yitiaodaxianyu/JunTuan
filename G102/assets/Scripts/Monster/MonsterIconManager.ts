import { MonsterConfigureManager } from "./Data/MonsterConfigure";

const {ccclass, property} = cc._decorator;

@ccclass
export class MonsterIconManager extends cc.Component {
    private static _instance: MonsterIconManager = null;
    //资源-图集
    @property(cc.SpriteAtlas)
    icon_atlas:cc.SpriteAtlas=null;

    @property(cc.Prefab)
    icon_item:cc.Prefab=null;

    public static getInstance():MonsterIconManager {
        return this._instance;
    }

    protected onLoad(): void {
        MonsterIconManager._instance=this;
        this.init();
    }

    protected onDestroy(): void {
        MonsterIconManager._instance=null;
    }

    //初始化游戏数据
    private init () {

    }

    public getSpByName(name:string):cc.SpriteFrame{
        return this.icon_atlas.getSpriteFrame(name);
    }

    public getSpByMonsterId(monsterId:number):cc.SpriteFrame{
        let iconSpName="Avatar_Monster_"+monsterId;
        return this.getSpByName(iconSpName);
    }

    public createMonsterIcon(monsterId:number,level:number):cc.Node{
        let type=MonsterConfigureManager.getInstance().getStrengthType(monsterId);
        let mIcon=cc.instantiate(this.icon_item);
        let iconSp=mIcon.getChildByName('icon').getComponent(cc.Sprite);
        iconSp.spriteFrame=this.getSpByMonsterId(monsterId);
        let levelLabel=mIcon.getChildByName('level').getComponent(cc.Label);
        levelLabel.string=level+'';
        mIcon.getComponent(cc.Sprite).spriteFrame=this.getSpByName('Monster_frame_'+type);
        return mIcon
    }


}