// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameManager from "../../GameManager";
import { SoundIndex } from "../../Sound/AudioConstants";
import UIComponent from "../../UI/UIComponent";
import { UIPath, UILayerLevel } from "../../UI/UIConfig";
import { UIManager } from "../../UI/UIManager";
import endlesschallenges from "../endlesschallenges/endlesschallenges";
import playinstructions from "../endlesschallenges/playinstructions";
import Shop from "../endlesschallenges/Shop";
import BattlePop from "./BattlePop";
import { RogueHexagonTypesManager } from "./RogueHexagonTypes";
import Windfall from "./Windfall";
// import playinstructions from "./playinstructions";
// import Shop from "./Shop";

const {ccclass, property} = cc._decorator;

@ccclass
export default class VoidScene extends UIComponent {
    @property(cc.Node)
    cellnode: cc.Node = null;//格子节点
    @property(cc.Node)
    cell: cc.Node = null;//格子节点的父节点

    @property(cc.Node)
    Player: cc.Node = null;//人物棋子  跟随移动

    type:number=1//这次打的是哪一层

    /**行数 */
    Rowsnumber:number=1//打到那一行了   默认从第一行开始
    /**位置数 */
    Positionnumber:number=2//选择的是哪个位置   默认从第2个位置开始
    pos:number=-620//格子的初始y轴
    jiange:number=117//每个格子的间隔

    cellnodeindex:cc.Node[]=[]//存储所有的格子
    @property(cc.SpriteFrame)//物品的类型
    HexagonType:cc.SpriteFrame[]=[]
    @property(cc.SpriteFrame)//物品的类型的阴影
    HexagonTypeShadow:cc.SpriteFrame[]=[]

    @property(cc.Node)
    Tipspop: cc.Node = null;//提示弹窗、
    
