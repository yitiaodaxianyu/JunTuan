
import { Go_Type } from "../../Constants";
import { EquipmentAttributeManager } from "../../Equipment/Data/EquipmentAttribute";
import {  EquipmentManager } from "../../Equipment/EquipmentManager";
import GameManager from "../../GameManager";
import { HeroManager } from "../../Hero/Data/HeroManager";
import { Hero_Type } from "../../Hero/Game/HeroConfig";
import LanguageManager from "../../multiLanguage/LanguageManager";
import TextLanguage from "../../multiLanguage/TextLanguage";
import { ItemManager } from "../../Prop/Data/Item";
import { PropAction, PropData } from "../../Prop/PropConfig";
import { PropManager } from "../../Prop/PropManager";
import { SoundIndex } from "../../Sound/AudioConstants";
import TutorailsManager from "../../Tutorials/TutorailsManager";
import UIComponent from "../../UI/UIComponent";
import { UILayerLevel, UIPath } from "../../UI/UIConfig";
import { UIManager } from "../../UI/UIManager";
import { EquipmentMergeManager } from "../Data/EquipmentMerge";
import EquipItem from "./EquipItem";
import MergeUi from "./MergeUi";


const {ccclass, property} = cc._decorator;

@ccclass
export default class EquipInfoUi extends UIComponent {

    equip_id:number=null;
    prop_action:PropAction=PropAction.Buy;
    buy_callback:Function=null;
    use_callback:Function=null;
    prop_data:PropData=null;
    hero_type:Hero_Type=Hero_Type.NULL;

    @property(cc.Node)
    useRoot: cc.Node = null;

    // @property(cc.Node)
    // Weapon_Text: cc.Node[] = [];//各种颜色的图片
    // @property(cc.Node)
    // txt: cc.Node[] = [];//文字
    // @property(cc.SpriteFrame)
    // Spriteliang: cc.SpriteFrame[] = [];//图片精灵图亮起
    // @property(cc.SpriteFrame)
    // Spritelhui: cc.SpriteFrame[] = [];//图片精灵图灰色

    
    @property(cc.Node)
    attText: cc.Node = null//攻击力
    @property(cc.Node)
    defenseText: cc.Node = null//防御力
    @property(cc.Node)
    hpText: cc.Node = null//生命值

    // @property(cc.Node)
    // level: cc.Node = null//等级

    
    // @property(cc.Node)
    // coin: cc.Node = null//当前金币
    
    // @property(cc.Node)
    // zoncoin: cc.Node = null//总金币

        
    // @property(cc.Node)
    // levelBtn: cc.Node = null//升级按钮
    // @property(cc.Node)
    // Coin: cc.Node = null//金币框
    
    @property(cc.Node)
    btnMerge: cc.Node = null//合成框

        
    @property(cc.Node)
    tip: cc.Node = null//商店


    @property(cc.SpriteFrame)
    bbg: cc.SpriteFrame[] = []//背景图

    @property(cc.SpriteFrame)
    bbbg: cc.SpriteFrame[] = []//标题框图
    
    public addBuyListen(callback:Function) {
        this.buy_callback=callback;
    }

    public addUseListen(callback:Function) {
        this.use_callback=callback;
    }
    
    protected start(): void {
        if(TutorailsManager.getInstance().isShowTutorials(225)==false&&TutorailsManager.getInstance().isShowTutorials(227)){
            //找到武器按钮
            let btnUpgrade=this.node.getChildByName('useRoot').getChildByName('btnmoveup');
            let wordPos=btnUpgrade.parent.convertToWorldSpaceAR(btnUpgrade.getPosition());
            let localPos=cc.find('Canvas/Ui_Root').convertToNodeSpaceAR(wordPos);
            TutorailsManager.getInstance().showTutorials(227,null,()=>{
                TutorailsManager.getInstance().saveTutorials(226);
                TutorailsManager.getInstance().saveTutorials(227);
            },true,null,localPos);
        }
    }

