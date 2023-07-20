
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTW9uc3RlclxcTW9uc3Rlck1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsaUVBQThFO0FBQzlFLDhDQUF5QztBQUN6QyxtREFBOEM7QUFDOUMsMERBQXFEO0FBQ3JELDREQUFrRTtBQUNsRSxxQ0FBZ0M7QUFDaEMsNkNBQTZDO0FBQzdDLHVEQUFrRDtBQUNsRCxzREFBeUQ7QUFFekQsb0RBQW1EO0FBQ25ELG1EQUE4QztBQUl4QyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUE0QyxrQ0FBVztJQUF2RDtRQUFBLHFFQXVxQkM7UUFycUJHLGdCQUFVLEdBQVksS0FBSyxDQUFDO1FBQ3BCLFlBQU0sR0FBVyxDQUFDLENBQUM7UUFDM0IsZ0JBQWdCO1FBQ2hCLHVCQUFpQixHQUFXLENBQUMsQ0FBQztRQUM5QixZQUFZO1FBQ1osd0JBQWtCLEdBQVcsQ0FBQyxDQUFDO1FBQy9CLFNBQVM7UUFDRCx1QkFBaUIsR0FBVyxDQUFDLENBQUM7UUFDdEMsWUFBWTtRQUNaLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFDMUIsY0FBUSxHQUFZLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQXdJNUIsZUFBUyxHQUFXLEVBQUUsQ0FBQzs7SUFtaEIzQixDQUFDO3VCQXZxQm9CLGNBQWM7SUFpQmpCLDBCQUFXLEdBQXpCO1FBQ0ksT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFFRCwrQkFBTSxHQUFOO1FBQ0ksZ0JBQWMsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQzdDLElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsdUNB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Q0FBQyxhQUFhLENBQUM7UUFDbEMsSUFBSSxLQUFLLEdBQUcscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUM7UUFDbEQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMxQixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQyxJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLGlCQUFPLENBQUMsQ0FBQztZQUM5QyxJQUFJLFNBQVMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtnQkFDcEMsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFBO2dCQUMxQyxJQUFJLFFBQVEsSUFBSSxhQUFhLEVBQUU7b0JBQzNCLE9BQU8sSUFBSSxDQUFDO2lCQUNmO2FBQ0o7U0FDSjtRQUNELE9BQU8sS0FBSyxDQUFBO0lBQ2hCLENBQUM7SUFFRCxrQ0FBUyxHQUFUO1FBQ0ksT0FBTztJQUNYLENBQUM7SUFFUyxtQ0FBVSxHQUFwQixVQUFxQixFQUFVO1FBQzNCLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBQ3hCLENBQUM7O0lBeHBCYyx3QkFBUyxHQUFtQixJQUFJLENBQUM7SUFkL0IsY0FBYztRQURsQyxPQUFPO09BQ2EsY0FBYyxDQXVxQmxDO0lBQUQscUJBQUM7Q0F2cUJELEFBdXFCQyxDQXZxQjJDLHFCQUFXLEdBdXFCdEQ7a0JBdnFCb0IsY0FBYyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdhbWVNb2RlLCBJc0RlYnVnIH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBHYW1lRWZmZWN0SWQsIEdhbWVFZmZlY3RzTWFuYWdlciB9IGZyb20gXCIuLi9HYW1lL0dhbWVFZmZlY3RzTWFuYWdlclwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCBNYXBOb2RlUG9vbCBmcm9tIFwiLi4vR2FtZS9NYXBOb2RlUG9vbFwiO1xyXG5pbXBvcnQgeyBTb3VuZEluZGV4IH0gZnJvbSBcIi4uL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IE1vbnN0ZXJDb25maWd1cmVNYW5hZ2VyIH0gZnJvbSBcIi4vRGF0YS9Nb25zdGVyQ29uZmlndXJlXCI7XHJcbmltcG9ydCBNb25zdGVyIGZyb20gXCIuL01vbnN0ZXJcIjtcclxuaW1wb3J0IHsgU3RyZW5ndGhUeXBlIH0gZnJvbSBcIi4vTW9uc3RlckRhdGFcIjtcclxuaW1wb3J0IEdyb3VuZE1hbmFnZXIgZnJvbSBcIi4uL0dhbWUvR3JvdW5kTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBCaW5nTnZXYWxsRGF0YSB9IGZyb20gXCIuLi9IZXJvL0dhbWUvSGVyb0NvbmZpZ1wiO1xyXG5pbXBvcnQgeyBKc29uTW9uc3Rlckdyb3d0aEF0dHJpYnV0ZXMgfSBmcm9tIFwiLi9EYXRhL01vbnN0ZXJHcm93dGhBdHRyaWJ1dGVzXCI7XHJcbmltcG9ydCB7IEVuZW15X1N0YXRlIH0gZnJvbSBcIi4uL0VuZW15L0VuZW15Q29uZmlnXCI7XHJcbmltcG9ydCBXYWxsTWFuYWdlciBmcm9tIFwiLi4vV2FsbC9XYWxsTWFuYWdlclwiO1xyXG5cclxuXHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9uc3Rlck1hbmFnZXIgZXh0ZW5kcyBNYXBOb2RlUG9vbCB7XHJcblxyXG4gICAgaXNfbG9hZF9vazogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBva19udW06IG51bWJlciA9IDA7XHJcbiAgICAvKirlvZPliY3lhbPmgLvlhbHmnInlpJrlsJHmlYzkurogKi9cclxuICAgIHRvdGFsX21vbnN0ZXJfbnVtOiBudW1iZXIgPSAwO1xyXG4gICAgLyoq5Ye75p2A5oCq54mp5pWw6YePICovXHJcbiAgICBraWxsZWRfbW9uc3Rlcl9udW06IG51bWJlciA9IDA7XHJcbiAgICAvL+S4iuiIueeahOaAqueJqeaVsOmHj1xyXG4gICAgcHJpdmF0ZSBfc2hpcF9tb25zdGVyX251bTogbnVtYmVyID0gMDtcclxuICAgIC8qKuWJqeS9meaAqueJqeaVsOmHjyAqL1xyXG4gICAgZHJvcF9yb290OiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIGNvaW5fcG9zOiBjYy5WZWMyID0gY2MudjIoKTtcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IE1vbnN0ZXJNYW5hZ2VyID0gbnVsbDtcclxuXHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBNb25zdGVyTWFuYWdlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICBNb25zdGVyTWFuYWdlci5faW5zdGFuY2UgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuZHJvcF9yb290ID0gY2MuZmluZCgnQ2FudmFzL0Ryb3BfUm9vdCcpO1xyXG4gICAgICAgIGxldCBpY29uQmFnID0gY2MuZmluZCgnQ2FudmFzL1VpX1Jvb3QvdG9wX3VpL2ljb25CZy9pY29uQ29pbicpO1xyXG4gICAgICAgIGxldCB3b3JsZFBvcyA9IGljb25CYWcucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihpY29uQmFnLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgIHRoaXMuY29pbl9wb3MgPSB0aGlzLmRyb3Bfcm9vdC5jb252ZXJ0VG9Ob2RlU3BhY2VBUih3b3JsZFBvcyk7XHJcbiAgICAgICAgc3VwZXIub25Mb2FkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHN0YXJ0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubG9hZERhdGEoKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgc3VwZXIub25EZXN0cm95KCk7XHJcbiAgICAgICAgTW9uc3Rlck1hbmFnZXIuX2luc3RhbmNlID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvL+WKoOi9veW9k+WJjeWFs+WNoeS8muWHuueOsOeahOaAqueJqVxyXG4gICAgbG9hZERhdGEoKSB7XHJcbiAgICBcclxuICAgICAgICB0aGlzLmlzX2xvYWRfb2sgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm9rX251bSA9IDA7XHJcbiAgICAgICAgbGV0IGZpZ2h0aW5nSW5mbyA9IEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZmlnaHRpbmdfaW5mbztcclxuICAgICAgICB0aGlzLmtpbGxlZF9tb25zdGVyX251bSA9IDA7XHJcbiAgICAgICAgdGhpcy5zaGlwX21vbnN0ZXJfbnVtID0gMDtcclxuXHJcbiAgICAgICAgdGhpcy50b3RhbF9tb25zdGVyX251bSA9IGZpZ2h0aW5nSW5mby50b3RhbF9tb25zdGVyX251bTtcclxuICAgICAgICB0aGlzLnByZXZfdXVpZCA9IFwiXCI7XHJcbiAgICAgICAgLy/mgKrnialpZOaVsOe7hFxyXG4gICAgICAgIGxldCBtb25zdGVyRGF0YU1hcCA9IGZpZ2h0aW5nSW5mby5nZXRPbmx5TW9uc3RlclR5cGVNYXAoKTtcclxuICAgICAgICAvL2xldCBNU009TW9uc3RlckNvbmZpZ3VyZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTsgICAgICAgIFxyXG4gICAgICAgIGxldCBsZW4gPSBtb25zdGVyRGF0YU1hcC5zaXplO1xyXG4gICAgICAgIGxldCBib3NzTG9hZE51bSA9IDA7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCIrKysrKysrKytcIixtb25zdGVyRGF0YU1hcClcclxuICAgICAgICBtb25zdGVyRGF0YU1hcC5mb3JFYWNoKCh2LCBrKSA9PiB7XHJcbiAgICAgICAgICAgIHN1cGVyLmFkZE5vZGVQb29sKGssICdtb25zdGVyL01vbnN0ZXJfJyArIGssIDQsIChub2RlOiBjYy5Ob2RlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9rX251bSsrO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9rX251bSA+PSBsZW4gJiYgYm9zc0xvYWROdW0gPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNfbG9hZF9vayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiAodiA9PSBTdHJlbmd0aFR5cGUuQm9zcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEVmZmVjdFBvb2xCeUlkKEdhbWVFZmZlY3RJZC5ib3NzX2hwLCAxLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYm9zc0xvYWROdW0tLTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5va19udW0gPj0gbGVuICYmIGJvc3NMb2FkTnVtIDw9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc19sb2FkX29rID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJvc3NMb2FkTnVtKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRWZmZWN0UG9vbEJ5SWQoR2FtZUVmZmVjdElkLmJvc3NfY29taW5nLCAxLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYm9zc0xvYWROdW0tLTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5va19udW0gPj0gbGVuICYmIGJvc3NMb2FkTnVtIDw9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc19sb2FkX29rID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJvc3NMb2FkTnVtKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEVmZmVjdFBvb2xCeUlkKEdhbWVFZmZlY3RJZC5kcm9wX2NvaW4sIDE2KTtcclxuICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRFZmZlY3RQb29sQnlJZChHYW1lRWZmZWN0SWQuZHJvcF9nZW0sIDE2KTtcclxuICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRFZmZlY3RQb29sQnlJZChHYW1lRWZmZWN0SWQuZHJvcF9nZW1fc2hhZG93LCAxNik7XHJcbiAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRWZmZWN0UG9vbEJ5SWQoR2FtZUVmZmVjdElkLmRyb3BfY29pbl9zaGFkb3csIDE2KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHNoaXBfbW9uc3Rlcl9udW0odjogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fc2hpcF9tb25zdGVyX251bSA9IHY7XHJcbiAgICAgICAgaWYgKHRoaXMuX3NoaXBfbW9uc3Rlcl9udW0gPj0gMTApIHtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93R2FtZUxvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBnZXQgc2hpcF9tb25zdGVyX251bSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zaGlwX21vbnN0ZXJfbnVtO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBhZGRNb25zdGVyUG9vbChpZDogbnVtYmVyLCBpbml0Q291bnQ6IG51bWJlciwgbG9hZENhbGxiYWNrPzogRnVuY3Rpb24pIHtcclxuICAgICAgICBsZXQgTVNNID0gTW9uc3RlckNvbmZpZ3VyZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBsZXQganNvbkRhdGEgPSBNU00uZ2V0SnNvbk1vbnN0ZXJDb25maWd1cmUoaWQpO1xyXG4gICAgICAgIGxldCB0eXBlID0ganNvbkRhdGEuTW9uc3RlckNsYXNzO1xyXG4gICAgICAgIHN1cGVyLmFkZE5vZGVQb29sKHR5cGUsICdtb25zdGVyL01vbnN0ZXJfJyArIHR5cGUsIGluaXRDb3VudCwgbG9hZENhbGxiYWNrKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5qC55o2u5oCq54mpaWTliJvlu7rkuIDkuKrmlYzkurpcclxuICAgICAqIEBwYXJhbSBpZCDmgKrnialpZFxyXG4gICAgICogQHBhcmFtIHBvcyDnlJ/miJDkvY3nva5cclxuICAgICAqIEBwYXJhbSBsZXZlbCDmgKrniannrYnnuqdcclxuICAgICAqIEBwYXJhbSBocFJhdGUg6KGA6YeP5q+U546HXHJcbiAgICAgKiBAcGFyYW0gaXNDYW5Db3VudCDmmK/lkKblj6/ku6XorqHmlbDvvIjnlKjkuo7ljLrliIblj6zllKTnianvvIlcclxuICAgICAqIEByZXR1cm5zIFxyXG4gICAgICovXHJcbiAgICBjcmVhdGVNb25zdGVyQnlJZChpZDogbnVtYmVyLCBwb3M6IGNjLlZlYzIsIGxldmVsOiBudW1iZXIsIGhwUmF0ZTogbnVtYmVyLCBpc0NhbkNvdW50OiBib29sZWFuID0gdHJ1ZSk6IGNjLk5vZGUge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiX19fX19fX1wiLHBvcy54LHBvcy55KVxyXG4gICAgICAgIGxldCB0eXBlID0gTW9uc3RlckNvbmZpZ3VyZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNb25zdGVyQ2xhc3MoaWQpO1xyXG4gICAgICAgIGxldCBub2RlID0gc3VwZXIuZ2V0Tm9kZUJ5SWQodHlwZSk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgIG5vZGUuc2V0UG9zaXRpb24ocG9zKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChNb25zdGVyKS5pbml0KGlkLCBsZXZlbCwgaHBSYXRlLCBpc0NhbkNvdW50KTtcclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogYm9zc+WIm+W7uuWPrOWUpOeJqVxyXG4gICAgICogQHBhcmFtIG1vbnN0ZXJJZCDmgKrnialpZFxyXG4gICAgICogQHBhcmFtIHBvcyDnlJ/miJDkvY3nva5cclxuICAgICAqIEBwYXJhbSBib3NzQXR0cmlidXRlIGJvc3PnmoTlsZ7mgKdcclxuICAgICAqIEByZXR1cm5zIFxyXG4gICAgICovXHJcbiAgICBjcmVhdGVTdW1tb25Nb25zdGVyKG1vbnN0ZXJJZDogbnVtYmVyLCBsZXZlbDogbnVtYmVyLCBwb3M6IGNjLlZlYzIpIHtcclxuICAgICAgICAvL+WPrOWUpOeJueaViFxyXG4gICAgICAgIGxldCBxdWFuID0gR3JvdW5kTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5tb25zdGVyX3poYW9odWFuLCBwb3MpO1xyXG4gICAgICAgIGxldCBzcGluZSA9IHF1YW4uZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcclxuICAgICAgICBsZXQgdHJhY2sgPSBzcGluZS5zZXRBbmltYXRpb24oMCwgXCJCb3NzMTBfU2tpbGwyX1poYW9IdWFuXzJcIiwgZmFsc2UpO1xyXG4gICAgICAgIHNwaW5lLnNldFRyYWNrRXZlbnRMaXN0ZW5lcih0cmFjaywgKGVudHJ5OiBzcC5zcGluZS5UcmFja0VudHJ5LCBldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQuZGF0YS5uYW1lID09IFwiWmhhb0h1YW5cIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVNb25zdGVyQnlJZChtb25zdGVySWQsIHBvcywgbGV2ZWwsIDEsIGZhbHNlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICBzcGluZS5zZXRDb21wbGV0ZUxpc3RlbmVyKCgpID0+IHtcclxuICAgICAgICAgICAgc3BpbmUuc2V0Q29tcGxldGVMaXN0ZW5lcihudWxsKTtcclxuICAgICAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZGVzdHJveUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5tb25zdGVyX3poYW9odWFuLCBxdWFuKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHByZXZfdXVpZDogc3RyaW5nID0gXCJcIjtcclxuICAgIC8qKuWNs+WwhuWIoOmZpOaVjOS6uu+8jOWPr+S7peWcqOatpOaSreaUvumfs+aViCAqL1xyXG4gICAgd2lsbERlc3Ryb3lNb25zdGVyKG1vbnN0ZXJUczogTW9uc3Rlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIC8v5piv5ZCm6KaB6L+Q6KGM5Yqo5L2c5ZCO5YaN6ZSA5q+BXHJcbiAgICAgICAgbGV0IGlzQWN0aW9uRGllID0gdHJ1ZTtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguWVhfU2hvdWppKTtcclxuICAgICAgICAvL+eIhumHkeW4gVxyXG4gICAgICAgIC8vIGxldCBwb3MgPSBtb25zdGVyVHMubm9kZS5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgIC8vIGlmIChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX21vZGUgPT0gR2FtZU1vZGUuTWFpbikge1xyXG4gICAgICAgIC8vICAgICB0aGlzLmNyZWF0ZURyb3BQcm9wKHBvcywgR2FtZUVmZmVjdElkLmRyb3BfY29pbik7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuY3JlYXRlRHJvcFByb3AocG9zLCBHYW1lRWZmZWN0SWQuZHJvcF9jb2luKTtcclxuICAgICAgICAvLyAgICAgdGhpcy5jcmVhdGVEcm9wUHJvcChwb3MsIEdhbWVFZmZlY3RJZC5kcm9wX2dlbSk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIHJldHVybiBpc0FjdGlvbkRpZTtcclxuICAgIH1cclxuICAgIC8v5pyJ5oCq5LiK6Ii55LqGXHJcbiAgICB1cFNoaXBNb25zdGVyKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmtpbGxlZF9tb25zdGVyX251bSArIHRoaXMuc2hpcF9tb25zdGVyX251bSA+PSB0aGlzLnRvdGFsX21vbnN0ZXJfbnVtKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5nZXRSZW1haW5Nb25zdGVyKCkgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93R2FtZVdpbigpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKuWbnuaUtuaVjOS6uuWIsOWvueixoeaxoCAqL1xyXG4gICAgZGVzdHJveU1vbnN0ZXIobm9kZTogY2MuTm9kZSwgdHlwZTogbnVtYmVyLCBpc0NhbldpbjogYm9vbGVhbiA9IHRydWUpIHtcclxuICAgICAgXHJcbiAgICAgICAgbm9kZS5jb2xvciA9IGNjLkNvbG9yLldISVRFO1xyXG4gICAgICAgIGxldCBtb25zdGVyVHMgPSBub2RlLmdldENvbXBvbmVudChNb25zdGVyKTtcclxuICAgICAgICBtb25zdGVyVHMuc2V0RW5lbXlTdGF0ZShFbmVteV9TdGF0ZS5kaWUpO1xyXG4gICAgICAgIC8v6KaB5Yy65YiG5Y+s5ZSk5oCqXHJcbiAgICAgICAgaWYgKG1vbnN0ZXJUcy5pc19jYW5fY291bnQpIHtcclxuICAgICAgICAgICAgaWYgKG1vbnN0ZXJUcy51dWlkID09IHRoaXMucHJldl91dWlkKSB7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUuZXJyb3IoXCLlj6/og73ph43lpI3orqHmlbDkuoY6XCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucHJldl91dWlkID0gbW9uc3RlclRzLnV1aWQ7XHJcbiAgICAgICAgICAgIHRoaXMua2lsbGVkX21vbnN0ZXJfbnVtKys7XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkub25FbmVteURpZShtb25zdGVyVHMuc2NvcmUsIG1vbnN0ZXJUcy5pc19jYW5fY291bnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMua2lsbGVkX21vbnN0ZXJfbnVtICsgdGhpcy5zaGlwX21vbnN0ZXJfbnVtID49IHRoaXMudG90YWxfbW9uc3Rlcl9udW0pIHtcclxuICAgICAgICAgICAgaWYgKGlzQ2FuV2luKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2V0UmVtYWluTW9uc3RlcigpIDw9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dHYW1lV2luKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gLy/lm57mlLbliY3moIforrDlj6/ku6VcclxuICAgICAgICAvLyBpZihtb25zdGVyVHMpe1xyXG4gICAgICAgIC8vICAgICBtb25zdGVyVHMuc2V0SXNDYW5Db3VudCh0cnVlKTtcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIHN1cGVyLmRlc3Ryb3lOb2RlKHR5cGUsIG5vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0UmVtYWluTW9uc3RlcigpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBudW0gPSAwO1xyXG4gICAgICAgIGxldCBsZW4gPSB0aGlzLm5vZGUuY2hpbGRyZW5Db3VudDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBtb25zdGVyID0gdGhpcy5ub2RlLmNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICBsZXQgbW9uc3RlclRTID0gbW9uc3Rlci5nZXRDb21wb25lbnQoTW9uc3Rlcik7XHJcbiAgICAgICAgICAgIGlmIChtb25zdGVyVFMgJiYgbW9uc3RlclRTLmdldElzRGllKCkgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIG51bSsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudW07XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlRHJvcFByb3AocG9zOiBjYy5WZWMyLCBpZDogR2FtZUVmZmVjdElkKSB7XHJcbiAgICAgICAgbGV0IHByb3AgPSBHcm91bmRNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoaWQsIHBvcywgMik7XHJcbiAgICAgICAgLy90aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWU9UHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTcEJ5UHJvcElkKFByb3BJZC5Db2luKTtcclxuICAgICAgICBwcm9wLm9wYWNpdHkgPSAyNTU7XHJcbiAgICAgICAgLy9wcm9wLnNjYWxlPTAuNTtcclxuICAgICAgICBsZXQgeHggPSBNYXRoLnJhbmRvbSgpICogMjAgKyAzMDtcclxuICAgICAgICB4eCAqPSBNYXRoLnJhbmRvbSgpIDwgMC41ID8gMSA6IC0xO1xyXG4gICAgICAgIGxldCB5eSA9IE1hdGgucmFuZG9tKCkgKiA0MCAtIDIwO1xyXG4gICAgICAgIGxldCBoZWlnaHQgPSBNYXRoLnJhbmRvbSgpICogMjAgKyAzMDtcclxuICAgICAgICAvLyBjYy50d2Vlbihwcm9wKS50aGVuKGNjLmp1bXBCeSgwLjUseHgseXksaGVpZ2h0LDEpKS5kZWxheSgxKS5jYWxsKCgpPT57XHJcbiAgICAgICAgLy8gICAgIHByb3AucGFyZW50PVVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLm5vZGU7XHJcbiAgICAgICAgLy8gfSkudGhlbihNeVRvb2wuZ2V0QmV6aWVyQWN0KHByb3AuZ2V0UG9zaXRpb24oKSx0aGlzLmNvaW5fcG9zKSkuY2FsbCgoKT0+e1xyXG4gICAgICAgIC8vICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5kZXN0cm95R2FtZUVmZmVjdEJ5SWQoaWQscHJvcCk7XHJcbiAgICAgICAgLy8gICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2FtZS5zaG93Q29pbigpO1xyXG4gICAgICAgIC8vIH0pLnN0YXJ0KCk7XHJcblxyXG4gICAgICAgIGNjLnR3ZWVuKHByb3ApLnRoZW4oY2MuanVtcEJ5KDAuNSwgeHgsIHl5LCBoZWlnaHQsIDEpKVxyXG4gICAgICAgICAgICAvLyAuY2FsbCgoKT0+e1xyXG4gICAgICAgICAgICAvLyAgICAgLy/nlJ/miJDpmLTlvbFcclxuICAgICAgICAgICAgLy8gICAgIGxldCBzaGFkb3dJZD1HYW1lRWZmZWN0SWQuZHJvcF9nZW07XHJcbiAgICAgICAgICAgIC8vICAgICBsZXQgZGlzdFhYPTA7XHJcbiAgICAgICAgICAgIC8vICAgICBsZXQgZGlzdFlZPTA7XHJcbiAgICAgICAgICAgIC8vICAgICBzd2l0Y2goaWQpe1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIGNhc2UgR2FtZUVmZmVjdElkLmRyb3BfY29pbjp7ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgZGlzdFhYPXByb3AueDtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgZGlzdFlZPXByb3AueS05LjU7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIHNoYWRvd0lkPUdhbWVFZmZlY3RJZC5kcm9wX2NvaW5fc2hhZG93O1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgLy8gICAgICAgICBjYXNlIEdhbWVFZmZlY3RJZC5kcm9wX2dlbTp7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIHNoYWRvd0lkPUdhbWVFZmZlY3RJZC5kcm9wX2dlbV9zaGFkb3c7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIGRpc3RYWD1wcm9wLngrMTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgZGlzdFlZPXByb3AueS0xMDtcclxuICAgICAgICAgICAgLy8gICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIC8vICAgICB9ICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gICAgIGxldCBzaGFkb3c9R3JvdW5kTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKHNoYWRvd0lkLGNjLnYyKGRpc3RYWCxkaXN0WVkpLDEpO1xyXG4gICAgICAgICAgICAvLyAgICAgc2hhZG93Lm9wYWNpdHk9MTAwO1xyXG4gICAgICAgICAgICAvLyAgICAgY2MudHdlZW4oc2hhZG93KS5kZWxheSgxMCkudG8oMC41LHtvcGFjaXR5OjB9KS5jYWxsKCgpPT57XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZGVzdHJveUdhbWVFZmZlY3RCeUlkKHNoYWRvd0lkLHNoYWRvdyk7XHJcbiAgICAgICAgICAgIC8vICAgICB9KS5zdGFydCgpO1xyXG4gICAgICAgICAgICAvLyB9KVxyXG4gICAgICAgICAgICAuZGVsYXkoMTApLnRvKDAuNSwgeyBvcGFjaXR5OiAwIH0pLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZGVzdHJveUdhbWVFZmZlY3RCeUlkKGlkLCBwcm9wKTtcclxuICAgICAgICAgICAgfSkuc3RhcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBkZXN0cm95QWxsRHJvcCgpIHtcclxuICAgICAgICBsZXQgZHJvcHMgPSB0aGlzLmRyb3Bfcm9vdC5jaGlsZHJlbjtcclxuICAgICAgICBsZXQgbGVuID0gZHJvcHMubGVuZ3RoO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHByb3AgPSBkcm9wc1swXTtcclxuICAgICAgICAgICAgbGV0IGlkID0gcGFyc2VJbnQocHJvcC5uYW1lKTtcclxuICAgICAgICAgICAgaWYgKGlkKSB7XHJcbiAgICAgICAgICAgICAgICBjYy50d2Vlbihwcm9wKS50bygwLjUsIHsgb3BhY2l0eTogMCB9KS5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5kZXN0cm95R2FtZUVmZmVjdEJ5SWQoaWQsIHByb3ApO1xyXG4gICAgICAgICAgICAgICAgfSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZGVzdHJveUFsbE1vbnN0ZXIoKSB7XHJcbiAgICAgICAgbGV0IGFsbE1vbnN0ZXIgPSB0aGlzLm5vZGUuY2hpbGRyZW47XHJcbiAgICAgICAgbGV0IGxlbiA9IGFsbE1vbnN0ZXIubGVuZ3RoO1xyXG5cclxuICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG1vbnN0ZXIgPSBhbGxNb25zdGVyWzBdO1xyXG4gICAgICAgXHJcbiAgICAgICAgICAgIGlmIChtb25zdGVyKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbW9uc3RlclRTID0gbW9uc3Rlci5nZXRDb21wb25lbnQoTW9uc3Rlcik7XHJcbiAgICAgICAgICAgICAgICBpZiAobW9uc3RlclRTKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbW9uc3RlclRTLmhpZFNoYWRvdygpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVzdHJveU1vbnN0ZXIobW9uc3RlciwgbW9uc3RlclRTLm1vbnN0ZXJfdHlwZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUdFVC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluaMh+WumuS9jee9rnRhcmdldFBvc+eahOaMh+WumuiMg+WbtGZhbndlaeWGhemdoOi/keWfjuWimeacgOi/keeahGNoZWFrTnVt5Liq5pWM5Lq6XHJcbiAgICAgKiBAcGFyYW0gY2hlYWtOdW0g5qOA5rWL5pWw6YePXHJcbiAgICAgKiBAcGFyYW0gdGFyZ2V0UG9zIOaMh+WumueahOS9jee9ru+8jOS4gOiIrOaYr+iHqui6q+S9jee9rlxyXG4gICAgICogQHBhcmFtIGZhbndlaSDmjIflrprnmoTmo4DmtYvojIPlm7TvvIzkuIDoiKzmmK/mlLvlh7vot53nprtcclxuICAgICAqIEByZXR1cm5zIOaJgOaciea7oei2s+adoeS7tueahOaVjOS6ulxyXG4gICAgICovXHJcbiAgICBnZXRNb25zdGVyc0Zvck5lYXJlc3QoY2hlYWtOdW06IG51bWJlciwgdGFyZ2V0UG9zOiBjYy5WZWMyLCBmYW53ZWk6IG51bWJlciwgcG9zSW5kZXg6IG51bWJlciA9IG51bGwpOiBjYy5Ob2RlW10ge1xyXG4gICAgICAgIGlmIChjaGVha051bSA9PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbGVuID0gdGhpcy5ub2RlLmNoaWxkcmVuQ291bnQ7XHJcbiAgICAgICAgaWYgKGxlbiA8PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLzEu5YWI5qOA5rWL5Zyo5pS75Ye76IyD5Zu05YaF56ym5ZCI5pS75Ye75Y2V5L2N55qE5pWM5Lq6XHJcbiAgICAgICAgbGV0IGF0dE1vbnN0ZXJzOiBjYy5Ob2RlW10gPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBtb25zdGVyID0gdGhpcy5ub2RlLmNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICBsZXQgbW9uc3RlclRTID0gbW9uc3Rlci5nZXRDb21wb25lbnQoTW9uc3Rlcik7XHJcbiAgICAgICAgICAgIGlmIChtb25zdGVyVFMgJiYgbW9uc3RlclRTLmdldElzQ2FuQ2hlY2soKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRpc3RhbmNlID0gdGFyZ2V0UG9zLnN1Yihtb25zdGVyLmdldFBvc2l0aW9uKCkpLm1hZygpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRpc3RhbmNlIDw9IGZhbndlaSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwb3NJbmRleCA9PSBudWxsIHx8IHBvc0luZGV4ID09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dE1vbnN0ZXJzLnB1c2gobW9uc3Rlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKG1vbnN0ZXIueCAtIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhclBvc1gpIDw9IDc1ICYmIG1vbnN0ZXIueSA+IFdhbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWFpbldhbGwoKS5nZXRXYWxsUmVjdCgpLnlNYXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dE1vbnN0ZXJzLnB1c2gobW9uc3Rlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChhdHRNb25zdGVycy5sZW5ndGggPD0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/lsI/kuo4w77yM5Luj6KGo6KaB5omA5pyJXHJcbiAgICAgICAgaWYgKGNoZWFrTnVtIDwgMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gYXR0TW9uc3RlcnM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjaGVha051bSA+PSBhdHRNb25zdGVycy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGF0dE1vbnN0ZXJzO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLzIu5a+55Y+v5Lul5pS75Ye755qE5pWM5Lq66L+b6KGM5LyY5YWI57qn5Yik5patLOmAieWHumNoZWFrTnVt5Liq55uu5qCH5L2c5Li65omT5Ye75Y2V5L2NXHJcbiAgICAgICAgLy8yLjHkvJjlhYjmlLvlh7vot5/ln47lopnmnIDov5HnmoTljZXkvY1cclxuICAgICAgICBhdHRNb25zdGVycy5zb3J0KChhOiBjYy5Ob2RlLCBiOiBjYy5Ob2RlKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBhLmdldFBvc2l0aW9uKCkuc3ViKHRhcmdldFBvcykubWFnKCkgLSBiLmdldFBvc2l0aW9uKCkuc3ViKHRhcmdldFBvcykubWFnKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYXR0TW9uc3RlcnMuc3BsaWNlKGNoZWFrTnVtKTtcclxuICAgICAgICByZXR1cm4gYXR0TW9uc3RlcnM7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluaMh+WumuS9jee9rnRhcmdldFBvc+eahOaMh+WumuiMg+WbtGZhbndlaeWGhemdoOi/keWfjuWimeacgOi/keeahGNoZWFrTnVt5Liq5pWM5Lq6XHJcbiAgICAgKiBAcGFyYW0gY2hlYWtOdW0g5qOA5rWL5pWw6YePXHJcbiAgICAgKiBAcGFyYW0gdGFyZ2V0UG9zIOaMh+WumueahOS9jee9ru+8jOS4gOiIrOaYr+iHqui6q+S9jee9rlxyXG4gICAgICogQHBhcmFtIGZhbndlaSDmjIflrprnmoTmo4DmtYvojIPlm7TvvIzkuIDoiKzmmK/mlLvlh7vot53nprtcclxuICAgICAqIEByZXR1cm5zIOaJgOaciea7oei2s+adoeS7tueahOaVjOS6ulxyXG4gICAgICovXHJcbiAgICBnZXRNb25zdGVyc0Zvck5lYXJlc3RCeVNraWxsKGNoZWFrTnVtOiBudW1iZXIsIHRhcmdldFBvc1k6IG51bWJlciwgZmFud2VpOiBudW1iZXIpOiBjYy5Ob2RlW10ge1xyXG4gICAgICAgIGlmIChjaGVha051bSA9PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbGVuID0gdGhpcy5ub2RlLmNoaWxkcmVuQ291bnQ7XHJcbiAgICAgICAgaWYgKGxlbiA8PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLzEu5YWI5qOA5rWL5Zyo5pS75Ye76IyD5Zu05YaF56ym5ZCI5pS75Ye75Y2V5L2N55qE5pWM5Lq6XHJcbiAgICAgICAgbGV0IGF0dE1vbnN0ZXJzOiBjYy5Ob2RlW10gPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBtb25zdGVyID0gdGhpcy5ub2RlLmNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICBsZXQgbW9uc3RlclRTID0gbW9uc3Rlci5nZXRDb21wb25lbnQoTW9uc3Rlcik7XHJcbiAgICAgICAgICAgIGlmIChtb25zdGVyVFMgJiYgbW9uc3RlclRTLmdldElzQ2FuQ2hlY2soKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRpc3RhbmNlID0gbW9uc3RlclRTLmdldENlbnRlclBvcygpLnkgLSB0YXJnZXRQb3NZO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRpc3RhbmNlIDw9IGZhbndlaSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGF0dE1vbnN0ZXJzLnB1c2gobW9uc3Rlcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGF0dE1vbnN0ZXJzLmxlbmd0aCA8PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+Wwj+S6jjDvvIzku6PooajopoHmiYDmnIlcclxuICAgICAgICBpZiAoY2hlYWtOdW0gPCAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhdHRNb25zdGVycztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNoZWFrTnVtID49IGF0dE1vbnN0ZXJzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm4gYXR0TW9uc3RlcnM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vMi7lr7nlj6/ku6XmlLvlh7vnmoTmlYzkurrov5vooYzkvJjlhYjnuqfliKTmlq0s6YCJ5Ye6Y2hlYWtOdW3kuKrnm67moIfkvZzkuLrmiZPlh7vljZXkvY1cclxuICAgICAgICAvLzIuMeS8mOWFiOaUu+WHu+i3n+WfjuWimeacgOi/keeahOWNleS9jVxyXG4gICAgICAgIGF0dE1vbnN0ZXJzLnNvcnQoKGE6IGNjLk5vZGUsIGI6IGNjLk5vZGUpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIChhLnkgLSB0YXJnZXRQb3NZKSAtIChiLnkgLSB0YXJnZXRQb3NZKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBhdHRNb25zdGVycy5zcGxpY2UoY2hlYWtOdW0pO1xyXG4gICAgICAgIHJldHVybiBhdHRNb25zdGVycztcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogLy/ojrflj5bmjIflrprkvY3nva50YXJnZXRQb3PnmoTmjIflrprojIPlm7RmYW53ZWnlhoVjaGVha051beS4quaVjOS6ulxyXG4gICAgICogQHBhcmFtIGNoZWFrTnVtIOajgOa1i+aVsOmHj++8jOWwj+S6jjDooajnpLrmiYDmnInvvIzlpoItMVxyXG4gICAgICogQHBhcmFtIHRhcmdldFBvcyDnm67moIfkvY3nva5cclxuICAgICAqIEBwYXJhbSBmYW53ZWkg6IyD5Zu0XHJcbiAgICAgKiBAcmV0dXJucyDmiYDmnInnrKblkIjmnaHku7bnmoTmlYzkurpcclxuICAgICAqL1xyXG4gICAgZ2V0TW9uc3RlcnNGb3JDZW50ZXJQb3MoY2hlYWtOdW06IG51bWJlciwgdGFyZ2V0UG9zOiBjYy5WZWMyLCBmYW53ZWk6IG51bWJlcik6IGNjLk5vZGVbXSB7XHJcbiAgICAgICAgaWYgKGNoZWFrTnVtID09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBsZW4gPSB0aGlzLm5vZGUuY2hpbGRyZW5Db3VudDtcclxuICAgICAgICBpZiAobGVuIDw9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vMS7lhYjmo4DmtYvlnKjmlLvlh7vojIPlm7TlhoXnrKblkIjmlLvlh7vljZXkvY3nmoTmlYzkurpcclxuICAgICAgICBsZXQgYXR0TW9uc3RlcnM6IGNjLk5vZGVbXSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG1vbnN0ZXIgPSB0aGlzLm5vZGUuY2hpbGRyZW5baV07XHJcbiAgICAgICAgICAgIGxldCBtb25zdGVyVFMgPSBtb25zdGVyLmdldENvbXBvbmVudChNb25zdGVyKTtcclxuICAgICAgICAgICAgaWYgKG1vbnN0ZXJUUyAmJiBtb25zdGVyVFMuZ2V0SXNDYW5DaGVjaygpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGlzdGFuY2UgPSB0YXJnZXRQb3Muc3ViKG1vbnN0ZXJUUy5nZXRDZW50ZXJQb3MoKSkubWFnKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGlzdGFuY2UgPD0gZmFud2VpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXR0TW9uc3RlcnMucHVzaChtb25zdGVyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYXR0TW9uc3RlcnMubGVuZ3RoIDw9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5bCP5LqOMO+8jOS7o+ihqOimgeaJgOaciVxyXG4gICAgICAgIGlmIChjaGVha051bSA8IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIGF0dE1vbnN0ZXJzO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+WmguaenOajgOa1i+WIsOeahOaVsOmHj+ayoeacieimgeajgOa1i+eahOmCo+S5iOWkmu+8jOebtOaOpei/lOWbnuWFqOmDqC5cclxuICAgICAgICBpZiAoY2hlYWtOdW0gPj0gYXR0TW9uc3RlcnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhdHRNb25zdGVycztcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8yLjHkvJjlhYjmlLvlh7vot5/nm67moIfkvY3nva7mnIDov5HnmoTljZXkvY3vvIzmjInnhafkuI5wb3PnmoTot53nprvlpKflsI/ov5vooYzmjpLliJfvvIzku47lsI/liLDlpKdcclxuICAgICAgICBhdHRNb25zdGVycy5zb3J0KChhOiBjYy5Ob2RlLCBiOiBjYy5Ob2RlKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBhLmdldFBvc2l0aW9uKCkuc3ViKHRhcmdldFBvcykubWFnKCkgLSBiLmdldFBvc2l0aW9uKCkuc3ViKHRhcmdldFBvcykubWFnKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYXR0TW9uc3RlcnMuc3BsaWNlKGNoZWFrTnVtKTtcclxuICAgICAgICByZXR1cm4gYXR0TW9uc3RlcnM7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIC8v6I635Y+W5oyH5a6a5L2N572udGFyZ2V0UG9z55qE5oyH5a6a6IyD5Zu0ZmFud2Vp5YaFY2hlYWtOdW3kuKrmlYzkurpcclxuICAgICAqIEBwYXJhbSBjaGVha051bSDmo4DmtYvmlbDph4/vvIzlsI/kuo4w6KGo56S65omA5pyJ77yM5aaCLTFcclxuICAgICAqIEBwYXJhbSB0YXJnZXRQb3Mg55uu5qCH5L2N572uXHJcbiAgICAgKiBAcGFyYW0gZmFud2VpIOiMg+WbtFxyXG4gICAgICogQHJldHVybnMg5omA5pyJ56ym5ZCI5p2h5Lu255qE5pWM5Lq6XHJcbiAgICAgKi9cclxuICAgIGdldE1vbnN0ZXJzRm9yQmluZ052V2FsbFJlY3QocmVjdDogY2MuUmVjdCk6IEJpbmdOdldhbGxEYXRhIHtcclxuICAgICAgICBsZXQgbGVuID0gdGhpcy5ub2RlLmNoaWxkcmVuQ291bnQ7XHJcbiAgICAgICAgLy8xLuWFiOajgOa1i+WcqOaUu+WHu+iMg+WbtOWGheespuWQiOaUu+WHu+WNleS9jeeahOaVjOS6ulxyXG4gICAgICAgIGxldCBibndkID0gbmV3IEJpbmdOdldhbGxEYXRhKCk7XHJcbiAgICAgICAgbGV0IGF0dE1vbnN0ZXJzOiBjYy5Ob2RlW10gPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBtb25zdGVyID0gdGhpcy5ub2RlLmNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICBsZXQgbW9uc3RlclRTID0gbW9uc3Rlci5nZXRDb21wb25lbnQoTW9uc3Rlcik7XHJcbiAgICAgICAgICAgIGlmIChtb25zdGVyVFMgJiYgbW9uc3RlclRTLmdldElzQ2FuQ2hlY2soKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlY3QuY29udGFpbnMobW9uc3Rlci5nZXRQb3NpdGlvbigpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGF0dE1vbnN0ZXJzLnB1c2gobW9uc3Rlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1vbnN0ZXJUUy5nZXRTdHJlbmd0aFR5cGUoKSA9PSBTdHJlbmd0aFR5cGUuQm9zcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBibndkLmJvc3NfdHMgPSBtb25zdGVyVFM7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJud2QuYmFja19tb25zdGVycyA9IGF0dE1vbnN0ZXJzO1xyXG4gICAgICAgIHJldHVybiBibndkO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDov5Tlm57nlJ/lkb3lgLzmnIDpq5jnmoTmlYzkurrluo/liJdcclxuICAgICAqIEBwYXJhbSBjaGVha051bSDmo4DmtYvmlbDph4/vvIzlsI/kuo4w6KGo56S65omA5pyJ77yM5aaCLTFcclxuICAgICAqIEBwYXJhbSB0YXJnZXRQb3MgXHJcbiAgICAgKiBAcGFyYW0gZmFud2VpIFxyXG4gICAgICogQHJldHVybnMgXHJcbiAgICAgKi9cclxuICAgIGdldE1vbnN0ZXJzRm9yTWF4SHAoY2hlYWtOdW06IG51bWJlciwgdGFyZ2V0UG9zOiBjYy5WZWMyLCBmYW53ZWk6IG51bWJlcik6IGNjLk5vZGVbXSB7XHJcbiAgICAgICAgaWYgKGNoZWFrTnVtID09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBsZW4gPSB0aGlzLm5vZGUuY2hpbGRyZW5Db3VudDtcclxuICAgICAgICBpZiAobGVuIDw9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vMS7lhYjmo4DmtYvlnKjmlLvlh7vojIPlm7TlhoXnrKblkIjmlLvlh7vljZXkvY3nmoTmlYzkurpcclxuICAgICAgICBsZXQgYXR0TW9uc3RlcnM6IGNjLk5vZGVbXSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG1vbnN0ZXIgPSB0aGlzLm5vZGUuY2hpbGRyZW5baV07XHJcbiAgICAgICAgICAgIGxldCBtb25zdGVyVFMgPSBtb25zdGVyLmdldENvbXBvbmVudChNb25zdGVyKTtcclxuICAgICAgICAgICAgaWYgKG1vbnN0ZXJUUyAmJiBtb25zdGVyVFMuZ2V0SXNDYW5DaGVjaygpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGlzdGFuY2UgPSB0YXJnZXRQb3Muc3ViKG1vbnN0ZXIuZ2V0UG9zaXRpb24oKSkubWFnKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGlzdGFuY2UgPD0gZmFud2VpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXR0TW9uc3RlcnMucHVzaChtb25zdGVyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYXR0TW9uc3RlcnMubGVuZ3RoIDw9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5bCP5LqOMO+8jOS7o+ihqOimgeaJgOaciVxyXG4gICAgICAgIGlmIChjaGVha051bSA8IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIGF0dE1vbnN0ZXJzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY2hlYWtOdW0gPj0gYXR0TW9uc3RlcnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhdHRNb25zdGVycztcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8yLuWvueWPr+S7peaUu+WHu+eahOaVjOS6uui/m+ihjOS8mOWFiOe6p+WIpOaWrSzpgInlh7pjaGVha051beS4quebruagh+S9nOS4uuaJk+WHu+WNleS9jVxyXG4gICAgICAgIC8vMi4x5LyY5YWI5pS75Ye76Lef5Z+O5aKZ5pyA6L+R55qE5Y2V5L2NXHJcbiAgICAgICAgYXR0TW9uc3RlcnMuc29ydCgoYTogY2MuTm9kZSwgYjogY2MuTm9kZSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gYi5nZXRDb21wb25lbnQoTW9uc3RlcikuZ2V0Q3VySHAoKSAtIGEuZ2V0Q29tcG9uZW50KE1vbnN0ZXIpLmdldEN1ckhwKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYXR0TW9uc3RlcnMuc3BsaWNlKGNoZWFrTnVtKTtcclxuICAgICAgICByZXR1cm4gYXR0TW9uc3RlcnM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDov5Tlm57nlJ/lkb3lgLzmnIDpq5jnmoTmlYzkurrluo/liJdcclxuICAgICAqIEBwYXJhbSBjaGVha051bSDmo4DmtYvmlbDph4/vvIzlsI/kuo4w6KGo56S65omA5pyJ77yM5aaCLTFcclxuICAgICAqIEBwYXJhbSB0YXJnZXRQb3MgXHJcbiAgICAgKiBAcGFyYW0gZmFud2VpIFxyXG4gICAgICogQHJldHVybnMgXHJcbiAgICAgKi9cclxuICAgIGdldE1vbnN0ZXJzRm9yTWF4QXR0YWsoY2hlYWtOdW06IG51bWJlciwgdGFyZ2V0UG9zOiBjYy5WZWMyLCBmYW53ZWk6IG51bWJlcik6IGNjLk5vZGVbXSB7XHJcbiAgICAgICAgaWYgKGNoZWFrTnVtID09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBsZW4gPSB0aGlzLm5vZGUuY2hpbGRyZW5Db3VudDtcclxuICAgICAgICBpZiAobGVuIDw9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vMS7lhYjmo4DmtYvlnKjmlLvlh7vojIPlm7TlhoXnrKblkIjmlLvlh7vljZXkvY3nmoTmlYzkurpcclxuICAgICAgICBsZXQgYXR0TW9uc3RlcnM6IGNjLk5vZGVbXSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG1vbnN0ZXIgPSB0aGlzLm5vZGUuY2hpbGRyZW5baV07XHJcbiAgICAgICAgICAgIGxldCBtb25zdGVyVFMgPSBtb25zdGVyLmdldENvbXBvbmVudChNb25zdGVyKTtcclxuICAgICAgICAgICAgaWYgKG1vbnN0ZXJUUyAmJiBtb25zdGVyVFMuZ2V0SXNDYW5DaGVjaygpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGlzdGFuY2UgPSB0YXJnZXRQb3Muc3ViKG1vbnN0ZXIuZ2V0UG9zaXRpb24oKSkubWFnKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGlzdGFuY2UgPD0gZmFud2VpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXR0TW9uc3RlcnMucHVzaChtb25zdGVyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYXR0TW9uc3RlcnMubGVuZ3RoIDw9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5bCP5LqOMO+8jOS7o+ihqOimgeaJgOaciVxyXG4gICAgICAgIGlmIChjaGVha051bSA8IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIGF0dE1vbnN0ZXJzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY2hlYWtOdW0gPj0gYXR0TW9uc3RlcnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhdHRNb25zdGVycztcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8yLuWvueWPr+S7peaUu+WHu+eahOaVjOS6uui/m+ihjOS8mOWFiOe6p+WIpOaWrSzpgInlh7pjaGVha051beS4quebruagh+S9nOS4uuaJk+WHu+WNleS9jVxyXG4gICAgICAgIC8vMi4x5LyY5YWI5pS75Ye76Lef5Z+O5aKZ5pyA6L+R55qE5Y2V5L2NXHJcbiAgICAgICAgYXR0TW9uc3RlcnMuc29ydCgoYTogY2MuTm9kZSwgYjogY2MuTm9kZSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gYi5nZXRDb21wb25lbnQoTW9uc3RlcikuZ2V0Q3VyQXR0KCkgLSBhLmdldENvbXBvbmVudChNb25zdGVyKS5nZXRDdXJBdHQoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBhdHRNb25zdGVycy5zcGxpY2UoY2hlYWtOdW0pO1xyXG4gICAgICAgIHJldHVybiBhdHRNb25zdGVycztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIC8v6I635Y+W5oyH5a6a5L2N572udGFyZ2V0UG9z55qE5oyH5a6a6IyD5Zu0ZmFud2Vp5YaFY2hlYWtOdW3kuKrmlYzkurpcclxuICAgICAqIEBwYXJhbSBjaGVha051bSDmo4DmtYvmlbDph4/vvIzlsI/kuo4w6KGo56S65omA5pyJ77yM5aaCLTFcclxuICAgICAqIEBwYXJhbSB0YXJnZXRQb3Mg55uu5qCH5L2N572uXHJcbiAgICAgKiBAcGFyYW0gcmFkaXVzIOiMg+WbtOWNiuW+hFxyXG4gICAgICogQHBhcmFtIG1pblJhZGlhbiDmnIDlsI/nmoTlvKfluqblgLxcclxuICAgICAqIEBwYXJhbSBtYXhSYWRpYW4g5pyA5aSn55qE5byn5bqm5YC8XHJcbiAgICAgKiBAcmV0dXJucyDmiYDmnInnrKblkIjmnaHku7bnmoTmlYzkurpcclxuICAgICAqL1xyXG4gICAgZ2V0TW9uc3RlcnNGb3JSYWRpYW4oY2hlYWtOdW06IG51bWJlciwgdGFyZ2V0UG9zOiBjYy5WZWMyLCByYWRpdXM6IG51bWJlciwgbWluUmFkaWFuOiBudW1iZXIsIG1heFJhZGlhbjogbnVtYmVyKTogY2MuTm9kZVtdIHtcclxuICAgICAgICBpZiAoY2hlYWtOdW0gPT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGxlbiA9IHRoaXMubm9kZS5jaGlsZHJlbkNvdW50O1xyXG4gICAgICAgIGlmIChsZW4gPD0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHAyID0gTWF0aC5QSSAqIDI7XHJcbiAgICAgICAgbWluUmFkaWFuID0gKHAyICsgbWluUmFkaWFuKSAlIHAyXHJcbiAgICAgICAgbWF4UmFkaWFuID0gKHAyICsgbWF4UmFkaWFuKSAlIHAyXHJcbiAgICAgICAgLy8xLuWFiOajgOa1i+WcqOaUu+WHu+iMg+WbtOWGheespuWQiOaUu+WHu+WNleS9jeeahOaVjOS6ulxyXG4gICAgICAgIGxldCBhdHRNb25zdGVyczogY2MuTm9kZVtdID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgbW9uc3RlciA9IHRoaXMubm9kZS5jaGlsZHJlbltpXTtcclxuICAgICAgICAgICAgbGV0IG1vbnN0ZXJUUyA9IG1vbnN0ZXIuZ2V0Q29tcG9uZW50KE1vbnN0ZXIpO1xyXG4gICAgICAgICAgICBpZiAobW9uc3RlclRTICYmIG1vbnN0ZXJUUy5nZXRJc0NhbkNoZWNrKCkpIHtcclxuICAgICAgICAgICAgICAgIC8v5YWI5Yik5pat5piv5ZCm5Zyo5byn5bqm6IyD5Zu05YaFXHJcbiAgICAgICAgICAgICAgICBsZXQgb2Zmc2V0UG9zID0gbW9uc3RlclRTLmdldENlbnRlclBvcygpLnN1Yih0YXJnZXRQb3MpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHJhZGlhbiA9IE1hdGguYXRhbjIob2Zmc2V0UG9zLnksIG9mZnNldFBvcy54KTtcclxuICAgICAgICAgICAgICAgIHJhZGlhbiA9IChwMiArIHJhZGlhbikgJSBwMlxyXG4gICAgICAgICAgICAgICAgLy8gbGV0IGFuZ2xlPU15VG9vbC5yYWRpYW5Ub0FuZ2xlKHJhZGlhbik7XHJcbiAgICAgICAgICAgICAgICAvLyBjYy5sb2coYW5nbGUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJhZGlhbiA+PSBtaW5SYWRpYW4gJiYgcmFkaWFuIDw9IG1heFJhZGlhbikge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkaXN0YW5jZSA9IG9mZnNldFBvcy5tYWcoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGlzdGFuY2UgPD0gcmFkaXVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dE1vbnN0ZXJzLnB1c2gobW9uc3Rlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChhdHRNb25zdGVycy5sZW5ndGggPD0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/lsI/kuo4w77yM5Luj6KGo6KaB5omA5pyJXHJcbiAgICAgICAgaWYgKGNoZWFrTnVtIDwgMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gYXR0TW9uc3RlcnM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIC8v5aaC5p6c5qOA5rWL5Yiw55qE5pWw6YeP5rKh5pyJ6KaB5qOA5rWL55qE6YKj5LmI5aSa77yM55u05o6l6L+U5Zue5YWo6YOoLlxyXG4gICAgICAgIC8vIGlmKGNoZWFrTnVtPj1hdHRNb25zdGVycy5sZW5ndGgpXHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgIC8vICAgICByZXR1cm4gYXR0TW9uc3RlcnM7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIC8vMi4x5LyY5YWI5pS75Ye76Lef55uu5qCH5L2N572u5pyA6L+R55qE5Y2V5L2N77yM5oyJ54Wn5LiOcG9z55qE6Led56a75aSn5bCP6L+b6KGM5o6S5YiX77yM5LuO5bCP5Yiw5aSnXHJcbiAgICAgICAgLy8gYXR0TW9uc3RlcnMuc29ydCgoYTpjYy5Ob2RlLGI6Y2MuTm9kZSk9PntcclxuICAgICAgICAvLyAgICAgcmV0dXJuIGEuZ2V0UG9zaXRpb24oKS5zdWIodGFyZ2V0UG9zKS5tYWcoKS1iLmdldFBvc2l0aW9uKCkuc3ViKHRhcmdldFBvcykubWFnKCk7XHJcbiAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgLy8gYXR0TW9uc3RlcnMuc3BsaWNlKGNoZWFrTnVtKTtcclxuICAgICAgICByZXR1cm4gYXR0TW9uc3RlcnM7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ojrflj5bmjIflrprkvY3nva50YXJnZXRQb3PnmoTmjIflrprojIPlm7RmYW53ZWnlhoVjaGVha051beS4quaVjOS6uijmlYzkurrkuJPnlKjvvIzmo4DmtYvpmJ/lj4spXHJcbiAgICBnZXRNb25zdGVyc0Zvck1vbnN0ZXJQb3MoY2hlYWtOdW06IG51bWJlciwgdGFyZ2V0UG9zOiBjYy5WZWMyLCBmYW53ZWk6IG51bWJlcik6IGNjLk5vZGVbXSB7XHJcbiAgICAgICAgaWYgKGNoZWFrTnVtID09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBsZW4gPSB0aGlzLm5vZGUuY2hpbGRyZW5Db3VudDtcclxuICAgICAgICBpZiAobGVuIDw9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vMS7lhYjmo4DmtYvlnKjmlLvlh7vojIPlm7TlhoXnrKblkIjmlLvlh7vljZXkvY3nmoTmlYzkurpcclxuICAgICAgICBsZXQgYXR0TW9uc3RlcnM6IGNjLk5vZGVbXSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG1vbnN0ZXIgPSB0aGlzLm5vZGUuY2hpbGRyZW5baV07XHJcbiAgICAgICAgICAgIGxldCBtb25zdGVyVFMgPSBtb25zdGVyLmdldENvbXBvbmVudChNb25zdGVyKTtcclxuICAgICAgICAgICAgaWYgKG1vbnN0ZXJUUyAmJiAhbW9uc3RlclRTLmdldElzRGllKCkpIHtcclxuICAgICAgICAgICAgICAgIGxldCBkaXN0YW5jZSA9IHRhcmdldFBvcy5zdWIobW9uc3Rlci5nZXRQb3NpdGlvbigpKS5tYWcoKTtcclxuICAgICAgICAgICAgICAgIGlmIChkaXN0YW5jZSA8PSBmYW53ZWkpIHtcclxuICAgICAgICAgICAgICAgICAgICBhdHRNb25zdGVycy5wdXNoKG1vbnN0ZXIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChhdHRNb25zdGVycy5sZW5ndGggPD0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/lsI/kuo4w77yM5Luj6KGo6KaB5omA5pyJXHJcbiAgICAgICAgaWYgKGNoZWFrTnVtIDwgMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gYXR0TW9uc3RlcnM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5aaC5p6c5qOA5rWL5Yiw55qE5pWw6YeP5rKh5pyJ6KaB5qOA5rWL55qE6YKj5LmI5aSa77yM55u05o6l6L+U5Zue5YWo6YOoLlxyXG4gICAgICAgIGlmIChjaGVha051bSA+PSBhdHRNb25zdGVycy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGF0dE1vbnN0ZXJzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBhdHRNb25zdGVycy5zcGxpY2UoY2hlYWtOdW0pO1xyXG4gICAgICAgIHJldHVybiBhdHRNb25zdGVycztcclxuICAgIH1cclxuICAgIC8qKuaYr+WQpuacieaVjOS6uuWcqOWfjuWimWNoZWNrRGlzdGFuY2Xot53nprvlhoUgKi9cclxuICAgIGNoZWNrV2FsbE1vbnN0ZXIoY2hlY2tEaXN0YW5jZTogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IGxlbiA9IHRoaXMubm9kZS5jaGlsZHJlbkNvdW50O1xyXG4gICAgICAgIGxldCB3YWxsWSA9IEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW5lbXlfYXR0X3k7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgbW9uc3RlciA9IHRoaXMubm9kZS5jaGlsZHJlbltpXTtcclxuICAgICAgICAgICAgbGV0IG1vbnN0ZXJUUyA9IG1vbnN0ZXIuZ2V0Q29tcG9uZW50KE1vbnN0ZXIpO1xyXG4gICAgICAgICAgICBpZiAobW9uc3RlclRTICYmICFtb25zdGVyVFMuZ2V0SXNEaWUoKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRpc3RhbmNlID0gTWF0aC5hYnMod2FsbFkgLSBtb25zdGVyLnkpXHJcbiAgICAgICAgICAgICAgICBpZiAoZGlzdGFuY2UgPD0gY2hlY2tEaXN0YW5jZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIG9uQWxsQmFjaygpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGxhdGVVcGRhdGUoZHQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucHJldl91dWlkID0gXCJcIjtcclxuICAgIH1cclxufVxyXG4iXX0=