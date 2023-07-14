import { GameScene } from "../Constants";
import GameManager from "../GameManager";
import { Follow_Type } from "../multiLanguage/FollowConstants";
import FollowManager from "../multiLanguage/FollowManager";
import { SoundIndex } from "../Sound/AudioConstants";
import MyTool from "../Tools/MyTool";
import BtnTower from "./BtnTower";
import { TowerLevelManager } from "./TowerLevel";
import TowerManager from "./TowerManager";
import FixedPos from "../UI/home/FixedPos";
import { UIManager } from "../UI/UIManager";
import UIComponent from "../UI/UIComponent";
import ToPlayMainUi from "../UI/home/ToPlayMainUi";
import { UIPath, UILayerLevel } from "../UI/UIConfig";


const {ccclass, property} = cc._decorator;

@ccclass
export default class TowerUi extends UIComponent {

    @property(cc.Prefab)
    item_btn_tower:cc.Prefab=null;

    // @property(cc.Prefab)
    // prefab_help:cc.Prefab=null;

    @property([cc.SpriteFrame])
    sp_btn:cc.SpriteFrame[]=[];

    @property([cc.SpriteFrame])
    sp_wupin:cc.SpriteFrame[]=[];//0=金币,1=英雄经验，2=玩家经验和钻石

    @property([cc.SpriteFrame])
    sp_kuang:cc.SpriteFrame[]=[];//0=金币,1=英雄经验，2=装备和经验

    @property(cc.Prefab)
    prefab_num:cc.Prefab=null;

    @property(cc.Node)
    content:cc.Node=null;

    @property(cc.Node)
    cloud_root:cc.Node=null;

    @property(cc.Material)
    gray_spine:cc.Material=null;

    cur_load_level:number=1;

    start_load_level:number=1;
    end_load_level:number=1;
    max_load_num:number=8;

    sword:cc.Node=null;
    btn_tower:cc.Node=null;

    win_width:number=cc.winSize.width/2;

    onLoad(): void {
        let level=TowerManager.getTowerLevel()-2;
        if(level<1){
            level=1;
        }
        this.start_load_level=this.cur_load_level=level;
        this.end_load_level=this.start_load_level+5;
        let maxLevel=TowerLevelManager.getMaxFloor();
        if(this.end_load_level>maxLevel){
            this.end_load_level=maxLevel;
            this.start_load_level=this.cur_load_level=this.end_load_level-6;
        }        
        this.loadTower();
        this.adaptation();        
    }

    private adaptation()
    {
        let wp=cc.winSize;
        let bottom=this.node.getChildByName('bottom');
        let top = this.node.getChildByName("Tower_Bg_3");
        bottom.y=-wp.height/2;
        bottom.zIndex=1;
        top.y = wp.height/2 - 50;
        // UIManager.getInstance().addTeamSelectUi(this.node,cc.v2(0,0),this.node.getChildByName('bottom').y,false);
    }

    protected start(): void {
        //this.showEnemyInfo();
        // this.showRewardList();
        // let infoRoot=this.node.getChildByName('infoRoot');
        // infoRoot.active=false;
        // infoRoot.y;
        let bgLoading=UIManager.getInstance().getLoadingNode();
        if(bgLoading){
            let loadingBar=bgLoading.getChildByName('ProgressBar').getComponent(cc.ProgressBar);
            loadingBar.progress=0.9;
        }
        
    }

