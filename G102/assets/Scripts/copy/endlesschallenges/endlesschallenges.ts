// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import WXManagerEX from "../../../startscene/WXManagerEX";
import { HttpManager, AccessName } from "../.././NetWork/HttpManager";
import { BossChallengeManager } from "../../Activity/BossChallenge";
import { EndlessLevelsManager } from "../../Activity/EndlessLevels";
import { GameMode } from "../../Constants";
import GameManager from "../../GameManager";
import { HeroManager } from "../../Hero/Data/HeroManager";
import { MonsterConfigureManager } from "../../Monster/Data/MonsterConfigure";
import { MonsterSkillManager } from "../../Monster/Data/MonsterSkill";
import { MonsterActionName, MonsterFaceName } from "../../Monster/MonsterData";
import { Follow_Type } from "../../multiLanguage/FollowConstants";
import FollowManager from "../../multiLanguage/FollowManager";
import LanguageManager from "../../multiLanguage/LanguageManager";
import TextLanguage from "../../multiLanguage/TextLanguage";
import { PropManager } from "../../Prop/PropManager";
import RankingList from "../../RankingList/RankingList";
import { SoundIndex } from "../../Sound/AudioConstants";
import { StorageKey } from "../../Storage/StorageConfig";
import { TheStorageManager } from "../../Storage/StorageManager";
import ToPlayMainUi from "../../UI/home/ToPlayMainUi";
import UIComponent from "../../UI/UIComponent";
import { UIPath, UILayerLevel } from "../../UI/UIConfig";
import { UIManager } from "../../UI/UIManager";
import UserData from "../../UserData";
import { UserInfo } from "../../UserInfo/UserInfo";
import MoppingVoid from "../voidcrack/MoppingVoid";
import VoidScene from "../voidcrack/VoidScene";
import { BossWeeklyRewardManager } from "./BossWeeklyReward";
import MoppingUp from "./MoppingUp";
import playinstructions from "./playinstructions";
import purchasesnumbe from "./purchasesnumbe";
import rewarddisplay from "./rewarddisplay";
import { RogueGiftInformationManager } from "./RogueGiftInformation";
import Shop from "./Shop";

const { ccclass, property } = cc._decorator;

@ccclass
export default class endlesschallenges extends UIComponent {

    @property(cc.Node)
    boss: cc.Node = null//boss专属的技能与名字  boss挑战
    @property(cc.Node)
    BossRush_Btn_Rank: cc.Node = null//排行榜按钮
    @property(cc.Node)
    BossRush_Btn_Bonus: cc.Node = null//奖励按钮
    @property(cc.Node)
    Maze_Btn_Shop: cc.Node = null//商店按钮
    
    @property(cc.Node)
    BossRush_Btn_Record: cc.Node = null//战斗记录按钮  boss挑战

    @property(cc.Node)
    xvkon: cc.Node = null//虚空裂缝的东西
    
    @property(cc.Node)
    BossRush_Tips: cc.Node = null//提示按钮

    @property(cc.Node)
    heroShadow: cc.Node = null//怪物阴影
    @property(cc.Node)
    pos: cc.Node = null//怪物位置

    @property(cc.Node)
    bt: cc.Node = null//标题

    @property(cc.Node)
    Common_Btn_Back: cc.Node = null//返回按钮  

    @property(cc.Node)
    btnno: cc.Node = null//扫荡按钮  
    @property(cc.Node)
    btnyes: cc.Node = null//开始挑战按钮  

    @property(cc.Node)
    RankingSelf: cc.Node = null//自己的头像  排名 
    @property(cc.Node)
    one: cc.Node = null//如果排名第一就显示这个文字
    @property(cc.Node)
    Promotion: cc.Node = null//如果不是第一就显示这个文字   达到多少波-伤害可晋升至多少名
    @property(cc.Node)
    Waves: cc.Node = null//无尽挑战   本次挑战将从多少波开始
    @property(cc.Node)
    num: cc.Node = null//挑战次数

    @property(cc.Node)
    jineng: cc.Node = null//boss的技能图标

