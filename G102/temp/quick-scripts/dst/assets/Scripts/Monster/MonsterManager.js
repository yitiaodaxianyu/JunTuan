
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Monster/MonsterManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
var Constants_1 = require("../Constants");
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
        this.destroyAllMonster();
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
        var pos = monsterTs.node.getPosition();
        if (GameManager_1.default.getInstance().cur_game_mode == Constants_1.GameMode.Main) {
            this.createDropProp(pos, GameEffectsManager_1.GameEffectId.drop_coin);
            this.createDropProp(pos, GameEffectsManager_1.GameEffectId.drop_coin);
            this.createDropProp(pos, GameEffectsManager_1.GameEffectId.drop_gem);
        }
        return isActionDie;
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
            var prop = drops[i];
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
    MonsterManager.prototype.destroyAllMonster = function () {
        var allMonster = this.node.children;
        var len = allMonster.length;
        for (var i = 0; i < len; i++) {
            var monster = allMonster[i];
            if (monster) {
                var monsterTS = monster.getComponent(Monster_1.default);
                if (monsterTS) {
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
                        if (Math.abs(monster.x - GameManager_1.default.getInstance().charPosX) <= 75 && monster.y > WallManager_1.default.getInstance().getMainWall().getWallRect().yMax) {
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTW9uc3RlclxcTW9uc3Rlck1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMENBQWlEO0FBQ2pELGlFQUE4RTtBQUM5RSw4Q0FBeUM7QUFDekMsbURBQThDO0FBQzlDLDBEQUFxRDtBQUNyRCw0REFBa0U7QUFDbEUscUNBQWdDO0FBQ2hDLDZDQUE2QztBQUM3Qyx1REFBa0Q7QUFDbEQsc0RBQXlEO0FBRXpELG9EQUFtRDtBQUNuRCxtREFBOEM7QUFJeEMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBNEMsa0NBQVc7SUFBdkQ7UUFBQSxxRUFzcEJDO1FBcHBCRyxnQkFBVSxHQUFZLEtBQUssQ0FBQztRQUNwQixZQUFNLEdBQVcsQ0FBQyxDQUFDO1FBQzNCLGdCQUFnQjtRQUNoQix1QkFBaUIsR0FBVyxDQUFDLENBQUM7UUFDOUIsWUFBWTtRQUNaLHdCQUFrQixHQUFXLENBQUMsQ0FBQztRQUMvQixTQUFTO1FBQ0QsdUJBQWlCLEdBQVcsQ0FBQyxDQUFDO1FBQ3RDLFlBQVk7UUFDWixlQUFTLEdBQVksSUFBSSxDQUFDO1FBQzFCLGNBQVEsR0FBWSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7UUF1STVCLGVBQVMsR0FBVyxFQUFFLENBQUM7O0lBbWdCM0IsQ0FBQzt1QkF0cEJvQixjQUFjO0lBaUJqQiwwQkFBVyxHQUF6QjtRQUNJLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBRUQsK0JBQU0sR0FBTjtRQUNJLGdCQUFjLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUNoQyxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUM3QyxJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUMs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QUNsQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUNsQyxJQUFJLEtBQUssR0FBRyxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQztRQUNsRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzFCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLElBQUksU0FBUyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsaUJBQU8sQ0FBQyxDQUFDO1lBQzlDLElBQUksU0FBUyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxFQUFFO2dCQUNwQyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUE7Z0JBQzFDLElBQUksUUFBUSxJQUFJLGFBQWEsRUFBRTtvQkFDM0IsT0FBTyxJQUFJLENBQUM7aUJBQ2Y7YUFDSjtTQUNKO1FBQ0QsT0FBTyxLQUFLLENBQUE7SUFDaEIsQ0FBQztJQUVELGtDQUFTLEdBQVQ7UUFDSSxPQUFPO0lBQ1gsQ0FBQztJQUVTLG1DQUFVLEdBQXBCLFVBQXFCLEVBQVU7UUFDM0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFDeEIsQ0FBQzs7SUF2b0JjLHdCQUFTLEdBQW1CLElBQUksQ0FBQztJQWQvQixjQUFjO1FBRGxDLE9BQU87T0FDYSxjQUFjLENBc3BCbEM7SUFBRCxxQkFBQztDQXRwQkQsQUFzcEJDLENBdHBCMkMscUJBQVcsR0FzcEJ0RDtrQkF0cEJvQixjQUFjIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR2FtZU1vZGUsIElzRGVidWcgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IEdhbWVFZmZlY3RJZCwgR2FtZUVmZmVjdHNNYW5hZ2VyIH0gZnJvbSBcIi4uL0dhbWUvR2FtZUVmZmVjdHNNYW5hZ2VyXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IE1hcE5vZGVQb29sIGZyb20gXCIuLi9HYW1lL01hcE5vZGVQb29sXCI7XHJcbmltcG9ydCB7IFNvdW5kSW5kZXggfSBmcm9tIFwiLi4vU291bmQvQXVkaW9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgTW9uc3RlckNvbmZpZ3VyZU1hbmFnZXIgfSBmcm9tIFwiLi9EYXRhL01vbnN0ZXJDb25maWd1cmVcIjtcclxuaW1wb3J0IE1vbnN0ZXIgZnJvbSBcIi4vTW9uc3RlclwiO1xyXG5pbXBvcnQgeyBTdHJlbmd0aFR5cGUgfSBmcm9tIFwiLi9Nb25zdGVyRGF0YVwiO1xyXG5pbXBvcnQgR3JvdW5kTWFuYWdlciBmcm9tIFwiLi4vR2FtZS9Hcm91bmRNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEJpbmdOdldhbGxEYXRhIH0gZnJvbSBcIi4uL0hlcm8vR2FtZS9IZXJvQ29uZmlnXCI7XHJcbmltcG9ydCB7IEpzb25Nb25zdGVyR3Jvd3RoQXR0cmlidXRlcyB9IGZyb20gXCIuL0RhdGEvTW9uc3Rlckdyb3d0aEF0dHJpYnV0ZXNcIjtcclxuaW1wb3J0IHsgRW5lbXlfU3RhdGUgfSBmcm9tIFwiLi4vRW5lbXkvRW5lbXlDb25maWdcIjtcclxuaW1wb3J0IFdhbGxNYW5hZ2VyIGZyb20gXCIuLi9XYWxsL1dhbGxNYW5hZ2VyXCI7XHJcblxyXG5cclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb25zdGVyTWFuYWdlciBleHRlbmRzIE1hcE5vZGVQb29sIHtcclxuXHJcbiAgICBpc19sb2FkX29rOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIG9rX251bTogbnVtYmVyID0gMDtcclxuICAgIC8qKuW9k+WJjeWFs+aAu+WFseacieWkmuWwkeaVjOS6uiAqL1xyXG4gICAgdG90YWxfbW9uc3Rlcl9udW06IG51bWJlciA9IDA7XHJcbiAgICAvKirlh7vmnYDmgKrnianmlbDph48gKi9cclxuICAgIGtpbGxlZF9tb25zdGVyX251bTogbnVtYmVyID0gMDtcclxuICAgIC8v5LiK6Ii555qE5oCq54mp5pWw6YePXHJcbiAgICBwcml2YXRlIF9zaGlwX21vbnN0ZXJfbnVtOiBudW1iZXIgPSAwO1xyXG4gICAgLyoq5Ymp5L2Z5oCq54mp5pWw6YePICovXHJcbiAgICBkcm9wX3Jvb3Q6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgY29pbl9wb3M6IGNjLlZlYzIgPSBjYy52MigpO1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogTW9uc3Rlck1hbmFnZXIgPSBudWxsO1xyXG5cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IE1vbnN0ZXJNYW5hZ2VyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIE1vbnN0ZXJNYW5hZ2VyLl9pbnN0YW5jZSA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5kcm9wX3Jvb3QgPSBjYy5maW5kKCdDYW52YXMvRHJvcF9Sb290Jyk7XHJcbiAgICAgICAgbGV0IGljb25CYWcgPSBjYy5maW5kKCdDYW52YXMvVWlfUm9vdC90b3BfdWkvaWNvbkJnL2ljb25Db2luJyk7XHJcbiAgICAgICAgbGV0IHdvcmxkUG9zID0gaWNvbkJhZy5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKGljb25CYWcuZ2V0UG9zaXRpb24oKSk7XHJcbiAgICAgICAgdGhpcy5jb2luX3BvcyA9IHRoaXMuZHJvcF9yb290LmNvbnZlcnRUb05vZGVTcGFjZUFSKHdvcmxkUG9zKTtcclxuICAgICAgICBzdXBlci5vbkxvYWQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgc3RhcnQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5sb2FkRGF0YSgpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRGVzdHJveSgpIHtcclxuICAgICAgICBzdXBlci5vbkRlc3Ryb3koKTtcclxuICAgICAgICBNb25zdGVyTWFuYWdlci5faW5zdGFuY2UgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Yqg6L295b2T5YmN5YWz5Y2h5Lya5Ye6546w55qE5oCq54mpXHJcbiAgICBsb2FkRGF0YSgpIHtcclxuICAgICAgICB0aGlzLmlzX2xvYWRfb2sgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm9rX251bSA9IDA7XHJcbiAgICAgICAgbGV0IGZpZ2h0aW5nSW5mbyA9IEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZmlnaHRpbmdfaW5mbztcclxuICAgICAgICB0aGlzLmtpbGxlZF9tb25zdGVyX251bSA9IDA7XHJcbiAgICAgICAgdGhpcy5zaGlwX21vbnN0ZXJfbnVtPTA7XHJcbiAgICAgICAgdGhpcy5kZXN0cm95QWxsTW9uc3RlcigpO1xyXG4gICAgICAgIHRoaXMudG90YWxfbW9uc3Rlcl9udW0gPSBmaWdodGluZ0luZm8udG90YWxfbW9uc3Rlcl9udW07XHJcbiAgICAgICAgdGhpcy5wcmV2X3V1aWQgPSBcIlwiO1xyXG4gICAgICAgIC8v5oCq54mpaWTmlbDnu4RcclxuICAgICAgICBsZXQgbW9uc3RlckRhdGFNYXAgPSBmaWdodGluZ0luZm8uZ2V0T25seU1vbnN0ZXJUeXBlTWFwKCk7XHJcbiAgICAgICAgLy9sZXQgTVNNPU1vbnN0ZXJDb25maWd1cmVNYW5hZ2VyLmdldEluc3RhbmNlKCk7ICAgICAgICBcclxuICAgICAgICBsZXQgbGVuID0gbW9uc3RlckRhdGFNYXAuc2l6ZTtcclxuICAgICAgICBsZXQgYm9zc0xvYWROdW0gPSAwO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiKysrKysrKysrXCIsbW9uc3RlckRhdGFNYXApXHJcbiAgICAgICAgbW9uc3RlckRhdGFNYXAuZm9yRWFjaCgodiwgaykgPT4ge1xyXG4gICAgICAgICAgICBzdXBlci5hZGROb2RlUG9vbChrLCAnbW9uc3Rlci9Nb25zdGVyXycgKyBrLCA0LCAobm9kZTogY2MuTm9kZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5va19udW0rKztcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5va19udW0gPj0gbGVuICYmIGJvc3NMb2FkTnVtIDw9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzX2xvYWRfb2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKHYgPT0gU3RyZW5ndGhUeXBlLkJvc3MpIHtcclxuICAgICAgICAgICAgICAgIGlmIChHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRFZmZlY3RQb29sQnlJZChHYW1lRWZmZWN0SWQuYm9zc19ocCwgMSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGJvc3NMb2FkTnVtLS07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMub2tfbnVtID49IGxlbiAmJiBib3NzTG9hZE51bSA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNfbG9hZF9vayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBib3NzTG9hZE51bSsrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEVmZmVjdFBvb2xCeUlkKEdhbWVFZmZlY3RJZC5ib3NzX2NvbWluZywgMSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGJvc3NMb2FkTnVtLS07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMub2tfbnVtID49IGxlbiAmJiBib3NzTG9hZE51bSA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNfbG9hZF9vayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBib3NzTG9hZE51bSsrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRFZmZlY3RQb29sQnlJZChHYW1lRWZmZWN0SWQuZHJvcF9jb2luLCAxNik7XHJcbiAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRWZmZWN0UG9vbEJ5SWQoR2FtZUVmZmVjdElkLmRyb3BfZ2VtLCAxNik7XHJcbiAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRWZmZWN0UG9vbEJ5SWQoR2FtZUVmZmVjdElkLmRyb3BfZ2VtX3NoYWRvdywgMTYpO1xyXG4gICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEVmZmVjdFBvb2xCeUlkKEdhbWVFZmZlY3RJZC5kcm9wX2NvaW5fc2hhZG93LCAxNik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBzaGlwX21vbnN0ZXJfbnVtKHYgOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9zaGlwX21vbnN0ZXJfbnVtID0gdjtcclxuICAgICAgICBpZih0aGlzLl9zaGlwX21vbnN0ZXJfbnVtPj0xMCl7XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0dhbWVMb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHNoaXBfbW9uc3Rlcl9udW0oKSA6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NoaXBfbW9uc3Rlcl9udW07XHJcbiAgICB9XHJcbiAgICBcclxuICAgIFxyXG4gICAgYWRkTW9uc3RlclBvb2woaWQ6IG51bWJlciwgaW5pdENvdW50OiBudW1iZXIsIGxvYWRDYWxsYmFjaz86IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgbGV0IE1TTSA9IE1vbnN0ZXJDb25maWd1cmVNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgbGV0IGpzb25EYXRhID0gTVNNLmdldEpzb25Nb25zdGVyQ29uZmlndXJlKGlkKTtcclxuICAgICAgICBsZXQgdHlwZSA9IGpzb25EYXRhLk1vbnN0ZXJDbGFzcztcclxuICAgICAgICBzdXBlci5hZGROb2RlUG9vbCh0eXBlLCAnbW9uc3Rlci9Nb25zdGVyXycgKyB0eXBlLCBpbml0Q291bnQsIGxvYWRDYWxsYmFjayk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOagueaNruaAqueJqWlk5Yib5bu65LiA5Liq5pWM5Lq6XHJcbiAgICAgKiBAcGFyYW0gaWQg5oCq54mpaWRcclxuICAgICAqIEBwYXJhbSBwb3Mg55Sf5oiQ5L2N572uXHJcbiAgICAgKiBAcGFyYW0gbGV2ZWwg5oCq54mp562J57qnXHJcbiAgICAgKiBAcGFyYW0gaHBSYXRlIOihgOmHj+avlOeOh1xyXG4gICAgICogQHBhcmFtIGlzQ2FuQ291bnQg5piv5ZCm5Y+v5Lul6K6h5pWw77yI55So5LqO5Yy65YiG5Y+s5ZSk54mp77yJXHJcbiAgICAgKiBAcmV0dXJucyBcclxuICAgICAqL1xyXG4gICAgY3JlYXRlTW9uc3RlckJ5SWQoaWQ6IG51bWJlciwgcG9zOiBjYy5WZWMyLCBsZXZlbDogbnVtYmVyLCBocFJhdGU6IG51bWJlciwgaXNDYW5Db3VudDogYm9vbGVhbiA9IHRydWUpOiBjYy5Ob2RlIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIl9fX19fX19cIixwb3MueCxwb3MueSlcclxuICAgICAgICBsZXQgdHlwZSA9IE1vbnN0ZXJDb25maWd1cmVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TW9uc3RlckNsYXNzKGlkKTtcclxuICAgICAgICBsZXQgbm9kZSA9IHN1cGVyLmdldE5vZGVCeUlkKHR5cGUpO1xyXG4gICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICBub2RlLnNldFBvc2l0aW9uKHBvcyk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoTW9uc3RlcikuaW5pdChpZCwgbGV2ZWwsIGhwUmF0ZSwgaXNDYW5Db3VudCk7XHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIGJvc3PliJvlu7rlj6zllKTnialcclxuICAgICAqIEBwYXJhbSBtb25zdGVySWQg5oCq54mpaWRcclxuICAgICAqIEBwYXJhbSBwb3Mg55Sf5oiQ5L2N572uXHJcbiAgICAgKiBAcGFyYW0gYm9zc0F0dHJpYnV0ZSBib3Nz55qE5bGe5oCnXHJcbiAgICAgKiBAcmV0dXJucyBcclxuICAgICAqL1xyXG4gICAgY3JlYXRlU3VtbW9uTW9uc3Rlcihtb25zdGVySWQ6IG51bWJlciwgbGV2ZWw6IG51bWJlciwgcG9zOiBjYy5WZWMyKSB7XHJcbiAgICAgICAgLy/lj6zllKTnibnmlYhcclxuICAgICAgICBsZXQgcXVhbiA9IEdyb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQubW9uc3Rlcl96aGFvaHVhbiwgcG9zKTtcclxuICAgICAgICBsZXQgc3BpbmUgPSBxdWFuLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbik7XHJcbiAgICAgICAgbGV0IHRyYWNrID0gc3BpbmUuc2V0QW5pbWF0aW9uKDAsIFwiQm9zczEwX1NraWxsMl9aaGFvSHVhbl8yXCIsIGZhbHNlKTtcclxuICAgICAgICBzcGluZS5zZXRUcmFja0V2ZW50TGlzdGVuZXIodHJhY2ssIChlbnRyeTogc3Auc3BpbmUuVHJhY2tFbnRyeSwgZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgaWYgKGV2ZW50LmRhdGEubmFtZSA9PSBcIlpoYW9IdWFuXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlTW9uc3RlckJ5SWQobW9uc3RlcklkLCBwb3MsIGxldmVsLCAxLCBmYWxzZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgc3BpbmUuc2V0Q29tcGxldGVMaXN0ZW5lcigoKSA9PiB7XHJcbiAgICAgICAgICAgIHNwaW5lLnNldENvbXBsZXRlTGlzdGVuZXIobnVsbCk7XHJcbiAgICAgICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmRlc3Ryb3lHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQubW9uc3Rlcl96aGFvaHVhbiwgcXVhbik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBwcmV2X3V1aWQ6IHN0cmluZyA9IFwiXCI7XHJcbiAgICAvKirljbPlsIbliKDpmaTmlYzkurrvvIzlj6/ku6XlnKjmraTmkq3mlL7pn7PmlYggKi9cclxuICAgIHdpbGxEZXN0cm95TW9uc3Rlcihtb25zdGVyVHM6IE1vbnN0ZXIpOiBib29sZWFuIHtcclxuICAgICAgICAvL+aYr+WQpuimgei/kOihjOWKqOS9nOWQjuWGjemUgOavgVxyXG4gICAgICAgIGxldCBpc0FjdGlvbkRpZSA9IHRydWU7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LllYX1Nob3VqaSk7XHJcbiAgICAgICAgLy/niIbph5HluIFcclxuICAgICAgICBsZXQgcG9zID0gbW9uc3RlclRzLm5vZGUuZ2V0UG9zaXRpb24oKTtcclxuICAgICAgICBpZiAoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9tb2RlID09IEdhbWVNb2RlLk1haW4pIHtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVEcm9wUHJvcChwb3MsIEdhbWVFZmZlY3RJZC5kcm9wX2NvaW4pO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZURyb3BQcm9wKHBvcywgR2FtZUVmZmVjdElkLmRyb3BfY29pbik7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlRHJvcFByb3AocG9zLCBHYW1lRWZmZWN0SWQuZHJvcF9nZW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaXNBY3Rpb25EaWU7XHJcbiAgICB9XHJcbiAgICAvKirlm57mlLbmlYzkurrliLDlr7nosaHmsaAgKi9cclxuICAgIGRlc3Ryb3lNb25zdGVyKG5vZGU6IGNjLk5vZGUsIHR5cGU6IG51bWJlciwgaXNDYW5XaW46IGJvb2xlYW4gPSB0cnVlKSB7XHJcbiAgICAgICAgbm9kZS5jb2xvciA9IGNjLkNvbG9yLldISVRFO1xyXG4gICAgICAgIGxldCBtb25zdGVyVHMgPSBub2RlLmdldENvbXBvbmVudChNb25zdGVyKTtcclxuICAgICAgICBtb25zdGVyVHMuc2V0RW5lbXlTdGF0ZShFbmVteV9TdGF0ZS5kaWUpO1xyXG4gICAgICAgIC8v6KaB5Yy65YiG5Y+s5ZSk5oCqXHJcbiAgICAgICAgaWYgKG1vbnN0ZXJUcy5pc19jYW5fY291bnQpIHtcclxuICAgICAgICAgICAgaWYgKG1vbnN0ZXJUcy51dWlkID09IHRoaXMucHJldl91dWlkKSB7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUuZXJyb3IoXCLlj6/og73ph43lpI3orqHmlbDkuoY6XCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucHJldl91dWlkID0gbW9uc3RlclRzLnV1aWQ7XHJcbiAgICAgICAgICAgIHRoaXMua2lsbGVkX21vbnN0ZXJfbnVtKys7XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkub25FbmVteURpZShtb25zdGVyVHMuc2NvcmUsIG1vbnN0ZXJUcy5pc19jYW5fY291bnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpZiAodGhpcy5raWxsZWRfbW9uc3Rlcl9udW0rdGhpcy5zaGlwX21vbnN0ZXJfbnVtID49IHRoaXMudG90YWxfbW9uc3Rlcl9udW0pIHtcclxuICAgICAgICAgICAgaWYgKGlzQ2FuV2luKSB7XHJcbiAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmdldFJlbWFpbk1vbnN0ZXIoKSA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93R2FtZVdpbigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIC8v5Zue5pS25YmN5qCH6K6w5Y+v5LulXHJcbiAgICAgICAgLy8gaWYobW9uc3RlclRzKXtcclxuICAgICAgICAvLyAgICAgbW9uc3RlclRzLnNldElzQ2FuQ291bnQodHJ1ZSk7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICBzdXBlci5kZXN0cm95Tm9kZSh0eXBlLCBub2RlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFJlbWFpbk1vbnN0ZXIoKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgbnVtID0gMDtcclxuICAgICAgICBsZXQgbGVuID0gdGhpcy5ub2RlLmNoaWxkcmVuQ291bnQ7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgbW9uc3RlciA9IHRoaXMubm9kZS5jaGlsZHJlbltpXTtcclxuICAgICAgICAgICAgbGV0IG1vbnN0ZXJUUyA9IG1vbnN0ZXIuZ2V0Q29tcG9uZW50KE1vbnN0ZXIpO1xyXG4gICAgICAgICAgICBpZiAobW9uc3RlclRTICYmIG1vbnN0ZXJUUy5nZXRJc0RpZSgpID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICBudW0rKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVtO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZURyb3BQcm9wKHBvczogY2MuVmVjMiwgaWQ6IEdhbWVFZmZlY3RJZCkge1xyXG4gICAgICAgIGxldCBwcm9wID0gR3JvdW5kTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKGlkLCBwb3MsIDIpO1xyXG4gICAgICAgIC8vdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3BCeVByb3BJZChQcm9wSWQuQ29pbik7XHJcbiAgICAgICAgcHJvcC5vcGFjaXR5ID0gMjU1O1xyXG4gICAgICAgIC8vcHJvcC5zY2FsZT0wLjU7XHJcbiAgICAgICAgbGV0IHh4ID0gTWF0aC5yYW5kb20oKSAqIDIwICsgMzA7XHJcbiAgICAgICAgeHggKj0gTWF0aC5yYW5kb20oKSA8IDAuNSA/IDEgOiAtMTtcclxuICAgICAgICBsZXQgeXkgPSBNYXRoLnJhbmRvbSgpICogNDAgLSAyMDtcclxuICAgICAgICBsZXQgaGVpZ2h0ID0gTWF0aC5yYW5kb20oKSAqIDIwICsgMzA7XHJcbiAgICAgICAgLy8gY2MudHdlZW4ocHJvcCkudGhlbihjYy5qdW1wQnkoMC41LHh4LHl5LGhlaWdodCwxKSkuZGVsYXkoMSkuY2FsbCgoKT0+e1xyXG4gICAgICAgIC8vICAgICBwcm9wLnBhcmVudD1VSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5ub2RlO1xyXG4gICAgICAgIC8vIH0pLnRoZW4oTXlUb29sLmdldEJlemllckFjdChwcm9wLmdldFBvc2l0aW9uKCksdGhpcy5jb2luX3BvcykpLmNhbGwoKCk9PntcclxuICAgICAgICAvLyAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZGVzdHJveUdhbWVFZmZlY3RCeUlkKGlkLHByb3ApO1xyXG4gICAgICAgIC8vICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdhbWUuc2hvd0NvaW4oKTtcclxuICAgICAgICAvLyB9KS5zdGFydCgpO1xyXG5cclxuICAgICAgICBjYy50d2Vlbihwcm9wKS50aGVuKGNjLmp1bXBCeSgwLjUsIHh4LCB5eSwgaGVpZ2h0LCAxKSlcclxuICAgICAgICAgICAgLy8gLmNhbGwoKCk9PntcclxuICAgICAgICAgICAgLy8gICAgIC8v55Sf5oiQ6Zi05b2xXHJcbiAgICAgICAgICAgIC8vICAgICBsZXQgc2hhZG93SWQ9R2FtZUVmZmVjdElkLmRyb3BfZ2VtO1xyXG4gICAgICAgICAgICAvLyAgICAgbGV0IGRpc3RYWD0wO1xyXG4gICAgICAgICAgICAvLyAgICAgbGV0IGRpc3RZWT0wO1xyXG4gICAgICAgICAgICAvLyAgICAgc3dpdGNoKGlkKXtcclxuICAgICAgICAgICAgLy8gICAgICAgICBjYXNlIEdhbWVFZmZlY3RJZC5kcm9wX2NvaW46eyAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIGRpc3RYWD1wcm9wLng7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIGRpc3RZWT1wcm9wLnktOS41O1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICBzaGFkb3dJZD1HYW1lRWZmZWN0SWQuZHJvcF9jb2luX3NoYWRvdztcclxuICAgICAgICAgICAgLy8gICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgY2FzZSBHYW1lRWZmZWN0SWQuZHJvcF9nZW06e1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICBzaGFkb3dJZD1HYW1lRWZmZWN0SWQuZHJvcF9nZW1fc2hhZG93O1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICBkaXN0WFg9cHJvcC54KzE7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIGRpc3RZWT1wcm9wLnktMTA7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAvLyAgICAgfSAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vICAgICBsZXQgc2hhZG93PUdyb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChzaGFkb3dJZCxjYy52MihkaXN0WFgsZGlzdFlZKSwxKTtcclxuICAgICAgICAgICAgLy8gICAgIHNoYWRvdy5vcGFjaXR5PTEwMDtcclxuICAgICAgICAgICAgLy8gICAgIGNjLnR3ZWVuKHNoYWRvdykuZGVsYXkoMTApLnRvKDAuNSx7b3BhY2l0eTowfSkuY2FsbCgoKT0+e1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmRlc3Ryb3lHYW1lRWZmZWN0QnlJZChzaGFkb3dJZCxzaGFkb3cpO1xyXG4gICAgICAgICAgICAvLyAgICAgfSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgLy8gfSlcclxuICAgICAgICAgICAgLmRlbGF5KDEwKS50bygwLjUsIHsgb3BhY2l0eTogMCB9KS5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmRlc3Ryb3lHYW1lRWZmZWN0QnlJZChpZCwgcHJvcCk7XHJcbiAgICAgICAgICAgIH0pLnN0YXJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVzdHJveUFsbERyb3AoKSB7XHJcbiAgICAgICAgbGV0IGRyb3BzID0gdGhpcy5kcm9wX3Jvb3QuY2hpbGRyZW47XHJcbiAgICAgICAgbGV0IGxlbiA9IGRyb3BzLmxlbmd0aDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBwcm9wID0gZHJvcHNbaV07XHJcbiAgICAgICAgICAgIGxldCBpZCA9IHBhcnNlSW50KHByb3AubmFtZSk7XHJcbiAgICAgICAgICAgIGlmIChpZCkge1xyXG4gICAgICAgICAgICAgICAgY2MudHdlZW4ocHJvcCkudG8oMC41LCB7IG9wYWNpdHk6IDAgfSkuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZGVzdHJveUdhbWVFZmZlY3RCeUlkKGlkLCBwcm9wKTtcclxuICAgICAgICAgICAgICAgIH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRlc3Ryb3lBbGxNb25zdGVyKCkge1xyXG4gICAgICAgIGxldCBhbGxNb25zdGVyID0gdGhpcy5ub2RlLmNoaWxkcmVuO1xyXG4gICAgICAgIGxldCBsZW4gPSBhbGxNb25zdGVyLmxlbmd0aDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBtb25zdGVyID0gYWxsTW9uc3RlcltpXTtcclxuICAgICAgICAgICAgaWYgKG1vbnN0ZXIpIHtcclxuICAgICAgICAgICAgICAgIGxldCBtb25zdGVyVFMgPSBtb25zdGVyLmdldENvbXBvbmVudChNb25zdGVyKTtcclxuICAgICAgICAgICAgICAgIGlmIChtb25zdGVyVFMpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlc3Ryb3lNb25zdGVyKG1vbnN0ZXIsIG1vbnN0ZXJUUy5tb25zdGVyX3R5cGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1HRVQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bmjIflrprkvY3nva50YXJnZXRQb3PnmoTmjIflrprojIPlm7RmYW53ZWnlhoXpnaDov5Hln47lopnmnIDov5HnmoRjaGVha051beS4quaVjOS6ulxyXG4gICAgICogQHBhcmFtIGNoZWFrTnVtIOajgOa1i+aVsOmHj1xyXG4gICAgICogQHBhcmFtIHRhcmdldFBvcyDmjIflrprnmoTkvY3nva7vvIzkuIDoiKzmmK/oh6rouqvkvY3nva5cclxuICAgICAqIEBwYXJhbSBmYW53ZWkg5oyH5a6a55qE5qOA5rWL6IyD5Zu077yM5LiA6Iis5piv5pS75Ye76Led56a7XHJcbiAgICAgKiBAcmV0dXJucyDmiYDmnInmu6HotrPmnaHku7bnmoTmlYzkurpcclxuICAgICAqL1xyXG4gICAgZ2V0TW9uc3RlcnNGb3JOZWFyZXN0KGNoZWFrTnVtOiBudW1iZXIsIHRhcmdldFBvczogY2MuVmVjMiwgZmFud2VpOiBudW1iZXIsIHBvc0luZGV4OiBudW1iZXIgPSBudWxsKTogY2MuTm9kZVtdIHtcclxuICAgICAgICBpZiAoY2hlYWtOdW0gPT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGxlbiA9IHRoaXMubm9kZS5jaGlsZHJlbkNvdW50O1xyXG4gICAgICAgIGlmIChsZW4gPD0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8xLuWFiOajgOa1i+WcqOaUu+WHu+iMg+WbtOWGheespuWQiOaUu+WHu+WNleS9jeeahOaVjOS6ulxyXG4gICAgICAgIGxldCBhdHRNb25zdGVyczogY2MuTm9kZVtdID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgbW9uc3RlciA9IHRoaXMubm9kZS5jaGlsZHJlbltpXTtcclxuICAgICAgICAgICAgbGV0IG1vbnN0ZXJUUyA9IG1vbnN0ZXIuZ2V0Q29tcG9uZW50KE1vbnN0ZXIpO1xyXG4gICAgICAgICAgICBpZiAobW9uc3RlclRTICYmIG1vbnN0ZXJUUy5nZXRJc0NhbkNoZWNrKCkpIHtcclxuICAgICAgICAgICAgICAgIGxldCBkaXN0YW5jZSA9IHRhcmdldFBvcy5zdWIobW9uc3Rlci5nZXRQb3NpdGlvbigpKS5tYWcoKTtcclxuICAgICAgICAgICAgICAgIGlmIChkaXN0YW5jZSA8PSBmYW53ZWkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocG9zSW5kZXggPT0gbnVsbCB8fCBwb3NJbmRleCA9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRNb25zdGVycy5wdXNoKG1vbnN0ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyhtb25zdGVyLnggLSBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYXJQb3NYKSA8PSA3NSAmJiBtb25zdGVyLnkgPiBXYWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1haW5XYWxsKCkuZ2V0V2FsbFJlY3QoKS55TWF4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRNb25zdGVycy5wdXNoKG1vbnN0ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYXR0TW9uc3RlcnMubGVuZ3RoIDw9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5bCP5LqOMO+8jOS7o+ihqOimgeaJgOaciVxyXG4gICAgICAgIGlmIChjaGVha051bSA8IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIGF0dE1vbnN0ZXJzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY2hlYWtOdW0gPj0gYXR0TW9uc3RlcnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhdHRNb25zdGVycztcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8yLuWvueWPr+S7peaUu+WHu+eahOaVjOS6uui/m+ihjOS8mOWFiOe6p+WIpOaWrSzpgInlh7pjaGVha051beS4quebruagh+S9nOS4uuaJk+WHu+WNleS9jVxyXG4gICAgICAgIC8vMi4x5LyY5YWI5pS75Ye76Lef5Z+O5aKZ5pyA6L+R55qE5Y2V5L2NXHJcbiAgICAgICAgYXR0TW9uc3RlcnMuc29ydCgoYTogY2MuTm9kZSwgYjogY2MuTm9kZSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gYS5nZXRQb3NpdGlvbigpLnN1Yih0YXJnZXRQb3MpLm1hZygpIC0gYi5nZXRQb3NpdGlvbigpLnN1Yih0YXJnZXRQb3MpLm1hZygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGF0dE1vbnN0ZXJzLnNwbGljZShjaGVha051bSk7XHJcbiAgICAgICAgcmV0dXJuIGF0dE1vbnN0ZXJzO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bmjIflrprkvY3nva50YXJnZXRQb3PnmoTmjIflrprojIPlm7RmYW53ZWnlhoXpnaDov5Hln47lopnmnIDov5HnmoRjaGVha051beS4quaVjOS6ulxyXG4gICAgICogQHBhcmFtIGNoZWFrTnVtIOajgOa1i+aVsOmHj1xyXG4gICAgICogQHBhcmFtIHRhcmdldFBvcyDmjIflrprnmoTkvY3nva7vvIzkuIDoiKzmmK/oh6rouqvkvY3nva5cclxuICAgICAqIEBwYXJhbSBmYW53ZWkg5oyH5a6a55qE5qOA5rWL6IyD5Zu077yM5LiA6Iis5piv5pS75Ye76Led56a7XHJcbiAgICAgKiBAcmV0dXJucyDmiYDmnInmu6HotrPmnaHku7bnmoTmlYzkurpcclxuICAgICAqL1xyXG4gICAgZ2V0TW9uc3RlcnNGb3JOZWFyZXN0QnlTa2lsbChjaGVha051bTogbnVtYmVyLCB0YXJnZXRQb3NZOiBudW1iZXIsIGZhbndlaTogbnVtYmVyKTogY2MuTm9kZVtdIHtcclxuICAgICAgICBpZiAoY2hlYWtOdW0gPT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGxlbiA9IHRoaXMubm9kZS5jaGlsZHJlbkNvdW50O1xyXG4gICAgICAgIGlmIChsZW4gPD0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8xLuWFiOajgOa1i+WcqOaUu+WHu+iMg+WbtOWGheespuWQiOaUu+WHu+WNleS9jeeahOaVjOS6ulxyXG4gICAgICAgIGxldCBhdHRNb25zdGVyczogY2MuTm9kZVtdID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgbW9uc3RlciA9IHRoaXMubm9kZS5jaGlsZHJlbltpXTtcclxuICAgICAgICAgICAgbGV0IG1vbnN0ZXJUUyA9IG1vbnN0ZXIuZ2V0Q29tcG9uZW50KE1vbnN0ZXIpO1xyXG4gICAgICAgICAgICBpZiAobW9uc3RlclRTICYmIG1vbnN0ZXJUUy5nZXRJc0NhbkNoZWNrKCkpIHtcclxuICAgICAgICAgICAgICAgIGxldCBkaXN0YW5jZSA9IG1vbnN0ZXJUUy5nZXRDZW50ZXJQb3MoKS55IC0gdGFyZ2V0UG9zWTtcclxuICAgICAgICAgICAgICAgIGlmIChkaXN0YW5jZSA8PSBmYW53ZWkpIHtcclxuICAgICAgICAgICAgICAgICAgICBhdHRNb25zdGVycy5wdXNoKG1vbnN0ZXIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChhdHRNb25zdGVycy5sZW5ndGggPD0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/lsI/kuo4w77yM5Luj6KGo6KaB5omA5pyJXHJcbiAgICAgICAgaWYgKGNoZWFrTnVtIDwgMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gYXR0TW9uc3RlcnM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjaGVha051bSA+PSBhdHRNb25zdGVycy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGF0dE1vbnN0ZXJzO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLzIu5a+55Y+v5Lul5pS75Ye755qE5pWM5Lq66L+b6KGM5LyY5YWI57qn5Yik5patLOmAieWHumNoZWFrTnVt5Liq55uu5qCH5L2c5Li65omT5Ye75Y2V5L2NXHJcbiAgICAgICAgLy8yLjHkvJjlhYjmlLvlh7vot5/ln47lopnmnIDov5HnmoTljZXkvY1cclxuICAgICAgICBhdHRNb25zdGVycy5zb3J0KChhOiBjYy5Ob2RlLCBiOiBjYy5Ob2RlKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiAoYS55IC0gdGFyZ2V0UG9zWSkgLSAoYi55IC0gdGFyZ2V0UG9zWSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYXR0TW9uc3RlcnMuc3BsaWNlKGNoZWFrTnVtKTtcclxuICAgICAgICByZXR1cm4gYXR0TW9uc3RlcnM7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIC8v6I635Y+W5oyH5a6a5L2N572udGFyZ2V0UG9z55qE5oyH5a6a6IyD5Zu0ZmFud2Vp5YaFY2hlYWtOdW3kuKrmlYzkurpcclxuICAgICAqIEBwYXJhbSBjaGVha051bSDmo4DmtYvmlbDph4/vvIzlsI/kuo4w6KGo56S65omA5pyJ77yM5aaCLTFcclxuICAgICAqIEBwYXJhbSB0YXJnZXRQb3Mg55uu5qCH5L2N572uXHJcbiAgICAgKiBAcGFyYW0gZmFud2VpIOiMg+WbtFxyXG4gICAgICogQHJldHVybnMg5omA5pyJ56ym5ZCI5p2h5Lu255qE5pWM5Lq6XHJcbiAgICAgKi9cclxuICAgIGdldE1vbnN0ZXJzRm9yQ2VudGVyUG9zKGNoZWFrTnVtOiBudW1iZXIsIHRhcmdldFBvczogY2MuVmVjMiwgZmFud2VpOiBudW1iZXIpOiBjYy5Ob2RlW10ge1xyXG4gICAgICAgIGlmIChjaGVha051bSA9PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbGVuID0gdGhpcy5ub2RlLmNoaWxkcmVuQ291bnQ7XHJcbiAgICAgICAgaWYgKGxlbiA8PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLzEu5YWI5qOA5rWL5Zyo5pS75Ye76IyD5Zu05YaF56ym5ZCI5pS75Ye75Y2V5L2N55qE5pWM5Lq6XHJcbiAgICAgICAgbGV0IGF0dE1vbnN0ZXJzOiBjYy5Ob2RlW10gPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBtb25zdGVyID0gdGhpcy5ub2RlLmNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICBsZXQgbW9uc3RlclRTID0gbW9uc3Rlci5nZXRDb21wb25lbnQoTW9uc3Rlcik7XHJcbiAgICAgICAgICAgIGlmIChtb25zdGVyVFMgJiYgbW9uc3RlclRTLmdldElzQ2FuQ2hlY2soKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRpc3RhbmNlID0gdGFyZ2V0UG9zLnN1Yihtb25zdGVyVFMuZ2V0Q2VudGVyUG9zKCkpLm1hZygpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRpc3RhbmNlIDw9IGZhbndlaSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGF0dE1vbnN0ZXJzLnB1c2gobW9uc3Rlcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGF0dE1vbnN0ZXJzLmxlbmd0aCA8PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+Wwj+S6jjDvvIzku6PooajopoHmiYDmnIlcclxuICAgICAgICBpZiAoY2hlYWtOdW0gPCAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhdHRNb25zdGVycztcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/lpoLmnpzmo4DmtYvliLDnmoTmlbDph4/msqHmnInopoHmo4DmtYvnmoTpgqPkuYjlpJrvvIznm7TmjqXov5Tlm57lhajpg6guXHJcbiAgICAgICAgaWYgKGNoZWFrTnVtID49IGF0dE1vbnN0ZXJzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm4gYXR0TW9uc3RlcnM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vMi4x5LyY5YWI5pS75Ye76Lef55uu5qCH5L2N572u5pyA6L+R55qE5Y2V5L2N77yM5oyJ54Wn5LiOcG9z55qE6Led56a75aSn5bCP6L+b6KGM5o6S5YiX77yM5LuO5bCP5Yiw5aSnXHJcbiAgICAgICAgYXR0TW9uc3RlcnMuc29ydCgoYTogY2MuTm9kZSwgYjogY2MuTm9kZSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gYS5nZXRQb3NpdGlvbigpLnN1Yih0YXJnZXRQb3MpLm1hZygpIC0gYi5nZXRQb3NpdGlvbigpLnN1Yih0YXJnZXRQb3MpLm1hZygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGF0dE1vbnN0ZXJzLnNwbGljZShjaGVha051bSk7XHJcbiAgICAgICAgcmV0dXJuIGF0dE1vbnN0ZXJzO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiAvL+iOt+WPluaMh+WumuS9jee9rnRhcmdldFBvc+eahOaMh+WumuiMg+WbtGZhbndlaeWGhWNoZWFrTnVt5Liq5pWM5Lq6XHJcbiAgICAgKiBAcGFyYW0gY2hlYWtOdW0g5qOA5rWL5pWw6YeP77yM5bCP5LqOMOihqOekuuaJgOacie+8jOWmgi0xXHJcbiAgICAgKiBAcGFyYW0gdGFyZ2V0UG9zIOebruagh+S9jee9rlxyXG4gICAgICogQHBhcmFtIGZhbndlaSDojIPlm7RcclxuICAgICAqIEByZXR1cm5zIOaJgOacieespuWQiOadoeS7tueahOaVjOS6ulxyXG4gICAgICovXHJcbiAgICBnZXRNb25zdGVyc0ZvckJpbmdOdldhbGxSZWN0KHJlY3Q6IGNjLlJlY3QpOiBCaW5nTnZXYWxsRGF0YSB7XHJcbiAgICAgICAgbGV0IGxlbiA9IHRoaXMubm9kZS5jaGlsZHJlbkNvdW50O1xyXG4gICAgICAgIC8vMS7lhYjmo4DmtYvlnKjmlLvlh7vojIPlm7TlhoXnrKblkIjmlLvlh7vljZXkvY3nmoTmlYzkurpcclxuICAgICAgICBsZXQgYm53ZCA9IG5ldyBCaW5nTnZXYWxsRGF0YSgpO1xyXG4gICAgICAgIGxldCBhdHRNb25zdGVyczogY2MuTm9kZVtdID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgbW9uc3RlciA9IHRoaXMubm9kZS5jaGlsZHJlbltpXTtcclxuICAgICAgICAgICAgbGV0IG1vbnN0ZXJUUyA9IG1vbnN0ZXIuZ2V0Q29tcG9uZW50KE1vbnN0ZXIpO1xyXG4gICAgICAgICAgICBpZiAobW9uc3RlclRTICYmIG1vbnN0ZXJUUy5nZXRJc0NhbkNoZWNrKCkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChyZWN0LmNvbnRhaW5zKG1vbnN0ZXIuZ2V0UG9zaXRpb24oKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBhdHRNb25zdGVycy5wdXNoKG1vbnN0ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtb25zdGVyVFMuZ2V0U3RyZW5ndGhUeXBlKCkgPT0gU3RyZW5ndGhUeXBlLkJvc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYm53ZC5ib3NzX3RzID0gbW9uc3RlclRTO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBibndkLmJhY2tfbW9uc3RlcnMgPSBhdHRNb25zdGVycztcclxuICAgICAgICByZXR1cm4gYm53ZDtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog6L+U5Zue55Sf5ZG95YC85pyA6auY55qE5pWM5Lq65bqP5YiXXHJcbiAgICAgKiBAcGFyYW0gY2hlYWtOdW0g5qOA5rWL5pWw6YeP77yM5bCP5LqOMOihqOekuuaJgOacie+8jOWmgi0xXHJcbiAgICAgKiBAcGFyYW0gdGFyZ2V0UG9zIFxyXG4gICAgICogQHBhcmFtIGZhbndlaSBcclxuICAgICAqIEByZXR1cm5zIFxyXG4gICAgICovXHJcbiAgICBnZXRNb25zdGVyc0Zvck1heEhwKGNoZWFrTnVtOiBudW1iZXIsIHRhcmdldFBvczogY2MuVmVjMiwgZmFud2VpOiBudW1iZXIpOiBjYy5Ob2RlW10ge1xyXG4gICAgICAgIGlmIChjaGVha051bSA9PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbGVuID0gdGhpcy5ub2RlLmNoaWxkcmVuQ291bnQ7XHJcbiAgICAgICAgaWYgKGxlbiA8PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLzEu5YWI5qOA5rWL5Zyo5pS75Ye76IyD5Zu05YaF56ym5ZCI5pS75Ye75Y2V5L2N55qE5pWM5Lq6XHJcbiAgICAgICAgbGV0IGF0dE1vbnN0ZXJzOiBjYy5Ob2RlW10gPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBtb25zdGVyID0gdGhpcy5ub2RlLmNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICBsZXQgbW9uc3RlclRTID0gbW9uc3Rlci5nZXRDb21wb25lbnQoTW9uc3Rlcik7XHJcbiAgICAgICAgICAgIGlmIChtb25zdGVyVFMgJiYgbW9uc3RlclRTLmdldElzQ2FuQ2hlY2soKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRpc3RhbmNlID0gdGFyZ2V0UG9zLnN1Yihtb25zdGVyLmdldFBvc2l0aW9uKCkpLm1hZygpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRpc3RhbmNlIDw9IGZhbndlaSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGF0dE1vbnN0ZXJzLnB1c2gobW9uc3Rlcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGF0dE1vbnN0ZXJzLmxlbmd0aCA8PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+Wwj+S6jjDvvIzku6PooajopoHmiYDmnIlcclxuICAgICAgICBpZiAoY2hlYWtOdW0gPCAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhdHRNb25zdGVycztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNoZWFrTnVtID49IGF0dE1vbnN0ZXJzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm4gYXR0TW9uc3RlcnM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vMi7lr7nlj6/ku6XmlLvlh7vnmoTmlYzkurrov5vooYzkvJjlhYjnuqfliKTmlq0s6YCJ5Ye6Y2hlYWtOdW3kuKrnm67moIfkvZzkuLrmiZPlh7vljZXkvY1cclxuICAgICAgICAvLzIuMeS8mOWFiOaUu+WHu+i3n+WfjuWimeacgOi/keeahOWNleS9jVxyXG4gICAgICAgIGF0dE1vbnN0ZXJzLnNvcnQoKGE6IGNjLk5vZGUsIGI6IGNjLk5vZGUpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGIuZ2V0Q29tcG9uZW50KE1vbnN0ZXIpLmdldEN1ckhwKCkgLSBhLmdldENvbXBvbmVudChNb25zdGVyKS5nZXRDdXJIcCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGF0dE1vbnN0ZXJzLnNwbGljZShjaGVha051bSk7XHJcbiAgICAgICAgcmV0dXJuIGF0dE1vbnN0ZXJzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6L+U5Zue55Sf5ZG95YC85pyA6auY55qE5pWM5Lq65bqP5YiXXHJcbiAgICAgKiBAcGFyYW0gY2hlYWtOdW0g5qOA5rWL5pWw6YeP77yM5bCP5LqOMOihqOekuuaJgOacie+8jOWmgi0xXHJcbiAgICAgKiBAcGFyYW0gdGFyZ2V0UG9zIFxyXG4gICAgICogQHBhcmFtIGZhbndlaSBcclxuICAgICAqIEByZXR1cm5zIFxyXG4gICAgICovXHJcbiAgICBnZXRNb25zdGVyc0Zvck1heEF0dGFrKGNoZWFrTnVtOiBudW1iZXIsIHRhcmdldFBvczogY2MuVmVjMiwgZmFud2VpOiBudW1iZXIpOiBjYy5Ob2RlW10ge1xyXG4gICAgICAgIGlmIChjaGVha051bSA9PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbGVuID0gdGhpcy5ub2RlLmNoaWxkcmVuQ291bnQ7XHJcbiAgICAgICAgaWYgKGxlbiA8PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLzEu5YWI5qOA5rWL5Zyo5pS75Ye76IyD5Zu05YaF56ym5ZCI5pS75Ye75Y2V5L2N55qE5pWM5Lq6XHJcbiAgICAgICAgbGV0IGF0dE1vbnN0ZXJzOiBjYy5Ob2RlW10gPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBtb25zdGVyID0gdGhpcy5ub2RlLmNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICBsZXQgbW9uc3RlclRTID0gbW9uc3Rlci5nZXRDb21wb25lbnQoTW9uc3Rlcik7XHJcbiAgICAgICAgICAgIGlmIChtb25zdGVyVFMgJiYgbW9uc3RlclRTLmdldElzQ2FuQ2hlY2soKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRpc3RhbmNlID0gdGFyZ2V0UG9zLnN1Yihtb25zdGVyLmdldFBvc2l0aW9uKCkpLm1hZygpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRpc3RhbmNlIDw9IGZhbndlaSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGF0dE1vbnN0ZXJzLnB1c2gobW9uc3Rlcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGF0dE1vbnN0ZXJzLmxlbmd0aCA8PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+Wwj+S6jjDvvIzku6PooajopoHmiYDmnIlcclxuICAgICAgICBpZiAoY2hlYWtOdW0gPCAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhdHRNb25zdGVycztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNoZWFrTnVtID49IGF0dE1vbnN0ZXJzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm4gYXR0TW9uc3RlcnM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vMi7lr7nlj6/ku6XmlLvlh7vnmoTmlYzkurrov5vooYzkvJjlhYjnuqfliKTmlq0s6YCJ5Ye6Y2hlYWtOdW3kuKrnm67moIfkvZzkuLrmiZPlh7vljZXkvY1cclxuICAgICAgICAvLzIuMeS8mOWFiOaUu+WHu+i3n+WfjuWimeacgOi/keeahOWNleS9jVxyXG4gICAgICAgIGF0dE1vbnN0ZXJzLnNvcnQoKGE6IGNjLk5vZGUsIGI6IGNjLk5vZGUpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGIuZ2V0Q29tcG9uZW50KE1vbnN0ZXIpLmdldEN1ckF0dCgpIC0gYS5nZXRDb21wb25lbnQoTW9uc3RlcikuZ2V0Q3VyQXR0KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYXR0TW9uc3RlcnMuc3BsaWNlKGNoZWFrTnVtKTtcclxuICAgICAgICByZXR1cm4gYXR0TW9uc3RlcnM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAvL+iOt+WPluaMh+WumuS9jee9rnRhcmdldFBvc+eahOaMh+WumuiMg+WbtGZhbndlaeWGhWNoZWFrTnVt5Liq5pWM5Lq6XHJcbiAgICAgKiBAcGFyYW0gY2hlYWtOdW0g5qOA5rWL5pWw6YeP77yM5bCP5LqOMOihqOekuuaJgOacie+8jOWmgi0xXHJcbiAgICAgKiBAcGFyYW0gdGFyZ2V0UG9zIOebruagh+S9jee9rlxyXG4gICAgICogQHBhcmFtIHJhZGl1cyDojIPlm7TljYrlvoRcclxuICAgICAqIEBwYXJhbSBtaW5SYWRpYW4g5pyA5bCP55qE5byn5bqm5YC8XHJcbiAgICAgKiBAcGFyYW0gbWF4UmFkaWFuIOacgOWkp+eahOW8p+W6puWAvFxyXG4gICAgICogQHJldHVybnMg5omA5pyJ56ym5ZCI5p2h5Lu255qE5pWM5Lq6XHJcbiAgICAgKi9cclxuICAgIGdldE1vbnN0ZXJzRm9yUmFkaWFuKGNoZWFrTnVtOiBudW1iZXIsIHRhcmdldFBvczogY2MuVmVjMiwgcmFkaXVzOiBudW1iZXIsIG1pblJhZGlhbjogbnVtYmVyLCBtYXhSYWRpYW46IG51bWJlcik6IGNjLk5vZGVbXSB7XHJcbiAgICAgICAgaWYgKGNoZWFrTnVtID09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBsZW4gPSB0aGlzLm5vZGUuY2hpbGRyZW5Db3VudDtcclxuICAgICAgICBpZiAobGVuIDw9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBwMiA9IE1hdGguUEkgKiAyO1xyXG4gICAgICAgIG1pblJhZGlhbiA9IChwMiArIG1pblJhZGlhbikgJSBwMlxyXG4gICAgICAgIG1heFJhZGlhbiA9IChwMiArIG1heFJhZGlhbikgJSBwMlxyXG4gICAgICAgIC8vMS7lhYjmo4DmtYvlnKjmlLvlh7vojIPlm7TlhoXnrKblkIjmlLvlh7vljZXkvY3nmoTmlYzkurpcclxuICAgICAgICBsZXQgYXR0TW9uc3RlcnM6IGNjLk5vZGVbXSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG1vbnN0ZXIgPSB0aGlzLm5vZGUuY2hpbGRyZW5baV07XHJcbiAgICAgICAgICAgIGxldCBtb25zdGVyVFMgPSBtb25zdGVyLmdldENvbXBvbmVudChNb25zdGVyKTtcclxuICAgICAgICAgICAgaWYgKG1vbnN0ZXJUUyAmJiBtb25zdGVyVFMuZ2V0SXNDYW5DaGVjaygpKSB7XHJcbiAgICAgICAgICAgICAgICAvL+WFiOWIpOaWreaYr+WQpuWcqOW8p+W6puiMg+WbtOWGhVxyXG4gICAgICAgICAgICAgICAgbGV0IG9mZnNldFBvcyA9IG1vbnN0ZXJUUy5nZXRDZW50ZXJQb3MoKS5zdWIodGFyZ2V0UG9zKTtcclxuICAgICAgICAgICAgICAgIGxldCByYWRpYW4gPSBNYXRoLmF0YW4yKG9mZnNldFBvcy55LCBvZmZzZXRQb3MueCk7XHJcbiAgICAgICAgICAgICAgICByYWRpYW4gPSAocDIgKyByYWRpYW4pICUgcDJcclxuICAgICAgICAgICAgICAgIC8vIGxldCBhbmdsZT1NeVRvb2wucmFkaWFuVG9BbmdsZShyYWRpYW4pO1xyXG4gICAgICAgICAgICAgICAgLy8gY2MubG9nKGFuZ2xlKTtcclxuICAgICAgICAgICAgICAgIGlmIChyYWRpYW4gPj0gbWluUmFkaWFuICYmIHJhZGlhbiA8PSBtYXhSYWRpYW4pIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZGlzdGFuY2UgPSBvZmZzZXRQb3MubWFnKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRpc3RhbmNlIDw9IHJhZGl1cykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRNb25zdGVycy5wdXNoKG1vbnN0ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYXR0TW9uc3RlcnMubGVuZ3RoIDw9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5bCP5LqOMO+8jOS7o+ihqOimgeaJgOaciVxyXG4gICAgICAgIGlmIChjaGVha051bSA8IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIGF0dE1vbnN0ZXJzO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyAvL+WmguaenOajgOa1i+WIsOeahOaVsOmHj+ayoeacieimgeajgOa1i+eahOmCo+S5iOWkmu+8jOebtOaOpei/lOWbnuWFqOmDqC5cclxuICAgICAgICAvLyBpZihjaGVha051bT49YXR0TW9uc3RlcnMubGVuZ3RoKVxyXG4gICAgICAgIC8vIHtcclxuICAgICAgICAvLyAgICAgcmV0dXJuIGF0dE1vbnN0ZXJzO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyAvLzIuMeS8mOWFiOaUu+WHu+i3n+ebruagh+S9jee9ruacgOi/keeahOWNleS9je+8jOaMieeFp+S4jnBvc+eahOi3neemu+Wkp+Wwj+i/m+ihjOaOkuWIl++8jOS7juWwj+WIsOWkp1xyXG4gICAgICAgIC8vIGF0dE1vbnN0ZXJzLnNvcnQoKGE6Y2MuTm9kZSxiOmNjLk5vZGUpPT57XHJcbiAgICAgICAgLy8gICAgIHJldHVybiBhLmdldFBvc2l0aW9uKCkuc3ViKHRhcmdldFBvcykubWFnKCktYi5nZXRQb3NpdGlvbigpLnN1Yih0YXJnZXRQb3MpLm1hZygpO1xyXG4gICAgICAgIC8vIH0pO1xyXG4gICAgICAgIC8vIGF0dE1vbnN0ZXJzLnNwbGljZShjaGVha051bSk7XHJcbiAgICAgICAgcmV0dXJuIGF0dE1vbnN0ZXJzO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6I635Y+W5oyH5a6a5L2N572udGFyZ2V0UG9z55qE5oyH5a6a6IyD5Zu0ZmFud2Vp5YaFY2hlYWtOdW3kuKrmlYzkuroo5pWM5Lq65LiT55So77yM5qOA5rWL6Zif5Y+LKVxyXG4gICAgZ2V0TW9uc3RlcnNGb3JNb25zdGVyUG9zKGNoZWFrTnVtOiBudW1iZXIsIHRhcmdldFBvczogY2MuVmVjMiwgZmFud2VpOiBudW1iZXIpOiBjYy5Ob2RlW10ge1xyXG4gICAgICAgIGlmIChjaGVha051bSA9PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbGVuID0gdGhpcy5ub2RlLmNoaWxkcmVuQ291bnQ7XHJcbiAgICAgICAgaWYgKGxlbiA8PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLzEu5YWI5qOA5rWL5Zyo5pS75Ye76IyD5Zu05YaF56ym5ZCI5pS75Ye75Y2V5L2N55qE5pWM5Lq6XHJcbiAgICAgICAgbGV0IGF0dE1vbnN0ZXJzOiBjYy5Ob2RlW10gPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBtb25zdGVyID0gdGhpcy5ub2RlLmNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICBsZXQgbW9uc3RlclRTID0gbW9uc3Rlci5nZXRDb21wb25lbnQoTW9uc3Rlcik7XHJcbiAgICAgICAgICAgIGlmIChtb25zdGVyVFMgJiYgIW1vbnN0ZXJUUy5nZXRJc0RpZSgpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGlzdGFuY2UgPSB0YXJnZXRQb3Muc3ViKG1vbnN0ZXIuZ2V0UG9zaXRpb24oKSkubWFnKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGlzdGFuY2UgPD0gZmFud2VpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXR0TW9uc3RlcnMucHVzaChtb25zdGVyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYXR0TW9uc3RlcnMubGVuZ3RoIDw9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5bCP5LqOMO+8jOS7o+ihqOimgeaJgOaciVxyXG4gICAgICAgIGlmIChjaGVha051bSA8IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIGF0dE1vbnN0ZXJzO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+WmguaenOajgOa1i+WIsOeahOaVsOmHj+ayoeacieimgeajgOa1i+eahOmCo+S5iOWkmu+8jOebtOaOpei/lOWbnuWFqOmDqC5cclxuICAgICAgICBpZiAoY2hlYWtOdW0gPj0gYXR0TW9uc3RlcnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhdHRNb25zdGVycztcclxuICAgICAgICB9XHJcbiAgICAgICAgYXR0TW9uc3RlcnMuc3BsaWNlKGNoZWFrTnVtKTtcclxuICAgICAgICByZXR1cm4gYXR0TW9uc3RlcnM7XHJcbiAgICB9XHJcbiAgICAvKirmmK/lkKbmnInmlYzkurrlnKjln47lopljaGVja0Rpc3RhbmNl6Led56a75YaFICovXHJcbiAgICBjaGVja1dhbGxNb25zdGVyKGNoZWNrRGlzdGFuY2U6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCBsZW4gPSB0aGlzLm5vZGUuY2hpbGRyZW5Db3VudDtcclxuICAgICAgICBsZXQgd2FsbFkgPSBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmVuZW15X2F0dF95O1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG1vbnN0ZXIgPSB0aGlzLm5vZGUuY2hpbGRyZW5baV07XHJcbiAgICAgICAgICAgIGxldCBtb25zdGVyVFMgPSBtb25zdGVyLmdldENvbXBvbmVudChNb25zdGVyKTtcclxuICAgICAgICAgICAgaWYgKG1vbnN0ZXJUUyAmJiAhbW9uc3RlclRTLmdldElzRGllKCkpIHtcclxuICAgICAgICAgICAgICAgIGxldCBkaXN0YW5jZSA9IE1hdGguYWJzKHdhbGxZIC0gbW9uc3Rlci55KVxyXG4gICAgICAgICAgICAgICAgaWYgKGRpc3RhbmNlIDw9IGNoZWNrRGlzdGFuY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICBvbkFsbEJhY2soKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBsYXRlVXBkYXRlKGR0OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnByZXZfdXVpZCA9IFwiXCI7XHJcbiAgICB9XHJcbn1cclxuIl19