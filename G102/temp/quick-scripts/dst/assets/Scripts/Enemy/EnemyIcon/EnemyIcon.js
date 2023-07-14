
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Enemy/EnemyIcon/EnemyIcon.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ab4ca+N5u9KM65C14sAPX8s', 'EnemyIcon');
// Scripts/Enemy/EnemyIcon/EnemyIcon.ts

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
var HeroConfig_1 = require("../../Hero/Game/HeroConfig");
var MonsterAttribute_1 = require("../../Monster/Data/MonsterAttribute");
var MonsterDataManager_1 = require("../../Monster/Data/MonsterDataManager");
var EnemyConfig_1 = require("../EnemyConfig");
var EnemyIconManager_1 = require("./EnemyIconManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var EnemyIcon = /** @class */ (function (_super) {
    __extends(EnemyIcon, _super);
    function EnemyIcon() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.enemy_type = EnemyConfig_1.Enemy_Type.shuyao;
        _this.is_boss = false;
        return _this;
    }
    EnemyIcon.prototype.init = function (type, isBoss) {
        this.enemy_type = type;
        this.is_boss = isBoss;
        this.refreshData();
    };
    EnemyIcon.prototype.refreshData = function () {
        var spName = 'TX_GuaiWu_0' + (this.enemy_type - 1);
        if (this.enemy_type > 10) {
            spName = 'TX_GuaiWu_' + (this.enemy_type - 1);
        }
        //根据怪物类型设置怪物图标
        this.node.getComponent(cc.Sprite).spriteFrame = EnemyIconManager_1.default.getInstance().getSpByName(spName);
        //设置是否boss
        this.node.getChildByName('boss').active = this.is_boss;
        ;
        //设置单位
        var id = MonsterDataManager_1.MonsterDataManager.getInstance().getMonsterIdByType(this.enemy_type);
        var danweis = MonsterAttribute_1.MonsterAttributeManager.getInstance().getArea(id);
        var danweiRoot = this.node.getChildByName('danweiRoot');
        for (var i = 0; i < danweiRoot.childrenCount; i++) {
            var danwei = danweiRoot.children[i];
            if (i < danweis.length) {
                danwei.active = true;
                var str = 'TY_icon_Lu';
                switch (danweis[i]) {
                    case HeroConfig_1.AttRangeType.LuDi:
                        str = 'JS_iconSX_06';
                        break;
                    case HeroConfig_1.AttRangeType.TianKong:
                        str = 'JS_iconSX_07';
                        break;
                    case HeroConfig_1.AttRangeType.DunDi:
                        str = 'JS_iconSX_05';
                        break;
                }
                danwei.getComponent(cc.Sprite).spriteFrame = EnemyIconManager_1.default.getInstance().getSpByName(str);
            }
            else {
                danwei.active = false;
            }
        }
    };
    EnemyIcon = __decorate([
        ccclass
    ], EnemyIcon);
    return EnemyIcon;
}(cc.Component));
exports.default = EnemyIcon;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcRW5lbXlcXEVuZW15SWNvblxcRW5lbXlJY29uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlEQUEwRDtBQUMxRCx3RUFBOEU7QUFDOUUsNEVBQTJFO0FBQzNFLDhDQUE0QztBQUM1Qyx1REFBa0Q7QUFHNUMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBdUMsNkJBQVk7SUFBbkQ7UUFBQSxxRUE4Q0M7UUE1Q0csZ0JBQVUsR0FBWSx3QkFBVSxDQUFDLE1BQU0sQ0FBQztRQUN4QyxhQUFPLEdBQVMsS0FBSyxDQUFDOztJQTJDMUIsQ0FBQztJQXpDRyx3QkFBSSxHQUFKLFVBQU0sSUFBZSxFQUFDLE1BQWM7UUFDaEMsSUFBSSxDQUFDLFVBQVUsR0FBQyxJQUFJLENBQUM7UUFDckIsSUFBSSxDQUFDLE9BQU8sR0FBQyxNQUFNLENBQUM7UUFDcEIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCwrQkFBVyxHQUFYO1FBQ0ksSUFBSSxNQUFNLEdBQUMsYUFBYSxHQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3QyxJQUFHLElBQUksQ0FBQyxVQUFVLEdBQUMsRUFBRSxFQUNyQjtZQUNJLE1BQU0sR0FBQyxZQUFZLEdBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzNDO1FBQ0QsY0FBYztRQUNkLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLEdBQUMsMEJBQWdCLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2pHLFVBQVU7UUFDVixJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUFBLENBQUM7UUFDdEQsTUFBTTtRQUNOLElBQUksRUFBRSxHQUFDLHVDQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM1RSxJQUFJLE9BQU8sR0FBQywwQ0FBdUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDOUQsSUFBSSxVQUFVLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDdEQsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxFQUFFLEVBQzVDO1lBQ0ksSUFBSSxNQUFNLEdBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsQyxJQUFHLENBQUMsR0FBQyxPQUFPLENBQUMsTUFBTSxFQUNuQjtnQkFDSSxNQUFNLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQztnQkFDbkIsSUFBSSxHQUFHLEdBQUMsWUFBWSxDQUFDO2dCQUNyQixRQUFPLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFDakI7b0JBQ0ksS0FBSyx5QkFBWSxDQUFDLElBQUk7d0JBQUUsR0FBRyxHQUFDLGNBQWMsQ0FBQzt3QkFBQyxNQUFNO29CQUNsRCxLQUFLLHlCQUFZLENBQUMsUUFBUTt3QkFBRSxHQUFHLEdBQUMsY0FBYyxDQUFDO3dCQUFDLE1BQU07b0JBQ3RELEtBQUsseUJBQVksQ0FBQyxLQUFLO3dCQUFFLEdBQUcsR0FBQyxjQUFjLENBQUM7d0JBQUMsTUFBTTtpQkFDdEQ7Z0JBQ0QsTUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxHQUFDLDBCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUM5RjtpQkFDRDtnQkFDSSxNQUFNLENBQUMsTUFBTSxHQUFDLEtBQUssQ0FBQzthQUN2QjtTQUNKO0lBQ0wsQ0FBQztJQTVDZ0IsU0FBUztRQUQ3QixPQUFPO09BQ2EsU0FBUyxDQThDN0I7SUFBRCxnQkFBQztDQTlDRCxBQThDQyxDQTlDc0MsRUFBRSxDQUFDLFNBQVMsR0E4Q2xEO2tCQTlDb0IsU0FBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEF0dFJhbmdlVHlwZSB9IGZyb20gXCIuLi8uLi9IZXJvL0dhbWUvSGVyb0NvbmZpZ1wiO1xyXG5pbXBvcnQgeyBNb25zdGVyQXR0cmlidXRlTWFuYWdlciB9IGZyb20gXCIuLi8uLi9Nb25zdGVyL0RhdGEvTW9uc3RlckF0dHJpYnV0ZVwiO1xyXG5pbXBvcnQgeyBNb25zdGVyRGF0YU1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vTW9uc3Rlci9EYXRhL01vbnN0ZXJEYXRhTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBFbmVteV9UeXBlIH0gZnJvbSBcIi4uL0VuZW15Q29uZmlnXCI7XHJcbmltcG9ydCBFbmVteUljb25NYW5hZ2VyIGZyb20gXCIuL0VuZW15SWNvbk1hbmFnZXJcIjtcclxuXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVuZW15SWNvbiBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgZW5lbXlfdHlwZTpFbmVteV9UeXBlPUVuZW15X1R5cGUuc2h1eWFvO1xyXG4gICAgaXNfYm9zczpib29sZWFuPWZhbHNlO1xyXG5cclxuICAgIGluaXQgKHR5cGU6RW5lbXlfVHlwZSxpc0Jvc3M6Ym9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuZW5lbXlfdHlwZT10eXBlO1xyXG4gICAgICAgIHRoaXMuaXNfYm9zcz1pc0Jvc3M7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoRGF0YSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlZnJlc2hEYXRhKCl7XHJcbiAgICAgICAgbGV0IHNwTmFtZT0nVFhfR3VhaVd1XzAnKyh0aGlzLmVuZW15X3R5cGUtMSk7XHJcbiAgICAgICAgaWYodGhpcy5lbmVteV90eXBlPjEwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3BOYW1lPSdUWF9HdWFpV3VfJysodGhpcy5lbmVteV90eXBlLTEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+agueaNruaAqueJqeexu+Wei+iuvue9ruaAqueJqeWbvuagh1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZT1FbmVteUljb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3BCeU5hbWUoc3BOYW1lKTtcclxuICAgICAgICAvL+iuvue9ruaYr+WQpmJvc3NcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2Jvc3MnKS5hY3RpdmU9dGhpcy5pc19ib3NzOztcclxuICAgICAgICAvL+iuvue9ruWNleS9jVxyXG4gICAgICAgIGxldCBpZD1Nb25zdGVyRGF0YU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNb25zdGVySWRCeVR5cGUodGhpcy5lbmVteV90eXBlKTtcclxuICAgICAgICBsZXQgZGFud2Vpcz1Nb25zdGVyQXR0cmlidXRlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEFyZWEoaWQpO1xyXG4gICAgICAgIGxldCBkYW53ZWlSb290PXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnZGFud2VpUm9vdCcpO1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPGRhbndlaVJvb3QuY2hpbGRyZW5Db3VudDsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IGRhbndlaT1kYW53ZWlSb290LmNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICBpZihpPGRhbndlaXMubGVuZ3RoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBkYW53ZWkuYWN0aXZlPXRydWU7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3RyPSdUWV9pY29uX0x1JztcclxuICAgICAgICAgICAgICAgIHN3aXRjaChkYW53ZWlzW2ldKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgQXR0UmFuZ2VUeXBlLkx1RGk6IHN0cj0nSlNfaWNvblNYXzA2JzsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBBdHRSYW5nZVR5cGUuVGlhbktvbmc6IHN0cj0nSlNfaWNvblNYXzA3JzsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBBdHRSYW5nZVR5cGUuRHVuRGk6IHN0cj0nSlNfaWNvblNYXzA1JzsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBkYW53ZWkuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWU9RW5lbXlJY29uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNwQnlOYW1lKHN0cik7XHJcbiAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGRhbndlaS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==