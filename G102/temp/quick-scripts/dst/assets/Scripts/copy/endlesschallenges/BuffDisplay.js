
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/copy/endlesschallenges/BuffDisplay.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'dc5ecsHGPBFFrwRMnWQkTa7', 'BuffDisplay');
// Scripts/copy/endlesschallenges/BuffDisplay.ts

"use strict";
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
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
var ApkManager_1 = require("../../Ads/ApkManager");
var CoinPop_1 = require("../../CoinPop");
var Constants_1 = require("../../Constants");
var GameManager_1 = require("../../GameManager");
var HeroManager_1 = require("../../Hero/Data/HeroManager");
var FollowConstants_1 = require("../../multiLanguage/FollowConstants");
var FollowManager_1 = require("../../multiLanguage/FollowManager");
var LanguageManager_1 = require("../../multiLanguage/LanguageManager");
var TextLanguage_1 = require("../../multiLanguage/TextLanguage");
var PropConfig_1 = require("../../Prop/PropConfig");
var PropManager_1 = require("../../Prop/PropManager");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var MyTool_1 = require("../../Tools/MyTool");
var UIComponent_1 = require("../../UI/UIComponent");
var UIConfig_1 = require("../../UI/UIConfig");
var UIManager_1 = require("../../UI/UIManager");
var WallManager_1 = require("../../Wall/WallManager");
var EndlessBuff_1 = require("./EndlessBuff");
var EndlessConfig_1 = require("./EndlessConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BuffDisplay = /** @class */ (function (_super) {
    __extends(BuffDisplay, _super);
    function BuffDisplay() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bt = null; //标题
        _this.RichText = null; //再刷新几次必含史诗级品质以上技能
        _this.btnad = null; //广告获得
        _this.btnshow = null; //钻石获得
        _this.Common_Window3_1 = null; //框
        _this.BossRush_Line1 = null; //框
        _this.BossRush_Line2 = null; //框
        _this.text = null; //文字
        _this.xiatext = null; //底部文字
        _this.Common_Btn_Close = null; //关闭按钮
        _this.Common_Window3_2 = null; //标题背景
        _this.Endless = null; //buff父节点
        _this.Endless_Frame = null; //英雄头像父节点
        _this.Endless_List = null; //已选择buff父节点
        _this.Endless_List_suo = null; //已选择buff  锁父节点
        _this.Label = null; //底部文字
        _this.bg1 = null; //遮罩
        _this.Tipspop = null; //确认关闭弹窗，
        _this.type = 0; //0:Buff展示   1：Buff选择
        _this.num = null;
        _this.Buff = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]; //这个位置是否有技能
        //Buff:number[][]=[[0,0,0,0],[1,0,0,0],[1,1,0,0],[1,1,1,0],[1,1,1,1]]//这个位置是否有技能
        //[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]//这个位置是否有技能
        //Buff:number[][]=[[0,0,0,0],[301,0,0,0],[401,302,0,0],[501,402,502,0],[302,303,304,201]]//这个位置是否有技能
        _this.EndlessBuff = null; //buff技能的预制体
        _this.copy_ui = null; //buff技能的图片图集   EndlessBuff_201
        _this.SkillDescription = null; //技能描述
        _this.EndlessBuff1 = null; //移动的buff
        _this.Endless_Light = null; //发光的框
        _this.RaffleNumber = 3; //抽奖次数  默认五次
        _this.surplustxt = null; //剩余buff几次选择机会
        _this.mttexiao = null; //特效父节点
        _this.texiao = null; //特效节点
        return _this;
    }
    BuffDisplay_1 = BuffDisplay;
    BuffDisplay.prototype.initUi = function (type) {
        // GameManager.getInstance().music_manager.playMusic(MusicIndex.BGM_TJP);
        // FollowManager.getInstance().followEvent(Follow_Type.铁匠铺打开次数);
        this.RaffleNumber = 3;
        this.SkillDescription.active = false;
        this.SkillDescription.getChildByName("Common_TextBG").active = false;
        this.Endless_Light.active = false;
        this.EndlessBuff1.active = false;
        var id = 800024;
        this.type = type;
        this.clickBtnTipspop();
        this.surplustxt.active = false;
        if (type == 0) {
            id = 800024;
            this.RichText.active = false;
            this.btnad.active = false;
            this.btnshow.active = false;
            this.Common_Window3_1.height = 600;
            this.Common_Window3_1.y = -8;
            this.Common_Btn_Close.y = 279;
            this.Common_Window3_2.y = 285;
            this.bt.y = 285;
            this.BossRush_Line1.active = false;
            this.BossRush_Line2.active = false;
            this.text.active = false;
            this.Label.active = true;
            this.bg1.active = false;
            this.Endless.active = false;
            this.xiatext.active = false;
        }
        else if (type == 1) {
            id = 800020;
            this.RichTextRefresh();
            this.RichText.active = true;
            this.btnad.active = true;
            this.btnshow.active = true;
            this.Common_Window3_1.height = 970;
            this.Common_Window3_1.y = 10;
            this.Common_Btn_Close.y = 485;
            this.Common_Window3_2.y = 491;
            this.bt.y = 491;
            this.BossRush_Line1.active = true;
            this.BossRush_Line2.active = true;
            this.text.active = true;
            this.Label.active = false;
            this.bg1.active = true;
            this.xiatext.active = true;
            for (var index = 0; index < this.Endless.children.length; index++) {
                this.Endless.children[index].active = true;
            }
            //刷新三个buff
            this.Refresh();
            this.Endless.active = true;
            this.num.getComponent(cc.Label).string = "" + 200;
        }
        this.bt.getComponent(TextLanguage_1.default).setTextId(id);
        this.RefreshBuff();
    };
    BuffDisplay.prototype.RichTextRefresh = function () {
        var txt = LanguageManager_1.default.getInstance().getStrByTextId(800022);
        txt = txt.replace('~', "" + this.RaffleNumber);
        this.RichText.getComponent(cc.RichText).string = txt;
    };
    //刷新锁的状态
    BuffDisplay.prototype.Unlock = function () {
        var teamList = HeroManager_1.HeroManager.getInstance().getTeamList(GameManager_1.default.getInstance().cur_game_mode);
        // console.log("++++++++",teamList)
        for (var i = 0; i < teamList.length; i++) {
            var heroType = teamList[i];
            if (heroType > 0) {
                if (this.Endless_Frame.children[i].childrenCount < 2) {
                    var item = PropManager_1.PropManager.getInstance().createPropItem(110000 + teamList[i], 0);
                    item.scale = 0.8;
                    item.parent = this.Endless_Frame.children[i];
                }
                //buff的锁    如果这个位置有buff   那么这个位置下面一个位置的锁打开   如果这个地方有英雄  默认第一个位置开
                for (var index = 0; index < this.Buff[i].length; index++) {
                    if (this.Buff[i][index] == 0 && index == 0) {
                        this.Endless_List_suo.children[i].children[index].active = false;
                    }
                    if (this.Buff[i][index] > 0) {
                        this.Endless_List_suo.children[i].children[index].active = false;
                        if (index < (this.Buff[i].length - 1)) {
                            this.Endless_List_suo.children[i].children[index + 1].active = false;
                        }
                    }
                }
            }
        }
    };
    BuffDisplay.prototype.clickBtnEndlessBuffDetails = function (even, i) {
        var id = Number(i);
        if (id > 1000) {
            // console.log("是上面的三个，不显示详情",id/10000)
        }
        else {
            // console.log("是底下的，显示详情",id)
            this.SkillDescription.x = 0;
            if (even.currentTarget.parent.x < 0) {
                this.SkillDescription.x = (even.currentTarget.parent.x);
            }
            if (even.currentTarget.parent.x > 0) {
                this.SkillDescription.x = (even.currentTarget.parent.x);
            }
            this.SkillDescription.y = (even.currentTarget.parent.y + 10);
            this.SkillDescription.active = true;
            var Parameter = EndlessBuff_1.EndlessBuffManager.getInstance().getParameter(id);
            var Type = EndlessBuff_1.EndlessBuffManager.getInstance().getType(id);
            var spriteid = 801000 + Type;
            this.SkillDescription.getChildByName("bt").getComponent(TextLanguage_1.default).setTextId(spriteid);
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
            if (Type == 1 || Type == 2 || Type == 4 || Type == 5 || Type == 6 || Type == 7 || Type == 8 || Type == 9 || Type == 10 || Type == 11) {
                var sParameter = Parameter * 100;
                this.SkillDescription.getChildByName("bt").getComponent(TextLanguage_1.default).setReplaceValue('~', MyTool_1.default.numberFormat(sParameter, 2) + '%');
            }
            else {
                this.SkillDescription.getChildByName("bt").getComponent(TextLanguage_1.default).setReplaceValue('~', Parameter + '');
            }
            this.scheduleOnce(function () {
                this.SkillDescription.getChildByName("Common_TextBG").active = true;
            }, 0.0001);
        }
    };
    BuffDisplay.prototype.onHeroTouchStart = function (e) {
        var touchTeam = e.getCurrentTarget();
        var pos = this.node.convertToNodeSpaceAR(e.getLocation());
        this.EndlessBuff1.active = true;
        this.EndlessBuff1.setPosition(pos);
        this.EndlessBuff1.getComponent(cc.Sprite).spriteFrame = touchTeam.getComponent(cc.Sprite).spriteFrame;
        touchTeam.getComponent(cc.Sprite).enabled = false;
        // console.log("当手指触摸到屏幕时",pos)
    };
    BuffDisplay.prototype.onHeroTouchMove = function (e) {
        var touchTeam = e.getCurrentTarget();
        var pos = this.node.convertToNodeSpaceAR(e.getLocation());
        this.EndlessBuff1.setPosition(pos);
        // console.log("当手指在屏幕上移动时",pos)
        this.HeroTouch(touchTeam, pos, 0);
    };
    BuffDisplay.prototype.onHeroTouchEnd = function (e) {
        var touchTeam = e.getCurrentTarget();
        // console.log("当手指在目标节点区域内离开屏幕时",touchTeam)
        this.EndlessBuff1.active = false;
        touchTeam.getComponent(cc.Sprite).enabled = true;
    };
    //是否在框的范围内   可以被放置    出现发光的框
    BuffDisplay.prototype.HeroTouch = function (touchTeam, pos, type) {
        for (var i = 0; i < this.Endless_List.children.length; i++) {
            for (var j = 0; j < this.Endless_List.children[i].children.length; j++) {
                //四个buff满了之后才能更换buff
                // if (this.Endless_List_suo.children[i].children[j].active==false&&(this.Buff[i][j]==0||(this.Buff[i][0]!=0&&this.Buff[i][1]!=0&&this.Buff[i][2]!=0&&this.Buff[i][3]!=0))) {
                if (this.Endless_List_suo.children[i].children[j].active == false) {
                    var id = Number(touchTeam.getComponent(cc.Button).clickEvents[0].customEventData) / 10000;
                    var Rarity = EndlessBuff_1.EndlessBuffManager.getInstance().getRarity(id); //自己的强度
                    var Type = EndlessBuff_1.EndlessBuffManager.getInstance().getType(id); //自己的类型
                    var Samenot = 0;
                    var therRarity = 0; //放在上面的buff的强度
                    var indexj = -1;
                    for (var index = 0; index < this.Buff[i].length; index++) {
                        if (this.Buff[i][index] > 0) {
                            var therType = EndlessBuff_1.EndlessBuffManager.getInstance().getType(this.Buff[i][index]);
                            if (therType == Type) { //有跟我自己一样的类型
                                indexj = index;
                                therRarity = EndlessBuff_1.EndlessBuffManager.getInstance().getRarity(this.Buff[i][index]); //放在上面的buff的强度
                                Samenot = 1;
                            }
                        }
                    }
                    // if(Samenot==0){
                    var size = this.Endless_List.children[i].children[j].getContentSize();
                    var poss = this.Endless_List.children[i].children[j].getPosition();
                    var mypos = cc.rect(poss.x - size.width / 2, poss.y - size.height / 2, size.width, size.height);
                    if (mypos.contains(pos) == true) {
                        // if(this.Buff[i][0]!=0&&this.Buff[i][1]!=0&&this.Buff[i][2]!=0&&this.Buff[i][3]!=0){//四个位置都满了
                        if (indexj == j) { //要放在同一个位置
                            if (therRarity < Rarity) { //放在上面的类型强度比我自己的类型小
                                Samenot = 0;
                            }
                        }
                        // }
                        if (Samenot == 0) {
                            if (type == 0) { //移动时
                                this.Endless_Light.x = poss.x;
                                this.Endless_Light.y = poss.y;
                                this.Endless_Light.active = true;
                                return;
                            }
                            else if (type == 1) { //放置时
                                this.EndlessBuff1.active = false;
                                var teamList = HeroManager_1.HeroManager.getInstance().getTeamList(GameManager_1.default.getInstance().cur_game_mode);
                                if (this.Buff[i][j] > 0) {
                                    GameManager_1.default.getInstance().getHero(teamList[i]).removeEndlessBuff(this.Buff[i][j]);
                                }
                                this.Buff[i][j] = id;
                                var endlessBuff = new EndlessConfig_1.EndlessBuff;
                                var Type_1 = EndlessBuff_1.EndlessBuffManager.getInstance().getType(id);
                                var Rarity_1 = EndlessBuff_1.EndlessBuffManager.getInstance().getRarity(id);
                                var Parameter = EndlessBuff_1.EndlessBuffManager.getInstance().getParameter(id);
                                FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.无尽挑战_不同ID的buff装备次数 + id);
                                if (Type_1 == 8) {
                                    this.Buff[i][j] = 0;
                                    var hp = (Parameter * WallManager_1.default.getInstance().getMainWall().getMaxHp());
                                    // console.log("城墙加血:",hp,WallManager.getInstance().getMainWall().getCurHp(),WallManager.getInstance().getMainWall().getMaxHp(),Parameter)
                                    WallManager_1.default.getInstance().getMainWall().changeHpByEndless(hp);
                                    GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getStrByTextId(800026), 2);
                                }
                                else {
                                    endlessBuff.type = Type_1;
                                    endlessBuff.id = id;
                                    endlessBuff.rarity = Rarity_1;
                                    endlessBuff.value = Parameter;
                                    GameManager_1.default.getInstance().getHero(teamList[i]).addEndlessBuff(endlessBuff); //添加一个buff
                                }
                                touchTeam.parent.parent.active = false;
                                this.Endless_Light.active = false;
                                this.RefreshBuff();
                                if (this.Endless.children[0].active == false && this.Endless.children[1].active == false && this.Endless.children[2].active == false) {
                                    //刷新下一波
                                    this.destroySelf();
                                }
                                return;
                            }
                        }
                        else {
                            if (type == 1) { //放置时    每位英雄只能装备一个同类型技能   800033
                                GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getStrByTextId(800033), 1.5);
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
        if (type == 0) {
            this.Endless_Light.active = false;
        }
        else if (type == 1) {
        }
    };
    BuffDisplay.prototype.onHeroTouchCancel = function (e) {
        var touchTeam = e.getCurrentTarget();
        var pos = this.node.convertToNodeSpaceAR(e.getLocation());
        // console.log("当手指在目标节点区域外离开屏幕时",pos)
        this.EndlessBuff1.active = false;
        this.EndlessBuff1.setPosition(pos);
        touchTeam.getComponent(cc.Sprite).enabled = true;
        this.HeroTouch(touchTeam, pos, 1);
    };
    BuffDisplay.prototype.RefreshBuff = function () {
        // let teamList=HeroManager.getInstance().getTeamList(GameManager.getInstance().cur_game_mode);
        for (var i = 0; i < this.Buff.length; i++) {
            for (var j = 0; j < this.Buff[j].length; j++) {
                if (this.Buff[i][j] > 0) {
                    var item = void 0;
                    if (this.Endless_List.children[i].children[j].childrenCount == 0) {
                        item = cc.instantiate(this.EndlessBuff);
                    }
                    else {
                        item = this.Endless_List.children[i].children[j].children[0];
                    }
                    item.scale = 0.7;
                    item.active = true;
                    item.getComponent(cc.Sprite).spriteFrame = this.copy_ui.getSpriteFrame("EndlessBuff_" + this.Buff[i][j]);
                    item.getComponent(cc.Button).clickEvents[0].customEventData = "" + this.Buff[i][j];
                    item.parent = this.Endless_List.children[i].children[j];
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
        this.Unlock();
    };
    BuffDisplay.prototype.Refresh = function () {
        // console.log("刷新",EndlessBuffManager.getInstance().getThreeWeight())
        var id = EndlessBuff_1.EndlessBuffManager.getInstance().getThreeWeight();
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.无尽挑战_不同ID的buff的获取次数 + id[0]);
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.无尽挑战_不同ID的buff的获取次数 + id[1]);
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.无尽挑战_不同ID的buff的获取次数 + id[2]);
        if (this.RaffleNumber == 0) {
            this.RaffleNumber = 3;
            var or = EndlessBuff_1.EndlessBuffManager.getInstance().getWeightOrange(); //每五次  得到一个橙色及以上的buff
            var Isthereany = 0;
            var sequence = [];
            for (var index = 0; index < this.Endless.children.length; index++) {
                if (this.Endless.children[index].active == true) {
                    var Rarity = EndlessBuff_1.EndlessBuffManager.getInstance().getRarity(id[index]);
                    if (Rarity >= 4) {
                        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.无尽挑战_刷新buff时触发保底的次数);
                        Isthereany = 1;
                    }
                    else {
                        sequence.push(index);
                    }
                }
            }
            if (Isthereany == 0) {
                var rom = MyTool_1.default.random(0, (sequence.length - 1));
                id[sequence[rom]] = or;
            }
        }
        if (BuffDisplay_1.surplusnumber > -1) {
            this.surplustxt.active = true;
            this.surplustxt.getComponent(TextLanguage_1.default).setTextId(800030); //本轮还剩多少次选择buff的机会
            if (BuffDisplay_1.surplusnumber > 0) {
                this.Refreshsurplusnumber(BuffDisplay_1.surplusnumber); //刷新BuffDisplay.surplusnumber*3个buff出来
                BuffDisplay_1.surplusnumber = 0;
            }
            // BuffDisplay.surplusnumber=0
            this.surplustxt.getComponent(TextLanguage_1.default).setReplaceValue('~', BuffDisplay_1.surplusnumber + '');
        }
        // console.log("++++++++",or)
        this.RichTextRefresh();
        for (var index = 0; index < this.Endless.children.length; index++) {
            if (this.Endless.children[index].active == true) {
                var item = void 0;
                if (this.Endless.children[index].getChildByName("item").childrenCount == 0) {
                    item = cc.instantiate(this.EndlessBuff);
                    item.getComponent(cc.Button).enabled = false;
                    item.on(cc.Node.EventType.TOUCH_START, this.onHeroTouchStart, this);
                    item.on(cc.Node.EventType.TOUCH_MOVE, this.onHeroTouchMove, this);
                    item.on(cc.Node.EventType.TOUCH_END, this.onHeroTouchEnd, this);
                    item.on(cc.Node.EventType.TOUCH_CANCEL, this.onHeroTouchCancel, this);
                }
                else {
                    item = this.Endless.children[index].getChildByName("item").children[0];
                }
                var Rarity = EndlessBuff_1.EndlessBuffManager.getInstance().getRarity(id[index]);
                var Type = EndlessBuff_1.EndlessBuffManager.getInstance().getType(id[index]);
                var Parameter = EndlessBuff_1.EndlessBuffManager.getInstance().getParameter(id[index]);
                item.getComponent(cc.Sprite).spriteFrame = this.copy_ui.getSpriteFrame("EndlessBuff_" + id[index]);
                item.getComponent(cc.Button).clickEvents[0].customEventData = "" + (id[index] * 10000);
                item.active = true;
                //灰  绿   蓝   紫    黄    红
                var color = [new cc.Color(99, 99, 99), new cc.Color(113, 100, 59), new cc.Color(28, 98, 176), new cc.Color(150, 30, 168), new cc.Color(193, 114, 0), new cc.Color(188, 36, 31)];
                var txt = this.Endless.children[index].getChildByName("text");
                txt.color = color[Rarity];
                txt.getComponent(TextLanguage_1.default).setTextId(801000 + Type);
                if (Type == 1 || Type == 2 || Type == 4 || Type == 5 || Type == 6 || Type == 7 || Type == 8 || Type == 9 || Type == 10 || Type == 11) {
                    var sParameter = Parameter * 100;
                    txt.getComponent(TextLanguage_1.default).setReplaceValue('~', MyTool_1.default.numberFormat(sParameter, 2) + '%');
                }
                else {
                    txt.getComponent(TextLanguage_1.default).setReplaceValue('~', Parameter + '');
                }
                // txt.getComponent(TextLanguage).setReplaceValue('~', Parameter+ '');
                item.parent = this.Endless.children[index].getChildByName("item");
            }
        }
    };
    BuffDisplay.prototype.Refreshsurplusnumber = function (surplusnumber) {
        var mynumber = surplusnumber;
        var MonsterDetailsarr = [];
        for (var index = 0; index < mynumber; index++) {
            var a = EndlessBuff_1.EndlessBuffManager.getInstance().getThreeWeight();
            MonsterDetailsarr.splice.apply(MonsterDetailsarr, [MonsterDetailsarr.length, 0].concat(a));
        }
        // console.log("++++++++++",MonsterDetailsarr)
        var teamList = HeroManager_1.HeroManager.getInstance().getTeamList(GameManager_1.default.getInstance().cur_game_mode);
        var mybuffindex = 0;
        for (var i = 0; i < teamList.length; i++) { //英雄的横排    ——  5个英雄
            var heroType = teamList[i];
            if (heroType > 0) { //这个横排有英雄
                for (var j = 0; j < this.Buff[0].length; j++) { //英雄的竖排    |   四个空格
                    if (this.Buff[i][j] == 0 && mybuffindex < (MonsterDetailsarr.length)) { //现在放到第几个buff下了
                        var sfy = 0; //是否有类型一样的
                        var id = MonsterDetailsarr[mybuffindex]; //id
                        var Type = EndlessBuff_1.EndlessBuffManager.getInstance().getType(id); //这个id的buff类型
                        var Rarity = EndlessBuff_1.EndlessBuffManager.getInstance().getRarity(id);
                        if (Type == 8) {
                            mybuffindex++;
                            if (mybuffindex < (MonsterDetailsarr.length)) {
                                id = MonsterDetailsarr[mybuffindex]; //id
                                Type = EndlessBuff_1.EndlessBuffManager.getInstance().getType(id); //这个id的buff类型
                            }
                            else {
                                break;
                            }
                        }
                        var sf = 0; //有几个英雄装上了这个类型的buff
                        var yx = 0; //有几个英雄
                        for (var index = 0; index < teamList.length; index++) { //所有的英雄都装备了这个类型的buff
                            var heroType_1 = teamList[index];
                            if (heroType_1 > 0) { //这个横排有英雄
                                var sfs = 0; //这个英雄装上了这个类型的buff
                                for (var myjjindexs = 0; myjjindexs < this.Buff[index].length; myjjindexs++) { //这个英雄有没有装备一样类型的buff
                                    if (this.Buff[index][myjjindexs] > 0) { //装备了buff
                                        if (Type == EndlessBuff_1.EndlessBuffManager.getInstance().getType(this.Buff[index][myjjindexs])) { //类型一样，标记一下
                                            sfs++;
                                        }
                                    }
                                }
                                yx++;
                                if (sfs > 0) {
                                    sf++;
                                }
                            }
                        }
                        // console.log("__________有多个英雄：",yx,"有多少个英雄装备了这个buff",sf)
                        if (sf == yx) {
                            mybuffindex++;
                            for (var index = 0; index < teamList.length; index++) { //所有的英雄都装备了这个类型的buff
                                var heroType_2 = teamList[index];
                                if (heroType_2 > 0) { //这个横排有英雄
                                    for (var myjjindexs = 0; myjjindexs < this.Buff[index].length; myjjindexs++) { //这个英雄有没有装备一样类型的buff
                                        if (this.Buff[index][myjjindexs] > 0) { //装备了buff
                                            if (Type == EndlessBuff_1.EndlessBuffManager.getInstance().getType(this.Buff[index][myjjindexs])) { //类型一样，标记一下
                                                if (Rarity > EndlessBuff_1.EndlessBuffManager.getInstance().getRarity(this.Buff[index][myjjindexs])) {
                                                    GameManager_1.default.getInstance().getHero(teamList[i]).removeEndlessBuff(this.Buff[i][j]);
                                                    this.Buff[i][j] = MonsterDetailsarr[mybuffindex];
                                                    var endlessBuff = new EndlessConfig_1.EndlessBuff;
                                                    var Parameter = EndlessBuff_1.EndlessBuffManager.getInstance().getParameter(id);
                                                    FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.无尽挑战_不同ID的buff装备次数 + id);
                                                    endlessBuff.type = Type;
                                                    endlessBuff.id = id;
                                                    endlessBuff.rarity = Rarity;
                                                    endlessBuff.value = Parameter;
                                                    GameManager_1.default.getInstance().getHero(teamList[i]).addEndlessBuff(endlessBuff); //添加一个buff
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        else {
                            for (var myjjindex = 0; myjjindex < this.Buff[i].length; myjjindex++) { //这个英雄有没有装备一样类型的buff
                                if (this.Buff[i][myjjindex] > 0) { //装备了buff
                                    if (Type == EndlessBuff_1.EndlessBuffManager.getInstance().getType(this.Buff[i][myjjindex])) { //类型一样，标记一下
                                        sfy = 1;
                                    }
                                }
                            }
                            if (sfy == 0) { //这一排没有相同类型的buff   才可以装上去
                                this.Buff[i][j] = MonsterDetailsarr[mybuffindex];
                                // console.log("放置一个：",i,j)
                                var endlessBuff = new EndlessConfig_1.EndlessBuff;
                                // let Rarity=EndlessBuffManager.getInstance().getRarity(id) 
                                var Parameter = EndlessBuff_1.EndlessBuffManager.getInstance().getParameter(id);
                                FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.无尽挑战_不同ID的buff装备次数 + id);
                                endlessBuff.type = Type;
                                endlessBuff.id = id;
                                endlessBuff.rarity = Rarity;
                                endlessBuff.value = Parameter;
                                // console.log("buff:",endlessBuff,teamList[i])
                                GameManager_1.default.getInstance().getHero(teamList[i]).addEndlessBuff(endlessBuff); //添加一个buff
                                mybuffindex++;
                            }
                        }
                    }
                }
            }
        }
        // console.log("+++++++++++放下几个了：",mybuffindex)
        if (mybuffindex < (MonsterDetailsarr.length)) {
            for (var i = 0; i < teamList.length; i++) { //英雄的横排    ——  5个英雄
                var heroType = teamList[i];
                if (heroType > 0) { //这个横排有英雄
                    for (var j = 0; j < this.Buff[0].length; j++) { //英雄的竖排    |   四个空格
                        if (this.Buff[i][j] == 0 && mybuffindex < (MonsterDetailsarr.length)) { //现在放到第几个buff下了
                            var sfy = 0; //是否有类型一样的
                            var id = MonsterDetailsarr[mybuffindex]; //id
                            var Type = EndlessBuff_1.EndlessBuffManager.getInstance().getType(id); //这个id的buff类型
                            var Rarity = EndlessBuff_1.EndlessBuffManager.getInstance().getRarity(id);
                            if (Type == 8) {
                                mybuffindex++;
                                if (mybuffindex < (MonsterDetailsarr.length)) {
                                    id = MonsterDetailsarr[mybuffindex]; //id
                                    Type = EndlessBuff_1.EndlessBuffManager.getInstance().getType(id); //这个id的buff类型
                                }
                                else {
                                    break;
                                }
                            }
                            var sf = 0; //有几个英雄装上了这个类型的buff
                            var yx = 0; //有几个英雄
                            for (var index = 0; index < teamList.length; index++) { //所有的英雄都装备了这个类型的buff
                                var heroType_3 = teamList[index];
                                if (heroType_3 > 0) { //这个横排有英雄
                                    var sfs = 0; //这个英雄装上了这个类型的buff
                                    for (var myjjindexs = 0; myjjindexs < this.Buff[index].length; myjjindexs++) { //这个英雄有没有装备一样类型的buff
                                        if (this.Buff[index][myjjindexs] > 0) { //装备了buff
                                            if (Type == EndlessBuff_1.EndlessBuffManager.getInstance().getType(this.Buff[index][myjjindexs])) { //类型一样，标记一下
                                                sfs++;
                                            }
                                        }
                                    }
                                    yx++;
                                    if (sfs > 0) {
                                        sf++;
                                    }
                                }
                            }
                            // console.log("__________有多个英雄：",yx,"有多少个英雄装备了这个buff",sf)
                            if (sf == yx) {
                                mybuffindex++;
                                for (var index = 0; index < teamList.length; index++) { //所有的英雄都装备了这个类型的buff
                                    var heroType_4 = teamList[index];
                                    if (heroType_4 > 0) { //这个横排有英雄
                                        for (var myjjindexs = 0; myjjindexs < this.Buff[index].length; myjjindexs++) { //这个英雄有没有装备一样类型的buff
                                            if (this.Buff[index][myjjindexs] > 0) { //装备了buff
                                                if (Type == EndlessBuff_1.EndlessBuffManager.getInstance().getType(this.Buff[index][myjjindexs])) { //类型一样，标记一下
                                                    if (Rarity > EndlessBuff_1.EndlessBuffManager.getInstance().getRarity(this.Buff[index][myjjindexs])) {
                                                        GameManager_1.default.getInstance().getHero(teamList[i]).removeEndlessBuff(this.Buff[i][j]);
                                                        this.Buff[i][j] = MonsterDetailsarr[mybuffindex];
                                                        var endlessBuff = new EndlessConfig_1.EndlessBuff;
                                                        var Parameter = EndlessBuff_1.EndlessBuffManager.getInstance().getParameter(id);
                                                        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.无尽挑战_不同ID的buff装备次数 + id);
                                                        endlessBuff.type = Type;
                                                        endlessBuff.id = id;
                                                        endlessBuff.rarity = Rarity;
                                                        endlessBuff.value = Parameter;
                                                        GameManager_1.default.getInstance().getHero(teamList[i]).addEndlessBuff(endlessBuff); //添加一个buff
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            else {
                                for (var myjjindex = 0; myjjindex < this.Buff[i].length; myjjindex++) { //这个英雄有没有装备一样类型的buff
                                    if (this.Buff[i][myjjindex] > 0) { //装备了buff
                                        if (Type == EndlessBuff_1.EndlessBuffManager.getInstance().getType(this.Buff[i][myjjindex])) { //类型一样，标记一下
                                            sfy = 1;
                                        }
                                    }
                                }
                                if (sfy == 0) { //这一排没有相同类型的buff   才可以装上去
                                    this.Buff[i][j] = MonsterDetailsarr[mybuffindex];
                                    // console.log("放置一个：",i,j)
                                    var endlessBuff = new EndlessConfig_1.EndlessBuff;
                                    // let Rarity=EndlessBuffManager.getInstance().getRarity(id) 
                                    var Parameter = EndlessBuff_1.EndlessBuffManager.getInstance().getParameter(id);
                                    FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.无尽挑战_不同ID的buff装备次数 + id);
                                    endlessBuff.type = Type;
                                    endlessBuff.id = id;
                                    endlessBuff.rarity = Rarity;
                                    endlessBuff.value = Parameter;
                                    // console.log("buff:",endlessBuff,teamList[i])
                                    GameManager_1.default.getInstance().getHero(teamList[i]).addEndlessBuff(endlessBuff); //添加一个buff
                                    mybuffindex++;
                                }
                            }
                        }
                    }
                }
            }
        }
        for (var i = 0; i < this.Buff.length; i++) {
            for (var j = 0; j < this.Buff[j].length; j++) {
                if (this.Buff[i][j] > 0) {
                    var texiaonode = cc.instantiate(this.texiao);
                    texiaonode.x = this.Endless_List.children[i].children[j].x;
                    texiaonode.y = this.Endless_List.children[i].children[j].y;
                    texiaonode.active = true;
                    texiaonode.parent = this.mttexiao;
                }
            }
        }
        this.scheduleOnce(function () {
            GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getStrByTextId(800034), 3); //800034已填充buff
            this.RefreshBuff();
        }, 0.2);
    };
    BuffDisplay.prototype.clickBtnBuy = function () {
        var gem = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.Gem);
        if (gem >= 200) {
            //可以购买
            FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.无尽挑战_使用钻石刷新buff的次数);
            PropManager_1.PropManager.getInstance().changePropNum(PropConfig_1.PropId.Gem, -200);
            this.RaffleNumber--;
            this.Refresh();
        }
        else {
            //钱不够
            UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.CoinPop, UIConfig_1.UILayerLevel.Three, { onCompleted: function (uiNode) {
                    uiNode.getComponent(CoinPop_1.default).initUi(PropConfig_1.PropId.Gem);
                }, });
        }
    };
    BuffDisplay.prototype.clickBtnBuyAd = function () {
        var _this = this;
        ApkManager_1.default.getInstance().showVideo((function (isTrue) {
            if (isTrue) {
                _this.RaffleNumber--;
                FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.无尽挑战_使用广告刷新buff的次数);
                _this.Refresh();
            }
        }), Constants_1.VIDEO_TYPE.Equip);
    };
    BuffDisplay.prototype.clickBtnClose = function () {
        if (this.type == 1) {
            this.Tipspop.active = true;
            return;
        }
        this.destroySelf();
    };
    BuffDisplay.prototype.clickBtnTipspop = function () {
        this.Tipspop.active = false;
    };
    BuffDisplay.prototype.destroySelf = function () {
        if (this.type == 1) {
            //刷新下一回合
            // console.log("刷新下一回合",BuffDisplay.surplusnumber)
            if (BuffDisplay_1.surplusnumber > 0) {
                BuffDisplay_1.surplusnumber--;
                for (var index = 0; index < this.Endless.children.length; index++) {
                    this.Endless.children[index].active = true;
                }
                this.clickBtnTipspop();
                this.Refresh();
                this.RefreshBuff();
                return;
            }
            else {
                BuffDisplay_1.surplusnumber = -1;
                // if(BuffDisplay.surplusnumber!=0){
                GameManager_1.default.getInstance().startNextLevel();
                // }
            }
        }
        this.clickBtnTipspop();
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.onClose();
        GameManager_1.default.getInstance().cur_game_state = Constants_1.GameState.Game_Playing;
    };
    BuffDisplay.prototype.clickBtnCloseSkillDescription = function () {
        this.SkillDescription.getChildByName("Common_TextBG").active = false;
        this.SkillDescription.active = false;
    };
    var BuffDisplay_1;
    BuffDisplay.surplusnumber = -1; //剩余几次buff选择机会   默认-1次   800030
    __decorate([
        property(cc.Node)
    ], BuffDisplay.prototype, "bt", void 0);
    __decorate([
        property(cc.Node)
    ], BuffDisplay.prototype, "RichText", void 0);
    __decorate([
        property(cc.Node)
    ], BuffDisplay.prototype, "btnad", void 0);
    __decorate([
        property(cc.Node)
    ], BuffDisplay.prototype, "btnshow", void 0);
    __decorate([
        property(cc.Node)
    ], BuffDisplay.prototype, "Common_Window3_1", void 0);
    __decorate([
        property(cc.Node)
    ], BuffDisplay.prototype, "BossRush_Line1", void 0);
    __decorate([
        property(cc.Node)
    ], BuffDisplay.prototype, "BossRush_Line2", void 0);
    __decorate([
        property(cc.Node)
    ], BuffDisplay.prototype, "text", void 0);
    __decorate([
        property(cc.Node)
    ], BuffDisplay.prototype, "xiatext", void 0);
    __decorate([
        property(cc.Node)
    ], BuffDisplay.prototype, "Common_Btn_Close", void 0);
    __decorate([
        property(cc.Node)
    ], BuffDisplay.prototype, "Common_Window3_2", void 0);
    __decorate([
        property(cc.Node)
    ], BuffDisplay.prototype, "Endless", void 0);
    __decorate([
        property(cc.Node)
    ], BuffDisplay.prototype, "Endless_Frame", void 0);
    __decorate([
        property(cc.Node)
    ], BuffDisplay.prototype, "Endless_List", void 0);
    __decorate([
        property(cc.Node)
    ], BuffDisplay.prototype, "Endless_List_suo", void 0);
    __decorate([
        property(cc.Node)
    ], BuffDisplay.prototype, "Label", void 0);
    __decorate([
        property(cc.Node)
    ], BuffDisplay.prototype, "bg1", void 0);
    __decorate([
        property(cc.Node)
    ], BuffDisplay.prototype, "Tipspop", void 0);
    __decorate([
        property(cc.Node)
    ], BuffDisplay.prototype, "num", void 0);
    __decorate([
        property(cc.Node)
    ], BuffDisplay.prototype, "EndlessBuff", void 0);
    __decorate([
        property(cc.SpriteAtlas)
    ], BuffDisplay.prototype, "copy_ui", void 0);
    __decorate([
        property(cc.Node)
    ], BuffDisplay.prototype, "SkillDescription", void 0);
    __decorate([
        property(cc.Node)
    ], BuffDisplay.prototype, "EndlessBuff1", void 0);
    __decorate([
        property(cc.Node)
    ], BuffDisplay.prototype, "Endless_Light", void 0);
    __decorate([
        property(cc.Node)
    ], BuffDisplay.prototype, "surplustxt", void 0);
    __decorate([
        property(cc.Node)
    ], BuffDisplay.prototype, "mttexiao", void 0);
    __decorate([
        property(cc.Node)
    ], BuffDisplay.prototype, "texiao", void 0);
    BuffDisplay = BuffDisplay_1 = __decorate([
        ccclass
    ], BuffDisplay);
    return BuffDisplay;
}(UIComponent_1.default));
exports.default = BuffDisplay;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcY29weVxcZW5kbGVzc2NoYWxsZW5nZXNcXEJ1ZmZEaXNwbGF5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWxGLG1EQUE4QztBQUM5Qyx5Q0FBb0M7QUFDcEMsNkNBQXdEO0FBQ3hELGlEQUE0QztBQUM1QywyREFBMEQ7QUFFMUQsdUVBQWtFO0FBQ2xFLG1FQUE4RDtBQUM5RCx1RUFBa0U7QUFDbEUsaUVBQTREO0FBQzVELG9EQUErQztBQUMvQyxzREFBcUQ7QUFDckQsNkRBQXdEO0FBR3hELDZDQUF3QztBQUN4QyxvREFBK0M7QUFDL0MsOENBQXlEO0FBQ3pELGdEQUErQztBQUMvQyxzREFBaUQ7QUFDakQsNkNBQW1EO0FBQ25ELGlEQUE4QztBQUV4QyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUF5QywrQkFBVztJQUFwRDtRQUFBLHFFQXd1QkM7UUF0dUJHLFFBQUUsR0FBWSxJQUFJLENBQUEsQ0FBQSxJQUFJO1FBRXRCLGNBQVEsR0FBWSxJQUFJLENBQUEsQ0FBQSxrQkFBa0I7UUFFMUMsV0FBSyxHQUFZLElBQUksQ0FBQSxDQUFBLE1BQU07UUFFM0IsYUFBTyxHQUFZLElBQUksQ0FBQSxDQUFBLE1BQU07UUFFN0Isc0JBQWdCLEdBQVksSUFBSSxDQUFBLENBQUEsR0FBRztRQUVuQyxvQkFBYyxHQUFZLElBQUksQ0FBQSxDQUFBLEdBQUc7UUFFakMsb0JBQWMsR0FBWSxJQUFJLENBQUEsQ0FBQSxHQUFHO1FBRWpDLFVBQUksR0FBWSxJQUFJLENBQUEsQ0FBQSxJQUFJO1FBRXhCLGFBQU8sR0FBWSxJQUFJLENBQUEsQ0FBQSxN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UUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7b0RBQ1M7SUFFM0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQztnREFDSztJQUU5QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3lEQUNjO0lBRWhDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7cURBQ1U7SUFFNUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztzREFDVztJQU03QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO21EQUNRO0lBSTFCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7aURBQ007SUFFeEI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzsrQ0FDSTtJQWpFTCxXQUFXO1FBRC9CLE9BQU87T0FDYSxXQUFXLENBd3VCL0I7SUFBRCxrQkFBQztDQXh1QkQsQUF3dUJDLENBeHVCd0MscUJBQVcsR0F3dUJuRDtrQkF4dUJvQixXQUFXIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuaW1wb3J0IEFwa01hbmFnZXIgZnJvbSBcIi4uLy4uL0Fkcy9BcGtNYW5hZ2VyXCI7XHJcbmltcG9ydCBDb2luUG9wIGZyb20gXCIuLi8uLi9Db2luUG9wXCI7XHJcbmltcG9ydCB7IEdhbWVTdGF0ZSwgVklERU9fVFlQRSB9IGZyb20gXCIuLi8uLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi8uLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBIZXJvTWFuYWdlciB9IGZyb20gXCIuLi8uLi9IZXJvL0RhdGEvSGVyb01hbmFnZXJcIjtcclxuaW1wb3J0IHsgTW9uc3RlclNraWxsTWFuYWdlciB9IGZyb20gXCIuLi8uLi9Nb25zdGVyL0RhdGEvTW9uc3RlclNraWxsXCI7XHJcbmltcG9ydCB7IEZvbGxvd19UeXBlIH0gZnJvbSBcIi4uLy4uL211bHRpTGFuZ3VhZ2UvRm9sbG93Q29uc3RhbnRzXCI7XHJcbmltcG9ydCBGb2xsb3dNYW5hZ2VyIGZyb20gXCIuLi8uLi9tdWx0aUxhbmd1YWdlL0ZvbGxvd01hbmFnZXJcIjtcclxuaW1wb3J0IExhbmd1YWdlTWFuYWdlciBmcm9tIFwiLi4vLi4vbXVsdGlMYW5ndWFnZS9MYW5ndWFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IFRleHRMYW5ndWFnZSBmcm9tIFwiLi4vLi4vbXVsdGlMYW5ndWFnZS9UZXh0TGFuZ3VhZ2VcIjtcclxuaW1wb3J0IHsgUHJvcElkIH0gZnJvbSBcIi4uLy4uL1Byb3AvUHJvcENvbmZpZ1wiO1xyXG5pbXBvcnQgeyBQcm9wTWFuYWdlciB9IGZyb20gXCIuLi8uLi9Qcm9wL1Byb3BNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFNvdW5kSW5kZXggfSBmcm9tIFwiLi4vLi4vU291bmQvQXVkaW9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgU3RvcmFnZUtleSB9IGZyb20gXCIuLi8uLi9TdG9yYWdlL1N0b3JhZ2VDb25maWdcIjtcclxuaW1wb3J0IHsgVGhlU3RvcmFnZU1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vU3RvcmFnZS9TdG9yYWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgTXlUb29sIGZyb20gXCIuLi8uLi9Ub29scy9NeVRvb2xcIjtcclxuaW1wb3J0IFVJQ29tcG9uZW50IGZyb20gXCIuLi8uLi9VSS9VSUNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBVSVBhdGgsIFVJTGF5ZXJMZXZlbCB9IGZyb20gXCIuLi8uLi9VSS9VSUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBVSU1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vVUkvVUlNYW5hZ2VyXCI7XHJcbmltcG9ydCBXYWxsTWFuYWdlciBmcm9tIFwiLi4vLi4vV2FsbC9XYWxsTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBFbmRsZXNzQnVmZk1hbmFnZXIgfSBmcm9tIFwiLi9FbmRsZXNzQnVmZlwiO1xyXG5pbXBvcnQgeyBFbmRsZXNzQnVmZiB9IGZyb20gXCIuL0VuZGxlc3NDb25maWdcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCdWZmRGlzcGxheSBleHRlbmRzIFVJQ29tcG9uZW50IHtcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgYnQ6IGNjLk5vZGUgPSBudWxsLy/moIfpophcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgUmljaFRleHQ6IGNjLk5vZGUgPSBudWxsLy/lho3liLfmlrDlh6DmrKHlv4XlkKvlj7Lor5fnuqflk4HotKjku6XkuIrmioDog71cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgYnRuYWQ6IGNjLk5vZGUgPSBudWxsLy/lub/lkYrojrflvpdcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgYnRuc2hvdzogY2MuTm9kZSA9IG51bGwvL+mSu+efs+iOt+W+l1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBDb21tb25fV2luZG93M18xOiBjYy5Ob2RlID0gbnVsbC8v5qGGXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIEJvc3NSdXNoX0xpbmUxOiBjYy5Ob2RlID0gbnVsbC8v5qGGXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIEJvc3NSdXNoX0xpbmUyOiBjYy5Ob2RlID0gbnVsbC8v5qGGXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHRleHQ6IGNjLk5vZGUgPSBudWxsLy/mloflrZdcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgeGlhdGV4dDogY2MuTm9kZSA9IG51bGwvL+W6lemDqOaWh+Wtl1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBDb21tb25fQnRuX0Nsb3NlOiBjYy5Ob2RlID0gbnVsbC8v5YWz6Zet5oyJ6ZKuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIENvbW1vbl9XaW5kb3czXzI6IGNjLk5vZGUgPSBudWxsLy/moIfpopjog4zmma9cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgRW5kbGVzczogY2MuTm9kZSA9IG51bGwvL2J1ZmbniLboioLngrlcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgRW5kbGVzc19GcmFtZTogY2MuTm9kZT1udWxsLy/oi7Hpm4TlpLTlg4/niLboioLngrlcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgRW5kbGVzc19MaXN0OiBjYy5Ob2RlID0gbnVsbC8v5bey6YCJ5oupYnVmZueItuiKgueCuVxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBFbmRsZXNzX0xpc3Rfc3VvOiBjYy5Ob2RlID0gbnVsbC8v5bey6YCJ5oupYnVmZiAg6ZSB54i26IqC54K5XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIExhYmVsOiBjYy5Ob2RlID0gbnVsbC8v5bqV6YOo5paH5a2XXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGJnMTogY2MuTm9kZSA9IG51bGwvL+mBrue9qVxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBUaXBzcG9wOiBjYy5Ob2RlID0gbnVsbC8v56Gu6K6k5YWz6Zet5by556qX77yMXHJcbiAgICB0eXBlOm51bWJlcj0wLy8wOkJ1ZmblsZXnpLogICAx77yaQnVmZumAieaLqVxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBudW06IGNjLk5vZGUgPSBudWxsXHJcbiAgICBCdWZmOm51bWJlcltdW109W1swLDAsMCwwXSxbMCwwLDAsMF0sWzAsMCwwLDBdLFswLDAsMCwwXSxbMCwwLDAsMF1dLy/ov5nkuKrkvY3nva7mmK/lkKbmnInmioDog71cclxuICAgIC8vQnVmZjpudW1iZXJbXVtdPVtbMCwwLDAsMF0sWzEsMCwwLDBdLFsxLDEsMCwwXSxbMSwxLDEsMF0sWzEsMSwxLDFdXS8v6L+Z5Liq5L2N572u5piv5ZCm5pyJ5oqA6IO9XHJcbiAgICAvL1tbMCwwLDAsMF0sWzAsMCwwLDBdLFswLDAsMCwwXSxbMCwwLDAsMF0sWzAsMCwwLDBdXS8v6L+Z5Liq5L2N572u5piv5ZCm5pyJ5oqA6IO9XHJcbiAgICAvL0J1ZmY6bnVtYmVyW11bXT1bWzAsMCwwLDBdLFszMDEsMCwwLDBdLFs0MDEsMzAyLDAsMF0sWzUwMSw0MDIsNTAyLDBdLFszMDIsMzAzLDMwNCwyMDFdXS8v6L+Z5Liq5L2N572u5piv5ZCm5pyJ5oqA6IO9XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIEVuZGxlc3NCdWZmOiBjYy5Ob2RlID0gbnVsbC8vYnVmZuaKgOiDveeahOmihOWItuS9k1xyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZUF0bGFzKVxyXG4gICAgY29weV91aTogY2MuU3ByaXRlQXRsYXMgPSBudWxsLy9idWZm5oqA6IO955qE5Zu+54mH5Zu+6ZuGICAgRW5kbGVzc0J1ZmZfMjAxXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIFNraWxsRGVzY3JpcHRpb246IGNjLk5vZGUgPSBudWxsLy/mioDog73mj4/ov7BcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgRW5kbGVzc0J1ZmYxOiBjYy5Ob2RlID0gbnVsbC8v56e75Yqo55qEYnVmZlxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBFbmRsZXNzX0xpZ2h0OiBjYy5Ob2RlID0gbnVsbC8v5Y+R5YWJ55qE5qGGXHJcblxyXG5cclxuICAgIFJhZmZsZU51bWJlcjpudW1iZXI9My8v5oq95aWW5qyh5pWwICDpu5jorqTkupTmrKFcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHN1cnBsdXN0eHQ6IGNjLk5vZGUgPSBudWxsLy/liankvZlidWZm5Yeg5qyh6YCJ5oup5py65LyaXHJcbiAgICBwdWJsaWMgc3RhdGljIHN1cnBsdXNudW1iZXI6bnVtYmVyPS0xLy/liankvZnlh6DmrKFidWZm6YCJ5oup5py65LyaICAg6buY6K6kLTHmrKEgICA4MDAwMzBcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIG10dGV4aWFvOiBjYy5Ob2RlID0gbnVsbC8v54m55pWI54i26IqC54K5XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHRleGlhbzogY2MuTm9kZSA9IG51bGwvL+eJueaViOiKgueCuVxyXG4gICAgaW5pdFVpKHR5cGUpIHsvLzA6QnVmZuWxleekuiAgIDHvvJpCdWZm6YCJ5oupXHJcbiAgICAgICAgLy8gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5tdXNpY19tYW5hZ2VyLnBsYXlNdXNpYyhNdXNpY0luZGV4LkJHTV9USlApO1xyXG4gICAgICAgIC8vIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7pk4HljKDpk7rmiZPlvIDmrKHmlbApO1xyXG4gICAgICAgIHRoaXMuUmFmZmxlTnVtYmVyPTNcclxuICAgICAgICB0aGlzLlNraWxsRGVzY3JpcHRpb24uYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgdGhpcy5Ta2lsbERlc2NyaXB0aW9uLmdldENoaWxkQnlOYW1lKFwiQ29tbW9uX1RleHRCR1wiKS5hY3RpdmU9ZmFsc2VcclxuICAgICAgICB0aGlzLkVuZGxlc3NfTGlnaHQuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgdGhpcy5FbmRsZXNzQnVmZjEuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgbGV0IGlkID0gODAwMDI0XHJcbiAgICAgICAgdGhpcy50eXBlPXR5cGVcclxuICAgICAgICB0aGlzLmNsaWNrQnRuVGlwc3BvcCgpXHJcbiAgICAgICAgdGhpcy5zdXJwbHVzdHh0LmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgIGlmICh0eXBlID09IDApIHtcclxuICAgICAgICAgICAgaWQgPSA4MDAwMjRcclxuICAgICAgICAgICAgdGhpcy5SaWNoVGV4dC5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAgICAgdGhpcy5idG5hZC5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAgICAgdGhpcy5idG5zaG93LmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgICAgICB0aGlzLkNvbW1vbl9XaW5kb3czXzEuaGVpZ2h0PTYwMFxyXG4gICAgICAgICAgICB0aGlzLkNvbW1vbl9XaW5kb3czXzEueT0tOFxyXG4gICAgICAgICAgICB0aGlzLkNvbW1vbl9CdG5fQ2xvc2UueT0yNzlcclxuICAgICAgICAgICAgdGhpcy5Db21tb25fV2luZG93M18yLnk9Mjg1XHJcbiAgICAgICAgICAgIHRoaXMuYnQueT0yODVcclxuICAgICAgICAgICAgdGhpcy5Cb3NzUnVzaF9MaW5lMS5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAgICAgdGhpcy5Cb3NzUnVzaF9MaW5lMi5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAgICAgdGhpcy50ZXh0LmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgICAgICB0aGlzLkxhYmVsLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgIHRoaXMuYmcxLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgICAgICB0aGlzLkVuZGxlc3MuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMueGlhdGV4dC5hY3RpdmU9ZmFsc2VcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT0gMSkge1xyXG4gICAgICAgICAgICBpZCA9IDgwMDAyMFxyXG4gICAgICAgICAgICB0aGlzLlJpY2hUZXh0UmVmcmVzaCgpXHJcbiAgICAgICAgICAgIHRoaXMuUmljaFRleHQuYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgdGhpcy5idG5hZC5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLmJ0bnNob3cuYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgdGhpcy5Db21tb25fV2luZG93M18xLmhlaWdodD05NzBcclxuICAgICAgICAgICAgdGhpcy5Db21tb25fV2luZG93M18xLnk9MTBcclxuICAgICAgICAgICAgdGhpcy5Db21tb25fQnRuX0Nsb3NlLnk9NDg1XHJcbiAgICAgICAgICAgIHRoaXMuQ29tbW9uX1dpbmRvdzNfMi55PTQ5MVxyXG4gICAgICAgICAgICB0aGlzLmJ0Lnk9NDkxXHJcbiAgICAgICAgICAgIHRoaXMuQm9zc1J1c2hfTGluZTEuYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgdGhpcy5Cb3NzUnVzaF9MaW5lMi5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLnRleHQuYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgdGhpcy5MYWJlbC5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAgICAgdGhpcy5iZzEuYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgdGhpcy54aWF0ZXh0LmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLkVuZGxlc3MuY2hpbGRyZW4ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkVuZGxlc3MuY2hpbGRyZW5baW5kZXhdLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy/liLfmlrDkuInkuKpidWZmXHJcbiAgICAgICAgICAgIHRoaXMuUmVmcmVzaCgpXHJcbiAgICAgICAgICAgIHRoaXMuRW5kbGVzcy5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLm51bS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1cIlwiKzIwMFxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmJ0LmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnNldFRleHRJZChpZClcclxuICAgICAgICB0aGlzLlJlZnJlc2hCdWZmKClcclxuICAgIH1cclxuICAgIFJpY2hUZXh0UmVmcmVzaCgpey8v5Yi35paw5paH5a2X5qyh5pWwXHJcbiAgICAgICAgbGV0IHR4dD1MYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCg4MDAwMjIpXHJcbiAgICAgICAgdHh0PXR4dC5yZXBsYWNlKCd+JyxcIlwiK3RoaXMuUmFmZmxlTnVtYmVyKVxyXG4gICAgICAgIHRoaXMuUmljaFRleHQuZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KS5zdHJpbmc9dHh0XHJcblxyXG4gICAgfVxyXG4gICAgLy/liLfmlrDplIHnmoTnirbmgIFcclxuICAgIFVubG9jaygpe1xyXG4gICAgICAgIGxldCB0ZWFtTGlzdD1IZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFRlYW1MaXN0KEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZSk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCIrKysrKysrK1wiLHRlYW1MaXN0KVxyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPHRlYW1MaXN0Lmxlbmd0aDsgaSsrKSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCBoZXJvVHlwZT10ZWFtTGlzdFtpXTtcclxuICAgICAgICAgICAgaWYoaGVyb1R5cGU+MClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5FbmRsZXNzX0ZyYW1lLmNoaWxkcmVuW2ldLmNoaWxkcmVuQ291bnQ8Mil7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKDExMDAwMCt0ZWFtTGlzdFtpXSwwKTtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLnNjYWxlPTAuOFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0ucGFyZW50PXRoaXMuRW5kbGVzc19GcmFtZS5jaGlsZHJlbltpXVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy9idWZm55qE6ZSBICAgIOWmguaenOi/meS4quS9jee9ruaciWJ1ZmYgICDpgqPkuYjov5nkuKrkvY3nva7kuIvpnaLkuIDkuKrkvY3nva7nmoTplIHmiZPlvIAgICDlpoLmnpzov5nkuKrlnLDmlrnmnInoi7Hpm4QgIOm7mOiupOesrOS4gOS4quS9jee9ruW8gFxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuQnVmZltpXS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLkJ1ZmZbaV1baW5kZXhdPT0wJiZpbmRleD09MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuRW5kbGVzc19MaXN0X3N1by5jaGlsZHJlbltpXS5jaGlsZHJlbltpbmRleF0uYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuQnVmZltpXVtpbmRleF0+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuRW5kbGVzc19MaXN0X3N1by5jaGlsZHJlbltpXS5jaGlsZHJlbltpbmRleF0uYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGluZGV4PCh0aGlzLkJ1ZmZbaV0ubGVuZ3RoLTEpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuRW5kbGVzc19MaXN0X3N1by5jaGlsZHJlbltpXS5jaGlsZHJlbltpbmRleCsxXS5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNsaWNrQnRuRW5kbGVzc0J1ZmZEZXRhaWxzKGV2ZW4saSl7Ly9idWZm6K+m5oOFXHJcbiAgICAgICAgbGV0IGlkPU51bWJlcihpKVxyXG4gICAgICAgIGlmKGlkPjEwMDApe1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIuaYr+S4iumdoueahOS4ieS4qu+8jOS4jeaYvuekuuivpuaDhVwiLGlkLzEwMDAwKVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIuaYr+W6leS4i+eahO+8jOaYvuekuuivpuaDhVwiLGlkKVxyXG4gICAgICAgICAgICB0aGlzLlNraWxsRGVzY3JpcHRpb24ueD0wXHJcbiAgICAgICAgICAgIGlmKGV2ZW4uY3VycmVudFRhcmdldC5wYXJlbnQueDwwKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuU2tpbGxEZXNjcmlwdGlvbi54PShldmVuLmN1cnJlbnRUYXJnZXQucGFyZW50LngpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoZXZlbi5jdXJyZW50VGFyZ2V0LnBhcmVudC54PjApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Ta2lsbERlc2NyaXB0aW9uLng9KGV2ZW4uY3VycmVudFRhcmdldC5wYXJlbnQueClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLlNraWxsRGVzY3JpcHRpb24ueT0oZXZlbi5jdXJyZW50VGFyZ2V0LnBhcmVudC55KzEwKVxyXG4gICAgICAgICAgICB0aGlzLlNraWxsRGVzY3JpcHRpb24uYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgbGV0IFBhcmFtZXRlcj1FbmRsZXNzQnVmZk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQYXJhbWV0ZXIoaWQpIFxyXG4gICAgICAgICAgICBsZXQgVHlwZT1FbmRsZXNzQnVmZk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRUeXBlKGlkKSBcclxuICAgICAgICAgICAgbGV0IHNwcml0ZWlkPTgwMTAwMCtUeXBlXHJcbiAgICAgICAgICAgIHRoaXMuU2tpbGxEZXNjcmlwdGlvbi5nZXRDaGlsZEJ5TmFtZShcImJ0XCIpLmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnNldFRleHRJZChzcHJpdGVpZClcclxuXHJcbiAgICAgICAgICAgIC8vIEFkbWluaXN0cmF0b3I6XHJcbiAgICAgICAgICAgIC8vIDEu5pS75Ye75YqbK3glXHJcbiAgICAgICAgICAgIC8vIDIu5pS76YCfK3glXHJcbiAgICAgICAgICAgIC8vIDMu5pq05Ye75YC8K3hcclxuICAgICAgICAgICAgLy8gNC7mmrTlh7vlop7luYUreCVcclxuICAgICAgICAgICAgLy8gNS7pmLLlvqHlipsreCVcclxuICAgICAgICAgICAgLy8gNi7mnIDlpKfnlJ/lkb3lgLwreCUgXHJcbiAgICAgICAgICAgIC8vIDcu5q+P56eS5Zue5aSN5pyA5aSn55Sf5ZG95YC8eCVcclxuICAgICAgICAgICAgLy8gOC7nq4vljbPlm57lpI3mnIDlpKfnlJ/lkb3lgLx4Je+8iOazqO+8muivpWJ1ZmbnlJ/mlYjlkI7nq4vljbPmtojlpLHvvIlcclxuICAgICAgICAgICAgLy8gOS7ov57nu63mlLvlh7sg5qaC546HeCVcclxuICAgICAgICAgICAgLy8gMTAu5Li75Yqo5oqA6IO95Ya35Y205pe26Ze05YeP5bCReCVcclxuICAgICAgICAgICAgLy8gMTEu5pyA57uI5Lyk5a6z5Yqg5oiQeCVcclxuXHJcbiAgICAgICAgICAgIGlmKFR5cGU9PTF8fFR5cGU9PTJ8fFR5cGU9PTR8fFR5cGU9PTV8fFR5cGU9PTZ8fFR5cGU9PTd8fFR5cGU9PTh8fFR5cGU9PTl8fFR5cGU9PTEwfHxUeXBlPT0xMSl7XHJcbiAgICAgICAgICAgICAgICBsZXQgc1BhcmFtZXRlcj1QYXJhbWV0ZXIqMTAwXHJcbiAgICAgICAgICAgICAgICB0aGlzLlNraWxsRGVzY3JpcHRpb24uZ2V0Q2hpbGRCeU5hbWUoXCJidFwiKS5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zZXRSZXBsYWNlVmFsdWUoJ34nLCBNeVRvb2wubnVtYmVyRm9ybWF0KHNQYXJhbWV0ZXIsMikrICclJyk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Ta2lsbERlc2NyaXB0aW9uLmdldENoaWxkQnlOYW1lKFwiYnRcIikuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0UmVwbGFjZVZhbHVlKCd+JywgUGFyYW1ldGVyKyAnJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Ta2lsbERlc2NyaXB0aW9uLmdldENoaWxkQnlOYW1lKFwiQ29tbW9uX1RleHRCR1wiKS5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgICAgICB9LDAuMDAwMSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBvbkhlcm9Ub3VjaFN0YXJ0KGU6Y2MuRXZlbnQuRXZlbnRUb3VjaCkge1xyXG4gICAgICAgIGxldCB0b3VjaFRlYW09ZS5nZXRDdXJyZW50VGFyZ2V0KCk7XHJcbiAgICAgICAgbGV0IHBvcz10aGlzLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIoZS5nZXRMb2NhdGlvbigpKTtcclxuICAgICAgICB0aGlzLkVuZGxlc3NCdWZmMS5hY3RpdmU9dHJ1ZSBcclxuICAgICAgICB0aGlzLkVuZGxlc3NCdWZmMS5zZXRQb3NpdGlvbihwb3MpXHJcbiAgICAgICAgdGhpcy5FbmRsZXNzQnVmZjEuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWU9dG91Y2hUZWFtLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lXHJcbiAgICAgICAgdG91Y2hUZWFtLmdldENvbXBvbmVudChjYy5TcHJpdGUpLmVuYWJsZWQ9ZmFsc2VcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIuW9k+aJi+aMh+inpuaRuOWIsOWxj+W5leaXtlwiLHBvcylcclxuICAgIH1cclxuICAgIG9uSGVyb1RvdWNoTW92ZShlOmNjLkV2ZW50LkV2ZW50VG91Y2gpIHtcclxuICAgICAgICBsZXQgdG91Y2hUZWFtPWUuZ2V0Q3VycmVudFRhcmdldCgpO1xyXG4gICAgICAgIGxldCBwb3M9dGhpcy5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKGUuZ2V0TG9jYXRpb24oKSk7XHJcbiAgICAgICAgdGhpcy5FbmRsZXNzQnVmZjEuc2V0UG9zaXRpb24ocG9zKVxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwi5b2T5omL5oyH5Zyo5bGP5bmV5LiK56e75Yqo5pe2XCIscG9zKVxyXG4gICAgICAgIHRoaXMuSGVyb1RvdWNoKHRvdWNoVGVhbSxwb3MsMClcclxuICAgIH1cclxuICAgIG9uSGVyb1RvdWNoRW5kKGU6Y2MuRXZlbnQuRXZlbnRUb3VjaCkge1xyXG4gICAgICAgIGxldCB0b3VjaFRlYW09ZS5nZXRDdXJyZW50VGFyZ2V0KCk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCLlvZPmiYvmjIflnKjnm67moIfoioLngrnljLrln5/lhoXnprvlvIDlsY/luZXml7ZcIix0b3VjaFRlYW0pXHJcbiAgICAgICAgdGhpcy5FbmRsZXNzQnVmZjEuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgdG91Y2hUZWFtLmdldENvbXBvbmVudChjYy5TcHJpdGUpLmVuYWJsZWQ9dHJ1ZVxyXG4gICAgfVxyXG4gICAgLy/mmK/lkKblnKjmoYbnmoTojIPlm7TlhoUgICDlj6/ku6XooqvmlL7nva4gICAg5Ye6546w5Y+R5YWJ55qE5qGGXHJcbiAgICBIZXJvVG91Y2godG91Y2hUZWFtLHBvcyx0eXBlKXsvLzA65b2T5omL5oyH5Zyo5bGP5bmV5LiK56e75Yqo5pe2ICAgIDHvvJrlvZPmiYvmjIflnKjnm67moIfoioLngrnljLrln5/lpJbnprvlvIDlsY/luZXml7YgICAg5pS+572u5pe2XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8dGhpcy5FbmRsZXNzX0xpc3QuY2hpbGRyZW4ubGVuZ3RoOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuRW5kbGVzc19MaXN0LmNoaWxkcmVuW2ldLmNoaWxkcmVuLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAvL+Wbm+S4qmJ1Zmbmu6HkuobkuYvlkI7miY3og73mm7TmjaJidWZmXHJcbiAgICAgICAgICAgICAgICAvLyBpZiAodGhpcy5FbmRsZXNzX0xpc3Rfc3VvLmNoaWxkcmVuW2ldLmNoaWxkcmVuW2pdLmFjdGl2ZT09ZmFsc2UmJih0aGlzLkJ1ZmZbaV1bal09PTB8fCh0aGlzLkJ1ZmZbaV1bMF0hPTAmJnRoaXMuQnVmZltpXVsxXSE9MCYmdGhpcy5CdWZmW2ldWzJdIT0wJiZ0aGlzLkJ1ZmZbaV1bM10hPTApKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuRW5kbGVzc19MaXN0X3N1by5jaGlsZHJlbltpXS5jaGlsZHJlbltqXS5hY3RpdmU9PWZhbHNlKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaWQ9TnVtYmVyKHRvdWNoVGVhbS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5jbGlja0V2ZW50c1swXS5jdXN0b21FdmVudERhdGEpLzEwMDAwXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IFJhcml0eT1FbmRsZXNzQnVmZk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRSYXJpdHkoaWQpIC8v6Ieq5bex55qE5by65bqmXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IFR5cGU9RW5kbGVzc0J1ZmZNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VHlwZShpZCkvL+iHquW3seeahOexu+Wei1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBTYW1lbm90PTBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRoZXJSYXJpdHk9MC8v5pS+5Zyo5LiK6Z2i55qEYnVmZueahOW8uuW6plxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpbmRleGo9LTFcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5CdWZmW2ldLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLkJ1ZmZbaV1baW5kZXhdPjApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRoZXJUeXBlPUVuZGxlc3NCdWZmTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFR5cGUodGhpcy5CdWZmW2ldW2luZGV4XSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoZXJUeXBlPT1UeXBlKXsvL+aciei3n+aIkeiHquW3seS4gOagt+eahOexu+Wei1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4aj1pbmRleFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoZXJSYXJpdHk9RW5kbGVzc0J1ZmZNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UmFyaXR5KHRoaXMuQnVmZltpXVtpbmRleF0pIC8v5pS+5Zyo5LiK6Z2i55qEYnVmZueahOW8uuW6plxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNhbWVub3Q9MVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmKFNhbWVub3Q9PTApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2l6ZSA9IHRoaXMuRW5kbGVzc19MaXN0LmNoaWxkcmVuW2ldLmNoaWxkcmVuW2pdLmdldENvbnRlbnRTaXplKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwb3NzID0gdGhpcy5FbmRsZXNzX0xpc3QuY2hpbGRyZW5baV0uY2hpbGRyZW5bal0uZ2V0UG9zaXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG15cG9zPWNjLnJlY3QocG9zcy54LXNpemUud2lkdGgvMixwb3NzLnktc2l6ZS5oZWlnaHQvMixzaXplLndpZHRoLHNpemUuaGVpZ2h0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihteXBvcy5jb250YWlucyhwb3MpPT10cnVlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7ICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpZih0aGlzLkJ1ZmZbaV1bMF0hPTAmJnRoaXMuQnVmZltpXVsxXSE9MCYmdGhpcy5CdWZmW2ldWzJdIT0wJiZ0aGlzLkJ1ZmZbaV1bM10hPTApey8v5Zub5Liq5L2N572u6YO95ruh5LqGXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoaW5kZXhqPT1qKXsvL+imgeaUvuWcqOWQjOS4gOS4quS9jee9rlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0aGVyUmFyaXR5PFJhcml0eSl7Ly/mlL7lnKjkuIrpnaLnmoTnsbvlnovlvLrluqbmr5TmiJHoh6rlt7HnmoTnsbvlnovlsI9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNhbWVub3Q9MFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoU2FtZW5vdD09MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodHlwZT09MCl7Ly/np7vliqjml7ZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5FbmRsZXNzX0xpZ2h0Lng9cG9zcy54XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuRW5kbGVzc19MaWdodC55PXBvc3MueVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkVuZGxlc3NfTGlnaHQuYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKHR5cGU9PTEpey8v5pS+572u5pe2XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuRW5kbGVzc0J1ZmYxLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGVhbUxpc3Q9SGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRUZWFtTGlzdChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX21vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLkJ1ZmZbaV1bal0+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm8odGVhbUxpc3RbaV0pLnJlbW92ZUVuZGxlc3NCdWZmKHRoaXMuQnVmZltpXVtqXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkJ1ZmZbaV1bal09aWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGVuZGxlc3NCdWZmPW5ldyBFbmRsZXNzQnVmZlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgVHlwZT1FbmRsZXNzQnVmZk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRUeXBlKGlkKSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IFJhcml0eT1FbmRsZXNzQnVmZk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRSYXJpdHkoaWQpIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgUGFyYW1ldGVyPUVuZGxlc3NCdWZmTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFBhcmFtZXRlcihpZCkgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7ml6DlsL3mjJHmiJhf5LiN5ZCMSUTnmoRidWZm6KOF5aSH5qyh5pWwK2lkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoVHlwZT09OCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkJ1ZmZbaV1bal09MFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGhwPShQYXJhbWV0ZXIqV2FsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYWluV2FsbCgpLmdldE1heEhwKCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIuWfjuWimeWKoOihgDpcIixocCxXYWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1haW5XYWxsKCkuZ2V0Q3VySHAoKSxXYWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1haW5XYWxsKCkuZ2V0TWF4SHAoKSxQYXJhbWV0ZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBXYWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1haW5XYWxsKCkuY2hhbmdlSHBCeUVuZGxlc3MoaHApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDgwMDAyNiksMik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5kbGVzc0J1ZmYudHlwZT1UeXBlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmRsZXNzQnVmZi5pZD1pZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5kbGVzc0J1ZmYucmFyaXR5PVJhcml0eVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5kbGVzc0J1ZmYudmFsdWU9UGFyYW1ldGVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm8odGVhbUxpc3RbaV0pLmFkZEVuZGxlc3NCdWZmKGVuZGxlc3NCdWZmKS8v5re75Yqg5LiA5LiqYnVmZlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoVGVhbS5wYXJlbnQucGFyZW50LmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkVuZGxlc3NfTGlnaHQuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuUmVmcmVzaEJ1ZmYoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLkVuZGxlc3MuY2hpbGRyZW5bMF0uYWN0aXZlPT1mYWxzZSYmdGhpcy5FbmRsZXNzLmNoaWxkcmVuWzFdLmFjdGl2ZT09ZmFsc2UmJnRoaXMuRW5kbGVzcy5jaGlsZHJlblsyXS5hY3RpdmU9PWZhbHNlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5Yi35paw5LiL5LiA5rOiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlc3Ryb3lTZWxmKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodHlwZT09MSl7Ly/mlL7nva7ml7YgICAg5q+P5L2N6Iux6ZuE5Y+q6IO96KOF5aSH5LiA5Liq5ZCM57G75Z6L5oqA6IO9ICAgODAwMDMzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoODAwMDMzKSwxLjUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgbGV0IHNpemUgPSB0aGlzLkVuZGxlc3NfTGlzdC5jaGlsZHJlbltpXS5jaGlsZHJlbltqXS5nZXRDb250ZW50U2l6ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBsZXQgcG9zcyA9IHRoaXMuRW5kbGVzc19MaXN0LmNoaWxkcmVuW2ldLmNoaWxkcmVuW2pdLmdldFBvc2l0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGxldCBteXBvcz1jYy5yZWN0KHBvc3MueC1zaXplLndpZHRoLzIscG9zcy55LXNpemUuaGVpZ2h0LzIsc2l6ZS53aWR0aCxzaXplLmhlaWdodClcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgaWYobXlwb3MuY29udGFpbnMocG9zKT09dHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgeyAgIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgaWYodHlwZT09MSl7Ly/mlL7nva7ml7ZcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDgwMDAyNiksMS41KTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodHlwZT09MCl7XHJcbiAgICAgICAgICAgIHRoaXMuRW5kbGVzc19MaWdodC5hY3RpdmU9ZmFsc2VcclxuICAgICAgICB9ZWxzZSBpZih0eXBlPT0xKXtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgb25IZXJvVG91Y2hDYW5jZWwoZTpjYy5FdmVudC5FdmVudFRvdWNoKSB7XHJcbiAgICAgICAgbGV0IHRvdWNoVGVhbT1lLmdldEN1cnJlbnRUYXJnZXQoKTtcclxuICAgICAgICBsZXQgcG9zPXRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihlLmdldExvY2F0aW9uKCkpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwi5b2T5omL5oyH5Zyo55uu5qCH6IqC54K55Yy65Z+f5aSW56a75byA5bGP5bmV5pe2XCIscG9zKVxyXG4gICAgICAgIHRoaXMuRW5kbGVzc0J1ZmYxLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgIHRoaXMuRW5kbGVzc0J1ZmYxLnNldFBvc2l0aW9uKHBvcylcclxuICAgICAgICB0b3VjaFRlYW0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuZW5hYmxlZD10cnVlXHJcbiAgICAgICAgdGhpcy5IZXJvVG91Y2godG91Y2hUZWFtLHBvcywxKVxyXG4gICAgfVxyXG4gICAgUmVmcmVzaEJ1ZmYoKXsvL+WIt+aWsFxyXG4gICAgICAgIC8vIGxldCB0ZWFtTGlzdD1IZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFRlYW1MaXN0KEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZSk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLkJ1ZmYubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLkJ1ZmZbal0ubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuQnVmZltpXVtqXT4wKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuRW5kbGVzc19MaXN0LmNoaWxkcmVuW2ldLmNoaWxkcmVuW2pdLmNoaWxkcmVuQ291bnQ9PTApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtPWNjLmluc3RhbnRpYXRlKHRoaXMuRW5kbGVzc0J1ZmYpXHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW09dGhpcy5FbmRsZXNzX0xpc3QuY2hpbGRyZW5baV0uY2hpbGRyZW5bal0uY2hpbGRyZW5bMF1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5zY2FsZT0wLjdcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZT10aGlzLmNvcHlfdWkuZ2V0U3ByaXRlRnJhbWUoXCJFbmRsZXNzQnVmZl9cIit0aGlzLkJ1ZmZbaV1bal0pXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5jbGlja0V2ZW50c1swXS5jdXN0b21FdmVudERhdGE9XCJcIit0aGlzLkJ1ZmZbaV1bal1cclxuICAgICAgICAgICAgICAgICAgICBpdGVtLnBhcmVudD10aGlzLkVuZGxlc3NfTGlzdC5jaGlsZHJlbltpXS5jaGlsZHJlbltqXVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGxldCBpZD10aGlzLkJ1ZmZbaV1bal1cclxuICAgICAgICAgICAgICAgICAgICAvLyBsZXQgZW5kbGVzc0J1ZmY9bmV3IEVuZGxlc3NCdWZmXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbGV0IFR5cGU9RW5kbGVzc0J1ZmZNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VHlwZShpZCkgXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbGV0IFJhcml0eT1FbmRsZXNzQnVmZk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRSYXJpdHkoaWQpIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGxldCBQYXJhbWV0ZXI9RW5kbGVzc0J1ZmZNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UGFyYW1ldGVyKGlkKSBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZW5kbGVzc0J1ZmYudHlwZT1UeXBlXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZW5kbGVzc0J1ZmYuaWQ9aWRcclxuICAgICAgICAgICAgICAgICAgICAvLyBlbmRsZXNzQnVmZi5yYXJpdHk9UmFyaXR5XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZW5kbGVzc0J1ZmYudmFsdWU9UGFyYW1ldGVyXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvKHRlYW1MaXN0W2ldKS5hZGRFbmRsZXNzQnVmZihlbmRsZXNzQnVmZikvL+a3u+WKoOS4gOS4qmJ1ZmZcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLlVubG9jaygpXHJcbiAgICB9XHJcbiAgICBSZWZyZXNoKCl7Ly/liLfmlrBcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIuWIt+aWsFwiLEVuZGxlc3NCdWZmTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFRocmVlV2VpZ2h0KCkpXHJcbiAgICAgICAgbGV0IGlkID1FbmRsZXNzQnVmZk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRUaHJlZVdlaWdodCgpXHJcbiAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuaXoOWwveaMkeaImF/kuI3lkIxJROeahGJ1ZmbnmoTojrflj5bmrKHmlbAraWRbMF0pO1xyXG4gICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7ml6DlsL3mjJHmiJhf5LiN5ZCMSUTnmoRidWZm55qE6I635Y+W5qyh5pWwK2lkWzFdKTtcclxuICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5peg5bC95oyR5oiYX+S4jeWQjElE55qEYnVmZueahOiOt+WPluasoeaVsCtpZFsyXSk7XHJcbiAgICAgICAgaWYodGhpcy5SYWZmbGVOdW1iZXI9PTApe1xyXG4gICAgICAgICAgICB0aGlzLlJhZmZsZU51bWJlcj0zXHJcbiAgICAgICAgICAgIGxldCBvcj1FbmRsZXNzQnVmZk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRXZWlnaHRPcmFuZ2UoKS8v5q+P5LqU5qyhICDlvpfliLDkuIDkuKrmqZnoibLlj4rku6XkuIrnmoRidWZmXHJcbiAgICAgICAgICAgIGxldCBJc3RoZXJlYW55PTBcclxuICAgICAgICAgICAgbGV0IHNlcXVlbmNlPVtdXHJcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLkVuZGxlc3MuY2hpbGRyZW4ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLkVuZGxlc3MuY2hpbGRyZW5baW5kZXhdLmFjdGl2ZT09dHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IFJhcml0eT1FbmRsZXNzQnVmZk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRSYXJpdHkoaWRbaW5kZXhdKSBcclxuICAgICAgICAgICAgICAgICAgICBpZihSYXJpdHk+PTQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5peg5bC95oyR5oiYX+WIt+aWsGJ1Zmbml7bop6blj5Hkv53lupXnmoTmrKHmlbApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBJc3RoZXJlYW55PTFcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UucHVzaChpbmRleClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoSXN0aGVyZWFueT09MCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgcm9tPU15VG9vbC5yYW5kb20oMCwoc2VxdWVuY2UubGVuZ3RoLTEpKVxyXG4gICAgICAgICAgICAgICAgaWRbc2VxdWVuY2Vbcm9tXV09b3JcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoQnVmZkRpc3BsYXkuc3VycGx1c251bWJlcj4tMSl7XHJcbiAgICAgICAgICAgIHRoaXMuc3VycGx1c3R4dC5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLnN1cnBsdXN0eHQuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0VGV4dElkKDgwMDAzMCkvL+acrOi9rui/mOWJqeWkmuWwkeasoemAieaLqWJ1ZmbnmoTmnLrkvJpcclxuICAgICAgICAgICAgaWYoQnVmZkRpc3BsYXkuc3VycGx1c251bWJlcj4wKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuUmVmcmVzaHN1cnBsdXNudW1iZXIoQnVmZkRpc3BsYXkuc3VycGx1c251bWJlcikvL+WIt+aWsEJ1ZmZEaXNwbGF5LnN1cnBsdXNudW1iZXIqM+S4qmJ1Zmblh7rmnaVcclxuICAgICAgICAgICAgICAgIEJ1ZmZEaXNwbGF5LnN1cnBsdXNudW1iZXI9MFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIEJ1ZmZEaXNwbGF5LnN1cnBsdXNudW1iZXI9MFxyXG4gICAgICAgICAgICB0aGlzLnN1cnBsdXN0eHQuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0UmVwbGFjZVZhbHVlKCd+JyxCdWZmRGlzcGxheS5zdXJwbHVzbnVtYmVyKyAnJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiKysrKysrKytcIixvcilcclxuICAgICAgICB0aGlzLlJpY2hUZXh0UmVmcmVzaCgpXHJcblxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLkVuZGxlc3MuY2hpbGRyZW4ubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuRW5kbGVzcy5jaGlsZHJlbltpbmRleF0uYWN0aXZlPT10cnVlKXtcclxuICAgICAgICAgICAgICAgIGxldCBpdGVtXHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLkVuZGxlc3MuY2hpbGRyZW5baW5kZXhdLmdldENoaWxkQnlOYW1lKFwiaXRlbVwiKS5jaGlsZHJlbkNvdW50PT0wKXtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtPWNjLmluc3RhbnRpYXRlKHRoaXMuRW5kbGVzc0J1ZmYpXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5lbmFibGVkPWZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgdGhpcy5vbkhlcm9Ub3VjaFN0YXJ0LCB0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX01PVkUsIHRoaXMub25IZXJvVG91Y2hNb3ZlLCB0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vbkhlcm9Ub3VjaEVuZCwgdGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9DQU5DRUwsIHRoaXMub25IZXJvVG91Y2hDYW5jZWwsIHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbT10aGlzLkVuZGxlc3MuY2hpbGRyZW5baW5kZXhdLmdldENoaWxkQnlOYW1lKFwiaXRlbVwiKS5jaGlsZHJlblswXVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IFJhcml0eT1FbmRsZXNzQnVmZk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRSYXJpdHkoaWRbaW5kZXhdKSBcclxuICAgICAgICAgICAgICAgIGxldCBUeXBlPUVuZGxlc3NCdWZmTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFR5cGUoaWRbaW5kZXhdKSBcclxuICAgICAgICAgICAgICAgIGxldCBQYXJhbWV0ZXI9RW5kbGVzc0J1ZmZNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UGFyYW1ldGVyKGlkW2luZGV4XSkgXHJcbiAgICAgICAgICAgICAgICBpdGVtLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lPXRoaXMuY29weV91aS5nZXRTcHJpdGVGcmFtZShcIkVuZGxlc3NCdWZmX1wiK2lkW2luZGV4XSlcclxuICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuY2xpY2tFdmVudHNbMF0uY3VzdG9tRXZlbnREYXRhPVwiXCIrKGlkW2luZGV4XSoxMDAwMClcclxuICAgICAgICAgICAgICAgIGl0ZW0uYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgICAgIC8v54GwICDnu78gICDok50gICDntKsgICAg6buEICAgIOe6olxyXG4gICAgICAgICAgICAgICAgbGV0IGNvbG9yPVtuZXcgY2MuQ29sb3IoOTksIDk5LCA5OSksbmV3IGNjLkNvbG9yKDExMywgMTAwLCA1OSksbmV3IGNjLkNvbG9yKDI4LCA5OCwgMTc2KSxuZXcgY2MuQ29sb3IoMTUwLCAzMCwgMTY4KSxuZXcgY2MuQ29sb3IoMTkzLCAxMTQsIDApLG5ldyBjYy5Db2xvcigxODgsIDM2LCAzMSldXHJcbiAgICAgICAgICAgICAgICBsZXQgdHh0PXRoaXMuRW5kbGVzcy5jaGlsZHJlbltpbmRleF0uZ2V0Q2hpbGRCeU5hbWUoXCJ0ZXh0XCIpXHJcbiAgICAgICAgICAgICAgICB0eHQuY29sb3I9Y29sb3JbUmFyaXR5XVxyXG5cclxuICAgICAgICAgICAgICAgIHR4dC5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zZXRUZXh0SWQoODAxMDAwK1R5cGUpXHJcblxyXG4gICAgICAgICAgICAgICAgaWYoVHlwZT09MXx8VHlwZT09Mnx8VHlwZT09NHx8VHlwZT09NXx8VHlwZT09Nnx8VHlwZT09N3x8VHlwZT09OHx8VHlwZT09OXx8VHlwZT09MTB8fFR5cGU9PTExKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc1BhcmFtZXRlcj1QYXJhbWV0ZXIqMTAwXHJcbiAgICAgICAgICAgICAgICAgICAgdHh0LmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnNldFJlcGxhY2VWYWx1ZSgnficsIE15VG9vbC5udW1iZXJGb3JtYXQoc1BhcmFtZXRlciwyKSsgJyUnKTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHR4dC5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zZXRSZXBsYWNlVmFsdWUoJ34nLCBQYXJhbWV0ZXIrICcnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIHR4dC5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zZXRSZXBsYWNlVmFsdWUoJ34nLCBQYXJhbWV0ZXIrICcnKTtcclxuICAgICAgICAgICAgICAgIGl0ZW0ucGFyZW50PXRoaXMuRW5kbGVzcy5jaGlsZHJlbltpbmRleF0uZ2V0Q2hpbGRCeU5hbWUoXCJpdGVtXCIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBSZWZyZXNoc3VycGx1c251bWJlcihzdXJwbHVzbnVtYmVyKXsvL+WIt+aWsEJ1ZmZEaXNwbGF5LnN1cnBsdXNudW1iZXIqM+S4qmJ1Zmblh7rmnaVcclxuICAgICAgICBsZXQgbXludW1iZXI9c3VycGx1c251bWJlclxyXG4gICAgICAgIGxldCBNb25zdGVyRGV0YWlsc2Fycj1bXVxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBteW51bWJlcjsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBsZXQgYT1FbmRsZXNzQnVmZk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRUaHJlZVdlaWdodCgpXHJcbiAgICAgICAgICAgIE1vbnN0ZXJEZXRhaWxzYXJyLnNwbGljZS5hcHBseShNb25zdGVyRGV0YWlsc2FycixbTW9uc3RlckRldGFpbHNhcnIubGVuZ3RoLDBdLmNvbmNhdChhKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiKysrKysrKysrK1wiLE1vbnN0ZXJEZXRhaWxzYXJyKVxyXG4gICAgICAgIGxldCB0ZWFtTGlzdD1IZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFRlYW1MaXN0KEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZSk7XHJcbiAgICAgICAgbGV0IG15YnVmZmluZGV4PTBcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0ZWFtTGlzdC5sZW5ndGg7IGkrKykgey8v6Iux6ZuE55qE5qiq5o6SICAgIOKAlOKAlCAgNeS4quiLsembhFxyXG4gICAgICAgICAgICAgICAgbGV0IGhlcm9UeXBlPXRlYW1MaXN0W2ldO1xyXG4gICAgICAgICAgICAgICAgaWYoaGVyb1R5cGU+MCl7Ly/ov5nkuKrmqKrmjpLmnInoi7Hpm4RcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuQnVmZlswXS5sZW5ndGg7IGorKykgey8v6Iux6ZuE55qE56uW5o6SICAgIHwgICDlm5vkuKrnqbrmoLxcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLkJ1ZmZbaV1bal09PTAmJm15YnVmZmluZGV4PChNb25zdGVyRGV0YWlsc2Fyci5sZW5ndGgpKXsvL+eOsOWcqOaUvuWIsOesrOWHoOS4qmJ1ZmbkuIvkuoZcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNmeT0wLy/mmK/lkKbmnInnsbvlnovkuIDmoLfnmoRcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGlkPU1vbnN0ZXJEZXRhaWxzYXJyW215YnVmZmluZGV4XS8vaWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IFR5cGU9RW5kbGVzc0J1ZmZNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VHlwZShpZCkgLy/ov5nkuKppZOeahGJ1ZmbnsbvlnotcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBSYXJpdHk9RW5kbGVzc0J1ZmZNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UmFyaXR5KGlkKSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoVHlwZT09OCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBteWJ1ZmZpbmRleCsrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihteWJ1ZmZpbmRleDwoTW9uc3RlckRldGFpbHNhcnIubGVuZ3RoKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ9TW9uc3RlckRldGFpbHNhcnJbbXlidWZmaW5kZXhdLy9pZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFR5cGU9RW5kbGVzc0J1ZmZNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VHlwZShpZCkgLy/ov5nkuKppZOeahGJ1ZmbnsbvlnotcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNmPTAvL+acieWHoOS4quiLsembhOijheS4iuS6hui/meS4quexu+Wei+eahGJ1ZmZcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHl4PTAvL+acieWHoOS4quiLsembhFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGVhbUxpc3QubGVuZ3RoOyBpbmRleCsrKSB7Ly/miYDmnInnmoToi7Hpm4Tpg73oo4XlpIfkuobov5nkuKrnsbvlnovnmoRidWZmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaGVyb1R5cGU9dGVhbUxpc3RbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoaGVyb1R5cGU+MCl7Ly/ov5nkuKrmqKrmjpLmnInoi7Hpm4RcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2ZzPTAvL+i/meS4quiLsembhOijheS4iuS6hui/meS4quexu+Wei+eahGJ1ZmZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBteWpqaW5kZXhzID0gMDsgbXlqamluZGV4cyA8IHRoaXMuQnVmZltpbmRleF0ubGVuZ3RoOyBteWpqaW5kZXhzKyspIHsvL+i/meS4quiLsembhOacieayoeacieijheWkh+S4gOagt+exu+Wei+eahGJ1ZmZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5CdWZmW2luZGV4XVtteWpqaW5kZXhzXT4wKXsvL+ijheWkh+S6hmJ1ZmZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKFR5cGU9PUVuZGxlc3NCdWZmTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFR5cGUodGhpcy5CdWZmW2luZGV4XVtteWpqaW5kZXhzXSkpey8v57G75Z6L5LiA5qC377yM5qCH6K6w5LiA5LiLXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2ZzKytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5eCsrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2ZzPjApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZisrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiX19fX19fX19fX+acieWkmuS4quiLsembhO+8mlwiLHl4LFwi5pyJ5aSa5bCR5Liq6Iux6ZuE6KOF5aSH5LqG6L+Z5LiqYnVmZlwiLHNmKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZj09eXgpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbXlidWZmaW5kZXgrK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRlYW1MaXN0Lmxlbmd0aDsgaW5kZXgrKykgey8v5omA5pyJ55qE6Iux6ZuE6YO96KOF5aSH5LqG6L+Z5Liq57G75Z6L55qEYnVmZlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBoZXJvVHlwZT10ZWFtTGlzdFtpbmRleF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoaGVyb1R5cGU+MCl7Ly/ov5nkuKrmqKrmjpLmnInoi7Hpm4RcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgbXlqamluZGV4cyA9IDA7IG15amppbmRleHMgPCB0aGlzLkJ1ZmZbaW5kZXhdLmxlbmd0aDsgbXlqamluZGV4cysrKSB7Ly/ov5nkuKroi7Hpm4TmnInmsqHmnInoo4XlpIfkuIDmoLfnsbvlnovnmoRidWZmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLkJ1ZmZbaW5kZXhdW215amppbmRleHNdPjApey8v6KOF5aSH5LqGYnVmZlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKFR5cGU9PUVuZGxlc3NCdWZmTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFR5cGUodGhpcy5CdWZmW2luZGV4XVtteWpqaW5kZXhzXSkpey8v57G75Z6L5LiA5qC377yM5qCH6K6w5LiA5LiLXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKFJhcml0eT5FbmRsZXNzQnVmZk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRSYXJpdHkodGhpcy5CdWZmW2luZGV4XVtteWpqaW5kZXhzXSkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvKHRlYW1MaXN0W2ldKS5yZW1vdmVFbmRsZXNzQnVmZih0aGlzLkJ1ZmZbaV1bal0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkJ1ZmZbaV1bal09TW9uc3RlckRldGFpbHNhcnJbbXlidWZmaW5kZXhdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZW5kbGVzc0J1ZmY9bmV3IEVuZGxlc3NCdWZmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgUGFyYW1ldGVyPUVuZGxlc3NCdWZmTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFBhcmFtZXRlcihpZCkgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5peg5bC95oyR5oiYX+S4jeWQjElE55qEYnVmZuijheWkh+asoeaVsCtpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmRsZXNzQnVmZi50eXBlPVR5cGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZGxlc3NCdWZmLmlkPWlkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmRsZXNzQnVmZi5yYXJpdHk9UmFyaXR5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmRsZXNzQnVmZi52YWx1ZT1QYXJhbWV0ZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVybyh0ZWFtTGlzdFtpXSkuYWRkRW5kbGVzc0J1ZmYoZW5kbGVzc0J1ZmYpLy/mt7vliqDkuIDkuKpidWZmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBteWpqaW5kZXggPSAwOyBteWpqaW5kZXggPCB0aGlzLkJ1ZmZbaV0ubGVuZ3RoOyBteWpqaW5kZXgrKykgey8v6L+Z5Liq6Iux6ZuE5pyJ5rKh5pyJ6KOF5aSH5LiA5qC357G75Z6L55qEYnVmZlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuQnVmZltpXVtteWpqaW5kZXhdPjApey8v6KOF5aSH5LqGYnVmZlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihUeXBlPT1FbmRsZXNzQnVmZk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRUeXBlKHRoaXMuQnVmZltpXVtteWpqaW5kZXhdKSl7Ly/nsbvlnovkuIDmoLfvvIzmoIforrDkuIDkuItcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNmeT0xXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihzZnk9PTApey8v6L+Z5LiA5o6S5rKh5pyJ55u45ZCM57G75Z6L55qEYnVmZiAgIOaJjeWPr+S7peijheS4iuWOu1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuQnVmZltpXVtqXT1Nb25zdGVyRGV0YWlsc2FycltteWJ1ZmZpbmRleF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIuaUvue9ruS4gOS4qu+8mlwiLGksailcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZW5kbGVzc0J1ZmY9bmV3IEVuZGxlc3NCdWZmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbGV0IFJhcml0eT1FbmRsZXNzQnVmZk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRSYXJpdHkoaWQpIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBQYXJhbWV0ZXI9RW5kbGVzc0J1ZmZNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UGFyYW1ldGVyKGlkKSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5peg5bC95oyR5oiYX+S4jeWQjElE55qEYnVmZuijheWkh+asoeaVsCtpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5kbGVzc0J1ZmYudHlwZT1UeXBlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5kbGVzc0J1ZmYuaWQ9aWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmRsZXNzQnVmZi5yYXJpdHk9UmFyaXR5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5kbGVzc0J1ZmYudmFsdWU9UGFyYW1ldGVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJidWZmOlwiLGVuZGxlc3NCdWZmLHRlYW1MaXN0W2ldKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVybyh0ZWFtTGlzdFtpXSkuYWRkRW5kbGVzc0J1ZmYoZW5kbGVzc0J1ZmYpLy/mt7vliqDkuIDkuKpidWZmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbXlidWZmaW5kZXgrK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiKysrKysrKysrKyvmlL7kuIvlh6DkuKrkuobvvJpcIixteWJ1ZmZpbmRleClcclxuICAgICAgICBpZihteWJ1ZmZpbmRleDwoTW9uc3RlckRldGFpbHNhcnIubGVuZ3RoKSl7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGVhbUxpc3QubGVuZ3RoOyBpKyspIHsvL+iLsembhOeahOaoquaOkiAgICDigJTigJQgIDXkuKroi7Hpm4RcclxuICAgICAgICAgICAgICAgIGxldCBoZXJvVHlwZT10ZWFtTGlzdFtpXTtcclxuICAgICAgICAgICAgICAgIGlmKGhlcm9UeXBlPjApey8v6L+Z5Liq5qiq5o6S5pyJ6Iux6ZuEXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLkJ1ZmZbMF0ubGVuZ3RoOyBqKyspIHsvL+iLsembhOeahOerluaOkiAgICB8ICAg5Zub5Liq56m65qC8XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5CdWZmW2ldW2pdPT0wJiZteWJ1ZmZpbmRleDwoTW9uc3RlckRldGFpbHNhcnIubGVuZ3RoKSl7Ly/njrDlnKjmlL7liLDnrKzlh6DkuKpidWZm5LiL5LqGXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzZnk9MC8v5piv5ZCm5pyJ57G75Z6L5LiA5qC355qEXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpZD1Nb25zdGVyRGV0YWlsc2FycltteWJ1ZmZpbmRleF0vL2lkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBUeXBlPUVuZGxlc3NCdWZmTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFR5cGUoaWQpIC8v6L+Z5LiqaWTnmoRidWZm57G75Z6LXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgUmFyaXR5PUVuZGxlc3NCdWZmTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFJhcml0eShpZCkgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKFR5cGU9PTgpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbXlidWZmaW5kZXgrK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYobXlidWZmaW5kZXg8KE1vbnN0ZXJEZXRhaWxzYXJyLmxlbmd0aCkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkPU1vbnN0ZXJEZXRhaWxzYXJyW215YnVmZmluZGV4XS8vaWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUeXBlPUVuZGxlc3NCdWZmTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFR5cGUoaWQpIC8v6L+Z5LiqaWTnmoRidWZm57G75Z6LXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzZj0wLy/mnInlh6DkuKroi7Hpm4Too4XkuIrkuobov5nkuKrnsbvlnovnmoRidWZmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB5eD0wLy/mnInlh6DkuKroi7Hpm4RcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRlYW1MaXN0Lmxlbmd0aDsgaW5kZXgrKykgey8v5omA5pyJ55qE6Iux6ZuE6YO96KOF5aSH5LqG6L+Z5Liq57G75Z6L55qEYnVmZlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGhlcm9UeXBlPXRlYW1MaXN0W2luZGV4XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGhlcm9UeXBlPjApey8v6L+Z5Liq5qiq5o6S5pyJ6Iux6ZuEXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNmcz0wLy/ov5nkuKroi7Hpm4Too4XkuIrkuobov5nkuKrnsbvlnovnmoRidWZmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgbXlqamluZGV4cyA9IDA7IG15amppbmRleHMgPCB0aGlzLkJ1ZmZbaW5kZXhdLmxlbmd0aDsgbXlqamluZGV4cysrKSB7Ly/ov5nkuKroi7Hpm4TmnInmsqHmnInoo4XlpIfkuIDmoLfnsbvlnovnmoRidWZmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuQnVmZltpbmRleF1bbXlqamluZGV4c10+MCl7Ly/oo4XlpIfkuoZidWZmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihUeXBlPT1FbmRsZXNzQnVmZk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRUeXBlKHRoaXMuQnVmZltpbmRleF1bbXlqamluZGV4c10pKXsvL+exu+Wei+S4gOagt++8jOagh+iusOS4gOS4i1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNmcysrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeXgrK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNmcz4wKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2YrK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIl9fX19fX19fX1/mnInlpJrkuKroi7Hpm4TvvJpcIix5eCxcIuacieWkmuWwkeS4quiLsembhOijheWkh+S6hui/meS4qmJ1ZmZcIixzZilcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2Y9PXl4KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG15YnVmZmluZGV4KytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0ZWFtTGlzdC5sZW5ndGg7IGluZGV4KyspIHsvL+aJgOacieeahOiLsembhOmDveijheWkh+S6hui/meS4quexu+Wei+eahGJ1ZmZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaGVyb1R5cGU9dGVhbUxpc3RbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGhlcm9UeXBlPjApey8v6L+Z5Liq5qiq5o6S5pyJ6Iux6ZuEXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IG15amppbmRleHMgPSAwOyBteWpqaW5kZXhzIDwgdGhpcy5CdWZmW2luZGV4XS5sZW5ndGg7IG15amppbmRleHMrKykgey8v6L+Z5Liq6Iux6ZuE5pyJ5rKh5pyJ6KOF5aSH5LiA5qC357G75Z6L55qEYnVmZlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5CdWZmW2luZGV4XVtteWpqaW5kZXhzXT4wKXsvL+ijheWkh+S6hmJ1ZmZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihUeXBlPT1FbmRsZXNzQnVmZk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRUeXBlKHRoaXMuQnVmZltpbmRleF1bbXlqamluZGV4c10pKXsvL+exu+Wei+S4gOagt++8jOagh+iusOS4gOS4i1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihSYXJpdHk+RW5kbGVzc0J1ZmZNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UmFyaXR5KHRoaXMuQnVmZltpbmRleF1bbXlqamluZGV4c10pKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVybyh0ZWFtTGlzdFtpXSkucmVtb3ZlRW5kbGVzc0J1ZmYodGhpcy5CdWZmW2ldW2pdKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5CdWZmW2ldW2pdPU1vbnN0ZXJEZXRhaWxzYXJyW215YnVmZmluZGV4XVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGVuZGxlc3NCdWZmPW5ldyBFbmRsZXNzQnVmZlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IFBhcmFtZXRlcj1FbmRsZXNzQnVmZk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQYXJhbWV0ZXIoaWQpIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuaXoOWwveaMkeaImF/kuI3lkIxJROeahGJ1Zmboo4XlpIfmrKHmlbAraWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5kbGVzc0J1ZmYudHlwZT1UeXBlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmRsZXNzQnVmZi5pZD1pZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5kbGVzc0J1ZmYucmFyaXR5PVJhcml0eVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5kbGVzc0J1ZmYudmFsdWU9UGFyYW1ldGVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm8odGVhbUxpc3RbaV0pLmFkZEVuZGxlc3NCdWZmKGVuZGxlc3NCdWZmKS8v5re75Yqg5LiA5LiqYnVmZlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgbXlqamluZGV4ID0gMDsgbXlqamluZGV4IDwgdGhpcy5CdWZmW2ldLmxlbmd0aDsgbXlqamluZGV4KyspIHsvL+i/meS4quiLsembhOacieayoeacieijheWkh+S4gOagt+exu+Wei+eahGJ1ZmZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLkJ1ZmZbaV1bbXlqamluZGV4XT4wKXsvL+ijheWkh+S6hmJ1ZmZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoVHlwZT09RW5kbGVzc0J1ZmZNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VHlwZSh0aGlzLkJ1ZmZbaV1bbXlqamluZGV4XSkpey8v57G75Z6L5LiA5qC377yM5qCH6K6w5LiA5LiLXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZnk9MVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2Z5PT0wKXsvL+i/meS4gOaOkuayoeacieebuOWQjOexu+Wei+eahGJ1ZmYgICDmiY3lj6/ku6Xoo4XkuIrljrtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkJ1ZmZbaV1bal09TW9uc3RlckRldGFpbHNhcnJbbXlidWZmaW5kZXhdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCLmlL7nva7kuIDkuKrvvJpcIixpLGopXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGVuZGxlc3NCdWZmPW5ldyBFbmRsZXNzQnVmZlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxldCBSYXJpdHk9RW5kbGVzc0J1ZmZNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UmFyaXR5KGlkKSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgUGFyYW1ldGVyPUVuZGxlc3NCdWZmTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFBhcmFtZXRlcihpZCkgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuaXoOWwveaMkeaImF/kuI3lkIxJROeahGJ1Zmboo4XlpIfmrKHmlbAraWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZGxlc3NCdWZmLnR5cGU9VHlwZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZGxlc3NCdWZmLmlkPWlkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5kbGVzc0J1ZmYucmFyaXR5PVJhcml0eVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZGxlc3NCdWZmLnZhbHVlPVBhcmFtZXRlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiYnVmZjpcIixlbmRsZXNzQnVmZix0ZWFtTGlzdFtpXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm8odGVhbUxpc3RbaV0pLmFkZEVuZGxlc3NCdWZmKGVuZGxlc3NCdWZmKS8v5re75Yqg5LiA5LiqYnVmZlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG15YnVmZmluZGV4KytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuQnVmZi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuQnVmZltqXS5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5CdWZmW2ldW2pdPjApe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZXhpYW9ub2RlPWNjLmluc3RhbnRpYXRlKHRoaXMudGV4aWFvKVxyXG4gICAgICAgICAgICAgICAgICAgIHRleGlhb25vZGUueD10aGlzLkVuZGxlc3NfTGlzdC5jaGlsZHJlbltpXS5jaGlsZHJlbltqXS54XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4aWFvbm9kZS55PXRoaXMuRW5kbGVzc19MaXN0LmNoaWxkcmVuW2ldLmNoaWxkcmVuW2pdLnlcclxuICAgICAgICAgICAgICAgICAgICB0ZXhpYW9ub2RlLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4aWFvbm9kZS5wYXJlbnQ9dGhpcy5tdHRleGlhb1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoODAwMDM0KSwzKTsvLzgwMDAzNOW3suWhq+WFhWJ1ZmZcclxuICAgICAgICAgICAgdGhpcy5SZWZyZXNoQnVmZigpXHJcbiAgICAgICAgfSwwLjIpXHJcblxyXG5cclxuICAgIH1cclxuICAgIGNsaWNrQnRuQnV5KCl7Ly/pkrvnn7PotK3kubBcclxuICAgICAgICBsZXQgZ2VtPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuR2VtKTtcclxuICAgICAgICBpZihnZW0+PTIwMCl7XHJcbiAgICAgICAgICAgIC8v5Y+v5Lul6LSt5LmwXHJcbiAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7ml6DlsL3mjJHmiJhf5L2/55So6ZK755+z5Yi35pawYnVmZueahOasoeaVsCk7XHJcbiAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShQcm9wSWQuR2VtLC0yMDApO1xyXG4gICAgICAgICAgICB0aGlzLlJhZmZsZU51bWJlci0tXHJcbiAgICAgICAgICAgIHRoaXMuUmVmcmVzaCgpXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIC8v6ZKx5LiN5aSfXHJcbiAgICAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguQ29pblBvcCxVSUxheWVyTGV2ZWwuVGhyZWUse29uQ29tcGxldGVkOih1aU5vZGUpPT4ge1xyXG4gICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChDb2luUG9wKS5pbml0VWkoUHJvcElkLkdlbSlcclxuICAgICAgICAgICAgfSx9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjbGlja0J0bkJ1eUFkKCl7Ly/lub/lkYrotK3kubBcclxuICAgICAgICBBcGtNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1ZpZGVvKCgoaXNUcnVlKT0+e1xyXG4gICAgICAgICAgICBpZihpc1RydWUpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5SYWZmbGVOdW1iZXItLVxyXG4gICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuaXoOWwveaMkeaImF/kvb/nlKjlub/lkYrliLfmlrBidWZm55qE5qyh5pWwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuUmVmcmVzaCgpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KSxWSURFT19UWVBFLkVxdWlwKVxyXG4gICAgfVxyXG4gICAgY2xpY2tCdG5DbG9zZSgpLy/lhbPpl61cclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLnR5cGU9PTEpe1xyXG4gICAgICAgICAgICB0aGlzLlRpcHNwb3AuYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZGVzdHJveVNlbGYoKVxyXG4gICAgfVxyXG4gICAgY2xpY2tCdG5UaXBzcG9wKCl7Ly/lhbPpl63mj5DnpLrlvLnnqpdcclxuICAgICAgICB0aGlzLlRpcHNwb3AuYWN0aXZlPWZhbHNlXHJcbiAgICB9XHJcbiAgICBkZXN0cm95U2VsZigpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy50eXBlPT0xKXtcclxuICAgICAgICAgICAgLy/liLfmlrDkuIvkuIDlm57lkIhcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCLliLfmlrDkuIvkuIDlm57lkIhcIixCdWZmRGlzcGxheS5zdXJwbHVzbnVtYmVyKVxyXG4gICAgICAgICAgICBpZihCdWZmRGlzcGxheS5zdXJwbHVzbnVtYmVyPjApe1xyXG4gICAgICAgICAgICAgICAgQnVmZkRpc3BsYXkuc3VycGx1c251bWJlci0tXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5FbmRsZXNzLmNoaWxkcmVuLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuRW5kbGVzcy5jaGlsZHJlbltpbmRleF0uYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuY2xpY2tCdG5UaXBzcG9wKClcclxuICAgICAgICAgICAgICAgIHRoaXMuUmVmcmVzaCgpXHJcbiAgICAgICAgICAgICAgICB0aGlzLlJlZnJlc2hCdWZmKClcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIEJ1ZmZEaXNwbGF5LnN1cnBsdXNudW1iZXI9LTFcclxuICAgICAgICAgICAgICAgIC8vIGlmKEJ1ZmZEaXNwbGF5LnN1cnBsdXNudW1iZXIhPTApe1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydE5leHRMZXZlbCgpXHJcbiAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2xpY2tCdG5UaXBzcG9wKClcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIHRoaXMub25DbG9zZSgpO1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfc3RhdGU9R2FtZVN0YXRlLkdhbWVfUGxheWluZztcclxuICAgIH1cclxuICAgIGNsaWNrQnRuQ2xvc2VTa2lsbERlc2NyaXB0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5Ta2lsbERlc2NyaXB0aW9uLmdldENoaWxkQnlOYW1lKFwiQ29tbW9uX1RleHRCR1wiKS5hY3RpdmU9ZmFsc2VcclxuICAgICAgICB0aGlzLlNraWxsRGVzY3JpcHRpb24uYWN0aXZlPWZhbHNlXHJcbiAgICB9XHJcbn1cclxuIl19