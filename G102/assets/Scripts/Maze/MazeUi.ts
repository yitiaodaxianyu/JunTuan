import MazeBox from "./MazeBox";
import { MazeRoadManager } from "./Data/MazeRoad";
// import { RogueHexagonTypesManager } from "./Data/RogueHexagonTypes";
import { RogueHexagonTypesManager } from "../copy/voidcrack/RogueHexagonTypes";
import { MazeManager } from "./MazeManager";
import GameManager from "../GameManager";
import { MusicIndex, SoundIndex } from "../Sound/AudioConstants";
import { UIManager } from "../UI/UIManager";
import FixedPos from "../UI/home/FixedPos";
import LanguageManager from "../multiLanguage/LanguageManager";
import { GameScene, Go_Type } from "../Constants";


const {ccclass, property} = cc._decorator;

@ccclass
export default class MazeUi extends cc.Component {

    private static _instance: MazeUi = null;
    @property({type:cc.Prefab,tooltip:"格子预制体"})
    prefab_box:cc.Prefab=null;
    
    @property({type:cc.Prefab,tooltip:"箭头预制体"})
    prefab_arrow:cc.Prefab=null;

    @property({type:cc.Prefab,tooltip:"门预制体"})
    prefab_door:cc.Prefab=null;

    @property(cc.SpriteAtlas)
    maze_sp:cc.SpriteAtlas=null;

    board_box:Array<Array<cc.Node>>=null;
    /**当前关的层数 */
    cur_floor_num:number=1;
    /**当前迷宫的层数 */
    cur_layout_num:number=1;

    public static getInstance():MazeUi
    {        
        return this._instance;
    }

    onLoad () {
        MazeUi._instance=this;       
        this.adaptation();        
        MazeManager.getInstance().checkDate();
        MazeManager.getInstance().recoverHeroBind();
    }

    protected onDestroy(): void {
        MazeUi._instance=null;
    }

    adaptation(){
        //上下模块
        let bottom=this.node.getChildByName('bottom');
        let top=this.node.getChildByName('top');
        let wp=cc.winSize;
        bottom.y=-wp.height/2;
        top.y=wp.height/2;
        this.node.getChildByName('scrollView').y=bottom.y+bottom.height;
    }

    start () {
        this.cur_layout_num=MazeManager.getInstance().getFloor();
        this.board_box=new Array<Array<cc.Node>>();
        let boxIdList=MazeManager.getInstance().getGroundBoxIdList();
        if(boxIdList.length==0){
            this.initBoard();
        }else{
            this.createBoard(boxIdList);
        }
        let floorStr=LanguageManager.getInstance().getStrByTextId(100020).replace('~',MazeManager.getInstance().getFloor()+'');
        let str=LanguageManager.getInstance().getStrByTextId(830001)+": "+floorStr;
        this.node.getChildByName('top').getChildByName('title').getComponent(cc.Label).string=str;
        //GameManager.getInstance().music_manager.playMusic(MusicIndex.BGM_RogueBgm);
        this.schedule(()=>{
            MazeManager.getInstance().getRemainTime();
        },1);
    }
    /**初始化迷宫棋牌 */
    initBoard(){
        let content=this.node.getChildByName('scrollView').getComponent(cc.ScrollView).content;
        content.removeAllChildren();
        //从下往上
        let bottom=0;
        let intervalX=180;
        let intervalY=140;
        //奇数行最左的位置
        let oddLeft=-180;
        //偶数行最左的位置
        let evenLeft=oddLeft+intervalX/2;
        let maxCC=3;
        let maxRR=9;
        let boards=MazeRoadManager.getInstance().getMazeRoad();
        let lastYY=0;
        let boxIdList=new Array();
        for(let r=1; r<=maxRR; r++){
            let nodes=new Array();
            let isEven=r%2==0;
            let ccArr=[];
            let rIdList=new Array();
            for(let c=1; c<=maxCC; c++){
                if(isEven&&c==maxCC)
                {
                    break;
                }
                let rIndex=r-1;
                let cIndex=c-1;
                if(boards[rIndex][cIndex]>0){ 
                    ccArr.push(c);
                }
                
            }
            for(let c=1; c<=maxCC; c++){                
                if(isEven&&c==maxCC)
                {
                    break;
                }
                let rIndex=r-1;
                let cIndex=c-1;
                if(boards[rIndex][cIndex]>0){
                    let startX=isEven?evenLeft:oddLeft;
                    let xx=startX+cIndex*intervalX;
                    let yy=bottom+intervalY*r;
                    let ccIndex=Math.floor(Math.random()*ccArr.length);
                    let id=RogueHexagonTypesManager.getId(this.cur_layout_num,r,ccArr[ccIndex]);
                    let box=cc.instantiate(this.prefab_box);
                    content.addChild(box);
                    box.zIndex=100-r;
                    box.x=xx;
                    box.y=yy;
                    nodes.push(box);
                    box.getComponent(MazeBox).init(r,c,id);
                    box.name=''+id;
                    lastYY=yy;
                    ccArr.splice(ccIndex,1);
                    rIdList.push(id);
                }else{
                    rIdList.push(0);
                }
            }
            this.board_box.push(nodes);
            boxIdList.push(rIdList);
        }        
        let door=cc.instantiate(this.prefab_door);
        door.y=lastYY+door.height*door.scale;
        content.addChild(door);
        content.height=maxRR*intervalY+265*2+door.height*door.scale;
        this.refreshFloor();
        MazeManager.getInstance().saveGroundBoxIdList(boxIdList);
    }
    /**生成迷宫棋盘 */
    createBoard(list:number[][]){
        let content=this.node.getChildByName('scrollView').getComponent(cc.ScrollView).content;
        content.removeAllChildren();
        //从下往上
        let bottom=0;
        let intervalX=180;
        let intervalY=140;
        //奇数行最左的位置
        let oddLeft=-180;
        //偶数行最左的位置
        let evenLeft=oddLeft+intervalX/2;
        let maxCC=3;
        let maxRR=9;
        let boards=MazeRoadManager.getInstance().getMazeRoad();
        let lastYY=0;
        for(let r=1; r<=maxRR; r++){
            let nodes=new Array();
            let isEven=r%2==0;
            for(let c=1; c<=maxCC; c++){                
                if(isEven&&c==maxCC)
                {
                    break;
                }
                let rIndex=r-1;
                let cIndex=c-1;
                if(boards[rIndex][cIndex]>0){                    
                    let startX=isEven?evenLeft:oddLeft;
                    let xx=startX+cIndex*intervalX;
                    let yy=bottom+intervalY*r;
                    let id=list[rIndex][cIndex];
                    let box=cc.instantiate(this.prefab_box);
                    content.addChild(box);
                    box.zIndex=100-r;
                    box.x=xx;
                    box.y=yy;
                    nodes.push(box);
                    box.getComponent(MazeBox).init(r,c,id);
                    box.name=''+id;
                    lastYY=yy;
                    
                }
            }
            this.board_box.push(nodes);
        }        
        let door=cc.instantiate(this.prefab_door);
        door.y=lastYY+door.height*door.scale;
        content.addChild(door);
        content.height=maxRR*intervalY+265*2+door.height*door.scale;
        this.refreshFloor();
    }
    
