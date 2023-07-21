
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
var PayFirstChargeUi_1 = require("../Payment/PayFirstChargeUi");
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
            cc.resources.load(path, cc.Prefab, function (error, assets) {
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
            cc.resources.load(path, cc.Prefab, function (error, assets) {
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
        if (this.cur_show_ui_path.has(layerLevel) && this.cur_show_ui_path.get(layerLevel) != UIConfig_1.UIPath.Null) {
            if (result.onFail)
                result.onFail();
            return;
        }
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
        var _this = this;
        var path = 'payment/pay_first_charge_ui';
        var prefab = this.getPrefab(path);
        if (prefab) {
            var node = cc.instantiate(prefab);
            this.node.addChild(node);
            node.getComponent(PayFirstChargeUi_1.default).init(uiAction);
        }
        else {
            this.loadPrefab(path, function (asset) {
                var node = cc.instantiate(asset);
                _this.node.addChild(node);
                node.getComponent(PayFirstChargeUi_1.default).init(uiAction);
            });
        }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVUlcXFVJTWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbUVBQThEO0FBQzlELDBDQUF5QztBQUV6QyxtRUFBOEQ7QUFDOUQsMkRBQXNEO0FBQ3RELDhDQUF5QztBQUV6Qyx1REFBa0Q7QUFDbEQsaURBQTRDO0FBQzVDLHlEQUFvRDtBQUNwRCxtREFBOEM7QUFDOUMsNkNBQXdDO0FBQ3hDLHlEQUFvRDtBQUNwRCxpREFBNEM7QUFDNUMseURBQW9EO0FBQ3BELGdFQUEyRDtBQUMzRCxrREFBNkM7QUFFN0MsK0RBQTBEO0FBRzFELDJEQUFzRDtBQUN0RCx1REFBa0Q7QUFDbEQsdURBQWtEO0FBRWxELGlEQUE0QztBQUM1QywwREFBcUQ7QUFJckQsdURBQWtEO0FBWWxELHVDQUFrQztBQUVsQyx1Q0FBa0M7QUFNbEMsa0RBQTZDO0FBRTdDLG1DQUE4QjtBQUM5Qix1Q0FBdUY7QUFDdkYsNkNBQXdDO0FBQ3hDLHNEQUFxRDtBQUNyRCxvRUFBK0Q7QUFFL0Qsc0RBQWlEO0FBRWpEO0lBQUE7SUFLQSxDQUFDO0lBQUQsYUFBQztBQUFELENBTEEsQUFLQyxJQUFBO0FBTFksd0JBQU07QUFPYixJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUUxQztJQUErQiw2QkFBTTtJQUFyQztRQUFBLHFFQWlqREM7UUE5aURHLHFCQUFlLEdBQXdCLElBQUksQ0FBQztRQUM1QyxhQUFhO1FBQ0wsc0JBQWdCLEdBQTBCLElBQUksQ0FBQztRQWlMdkQsVUFBVTtRQUNWLGtCQUFZLEdBQWlCLElBQUksS0FBSyxFQUFFLENBQUM7UUFFekMsMkJBQXFCLEdBQVcsS0FBSyxDQUFDOztJQXczQzFDLENBQUM7a0JBampEWSxTQUFTO0lBTUoscUJBQVcsR0FBekI7UUFFSSxJQUFHLElBQUksQ0FBQyxT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UUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzVCO2lCQUFJO2dCQUNELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFDLFVBQUMsS0FBZTtvQkFDakMsSUFBSSxJQUFJLEdBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDL0IsS0FBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzdCLENBQUMsQ0FBQyxDQUFDO2FBQ047U0FDSjtJQUNMLENBQUM7O0lBOWlEYyxtQkFBUyxHQUFjLElBQUksQ0FBQztJQUZsQyxTQUFTO1FBRHJCLE9BQU87T0FDSyxTQUFTLENBaWpEckI7SUFBRCxnQkFBQztDQWpqREQsQUFpakRDLENBampEOEIsZ0JBQU0sR0FpakRwQztBQWpqRFksOEJBQVMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmF0dGxlUGFzc0hlbHBVaSBmcm9tIFwiLi4vQmF0dGxlUGFzcy9CYXR0bGVQYXNzSGVscFVpXCI7XHJcbmltcG9ydCB7IEdhbWVTY2VuZSB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgRXF1aXBUeXBlIH0gZnJvbSBcIi4uL0VxdWlwbWVudC9FcXVpcENvbmZpZ1wiO1xyXG5pbXBvcnQgRXF1aXBFeGNoYW5nZVVpIGZyb20gXCIuLi9FcXVpcG1lbnQvVWkvRXF1aXBFeGNoYW5nZVVpXCI7XHJcbmltcG9ydCBFcXVpcEluZm9VaSBmcm9tIFwiLi4vRXF1aXBtZW50L1VpL0VxdWlwSW5mb1VpXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgSGVyb19UeXBlIH0gZnJvbSBcIi4uL0hlcm8vR2FtZS9IZXJvQ29uZmlnXCI7XHJcbmltcG9ydCBIZWFsaW5nUG90aW9uIGZyb20gXCIuLi9NYXplL0hlYWxpbmdQb3Rpb25cIjtcclxuaW1wb3J0IE1hemVCdWZmVWkgZnJvbSBcIi4uL01hemUvTWF6ZUJ1ZmZVaVwiO1xyXG5pbXBvcnQgTWF6ZUZpZ2h0aW5nVWkgZnJvbSBcIi4uL01hemUvTWF6ZUZpZ2h0aW5nVWlcIjtcclxuaW1wb3J0IE1hemVMZWFzZVVpIGZyb20gXCIuLi9NYXplL01hemVMZWFzZVVpXCI7XHJcbmltcG9ydCBNYXplU2hvcCBmcm9tIFwiLi4vTWF6ZS9NYXplU2hvcFwiO1xyXG5pbXBvcnQgTWF6ZVNob3dCdWZmVWkgZnJvbSBcIi4uL01hemUvTWF6ZVNob3dCdWZmVWlcIjtcclxuaW1wb3J0IE1hemVUb29sVWkgZnJvbSBcIi4uL01hemUvTWF6ZVRvb2xVaVwiO1xyXG5pbXBvcnQgTWF6ZVdhbGxJbmZvVWkgZnJvbSBcIi4uL01hemUvTWF6ZVdhbGxJbmZvVWlcIjtcclxuaW1wb3J0IFBheUZpcnN0Q2hhcmdlVWkgZnJvbSBcIi4uL1BheW1lbnQvUGF5Rmlyc3RDaGFyZ2VVaVwiO1xyXG5pbXBvcnQgUGF5bWVudFVpIGZyb20gXCIuLi9QYXltZW50L1BheW1lbnRVaVwiO1xyXG5pbXBvcnQgeyBQZXRJbmZvIH0gZnJvbSBcIi4uL1BldC9QZXRDb25maWdcIjtcclxuaW1wb3J0IFBldEFkdmFuY2VTaG93VWkgZnJvbSBcIi4uL1BldC9VaS9QZXRBZHZhbmNlU2hvd1VpXCI7XHJcbi8vIGltcG9ydCBQZXRBZHZhbmNlVWkgZnJvbSBcIi4uL1BldC9VaS9QZXRBZHZhbmNlVWlcIjtcclxuaW1wb3J0IFBldEV4Y2hhbmdlVWkgZnJvbSBcIi4uL1BldC9VaS9QZXRFeGNoYW5nZVVpXCI7XHJcbmltcG9ydCBQZXRSZWR1Y3Rpb25VaSBmcm9tIFwiLi4vUGV0L1VpL1BldFJlZHVjdGlvblVpXCI7XHJcbmltcG9ydCBQZXRTZXRGcmVlVWkgZnJvbSBcIi4uL1BldC9VaS9QZXRTZXRGcmVlVWlcIjtcclxuaW1wb3J0IFBldFVwZ3JhZGVVaSBmcm9tIFwiLi4vUGV0L1VpL1BldFVwZ3JhZGVVaVwiO1xyXG5pbXBvcnQgeyBQcm9wQWN0aW9uLCBQcm9wRGF0YSwgUHJvcElkIH0gZnJvbSBcIi4uL1Byb3AvUHJvcENvbmZpZ1wiO1xyXG5pbXBvcnQgUHJvcEluZm9VaSBmcm9tIFwiLi4vUHJvcC9Qcm9wSW5mb1VpXCI7XHJcbmltcG9ydCB7IFNvdW5kSW5kZXggfSBmcm9tIFwiLi4vU291bmQvQXVkaW9Db25zdGFudHNcIjtcclxuaW1wb3J0IFRvd2VyRmlnaHRpbmdVaSBmcm9tIFwiLi4vVG93ZXIvVG93ZXJGaWdodGluZ1VpXCI7XHJcbi8vIGltcG9ydCBXaXNoaW5nVGlwVWkgZnJvbSBcIi4uL1dpc2gvV2lzaGluZ1RpcFVpXCI7XHJcbmltcG9ydCBXaXNoaW5nVWksIHsgV2lzaGluZ1N0YXRlIH0gZnJvbSBcIi4uL1dpc2gvV2lzaGluZ1VpXCI7XHJcbmltcG9ydCBDb25zdW1wdGlvblRpcFVpIGZyb20gXCIuL0NvbnN1bXB0aW9uVGlwVWlcIjtcclxuaW1wb3J0IEF0cnJpYnV0ZVVpIGZyb20gXCIuL2hvbWUvQXRycmlidXRlVWlcIjtcclxuaW1wb3J0IEF2YXRhclVpIGZyb20gXCIuL2hvbWUvQXZhdGFyVWlcIjtcclxuaW1wb3J0IEJhZ1VpIGZyb20gXCIuL2hvbWUvQmFnVWlcIjtcclxuaW1wb3J0IEV4Y2x1c2l2ZVdlYXBvbnNTdHJlbmd0aGVuaW5nVWkgZnJvbSBcIi4uL0hlcm8vVWkvRXhjbHVzaXZlV2VhcG9uc1N0cmVuZ3RoZW5pbmdVaVwiO1xyXG5pbXBvcnQgR29sZE1hbGxVaSBmcm9tIFwiLi9ob21lL0dvbGRNYWxsVWlcIjtcclxuaW1wb3J0IE1lcmdlVWkgZnJvbSBcIi4uL0VxdWlwbWVudC9VaS9NZXJnZVVpXCI7XHJcbmltcG9ydCBTZXR0aW5nVWkgZnJvbSBcIi4vaG9tZS9TZXR0aW5nVWlcIjtcclxuaW1wb3J0IFNpZ25VaSBmcm9tIFwiLi9ob21lL1NpZ25VaVwiO1xyXG5pbXBvcnQgU2lnblVpRGFpbHkgZnJvbSBcIi4vaG9tZS9TaWduVWlEYWlseVwiO1xyXG5pbXBvcnQgVGFrZUVnZ1VpLCB7IFRha2VFZ2dTdGF0ZSB9IGZyb20gXCIuLi9UYWtlRWdnL1Rha2VFZ2dVaVwiO1xyXG5pbXBvcnQgVG9QbGF5TWFpblVpIGZyb20gXCIuL2hvbWUvVG9QbGF5TWFpblVpXCI7XHJcbmltcG9ydCBUZXh0SW5mbyBmcm9tIFwiLi9UZXh0SW5mb1wiO1xyXG5pbXBvcnQgeyBVaUFjdGlvbiwgVWlBZGRSZXN1bHQgfSBmcm9tIFwiLi9VaUludGVyZmFjZVwiO1xyXG5pbXBvcnQgVmlkZW9UaXAgZnJvbSBcIi4vVmlkZW9UaXBcIjtcclxuaW1wb3J0IFZpcFVpIGZyb20gXCIuL1ZpcFVpXCI7XHJcbmltcG9ydCBGYXN0R3VhSmlVaSBmcm9tIFwiLi4vR3VhSmkvVWkvRmFzdEd1YUppVWlcIjtcclxuaW1wb3J0IE9mZmxpbmVVaSBmcm9tIFwiLi4vR3VhSmkvVWkvT2ZmbGluZVVpXCI7XHJcbmltcG9ydCBUYXNrVWkgZnJvbSBcIi4uL1Rhc2svVGFza1VpXCI7XHJcbmltcG9ydCBFeGNsdXNpdmVXZWFwb25zVWkgZnJvbSBcIi4uL0hlcm8vVWkvRXhjbHVzaXZlV2VhcG9uc1VpXCI7XHJcbmltcG9ydCBHZXRIZXJvVWkgZnJvbSBcIi4uL0hlcm8vVWkvR2V0SGVyb1VpXCI7XHJcbmltcG9ydCBIZXJvU2tpbGxVaSBmcm9tIFwiLi4vSGVyby9VaS9IZXJvU2tpbGxVaVwiO1xyXG5pbXBvcnQgVUlQb29sIGZyb20gXCIuL1VJUG9vbFwiO1xyXG5pbXBvcnQgeyBHYW1lUHJlTG9hZCwgSG9tZVByZUxvYWQsIFVJTGF5ZXJMZXZlbCwgVUlQYXRoLCBVSV9aSW5kZXggfSBmcm9tIFwiLi9VSUNvbmZpZ1wiO1xyXG5pbXBvcnQgVUlDb21wb25lbnQgZnJvbSBcIi4vVUlDb21wb25lbnRcIjtcclxuaW1wb3J0IHsgSHR0cE1hbmFnZXIgfSBmcm9tIFwiLi4vTmV0V29yay9IdHRwTWFuYWdlclwiO1xyXG5pbXBvcnQgTGFuZ3VhZ2VNYW5hZ2VyIGZyb20gXCIuLi9tdWx0aUxhbmd1YWdlL0xhbmd1YWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBIZXJvRGF0YSB9IGZyb20gXCIuLi9IZXJvL0RhdGEvSGVyb0RhdGFcIjtcclxuaW1wb3J0IENvbWJhdE51bUVmZmVjdCBmcm9tIFwiLi4vQ29tYmF0TnVtRWZmZWN0XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ29tYmF0e1xyXG4gICAgb2xkSGVyb0RhdGE6SGVyb0RhdGE7XHJcbiAgICBuZXdIZXJvRGF0YTpIZXJvRGF0YTtcclxuICAgIG9sZENvbWJhdE51bTpudW1iZXI7XHJcbiAgICBuZXdDb21iYXROdW06bnVtYmVyO1xyXG59XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuQGNjY2xhc3NcclxuZXhwb3J0IGNsYXNzIFVJTWFuYWdlciBleHRlbmRzIFVJUG9vbCAge1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogVUlNYW5hZ2VyID0gbnVsbDtcclxuICAgIG1hcF9wcmVmYWJzX29sZDogTWFwPHN0cmluZyxjYy5QcmVmYWI+PW51bGw7XHJcbiAgICAvKirlvZPliY3mmL7npLrnmoR1aSAqL1xyXG4gICAgcHJpdmF0ZSBjdXJfc2hvd191aV9wYXRoOk1hcDxVSUxheWVyTGV2ZWwsc3RyaW5nPj1udWxsO1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOlVJTWFuYWdlclxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuX2luc3RhbmNlPT1udWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IG5vZGU9bmV3IGNjLk5vZGUoKTtcclxuICAgICAgICAgICAgY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKS5nZXRDaGlsZEJ5TmFtZShcIkNhbnZhc1wiKS5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2U9bm9kZS5hZGRDb21wb25lbnQoVUlNYW5hZ2VyKTtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlVJTWFuYWdlciA9IG51bGwhXCIpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiVWlNYW5hZ2Vyb25cIik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgVUlNYW5hZ2VyLl9pbnN0YW5jZT10aGlzO1xyXG4gICAgICAgIHRoaXMubWFwX3ByZWZhYnNfb2xkPW5ldyBNYXA8c3RyaW5nLGNjLlByZWZhYj4oKTtcclxuICAgICAgICB0aGlzLmluaXRVaSgpOyAgICAgICAgICAgICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgc3RhcnQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jdXJfc2hvd191aV9wYXRoPW5ldyBNYXA8VUlMYXllckxldmVsLHN0cmluZz4oKTsgICAgIFxyXG4gICAgICAgIHRoaXMucGVybG9hZFVpKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICBVSU1hbmFnZXIuX2luc3RhbmNlPW51bGw7XHJcbiAgICAgICAgaWYodGhpcy5tYXBfcHJlZmFic19vbGQpe1xyXG4gICAgICAgICAgICAvLyB0aGlzLm1hcF9wcmVmYWJzLmZvckVhY2goKHYsayk9PntcclxuICAgICAgICAgICAgLy8gICAgIC8vdi5kZWNSZWYoKTsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIH0pO1xyXG4gICAgICAgICAgICB0aGlzLm1hcF9wcmVmYWJzX29sZD1udWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwZXJsb2FkVWkoKXtcclxuICAgICAgICBzd2l0Y2goR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zY2VuZSl7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZVNjZW5lLmhvbWU6e1xyXG4gICAgICAgICAgICAgICAgSG9tZVByZUxvYWQuZm9yRWFjaCgodixrKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIHN1cGVyLmFkZE5vZGVQb29sKHYsMSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZVNjZW5lLmdhbWU6e1xyXG4gICAgICAgICAgICAgICAgR2FtZVByZUxvYWQuZm9yRWFjaCgodixrKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIHN1cGVyLmFkZE5vZGVQb29sKHYsMSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByZWxvYWRVaUJ5UGF0aCh1aVBhdGg6VUlQYXRoKXtcclxuICAgICAgICBzdXBlci5hZGROb2RlUG9vbCh1aVBhdGgsMSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq57uf5LiA5L2/55So5Yqg6L295pa55rOVICovXHJcbiAgICBwcml2YXRlIGxvYWRQcmVmYWIocGF0aDpzdHJpbmcsb25Db21wbGV0ZTooYXNzZXQ6IGNjLlByZWZhYikgPT4gdm9pZCl7XHJcbiAgICAgICAgbGV0IHByZWZhYj10aGlzLm1hcF9wcmVmYWJzX29sZC5nZXQocGF0aCk7XHJcbiAgICAgICAgaWYoIXByZWZhYil7XHJcbiAgICAgICAgICAgIGNjLnJlc291cmNlcy5sb2FkKHBhdGgsY2MuUHJlZmFiLChlcnJvcjogRXJyb3IsIGFzc2V0czpjYy5QcmVmYWIpPT57ICBcclxuICAgICAgICAgICAgICAgIGlmKGVycm9yKXtcclxuICAgICAgICAgICAgICAgICAgICBjYy5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKHRoaXMubWFwX3ByZWZhYnNfb2xkKXtcclxuICAgICAgICAgICAgICAgICAgICAvL2Fzc2V0cy5hZGRSZWYoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcF9wcmVmYWJzX29sZC5zZXQocGF0aCxhc3NldHMpO1xyXG4gICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGUoYXNzZXRzKTtcclxuICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFByZWZhYihwYXRoOnN0cmluZyk6Y2MuUHJlZmFie1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1hcF9wcmVmYWJzX29sZC5nZXQocGF0aCk7XHJcbiAgICB9XHJcbiAgICAvKirlnKjlnLrmma/liIfmjaLmiJDlip/lkI7lj6/ku6XosIPnlKggKi9cclxuICAgIHB1YmxpYyBwcmVsb2FkUHJlZmFiKHBhdGg6c3RyaW5nKXsgICAgICAgIFxyXG4gICAgICAgIGxldCBwcmVmYWI9dGhpcy5tYXBfcHJlZmFic19vbGQuZ2V0KHBhdGgpO1xyXG4gICAgICAgIGlmKCFwcmVmYWIpe1xyXG4gICAgICAgICAgICBjYy5yZXNvdXJjZXMubG9hZChwYXRoLGNjLlByZWZhYiwoZXJyb3I6IEVycm9yLCBhc3NldHM6Y2MuUHJlZmFiKT0+eyAgXHJcbiAgICAgICAgICAgICAgICBpZihlcnJvcil7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5tYXBfcHJlZmFic19vbGQpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vYXNzZXRzLmFkZFJlZigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFwX3ByZWZhYnNfb2xkLnNldChwYXRoLGFzc2V0cyk7ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpbml0VWkoKXtcclxuICAgICAgICB0aGlzLmdldExvYWRpbmdOb2RlKCkuekluZGV4PVVJX1pJbmRleC5Mb2FkaW5nO1xyXG4gICAgICAgIHRoaXMuZ2V0VG91Y2hOb2RlKCkuekluZGV4PVVJX1pJbmRleC5VaVRvdWNoO1xyXG4gICAgfVxyXG4vLyAvKirmoLnmja5pZOiOt+W+l+S4gOS4quWvueixoeiKgueCuSovXHJcbi8vICAgICBnZXROb2RlQnlJZChwYXRoSWQ6c3RyaW5nKTpjYy5Ob2RlXHJcbi8vICAgICB7XHJcbi8vICAgICAgICAgcmV0dXJuIHN1cGVyLmdldE5vZGVCeUlkKHBhdGhJZCk7XHJcbi8vICAgICB9XHJcbi8vIC8qKuagueaNrmlk5Yig6Zmk5LiA5Liq5a+56LGh6IqC54K5Ki9cclxuLy8gICAgIGRlc3Ryb3lOb2RlKHBhdGhJZDpzdHJpbmcsbm9kZTpjYy5Ob2RlKVxyXG4vLyAgICAge1xyXG4vLyAgICAgICAgIHN1cGVyLmdldE5vZGVCeUlkKHBhdGhJZCxub2RlKTtcclxuLy8gICAgIH1cclxuICAgIC8qKuiOt+WPluWKoOi9veeVjOmdoueahOiKgueCuSAqL1xyXG4gICAgZ2V0TG9hZGluZ05vZGUoKTpjYy5Ob2Rle1xyXG4gICAgICAgIHJldHVybiB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2JnX2xvYWRpbmcnKVxyXG4gICAgfVxyXG4gICAgLyoq6I635Y+W6Kem5pG455qE6IqC54K5ICovXHJcbiAgICBnZXRUb3VjaE5vZGUoKTpjYy5Ob2Rle1xyXG4gICAgICAgIHJldHVybiB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3VpVG91Y2gnKVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDmmL7npLrkuIDkuKpVSeW8ueeql1xyXG4gICAgICogQHBhcmFtIHVpUGF0aCDor6V1aeeahHJlc291cmNlc+i3r+W+hFxyXG4gICAgICogQHBhcmFtIGxheWVyTGV2ZWwgdWnlsYLnuqfvvIznlKjkuo7liKTmlq3lkIzkuIDlsYLnuqfkuI3og73ph43lpI3mt7vliqDlpJrkuKrlvLnnqpfnmoTmoIflv5dcclxuICAgICAqIEBwYXJhbSByZXN1bHQg5pys5qyhdWnmmL7npLrnmoTnu5PmnpzvvIzlpoLmnpzmiJDlip/mt7vliqDvvIzliJnlnKhvbkNvbXBsZXRlZOS4rei/lOWbnuivpeiKgueCue+8jOWQpuWImeWbnuiwg+iHs29uRmFpbFxyXG4gICAgICovXHJcbiAgICBzaG93VWlEaWFsb2codWlQYXRoOnN0cmluZyxsYXllckxldmVsOlVJTGF5ZXJMZXZlbCxyZXN1bHQ6VWlBZGRSZXN1bHQsekluZGV4OlVJX1pJbmRleD1VSV9aSW5kZXguTm9ybWFsKXtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIl9fX19fX19fXzFcIilcclxuICAgICAgICBpZih0aGlzLmN1cl9zaG93X3VpX3BhdGguaGFzKGxheWVyTGV2ZWwpJiZ0aGlzLmN1cl9zaG93X3VpX3BhdGguZ2V0KGxheWVyTGV2ZWwpIT1VSVBhdGguTnVsbCl7XHJcbiAgICAgICAgICAgIGlmKHJlc3VsdC5vbkZhaWwpXHJcbiAgICAgICAgICAgICAgICByZXN1bHQub25GYWlsKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXRDdXJTaG93VWkodWlQYXRoLGxheWVyTGV2ZWwpO1xyXG4gICAgICAgIGxldCBub2RlPXN1cGVyLmdldE5vZGVCeUlkKHVpUGF0aCk7XHJcbiAgICAgICAgaWYobm9kZSl7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTsgICAgICAgICAgICBcclxuICAgICAgICAgICAgbm9kZS56SW5kZXg9ekluZGV4O1xyXG4gICAgICAgICAgICByZXN1bHQub25Db21wbGV0ZWQobm9kZSk7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFVJQ29tcG9uZW50KS5pbml0VWlEYXRhKHVpUGF0aCxsYXllckxldmVsKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgc3VwZXIuYWRkTm9kZVBvb2wodWlQYXRoLDEsKG5vZGU6Y2MuTm9kZSk9PntcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBub2RlLnpJbmRleD16SW5kZXg7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQub25Db21wbGV0ZWQobm9kZSk7XHJcbiAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChVSUNvbXBvbmVudCkuaW5pdFVpRGF0YSh1aVBhdGgsbGF5ZXJMZXZlbCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoq5pi+56S65LiA5Liq54m55pWIKOmqqOmqvOWKqOeUuynvvIzliJvlu7rlh7rmnaXnmoToioLngrnlsIbpgJrov4flm57osIPlh73mlbByZXN1bHTmjqXlj5cgKi9cclxuICAgIHNob3dFZmZlY3REaWFsb2codWlQYXRoOnN0cmluZyxwYXJlbnQ6Y2MuTm9kZSxhbmltYXRpb25OYW1lOnN0cmluZyl7XHJcbiAgICAgICAgbGV0IG5vZGU9c3VwZXIuZ2V0Tm9kZUJ5SWQodWlQYXRoKTtcclxuICAgICAgICBpZihub2RlKXtcclxuICAgICAgICAgICAgLy8gdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgICAgICBwYXJlbnQuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgIGxldCBzcGluZSA9IG5vZGUuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcclxuICAgICAgICAgICAgbGV0IHRyYWNyID0gc3BpbmUuc2V0QW5pbWF0aW9uKDAsYW5pbWF0aW9uTmFtZSxmYWxzZSk7XHJcbiAgICAgICAgICAgIHNwaW5lLnNldENvbXBsZXRlTGlzdGVuZXIoKCk9PntcclxuICAgICAgICAgICAgICAgIHNwaW5lLnNldENvbXBsZXRlTGlzdGVuZXIobnVsbCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGVFZmZlY3REaWFsb2codWlQYXRoLG5vZGUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy8gcmVzdWx0Lm9uQ29tcGxldGVkKG5vZGUpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBzdXBlci5hZGROb2RlUG9vbCh1aVBhdGgsMSwobm9kZTpjYy5Ob2RlKT0+e1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgLy8gcmVzdWx0Lm9uQ29tcGxldGVkKG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgcGFyZW50LmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHNwaW5lID0gbm9kZS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pO1xyXG4gICAgICAgICAgICAgICAgbGV0IHRyYWNyID0gc3BpbmUuc2V0QW5pbWF0aW9uKDAsYW5pbWF0aW9uTmFtZSxmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBzcGluZS5zZXRDb21wbGV0ZUxpc3RlbmVyKCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgc3BpbmUuc2V0Q29tcGxldGVMaXN0ZW5lcihudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGVFZmZlY3REaWFsb2codWlQYXRoLG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKuWbnuaUtuS4gOS4queJueaViOiKgueCuSAqL1xyXG4gICAgaGlkZUVmZmVjdERpYWxvZyh1aVBhdGg6c3RyaW5nLG5vZGU6Y2MuTm9kZSl7XHJcbiAgICAgICAgc3VwZXIuZGVzdHJveU5vZGUodWlQYXRoLG5vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOaImOaWl+WKm+WPmOWMlumYn+WIl1xyXG4gICAgY29tYmF0X3F1ZXVlOkFycmF5PENvbWJhdD4gPSBuZXcgQXJyYXkoKTtcclxuXHJcbiAgICBpc19wbGF5X2NvbWJhdF9lZmZlY3Q6Ym9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIHN0YXJ0Q29tYmF0RWZmZWN0KCl7XHJcbiAgICAgICAgbGV0IGNvbWJhdCA9IHRoaXMuY29tYmF0X3F1ZXVlLnNoaWZ0KCk7XHJcbiAgICAgICAgbGV0IGNvbWJhdFVpID0gY2MuZmluZChcIkNhbnZhcy9VaV9Sb290L1poYW5Eb3VMaVwiKVxyXG4gICAgICAgIGNvbWJhdFVpLnpJbmRleCA9IFVJX1pJbmRleC5Gcm9udDtcclxuICAgICAgICAvLyBjb21iYXRVaS5nZXRDb21wb25lbnQoQ29tYmF0TnVtRWZmZWN0KS5zdGFydEFuaW1hdGlvbihjb21iYXQub2xkQ29tYmF0TnVtLGNvbWJhdC5uZXdDb21iYXROdW0sY29tYmF0Lm9sZEhlcm9EYXRhLGNvbWJhdC5uZXdIZXJvRGF0YSwoKT0+e1xyXG4gICAgICAgIC8vICAgICBpZih0aGlzLmNvbWJhdF9xdWV1ZS5sZW5ndGggIT0gMCl7XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLnN0YXJ0Q29tYmF0RWZmZWN0KCk7XHJcbiAgICAgICAgLy8gICAgIH1lbHNle1xyXG4gICAgICAgIC8vICAgICAgICAgY29tYmF0VWkuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLmlzX3BsYXlfY29tYmF0X2VmZmVjdCA9IGZhbHNlO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgY29tYmF0VWkuZ2V0Q29tcG9uZW50KENvbWJhdE51bUVmZmVjdCkuc3RhcnRBbmltYXRpb24oY29tYmF0Lm9sZENvbWJhdE51bSxjb21iYXQubmV3Q29tYmF0TnVtLGNvbWJhdC5vbGRIZXJvRGF0YSxjb21iYXQubmV3SGVyb0RhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dDb21iYXRDaGFuZ2VFZmZlY3Qob2xkQ29tYmF0TnVtOm51bWJlcixuZXdDb21iYXROdW06bnVtYmVyLG9sZEhlcm9EYXRhOkhlcm9EYXRhLG5ld0hlcm9EYXRhOkhlcm9EYXRhKXtcclxuICAgICAgICBsZXQgY29tYmF0OkNvbWJhdCA9IG5ldyBDb21iYXQoKTtcclxuICAgICAgICBjb21iYXQub2xkSGVyb0RhdGEgPSBvbGRIZXJvRGF0YTtcclxuICAgICAgICBjb21iYXQubmV3SGVyb0RhdGEgPSBuZXdIZXJvRGF0YTtcclxuICAgICAgICBjb21iYXQub2xkQ29tYmF0TnVtID0gb2xkQ29tYmF0TnVtO1xyXG4gICAgICAgIGNvbWJhdC5uZXdDb21iYXROdW0gPSBuZXdDb21iYXROdW07XHJcblxyXG4gICAgICAgIGxldCBjb21iYXRVaSA9IGNjLmZpbmQoXCJDYW52YXMvVWlfUm9vdC9aaGFuRG91TGlcIik7XHJcbiAgICAgICAgY29tYmF0VWkuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBjb21iYXRVaS56SW5kZXggPSBVSV9aSW5kZXguRnJvbnQ7XHJcbiAgICAgICAgY29tYmF0VWkuZ2V0Q29tcG9uZW50KENvbWJhdE51bUVmZmVjdCkuc3RhcnRBbmltYXRpb24oY29tYmF0Lm9sZENvbWJhdE51bSxjb21iYXQubmV3Q29tYmF0TnVtLGNvbWJhdC5vbGRIZXJvRGF0YSxjb21iYXQubmV3SGVyb0RhdGEpO1xyXG4gICAgICAgIC8vIHRoaXMuY29tYmF0X3F1ZXVlLnB1c2goY29tYmF0KTtcclxuXHJcbiAgICAgICAgLy8gaWYodGhpcy5pc19wbGF5X2NvbWJhdF9lZmZlY3QgPT0gZmFsc2Upe1xyXG4gICAgICAgIC8vICAgICBsZXQgY29tYmF0VWkgPSBjYy5maW5kKFwiQ2FudmFzL1VpX1Jvb3QvWmhhbkRvdUxpXCIpO1xyXG4gICAgICAgIC8vICAgICBjb21iYXRVaS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIC8vICAgICB0aGlzLmlzX3BsYXlfY29tYmF0X2VmZmVjdCA9IHRydWU7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuc3RhcnRDb21iYXRFZmZlY3QoKTtcclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmmL7npLrnvZHnu5zor7fmsYJVSeW8ueeql1xyXG4gICAgICovXHJcbiAgICAgc2hvd1dhaXRVaURpYWxvZygpe1xyXG4gICAgICAgbGV0IHdhaXQgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ3YWl0X3VpXCIpO1xyXG4gICAgICAgd2FpdC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgd2FpdC5jaGlsZHJlblswXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgd2FpdC5jaGlsZHJlblsxXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgIHdhaXQuY2hpbGRyZW5bMl0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICB3YWl0LnpJbmRleCA9IFVJX1pJbmRleC5Gcm9udDtcclxuICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgICAgIHdhaXQuY2hpbGRyZW5bMV0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgd2FpdC5jaGlsZHJlblsyXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgfSwwLjIpO1xyXG4gICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgaWYoIUh0dHBNYW5hZ2VyLmlzU3VjY2Vzc1Jlcyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlV2FpdFVpRGlhbG9nKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgcyA9IExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDEwMDExMik7XHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKHMpO1xyXG4gICAgICAgICAgICAgICAgSHR0cE1hbmFnZXIuaXNTdWNjZXNzUmVzID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgfSw1KTtcclxuICAgIH1cclxuXHJcbiAgICBjbG9zZVdhaXRVaURpYWxvZygpe1xyXG4gICAgICAgIGxldCB1aT10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ3YWl0X3VpXCIpO1xyXG4gICAgICAgIGlmKHVpKXtcclxuICAgICAgICAgICAgdWkuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNob3dQYXlXYWl0aW5nVWkoKXtcclxuICAgICAgICBsZXQgd2FpdCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIndhaXRfdWlcIik7XHJcbiAgICAgICAgd2FpdC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHdhaXQuY2hpbGRyZW5bMF0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB3YWl0LmNoaWxkcmVuWzFdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgd2FpdC5jaGlsZHJlblsyXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHdhaXQuekluZGV4ID0gVUlfWkluZGV4LkZyb250O1xyXG4gICAgIH1cclxuIFxyXG4gICAgIGNsb3NlUGF5V2FpdGluZ1VpKCl7XHJcbiAgICAgICAgIGxldCB1aT10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ3YWl0X3VpXCIpO1xyXG4gICAgICAgICBpZih1aSl7XHJcbiAgICAgICAgICAgICB1aS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgfVxyXG4gICAgIH1cclxuXHJcbiAgICBjbG9zZVVpRGlhbG9nKHVpUGF0aDpzdHJpbmcsbGF5ZXJMZXZlbDpVSUxheWVyTGV2ZWwsbm9kZTpjYy5Ob2RlKXsgICAgICAgIFxyXG4gICAgICAgIC8v5YWz6Zet5pe26K6+572u5Li6bnVsbFxyXG4gICAgICAgIHRoaXMuc2V0Q3VyU2hvd1VpKFVJUGF0aC5OdWxsLGxheWVyTGV2ZWwpO1xyXG4gICAgICAgIHN1cGVyLmRlc3Ryb3lOb2RlKHVpUGF0aCxub2RlKTtcclxuICAgICAgICBpZih1aVBhdGg9PVVJUGF0aC5OdWxsKXtcclxuICAgICAgICAgICAgbm9kZS5yZW1vdmVGcm9tUGFyZW50KGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKirlhbPpl63miYDmnIlsYXllckxldmVs5bGC57qn5Lul5LiK55qE55qE5by556qXICovXHJcbiAgICBjbG9zZUFsbFVpRGlhbG9nKGxheWVyTGV2ZWw6VUlMYXllckxldmVsKXsgICAgICAgIFxyXG4gICAgICAgIHRoaXMuY3VyX3Nob3dfdWlfcGF0aC5mb3JFYWNoKCh2LGspPT57XHJcbiAgICAgICAgICAgIGlmKGs+PWxheWVyTGV2ZWwpe1xyXG4gICAgICAgICAgICAgICAgbGV0IG5hbWVJbmRleD12Lmxhc3RJbmRleE9mKCcvJylcclxuICAgICAgICAgICAgICAgIGlmKG5hbWVJbmRleCE9LTEpe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBuYW1lPXYuc3Vic3RyaW5nKG5hbWVJbmRleCsxKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbm9kZT10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUobmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYobm9kZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB1aT1ub2RlLmdldENvbXBvbmVudChVSUNvbXBvbmVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHVpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVpLm9uQ2xvc2UoKTsgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgc2V0Q3VyU2hvd1VpKHVpUGF0aDpzdHJpbmcsbGF5ZXJMZXZlbDpVSUxheWVyTGV2ZWwpe1xyXG4gICAgICAgIHRoaXMuY3VyX3Nob3dfdWlfcGF0aC5zZXQobGF5ZXJMZXZlbCx1aVBhdGgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEN1clNob3dVaShsYXllckxldmVsOlVJTGF5ZXJMZXZlbCk6c3RyaW5ne1xyXG4gICAgICAgIHJldHVybiB0aGlzLmN1cl9zaG93X3VpX3BhdGguZ2V0KGxheWVyTGV2ZWwpO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dUb3VjaEVmZmVjdChub2RlUG9zOmNjLlZlYzIpe1xyXG4gICAgICAgIGxldCBwYXRoPSd1aS91aV90b3VjaCc7XHJcbiAgICAgICAgbGV0IHByZWZhYj10aGlzLmdldFByZWZhYihwYXRoKTtcclxuICAgICAgICBpZihwcmVmYWIpe1xyXG4gICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShwcmVmYWIpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgIG5vZGUuekluZGV4PVVJX1pJbmRleC5VaVRvdWNoXHJcbiAgICAgICAgICAgIG5vZGUuc2V0UG9zaXRpb24obm9kZVBvcyk7XHJcbiAgICAgICAgICAgIGxldCBhbmltYT1ub2RlLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xyXG4gICAgICAgICAgICBsZXQgc3RhdGU9YW5pbWEucGxheSgpO1xyXG4gICAgICAgICAgICBzdGF0ZS5zcGVlZD0xL0dhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0R2FtZVJhdGUoKTtcclxuICAgICAgICAgICAgYW5pbWEub24oY2MuQW5pbWF0aW9uLkV2ZW50VHlwZS5GSU5JU0hFRCwoKT0+e1xyXG4gICAgICAgICAgICAgICAgbm9kZS5yZW1vdmVGcm9tUGFyZW50KCk7XHJcbiAgICAgICAgICAgIH0sdGhpcyk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFByZWZhYihwYXRoLChhc3NldDpjYy5QcmVmYWIpPT57XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShhc3NldCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgICAgICBub2RlLnpJbmRleD1VSV9aSW5kZXguVWlUb3VjaFxyXG4gICAgICAgICAgICAgICAgbm9kZS5zZXRQb3NpdGlvbihub2RlUG9zKTtcclxuICAgICAgICAgICAgICAgIGxldCBhbmltYT1ub2RlLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgbGV0IHN0YXRlPWFuaW1hLnBsYXkoKTtcclxuICAgICAgICAgICAgICAgIHN0YXRlLnNwZWVkPTEvR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRHYW1lUmF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgYW5pbWEub24oY2MuQW5pbWF0aW9uLkV2ZW50VHlwZS5GSU5JU0hFRCwoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgICAgICAgICAgICAgfSx0aGlzKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNob3dUZXh0SW5mbyh0aXRsZVRleHQ6c3RyaW5nLGNvbnRlbnRTdHI6c3RyaW5nKXtcclxuICAgICAgICBsZXQgcGF0aD0ndWkvaW5mby9pbmZvJztcclxuICAgICAgICBsZXQgcHJlZmFiPXRoaXMuZ2V0UHJlZmFiKHBhdGgpO1xyXG4gICAgICAgIGlmKHByZWZhYil7XHJcbiAgICAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKHByZWZhYik7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoVGV4dEluZm8pLnNob3dJbmZvKHRpdGxlVGV4dCxjb250ZW50U3RyKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5sb2FkUHJlZmFiKHBhdGgsKGFzc2V0OmNjLlByZWZhYik9PntcclxuICAgICAgICAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKGFzc2V0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFRleHRJbmZvKS5zaG93SW5mbyh0aXRsZVRleHQsY29udGVudFN0cik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLeWIm+W7uueJueaViC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgc2hvd0ppblNoZW5nMChwYXJlcnQ6Y2MuTm9kZSlcclxuICAgIHtcclxuICAgICAgICBsZXQgZ209R2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBpZihnbS5jdXJfZ2FtZV9zY2VuZT09R2FtZVNjZW5lLmhvbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgcGF0aD0nZWZmZWN0cy9ob21lL3JvbGVfc2hlbmdqaWUvcm9sZV9zaGVuZ2ppZV8wJztcclxuICAgICAgICAgICAgbGV0IHByZWZhYj10aGlzLmdldFByZWZhYihwYXRoKTtcclxuICAgICAgICAgICAgaWYocHJlZmFiKXtcclxuICAgICAgICAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKHByZWZhYik7XHJcbiAgICAgICAgICAgICAgICBub2RlLnBhcmVudD1wYXJlcnQ7ICAgIFxyXG4gICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5vbihjYy5BbmltYXRpb24uRXZlbnRUeXBlLkZJTklTSEVELCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5yZW1vdmVGcm9tUGFyZW50KCk7XHJcbiAgICAgICAgICAgICAgICB9LHRoaXMpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9hZFByZWZhYihwYXRoLChhc3NldDpjYy5QcmVmYWIpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUoYXNzZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUucGFyZW50PXBhcmVydDsgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5vbihjYy5BbmltYXRpb24uRXZlbnRUeXBlLkZJTklTSEVELCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sdGhpcyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzaG93SmluU2hlbmcxKHBhcmVydDpjYy5Ob2RlKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBnbT1HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIGlmKGdtLmN1cl9nYW1lX3NjZW5lPT1HYW1lU2NlbmUuaG9tZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCBwYXRoPSdlZmZlY3RzL2hvbWUvcm9sZV9zaGVuZ2ppZS9yb2xlX3NoZW5namllXzEnO1xyXG4gICAgICAgICAgICBsZXQgcHJlZmFiPXRoaXMuZ2V0UHJlZmFiKHBhdGgpO1xyXG4gICAgICAgICAgICBpZihwcmVmYWIpe1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUocHJlZmFiKTtcclxuICAgICAgICAgICAgICAgIG5vZGUucGFyZW50PXBhcmVydDsgICAgXHJcbiAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLm9uKGNjLkFuaW1hdGlvbi5FdmVudFR5cGUuRklOSVNIRUQsKCk9PntcclxuICAgICAgICAgICAgICAgICAgICBub2RlLnJlbW92ZUZyb21QYXJlbnQoKTtcclxuICAgICAgICAgICAgICAgIH0sdGhpcyk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkUHJlZmFiKHBhdGgsKGFzc2V0OmNjLlByZWZhYik9PntcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShhc3NldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5wYXJlbnQ9cGFyZXJ0OyAgICBcclxuICAgICAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLm9uKGNjLkFuaW1hdGlvbi5FdmVudFR5cGUuRklOSVNIRUQsKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5yZW1vdmVGcm9tUGFyZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSx0aGlzKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIHNob3dTaGVuZ0ppMChwYXJlcnQ6Y2MuTm9kZSxwb3M6Y2MuVmVjMilcclxuICAgIC8vIHtcclxuICAgIC8vICAgICBsZXQgZ209R2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgIC8vICAgICBpZihnbS5jdXJfZ2FtZV9zY2VuZT09R2FtZVNjZW5lLmhvbWUpXHJcbiAgICAvLyAgICAge1xyXG4gICAgLy8gICAgICAgICBsZXQgcGF0aD0nZWZmZWN0cy9ob21lL3JvbGVfdXBncmFkZS9yb2xlX3VwZ3JhZGVfMCc7XHJcbiAgICAvLyAgICAgICAgIGxldCBwcmVmYWI9dGhpcy5nZXRQcmVmYWIocGF0aCk7XHJcbiAgICAvLyAgICAgICAgIGlmKHByZWZhYil7XHJcbiAgICAvLyAgICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShwcmVmYWIpO1xyXG4gICAgLy8gICAgICAgICAgICAgbm9kZS5wYXJlbnQ9cGFyZXJ0O1xyXG4gICAgLy8gICAgICAgICAgICAgbm9kZS5zZXRQb3NpdGlvbihwb3MpO1xyXG4gICAgLy8gICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5vbihjYy5BbmltYXRpb24uRXZlbnRUeXBlLkZJTklTSEVELCgpPT57XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgbm9kZS5yZW1vdmVGcm9tUGFyZW50KCk7XHJcbiAgICAvLyAgICAgICAgICAgICB9LHRoaXMpO1xyXG4gICAgLy8gICAgICAgICAgICAgZ20uc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5ZWF9MZXZlbCk7XHJcbiAgICAvLyAgICAgICAgIH1lbHNle1xyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5sb2FkUHJlZmFiKHBhdGgsKGFzc2V0OmNjLlByZWZhYik9PntcclxuICAgIC8vICAgICAgICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShhc3NldCk7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgbm9kZS5wYXJlbnQ9cGFyZXJ0O1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIG5vZGUuc2V0UG9zaXRpb24ocG9zKTsgICBcclxuICAgIC8vICAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLm9uKGNjLkFuaW1hdGlvbi5FdmVudFR5cGUuRklOSVNIRUQsKCk9PntcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgbm9kZS5yZW1vdmVGcm9tUGFyZW50KCk7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgfSx0aGlzKTtcclxuICAgIC8vICAgICAgICAgICAgIH0pO1xyXG4gICAgLy8gICAgICAgICAgICAgZ20uc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5ZWF9MZXZlbCk7XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gc2hvd1NoZW5nSmkxKHBhcmVydDpjYy5Ob2RlLHBvczpjYy5WZWMyKVxyXG4gICAgLy8ge1xyXG4gICAgLy8gICAgIGxldCBnbT1HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgLy8gICAgIGlmKGdtLmN1cl9nYW1lX3NjZW5lPT1HYW1lU2NlbmUuaG9tZSlcclxuICAgIC8vICAgICB7XHJcbiAgICAvLyAgICAgICAgIGxldCBwYXRoPSdlZmZlY3RzL2hvbWUvcm9sZV91cGdyYWRlL3JvbGVfdXBncmFkZV8xJztcclxuICAgIC8vICAgICAgICAgbGV0IHByZWZhYj10aGlzLmdldFByZWZhYihwYXRoKTtcclxuICAgIC8vICAgICAgICAgaWYocHJlZmFiKXtcclxuICAgIC8vICAgICAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKHByZWZhYik7XHJcbiAgICAvLyAgICAgICAgICAgICBub2RlLnBhcmVudD1wYXJlcnQ7XHJcbiAgICAvLyAgICAgICAgICAgICBub2RlLnNldFBvc2l0aW9uKHBvcyk7XHJcbiAgICAvLyAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLm9uKGNjLkFuaW1hdGlvbi5FdmVudFR5cGUuRklOSVNIRUQsKCk9PntcclxuICAgIC8vICAgICAgICAgICAgICAgICBub2RlLnJlbW92ZUZyb21QYXJlbnQoKTtcclxuICAgIC8vICAgICAgICAgICAgIH0sdGhpcyk7XHJcbiAgICAvLyAgICAgICAgICAgICBnbS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LllYX0xldmVsKTtcclxuICAgIC8vICAgICAgICAgfWVsc2V7XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLmxvYWRQcmVmYWIocGF0aCwoYXNzZXQ6Y2MuUHJlZmFiKT0+e1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKGFzc2V0KTtcclxuICAgIC8vICAgICAgICAgICAgICAgICBub2RlLnBhcmVudD1wYXJlcnQ7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgbm9kZS5zZXRQb3NpdGlvbihwb3MpOyAgIFxyXG4gICAgLy8gICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikub24oY2MuQW5pbWF0aW9uLkV2ZW50VHlwZS5GSU5JU0hFRCwoKT0+e1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBub2RlLnJlbW92ZUZyb21QYXJlbnQoKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICB9LHRoaXMpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIGdtLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguWVhfTGV2ZWwpO1xyXG4gICAgLy8gICAgICAgICAgICAgfSk7XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9XHJcblxyXG5cclxuICAgIHNob3dSb2xlU3RhcihwYXJlcnQ6Y2MuTm9kZSxwb3M6Y2MuVmVjMil7XHJcbiAgICAgICAgbGV0IGdtPUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgaWYoZ20uY3VyX2dhbWVfc2NlbmU9PUdhbWVTY2VuZS5ob21lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IHBhdGg9J2VmZmVjdHMvaG9tZS9yb2xlX3N0YXIvcm9sZV9zdGFyJztcclxuICAgICAgICAgICAgbGV0IHByZWZhYj10aGlzLmdldFByZWZhYihwYXRoKTtcclxuICAgICAgICAgICAgaWYocHJlZmFiKXtcclxuICAgICAgICAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKHByZWZhYik7XHJcbiAgICAgICAgICAgICAgICBub2RlLnBhcmVudD1wYXJlcnQ7ICAgIFxyXG4gICAgICAgICAgICAgICAgbm9kZS5zZXRQb3NpdGlvbihwb3MpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5vbihjYy5BbmltYXRpb24uRXZlbnRUeXBlLkZJTklTSEVELCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5yZW1vdmVGcm9tUGFyZW50KCk7XHJcbiAgICAgICAgICAgICAgICB9LHRoaXMpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9hZFByZWZhYihwYXRoLChhc3NldDpjYy5QcmVmYWIpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUoYXNzZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUucGFyZW50PXBhcmVydDsgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5zZXRQb3NpdGlvbihwb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikub24oY2MuQW5pbWF0aW9uLkV2ZW50VHlwZS5GSU5JU0hFRCwoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLnJlbW92ZUZyb21QYXJlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9LHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1poYW5Eb3VsaShwYXJlcnQ6Y2MuTm9kZSxwb3M6Y2MuVmVjMil7XHJcbiAgICAgICAgbGV0IGdtPUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgaWYoZ20uY3VyX2dhbWVfc2NlbmU9PUdhbWVTY2VuZS5ob21lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IHBhdGg9J2VmZmVjdHMvaG9tZS9yb2xlX3poYW5kb3VsaS9yb2xlX3poYW5kb3VsaSc7XHJcbiAgICAgICAgICAgIGxldCBwcmVmYWI9dGhpcy5nZXRQcmVmYWIocGF0aCk7XHJcbiAgICAgICAgICAgIGlmKHByZWZhYil7XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShwcmVmYWIpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5wYXJlbnQ9cGFyZXJ0OyAgICBcclxuICAgICAgICAgICAgICAgIG5vZGUuc2V0UG9zaXRpb24ocG9zKTtcclxuICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikub24oY2MuQW5pbWF0aW9uLkV2ZW50VHlwZS5GSU5JU0hFRCwoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgICAgICAgICAgICAgfSx0aGlzKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRQcmVmYWIocGF0aCwoYXNzZXQ6Y2MuUHJlZmFiKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKGFzc2V0KTtcclxuICAgICAgICAgICAgICAgICAgICBub2RlLnBhcmVudD1wYXJlcnQ7ICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUuc2V0UG9zaXRpb24ocG9zKTtcclxuICAgICAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLm9uKGNjLkFuaW1hdGlvbi5FdmVudFR5cGUuRklOSVNIRUQsKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5yZW1vdmVGcm9tUGFyZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSx0aGlzKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBzaG93V2FsbFVwZ3JhZGUocGFyZW50OmNjLk5vZGUpe1xyXG4gICAgICAgIGxldCBwYXRoPSdlZmZlY3RzL2hvbWUvd2FsbF91cGdyYWRlL3dhbGxfdXBncmFkZSc7XHJcbiAgICAgICAgbGV0IHByZWZhYj10aGlzLmdldFByZWZhYihwYXRoKTtcclxuICAgICAgICBpZihwcmVmYWIpe1xyXG4gICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShwcmVmYWIpO1xyXG4gICAgICAgICAgICBub2RlLnBhcmVudD1wYXJlbnQ7ICAgIFxyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLm9uKGNjLkFuaW1hdGlvbi5FdmVudFR5cGUuRklOSVNIRUQsKCk9PntcclxuICAgICAgICAgICAgICAgIG5vZGUucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgICAgICAgICB9LHRoaXMpO1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguWVhfTGV2ZWwpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRQcmVmYWIocGF0aCwoYXNzZXQ6Y2MuUHJlZmFiKT0+e1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUoYXNzZXQpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5wYXJlbnQ9cGFyZW50OyAgICBcclxuICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikub24oY2MuQW5pbWF0aW9uLkV2ZW50VHlwZS5GSU5JU0hFRCwoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgICAgICAgICAgICAgfSx0aGlzKTtcclxuICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5ZWF9MZXZlbCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKuaYvuekuumhtemdoioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuXHJcbiAgICBzaG93RXF1aXBJbmZvVWkoaGVyb1R5cGU6SGVyb19UeXBlLGVxdWlwSWQ6bnVtYmVyLHBhOlByb3BBY3Rpb24scGQ6UHJvcERhdGEsYnV5Q2FsbGJhY2s6RnVuY3Rpb24sdXNlQ2FsbGJhY2s6RnVuY3Rpb24pe1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBwYXRoPSdlcXVpcG1lbnQvZXF1aXBfaW5mb191aSdcclxuICAgICAgICB0aGlzLnNob3dVaURpYWxvZyhwYXRoLFVJTGF5ZXJMZXZlbC5UaHJlZSx7b25Db21wbGV0ZWQ6KG5vZGUpPT57XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiX19fX19fX1wiKVxyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChFcXVpcEluZm9VaSkuaW5pdERhdGEoaGVyb1R5cGUsZXF1aXBJZCxwYSxwZCxidXlDYWxsYmFjayx1c2VDYWxsYmFjayk7XHJcbiAgICAgICAgfX0pO1xyXG4gICAgICAgIHJldHVybjsgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8vIHNob3dSYWJhdGVVaSgpe1xyXG5cclxuICAgIC8vICAgICBsZXQgcGF0aD0ndWkvaG9tZS9yYWJhdGVfdWknO1xyXG4gICAgLy8gICAgIGxldCBwcmVmYWI9dGhpcy5nZXRQcmVmYWIocGF0aCk7XHJcbiAgICAvLyAgICAgaWYocHJlZmFiKXtcclxuICAgIC8vICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUocHJlZmFiKTtcclxuICAgIC8vICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgLy8gICAgIH1lbHNle1xyXG4gICAgLy8gICAgICAgICB0aGlzLmxvYWRQcmVmYWIocGF0aCwoYXNzZXQ6Y2MuUHJlZmFiKT0+e1xyXG4gICAgLy8gICAgICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUoYXNzZXQpO1xyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgLy8gICAgICAgICB9KTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gc2hvd0dpZnRDZW50ZXJVaSgpe1xyXG4gICAgLy8gICAgIGxldCBwYXRoPSd1aS9ob21lL2dpZnRfY2VudGVyX3VpJztcclxuICAgIC8vICAgICBsZXQgcHJlZmFiPXRoaXMuZ2V0UHJlZmFiKHBhdGgpO1xyXG4gICAgLy8gICAgIGlmKHByZWZhYil7XHJcbiAgICAvLyAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKHByZWZhYik7XHJcbiAgICAvLyAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgIC8vICAgICB9ZWxzZXtcclxuICAgIC8vICAgICAgICAgdGhpcy5sb2FkUHJlZmFiKHBhdGgsKGFzc2V0OmNjLlByZWZhYik9PntcclxuICAgIC8vICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUoYXNzZXQpO1xyXG4gICAgLy8gICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAvLyAgICAgICAgIH0pO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyBzaG93QmF0dGxlUGFzc1VpKCl7XHJcbiAgICAvLyAgICAgbGV0IHBhdGg9J3VpL2hvbWUvYmF0dGxlX3Bhc3NfdWknO1xyXG4gICAgLy8gICAgIGxldCBwcmVmYWI9dGhpcy5nZXRQcmVmYWIocGF0aCk7XHJcbiAgICAvLyAgICAgaWYocHJlZmFiKXtcclxuICAgIC8vICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUocHJlZmFiKTtcclxuICAgIC8vICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgLy8gICAgIH1lbHNle1xyXG4gICAgLy8gICAgICAgICB0aGlzLmxvYWRQcmVmYWIocGF0aCwoYXNzZXQ6Y2MuUHJlZmFiKT0+e1xyXG4gICAgLy8gICAgICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUoYXNzZXQpO1xyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgLy8gICAgICAgICB9KTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gc2hvd1NldHRpbmcodWlBY3Rpb246VWlBY3Rpb24pXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgICAgbGV0IHBhdGg9J3VpL2hvbWUvc2V0dGluZ191aSc7XHJcbiAgICAvLyAgICAgbGV0IHByZWZhYj10aGlzLmdldFByZWZhYihwYXRoKTtcclxuICAgIC8vICAgICBpZihwcmVmYWIpe1xyXG4gICAgLy8gICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShwcmVmYWIpO1xyXG4gICAgLy8gICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAvLyAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFNldHRpbmdVaSkuaW5pdCh1aUFjdGlvbik7XHJcbiAgICAvLyAgICAgfWVsc2V7XHJcbiAgICAvLyAgICAgICAgIHRoaXMubG9hZFByZWZhYihwYXRoLChhc3NldDpjYy5QcmVmYWIpPT57XHJcbiAgICAvLyAgICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShhc3NldCk7XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAvLyAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChTZXR0aW5nVWkpLmluaXQodWlBY3Rpb24pO1xyXG4gICAgLy8gICAgICAgICB9KTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgICAgY2MubG9nKGNjLmFzc2V0TWFuYWdlci5hc3NldHMuY291bnQpO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIHNob3dBdmF0YXJSb290KHVpQWN0aW9uOlVpQWN0aW9uKVxyXG4gICAgLy8ge1xyXG4gICAgLy8gICAgIGxldCBwYXRoPSd1aS9ob21lL2F2YXRhclJvb3QnO1xyXG4gICAgLy8gICAgIGxldCBwcmVmYWI9dGhpcy5nZXRQcmVmYWIocGF0aCk7XHJcbiAgICAvLyAgICAgaWYocHJlZmFiKXtcclxuICAgIC8vICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUocHJlZmFiKTtcclxuICAgIC8vICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgLy8gICAgICAgICBub2RlLmdldENvbXBvbmVudChBdmF0YXJVaSkuaW5pdCh1aUFjdGlvbik7XHJcbiAgICAvLyAgICAgfWVsc2V7XHJcbiAgICAvLyAgICAgICAgIHRoaXMubG9hZFByZWZhYihwYXRoLChhc3NldDpjYy5QcmVmYWIpPT57XHJcbiAgICAvLyAgICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShhc3NldCk7XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAvLyAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChBdmF0YXJVaSkuaW5pdCh1aUFjdGlvbik7XHJcbiAgICAvLyAgICAgICAgIH0pO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH1cclxuICAgIFxyXG5cclxuICAgIC8vIHNob3dTaWduVWkodWlBY3Rpb246VWlBY3Rpb24pXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgICAgaWYoY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiU2lnbkluT3ZlclwiKSA9PSBcIjFcIil7XHJcbiAgICAvLyAgICAgICAgIGxldCBwYXRoPVVJUGF0aC5TaWduSW5EYWlseTtcclxuICAgIC8vICAgICAgICAgdGhpcy5zaG93VWlEaWFsb2cocGF0aCxVSUxheWVyTGV2ZWwuT25lLHtvbkNvbXBsZXRlZDoobm9kZSk9PntcclxuICAgIC8vICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFNpZ25VaURhaWx5KS5pbml0KHVpQWN0aW9uKTtcclxuICAgIC8vICAgICAgICAgfX0pO1xyXG4gICAgLy8gICAgICAgICByZXR1cm47XHJcbiAgICAvLyAgICAgICAgIGxldCBwcmVmYWI9dGhpcy5nZXRQcmVmYWIocGF0aCk7XHJcbiAgICAvLyAgICAgICAgIGlmKHByZWZhYil7XHJcbiAgICAvLyAgICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShwcmVmYWIpO1xyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgLy8gICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoU2lnblVpRGFpbHkpLmluaXQodWlBY3Rpb24pO1xyXG4gICAgLy8gICAgICAgICB9ZWxzZXtcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMubG9hZFByZWZhYihwYXRoLChhc3NldDpjYy5QcmVmYWIpPT57XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUoYXNzZXQpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChTaWduVWlEYWlseSkuaW5pdCh1aUFjdGlvbik7XHJcbiAgICAvLyAgICAgICAgICAgICB9KTtcclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgIC8vICAgICB9ZWxzZXtcclxuICAgIC8vICAgICAgICAgbGV0IHBhdGg9J3VpL2hvbWUvc2lnbl91aSc7XHJcbiAgICAvLyAgICAgICAgIHRoaXMuc2hvd1VpRGlhbG9nKHBhdGgsVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KG5vZGUpPT57XHJcbiAgICAvLyAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChTaWduVWkpLmluaXQodWlBY3Rpb24pO1xyXG4gICAgLy8gICAgICAgICB9fSk7XHJcbiAgICAvLyAgICAgICAgIHJldHVybjtcclxuICAgIC8vICAgICAgICAgbGV0IHByZWZhYj10aGlzLmdldFByZWZhYihwYXRoKTtcclxuICAgIC8vICAgICAgICAgaWYocHJlZmFiKXtcclxuICAgIC8vICAgICAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKHByZWZhYik7XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAvLyAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChTaWduVWkpLmluaXQodWlBY3Rpb24pO1xyXG4gICAgLy8gICAgICAgICB9ZWxzZXtcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMubG9hZFByZWZhYihwYXRoLChhc3NldDpjYy5QcmVmYWIpPT57XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUoYXNzZXQpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChTaWduVWkpLmluaXQodWlBY3Rpb24pO1xyXG4gICAgLy8gICAgICAgICAgICAgfSk7XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gc2hvd1JhbmtVaSgpXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgICAgbGV0IHBhdGg9J3VpL2hvbWUvcmFua191aSc7XHJcbiAgICAvLyAgICAgbGV0IHByZWZhYj10aGlzLmdldFByZWZhYihwYXRoKTtcclxuICAgIC8vICAgICBpZihwcmVmYWIpe1xyXG4gICAgLy8gICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShwcmVmYWIpO1xyXG4gICAgLy8gICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAvLyAgICAgfWVsc2V7XHJcbiAgICAvLyAgICAgICAgIHRoaXMubG9hZFByZWZhYihwYXRoLChhc3NldDpjYy5QcmVmYWIpPT57XHJcbiAgICAvLyAgICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShhc3NldCk7XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAvLyAgICAgICAgIH0pO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyBzaG93VGFza1VpKHVpQWN0aW9uOlVpQWN0aW9uKVxyXG4gICAgLy8ge1xyXG4gICAgLy8gICAgIGxldCBwYXRoPSd1aS9ob21lL3Rhc2tfdWknO1xyXG4gICAgLy8gICAgIGxldCBwcmVmYWI9dGhpcy5nZXRQcmVmYWIocGF0aCk7XHJcbiAgICAvLyAgICAgaWYocHJlZmFiKXtcclxuICAgIC8vICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUocHJlZmFiKTtcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTsgIFxyXG4gICAgLy8gICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoVGFza1VpKS5pbml0KHVpQWN0aW9uKTtcclxuICAgIC8vICAgICB9ZWxzZXtcclxuICAgIC8vICAgICAgICAgdGhpcy5sb2FkUHJlZmFiKHBhdGgsKGFzc2V0OmNjLlByZWZhYik9PntcclxuXHQvLyBcdFx0XHRsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShhc3NldCk7XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7ICBcclxuICAgIC8vICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFRhc2tVaSkuaW5pdCh1aUFjdGlvbik7XHJcbiAgICAvLyAgICAgICAgIH0pO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyBzaG93T2ZmbGluZVVpKHVpQWN0aW9uOlVpQWN0aW9uKVxyXG4gICAgLy8ge1xyXG4gICAgLy8gICAgIGxldCBwYXRoPSd1aS9ob21lL2d1YWppX3VpJztcclxuICAgIC8vICAgICBsZXQgcHJlZmFiPXRoaXMuZ2V0UHJlZmFiKHBhdGgpO1xyXG4gICAgLy8gICAgIGlmKHByZWZhYil7XHJcbiAgICAvLyAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKHByZWZhYik7XHJcbiAgICAvLyAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgIC8vICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoT2ZmbGluZVVpKS5pbml0KHVpQWN0aW9uKVxyXG4gICAgLy8gICAgIH1lbHNle1xyXG4gICAgLy8gICAgICAgICB0aGlzLmxvYWRQcmVmYWIocGF0aCwoYXNzZXQ6Y2MuUHJlZmFiKT0+e1xyXG4gICAgLy8gICAgICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUoYXNzZXQpO1xyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgLy8gICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoT2ZmbGluZVVpKS5pbml0KHVpQWN0aW9uKVxyXG4gICAgLy8gICAgICAgICB9KTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gc2hvd1VzZXJMZXZlbFVpKClcclxuICAgIC8vIHtcclxuICAgIC8vICAgICBsZXQgcGF0aD0ndWkvaG9tZS91c2VyX2xldmVsX3VpJztcclxuICAgIC8vICAgICBsZXQgcHJlZmFiPXRoaXMuZ2V0UHJlZmFiKHBhdGgpO1xyXG4gICAgLy8gICAgIGlmKHByZWZhYil7XHJcbiAgICAvLyAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKHByZWZhYik7XHJcbiAgICAvLyAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgIC8vICAgICB9ZWxzZXtcclxuICAgIC8vICAgICAgICAgdGhpcy5sb2FkUHJlZmFiKHBhdGgsKGFzc2V0OmNjLlByZWZhYik9PntcclxuICAgIC8vICAgICAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKGFzc2V0KTtcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgIC8vICAgICAgICAgfSk7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfVxyXG5cclxuICAgIHNob3dHZXRIZXJvVWkoaGVyb1R5cGU6SGVyb19UeXBlKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBwYXRoPSd1aS9nYW1lL2dldF9oZXJvX3VpJztcclxuICAgICAgICBsZXQgcHJlZmFiPXRoaXMuZ2V0UHJlZmFiKHBhdGgpO1xyXG4gICAgICAgIGlmKHByZWZhYil7XHJcbiAgICAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKHByZWZhYik7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoR2V0SGVyb1VpKS5pbml0VWkoaGVyb1R5cGUpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRQcmVmYWIocGF0aCwoYXNzZXQ6Y2MuUHJlZmFiKT0+e1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUoYXNzZXQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoR2V0SGVyb1VpKS5pbml0VWkoaGVyb1R5cGUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1VubG9ja0hpbnRVaSgpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHBhdGg9J3VpL2dhbWUvdW5sb2NrX2hpbnQnO1xyXG4gICAgICAgIGxldCBwcmVmYWI9dGhpcy5nZXRQcmVmYWIocGF0aCk7XHJcbiAgICAgICAgaWYocHJlZmFiKXtcclxuICAgICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUocHJlZmFiKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRQcmVmYWIocGF0aCwoYXNzZXQ6Y2MuUHJlZmFiKT0+e1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUoYXNzZXQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc2hvd1ZpcFVpKHVpQWN0aW9uOlVpQWN0aW9uKVxyXG4gICAgLy8geyAgICAgICAgXHJcbiAgICAvLyAgICAgbGV0IHBhdGg9J3VpL2hvbWUvdmlwX3VpJztcclxuICAgIC8vICAgICBsZXQgcHJlZmFiPXRoaXMuZ2V0UHJlZmFiKHBhdGgpO1xyXG4gICAgLy8gICAgIGlmKHByZWZhYil7XHJcbiAgICAvLyAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKHByZWZhYik7XHJcbiAgICAvLyAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgIC8vICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoVmlwVWkpLmluaXQodWlBY3Rpb24pO1xyXG4gICAgLy8gICAgIH1lbHNle1xyXG4gICAgLy8gICAgICAgICB0aGlzLmxvYWRQcmVmYWIocGF0aCwoYXNzZXQ6Y2MuUHJlZmFiKT0+e1xyXG5cdC8vIFx0XHRcdGxldCBub2RlPWNjLmluc3RhbnRpYXRlKGFzc2V0KTtcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgIC8vICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFZpcFVpKS5pbml0KHVpQWN0aW9uKTtcclxuICAgIC8vICAgICAgICAgfSk7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIHNob3dGYXN0R3VhamlVaSh1aUFjdGlvbjpVaUFjdGlvbilcclxuICAgIC8vIHtcclxuICAgIC8vICAgICBsZXQgcGF0aD0ndWkvaG9tZS9mYXN0X2d1YWppX3VpJztcclxuICAgIC8vICAgICBsZXQgcHJlZmFiPXRoaXMuZ2V0UHJlZmFiKHBhdGgpO1xyXG4gICAgLy8gICAgIGlmKHByZWZhYil7XHJcbiAgICAvLyAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKHByZWZhYik7XHJcbiAgICAvLyAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgIC8vICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoRmFzdEd1YUppVWkpLmluaXQodWlBY3Rpb24pO1xyXG4gICAgLy8gICAgIH1lbHNle1xyXG4gICAgLy8gICAgICAgICB0aGlzLmxvYWRQcmVmYWIocGF0aCwoYXNzZXQ6Y2MuUHJlZmFiKT0+e1xyXG4gICAgLy8gICAgICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUoYXNzZXQpO1xyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgLy8gICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoRmFzdEd1YUppVWkpLmluaXQodWlBY3Rpb24pO1xyXG4gICAgLy8gICAgICAgICB9KTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gc2hvd01hcFVpKHVpQWN0aW9uOlVpQWN0aW9uKVxyXG4gICAgLy8ge1xyXG4gICAgLy8gICAgIGxldCBwYXRoPSd1aS9ob21lL3RvX3BsYXlfbWFpbl91aSc7XHJcbiAgICAvLyAgICAgbGV0IHByZWZhYj10aGlzLmdldFByZWZhYihwYXRoKTtcclxuICAgIC8vICAgICBpZihwcmVmYWIpe1xyXG4gICAgLy8gICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShwcmVmYWIpO1xyXG4gICAgLy8gICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAvLyAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFRvUGxheU1haW5VaSkuaW5pdCh1aUFjdGlvbik7XHJcbiAgICAvLyAgICAgfWVsc2V7XHJcbiAgICAvLyAgICAgICAgIHRoaXMubG9hZFByZWZhYihwYXRoLChhc3NldDpjYy5QcmVmYWIpPT57XHJcbiAgICAvLyAgICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShhc3NldCk7XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAvLyAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChUb1BsYXlNYWluVWkpLmluaXQodWlBY3Rpb24pO1xyXG4gICAgLy8gICAgICAgICB9KTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gc2hvd1Rvd2VyVWkoKVxyXG4gICAgLy8ge1xyXG4gICAgLy8gICAgIGxldCBwYXRoPSd1aS9ob21lL3Rvd2VyX3VpJztcclxuICAgIC8vICAgICBsZXQgcHJlZmFiPXRoaXMuZ2V0UHJlZmFiKHBhdGgpO1xyXG4gICAgLy8gICAgIGlmKHByZWZhYil7XHJcbiAgICAvLyAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKHByZWZhYik7XHJcbiAgICAvLyAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgIC8vICAgICB9ZWxzZXtcclxuICAgIC8vICAgICAgICAgdGhpcy5sb2FkUHJlZmFiKHBhdGgsKGFzc2V0OmNjLlByZWZhYik9PntcclxuICAgIC8vICAgICAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKGFzc2V0KTtcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgIC8vICAgICAgICAgfSk7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfVxyXG5cclxuICAgIHNob3dNYXplVWkoKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBwYXRoPSdtYXplL21hemVfdWknO1xyXG4gICAgICAgIGxldCBwcmVmYWI9dGhpcy5nZXRQcmVmYWIocGF0aCk7XHJcbiAgICAgICAgaWYocHJlZmFiKXtcclxuICAgICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUocHJlZmFiKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRQcmVmYWIocGF0aCwoYXNzZXQ6Y2MuUHJlZmFiKT0+e1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUoYXNzZXQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc2hvd1Rvd2VyR2lmdCgpXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgICAgbGV0IHBhdGg9J3VpL2hvbWUvdG93ZXJfZ2lmdCc7XHJcbiAgICAvLyAgICAgbGV0IHByZWZhYj10aGlzLmdldFByZWZhYihwYXRoKTtcclxuICAgIC8vICAgICBpZihwcmVmYWIpe1xyXG4gICAgLy8gICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShwcmVmYWIpO1xyXG4gICAgLy8gICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAvLyAgICAgfWVsc2V7XHJcbiAgICAvLyAgICAgICAgIHRoaXMubG9hZFByZWZhYihwYXRoLChhc3NldDpjYy5QcmVmYWIpPT57XHJcbiAgICAvLyAgICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShhc3NldCk7XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAvLyAgICAgICAgIH0pO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH1cclxuXHJcbiAgICBzaG93VmlkZW9UaXAoeWVzQ2FsbGJhY2s6RnVuY3Rpb24sbm9DYWxsYmFjazpGdW5jdGlvbilcclxuICAgIHtcclxuICAgICAgICBsZXQgcGF0aD0ndWkvZ2FtZS92aWRlb190aXAnO1xyXG4gICAgICAgIGxldCBwcmVmYWI9dGhpcy5nZXRQcmVmYWIocGF0aCk7XHJcbiAgICAgICAgaWYocHJlZmFiKXtcclxuICAgICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUocHJlZmFiKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChWaWRlb1RpcCkuaW5pdCh5ZXNDYWxsYmFjayxub0NhbGxiYWNrKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5sb2FkUHJlZmFiKHBhdGgsKGFzc2V0OmNjLlByZWZhYik9PntcclxuICAgICAgICAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKGFzc2V0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFZpZGVvVGlwKS5pbml0KHllc0NhbGxiYWNrLG5vQ2FsbGJhY2spO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuXHJcbiAgICAvLyBhZGRUZWFtU2VsZWN0VWkocGFyZW50OmNjLk5vZGUscG9zOmNjLlZlYzIsYm90dG9tWTpudW1iZXIsaXNTaG93Pzpib29sZWFuKVxyXG4gICAgLy8ge1xyXG4gICAgLy8gICAgIGxldCBwYXRoPSd1aS9ob21lL3RlYW1fc2VsZWN0X3VpJztcclxuICAgIC8vICAgICBsZXQgcHJlZmFiPXRoaXMuZ2V0UHJlZmFiKHBhdGgpO1xyXG4gICAgLy8gICAgIGlmKHByZWZhYil7XHJcbiAgICAvLyAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKHByZWZhYik7XHJcbiAgICAvLyAgICAgICAgIG5vZGUucGFyZW50PXBhcmVudDtcclxuICAgIC8vICAgICAgICAgbm9kZS5zZXRQb3NpdGlvbihwb3MpO1xyXG4gICAgLy8gICAgICAgICBub2RlLmdldENoaWxkQnlOYW1lKCdib3R0b20nKS55PWJvdHRvbVkrMTMyLW5vZGUueTtcclxuICAgIC8vICAgICAgICAgaWYoaXNTaG93IT11bmRlZmluZWQpe1xyXG4gICAgLy8gICAgICAgICAgICAgbm9kZS5hY3RpdmU9aXNTaG93O1xyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgfWVsc2V7XHJcbiAgICAvLyAgICAgICAgIHRoaXMubG9hZFByZWZhYihwYXRoLChhc3NldDpjYy5QcmVmYWIpPT57XHJcbiAgICAvLyAgICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShhc3NldCk7XHJcbiAgICAvLyAgICAgICAgICAgICBub2RlLnBhcmVudD1wYXJlbnQ7XHJcbiAgICAvLyAgICAgICAgICAgICBub2RlLnNldFBvc2l0aW9uKHBvcyk7XHJcbiAgICAvLyAgICAgICAgICAgICBub2RlLmdldENoaWxkQnlOYW1lKCdib3R0b20nKS55PWJvdHRvbVkrMTMyLW5vZGUueTtcclxuICAgIC8vICAgICAgICAgICAgIGlmKGlzU2hvdyE9dW5kZWZpbmVkKXtcclxuICAgIC8vICAgICAgICAgICAgICAgICBub2RlLmFjdGl2ZT1pc1Nob3c7XHJcbiAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgIH0pO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICBzaG93TWF6ZUhlYWxpbmdQb3Rpb25VaSh1aUFjdGlvbjpVaUFjdGlvbixpZDpudW1iZXIsaXNDYW5Hbzpib29sZWFuKXtcclxuICAgICAgICBsZXQgcGF0aD0nbWF6ZS9tYXplX2hlYWxpbmdfcG90aW9uX3VpJztcclxuICAgICAgICBsZXQgcHJlZmFiPXRoaXMuZ2V0UHJlZmFiKHBhdGgpO1xyXG4gICAgICAgIGlmKHByZWZhYil7XHJcbiAgICAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKHByZWZhYik7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTsgICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IHRzPW5vZGUuZ2V0Q29tcG9uZW50KEhlYWxpbmdQb3Rpb24pO1xyXG4gICAgICAgICAgICB0cy5pbml0KHVpQWN0aW9uKTtcclxuICAgICAgICAgICAgdHMuaW5pdERhdGEoaWQsaXNDYW5Hbyk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFByZWZhYihwYXRoLChhc3NldDpjYy5QcmVmYWIpPT57XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShhc3NldCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgdHM9bm9kZS5nZXRDb21wb25lbnQoSGVhbGluZ1BvdGlvbik7XHJcbiAgICAgICAgICAgICAgICB0cy5pbml0KHVpQWN0aW9uKTtcclxuICAgICAgICAgICAgICAgIHRzLmluaXREYXRhKGlkLGlzQ2FuR28pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9ICAgIFxyXG5cclxuICAgIHNob3dNYXplQnVmZlVpKHVpQWN0aW9uOlVpQWN0aW9uLGlkOm51bWJlcixpc0NhbkdvOmJvb2xlYW4pe1xyXG4gICAgICAgIGxldCBwYXRoPSdtYXplL21hemVfYnVmZl91aSc7XHJcbiAgICAgICAgbGV0IHByZWZhYj10aGlzLmdldFByZWZhYihwYXRoKTtcclxuICAgICAgICBpZihwcmVmYWIpe1xyXG4gICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShwcmVmYWIpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgIGxldCB0cz1ub2RlLmdldENvbXBvbmVudChNYXplQnVmZlVpKTtcclxuICAgICAgICAgICAgdHMuaW5pdCh1aUFjdGlvbik7XHJcbiAgICAgICAgICAgIHRzLmluaXREYXRhKGlkLGlzQ2FuR28pO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRQcmVmYWIocGF0aCwoYXNzZXQ6Y2MuUHJlZmFiKT0+e1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUoYXNzZXQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHRzPW5vZGUuZ2V0Q29tcG9uZW50KE1hemVCdWZmVWkpO1xyXG4gICAgICAgICAgICAgICAgdHMuaW5pdCh1aUFjdGlvbik7XHJcbiAgICAgICAgICAgICAgICB0cy5pbml0RGF0YShpZCxpc0NhbkdvKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNob3dNYXplRmlnaHRpbmdVaSh1aUFjdGlvbjpVaUFjdGlvbixpZDpudW1iZXIsaXNDYW5Hbzpib29sZWFuKXtcclxuICAgICAgICBsZXQgcGF0aD0nbWF6ZS9tYXplX2ZpZ2h0aW5nX3VpJztcclxuICAgICAgICBsZXQgcHJlZmFiPXRoaXMuZ2V0UHJlZmFiKHBhdGgpO1xyXG4gICAgICAgIGlmKHByZWZhYil7XHJcbiAgICAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKHByZWZhYik7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICAgICAgbGV0IHRzPW5vZGUuZ2V0Q29tcG9uZW50KE1hemVGaWdodGluZ1VpKTtcclxuICAgICAgICAgICAgdHMuaW5pdCh1aUFjdGlvbik7XHJcbiAgICAgICAgICAgIHRzLmluaXREYXRhKGlkLGlzQ2FuR28pO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRQcmVmYWIocGF0aCwoYXNzZXQ6Y2MuUHJlZmFiKT0+e1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUoYXNzZXQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHRzPW5vZGUuZ2V0Q29tcG9uZW50KE1hemVGaWdodGluZ1VpKTtcclxuICAgICAgICAgICAgICAgIHRzLmluaXQodWlBY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgdHMuaW5pdERhdGEoaWQsaXNDYW5Hbyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzaG93TWF6ZVNob3BVaSh1aUFjdGlvbjpVaUFjdGlvbixpZDpudW1iZXIsaXNDYW5Hbzpib29sZWFuKXtcclxuICAgICAgICBsZXQgcGF0aD0nbWF6ZS9tYXplX3Nob3AnO1xyXG4gICAgICAgIGxldCBwcmVmYWI9dGhpcy5nZXRQcmVmYWIocGF0aCk7XHJcbiAgICAgICAgaWYocHJlZmFiKXtcclxuICAgICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUocHJlZmFiKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgICAgICBsZXQgdHM9bm9kZS5nZXRDb21wb25lbnQoTWF6ZVNob3ApO1xyXG4gICAgICAgICAgICB0cy5pbml0KHVpQWN0aW9uKTtcclxuICAgICAgICAgICAgdHMuaW5pdERhdGEoaWQsaXNDYW5Hbyk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFByZWZhYihwYXRoLChhc3NldDpjYy5QcmVmYWIpPT57XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShhc3NldCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgdHM9bm9kZS5nZXRDb21wb25lbnQoTWF6ZVNob3ApO1xyXG4gICAgICAgICAgICAgICAgdHMuaW5pdCh1aUFjdGlvbik7XHJcbiAgICAgICAgICAgICAgICB0cy5pbml0RGF0YShpZCxpc0NhbkdvKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNob3dNYXplVG9vbFVpKHVpQWN0aW9uOlVpQWN0aW9uKXtcclxuICAgICAgICBsZXQgcGF0aD0nbWF6ZS9tYXplX3Rvb2xfdWknO1xyXG4gICAgICAgIGxldCBwcmVmYWI9dGhpcy5nZXRQcmVmYWIocGF0aCk7XHJcbiAgICAgICAgaWYocHJlZmFiKXtcclxuICAgICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUocHJlZmFiKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgICAgICBsZXQgdHM9bm9kZS5nZXRDb21wb25lbnQoTWF6ZVRvb2xVaSk7XHJcbiAgICAgICAgICAgIHRzLmluaXQodWlBY3Rpb24pO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRQcmVmYWIocGF0aCwoYXNzZXQ6Y2MuUHJlZmFiKT0+e1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUoYXNzZXQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHRzPW5vZGUuZ2V0Q29tcG9uZW50KE1hemVUb29sVWkpO1xyXG4gICAgICAgICAgICAgICAgdHMuaW5pdCh1aUFjdGlvbik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzaG93TWF6ZUJhZ1VpKCl7XHJcbiAgICAgICAgbGV0IHBhdGg9J21hemUvbWF6ZV9iYWdfdWknO1xyXG4gICAgICAgIGxldCBwcmVmYWI9dGhpcy5nZXRQcmVmYWIocGF0aCk7XHJcbiAgICAgICAgaWYocHJlZmFiKXtcclxuICAgICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUocHJlZmFiKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRQcmVmYWIocGF0aCwoYXNzZXQ6Y2MuUHJlZmFiKT0+e1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUoYXNzZXQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd01hemVCdWZmSW5mbyhidWZmSWQ6bnVtYmVyKXtcclxuICAgICAgICBsZXQgcGF0aD0nbWF6ZS9tYXplX3Nob3dfYnVmZic7XHJcbiAgICAgICAgbGV0IHByZWZhYj10aGlzLmdldFByZWZhYihwYXRoKTtcclxuICAgICAgICBpZihwcmVmYWIpe1xyXG4gICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShwcmVmYWIpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgIGxldCB0cz1ub2RlLmdldENvbXBvbmVudChNYXplU2hvd0J1ZmZVaSk7XHJcbiAgICAgICAgICAgIHRzLmluaXREYXRhKGJ1ZmZJZCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFByZWZhYihwYXRoLChhc3NldDpjYy5QcmVmYWIpPT57XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShhc3NldCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgdHM9bm9kZS5nZXRDb21wb25lbnQoTWF6ZVNob3dCdWZmVWkpO1xyXG4gICAgICAgICAgICAgICAgdHMuaW5pdERhdGEoYnVmZklkKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNob3dNYXplU2VuZERvb3JVaSgpe1xyXG4gICAgICAgIGxldCBwYXRoPSdtYXplL21hemVfc2VuZF9kb29yX3VpJztcclxuICAgICAgICBsZXQgcHJlZmFiPXRoaXMuZ2V0UHJlZmFiKHBhdGgpO1xyXG4gICAgICAgIGlmKHByZWZhYil7XHJcbiAgICAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKHByZWZhYik7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5sb2FkUHJlZmFiKHBhdGgsKGFzc2V0OmNjLlByZWZhYik9PntcclxuICAgICAgICAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKGFzc2V0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNob3dNYXplV2FsbEluZm9VaSh1aUFjdGlvbjpVaUFjdGlvbil7XHJcbiAgICAgICAgbGV0IHBhdGg9J21hemUvbWF6ZV93YWxsX2luZm8nO1xyXG4gICAgICAgIGxldCBwcmVmYWI9dGhpcy5nZXRQcmVmYWIocGF0aCk7XHJcbiAgICAgICAgaWYocHJlZmFiKXtcclxuICAgICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUocHJlZmFiKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChNYXplV2FsbEluZm9VaSkuaW5pdCh1aUFjdGlvbik7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFByZWZhYihwYXRoLChhc3NldDpjYy5QcmVmYWIpPT57XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShhc3NldCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChNYXplV2FsbEluZm9VaSkuaW5pdCh1aUFjdGlvbik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzaG93TWF6ZUxlYXNlVWkodWlBY3Rpb246VWlBY3Rpb24saWQ6bnVtYmVyLGlzQ2FuR286Ym9vbGVhbil7XHJcbiAgICAgICAgbGV0IHBhdGg9J21hemUvbWF6ZV9sZWFzZV91aSc7XHJcbiAgICAgICAgbGV0IHByZWZhYj10aGlzLmdldFByZWZhYihwYXRoKTtcclxuICAgICAgICBpZihwcmVmYWIpe1xyXG4gICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShwcmVmYWIpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgIGxldCB0cz1ub2RlLmdldENvbXBvbmVudChNYXplTGVhc2VVaSk7XHJcbiAgICAgICAgICAgIHRzLmluaXQodWlBY3Rpb24pO1xyXG4gICAgICAgICAgICB0cy5pbml0RGF0YShpZCxpc0NhbkdvKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5sb2FkUHJlZmFiKHBhdGgsKGFzc2V0OmNjLlByZWZhYik9PntcclxuICAgICAgICAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKGFzc2V0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICAgICAgICAgIGxldCB0cz1ub2RlLmdldENvbXBvbmVudChNYXplTGVhc2VVaSk7XHJcbiAgICAgICAgICAgICAgICB0cy5pbml0KHVpQWN0aW9uKTtcclxuICAgICAgICAgICAgICAgIHRzLmluaXREYXRhKGlkLGlzQ2FuR28pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1Byb3BJbmZvKHVpQWN0aW9uOlVpQWN0aW9uLHByb3BBYzpQcm9wQWN0aW9uLHBkOlByb3BEYXRhLGJ1eUNhbGxiYWNrOkZ1bmN0aW9uLHVzZUNhbGxiYWNrOkZ1bmN0aW9uKXtcclxuICAgICAgICBsZXQgcGF0aD0ncHJvcC9wcm9wX2luZm9fdWknO1xyXG4gICAgICAgIGxldCBwcmVmYWI9dGhpcy5nZXRQcmVmYWIocGF0aCk7XHJcbiAgICAgICAgaWYocHJlZmFiKXtcclxuICAgICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUocHJlZmFiKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgICAgICBsZXQgdHM9bm9kZS5nZXRDb21wb25lbnQoUHJvcEluZm9VaSk7XHJcbiAgICAgICAgICAgIHRzLmluaXQodWlBY3Rpb24pO1xyXG4gICAgICAgICAgICB0cy5pbml0RGF0YShwZCxwcm9wQWMpO1xyXG4gICAgICAgICAgICB0cy5hZGRCdXlMaXN0ZW4oYnV5Q2FsbGJhY2spO1xyXG4gICAgICAgICAgICB0cy5hZGRVc2VMaXN0ZW4odXNlQ2FsbGJhY2spO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRQcmVmYWIocGF0aCwoYXNzZXQ6Y2MuUHJlZmFiKT0+e1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUoYXNzZXQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHRzPW5vZGUuZ2V0Q29tcG9uZW50KFByb3BJbmZvVWkpO1xyXG4gICAgICAgICAgICAgICAgdHMuaW5pdCh1aUFjdGlvbik7XHJcbiAgICAgICAgICAgICAgICB0cy5pbml0RGF0YShwZCxwcm9wQWMpO1xyXG4gICAgICAgICAgICAgICAgdHMuYWRkQnV5TGlzdGVuKGJ1eUNhbGxiYWNrKTtcclxuICAgICAgICAgICAgICAgIHRzLmFkZFVzZUxpc3Rlbih1c2VDYWxsYmFjayk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8gc2hvd0JhZ1VpKHVpQWN0aW9uOlVpQWN0aW9uKVxyXG4gICAgLy8ge1xyXG4gICAgLy8gICAgIGxldCBwYXRoPSd1aS9ob21lL2JhZ191aSc7XHJcbiAgICAvLyAgICAgbGV0IHByZWZhYj10aGlzLmdldFByZWZhYihwYXRoKTtcclxuICAgIC8vICAgICBpZihwcmVmYWIpe1xyXG4gICAgLy8gICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShwcmVmYWIpO1xyXG4gICAgLy8gICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAvLyAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KEJhZ1VpKS5pbml0KHVpQWN0aW9uKTtcclxuICAgIC8vICAgICB9ZWxzZXtcclxuICAgIC8vICAgICAgICAgdGhpcy5sb2FkUHJlZmFiKHBhdGgsKGFzc2V0OmNjLlByZWZhYik9PntcclxuICAgIC8vICAgICAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKGFzc2V0KTtcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgIC8vICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KEJhZ1VpKS5pbml0KHVpQWN0aW9uKTtcclxuICAgIC8vICAgICAgICAgfSk7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfVxyXG4gICAgLy8gc2hvd0dvbGRNYWxsVWkodWlBY3Rpb246VWlBY3Rpb24pXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgICAgbGV0IHBhdGg9J3VpL2hvbWUvZ29sZF9tYWxsX3VpJztcclxuICAgIC8vICAgICBsZXQgcHJlZmFiPXRoaXMuZ2V0UHJlZmFiKHBhdGgpO1xyXG4gICAgLy8gICAgIGlmKHByZWZhYil7XHJcbiAgICAvLyAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKHByZWZhYik7XHJcbiAgICAvLyAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgIC8vICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoR29sZE1hbGxVaSkuaW5pdCh1aUFjdGlvbik7XHJcbiAgICAvLyAgICAgfWVsc2V7XHJcbiAgICAvLyAgICAgICAgIHRoaXMubG9hZFByZWZhYihwYXRoLChhc3NldDpjYy5QcmVmYWIpPT57XHJcbiAgICAvLyAgICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShhc3NldCk7XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAvLyAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChHb2xkTWFsbFVpKS5pbml0KHVpQWN0aW9uKTtcclxuICAgIC8vICAgICAgICAgfSk7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfVxyXG5cclxuICAgIHNob3dDb25zdW1wdGlvblRpcFVpKHVpQWN0aW9uOlVpQWN0aW9uLGN1cnJlbmN5VHlwZTpQcm9wSWQsY3VycmVuY3lOdW06bnVtYmVyLHN1cmVDYWxsQmFjazpGdW5jdGlvbilcclxuICAgIHtcclxuICAgICAgICBsZXQgcGF0aD0nY29uc3VtcHRpb25fdGlwX3VpJztcclxuICAgICAgICBsZXQgcHJlZmFiPXRoaXMuZ2V0UHJlZmFiKHBhdGgpO1xyXG4gICAgICAgIGlmKHByZWZhYil7XHJcbiAgICAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKHByZWZhYik7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoQ29uc3VtcHRpb25UaXBVaSkuaW5pdCh1aUFjdGlvbik7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KENvbnN1bXB0aW9uVGlwVWkpLmluaXRDYWxsQmFjayhjdXJyZW5jeVR5cGUsY3VycmVuY3lOdW0sc3VyZUNhbGxCYWNrKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5sb2FkUHJlZmFiKHBhdGgsKGFzc2V0OmNjLlByZWZhYik9PntcclxuICAgICAgICAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKGFzc2V0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KENvbnN1bXB0aW9uVGlwVWkpLmluaXQodWlBY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoQ29uc3VtcHRpb25UaXBVaSkuaW5pdENhbGxCYWNrKGN1cnJlbmN5VHlwZSxjdXJyZW5jeU51bSxzdXJlQ2FsbEJhY2spO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc2hvd0F0dHJpYnV0ZVVpKHVpQWN0aW9uOlVpQWN0aW9uLGhlcm9UeXBlPzpIZXJvX1R5cGUscGV0SW5mbz86UGV0SW5mbylcclxuICAgIC8vIHtcclxuICAgIC8vICAgICBsZXQgcGF0aD0ndWkvaG9tZS9hdHRyaWJ1dGVfdWknO1xyXG4gICAgLy8gICAgIGxldCBwcmVmYWI9dGhpcy5nZXRQcmVmYWIocGF0aCk7XHJcbiAgICAvLyAgICAgaWYocHJlZmFiKXtcclxuICAgIC8vICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUocHJlZmFiKTtcclxuICAgIC8vICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgLy8gICAgICAgICBub2RlLmdldENvbXBvbmVudChBdHJyaWJ1dGVVaSkuaW5pdCh1aUFjdGlvbik7XHJcbiAgICAvLyAgICAgICAgIGlmKGhlcm9UeXBlICE9IG51bGwpe1xyXG4gICAgLy8gICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoQXRycmlidXRlVWkpLmluaXRIZXJvVHlwZShoZXJvVHlwZSk7XHJcbiAgICAvLyAgICAgICAgIH1lbHNle1xyXG4gICAgLy8gICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoQXRycmlidXRlVWkpLmluaXRQZXRJbmZvKHBldEluZm8pO1xyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgfWVsc2V7XHJcbiAgICAvLyAgICAgICAgIHRoaXMubG9hZFByZWZhYihwYXRoLChhc3NldDpjYy5QcmVmYWIpPT57XHJcbiAgICAvLyAgICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShhc3NldCk7XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAvLyAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChBdHJyaWJ1dGVVaSkuaW5pdCh1aUFjdGlvbik7XHJcbiAgICAvLyAgICAgICAgICAgICBpZihoZXJvVHlwZSAhPSBudWxsKXtcclxuICAgIC8vICAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChBdHJyaWJ1dGVVaSkuaW5pdEhlcm9UeXBlKGhlcm9UeXBlKTtcclxuICAgIC8vICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KEF0cnJpYnV0ZVVpKS5pbml0UGV0SW5mbyhwZXRJbmZvKTtcclxuICAgIC8vICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgfSk7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfVxyXG5cclxuICAgIHNob3dQZXRVcGdyYWRlVWkodWlBY3Rpb246VWlBY3Rpb24scGV0SW5mbzpQZXRJbmZvKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBwYXRoPSdwZXQvdWkvcGV0X3VwZ3JhZGVfdWknO1xyXG4gICAgICAgIGxldCBwcmVmYWI9dGhpcy5nZXRQcmVmYWIocGF0aCk7XHJcbiAgICAgICAgaWYocHJlZmFiKXtcclxuICAgICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUocHJlZmFiKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChQZXRVcGdyYWRlVWkpLmluaXQodWlBY3Rpb24pO1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChQZXRVcGdyYWRlVWkpLmluaXRVaShwZXRJbmZvKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5sb2FkUHJlZmFiKHBhdGgsKGFzc2V0OmNjLlByZWZhYik9PntcclxuICAgICAgICAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKGFzc2V0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFBldFVwZ3JhZGVVaSkuaW5pdCh1aUFjdGlvbik7XHJcbiAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChQZXRVcGdyYWRlVWkpLmluaXRVaShwZXRJbmZvKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNob3dFcXVpcEV4Y2hhbmdlVWkodWlBY3Rpb246VWlBY3Rpb24sZXF1aXBJZDpudW1iZXIsaGVyb1R5cGU6SGVyb19UeXBlLGVxdWlwUG9zOkVxdWlwVHlwZSlcclxuICAgIHtcclxuICAgICAgICBsZXQgcGF0aD0nZXF1aXBtZW50L2VxdWlwX2V4Y2hhbmdlX3VpJztcclxuICAgICAgICB0aGlzLnNob3dVaURpYWxvZyhwYXRoLFVJTGF5ZXJMZXZlbC5UaHJlZSx7b25Db21wbGV0ZWQ6KG5vZGUpPT57XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiX19fX19fX1wiKVxyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChFcXVpcEV4Y2hhbmdlVWkpLmluaXQodWlBY3Rpb24pO1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChFcXVpcEV4Y2hhbmdlVWkpLmluaXREYXRhKGVxdWlwSWQsaGVyb1R5cGUsZXF1aXBQb3MpO1xyXG4gICAgICAgIH19KTtcclxuICAgICAgICByZXR1cm5cclxuICAgICAgICBcclxuICAgIH1cclxuXHJcblxyXG4gICAgc2hvd1BldEV4Y2hhbmdlVWkodWlBY3Rpb246VWlBY3Rpb24scGV0SW5mbzpQZXRJbmZvLGhlcm9UeXBlOkhlcm9fVHlwZSlcclxuICAgIHtcclxuICAgICAgICAvLyBsZXQgcGF0aD0ncGV0L3VpL3BldF9leGNoYW5nZV91aSc7XHJcbiAgICAgICAgLy8gbGV0IHByZWZhYj10aGlzLmdldFByZWZhYihwYXRoKTtcclxuICAgICAgICAvLyBpZihwcmVmYWIpe1xyXG4gICAgICAgIC8vICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShwcmVmYWIpO1xyXG4gICAgICAgIC8vICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgLy8gICAgIG5vZGUuZ2V0Q29tcG9uZW50KFBldEV4Y2hhbmdlVWkpLmluaXQodWlBY3Rpb24pO1xyXG4gICAgICAgIC8vICAgICBub2RlLmdldENvbXBvbmVudChQZXRFeGNoYW5nZVVpKS5pbml0RGF0YShwZXRJbmZvLGhlcm9UeXBlKTtcclxuICAgICAgICAvLyB9ZWxzZXtcclxuICAgICAgICAvLyAgICAgdGhpcy5sb2FkUHJlZmFiKHBhdGgsKGFzc2V0OmNjLlByZWZhYik9PntcclxuICAgICAgICAvLyAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKGFzc2V0KTtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICAvLyAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFBldEV4Y2hhbmdlVWkpLmluaXQodWlBY3Rpb24pO1xyXG4gICAgICAgIC8vICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoUGV0RXhjaGFuZ2VVaSkuaW5pdERhdGEocGV0SW5mbyxoZXJvVHlwZSk7XHJcbiAgICAgICAgLy8gICAgIH0pO1xyXG4gICAgICAgIC8vIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBzaG93V2lzaGluZ1VpKHVpQWN0aW9uOlVpQWN0aW9uKVxyXG4gICAgLy8ge1xyXG4gICAgLy8gICAgIGxldCBwYXRoPSd1aS9ob21lL3dpc2hpbmdfdWknO1xyXG4gICAgLy8gICAgIHRoaXMuc2hvd1VpRGlhbG9nKHBhdGgsVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KG5vZGUpPT57XHJcbiAgICAvLyAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFdpc2hpbmdVaSkuaW5pdCh1aUFjdGlvbik7XHJcbiAgICAvLyAgICAgfX0pO1xyXG4gICAgLy8gICAgIHJldHVybjtcclxuICAgIC8vICAgICBsZXQgcHJlZmFiPXRoaXMuZ2V0UHJlZmFiKHBhdGgpO1xyXG4gICAgLy8gICAgIGlmKHByZWZhYil7XHJcbiAgICAvLyAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKHByZWZhYik7XHJcbiAgICAvLyAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgIC8vICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoV2lzaGluZ1VpKS5pbml0KHVpQWN0aW9uKTtcclxuICAgIC8vICAgICB9ZWxzZXtcclxuICAgIC8vICAgICAgICAgdGhpcy5sb2FkUHJlZmFiKHBhdGgsKGFzc2V0OmNjLlByZWZhYik9PnsgICAgICAgICAgICAgICAgXHJcbiAgICAvLyAgICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShhc3NldCk7XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAvLyAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChXaXNoaW5nVWkpLmluaXQodWlBY3Rpb24pO1xyXG4gICAgLy8gICAgICAgICB9KTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gc2hvd1dpc2hpbmdUaXBVaSh1aUFjdGlvbjpVaUFjdGlvbixzdGF0ZTpXaXNoaW5nU3RhdGV8VGFrZUVnZ1N0YXRlLGlkOm51bWJlcixpc1Rha2VFZ2c6Ym9vbGVhbiA9IGZhbHNlKVxyXG4gICAgLy8ge1xyXG4gICAgLy8gICAgIGxldCBwYXRoPSd1aS9ob21lL3dpc2hpbmdfdGlwX3VpJztcclxuICAgIC8vICAgICBsZXQgcHJlZmFiPXRoaXMuZ2V0UHJlZmFiKHBhdGgpO1xyXG4gICAgLy8gICAgIGlmKHByZWZhYil7XHJcbiAgICAvLyAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKHByZWZhYik7XHJcbiAgICAvLyAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgIC8vICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoV2lzaGluZ1RpcFVpKS5pbml0KHVpQWN0aW9uKTtcclxuICAgIC8vICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoV2lzaGluZ1RpcFVpKS5pbml0VWkoc3RhdGUsaWQsaXNUYWtlRWdnKTtcclxuICAgIC8vICAgICB9ZWxzZXtcclxuICAgIC8vICAgICAgICAgdGhpcy5sb2FkUHJlZmFiKHBhdGgsKGFzc2V0OmNjLlByZWZhYik9PntcclxuICAgIC8vICAgICAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKGFzc2V0KTtcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgIC8vICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFdpc2hpbmdUaXBVaSkuaW5pdCh1aUFjdGlvbik7XHJcbiAgICAvLyAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChXaXNoaW5nVGlwVWkpLmluaXRVaShzdGF0ZSxpZCxpc1Rha2VFZ2cpO1xyXG4gICAgLy8gICAgICAgICB9KTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gc2hvd0V4Y2x1c2l2ZVdlYXBvbnNVaSh1aUFjdGlvbjpVaUFjdGlvbixoZXJvVHlwZTpIZXJvX1R5cGUpXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgICAgbGV0IHBhdGg9J3VpL2hvbWUvZXhjbHVzaXZlX3dlYXBvbnNfdWknO1xyXG4gICAgLy8gICAgIGxldCBwcmVmYWI9dGhpcy5nZXRQcmVmYWIocGF0aCk7XHJcbiAgICAvLyAgICAgaWYocHJlZmFiKXtcclxuICAgIC8vICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUocHJlZmFiKTtcclxuICAgIC8vICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgLy8gICAgICAgICBub2RlLmdldENvbXBvbmVudChFeGNsdXNpdmVXZWFwb25zVWkpLmluaXQodWlBY3Rpb24pO1xyXG4gICAgLy8gICAgICAgICBub2RlLmdldENvbXBvbmVudChFeGNsdXNpdmVXZWFwb25zVWkpLmluaXREYXRhKGhlcm9UeXBlKTtcclxuICAgIC8vICAgICB9ZWxzZXtcclxuICAgIC8vICAgICAgICAgdGhpcy5sb2FkUHJlZmFiKHBhdGgsKGFzc2V0OmNjLlByZWZhYik9PntcclxuICAgIC8vICAgICAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKGFzc2V0KTtcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgIC8vICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KEV4Y2x1c2l2ZVdlYXBvbnNVaSkuaW5pdCh1aUFjdGlvbik7XHJcbiAgICAvLyAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChFeGNsdXNpdmVXZWFwb25zVWkpLmluaXREYXRhKGhlcm9UeXBlKTtcclxuICAgIC8vICAgICAgICAgfSk7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIHNob3dFeGNsdXNpdmVXZWFwb25zU3RyZW5ndGhlbmluZ1VpKHVpQWN0aW9uOlVpQWN0aW9uLGhlcm9UeXBlOkhlcm9fVHlwZSxpc0FjdGlWYXRpb246Ym9vbGVhbj1mYWxzZSlcclxuICAgIC8vIHtcclxuICAgIC8vICAgICBsZXQgcGF0aD0ndWkvaG9tZS9leGNsdXNpdmVfd2VhcG9uc19zdHJlbmd0aGVuaW5nX3VpJztcclxuICAgIC8vICAgICBsZXQgcHJlZmFiPXRoaXMuZ2V0UHJlZmFiKHBhdGgpO1xyXG4gICAgLy8gICAgIGlmKHByZWZhYil7XHJcbiAgICAvLyAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKHByZWZhYik7XHJcbiAgICAvLyAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgIC8vICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoRXhjbHVzaXZlV2VhcG9uc1N0cmVuZ3RoZW5pbmdVaSkuaW5pdCh1aUFjdGlvbik7XHJcbiAgICAvLyAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KEV4Y2x1c2l2ZVdlYXBvbnNTdHJlbmd0aGVuaW5nVWkpLmluaXREYXRhKGhlcm9UeXBlLGlzQWN0aVZhdGlvbik7XHJcbiAgICAvLyAgICAgfWVsc2V7XHJcbiAgICAvLyAgICAgICAgIHRoaXMubG9hZFByZWZhYihwYXRoLChhc3NldDpjYy5QcmVmYWIpPT57XHJcbiAgICAvLyAgICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShhc3NldCk7XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAvLyAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChFeGNsdXNpdmVXZWFwb25zU3RyZW5ndGhlbmluZ1VpKS5pbml0KHVpQWN0aW9uKTtcclxuICAgIC8vICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KEV4Y2x1c2l2ZVdlYXBvbnNTdHJlbmd0aGVuaW5nVWkpLmluaXREYXRhKGhlcm9UeXBlLGlzQWN0aVZhdGlvbik7XHJcbiAgICAvLyAgICAgICAgIH0pO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH1cclxuXHJcbiAgICBzaG93UGF5VWkodWlBY3Rpb246VWlBY3Rpb24sc2hvd0luZGV4Om51bWJlcilcclxuICAgIHtcclxuICAgICAgICBsZXQgcGF0aD0ncGF5bWVudC9wYXltZW50X3VpJztcclxuICAgICAgICB0aGlzLnNob3dVaURpYWxvZyhwYXRoLFVJTGF5ZXJMZXZlbC5PbmUse29uQ29tcGxldGVkOihub2RlKT0+e1xyXG4gICAgICAgICAgICBsZXQgdHM9bm9kZS5nZXRDb21wb25lbnQoUGF5bWVudFVpKTtcclxuICAgICAgICAgICAgdHMuaW5pdCh1aUFjdGlvbik7XHJcbiAgICAgICAgICAgIHRzLmluaXREYXRhKHNob3dJbmRleCk7XHJcbiAgICAgICAgfX0pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgICBsZXQgcHJlZmFiPXRoaXMuZ2V0UHJlZmFiKHBhdGgpO1xyXG4gICAgICAgIGlmKHByZWZhYil7XHJcbiAgICAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKHByZWZhYik7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICAgICAgbGV0IHRzPW5vZGUuZ2V0Q29tcG9uZW50KFBheW1lbnRVaSk7XHJcbiAgICAgICAgICAgIHRzLmluaXQodWlBY3Rpb24pO1xyXG4gICAgICAgICAgICB0cy5pbml0RGF0YShzaG93SW5kZXgpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRQcmVmYWIocGF0aCwoYXNzZXQ6Y2MuUHJlZmFiKT0+e1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUoYXNzZXQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHRzPW5vZGUuZ2V0Q29tcG9uZW50KFBheW1lbnRVaSk7XHJcbiAgICAgICAgICAgICAgICB0cy5pbml0KHVpQWN0aW9uKTtcclxuICAgICAgICAgICAgICAgIHRzLmluaXREYXRhKHNob3dJbmRleCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBzaG93VGFrZUVnZ1VpKHVpQWN0aW9uOlVpQWN0aW9uKVxyXG4gICAgLy8ge1xyXG4gICAgLy8gICAgIGxldCBwYXRoPSd1aS9ob21lL3Rha2VfZWdnX3VpJztcclxuICAgIC8vICAgICBsZXQgcHJlZmFiPXRoaXMuZ2V0UHJlZmFiKHBhdGgpO1xyXG4gICAgLy8gICAgIGlmKHByZWZhYil7XHJcbiAgICAvLyAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKHByZWZhYik7XHJcbiAgICAvLyAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgIC8vICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoVGFrZUVnZ1VpKS5pbml0KHVpQWN0aW9uKTtcclxuICAgIC8vICAgICB9ZWxzZXtcclxuICAgIC8vICAgICAgICAgdGhpcy5sb2FkUHJlZmFiKHBhdGgsKGFzc2V0OmNjLlByZWZhYik9PntcclxuICAgIC8vICAgICAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKGFzc2V0KTtcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgIC8vICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFRha2VFZ2dVaSkuaW5pdCh1aUFjdGlvbik7XHJcbiAgICAvLyAgICAgICAgIH0pO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyBzaG93RXF1aXBTeW50aGV0aWNVaSh1aUFjdGlvbjpVaUFjdGlvbilcclxuICAgIC8vIHtcclxuICAgIC8vICAgICBsZXQgcGF0aD0ndWkvaG9tZS9lcXVpcF9zeW50aGV0aWNfdWknO1xyXG4gICAgLy8gICAgIGxldCBwcmVmYWI9dGhpcy5nZXRQcmVmYWIocGF0aCk7XHJcbiAgICAvLyAgICAgaWYocHJlZmFiKXtcclxuICAgIC8vICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUocHJlZmFiKTtcclxuICAgIC8vICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgLy8gICAgICAgICBub2RlLmdldENvbXBvbmVudChNZXJnZVVpKS5pbml0KHVpQWN0aW9uKTtcclxuICAgIC8vICAgICB9ZWxzZXtcclxuICAgIC8vICAgICAgICAgdGhpcy5sb2FkUHJlZmFiKHBhdGgsKGFzc2V0OmNjLlByZWZhYik9PntcclxuICAgIC8vICAgICAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKGFzc2V0KTtcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgIC8vICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KE1lcmdlVWkpLmluaXQodWlBY3Rpb24pO1xyXG4gICAgLy8gICAgICAgICB9KTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9XHJcbiAgICBcclxuICAgIHNob3dQZXRBZGR2YW5jZVVpKHVpQWN0aW9uOlVpQWN0aW9uKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBwYXRoPSdwZXQvdWkvcGV0X2FkdmFuY2VfdWknO1xyXG4gICAgICAgIGxldCBwcmVmYWI9dGhpcy5nZXRQcmVmYWIocGF0aCk7XHJcbiAgICAgICAgaWYocHJlZmFiKXtcclxuICAgICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUocHJlZmFiKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgICAgICAvLyBub2RlLmdldENvbXBvbmVudChQZXRBZHZhbmNlVWkpLmluaXQodWlBY3Rpb24pO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRQcmVmYWIocGF0aCwoYXNzZXQ6Y2MuUHJlZmFiKT0+e1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUoYXNzZXQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgLy8gbm9kZS5nZXRDb21wb25lbnQoUGV0QWR2YW5jZVVpKS5pbml0KHVpQWN0aW9uKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNob3dQZXRTZXRGcmVlVWkodWlBY3Rpb246VWlBY3Rpb24scGV0X2xpc3Q6UGV0SW5mb1tdKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBwYXRoPSdwZXQvdWkvcGV0X3NldF9mcmVlX3VpJztcclxuICAgICAgICBsZXQgcHJlZmFiPXRoaXMuZ2V0UHJlZmFiKHBhdGgpO1xyXG4gICAgICAgIGlmKHByZWZhYil7XHJcbiAgICAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKHByZWZhYik7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoUGV0U2V0RnJlZVVpKS5pbml0KHVpQWN0aW9uKTtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoUGV0U2V0RnJlZVVpKS5pbml0RGF0YShwZXRfbGlzdCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFByZWZhYihwYXRoLChhc3NldDpjYy5QcmVmYWIpPT57XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShhc3NldCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChQZXRTZXRGcmVlVWkpLmluaXQodWlBY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoUGV0U2V0RnJlZVVpKS5pbml0RGF0YShwZXRfbGlzdCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzaG93UGV0UmVzZXRVaSh1aUFjdGlvbjpVaUFjdGlvbixwZXRJbmZvOlBldEluZm8pXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHBhdGg9J3BldC91aS9wZXRfcmVkdWN0aW9uX3VpJztcclxuICAgICAgICBsZXQgcHJlZmFiPXRoaXMuZ2V0UHJlZmFiKHBhdGgpO1xyXG4gICAgICAgIGlmKHByZWZhYil7XHJcbiAgICAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKHByZWZhYik7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoUGV0UmVkdWN0aW9uVWkpLmluaXQodWlBY3Rpb24pO1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChQZXRSZWR1Y3Rpb25VaSkuaW5pdERhdGEocGV0SW5mbyk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFByZWZhYihwYXRoLChhc3NldDpjYy5QcmVmYWIpPT57XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShhc3NldCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChQZXRSZWR1Y3Rpb25VaSkuaW5pdCh1aUFjdGlvbik7XHJcbiAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChQZXRSZWR1Y3Rpb25VaSkuaW5pdERhdGEocGV0SW5mbyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzaG93UGF5Rmlyc3RDaGFyZ2VVaSh1aUFjdGlvbjpVaUFjdGlvbilcclxuICAgIHtcclxuICAgICAgICBsZXQgcGF0aD0ncGF5bWVudC9wYXlfZmlyc3RfY2hhcmdlX3VpJztcclxuICAgICAgICBsZXQgcHJlZmFiPXRoaXMuZ2V0UHJlZmFiKHBhdGgpO1xyXG4gICAgICAgIGlmKHByZWZhYil7XHJcbiAgICAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKHByZWZhYik7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoUGF5Rmlyc3RDaGFyZ2VVaSkuaW5pdCh1aUFjdGlvbik7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFByZWZhYihwYXRoLChhc3NldDpjYy5QcmVmYWIpPT57XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShhc3NldCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChQYXlGaXJzdENoYXJnZVVpKS5pbml0KHVpQWN0aW9uKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBzaG93SGVscFRpcHNVaSh1aUFjdGlvbjpVaUFjdGlvbix0aXRsZUlkOm51bWJlcixjb250ZW50SWRzOm51bWJlcltdKXtcclxuICAgICAgICBsZXQgcGF0aD0naGVscF91aSc7XHJcbiAgICAgICAgbGV0IHByZWZhYj10aGlzLmdldFByZWZhYihwYXRoKTtcclxuICAgICAgICBpZihwcmVmYWIpe1xyXG4gICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShwcmVmYWIpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KEJhdHRsZVBhc3NIZWxwVWkpLmluaXQodWlBY3Rpb24pO1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChCYXR0bGVQYXNzSGVscFVpKS5pbml0RGF0YSh0aXRsZUlkLGNvbnRlbnRJZHMpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRQcmVmYWIocGF0aCwoYXNzZXQ6Y2MuUHJlZmFiKT0+e1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUoYXNzZXQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoQmF0dGxlUGFzc0hlbHBVaSkuaW5pdCh1aUFjdGlvbik7XHJcbiAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChCYXR0bGVQYXNzSGVscFVpKS5pbml0RGF0YSh0aXRsZUlkLGNvbnRlbnRJZHMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBzaG93VG93ZXJGaWdodGluZ1VpKHVpQWN0aW9uOlVpQWN0aW9uLGxldmVsOm51bWJlcilcclxuICAgIC8vIHtcclxuICAgIC8vICAgICBsZXQgcGF0aD0ndWkvaG9tZS90b3dlcl9maWdodGluZ191aSc7XHJcbiAgICAvLyAgICAgbGV0IHByZWZhYj10aGlzLmdldFByZWZhYihwYXRoKTtcclxuICAgIC8vICAgICBpZihwcmVmYWIpe1xyXG4gICAgLy8gICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShwcmVmYWIpO1xyXG4gICAgLy8gICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAvLyAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFRvd2VyRmlnaHRpbmdVaSkuaW5pdCh1aUFjdGlvbik7XHJcbiAgICAvLyAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFRvd2VyRmlnaHRpbmdVaSkuaW5pdERhdGEobGV2ZWwpO1xyXG4gICAgLy8gICAgIH1lbHNle1xyXG4gICAgLy8gICAgICAgICB0aGlzLmxvYWRQcmVmYWIocGF0aCwoYXNzZXQ6Y2MuUHJlZmFiKT0+e1xyXG4gICAgLy8gICAgICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUoYXNzZXQpO1xyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgLy8gICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoVG93ZXJGaWdodGluZ1VpKS5pbml0KHVpQWN0aW9uKTtcclxuICAgIC8vICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFRvd2VyRmlnaHRpbmdVaSkuaW5pdERhdGEobGV2ZWwpO1xyXG4gICAgLy8gICAgICAgICB9KTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9XHJcblxyXG4gICAgc2hvd1BldEFkdmFuY2VTaG93VWkodWlBY3Rpb246VWlBY3Rpb24sbm93UGV0SW5mbzpQZXRJbmZvLG9sZFBldEluZm86UGV0SW5mbylcclxuICAgIHtcclxuICAgICAgICBsZXQgcGF0aD0ncGV0L3VpL3BldF9hZHZhbnNfc2hvd191aSc7XHJcbiAgICAgICAgbGV0IHByZWZhYj10aGlzLmdldFByZWZhYihwYXRoKTtcclxuICAgICAgICBpZihwcmVmYWIpe1xyXG4gICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShwcmVmYWIpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFBldEFkdmFuY2VTaG93VWkpLmluaXQodWlBY3Rpb24pO1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChQZXRBZHZhbmNlU2hvd1VpKS5pbml0RGF0YShub3dQZXRJbmZvLG9sZFBldEluZm8pO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRQcmVmYWIocGF0aCwoYXNzZXQ6Y2MuUHJlZmFiKT0+e1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUoYXNzZXQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoUGV0QWR2YW5jZVNob3dVaSkuaW5pdCh1aUFjdGlvbik7XHJcbiAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChQZXRBZHZhbmNlU2hvd1VpKS5pbml0RGF0YShub3dQZXRJbmZvLG9sZFBldEluZm8pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9ICAgIFxyXG5cclxuICAgIC8vIHNob3dIZXJvU2tpbGxVaSh1aUFjdGlvbjpVaUFjdGlvbixoZXJvVHlwZTpIZXJvX1R5cGUsc2tpbGxQb3M6bnVtYmVyKVxyXG4gICAgLy8ge1xyXG4gICAgLy8gICAgIGxldCBwYXRoPSd1aS9ob21lL2hlcm9fc2tpbGxfdWknO1xyXG4gICAgLy8gICAgIGxldCBwcmVmYWI9dGhpcy5nZXRQcmVmYWIocGF0aCk7XHJcbiAgICAvLyAgICAgaWYocHJlZmFiKXtcclxuICAgIC8vICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUocHJlZmFiKTtcclxuICAgIC8vICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgLy8gICAgICAgICBub2RlLmdldENvbXBvbmVudChIZXJvU2tpbGxVaSkuaW5pdCh1aUFjdGlvbik7XHJcbiAgICAvLyAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KEhlcm9Ta2lsbFVpKS5pbml0RGF0YShoZXJvVHlwZSxza2lsbFBvcyk7XHJcbiAgICAvLyAgICAgfWVsc2V7XHJcbiAgICAvLyAgICAgICAgIHRoaXMubG9hZFByZWZhYihwYXRoLChhc3NldDpjYy5QcmVmYWIpPT57XHJcbiAgICAvLyAgICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShhc3NldCk7XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAvLyAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChIZXJvU2tpbGxVaSkuaW5pdCh1aUFjdGlvbik7XHJcbiAgICAvLyAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChIZXJvU2tpbGxVaSkuaW5pdERhdGEoaGVyb1R5cGUsc2tpbGxQb3MpO1xyXG4gICAgLy8gICAgICAgICB9KTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9ICBcclxuICAgIFxyXG4gICAgLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKua4uOaIj+WGhSoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG5cclxuICAgIHNob3dHYW1lTG9zZVVpKCl7XHJcbiAgICAgICAgbGV0IHBhdGg9J3VpL2dhbWUvZ2FtZV9sb3NlJztcclxuICAgICAgICBsZXQgcHJlZmFiPXRoaXMuZ2V0UHJlZmFiKHBhdGgpO1xyXG4gICAgICAgIGlmKHByZWZhYil7XHJcbiAgICAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKHByZWZhYik7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5sb2FkUHJlZmFiKHBhdGgsKGFzc2V0OmNjLlByZWZhYik9PntcclxuICAgICAgICAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKGFzc2V0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNob3dHYW1lUGF1c2VVaSgpe1xyXG4gICAgICAgIGxldCBwYXRoPSd1aS9nYW1lL2dhbWVfcGF1c2UnO1xyXG4gICAgICAgIGxldCBwcmVmYWI9dGhpcy5nZXRQcmVmYWIocGF0aCk7XHJcbiAgICAgICAgaWYocHJlZmFiKXtcclxuICAgICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUocHJlZmFiKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRQcmVmYWIocGF0aCwoYXNzZXQ6Y2MuUHJlZmFiKT0+e1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUoYXNzZXQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBzaG93Um9ndWVsaWtlVGlwKCl7XHJcbiAgICAgICAgaWYoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zY2VuZT09R2FtZVNjZW5lLmdhbWUpe1xyXG4gICAgICAgICAgICBsZXQgcGF0aD0ndWkvZ2FtZS9yb2d1ZWxpa2VfdGlwJztcclxuICAgICAgICAgICAgbGV0IHByZWZhYj10aGlzLmdldFByZWZhYihwYXRoKTtcclxuICAgICAgICAgICAgaWYocHJlZmFiKXtcclxuICAgICAgICAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKHByZWZhYik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkUHJlZmFiKHBhdGgsKGFzc2V0OmNjLlByZWZhYik9PntcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShhc3NldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBzaG93RGFtYWdlU3RhdHNVaSgpe1xyXG4gICAgICAgIGlmKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfc2NlbmU9PUdhbWVTY2VuZS5nYW1lKXtcclxuICAgICAgICAgICAgbGV0IHBhdGg9J3VpL2dhbWUvZGFtYWdlX3N0YXRzX3VpJztcclxuICAgICAgICAgICAgbGV0IHByZWZhYj10aGlzLmdldFByZWZhYihwYXRoKTtcclxuICAgICAgICAgICAgaWYocHJlZmFiKXtcclxuICAgICAgICAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKHByZWZhYik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkUHJlZmFiKHBhdGgsKGFzc2V0OmNjLlByZWZhYik9PntcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShhc3NldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbiJdfQ==