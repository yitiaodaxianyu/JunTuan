import WXManagerEX from "../../startscene/WXManagerEX";
import { TableMonsterData } from "../Level/MissionLevel";
import { MonsterConfigureManager } from "../Monster/Data/MonsterConfigure";
import Monster from "../Monster/Monster";
import { MonsterActionName, MonsterFaceName } from "../Monster/MonsterData";
import TextLanguage from "../multiLanguage/TextLanguage";
import { UILayerLevel, UIPath } from "../UI/UIConfig";
import { UIManager } from "../UI/UIManager";
import TowerFightingUi from "./TowerFightingUi";
import { TowerLevelManager } from "./TowerLevel";
import TowerManager from "./TowerManager";
import { TowerRewardManager } from "./TowerReward";


const {ccclass, property} = cc._decorator;

@ccclass
export default class BtnTower extends cc.Component {

    level:number=null;

    init (level:number) {
        this.level=level;
        this.initData();
        this.refreshData();
    }

    private initData(){
        let data = TowerLevelManager.getInstance().getFightingInfo(this.level)
        this.node.getChildByName('levelLabel').getComponent(TextLanguage).setTextId(100020);
        this.node.getChildByName('levelLabel').getComponent(TextLanguage).setReplaceValue('~',this.level + '');
        //是否有宝箱
        // let extraReward=TowerRewardManager.getInstance().getExtraReward(this.level);
        // let reward=this.node.getChildByName('reward');
        // reward.active=extraReward>0;
        // let spName=extraReward?"Tower_Main_1":"Tower_Main_0"
        // this.node.getComponent(cc.Sprite).spriteFrame=TowerManager.getInstance().getSpByName(spName);
        // let shadow=this.node.getChildByName('shadow');
        // spName=extraReward?"Tower_Shadow_1":"Tower_Shadow_0"
        // shadow.getComponent(cc.Sprite).spriteFrame=TowerManager.getInstance().getSpByName(spName);
        
        this.node.getChildByName("bg").scaleX = this.level % 2 == 0 ? -1 : 1;
        let towerLevel=TowerManager.getTowerLevel();
        if(towerLevel > this.level){
            this.node.getChildByName("bg").children.forEach((v,k) => {
                v.active = false;
            });
            this.node.getChildByName("bg").getChildByName("monsterRoot").active = false;
            this.node.getChildByName("reward").getComponentInChildren(cc.Sprite).spriteFrame = TowerManager.getInstance().getSpByName("Tower_Chesk_1");
            this.node.getChildByName("reward").getComponentInChildren(cc.Button).enabled = false;
            this.node.getChildByName("bg").getComponent(cc.Sprite).spriteFrame = TowerManager.getInstance().getSpByName("Tower_Bg_1_1");
        }else{
            let monsterList = data.getOnlyMonsterDataList();
            this.sortMonster(monsterList);
            let type=MonsterConfigureManager.getInstance().getMonsterClass(monsterList[0].id);
            this.loadPrefab(type+"",monsterList[0].id);
            this.node.getChildByName("bg").getComponent(cc.Sprite).spriteFrame = TowerManager.getInstance().getSpByName("Tower_Bg_1");
        }
    }

    refreshData(){
        //根据完成的关卡设置可见属性
        let towerLevel=TowerManager.getTowerLevel();
        // this.setDoor(towerLevel);
    }

    setDoor(towerLevel:number){
        //设置门的显示状态
        let door=this.node.getChildByName('door');
        let doorSp=door.getComponent(cc.Sprite);
        let fire=door.getChildByName('fire');
        //火把
        let an1=this.node.getChildByName("Torch1").getComponent(cc.Animation);
        let an2=this.node.getChildByName("Torch2").getComponent(cc.Animation);
        //遮罩
        let shadow=this.node.getChildByName('shadow');
        if(towerLevel>this.level){
            //已经完成
            doorSp.spriteFrame=TowerManager.getInstance().getSpByName("Tower_Door_0");
            fire.active=false;
            an1.enabled=false;
            an2.enabled=false;
            shadow.active=true;            
        }else if(towerLevel==this.level){
            //正在挑战
            doorSp.spriteFrame=TowerManager.getInstance().getSpByName("Tower_Door_1");
            fire.active=true;
            an1.enabled=true;
            an2.enabled=true;
            shadow.active=false;
        }else{
            //还未挑战
            doorSp.spriteFrame=TowerManager.getInstance().getSpByName("Tower_Door_2");
            fire.active=false;
            an1.enabled=true;
            an2.enabled=true;
            shadow.active=false;
        }
    }

    //显示解锁过程
    showUnlonkProcess0(){
        //设置门的显示状态
        let door=this.node.getChildByName('door');
        let doorSp=door.getComponent(cc.Sprite);
        let fire=door.getChildByName('fire');
        doorSp.spriteFrame=TowerManager.getInstance().getSpByName("Tower_Door_1");
        fire.active=true;
        //火把
        let an1=this.node.getChildByName("Torch1").getComponent(cc.Animation);
        let an2=this.node.getChildByName("Torch2").getComponent(cc.Animation);        
        an1.enabled=true;
        an2.enabled=true;
        //遮罩
        let shadow=this.node.getChildByName('shadow');
        shadow.active=false;
    }

    showUnlonkProcess1(){
        //设置门的显示状态
        this.refreshData();
        //遮罩
        let shadow=this.node.getChildByName('shadow');
        shadow.opacity=0;
        cc.tween(shadow).to(0.5,{opacity:255}).start();
        this.node.getChildByName("Torch1").getComponent(cc.Sprite).spriteFrame=TowerManager.getInstance().getSpByName('Torch');
        this.node.getChildByName("Torch2").getComponent(cc.Sprite).spriteFrame=TowerManager.getInstance().getSpByName('Torch');     
    }

    sortMonster(list:TableMonsterData[]){
        list.sort((a,b) => {
            let at = MonsterConfigureManager.getInstance().getStrengthType(a.id);
            let bt = MonsterConfigureManager.getInstance().getStrengthType(b.id);
            return bt - at;
        });
    }
    
    private loadPrefab(type:string,id){
        let path = "monster/ui/Monster_" + type;
        let node:cc.Node = null;
        WXManagerEX.getInstance().resourcesBundle.load(path,cc.Prefab,(error: Error, assets:cc.Prefab)=>{  
            if(error){
                cc.log(error);
                return;
            }
            node = cc.instantiate(assets);
            // node.removeComponent(Monster);
            // node.removeComponent(cc.PolygonCollider);
            node.parent = this.node.getChildByName("bg").getChildByName("monsterRoot");
            node.setPosition(cc.v2(0,0));
            if(MonsterConfigureManager.getInstance().getStrengthType(id) != 3){
                node.scale = MonsterConfigureManager.getInstance().getScale(id) * 1.5;
                node.getComponent(sp.Skeleton).setSkin(MonsterFaceName.SideL + MonsterConfigureManager.getInstance().getSkin(id));
                node.getComponent(sp.Skeleton).setAnimation(0,MonsterFaceName.SideR + "_" + MonsterActionName.Idle,true);
            }else{
                node.getComponent(sp.Skeleton).setAnimation(0,"idle",true);
            }
        });
    }

    
    onClickPreviewBtn(){
        // UIManager.getInstance().showTowerFightingUi(null,this.level);
        UIManager.getInstance().showUiDialog(UIPath.TowerFightting,UILayerLevel.One,{onCompleted:(uiNode)=> {
            uiNode.getComponent(TowerFightingUi).init(null);
            uiNode.getComponent(TowerFightingUi).initData(this.level);
        },})
    }

}