    initData(heroType:Hero_Type,equipId:number,pa:PropAction,pd:PropData,buyCallback:Function,useCallback:Function){
        this.hero_type=heroType;
        this.prop_data=pd;
        this.buy_callback=buyCallback;
        this.use_callback=useCallback;        
        this.prop_action=pa;
        this.useRoot.active=this.prop_action==PropAction.Use;
        if(this.prop_action==PropAction.Use){
            this.node.getChildByName("bbg").y=-19
            this.node.getChildByName("btnClose").y=260
            this.node.getChildByName("btnClose").x=282
            this.node.getChildByName("bbg").height=570
            this.node.getChildByName("bbg").width=580
            // this.node.getChildByName("btnClose").active=true
            this.node.getChildByName("bbg").getComponent(cc.Sprite).spriteFrame=this.bbg[0]
            this.node.getChildByName("bbbg").getComponent(cc.Sprite).spriteFrame=this.bbbg[0]
        }else{
            this.node.getChildByName("bbg").y=58
            this.node.getChildByName("bbg").height=600
            this.node.getChildByName("bbg").width=600
            this.node.getChildByName("btnClose").y=320
            this.node.getChildByName("btnClose").x=271
            // this.node.getChildByName("btnClose").active=false
            this.node.getChildByName("bbg").getComponent(cc.Sprite).spriteFrame=this.bbg[1]
            this.node.getChildByName("bbbg").getComponent(cc.Sprite).spriteFrame=this.bbbg[1]
        }
        // console.log("+++++++++")
        this.refreshInfo(equipId)
    }

