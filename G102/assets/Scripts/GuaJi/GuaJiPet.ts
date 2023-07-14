// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { Hero_State } from "../Hero/Game/HeroConfig";
import { KeyFrameData } from "../Monster/MonsterData";
import GuaJiManager from "./GuaJiManager";
import GuaJiMonster from "./GuaJiMonster";



const {ccclass, property} = cc._decorator;

@ccclass
export default class GuaJiPet extends cc.Component {

    //骨骼动画
    spine:sp.Skeleton=null;    
    /**英雄的状态 */
    hero_state:Hero_State=Hero_State.idle;
    //攻击计数
    gongji_jishu:number=1;
    /**攻击间隔 */
    gongji_jiange:number=0.25;
    /**子弹生成的位置 */
    bullet_pos:cc.Vec2=cc.v2();
    is_can_gongji:boolean=true;

    onLoad () {
        this.bullet_pos=this.node.getPosition().add(this.node.getChildByName('bullect').getPosition().mul(this.node.scaleY));
        this.spine=this.node.getComponent(sp.Skeleton);
        this.startIdle();
    }

    /**
     * 播放一个骨骼动画
     * @param name 骨骼动画名称
     * @param isLoop 是否循环
     * @param data 是否监听关键帧，关键帧数据包含关键帧名称，监听到关键帧后的回调
     * @param endCallback 播放结束后的回调
     */
     playSpineAnimaton(name:string,isLoop:boolean=false,data?:KeyFrameData,endCallback?:Function){
        let anima=this.spine.setAnimation(0,name,isLoop);
        if(data){
            this.spine.setTrackEventListener(anima,(entry: sp.spine.TrackEntry, event) =>{
                if(event.data.name==data.name){
                    data.callback();
                }
            })
        }
        if(endCallback){
            this.spine.setTrackCompleteListener(anima,(entry: sp.spine.TrackEntry, event) =>{
                anima.listener=null;
                endCallback();
            })
        }
    }

    update(dt:number)
    {              
        this.checkAttack(dt);                
    }

    private checkAttack(dt)
    {
        if(this.is_can_gongji==true)
        {
            this.gongji_jishu+=dt;
            if(this.gongji_jishu>=this.gongji_jiange)
            {
                let monsterS=GuaJiManager.getInstance().getMonstersForNearest(1,this.node.getPosition(),640);
                if(monsterS){
                    //开始攻击
                    this.startAtt(monsterS[0].getComponent(GuaJiMonster).getJuJiPos());
                }                             
            }
        }
    }

    startIdle(){
        this.playSpineAnimaton("Side_Idle",true);
    }

    startAtt(monsterPos:cc.Vec2){
        this.gongji_jishu=0;
        this.is_can_gongji=false;    
        let data=new KeyFrameData();
        data.name="OnDamaging";
        data.callback=()=>{
            //正中心
            let offsetPos=monsterPos.sub(this.bullet_pos);
            let jianshiDir=Math.atan2(offsetPos.y,offsetPos.x);
           //自动攻击
            let node=GuaJiManager.getInstance().createPetBullect(this.bullet_pos,jianshiDir);
            this.is_can_gongji=true;
        }
        this.playSpineAnimaton("Side_Attack",false,data,()=>{
            this.startIdle();
        });
    }
}
