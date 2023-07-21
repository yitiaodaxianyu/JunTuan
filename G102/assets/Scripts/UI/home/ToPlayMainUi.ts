import { BossChallengeManager } from "../../Activity/BossChallenge";
import { EndlessLevelsManager } from "../../Activity/EndlessLevels";
import ApkManager from "../../Ads/ApkManager";
import { FightingInfo, GameMode, GameScene } from "../../Constants";
import endlesschallenges from "../../copy/endlesschallenges/endlesschallenges";
import BuffStateManager from "../../Game/BuffStateManager";
import GameData from "../../GameData";
import GameManager from "../../GameManager";
import MapManager from "../../GuaJi/MapManager";
import { HeroManager } from "../../Hero/Data/HeroManager";
import Hero from "../../Hero/Game/Hero";
import { Hero_Type } from "../../Hero/Game/HeroConfig";
import HeroItem from "../../Hero/Ui/HeroItem";
import { LevelManager } from "../../Level/LevelManager";
import { MissionLevelManager } from "../../Level/MissionLevel";
import { TutorialLevelManager } from "../../Level/TutorialLevel";
import { MazeManager } from "../../Maze/MazeManager";
import { MonsterConfigureManager } from "../../Monster/Data/MonsterConfigure";
import { MonsterFaceName, MonsterActionName } from "../../Monster/MonsterData";
import { Follow_Type } from "../../multiLanguage/FollowConstants";
import FollowManager from "../../multiLanguage/FollowManager";
import { LanguageIndex } from "../../multiLanguage/LanguageConstants";
import LanguageManager from "../../multiLanguage/LanguageManager";
import TextLanguage from "../../multiLanguage/TextLanguage";
import { PetManager } from "../../Pet/PetManager";
import { PropId } from "../../Prop/PropConfig";
import { PropManager } from "../../Prop/PropManager";
import { SoundIndex } from "../../Sound/AudioConstants";
import { StorageKey } from "../../Storage/StorageConfig";
import { TheStorageManager } from "../../Storage/StorageManager";
import { TaskItem } from "../../Task/TaskEnum";
import TaskManager from "../../Task/TaskManager";
import MyTool from "../../Tools/MyTool";
import { TowerLevelManager } from "../../Tower/TowerLevel";
import TowerManager from "../../Tower/TowerManager";
import Times from "../../Turntable/Times";
import TutorailsManager from "../../Tutorials/TutorailsManager";
import { UserInfo } from "../../UserInfo/UserInfo";
import UIComponent from "../UIComponent";
import { UIPath, UILayerLevel } from "../UIConfig";
import { UiAction } from "../UiInterface";
import { UIManager } from "../UIManager";
import MainUi from "./MainUi";
import MonsterDetails from "./MonsterDetails";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ToPlayMainUi extends UIComponent {
    @property(cc.Prefab)
    hero_item:cc.Prefab = null;//英雄头像的预制体

    @property(cc.Node)
    Monster:cc.Node = null;//怪物详情
    @property(cc.Node)
    Chariot:cc.Node = null;//战车详情
    @property(cc.Node)
    pos:cc.Node = null;//怪物的位置
    @property(cc.Node)
    heroShadow:cc.Node = null;//怪物阴影的位置
    @property(cc.Node)
    leveltxt:cc.Node = null;

    guaiwuarr=[]//怪物的数组
    MonsterDetailsarr=[]//怪物详情列表   按boss   精英   普通 排序


    @property(cc.Node)
    komwei:cc.Node = null;//空位   英雄上阵的位置是否能解锁

    @property(cc.Node)
    content:cc.Node = null;//父节点

    @property(sp.SkeletonData)
    sp:sp.SkeletonData[] = [];//空位   英雄上阵的位置是否能解锁

    hero_team_rect: cc.Rect[] = [];
    ScrollViewrect: cc.Rect = null;
    @property(cc.Node)
    ScrollVie:cc.Node = null;//英雄滑动块
    @property(cc.Node)
    ScrollViews:cc.Node = null;//英雄滑动块
    hero_team_pos: cc.Vec2[] = [];

    @property(cc.Node)
    Mouse:cc.Node = null;//鼠标上的英雄
    @property(cc.Node)
    Mouseitem:cc.Node = null;//鼠标上的英雄item
    clickheroposition:number=-1//点击的位置是第几个    默认没有被点击到的位置
    putdownheroposition:number=-1//放下的位置是第几个
    @property(cc.Node)
    Common_Btn_0:cc.Node = null;//开始按钮
    @property(cc.Node)
    jdt:cc.Node = null;//战车血量进度条
    greybuttonjudgment: number=0;


    @property(cc.SpriteFrame)
    bj:cc.SpriteFrame[] = [];//背景
    @property(cc.SpriteFrame)
    wall:cc.SpriteFrame[] = [];//战车

    @property(cc.Node)
    mybj:cc.Node = null;//背景
    @property(cc.Node)
    mywall:cc.Node = null;//战车
    @property(cc.SpriteFrame)
    bg_Endless:cc.SpriteFrame = null;//无尽挑战背景

    @property(cc.Node)
    Prepare_Btn_Monster:cc.Node = null;//怪物详情按钮
    

    @property(cc.Node)
    Common_Btn_Back:cc.Node = null;//返回按钮
    Mazeid:number = 0;//冰河关卡id

    @property(cc.SpriteFrame)
    bg_Maze:cc.SpriteFrame = null;//冰河背景
    @property(cc.SpriteFrame)
    bg_wall:cc.SpriteFrame = null;//冰河战车
    start(){
        for (let index = 0; index < this.komwei.children.length; index++) {
            this.komwei.children[index].on(cc.Node.EventType.TOUCH_START, this.onHeroTouchStart, this);
            this.komwei.children[index].on(cc.Node.EventType.TOUCH_MOVE, this.onHeroTouchMove, this);
            this.komwei.children[index].on(cc.Node.EventType.TOUCH_END, this.onHeroTouchEnd, this);
            this.komwei.children[index].on(cc.Node.EventType.TOUCH_CANCEL, this.onHeroTouchCancel, this);
            let size = this.komwei.children[index].getContentSize();
            let pos = this.komwei.children[index].getPosition();
            this.hero_team_rect.push(cc.rect(pos.x-size.width/2,pos.y-size.height/2,size.width,size.height));
            this.hero_team_pos.push(pos);
        }
        let poss = this.ScrollVie.getPosition();
        let sizes = this.ScrollVie.getContentSize();
        this.ScrollViewrect=cc.rect(poss.x-sizes.width/2,poss.y-sizes.height/2,sizes.width,sizes.height)
        // HeroManager.getInstance().addHero(3)
    }
    onHeroTouchStart(e:cc.Event.EventTouch) {
        let touchTeam=e.getCurrentTarget();
        let pos=this.komwei.convertToNodeSpaceAR(e.getLocation());
        let weizhi=Number(touchTeam.name)//点到第几个位置
        this.clickheroposition=weizhi
        let teamList=HeroManager.getInstance().getTeamList(GameManager.getInstance().cur_game_mode);
        //如果这个位置有英雄，就将这个位置的英雄隐藏   开启鼠标的英雄  将鼠标的英雄皮肤换成这个位置的英雄
        // @ts-ignore
        if (teamList[weizhi]!=Hero_Type.NULL&&teamList[weizhi]!=-1) {
            this.komwei.children[this.clickheroposition].getChildByName("hero").active=false//英雄隐藏
            this.komwei.children[this.clickheroposition].getChildByName("Prepare_Void").active=true//黑影开启
            this.komwei.children[this.clickheroposition].getChildByName("winText").active=true//文字开启
            this.komwei.children[this.clickheroposition].getChildByName("heroShadow").active=false//阴影
            this.Mouse.setPosition(pos)
            this.Mouse.getChildByName("hero").getComponent(sp.Skeleton).skeletonData=this.sp[teamList[weizhi]-1]
            this.Mouse.getChildByName("hero").getComponent(sp.Skeleton).animation="Idle"
            this.Mouse.active=true
        }
    }

    onHeroTouchMove(e:cc.Event.EventTouch) {
        if(this.clickheroposition!=-1){
            let touchTeam=e.getCurrentTarget();
            let pos=this.komwei.convertToNodeSpaceAR(e.getLocation());
            this.Mouse.setPosition(pos)
        }
    }
    Selfposition(number){
        let teamList=HeroManager.getInstance().getTeamList(GameManager.getInstance().cur_game_mode);
        if(this.Mouse.active==true){
            this.Mouse.active=false
        }
        if(this.Mouseitem.active==true){
            this.Mouseitem.active=false
        }
        // @ts-ignore
        if(teamList[number]!=Hero_Type.NULL&&teamList[number]!=-1){
            this.komwei.children[number].getChildByName("hero").active=true//英雄开启
            this.komwei.children[number].getChildByName("Prepare_Void").active=false//黑影隐藏
            this.komwei.children[number].getChildByName("winText").active=false//文字隐藏
            this.komwei.children[number].getChildByName("heroShadow").active=true//阴影
            this.komwei.children[number].getChildByName("hero").getComponent(sp.Skeleton).skeletonData=this.sp[teamList[number]-1]
            this.komwei.children[number].getChildByName("hero").getComponent(sp.Skeleton).animation="Idle"
        }else{
            this.komwei.children[number].getChildByName("hero").active=false//英雄隐藏
            this.komwei.children[number].getChildByName("Prepare_Void").active=true//黑影开启
            this.komwei.children[number].getChildByName("winText").active=true//文字开启
            this.komwei.children[number].getChildByName("heroShadow").active=false//阴影
        }
    }
    onHeroTouchEnd(e:cc.Event.EventTouch) {
        if(this.clickheroposition!=-1){
            this.Selfposition(this.clickheroposition)
        }
    }
    onHeroTouchCancel(e:cc.Event.EventTouch) {
        let touchTeam=e.getCurrentTarget();
        let ScrollViewpos=this.ScrollVie.parent.convertToNodeSpaceAR(e.getLocation());
        let pos=this.komwei.convertToNodeSpaceAR(e.getLocation());
        let teamList=HeroManager.getInstance().getTeamList(GameManager.getInstance().cur_game_mode);
        for(let i=0; i<this.hero_team_rect.length; i++)
        {
            if(this.hero_team_rect[i].contains(pos)==true)
            {    
                this.putdownheroposition=i
                this.Mouse.active=false
                let teamListputdown=teamList[this.putdownheroposition]
                let teamListclickhero=teamList[this.clickheroposition]
                teamList[this.putdownheroposition]=teamListclickhero
                teamList[this.clickheroposition]=teamListputdown
                HeroManager.getInstance().saveTeamList(GameManager.getInstance().cur_game_mode,teamList)
                this.Selfposition(this.putdownheroposition)
                this.Selfposition(this.clickheroposition)
                return;
            }
        }
        if(this.ScrollViewrect.contains(ScrollViewpos)==true){
            this.Mouse.active=false
            teamList[this.clickheroposition]=-1
            HeroManager.getInstance().saveTeamList(GameManager.getInstance().cur_game_mode,teamList)
            //刷新英雄itme状态
            this.Refreshheroitmestatus()
        }else{
            this.Selfposition(this.clickheroposition)
        }
    }
    init(uiAc: UiAction) {
        super.init(uiAc);
        //取本模式  本关卡  的怪物数量与类型   boss   精英   普通
        let level=MapManager.Currentlevel//LevelManager.getInstance().start_level;
        let fightingInfo:FightingInfo=null;
        this.Common_Btn_Back.active=true
        switch(GameManager.getInstance().cur_game_mode){
            case GameMode.Main:{
                fightingInfo=MissionLevelManager.getInstance().getFightingInfo(level);

            }break;
            case GameMode.Endless:{
                let wavenumber=TheStorageManager.getInstance().getNumber(StorageKey.UnlimitedChallengeDamage,0);//波数
                let Round =EndlessLevelsManager.getInstance().getRound(wavenumber)//回合数
                fightingInfo=EndlessLevelsManager.getInstance().getFightingInfo(Round);
            }break;
            case GameMode.Boss_Challenge:{
                fightingInfo=BossChallengeManager.getInstance().getFightingInfo(BossChallengeManager.getInstance().cur_challenge_mode);
            }break;
            case GameMode.Maze:{
                fightingInfo=MazeManager.getInstance().getFightingInfo(this.Mazeid);
            }break;
            case GameMode.Tower:{
                fightingInfo=TowerLevelManager.getInstance().getFightingInfo(TowerManager.getTowerLevel());
            }break;
        }
        this.Prepare_Btn_Monster.active=true
        let list=fightingInfo.getOnlyMonsterDataList();
        this.leveltxt.getComponent(cc.Label).string=""+fightingInfo.title_name
        if(GameManager.getInstance().cur_game_mode==GameMode.Main){
            let chapter=(MissionLevelManager.getInstance().getChapter(level))-1
            this.mybj.getComponent(cc.Sprite).spriteFrame=this.bj[chapter]
            this.mywall.getComponent(cc.Sprite).spriteFrame=this.wall[chapter]
        }
        if(GameManager.getInstance().cur_game_mode==GameMode.Endless){
            this.mybj.getComponent(cc.Sprite).spriteFrame=this.bg_Endless
            this.mywall.getComponent(cc.Sprite).spriteFrame=this.wall[4]
            this.Prepare_Btn_Monster.active=false
            list=[]
        }
        if(GameManager.getInstance().cur_game_mode==GameMode.Boss_Challenge){

            let RotationOrders = UserInfo.getInstance().RotationOrder//轮换顺序
            let Stage = 1//阶段
            let ChallengeID = RotationOrders * 1000 + Stage//挑战ID
            let RotationOrder = BossChallengeManager.getInstance().getChapterScene(ChallengeID)//(UserInfo.getInstance().RotationOrder)-1//轮换顺序
            this.mybj.getComponent(cc.Sprite).spriteFrame=this.bj[RotationOrder]
            this.mywall.getComponent(cc.Sprite).spriteFrame=this.wall[RotationOrder]    
        }
        if(GameManager.getInstance().cur_game_mode==GameMode.Maze){
            this.mybj.getComponent(cc.Sprite).spriteFrame=this.bg_Maze
            this.mywall.getComponent(cc.Sprite).spriteFrame=this.bg_wall
            this.Common_Btn_Back.active=false
        }

        //取出boss
        let bossarr=[]
        let jyarr=[]
        let put=[]
        for (let bossindex = 0; bossindex < list.length; bossindex++) {
            if(MonsterConfigureManager.getInstance().getStrengthType(list[bossindex].id)==3){
                bossarr.push(list[bossindex])
            }
            if(MonsterConfigureManager.getInstance().getStrengthType(list[bossindex].id)==2){
                jyarr.push(list[bossindex])
            }
            if(MonsterConfigureManager.getInstance().getStrengthType(list[bossindex].id)==1){
                put.push(list[bossindex])
            }
        }
        //插入
        this.MonsterDetailsarr.length=0
        this.MonsterDetailsarr.splice.apply(this.MonsterDetailsarr,[this.MonsterDetailsarr.length,0].concat(bossarr));
        this.MonsterDetailsarr.splice.apply(this.MonsterDetailsarr,[this.MonsterDetailsarr.length,0].concat(jyarr));
        this.MonsterDetailsarr.splice.apply(this.MonsterDetailsarr,[this.MonsterDetailsarr.length,0].concat(put));
        //怪物刷新
        for (let index = 0; index < this.pos.children.length; index++) {
            let type=0
            let id=0
            // console.log("*****",bossarr.length,jyarr.length,put.length)
            if(index<bossarr.length){
                id=bossarr[index].id
                type=MonsterConfigureManager.getInstance().getMonsterClass(id);

            }
            else if(index<(bossarr.length+jyarr.length)){

                id=jyarr[(index-(bossarr.length))].id
                type=MonsterConfigureManager.getInstance().getMonsterClass(id);
            }
            else if(index<(bossarr.length+jyarr.length+put.length)){
                id=put[(index-bossarr.length-jyarr.length)].id
                type=MonsterConfigureManager.getInstance().getMonsterClass(id);
            }
            this.heroShadow.children[index].active=false
            if(type>0){
                let path = "monster/ui/Monster_" + type;
                let node:cc.Node = null;

                cc.resources.load(path,cc.Prefab,(error: Error, assets:cc.Prefab)=>{  
                    if(error){
                        cc.log(error);
                        return;
                    }
                    node = cc.instantiate(assets);
                    node.setPosition(0,0,0)
                    node.scale = MonsterConfigureManager.getInstance().getScale(id);
                    // console.log("id:",id)
                    let StrengthType= MonsterConfigureManager.getInstance().getStrengthType(id)
                    node.parent=this.pos.children[index]



                    this.heroShadow.children[index].active=true
                    
                    // console.log("_______",node,this.pos.children[index])
                    // if()
                    // console.log("________",)
                    // if(index<bossarr.length){
                    // let name=String(node.getComponent(sp.Skeleton).defaultSkin)
                    // console.log("+++++++++++",type,StrengthType)
                    // if(name.substring(0,5)==MonsterFaceName.Front){
                    if(StrengthType==3){
                        this.heroShadow.children[index].setScale(1.3,1.3)
                        node.scale=MonsterConfigureManager.getInstance().getScale(id)*0.5;
                        // node.getComponent(sp.Skeleton).setSkin(MonsterFaceName.Front + MonsterConfigureManager.getInstance().getSkin(id));
                        node.getComponent(sp.Skeleton).setAnimation(0,MonsterActionName.Idle,true);//node.getComponent(sp.Skeleton).setAnimation(0,MonsterFaceName.Front + "_" + MonsterActionName.Idle,true);
                    }
                    if(StrengthType==2){
                        this.heroShadow.children[index].setScale(0.7,0.7)
                        node.scale=MonsterConfigureManager.getInstance().getScale(id)*0.6;
                        node.getComponent(sp.Skeleton).setSkin(MonsterFaceName.SideR + MonsterConfigureManager.getInstance().getSkin(id));
                        node.getComponent(sp.Skeleton).setAnimation(0,MonsterFaceName.SideR+"_"+MonsterActionName.Idle,true);
                    }
                    if(StrengthType==1){
                        this.heroShadow.children[index].setScale(0.4,0.4 )
                        node.scale=MonsterConfigureManager.getInstance().getScale(id)*0.8;
                        node.getComponent(sp.Skeleton).setSkin(MonsterFaceName.SideR + MonsterConfigureManager.getInstance().getSkin(id));
                        node.getComponent(sp.Skeleton).setAnimation(0,MonsterFaceName.SideR+"_"+MonsterActionName.Idle,true);
                    }

                    // let scale=node.scaleX
                    // let rom=MyTool.random(0,1)
                    // if(rom==0){
                    //     scale=scale*-1
                    // }
                    // node.scaleX=scale
                    // }

                    // }
                    
                });
            }

        }
        //刷新英雄itme状态
        this.Refreshheroitmestatus()
        // HeroManager.getInstance().saveTeamList(GameManager.getInstance().cur_game_mode,teamList);//将更改之后的阵型保持到本地
        let canvas = cc.find("Canvas")
        this.node.getComponent(cc.Widget).target=canvas
        this.Monster.active=false
        this.Chariot.active=false
    }
    //刷新英雄itme状态
    Refreshheroitmestatus(){
        //已解锁的英雄
        let HeroList=HeroManager.getInstance().getHeroList()//数量   英雄id类型 英雄等级 英雄品质  英雄星星阶段
        let heroBasicdataarr=[]//最高战力数组
        let HeroListarr=HeroList//已解锁的英雄
        //生成英雄itme
        for (let heroindex = this.guaiwuarr.length; heroindex < HeroList.length; heroindex++) {
            let hero = cc.instantiate(this.hero_item);
            hero.name=""+heroindex
            hero.setScale(0.75,0.75)
            hero.parent=this.content
            this.guaiwuarr.push(hero)
            // hero.on(cc.Node.EventType.TOUCH_START, this.onHeroItemTouchStart, this);
            // hero.on(cc.Node.EventType.TOUCH_MOVE, this.onHeroItemTouchMove, this);
            hero.on(cc.Node.EventType.TOUCH_END, this.onHeroItemTouchEnd, this);
            // hero.on(cc.Node.EventType.TOUCH_CANCEL, this.onHeroItemTouchCancel, this);
        }
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
        let teamList=HeroManager.getInstance().getTeamList(GameManager.getInstance().cur_game_mode);

        // console.log("++++++",teamList)
        this.greybuttonjudgment=0//灰色按钮判断 如果没有一个英雄上阵  不可开启游戏

        let  Gotobattlenumber=0//上阵了几个英雄
        for(let i=0; i<teamList.length; i++) 
        {
            let heroType=teamList[i];
            if(heroType>0)
            {
                Gotobattlenumber++

                this.greybuttonjudgment=1
                // console.log("++++++",heroType)
                this.komwei.children[i].getChildByName("Prepare_Void").active=false
                this.komwei.children[i].getChildByName("winText").active=false
                this.komwei.children[i].getChildByName("heroShadow").active=true//阴影
                this.komwei.children[i].getChildByName("hero").active=true
                this.komwei.children[i].getChildByName("hero").getComponent(sp.Skeleton).skeletonData=this.sp[(heroType-1)]
                this.komwei.children[i].getChildByName("hero").getComponent(sp.Skeleton).animation="Idle"
                // this.loadHero(heroType,i)
            }
            else{
                this.komwei.children[i].getChildByName("winText").active=true
                this.komwei.children[i].getChildByName("heroShadow").active=false//阴影
                this.komwei.children[i].getChildByName("Prepare_Void").active=true
                this.komwei.children[i].getChildByName("hero").active=false
            }
        }
        // console.log("_______",Gotobattlenumber)
        for (let index = 0; index < Gotobattlenumber; index++) {
            if(Gotobattlenumber > TaskManager.getInstance().getTaskNowProgress(TaskItem.上阵X名英雄)){
                TaskManager.getInstance().emitTask(TaskItem.上阵X名英雄);
            }
        }

        if(this.greybuttonjudgment==0){
            this.Common_Btn_0.getChildByName("Label").getComponent(TextLanguage).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
            this.Common_Btn_0.getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
        }else{
            this.Common_Btn_0.getChildByName("Label").getComponent(TextLanguage).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
            this.Common_Btn_0.getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
        }

        //刷新英雄itme状态
        //血量
        let jdtnumber=0
        for (let shuaxingindex = 0; shuaxingindex < HeroListarr.length; shuaxingindex++) {
            this.guaiwuarr[shuaxingindex].getComponent(HeroItem).RefreshHeroesItem(HeroListarr[shuaxingindex].hero_type)
            for (let teamListindex = 0; teamListindex < teamList.length; teamListindex++) {
                if(teamList[teamListindex]==HeroListarr[shuaxingindex].hero_type){
                    this.guaiwuarr[shuaxingindex].getChildByName("shangzheng").active=true
                }
            }
        }

        for (let xuelindex = 0; xuelindex < teamList.length; xuelindex++) {
            if(teamList[xuelindex]>0){
                jdtnumber+=HeroManager.getInstance().getHeroData(teamList[xuelindex]).total_hp//英雄的基础数据   传入英雄id类型  防御力  生命值  命中值  
            }
        }
        // cc.log(Math.round(1.111));//1
        jdtnumber=Math.round(jdtnumber/5)
        // console.log("_______",jdtnumber)
        //刷新血量
        this.jdt.getComponent(cc.Label).string=""+jdtnumber+"/"+""+jdtnumber
    }
    // onHeroItemTouchStart(e:cc.Event.EventTouch) {
    //     let touchTeam=e.getCurrentTarget();
    //     console.log("点击：",touchTeam.name)
    //     this.ScrollViews.getComponent(cc.ScrollView).enabled=false
    //     //如果这个英雄没有上阵   就可以拖出这个英雄
    //     if(touchTeam.getChildByName("shangzheng").active==false){
    //         let pos=this.komwei.convertToNodeSpaceAR(e.getLocation());
    //         this.Mouseitem.getComponent(HeroItem).heroType=touchTeam.getComponent(HeroItem).heroType
    //         this.Mouseitem.getComponent(HeroItem).RefreshHeroesItem(touchTeam.getComponent(HeroItem).heroType)
    //         this.Mouseitem.setPosition(pos)
    //         this.Mouseitem.active=true
    //     }else{
    //         GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(100091))
    //     }
    // }
    // onHeroItemTouchMove(e:cc.Event.EventTouch) {
    //     let touchTeam=e.getCurrentTarget();
    //     console.log("移动：",touchTeam.name)
    //     //拖动这个英雄
    //     if(touchTeam.getChildByName("shangzheng").active==false&&this.Mouseitem.active==true){
    //         let pos=this.komwei.convertToNodeSpaceAR(e.getLocation());
    //         this.Mouseitem.setPosition(pos)
    //     }else{
    //         GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(100091))
    //     }
    // }
    onHeroItemTouchEnd(e:cc.Event.EventTouch) {
        let touchTeam=e.getCurrentTarget();
        // console.log("在里面放开",touchTeam.name)
        this.ScrollViews.getComponent(cc.ScrollView).enabled=true
        if(touchTeam.getChildByName("shangzheng").active==false){
            //上阵该英雄
            let teamList=HeroManager.getInstance().getTeamList(GameManager.getInstance().cur_game_mode);
          
            if(teamList[2]==-1||teamList[2]==Hero_Type.NULL){
                teamList[2]=touchTeam.getComponent(HeroItem).hero_type
                HeroManager.getInstance().saveTeamList(GameManager.getInstance().cur_game_mode,teamList)
                this.Refreshheroitmestatus()
                return
            }
            // for (let index = 0; index < teamList.length; index++) {
            //     // @ts-ignore
            //     if(index!=2){
            //         return;
            //     }
            //     if(teamList[index]==-1||teamList[index]==Hero_Type.NULL){
            //         teamList[index]=touchTeam.getComponent(HeroItem).hero_type
            //         HeroManager.getInstance().saveTeamList(GameManager.getInstance().cur_game_mode,teamList)
            //         this.Refreshheroitmestatus()
            //         return
            //     }
            // }
            GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(130013))
        }else{
            GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(100091))
        }
    }
    // onHeroItemTouchCancel(e:cc.Event.EventTouch) {
    //     let touchTeam=e.getCurrentTarget();
    //     this.ScrollViews.getComponent(cc.ScrollView).enabled=true
    //     console.log("在外面放开",touchTeam.name)
    //     let teamList=HeroManager.getInstance().getTeamList(GameManager.getInstance().cur_game_mode);
    //     let pos=this.komwei.convertToNodeSpaceAR(e.getLocation());



    //     if(touchTeam.getChildByName("shangzheng").active==false&&this.Mouseitem.active==true){
    //         //如果在上阵空位中且这个位置没有英雄 就上阵英雄   如果这个位置有英雄   就下阵这个位置的英雄   在上阵英雄
    //         this.Mouseitem.active=false


    //         for(let i=0; i<this.hero_team_rect.length; i++)
    //         {
 
    //             if(this.hero_team_rect[i].contains(pos)==true)
    //             {   
    //                 console.log("是否在空位里面：",this.hero_team_rect[i],pos)
    //                 // if(teamList[i]==Hero_Type.NULL||teamList[i]==-1){
    //                     teamList[i]=this.Mouseitem.getComponent(HeroItem).heroType
    //                 // }else{
    //                     // teamList[i]=-1
    //                 // }

    //                 HeroManager.getInstance().saveTeamList(GameManager.getInstance().cur_game_mode,teamList)
    //                 console.log("现在的英雄列表：",teamList)
    //                 this.Selfposition(i)

    //                 this.Refreshheroitmestatus()
    //                 return;
    //             }
    //         }
    //         this.Refreshheroitmestatus()
    //     }
            
    // }
    // setLevelData()
    // {
    //     LevelManager.getInstance().start_level=this.cur_selected_level;
    //     let gm=GameManager.getInstance();
    //     gm.level_datas=new Array();
    //     gm.level_datas=MissionLevelManager.getInstance().getLevelDatas(this.cur_selected_level);
    // }
    // loadHero(heroType:Hero_Type,posIndex:number)
    // {        
    //     Hero.max_load_num++;
    //     let posX=posIndex*128-192;
    //     cc.resources.load('heros/hero'+heroType,cc.Prefab,(error: Error, assets:cc.Prefab)=>{
    //         if(error)
    //         {
    //             console.log(error);
    //             return;
    //         }
    //         let node=cc.instantiate(assets);
    //         node.parent=this.komwei;
    //         node.x=posX;
    //         // let hp=cc.find('Canvas/Ui_Root/wall_root');
    //         // node.y=hp.y+80;
    //         BuffStateManager.getInstance().createBuffRoot(cc.v2(posX,node.y+150),heroType);
    //     }); 
    // }
    clickBtnStart()//开始游戏
    {
        // @ts-ignore
        if(this.greybuttonjudgment==0){
            GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(130006))
            return
        }
        
        this.des()
        let GM=GameManager.getInstance();
        FollowManager.getInstance().followEvent(Follow_Type.点击开始挑战用户数);
        GM.sound_manager.playSound(SoundIndex.click);
        let fightingInfo=null;
        switch(GameManager.getInstance().cur_game_mode){
            case GameMode.Main:{
                
                // LevelManager.getInstance().start_level=LevelManager.getInstance().finish_level+1;
                // fightingInfo=MissionLevelManager.getInstance().getFightingInfo(LevelManager.getInstance().start_level);
                if(!TutorailsManager.getInstance().is_finish_game){
                    fightingInfo=TutorialLevelManager.getInstance().getFightingInfo(MapManager.Currentlevel);
                }else{
                    fightingInfo=MissionLevelManager.getInstance().getFightingInfo(MapManager.Currentlevel);
                }
                
                LevelManager.getInstance().start_level=MapManager.Currentlevel;
            }break;
            case GameMode.Endless:{
                PropManager.getInstance().changePropNum(PropId.EndlessChallenge,-1);
                fightingInfo=EndlessLevelsManager.getInstance().getFightingInfo(1);
            }break;
            case GameMode.Boss_Challenge:{
                PropManager.getInstance().changePropNum(PropId.BossTicket,-1);
                fightingInfo=BossChallengeManager.getInstance().getFightingInfo(BossChallengeManager.getInstance().cur_challenge_mode);
            }break;
            case GameMode.Maze:{
                Times.voidsensid=this.Mazeid
                fightingInfo=MazeManager.getInstance().getFightingInfo(this.Mazeid);
                if(GM.cur_game_scene==GameScene.game){
                    super.onRefresh();
                    super.onClose();
                    GM.startNextLevel();
                    return;
                }
            }break;
            case GameMode.Tower:{
                // fightingInfo=TowerLevelManager.getInstance().getFightingInfo(TowerManager.getTowerLevel());
            }break;
        }
        GameManager.getInstance().fighting_info=fightingInfo;
        // this.showEnergy();
        GM.refreshUserExpShow();
        //this.setLevelData();
        let bgLoading=UIManager.getInstance().getLoadingNode();
        bgLoading.active=true;
        let loadingBar=bgLoading.getChildByName('ProgressBar').getComponent(cc.ProgressBar);
        let loadLabel=loadingBar.node.getChildByName('loadLabel').getComponent(cc.Label);
        cc.director.preloadScene(GameScene.game,(completedCount: number, totalCount: number, item: any)=>{
            //真实进度
            let progressTrue=completedCount/totalCount;
            //假的进度
            let progressFalse=progressTrue/2;
            loadingBar.progress = progressFalse;
            loadLabel.string=(loadingBar.progress*100).toFixed(0)+'%';
            GM.cur_load_progress=progressFalse;
            // this.loading_light.x = this.loading_bar.progress*this.loading_bar.totalLength-this.loading_bar.totalLength/2;
        },()=>{
            cc.director.loadScene(GameScene.game);
        });
        
    }

    des() {//清除所有怪物的预制体
        for (let index = 0; index < this.pos.children.length; index++) {
            if (this.pos.children[index].children.length>0) {
                this.pos.children[index].children[0].destroy()
            }
        }
    }
    clickBtnMonster(){//怪物详情
        this.Monster.getComponent(MonsterDetails).MonsterDetailsarr=this.MonsterDetailsarr
        this.Monster.active=true
    }
    clickBtnChariot(){//战车详情
        this.Chariot.active=true
    }
    // setLevelData()
    // {
    //     LevelManager.getInstance().start_level=LevelManager.getInstance().finish_level + 1;
    //     let gm=GameManager.getInstance();
    //     gm.fighting_info=MissionLevelManager.getInstance().getFightingInfo(LevelManager.getInstance().start_level);
    // }

    clickBtnClose()
    {
        cc.find('Canvas/main_ui').getComponent(MainUi).refreshMainTaskUi();
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        this.des()
        this.destroySelf();
        if(GameManager.getInstance().cur_game_mode==GameMode.Endless){
            UIManager.getInstance().showUiDialog(UIPath.VndlessChallenges,UILayerLevel.One,{onCompleted:(uiNode)=> {
                uiNode.getComponent(endlesschallenges).init({
                    onClose:()=>{

                    }
                })
                uiNode.getComponent(endlesschallenges).initUi(2)//2:无尽挑战   3：boss挑战
            },});
        }
        else if(GameManager.getInstance().cur_game_mode==GameMode.Boss_Challenge){
            UIManager.getInstance().showUiDialog(UIPath.VndlessChallenges,UILayerLevel.One,{onCompleted:(uiNode)=> {
                uiNode.getComponent(endlesschallenges).init({
                    onClose:()=>{

                    }
                })
                uiNode.getComponent(endlesschallenges).initUi(3)//2:无尽挑战   3：boss挑战
            },});
        }
    }

    destroySelf()
    {
        super.onClose();
        ApkManager.getInstance().closeBanner();
        // EventManager.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Main_SignIn);
    }

}
