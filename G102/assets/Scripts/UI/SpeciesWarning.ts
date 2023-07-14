import { GameState } from "../Constants";
import GameManager from "../GameManager";

import { SoundIndex } from "../Sound/AudioConstants";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SpeciesWarning extends cc.Component {

    init (enemy:cc.Node) {
        GameManager.getInstance().sound_manager.playSound(SoundIndex.boss);
        this.loadEnemyDes(enemy);
    }

    loadEnemyDes(enemy:cc.Node)
    {
        // cc.resources.load('enemy/enemy_des',cc.JsonAsset,(error: Error, assets:cc.JsonAsset)=>{
        //     if(error)
        //     {
        //         console.log(error);
        //         return;
        //     }
        //     let enemyDes=assets.json;
            
        // });
        this.setBossInfo(enemy);
    }

    setBossInfo(enemy:cc.Node)
    {
        // let enemyTS=enemy.getComponent(Enemy);
        // //设置动画
        // let boss=new cc.Node();
        // boss.parent=this.node;
        // boss.setPosition(cc.v2(0,17));
        // let sk=boss.addComponent(sp.Skeleton);
        // let enemySK=enemy.getComponent(sp.Skeleton);
        // sk.skeletonData=enemySK.skeletonData;
        // if(enemyTS.enemy_type!=Enemy_Type.xunjieshu)
        // {
        //     sk.animation='animation';
        // }else
        // {
        //     sk.animation='daiji';
        // }
        // //设置简介
        // let lanType=LanguageManager.getInstance().getCurLanguageType();
        // let id=MonsterDataManager.getInstance().getMonsterIdByType(enemyTS.enemy_type);
        // let nameId=MonsterAttributeManager.getInstance().getMosterName_TextID(id);
        // let enemyName=LanguageManager.getInstance().getStrByTextId(nameId);
        // let name=this.node.getChildByName('name');
        // name.getComponent(cc.Label).string=enemyName;
        // let des=this.node.getChildByName('des');
        // let txId=MonsterAttributeManager.getInstance().getFeature(id);
        // let desId=MonsterFeatureManager.getInstance().getFeatureDiscribe_TextID(txId);
        // des.getComponent(cc.Label).string=LanguageManager.getInstance().getStrByTextId(desId);
    }

    clickBtnContinue()
    {
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        GameManager.getInstance().cur_game_state=GameState.Game_Playing;        
        this.node.removeFromParent();
        //添加一个Boss警告
        GameManager.getInstance().showBossWarning();
    }
}
