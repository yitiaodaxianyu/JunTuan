import GameManager from "../GameManager";
import { SoundIndex } from "../Sound/AudioConstants";
import { UIManager } from "../UI/UIManager";
// import { RogueHexagonTypesManager } from "./Data/RogueHexagonTypes";
import { RogueHexagonTypesManager } from "../copy/voidcrack/RogueHexagonTypes";
import { MazeManager } from "./MazeManager";
import MazeUi from "./MazeUi";

enum FloatDir{
    Up=1,
    Down=2,
}

const {ccclass, property} = cc._decorator;

@ccclass
export default class MazeBox extends cc.Component {

    @property([cc.SpriteFrame])
    icon_event_type:cc.SpriteFrame[]=[];
    /**格子id */
    box_id:number=10011;
    //列
    row:number=0;
    //行，层数
    column:number=0;
    /**浮动速度 */
    float_speed:number=10;
    center_pos_y:number=0;
    cur_float_dir:FloatDir=FloatDir.Up;
    top_yy:number=0;
    bottom_yy:number=0;

    init (row:number,column:number,id:number) {
        this.row=row;
        this.column=column;
        let offsetY=6;
        this.float_speed=Math.random()*offsetY/4+offsetY/4;
        this.center_pos_y=this.node.y;
        this.node.y=this.center_pos_y+Math.random()*offsetY-offsetY/2;
        this.top_yy=this.center_pos_y+offsetY/2;
        this.bottom_yy=this.center_pos_y-offsetY/2;
        this.cur_float_dir=Math.random()>0.5?FloatDir.Up:FloatDir.Down;
        this.box_id=id;        
    }

    refreshBox(){
        //按钮
        let btn=this.node.getComponent(cc.Button);
        let shadow=this.node.getChildByName('shadow');
        let curJsonData=RogueHexagonTypesManager.getInstance().getJsonRogueHexagonTypes(this.box_id);
        let passedIds=MazeManager.getInstance().getMazePassedIds();
        let lastPassedId=passedIds[passedIds.length-1];
        let passedJsonData=RogueHexagonTypesManager.getInstance().getJsonRogueHexagonTypes(lastPassedId);
        let passedTS=this.node.parent.getChildByName(''+lastPassedId).getComponent(MazeBox);
        let fightingJsonData=RogueHexagonTypesManager.getInstance().getJsonRogueHexagonTypes(MazeManager.getInstance().getFightingId());
        let fightingTS=this.node.parent.getChildByName(''+fightingJsonData.Hexagon_ID).getComponent(MazeBox);
        //切换图标
        let icon=this.node.getChildByName('icon');
        icon.getComponent(cc.Sprite).spriteFrame=this.icon_event_type[curJsonData.HexagonType];
        if(this.row<=passedTS.row){
            //已经通过的
            btn.interactable=false;
            icon.active=false;
            if(!passedIds.includes(curJsonData.Hexagon_ID)){
                this.node.active=false;
            }
        }else if(this.row>passedTS.row){
            //未通过的
            if(this.row-passedTS.row<=2){
                if(this.row-passedTS.row<=1){
                    //判断是否相邻
                    if(MazeManager.getInstance().checkAdjacent(passedTS.row,passedTS.column,this.row,this.column,passedTS.row%2==0)){
                        btn.interactable=true;
                        icon.active=true;
                    }else{
                        btn.interactable=false;
                        icon.active=false;
                        this.node.active=false;
                    }
                }else{
                    btn.interactable=true;
                    icon.active=true;
                }    
            }else{
                if(curJsonData.HexagonType==1||curJsonData.HexagonType==2||curJsonData.HexagonType==6){
                    btn.interactable=false;
                    icon.active=false;
                }else{                    
                    btn.interactable=true;
                    icon.active=true;
                }                
            }            
        }
        //和正在战斗同一行
        if(this.row==fightingTS.row){            
            if(curJsonData.Hexagon_ID==fightingJsonData.Hexagon_ID){
                //相同
                btn.interactable=true;
                icon.active=true;
                //箭头
                if(curJsonData.Hexagon_ID!=passedJsonData.Hexagon_ID){
                    MazeUi.getInstance().showArrow(this.node);
                }                
            }else{
                //不同
                btn.interactable=false;
                icon.active=false;
                this.node.active=false;
            }
        }        
        if(curJsonData.Hexagon_ID==passedJsonData.Hexagon_ID){
            btn.interactable=false;
            icon.active=true;
            icon.getComponent(cc.Sprite).spriteFrame=this.icon_event_type[0];
        }
        shadow.active=icon.active;
    }

    onClick(btn:cc.Event.EventTouch){
        cc.log(this.box_id);
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        let passedIds=MazeManager.getInstance().getMazePassedIds();
        let lastPassedId=passedIds[passedIds.length-1];
        let curJsonData=RogueHexagonTypesManager.getInstance().getJsonRogueHexagonTypes(this.box_id);
        let passedTS=this.node.parent.getChildByName(''+lastPassedId).getComponent(MazeBox);
        let isCanGo=MazeManager.getInstance().checkAdjacent(passedTS.row,passedTS.column,this.row,this.column,passedTS.row%2==0);
        switch(curJsonData.HexagonType){
            case 1:
            case 2:
            case 6:{
                if(MazeManager.getInstance().getPassingId()==this.box_id){
                    UIManager.getInstance().showMazeBuffUi(null,this.box_id,isCanGo);
                }else{
                    UIManager.getInstance().showMazeFightingUi(null,this.box_id,isCanGo);
                }
                
            }break;
            case 3:{
                UIManager.getInstance().showMazeLeaseUi({onRefresh:()=>{
                    MazeManager.getInstance().addMazePassedId(this.box_id);
                    MazeManager.getInstance().setFightingId(this.box_id);
                    MazeUi.getInstance().refreshFloor();
                }},this.box_id,isCanGo);
            }break;
            case 4:{
                UIManager.getInstance().showMazeShopUi(null,this.box_id,isCanGo);
            }break;
            case 5:{
                UIManager.getInstance().showMazeHealingPotionUi(null,this.box_id,isCanGo);
            }break;
            
        }
        
    }

    update (dt:number) {

        switch(this.cur_float_dir){
            case FloatDir.Up:{
                this.node.y+=dt*this.float_speed;
                if(this.node.y>this.top_yy){
                    this.cur_float_dir=FloatDir.Down;
                }
            }break;
            case FloatDir.Down:{
                this.node.y-=dt*this.float_speed;
                if(this.node.y<this.bottom_yy){
                    this.cur_float_dir=FloatDir.Up;
                }
            }
        }
        
        
    }
}

