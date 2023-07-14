
import { BaoXiang_Anima, Enemy_Buff_Type } from "./EnemyConfig";


const {ccclass, property} = cc._decorator;

@ccclass
export default class BaoXiangGuai extends cc.Component {

    @property(cc.SpriteAtlas)
    icon_atlas:cc.SpriteAtlas=null;
    //骨骼动画
    spine:sp.Skeleton=null;
    state:number=0;
    move_speed:number=300;
    move_direction:number=Math.PI/2;
    target_pos:cc.Vec2=cc.v2(0,0);

    init()
    {
        // this.level_buff=levelBuff;
        // let enemyTs=this.node.getComponent(Enemy);
        // enemyTs.addEnemyBuff(Enemy_Buff_Type.wudi);
        // this.spine=this.node.getComponent(sp.Skeleton);
        // this.spine.setCompleteListener(()=>{
        //     if(this.spine.animation==BaoXiang_Anima.bianxing)
        //     {
        //         this.spine.animation=BaoXiang_Anima.daiji; 
        //         this.spine.loop=false;
        //     }
        //     if(this.spine.animation==BaoXiang_Anima.daiji)
        //     {
        //         this.spine.animation=BaoXiang_Anima.pao;
        //         enemyTs.removeEnemyBuff(Enemy_Buff_Type.wudi);
        //         this.state=1;
        //     }
        //     if(this.spine.animation==BaoXiang_Anima.gongji)
        //     {
        //         this.spine.animation=BaoXiang_Anima.pao;
        //         this.state=1;
        //     }
        //     if(this.spine.animation==BaoXiang_Anima.pao)
        //     {
        //         if(this.state==1)
        //         {
        //             this.spine.animation=BaoXiang_Anima.pao;
        //         }
        //     }
        //     // if(this.spine.animation==BaoXiang_Anima.siwang)
        //     // {

        //     // }
        // });
        // this.spine.animation=BaoXiang_Anima.bianxing;
        // this.spine.loop=false;   
        // this.state=0;
        // this.target_pos=cc.v2(Math.random()*512-256,Math.random()*660-180); 
    }

    destroySelf():boolean
    {
        this.spine.animation=BaoXiang_Anima.siwang;
        this.state=0;
        //爆东西出来
        this.createSkillIcon();
        return false;
    }

    createSkillIcon()
    {
        

        //GameManager.getInstance().baoxiangDie();       
    }    



    getPinZiSp(quality:number):cc.SpriteFrame
    {       
        return this.icon_atlas.getSpriteFrame('Game_Skill_Frame_'+(quality-1));
    }

    update (dt:number) {
        if(this.state==1)
        {
            let sp=this.move_speed*dt;
            //跑起来
            let offsetPos=this.target_pos.sub(this.node.getPosition());
            if(offsetPos.mag()<sp)
            {
                //到达目标地点，换个地点
                this.state=0;
                this.spine.animation=BaoXiang_Anima.gongji;
                this.spine.loop=false;
                this.target_pos=cc.v2(Math.random()*512-256,Math.random()*500-180);
            }else
            {
                let pi2=Math.PI*2;
                let dir=(Math.atan2(offsetPos.y,offsetPos.x)+pi2)%pi2;
                let disX=this.node.x+sp*Math.cos(dir);
                let disY=this.node.y+sp*Math.sin(dir);
                this.node.x=disX;
                this.node.y=disY;
                if(dir>=Math.PI/2 && dir<=Math.PI*3/2)
                {
                    this.node.scaleX=1;
                }else
                {
                    this.node.scaleX=-1;
                }
            }
        }
    }
}