    @property(cc.Node)
    bossname: cc.Node = null//boss的名字
    type: number = 0//2:无尽挑战   3：boss挑战

    @property(cc.SpriteAtlas)
    copy_ui: cc.SpriteAtlas = null//Boss技能图标    buff图标
    text: number[] = [100126, 100128, 100129]//战力:~波数:~伤害:~

    @property(cc.SpriteFrame)
    bjspr: cc.SpriteFrame[] = []//boss挑战背景

    @property(cc.SpriteFrame)
    bjsprwujin: cc.SpriteFrame = null//无尽挑战背景

    @property(cc.SpriteFrame)
    bjsprxvkon: cc.SpriteFrame = null//虚空裂缝背景
    @property(cc.Node)
    bbg: cc.Node = null//地图背景

    bossspriteid:number=0//boss技能id
    @property(cc.Node)
    SkillDescription: cc.Node = null//技能描述
    @property(cc.Node)
    bt1: cc.Node = null//最高排名    本周排名    第几章

    @property(cc.Node)
    BossRush_Time_Bg: cc.Node = null//每周刷新框
    @property(cc.Node)
    time: cc.Node = null//每周刷新文字
    @property(cc.Node)
    content: cc.Node = null//虚空裂缝奖励的父节点   
    @property(cc.Node)
    PageView: cc.Node = null//章节滑动节点
    
