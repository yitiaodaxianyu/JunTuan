import BattlePassHelpUi from "../BattlePass/BattlePassHelpUi";
import { GameScene } from "../Constants";
import { EquipType } from "../Equipment/EquipConfig";
import EquipExchangeUi from "../Equipment/Ui/EquipExchangeUi";
import EquipInfoUi from "../Equipment/Ui/EquipInfoUi";
import GameManager from "../GameManager";
import { Hero_Type } from "../Hero/Game/HeroConfig";
import HealingPotion from "../Maze/HealingPotion";
import MazeBuffUi from "../Maze/MazeBuffUi";
import MazeFightingUi from "../Maze/MazeFightingUi";
import MazeLeaseUi from "../Maze/MazeLeaseUi";
import MazeShop from "../Maze/MazeShop";
import MazeShowBuffUi from "../Maze/MazeShowBuffUi";
import MazeToolUi from "../Maze/MazeToolUi";
import MazeWallInfoUi from "../Maze/MazeWallInfoUi";
import PayFirstChargeUi from "../Payment/PayFirstChargeUi";
import PaymentUi from "../Payment/PaymentUi";
import { PetInfo } from "../Pet/PetConfig";
import PetAdvanceShowUi from "../Pet/Ui/PetAdvanceShowUi";
// import PetAdvanceUi from "../Pet/Ui/PetAdvanceUi";
import PetExchangeUi from "../Pet/Ui/PetExchangeUi";
import PetReductionUi from "../Pet/Ui/PetReductionUi";
import PetSetFreeUi from "../Pet/Ui/PetSetFreeUi";
import PetUpgradeUi from "../Pet/Ui/PetUpgradeUi";
import { PropAction, PropData, PropId } from "../Prop/PropConfig";
import PropInfoUi from "../Prop/PropInfoUi";
import { SoundIndex } from "../Sound/AudioConstants";
import TowerFightingUi from "../Tower/TowerFightingUi";
// import WishingTipUi from "../Wish/WishingTipUi";
import WishingUi, { WishingState } from "../Wish/WishingUi";
import ConsumptionTipUi from "./ConsumptionTipUi";
import AtrributeUi from "./home/AtrributeUi";
import AvatarUi from "./home/AvatarUi";
import BagUi from "./home/BagUi";
import ExclusiveWeaponsStrengtheningUi from "../Hero/Ui/ExclusiveWeaponsStrengtheningUi";
import GoldMallUi from "./home/GoldMallUi";
import MergeUi from "../Equipment/Ui/MergeUi";
import SettingUi from "./home/SettingUi";
import SignUi from "./home/SignUi";
import SignUiDaily from "./home/SignUiDaily";
import TakeEggUi, { TakeEggState } from "../TakeEgg/TakeEggUi";
import ToPlayMainUi from "./home/ToPlayMainUi";
import TextInfo from "./TextInfo";
import { UiAction, UiAddResult } from "./UiInterface";
import VideoTip from "./VideoTip";
import VipUi from "./VipUi";
import FastGuaJiUi from "../GuaJi/Ui/FastGuaJiUi";
import OfflineUi from "../GuaJi/Ui/OfflineUi";
import TaskUi from "../Task/TaskUi";
import ExclusiveWeaponsUi from "../Hero/Ui/ExclusiveWeaponsUi";
import GetHeroUi from "../Hero/Ui/GetHeroUi";
import HeroSkillUi from "../Hero/Ui/HeroSkillUi";
import UIPool from "./UIPool";
import { GamePreLoad, HomePreLoad, UILayerLevel, UIPath, UI_ZIndex } from "./UIConfig";
import UIComponent from "./UIComponent";
import { HttpManager } from "../NetWork/HttpManager";
import LanguageManager from "../multiLanguage/LanguageManager";
import { HeroData } from "../Hero/Data/HeroData";
import CombatNumEffect from "../CombatNumEffect";

export class Combat{
    oldHeroData:HeroData;
    newHeroData:HeroData;
    oldCombatNum:number;
    newCombatNum:number;
}

const {ccclass, property} = cc._decorator;
@ccclass
export class UIManager extends UIPool  {

    private static _instance: UIManager = null;
    map_prefabs_old: Map<string,cc.Prefab>=null;
    /**当前显示的ui */
    private cur_show_ui_path:Map<UILayerLevel,string>=null;
    public static getInstance():UIManager
    {
        if(this._instance==null)
        {
            let node=new cc.Node();
            cc.director.getScene().getChildByName("Canvas").addChild(node);
            this._instance=node.addComponent(UIManager);
            console.error("UIManager = null!")
        }
        return this._instance;
    }

