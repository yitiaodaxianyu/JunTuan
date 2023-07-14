// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { HeroManager } from "../../Hero/Data/HeroManager";
import { MonsterConfigureManager } from "../../Monster/Data/MonsterConfigure";
import TextLanguage from "../../multiLanguage/TextLanguage";
import { PropManager } from "../../Prop/PropManager";
import { UIManager } from "../UIManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MonsterDetails extends cc.Component {

    @property(cc.Node)
    btnClose: cc.Node = null;
    @property(cc.Node)
    bg: cc.Node = null;
    @property(cc.Node)
    content: cc.Node = null;
    
    @property(cc.Prefab)
    DamageNode: cc.Prefab = null;

    @property(cc.SpriteFrame)
    MStat_TXT:cc.SpriteFrame[]=[]//标签名字

    @property(cc.SpriteFrame)
    MStat_Frame:cc.SpriteFrame[]=[]//标签框

    //资源-图集
    @property(cc.SpriteAtlas)
    icon_atlas:cc.SpriteAtlas=null;

    Mon:cc.Node[]=[]
    MonsterDetailsarr=[]//怪物详情列表   按boss   精英   普通 排序

    
    start () {
        this.btnClose.on(cc.Node.EventType.TOUCH_END,function(event){
            this.onCloseBtn()
        },this)
        this.bg.on(cc.Node.EventType.TOUCH_END,function(event){
            this.onCloseBtn()
        },this)
    }
    onEnable(){
        //生成怪物详情列表
        for (let mon_index = this.Mon.length; mon_index < this.MonsterDetailsarr.length; mon_index++) {
            let MonNode=cc.instantiate(this.DamageNode);
            this.content.addChild(MonNode);
            this.Mon.push(MonNode)
        }
        let monmanger=MonsterConfigureManager.getInstance()
        for (let mons_index = 0; mons_index < this.Mon.length; mons_index++) {
            let mymon=this.Mon[mons_index]
            if(mons_index < this.MonsterDetailsarr.length){
                mymon.active=true
                let icon=mymon.getChildByName("MStat_Frame_Mask").getChildByName('icon');
                let id=this.MonsterDetailsarr[mons_index].id
                icon.getComponent(cc.Sprite).spriteFrame=this.icon_atlas.getSpriteFrame("Avatar_Monster_"+id);
                let qiangdu=(monmanger.getStrengthType(id)-1)
                let MStat_Frame=mymon.getChildByName('MStat_Frame');
                MStat_Frame.getComponent(cc.Sprite).spriteFrame=this.MStat_Frame[qiangdu]
                let MStat_TXT=mymon.getChildByName("Layout").getChildByName('MStat_TXT');
                MStat_TXT.getComponent(cc.Sprite).spriteFrame=this.MStat_TXT[qiangdu]
                let name=mymon.getChildByName("Layout").getChildByName('name');
                let txtcolor=[new cc.Color(92, 157, 237),new cc.Color(205, 158, 255),new cc.Color(255, 79, 75)]
                let Outlinecolor=[new cc.Color(25, 55, 88),new cc.Color(66, 37, 96),new cc.Color(79, 16, 15)]
                name.color=txtcolor[qiangdu]
                name.getComponent(cc.LabelOutline).color=Outlinecolor[qiangdu]
                name.getComponent(TextLanguage).setTextId(monmanger.getNameTextId(id))
                let describe=mymon.getChildByName('describe');
                describe.getComponent(TextLanguage).setTextId(monmanger.getIntroTextId(id))
            }else{
                mymon.active=false
            }
        }
    }
    onCloseBtn(){
        this.node.active=false
    }

    // update (dt) {}
}
