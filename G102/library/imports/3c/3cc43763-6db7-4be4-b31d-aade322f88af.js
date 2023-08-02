"use strict";
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