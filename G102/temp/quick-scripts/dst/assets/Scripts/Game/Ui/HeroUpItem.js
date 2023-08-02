
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Game/Ui/HeroUpItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'bad72UFVRVGIrpGS0ROz7Gt', 'HeroUpItem');
// Scripts/Game/Ui/HeroUpItem.ts

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
var HeroBaseInfo_1 = require("../../Hero/Data/HeroBaseInfo");
var HeroManager_1 = require("../../Hero/Data/HeroManager");
var PropManager_1 = require("../../Prop/PropManager");
var LanguageManager_1 = require("../../multiLanguage/LanguageManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var HeroUpItem = /** @class */ (function (_super) {
    __extends(HeroUpItem, _super);
    function HeroUpItem() {
        // LIFE-CYCLE CALLBACKS:
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // onLoad () {}
        _this.labelTip = null;
        _this.labelContent = null;
        _this.labelLvl = null;
        _this.icon = null;
        _this.bg = null;
        _this.headBG = null;
        return _this;
        // update (dt) {}
    }
    HeroUpItem.prototype.start = function () {
    };
    HeroUpItem.prototype.initData = function (n) {
        this.dataType = n;
        var hero = GameManager_1.default.getInstance().all_hero.get(this.dataType);
        var lvN = hero.hero_lvl;
        this.labelLvl.string = "lv" + (lvN + 1);
        this.icon.getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpheadPortraitType(this.dataType);
        this.headBG.getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpFrameByExType(HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getQuality(hero.hero_type) - 1);
        this.bg.getComponent(cc.Sprite).spriteFrame = HeroManager_1.HeroManager.getInstance().getSpriteFrameByName('HeroList_Frame_' + HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getQuality(hero.hero_type) + '_0');
        this.labelTip.string = LanguageManager_1.default.getInstance().getStrByTextId(HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getNameText_ID(this.dataType));
        this.labelContent.string = "下一等级：" + GameManager_1.default.getInstance().herUpContent[hero.hero_type][lvN + 1];
        // this.labelTip.string = GameManager.getInstance().charioTip[n];
        // this.labelContent.string = GameManager.getInstance().charioContent[n];
    };
    HeroUpItem.prototype.getDataType = function () {
        return this.dataType;
    };
    __decorate([
        property(cc.Label)
    ], HeroUpItem.prototype, "labelTip", void 0);
    __decorate([
        property(cc.Label)
    ], HeroUpItem.prototype, "labelContent", void 0);
    __decorate([
        property(cc.Label)
    ], HeroUpItem.prototype, "labelLvl", void 0);
    __decorate([
        property(cc.Node)
    ], HeroUpItem.prototype, "icon", void 0);
    __decorate([
        property(cc.Node)
    ], HeroUpItem.prototype, "bg", void 0);
    __decorate([
        property(cc.Node)
    ], HeroUpItem.prototype, "headBG", void 0);
    HeroUpItem = __decorate([
        ccclass
    ], HeroUpItem);
    return HeroUpItem;
}(cc.Component));
exports.default = HeroUpItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcR2FtZVxcVWlcXEhlcm9VcEl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQix3RUFBd0U7QUFDeEUsbUJBQW1CO0FBQ25CLGtGQUFrRjtBQUNsRiw4QkFBOEI7QUFDOUIsa0ZBQWtGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFbEYsaURBQTRDO0FBQzVDLDZEQUFtRTtBQUNuRSwyREFBMEQ7QUFDMUQsc0RBQXFEO0FBQ3JELHVFQUFrRTtBQUU1RCxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUF3Qyw4QkFBWTtJQUFwRDtRQUdJLHdCQUF3QjtRQUg1QixxRUFvREM7UUEvQ0csZUFBZTtRQUVmLGNBQVEsR0FBYSxJQUFJLENBQUM7UUFHMUIsa0JBQVksR0FBYSxJQUFJLENBQUM7UUFHOUIsY0FBUSxHQUFhLElBQUksQ0FBQztRQUcxQixVQUFJLEdBQVksSUFBSSxDQUFDO1FBR3JCLFFBQUUsR0FBWSxJQUFJLENBQUM7UUFHbkIsWUFBTSxHQUFZLElBQUksQ0FBQzs7UUE2QnZCLGlCQUFpQjtJQUNyQixDQUFDO0lBMUJHLDBCQUFLLEdBQUw7SUFFQSxDQUFDO0lBQ00sNkJBQVEsR0FBZixVQUFnQixDQUFTO1FBQ3JCLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLElBQUksSUFBSSxHQUFHLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDakUsSUFBSSxHQUFHLEdBQVEsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUM3QixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFHeEMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsR0FBRyx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUcvRyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxHQUFHLHlCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsa0JBQWtCLENBQUMsa0NBQW1CLENBQUMsV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvSixJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxHQUFHLHlCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsb0JBQW9CLENBQUMsaUJBQWlCLEdBQUcsa0NBQW1CLENBQUMsV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBSSxJQUFJLENBQUMsQ0FBQztRQUV2TCxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyx5QkFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxrQ0FBbUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDckksSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsT0FBTyxHQUFDLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLEdBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakcsaUVBQWlFO1FBQ2pFLHlFQUF5RTtJQUM3RSxDQUFDO0lBQ00sZ0NBQVcsR0FBbEI7UUFDSSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFFekIsQ0FBQztJQTNDRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO2dEQUNPO0lBRzFCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7b0RBQ1c7SUFHOUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztnREFDTztJQUcxQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzRDQUNHO0lBR3JCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7MENBQ0M7SUFHbkI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs4Q0FDSztJQXRCTixVQUFVO1FBRDlCLE9BQU87T0FDYSxVQUFVLENBb0Q5QjtJQUFELGlCQUFDO0NBcERELEFBb0RDLENBcER1QyxFQUFFLENBQUMsU0FBUyxHQW9EbkQ7a0JBcERvQixVQUFVIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi8uLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBIZXJvQmFzZUluZm9NYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0hlcm8vRGF0YS9IZXJvQmFzZUluZm9cIjtcclxuaW1wb3J0IHsgSGVyb01hbmFnZXIgfSBmcm9tIFwiLi4vLi4vSGVyby9EYXRhL0hlcm9NYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFByb3BNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL1Byb3AvUHJvcE1hbmFnZXJcIjtcclxuaW1wb3J0IExhbmd1YWdlTWFuYWdlciBmcm9tIFwiLi4vLi4vbXVsdGlMYW5ndWFnZS9MYW5ndWFnZU1hbmFnZXJcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIZXJvVXBJdGVtIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcblxyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcblxyXG4gICAgLy8gb25Mb2FkICgpIHt9XHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBsYWJlbFRpcDogY2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIGxhYmVsQ29udGVudDogY2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIGxhYmVsTHZsOiBjYy5MYWJlbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBpY29uOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGJnOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGhlYWRCRzogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBkYXRhVHlwZTogbnVtYmVyO1xyXG5cclxuICAgIHN0YXJ0KCkge1xyXG5cclxuICAgIH1cclxuICAgIHB1YmxpYyBpbml0RGF0YShuOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmRhdGFUeXBlID0gbjtcclxuICAgICAgICBsZXQgaGVybyA9IEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWxsX2hlcm8uZ2V0KHRoaXMuZGF0YVR5cGUpO1xyXG4gICAgICAgIGxldCBsdk46bnVtYmVyPWhlcm8uaGVyb19sdmw7XHJcbiAgICAgICAgdGhpcy5sYWJlbEx2bC5zdHJpbmcgPSBcImx2XCIgKyAobHZOICsgMSk7XHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuaWNvbi5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3BoZWFkUG9ydHJhaXRUeXBlKHRoaXMuZGF0YVR5cGUpO1xyXG4gICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5oZWFkQkcuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNwRnJhbWVCeUV4VHlwZShIZXJvQmFzZUluZm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UXVhbGl0eShoZXJvLmhlcm9fdHlwZSktMSk7XHJcbiAgICAgICAgdGhpcy5iZy5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3ByaXRlRnJhbWVCeU5hbWUoJ0hlcm9MaXN0X0ZyYW1lXycgKyBIZXJvQmFzZUluZm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UXVhbGl0eShoZXJvLmhlcm9fdHlwZSkgKyAgJ18wJyk7XHJcblxyXG4gICAgICAgIHRoaXMubGFiZWxUaXAuc3RyaW5nID0gTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoSGVyb0Jhc2VJbmZvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE5hbWVUZXh0X0lEKHRoaXMuZGF0YVR5cGUpKTtcclxuICAgICAgICB0aGlzLmxhYmVsQ29udGVudC5zdHJpbmcgPSBcIuS4i+S4gOetiee6p++8mlwiK0dhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuaGVyVXBDb250ZW50W2hlcm8uaGVyb190eXBlXVtsdk4rMV07XHJcbiAgICAgICAgLy8gdGhpcy5sYWJlbFRpcC5zdHJpbmcgPSBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYXJpb1RpcFtuXTtcclxuICAgICAgICAvLyB0aGlzLmxhYmVsQ29udGVudC5zdHJpbmcgPSBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYXJpb0NvbnRlbnRbbl07XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0RGF0YVR5cGUoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhVHlwZTtcclxuXHJcbiAgICB9XHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxyXG59XHJcbiJdfQ==