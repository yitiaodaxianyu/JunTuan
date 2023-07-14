import { GameMode, GameScene } from "../Constants";
import GameManager from "../GameManager";
import { HeroManager } from "../Hero/Data/HeroManager";
import { Hero_Type } from "../Hero/Game/HeroConfig";
import { MissionLevelManager } from "../Level/MissionLevel";
import { Follow_Type } from "../multiLanguage/FollowConstants";
import FollowManager from "../multiLanguage/FollowManager";
import TextLanguage from "../multiLanguage/TextLanguage";
import ImagerLanguage from "../Multilingual/ImagerLanguage";
import { PropManager } from "../Prop/PropManager";
import { SoundIndex } from "../Sound/AudioConstants";
import StoreHeroShowUi from "../Store/StoreHeroShowUi";
import UIComponent from "../UI/UIComponent";
import { UIPath, UILayerLevel } from "../UI/UIConfig";
import { UIManager } from "../UI/UIManager";
import TutorailsManager from "./TutorailsManager";


const {ccclass, property} = cc._decorator;

@ccclass
export default class RewardSSUi extends UIComponent {

    /**0:解锁展示，只能查看   1：挑战成功，可以选择 */
    cur_mode:number=0;

    select_node:cc.Node=null;
    cur_select_index:number=-1;
    ss_id:number[]=[Hero_Type.LeiShen,Hero_Type.ANuBiSi,Hero_Type.MeiMo];

    initData(mode:number){
        this.cur_mode=mode;
        let textLanguage=this.node.getChildByName("btnOk").getChildByName('TextLanguage').getComponent(TextLanguage);
        let titleImg=this.node.getChildByName('titleImg').getComponent(ImagerLanguage);
        let tipText=this.node.getChildByName('tipText').getComponent(TextLanguage);
        switch(this.cur_mode){
            case 0:{
                textLanguage.setTextId(310004);
                titleImg.setTextId(15);
                tipText.setTextId(310005);
            }break;
            case 1:{
                textLanguage.setTextId(100001);
                titleImg.setTextId(16);
                tipText.setTextId(310003);
            }break;
        }
    }

    start () {
        this.select_node=this.node.getChildByName("select");
        this.select_node.active=false;
        this.refreshUi();
    }

    refreshUi(){
        switch(this.cur_mode){
            case 0:{
                this.select_node.active=false;
                for(let i=0; i<3; i++){
                    let card=this.node.getChildByName("card"+(i+1));
                    card.scale=0.84;
                }                
            }break;
            case 1:{
                this.node.getChildByName("btnOk").active=this.cur_select_index>=0;
                for(let i=0; i<3; i++){
                    let card=this.node.getChildByName("card"+(i+1));
                    if(this.cur_select_index==i){
                        card.scale=1;
                        this.select_node.active=true;
                        this.select_node.setPosition(card.getPosition());
                    }else{
                        card.scale=0.84;
                    }
                }
            }break;
        }        
    }

    onBtnCardClick(btn:cc.Event.EventTouch,indexStr:string){
        let index=parseInt(indexStr);
        switch(this.cur_mode){
            case 0:{
                //弹出详情
                this.showHero(this.ss_id[index]);
            }break;
            case 1:{
                if(this.cur_select_index!=index){
                    this.cur_select_index=index;
                    this.refreshUi();
                }                
            }break;
        }
    }

    onBtnOkClick(){
        switch(this.cur_mode){
            case 0:{
                //开始关卡
                TutorailsManager.getInstance().saveTutorials(204);
                FollowManager.getInstance().followEvent(Follow_Type.新手引导+204);
                GameManager.getInstance().fighting_info=MissionLevelManager.getInstance().getFightingInfo(1);
                GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
                cc.director.loadScene(GameScene.game);
            }break;
            case 1:{                
                //获得英雄
                if(this.cur_select_index>=0){
                    let id=this.ss_id[this.cur_select_index];
                    PropManager.getInstance().changePropNum(id+110000,1);
                    if(GameManager.getInstance().cur_game_scene==GameScene.game){
                        //看看有没有空位插进去.
                        let teamList=HeroManager.getInstance().getTeamList(GameMode.Main);
                        for(let i=0; i<teamList.length; i++){
                            let heroId=teamList[i];
                            if(heroId<Hero_Type.NULL){
                                if(teamList.indexOf(id)==-1){
                                    teamList[i]=id;
                                    HeroManager.getInstance().saveTeamList(GameMode.Main,teamList);
                                    HeroManager.getInstance().loadHeroData(id);
                                    GameManager.getInstance().loadGameHeroData();
                                    GameManager.getInstance().game.loadHero(id,i);
                                    break;
                                }                                
                            }
                        }
                    }
                    HeroManager.getInstance().reportHeroList();
                    TutorailsManager.getInstance().saveTutorials(205);
                    FollowManager.getInstance().followEvent(Follow_Type.新手引导+205);
                    this.onClose();
                }                                
            }break;
        }
    }

    showHero(heroId:Hero_Type){
        UIManager.getInstance().showUiDialog(UIPath.StoreHeroShowUi,UILayerLevel.Three,{onCompleted:(uiNode)=>{
            uiNode.getComponent(StoreHeroShowUi).init({
                onClose:()=>{
                    
                }
            });
            uiNode.getComponent(StoreHeroShowUi).initData(heroId,false);
        }}); 
    }
    // update (dt) {}
}
