import { GameState, GameMode, Go_Type } from "../../Constants";
import GameManager from "../../GameManager";
import { HeroManager } from "../../Hero/Data/HeroManager";
import { Hero_Type } from "../../Hero/Game/HeroConfig";
import { LevelManager } from "../../Level/LevelManager";
import { Follow_Type } from "../../multiLanguage/FollowConstants";
import FollowManager from "../../multiLanguage/FollowManager";
import { LanguageIndex } from "../../multiLanguage/LanguageConstants";
import LanguageManager from "../../multiLanguage/LanguageManager";
import TextLanguage from "../../multiLanguage/TextLanguage";
import { SoundIndex } from "../../Sound/AudioConstants";
import UIComponent from "../../UI/UIComponent";
import StatsUi from "./StatsUi";


const {ccclass, property} = cc._decorator;

@ccclass
export default class GamePause extends UIComponent {

    @property([cc.SpriteFrame])
    show_sp:cc.SpriteFrame[]=[];

    @property([cc.SpriteFrame])
    sound_sp:cc.SpriteFrame[]=[];

    @property([cc.SpriteFrame])
    muisc_sp:cc.SpriteFrame[]=[];

    @property(cc.Slider)
    music_slider:cc.Slider=null;

    @property(cc.Slider)
    sound_slider:cc.Slider=null;

    @property(cc.Node)
    music_progress:cc.Node=null;

    @property(cc.Node)
    sound_progress:cc.Node=null;

    @property(cc.Node)
    Background:cc.Node=null;
    

    @property(cc.Node)
    qian:cc.Node=null;
    

    @property(cc.Sprite)
    music_sprite:cc.Sprite=null;

    @property(cc.Sprite)
    sound_sprite:cc.Sprite=null;


    @property(cc.Node)
    Tipspop:cc.Node=null;
    
    onEnable(){
        this.Tipspop.active=false
        
        FollowManager.getInstance().followEvent(Follow_Type.暂停页展示次数);
        this.showShow();
        this.setMusic();
        this.setSound();
    }


    clickBtnContinue()
    {
        this.destroySelf();
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        GameManager.getInstance().cur_game_state=GameState.Game_Playing;
    }

    clickBtnExit()
    {        
        
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        if(GameManager.getInstance().cur_game_mode==GameMode.Main){
            FollowManager.getInstance().followEvent(Follow_Type.暂停页面_返回主页按钮点击次数);
            this.destroySelf();
            GameManager.getInstance().backToHome();
            
        }else if(GameManager.getInstance().cur_game_mode==GameMode.Maze){
            FollowManager.getInstance().followEvent(Follow_Type.暂停页面_返回主页按钮点击次数);
            cc.director.resume();
            this.destroySelf();
            GameManager.getInstance().game_to_home=Go_Type.Activity;//暂停
            GameManager.getInstance().backToHome();         //暂停  
            
        }
        else{
            cc.director.resume();
            GameManager.getInstance().game_to_home=Go_Type.Activity;//暂停
        // GameManager.getInstance().showDialog(LanguageManager.getInstance().getString(LanguageIndex.GiveUpGame),()=>{
            this.destroySelf();//暂停
            if(GameManager.getInstance().cur_game_mode==GameMode.Endless){
                FollowManager.getInstance().followEvent(Follow_Type.无尽挑战_暂停页面_返回主页按钮点击次数);
            }
            if(GameManager.getInstance().cur_game_mode==GameMode.Boss_Challenge){
                FollowManager.getInstance().followEvent(Follow_Type.BOSS挑战_暂停页面_返回主页按钮点击次数);
            }

            this.scheduleOnce(function(){
                GameManager.getInstance().showGameLose();//胜利  
            },0.1)
            // 
            // GameManager.getInstance().backToHome();         //暂停     
        // },()=>{

        // })
        }        
    }    

    
    clickBtnTisi()
    {      
        if(GameManager.getInstance().cur_game_mode==GameMode.Main||GameManager.getInstance().cur_game_mode==GameMode.Maze){
            this.Tipspop.getChildByName("texts").getComponent(TextLanguage).setTextId(100111)
        } else{
            this.Tipspop.getChildByName("texts").getComponent(TextLanguage).setTextId(820019)
        }
        this.Tipspop.active=true
    }
        
    clickBtnquxiao()
    {       
        this.Tipspop.active=false
    }
    destroySelf()
    {
        FollowManager.getInstance().followEvent(Follow_Type.退出挑战关卡+LevelManager.getInstance().start_level);
        cc.director.resume();        
        super.onClose();
    }

    showShow()
    {
        // let show=this.node.getChildByName('show');
        // let qian=this.node.getChildByName("Node").getChildByName("Test").getChildByName('qian');
        let isShow=GameManager.getInstance().is_show_text;
        this.qian.x=isShow?190:126;
        this.qian.getComponent(cc.Sprite).spriteFrame=this.show_sp[isShow?1:0];
    }

    clickBtnShow()
    {
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        GameManager.getInstance().is_show_text=!GameManager.getInstance().is_show_text;
        this.showShow();
    }
 

    //++++++++++++++++++++++++++++++++++++++++++音效设置++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    clickBtnSound(b:cc.Event.EventTouch)
    {
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        if(GameManager.getInstance().sound_manager.volume>0)
        {
            GameManager.getInstance().sound_manager.mute=!GameManager.getInstance().sound_manager.mute;
            this.setSound();
        }
    }

    clickBtnMusic(b:cc.Event.EventTouch)
    {
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        if(GameManager.getInstance().music_manager.volume>0)
        {
            GameManager.getInstance().music_manager.mute=!GameManager.getInstance().music_manager.mute;
            this.setMusic();
        }        
    }

    touchSoundSlider(e:cc.Slider)
    {
        GameManager.getInstance().sound_manager.volume=e.progress;
        if(e.progress>0)
        {
            GameManager.getInstance().sound_manager.mute=false;
        }else
        {
            GameManager.getInstance().sound_manager.mute=true;
        }
        this.setSound();
    }

    touchSoundSliderEnd(e:cc.Slider)
    {
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        GameManager.getInstance().saveSound();
    }

    touchMusicSlider(e:cc.Slider)
    {
        GameManager.getInstance().music_manager.volume=e.progress;
        if(e.progress>0)
        {
            GameManager.getInstance().music_manager.mute=false;
        }else
        {
            GameManager.getInstance().music_manager.mute=true;
        }
        this.setMusic();
    }

    touchMusicSliderEnd(e:cc.Slider)
    {
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        GameManager.getInstance().saveSound();
    }

    setSound()
    {
        let gms=GameManager.getInstance().sound_manager;
        this.sound_slider.progress=gms.volume;
        this.sound_progress.width=gms.volume*this.Background.width;
        if(gms.mute)
        {
           this.sound_sprite.spriteFrame=this.sound_sp[0];
        }else
        {
            this.sound_sprite.spriteFrame=this.sound_sp[1];
        }
    }
    
    setMusic()
    {
        let ggm=GameManager.getInstance().music_manager;
        this.music_slider.getComponent(cc.Slider).progress=ggm.volume;
        this.music_progress.width=ggm.volume*this.Background.width;
        if(ggm.mute)
        {
            this.music_sprite.spriteFrame=this.muisc_sp[0];
        }else
        {
            this.music_sprite.spriteFrame=this.muisc_sp[1];
        }
    }

}
