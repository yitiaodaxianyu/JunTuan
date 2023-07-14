import GuaJiJianShi from "./GuaJiJianShi";
import GuaJiMonster from "./GuaJiMonster";
import GuaJiRes from "./GuaJiRes";


const {ccclass, property} = cc._decorator;

@ccclass
export default class GuaJiManager extends cc.Component {

    @property([cc.Prefab])
    prefabs_guaji_monster:cc.Prefab[]=[];

    @property(cc.Prefab)
    prefab_jianshi:cc.Prefab=null;

    @property(cc.Prefab)
    prefab_shadow:cc.Prefab=null;

    @property(cc.Prefab)
    prefab_hit:cc.Prefab=null;

    @property(cc.Prefab)
    prefab_pet_hit:cc.Prefab=null;
    
    @property(cc.Prefab)
    prefab_tuowei:cc.Prefab=null;

    @property(cc.Prefab)
    prefab_bullect:cc.Prefab=null;

    @property(cc.Prefab)
    prefab_res:cc.Prefab=null;

    // @property([cc.SpriteFrame])
    // sp_res:cc.SpriteFrame[]=[];

    jianshi_root:cc.Node=null;
    guawi_root:cc.Node=null;
    shadow_root:cc.Node=null;
    hit_root:cc.Node=null;
    tuowei_root:cc.Node=null;
    res_root:cc.Node=null;
    /**背景移速 */
    bg_speed_x:number=40;

    box_pos:cc.Vec2=cc.v2(0,0);

    private static _instance: GuaJiManager = null;


    public static getInstance():GuaJiManager
    {
        if(this._instance==null)
        {
            let node=new cc.Node();
            cc.director.getScene().getChildByName("Canvas").addChild(node);
            this._instance=node.addComponent(GuaJiManager);
        }
        return this._instance;
    }

    onLoad () {
        GuaJiManager._instance=this;
        this.jianshi_root=this.node.getChildByName('jianshi_root');
        this.guawi_root=this.node.getChildByName('guawi_root');
        this.shadow_root=this.node.getChildByName('shadow_root');
        this.hit_root=this.node.getChildByName('hit_root');
        this.tuowei_root=this.node.getChildByName('tuowei_root');
        this.res_root=this.node.getChildByName('res_root');        
        cc.director.getCollisionManager().enabled=true;        
        this.box_pos=cc.find('Canvas/main_ui/Main_Icon_Idle').getPosition();        
    }

    protected start(): void {
        this.schedule(this.startMonster,3);
        this.startMonster();
    }

    startMonster(){
        let heroPos=this.node.getChildByName('hero').getPosition();
        this.createGuaJiMonster(cc.v2(480+Math.random()*200-100,heroPos.y-100+Math.random()*80-80))
        this.createGuaJiMonster(cc.v2(480+Math.random()*200+100,heroPos.y-100+Math.random()*80-80))
    }

    onDestroy()
    {        
        GuaJiManager._instance=null;
    }

    createGuaJiMonster(pos:cc.Vec2):cc.Node{
        //随机
        let randIndex=Math.floor(Math.random()*this.prefabs_guaji_monster.length);
        let node=cc.instantiate(this.prefabs_guaji_monster[randIndex]);
        this.guawi_root.addChild(node);
        node.setPosition(pos);
        node.getComponent(GuaJiMonster).init();
        node.zIndex=-pos.y;
        return node;
    }

    createShadow(pos:cc.Vec2):cc.Node{
        let node=cc.instantiate(this.prefab_shadow);
        this.shadow_root.addChild(node);
        node.setPosition(pos);
        return node;
    }

    createJianShi(pos:cc.Vec2,dir:number):cc.Node{
        let node=cc.instantiate(this.prefab_jianshi);
        this.jianshi_root.addChild(node);
        node.setPosition(pos);
        node.getComponent(GuaJiJianShi).init(dir,1);
        return node;
    }

    createPetBullect(pos:cc.Vec2,dir:number):cc.Node{
        let node=cc.instantiate(this.prefab_bullect);
        this.jianshi_root.addChild(node);
        node.setPosition(pos);
        node.getComponent(GuaJiJianShi).init(dir,2,true);
        return node;
    }

