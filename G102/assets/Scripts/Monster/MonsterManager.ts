import { GameMode, IsDebug } from "../Constants";
import { GameEffectId, GameEffectsManager } from "../Game/GameEffectsManager";
import GameManager from "../GameManager";
import MapNodePool from "../Game/MapNodePool";
import { SoundIndex } from "../Sound/AudioConstants";
import { MonsterConfigureManager } from "./Data/MonsterConfigure";
import Monster from "./Monster";
import { StrengthType } from "./MonsterData";
import GroundManager from "../Game/GroundManager";
import { BingNvWallData } from "../Hero/Game/HeroConfig";
import { JsonMonsterGrowthAttributes } from "./Data/MonsterGrowthAttributes";
import { Enemy_State } from "../Enemy/EnemyConfig";
import WallManager from "../Wall/WallManager";



const { ccclass, property } = cc._decorator;

@ccclass
export default class MonsterManager extends MapNodePool {

    is_load_ok: boolean = false;
    private ok_num: number = 0;
    /**当前关总共有多少敌人 */
    total_monster_num: number = 0;
    /**击杀怪物数量 */
    killed_monster_num: number = 0;
    //上船的怪物数量
    private _ship_monster_num: number = 0;
    /**剩余怪物数量 */
    drop_root: cc.Node = null;
    coin_pos: cc.Vec2 = cc.v2();

    private static _instance: MonsterManager = null;


    public static getInstance(): MonsterManager {
        return this._instance;
    }

    onLoad() {
        MonsterManager._instance = this;
        this.drop_root = cc.find('Canvas/Drop_Root');
        let iconBag = cc.find('Canvas/Ui_Root/top_ui/iconBg/iconCoin');
        let worldPos = iconBag.parent.convertToWorldSpaceAR(iconBag.getPosition());
        this.coin_pos = this.drop_root.convertToNodeSpaceAR(worldPos);
        super.onLoad();
    }

    protected start(): void {
        this.loadData();
    }

    onDestroy() {
        super.onDestroy();
        MonsterManager._instance = null;
    }

