
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/UI/home/Chariot.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVUlcXGhvbWVcXENoYXJpb3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQix3RUFBd0U7QUFDeEUsbUJBQW1CO0FBQ25CLGtGQUFrRjtBQUNsRiw4QkFBOEI7QUFDOUIsa0ZBQWtGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFbEYsaURBQTRDO0FBQzVDLDJEQUEwRDtBQUMxRCw2Q0FBd0M7QUFFbEMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBcUMsMkJBQVk7SUFBakQ7UUFBQSxxRUF1REM7UUFwREcsY0FBUSxHQUFZLElBQUksQ0FBQztRQUV6QixRQUFFLEdBQVksSUFBSSxDQUFDO1FBR25CLFNBQUcsR0FBYyxFQUFFLENBQUM7O1FBOENwQixpQkFBaUI7SUFDckIsQ0FBQztJQTdDRyx1QkFBSyxHQUFMO1FBQ0ksSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFDLFVBQVMsS0FBSztZQUN2RCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUE7UUFDckIsQ0FBQyxFQUFDLElBQUksQ0FBQyxDQUFBO1FBQ1AsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFDLFVBQVMsS0FBSztZQUNqRCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUE7UUFDckIsQ0FBQyxFQUFDLElBQUksQ0FBQyxDQUFBO0lBQ1gsQ0FBQztJQUNELDBCQUFRLEdBQVI7UUFDSSxJQUFJLElBQUksR0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQTtRQUNwQixJQUFJLFFBQVEsR0FBQyx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzVGLEtBQUssSUFBSSxhQUFhLEdBQUcsQ0FBQyxFQUFFLGFBQWEsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLGFBQWEsRUFBRSxFQUFFO1lBQzFFLElBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFDLENBQUMsRUFBQztnQkFDekIsMEVBQTBFO2dCQUMxRSwrRkFBK0Y7Z0JBQy9GLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBRSx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUEsQ0FBQSxxQ0FBcUM7Z0JBQ3JILElBQUksQ0FBQyxDQUFDLENBQUMsSUFBRSx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUEsQ0FBQSxxQ0FBcUM7Z0JBQzFILElBQUksQ0FBQyxDQUFDLENBQUMsSUFBRSx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUEsQ0FBQSxxQ0FBcUM7Z0JBQ2pILElBQUksQ0FBQyxDQUFDLENBQUMsSUFBRSx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUEsQ0FBQSxxQ0FBcUM7Z0JBQ3pILElBQUksQ0FBQyxDQUFDLENBQUMsSUFBRSx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQSxDQUFBLHFDQUFxQzthQUNqSTtTQUNKO1FBQ0QsS0FBSyxJQUFLLEtBQUssR0FBRSxDQUFDLEVBQUUsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFFOUMsSUFBRyxLQUFLLElBQUUsQ0FBQyxFQUFDO2dCQUNSLDhCQUE4QjtnQkFDOUIscUJBQXFCO2dCQUNyQix1REFBdUQ7Z0JBQ3ZELGlDQUFpQztnQkFFakMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBQyxFQUFFLEdBQUMsZ0JBQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEVBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUEsTUFBTTthQUM3RztpQkFBSTtnQkFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUMsTUFBTSxDQUFDLGdCQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7Z0JBQzFELElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUMsRUFBRSxHQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTthQUMvRDtTQUVKO1FBQ0QsTUFBTTtJQUVWLENBQUM7SUFDRCw0QkFBVSxHQUFWO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUMsS0FBSyxDQUFBO0lBQzFCLENBQUM7SUFqREQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs2Q0FDTztJQUV6QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3VDQUNDO0lBR25CO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7d0NBQ0U7SUFSSCxPQUFPO1FBRDNCLE9BQU87T0FDYSxPQUFPLENBdUQzQjtJQUFELGNBQUM7Q0F2REQsQUF1REMsQ0F2RG9DLEVBQUUsQ0FBQyxTQUFTLEdBdURoRDtrQkF2RG9CLE9BQU8iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcblxyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uLy4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEhlcm9NYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0hlcm8vRGF0YS9IZXJvTWFuYWdlclwiO1xyXG5pbXBvcnQgTXlUb29sIGZyb20gXCIuLi8uLi9Ub29scy9NeVRvb2xcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2hhcmlvdCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBidG5DbG9zZTogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGJnOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIFxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICB0eHQ6IGNjLk5vZGVbXSA9IFtdO1xyXG5cclxuICAgIHN0YXJ0ICgpIHtcclxuICAgICAgICB0aGlzLmJ0bkNsb3NlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCxmdW5jdGlvbihldmVudCl7XHJcbiAgICAgICAgICAgIHRoaXMub25DbG9zZUJ0bigpXHJcbiAgICAgICAgfSx0aGlzKVxyXG4gICAgICAgIHRoaXMuYmcub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgICAgICAgICAgdGhpcy5vbkNsb3NlQnRuKClcclxuICAgICAgICB9LHRoaXMpXHJcbiAgICB9XHJcbiAgICBvbkVuYWJsZSgpe1xyXG4gICAgICAgIGxldCBzaHV4PVswLDAsMCwwLDBdXHJcbiAgICAgICAgbGV0IHRlYW1MaXN0PUhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VGVhbUxpc3QoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9tb2RlKTtcclxuICAgICAgICBmb3IgKGxldCB0ZWFtTGlzdGluZGV4ID0gMDsgdGVhbUxpc3RpbmRleCA8IHRlYW1MaXN0Lmxlbmd0aDsgdGVhbUxpc3RpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGlmKHRlYW1MaXN0W3RlYW1MaXN0aW5kZXhdPjApe1xyXG4gICAgICAgICAgICAgICAgLy8gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvRGF0YSh0ZWFtTGlzdFt0ZWFtTGlzdGluZGV4XSkudG90YWxfaHBcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiX19fX19fXCIsSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvRGF0YSh0ZWFtTGlzdFt0ZWFtTGlzdGluZGV4XSkuRGVmZW5zZSlcclxuICAgICAgICAgICAgICAgIHNodXhbMF0rPUhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb0RhdGEodGVhbUxpc3RbdGVhbUxpc3RpbmRleF0pLnRvdGFsX2hwLy/oi7Hpm4TnmoTln7rnoYDmlbDmja4gICDkvKDlhaXoi7Hpm4RpZOexu+WeiyAg6Ziy5b6h5YqbICDnlJ/lkb3lgLwgIOWRveS4reWAvCAgXHJcbiAgICAgICAgICAgICAgICBzaHV4WzFdKz1IZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9EYXRhKHRlYW1MaXN0W3RlYW1MaXN0aW5kZXhdKS50b3RhbF9kZWZlbnNlLy/oi7Hpm4TnmoTln7rnoYDmlbDmja4gICDkvKDlhaXoi7Hpm4RpZOexu+WeiyAg6Ziy5b6h5YqbICDnlJ/lkb3lgLwgIOWRveS4reWAvCAgXHJcbiAgICAgICAgICAgICAgICBzaHV4WzJdKz1IZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9EYXRhKHRlYW1MaXN0W3RlYW1MaXN0aW5kZXhdKS5NaXNzLy/oi7Hpm4TnmoTln7rnoYDmlbDmja4gICDkvKDlhaXoi7Hpm4RpZOexu+WeiyAg6Ziy5b6h5YqbICDnlJ/lkb3lgLwgIOWRveS4reWAvCAgXHJcbiAgICAgICAgICAgICAgICBzaHV4WzNdKz1IZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9EYXRhKHRlYW1MaXN0W3RlYW1MaXN0aW5kZXhdKS5BbnRpQ3JpdGljYWwvL+iLsembhOeahOWfuuehgOaVsOaNriAgIOS8oOWFpeiLsembhGlk57G75Z6LICDpmLLlvqHlipsgIOeUn+WRveWAvCAg5ZG95Lit5YC8ICBcclxuICAgICAgICAgICAgICAgIHNodXhbNF0rPUhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb0RhdGEodGVhbUxpc3RbdGVhbUxpc3RpbmRleF0pLkFudGlFeHRyYUNyaXRpY2FsLy/oi7Hpm4TnmoTln7rnoYDmlbDmja4gICDkvKDlhaXoi7Hpm4RpZOexu+WeiyAg6Ziy5b6h5YqbICDnlJ/lkb3lgLwgIOWRveS4reWAvCAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgIGluZGV4PSAwOyBpbmRleCA8IHNodXgubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZihpbmRleD09NCl7XHJcbiAgICAgICAgICAgICAgICAvLyBsZXQgbnVtPShzaHV4W2luZGV4XS81KSoxMDBcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiX19cIiwpXHJcbiAgICAgICAgICAgICAgICAvLyBzaHV4W2luZGV4XT1OdW1iZXIoTXlUb29sLm51bWJlckZvcm1hdChudW0sNCkpLy8qMTAwXHJcbiAgICAgICAgICAgICAgICAvLyAvLyBzaHV4W2luZGV4XT1zaHV4W2luZGV4XSoxMDBcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy50eHRbaW5kZXhdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPVwiXCIrTXlUb29sLm51bWJlckZvcm1hdChzaHV4W2luZGV4XSAvIDUgKiAxMDAsMikgKyBcIiVcIjsvL+aatOWHu+aKl+aAp1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHNodXhbaW5kZXhdPU51bWJlcihNeVRvb2wubnVtYmVyRm9ybWF0KChzaHV4W2luZGV4XS81KSwwKSlcclxuICAgICAgICAgICAgICAgIHRoaXMudHh0W2luZGV4XS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1cIlwiK3NodXhbaW5kZXhdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5Yi35paw6KGA6YePXHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBvbkNsb3NlQnRuKCl7XHJcbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZT1mYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XHJcbn1cclxuIl19