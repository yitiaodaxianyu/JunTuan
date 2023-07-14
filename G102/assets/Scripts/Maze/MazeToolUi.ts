import GameManager from "../GameManager";
import { Follow_Type } from "../multiLanguage/FollowConstants";
import FollowManager from "../multiLanguage/FollowManager";
import LanguageManager from "../multiLanguage/LanguageManager";
import { PropId } from "../Prop/PropConfig";
import { PropManager } from "../Prop/PropManager";
import { SoundIndex } from "../Sound/AudioConstants";
import UIComponent from "../UI/UIComponent";
import WallManager from "../Wall/WallManager";
import { RogueHexagonTypesManager } from "./Data/RogueHexagonTypes";
import { RogueTextManager } from "./Data/RogueText";
import { MazeManager } from "./MazeManager";
import MazeUi from "./MazeUi";


const {ccclass, property} = cc._decorator;

@ccclass
export default class MazeToolUi extends UIComponent {

    box_id:number=5;
    is_can_go:boolean=true;    

    start(){
        this.initUi();
    }

    initUi(){
        //标题
        let titleLabel=this.node.getChildByName('titleLabel');
        titleLabel.getComponent(cc.Label).string=LanguageManager.getInstance().getStrByTextId(830009);
        let contentLabel=this.node.getChildByName('contentLabel');
        contentLabel.getComponent(cc.Label).string=LanguageManager.getInstance().getStrByTextId(830015);
        //this.node.getChildByName('btnNo').active=this.is_can_go;
        let num=PropManager.getInstance().getPropNum(PropId.MazeToolkit)
        this.node.getChildByName('btnYes').getComponent(cc.Button).interactable=num>0&&WallManager.getInstance().getMainWall().getCurHp()<=0;
        this.node.getChildByName('num').getComponent(cc.Label).string=num+'';
        FollowManager.getInstance().followEvent(Follow_Type.rouge玩法查看工具包);
    }

    clickBtnYes(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        //城墙满血
        MazeManager.getInstance().setMazeSubHp(0);
        MazeUi.getInstance().showWallInfo();
        super.onClose();
        FollowManager.getInstance().followEvent(Follow_Type.rogue玩法使用工具包);
    }

    clickBtnNo(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        super.onClose();
    }
}
