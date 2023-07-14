import GameManager from "../GameManager";
import { MusicIndex } from "./AudioConstants";


const {ccclass, property} = cc._decorator;

@ccclass
export default class Music extends cc.AudioSource {

    onLoad () {
        GameManager.getInstance().music_manager=this;
        this.loadVolume();
        this.loadMute();
    }
    onDestroy()
    {
        GameManager.getInstance().music_manager=null;        
        this.stop();
    }
    /*-----------------------------------声音的逻辑处理--------------------------------------------------*/

    loadVolume()
    {
        let vol=cc.sys.localStorage.getItem('music_volume');
        if(vol===null||vol==='')
        {
            vol=1;
        }
        this.saveMusicVolume(parseFloat(vol));        
    }

    saveMusicVolume(vol?:number)
    {
        if(vol!=undefined)
        {
            this.volume=vol;
        }        
        cc.sys.localStorage.setItem('music_volume',this.volume);
    }

    loadMute()
    {
        let mute=cc.sys.localStorage.getItem('music_mute');
        if(mute===null||mute==='')
        {
            mute=false;
        }else
        {
            if(mute==='false')
            {
                mute=false;
            }else if(mute==='true')
            {
                mute=true;
            }
        }
        this.saveMusicMute(mute);
    }

    saveMusicMute(mute?:boolean)
    {
        if(mute!=undefined)
        {
            this.mute=mute;
        }
        cc.sys.localStorage.setItem('music_mute',this.mute);
    }

    playMusic(musicIndex:MusicIndex)
    {
        cc.resources.load('musics/'+musicIndex,cc.AudioClip,(error: Error, assets:cc.AudioClip)=>{
            if(error)
            {
                console.log(error);
                return;
            }
            this.clip=assets;
            this.play();
            this.loop=true;
        });
    }

    
}