    refreshFloor(){
        this.removeAllArrow();
        let boxRoot=this.node.getChildByName('scrollView').getComponent(cc.ScrollView).content;
        let len=boxRoot.childrenCount;
        let passedIds=MazeManager.getInstance().getMazePassedIds();
        let lastPassedId=passedIds[passedIds.length-1];
        this.cur_floor_num=RogueHexagonTypesManager.getInstance().getRows(lastPassedId);
        for(let r=0; r<len; r++){
            let mazeBox=boxRoot.children[r].getComponent(MazeBox);
            if(mazeBox&&mazeBox.node.active){
                mazeBox.refreshBox();
            }
        }
        boxRoot.getChildByName('door').active=this.cur_floor_num>=9&&this.cur_layout_num<=1;
        this.showWallInfo(); 
    }

    showWallInfo(){
        let btnWallInfo=this.node.getChildByName('top').getChildByName('btnWallInfo');
        let progressBar=btnWallInfo.getChildByName('progressBar');
        let per=MazeManager.getInstance().getMazeHp()/MazeManager.getInstance().getMazeMaxHp();
        progressBar.getComponent(cc.ProgressBar).progress=per;
        let num=btnWallInfo.getChildByName('num');
        num.getComponent(cc.Label).string=(per*100).toFixed(1)+'%';               
    }

    showArrow(node:cc.Node){
        let content=this.node.getChildByName('scrollView').getComponent(cc.ScrollView).content;
        let arrow=cc.instantiate(this.prefab_arrow);
        this.node.getChildByName('scrollView').getChildByName('arrowRoot').addChild(arrow);
        arrow.setPosition(cc.v2(node.x,node.y+-content.parent.height/2+300));
        arrow.getComponent(FixedPos).init(node,cc.v2(0,-content.parent.height/2+300),content)
    }

    removeAllArrow(){
        this.node.getChildByName('scrollView').getChildByName('arrowRoot').removeAllChildren();
    }

    getSpByName(name:string):cc.SpriteFrame{
        return this.maze_sp.getSpriteFrame(name);
    }

    jumpToNextFloor(){
        this.start();
    }

    clickBtnMazeBox(btn:cc.Event.EventTouch){
        let mb=btn.getCurrentTarget().getComponent(MazeBox);
        
    }

    clickBtnClose(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        GameManager.getInstance().music_manager.playMusic(MusicIndex.BGM_Fuben);
        this.node.removeFromParent();
        MazeManager.getInstance().resetHeroBind();
        if(GameManager.getInstance().cur_game_scene==GameScene.game){
            GameManager.getInstance().game_to_home=Go_Type.Activity;
            GameManager.getInstance().backToHome();
        }
    }

    clickBtnBag(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        UIManager.getInstance().showMazeBagUi();
    }

    clickBtnRepair(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        UIManager.getInstance().showMazeToolUi({
            onClose:()=>{

            }
        });
    }

    clickBtnWallInfo(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        UIManager.getInstance().showMazeWallInfoUi({
            onRefresh:()=>{

            }
        });
    }
}
