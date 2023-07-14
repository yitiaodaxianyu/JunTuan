"use strict";
cc._RF.push(module, '195308e9YtMKLbhJayrK4f9', 'BtnTeam');
// Scripts/UI/home/BtnTeam.ts

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
var Constants_1 = require("../../Constants");
var GameManager_1 = require("../../GameManager");
var HeroManager_1 = require("../../Hero/Data/HeroManager");
var HeroConfig_1 = require("../../Hero/Game/HeroConfig");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var EventManager_1 = require("../../Tools/EventManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BtnTeam = /** @class */ (function (_super) {
    __extends(BtnTeam, _super);
    function BtnTeam() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.team_index = 0;
        _this.icon = null;
        return _this;
        // update (dt) {}
    }
    BtnTeam.prototype.onLoad = function () {
        this.icon = this.node.getChildByName('mask').getChildByName('icon');
        this.refreshData();
    };
    /**刷新通用数据 */
    BtnTeam.prototype.refreshData = function () {
        //获取需要设置的节点
        var iconSp = this.icon.getComponent(cc.Sprite);
        var plus = this.node.getChildByName('plus');
        //获取编队信息
        var teamList = HeroManager_1.HeroManager.getInstance().getTeamList(GameManager_1.default.getInstance().cur_game_mode);
        //只管刷新自己当前位置的信息
        var heroType = teamList[this.team_index];
        if (heroType > HeroConfig_1.Hero_Type.NULL) {
            this.icon.active = true;
            plus.active = false;
            iconSp.spriteFrame = HeroManager_1.HeroManager.getInstance().getSpriteFrameByName('hero' + heroType);
        }
        else {
            this.icon.active = false;
            plus.active = true;
        }
        if (GameManager_1.default.getInstance().cur_game_mode == Constants_1.GameMode.Main)
            EventManager_1.EventManager.postRedEvent(EventManager_1.RedEventString.RED_CHECK, EventManager_1.RedEventType.Btn_Map_Team_0 + this.team_index);
    };
    BtnTeam.prototype.clickSelf = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
    };
    __decorate([
        property()
    ], BtnTeam.prototype, "team_index", void 0);
    BtnTeam = __decorate([
        ccclass
    ], BtnTeam);
    return BtnTeam;
}(cc.Component));
exports.default = BtnTeam;

cc._RF.pop();