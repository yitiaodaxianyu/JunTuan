"use strict";
cc._RF.push(module, 'eefebGDUNdBSbgUE73SCsyg', 'GuaJiManager');
// Scripts/GuaJi/GuaJiManager.ts

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
var GuaJiJianShi_1 = require("./GuaJiJianShi");
var GuaJiMonster_1 = require("./GuaJiMonster");
var GuaJiRes_1 = require("./GuaJiRes");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GuaJiManager = /** @class */ (function (_super) {
    __extends(GuaJiManager, _super);
    function GuaJiManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefabs_guaji_monster = [];
        _this.prefab_jianshi = null;
        _this.prefab_shadow = null;
        _this.prefab_hit = null;
        _this.prefab_pet_hit = null;
        _this.prefab_tuowei = null;
        _this.prefab_bullect = null;
        _this.prefab_res = null;
        // @property([cc.SpriteFrame])
        // sp_res:cc.SpriteFrame[]=[];
        _this.jianshi_root = null;
        _this.guawi_root = null;
        _this.shadow_root = null;
        _this.hit_root = null;
        _this.tuowei_root = null;
        _this.res_root = null;
        /**背景移速 */
        _this.bg_speed_x = 40;
        _this.box_pos = cc.v2(0, 0);
        return _this;
    }
    GuaJiManager_1 = GuaJiManager;
    GuaJiManager.getInstance = function () {
        if (this._instance == null) {
            var node = new cc.Node();
            cc.director.getScene().getChildByName("Canvas").addChild(node);
            this._instance = node.addComponent(GuaJiManager_1);
        }
        return this._instance;
    };
    GuaJiManager.prototype.onLoad = function () {
        GuaJiManager_1._instance = this;
        this.jianshi_root = this.node.getChildByName('jianshi_root');
        this.guawi_root = this.node.getChildByName('guawi_root');
        this.shadow_root = this.node.getChildByName('shadow_root');
        this.hit_root = this.node.getChildByName('hit_root');
        this.tuowei_root = this.node.getChildByName('tuowei_root');
        this.res_root = this.node.getChildByName('res_root');
        cc.director.getCollisionManager().enabled = true;
        this.box_pos = cc.find('Canvas/main_ui/Main_Icon_Idle').getPosition();
    };
    GuaJiManager.prototype.start = function () {
        this.schedule(this.startMonster, 3);
        this.startMonster();
    };
    GuaJiManager.prototype.startMonster = function () {
        var heroPos = this.node.getChildByName('hero').getPosition();
        this.createGuaJiMonster(cc.v2(480 + Math.random() * 200 - 100, heroPos.y - 100 + Math.random() * 80 - 80));
        this.createGuaJiMonster(cc.v2(480 + Math.random() * 200 + 100, heroPos.y - 100 + Math.random() * 80 - 80));
    };
    GuaJiManager.prototype.onDestroy = function () {
        GuaJiManager_1._instance = null;
    };
    GuaJiManager.prototype.createGuaJiMonster = function (pos) {
        //随机
        var randIndex = Math.floor(Math.random() * this.prefabs_guaji_monster.length);
        var node = cc.instantiate(this.prefabs_guaji_monster[randIndex]);
        this.guawi_root.addChild(node);
        node.setPosition(pos);
        node.getComponent(GuaJiMonster_1.default).init();
        node.zIndex = -pos.y;
        return node;
    };
    GuaJiManager.prototype.createShadow = function (pos) {
        var node = cc.instantiate(this.prefab_shadow);
        this.shadow_root.addChild(node);
        node.setPosition(pos);
        return node;
    };
    GuaJiManager.prototype.createJianShi = function (pos, dir) {
        var node = cc.instantiate(this.prefab_jianshi);
        this.jianshi_root.addChild(node);
        node.setPosition(pos);
        node.getComponent(GuaJiJianShi_1.default).init(dir, 1);
        return node;
    };
    GuaJiManager.prototype.createPetBullect = function (pos, dir) {
        var node = cc.instantiate(this.prefab_bullect);
        this.jianshi_root.addChild(node);
        node.setPosition(pos);
        node.getComponent(GuaJiJianShi_1.default).init(dir, 2, true);
        return node;
    };
    GuaJiManager.prototype.createHit = function (pos) {
        var node = cc.instantiate(this.prefab_hit);
        this.hit_root.addChild(node);
        node.setPosition(pos);
        var anima = node.getComponent(cc.Animation);
        anima.play();
        anima.on(cc.Animation.EventType.FINISHED, function () {
            node.removeFromParent();
        });
        return node;
    };
    GuaJiManager.prototype.createPetHit = function (pos) {
        var node = cc.instantiate(this.prefab_pet_hit);
        this.hit_root.addChild(node);
        node.setPosition(pos);
        var anima = node.getComponent(cc.Animation);
        anima.play();
        anima.on(cc.Animation.EventType.FINISHED, function () {
            node.removeFromParent();
        });
        return node;
    };
    GuaJiManager.prototype.createTuoWei = function (pos) {
        var node = cc.instantiate(this.prefab_tuowei);
        this.tuowei_root.addChild(node);
        node.setPosition(pos);
        return node;
    };
    GuaJiManager.prototype.createRes = function (propId, pos) {
        var node = cc.instantiate(this.prefab_res);
        this.res_root.addChild(node);
        node.setPosition(pos);
        node.getComponent(GuaJiRes_1.default).init(propId);
        return node;
    };
    //--------------------------GET--------------------------------------------------
    /**
     * 获取指定位置targetPos的指定范围fanwei内靠近城墙最近的cheakNum个敌人
     * @param cheakNum 检测数量
     * @param targetPos 指定的位置，一般是自身位置
     * @param fanwei 指定的检测范围，一般是攻击距离
     * @returns 所有满足条件的敌人
     */
    GuaJiManager.prototype.getMonstersForNearest = function (cheakNum, targetPos, fanwei) {
        if (cheakNum == 0) {
            return null;
        }
        var len = this.guawi_root.childrenCount;
        if (len <= 0) {
            return null;
        }
        //1.先检测在攻击范围内符合攻击单位的敌人
        var attMonsters = [];
        for (var i = 0; i < len; i++) {
            var monster = this.guawi_root.children[i];
            if (monster.getComponent(GuaJiMonster_1.default).getIsCanCheak()) {
                var distance = targetPos.sub(monster.getPosition()).mag();
                if (distance <= fanwei) {
                    attMonsters.push(monster);
                }
            }
        }
        if (attMonsters.length <= 0) {
            return null;
        }
        if (cheakNum >= attMonsters.length) {
            return attMonsters;
        }
        //2.对可以攻击的敌人进行优先级判断,选出cheakNum个目标作为打击单位
        //2.1优先攻击跟城墙最近的单位
        attMonsters.sort(function (a, b) {
            return a.x - b.x;
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
    GuaJiManager.prototype.getCollisionMonster = function (cheakNum, targetPos, fanwei) {
        if (cheakNum == 0) {
            return null;
        }
        var len = this.guawi_root.childrenCount;
        if (len <= 0) {
            return null;
        }
        //1.先检测在攻击范围内符合攻击单位的敌人
        var attMonsters = [];
        for (var i = 0; i < len; i++) {
            var monster = this.guawi_root.children[i];
            if (monster.getComponent(GuaJiMonster_1.default).getIsCanCheak()) {
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
        //2.1优先攻击跟目标位置最近的单位，按照与pos的距离大小进行排列，从小到大
        attMonsters.sort(function (a, b) {
            return a.getPosition().sub(targetPos).mag() - b.getPosition().sub(targetPos).mag();
        });
        attMonsters.splice(cheakNum);
        return attMonsters;
    };
    var GuaJiManager_1;
    GuaJiManager._instance = null;
    __decorate([
        property([cc.Prefab])
    ], GuaJiManager.prototype, "prefabs_guaji_monster", void 0);
    __decorate([
        property(cc.Prefab)
    ], GuaJiManager.prototype, "prefab_jianshi", void 0);
    __decorate([
        property(cc.Prefab)
    ], GuaJiManager.prototype, "prefab_shadow", void 0);
    __decorate([
        property(cc.Prefab)
    ], GuaJiManager.prototype, "prefab_hit", void 0);
    __decorate([
        property(cc.Prefab)
    ], GuaJiManager.prototype, "prefab_pet_hit", void 0);
    __decorate([
        property(cc.Prefab)
    ], GuaJiManager.prototype, "prefab_tuowei", void 0);
    __decorate([
        property(cc.Prefab)
    ], GuaJiManager.prototype, "prefab_bullect", void 0);
    __decorate([
        property(cc.Prefab)
    ], GuaJiManager.prototype, "prefab_res", void 0);
    GuaJiManager = GuaJiManager_1 = __decorate([
        ccclass
    ], GuaJiManager);
    return GuaJiManager;
}(cc.Component));
exports.default = GuaJiManager;

cc._RF.pop();