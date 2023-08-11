
import WXManagerEX from "../../../startscene/WXManagerEX";
import { AccessName, HttpManager } from "../.././NetWork/HttpManager";
import ApkManager from "../../Ads/ApkManager";
import { IsTestServer } from "../../Constants";
import GameData from "../../GameData";
import GameManager from "../../GameManager";
import { HeroManager } from "../../Hero/Data/HeroManager";
import { LanguageIndex, LanguageType } from "../../multiLanguage/LanguageConstants";
import LanguageManager from "../../multiLanguage/LanguageManager";
import { PropManager } from "../../Prop/PropManager";
import { SoundIndex } from "../../Sound/AudioConstants";
import UserData from "../../UserData";
import UIComponent from "../UIComponent";
import { UILayerLevel, UIPath } from "../UIConfig";
import { UIManager } from "../UIManager";
import AvatarUi from "./AvatarUi";
import MainUi from "./MainUi";


const {ccclass, property} = cc._decorator;

@ccclass
export default class SettingUi extends UIComponent {

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

    @property(cc.Sprite)
    music_sprite:cc.Sprite=null;

    @property(cc.Sprite)
    sound_sprite:cc.Sprite=null;

    @property(cc.SpriteAtlas)
    sprite_atlas:cc.SpriteAtlas=null;

    cur_select_lan:LanguageType=LanguageType.en;

    // close_callback:Function=null;

    // init(closeCallback:Function)
    // {
    //     this.close_callback=closeCallback;
    // }

    onEnable () {
        this.showName();
        this.showId();
        this.setMusic();
        this.setSound();
        this.setVersion();
        this.showAvatar();
        this.showLan();
        this.setBtnLogin();
        ApkManager.getInstance().showBanner();
    }

    setBtnLogin()
    {
        let btnFb=this.node.getChildByName('btnFb');
        //btnFb.active=IsTestServer;
        let btnGoogle=this.node.getChildByName('btnGoogle');
        //btnGoogle.active=IsTestServer;
    }

    showName()
    {
        let nameEditBox=this.node.getChildByName('info').getChildByName('nameEditBox');
        let edit=nameEditBox.getComponent(cc.EditBox);
        edit.string=UserData.getInstance().getUserName();
        edit.enabled=false;
    }

    setVersion()
    {
        //从安卓回传
        this.node.getChildByName('verStr').getComponent(cc.Label).string=LanguageManager.getInstance().getString(LanguageIndex.Version)+' '+ApkManager.getInstance().app_ver;
    }

    showAvatar()
    {
        let btnAvatar=this.node.getChildByName('info').getChildByName('headPortrait').getChildByName('btnAvatar');
        let avatarIndex=UserData.getInstance().getUserAvatar();
        // let spName='hero'+avatarIndex;
        // let spName='TY_TX_0'+avatarIndex;
        // if(avatarIndex>=10)
        // {
        //     spName='TY_TX_'+avatarIndex;
        // }
        // btnAvatar.getComponent(cc.Sprite).spriteFrame=this.getAvatar(spName);
        btnAvatar.getComponent(cc.Sprite).spriteFrame=PropManager.getInstance().getSpheadPortraitType(avatarIndex)//HeroManager.getInstance().getSpriteFrameByName(spName);
    }

    getAvatar(str:string):cc.SpriteFrame
    {
         return this.sprite_atlas.getSpriteFrame(str);
    }

    showAvatarRoot()
    {
        // UIManager.getInstance().showAvatarRoot({onClose:()=>{
        //     this.showAvatar();
        // }})
        UIManager.getInstance().showUiDialog(UIPath.AvatarRoot,UILayerLevel.Two,{onCompleted:(uiNode)=> {
            uiNode.getComponent(AvatarUi).init({onClose:()=>{
                this.showAvatar();
            }});
        },})
    }


    showId()
    {
        let idStr=this.node.getChildByName('info').getChildByName('idStr');
        idStr.getComponent(cc.Label).string=UserData.getInstance().getUserID();
    }

    clickBtnAvatar()
    {
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        this.showAvatarRoot();
    }

    clickBtnRename()
    {
        // GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        // let nameEditBox=this.node.getChildByName('info').getChildByName('nameEditBox');
        // let edit=nameEditBox.getComponent(cc.EditBox);
        // edit.enabled=true;
        // edit.focus();
    }

