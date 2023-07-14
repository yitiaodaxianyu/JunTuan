// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameManager from "../GameManager";
import { LevelManager } from "../Level/LevelManager";
import { Follow_Type } from "../multiLanguage/FollowConstants";
import FollowManager from "../multiLanguage/FollowManager";
import LanguageManager from "../multiLanguage/LanguageManager";
import { LeaseType, PetInfo } from "../Pet/PetConfig";
import { PetManager } from "../Pet/PetManager";
import { SoundIndex } from "../Sound/AudioConstants";
import MyTool from "../Tools/MyTool";
import UIComponent from "../UI/UIComponent";
import { RoguePetsLeaseManager } from "./Data/RoguePetsLease";
import { MazeManager } from "./MazeManager";
import MazePetItem from "./MazePetItem";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MazeLeaseUi extends UIComponent {

    @property(cc.Prefab)
    pet_item: cc.Prefab = null;

     /**格子id */
    box_id:number=10011;

    select_index:number=-1;
    is_can_go:boolean=false;
    private pet_list:Array<PetInfo>=[];

    initData (id:number,isCanGo:boolean) {
        this.box_id=id;
        this.is_can_go=isCanGo;
        this.initUi();
    }

    initUi () {
        // let ll=PetManager.getInstance().getDeepPetList();
        let petList=[];
        // ll.forEach((v)=>{
        //     petList.push(cc.instantiate(v));
        // })        
        //重新排列一下，等级排列
        petList.sort((a:PetInfo,b:PetInfo)=>{
            return b.pet_level-a.pet_level;
        });        
        let totalLevel=0;
        let totalNum=0;
        let len=petList.length;
        if(len<=0){
            return;
        }
        for(let i=0; i<len; i++){
            if(i<4){
                totalLevel+=petList[i].pet_level;
                totalNum++;
            }else{
                break;
            }
        }
        let userLevel=Math.round(totalLevel/totalNum);
        let randPetList=MazeManager.getInstance().getRandPetList(this.box_id);
        if(randPetList.length>0){
            this.useOldList(randPetList,userLevel);
        }else{
            this.initPetList(userLevel);
        }
        this.node.getChildByName('btnYes').active=this.is_can_go;
    }

    initPetList(userLevel:number){
        
        let jsonData=RoguePetsLeaseManager.getInstance().getJsonRoguePetsLease(LevelManager.getInstance().getFinishChapter());
        let list=this.node.getChildByName('list');
        let petIndex=MyTool.getWeightIndexs(jsonData.PetsWeight,4);
        for(let i=0; i<4; i++){
            let item=cc.instantiate(this.pet_item);
            list.addChild(item);
            let petInfo=new PetInfo();
            petInfo.pet_level=userLevel;
            petInfo.pet_id=jsonData.PetsLeaseID[petIndex[i]];
            petInfo.pet_quality=jsonData.PetsQuality[petIndex[i]];
            petInfo.sequence_id=new Date().getTime()/1000*10+i;
            petInfo.lease_type=LeaseType.Maze;
            this.pet_list.push(petInfo);
            item.getComponent(MazePetItem).init(petInfo,i,this);
        }
        MazeManager.getInstance().setRandPetList(this.box_id,this.pet_list);
    }

    useOldList(petList:PetInfo[],userLevel:number){
        let list=this.node.getChildByName('list');
        this.pet_list=petList;
        for(let i=0; i<petList.length; i++){
            let item=cc.instantiate(this.pet_item);
            list.addChild(item);   
            let petInfo=petList[i];
            petInfo.pet_level=userLevel;
            item.getComponent(MazePetItem).init(petInfo,i,this);
            
        }
    }

    clickBtnItem(index:number){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        if(this.select_index==index){
            this.select_index=-1;
        }else{
            this.select_index=index;
        }
        this.refreshAllItem();
    }

    refreshAllItem(): void {
        let list=this.node.getChildByName('list');
        for(let i=0; i<list.childrenCount; i++){
            let item=list.children[i];
            item.getComponent(MazePetItem).refresh(this.select_index==i);
        }
    }

    clickBtnOk(){
        if(this.is_can_go){
            if(this.select_index>=0){
                MazeManager.getInstance().addLeasePetList(this.pet_list[this.select_index]);
                super.onRefresh();
                super.onClose();
                FollowManager.getInstance().followEvent(Follow_Type.rogue玩法获得宠物事件);
            }else{
                GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(830023));
            }
        }        
    }

    // update (dt) {}
}
