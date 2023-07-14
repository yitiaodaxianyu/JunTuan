
import GameManager from "../../GameManager";
import { SoundIndex } from "../../Sound/AudioConstants";
import UIComponent from "../../UI/UIComponent";
import { EquipmentManager } from "../EquipmentManager";
import { Hero_Type } from "../../Hero/Game/HeroConfig";
import { CostData, EquipInfo, EquipType } from "../EquipConfig";
import { PropAction } from "../../Prop/PropConfig";
import { EquipmentAttributeManager } from "../Data/EquipmentAttribute";
import { PropManager } from "../../Prop/PropManager";
import TextLanguage from "../../multiLanguage/TextLanguage";
import { Go_Type } from "../../Constants";
import { UIManager } from "../../UI/UIManager";
import { UILayerLevel } from "../../UI/UIConfig";
import EquipInfoUi from "./EquipInfoUi";
import LanguageManager from "../../multiLanguage/LanguageManager";
import { HeroManager } from "../../Hero/Data/HeroManager";
import { TaskItem } from "../../Task/TaskEnum";
import TaskManager from "../../Task/TaskManager";
import { Follow_Type } from "../../multiLanguage/FollowConstants";
import FollowManager from "../../multiLanguage/FollowManager";


const {ccclass, property} = cc._decorator;

@ccclass
export default class MergeUi extends UIComponent {

    equip_info:number=null;
    
    equip_info2:number=null;
    cur_hero_type:Hero_Type=Hero_Type.NULL;
    equip_type:EquipType=EquipType.ShiPin;

    @property(cc.Node)
    equipment1:cc.Node=null
    @property(cc.Node)
    equipment2:cc.Node=null


    @property(cc.Node)
    btnyes:cc.Node=null
    @property(cc.Node)
    btnno:cc.Node=null
    @property(cc.Node)
    buzutxt:cc.Node=null
    @property(cc.Node)
    jhctxt:cc.Node=null

    @property(cc.Node)
    noWear:cc.Node=null
    @property(cc.Node)
    bbg:cc.Node=null
    @property(cc.Node)
    content:cc.Node=null
    // @property(cc.Prefab)
    // equip_num:cc.Prefab=null
    
    costList=new Array<CostData>();
    @property(cc.Node)
    SynthesisSucceeded:cc.Node=null

    EqfiUI=null
    
    initData(equipId:number,heroType:Hero_Type,equipPos:EquipType,EqfiUI){
        this.equip_info=equipId;
        let pzhi=EquipmentAttributeManager.getInstance().getStage(equipId)+1//品质
        let weizhi=EquipmentAttributeManager.getInstance().getEquipmentPosition(equipId)//位置
        let id=EquipmentAttributeManager.getID(weizhi,pzhi)
        this.equip_info2=id

        this.cur_hero_type=heroType;
        this.equip_type=equipPos;
        this.EqfiUI=EqfiUI
        this.initUi();
        this.loadEquipList();
    }
    initUi() {
        //GameManager.getInstance().music_manager.playMusic(MusicIndex.BGM_TJP);
        // FollowManager.getInstance().followEvent(Follow_Type.铁匠铺打开次数);

    }
    loadEquipList(){
        this.SynthesisSucceeded.active=false
        this.costList=[]
        let isCan=EquipmentManager.getInstance().checkAEquipMerge(this.equip_info2,this.costList)
        if(this.equip_info){
            let item1=EquipmentManager.getInstance().getEquipNodeById(this.equip_info,PropAction.Null,this.cur_hero_type);
            this.equipment1.addChild(item1);
            let item2=EquipmentManager.getInstance().getEquipNodeById(this.equip_info2,PropAction.Null);
            this.equipment2.addChild(item2);
            if(isCan){
                this.bbg.height=600
                this.jhctxt.active=true
                this.buzutxt.active=false
                this.btnyes.setPosition(-124,-244,0)
                this.btnno.setPosition(124,-244,0)
                this.btnyes.getChildByName("label").getComponent(TextLanguage).setTextId(100102)
                this.noWear.setPosition(0,-129,0)
                for (let index = 0; index < this.costList.length; index++) {
                    let item=PropManager.getInstance().createPropItem(this.costList[index].cost_id,this.costList[index].cost_num);
                    item.scale=0.8;
                    item.parent=this.content
                    // let num=cc.instantiate(this.equip_num)
                    // num.setPosition(22,-31,0)
                    // num.getComponent(cc.Label).string=""+this.costList[index].cost_num
                    // num.parent=item
                }
            }else{
                this.bbg.height=535
                this.btnyes.getChildByName("label").getComponent(TextLanguage).setTextId(200009)
                this.btnyes.setPosition(-124,-185,0)
                this.btnno.setPosition(124,-185,0)
                this.jhctxt.active=false
                this.buzutxt.active=true
                this.noWear.setPosition(0,-66,0)
            }
        }
    }

