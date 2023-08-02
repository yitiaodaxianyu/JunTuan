
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Tower/BtnTower.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '3cc43djbbdL5LMdqt4yL4iv', 'BtnTower');
// Scripts/Tower/BtnTower.ts

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
var WXManagerEX_1 = require("../../startscene/WXManagerEX");
var MonsterConfigure_1 = require("../Monster/Data/MonsterConfigure");
var MonsterData_1 = require("../Monster/MonsterData");
var TextLanguage_1 = require("../multiLanguage/TextLanguage");
var UIConfig_1 = require("../UI/UIConfig");
var UIManager_1 = require("../UI/UIManager");
var TowerFightingUi_1 = require("./TowerFightingUi");
var TowerLevel_1 = require("./TowerLevel");
var TowerManager_1 = require("./TowerManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BtnTower = /** @class */ (function (_super) {
    __extends(BtnTower, _super);
    function BtnTower() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.level = null;
        return _this;
    }
    BtnTower.prototype.init = function (level) {
        this.level = level;
        this.initData();
        this.refreshData();
    };
    BtnTower.prototype.initData = function () {
        var data = TowerLevel_1.TowerLevelManager.getInstance().getFightingInfo(this.level);
        this.node.getChildByName('levelLabel').getComponent(TextLanguage_1.default).setTextId(100020);
        this.node.getChildByName('levelLabel').getComponent(TextLanguage_1.default).setReplaceValue('~', this.level + '');
        //是否有宝箱
        // let extraReward=TowerRewardManager.getInstance().getExtraReward(this.level);
        // let reward=this.node.getChildByName('reward');
        // reward.active=extraReward>0;
        // let spName=extraReward?"Tower_Main_1":"Tower_Main_0"
        // this.node.getComponent(cc.Sprite).spriteFrame=TowerManager.getInstance().getSpByName(spName);
        // let shadow=this.node.getChildByName('shadow');
        // spName=extraReward?"Tower_Shadow_1":"Tower_Shadow_0"
        // shadow.getComponent(cc.Sprite).spriteFrame=TowerManager.getInstance().getSpByName(spName);
        this.node.getChildByName("bg").scaleX = this.level % 2 == 0 ? -1 : 1;
        var towerLevel = TowerManager_1.default.getTowerLevel();
        if (towerLevel > this.level) {
            this.node.getChildByName("bg").children.forEach(function (v, k) {
                v.active = false;
            });
            this.node.getChildByName("bg").getChildByName("monsterRoot").active = false;
            this.node.getChildByName("reward").getComponentInChildren(cc.Sprite).spriteFrame = TowerManager_1.default.getInstance().getSpByName("Tower_Chesk_1");
            this.node.getChildByName("reward").getComponentInChildren(cc.Button).enabled = false;
            this.node.getChildByName("bg").getComponent(cc.Sprite).spriteFrame = TowerManager_1.default.getInstance().getSpByName("Tower_Bg_1_1");
        }
        else {
            var monsterList = data.getOnlyMonsterDataList();
            this.sortMonster(monsterList);
            var type = MonsterConfigure_1.MonsterConfigureManager.getInstance().getMonsterClass(monsterList[0].id);
            this.loadPrefab(type + "", monsterList[0].id);
            this.node.getChildByName("bg").getComponent(cc.Sprite).spriteFrame = TowerManager_1.default.getInstance().getSpByName("Tower_Bg_1");
        }
    };
    BtnTower.prototype.refreshData = function () {
        //根据完成的关卡设置可见属性
        var towerLevel = TowerManager_1.default.getTowerLevel();
        // this.setDoor(towerLevel);
    };
    BtnTower.prototype.setDoor = function (towerLevel) {
        //设置门的显示状态
        var door = this.node.getChildByName('door');
        var doorSp = door.getComponent(cc.Sprite);
        var fire = door.getChildByName('fire');
        //火把
        var an1 = this.node.getChildByName("Torch1").getComponent(cc.Animation);
        var an2 = this.node.getChildByName("Torch2").getComponent(cc.Animation);
        //遮罩
        var shadow = this.node.getChildByName('shadow');
        if (towerLevel > this.level) {
            //已经完成
            doorSp.spriteFrame = TowerManager_1.default.getInstance().getSpByName("Tower_Door_0");
            fire.active = false;
            an1.enabled = false;
            an2.enabled = false;
            shadow.active = true;
        }
        else if (towerLevel == this.level) {
            //正在挑战
            doorSp.spriteFrame = TowerManager_1.default.getInstance().getSpByName("Tower_Door_1");
            fire.active = true;
            an1.enabled = true;
            an2.enabled = true;
            shadow.active = false;
        }
        else {
            //还未挑战
            doorSp.spriteFrame = TowerManager_1.default.getInstance().getSpByName("Tower_Door_2");
            fire.active = false;
            an1.enabled = true;
            an2.enabled = true;
            shadow.active = false;
        }
    };
    //显示解锁过程
    BtnTower.prototype.showUnlonkProcess0 = function () {
        //设置门的显示状态
        var door = this.node.getChildByName('door');
        var doorSp = door.getComponent(cc.Sprite);
        var fire = door.getChildByName('fire');
        doorSp.spriteFrame = TowerManager_1.default.getInstance().getSpByName("Tower_Door_1");
        fire.active = true;
        //火把
        var an1 = this.node.getChildByName("Torch1").getComponent(cc.Animation);
        var an2 = this.node.getChildByName("Torch2").getComponent(cc.Animation);
        an1.enabled = true;
        an2.enabled = true;
        //遮罩
        var shadow = this.node.getChildByName('shadow');
        shadow.active = false;
    };
    BtnTower.prototype.showUnlonkProcess1 = function () {
        //设置门的显示状态
        this.refreshData();
        //遮罩
        var shadow = this.node.getChildByName('shadow');
        shadow.opacity = 0;
        cc.tween(shadow).to(0.5, { opacity: 255 }).start();
        this.node.getChildByName("Torch1").getComponent(cc.Sprite).spriteFrame = TowerManager_1.default.getInstance().getSpByName('Torch');
        this.node.getChildByName("Torch2").getComponent(cc.Sprite).spriteFrame = TowerManager_1.default.getInstance().getSpByName('Torch');
    };
    BtnTower.prototype.sortMonster = function (list) {
        list.sort(function (a, b) {
            var at = MonsterConfigure_1.MonsterConfigureManager.getInstance().getStrengthType(a.id);
            var bt = MonsterConfigure_1.MonsterConfigureManager.getInstance().getStrengthType(b.id);
            return bt - at;
        });
    };
    BtnTower.prototype.loadPrefab = function (type, id) {
        var _this = this;
        var path = "monster/ui/Monster_" + type;
        var node = null;
        WXManagerEX_1.default.getInstance().resourcesBundle.load(path, cc.Prefab, function (error, assets) {
            if (error) {
                cc.log(error);
                return;
            }
            node = cc.instantiate(assets);
            // node.removeComponent(Monster);
            // node.removeComponent(cc.PolygonCollider);
            node.parent = _this.node.getChildByName("bg").getChildByName("monsterRoot");
            node.setPosition(cc.v2(0, 0));
            if (MonsterConfigure_1.MonsterConfigureManager.getInstance().getStrengthType(id) != 3) {
                node.scale = MonsterConfigure_1.MonsterConfigureManager.getInstance().getScale(id) * 1.5;
                node.getComponent(sp.Skeleton).setSkin(MonsterData_1.MonsterFaceName.SideL + MonsterConfigure_1.MonsterConfigureManager.getInstance().getSkin(id));
                node.getComponent(sp.Skeleton).setAnimation(0, MonsterData_1.MonsterFaceName.SideR + "_" + MonsterData_1.MonsterActionName.Idle, true);
            }
            else {
                node.getComponent(sp.Skeleton).setAnimation(0, "idle", true);
            }
        });
    };
    BtnTower.prototype.onClickPreviewBtn = function () {
        var _this = this;
        // UIManager.getInstance().showTowerFightingUi(null,this.level);
        UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.TowerFightting, UIConfig_1.UILayerLevel.One, { onCompleted: function (uiNode) {
                uiNode.getComponent(TowerFightingUi_1.default).init(null);
                uiNode.getComponent(TowerFightingUi_1.default).initData(_this.level);
            }, });
    };
    BtnTower = __decorate([
        ccclass
    ], BtnTower);
    return BtnTower;
}(cc.Component));
exports.default = BtnTower;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVG93ZXJcXEJ0blRvd2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDREQUF1RDtBQUV2RCxxRUFBMkU7QUFFM0Usc0RBQTRFO0FBQzVFLDhEQUF5RDtBQUN6RCwyQ0FBc0Q7QUFDdEQsNkNBQTRDO0FBQzVDLHFEQUFnRDtBQUNoRCwyQ0FBaUQ7QUFDakQsK0NBQTBDO0FBSXBDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXNDLDRCQUFZO0lBQWxEO1FBQUEscUVBd0pDO1FBdEpHLFdBQUssR0FBUSxJQUFJLENBQUM7O0lBc0p0QixDQUFDO0lBcEpHLHVCQUFJLEdBQUosVUFBTSxLQUFZO1FBQ2QsSUFBSSxDQUFDLEtBQUssR0FBQyxLQUFLLENBQUM7UUFDakIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRU8sMkJBQVEsR0FBaEI7UUFDSSxJQUFJLElBQUksR0FBRyw4QkFBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ3RFLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDLFlBQVksQ0FBQyxzQkFBWSxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BGLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDLFlBQVksQ0FBQyxzQkFBWSxDQUFDLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBQyxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZHLE9BQU87UUFDUCwrRUFBK0U7UUFDL0UsaURBQWlEO1FBQ2pELCtCQUErQjtR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QWlCLENBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxDQUFDO2FBQzVHO2lCQUFJO2dCQUNELElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLElBQUksQ0FBQyxDQUFDO2FBQzlEO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBR0Qsb0NBQWlCLEdBQWpCO1FBQUEsaUJBTUM7UUFMRyxnRUFBZ0U7UUFDaEUscUJBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxZQUFZLENBQUMsaUJBQU0sQ0FBQyxjQUFjLEVBQUMsdUJBQVksQ0FBQyxHQUFHLEVBQUMsRUFBQyxXQUFXLEVBQUMsVUFBQyxNQUFNO2dCQUM1RixNQUFNLENBQUMsWUFBWSxDQUFDLHlCQUFlLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2hELE1BQU0sQ0FBQyxZQUFZLENBQUMseUJBQWUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDOUQsQ0FBQyxHQUFFLENBQUMsQ0FBQTtJQUNSLENBQUM7SUF0SmdCLFFBQVE7UUFENUIsT0FBTztPQUNhLFFBQVEsQ0F3SjVCO0lBQUQsZUFBQztDQXhKRCxBQXdKQyxDQXhKcUMsRUFBRSxDQUFDLFNBQVMsR0F3SmpEO2tCQXhKb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBXWE1hbmFnZXJFWCBmcm9tIFwiLi4vLi4vc3RhcnRzY2VuZS9XWE1hbmFnZXJFWFwiO1xyXG5pbXBvcnQgeyBUYWJsZU1vbnN0ZXJEYXRhIH0gZnJvbSBcIi4uL0xldmVsL01pc3Npb25MZXZlbFwiO1xyXG5pbXBvcnQgeyBNb25zdGVyQ29uZmlndXJlTWFuYWdlciB9IGZyb20gXCIuLi9Nb25zdGVyL0RhdGEvTW9uc3RlckNvbmZpZ3VyZVwiO1xyXG5pbXBvcnQgTW9uc3RlciBmcm9tIFwiLi4vTW9uc3Rlci9Nb25zdGVyXCI7XHJcbmltcG9ydCB7IE1vbnN0ZXJBY3Rpb25OYW1lLCBNb25zdGVyRmFjZU5hbWUgfSBmcm9tIFwiLi4vTW9uc3Rlci9Nb25zdGVyRGF0YVwiO1xyXG5pbXBvcnQgVGV4dExhbmd1YWdlIGZyb20gXCIuLi9tdWx0aUxhbmd1YWdlL1RleHRMYW5ndWFnZVwiO1xyXG5pbXBvcnQgeyBVSUxheWVyTGV2ZWwsIFVJUGF0aCB9IGZyb20gXCIuLi9VSS9VSUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBVSU1hbmFnZXIgfSBmcm9tIFwiLi4vVUkvVUlNYW5hZ2VyXCI7XHJcbmltcG9ydCBUb3dlckZpZ2h0aW5nVWkgZnJvbSBcIi4vVG93ZXJGaWdodGluZ1VpXCI7XHJcbmltcG9ydCB7IFRvd2VyTGV2ZWxNYW5hZ2VyIH0gZnJvbSBcIi4vVG93ZXJMZXZlbFwiO1xyXG5pbXBvcnQgVG93ZXJNYW5hZ2VyIGZyb20gXCIuL1Rvd2VyTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBUb3dlclJld2FyZE1hbmFnZXIgfSBmcm9tIFwiLi9Ub3dlclJld2FyZFwiO1xyXG5cclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnRuVG93ZXIgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIGxldmVsOm51bWJlcj1udWxsO1xyXG5cclxuICAgIGluaXQgKGxldmVsOm51bWJlcikge1xyXG4gICAgICAgIHRoaXMubGV2ZWw9bGV2ZWw7XHJcbiAgICAgICAgdGhpcy5pbml0RGF0YSgpO1xyXG4gICAgICAgIHRoaXMucmVmcmVzaERhdGEoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXREYXRhKCl7XHJcbiAgICAgICAgbGV0IGRhdGEgPSBUb3dlckxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEZpZ2h0aW5nSW5mbyh0aGlzLmxldmVsKVxyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnbGV2ZWxMYWJlbCcpLmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnNldFRleHRJZCgxMDAwMjApO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnbGV2ZWxMYWJlbCcpLmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnNldFJlcGxhY2VWYWx1ZSgnficsdGhpcy5sZXZlbCArICcnKTtcclxuICAgICAgICAvL+aYr+WQpuacieWuneeusVxyXG4gICAgICAgIC8vIGxldCBleHRyYVJld2FyZD1Ub3dlclJld2FyZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRFeHRyYVJld2FyZCh0aGlzLmxldmVsKTtcclxuICAgICAgICAvLyBsZXQgcmV3YXJkPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgncmV3YXJkJyk7XHJcbiAgICAgICAgLy8gcmV3YXJkLmFjdGl2ZT1leHRyYVJld2FyZD4wO1xyXG4gICAgICAgIC8vIGxldCBzcE5hbWU9ZXh0cmFSZXdhcmQ/XCJUb3dlcl9NYWluXzFcIjpcIlRvd2VyX01haW5fMFwiXHJcbiAgICAgICAgLy8gdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lPVRvd2VyTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNwQnlOYW1lKHNwTmFtZSk7XHJcbiAgICAgICAgLy8gbGV0IHNoYWRvdz10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3NoYWRvdycpO1xyXG4gICAgICAgIC8vIHNwTmFtZT1leHRyYVJld2FyZD9cIlRvd2VyX1NoYWRvd18xXCI6XCJUb3dlcl9TaGFkb3dfMFwiXHJcbiAgICAgICAgLy8gc2hhZG93LmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lPVRvd2VyTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNwQnlOYW1lKHNwTmFtZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYmdcIikuc2NhbGVYID0gdGhpcy5sZXZlbCAlIDIgPT0gMCA/IC0xIDogMTtcclxuICAgICAgICBsZXQgdG93ZXJMZXZlbD1Ub3dlck1hbmFnZXIuZ2V0VG93ZXJMZXZlbCgpO1xyXG4gICAgICAgIGlmKHRvd2VyTGV2ZWwgPiB0aGlzLmxldmVsKXtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYmdcIikuY2hpbGRyZW4uZm9yRWFjaCgodixrKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYmdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJtb25zdGVyUm9vdFwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwicmV3YXJkXCIpLmdldENvbXBvbmVudEluQ2hpbGRyZW4oY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IFRvd2VyTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNwQnlOYW1lKFwiVG93ZXJfQ2hlc2tfMVwiKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwicmV3YXJkXCIpLmdldENvbXBvbmVudEluQ2hpbGRyZW4oY2MuQnV0dG9uKS5lbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gVG93ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3BCeU5hbWUoXCJUb3dlcl9CZ18xXzFcIik7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGxldCBtb25zdGVyTGlzdCA9IGRhdGEuZ2V0T25seU1vbnN0ZXJEYXRhTGlzdCgpO1xyXG4gICAgICAgICAgICB0aGlzLnNvcnRNb25zdGVyKG1vbnN0ZXJMaXN0KTtcclxuICAgICAgICAgICAgbGV0IHR5cGU9TW9uc3RlckNvbmZpZ3VyZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNb25zdGVyQ2xhc3MobW9uc3Rlckxpc3RbMF0uaWQpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRQcmVmYWIodHlwZStcIlwiLG1vbnN0ZXJMaXN0WzBdLmlkKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYmdcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBUb3dlck1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTcEJ5TmFtZShcIlRvd2VyX0JnXzFcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlZnJlc2hEYXRhKCl7XHJcbiAgICAgICAgLy/moLnmja7lrozmiJDnmoTlhbPljaHorr7nva7lj6/op4HlsZ7mgKdcclxuICAgICAgICBsZXQgdG93ZXJMZXZlbD1Ub3dlck1hbmFnZXIuZ2V0VG93ZXJMZXZlbCgpO1xyXG4gICAgICAgIC8vIHRoaXMuc2V0RG9vcih0b3dlckxldmVsKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXREb29yKHRvd2VyTGV2ZWw6bnVtYmVyKXtcclxuICAgICAgICAvL+iuvue9rumXqOeahOaYvuekuueKtuaAgVxyXG4gICAgICAgIGxldCBkb29yPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnZG9vcicpO1xyXG4gICAgICAgIGxldCBkb29yU3A9ZG9vci5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcclxuICAgICAgICBsZXQgZmlyZT1kb29yLmdldENoaWxkQnlOYW1lKCdmaXJlJyk7XHJcbiAgICAgICAgLy/ngavmiopcclxuICAgICAgICBsZXQgYW4xPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIlRvcmNoMVwiKS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKTtcclxuICAgICAgICBsZXQgYW4yPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIlRvcmNoMlwiKS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKTtcclxuICAgICAgICAvL+mBrue9qVxyXG4gICAgICAgIGxldCBzaGFkb3c9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdzaGFkb3cnKTtcclxuICAgICAgICBpZih0b3dlckxldmVsPnRoaXMubGV2ZWwpe1xyXG4gICAgICAgICAgICAvL+W3sue7j+WujOaIkFxyXG4gICAgICAgICAgICBkb29yU3Auc3ByaXRlRnJhbWU9VG93ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3BCeU5hbWUoXCJUb3dlcl9Eb29yXzBcIik7XHJcbiAgICAgICAgICAgIGZpcmUuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICBhbjEuZW5hYmxlZD1mYWxzZTtcclxuICAgICAgICAgICAgYW4yLmVuYWJsZWQ9ZmFsc2U7XHJcbiAgICAgICAgICAgIHNoYWRvdy5hY3RpdmU9dHJ1ZTsgICAgICAgICAgICBcclxuICAgICAgICB9ZWxzZSBpZih0b3dlckxldmVsPT10aGlzLmxldmVsKXtcclxuICAgICAgICAgICAgLy/mraPlnKjmjJHmiJhcclxuICAgICAgICAgICAgZG9vclNwLnNwcml0ZUZyYW1lPVRvd2VyTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNwQnlOYW1lKFwiVG93ZXJfRG9vcl8xXCIpO1xyXG4gICAgICAgICAgICBmaXJlLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgICBhbjEuZW5hYmxlZD10cnVlO1xyXG4gICAgICAgICAgICBhbjIuZW5hYmxlZD10cnVlO1xyXG4gICAgICAgICAgICBzaGFkb3cuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAvL+i/mOacquaMkeaImFxyXG4gICAgICAgICAgICBkb29yU3Auc3ByaXRlRnJhbWU9VG93ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3BCeU5hbWUoXCJUb3dlcl9Eb29yXzJcIik7XHJcbiAgICAgICAgICAgIGZpcmUuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICBhbjEuZW5hYmxlZD10cnVlO1xyXG4gICAgICAgICAgICBhbjIuZW5hYmxlZD10cnVlO1xyXG4gICAgICAgICAgICBzaGFkb3cuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+aYvuekuuino+mUgei/h+eoi1xyXG4gICAgc2hvd1VubG9ua1Byb2Nlc3MwKCl7XHJcbiAgICAgICAgLy/orr7nva7pl6jnmoTmmL7npLrnirbmgIFcclxuICAgICAgICBsZXQgZG9vcj10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2Rvb3InKTtcclxuICAgICAgICBsZXQgZG9vclNwPWRvb3IuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICAgICAgbGV0IGZpcmU9ZG9vci5nZXRDaGlsZEJ5TmFtZSgnZmlyZScpO1xyXG4gICAgICAgIGRvb3JTcC5zcHJpdGVGcmFtZT1Ub3dlck1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTcEJ5TmFtZShcIlRvd2VyX0Rvb3JfMVwiKTtcclxuICAgICAgICBmaXJlLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgIC8v54Gr5oqKXHJcbiAgICAgICAgbGV0IGFuMT10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJUb3JjaDFcIikuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XHJcbiAgICAgICAgbGV0IGFuMj10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJUb3JjaDJcIikuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7ICAgICAgICBcclxuICAgICAgICBhbjEuZW5hYmxlZD10cnVlO1xyXG4gICAgICAgIGFuMi5lbmFibGVkPXRydWU7XHJcbiAgICAgICAgLy/pga7nvalcclxuICAgICAgICBsZXQgc2hhZG93PXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnc2hhZG93Jyk7XHJcbiAgICAgICAgc2hhZG93LmFjdGl2ZT1mYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93VW5sb25rUHJvY2VzczEoKXtcclxuICAgICAgICAvL+iuvue9rumXqOeahOaYvuekuueKtuaAgVxyXG4gICAgICAgIHRoaXMucmVmcmVzaERhdGEoKTtcclxuICAgICAgICAvL+mBrue9qVxyXG4gICAgICAgIGxldCBzaGFkb3c9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdzaGFkb3cnKTtcclxuICAgICAgICBzaGFkb3cub3BhY2l0eT0wO1xyXG4gICAgICAgIGNjLnR3ZWVuKHNoYWRvdykudG8oMC41LHtvcGFjaXR5OjI1NX0pLnN0YXJ0KCk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiVG9yY2gxXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lPVRvd2VyTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNwQnlOYW1lKCdUb3JjaCcpO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIlRvcmNoMlwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZT1Ub3dlck1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTcEJ5TmFtZSgnVG9yY2gnKTsgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHNvcnRNb25zdGVyKGxpc3Q6VGFibGVNb25zdGVyRGF0YVtdKXtcclxuICAgICAgICBsaXN0LnNvcnQoKGEsYikgPT4ge1xyXG4gICAgICAgICAgICBsZXQgYXQgPSBNb25zdGVyQ29uZmlndXJlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0cmVuZ3RoVHlwZShhLmlkKTtcclxuICAgICAgICAgICAgbGV0IGJ0ID0gTW9uc3RlckNvbmZpZ3VyZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJlbmd0aFR5cGUoYi5pZCk7XHJcbiAgICAgICAgICAgIHJldHVybiBidCAtIGF0O1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcml2YXRlIGxvYWRQcmVmYWIodHlwZTpzdHJpbmcsaWQpe1xyXG4gICAgICAgIGxldCBwYXRoID0gXCJtb25zdGVyL3VpL01vbnN0ZXJfXCIgKyB0eXBlO1xyXG4gICAgICAgIGxldCBub2RlOmNjLk5vZGUgPSBudWxsO1xyXG4gICAgICAgIFdYTWFuYWdlckVYLmdldEluc3RhbmNlKCkucmVzb3VyY2VzQnVuZGxlLmxvYWQocGF0aCxjYy5QcmVmYWIsKGVycm9yOiBFcnJvciwgYXNzZXRzOmNjLlByZWZhYik9PnsgIFxyXG4gICAgICAgICAgICBpZihlcnJvcil7XHJcbiAgICAgICAgICAgICAgICBjYy5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG5vZGUgPSBjYy5pbnN0YW50aWF0ZShhc3NldHMpO1xyXG4gICAgICAgICAgICAvLyBub2RlLnJlbW92ZUNvbXBvbmVudChNb25zdGVyKTtcclxuICAgICAgICAgICAgLy8gbm9kZS5yZW1vdmVDb21wb25lbnQoY2MuUG9seWdvbkNvbGxpZGVyKTtcclxuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKS5nZXRDaGlsZEJ5TmFtZShcIm1vbnN0ZXJSb290XCIpO1xyXG4gICAgICAgICAgICBub2RlLnNldFBvc2l0aW9uKGNjLnYyKDAsMCkpO1xyXG4gICAgICAgICAgICBpZihNb25zdGVyQ29uZmlndXJlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0cmVuZ3RoVHlwZShpZCkgIT0gMyl7XHJcbiAgICAgICAgICAgICAgICBub2RlLnNjYWxlID0gTW9uc3RlckNvbmZpZ3VyZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTY2FsZShpZCkgKiAxLjU7XHJcbiAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuc2V0U2tpbihNb25zdGVyRmFjZU5hbWUuU2lkZUwgKyBNb25zdGVyQ29uZmlndXJlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNraW4oaWQpKTtcclxuICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5zZXRBbmltYXRpb24oMCxNb25zdGVyRmFjZU5hbWUuU2lkZVIgKyBcIl9cIiArIE1vbnN0ZXJBY3Rpb25OYW1lLklkbGUsdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLnNldEFuaW1hdGlvbigwLFwiaWRsZVwiLHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICBvbkNsaWNrUHJldmlld0J0bigpe1xyXG4gICAgICAgIC8vIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dUb3dlckZpZ2h0aW5nVWkobnVsbCx0aGlzLmxldmVsKTtcclxuICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLlRvd2VyRmlnaHR0aW5nLFVJTGF5ZXJMZXZlbC5PbmUse29uQ29tcGxldGVkOih1aU5vZGUpPT4ge1xyXG4gICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KFRvd2VyRmlnaHRpbmdVaSkuaW5pdChudWxsKTtcclxuICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChUb3dlckZpZ2h0aW5nVWkpLmluaXREYXRhKHRoaXMubGV2ZWwpO1xyXG4gICAgICAgIH0sfSlcclxuICAgIH1cclxuXHJcbn1cclxuIl19