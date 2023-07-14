import GameManager from "../GameManager";
import { SoundIndex } from "./AudioConstants";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Sound extends cc.Component {

    private cur_play_audio:cc.AudioClip=null;
    //private all_audio:cc.AudioClip[]=[];
    private map_audio:Map<string,cc.AudioClip>=new Map();
    public volume:number=0;
    public mute:boolean=false;

    onLoad () {
        GameManager.getInstance().sound_manager=this;
        this.loadVolume();
        this.loadMute();
        this.loadAllAudioAsset();
    }
    onDestroy()
    {
        GameManager.getInstance().sound_manager=null;
    }
    loadAllAudioAsset()
    {
        //根据游戏场景加载对应的音效资源        
        cc.resources.loadDir('sounds/'+GameManager.getInstance().cur_game_scene,cc.AudioClip,(error: Error, assets:cc.AudioClip[])=>{
            if(error)
            {
                console.log(error);
                return;
            }
            //this.all_audio=assets;
            //将数组内容存在map
            let len=assets.length;
            for(let i=0; i<len; i++)
            {
                let audio=assets[i];
                this.map_audio.set(audio.name,audio);
            }
        });
    }

    /*-----------------------------------声音的逻辑处理--------------------------------------------------*/

    loadVolume()
    {
        let vol=cc.sys.localStorage.getItem('sound_volume');
        if(vol===null||vol==='')
        {
            vol=1;
        }
        this.saveSoundVolume(parseFloat(vol));        
    }

    saveSoundVolume(vol?:number)
    {
        if(vol!=undefined)
        {
            this.volume=vol;
        }        
        cc.sys.localStorage.setItem('sound_volume',this.volume);
    }

    loadMute()
    {
        let mute=cc.sys.localStorage.getItem('sound_mute');
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
        this.saveSoundMute(mute);
    }

    saveSoundMute(mute?:boolean)
    {
        if(mute!=undefined)
        {
            this.mute=mute;
        }
        cc.sys.localStorage.setItem('sound_mute',this.mute);
    }

    playSound(soundIndex:SoundIndex):number
    {
        let audioIndex=0;
        if(this.mute==false && this.volume>0)
        {
            //查找音效
            //let len=this.all_audio.length;
            let playAudio=this.map_audio.get(soundIndex);
            // for(let i=0; i<len; i++)
            // {
            //     let audio=this.all_audio[i];
            //     if(soundIndex==audio.name)
            //     {
            //         playAudio=audio;
            //         break;
            //     }
            // }
            if(playAudio)
            {
                if(this.cur_play_audio!=playAudio)
                {
                    this.cur_play_audio=playAudio;
                    audioIndex=cc.audioEngine.play(this.cur_play_audio,false,this.volume);
                }
            }else
            {
                cc.resources.load('sounds/'+GameManager.getInstance().cur_game_scene+'/'+soundIndex,cc.AudioClip,(error: Error, assets:cc.AudioClip)=>{
                    if(error)
                    {
                        console.log(error);
                        return;
                    }
                    this.cur_play_audio=assets;
                    audioIndex=cc.audioEngine.play(this.cur_play_audio,false,this.volume);
                });
            }
        }
        return audioIndex;
    }

    // playSoundByAudioClip(clip: cc.AudioClip, loop: boolean=false):number
    // {
    //     return cc.audioEngine.playEffect(clip,loop);
    // }
    
    

    lateUpdate()
    {
        //防止每一帧同时播放多个相同的音效
        this.cur_play_audio=null;
    }           
}