    // @property(cc.Label)
    // label: cc.Label = null;

    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    initUi(type) {//2:无尽挑战   3：boss挑战    4:虚空裂缝
        // GameManager.getInstance().music_manager.playMusic(MusicIndex.BGM_TJP);
        // FollowManager.getInstance().followEvent(Follow_Type.铁匠铺打开次数);
        this.type = type
        this.des()
        this.Refresh()//刷新
    }
    numberRefresh(){
        let num
        let totalnum
        let damage
        if (this.type == 2) {
            totalnum=TheStorageManager.getInstance().getNumber(StorageKey.TotalUnlimitedChallengeTimes,0);
            num = TheStorageManager.getInstance().getNumber(StorageKey.UnlimitedChallengeTimes,3);
            damage=EndlessLevelsManager.getInstance().getMaxWave()//TheStorageManager.getInstance().getNumber(StorageKey.UnlimitedChallengeDamage,0);
        } else if (this.type == 3) {
            totalnum=TheStorageManager.getInstance().getNumber(StorageKey.TotalBossChallengeTimes,0);
            num = TheStorageManager.getInstance().getNumber(StorageKey.BossChallengeTimes,3);
            damage=TheStorageManager.getInstance().getNumber(StorageKey.BossChallengeDamage,-1);
        }
        else if (this.type == 4) {
            num = TheStorageManager.getInstance().getNumber(StorageKey.VoidCrackChallengeTimes,3);
        }
        if(this.type!= 4){
            if(totalnum>=1&&num>0&&damage>-1){
                this.btnno.active=true
            }else{
                this.btnno.active=false
            }
        }else{
            let index=this.PageView.getComponent(cc.PageView).getCurrentPageIndex()
            let damage=TheStorageManager.getInstance().getNumber(StorageKey.VoidCrackChallengeDamage,0);
            let num = TheStorageManager.getInstance().getNumber(StorageKey.VoidCrackChallengeTimes,3);
            if((damage+1)>=index){
                if(index==(damage+1)){
                    this.btnno.active=false
                    this.btnyes.active=true
                }else{
                    if(num>0){
                        this.btnno.active=true
                    }else{
                        this.btnno.active=false
                    }
                    this.btnyes.active=true
                }
            }else{
                this.btnno.active=false
                this.btnyes.active=false
            }
        }
        let red=this.btnyes.getChildByName('red');
        let txt=LanguageManager.getInstance().getStrByTextId(820009)
        console.log("++++++++++",txt)
        txt=txt.replace('~',""+num)
        
        if(num==0){
            // this.num.color=new cc.Color(255,71,70)
            txt=txt.replace('@',"#FF4746")
            red.active=false;
        }else{
            // this.num.color=new cc.Color(255,255,255)
            txt=txt.replace('@',"#FFFFFF")
            red.active=true;
        }
        
        this.num.getComponent(cc.RichText).string=""+txt
        // this.num.getComponent(cc.Label).string=""+num
    }
    Refresh() {
        let EliteMonster = []
        this.SkillDescription.active=false
        this.SkillDescription.getChildByName("Common_TextBG").active=false
        this.numberRefresh()
        this.BossRush_Btn_Record.active = false
        this.xvkon.active=false
        this.Waves.active=true
        this.Promotion.active=true
        this.one.active=true
        this.RankingSelf.active=true
        this.BossRush_Btn_Rank.active=true
        this.BossRush_Btn_Bonus.active=true
        this.Maze_Btn_Shop.active=false
        if (this.type == 2) {
            FollowManager.getInstance().followEvent(Follow_Type.无尽挑战页面展示次数);
            this.bbg.getComponent(cc.Sprite).spriteFrame=this.bjsprwujin
            this.boss.active = false
            let wavenumber=EndlessLevelsManager.getInstance().getMaxWave()-31;//波数
            if(wavenumber<1){
                wavenumber=0
            }
            this.bbg.y=0
            let Round =EndlessLevelsManager.getInstance().getRound(wavenumber)//回合数
            wavenumber=EndlessLevelsManager.getInstance().getWave(Round)
            TheStorageManager.getInstance().setItem(StorageKey.UnlimitedChallengeDamage,wavenumber);
            EliteMonster = EndlessLevelsManager.getInstance().getEliteMonster(Round).concat(EndlessLevelsManager.getInstance().getNormalMonster(Round))//怪物id
            this.Waves.active=true//本次挑战从多少波开始
            let txt=LanguageManager.getInstance().getStrByTextId(800005)
            txt=txt.replace('~',""+(wavenumber+1))
            this.Waves.getComponent(cc.RichText).string=txt
            this.bt.getComponent(TextLanguage).setTextId(800001)
            this.bt1.getComponent(TextLanguage).setTextId(800003)
            this.BossRush_Time_Bg.active=false
            this.BossRush_Btn_Bonus.active=true
            this.time.active=false
            this.btnyes.active=true
        } else if (this.type == 3) {
            this.btnyes.active=true
            FollowManager.getInstance().followEvent(Follow_Type.BOSS挑战页面展示次数);
            this.boss.active = true
            // this.BossRush_Btn_Record.active = true
            let RotationOrder = UserInfo.getInstance().RotationOrder//轮换顺序
            let Stage = 1//阶段
            this.Waves.active=false
            let ChallengeID = RotationOrder * 1000 + Stage//挑战ID
            this.bbg.getComponent(cc.Sprite).spriteFrame=this.bjspr[BossChallengeManager.getInstance().getChapterScene(ChallengeID)]//换背景
            EliteMonster = EliteMonster.concat(BossChallengeManager.getInstance().getMonsterId(ChallengeID))//怪物id
            this.bbg.y=0
            let SkillNum=MonsterConfigureManager.getInstance().getSkillNum(EliteMonster[0])
            for (let index = 0; index < this.jineng.children.length; index++) {
                if(index<SkillNum){
                    this.jineng.children[index].active=true
                    let spriteid=(EliteMonster[0]*1000)+((index+1)*100)+1
                    this.bossspriteid=EliteMonster[0]
                    this.jineng.children[index].getComponent(cc.Sprite).spriteFrame=this.copy_ui.getSpriteFrame("MonsterSkill_"+spriteid)
                }else{
                    this.jineng.children[index].active=false
                }
            }
            this.bt.getComponent(TextLanguage).setTextId(820001)
            this.bt1.getComponent(TextLanguage).setTextId(820005)
            this.BossRush_Time_Bg.active=true
            this.time.active=true

            this.BossRush_Btn_Bonus.active=true

            let Rank=UserInfo.getInstance().damageNumberLast//是否上排行榜名次  得到后台数据
            // console.log("====",Rank)
            // let uid = UserData.getInstance().getUserID();
            // console.log("====----",uid)
            let RewardGrade=-1//排名  默认-1  
            if(Rank>-1){
                // Rank=-1//修改后台数据为0
                let uid = UserData.getInstance().getUserID();
                // console.log("====----",uid)
                let json={
                    uid:uid,
                    damageNumberLast: -1,
                }
                UserInfo.getInstance().damageNumberLast=-1
                HttpManager.post(AccessName.updateUserInfoDNL,JSON.stringify(json)).then((data:any)=>{
                    if(Rank==0){
                        RewardGrade=7
                    }else if(Rank==1){
                        RewardGrade=1
                    }else if(Rank==2){
                        RewardGrade=2
                    }else if(Rank==3){
                        RewardGrade=3
                    }else if(Rank<=10&&Rank>=4){
                        RewardGrade=4
                    }else if(Rank<=50&&Rank>=11){
                        RewardGrade=5
                    }else if(Rank<=100&&Rank>=51){
                        RewardGrade=6
                    }
                    let rewardData= BossWeeklyRewardManager.getInstance().getFirstRewardArr(RewardGrade)
                    let itemarr=[]
                    for (let index = 0; index < rewardData.length; index++) {
                        let items=PropManager.getInstance().createPropItem(rewardData[index].reward_id,rewardData[index].reward_num);
                        itemarr.push(items)
                    }
                    GameManager.getInstance().showMultipleGetTip(itemarr);
                    // if(data.uid){
                    // }
                }).catch((error)=>{
                    cc.error(error);
                });
                // HttpManager.post(AccessName.updateUserInfoDNL,this.setRankJsonString());
            }
        }else if (this.type == 4) {
            this.boss.active = false
            this.xvkon.active=true
            this.Waves.active=false
            this.Promotion.active=false
            this.one.active=false
            this.RankingSelf.active=false
            this.BossRush_Btn_Rank.active=false
            this.BossRush_Btn_Bonus.active=false
            this.Maze_Btn_Shop.active=true
            this.BossRush_Time_Bg.active=false
            this.time.active=false
            this.bbg.y=280
            this.bbg.getComponent(cc.Sprite).spriteFrame=this.bjsprxvkon
            this.bt.getComponent(TextLanguage).setTextId(830001)
            this.bt1.getComponent(TextLanguage).setTextId(820005)
            for (let contentindex = 0; contentindex < this.content.children.length; contentindex++) {
                let mycontentindex=contentindex
                if(mycontentindex==0){
                    mycontentindex=8
                }
                if(mycontentindex==9){
                    mycontentindex=1
                }
                let id=RogueGiftInformationManager.getInstance().getPropID_1((mycontentindex))
                let item=PropManager.getInstance().createPropItem(id,0);
                item.parent=this.content.children[contentindex].children[0]

                let id1=RogueGiftInformationManager.getInstance().getPropID_2((mycontentindex))
                let item1=PropManager.getInstance().createPropItem(id1,0);
                item1.parent=this.content.children[contentindex].children[1]

                let id2=RogueGiftInformationManager.getInstance().getPropID_3((mycontentindex))
                let item2=PropManager.getInstance().createPropItem(id2,0);
                item2.parent=this.content.children[contentindex].children[2]
            }
            for (let index = 0; index < this.pos.children.length; index++) {
                this.heroShadow.children[index].active = false
                this.pos.children[index].active = false
            }   
            let index=this.PageView.getComponent(cc.PageView).getCurrentPageIndex()
            if(index==1){
                this.bt1.getComponent(TextLanguage).setTextId(100053)
                this.bt1.getComponent(TextLanguage).setReplaceValue('~',(index)+ '');
                let damage=TheStorageManager.getInstance().getNumber(StorageKey.VoidCrackChallengeDamage,0);
                let num = TheStorageManager.getInstance().getNumber(StorageKey.VoidCrackChallengeTimes,3);
                if((damage+1)>=index){
                    if(index==(damage+1)){
                        this.btnno.active=false
                        this.btnyes.active=true
                    }else{
                        if(num>0){
                            this.btnno.active=true
                        }else{
                            this.btnno.active=false
                        }
                        this.btnyes.active=true
                    }
                }else{
                    this.btnno.active=false
                    this.btnyes.active=false
                }
            }else{
                this.content.x=-825
                this.PageView.getComponent(cc.PageView).scrollToPage(1,0.01)
            }
            return
        }
        //生成怪物
        for (let index = 0; index < this.pos.children.length; index++) {
            this.heroShadow.children[index].active = false
            this.pos.children[index].active = false
            if (index < EliteMonster.length) {
                let elitetype = MonsterConfigureManager.getInstance().getMonsterClass(EliteMonster[index]);
                let path = "monster/ui/Monster_" + elitetype;
                let node: cc.Node = null;
                WXManagerEX.getInstance().resourcesBundle.load(path, cc.Prefab, (error: Error, assets: cc.Prefab) => {
                    if (error) {
                        cc.log(error);
                        return;
                    }
                    node = cc.instantiate(assets);
                    node.setPosition(0, 0, 0)
                    let id = EliteMonster[index]
                    node.scale = MonsterConfigureManager.getInstance().getScale(id);
                    let StrengthType = MonsterConfigureManager.getInstance().getStrengthType(id)
                    node.parent = this.pos.children[index]
                    this.heroShadow.children[index].active = true
                    if (StrengthType == 3) {
                        this.heroShadow.children[index].setScale(1.3, 1.3)
                        node.scale = MonsterConfigureManager.getInstance().getScale(id) * 1;
                        node.getComponent(sp.Skeleton).setAnimation(0, MonsterActionName.Idle, true);
                    }
                    if (StrengthType == 2) {
                        this.heroShadow.children[index].setScale(0.7, 0.7)
                        node.scale = MonsterConfigureManager.getInstance().getScale(id) * 1;
                        node.getComponent(sp.Skeleton).setSkin(MonsterFaceName.SideR + MonsterConfigureManager.getInstance().getSkin(id));
                        node.getComponent(sp.Skeleton).setAnimation(0, MonsterFaceName.SideR + "_" + MonsterActionName.Idle, true);
                    }
                    if (StrengthType == 1) {
                        this.heroShadow.children[index].setScale(0.4, 0.4)
                        node.scale = MonsterConfigureManager.getInstance().getScale(id) * 1;
                        node.getComponent(sp.Skeleton).setSkin(MonsterFaceName.SideR + MonsterConfigureManager.getInstance().getSkin(id));
                        node.getComponent(sp.Skeleton).setAnimation(0, MonsterFaceName.SideR + "_" + MonsterActionName.Idle, true);
                    }
                });
                this.pos.children[index].active = true
            }
        }
        //玩家排名
        let selfranking = -1
        let combatPower = 0
        if (this.type == 2) {
            combatPower = EndlessLevelsManager.getInstance().getMaxWave()//HeroManager.getInstance().getAllHeroZhanli()//获取波数
        }
        if (this.type == 3) {
            combatPower = BossChallengeManager.getInstance().getMaxDamageNumber()//获取伤害
        }
        let CombatPower = this.RankingSelf.getChildByName("CombatPower")
        let SerialNo = this.RankingSelf.getChildByName("SerialNo")
        let name = this.RankingSelf.getChildByName("name")
        let btnAvatar = this.RankingSelf.getChildByName("headPortrait").getChildByName("btnAvatar")
        CombatPower.getComponent(TextLanguage).setTextId(this.text[this.type - 1])//是哪个排行榜
        CombatPower.getComponent(TextLanguage).setReplaceValue('~', (combatPower) + '');//排行榜战力数据
        this.Promotion.active=false
        this.one.active=false
        SerialNo.active=false
        this.RankingSelf.getChildByName("Notlisted").active =false
        this.RankingSelf.getComponent(cc.Sprite).spriteFrame=this.copy_ui.getSpriteFrame("BossRush_Rank_4")
        HttpManager.post(AccessName.leaderboardByUser, this.getLeaderboardByUserJsonString(this.type), true).then((data: any) => {
            let max = data.length;
            for (let index = 0; index < max; index++) {
                if(data[index].uid==UserData.getInstance().getUserID()){    //如果在后台拉取的排名中有id跟玩家的id一样，那么玩家的排名在前100名中  将显示玩家排名   否则显示未上榜
                    selfranking=(index+1)
                }
            }
            if(selfranking==1){
                this.one.active=true
            }else{
                let txt=LanguageManager.getInstance().getStrByTextId(800004)
                if (this.type == 2) {
                    txt=LanguageManager.getInstance().getStrByTextId(800004)//达到多少波，可晋升至多少名   
                } else if (this.type == 3) {
                    txt=LanguageManager.getInstance().getStrByTextId(820007)//达到多少伤害，可晋升至多少名
                }
                if(data.length>0){
                    if(selfranking==-1){
                        txt=txt.replace('~x',""+data[max-1].value)
                        txt=txt.replace('~y',""+max)
                    }else{
                        txt=txt.replace('~x',""+data[selfranking-2].value)
                        txt=txt.replace('~y',""+(selfranking-1))
                    }
                    this.Promotion.getComponent(cc.RichText).string=txt;//达到多少波，可晋升至多少名   
                    this.Promotion.active=true
                }
            }
            if (selfranking<=3&&selfranking>=1) {
                SerialNo.active = false
                this.RankingSelf.getComponent(cc.Sprite).spriteFrame=this.copy_ui.getSpriteFrame("BossRush_Rank_"+selfranking) //前三名的背景不一样
            }else{
                if(selfranking>=1){
                    SerialNo.active = true
                }
                this.RankingSelf.getComponent(cc.Sprite).spriteFrame=this.copy_ui.getSpriteFrame("BossRush_Rank_4")
            }
            if (selfranking == -1) {
                this.RankingSelf.getChildByName("Notlisted").active = true
            } else {
                SerialNo.getComponent(cc.Label).string = "" + (selfranking)//序号
                this.RankingSelf.getChildByName("Notlisted").active = false
            }
        });
        let myname = UserData.getInstance().getUserName(); //玩家名字
        let sphea = UserData.getInstance().getUserAvatar();//玩家头像
        name.getComponent(cc.Label).string = "" + myname//玩家名字
        btnAvatar.getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpheadPortraitType(sphea)//头像id
    }
    des() {//清除所有怪物的预制体.
        if(this.type==4){//清除虚空裂缝的章节奖励
            for (let contentindex = 0; contentindex < this.content.children.length; contentindex++) {
                for (let index = 0; index < 3; index++) {
                    if(this.content.children[contentindex].children[index].childrenCount>0){
                        this.content.children[contentindex].children[index].destroyAllChildren()
                    } 
                }
            }
        }else{
            for (let index = 0; index < this.pos.children.length; index++) {
                if (this.pos.children[index].children.length > 0) {
                    this.pos.children[index].destroyAllChildren()
                }
            }
        }
    }
    clickBtnMaze_Change(even,i){//切换章节的按钮  0:左   1：右
        let index=this.PageView.getComponent(cc.PageView).getCurrentPageIndex()
        if(i==0){
            index--
        }
        if(i==1){
            index++
        }
        this.PageView.getComponent(cc.PageView).scrollToPage(index,0.3)
    }
    // 注意参数的顺序和类型是固定的
    PageViewcallback() {
        let index=this.PageView.getComponent(cc.PageView).getCurrentPageIndex()
        if(index==0){
            this.content.x=-4675
            this.PageView.getComponent(cc.PageView).scrollToPage(8,0.01)
        }
        if(index==9){
            this.content.x=-825
            this.PageView.getComponent(cc.PageView).scrollToPage(1,0.01)
        }
        index=this.PageView.getComponent(cc.PageView).getCurrentPageIndex()
        this.bt1.getComponent(TextLanguage).setTextId(100053)
        this.bt1.getComponent(TextLanguage).setReplaceValue('~',(index)+ '');

        let damage=TheStorageManager.getInstance().getNumber(StorageKey.VoidCrackChallengeDamage,0);
        let num = TheStorageManager.getInstance().getNumber(StorageKey.VoidCrackChallengeTimes,3);
        if((damage+1)>=index){
            if(index==(damage+1)){
                this.btnno.active=false
                this.btnyes.active=true
            }else{
                if(num>0){
                    this.btnno.active=true
                }else{
                    this.btnno.active=false
                }
                
                this.btnyes.active=true
            }
        }else{
            this.btnno.active=false
            this.btnyes.active=false
        }
    }
    clickBtnClose()//关闭
    {
        this.des()
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        this.onClose();
    }