    refreshInfo(equipId:number){
        // console.log("--------",equipInfo)
        this.tip.active=false
        this.equip_id=equipId;
        //管理器
        let LM=LanguageManager.getInstance();
        let PM=PropManager.getInstance();
        let EAM=EquipmentAttributeManager.getInstance();
        //信息展示
        //标题
        //装备Item
        if(this.node.getChildByName('propRoot').children.length>0){
            this.node.getChildByName('propRoot').children[0].destroy()
        }
        let item=EquipmentManager.getInstance().getEquipNodeById(this.equip_id,PropAction.Null,this.hero_type);
        this.node.getChildByName('propRoot').addChild(item);
        //名称
        let jsonItem=ItemManager.getInstance().getJsonItem(this.equip_id);
        let propName=this.node.getChildByName('propName');
        propName.getComponent(cc.Label).string="["+PM.getPropQualityName(jsonItem.Quality)+"]"+LM.getStrByTextId(jsonItem.NameTextId);
        propName.color=PM.getPropQualityTextColor(jsonItem.Quality);
        let Outlinecolor=[new cc.Color(39, 35, 28),new cc.Color(29, 63, 27),new cc.Color(25, 55, 88),new cc.Color(66, 37, 96),new cc.Color(62, 32, 0),new cc.Color(79, 16, 15)]
        // console.log("______",jsonItem.Quality)
        propName.getComponent(cc.LabelOutline).color=Outlinecolor[(jsonItem.Quality)]

        //类型名称
        let zhuangbeiPos=EquipmentAttributeManager.getInstance().getEquipmentPosition(this.equip_id)//装备位置
        this.node.getChildByName('propType').getComponent(TextLanguage).setTextId(180000+zhuangbeiPos)
        let kuang=EquipmentAttributeManager.getInstance().getStage(this.equip_id)//品质框
        let red=this.btnMerge.getChildByName('red');
        let isRed=false;
        if(kuang>=31){
            this.btnMerge.active=false
            isRed=false;
        }else{
            this.btnMerge.active=true            
            if(!EquipmentAttributeManager.getInstance().getIsMaxStage(equipId)){
                isRed=EquipmentManager.getInstance().checkAEquipMerge(EquipmentMergeManager.getInstance().getTargetEquipment_id(equipId),[]);
            }            
        }
        red.active=isRed;
        // let type=EquipmentAttributeManager.getInstance().getEquipmentPosition(this.equip_info.equip_id);
        // for (let Qualityindex = 0; Qualityindex < this.Spritelhui.length; Qualityindex++) {
        //     // let id=this.equip_info.equip_id-jsonItem.Quality
        //     let id=EquipmentAttributeManager.getID(zhuangbeiPos,Qualityindex+1)
        //     this.txt[Qualityindex].getComponent(TextLanguage).setTextId(190000+EquipmentAttributeManager.getInstance().getExtraAttributeType(id))

        //     this.txt[Qualityindex].getComponent(TextLanguage).setReplaceValue("~",""+EquipmentAttributeManager.getInstance().getExtraAttributeValue(id))

        //     if(Qualityindex<=jsonItem.Quality){
        //         let txtcolor=[new cc.Color(244, 240, 230),new cc.Color(154, 255, 149),new cc.Color(176, 216, 255),new cc.Color(215, 191, 255),new cc.Color(255, 239, 151),new cc.Color(255, 117, 113)]
        //         let Outlinecolor=[new cc.Color(84, 69, 53),new cc.Color(18, 53, 25),new cc.Color(33, 46, 85),new cc.Color(58, 40, 92),new cc.Color(57, 40, 28),new cc.Color(93, 37, 34)]
        //         this.txt[Qualityindex].color=txtcolor[Qualityindex]//.toHEX(txtcolor[Qualityindex])
        //         this.txt[Qualityindex].getComponent(cc.LabelOutline).color=Outlinecolor[Qualityindex]//.toHEX(Outlinecolor[Qualityindex])
        //         // this.txt[Qualityindex].getComponent(cc.Label).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
        //         this.Weapon_Text[Qualityindex].getComponent(cc.Sprite).spriteFrame=this.Spriteliang[Qualityindex]
        //     }else{
        //         let txtcolor="#ACACAC"
        //         let Outlinecolor="#3B3B3B"
        //         this.txt[Qualityindex].color=new cc.Color(172, 172, 172)//.toHEX(txtcolor)
        //         this.txt[Qualityindex].getComponent(cc.LabelOutline).color=new cc.Color(59, 59, 59)//.toHEX(Outlinecolor)
        //         // this.txt[Qualityindex].getComponent(cc.Label).setMaterial(0,cc.Material.getBuiltinMaterial("2d-gray-sprite"));
        //         this.Weapon_Text[Qualityindex].getComponent(cc.Sprite).spriteFrame=this.Spritelhui[Qualityindex]
        //     }
        // }

        this.PropertyUpdate()

    }
    PropertyUpdate(){

        //战力数
        this.node.getChildByName('zhanliNum').getComponent(cc.Label).string=""+EquipmentManager.getInstance().getEquipZhanLi(this.equip_id);
        let attack=EquipmentManager.getInstance().getAttributes(this.equip_id)
        // //攻击力
        let attTextnumber=attack[0]
        this.attText.active=true
        this.defenseText.active=true
        this.hpText.active=true
        if(attTextnumber<=0){
            this.attText.active=false
        }
        this.attText.getChildByName("number").getComponent(cc.Label).string=""+attTextnumber
        // //防御力
        let defenseTextnumber=attack[1]
        if(defenseTextnumber<=0){
            this.defenseText.active=false
        }
        this.defenseText.getChildByName("number").getComponent(cc.Label).string=""+defenseTextnumber
        // //生命值
        let hpTextnumber=attack[2]
        if(hpTextnumber<=0){
            this.hpText.active=false
        }
        this.hpText.getChildByName("number").getComponent(cc.Label).string=""+hpTextnumber

        // let levelnumber=this.equip_info.equip_level
        // if(this.equip_info.equip_level==0){
        //     levelnumber=1
        // }
        // this.level.getComponent(cc.Label).string="(lv."+levelnumber+")"


        // if(this.equip_info.equip_level>=100){
        //     // return
        //     this.Coin.active=false
        //     this.levelBtn.getChildByName("label").getComponent(TextLanguage).setTextId(120024)
        //     this.levelBtn.getChildByName("label").getComponent(TextLanguage).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
        //     this.levelBtn.getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
        // }else{
        //     this.levelBtn.getChildByName("label").getComponent(TextLanguage).setTextId(100018)
        //     this.Coin.active=true
        //     // this.levelBtn.getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
        //     //升级装备的金币
        //     let zoncoin=EquipmentLevelUpCostManager.getInstance().getCoinCost(levelnumber)//升级所需要的金币
        //     //现在的金币
        //     let coin=PropManager.getInstance().getPropNum(PropId.Coin)
        //     let levelcoin=EquipmentLevelUpCostManager.getInstance().getLevelLimit(levelnumber)//升级所需要的关卡//100101

        //     // this.coin.getComponent(cc.Label).string=""+MyTool.getCoinDanwei(coin)

        //     if(LevelManager.getInstance().finish_level<levelcoin){
        //         //变灰
        //         this.levelBtn.getChildByName("label").getComponent(TextLanguage).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
        //         this.levelBtn.getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
        //     }else{
        //         //变亮
        //         this.levelBtn.getChildByName("label").getComponent(TextLanguage).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
        //         this.levelBtn.getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
        //         if(coin<zoncoin){
        //             this.coin.color=cc.color(254, 76, 76)
        //             //变红
        //         }else{
        //             this.coin.color=cc.color(222, 199, 166)
        //             //可升级
        //         }
        //     }
        //     this.zoncoin.getComponent(cc.Label).string="/"+MyTool.getCoinDanwei(zoncoin)
        // }
        this.node.getChildByName('propRoot').children[0].getComponent(EquipItem).refreshData()//刷新武器框
//通关数未达到升级条件
        // console.log("装备属性:",)
    }

    clickBtnClose(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        if(this.prop_action==PropAction.Use&&this.use_callback){
            this.use_callback();
        }
        super.onClose();
    }

