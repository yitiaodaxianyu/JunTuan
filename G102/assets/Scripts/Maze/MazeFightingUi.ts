import GameManager from "../GameManager";
import { MonsterConfigureManager } from "../Monster/Data/MonsterConfigure";
import { MonsterIconManager } from "../Monster/MonsterIconManager";
import { Follow_Type } from "../multiLanguage/FollowConstants";
import FollowManager from "../multiLanguage/FollowManager";
import LanguageManager from "../multiLanguage/LanguageManager";
import { PropManager } from "../Prop/PropManager";
import { SoundIndex } from "../Sound/AudioConstants";
import ToPlayMainUi from "../UI/home/ToPlayMainUi";
import UIComponent from "../UI/UIComponent";
import { UIPath, UILayerLevel } from "../UI/UIConfig";
import { UIManager } from "../UI/UIManager";
import { RogueHexagonTypesManager } from "../copy/voidcrack/RogueHexagonTypes";
import { RogueRewardManager } from "./Data/RogueReward";
import { RogueTextManager } from "./Data/RogueText";
import { MazeManager } from "./MazeManager";
import MazeUi from "./MazeUi";


const {ccclass, property} = cc._decorator;

@ccclass
export default class MazeFightingUi extends UIComponent {
    /**格子id */
    box_id:number=10032;
    @property([cc.SpriteFrame])
    sp_icon:cc.SpriteFrame[]=[];
    is_can_go:boolean=false;    

    initData(id:number,isCanGo:boolean){
        this.box_id=id;
        this.is_can_go=isCanGo;  
        this.initUi();
    }
    
    initUi(){
        this.node.getChildByName('btnYes').active=this.is_can_go;
        //标题
        let type=RogueHexagonTypesManager.getInstance().getHexagonType(this.box_id);
        let jsonData=RogueTextManager.getInstance().getJsonRogueText(type);
        let titleLabel=this.node.getChildByName('titleLabel');
        titleLabel.getComponent(cc.Label).string=LanguageManager.getInstance().getStrByTextId(jsonData.Roguetitle_ID);
        let iconIndex=0;
        switch(type){
            case 1:{
                iconIndex=0;
            }break;
            case 2:{
                iconIndex=1;
            }break;
            case 6:{
                iconIndex=2;
            }break;
        }
        let icon=this.node.getChildByName('icon').getComponent(cc.Sprite);
        icon.spriteFrame=this.sp_icon[iconIndex];
        this.initItemList();
        this.initMonsterList();
    }

    initItemList(){        
        let rewadDatas=RogueRewardManager.getInstance().getRewardDatas(this.box_id);
        let content=this.node.getChildByName('rewardsScrollView').getComponent(cc.ScrollView).content;
        for(let i=0; i<rewadDatas.length; i++){
            let rd=rewadDatas[i];
            let item=PropManager.getInstance().createPropItem(rd.reward_id,rd.reward_num);
            content.addChild(item);
        }
    }

    initMonsterList(){
        let content=this.node.getChildByName('monsterScrollView').getComponent(cc.ScrollView).content;
        //获得关卡信息,怪物种类
        let monsterInfoList=MazeManager.getInstance().getFightingInfo(this.box_id).getOnlyMonsterDataList();
        monsterInfoList.sort((a,b)=>{
            let aType=MonsterConfigureManager.getInstance().getStrengthType(a.id);
            let bType=MonsterConfigureManager.getInstance().getStrengthType(b.id);
            return bType-aType
        })
        monsterInfoList.forEach((data,key)=>{
            //cc.log(data.id);
            let icon=MonsterIconManager.getInstance().createMonsterIcon(data.id,data.level);
            icon.anchorY=0;
            content.addChild(icon);
        })
    }

    clickBtnYes(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        if(this.is_can_go){
            if(MazeManager.getInstance().getMazeHp()>0){
                if(MazeManager.getInstance().getFightingId()!=this.box_id){
                    FollowManager.getInstance().followEvent(Follow_Type.rogue玩法战斗事件);
                    MazeManager.getInstance().setFightingId(this.box_id);
                    MazeUi.getInstance().refreshFloor();
                    // UIManager.getInstance().showMapUi({onRefresh:()=>{
                    //     MazeUi.getInstance().node.removeFromParent();
                    // }});
                    UIManager.getInstance().showUiDialog(UIPath.ToPlay,UILayerLevel.One,{onCompleted:(uiNode)=> {
                        uiNode.getComponent(ToPlayMainUi).init({onRefresh:()=>{
                            MazeUi.getInstance().node.removeFromParent();
                        }});
                    },})
                }else{
                    // UIManager.getInstance().showMapUi({onRefresh:()=>{
                    //     MazeUi.getInstance().node.removeFromParent();
                    // }});
                    UIManager.getInstance().showUiDialog(UIPath.ToPlay,UILayerLevel.One,{onCompleted:(uiNode)=> {
                        uiNode.getComponent(ToPlayMainUi).init({onRefresh:()=>{
                            MazeUi.getInstance().node.removeFromParent();
                        }});
                    },})
                    //MazeManager.getInstance().setPassingId(this.box_id);
                }
            }else{
                GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(830024));
            }            
        }
        super.onClose();
    }

    clickBtnNo(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        super.onClose();
    }
    
}
