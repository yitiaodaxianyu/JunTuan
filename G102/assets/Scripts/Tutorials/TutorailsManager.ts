import { TutorialLevelManager } from "../Level/TutorialLevel";
import { CourseTextManager } from "./CourseText";
import Tutorials from "./Tutorials";

const {ccclass} = cc._decorator;
@ccclass
export default class TutorailsManager {

    private static _instance: TutorailsManager = null;
    //连贯式教程的状态,在每个教程开启后设置为true,在该教程系列最后一个教程完成后设置为false
    is_tutorails_state:boolean=false;
    cur_tutorial:Tutorials=null;

    public static getInstance():TutorailsManager
    {
        if(this._instance==null)
        {
            this._instance=new TutorailsManager();
            this._instance.init();
        }
        return this._instance;
    }

    public is_finish:boolean=true;
    public showing_id:number=-1;
    //是否完成了战斗教程
    public is_finish_game:boolean=true;

    private init()
    {
        let num=cc.sys.localStorage.getItem('tutorials_finish');
        if( num==="" || num===null)
        {
            this.is_finish=false;
            
        }else
        {
            this.is_finish=true;
        }
        let gameT=cc.sys.localStorage.getItem('tutorials_finish_game');
        if( gameT==="" || gameT===null)
        {
            this.is_finish_game=this.isShowTutorials(204)==false;            
        }else
        {
            this.is_finish_game=true;
        }        
    }
    /**是否需要显示教程id */
    public isShowTutorials(id:number):boolean
    {
        let num=cc.sys.localStorage.getItem('tutorials_'+id);
        if(num===''||num===null)
        {
            return true;
        }
        return false;
    }
    /**保存教程id，表示此id已经完成 */
    saveTutorials(id:number)
    {
        cc.sys.localStorage.setItem('tutorials_'+id,123);
    }

    saveFinish()
    {
        this.is_finish=true;
        cc.sys.localStorage.setItem('tutorials_finish',123);
    }

    saveFinishFromGame()
    {
        this.is_finish_game=true;
        cc.sys.localStorage.setItem('tutorials_finish_game',123);
    }

    //beginCallback-教程开始的回调，closeCallback-教程关闭的回调
    showTutorials(id:number,beginCallback:Function,closeCallback:Function,isLeft:boolean=true,parent?:cc.Node,bossPos?:cc.Vec2)
    {        
        if(this.isShowTutorials(id) && this.showing_id!=id)
        {
            this.is_tutorails_state=true;
            if(beginCallback)
            beginCallback();
            cc.resources.load('tutorials/tutorials_root',cc.Prefab,(error: Error, assets:cc.Prefab)=>{
                if(error)
                {
                    console.log(error);
                    return;
                }
                let node=cc.instantiate(assets);                
                let uiRoot=cc.find('Canvas/Ui_Root');
                let tutorials_root=uiRoot.getChildByName('tutorials_root');
                if(tutorials_root)
                {
                    tutorials_root.getComponent(Tutorials).onTutorialsComplete();
                }
                node.zIndex=6688;
                if(parent){
                    parent.addChild(node);
                }else{
                    uiRoot.addChild(node);
                }                
                this.cur_tutorial=node.getComponent(Tutorials);
                this.cur_tutorial.showRuoTutorials(id,closeCallback,isLeft,bossPos);
                this.showing_id=id;
            });
        }        
    }

}

