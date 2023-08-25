import WXManagerEX from "../../startscene/WXManagerEX";
import { GameMode, GameScene, Go_Type, JiaSu} from "../Constants";
import GameManager from "../GameManager";
import { HeroBaseInfoManager } from "../Hero/Data/HeroBaseInfo";
import { HeroManager } from "../Hero/Data/HeroManager";
import { Hero_Type } from "../Hero/Game/HeroConfig";
import { LevelManager } from "../Level/LevelManager";
import MonsterManager from "../Monster/MonsterManager";
import { Follow_Type } from "../multiLanguage/FollowConstants";
import FollowManager from "../multiLanguage/FollowManager";
import LanguageManager from "../multiLanguage/LanguageManager";
import { CourseTextManager } from "./CourseText";
import TutorailsManager from "./TutorailsManager";


const {ccclass, property} = cc._decorator;

@ccclass
export default class Tutorials extends cc.Component {

    close_callback:Function=null;
    ruo_time:number=5;
    t_num:number=0;


    
    //当次教程完毕
    onTutorialsComplete()
    {
        FollowManager.getInstance().followEvent(Follow_Type.新手引导+TutorailsManager.getInstance().showing_id);
        //删除节点
        TutorailsManager.getInstance().showing_id=-1;
        if(this.close_callback)
        {
            this.close_callback();
        }
        this.node.removeFromParent();
        TutorailsManager.getInstance().cur_tutorial=null;
        //TutorailsManager.getInstance().is_tutorails_state=false;
    }

