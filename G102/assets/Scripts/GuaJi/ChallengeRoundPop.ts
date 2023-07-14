// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { GameMode } from "../Constants";
import GameManager from "../GameManager";
import { FirstCompleteRewardManager } from "../Level/FirstCompleteReward";
import { LevelManager } from "../Level/LevelManager";
import { MissionLevelManager } from "../Level/MissionLevel";
import LanguageManager from "../multiLanguage/LanguageManager";
import TextLanguage from "../multiLanguage/TextLanguage";
import { PropManager } from "../Prop/PropManager";
import TutorailsManager from "../Tutorials/TutorailsManager";
import MainUi from "../UI/home/MainUi";
import ToPlayMainUi from "../UI/home/ToPlayMainUi";
import { UIPath, UILayerLevel } from "../UI/UIConfig";
import { UIManager } from "../UI/UIManager";
import MapManager from "./MapManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ChallengeRoundPop extends cc.Component {

    // @property(cc.Label)
    // label: cc.Label = null;

    // @property
    // text: string = 'hello';


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    level:number=0//关卡节点代表的是哪个关卡   默认1
    @property(cc.Node)
    prop: cc.Node = null;
    @property(cc.Node)
    Common_Btn_0:cc.Node = null;//开始按钮
    @property(cc.Node)
    Btn_Close:cc.Node = null;//关闭按钮
    
    @property(cc.Node)
    lqu:cc.Node[] = [];//已领取文字
    @property(cc.Node)
    Mask:cc.Node[] = [];//黑布

    @property(cc.Node)
    leveltxt:cc.Node = null;//关卡

    @property(cc.Node)
    Main_Icon_Boss:cc.Node = null;//boss头像

    @property(cc.Node)
    bg:cc.Node = null;//背景
    
    start () {
        this.Btn_Close.on(cc.Node.EventType.TOUCH_END,this.onBtn_Close,this);
        this.bg.on(cc.Node.EventType.TOUCH_END,this.onBtn_Close,this);
        this.Common_Btn_0.on(cc.Node.EventType.TOUCH_END,this.clickBtnStart,this);
    }
    init(level){
        this.level=level
        this.leveltxt.getComponent(cc.Label).string=""+MissionLevelManager.getInstance().getLevelName(level)
        let myCurrentlevel=LevelManager.getInstance().finish_level+1;//当前最大关卡
        for (let index = 0; index < this.prop.children.length; index++) {
            this.prop.children[index].destroy()
        }
        this.node.active=true
        let Starnumber=0;
        if(level<myCurrentlevel){
            for (let LevelStarindex = 1; LevelStarindex <4; LevelStarindex++) {
                if(LevelManager.getInstance().getALevelStar(level,LevelStarindex)){
                    Starnumber++
                }
            }
        }
        for (let Maskindex = 0; Maskindex < this.Mask.length; Maskindex++) {
            if(Maskindex<Starnumber){
                this.Mask[Maskindex].active=true
                this.lqu[Maskindex].active=true
                
            }else{
                this.Mask[Maskindex].active=false
                this.lqu[Maskindex].active=false
            } 
        }
        for (let Starindex = 1; Starindex <= 3; Starindex++) {
            let levelId=FirstCompleteRewardManager.getId(level,Starindex);//默认3个都完成  

            let RewardData=FirstCompleteRewardManager.getInstance().getFirstRewardArr(levelId);
            for (let level3 = 0; level3 < RewardData.length; level3++) {
                let rewardData=RewardData[level3];
                //可以获得奖品
                // this.scheduleOnce(()=>{
                    // console.log("_______",rewardData.reward_id,rewardData.reward_num)
                    let item=PropManager.getInstance().createPropItem(rewardData.reward_id,rewardData.reward_num);
                    item.scale=0.82;
                    item.parent=this.prop;
                    item.x=-67+level3*90;
                    item.y=190-Starindex*115+115;//第三颗星在最下面

                    // item.x=-67+level3*90;
                    // item.y=-40+Starindex*115-115;//第三颗星在最上面
                // },level3*0.1);
                // PropManager.getInstance().changePropNum(rewardData.reward_id,rewardData.reward_num);
            }
        }
        if(level>myCurrentlevel){
            this.Common_Btn_0.getChildByName("kszd").getComponent(TextLanguage).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
            this.Common_Btn_0.getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
        }else{
            this.Common_Btn_0.getChildByName("kszd").getComponent(TextLanguage).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
            this.Common_Btn_0.getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
        }

        if(MissionLevelManager.getInstance().getLevelTypes(level)==3){
            this.Main_Icon_Boss.active=true
        }else{
            this.Main_Icon_Boss.active=false
        }
    }
    clickBtnStart()//开始游戏
    {

        // @ts-ignore
        if(this.Common_Btn_0.getComponent(cc.Sprite).getMaterial(0)._name== 'builtin-2d-gray-sprite (Instance)'){
            GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(100100))//该关卡尚未解锁
            return
        }
        this.onBtn_Close()
        if(!TutorailsManager.getInstance().is_finish_game)
        {
            // console.log("+6")
            LevelManager.getInstance().start_level=MapManager.Currentlevel=LevelManager.getInstance().finish_level+1;
            cc.find("Canvas/main_ui").getComponent(MainUi).clickBtnStart()
            return
        }
        GameManager.getInstance().cur_game_mode=GameMode.Main;
        MapManager.Currentlevel=this.level;
        UIManager.getInstance().showUiDialog(UIPath.ToPlay,UILayerLevel.One,{onCompleted:(uiNode)=> {
            uiNode.getComponent(ToPlayMainUi).init({onClose:()=>{
                // this.cur_selected_level=LevelManager.getInstance().start_level;                    
                GameManager.getInstance().refreshZhanliShow();
            }});
        },})
    }
    onBtn_Close(){
        for (let index = 0; index < this.prop.children.length; index++) {
            this.prop.children[index].destroy()
        }
        this.node.active=false
    }

    // update (dt) {}
}
