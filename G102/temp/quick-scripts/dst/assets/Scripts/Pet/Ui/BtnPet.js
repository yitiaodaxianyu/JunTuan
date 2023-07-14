
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Pet/Ui/BtnPet.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'eda59QB5jpP3oMW7S/cnWhm', 'BtnPet');
// Scripts/Pet/Ui/BtnPet.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BtnPet = /** @class */ (function (_super) {
    __extends(BtnPet, _super);
    function BtnPet() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.pet_info = null;
        _this.icon = null;
        _this.team_index = 0;
        return _this;
    }
    BtnPet.prototype.init = function (petInfo) {
        var content = this.node.getChildByName("content");
        content.active = true;
        this.pet_info = petInfo;
        this.icon = content.getChildByName("iconMask");
        this.icon.active = true;
        // this.icon.getChildByName('icon').getComponent(cc.Sprite).spriteFrame = PetManager.getInstance().getSpriteFrameByName('Sprite_Avatar_' + this.pet_info.pet_id);
        // console.log( PetManager.getInstance().getSpriteFrameByName('Sprite_Avatar_' + this.pet_info.pet_id))
        // let type = content.getChildByName("type");
        // type.active = true;
        // type.getComponent(cc.Sprite).spriteFrame = PetManager.getInstance().getSpriteFrameByName("Hero_Type_" + SpiritMessageManager.getInstance().getSpiritType(this.pet_info.pet_id));
        // content.getChildByName("quality").getComponent(cc.Sprite).spriteFrame = PetManager.getInstance().getSpriteFrameByName("Prepare_Quality_" + SpiritQualityMessageManager.getInstance().getSpiritQualityframe(this.pet_info.pet_quality));
        var star = content.getChildByName("star");
        // star.getComponent(cc.Sprite).spriteFrame = PetManager.getInstance().getSpriteFrameByName
        // ("Prepare_Star_" + SpiritQualityMessageManager.getInstance().
        // getSpiritQualityStar(this.pet_info.pet_quality));
        var levelLabel = content.getChildByName("levelLabel");
        levelLabel.active = true;
        levelLabel.getComponent(cc.Label).string = "" + this.pet_info.pet_level;
    };
    // initQuality(quality:number){
    //     let content = this.node.getChildByName("content");
    //     content.getChildByName("quality").getComponent(cc.Sprite).spriteFrame = 
    //     PetManager.getInstance().getSpriteFrameByName("Prepare_Quality_" + 
    //     SpiritQualityMessageManager.getInstance().getSpiritQualityframe(quality));
    // }
    BtnPet.prototype.showLock = function (quality) {
        var content = this.node.getChildByName("content");
        this.icon = content.getChildByName("iconMask");
        this.icon.active = true;
        this.icon.getChildByName('icon').getComponent(cc.Sprite).spriteFrame = null;
        // content.getChildByName("quality").getComponent(cc.Sprite).spriteFrame = 
        // PetManager.getInstance().getSpriteFrameByName("Prepare_Quality_" + 
        // SpiritQualityMessageManager.getInstance().getSpiritQualityframe(quality));
        var star = content.getChildByName("star");
        star.getComponent(cc.Sprite).spriteFrame = null;
        var levelLabel = content.getChildByName("levelLabel");
        levelLabel.active = true;
        levelLabel.getComponent(cc.Label).string = "";
    };
    BtnPet.prototype.showBan = function () {
        this.node.getChildByName("ban").active = true;
        this.node.getChildByName("content").active = false;
    };
    BtnPet.prototype.hideBan = function () {
        this.node.getChildByName("ban").active = false;
        this.node.getChildByName("content").active = true;
    };
    BtnPet.prototype.showNull = function () {
        this.node.getChildByName("content").active = false;
        this.node.getChildByName("ban").active = false;
    };
    __decorate([
        property()
    ], BtnPet.prototype, "team_index", void 0);
    BtnPet = __decorate([
        ccclass
    ], BtnPet);
    return BtnPet;
}(cc.Component));
exports.default = BtnPet;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcUGV0XFxVaVxcQnRuUGV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdNLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQW9DLDBCQUFZO0lBQWhEO1FBQUEscUVBZ0VDO1FBOURHLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFDekIsVUFBSSxHQUFTLElBQUksQ0FBQztRQUVsQixnQkFBVSxHQUFRLENBQUMsQ0FBQzs7SUEyRHhCLENBQUM7SUF6REcscUJBQUksR0FBSixVQUFLLE9BQWdCO1FBQ2pCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2xELE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDeEIsaUtBQWlLO1FBQ2pLLHVHQUF1RztRQUN2Ryw2Q0FBNkM7UUFDN0Msc0JBQXNCO1FBQ3RCLG1MQUFtTDtRQUNuTCwwT0FBME87UUFDMU8sSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMxQywyRkFBMkY7UUFDM0YsZ0VBQWdFO1FBQ2hFLG9EQUFvRDtRQUNwRCxJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3RELFVBQVUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLFVBQVUsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUM7SUFDNUUsQ0FBQztJQUVELCtCQUErQjtJQUMvQix5REFBeUQ7SUFDekQsK0VBQStFO0lBQy9FLDBFQUEwRTtJQUMxRSxpRkFBaUY7SUFDakYsSUFBSTtJQUVKLHlCQUFRLEdBQVIsVUFBUyxPQUFjO1FBQ25CLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQzVFLDJFQUEyRTtRQUMzRSxzRUFBc0U7UUFDdEUsNkVBQTZFO1FBQzdFLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUNoRCxJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3RELFVBQVUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLFVBQVUsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUE7SUFDakQsQ0FBQztJQUVELHdCQUFPLEdBQVA7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQzlDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDdkQsQ0FBQztJQUVELHdCQUFPLEdBQVA7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQy9DLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7SUFDdEQsQ0FBQztJQUVELHlCQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ25ELElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDbkQsQ0FBQztJQTFERDtRQURDLFFBQVEsRUFBRTs4Q0FDUztJQUxILE1BQU07UUFEMUIsT0FBTztPQUNhLE1BQU0sQ0FnRTFCO0lBQUQsYUFBQztDQWhFRCxBQWdFQyxDQWhFbUMsRUFBRSxDQUFDLFNBQVMsR0FnRS9DO2tCQWhFb0IsTUFBTSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBldEluZm8gfSBmcm9tIFwiLi4vUGV0Q29uZmlnXCI7XHJcbmltcG9ydCB7IFBldE1hbmFnZXIgfSBmcm9tIFwiLi4vUGV0TWFuYWdlclwiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJ0blBldCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgcGV0X2luZm86IFBldEluZm8gPSBudWxsO1xyXG4gICAgaWNvbjpjYy5Ob2RlPW51bGw7XHJcbiAgICBAcHJvcGVydHkoKVxyXG4gICAgdGVhbV9pbmRleDpudW1iZXI9MDtcclxuXHJcbiAgICBpbml0KHBldEluZm86IFBldEluZm8pIHtcclxuICAgICAgICBsZXQgY29udGVudCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnRcIik7XHJcbiAgICAgICAgY29udGVudC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMucGV0X2luZm8gPSBwZXRJbmZvO1xyXG4gICAgICAgIHRoaXMuaWNvbiA9IGNvbnRlbnQuZ2V0Q2hpbGRCeU5hbWUoXCJpY29uTWFza1wiKTtcclxuICAgICAgICB0aGlzLmljb24uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAvLyB0aGlzLmljb24uZ2V0Q2hpbGRCeU5hbWUoJ2ljb24nKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IFBldE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTcHJpdGVGcmFtZUJ5TmFtZSgnU3ByaXRlX0F2YXRhcl8nICsgdGhpcy5wZXRfaW5mby5wZXRfaWQpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCBQZXRNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3ByaXRlRnJhbWVCeU5hbWUoJ1Nwcml0ZV9BdmF0YXJfJyArIHRoaXMucGV0X2luZm8ucGV0X2lkKSlcclxuICAgICAgICAvLyBsZXQgdHlwZSA9IGNvbnRlbnQuZ2V0Q2hpbGRCeU5hbWUoXCJ0eXBlXCIpO1xyXG4gICAgICAgIC8vIHR5cGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAvLyB0eXBlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gUGV0TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNwcml0ZUZyYW1lQnlOYW1lKFwiSGVyb19UeXBlX1wiICsgU3Bpcml0TWVzc2FnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTcGlyaXRUeXBlKHRoaXMucGV0X2luZm8ucGV0X2lkKSk7XHJcbiAgICAgICAgLy8gY29udGVudC5nZXRDaGlsZEJ5TmFtZShcInF1YWxpdHlcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBQZXRNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3ByaXRlRnJhbWVCeU5hbWUoXCJQcmVwYXJlX1F1YWxpdHlfXCIgKyBTcGlyaXRRdWFsaXR5TWVzc2FnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTcGlyaXRRdWFsaXR5ZnJhbWUodGhpcy5wZXRfaW5mby5wZXRfcXVhbGl0eSkpO1xyXG4gICAgICAgIGxldCBzdGFyID0gY29udGVudC5nZXRDaGlsZEJ5TmFtZShcInN0YXJcIik7XHJcbiAgICAgICAgLy8gc3Rhci5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IFBldE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTcHJpdGVGcmFtZUJ5TmFtZVxyXG4gICAgICAgIC8vIChcIlByZXBhcmVfU3Rhcl9cIiArIFNwaXJpdFF1YWxpdHlNZXNzYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLlxyXG4gICAgICAgIC8vIGdldFNwaXJpdFF1YWxpdHlTdGFyKHRoaXMucGV0X2luZm8ucGV0X3F1YWxpdHkpKTtcclxuICAgICAgICBsZXQgbGV2ZWxMYWJlbCA9IGNvbnRlbnQuZ2V0Q2hpbGRCeU5hbWUoXCJsZXZlbExhYmVsXCIpO1xyXG4gICAgICAgIGxldmVsTGFiZWwuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBsZXZlbExhYmVsLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJcIiArIHRoaXMucGV0X2luZm8ucGV0X2xldmVsO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGluaXRRdWFsaXR5KHF1YWxpdHk6bnVtYmVyKXtcclxuICAgIC8vICAgICBsZXQgY29udGVudCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnRcIik7XHJcbiAgICAvLyAgICAgY29udGVudC5nZXRDaGlsZEJ5TmFtZShcInF1YWxpdHlcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBcclxuICAgIC8vICAgICBQZXRNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3ByaXRlRnJhbWVCeU5hbWUoXCJQcmVwYXJlX1F1YWxpdHlfXCIgKyBcclxuICAgIC8vICAgICBTcGlyaXRRdWFsaXR5TWVzc2FnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTcGlyaXRRdWFsaXR5ZnJhbWUocXVhbGl0eSkpO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIHNob3dMb2NrKHF1YWxpdHk6bnVtYmVyKXtcclxuICAgICAgICBsZXQgY29udGVudCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnRcIik7XHJcbiAgICAgICAgdGhpcy5pY29uID0gY29udGVudC5nZXRDaGlsZEJ5TmFtZShcImljb25NYXNrXCIpO1xyXG4gICAgICAgIHRoaXMuaWNvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuaWNvbi5nZXRDaGlsZEJ5TmFtZSgnaWNvbicpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gbnVsbDtcclxuICAgICAgICAvLyBjb250ZW50LmdldENoaWxkQnlOYW1lKFwicXVhbGl0eVwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IFxyXG4gICAgICAgIC8vIFBldE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTcHJpdGVGcmFtZUJ5TmFtZShcIlByZXBhcmVfUXVhbGl0eV9cIiArIFxyXG4gICAgICAgIC8vIFNwaXJpdFF1YWxpdHlNZXNzYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNwaXJpdFF1YWxpdHlmcmFtZShxdWFsaXR5KSk7XHJcbiAgICAgICAgbGV0IHN0YXIgPSBjb250ZW50LmdldENoaWxkQnlOYW1lKFwic3RhclwiKTtcclxuICAgICAgICBzdGFyLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gbnVsbDtcclxuICAgICAgICBsZXQgbGV2ZWxMYWJlbCA9IGNvbnRlbnQuZ2V0Q2hpbGRCeU5hbWUoXCJsZXZlbExhYmVsXCIpO1xyXG4gICAgICAgIGxldmVsTGFiZWwuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBsZXZlbExhYmVsLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJcIlxyXG4gICAgfVxyXG5cclxuICAgIHNob3dCYW4oKXtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJiYW5cIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJjb250ZW50XCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGhpZGVCYW4oKXtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJiYW5cIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiY29udGVudFwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dOdWxsKCl7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiY29udGVudFwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJiYW5cIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuIl19