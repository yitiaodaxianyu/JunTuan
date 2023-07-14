"use strict";
cc._RF.push(module, 'e7259O/fVJGWptqgTLd9fR7', 'Chariot');
// Scripts/UI/home/Chariot.ts

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
var HeroManager_1 = require("../../Hero/Data/HeroManager");
var MyTool_1 = require("../../Tools/MyTool");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Chariot = /** @class */ (function (_super) {
    __extends(Chariot, _super);
    function Chariot() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.btnClose = null;
        _this.bg = null;
        _this.txt = [];
        return _this;
        // update (dt) {}
    }
    Chariot.prototype.start = function () {
        this.btnClose.on(cc.Node.EventType.TOUCH_END, function (event) {
            this.onCloseBtn();
        }, this);
        this.bg.on(cc.Node.EventType.TOUCH_END, function (event) {
            this.onCloseBtn();
        }, this);
    };
    Chariot.prototype.onEnable = function () {
        var shux = [0, 0, 0, 0, 0];
        var teamList = HeroManager_1.HeroManager.getInstance().getTeamList(GameManager_1.default.getInstance().cur_game_mode);
        for (var teamListindex = 0; teamListindex < teamList.length; teamListindex++) {
            if (teamList[teamListindex] > 0) {
                // HeroManager.getInstance().getHeroData(teamList[teamListindex]).total_hp
                // console.log("______",HeroManager.getInstance().getHeroData(teamList[teamListindex]).Defense)
                shux[0] += HeroManager_1.HeroManager.getInstance().getHeroData(teamList[teamListindex]).total_hp; //英雄的基础数据   传入英雄id类型  防御力  生命值  命中值  
                shux[1] += HeroManager_1.HeroManager.getInstance().getHeroData(teamList[teamListindex]).total_defense; //英雄的基础数据   传入英雄id类型  防御力  生命值  命中值  
                shux[2] += HeroManager_1.HeroManager.getInstance().getHeroData(teamList[teamListindex]).Miss; //英雄的基础数据   传入英雄id类型  防御力  生命值  命中值  
                shux[3] += HeroManager_1.HeroManager.getInstance().getHeroData(teamList[teamListindex]).AntiCritical; //英雄的基础数据   传入英雄id类型  防御力  生命值  命中值  
                shux[4] += HeroManager_1.HeroManager.getInstance().getHeroData(teamList[teamListindex]).AntiExtraCritical; //英雄的基础数据   传入英雄id类型  防御力  生命值  命中值  
            }
        }
        for (var index = 0; index < shux.length; index++) {
            if (index == 4) {
                // let num=(shux[index]/5)*100
                // console.log("__",)
                // shux[index]=Number(MyTool.numberFormat(num,4))//*100
                // // shux[index]=shux[index]*100
                this.txt[index].getComponent(cc.Label).string = "" + MyTool_1.default.numberFormat(shux[index] / 5 * 100, 2) + "%"; //暴击抗性
            }
            else {
                shux[index] = Number(MyTool_1.default.numberFormat((shux[index] / 5), 0));
                this.txt[index].getComponent(cc.Label).string = "" + shux[index];
            }
        }
        //刷新血量
    };
    Chariot.prototype.onCloseBtn = function () {
        this.node.active = false;
    };
    __decorate([
        property(cc.Node)
    ], Chariot.prototype, "btnClose", void 0);
    __decorate([
        property(cc.Node)
    ], Chariot.prototype, "bg", void 0);
    __decorate([
        property(cc.Node)
    ], Chariot.prototype, "txt", void 0);
    Chariot = __decorate([
        ccclass
    ], Chariot);
    return Chariot;
}(cc.Component));
exports.default = Chariot;

cc._RF.pop();