    loadTower(){
        this.sword=this.node.getChildByName('sword');
        let level=TowerManager.getTowerLevel();
        for(let i=this.start_load_level; i<=this.end_load_level; i++,this.cur_load_level++){
            let btnTower=cc.instantiate(this.item_btn_tower);
            btnTower.name="btnTower"+this.cur_load_level;
            btnTower.getComponent(BtnTower).init(this.cur_load_level);
            this.content.addChild(btnTower);
            if(i == level){
                this.sword.parent = btnTower;
                this.sword.y = 160;
                let arrow = new cc.Node();
                arrow.addComponent(cc.Sprite).spriteFrame = TowerManager.getInstance().getSpByName("Tower_Arrow");
                arrow.setPosition(cc.v2(0,120));
                arrow.parent = btnTower;
                cc.tween(arrow).to(0.4,{position:cc.v3(0,125,0)}).to(0.4,{position:cc.v3(0,115,0)}).union().repeatForever().start();
            }
        }
        this.scheduleOnce(()=>{
            this.content.getComponent(cc.Layout).enabled = false;
            for(let i=this.start_load_level; i<=this.end_load_level; i++){
                let btnTower=this.content.getChildByName("btnTower"+i);
                btnTower.zIndex = this.end_load_level - i;
    
            }
        },0.01);
        this.node.opacity=0;
        this.scheduleOnce(()=>{
            this.node.opacity=255;
            if(level<=TowerLevelManager.getMaxFloor()){
                this.btn_tower=this.content.getChildByName('btnTower'+level);
                let disY=0;
                let delayT=0;
                if(TowerManager.is_show_tower){
                    if(level>1){
                        let prevBtn=this.content.getChildByName('btnTower'+(level-1));
                        let fightY=prevBtn.y; 
                        disY=-fightY;
                        disY=this.getDisY(disY);
                        //1.播放一下剑的特效
                        
                        // this.sword.y=fightY+disY-64;
                        // let swordSK=this.sword.getComponent(sp.Skeleton);
                        //let tt=swordSK.setAnimation(0,"",false);
                        // prevBtn.getComponent(BtnTower).showUnlonkProcess0();
                        delayT=1.9;
                        let tt=new Date().getTime();
                        // swordSK.setCompleteListener(()=>{
                        //     // prevBtn.getComponent(BtnTower).showUnlonkProcess1();
                        //     swordSK.setCompleteListener(null);
                        //     this.sword.active=false;
                        //     cc.log(new Date().getTime()-tt);
                        // })
                    }else{
                        disY=this.getDisY(-this.btn_tower.y);;
                    }                                        
                }else{
                    disY=this.getDisY(-this.btn_tower.y);
                } 
                let disYY=0;
                let fightY=this.btn_tower.y;
                disYY=-fightY;
                disYY=this.getDisY(disYY);
                this.content.y=disY;
                // cc.tween(this.content).delay(delayT).to(0.5,{y:disYY}).call(()=>{
                //     TowerManager.is_show_tower=false;
                //     this.sword.active=true;
                //     this.sword.y=this.btn_tower.y+this.content.y-64
                // }).start();
                //设置战斗剑
                // let swordY=fightY+this.content.y-64;                                
                //设置云
                // let jiange=200;
                // let hh=cc.winSize.height/2-109;
                // let cloudNum=Math.round((hh-swordY)/jiange);
                // for(let i=1; i<=cloudNum; i++){
                //     for(let n=0; n<4; n++){
                //         let cloud=new cc.Node();
                //         let cloudSpName=i%2?"Tower_Cloud_0":"Tower_Cloud_1";
                //         cloud.addComponent(cc.Sprite).spriteFrame=TowerManager.getInstance().getSpByName(cloudSpName);
                //         cloud.y=swordY+jiange*i+Math.random()*jiange/5;
                //         cloud.x=-this.win_width/2+cloud.width/2*n+Math.random()*jiange/5;
                //         this.cloud_root.addChild(cloud);
                //     }
                    
                // }
            }else{
                let hhh=(this.content.height-cc.winSize.height/2);
                this.content.y=-hhh;
            }

        },cc.director.getDeltaTime());   
        //设置按钮
        let bottom=this.node.getChildByName('bottom')
        let btnStart=bottom.getChildByName('btnStart').getComponent(cc.Button);
        let isCan=level<=TowerLevelManager.getMaxFloor();
        let material=isCan?cc.Material.getBuiltinMaterial('2d-sprite'):this.gray_spine;
        btnStart.getComponent(cc.Sprite).setMaterial(0,material)
        btnStart.interactable=isCan;

        // let btnTeam=bottom.getChildByName('btnTeam').getComponent(cc.Button);
        // btnTeam.interactable=isCan;
        // let text=bottom.getChildByName('text')
        // text.color=isCan?cc.color(33,84,37):cc.Color.WHITE;
    }

    getDisY(y:number):number{
        let disY=y;
        let hh=cc.winSize.height/2-109;
        if(disY>-hh){
            disY=-hh;
        }
        let hhh=(this.content.height-cc.winSize.height/2);
        if(disY<-hhh){
            disY=-hhh;
        }
        return disY;
    }

