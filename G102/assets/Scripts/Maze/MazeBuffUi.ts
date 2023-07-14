import GameManager from "../GameManager";
import { MonsterIconManager } from "../Monster/MonsterIconManager";
import { Follow_Type } from "../multiLanguage/FollowConstants";
import FollowManager from "../multiLanguage/FollowManager";
import LanguageManager from "../multiLanguage/LanguageManager";
import { SoundIndex } from "../Sound/AudioConstants";
import MyTool from "../Tools/MyTool";
import UIComponent from "../UI/UIComponent";
import { RogueBuffManager } from "./Data/RogueBuff";
import { RogueHexagonTypesManager } from "../copy/voidcrack/RogueHexagonTypes";
import { MazeManager } from "./MazeManager";
import MazeUi from "./MazeUi";


const {ccclass, property} = cc._decorator;

@ccclass
export default class MazeBuffUi extends UIComponent {
    /**格子id */
    box_id:number=10032;
    @property(cc.Prefab)
    prefab_buff_item:cc.Prefab=null;

    cur_select_buff:number=0;    
    is_can_go:boolean=false;    

    initData(id:number,isCanGo:boolean){
        this.box_id=id;
        this.is_can_go=isCanGo;    
        this.initUi();
    }
    
    initUi(){
        let buffs=MazeManager.getInstance().getUnSelectSpoils();
        if(buffs.length==0){
            this.initBuffCards();            
        }
        this.createBuffCards();       
        this.refreshSelect();
        FollowManager.getInstance().followEvent(Follow_Type.rogue玩法查看战利品);
    }

    createBuffCards(){
        let RBM=RogueBuffManager.getInstance()
        let LM=LanguageManager.getInstance();
        let buffs=MazeManager.getInstance().getUnSelectSpoils();
        for(let i=1; i<=3; i++){            
            let buffId=buffs[i-1];            
            let buffNode=this.node.getChildByName('buff'+i);
            //buff的数据
            let jsonData=RBM.getJsonRogueBuff(buffId);
            let quality=jsonData.RogueBuff_Quality;
            //名称
            let titleLabel=buffNode.getChildByName('titleLabel').getComponent(cc.Label);
            titleLabel.string=LM.getStrByTextId(jsonData.RogueBuff_Name);
            titleLabel.node.color=this.getFontColorByQuality(quality);
            //内容
            let detailLabel=buffNode.getChildByName('detailLabel').getComponent(cc.Label);
            detailLabel.string=this.getValueStringByString(LM.getStrByTextId(jsonData.RogueBuffText_ID),jsonData.RogueBuff1_Value,jsonData.RogueBuff2_Value,jsonData.RogueBuff3_Value);
            //品质图标
            let qualityIcon=buffNode.getChildByName('quality').getComponent(cc.Sprite);
            qualityIcon.spriteFrame=MazeUi.getInstance().getSpByName('Maze_Quality_'+(quality-1))
            //品质文字
            let qualityLabel=buffNode.getChildByName('qualityLabel').getComponent(cc.Label);
            qualityLabel.string=this.getStringByQuality(quality);
            qualityLabel.node.color=this.getFontColorByQuality(quality);
            //类型图标
            let iconSp=buffNode.getChildByName('icon').getComponent(cc.Sprite);
            iconSp.spriteFrame=MazeUi.getInstance().getSpByName('Maze_Buff_Icon_'+jsonData.RogueBuff_Type);
        }
    }    

    initBuffCards(){        
        let type=RogueHexagonTypesManager.getInstance().getHexagonType(this.box_id);
        //品质概率：精英，史诗，传说
        let rate=[70,20,10];
        switch(type){
            case 1:{
                //普通怪的概率
                rate=[70,20,10];
            }break;
            case 2:{
                //精英
                rate=[40,40,20];
            }break;
            case 6:{
                //boss
                rate=[0,30,70];
            }break;
        }
        //test
        //rate=[5,5,90];
        let RBM=RogueBuffManager.getInstance()
        let buffArr=RBM.getBuffArr(MazeManager.getInstance().getBuffList());
        //处理数组，看看是否有品质都随机完了的情况
        for(let i=buffArr.length-1; i>=0; i--){
            if(buffArr[i].length==0){
                let giveIndex=i>0?(i-1):(i+1);
                rate[giveIndex]+=rate[i];
                rate[i]=0;
            }
        }
        let idsList=new Array();
        for(let n=1; n<=3; n++){
            //随机
            let cardQualityIndex=MyTool.getWeightIndexs(rate,1)[0];
            let cardArr=buffArr[cardQualityIndex];
            let cardIndex=Math.floor(Math.random()*cardArr.length);
            let buffId=cardArr[cardIndex];
            cardArr.splice(cardIndex,1);
            idsList.push(buffId);
            for(let i=buffArr.length-1; i>=0; i--){
                if(buffArr[i].length==0){
                    let giveIndex=i>0?(i-1):(i+1);
                    rate[giveIndex]+=rate[i];
                    rate[i]=0;
                }
            }
        }
        MazeManager.getInstance().setUnSelectSpoils(idsList);
    }

    refreshSelect(){
        for(let i=1; i<=3; i++){
            let buffNode=this.node.getChildByName('buff'+i);            
            let mb=buffNode.getChildByName('mb');
            let isSelected=this.cur_select_buff==i;
            mb.active=!isSelected;
            buffNode.scale=isSelected?1:0.8;
            buffNode.getComponent(cc.Button).interactable=!isSelected;
            //buffNode.stopAllActions();
        }
        //光
        //let light=this.node.getChildByName('light');
        let btnSelect=this.node.getChildByName('btnSelect');
        let selectBg=this.node.getChildByName('selectBg');
        let isShow=this.cur_select_buff>0;
        //light.active=isShow;
        btnSelect.active=isShow;
        selectBg.active=isShow;

        let xx=this.cur_select_buff*206-206*2-7;
        //light.x=xx;
        btnSelect.x=xx;
        selectBg.x=xx;
        if(isShow){            
            let spine=selectBg.getComponent(sp.Skeleton);
            spine.setAnimation(0,'Rouge_Card',false);
        }
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

    initMonsterList(){
        let content=this.node.getChildByName('monsterScrollView').getComponent(cc.ScrollView).content;
        //获得关卡信息,怪物种类
        let monsterInfoList=MazeManager.getInstance().getFightingInfo().getOnlyMonsterDataList();
        monsterInfoList.forEach((data,key)=>{
            let icon=MonsterIconManager.getInstance().createMonsterIcon(data.id,data.level);
            content.addChild(icon);
        })
    }

    clickBtnBuff(btn,strIndex:string){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        let index=parseInt(strIndex);
        if(this.cur_select_buff!=index){
            this.cur_select_buff=index;
            this.refreshSelect();
        }
    }

    clickBtnYes(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);        
        //保存buff
        let buffId=MazeManager.getInstance().getUnSelectSpoils()[this.cur_select_buff-1];
        if(buffId){
            //当作胜利处理
            MazeManager.getInstance().checkBuffStage([2001,2002,2003,6001,6002,6003])       
            MazeManager.getInstance().addBuff(buffId);
            MazeManager.getInstance().setUnSelectSpoils(new Array());
            MazeManager.getInstance().addMazePassedId(this.box_id);
            MazeUi.getInstance().refreshFloor();
            super.onClose();
        }        
    }

    clickBtnNo(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        super.onClose();
    }
    
}
