
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/GuaJi/GuaJiSheShou.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcR3VhSmlcXEd1YUppU2hlU2hvdS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxzREFBcUQ7QUFDckQsc0RBQXNEO0FBQ3RELCtDQUEwQztBQUMxQywrQ0FBMEM7QUFJcEMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBMEMsZ0NBQVk7SUFBdEQ7UUFBQSxxRUFzR0M7UUFwR0csTUFBTTtRQUNOLFdBQUssR0FBYSxJQUFJLENBQUM7UUFDdkIsV0FBVztRQUNYLGdCQUFVLEdBQVksdUJBQVUsQ0FBQyxJQUFJLENBQUM7UUFDdEMsTUFBTTtRQUNOLGtCQUFZLEdBQVEsQ0FBQyxDQUFDO1FBQ3RCLFVBQVU7UUFDVixtQkFBYSxHQUFRLEdBQUcsQ0FBQztRQUN6QixhQUFhO1FBQ2IsZ0JBQVUsR0FBUyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7UUFDM0IsbUJBQWEsR0FBUyxJQUFJLENBQUM7O0lBMEYvQixDQUFDO0lBeEZHLDZCQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsVUFBVSxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDckgsSUFBSSxDQUFDLEtBQUssR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxvQ0FBYSxHQUFiO1FBQ0ksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFdB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dGF0ZSB9IGZyb20gXCIuLi9IZXJvL0dhbWUvSGVyb0NvbmZpZ1wiO1xyXG5pbXBvcnQgeyBLZXlGcmFtZURhdGEgfSBmcm9tIFwiLi4vTW9uc3Rlci9Nb25zdGVyRGF0YVwiO1xyXG5pbXBvcnQgR3VhSmlNYW5hZ2VyIGZyb20gXCIuL0d1YUppTWFuYWdlclwiO1xyXG5pbXBvcnQgR3VhSmlNb25zdGVyIGZyb20gXCIuL0d1YUppTW9uc3RlclwiO1xyXG5cclxuXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEd1YUppU2hlU2hvdSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgLy/pqqjpqrzliqjnlLtcclxuICAgIHNwaW5lOnNwLlNrZWxldG9uPW51bGw7ICAgIFxyXG4gICAgLyoq6Iux6ZuE55qE54q25oCBICovXHJcbiAgICBoZXJvX3N0YXRlOkhlcm9fU3RhdGU9SGVyb19TdGF0ZS5pZGxlO1xyXG4gICAgLy/mlLvlh7vorqHmlbBcclxuICAgIGdvbmdqaV9qaXNodTpudW1iZXI9MTtcclxuICAgIC8qKuaUu+WHu+mXtOmalCAqL1xyXG4gICAgZ29uZ2ppX2ppYW5nZTpudW1iZXI9MC4yO1xyXG4gICAgLyoq5a2Q5by555Sf5oiQ55qE5L2N572uICovXHJcbiAgICBidWxsZXRfcG9zOmNjLlZlYzI9Y2MudjIoKTtcclxuICAgIGlzX2Nhbl9nb25namk6Ym9vbGVhbj10cnVlO1xyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgdGhpcy5idWxsZXRfcG9zPXRoaXMubm9kZS5nZXRQb3NpdGlvbigpLmFkZCh0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2J1bGxlY3QnKS5nZXRQb3NpdGlvbigpLm11bCh0aGlzLm5vZGUuc2NhbGVZKSk7XHJcbiAgICAgICAgdGhpcy5zcGluZT10aGlzLm5vZGUuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcclxuICAgICAgICB0aGlzLnN0YXJ0SWRsZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEJ1bGxlY3RQb3MoKTpjYy5WZWMye1xyXG4gICAgICAgIHJldHVybiB0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKS5hZGQodGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdidWxsZWN0JykuZ2V0UG9zaXRpb24oKS5tdWwodGhpcy5ub2RlLnNjYWxlWSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pKt5pS+5LiA5Liq6aqo6aq85Yqo55S7XHJcbiAgICAgKiBAcGFyYW0gbmFtZSDpqqjpqrzliqjnlLvlkI3np7BcclxuICAgICAqIEBwYXJhbSBpc0xvb3Ag5piv5ZCm5b6q546vXHJcbiAgICAgKiBAcGFyYW0gZGF0YSDmmK/lkKbnm5HlkKzlhbPplK7luKfvvIzlhbPplK7luKfmlbDmja7ljIXlkKvlhbPplK7luKflkI3np7DvvIznm5HlkKzliLDlhbPplK7luKflkI7nmoTlm57osINcclxuICAgICAqIEBwYXJhbSBlbmRDYWxsYmFjayDmkq3mlL7nu5PmnZ/lkI7nmoTlm57osINcclxuICAgICAqL1xyXG4gICAgIHBsYXlTcGluZUFuaW1hdG9uKG5hbWU6c3RyaW5nLGlzTG9vcDpib29sZWFuPWZhbHNlLGRhdGE/OktleUZyYW1lRGF0YSxlbmRDYWxsYmFjaz86RnVuY3Rpb24pe1xyXG4gICAgICAgIGxldCBhbmltYT10aGlzLnNwaW5lLnNldEFuaW1hdGlvbigwLG5hbWUsaXNMb29wKTtcclxuICAgICAgICBpZihkYXRhKXtcclxuICAgICAgICAgICAgdGhpcy5zcGluZS5zZXRUcmFja0V2ZW50TGlzdGVuZXIoYW5pbWEsKGVudHJ5OiBzcC5zcGluZS5UcmFja0VudHJ5LCBldmVudCkgPT57XHJcbiAgICAgICAgICAgICAgICBpZihldmVudC5kYXRhLm5hbWU9PWRhdGEubmFtZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5jYWxsYmFjaygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihlbmRDYWxsYmFjayl7XHJcbiAgICAgICAgICAgIHRoaXMuc3BpbmUuc2V0VHJhY2tDb21wbGV0ZUxpc3RlbmVyKGFuaW1hLChlbnRyeTogc3Auc3BpbmUuVHJhY2tFbnRyeSwgZXZlbnQpID0+e1xyXG4gICAgICAgICAgICAgICAgYW5pbWEubGlzdGVuZXI9bnVsbDtcclxuICAgICAgICAgICAgICAgIGVuZENhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShkdDpudW1iZXIpXHJcbiAgICB7ICAgICAgICAgICAgICBcclxuICAgICAgICB0aGlzLmNoZWNrQXR0YWNrKGR0KTsgICAgICAgICAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjaGVja0F0dGFjayhkdClcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLmlzX2Nhbl9nb25namk9PXRydWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmdvbmdqaV9qaXNodSs9ZHQ7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZ29uZ2ppX2ppc2h1Pj10aGlzLmdvbmdqaV9qaWFuZ2UpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxldCBtb25zdGVyUz1HdWFKaU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNb25zdGVyc0Zvck5lYXJlc3QoMSx0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKSw2NDApO1xyXG4gICAgICAgICAgICAgICAgaWYobW9uc3RlclMpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5byA5aeL5pS75Ye7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydEF0dChtb25zdGVyU1swXSk7XHJcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGFydElkbGUoKXtcclxuICAgICAgICB0aGlzLnBsYXlTcGluZUFuaW1hdG9uKFwiSWRsZVwiLHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0QXR0KG1vbnN0ZXI6Y2MuTm9kZSl7XHJcbiAgICAgICAgdGhpcy5nb25namlfamlzaHU9MDtcclxuICAgICAgICB0aGlzLmlzX2Nhbl9nb25namk9ZmFsc2U7ICAgIFxyXG4gICAgICAgIGxldCBkYXRhPW5ldyBLZXlGcmFtZURhdGEoKTtcclxuICAgICAgICBkYXRhLm5hbWU9XCJBdHRhY2tcIjtcclxuICAgICAgICBkYXRhLmNhbGxiYWNrPSgpPT57XHJcbiAgICAgICAgICAgIHRoaXMuYnVsbGV0X3Bvcz10aGlzLmdldEJ1bGxlY3RQb3MoKTtcclxuICAgICAgICAgICAgbGV0IG1vbnN0ZXJTPUd1YUppTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1vbnN0ZXJzRm9yTmVhcmVzdCgxLHRoaXMubm9kZS5nZXRQb3NpdGlvbigpLDY0MCk7XHJcbiAgICAgICAgICAgIGlmKG1vbnN0ZXJTKXtcclxuICAgICAgICAgICAgICAgIC8v5q2j5Lit5b+DXHJcbiAgICAgICAgICAgICAgICBsZXQgbW9uc3RlclBvcz1tb25zdGVyU1swXS5nZXRDb21wb25lbnQoR3VhSmlNb25zdGVyKS5nZXRKdUppUG9zKClcclxuICAgICAgICAgICAgICAgIGxldCBvZmZzZXRQb3M9bW9uc3RlclBvcy5zdWIodGhpcy5idWxsZXRfcG9zKTtcclxuICAgICAgICAgICAgICAgIGxldCBqaWFuc2hpRGlyPU1hdGguYXRhbjIob2Zmc2V0UG9zLnksb2Zmc2V0UG9zLngpO1xyXG4gICAgICAgICAgICAgICAgLy/oh6rliqjmlLvlh7tcclxuICAgICAgICAgICAgICAgIEd1YUppTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUppYW5TaGkodGhpcy5idWxsZXRfcG9zLGppYW5zaGlEaXIpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGxldCBtb25zdGVyUG9zPW1vbnN0ZXIuZ2V0Q29tcG9uZW50KEd1YUppTW9uc3RlcikuZ2V0SnVKaVBvcygpXHJcbiAgICAgICAgICAgICAgICBsZXQgb2Zmc2V0UG9zPW1vbnN0ZXJQb3Muc3ViKHRoaXMuYnVsbGV0X3Bvcyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgamlhbnNoaURpcj1NYXRoLmF0YW4yKG9mZnNldFBvcy55LG9mZnNldFBvcy54KTtcclxuICAgICAgICAgICAgICAgIC8v6Ieq5Yqo5pS75Ye7XHJcbiAgICAgICAgICAgICAgICBHdWFKaU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVKaWFuU2hpKHRoaXMuYnVsbGV0X3BvcyxqaWFuc2hpRGlyKTtcclxuICAgICAgICAgICAgfSAgICBcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaXNfY2FuX2dvbmdqaT10cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnBsYXlTcGluZUFuaW1hdG9uKFwiQXR0YWNrXCIsZmFsc2UsZGF0YSwoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0SWRsZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==