    //加载当前关卡会出现的怪物
    loadData() {
        this.is_load_ok = false;
        this.ok_num = 0;
        let fightingInfo = GameManager.getInstance().fighting_info;
        this.killed_monster_num = 0;
        this.ship_monster_num = 0;
        this.destroyAllMonster();
        this.total_monster_num = fightingInfo.total_monster_num;
        this.prev_uuid = "";
        //怪物id数组
        let monsterDataMap = fightingInfo.getOnlyMonsterTypeMap();
        //let MSM=MonsterConfigureManager.getInstance();        
        let len = monsterDataMap.size;
        let bossLoadNum = 0;
        // console.log("+++++++++",monsterDataMap)
        monsterDataMap.forEach((v, k) => {
            super.addNodePool(k, 'monster/Monster_' + k, 4, (node: cc.Node) => {
                this.ok_num++;

                if (this.ok_num >= len && bossLoadNum <= 0) {
                    this.is_load_ok = true;
                }
            });
            if (v == StrengthType.Boss) {
                if (GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.boss_hp, 1, () => {
                    bossLoadNum--;
                    if (this.ok_num >= len && bossLoadNum <= 0) {
                        this.is_load_ok = true;
                    }
                })) {
                    bossLoadNum++;
                }
                if (GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.boss_coming, 1, () => {
                    bossLoadNum--;
                    if (this.ok_num >= len && bossLoadNum <= 0) {
                        this.is_load_ok = true;
                    }
                })) {
                    bossLoadNum++;
                }
            }
        })
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.drop_coin, 16);
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.drop_gem, 16);
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.drop_gem_shadow, 16);
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.drop_coin_shadow, 16);
    }

    public set ship_monster_num(v: number) {
        this._ship_monster_num = v;
        if (this._ship_monster_num >= 10) {
            GameManager.getInstance().showGameLose();
        }
    }


    public get ship_monster_num(): number {
        return this._ship_monster_num;
    }


    addMonsterPool(id: number, initCount: number, loadCallback?: Function) {
        let MSM = MonsterConfigureManager.getInstance();
        let jsonData = MSM.getJsonMonsterConfigure(id);
        let type = jsonData.MonsterClass;
        super.addNodePool(type, 'monster/Monster_' + type, initCount, loadCallback);
    }
    /**
     * 根据怪物id创建一个敌人
     * @param id 怪物id
     * @param pos 生成位置
     * @param level 怪物等级
     * @param hpRate 血量比率
     * @param isCanCount 是否可以计数（用于区分召唤物）
     * @returns 
     */
    createMonsterById(id: number, pos: cc.Vec2, level: number, hpRate: number, isCanCount: boolean = true): cc.Node {
        // console.log("_______",pos.x,pos.y)
        let type = MonsterConfigureManager.getInstance().getMonsterClass(id);
        let node = super.getNodeById(type);
        this.node.addChild(node);
        node.setPosition(pos);
        node.getComponent(Monster).init(id, level, hpRate, isCanCount);
        return node;
    }
    /**
     * boss创建召唤物
     * @param monsterId 怪物id
     * @param pos 生成位置
     * @param bossAttribute boss的属性
     * @returns 
     */
    createSummonMonster(monsterId: number, level: number, pos: cc.Vec2) {
        //召唤特效
        let quan = GroundManager.getInstance().createGameEffectById(GameEffectId.monster_zhaohuan, pos);
        let spine = quan.getComponent(sp.Skeleton);
        let track = spine.setAnimation(0, "Boss10_Skill2_ZhaoHuan_2", false);
        spine.setTrackEventListener(track, (entry: sp.spine.TrackEntry, event) => {
            if (event.data.name == "ZhaoHuan") {
                this.createMonsterById(monsterId, pos, level, 1, false)
            }
        })
        spine.setCompleteListener(() => {
            spine.setCompleteListener(null);
            GameEffectsManager.getInstance().destroyGameEffectById(GameEffectId.monster_zhaohuan, quan);
        });
    }
    prev_uuid: string = "";
    /**即将删除敌人，可以在此播放音效 */
    willDestroyMonster(monsterTs: Monster): boolean {
        //是否要运行动作后再销毁
        let isActionDie = true;
        GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_Shouji);
        //爆金币
        let pos = monsterTs.node.getPosition();
        if (GameManager.getInstance().cur_game_mode == GameMode.Main) {
            this.createDropProp(pos, GameEffectId.drop_coin);
            this.createDropProp(pos, GameEffectId.drop_coin);
            this.createDropProp(pos, GameEffectId.drop_gem);
        }
        return isActionDie;
    }
    //有怪上船了
    upShipMonster(): void {
        if (this.killed_monster_num + this.ship_monster_num >= this.total_monster_num) {

            if (this.getRemainMonster() <= 0) {
                GameManager.getInstance().showGameWin();
            }

        }
    }
    /**回收敌人到对象池 */
    destroyMonster(node: cc.Node, type: number, isCanWin: boolean = true) {
        node.color = cc.Color.WHITE;
        let monsterTs = node.getComponent(Monster);
        monsterTs.setEnemyState(Enemy_State.die);
        //要区分召唤怪
        if (monsterTs.is_can_count) {
            if (monsterTs.uuid == this.prev_uuid) {
                //console.error("可能重复计数了:");
                return;
            }
            this.prev_uuid = monsterTs.uuid;
            this.killed_monster_num++;
            GameManager.getInstance().onEnemyDie(monsterTs.score, monsterTs.is_can_count);
        }

        if (this.killed_monster_num + this.ship_monster_num >= this.total_monster_num) {
            if (isCanWin) {

                if (this.getRemainMonster() <= 0) {
                    GameManager.getInstance().showGameWin();
                }
            }
        }
        // //回收前标记可以
        // if(monsterTs){
        //     monsterTs.setIsCanCount(true);
        // }

        super.destroyNode(type, node);
    }

    private getRemainMonster(): number {
        let num = 0;
        let len = this.node.childrenCount;
        for (let i = 0; i < len; i++) {
            let monster = this.node.children[i];
            let monsterTS = monster.getComponent(Monster);
            if (monsterTS && monsterTS.getIsDie() == false) {
                num++;
            }
        }
        return num;
    }

    createDropProp(pos: cc.Vec2, id: GameEffectId) {
        let prop = GroundManager.getInstance().createGameEffectById(id, pos, 2);
        //this.node.getComponent(cc.Sprite).spriteFrame=PropManager.getInstance().getSpByPropId(PropId.Coin);
        prop.opacity = 255;
        //prop.scale=0.5;
        let xx = Math.random() * 20 + 30;
        xx *= Math.random() < 0.5 ? 1 : -1;
        let yy = Math.random() * 40 - 20;
        let height = Math.random() * 20 + 30;
        // cc.tween(prop).then(cc.jumpBy(0.5,xx,yy,height,1)).delay(1).call(()=>{
        //     prop.parent=UIManager.getInstance().node;
        // }).then(MyTool.getBezierAct(prop.getPosition(),this.coin_pos)).call(()=>{
        //     GameEffectsManager.getInstance().destroyGameEffectById(id,prop);
        //     GameManager.getInstance().game.showCoin();
        // }).start();

        cc.tween(prop).then(cc.jumpBy(0.5, xx, yy, height, 1))
            // .call(()=>{
            //     //生成阴影
            //     let shadowId=GameEffectId.drop_gem;
            //     let distXX=0;
            //     let distYY=0;
            //     switch(id){
            //         case GameEffectId.drop_coin:{                    
            //             distXX=prop.x;
            //             distYY=prop.y-9.5;
            //             shadowId=GameEffectId.drop_coin_shadow;
            //         }break;
            //         case GameEffectId.drop_gem:{
            //             shadowId=GameEffectId.drop_gem_shadow;
            //             distXX=prop.x+1;
            //             distYY=prop.y-10;
            //         }break;
            //     }           
            //     let shadow=GroundManager.getInstance().createGameEffectById(shadowId,cc.v2(distXX,distYY),1);
            //     shadow.opacity=100;
            //     cc.tween(shadow).delay(10).to(0.5,{opacity:0}).call(()=>{
            //         GameEffectsManager.getInstance().destroyGameEffectById(shadowId,shadow);
            //     }).start();
            // })
            .delay(10).to(0.5, { opacity: 0 }).call(() => {
                GameEffectsManager.getInstance().destroyGameEffectById(id, prop);
            }).start();
    }

    destroyAllDrop() {
        let drops = this.drop_root.children;
        let len = drops.length;
        for (let i = 0; i < len; i++) {
            let prop = drops[i];
            let id = parseInt(prop.name);
            if (id) {
                cc.tween(prop).to(0.5, { opacity: 0 }).call(() => {
                    GameEffectsManager.getInstance().destroyGameEffectById(id, prop);
                }).start();
            }

        }
    }

    destroyAllMonster() {
        let allMonster = this.node.children;
        let len = allMonster.length;
        for (let i = 0; i < len; i++) {
            let monster = allMonster[i];
            if (monster) {
                let monsterTS = monster.getComponent(Monster);
                if (monsterTS) {
                    this.destroyMonster(monster, monsterTS.monster_type);
                }
            }
        }
    }

    //--------------------------GET--------------------------------------------------
    /**
     * 获取指定位置targetPos的指定范围fanwei内靠近城墙最近的cheakNum个敌人
     * @param cheakNum 检测数量
     * @param targetPos 指定的位置，一般是自身位置
     * @param fanwei 指定的检测范围，一般是攻击距离
     * @returns 所有满足条件的敌人
     */
    getMonstersForNearest(cheakNum: number, targetPos: cc.Vec2, fanwei: number, posIndex: number = null): cc.Node[] {
        if (cheakNum == 0) {
            return null;
        }
        let len = this.node.childrenCount;
        if (len <= 0) {
            return null;
        }
        //1.先检测在攻击范围内符合攻击单位的敌人
        let attMonsters: cc.Node[] = [];
        for (let i = 0; i < len; i++) {
            let monster = this.node.children[i];
            let monsterTS = monster.getComponent(Monster);
            if (monsterTS && monsterTS.getIsCanCheck()) {
                let distance = targetPos.sub(monster.getPosition()).mag();
                if (distance <= fanwei) {
                    if (posIndex == null || posIndex == -1) {
                        attMonsters.push(monster);
                    } else {
                        if (Math.abs(monster.x - GameManager.getInstance().charPosX) <= 75 && monster.y > WallManager.getInstance().getMainWall().getWallRect().yMax) {
                            attMonsters.push(monster);
                        }
                    }

                }
            }
        }
        if (attMonsters.length <= 0) {
            return null;
        }
        //小于0，代表要所有
        if (cheakNum < 0) {
            return attMonsters;
        }
        if (cheakNum >= attMonsters.length) {
            return attMonsters;
        }
        //2.对可以攻击的敌人进行优先级判断,选出cheakNum个目标作为打击单位
        //2.1优先攻击跟城墙最近的单位
        attMonsters.sort((a: cc.Node, b: cc.Node) => {
            return a.getPosition().sub(targetPos).mag() - b.getPosition().sub(targetPos).mag();
        });
        attMonsters.splice(cheakNum);
        return attMonsters;
    }
    /**
     * 获取指定位置targetPos的指定范围fanwei内靠近城墙最近的cheakNum个敌人
     * @param cheakNum 检测数量
     * @param targetPos 指定的位置，一般是自身位置
     * @param fanwei 指定的检测范围，一般是攻击距离
     * @returns 所有满足条件的敌人
     */
    getMonstersForNearestBySkill(cheakNum: number, targetPosY: number, fanwei: number): cc.Node[] {
        if (cheakNum == 0) {
            return null;
        }
        let len = this.node.childrenCount;
        if (len <= 0) {
            return null;
        }
        //1.先检测在攻击范围内符合攻击单位的敌人
        let attMonsters: cc.Node[] = [];
        for (let i = 0; i < len; i++) {
            let monster = this.node.children[i];
            let monsterTS = monster.getComponent(Monster);
            if (monsterTS && monsterTS.getIsCanCheck()) {
                let distance = monsterTS.getCenterPos().y - targetPosY;
                if (distance <= fanwei) {
                    attMonsters.push(monster);
                }
            }
        }
        if (attMonsters.length <= 0) {
            return null;
        }
        //小于0，代表要所有
        if (cheakNum < 0) {
            return attMonsters;
        }
        if (cheakNum >= attMonsters.length) {
            return attMonsters;
        }
        //2.对可以攻击的敌人进行优先级判断,选出cheakNum个目标作为打击单位
        //2.1优先攻击跟城墙最近的单位
        attMonsters.sort((a: cc.Node, b: cc.Node) => {
            return (a.y - targetPosY) - (b.y - targetPosY);
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
    getMonstersForCenterPos(cheakNum: number, targetPos: cc.Vec2, fanwei: number): cc.Node[] {
        if (cheakNum == 0) {
            return null;
        }
        let len = this.node.childrenCount;
        if (len <= 0) {
            return null;
        }
        //1.先检测在攻击范围内符合攻击单位的敌人
        let attMonsters: cc.Node[] = [];
        for (let i = 0; i < len; i++) {
            let monster = this.node.children[i];
            let monsterTS = monster.getComponent(Monster);
            if (monsterTS && monsterTS.getIsCanCheck()) {
                let distance = targetPos.sub(monsterTS.getCenterPos()).mag();
                if (distance <= fanwei) {
                    attMonsters.push(monster);
                }
            }
        }
        if (attMonsters.length <= 0) {
            return null;
        }
        //小于0，代表要所有
        if (cheakNum < 0) {
            return attMonsters;
        }
        //如果检测到的数量没有要检测的那么多，直接返回全部.
        if (cheakNum >= attMonsters.length) {
            return attMonsters;
        }
        //2.1优先攻击跟目标位置最近的单位，按照与pos的距离大小进行排列，从小到大
        attMonsters.sort((a: cc.Node, b: cc.Node) => {
            return a.getPosition().sub(targetPos).mag() - b.getPosition().sub(targetPos).mag();
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
    getMonstersForBingNvWallRect(rect: cc.Rect): BingNvWallData {
        let len = this.node.childrenCount;
        //1.先检测在攻击范围内符合攻击单位的敌人
        let bnwd = new BingNvWallData();
        let attMonsters: cc.Node[] = [];
        for (let i = 0; i < len; i++) {
            let monster = this.node.children[i];
            let monsterTS = monster.getComponent(Monster);
            if (monsterTS && monsterTS.getIsCanCheck()) {
                if (rect.contains(monster.getPosition())) {
                    attMonsters.push(monster);
                    if (monsterTS.getStrengthType() == StrengthType.Boss) {
                        bnwd.boss_ts = monsterTS;
                    }
                }
            }
        }
        bnwd.back_monsters = attMonsters;
        return bnwd;
    }
    /**
     * 返回生命值最高的敌人序列
     * @param cheakNum 检测数量，小于0表示所有，如-1
     * @param targetPos 
     * @param fanwei 
     * @returns 
     */
    getMonstersForMaxHp(cheakNum: number, targetPos: cc.Vec2, fanwei: number): cc.Node[] {
        if (cheakNum == 0) {
            return null;
        }
        let len = this.node.childrenCount;
        if (len <= 0) {
            return null;
        }
        //1.先检测在攻击范围内符合攻击单位的敌人
        let attMonsters: cc.Node[] = [];
        for (let i = 0; i < len; i++) {
            let monster = this.node.children[i];
            let monsterTS = monster.getComponent(Monster);
            if (monsterTS && monsterTS.getIsCanCheck()) {
                let distance = targetPos.sub(monster.getPosition()).mag();
                if (distance <= fanwei) {
                    attMonsters.push(monster);
                }
            }
        }
        if (attMonsters.length <= 0) {
            return null;
        }
        //小于0，代表要所有
        if (cheakNum < 0) {
            return attMonsters;
        }
        if (cheakNum >= attMonsters.length) {
            return attMonsters;
        }
        //2.对可以攻击的敌人进行优先级判断,选出cheakNum个目标作为打击单位
        //2.1优先攻击跟城墙最近的单位
        attMonsters.sort((a: cc.Node, b: cc.Node) => {
            return b.getComponent(Monster).getCurHp() - a.getComponent(Monster).getCurHp();
        });
        attMonsters.splice(cheakNum);
        return attMonsters;
    }

    /**
     * 返回生命值最高的敌人序列
     * @param cheakNum 检测数量，小于0表示所有，如-1
     * @param targetPos 
     * @param fanwei 
     * @returns 
     */
    getMonstersForMaxAttak(cheakNum: number, targetPos: cc.Vec2, fanwei: number): cc.Node[] {
        if (cheakNum == 0) {
            return null;
        }
        let len = this.node.childrenCount;
        if (len <= 0) {
            return null;
        }
        //1.先检测在攻击范围内符合攻击单位的敌人
        let attMonsters: cc.Node[] = [];
        for (let i = 0; i < len; i++) {
            let monster = this.node.children[i];
            let monsterTS = monster.getComponent(Monster);
            if (monsterTS && monsterTS.getIsCanCheck()) {
                let distance = targetPos.sub(monster.getPosition()).mag();
                if (distance <= fanwei) {
                    attMonsters.push(monster);
                }
            }
        }
        if (attMonsters.length <= 0) {
            return null;
        }
        //小于0，代表要所有
        if (cheakNum < 0) {
            return attMonsters;
        }
        if (cheakNum >= attMonsters.length) {
            return attMonsters;
        }
        //2.对可以攻击的敌人进行优先级判断,选出cheakNum个目标作为打击单位
        //2.1优先攻击跟城墙最近的单位
        attMonsters.sort((a: cc.Node, b: cc.Node) => {
            return b.getComponent(Monster).getCurAtt() - a.getComponent(Monster).getCurAtt();
        });
        attMonsters.splice(cheakNum);
        return attMonsters;
    }

    /**
     * //获取指定位置targetPos的指定范围fanwei内cheakNum个敌人
     * @param cheakNum 检测数量，小于0表示所有，如-1
     * @param targetPos 目标位置
     * @param radius 范围半径
     * @param minRadian 最小的弧度值
     * @param maxRadian 最大的弧度值
     * @returns 所有符合条件的敌人
     */
    getMonstersForRadian(cheakNum: number, targetPos: cc.Vec2, radius: number, minRadian: number, maxRadian: number): cc.Node[] {
        if (cheakNum == 0) {
            return null;
        }
        let len = this.node.childrenCount;
        if (len <= 0) {
            return null;
        }
        let p2 = Math.PI * 2;
        minRadian = (p2 + minRadian) % p2
        maxRadian = (p2 + maxRadian) % p2
        //1.先检测在攻击范围内符合攻击单位的敌人
        let attMonsters: cc.Node[] = [];
        for (let i = 0; i < len; i++) {
            let monster = this.node.children[i];
            let monsterTS = monster.getComponent(Monster);
            if (monsterTS && monsterTS.getIsCanCheck()) {
                //先判断是否在弧度范围内
                let offsetPos = monsterTS.getCenterPos().sub(targetPos);
                let radian = Math.atan2(offsetPos.y, offsetPos.x);
                radian = (p2 + radian) % p2
                // let angle=MyTool.radianToAngle(radian);
                // cc.log(angle);
                if (radian >= minRadian && radian <= maxRadian) {
                    let distance = offsetPos.mag();
                    if (distance <= radius) {
                        attMonsters.push(monster);
                    }
                }
            }
        }
        if (attMonsters.length <= 0) {
            return null;
        }
        //小于0，代表要所有
        if (cheakNum < 0) {
            return attMonsters;
        }
        // //如果检测到的数量没有要检测的那么多，直接返回全部.
        // if(cheakNum>=attMonsters.length)
        // {
        //     return attMonsters;
        // }
        // //2.1优先攻击跟目标位置最近的单位，按照与pos的距离大小进行排列，从小到大
        // attMonsters.sort((a:cc.Node,b:cc.Node)=>{
        //     return a.getPosition().sub(targetPos).mag()-b.getPosition().sub(targetPos).mag();
        // });
        // attMonsters.splice(cheakNum);
        return attMonsters;
    }

    //获取指定位置targetPos的指定范围fanwei内cheakNum个敌人(敌人专用，检测队友)
    getMonstersForMonsterPos(cheakNum: number, targetPos: cc.Vec2, fanwei: number): cc.Node[] {
        if (cheakNum == 0) {
            return null;
        }
        let len = this.node.childrenCount;
        if (len <= 0) {
            return null;
        }
        //1.先检测在攻击范围内符合攻击单位的敌人
        let attMonsters: cc.Node[] = [];
        for (let i = 0; i < len; i++) {
            let monster = this.node.children[i];
            let monsterTS = monster.getComponent(Monster);
            if (monsterTS && !monsterTS.getIsDie()) {
                let distance = targetPos.sub(monster.getPosition()).mag();
                if (distance <= fanwei) {
                    attMonsters.push(monster);
                }
            }
        }
        if (attMonsters.length <= 0) {
            return null;
        }
        //小于0，代表要所有
        if (cheakNum < 0) {
            return attMonsters;
        }
        //如果检测到的数量没有要检测的那么多，直接返回全部.
        if (cheakNum >= attMonsters.length) {
            return attMonsters;
        }
        attMonsters.splice(cheakNum);
        return attMonsters;
    }
    /**是否有敌人在城墙checkDistance距离内 */
    checkWallMonster(checkDistance: number): boolean {
        let len = this.node.childrenCount;
        let wallY = GameManager.getInstance().enemy_att_y;
        for (let i = 0; i < len; i++) {
            let monster = this.node.children[i];
            let monsterTS = monster.getComponent(Monster);
            if (monsterTS && !monsterTS.getIsDie()) {
                let distance = Math.abs(wallY - monster.y)
                if (distance <= checkDistance) {
                    return true;
                }
            }
        }
        return false
    }

    onAllBack() {
        return;
    }

    protected lateUpdate(dt: number): void {
        this.prev_uuid = "";
    }
}
