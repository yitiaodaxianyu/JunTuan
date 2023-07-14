"use strict";
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