    // showEnemyInfo(){
    //     let level=TowerManager.getTowerLevel();
    //     if(level>TowerLevelManager.getMaxFloor()){
    //         return;
    //     }
    //     //显示怪物信息
    //     let levelDatas=TowerLevelManager.getInstance().getFightingInfo(level);
    //     let waveNum=levelDatas.length;
    //     let enemyTypes:any[]=new Array();
    //     let mam=MonsterAttributeManager.getInstance();
    //     //筛查怪物种类
    //     for(let w=0; w<waveNum; w++)
    //     {
    //         let levelData=levelDatas[w];
    //         let monsterNum=levelData.monster_num;
    //         for(let i=0; i<monsterNum.length; i++)
    //         {
    //             let mId=levelData.monster_id[i];
    //             if(mId!=50000){
    //                 let enemyType=mam.getEnemyType(mId);
    //                 //查找出拥有一样类型的下标
    //                 let eIndex=-1;
    //                 for(let n=0;n<enemyTypes.length;n++)
    //                 {
    //                     let eData=enemyTypes[n];
    //                     if(eData.type==enemyType)
    //                     {
    //                         eIndex=n;
    //                         break;
    //                     }
    //                 }                                      
    //                 if(eIndex==-1)
    //                 {
    //                     let isBoss=levelData.is_boss[i];
    //                     enemyTypes.push({type:enemyType,isBoss:isBoss});                        
    //                     //boss.push(isBoss);
    //                 }else
    //                 {
    //                     //找到对应的位置，设置为BOSS
    //                     if(!enemyTypes[eIndex].isBoss)
    //                     {
    //                         let isBoss=levelData.is_boss[i];
    //                         if(isBoss)
    //                         {
    //                             enemyTypes[eIndex].isBoss=true;
    //                         }
    //                     }
    //                 }   
    //             }
                                            
    //         }
    //     }
    //     //排序，boss在最前
    //     enemyTypes.sort((a:any,b:any)=>{
    //         return b.isBoss-a.isBoss;
    //     });
    //     let infoRoot=this.node.getChildByName('infoRoot');
    //     let enemyContent=infoRoot.getChildByName('enemyScrollView').getComponent(cc.ScrollView).content;
    //     enemyContent.removeAllChildren();
    //     //展示关卡数
    //     let zrLabel=infoRoot.getChildByName('zrLabel');
    //     zrLabel.getComponent(cc.Label).string=LanguageManager.getInstance().getString(LanguageIndex.Enemy_lineup)+"-"+level+"F";
    //     let jiange=20;
    //     let isJi=enemyTypes.length%2?true:false;
    //     let centerIndex=Math.round(enemyTypes.length/2);
    //     //展示怪物的种类
    //     for(let i=1; i<=enemyTypes.length; i++)
    //     {
    //         let type=enemyTypes[i-1].type;
    //         let isBoss=enemyTypes[i-1].isBoss;
    //         let mapEnemy=cc.instantiate(EnemyIconManager.getInstance().prefab_icon);
    //         mapEnemy.getComponent(EnemyIcon).init(type,isBoss)
    //         enemyContent.addChild(mapEnemy);
    //         let xx=0;
    //         if(isJi){
    //             //奇数
    //             xx=(i-centerIndex)*(mapEnemy.width+jiange)
    //         }else{
    //             //偶数
    //             xx=(i-centerIndex)*(mapEnemy.width+jiange)-(mapEnemy.width+jiange)/2;
    //         }
    //         mapEnemy.x=xx;
    //     }
    // }

    //显示挂机奖励的列表
    showRewardList(){
        let level=TowerManager.getTowerLevel();
        if(level>TowerLevelManager.getMaxFloor()){
            return;
        }
        // let infoRoot=this.node.getChildByName('infoRoot');
        // let rewardScrollview=infoRoot.getChildByName('rewardScrollview').getComponent(cc.ScrollView);
        // let content=rewardScrollview.content;
        // content.removeAllChildren();
        // let numRoot=content.parent.getChildByName('num_root');
        // numRoot.removeAllChildren();
        // let equipRoot=content.parent.getChildByName('equip_root');
        // equipRoot.removeAllChildren();
        //添加金币等资源列表
        // let jsonData=TowerRewardManager.getInstance().getJsonTowerReward(level);        
        // let coinNum=jsonData.Coin;
        // let heroExpNum=jsonData.HeroExp;
        // let gemNum=jsonData.Gem;
        // let itemNum=0;
        // let itemId=jsonData.AdItem;
        // if(jsonData.AdItem){
        //     itemNum=jsonData.AdItemNum;
        // }
        //金币框
        // this.createWupin(0,coinNum);
        // this.createWupin(1,heroExpNum);
        // this.createWupin(2,gemNum);
        //添加装备列表
        // for(let i=0;i<itemNum;i++){
        //     //装备框
        //     let kuang=this.createKuang(2);
        //     content.addChild(kuang);
        //     let item=EquipmentManager.getInstance().getEquipNodeById(itemId);
        //     item.addComponent(FixedPos).init(kuang,cc.v2(0,0),content);
        //     equipRoot.addChild(item);            
        // }

        // let jiange=20;
        // let isJi=content.childrenCount%2?true:false;
        // let centerIndex=Math.round(content.childrenCount/2);        
        // //展示怪物的种类
        // for(let i=1; i<=content.childrenCount; i++)
        // {
        //     let item=content.children[i-1];
        //     let xx=0;
        //     if(isJi){
        //         //奇数
        //         xx=(i-centerIndex)*(item.width+jiange)
        //     }else{
        //         //偶数
        //         xx=(i-centerIndex)*(item.width+jiange)-(item.width+jiange)/2;
        //     }
        //     item.x=xx;
        // }
    }

