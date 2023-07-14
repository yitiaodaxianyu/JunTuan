"use strict";
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