// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameManager from "../../GameManager";
import { HeroManager } from "../../Hero/Data/HeroManager";
import MyTool from "../../Tools/MyTool";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Chariot extends cc.Component {

    @property(cc.Node)
    btnClose: cc.Node = null;
    @property(cc.Node)
    bg: cc.Node = null;
    
    @property(cc.Node)
    txt: cc.Node[] = [];

    start () {
        this.btnClose.on(cc.Node.EventType.TOUCH_END,function(event){
            this.onCloseBtn()
        },this)
        this.bg.on(cc.Node.EventType.TOUCH_END,function(event){
            this.onCloseBtn()
        },this)
    }
    onEnable(){
        let shux=[0,0,0,0,0]
        let teamList=HeroManager.getInstance().getTeamList(GameManager.getInstance().cur_game_mode);
        for (let teamListindex = 0; teamListindex < teamList.length; teamListindex++) {
            if(teamList[teamListindex]>0){
                // HeroManager.getInstance().getHeroData(teamList[teamListindex]).total_hp
                // console.log("______",HeroManager.getInstance().getHeroData(teamList[teamListindex]).Defense)
                shux[0]+=HeroManager.getInstance().getHeroData(teamList[teamListindex]).total_hp//英雄的基础数据   传入英雄id类型  防御力  生命值  命中值  
                shux[1]+=HeroManager.getInstance().getHeroData(teamList[teamListindex]).total_defense//英雄的基础数据   传入英雄id类型  防御力  生命值  命中值  
                shux[2]+=HeroManager.getInstance().getHeroData(teamList[teamListindex]).Miss//英雄的基础数据   传入英雄id类型  防御力  生命值  命中值  
                shux[3]+=HeroManager.getInstance().getHeroData(teamList[teamListindex]).AntiCritical//英雄的基础数据   传入英雄id类型  防御力  生命值  命中值  
                shux[4]+=HeroManager.getInstance().getHeroData(teamList[teamListindex]).AntiExtraCritical//英雄的基础数据   传入英雄id类型  防御力  生命值  命中值  
            }
        }
        for (let  index= 0; index < shux.length; index++) {
            
            if(index==4){
                // let num=(shux[index]/5)*100
                // console.log("__",)
                // shux[index]=Number(MyTool.numberFormat(num,4))//*100
                // // shux[index]=shux[index]*100
                
                this.txt[index].getComponent(cc.Label).string=""+MyTool.numberFormat(shux[index] / 5 * 100,2) + "%";//暴击抗性
            }else{
                shux[index]=Number(MyTool.numberFormat((shux[index]/5),0))
                this.txt[index].getComponent(cc.Label).string=""+shux[index]
            }
            
        }
        //刷新血量
        
    }
    onCloseBtn(){
        this.node.active=false
    }

    // update (dt) {}
}
