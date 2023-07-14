
import { Follow_Type } from "../multiLanguage/FollowConstants";
import FollowManager from "../multiLanguage/FollowManager";
import UIComponent from "../UI/UIComponent";
import { MazeManager } from "./MazeManager";


const {ccclass, property} = cc._decorator;

@ccclass
export default class MazeWallInfoUi extends UIComponent {

    

    start(){
        this.initUi();
    }

    initUi(){
        let numLabel=this.node.getChildByName('numLabel');
        let curHp=MazeManager.getInstance().getMazeHp();
        let maxHp=MazeManager.getInstance().getMazeMaxHp();
        numLabel.getComponent(cc.Label).string=curHp+'/'+maxHp+"("+(curHp/maxHp*100).toFixed(1)+"%)";
        FollowManager.getInstance().followEvent(Follow_Type.rogue玩法查看当前生命值);
    }


}
