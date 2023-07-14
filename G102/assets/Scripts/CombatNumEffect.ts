import { HeroData } from "./Hero/Data/HeroData";
import LanguageManager from "./multiLanguage/LanguageManager";
import MyTool from "./Tools/MyTool";

const {ccclass, property} = cc._decorator;

@ccclass
export default class CombatNumEffect extends cc.Component {

    startAnimation(oldCombatNum:number,newCombatNum:number,oldHeroData:HeroData,newHeroData:HeroData){
        // startAnimation(oldCombatNum:number,newCombatNum:number,oldHeroData:HeroData,newHeroData:HeroData,callback:Function){
        let attribute = this.node.getChildByName("attribute")
        this.unscheduleAllCallbacks();
        cc.Tween.stopAllByTarget(attribute);
        cc.Tween.stopAllByTarget(this.node);
        attribute.setPosition(0,-100,0);
        cc.tween(this.node).to(0.2,{opacity:255}).to(0.8,{opacity:255}).to(0.3,{opacity:0}).start();
        let combat = this.node.getChildByName("combat");
        combat.children[1].getComponent(cc.Label).string = MyTool.getCoinDanwei(oldCombatNum);
        let s = '';
        // s += LanguageManager.getInstance().getStrByTextId(110014) + "+" + (newHeroData.Attack - oldHeroData.Attack) + '\n';
        // s += LanguageManager.getInstance().getStrByTextId(110015) + "+" + (newHeroData.Defense - oldHeroData.Defense) + '\n';
        // s += LanguageManager.getInstance().getStrByTextId(110016) + "+" + (newHeroData.Health - oldHeroData.Health) + '\n';
        // s += LanguageManager.getInstance().getStrByTextId(110017) + "+" + (newHeroData.Hit - oldHeroData.Hit) + '\n';
        // s += LanguageManager.getInstance().getStrByTextId(110018) + "+" + (newHeroData.Miss - oldHeroData.Miss) + '\n';
        // s += LanguageManager.getInstance().getStrByTextId(110019) + "+" + (newHeroData.Critical - oldHeroData.Critical) + '\n';
        // s += LanguageManager.getInstance().getStrByTextId(110021) + "+" + (newHeroData.AntiCritical - oldHeroData.AntiCritical) + '\n';
        // s += LanguageManager.getInstance().getStrByTextId(110020) + "+" + (newHeroData.ExtraCritical - oldHeroData.ExtraCritical) + '\n';
        // s += LanguageManager.getInstance().getStrByTextId(110022) + "+" + (newHeroData.AntiExtraCritical - oldHeroData.AntiExtraCritical) + '\n';
        s += this.getColor(110014,newHeroData.total_attack,oldHeroData.total_attack);
        s += this.getColor(110015,newHeroData.total_defense,oldHeroData.total_defense);
        s += this.getColor(110016,newHeroData.total_hp,oldHeroData.total_hp);
        s += this.getColor(110017,newHeroData.Hit,oldHeroData.Hit);
        s += this.getColor(110018,newHeroData.Miss,oldHeroData.Miss);
        s += this.getColor(110019,newHeroData.Critical,oldHeroData.Critical);
        s += this.getColor(110021,newHeroData.AntiCritical,oldHeroData.AntiCritical);
        if(newHeroData.ExtraCritical * 100 != oldHeroData.ExtraCritical * 100)
            s += this.getPercentColor(110020,newHeroData.ExtraCritical,oldHeroData.ExtraCritical);
        if(newHeroData.AntiExtraCritical * 100 != oldHeroData.AntiExtraCritical * 100)
            s += this.getPercentColor(110022,newHeroData.AntiExtraCritical,oldHeroData.AntiExtraCritical);
        s = "<b><color=#69FF5E><outline color=#010900 width=2><size = 26>" + s + "</b></outline></color></size>";
        attribute.getComponent(cc.RichText).string = s;
        cc.tween(attribute).by(0.2,{position:cc.v3(0,130,0)}).start();
        let temp = 0;
        let offset = Math.floor(newCombatNum - oldCombatNum);
        combat.children[2].getComponent(cc.Label).string = "";
        if(offset < 0){
            combat.children[2].color = cc.color(255,78,78);
            combat.children[2].getComponent(cc.LabelOutline).color = cc.color(57,0,0);
        }else{
            combat.children[2].color = cc.color(109,255,98);
            combat.children[2].getComponent(cc.LabelOutline).color = cc.color(5, 77, 0); 
        }
        let t = 0;
        let num = 17;
        let incremental = Math.floor(offset/num)
        this.schedule(()=>{
            temp += incremental;
            if(Math.abs(offset) - Math.abs(temp) < Math.abs(incremental)){
                temp = offset;
            }
            if(temp > 0){
                combat.children[2].getComponent(cc.Label).string = "+" + MyTool.mynum_con1(temp+"");
            }else{
                combat.children[2].getComponent(cc.Label).string = MyTool.mynum_con1(temp+"");
            }
            t++;
            if(t == num){
                this.scheduleOnce(()=>{
                    this.node.active = false;
            //         callback();
                },0.9);
            }
        },0.03,num,0);
    }

    getColor(tid:number,newNum:number,oldNum:number):string{
        let s = '';
        let result = Math.floor(newNum - oldNum);
        if(result != 0){
            if(result > 0){
                s = LanguageManager.getInstance().getStrByTextId(tid) + "+" + result + '\n';
            }else{
                s = "<color = #ff4e4e> <outline color = #390000 width=2>" + LanguageManager.getInstance().getStrByTextId(tid) + result + "</outline></color>" + '\n';
            }
        }
        return s;
    }

    getPercentColor(tid:number,newNum:number,oldNum:number):string{
        let s = '';
        let result = Math.floor(Math.floor(newNum * 100) - Math.floor(oldNum * 100));
        if(result != 0){
            if(result > 0){
                s = LanguageManager.getInstance().getStrByTextId(tid) + "+" + result + "%" + '\n';
            }else{
                s = "<color = #ff4e4e> <outline color = #390000 width=2>" + LanguageManager.getInstance().getStrByTextId(tid) + result + "%" + "</outline></color>" + '\n';
            }
        }
        return s;
    }

}
