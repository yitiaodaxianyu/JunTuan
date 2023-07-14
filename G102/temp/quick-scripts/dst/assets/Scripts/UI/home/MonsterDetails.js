
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/UI/home/MonsterDetails.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '072b5BN6pdBZ5Y5r9s26w37', 'MonsterDetails');
// Scripts/UI/home/MonsterDetails.ts

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
var MonsterConfigure_1 = require("../../Monster/Data/MonsterConfigure");
var TextLanguage_1 = require("../../multiLanguage/TextLanguage");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MonsterDetails = /** @class */ (function (_super) {
    __extends(MonsterDetails, _super);
    function MonsterDetails() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.btnClose = null;
        _this.bg = null;
        _this.content = null;
        _this.DamageNode = null;
        _this.MStat_TXT = []; //标签名字
        _this.MStat_Frame = []; //标签框
        //资源-图集
        _this.icon_atlas = null;
        _this.Mon = [];
        _this.MonsterDetailsarr = []; //怪物详情列表   按boss   精英   普通 排序
        return _this;
        // update (dt) {}
    }
    MonsterDetails.prototype.start = function () {
        this.btnClose.on(cc.Node.EventType.TOUCH_END, function (event) {
            this.onCloseBtn();
        }, this);
        this.bg.on(cc.Node.EventType.TOUCH_END, function (event) {
            this.onCloseBtn();
        }, this);
    };
    MonsterDetails.prototype.onEnable = function () {
        //生成怪物详情列表
        for (var mon_index = this.Mon.length; mon_index < this.MonsterDetailsarr.length; mon_index++) {
            var MonNode = cc.instantiate(this.DamageNode);
            this.content.addChild(MonNode);
            this.Mon.push(MonNode);
        }
        var monmanger = MonsterConfigure_1.MonsterConfigureManager.getInstance();
        for (var mons_index = 0; mons_index < this.Mon.length; mons_index++) {
            var mymon = this.Mon[mons_index];
            if (mons_index < this.MonsterDetailsarr.length) {
                mymon.active = true;
                var icon = mymon.getChildByName("MStat_Frame_Mask").getChildByName('icon');
                var id = this.MonsterDetailsarr[mons_index].id;
                icon.getComponent(cc.Sprite).spriteFrame = this.icon_atlas.getSpriteFrame("Avatar_Monster_" + id);
                var qiangdu = (monmanger.getStrengthType(id) - 1);
                var MStat_Frame = mymon.getChildByName('MStat_Frame');
                MStat_Frame.getComponent(cc.Sprite).spriteFrame = this.MStat_Frame[qiangdu];
                var MStat_TXT = mymon.getChildByName("Layout").getChildByName('MStat_TXT');
                MStat_TXT.getComponent(cc.Sprite).spriteFrame = this.MStat_TXT[qiangdu];
                var name = mymon.getChildByName("Layout").getChildByName('name');
                var txtcolor = [new cc.Color(92, 157, 237), new cc.Color(205, 158, 255), new cc.Color(255, 79, 75)];
                var Outlinecolor = [new cc.Color(25, 55, 88), new cc.Color(66, 37, 96), new cc.Color(79, 16, 15)];
                name.color = txtcolor[qiangdu];
                name.getComponent(cc.LabelOutline).color = Outlinecolor[qiangdu];
                name.getComponent(TextLanguage_1.default).setTextId(monmanger.getNameTextId(id));
                var describe = mymon.getChildByName('describe');
                describe.getComponent(TextLanguage_1.default).setTextId(monmanger.getIntroTextId(id));
            }
            else {
                mymon.active = false;
            }
        }
    };
    MonsterDetails.prototype.onCloseBtn = function () {
        this.node.active = false;
    };
    __decorate([
        property(cc.Node)
    ], MonsterDetails.prototype, "btnClose", void 0);
    __decorate([
        property(cc.Node)
    ], MonsterDetails.prototype, "bg", void 0);
    __decorate([
        property(cc.Node)
    ], MonsterDetails.prototype, "content", void 0);
    __decorate([
        property(cc.Prefab)
    ], MonsterDetails.prototype, "DamageNode", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], MonsterDetails.prototype, "MStat_TXT", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], MonsterDetails.prototype, "MStat_Frame", void 0);
    __decorate([
        property(cc.SpriteAtlas)
    ], MonsterDetails.prototype, "icon_atlas", void 0);
    MonsterDetails = __decorate([
        ccclass
    ], MonsterDetails);
    return MonsterDetails;
}(cc.Component));
exports.default = MonsterDetails;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVUlcXGhvbWVcXE1vbnN0ZXJEZXRhaWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR2xGLHdFQUE4RTtBQUM5RSxpRUFBNEQ7QUFJdEQsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBNEMsa0NBQVk7SUFBeEQ7UUFBQSxxRUF3RUM7UUFyRUcsY0FBUSxHQUFZLElBQUksQ0FBQztRQUV6QixRQUFFLEdBQVksSUFBSSxDQUFDO1FBRW5CLGFBQU8sR0FBWSxJQUFJLENBQUM7UUFHeEIsZ0JBQVUsR0FBYyxJQUFJLENBQUM7UUFHN0IsZUFBUyxHQUFrQixFQUFFLENBQUEsQ0FBQSxNQUFNO1FBR25DLGlCQUFXLEdBQWtCLEVBQUUsQ0FBQSxDQUFBLEtBQUs7UUFFcEMsT0FBTztRQUVQLGdCQUFVLEdBQWdCLElBQUksQ0FBQztRQUUvQixTQUFHLEdBQVcsRUFBRSxDQUFBO1FBQ2hCLHVCQUFpQixHQUFDLEVBQUUsQ0FBQSxDQUFBLDZCQUE2Qjs7UUFnRGpELGlCQUFpQjtJQUNyQixDQUFDO0lBOUNHLDhCQUFLLEdBQUw7UUFDSSxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUMsVUFBUyxLQUFLO1lBQ3ZELElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQTtRQUNyQixDQUFDLEVBQUMsSUFBSSxDQUFDLENBQUE7UUFDUCxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUMsVUFBUyxLQUFLO1lB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c0RBQ007SUFwQmQsY0FBYztRQURsQyxPQUFPO09BQ2EsY0FBYyxDQXdFbEM7SUFBRCxxQkFBQztDQXhFRCxBQXdFQyxDQXhFMkMsRUFBRSxDQUFDLFNBQVMsR0F3RXZEO2tCQXhFb0IsY0FBYyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuXHJcbmltcG9ydCB7IEhlcm9NYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0hlcm8vRGF0YS9IZXJvTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBNb25zdGVyQ29uZmlndXJlTWFuYWdlciB9IGZyb20gXCIuLi8uLi9Nb25zdGVyL0RhdGEvTW9uc3RlckNvbmZpZ3VyZVwiO1xyXG5pbXBvcnQgVGV4dExhbmd1YWdlIGZyb20gXCIuLi8uLi9tdWx0aUxhbmd1YWdlL1RleHRMYW5ndWFnZVwiO1xyXG5pbXBvcnQgeyBQcm9wTWFuYWdlciB9IGZyb20gXCIuLi8uLi9Qcm9wL1Byb3BNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFVJTWFuYWdlciB9IGZyb20gXCIuLi9VSU1hbmFnZXJcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9uc3RlckRldGFpbHMgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgYnRuQ2xvc2U6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBiZzogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGNvbnRlbnQ6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgRGFtYWdlTm9kZTogY2MuUHJlZmFiID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlRnJhbWUpXHJcbiAgICBNU3RhdF9UWFQ6Y2MuU3ByaXRlRnJhbWVbXT1bXS8v5qCH562+5ZCN5a2XXHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZUZyYW1lKVxyXG4gICAgTVN0YXRfRnJhbWU6Y2MuU3ByaXRlRnJhbWVbXT1bXS8v5qCH562+5qGGXHJcblxyXG4gICAgLy/otYTmupAt5Zu+6ZuGXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlQXRsYXMpXHJcbiAgICBpY29uX2F0bGFzOmNjLlNwcml0ZUF0bGFzPW51bGw7XHJcblxyXG4gICAgTW9uOmNjLk5vZGVbXT1bXVxyXG4gICAgTW9uc3RlckRldGFpbHNhcnI9W10vL+aAqueJqeivpuaDheWIl+ihqCAgIOaMiWJvc3MgICDnsr7oi7EgICDmma7pgJog5o6S5bqPXHJcblxyXG4gICAgXHJcbiAgICBzdGFydCAoKSB7XHJcbiAgICAgICAgdGhpcy5idG5DbG9zZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgICAgICAgICB0aGlzLm9uQ2xvc2VCdG4oKVxyXG4gICAgICAgIH0sdGhpcylcclxuICAgICAgICB0aGlzLmJnLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCxmdW5jdGlvbihldmVudCl7XHJcbiAgICAgICAgICAgIHRoaXMub25DbG9zZUJ0bigpXHJcbiAgICAgICAgfSx0aGlzKVxyXG4gICAgfVxyXG4gICAgb25FbmFibGUoKXtcclxuICAgICAgICAvL+eUn+aIkOaAqueJqeivpuaDheWIl+ihqFxyXG4gICAgICAgIGZvciAobGV0IG1vbl9pbmRleCA9IHRoaXMuTW9uLmxlbmd0aDsgbW9uX2luZGV4IDwgdGhpcy5Nb25zdGVyRGV0YWlsc2Fyci5sZW5ndGg7IG1vbl9pbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGxldCBNb25Ob2RlPWNjLmluc3RhbnRpYXRlKHRoaXMuRGFtYWdlTm9kZSk7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGVudC5hZGRDaGlsZChNb25Ob2RlKTtcclxuICAgICAgICAgICAgdGhpcy5Nb24ucHVzaChNb25Ob2RlKVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbW9ubWFuZ2VyPU1vbnN0ZXJDb25maWd1cmVNYW5hZ2VyLmdldEluc3RhbmNlKClcclxuICAgICAgICBmb3IgKGxldCBtb25zX2luZGV4ID0gMDsgbW9uc19pbmRleCA8IHRoaXMuTW9uLmxlbmd0aDsgbW9uc19pbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGxldCBteW1vbj10aGlzLk1vblttb25zX2luZGV4XVxyXG4gICAgICAgICAgICBpZihtb25zX2luZGV4IDwgdGhpcy5Nb25zdGVyRGV0YWlsc2Fyci5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgbXltb24uYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgICAgIGxldCBpY29uPW15bW9uLmdldENoaWxkQnlOYW1lKFwiTVN0YXRfRnJhbWVfTWFza1wiKS5nZXRDaGlsZEJ5TmFtZSgnaWNvbicpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGlkPXRoaXMuTW9uc3RlckRldGFpbHNhcnJbbW9uc19pbmRleF0uaWRcclxuICAgICAgICAgICAgICAgIGljb24uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWU9dGhpcy5pY29uX2F0bGFzLmdldFNwcml0ZUZyYW1lKFwiQXZhdGFyX01vbnN0ZXJfXCIraWQpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHFpYW5nZHU9KG1vbm1hbmdlci5nZXRTdHJlbmd0aFR5cGUoaWQpLTEpXHJcbiAgICAgICAgICAgICAgICBsZXQgTVN0YXRfRnJhbWU9bXltb24uZ2V0Q2hpbGRCeU5hbWUoJ01TdGF0X0ZyYW1lJyk7XHJcbiAgICAgICAgICAgICAgICBNU3RhdF9GcmFtZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZT10aGlzLk1TdGF0X0ZyYW1lW3FpYW5nZHVdXHJcbiAgICAgICAgICAgICAgICBsZXQgTVN0YXRfVFhUPW15bW9uLmdldENoaWxkQnlOYW1lKFwiTGF5b3V0XCIpLmdldENoaWxkQnlOYW1lKCdNU3RhdF9UWFQnKTtcclxuICAgICAgICAgICAgICAgIE1TdGF0X1RYVC5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZT10aGlzLk1TdGF0X1RYVFtxaWFuZ2R1XVxyXG4gICAgICAgICAgICAgICAgbGV0IG5hbWU9bXltb24uZ2V0Q2hpbGRCeU5hbWUoXCJMYXlvdXRcIikuZ2V0Q2hpbGRCeU5hbWUoJ25hbWUnKTtcclxuICAgICAgICAgICAgICAgIGxldCB0eHRjb2xvcj1bbmV3IGNjLkNvbG9yKDkyLCAxNTcsIDIzNyksbmV3IGNjLkNvbG9yKDIwNSwgMTU4LCAyNTUpLG5ldyBjYy5Db2xvcigyNTUsIDc5LCA3NSldXHJcbiAgICAgICAgICAgICAgICBsZXQgT3V0bGluZWNvbG9yPVtuZXcgY2MuQ29sb3IoMjUsIDU1LCA4OCksbmV3IGNjLkNvbG9yKDY2LCAzNywgOTYpLG5ldyBjYy5Db2xvcig3OSwgMTYsIDE1KV1cclxuICAgICAgICAgICAgICAgIG5hbWUuY29sb3I9dHh0Y29sb3JbcWlhbmdkdV1cclxuICAgICAgICAgICAgICAgIG5hbWUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsT3V0bGluZSkuY29sb3I9T3V0bGluZWNvbG9yW3FpYW5nZHVdXHJcbiAgICAgICAgICAgICAgICBuYW1lLmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnNldFRleHRJZChtb25tYW5nZXIuZ2V0TmFtZVRleHRJZChpZCkpXHJcbiAgICAgICAgICAgICAgICBsZXQgZGVzY3JpYmU9bXltb24uZ2V0Q2hpbGRCeU5hbWUoJ2Rlc2NyaWJlJyk7XHJcbiAgICAgICAgICAgICAgICBkZXNjcmliZS5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zZXRUZXh0SWQobW9ubWFuZ2VyLmdldEludHJvVGV4dElkKGlkKSlcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBteW1vbi5hY3RpdmU9ZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIG9uQ2xvc2VCdG4oKXtcclxuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlPWZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge31cclxufVxyXG4iXX0=