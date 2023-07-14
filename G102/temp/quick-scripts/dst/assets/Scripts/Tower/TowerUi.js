
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Tower/TowerUi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVG93ZXJcXFRvd2VyVWkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMENBQXlDO0FBQ3pDLDhDQUF5QztBQUN6QyxvRUFBK0Q7QUFDL0QsZ0VBQTJEO0FBQzNELDBEQUFxRDtBQUNyRCwwQ0FBcUM7QUFDckMsdUNBQWtDO0FBQ2xDLDJDQUFpRDtBQUNqRCwrQ0FBMEM7QUFDMUMsZ0RBQTJDO0FBQzNDLDZDQUE0QztBQUM1QyxpREFBNEM7QUFDNUMsd0RBQW1EO0FBQ25ELDJDQUFzRDtBQUdoRCxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFxQywyQkFBVztJQUFoRDtRQUFBLHFFQXFjQztRQWxjRyxvQkFBYyxHQUFXLElBQUksQ0FBQztRQUU5Qix1QkFBdUI7UUFDdkIsOEJBQThCO1FBRzlCLFlBQU0sR0FBa0IsRUFBRSxDQUFDO1FBRzNCLGNBQVEsR0FBa0IsRUFBRSxDQUFDLENBQUEsdUJBQXVCO1FBR3BELGNBQVEsR0FBa0IsRUFBRSxDQUFDLENBQUEscUJBQXFCO1FBR2xELGdCQUFVLEdBQVcsSUFBSSxDQUFDO1FBRzFCLGFBQU8sR0FBUyxJQUFJLENBQUM7UUFHckIsZ0JBQVUsR0FBUyxJQUFJLENBQUM7UUFHeEIsZ0JBQVUsR0FBYSxJQUFJLENBQUM7UUFFNUIsb0JBQWMsR0FBUSxDQUFDLENBQUM7UUFFeEIsc0JBQWdCLEdBQVEsQ0FBQyxDQUFDO1FBQzFCLG9CQUFjLEdBQVEsQ0FBQyxDQUFDO1FBQ3hCLGtCQUFZLEdBQVEsQ0FBQyxDQUFDO1FBRXRCLFdBQUssR0FBUyxJQUFJLENBQUM7UUFDbkIsZUFBUyxHQUFTLElBQUksQ0FBQztRQUV2QixlQUFTLEdBQVEsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUMsQ0FBQyxDQUFDOztRQWdacEMsdUNB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LHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzFDLE9BQU87U0FDVjtRQUNELElBQUcsc0JBQVksQ0FBQyxhQUFhLEVBQUUsSUFBRSw4QkFBaUIsQ0FBQyxXQUFXLEVBQUUsRUFBQztZQUM3RCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7U0FDcEI7SUFDTCxDQUFDO0lBamJEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7bURBQ1U7SUFNOUI7UUFEQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUM7MkNBQ0E7SUFHM0I7UUFEQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUM7NkNBQ0U7SUFHN0I7UUFEQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUM7NkNBQ0U7SUFHN0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzsrQ0FDTTtJQUcxQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzRDQUNHO0lBR3JCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7K0NBQ007SUFHeEI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQzsrQ0FDTTtJQTNCWCxPQUFPO1FBRDNCLE9BQU87T0FDYSxPQUFPLENBcWMzQjtJQUFELGNBQUM7Q0FyY0QsQUFxY0MsQ0FyY29DLHFCQUFXLEdBcWMvQztrQkFyY29CLE9BQU8iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHYW1lU2NlbmUgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgRm9sbG93X1R5cGUgfSBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dDb25zdGFudHNcIjtcclxuaW1wb3J0IEZvbGxvd01hbmFnZXIgZnJvbSBcIi4uL211bHRpTGFuZ3VhZ2UvRm9sbG93TWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTb3VuZEluZGV4IH0gZnJvbSBcIi4uL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBNeVRvb2wgZnJvbSBcIi4uL1Rvb2xzL015VG9vbFwiO1xyXG5pbXBvcnQgQnRuVG93ZXIgZnJvbSBcIi4vQnRuVG93ZXJcIjtcclxuaW1wb3J0IHsgVG93ZXJMZXZlbE1hbmFnZXIgfSBmcm9tIFwiLi9Ub3dlckxldmVsXCI7XHJcbmltcG9ydCBUb3dlck1hbmFnZXIgZnJvbSBcIi4vVG93ZXJNYW5hZ2VyXCI7XHJcbmltcG9ydCBGaXhlZFBvcyBmcm9tIFwiLi4vVUkvaG9tZS9GaXhlZFBvc1wiO1xyXG5pbXBvcnQgeyBVSU1hbmFnZXIgfSBmcm9tIFwiLi4vVUkvVUlNYW5hZ2VyXCI7XHJcbmltcG9ydCBVSUNvbXBvbmVudCBmcm9tIFwiLi4vVUkvVUlDb21wb25lbnRcIjtcclxuaW1wb3J0IFRvUGxheU1haW5VaSBmcm9tIFwiLi4vVUkvaG9tZS9Ub1BsYXlNYWluVWlcIjtcclxuaW1wb3J0IHsgVUlQYXRoLCBVSUxheWVyTGV2ZWwgfSBmcm9tIFwiLi4vVUkvVUlDb25maWdcIjtcclxuXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvd2VyVWkgZXh0ZW5kcyBVSUNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIGl0ZW1fYnRuX3Rvd2VyOmNjLlByZWZhYj1udWxsO1xyXG5cclxuICAgIC8vIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICAvLyBwcmVmYWJfaGVscDpjYy5QcmVmYWI9bnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoW2NjLlNwcml0ZUZyYW1lXSlcclxuICAgIHNwX2J0bjpjYy5TcHJpdGVGcmFtZVtdPVtdO1xyXG5cclxuICAgIEBwcm9wZXJ0eShbY2MuU3ByaXRlRnJhbWVdKVxyXG4gICAgc3Bfd3VwaW46Y2MuU3ByaXRlRnJhbWVbXT1bXTsvLzA96YeR5biBLDE96Iux6ZuE57uP6aqM77yMMj3njqnlrrbnu4/pqozlkozpkrvnn7NcclxuXHJcbiAgICBAcHJvcGVydHkoW2NjLlNwcml0ZUZyYW1lXSlcclxuICAgIHNwX2t1YW5nOmNjLlNwcml0ZUZyYW1lW109W107Ly8wPemHkeW4gSwxPeiLsembhOe7j+mqjO+8jDI96KOF5aSH5ZKM57uP6aqMXHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIHByZWZhYl9udW06Y2MuUHJlZmFiPW51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBjb250ZW50OmNjLk5vZGU9bnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGNsb3VkX3Jvb3Q6Y2MuTm9kZT1udWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5NYXRlcmlhbClcclxuICAgIGdyYXlfc3BpbmU6Y2MuTWF0ZXJpYWw9bnVsbDtcclxuXHJcbiAgICBjdXJfbG9hZF9sZXZlbDpudW1iZXI9MTtcclxuXHJcbiAgICBzdGFydF9sb2FkX2xldmVsOm51bWJlcj0xO1xyXG4gICAgZW5kX2xvYWRfbGV2ZWw6bnVtYmVyPTE7XHJcbiAgICBtYXhfbG9hZF9udW06bnVtYmVyPTg7XHJcblxyXG4gICAgc3dvcmQ6Y2MuTm9kZT1udWxsO1xyXG4gICAgYnRuX3Rvd2VyOmNjLk5vZGU9bnVsbDtcclxuXHJcbiAgICB3aW5fd2lkdGg6bnVtYmVyPWNjLndpblNpemUud2lkdGgvMjtcclxuXHJcbiAgICBvbkxvYWQoKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGxldmVsPVRvd2VyTWFuYWdlci5nZXRUb3dlckxldmVsKCktMjtcclxuICAgICAgICBpZihsZXZlbDwxKXtcclxuICAgICAgICAgICAgbGV2ZWw9MTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zdGFydF9sb2FkX2xldmVsPXRoaXMuY3VyX2xvYWRfbGV2ZWw9bGV2ZWw7XHJcbiAgICAgICAgdGhpcy5lbmRfbG9hZF9sZXZlbD10aGlzLnN0YXJ0X2xvYWRfbGV2ZWwrNTtcclxuICAgICAgICBsZXQgbWF4TGV2ZWw9VG93ZXJMZXZlbE1hbmFnZXIuZ2V0TWF4Rmxvb3IoKTtcclxuICAgICAgICBpZih0aGlzLmVuZF9sb2FkX2xldmVsPm1heExldmVsKXtcclxuICAgICAgICAgICAgdGhpcy5lbmRfbG9hZF9sZXZlbD1tYXhMZXZlbDtcclxuICAgICAgICAgICAgdGhpcy5zdGFydF9sb2FkX2xldmVsPXRoaXMuY3VyX2xvYWRfbGV2ZWw9dGhpcy5lbmRfbG9hZF9sZXZlbC02O1xyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgICAgIHRoaXMubG9hZFRvd2VyKCk7XHJcbiAgICAgICAgdGhpcy5hZGFwdGF0aW9uKCk7ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFkYXB0YXRpb24oKVxyXG4gICAge1xyXG4gICAgICAgIGxldCB3cD1jYy53aW5TaXplO1xyXG4gICAgICAgIGxldCBib3R0b209dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdib3R0b20nKTtcclxuICAgICAgICBsZXQgdG9wID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiVG93ZXJfQmdfM1wiKTtcclxuICAgICAgICBib3R0b20ueT0td3AuaGVpZ2h0LzI7XHJcbiAgICAgICAgYm90dG9tLnpJbmRleD0xO1xyXG4gICAgICAgIHRvcC55ID0gd3AuaGVpZ2h0LzIgLSA1MDtcclxuICAgICAgICAvLyBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRUZWFtU2VsZWN0VWkodGhpcy5ub2RlLGNjLnYyKDAsMCksdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdib3R0b20nKS55LGZhbHNlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgc3RhcnQoKTogdm9pZCB7XHJcbiAgICAgICAgLy90aGlzLnNob3dFbmVteUluZm8oKTtcclxuICAgICAgICAvLyB0aGlzLnNob3dSZXdhcmRMaXN0KCk7XHJcbiAgICAgICAgLy8gbGV0IGluZm9Sb290PXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnaW5mb1Jvb3QnKTtcclxuICAgICAgICAvLyBpbmZvUm9vdC5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgLy8gaW5mb1Jvb3QueTtcclxuICAgICAgICBsZXQgYmdMb2FkaW5nPVVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldExvYWRpbmdOb2RlKCk7XHJcbiAgICAgICAgaWYoYmdMb2FkaW5nKXtcclxuICAgICAgICAgICAgbGV0IGxvYWRpbmdCYXI9YmdMb2FkaW5nLmdldENoaWxkQnlOYW1lKCdQcm9ncmVzc0JhcicpLmdldENvbXBvbmVudChjYy5Qcm9ncmVzc0Jhcik7XHJcbiAgICAgICAgICAgIGxvYWRpbmdCYXIucHJvZ3Jlc3M9MC45O1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBsb2FkVG93ZXIoKXtcclxuICAgICAgICB0aGlzLnN3b3JkPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnc3dvcmQnKTtcclxuICAgICAgICBsZXQgbGV2ZWw9VG93ZXJNYW5hZ2VyLmdldFRvd2VyTGV2ZWwoKTtcclxuICAgICAgICBmb3IobGV0IGk9dGhpcy5zdGFydF9sb2FkX2xldmVsOyBpPD10aGlzLmVuZF9sb2FkX2xldmVsOyBpKyssdGhpcy5jdXJfbG9hZF9sZXZlbCsrKXtcclxuICAgICAgICAgICAgbGV0IGJ0blRvd2VyPWNjLmluc3RhbnRpYXRlKHRoaXMuaXRlbV9idG5fdG93ZXIpO1xyXG4gICAgICAgICAgICBidG5Ub3dlci5uYW1lPVwiYnRuVG93ZXJcIit0aGlzLmN1cl9sb2FkX2xldmVsO1xyXG4gICAgICAgICAgICBidG5Ub3dlci5nZXRDb21wb25lbnQoQnRuVG93ZXIpLmluaXQodGhpcy5jdXJfbG9hZF9sZXZlbCk7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGVudC5hZGRDaGlsZChidG5Ub3dlcik7XHJcbiAgICAgICAgICAgIGlmKGkgPT0gbGV2ZWwpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zd29yZC5wYXJlbnQgPSBidG5Ub3dlcjtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3dvcmQueSA9IDE2MDtcclxuICAgICAgICAgICAgICAgIGxldCBhcnJvdyA9IG5ldyBjYy5Ob2RlKCk7XHJcbiAgICAgICAgICAgICAgICBhcnJvdy5hZGRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IFRvd2VyTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNwQnlOYW1lKFwiVG93ZXJfQXJyb3dcIik7XHJcbiAgICAgICAgICAgICAgICBhcnJvdy5zZXRQb3NpdGlvbihjYy52MigwLDEyMCkpO1xyXG4gICAgICAgICAgICAgICAgYXJyb3cucGFyZW50ID0gYnRuVG93ZXI7XHJcbiAgICAgICAgICAgICAgICBjYy50d2VlbihhcnJvdykudG8oMC40LHtwb3NpdGlvbjpjYy52MygwLDEyNSwwKX0pLnRvKDAuNCx7cG9zaXRpb246Y2MudjMoMCwxMTUsMCl9KS51bmlvbigpLnJlcGVhdEZvcmV2ZXIoKS5zdGFydCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMuY29udGVudC5nZXRDb21wb25lbnQoY2MuTGF5b3V0KS5lbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT10aGlzLnN0YXJ0X2xvYWRfbGV2ZWw7IGk8PXRoaXMuZW5kX2xvYWRfbGV2ZWw7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQgYnRuVG93ZXI9dGhpcy5jb250ZW50LmdldENoaWxkQnlOYW1lKFwiYnRuVG93ZXJcIitpKTtcclxuICAgICAgICAgICAgICAgIGJ0blRvd2VyLnpJbmRleCA9IHRoaXMuZW5kX2xvYWRfbGV2ZWwgLSBpO1xyXG4gICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LDAuMDEpO1xyXG4gICAgICAgIHRoaXMubm9kZS5vcGFjaXR5PTA7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHk9MjU1O1xyXG4gICAgICAgICAgICBpZihsZXZlbDw9VG93ZXJMZXZlbE1hbmFnZXIuZ2V0TWF4Rmxvb3IoKSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ0bl90b3dlcj10aGlzLmNvbnRlbnQuZ2V0Q2hpbGRCeU5hbWUoJ2J0blRvd2VyJytsZXZlbCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGlzWT0wO1xyXG4gICAgICAgICAgICAgICAgbGV0IGRlbGF5VD0wO1xyXG4gICAgICAgICAgICAgICAgaWYoVG93ZXJNYW5hZ2VyLmlzX3Nob3dfdG93ZXIpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGxldmVsPjEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcHJldkJ0bj10aGlzLmNvbnRlbnQuZ2V0Q2hpbGRCeU5hbWUoJ2J0blRvd2VyJysobGV2ZWwtMSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmlnaHRZPXByZXZCdG4ueTsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc1k9LWZpZ2h0WTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzWT10aGlzLmdldERpc1koZGlzWSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vMS7mkq3mlL7kuIDkuIvliZHnmoTnibnmlYhcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuc3dvcmQueT1maWdodFkrZGlzWS02NDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbGV0IHN3b3JkU0s9dGhpcy5zd29yZC5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2xldCB0dD1zd29yZFNLLnNldEFuaW1hdGlvbigwLFwiXCIsZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBwcmV2QnRuLmdldENvbXBvbmVudChCdG5Ub3dlcikuc2hvd1VubG9ua1Byb2Nlc3MwKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGF5VD0xLjk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0dD1uZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc3dvcmRTSy5zZXRDb21wbGV0ZUxpc3RlbmVyKCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAvLyBwcmV2QnRuLmdldENvbXBvbmVudChCdG5Ub3dlcikuc2hvd1VubG9ua1Byb2Nlc3MxKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBzd29yZFNLLnNldENvbXBsZXRlTGlzdGVuZXIobnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLnN3b3JkLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIGNjLmxvZyhuZXcgRGF0ZSgpLmdldFRpbWUoKS10dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc1k9dGhpcy5nZXREaXNZKC10aGlzLmJ0bl90b3dlci55KTs7XHJcbiAgICAgICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc1k9dGhpcy5nZXREaXNZKC10aGlzLmJ0bl90b3dlci55KTtcclxuICAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgICAgICBsZXQgZGlzWVk9MDtcclxuICAgICAgICAgICAgICAgIGxldCBmaWdodFk9dGhpcy5idG5fdG93ZXIueTtcclxuICAgICAgICAgICAgICAgIGRpc1lZPS1maWdodFk7XHJcbiAgICAgICAgICAgICAgICBkaXNZWT10aGlzLmdldERpc1koZGlzWVkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50Lnk9ZGlzWTtcclxuICAgICAgICAgICAgICAgIC8vIGNjLnR3ZWVuKHRoaXMuY29udGVudCkuZGVsYXkoZGVsYXlUKS50bygwLjUse3k6ZGlzWVl9KS5jYWxsKCgpPT57XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgVG93ZXJNYW5hZ2VyLmlzX3Nob3dfdG93ZXI9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5zd29yZC5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLnN3b3JkLnk9dGhpcy5idG5fdG93ZXIueSt0aGlzLmNvbnRlbnQueS02NFxyXG4gICAgICAgICAgICAgICAgLy8gfSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgICAgIC8v6K6+572u5oiY5paX5YmRXHJcbiAgICAgICAgICAgICAgICAvLyBsZXQgc3dvcmRZPWZpZ2h0WSt0aGlzLmNvbnRlbnQueS02NDsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy/orr7nva7kupFcclxuICAgICAgICAgICAgICAgIC8vIGxldCBqaWFuZ2U9MjAwO1xyXG4gICAgICAgICAgICAgICAgLy8gbGV0IGhoPWNjLndpblNpemUuaGVpZ2h0LzItMTA5O1xyXG4gICAgICAgICAgICAgICAgLy8gbGV0IGNsb3VkTnVtPU1hdGgucm91bmQoKGhoLXN3b3JkWSkvamlhbmdlKTtcclxuICAgICAgICAgICAgICAgIC8vIGZvcihsZXQgaT0xOyBpPD1jbG91ZE51bTsgaSsrKXtcclxuICAgICAgICAgICAgICAgIC8vICAgICBmb3IobGV0IG49MDsgbjw0OyBuKyspe1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICBsZXQgY2xvdWQ9bmV3IGNjLk5vZGUoKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgbGV0IGNsb3VkU3BOYW1lPWklMj9cIlRvd2VyX0Nsb3VkXzBcIjpcIlRvd2VyX0Nsb3VkXzFcIjtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgY2xvdWQuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWU9VG93ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3BCeU5hbWUoY2xvdWRTcE5hbWUpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICBjbG91ZC55PXN3b3JkWStqaWFuZ2UqaStNYXRoLnJhbmRvbSgpKmppYW5nZS81O1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICBjbG91ZC54PS10aGlzLndpbl93aWR0aC8yK2Nsb3VkLndpZHRoLzIqbitNYXRoLnJhbmRvbSgpKmppYW5nZS81O1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICB0aGlzLmNsb3VkX3Jvb3QuYWRkQ2hpbGQoY2xvdWQpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBsZXQgaGhoPSh0aGlzLmNvbnRlbnQuaGVpZ2h0LWNjLndpblNpemUuaGVpZ2h0LzIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50Lnk9LWhoaDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9LGNjLmRpcmVjdG9yLmdldERlbHRhVGltZSgpKTsgICBcclxuICAgICAgICAvL+iuvue9ruaMiemSrlxyXG4gICAgICAgIGxldCBib3R0b209dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdib3R0b20nKVxyXG4gICAgICAgIGxldCBidG5TdGFydD1ib3R0b20uZ2V0Q2hpbGRCeU5hbWUoJ2J0blN0YXJ0JykuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbik7XHJcbiAgICAgICAgbGV0IGlzQ2FuPWxldmVsPD1Ub3dlckxldmVsTWFuYWdlci5nZXRNYXhGbG9vcigpO1xyXG4gICAgICAgIGxldCBtYXRlcmlhbD1pc0Nhbj9jYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoJzJkLXNwcml0ZScpOnRoaXMuZ3JheV9zcGluZTtcclxuICAgICAgICBidG5TdGFydC5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zZXRNYXRlcmlhbCgwLG1hdGVyaWFsKVxyXG4gICAgICAgIGJ0blN0YXJ0LmludGVyYWN0YWJsZT1pc0NhbjtcclxuXHJcbiAgICAgICAgLy8gbGV0IGJ0blRlYW09Ym90dG9tLmdldENoaWxkQnlOYW1lKCdidG5UZWFtJykuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbik7XHJcbiAgICAgICAgLy8gYnRuVGVhbS5pbnRlcmFjdGFibGU9aXNDYW47XHJcbiAgICAgICAgLy8gbGV0IHRleHQ9Ym90dG9tLmdldENoaWxkQnlOYW1lKCd0ZXh0JylcclxuICAgICAgICAvLyB0ZXh0LmNvbG9yPWlzQ2FuP2NjLmNvbG9yKDMzLDg0LDM3KTpjYy5Db2xvci5XSElURTtcclxuICAgIH1cclxuXHJcbiAgICBnZXREaXNZKHk6bnVtYmVyKTpudW1iZXJ7XHJcbiAgICAgICAgbGV0IGRpc1k9eTtcclxuICAgICAgICBsZXQgaGg9Y2Mud2luU2l6ZS5oZWlnaHQvMi0xMDk7XHJcbiAgICAgICAgaWYoZGlzWT4taGgpe1xyXG4gICAgICAgICAgICBkaXNZPS1oaDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGhoaD0odGhpcy5jb250ZW50LmhlaWdodC1jYy53aW5TaXplLmhlaWdodC8yKTtcclxuICAgICAgICBpZihkaXNZPC1oaGgpe1xyXG4gICAgICAgICAgICBkaXNZPS1oaGg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBkaXNZO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHNob3dFbmVteUluZm8oKXtcclxuICAgIC8vICAgICBsZXQgbGV2ZWw9VG93ZXJNYW5hZ2VyLmdldFRvd2VyTGV2ZWwoKTtcclxuICAgIC8vICAgICBpZihsZXZlbD5Ub3dlckxldmVsTWFuYWdlci5nZXRNYXhGbG9vcigpKXtcclxuICAgIC8vICAgICAgICAgcmV0dXJuO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vICAgICAvL+aYvuekuuaAqueJqeS/oeaBr1xyXG4gICAgLy8gICAgIGxldCBsZXZlbERhdGFzPVRvd2VyTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RmlnaHRpbmdJbmZvKGxldmVsKTtcclxuICAgIC8vICAgICBsZXQgd2F2ZU51bT1sZXZlbERhdGFzLmxlbmd0aDtcclxuICAgIC8vICAgICBsZXQgZW5lbXlUeXBlczphbnlbXT1uZXcgQXJyYXkoKTtcclxuICAgIC8vICAgICBsZXQgbWFtPU1vbnN0ZXJBdHRyaWJ1dGVNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAvLyAgICAgLy/nrZvmn6XmgKrniannp43nsbtcclxuICAgIC8vICAgICBmb3IobGV0IHc9MDsgdzx3YXZlTnVtOyB3KyspXHJcbiAgICAvLyAgICAge1xyXG4gICAgLy8gICAgICAgICBsZXQgbGV2ZWxEYXRhPWxldmVsRGF0YXNbd107XHJcbiAgICAvLyAgICAgICAgIGxldCBtb25zdGVyTnVtPWxldmVsRGF0YS5tb25zdGVyX251bTtcclxuICAgIC8vICAgICAgICAgZm9yKGxldCBpPTA7IGk8bW9uc3Rlck51bS5sZW5ndGg7IGkrKylcclxuICAgIC8vICAgICAgICAge1xyXG4gICAgLy8gICAgICAgICAgICAgbGV0IG1JZD1sZXZlbERhdGEubW9uc3Rlcl9pZFtpXTtcclxuICAgIC8vICAgICAgICAgICAgIGlmKG1JZCE9NTAwMDApe1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIGxldCBlbmVteVR5cGU9bWFtLmdldEVuZW15VHlwZShtSWQpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIC8v5p+l5om+5Ye65oul5pyJ5LiA5qC357G75Z6L55qE5LiL5qCHXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgbGV0IGVJbmRleD0tMTtcclxuICAgIC8vICAgICAgICAgICAgICAgICBmb3IobGV0IG49MDtuPGVuZW15VHlwZXMubGVuZ3RoO24rKylcclxuICAgIC8vICAgICAgICAgICAgICAgICB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIGxldCBlRGF0YT1lbmVteVR5cGVzW25dO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBpZihlRGF0YS50eXBlPT1lbmVteVR5cGUpXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGVJbmRleD1uO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgIC8vICAgICAgICAgICAgICAgICBpZihlSW5kZXg9PS0xKVxyXG4gICAgLy8gICAgICAgICAgICAgICAgIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgbGV0IGlzQm9zcz1sZXZlbERhdGEuaXNfYm9zc1tpXTtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgZW5lbXlUeXBlcy5wdXNoKHt0eXBlOmVuZW15VHlwZSxpc0Jvc3M6aXNCb3NzfSk7ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIC8vYm9zcy5wdXNoKGlzQm9zcyk7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgfWVsc2VcclxuICAgIC8vICAgICAgICAgICAgICAgICB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIC8v5om+5Yiw5a+55bqU55qE5L2N572u77yM6K6+572u5Li6Qk9TU1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBpZighZW5lbXlUeXBlc1tlSW5kZXhdLmlzQm9zcylcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGlzQm9zcz1sZXZlbERhdGEuaXNfYm9zc1tpXTtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGlzQm9zcylcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmVteVR5cGVzW2VJbmRleF0uaXNCb3NzPXRydWU7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgICAgICAgICB9ICAgXHJcbiAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgICAgLy/mjpLluo/vvIxib3Nz5Zyo5pyA5YmNXHJcbiAgICAvLyAgICAgZW5lbXlUeXBlcy5zb3J0KChhOmFueSxiOmFueSk9PntcclxuICAgIC8vICAgICAgICAgcmV0dXJuIGIuaXNCb3NzLWEuaXNCb3NzO1xyXG4gICAgLy8gICAgIH0pO1xyXG4gICAgLy8gICAgIGxldCBpbmZvUm9vdD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2luZm9Sb290Jyk7XHJcbiAgICAvLyAgICAgbGV0IGVuZW15Q29udGVudD1pbmZvUm9vdC5nZXRDaGlsZEJ5TmFtZSgnZW5lbXlTY3JvbGxWaWV3JykuZ2V0Q29tcG9uZW50KGNjLlNjcm9sbFZpZXcpLmNvbnRlbnQ7XHJcbiAgICAvLyAgICAgZW5lbXlDb250ZW50LnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcbiAgICAvLyAgICAgLy/lsZXnpLrlhbPljaHmlbBcclxuICAgIC8vICAgICBsZXQgenJMYWJlbD1pbmZvUm9vdC5nZXRDaGlsZEJ5TmFtZSgnenJMYWJlbCcpO1xyXG4gICAgLy8gICAgIHpyTGFiZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9TGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyaW5nKExhbmd1YWdlSW5kZXguRW5lbXlfbGluZXVwKStcIi1cIitsZXZlbCtcIkZcIjtcclxuICAgIC8vICAgICBsZXQgamlhbmdlPTIwO1xyXG4gICAgLy8gICAgIGxldCBpc0ppPWVuZW15VHlwZXMubGVuZ3RoJTI/dHJ1ZTpmYWxzZTtcclxuICAgIC8vICAgICBsZXQgY2VudGVySW5kZXg9TWF0aC5yb3VuZChlbmVteVR5cGVzLmxlbmd0aC8yKTtcclxuICAgIC8vICAgICAvL+WxleekuuaAqueJqeeahOenjeexu1xyXG4gICAgLy8gICAgIGZvcihsZXQgaT0xOyBpPD1lbmVteVR5cGVzLmxlbmd0aDsgaSsrKVxyXG4gICAgLy8gICAgIHtcclxuICAgIC8vICAgICAgICAgbGV0IHR5cGU9ZW5lbXlUeXBlc1tpLTFdLnR5cGU7XHJcbiAgICAvLyAgICAgICAgIGxldCBpc0Jvc3M9ZW5lbXlUeXBlc1tpLTFdLmlzQm9zcztcclxuICAgIC8vICAgICAgICAgbGV0IG1hcEVuZW15PWNjLmluc3RhbnRpYXRlKEVuZW15SWNvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wcmVmYWJfaWNvbik7XHJcbiAgICAvLyAgICAgICAgIG1hcEVuZW15LmdldENvbXBvbmVudChFbmVteUljb24pLmluaXQodHlwZSxpc0Jvc3MpXHJcbiAgICAvLyAgICAgICAgIGVuZW15Q29udGVudC5hZGRDaGlsZChtYXBFbmVteSk7XHJcbiAgICAvLyAgICAgICAgIGxldCB4eD0wO1xyXG4gICAgLy8gICAgICAgICBpZihpc0ppKXtcclxuICAgIC8vICAgICAgICAgICAgIC8v5aWH5pWwXHJcbiAgICAvLyAgICAgICAgICAgICB4eD0oaS1jZW50ZXJJbmRleCkqKG1hcEVuZW15LndpZHRoK2ppYW5nZSlcclxuICAgIC8vICAgICAgICAgfWVsc2V7XHJcbiAgICAvLyAgICAgICAgICAgICAvL+WBtuaVsFxyXG4gICAgLy8gICAgICAgICAgICAgeHg9KGktY2VudGVySW5kZXgpKihtYXBFbmVteS53aWR0aCtqaWFuZ2UpLShtYXBFbmVteS53aWR0aCtqaWFuZ2UpLzI7XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgbWFwRW5lbXkueD14eDtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy/mmL7npLrmjILmnLrlpZblirHnmoTliJfooahcclxuICAgIHNob3dSZXdhcmRMaXN0KCl7XHJcbiAgICAgICAgbGV0IGxldmVsPVRvd2VyTWFuYWdlci5nZXRUb3dlckxldmVsKCk7XHJcbiAgICAgICAgaWYobGV2ZWw+VG93ZXJMZXZlbE1hbmFnZXIuZ2V0TWF4Rmxvb3IoKSl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gbGV0IGluZm9Sb290PXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnaW5mb1Jvb3QnKTtcclxuICAgICAgICAvLyBsZXQgcmV3YXJkU2Nyb2xsdmlldz1pbmZvUm9vdC5nZXRDaGlsZEJ5TmFtZSgncmV3YXJkU2Nyb2xsdmlldycpLmdldENvbXBvbmVudChjYy5TY3JvbGxWaWV3KTtcclxuICAgICAgICAvLyBsZXQgY29udGVudD1yZXdhcmRTY3JvbGx2aWV3LmNvbnRlbnQ7XHJcbiAgICAgICAgLy8gY29udGVudC5yZW1vdmVBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgIC8vIGxldCBudW1Sb290PWNvbnRlbnQucGFyZW50LmdldENoaWxkQnlOYW1lKCdudW1fcm9vdCcpO1xyXG4gICAgICAgIC8vIG51bVJvb3QucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICAvLyBsZXQgZXF1aXBSb290PWNvbnRlbnQucGFyZW50LmdldENoaWxkQnlOYW1lKCdlcXVpcF9yb290Jyk7XHJcbiAgICAgICAgLy8gZXF1aXBSb290LnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgLy/mt7vliqDph5HluIHnrYnotYTmupDliJfooahcclxuICAgICAgICAvLyBsZXQganNvbkRhdGE9VG93ZXJSZXdhcmRNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvblRvd2VyUmV3YXJkKGxldmVsKTsgICAgICAgIFxyXG4gICAgICAgIC8vIGxldCBjb2luTnVtPWpzb25EYXRhLkNvaW47XHJcbiAgICAgICAgLy8gbGV0IGhlcm9FeHBOdW09anNvbkRhdGEuSGVyb0V4cDtcclxuICAgICAgICAvLyBsZXQgZ2VtTnVtPWpzb25EYXRhLkdlbTtcclxuICAgICAgICAvLyBsZXQgaXRlbU51bT0wO1xyXG4gICAgICAgIC8vIGxldCBpdGVtSWQ9anNvbkRhdGEuQWRJdGVtO1xyXG4gICAgICAgIC8vIGlmKGpzb25EYXRhLkFkSXRlbSl7XHJcbiAgICAgICAgLy8gICAgIGl0ZW1OdW09anNvbkRhdGEuQWRJdGVtTnVtO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvL+mHkeW4geahhlxyXG4gICAgICAgIC8vIHRoaXMuY3JlYXRlV3VwaW4oMCxjb2luTnVtKTtcclxuICAgICAgICAvLyB0aGlzLmNyZWF0ZVd1cGluKDEsaGVyb0V4cE51bSk7XHJcbiAgICAgICAgLy8gdGhpcy5jcmVhdGVXdXBpbigyLGdlbU51bSk7XHJcbiAgICAgICAgLy/mt7vliqDoo4XlpIfliJfooahcclxuICAgICAgICAvLyBmb3IobGV0IGk9MDtpPGl0ZW1OdW07aSsrKXtcclxuICAgICAgICAvLyAgICAgLy/oo4XlpIfmoYZcclxuICAgICAgICAvLyAgICAgbGV0IGt1YW5nPXRoaXMuY3JlYXRlS3VhbmcoMik7XHJcbiAgICAgICAgLy8gICAgIGNvbnRlbnQuYWRkQ2hpbGQoa3VhbmcpO1xyXG4gICAgICAgIC8vICAgICBsZXQgaXRlbT1FcXVpcG1lbnRNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RXF1aXBOb2RlQnlJZChpdGVtSWQpO1xyXG4gICAgICAgIC8vICAgICBpdGVtLmFkZENvbXBvbmVudChGaXhlZFBvcykuaW5pdChrdWFuZyxjYy52MigwLDApLGNvbnRlbnQpO1xyXG4gICAgICAgIC8vICAgICBlcXVpcFJvb3QuYWRkQ2hpbGQoaXRlbSk7ICAgICAgICAgICAgXHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICAvLyBsZXQgamlhbmdlPTIwO1xyXG4gICAgICAgIC8vIGxldCBpc0ppPWNvbnRlbnQuY2hpbGRyZW5Db3VudCUyP3RydWU6ZmFsc2U7XHJcbiAgICAgICAgLy8gbGV0IGNlbnRlckluZGV4PU1hdGgucm91bmQoY29udGVudC5jaGlsZHJlbkNvdW50LzIpOyAgICAgICAgXHJcbiAgICAgICAgLy8gLy/lsZXnpLrmgKrniannmoTnp43nsbtcclxuICAgICAgICAvLyBmb3IobGV0IGk9MTsgaTw9Y29udGVudC5jaGlsZHJlbkNvdW50OyBpKyspXHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgIC8vICAgICBsZXQgaXRlbT1jb250ZW50LmNoaWxkcmVuW2ktMV07XHJcbiAgICAgICAgLy8gICAgIGxldCB4eD0wO1xyXG4gICAgICAgIC8vICAgICBpZihpc0ppKXtcclxuICAgICAgICAvLyAgICAgICAgIC8v5aWH5pWwXHJcbiAgICAgICAgLy8gICAgICAgICB4eD0oaS1jZW50ZXJJbmRleCkqKGl0ZW0ud2lkdGgramlhbmdlKVxyXG4gICAgICAgIC8vICAgICB9ZWxzZXtcclxuICAgICAgICAvLyAgICAgICAgIC8v5YG25pWwXHJcbiAgICAgICAgLy8gICAgICAgICB4eD0oaS1jZW50ZXJJbmRleCkqKGl0ZW0ud2lkdGgramlhbmdlKS0oaXRlbS53aWR0aCtqaWFuZ2UpLzI7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyAgICAgaXRlbS54PXh4O1xyXG4gICAgICAgIC8vIH1cclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVXdXBpbihrdWFuZ0luZGV4Om51bWJlcixudW06bnVtYmVyKTpjYy5Ob2Rle1xyXG4gICAgICAgIGxldCBpbmZvUm9vdD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2luZm9Sb290Jyk7XHJcbiAgICAgICAgbGV0IGNvbnRlbnQ9aW5mb1Jvb3QuZ2V0Q2hpbGRCeU5hbWUoJ3Jld2FyZFNjcm9sbHZpZXcnKS5nZXRDb21wb25lbnQoY2MuU2Nyb2xsVmlldykuY29udGVudDtcclxuICAgICAgICBsZXQgbnVtUm9vdD1jb250ZW50LnBhcmVudC5nZXRDaGlsZEJ5TmFtZSgnbnVtX3Jvb3QnKTtcclxuICAgICAgICAvL+ahhlxyXG4gICAgICAgIGxldCBrdWFuZz10aGlzLmNyZWF0ZUt1YW5nKGt1YW5nSW5kZXgpOyAgICAgICAgICAgICAgIFxyXG4gICAgICAgIGxldCBub2RlPW5ldyBjYy5Ob2RlKCk7XHJcbiAgICAgICAgbm9kZS5hZGRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZT10aGlzLnNwX3d1cGluW2t1YW5nSW5kZXhdO1xyXG4gICAgICAgIGt1YW5nLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgIGxldCBudW1MYWJlbD1jYy5pbnN0YW50aWF0ZSh0aGlzLnByZWZhYl9udW0pO1xyXG4gICAgICAgIG51bUxhYmVsLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPU15VG9vbC5nZXRDb2luRGFud2VpKG51bSk7XHJcbiAgICAgICAgbnVtTGFiZWwuc2V0QW5jaG9yUG9pbnQoY2MudjIoMCwwLjUpKTtcclxuICAgICAgICBudW1MYWJlbC5nZXRDb21wb25lbnQoRml4ZWRQb3MpLmluaXQoa3VhbmcsY2MudjIoLTE2LC0zMi41KSxjb250ZW50KTtcclxuICAgICAgICBudW1Sb290LmFkZENoaWxkKG51bUxhYmVsKTsgICAgICAgIFxyXG4gICAgICAgIGNvbnRlbnQuYWRkQ2hpbGQoa3VhbmcpO1xyXG4gICAgICAgIHN3aXRjaChrdWFuZ0luZGV4KXtcclxuICAgICAgICAgICAgY2FzZSAwOntcclxuICAgICAgICAgICAgICAgIGt1YW5nLm5hbWU9XCJjb2luXCI7IFxyXG4gICAgICAgICAgICAgICAgbm9kZS5uYW1lPVwiY29pblwiOyBcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVLdWFuZyhrdWFuZ0luZGV4Om51bWJlcik6Y2MuTm9kZXtcclxuICAgICAgICBsZXQga3Vhbmc9bmV3IGNjLk5vZGUoKTtcclxuICAgICAgICBrdWFuZy5hZGRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZT10aGlzLnNwX2t1YW5nW2t1YW5nSW5kZXhdO1xyXG4gICAgICAgIHJldHVybiBrdWFuZztcclxuICAgIH1cclxuICAgIFxyXG5cclxuICAgIGNsaWNrQnRuSGVscCgpe1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgLy8gbGV0IGhlbHA9Y2MuaW5zdGFudGlhdGUodGhpcy5wcmVmYWJfaGVscCk7XHJcbiAgICAgICAgLy8gdGhpcy5ub2RlLmFkZENoaWxkKGhlbHApO1xyXG4gICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dIZWxwVGlwc1VpKG51bGwsODEwMDAxLFs4MTAwMDIsODEwMDAzXSk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5DbG9zZSgpe1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgVG93ZXJNYW5hZ2VyLmlzX3Nob3dfdG93ZXI9ZmFsc2U7XHJcbiAgICAgICAgc3VwZXIub25DbG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuRm9ybWFpdG9uKCl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLlRvUGxheSxVSUxheWVyTGV2ZWwuT25lLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+IHtcclxuICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChUb1BsYXlNYWluVWkpLmluaXQobnVsbCk7XHJcbiAgICAgICAgfSx9KVxyXG4gICAgICAgIC8vIGxldCB0ZWFtPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgndGVhbV9zZWxlY3RfdWknKTtcclxuICAgICAgICAvLyBpZih0ZWFtKXtcclxuICAgICAgICAvLyAgICAgdGVhbS5hY3RpdmU9IXRlYW0uYWN0aXZlO1xyXG4gICAgICAgIC8vICAgICBsZXQgYm90dG9tPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJvdHRvbVwiKTtcclxuICAgICAgICAvLyAgICAgbGV0IHRleHQ9Ym90dG9tLmdldENoaWxkQnlOYW1lKFwidGV4dFwiKS5nZXRDb21wb25lbnQoTGFiZWxMYW5ndWFnZSk7XHJcbiAgICAgICAgLy8gICAgIGxldCBpbmRleD10ZWFtLmFjdGl2ZT9MYW5ndWFnZUluZGV4LkNsb3NlOkxhbmd1YWdlSW5kZXguRm9ybWF0aW9uO1xyXG4gICAgICAgIC8vICAgICBsZXQgYnRuVGVhbT1ib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJidG5UZWFtXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG4gICAgICAgIC8vICAgICBidG5UZWFtLnNwcml0ZUZyYW1lPXRoaXMuc3BfYnRuW3RlYW0uYWN0aXZlPzA6MV07XHJcbiAgICAgICAgLy8gICAgIHRleHQuc2V0TGFuZ3VhZ2VJbmRleChpbmRleCk7XHJcbiAgICAgICAgLy8gICAgIGxldCBpbmZvUm9vdD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2luZm9Sb290Jyk7XHJcbiAgICAgICAgLy8gICAgIGluZm9Sb290LmFjdGl2ZT10ZWFtLmFjdGl2ZTtcclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRHYW1lKCl7XHJcbiAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLueIrOWhlOavj+WxguaMkeaImOasoeaVsCtUb3dlck1hbmFnZXIuZ2V0VG93ZXJMZXZlbCgpKTtcclxuICAgICAgICBsZXQgZ209R2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBnbS5maWdodGluZ19pbmZvPVRvd2VyTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RmlnaHRpbmdJbmZvKFRvd2VyTWFuYWdlci5nZXRUb3dlckxldmVsKCkpOyAgICAgICAgXHJcbiAgICAgICAgbGV0IGJnTG9hZGluZz1VSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRMb2FkaW5nTm9kZSgpO1xyXG4gICAgICAgIGJnTG9hZGluZy5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICBsZXQgbG9hZGluZ0Jhcj1iZ0xvYWRpbmcuZ2V0Q2hpbGRCeU5hbWUoJ1Byb2dyZXNzQmFyJykuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKTtcclxuICAgICAgICBsZXQgbG9hZExhYmVsPWxvYWRpbmdCYXIubm9kZS5nZXRDaGlsZEJ5TmFtZSgnbG9hZExhYmVsJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICBjYy5kaXJlY3Rvci5wcmVsb2FkU2NlbmUoR2FtZVNjZW5lLmdhbWUsKGNvbXBsZXRlZENvdW50OiBudW1iZXIsIHRvdGFsQ291bnQ6IG51bWJlciwgaXRlbTogYW55KT0+e1xyXG4gICAgICAgICAgICAvL+ecn+Wunui/m+W6plxyXG4gICAgICAgICAgICBsZXQgcHJvZ3Jlc3NUcnVlPWNvbXBsZXRlZENvdW50L3RvdGFsQ291bnQ7XHJcbiAgICAgICAgICAgIC8v5YGH55qE6L+b5bqmXHJcbiAgICAgICAgICAgIGxldCBwcm9ncmVzc0ZhbHNlPXByb2dyZXNzVHJ1ZS8yO1xyXG4gICAgICAgICAgICBsb2FkaW5nQmFyLnByb2dyZXNzID0gcHJvZ3Jlc3NGYWxzZTtcclxuICAgICAgICAgICAgbG9hZExhYmVsLnN0cmluZz0obG9hZGluZ0Jhci5wcm9ncmVzcyoxMDApLnRvRml4ZWQoMCkrJyUnO1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9sb2FkX3Byb2dyZXNzPXByb2dyZXNzRmFsc2U7XHJcbiAgICAgICAgICAgIC8vdGhpcy5sb2FkaW5nX2xpZ2h0LnggPSB0aGlzLmxvYWRpbmdfYmFyLnByb2dyZXNzKnRoaXMubG9hZGluZ19iYXIudG90YWxMZW5ndGgtdGhpcy5sb2FkaW5nX2Jhci50b3RhbExlbmd0aC8yO1xyXG4gICAgICAgIH0sKCk9PntcclxuICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKEdhbWVTY2VuZS5nYW1lKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjbGlja0J0blN0YXJ0KCl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBpZihUb3dlck1hbmFnZXIuZ2V0VG9kYXlQYXNzTnVtKCk+PTIwKXtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZSgnJyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoVG93ZXJNYW5hZ2VyLmdldFRvd2VyTGV2ZWwoKTw9VG93ZXJMZXZlbE1hbmFnZXIuZ2V0TWF4Rmxvb3IoKSl7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRHYW1lKCk7XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLy8gcHJvdGVjdGVkIHVwZGF0ZShkdDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAvLyAgICAgZm9yKGxldCBpPTA7IGk8dGhpcy5jbG91ZF9yb290LmNoaWxkcmVuQ291bnQ7IGkrKyl7XHJcbiAgICAvLyAgICAgICAgIGxldCBjPXRoaXMuY2xvdWRfcm9vdC5jaGlsZHJlbltpXTtcclxuICAgIC8vICAgICAgICAgYy54LT1kdCooTWF0aC5yYW5kb20oKSoxMCs0MCk7XHJcbiAgICAvLyAgICAgICAgIGlmKGMueDwtKGMud2lkdGgvMit0aGlzLndpbl93aWR0aCkpe1xyXG4gICAgLy8gICAgICAgICAgICAgYy54PWMud2lkdGgvMit0aGlzLndpbl93aWR0aDtcclxuICAgIC8vICAgICAgICAgICAgIGxldCBjbG91ZFNwTmFtZT1NYXRoLnJhbmRvbSgpPjAuNT9cIlRvd2VyX0Nsb3VkXzBcIjpcIlRvd2VyX0Nsb3VkXzFcIjtcclxuICAgIC8vICAgICAgICAgICAgIGMuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWU9VG93ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3BCeU5hbWUoY2xvdWRTcE5hbWUpO1xyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gICAgIGlmKHRoaXMuYnRuX3Rvd2VyJiZUb3dlck1hbmFnZXIuaXNfc2hvd190b3dlcj09ZmFsc2Upe1xyXG4gICAgLy8gICAgICAgICB0aGlzLnN3b3JkLnk9dGhpcy5idG5fdG93ZXIueSt0aGlzLmNvbnRlbnQueS02NFxyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH1cclxuXHJcbn1cclxuIl19