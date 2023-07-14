
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/UI/GetTip.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVUlcXEdldFRpcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSwwQ0FBeUM7QUFDekMsOENBQXlDO0FBQ3pDLHFDQUFnQztBQUNoQyxtREFBa0Q7QUFDbEQsaURBQXNEO0FBQ3RELDBDQUFxQztBQUNyQywwREFBcUQ7QUFHL0MsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBb0MsMEJBQVk7SUFBaEQ7UUFBQSxxRUEwUkM7UUF4Ukcsb0JBQWMsR0FBVSxJQUFJLENBQUM7UUFDN0Isa0JBQVksR0FBUyxLQUFLLENBQUM7UUFDM0IsZUFBUyxHQUFXLEVBQUUsQ0FBQzs7UUFxUnZCLGlCQUFpQjtJQUNyQixDQUFDO0lBcFJHLHVCQUFNLEdBQU47UUFDSSxJQUFJLEVBQUUsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2QyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBQyxJQUFJLENBQUMsWUFBWSxFQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVELElBQUksQ0FBQyxjQUFjLEdBQUMsSUFBSSxDQUFDO1FBQ3pCLGtDQUFrQztRQUNsQyxJQUFJO1FBQ0osdUNBQXVDO1FBQ3ZDLFFBQVE7UUFDUix5REFBeUQ7UUFDekQsOEJBQThCO1FBQzlCLFFBQVE7UUFDUixJQUFJO1FBQ0osSUFBSSxDQUFDLFNBQVMsR0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFFRCwwQkFBUyxHQUFUO1FBQ0ksSUFBSSxFQUFFLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkMsSUFBRyxFQUFFLEVBQ0w7WUFDSSxFQUFFLENB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QyxDQUFDLENBQUMsSUFBSSxDQUFDO2dDQUM5RCxJQUFHLENBQUMsU0FBUyxFQUFDO29DQUNWLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxFQUFFLENBQUM7b0NBQzNDLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsZUFBZSxFQUFFLENBQUM7b0NBQzVDLFNBQVMsR0FBQyxJQUFJLENBQUM7aUNBQ2xCOzRCQUNMLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO3lCQUMzQjtxQkFDSjtvQkFBQSxNQUFNO2dCQUNQLHdCQUF3QjtnQkFDeEIsMkRBQTJEO2dCQUMzRCwyRUFBMkU7Z0JBQzNFLG1EQUFtRDtnQkFDbkQsK0JBQStCO2dCQUMvQix5REFBeUQ7Z0JBQ3pELHlEQUF5RDtnQkFDekQsa0RBQWtEO2dCQUNsRCxxQ0FBcUM7Z0JBQ3JDLCtHQUErRztnQkFDL0cseUNBQXlDO2dCQUN6QyxvQ0FBb0M7Z0JBQ3BDLDZGQUE2RjtnQkFDN0YsUUFBUTtnQkFDUiwwQkFBMEI7Z0JBQzFCLFlBQVk7Z0JBQ1osOERBQThEO2dCQUM5RCwyRUFBMkU7Z0JBQzNFLG1EQUFtRDtnQkFDbkQsK0JBQStCO2dCQUMvQix5REFBeUQ7Z0JBQ3pELHlEQUF5RDtnQkFDekQsa0RBQWtEO2dCQUNsRCxxQ0FBcUM7Z0JBQ3JDLCtHQUErRztnQkFDL0cseUNBQXlDO2dCQUN6QyxvQ0FBb0M7Z0JBQ3BDLDZGQUE2RjtnQkFDN0YsUUFBUTtnQkFDUixVQUFVO2FBQ2I7U0FDSjtJQUNMLENBQUM7SUF4UmdCLE1BQU07UUFEMUIsT0FBTztPQUNhLE1BQU0sQ0EwUjFCO0lBQUQsYUFBQztDQTFSRCxBQTBSQyxDQTFSbUMsRUFBRSxDQUFDLFNBQVMsR0EwUi9DO2tCQTFSb0IsTUFBTSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFZpcE1hbmFnZXIgfSBmcm9tIFwiLi4vQWRzL1ZpcE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgR2FtZVNjZW5lIH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCBQcm9wIGZyb20gXCIuLi9Qcm9wL1Byb3BcIjtcclxuaW1wb3J0IHsgUHJvcE1hbmFnZXIgfSBmcm9tIFwiLi4vUHJvcC9Qcm9wTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBQcm9wRGF0YSwgUHJvcElkIH0gZnJvbSBcIi4uL1Byb3AvUHJvcENvbmZpZ1wiO1xyXG5pbXBvcnQgTXlUb29sIGZyb20gXCIuLi9Ub29scy9NeVRvb2xcIjtcclxuaW1wb3J0IHsgU291bmRJbmRleCB9IGZyb20gXCIuLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5cclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2V0VGlwIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBjbG9zZV9jYWxsYmFjazpGdW5jdGlvbj1udWxsO1xyXG4gICAgaXNfY2FuX3RvdWNoOmJvb2xlYW49ZmFsc2U7XHJcbiAgICBub2RlX2xpc3Q6Y2MuTm9kZVtdPVtdO1xyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgbGV0IGJnPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnYmcwJyk7XHJcbiAgICAgICAgYmcub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsdGhpcy5vblRvdWNoU3RhcnQsdGhpcyk7XHJcbiAgICAgICAgdGhpcy5jbG9zZV9jYWxsYmFjaz1udWxsO1xyXG4gICAgICAgIC8vIGlmKFZpcE1hbmFnZXIuZ2V0SXNWaXAoKT09dHJ1ZSlcclxuICAgICAgICAvLyB7XHJcbiAgICAgICAgLy8gICAgIGlmKFZpcE1hbmFnZXIuZ2V0VmlwRnJlZU51bSgpPjApXHJcbiAgICAgICAgLy8gICAgIHtcclxuICAgICAgICAvLyAgICAgICAgIGxldCB2aXBUaXA9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCd2aXBUaXAnKTtcclxuICAgICAgICAvLyAgICAgICAgIHZpcFRpcC5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICB0aGlzLm5vZGVfbGlzdD1uZXcgQXJyYXkoKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkRlc3Ryb3kgKCkge1xyXG4gICAgICAgIGxldCBiZz10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2JnMCcpO1xyXG4gICAgICAgIGlmKGJnKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYmcub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULHRoaXMub25Ub3VjaFN0YXJ0LHRoaXMpO1xyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIG9uVG91Y2hTdGFydCgpe1xyXG4gICAgICAgIGlmKHRoaXMuaXNfY2FuX3RvdWNoKXtcclxuICAgICAgICAgICAgdGhpcy5zdGFydEZseSgpOyAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKHRoaXMuY2xvc2VfY2FsbGJhY2spXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VfY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm5vZGUucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGFkZFNob3dHZXRQb3JwKHByb3A6Y2MuTm9kZSxjYWxsQmFjaz86RnVuY3Rpb24pXHJcbiAgICB7XHJcbiAgICAgICAgLy8gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdwcm9wc1Njcm9sbFZpZXcnKS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jbG9zZV9jYWxsYmFjaz1jYWxsQmFjaztcclxuICAgICAgICBsZXQgY29udGVudCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInByb3BzU2Nyb2xsVmlld1wiKS5nZXRDb21wb25lbnQoY2MuU2Nyb2xsVmlldykuY29udGVudDtcclxuICAgICAgICBjb250ZW50LmdldENvbXBvbmVudChjYy5MYXlvdXQpLmVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICBjb250ZW50LnBhcmVudC5wYXJlbnQuZ2V0Q29tcG9uZW50KGNjLlNjcm9sbFZpZXcpLmVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICBsZXQgYWNUPTAuMjtcclxuICAgICAgICBpZihwcm9wLnBhcmVudCA9PSBudWxsKXtcclxuICAgICAgICAgICAgcHJvcC5wYXJlbnQgPSB0aGlzLm5vZGU7XHJcbiAgICAgICAgICAgIHByb3Auc2NhbGUgPSAwO1xyXG4gICAgICAgICAgICBwcm9wLnNldFBvc2l0aW9uKGNjLnYyKDAsLTUwKSk7XHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKHByb3ApLnRvKGFjVCx7c2NhbGU6MX0pLnN0YXJ0KCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGxldCBpdGVtID0gY2MuaW5zdGFudGlhdGUocHJvcCk7XHJcbiAgICAgICAgICAgIGl0ZW0uc2NhbGUgPSAwO1xyXG4gICAgICAgICAgICBpdGVtLnBhcmVudCA9IHRoaXMubm9kZTtcclxuICAgICAgICAgICAgaXRlbS5zZXRQb3NpdGlvbihjYy52MigwLC01MCkpO1xyXG4gICAgICAgICAgICBjYy50d2VlbihpdGVtKS50byhhY1Qse3NjYWxlOjF9KS5zdGFydCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5vZGVfbGlzdC5wdXNoKHByb3ApO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMuaXNfY2FuX3RvdWNoPXRydWU7XHJcbiAgICAgICAgfSxhY1QpXHJcbiAgICAgICAgLy8gaWYocHJvcC5wYXJlbnQ9PW51bGwpXHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgIC8vICAgICBwcm9wLnBhcmVudD10aGlzLm5vZGU7XHJcbiAgICAgICAgLy8gICAgIHByb3Auc2NhbGU9MTtcclxuICAgICAgICAvLyB9ZWxzZVxyXG4gICAgICAgIC8vIHtcclxuICAgICAgICAvLyAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUocHJvcCk7XHJcbiAgICAgICAgLy8gICAgIG5vZGUub3BhY2l0eT0yNTU7XHJcbiAgICAgICAgLy8gICAgIG5vZGUuYW5nbGU9MDtcclxuICAgICAgICAvLyAgICAgLy9ub2RlLnNjYWxlPTE7XHJcbiAgICAgICAgLy8gICAgIG5vZGUuc2V0UG9zaXRpb24oY2MudjIoMCwwKSk7XHJcbiAgICAgICAgLy8gICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICAvLyAgICAgcHJvcC5zY2FsZT0xO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyB0aGlzLm5vZGVfbGlzdC5wdXNoKHByb3ApO1xyXG4gICAgICAgIC8vIHRoaXMuaXNfY2FuX3RvdWNoPXRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkTXVsdGlwbGVQb3JwKHByb3BzOmNjLk5vZGVbXSxjYWxsQmFjaz86RnVuY3Rpb24pXHJcbiAgICB7XHJcbiAgICAgICAgLy8gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdsaWdodCcpLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAvLyB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2t1YW5nJykuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgIHRoaXMuY2xvc2VfY2FsbGJhY2s9Y2FsbEJhY2s7XHJcbiAgICAgICAgbGV0IGNvbnRlbnQ9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdwcm9wc1Njcm9sbFZpZXcnKS5nZXRDb21wb25lbnQoY2MuU2Nyb2xsVmlldykuY29udGVudDsgICAgICAgIFxyXG4gICAgICAgIGxldCBsZW49cHJvcHMubGVuZ3RoO1xyXG4gICAgICAgIGxldCBqZ1Q9MC4yO1xyXG4gICAgICAgIGxldCBkZWx5VD1sZW4qamdUOyAgIFxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwi5pys5qyh6ZW/5bqm77yaIFwiICsgbGVuKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZygzIC8gMik7XHJcbiAgICAgICAgaWYocHJvcHMubGVuZ3RoIDw9IDUpe1xyXG4gICAgICAgICAgICBjb250ZW50LmdldENvbXBvbmVudChjYy5MYXlvdXQpLmVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgY29udGVudC5wYXJlbnQucGFyZW50LmdldENvbXBvbmVudChjYy5TY3JvbGxWaWV3KS5lbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7aSA8IGxlbjtpKyspe1xyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICAgICAgbGV0IHByb3AgPSBwcm9wc1tpXTtjYy5sb2coaSk7XHJcbiAgICAgICAgICAgICAgICBpZihwcm9wLnBhcmVudCA9PSBudWxsKXtcclxuICAgICAgICAgICAgICAgICAgICBwcm9wLnBhcmVudCA9IGNvbnRlbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYocHJvcHMubGVuZ3RoIDw9IDUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihwcm9wcy5sZW5ndGggJSAyID09IDApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcC54ID0gKHByb3Aud2lkdGggKyBjb250ZW50LmdldENvbXBvbmVudChjYy5MYXlvdXQpLnNwYWNpbmdYKSAqIDAuNSArIChwcm9wLndpZHRoICsgY29udGVudC5nZXRDb21wb25lbnQoY2MuTGF5b3V0KS5zcGFjaW5nWCkgKiBpIC0gKHByb3BzLmxlbmd0aCAvIDIpICogKHByb3Aud2lkdGggKyBjb250ZW50LmdldENvbXBvbmVudChjYy5MYXlvdXQpLnNwYWNpbmdYKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wLnggPSAocHJvcC53aWR0aCArIGNvbnRlbnQuZ2V0Q29tcG9uZW50KGNjLkxheW91dCkuc3BhY2luZ1gpICogaSAtIChwcm9wcy5sZW5ndGggLyAyIC0gMC41KSAqIChwcm9wLndpZHRoICsgY29udGVudC5nZXRDb21wb25lbnQoY2MuTGF5b3V0KS5zcGFjaW5nWCkgO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHByb3Auc2NhbGUgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLnR3ZWVuKHByb3ApLnRvKDAuMix7c2NhbGU6MX0pLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBpZihwcm9wcy5sZW5ndGggPD0gNSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHByb3BzLmxlbmd0aCAlIDIgPT0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wLnggPSAocHJvcC53aWR0aCArIGNvbnRlbnQuZ2V0Q29tcG9uZW50KGNjLkxheW91dCkuc3BhY2luZ1gpICogMC41ICsgKHByb3Aud2lkdGggKyBjb250ZW50LmdldENvbXBvbmVudChjYy5MYXlvdXQpLnNwYWNpbmdYKSAqIGkgLSAocHJvcHMubGVuZ3RoIC8gMikgKiAocHJvcC53aWR0aCArIGNvbnRlbnQuZ2V0Q29tcG9uZW50KGNjLkxheW91dCkuc3BhY2luZ1gpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3AueCA9IChwcm9wLndpZHRoICsgY29udGVudC5nZXRDb21wb25lbnQoY2MuTGF5b3V0KS5zcGFjaW5nWCkgKiBpIC0gKHByb3BzLmxlbmd0aCAvIDIpICogKHByb3Aud2lkdGggKyBjb250ZW50LmdldENvbXBvbmVudChjYy5MYXlvdXQpLnNwYWNpbmdYKSA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSBjYy5pbnN0YW50aWF0ZShwcm9wKTtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLnNjYWxlID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLnBhcmVudCA9IGNvbnRlbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5zZXRQb3NpdGlvbihjYy52MigwLDApKTtcclxuICAgICAgICAgICAgICAgICAgICBjYy50d2VlbihpdGVtKS50bygwLjIse3NjYWxlOjF9KS5zdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LGpnVCAqIGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5vZGVfbGlzdD1wcm9wcztcclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLmlzX2Nhbl90b3VjaD10cnVlO1xyXG4gICAgICAgIH0sZGVseVQpXHJcbiAgICAgICAgLy8gbGV0IGNvbnRlbnQ9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdwcm9wc1Njcm9sbFZpZXcnKS5nZXRDb21wb25lbnQoY2MuU2Nyb2xsVmlldykuY29udGVudDsgICAgICAgIFxyXG4gICAgICAgIC8vIGxldCBsZW49cHJvcHMubGVuZ3RoO1xyXG4gICAgICAgIC8vIGxldCBqZ1Q9MC4xO1xyXG4gICAgICAgIC8vIGxldCBkZWx5VD1sZW4qamdUOyAgICAgICAgXHJcbiAgICAgICAgLy8gZm9yKGxldCBpPTA7IGk8bGVuOyBpKyspXHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgIC8vICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgIC8vICAgICAgICAgbGV0IHByb3A9cHJvcHNbaV07XHJcbiAgICAgICAgLy8gICAgICAgICBpZihwcm9wLnBhcmVudD09bnVsbClcclxuICAgICAgICAvLyAgICAgICAgIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICBjb250ZW50LmFkZENoaWxkKHByb3ApO1xyXG4gICAgICAgIC8vICAgICAgICAgfWVsc2VcclxuICAgICAgICAvLyAgICAgICAgIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShwcm9wKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICBub2RlLm9wYWNpdHk9MjU1O1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIG5vZGUuYW5nbGU9MDtcclxuICAgICAgICAvLyAgICAgICAgICAgICAvL25vZGUuc2NhbGU9MTtcclxuICAgICAgICAvLyAgICAgICAgICAgICBub2RlLnNldFBvc2l0aW9uKGNjLnYyKDAsMCkpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIGNvbnRlbnQuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgIH0samdUKmkpO1xyXG4gICAgICAgIC8vICAgICAvL+i1t+mjniAgICAgICAgXHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIHRoaXMubm9kZV9saXN0PXByb3BzO1xyXG4gICAgICAgIC8vIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgLy8gICAgIHRoaXMuaXNfY2FuX3RvdWNoPXRydWU7XHJcbiAgICAgICAgLy8gfSxkZWx5VClcclxuICAgIH1cclxuXHJcbiAgICBzaG93R2V0UHJvcFRpcChwcm9wRGF0YTpQcm9wRGF0YVtdLGNhbGxCYWNrPzpGdW5jdGlvbil7XHJcbiAgICAgICAgLy8gdGhpcy5jbG9zZV9jYWxsYmFjaz1jYWxsQmFjaztcclxuICAgICAgICAvLyBsZXQgY29udGVudCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInByb3BzU2Nyb2xsVmlld1wiKS5nZXRDb21wb25lbnQoY2MuU2Nyb2xsVmlldykuY29udGVudFxyXG5cclxuICAgICAgICAvLyBsZXQgamdUPTAuMztcclxuICAgICAgICAvLyBsZXQgZGVseVQ9cHJvcERhdGEubGVuZ3RoKmpnVDtcclxuICAgICAgICAvLyBpZihwcm9wRGF0YS5sZW5ndGggPiA1KXtcclxuICAgICAgICAvLyAgICAgY29udGVudC54ID0gMDtcclxuICAgICAgICAvLyB9ZWxzZXtcclxuICAgICAgICAvLyAgICAgY29udGVudC54IC09IChwcm9wRGF0YS5sZW5ndGggLSAxKSAqIDYwO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyBmb3IobGV0IGkgPSAwO2kgPCBwcm9wRGF0YS5sZW5ndGg7aSsrKXtcclxuICAgICAgICAvLyAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAvLyAgICAgICAgIGxldCBwcm9wID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShwcm9wRGF0YVtpXS50eXBlLHByb3BEYXRhW2ldLm51bSk7XHJcbiAgICAgICAgLy8gICAgICAgICBjb250ZW50LmFkZENoaWxkKHByb3ApO1xyXG4gICAgICAgIC8vICAgICAgICAgcHJvcC5zY2FsZSA9IDA7XHJcbiAgICAgICAgLy8gICAgICAgICBjYy50d2Vlbihwcm9wKS50byhqZ1Qse3NjYWxlOjF9KS5zdGFydCgpO1xyXG4gICAgICAgIC8vICAgICB9LGpnVCppKVxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyAvLyB0aGlzLm5vZGVfbGlzdD1wcm9wRGF0YTtcclxuICAgICAgICAvLyB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgIC8vICAgICB0aGlzLmlzX2Nhbl90b3VjaD10cnVlO1xyXG4gICAgICAgIC8vIH0sZGVseVQpXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGFydEZseSgpIHtcclxuICAgICAgICBpZihHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX3NjZW5lIT1HYW1lU2NlbmUuaG9tZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LllYX0dldFJld2FyZCk7XHJcbiAgICAgICAgbGV0IHVpUm9vdD1jYy5maW5kKFwiQ2FudmFzL1VpX1Jvb3RcIik7XHJcbiAgICAgICAgbGV0IGRpc1Bvcz1jYy52MigwLDApXHJcbiAgICAgICAgbGV0IGlzUmVmcmVzaD1mYWxzZTtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTx0aGlzLm5vZGVfbGlzdC5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBub2RlPXRoaXMubm9kZV9saXN0W2ldO1xyXG4gICAgICAgICAgICAvL+Wwhui/meS4quiKgueCueeahOWdkOagh+i9rOaNouaIkHVpUm9vdOeahOWdkOagh1xyXG4gICAgICAgICAgICBsZXQgd29yZFBvcz1ub2RlLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIobm9kZS5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICAgICAgbGV0IG5vZGVQb3M9dWlSb290LmNvbnZlcnRUb05vZGVTcGFjZUFSKHdvcmRQb3MpO1xyXG4gICAgICAgICAgICBsZXQgcHJvcD1ub2RlLmdldENvbXBvbmVudChQcm9wKTtcclxuICAgICAgICAgICAgaWYoIXByb3Ape1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiKysrKysrKytcIixwcm9wLnByb3BfaWQpXHJcbiAgICAgICAgICAgIHN3aXRjaChwcm9wLnByb3BfaWQpe1xyXG4gICAgICAgICAgICAgICAgY2FzZSBQcm9wSWQuQ29pbjp7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRpc05vZGU9Y2MuZmluZCgnQ2FudmFzL1RvcF9VaS90b3AvaWNvbkNvaW4nKTtcclxuICAgICAgICAgICAgICAgICAgICB3b3JkUG9zPWRpc05vZGUucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihkaXNOb2RlLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc1Bvcz11aVJvb3QuY29udmVydFRvTm9kZVNwYWNlQVIod29yZFBvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8MjA7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzdGFydFBvc1g9TWF0aC5yYW5kb20oKSozMDAtMjAwK25vZGVQb3MueDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN0YXJ0UG9zWT1NYXRoLnJhbmRvbSgpKjMwMC0yMDArbm9kZVBvcy55O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3RhcnRQb3M9Y2MudjIoc3RhcnRQb3NYLHN0YXJ0UG9zWSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld05vZGU9bmV3IGNjLk5vZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3Tm9kZS5hZGRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZT1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNwQnlQcm9wSWQoUHJvcElkLkNvaW4pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdOb2RlLnNldFBvc2l0aW9uKHN0YXJ0UG9zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdWlSb290LmFkZENoaWxkKG5ld05vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy50d2VlbihuZXdOb2RlKS50aGVuKE15VG9vbC5nZXRCZXppZXJBY3Qoc3RhcnRQb3MsZGlzUG9zKSkuY2FsbCgoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoIWlzUmVmcmVzaCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZWZyZXNoQ29pblNob3coKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlZnJlc2hHZW1TaG93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNSZWZyZXNoPXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLnJlbW92ZVNlbGYoKS5zdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgUHJvcElkLkdlbTp7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRpc05vZGU9Y2MuZmluZCgnQ2FudmFzL1RvcF9VaS90b3AvaWNvbkdlbScpO1xyXG4gICAgICAgICAgICAgICAgICAgIHdvcmRQb3M9ZGlzTm9kZS5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKGRpc05vZGUuZ2V0UG9zaXRpb24oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzUG9zPXVpUm9vdC5jb252ZXJ0VG9Ob2RlU3BhY2VBUih3b3JkUG9zKTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDsgaTwyMDsgaSsrKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN0YXJ0UG9zWD1NYXRoLnJhbmRvbSgpKjMwMC0yMDArbm9kZVBvcy54O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3RhcnRQb3NZPU1hdGgucmFuZG9tKCkqMzAwLTIwMCtub2RlUG9zLnk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzdGFydFBvcz1jYy52MihzdGFydFBvc1gsc3RhcnRQb3NZKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV3Tm9kZT1uZXcgY2MuTm9kZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdOb2RlLmFkZENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3BCeVByb3BJZChQcm9wSWQuR2VtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3Tm9kZS5zZXRQb3NpdGlvbihzdGFydFBvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVpUm9vdC5hZGRDaGlsZChuZXdOb2RlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MudHdlZW4obmV3Tm9kZSkudGhlbihNeVRvb2wuZ2V0QmV6aWVyQWN0KHN0YXJ0UG9zLGRpc1BvcykpLmNhbGwoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKCFpc1JlZnJlc2gpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkucmVmcmVzaEdlbVNob3coKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlZnJlc2hDb2luU2hvdygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzUmVmcmVzaD10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5yZW1vdmVTZWxmKCkuc3RhcnQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgICAgICAvLyBjYXNlIFByb3BJZC5Vc2VyRXhwOntcclxuICAgICAgICAgICAgICAgIC8vICAgICBsZXQgZGlzTm9kZT1jYy5maW5kKCdDYW52YXMvVG9wX1VpL3RvcC9idG5TZXR0aW5nJyk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgd29yZFBvcz1kaXNOb2RlLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoZGlzTm9kZS5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICBkaXNQb3M9dWlSb290LmNvbnZlcnRUb05vZGVTcGFjZUFSKHdvcmRQb3MpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIGZvcihsZXQgaT0wOyBpPDIwOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICBsZXQgc3RhcnRQb3NYPU1hdGgucmFuZG9tKCkqMzAwLTIwMCtub2RlUG9zLng7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIGxldCBzdGFydFBvc1k9TWF0aC5yYW5kb20oKSozMDAtMjAwK25vZGVQb3MueTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgbGV0IHN0YXJ0UG9zPWNjLnYyKHN0YXJ0UG9zWCxzdGFydFBvc1kpXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIGxldCBuZXdOb2RlPW5ldyBjYy5Ob2RlKCk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIG5ld05vZGUuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWU9UHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTcEJ5UHJvcElkKFByb3BJZC5Vc2VyRXhwKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgbmV3Tm9kZS5zZXRQb3NpdGlvbihzdGFydFBvcyk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIHVpUm9vdC5hZGRDaGlsZChuZXdOb2RlKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgY2MudHdlZW4obmV3Tm9kZSkudGhlbihNeVRvb2wuZ2V0QmV6aWVyQWN0KHN0YXJ0UG9zLGRpc1BvcykpLnJlbW92ZVNlbGYoKS5zdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIH1icmVhazsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvLyBkZWZhdWx0OntcclxuICAgICAgICAgICAgICAgIC8vICAgICBsZXQgZGlzTm9kZT1jYy5maW5kKCdDYW52YXMvVG9wX1VpL2Rvd24vYnRuUm9sZS9pY29uJyk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgd29yZFBvcz1kaXNOb2RlLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoZGlzTm9kZS5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICBkaXNQb3M9dWlSb290LmNvbnZlcnRUb05vZGVTcGFjZUFSKHdvcmRQb3MpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIGZvcihsZXQgaT0wOyBpPDIwOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICBsZXQgc3RhcnRQb3NYPU1hdGgucmFuZG9tKCkqMzAwLTIwMCtub2RlUG9zLng7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIGxldCBzdGFydFBvc1k9TWF0aC5yYW5kb20oKSozMDAtMjAwK25vZGVQb3MueTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgbGV0IHN0YXJ0UG9zPWNjLnYyKHN0YXJ0UG9zWCxzdGFydFBvc1kpXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIGxldCBuZXdOb2RlPW5ldyBjYy5Ob2RlKCk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIG5ld05vZGUuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWU9UHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTcEJ5UHJvcElkKFByb3BJZC5IZXJvRXhwKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgbmV3Tm9kZS5zZXRQb3NpdGlvbihzdGFydFBvcyk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIHVpUm9vdC5hZGRDaGlsZChuZXdOb2RlKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgY2MudHdlZW4obmV3Tm9kZSkudGhlbihNeVRvb2wuZ2V0QmV6aWVyQWN0KHN0YXJ0UG9zLGRpc1BvcykpLnJlbW92ZVNlbGYoKS5zdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIH1icmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgIH1cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XHJcbn1cclxuIl19