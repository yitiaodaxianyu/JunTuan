"use strict";
cc._RF.push(module, '093c7sD39FOTrC5TD9epz2M', 'GuaJiPet');
// Scripts/GuaJi/GuaJiPet.ts

"use strict";
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
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
var HeroConfig_1 = require("../Hero/Game/HeroConfig");
var MonsterData_1 = require("../Monster/MonsterData");
var GuaJiManager_1 = require("./GuaJiManager");
var GuaJiMonster_1 = require("./GuaJiMonster");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GuaJiPet = /** @class */ (function (_super) {
    __extends(GuaJiPet, _super);
    function GuaJiPet() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //骨骼动画
        _this.spine = null;
        /**英雄的状态 */
        _this.hero_state = HeroConfig_1.Hero_State.idle;
        //攻击计数
        _this.gongji_jishu = 1;
        /**攻击间隔 */
        _this.gongji_jiange = 0.25;
        /**子弹生成的位置 */
        _this.bullet_pos = cc.v2();
        _this.is_can_gongji = true;
        return _this;
    }
    GuaJiPet.prototype.onLoad = function () {
        this.bullet_pos = this.node.getPosition().add(this.node.getChildByName('bullect').getPosition().mul(this.node.scaleY));
        this.spine = this.node.getComponent(sp.Skeleton);
        this.startIdle();
    };
    /**
     * 播放一个骨骼动画
     * @param name 骨骼动画名称
     * @param isLoop 是否循环
     * @param data 是否监听关键帧，关键帧数据包含关键帧名称，监听到关键帧后的回调
     * @param endCallback 播放结束后的回调
     */
    GuaJiPet.prototype.playSpineAnimaton = function (name, isLoop, data, endCallback) {
        if (isLoop === void 0) { isLoop = false; }
        var anima = this.spine.setAnimation(0, name, isLoop);
        if (data) {
            this.spine.setTrackEventListener(anima, function (entry, event) {
                if (event.data.name == data.name) {
                    data.callback();
                }
            });
        }
        if (endCallback) {
            this.spine.setTrackCompleteListener(anima, function (entry, event) {
                anima.listener = null;
                endCallback();
            });
        }
    };
    GuaJiPet.prototype.update = function (dt) {
        this.checkAttack(dt);
    };
    GuaJiPet.prototype.checkAttack = function (dt) {
        if (this.is_can_gongji == true) {
            this.gongji_jishu += dt;
            if (this.gongji_jishu >= this.gongji_jiange) {
                var monsterS = GuaJiManager_1.default.getInstance().getMonstersForNearest(1, this.node.getPosition(), 640);
                if (monsterS) {
                    //开始攻击
                    this.startAtt(monsterS[0].getComponent(GuaJiMonster_1.default).getJuJiPos());
                }
            }
        }
    };
    GuaJiPet.prototype.startIdle = function () {
        this.playSpineAnimaton("Side_Idle", true);
    };
    GuaJiPet.prototype.startAtt = function (monsterPos) {
        var _this = this;
        this.gongji_jishu = 0;
        this.is_can_gongji = false;
        var data = new MonsterData_1.KeyFrameData();
        data.name = "OnDamaging";
        data.callback = function () {
            //正中心
            var offsetPos = monsterPos.sub(_this.bullet_pos);
            var jianshiDir = Math.atan2(offsetPos.y, offsetPos.x);
            //自动攻击
            var node = GuaJiManager_1.default.getInstance().createPetBullect(_this.bullet_pos, jianshiDir);
            _this.is_can_gongji = true;
        };
        this.playSpineAnimaton("Side_Attack", false, data, function () {
            _this.startIdle();
        });
    };
    GuaJiPet = __decorate([
        ccclass
    ], GuaJiPet);
    return GuaJiPet;
}(cc.Component));
exports.default = GuaJiPet;

cc._RF.pop();