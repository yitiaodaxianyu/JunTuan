
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Boss/BossHpProgressBar.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1d683PiJjVH+5kAU5VxbW+O', 'BossHpProgressBar');
// Scripts/Boss/BossHpProgressBar.ts

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
var MonsterConfigure_1 = require("../Monster/Data/MonsterConfigure");
var MonsterIconManager_1 = require("../Monster/MonsterIconManager");
var LanguageManager_1 = require("../multiLanguage/LanguageManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BossHpProgressBar = /** @class */ (function (_super) {
    __extends(BossHpProgressBar, _super);
    function BossHpProgressBar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sp_hp = [];
        _this.yellow = null;
        _this.next_bar = null;
        /**初始速度 */
        _this.speed = 56;
        /**当前速度 */
        _this.cur_speed = 56;
        /**血条条数 */
        _this.cur_hp_num = 0;
        _this.hp_num_label = null;
        /**最大的血量值 */
        _this.max_hp = 0;
        /**当前的血量值 */
        _this.cur_hp = 0;
        /**每条血条的血量 */
        _this.once_hp = 0;
        /**加速度，死亡时有效 */
        _this.acc_speed = 640;
        return _this;
    }
    BossHpProgressBar.prototype.onLoad = function () {
        this.yellow = this.node.getChildByName('yellow');
        this.hp_num_label = this.node.getChildByName('hpNum').getComponent(cc.Label);
        this.next_bar = this.node.getChildByName('nextBar').getComponent(cc.Sprite);
    };
    BossHpProgressBar.prototype.init = function (maxHp, monsterId, level) {
        this.max_hp = maxHp;
        this.once_hp = this.max_hp / 30;
        this.yellow.width = 0;
        this.setHp(this.max_hp);
        var nameLabel = this.node.getChildByName('name').getComponent(cc.Label);
        nameLabel.string = 'Lv.' + level + ' ' + LanguageManager_1.default.getInstance().getStrByTextId(MonsterConfigure_1.MonsterConfigureManager.getInstance().getNameTextId(monsterId));
        this.node.active = true;
        //图标
        var icon = this.node.getChildByName('icon');
        icon.getComponent(cc.Sprite).spriteFrame = MonsterIconManager_1.MonsterIconManager.getInstance().getSpByMonsterId(monsterId);
        this.cur_speed = this.speed;
    };
    BossHpProgressBar.prototype.setHp = function (num) {
        this.cur_hp = num;
        //直接算出当前的血条数和进度
        var curHpNum = Math.floor(this.cur_hp / this.once_hp);
        if (curHpNum < 0) {
            curHpNum = 0;
        }
        if (curHpNum != this.cur_hp_num) {
            this.yellow.width = this.totalLength;
        }
        this.cur_hp_num = curHpNum;
        var remain = (this.cur_hp - (this.once_hp * curHpNum));
        this.progress = remain / this.once_hp;
        this.hp_num_label.string = 'x' + this.cur_hp_num;
        this.barSprite.spriteFrame = this.sp_hp[this.cur_hp_num % 5];
        if (this.cur_hp_num >= 1) {
            this.next_bar.spriteFrame = this.sp_hp[(this.cur_hp_num - 1) % 5];
        }
        this.next_bar.node.active = this.cur_hp_num >= 1;
    };
    //显示白色色
    BossHpProgressBar.prototype.update = function (dt) {
        var curWidth = this.progress * this.totalLength;
        if (this.yellow.width > curWidth) {
            if (this.cur_hp <= 0) {
                this.cur_speed += dt * this.acc_speed;
            }
            this.yellow.width -= this.cur_speed * dt;
            if (this.yellow.width < curWidth) {
                this.yellow.width = curWidth;
            }
            if (this.yellow.width <= 0) {
                this.node.active = false;
            }
        }
        else if (this.yellow.width < curWidth && this.yellow.width > 0) {
            if (curWidth <= 0) {
                curWidth = 0;
                this.node.active = false;
            }
            this.yellow.width = curWidth;
        }
    };
    __decorate([
        property([cc.SpriteFrame])
    ], BossHpProgressBar.prototype, "sp_hp", void 0);
    __decorate([
        property()
    ], BossHpProgressBar.prototype, "speed", void 0);
    BossHpProgressBar = __decorate([
        ccclass
    ], BossHpProgressBar);
    return BossHpProgressBar;
}(cc.ProgressBar));
exports.default = BossHpProgressBar;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcQm9zc1xcQm9zc0hwUHJvZ3Jlc3NCYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EscUVBQTJFO0FBQzNFLG9FQUFtRTtBQUNuRSxvRUFBK0Q7QUFFekQsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBK0MscUNBQWM7SUFBN0Q7UUFBQSxxRUE0RkM7UUF6RkcsV0FBSyxHQUFrQixFQUFFLENBQUM7UUFDMUIsWUFBTSxHQUFTLElBQUksQ0FBQztRQUNwQixjQUFRLEdBQVcsSUFBSSxDQUFDO1FBQ3hCLFVBQVU7UUFFVixXQUFLLEdBQVEsRUFBRSxDQUFDO1FBQ2hCLFVBQVU7UUFDVixlQUFTLEdBQVEsRUFBRSxDQUFDO1FBQ3BCLFVBQVU7UUFDVixnQkFBVSxHQUFRLENBQUMsQ0FBQztRQUNwQixrQkFBWSxHQUFVLElBQUksQ0FBQztRQUMzQixZQUFZO1FBQ1osWUFBTSxHQUFRLENBQUMsQ0FBQztRQUNoQixZQUFZO1FBQ1osWUFBTSxHQUFRLENBQUMsQ0FBQztRQUNoQixhQUFhO1FBQ2IsYUFBTyxHQUFRLENBQUMsQ0FBQztRQUNqQixlQUFlO1FBQ2YsZUFBUyxHQUFRLEdBQUcsQ0FBQzs7SUF1RXpCLENBQUM7SUFyRUcsa0NBQU0sR0FBTjtRQUVJLElBQUksQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLFlBQVksR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNFLElBQUksQ0FBQyxRQUFRLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUM3RSxDQUFDO0lBRUQsZ0NBQUksR0FBSixVQUFLLEtBQVksRUFBQyxTQUFnQixFQUFDLEtBQVk7UUFDM0MsSUFBSSxDQUFDLE1BQU0sR0FBQyxLQUFLLENBQUM7UUFDbEIsSUFBSSxDQUFDLE9BQU8sR0FBQyxJQUFJLENBQUMsTUFBTSxHQUFDLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBQyxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDeEIsSUFBSSxTQUFTLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN0RSxTQUFTLENBQUMsTUFBTSxHQUFDLEtBQUssR0FBQyxLQUFLLEdBQUMsR0FBRyxHQUFDLHlCQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDLDBDQUF1QixDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQzlJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQztRQUN0QixJQUFJO1FBQ0osSUFBSSxJQUFJLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxHQUFDLHVDQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3RHLElBQUksQ0FBQyxTQUFTLEdBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUM5QixDQUFDO0lBRUQsaUNBQUssR0FBTCxVQUFNLEdBQVU7UUFFWixJQUFJLENBQUMsTUFBTSxHQUFDLEdBQUcsQ0FBQztRQUNoQixlQUFlO1FBQ2YsSUFBSSxRQUFRLEdBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNsRCxJQUFHLFFBQVEsR0FBQyxDQUFDLEVBQUM7WUFDVixRQUFRLEdBQUMsQ0FBQyxDQUFDO1NBQ2Q7UUFDRCxJQUFHLFFBQVEsSUFBRSxJQUFJLENBQUMsVUFBVSxFQUFDO1lBQ3pCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7U0FDdEM7UUFDRCxJQUFJLENBQUMsVUFBVSxHQUFDLFFBQVEsQ0FBQztRQUN6QixJQUFJLE1BQU0sR0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLFFBQVEsR0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUNsQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBQyxHQUFHLEdBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUM3QyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsR0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekQsSUFBRyxJQUFJLENBQUMsVUFBVSxJQUFFLENBQUMsRUFBQztZQUNsQixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsR0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQztTQUMvRDtRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBQyxJQUFJLENBQUMsVUFBVSxJQUFFLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQsT0FBTztJQUNQLGtDQUFNLEdBQU4sVUFBTyxFQUFFO1FBRUwsSUFBSSxRQUFRLEdBQUMsSUFBSSxDQUFDLFFBQVEsR0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQzVDLElBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUMsUUFBUSxFQUM3QjtZQUNJLElBQUcsSUFBSSxDQUFDLE1BQU0sSUFBRSxDQUFDLEVBQUM7Z0JBQ2QsSUFBSSxDQUFDLFNBQVMsSUFBRSxFQUFFLEdBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQzthQUNyQztZQUNELElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUFFLElBQUksQ0FBQyxTQUFTLEdBQUMsRUFBRSxDQUFDO1lBQ3JDLElBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUMsUUFBUSxFQUM3QjtnQkFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBQyxRQUFRLENBQUM7YUFDOUI7WUFDRCxJQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUFFLENBQUMsRUFBQztnQkFDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUMsS0FBSyxDQUFDO2FBQzFCO1NBQ0o7YUFBSyxJQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFDLFFBQVEsSUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBQyxDQUFDLEVBQ3hEO1lBQ0ksSUFBRyxRQUFRLElBQUUsQ0FBQyxFQUFDO2dCQUNYLFFBQVEsR0FBQyxDQUFDLENBQUM7Z0JBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUMsS0FBSyxDQUFDO2FBQzFCO1lBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUMsUUFBUSxDQUFDO1NBQzlCO0lBQ0wsQ0FBQztJQXhGRDtRQURDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQztvREFDRDtJQUsxQjtRQURDLFFBQVEsRUFBRTtvREFDSztJQVJDLGlCQUFpQjtRQURyQyxPQUFPO09BQ2EsaUJBQWlCLENBNEZyQztJQUFELHdCQUFDO0NBNUZELEFBNEZDLENBNUY4QyxFQUFFLENBQUMsV0FBVyxHQTRGNUQ7a0JBNUZvQixpQkFBaUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHYW1lRWZmZWN0c01hbmFnZXIgfSBmcm9tIFwiLi4vR2FtZS9HYW1lRWZmZWN0c01hbmFnZXJcIjtcclxuaW1wb3J0IHsgTW9uc3RlckNvbmZpZ3VyZU1hbmFnZXIgfSBmcm9tIFwiLi4vTW9uc3Rlci9EYXRhL01vbnN0ZXJDb25maWd1cmVcIjtcclxuaW1wb3J0IHsgTW9uc3Rlckljb25NYW5hZ2VyIH0gZnJvbSBcIi4uL01vbnN0ZXIvTW9uc3Rlckljb25NYW5hZ2VyXCI7XHJcbmltcG9ydCBMYW5ndWFnZU1hbmFnZXIgZnJvbSBcIi4uL211bHRpTGFuZ3VhZ2UvTGFuZ3VhZ2VNYW5hZ2VyXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvc3NIcFByb2dyZXNzQmFyIGV4dGVuZHMgY2MuUHJvZ3Jlc3NCYXIge1xyXG5cclxuICAgIEBwcm9wZXJ0eShbY2MuU3ByaXRlRnJhbWVdKVxyXG4gICAgc3BfaHA6Y2MuU3ByaXRlRnJhbWVbXT1bXTtcclxuICAgIHllbGxvdzpjYy5Ob2RlPW51bGw7XHJcbiAgICBuZXh0X2JhcjpjYy5TcHJpdGU9bnVsbDtcclxuICAgIC8qKuWIneWni+mAn+W6piAqL1xyXG4gICAgQHByb3BlcnR5KClcclxuICAgIHNwZWVkOm51bWJlcj01NjtcclxuICAgIC8qKuW9k+WJjemAn+W6piAqL1xyXG4gICAgY3VyX3NwZWVkOm51bWJlcj01NjtcclxuICAgIC8qKuihgOadoeadoeaVsCAqL1xyXG4gICAgY3VyX2hwX251bTpudW1iZXI9MDtcclxuICAgIGhwX251bV9sYWJlbDpjYy5MYWJlbD1udWxsO1xyXG4gICAgLyoq5pyA5aSn55qE6KGA6YeP5YC8ICovXHJcbiAgICBtYXhfaHA6bnVtYmVyPTA7XHJcbiAgICAvKirlvZPliY3nmoTooYDph4/lgLwgKi9cclxuICAgIGN1cl9ocDpudW1iZXI9MDtcclxuICAgIC8qKuavj+adoeihgOadoeeahOihgOmHjyAqL1xyXG4gICAgb25jZV9ocDpudW1iZXI9MDtcclxuICAgIC8qKuWKoOmAn+W6pu+8jOatu+S6oeaXtuacieaViCAqL1xyXG4gICAgYWNjX3NwZWVkOm51bWJlcj02NDA7ICAgXHJcblxyXG4gICAgb25Mb2FkKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLnllbGxvdz10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3llbGxvdycpO1xyXG4gICAgICAgIHRoaXMuaHBfbnVtX2xhYmVsPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnaHBOdW0nKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIHRoaXMubmV4dF9iYXI9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCduZXh0QmFyJykuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSlcclxuICAgIH1cclxuXHJcbiAgICBpbml0KG1heEhwOm51bWJlcixtb25zdGVySWQ6bnVtYmVyLGxldmVsOm51bWJlcil7XHJcbiAgICAgICAgdGhpcy5tYXhfaHA9bWF4SHA7XHJcbiAgICAgICAgdGhpcy5vbmNlX2hwPXRoaXMubWF4X2hwLzMwO1xyXG4gICAgICAgIHRoaXMueWVsbG93LndpZHRoPTA7XHJcbiAgICAgICAgdGhpcy5zZXRIcCh0aGlzLm1heF9ocCk7ICAgICAgICBcclxuICAgICAgICBsZXQgbmFtZUxhYmVsPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnbmFtZScpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgbmFtZUxhYmVsLnN0cmluZz0nTHYuJytsZXZlbCsnICcrTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoTW9uc3RlckNvbmZpZ3VyZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROYW1lVGV4dElkKG1vbnN0ZXJJZCkpO1xyXG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAvL+Wbvuagh1xyXG4gICAgICAgIGxldCBpY29uPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnaWNvbicpO1xyXG4gICAgICAgIGljb24uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWU9TW9uc3Rlckljb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3BCeU1vbnN0ZXJJZChtb25zdGVySWQpO1xyXG4gICAgICAgIHRoaXMuY3VyX3NwZWVkPXRoaXMuc3BlZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0SHAobnVtOm51bWJlcilcclxuICAgIHtcclxuICAgICAgICB0aGlzLmN1cl9ocD1udW07XHJcbiAgICAgICAgLy/nm7TmjqXnrpflh7rlvZPliY3nmoTooYDmnaHmlbDlkozov5vluqZcclxuICAgICAgICBsZXQgY3VySHBOdW09TWF0aC5mbG9vcih0aGlzLmN1cl9ocC90aGlzLm9uY2VfaHApOyAgICAgICAgXHJcbiAgICAgICAgaWYoY3VySHBOdW08MCl7XHJcbiAgICAgICAgICAgIGN1ckhwTnVtPTA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGN1ckhwTnVtIT10aGlzLmN1cl9ocF9udW0pe1xyXG4gICAgICAgICAgICB0aGlzLnllbGxvdy53aWR0aD10aGlzLnRvdGFsTGVuZ3RoO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmN1cl9ocF9udW09Y3VySHBOdW07XHJcbiAgICAgICAgbGV0IHJlbWFpbj0odGhpcy5jdXJfaHAtKHRoaXMub25jZV9ocCpjdXJIcE51bSkpO1xyXG4gICAgICAgIHRoaXMucHJvZ3Jlc3M9cmVtYWluL3RoaXMub25jZV9ocDtcclxuICAgICAgICB0aGlzLmhwX251bV9sYWJlbC5zdHJpbmc9J3gnK3RoaXMuY3VyX2hwX251bTtcclxuICAgICAgICB0aGlzLmJhclNwcml0ZS5zcHJpdGVGcmFtZT10aGlzLnNwX2hwW3RoaXMuY3VyX2hwX251bSU1XTtcclxuICAgICAgICBpZih0aGlzLmN1cl9ocF9udW0+PTEpe1xyXG4gICAgICAgICAgICB0aGlzLm5leHRfYmFyLnNwcml0ZUZyYW1lPXRoaXMuc3BfaHBbKHRoaXMuY3VyX2hwX251bS0xKSU1XTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5uZXh0X2Jhci5ub2RlLmFjdGl2ZT10aGlzLmN1cl9ocF9udW0+PTE7XHJcbiAgICB9XHJcblxyXG4gICAgLy/mmL7npLrnmb3oibLoibJcclxuICAgIHVwZGF0ZShkdClcclxuICAgIHtcclxuICAgICAgICBsZXQgY3VyV2lkdGg9dGhpcy5wcm9ncmVzcyp0aGlzLnRvdGFsTGVuZ3RoO1xyXG4gICAgICAgIGlmKHRoaXMueWVsbG93LndpZHRoPmN1cldpZHRoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5jdXJfaHA8PTApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJfc3BlZWQrPWR0KnRoaXMuYWNjX3NwZWVkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMueWVsbG93LndpZHRoLT10aGlzLmN1cl9zcGVlZCpkdDsgICAgICAgIFxyXG4gICAgICAgICAgICBpZih0aGlzLnllbGxvdy53aWR0aDxjdXJXaWR0aClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy55ZWxsb3cud2lkdGg9Y3VyV2lkdGg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYodGhpcy55ZWxsb3cud2lkdGg8PTApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNlIGlmKHRoaXMueWVsbG93LndpZHRoPGN1cldpZHRoJiZ0aGlzLnllbGxvdy53aWR0aD4wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoY3VyV2lkdGg8PTApe1xyXG4gICAgICAgICAgICAgICAgY3VyV2lkdGg9MDtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy55ZWxsb3cud2lkdGg9Y3VyV2lkdGg7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==