    // clickBtnYes(){
    //     GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
    //     if(this.prop_action==PropAction.Buy){
    //         if(PropManager.getInstance().changePropNum(this.prop_data.prop_cost_id,-this.prop_data.prop_price)){
    //             let info=EquipmentManager.getInstance().addEquipment(this.equip_info.equip_id);
    //             let item=EquipmentManager.getInstance().getEquipNodeByInfo(info);
    //             GameManager.getInstance().showGetTip(item);
    //             GameManager.getInstance().refreshGemShow();
    //             if(this.buy_callback){
    //                 this.buy_callback();
    //             }
    //             super.onClose();
    //         }else{
    //             GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(100041));
    //         }
            
    //     }
    // }

    clickBtnReplace(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        let type=EquipmentAttributeManager.getInstance().getEquipmentPosition(this.equip_id);
        UIManager.getInstance().showEquipExchangeUi({onRefresh:(info:number)=>{
            this.refreshInfo(info);
            super.onRefresh(info);
        }},this.equip_id,this.hero_type,type);
    }

    clickBtnUnload(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        //EquipmentManager.getInstance().unloadWearEquipment(this.equip_id);
        let oldCombat = HeroManager.getInstance().getHeroZhanli(this.hero_type);
        let oldData = HeroManager.getInstance().getDeepHeroData(this.hero_type);
        HeroManager.getInstance().unloadWearEquipment(this.hero_type,EquipmentAttributeManager.getInstance().getEquipmentPosition(this.equip_id))
        let newCombat = HeroManager.getInstance().getHeroZhanli(this.hero_type);
        let newData = HeroManager.getInstance().getDeepHeroData(this.hero_type);
        if(oldCombat != newCombat)
            UIManager.getInstance().showCombatChangeEffect(oldCombat,newCombat,oldData,newData);
        if(this.use_callback){
            this.use_callback();
        }
        super.onClose();
    }

    clickBtnMerge(){//合成
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        let type=EquipmentAttributeManager.getInstance().getEquipmentPosition(this.equip_id);
        // UIManager.getInstance().showEquipSyntheticUi({onRefresh:(info:EquipInfo)=>{
        //     this.refreshInfo(info);
        //     super.onRefresh(info);
        // }},this.equip_info,this.equip_info.hero_type,type);


        UIManager.getInstance().showUiDialog(UIPath.EquipSynthetic,UILayerLevel.Three,{onCompleted:(uiNode)=> {
            uiNode.getComponent(MergeUi).initData(this.equip_id,this.hero_type,type,this.node)
            // uiNode.getComponent(MergeUi).init(null);
        },});
        // super.onClose();
    }

    // clickBtnMoveup(){//升级
    //     if(this.equip_info.equip_level>=100){
    //         return
    //     }
    //     //升级装备的金币
    //     let zoncoin=EquipmentLevelUpCostManager.getInstance().getCoinCost(this.equip_info.equip_level)//升级所需要的金币
    //     //现在的金币
    //     let coin=PropManager.getInstance().getPropNum(PropId.Coin)
    //     let levelcoin=EquipmentLevelUpCostManager.getInstance().getLevelLimit(this.equip_info.equip_level)//升级所需要的关卡//100101

    //     if(LevelManager.getInstance().finish_level<levelcoin){
    //         GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(100101))//通关数未达到升级条件
    //     }else{
    //         if(coin<zoncoin){
    //             // 跳商店   前往商城
    //             // console.log("前往商城")
    //             // this.tip.active=true
    //             UIManager.getInstance().showUiDialog(UIPath.CoinPop,UILayerLevel.Three,{onCompleted:(uiNode)=> {
    //                 uiNode.getComponent(CoinPop).init({
    //                     onClose:()=>{
    //                         this.PropertyUpdate()
    //                     }
    //                 })
    //                 uiNode.getComponent(CoinPop).initUi(PropId.Coin)
    //             },});
    //         }else{
    //             // 确认升级
    //             //减钱
    //             PropManager.getInstance().changePropNum(PropId.Coin,-zoncoin)
    //             let num=this.equip_info.equip_level+1
    //             this.equip_info.equip_level=num
    //             EquipmentManager.getInstance().Findonechangelevel(this.equip_info);
                
    //             this.use_callback();
    //             this.refreshInfo(this.equip_info)
    //             // console.log("______",this.equip_info.equip_level)
    //             //把信息同步到文件中

    //             //升等级
    //             //存本地
    //         }
    //     }
    // }
    onBtntip(){
        this.tip.active=false
        GameManager.getInstance().game_to_home=Go_Type.City
        GameManager.getInstance().jumoAndShowUi()
        UIManager.getInstance().closeAllUiDialog(UILayerLevel.One);
    }
    onBtntipClose(){
        this.tip.active=false
    }
}
