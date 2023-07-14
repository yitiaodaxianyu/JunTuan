import { JsonThreadTaskInformation } from "./Data/ThreadTaskInformation";
import TextLanguage from "../multiLanguage/TextLanguage";
import { PropManager } from "../Prop/PropManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TaskMainItemUi extends cc.Component {

    call_back:Function = null;
    message:JsonThreadTaskInformation = null;

    initGoingItem(data:JsonThreadTaskInformation,now:number,func:Function){
        
    }

    initFinishItem(data:JsonThreadTaskInformation,now:number,func:Function){
        
    }

    onClickBtn(){
        
    }

}
