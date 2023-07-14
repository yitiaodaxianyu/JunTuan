// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { PropManager } from "../../Prop/PropManager";
import { EquipmentAttributeManager } from "../Data/EquipmentAttribute";
import { EquipmentManager } from "../EquipmentManager";
import EquipInfoUi from "./EquipInfoUi";
import MergeUi from "./MergeUi";
import { EquipmentLevelUpCostManager } from "../Data/EquipmentLevelUpCost";
import GameManager from "../../GameManager";
import { PropId } from "../../Prop/PropConfig";
import { TaskItem } from "../../Task/TaskEnum";
import TaskManager from "../../Task/TaskManager";
import { EquipInfo } from "../EquipConfig";
const {ccclass, property} = cc._decorator;

@ccclass
export default class SynthesisSucceeded extends cc.Component {

    // @property(cc.Label)
    // label: cc.Label = null;

    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    // start () {

    // }
    
    @property(cc.Node)
    txt1:cc.Node=null
    @property(cc.Node)
    txt2:cc.Node=null//品级名字

    @property(cc.Node)
    skillNum1:cc.Node=null//品级等级
    @property(cc.Node)
    skillNum2:cc.Node=null

    @property(cc.Node)
    oldHpNum1:cc.Node=null//生命值
    @property(cc.Node)
    oldAtkNum1:cc.Node=null//攻击力
    @property(cc.Node)
    oldDefanceNum1:cc.Node=null//防御力
    
    @property(cc.Node)
    oldHpNum2:cc.Node=null//生命值
    @property(cc.Node)
    oldAtkNum2:cc.Node=null//攻击力
    @property(cc.Node)
    oldDefanceNum2:cc.Node=null//防御力

    equip_info1:number=null;
    equip_info2:number=null;

    EqfiUI=null

    EquipList=new Array<EquipInfo>();

    Coin=[]
    protected onEnable(): void {
        this.Coin=[]
        if(this.equip_info1){
            let Quality= EquipmentAttributeManager.getInstance().getQuality(this.equip_info1)//品级
            let Quality2= EquipmentAttributeManager.getInstance().getQuality(this.equip_info2)//品级

            // console.log("______",Quality,Quality2)
            let butes1=EquipmentManager.getInstance().getAttributes(this.equip_info1)
            let butes2=EquipmentManager.getInstance().getAttributes(this.equip_info2)

            this.oldHpNum1.parent.active=true
            this.oldHpNum2.parent.active=true
            this.oldAtkNum1.parent.active=true
            this.oldAtkNum2.parent.active=true
            this.oldDefanceNum1.parent.active=true
            this.oldDefanceNum2.parent.active=true
            

            this.oldHpNum1.getComponent(cc.Label).string=""+butes1[2]
            this.oldHpNum2.getComponent(cc.Label).string=""+butes2[2]
            if(butes2[2]==0){
                this.oldHpNum1.parent.active=false
                this.oldHpNum2.parent.active=false
            }


            this.oldAtkNum1.getComponent(cc.Label).string=""+butes1[0]
            this.oldAtkNum2.getComponent(cc.Label).string=""+butes2[0]

            if(butes2[0]==0){
                this.oldAtkNum1.parent.active=false
                this.oldAtkNum2.parent.active=false
            }

            this.oldDefanceNum1.getComponent(cc.Label).string=""+butes1[1]
            this.oldDefanceNum2.getComponent(cc.Label).string=""+butes2[1]

            if(butes2[1]==0){
                this.oldDefanceNum1.parent.active=false
                this.oldDefanceNum2.parent.active=false
            }

            this.skillNum1.getComponent(cc.Label).string="Lv"+Quality
            this.skillNum2.getComponent(cc.Label).string="Lv"+Quality2

            // console.log("___",Quality2)
            if(Quality2==6){
                TaskManager.getInstance().emitTask(TaskItem.累计X件装备到达品质6);
            }
            TaskManager.getInstance().emitTask(TaskItem.合成X次装备);
            TaskManager.getInstance().emitTask(TaskItem.升级1次装备品级);
            let PM=PropManager.getInstance();
            this.txt1.getComponent(cc.Label).string="["+PM.getPropQualityName(Quality)+"]"//
            this.txt1.color=PM.getPropQualityTextColor(Quality-1);

            this.txt2.getComponent(cc.Label).string="["+PM.getPropQualityName(Quality2)+"]"
            this.txt2.color=PM.getPropQualityTextColor(Quality2-1);

            // for (let index = 0; index < this.EquipList.length; index++) {
            //     // if(this.EquipList[index].equip_level>1&&this.EquipList[index].sequence_id!=this.equip_info1.sequence_id){
            //     //     this.Coin.push(this.EquipList[index].equip_level)
            //     // }
            //     //EquipmentManager.getInstance().removeEquipment(this.EquipList[index])
            // }
            //EquipmentManager.getInstance().Findonechangequality(this.equip_info1)
        }
    }

    clickBtnClose()//关闭  刷新装备详情
    {

        let coin=0
        for (let index = 0; index < this.Coin.length; index++) {
            coin+=EquipmentLevelUpCostManager.getInstance().getCoinCostAll(this.Coin[index])//升级所需要的金币
        }
        if(coin>0){
            console.log(coin,this.Coin)
            PropManager.getInstance().changePropNum(PropId.Coin,coin);
            GameManager.getInstance().showGetTip(PropManager.getInstance().createPropItem(PropId.Coin,coin));
        }
        this.EqfiUI.getComponent(EquipInfoUi).refreshInfo(this.equip_info1)
        this.node.active=false
        this.node.parent.getComponent(MergeUi).clickBtnClose()
    }

    // update (dt) {}
}
