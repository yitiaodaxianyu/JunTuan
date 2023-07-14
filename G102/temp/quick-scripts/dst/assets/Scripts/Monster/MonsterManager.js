
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
        if (this.killed_monster_num >= this.total_monster_num) {
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
    MonsterManager.prototype.getMonstersForNearest = function (cheakNum, targetPos, fanwei) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTW9uc3RlclxcTW9uc3Rlck1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMENBQWlEO0FBQ2pELGlFQUE4RTtBQUM5RSw4Q0FBeUM7QUFDekMsbURBQThDO0FBQzlDLDBEQUFxRDtBQUNyRCw0REFBa0U7QUFDbEUscUNBQWdDO0FBQ2hDLDZDQUE2QztBQUM3Qyx1REFBa0Q7QUFDbEQsc0RBQXlEO0FBRXpELG9EQUFtRDtBQUk3QyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUE0QyxrQ0FBVztJQUF2RDtRQUFBLHFFQTBzQkM7UUF4c0JHLGdCQUFVLEdBQVMsS0FBSyxDQUFDO1FBQ2pCLFlBQU0sR0FBUSxDQUFDLENBQUM7UUFDeEIsZ0JBQWdCO1FBQ2hCLHVCQUFpQixHQUFRLENBQUMsQ0FBQztRQUMzQixZQUFZO1FBQ1osd0JBQWtCLEdBQVEsQ0FBQyxDQUFDO1FBQzVCLFlBQVk7UUFDWixlQUFTLEdBQVMsSUFBSSxDQUFDO1FBQ3ZCLGNBQVEsR0FBUyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7UUEySHpCLGVBQVMsR0FBUSxFQUFFLENBQUM7O0lBcWtCeEIsQ0FBQzt1QkExc0JvQixjQUFjO0lBZWpCLDBCQUFXLEdBQXpCO1FBRUksT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFFRCwrQkFBTSxHQUFOO1FBQ0ksZ0JBQWMsQ0FBQyxTQUFTLEdBQUMsSUFBSSxDQUFDO1FBQzlCLElBQUksQ0FBQyxTQUFTLEdBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQzNDLElBQUksT0FBTyxHQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsdUNBQXVDLENBQUMsQ0FBQztRQUM3RCxJQUFJLFFBQVEsR0FBQyxPQUFP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QTFzQjJDLHFCQUFXLEdBMHNCdEQ7a0JBMXNCb0IsY0FBYyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdhbWVNb2RlLCBJc0RlYnVnIH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBHYW1lRWZmZWN0SWQsIEdhbWVFZmZlY3RzTWFuYWdlciB9IGZyb20gXCIuLi9HYW1lL0dhbWVFZmZlY3RzTWFuYWdlclwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCBNYXBOb2RlUG9vbCBmcm9tIFwiLi4vR2FtZS9NYXBOb2RlUG9vbFwiO1xyXG5pbXBvcnQgeyBTb3VuZEluZGV4IH0gZnJvbSBcIi4uL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IE1vbnN0ZXJDb25maWd1cmVNYW5hZ2VyIH0gZnJvbSBcIi4vRGF0YS9Nb25zdGVyQ29uZmlndXJlXCI7XHJcbmltcG9ydCBNb25zdGVyIGZyb20gXCIuL01vbnN0ZXJcIjtcclxuaW1wb3J0IHsgU3RyZW5ndGhUeXBlIH0gZnJvbSBcIi4vTW9uc3RlckRhdGFcIjtcclxuaW1wb3J0IEdyb3VuZE1hbmFnZXIgZnJvbSBcIi4uL0dhbWUvR3JvdW5kTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBCaW5nTnZXYWxsRGF0YSB9IGZyb20gXCIuLi9IZXJvL0dhbWUvSGVyb0NvbmZpZ1wiO1xyXG5pbXBvcnQgeyBKc29uTW9uc3Rlckdyb3d0aEF0dHJpYnV0ZXMgfSBmcm9tIFwiLi9EYXRhL01vbnN0ZXJHcm93dGhBdHRyaWJ1dGVzXCI7XHJcbmltcG9ydCB7IEVuZW15X1N0YXRlIH0gZnJvbSBcIi4uL0VuZW15L0VuZW15Q29uZmlnXCI7XHJcblxyXG5cclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9uc3Rlck1hbmFnZXIgZXh0ZW5kcyBNYXBOb2RlUG9vbCB7XHJcblxyXG4gICAgaXNfbG9hZF9vazpib29sZWFuPWZhbHNlO1xyXG4gICAgcHJpdmF0ZSBva19udW06bnVtYmVyPTA7XHJcbiAgICAvKirlvZPliY3lhbPmgLvlhbHmnInlpJrlsJHmlYzkurogKi9cclxuICAgIHRvdGFsX21vbnN0ZXJfbnVtOm51bWJlcj0wO1xyXG4gICAgLyoq5Ye75p2A5oCq54mp5pWw6YePICovXHJcbiAgICBraWxsZWRfbW9uc3Rlcl9udW06bnVtYmVyPTA7XHJcbiAgICAvKirliankvZnmgKrnianmlbDph48gKi9cclxuICAgIGRyb3Bfcm9vdDpjYy5Ob2RlPW51bGw7XHJcbiAgICBjb2luX3BvczpjYy5WZWMyPWNjLnYyKCk7XHJcbiAgICBcclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogTW9uc3Rlck1hbmFnZXIgPSBudWxsO1xyXG5cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6TW9uc3Rlck1hbmFnZXJcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgICBNb25zdGVyTWFuYWdlci5faW5zdGFuY2U9dGhpcztcclxuICAgICAgICB0aGlzLmRyb3Bfcm9vdD1jYy5maW5kKCdDYW52YXMvRHJvcF9Sb290Jyk7XHJcbiAgICAgICAgbGV0IGljb25CYWc9Y2MuZmluZCgnQ2FudmFzL1VpX1Jvb3QvdG9wX3VpL2ljb25CZy9pY29uQ29pbicpO1xyXG4gICAgICAgIGxldCB3b3JsZFBvcz1pY29uQmFnLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoaWNvbkJhZy5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICB0aGlzLmNvaW5fcG9zPXRoaXMuZHJvcF9yb290LmNvbnZlcnRUb05vZGVTcGFjZUFSKHdvcmxkUG9zKTtcclxuICAgICAgICBzdXBlci5vbkxvYWQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgc3RhcnQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5sb2FkRGF0YSgpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRGVzdHJveSgpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIub25EZXN0cm95KCk7XHJcbiAgICAgICAgTW9uc3Rlck1hbmFnZXIuX2luc3RhbmNlPW51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLy/liqDovb3lvZPliY3lhbPljaHkvJrlh7rnjrDnmoTmgKrnialcclxuICAgIGxvYWREYXRhKCl7XHJcbiAgICAgICAgdGhpcy5pc19sb2FkX29rPWZhbHNlO1xyXG4gICAgICAgIHRoaXMub2tfbnVtPTA7XHJcbiAgICAgICAgbGV0IGZpZ2h0aW5nSW5mbz1HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmZpZ2h0aW5nX2luZm87XHJcbiAgICAgICAgdGhpcy5raWxsZWRfbW9uc3Rlcl9udW09MDtcclxuICAgICAgICB0aGlzLnRvdGFsX21vbnN0ZXJfbnVtPWZpZ2h0aW5nSW5mby50b3RhbF9tb25zdGVyX251bTtcclxuICAgICAgICB0aGlzLnByZXZfdXVpZD1cIlwiO1xyXG4gICAgICAgIC8v5oCq54mpaWTmlbDnu4RcclxuICAgICAgICBsZXQgbW9uc3RlckRhdGFNYXA9ZmlnaHRpbmdJbmZvLmdldE9ubHlNb25zdGVyVHlwZU1hcCgpO1xyXG4gICAgICAgIC8vbGV0IE1TTT1Nb25zdGVyQ29uZmlndXJlTWFuYWdlci5nZXRJbnN0YW5jZSgpOyAgICAgICAgXHJcbiAgICAgICAgbGV0IGxlbiA9IG1vbnN0ZXJEYXRhTWFwLnNpemU7XHJcbiAgICAgICAgbGV0IGJvc3NMb2FkTnVtPTA7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCIrKysrKysrKytcIixtb25zdGVyRGF0YU1hcClcclxuICAgICAgICBtb25zdGVyRGF0YU1hcC5mb3JFYWNoKCh2LGspPT57XHJcbiAgICAgICAgICAgIHN1cGVyLmFkZE5vZGVQb29sKGssJ21vbnN0ZXIvTW9uc3Rlcl8nK2ssNCwobm9kZTpjYy5Ob2RlKT0+eyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMub2tfbnVtKys7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5va19udW0+PWxlbiAmJiBib3NzTG9hZE51bTw9MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc19sb2FkX29rPXRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZih2PT1TdHJlbmd0aFR5cGUuQm9zcyl7XHJcbiAgICAgICAgICAgICAgICBpZihHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRFZmZlY3RQb29sQnlJZChHYW1lRWZmZWN0SWQuYm9zc19ocCwxLCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgYm9zc0xvYWROdW0tLTtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLm9rX251bT49bGVuICYmIGJvc3NMb2FkTnVtPD0wKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc19sb2FkX29rPXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSkpe1xyXG4gICAgICAgICAgICAgICAgICAgIGJvc3NMb2FkTnVtKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZihHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRFZmZlY3RQb29sQnlJZChHYW1lRWZmZWN0SWQuYm9zc19jb21pbmcsMSwoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGJvc3NMb2FkTnVtLS07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5va19udW0+PWxlbiAmJiBib3NzTG9hZE51bTw9MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNfbG9hZF9vaz10cnVlOyAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSkpe1xyXG4gICAgICAgICAgICAgICAgICAgIGJvc3NMb2FkTnVtKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEVmZmVjdFBvb2xCeUlkKEdhbWVFZmZlY3RJZC5kcm9wX2NvaW4sMTYpO1xyXG4gICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEVmZmVjdFBvb2xCeUlkKEdhbWVFZmZlY3RJZC5kcm9wX2dlbSwxNik7XHJcbiAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRWZmZWN0UG9vbEJ5SWQoR2FtZUVmZmVjdElkLmRyb3BfZ2VtX3NoYWRvdywxNik7XHJcbiAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRWZmZWN0UG9vbEJ5SWQoR2FtZUVmZmVjdElkLmRyb3BfY29pbl9zaGFkb3csMTYpO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZE1vbnN0ZXJQb29sKGlkOm51bWJlcixpbml0Q291bnQ6bnVtYmVyLGxvYWRDYWxsYmFjaz86RnVuY3Rpb24pe1xyXG4gICAgICAgIGxldCBNU009TW9uc3RlckNvbmZpZ3VyZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBsZXQganNvbkRhdGE9TVNNLmdldEpzb25Nb25zdGVyQ29uZmlndXJlKGlkKTtcclxuICAgICAgICBsZXQgdHlwZT1qc29uRGF0YS5Nb25zdGVyQ2xhc3M7XHJcbiAgICAgICAgc3VwZXIuYWRkTm9kZVBvb2wodHlwZSwnbW9uc3Rlci9Nb25zdGVyXycrdHlwZSxpbml0Q291bnQsbG9hZENhbGxiYWNrKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5qC55o2u5oCq54mpaWTliJvlu7rkuIDkuKrmlYzkurpcclxuICAgICAqIEBwYXJhbSBpZCDmgKrnialpZFxyXG4gICAgICogQHBhcmFtIHBvcyDnlJ/miJDkvY3nva5cclxuICAgICAqIEBwYXJhbSBsZXZlbCDmgKrniannrYnnuqdcclxuICAgICAqIEBwYXJhbSBocFJhdGUg6KGA6YeP5q+U546HXHJcbiAgICAgKiBAcGFyYW0gaXNDYW5Db3VudCDmmK/lkKblj6/ku6XorqHmlbDvvIjnlKjkuo7ljLrliIblj6zllKTnianvvIlcclxuICAgICAqIEByZXR1cm5zIFxyXG4gICAgICovXHJcbiAgICBjcmVhdGVNb25zdGVyQnlJZChpZDpudW1iZXIscG9zOmNjLlZlYzIsbGV2ZWw6bnVtYmVyLGhwUmF0ZTpudW1iZXIsaXNDYW5Db3VudDpib29sZWFuPXRydWUpOmNjLk5vZGVcclxuICAgIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIl9fX19fX19cIixwb3MueCxwb3MueSlcclxuICAgICAgICBsZXQgdHlwZT1Nb25zdGVyQ29uZmlndXJlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1vbnN0ZXJDbGFzcyhpZCk7XHJcbiAgICAgICAgbGV0IG5vZGU9c3VwZXIuZ2V0Tm9kZUJ5SWQodHlwZSk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgIG5vZGUuc2V0UG9zaXRpb24ocG9zKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChNb25zdGVyKS5pbml0KGlkLGxldmVsLGhwUmF0ZSxpc0NhbkNvdW50KTsgICAgICAgIFxyXG4gICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBib3Nz5Yib5bu65Y+s5ZSk54mpXHJcbiAgICAgKiBAcGFyYW0gbW9uc3RlcklkIOaAqueJqWlkXHJcbiAgICAgKiBAcGFyYW0gcG9zIOeUn+aIkOS9jee9rlxyXG4gICAgICogQHBhcmFtIGJvc3NBdHRyaWJ1dGUgYm9zc+eahOWxnuaAp1xyXG4gICAgICogQHJldHVybnMgXHJcbiAgICAgKi9cclxuICAgIGNyZWF0ZVN1bW1vbk1vbnN0ZXIobW9uc3RlcklkOiBudW1iZXIsbGV2ZWw6bnVtYmVyLHBvczpjYy5WZWMyKXsgICAgICAgIFxyXG4gICAgICAgIC8v5Y+s5ZSk54m55pWIXHJcbiAgICAgICAgbGV0IHF1YW49R3JvdW5kTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5tb25zdGVyX3poYW9odWFuLHBvcyk7XHJcbiAgICAgICAgbGV0IHNwaW5lPXF1YW4uZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcclxuICAgICAgICBsZXQgdHJhY2s9c3BpbmUuc2V0QW5pbWF0aW9uKDAsXCJCb3NzMTBfU2tpbGwyX1poYW9IdWFuXzJcIixmYWxzZSk7XHJcbiAgICAgICAgc3BpbmUuc2V0VHJhY2tFdmVudExpc3RlbmVyKHRyYWNrLChlbnRyeTogc3Auc3BpbmUuVHJhY2tFbnRyeSwgZXZlbnQpID0+e1xyXG4gICAgICAgICAgICBpZihldmVudC5kYXRhLm5hbWU9PVwiWmhhb0h1YW5cIil7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZU1vbnN0ZXJCeUlkKG1vbnN0ZXJJZCxwb3MsbGV2ZWwsMSxmYWxzZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgc3BpbmUuc2V0Q29tcGxldGVMaXN0ZW5lcigoKT0+e1xyXG4gICAgICAgICAgICBzcGluZS5zZXRDb21wbGV0ZUxpc3RlbmVyKG51bGwpO1xyXG4gICAgICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5kZXN0cm95R2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLm1vbnN0ZXJfemhhb2h1YW4scXVhbik7XHJcbiAgICAgICAgfSk7ICAgICAgICBcclxuICAgIH1cclxuICAgIHByZXZfdXVpZDpzdHJpbmc9XCJcIjtcclxuICAgIC8qKuWNs+WwhuWIoOmZpOaVjOS6uu+8jOWPr+S7peWcqOatpOaSreaUvumfs+aViCAqL1xyXG4gICAgd2lsbERlc3Ryb3lNb25zdGVyKG1vbnN0ZXJUczpNb25zdGVyKTpib29sZWFuXHJcbiAgICB7XHJcbiAgICAgICAgLy/mmK/lkKbopoHov5DooYzliqjkvZzlkI7lho3plIDmr4FcclxuICAgICAgICBsZXQgaXNBY3Rpb25EaWU9dHJ1ZTtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguWVhfU2hvdWppKTtcclxuICAgICAgICAvL+eIhumHkeW4gVxyXG4gICAgICAgIGxldCBwb3M9bW9uc3RlclRzLm5vZGUuZ2V0UG9zaXRpb24oKTtcclxuICAgICAgICBpZihHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX21vZGU9PUdhbWVNb2RlLk1haW4pe1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZURyb3BQcm9wKHBvcyxHYW1lRWZmZWN0SWQuZHJvcF9jb2luKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVEcm9wUHJvcChwb3MsR2FtZUVmZmVjdElkLmRyb3BfY29pbik7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlRHJvcFByb3AocG9zLEdhbWVFZmZlY3RJZC5kcm9wX2dlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpc0FjdGlvbkRpZTtcclxuICAgIH1cclxuICAgIC8qKuWbnuaUtuaVjOS6uuWIsOWvueixoeaxoCAqL1xyXG4gICAgZGVzdHJveU1vbnN0ZXIobm9kZTpjYy5Ob2RlLHR5cGU6bnVtYmVyLGlzQ2FuV2luOmJvb2xlYW49dHJ1ZSlcclxuICAgIHtcclxuICAgICAgICBub2RlLmNvbG9yPWNjLkNvbG9yLldISVRFO1xyXG4gICAgICAgIGxldCBtb25zdGVyVHM9bm9kZS5nZXRDb21wb25lbnQoTW9uc3Rlcik7XHJcbiAgICAgICAgbW9uc3RlclRzLnNldEVuZW15U3RhdGUoRW5lbXlfU3RhdGUuZGllKTtcclxuICAgICAgICAvL+imgeWMuuWIhuWPrOWUpOaAqlxyXG4gICAgICAgIGlmKG1vbnN0ZXJUcy5pc19jYW5fY291bnQpe1xyXG4gICAgICAgICAgICBpZihtb25zdGVyVHMudXVpZD09dGhpcy5wcmV2X3V1aWQpe1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmVycm9yKFwi5Y+v6IO96YeN5aSN6K6h5pWw5LqGOlwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnByZXZfdXVpZD1tb25zdGVyVHMudXVpZDsgICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5raWxsZWRfbW9uc3Rlcl9udW0rKztcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5vbkVuZW15RGllKG1vbnN0ZXJUcy5zY29yZSxtb25zdGVyVHMuaXNfY2FuX2NvdW50KTsgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5raWxsZWRfbW9uc3Rlcl9udW0+PXRoaXMudG90YWxfbW9uc3Rlcl9udW0pe1xyXG4gICAgICAgICAgICBpZihpc0Nhbldpbil7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmdldFJlbWFpbk1vbnN0ZXIoKTw9MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93R2FtZVdpbigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIC8v5Zue5pS25YmN5qCH6K6w5Y+v5LulXHJcbiAgICAgICAgLy8gaWYobW9uc3RlclRzKXtcclxuICAgICAgICAvLyAgICAgbW9uc3RlclRzLnNldElzQ2FuQ291bnQodHJ1ZSk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgICBcclxuICAgICAgICBzdXBlci5kZXN0cm95Tm9kZSh0eXBlLG5vZGUpOyAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRSZW1haW5Nb25zdGVyKCk6bnVtYmVye1xyXG4gICAgICAgIGxldCBudW09MDtcclxuICAgICAgICBsZXQgbGVuPXRoaXMubm9kZS5jaGlsZHJlbkNvdW50OyBcclxuICAgICAgICBmb3IobGV0IGk9MDtpPGxlbjsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IG1vbnN0ZXI9dGhpcy5ub2RlLmNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICBsZXQgbW9uc3RlclRTPW1vbnN0ZXIuZ2V0Q29tcG9uZW50KE1vbnN0ZXIpO1xyXG4gICAgICAgICAgICBpZihtb25zdGVyVFMmJm1vbnN0ZXJUUy5nZXRJc0RpZSgpPT1mYWxzZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbnVtKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVEcm9wUHJvcChwb3M6Y2MuVmVjMixpZDpHYW1lRWZmZWN0SWQpeyAgICAgICAgXHJcbiAgICAgICAgbGV0IHByb3A9R3JvdW5kTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKGlkLHBvcywyKTtcclxuICAgICAgICAvL3RoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZT1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNwQnlQcm9wSWQoUHJvcElkLkNvaW4pO1xyXG4gICAgICAgIHByb3Aub3BhY2l0eT0yNTU7XHJcbiAgICAgICAgLy9wcm9wLnNjYWxlPTAuNTtcclxuICAgICAgICBsZXQgeHg9TWF0aC5yYW5kb20oKSoyMCszMDtcclxuICAgICAgICB4eCo9TWF0aC5yYW5kb20oKTwwLjU/MTotMTtcclxuICAgICAgICBsZXQgeXk9TWF0aC5yYW5kb20oKSo0MC0yMDtcclxuICAgICAgICBsZXQgaGVpZ2h0PU1hdGgucmFuZG9tKCkqMjArMzA7XHJcbiAgICAgICAgLy8gY2MudHdlZW4ocHJvcCkudGhlbihjYy5qdW1wQnkoMC41LHh4LHl5LGhlaWdodCwxKSkuZGVsYXkoMSkuY2FsbCgoKT0+e1xyXG4gICAgICAgIC8vICAgICBwcm9wLnBhcmVudD1VSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5ub2RlO1xyXG4gICAgICAgIC8vIH0pLnRoZW4oTXlUb29sLmdldEJlemllckFjdChwcm9wLmdldFBvc2l0aW9uKCksdGhpcy5jb2luX3BvcykpLmNhbGwoKCk9PntcclxuICAgICAgICAvLyAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZGVzdHJveUdhbWVFZmZlY3RCeUlkKGlkLHByb3ApO1xyXG4gICAgICAgIC8vICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdhbWUuc2hvd0NvaW4oKTtcclxuICAgICAgICAvLyB9KS5zdGFydCgpO1xyXG5cclxuICAgICAgICBjYy50d2Vlbihwcm9wKS50aGVuKGNjLmp1bXBCeSgwLjUseHgseXksaGVpZ2h0LDEpKVxyXG4gICAgICAgIC8vIC5jYWxsKCgpPT57XHJcbiAgICAgICAgLy8gICAgIC8v55Sf5oiQ6Zi05b2xXHJcbiAgICAgICAgLy8gICAgIGxldCBzaGFkb3dJZD1HYW1lRWZmZWN0SWQuZHJvcF9nZW07XHJcbiAgICAgICAgLy8gICAgIGxldCBkaXN0WFg9MDtcclxuICAgICAgICAvLyAgICAgbGV0IGRpc3RZWT0wO1xyXG4gICAgICAgIC8vICAgICBzd2l0Y2goaWQpe1xyXG4gICAgICAgIC8vICAgICAgICAgY2FzZSBHYW1lRWZmZWN0SWQuZHJvcF9jb2luOnsgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIC8vICAgICAgICAgICAgIGRpc3RYWD1wcm9wLng7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgZGlzdFlZPXByb3AueS05LjU7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgc2hhZG93SWQ9R2FtZUVmZmVjdElkLmRyb3BfY29pbl9zaGFkb3c7XHJcbiAgICAgICAgLy8gICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgLy8gICAgICAgICBjYXNlIEdhbWVFZmZlY3RJZC5kcm9wX2dlbTp7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgc2hhZG93SWQ9R2FtZUVmZmVjdElkLmRyb3BfZ2VtX3NoYWRvdztcclxuICAgICAgICAvLyAgICAgICAgICAgICBkaXN0WFg9cHJvcC54KzE7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgZGlzdFlZPXByb3AueS0xMDtcclxuICAgICAgICAvLyAgICAgICAgIH1icmVhaztcclxuICAgICAgICAvLyAgICAgfSAgICAgICAgICAgXHJcbiAgICAgICAgLy8gICAgIGxldCBzaGFkb3c9R3JvdW5kTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKHNoYWRvd0lkLGNjLnYyKGRpc3RYWCxkaXN0WVkpLDEpO1xyXG4gICAgICAgIC8vICAgICBzaGFkb3cub3BhY2l0eT0xMDA7XHJcbiAgICAgICAgLy8gICAgIGNjLnR3ZWVuKHNoYWRvdykuZGVsYXkoMTApLnRvKDAuNSx7b3BhY2l0eTowfSkuY2FsbCgoKT0+e1xyXG4gICAgICAgIC8vICAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZGVzdHJveUdhbWVFZmZlY3RCeUlkKHNoYWRvd0lkLHNoYWRvdyk7XHJcbiAgICAgICAgLy8gICAgIH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgLy8gfSlcclxuICAgICAgICAuZGVsYXkoMTApLnRvKDAuNSx7b3BhY2l0eTowfSkuY2FsbCgoKT0+e1xyXG4gICAgICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5kZXN0cm95R2FtZUVmZmVjdEJ5SWQoaWQscHJvcCk7XHJcbiAgICAgICAgfSkuc3RhcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBkZXN0cm95QWxsRHJvcCgpe1xyXG4gICAgICAgIGxldCBkcm9wcz10aGlzLmRyb3Bfcm9vdC5jaGlsZHJlbjtcclxuICAgICAgICBsZXQgbGVuPWRyb3BzLmxlbmd0aDtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTxsZW47IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBwcm9wPWRyb3BzW2ldO1xyXG4gICAgICAgICAgICBsZXQgaWQ9cGFyc2VJbnQocHJvcC5uYW1lKTtcclxuICAgICAgICAgICAgaWYoaWQpe1xyXG4gICAgICAgICAgICAgICAgY2MudHdlZW4ocHJvcCkudG8oMC41LHtvcGFjaXR5OjB9KS5jYWxsKCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZGVzdHJveUdhbWVFZmZlY3RCeUlkKGlkLHByb3ApO1xyXG4gICAgICAgICAgICAgICAgfSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZGVzdHJveUFsbE1vbnN0ZXIoKXtcclxuICAgICAgICBsZXQgYWxsTW9uc3Rlcj10aGlzLm5vZGUuY2hpbGRyZW47XHJcbiAgICAgICAgbGV0IGxlbj1hbGxNb25zdGVyLmxlbmd0aDtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTxsZW47IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBtb25zdGVyPWFsbE1vbnN0ZXJbaV07XHJcbiAgICAgICAgICAgIGlmKG1vbnN0ZXIpe1xyXG4gICAgICAgICAgICAgICAgbGV0IG1vbnN0ZXJUUz1tb25zdGVyLmdldENvbXBvbmVudChNb25zdGVyKTtcclxuICAgICAgICAgICAgICAgIGlmKG1vbnN0ZXJUUylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlc3Ryb3lNb25zdGVyKG1vbnN0ZXIsbW9uc3RlclRTLm1vbnN0ZXJfdHlwZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUdFVC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluaMh+WumuS9jee9rnRhcmdldFBvc+eahOaMh+WumuiMg+WbtGZhbndlaeWGhemdoOi/keWfjuWimeacgOi/keeahGNoZWFrTnVt5Liq5pWM5Lq6XHJcbiAgICAgKiBAcGFyYW0gY2hlYWtOdW0g5qOA5rWL5pWw6YePXHJcbiAgICAgKiBAcGFyYW0gdGFyZ2V0UG9zIOaMh+WumueahOS9jee9ru+8jOS4gOiIrOaYr+iHqui6q+S9jee9rlxyXG4gICAgICogQHBhcmFtIGZhbndlaSDmjIflrprnmoTmo4DmtYvojIPlm7TvvIzkuIDoiKzmmK/mlLvlh7vot53nprtcclxuICAgICAqIEByZXR1cm5zIOaJgOaciea7oei2s+adoeS7tueahOaVjOS6ulxyXG4gICAgICovXHJcbiAgICBnZXRNb25zdGVyc0Zvck5lYXJlc3QoY2hlYWtOdW06bnVtYmVyLHRhcmdldFBvczpjYy5WZWMyLGZhbndlaTpudW1iZXIpOmNjLk5vZGVbXVxyXG4gICAge1xyXG4gICAgICAgIGlmKGNoZWFrTnVtPT0wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBsZW49dGhpcy5ub2RlLmNoaWxkcmVuQ291bnQ7XHJcbiAgICAgICAgaWYobGVuPD0wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vMS7lhYjmo4DmtYvlnKjmlLvlh7vojIPlm7TlhoXnrKblkIjmlLvlh7vljZXkvY3nmoTmlYzkurpcclxuICAgICAgICBsZXQgYXR0TW9uc3RlcnM6Y2MuTm9kZVtdPVtdOyAgICAgICAgXHJcbiAgICAgICAgZm9yKGxldCBpPTA7aTxsZW47IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCBtb25zdGVyPXRoaXMubm9kZS5jaGlsZHJlbltpXTtcclxuICAgICAgICAgICAgbGV0IG1vbnN0ZXJUUz1tb25zdGVyLmdldENvbXBvbmVudChNb25zdGVyKTtcclxuICAgICAgICAgICAgaWYobW9uc3RlclRTICYmIG1vbnN0ZXJUUy5nZXRJc0NhbkNoZWNrKCkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxldCBkaXN0YW5jZT10YXJnZXRQb3Muc3ViKG1vbnN0ZXIuZ2V0UG9zaXRpb24oKSkubWFnKCk7XHJcbiAgICAgICAgICAgICAgICBpZihkaXN0YW5jZTw9ZmFud2VpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGF0dE1vbnN0ZXJzLnB1c2gobW9uc3Rlcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoYXR0TW9uc3RlcnMubGVuZ3RoPD0wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5bCP5LqOMO+8jOS7o+ihqOimgeaJgOaciVxyXG4gICAgICAgIGlmKGNoZWFrTnVtPDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gYXR0TW9uc3RlcnM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGNoZWFrTnVtPj1hdHRNb25zdGVycy5sZW5ndGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gYXR0TW9uc3RlcnM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vMi7lr7nlj6/ku6XmlLvlh7vnmoTmlYzkurrov5vooYzkvJjlhYjnuqfliKTmlq0s6YCJ5Ye6Y2hlYWtOdW3kuKrnm67moIfkvZzkuLrmiZPlh7vljZXkvY1cclxuICAgICAgICAvLzIuMeS8mOWFiOaUu+WHu+i3n+WfjuWimeacgOi/keeahOWNleS9jVxyXG4gICAgICAgIGF0dE1vbnN0ZXJzLnNvcnQoKGE6Y2MuTm9kZSxiOmNjLk5vZGUpPT57XHJcbiAgICAgICAgICAgIHJldHVybiBhLmdldFBvc2l0aW9uKCkuc3ViKHRhcmdldFBvcykubWFnKCktYi5nZXRQb3NpdGlvbigpLnN1Yih0YXJnZXRQb3MpLm1hZygpO1xyXG4gICAgICAgIH0pOyAgICAgICAgXHJcbiAgICAgICAgYXR0TW9uc3RlcnMuc3BsaWNlKGNoZWFrTnVtKTtcclxuICAgICAgICByZXR1cm4gYXR0TW9uc3RlcnM7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluaMh+WumuS9jee9rnRhcmdldFBvc+eahOaMh+WumuiMg+WbtGZhbndlaeWGhemdoOi/keWfjuWimeacgOi/keeahGNoZWFrTnVt5Liq5pWM5Lq6XHJcbiAgICAgKiBAcGFyYW0gY2hlYWtOdW0g5qOA5rWL5pWw6YePXHJcbiAgICAgKiBAcGFyYW0gdGFyZ2V0UG9zIOaMh+WumueahOS9jee9ru+8jOS4gOiIrOaYr+iHqui6q+S9jee9rlxyXG4gICAgICogQHBhcmFtIGZhbndlaSDmjIflrprnmoTmo4DmtYvojIPlm7TvvIzkuIDoiKzmmK/mlLvlh7vot53nprtcclxuICAgICAqIEByZXR1cm5zIOaJgOaciea7oei2s+adoeS7tueahOaVjOS6ulxyXG4gICAgICovXHJcbiAgICAgZ2V0TW9uc3RlcnNGb3JOZWFyZXN0QnlTa2lsbChjaGVha051bTpudW1iZXIsdGFyZ2V0UG9zWTpudW1iZXIsZmFud2VpOm51bWJlcik6Y2MuTm9kZVtdXHJcbiAgICAge1xyXG4gICAgICAgICBpZihjaGVha051bT09MClcclxuICAgICAgICAge1xyXG4gICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgIH1cclxuICAgICAgICAgbGV0IGxlbj10aGlzLm5vZGUuY2hpbGRyZW5Db3VudDtcclxuICAgICAgICAgaWYobGVuPD0wKVxyXG4gICAgICAgICB7XHJcbiAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgfVxyXG4gICAgICAgICAvLzEu5YWI5qOA5rWL5Zyo5pS75Ye76IyD5Zu05YaF56ym5ZCI5pS75Ye75Y2V5L2N55qE5pWM5Lq6XHJcbiAgICAgICAgIGxldCBhdHRNb25zdGVyczpjYy5Ob2RlW109W107ICAgICAgICBcclxuICAgICAgICAgZm9yKGxldCBpPTA7aTxsZW47IGkrKylcclxuICAgICAgICAge1xyXG4gICAgICAgICAgICAgbGV0IG1vbnN0ZXI9dGhpcy5ub2RlLmNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICAgbGV0IG1vbnN0ZXJUUz1tb25zdGVyLmdldENvbXBvbmVudChNb25zdGVyKTtcclxuICAgICAgICAgICAgIGlmKG1vbnN0ZXJUUyAmJiBtb25zdGVyVFMuZ2V0SXNDYW5DaGVjaygpKVxyXG4gICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgIGxldCBkaXN0YW5jZT1tb25zdGVyVFMuZ2V0Q2VudGVyUG9zKCkueS10YXJnZXRQb3NZO1xyXG4gICAgICAgICAgICAgICAgIGlmKGRpc3RhbmNlPD1mYW53ZWkpXHJcbiAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICBhdHRNb25zdGVycy5wdXNoKG1vbnN0ZXIpO1xyXG4gICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIH1cclxuICAgICAgICAgfVxyXG4gICAgICAgICBpZihhdHRNb25zdGVycy5sZW5ndGg8PTApXHJcbiAgICAgICAgIHtcclxuICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICB9XHJcbiAgICAgICAgIC8v5bCP5LqOMO+8jOS7o+ihqOimgeaJgOaciVxyXG4gICAgICAgICBpZihjaGVha051bTwwKVxyXG4gICAgICAgICB7XHJcbiAgICAgICAgICAgICByZXR1cm4gYXR0TW9uc3RlcnM7XHJcbiAgICAgICAgIH1cclxuICAgICAgICAgaWYoY2hlYWtOdW0+PWF0dE1vbnN0ZXJzLmxlbmd0aClcclxuICAgICAgICAge1xyXG4gICAgICAgICAgICAgcmV0dXJuIGF0dE1vbnN0ZXJzO1xyXG4gICAgICAgICB9XHJcbiAgICAgICAgIC8vMi7lr7nlj6/ku6XmlLvlh7vnmoTmlYzkurrov5vooYzkvJjlhYjnuqfliKTmlq0s6YCJ5Ye6Y2hlYWtOdW3kuKrnm67moIfkvZzkuLrmiZPlh7vljZXkvY1cclxuICAgICAgICAgLy8yLjHkvJjlhYjmlLvlh7vot5/ln47lopnmnIDov5HnmoTljZXkvY1cclxuICAgICAgICAgYXR0TW9uc3RlcnMuc29ydCgoYTpjYy5Ob2RlLGI6Y2MuTm9kZSk9PntcclxuICAgICAgICAgICAgIHJldHVybiAoYS55LXRhcmdldFBvc1kpLShiLnktdGFyZ2V0UG9zWSk7XHJcbiAgICAgICAgIH0pOyAgICAgICAgXHJcbiAgICAgICAgIGF0dE1vbnN0ZXJzLnNwbGljZShjaGVha051bSk7XHJcbiAgICAgICAgIHJldHVybiBhdHRNb25zdGVycztcclxuICAgICB9XHJcbiAgICAvKipcclxuICAgICAqIC8v6I635Y+W5oyH5a6a5L2N572udGFyZ2V0UG9z55qE5oyH5a6a6IyD5Zu0ZmFud2Vp5YaFY2hlYWtOdW3kuKrmlYzkurpcclxuICAgICAqIEBwYXJhbSBjaGVha051bSDmo4DmtYvmlbDph4/vvIzlsI/kuo4w6KGo56S65omA5pyJ77yM5aaCLTFcclxuICAgICAqIEBwYXJhbSB0YXJnZXRQb3Mg55uu5qCH5L2N572uXHJcbiAgICAgKiBAcGFyYW0gZmFud2VpIOiMg+WbtFxyXG4gICAgICogQHJldHVybnMg5omA5pyJ56ym5ZCI5p2h5Lu255qE5pWM5Lq6XHJcbiAgICAgKi8gICAgXHJcbiAgICBnZXRNb25zdGVyc0ZvckNlbnRlclBvcyhjaGVha051bTpudW1iZXIsdGFyZ2V0UG9zOmNjLlZlYzIsZmFud2VpOm51bWJlcik6Y2MuTm9kZVtdXHJcbiAgICB7XHJcbiAgICAgICAgaWYoY2hlYWtOdW09PTApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGxlbj10aGlzLm5vZGUuY2hpbGRyZW5Db3VudDtcclxuICAgICAgICBpZihsZW48PTApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8xLuWFiOajgOa1i+WcqOaUu+WHu+iMg+WbtOWGheespuWQiOaUu+WHu+WNleS9jeeahOaVjOS6ulxyXG4gICAgICAgIGxldCBhdHRNb25zdGVyczpjYy5Ob2RlW109W107ICAgICAgICBcclxuICAgICAgICBmb3IobGV0IGk9MDtpPGxlbjsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IG1vbnN0ZXI9dGhpcy5ub2RlLmNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICBsZXQgbW9uc3RlclRTPW1vbnN0ZXIuZ2V0Q29tcG9uZW50KE1vbnN0ZXIpO1xyXG4gICAgICAgICAgICBpZihtb25zdGVyVFMgJiYgbW9uc3RlclRTLmdldElzQ2FuQ2hlY2soKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRpc3RhbmNlPXRhcmdldFBvcy5zdWIobW9uc3RlclRTLmdldENlbnRlclBvcygpKS5tYWcoKTtcclxuICAgICAgICAgICAgICAgIGlmKGRpc3RhbmNlPD1mYW53ZWkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXR0TW9uc3RlcnMucHVzaChtb25zdGVyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihhdHRNb25zdGVycy5sZW5ndGg8PTApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/lsI/kuo4w77yM5Luj6KGo6KaB5omA5pyJXHJcbiAgICAgICAgaWYoY2hlYWtOdW08MClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBhdHRNb25zdGVycztcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/lpoLmnpzmo4DmtYvliLDnmoTmlbDph4/msqHmnInopoHmo4DmtYvnmoTpgqPkuYjlpJrvvIznm7TmjqXov5Tlm57lhajpg6guXHJcbiAgICAgICAgaWYoY2hlYWtOdW0+PWF0dE1vbnN0ZXJzLmxlbmd0aClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBhdHRNb25zdGVycztcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8yLjHkvJjlhYjmlLvlh7vot5/nm67moIfkvY3nva7mnIDov5HnmoTljZXkvY3vvIzmjInnhafkuI5wb3PnmoTot53nprvlpKflsI/ov5vooYzmjpLliJfvvIzku47lsI/liLDlpKdcclxuICAgICAgICBhdHRNb25zdGVycy5zb3J0KChhOmNjLk5vZGUsYjpjYy5Ob2RlKT0+e1xyXG4gICAgICAgICAgICByZXR1cm4gYS5nZXRQb3NpdGlvbigpLnN1Yih0YXJnZXRQb3MpLm1hZygpLWIuZ2V0UG9zaXRpb24oKS5zdWIodGFyZ2V0UG9zKS5tYWcoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBhdHRNb25zdGVycy5zcGxpY2UoY2hlYWtOdW0pO1xyXG4gICAgICAgIHJldHVybiBhdHRNb25zdGVycztcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogLy/ojrflj5bmjIflrprkvY3nva50YXJnZXRQb3PnmoTmjIflrprojIPlm7RmYW53ZWnlhoVjaGVha051beS4quaVjOS6ulxyXG4gICAgICogQHBhcmFtIGNoZWFrTnVtIOajgOa1i+aVsOmHj++8jOWwj+S6jjDooajnpLrmiYDmnInvvIzlpoItMVxyXG4gICAgICogQHBhcmFtIHRhcmdldFBvcyDnm67moIfkvY3nva5cclxuICAgICAqIEBwYXJhbSBmYW53ZWkg6IyD5Zu0XHJcbiAgICAgKiBAcmV0dXJucyDmiYDmnInnrKblkIjmnaHku7bnmoTmlYzkurpcclxuICAgICAqLyAgICBcclxuICAgICBnZXRNb25zdGVyc0ZvckJpbmdOdldhbGxSZWN0KHJlY3Q6Y2MuUmVjdCk6QmluZ052V2FsbERhdGFcclxuICAgICB7XHJcbiAgICAgICAgIGxldCBsZW49dGhpcy5ub2RlLmNoaWxkcmVuQ291bnQ7XHJcbiAgICAgICAgIC8vMS7lhYjmo4DmtYvlnKjmlLvlh7vojIPlm7TlhoXnrKblkIjmlLvlh7vljZXkvY3nmoTmlYzkurpcclxuICAgICAgICAgbGV0IGJud2Q9bmV3IEJpbmdOdldhbGxEYXRhKCk7XHJcbiAgICAgICAgIGxldCBhdHRNb25zdGVyczpjYy5Ob2RlW109W107XHJcbiAgICAgICAgIGZvcihsZXQgaT0wO2k8bGVuOyBpKyspXHJcbiAgICAgICAgIHtcclxuICAgICAgICAgICAgIGxldCBtb25zdGVyPXRoaXMubm9kZS5jaGlsZHJlbltpXTtcclxuICAgICAgICAgICAgIGxldCBtb25zdGVyVFM9bW9uc3Rlci5nZXRDb21wb25lbnQoTW9uc3Rlcik7XHJcbiAgICAgICAgICAgICBpZihtb25zdGVyVFMgJiYgbW9uc3RlclRTLmdldElzQ2FuQ2hlY2soKSlcclxuICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKHJlY3QuY29udGFpbnMobW9uc3Rlci5nZXRQb3NpdGlvbigpKSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhdHRNb25zdGVycy5wdXNoKG1vbnN0ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKG1vbnN0ZXJUUy5nZXRTdHJlbmd0aFR5cGUoKT09U3RyZW5ndGhUeXBlLkJvc3Mpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBibndkLmJvc3NfdHM9bW9uc3RlclRTO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIH1cclxuICAgICAgICAgfVxyXG4gICAgICAgICBibndkLmJhY2tfbW9uc3RlcnM9YXR0TW9uc3RlcnM7XHJcbiAgICAgICAgIHJldHVybiBibndkO1xyXG4gICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog6L+U5Zue55Sf5ZG95YC85pyA6auY55qE5pWM5Lq65bqP5YiXXHJcbiAgICAgKiBAcGFyYW0gY2hlYWtOdW0g5qOA5rWL5pWw6YeP77yM5bCP5LqOMOihqOekuuaJgOacie+8jOWmgi0xXHJcbiAgICAgKiBAcGFyYW0gdGFyZ2V0UG9zIFxyXG4gICAgICogQHBhcmFtIGZhbndlaSBcclxuICAgICAqIEByZXR1cm5zIFxyXG4gICAgICovXHJcbiAgICBnZXRNb25zdGVyc0Zvck1heEhwKGNoZWFrTnVtOm51bWJlcix0YXJnZXRQb3M6Y2MuVmVjMixmYW53ZWk6bnVtYmVyKTpjYy5Ob2RlW11cclxuICAgIHtcclxuICAgICAgICBpZihjaGVha051bT09MClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbGVuPXRoaXMubm9kZS5jaGlsZHJlbkNvdW50O1xyXG4gICAgICAgIGlmKGxlbjw9MClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLzEu5YWI5qOA5rWL5Zyo5pS75Ye76IyD5Zu05YaF56ym5ZCI5pS75Ye75Y2V5L2N55qE5pWM5Lq6XHJcbiAgICAgICAgbGV0IGF0dE1vbnN0ZXJzOmNjLk5vZGVbXT1bXTsgICAgICAgIFxyXG4gICAgICAgIGZvcihsZXQgaT0wO2k8bGVuOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgbW9uc3Rlcj10aGlzLm5vZGUuY2hpbGRyZW5baV07XHJcbiAgICAgICAgICAgIGxldCBtb25zdGVyVFM9bW9uc3Rlci5nZXRDb21wb25lbnQoTW9uc3Rlcik7XHJcbiAgICAgICAgICAgIGlmKG1vbnN0ZXJUUyAmJiBtb25zdGVyVFMuZ2V0SXNDYW5DaGVjaygpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGlzdGFuY2U9dGFyZ2V0UG9zLnN1Yihtb25zdGVyLmdldFBvc2l0aW9uKCkpLm1hZygpO1xyXG4gICAgICAgICAgICAgICAgaWYoZGlzdGFuY2U8PWZhbndlaSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhdHRNb25zdGVycy5wdXNoKG1vbnN0ZXIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGF0dE1vbnN0ZXJzLmxlbmd0aDw9MClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+Wwj+S6jjDvvIzku6PooajopoHmiYDmnIlcclxuICAgICAgICBpZihjaGVha051bTwwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGF0dE1vbnN0ZXJzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihjaGVha051bT49YXR0TW9uc3RlcnMubGVuZ3RoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGF0dE1vbnN0ZXJzO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLzIu5a+55Y+v5Lul5pS75Ye755qE5pWM5Lq66L+b6KGM5LyY5YWI57qn5Yik5patLOmAieWHumNoZWFrTnVt5Liq55uu5qCH5L2c5Li65omT5Ye75Y2V5L2NXHJcbiAgICAgICAgLy8yLjHkvJjlhYjmlLvlh7vot5/ln47lopnmnIDov5HnmoTljZXkvY1cclxuICAgICAgICBhdHRNb25zdGVycy5zb3J0KChhOmNjLk5vZGUsYjpjYy5Ob2RlKT0+e1xyXG4gICAgICAgICAgICByZXR1cm4gYi5nZXRDb21wb25lbnQoTW9uc3RlcikuZ2V0Q3VySHAoKS1hLmdldENvbXBvbmVudChNb25zdGVyKS5nZXRDdXJIcCgpO1xyXG4gICAgICAgIH0pOyAgICAgICAgXHJcbiAgICAgICAgYXR0TW9uc3RlcnMuc3BsaWNlKGNoZWFrTnVtKTsgICAgICAgIFxyXG4gICAgICAgIHJldHVybiBhdHRNb25zdGVycztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOi/lOWbnueUn+WRveWAvOacgOmrmOeahOaVjOS6uuW6j+WIl1xyXG4gICAgICogQHBhcmFtIGNoZWFrTnVtIOajgOa1i+aVsOmHj++8jOWwj+S6jjDooajnpLrmiYDmnInvvIzlpoItMVxyXG4gICAgICogQHBhcmFtIHRhcmdldFBvcyBcclxuICAgICAqIEBwYXJhbSBmYW53ZWkgXHJcbiAgICAgKiBAcmV0dXJucyBcclxuICAgICAqL1xyXG4gICAgIGdldE1vbnN0ZXJzRm9yTWF4QXR0YWsoY2hlYWtOdW06bnVtYmVyLHRhcmdldFBvczpjYy5WZWMyLGZhbndlaTpudW1iZXIpOmNjLk5vZGVbXVxyXG4gICAgIHtcclxuICAgICAgICAgaWYoY2hlYWtOdW09PTApXHJcbiAgICAgICAgIHtcclxuICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICB9XHJcbiAgICAgICAgIGxldCBsZW49dGhpcy5ub2RlLmNoaWxkcmVuQ291bnQ7XHJcbiAgICAgICAgIGlmKGxlbjw9MClcclxuICAgICAgICAge1xyXG4gICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgIH1cclxuICAgICAgICAgLy8xLuWFiOajgOa1i+WcqOaUu+WHu+iMg+WbtOWGheespuWQiOaUu+WHu+WNleS9jeeahOaVjOS6ulxyXG4gICAgICAgICBsZXQgYXR0TW9uc3RlcnM6Y2MuTm9kZVtdPVtdOyAgICAgICAgXHJcbiAgICAgICAgIGZvcihsZXQgaT0wO2k8bGVuOyBpKyspXHJcbiAgICAgICAgIHtcclxuICAgICAgICAgICAgIGxldCBtb25zdGVyPXRoaXMubm9kZS5jaGlsZHJlbltpXTtcclxuICAgICAgICAgICAgIGxldCBtb25zdGVyVFM9bW9uc3Rlci5nZXRDb21wb25lbnQoTW9uc3Rlcik7XHJcbiAgICAgICAgICAgICBpZihtb25zdGVyVFMgJiYgbW9uc3RlclRTLmdldElzQ2FuQ2hlY2soKSlcclxuICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICBsZXQgZGlzdGFuY2U9dGFyZ2V0UG9zLnN1Yihtb25zdGVyLmdldFBvc2l0aW9uKCkpLm1hZygpO1xyXG4gICAgICAgICAgICAgICAgIGlmKGRpc3RhbmNlPD1mYW53ZWkpXHJcbiAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICBhdHRNb25zdGVycy5wdXNoKG1vbnN0ZXIpO1xyXG4gICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIH1cclxuICAgICAgICAgfVxyXG4gICAgICAgICBpZihhdHRNb25zdGVycy5sZW5ndGg8PTApXHJcbiAgICAgICAgIHtcclxuICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICB9XHJcbiAgICAgICAgIC8v5bCP5LqOMO+8jOS7o+ihqOimgeaJgOaciVxyXG4gICAgICAgICBpZihjaGVha051bTwwKVxyXG4gICAgICAgICB7XHJcbiAgICAgICAgICAgICByZXR1cm4gYXR0TW9uc3RlcnM7XHJcbiAgICAgICAgIH1cclxuICAgICAgICAgaWYoY2hlYWtOdW0+PWF0dE1vbnN0ZXJzLmxlbmd0aClcclxuICAgICAgICAge1xyXG4gICAgICAgICAgICAgcmV0dXJuIGF0dE1vbnN0ZXJzO1xyXG4gICAgICAgICB9XHJcbiAgICAgICAgIC8vMi7lr7nlj6/ku6XmlLvlh7vnmoTmlYzkurrov5vooYzkvJjlhYjnuqfliKTmlq0s6YCJ5Ye6Y2hlYWtOdW3kuKrnm67moIfkvZzkuLrmiZPlh7vljZXkvY1cclxuICAgICAgICAgLy8yLjHkvJjlhYjmlLvlh7vot5/ln47lopnmnIDov5HnmoTljZXkvY1cclxuICAgICAgICAgYXR0TW9uc3RlcnMuc29ydCgoYTpjYy5Ob2RlLGI6Y2MuTm9kZSk9PntcclxuICAgICAgICAgICAgIHJldHVybiBiLmdldENvbXBvbmVudChNb25zdGVyKS5nZXRDdXJBdHQoKS1hLmdldENvbXBvbmVudChNb25zdGVyKS5nZXRDdXJBdHQoKTtcclxuICAgICAgICAgfSk7XHJcbiAgICAgICAgIGF0dE1vbnN0ZXJzLnNwbGljZShjaGVha051bSk7XHJcbiAgICAgICAgIHJldHVybiBhdHRNb25zdGVycztcclxuICAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAvL+iOt+WPluaMh+WumuS9jee9rnRhcmdldFBvc+eahOaMh+WumuiMg+WbtGZhbndlaeWGhWNoZWFrTnVt5Liq5pWM5Lq6XHJcbiAgICAgKiBAcGFyYW0gY2hlYWtOdW0g5qOA5rWL5pWw6YeP77yM5bCP5LqOMOihqOekuuaJgOacie+8jOWmgi0xXHJcbiAgICAgKiBAcGFyYW0gdGFyZ2V0UG9zIOebruagh+S9jee9rlxyXG4gICAgICogQHBhcmFtIHJhZGl1cyDojIPlm7TljYrlvoRcclxuICAgICAqIEBwYXJhbSBtaW5SYWRpYW4g5pyA5bCP55qE5byn5bqm5YC8XHJcbiAgICAgKiBAcGFyYW0gbWF4UmFkaWFuIOacgOWkp+eahOW8p+W6puWAvFxyXG4gICAgICogQHJldHVybnMg5omA5pyJ56ym5ZCI5p2h5Lu255qE5pWM5Lq6XHJcbiAgICAgKi8gICAgXHJcbiAgICAgZ2V0TW9uc3RlcnNGb3JSYWRpYW4oY2hlYWtOdW06bnVtYmVyLHRhcmdldFBvczpjYy5WZWMyLHJhZGl1czpudW1iZXIsbWluUmFkaWFuOm51bWJlcixtYXhSYWRpYW46bnVtYmVyKTpjYy5Ob2RlW11cclxuICAgICB7XHJcbiAgICAgICAgaWYoY2hlYWtOdW09PTApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGxlbj10aGlzLm5vZGUuY2hpbGRyZW5Db3VudDtcclxuICAgICAgICBpZihsZW48PTApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHAyPU1hdGguUEkqMjtcclxuICAgICAgICBtaW5SYWRpYW49KHAyK21pblJhZGlhbiklcDJcclxuICAgICAgICBtYXhSYWRpYW49KHAyK21heFJhZGlhbiklcDJcclxuICAgICAgICAvLzEu5YWI5qOA5rWL5Zyo5pS75Ye76IyD5Zu05YaF56ym5ZCI5pS75Ye75Y2V5L2N55qE5pWM5Lq6XHJcbiAgICAgICAgbGV0IGF0dE1vbnN0ZXJzOmNjLk5vZGVbXT1bXTsgICAgICAgIFxyXG4gICAgICAgIGZvcihsZXQgaT0wO2k8bGVuOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgbW9uc3Rlcj10aGlzLm5vZGUuY2hpbGRyZW5baV07XHJcbiAgICAgICAgICAgIGxldCBtb25zdGVyVFM9bW9uc3Rlci5nZXRDb21wb25lbnQoTW9uc3Rlcik7XHJcbiAgICAgICAgICAgIGlmKG1vbnN0ZXJUUyAmJiBtb25zdGVyVFMuZ2V0SXNDYW5DaGVjaygpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvL+WFiOWIpOaWreaYr+WQpuWcqOW8p+W6puiMg+WbtOWGhVxyXG4gICAgICAgICAgICAgICAgbGV0IG9mZnNldFBvcz1tb25zdGVyVFMuZ2V0Q2VudGVyUG9zKCkuc3ViKHRhcmdldFBvcyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmFkaWFuPU1hdGguYXRhbjIob2Zmc2V0UG9zLnksb2Zmc2V0UG9zLngpO1xyXG4gICAgICAgICAgICAgICAgcmFkaWFuPShwMityYWRpYW4pJXAyXHJcbiAgICAgICAgICAgICAgICAvLyBsZXQgYW5nbGU9TXlUb29sLnJhZGlhblRvQW5nbGUocmFkaWFuKTtcclxuICAgICAgICAgICAgICAgIC8vIGNjLmxvZyhhbmdsZSk7XHJcbiAgICAgICAgICAgICAgICBpZihyYWRpYW4+PW1pblJhZGlhbiYmcmFkaWFuPD1tYXhSYWRpYW4pe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkaXN0YW5jZT1vZmZzZXRQb3MubWFnKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZGlzdGFuY2U8PXJhZGl1cylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dE1vbnN0ZXJzLnB1c2gobW9uc3Rlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihhdHRNb25zdGVycy5sZW5ndGg8PTApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/lsI/kuo4w77yM5Luj6KGo6KaB5omA5pyJXHJcbiAgICAgICAgaWYoY2hlYWtOdW08MClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBhdHRNb25zdGVycztcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gLy/lpoLmnpzmo4DmtYvliLDnmoTmlbDph4/msqHmnInopoHmo4DmtYvnmoTpgqPkuYjlpJrvvIznm7TmjqXov5Tlm57lhajpg6guXHJcbiAgICAgICAgLy8gaWYoY2hlYWtOdW0+PWF0dE1vbnN0ZXJzLmxlbmd0aClcclxuICAgICAgICAvLyB7XHJcbiAgICAgICAgLy8gICAgIHJldHVybiBhdHRNb25zdGVycztcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gLy8yLjHkvJjlhYjmlLvlh7vot5/nm67moIfkvY3nva7mnIDov5HnmoTljZXkvY3vvIzmjInnhafkuI5wb3PnmoTot53nprvlpKflsI/ov5vooYzmjpLliJfvvIzku47lsI/liLDlpKdcclxuICAgICAgICAvLyBhdHRNb25zdGVycy5zb3J0KChhOmNjLk5vZGUsYjpjYy5Ob2RlKT0+e1xyXG4gICAgICAgIC8vICAgICByZXR1cm4gYS5nZXRQb3NpdGlvbigpLnN1Yih0YXJnZXRQb3MpLm1hZygpLWIuZ2V0UG9zaXRpb24oKS5zdWIodGFyZ2V0UG9zKS5tYWcoKTtcclxuICAgICAgICAvLyB9KTtcclxuICAgICAgICAvLyBhdHRNb25zdGVycy5zcGxpY2UoY2hlYWtOdW0pO1xyXG4gICAgICAgIHJldHVybiBhdHRNb25zdGVycztcclxuICAgICB9XHJcblxyXG4gICAgLy/ojrflj5bmjIflrprkvY3nva50YXJnZXRQb3PnmoTmjIflrprojIPlm7RmYW53ZWnlhoVjaGVha051beS4quaVjOS6uijmlYzkurrkuJPnlKjvvIzmo4DmtYvpmJ/lj4spXHJcbiAgICBnZXRNb25zdGVyc0Zvck1vbnN0ZXJQb3MoY2hlYWtOdW06bnVtYmVyLHRhcmdldFBvczpjYy5WZWMyLGZhbndlaTpudW1iZXIpOmNjLk5vZGVbXVxyXG4gICAge1xyXG4gICAgICAgIGlmKGNoZWFrTnVtPT0wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBsZW49dGhpcy5ub2RlLmNoaWxkcmVuQ291bnQ7XHJcbiAgICAgICAgaWYobGVuPD0wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vMS7lhYjmo4DmtYvlnKjmlLvlh7vojIPlm7TlhoXnrKblkIjmlLvlh7vljZXkvY3nmoTmlYzkurpcclxuICAgICAgICBsZXQgYXR0TW9uc3RlcnM6Y2MuTm9kZVtdPVtdOyAgICAgICAgXHJcbiAgICAgICAgZm9yKGxldCBpPTA7aTxsZW47IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCBtb25zdGVyPXRoaXMubm9kZS5jaGlsZHJlbltpXTtcclxuICAgICAgICAgICAgbGV0IG1vbnN0ZXJUUz1tb25zdGVyLmdldENvbXBvbmVudChNb25zdGVyKTtcclxuICAgICAgICAgICAgaWYobW9uc3RlclRTICYmICFtb25zdGVyVFMuZ2V0SXNEaWUoKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRpc3RhbmNlPXRhcmdldFBvcy5zdWIobW9uc3Rlci5nZXRQb3NpdGlvbigpKS5tYWcoKTtcclxuICAgICAgICAgICAgICAgIGlmKGRpc3RhbmNlPD1mYW53ZWkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXR0TW9uc3RlcnMucHVzaChtb25zdGVyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihhdHRNb25zdGVycy5sZW5ndGg8PTApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/lsI/kuo4w77yM5Luj6KGo6KaB5omA5pyJXHJcbiAgICAgICAgaWYoY2hlYWtOdW08MClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBhdHRNb25zdGVycztcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/lpoLmnpzmo4DmtYvliLDnmoTmlbDph4/msqHmnInopoHmo4DmtYvnmoTpgqPkuYjlpJrvvIznm7TmjqXov5Tlm57lhajpg6guXHJcbiAgICAgICAgaWYoY2hlYWtOdW0+PWF0dE1vbnN0ZXJzLmxlbmd0aClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBhdHRNb25zdGVycztcclxuICAgICAgICB9XHJcbiAgICAgICAgYXR0TW9uc3RlcnMuc3BsaWNlKGNoZWFrTnVtKTtcclxuICAgICAgICByZXR1cm4gYXR0TW9uc3RlcnM7XHJcbiAgICB9XHJcbiAgICAvKirmmK/lkKbmnInmlYzkurrlnKjln47lopljaGVja0Rpc3RhbmNl6Led56a75YaFICovXHJcbiAgICBjaGVja1dhbGxNb25zdGVyKGNoZWNrRGlzdGFuY2U6bnVtYmVyKTpib29sZWFue1xyXG4gICAgICAgIGxldCBsZW49dGhpcy5ub2RlLmNoaWxkcmVuQ291bnQ7ICAgICAgICBcclxuICAgICAgICBsZXQgd2FsbFk9R2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5lbmVteV9hdHRfeTtcclxuICAgICAgICBmb3IobGV0IGk9MDtpPGxlbjsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IG1vbnN0ZXI9dGhpcy5ub2RlLmNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICBsZXQgbW9uc3RlclRTPW1vbnN0ZXIuZ2V0Q29tcG9uZW50KE1vbnN0ZXIpO1xyXG4gICAgICAgICAgICBpZihtb25zdGVyVFMgJiYgIW1vbnN0ZXJUUy5nZXRJc0RpZSgpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGlzdGFuY2U9TWF0aC5hYnMod2FsbFktbW9uc3Rlci55KVxyXG4gICAgICAgICAgICAgICAgaWYoZGlzdGFuY2U8PWNoZWNrRGlzdGFuY2UpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgb25BbGxCYWNrKClcclxuICAgIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGxhdGVVcGRhdGUoZHQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucHJldl91dWlkPVwiXCI7XHJcbiAgICB9XHJcbn1cclxuIl19