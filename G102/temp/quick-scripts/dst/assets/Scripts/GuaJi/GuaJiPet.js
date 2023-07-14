
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/GuaJi/GuaJiPet.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcR3VhSmlcXEd1YUppUGV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWxGLHNEQUFxRDtBQUNyRCxzREFBc0Q7QUFDdEQsK0NBQTBDO0FBQzFDLCtDQUEwQztBQUlwQyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFzQyw0QkFBWTtJQUFsRDtRQUFBLHFFQXNGQztRQXBGRyxNQUFNO1FBQ04sV0FBSyxHQUFhLElBQUksQ0FBQztRQUN2QixXQUFXO1FBQ1gsZ0JBQVUsR0FBWSx1QkFBVSxDQUFDLElBQUksQ0FBQztRQUN0QyxNQUFNO1FBQ04sa0JBQVksR0FBUSxDQUFDLENBQUM7UUFDdEIsVUFBVTtRQUNWLG1CQUFhLEdBQVEsSUFBSSxDQUFDO1FBQzFCLGFBQWE7UUFDYixnQkFBVSxHQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUMzQixtQkFBYSxHQUFTLElBQUksQ0FBQzs7SUEwRS9CLENBQUM7SUF4RUcseUJBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxVQUFVLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNySCxJQUFJLENBQUMsS0FBSyxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNGLG9DQUFpQixHQUFqQixVQUFrQixJQUFXLEVBQUMsTUFBb0IsRUFBQyxJQUFrQixFQUFDLFdBQXFCO1FBQTdELHVCQUFBLEVBQUEsY0FBb0I7UUFDL0MsSUFBSSxLQUFLLEdBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFDLElBQUksRUFBQyxNQUFNLENBQUMsQ0FBQztRQUNqRCxJQUFHLElBQUksRUFBQztZQUNKLElBQUksQ0FBQyxLQUFLLENBQUMscUJBQXFCLENBQUMsS0FBSyxFQUFDLFVBQUMsS0FBMEIsRUFBRSxLQUFLO2dCQUNyRSxJQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFFLElBQUksQ0FBQyxJQUFJLEVBQUM7b0JBQzFCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztpQkFDbkI7WUFDTCxDQUFDLENBQUMsQ0FBQTtTQUNMO1FBQ0QsSUFBRyxXQUFXLEVBQUM7WUFDWCxJQUFJLENBQUMsS0FBSyxDQUFDLHdCQUF3QixDQUFDLEtBQUssRUFBQyxVQUFDLEtBQTBCLEVBQUUsS0FBSztnQkFDeEUsS0FBSyxDQUFDLFFBQVEsR0FBQyxJQUFJLENBQUM7Z0JBQ3BCLFdBQVcsRUFBRSxDQUFDO1lBQ2xCLENBQUMsQ0FBQyxDQUFBO1NBQ0w7SUFDTCxDQUFDO0lBRUQseUJBQU0sR0FBTixVQUFPLEVBQVM7UUFFWixJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFFTyw4QkFBVyxHQUFuQixVQUFvQixFQUFFO1FBRWxCLElBQUcsSUFBSSxDQUFDLGFBQWEsSUFBRSxJQUFJLEVBQzNCO1lBQ0ksSUFBSSxDQUFDLFlBQVksSUFBRSxFQUFFLENBQUM7WUFDdEIsSUFBRyxJQUFJLENBQUMsWUFBWSxJQUFFLElBQUksQ0FBQyxhQUFhLEVBQ3hDO2dCQUNJLElBQUksUUFBUSxHQUFDLHNCQUFZLENBQUMsV0FBVyxFQUFFLENBQUMscUJBQXFCLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzdGLElBQUcsUUFBUSxFQUFDO29CQUNSLE1BQU07b0JBQ04sSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLHNCQUFZLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO2lCQUN0RTthQUNKO1NBQ0o7SUFDTCxDQUFDO0lBRUQsNEJBQVMsR0FBVDtRQUNJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVELDJCQUFRLEdBQVIsVUFBUyxVQUFrQjtRQUEzQixpQkFnQkM7UUFmRyxJQUFJLENBQUMsWUFBWSxHQUFDLENBQUMsQ0FBQztRQUNwQixJQUFJLENBQUMsYUFBYSxHQUFDLEtBQUssQ0FBQztRQUN6QixJQUFJLElBQUksR0FBQyxJQUFJLDBCQUFZLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsSUFBSSxHQUFDLFlBQVksQ0FBQztRQUN2QixJQUFJLENBQUMsUUFBUSxHQUFDO1lBQ1YsS0FBSztZQUNMLElBQUksU0FBUyxHQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzlDLElBQUksVUFBVSxHQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEQsTUFBTTtZQUNMLElBQUksSUFBSSxHQUFDLHNCQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsS0FBSSxDQUFDLFVBQVUsRUFBQyxVQUFVLENBQUMsQ0FBQztZQUNqRixLQUFJLENBQUMsYUFBYSxHQUFDLElBQUksQ0FBQztRQUM1QixDQUFDLENBQUE7UUFDRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsYUFBYSxFQUFDLEtBQUssRUFBQyxJQUFJLEVBQUM7WUFDNUMsS0FBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQXJGZ0IsUUFBUTtRQUQ1QixPQUFPO09BQ2EsUUFBUSxDQXNGNUI7SUFBRCxlQUFDO0NBdEZELEFBc0ZDLENBdEZxQyxFQUFFLENBQUMsU0FBUyxHQXNGakQ7a0JBdEZvQixRQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuaW1wb3J0IHsgSGVyb19TdGF0ZSB9IGZyb20gXCIuLi9IZXJvL0dhbWUvSGVyb0NvbmZpZ1wiO1xyXG5pbXBvcnQgeyBLZXlGcmFtZURhdGEgfSBmcm9tIFwiLi4vTW9uc3Rlci9Nb25zdGVyRGF0YVwiO1xyXG5pbXBvcnQgR3VhSmlNYW5hZ2VyIGZyb20gXCIuL0d1YUppTWFuYWdlclwiO1xyXG5pbXBvcnQgR3VhSmlNb25zdGVyIGZyb20gXCIuL0d1YUppTW9uc3RlclwiO1xyXG5cclxuXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEd1YUppUGV0IGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICAvL+mqqOmqvOWKqOeUu1xyXG4gICAgc3BpbmU6c3AuU2tlbGV0b249bnVsbDsgICAgXHJcbiAgICAvKiroi7Hpm4TnmoTnirbmgIEgKi9cclxuICAgIGhlcm9fc3RhdGU6SGVyb19TdGF0ZT1IZXJvX1N0YXRlLmlkbGU7XHJcbiAgICAvL+aUu+WHu+iuoeaVsFxyXG4gICAgZ29uZ2ppX2ppc2h1Om51bWJlcj0xO1xyXG4gICAgLyoq5pS75Ye76Ze06ZqUICovXHJcbiAgICBnb25namlfamlhbmdlOm51bWJlcj0wLjI1O1xyXG4gICAgLyoq5a2Q5by555Sf5oiQ55qE5L2N572uICovXHJcbiAgICBidWxsZXRfcG9zOmNjLlZlYzI9Y2MudjIoKTtcclxuICAgIGlzX2Nhbl9nb25namk6Ym9vbGVhbj10cnVlO1xyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgdGhpcy5idWxsZXRfcG9zPXRoaXMubm9kZS5nZXRQb3NpdGlvbigpLmFkZCh0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2J1bGxlY3QnKS5nZXRQb3NpdGlvbigpLm11bCh0aGlzLm5vZGUuc2NhbGVZKSk7XHJcbiAgICAgICAgdGhpcy5zcGluZT10aGlzLm5vZGUuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcclxuICAgICAgICB0aGlzLnN0YXJ0SWRsZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pKt5pS+5LiA5Liq6aqo6aq85Yqo55S7XHJcbiAgICAgKiBAcGFyYW0gbmFtZSDpqqjpqrzliqjnlLvlkI3np7BcclxuICAgICAqIEBwYXJhbSBpc0xvb3Ag5piv5ZCm5b6q546vXHJcbiAgICAgKiBAcGFyYW0gZGF0YSDmmK/lkKbnm5HlkKzlhbPplK7luKfvvIzlhbPplK7luKfmlbDmja7ljIXlkKvlhbPplK7luKflkI3np7DvvIznm5HlkKzliLDlhbPplK7luKflkI7nmoTlm57osINcclxuICAgICAqIEBwYXJhbSBlbmRDYWxsYmFjayDmkq3mlL7nu5PmnZ/lkI7nmoTlm57osINcclxuICAgICAqL1xyXG4gICAgIHBsYXlTcGluZUFuaW1hdG9uKG5hbWU6c3RyaW5nLGlzTG9vcDpib29sZWFuPWZhbHNlLGRhdGE/OktleUZyYW1lRGF0YSxlbmRDYWxsYmFjaz86RnVuY3Rpb24pe1xyXG4gICAgICAgIGxldCBhbmltYT10aGlzLnNwaW5lLnNldEFuaW1hdGlvbigwLG5hbWUsaXNMb29wKTtcclxuICAgICAgICBpZihkYXRhKXtcclxuICAgICAgICAgICAgdGhpcy5zcGluZS5zZXRUcmFja0V2ZW50TGlzdGVuZXIoYW5pbWEsKGVudHJ5OiBzcC5zcGluZS5UcmFja0VudHJ5LCBldmVudCkgPT57XHJcbiAgICAgICAgICAgICAgICBpZihldmVudC5kYXRhLm5hbWU9PWRhdGEubmFtZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5jYWxsYmFjaygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihlbmRDYWxsYmFjayl7XHJcbiAgICAgICAgICAgIHRoaXMuc3BpbmUuc2V0VHJhY2tDb21wbGV0ZUxpc3RlbmVyKGFuaW1hLChlbnRyeTogc3Auc3BpbmUuVHJhY2tFbnRyeSwgZXZlbnQpID0+e1xyXG4gICAgICAgICAgICAgICAgYW5pbWEubGlzdGVuZXI9bnVsbDtcclxuICAgICAgICAgICAgICAgIGVuZENhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShkdDpudW1iZXIpXHJcbiAgICB7ICAgICAgICAgICAgICBcclxuICAgICAgICB0aGlzLmNoZWNrQXR0YWNrKGR0KTsgICAgICAgICAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjaGVja0F0dGFjayhkdClcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLmlzX2Nhbl9nb25namk9PXRydWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmdvbmdqaV9qaXNodSs9ZHQ7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZ29uZ2ppX2ppc2h1Pj10aGlzLmdvbmdqaV9qaWFuZ2UpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxldCBtb25zdGVyUz1HdWFKaU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNb25zdGVyc0Zvck5lYXJlc3QoMSx0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKSw2NDApO1xyXG4gICAgICAgICAgICAgICAgaWYobW9uc3RlclMpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5byA5aeL5pS75Ye7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydEF0dChtb25zdGVyU1swXS5nZXRDb21wb25lbnQoR3VhSmlNb25zdGVyKS5nZXRKdUppUG9zKCkpO1xyXG4gICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRJZGxlKCl7XHJcbiAgICAgICAgdGhpcy5wbGF5U3BpbmVBbmltYXRvbihcIlNpZGVfSWRsZVwiLHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0QXR0KG1vbnN0ZXJQb3M6Y2MuVmVjMil7XHJcbiAgICAgICAgdGhpcy5nb25namlfamlzaHU9MDtcclxuICAgICAgICB0aGlzLmlzX2Nhbl9nb25namk9ZmFsc2U7ICAgIFxyXG4gICAgICAgIGxldCBkYXRhPW5ldyBLZXlGcmFtZURhdGEoKTtcclxuICAgICAgICBkYXRhLm5hbWU9XCJPbkRhbWFnaW5nXCI7XHJcbiAgICAgICAgZGF0YS5jYWxsYmFjaz0oKT0+e1xyXG4gICAgICAgICAgICAvL+ato+S4reW/g1xyXG4gICAgICAgICAgICBsZXQgb2Zmc2V0UG9zPW1vbnN0ZXJQb3Muc3ViKHRoaXMuYnVsbGV0X3Bvcyk7XHJcbiAgICAgICAgICAgIGxldCBqaWFuc2hpRGlyPU1hdGguYXRhbjIob2Zmc2V0UG9zLnksb2Zmc2V0UG9zLngpO1xyXG4gICAgICAgICAgIC8v6Ieq5Yqo5pS75Ye7XHJcbiAgICAgICAgICAgIGxldCBub2RlPUd1YUppTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVBldEJ1bGxlY3QodGhpcy5idWxsZXRfcG9zLGppYW5zaGlEaXIpO1xyXG4gICAgICAgICAgICB0aGlzLmlzX2Nhbl9nb25namk9dHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wbGF5U3BpbmVBbmltYXRvbihcIlNpZGVfQXR0YWNrXCIsZmFsc2UsZGF0YSwoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0SWRsZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==