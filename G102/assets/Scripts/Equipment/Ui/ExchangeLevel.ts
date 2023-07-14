// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { Hero_Type } from "../../Hero/Game/HeroConfig";
import { PropAction } from "../../Prop/PropConfig";
import {  EquipmentManager } from "../EquipmentManager";
import EquipDataItem from "./EquipDataItem";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ExchangeLevel   extends cc.Component {

    // @property(cc.Label)
    // label: cc.Label = null;

    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    
    @property(cc.Node)
    level1:cc.Node=null
    @property(cc.Node)
    level2:cc.Node=null

        
    @property(cc.Node)
    equipment1:cc.Node=null
    @property(cc.Node)
    equipment2:cc.Node=null

    other:number=null;
    self:number=null;
    nodes=null
    protected onEnable(): void {
        if(this.other){
            let item1=EquipmentManager.getInstance().getEquipNodeById(this.self,PropAction.Null);
            this.equipment1.addChild(item1);
            let item2=EquipmentManager.getInstance().getEquipNodeById(this.other,PropAction.Null);
            this.equipment2.addChild(item2);
        }
    }
    clickyes()//确定互换等级
    {
        // EquipmentManager.getInstance().Findonechangelevel(this.self)
        // EquipmentManager.getInstance().Findonechangelevel(this.other)
        this.nodes.getComponent(EquipDataItem).onClickBtnEquips()
        this.clickBtnClose()
    }
    clickBtnClose()//关闭   取消升级
    {
        this.nodes.getComponent(EquipDataItem).onClickBtnEquips()
        this.equipment1.children[0].destroy()
        this.equipment2.children[0].destroy()
        this.node.active=false  
    }
    // update (dt) {}
}
