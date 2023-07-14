import { HeroManager } from "../../Hero/Data/HeroManager";
import { Hero_Type } from "../../Hero/Game/HeroConfig";
import LanguageManager from "../../multiLanguage/LanguageManager";
import { PetInfo } from "../../Pet/PetConfig";
import { PetManager } from "../../Pet/PetManager";
import MyTool from "../../Tools/MyTool";
import UIComponent from "../UIComponent";
import { UiAction } from "../UiInterface";

const {ccclass, property} = cc._decorator;

@ccclass
export default class AtrributeUi extends UIComponent {

    private hero_type : Hero_Type = Hero_Type.NULL;
    private hero_stage : number;
    private hero_level : number;
    private pet_info : PetInfo = null;

    init(uiAc: UiAction) {
        super.init(uiAc);
    }

    initHeroType(heroType:Hero_Type){
        this.hero_type = heroType;
        this.refreshHeroUi();
    }
    initPreviewHeroType(heroType:Hero_Type,stage:number,level:number){
        this.hero_type = heroType;
        this.hero_stage = stage;
        this.hero_level = level;
        this.refreshPreviewHeroUi();
    }

    initPetInfo(petInfo:PetInfo){
        this.pet_info = petInfo;
        this.refreshPetUi();
    }

    refreshHeroUi(){
        let data = HeroManager.getInstance().getHeroData(this.hero_type);
        this.node.getChildByName("title").getComponent(cc.Label).string = LanguageManager.getInstance().getStrByTextId(110023);
        // this.node.getChildByName("tips").getComponent(cc.Label).string = LanguageManager.getInstance().getStrByTextId(110024);
        this.node.getChildByName("Label0").getComponent(cc.Label).string = LanguageManager.getInstance().getStrByTextId(110030);
        this.node.getChildByName("Label1").getComponent(cc.Label).string = LanguageManager.getInstance().getStrByTextId(100089);
        this.node.getChildByName("Label2").getComponent(cc.Label).string = LanguageManager.getInstance().getStrByTextId(110015);
        this.node.getChildByName("Label3").getComponent(cc.Label).string = LanguageManager.getInstance().getStrByTextId(110016);
        this.node.getChildByName("Label4").getComponent(cc.Label).string = LanguageManager.getInstance().getStrByTextId(110017);
        this.node.getChildByName("Label5").getComponent(cc.Label).string = LanguageManager.getInstance().getStrByTextId(110018);
        this.node.getChildByName("Label6").getComponent(cc.Label).string = LanguageManager.getInstance().getStrByTextId(110019);
        this.node.getChildByName("Label7").getComponent(cc.Label).string = LanguageManager.getInstance().getStrByTextId(110021);
        this.node.getChildByName("Label8").getComponent(cc.Label).string = LanguageManager.getInstance().getStrByTextId(110020);
        this.node.getChildByName("Label9").getComponent(cc.Label).string = LanguageManager.getInstance().getStrByTextId(110022);
        this.node.getChildByName("LabelNum0").getComponent(cc.Label).string = "" + MyTool.numberFormat(data.atkSpeed,1);//攻速
        this.node.getChildByName("LabelNum1").getComponent(cc.Label).string = "" + MyTool.numberFormat(data.total_attack);//总攻击力
        this.node.getChildByName("LabelNum2").getComponent(cc.Label).string = "" + MyTool.numberFormat(data.total_defense);//总防御力
        this.node.getChildByName("LabelNum3").getComponent(cc.Label).string = "" + MyTool.numberFormat(data.total_hp);//总生命值
        this.node.getChildByName("LabelNum4").getComponent(cc.Label).string = "" + MyTool.numberFormat(data.Hit,1);//命中值
        this.node.getChildByName("LabelNum5").getComponent(cc.Label).string = "" + MyTool.numberFormat(data.Miss,1);//闪避值
        this.node.getChildByName("LabelNum6").getComponent(cc.Label).string = "" + MyTool.numberFormat(data.Critical,1);//暴击值
        this.node.getChildByName("LabelNum7").getComponent(cc.Label).string = "" + MyTool.numberFormat(data.AntiCritical,1);///防爆值
        this.node.getChildByName("LabelNum8").getComponent(cc.Label).string = "" + MyTool.numberFormat(data.ExtraCritical * 100,2) + "%";//暴击增幅
        this.node.getChildByName("LabelNum9").getComponent(cc.Label).string = "" + MyTool.numberFormat(data.AntiExtraCritical * 100,2) + "%";//暴击抗性
    }

