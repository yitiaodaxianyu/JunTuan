"use strict";
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