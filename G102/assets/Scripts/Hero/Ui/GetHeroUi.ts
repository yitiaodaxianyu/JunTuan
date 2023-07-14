import { Btn_Index, GameMode, GameScene, Go_Type } from "../../Constants";
import GameManager from "../../GameManager";
import { HeroManager } from "../../Hero/Data/HeroManager";
import { Hero_Type } from "../../Hero/Game/HeroConfig";
import { SoundIndex } from "../../Sound/AudioConstants";
import TutorailsManager from "../../Tutorials/TutorailsManager";
import UIComponent from "../../UI/UIComponent";


const {ccclass, property} = cc._decorator;

@ccclass
export default class GetHeroUi extends UIComponent {

    hero_type:Hero_Type=Hero_Type.ChangMaoShou;

    initUi(heroType:Hero_Type)
    {
        //设置头像
        let icon=this.node.getChildByName('mask').getChildByName('icon');
        icon.getComponent(cc.Sprite).spriteFrame=HeroManager.getInstance().getHeroSpriteFrame(heroType);
    
        HeroManager.setHeroIsNeedTip(heroType);
        this.hero_type=heroType;
        this.node.zIndex=3;
        
        if(!TutorailsManager.getInstance().is_finish_game)
        {
            if(TutorailsManager.getInstance().isShowTutorials(203))
            {
                TutorailsManager.getInstance().showTutorials(203,()=>{
                    TutorailsManager.getInstance().saveTutorials(203);                    
                },()=>{
                    this.clickBtnJump();
                });
            }
        }
        let teamList=HeroManager.getInstance().getTeamList(GameMode.Main);
        let index=teamList.indexOf(heroType)
        if(index>=0){
            HeroManager.getInstance().loadHeroData(heroType);
            GameManager.getInstance().loadGameHeroData();
            GameManager.getInstance().game.loadHero(heroType,index);
        }        
    }

    clickBtnClose()
    {
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        super.onClose();
    }

    clickBtnJump()
    {
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        //
        super.onClose();
        let curScene=GameManager.getInstance().cur_game_scene;
        switch(curScene){
            case GameScene.game:{
                GameManager.getInstance().game_to_home=Go_Type.Role;
                GameManager.getInstance().role_show_hero=this.hero_type;
                GameManager.getInstance().backToHome(this.hero_type);
            }break;
            case GameScene.home:{
                GameManager.getInstance().role_show_hero=this.hero_type;
                GameManager.getInstance().jumoToUi(Btn_Index.Btn_Role);
            }break;
        }
        
    }
}
