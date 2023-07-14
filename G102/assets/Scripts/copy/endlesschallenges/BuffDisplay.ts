// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ApkManager from "../../Ads/ApkManager";
import CoinPop from "../../CoinPop";
import { GameState, VIDEO_TYPE } from "../../Constants";
import GameManager from "../../GameManager";
import { HeroManager } from "../../Hero/Data/HeroManager";
import { MonsterSkillManager } from "../../Monster/Data/MonsterSkill";
import { Follow_Type } from "../../multiLanguage/FollowConstants";
import FollowManager from "../../multiLanguage/FollowManager";
import LanguageManager from "../../multiLanguage/LanguageManager";
import TextLanguage from "../../multiLanguage/TextLanguage";
import { PropId } from "../../Prop/PropConfig";
import { PropManager } from "../../Prop/PropManager";
import { SoundIndex } from "../../Sound/AudioConstants";
import { StorageKey } from "../../Storage/StorageConfig";
import { TheStorageManager } from "../../Storage/StorageManager";
import MyTool from "../../Tools/MyTool";
import UIComponent from "../../UI/UIComponent";
import { UIPath, UILayerLevel } from "../../UI/UIConfig";
import { UIManager } from "../../UI/UIManager";
import WallManager from "../../Wall/WallManager";
import { EndlessBuffManager } from "./EndlessBuff";
import { EndlessBuff } from "./EndlessConfig";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BuffDisplay extends UIComponent {
    @property(cc.Node)
    bt: cc.Node = null//标题
    @property(cc.Node)
    RichText: cc.Node = null//再刷新几次必含史诗级品质以上技能
    @property(cc.Node)
    btnad: cc.Node = null//广告获得
    @property(cc.Node)
    btnshow: cc.Node = null//钻石获得
    @property(cc.Node)
    Common_Window3_1: cc.Node = null//框
    @property(cc.Node)
    BossRush_Line1: cc.Node = null//框
    @property(cc.Node)
    BossRush_Line2: cc.Node = null//框
    @property(cc.Node)
    text: cc.Node = null//文字
    @property(cc.Node)
    xiatext: cc.Node = null//底部文字
    @property(cc.Node)
    Common_Btn_Close: cc.Node = null//关闭按钮
    @property(cc.Node)
    Common_Window3_2: cc.Node = null//标题背景
    @property(cc.Node)
    Endless: cc.Node = null//buff父节点
    @property(cc.Node)
    Endless_Frame: cc.Node=null//英雄头像父节点
    @property(cc.Node)
    Endless_List: cc.Node = null//已选择buff父节点
    @property(cc.Node)
    Endless_List_suo: cc.Node = null//已选择buff  锁父节点
    @property(cc.Node)
    Label: cc.Node = null//底部文字
    @property(cc.Node)
    bg1: cc.Node = null//遮罩
    @property(cc.Node)
    Tipspop: cc.Node = null//确认关闭弹窗，
    type:number=0//0:Buff展示   1：Buff选择
    @property(cc.Node)
    num: cc.Node = null
    Buff:number[][]=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]//这个位置是否有技能
    //Buff:number[][]=[[0,0,0,0],[1,0,0,0],[1,1,0,0],[1,1,1,0],[1,1,1,1]]//这个位置是否有技能
    //[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]//这个位置是否有技能
    //Buff:number[][]=[[0,0,0,0],[301,0,0,0],[401,302,0,0],[501,402,502,0],[302,303,304,201]]//这个位置是否有技能
    @property(cc.Node)
    EndlessBuff: cc.Node = null//buff技能的预制体
    @property(cc.SpriteAtlas)
    copy_ui: cc.SpriteAtlas = null//buff技能的图片图集   EndlessBuff_201
    @property(cc.Node)
    SkillDescription: cc.Node = null//技能描述
    @property(cc.Node)
    EndlessBuff1: cc.Node = null//移动的buff
    @property(cc.Node)
    Endless_Light: cc.Node = null//发光的框


    RaffleNumber:number=3//抽奖次数  默认五次

    @property(cc.Node)
    surplustxt: cc.Node = null//剩余buff几次选择机会
    public static surplusnumber:number=-1//剩余几次buff选择机会   默认-1次   800030

    @property(cc.Node)
    mttexiao: cc.Node = null//特效父节点
    @property(cc.Node)
    texiao: cc.Node = null//特效节点
    initUi(type) {//0:Buff展示   1：Buff选择
        // GameManager.getInstance().music_manager.playMusic(MusicIndex.BGM_TJP);
        // FollowManager.getInstance().followEvent(Follow_Type.铁匠铺打开次数);
        this.RaffleNumber=3
        this.SkillDescription.active=false
        this.SkillDescription.getChildByName("Common_TextBG").active=false
        this.Endless_Light.active=false
        this.EndlessBuff1.active=false
        let id = 800024
        this.type=type
        this.clickBtnTipspop()
        this.surplustxt.active=false
        if (type == 0) {
            id = 800024
            this.RichText.active=false
            this.btnad.active=false
            this.btnshow.active=false
            this.Common_Window3_1.height=600
            this.Common_Window3_1.y=-8
            this.Common_Btn_Close.y=279
            this.Common_Window3_2.y=285
            this.bt.y=285
            this.BossRush_Line1.active=false
            this.BossRush_Line2.active=false
            this.text.active=false
            this.Label.active=true
            this.bg1.active=false
            this.Endless.active=false
            this.xiatext.active=false
        } else if (type == 1) {
            id = 800020
            this.RichTextRefresh()
            this.RichText.active=true
            this.btnad.active=true
            this.btnshow.active=true
            this.Common_Window3_1.height=970
            this.Common_Window3_1.y=10
            this.Common_Btn_Close.y=485
            this.Common_Window3_2.y=491
            this.bt.y=491
            this.BossRush_Line1.active=true
            this.BossRush_Line2.active=true
            this.text.active=true
            this.Label.active=false
            this.bg1.active=true
            this.xiatext.active=true
            for (let index = 0; index < this.Endless.children.length; index++) {
                this.Endless.children[index].active=true
            }
            //刷新三个buff
            this.Refresh()
            this.Endless.active=true
            this.num.getComponent(cc.Label).string=""+200
        }
        this.bt.getComponent(TextLanguage).setTextId(id)
        this.RefreshBuff()
    }
    RichTextRefresh(){//刷新文字次数
        let txt=LanguageManager.getInstance().getStrByTextId(800022)
        txt=txt.replace('~',""+this.RaffleNumber)
        this.RichText.getComponent(cc.RichText).string=txt

    }
    //刷新锁的状态
    Unlock(){
        let teamList=HeroManager.getInstance().getTeamList(GameManager.getInstance().cur_game_mode);
        // console.log("++++++++",teamList)
        for(let i=0; i<teamList.length; i++) 
        {
            let heroType=teamList[i];
            if(heroType>0)
            {
                if(this.Endless_Frame.children[i].childrenCount<2){
                    let item = PropManager.getInstance().createPropItem(110000+teamList[i],0);
                    item.scale=0.8
                    item.parent=this.Endless_Frame.children[i]
                }
                //buff的锁    如果这个位置有buff   那么这个位置下面一个位置的锁打开   如果这个地方有英雄  默认第一个位置开
                for (let index = 0; index < this.Buff[i].length; index++) {
                    if(this.Buff[i][index]==0&&index==0){
                        this.Endless_List_suo.children[i].children[index].active=false
                    }
                    if(this.Buff[i][index]>0){
                        this.Endless_List_suo.children[i].children[index].active=false
                        if(index<(this.Buff[i].length-1)){
                            this.Endless_List_suo.children[i].children[index+1].active=false
                        }
                    }
                }
            }
        }
    }
    clickBtnEndlessBuffDetails(even,i){//buff详情
        let id=Number(i)
        if(id>1000){
            // console.log("是上面的三个，不显示详情",id/10000)
        }else{
            // console.log("是底下的，显示详情",id)
            this.SkillDescription.x=0
            if(even.currentTarget.parent.x<0){
                this.SkillDescription.x=(even.currentTarget.parent.x)
            }
            if(even.currentTarget.parent.x>0){
                this.SkillDescription.x=(even.currentTarget.parent.x)
            }
            this.SkillDescription.y=(even.currentTarget.parent.y+10)
            this.SkillDescription.active=true
            let Parameter=EndlessBuffManager.getInstance().getParameter(id) 
            let Type=EndlessBuffManager.getInstance().getType(id) 
            let spriteid=801000+Type
            this.SkillDescription.getChildByName("bt").getComponent(TextLanguage).setTextId(spriteid)

            // Administrator:
            // 1.攻击力+x%
            // 2.攻速+x%
            // 3.暴击值+x
            // 4.暴击增幅+x%
            // 5.防御力+x%
            // 6.最大生命值+x% 
            // 7.每秒回复最大生命值x%
            // 8.立即回复最大生命值x%（注：该buff生效后立即消失）
            // 9.连续攻击 概率x%
            // 10.主动技能冷却时间减少x%
            // 11.最终伤害加成x%

            if(Type==1||Type==2||Type==4||Type==5||Type==6||Type==7||Type==8||Type==9||Type==10||Type==11){
                let sParameter=Parameter*100
                this.SkillDescription.getChildByName("bt").getComponent(TextLanguage).setReplaceValue('~', MyTool.numberFormat(sParameter,2)+ '%');
            }else{
                this.SkillDescription.getChildByName("bt").getComponent(TextLanguage).setReplaceValue('~', Parameter+ '');
            }
            

            this.scheduleOnce(function(){
                this.SkillDescription.getChildByName("Common_TextBG").active=true
            },0.0001)
        }
    }
    onHeroTouchStart(e:cc.Event.EventTouch) {
        let touchTeam=e.getCurrentTarget();
        let pos=this.node.convertToNodeSpaceAR(e.getLocation());
        this.EndlessBuff1.active=true 
        this.EndlessBuff1.setPosition(pos)
        this.EndlessBuff1.getComponent(cc.Sprite).spriteFrame=touchTeam.getComponent(cc.Sprite).spriteFrame
        touchTeam.getComponent(cc.Sprite).enabled=false
        // console.log("当手指触摸到屏幕时",pos)
    }
    onHeroTouchMove(e:cc.Event.EventTouch) {
        let touchTeam=e.getCurrentTarget();
        let pos=this.node.convertToNodeSpaceAR(e.getLocation());
        this.EndlessBuff1.setPosition(pos)
        // console.log("当手指在屏幕上移动时",pos)
        this.HeroTouch(touchTeam,pos,0)
    }
    onHeroTouchEnd(e:cc.Event.EventTouch) {
        let touchTeam=e.getCurrentTarget();
        // console.log("当手指在目标节点区域内离开屏幕时",touchTeam)
        this.EndlessBuff1.active=false
        touchTeam.getComponent(cc.Sprite).enabled=true
    }
    //是否在框的范围内   可以被放置    出现发光的框
    HeroTouch(touchTeam,pos,type){//0:当手指在屏幕上移动时    1：当手指在目标节点区域外离开屏幕时    放置时
        for(let i=0; i<this.Endless_List.children.length; i++)
        {
            for (let j = 0; j < this.Endless_List.children[i].children.length; j++) {
                //四个buff满了之后才能更换buff
                // if (this.Endless_List_suo.children[i].children[j].active==false&&(this.Buff[i][j]==0||(this.Buff[i][0]!=0&&this.Buff[i][1]!=0&&this.Buff[i][2]!=0&&this.Buff[i][3]!=0))) {
                if (this.Endless_List_suo.children[i].children[j].active==false){
                    let id=Number(touchTeam.getComponent(cc.Button).clickEvents[0].customEventData)/10000
                    let Rarity=EndlessBuffManager.getInstance().getRarity(id) //自己的强度
                    let Type=EndlessBuffManager.getInstance().getType(id)//自己的类型
                    let Samenot=0

                    let therRarity=0//放在上面的buff的强度
                    let indexj=-1
                    for (let index = 0; index < this.Buff[i].length; index++) {
                        if(this.Buff[i][index]>0){
                            let therType=EndlessBuffManager.getInstance().getType(this.Buff[i][index])
                            if(therType==Type){//有跟我自己一样的类型
                                indexj=index
                                therRarity=EndlessBuffManager.getInstance().getRarity(this.Buff[i][index]) //放在上面的buff的强度
                                Samenot=1
                            }
                        }
                    }
                    // if(Samenot==0){
                        let size = this.Endless_List.children[i].children[j].getContentSize();
                        let poss = this.Endless_List.children[i].children[j].getPosition();
                        let mypos=cc.rect(poss.x-size.width/2,poss.y-size.height/2,size.width,size.height)
                        if(mypos.contains(pos)==true)
                        {   
                            // if(this.Buff[i][0]!=0&&this.Buff[i][1]!=0&&this.Buff[i][2]!=0&&this.Buff[i][3]!=0){//四个位置都满了
                                if(indexj==j){//要放在同一个位置
                                    if(therRarity<Rarity){//放在上面的类型强度比我自己的类型小
                                        Samenot=0
                                    }
                                }
                            // }
                            if(Samenot==0){
                                if(type==0){//移动时
                                    this.Endless_Light.x=poss.x
                                    this.Endless_Light.y=poss.y
                                    this.Endless_Light.active=true
                                    return;
                                }else if(type==1){//放置时
                                    this.EndlessBuff1.active=false
                                    let teamList=HeroManager.getInstance().getTeamList(GameManager.getInstance().cur_game_mode);
                                    if(this.Buff[i][j]>0){
                                        GameManager.getInstance().getHero(teamList[i]).removeEndlessBuff(this.Buff[i][j])
                                    }
                                    this.Buff[i][j]=id
                                    let endlessBuff=new EndlessBuff
                                    let Type=EndlessBuffManager.getInstance().getType(id) 
                                    let Rarity=EndlessBuffManager.getInstance().getRarity(id) 
                                    let Parameter=EndlessBuffManager.getInstance().getParameter(id) 
                                    FollowManager.getInstance().followEvent(Follow_Type.无尽挑战_不同ID的buff装备次数+id);
                                    if(Type==8){
                                        this.Buff[i][j]=0
                                        let hp=(Parameter*WallManager.getInstance().getMainWall().getMaxHp())
                                        // console.log("城墙加血:",hp,WallManager.getInstance().getMainWall().getCurHp(),WallManager.getInstance().getMainWall().getMaxHp(),Parameter)
                                        WallManager.getInstance().getMainWall().changeHpByEndless(hp)
                                        GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(800026),2);
                                    }else{
                                        endlessBuff.type=Type
                                        endlessBuff.id=id
                                        endlessBuff.rarity=Rarity
                                        endlessBuff.value=Parameter
                                        GameManager.getInstance().getHero(teamList[i]).addEndlessBuff(endlessBuff)//添加一个buff
                                    }
                                    touchTeam.parent.parent.active=false
                                    this.Endless_Light.active=false
                                    this.RefreshBuff()
                                    if(this.Endless.children[0].active==false&&this.Endless.children[1].active==false&&this.Endless.children[2].active==false){
                                        //刷新下一波
                                        this.destroySelf()
                                    }
                                    return;
                                }
                            }else{
                                if(type==1){//放置时    每位英雄只能装备一个同类型技能   800033
                                    GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(800033),1.5);
                                }
                            }

                        }
                    }
                    // else{
                    //     let size = this.Endless_List.children[i].children[j].getContentSize();
                    //     let poss = this.Endless_List.children[i].children[j].getPosition();
                    //     let mypos=cc.rect(poss.x-size.width/2,poss.y-size.height/2,size.width,size.height)
                    //     if(mypos.contains(pos)==true)
                    //     {   
                    //         if(type==1){//放置时
                    //             GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(800026),1.5);
                    //         }

                    //     }
                    // }
                // }
            }
        }
        if(type==0){
            this.Endless_Light.active=false
        }else if(type==1){

        }
    }
    onHeroTouchCancel(e:cc.Event.EventTouch) {
        let touchTeam=e.getCurrentTarget();
        let pos=this.node.convertToNodeSpaceAR(e.getLocation());
        // console.log("当手指在目标节点区域外离开屏幕时",pos)
        this.EndlessBuff1.active=false
        this.EndlessBuff1.setPosition(pos)
        touchTeam.getComponent(cc.Sprite).enabled=true
        this.HeroTouch(touchTeam,pos,1)
    }
    RefreshBuff(){//刷新
        // let teamList=HeroManager.getInstance().getTeamList(GameManager.getInstance().cur_game_mode);
        for (let i = 0; i < this.Buff.length; i++) {
            for (let j = 0; j < this.Buff[j].length; j++) {
                if(this.Buff[i][j]>0){
                    let item
                    if(this.Endless_List.children[i].children[j].childrenCount==0){
                        item=cc.instantiate(this.EndlessBuff)
                    }else{
                        item=this.Endless_List.children[i].children[j].children[0]
                    }
                    item.scale=0.7
                    item.active=true
                    item.getComponent(cc.Sprite).spriteFrame=this.copy_ui.getSpriteFrame("EndlessBuff_"+this.Buff[i][j])
                    item.getComponent(cc.Button).clickEvents[0].customEventData=""+this.Buff[i][j]
                    item.parent=this.Endless_List.children[i].children[j]



                    // let id=this.Buff[i][j]
                    // let endlessBuff=new EndlessBuff
                    // let Type=EndlessBuffManager.getInstance().getType(id) 
                    // let Rarity=EndlessBuffManager.getInstance().getRarity(id) 
                    // let Parameter=EndlessBuffManager.getInstance().getParameter(id) 

                    // endlessBuff.type=Type
                    // endlessBuff.id=id
                    // endlessBuff.rarity=Rarity
                    // endlessBuff.value=Parameter
                    // GameManager.getInstance().getHero(teamList[i]).addEndlessBuff(endlessBuff)//添加一个buff
                }
            }
        }
        this.Unlock()
    }
    Refresh(){//刷新
        // console.log("刷新",EndlessBuffManager.getInstance().getThreeWeight())
        let id =EndlessBuffManager.getInstance().getThreeWeight()
        FollowManager.getInstance().followEvent(Follow_Type.无尽挑战_不同ID的buff的获取次数+id[0]);
        FollowManager.getInstance().followEvent(Follow_Type.无尽挑战_不同ID的buff的获取次数+id[1]);
        FollowManager.getInstance().followEvent(Follow_Type.无尽挑战_不同ID的buff的获取次数+id[2]);
        if(this.RaffleNumber==0){
            this.RaffleNumber=3
            let or=EndlessBuffManager.getInstance().getWeightOrange()//每五次  得到一个橙色及以上的buff
            let Isthereany=0
            let sequence=[]
            for (let index = 0; index < this.Endless.children.length; index++) {
                if(this.Endless.children[index].active==true){
                    let Rarity=EndlessBuffManager.getInstance().getRarity(id[index]) 
                    if(Rarity>=4){
                        FollowManager.getInstance().followEvent(Follow_Type.无尽挑战_刷新buff时触发保底的次数);
                        Isthereany=1
                    }else{
                        sequence.push(index)
                    }
                }
            }
            if(Isthereany==0){
                let rom=MyTool.random(0,(sequence.length-1))
                id[sequence[rom]]=or
            }
        }

        if(BuffDisplay.surplusnumber>-1){
            this.surplustxt.active=true
            this.surplustxt.getComponent(TextLanguage).setTextId(800030)//本轮还剩多少次选择buff的机会
            if(BuffDisplay.surplusnumber>0){
                this.Refreshsurplusnumber(BuffDisplay.surplusnumber)//刷新BuffDisplay.surplusnumber*3个buff出来
                BuffDisplay.surplusnumber=0
            }
            // BuffDisplay.surplusnumber=0
            this.surplustxt.getComponent(TextLanguage).setReplaceValue('~',BuffDisplay.surplusnumber+ '');
        }
        // console.log("++++++++",or)
        this.RichTextRefresh()

        for (let index = 0; index < this.Endless.children.length; index++) {
            if(this.Endless.children[index].active==true){
                let item
                if(this.Endless.children[index].getChildByName("item").childrenCount==0){
                    item=cc.instantiate(this.EndlessBuff)
                    item.getComponent(cc.Button).enabled=false
                    item.on(cc.Node.EventType.TOUCH_START, this.onHeroTouchStart, this);
                    item.on(cc.Node.EventType.TOUCH_MOVE, this.onHeroTouchMove, this);
                    item.on(cc.Node.EventType.TOUCH_END, this.onHeroTouchEnd, this);
                    item.on(cc.Node.EventType.TOUCH_CANCEL, this.onHeroTouchCancel, this);
                }else{
                    item=this.Endless.children[index].getChildByName("item").children[0]
                }
                let Rarity=EndlessBuffManager.getInstance().getRarity(id[index]) 
                let Type=EndlessBuffManager.getInstance().getType(id[index]) 
                let Parameter=EndlessBuffManager.getInstance().getParameter(id[index]) 
                item.getComponent(cc.Sprite).spriteFrame=this.copy_ui.getSpriteFrame("EndlessBuff_"+id[index])
                item.getComponent(cc.Button).clickEvents[0].customEventData=""+(id[index]*10000)
                item.active=true
                //灰  绿   蓝   紫    黄    红
                let color=[new cc.Color(99, 99, 99),new cc.Color(113, 100, 59),new cc.Color(28, 98, 176),new cc.Color(150, 30, 168),new cc.Color(193, 114, 0),new cc.Color(188, 36, 31)]
                let txt=this.Endless.children[index].getChildByName("text")
                txt.color=color[Rarity]

                txt.getComponent(TextLanguage).setTextId(801000+Type)

                if(Type==1||Type==2||Type==4||Type==5||Type==6||Type==7||Type==8||Type==9||Type==10||Type==11){
                    let sParameter=Parameter*100
                    txt.getComponent(TextLanguage).setReplaceValue('~', MyTool.numberFormat(sParameter,2)+ '%');
                }else{
                    txt.getComponent(TextLanguage).setReplaceValue('~', Parameter+ '');
                }
                // txt.getComponent(TextLanguage).setReplaceValue('~', Parameter+ '');
                item.parent=this.Endless.children[index].getChildByName("item")
            }
        }
    }
    Refreshsurplusnumber(surplusnumber){//刷新BuffDisplay.surplusnumber*3个buff出来
        let mynumber=surplusnumber
        let MonsterDetailsarr=[]
        for (let index = 0; index < mynumber; index++) {
            let a=EndlessBuffManager.getInstance().getThreeWeight()
            MonsterDetailsarr.splice.apply(MonsterDetailsarr,[MonsterDetailsarr.length,0].concat(a));
        }
        // console.log("++++++++++",MonsterDetailsarr)
        let teamList=HeroManager.getInstance().getTeamList(GameManager.getInstance().cur_game_mode);
        let mybuffindex=0

        for (let i = 0; i < teamList.length; i++) {//英雄的横排    ——  5个英雄
                let heroType=teamList[i];
                if(heroType>0){//这个横排有英雄
                    for (let j = 0; j < this.Buff[0].length; j++) {//英雄的竖排    |   四个空格
                    if(this.Buff[i][j]==0&&mybuffindex<(MonsterDetailsarr.length)){//现在放到第几个buff下了
                        let sfy=0//是否有类型一样的
                        let id=MonsterDetailsarr[mybuffindex]//id
                        let Type=EndlessBuffManager.getInstance().getType(id) //这个id的buff类型

                        let Rarity=EndlessBuffManager.getInstance().getRarity(id) 
                        if(Type==8){
                            mybuffindex++
                            if(mybuffindex<(MonsterDetailsarr.length)){
                                id=MonsterDetailsarr[mybuffindex]//id
                                Type=EndlessBuffManager.getInstance().getType(id) //这个id的buff类型
                            }else{
                                break
                            }
                        }
                        let sf=0//有几个英雄装上了这个类型的buff
                        let yx=0//有几个英雄
                        for (let index = 0; index < teamList.length; index++) {//所有的英雄都装备了这个类型的buff
                            let heroType=teamList[index];
                            if(heroType>0){//这个横排有英雄
                                let sfs=0//这个英雄装上了这个类型的buff
                                for (let myjjindexs = 0; myjjindexs < this.Buff[index].length; myjjindexs++) {//这个英雄有没有装备一样类型的buff
                                    if(this.Buff[index][myjjindexs]>0){//装备了buff
                                        if(Type==EndlessBuffManager.getInstance().getType(this.Buff[index][myjjindexs])){//类型一样，标记一下
                                            sfs++
                                        }
                                    }
                                }
                                yx++
                                if(sfs>0){
                                    sf++
                                }
                            }
                        }
                        // console.log("__________有多个英雄：",yx,"有多少个英雄装备了这个buff",sf)
                        if(sf==yx){
                            mybuffindex++
                            for (let index = 0; index < teamList.length; index++) {//所有的英雄都装备了这个类型的buff
                                let heroType=teamList[index];
                                if(heroType>0){//这个横排有英雄
                                    for (let myjjindexs = 0; myjjindexs < this.Buff[index].length; myjjindexs++) {//这个英雄有没有装备一样类型的buff
                                        if(this.Buff[index][myjjindexs]>0){//装备了buff
                                            if(Type==EndlessBuffManager.getInstance().getType(this.Buff[index][myjjindexs])){//类型一样，标记一下
                                                if(Rarity>EndlessBuffManager.getInstance().getRarity(this.Buff[index][myjjindexs])){
                                                    GameManager.getInstance().getHero(teamList[i]).removeEndlessBuff(this.Buff[i][j])
                                                    this.Buff[i][j]=MonsterDetailsarr[mybuffindex]
                                                    let endlessBuff=new EndlessBuff
                                                    let Parameter=EndlessBuffManager.getInstance().getParameter(id) 
                                                    FollowManager.getInstance().followEvent(Follow_Type.无尽挑战_不同ID的buff装备次数+id);
                                                    endlessBuff.type=Type
                                                    endlessBuff.id=id
                                                    endlessBuff.rarity=Rarity
                                                    endlessBuff.value=Parameter
                                                    GameManager.getInstance().getHero(teamList[i]).addEndlessBuff(endlessBuff)//添加一个buff
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            
                        }else{
                            for (let myjjindex = 0; myjjindex < this.Buff[i].length; myjjindex++) {//这个英雄有没有装备一样类型的buff
                                if(this.Buff[i][myjjindex]>0){//装备了buff
                                    if(Type==EndlessBuffManager.getInstance().getType(this.Buff[i][myjjindex])){//类型一样，标记一下
                                        sfy=1
                                    }
                                }
                            }
                            if(sfy==0){//这一排没有相同类型的buff   才可以装上去
                                this.Buff[i][j]=MonsterDetailsarr[mybuffindex]
                                // console.log("放置一个：",i,j)
                                let endlessBuff=new EndlessBuff
                                // let Rarity=EndlessBuffManager.getInstance().getRarity(id) 
                                let Parameter=EndlessBuffManager.getInstance().getParameter(id) 
                                FollowManager.getInstance().followEvent(Follow_Type.无尽挑战_不同ID的buff装备次数+id);
                                endlessBuff.type=Type
                                endlessBuff.id=id
                                endlessBuff.rarity=Rarity
                                endlessBuff.value=Parameter
                                // console.log("buff:",endlessBuff,teamList[i])
                                GameManager.getInstance().getHero(teamList[i]).addEndlessBuff(endlessBuff)//添加一个buff
                                mybuffindex++
                            }
                        }
                    }

                }
                
            }
        }
        // console.log("+++++++++++放下几个了：",mybuffindex)
        if(mybuffindex<(MonsterDetailsarr.length)){
            for (let i = 0; i < teamList.length; i++) {//英雄的横排    ——  5个英雄
                let heroType=teamList[i];
                if(heroType>0){//这个横排有英雄
                    for (let j = 0; j < this.Buff[0].length; j++) {//英雄的竖排    |   四个空格
                    if(this.Buff[i][j]==0&&mybuffindex<(MonsterDetailsarr.length)){//现在放到第几个buff下了
                        let sfy=0//是否有类型一样的
                        let id=MonsterDetailsarr[mybuffindex]//id
                        let Type=EndlessBuffManager.getInstance().getType(id) //这个id的buff类型

                        let Rarity=EndlessBuffManager.getInstance().getRarity(id) 
                        if(Type==8){
                            mybuffindex++
                            if(mybuffindex<(MonsterDetailsarr.length)){
                                id=MonsterDetailsarr[mybuffindex]//id
                                Type=EndlessBuffManager.getInstance().getType(id) //这个id的buff类型
                            }else{
                                break
                            }
                        }
                        let sf=0//有几个英雄装上了这个类型的buff
                        let yx=0//有几个英雄
                        for (let index = 0; index < teamList.length; index++) {//所有的英雄都装备了这个类型的buff
                            let heroType=teamList[index];
                            if(heroType>0){//这个横排有英雄
                                let sfs=0//这个英雄装上了这个类型的buff
                                for (let myjjindexs = 0; myjjindexs < this.Buff[index].length; myjjindexs++) {//这个英雄有没有装备一样类型的buff
                                    if(this.Buff[index][myjjindexs]>0){//装备了buff
                                        if(Type==EndlessBuffManager.getInstance().getType(this.Buff[index][myjjindexs])){//类型一样，标记一下
                                            sfs++
                                        }
                                    }
                                }
                                yx++
                                if(sfs>0){
                                    sf++
                                }
                            }
                        }
                        // console.log("__________有多个英雄：",yx,"有多少个英雄装备了这个buff",sf)
                        if(sf==yx){
                            mybuffindex++
                            for (let index = 0; index < teamList.length; index++) {//所有的英雄都装备了这个类型的buff
                                let heroType=teamList[index];
                                if(heroType>0){//这个横排有英雄
                                    for (let myjjindexs = 0; myjjindexs < this.Buff[index].length; myjjindexs++) {//这个英雄有没有装备一样类型的buff
                                        if(this.Buff[index][myjjindexs]>0){//装备了buff
                                            if(Type==EndlessBuffManager.getInstance().getType(this.Buff[index][myjjindexs])){//类型一样，标记一下
                                                if(Rarity>EndlessBuffManager.getInstance().getRarity(this.Buff[index][myjjindexs])){
                                                    GameManager.getInstance().getHero(teamList[i]).removeEndlessBuff(this.Buff[i][j])
                                                    this.Buff[i][j]=MonsterDetailsarr[mybuffindex]
                                                    let endlessBuff=new EndlessBuff
                                                    let Parameter=EndlessBuffManager.getInstance().getParameter(id) 
                                                    FollowManager.getInstance().followEvent(Follow_Type.无尽挑战_不同ID的buff装备次数+id);
                                                    endlessBuff.type=Type
                                                    endlessBuff.id=id
                                                    endlessBuff.rarity=Rarity
                                                    endlessBuff.value=Parameter
                                                    GameManager.getInstance().getHero(teamList[i]).addEndlessBuff(endlessBuff)//添加一个buff
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            
                        }else{
                            for (let myjjindex = 0; myjjindex < this.Buff[i].length; myjjindex++) {//这个英雄有没有装备一样类型的buff
                                if(this.Buff[i][myjjindex]>0){//装备了buff
                                    if(Type==EndlessBuffManager.getInstance().getType(this.Buff[i][myjjindex])){//类型一样，标记一下
                                        sfy=1
                                    }
                                }
                            }
                            if(sfy==0){//这一排没有相同类型的buff   才可以装上去
                                this.Buff[i][j]=MonsterDetailsarr[mybuffindex]
                                // console.log("放置一个：",i,j)
                                let endlessBuff=new EndlessBuff
                                // let Rarity=EndlessBuffManager.getInstance().getRarity(id) 
                                let Parameter=EndlessBuffManager.getInstance().getParameter(id) 
                                FollowManager.getInstance().followEvent(Follow_Type.无尽挑战_不同ID的buff装备次数+id);
                                endlessBuff.type=Type
                                endlessBuff.id=id
                                endlessBuff.rarity=Rarity
                                endlessBuff.value=Parameter
                                // console.log("buff:",endlessBuff,teamList[i])
                                GameManager.getInstance().getHero(teamList[i]).addEndlessBuff(endlessBuff)//添加一个buff
                                mybuffindex++
                            }
                        }
                    }

                }
                
            }
            }
        }

        for (let i = 0; i < this.Buff.length; i++) {
            for (let j = 0; j < this.Buff[j].length; j++) {
                if(this.Buff[i][j]>0){
                    let texiaonode=cc.instantiate(this.texiao)
                    texiaonode.x=this.Endless_List.children[i].children[j].x
                    texiaonode.y=this.Endless_List.children[i].children[j].y
                    texiaonode.active=true
                    texiaonode.parent=this.mttexiao
                }
            }
        }
        this.scheduleOnce(function(){
            GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(800034),3);//800034已填充buff
            this.RefreshBuff()
        },0.2)


    }
    clickBtnBuy(){//钻石购买
        let gem=PropManager.getInstance().getPropNum(PropId.Gem);
        if(gem>=200){
            //可以购买
            FollowManager.getInstance().followEvent(Follow_Type.无尽挑战_使用钻石刷新buff的次数);
            PropManager.getInstance().changePropNum(PropId.Gem,-200);
            this.RaffleNumber--
            this.Refresh()
        }else{
            //钱不够
            UIManager.getInstance().showUiDialog(UIPath.CoinPop,UILayerLevel.Three,{onCompleted:(uiNode)=> {
                uiNode.getComponent(CoinPop).initUi(PropId.Gem)
            },});
        }
    }
    clickBtnBuyAd(){//广告购买
        ApkManager.getInstance().showVideo(((isTrue)=>{
            if(isTrue){
                this.RaffleNumber--
                FollowManager.getInstance().followEvent(Follow_Type.无尽挑战_使用广告刷新buff的次数);
                this.Refresh()
            }
        }),VIDEO_TYPE.Equip)
    }
    clickBtnClose()//关闭
    {
        if(this.type==1){
            this.Tipspop.active=true
            return
        }
        this.destroySelf()
    }
    clickBtnTipspop(){//关闭提示弹窗
        this.Tipspop.active=false
    }
    destroySelf()
    {
        if(this.type==1){
            //刷新下一回合
            // console.log("刷新下一回合",BuffDisplay.surplusnumber)
            if(BuffDisplay.surplusnumber>0){
                BuffDisplay.surplusnumber--
                for (let index = 0; index < this.Endless.children.length; index++) {
                    this.Endless.children[index].active=true
                }
                this.clickBtnTipspop()
                this.Refresh()
                this.RefreshBuff()
                return
            }else{
                BuffDisplay.surplusnumber=-1
                // if(BuffDisplay.surplusnumber!=0){
                GameManager.getInstance().startNextLevel()
                // }
            }
            
        }
        this.clickBtnTipspop()
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        this.onClose();
        GameManager.getInstance().cur_game_state=GameState.Game_Playing;
    }
    clickBtnCloseSkillDescription(){
        this.SkillDescription.getChildByName("Common_TextBG").active=false
        this.SkillDescription.active=false
    }
}
