import { GameEffectsManager } from "../Game/GameEffectsManager";
import { MonsterConfigureManager } from "../Monster/Data/MonsterConfigure";
import { MonsterIconManager } from "../Monster/MonsterIconManager";
import LanguageManager from "../multiLanguage/LanguageManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BossHpProgressBar extends cc.ProgressBar {

    @property([cc.SpriteFrame])
    sp_hp:cc.SpriteFrame[]=[];
    yellow:cc.Node=null;
    next_bar:cc.Sprite=null;
    /**初始速度 */
    @property()
    speed:number=56;
    /**当前速度 */
    cur_speed:number=56;
    /**血条条数 */
    cur_hp_num:number=0;
    hp_num_label:cc.Label=null;
    /**最大的血量值 */
    max_hp:number=0;
    /**当前的血量值 */
    cur_hp:number=0;
    /**每条血条的血量 */
    once_hp:number=0;
    /**加速度，死亡时有效 */
    acc_speed:number=640;   

    onLoad()
    {
        this.yellow=this.node.getChildByName('yellow');
        this.hp_num_label=this.node.getChildByName('hpNum').getComponent(cc.Label);
        this.next_bar=this.node.getChildByName('nextBar').getComponent(cc.Sprite)
    }

    init(maxHp:number,monsterId:number,level:number){
        this.max_hp=maxHp;
        this.once_hp=this.max_hp/30;
        this.yellow.width=0;
        this.setHp(this.max_hp);        
        let nameLabel=this.node.getChildByName('name').getComponent(cc.Label);
        nameLabel.string='Lv.'+level+' '+LanguageManager.getInstance().getStrByTextId(MonsterConfigureManager.getInstance().getNameTextId(monsterId));
        this.node.active=true;
        //图标
        let icon=this.node.getChildByName('icon');
        icon.getComponent(cc.Sprite).spriteFrame=MonsterIconManager.getInstance().getSpByMonsterId(monsterId);
        this.cur_speed=this.speed;
    }

    setHp(num:number)
    {
        this.cur_hp=num;
        //直接算出当前的血条数和进度
        let curHpNum=Math.floor(this.cur_hp/this.once_hp);        
        if(curHpNum<0){
            curHpNum=0;
        }
        if(curHpNum!=this.cur_hp_num){
            this.yellow.width=this.totalLength;
        }
        this.cur_hp_num=curHpNum;
        let remain=(this.cur_hp-(this.once_hp*curHpNum));
        this.progress=remain/this.once_hp;
        this.hp_num_label.string='x'+this.cur_hp_num;
        this.barSprite.spriteFrame=this.sp_hp[this.cur_hp_num%5];
        if(this.cur_hp_num>=1){
            this.next_bar.spriteFrame=this.sp_hp[(this.cur_hp_num-1)%5];
        }
        this.next_bar.node.active=this.cur_hp_num>=1;
    }

    //显示白色色
    update(dt)
    {
        let curWidth=this.progress*this.totalLength;
        if(this.yellow.width>curWidth)
        {
            if(this.cur_hp<=0){
                this.cur_speed+=dt*this.acc_speed;
            }
            this.yellow.width-=this.cur_speed*dt;        
            if(this.yellow.width<curWidth)
            {
                this.yellow.width=curWidth;
            }
            if(this.yellow.width<=0){
                this.node.active=false;
            }
        }else if(this.yellow.width<curWidth&&this.yellow.width>0)
        {
            if(curWidth<=0){
                curWidth=0;
                this.node.active=false;
            }
            this.yellow.width=curWidth;
        }
    }
}
