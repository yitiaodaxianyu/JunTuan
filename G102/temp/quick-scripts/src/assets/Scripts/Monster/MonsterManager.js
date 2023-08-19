"use strict";
cc._RF.push(module, '2d337IOSLZP+LIsHM9D05MN', 'MonsterManager');
// Scripts/Monster/MonsterManager.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var GameEffectsManager_1 = require("../Game/GameEffectsManager");
var GameManager_1 = require("../GameManager");
var MapNodePool_1 = require("../Game/MapNodePool");
var AudioConstants_1 = require("../Sound/AudioConstants");
var MonsterConfigure_1 = require("./Data/MonsterConfigure");
var Monster_1 = require("./Monster");
var MonsterData_1 = require("./MonsterData");
var GroundManager_1 = require("../Game/GroundManager");
var HeroConfig_1 = require("../Hero/Game/HeroConfig");
var EnemyConfig_1 = require("../Enemy/EnemyConfig");
var WallManager_1 = require("../Wall/WallManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MonsterManager = /** @class */ (function (_super) {
    __extends(MonsterManager, _super);
    function MonsterManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.is_load_ok = false;
        _this.ok_num = 0;
        /**当前关总共有多少敌人 */
        _this.total_monster_num = 0;
        /**击杀怪物数量 */
        _this.killed_monster_num = 0;
        //上船的怪物数量
        _this._ship_monster_num = 0;
        /**剩余怪物数量 */
        _this.drop_root = null;
        _this.coin_pos = cc.v2();
        _this.prev_uuid = "";
        return _this;
    }
    MonsterManager_1 = MonsterManager;
    MonsterManager.getInstance = function () {
        return this._instance;
    };
    MonsterManager.prototype.onLoad = function () {
        MonsterManager_1._instance = this;
        this.drop_root = cc.find('Canvas/Drop_Root');
        var iconBag = cc.find('Canvas/Ui_Root/top_ui/iconBg/iconCoin');
        var worldPos = iconBag.parent.convertToWorldSpaceAR(iconBag.getPosition());
        this.coin_pos = this.drop_root.convertToNodeSpaceAR(worldPos);
        _super.prototype.onLoad.call(this);
    };
    MonsterManager.prototype.start = function () {
        this.loadData();
    };
    MonsterManager.prototype.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
        MonsterManager_1._instance = null;
    };
    //加载当前关卡会出现的怪物
    MonsterManager.prototype.loadData = function () {
        var _this = this;
        this.is_load_ok = false;
        this.ok_num = 0;
        var fightingInfo = GameManager_1.default.getInstance().fighting_info;
        this.killed_monster_num = 0;
        this.ship_monster_num = 0;
        this.total_monster_num = fightingInfo.total_monster_num;
        this.prev_uuid = "";
        //怪物id数组
        var monsterDataMap = fightingInfo.getOnlyMonsterTypeMap();
        //let MSM=MonsterConfigureManager.getInstance();        
        var len = monsterDataMap.size;
        var bossLoadNum = 0;
        // console.log("+++++++++",monsterDataMap)
        monsterDataMap.forEach(function (v, k) {
            _super.prototype.addNodePool.call(_this, k, 'monster/Monster_' + k, 4, function (node) {
                _this.ok_num++;
                if (_this.ok_num >= len && bossLoadNum <= 0) {
                    _this.is_load_ok = true;
                }
            });
            if (v == MonsterData_1.StrengthType.Boss) {
                if (GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.boss_hp, 1, function () {
                    bossLoadNum--;
                    if (_this.ok_num >= len && bossLoadNum <= 0) {
                        _this.is_load_ok = true;
                    }
                })) {
                    bossLoadNum++;
                }
                if (GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.boss_coming, 1, function () {
                    bossLoadNum--;
                    if (_this.ok_num >= len && bossLoadNum <= 0) {
                        _this.is_load_ok = true;
                    }
                })) {
                    bossLoadNum++;
                }
            }
        });
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.drop_coin, 16);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.drop_gem, 16);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.drop_gem_shadow, 16);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.drop_coin_shadow, 16);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.monster_normal_att, 8);
        // GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.boss1_att_move,2);
        // GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.boss1_att_end,2);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.monster_die, 8);
    };
    Object.defineProperty(MonsterManager.prototype, "ship_monster_num", {
        get: function () {
            return this._ship_monster_num;
        },
        set: function (v) {
            this._ship_monster_num = v;
            if (this._ship_monster_num >= 10) {
                GameManager_1.default.getInstance().showGameLose();
            }
        },
        enumerable: false,
        configurable: true
    });
    MonsterManager.prototype.addMonsterPool = function (id, initCount, loadCallback) {
        var MSM = MonsterConfigure_1.MonsterConfigureManager.getInstance();
        var jsonData = MSM.getJsonMonsterConfigure(id);
        var type = jsonData.MonsterClass;
        _super.prototype.addNodePool.call(this, type, 'monster/Monster_' + type, initCount, loadCallback);
    };
    /**
     * 根据怪物id创建一个敌人
     * @param id 怪物id
     * @param pos 生成位置
     * @param level 怪物等级
     * @param hpRate 血量比率
     * @param isCanCount 是否可以计数（用于区分召唤物）
     * @returns
     */
    MonsterManager.prototype.createMonsterById = function (id, pos, level, hpRate, isCanCount) {
        if (isCanCount === void 0) { isCanCount = true; }
        // console.log("_______",pos.x,pos.y)
        var type = MonsterConfigure_1.MonsterConfigureManager.getInstance().getMonsterClass(id);
        var node = _super.prototype.getNodeById.call(this, type);
        this.node.addChild(node);
        node.setPosition(pos);
        node.getComponent(Monster_1.default).init(id, level, hpRate, isCanCount);
        return node;
    };
    /**
     * boss创建召唤物
     * @param monsterId 怪物id
     * @param pos 生成位置
     * @param bossAttribute boss的属性
     * @returns
     */
    MonsterManager.prototype.createSummonMonster = function (monsterId, level, pos) {
        var _this = this;
        //召唤特效
        var quan = GroundManager_1.default.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.monster_zhaohuan, pos);
        var spine = quan.getComponent(sp.Skeleton);
        var track = spine.setAnimation(0, "Boss10_Skill2_ZhaoHuan_2", false);
        spine.setTrackEventListener(track, function (entry, event) {
            if (event.data.name == "ZhaoHuan") {
                _this.createMonsterById(monsterId, pos, level, 1, false);
            }
        });
        spine.setCompleteListener(function () {
            spine.setCompleteListener(null);
            GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(GameEffectsManager_1.GameEffectId.monster_zhaohuan, quan);
        });
    };
    /**即将删除敌人，可以在此播放音效 */
    MonsterManager.prototype.willDestroyMonster = function (monsterTs) {
        //是否要运行动作后再销毁
        var isActionDie = true;
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_Shouji);
        //爆金币
        // let pos = monsterTs.node.getPosition();
        // if (GameManager.getInstance().cur_game_mode == GameMode.Main) {
        //     this.createDropProp(pos, GameEffectId.drop_coin);
        //     this.createDropProp(pos, GameEffectId.drop_coin);
        //     this.createDropProp(pos, GameEffectId.drop_gem);
        // }
        return isActionDie;
    };
    //有怪上船了
    MonsterManager.prototype.upShipMonster = function () {
        if (this.killed_monster_num + this.ship_monster_num >= this.total_monster_num) {
            if (this.getRemainMonster() <= 0) {
                GameManager_1.default.getInstance().showGameWin();
            }
        }
    };
    /**回收敌人到对象池 */
    MonsterManager.prototype.destroyMonster = function (node, type, isCanWin) {
        if (isCanWin === void 0) { isCanWin = true; }
        node.color = cc.Color.WHITE;
        var monsterTs = node.getComponent(Monster_1.default);
        monsterTs.setEnemyState(EnemyConfig_1.Enemy_State.die);
        //要区分召唤怪
        if (monsterTs.is_can_count) {
            if (monsterTs.uuid == this.prev_uuid) {
                //console.error("可能重复计数了:");
                return;
            }
            this.prev_uuid = monsterTs.uuid;
            this.killed_monster_num++;
            GameManager_1.default.getInstance().onEnemyDie(monsterTs.score, monsterTs.is_can_count);
        }
        if (this.killed_monster_num + this.ship_monster_num >= this.total_monster_num) {
            if (isCanWin) {
                if (this.getRemainMonster() <= 0) {
                    GameManager_1.default.getInstance().showGameWin();
                }
            }
        }
        // //回收前标记可以
        // if(monsterTs){
        //     monsterTs.setIsCanCount(true);
        // }
        _super.prototype.destroyNode.call(this, type, node);
    };
    MonsterManager.prototype.getRemainMonster = function () {
        var num = 0;
        var len = this.node.childrenCount;
        for (var i = 0; i < len; i++) {
            var monster = this.node.children[i];
            var monsterTS = monster.getComponent(Monster_1.default);
            if (monsterTS && monsterTS.getIsDie() == false) {
                num++;
            }
        }
        return num;
    };
    MonsterManager.prototype.createDropProp = function (pos, id) {
        var prop = GroundManager_1.default.getInstance().createGameEffectById(id, pos, 2);
        //this.node.getComponent(cc.Sprite).spriteFrame=PropManager.getInstance().getSpByPropId(PropId.Coin);
        prop.opacity = 255;
        //prop.scale=0.5;
        var xx = Math.random() * 20 + 30;
        xx *= Math.random() < 0.5 ? 1 : -1;
        var yy = Math.random() * 40 - 20;
        var height = Math.random() * 20 + 30;
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
            .delay(10).to(0.5, { opacity: 0 }).call(function () {
            GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(id, prop);
        }).start();
    };
    MonsterManager.prototype.destroyAllDrop = function () {
        var drops = this.drop_root.children;
        var len = drops.length;
        var _loop_1 = function (i) {
            var prop = drops[0];
            var id = parseInt(prop.name);
            if (id) {
                cc.tween(prop).to(0.5, { opacity: 0 }).call(function () {
                    GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(id, prop);
                }).start();
            }
        };
        for (var i = 0; i < len; i++) {
            _loop_1(i);
        }
    };
    //复活杀死所有非boos怪
    MonsterManager.prototype.destoryByfuhuo = function () {
        var allMonster = this.node.children;
        var len = allMonster.length;
        for (var i = 0; i < len; i++) {
            var monster = allMonster[i];
            if (monster) {
                var monsterTS = monster.getComponent(Monster_1.default);
                if (monsterTS && monsterTS.getStrengthType() != 3) {
                    monsterTS.dieByfuhuo();
                }
            }
        }
    };
    MonsterManager.prototype.destroyAllMonster = function () {
        var allMonster = this.node.children;
        var len = allMonster.length;
        for (var i = 0; i < len; i++) {
            var monster = allMonster[0];
            if (monster) {
                var monsterTS = monster.getComponent(Monster_1.default);
                if (monsterTS) {
                    monsterTS.hidShadow();
                    this.destroyMonster(monster, monsterTS.monster_type);
                }
            }
        }
    };
    //--------------------------GET--------------------------------------------------
    /**
     * 获取指定位置targetPos的指定范围fanwei内靠近城墙最近的cheakNum个敌人
     * @param cheakNum 检测数量
     * @param targetPos 指定的位置，一般是自身位置
     * @param fanwei 指定的检测范围，一般是攻击距离
     * @returns 所有满足条件的敌人
     */
    MonsterManager.prototype.getMonstersForNearest = function (cheakNum, targetPos, fanwei, posIndex) {
        if (posIndex === void 0) { posIndex = null; }
        if (cheakNum == 0) {
            return null;
        }
        var len = this.node.childrenCount;
        if (len <= 0) {
            return null;
        }
        //1.先检测在攻击范围内符合攻击单位的敌人
        var attMonsters = [];
        for (var i = 0; i < len; i++) {
            var monster = this.node.children[i];
            var monsterTS = monster.getComponent(Monster_1.default);
            if (monsterTS && monsterTS.getIsCanCheck()) {
                var distance = targetPos.sub(monster.getPosition()).mag();
                if (distance <= fanwei) {
                    if (posIndex == null || posIndex == -1) {
                        attMonsters.push(monster);
                    }
                    else {
                        if (monsterTS.monster_id >= 30381) {
                            if (Math.abs(monster.x - GameManager_1.default.getInstance().charPosX) <= 200 && monster.y > WallManager_1.default.getInstance().getMainWall().getWallRect().yMax) {
                                attMonsters.push(monster);
                            }
                        }
                        else {
                            if (Math.abs(monster.x - GameManager_1.default.getInstance().charPosX) <= 100 && monster.y > WallManager_1.default.getInstance().getMainWall().getWallRect().yMax) {
                                attMonsters.push(monster);
                            }
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
        attMonsters.sort(function (a, b) {
            return a.getPosition().sub(targetPos).mag() - b.getPosition().sub(targetPos).mag();
        });
        attMonsters.splice(cheakNum);
        return attMonsters;
    };
    /**
     * 获取指定位置targetPos的指定范围fanwei内靠近城墙最近的cheakNum个敌人
     * @param cheakNum 检测数量
     * @param targetPos 指定的位置，一般是自身位置
     * @param fanwei 指定的检测范围，一般是攻击距离
     * @returns 所有满足条件的敌人
     */
    MonsterManager.prototype.getMonstersForNearestBySkill = function (cheakNum, targetPosY, fanwei) {
        if (cheakNum == 0) {
            return null;
        }
        var len = this.node.childrenCount;
        if (len <= 0) {
            return null;
        }
        //1.先检测在攻击范围内符合攻击单位的敌人
        var attMonsters = [];
        for (var i = 0; i < len; i++) {
            var monster = this.node.children[i];
            var monsterTS = monster.getComponent(Monster_1.default);
            if (monsterTS && monsterTS.getIsCanCheck()) {
                var distance = monsterTS.getCenterPos().y - targetPosY;
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
        attMonsters.sort(function (a, b) {
            return (a.y - targetPosY) - (b.y - targetPosY);
        });
        attMonsters.splice(cheakNum);
        return attMonsters;
    };
    /**
     * //获取指定位置targetPos的指定范围fanwei内cheakNum个敌人
     * @param cheakNum 检测数量，小于0表示所有，如-1
     * @param targetPos 目标位置
     * @param fanwei 范围
     * @returns 所有符合条件的敌人
     */
    MonsterManager.prototype.getMonstersForCenterPos = function (cheakNum, targetPos, fanwei) {
        if (cheakNum == 0) {
            return null;
        }
        var len = this.node.childrenCount;
        if (len <= 0) {
            return null;
        }
        //1.先检测在攻击范围内符合攻击单位的敌人
        var attMonsters = [];
        for (var i = 0; i < len; i++) {
            var monster = this.node.children[i];
            var monsterTS = monster.getComponent(Monster_1.default);
            if (monsterTS && monsterTS.getIsCanCheck()) {
                var distance = targetPos.sub(monsterTS.getCenterPos()).mag();
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
        attMonsters.sort(function (a, b) {
            return a.getPosition().sub(targetPos).mag() - b.getPosition().sub(targetPos).mag();
        });
        attMonsters.splice(cheakNum);
        return attMonsters;
    };
    /**
     * //获取指定位置targetPos的指定范围fanwei内cheakNum个敌人
     * @param cheakNum 检测数量，小于0表示所有，如-1
     * @param targetPos 目标位置
     * @param fanwei 范围
     * @returns 所有符合条件的敌人
     */
    MonsterManager.prototype.getMonstersForBingNvWallRect = function (rect) {
        var len = this.node.childrenCount;
        //1.先检测在攻击范围内符合攻击单位的敌人
        var bnwd = new HeroConfig_1.BingNvWallData();
        var attMonsters = [];
        for (var i = 0; i < len; i++) {
            var monster = this.node.children[i];
            var monsterTS = monster.getComponent(Monster_1.default);
            if (monsterTS && monsterTS.getIsCanCheck()) {
                if (rect.contains(monster.getPosition())) {
                    attMonsters.push(monster);
                    if (monsterTS.getStrengthType() == MonsterData_1.StrengthType.Boss) {
                        bnwd.boss_ts = monsterTS;
                    }
                }
            }
        }
        bnwd.back_monsters = attMonsters;
        return bnwd;
    };
    /**
     * 返回生命值最高的敌人序列
     * @param cheakNum 检测数量，小于0表示所有，如-1
     * @param targetPos
     * @param fanwei
     * @returns
     */
    MonsterManager.prototype.getMonstersForMaxHp = function (cheakNum, targetPos, fanwei) {
        if (cheakNum == 0) {
            return null;
        }
        var len = this.node.childrenCount;
        if (len <= 0) {
            return null;
        }
        //1.先检测在攻击范围内符合攻击单位的敌人
        var attMonsters = [];
        for (var i = 0; i < len; i++) {
            var monster = this.node.children[i];
            var monsterTS = monster.getComponent(Monster_1.default);
            if (monsterTS && monsterTS.getIsCanCheck()) {
                var distance = targetPos.sub(monster.getPosition()).mag();
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
        attMonsters.sort(function (a, b) {
            return b.getComponent(Monster_1.default).getCurHp() - a.getComponent(Monster_1.default).getCurHp();
        });
        attMonsters.splice(cheakNum);
        return attMonsters;
    };
    /**
     * 返回生命值最高的敌人序列
     * @param cheakNum 检测数量，小于0表示所有，如-1
     * @param targetPos
     * @param fanwei
     * @returns
     */
    MonsterManager.prototype.getMonstersForMaxAttak = function (cheakNum, targetPos, fanwei) {
        if (cheakNum == 0) {
            return null;
        }
        var len = this.node.childrenCount;
        if (len <= 0) {
            return null;
        }
        //1.先检测在攻击范围内符合攻击单位的敌人
        var attMonsters = [];
        for (var i = 0; i < len; i++) {
            var monster = this.node.children[i];
            var monsterTS = monster.getComponent(Monster_1.default);
            if (monsterTS && monsterTS.getIsCanCheck()) {
                var distance = targetPos.sub(monster.getPosition()).mag();
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
        attMonsters.sort(function (a, b) {
            return b.getComponent(Monster_1.default).getCurAtt() - a.getComponent(Monster_1.default).getCurAtt();
        });
        attMonsters.splice(cheakNum);
        return attMonsters;
    };
    /**
     * //获取指定位置targetPos的指定范围fanwei内cheakNum个敌人
     * @param cheakNum 检测数量，小于0表示所有，如-1
     * @param targetPos 目标位置
     * @param radius 范围半径
     * @param minRadian 最小的弧度值
     * @param maxRadian 最大的弧度值
     * @returns 所有符合条件的敌人
     */
    MonsterManager.prototype.getMonstersForRadian = function (cheakNum, targetPos, radius, minRadian, maxRadian) {
        if (cheakNum == 0) {
            return null;
        }
        var len = this.node.childrenCount;
        if (len <= 0) {
            return null;
        }
        var p2 = Math.PI * 2;
        minRadian = (p2 + minRadian) % p2;
        maxRadian = (p2 + maxRadian) % p2;
        //1.先检测在攻击范围内符合攻击单位的敌人
        var attMonsters = [];
        for (var i = 0; i < len; i++) {
            var monster = this.node.children[i];
            var monsterTS = monster.getComponent(Monster_1.default);
            if (monsterTS && monsterTS.getIsCanCheck()) {
                //先判断是否在弧度范围内
                var offsetPos = monsterTS.getCenterPos().sub(targetPos);
                var radian = Math.atan2(offsetPos.y, offsetPos.x);
                radian = (p2 + radian) % p2;
                // let angle=MyTool.radianToAngle(radian);
                // cc.log(angle);
                if (radian >= minRadian && radian <= maxRadian) {
                    var distance = offsetPos.mag();
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
    };
    //获取指定位置targetPos的指定范围fanwei内cheakNum个敌人(敌人专用，检测队友)
    MonsterManager.prototype.getMonstersForMonsterPos = function (cheakNum, targetPos, fanwei) {
        if (cheakNum == 0) {
            return null;
        }
        var len = this.node.childrenCount;
        if (len <= 0) {
            return null;
        }
        //1.先检测在攻击范围内符合攻击单位的敌人
        var attMonsters = [];
        for (var i = 0; i < len; i++) {
            var monster = this.node.children[i];
            var monsterTS = monster.getComponent(Monster_1.default);
            if (monsterTS && !monsterTS.getIsDie()) {
                var distance = targetPos.sub(monster.getPosition()).mag();
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
    };
    /**是否有敌人在城墙checkDistance距离内 */
    MonsterManager.prototype.checkWallMonster = function (checkDistance) {
        var len = this.node.childrenCount;
        var wallY = GameManager_1.default.getInstance().enemy_att_y;
        for (var i = 0; i < len; i++) {
            var monster = this.node.children[i];
            var monsterTS = monster.getComponent(Monster_1.default);
            if (monsterTS && !monsterTS.getIsDie()) {
                var distance = Math.abs(wallY - monster.y);
                if (distance <= checkDistance) {
                    return true;
                }
            }
        }
        return false;
    };
    MonsterManager.prototype.onAllBack = function () {
        return;
    };
    MonsterManager.prototype.lateUpdate = function (dt) {
        this.prev_uuid = "";
    };
    var MonsterManager_1;
    MonsterManager._instance = null;
    MonsterManager = MonsterManager_1 = __decorate([
        ccclass
    ], MonsterManager);
    return MonsterManager;
}(MapNodePool_1.default));
exports.default = MonsterManager;

cc._RF.pop();