    onLoad () {
        super.onLoad();
        console.log("UiManageron");
        
        UIManager._instance=this;
        this.map_prefabs_old=new Map<string,cc.Prefab>();
        this.initUi();                   
    }

    protected start(): void {
        this.cur_show_ui_path=new Map<UILayerLevel,string>();     
        this.perloadUi();
    }

    protected onDestroy(): void {
        UIManager._instance=null;
        if(this.map_prefabs_old){
            // this.map_prefabs.forEach((v,k)=>{
            //     //v.decRef();                
            // });
            this.map_prefabs_old=null;
        }
    }

    perloadUi(){
        switch(GameManager.getInstance().cur_game_scene){
            case GameScene.home:{
                HomePreLoad.forEach((v,k)=>{
                    super.addNodePool(v,1);
                })
            }break;
            case GameScene.game:{
                GamePreLoad.forEach((v,k)=>{
                    super.addNodePool(v,1);
                })
            }break;
        }
    }

    preloadUiByPath(uiPath:UIPath){
        super.addNodePool(uiPath,1);
    }

    /**统一使用加载方法 */
    private loadPrefab(path:string,onComplete:(asset: cc.Prefab) => void){
        let prefab=this.map_prefabs_old.get(path);
        if(!prefab){
            cc.resources.load(path,cc.Prefab,(error: Error, assets:cc.Prefab)=>{  
                if(error){
                    cc.log(error);
                    return;
                }
                if(this.map_prefabs_old){
                    //assets.addRef();
                    this.map_prefabs_old.set(path,assets);
                    onComplete(assets);
                }                
            });
        }
    }

    private getPrefab(path:string):cc.Prefab{
        return this.map_prefabs_old.get(path);
    }
    /**在场景切换成功后可以调用 */
    public preloadPrefab(path:string){        
        let prefab=this.map_prefabs_old.get(path);
        if(!prefab){
            cc.resources.load(path,cc.Prefab,(error: Error, assets:cc.Prefab)=>{  
                if(error){
                    cc.log(error);
                    return;
                }                
                if(this.map_prefabs_old){
                    //assets.addRef();
                    this.map_prefabs_old.set(path,assets);                    
                }                
            });
        }
    }

    initUi(){
        this.getLoadingNode().zIndex=UI_ZIndex.Loading;
        this.getTouchNode().zIndex=UI_ZIndex.UiTouch;
    }
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
    getLoadingNode():cc.Node{
        return this.node.getChildByName('bg_loading')
    }
    /**获取触摸的节点 */
    getTouchNode():cc.Node{
        return this.node.getChildByName('uiTouch')
    }
    /**
     * 显示一个UI弹窗
     * @param uiPath 该ui的resources路径
     * @param layerLevel ui层级，用于判断同一层级不能重复添加多个弹窗的标志
     * @param result 本次ui显示的结果，如果成功添加，则在onCompleted中返回该节点，否则回调至onFail
     */
    showUiDialog(uiPath:string,layerLevel:UILayerLevel,result:UiAddResult,zIndex:UI_ZIndex=UI_ZIndex.Normal){
        // console.log("_________1")
        if(this.cur_show_ui_path.has(layerLevel)&&this.cur_show_ui_path.get(layerLevel)!=UIPath.Null){
            if(result.onFail)
                result.onFail();
            return;
        }
        this.setCurShowUi(uiPath,layerLevel);
        let node=super.getNodeById(uiPath);
        if(node){
            this.node.addChild(node);            
            node.zIndex=zIndex;
            result.onCompleted(node);            
            node.getComponent(UIComponent).initUiData(uiPath,layerLevel);
        }else{
            super.addNodePool(uiPath,1,(node:cc.Node)=>{
                this.node.addChild(node);                
                node.zIndex=zIndex;
                result.onCompleted(node);
                node.getComponent(UIComponent).initUiData(uiPath,layerLevel);
            })
        }
    }
    /**显示一个特效(骨骼动画)，创建出来的节点将通过回调函数result接受 */
    showEffectDialog(uiPath:string,parent:cc.Node,animationName:string){
        let node=super.getNodeById(uiPath);
        if(node){
            // this.node.addChild(node);
            parent.addChild(node);
            let spine = node.getComponent(sp.Skeleton);
            let tracr = spine.setAnimation(0,animationName,false);
            spine.setCompleteListener(()=>{
                spine.setCompleteListener(null);
                this.hideEffectDialog(uiPath,node);
            });
            // result.onCompleted(node);
        }else{
            super.addNodePool(uiPath,1,(node:cc.Node)=>{
                // this.node.addChild(node);
                // result.onCompleted(node);
                parent.addChild(node);
                let spine = node.getComponent(sp.Skeleton);
                let tracr = spine.setAnimation(0,animationName,false);
                spine.setCompleteListener(()=>{
                    spine.setCompleteListener(null);
                    this.hideEffectDialog(uiPath,node);
                });
            });
        }
    }
    /**回收一个特效节点 */
    hideEffectDialog(uiPath:string,node:cc.Node){
        super.destroyNode(uiPath,node);
    }

