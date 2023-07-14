
import ApkManager from "../../Ads/ApkManager";
import { EquipInfo } from "../../Equipment/EquipConfig";
import GameManager from "../../GameManager";
import { Follow_Type } from "../../multiLanguage/FollowConstants";
import FollowManager from "../../multiLanguage/FollowManager";
import { ItemManager } from "../../Prop/Data/Item";
import Prop from "../../Prop/Prop";
import { PropAction, PropData } from "../../Prop/PropConfig";
import { PropManager } from "../../Prop/PropManager";
import { SoundIndex } from "../../Sound/AudioConstants";
import UIComponent from "../UIComponent";
import { UiAction } from "../UiInterface";

const {ccclass, property} = cc._decorator;


enum State{
    All = 1,
    Prop,
    Equipment,       
}

@ccclass
export default class BagUi extends UIComponent {
    // 特殊物品列表
    private especial_list:PropData[] = new Array();
    // 宝箱列表
    private treasure_chest_list:PropData[] = new Array();
    // 资源道具列表
    private assets_list:PropData[] = new Array();
    // 玩法货币列表
    private play_money_list:PropData[] = new Array();
    // 消耗品列表
    private consumables_list:PropData[] = new Array();

    private equipment_list:EquipInfo[] = null;

    private prop_list:PropData[] = null;

    private scoll_content:cc.Node = null;

    private null_item:cc.Node = null;


    init(uiAc: UiAction) {
        super.init(uiAc);
        FollowManager.getInstance().followEvent(Follow_Type.打开背包次数);
        this.initSelectButton(State.All,true);
        this.initScroll(State.All);
    }

    initSelectButton(type:State,isInit:boolean){
        for(let i = 1;i < 4;i++){
            let btn = this.node.getChildByName("buttonBg"+i);
            let selectBtn = this.node.getChildByName("selectedButtonBg" + i);
            let btnLabel = this.node.getChildByName("btnLabel" + i)
            let selectBtnLabel = this.node.getChildByName("selectBtnLabel" + i);

            if(i == type){
                btn.active = false;
                btnLabel.active = false;
                selectBtn.active = true;
                selectBtnLabel.active = true;
            }else{
                btn.active = true;
                btnLabel.active = true;
                selectBtn.active = false;
                selectBtnLabel.active = false;
            }
            if(isInit){
                btn.on(cc.Node.EventType.TOUCH_END,() =>{
                    this.initSelectButton(i,false);
                    this.scoll_content.removeAllChildren();
                    this.initScroll(i);
                })
            }
        }
    }

    initScroll(type:State){
        this.especial_list = new Array();
        this.treasure_chest_list = new Array();
        this.assets_list = new Array();
        this.play_money_list = new Array();
        this.consumables_list = new Array();
        this.prop_list = new Array();

        let numLabel:cc.Node;
        this.scoll_content = this.node.getChildByName("scroll").getComponent(cc.ScrollView).content
        this.null_item = this.node.getChildByName("nullItem")
        numLabel = this.node.getChildByName("capacityNum")
        this.equipment_list = new Array();

        if (type != State.Prop) {
            let equipmentList1 = PropManager.getInstance().getEquipmentList(1);
            let equipmentList2 = PropManager.getInstance().getEquipmentList(2);
            let equipmentList3 = PropManager.getInstance().getEquipmentList(3);
            this.equipment_list = this.equipment_list.concat(equipmentList1, equipmentList2, equipmentList3);
            //EquipmentManager.getInstance().sortEquipmentList(this.equipment_list);
        }

        if (type != State.Equipment) {
            let propList = PropManager.getInstance().getSortPropList();
            for (let i = 0; i < propList.length; i++) {
                let type = ItemManager.getInstance().getType(propList[i].prop_id)
                switch (type) {
                    case 4:
                        // 消耗品
                        this.consumables_list.push(propList[i]);
                        break;
                    case 5:
                        // 资源道具
                        this.assets_list.push(propList[i]);
                        break;
                    case 6:
                        // 玩法货币
                        this.play_money_list.push(propList[i]);
                        break;
                    case 8:
                        // 宝箱
                        this.treasure_chest_list.push(propList[i]);
                        break;
                    case 9:
                        // 特殊物品
                        this.especial_list.push(propList[i]);
                        break;
                }
            }
            this.prop_list = this.prop_list.concat(this.especial_list, this.treasure_chest_list, this.assets_list, this.play_money_list, this.consumables_list);
            if(numLabel.getComponent(cc.Label).string == ""){
                numLabel.getComponent(cc.Label).string = "" + (this.prop_list.length + this.equipment_list.length) + "/200";
            }
        }
        // this.framingLoad(200);
        let index = 0;
        this.unscheduleAllCallbacks();
        this.scoll_content.removeAllChildren();
        this.schedule(()=>{
            if(index<(this.prop_list.length+this.equipment_list.length)){
                // 显示道具
                if(index<this.prop_list.length){
                    // 优先显示道具
                    let item;
                    if(ItemManager.getInstance().getType(this.prop_list[index].prop_id) == 5){
                        item = PropManager.getInstance().createPropItem(this.prop_list[index].prop_id,this.prop_list[index].prop_num,PropAction.Use);
                        item.getComponent(Prop).addUseListen(() =>{
                            numLabel.getComponent(cc.Label).string = "";
                            this.initScroll(type);
                        })
                    }else{
                        // console.log(this.prop_list[index].prop_id)
                        item = PropManager.getInstance().createPropItem(this.prop_list[index].prop_id,this.prop_list[index].prop_num,PropAction.Look);
                        item.getComponent(Prop).addUseListen(() =>{
                            numLabel.getComponent(cc.Label).string = "";
                            this.initScroll(type);
                        })
                    }
                    item.setParent(this.scoll_content);
                }else{
                    // 再显示装备
                    // let equipment = PropManager.getInstance().createPropItem(this.equipment_list[i-this.prop_list.length].equip_id,1,PropAction.Look);
                    // let equipment = EquipmentManager.getInstance().getEquipNodeById(this.equipment_list[index-this.prop_list.length].equip_id);
                    // equipment.getComponent(EquipItem).addUseListen(() =>{
                    //     this.initScroll(type);
                    // })
                    // equipment.setParent(this.scoll_content);
                }
            }else{
                // 显示白板
                let item = cc.instantiate(this.null_item);
                item.active = true;
                item.setParent(this.scoll_content);
            }
            index++;
        },0.01,200,0);
    }