    createHit(pos:cc.Vec2):cc.Node{
        let node=cc.instantiate(this.prefab_hit);
        this.hit_root.addChild(node);
        node.setPosition(pos);
        let anima=node.getComponent(cc.Animation);
        anima.play();
        anima.on(cc.Animation.EventType.FINISHED,()=>{
            node.removeFromParent();
        })
        return node;
    }

    createPetHit(pos:cc.Vec2):cc.Node{
        let node=cc.instantiate(this.prefab_pet_hit);
        this.hit_root.addChild(node);
        node.setPosition(pos);
        let anima=node.getComponent(cc.Animation);
        anima.play();
        anima.on(cc.Animation.EventType.FINISHED,()=>{
            node.removeFromParent();
        })
        return node;
    }

    createTuoWei(pos:cc.Vec2):cc.Node{
        let node=cc.instantiate(this.prefab_tuowei);
        this.tuowei_root.addChild(node);
        node.setPosition(pos);
        return node;
    }

    createRes(propId:number,pos:cc.Vec2){
        let node=cc.instantiate(this.prefab_res);
        this.res_root.addChild(node);
        node.setPosition(pos);
        node.getComponent(GuaJiRes).init(propId);
        return node;
    }

    //--------------------------GET--------------------------------------------------
    /**
     * 获取指定位置targetPos的指定范围fanwei内靠近城墙最近的cheakNum个敌人
     * @param cheakNum 检测数量
     * @param targetPos 指定的位置，一般是自身位置
     * @param fanwei 指定的检测范围，一般是攻击距离
     * @returns 所有满足条件的敌人
     */
    getMonstersForNearest(cheakNum:number,targetPos:cc.Vec2,fanwei:number):cc.Node[]
    {
        if(cheakNum==0)
        {
            return null;
        }
        let len=this.guawi_root.childrenCount;
        if(len<=0)
        {
            return null;
        }
        //1.先检测在攻击范围内符合攻击单位的敌人
        let attMonsters:cc.Node[]=[];        
        for(let i=0;i<len; i++)
        {
            let monster=this.guawi_root.children[i];
            if(monster.getComponent(GuaJiMonster).getIsCanCheak()){
                let distance=targetPos.sub(monster.getPosition()).mag();
                if(distance<=fanwei)
                {
                    attMonsters.push(monster);
                }
            }            
        }
        if(attMonsters.length<=0)
        {
            return null;
        }
        if(cheakNum>=attMonsters.length)
        {
            return attMonsters;
        }
        //2.对可以攻击的敌人进行优先级判断,选出cheakNum个目标作为打击单位
        //2.1优先攻击跟城墙最近的单位
        attMonsters.sort((a:cc.Node,b:cc.Node)=>{
            return a.x-b.x;
        });        
        attMonsters.splice(cheakNum);        
        return attMonsters;
    }

    /**
     * //获取指定位置targetPos的指定范围fanwei内cheakNum个敌人
     * @param cheakNum 检测数量，小于0表示所有，如-1
     * @param targetPos 目标位置
     * @param fanwei 范围
     * @returns 所有符合条件的敌人
     */    
    getCollisionMonster(cheakNum:number,targetPos:cc.Vec2,fanwei:number){
        if(cheakNum==0)
        {
            return null;
        }
        let len=this.guawi_root.childrenCount;
        if(len<=0)
        {
            return null;
        }
        //1.先检测在攻击范围内符合攻击单位的敌人
        let attMonsters:cc.Node[]=[];        
        for(let i=0;i<len; i++)
        {
            let monster=this.guawi_root.children[i];
            if(monster.getComponent(GuaJiMonster).getIsCanCheak()){
                let distance=targetPos.sub(monster.getPosition()).mag();
                if(distance<=fanwei)
                {
                    attMonsters.push(monster);
                }
            }
            
        }
        if(attMonsters.length<=0)
        {
            return null;
        }
        //小于0，代表要所有
        if(cheakNum<0)
        {
            return attMonsters;
        }
        //如果检测到的数量没有要检测的那么多，直接返回全部.
        if(cheakNum>=attMonsters.length)
        {
            return attMonsters;
        }
        //2.1优先攻击跟目标位置最近的单位，按照与pos的距离大小进行排列，从小到大
        attMonsters.sort((a:cc.Node,b:cc.Node)=>{
            return a.getPosition().sub(targetPos).mag()-b.getPosition().sub(targetPos).mag();
        });
        attMonsters.splice(cheakNum);
        return attMonsters;
    }
}
