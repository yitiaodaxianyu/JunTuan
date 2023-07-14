import { JianTou_Type } from "../../Constants";
import GameManager from "../../GameManager";
import { SoundIndex } from "../../Sound/AudioConstants";
import MainUi from "./MainUi";

const {ccclass, property} = cc._decorator;

enum JianTou_Dir{
    UP = 0,
    DOWN = 1,
}
@ccclass
export default class JianTou extends cc.Component {

    @property({type:cc.Enum(JianTou_Type)})
    cur_jiantou_type:JianTou_Type=JianTou_Type.LEFT;

    cur_jiantou_dir:JianTou_Dir=JianTou_Dir.DOWN;
    follow_target:cc.Node=null;
    //遮罩
    mask_btns:cc.Node=null;

    onLoad () {
        this.follow_target=this.node.parent;
        this.mask_btns=this.follow_target.getChildByName('btns');
        // this.clickBtnJiantou();
    }

    onEnable()
    {
        //this.setDir(JianTou_Dir.DOWN);
    }

    setDir(dir:JianTou_Dir)
    {
        switch(dir)
        {
            case JianTou_Dir.UP:{
                this.node.angle=0;
                this.cur_jiantou_dir=JianTou_Dir.UP;
            }break;
            case JianTou_Dir.DOWN:{
                this.node.angle=180;
                this.cur_jiantou_dir=JianTou_Dir.DOWN;
            }break;
        }
    }

    clickBtnJiantou()
    {
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        let mainUi=cc.find('Canvas/main_ui').getComponent(MainUi);
        switch(this.cur_jiantou_type)
        {
            case JianTou_Type.LEFT:{
                switch(this.cur_jiantou_dir)
                {
                    case JianTou_Dir.UP:{
                        this.setDir(JianTou_Dir.DOWN);
                        mainUi.doFolded(this.cur_jiantou_type);
                    }break;
                    case JianTou_Dir.DOWN:{
                        this.setDir(JianTou_Dir.UP);
                        mainUi.doUnfold(this.cur_jiantou_type);
                    }break;
                }
            }break;
            case JianTou_Type.RIGHT:{
                switch(this.cur_jiantou_dir)
                {
                    case JianTou_Dir.UP:{
                        this.setDir(JianTou_Dir.DOWN);
                        mainUi.doFolded(this.cur_jiantou_type);
                    }break;
                    case JianTou_Dir.DOWN:{
                        this.setDir(JianTou_Dir.UP);
                        mainUi.doUnfold(this.cur_jiantou_type);
                    }break;
                }
            }break;
        }
    }

    update () {
        if(this.follow_target)
        {
            this.node.y=-this.follow_target.height+48;
            if(this.mask_btns)
            {
                this.mask_btns.height=this.follow_target.height;//有箭头需要减去箭头的高度
            }
        }
    }    
}