    // 战斗力变化队列
    combat_queue:Array<Combat> = new Array();

    is_play_combat_effect:boolean = false;

    startCombatEffect(){
        let combat = this.combat_queue.shift();
        let combatUi = cc.find("Canvas/Ui_Root/ZhanDouLi")
        combatUi.zIndex = UI_ZIndex.Front;
        // combatUi.getComponent(CombatNumEffect).startAnimation(combat.oldCombatNum,combat.newCombatNum,combat.oldHeroData,combat.newHeroData,()=>{
        //     if(this.combat_queue.length != 0){
        //         this.startCombatEffect();
        //     }else{
        //         combatUi.active = false;
        //         this.is_play_combat_effect = false;
        //     }
        // });
        combatUi.getComponent(CombatNumEffect).startAnimation(combat.oldCombatNum,combat.newCombatNum,combat.oldHeroData,combat.newHeroData);
    }

    showCombatChangeEffect(oldCombatNum:number,newCombatNum:number,oldHeroData:HeroData,newHeroData:HeroData){
        let combat:Combat = new Combat();
        combat.oldHeroData = oldHeroData;
        combat.newHeroData = newHeroData;
        combat.oldCombatNum = oldCombatNum;
        combat.newCombatNum = newCombatNum;

        let combatUi = cc.find("Canvas/Ui_Root/ZhanDouLi");
        combatUi.active = true;
        combatUi.zIndex = UI_ZIndex.Front;
        combatUi.getComponent(CombatNumEffect).startAnimation(combat.oldCombatNum,combat.newCombatNum,combat.oldHeroData,combat.newHeroData);
        // this.combat_queue.push(combat);

        // if(this.is_play_combat_effect == false){
        //     let combatUi = cc.find("Canvas/Ui_Root/ZhanDouLi");
        //     combatUi.active = true;
        //     this.is_play_combat_effect = true;
        //     this.startCombatEffect();
        // }
    }

    /**
     * 显示网络请求UI弹窗
     */
     showWaitUiDialog(){
       let wait = this.node.getChildByName("wait_ui");
       wait.active = true;
       wait.children[0].active = true;
       wait.children[1].active = false;
       wait.children[2].active = false;
       wait.zIndex = UI_ZIndex.Front;
       this.scheduleOnce(()=>{
            wait.children[1].active = true;
            wait.children[2].active = true;
       },0.2);
       this.scheduleOnce(()=>{
            if(!HttpManager.isSuccessRes){
                this.closeWaitUiDialog();
                let s = LanguageManager.getInstance().getStrByTextId(100112);
                GameManager.getInstance().showMessage(s);
                HttpManager.isSuccessRes = true;
            }
       },5);
    }

    closeWaitUiDialog(){
        let ui=this.node.getChildByName("wait_ui");
        if(ui){
            ui.active = false;
        }
    }

    showPayWaitingUi(){
        let wait = this.node.getChildByName("wait_ui");
        wait.active = true;
        wait.children[0].active = true;
        wait.children[1].active = true;
        wait.children[2].active = true;
        wait.zIndex = UI_ZIndex.Front;
     }
 
     closePayWaitingUi(){
         let ui=this.node.getChildByName("wait_ui");
         if(ui){
             ui.active = false;
         }
     }

    closeUiDialog(uiPath:string,layerLevel:UILayerLevel,node:cc.Node){        
        //关闭时设置为null
        this.setCurShowUi(UIPath.Null,layerLevel);
        super.destroyNode(uiPath,node);
        if(uiPath==UIPath.Null){
            node.removeFromParent(false);
        }
    }
    /**关闭所有layerLevel层级以上的的弹窗 */
    closeAllUiDialog(layerLevel:UILayerLevel){        
        this.cur_show_ui_path.forEach((v,k)=>{
            if(k>=layerLevel){
                let nameIndex=v.lastIndexOf('/')
                if(nameIndex!=-1){
                    let name=v.substring(nameIndex+1);
                    let node=this.node.getChildByName(name);
                    if(node){
                        let ui=node.getComponent(UIComponent);
                        if(ui){
                            ui.onClose();  
                        }                                      
                    }
                }
                
            }
        })
    }

    setCurShowUi(uiPath:string,layerLevel:UILayerLevel){
        this.cur_show_ui_path.set(layerLevel,uiPath);
    }

    getCurShowUi(layerLevel:UILayerLevel):string{
        return this.cur_show_ui_path.get(layerLevel);
    }

