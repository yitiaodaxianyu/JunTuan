import LanguageManager from "../multiLanguage/LanguageManager";
import UIComponent from "../UI/UIComponent";
import { RogueBuffManager } from "./Data/RogueBuff";
import MazeBuffItem from "./MazeBuffItem";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MazeShowBuffUi extends UIComponent {
    /**buff id */
    buff_id:number=1001;
    @property(cc.Prefab)
    prefab_buff_item:cc.Prefab=null;
    
    initData(id:number){
        this.buff_id=id; 
        this.initUi();
    }
    
    initUi(){
        this.createBuffCards();       
    }

    createBuffCards(){
        let RBM=RogueBuffManager.getInstance()
        let LM=LanguageManager.getInstance();
        //buff的数据
        let jsonData=RBM.getJsonRogueBuff(this.buff_id);

        let titleLabel=this.node.getChildByName('titleLabel').getComponent(cc.Label);
        titleLabel.string=LM.getStrByTextId(110023)
        let buffItem=cc.instantiate(this.prefab_buff_item);
        buffItem.scale=1;
        buffItem.getComponent(MazeBuffItem).init(this.buff_id);
        buffItem.getComponent(cc.Button).interactable=false;
        this.node.getChildByName('buffRoot').addChild(buffItem);
        buffItem.y=-243;
        buffItem.x=0;
        
        //内容
        let detailLabel=this.node.getChildByName('detailLabel').getComponent(cc.Label);
        detailLabel.string=this.getValueStringByString(LM.getStrByTextId(jsonData.RogueBuffText_ID),jsonData.RogueBuff1_Value,jsonData.RogueBuff2_Value,jsonData.RogueBuff3_Value);
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
        let newStr=str.replace("~x",value1+'');        
        newStr=newStr.replace("~y",value2+'');
        newStr=newStr.replace("~z",value2+'');
        return newStr;
    }
}
