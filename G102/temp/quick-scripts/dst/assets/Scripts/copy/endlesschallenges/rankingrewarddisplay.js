
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/copy/endlesschallenges/rankingrewarddisplay.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'fa60eUkre1J8pfet2E/BGNz', 'rankingrewarddisplay');
// Scripts/copy/endlesschallenges/rankingrewarddisplay.ts

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
var GameManager_1 = require("../../GameManager");
var PropManager_1 = require("../../Prop/PropManager");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var UIComponent_1 = require("../../UI/UIComponent");
var BossWeeklyReward_1 = require("./BossWeeklyReward");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var rankingrewarddisplay = /** @class */ (function (_super) {
    __extends(rankingrewarddisplay, _super);
    function rankingrewarddisplay() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.item = [];
        _this.RewardGrade = -1; //排名  默认-1     
        return _this;
        // LIFE-CYCLE CALLBACKS:
        // onLoad () {}
        // start () {
        // }
        // update (dt) {}
    }
    // Administrator:
    // 1：第1名
    // 2：第2名
    // 3：第3名
    // 4：4-10名
    // 5：11-50名
    // 6：51-100名
    // 7：100名+
    // boss:number[]=[20003,40006,20003,10002]
    rankingrewarddisplay.prototype.initUi = function (type) {
        // GameManager.getInstance().music_manager.playMusic(MusicIndex.BGM_TJP);
        // FollowManager.getInstance().followEvent(Follow_Type.铁匠铺打开次数);
        if (type == -1) {
            this.RewardGrade = 7;
        }
        else if (type == 1) {
            this.RewardGrade = 1;
        }
        else if (type == 2) {
            this.RewardGrade = 2;
        }
        else if (type == 3) {
            this.RewardGrade = 3;
        }
        else if (type <= 10 && type >= 4) {
            this.RewardGrade = 4;
        }
        else if (type <= 50 && type >= 11) {
            this.RewardGrade = 5;
        }
        else if (type <= 100 && type >= 51) {
            this.RewardGrade = 6;
        }
        var rewardData = BossWeeklyReward_1.BossWeeklyRewardManager.getInstance().getFirstRewardArr(this.RewardGrade);
        for (var index = 0; index < this.item.length; index++) {
            if (index < rewardData.length) {
                var items = PropManager_1.PropManager.getInstance().createPropItem(rewardData[index].reward_id, rewardData[index].reward_num);
                this.item[index].active = true;
                items.parent = this.item[index];
            }
            else {
                this.item[index].active = false;
            }
        }
    };
    rankingrewarddisplay.prototype.shanchu = function () {
        for (var index = 0; index < this.item.length; index++) {
            if (this.item[index].childrenCount > 0) {
                this.item[index].children[0].destroy();
            }
        }
    };
    rankingrewarddisplay.prototype.clickBtnClose = function () {
        this.shanchu();
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.onClose();
    };
    __decorate([
        property(cc.Node)
    ], rankingrewarddisplay.prototype, "item", void 0);
    rankingrewarddisplay = __decorate([
        ccclass
    ], rankingrewarddisplay);
    return rankingrewarddisplay;
}(UIComponent_1.default));
exports.default = rankingrewarddisplay;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcY29weVxcZW5kbGVzc2NoYWxsZW5nZXNcXHJhbmtpbmdyZXdhcmRkaXNwbGF5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWxGLGlEQUE0QztBQUc1QyxzREFBcUQ7QUFDckQsNkRBQXdEO0FBQ3hELG9EQUErQztBQUMvQyx1REFBNkQ7QUFFdkQsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBa0Qsd0NBQVc7SUFBN0Q7UUFBQSxxRUFrRUM7UUFoRUcsVUFBSSxHQUFjLEVBQUUsQ0FBQTtRQUNwQixpQkFBVyxHQUFRLENBQUMsQ0FBQyxDQUFBLENBQUEsZUFBZTs7UUFzRHBDLHdCQUF3QjtRQUV4QixlQUFlO1FBRWYsYUFBYTtRQUViLElBQUk7UUFFSixpQkFBaUI7SUFDckIsQ0FBQztJQTlERyxpQkFBaUI7SUFDakIsUUFBUTtJQUNSLFFBQVE7SUFDUixRQUFRO0lBQ1IsVUFBVTtJQUNWLFdBQVc7SUFDWCxZQUFZO0lBQ1osVUFBVTtJQUNWLDBDQUEwQztJQUMxQyxxQ0FBTSxHQUFOLFVBQU8sSUFBSTtRQUNQLHlFQUF5RTtRQUN6RSxnRUFBZ0U7UUFDaEUsSUFBRyxJQUFJLElBQUUsQ0FBQyxDQUFDLEVBQUM7WUFDUixJQUFJLENBQUMsV0FBVyxHQUFDLENBQUMsQ0FBQTtTQUNyQjthQUFLLElBQUcsSUFBSSxJQUFFLENBQUMsRUFBQztZQUNiLElBQUksQ0FBQyxXQUFXLEdBQUMsQ0FBQyxDQUFBO1NBQ3JCO2FBQUssSUFBRyxJQUFJLElBQUUsQ0FBQyxFQUFDO1lBQ2IsSUFBSSxDQUFDLFdBQVcsR0FBQyxDQUFDLENBQUE7U0FDckI7YUFBSyxJQUFHLElBQUksSUFBRSxDQUFDLEVBQUM7WUFDYixJQUFJLENBQUMsV0FBVyxHQUFDLENBQUMsQ0FBQTtTQUNyQjthQUFLLElBQUcsSUFBSSxJQUFFLEVBQUUsSUFBRSxJQUFJLElBQUUsQ0FBQyxFQUFDO1lBQ3ZCLElBQUksQ0FBQyxXQUFXLEdBQUMsQ0FBQyxDQUFBO1NBQ3JCO2FBQUssSUFBRyxJQUFJLElBQUUsRUFBRSxJQUFFLElBQUksSUFBRSxFQUFFLEVBQUM7WUFDeEIsSUFBSSxDQUFDLFdBQVcsR0FBQyxDQUFDLENBQUE7U0FDckI7YUFBSyxJQUFHLElBQUksSUFBRSxHQUFHLElBQUUsSUFBSSxJQUFFLEVBQUUsRUFBQztZQUN6QixJQUFJLENBQUMsV0FBVyxHQUFDLENBQUMsQ0FBQTtTQUNyQjtRQUVELElBQUksVUFBVSxHQUFFLDBDQUF1QixDQUFDLFdBQVcsRUFBRSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQTtRQUN6RixLQUFLLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDbkQsSUFBRyxLQUFLLEdBQUMsVUFBVSxDQUFDLE1BQU0sRUFBQztnQkFDdkIsSUFBSSxLQUFLLEdBQUMseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsRUFBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQzdHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQTtnQkFDNUIsS0FBSyxDQUFDLE1BQU0sR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO2FBQ2hDO2lCQUFJO2dCQUNELElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxHQUFDLEtBQUssQ0FBQTthQUNoQztTQUNKO0lBQ0wsQ0FBQztJQUNELHNDQUFPLEdBQVA7UUFDSSxLQUFLLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDbkQsSUFBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLGFBQWEsR0FBQyxDQUFDLEVBQUM7Z0JBQ2hDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFBO2FBQ3pDO1NBQ0o7SUFDTCxDQUFDO0lBRUQsNENBQWEsR0FBYjtRQUVJLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUNkLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQywyQkFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BFLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBdEREO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7c0RBQ0U7SUFGSCxvQkFBb0I7UUFEeEMsT0FBTztPQUNhLG9CQUFvQixDQWtFeEM7SUFBRCwyQkFBQztDQWxFRCxBQWtFQyxDQWxFaUQscUJBQVcsR0FrRTVEO2tCQWxFb0Isb0JBQW9CIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi8uLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgVGV4dExhbmd1YWdlIGZyb20gXCIuLi8uLi9tdWx0aUxhbmd1YWdlL1RleHRMYW5ndWFnZVwiO1xyXG5pbXBvcnQgeyBQcm9wSWQgfSBmcm9tIFwiLi4vLi4vUHJvcC9Qcm9wQ29uZmlnXCI7XHJcbmltcG9ydCB7IFByb3BNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL1Byb3AvUHJvcE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU291bmRJbmRleCB9IGZyb20gXCIuLi8uLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgVUlDb21wb25lbnQgZnJvbSBcIi4uLy4uL1VJL1VJQ29tcG9uZW50XCI7XHJcbmltcG9ydCB7IEJvc3NXZWVrbHlSZXdhcmRNYW5hZ2VyIH0gZnJvbSBcIi4vQm9zc1dlZWtseVJld2FyZFwiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHJhbmtpbmdyZXdhcmRkaXNwbGF5IGV4dGVuZHMgVUlDb21wb25lbnQgeyAgICBcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgaXRlbTogY2MuTm9kZVtdID0gW11cclxuICAgIFJld2FyZEdyYWRlOm51bWJlcj0tMS8v5o6S5ZCNICDpu5jorqQtMSAgICAgXHJcbiAgICAvLyBBZG1pbmlzdHJhdG9yOlxyXG4gICAgLy8gMe+8muesrDHlkI1cclxuICAgIC8vIDLvvJrnrKwy5ZCNXHJcbiAgICAvLyAz77ya56ysM+WQjVxyXG4gICAgLy8gNO+8mjQtMTDlkI1cclxuICAgIC8vIDXvvJoxMS01MOWQjVxyXG4gICAgLy8gNu+8mjUxLTEwMOWQjVxyXG4gICAgLy8gN++8mjEwMOWQjStcclxuICAgIC8vIGJvc3M6bnVtYmVyW109WzIwMDAzLDQwMDA2LDIwMDAzLDEwMDAyXVxyXG4gICAgaW5pdFVpKHR5cGUpIHsvL+aOkuWQjSAg6buY6K6kLTEgIFxyXG4gICAgICAgIC8vIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkubXVzaWNfbWFuYWdlci5wbGF5TXVzaWMoTXVzaWNJbmRleC5CR01fVEpQKTtcclxuICAgICAgICAvLyBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu6ZOB5Yyg6ZO65omT5byA5qyh5pWwKTtcclxuICAgICAgICBpZih0eXBlPT0tMSl7XHJcbiAgICAgICAgICAgIHRoaXMuUmV3YXJkR3JhZGU9N1xyXG4gICAgICAgIH1lbHNlIGlmKHR5cGU9PTEpe1xyXG4gICAgICAgICAgICB0aGlzLlJld2FyZEdyYWRlPTFcclxuICAgICAgICB9ZWxzZSBpZih0eXBlPT0yKXtcclxuICAgICAgICAgICAgdGhpcy5SZXdhcmRHcmFkZT0yXHJcbiAgICAgICAgfWVsc2UgaWYodHlwZT09Myl7XHJcbiAgICAgICAgICAgIHRoaXMuUmV3YXJkR3JhZGU9M1xyXG4gICAgICAgIH1lbHNlIGlmKHR5cGU8PTEwJiZ0eXBlPj00KXtcclxuICAgICAgICAgICAgdGhpcy5SZXdhcmRHcmFkZT00XHJcbiAgICAgICAgfWVsc2UgaWYodHlwZTw9NTAmJnR5cGU+PTExKXtcclxuICAgICAgICAgICAgdGhpcy5SZXdhcmRHcmFkZT01XHJcbiAgICAgICAgfWVsc2UgaWYodHlwZTw9MTAwJiZ0eXBlPj01MSl7XHJcbiAgICAgICAgICAgIHRoaXMuUmV3YXJkR3JhZGU9NlxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHJld2FyZERhdGE9IEJvc3NXZWVrbHlSZXdhcmRNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Rmlyc3RSZXdhcmRBcnIodGhpcy5SZXdhcmRHcmFkZSlcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5pdGVtLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBpZihpbmRleDxyZXdhcmREYXRhLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgaXRlbXM9UHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShyZXdhcmREYXRhW2luZGV4XS5yZXdhcmRfaWQscmV3YXJkRGF0YVtpbmRleF0ucmV3YXJkX251bSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLml0ZW1baW5kZXhdLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgICAgICAgICBpdGVtcy5wYXJlbnQ9dGhpcy5pdGVtW2luZGV4XVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXRlbVtpbmRleF0uYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBzaGFuY2h1KCl7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuaXRlbS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgaWYodGhpcy5pdGVtW2luZGV4XS5jaGlsZHJlbkNvdW50PjApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pdGVtW2luZGV4XS5jaGlsZHJlblswXS5kZXN0cm95KCkgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuQ2xvc2UoKS8v5YWz6ZetXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5zaGFuY2h1KClcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIHRoaXMub25DbG9zZSgpO1xyXG4gICAgfVxyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcblxyXG4gICAgLy8gb25Mb2FkICgpIHt9XHJcblxyXG4gICAgLy8gc3RhcnQgKCkge1xyXG5cclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxyXG59XHJcbiJdfQ==