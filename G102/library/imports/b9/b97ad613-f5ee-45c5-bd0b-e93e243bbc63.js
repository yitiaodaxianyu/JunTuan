"use strict";
cc._RF.push(module, 'b97adYT9e5Fxb0L6T4kO7xj', 'GetTip');
// Scripts/UI/GetTip.ts

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
var Prop_1 = require("../Prop/Prop");
var PropManager_1 = require("../Prop/PropManager");
var PropConfig_1 = require("../Prop/PropConfig");
var MyTool_1 = require("../Tools/MyTool");
var AudioConstants_1 = require("../Sound/AudioConstants");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GetTip = /** @class */ (function (_super) {
    __extends(GetTip, _super);
    function GetTip() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.close_callback = null;
        _this.is_can_touch = false;
        _this.node_list = [];
        return _this;
        // update (dt) {}
    }
    GetTip.prototype.onLoad = function () {
        var bg = this.node.getChildByName('bg0');
        bg.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.close_callback = null;
        // if(VipManager.getIsVip()==true)
        // {
        //     if(VipManager.getVipFreeNum()>0)
        //     {
        //         let vipTip=this.node.getChildByName('vipTip');
        //         vipTip.active=true;
        //     }
        // }
        this.node_list = new Array();
    };
    GetTip.prototype.onDestroy = function () {
        var bg = this.node.getChildByName('bg0');
        if (bg) {
            bg.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        }
    };
    GetTip.prototype.onTouchStart = function () {
        if (this.is_can_touch) {
            this.startFly();
            if (this.close_callback) {
                this.close_callback();
            }
            this.node.removeFromParent();
        }
    };
    GetTip.prototype.addShowGetPorp = function (prop, callBack) {
        var _this = this;
        // this.node.getChildByName('propsScrollView').active=false;
        this.close_callback = callBack;
        var content = this.node.getChildByName("propsScrollView").getComponent(cc.ScrollView).content;
        content.getComponent(cc.Layout).enabled = false;
        content.parent.parent.getComponent(cc.ScrollView).enabled = false;
        var acT = 0.2;
        if (prop.parent == null) {
            prop.parent = this.node;
            prop.scale = 0;
            prop.setPosition(cc.v2(0, -50));
            cc.tween(prop).to(acT, { scale: 1 }).start();
        }
        else {
            var item = cc.instantiate(prop);
            item.scale = 0;
            item.parent = this.node;
            item.setPosition(cc.v2(0, -50));
            cc.tween(item).to(acT, { scale: 1 }).start();
        }
        this.node_list.push(prop);
        this.scheduleOnce(function () {
            _this.is_can_touch = true;
        }, acT);
        // if(prop.parent==null)
        // {
        //     prop.parent=this.node;
        //     prop.scale=1;
        // }else
        // {
        //     let node=cc.instantiate(prop);
        //     node.opacity=255;
        //     node.angle=0;
        //     //node.scale=1;
        //     node.setPosition(cc.v2(0,0));
        //     this.node.addChild(node);
        //     prop.scale=1;
        // }
        // this.node_list.push(prop);
        // this.is_can_touch=true;
    };
    GetTip.prototype.addMultiplePorp = function (props, callBack) {
        var _this = this;
        // this.node.getChildByName('light').active=false;
        // this.node.getChildByName('kuang').active=false;
        this.close_callback = callBack;
        var content = this.node.getChildByName('propsScrollView').getComponent(cc.ScrollView).content;
        var len = props.length;
        var jgT = 0.2;
        var delyT = len * jgT;
        // console.log("本次长度： " + len);
        // console.log(3 / 2);
        if (props.length <= 5) {
            content.getComponent(cc.Layout).enabled = false;
            content.parent.parent.getComponent(cc.ScrollView).enabled = false;
        }
        var _loop_1 = function (i) {
            this_1.scheduleOnce(function () {
                var prop = props[i];
                cc.log(i);
                if (prop.parent == null) {
                    prop.parent = content;
                    if (props.length <= 5) {
                        if (props.length % 2 == 0) {
                            prop.x = (prop.width + content.getComponent(cc.Layout).spacingX) * 0.5 + (prop.width + content.getComponent(cc.Layout).spacingX) * i - (props.length / 2) * (prop.width + content.getComponent(cc.Layout).spacingX);
                        }
                        else {
                            prop.x = (prop.width + content.getComponent(cc.Layout).spacingX) * i - (props.length / 2 - 0.5) * (prop.width + content.getComponent(cc.Layout).spacingX);
                        }
                    }
                    prop.scale = 0;
                    cc.tween(prop).to(0.2, { scale: 1 }).start();
                }
                else {
                    if (props.length <= 5) {
                        if (props.length % 2 == 0) {
                            prop.x = (prop.width + content.getComponent(cc.Layout).spacingX) * 0.5 + (prop.width + content.getComponent(cc.Layout).spacingX) * i - (props.length / 2) * (prop.width + content.getComponent(cc.Layout).spacingX);
                        }
                        else {
                            prop.x = (prop.width + content.getComponent(cc.Layout).spacingX) * i - (props.length / 2) * (prop.width + content.getComponent(cc.Layout).spacingX);
                        }
                    }
                    var item = cc.instantiate(prop);
                    item.scale = 0;
                    item.parent = content;
                    item.setPosition(cc.v2(0, 0));
                    cc.tween(item).to(0.2, { scale: 1 }).start();
                }
            }, jgT * i);
        };
        var this_1 = this;
        for (var i = 0; i < len; i++) {
            _loop_1(i);
        }
        this.node_list = props;
        this.scheduleOnce(function () {
            _this.is_can_touch = true;
        }, delyT);
        // let content=this.node.getChildByName('propsScrollView').getComponent(cc.ScrollView).content;        
        // let len=props.length;
        // let jgT=0.1;
        // let delyT=len*jgT;        
        // for(let i=0; i<len; i++)
        // {
        //     this.scheduleOnce(()=>{
        //         let prop=props[i];
        //         if(prop.parent==null)
        //         {
        //             content.addChild(prop);
        //         }else
        //         {
        //             let node=cc.instantiate(prop);
        //             node.opacity=255;
        //             node.angle=0;
        //             //node.scale=1;
        //             node.setPosition(cc.v2(0,0));
        //             content.addChild(node);
        //         }
        //     },jgT*i);
        //     //起飞        
        // }
        // this.node_list=props;
        // this.scheduleOnce(()=>{
        //     this.is_can_touch=true;
        // },delyT)
    };
    GetTip.prototype.showGetPropTip = function (propData, callBack) {
        // this.close_callback=callBack;
        // let content = this.node.getChildByName("propsScrollView").getComponent(cc.ScrollView).content
        // let jgT=0.3;
        // let delyT=propData.length*jgT;
        // if(propData.length > 5){
        //     content.x = 0;
        // }else{
        //     content.x -= (propData.length - 1) * 60;
        // }
        // for(let i = 0;i < propData.length;i++){
        //     this.scheduleOnce(()=>{
        //         let prop = PropManager.getInstance().createPropItem(propData[i].type,propData[i].num);
        //         content.addChild(prop);
        //         prop.scale = 0;
        //         cc.tween(prop).to(jgT,{scale:1}).start();
        //     },jgT*i)
        // }
        // // this.node_list=propData;
        // this.scheduleOnce(()=>{
        //     this.is_can_touch=true;
        // },delyT)
    };
    GetTip.prototype.startFly = function () {
        if (GameManager_1.default.getInstance().cur_game_scene != Constants_1.GameScene.home) {
            return;
        }
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_GetReward);
        var uiRoot = cc.find("Canvas/Ui_Root");
        var disPos = cc.v2(0, 0);
        var isRefresh = false;
        for (var i = 0; i < this.node_list.length; i++) {
            var node = this.node_list[i];
            //将这个节点的坐标转换成uiRoot的坐标
            var wordPos = node.parent.convertToWorldSpaceAR(node.getPosition());
            var nodePos = uiRoot.convertToNodeSpaceAR(wordPos);
            var prop = node.getComponent(Prop_1.default);
            if (!prop) {
                return;
            }
            // console.log("++++++++",prop.prop_id)
            switch (prop.prop_id) {
                case PropConfig_1.PropId.Coin:
                    {
                        var disNode = cc.find('Canvas/Top_Ui/top/iconCoin');
                        wordPos = disNode.parent.convertToWorldSpaceAR(disNode.getPosition());
                        disPos = uiRoot.convertToNodeSpaceAR(wordPos);
                        for (var i_1 = 0; i_1 < 20; i_1++) {
                            var startPosX = Math.random() * 300 - 200 + nodePos.x;
                            var startPosY = Math.random() * 300 - 200 + nodePos.y;
                            var startPos = cc.v2(startPosX, startPosY);
                            var newNode = new cc.Node();
                            newNode.addComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(PropConfig_1.PropId.Coin);
                            newNode.setPosition(startPos);
                            uiRoot.addChild(newNode);
                            cc.tween(newNode).then(MyTool_1.default.getBezierAct(startPos, disPos)).call(function () {
                                if (!isRefresh) {
                                    GameManager_1.default.getInstance().refreshCoinShow();
                                    GameManager_1.default.getInstance().refreshGemShow();
                                    isRefresh = true;
                                }
                            }).removeSelf().start();
                        }
                    }
                    break;
                case PropConfig_1.PropId.Gem:
                    {
                        var disNode = cc.find('Canvas/Top_Ui/top/iconGem');
                        wordPos = disNode.parent.convertToWorldSpaceAR(disNode.getPosition());
                        disPos = uiRoot.convertToNodeSpaceAR(wordPos);
                        for (var i_2 = 0; i_2 < 20; i_2++) {
                            var startPosX = Math.random() * 300 - 200 + nodePos.x;
                            var startPosY = Math.random() * 300 - 200 + nodePos.y;
                            var startPos = cc.v2(startPosX, startPosY);
                            var newNode = new cc.Node();
                            newNode.addComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(PropConfig_1.PropId.Gem);
                            newNode.setPosition(startPos);
                            uiRoot.addChild(newNode);
                            cc.tween(newNode).then(MyTool_1.default.getBezierAct(startPos, disPos)).call(function () {
                                if (!isRefresh) {
                                    GameManager_1.default.getInstance().refreshGemShow();
                                    GameManager_1.default.getInstance().refreshCoinShow();
                                    isRefresh = true;
                                }
                            }).removeSelf().start();
                        }
                    }
                    break;
                // case PropId.UserExp:{
                //     let disNode=cc.find('Canvas/Top_Ui/top/btnSetting');
                //     wordPos=disNode.parent.convertToWorldSpaceAR(disNode.getPosition());
                //     disPos=uiRoot.convertToNodeSpaceAR(wordPos);
                //     for(let i=0; i<20; i++){
                //         let startPosX=Math.random()*300-200+nodePos.x;
                //         let startPosY=Math.random()*300-200+nodePos.y;
                //         let startPos=cc.v2(startPosX,startPosY)
                //         let newNode=new cc.Node();
                //         newNode.addComponent(cc.Sprite).spriteFrame=PropManager.getInstance().getSpByPropId(PropId.UserExp);
                //         newNode.setPosition(startPos);
                //         uiRoot.addChild(newNode);
                //         cc.tween(newNode).then(MyTool.getBezierAct(startPos,disPos)).removeSelf().start();
                //     }
                // }break;                
                // default:{
                //     let disNode=cc.find('Canvas/Top_Ui/down/btnRole/icon');
                //     wordPos=disNode.parent.convertToWorldSpaceAR(disNode.getPosition());
                //     disPos=uiRoot.convertToNodeSpaceAR(wordPos);
                //     for(let i=0; i<20; i++){
                //         let startPosX=Math.random()*300-200+nodePos.x;
                //         let startPosY=Math.random()*300-200+nodePos.y;
                //         let startPos=cc.v2(startPosX,startPosY)
                //         let newNode=new cc.Node();
                //         newNode.addComponent(cc.Sprite).spriteFrame=PropManager.getInstance().getSpByPropId(PropId.HeroExp);
                //         newNode.setPosition(startPos);
                //         uiRoot.addChild(newNode);
                //         cc.tween(newNode).then(MyTool.getBezierAct(startPos,disPos)).removeSelf().start();
                //     }
                // }break;
            }
        }
    };
    GetTip = __decorate([
        ccclass
    ], GetTip);
    return GetTip;
}(cc.Component));
exports.default = GetTip;

cc._RF.pop();