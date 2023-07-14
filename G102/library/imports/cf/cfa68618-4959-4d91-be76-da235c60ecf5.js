"use strict";
cc._RF.push(module, 'cfa68YYSVlNkb522iNcYOz1', 'TestTest');
// Scripts/Test/TestTest.ts

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
var Constants_1 = require("../Constants");
var EquipConfig_1 = require("../Equipment/EquipConfig");
var EquipmentManager_1 = require("../Equipment/EquipmentManager");
var GameManager_1 = require("../GameManager");
var HeroManager_1 = require("../Hero/Data/HeroManager");
var HeroConfig_1 = require("../Hero/Game/HeroConfig");
var LevelManager_1 = require("../Level/LevelManager");
var MissionLevel_1 = require("../Level/MissionLevel");
var TutorailsManager_1 = require("../Tutorials/TutorailsManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TestTest = /** @class */ (function (_super) {
    __extends(TestTest, _super);
    function TestTest() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.goto_scene = Constants_1.GameScene.game;
        _this.all_sp = [];
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    TestTest.prototype.start = function () {
        GameManager_1.default.getInstance().cur_game_scene = Constants_1.GameScene.load;
        // for(let i=0; i<Hero_Type.Hero_Num; i++)
        // {
        //     for(let n=0; n<3; n++)
        //     {
        //         EquipmentManager.getInstance().saveAllEquipmentList();
        //     }
        // }
    };
    TestTest.prototype.clickStart = function () {
        this.goto_scene = Constants_1.GameScene.game;
        this.cheakLoadToScene();
    };
    TestTest.prototype.clickBtnHome = function () {
        //let aa=EnemyJsonData.getBaseDanwei(Enemy_Type.xunjieshu);
        this.goto_scene = Constants_1.GameScene.home;
        this.cheakLoadToScene();
    };
    TestTest.prototype.clickBtnTest = function () {
        //let aa=EnemyJsonData.getBaseDanwei(Enemy_Type.xunjieshu);
        cc.director.loadScene('zhengxing');
    };
    TestTest.prototype.cheakLoadToScene = function () {
        var levelEditBox = this.node.getChildByName('levelEditBox');
        var level = levelEditBox.getComponent(cc.EditBox).string;
        var startLevel = parseInt(level);
        TutorailsManager_1.default.getInstance().saveTutorials(201);
        TutorailsManager_1.default.getInstance().saveTutorials(202);
        TutorailsManager_1.default.getInstance().saveTutorials(203);
        TutorailsManager_1.default.getInstance().saveTutorials(204);
        TutorailsManager_1.default.getInstance().saveTutorials(205);
        TutorailsManager_1.default.getInstance().saveTutorials(206);
        TutorailsManager_1.default.getInstance().saveTutorials(207);
        TutorailsManager_1.default.getInstance().saveTutorials(208);
        TutorailsManager_1.default.getInstance().saveTutorials(209);
        TutorailsManager_1.default.getInstance().saveTutorials(210);
        TutorailsManager_1.default.getInstance().saveTutorials(211);
        TutorailsManager_1.default.getInstance().saveTutorials(212);
        TutorailsManager_1.default.getInstance().saveTutorials(213);
        TutorailsManager_1.default.getInstance().saveTutorials(214);
        TutorailsManager_1.default.getInstance().saveTutorials(215);
        TutorailsManager_1.default.getInstance().saveTutorials(216);
        TutorailsManager_1.default.getInstance().saveTutorials(217);
        TutorailsManager_1.default.getInstance().saveTutorials(218);
        TutorailsManager_1.default.getInstance().saveTutorials(219);
        TutorailsManager_1.default.getInstance().saveTutorials(220);
        TutorailsManager_1.default.getInstance().saveTutorials(221);
        TutorailsManager_1.default.getInstance().saveTutorials(222);
        TutorailsManager_1.default.getInstance().saveTutorials(223);
        TutorailsManager_1.default.getInstance().saveTutorials(224);
        if (startLevel > 0) {
            //英雄品质
            var qualityEditBox = this.node.getChildByName('qualityEditBox');
            var heroQualityStr = qualityEditBox.getComponent(cc.EditBox).string;
            var heroQuality = parseInt(heroQualityStr);
            //装备
            var equipEditBox = this.node.getChildByName('equipEditBox');
            var equipStr = equipEditBox.getComponent(cc.EditBox).string;
            var equipLevel = parseInt(equipStr);
            if (equipLevel > 0) {
                var em = EquipmentManager_1.EquipmentManager.getInstance();
                for (var i = EquipConfig_1.EquipType.WuQi; i < EquipConfig_1.EquipType.Num; i++) {
                    for (var h = HeroConfig_1.Hero_Type.ChangMaoShou; h < HeroConfig_1.Hero_Type.Hero_Num; h++) {
                    }
                }
            }
            else {
                for (var h = HeroConfig_1.Hero_Type.ChangMaoShou; h < HeroConfig_1.Hero_Type.Hero_Num; h++) {
                    EquipmentManager_1.EquipmentManager.getInstance().checkQuickUnload(h, true);
                }
            }
            //获取英雄
            var heroRoot = this.node.getChildByName('heroRoot');
            var shangzhenHero = new Array();
            for (var i = 0; i < heroRoot.childrenCount; i++) {
                if (heroRoot.children[i].getComponent(cc.Toggle).isChecked) {
                    shangzhenHero.push(i + 1);
                }
            }
            //英雄等级
            var heroLevelEditBox = this.node.getChildByName('heroLevelEditBox');
            var heroLevelStr = heroLevelEditBox.getComponent(cc.EditBox).string;
            var heroLevel = parseInt(heroLevelStr);
            var teamList = new Array(5);
            var shangzhenNum = 0;
            var shunxu = [2, 1, 3, 0, 4];
            for (var i = 0; i < 5; i++) {
                if (i < shangzhenHero.length) {
                    teamList[shunxu[shangzhenNum]] = shangzhenHero[i];
                    // HeroManager.getInstance().saveHeroLevel(shangzhenHero[i],heroLevel);
                    shangzhenNum++;
                }
                else {
                    teamList[shunxu[shangzhenNum]] = -1;
                    shangzhenNum++;
                }
            }
            HeroManager_1.HeroManager.getInstance().saveTeamList(GameManager_1.default.getInstance().cur_game_mode, teamList);
            //设置装备数据和等级数据
            var heroList = HeroManager_1.HeroManager.getInstance().getHeroList();
            for (var i = 0; i < heroList.length; i++) {
                // HeroManager.getInstance().saveHeroQuality(i,heroQuality);
            }
            //刷新数据   
            for (var i = 0; i < heroList.length; i++) {
                HeroManager_1.HeroManager.getInstance().refreshHeroData(heroList[i].hero_type);
            }
            this.node.getChildByName('bg_loading').active = true;
            //获取填写的关卡数
            LevelManager_1.LevelManager.getInstance().start_level = startLevel;
            GameManager_1.default.getInstance().fighting_info = MissionLevel_1.MissionLevelManager.getInstance().getFightingInfo(startLevel);
            cc.director.loadScene(this.goto_scene);
        }
        else {
            GameManager_1.default.getInstance().showMessage('关卡需要大于0或者不能为空');
        }
    };
    __decorate([
        property([cc.SpriteFrame])
    ], TestTest.prototype, "all_sp", void 0);
    TestTest = __decorate([
        ccclass
    ], TestTest);
    return TestTest;
}(cc.Component));
exports.default = TestTest;

cc._RF.pop();