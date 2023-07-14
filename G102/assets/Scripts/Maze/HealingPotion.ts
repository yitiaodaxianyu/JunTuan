import { RogueHexagonTypesManager } from "../copy/voidcrack/RogueHexagonTypes";
import GameManager from "../GameManager";
import { Follow_Type } from "../multiLanguage/FollowConstants";
import FollowManager from "../multiLanguage/FollowManager";
import LanguageManager from "../multiLanguage/LanguageManager";
import { SoundIndex } from "../Sound/AudioConstants";
import UIComponent from "../UI/UIComponent";
// import { RogueHexagonTypesManager } from "./Data/RogueHexagonTypes";
import { RogueTextManager } from "./Data/RogueText";
import { MazeManager } from "./MazeManager";
import MazeUi from "./MazeUi";


const {ccclass, property} = cc._decorator;

@ccclass
export default class HealingPotion extends UIComponent {

    box_id:number=5;
    is_can_go:boolean=false;    

    initData(id:number,isCanGo:boolean){
        this.box_id=id;
        this.is_can_go=isCanGo;          
        this.initUi();
    }

    initUi(){
        //标题
        let type=RogueHexagonTypesManager.getInstance().getHexagonType(this.box_id);
        let jsonData=RogueTextManager.getInstance().getJsonRogueText(type);
        let titleLabel=this.node.getChildByName('titleLabel');
        titleLabel.getComponent(cc.Label).string=LanguageManager.getInstance().getStrByTextId(jsonData.Roguetitle_ID);
        let contentLabel=this.node.getChildByName('contentLabel');
        contentLabel.getComponent(cc.Label).string=LanguageManager.getInstance().getStrByTextId(jsonData.RogueText_ID);
        this.node.getChildByName('btnNo').active=this.is_can_go;
        this.node.getChildByName('btnYes').active=this.is_can_go;
    }

    clickBtnYes(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        //增加城墙的生命值
        MazeManager.getInstance().setPassingId(this.box_id);
        MazeManager.getInstance().setFightingId(this.box_id);
        MazeManager.getInstance().addMazePassedId(this.box_id);        
        //
        let curHp=MazeManager.getInstance().getMazeHp();
        let maxHp=MazeManager.getInstance().getMazeMaxHp();
        curHp+=maxHp*0.5;
        let hp=maxHp-curHp;
        if(hp<0){
            hp=0;
        }
        MazeManager.getInstance().setMazeSubHp(hp);
        MazeUi.getInstance().refreshFloor();
        super.onClose();
        FollowManager.getInstance().followEvent(Follow_Type.rogue玩法治疗药水事件);
    }

    clickBtnNo(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        super.onClose();
    }
}
