import MapNodePool from "./MapNodePool";
import BuffState from "../Hero/Game/BuffState";
import { Hero_Type, BuffStateType, BuffId } from "../Hero/Game/HeroConfig";


const {ccclass, property} = cc._decorator;

@ccclass
export default class BuffStateManager extends MapNodePool {

    @property(cc.SpriteAtlas)
    ui_atlas:cc.SpriteAtlas=null;

    private static _instance: BuffStateManager = null;


    public static getInstance():BuffStateManager
    {
        return this._instance;
    }

    getSpByName(name:string):cc.SpriteFrame{
        return this.ui_atlas.getSpriteFrame(name);
    }

    onLoad () {
        BuffStateManager._instance=this;
    }

    protected onDestroy(): void {
        super.onDestroy();
        BuffStateManager._instance=null;        
    }

    public createBuffRoot(pos:cc.Vec2,heroType:Hero_Type){
        let node=new cc.Node(''+heroType);
        let layout=node.addComponent(cc.Layout);
        layout.type=cc.Layout.Type.HORIZONTAL;
        layout.resizeMode=cc.Layout.ResizeMode.CONTAINER;
        node.setPosition(pos);
        this.node.addChild(node);
    }

    /**根据id创建一个特效*/
    public createBuffState(type:BuffStateType,heroType:Hero_Type):BuffState
    {
        let node=new cc.Node(''+type);
        let sp=node.addComponent(cc.Sprite);
        sp.spriteFrame=this.getSpByName("Buff_Icon_"+type);
        //根据英雄找到对应的root位置
        let root=this.node.getChildByName(''+heroType);
        root.addChild(node);
        let buffTS=node.addComponent(BuffState);
        return buffTS;
    }

    /**根据id创建一个特效*/
    public createDeBuffState(type:BuffStateType,heroType:Hero_Type):BuffState
    {
        let node=new cc.Node(''+type);
        let sp=node.addComponent(cc.Sprite);
        sp.spriteFrame=this.getSpByName("Debuff_Icon_"+type);
        //根据英雄找到对应的root位置
        let root=this.node.getChildByName(''+heroType);
        root.addChild(node);
        let buffTS=node.addComponent(BuffState);
        return buffTS;
    }

    getBuffType(buffId:BuffId):BuffStateType[]{
        let type=[];
        switch(buffId){
            case BuffId.Hero_MeiMo_GongSu:
            case BuffId.Pet3_JiaSu:
            case BuffId.Hero_ZhenDe_Gongsu:
            case BuffId.Hero_KuangZhanShi_DaZhao:
            case BuffId.Hero_ChangMaoShow_GongSu:{
                type.push(BuffStateType.AttackSpeed);
            }break;
            case BuffId.Hero_ZhenDe_BaoJiMingZhongLv:{
                type.push(BuffStateType.CritRate);
                type.push(BuffStateType.HitRate);
            }break;
        }
        return type;            
    }

    getDeBuffType(buffId:BuffId):BuffStateType[]{
        let type=[];
        switch(buffId){
            case BuffId.Boss6_Skill_2_jiangongsu:
            case BuffId.Boss3_JIAN_GongSu:{
                type.push(BuffStateType.AttackSpeed);
            }break;   
            case BuffId.Boss8_Skill_2_attack:{
                type.push(BuffStateType.Attack);
            }break;      
        }
        return type;            
    }
}