    initUi(type,Rowsnumber,Positionnumber) {//虚空裂缝   层数   行数   位置数
        
        this.type=type//层数
        this.Rowsnumber=Rowsnumber//行数
        this.Positionnumber=Positionnumber//位置数
        this.Tipspop.active=false
        // console.log("------",this.type,this.Rowsnumber,this.Positionnumber)
        let length=this.cellnodeindex.length
        for (let index = 9; index>length; index--) {
            let cell=cc.instantiate(this.cellnode)
            cell.y=this.pos+(index*this.jiange)
            cell.active=true
            cell.name=""+index
            this.cellnodeindex.push(cell)
            cell.parent=this.cell

            for (let btnindex = 0; btnindex < cell.children.length; btnindex++) {
                // for (let myindex = 0; myindex < cell.children[btnindex].children.length; myindex++) {
                    // console.log("_)",index,(btnindex+1))
                    cell.children[btnindex].getChildByName("Maze_Bg_1_2").on(cc.Node.EventType.TOUCH_END,(()=>{
                        this.clickBtnGoods(index,(btnindex+1))   
                    }),this);
                // }
            }
        }   
        // user:
        // 0-起点
        // 1-战斗
        // 2.宝箱
        // 3.治疗
        // 4.租借
        // 5.Boss

        // user:
        // 0-起点
        // 1-战斗
        // 2.宝箱
        // 3.精英战斗
        // 4.租借
        // 5.Boss
        // 6.治疗

        //所有的格子除了阴影，全部东西隐藏
        for (let cellnodeindexindex = 0; cellnodeindexindex < this.cellnodeindex.length; cellnodeindexindex++) {
            for (let index = 0; index < this.cellnodeindex[cellnodeindexindex].children.length; index++) {
                this.cellnodeindex[cellnodeindexindex].children[index].active=false
                for (let myindex = 0; myindex < this.cellnodeindex[cellnodeindexindex].children[index].children.length; myindex++) {
                    this.cellnodeindex[cellnodeindexindex].children[index].children[myindex].active=false
                }
                
            }
        }
        this.Refresh()
    }   
    Refresh(){//刷新格子的状态
        let Allid=RogueHexagonTypesManager.getInstance().getAllLayerId(this.type)
        for (let allidindex = 0; allidindex < Allid.length; allidindex++) {
            let id=Allid[allidindex]
            let Rows=RogueHexagonTypesManager.getInstance().getRows(id)//行数
            let Position=RogueHexagonTypesManager.getInstance().getPosition(id)//位置
            let HexagonType=RogueHexagonTypesManager.getInstance().getHexagonType(id)//类型
            
            let mynode=this.cell.getChildByName(""+Rows).children[(Position-1)]
            mynode.active=true

            if(Rows==this.Rowsnumber&&Position==this.Positionnumber){//人物站在的位置上
                mynode.getChildByName("Maze_Bg_1_1").active=false//格子阴影去掉
                mynode.getChildByName("Maze_Icon_1_1").active=false//物品阴影去掉
                mynode.getChildByName("Maze_Icon_1").active=false//物品去掉
                mynode.getChildByName("Maze_Arrow").active=false//标志去掉
                mynode.getChildByName("Maze_Bg_1_2").active=false//光去掉
                this.scheduleOnce(function(){
                    this.Player.x=mynode.x
                    this.Player.y=mynode.parent.y+120
                },0.01)
            }
            else if(Rows==this.Rowsnumber){//  人物那一排
                mynode.getChildByName("Maze_Bg_1_1").active=true//格子阴影加上
                mynode.getChildByName("Maze_Icon_1_1").active=true//物品阴影加上
                mynode.getChildByName("Maze_Icon_1").active=true//物品加上
                mynode.getChildByName("Maze_Arrow").active=false//标志去掉
                mynode.getChildByName("Maze_Bg_1_2").active=false//光去掉
            }
            else if(Rows==(this.Rowsnumber+1)){//人物的前一排   显示物品 显示标志
                //与自己一样的位置是可以被选中的
                // mynode.getChildByName("Maze_Bg_1_1").active=false//阴影去掉
                // mynode.getChildByName("Maze_Icon_1_1").active=false//物品阴影去掉
                // mynode.getChildByName("Maze_Bg_1_2").active=true//光亮起来
                // mynode.getChildByName("Maze_Arrow").active=true//标志亮起来
                // mynode.getChildByName("Maze_Icon_1").active=true//物品加上
                let i=0//是否是奇数
                for (let index = 0; index < mynode.parent.children.length; index++) {
                    if(mynode.parent.children[index].active==true){
                        i++
                    }
                }
                let mypos= this.Positionnumber-Position
                let j=0//是否显示光亮   0:不显示   1:显示
                if(i%2==0||this.Rowsnumber==1){//偶数
                    if(mypos>=0&&Math.abs(mypos)<=1){
                        j=1
                    }
                }else{//奇数
                    if(mypos<=0&&Math.abs(mypos)<=1){
                        j=1
                    }
                }
                if(j==1){
                    mynode.getChildByName("Maze_Bg_1_1").active=false//阴影去掉
                    mynode.getChildByName("Maze_Icon_1_1").active=false//物品阴影去掉
                    mynode.getChildByName("Maze_Bg_1_2").active=true//光亮起来
                    mynode.getChildByName("Maze_Arrow").active=true//标志亮起来
                    mynode.getChildByName("Maze_Icon_1").active=true//物品加上
                }else{
                    mynode.getChildByName("Maze_Bg_1_1").active=true//阴影加上
                    mynode.getChildByName("Maze_Icon_1_1").active=true//物品阴影加上
                    mynode.getChildByName("Maze_Bg_1_2").active=false//光去掉
                    mynode.getChildByName("Maze_Arrow").active=false//标志去掉
                    mynode.getChildByName("Maze_Icon_1").active=true//物品加上
                }
                // if(this.Positionnumber==Position||((this.Positionnumber==1)&&(this.Positionnumber+1)==Position)
                //     ||((this.Positionnumber==3||this.Positionnumber==2)&&(this.Positionnumber-1)==Position)){
                //     mynode.getChildByName("Maze_Bg_1_1").active=false//阴影去掉
                //     mynode.getChildByName("Maze_Icon_1_1").active=false//物品阴影去掉
                //     mynode.getChildByName("Maze_Bg_1_2").active=true//光亮起来
                //     mynode.getChildByName("Maze_Arrow").active=true//标志亮起来
                //     mynode.getChildByName("Maze_Icon_1").active=true//物品加上
                // }else{
                //     mynode.getChildByName("Maze_Bg_1_1").active=true//阴影加上
                //     mynode.getChildByName("Maze_Icon_1_1").active=true//物品阴影加上
                //     mynode.getChildByName("Maze_Bg_1_2").active=false//光去掉
                //     mynode.getChildByName("Maze_Arrow").active=false//标志去掉
                //     mynode.getChildByName("Maze_Icon_1").active=true//物品加上
                // }
            }else if(Rows==(this.Rowsnumber+2)){//人物的前两排    显示物品  
                mynode.getChildByName("Maze_Bg_1_1").active=true//阴影加上
                mynode.getChildByName("Maze_Icon_1_1").active=true//物品阴影加上
                mynode.getChildByName("Maze_Bg_1_2").active=false//光去掉
                mynode.getChildByName("Maze_Arrow").active=false//标志去掉
                mynode.getChildByName("Maze_Icon_1").active=true//物品加上
            }
            else if(Rows>this.Rowsnumber){//人物除了前两排   前面的     不显示物品
                mynode.getChildByName("Maze_Bg_1_1").active=true//阴影加上
                mynode.getChildByName("Maze_Bg_1_2").active=false//光去掉
                mynode.getChildByName("Maze_Icon_1").active=false//物品去掉
                mynode.getChildByName("Maze_Arrow").active=false//标志去掉
            }
            else if(Rows<this.Rowsnumber){//人物后面的     不显示物品
                mynode.getChildByName("Maze_Bg_1_1").active=true//阴影加上
                mynode.getChildByName("Maze_Bg_1_2").active=false//光去掉
                mynode.getChildByName("Maze_Icon_1_1").active=true//物品阴影加上
                mynode.getChildByName("Maze_Icon_1").active=true//物品加上
                mynode.getChildByName("Maze_Arrow").active=false//标志去掉
            }
            mynode.getChildByName("Maze_Icon_1_1").getComponent(cc.Sprite).spriteFrame=this.HexagonTypeShadow[HexagonType]
            mynode.getChildByName("Maze_Icon_1").getComponent(cc.Sprite).spriteFrame=this.HexagonType[HexagonType]
        }
    }
    clickBtnGoods(index,myindex){//行数   位置


        //完成之后在增加层数
        //层数
        // console.log("__________",index,myindex)
        // console.log("++++++++++",RogueHexagonTypesManager.getId(this.type,index,myindex))
        let id=RogueHexagonTypesManager.getId(this.type,index,myindex)
        let HexagonType=RogueHexagonTypesManager.getInstance().getHexagonType(id)//类型
        if(HexagonType==1){//战役

            UIManager.getInstance().showUiDialog(UIPath.BattlePop,UILayerLevel.Two,{onCompleted:(uiNode)=> {
                // console.log("++++++++",this.type,index,myindex)
                uiNode.getComponent(BattlePop).init({
                    onClose:()=>{
                        
                    }
                })
                uiNode.getComponent(BattlePop).initUi(id,this.node,index,myindex)
            },});
        }
        if(HexagonType==2){//意外之财
            UIManager.getInstance().showUiDialog(UIPath.Windfall,UILayerLevel.Two,{onCompleted:(uiNode)=> {
                uiNode.getComponent(Windfall).init({
                    onClose:()=>{
                        
                    }
                })
                uiNode.getComponent(Windfall).initUi(id,this.node,index,myindex)
            },});
        }
        if(HexagonType==5){//boss战役
            UIManager.getInstance().showUiDialog(UIPath.BattlePop,UILayerLevel.Two,{onCompleted:(uiNode)=> {
                // console.log("++++++++",this.type,index,myindex)
                uiNode.getComponent(BattlePop).init({
                    onClose:()=>{
                        
                    }
                })
                uiNode.getComponent(BattlePop).initUi(id,this.node,index,myindex)
            },});
        }
        if(HexagonType==3){//精英战役
            UIManager.getInstance().showUiDialog(UIPath.BattlePop,UILayerLevel.Two,{onCompleted:(uiNode)=> {
                // console.log("++++++++",this.type,index,myindex)
                uiNode.getComponent(BattlePop).init({
                    onClose:()=>{
                        
                    }
                })
                uiNode.getComponent(BattlePop).initUi(id,this.node,index,myindex)
            },});
        }
        // this.Rowsnumber=index
        // this.Positionnumber=myindex
        // this.Refresh()

    }
    clickBtnShop(){//虚空裂缝商店
        UIManager.getInstance().showUiDialog(UIPath.Shop,UILayerLevel.Two,{onCompleted:(uiNode)=> {
            uiNode.getComponent(Shop).init({
                onClose:()=>{   

                }
            })
            uiNode.getComponent(Shop).initUi()
        },});
    }
    clickBtnPlayinstructions(){//玩法说明
        UIManager.getInstance().showUiDialog(UIPath.PlayinsTructions,UILayerLevel.Two,{onCompleted:(uiNode)=> {
            uiNode.getComponent(playinstructions).init({
                onClose:()=>{
                }
            })
            uiNode.getComponent(playinstructions).initUi(4)//2:无尽挑战   3：boss挑战
        },});
    }
    clickBtnClose()//关闭
    {
        this.Tipspop.active=false
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        this.onClose();
        UIManager.getInstance().showUiDialog(UIPath.VndlessChallenges,UILayerLevel.One,{onCompleted:(uiNode)=> {
            uiNode.getComponent(endlesschallenges).init({
                onClose:()=>{

                }
            })
            uiNode.getComponent(endlesschallenges).initUi(4)//2:无尽挑战   3：boss挑战
        },});
    }
    clickBtnTipspop(){
        this.Tipspop.active=true
    }
    clickBtnTipspopClose(){
        this.Tipspop.active=false
    }

    
    // update (dt) {}
}
