import GameManager from "../GameManager";
import LanguageManager from "../multiLanguage/LanguageManager";
import { SoundIndex } from "../Sound/AudioConstants";
import UIComponent from "../UI/UIComponent";
import { RogueBuffManager } from "./Data/RogueBuff";
import { RogueHexagonTypesManager } from "./Data/RogueHexagonTypes";
import { RogueTextManager } from "./Data/RogueText";
import MazeBuffItem from "./MazeBuffItem";
import { MazeManager } from "./MazeManager";
import MazeUi from "./MazeUi";


const {ccclass, property} = cc._decorator;

@ccclass
export default class MazeBagUi extends UIComponent {

    @property(cc.Prefab)
    prefab_buff_item:cc.Prefab=null;

    start(){
        this.initUi();
    }

    initUi(){
        //buff列表
        let buffList=MazeManager.getInstance().getBuffList();
        //buffList=RogueBuffManager.getInstance().getBuffIdList()
        //标题
        let hint=this.node.getChildByName('hint');         
        let label=hint.getChildByName('label');
        label.getComponent(cc.Label).string=LanguageManager.getInstance().getStrByTextId(830021);
        let detailLabel=this.node.getChildByName('detailLabel');
        detailLabel.getComponent(cc.Label).string=LanguageManager.getInstance().getStrByTextId(830022);
        let content=this.node.getChildByName('scrollView').getComponent(cc.ScrollView).content;
        let len=buffList.length;
        hint.active=len==0;
        for(let i=0; i<len; i++){
            let buffId=buffList[i];
            let buffItem=cc.instantiate(this.prefab_buff_item);
            buffItem.getComponent(MazeBuffItem).init(buffId);
            content.addChild(buffItem);
        }
    }

    clickBtnYes(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        //城墙满血
        
        super.onClose();
    }

    clickBtnNo(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        super.onClose();
    }
}