    showRuoTutorials(id:number,closeCallback:Function,isLeft:boolean=true,bossPos?:cc.Vec2)
    {
        let gm=GameManager.getInstance();
        this.close_callback=closeCallback;
        this.node.removeAllChildren();
        TutorailsManager.getInstance().is_tutorails_state=true;
        // for(let i=0; i<len; i++)
        // {
        //     let json=Tutorials_Json[i];
        //     if(id==json.xs_id)
        //     {                
        //         //标题
        //         title=LanguageManager.getInstance().getStrByTextId(json.title_text_id);
        //         //内容
        //         des1=LanguageManager.getInstance().getStrByTextId(json.guidance_text_id);
        //         break;
        //     }
        // }
        //展示出来
        let idStr='t'+id;
        WXManagerEX.getInstance().resourcesBundle.load('tutorials/'+idStr,cc.Prefab,(error: Error, assets:cc.Prefab)=>{
            if(error)
            {
                console.log(error);
                return;
            }
            let node=cc.instantiate(assets);
            node.parent=this.node;
            //根据id查找
            let jsonData=CourseTextManager.getInstance().getJsonCourseText(id);            
            //英雄id
            let heroId=jsonData.hero_text_id;                
            //滚动视图
            let textScrollView=node.getChildByName('textScrollView').getComponent(cc.ScrollView);
            //图标
            let icon=textScrollView.node.getChildByName('icon').getComponent(cc.Sprite);
            if(heroId!=Hero_Type.NULL){
                icon.node.active=true;
                icon.spriteFrame=HeroManager.getInstance().getHeroBody(heroId);
            }else{
                icon.node.active=false;
            }
            //内容
            let des=LanguageManager.getInstance().getStrByTextId(jsonData.guidance_text_id);            
            let desLabel=textScrollView.content.getChildByName('desLabel').getComponent(cc.Label);            
            desLabel.string=des;
            textScrollView.scrollToBottom(0.5);
            //名字
            let name=LanguageManager.getInstance().getStrByTextId(HeroBaseInfoManager.getInstance().getNameText_ID(heroId));
            let nameLabel=textScrollView.node.getChildByName('nameLabel').getComponent(cc.Label);
            nameLabel.string=name;
            //触摸监听一下
            let touchContinue=textScrollView.node.getChildByName('touchContinue');
            let textLanguage=touchContinue.getChildByName('TextLanguage');
            let clickIcon=touchContinue.getChildByName('clickIcon');
            //翻转设置
            if(isLeft){
                textScrollView.node.x=-cc.winSize.width/2;
                textScrollView.node.scaleX=1;
                desLabel.node.scaleX=1;
                nameLabel.node.scaleX=1;
                textLanguage.scaleX=1;
                clickIcon.scaleX=1;
                clickIcon.zIndex=1;
                textLanguage.zIndex=2;
            }else{
                textScrollView.node.x=cc.winSize.width/2;
                textScrollView.node.scaleX=-1;
                desLabel.node.scaleX=-1;
                nameLabel.node.scaleX=-1;
                textLanguage.scaleX=-1;
                clickIcon.scaleX=-1;
                clickIcon.zIndex=2;
                textLanguage.zIndex=1;
            }
            let rate=GameManager.getInstance().getGameRate();
            cc.tween(clickIcon).repeatForever(cc.sequence(cc.moveBy(0.2*rate,cc.v2(0,10)),cc.moveBy(0.2*rate,cc.v2(0,-10)))).start();
            
            //
            let touchNode=node.getChildByName('touchNode');
            //bg
            let bg=node.getChildByName('bg');
            if(bg){
                //触摸穿透
                if(bg._touchListener)
                {
                    bg.on(cc.Node.EventType.TOUCH_END,()=>{
                        this.onTutorialsComplete();
                        if(id==252){
                            GameManager.getInstance().all_hero.get(Hero_Type.GongJianShou).showHero();
                            let enemys=MonsterManager.getInstance().getMonstersForNearest(1,this.node.getPosition(),1000);
                            if(enemys)
                            {
                                //最前的敌人
                                let enemyPos=enemys[0].getPosition();
                                GameManager.getInstance().all_hero.get(Hero_Type.GongJianShou).releaseSkill(enemyPos);
                            }
                        }
                    },this);
                }
            }
            switch(id)
            {
                case 201:{
                    if(gm.cur_game_scene==GameScene.home)
                    {
                        //强制显示主页
                        GameManager.getInstance().game_to_home=Go_Type.Main;
                        GameManager.getInstance().jumoAndShowUi();
                        touchNode.setPosition(bossPos);
                        node.getChildByName('touchBg').setPosition(bossPos);
                        touchContinue.active=false;
                        let finger=node.getChildByName('finger');
                        finger.setPosition(bossPos);
                        cc.tween(finger).repeatForever(cc.sequence(cc.moveBy(0.3,cc.v2(0,100)),cc.moveBy(0.3,cc.v2(0,-100)))).start();
                        touchNode.on(cc.Node.EventType.TOUCH_START,()=>{                        
                            node.getChildByName('touchBg').scale=0.9;
                        },this);
                        touchNode.on(cc.Node.EventType.TOUCH_END,()=>{                        
                            this.onTutorialsComplete(); 
                        },this);
                        //触摸穿透
                        if(touchNode._touchListener)
                        {
                            touchNode._touchListener.setSwallowTouches(false);
                        }
                    }
                }break;
                case 202:{
                    if(gm.cur_game_scene==GameScene.game)
                    {
                        touchContinue.active=false;                        
                        let heroNode=GameManager.getInstance().all_hero.get(Hero_Type.ANuBiSi).node
                        let posY=heroNode.y;
                        let posX=heroNode.x;
                        touchNode.x=posX;
                        GameManager.getInstance().all_hero.get(Hero_Type.ANuBiSi).setCD(0);
                        let finger=node.getChildByName('finger');
                        finger.x=posX;
                        finger.y=posY+70;
                        touchNode.y=posY;
                        let bg1=node.getChildByName('bg1');
                        let bg2=node.getChildByName('bg2');
                        bg1.y=posY+touchNode.height*(1-touchNode.anchorY);
                        bg2.y=posY-touchNode.height*touchNode.anchorY;
                        let bg3=node.getChildByName('bg3');
                        let bg4=node.getChildByName('bg4');
                        bg3.x=posX-touchNode.width/2;
                        bg3.y=posY;
                        bg4.y=posY;                        
                        bg4.x=posX+touchNode.width/2;
                        let t11=node.getChildByName('t11');
                        t11.setContentSize(GameManager.getInstance().all_hero.get(Hero_Type.ANuBiSi).getSkillTipSize());
                        t11.opacity=0;
                        cc.tween(finger).repeatForever(cc.sequence(cc.moveBy(1*rate,cc.v2(0,640)),cc.callFunc(()=>{
                            finger.x=posX;
                            finger.y=posY+70;
                        }),cc.delayTime(0.2*rate))).start();
                        touchNode.on(cc.Node.EventType.TOUCH_START,(e)=>{
                            textScrollView.node.active=false;
                            bg1.active=false;
                            bg2.active=false;
                            bg3.active=false;
                            bg4.active=false;
                            t11.opacity=255;
                            let pos=this.node.convertToNodeSpaceAR(e.getLocation());
                            t11.setPosition(pos);
                        },this);
                        touchNode.on(cc.Node.EventType.TOUCH_MOVE,(e:cc.Event.EventTouch)=>{
                            let pos=this.node.convertToNodeSpaceAR(e.getLocation());
                            t11.setPosition(pos);
                        })
                        touchNode.on(cc.Node.EventType.TOUCH_CANCEL,(e:cc.Event.EventTouch)=>{
                            let pos=this.node.convertToNodeSpaceAR(e.getLocation());
                            if(pos.y>GameManager.getInstance().enemy_att_y){
                                this.onTutorialsComplete();
                                GameManager.getInstance().all_hero.get(Hero_Type.ANuBiSi).releaseSkill(pos);
                            }else{
                                textScrollView.node.active=true;
                                bg1.active=true;
                                bg2.active=true;
                                bg3.active=true;
                                bg4.active=true;
                                t11.opacity=0;
                                finger.x=posX;
                                finger.y=posY+70;
                                finger.stopAllActions();
                                cc.tween(finger).repeatForever(cc.sequence(cc.moveBy(1*rate,cc.v2(0,640)),cc.callFunc(()=>{
                                    finger.x=posX;
                                    finger.y=posY+70;
                                }),cc.delayTime(0.2*rate))).start();
                            }
                        },this);
                        touchNode.on(cc.Node.EventType.TOUCH_END,()=>{
                            textScrollView.node.active=true;
                            bg1.active=true;
                            bg2.active=true;
                            bg3.active=true;
                            bg4.active=true;
                            t11.opacity=0;
                            finger.x=posX;
                            finger.y=posY+70;
                            finger.stopAllActions();
                            cc.tween(finger).repeatForever(cc.sequence(cc.moveBy(1*rate,cc.v2(0,640)),cc.callFunc(()=>{
                                finger.x=posX;
                                finger.y=posY+70;
                            }),cc.delayTime(0.2*rate))).start();
                        },this);
                        //触摸穿透
                        // if(touchNode._touchListener)
                        // {
                        //     touchNode._touchListener.setSwallowTouches(false);
                        // }
                    }
                }break;
                case 203:{
                    if(gm.cur_game_scene==GameScene.game)
                    {                        
                        //兽王打断技能，点击直接释放到boss位置                        
                        let heroNode=GameManager.getInstance().all_hero.get(Hero_Type.ShouWang).node;
                        let posY=heroNode.y;
                        let posX=heroNode.x;
                        touchNode.x=posX;
                        GameManager.getInstance().all_hero.get(Hero_Type.ShouWang).setCD(0);
                        touchContinue.active=false;                                                
                        let finger=node.getChildByName('finger');
                        finger.x=posX;
                        finger.y=posY+70;
                        touchNode.y=posY;
                        node.getChildByName('bg1').y=posY+touchNode.height*(1-touchNode.anchorY);
                        node.getChildByName('bg2').y=posY-touchNode.height*touchNode.anchorY;
                        let bg3=node.getChildByName('bg3');
                        let bg4=node.getChildByName('bg4');
                        bg3.x=posX-touchNode.width/2;
                        bg3.y=posY;
                        bg4.y=posY;                        
                        bg4.x=posX+touchNode.width/2;                        
                        cc.tween(finger).repeatForever(cc.sequence(cc.moveBy(0.3*rate,cc.v2(0,100)),cc.moveBy(0.3*rate,cc.v2(0,-100)))).start();
                        touchNode.on(cc.Node.EventType.TOUCH_START,()=>{
                            this.onTutorialsComplete();
                            GameManager.getInstance().all_hero.get(Hero_Type.ShouWang).releaseSkill(bossPos);
                        },this);
                        //触摸穿透
                        // if(touchNode._touchListener)
                        // {
                        //     touchNode._touchListener.setSwallowTouches(false);
                        // }
                    }
                }break;                
                case 204:{
                    if(gm.cur_game_scene==GameScene.game){
                        touchContinue.active=false;
                        let finger=node.getChildByName('finger');
                        finger.active=false;
                        // cc.tween(finger).repeatForever(cc.sequence(cc.moveBy(0.3,cc.v2(0,100)),cc.moveBy(0.3,cc.v2(0,-100)))).start();
                        touchNode.on(cc.Node.EventType.TOUCH_END,()=>{                        
                            this.onTutorialsComplete(); 
                        },this);
                        //触摸穿透
                        if(touchNode._touchListener)
                        {
                            touchNode._touchListener.setSwallowTouches(false);
                        }
                    }
                }break;
                case 211:{
                    if(gm.cur_game_scene==GameScene.game)
                    {
                        //触摸穿透
                        touchContinue.on(cc.Node.EventType.TOUCH_END,()=>{
                            this.onTutorialsComplete();
                        },this);
                    }
                }break;
                case 212:{
                    if(gm.cur_game_scene==GameScene.game)
                    {
                        //触摸穿透
                        touchContinue.on(cc.Node.EventType.TOUCH_END,()=>{
                            this.onTutorialsComplete();
                        },this);
                    }
                }break;
                case 213:{
                    if(gm.cur_game_scene==GameScene.game)
                    {
                        //触摸穿透
                        let finger=node.getChildByName('finger');
                        let finger2=node.getChildByName('finger2');
                                        
                        cc.tween(finger).repeatForever(cc.sequence(cc.moveBy(0.2*rate,cc.v2(30,0)),cc.moveBy(0.2*rate,cc.v2(-30,0)))).start();
                        cc.tween(finger2).repeatForever(cc.sequence(cc.moveBy(0.2*rate,cc.v2(30,0)),cc.moveBy(0.2*rate,cc.v2(-30,0)))).start();
                        
                        console.log("添加动画");
                        
                        touchContinue.on(cc.Node.EventType.TOUCH_END,()=>{
                            this.onTutorialsComplete();
                        },this);
                    }
                }break;
                case 214:{
                    if(gm.cur_game_scene==GameScene.game){
                        touchContinue.active=false;
                        let finger=node.getChildByName('finger');
                        finger.active=false;
                        //cc.tween(finger).repeatForever(cc.sequence(cc.moveBy(0.3,cc.v2(0,100)),cc.moveBy(0.3,cc.v2(0,-100)))).start();
                        touchNode.on(cc.Node.EventType.TOUCH_END,()=>{                        
                            this.onTutorialsComplete(); 
                        },this);
                        //触摸穿透
                        if(touchNode._touchListener)
                        {
                            touchNode._touchListener.setSwallowTouches(false);
                        }
                    }
                }break;
                case 221:{
                    if(gm.cur_game_scene==GameScene.game){
                        //touchContinue.active=false;
                        //let finger=node.getChildByName('finger');
                        //cc.tween(finger).repeatForever(cc.sequence(cc.moveBy(0.3,cc.v2(0,100)),cc.moveBy(0.3,cc.v2(0,-100)))).start();
                        touchNode.on(cc.Node.EventType.TOUCH_END,()=>{                        
                            this.onTutorialsComplete(); 
                        },this);
                        touchContinue.on(cc.Node.EventType.TOUCH_END,()=>{
                            this.onTutorialsComplete();
                        },this);
                        //触摸穿透
                        if(touchNode._touchListener)
                        {
                            touchNode._touchListener.setSwallowTouches(false);
                        }
                    }
                }break;                
                case 211:{
                    if(gm.cur_game_scene==GameScene.home){
                        //强制显示主页
                        GameManager.getInstance().game_to_home=Go_Type.Main;
                        GameManager.getInstance().jumoAndShowUi();
                        touchNode.setPosition(bossPos);
                        node.getChildByName('touchBg').setPosition(bossPos);
                        touchContinue.active=false;
                        let finger=node.getChildByName('finger');
                        finger.setPosition(bossPos);
                        cc.tween(finger).repeatForever(cc.sequence(cc.moveBy(0.3,cc.v2(0,100)),cc.moveBy(0.3,cc.v2(0,-100)))).start();
                        touchNode.on(cc.Node.EventType.TOUCH_END,()=>{
                            this.onTutorialsComplete();
                        },this);
                        //触摸穿透
                        if(touchNode._touchListener)
                        {
                            touchNode._touchListener.setSwallowTouches(false);
                        }
                    }
                }break;
                case 222:{
                    if(gm.cur_game_scene==GameScene.home){
                        GameManager.getInstance().game_to_home=Go_Type.City;
                        GameManager.getInstance().jumoAndShowUi();
                        touchNode.setPosition(bossPos);
                        node.getChildByName('touchBg').setPosition(bossPos);
                        touchContinue.active=false;
                        let finger=node.getChildByName('finger');
                        finger.setPosition(bossPos);
                        cc.tween(finger).repeatForever(cc.sequence(cc.moveBy(0.3,cc.v2(0,100)),cc.moveBy(0.3,cc.v2(0,-100)))).start();
                        touchNode.on(cc.Node.EventType.TOUCH_END,()=>{
                            this.onTutorialsComplete();
                        },this);
                        //触摸穿透
                        // if(touchNode._touchListener)
                        // {
                        //     touchNode._touchListener.setSwallowTouches(false);
                        // }
                    }
                }break;
                case 231:{
                    if(gm.cur_game_scene==GameScene.game){
                        touchContinue.active=false;
                        let finger=node.getChildByName('finger');
                        finger.active=false;
                        //cc.tween(finger).repeatForever(cc.sequence(cc.moveBy(0.3,cc.v2(0,100)),cc.moveBy(0.3,cc.v2(0,-100)))).start();
                        touchNode.on(cc.Node.EventType.TOUCH_END,()=>{                        
                            this.onTutorialsComplete(); 
                        },this);
                        //触摸穿透
                        if(touchNode._touchListener)
                        {
                            touchNode._touchListener.setSwallowTouches(false);
                        }
                    }
                }break;                
                case 241:{
                    if(gm.cur_game_scene==GameScene.game)
                    {
                        touchContinue.active=false;
                        let posX=1*144-288;
                        touchNode.x=posX;
                        let posY=GameManager.getInstance().all_hero.get(Hero_Type.DeLuYi).node.y;
                        GameManager.getInstance().all_hero.get(Hero_Type.DeLuYi).setCD(0);
                        let finger=node.getChildByName('finger');
                        finger.x=posX;
                        finger.y=posY+70;
                        touchNode.y=posY;
                        let bg1=node.getChildByName('bg1');
                        let bg2=node.getChildByName('bg2');
                        bg1.y=posY+touchNode.height*(1-touchNode.anchorY);
                        bg2.y=posY-touchNode.height*touchNode.anchorY;
                        let bg3=node.getChildByName('bg3');
                        let bg4=node.getChildByName('bg4');
                        bg3.x=posX-touchNode.width/2;
                        bg3.y=posY;
                        bg4.y=posY;                        
                        bg4.x=posX+touchNode.width/2;
                        let t12=node.getChildByName('12');
                        t12.opacity=0;
                        cc.tween(finger).repeatForever(cc.sequence(cc.moveBy(1*rate,cc.v2(0,800)),cc.callFunc(()=>{
                            finger.x=posX;
                            finger.y=posY+70;
                        }),cc.delayTime(0.2*rate))).start();
                        touchNode.on(cc.Node.EventType.TOUCH_START,(e:cc.Event.EventTouch)=>{
                            textScrollView.node.active=false;
                            bg1.active=false;
                            bg2.active=false;
                            bg3.active=false;
                            bg4.active=false;
                            t12.opacity=255;
                            let pos=this.node.convertToNodeSpaceAR(e.getLocation());
                            t12.setPosition(pos);
                        },this);
                        touchNode.on(cc.Node.EventType.TOUCH_MOVE,(e:cc.Event.EventTouch)=>{
                            let pos=this.node.convertToNodeSpaceAR(e.getLocation());
                            t12.setPosition(pos);
                        })
                        touchNode.on(cc.Node.EventType.TOUCH_CANCEL,(e:cc.Event.EventTouch)=>{
                            let pos=this.node.convertToNodeSpaceAR(e.getLocation());
                            if(t12.getBoundingBox().contains(bossPos)){
                                this.onTutorialsComplete();
                                GameManager.getInstance().all_hero.get(Hero_Type.DeLuYi).releaseSkill(pos);
                            }else{
                                textScrollView.node.active=true;
                                bg1.active=true;
                                bg2.active=true;
                                bg3.active=true;
                                bg4.active=true;
                                finger.x=posX;
                                finger.y=posY+70;
                                finger.stopAllActions();
                                cc.tween(finger).repeatForever(cc.sequence(cc.moveBy(1*rate,cc.v2(0,800)),cc.callFunc(()=>{
                                    finger.x=posX;
                                    finger.y=posY+70;
                                }),cc.delayTime(0.2*rate))).start();
                                t12.opacity=0;
                                t12.setPosition(pos);
                            }
                        },this);
                        touchNode.on(cc.Node.EventType.TOUCH_END,(e:cc.Event.EventTouch)=>{
                            let pos=this.node.convertToNodeSpaceAR(e.getLocation());
                            textScrollView.node.active=true;
                            bg1.active=true;
                            bg2.active=true;
                            bg3.active=true;
                            bg4.active=true;
                            finger.x=posX;
                            finger.y=posY+70;
                            finger.stopAllActions();
                            cc.tween(finger).repeatForever(cc.sequence(cc.moveBy(1*rate,cc.v2(0,800)),cc.callFunc(()=>{
                                finger.x=posX;
                                finger.y=posY+70;
                            }),cc.delayTime(0.2*rate))).start();
                            t12.opacity=0;
                            t12.setPosition(pos);
                        },this);
                        // //触摸穿透
                        // if(touchNode._touchListener)
                        // {
                        //     touchNode._touchListener.setSwallowTouches(false);
                        // }
                    }
                }break;
                case 251:{
                    if(gm.cur_game_scene==GameScene.game)
                    {
                        //触摸穿透
                        touchContinue.on(cc.Node.EventType.TOUCH_END,()=>{
                            this.onTutorialsComplete();
                        },this);
                    }
                }break;
                case 252:{
                    if(gm.cur_game_scene==GameScene.game)
                    {
                        //触摸穿透
                        touchContinue.on(cc.Node.EventType.TOUCH_END,()=>{
                            this.onTutorialsComplete();
                            GameManager.getInstance().all_hero.get(Hero_Type.GongJianShou).showHero();
                            let enemys=MonsterManager.getInstance().getMonstersForNearest(1,this.node.getPosition(),1000);
                            if(enemys)
                            {
                                //最前的敌人
                                let enemyPos=enemys[0].getPosition();
                                GameManager.getInstance().all_hero.get(Hero_Type.GongJianShou).releaseSkill(enemyPos);
                            }
                            
                        },this);
                    }
                }break;
                case 253:{
                    if(gm.cur_game_scene==GameScene.game)
                    {
                        //触摸穿透
                        touchContinue.on(cc.Node.EventType.TOUCH_END,()=>{
                            this.onTutorialsComplete();
                        },this);
                    }
                }break;
                case 261:{
                    if(gm.cur_game_scene==GameScene.game){
                        // touchContinue.active=false;
                        // let finger=node.getChildByName('finger');
                        // cc.tween(finger).repeatForever(cc.sequence(cc.moveBy(0.3,cc.v2(0,100)),cc.moveBy(0.3,cc.v2(0,-100)))).start();
                        touchContinue.on(cc.Node.EventType.TOUCH_END,()=>{
                            this.onTutorialsComplete();
                        },this);
                        // touchNode.on(cc.Node.EventType.TOUCH_END,()=>{                        
                        //     this.onTutorialsComplete(); 
                        // },this);
                        //触摸穿透
                        if(touchNode._touchListener)
                        {
                            touchNode._touchListener.setSwallowTouches(false);
                        }
                    }
                }break;
                case 219:{
                    if(gm.cur_game_scene==GameScene.home){
                        //强制显示主页
                        GameManager.getInstance().game_to_home=Go_Type.Main;
                        GameManager.getInstance().jumoAndShowUi();
                        touchNode.setPosition(bossPos);
                        node.getChildByName('touchBg').setPosition(bossPos);
                        touchContinue.active=false;
                        let finger=node.getChildByName('finger');
                        finger.setPosition(bossPos);
                        cc.tween(finger).repeatForever(cc.sequence(cc.moveBy(0.3,cc.v2(0,100)),cc.moveBy(0.3,cc.v2(0,-100)))).start();
                        touchNode.on(cc.Node.EventType.TOUCH_END,()=>{
                            this.onTutorialsComplete();
                        },this);
                        //触摸穿透
                        if(touchNode._touchListener)
                        {
                            touchNode._touchListener.setSwallowTouches(false);
                        }
                    }
                }break;
                case 301:{
                    if(gm.cur_game_scene==GameScene.game){
                        touchContinue.active=false;
                        let finger=node.getChildByName('finger');
                        cc.tween(finger).repeatForever(cc.sequence(cc.moveBy(0.3,cc.v2(0,-100)),cc.moveBy(0.3,cc.v2(0,100)))).start();
                        touchNode.on(cc.Node.EventType.TOUCH_END,()=>{                        
                            this.onTutorialsComplete(); 
                        },this);
                        //触摸穿透
                        if(touchNode._touchListener)
                        {   
                            this.onTutorialsComplete();
                            touchNode._touchListener.setSwallowTouches(false);
                        }
                    }
                }break;
                case 302:{
                    if(gm.cur_game_scene==GameScene.home){
                        touchNode.setPosition(bossPos);
                        node.getChildByName('touchBg').setPosition(bossPos);
                        touchContinue.active=false;
                        let finger=node.getChildByName('finger');
                        finger.setPosition(bossPos);
                        cc.tween(finger).repeatForever(cc.sequence(cc.moveBy(0.3,cc.v2(0,100)),cc.moveBy(0.3,cc.v2(0,-100)))).start();
                        touchNode.on(cc.Node.EventType.TOUCH_END,()=>{
                            if(HeroManager.getInstance().getHeroLevel(Hero_Type.ShouWang)>=1){
                                this.onTutorialsComplete();
                                TutorailsManager.getInstance().is_tutorails_state=false;
                            }
                        },this);
                        //触摸穿透
                        if(touchNode._touchListener)
                        {
                            touchNode._touchListener.setSwallowTouches(false);
                        }
                    }
                }break;
                case 221:{
                    if(gm.cur_game_scene==GameScene.game){
                        touchContinue.active=false;
                        let finger=node.getChildByName('finger');
                        cc.tween(finger).repeatForever(cc.sequence(cc.moveBy(0.3,cc.v2(0,100)),cc.moveBy(0.3,cc.v2(0,-100)))).start();
                        touchNode.on(cc.Node.EventType.TOUCH_END,()=>{                        
                            this.onTutorialsComplete(); 
                        },this);
                        //触摸穿透
                        if(touchNode._touchListener)
                        {
                            touchNode._touchListener.setSwallowTouches(false);
                        }
                    }
                }break;
                case 222:{
                    if(gm.cur_game_scene==GameScene.home){
                        touchNode.setPosition(bossPos);
                        node.getChildByName('touchBg').setPosition(bossPos);                        
                        let finger=node.getChildByName('finger');
                        finger.setPosition(bossPos);
                        cc.tween(finger).repeatForever(cc.sequence(cc.moveBy(0.3,cc.v2(0,100)),cc.moveBy(0.3,cc.v2(0,-100)))).start();
                        touchNode.on(cc.Node.EventType.TOUCH_END,()=>{
                            this.onTutorialsComplete();
                            TutorailsManager.getInstance().is_tutorails_state=false;
                        },this);
                        //触摸穿透
                        if(touchNode._touchListener)
                        {
                            touchNode._touchListener.setSwallowTouches(false);
                        }
                        touchContinue.active=false;
                        //touchNode.setContentSize(node.getChildByName('touchBg').)
                    }
                }break;
                case 223:{
                    if(gm.cur_game_scene==GameScene.game){
                        touchContinue.active=false;
                        let finger=node.getChildByName('finger');
                        cc.tween(finger).repeatForever(cc.sequence(cc.moveBy(0.3,cc.v2(0,100)),cc.moveBy(0.3,cc.v2(0,-100)))).start();
                        touchNode.on(cc.Node.EventType.TOUCH_END,()=>{                        
                            this.onTutorialsComplete(); 
                        },this);
                        //触摸穿透
                        if(touchNode._touchListener)
                        {
                            touchNode._touchListener.setSwallowTouches(false);
                        }
                    }
                }break;
                case 311:{
                    if(gm.cur_game_scene==GameScene.game){
                        touchContinue.active=false;
                        let finger=node.getChildByName('finger');
                        cc.tween(finger).repeatForever(cc.sequence(cc.moveBy(0.3,cc.v2(0,-100)),cc.moveBy(0.3,cc.v2(0,100)))).start();
                        touchNode.on(cc.Node.EventType.TOUCH_END,()=>{                        
                            this.onTutorialsComplete(); 
                        },this);
                        //触摸穿透
                        if(touchNode._touchListener)
                        {
                            touchNode._touchListener.setSwallowTouches(false);
                        }
                    }
                }break;
                case 312:{
                    if(gm.cur_game_scene==GameScene.home){
                        touchContinue.active=false;
                        touchNode.setPosition(bossPos);
                        node.getChildByName('touchBg').setPosition(bossPos);                        
                        let finger=node.getChildByName('finger');
                        finger.setPosition(bossPos);
                        cc.tween(finger).repeatForever(cc.sequence(cc.moveBy(0.3,cc.v2(0,100)),cc.moveBy(0.3,cc.v2(0,-100)))).start();
                        touchNode.on(cc.Node.EventType.TOUCH_END,()=>{
                            if(HeroManager.getInstance().getHeroStage(Hero_Type.PaoShou)>=0){
                                this.onTutorialsComplete();
                                TutorailsManager.getInstance().is_tutorails_state=false;
                                TutorailsManager.getInstance().saveFinish();
                            }
                        },this);
                        //触摸穿透
                        if(touchNode._touchListener)
                        {
                            touchNode._touchListener.setSwallowTouches(false);
                        }
                        // touchContinue.on(cc.Node.EventType.TOUCH_END,()=>{
                        //     this.onTutorialsComplete();
                        // },this);
                    }
                }break;
                case 331:{
                    if(gm.cur_game_scene==GameScene.game)
                    {
                        //触摸穿透
                        touchContinue.on(cc.Node.EventType.TOUCH_END,()=>{
                            this.onTutorialsComplete();
                        },this);
                    }
                }break;
                case 225:{
                    if(gm.cur_game_scene==GameScene.game){
                        touchContinue.active=false;
                        let finger=node.getChildByName('finger');
                        cc.tween(finger).repeatForever(cc.sequence(cc.moveBy(0.3,cc.v2(0,100)),cc.moveBy(0.3,cc.v2(0,-100)))).start();
                        touchNode.on(cc.Node.EventType.TOUCH_END,()=>{                        
                            this.onTutorialsComplete(); 
                        },this);
                        //触摸穿透
                        if(touchNode._touchListener)
                        {
                            touchNode._touchListener.setSwallowTouches(false);
                        }
                    }
                }break;
                case 226:{
                    if(gm.cur_game_scene==GameScene.home){
                        touchNode.setPosition(bossPos);
                        node.getChildByName('touchBg').setPosition(bossPos);                        
                        let finger=node.getChildByName('finger');
                        finger.setPosition(bossPos);
                        cc.tween(finger).repeatForever(cc.sequence(cc.moveBy(0.3,cc.v2(0,100)),cc.moveBy(0.3,cc.v2(0,-100)))).start();
                        touchNode.on(cc.Node.EventType.TOUCH_END,()=>{
                            this.onTutorialsComplete();
                        },this);
                        //触摸穿透
                        if(touchNode._touchListener)
                        {
                            touchNode._touchListener.setSwallowTouches(false);
                        }
                        touchContinue.active=false;
                    }
                }break;
                case 227:{
                    if(gm.cur_game_scene==GameScene.home){
                        touchNode.setPosition(bossPos);
                        node.getChildByName('touchBg').setPosition(bossPos);                        
                        let finger=node.getChildByName('finger');
                        finger.setPosition(bossPos);
                        cc.tween(finger).repeatForever(cc.sequence(cc.moveBy(0.3,cc.v2(0,100)),cc.moveBy(0.3,cc.v2(0,-100)))).start();
                        touchNode.on(cc.Node.EventType.TOUCH_END,()=>{
                            this.onTutorialsComplete();
                            TutorailsManager.getInstance().saveFinish();
                        },this);
                        //触摸穿透
                        if(touchNode._touchListener)
                        {
                            touchNode._touchListener.setSwallowTouches(false);
                        }
                        touchContinue.active=false;
                    }
                }break;
            }
        });
    }

}

