
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/UI/home/AvatarUi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '3c85fWpNr9Pg7b+6mG0sFvs', 'AvatarUi');
// Scripts/UI/home/AvatarUi.ts

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
var GameManager_1 = require("../../GameManager");
var HeroConfig_1 = require("../../Hero/Game/HeroConfig");
var PropManager_1 = require("../../Prop/PropManager");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var UserData_1 = require("../../UserData");
var UIComponent_1 = require("../UIComponent");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var AvatarUi = /** @class */ (function (_super) {
    __extends(AvatarUi, _super);
    function AvatarUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.head_portrait = null;
        _this.head_item = null;
        _this.select = null;
        _this.select_avatar_index = 0;
        return _this;
    }
    AvatarUi.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        this.select_avatar_index = UserData_1.default.getInstance().getUserAvatar();
        this.head_portrait.getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpheadPortraitType(this.select_avatar_index); //HeroManager.getInstance().getSpriteFrameByName('hero'+this.select_avatar_index);
        this.addAvatar();
    };
    AvatarUi.prototype.addAvatar = function () {
        var content = this.node.getChildByName('avatarScroll').getComponent(cc.ScrollView).content;
        for (var i = HeroConfig_1.Hero_Type.ChangMaoShou; i < HeroConfig_1.Hero_Type.Hero_Num; i++) {
            var avatar = cc.instantiate(this.head_item);
            avatar.name = "icon" + i;
            avatar.parent = content;
            // avatar.addComponent(cc.Sprite).spriteFrame=HeroManager.getInstance().getSpriteFrameByName('hero'+i);
            avatar.getChildByName("headPortrait").getComponentInChildren(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpheadPortraitType(i); //HeroManager.getInstance().getSpriteFrameByName('hero'+i);
            var btn = avatar.addComponent(cc.Button);
            // btn.transition=cc.Button.Transition.COLOR;
            // btn.disabledColor=cc.Color.WHITE;
            var clickEvent = new cc.Component.EventHandler();
            clickEvent.target = this.node;
            clickEvent.component = 'AvatarUi';
            clickEvent.handler = 'clickBtnAvatar';
            clickEvent.customEventData = i + '';
            btn.clickEvents.push(clickEvent);
            if (i == this.select_avatar_index) {
                this.select.parent = avatar;
                this.select.setPosition(cc.v2(0, 0));
            }
        }
        // this.scheduleOnce(()=>{
        //     content.getComponent(cc.Layout).enabled=false;
        //     this.select.parent=content;
        //     this.showSelectAvatar();
        // },0.1);        
    };
    AvatarUi.prototype.clickBtnAvatar = function (btn, indexStr) {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        var index = parseInt(indexStr);
        if (this.select_avatar_index != index) {
            this.select_avatar_index = index;
            this.showSelectAvatar();
        }
    };
    AvatarUi.prototype.showSelectAvatar = function () {
        // let spName='TY_TX_0'+this.select_avatar_index;
        // if(this.select_avatar_index>=10)
        // {
        //     spName='TY_TX_'+this.select_avatar_index;
        // }
        // let content=this.node.getChildByName('avatarScroll').getComponent(cc.ScrollView).content;
        // this.select.setPosition(content.children[this.select_avatar_index-1].getPosition());
        this.head_portrait.getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpheadPortraitType(this.select_avatar_index); //HeroManager.getInstance().getSpriteFrameByName('hero'+this.select_avatar_index);
        this.select.parent = this.node.getComponentInChildren(cc.ScrollView).content.getChildByName("icon" + this.select_avatar_index);
        this.select.setPosition(cc.v2(0, 0));
    };
    AvatarUi.prototype.clickBtnOk = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        UserData_1.default.getInstance().saveUserAvatar(this.select_avatar_index + '');
        _super.prototype.onClose.call(this);
    };
    __decorate([
        property(cc.Node)
    ], AvatarUi.prototype, "head_portrait", void 0);
    __decorate([
        property(cc.Node)
    ], AvatarUi.prototype, "head_item", void 0);
    __decorate([
        property(cc.Node)
    ], AvatarUi.prototype, "select", void 0);
    AvatarUi = __decorate([
        ccclass
    ], AvatarUi);
    return AvatarUi;
}(UIComponent_1.default));
exports.default = AvatarUi;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVUlcXGhvbWVcXEF2YXRhclVpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLGlEQUE0QztBQUU1Qyx5REFBdUQ7QUFDdkQsc0RBQXFEO0FBQ3JELDZEQUF3RDtBQUN4RCwyQ0FBc0M7QUFDdEMsOENBQXlDO0FBR25DLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXNDLDRCQUFXO0lBQWpEO1FBQUEscUVBaUZDO1FBOUVHLG1CQUFhLEdBQVMsSUFBSSxDQUFDO1FBRTNCLGVBQVMsR0FBUyxJQUFJLENBQUM7UUFFdkIsWUFBTSxHQUFTLElBQUksQ0FBQztRQUNwQix5QkFBbUIsR0FBUSxDQUFDLENBQUM7O0lBeUVqQyxDQUFDO0lBdkVHLHlCQUFNLEdBQU47UUFDSSxpQkFBTSxNQUFNLFdBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyxtQkFBbUIsR0FBQyxrQkFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ2hFLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLEdBQUcseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQSxDQUFBLGtGQUFrRjtRQUNwTixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFFckIsQ0FBQztJQUVELDRCQUFTLEdBQVQ7UUFFSSxJQUFJLE9BQU8sR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQztRQUN6RixLQUFJLElBQUksQ0FBQyxHQUFDLHNCQUFTLENBQUMsWUFBWSxFQUFF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SyxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsMkJBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwRSxrQkFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEdBQUMsRUFBRSxDQUFDLENBQUM7UUFDbkUsaUJBQU0sT0FBTyxXQUFFLENBQUM7SUFDckIsQ0FBQztJQTVFQTtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO21EQUNTO0lBRTNCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7K0NBQ0s7SUFFdkI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs0Q0FDRTtJQVBILFFBQVE7UUFENUIsT0FBTztPQUNhLFFBQVEsQ0FpRjVCO0lBQUQsZUFBQztDQWpGRCxBQWlGQyxDQWpGcUMscUJBQVcsR0FpRmhEO2tCQWpGb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBHYW1lRGF0YSBmcm9tIFwiLi4vLi4vR2FtZURhdGFcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi8uLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBIZXJvTWFuYWdlciB9IGZyb20gXCIuLi8uLi9IZXJvL0RhdGEvSGVyb01hbmFnZXJcIjtcclxuaW1wb3J0IHsgSGVyb19UeXBlIH0gZnJvbSBcIi4uLy4uL0hlcm8vR2FtZS9IZXJvQ29uZmlnXCI7XHJcbmltcG9ydCB7IFByb3BNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL1Byb3AvUHJvcE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU291bmRJbmRleCB9IGZyb20gXCIuLi8uLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgVXNlckRhdGEgZnJvbSBcIi4uLy4uL1VzZXJEYXRhXCI7XHJcbmltcG9ydCBVSUNvbXBvbmVudCBmcm9tIFwiLi4vVUlDb21wb25lbnRcIjtcclxuXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEF2YXRhclVpIGV4dGVuZHMgVUlDb21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgaGVhZF9wb3J0cmFpdDpjYy5Ob2RlPW51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGhlYWRfaXRlbTpjYy5Ob2RlPW51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHNlbGVjdDpjYy5Ob2RlPW51bGw7XHJcbiAgICBzZWxlY3RfYXZhdGFyX2luZGV4Om51bWJlcj0wO1xyXG5cclxuICAgIG9uTG9hZCgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5vbkxvYWQoKTtcclxuICAgICAgICB0aGlzLnNlbGVjdF9hdmF0YXJfaW5kZXg9VXNlckRhdGEuZ2V0SW5zdGFuY2UoKS5nZXRVc2VyQXZhdGFyKCk7XHJcbiAgICAgICAgdGhpcy5oZWFkX3BvcnRyYWl0LmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTcGhlYWRQb3J0cmFpdFR5cGUodGhpcy5zZWxlY3RfYXZhdGFyX2luZGV4KS8vSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTcHJpdGVGcmFtZUJ5TmFtZSgnaGVybycrdGhpcy5zZWxlY3RfYXZhdGFyX2luZGV4KTtcclxuICAgICAgICB0aGlzLmFkZEF2YXRhcigpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBhZGRBdmF0YXIoKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBjb250ZW50PXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnYXZhdGFyU2Nyb2xsJykuZ2V0Q29tcG9uZW50KGNjLlNjcm9sbFZpZXcpLmNvbnRlbnQ7XHJcbiAgICAgICAgZm9yKGxldCBpPUhlcm9fVHlwZS5DaGFuZ01hb1Nob3U7IGk8SGVyb19UeXBlLkhlcm9fTnVtOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgYXZhdGFyPWNjLmluc3RhbnRpYXRlKHRoaXMuaGVhZF9pdGVtKTtcclxuICAgICAgICAgICAgYXZhdGFyLm5hbWUgPSBcImljb25cIiArIGk7XHJcbiAgICAgICAgICAgIGF2YXRhci5wYXJlbnQ9Y29udGVudDtcclxuICAgICAgICAgICAgLy8gYXZhdGFyLmFkZENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lPUhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3ByaXRlRnJhbWVCeU5hbWUoJ2hlcm8nK2kpO1xyXG4gICAgICAgICAgICBhdmF0YXIuZ2V0Q2hpbGRCeU5hbWUoXCJoZWFkUG9ydHJhaXRcIikuZ2V0Q29tcG9uZW50SW5DaGlsZHJlbihjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNwaGVhZFBvcnRyYWl0VHlwZShpKS8vSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTcHJpdGVGcmFtZUJ5TmFtZSgnaGVybycraSk7XHJcbiAgICAgICAgICAgIGxldCBidG49YXZhdGFyLmFkZENvbXBvbmVudChjYy5CdXR0b24pO1xyXG4gICAgICAgICAgICAvLyBidG4udHJhbnNpdGlvbj1jYy5CdXR0b24uVHJhbnNpdGlvbi5DT0xPUjtcclxuICAgICAgICAgICAgLy8gYnRuLmRpc2FibGVkQ29sb3I9Y2MuQ29sb3IuV0hJVEU7XHJcbiAgICAgICAgICAgIGxldCBjbGlja0V2ZW50PW5ldyBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyKCk7XHJcbiAgICAgICAgICAgIGNsaWNrRXZlbnQudGFyZ2V0PXRoaXMubm9kZTtcclxuICAgICAgICAgICAgY2xpY2tFdmVudC5jb21wb25lbnQ9J0F2YXRhclVpJztcclxuICAgICAgICAgICAgY2xpY2tFdmVudC5oYW5kbGVyPSdjbGlja0J0bkF2YXRhcic7XHJcbiAgICAgICAgICAgIGNsaWNrRXZlbnQuY3VzdG9tRXZlbnREYXRhPWkrJyc7XHJcbiAgICAgICAgICAgIGJ0bi5jbGlja0V2ZW50cy5wdXNoKGNsaWNrRXZlbnQpO1xyXG4gICAgICAgICAgICBpZihpID09IHRoaXMuc2VsZWN0X2F2YXRhcl9pbmRleCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdC5wYXJlbnQgPSBhdmF0YXI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdC5zZXRQb3NpdGlvbihjYy52MigwLDApKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICAvLyAgICAgY29udGVudC5nZXRDb21wb25lbnQoY2MuTGF5b3V0KS5lbmFibGVkPWZhbHNlO1xyXG4gICAgICAgIC8vICAgICB0aGlzLnNlbGVjdC5wYXJlbnQ9Y29udGVudDtcclxuICAgICAgICAvLyAgICAgdGhpcy5zaG93U2VsZWN0QXZhdGFyKCk7XHJcbiAgICAgICAgLy8gfSwwLjEpOyAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICBjbGlja0J0bkF2YXRhcihidG4saW5kZXhTdHI6c3RyaW5nKVxyXG4gICB7XHJcbiAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgbGV0IGluZGV4PXBhcnNlSW50KGluZGV4U3RyKTtcclxuICAgICAgIGlmKHRoaXMuc2VsZWN0X2F2YXRhcl9pbmRleCE9aW5kZXgpXHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0X2F2YXRhcl9pbmRleD1pbmRleDtcclxuICAgICAgICAgICAgdGhpcy5zaG93U2VsZWN0QXZhdGFyKCk7XHJcbiAgICAgICB9XHJcbiAgIH1cclxuXHJcbiAgIHNob3dTZWxlY3RBdmF0YXIoKVxyXG4gICB7XHJcbiAgICAgICAgLy8gbGV0IHNwTmFtZT0nVFlfVFhfMCcrdGhpcy5zZWxlY3RfYXZhdGFyX2luZGV4O1xyXG4gICAgICAgIC8vIGlmKHRoaXMuc2VsZWN0X2F2YXRhcl9pbmRleD49MTApXHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgIC8vICAgICBzcE5hbWU9J1RZX1RYXycrdGhpcy5zZWxlY3RfYXZhdGFyX2luZGV4O1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyBsZXQgY29udGVudD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2F2YXRhclNjcm9sbCcpLmdldENvbXBvbmVudChjYy5TY3JvbGxWaWV3KS5jb250ZW50O1xyXG4gICAgICAgIC8vIHRoaXMuc2VsZWN0LnNldFBvc2l0aW9uKGNvbnRlbnQuY2hpbGRyZW5bdGhpcy5zZWxlY3RfYXZhdGFyX2luZGV4LTFdLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgIHRoaXMuaGVhZF9wb3J0cmFpdC5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3BoZWFkUG9ydHJhaXRUeXBlKHRoaXMuc2VsZWN0X2F2YXRhcl9pbmRleCkvL0hlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3ByaXRlRnJhbWVCeU5hbWUoJ2hlcm8nK3RoaXMuc2VsZWN0X2F2YXRhcl9pbmRleCk7XHJcbiAgICAgICAgdGhpcy5zZWxlY3QucGFyZW50ID0gdGhpcy5ub2RlLmdldENvbXBvbmVudEluQ2hpbGRyZW4oY2MuU2Nyb2xsVmlldykuY29udGVudC5nZXRDaGlsZEJ5TmFtZShcImljb25cIiArIHRoaXMuc2VsZWN0X2F2YXRhcl9pbmRleCk7XHJcbiAgICAgICAgdGhpcy5zZWxlY3Quc2V0UG9zaXRpb24oY2MudjIoMCwwKSk7XHJcbiAgIH1cclxuXHJcbiAgIGNsaWNrQnRuT2soKVxyXG4gICB7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBVc2VyRGF0YS5nZXRJbnN0YW5jZSgpLnNhdmVVc2VyQXZhdGFyKHRoaXMuc2VsZWN0X2F2YXRhcl9pbmRleCsnJyk7XHJcbiAgICAgICAgc3VwZXIub25DbG9zZSgpO1xyXG4gICB9XHJcblxyXG59XHJcbiJdfQ==