
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Tower/TowerGift.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '278faZ+Fq5AjLCB2Tc9dtWV', 'TowerGift');
// Scripts/Tower/TowerGift.ts

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
var GameManager_1 = require("../GameManager");
var LanguageManager_1 = require("../multiLanguage/LanguageManager");
var AudioConstants_1 = require("../Sound/AudioConstants");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TowerGift = /** @class */ (function (_super) {
    __extends(TowerGift, _super);
    function TowerGift() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.remain_sec = 5;
        return _this;
    }
    TowerGift.prototype.start = function () {
        var text = this.node.getChildByName('jobLabel');
        text.getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(810006);
        this.schedule(this.countdown, 1);
        this.showCountdown();
    };
    TowerGift.prototype.countdown = function () {
        this.remain_sec--;
        this.showCountdown();
        if (this.remain_sec < 0) {
            this.unschedule(this.countdown);
            this.node.removeFromParent();
        }
    };
    TowerGift.prototype.showCountdown = function () {
        var text = this.node.getChildByName('btnVideo').getChildByName('text');
        text.getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(100030) + "(" + this.remain_sec + ")";
    };
    TowerGift.prototype.clickBtnVideo = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.unschedule(this.countdown);
        // ApkManager.getInstance().showVideo((isTrue:boolean)=>{
        //     if(isTrue){
        //         let level=TowerManager.getTowerLevel()-1;
        //         let list=TowerRewardManager.getInstance().getAdReward(level);
        //         let gm=GameManager.getInstance();
        //         let itemList=new Array();
        //         for(let i=0; i<list.length; i++)
        //         {
        //             let rewardData=list[i];
        //             //可以获得奖品
        //             let item=PropManager.getInstance().createPropItem(rewardData.reward_id,rewardData.reward_num);
        //             PropManager.getInstance().changePropNum(rewardData.reward_id,rewardData.reward_num);
        //             itemList.push(item);
        //         }
        //         gm.showMultipleGetTip(itemList,()=>{
        //             this.node.removeFromParent();
        //         });
        //     }else{
        //         this.schedule(this.countdown,1);
        //     }
        // },VIDEO_TYPE.Ziyuan);        
    };
    TowerGift = __decorate([
        ccclass
    ], TowerGift);
    return TowerGift;
}(cc.Component));
exports.default = TowerGift;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVG93ZXJcXFRvd2VyR2lmdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSw4Q0FBeUM7QUFDekMsb0VBQStEO0FBRS9ELDBEQUFxRDtBQUkvQyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUF1Qyw2QkFBWTtJQUFuRDtRQUFBLHFFQWtEQztRQWhERyxnQkFBVSxHQUFRLENBQUMsQ0FBQzs7SUFnRHhCLENBQUM7SUE5Q2EseUJBQUssR0FBZjtRQUNJLElBQUksSUFBSSxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBQyx5QkFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN4RixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFRCw2QkFBUyxHQUFUO1FBQ0ksSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNyQixJQUFHLElBQUksQ0FBQyxVQUFVLEdBQUMsQ0FBQyxFQUFDO1lBQ2pCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztTQUNoQztJQUNMLENBQUM7SUFFRCxpQ0FBYSxHQUFiO1FBQ0ksSUFBSSxJQUFJLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBQyx5QkFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsR0FBQyxHQUFHLEdBQUMsSUFBSSxDQUFDLFVBQVUsR0FBQyxHQUFHLENBQUM7SUFDcEgsQ0FBQztJQUVELGlDQUFhLEdBQWI7UUFDSSxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsMkJBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwRSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNoQyx5REFBeUQ7UUFDekQsa0JBQWtCO1FBQ2xCLG9EQUFvRDtRQUNwRCx3RUFBd0U7UUFDeEUsNENBQTRDO1FBQzVDLG9DQUFvQztRQUNwQywyQ0FBMkM7UUFDM0MsWUFBWTtRQUNaLHNDQUFzQztRQUN0Qyx1QkFBdUI7UUFDdkIsNkdBQTZHO1FBQzdHLG1HQUFtRztRQUNuRyxtQ0FBbUM7UUFDbkMsWUFBWTtRQUNaLCtDQUErQztRQUMvQyw0Q0FBNEM7UUFDNUMsY0FBYztRQUNkLGFBQWE7UUFDYiwyQ0FBMkM7UUFDM0MsUUFBUTtRQUNSLGdDQUFnQztJQUNwQyxDQUFDO0lBakRnQixTQUFTO1FBRDdCLE9BQU87T0FDYSxTQUFTLENBa0Q3QjtJQUFELGdCQUFDO0NBbERELEFBa0RDLENBbERzQyxFQUFFLENBQUMsU0FBUyxHQWtEbEQ7a0JBbERvQixTQUFTIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFwa01hbmFnZXIgZnJvbSBcIi4uL0Fkcy9BcGtNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFZJREVPX1RZUEUgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IExhbmd1YWdlTWFuYWdlciBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9MYW5ndWFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgUHJvcE1hbmFnZXIgfSBmcm9tIFwiLi4vUHJvcC9Qcm9wTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTb3VuZEluZGV4IH0gZnJvbSBcIi4uL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBUb3dlck1hbmFnZXIgZnJvbSBcIi4vVG93ZXJNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFRvd2VyUmV3YXJkTWFuYWdlciB9IGZyb20gXCIuL1Rvd2VyUmV3YXJkXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvd2VyR2lmdCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgcmVtYWluX3NlYzpudW1iZXI9NTtcclxuXHJcbiAgICBwcm90ZWN0ZWQgc3RhcnQoKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHRleHQ9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdqb2JMYWJlbCcpO1xyXG4gICAgICAgIHRleHQuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9TGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoODEwMDA2KTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlKHRoaXMuY291bnRkb3duLDEpO1xyXG4gICAgICAgIHRoaXMuc2hvd0NvdW50ZG93bigpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvdW50ZG93bigpe1xyXG4gICAgICAgIHRoaXMucmVtYWluX3NlYy0tO1xyXG4gICAgICAgIHRoaXMuc2hvd0NvdW50ZG93bigpO1xyXG4gICAgICAgIGlmKHRoaXMucmVtYWluX3NlYzwwKXtcclxuICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKHRoaXMuY291bnRkb3duKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnJlbW92ZUZyb21QYXJlbnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0NvdW50ZG93bigpe1xyXG4gICAgICAgIGxldCB0ZXh0PXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnYnRuVmlkZW8nKS5nZXRDaGlsZEJ5TmFtZSgndGV4dCcpO1xyXG4gICAgICAgIHRleHQuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9TGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTAwMDMwKStcIihcIit0aGlzLnJlbWFpbl9zZWMrXCIpXCI7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5WaWRlbygpe1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgdGhpcy51bnNjaGVkdWxlKHRoaXMuY291bnRkb3duKTtcclxuICAgICAgICAvLyBBcGtNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1ZpZGVvKChpc1RydWU6Ym9vbGVhbik9PntcclxuICAgICAgICAvLyAgICAgaWYoaXNUcnVlKXtcclxuICAgICAgICAvLyAgICAgICAgIGxldCBsZXZlbD1Ub3dlck1hbmFnZXIuZ2V0VG93ZXJMZXZlbCgpLTE7XHJcbiAgICAgICAgLy8gICAgICAgICBsZXQgbGlzdD1Ub3dlclJld2FyZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRBZFJld2FyZChsZXZlbCk7XHJcbiAgICAgICAgLy8gICAgICAgICBsZXQgZ209R2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICAvLyAgICAgICAgIGxldCBpdGVtTGlzdD1uZXcgQXJyYXkoKTtcclxuICAgICAgICAvLyAgICAgICAgIGZvcihsZXQgaT0wOyBpPGxpc3QubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgLy8gICAgICAgICB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgbGV0IHJld2FyZERhdGE9bGlzdFtpXTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAvL+WPr+S7peiOt+W+l+WlluWTgVxyXG4gICAgICAgIC8vICAgICAgICAgICAgIGxldCBpdGVtPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0ocmV3YXJkRGF0YS5yZXdhcmRfaWQscmV3YXJkRGF0YS5yZXdhcmRfbnVtKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0ocmV3YXJkRGF0YS5yZXdhcmRfaWQscmV3YXJkRGF0YS5yZXdhcmRfbnVtKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICBpdGVtTGlzdC5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIC8vICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICAgZ20uc2hvd011bHRpcGxlR2V0VGlwKGl0ZW1MaXN0LCgpPT57XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgdGhpcy5ub2RlLnJlbW92ZUZyb21QYXJlbnQoKTtcclxuICAgICAgICAvLyAgICAgICAgIH0pO1xyXG4gICAgICAgIC8vICAgICB9ZWxzZXtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy5jb3VudGRvd24sMSk7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9LFZJREVPX1RZUEUuWml5dWFuKTsgICAgICAgIFxyXG4gICAgfVxyXG59XHJcbiJdfQ==