// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { GameState } from "../../Constants";
import GameManager from "../../GameManager";
import { HeroManager } from "../../Hero/Data/HeroManager";
import { Hero_Type } from "../../Hero/Game/HeroConfig";
import HeroItem from "../../Hero/Ui/HeroItem";
import UIComponent from "../../UI/UIComponent";
import { UiAction } from "../../UI/UiInterface";
import LanguageManager from "../../multiLanguage/LanguageManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RoguelikeTip extends UIComponent {





    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    tag:number=0;//选择toggle的选择数
    @property(cc.Node)
    ToggleContainer:cc.Node=null

    @property(cc.Node)
    tipLabel:cc.Node=null

    @property(cc.Node)
    content:cc.Node = null;//英雄选择父节点

    @property(cc.Prefab)
    hero_item:cc.Prefab = null;//英雄头像的预制体

    greybuttonjudgment: number=0;
    onLoad () {
        super.onLoad();
        this.tag=0
        this.ToggleContainer.children[0].getComponent(cc.Toggle).isChecked=true;
        this.onToggleChange();
        console.log("进入RogueLike");
        this.Refreshheroitmestatus();
    }
    onEnable(){
     
    }
    clickBtnToggle(even,i){//单选按钮的选择
        // console.log("+++++++",even,i)
        this.tag=i;
        this.onToggleChange();
      
    }
    
    private Refreshheroitmestatus():void{
        //已解锁的英雄
        let HeroList=HeroManager.getInstance().getHeroList()//数量   英雄id类型 英雄等级 英雄品质  英雄星星阶段
      
        let heroBasicdataarr=[]//最高战力数组
        let HeroListarr=HeroList//已解锁的英雄
        for (let heroindex = 0; heroindex < HeroList.length; heroindex++) {
            let hero = cc.instantiate(this.hero_item);
            hero.name=""+heroindex
            hero.setScale(0.75,0.75)
            this.content.addChild(hero);
          
            
            hero.on(cc.Node.EventType.TOUCH_END, this.onHeroItemTouchEnd, this);
            // hero.on(cc.Node.EventType.TOUCH_CANCEL, this.onHeroItemTouchCancel, this);
        }
        this.content.getComponent(cc.Layout).updateLayout();
         //刷新英雄itme
        for (let heroBasicdataindex = 0; heroBasicdataindex < HeroList.length; heroBasicdataindex++) {
            let heroBasicdata=HeroManager.getInstance().getHeroData(HeroList[heroBasicdataindex].hero_type)//英雄的基础数据   传入英雄id类型  防御力  生命值  命中值 
            heroBasicdataarr.push(heroBasicdata.total_attack)
        }

         //排列英雄战力
         let cun
         let herocun
         for (let index = 0; index < heroBasicdataarr.length; index++) {
             for (let paixvindex = 0; paixvindex < heroBasicdataarr.length-1; paixvindex++) {
                 if(heroBasicdataarr[paixvindex+1]>heroBasicdataarr[paixvindex]){
                     cun=heroBasicdataarr[paixvindex]
                     heroBasicdataarr[paixvindex]=heroBasicdataarr[paixvindex+1]
                     heroBasicdataarr[paixvindex+1]=cun
 
                     herocun=HeroListarr[paixvindex]
                     HeroListarr[paixvindex]=HeroListarr[paixvindex+1]
                     HeroListarr[paixvindex+1]=herocun
                 }
             }
         }
         let teamList=GameManager.getInstance().cur_team_list;

               //刷新英雄itme状态
        //血量
        let jdtnumber=0
        for (let shuaxingindex = 0; shuaxingindex < HeroListarr.length; shuaxingindex++) {
            this.content.children[shuaxingindex].getComponent(HeroItem).RefreshHeroesItem(HeroListarr[shuaxingindex].hero_type)
            for (let teamListindex = 0; teamListindex < teamList.length; teamListindex++) {
                if(teamList[teamListindex]==HeroListarr[shuaxingindex].hero_type){
                    this.content.children[shuaxingindex].getChildByName("shangzheng").active=true
                }
            }
        }

      
    }
    onHeroItemTouchEnd(e:cc.Event.EventTouch) {
        let touchTeam=e.getCurrentTarget();

       
        if(touchTeam.getChildByName("shangzheng").active==false){
            //上阵该英雄
            let teamList=GameManager.getInstance().cur_team_list;
            if(teamList[1]==-1||teamList[1]==Hero_Type.NULL){
                teamList[1]=touchTeam.getComponent(HeroItem).hero_type
                GameManager.getInstance().addHero(touchTeam.getComponent(HeroItem).hero_type,1);
                this.clickBtnClose();
                return;
            }

            if(teamList[3]==-1||teamList[3]==Hero_Type.NULL){
                teamList[3]=touchTeam.getComponent(HeroItem).hero_type
                GameManager.getInstance().addHero(touchTeam.getComponent(HeroItem).hero_type,3);
                this.clickBtnClose();
                return;
            }

            if(teamList[0]==-1||teamList[0]==Hero_Type.NULL){
                teamList[0]=touchTeam.getComponent(HeroItem).hero_type
                GameManager.getInstance().addHero(touchTeam.getComponent(HeroItem).hero_type,0);
                this.clickBtnClose();
                return;
            }

            if(teamList[4]==-1||teamList[4]==Hero_Type.NULL){
                teamList[4]=touchTeam.getComponent(HeroItem).hero_type
                GameManager.getInstance().addHero(touchTeam.getComponent(HeroItem).hero_type,4);
                this.clickBtnClose();
                return;
            }
            
            
            
        }else{
            GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(100091))
        }
    }
    private onToggleChange():void{
        if(this.tag==0){
            this.tipLabel.getComponent(cc.Label).string="选择一个英雄加入你的队伍。";
        }else if(this.tag==1){
            this.tipLabel.getComponent(cc.Label).string="选择一个技能加强你的英雄。";
        }else if(this.tag==2){
            this.tipLabel.getComponent(cc.Label).string="选择一个技能用于加强你的战车。";
        }
    }
    clickBtnClose(){
        console.log("离开roguelike");
        
        cc.director.resume();
        GameManager.getInstance().cur_game_state=GameState.Game_Playing;
        GameManager.getInstance().loadLevel(); 
        super.onClose();
    }
    // update (dt) {}
}