    clickBtnPlayinstructions(){//玩法说明
        UIManager.getInstance().showUiDialog(UIPath.PlayinsTructions,UILayerLevel.Two,{onCompleted:(uiNode)=> {
            uiNode.getComponent(playinstructions).init({
                onClose:()=>{
                }
            })
            uiNode.getComponent(playinstructions).initUi(this.type)//2:无尽挑战   3：boss挑战
        },});
    }
    clickBtnRewardDisplay(){//奖励展示
        UIManager.getInstance().showUiDialog(UIPath.RewardDisplay,UILayerLevel.Two,{onCompleted:(uiNode)=> {
            uiNode.getComponent(rewarddisplay).init({
                onClose:()=>{
                }
            })
            uiNode.getComponent(rewarddisplay).initUi(this.type)//2:无尽挑战   3：boss挑战
        },});
    }
    clickBtnRankingList(){
        if(this.type==2){
            FollowManager.getInstance().followEvent(Follow_Type.无尽挑战_排行榜点击次数);
        }
        if(this.type==3){
            FollowManager.getInstance().followEvent(Follow_Type.BOSS挑战_排行榜点击次数);
        }
        UIManager.getInstance().showUiDialog(UIPath.RankingList,UILayerLevel.Two,{onCompleted:(uiNode)=> {
            uiNode.getComponent(RankingList).initUi(this.type)
        },});//排行榜
    }
    clickBtnSkillDescription(e,i){//boss技能
        this.SkillDescription.x=0
        if(e.currentTarget.x<0){
            this.SkillDescription.x=(e.currentTarget.x+173)
        }
        if(e.currentTarget.x>0){
            this.SkillDescription.x=(e.currentTarget.x-173)
        }
        this.SkillDescription.active=true
        let spriteid=(this.bossspriteid*1000)+(i*100)+1
        this.SkillDescription.getChildByName("bt").getComponent(TextLanguage).setTextId(MonsterSkillManager.getInstance().getSkillIntro(spriteid))
        this.scheduleOnce(function(){
                this.SkillDescription.getChildByName("Common_TextBG").height=(this.SkillDescription.getChildByName("bt").height+50)
                this.SkillDescription.getChildByName("Common_TextBG").active=true
        },0.0001)
    }
    clickBtnStartChallenge(){//开始挑战
        let num
        let buynum
        let totalnum
        if (this.type == 2) {
            // totalnum=TheStorageManager.getInstance().getNumber(StorageKey.TotalUnlimitedChallengeTimes,0);
            num = TheStorageManager.getInstance().getNumber(StorageKey.UnlimitedChallengeTimes,3);
            buynum = TheStorageManager.getInstance().getNumber(StorageKey.BuyUnlimitedChallengeTimes,3);
        } else if (this.type == 3) {
            // totalnum=TheStorageManager.getInstance().getNumber(StorageKey.TotalBossChallengeTimes,0);
            num = TheStorageManager.getInstance().getNumber(StorageKey.BossChallengeTimes,3);
            buynum = TheStorageManager.getInstance().getNumber(StorageKey.BuyBossChallengeTimes,3);
        } else if (this.type == 4) {
            // totalnum=TheStorageManager.getInstance().getNumber(StorageKey.TotalVoidCrackChallengeTimes,0);
            num = TheStorageManager.getInstance().getNumber(StorageKey.VoidCrackChallengeTimes,3);
            buynum = TheStorageManager.getInstance().getNumber(StorageKey.BuyVoidCrackChallengeTimes,3);
        }
        if(num>0){
            //开始游戏
            this.clickBtnClose()
            if (this.type == 2) {
                    GameManager.getInstance().cur_game_mode=GameMode.Endless;       

                    UIManager.getInstance().showUiDialog(UIPath.ToPlay,UILayerLevel.One,{onCompleted:(uiNode)=> {
                        uiNode.getComponent(ToPlayMainUi).init({onClose:()=>{
                        }});
                    },})
            } else if (this.type == 3) {
                GameManager.getInstance().cur_game_mode=GameMode.Boss_Challenge;       
                UIManager.getInstance().showUiDialog(UIPath.ToPlay,UILayerLevel.One,{onCompleted:(uiNode)=> {
                    uiNode.getComponent(ToPlayMainUi).init({onClose:()=>{
                    }});
                },})
            }else if (this.type == 4) {
                // GameManager.getInstance().cur_game_mode=GameMode.Maze;       
                num--
                TheStorageManager.getInstance().setItem(StorageKey.VoidCrackChallengeTimes,num);
                UIManager.getInstance().showUiDialog(UIPath.VoidScene,UILayerLevel.One,{onCompleted:(uiNode)=> {
                    uiNode.getComponent(VoidScene).init(
                        {onClose:()=>{

                        }}
                    );
                    let index=this.PageView.getComponent(cc.PageView).getCurrentPageIndex()
                    uiNode.getComponent(VoidScene).initUi(index,1,2)
                    
                },})
                // UIManager.getInstance().showUiDialog(UIPath.ToPlay,UILayerLevel.One,{onCompleted:(uiNode)=> {
                //     uiNode.getComponent(ToPlayMainUi).init({onClose:()=>{
                //     }});
                // },})
            }
        }else{
            if(buynum>0){
                this.clickBtnPurchasesNumbe()
            }else{
                //提示明日再来
                GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(100120),3);
            }
        }
    }
    clickBtnPurchasesNumbe(){//购买挑战次数
        UIManager.getInstance().showUiDialog(UIPath.PurchasesNumbe,UILayerLevel.Two,{onCompleted:(uiNode)=> {
            uiNode.getComponent(purchasesnumbe).init({
                onClose:()=>{
                    this.numberRefresh()
                }
            })
            uiNode.getComponent(purchasesnumbe).initUi(this.type)
        },});
    }

    clickBtnMoppingUp(){//扫荡
        if(this.type==4){
            UIManager.getInstance().showUiDialog(UIPath.MoppingVoid,UILayerLevel.Two,{onCompleted:(uiNode)=> {
                uiNode.getComponent(MoppingVoid).init({
                    onClose:()=>{
                        this.numberRefresh()
                    }
                })
                let index=this.PageView.getComponent(cc.PageView).getCurrentPageIndex()
                uiNode.getComponent(MoppingVoid).initUi(index)
            },});
        }else{
            UIManager.getInstance().showUiDialog(UIPath.MoppingUp,UILayerLevel.Two,{onCompleted:(uiNode)=> {
                uiNode.getComponent(MoppingUp).init({
                    onClose:()=>{
                        this.numberRefresh()
                    }
                })
                uiNode.getComponent(MoppingUp).initUi(this.type,this.node)
            },});
        }

    }
    clickBtnShop(){//虚空裂缝商店
        UIManager.getInstance().showUiDialog(UIPath.Shop,UILayerLevel.Two,{onCompleted:(uiNode)=> {
            uiNode.getComponent(Shop).init({
                onClose:()=>{

                }
            })
            uiNode.getComponent(Shop).initUi()
        },});
    }
    clickBtnCloseSkillDescription(){
        this.SkillDescription.getChildByName("Common_TextBG").active=false
        this.SkillDescription.active=false
    }
    private getLeaderboardByUserJsonString(type: number): string {
        let uid = UserData.getInstance().getUserID();
        return JSON.stringify({
            limit: 100,
            type: type,
        });
    }
    private setRankJsonString(): string {
        let uid = UserData.getInstance().getUserID();
        console.log("======",uid)
        return JSON.stringify({
            uid:uid,
            damageNumberLast: -1,
        });
    }

    // start () {

    // }

    // update (dt) {}
}
