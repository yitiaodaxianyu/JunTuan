import { FuncType } from "../../Constants";
import GameManager from "../../GameManager";
import { FunctionDefinitionManager } from "../../JsonData/FunctionDefinition";
import { Follow_Type } from "../../multiLanguage/FollowConstants";
import FollowManager from "../../multiLanguage/FollowManager";
import { SoundIndex } from "../../Sound/AudioConstants";
import FuncTypeBtn from "./FuncTypeBtn";

const {ccclass, property} = cc._decorator;

@ccclass
export default class CultivateUi extends cc.Component {

    @property([cc.SpriteFrame])
    sp_btn:cc.SpriteFrame[]=[];
    @property([cc.Node])
    all_ui:cc.Node[]=[]

    cur_selected_index:number=1;
    is_hint_state:boolean=false;

    protected onLoad(): void {
        let bottom=cc.find('Canvas/Top_Ui/down');
        let btnList=this.node.getChildByName('btnList');
        btnList.y=bottom.y+81;
        if(this.is_hint_state==false){
            if(FunctionDefinitionManager.getInstance().getIsUnlock(FuncType.ChengBaoYangCheng)){
                this.cur_selected_index=1;
            }else{
                for(let i=FuncType.ZhuangBeiHeCheng; i<=FuncType.TianFu; i++){
                    if(FunctionDefinitionManager.getInstance().getIsUnlock(i)){
                        this.cur_selected_index=i;
                        break;
                    }
                }
            }
        }
        
    }
    protected onEnable(): void {
        this.setBtnShow()       
        this.is_hint_state=false;    
    } 

    setBtnShow()
    {
        let btnList=this.node.getChildByName('btnList');
        let unlockNum=0;
        let isShow=false;
        for(let i=0; i<3; i++)
        {
            let btn=btnList.children[i];
            let isUnlock=btn.getComponent(FuncTypeBtn).refresh();
            if(this.cur_selected_index==i && isUnlock)
            {                
                this.all_ui[i].active=true;
                btn.getComponent(cc.Button).interactable=false;
                isShow=true;
            }else
            {
                this.all_ui[i].active=false;
            }
            if(isUnlock){
                unlockNum++;
            }
        }
    }

    clickBtnTable(btn,indexStr:string){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        let index=parseInt(indexStr);
        if(index!=this.cur_selected_index){
            this.cur_selected_index=index;
            this.setBtnShow();
        }
    }
}
