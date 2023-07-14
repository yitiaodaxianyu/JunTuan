"use strict";
cc._RF.push(module, 'c22e5FizZ5DCrdMhm4OhW6Y', 'ActiveDart');
// Scripts/Hero/Game/RenZhe/ActiveDart.ts

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
var FightingManager_1 = require("../../../Game/FightingManager");
var Bullect_1 = require("../Bullect");
var HeroConfig_1 = require("../HeroConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ActiveDart = /** @class */ (function (_super) {
    __extends(ActiveDart, _super);
    function ActiveDart() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.att_tuowei = null;
        _this.tuo_wei = null;
        _this.collision_num = 0;
        _this.remain_time = 0;
        return _this;
    }
    ActiveDart.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        _super.prototype.addCollisionMonsterListen.call(this, this.onCollisionMonster);
        this.addInitFinishedListen(this.onInitFinished);
    };
    ActiveDart.prototype.onInitFinished = function () {
        this.tuo_wei = cc.instantiate(this.att_tuowei);
        this.tuo_wei.setPosition(this.node.getPosition());
        FightingManager_1.default.getInstance().node.addChild(this.tuo_wei);
        this.collision_num = 0;
        this.spin_speed = 600;
        this.node.scale = 1;
        this.remain_time = this.gongji_data.hero_data.getSkillValue3(HeroConfig_1.SkillType.Active);
        this.unscheduleAllCallbacks();
    };
    ActiveDart.prototype.destroySelf = function () {
        _super.prototype.destroySelf.call(this);
        if (this.tuo_wei) {
            cc.tween(this.tuo_wei).delay(this.tuo_wei.getComponent(cc.MotionStreak).fadeTime).removeSelf().start();
            this.tuo_wei = null;
        }
    };
    ActiveDart.prototype.onCollisionMonster = function (monsterTs) {
    };
    ActiveDart.prototype.update = function (dt) {
        _super.prototype.update.call(this, dt);
        if (this.tuo_wei) {
            var pos = this.node.getPosition();
            //添加在子弹前面
            var distance = 64;
            var xx = pos.x + Math.cos(this.move_direction) * distance;
            var yy = pos.y + Math.sin(this.move_direction) * distance;
            this.tuo_wei.setPosition(cc.v2(xx, yy));
        }
    };
    __decorate([
        property(cc.Prefab)
    ], ActiveDart.prototype, "att_tuowei", void 0);
    ActiveDart = __decorate([
        ccclass
    ], ActiveDart);
    return ActiveDart;
}(Bullect_1.default));
exports.default = ActiveDart;

cc._RF.pop();