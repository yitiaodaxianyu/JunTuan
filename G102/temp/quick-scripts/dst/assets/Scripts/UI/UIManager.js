
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/UI/UIManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '95d9a0t1z5Dvok0YL+KFcW2', 'UIManager');
// Scripts/UI/UIManager.ts

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
exports.UIManager = exports.Combat = void 0;
var BattlePassHelpUi_1 = require("../BattlePass/BattlePassHelpUi");
var Constants_1 = require("../Constants");
var EquipExchangeUi_1 = require("../Equipment/Ui/EquipExchangeUi");
var EquipInfoUi_1 = require("../Equipment/Ui/EquipInfoUi");
var GameManager_1 = require("../GameManager");
var HealingPotion_1 = require("../Maze/HealingPotion");
var MazeBuffUi_1 = require("../Maze/MazeBuffUi");
var MazeFightingUi_1 = require("../Maze/MazeFightingUi");
var MazeLeaseUi_1 = require("../Maze/MazeLeaseUi");
var MazeShop_1 = require("../Maze/MazeShop");
var MazeShowBuffUi_1 = require("../Maze/MazeShowBuffUi");
var MazeToolUi_1 = require("../Maze/MazeToolUi");
var MazeWallInfoUi_1 = require("../Maze/MazeWallInfoUi");
var PaymentUi_1 = require("../Payment/PaymentUi");
var PetAdvanceShowUi_1 = require("../Pet/Ui/PetAdvanceShowUi");
var PetReductionUi_1 = require("../Pet/Ui/PetReductionUi");
var PetSetFreeUi_1 = require("../Pet/Ui/PetSetFreeUi");
var PetUpgradeUi_1 = require("../Pet/Ui/PetUpgradeUi");
var PropInfoUi_1 = require("../Prop/PropInfoUi");
var AudioConstants_1 = require("../Sound/AudioConstants");
var ConsumptionTipUi_1 = require("./ConsumptionTipUi");
var TextInfo_1 = require("./TextInfo");
var VideoTip_1 = require("./VideoTip");
var GetHeroUi_1 = require("../Hero/Ui/GetHeroUi");
var UIPool_1 = require("./UIPool");
var UIConfig_1 = require("./UIConfig");
var UIComponent_1 = require("./UIComponent");
var HttpManager_1 = require("../NetWork/HttpManager");
var LanguageManager_1 = require("../multiLanguage/LanguageManager");
var CombatNumEffect_1 = require("../CombatNumEffect");
var WXManagerEX_1 = require("../../startscene/WXManagerEX");
var Combat = /** @class */ (function () {
    function Combat() {
    }
    return Combat;
}());
exports.Combat = Combat;
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UIManager = /** @class */ (function (_super) {
    __extends(UIManager, _super);
    function UIManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.map_prefabs_old = null;
        /**当前显示的ui */
        _this.cur_show_ui_path = null;
        // 战斗力变化队列
        _this.combat_queue = new Array();
        _this.is_play_combat_effect = false;
        return _this;
    }
    UIManager_1 = UIManager;
    UIManager.getInstance = function () {
        if (this._instance == null) {
            var node = new cc.Node();
            cc.director.getScene().getChildByName("Canvas").addChild(node);
            this._instance = node.addComponent(UIManager_1);
            console.error("UIManager = null!");
        }
        return this._instance;
    };
    UIManager.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        console.log("UiManageron");
        UIManager_1._instance = this;
        this.map_prefabs_old = new Map();
        this.initUi();
    };
    UIManager.prototype.start = function () {
        this.cur_show_ui_path = new Map();
        this.perloadUi();
    };
    UIManager.prototype.onDestroy = function () {
        UIManager_1._instance = null;
        if (this.map_prefabs_old) {
            // this.map_prefabs.forEach((v,k)=>{
            //     //v.decRef();                
            // });
            this.map_prefabs_old = null;
        }
    };
    UIManager.prototype.perloadUi = function () {
        var _this = this;
        switch (GameManager_1.default.getInstance().cur_game_scene) {
            case Constants_1.GameScene.home:
                {
                    UIConfig_1.HomePreLoad.forEach(function (v, k) {
                        _super.prototype.addNodePool.call(_this, v, 1);
                    });
                }
                break;
            case Constants_1.GameScene.game:
                {
                    UIConfig_1.GamePreLoad.forEach(function (v, k) {
                        _super.prototype.addNodePool.call(_this, v, 1);
                    });
                }
                break;
        }
    };
    UIManager.prototype.preloadUiByPath = function (uiPath) {
        _super.prototype.addNodePool.call(this, uiPath, 1);
    };
    /**统一使用加载方法 */
    UIManager.prototype.loadPrefab = function (path, onComplete) {
        var _this = this;
        var prefab = this.map_prefabs_old.get(path);
        if (!prefab) {
            WXManagerEX_1.default.getInstance().resourcesBundle.load(path, cc.Prefab, function (error, assets) {
                if (error) {
                    cc.log(error);
                    return;
                }
                if (_this.map_prefabs_old) {
                    //assets.addRef();
                    _this.map_prefabs_old.set(path, assets);
                    onComplete(assets);
                }
            });
        }
    };
    UIManager.prototype.getPrefab = function (path) {
        return this.map_prefabs_old.get(path);
    };
    /**在场景切换成功后可以调用 */
    UIManager.prototype.preloadPrefab = function (path) {
        var _this = this;
        var prefab = this.map_prefabs_old.get(path);
        if (!prefab) {
            WXManagerEX_1.default.getInstance().resourcesBundle.load(path, cc.Prefab, function (error, assets) {
                if (error) {
                    cc.log(error);
                    return;
                }
                if (_this.map_prefabs_old) {
                    //assets.addRef();
                    _this.map_prefabs_old.set(path, assets);
                }
            });
        }
    };
    UIManager.prototype.initUi = function () {
        this.getLoadingNode().zIndex = UIConfig_1.UI_ZIndex.Loading;
        this.getTouchNode().zIndex = UIConfig_1.UI_ZIndex.UiTouch;
    };
    // /**根据id获得一个对象节点*/
    //     getNodeById(pathId:string):cc.Node
    //     {
    //         return super.getNodeById(pathId);
    //     }
    // /**根据id删除一个对象节点*/
    //     destroyNode(pathId:string,node:cc.Node)
    //     {
    //         super.getNodeById(pathId,node);
    //     }
    /**获取加载界面的节点 */
    UIManager.prototype.getLoadingNode = function () {
        return this.node.getChildByName('bg_loading');
    };
    /**获取触摸的节点 */
    UIManager.prototype.getTouchNode = function () {
        return this.node.getChildByName('uiTouch');
    };
    /**
     * 显示一个UI弹窗
     * @param uiPath 该ui的resources路径
     * @param layerLevel ui层级，用于判断同一层级不能重复添加多个弹窗的标志
     * @param result 本次ui显示的结果，如果成功添加，则在onCompleted中返回该节点，否则回调至onFail
     */
    UIManager.prototype.showUiDialog = function (uiPath, layerLevel, result, zIndex) {
        var _this = this;
        if (zIndex === void 0) { zIndex = UIConfig_1.UI_ZIndex.Normal; }
        // console.log("_________1")
        console.log("提示界面" + uiPath);
        if (this.cur_show_ui_path.has(layerLevel) && this.cur_show_ui_path.get(layerLevel) != UIConfig_1.UIPath.Null) {
            if (result.onFail) {
                console.log("提示界面失败" + uiPath);
                result.onFail();
                return;
            }
        }
        console.log("提示界面向" + uiPath);
        this.setCurShowUi(uiPath, layerLevel);
        var node = _super.prototype.getNodeById.call(this, uiPath);
        if (node) {
            this.node.addChild(node);
            node.zIndex = zIndex;
            result.onCompleted(node);
            node.getComponent(UIComponent_1.default).initUiData(uiPath, layerLevel);
        }
        else {
            _super.prototype.addNodePool.call(this, uiPath, 1, function (node) {
                _this.node.addChild(node);
                node.zIndex = zIndex;
                result.onCompleted(node);
                node.getComponent(UIComponent_1.default).initUiData(uiPath, layerLevel);
            });
        }
    };
    /**显示一个特效(骨骼动画)，创建出来的节点将通过回调函数result接受 */
    UIManager.prototype.showEffectDialog = function (uiPath, parent, animationName) {
        var _this = this;
        var node = _super.prototype.getNodeById.call(this, uiPath);
        if (node) {
            // this.node.addChild(node);
            parent.addChild(node);
            var spine_1 = node.getComponent(sp.Skeleton);
            var tracr = spine_1.setAnimation(0, animationName, false);
            spine_1.setCompleteListener(function () {
                spine_1.setCompleteListener(null);
                _this.hideEffectDialog(uiPath, node);
            });
            // result.onCompleted(node);
        }
        else {
            _super.prototype.addNodePool.call(this, uiPath, 1, function (node) {
                // this.node.addChild(node);
                // result.onCompleted(node);
                parent.addChild(node);
                var spine = node.getComponent(sp.Skeleton);
                var tracr = spine.setAnimation(0, animationName, false);
                spine.setCompleteListener(function () {
                    spine.setCompleteListener(null);
                    _this.hideEffectDialog(uiPath, node);
                });
            });
        }
    };
    /**回收一个特效节点 */
    UIManager.prototype.hideEffectDialog = function (uiPath, node) {
        _super.prototype.destroyNode.call(this, uiPath, node);
    };
    UIManager.prototype.startCombatEffect = function () {
        var combat = this.combat_queue.shift();
        var combatUi = cc.find("Canvas/Ui_Root/ZhanDouLi");
        combatUi.zIndex = UIConfig_1.UI_ZIndex.Front;
        // combatUi.getComponent(CombatNumEffect).startAnimation(combat.oldCombatNum,combat.newCombatNum,combat.oldHeroData,combat.newHeroData,()=>{
        //     if(this.combat_queue.length != 0){
        //         this.startCombatEffect();
        //     }else{
        //         combatUi.active = false;
        //         this.is_play_combat_effect = false;
        //     }
        // });
        combatUi.getComponent(CombatNumEffect_1.default).startAnimation(combat.oldCombatNum, combat.newCombatNum, combat.oldHeroData, combat.newHeroData);
    };
    UIManager.prototype.showCombatChangeEffect = function (oldCombatNum, newCombatNum, oldHeroData, newHeroData) {
        var combat = new Combat();
        combat.oldHeroData = oldHeroData;
        combat.newHeroData = newHeroData;
        combat.oldCombatNum = oldCombatNum;
        combat.newCombatNum = newCombatNum;
        var combatUi = cc.find("Canvas/Ui_Root/ZhanDouLi");
        combatUi.active = true;
        combatUi.zIndex = UIConfig_1.UI_ZIndex.Front;
        combatUi.getComponent(CombatNumEffect_1.default).startAnimation(combat.oldCombatNum, combat.newCombatNum, combat.oldHeroData, combat.newHeroData);
        // this.combat_queue.push(combat);
        // if(this.is_play_combat_effect == false){
        //     let combatUi = cc.find("Canvas/Ui_Root/ZhanDouLi");
        //     combatUi.active = true;
        //     this.is_play_combat_effect = true;
        //     this.startCombatEffect();
        // }
    };
    /**
     * 显示网络请求UI弹窗
     */
    UIManager.prototype.showWaitUiDialog = function () {
        var _this = this;
        var wait = this.node.getChildByName("wait_ui");
        wait.active = true;
        wait.children[0].active = true;
        wait.children[1].active = false;
        wait.children[2].active = false;
        wait.zIndex = UIConfig_1.UI_ZIndex.Front;
        this.scheduleOnce(function () {
            wait.children[1].active = true;
            wait.children[2].active = true;
        }, 0.2);
        this.scheduleOnce(function () {
            if (!HttpManager_1.HttpManager.isSuccessRes) {
                _this.closeWaitUiDialog();
                var s = LanguageManager_1.default.getInstance().getStrByTextId(100112);
                GameManager_1.default.getInstance().showMessage(s);
                HttpManager_1.HttpManager.isSuccessRes = true;
            }
        }, 5);
    };
    UIManager.prototype.closeWaitUiDialog = function () {
        var ui = this.node.getChildByName("wait_ui");
        if (ui) {
            ui.active = false;
        }
    };
    UIManager.prototype.showPayWaitingUi = function () {
        var wait = this.node.getChildByName("wait_ui");
        wait.active = true;
        wait.children[0].active = true;
        wait.children[1].active = true;
        wait.children[2].active = true;
        wait.zIndex = UIConfig_1.UI_ZIndex.Front;
    };
    UIManager.prototype.closePayWaitingUi = function () {
        var ui = this.node.getChildByName("wait_ui");
        if (ui) {
            ui.active = false;
        }
    };
    UIManager.prototype.closeUiDialog = function (uiPath, layerLevel, node) {
        //关闭时设置为null
        this.setCurShowUi(UIConfig_1.UIPath.Null, layerLevel);
        _super.prototype.destroyNode.call(this, uiPath, node);
        if (uiPath == UIConfig_1.UIPath.Null) {
            node.removeFromParent(false);
        }
    };
    /**关闭所有layerLevel层级以上的的弹窗 */
    UIManager.prototype.closeAllUiDialog = function (layerLevel) {
        var _this = this;
        this.cur_show_ui_path.forEach(function (v, k) {
            if (k >= layerLevel) {
                var nameIndex = v.lastIndexOf('/');
                if (nameIndex != -1) {
                    var name = v.substring(nameIndex + 1);
                    var node = _this.node.getChildByName(name);
                    if (node) {
                        var ui = node.getComponent(UIComponent_1.default);
                        if (ui) {
                            ui.onClose();
                        }
                    }
                }
            }
        });
    };
    UIManager.prototype.setCurShowUi = function (uiPath, layerLevel) {
        this.cur_show_ui_path.set(layerLevel, uiPath);
    };
    UIManager.prototype.getCurShowUi = function (layerLevel) {
        return this.cur_show_ui_path.get(layerLevel);
    };
    UIManager.prototype.showTouchEffect = function (nodePos) {
        var _this = this;
        var path = 'ui/ui_touch';
        var prefab = this.getPrefab(path);
        if (prefab) {
            var node_1 = cc.instantiate(prefab);
            this.node.addChild(node_1);
            node_1.zIndex = UIConfig_1.UI_ZIndex.UiTouch;
            node_1.setPosition(nodePos);
            var anima = node_1.getComponent(cc.Animation);
            var state = anima.play();
            state.speed = 1 / GameManager_1.default.getInstance().getGameRate();
            anima.on(cc.Animation.EventType.FINISHED, function () {
                node_1.removeFromParent();
            }, this);
        }
        else {
            this.loadPrefab(path, function (asset) {
                var node = cc.instantiate(asset);
                _this.node.addChild(node);
                node.zIndex = UIConfig_1.UI_ZIndex.UiTouch;
                node.setPosition(nodePos);
                var anima = node.getComponent(cc.Animation);
                var state = anima.play();
                state.speed = 1 / GameManager_1.default.getInstance().getGameRate();
                anima.on(cc.Animation.EventType.FINISHED, function () {
                    node.removeFromParent();
                }, _this);
            });
        }
    };
    UIManager.prototype.showTextInfo = function (titleText, contentStr) {
        var _this = this;
        var path = 'ui/info/info';
        var prefab = this.getPrefab(path);
        if (prefab) {
            var node = cc.instantiate(prefab);
            this.node.addChild(node);
            node.getComponent(TextInfo_1.default).showInfo(titleText, contentStr);
        }
        else {
            this.loadPrefab(path, function (asset) {
                var node = cc.instantiate(asset);
                _this.node.addChild(node);
                node.getComponent(TextInfo_1.default).showInfo(titleText, contentStr);
            });
        }
    };
    //---------------------------------------创建特效------------------------------------------
    UIManager.prototype.showJinSheng0 = function (parert) {
        var _this = this;
        var gm = GameManager_1.default.getInstance();
        if (gm.cur_game_scene == Constants_1.GameScene.home) {
            var path = 'effects/home/role_shengjie/role_shengjie_0';
            var prefab = this.getPrefab(path);
            if (prefab) {
                var node_2 = cc.instantiate(prefab);
                node_2.parent = parert;
                node_2.getComponent(cc.Animation).on(cc.Animation.EventType.FINISHED, function () {
                    node_2.removeFromParent();
                }, this);
            }
            else {
                this.loadPrefab(path, function (asset) {
                    var node = cc.instantiate(asset);
                    node.parent = parert;
                    node.getComponent(cc.Animation).on(cc.Animation.EventType.FINISHED, function () {
                        node.removeFromParent();
                    }, _this);
                });
            }
        }
    };
    UIManager.prototype.showJinSheng1 = function (parert) {
        var _this = this;
        var gm = GameManager_1.default.getInstance();
        if (gm.cur_game_scene == Constants_1.GameScene.home) {
            var path = 'effects/home/role_shengjie/role_shengjie_1';
            var prefab = this.getPrefab(path);
            if (prefab) {
                var node_3 = cc.instantiate(prefab);
                node_3.parent = parert;
                node_3.getComponent(cc.Animation).on(cc.Animation.EventType.FINISHED, function () {
                    node_3.removeFromParent();
                }, this);
            }
            else {
                this.loadPrefab(path, function (asset) {
                    var node = cc.instantiate(asset);
                    node.parent = parert;
                    node.getComponent(cc.Animation).on(cc.Animation.EventType.FINISHED, function () {
                        node.removeFromParent();
                    }, _this);
                });
            }
        }
    };
    // showShengJi0(parert:cc.Node,pos:cc.Vec2)
    // {
    //     let gm=GameManager.getInstance();
    //     if(gm.cur_game_scene==GameScene.home)
    //     {
    //         let path='effects/home/role_upgrade/role_upgrade_0';
    //         let prefab=this.getPrefab(path);
    //         if(prefab){
    //             let node=cc.instantiate(prefab);
    //             node.parent=parert;
    //             node.setPosition(pos);
    //             node.getComponent(cc.Animation).on(cc.Animation.EventType.FINISHED,()=>{
    //                 node.removeFromParent();
    //             },this);
    //             gm.sound_manager.playSound(SoundIndex.YX_Level);
    //         }else{
    //             this.loadPrefab(path,(asset:cc.Prefab)=>{
    //                 let node=cc.instantiate(asset);
    //                 node.parent=parert;
    //                 node.setPosition(pos);   
    //                 node.getComponent(cc.Animation).on(cc.Animation.EventType.FINISHED,()=>{
    //                     node.removeFromParent();
    //                 },this);
    //             });
    //             gm.sound_manager.playSound(SoundIndex.YX_Level);
    //         }
    //     }
    // }
    // showShengJi1(parert:cc.Node,pos:cc.Vec2)
    // {
    //     let gm=GameManager.getInstance();
    //     if(gm.cur_game_scene==GameScene.home)
    //     {
    //         let path='effects/home/role_upgrade/role_upgrade_1';
    //         let prefab=this.getPrefab(path);
    //         if(prefab){
    //             let node=cc.instantiate(prefab);
    //             node.parent=parert;
    //             node.setPosition(pos);
    //             node.getComponent(cc.Animation).on(cc.Animation.EventType.FINISHED,()=>{
    //                 node.removeFromParent();
    //             },this);
    //             gm.sound_manager.playSound(SoundIndex.YX_Level);
    //         }else{
    //             this.loadPrefab(path,(asset:cc.Prefab)=>{
    //                 let node=cc.instantiate(asset);
    //                 node.parent=parert;
    //                 node.setPosition(pos);   
    //                 node.getComponent(cc.Animation).on(cc.Animation.EventType.FINISHED,()=>{
    //                     node.removeFromParent();
    //                 },this);
    //                 gm.sound_manager.playSound(SoundIndex.YX_Level);
    //             });
    //         }
    //     }
    // }
    UIManager.prototype.showRoleStar = function (parert, pos) {
        var _this = this;
        var gm = GameManager_1.default.getInstance();
        if (gm.cur_game_scene == Constants_1.GameScene.home) {
            var path = 'effects/home/role_star/role_star';
            var prefab = this.getPrefab(path);
            if (prefab) {
                var node_4 = cc.instantiate(prefab);
                node_4.parent = parert;
                node_4.setPosition(pos);
                node_4.getComponent(cc.Animation).on(cc.Animation.EventType.FINISHED, function () {
                    node_4.removeFromParent();
                }, this);
            }
            else {
                this.loadPrefab(path, function (asset) {
                    var node = cc.instantiate(asset);
                    node.parent = parert;
                    node.setPosition(pos);
                    node.getComponent(cc.Animation).on(cc.Animation.EventType.FINISHED, function () {
                        node.removeFromParent();
                    }, _this);
                });
            }
        }
    };
    UIManager.prototype.showZhanDouli = function (parert, pos) {
        var _this = this;
        var gm = GameManager_1.default.getInstance();
        if (gm.cur_game_scene == Constants_1.GameScene.home) {
            var path = 'effects/home/role_zhandouli/role_zhandouli';
            var prefab = this.getPrefab(path);
            if (prefab) {
                var node_5 = cc.instantiate(prefab);
                node_5.parent = parert;
                node_5.setPosition(pos);
                node_5.getComponent(cc.Animation).on(cc.Animation.EventType.FINISHED, function () {
                    node_5.removeFromParent();
                }, this);
            }
            else {
                this.loadPrefab(path, function (asset) {
                    var node = cc.instantiate(asset);
                    node.parent = parert;
                    node.setPosition(pos);
                    node.getComponent(cc.Animation).on(cc.Animation.EventType.FINISHED, function () {
                        node.removeFromParent();
                    }, _this);
                });
            }
        }
    };
    UIManager.prototype.showWallUpgrade = function (parent) {
        var _this = this;
        var path = 'effects/home/wall_upgrade/wall_upgrade';
        var prefab = this.getPrefab(path);
        if (prefab) {
            var node_6 = cc.instantiate(prefab);
            node_6.parent = parent;
            node_6.getComponent(cc.Animation).on(cc.Animation.EventType.FINISHED, function () {
                node_6.removeFromParent();
            }, this);
            GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_Level);
        }
        else {
            this.loadPrefab(path, function (asset) {
                var node = cc.instantiate(asset);
                node.parent = parent;
                node.getComponent(cc.Animation).on(cc.Animation.EventType.FINISHED, function () {
                    node.removeFromParent();
                }, _this);
                GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_Level);
            });
        }
    };
    /*******************************************显示页面********************************************************** */
    UIManager.prototype.showEquipInfoUi = function (heroType, equipId, pa, pd, buyCallback, useCallback) {
        var path = 'equipment/equip_info_ui';
        this.showUiDialog(path, UIConfig_1.UILayerLevel.Three, { onCompleted: function (node) {
                // console.log("_______")
                node.getComponent(EquipInfoUi_1.default).initData(heroType, equipId, pa, pd, buyCallback, useCallback);
            } });
        return;
    };
    // showRabateUi(){
    //     let path='ui/home/rabate_ui';
    //     let prefab=this.getPrefab(path);
    //     if(prefab){
    //         let node=cc.instantiate(prefab);
    //         this.node.addChild(node);
    //     }else{
    //         this.loadPrefab(path,(asset:cc.Prefab)=>{
    //             let node=cc.instantiate(asset);
    //             this.node.addChild(node);
    //         });
    //     }
    // }
    // showGiftCenterUi(){
    //     let path='ui/home/gift_center_ui';
    //     let prefab=this.getPrefab(path);
    //     if(prefab){
    //         let node=cc.instantiate(prefab);
    //         this.node.addChild(node);
    //     }else{
    //         this.loadPrefab(path,(asset:cc.Prefab)=>{
    //         let node=cc.instantiate(asset);
    //         this.node.addChild(node);
    //         });
    //     }
    // }
    // showBattlePassUi(){
    //     let path='ui/home/battle_pass_ui';
    //     let prefab=this.getPrefab(path);
    //     if(prefab){
    //         let node=cc.instantiate(prefab);
    //         this.node.addChild(node);
    //     }else{
    //         this.loadPrefab(path,(asset:cc.Prefab)=>{
    //             let node=cc.instantiate(asset);
    //             this.node.addChild(node);
    //         });
    //     }
    // }
    // showSetting(uiAction:UiAction)
    // {
    //     let path='ui/home/setting_ui';
    //     let prefab=this.getPrefab(path);
    //     if(prefab){
    //         let node=cc.instantiate(prefab);
    //         this.node.addChild(node);
    //         node.getComponent(SettingUi).init(uiAction);
    //     }else{
    //         this.loadPrefab(path,(asset:cc.Prefab)=>{
    //             let node=cc.instantiate(asset);
    //             this.node.addChild(node);
    //             node.getComponent(SettingUi).init(uiAction);
    //         });
    //     }
    //     cc.log(cc.assetManager.assets.count);
    // }
    // showAvatarRoot(uiAction:UiAction)
    // {
    //     let path='ui/home/avatarRoot';
    //     let prefab=this.getPrefab(path);
    //     if(prefab){
    //         let node=cc.instantiate(prefab);
    //         this.node.addChild(node);
    //         node.getComponent(AvatarUi).init(uiAction);
    //     }else{
    //         this.loadPrefab(path,(asset:cc.Prefab)=>{
    //             let node=cc.instantiate(asset);
    //             this.node.addChild(node);
    //             node.getComponent(AvatarUi).init(uiAction);
    //         });
    //     }
    // }
    // showSignUi(uiAction:UiAction)
    // {
    //     if(cc.sys.localStorage.getItem("SignInOver") == "1"){
    //         let path=UIPath.SignInDaily;
    //         this.showUiDialog(path,UILayerLevel.One,{onCompleted:(node)=>{
    //             node.getComponent(SignUiDaily).init(uiAction);
    //         }});
    //         return;
    //         let prefab=this.getPrefab(path);
    //         if(prefab){
    //             let node=cc.instantiate(prefab);
    //             this.node.addChild(node);
    //             node.getComponent(SignUiDaily).init(uiAction);
    //         }else{
    //             this.loadPrefab(path,(asset:cc.Prefab)=>{
    //                 let node=cc.instantiate(asset);
    //                 this.node.addChild(node);
    //                 node.getComponent(SignUiDaily).init(uiAction);
    //             });
    //         }
    //     }else{
    //         let path='ui/home/sign_ui';
    //         this.showUiDialog(path,UILayerLevel.One,{onCompleted:(node)=>{
    //             node.getComponent(SignUi).init(uiAction);
    //         }});
    //         return;
    //         let prefab=this.getPrefab(path);
    //         if(prefab){
    //             let node=cc.instantiate(prefab);
    //             this.node.addChild(node);
    //             node.getComponent(SignUi).init(uiAction);
    //         }else{
    //             this.loadPrefab(path,(asset:cc.Prefab)=>{
    //                 let node=cc.instantiate(asset);
    //                 this.node.addChild(node);
    //                 node.getComponent(SignUi).init(uiAction);
    //             });
    //         }
    //     }
    // }
    // showRankUi()
    // {
    //     let path='ui/home/rank_ui';
    //     let prefab=this.getPrefab(path);
    //     if(prefab){
    //         let node=cc.instantiate(prefab);
    //         this.node.addChild(node);
    //     }else{
    //         this.loadPrefab(path,(asset:cc.Prefab)=>{
    //             let node=cc.instantiate(asset);
    //             this.node.addChild(node);
    //         });
    //     }
    // }
    // showTaskUi(uiAction:UiAction)
    // {
    //     let path='ui/home/task_ui';
    //     let prefab=this.getPrefab(path);
    //     if(prefab){
    //         let node=cc.instantiate(prefab);
    //             this.node.addChild(node);  
    //             node.getComponent(TaskUi).init(uiAction);
    //     }else{
    //         this.loadPrefab(path,(asset:cc.Prefab)=>{
    // 			let node=cc.instantiate(asset);
    //             this.node.addChild(node);  
    //             node.getComponent(TaskUi).init(uiAction);
    //         });
    //     }
    // }
    // showOfflineUi(uiAction:UiAction)
    // {
    //     let path='ui/home/guaji_ui';
    //     let prefab=this.getPrefab(path);
    //     if(prefab){
    //         let node=cc.instantiate(prefab);
    //         this.node.addChild(node);
    //         node.getComponent(OfflineUi).init(uiAction)
    //     }else{
    //         this.loadPrefab(path,(asset:cc.Prefab)=>{
    //             let node=cc.instantiate(asset);
    //             this.node.addChild(node);
    //             node.getComponent(OfflineUi).init(uiAction)
    //         });
    //     }
    // }
    // showUserLevelUi()
    // {
    //     let path='ui/home/user_level_ui';
    //     let prefab=this.getPrefab(path);
    //     if(prefab){
    //         let node=cc.instantiate(prefab);
    //         this.node.addChild(node);
    //     }else{
    //         this.loadPrefab(path,(asset:cc.Prefab)=>{
    //             let node=cc.instantiate(asset);
    //             this.node.addChild(node);
    //         });
    //     }
    // }
    UIManager.prototype.showGetHeroUi = function (heroType) {
        var _this = this;
        var path = 'ui/game/get_hero_ui';
        var prefab = this.getPrefab(path);
        if (prefab) {
            var node = cc.instantiate(prefab);
            this.node.addChild(node);
            node.getComponent(GetHeroUi_1.default).initUi(heroType);
        }
        else {
            this.loadPrefab(path, function (asset) {
                var node = cc.instantiate(asset);
                _this.node.addChild(node);
                node.getComponent(GetHeroUi_1.default).initUi(heroType);
            });
        }
    };
    UIManager.prototype.showUnlockHintUi = function () {
        var _this = this;
        var path = 'ui/game/unlock_hint';
        var prefab = this.getPrefab(path);
        if (prefab) {
            var node = cc.instantiate(prefab);
            this.node.addChild(node);
        }
        else {
            this.loadPrefab(path, function (asset) {
                var node = cc.instantiate(asset);
                _this.node.addChild(node);
            });
        }
    };
    // showVipUi(uiAction:UiAction)
    // {        
    //     let path='ui/home/vip_ui';
    //     let prefab=this.getPrefab(path);
    //     if(prefab){
    //         let node=cc.instantiate(prefab);
    //         this.node.addChild(node);
    //         node.getComponent(VipUi).init(uiAction);
    //     }else{
    //         this.loadPrefab(path,(asset:cc.Prefab)=>{
    // 			let node=cc.instantiate(asset);
    //             this.node.addChild(node);
    //             node.getComponent(VipUi).init(uiAction);
    //         });
    //     }
    // }
    // showFastGuajiUi(uiAction:UiAction)
    // {
    //     let path='ui/home/fast_guaji_ui';
    //     let prefab=this.getPrefab(path);
    //     if(prefab){
    //         let node=cc.instantiate(prefab);
    //         this.node.addChild(node);
    //         node.getComponent(FastGuaJiUi).init(uiAction);
    //     }else{
    //         this.loadPrefab(path,(asset:cc.Prefab)=>{
    //             let node=cc.instantiate(asset);
    //             this.node.addChild(node);
    //             node.getComponent(FastGuaJiUi).init(uiAction);
    //         });
    //     }
    // }
    // showMapUi(uiAction:UiAction)
    // {
    //     let path='ui/home/to_play_main_ui';
    //     let prefab=this.getPrefab(path);
    //     if(prefab){
    //         let node=cc.instantiate(prefab);
    //         this.node.addChild(node);
    //         node.getComponent(ToPlayMainUi).init(uiAction);
    //     }else{
    //         this.loadPrefab(path,(asset:cc.Prefab)=>{
    //             let node=cc.instantiate(asset);
    //             this.node.addChild(node);
    //             node.getComponent(ToPlayMainUi).init(uiAction);
    //         });
    //     }
    // }
    // showTowerUi()
    // {
    //     let path='ui/home/tower_ui';
    //     let prefab=this.getPrefab(path);
    //     if(prefab){
    //         let node=cc.instantiate(prefab);
    //         this.node.addChild(node);
    //     }else{
    //         this.loadPrefab(path,(asset:cc.Prefab)=>{
    //             let node=cc.instantiate(asset);
    //             this.node.addChild(node);
    //         });
    //     }
    // }
    UIManager.prototype.showMazeUi = function () {
        var _this = this;
        var path = 'maze/maze_ui';
        var prefab = this.getPrefab(path);
        if (prefab) {
            var node = cc.instantiate(prefab);
            this.node.addChild(node);
        }
        else {
            this.loadPrefab(path, function (asset) {
                var node = cc.instantiate(asset);
                _this.node.addChild(node);
            });
        }
    };
    // showTowerGift()
    // {
    //     let path='ui/home/tower_gift';
    //     let prefab=this.getPrefab(path);
    //     if(prefab){
    //         let node=cc.instantiate(prefab);
    //         this.node.addChild(node);
    //     }else{
    //         this.loadPrefab(path,(asset:cc.Prefab)=>{
    //             let node=cc.instantiate(asset);
    //             this.node.addChild(node);
    //         });
    //     }
    // }
    UIManager.prototype.showVideoTip = function (yesCallback, noCallback) {
        var _this = this;
        var path = 'ui/game/video_tip';
        var prefab = this.getPrefab(path);
        if (prefab) {
            var node = cc.instantiate(prefab);
            this.node.addChild(node);
            node.getComponent(VideoTip_1.default).init(yesCallback, noCallback);
        }
        else {
            this.loadPrefab(path, function (asset) {
                var node = cc.instantiate(asset);
                _this.node.addChild(node);
                node.getComponent(VideoTip_1.default).init(yesCallback, noCallback);
            });
        }
    };
    // addTeamSelectUi(parent:cc.Node,pos:cc.Vec2,bottomY:number,isShow?:boolean)
    // {
    //     let path='ui/home/team_select_ui';
    //     let prefab=this.getPrefab(path);
    //     if(prefab){
    //         let node=cc.instantiate(prefab);
    //         node.parent=parent;
    //         node.setPosition(pos);
    //         node.getChildByName('bottom').y=bottomY+132-node.y;
    //         if(isShow!=undefined){
    //             node.active=isShow;
    //         }
    //     }else{
    //         this.loadPrefab(path,(asset:cc.Prefab)=>{
    //             let node=cc.instantiate(asset);
    //             node.parent=parent;
    //             node.setPosition(pos);
    //             node.getChildByName('bottom').y=bottomY+132-node.y;
    //             if(isShow!=undefined){
    //                 node.active=isShow;
    //             }
    //         });
    //     }
    // }
    UIManager.prototype.showMazeHealingPotionUi = function (uiAction, id, isCanGo) {
        var _this = this;
        var path = 'maze/maze_healing_potion_ui';
        var prefab = this.getPrefab(path);
        if (prefab) {
            var node = cc.instantiate(prefab);
            this.node.addChild(node);
            var ts = node.getComponent(HealingPotion_1.default);
            ts.init(uiAction);
            ts.initData(id, isCanGo);
        }
        else {
            this.loadPrefab(path, function (asset) {
                var node = cc.instantiate(asset);
                _this.node.addChild(node);
                var ts = node.getComponent(HealingPotion_1.default);
                ts.init(uiAction);
                ts.initData(id, isCanGo);
            });
        }
    };
    UIManager.prototype.showMazeBuffUi = function (uiAction, id, isCanGo) {
        var _this = this;
        var path = 'maze/maze_buff_ui';
        var prefab = this.getPrefab(path);
        if (prefab) {
            var node = cc.instantiate(prefab);
            this.node.addChild(node);
            var ts = node.getComponent(MazeBuffUi_1.default);
            ts.init(uiAction);
            ts.initData(id, isCanGo);
        }
        else {
            this.loadPrefab(path, function (asset) {
                var node = cc.instantiate(asset);
                _this.node.addChild(node);
                var ts = node.getComponent(MazeBuffUi_1.default);
                ts.init(uiAction);
                ts.initData(id, isCanGo);
            });
        }
    };
    UIManager.prototype.showMazeFightingUi = function (uiAction, id, isCanGo) {
        var _this = this;
        var path = 'maze/maze_fighting_ui';
        var prefab = this.getPrefab(path);
        if (prefab) {
            var node = cc.instantiate(prefab);
            this.node.addChild(node);
            var ts = node.getComponent(MazeFightingUi_1.default);
            ts.init(uiAction);
            ts.initData(id, isCanGo);
        }
        else {
            this.loadPrefab(path, function (asset) {
                var node = cc.instantiate(asset);
                _this.node.addChild(node);
                var ts = node.getComponent(MazeFightingUi_1.default);
                ts.init(uiAction);
                ts.initData(id, isCanGo);
            });
        }
    };
    UIManager.prototype.showMazeShopUi = function (uiAction, id, isCanGo) {
        var _this = this;
        var path = 'maze/maze_shop';
        var prefab = this.getPrefab(path);
        if (prefab) {
            var node = cc.instantiate(prefab);
            this.node.addChild(node);
            var ts = node.getComponent(MazeShop_1.default);
            ts.init(uiAction);
            ts.initData(id, isCanGo);
        }
        else {
            this.loadPrefab(path, function (asset) {
                var node = cc.instantiate(asset);
                _this.node.addChild(node);
                var ts = node.getComponent(MazeShop_1.default);
                ts.init(uiAction);
                ts.initData(id, isCanGo);
            });
        }
    };
    UIManager.prototype.showMazeToolUi = function (uiAction) {
        var _this = this;
        var path = 'maze/maze_tool_ui';
        var prefab = this.getPrefab(path);
        if (prefab) {
            var node = cc.instantiate(prefab);
            this.node.addChild(node);
            var ts = node.getComponent(MazeToolUi_1.default);
            ts.init(uiAction);
        }
        else {
            this.loadPrefab(path, function (asset) {
                var node = cc.instantiate(asset);
                _this.node.addChild(node);
                var ts = node.getComponent(MazeToolUi_1.default);
                ts.init(uiAction);
            });
        }
    };
    UIManager.prototype.showMazeBagUi = function () {
        var _this = this;
        var path = 'maze/maze_bag_ui';
        var prefab = this.getPrefab(path);
        if (prefab) {
            var node = cc.instantiate(prefab);
            this.node.addChild(node);
        }
        else {
            this.loadPrefab(path, function (asset) {
                var node = cc.instantiate(asset);
                _this.node.addChild(node);
            });
        }
    };
    UIManager.prototype.showMazeBuffInfo = function (buffId) {
        var _this = this;
        var path = 'maze/maze_show_buff';
        var prefab = this.getPrefab(path);
        if (prefab) {
            var node = cc.instantiate(prefab);
            this.node.addChild(node);
            var ts = node.getComponent(MazeShowBuffUi_1.default);
            ts.initData(buffId);
        }
        else {
            this.loadPrefab(path, function (asset) {
                var node = cc.instantiate(asset);
                _this.node.addChild(node);
                var ts = node.getComponent(MazeShowBuffUi_1.default);
                ts.initData(buffId);
            });
        }
    };
    UIManager.prototype.showMazeSendDoorUi = function () {
        var _this = this;
        var path = 'maze/maze_send_door_ui';
        var prefab = this.getPrefab(path);
        if (prefab) {
            var node = cc.instantiate(prefab);
            this.node.addChild(node);
        }
        else {
            this.loadPrefab(path, function (asset) {
                var node = cc.instantiate(asset);
                _this.node.addChild(node);
            });
        }
    };
    UIManager.prototype.showMazeWallInfoUi = function (uiAction) {
        var _this = this;
        var path = 'maze/maze_wall_info';
        var prefab = this.getPrefab(path);
        if (prefab) {
            var node = cc.instantiate(prefab);
            this.node.addChild(node);
            node.getComponent(MazeWallInfoUi_1.default).init(uiAction);
        }
        else {
            this.loadPrefab(path, function (asset) {
                var node = cc.instantiate(asset);
                _this.node.addChild(node);
                node.getComponent(MazeWallInfoUi_1.default).init(uiAction);
            });
        }
    };
    UIManager.prototype.showMazeLeaseUi = function (uiAction, id, isCanGo) {
        var _this = this;
        var path = 'maze/maze_lease_ui';
        var prefab = this.getPrefab(path);
        if (prefab) {
            var node = cc.instantiate(prefab);
            this.node.addChild(node);
            var ts = node.getComponent(MazeLeaseUi_1.default);
            ts.init(uiAction);
            ts.initData(id, isCanGo);
        }
        else {
            this.loadPrefab(path, function (asset) {
                var node = cc.instantiate(asset);
                _this.node.addChild(node);
                var ts = node.getComponent(MazeLeaseUi_1.default);
                ts.init(uiAction);
                ts.initData(id, isCanGo);
            });
        }
    };
    UIManager.prototype.showPropInfo = function (uiAction, propAc, pd, buyCallback, useCallback) {
        var _this = this;
        var path = 'prop/prop_info_ui';
        var prefab = this.getPrefab(path);
        if (prefab) {
            var node = cc.instantiate(prefab);
            this.node.addChild(node);
            var ts = node.getComponent(PropInfoUi_1.default);
            ts.init(uiAction);
            ts.initData(pd, propAc);
            ts.addBuyListen(buyCallback);
            ts.addUseListen(useCallback);
        }
        else {
            this.loadPrefab(path, function (asset) {
                var node = cc.instantiate(asset);
                _this.node.addChild(node);
                var ts = node.getComponent(PropInfoUi_1.default);
                ts.init(uiAction);
                ts.initData(pd, propAc);
                ts.addBuyListen(buyCallback);
                ts.addUseListen(useCallback);
            });
        }
    };
    // showBagUi(uiAction:UiAction)
    // {
    //     let path='ui/home/bag_ui';
    //     let prefab=this.getPrefab(path);
    //     if(prefab){
    //         let node=cc.instantiate(prefab);
    //         this.node.addChild(node);
    //         node.getComponent(BagUi).init(uiAction);
    //     }else{
    //         this.loadPrefab(path,(asset:cc.Prefab)=>{
    //             let node=cc.instantiate(asset);
    //             this.node.addChild(node);
    //             node.getComponent(BagUi).init(uiAction);
    //         });
    //     }
    // }
    // showGoldMallUi(uiAction:UiAction)
    // {
    //     let path='ui/home/gold_mall_ui';
    //     let prefab=this.getPrefab(path);
    //     if(prefab){
    //         let node=cc.instantiate(prefab);
    //         this.node.addChild(node);
    //         node.getComponent(GoldMallUi).init(uiAction);
    //     }else{
    //         this.loadPrefab(path,(asset:cc.Prefab)=>{
    //             let node=cc.instantiate(asset);
    //             this.node.addChild(node);
    //             node.getComponent(GoldMallUi).init(uiAction);
    //         });
    //     }
    // }
    UIManager.prototype.showConsumptionTipUi = function (uiAction, currencyType, currencyNum, sureCallBack) {
        var _this = this;
        var path = 'consumption_tip_ui';
        var prefab = this.getPrefab(path);
        if (prefab) {
            var node = cc.instantiate(prefab);
            this.node.addChild(node);
            node.getComponent(ConsumptionTipUi_1.default).init(uiAction);
            node.getComponent(ConsumptionTipUi_1.default).initCallBack(currencyType, currencyNum, sureCallBack);
        }
        else {
            this.loadPrefab(path, function (asset) {
                var node = cc.instantiate(asset);
                _this.node.addChild(node);
                node.getComponent(ConsumptionTipUi_1.default).init(uiAction);
                node.getComponent(ConsumptionTipUi_1.default).initCallBack(currencyType, currencyNum, sureCallBack);
            });
        }
    };
    // showAttributeUi(uiAction:UiAction,heroType?:Hero_Type,petInfo?:PetInfo)
    // {
    //     let path='ui/home/attribute_ui';
    //     let prefab=this.getPrefab(path);
    //     if(prefab){
    //         let node=cc.instantiate(prefab);
    //         this.node.addChild(node);
    //         node.getComponent(AtrributeUi).init(uiAction);
    //         if(heroType != null){
    //             node.getComponent(AtrributeUi).initHeroType(heroType);
    //         }else{
    //             node.getComponent(AtrributeUi).initPetInfo(petInfo);
    //         }
    //     }else{
    //         this.loadPrefab(path,(asset:cc.Prefab)=>{
    //             let node=cc.instantiate(asset);
    //             this.node.addChild(node);
    //             node.getComponent(AtrributeUi).init(uiAction);
    //             if(heroType != null){
    //                 node.getComponent(AtrributeUi).initHeroType(heroType);
    //             }else{
    //                 node.getComponent(AtrributeUi).initPetInfo(petInfo);
    //             }
    //         });
    //     }
    // }
    UIManager.prototype.showPetUpgradeUi = function (uiAction, petInfo) {
        var _this = this;
        var path = 'pet/ui/pet_upgrade_ui';
        var prefab = this.getPrefab(path);
        if (prefab) {
            var node = cc.instantiate(prefab);
            this.node.addChild(node);
            node.getComponent(PetUpgradeUi_1.default).init(uiAction);
            node.getComponent(PetUpgradeUi_1.default).initUi(petInfo);
        }
        else {
            this.loadPrefab(path, function (asset) {
                var node = cc.instantiate(asset);
                _this.node.addChild(node);
                node.getComponent(PetUpgradeUi_1.default).init(uiAction);
                node.getComponent(PetUpgradeUi_1.default).initUi(petInfo);
            });
        }
    };
    UIManager.prototype.showEquipExchangeUi = function (uiAction, equipId, heroType, equipPos) {
        var path = 'equipment/equip_exchange_ui';
        this.showUiDialog(path, UIConfig_1.UILayerLevel.Three, { onCompleted: function (node) {
                // console.log("_______")
                node.getComponent(EquipExchangeUi_1.default).init(uiAction);
                node.getComponent(EquipExchangeUi_1.default).initData(equipId, heroType, equipPos);
            } });
        return;
    };
    UIManager.prototype.showPetExchangeUi = function (uiAction, petInfo, heroType) {
        // let path='pet/ui/pet_exchange_ui';
        // let prefab=this.getPrefab(path);
        // if(prefab){
        //     let node=cc.instantiate(prefab);
        //     this.node.addChild(node);
        //     node.getComponent(PetExchangeUi).init(uiAction);
        //     node.getComponent(PetExchangeUi).initData(petInfo,heroType);
        // }else{
        //     this.loadPrefab(path,(asset:cc.Prefab)=>{
        //         let node=cc.instantiate(asset);
        //         this.node.addChild(node);
        //         node.getComponent(PetExchangeUi).init(uiAction);
        //         node.getComponent(PetExchangeUi).initData(petInfo,heroType);
        //     });
        // }
    };
    // showWishingUi(uiAction:UiAction)
    // {
    //     let path='ui/home/wishing_ui';
    //     this.showUiDialog(path,UILayerLevel.One,{onCompleted:(node)=>{
    //         node.getComponent(WishingUi).init(uiAction);
    //     }});
    //     return;
    //     let prefab=this.getPrefab(path);
    //     if(prefab){
    //         let node=cc.instantiate(prefab);
    //         this.node.addChild(node);
    //         node.getComponent(WishingUi).init(uiAction);
    //     }else{
    //         this.loadPrefab(path,(asset:cc.Prefab)=>{                
    //             let node=cc.instantiate(asset);
    //             this.node.addChild(node);
    //             node.getComponent(WishingUi).init(uiAction);
    //         });
    //     }
    // }
    // showWishingTipUi(uiAction:UiAction,state:WishingState|TakeEggState,id:number,isTakeEgg:boolean = false)
    // {
    //     let path='ui/home/wishing_tip_ui';
    //     let prefab=this.getPrefab(path);
    //     if(prefab){
    //         let node=cc.instantiate(prefab);
    //         this.node.addChild(node);
    //         node.getComponent(WishingTipUi).init(uiAction);
    //         node.getComponent(WishingTipUi).initUi(state,id,isTakeEgg);
    //     }else{
    //         this.loadPrefab(path,(asset:cc.Prefab)=>{
    //             let node=cc.instantiate(asset);
    //             this.node.addChild(node);
    //             node.getComponent(WishingTipUi).init(uiAction);
    //             node.getComponent(WishingTipUi).initUi(state,id,isTakeEgg);
    //         });
    //     }
    // }
    // showExclusiveWeaponsUi(uiAction:UiAction,heroType:Hero_Type)
    // {
    //     let path='ui/home/exclusive_weapons_ui';
    //     let prefab=this.getPrefab(path);
    //     if(prefab){
    //         let node=cc.instantiate(prefab);
    //         this.node.addChild(node);
    //         node.getComponent(ExclusiveWeaponsUi).init(uiAction);
    //         node.getComponent(ExclusiveWeaponsUi).initData(heroType);
    //     }else{
    //         this.loadPrefab(path,(asset:cc.Prefab)=>{
    //             let node=cc.instantiate(asset);
    //             this.node.addChild(node);
    //             node.getComponent(ExclusiveWeaponsUi).init(uiAction);
    //             node.getComponent(ExclusiveWeaponsUi).initData(heroType);
    //         });
    //     }
    // }
    // showExclusiveWeaponsStrengtheningUi(uiAction:UiAction,heroType:Hero_Type,isActiVation:boolean=false)
    // {
    //     let path='ui/home/exclusive_weapons_strengthening_ui';
    //     let prefab=this.getPrefab(path);
    //     if(prefab){
    //         let node=cc.instantiate(prefab);
    //         this.node.addChild(node);
    //         node.getComponent(ExclusiveWeaponsStrengtheningUi).init(uiAction);
    //         node.getComponent(ExclusiveWeaponsStrengtheningUi).initData(heroType,isActiVation);
    //     }else{
    //         this.loadPrefab(path,(asset:cc.Prefab)=>{
    //             let node=cc.instantiate(asset);
    //             this.node.addChild(node);
    //             node.getComponent(ExclusiveWeaponsStrengtheningUi).init(uiAction);
    //             node.getComponent(ExclusiveWeaponsStrengtheningUi).initData(heroType,isActiVation);
    //         });
    //     }
    // }
    UIManager.prototype.showPayUi = function (uiAction, showIndex) {
        var _this = this;
        var path = 'payment/payment_ui';
        this.showUiDialog(path, UIConfig_1.UILayerLevel.One, { onCompleted: function (node) {
                var ts = node.getComponent(PaymentUi_1.default);
                ts.init(uiAction);
                ts.initData(showIndex);
            } });
        return;
        var prefab = this.getPrefab(path);
        if (prefab) {
            var node = cc.instantiate(prefab);
            this.node.addChild(node);
            var ts = node.getComponent(PaymentUi_1.default);
            ts.init(uiAction);
            ts.initData(showIndex);
        }
        else {
            this.loadPrefab(path, function (asset) {
                var node = cc.instantiate(asset);
                _this.node.addChild(node);
                var ts = node.getComponent(PaymentUi_1.default);
                ts.init(uiAction);
                ts.initData(showIndex);
            });
        }
    };
    // showTakeEggUi(uiAction:UiAction)
    // {
    //     let path='ui/home/take_egg_ui';
    //     let prefab=this.getPrefab(path);
    //     if(prefab){
    //         let node=cc.instantiate(prefab);
    //         this.node.addChild(node);
    //         node.getComponent(TakeEggUi).init(uiAction);
    //     }else{
    //         this.loadPrefab(path,(asset:cc.Prefab)=>{
    //             let node=cc.instantiate(asset);
    //             this.node.addChild(node);
    //             node.getComponent(TakeEggUi).init(uiAction);
    //         });
    //     }
    // }
    // showEquipSyntheticUi(uiAction:UiAction)
    // {
    //     let path='ui/home/equip_synthetic_ui';
    //     let prefab=this.getPrefab(path);
    //     if(prefab){
    //         let node=cc.instantiate(prefab);
    //         this.node.addChild(node);
    //         node.getComponent(MergeUi).init(uiAction);
    //     }else{
    //         this.loadPrefab(path,(asset:cc.Prefab)=>{
    //             let node=cc.instantiate(asset);
    //             this.node.addChild(node);
    //             node.getComponent(MergeUi).init(uiAction);
    //         });
    //     }
    // }
    UIManager.prototype.showPetAddvanceUi = function (uiAction) {
        var _this = this;
        var path = 'pet/ui/pet_advance_ui';
        var prefab = this.getPrefab(path);
        if (prefab) {
            var node = cc.instantiate(prefab);
            this.node.addChild(node);
            // node.getComponent(PetAdvanceUi).init(uiAction);
        }
        else {
            this.loadPrefab(path, function (asset) {
                var node = cc.instantiate(asset);
                _this.node.addChild(node);
                // node.getComponent(PetAdvanceUi).init(uiAction);
            });
        }
    };
    UIManager.prototype.showPetSetFreeUi = function (uiAction, pet_list) {
        var _this = this;
        var path = 'pet/ui/pet_set_free_ui';
        var prefab = this.getPrefab(path);
        if (prefab) {
            var node = cc.instantiate(prefab);
            this.node.addChild(node);
            node.getComponent(PetSetFreeUi_1.default).init(uiAction);
            node.getComponent(PetSetFreeUi_1.default).initData(pet_list);
        }
        else {
            this.loadPrefab(path, function (asset) {
                var node = cc.instantiate(asset);
                _this.node.addChild(node);
                node.getComponent(PetSetFreeUi_1.default).init(uiAction);
                node.getComponent(PetSetFreeUi_1.default).initData(pet_list);
            });
        }
    };
    UIManager.prototype.showPetResetUi = function (uiAction, petInfo) {
        var _this = this;
        var path = 'pet/ui/pet_reduction_ui';
        var prefab = this.getPrefab(path);
        if (prefab) {
            var node = cc.instantiate(prefab);
            this.node.addChild(node);
            node.getComponent(PetReductionUi_1.default).init(uiAction);
            node.getComponent(PetReductionUi_1.default).initData(petInfo);
        }
        else {
            this.loadPrefab(path, function (asset) {
                var node = cc.instantiate(asset);
                _this.node.addChild(node);
                node.getComponent(PetReductionUi_1.default).init(uiAction);
                node.getComponent(PetReductionUi_1.default).initData(petInfo);
            });
        }
    };
    UIManager.prototype.showPayFirstChargeUi = function (uiAction) {
        // let path='payment/pay_first_charge_ui';
        // let prefab=this.getPrefab(path);
        // if(prefab){
        //     let node=cc.instantiate(prefab);
        //     this.node.addChild(node);
        //     node.getComponent(PayFirstChargeUi).init(uiAction);
        // }else{
        //     this.loadPrefab(path,(asset:cc.Prefab)=>{
        //         let node=cc.instantiate(asset);
        //         this.node.addChild(node);
        //         node.getComponent(PayFirstChargeUi).init(uiAction);
        //     });
        // }
    };
    UIManager.prototype.showHelpTipsUi = function (uiAction, titleId, contentIds) {
        var _this = this;
        var path = 'help_ui';
        var prefab = this.getPrefab(path);
        if (prefab) {
            var node = cc.instantiate(prefab);
            this.node.addChild(node);
            node.getComponent(BattlePassHelpUi_1.default).init(uiAction);
            node.getComponent(BattlePassHelpUi_1.default).initData(titleId, contentIds);
        }
        else {
            this.loadPrefab(path, function (asset) {
                var node = cc.instantiate(asset);
                _this.node.addChild(node);
                node.getComponent(BattlePassHelpUi_1.default).init(uiAction);
                node.getComponent(BattlePassHelpUi_1.default).initData(titleId, contentIds);
            });
        }
    };
    // showTowerFightingUi(uiAction:UiAction,level:number)
    // {
    //     let path='ui/home/tower_fighting_ui';
    //     let prefab=this.getPrefab(path);
    //     if(prefab){
    //         let node=cc.instantiate(prefab);
    //         this.node.addChild(node);
    //         node.getComponent(TowerFightingUi).init(uiAction);
    //         node.getComponent(TowerFightingUi).initData(level);
    //     }else{
    //         this.loadPrefab(path,(asset:cc.Prefab)=>{
    //             let node=cc.instantiate(asset);
    //             this.node.addChild(node);
    //             node.getComponent(TowerFightingUi).init(uiAction);
    //             node.getComponent(TowerFightingUi).initData(level);
    //         });
    //     }
    // }
    UIManager.prototype.showPetAdvanceShowUi = function (uiAction, nowPetInfo, oldPetInfo) {
        var _this = this;
        var path = 'pet/ui/pet_advans_show_ui';
        var prefab = this.getPrefab(path);
        if (prefab) {
            var node = cc.instantiate(prefab);
            this.node.addChild(node);
            node.getComponent(PetAdvanceShowUi_1.default).init(uiAction);
            node.getComponent(PetAdvanceShowUi_1.default).initData(nowPetInfo, oldPetInfo);
        }
        else {
            this.loadPrefab(path, function (asset) {
                var node = cc.instantiate(asset);
                _this.node.addChild(node);
                node.getComponent(PetAdvanceShowUi_1.default).init(uiAction);
                node.getComponent(PetAdvanceShowUi_1.default).initData(nowPetInfo, oldPetInfo);
            });
        }
    };
    // showHeroSkillUi(uiAction:UiAction,heroType:Hero_Type,skillPos:number)
    // {
    //     let path='ui/home/hero_skill_ui';
    //     let prefab=this.getPrefab(path);
    //     if(prefab){
    //         let node=cc.instantiate(prefab);
    //         this.node.addChild(node);
    //         node.getComponent(HeroSkillUi).init(uiAction);
    //         node.getComponent(HeroSkillUi).initData(heroType,skillPos);
    //     }else{
    //         this.loadPrefab(path,(asset:cc.Prefab)=>{
    //             let node=cc.instantiate(asset);
    //             this.node.addChild(node);
    //             node.getComponent(HeroSkillUi).init(uiAction);
    //             node.getComponent(HeroSkillUi).initData(heroType,skillPos);
    //         });
    //     }
    // }  
    //***********************************************游戏内********************************************************* */
    UIManager.prototype.showGameLoseUi = function () {
        var _this = this;
        var path = 'ui/game/game_lose';
        var prefab = this.getPrefab(path);
        if (prefab) {
            var node = cc.instantiate(prefab);
            this.node.addChild(node);
        }
        else {
            this.loadPrefab(path, function (asset) {
                var node = cc.instantiate(asset);
                _this.node.addChild(node);
            });
        }
    };
    UIManager.prototype.showGamePauseUi = function () {
        var _this = this;
        var path = 'ui/game/game_pause';
        var prefab = this.getPrefab(path);
        if (prefab) {
            var node = cc.instantiate(prefab);
            this.node.addChild(node);
        }
        else {
            this.loadPrefab(path, function (asset) {
                var node = cc.instantiate(asset);
                _this.node.addChild(node);
            });
        }
    };
    UIManager.prototype.showRoguelikeTip = function () {
        var _this = this;
        if (GameManager_1.default.getInstance().cur_game_scene == Constants_1.GameScene.game) {
            var path = 'ui/game/roguelike_tip';
            var prefab = this.getPrefab(path);
            if (prefab) {
                var node = cc.instantiate(prefab);
                this.node.addChild(node);
            }
            else {
                this.loadPrefab(path, function (asset) {
                    var node = cc.instantiate(asset);
                    _this.node.addChild(node);
                });
            }
        }
    };
    UIManager.prototype.showDamageStatsUi = function () {
        var _this = this;
        if (GameManager_1.default.getInstance().cur_game_scene == Constants_1.GameScene.game) {
            var path = 'ui/game/damage_stats_ui';
            var prefab = this.getPrefab(path);
            if (prefab) {
                var node = cc.instantiate(prefab);
                this.node.addChild(node);
            }
            else {
                this.loadPrefab(path, function (asset) {
                    var node = cc.instantiate(asset);
                    _this.node.addChild(node);
                });
            }
        }
    };
    var UIManager_1;
    UIManager._instance = null;
    UIManager = UIManager_1 = __decorate([
        ccclass
    ], UIManager);
    return UIManager;
}(UIPool_1.default));
exports.UIManager = UIManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVUlcXFVJTWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbUVBQThEO0FBQzlELDBDQUF5QztBQUV6QyxtRUFBOEQ7QUFDOUQsMkRBQXNEO0FBQ3RELDhDQUF5QztBQUV6Qyx1REFBa0Q7QUFDbEQsaURBQTRDO0FBQzVDLHlEQUFvRDtBQUNwRCxtREFBOEM7QUFDOUMsNkNBQXdDO0FBQ3hDLHlEQUFvRDtBQUNwRCxpREFBNEM7QUFDNUMseURBQW9EO0FBRXBELGtEQUE2QztBQUU3QywrREFBMEQ7QUFHMUQsMkRBQXNEO0FBQ3RELHVEQUFrRDtBQUNsRCx1REFBa0Q7QUFFbEQsaURBQTRDO0FBQzVDLDBEQUFxRDtBQUlyRCx1REFBa0Q7QUFZbEQsdUNBQWtDO0FBRWxDLHVDQUFrQztBQU1sQyxrREFBNkM7QUFFN0MsbUNBQThCO0FBQzlCLHVDQUF1RjtBQUN2Riw2Q0FBd0M7QUFDeEMsc0RBQXFEO0FBQ3JELG9FQUErRDtBQUUvRCxzREFBaUQ7QUFDakQsNERBQXVEO0FBRXZEO0lBQUE7SUFLQSxDQUFDO0lBQUQsYUFBQztBQUFELENBTEEsQUFLQyxJQUFBO0FBTFksd0JBQU07QUFPYixJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUUxQztJQUErQiw2QkFBTTtJQUFyQztRQUFBLHFFQXFqREM7UUFsakRHLHFCQUFlLEdBQXdCLElBQUksQ0FBQztRQUM1QyxhQUFhO1FBQ0wsc0JBQWdCLEdBQTBCLElBQUksQ0FBQztRQXFMdkQsVUFBVTtRQUNWLGtCQUFZLEdBQWlCLElBQUksS0FBSyxFQUFFLENBQUM7UUFFekMsMkJBQXFCLEdBQVcsS0FBSyxDQUFDOztJQXczQzFDLENBQUM7a0JBcmpEWSxTQUFTO0lBTUoscUJBQVcsR0FBekI7UUFFSSxJQUFHLElBQUksQ0FBQyxT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QUFDLENBQUMsQ0FBQzthQUNOO1NBQ0o7SUFDTCxDQUFDOztJQWxqRGMsbUJBQVMsR0FBYyxJQUFJLENBQUM7SUFGbEMsU0FBUztRQURyQixPQUFPO09BQ0ssU0FBUyxDQXFqRHJCO0lBQUQsZ0JBQUM7Q0FyakRELEFBcWpEQyxDQXJqRDhCLGdCQUFNLEdBcWpEcEM7QUFyakRZLDhCQUFTIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhdHRsZVBhc3NIZWxwVWkgZnJvbSBcIi4uL0JhdHRsZVBhc3MvQmF0dGxlUGFzc0hlbHBVaVwiO1xyXG5pbXBvcnQgeyBHYW1lU2NlbmUgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IEVxdWlwVHlwZSB9IGZyb20gXCIuLi9FcXVpcG1lbnQvRXF1aXBDb25maWdcIjtcclxuaW1wb3J0IEVxdWlwRXhjaGFuZ2VVaSBmcm9tIFwiLi4vRXF1aXBtZW50L1VpL0VxdWlwRXhjaGFuZ2VVaVwiO1xyXG5pbXBvcnQgRXF1aXBJbmZvVWkgZnJvbSBcIi4uL0VxdWlwbWVudC9VaS9FcXVpcEluZm9VaVwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEhlcm9fVHlwZSB9IGZyb20gXCIuLi9IZXJvL0dhbWUvSGVyb0NvbmZpZ1wiO1xyXG5pbXBvcnQgSGVhbGluZ1BvdGlvbiBmcm9tIFwiLi4vTWF6ZS9IZWFsaW5nUG90aW9uXCI7XHJcbmltcG9ydCBNYXplQnVmZlVpIGZyb20gXCIuLi9NYXplL01hemVCdWZmVWlcIjtcclxuaW1wb3J0IE1hemVGaWdodGluZ1VpIGZyb20gXCIuLi9NYXplL01hemVGaWdodGluZ1VpXCI7XHJcbmltcG9ydCBNYXplTGVhc2VVaSBmcm9tIFwiLi4vTWF6ZS9NYXplTGVhc2VVaVwiO1xyXG5pbXBvcnQgTWF6ZVNob3AgZnJvbSBcIi4uL01hemUvTWF6ZVNob3BcIjtcclxuaW1wb3J0IE1hemVTaG93QnVmZlVpIGZyb20gXCIuLi9NYXplL01hemVTaG93QnVmZlVpXCI7XHJcbmltcG9ydCBNYXplVG9vbFVpIGZyb20gXCIuLi9NYXplL01hemVUb29sVWlcIjtcclxuaW1wb3J0IE1hemVXYWxsSW5mb1VpIGZyb20gXCIuLi9NYXplL01hemVXYWxsSW5mb1VpXCI7XHJcbmltcG9ydCBQYXlGaXJzdENoYXJnZVVpIGZyb20gXCIuLi9QYXltZW50L1BheUZpcnN0Q2hhcmdlVWlcIjtcclxuaW1wb3J0IFBheW1lbnRVaSBmcm9tIFwiLi4vUGF5bWVudC9QYXltZW50VWlcIjtcclxuaW1wb3J0IHsgUGV0SW5mbyB9IGZyb20gXCIuLi9QZXQvUGV0Q29uZmlnXCI7XHJcbmltcG9ydCBQZXRBZHZhbmNlU2hvd1VpIGZyb20gXCIuLi9QZXQvVWkvUGV0QWR2YW5jZVNob3dVaVwiO1xyXG4vLyBpbXBvcnQgUGV0QWR2YW5jZVVpIGZyb20gXCIuLi9QZXQvVWkvUGV0QWR2YW5jZVVpXCI7XHJcbmltcG9ydCBQZXRFeGNoYW5nZVVpIGZyb20gXCIuLi9QZXQvVWkvUGV0RXhjaGFuZ2VVaVwiO1xyXG5pbXBvcnQgUGV0UmVkdWN0aW9uVWkgZnJvbSBcIi4uL1BldC9VaS9QZXRSZWR1Y3Rpb25VaVwiO1xyXG5pbXBvcnQgUGV0U2V0RnJlZVVpIGZyb20gXCIuLi9QZXQvVWkvUGV0U2V0RnJlZVVpXCI7XHJcbmltcG9ydCBQZXRVcGdyYWRlVWkgZnJvbSBcIi4uL1BldC9VaS9QZXRVcGdyYWRlVWlcIjtcclxuaW1wb3J0IHsgUHJvcEFjdGlvbiwgUHJvcERhdGEsIFByb3BJZCB9IGZyb20gXCIuLi9Qcm9wL1Byb3BDb25maWdcIjtcclxuaW1wb3J0IFByb3BJbmZvVWkgZnJvbSBcIi4uL1Byb3AvUHJvcEluZm9VaVwiO1xyXG5pbXBvcnQgeyBTb3VuZEluZGV4IH0gZnJvbSBcIi4uL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBUb3dlckZpZ2h0aW5nVWkgZnJvbSBcIi4uL1Rvd2VyL1Rvd2VyRmlnaHRpbmdVaVwiO1xyXG4vLyBpbXBvcnQgV2lzaGluZ1RpcFVpIGZyb20gXCIuLi9XaXNoL1dpc2hpbmdUaXBVaVwiO1xyXG5pbXBvcnQgV2lzaGluZ1VpLCB7IFdpc2hpbmdTdGF0ZSB9IGZyb20gXCIuLi9XaXNoL1dpc2hpbmdVaVwiO1xyXG5pbXBvcnQgQ29uc3VtcHRpb25UaXBVaSBmcm9tIFwiLi9Db25zdW1wdGlvblRpcFVpXCI7XHJcbmltcG9ydCBBdHJyaWJ1dGVVaSBmcm9tIFwiLi9ob21lL0F0cnJpYnV0ZVVpXCI7XHJcbmltcG9ydCBBdmF0YXJVaSBmcm9tIFwiLi9ob21lL0F2YXRhclVpXCI7XHJcbmltcG9ydCBCYWdVaSBmcm9tIFwiLi9ob21lL0JhZ1VpXCI7XHJcbmltcG9ydCBFeGNsdXNpdmVXZWFwb25zU3RyZW5ndGhlbmluZ1VpIGZyb20gXCIuLi9IZXJvL1VpL0V4Y2x1c2l2ZVdlYXBvbnNTdHJlbmd0aGVuaW5nVWlcIjtcclxuaW1wb3J0IEdvbGRNYWxsVWkgZnJvbSBcIi4vaG9tZS9Hb2xkTWFsbFVpXCI7XHJcbmltcG9ydCBNZXJnZVVpIGZyb20gXCIuLi9FcXVpcG1lbnQvVWkvTWVyZ2VVaVwiO1xyXG5pbXBvcnQgU2V0dGluZ1VpIGZyb20gXCIuL2hvbWUvU2V0dGluZ1VpXCI7XHJcbmltcG9ydCBTaWduVWkgZnJvbSBcIi4vaG9tZS9TaWduVWlcIjtcclxuaW1wb3J0IFNpZ25VaURhaWx5IGZyb20gXCIuL2hvbWUvU2lnblVpRGFpbHlcIjtcclxuaW1wb3J0IFRha2VFZ2dVaSwgeyBUYWtlRWdnU3RhdGUgfSBmcm9tIFwiLi4vVGFrZUVnZy9UYWtlRWdnVWlcIjtcclxuaW1wb3J0IFRvUGxheU1haW5VaSBmcm9tIFwiLi9ob21lL1RvUGxheU1haW5VaVwiO1xyXG5pbXBvcnQgVGV4dEluZm8gZnJvbSBcIi4vVGV4dEluZm9cIjtcclxuaW1wb3J0IHsgVWlBY3Rpb24sIFVpQWRkUmVzdWx0IH0gZnJvbSBcIi4vVWlJbnRlcmZhY2VcIjtcclxuaW1wb3J0IFZpZGVvVGlwIGZyb20gXCIuL1ZpZGVvVGlwXCI7XHJcbmltcG9ydCBWaXBVaSBmcm9tIFwiLi9WaXBVaVwiO1xyXG5pbXBvcnQgRmFzdEd1YUppVWkgZnJvbSBcIi4uL0d1YUppL1VpL0Zhc3RHdWFKaVVpXCI7XHJcbmltcG9ydCBPZmZsaW5lVWkgZnJvbSBcIi4uL0d1YUppL1VpL09mZmxpbmVVaVwiO1xyXG5pbXBvcnQgVGFza1VpIGZyb20gXCIuLi9UYXNrL1Rhc2tVaVwiO1xyXG5pbXBvcnQgRXhjbHVzaXZlV2VhcG9uc1VpIGZyb20gXCIuLi9IZXJvL1VpL0V4Y2x1c2l2ZVdlYXBvbnNVaVwiO1xyXG5pbXBvcnQgR2V0SGVyb1VpIGZyb20gXCIuLi9IZXJvL1VpL0dldEhlcm9VaVwiO1xyXG5pbXBvcnQgSGVyb1NraWxsVWkgZnJvbSBcIi4uL0hlcm8vVWkvSGVyb1NraWxsVWlcIjtcclxuaW1wb3J0IFVJUG9vbCBmcm9tIFwiLi9VSVBvb2xcIjtcclxuaW1wb3J0IHsgR2FtZVByZUxvYWQsIEhvbWVQcmVMb2FkLCBVSUxheWVyTGV2ZWwsIFVJUGF0aCwgVUlfWkluZGV4IH0gZnJvbSBcIi4vVUlDb25maWdcIjtcclxuaW1wb3J0IFVJQ29tcG9uZW50IGZyb20gXCIuL1VJQ29tcG9uZW50XCI7XHJcbmltcG9ydCB7IEh0dHBNYW5hZ2VyIH0gZnJvbSBcIi4uL05ldFdvcmsvSHR0cE1hbmFnZXJcIjtcclxuaW1wb3J0IExhbmd1YWdlTWFuYWdlciBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9MYW5ndWFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgSGVyb0RhdGEgfSBmcm9tIFwiLi4vSGVyby9EYXRhL0hlcm9EYXRhXCI7XHJcbmltcG9ydCBDb21iYXROdW1FZmZlY3QgZnJvbSBcIi4uL0NvbWJhdE51bUVmZmVjdFwiO1xyXG5pbXBvcnQgV1hNYW5hZ2VyRVggZnJvbSBcIi4uLy4uL3N0YXJ0c2NlbmUvV1hNYW5hZ2VyRVhcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDb21iYXR7XHJcbiAgICBvbGRIZXJvRGF0YTpIZXJvRGF0YTtcclxuICAgIG5ld0hlcm9EYXRhOkhlcm9EYXRhO1xyXG4gICAgb2xkQ29tYmF0TnVtOm51bWJlcjtcclxuICAgIG5ld0NvbWJhdE51bTpudW1iZXI7XHJcbn1cclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5AY2NjbGFzc1xyXG5leHBvcnQgY2xhc3MgVUlNYW5hZ2VyIGV4dGVuZHMgVUlQb29sICB7XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBVSU1hbmFnZXIgPSBudWxsO1xyXG4gICAgbWFwX3ByZWZhYnNfb2xkOiBNYXA8c3RyaW5nLGNjLlByZWZhYj49bnVsbDtcclxuICAgIC8qKuW9k+WJjeaYvuekuueahHVpICovXHJcbiAgICBwcml2YXRlIGN1cl9zaG93X3VpX3BhdGg6TWFwPFVJTGF5ZXJMZXZlbCxzdHJpbmc+PW51bGw7XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6VUlNYW5hZ2VyXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5faW5zdGFuY2U9PW51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgbm9kZT1uZXcgY2MuTm9kZSgpO1xyXG4gICAgICAgICAgICBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpLmdldENoaWxkQnlOYW1lKFwiQ2FudmFzXCIpLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZT1ub2RlLmFkZENvbXBvbmVudChVSU1hbmFnZXIpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiVUlNYW5hZ2VyID0gbnVsbCFcIilcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgc3VwZXIub25Mb2FkKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJVaU1hbmFnZXJvblwiKTtcclxuICAgICAgICBcclxuICAgICAgICBVSU1hbmFnZXIuX2luc3RhbmNlPXRoaXM7XHJcbiAgICAgICAgdGhpcy5tYXBfcHJlZmFic19vbGQ9bmV3IE1hcDxzdHJpbmcsY2MuUHJlZmFiPigpO1xyXG4gICAgICAgIHRoaXMuaW5pdFVpKCk7ICAgICAgICAgICAgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBzdGFydCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmN1cl9zaG93X3VpX3BhdGg9bmV3IE1hcDxVSUxheWVyTGV2ZWwsc3RyaW5nPigpOyAgICAgXHJcbiAgICAgICAgdGhpcy5wZXJsb2FkVWkoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgICAgIFVJTWFuYWdlci5faW5zdGFuY2U9bnVsbDtcclxuICAgICAgICBpZih0aGlzLm1hcF9wcmVmYWJzX29sZCl7XHJcbiAgICAgICAgICAgIC8vIHRoaXMubWFwX3ByZWZhYnMuZm9yRWFjaCgodixrKT0+e1xyXG4gICAgICAgICAgICAvLyAgICAgLy92LmRlY1JlZigpOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgICAgIHRoaXMubWFwX3ByZWZhYnNfb2xkPW51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHBlcmxvYWRVaSgpe1xyXG4gICAgICAgIHN3aXRjaChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX3NjZW5lKXtcclxuICAgICAgICAgICAgY2FzZSBHYW1lU2NlbmUuaG9tZTp7XHJcbiAgICAgICAgICAgICAgICBIb21lUHJlTG9hZC5mb3JFYWNoKCh2LGspPT57XHJcbiAgICAgICAgICAgICAgICAgICAgc3VwZXIuYWRkTm9kZVBvb2wodiwxKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBHYW1lU2NlbmUuZ2FtZTp7XHJcbiAgICAgICAgICAgICAgICBHYW1lUHJlTG9hZC5mb3JFYWNoKCh2LGspPT57XHJcbiAgICAgICAgICAgICAgICAgICAgc3VwZXIuYWRkTm9kZVBvb2wodiwxKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJlbG9hZFVpQnlQYXRoKHVpUGF0aDpVSVBhdGgpe1xyXG4gICAgICAgIHN1cGVyLmFkZE5vZGVQb29sKHVpUGF0aCwxKTtcclxuICAgIH1cclxuXHJcbiAgICAvKirnu5/kuIDkvb/nlKjliqDovb3mlrnms5UgKi9cclxuICAgIHByaXZhdGUgbG9hZFByZWZhYihwYXRoOnN0cmluZyxvbkNvbXBsZXRlOihhc3NldDogY2MuUHJlZmFiKSA9PiB2b2lkKXtcclxuICAgICAgICBsZXQgcHJlZmFiPXRoaXMubWFwX3ByZWZhYnNfb2xkLmdldChwYXRoKTtcclxuICAgICAgICBpZighcHJlZmFiKXtcclxuICAgICAgICAgICAgV1hNYW5hZ2VyRVguZ2V0SW5zdGFuY2UoKS5yZXNvdXJjZXNCdW5kbGUubG9hZChwYXRoLGNjLlByZWZhYiwoZXJyb3I6IEVycm9yLCBhc3NldHM6Y2MuUHJlZmFiKT0+eyAgXHJcbiAgICAgICAgICAgICAgICBpZihlcnJvcil7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLm1hcF9wcmVmYWJzX29sZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9hc3NldHMuYWRkUmVmKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBfcHJlZmFic19vbGQuc2V0KHBhdGgsYXNzZXRzKTtcclxuICAgICAgICAgICAgICAgICAgICBvbkNvbXBsZXRlKGFzc2V0cyk7XHJcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRQcmVmYWIocGF0aDpzdHJpbmcpOmNjLlByZWZhYntcclxuICAgICAgICByZXR1cm4gdGhpcy5tYXBfcHJlZmFic19vbGQuZ2V0KHBhdGgpO1xyXG4gICAgfVxyXG4gICAgLyoq5Zyo5Zy65pmv5YiH5o2i5oiQ5Yqf5ZCO5Y+v5Lul6LCD55SoICovXHJcbiAgICBwdWJsaWMgcHJlbG9hZFByZWZhYihwYXRoOnN0cmluZyl7ICAgICAgICAgIFxyXG4gICAgICAgIGxldCBwcmVmYWI9dGhpcy5tYXBfcHJlZmFic19vbGQuZ2V0KHBhdGgpO1xyXG4gICAgICAgIGlmKCFwcmVmYWIpe1xyXG4gICAgICAgICAgICBXWE1hbmFnZXJFWC5nZXRJbnN0YW5jZSgpLnJlc291cmNlc0J1bmRsZS5sb2FkKHBhdGgsY2MuUHJlZmFiLChlcnJvcjogRXJyb3IsIGFzc2V0czpjYy5QcmVmYWIpPT57ICBcclxuICAgICAgICAgICAgICAgIGlmKGVycm9yKXtcclxuICAgICAgICAgICAgICAgICAgICBjYy5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLm1hcF9wcmVmYWJzX29sZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9hc3NldHMuYWRkUmVmKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBfcHJlZmFic19vbGQuc2V0KHBhdGgsYXNzZXRzKTsgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGluaXRVaSgpe1xyXG4gICAgICAgIHRoaXMuZ2V0TG9hZGluZ05vZGUoKS56SW5kZXg9VUlfWkluZGV4LkxvYWRpbmc7XHJcbiAgICAgICAgdGhpcy5nZXRUb3VjaE5vZGUoKS56SW5kZXg9VUlfWkluZGV4LlVpVG91Y2g7XHJcbiAgICB9XHJcbi8vIC8qKuagueaNrmlk6I635b6X5LiA5Liq5a+56LGh6IqC54K5Ki9cclxuLy8gICAgIGdldE5vZGVCeUlkKHBhdGhJZDpzdHJpbmcpOmNjLk5vZGVcclxuLy8gICAgIHtcclxuLy8gICAgICAgICByZXR1cm4gc3VwZXIuZ2V0Tm9kZUJ5SWQocGF0aElkKTtcclxuLy8gICAgIH1cclxuLy8gLyoq5qC55o2uaWTliKDpmaTkuIDkuKrlr7nosaHoioLngrkqL1xyXG4vLyAgICAgZGVzdHJveU5vZGUocGF0aElkOnN0cmluZyxub2RlOmNjLk5vZGUpXHJcbi8vICAgICB7XHJcbi8vICAgICAgICAgc3VwZXIuZ2V0Tm9kZUJ5SWQocGF0aElkLG5vZGUpO1xyXG4vLyAgICAgfVxyXG4gICAgLyoq6I635Y+W5Yqg6L2955WM6Z2i55qE6IqC54K5ICovXHJcbiAgICBnZXRMb2FkaW5nTm9kZSgpOmNjLk5vZGV7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnYmdfbG9hZGluZycpXHJcbiAgICB9XHJcbiAgICAvKirojrflj5bop6bmkbjnmoToioLngrkgKi9cclxuICAgIGdldFRvdWNoTm9kZSgpOmNjLk5vZGV7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgndWlUb3VjaCcpXHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOaYvuekuuS4gOS4qlVJ5by556qXXHJcbiAgICAgKiBAcGFyYW0gdWlQYXRoIOivpXVp55qEcmVzb3VyY2Vz6Lev5b6EXHJcbiAgICAgKiBAcGFyYW0gbGF5ZXJMZXZlbCB1aeWxgue6p++8jOeUqOS6juWIpOaWreWQjOS4gOWxgue6p+S4jeiDvemHjeWkjea3u+WKoOWkmuS4quW8ueeql+eahOagh+W/l1xyXG4gICAgICogQHBhcmFtIHJlc3VsdCDmnKzmrKF1aeaYvuekuueahOe7k+aenO+8jOWmguaenOaIkOWKn+a3u+WKoO+8jOWImeWcqG9uQ29tcGxldGVk5Lit6L+U5Zue6K+l6IqC54K577yM5ZCm5YiZ5Zue6LCD6Iezb25GYWlsXHJcbiAgICAgKi9cclxuICAgIHNob3dVaURpYWxvZyh1aVBhdGg6c3RyaW5nLGxheWVyTGV2ZWw6VUlMYXllckxldmVsLHJlc3VsdDpVaUFkZFJlc3VsdCx6SW5kZXg6VUlfWkluZGV4PVVJX1pJbmRleC5Ob3JtYWwpe1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiX19fX19fX19fMVwiKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi5o+Q56S655WM6Z2iXCIrdWlQYXRoKTtcclxuICAgICAgICBpZih0aGlzLmN1cl9zaG93X3VpX3BhdGguaGFzKGxheWVyTGV2ZWwpJiZ0aGlzLmN1cl9zaG93X3VpX3BhdGguZ2V0KGxheWVyTGV2ZWwpIT1VSVBhdGguTnVsbCl7XHJcbiAgICAgICAgICAgIGlmKHJlc3VsdC5vbkZhaWwpe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLmj5DnpLrnlYzpnaLlpLHotKVcIit1aVBhdGgpO1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0Lm9uRmFpbCgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi5o+Q56S655WM6Z2i5ZCRXCIrdWlQYXRoKTtcclxuICAgICAgICB0aGlzLnNldEN1clNob3dVaSh1aVBhdGgsbGF5ZXJMZXZlbCk7XHJcbiAgICAgICAgbGV0IG5vZGU9c3VwZXIuZ2V0Tm9kZUJ5SWQodWlQYXRoKTtcclxuICAgICAgICBpZihub2RlKXtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBub2RlLnpJbmRleD16SW5kZXg7XHJcbiAgICAgICAgICAgIHJlc3VsdC5vbkNvbXBsZXRlZChub2RlKTsgICAgICAgICAgICBcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoVUlDb21wb25lbnQpLmluaXRVaURhdGEodWlQYXRoLGxheWVyTGV2ZWwpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBzdXBlci5hZGROb2RlUG9vbCh1aVBhdGgsMSwobm9kZTpjYy5Ob2RlKT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIG5vZGUuekluZGV4PXpJbmRleDtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5vbkNvbXBsZXRlZChub2RlKTtcclxuICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFVJQ29tcG9uZW50KS5pbml0VWlEYXRhKHVpUGF0aCxsYXllckxldmVsKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKirmmL7npLrkuIDkuKrnibnmlYgo6aqo6aq85Yqo55S7Ke+8jOWIm+W7uuWHuuadpeeahOiKgueCueWwhumAmui/h+Wbnuiwg+WHveaVsHJlc3VsdOaOpeWPlyAqL1xyXG4gICAgc2hvd0VmZmVjdERpYWxvZyh1aVBhdGg6c3RyaW5nLHBhcmVudDpjYy5Ob2RlLGFuaW1hdGlvbk5hbWU6c3RyaW5nKXtcclxuICAgICAgICBsZXQgbm9kZT1zdXBlci5nZXROb2RlQnlJZCh1aVBhdGgpO1xyXG4gICAgICAgIGlmKG5vZGUpe1xyXG4gICAgICAgICAgICAvLyB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgIHBhcmVudC5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICAgICAgbGV0IHNwaW5lID0gbm9kZS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pO1xyXG4gICAgICAgICAgICBsZXQgdHJhY3IgPSBzcGluZS5zZXRBbmltYXRpb24oMCxhbmltYXRpb25OYW1lLGZhbHNlKTtcclxuICAgICAgICAgICAgc3BpbmUuc2V0Q29tcGxldGVMaXN0ZW5lcigoKT0+e1xyXG4gICAgICAgICAgICAgICAgc3BpbmUuc2V0Q29tcGxldGVMaXN0ZW5lcihudWxsKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGlkZUVmZmVjdERpYWxvZyh1aVBhdGgsbm9kZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvLyByZXN1bHQub25Db21wbGV0ZWQobm9kZSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHN1cGVyLmFkZE5vZGVQb29sKHVpUGF0aCwxLChub2RlOmNjLk5vZGUpPT57XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgICAgICAvLyByZXN1bHQub25Db21wbGV0ZWQobm9kZSk7XHJcbiAgICAgICAgICAgICAgICBwYXJlbnQuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3BpbmUgPSBub2RlLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbik7XHJcbiAgICAgICAgICAgICAgICBsZXQgdHJhY3IgPSBzcGluZS5zZXRBbmltYXRpb24oMCxhbmltYXRpb25OYW1lLGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHNwaW5lLnNldENvbXBsZXRlTGlzdGVuZXIoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICBzcGluZS5zZXRDb21wbGV0ZUxpc3RlbmVyKG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZUVmZmVjdERpYWxvZyh1aVBhdGgsbm9kZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoq5Zue5pS25LiA5Liq54m55pWI6IqC54K5ICovXHJcbiAgICBoaWRlRWZmZWN0RGlhbG9nKHVpUGF0aDpzdHJpbmcsbm9kZTpjYy5Ob2RlKXtcclxuICAgICAgICBzdXBlci5kZXN0cm95Tm9kZSh1aVBhdGgsbm9kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5oiY5paX5Yqb5Y+Y5YyW6Zif5YiXXHJcbiAgICBjb21iYXRfcXVldWU6QXJyYXk8Q29tYmF0PiA9IG5ldyBBcnJheSgpO1xyXG5cclxuICAgIGlzX3BsYXlfY29tYmF0X2VmZmVjdDpib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgc3RhcnRDb21iYXRFZmZlY3QoKXtcclxuICAgICAgICBsZXQgY29tYmF0ID0gdGhpcy5jb21iYXRfcXVldWUuc2hpZnQoKTtcclxuICAgICAgICBsZXQgY29tYmF0VWkgPSBjYy5maW5kKFwiQ2FudmFzL1VpX1Jvb3QvWmhhbkRvdUxpXCIpXHJcbiAgICAgICAgY29tYmF0VWkuekluZGV4ID0gVUlfWkluZGV4LkZyb250O1xyXG4gICAgICAgIC8vIGNvbWJhdFVpLmdldENvbXBvbmVudChDb21iYXROdW1FZmZlY3QpLnN0YXJ0QW5pbWF0aW9uKGNvbWJhdC5vbGRDb21iYXROdW0sY29tYmF0Lm5ld0NvbWJhdE51bSxjb21iYXQub2xkSGVyb0RhdGEsY29tYmF0Lm5ld0hlcm9EYXRhLCgpPT57XHJcbiAgICAgICAgLy8gICAgIGlmKHRoaXMuY29tYmF0X3F1ZXVlLmxlbmd0aCAhPSAwKXtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMuc3RhcnRDb21iYXRFZmZlY3QoKTtcclxuICAgICAgICAvLyAgICAgfWVsc2V7XHJcbiAgICAgICAgLy8gICAgICAgICBjb21iYXRVaS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMuaXNfcGxheV9jb21iYXRfZWZmZWN0ID0gZmFsc2U7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9KTtcclxuICAgICAgICBjb21iYXRVaS5nZXRDb21wb25lbnQoQ29tYmF0TnVtRWZmZWN0KS5zdGFydEFuaW1hdGlvbihjb21iYXQub2xkQ29tYmF0TnVtLGNvbWJhdC5uZXdDb21iYXROdW0sY29tYmF0Lm9sZEhlcm9EYXRhLGNvbWJhdC5uZXdIZXJvRGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0NvbWJhdENoYW5nZUVmZmVjdChvbGRDb21iYXROdW06bnVtYmVyLG5ld0NvbWJhdE51bTpudW1iZXIsb2xkSGVyb0RhdGE6SGVyb0RhdGEsbmV3SGVyb0RhdGE6SGVyb0RhdGEpe1xyXG4gICAgICAgIGxldCBjb21iYXQ6Q29tYmF0ID0gbmV3IENvbWJhdCgpO1xyXG4gICAgICAgIGNvbWJhdC5vbGRIZXJvRGF0YSA9IG9sZEhlcm9EYXRhO1xyXG4gICAgICAgIGNvbWJhdC5uZXdIZXJvRGF0YSA9IG5ld0hlcm9EYXRhO1xyXG4gICAgICAgIGNvbWJhdC5vbGRDb21iYXROdW0gPSBvbGRDb21iYXROdW07XHJcbiAgICAgICAgY29tYmF0Lm5ld0NvbWJhdE51bSA9IG5ld0NvbWJhdE51bTtcclxuXHJcbiAgICAgICAgbGV0IGNvbWJhdFVpID0gY2MuZmluZChcIkNhbnZhcy9VaV9Sb290L1poYW5Eb3VMaVwiKTtcclxuICAgICAgICBjb21iYXRVaS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGNvbWJhdFVpLnpJbmRleCA9IFVJX1pJbmRleC5Gcm9udDtcclxuICAgICAgICBjb21iYXRVaS5nZXRDb21wb25lbnQoQ29tYmF0TnVtRWZmZWN0KS5zdGFydEFuaW1hdGlvbihjb21iYXQub2xkQ29tYmF0TnVtLGNvbWJhdC5uZXdDb21iYXROdW0sY29tYmF0Lm9sZEhlcm9EYXRhLGNvbWJhdC5uZXdIZXJvRGF0YSk7XHJcbiAgICAgICAgLy8gdGhpcy5jb21iYXRfcXVldWUucHVzaChjb21iYXQpO1xyXG5cclxuICAgICAgICAvLyBpZih0aGlzLmlzX3BsYXlfY29tYmF0X2VmZmVjdCA9PSBmYWxzZSl7XHJcbiAgICAgICAgLy8gICAgIGxldCBjb21iYXRVaSA9IGNjLmZpbmQoXCJDYW52YXMvVWlfUm9vdC9aaGFuRG91TGlcIik7XHJcbiAgICAgICAgLy8gICAgIGNvbWJhdFVpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuaXNfcGxheV9jb21iYXRfZWZmZWN0ID0gdHJ1ZTtcclxuICAgICAgICAvLyAgICAgdGhpcy5zdGFydENvbWJhdEVmZmVjdCgpO1xyXG4gICAgICAgIC8vIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaYvuekuue9kee7nOivt+axglVJ5by556qXXHJcbiAgICAgKi9cclxuICAgICBzaG93V2FpdFVpRGlhbG9nKCl7XHJcbiAgICAgICBsZXQgd2FpdCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIndhaXRfdWlcIik7XHJcbiAgICAgICB3YWl0LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICB3YWl0LmNoaWxkcmVuWzBdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICB3YWl0LmNoaWxkcmVuWzFdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgd2FpdC5jaGlsZHJlblsyXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgIHdhaXQuekluZGV4ID0gVUlfWkluZGV4LkZyb250O1xyXG4gICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgd2FpdC5jaGlsZHJlblsxXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB3YWl0LmNoaWxkcmVuWzJdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICB9LDAuMik7XHJcbiAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICBpZighSHR0cE1hbmFnZXIuaXNTdWNjZXNzUmVzKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VXYWl0VWlEaWFsb2coKTtcclxuICAgICAgICAgICAgICAgIGxldCBzID0gTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTAwMTEyKTtcclxuICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2Uocyk7XHJcbiAgICAgICAgICAgICAgICBIdHRwTWFuYWdlci5pc1N1Y2Nlc3NSZXMgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICB9LDUpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsb3NlV2FpdFVpRGlhbG9nKCl7XHJcbiAgICAgICAgbGV0IHVpPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIndhaXRfdWlcIik7XHJcbiAgICAgICAgaWYodWkpe1xyXG4gICAgICAgICAgICB1aS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1BheVdhaXRpbmdVaSgpe1xyXG4gICAgICAgIGxldCB3YWl0ID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwid2FpdF91aVwiKTtcclxuICAgICAgICB3YWl0LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgd2FpdC5jaGlsZHJlblswXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHdhaXQuY2hpbGRyZW5bMV0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB3YWl0LmNoaWxkcmVuWzJdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgd2FpdC56SW5kZXggPSBVSV9aSW5kZXguRnJvbnQ7XHJcbiAgICAgfVxyXG4gXHJcbiAgICAgY2xvc2VQYXlXYWl0aW5nVWkoKXtcclxuICAgICAgICAgbGV0IHVpPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIndhaXRfdWlcIik7XHJcbiAgICAgICAgIGlmKHVpKXtcclxuICAgICAgICAgICAgIHVpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICB9XHJcbiAgICAgfVxyXG5cclxuICAgIGNsb3NlVWlEaWFsb2codWlQYXRoOnN0cmluZyxsYXllckxldmVsOlVJTGF5ZXJMZXZlbCxub2RlOmNjLk5vZGUpeyAgICAgICAgXHJcbiAgICAgICAgLy/lhbPpl63ml7borr7nva7kuLpudWxsXHJcbiAgICAgICAgdGhpcy5zZXRDdXJTaG93VWkoVUlQYXRoLk51bGwsbGF5ZXJMZXZlbCk7XHJcbiAgICAgICAgc3VwZXIuZGVzdHJveU5vZGUodWlQYXRoLG5vZGUpO1xyXG4gICAgICAgIGlmKHVpUGF0aD09VUlQYXRoLk51bGwpe1xyXG4gICAgICAgICAgICBub2RlLnJlbW92ZUZyb21QYXJlbnQoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKuWFs+mXreaJgOaciWxheWVyTGV2ZWzlsYLnuqfku6XkuIrnmoTnmoTlvLnnqpcgKi9cclxuICAgIGNsb3NlQWxsVWlEaWFsb2cobGF5ZXJMZXZlbDpVSUxheWVyTGV2ZWwpeyAgICAgICAgXHJcbiAgICAgICAgdGhpcy5jdXJfc2hvd191aV9wYXRoLmZvckVhY2goKHYsayk9PntcclxuICAgICAgICAgICAgaWYoaz49bGF5ZXJMZXZlbCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmFtZUluZGV4PXYubGFzdEluZGV4T2YoJy8nKVxyXG4gICAgICAgICAgICAgICAgaWYobmFtZUluZGV4IT0tMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5hbWU9di5zdWJzdHJpbmcobmFtZUluZGV4KzEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBub2RlPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShuYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICBpZihub2RlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHVpPW5vZGUuZ2V0Q29tcG9uZW50KFVJQ29tcG9uZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodWkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdWkub25DbG9zZSgpOyAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBzZXRDdXJTaG93VWkodWlQYXRoOnN0cmluZyxsYXllckxldmVsOlVJTGF5ZXJMZXZlbCl7XHJcbiAgICAgICAgdGhpcy5jdXJfc2hvd191aV9wYXRoLnNldChsYXllckxldmVsLHVpUGF0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q3VyU2hvd1VpKGxheWVyTGV2ZWw6VUlMYXllckxldmVsKTpzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VyX3Nob3dfdWlfcGF0aC5nZXQobGF5ZXJMZXZlbCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1RvdWNoRWZmZWN0KG5vZGVQb3M6Y2MuVmVjMil7XHJcbiAgICAgICAgbGV0IHBhdGg9J3VpL3VpX3RvdWNoJztcclxuICAgICAgICBsZXQgcHJlZmFiPXRoaXMuZ2V0UHJlZmFiKHBhdGgpO1xyXG4gICAgICAgIGlmKHByZWZhYil7XHJcbiAgICAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKHByZWZhYik7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICAgICAgbm9kZS56SW5kZXg9VUlfWkluZGV4LlVpVG91Y2hcclxuICAgICAgICAgICAgbm9kZS5zZXRQb3NpdGlvbihub2RlUG9zKTtcclxuICAgICAgICAgICAgbGV0IGFuaW1hPW5vZGUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XHJcbiAgICAgICAgICAgIGxldCBzdGF0ZT1hbmltYS5wbGF5KCk7XHJcbiAgICAgICAgICAgIHN0YXRlLnNwZWVkPTEvR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRHYW1lUmF0ZSgpO1xyXG4gICAgICAgICAgICBhbmltYS5vbihjYy5BbmltYXRpb24uRXZlbnRUeXBlLkZJTklTSEVELCgpPT57XHJcbiAgICAgICAgICAgICAgICBub2RlLnJlbW92ZUZyb21QYXJlbnQoKTtcclxuICAgICAgICAgICAgfSx0aGlzKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5sb2FkUHJlZmFiKHBhdGgsKGFzc2V0OmNjLlByZWZhYik9PntcclxuICAgICAgICAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKGFzc2V0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICAgICAgICAgIG5vZGUuekluZGV4PVVJX1pJbmRleC5VaVRvdWNoXHJcbiAgICAgICAgICAgICAgICBub2RlLnNldFBvc2l0aW9uKG5vZGVQb3MpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGFuaW1hPW5vZGUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3RhdGU9YW5pbWEucGxheSgpO1xyXG4gICAgICAgICAgICAgICAgc3RhdGUuc3BlZWQ9MS9HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEdhbWVSYXRlKCk7XHJcbiAgICAgICAgICAgICAgICBhbmltYS5vbihjYy5BbmltYXRpb24uRXZlbnRUeXBlLkZJTklTSEVELCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5yZW1vdmVGcm9tUGFyZW50KCk7XHJcbiAgICAgICAgICAgICAgICB9LHRoaXMpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1RleHRJbmZvKHRpdGxlVGV4dDpzdHJpbmcsY29udGVudFN0cjpzdHJpbmcpe1xyXG4gICAgICAgIGxldCBwYXRoPSd1aS9pbmZvL2luZm8nO1xyXG4gICAgICAgIGxldCBwcmVmYWI9dGhpcy5nZXRQcmVmYWIocGF0aCk7XHJcbiAgICAgICAgaWYocHJlZmFiKXtcclxuICAgICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUocHJlZmFiKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChUZXh0SW5mbykuc2hvd0luZm8odGl0bGVUZXh0LGNvbnRlbnRTdHIpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRQcmVmYWIocGF0aCwoYXNzZXQ6Y2MuUHJlZmFiKT0+e1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUoYXNzZXQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoVGV4dEluZm8pLnNob3dJbmZvKHRpdGxlVGV4dCxjb250ZW50U3RyKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t5Yib5bu654m55pWILS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBzaG93SmluU2hlbmcwKHBhcmVydDpjYy5Ob2RlKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBnbT1HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIGlmKGdtLmN1cl9nYW1lX3NjZW5lPT1HYW1lU2NlbmUuaG9tZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCBwYXRoPSdlZmZlY3RzL2hvbWUvcm9sZV9zaGVuZ2ppZS9yb2xlX3NoZW5namllXzAnO1xyXG4gICAgICAgICAgICBsZXQgcHJlZmFiPXRoaXMuZ2V0UHJlZmFiKHBhdGgpO1xyXG4gICAgICAgICAgICBpZihwcmVmYWIpe1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUocHJlZmFiKTtcclxuICAgICAgICAgICAgICAgIG5vZGUucGFyZW50PXBhcmVydDsgICAgXHJcbiAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLm9uKGNjLkFuaW1hdGlvbi5FdmVudFR5cGUuRklOSVNIRUQsKCk9PntcclxuICAgICAgICAgICAgICAgICAgICBub2RlLnJlbW92ZUZyb21QYXJlbnQoKTtcclxuICAgICAgICAgICAgICAgIH0sdGhpcyk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkUHJlZmFiKHBhdGgsKGFzc2V0OmNjLlByZWZhYik9PntcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShhc3NldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5wYXJlbnQ9cGFyZXJ0OyAgICBcclxuICAgICAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLm9uKGNjLkFuaW1hdGlvbi5FdmVudFR5cGUuRklOSVNIRUQsKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5yZW1vdmVGcm9tUGFyZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSx0aGlzKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNob3dKaW5TaGVuZzEocGFyZXJ0OmNjLk5vZGUpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGdtPUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgaWYoZ20uY3VyX2dhbWVfc2NlbmU9PUdhbWVTY2VuZS5ob21lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IHBhdGg9J2VmZmVjdHMvaG9tZS9yb2xlX3NoZW5namllL3JvbGVfc2hlbmdqaWVfMSc7XHJcbiAgICAgICAgICAgIGxldCBwcmVmYWI9dGhpcy5nZXRQcmVmYWIocGF0aCk7XHJcbiAgICAgICAgICAgIGlmKHByZWZhYil7XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShwcmVmYWIpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5wYXJlbnQ9cGFyZXJ0OyAgICBcclxuICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikub24oY2MuQW5pbWF0aW9uLkV2ZW50VHlwZS5GSU5JU0hFRCwoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgICAgICAgICAgICAgfSx0aGlzKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRQcmVmYWIocGF0aCwoYXNzZXQ6Y2MuUHJlZmFiKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKGFzc2V0KTtcclxuICAgICAgICAgICAgICAgICAgICBub2RlLnBhcmVudD1wYXJlcnQ7ICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikub24oY2MuQW5pbWF0aW9uLkV2ZW50VHlwZS5GSU5JU0hFRCwoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLnJlbW92ZUZyb21QYXJlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9LHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc2hvd1NoZW5nSmkwKHBhcmVydDpjYy5Ob2RlLHBvczpjYy5WZWMyKVxyXG4gICAgLy8ge1xyXG4gICAgLy8gICAgIGxldCBnbT1HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgLy8gICAgIGlmKGdtLmN1cl9nYW1lX3NjZW5lPT1HYW1lU2NlbmUuaG9tZSlcclxuICAgIC8vICAgICB7XHJcbiAgICAvLyAgICAgICAgIGxldCBwYXRoPSdlZmZlY3RzL2hvbWUvcm9sZV91cGdyYWRlL3JvbGVfdXBncmFkZV8wJztcclxuICAgIC8vICAgICAgICAgbGV0IHByZWZhYj10aGlzLmdldFByZWZhYihwYXRoKTtcclxuICAgIC8vICAgICAgICAgaWYocHJlZmFiKXtcclxuICAgIC8vICAgICAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKHByZWZhYik7XHJcbiAgICAvLyAgICAgICAgICAgICBub2RlLnBhcmVudD1wYXJlcnQ7XHJcbiAgICAvLyAgICAgICAgICAgICBub2RlLnNldFBvc2l0aW9uKHBvcyk7XHJcbiAgICAvLyAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLm9uKGNjLkFuaW1hdGlvbi5FdmVudFR5cGUuRklOSVNIRUQsKCk9PntcclxuICAgIC8vICAgICAgICAgICAgICAgICBub2RlLnJlbW92ZUZyb21QYXJlbnQoKTtcclxuICAgIC8vICAgICAgICAgICAgIH0sdGhpcyk7XHJcbiAgICAvLyAgICAgICAgICAgICBnbS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LllYX0xldmVsKTtcclxuICAgIC8vICAgICAgICAgfWVsc2V7XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLmxvYWRQcmVmYWIocGF0aCwoYXNzZXQ6Y2MuUHJlZmFiKT0+e1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKGFzc2V0KTtcclxuICAgIC8vICAgICAgICAgICAgICAgICBub2RlLnBhcmVudD1wYXJlcnQ7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgbm9kZS5zZXRQb3NpdGlvbihwb3MpOyAgIFxyXG4gICAgLy8gICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikub24oY2MuQW5pbWF0aW9uLkV2ZW50VHlwZS5GSU5JU0hFRCwoKT0+e1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBub2RlLnJlbW92ZUZyb21QYXJlbnQoKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICB9LHRoaXMpO1xyXG4gICAgLy8gICAgICAgICAgICAgfSk7XHJcbiAgICAvLyAgICAgICAgICAgICBnbS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LllYX0xldmVsKTtcclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyBzaG93U2hlbmdKaTEocGFyZXJ0OmNjLk5vZGUscG9zOmNjLlZlYzIpXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgICAgbGV0IGdtPUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAvLyAgICAgaWYoZ20uY3VyX2dhbWVfc2NlbmU9PUdhbWVTY2VuZS5ob21lKVxyXG4gICAgLy8gICAgIHtcclxuICAgIC8vICAgICAgICAgbGV0IHBhdGg9J2VmZmVjdHMvaG9tZS9yb2xlX3VwZ3JhZGUvcm9sZV91cGdyYWRlXzEnO1xyXG4gICAgLy8gICAgICAgICBsZXQgcHJlZmFiPXRoaXMuZ2V0UHJlZmFiKHBhdGgpO1xyXG4gICAgLy8gICAgICAgICBpZihwcmVmYWIpe1xyXG4gICAgLy8gICAgICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUocHJlZmFiKTtcclxuICAgIC8vICAgICAgICAgICAgIG5vZGUucGFyZW50PXBhcmVydDtcclxuICAgIC8vICAgICAgICAgICAgIG5vZGUuc2V0UG9zaXRpb24ocG9zKTtcclxuICAgIC8vICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikub24oY2MuQW5pbWF0aW9uLkV2ZW50VHlwZS5GSU5JU0hFRCwoKT0+e1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIG5vZGUucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgLy8gICAgICAgICAgICAgfSx0aGlzKTtcclxuICAgIC8vICAgICAgICAgICAgIGdtLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguWVhfTGV2ZWwpO1xyXG4gICAgLy8gICAgICAgICB9ZWxzZXtcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMubG9hZFByZWZhYihwYXRoLChhc3NldDpjYy5QcmVmYWIpPT57XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUoYXNzZXQpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIG5vZGUucGFyZW50PXBhcmVydDtcclxuICAgIC8vICAgICAgICAgICAgICAgICBub2RlLnNldFBvc2l0aW9uKHBvcyk7ICAgXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5vbihjYy5BbmltYXRpb24uRXZlbnRUeXBlLkZJTklTSEVELCgpPT57XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIG5vZGUucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIH0sdGhpcyk7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgZ20uc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5ZWF9MZXZlbCk7XHJcbiAgICAvLyAgICAgICAgICAgICB9KTtcclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH1cclxuXHJcblxyXG4gICAgc2hvd1JvbGVTdGFyKHBhcmVydDpjYy5Ob2RlLHBvczpjYy5WZWMyKXtcclxuICAgICAgICBsZXQgZ209R2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBpZihnbS5jdXJfZ2FtZV9zY2VuZT09R2FtZVNjZW5lLmhvbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgcGF0aD0nZWZmZWN0cy9ob21lL3JvbGVfc3Rhci9yb2xlX3N0YXInO1xyXG4gICAgICAgICAgICBsZXQgcHJlZmFiPXRoaXMuZ2V0UHJlZmFiKHBhdGgpO1xyXG4gICAgICAgICAgICBpZihwcmVmYWIpe1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUocHJlZmFiKTtcclxuICAgICAgICAgICAgICAgIG5vZGUucGFyZW50PXBhcmVydDsgICAgXHJcbiAgICAgICAgICAgICAgICBub2RlLnNldFBvc2l0aW9uKHBvcyk7XHJcbiAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLm9uKGNjLkFuaW1hdGlvbi5FdmVudFR5cGUuRklOSVNIRUQsKCk9PntcclxuICAgICAgICAgICAgICAgICAgICBub2RlLnJlbW92ZUZyb21QYXJlbnQoKTtcclxuICAgICAgICAgICAgICAgIH0sdGhpcyk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkUHJlZmFiKHBhdGgsKGFzc2V0OmNjLlByZWZhYik9PntcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShhc3NldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5wYXJlbnQ9cGFyZXJ0OyAgICBcclxuICAgICAgICAgICAgICAgICAgICBub2RlLnNldFBvc2l0aW9uKHBvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5vbihjYy5BbmltYXRpb24uRXZlbnRUeXBlLkZJTklTSEVELCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sdGhpcyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzaG93WmhhbkRvdWxpKHBhcmVydDpjYy5Ob2RlLHBvczpjYy5WZWMyKXtcclxuICAgICAgICBsZXQgZ209R2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBpZihnbS5jdXJfZ2FtZV9zY2VuZT09R2FtZVNjZW5lLmhvbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgcGF0aD0nZWZmZWN0cy9ob21lL3JvbGVfemhhbmRvdWxpL3JvbGVfemhhbmRvdWxpJztcclxuICAgICAgICAgICAgbGV0IHByZWZhYj10aGlzLmdldFByZWZhYihwYXRoKTtcclxuICAgICAgICAgICAgaWYocHJlZmFiKXtcclxuICAgICAgICAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKHByZWZhYik7XHJcbiAgICAgICAgICAgICAgICBub2RlLnBhcmVudD1wYXJlcnQ7ICAgIFxyXG4gICAgICAgICAgICAgICAgbm9kZS5zZXRQb3NpdGlvbihwb3MpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5vbihjYy5BbmltYXRpb24uRXZlbnRUeXBlLkZJTklTSEVELCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5yZW1vdmVGcm9tUGFyZW50KCk7XHJcbiAgICAgICAgICAgICAgICB9LHRoaXMpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9hZFByZWZhYihwYXRoLChhc3NldDpjYy5QcmVmYWIpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUoYXNzZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUucGFyZW50PXBhcmVydDsgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5zZXRQb3NpdGlvbihwb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikub24oY2MuQW5pbWF0aW9uLkV2ZW50VHlwZS5GSU5JU0hFRCwoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLnJlbW92ZUZyb21QYXJlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9LHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHNob3dXYWxsVXBncmFkZShwYXJlbnQ6Y2MuTm9kZSl7XHJcbiAgICAgICAgbGV0IHBhdGg9J2VmZmVjdHMvaG9tZS93YWxsX3VwZ3JhZGUvd2FsbF91cGdyYWRlJztcclxuICAgICAgICBsZXQgcHJlZmFiPXRoaXMuZ2V0UHJlZmFiKHBhdGgpO1xyXG4gICAgICAgIGlmKHByZWZhYil7XHJcbiAgICAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKHByZWZhYik7XHJcbiAgICAgICAgICAgIG5vZGUucGFyZW50PXBhcmVudDsgICAgXHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikub24oY2MuQW5pbWF0aW9uLkV2ZW50VHlwZS5GSU5JU0hFRCwoKT0+e1xyXG4gICAgICAgICAgICAgICAgbm9kZS5yZW1vdmVGcm9tUGFyZW50KCk7XHJcbiAgICAgICAgICAgIH0sdGhpcyk7XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5ZWF9MZXZlbCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFByZWZhYihwYXRoLChhc3NldDpjYy5QcmVmYWIpPT57XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShhc3NldCk7XHJcbiAgICAgICAgICAgICAgICBub2RlLnBhcmVudD1wYXJlbnQ7ICAgIFxyXG4gICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5vbihjYy5BbmltYXRpb24uRXZlbnRUeXBlLkZJTklTSEVELCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5yZW1vdmVGcm9tUGFyZW50KCk7XHJcbiAgICAgICAgICAgICAgICB9LHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LllYX0xldmVsKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq5pi+56S66aG16Z2iKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG5cclxuICAgIHNob3dFcXVpcEluZm9VaShoZXJvVHlwZTpIZXJvX1R5cGUsZXF1aXBJZDpudW1iZXIscGE6UHJvcEFjdGlvbixwZDpQcm9wRGF0YSxidXlDYWxsYmFjazpGdW5jdGlvbix1c2VDYWxsYmFjazpGdW5jdGlvbil7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHBhdGg9J2VxdWlwbWVudC9lcXVpcF9pbmZvX3VpJ1xyXG4gICAgICAgIHRoaXMuc2hvd1VpRGlhbG9nKHBhdGgsVUlMYXllckxldmVsLlRocmVlLHtvbkNvbXBsZXRlZDoobm9kZSk9PntcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJfX19fX19fXCIpXHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KEVxdWlwSW5mb1VpKS5pbml0RGF0YShoZXJvVHlwZSxlcXVpcElkLHBhLHBkLGJ1eUNhbGxiYWNrLHVzZUNhbGxiYWNrKTtcclxuICAgICAgICB9fSk7XHJcbiAgICAgICAgcmV0dXJuOyAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLy8gc2hvd1JhYmF0ZVVpKCl7XHJcblxyXG4gICAgLy8gICAgIGxldCBwYXRoPSd1aS9ob21lL3JhYmF0ZV91aSc7XHJcbiAgICAvLyAgICAgbGV0IHByZWZhYj10aGlzLmdldFByZWZhYihwYXRoKTtcclxuICAgIC8vICAgICBpZihwcmVmYWIpe1xyXG4gICAgLy8gICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShwcmVmYWIpO1xyXG4gICAgLy8gICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAvLyAgICAgfWVsc2V7XHJcbiAgICAvLyAgICAgICAgIHRoaXMubG9hZFByZWZhYihwYXRoLChhc3NldDpjYy5QcmVmYWIpPT57XHJcbiAgICAvLyAgICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShhc3NldCk7XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAvLyAgICAgICAgIH0pO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyBzaG93R2lmdENlbnRlclVpKCl7XHJcbiAgICAvLyAgICAgbGV0IHBhdGg9J3VpL2hvbWUvZ2lmdF9jZW50ZXJfdWknO1xyXG4gICAgLy8gICAgIGxldCBwcmVmYWI9dGhpcy5nZXRQcmVmYWIocGF0aCk7XHJcbiAgICAvLyAgICAgaWYocHJlZmFiKXtcclxuICAgIC8vICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUocHJlZmFiKTtcclxuICAgIC8vICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgLy8gICAgIH1lbHNle1xyXG4gICAgLy8gICAgICAgICB0aGlzLmxvYWRQcmVmYWIocGF0aCwoYXNzZXQ6Y2MuUHJlZmFiKT0+e1xyXG4gICAgLy8gICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShhc3NldCk7XHJcbiAgICAvLyAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgIC8vICAgICAgICAgfSk7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIHNob3dCYXR0bGVQYXNzVWkoKXtcclxuICAgIC8vICAgICBsZXQgcGF0aD0ndWkvaG9tZS9iYXR0bGVfcGFzc191aSc7XHJcbiAgICAvLyAgICAgbGV0IHByZWZhYj10aGlzLmdldFByZWZhYihwYXRoKTtcclxuICAgIC8vICAgICBpZihwcmVmYWIpe1xyXG4gICAgLy8gICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShwcmVmYWIpO1xyXG4gICAgLy8gICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAvLyAgICAgfWVsc2V7XHJcbiAgICAvLyAgICAgICAgIHRoaXMubG9hZFByZWZhYihwYXRoLChhc3NldDpjYy5QcmVmYWIpPT57XHJcbiAgICAvLyAgICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShhc3NldCk7XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAvLyAgICAgICAgIH0pO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyBzaG93U2V0dGluZyh1aUFjdGlvbjpVaUFjdGlvbilcclxuICAgIC8vIHtcclxuICAgIC8vICAgICBsZXQgcGF0aD0ndWkvaG9tZS9zZXR0aW5nX3VpJztcclxuICAgIC8vICAgICBsZXQgcHJlZmFiPXRoaXMuZ2V0UHJlZmFiKHBhdGgpO1xyXG4gICAgLy8gICAgIGlmKHByZWZhYil7XHJcbiAgICAvLyAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKHByZWZhYik7XHJcbiAgICAvLyAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgIC8vICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoU2V0dGluZ1VpKS5pbml0KHVpQWN0aW9uKTtcclxuICAgIC8vICAgICB9ZWxzZXtcclxuICAgIC8vICAgICAgICAgdGhpcy5sb2FkUHJlZmFiKHBhdGgsKGFzc2V0OmNjLlByZWZhYik9PntcclxuICAgIC8vICAgICAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKGFzc2V0KTtcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgIC8vICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFNldHRpbmdVaSkuaW5pdCh1aUFjdGlvbik7XHJcbiAgICAvLyAgICAgICAgIH0pO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vICAgICBjYy5sb2coY2MuYXNzZXRNYW5hZ2VyLmFzc2V0cy5jb3VudCk7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gc2hvd0F2YXRhclJvb3QodWlBY3Rpb246VWlBY3Rpb24pXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgICAgbGV0IHBhdGg9J3VpL2hvbWUvYXZhdGFyUm9vdCc7XHJcbiAgICAvLyAgICAgbGV0IHByZWZhYj10aGlzLmdldFByZWZhYihwYXRoKTtcclxuICAgIC8vICAgICBpZihwcmVmYWIpe1xyXG4gICAgLy8gICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShwcmVmYWIpO1xyXG4gICAgLy8gICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAvLyAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KEF2YXRhclVpKS5pbml0KHVpQWN0aW9uKTtcclxuICAgIC8vICAgICB9ZWxzZXtcclxuICAgIC8vICAgICAgICAgdGhpcy5sb2FkUHJlZmFiKHBhdGgsKGFzc2V0OmNjLlByZWZhYik9PntcclxuICAgIC8vICAgICAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKGFzc2V0KTtcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgIC8vICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KEF2YXRhclVpKS5pbml0KHVpQWN0aW9uKTtcclxuICAgIC8vICAgICAgICAgfSk7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfVxyXG4gICAgXHJcblxyXG4gICAgLy8gc2hvd1NpZ25VaSh1aUFjdGlvbjpVaUFjdGlvbilcclxuICAgIC8vIHtcclxuICAgIC8vICAgICBpZihjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJTaWduSW5PdmVyXCIpID09IFwiMVwiKXtcclxuICAgIC8vICAgICAgICAgbGV0IHBhdGg9VUlQYXRoLlNpZ25JbkRhaWx5O1xyXG4gICAgLy8gICAgICAgICB0aGlzLnNob3dVaURpYWxvZyhwYXRoLFVJTGF5ZXJMZXZlbC5PbmUse29uQ29tcGxldGVkOihub2RlKT0+e1xyXG4gICAgLy8gICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoU2lnblVpRGFpbHkpLmluaXQodWlBY3Rpb24pO1xyXG4gICAgLy8gICAgICAgICB9fSk7XHJcbiAgICAvLyAgICAgICAgIHJldHVybjtcclxuICAgIC8vICAgICAgICAgbGV0IHByZWZhYj10aGlzLmdldFByZWZhYihwYXRoKTtcclxuICAgIC8vICAgICAgICAgaWYocHJlZmFiKXtcclxuICAgIC8vICAgICAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKHByZWZhYik7XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAvLyAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChTaWduVWlEYWlseSkuaW5pdCh1aUFjdGlvbik7XHJcbiAgICAvLyAgICAgICAgIH1lbHNle1xyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5sb2FkUHJlZmFiKHBhdGgsKGFzc2V0OmNjLlByZWZhYik9PntcclxuICAgIC8vICAgICAgICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShhc3NldCk7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFNpZ25VaURhaWx5KS5pbml0KHVpQWN0aW9uKTtcclxuICAgIC8vICAgICAgICAgICAgIH0pO1xyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgLy8gICAgIH1lbHNle1xyXG4gICAgLy8gICAgICAgICBsZXQgcGF0aD0ndWkvaG9tZS9zaWduX3VpJztcclxuICAgIC8vICAgICAgICAgdGhpcy5zaG93VWlEaWFsb2cocGF0aCxVSUxheWVyTGV2ZWwuT25lLHtvbkNvbXBsZXRlZDoobm9kZSk9PntcclxuICAgIC8vICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFNpZ25VaSkuaW5pdCh1aUFjdGlvbik7XHJcbiAgICAvLyAgICAgICAgIH19KTtcclxuICAgIC8vICAgICAgICAgcmV0dXJuO1xyXG4gICAgLy8gICAgICAgICBsZXQgcHJlZmFiPXRoaXMuZ2V0UHJlZmFiKHBhdGgpO1xyXG4gICAgLy8gICAgICAgICBpZihwcmVmYWIpe1xyXG4gICAgLy8gICAgICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUocHJlZmFiKTtcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgIC8vICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFNpZ25VaSkuaW5pdCh1aUFjdGlvbik7XHJcbiAgICAvLyAgICAgICAgIH1lbHNle1xyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5sb2FkUHJlZmFiKHBhdGgsKGFzc2V0OmNjLlByZWZhYik9PntcclxuICAgIC8vICAgICAgICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShhc3NldCk7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFNpZ25VaSkuaW5pdCh1aUFjdGlvbik7XHJcbiAgICAvLyAgICAgICAgICAgICB9KTtcclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyBzaG93UmFua1VpKClcclxuICAgIC8vIHtcclxuICAgIC8vICAgICBsZXQgcGF0aD0ndWkvaG9tZS9yYW5rX3VpJztcclxuICAgIC8vICAgICBsZXQgcHJlZmFiPXRoaXMuZ2V0UHJlZmFiKHBhdGgpO1xyXG4gICAgLy8gICAgIGlmKHByZWZhYil7XHJcbiAgICAvLyAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKHByZWZhYik7XHJcbiAgICAvLyAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgIC8vICAgICB9ZWxzZXtcclxuICAgIC8vICAgICAgICAgdGhpcy5sb2FkUHJlZmFiKHBhdGgsKGFzc2V0OmNjLlByZWZhYik9PntcclxuICAgIC8vICAgICAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKGFzc2V0KTtcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgIC8vICAgICAgICAgfSk7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIHNob3dUYXNrVWkodWlBY3Rpb246VWlBY3Rpb24pXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgICAgbGV0IHBhdGg9J3VpL2hvbWUvdGFza191aSc7XHJcbiAgICAvLyAgICAgbGV0IHByZWZhYj10aGlzLmdldFByZWZhYihwYXRoKTtcclxuICAgIC8vICAgICBpZihwcmVmYWIpe1xyXG4gICAgLy8gICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShwcmVmYWIpO1xyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpOyAgXHJcbiAgICAvLyAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChUYXNrVWkpLmluaXQodWlBY3Rpb24pO1xyXG4gICAgLy8gICAgIH1lbHNle1xyXG4gICAgLy8gICAgICAgICB0aGlzLmxvYWRQcmVmYWIocGF0aCwoYXNzZXQ6Y2MuUHJlZmFiKT0+e1xyXG5cdC8vIFx0XHRcdGxldCBub2RlPWNjLmluc3RhbnRpYXRlKGFzc2V0KTtcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTsgIFxyXG4gICAgLy8gICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoVGFza1VpKS5pbml0KHVpQWN0aW9uKTtcclxuICAgIC8vICAgICAgICAgfSk7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIHNob3dPZmZsaW5lVWkodWlBY3Rpb246VWlBY3Rpb24pXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgICAgbGV0IHBhdGg9J3VpL2hvbWUvZ3VhamlfdWknO1xyXG4gICAgLy8gICAgIGxldCBwcmVmYWI9dGhpcy5nZXRQcmVmYWIocGF0aCk7XHJcbiAgICAvLyAgICAgaWYocHJlZmFiKXtcclxuICAgIC8vICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUocHJlZmFiKTtcclxuICAgIC8vICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgLy8gICAgICAgICBub2RlLmdldENvbXBvbmVudChPZmZsaW5lVWkpLmluaXQodWlBY3Rpb24pXHJcbiAgICAvLyAgICAgfWVsc2V7XHJcbiAgICAvLyAgICAgICAgIHRoaXMubG9hZFByZWZhYihwYXRoLChhc3NldDpjYy5QcmVmYWIpPT57XHJcbiAgICAvLyAgICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShhc3NldCk7XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAvLyAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChPZmZsaW5lVWkpLmluaXQodWlBY3Rpb24pXHJcbiAgICAvLyAgICAgICAgIH0pO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyBzaG93VXNlckxldmVsVWkoKVxyXG4gICAgLy8ge1xyXG4gICAgLy8gICAgIGxldCBwYXRoPSd1aS9ob21lL3VzZXJfbGV2ZWxfdWknO1xyXG4gICAgLy8gICAgIGxldCBwcmVmYWI9dGhpcy5nZXRQcmVmYWIocGF0aCk7XHJcbiAgICAvLyAgICAgaWYocHJlZmFiKXtcclxuICAgIC8vICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUocHJlZmFiKTtcclxuICAgIC8vICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgLy8gICAgIH1lbHNle1xyXG4gICAgLy8gICAgICAgICB0aGlzLmxvYWRQcmVmYWIocGF0aCwoYXNzZXQ6Y2MuUHJlZmFiKT0+e1xyXG4gICAgLy8gICAgICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUoYXNzZXQpO1xyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgLy8gICAgICAgICB9KTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9XHJcblxyXG4gICAgc2hvd0dldEhlcm9VaShoZXJvVHlwZTpIZXJvX1R5cGUpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHBhdGg9J3VpL2dhbWUvZ2V0X2hlcm9fdWknO1xyXG4gICAgICAgIGxldCBwcmVmYWI9dGhpcy5nZXRQcmVmYWIocGF0aCk7XHJcbiAgICAgICAgaWYocHJlZmFiKXtcclxuICAgICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUocHJlZmFiKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChHZXRIZXJvVWkpLmluaXRVaShoZXJvVHlwZSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFByZWZhYihwYXRoLChhc3NldDpjYy5QcmVmYWIpPT57XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShhc3NldCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChHZXRIZXJvVWkpLmluaXRVaShoZXJvVHlwZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzaG93VW5sb2NrSGludFVpKClcclxuICAgIHtcclxuICAgICAgICBsZXQgcGF0aD0ndWkvZ2FtZS91bmxvY2tfaGludCc7XHJcbiAgICAgICAgbGV0IHByZWZhYj10aGlzLmdldFByZWZhYihwYXRoKTtcclxuICAgICAgICBpZihwcmVmYWIpe1xyXG4gICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShwcmVmYWIpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFByZWZhYihwYXRoLChhc3NldDpjYy5QcmVmYWIpPT57XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShhc3NldCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBzaG93VmlwVWkodWlBY3Rpb246VWlBY3Rpb24pXHJcbiAgICAvLyB7ICAgICAgICBcclxuICAgIC8vICAgICBsZXQgcGF0aD0ndWkvaG9tZS92aXBfdWknO1xyXG4gICAgLy8gICAgIGxldCBwcmVmYWI9dGhpcy5nZXRQcmVmYWIocGF0aCk7XHJcbiAgICAvLyAgICAgaWYocHJlZmFiKXtcclxuICAgIC8vICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUocHJlZmFiKTtcclxuICAgIC8vICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgLy8gICAgICAgICBub2RlLmdldENvbXBvbmVudChWaXBVaSkuaW5pdCh1aUFjdGlvbik7XHJcbiAgICAvLyAgICAgfWVsc2V7XHJcbiAgICAvLyAgICAgICAgIHRoaXMubG9hZFByZWZhYihwYXRoLChhc3NldDpjYy5QcmVmYWIpPT57XHJcblx0Ly8gXHRcdFx0bGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUoYXNzZXQpO1xyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgLy8gICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoVmlwVWkpLmluaXQodWlBY3Rpb24pO1xyXG4gICAgLy8gICAgICAgICB9KTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gc2hvd0Zhc3RHdWFqaVVpKHVpQWN0aW9uOlVpQWN0aW9uKVxyXG4gICAgLy8ge1xyXG4gICAgLy8gICAgIGxldCBwYXRoPSd1aS9ob21lL2Zhc3RfZ3VhamlfdWknO1xyXG4gICAgLy8gICAgIGxldCBwcmVmYWI9dGhpcy5nZXRQcmVmYWIocGF0aCk7XHJcbiAgICAvLyAgICAgaWYocHJlZmFiKXtcclxuICAgIC8vICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUocHJlZmFiKTtcclxuICAgIC8vICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgLy8gICAgICAgICBub2RlLmdldENvbXBvbmVudChGYXN0R3VhSmlVaSkuaW5pdCh1aUFjdGlvbik7XHJcbiAgICAvLyAgICAgfWVsc2V7XHJcbiAgICAvLyAgICAgICAgIHRoaXMubG9hZFByZWZhYihwYXRoLChhc3NldDpjYy5QcmVmYWIpPT57XHJcbiAgICAvLyAgICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShhc3NldCk7XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAvLyAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChGYXN0R3VhSmlVaSkuaW5pdCh1aUFjdGlvbik7XHJcbiAgICAvLyAgICAgICAgIH0pO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyBzaG93TWFwVWkodWlBY3Rpb246VWlBY3Rpb24pXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgICAgbGV0IHBhdGg9J3VpL2hvbWUvdG9fcGxheV9tYWluX3VpJztcclxuICAgIC8vICAgICBsZXQgcHJlZmFiPXRoaXMuZ2V0UHJlZmFiKHBhdGgpO1xyXG4gICAgLy8gICAgIGlmKHByZWZhYil7XHJcbiAgICAvLyAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKHByZWZhYik7XHJcbiAgICAvLyAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgIC8vICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoVG9QbGF5TWFpblVpKS5pbml0KHVpQWN0aW9uKTtcclxuICAgIC8vICAgICB9ZWxzZXtcclxuICAgIC8vICAgICAgICAgdGhpcy5sb2FkUHJlZmFiKHBhdGgsKGFzc2V0OmNjLlByZWZhYik9PntcclxuICAgIC8vICAgICAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKGFzc2V0KTtcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgIC8vICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFRvUGxheU1haW5VaSkuaW5pdCh1aUFjdGlvbik7XHJcbiAgICAvLyAgICAgICAgIH0pO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyBzaG93VG93ZXJVaSgpXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgICAgbGV0IHBhdGg9J3VpL2hvbWUvdG93ZXJfdWknO1xyXG4gICAgLy8gICAgIGxldCBwcmVmYWI9dGhpcy5nZXRQcmVmYWIocGF0aCk7XHJcbiAgICAvLyAgICAgaWYocHJlZmFiKXtcclxuICAgIC8vICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUocHJlZmFiKTtcclxuICAgIC8vICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgLy8gICAgIH1lbHNle1xyXG4gICAgLy8gICAgICAgICB0aGlzLmxvYWRQcmVmYWIocGF0aCwoYXNzZXQ6Y2MuUHJlZmFiKT0+e1xyXG4gICAgLy8gICAgICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUoYXNzZXQpO1xyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgLy8gICAgICAgICB9KTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9XHJcblxyXG4gICAgc2hvd01hemVVaSgpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHBhdGg9J21hemUvbWF6ZV91aSc7XHJcbiAgICAgICAgbGV0IHByZWZhYj10aGlzLmdldFByZWZhYihwYXRoKTtcclxuICAgICAgICBpZihwcmVmYWIpe1xyXG4gICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShwcmVmYWIpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFByZWZhYihwYXRoLChhc3NldDpjYy5QcmVmYWIpPT57XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShhc3NldCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBzaG93VG93ZXJHaWZ0KClcclxuICAgIC8vIHtcclxuICAgIC8vICAgICBsZXQgcGF0aD0ndWkvaG9tZS90b3dlcl9naWZ0JztcclxuICAgIC8vICAgICBsZXQgcHJlZmFiPXRoaXMuZ2V0UHJlZmFiKHBhdGgpO1xyXG4gICAgLy8gICAgIGlmKHByZWZhYil7XHJcbiAgICAvLyAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKHByZWZhYik7XHJcbiAgICAvLyAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgIC8vICAgICB9ZWxzZXtcclxuICAgIC8vICAgICAgICAgdGhpcy5sb2FkUHJlZmFiKHBhdGgsKGFzc2V0OmNjLlByZWZhYik9PntcclxuICAgIC8vICAgICAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKGFzc2V0KTtcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgIC8vICAgICAgICAgfSk7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfVxyXG5cclxuICAgIHNob3dWaWRlb1RpcCh5ZXNDYWxsYmFjazpGdW5jdGlvbixub0NhbGxiYWNrOkZ1bmN0aW9uKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBwYXRoPSd1aS9nYW1lL3ZpZGVvX3RpcCc7XHJcbiAgICAgICAgbGV0IHByZWZhYj10aGlzLmdldFByZWZhYihwYXRoKTtcclxuICAgICAgICBpZihwcmVmYWIpe1xyXG4gICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShwcmVmYWIpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFZpZGVvVGlwKS5pbml0KHllc0NhbGxiYWNrLG5vQ2FsbGJhY2spO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRQcmVmYWIocGF0aCwoYXNzZXQ6Y2MuUHJlZmFiKT0+e1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUoYXNzZXQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoVmlkZW9UaXApLmluaXQoeWVzQ2FsbGJhY2ssbm9DYWxsYmFjayk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG5cclxuICAgIC8vIGFkZFRlYW1TZWxlY3RVaShwYXJlbnQ6Y2MuTm9kZSxwb3M6Y2MuVmVjMixib3R0b21ZOm51bWJlcixpc1Nob3c/OmJvb2xlYW4pXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgICAgbGV0IHBhdGg9J3VpL2hvbWUvdGVhbV9zZWxlY3RfdWknO1xyXG4gICAgLy8gICAgIGxldCBwcmVmYWI9dGhpcy5nZXRQcmVmYWIocGF0aCk7XHJcbiAgICAvLyAgICAgaWYocHJlZmFiKXtcclxuICAgIC8vICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUocHJlZmFiKTtcclxuICAgIC8vICAgICAgICAgbm9kZS5wYXJlbnQ9cGFyZW50O1xyXG4gICAgLy8gICAgICAgICBub2RlLnNldFBvc2l0aW9uKHBvcyk7XHJcbiAgICAvLyAgICAgICAgIG5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2JvdHRvbScpLnk9Ym90dG9tWSsxMzItbm9kZS55O1xyXG4gICAgLy8gICAgICAgICBpZihpc1Nob3chPXVuZGVmaW5lZCl7XHJcbiAgICAvLyAgICAgICAgICAgICBub2RlLmFjdGl2ZT1pc1Nob3c7XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9ZWxzZXtcclxuICAgIC8vICAgICAgICAgdGhpcy5sb2FkUHJlZmFiKHBhdGgsKGFzc2V0OmNjLlByZWZhYik9PntcclxuICAgIC8vICAgICAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKGFzc2V0KTtcclxuICAgIC8vICAgICAgICAgICAgIG5vZGUucGFyZW50PXBhcmVudDtcclxuICAgIC8vICAgICAgICAgICAgIG5vZGUuc2V0UG9zaXRpb24ocG9zKTtcclxuICAgIC8vICAgICAgICAgICAgIG5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2JvdHRvbScpLnk9Ym90dG9tWSsxMzItbm9kZS55O1xyXG4gICAgLy8gICAgICAgICAgICAgaWYoaXNTaG93IT11bmRlZmluZWQpe1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIG5vZGUuYWN0aXZlPWlzU2hvdztcclxuICAgIC8vICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgfSk7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfVxyXG5cclxuICAgIFxyXG5cclxuICAgIHNob3dNYXplSGVhbGluZ1BvdGlvblVpKHVpQWN0aW9uOlVpQWN0aW9uLGlkOm51bWJlcixpc0NhbkdvOmJvb2xlYW4pe1xyXG4gICAgICAgIGxldCBwYXRoPSdtYXplL21hemVfaGVhbGluZ19wb3Rpb25fdWknO1xyXG4gICAgICAgIGxldCBwcmVmYWI9dGhpcy5nZXRQcmVmYWIocGF0aCk7XHJcbiAgICAgICAgaWYocHJlZmFiKXtcclxuICAgICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUocHJlZmFiKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgdHM9bm9kZS5nZXRDb21wb25lbnQoSGVhbGluZ1BvdGlvbik7XHJcbiAgICAgICAgICAgIHRzLmluaXQodWlBY3Rpb24pO1xyXG4gICAgICAgICAgICB0cy5pbml0RGF0YShpZCxpc0NhbkdvKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5sb2FkUHJlZmFiKHBhdGgsKGFzc2V0OmNjLlByZWZhYik9PntcclxuICAgICAgICAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKGFzc2V0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICAgICAgICAgIGxldCB0cz1ub2RlLmdldENvbXBvbmVudChIZWFsaW5nUG90aW9uKTtcclxuICAgICAgICAgICAgICAgIHRzLmluaXQodWlBY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgdHMuaW5pdERhdGEoaWQsaXNDYW5Hbyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0gICAgXHJcblxyXG4gICAgc2hvd01hemVCdWZmVWkodWlBY3Rpb246VWlBY3Rpb24saWQ6bnVtYmVyLGlzQ2FuR286Ym9vbGVhbil7XHJcbiAgICAgICAgbGV0IHBhdGg9J21hemUvbWF6ZV9idWZmX3VpJztcclxuICAgICAgICBsZXQgcHJlZmFiPXRoaXMuZ2V0UHJlZmFiKHBhdGgpO1xyXG4gICAgICAgIGlmKHByZWZhYil7XHJcbiAgICAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKHByZWZhYik7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICAgICAgbGV0IHRzPW5vZGUuZ2V0Q29tcG9uZW50KE1hemVCdWZmVWkpO1xyXG4gICAgICAgICAgICB0cy5pbml0KHVpQWN0aW9uKTtcclxuICAgICAgICAgICAgdHMuaW5pdERhdGEoaWQsaXNDYW5Hbyk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFByZWZhYihwYXRoLChhc3NldDpjYy5QcmVmYWIpPT57XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShhc3NldCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgdHM9bm9kZS5nZXRDb21wb25lbnQoTWF6ZUJ1ZmZVaSk7XHJcbiAgICAgICAgICAgICAgICB0cy5pbml0KHVpQWN0aW9uKTtcclxuICAgICAgICAgICAgICAgIHRzLmluaXREYXRhKGlkLGlzQ2FuR28pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd01hemVGaWdodGluZ1VpKHVpQWN0aW9uOlVpQWN0aW9uLGlkOm51bWJlcixpc0NhbkdvOmJvb2xlYW4pe1xyXG4gICAgICAgIGxldCBwYXRoPSdtYXplL21hemVfZmlnaHRpbmdfdWknO1xyXG4gICAgICAgIGxldCBwcmVmYWI9dGhpcy5nZXRQcmVmYWIocGF0aCk7XHJcbiAgICAgICAgaWYocHJlZmFiKXtcclxuICAgICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUocHJlZmFiKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgICAgICBsZXQgdHM9bm9kZS5nZXRDb21wb25lbnQoTWF6ZUZpZ2h0aW5nVWkpO1xyXG4gICAgICAgICAgICB0cy5pbml0KHVpQWN0aW9uKTtcclxuICAgICAgICAgICAgdHMuaW5pdERhdGEoaWQsaXNDYW5Hbyk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFByZWZhYihwYXRoLChhc3NldDpjYy5QcmVmYWIpPT57XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShhc3NldCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgdHM9bm9kZS5nZXRDb21wb25lbnQoTWF6ZUZpZ2h0aW5nVWkpO1xyXG4gICAgICAgICAgICAgICAgdHMuaW5pdCh1aUFjdGlvbik7XHJcbiAgICAgICAgICAgICAgICB0cy5pbml0RGF0YShpZCxpc0NhbkdvKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNob3dNYXplU2hvcFVpKHVpQWN0aW9uOlVpQWN0aW9uLGlkOm51bWJlcixpc0NhbkdvOmJvb2xlYW4pe1xyXG4gICAgICAgIGxldCBwYXRoPSdtYXplL21hemVfc2hvcCc7XHJcbiAgICAgICAgbGV0IHByZWZhYj10aGlzLmdldFByZWZhYihwYXRoKTtcclxuICAgICAgICBpZihwcmVmYWIpe1xyXG4gICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShwcmVmYWIpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgIGxldCB0cz1ub2RlLmdldENvbXBvbmVudChNYXplU2hvcCk7XHJcbiAgICAgICAgICAgIHRzLmluaXQodWlBY3Rpb24pO1xyXG4gICAgICAgICAgICB0cy5pbml0RGF0YShpZCxpc0NhbkdvKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5sb2FkUHJlZmFiKHBhdGgsKGFzc2V0OmNjLlByZWZhYik9PntcclxuICAgICAgICAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKGFzc2V0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICAgICAgICAgIGxldCB0cz1ub2RlLmdldENvbXBvbmVudChNYXplU2hvcCk7XHJcbiAgICAgICAgICAgICAgICB0cy5pbml0KHVpQWN0aW9uKTtcclxuICAgICAgICAgICAgICAgIHRzLmluaXREYXRhKGlkLGlzQ2FuR28pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd01hemVUb29sVWkodWlBY3Rpb246VWlBY3Rpb24pe1xyXG4gICAgICAgIGxldCBwYXRoPSdtYXplL21hemVfdG9vbF91aSc7XHJcbiAgICAgICAgbGV0IHByZWZhYj10aGlzLmdldFByZWZhYihwYXRoKTtcclxuICAgICAgICBpZihwcmVmYWIpe1xyXG4gICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShwcmVmYWIpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgIGxldCB0cz1ub2RlLmdldENvbXBvbmVudChNYXplVG9vbFVpKTtcclxuICAgICAgICAgICAgdHMuaW5pdCh1aUFjdGlvbik7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFByZWZhYihwYXRoLChhc3NldDpjYy5QcmVmYWIpPT57XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShhc3NldCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgdHM9bm9kZS5nZXRDb21wb25lbnQoTWF6ZVRvb2xVaSk7XHJcbiAgICAgICAgICAgICAgICB0cy5pbml0KHVpQWN0aW9uKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNob3dNYXplQmFnVWkoKXtcclxuICAgICAgICBsZXQgcGF0aD0nbWF6ZS9tYXplX2JhZ191aSc7XHJcbiAgICAgICAgbGV0IHByZWZhYj10aGlzLmdldFByZWZhYihwYXRoKTtcclxuICAgICAgICBpZihwcmVmYWIpe1xyXG4gICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShwcmVmYWIpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFByZWZhYihwYXRoLChhc3NldDpjYy5QcmVmYWIpPT57XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShhc3NldCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzaG93TWF6ZUJ1ZmZJbmZvKGJ1ZmZJZDpudW1iZXIpe1xyXG4gICAgICAgIGxldCBwYXRoPSdtYXplL21hemVfc2hvd19idWZmJztcclxuICAgICAgICBsZXQgcHJlZmFiPXRoaXMuZ2V0UHJlZmFiKHBhdGgpO1xyXG4gICAgICAgIGlmKHByZWZhYil7XHJcbiAgICAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKHByZWZhYik7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICAgICAgbGV0IHRzPW5vZGUuZ2V0Q29tcG9uZW50KE1hemVTaG93QnVmZlVpKTtcclxuICAgICAgICAgICAgdHMuaW5pdERhdGEoYnVmZklkKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5sb2FkUHJlZmFiKHBhdGgsKGFzc2V0OmNjLlByZWZhYik9PntcclxuICAgICAgICAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKGFzc2V0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICAgICAgICAgIGxldCB0cz1ub2RlLmdldENvbXBvbmVudChNYXplU2hvd0J1ZmZVaSk7XHJcbiAgICAgICAgICAgICAgICB0cy5pbml0RGF0YShidWZmSWQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd01hemVTZW5kRG9vclVpKCl7XHJcbiAgICAgICAgbGV0IHBhdGg9J21hemUvbWF6ZV9zZW5kX2Rvb3JfdWknO1xyXG4gICAgICAgIGxldCBwcmVmYWI9dGhpcy5nZXRQcmVmYWIocGF0aCk7XHJcbiAgICAgICAgaWYocHJlZmFiKXtcclxuICAgICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUocHJlZmFiKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRQcmVmYWIocGF0aCwoYXNzZXQ6Y2MuUHJlZmFiKT0+e1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUoYXNzZXQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd01hemVXYWxsSW5mb1VpKHVpQWN0aW9uOlVpQWN0aW9uKXtcclxuICAgICAgICBsZXQgcGF0aD0nbWF6ZS9tYXplX3dhbGxfaW5mbyc7XHJcbiAgICAgICAgbGV0IHByZWZhYj10aGlzLmdldFByZWZhYihwYXRoKTtcclxuICAgICAgICBpZihwcmVmYWIpe1xyXG4gICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShwcmVmYWIpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KE1hemVXYWxsSW5mb1VpKS5pbml0KHVpQWN0aW9uKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5sb2FkUHJlZmFiKHBhdGgsKGFzc2V0OmNjLlByZWZhYik9PntcclxuICAgICAgICAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKGFzc2V0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KE1hemVXYWxsSW5mb1VpKS5pbml0KHVpQWN0aW9uKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNob3dNYXplTGVhc2VVaSh1aUFjdGlvbjpVaUFjdGlvbixpZDpudW1iZXIsaXNDYW5Hbzpib29sZWFuKXtcclxuICAgICAgICBsZXQgcGF0aD0nbWF6ZS9tYXplX2xlYXNlX3VpJztcclxuICAgICAgICBsZXQgcHJlZmFiPXRoaXMuZ2V0UHJlZmFiKHBhdGgpO1xyXG4gICAgICAgIGlmKHByZWZhYil7XHJcbiAgICAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKHByZWZhYik7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICAgICAgbGV0IHRzPW5vZGUuZ2V0Q29tcG9uZW50KE1hemVMZWFzZVVpKTtcclxuICAgICAgICAgICAgdHMuaW5pdCh1aUFjdGlvbik7XHJcbiAgICAgICAgICAgIHRzLmluaXREYXRhKGlkLGlzQ2FuR28pO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRQcmVmYWIocGF0aCwoYXNzZXQ6Y2MuUHJlZmFiKT0+e1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUoYXNzZXQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHRzPW5vZGUuZ2V0Q29tcG9uZW50KE1hemVMZWFzZVVpKTtcclxuICAgICAgICAgICAgICAgIHRzLmluaXQodWlBY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgdHMuaW5pdERhdGEoaWQsaXNDYW5Hbyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzaG93UHJvcEluZm8odWlBY3Rpb246VWlBY3Rpb24scHJvcEFjOlByb3BBY3Rpb24scGQ6UHJvcERhdGEsYnV5Q2FsbGJhY2s6RnVuY3Rpb24sdXNlQ2FsbGJhY2s6RnVuY3Rpb24pe1xyXG4gICAgICAgIGxldCBwYXRoPSdwcm9wL3Byb3BfaW5mb191aSc7XHJcbiAgICAgICAgbGV0IHByZWZhYj10aGlzLmdldFByZWZhYihwYXRoKTtcclxuICAgICAgICBpZihwcmVmYWIpe1xyXG4gICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShwcmVmYWIpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgIGxldCB0cz1ub2RlLmdldENvbXBvbmVudChQcm9wSW5mb1VpKTtcclxuICAgICAgICAgICAgdHMuaW5pdCh1aUFjdGlvbik7XHJcbiAgICAgICAgICAgIHRzLmluaXREYXRhKHBkLHByb3BBYyk7XHJcbiAgICAgICAgICAgIHRzLmFkZEJ1eUxpc3RlbihidXlDYWxsYmFjayk7XHJcbiAgICAgICAgICAgIHRzLmFkZFVzZUxpc3Rlbih1c2VDYWxsYmFjayk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFByZWZhYihwYXRoLChhc3NldDpjYy5QcmVmYWIpPT57XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShhc3NldCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgdHM9bm9kZS5nZXRDb21wb25lbnQoUHJvcEluZm9VaSk7XHJcbiAgICAgICAgICAgICAgICB0cy5pbml0KHVpQWN0aW9uKTtcclxuICAgICAgICAgICAgICAgIHRzLmluaXREYXRhKHBkLHByb3BBYyk7XHJcbiAgICAgICAgICAgICAgICB0cy5hZGRCdXlMaXN0ZW4oYnV5Q2FsbGJhY2spO1xyXG4gICAgICAgICAgICAgICAgdHMuYWRkVXNlTGlzdGVuKHVzZUNhbGxiYWNrKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvLyBzaG93QmFnVWkodWlBY3Rpb246VWlBY3Rpb24pXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgICAgbGV0IHBhdGg9J3VpL2hvbWUvYmFnX3VpJztcclxuICAgIC8vICAgICBsZXQgcHJlZmFiPXRoaXMuZ2V0UHJlZmFiKHBhdGgpO1xyXG4gICAgLy8gICAgIGlmKHByZWZhYil7XHJcbiAgICAvLyAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKHByZWZhYik7XHJcbiAgICAvLyAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgIC8vICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoQmFnVWkpLmluaXQodWlBY3Rpb24pO1xyXG4gICAgLy8gICAgIH1lbHNle1xyXG4gICAgLy8gICAgICAgICB0aGlzLmxvYWRQcmVmYWIocGF0aCwoYXNzZXQ6Y2MuUHJlZmFiKT0+e1xyXG4gICAgLy8gICAgICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUoYXNzZXQpO1xyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgLy8gICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoQmFnVWkpLmluaXQodWlBY3Rpb24pO1xyXG4gICAgLy8gICAgICAgICB9KTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9XHJcbiAgICAvLyBzaG93R29sZE1hbGxVaSh1aUFjdGlvbjpVaUFjdGlvbilcclxuICAgIC8vIHtcclxuICAgIC8vICAgICBsZXQgcGF0aD0ndWkvaG9tZS9nb2xkX21hbGxfdWknO1xyXG4gICAgLy8gICAgIGxldCBwcmVmYWI9dGhpcy5nZXRQcmVmYWIocGF0aCk7XHJcbiAgICAvLyAgICAgaWYocHJlZmFiKXtcclxuICAgIC8vICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUocHJlZmFiKTtcclxuICAgIC8vICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgLy8gICAgICAgICBub2RlLmdldENvbXBvbmVudChHb2xkTWFsbFVpKS5pbml0KHVpQWN0aW9uKTtcclxuICAgIC8vICAgICB9ZWxzZXtcclxuICAgIC8vICAgICAgICAgdGhpcy5sb2FkUHJlZmFiKHBhdGgsKGFzc2V0OmNjLlByZWZhYik9PntcclxuICAgIC8vICAgICAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKGFzc2V0KTtcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgIC8vICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KEdvbGRNYWxsVWkpLmluaXQodWlBY3Rpb24pO1xyXG4gICAgLy8gICAgICAgICB9KTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9XHJcblxyXG4gICAgc2hvd0NvbnN1bXB0aW9uVGlwVWkodWlBY3Rpb246VWlBY3Rpb24sY3VycmVuY3lUeXBlOlByb3BJZCxjdXJyZW5jeU51bTpudW1iZXIsc3VyZUNhbGxCYWNrOkZ1bmN0aW9uKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBwYXRoPSdjb25zdW1wdGlvbl90aXBfdWknO1xyXG4gICAgICAgIGxldCBwcmVmYWI9dGhpcy5nZXRQcmVmYWIocGF0aCk7XHJcbiAgICAgICAgaWYocHJlZmFiKXtcclxuICAgICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUocHJlZmFiKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChDb25zdW1wdGlvblRpcFVpKS5pbml0KHVpQWN0aW9uKTtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoQ29uc3VtcHRpb25UaXBVaSkuaW5pdENhbGxCYWNrKGN1cnJlbmN5VHlwZSxjdXJyZW5jeU51bSxzdXJlQ2FsbEJhY2spO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRQcmVmYWIocGF0aCwoYXNzZXQ6Y2MuUHJlZmFiKT0+e1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUoYXNzZXQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoQ29uc3VtcHRpb25UaXBVaSkuaW5pdCh1aUFjdGlvbik7XHJcbiAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChDb25zdW1wdGlvblRpcFVpKS5pbml0Q2FsbEJhY2soY3VycmVuY3lUeXBlLGN1cnJlbmN5TnVtLHN1cmVDYWxsQmFjayk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBzaG93QXR0cmlidXRlVWkodWlBY3Rpb246VWlBY3Rpb24saGVyb1R5cGU/Okhlcm9fVHlwZSxwZXRJbmZvPzpQZXRJbmZvKVxyXG4gICAgLy8ge1xyXG4gICAgLy8gICAgIGxldCBwYXRoPSd1aS9ob21lL2F0dHJpYnV0ZV91aSc7XHJcbiAgICAvLyAgICAgbGV0IHByZWZhYj10aGlzLmdldFByZWZhYihwYXRoKTtcclxuICAgIC8vICAgICBpZihwcmVmYWIpe1xyXG4gICAgLy8gICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShwcmVmYWIpO1xyXG4gICAgLy8gICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAvLyAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KEF0cnJpYnV0ZVVpKS5pbml0KHVpQWN0aW9uKTtcclxuICAgIC8vICAgICAgICAgaWYoaGVyb1R5cGUgIT0gbnVsbCl7XHJcbiAgICAvLyAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChBdHJyaWJ1dGVVaSkuaW5pdEhlcm9UeXBlKGhlcm9UeXBlKTtcclxuICAgIC8vICAgICAgICAgfWVsc2V7XHJcbiAgICAvLyAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChBdHJyaWJ1dGVVaSkuaW5pdFBldEluZm8ocGV0SW5mbyk7XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9ZWxzZXtcclxuICAgIC8vICAgICAgICAgdGhpcy5sb2FkUHJlZmFiKHBhdGgsKGFzc2V0OmNjLlByZWZhYik9PntcclxuICAgIC8vICAgICAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKGFzc2V0KTtcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgIC8vICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KEF0cnJpYnV0ZVVpKS5pbml0KHVpQWN0aW9uKTtcclxuICAgIC8vICAgICAgICAgICAgIGlmKGhlcm9UeXBlICE9IG51bGwpe1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KEF0cnJpYnV0ZVVpKS5pbml0SGVyb1R5cGUoaGVyb1R5cGUpO1xyXG4gICAgLy8gICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoQXRycmlidXRlVWkpLmluaXRQZXRJbmZvKHBldEluZm8pO1xyXG4gICAgLy8gICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICB9KTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9XHJcblxyXG4gICAgc2hvd1BldFVwZ3JhZGVVaSh1aUFjdGlvbjpVaUFjdGlvbixwZXRJbmZvOlBldEluZm8pXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHBhdGg9J3BldC91aS9wZXRfdXBncmFkZV91aSc7XHJcbiAgICAgICAgbGV0IHByZWZhYj10aGlzLmdldFByZWZhYihwYXRoKTtcclxuICAgICAgICBpZihwcmVmYWIpe1xyXG4gICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShwcmVmYWIpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFBldFVwZ3JhZGVVaSkuaW5pdCh1aUFjdGlvbik7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFBldFVwZ3JhZGVVaSkuaW5pdFVpKHBldEluZm8pO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRQcmVmYWIocGF0aCwoYXNzZXQ6Y2MuUHJlZmFiKT0+e1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUoYXNzZXQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoUGV0VXBncmFkZVVpKS5pbml0KHVpQWN0aW9uKTtcclxuICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFBldFVwZ3JhZGVVaSkuaW5pdFVpKHBldEluZm8pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0VxdWlwRXhjaGFuZ2VVaSh1aUFjdGlvbjpVaUFjdGlvbixlcXVpcElkOm51bWJlcixoZXJvVHlwZTpIZXJvX1R5cGUsZXF1aXBQb3M6RXF1aXBUeXBlKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBwYXRoPSdlcXVpcG1lbnQvZXF1aXBfZXhjaGFuZ2VfdWknO1xyXG4gICAgICAgIHRoaXMuc2hvd1VpRGlhbG9nKHBhdGgsVUlMYXllckxldmVsLlRocmVlLHtvbkNvbXBsZXRlZDoobm9kZSk9PntcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJfX19fX19fXCIpXHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KEVxdWlwRXhjaGFuZ2VVaSkuaW5pdCh1aUFjdGlvbik7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KEVxdWlwRXhjaGFuZ2VVaSkuaW5pdERhdGEoZXF1aXBJZCxoZXJvVHlwZSxlcXVpcFBvcyk7XHJcbiAgICAgICAgfX0pO1xyXG4gICAgICAgIHJldHVyblxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBzaG93UGV0RXhjaGFuZ2VVaSh1aUFjdGlvbjpVaUFjdGlvbixwZXRJbmZvOlBldEluZm8saGVyb1R5cGU6SGVyb19UeXBlKVxyXG4gICAge1xyXG4gICAgICAgIC8vIGxldCBwYXRoPSdwZXQvdWkvcGV0X2V4Y2hhbmdlX3VpJztcclxuICAgICAgICAvLyBsZXQgcHJlZmFiPXRoaXMuZ2V0UHJlZmFiKHBhdGgpO1xyXG4gICAgICAgIC8vIGlmKHByZWZhYil7XHJcbiAgICAgICAgLy8gICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKHByZWZhYik7XHJcbiAgICAgICAgLy8gICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICAvLyAgICAgbm9kZS5nZXRDb21wb25lbnQoUGV0RXhjaGFuZ2VVaSkuaW5pdCh1aUFjdGlvbik7XHJcbiAgICAgICAgLy8gICAgIG5vZGUuZ2V0Q29tcG9uZW50KFBldEV4Y2hhbmdlVWkpLmluaXREYXRhKHBldEluZm8saGVyb1R5cGUpO1xyXG4gICAgICAgIC8vIH1lbHNle1xyXG4gICAgICAgIC8vICAgICB0aGlzLmxvYWRQcmVmYWIocGF0aCwoYXNzZXQ6Y2MuUHJlZmFiKT0+e1xyXG4gICAgICAgIC8vICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUoYXNzZXQpO1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgIC8vICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoUGV0RXhjaGFuZ2VVaSkuaW5pdCh1aUFjdGlvbik7XHJcbiAgICAgICAgLy8gICAgICAgICBub2RlLmdldENvbXBvbmVudChQZXRFeGNoYW5nZVVpKS5pbml0RGF0YShwZXRJbmZvLGhlcm9UeXBlKTtcclxuICAgICAgICAvLyAgICAgfSk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIHNob3dXaXNoaW5nVWkodWlBY3Rpb246VWlBY3Rpb24pXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgICAgbGV0IHBhdGg9J3VpL2hvbWUvd2lzaGluZ191aSc7XHJcbiAgICAvLyAgICAgdGhpcy5zaG93VWlEaWFsb2cocGF0aCxVSUxheWVyTGV2ZWwuT25lLHtvbkNvbXBsZXRlZDoobm9kZSk9PntcclxuICAgIC8vICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoV2lzaGluZ1VpKS5pbml0KHVpQWN0aW9uKTtcclxuICAgIC8vICAgICB9fSk7XHJcbiAgICAvLyAgICAgcmV0dXJuO1xyXG4gICAgLy8gICAgIGxldCBwcmVmYWI9dGhpcy5nZXRQcmVmYWIocGF0aCk7XHJcbiAgICAvLyAgICAgaWYocHJlZmFiKXtcclxuICAgIC8vICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUocHJlZmFiKTtcclxuICAgIC8vICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgLy8gICAgICAgICBub2RlLmdldENvbXBvbmVudChXaXNoaW5nVWkpLmluaXQodWlBY3Rpb24pO1xyXG4gICAgLy8gICAgIH1lbHNle1xyXG4gICAgLy8gICAgICAgICB0aGlzLmxvYWRQcmVmYWIocGF0aCwoYXNzZXQ6Y2MuUHJlZmFiKT0+eyAgICAgICAgICAgICAgICBcclxuICAgIC8vICAgICAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKGFzc2V0KTtcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgIC8vICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFdpc2hpbmdVaSkuaW5pdCh1aUFjdGlvbik7XHJcbiAgICAvLyAgICAgICAgIH0pO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyBzaG93V2lzaGluZ1RpcFVpKHVpQWN0aW9uOlVpQWN0aW9uLHN0YXRlOldpc2hpbmdTdGF0ZXxUYWtlRWdnU3RhdGUsaWQ6bnVtYmVyLGlzVGFrZUVnZzpib29sZWFuID0gZmFsc2UpXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgICAgbGV0IHBhdGg9J3VpL2hvbWUvd2lzaGluZ190aXBfdWknO1xyXG4gICAgLy8gICAgIGxldCBwcmVmYWI9dGhpcy5nZXRQcmVmYWIocGF0aCk7XHJcbiAgICAvLyAgICAgaWYocHJlZmFiKXtcclxuICAgIC8vICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUocHJlZmFiKTtcclxuICAgIC8vICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgLy8gICAgICAgICBub2RlLmdldENvbXBvbmVudChXaXNoaW5nVGlwVWkpLmluaXQodWlBY3Rpb24pO1xyXG4gICAgLy8gICAgICAgICBub2RlLmdldENvbXBvbmVudChXaXNoaW5nVGlwVWkpLmluaXRVaShzdGF0ZSxpZCxpc1Rha2VFZ2cpO1xyXG4gICAgLy8gICAgIH1lbHNle1xyXG4gICAgLy8gICAgICAgICB0aGlzLmxvYWRQcmVmYWIocGF0aCwoYXNzZXQ6Y2MuUHJlZmFiKT0+e1xyXG4gICAgLy8gICAgICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUoYXNzZXQpO1xyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgLy8gICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoV2lzaGluZ1RpcFVpKS5pbml0KHVpQWN0aW9uKTtcclxuICAgIC8vICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFdpc2hpbmdUaXBVaSkuaW5pdFVpKHN0YXRlLGlkLGlzVGFrZUVnZyk7XHJcbiAgICAvLyAgICAgICAgIH0pO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyBzaG93RXhjbHVzaXZlV2VhcG9uc1VpKHVpQWN0aW9uOlVpQWN0aW9uLGhlcm9UeXBlOkhlcm9fVHlwZSlcclxuICAgIC8vIHtcclxuICAgIC8vICAgICBsZXQgcGF0aD0ndWkvaG9tZS9leGNsdXNpdmVfd2VhcG9uc191aSc7XHJcbiAgICAvLyAgICAgbGV0IHByZWZhYj10aGlzLmdldFByZWZhYihwYXRoKTtcclxuICAgIC8vICAgICBpZihwcmVmYWIpe1xyXG4gICAgLy8gICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShwcmVmYWIpO1xyXG4gICAgLy8gICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAvLyAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KEV4Y2x1c2l2ZVdlYXBvbnNVaSkuaW5pdCh1aUFjdGlvbik7XHJcbiAgICAvLyAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KEV4Y2x1c2l2ZVdlYXBvbnNVaSkuaW5pdERhdGEoaGVyb1R5cGUpO1xyXG4gICAgLy8gICAgIH1lbHNle1xyXG4gICAgLy8gICAgICAgICB0aGlzLmxvYWRQcmVmYWIocGF0aCwoYXNzZXQ6Y2MuUHJlZmFiKT0+e1xyXG4gICAgLy8gICAgICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUoYXNzZXQpO1xyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgLy8gICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoRXhjbHVzaXZlV2VhcG9uc1VpKS5pbml0KHVpQWN0aW9uKTtcclxuICAgIC8vICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KEV4Y2x1c2l2ZVdlYXBvbnNVaSkuaW5pdERhdGEoaGVyb1R5cGUpO1xyXG4gICAgLy8gICAgICAgICB9KTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gc2hvd0V4Y2x1c2l2ZVdlYXBvbnNTdHJlbmd0aGVuaW5nVWkodWlBY3Rpb246VWlBY3Rpb24saGVyb1R5cGU6SGVyb19UeXBlLGlzQWN0aVZhdGlvbjpib29sZWFuPWZhbHNlKVxyXG4gICAgLy8ge1xyXG4gICAgLy8gICAgIGxldCBwYXRoPSd1aS9ob21lL2V4Y2x1c2l2ZV93ZWFwb25zX3N0cmVuZ3RoZW5pbmdfdWknO1xyXG4gICAgLy8gICAgIGxldCBwcmVmYWI9dGhpcy5nZXRQcmVmYWIocGF0aCk7XHJcbiAgICAvLyAgICAgaWYocHJlZmFiKXtcclxuICAgIC8vICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUocHJlZmFiKTtcclxuICAgIC8vICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgLy8gICAgICAgICBub2RlLmdldENvbXBvbmVudChFeGNsdXNpdmVXZWFwb25zU3RyZW5ndGhlbmluZ1VpKS5pbml0KHVpQWN0aW9uKTtcclxuICAgIC8vICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoRXhjbHVzaXZlV2VhcG9uc1N0cmVuZ3RoZW5pbmdVaSkuaW5pdERhdGEoaGVyb1R5cGUsaXNBY3RpVmF0aW9uKTtcclxuICAgIC8vICAgICB9ZWxzZXtcclxuICAgIC8vICAgICAgICAgdGhpcy5sb2FkUHJlZmFiKHBhdGgsKGFzc2V0OmNjLlByZWZhYik9PntcclxuICAgIC8vICAgICAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKGFzc2V0KTtcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgIC8vICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KEV4Y2x1c2l2ZVdlYXBvbnNTdHJlbmd0aGVuaW5nVWkpLmluaXQodWlBY3Rpb24pO1xyXG4gICAgLy8gICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoRXhjbHVzaXZlV2VhcG9uc1N0cmVuZ3RoZW5pbmdVaSkuaW5pdERhdGEoaGVyb1R5cGUsaXNBY3RpVmF0aW9uKTtcclxuICAgIC8vICAgICAgICAgfSk7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfVxyXG5cclxuICAgIHNob3dQYXlVaSh1aUFjdGlvbjpVaUFjdGlvbixzaG93SW5kZXg6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBwYXRoPSdwYXltZW50L3BheW1lbnRfdWknO1xyXG4gICAgICAgIHRoaXMuc2hvd1VpRGlhbG9nKHBhdGgsVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KG5vZGUpPT57XHJcbiAgICAgICAgICAgIGxldCB0cz1ub2RlLmdldENvbXBvbmVudChQYXltZW50VWkpO1xyXG4gICAgICAgICAgICB0cy5pbml0KHVpQWN0aW9uKTtcclxuICAgICAgICAgICAgdHMuaW5pdERhdGEoc2hvd0luZGV4KTtcclxuICAgICAgICB9fSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGxldCBwcmVmYWI9dGhpcy5nZXRQcmVmYWIocGF0aCk7XHJcbiAgICAgICAgaWYocHJlZmFiKXtcclxuICAgICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUocHJlZmFiKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgICAgICBsZXQgdHM9bm9kZS5nZXRDb21wb25lbnQoUGF5bWVudFVpKTtcclxuICAgICAgICAgICAgdHMuaW5pdCh1aUFjdGlvbik7XHJcbiAgICAgICAgICAgIHRzLmluaXREYXRhKHNob3dJbmRleCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFByZWZhYihwYXRoLChhc3NldDpjYy5QcmVmYWIpPT57XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShhc3NldCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgdHM9bm9kZS5nZXRDb21wb25lbnQoUGF5bWVudFVpKTtcclxuICAgICAgICAgICAgICAgIHRzLmluaXQodWlBY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgdHMuaW5pdERhdGEoc2hvd0luZGV4KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIHNob3dUYWtlRWdnVWkodWlBY3Rpb246VWlBY3Rpb24pXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgICAgbGV0IHBhdGg9J3VpL2hvbWUvdGFrZV9lZ2dfdWknO1xyXG4gICAgLy8gICAgIGxldCBwcmVmYWI9dGhpcy5nZXRQcmVmYWIocGF0aCk7XHJcbiAgICAvLyAgICAgaWYocHJlZmFiKXtcclxuICAgIC8vICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUocHJlZmFiKTtcclxuICAgIC8vICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgLy8gICAgICAgICBub2RlLmdldENvbXBvbmVudChUYWtlRWdnVWkpLmluaXQodWlBY3Rpb24pO1xyXG4gICAgLy8gICAgIH1lbHNle1xyXG4gICAgLy8gICAgICAgICB0aGlzLmxvYWRQcmVmYWIocGF0aCwoYXNzZXQ6Y2MuUHJlZmFiKT0+e1xyXG4gICAgLy8gICAgICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUoYXNzZXQpO1xyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgLy8gICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoVGFrZUVnZ1VpKS5pbml0KHVpQWN0aW9uKTtcclxuICAgIC8vICAgICAgICAgfSk7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIHNob3dFcXVpcFN5bnRoZXRpY1VpKHVpQWN0aW9uOlVpQWN0aW9uKVxyXG4gICAgLy8ge1xyXG4gICAgLy8gICAgIGxldCBwYXRoPSd1aS9ob21lL2VxdWlwX3N5bnRoZXRpY191aSc7XHJcbiAgICAvLyAgICAgbGV0IHByZWZhYj10aGlzLmdldFByZWZhYihwYXRoKTtcclxuICAgIC8vICAgICBpZihwcmVmYWIpe1xyXG4gICAgLy8gICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShwcmVmYWIpO1xyXG4gICAgLy8gICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAvLyAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KE1lcmdlVWkpLmluaXQodWlBY3Rpb24pO1xyXG4gICAgLy8gICAgIH1lbHNle1xyXG4gICAgLy8gICAgICAgICB0aGlzLmxvYWRQcmVmYWIocGF0aCwoYXNzZXQ6Y2MuUHJlZmFiKT0+e1xyXG4gICAgLy8gICAgICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUoYXNzZXQpO1xyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgLy8gICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoTWVyZ2VVaSkuaW5pdCh1aUFjdGlvbik7XHJcbiAgICAvLyAgICAgICAgIH0pO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH1cclxuICAgIFxyXG4gICAgc2hvd1BldEFkZHZhbmNlVWkodWlBY3Rpb246VWlBY3Rpb24pXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHBhdGg9J3BldC91aS9wZXRfYWR2YW5jZV91aSc7XHJcbiAgICAgICAgbGV0IHByZWZhYj10aGlzLmdldFByZWZhYihwYXRoKTtcclxuICAgICAgICBpZihwcmVmYWIpe1xyXG4gICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShwcmVmYWIpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgIC8vIG5vZGUuZ2V0Q29tcG9uZW50KFBldEFkdmFuY2VVaSkuaW5pdCh1aUFjdGlvbik7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFByZWZhYihwYXRoLChhc3NldDpjYy5QcmVmYWIpPT57XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShhc3NldCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgICAgICAvLyBub2RlLmdldENvbXBvbmVudChQZXRBZHZhbmNlVWkpLmluaXQodWlBY3Rpb24pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1BldFNldEZyZWVVaSh1aUFjdGlvbjpVaUFjdGlvbixwZXRfbGlzdDpQZXRJbmZvW10pXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHBhdGg9J3BldC91aS9wZXRfc2V0X2ZyZWVfdWknO1xyXG4gICAgICAgIGxldCBwcmVmYWI9dGhpcy5nZXRQcmVmYWIocGF0aCk7XHJcbiAgICAgICAgaWYocHJlZmFiKXtcclxuICAgICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUocHJlZmFiKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChQZXRTZXRGcmVlVWkpLmluaXQodWlBY3Rpb24pO1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChQZXRTZXRGcmVlVWkpLmluaXREYXRhKHBldF9saXN0KTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5sb2FkUHJlZmFiKHBhdGgsKGFzc2V0OmNjLlByZWZhYik9PntcclxuICAgICAgICAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKGFzc2V0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFBldFNldEZyZWVVaSkuaW5pdCh1aUFjdGlvbik7XHJcbiAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChQZXRTZXRGcmVlVWkpLmluaXREYXRhKHBldF9saXN0KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNob3dQZXRSZXNldFVpKHVpQWN0aW9uOlVpQWN0aW9uLHBldEluZm86UGV0SW5mbylcclxuICAgIHtcclxuICAgICAgICBsZXQgcGF0aD0ncGV0L3VpL3BldF9yZWR1Y3Rpb25fdWknO1xyXG4gICAgICAgIGxldCBwcmVmYWI9dGhpcy5nZXRQcmVmYWIocGF0aCk7XHJcbiAgICAgICAgaWYocHJlZmFiKXtcclxuICAgICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUocHJlZmFiKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChQZXRSZWR1Y3Rpb25VaSkuaW5pdCh1aUFjdGlvbik7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFBldFJlZHVjdGlvblVpKS5pbml0RGF0YShwZXRJbmZvKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5sb2FkUHJlZmFiKHBhdGgsKGFzc2V0OmNjLlByZWZhYik9PntcclxuICAgICAgICAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKGFzc2V0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFBldFJlZHVjdGlvblVpKS5pbml0KHVpQWN0aW9uKTtcclxuICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFBldFJlZHVjdGlvblVpKS5pbml0RGF0YShwZXRJbmZvKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNob3dQYXlGaXJzdENoYXJnZVVpKHVpQWN0aW9uOlVpQWN0aW9uKVxyXG4gICAge1xyXG4gICAgICAgIC8vIGxldCBwYXRoPSdwYXltZW50L3BheV9maXJzdF9jaGFyZ2VfdWknO1xyXG4gICAgICAgIC8vIGxldCBwcmVmYWI9dGhpcy5nZXRQcmVmYWIocGF0aCk7XHJcbiAgICAgICAgLy8gaWYocHJlZmFiKXtcclxuICAgICAgICAvLyAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUocHJlZmFiKTtcclxuICAgICAgICAvLyAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgIC8vICAgICBub2RlLmdldENvbXBvbmVudChQYXlGaXJzdENoYXJnZVVpKS5pbml0KHVpQWN0aW9uKTtcclxuICAgICAgICAvLyB9ZWxzZXtcclxuICAgICAgICAvLyAgICAgdGhpcy5sb2FkUHJlZmFiKHBhdGgsKGFzc2V0OmNjLlByZWZhYik9PntcclxuICAgICAgICAvLyAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKGFzc2V0KTtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICAvLyAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFBheUZpcnN0Q2hhcmdlVWkpLmluaXQodWlBY3Rpb24pO1xyXG4gICAgICAgIC8vICAgICB9KTtcclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHNob3dIZWxwVGlwc1VpKHVpQWN0aW9uOlVpQWN0aW9uLHRpdGxlSWQ6bnVtYmVyLGNvbnRlbnRJZHM6bnVtYmVyW10pe1xyXG4gICAgICAgIGxldCBwYXRoPSdoZWxwX3VpJztcclxuICAgICAgICBsZXQgcHJlZmFiPXRoaXMuZ2V0UHJlZmFiKHBhdGgpO1xyXG4gICAgICAgIGlmKHByZWZhYil7XHJcbiAgICAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKHByZWZhYik7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoQmF0dGxlUGFzc0hlbHBVaSkuaW5pdCh1aUFjdGlvbik7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KEJhdHRsZVBhc3NIZWxwVWkpLmluaXREYXRhKHRpdGxlSWQsY29udGVudElkcyk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFByZWZhYihwYXRoLChhc3NldDpjYy5QcmVmYWIpPT57XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShhc3NldCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChCYXR0bGVQYXNzSGVscFVpKS5pbml0KHVpQWN0aW9uKTtcclxuICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KEJhdHRsZVBhc3NIZWxwVWkpLmluaXREYXRhKHRpdGxlSWQsY29udGVudElkcyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIHNob3dUb3dlckZpZ2h0aW5nVWkodWlBY3Rpb246VWlBY3Rpb24sbGV2ZWw6bnVtYmVyKVxyXG4gICAgLy8ge1xyXG4gICAgLy8gICAgIGxldCBwYXRoPSd1aS9ob21lL3Rvd2VyX2ZpZ2h0aW5nX3VpJztcclxuICAgIC8vICAgICBsZXQgcHJlZmFiPXRoaXMuZ2V0UHJlZmFiKHBhdGgpO1xyXG4gICAgLy8gICAgIGlmKHByZWZhYil7XHJcbiAgICAvLyAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKHByZWZhYik7XHJcbiAgICAvLyAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgIC8vICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoVG93ZXJGaWdodGluZ1VpKS5pbml0KHVpQWN0aW9uKTtcclxuICAgIC8vICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoVG93ZXJGaWdodGluZ1VpKS5pbml0RGF0YShsZXZlbCk7XHJcbiAgICAvLyAgICAgfWVsc2V7XHJcbiAgICAvLyAgICAgICAgIHRoaXMubG9hZFByZWZhYihwYXRoLChhc3NldDpjYy5QcmVmYWIpPT57XHJcbiAgICAvLyAgICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShhc3NldCk7XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAvLyAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChUb3dlckZpZ2h0aW5nVWkpLmluaXQodWlBY3Rpb24pO1xyXG4gICAgLy8gICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoVG93ZXJGaWdodGluZ1VpKS5pbml0RGF0YShsZXZlbCk7XHJcbiAgICAvLyAgICAgICAgIH0pO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH1cclxuXHJcbiAgICBzaG93UGV0QWR2YW5jZVNob3dVaSh1aUFjdGlvbjpVaUFjdGlvbixub3dQZXRJbmZvOlBldEluZm8sb2xkUGV0SW5mbzpQZXRJbmZvKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBwYXRoPSdwZXQvdWkvcGV0X2FkdmFuc19zaG93X3VpJztcclxuICAgICAgICBsZXQgcHJlZmFiPXRoaXMuZ2V0UHJlZmFiKHBhdGgpO1xyXG4gICAgICAgIGlmKHByZWZhYil7XHJcbiAgICAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKHByZWZhYik7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoUGV0QWR2YW5jZVNob3dVaSkuaW5pdCh1aUFjdGlvbik7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFBldEFkdmFuY2VTaG93VWkpLmluaXREYXRhKG5vd1BldEluZm8sb2xkUGV0SW5mbyk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFByZWZhYihwYXRoLChhc3NldDpjYy5QcmVmYWIpPT57XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShhc3NldCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChQZXRBZHZhbmNlU2hvd1VpKS5pbml0KHVpQWN0aW9uKTtcclxuICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFBldEFkdmFuY2VTaG93VWkpLmluaXREYXRhKG5vd1BldEluZm8sb2xkUGV0SW5mbyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0gICAgXHJcblxyXG4gICAgLy8gc2hvd0hlcm9Ta2lsbFVpKHVpQWN0aW9uOlVpQWN0aW9uLGhlcm9UeXBlOkhlcm9fVHlwZSxza2lsbFBvczpudW1iZXIpXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgICAgbGV0IHBhdGg9J3VpL2hvbWUvaGVyb19za2lsbF91aSc7XHJcbiAgICAvLyAgICAgbGV0IHByZWZhYj10aGlzLmdldFByZWZhYihwYXRoKTtcclxuICAgIC8vICAgICBpZihwcmVmYWIpe1xyXG4gICAgLy8gICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShwcmVmYWIpO1xyXG4gICAgLy8gICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAvLyAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KEhlcm9Ta2lsbFVpKS5pbml0KHVpQWN0aW9uKTtcclxuICAgIC8vICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoSGVyb1NraWxsVWkpLmluaXREYXRhKGhlcm9UeXBlLHNraWxsUG9zKTtcclxuICAgIC8vICAgICB9ZWxzZXtcclxuICAgIC8vICAgICAgICAgdGhpcy5sb2FkUHJlZmFiKHBhdGgsKGFzc2V0OmNjLlByZWZhYik9PntcclxuICAgIC8vICAgICAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKGFzc2V0KTtcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgIC8vICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KEhlcm9Ta2lsbFVpKS5pbml0KHVpQWN0aW9uKTtcclxuICAgIC8vICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KEhlcm9Ta2lsbFVpKS5pbml0RGF0YShoZXJvVHlwZSxza2lsbFBvcyk7XHJcbiAgICAvLyAgICAgICAgIH0pO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH0gIFxyXG4gICAgXHJcbiAgICAvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq5ri45oiP5YaFKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcblxyXG4gICAgc2hvd0dhbWVMb3NlVWkoKXtcclxuICAgICAgICBsZXQgcGF0aD0ndWkvZ2FtZS9nYW1lX2xvc2UnO1xyXG4gICAgICAgIGxldCBwcmVmYWI9dGhpcy5nZXRQcmVmYWIocGF0aCk7XHJcbiAgICAgICAgaWYocHJlZmFiKXtcclxuICAgICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUocHJlZmFiKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRQcmVmYWIocGF0aCwoYXNzZXQ6Y2MuUHJlZmFiKT0+e1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUoYXNzZXQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0dhbWVQYXVzZVVpKCl7XHJcbiAgICAgICAgbGV0IHBhdGg9J3VpL2dhbWUvZ2FtZV9wYXVzZSc7XHJcbiAgICAgICAgbGV0IHByZWZhYj10aGlzLmdldFByZWZhYihwYXRoKTtcclxuICAgICAgICBpZihwcmVmYWIpe1xyXG4gICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShwcmVmYWIpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFByZWZhYihwYXRoLChhc3NldDpjYy5QcmVmYWIpPT57XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShhc3NldCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHNob3dSb2d1ZWxpa2VUaXAoKXtcclxuICAgICAgICBpZihHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX3NjZW5lPT1HYW1lU2NlbmUuZ2FtZSl7XHJcbiAgICAgICAgICAgIGxldCBwYXRoPSd1aS9nYW1lL3JvZ3VlbGlrZV90aXAnO1xyXG4gICAgICAgICAgICBsZXQgcHJlZmFiPXRoaXMuZ2V0UHJlZmFiKHBhdGgpO1xyXG4gICAgICAgICAgICBpZihwcmVmYWIpe1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUocHJlZmFiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRQcmVmYWIocGF0aCwoYXNzZXQ6Y2MuUHJlZmFiKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKGFzc2V0KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHNob3dEYW1hZ2VTdGF0c1VpKCl7XHJcbiAgICAgICAgaWYoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zY2VuZT09R2FtZVNjZW5lLmdhbWUpe1xyXG4gICAgICAgICAgICBsZXQgcGF0aD0ndWkvZ2FtZS9kYW1hZ2Vfc3RhdHNfdWknO1xyXG4gICAgICAgICAgICBsZXQgcHJlZmFiPXRoaXMuZ2V0UHJlZmFiKHBhdGgpO1xyXG4gICAgICAgICAgICBpZihwcmVmYWIpe1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUocHJlZmFiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRQcmVmYWIocGF0aCwoYXNzZXQ6Y2MuUHJlZmFiKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKGFzc2V0KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuIl19