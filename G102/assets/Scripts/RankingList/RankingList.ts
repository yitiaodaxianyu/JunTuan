// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { AccessName, HttpManager } from ".././NetWork/HttpManager";
import { BossChallengeManager } from "../Activity/BossChallenge";
import { EndlessLevelsManager } from "../Activity/EndlessLevels";
import purchasesnumbe from "../copy/endlesschallenges/purchasesnumbe";
import rankingrewarddisplay from "../copy/endlesschallenges/rankingrewarddisplay";
import rewarddisplay from "../copy/endlesschallenges/rewarddisplay";
import GameManager from "../GameManager";
import { HeroManager } from "../Hero/Data/HeroManager";
import TextLanguage from "../multiLanguage/TextLanguage";
import { PropManager } from "../Prop/PropManager";
import { SoundIndex } from "../Sound/AudioConstants";
import UIComponent from "../UI/UIComponent";
import { UIPath, UILayerLevel } from "../UI/UIConfig";
import { UIManager } from "../UI/UIManager";
import UserData from "../UserData";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RankingList extends UIComponent {
    @property(cc.Node)
    Rankingitme:cc.Node=null//排行节点
    @property(cc.Node)
    RankingSelf:cc.Node=null//玩家自己的排行节点
    
    @property(cc.Node)
    content:cc.Node=null//父节点
    
    @property(cc.Node)
    ScrollView:cc.Node=null//列表
    
    @property(cc.Node)
    ToggleContainer:cc.Node=null//选项    战力      无尽挑战    boss挑战
        
    @property(cc.Node)
    Ranking_Bg_0:cc.Node=null//背景
    

    Ranking:cc.Node[]=[]//排行节点

    max:number=100

    @property(cc.SpriteFrame)
    bgsprite:cc.SpriteFrame[]=[]//前三的背景

    namecolor:cc.Color[]=[new cc.Color(94, 62, 41),new cc.Color(50, 75, 105),new cc.Color(108, 68, 54)]//前三的名字颜色

    tag:number=1//选择显示的排行榜   默认是1   点击之后变

    text:number[]=[100126,100128,100129]//战力:~波数:~伤害:~

    @property(cc.Node)
    btnViewAwards:cc.Node=null//查看奖励按钮
    @property(cc.Node)
    winText:cc.Node=null//标题
    
    myselfranking:number=-1//玩家默认排名
    initUi(type) {//
        for (let itmeindex = this.Ranking.length; itmeindex < this.max; itmeindex++) {
            let rankingitme=cc.instantiate(this.Rankingitme)
            rankingitme.parent=this.content
            this.Ranking.push(rankingitme)
        }
        let selfranking=-1
        let SerialNo=this.RankingSelf.getChildByName("SerialNo")
        let name=this.RankingSelf.getChildByName("name")
        let btnAvatar=this.RankingSelf.getChildByName("headPortrait").getChildByName("btnAvatar")
        if(selfranking==-1){
            SerialNo.active=false
            this.RankingSelf.getChildByName("Notlisted").active=true
        }else{
            SerialNo.getComponent(cc.Label).string=""+(selfranking)//序号
            SerialNo.active=true
            this.RankingSelf.getChildByName("Notlisted").active=false
        }

        let myname=UserData.getInstance().getUserName(); //玩家名字
        let sphea=UserData.getInstance().getUserAvatar();//玩家头像
        name.getComponent(cc.Label).string=""+myname//玩家名字
        btnAvatar.getComponent(cc.Sprite).spriteFrame=PropManager.getInstance().getSpheadPortraitType(sphea)//头像id
        if (type == 2) {
            this.tag=2
            this.ToggleContainer.active=false
            this.btnViewAwards.active=false
            this.ScrollView.y=60
            this.RankingSelf.y=-330
            this.Ranking_Bg_0.y=60
            this.winText.getComponent(TextLanguage).setTextId(800003)
        } else if (type == 3) {
            this.tag=3
            this.ToggleContainer.active=false
            this.btnViewAwards.active=true//true
            this.ScrollView.y=90
            this.RankingSelf.y=-298
            this.Ranking_Bg_0.y=90
            this.winText.getComponent(TextLanguage).setTextId(800013)
        }else if(type==1){
            this.tag=1
            this.ToggleContainer.children[0].getComponent(cc.Toggle).isChecked=true
            this.ToggleContainer.active=true
            this.btnViewAwards.active=false
            this.ScrollView.y=0
            this.RankingSelf.y=-380
            this.Ranking_Bg_0.y=0
            this.winText.getComponent(TextLanguage).setTextId(200006)
        }
        HttpManager.post(AccessName.leaderboardByUser,this.getLeaderboardByUserJsonString(this.tag),true).then((data:any) =>{
            this.Refresh(data); 
        });
        // this.Refresh()
    }
    Refresh(data:any[]){
        
        this.ScrollView.getComponent(cc.ScrollView).scrollToTop(1)
        let selfranking=-1
        this.max = data.length;
        //后台拉取排名前100名的玩家
        for (let index = 0; index < this.Ranking.length; index++) {
            if(index<this.max){
                let CombatPower=this.Ranking[index].getChildByName("CombatPower")
                let SerialNo=this.Ranking[index].getChildByName("SerialNo")
                let name=this.Ranking[index].getChildByName("name")
                let btnAvatar=this.Ranking[index].getChildByName("headPortrait").getChildByName("btnAvatar")
                CombatPower.getComponent(TextLanguage).setTextId(this.text[this.tag - 1])//是哪个排行榜
                CombatPower.getComponent(TextLanguage).setReplaceValue('~',(data[index].value)+'');//排行榜战力数据
                SerialNo.getComponent(cc.Label).string=""+(index+1)//序号
                name.getComponent(cc.Label).string=data[index].name//玩家名字
                btnAvatar.getComponent(cc.Sprite).spriteFrame=PropManager.getInstance().getSpheadPortraitType(data[index].avatarId)//头像id
                if(index<3){
                    SerialNo.active=false
                    this.Ranking[index].getComponent(cc.Sprite).spriteFrame=this.bgsprite[index]//前三名的背景不一样
                    name.color=this.namecolor[index]
                }else{
                    SerialNo.active=true
                }
                if(data[index].uid==UserData.getInstance().getUserID()){    //如果在后台拉取的排名中有id跟玩家的id一样，那么玩家的排名在前100名中  将显示玩家排名   否则显示未上榜
                    selfranking=(index+1)
                }
                this.Ranking[index].active=true
            }else{
                this.Ranking[index].active=false
            }
        }
        let combatPower=0//HeroManager.getInstance().getAllHeroZhanli()// 1
        if(this.tag==1){
            combatPower=HeroManager.getInstance().getAllHeroZhanli()//获取战力
        }
        if(this.tag==2){
            combatPower=EndlessLevelsManager.getInstance().getMaxWave()//HeroManager.getInstance().getAllHeroZhanli()//获取波数
        }
        if(this.tag==3){
            combatPower=BossChallengeManager.getInstance().getMaxDamageNumber()//获取伤害
        }

        let CombatPower=this.RankingSelf.getChildByName("CombatPower")
        let SerialNo=this.RankingSelf.getChildByName("SerialNo")
        let name=this.RankingSelf.getChildByName("name")
        let btnAvatar=this.RankingSelf.getChildByName("headPortrait").getChildByName("btnAvatar")
        CombatPower.getComponent(TextLanguage).setTextId(this.text[this.tag - 1])//是哪个排行榜
        CombatPower.getComponent(TextLanguage).setReplaceValue('~',(combatPower)+'');//排行榜战力数据

        this.myselfranking=selfranking
        if(selfranking==-1){
            SerialNo.active=false
            this.RankingSelf.getChildByName("Notlisted").active=true
        }else{
            SerialNo.getComponent(cc.Label).string=""+(selfranking)//序号
            SerialNo.active=true
            this.RankingSelf.getChildByName("Notlisted").active=false
        }

        let myname=UserData.getInstance().getUserName(); //玩家名字
        let sphea=UserData.getInstance().getUserAvatar();//玩家头像
        name.getComponent(cc.Label).string=""+myname//玩家名字
        btnAvatar.getComponent(cc.Sprite).spriteFrame=PropManager.getInstance().getSpheadPortraitType(sphea)//头像id
    }
    clickBtnToggle(even,i){//单选按钮的选择
        // console.log("+++++++",even,i)
        this.tag=i
        HttpManager.post(AccessName.leaderboardByUser,this.getLeaderboardByUserJsonString(this.tag),true).then((data:any) =>{
            this.Refresh(data); 
        });
    }
    clickBtnClose()//关闭
    {
        for (let index = 0; index < this.Ranking.length; index++) {
            this.Ranking[index].active=false
        }
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        this.onClose();
    }

    private getLeaderboardByUserJsonString(type:number):string{
        let uid=UserData.getInstance().getUserID();
        return JSON.stringify({
            limit:100,
            type:type,
        });
    }

    clickBtnRewardDisplay(){//奖励展示
        UIManager.getInstance().showUiDialog(UIPath.RankingRewardDisplay,UILayerLevel.Three,{onCompleted:(uiNode)=> {
            uiNode.getComponent(rankingrewarddisplay).init({
                onClose:()=>{

                }
            })
            uiNode.getComponent(rankingrewarddisplay).initUi(this.myselfranking)//排名  默认-1   
        },});
    }




    // @property(cc.Label)
    // label: cc.Label = null;

    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    // start () {

    // }

    // update (dt) {}
}