    /**
     * （新增代码）获取生成子节点的Generator
     */
    private *getItemGenerator(length: number) {
        for (let i = 0; i < length; i++) {
            // 初始化道具
            yield this.initItem(i);
        }
    }

    private initItem(i:number) {
        if(i<(this.prop_list.length+this.equipment_list.length)){
            // 显示道具
            if(i<this.prop_list.length){
                // 优先显示道具
                let item;
                if(ItemManager.getInstance().getType(this.prop_list[i].prop_id) == 5){
                    item = PropManager.getInstance().createPropItem(this.prop_list[i].prop_id,this.prop_list[i].prop_num,PropAction.Use);
                }else{
                    item = PropManager.getInstance().createPropItem(this.prop_list[i].prop_id,this.prop_list[i].prop_num,PropAction.Look);
                }
                item.setParent(this.scoll_content);
            }else{
                // 再显示装备
                // let equipment = PropManager.getInstance().createPropItem(this.equipment_list[i-this.prop_list.length].equip_id,1,PropAction.Look);
                // let equipment = EquipmentManager.getInstance().getEquipNodeById(this.equipment_list[i-this.prop_list.length].equip_id);
                // equipment.setParent(this.scoll_content);
            }
        }else{
            // 显示白板
            let item = cc.instantiate(this.null_item);
            item.active = true;
            item.setParent(this.scoll_content);
        }
    }

    /**
     * 实现分帧加载
     */
    async framingLoad(length: number) {
        await this.executePreFrame(this.getItemGenerator(length), 1);
    }

    /**
     * 分帧执行 Generator 逻辑
     * @param generator 生成器
     * @param duration 持续时间（ms）
     * 每次执行 Generator 的操作时，最长可持续执行时长。
     * 假设值为8ms，那么表示1帧（总共16ms）下，分出8ms时间给此逻辑执行
     */
    private executePreFrame(generator: Generator, duration: number) {
        return new Promise<void>((resolve, reject) => {
            let gen = generator;
            // 创建执行函数
            let execute = () => {

                // 执行之前，先记录开始时间戳
                let startTime = new Date().getTime();

                // 然后一直从 Generator 中获取已经拆分好的代码段出来执行
                for (let iter = gen.next(); ; iter = gen.next()) {

                    // 判断是否已经执行完所有 Generator 的小代码段
                    // 如果是的话，那么就表示任务完成
                    if (iter == null || iter.done) {
                        resolve();
                        return;
                    }

                    // 每执行完一段小代码段，都检查一下是否
                    // 已经超过我们分配给本帧，这些小代码端的最大可执行时间
                    if (new Date().getTime() - startTime > duration) {
                        
                        // 如果超过了，那么本帧就不在执行，开定时器，让下一帧再执行
                        this.scheduleOnce(() => {
                            execute();
                        });
                        return;
                    }
                }
            };

            // 运行执行函数
            execute();
        });
    }

    clickBtnClose()
    {
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        this.destroySelf();
    }

    destroySelf()
    {
        super.onClose();
        ApkManager.getInstance().closeBanner();
        // EventManager.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Main_SignIn);
    }
}
