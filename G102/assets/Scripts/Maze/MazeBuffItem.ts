import GameManager from "../GameManager";
import LanguageManager from "../multiLanguage/LanguageManager";
import { SoundIndex } from "../Sound/AudioConstants";
import { UIManager } from "../UI/UIManager";
import { RogueBuffManager } from "./Data/RogueBuff";
import MazeUi from "./MazeUi";


const {ccclass, property} = cc._decorator;

@ccclass
export default class MazeBuffItem extends cc.Component {

    /**buff id */
    buff_id:number=1001;

    init(id:number){
        this.buff_id=id;
        this.refreshBuff();
    }

    refreshBuff(){
        let RBM=RogueBuffManager.getInstance()
        let LM=LanguageManager.getInstance();
        let quality=RBM.getRogueBuff_Quality(this.buff_id);
        //buff的数据
        let jsonData=RBM.getJsonRogueBuff(this.buff_id);
        //名称
        let titleLabel=this.node.getChildByName('titleLabel').getComponent(cc.Label);
        titleLabel.string=LM.getStrByTextId(jsonData.RogueBuff_Name);
        titleLabel.node.color=this.getFontColorByQuality(quality);
        //内容
        let detailLabel=this.node.getChildByName('detailLabel').getComponent(cc.Label);
        detailLabel.string=this.getValueStringByString(LM.getStrByTextId(jsonData.RogueBuffText_ID),jsonData.RogueBuff1_Value,jsonData.RogueBuff2_Value,jsonData.RogueBuff3_Value);
        //品质图标
        let qualityIcon=this.node.getChildByName('quality').getComponent(cc.Sprite);
        qualityIcon.spriteFrame=MazeUi.getInstance().getSpByName('Maze_Quality_'+(quality-1))
        //品质文字
        let qualityLabel=this.node.getChildByName('qualityLabel').getComponent(cc.Label);
        qualityLabel.string=this.getStringByQuality(quality);
        qualityLabel.node.color=this.getFontColorByQuality(quality);
        //内容详情
        let detailLabel2=this.node.getChildByName('detailLabel').getComponent(cc.Label);
        detailLabel2.string=this.getValueStringByString(LM.getStrByTextId(jsonData.RogueBuffText_ID),jsonData.RogueBuff1_Value,jsonData.RogueBuff2_Value,jsonData.RogueBuff3_Value);
        //类型图标
        let iconSp=this.node.getChildByName('icon').getComponent(cc.Sprite);
        iconSp.spriteFrame=MazeUi.getInstance().getSpByName('Maze_Buff_Icon_'+jsonData.RogueBuff_Type);
    }

    getValueStringByString(str:string,value1:number,value2:number,value3:number):string{
        if(str.includes("~x%")){
            value1*=100;            
        }
        if(str.includes("~y%")){
            value2*=100;
        }
        if(str.includes("~z%")){
            value3*=100;
        }
        let newStr=str.replace("~x",value1.toFixed(0));        
        newStr=newStr.replace("~y",value2.toFixed(0));
        newStr=newStr.replace("~z",value2.toFixed(0));
        return newStr;
    }

    getFontColorByQuality(quality:number):cc.Color{
        let color=cc.Color.BLUE;
        switch(quality){
            case 1:{
                color=cc.color(105,183,255);
            }break;
            case 2:{
                color=cc.color(226,126,255);
            }break;
            case 3:{
                color=cc.color(255,193,74);
            }break;
        }
        return color;
    }

    getOutLineColorByQuality(quality:number):cc.Color{
        let color=cc.Color.BLUE;
        switch(quality){
            case 1:{
                color=cc.color(37,49,71);
            }break;
            case 2:{
                color=cc.color(37,49,71);
            }break;
            case 3:{
                color=cc.color(105,183,255);
            }break;
        }
        return color;
    }

    getStringByQuality(quality:number):string{
        return LanguageManager.getInstance().getStrByTextId(110005+quality*2);
    }

    onClick(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_ChoseBuff);
        
        UIManager.getInstance().showMazeBuffInfo(this.buff_id);
    }
}
