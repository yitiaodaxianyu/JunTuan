"use strict";
cc._RF.push(module, '2c2a2+OAsFFJI/thLz8q/Vm', 'GuaJiSheShou');
// Scripts/GuaJi/GuaJiSheShou.ts

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
var HeroConfig_1 = require("../Hero/Game/HeroConfig");
var MonsterData_1 = require("../Monster/MonsterData");
var GuaJiManager_1 = require("./GuaJiManager");
var GuaJiMonster_1 = require("./GuaJiMonster");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GuaJiSheShou = /** @class */ (function (_super) {
    __extends(GuaJiSheShou, _super);
    function GuaJiSheShou() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //骨骼动画
        _this.spine = null;
        /**英雄的状态 */
        _this.hero_state = HeroConfig_1.Hero_State.idle;
        //攻击计数
        _this.gongji_jishu = 1;
        /**攻击间隔 */
        _this.gongji_jiange = 0.2;
        /**子弹生成的位置 */
        _this.bullet_pos = cc.v2();
        _this.is_can_gongji = true;
        return _this;
    }
    GuaJiSheShou.prototype.onLoad = function () {
        this.bullet_pos = this.node.getPosition().add(this.node.getChildByName('bullect').getPosition().mul(this.node.scaleY));
        this.spine = this.node.getComponent(sp.Skeleton);
        this.startIdle();
    };
    GuaJiSheShou.prototype.getBullectPos = function () {
        return this.node.getPosition().add(this.node.getChildByName('bullect').getPosition().mul(this.node.scaleY));
    };
    /**
     * 播放一个骨骼动画
     * @param name 骨骼动画名称
     * @param isLoop 是否循环
     * @param data 是否监听关键帧，关键帧数据包含关键帧名称，监听到关键帧后的回调
     * @param endCallback 播放结束后的回调
     */
    GuaJiSheShou.prototype.playSpineAnimaton = function (name, isLoop, data, endCallback) {
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
    GuaJiSheShou.prototype.update = function (dt) {
        this.checkAttack(dt);
    };
    GuaJiSheShou.prototype.checkAttack = function (dt) {
        if (this.is_can_gongji == true) {
            this.gongji_jishu += dt;
            if (this.gongji_jishu >= this.gongji_jiange) {
                var monsterS = GuaJiManager_1.default.getInstance().getMonstersForNearest(1, this.node.getPosition(), 640);
                if (monsterS) {
                    //开始攻击
                    this.startAtt(monsterS[0]);
                }
            }
        }
    };
    GuaJiSheShou.prototype.startIdle = function () {
        this.playSpineAnimaton("Idle", true);
    };
    GuaJiSheShou.prototype.startAtt = function (monster) {
        var _this = this;
        this.gongji_jishu = 0;
        this.is_can_gongji = false;
        var data = new MonsterData_1.KeyFrameData();
        data.name = "Attack";
        data.callback = function () {
            _this.bullet_pos = _this.getBullectPos();
            var monsterS = GuaJiManager_1.default.getInstance().getMonstersForNearest(1, _this.node.getPosition(), 640);
            if (monsterS) {
                //正中心
                var monsterPos = monsterS[0].getComponent(GuaJiMonster_1.default).getJuJiPos();
                var offsetPos = monsterPos.sub(_this.bullet_pos);
                var jianshiDir = Math.atan2(offsetPos.y, offsetPos.x);
                //自动攻击
                GuaJiManager_1.default.getInstance().createJianShi(_this.bullet_pos, jianshiDir);
            }
            else {
                var monsterPos = monster.getComponent(GuaJiMonster_1.default).getJuJiPos();
                var offsetPos = monsterPos.sub(_this.bullet_pos);
                var jianshiDir = Math.atan2(offsetPos.y, offsetPos.x);
                //自动攻击
                GuaJiManager_1.default.getInstance().createJianShi(_this.bullet_pos, jianshiDir);
            }
            _this.is_can_gongji = true;
        };
        this.playSpineAnimaton("Attack", false, data, function () {
            _this.startIdle();
        });
    };
    GuaJiSheShou = __decorate([
        ccclass
    ], GuaJiSheShou);
    return GuaJiSheShou;
}(cc.Component));
exports.default = GuaJiSheShou;

cc._RF.pop();