    showTouchEffect(nodePos:cc.Vec2){
        let path='ui/ui_touch';
        let prefab=this.getPrefab(path);
        if(prefab){
            let node=cc.instantiate(prefab);
            this.node.addChild(node);
            node.zIndex=UI_ZIndex.UiTouch
            node.setPosition(nodePos);
            let anima=node.getComponent(cc.Animation);
            let state=anima.play();
            state.speed=1/GameManager.getInstance().getGameRate();
            anima.on(cc.Animation.EventType.FINISHED,()=>{
                node.removeFromParent();
            },this);
        }else{
            this.loadPrefab(path,(asset:cc.Prefab)=>{
                let node=cc.instantiate(asset);
                this.node.addChild(node);
                node.zIndex=UI_ZIndex.UiTouch
                node.setPosition(nodePos);
                let anima=node.getComponent(cc.Animation);
                let state=anima.play();
                state.speed=1/GameManager.getInstance().getGameRate();
                anima.on(cc.Animation.EventType.FINISHED,()=>{
                    node.removeFromParent();
                },this);
            });
        }
    }

    showTextInfo(titleText:string,contentStr:string){
        let path='ui/info/info';
        let prefab=this.getPrefab(path);
        if(prefab){
            let node=cc.instantiate(prefab);
            this.node.addChild(node);
            node.getComponent(TextInfo).showInfo(titleText,contentStr);
        }else{
            this.loadPrefab(path,(asset:cc.Prefab)=>{
                let node=cc.instantiate(asset);
                this.node.addChild(node);
                node.getComponent(TextInfo).showInfo(titleText,contentStr);
            });
        }
    }

    //---------------------------------------创建特效------------------------------------------
    showJinSheng0(parert:cc.Node)
    {
        let gm=GameManager.getInstance();
        if(gm.cur_game_scene==GameScene.home)
        {
            let path='effects/home/role_shengjie/role_shengjie_0';
            let prefab=this.getPrefab(path);
            if(prefab){
                let node=cc.instantiate(prefab);
                node.parent=parert;    
                node.getComponent(cc.Animation).on(cc.Animation.EventType.FINISHED,()=>{
                    node.removeFromParent();
                },this);
            }else{
                this.loadPrefab(path,(asset:cc.Prefab)=>{
                    let node=cc.instantiate(asset);
                    node.parent=parert;    
                    node.getComponent(cc.Animation).on(cc.Animation.EventType.FINISHED,()=>{
                        node.removeFromParent();
                    },this);
                });
            }
        }
    }

    showJinSheng1(parert:cc.Node)
    {
        let gm=GameManager.getInstance();
        if(gm.cur_game_scene==GameScene.home)
        {
            let path='effects/home/role_shengjie/role_shengjie_1';
            let prefab=this.getPrefab(path);
            if(prefab){
                let node=cc.instantiate(prefab);
                node.parent=parert;    
                node.getComponent(cc.Animation).on(cc.Animation.EventType.FINISHED,()=>{
                    node.removeFromParent();
                },this);
            }else{
                this.loadPrefab(path,(asset:cc.Prefab)=>{
                    let node=cc.instantiate(asset);
                    node.parent=parert;    
                    node.getComponent(cc.Animation).on(cc.Animation.EventType.FINISHED,()=>{
                        node.removeFromParent();
                    },this);
                });
            }
        }
    }

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


    showRoleStar(parert:cc.Node,pos:cc.Vec2){
        let gm=GameManager.getInstance();
        if(gm.cur_game_scene==GameScene.home)
        {
            let path='effects/home/role_star/role_star';
            let prefab=this.getPrefab(path);
            if(prefab){
                let node=cc.instantiate(prefab);
                node.parent=parert;    
                node.setPosition(pos);
                node.getComponent(cc.Animation).on(cc.Animation.EventType.FINISHED,()=>{
                    node.removeFromParent();
                },this);
            }else{
                this.loadPrefab(path,(asset:cc.Prefab)=>{
                    let node=cc.instantiate(asset);
                    node.parent=parert;    
                    node.setPosition(pos);
                    node.getComponent(cc.Animation).on(cc.Animation.EventType.FINISHED,()=>{
                        node.removeFromParent();
                    },this);
                });
            }
        }
    }

    showZhanDouli(parert:cc.Node,pos:cc.Vec2){
        let gm=GameManager.getInstance();
        if(gm.cur_game_scene==GameScene.home)
        {
            let path='effects/home/role_zhandouli/role_zhandouli';
            let prefab=this.getPrefab(path);
            if(prefab){
                let node=cc.instantiate(prefab);
                node.parent=parert;    
                node.setPosition(pos);
                node.getComponent(cc.Animation).on(cc.Animation.EventType.FINISHED,()=>{
                    node.removeFromParent();
                },this);
            }else{
                this.loadPrefab(path,(asset:cc.Prefab)=>{
                    let node=cc.instantiate(asset);
                    node.parent=parert;    
                    node.setPosition(pos);
                    node.getComponent(cc.Animation).on(cc.Animation.EventType.FINISHED,()=>{
                        node.removeFromParent();
                    },this);
                });
            }
        }
    }
    
