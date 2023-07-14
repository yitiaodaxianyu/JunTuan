
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/GuaJi/GuaJiManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcR3VhSmlcXEd1YUppTWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQ0FBMEM7QUFDMUMsK0NBQTBDO0FBQzFDLHVDQUFrQztBQUc1QixJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUEwQyxnQ0FBWTtJQUF0RDtRQUFBLHFFQWdRQztRQTdQRywyQkFBcUIsR0FBYSxFQUFFLENBQUM7UUFHckMsb0JBQWMsR0FBVyxJQUFJLENBQUM7UUFHOUIsbUJBQWEsR0FBVyxJQUFJLENBQUM7UUFHN0IsZ0JBQVUsR0FBVyxJQUFJLENBQUM7UUFHMUIsb0JBQWMsR0FBVyxJQUFJLENBQUM7UUFHOUIsbUJBQWEsR0FBVyxJQUFJLENBQUM7UUFHN0Isb0JBQWMsR0FBVyxJQUFJLENBQUM7UUFHOUIsZ0JBQVUsR0FBVyxJQUFJLENBQUM7UUFFMUIsOEJBQThCO1FBQzlCLDhCQUE4QjtRQUU5QixrQkFBWSxHQUFTLElBQUksQ0FBQztRQUMxQixnQkFBVSxHQUFTLElBQUksQ0FBQztRQUN4QixpQkFBVyxHQUFTLElBQUksQ0FBQztRQUN6QixjQUFRLEdBQVMsSUFBSSxDQUFDO1FBQ3RCLGlCQUFXLEdBQVMsSUFBSSxDQUFDO1FBQ3pCLGNBQVEsR0FBUyxJQUFJLENBQUM7UUFDdEIsVUFBVTtRQUNWLGdCQUFVLEdBQVEsRUFBRSxDQUFDO1FBRXJCLGFBQU8sR0FBUyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQzs7SUEwTi9CLENBQUM7cUJBaFFvQixZQUFZO0lBMkNmLHdCQUFXLEdBQXpCO1FBRUksSUFBRyxJQUFJLENBQUMsU0FBUyxJQUFFLElBQUksRUFDdkI7WUFDSSxJQUFJLElBQUksR0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUs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VyxDQUFDO0lBQ3ZCLENBQUM7O0lBdk5jLHNCQUFTLEdBQWlCLElBQUksQ0FBQztJQXJDOUM7UUFEQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7K0RBQ2U7SUFHckM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzt3REFDVTtJQUc5QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO3VEQUNTO0lBRzdCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7b0RBQ007SUFHMUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzt3REFDVTtJQUc5QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO3VEQUNTO0lBRzdCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7d0RBQ1U7SUFHOUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztvREFDTTtJQXhCVCxZQUFZO1FBRGhDLE9BQU87T0FDYSxZQUFZLENBZ1FoQztJQUFELG1CQUFDO0NBaFFELEFBZ1FDLENBaFF5QyxFQUFFLENBQUMsU0FBUyxHQWdRckQ7a0JBaFFvQixZQUFZIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEd1YUppSmlhblNoaSBmcm9tIFwiLi9HdWFKaUppYW5TaGlcIjtcclxuaW1wb3J0IEd1YUppTW9uc3RlciBmcm9tIFwiLi9HdWFKaU1vbnN0ZXJcIjtcclxuaW1wb3J0IEd1YUppUmVzIGZyb20gXCIuL0d1YUppUmVzXCI7XHJcblxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHdWFKaU1hbmFnZXIgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShbY2MuUHJlZmFiXSlcclxuICAgIHByZWZhYnNfZ3VhamlfbW9uc3RlcjpjYy5QcmVmYWJbXT1bXTtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgcHJlZmFiX2ppYW5zaGk6Y2MuUHJlZmFiPW51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIHByZWZhYl9zaGFkb3c6Y2MuUHJlZmFiPW51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIHByZWZhYl9oaXQ6Y2MuUHJlZmFiPW51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIHByZWZhYl9wZXRfaGl0OmNjLlByZWZhYj1udWxsO1xyXG4gICAgXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgcHJlZmFiX3R1b3dlaTpjYy5QcmVmYWI9bnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgcHJlZmFiX2J1bGxlY3Q6Y2MuUHJlZmFiPW51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIHByZWZhYl9yZXM6Y2MuUHJlZmFiPW51bGw7XHJcblxyXG4gICAgLy8gQHByb3BlcnR5KFtjYy5TcHJpdGVGcmFtZV0pXHJcbiAgICAvLyBzcF9yZXM6Y2MuU3ByaXRlRnJhbWVbXT1bXTtcclxuXHJcbiAgICBqaWFuc2hpX3Jvb3Q6Y2MuTm9kZT1udWxsO1xyXG4gICAgZ3Vhd2lfcm9vdDpjYy5Ob2RlPW51bGw7XHJcbiAgICBzaGFkb3dfcm9vdDpjYy5Ob2RlPW51bGw7XHJcbiAgICBoaXRfcm9vdDpjYy5Ob2RlPW51bGw7XHJcbiAgICB0dW93ZWlfcm9vdDpjYy5Ob2RlPW51bGw7XHJcbiAgICByZXNfcm9vdDpjYy5Ob2RlPW51bGw7XHJcbiAgICAvKirog4zmma/np7vpgJ8gKi9cclxuICAgIGJnX3NwZWVkX3g6bnVtYmVyPTQwO1xyXG5cclxuICAgIGJveF9wb3M6Y2MuVmVjMj1jYy52MigwLDApO1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogR3VhSmlNYW5hZ2VyID0gbnVsbDtcclxuXHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOkd1YUppTWFuYWdlclxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuX2luc3RhbmNlPT1udWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IG5vZGU9bmV3IGNjLk5vZGUoKTtcclxuICAgICAgICAgICAgY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKS5nZXRDaGlsZEJ5TmFtZShcIkNhbnZhc1wiKS5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2U9bm9kZS5hZGRDb21wb25lbnQoR3VhSmlNYW5hZ2VyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgR3VhSmlNYW5hZ2VyLl9pbnN0YW5jZT10aGlzO1xyXG4gICAgICAgIHRoaXMuamlhbnNoaV9yb290PXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnamlhbnNoaV9yb290Jyk7XHJcbiAgICAgICAgdGhpcy5ndWF3aV9yb290PXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnZ3Vhd2lfcm9vdCcpO1xyXG4gICAgICAgIHRoaXMuc2hhZG93X3Jvb3Q9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdzaGFkb3dfcm9vdCcpO1xyXG4gICAgICAgIHRoaXMuaGl0X3Jvb3Q9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdoaXRfcm9vdCcpO1xyXG4gICAgICAgIHRoaXMudHVvd2VpX3Jvb3Q9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCd0dW93ZWlfcm9vdCcpO1xyXG4gICAgICAgIHRoaXMucmVzX3Jvb3Q9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdyZXNfcm9vdCcpOyAgICAgICAgXHJcbiAgICAgICAgY2MuZGlyZWN0b3IuZ2V0Q29sbGlzaW9uTWFuYWdlcigpLmVuYWJsZWQ9dHJ1ZTsgICAgICAgIFxyXG4gICAgICAgIHRoaXMuYm94X3Bvcz1jYy5maW5kKCdDYW52YXMvbWFpbl91aS9NYWluX0ljb25fSWRsZScpLmdldFBvc2l0aW9uKCk7ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgc3RhcnQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLnN0YXJ0TW9uc3RlciwzKTtcclxuICAgICAgICB0aGlzLnN0YXJ0TW9uc3RlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0TW9uc3Rlcigpe1xyXG4gICAgICAgIGxldCBoZXJvUG9zPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnaGVybycpLmdldFBvc2l0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVHdWFKaU1vbnN0ZXIoY2MudjIoNDgwK01hdGgucmFuZG9tKCkqMjAwLTEwMCxoZXJvUG9zLnktMTAwK01hdGgucmFuZG9tKCkqODAtODApKVxyXG4gICAgICAgIHRoaXMuY3JlYXRlR3VhSmlNb25zdGVyKGNjLnYyKDQ4MCtNYXRoLnJhbmRvbSgpKjIwMCsxMDAsaGVyb1Bvcy55LTEwMCtNYXRoLnJhbmRvbSgpKjgwLTgwKSlcclxuICAgIH1cclxuXHJcbiAgICBvbkRlc3Ryb3koKVxyXG4gICAgeyAgICAgICAgXHJcbiAgICAgICAgR3VhSmlNYW5hZ2VyLl9pbnN0YW5jZT1udWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUd1YUppTW9uc3Rlcihwb3M6Y2MuVmVjMik6Y2MuTm9kZXtcclxuICAgICAgICAvL+maj+aculxyXG4gICAgICAgIGxldCByYW5kSW5kZXg9TWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKnRoaXMucHJlZmFic19ndWFqaV9tb25zdGVyLmxlbmd0aCk7XHJcbiAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUodGhpcy5wcmVmYWJzX2d1YWppX21vbnN0ZXJbcmFuZEluZGV4XSk7XHJcbiAgICAgICAgdGhpcy5ndWF3aV9yb290LmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgIG5vZGUuc2V0UG9zaXRpb24ocG9zKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChHdWFKaU1vbnN0ZXIpLmluaXQoKTtcclxuICAgICAgICBub2RlLnpJbmRleD0tcG9zLnk7XHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlU2hhZG93KHBvczpjYy5WZWMyKTpjYy5Ob2Rle1xyXG4gICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKHRoaXMucHJlZmFiX3NoYWRvdyk7XHJcbiAgICAgICAgdGhpcy5zaGFkb3dfcm9vdC5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICBub2RlLnNldFBvc2l0aW9uKHBvcyk7XHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlSmlhblNoaShwb3M6Y2MuVmVjMixkaXI6bnVtYmVyKTpjYy5Ob2Rle1xyXG4gICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKHRoaXMucHJlZmFiX2ppYW5zaGkpO1xyXG4gICAgICAgIHRoaXMuamlhbnNoaV9yb290LmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgIG5vZGUuc2V0UG9zaXRpb24ocG9zKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChHdWFKaUppYW5TaGkpLmluaXQoZGlyLDEpO1xyXG4gICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZVBldEJ1bGxlY3QocG9zOmNjLlZlYzIsZGlyOm51bWJlcik6Y2MuTm9kZXtcclxuICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZSh0aGlzLnByZWZhYl9idWxsZWN0KTtcclxuICAgICAgICB0aGlzLmppYW5zaGlfcm9vdC5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICBub2RlLnNldFBvc2l0aW9uKHBvcyk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoR3VhSmlKaWFuU2hpKS5pbml0KGRpciwyLHRydWUpO1xyXG4gICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUhpdChwb3M6Y2MuVmVjMik6Y2MuTm9kZXtcclxuICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZSh0aGlzLnByZWZhYl9oaXQpO1xyXG4gICAgICAgIHRoaXMuaGl0X3Jvb3QuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgbm9kZS5zZXRQb3NpdGlvbihwb3MpO1xyXG4gICAgICAgIGxldCBhbmltYT1ub2RlLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xyXG4gICAgICAgIGFuaW1hLnBsYXkoKTtcclxuICAgICAgICBhbmltYS5vbihjYy5BbmltYXRpb24uRXZlbnRUeXBlLkZJTklTSEVELCgpPT57XHJcbiAgICAgICAgICAgIG5vZGUucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlUGV0SGl0KHBvczpjYy5WZWMyKTpjYy5Ob2Rle1xyXG4gICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKHRoaXMucHJlZmFiX3BldF9oaXQpO1xyXG4gICAgICAgIHRoaXMuaGl0X3Jvb3QuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgbm9kZS5zZXRQb3NpdGlvbihwb3MpO1xyXG4gICAgICAgIGxldCBhbmltYT1ub2RlLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xyXG4gICAgICAgIGFuaW1hLnBsYXkoKTtcclxuICAgICAgICBhbmltYS5vbihjYy5BbmltYXRpb24uRXZlbnRUeXBlLkZJTklTSEVELCgpPT57XHJcbiAgICAgICAgICAgIG5vZGUucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlVHVvV2VpKHBvczpjYy5WZWMyKTpjYy5Ob2Rle1xyXG4gICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKHRoaXMucHJlZmFiX3R1b3dlaSk7XHJcbiAgICAgICAgdGhpcy50dW93ZWlfcm9vdC5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICBub2RlLnNldFBvc2l0aW9uKHBvcyk7XHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlUmVzKHByb3BJZDpudW1iZXIscG9zOmNjLlZlYzIpe1xyXG4gICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKHRoaXMucHJlZmFiX3Jlcyk7XHJcbiAgICAgICAgdGhpcy5yZXNfcm9vdC5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICBub2RlLnNldFBvc2l0aW9uKHBvcyk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoR3VhSmlSZXMpLmluaXQocHJvcElkKTtcclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgIH1cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tR0VULS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5oyH5a6a5L2N572udGFyZ2V0UG9z55qE5oyH5a6a6IyD5Zu0ZmFud2Vp5YaF6Z2g6L+R5Z+O5aKZ5pyA6L+R55qEY2hlYWtOdW3kuKrmlYzkurpcclxuICAgICAqIEBwYXJhbSBjaGVha051bSDmo4DmtYvmlbDph49cclxuICAgICAqIEBwYXJhbSB0YXJnZXRQb3Mg5oyH5a6a55qE5L2N572u77yM5LiA6Iis5piv6Ieq6Lqr5L2N572uXHJcbiAgICAgKiBAcGFyYW0gZmFud2VpIOaMh+WumueahOajgOa1i+iMg+WbtO+8jOS4gOiIrOaYr+aUu+WHu+i3neemu1xyXG4gICAgICogQHJldHVybnMg5omA5pyJ5ruh6Laz5p2h5Lu255qE5pWM5Lq6XHJcbiAgICAgKi9cclxuICAgIGdldE1vbnN0ZXJzRm9yTmVhcmVzdChjaGVha051bTpudW1iZXIsdGFyZ2V0UG9zOmNjLlZlYzIsZmFud2VpOm51bWJlcik6Y2MuTm9kZVtdXHJcbiAgICB7XHJcbiAgICAgICAgaWYoY2hlYWtOdW09PTApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGxlbj10aGlzLmd1YXdpX3Jvb3QuY2hpbGRyZW5Db3VudDtcclxuICAgICAgICBpZihsZW48PTApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8xLuWFiOajgOa1i+WcqOaUu+WHu+iMg+WbtOWGheespuWQiOaUu+WHu+WNleS9jeeahOaVjOS6ulxyXG4gICAgICAgIGxldCBhdHRNb25zdGVyczpjYy5Ob2RlW109W107ICAgICAgICBcclxuICAgICAgICBmb3IobGV0IGk9MDtpPGxlbjsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IG1vbnN0ZXI9dGhpcy5ndWF3aV9yb290LmNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICBpZihtb25zdGVyLmdldENvbXBvbmVudChHdWFKaU1vbnN0ZXIpLmdldElzQ2FuQ2hlYWsoKSl7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGlzdGFuY2U9dGFyZ2V0UG9zLnN1Yihtb25zdGVyLmdldFBvc2l0aW9uKCkpLm1hZygpO1xyXG4gICAgICAgICAgICAgICAgaWYoZGlzdGFuY2U8PWZhbndlaSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhdHRNb25zdGVycy5wdXNoKG1vbnN0ZXIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGF0dE1vbnN0ZXJzLmxlbmd0aDw9MClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihjaGVha051bT49YXR0TW9uc3RlcnMubGVuZ3RoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGF0dE1vbnN0ZXJzO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLzIu5a+55Y+v5Lul5pS75Ye755qE5pWM5Lq66L+b6KGM5LyY5YWI57qn5Yik5patLOmAieWHumNoZWFrTnVt5Liq55uu5qCH5L2c5Li65omT5Ye75Y2V5L2NXHJcbiAgICAgICAgLy8yLjHkvJjlhYjmlLvlh7vot5/ln47lopnmnIDov5HnmoTljZXkvY1cclxuICAgICAgICBhdHRNb25zdGVycy5zb3J0KChhOmNjLk5vZGUsYjpjYy5Ob2RlKT0+e1xyXG4gICAgICAgICAgICByZXR1cm4gYS54LWIueDtcclxuICAgICAgICB9KTsgICAgICAgIFxyXG4gICAgICAgIGF0dE1vbnN0ZXJzLnNwbGljZShjaGVha051bSk7ICAgICAgICBcclxuICAgICAgICByZXR1cm4gYXR0TW9uc3RlcnM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAvL+iOt+WPluaMh+WumuS9jee9rnRhcmdldFBvc+eahOaMh+WumuiMg+WbtGZhbndlaeWGhWNoZWFrTnVt5Liq5pWM5Lq6XHJcbiAgICAgKiBAcGFyYW0gY2hlYWtOdW0g5qOA5rWL5pWw6YeP77yM5bCP5LqOMOihqOekuuaJgOacie+8jOWmgi0xXHJcbiAgICAgKiBAcGFyYW0gdGFyZ2V0UG9zIOebruagh+S9jee9rlxyXG4gICAgICogQHBhcmFtIGZhbndlaSDojIPlm7RcclxuICAgICAqIEByZXR1cm5zIOaJgOacieespuWQiOadoeS7tueahOaVjOS6ulxyXG4gICAgICovICAgIFxyXG4gICAgZ2V0Q29sbGlzaW9uTW9uc3RlcihjaGVha051bTpudW1iZXIsdGFyZ2V0UG9zOmNjLlZlYzIsZmFud2VpOm51bWJlcil7XHJcbiAgICAgICAgaWYoY2hlYWtOdW09PTApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGxlbj10aGlzLmd1YXdpX3Jvb3QuY2hpbGRyZW5Db3VudDtcclxuICAgICAgICBpZihsZW48PTApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8xLuWFiOajgOa1i+WcqOaUu+WHu+iMg+WbtOWGheespuWQiOaUu+WHu+WNleS9jeeahOaVjOS6ulxyXG4gICAgICAgIGxldCBhdHRNb25zdGVyczpjYy5Ob2RlW109W107ICAgICAgICBcclxuICAgICAgICBmb3IobGV0IGk9MDtpPGxlbjsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IG1vbnN0ZXI9dGhpcy5ndWF3aV9yb290LmNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICBpZihtb25zdGVyLmdldENvbXBvbmVudChHdWFKaU1vbnN0ZXIpLmdldElzQ2FuQ2hlYWsoKSl7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGlzdGFuY2U9dGFyZ2V0UG9zLnN1Yihtb25zdGVyLmdldFBvc2l0aW9uKCkpLm1hZygpO1xyXG4gICAgICAgICAgICAgICAgaWYoZGlzdGFuY2U8PWZhbndlaSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhdHRNb25zdGVycy5wdXNoKG1vbnN0ZXIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihhdHRNb25zdGVycy5sZW5ndGg8PTApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/lsI/kuo4w77yM5Luj6KGo6KaB5omA5pyJXHJcbiAgICAgICAgaWYoY2hlYWtOdW08MClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBhdHRNb25zdGVycztcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/lpoLmnpzmo4DmtYvliLDnmoTmlbDph4/msqHmnInopoHmo4DmtYvnmoTpgqPkuYjlpJrvvIznm7TmjqXov5Tlm57lhajpg6guXHJcbiAgICAgICAgaWYoY2hlYWtOdW0+PWF0dE1vbnN0ZXJzLmxlbmd0aClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBhdHRNb25zdGVycztcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8yLjHkvJjlhYjmlLvlh7vot5/nm67moIfkvY3nva7mnIDov5HnmoTljZXkvY3vvIzmjInnhafkuI5wb3PnmoTot53nprvlpKflsI/ov5vooYzmjpLliJfvvIzku47lsI/liLDlpKdcclxuICAgICAgICBhdHRNb25zdGVycy5zb3J0KChhOmNjLk5vZGUsYjpjYy5Ob2RlKT0+e1xyXG4gICAgICAgICAgICByZXR1cm4gYS5nZXRQb3NpdGlvbigpLnN1Yih0YXJnZXRQb3MpLm1hZygpLWIuZ2V0UG9zaXRpb24oKS5zdWIodGFyZ2V0UG9zKS5tYWcoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBhdHRNb25zdGVycy5zcGxpY2UoY2hlYWtOdW0pO1xyXG4gICAgICAgIHJldHVybiBhdHRNb25zdGVycztcclxuICAgIH1cclxufVxyXG4iXX0=