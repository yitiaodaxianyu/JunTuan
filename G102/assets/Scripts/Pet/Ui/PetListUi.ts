import GameManager from "../../GameManager";
import { Follow_Type } from "../../multiLanguage/FollowConstants";
import FollowManager from "../../multiLanguage/FollowManager";
import LanguageManager from "../../multiLanguage/LanguageManager";
import { MusicIndex } from "../../Sound/AudioConstants";
import TakeEggUi from "../../TakeEgg/TakeEggUi";
import { UILayerLevel, UIPath } from "../../UI/UIConfig";
import { UIManager } from "../../UI/UIManager";
import { PetInfo, PetType } from "../PetConfig";
import { PetManager } from "../PetManager";
import BtnPet from "./BtnPet";
// import PetItem from "./PetItem";

const { ccclass, property } = cc._decorator;

enum PetListState{
    List = 0,
    SetFree = 1
}

@ccclass
export default class PetListUi extends cc.Component {

    @property(cc.Prefab)
    item:cc.Prefab = null;
    @property(cc.SpriteAtlas)
    pet_list_ui:cc.SpriteAtlas = null;
    
    private state: PetType = PetType.All;
    private all_list: PetInfo[] = null;
    private power_list: PetInfo[] = null;
    private agile_list: PetInfo[] = null;
    private intelligence_list: PetInfo[] = null;
    private pet_list_state:PetListState = PetListState.List;
    private choose_list : Map<number,PetInfo> = null;

    private content: cc.Node = null;

    onLoad() {
        this.node.on(cc.Node.EventType.POSITION_CHANGED,this.onPositionChange,this);
    }

    protected onDestroy(): void {
        this.node.off(cc.Node.EventType.POSITION_CHANGED,this.onPositionChange,this);
    }

    onPositionChange(){
        if(this.node.x==0){
            this.onEnable();
        }
    }

    protected onEnable(): void {
        this.content = this.node.getChildByName("scroll0").getComponent(cc.ScrollView).content;
        this.choose_list = new Map<number,PetInfo>();
        this.refreshUi();
        this.refreshScroll();
        //GameManager.getInstance().music_manager.playMusic(MusicIndex.BGM_Pets);
        FollowManager.getInstance().followEvent(Follow_Type.宠物界面点击次数);
    }

    refreshUi() {
        // this.node.getChildByName("selectTypeBg").getChildByName("selectTypeBg").setPosition(this.node.getChildByName("type" + this.state).position)
        let bottom =  this.node.getChildByName("bottom");
        this.node.getChildByName("top").getChildByName("titleLabel").getComponent(cc.Label).string = LanguageManager.getInstance().getStrByTextId(640002);
        bottom.getChildByName("Sprite_Btn_Tab_0").getComponentInChildren(cc.Label).string = LanguageManager.getInstance().getStrByTextId(640008);
        bottom.getChildByName("Sprite_Btn_Tab_1").getComponentInChildren(cc.Label).string = LanguageManager.getInstance().getStrByTextId(640002);
        bottom.getChildByName("Sprite_Btn_Tab_2").getComponentInChildren(cc.Label).string = LanguageManager.getInstance().getStrByTextId(640017);
        bottom.getChildByName("Release_Bg_1").getChildByName("num").getComponent(cc.Label).string = this.choose_list.size + "/100";
    }

    refreshScroll() {
        this.all_list = new Array<PetInfo>();
        this.power_list = new Array<PetInfo>();
        this.agile_list = new Array<PetInfo>();
        this.intelligence_list = new Array<PetInfo>();
        this.content.removeAllChildren();

        // this.all_list = PetManager.getInstance().getPetList();
        for (let i = 0; i < this.all_list.length; i++) {
            // let type = SpiritMessageManager.getInstance().getSpiritType(this.all_list[i].pet_id);
            // if (type == PetType.Power) {
            //     this.power_list.push(this.all_list[i]);
            // } else if (type == PetType.Agile) {
            //     this.agile_list.push(this.all_list[i]);
            // } else {
            //     this.intelligence_list.push(this.all_list[i]);
            // }
        }
        let tempList:PetInfo[];
        switch (this.state) {
            case PetType.All:
                tempList = this.all_list;
                break;
            case PetType.Power:
                tempList = this.power_list;
                break;
            case PetType.Agile:
                tempList = this.agile_list;
                break;
            case PetType.Intelligence:
                tempList = this.intelligence_list
                break;
        }
        for (let i = 0; i < tempList.length; i++) {
             if(this.pet_list_state == PetListState.List){
                let item = cc.instantiate(this.item);
                // item.getComponent(PetItem).init(tempList[i]);
                item.setParent(this.content);
                item.on(cc.Node.EventType.TOUCH_END,() => {
                    UIManager.getInstance().showPetUpgradeUi({
                        onClose:()=>{
                            this.refreshScroll();
                        }
                    },tempList[i]);
                });
             }else{
                let item = cc.instantiate(this.item);
                // item.getComponent(PetItem).init(tempList[i]);
                let kuang = new cc.Node();
                kuang.addComponent(cc.Sprite).spriteFrame = this.pet_list_ui.getSpriteFrame("Release_Checkmark_Bg");
                kuang.setPosition(cc.v2(-item.width/2,item.height/2))
                item.addChild(kuang);
                if(this.choose_list.has(tempList[i].sequence_id)){
                    let gou = new cc.Node();
                    gou.addComponent(cc.Sprite).spriteFrame = this.pet_list_ui.getSpriteFrame("Release_Checkmark");
                    gou.setPosition(cc.v2(-item.width/2,item.height/2))
                    item.addChild(gou);
                }
                item.setParent(this.content);
                item.on(cc.Node.EventType.TOUCH_END,this.onClickSetFreePet.bind(this));
             }
        }

    }