    showWallUpgrade(parent:cc.Node){
        let path='effects/home/wall_upgrade/wall_upgrade';
        let prefab=this.getPrefab(path);
        if(prefab){
            let node=cc.instantiate(prefab);
            node.parent=parent;    
            node.getComponent(cc.Animation).on(cc.Animation.EventType.FINISHED,()=>{
                node.removeFromParent();
            },this);
            GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_Level);
        }else{
            this.loadPrefab(path,(asset:cc.Prefab)=>{
                let node=cc.instantiate(asset);
                node.parent=parent;    
                node.getComponent(cc.Animation).on(cc.Animation.EventType.FINISHED,()=>{
                    node.removeFromParent();
                },this);
                GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_Level);
            });
        }
    }

    /*******************************************显示页面********************************************************** */

    showEquipInfoUi(heroType:Hero_Type,equipId:number,pa:PropAction,pd:PropData,buyCallback:Function,useCallback:Function){
        
        let path='equipment/equip_info_ui'
        this.showUiDialog(path,UILayerLevel.Three,{onCompleted:(node)=>{
            // console.log("_______")
            node.getComponent(EquipInfoUi).initData(heroType,equipId,pa,pd,buyCallback,useCallback);
        }});
        return;        
    }

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

    showGetHeroUi(heroType:Hero_Type)
    {
        let path='ui/game/get_hero_ui';
        let prefab=this.getPrefab(path);
        if(prefab){
            let node=cc.instantiate(prefab);
            this.node.addChild(node);
            node.getComponent(GetHeroUi).initUi(heroType);
        }else{
            this.loadPrefab(path,(asset:cc.Prefab)=>{
                let node=cc.instantiate(asset);
                this.node.addChild(node);
                node.getComponent(GetHeroUi).initUi(heroType);
            });
        }
    }

    showUnlockHintUi()
    {
        let path='ui/game/unlock_hint';
        let prefab=this.getPrefab(path);
        if(prefab){
            let node=cc.instantiate(prefab);
            this.node.addChild(node);
        }else{
            this.loadPrefab(path,(asset:cc.Prefab)=>{
                let node=cc.instantiate(asset);
                this.node.addChild(node);
            });
        }
    }

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

    showMazeUi()
    {
        let path='maze/maze_ui';
        let prefab=this.getPrefab(path);
        if(prefab){
            let node=cc.instantiate(prefab);
            this.node.addChild(node);
        }else{
            this.loadPrefab(path,(asset:cc.Prefab)=>{
                let node=cc.instantiate(asset);
                this.node.addChild(node);
            });
        }
    }

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

    showVideoTip(yesCallback:Function,noCallback:Function)
    {
        let path='ui/game/video_tip';
        let prefab=this.getPrefab(path);
        if(prefab){
            let node=cc.instantiate(prefab);
            this.node.addChild(node);
            node.getComponent(VideoTip).init(yesCallback,noCallback);
        }else{
            this.loadPrefab(path,(asset:cc.Prefab)=>{
                let node=cc.instantiate(asset);
                this.node.addChild(node);
                node.getComponent(VideoTip).init(yesCallback,noCallback);
            });
        }
    }
    

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

    

    showMazeHealingPotionUi(uiAction:UiAction,id:number,isCanGo:boolean){
        let path='maze/maze_healing_potion_ui';
        let prefab=this.getPrefab(path);
        if(prefab){
            let node=cc.instantiate(prefab);
            this.node.addChild(node);            
            let ts=node.getComponent(HealingPotion);
            ts.init(uiAction);
            ts.initData(id,isCanGo);
        }else{
            this.loadPrefab(path,(asset:cc.Prefab)=>{
                let node=cc.instantiate(asset);
                this.node.addChild(node);
                let ts=node.getComponent(HealingPotion);
                ts.init(uiAction);
                ts.initData(id,isCanGo);
            });
        }
    }    

    showMazeBuffUi(uiAction:UiAction,id:number,isCanGo:boolean){
        let path='maze/maze_buff_ui';
        let prefab=this.getPrefab(path);
        if(prefab){
            let node=cc.instantiate(prefab);
            this.node.addChild(node);
            let ts=node.getComponent(MazeBuffUi);
            ts.init(uiAction);
            ts.initData(id,isCanGo);
        }else{
            this.loadPrefab(path,(asset:cc.Prefab)=>{
                let node=cc.instantiate(asset);
                this.node.addChild(node);
                let ts=node.getComponent(MazeBuffUi);
                ts.init(uiAction);
                ts.initData(id,isCanGo);
            });
        }
    }

    showMazeFightingUi(uiAction:UiAction,id:number,isCanGo:boolean){
        let path='maze/maze_fighting_ui';
        let prefab=this.getPrefab(path);
        if(prefab){
            let node=cc.instantiate(prefab);
            this.node.addChild(node);
            let ts=node.getComponent(MazeFightingUi);
            ts.init(uiAction);
            ts.initData(id,isCanGo);
        }else{
            this.loadPrefab(path,(asset:cc.Prefab)=>{
                let node=cc.instantiate(asset);
                this.node.addChild(node);
                let ts=node.getComponent(MazeFightingUi);
                ts.init(uiAction);
                ts.initData(id,isCanGo);
            });
        }
    }

    showMazeShopUi(uiAction:UiAction,id:number,isCanGo:boolean){
        let path='maze/maze_shop';
        let prefab=this.getPrefab(path);
        if(prefab){
            let node=cc.instantiate(prefab);
            this.node.addChild(node);
            let ts=node.getComponent(MazeShop);
            ts.init(uiAction);
            ts.initData(id,isCanGo);
        }else{
            this.loadPrefab(path,(asset:cc.Prefab)=>{
                let node=cc.instantiate(asset);
                this.node.addChild(node);
                let ts=node.getComponent(MazeShop);
                ts.init(uiAction);
                ts.initData(id,isCanGo);
            });
        }
    }

    showMazeToolUi(uiAction:UiAction){
        let path='maze/maze_tool_ui';
        let prefab=this.getPrefab(path);
        if(prefab){
            let node=cc.instantiate(prefab);
            this.node.addChild(node);
            let ts=node.getComponent(MazeToolUi);
            ts.init(uiAction);
        }else{
            this.loadPrefab(path,(asset:cc.Prefab)=>{
                let node=cc.instantiate(asset);
                this.node.addChild(node);
                let ts=node.getComponent(MazeToolUi);
                ts.init(uiAction);
            });
        }
    }

    showMazeBagUi(){
        let path='maze/maze_bag_ui';
        let prefab=this.getPrefab(path);
        if(prefab){
            let node=cc.instantiate(prefab);
            this.node.addChild(node);
        }else{
            this.loadPrefab(path,(asset:cc.Prefab)=>{
                let node=cc.instantiate(asset);
                this.node.addChild(node);
            });
        }
    }

    showMazeBuffInfo(buffId:number){
        let path='maze/maze_show_buff';
        let prefab=this.getPrefab(path);
        if(prefab){
            let node=cc.instantiate(prefab);
            this.node.addChild(node);
            let ts=node.getComponent(MazeShowBuffUi);
            ts.initData(buffId);
        }else{
            this.loadPrefab(path,(asset:cc.Prefab)=>{
                let node=cc.instantiate(asset);
                this.node.addChild(node);
                let ts=node.getComponent(MazeShowBuffUi);
                ts.initData(buffId);
            });
        }
    }

    showMazeSendDoorUi(){
        let path='maze/maze_send_door_ui';
        let prefab=this.getPrefab(path);
        if(prefab){
            let node=cc.instantiate(prefab);
            this.node.addChild(node);
        }else{
            this.loadPrefab(path,(asset:cc.Prefab)=>{
                let node=cc.instantiate(asset);
                this.node.addChild(node);
            });
        }
    }

    showMazeWallInfoUi(uiAction:UiAction){
        let path='maze/maze_wall_info';
        let prefab=this.getPrefab(path);
        if(prefab){
            let node=cc.instantiate(prefab);
            this.node.addChild(node);
            node.getComponent(MazeWallInfoUi).init(uiAction);
        }else{
            this.loadPrefab(path,(asset:cc.Prefab)=>{
                let node=cc.instantiate(asset);
                this.node.addChild(node);
                node.getComponent(MazeWallInfoUi).init(uiAction);
            });
        }
    }

    showMazeLeaseUi(uiAction:UiAction,id:number,isCanGo:boolean){
        let path='maze/maze_lease_ui';
        let prefab=this.getPrefab(path);
        if(prefab){
            let node=cc.instantiate(prefab);
            this.node.addChild(node);
            let ts=node.getComponent(MazeLeaseUi);
            ts.init(uiAction);
            ts.initData(id,isCanGo);
        }else{
            this.loadPrefab(path,(asset:cc.Prefab)=>{
                let node=cc.instantiate(asset);
                this.node.addChild(node);
                let ts=node.getComponent(MazeLeaseUi);
                ts.init(uiAction);
                ts.initData(id,isCanGo);
            });
        }
    }

    showPropInfo(uiAction:UiAction,propAc:PropAction,pd:PropData,buyCallback:Function,useCallback:Function){
        let path='prop/prop_info_ui';
        let prefab=this.getPrefab(path);
        if(prefab){
            let node=cc.instantiate(prefab);
            this.node.addChild(node);
            let ts=node.getComponent(PropInfoUi);
            ts.init(uiAction);
            ts.initData(pd,propAc);
            ts.addBuyListen(buyCallback);
            ts.addUseListen(useCallback);
        }else{
            this.loadPrefab(path,(asset:cc.Prefab)=>{
                let node=cc.instantiate(asset);
                this.node.addChild(node);
                let ts=node.getComponent(PropInfoUi);
                ts.init(uiAction);
                ts.initData(pd,propAc);
                ts.addBuyListen(buyCallback);
                ts.addUseListen(useCallback);
            });
        }
    }
    
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

    showConsumptionTipUi(uiAction:UiAction,currencyType:PropId,currencyNum:number,sureCallBack:Function)
    {
        let path='consumption_tip_ui';
        let prefab=this.getPrefab(path);
        if(prefab){
            let node=cc.instantiate(prefab);
            this.node.addChild(node);
            node.getComponent(ConsumptionTipUi).init(uiAction);
            node.getComponent(ConsumptionTipUi).initCallBack(currencyType,currencyNum,sureCallBack);
        }else{
            this.loadPrefab(path,(asset:cc.Prefab)=>{
                let node=cc.instantiate(asset);
                this.node.addChild(node);
                node.getComponent(ConsumptionTipUi).init(uiAction);
                node.getComponent(ConsumptionTipUi).initCallBack(currencyType,currencyNum,sureCallBack);
            });
        }
    }

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

    showPetUpgradeUi(uiAction:UiAction,petInfo:PetInfo)
    {
        let path='pet/ui/pet_upgrade_ui';
        let prefab=this.getPrefab(path);
        if(prefab){
            let node=cc.instantiate(prefab);
            this.node.addChild(node);
            node.getComponent(PetUpgradeUi).init(uiAction);
            node.getComponent(PetUpgradeUi).initUi(petInfo);
        }else{
            this.loadPrefab(path,(asset:cc.Prefab)=>{
                let node=cc.instantiate(asset);
                this.node.addChild(node);
                node.getComponent(PetUpgradeUi).init(uiAction);
                node.getComponent(PetUpgradeUi).initUi(petInfo);
            });
        }
    }

    showEquipExchangeUi(uiAction:UiAction,equipId:number,heroType:Hero_Type,equipPos:EquipType)
    {
        let path='equipment/equip_exchange_ui';
        this.showUiDialog(path,UILayerLevel.Three,{onCompleted:(node)=>{
            // console.log("_______")
            node.getComponent(EquipExchangeUi).init(uiAction);
            node.getComponent(EquipExchangeUi).initData(equipId,heroType,equipPos);
        }});
        return
        
    }


    showPetExchangeUi(uiAction:UiAction,petInfo:PetInfo,heroType:Hero_Type)
    {
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
    }

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

    showPayUi(uiAction:UiAction,showIndex:number)
    {
        let path='payment/payment_ui';
        this.showUiDialog(path,UILayerLevel.One,{onCompleted:(node)=>{
            let ts=node.getComponent(PaymentUi);
            ts.init(uiAction);
            ts.initData(showIndex);
        }});
        return;
        let prefab=this.getPrefab(path);
        if(prefab){
            let node=cc.instantiate(prefab);
            this.node.addChild(node);
            let ts=node.getComponent(PaymentUi);
            ts.init(uiAction);
            ts.initData(showIndex);
        }else{
            this.loadPrefab(path,(asset:cc.Prefab)=>{
                let node=cc.instantiate(asset);
                this.node.addChild(node);
                let ts=node.getComponent(PaymentUi);
                ts.init(uiAction);
                ts.initData(showIndex);
            });
        }
    }

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
    
    showPetAddvanceUi(uiAction:UiAction)
    {
        let path='pet/ui/pet_advance_ui';
        let prefab=this.getPrefab(path);
        if(prefab){
            let node=cc.instantiate(prefab);
            this.node.addChild(node);
            // node.getComponent(PetAdvanceUi).init(uiAction);
        }else{
            this.loadPrefab(path,(asset:cc.Prefab)=>{
                let node=cc.instantiate(asset);
                this.node.addChild(node);
                // node.getComponent(PetAdvanceUi).init(uiAction);
            });
        }
    }

    showPetSetFreeUi(uiAction:UiAction,pet_list:PetInfo[])
    {
        let path='pet/ui/pet_set_free_ui';
        let prefab=this.getPrefab(path);
        if(prefab){
            let node=cc.instantiate(prefab);
            this.node.addChild(node);
            node.getComponent(PetSetFreeUi).init(uiAction);
            node.getComponent(PetSetFreeUi).initData(pet_list);
        }else{
            this.loadPrefab(path,(asset:cc.Prefab)=>{
                let node=cc.instantiate(asset);
                this.node.addChild(node);
                node.getComponent(PetSetFreeUi).init(uiAction);
                node.getComponent(PetSetFreeUi).initData(pet_list);
            });
        }
    }

    showPetResetUi(uiAction:UiAction,petInfo:PetInfo)
    {
        let path='pet/ui/pet_reduction_ui';
        let prefab=this.getPrefab(path);
        if(prefab){
            let node=cc.instantiate(prefab);
            this.node.addChild(node);
            node.getComponent(PetReductionUi).init(uiAction);
            node.getComponent(PetReductionUi).initData(petInfo);
        }else{
            this.loadPrefab(path,(asset:cc.Prefab)=>{
                let node=cc.instantiate(asset);
                this.node.addChild(node);
                node.getComponent(PetReductionUi).init(uiAction);
                node.getComponent(PetReductionUi).initData(petInfo);
            });
        }
    }

    showPayFirstChargeUi(uiAction:UiAction)
    {
        let path='payment/pay_first_charge_ui';
        let prefab=this.getPrefab(path);
        if(prefab){
            let node=cc.instantiate(prefab);
            this.node.addChild(node);
            node.getComponent(PayFirstChargeUi).init(uiAction);
        }else{
            this.loadPrefab(path,(asset:cc.Prefab)=>{
                let node=cc.instantiate(asset);
                this.node.addChild(node);
                node.getComponent(PayFirstChargeUi).init(uiAction);
            });
        }
    }
    
    showHelpTipsUi(uiAction:UiAction,titleId:number,contentIds:number[]){
        let path='help_ui';
        let prefab=this.getPrefab(path);
        if(prefab){
            let node=cc.instantiate(prefab);
            this.node.addChild(node);
            node.getComponent(BattlePassHelpUi).init(uiAction);
            node.getComponent(BattlePassHelpUi).initData(titleId,contentIds);
        }else{
            this.loadPrefab(path,(asset:cc.Prefab)=>{
                let node=cc.instantiate(asset);
                this.node.addChild(node);
                node.getComponent(BattlePassHelpUi).init(uiAction);
                node.getComponent(BattlePassHelpUi).initData(titleId,contentIds);
        });
        }
    }

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

    showPetAdvanceShowUi(uiAction:UiAction,nowPetInfo:PetInfo,oldPetInfo:PetInfo)
    {
        let path='pet/ui/pet_advans_show_ui';
        let prefab=this.getPrefab(path);
        if(prefab){
            let node=cc.instantiate(prefab);
            this.node.addChild(node);
            node.getComponent(PetAdvanceShowUi).init(uiAction);
            node.getComponent(PetAdvanceShowUi).initData(nowPetInfo,oldPetInfo);
        }else{
            this.loadPrefab(path,(asset:cc.Prefab)=>{
                let node=cc.instantiate(asset);
                this.node.addChild(node);
                node.getComponent(PetAdvanceShowUi).init(uiAction);
                node.getComponent(PetAdvanceShowUi).initData(nowPetInfo,oldPetInfo);
            });
        }
    }    

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

    showGameLoseUi(){
        let path='ui/game/game_lose';
        let prefab=this.getPrefab(path);
        if(prefab){
            let node=cc.instantiate(prefab);
            this.node.addChild(node);
        }else{
            this.loadPrefab(path,(asset:cc.Prefab)=>{
                let node=cc.instantiate(asset);
                this.node.addChild(node);
            });
        }
    }

    showGamePauseUi(){
        let path='ui/game/game_pause';
        let prefab=this.getPrefab(path);
        if(prefab){
            let node=cc.instantiate(prefab);
            this.node.addChild(node);
        }else{
            this.loadPrefab(path,(asset:cc.Prefab)=>{
                let node=cc.instantiate(asset);
                this.node.addChild(node);
            });
        }
    }

    showDamageStatsUi(){
        if(GameManager.getInstance().cur_game_scene==GameScene.game){
            let path='ui/game/damage_stats_ui';
            let prefab=this.getPrefab(path);
            if(prefab){
                let node=cc.instantiate(prefab);
                this.node.addChild(node);
            }else{
                this.loadPrefab(path,(asset:cc.Prefab)=>{
                    let node=cc.instantiate(asset);
                    this.node.addChild(node);
                });
            }
        }
    }
}

