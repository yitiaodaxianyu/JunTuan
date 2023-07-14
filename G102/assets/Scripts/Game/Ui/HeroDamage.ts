// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameManager from "../../GameManager";
import { HeroManager } from "../../Hero/Data/HeroManager";
import { Hero_Type } from "../../Hero/Game/HeroConfig";
import MyTool from "../../Tools/MyTool";
import StatsUi from "./StatsUi";

const {ccclass, property} = cc._decorator;

@ccclass
export default class HeroDamage extends cc.Component {

    // @property(cc.Label)
    // label: cc.Label = null;

    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    @property(cc.Prefab)
    prefab_hero_stats:cc.Prefab=null;

    @property(cc.Node)
    hero_stats_parent:cc.Node=null;

    hero:cc.Node[]=[]
    onEnable(){
        // console.log("+++++++")
        this.showStats();//显示英雄
    }
    showStats(){
        //队伍
        let hm=HeroManager.getInstance();
        let teamList=GameManager.getInstance().cur_team_list;
        let attStats=GameManager.getInstance().hero_attack_dps;
        let skillStats=GameManager.getInstance().hero_skill_dps;
        let maxDps=0;
        //先判断哪个是最高的
        for(let i=0; i<Hero_Type.Hero_Num; i++)
        {
            if(attStats[i]+skillStats[i]>maxDps)
            {
                maxDps=attStats[i]+skillStats[i];
            }
        }
        let heroarrnum=[]//已上陣的英雄
        //找出所有的解锁的英雄
        for(let i=0; i<5; i++)
        { 
            let heroType=teamList[i];
            if(heroType>0){
                heroarrnum.push(heroType)
            }
        }
        let heightup=0-((this.prefab_hero_stats.data.height/2)+10)
        let Data_Bg_1height=this.prefab_hero_stats.data.height+10+5
        //生成英雄伤害列表
        for (let hero_index = this.hero.length; hero_index < heroarrnum.length; hero_index++) {
                let heroStats=cc.instantiate(this.prefab_hero_stats);
                this.hero_stats_parent.addChild(heroStats);
                heightup= heightup-heroStats.height-5
                Data_Bg_1height+=(heroStats.height+5)
                heroStats.setPosition(0,heightup)
                this.hero.push(heroStats)
        }
        if(this.hero_stats_parent.height<100){
            this.hero_stats_parent.height=(Data_Bg_1height+10)
        }
        let cons=[]//技能和伤害加起来的数据
        let shanghaizonhe=0//伤害总和
        for (let cons_index = 0; cons_index < this.hero.length; cons_index++) {
            let aNum=attStats[heroarrnum[cons_index]];//普通攻击
            let sNum=skillStats[heroarrnum[cons_index]];//技能
            cons[cons_index]=aNum+sNum
            shanghaizonhe+=cons[cons_index]
        }
        //从大到小排列伤害数据
        let cun
        let herocun
        for (let index = 0; index < cons.length; index++) {
            for (let paixvindex = 0; paixvindex < cons.length-1; paixvindex++) {
                if(cons[paixvindex+1]>cons[paixvindex]){
                    cun=cons[paixvindex]
                    cons[paixvindex]=cons[paixvindex+1]
                    cons[paixvindex+1]=cun

                    herocun=heroarrnum[paixvindex]
                    heroarrnum[paixvindex]=heroarrnum[paixvindex+1]
                    heroarrnum[paixvindex+1]=herocun
                }
            }
        }
        //刷新英雄的伤害
        for (let shuaxing_index = 0; shuaxing_index < this.hero.length; shuaxing_index++) {
            let myhero=this.hero[shuaxing_index]
            if(shuaxing_index < heroarrnum.length){
                myhero.active=true
                let icon=myhero.getChildByName('icon');
                icon.getComponent(cc.Sprite).spriteFrame=hm.getHeroSpriteFrames(heroarrnum[shuaxing_index]);
                let aNum=attStats[heroarrnum[shuaxing_index]];//普通攻击
                let sNum=skillStats[heroarrnum[shuaxing_index]];//技能
                let con=aNum+sNum
                let skillNum=0
                if(shanghaizonhe>0){
                    skillNum=Number(((con/shanghaizonhe)*100).toFixed(0))
                }
                myhero.getChildByName("skillNum").getComponent(cc.Label).string=""+Number(MyTool.numberFormat(skillNum,0))+"%"
                myhero.getChildByName("attNum").getComponent(cc.Label).string=""+Number(MyTool.numberFormat(con,0))
                let att=skillNum/100
                myhero.getChildByName("att").getComponent(cc.ProgressBar).progress=att
                myhero.getChildByName("skill").getComponent(cc.ProgressBar).progress=att
            }else{
                myhero.active=false
            }
        }
    }
    // update (dt) {}
}