    onRenameFinish(editBox:cc.EditBox)
    {
        if(editBox.string!='')
        {
            // if(WXManagerEX.getInstance().checkMsg(editBox.string)==true){
            //     UserData.getInstance().saveUserName(editBox.string);
            //     this.showName();
            // }else{
            //     GameManager.getInstance().showMessage("输入内容不合法！");
            // }
            this.checkMsg(editBox.string);
        }
    }
    public checkMsg(str:string):void {
      
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            wx.cloud.callFunction({
                name: "checkMsg",
                data: {
                    text: str
                },
            })
                .then((checkTextRes) => {
                    const resultSuggest = checkTextRes.result.result.suggest;
                    if (resultSuggest === 'pass') {
                        console.log('通过');
                        UserData.getInstance().saveUserName(str);
                        this.showName();
                    } else {
                        console.log('不通过')
                        this.showName();
                        GameManager.getInstance().showMessage("输入内容不合法！");
                    }
                });
        }else{
            UserData.getInstance().saveUserName(str);
            this.showName();
        }
        
      
    }
    onClose() {
        cc.log('SettingUi');        
    }

    clickBtnClose()
    {
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        GameManager.getInstance().saveSound();
        GameManager.getInstance().refreshTopShow();
        HttpManager.post(AccessName.updateAvatar,this.getNameAndIconJsonString());
        super.onClose();
        ApkManager.getInstance().closeBanner();
    }

    showLan()
    {
        this.cur_select_lan=LanguageManager.getInstance().getCurLanguageType();        
    }

    clickSelectLan(btn,indexStr:string)
    {
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        let index=parseInt(indexStr);
        if(index!=this.cur_select_lan)
        {
            this.cur_select_lan=index;
            this.showSelectLan();
        }
    }

    showSelectLan()
    {
        let lanSelectRoot=this.node.getChildByName('lanSelectRoot');
        lanSelectRoot.active=true;
        //
        let lanRoot=lanSelectRoot.getChildByName('lanRoot');
        let select=lanSelectRoot.getChildByName('select');
        let lanType=this.cur_select_lan;
        let selectLan=lanRoot.children[lanType];
        select.x=selectLan.x + lanRoot.x;
        select.y=selectLan.y + lanRoot.y;
    }

    closeSelectLan()
    {
        let lanSelectRoot=this.node.getChildByName('lanSelectRoot');
        lanSelectRoot.active=false;
        LanguageManager.getInstance().setLanguage(this.cur_select_lan);
        cc.find('Canvas/main_ui').getComponent(MainUi).onEnable();
        this.onEnable();
    }

    clickBtnLan()
    {
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        //弹出语言选择框
        this.showSelectLan();
    }

    clickBtnOkLan()
    {
        this.scheduleOnce(()=>{
            cc.find('Canvas/main_ui').getComponent(MainUi).refreshMainTaskUi();
        },0.02);
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        this.closeSelectLan();
    }

    clickBtnEmail()
    {
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        ApkManager.getInstance().showCallMe();
    }

    clickBtnFb()
    {
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(100113));
        return;
        //同步信息，如果没有信息，则上传，上传一次信息
        ApkManager.getInstance().loginForFB((json:any)=>{            
            if(json.uid)
            {
                if(json.uid!=UserData.getInstance().getUserID())
                {
                    UserData.getInstance().saveUserID(json.uid);
                    // HttpManager.postToIssued(URL_TYPE.issued,Params_Type.coin,(data)=>{
                    //     if(data)
                    //     {
                    //         console.log(data);
                    //         //如果没有信息，
                    //         if(data.coin==0 && data.gem==0 && data.complete_level==0)
                    //         {
                    //             //需要上传本地数据
                    //             HttpManager.postToUploadAll();
                    //         }else
                    //         {
                    //             GameData.getInstance().syncData(data);
                    //         }
                    //     }                        
                    // });
                }                
            }else
            {

            }
        });
    }

    clickBtnGoogle()
    {
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(100113));
        return;
        //上传一次信息
        ApkManager.getInstance().loginForGoogle((json:any)=>{            
            if(json.uid)
            {
                if(json.uid!=UserData.getInstance().getUserID())
                {
                    UserData.getInstance().saveUserID(json.uid);                    
                    // HttpManager.postToIssued(URL_TYPE.issued,Params_Type.coin,(data)=>{
                    //     if(data)
                    //     {
                    //         console.log(data);
                    //         //如果没有信息，
                    //         if(data.coin==0 && data.gem==0 && data.complete_level==0)
                    //         {
                    //             //需要上传本地数据
                    //             HttpManager.postToUploadAll();
                    //         }else
                    //         {
                    //             GameData.getInstance().syncData(data);
                    //         }
                    //     }                        
                    // });
                }
            }else
            {

            }
        });
    }

    clickBtnExit()
    {
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        GameManager.getInstance().showDialog(LanguageManager.getInstance().getString(LanguageIndex.Do_you_really_want_to_quit_game),()=>{
            GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
            //结束游戏
            GameData.getInstance().saveExitTime();
            cc.game.end();
        },()=>{
            GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        },0);
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
        this.sound_progress.width=gms.volume*360;
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
        this.music_progress.width=ggm.volume*360;
        if(ggm.mute)
        {
            this.music_sprite.spriteFrame=this.muisc_sp[0];
        }else
        {
            this.music_sprite.spriteFrame=this.muisc_sp[1];
        }
    }

    private getNameAndIconJsonString():string{
        let uid=UserData.getInstance().getUserID();
        let icon = UserData.getInstance().getUserAvatar();
        let name = UserData.getInstance().getUserName();
        return JSON.stringify({
            uid:uid,
            avatarId:icon,
            name:name,
        });
    }

}