    onSelectBtnClick(e,type:number){
        this.state = Number(type)
        this.refreshUi();
        for (let i = 0; i < 4; i++) {
            let scroll = this.node.getChildByName("scroll" + i);
            scroll.active = false;
            if (i == this.state) {
                scroll.active = true;
                this.content = scroll.getComponent(cc.ScrollView).content;
            }
        }
        let tempList;
        switch (this.state) {
            case PetType.All:
                tempList = this.all_list;
                break;
            case PetType.Power:
                tempList = this.power_list;
                break;
            case PetType.Agile:
                tempList = this.agile_list;
                break;
            case PetType.Intelligence:
                tempList = this.intelligence_list
                break;
        }
        if(this.content.childrenCount != tempList.length){
            this.refreshScroll();
        }
    }

    onClickSetFreePet(e:cc.Event.EventTouch){
        // if (this.choose_list.has(e.target.getComponent(PetItem).pet_info.sequence_id)) {
        //         this.choose_list.delete(e.target.getComponent(PetItem).pet_info.sequence_id)
        // }
        // else{
        //     this.choose_list.set(e.target.getComponent(PetItem).pet_info.sequence_id,e.target.getComponent(PetItem).pet_info);
        // }
        this.refreshScroll();
    }

    onClickGetBtn(){
        FollowManager.getInstance().followEvent(Follow_Type.从宠物界面点击获取的次数);
        // UIManager.getInstance().showTakeEggUi(null);
        UIManager.getInstance().showUiDialog(UIPath.TakeEgg,UILayerLevel.One,{onCompleted:(uiNode)=> {
            uiNode.getComponent(TakeEggUi).init(null);
        },})
    }

    onClickSetFreePetBtn(){
        let bottom = this.node.getChildByName("bottom")
        this.pet_list_state = PetListState.SetFree;
        bottom.getChildByName("Release_Bg_1").active = true;
        bottom.getChildByName("Sprite_Btn_Tab_1").getComponent(cc.Sprite).spriteFrame = this.pet_list_ui.getSpriteFrame("Sprite_Btn_Tab_0");
        bottom.getChildByName("Sprite_Btn_Tab_0").getComponent(cc.Sprite).spriteFrame = this.pet_list_ui.getSpriteFrame("Sprite_Btn_Tab_1");
        this.refreshUi();
        this.refreshScroll();
    }

    onClickPetBtn(){
        let bottom = this.node.getChildByName("bottom")
        this.pet_list_state = PetListState.List;
        bottom.getChildByName("Release_Bg_1").active = false;
        bottom.getChildByName("Sprite_Btn_Tab_1").getComponent(cc.Sprite).spriteFrame = this.pet_list_ui.getSpriteFrame("Sprite_Btn_Tab_1");
        bottom.getChildByName("Sprite_Btn_Tab_0").getComponent(cc.Sprite).spriteFrame = this.pet_list_ui.getSpriteFrame("Sprite_Btn_Tab_0");
        this.refreshUi();
        this.refreshScroll();
    }

    onClickSetFreeBtn(){
        if(this.choose_list.size == 0) return;
        let tempList : PetInfo[] = [];
        this.choose_list.forEach((v,k) => {
            tempList.push(v);
        });
        UIManager.getInstance().showPetSetFreeUi({
            onClose:(() =>{
                this.refreshUi();
                this.refreshScroll();
            }).bind(this),
        },tempList);
    }

}
