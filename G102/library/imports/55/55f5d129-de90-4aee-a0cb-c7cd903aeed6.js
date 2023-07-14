"use strict";
cc._RF.push(module, '55f5dEp3pBK7qDLx82QOu7W', 'TowerUi');
// Scripts/Tower/TowerUi.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Constants_1 = require("../Constants");
var GameManager_1 = require("../GameManager");
var FollowConstants_1 = require("../multiLanguage/FollowConstants");
var FollowManager_1 = require("../multiLanguage/FollowManager");
var AudioConstants_1 = require("../Sound/AudioConstants");
var MyTool_1 = require("../Tools/MyTool");
var BtnTower_1 = require("./BtnTower");
var TowerLevel_1 = require("./TowerLevel");
var TowerManager_1 = require("./TowerManager");
var FixedPos_1 = require("../UI/home/FixedPos");
var UIManager_1 = require("../UI/UIManager");
var UIComponent_1 = require("../UI/UIComponent");
var ToPlayMainUi_1 = require("../UI/home/ToPlayMainUi");
var UIConfig_1 = require("../UI/UIConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TowerUi = /** @class */ (function (_super) {
    __extends(TowerUi, _super);
    function TowerUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.item_btn_tower = null;
        // @property(cc.Prefab)
        // prefab_help:cc.Prefab=null;
        _this.sp_btn = [];
        _this.sp_wupin = []; //0=金币,1=英雄经验，2=玩家经验和钻石
        _this.sp_kuang = []; //0=金币,1=英雄经验，2=装备和经验
        _this.prefab_num = null;
        _this.content = null;
        _this.cloud_root = null;
        _this.gray_spine = null;
        _this.cur_load_level = 1;
        _this.start_load_level = 1;
        _this.end_load_level = 1;
        _this.max_load_num = 8;
        _this.sword = null;
        _this.btn_tower = null;
        _this.win_width = cc.winSize.width / 2;
        return _this;
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
    TowerUi.prototype.onLoad = function () {
        var level = TowerManager_1.default.getTowerLevel() - 2;
        if (level < 1) {
            level = 1;
        }
        this.start_load_level = this.cur_load_level = level;
        this.end_load_level = this.start_load_level + 5;
        var maxLevel = TowerLevel_1.TowerLevelManager.getMaxFloor();
        if (this.end_load_level > maxLevel) {
            this.end_load_level = maxLevel;
            this.start_load_level = this.cur_load_level = this.end_load_level - 6;
        }
        this.loadTower();
        this.adaptation();
    };
    TowerUi.prototype.adaptation = function () {
        var wp = cc.winSize;
        var bottom = this.node.getChildByName('bottom');
        var top = this.node.getChildByName("Tower_Bg_3");
        bottom.y = -wp.height / 2;
        bottom.zIndex = 1;
        top.y = wp.height / 2 - 50;
        // UIManager.getInstance().addTeamSelectUi(this.node,cc.v2(0,0),this.node.getChildByName('bottom').y,false);
    };
    TowerUi.prototype.start = function () {
        //this.showEnemyInfo();
        // this.showRewardList();
        // let infoRoot=this.node.getChildByName('infoRoot');
        // infoRoot.active=false;
        // infoRoot.y;
        var bgLoading = UIManager_1.UIManager.getInstance().getLoadingNode();
        if (bgLoading) {
            var loadingBar = bgLoading.getChildByName('ProgressBar').getComponent(cc.ProgressBar);
            loadingBar.progress = 0.9;
        }
    };
    TowerUi.prototype.loadTower = function () {
        var _this = this;
        this.sword = this.node.getChildByName('sword');
        var level = TowerManager_1.default.getTowerLevel();
        for (var i = this.start_load_level; i <= this.end_load_level; i++, this.cur_load_level++) {
            var btnTower = cc.instantiate(this.item_btn_tower);
            btnTower.name = "btnTower" + this.cur_load_level;
            btnTower.getComponent(BtnTower_1.default).init(this.cur_load_level);
            this.content.addChild(btnTower);
            if (i == level) {
                this.sword.parent = btnTower;
                this.sword.y = 160;
                var arrow = new cc.Node();
                arrow.addComponent(cc.Sprite).spriteFrame = TowerManager_1.default.getInstance().getSpByName("Tower_Arrow");
                arrow.setPosition(cc.v2(0, 120));
                arrow.parent = btnTower;
                cc.tween(arrow).to(0.4, { position: cc.v3(0, 125, 0) }).to(0.4, { position: cc.v3(0, 115, 0) }).union().repeatForever().start();
            }
        }
        this.scheduleOnce(function () {
            _this.content.getComponent(cc.Layout).enabled = false;
            for (var i = _this.start_load_level; i <= _this.end_load_level; i++) {
                var btnTower = _this.content.getChildByName("btnTower" + i);
                btnTower.zIndex = _this.end_load_level - i;
            }
        }, 0.01);
        this.node.opacity = 0;
        this.scheduleOnce(function () {
            _this.node.opacity = 255;
            if (level <= TowerLevel_1.TowerLevelManager.getMaxFloor()) {
                _this.btn_tower = _this.content.getChildByName('btnTower' + level);
                var disY = 0;
                var delayT = 0;
                if (TowerManager_1.default.is_show_tower) {
                    if (level > 1) {
                        var prevBtn = _this.content.getChildByName('btnTower' + (level - 1));
                        var fightY_1 = prevBtn.y;
                        disY = -fightY_1;
                        disY = _this.getDisY(disY);
                        //1.播放一下剑的特效
                        // this.sword.y=fightY+disY-64;
                        // let swordSK=this.sword.getComponent(sp.Skeleton);
                        //let tt=swordSK.setAnimation(0,"",false);
                        // prevBtn.getComponent(BtnTower).showUnlonkProcess0();
                        delayT = 1.9;
                        var tt = new Date().getTime();
                        // swordSK.setCompleteListener(()=>{
                        //     // prevBtn.getComponent(BtnTower).showUnlonkProcess1();
                        //     swordSK.setCompleteListener(null);
                        //     this.sword.active=false;
                        //     cc.log(new Date().getTime()-tt);
                        // })
                    }
                    else {
                        disY = _this.getDisY(-_this.btn_tower.y);
                        ;
                    }
                }
                else {
                    disY = _this.getDisY(-_this.btn_tower.y);
                }
                var disYY = 0;
                var fightY = _this.btn_tower.y;
                disYY = -fightY;
                disYY = _this.getDisY(disYY);
                _this.content.y = disY;
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
            }
            else {
                var hhh = (_this.content.height - cc.winSize.height / 2);
                _this.content.y = -hhh;
            }
        }, cc.director.getDeltaTime());
        //设置按钮
        var bottom = this.node.getChildByName('bottom');
        var btnStart = bottom.getChildByName('btnStart').getComponent(cc.Button);
        var isCan = level <= TowerLevel_1.TowerLevelManager.getMaxFloor();
        var material = isCan ? cc.Material.getBuiltinMaterial('2d-sprite') : this.gray_spine;
        btnStart.getComponent(cc.Sprite).setMaterial(0, material);
        btnStart.interactable = isCan;
        // let btnTeam=bottom.getChildByName('btnTeam').getComponent(cc.Button);
        // btnTeam.interactable=isCan;
        // let text=bottom.getChildByName('text')
        // text.color=isCan?cc.color(33,84,37):cc.Color.WHITE;
    };
    TowerUi.prototype.getDisY = function (y) {
        var disY = y;
        var hh = cc.winSize.height / 2 - 109;
        if (disY > -hh) {
            disY = -hh;
        }
        var hhh = (this.content.height - cc.winSize.height / 2);
        if (disY < -hhh) {
            disY = -hhh;
        }
        return disY;
    };
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
    TowerUi.prototype.showRewardList = function () {
        var level = TowerManager_1.default.getTowerLevel();
        if (level > TowerLevel_1.TowerLevelManager.getMaxFloor()) {
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
    };
    TowerUi.prototype.createWupin = function (kuangIndex, num) {
        var infoRoot = this.node.getChildByName('infoRoot');
        var content = infoRoot.getChildByName('rewardScrollview').getComponent(cc.ScrollView).content;
        var numRoot = content.parent.getChildByName('num_root');
        //框
        var kuang = this.createKuang(kuangIndex);
        var node = new cc.Node();
        node.addComponent(cc.Sprite).spriteFrame = this.sp_wupin[kuangIndex];
        kuang.addChild(node);
        var numLabel = cc.instantiate(this.prefab_num);
        numLabel.getComponent(cc.Label).string = MyTool_1.default.getCoinDanwei(num);
        numLabel.setAnchorPoint(cc.v2(0, 0.5));
        numLabel.getComponent(FixedPos_1.default).init(kuang, cc.v2(-16, -32.5), content);
        numRoot.addChild(numLabel);
        content.addChild(kuang);
        switch (kuangIndex) {
            case 0:
                {
                    kuang.name = "coin";
                    node.name = "coin";
                }
                break;
        }
        return node;
    };
    TowerUi.prototype.createKuang = function (kuangIndex) {
        var kuang = new cc.Node();
        kuang.addComponent(cc.Sprite).spriteFrame = this.sp_kuang[kuangIndex];
        return kuang;
    };
    TowerUi.prototype.clickBtnHelp = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        // let help=cc.instantiate(this.prefab_help);
        // this.node.addChild(help);
        UIManager_1.UIManager.getInstance().showHelpTipsUi(null, 810001, [810002, 810003]);
    };
    TowerUi.prototype.clickBtnClose = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        TowerManager_1.default.is_show_tower = false;
        _super.prototype.onClose.call(this);
    };
    TowerUi.prototype.clickBtnFormaiton = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.ToPlay, UIConfig_1.UILayerLevel.One, { onCompleted: function (uiNode) {
                uiNode.getComponent(ToPlayMainUi_1.default).init(null);
            }, });
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
    };
    TowerUi.prototype.startGame = function () {
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.爬塔每层挑战次数 + TowerManager_1.default.getTowerLevel());
        var gm = GameManager_1.default.getInstance();
        gm.fighting_info = TowerLevel_1.TowerLevelManager.getInstance().getFightingInfo(TowerManager_1.default.getTowerLevel());
        var bgLoading = UIManager_1.UIManager.getInstance().getLoadingNode();
        bgLoading.active = true;
        var loadingBar = bgLoading.getChildByName('ProgressBar').getComponent(cc.ProgressBar);
        var loadLabel = loadingBar.node.getChildByName('loadLabel').getComponent(cc.Label);
        cc.director.preloadScene(Constants_1.GameScene.game, function (completedCount, totalCount, item) {
            //真实进度
            var progressTrue = completedCount / totalCount;
            //假的进度
            var progressFalse = progressTrue / 2;
            loadingBar.progress = progressFalse;
            loadLabel.string = (loadingBar.progress * 100).toFixed(0) + '%';
            GameManager_1.default.getInstance().cur_load_progress = progressFalse;
            //this.loading_light.x = this.loading_bar.progress*this.loading_bar.totalLength-this.loading_bar.totalLength/2;
        }, function () {
            cc.director.loadScene(Constants_1.GameScene.game);
        });
    };
    TowerUi.prototype.clickBtnStart = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        if (TowerManager_1.default.getTodayPassNum() >= 20) {
            GameManager_1.default.getInstance().showMessage('');
            return;
        }
        if (TowerManager_1.default.getTowerLevel() <= TowerLevel_1.TowerLevelManager.getMaxFloor()) {
            this.startGame();
        }
    };
    __decorate([
        property(cc.Prefab)
    ], TowerUi.prototype, "item_btn_tower", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], TowerUi.prototype, "sp_btn", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], TowerUi.prototype, "sp_wupin", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], TowerUi.prototype, "sp_kuang", void 0);
    __decorate([
        property(cc.Prefab)
    ], TowerUi.prototype, "prefab_num", void 0);
    __decorate([
        property(cc.Node)
    ], TowerUi.prototype, "content", void 0);
    __decorate([
        property(cc.Node)
    ], TowerUi.prototype, "cloud_root", void 0);
    __decorate([
        property(cc.Material)
    ], TowerUi.prototype, "gray_spine", void 0);
    TowerUi = __decorate([
        ccclass
    ], TowerUi);
    return TowerUi;
}(UIComponent_1.default));
exports.default = TowerUi;

cc._RF.pop();