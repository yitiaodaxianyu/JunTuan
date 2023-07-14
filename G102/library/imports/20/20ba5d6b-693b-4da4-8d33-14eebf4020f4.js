"use strict";
cc._RF.push(module, '20ba51raTtNpI0zFO6/QCD0', 'TowerManager');
// Scripts/Tower/TowerManager.ts

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
var StorageConfig_1 = require("../Storage/StorageConfig");
var StorageManager_1 = require("../Storage/StorageManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TowerManager = /** @class */ (function (_super) {
    __extends(TowerManager, _super);
    function TowerManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //资源
        _this.tower_atlas = null;
        return _this;
    }
    TowerManager_1 = TowerManager;
    TowerManager.getInstance = function () {
        return this._instance;
    };
    TowerManager.prototype.onLoad = function () {
        TowerManager_1._instance = this;
        this.init();
    };
    TowerManager.prototype.onDestroy = function () {
        TowerManager_1._instance = null;
    };
    //初始化游戏数据
    TowerManager.prototype.init = function () {
    };
    TowerManager.prototype.getSpByName = function (name) {
        return this.tower_atlas.getSpriteFrame(name);
    };
    /**获得正在挑战的塔的等级 */
    TowerManager.getTowerLevel = function () {
        var level = cc.sys.localStorage.getItem('tower_level');
        if (level === "" || level === null) {
            level = 1;
        }
        else {
            level = parseInt(level);
        }
        return level;
    };
    TowerManager.addTowerLevel = function (level) {
        var newLevel = this.getTowerLevel() + level;
        // let maxLevel=TowerLevelManager.getMaxFloor();
        // if(newLevel<=maxLevel){
        //     this.saveTowerLevel(newLevel);
        // }
        this.saveTowerLevel(newLevel);
    };
    TowerManager.saveTowerLevel = function (level) {
        cc.sys.localStorage.setItem('tower_level', level);
    };
    TowerManager.getTodayPassNum = function () {
        return StorageManager_1.TheStorageManager.getInstance().getInt(StorageConfig_1.StorageKey.TowerPassNum, 0);
    };
    TowerManager.addTodayPassNum = function () {
        StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TowerPassNum, 1 + this.getTodayPassNum());
    };
    TowerManager.resetTodayPassNum = function () {
        StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TowerPassNum, 0);
    };
    var TowerManager_1;
    TowerManager._instance = null;
    TowerManager.is_show_tower = false;
    __decorate([
        property(cc.SpriteAtlas)
    ], TowerManager.prototype, "tower_atlas", void 0);
    TowerManager = TowerManager_1 = __decorate([
        ccclass
    ], TowerManager);
    return TowerManager;
}(cc.Component));
exports.default = TowerManager;

cc._RF.pop();