    clickBtnyes(){//确认升级
        if(this.btnyes.getChildByName("label").getComponent(TextLanguage).getTextId()==100102){//合成成功
            // this.SynthesisSucceeded.getComponent(SynthesisSucceeded).equip_info1=this.equip_info
            // this.SynthesisSucceeded.getComponent(SynthesisSucceeded).equip_info2=this.equip_info2
            // this.SynthesisSucceeded.getComponent(SynthesisSucceeded).EqfiUI=this.EqfiUI
            // this.SynthesisSucceeded.getComponent(SynthesisSucceeded).EquipList=this.EquipList
            // this.SynthesisSucceeded.active=true 
            let oldCombat = HeroManager.getInstance().getHeroZhanli(this.cur_hero_type);
            let oldData = HeroManager.getInstance().getDeepHeroData(this.cur_hero_type);

            FollowManager.getInstance().followEvent(Follow_Type.不同ID装备的合成次数+this.equip_info);

            PropManager.getInstance().changePropNum(this.equip_info2,1);
            for (let index = 0; index < this.costList.length; index++) {
                let cost=this.costList[index];
                PropManager.getInstance().changePropNum(cost.cost_id,-cost.cost_num);
            }
            PropManager.getInstance().changePropNum(this.equip_info,-1);
            for (let index = 0; index < this.content.children.length; index++) {
                this.content.children[index].destroy()
            }

            
            TaskManager.getInstance().emitTask(TaskItem.合成X次装备);
            this.equipment1.children[0].destroy()
            this.equipment2.children[0].destroy()
            GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(220006),0.5);
            HeroManager.getInstance().addWearEquipment(this.cur_hero_type,this.equip_info2);
            this.initData(this.equip_info2,this.cur_hero_type,this.equip_type,this.EqfiUI)
            let newCombat = HeroManager.getInstance().getHeroZhanli(this.cur_hero_type);
            let newData = HeroManager.getInstance().getDeepHeroData(this.cur_hero_type);
            if(oldCombat != newCombat)
                UIManager.getInstance().showCombatChangeEffect(oldCombat,newCombat,oldData,newData);
            // this.clickBtnClose()
        }else{
            //前往商城  跳商店
            // console.log("前往商城")
            GameManager.getInstance().game_to_home=Go_Type.City
            GameManager.getInstance().jumoAndShowUi()
            UIManager.getInstance().closeAllUiDialog(UILayerLevel.One);
            this.clickBtnClose()
        }
    }
    clickBtnClose()//关闭   取消升级
    {

        for (let index = 0; index < this.content.children.length; index++) {
            this.content.children[index].destroy()
        }
        this.equipment1.children[0].destroy()
        this.equipment2.children[0].destroy()
        this.EqfiUI.getComponent(EquipInfoUi).refreshInfo(this.equip_info)
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        this.onClose();
    }
}
