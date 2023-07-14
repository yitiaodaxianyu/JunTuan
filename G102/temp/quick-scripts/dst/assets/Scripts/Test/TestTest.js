
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Test/TestTest.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVGVzdFxcVGVzdFRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMENBQXlDO0FBRXpDLHdEQUFxRDtBQUNyRCxrRUFBaUU7QUFFakUsOENBQXlDO0FBQ3pDLHdEQUF1RDtBQUN2RCxzREFBb0Q7QUFHcEQsc0RBQXFEO0FBQ3JELHNEQUE0RDtBQUU1RCxrRUFBNkQ7QUFHdkQsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBc0MsNEJBQVk7SUFBbEQ7UUFBQSxxRUF1SkM7UUFySkcsZ0JBQVUsR0FBVyxxQkFBUyxDQUFDLElBQUksQ0FBQztRQUdwQyxZQUFNLEdBQWtCLEVBQUUsQ0FBQzs7SUFrSi9CLENBQUM7SUFqSkcsd0JBQXdCO0lBRXhCLGVBQWU7SUFFZix3QkFBSyxHQUFMO1FBQ0kscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLEdBQUMscUJBQVMsQ0FBQyxJQUFJLENBQUM7UUFDeEQsMENBQTBDO1FBQzFDLElBQUk7UUFDSiw2QkFBNkI7UUFDN0IsUUFBUTtRQUNSLGlFQUFpRTtRQUNqRSxRQUFRO1FBQ1IsSUFBSTtJQUVSLENBQUM7SUFFRCw2QkFBVSxHQUFWO1FBRUksSUFBSSxDQUFDLFVBQVUsR0FBQyxxQkFBUyxDQUFDLElBQUksQ0FBQztRQUMvQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRUQsK0JBQVksR0FBWjtRQUVJLDJEQUEyRDtRQUMzRCxJQUFJLENBQUMsVUFBVSxHQUFDLHFCQUFTLENBQUMsSUFBSSxDQUFDO1FBQy9CLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFRCwrQkFBWSxHQUFaO1FBRUksMkRBQTJEO1FBQzNELEVBQUUsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFD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dkpxQyxFQUFFLENBQUMsU0FBUyxHQXVKakQ7a0JBdkpvQixRQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR2FtZVNjZW5lIH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xyXG5cclxuaW1wb3J0IHsgRXF1aXBUeXBlIH0gZnJvbSBcIi4uL0VxdWlwbWVudC9FcXVpcENvbmZpZ1wiO1xyXG5pbXBvcnQgeyBFcXVpcG1lbnRNYW5hZ2VyIH0gZnJvbSBcIi4uL0VxdWlwbWVudC9FcXVpcG1lbnRNYW5hZ2VyXCI7XHJcblxyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEhlcm9NYW5hZ2VyIH0gZnJvbSBcIi4uL0hlcm8vRGF0YS9IZXJvTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBIZXJvX1R5cGUgfSBmcm9tIFwiLi4vSGVyby9HYW1lL0hlcm9Db25maWdcIjtcclxuXHJcblxyXG5pbXBvcnQgeyBMZXZlbE1hbmFnZXIgfSBmcm9tIFwiLi4vTGV2ZWwvTGV2ZWxNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IE1pc3Npb25MZXZlbE1hbmFnZXIgfSBmcm9tIFwiLi4vTGV2ZWwvTWlzc2lvbkxldmVsXCI7XHJcblxyXG5pbXBvcnQgVHV0b3JhaWxzTWFuYWdlciBmcm9tIFwiLi4vVHV0b3JpYWxzL1R1dG9yYWlsc01hbmFnZXJcIjtcclxuXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRlc3RUZXN0IGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBnb3RvX3NjZW5lOkdhbWVTY2VuZT1HYW1lU2NlbmUuZ2FtZTtcclxuXHJcbiAgICBAcHJvcGVydHkoW2NjLlNwcml0ZUZyYW1lXSlcclxuICAgIGFsbF9zcDpjYy5TcHJpdGVGcmFtZVtdPVtdO1xyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcblxyXG4gICAgLy8gb25Mb2FkICgpIHt9XHJcblxyXG4gICAgc3RhcnQgKCkge1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfc2NlbmU9R2FtZVNjZW5lLmxvYWQ7XHJcbiAgICAgICAgLy8gZm9yKGxldCBpPTA7IGk8SGVyb19UeXBlLkhlcm9fTnVtOyBpKyspXHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgIC8vICAgICBmb3IobGV0IG49MDsgbjwzOyBuKyspXHJcbiAgICAgICAgLy8gICAgIHtcclxuICAgICAgICAvLyAgICAgICAgIEVxdWlwbWVudE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlQWxsRXF1aXBtZW50TGlzdCgpO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrU3RhcnQoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuZ290b19zY2VuZT1HYW1lU2NlbmUuZ2FtZTsgICAgXHJcbiAgICAgICAgdGhpcy5jaGVha0xvYWRUb1NjZW5lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5Ib21lKClcclxuICAgIHtcclxuICAgICAgICAvL2xldCBhYT1FbmVteUpzb25EYXRhLmdldEJhc2VEYW53ZWkoRW5lbXlfVHlwZS54dW5qaWVzaHUpO1xyXG4gICAgICAgIHRoaXMuZ290b19zY2VuZT1HYW1lU2NlbmUuaG9tZTtcclxuICAgICAgICB0aGlzLmNoZWFrTG9hZFRvU2NlbmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBjbGlja0J0blRlc3QoKVxyXG4gICAge1xyXG4gICAgICAgIC8vbGV0IGFhPUVuZW15SnNvbkRhdGEuZ2V0QmFzZURhbndlaShFbmVteV9UeXBlLnh1bmppZXNodSk7XHJcbiAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKCd6aGVuZ3hpbmcnKTtcclxuICAgIH1cclxuXHJcbiAgICBjaGVha0xvYWRUb1NjZW5lKClcclxuICAgIHtcclxuICAgICAgICBsZXQgbGV2ZWxFZGl0Qm94PXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnbGV2ZWxFZGl0Qm94Jyk7XHJcbiAgICAgICAgbGV0IGxldmVsPWxldmVsRWRpdEJveC5nZXRDb21wb25lbnQoY2MuRWRpdEJveCkuc3RyaW5nO1xyXG4gICAgICAgIGxldCBzdGFydExldmVsPXBhcnNlSW50KGxldmVsKTtcclxuICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMDEpO1xyXG4gICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIwMik7XHJcbiAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjAzKTtcclxuICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMDQpO1xyXG4gICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIwNSk7XHJcbiAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjA2KTtcclxuICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMDcpO1xyXG4gICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIwOCk7XHJcbiAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjA5KTtcclxuICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMTApO1xyXG4gICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIxMSk7XHJcbiAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjEyKTtcclxuICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMTMpO1xyXG4gICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIxNCk7XHJcbiAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjE1KTtcclxuICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMTYpO1xyXG4gICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIxNyk7XHJcbiAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjE4KTtcclxuICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMTkpO1xyXG4gICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIyMCk7XHJcbiAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjIxKTtcclxuICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMjIpO1xyXG4gICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIyMyk7XHJcbiAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjI0KTtcclxuICAgICAgICBpZihzdGFydExldmVsPjApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL+iLsembhOWTgei0qFxyXG4gICAgICAgICAgICBsZXQgcXVhbGl0eUVkaXRCb3g9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdxdWFsaXR5RWRpdEJveCcpO1xyXG4gICAgICAgICAgICBsZXQgaGVyb1F1YWxpdHlTdHI9cXVhbGl0eUVkaXRCb3guZ2V0Q29tcG9uZW50KGNjLkVkaXRCb3gpLnN0cmluZztcclxuICAgICAgICAgICAgbGV0IGhlcm9RdWFsaXR5PXBhcnNlSW50KGhlcm9RdWFsaXR5U3RyKTtcclxuICAgICAgICAgICAgLy/oo4XlpIdcclxuICAgICAgICAgICAgbGV0IGVxdWlwRWRpdEJveD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2VxdWlwRWRpdEJveCcpO1xyXG4gICAgICAgICAgICBsZXQgZXF1aXBTdHI9ZXF1aXBFZGl0Qm94LmdldENvbXBvbmVudChjYy5FZGl0Qm94KS5zdHJpbmc7XHJcbiAgICAgICAgICAgIGxldCBlcXVpcExldmVsPXBhcnNlSW50KGVxdWlwU3RyKTtcclxuICAgICAgICAgICAgaWYoZXF1aXBMZXZlbD4wKXtcclxuICAgICAgICAgICAgICAgIGxldCBlbT1FcXVpcG1lbnRNYW5hZ2VyLmdldEluc3RhbmNlKClcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgaT1FcXVpcFR5cGUuV3VRaTsgaTxFcXVpcFR5cGUuTnVtOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaD1IZXJvX1R5cGUuQ2hhbmdNYW9TaG91OyBoPEhlcm9fVHlwZS5IZXJvX051bTsgaCsrKXtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBoPUhlcm9fVHlwZS5DaGFuZ01hb1Nob3U7IGg8SGVyb19UeXBlLkhlcm9fTnVtOyBoKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIEVxdWlwbWVudE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGVja1F1aWNrVW5sb2FkKGgsdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8v6I635Y+W6Iux6ZuEXHJcbiAgICAgICAgICAgIGxldCBoZXJvUm9vdD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2hlcm9Sb290Jyk7XHJcbiAgICAgICAgICAgIGxldCBzaGFuZ3poZW5IZXJvPW5ldyBBcnJheSgpO1xyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxoZXJvUm9vdC5jaGlsZHJlbkNvdW50OyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKGhlcm9Sb290LmNoaWxkcmVuW2ldLmdldENvbXBvbmVudChjYy5Ub2dnbGUpLmlzQ2hlY2tlZClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzaGFuZ3poZW5IZXJvLnB1c2goaSsxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL+iLsembhOetiee6p1xyXG4gICAgICAgICAgICBsZXQgaGVyb0xldmVsRWRpdEJveD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2hlcm9MZXZlbEVkaXRCb3gnKTtcclxuICAgICAgICAgICAgbGV0IGhlcm9MZXZlbFN0cj1oZXJvTGV2ZWxFZGl0Qm94LmdldENvbXBvbmVudChjYy5FZGl0Qm94KS5zdHJpbmc7XHJcbiAgICAgICAgICAgIGxldCBoZXJvTGV2ZWw9cGFyc2VJbnQoaGVyb0xldmVsU3RyKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCB0ZWFtTGlzdD1uZXcgQXJyYXkoNSk7XHJcbiAgICAgICAgICAgIGxldCBzaGFuZ3poZW5OdW09MDtcclxuICAgICAgICAgICAgbGV0IHNodW54dT1bMiwxLDMsMCw0XTtcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8NTsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZihpPHNoYW5nemhlbkhlcm8ubGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRlYW1MaXN0W3NodW54dVtzaGFuZ3poZW5OdW1dXT1zaGFuZ3poZW5IZXJvW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZUhlcm9MZXZlbChzaGFuZ3poZW5IZXJvW2ldLGhlcm9MZXZlbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hhbmd6aGVuTnVtKys7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRlYW1MaXN0W3NodW54dVtzaGFuZ3poZW5OdW1dXT0tMTtcclxuICAgICAgICAgICAgICAgICAgICBzaGFuZ3poZW5OdW0rKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVRlYW1MaXN0KEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZSx0ZWFtTGlzdCk7XHJcbiAgICAgICAgICAgIC8v6K6+572u6KOF5aSH5pWw5o2u5ZKM562J57qn5pWw5o2uXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IGhlcm9MaXN0ID0gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvTGlzdCgpO1xyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxoZXJvTGlzdC5sZW5ndGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy8gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlSGVyb1F1YWxpdHkoaSxoZXJvUXVhbGl0eSk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL+WIt+aWsOaVsOaNriAgIFxyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxoZXJvTGlzdC5sZW5ndGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZWZyZXNoSGVyb0RhdGEoaGVyb0xpc3RbaV0uaGVyb190eXBlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdiZ19sb2FkaW5nJykuYWN0aXZlPXRydWU7XHJcbiAgICAgICAgICAgIC8v6I635Y+W5aGr5YaZ55qE5YWz5Y2h5pWwXHJcbiAgICAgICAgICAgIExldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnN0YXJ0X2xldmVsPXN0YXJ0TGV2ZWw7XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZmlnaHRpbmdfaW5mbz1NaXNzaW9uTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RmlnaHRpbmdJbmZvKHN0YXJ0TGV2ZWwpO1xyXG4gICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUodGhpcy5nb3RvX3NjZW5lKTtcclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZSgn5YWz5Y2h6ZyA6KaB5aSn5LqOMOaIluiAheS4jeiDveS4uuepuicpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=