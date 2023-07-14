import ApkManager from "../Ads/ApkManager";
import GameManager from "../GameManager";
import TextLanguage from "../multiLanguage/TextLanguage";
import { SoundIndex } from "../Sound/AudioConstants";
import UserData from "../UserData";

const {ccclass, property} = cc._decorator;

@ccclass
export default class VersionTip extends cc.Component {

    private cur_dialog_index:number=0;

    @property([cc.Integer])
    arr_content_text:number[]=[];

    @property([cc.Integer])
    arr_left_text:number[]=[];

    @property([cc.Integer])
    arr_right_text:number[]=[];

    @property(TextLanguage)
    text_content:TextLanguage=null;

    @property(TextLanguage)
    text_left:TextLanguage=null;

    @property(TextLanguage)
    text_right:TextLanguage=null;

    start () {

    }

    refreshUi(){    
        if(this.text_content){
            this.text_content.setTextId(this.arr_content_text[this.cur_dialog_index]);
            this.text_left.setTextId(this.arr_left_text[this.cur_dialog_index]);
            this.text_right.setTextId(this.arr_right_text[this.cur_dialog_index]);
        }else{
            this.text_content=this.node.getChildByName("mytxt").getComponent(TextLanguage);
            this.text_left=this.node.getChildByName("btnad").getChildByName("text").getComponent(TextLanguage);
            this.text_right=this.node.getChildByName("btnGo").getChildByName("text").getComponent(TextLanguage);
            this.text_content.setTextId(this.arr_content_text[this.cur_dialog_index]);
            this.text_left.setTextId(this.arr_left_text[this.cur_dialog_index]);
            this.text_right.setTextId(this.arr_right_text[this.cur_dialog_index]);
        }        
    }
    
    clickBtnLeft(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        switch(this.cur_dialog_index){
            case 0:{
                //取消，跳转下一个页面显示
                this.cur_dialog_index++;
                this.refreshUi();
            }break;
            case 1:{
                //跳转到GP
                this.jumpToGP();
            }break;
        }
    }

    clickBtnRight(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        switch(this.cur_dialog_index){
            case 0:{                
                //跳转到GP
                this.jumpToGP();
            }break;
            case 1:{
                //直接开始游戏
                UserData.getInstance().version_is_ok=true;
                this.node.removeFromParent();
            }break;
        }
    }

    jumpToGP(){
        ApkManager.getInstance().jumpToGP();
    }
}
