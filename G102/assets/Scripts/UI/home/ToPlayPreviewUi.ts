import WXManagerEX from "../../../startscene/WXManagerEX";
import { BossChallengeManager } from "../../Activity/BossChallenge";
import { EndlessLevelsManager } from "../../Activity/EndlessLevels";
import { FightingInfo, GameMode } from "../../Constants";
import GameManager from "../../GameManager";
import { LevelManager } from "../../Level/LevelManager";
import { MissionLevelManager } from "../../Level/MissionLevel";
import { MazeManager } from "../../Maze/MazeManager";
import { MonsterConfigureManager } from "../../Monster/Data/MonsterConfigure";
import Monster from "../../Monster/Monster";
import { MonsterActionName, MonsterFaceName } from "../../Monster/MonsterData";
import { TowerLevelManager } from "../../Tower/TowerLevel";
import TowerManager from "../../Tower/TowerManager";
import UIComponent from "../UIComponent";
import { UiAction } from "../UiInterface";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ToPlayPreviewUi extends UIComponent {

    @property(cc.SpriteAtlas)
    to_play_ui:cc.SpriteAtlas = null;

    index:number = 0;
    bossIndex:number = 0;


    
    protected start(): void {
        this.refreshUi();
        
    }

    init(uiAc: UiAction) {
        super.init(uiAc);

        this.refreshUi();
    }

    refreshUi(){
        
        let level=LevelManager.getInstance().start_level;

        let fightingInfo=new FightingInfo();
        switch(GameManager.getInstance().cur_game_mode){
            case GameMode.Main:{
                fightingInfo=MissionLevelManager.getInstance().getFightingInfo(level);
            }break;
            case GameMode.Endless:{
                fightingInfo=EndlessLevelsManager.getInstance().getFightingInfo(1);
            }break;
            case GameMode.Boss_Challenge:{
                fightingInfo=BossChallengeManager.getInstance().getFightingInfo(BossChallengeManager.getInstance().cur_challenge_mode);
            }break;
            case GameMode.Maze:{
                fightingInfo=MazeManager.getInstance().getFightingInfo();
            }break;
            case GameMode.Tower:{
                fightingInfo=TowerLevelManager.getInstance().getFightingInfo(TowerManager.getTowerLevel());
            }break;
        }
        GameManager.getInstance().fighting_info=fightingInfo;
        let bg1=this.node.getChildByName('bg1');
        this.node.getChildByName("levelLabel").getComponent(cc.Label).string =fightingInfo.title_name;

        WXManagerEX.getInstance().resourcesBundle.load(fightingInfo.bg_name,cc.SpriteFrame,(error: Error, assets:cc.SpriteFrame)=>{
            if(error)
            {
                console.log(error);
                return;
            }
            bg1.getComponent(cc.Sprite).spriteFrame=assets;
        });        
        let list=fightingInfo.getOnlyMonsterDataList();
        list.forEach((v,k)=>{
            if(!MonsterConfigureManager.getInstance().getJsonMonsterConfigure(v.id)){
                cc.log(v.id);
            }
            let type=MonsterConfigureManager.getInstance().getMonsterClass(v.id);
            this.loadPrefab("" + type,v.id,v.level);
        })
    }

    private loadPrefab(type:string,key,value){
        let path = "monster/ui/Monster_" + type;
        let node:cc.Node = null;
        WXManagerEX.getInstance().resourcesBundle.load(path,cc.Prefab,(error: Error, assets:cc.Prefab)=>{  
            if(error){
                cc.log(error);
                return;
            }
            node = cc.instantiate(assets);
            // node.removeComponent(Monster);
            // node.removeComponent(cc.PolygonCollider)
            let levelNode = new cc.Node();
            levelNode.addComponent(cc.Sprite).spriteFrame = this.to_play_ui.getSpriteFrame("Prepare_Level_Bg")
            let levelLabel = new cc.Node();
            levelLabel.addComponent(cc.Label).string = "Lv."+value;
            levelLabel.getComponent(cc.Label).fontSize = 28;
            levelLabel.color = cc.color(255,255,255);
            levelLabel.getComponent(cc.Label).enableBold = true;
            levelLabel.addComponent(cc.LabelOutline).color = cc.color(27, 35, 52)
            levelLabel.getComponent(cc.LabelOutline).width = 2;
            levelLabel.parent = levelNode;
            levelLabel.setPosition(cc.v2(0,0));
            levelLabel.anchorY = 0.4;
            if(MonsterConfigureManager.getInstance().getStrengthType(key) != 3){
                node.parent = this.node.getChildByName("pos"+this.index);
                levelNode.parent = this.node.getChildByName("pos"+this.index);
                node.setPosition(cc.v2(0,0));
                levelNode.setPosition(cc.v2(0,0));
                this.index++;
                levelNode.scale = 0.7;
                node.getComponent(sp.Skeleton).setSkin(MonsterFaceName.Front + MonsterConfigureManager.getInstance().getSkin(key));
                node.getComponent(sp.Skeleton).setAnimation(0,MonsterFaceName.Front + "_" + MonsterActionName.Idle,true);
            }else{
                let bossIcon = new cc.Node();
                bossIcon.addComponent(cc.Sprite).spriteFrame = this.to_play_ui.getSpriteFrame("Prepare_Icon_Boss")
                bossIcon.parent = levelNode;
                bossIcon.setPosition(cc.v2(-60,0));
                bossIcon.anchorY = 0;
                
                node.parent = this.node.getChildByName("bossPos"+this.bossIndex);
                levelNode.parent = this.node.getChildByName("bossPos"+this.bossIndex);
                levelNode.setPosition(cc.v2(0,0));
                node.setPosition(cc.v2(0,0));
                this.bossIndex++;
                // levelNode.scale = 0.5;
                // node.getComponent(sp.Skeleton).setSkin(MonsterFaceName.SideL + MonsterConfigureManager.getInstance().getSkin(key));
                node.getComponent(sp.Skeleton).setAnimation(0,"idle",true);
            }
            // levelNode.setPosition(node.getChildByName("hp").getPosition())
            // levelNode.setPosition(cc.v2(0,0))
            levelNode.anchorY = 0;
            node.scale = MonsterConfigureManager.getInstance().getScale(key);
            levelNode.setPosition(cc.v2
                ((node.getPosition().x + node.getChildByName("hp").getPosition().x)* node.scale,
                (node.getPosition().y + node.getChildByName("hp").getPosition().y)* node.scale));
        });
    }

}
