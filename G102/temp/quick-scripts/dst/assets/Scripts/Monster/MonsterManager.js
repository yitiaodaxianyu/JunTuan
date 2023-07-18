
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
                        if (Math.abs(monster.x - GameManager_1.default.getInstance().charPosX) <= 75) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTW9uc3RlclxcTW9uc3Rlck1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMENBQWlEO0FBQ2pELGlFQUE4RTtBQUM5RSw4Q0FBeUM7QUFDekMsbURBQThDO0FBQzlDLDBEQUFxRDtBQUNyRCw0REFBa0U7QUFDbEUscUNBQWdDO0FBQ2hDLDZDQUE2QztBQUM3Qyx1REFBa0Q7QUFDbEQsc0RBQXlEO0FBRXpELG9EQUFtRDtBQUk3QyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUE0QyxrQ0FBVztJQUF2RDtRQUFBLHFFQW1vQkM7UUFqb0JHLGdCQUFVLEdBQVksS0FBSyxDQUFDO1FBQ3BCLFlBQU0sR0FBVyxDQUFDLENBQUM7UUFDM0IsZ0JBQWdCO1FBQ2hCLHVCQUFpQixHQUFXLENBQUMsQ0FBQztRQUM5QixZQUFZO1FBQ1osd0JBQWtCLEdBQVcsQ0FBQyxDQUFDO1FBQy9CLFlBQVk7UUFDWixlQUFTLEdBQVksSUFBSSxDQUFDO1FBQzFCLGNBQVEsR0FBWSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7UUF3SDVCLGVBQVMsR0FBVyxFQUFFLENBQUM7O0lBaWdCM0IsQ0FBQzt1QkFub0JvQixjQUFjO0lBZWpCLDBCQUFXLEdBQXpCO1FBQ0ksT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFFRCwrQkFBTSxHQUFOO1FBQ0ksZ0JBQWMsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQzdDLElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsdUNBQXVDLENBQUMsQ0FBQztRQUMvRCxJQUFJLFFBQVEsR0FBRyxPQUFP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QixPQUFPLElBQUksQ0FBQztpQkFDZjthQUNKO1NBQ0o7UUFDRCxPQUFPLEtBQUssQ0FBQTtJQUNoQixDQUFDO0lBRUQsa0NBQVMsR0FBVDtRQUNJLE9BQU87SUFDWCxDQUFDO0lBRVMsbUNBQVUsR0FBcEIsVUFBcUIsRUFBVTtRQUMzQixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUN4QixDQUFDOztJQXRuQmMsd0JBQVMsR0FBbUIsSUFBSSxDQUFDO0lBWi9CLGNBQWM7UUFEbEMsT0FBTztPQUNhLGNBQWMsQ0Ftb0JsQztJQUFELHFCQUFDO0NBbm9CRCxBQW1vQkMsQ0Fub0IyQyxxQkFBVyxHQW1vQnREO2tCQW5vQm9CLGNBQWMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHYW1lTW9kZSwgSXNEZWJ1ZyB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgR2FtZUVmZmVjdElkLCBHYW1lRWZmZWN0c01hbmFnZXIgfSBmcm9tIFwiLi4vR2FtZS9HYW1lRWZmZWN0c01hbmFnZXJcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgTWFwTm9kZVBvb2wgZnJvbSBcIi4uL0dhbWUvTWFwTm9kZVBvb2xcIjtcclxuaW1wb3J0IHsgU291bmRJbmRleCB9IGZyb20gXCIuLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBNb25zdGVyQ29uZmlndXJlTWFuYWdlciB9IGZyb20gXCIuL0RhdGEvTW9uc3RlckNvbmZpZ3VyZVwiO1xyXG5pbXBvcnQgTW9uc3RlciBmcm9tIFwiLi9Nb25zdGVyXCI7XHJcbmltcG9ydCB7IFN0cmVuZ3RoVHlwZSB9IGZyb20gXCIuL01vbnN0ZXJEYXRhXCI7XHJcbmltcG9ydCBHcm91bmRNYW5hZ2VyIGZyb20gXCIuLi9HYW1lL0dyb3VuZE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgQmluZ052V2FsbERhdGEgfSBmcm9tIFwiLi4vSGVyby9HYW1lL0hlcm9Db25maWdcIjtcclxuaW1wb3J0IHsgSnNvbk1vbnN0ZXJHcm93dGhBdHRyaWJ1dGVzIH0gZnJvbSBcIi4vRGF0YS9Nb25zdGVyR3Jvd3RoQXR0cmlidXRlc1wiO1xyXG5pbXBvcnQgeyBFbmVteV9TdGF0ZSB9IGZyb20gXCIuLi9FbmVteS9FbmVteUNvbmZpZ1wiO1xyXG5cclxuXHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9uc3Rlck1hbmFnZXIgZXh0ZW5kcyBNYXBOb2RlUG9vbCB7XHJcblxyXG4gICAgaXNfbG9hZF9vazogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBva19udW06IG51bWJlciA9IDA7XHJcbiAgICAvKirlvZPliY3lhbPmgLvlhbHmnInlpJrlsJHmlYzkurogKi9cclxuICAgIHRvdGFsX21vbnN0ZXJfbnVtOiBudW1iZXIgPSAwO1xyXG4gICAgLyoq5Ye75p2A5oCq54mp5pWw6YePICovXHJcbiAgICBraWxsZWRfbW9uc3Rlcl9udW06IG51bWJlciA9IDA7XHJcbiAgICAvKirliankvZnmgKrnianmlbDph48gKi9cclxuICAgIGRyb3Bfcm9vdDogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBjb2luX3BvczogY2MuVmVjMiA9IGNjLnYyKCk7XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBNb25zdGVyTWFuYWdlciA9IG51bGw7XHJcblxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogTW9uc3Rlck1hbmFnZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgTW9uc3Rlck1hbmFnZXIuX2luc3RhbmNlID0gdGhpcztcclxuICAgICAgICB0aGlzLmRyb3Bfcm9vdCA9IGNjLmZpbmQoJ0NhbnZhcy9Ecm9wX1Jvb3QnKTtcclxuICAgICAgICBsZXQgaWNvbkJhZyA9IGNjLmZpbmQoJ0NhbnZhcy9VaV9Sb290L3RvcF91aS9pY29uQmcvaWNvbkNvaW4nKTtcclxuICAgICAgICBsZXQgd29ybGRQb3MgPSBpY29uQmFnLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoaWNvbkJhZy5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICB0aGlzLmNvaW5fcG9zID0gdGhpcy5kcm9wX3Jvb3QuY29udmVydFRvTm9kZVNwYWNlQVIod29ybGRQb3MpO1xyXG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBzdGFydCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmxvYWREYXRhKCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25EZXN0cm95KCkge1xyXG4gICAgICAgIHN1cGVyLm9uRGVzdHJveSgpO1xyXG4gICAgICAgIE1vbnN0ZXJNYW5hZ2VyLl9pbnN0YW5jZSA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLy/liqDovb3lvZPliY3lhbPljaHkvJrlh7rnjrDnmoTmgKrnialcclxuICAgIGxvYWREYXRhKCkge1xyXG4gICAgICAgIHRoaXMuaXNfbG9hZF9vayA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMub2tfbnVtID0gMDtcclxuICAgICAgICBsZXQgZmlnaHRpbmdJbmZvID0gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5maWdodGluZ19pbmZvO1xyXG4gICAgICAgIHRoaXMua2lsbGVkX21vbnN0ZXJfbnVtID0gMDtcclxuICAgICAgICB0aGlzLnRvdGFsX21vbnN0ZXJfbnVtID0gZmlnaHRpbmdJbmZvLnRvdGFsX21vbnN0ZXJfbnVtO1xyXG4gICAgICAgIHRoaXMucHJldl91dWlkID0gXCJcIjtcclxuICAgICAgICAvL+aAqueJqWlk5pWw57uEXHJcbiAgICAgICAgbGV0IG1vbnN0ZXJEYXRhTWFwID0gZmlnaHRpbmdJbmZvLmdldE9ubHlNb25zdGVyVHlwZU1hcCgpO1xyXG4gICAgICAgIC8vbGV0IE1TTT1Nb25zdGVyQ29uZmlndXJlTWFuYWdlci5nZXRJbnN0YW5jZSgpOyAgICAgICAgXHJcbiAgICAgICAgbGV0IGxlbiA9IG1vbnN0ZXJEYXRhTWFwLnNpemU7XHJcbiAgICAgICAgbGV0IGJvc3NMb2FkTnVtID0gMDtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIisrKysrKysrK1wiLG1vbnN0ZXJEYXRhTWFwKVxyXG4gICAgICAgIG1vbnN0ZXJEYXRhTWFwLmZvckVhY2goKHYsIGspID0+IHtcclxuICAgICAgICAgICAgc3VwZXIuYWRkTm9kZVBvb2woaywgJ21vbnN0ZXIvTW9uc3Rlcl8nICsgaywgNCwgKG5vZGU6IGNjLk5vZGUpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMub2tfbnVtKys7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub2tfbnVtID49IGxlbiAmJiBib3NzTG9hZE51bSA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc19sb2FkX29rID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmICh2ID09IFN0cmVuZ3RoVHlwZS5Cb3NzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRWZmZWN0UG9vbEJ5SWQoR2FtZUVmZmVjdElkLmJvc3NfaHAsIDEsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBib3NzTG9hZE51bS0tO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm9rX251bSA+PSBsZW4gJiYgYm9zc0xvYWROdW0gPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzX2xvYWRfb2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYm9zc0xvYWROdW0rKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRFZmZlY3RQb29sQnlJZChHYW1lRWZmZWN0SWQuYm9zc19jb21pbmcsIDEsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBib3NzTG9hZE51bS0tO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm9rX251bSA+PSBsZW4gJiYgYm9zc0xvYWROdW0gPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzX2xvYWRfb2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYm9zc0xvYWROdW0rKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRWZmZWN0UG9vbEJ5SWQoR2FtZUVmZmVjdElkLmRyb3BfY29pbiwgMTYpO1xyXG4gICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEVmZmVjdFBvb2xCeUlkKEdhbWVFZmZlY3RJZC5kcm9wX2dlbSwgMTYpO1xyXG4gICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEVmZmVjdFBvb2xCeUlkKEdhbWVFZmZlY3RJZC5kcm9wX2dlbV9zaGFkb3csIDE2KTtcclxuICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRFZmZlY3RQb29sQnlJZChHYW1lRWZmZWN0SWQuZHJvcF9jb2luX3NoYWRvdywgMTYpO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZE1vbnN0ZXJQb29sKGlkOiBudW1iZXIsIGluaXRDb3VudDogbnVtYmVyLCBsb2FkQ2FsbGJhY2s/OiBGdW5jdGlvbikge1xyXG4gICAgICAgIGxldCBNU00gPSBNb25zdGVyQ29uZmlndXJlTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIGxldCBqc29uRGF0YSA9IE1TTS5nZXRKc29uTW9uc3RlckNvbmZpZ3VyZShpZCk7XHJcbiAgICAgICAgbGV0IHR5cGUgPSBqc29uRGF0YS5Nb25zdGVyQ2xhc3M7XHJcbiAgICAgICAgc3VwZXIuYWRkTm9kZVBvb2wodHlwZSwgJ21vbnN0ZXIvTW9uc3Rlcl8nICsgdHlwZSwgaW5pdENvdW50LCBsb2FkQ2FsbGJhY2spO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDmoLnmja7mgKrnialpZOWIm+W7uuS4gOS4quaVjOS6ulxyXG4gICAgICogQHBhcmFtIGlkIOaAqueJqWlkXHJcbiAgICAgKiBAcGFyYW0gcG9zIOeUn+aIkOS9jee9rlxyXG4gICAgICogQHBhcmFtIGxldmVsIOaAqueJqeetiee6p1xyXG4gICAgICogQHBhcmFtIGhwUmF0ZSDooYDph4/mr5TnjodcclxuICAgICAqIEBwYXJhbSBpc0NhbkNvdW50IOaYr+WQpuWPr+S7peiuoeaVsO+8iOeUqOS6juWMuuWIhuWPrOWUpOeJqe+8iVxyXG4gICAgICogQHJldHVybnMgXHJcbiAgICAgKi9cclxuICAgIGNyZWF0ZU1vbnN0ZXJCeUlkKGlkOiBudW1iZXIsIHBvczogY2MuVmVjMiwgbGV2ZWw6IG51bWJlciwgaHBSYXRlOiBudW1iZXIsIGlzQ2FuQ291bnQ6IGJvb2xlYW4gPSB0cnVlKTogY2MuTm9kZSB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJfX19fX19fXCIscG9zLngscG9zLnkpXHJcbiAgICAgICAgbGV0IHR5cGUgPSBNb25zdGVyQ29uZmlndXJlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1vbnN0ZXJDbGFzcyhpZCk7XHJcbiAgICAgICAgbGV0IG5vZGUgPSBzdXBlci5nZXROb2RlQnlJZCh0eXBlKTtcclxuICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgbm9kZS5zZXRQb3NpdGlvbihwb3MpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KE1vbnN0ZXIpLmluaXQoaWQsIGxldmVsLCBocFJhdGUsIGlzQ2FuQ291bnQpO1xyXG4gICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBib3Nz5Yib5bu65Y+s5ZSk54mpXHJcbiAgICAgKiBAcGFyYW0gbW9uc3RlcklkIOaAqueJqWlkXHJcbiAgICAgKiBAcGFyYW0gcG9zIOeUn+aIkOS9jee9rlxyXG4gICAgICogQHBhcmFtIGJvc3NBdHRyaWJ1dGUgYm9zc+eahOWxnuaAp1xyXG4gICAgICogQHJldHVybnMgXHJcbiAgICAgKi9cclxuICAgIGNyZWF0ZVN1bW1vbk1vbnN0ZXIobW9uc3RlcklkOiBudW1iZXIsIGxldmVsOiBudW1iZXIsIHBvczogY2MuVmVjMikge1xyXG4gICAgICAgIC8v5Y+s5ZSk54m55pWIXHJcbiAgICAgICAgbGV0IHF1YW4gPSBHcm91bmRNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLm1vbnN0ZXJfemhhb2h1YW4sIHBvcyk7XHJcbiAgICAgICAgbGV0IHNwaW5lID0gcXVhbi5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pO1xyXG4gICAgICAgIGxldCB0cmFjayA9IHNwaW5lLnNldEFuaW1hdGlvbigwLCBcIkJvc3MxMF9Ta2lsbDJfWmhhb0h1YW5fMlwiLCBmYWxzZSk7XHJcbiAgICAgICAgc3BpbmUuc2V0VHJhY2tFdmVudExpc3RlbmVyKHRyYWNrLCAoZW50cnk6IHNwLnNwaW5lLlRyYWNrRW50cnksIGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChldmVudC5kYXRhLm5hbWUgPT0gXCJaaGFvSHVhblwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZU1vbnN0ZXJCeUlkKG1vbnN0ZXJJZCwgcG9zLCBsZXZlbCwgMSwgZmFsc2UpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIHNwaW5lLnNldENvbXBsZXRlTGlzdGVuZXIoKCkgPT4ge1xyXG4gICAgICAgICAgICBzcGluZS5zZXRDb21wbGV0ZUxpc3RlbmVyKG51bGwpO1xyXG4gICAgICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5kZXN0cm95R2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLm1vbnN0ZXJfemhhb2h1YW4sIHF1YW4pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcHJldl91dWlkOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgLyoq5Y2z5bCG5Yig6Zmk5pWM5Lq677yM5Y+v5Lul5Zyo5q2k5pKt5pS+6Z+z5pWIICovXHJcbiAgICB3aWxsRGVzdHJveU1vbnN0ZXIobW9uc3RlclRzOiBNb25zdGVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgLy/mmK/lkKbopoHov5DooYzliqjkvZzlkI7lho3plIDmr4FcclxuICAgICAgICBsZXQgaXNBY3Rpb25EaWUgPSB0cnVlO1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5ZWF9TaG91amkpO1xyXG4gICAgICAgIC8v54iG6YeR5biBXHJcbiAgICAgICAgbGV0IHBvcyA9IG1vbnN0ZXJUcy5ub2RlLmdldFBvc2l0aW9uKCk7XHJcbiAgICAgICAgaWYgKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZSA9PSBHYW1lTW9kZS5NYWluKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlRHJvcFByb3AocG9zLCBHYW1lRWZmZWN0SWQuZHJvcF9jb2luKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVEcm9wUHJvcChwb3MsIEdhbWVFZmZlY3RJZC5kcm9wX2NvaW4pO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZURyb3BQcm9wKHBvcywgR2FtZUVmZmVjdElkLmRyb3BfZ2VtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGlzQWN0aW9uRGllO1xyXG4gICAgfVxyXG4gICAgLyoq5Zue5pS25pWM5Lq65Yiw5a+56LGh5rGgICovXHJcbiAgICBkZXN0cm95TW9uc3Rlcihub2RlOiBjYy5Ob2RlLCB0eXBlOiBudW1iZXIsIGlzQ2FuV2luOiBib29sZWFuID0gdHJ1ZSkge1xyXG4gICAgICAgIG5vZGUuY29sb3IgPSBjYy5Db2xvci5XSElURTtcclxuICAgICAgICBsZXQgbW9uc3RlclRzID0gbm9kZS5nZXRDb21wb25lbnQoTW9uc3Rlcik7XHJcbiAgICAgICAgbW9uc3RlclRzLnNldEVuZW15U3RhdGUoRW5lbXlfU3RhdGUuZGllKTtcclxuICAgICAgICAvL+imgeWMuuWIhuWPrOWUpOaAqlxyXG4gICAgICAgIGlmIChtb25zdGVyVHMuaXNfY2FuX2NvdW50KSB7XHJcbiAgICAgICAgICAgIGlmIChtb25zdGVyVHMudXVpZCA9PSB0aGlzLnByZXZfdXVpZCkge1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmVycm9yKFwi5Y+v6IO96YeN5aSN6K6h5pWw5LqGOlwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnByZXZfdXVpZCA9IG1vbnN0ZXJUcy51dWlkO1xyXG4gICAgICAgICAgICB0aGlzLmtpbGxlZF9tb25zdGVyX251bSsrO1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLm9uRW5lbXlEaWUobW9uc3RlclRzLnNjb3JlLCBtb25zdGVyVHMuaXNfY2FuX2NvdW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMua2lsbGVkX21vbnN0ZXJfbnVtID49IHRoaXMudG90YWxfbW9uc3Rlcl9udW0pIHtcclxuICAgICAgICAgICAgaWYgKGlzQ2FuV2luKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5nZXRSZW1haW5Nb25zdGVyKCkgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0dhbWVXaW4oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyAvL+WbnuaUtuWJjeagh+iusOWPr+S7pVxyXG4gICAgICAgIC8vIGlmKG1vbnN0ZXJUcyl7XHJcbiAgICAgICAgLy8gICAgIG1vbnN0ZXJUcy5zZXRJc0NhbkNvdW50KHRydWUpO1xyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgc3VwZXIuZGVzdHJveU5vZGUodHlwZSwgbm9kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRSZW1haW5Nb25zdGVyKCk6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IG51bSA9IDA7XHJcbiAgICAgICAgbGV0IGxlbiA9IHRoaXMubm9kZS5jaGlsZHJlbkNvdW50O1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG1vbnN0ZXIgPSB0aGlzLm5vZGUuY2hpbGRyZW5baV07XHJcbiAgICAgICAgICAgIGxldCBtb25zdGVyVFMgPSBtb25zdGVyLmdldENvbXBvbmVudChNb25zdGVyKTtcclxuICAgICAgICAgICAgaWYgKG1vbnN0ZXJUUyAmJiBtb25zdGVyVFMuZ2V0SXNEaWUoKSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgbnVtKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVEcm9wUHJvcChwb3M6IGNjLlZlYzIsIGlkOiBHYW1lRWZmZWN0SWQpIHtcclxuICAgICAgICBsZXQgcHJvcCA9IEdyb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChpZCwgcG9zLCAyKTtcclxuICAgICAgICAvL3RoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZT1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNwQnlQcm9wSWQoUHJvcElkLkNvaW4pO1xyXG4gICAgICAgIHByb3Aub3BhY2l0eSA9IDI1NTtcclxuICAgICAgICAvL3Byb3Auc2NhbGU9MC41O1xyXG4gICAgICAgIGxldCB4eCA9IE1hdGgucmFuZG9tKCkgKiAyMCArIDMwO1xyXG4gICAgICAgIHh4ICo9IE1hdGgucmFuZG9tKCkgPCAwLjUgPyAxIDogLTE7XHJcbiAgICAgICAgbGV0IHl5ID0gTWF0aC5yYW5kb20oKSAqIDQwIC0gMjA7XHJcbiAgICAgICAgbGV0IGhlaWdodCA9IE1hdGgucmFuZG9tKCkgKiAyMCArIDMwO1xyXG4gICAgICAgIC8vIGNjLnR3ZWVuKHByb3ApLnRoZW4oY2MuanVtcEJ5KDAuNSx4eCx5eSxoZWlnaHQsMSkpLmRlbGF5KDEpLmNhbGwoKCk9PntcclxuICAgICAgICAvLyAgICAgcHJvcC5wYXJlbnQ9VUlNYW5hZ2VyLmdldEluc3RhbmNlKCkubm9kZTtcclxuICAgICAgICAvLyB9KS50aGVuKE15VG9vbC5nZXRCZXppZXJBY3QocHJvcC5nZXRQb3NpdGlvbigpLHRoaXMuY29pbl9wb3MpKS5jYWxsKCgpPT57XHJcbiAgICAgICAgLy8gICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmRlc3Ryb3lHYW1lRWZmZWN0QnlJZChpZCxwcm9wKTtcclxuICAgICAgICAvLyAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nYW1lLnNob3dDb2luKCk7XHJcbiAgICAgICAgLy8gfSkuc3RhcnQoKTtcclxuXHJcbiAgICAgICAgY2MudHdlZW4ocHJvcCkudGhlbihjYy5qdW1wQnkoMC41LCB4eCwgeXksIGhlaWdodCwgMSkpXHJcbiAgICAgICAgICAgIC8vIC5jYWxsKCgpPT57XHJcbiAgICAgICAgICAgIC8vICAgICAvL+eUn+aIkOmYtOW9sVxyXG4gICAgICAgICAgICAvLyAgICAgbGV0IHNoYWRvd0lkPUdhbWVFZmZlY3RJZC5kcm9wX2dlbTtcclxuICAgICAgICAgICAgLy8gICAgIGxldCBkaXN0WFg9MDtcclxuICAgICAgICAgICAgLy8gICAgIGxldCBkaXN0WVk9MDtcclxuICAgICAgICAgICAgLy8gICAgIHN3aXRjaChpZCl7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgY2FzZSBHYW1lRWZmZWN0SWQuZHJvcF9jb2luOnsgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICBkaXN0WFg9cHJvcC54O1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICBkaXN0WVk9cHJvcC55LTkuNTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgc2hhZG93SWQ9R2FtZUVmZmVjdElkLmRyb3BfY29pbl9zaGFkb3c7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIGNhc2UgR2FtZUVmZmVjdElkLmRyb3BfZ2VtOntcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgc2hhZG93SWQ9R2FtZUVmZmVjdElkLmRyb3BfZ2VtX3NoYWRvdztcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgZGlzdFhYPXByb3AueCsxO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICBkaXN0WVk9cHJvcC55LTEwO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgLy8gICAgIH0gICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyAgICAgbGV0IHNoYWRvdz1Hcm91bmRNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoc2hhZG93SWQsY2MudjIoZGlzdFhYLGRpc3RZWSksMSk7XHJcbiAgICAgICAgICAgIC8vICAgICBzaGFkb3cub3BhY2l0eT0xMDA7XHJcbiAgICAgICAgICAgIC8vICAgICBjYy50d2VlbihzaGFkb3cpLmRlbGF5KDEwKS50bygwLjUse29wYWNpdHk6MH0pLmNhbGwoKCk9PntcclxuICAgICAgICAgICAgLy8gICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5kZXN0cm95R2FtZUVmZmVjdEJ5SWQoc2hhZG93SWQsc2hhZG93KTtcclxuICAgICAgICAgICAgLy8gICAgIH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgIC8vIH0pXHJcbiAgICAgICAgICAgIC5kZWxheSgxMCkudG8oMC41LCB7IG9wYWNpdHk6IDAgfSkuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5kZXN0cm95R2FtZUVmZmVjdEJ5SWQoaWQsIHByb3ApO1xyXG4gICAgICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGRlc3Ryb3lBbGxEcm9wKCkge1xyXG4gICAgICAgIGxldCBkcm9wcyA9IHRoaXMuZHJvcF9yb290LmNoaWxkcmVuO1xyXG4gICAgICAgIGxldCBsZW4gPSBkcm9wcy5sZW5ndGg7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgcHJvcCA9IGRyb3BzW2ldO1xyXG4gICAgICAgICAgICBsZXQgaWQgPSBwYXJzZUludChwcm9wLm5hbWUpO1xyXG4gICAgICAgICAgICBpZiAoaWQpIHtcclxuICAgICAgICAgICAgICAgIGNjLnR3ZWVuKHByb3ApLnRvKDAuNSwgeyBvcGFjaXR5OiAwIH0pLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmRlc3Ryb3lHYW1lRWZmZWN0QnlJZChpZCwgcHJvcCk7XHJcbiAgICAgICAgICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkZXN0cm95QWxsTW9uc3RlcigpIHtcclxuICAgICAgICBsZXQgYWxsTW9uc3RlciA9IHRoaXMubm9kZS5jaGlsZHJlbjtcclxuICAgICAgICBsZXQgbGVuID0gYWxsTW9uc3Rlci5sZW5ndGg7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgbW9uc3RlciA9IGFsbE1vbnN0ZXJbaV07XHJcbiAgICAgICAgICAgIGlmIChtb25zdGVyKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbW9uc3RlclRTID0gbW9uc3Rlci5nZXRDb21wb25lbnQoTW9uc3Rlcik7XHJcbiAgICAgICAgICAgICAgICBpZiAobW9uc3RlclRTKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXN0cm95TW9uc3Rlcihtb25zdGVyLCBtb25zdGVyVFMubW9uc3Rlcl90eXBlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tR0VULS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5oyH5a6a5L2N572udGFyZ2V0UG9z55qE5oyH5a6a6IyD5Zu0ZmFud2Vp5YaF6Z2g6L+R5Z+O5aKZ5pyA6L+R55qEY2hlYWtOdW3kuKrmlYzkurpcclxuICAgICAqIEBwYXJhbSBjaGVha051bSDmo4DmtYvmlbDph49cclxuICAgICAqIEBwYXJhbSB0YXJnZXRQb3Mg5oyH5a6a55qE5L2N572u77yM5LiA6Iis5piv6Ieq6Lqr5L2N572uXHJcbiAgICAgKiBAcGFyYW0gZmFud2VpIOaMh+WumueahOajgOa1i+iMg+WbtO+8jOS4gOiIrOaYr+aUu+WHu+i3neemu1xyXG4gICAgICogQHJldHVybnMg5omA5pyJ5ruh6Laz5p2h5Lu255qE5pWM5Lq6XHJcbiAgICAgKi9cclxuICAgIGdldE1vbnN0ZXJzRm9yTmVhcmVzdChjaGVha051bTogbnVtYmVyLCB0YXJnZXRQb3M6IGNjLlZlYzIsIGZhbndlaTogbnVtYmVyLCBwb3NJbmRleDogbnVtYmVyID0gbnVsbCk6IGNjLk5vZGVbXSB7XHJcbiAgICAgICAgaWYgKGNoZWFrTnVtID09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBsZW4gPSB0aGlzLm5vZGUuY2hpbGRyZW5Db3VudDtcclxuICAgICAgICBpZiAobGVuIDw9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vMS7lhYjmo4DmtYvlnKjmlLvlh7vojIPlm7TlhoXnrKblkIjmlLvlh7vljZXkvY3nmoTmlYzkurpcclxuICAgICAgICBsZXQgYXR0TW9uc3RlcnM6IGNjLk5vZGVbXSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG1vbnN0ZXIgPSB0aGlzLm5vZGUuY2hpbGRyZW5baV07XHJcbiAgICAgICAgICAgIGxldCBtb25zdGVyVFMgPSBtb25zdGVyLmdldENvbXBvbmVudChNb25zdGVyKTtcclxuICAgICAgICAgICAgaWYgKG1vbnN0ZXJUUyAmJiBtb25zdGVyVFMuZ2V0SXNDYW5DaGVjaygpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGlzdGFuY2UgPSB0YXJnZXRQb3Muc3ViKG1vbnN0ZXIuZ2V0UG9zaXRpb24oKSkubWFnKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGlzdGFuY2UgPD0gZmFud2VpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBvc0luZGV4ID09IG51bGwgfHwgcG9zSW5kZXggPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXR0TW9uc3RlcnMucHVzaChtb25zdGVyKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihNYXRoLmFicyhtb25zdGVyLngtR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFyUG9zWCk8PTc1KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dE1vbnN0ZXJzLnB1c2gobW9uc3Rlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChhdHRNb25zdGVycy5sZW5ndGggPD0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/lsI/kuo4w77yM5Luj6KGo6KaB5omA5pyJXHJcbiAgICAgICAgaWYgKGNoZWFrTnVtIDwgMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gYXR0TW9uc3RlcnM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjaGVha051bSA+PSBhdHRNb25zdGVycy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGF0dE1vbnN0ZXJzO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLzIu5a+55Y+v5Lul5pS75Ye755qE5pWM5Lq66L+b6KGM5LyY5YWI57qn5Yik5patLOmAieWHumNoZWFrTnVt5Liq55uu5qCH5L2c5Li65omT5Ye75Y2V5L2NXHJcbiAgICAgICAgLy8yLjHkvJjlhYjmlLvlh7vot5/ln47lopnmnIDov5HnmoTljZXkvY1cclxuICAgICAgICBhdHRNb25zdGVycy5zb3J0KChhOiBjYy5Ob2RlLCBiOiBjYy5Ob2RlKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBhLmdldFBvc2l0aW9uKCkuc3ViKHRhcmdldFBvcykubWFnKCkgLSBiLmdldFBvc2l0aW9uKCkuc3ViKHRhcmdldFBvcykubWFnKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYXR0TW9uc3RlcnMuc3BsaWNlKGNoZWFrTnVtKTtcclxuICAgICAgICByZXR1cm4gYXR0TW9uc3RlcnM7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluaMh+WumuS9jee9rnRhcmdldFBvc+eahOaMh+WumuiMg+WbtGZhbndlaeWGhemdoOi/keWfjuWimeacgOi/keeahGNoZWFrTnVt5Liq5pWM5Lq6XHJcbiAgICAgKiBAcGFyYW0gY2hlYWtOdW0g5qOA5rWL5pWw6YePXHJcbiAgICAgKiBAcGFyYW0gdGFyZ2V0UG9zIOaMh+WumueahOS9jee9ru+8jOS4gOiIrOaYr+iHqui6q+S9jee9rlxyXG4gICAgICogQHBhcmFtIGZhbndlaSDmjIflrprnmoTmo4DmtYvojIPlm7TvvIzkuIDoiKzmmK/mlLvlh7vot53nprtcclxuICAgICAqIEByZXR1cm5zIOaJgOaciea7oei2s+adoeS7tueahOaVjOS6ulxyXG4gICAgICovXHJcbiAgICBnZXRNb25zdGVyc0Zvck5lYXJlc3RCeVNraWxsKGNoZWFrTnVtOiBudW1iZXIsIHRhcmdldFBvc1k6IG51bWJlciwgZmFud2VpOiBudW1iZXIpOiBjYy5Ob2RlW10ge1xyXG4gICAgICAgIGlmIChjaGVha051bSA9PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbGVuID0gdGhpcy5ub2RlLmNoaWxkcmVuQ291bnQ7XHJcbiAgICAgICAgaWYgKGxlbiA8PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLzEu5YWI5qOA5rWL5Zyo5pS75Ye76IyD5Zu05YaF56ym5ZCI5pS75Ye75Y2V5L2N55qE5pWM5Lq6XHJcbiAgICAgICAgbGV0IGF0dE1vbnN0ZXJzOiBjYy5Ob2RlW10gPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBtb25zdGVyID0gdGhpcy5ub2RlLmNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICBsZXQgbW9uc3RlclRTID0gbW9uc3Rlci5nZXRDb21wb25lbnQoTW9uc3Rlcik7XHJcbiAgICAgICAgICAgIGlmIChtb25zdGVyVFMgJiYgbW9uc3RlclRTLmdldElzQ2FuQ2hlY2soKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRpc3RhbmNlID0gbW9uc3RlclRTLmdldENlbnRlclBvcygpLnkgLSB0YXJnZXRQb3NZO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRpc3RhbmNlIDw9IGZhbndlaSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGF0dE1vbnN0ZXJzLnB1c2gobW9uc3Rlcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGF0dE1vbnN0ZXJzLmxlbmd0aCA8PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+Wwj+S6jjDvvIzku6PooajopoHmiYDmnIlcclxuICAgICAgICBpZiAoY2hlYWtOdW0gPCAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhdHRNb25zdGVycztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNoZWFrTnVtID49IGF0dE1vbnN0ZXJzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm4gYXR0TW9uc3RlcnM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vMi7lr7nlj6/ku6XmlLvlh7vnmoTmlYzkurrov5vooYzkvJjlhYjnuqfliKTmlq0s6YCJ5Ye6Y2hlYWtOdW3kuKrnm67moIfkvZzkuLrmiZPlh7vljZXkvY1cclxuICAgICAgICAvLzIuMeS8mOWFiOaUu+WHu+i3n+WfjuWimeacgOi/keeahOWNleS9jVxyXG4gICAgICAgIGF0dE1vbnN0ZXJzLnNvcnQoKGE6IGNjLk5vZGUsIGI6IGNjLk5vZGUpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIChhLnkgLSB0YXJnZXRQb3NZKSAtIChiLnkgLSB0YXJnZXRQb3NZKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBhdHRNb25zdGVycy5zcGxpY2UoY2hlYWtOdW0pO1xyXG4gICAgICAgIHJldHVybiBhdHRNb25zdGVycztcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogLy/ojrflj5bmjIflrprkvY3nva50YXJnZXRQb3PnmoTmjIflrprojIPlm7RmYW53ZWnlhoVjaGVha051beS4quaVjOS6ulxyXG4gICAgICogQHBhcmFtIGNoZWFrTnVtIOajgOa1i+aVsOmHj++8jOWwj+S6jjDooajnpLrmiYDmnInvvIzlpoItMVxyXG4gICAgICogQHBhcmFtIHRhcmdldFBvcyDnm67moIfkvY3nva5cclxuICAgICAqIEBwYXJhbSBmYW53ZWkg6IyD5Zu0XHJcbiAgICAgKiBAcmV0dXJucyDmiYDmnInnrKblkIjmnaHku7bnmoTmlYzkurpcclxuICAgICAqL1xyXG4gICAgZ2V0TW9uc3RlcnNGb3JDZW50ZXJQb3MoY2hlYWtOdW06IG51bWJlciwgdGFyZ2V0UG9zOiBjYy5WZWMyLCBmYW53ZWk6IG51bWJlcik6IGNjLk5vZGVbXSB7XHJcbiAgICAgICAgaWYgKGNoZWFrTnVtID09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBsZW4gPSB0aGlzLm5vZGUuY2hpbGRyZW5Db3VudDtcclxuICAgICAgICBpZiAobGVuIDw9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vMS7lhYjmo4DmtYvlnKjmlLvlh7vojIPlm7TlhoXnrKblkIjmlLvlh7vljZXkvY3nmoTmlYzkurpcclxuICAgICAgICBsZXQgYXR0TW9uc3RlcnM6IGNjLk5vZGVbXSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG1vbnN0ZXIgPSB0aGlzLm5vZGUuY2hpbGRyZW5baV07XHJcbiAgICAgICAgICAgIGxldCBtb25zdGVyVFMgPSBtb25zdGVyLmdldENvbXBvbmVudChNb25zdGVyKTtcclxuICAgICAgICAgICAgaWYgKG1vbnN0ZXJUUyAmJiBtb25zdGVyVFMuZ2V0SXNDYW5DaGVjaygpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGlzdGFuY2UgPSB0YXJnZXRQb3Muc3ViKG1vbnN0ZXJUUy5nZXRDZW50ZXJQb3MoKSkubWFnKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGlzdGFuY2UgPD0gZmFud2VpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXR0TW9uc3RlcnMucHVzaChtb25zdGVyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYXR0TW9uc3RlcnMubGVuZ3RoIDw9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5bCP5LqOMO+8jOS7o+ihqOimgeaJgOaciVxyXG4gICAgICAgIGlmIChjaGVha051bSA8IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIGF0dE1vbnN0ZXJzO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+WmguaenOajgOa1i+WIsOeahOaVsOmHj+ayoeacieimgeajgOa1i+eahOmCo+S5iOWkmu+8jOebtOaOpei/lOWbnuWFqOmDqC5cclxuICAgICAgICBpZiAoY2hlYWtOdW0gPj0gYXR0TW9uc3RlcnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhdHRNb25zdGVycztcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8yLjHkvJjlhYjmlLvlh7vot5/nm67moIfkvY3nva7mnIDov5HnmoTljZXkvY3vvIzmjInnhafkuI5wb3PnmoTot53nprvlpKflsI/ov5vooYzmjpLliJfvvIzku47lsI/liLDlpKdcclxuICAgICAgICBhdHRNb25zdGVycy5zb3J0KChhOiBjYy5Ob2RlLCBiOiBjYy5Ob2RlKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBhLmdldFBvc2l0aW9uKCkuc3ViKHRhcmdldFBvcykubWFnKCkgLSBiLmdldFBvc2l0aW9uKCkuc3ViKHRhcmdldFBvcykubWFnKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYXR0TW9uc3RlcnMuc3BsaWNlKGNoZWFrTnVtKTtcclxuICAgICAgICByZXR1cm4gYXR0TW9uc3RlcnM7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIC8v6I635Y+W5oyH5a6a5L2N572udGFyZ2V0UG9z55qE5oyH5a6a6IyD5Zu0ZmFud2Vp5YaFY2hlYWtOdW3kuKrmlYzkurpcclxuICAgICAqIEBwYXJhbSBjaGVha051bSDmo4DmtYvmlbDph4/vvIzlsI/kuo4w6KGo56S65omA5pyJ77yM5aaCLTFcclxuICAgICAqIEBwYXJhbSB0YXJnZXRQb3Mg55uu5qCH5L2N572uXHJcbiAgICAgKiBAcGFyYW0gZmFud2VpIOiMg+WbtFxyXG4gICAgICogQHJldHVybnMg5omA5pyJ56ym5ZCI5p2h5Lu255qE5pWM5Lq6XHJcbiAgICAgKi9cclxuICAgIGdldE1vbnN0ZXJzRm9yQmluZ052V2FsbFJlY3QocmVjdDogY2MuUmVjdCk6IEJpbmdOdldhbGxEYXRhIHtcclxuICAgICAgICBsZXQgbGVuID0gdGhpcy5ub2RlLmNoaWxkcmVuQ291bnQ7XHJcbiAgICAgICAgLy8xLuWFiOajgOa1i+WcqOaUu+WHu+iMg+WbtOWGheespuWQiOaUu+WHu+WNleS9jeeahOaVjOS6ulxyXG4gICAgICAgIGxldCBibndkID0gbmV3IEJpbmdOdldhbGxEYXRhKCk7XHJcbiAgICAgICAgbGV0IGF0dE1vbnN0ZXJzOiBjYy5Ob2RlW10gPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBtb25zdGVyID0gdGhpcy5ub2RlLmNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICBsZXQgbW9uc3RlclRTID0gbW9uc3Rlci5nZXRDb21wb25lbnQoTW9uc3Rlcik7XHJcbiAgICAgICAgICAgIGlmIChtb25zdGVyVFMgJiYgbW9uc3RlclRTLmdldElzQ2FuQ2hlY2soKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlY3QuY29udGFpbnMobW9uc3Rlci5nZXRQb3NpdGlvbigpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGF0dE1vbnN0ZXJzLnB1c2gobW9uc3Rlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1vbnN0ZXJUUy5nZXRTdHJlbmd0aFR5cGUoKSA9PSBTdHJlbmd0aFR5cGUuQm9zcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBibndkLmJvc3NfdHMgPSBtb25zdGVyVFM7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJud2QuYmFja19tb25zdGVycyA9IGF0dE1vbnN0ZXJzO1xyXG4gICAgICAgIHJldHVybiBibndkO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDov5Tlm57nlJ/lkb3lgLzmnIDpq5jnmoTmlYzkurrluo/liJdcclxuICAgICAqIEBwYXJhbSBjaGVha051bSDmo4DmtYvmlbDph4/vvIzlsI/kuo4w6KGo56S65omA5pyJ77yM5aaCLTFcclxuICAgICAqIEBwYXJhbSB0YXJnZXRQb3MgXHJcbiAgICAgKiBAcGFyYW0gZmFud2VpIFxyXG4gICAgICogQHJldHVybnMgXHJcbiAgICAgKi9cclxuICAgIGdldE1vbnN0ZXJzRm9yTWF4SHAoY2hlYWtOdW06IG51bWJlciwgdGFyZ2V0UG9zOiBjYy5WZWMyLCBmYW53ZWk6IG51bWJlcik6IGNjLk5vZGVbXSB7XHJcbiAgICAgICAgaWYgKGNoZWFrTnVtID09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBsZW4gPSB0aGlzLm5vZGUuY2hpbGRyZW5Db3VudDtcclxuICAgICAgICBpZiAobGVuIDw9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vMS7lhYjmo4DmtYvlnKjmlLvlh7vojIPlm7TlhoXnrKblkIjmlLvlh7vljZXkvY3nmoTmlYzkurpcclxuICAgICAgICBsZXQgYXR0TW9uc3RlcnM6IGNjLk5vZGVbXSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG1vbnN0ZXIgPSB0aGlzLm5vZGUuY2hpbGRyZW5baV07XHJcbiAgICAgICAgICAgIGxldCBtb25zdGVyVFMgPSBtb25zdGVyLmdldENvbXBvbmVudChNb25zdGVyKTtcclxuICAgICAgICAgICAgaWYgKG1vbnN0ZXJUUyAmJiBtb25zdGVyVFMuZ2V0SXNDYW5DaGVjaygpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGlzdGFuY2UgPSB0YXJnZXRQb3Muc3ViKG1vbnN0ZXIuZ2V0UG9zaXRpb24oKSkubWFnKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGlzdGFuY2UgPD0gZmFud2VpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXR0TW9uc3RlcnMucHVzaChtb25zdGVyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYXR0TW9uc3RlcnMubGVuZ3RoIDw9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5bCP5LqOMO+8jOS7o+ihqOimgeaJgOaciVxyXG4gICAgICAgIGlmIChjaGVha051bSA8IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIGF0dE1vbnN0ZXJzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY2hlYWtOdW0gPj0gYXR0TW9uc3RlcnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhdHRNb25zdGVycztcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8yLuWvueWPr+S7peaUu+WHu+eahOaVjOS6uui/m+ihjOS8mOWFiOe6p+WIpOaWrSzpgInlh7pjaGVha051beS4quebruagh+S9nOS4uuaJk+WHu+WNleS9jVxyXG4gICAgICAgIC8vMi4x5LyY5YWI5pS75Ye76Lef5Z+O5aKZ5pyA6L+R55qE5Y2V5L2NXHJcbiAgICAgICAgYXR0TW9uc3RlcnMuc29ydCgoYTogY2MuTm9kZSwgYjogY2MuTm9kZSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gYi5nZXRDb21wb25lbnQoTW9uc3RlcikuZ2V0Q3VySHAoKSAtIGEuZ2V0Q29tcG9uZW50KE1vbnN0ZXIpLmdldEN1ckhwKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYXR0TW9uc3RlcnMuc3BsaWNlKGNoZWFrTnVtKTtcclxuICAgICAgICByZXR1cm4gYXR0TW9uc3RlcnM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDov5Tlm57nlJ/lkb3lgLzmnIDpq5jnmoTmlYzkurrluo/liJdcclxuICAgICAqIEBwYXJhbSBjaGVha051bSDmo4DmtYvmlbDph4/vvIzlsI/kuo4w6KGo56S65omA5pyJ77yM5aaCLTFcclxuICAgICAqIEBwYXJhbSB0YXJnZXRQb3MgXHJcbiAgICAgKiBAcGFyYW0gZmFud2VpIFxyXG4gICAgICogQHJldHVybnMgXHJcbiAgICAgKi9cclxuICAgIGdldE1vbnN0ZXJzRm9yTWF4QXR0YWsoY2hlYWtOdW06IG51bWJlciwgdGFyZ2V0UG9zOiBjYy5WZWMyLCBmYW53ZWk6IG51bWJlcik6IGNjLk5vZGVbXSB7XHJcbiAgICAgICAgaWYgKGNoZWFrTnVtID09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBsZW4gPSB0aGlzLm5vZGUuY2hpbGRyZW5Db3VudDtcclxuICAgICAgICBpZiAobGVuIDw9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vMS7lhYjmo4DmtYvlnKjmlLvlh7vojIPlm7TlhoXnrKblkIjmlLvlh7vljZXkvY3nmoTmlYzkurpcclxuICAgICAgICBsZXQgYXR0TW9uc3RlcnM6IGNjLk5vZGVbXSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG1vbnN0ZXIgPSB0aGlzLm5vZGUuY2hpbGRyZW5baV07XHJcbiAgICAgICAgICAgIGxldCBtb25zdGVyVFMgPSBtb25zdGVyLmdldENvbXBvbmVudChNb25zdGVyKTtcclxuICAgICAgICAgICAgaWYgKG1vbnN0ZXJUUyAmJiBtb25zdGVyVFMuZ2V0SXNDYW5DaGVjaygpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGlzdGFuY2UgPSB0YXJnZXRQb3Muc3ViKG1vbnN0ZXIuZ2V0UG9zaXRpb24oKSkubWFnKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGlzdGFuY2UgPD0gZmFud2VpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXR0TW9uc3RlcnMucHVzaChtb25zdGVyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYXR0TW9uc3RlcnMubGVuZ3RoIDw9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5bCP5LqOMO+8jOS7o+ihqOimgeaJgOaciVxyXG4gICAgICAgIGlmIChjaGVha051bSA8IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIGF0dE1vbnN0ZXJzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY2hlYWtOdW0gPj0gYXR0TW9uc3RlcnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhdHRNb25zdGVycztcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8yLuWvueWPr+S7peaUu+WHu+eahOaVjOS6uui/m+ihjOS8mOWFiOe6p+WIpOaWrSzpgInlh7pjaGVha051beS4quebruagh+S9nOS4uuaJk+WHu+WNleS9jVxyXG4gICAgICAgIC8vMi4x5LyY5YWI5pS75Ye76Lef5Z+O5aKZ5pyA6L+R55qE5Y2V5L2NXHJcbiAgICAgICAgYXR0TW9uc3RlcnMuc29ydCgoYTogY2MuTm9kZSwgYjogY2MuTm9kZSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gYi5nZXRDb21wb25lbnQoTW9uc3RlcikuZ2V0Q3VyQXR0KCkgLSBhLmdldENvbXBvbmVudChNb25zdGVyKS5nZXRDdXJBdHQoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBhdHRNb25zdGVycy5zcGxpY2UoY2hlYWtOdW0pO1xyXG4gICAgICAgIHJldHVybiBhdHRNb25zdGVycztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIC8v6I635Y+W5oyH5a6a5L2N572udGFyZ2V0UG9z55qE5oyH5a6a6IyD5Zu0ZmFud2Vp5YaFY2hlYWtOdW3kuKrmlYzkurpcclxuICAgICAqIEBwYXJhbSBjaGVha051bSDmo4DmtYvmlbDph4/vvIzlsI/kuo4w6KGo56S65omA5pyJ77yM5aaCLTFcclxuICAgICAqIEBwYXJhbSB0YXJnZXRQb3Mg55uu5qCH5L2N572uXHJcbiAgICAgKiBAcGFyYW0gcmFkaXVzIOiMg+WbtOWNiuW+hFxyXG4gICAgICogQHBhcmFtIG1pblJhZGlhbiDmnIDlsI/nmoTlvKfluqblgLxcclxuICAgICAqIEBwYXJhbSBtYXhSYWRpYW4g5pyA5aSn55qE5byn5bqm5YC8XHJcbiAgICAgKiBAcmV0dXJucyDmiYDmnInnrKblkIjmnaHku7bnmoTmlYzkurpcclxuICAgICAqL1xyXG4gICAgZ2V0TW9uc3RlcnNGb3JSYWRpYW4oY2hlYWtOdW06IG51bWJlciwgdGFyZ2V0UG9zOiBjYy5WZWMyLCByYWRpdXM6IG51bWJlciwgbWluUmFkaWFuOiBudW1iZXIsIG1heFJhZGlhbjogbnVtYmVyKTogY2MuTm9kZVtdIHtcclxuICAgICAgICBpZiAoY2hlYWtOdW0gPT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGxlbiA9IHRoaXMubm9kZS5jaGlsZHJlbkNvdW50O1xyXG4gICAgICAgIGlmIChsZW4gPD0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHAyID0gTWF0aC5QSSAqIDI7XHJcbiAgICAgICAgbWluUmFkaWFuID0gKHAyICsgbWluUmFkaWFuKSAlIHAyXHJcbiAgICAgICAgbWF4UmFkaWFuID0gKHAyICsgbWF4UmFkaWFuKSAlIHAyXHJcbiAgICAgICAgLy8xLuWFiOajgOa1i+WcqOaUu+WHu+iMg+WbtOWGheespuWQiOaUu+WHu+WNleS9jeeahOaVjOS6ulxyXG4gICAgICAgIGxldCBhdHRNb25zdGVyczogY2MuTm9kZVtdID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgbW9uc3RlciA9IHRoaXMubm9kZS5jaGlsZHJlbltpXTtcclxuICAgICAgICAgICAgbGV0IG1vbnN0ZXJUUyA9IG1vbnN0ZXIuZ2V0Q29tcG9uZW50KE1vbnN0ZXIpO1xyXG4gICAgICAgICAgICBpZiAobW9uc3RlclRTICYmIG1vbnN0ZXJUUy5nZXRJc0NhbkNoZWNrKCkpIHtcclxuICAgICAgICAgICAgICAgIC8v5YWI5Yik5pat5piv5ZCm5Zyo5byn5bqm6IyD5Zu05YaFXHJcbiAgICAgICAgICAgICAgICBsZXQgb2Zmc2V0UG9zID0gbW9uc3RlclRTLmdldENlbnRlclBvcygpLnN1Yih0YXJnZXRQb3MpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHJhZGlhbiA9IE1hdGguYXRhbjIob2Zmc2V0UG9zLnksIG9mZnNldFBvcy54KTtcclxuICAgICAgICAgICAgICAgIHJhZGlhbiA9IChwMiArIHJhZGlhbikgJSBwMlxyXG4gICAgICAgICAgICAgICAgLy8gbGV0IGFuZ2xlPU15VG9vbC5yYWRpYW5Ub0FuZ2xlKHJhZGlhbik7XHJcbiAgICAgICAgICAgICAgICAvLyBjYy5sb2coYW5nbGUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJhZGlhbiA+PSBtaW5SYWRpYW4gJiYgcmFkaWFuIDw9IG1heFJhZGlhbikge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkaXN0YW5jZSA9IG9mZnNldFBvcy5tYWcoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGlzdGFuY2UgPD0gcmFkaXVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dE1vbnN0ZXJzLnB1c2gobW9uc3Rlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChhdHRNb25zdGVycy5sZW5ndGggPD0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/lsI/kuo4w77yM5Luj6KGo6KaB5omA5pyJXHJcbiAgICAgICAgaWYgKGNoZWFrTnVtIDwgMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gYXR0TW9uc3RlcnM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIC8v5aaC5p6c5qOA5rWL5Yiw55qE5pWw6YeP5rKh5pyJ6KaB5qOA5rWL55qE6YKj5LmI5aSa77yM55u05o6l6L+U5Zue5YWo6YOoLlxyXG4gICAgICAgIC8vIGlmKGNoZWFrTnVtPj1hdHRNb25zdGVycy5sZW5ndGgpXHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgIC8vICAgICByZXR1cm4gYXR0TW9uc3RlcnM7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIC8vMi4x5LyY5YWI5pS75Ye76Lef55uu5qCH5L2N572u5pyA6L+R55qE5Y2V5L2N77yM5oyJ54Wn5LiOcG9z55qE6Led56a75aSn5bCP6L+b6KGM5o6S5YiX77yM5LuO5bCP5Yiw5aSnXHJcbiAgICAgICAgLy8gYXR0TW9uc3RlcnMuc29ydCgoYTpjYy5Ob2RlLGI6Y2MuTm9kZSk9PntcclxuICAgICAgICAvLyAgICAgcmV0dXJuIGEuZ2V0UG9zaXRpb24oKS5zdWIodGFyZ2V0UG9zKS5tYWcoKS1iLmdldFBvc2l0aW9uKCkuc3ViKHRhcmdldFBvcykubWFnKCk7XHJcbiAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgLy8gYXR0TW9uc3RlcnMuc3BsaWNlKGNoZWFrTnVtKTtcclxuICAgICAgICByZXR1cm4gYXR0TW9uc3RlcnM7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ojrflj5bmjIflrprkvY3nva50YXJnZXRQb3PnmoTmjIflrprojIPlm7RmYW53ZWnlhoVjaGVha051beS4quaVjOS6uijmlYzkurrkuJPnlKjvvIzmo4DmtYvpmJ/lj4spXHJcbiAgICBnZXRNb25zdGVyc0Zvck1vbnN0ZXJQb3MoY2hlYWtOdW06IG51bWJlciwgdGFyZ2V0UG9zOiBjYy5WZWMyLCBmYW53ZWk6IG51bWJlcik6IGNjLk5vZGVbXSB7XHJcbiAgICAgICAgaWYgKGNoZWFrTnVtID09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBsZW4gPSB0aGlzLm5vZGUuY2hpbGRyZW5Db3VudDtcclxuICAgICAgICBpZiAobGVuIDw9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vMS7lhYjmo4DmtYvlnKjmlLvlh7vojIPlm7TlhoXnrKblkIjmlLvlh7vljZXkvY3nmoTmlYzkurpcclxuICAgICAgICBsZXQgYXR0TW9uc3RlcnM6IGNjLk5vZGVbXSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG1vbnN0ZXIgPSB0aGlzLm5vZGUuY2hpbGRyZW5baV07XHJcbiAgICAgICAgICAgIGxldCBtb25zdGVyVFMgPSBtb25zdGVyLmdldENvbXBvbmVudChNb25zdGVyKTtcclxuICAgICAgICAgICAgaWYgKG1vbnN0ZXJUUyAmJiAhbW9uc3RlclRTLmdldElzRGllKCkpIHtcclxuICAgICAgICAgICAgICAgIGxldCBkaXN0YW5jZSA9IHRhcmdldFBvcy5zdWIobW9uc3Rlci5nZXRQb3NpdGlvbigpKS5tYWcoKTtcclxuICAgICAgICAgICAgICAgIGlmIChkaXN0YW5jZSA8PSBmYW53ZWkpIHtcclxuICAgICAgICAgICAgICAgICAgICBhdHRNb25zdGVycy5wdXNoKG1vbnN0ZXIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChhdHRNb25zdGVycy5sZW5ndGggPD0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/lsI/kuo4w77yM5Luj6KGo6KaB5omA5pyJXHJcbiAgICAgICAgaWYgKGNoZWFrTnVtIDwgMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gYXR0TW9uc3RlcnM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5aaC5p6c5qOA5rWL5Yiw55qE5pWw6YeP5rKh5pyJ6KaB5qOA5rWL55qE6YKj5LmI5aSa77yM55u05o6l6L+U5Zue5YWo6YOoLlxyXG4gICAgICAgIGlmIChjaGVha051bSA+PSBhdHRNb25zdGVycy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGF0dE1vbnN0ZXJzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBhdHRNb25zdGVycy5zcGxpY2UoY2hlYWtOdW0pO1xyXG4gICAgICAgIHJldHVybiBhdHRNb25zdGVycztcclxuICAgIH1cclxuICAgIC8qKuaYr+WQpuacieaVjOS6uuWcqOWfjuWimWNoZWNrRGlzdGFuY2Xot53nprvlhoUgKi9cclxuICAgIGNoZWNrV2FsbE1vbnN0ZXIoY2hlY2tEaXN0YW5jZTogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IGxlbiA9IHRoaXMubm9kZS5jaGlsZHJlbkNvdW50O1xyXG4gICAgICAgIGxldCB3YWxsWSA9IEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW5lbXlfYXR0X3k7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgbW9uc3RlciA9IHRoaXMubm9kZS5jaGlsZHJlbltpXTtcclxuICAgICAgICAgICAgbGV0IG1vbnN0ZXJUUyA9IG1vbnN0ZXIuZ2V0Q29tcG9uZW50KE1vbnN0ZXIpO1xyXG4gICAgICAgICAgICBpZiAobW9uc3RlclRTICYmICFtb25zdGVyVFMuZ2V0SXNEaWUoKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRpc3RhbmNlID0gTWF0aC5hYnMod2FsbFkgLSBtb25zdGVyLnkpXHJcbiAgICAgICAgICAgICAgICBpZiAoZGlzdGFuY2UgPD0gY2hlY2tEaXN0YW5jZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIG9uQWxsQmFjaygpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGxhdGVVcGRhdGUoZHQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucHJldl91dWlkID0gXCJcIjtcclxuICAgIH1cclxufVxyXG4iXX0=