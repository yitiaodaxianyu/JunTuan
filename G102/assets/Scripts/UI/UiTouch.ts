import { GameScene, GameState } from "../Constants";
import GameManager from "../GameManager";
import { SoundIndex } from "../Sound/AudioConstants";
import { UIManager } from "./UIManager";


const {ccclass, property} = cc._decorator;

@ccclass
export default class UiTouch extends cc.Component {

    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_START,(e:cc.Event.EventTouch)=>{
            if(GameManager.getInstance().cur_game_state==GameState.Game_Pause){
                return;
            }
            let worldPos=e.getLocation();
            let nodePos=this.node.convertToNodeSpaceAR(worldPos);
            UIManager.getInstance().showTouchEffect(nodePos);
            GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_ButtonClear);
            
        },this);
        //触摸穿透
        if(this.node._touchListener)
        {
            this.node._touchListener.setSwallowTouches(false);
        }
    }
}