    refreshPreviewHeroUi(){
        let data = HeroManager.getInstance().getTargetHeroData(this.hero_type,this.hero_stage,this.hero_level);
        this.node.getChildByName("title").getComponent(cc.Label).string = LanguageManager.getInstance().getStrByTextId(110023);
        // this.node.getChildByName("tips").getComponent(cc.Label).string = LanguageManager.getInstance().getStrByTextId(110024);
        this.node.getChildByName("Label0").getComponent(cc.Label).string = LanguageManager.getInstance().getStrByTextId(110030);
        this.node.getChildByName("Label1").getComponent(cc.Label).string = LanguageManager.getInstance().getStrByTextId(100089);
        this.node.getChildByName("Label2").getComponent(cc.Label).string = LanguageManager.getInstance().getStrByTextId(110015);
        this.node.getChildByName("Label3").getComponent(cc.Label).string = LanguageManager.getInstance().getStrByTextId(110016);
        this.node.getChildByName("Label4").getComponent(cc.Label).string = LanguageManager.getInstance().getStrByTextId(110017);
        this.node.getChildByName("Label5").getComponent(cc.Label).string = LanguageManager.getInstance().getStrByTextId(110018);
        this.node.getChildByName("Label6").getComponent(cc.Label).string = LanguageManager.getInstance().getStrByTextId(110019);
        this.node.getChildByName("Label7").getComponent(cc.Label).string = LanguageManager.getInstance().getStrByTextId(110021);
        this.node.getChildByName("Label8").getComponent(cc.Label).string = LanguageManager.getInstance().getStrByTextId(110020);
        this.node.getChildByName("Label9").getComponent(cc.Label).string = LanguageManager.getInstance().getStrByTextId(110022);
        this.node.getChildByName("LabelNum0").getComponent(cc.Label).string = "" + MyTool.numberFormat(data.atkSpeed,1);//攻速
        this.node.getChildByName("LabelNum1").getComponent(cc.Label).string = "" + MyTool.numberFormat(data.total_attack);//总攻击力
        this.node.getChildByName("LabelNum2").getComponent(cc.Label).string = "" + MyTool.numberFormat(data.total_defense);//总防御力
        this.node.getChildByName("LabelNum3").getComponent(cc.Label).string = "" + MyTool.numberFormat(data.total_hp);//总生命值
        this.node.getChildByName("LabelNum4").getComponent(cc.Label).string = "" + MyTool.numberFormat(data.Hit,1);//命中值
        this.node.getChildByName("LabelNum5").getComponent(cc.Label).string = "" + MyTool.numberFormat(data.Miss,1);//闪避值
        this.node.getChildByName("LabelNum6").getComponent(cc.Label).string = "" + MyTool.numberFormat(data.Critical,1);//暴击值
        this.node.getChildByName("LabelNum7").getComponent(cc.Label).string = "" + MyTool.numberFormat(data.AntiCritical,1);///防爆值
        this.node.getChildByName("LabelNum8").getComponent(cc.Label).string = "" + MyTool.numberFormat(data.ExtraCritical * 100,2) + "%";//暴击增幅
        this.node.getChildByName("LabelNum9").getComponent(cc.Label).string = "" + MyTool.numberFormat(data.AntiExtraCritical * 100,2) + "%";//暴击抗性
    }

    refreshPetUi(){
        // let data = PetManager.getInstance().getPetData(this.pet_info);
        // this.node.getChildByName("LabelNum1").getComponent(cc.Label).string = "" + data.Health;//总生命值
        // this.node.getChildByName("LabelNum2").getComponent(cc.Label).string = "" + data.Attack;//总攻击力
        // this.node.getChildByName("LabelNum3").getComponent(cc.Label).string = "" + data.Defense;//总防御力 todo
        // this.node.getChildByName("LabelNum4").getComponent(cc.Label).string = "" + MyTool.numberFormat(data.Hit,1);//命中值
        // this.node.getChildByName("LabelNum5").getComponent(cc.Label).string = "" + MyTool.numberFormat(data.Critical,1);//暴击值
        // this.node.getChildByName("LabelNum6").getComponent(cc.Label).string = "" + MyTool.numberFormat(data.Miss,1);//闪避值
        // this.node.getChildByName("LabelNum7").getComponent(cc.Label).string = "" + MyTool.numberFormat(data.AntiCritical,1);///防爆值
        // this.node.getChildByName("LabelNum8").getComponent(cc.Label).string = "" + MyTool.numberFormat(data.ExtraCritical * 100,2) + "%";//暴击增幅
        // this.node.getChildByName("LabelNum9").getComponent(cc.Label).string = "" + MyTool.numberFormat(data.AntiExtraCritical * 100,2) + "%";//暴击抗性
    }

}
