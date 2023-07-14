import { GameScene } from "../Constants";

import { EquipType } from "../Equipment/EquipConfig";
import { EquipmentManager } from "../Equipment/EquipmentManager";

import GameManager from "../GameManager";
import { HeroManager } from "../Hero/Data/HeroManager";
import { Hero_Type } from "../Hero/Game/HeroConfig";


import { LevelManager } from "../Level/LevelManager";
import { MissionLevelManager } from "../Level/MissionLevel";

import TutorailsManager from "../Tutorials/TutorailsManager";


const {ccclass, property} = cc._decorator;

@ccclass
export default class TestTest extends cc.Component {

    goto_scene:GameScene=GameScene.game;

    @property([cc.SpriteFrame])
    all_sp:cc.SpriteFrame[]=[];
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        GameManager.getInstance().cur_game_scene=GameScene.load;
        // for(let i=0; i<Hero_Type.Hero_Num; i++)
        // {
        //     for(let n=0; n<3; n++)
        //     {
        //         EquipmentManager.getInstance().saveAllEquipmentList();
        //     }
        // }
        
    }

    clickStart()
    {
        this.goto_scene=GameScene.game;    
        this.cheakLoadToScene();
    }

    clickBtnHome()
    {
        //let aa=EnemyJsonData.getBaseDanwei(Enemy_Type.xunjieshu);
        this.goto_scene=GameScene.home;
        this.cheakLoadToScene();
    }

    clickBtnTest()
    {
        //let aa=EnemyJsonData.getBaseDanwei(Enemy_Type.xunjieshu);
        cc.director.loadScene('zhengxing');
    }

    cheakLoadToScene()
    {
        let levelEditBox=this.node.getChildByName('levelEditBox');
        let level=levelEditBox.getComponent(cc.EditBox).string;
        let startLevel=parseInt(level);
        TutorailsManager.getInstance().saveTutorials(201);
        TutorailsManager.getInstance().saveTutorials(202);
        TutorailsManager.getInstance().saveTutorials(203);
        TutorailsManager.getInstance().saveTutorials(204);
        TutorailsManager.getInstance().saveTutorials(205);
        TutorailsManager.getInstance().saveTutorials(206);
        TutorailsManager.getInstance().saveTutorials(207);
        TutorailsManager.getInstance().saveTutorials(208);
        TutorailsManager.getInstance().saveTutorials(209);
        TutorailsManager.getInstance().saveTutorials(210);
        TutorailsManager.getInstance().saveTutorials(211);
        TutorailsManager.getInstance().saveTutorials(212);
        TutorailsManager.getInstance().saveTutorials(213);
        TutorailsManager.getInstance().saveTutorials(214);
        TutorailsManager.getInstance().saveTutorials(215);
        TutorailsManager.getInstance().saveTutorials(216);
        TutorailsManager.getInstance().saveTutorials(217);
        TutorailsManager.getInstance().saveTutorials(218);
        TutorailsManager.getInstance().saveTutorials(219);
        TutorailsManager.getInstance().saveTutorials(220);
        TutorailsManager.getInstance().saveTutorials(221);
        TutorailsManager.getInstance().saveTutorials(222);
        TutorailsManager.getInstance().saveTutorials(223);
        TutorailsManager.getInstance().saveTutorials(224);
        if(startLevel>0)
        {
            //英雄品质
            let qualityEditBox=this.node.getChildByName('qualityEditBox');
            let heroQualityStr=qualityEditBox.getComponent(cc.EditBox).string;
            let heroQuality=parseInt(heroQualityStr);
            //装备
            let equipEditBox=this.node.getChildByName('equipEditBox');
            let equipStr=equipEditBox.getComponent(cc.EditBox).string;
            let equipLevel=parseInt(equipStr);
            if(equipLevel>0){
                let em=EquipmentManager.getInstance()
                for(let i=EquipType.WuQi; i<EquipType.Num; i++){
                    for(let h=Hero_Type.ChangMaoShou; h<Hero_Type.Hero_Num; h++){


                    }                
                }
            }else{
                for(let h=Hero_Type.ChangMaoShou; h<Hero_Type.Hero_Num; h++){
                    EquipmentManager.getInstance().checkQuickUnload(h,true);
                }
            }
            
            //获取英雄
            let heroRoot=this.node.getChildByName('heroRoot');
            let shangzhenHero=new Array();
            for(let i=0; i<heroRoot.childrenCount; i++)
            {
                if(heroRoot.children[i].getComponent(cc.Toggle).isChecked)
                {
                    shangzhenHero.push(i+1);
                }
            }
            //英雄等级
            let heroLevelEditBox=this.node.getChildByName('heroLevelEditBox');
            let heroLevelStr=heroLevelEditBox.getComponent(cc.EditBox).string;
            let heroLevel=parseInt(heroLevelStr);
            
            let teamList=new Array(5);
            let shangzhenNum=0;
            let shunxu=[2,1,3,0,4];
            for(let i=0; i<5; i++)
            {
                if(i<shangzhenHero.length)
                {
                    teamList[shunxu[shangzhenNum]]=shangzhenHero[i];
                    // HeroManager.getInstance().saveHeroLevel(shangzhenHero[i],heroLevel);
                    shangzhenNum++;
                }else
                {
                    teamList[shunxu[shangzhenNum]]=-1;
                    shangzhenNum++;
                }
            }                    
            HeroManager.getInstance().saveTeamList(GameManager.getInstance().cur_game_mode,teamList);
            //设置装备数据和等级数据
            
            
            let heroList = HeroManager.getInstance().getHeroList();
            for(let i=0; i<heroList.length; i++)
            {
                // HeroManager.getInstance().saveHeroQuality(i,heroQuality);
                
            }
            //刷新数据   
            for(let i=0; i<heroList.length; i++)
            {
                HeroManager.getInstance().refreshHeroData(heroList[i].hero_type);
            }
            
            this.node.getChildByName('bg_loading').active=true;
            //获取填写的关卡数
            LevelManager.getInstance().start_level=startLevel;
            GameManager.getInstance().fighting_info=MissionLevelManager.getInstance().getFightingInfo(startLevel);
            cc.director.loadScene(this.goto_scene);
        }else
        {
            GameManager.getInstance().showMessage('关卡需要大于0或者不能为空');
        }
    }
}
