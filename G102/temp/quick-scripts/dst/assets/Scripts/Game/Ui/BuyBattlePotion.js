
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Game/Ui/BuyBattlePotion.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'eb8d9fJkFFOmJdBhBTqFl8W', 'BuyBattlePotion');
// Scripts/Game/Ui/BuyBattlePotion.ts

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
var ApkManager_1 = require("../../Ads/ApkManager");
var Constants_1 = require("../../Constants");
var GameManager_1 = require("../../GameManager");
var TextLanguage_1 = require("../../multiLanguage/TextLanguage");
var Item_1 = require("../../Prop/Data/Item");
var PropConfig_1 = require("../../Prop/PropConfig");
var PropManager_1 = require("../../Prop/PropManager");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var UIComponent_1 = require("../../UI/UIComponent");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BuyBattlePotion = /** @class */ (function (_super) {
    __extends(BuyBattlePotion, _super);
    function BuyBattlePotion() {
        // @property(cc.Label)
        // label: cc.Label = null;
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // @property
        // text: string = 'hello';
        // LIFE-CYCLE CALLBACKS:
        _this.itme = null;
        _this.text = null;
        // onLoad () {}
        _this.type = PropConfig_1.PropId.Gem; //默认金币
        _this.num = 1;
        _this.Potion = 0; //药水：0:红 1:绿 2:蓝
        return _this;
        // update (dt) {}
    }
    BuyBattlePotion.prototype.initUi = function (Potion) {
        this.Potion = Potion;
        // GameManager.getInstance().music_manager.playMusic(MusicIndex.BGM_TJP);
        // FollowManager.getInstance().followEvent(Follow_Type.铁匠铺打开次数);
        if (this.itme.childrenCount > 0) {
            this.itme.children[0].destroy();
        }
        var items = PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.RedPotion, 1);
        this.text.getComponent(TextLanguage_1.default).setTextId(Item_1.ItemManager.getInstance().getDiscripitionTextId(Potion));
        items.parent = this.itme;
    };
    // start () {
    // }
    BuyBattlePotion.prototype.clickBtnAd = function () {
        var _this = this;
        ApkManager_1.default.getInstance().showVideo((function (isTrue) {
            if (isTrue) {
                PropManager_1.PropManager.getInstance().changePropNum(_this.type, -_this.num);
                _this.clickBtnClose();
            }
        }), Constants_1.VIDEO_TYPE.Equip);
    };
    BuyBattlePotion.prototype.clickBtnShow = function () {
        this.clickBtnClose();
    };
    BuyBattlePotion.prototype.clickBtnClose = function () {
        if (this.itme.childrenCount > 0) {
            this.itme.children[0].destroy();
        }
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.onClose();
    };
    __decorate([
        property(cc.Node)
    ], BuyBattlePotion.prototype, "itme", void 0);
    __decorate([
        property(cc.Node)
    ], BuyBattlePotion.prototype, "text", void 0);
    BuyBattlePotion = __decorate([
        ccclass
    ], BuyBattlePotion);
    return BuyBattlePotion;
}(UIComponent_1.default));
exports.default = BuyBattlePotion;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcR2FtZVxcVWlcXEJ1eUJhdHRsZVBvdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVsRixtREFBOEM7QUFDOUMsNkNBQXNEO0FBQ3RELGlEQUE0QztBQUU1QyxpRUFBNEQ7QUFDNUQsNkNBQW1EO0FBQ25ELG9EQUErQztBQUMvQyxzREFBcUQ7QUFDckQsNkRBQXdEO0FBR3hELG9EQUErQztBQUl6QyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUE2QyxtQ0FBVztJQUF4RDtRQUVJLHNCQUFzQjtRQUN0QiwwQkFBMEI7UUFIOUIscUVBd0RDO1FBbkRHLFlBQVk7UUFDWiwwQkFBMEI7UUFFMUIsd0JBQXdCO1FBRXhCLFVBQUksR0FBUyxJQUFJLENBQUE7UUFHakIsVUFBSSxHQUFTLElBQUksQ0FBQTtRQUNqQixlQUFlO1FBQ2YsVUFBSSxHQUFRLG1CQUFNLENBQUMsR0FBRyxDQUFBLENBQUEsTUFBTTtRQUU1QixTQUFHLEdBQVEsQ0FBQyxDQUFBO1FBRVosWUFBTSxHQUFRLENBQUMsQ0FBQSxDQUFBLGdCQUFnQjs7UUFvQy9CLGlCQUFpQjtJQUNyQixDQUFDO0lBcENHLGdDQUFNLEdBQU4sVUFBTyxNQUFNO1FBQ1QsSUFBSSxDQUFDLE1BQU0sR0FBQyxNQUFNLENBQUE7UUFDbEIseUVBQXlFO1FBQ3pFLGdFQUFnRTtRQUNoRSxJQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxHQUFDLENBQUMsRUFBQztZQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtTQUNsQztRQUNELElBQUksS0FBSyxHQUFDLHlCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDLG1CQUFNLENBQUMsU0FBUyxFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLHNCQUFZLENBQUMsQ0FBQyxTQUFTLENBQUMsa0JBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ3hHLEtBQUssQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQTtJQUMxQixDQUFDO0lBRUQsYUFBYTtJQUViLElBQUk7SUFDSixvQ0FBVSxHQUFWO1FBQUEsaUJBT0M7UUFORyxvQkFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFVBQUMsTUFBTTtZQUN2QyxJQUFHLE1BQU0sRUFBQztnQkFDTix5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxLQUFJLENBQUMsSUFBSSxFQUFDLENBQUMsS0FBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUM3RCxLQUFJLENBQUMsYUFBYSxFQUFFLENBQUE7YUFDdkI7UUFDTCxDQUFDLENBQUMsRUFBQyxzQkFBVSxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ3hCLENBQUM7SUFDRCxzQ0FBWSxHQUFaO1FBQ0ksSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFBO0lBQ3hCLENBQUM7SUFDRCx1Q0FBYSxHQUFiO1FBRUksSUFBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsR0FBQyxDQUFDLEVBQUM7WUFDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUE7U0FDbEM7UUFDRCxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsMkJBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwRSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQTNDRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2lEQUNEO0lBR2pCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7aURBQ0Q7SUFiQSxlQUFlO1FBRG5DLE9BQU87T0FDYSxlQUFlLENBd0RuQztJQUFELHNCQUFDO0NBeERELEFBd0RDLENBeEQ0QyxxQkFBVyxHQXdEdkQ7a0JBeERvQixlQUFlIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuaW1wb3J0IEFwa01hbmFnZXIgZnJvbSBcIi4uLy4uL0Fkcy9BcGtNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFZJREVPX1RZUEUsIEdvX1R5cGUgfSBmcm9tIFwiLi4vLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IExhbmd1YWdlTWFuYWdlciBmcm9tIFwiLi4vLi4vbXVsdGlMYW5ndWFnZS9MYW5ndWFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IFRleHRMYW5ndWFnZSBmcm9tIFwiLi4vLi4vbXVsdGlMYW5ndWFnZS9UZXh0TGFuZ3VhZ2VcIjtcclxuaW1wb3J0IHsgSXRlbU1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vUHJvcC9EYXRhL0l0ZW1cIjtcclxuaW1wb3J0IHsgUHJvcElkIH0gZnJvbSBcIi4uLy4uL1Byb3AvUHJvcENvbmZpZ1wiO1xyXG5pbXBvcnQgeyBQcm9wTWFuYWdlciB9IGZyb20gXCIuLi8uLi9Qcm9wL1Byb3BNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFNvdW5kSW5kZXggfSBmcm9tIFwiLi4vLi4vU291bmQvQXVkaW9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgU3RvcmFnZUtleSB9IGZyb20gXCIuLi8uLi9TdG9yYWdlL1N0b3JhZ2VDb25maWdcIjtcclxuaW1wb3J0IHsgVGhlU3RvcmFnZU1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vU3RvcmFnZS9TdG9yYWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgVUlDb21wb25lbnQgZnJvbSBcIi4uLy4uL1VJL1VJQ29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFVJTGF5ZXJMZXZlbCB9IGZyb20gXCIuLi8uLi9VSS9VSUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBVSU1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vVUkvVUlNYW5hZ2VyXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJ1eUJhdHRsZVBvdGlvbiBleHRlbmRzIFVJQ29tcG9uZW50IHtcclxuXHJcbiAgICAvLyBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICAvLyBsYWJlbDogY2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIC8vIEBwcm9wZXJ0eVxyXG4gICAgLy8gdGV4dDogc3RyaW5nID0gJ2hlbGxvJztcclxuXHJcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgaXRtZTpjYy5Ob2RlPW51bGxcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHRleHQ6Y2MuTm9kZT1udWxsXHJcbiAgICAvLyBvbkxvYWQgKCkge31cclxuICAgIHR5cGU6UHJvcElkPVByb3BJZC5HZW0vL+m7mOiupOmHkeW4gVxyXG5cclxuICAgIG51bTpudW1iZXI9MVxyXG5cclxuICAgIFBvdGlvbjpudW1iZXI9MC8v6I2v5rC077yaMDrnuqIgMTrnu78gMjrok51cclxuICAgIGluaXRVaShQb3Rpb24pIHtcclxuICAgICAgICB0aGlzLlBvdGlvbj1Qb3Rpb25cclxuICAgICAgICAvLyBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLm11c2ljX21hbmFnZXIucGxheU11c2ljKE11c2ljSW5kZXguQkdNX1RKUCk7XHJcbiAgICAgICAgLy8gRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLumTgeWMoOmTuuaJk+W8gOasoeaVsCk7XHJcbiAgICAgICAgaWYodGhpcy5pdG1lLmNoaWxkcmVuQ291bnQ+MCl7XHJcbiAgICAgICAgICAgIHRoaXMuaXRtZS5jaGlsZHJlblswXS5kZXN0cm95KClcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGl0ZW1zPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oUHJvcElkLlJlZFBvdGlvbiwxKTtcclxuICAgICAgICB0aGlzLnRleHQuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0VGV4dElkKEl0ZW1NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RGlzY3JpcGl0aW9uVGV4dElkKFBvdGlvbikpO1xyXG4gICAgICAgIGl0ZW1zLnBhcmVudD10aGlzLml0bWVcclxuICAgIH1cclxuXHJcbiAgICAvLyBzdGFydCAoKSB7XHJcbiAgICAgICAgXHJcbiAgICAvLyB9XHJcbiAgICBjbGlja0J0bkFkKCl7XHJcbiAgICAgICAgQXBrTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dWaWRlbygoKGlzVHJ1ZSk9PntcclxuICAgICAgICAgICAgaWYoaXNUcnVlKXtcclxuICAgICAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bSh0aGlzLnR5cGUsLXRoaXMubnVtKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xpY2tCdG5DbG9zZSgpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KSxWSURFT19UWVBFLkVxdWlwKVxyXG4gICAgfVxyXG4gICAgY2xpY2tCdG5TaG93KCl7XHJcbiAgICAgICAgdGhpcy5jbGlja0J0bkNsb3NlKClcclxuICAgIH1cclxuICAgIGNsaWNrQnRuQ2xvc2UoKS8v5YWz6ZetXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5pdG1lLmNoaWxkcmVuQ291bnQ+MCl7XHJcbiAgICAgICAgICAgIHRoaXMuaXRtZS5jaGlsZHJlblswXS5kZXN0cm95KClcclxuICAgICAgICB9XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICB0aGlzLm9uQ2xvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxyXG59XHJcbiJdfQ==