    createWupin(kuangIndex:number,num:number):cc.Node{
        let infoRoot=this.node.getChildByName('infoRoot');
        let content=infoRoot.getChildByName('rewardScrollview').getComponent(cc.ScrollView).content;
        let numRoot=content.parent.getChildByName('num_root');
        //框
        let kuang=this.createKuang(kuangIndex);               
        let node=new cc.Node();
        node.addComponent(cc.Sprite).spriteFrame=this.sp_wupin[kuangIndex];
        kuang.addChild(node);
        let numLabel=cc.instantiate(this.prefab_num);
        numLabel.getComponent(cc.Label).string=MyTool.getCoinDanwei(num);
        numLabel.setAnchorPoint(cc.v2(0,0.5));
        numLabel.getComponent(FixedPos).init(kuang,cc.v2(-16,-32.5),content);
        numRoot.addChild(numLabel);        
        content.addChild(kuang);
        switch(kuangIndex){
            case 0:{
                kuang.name="coin"; 
                node.name="coin"; 
            }break;
        }
        return node;
    }

    createKuang(kuangIndex:number):cc.Node{
        let kuang=new cc.Node();
        kuang.addComponent(cc.Sprite).spriteFrame=this.sp_kuang[kuangIndex];
        return kuang;
    }
    

    clickBtnHelp(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        // let help=cc.instantiate(this.prefab_help);
        // this.node.addChild(help);
        UIManager.getInstance().showHelpTipsUi(null,810001,[810002,810003]);
    }

    clickBtnClose(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        TowerManager.is_show_tower=false;
        super.onClose();
    }

    clickBtnFormaiton(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        UIManager.getInstance().showUiDialog(UIPath.ToPlay,UILayerLevel.One,{onCompleted:(uiNode)=> {
            uiNode.getComponent(ToPlayMainUi).init(null);
        },})
        // let team=this.node.getChildByName('team_select_ui');
        // if(team){
        //     team.active=!team.active;
        //     let bottom=this.node.getChildByName("bottom");
        //     let text=bottom.getChildByName("text").getComponent(LabelLanguage);
        //     let index=team.active?LanguageIndex.Close:LanguageIndex.Formation;
        //     let btnTeam=bottom.getChildByName("btnTeam").getComponent(cc.Sprite);
        //     btnTeam.spriteFrame=this.sp_btn[team.active?0:1];
        //     text.setLanguageIndex(index);
        //     let infoRoot=this.node.getChildByName('infoRoot');
        //     infoRoot.active=team.active;
        // }
    }

    startGame(){
        FollowManager.getInstance().followEvent(Follow_Type.爬塔每层挑战次数+TowerManager.getTowerLevel());
        let gm=GameManager.getInstance();
        gm.fighting_info=TowerLevelManager.getInstance().getFightingInfo(TowerManager.getTowerLevel());        
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
            GameManager.getInstance().cur_load_progress=progressFalse;
            //this.loading_light.x = this.loading_bar.progress*this.loading_bar.totalLength-this.loading_bar.totalLength/2;
        },()=>{
            cc.director.loadScene(GameScene.game);
        });
    }

    clickBtnStart(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        if(TowerManager.getTodayPassNum()>=20){
            GameManager.getInstance().showMessage('');
            return;
        }
        if(TowerManager.getTowerLevel()<=TowerLevelManager.getMaxFloor()){
            this.startGame();
        }        
    }

    // protected update(dt: number): void {
    //     for(let i=0; i<this.cloud_root.childrenCount; i++){
    //         let c=this.cloud_root.children[i];
    //         c.x-=dt*(Math.random()*10+40);
    //         if(c.x<-(c.width/2+this.win_width)){
    //             c.x=c.width/2+this.win_width;
    //             let cloudSpName=Math.random()>0.5?"Tower_Cloud_0":"Tower_Cloud_1";
    //             c.getComponent(cc.Sprite).spriteFrame=TowerManager.getInstance().getSpByName(cloudSpName);
    //         }
    //     }
    //     if(this.btn_tower&&TowerManager.is_show_tower==false){
    //         this.sword.y=this.btn_tower.y+this.content.y-64
    //     }
    // }

}
