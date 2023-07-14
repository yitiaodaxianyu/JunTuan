
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Maze/MazeLeaseUi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4462cwAHSJFnbjUohqkH2uJ', 'MazeLeaseUi');
// Scripts/Maze/MazeLeaseUi.ts

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
var GameManager_1 = require("../GameManager");
var LevelManager_1 = require("../Level/LevelManager");
var FollowConstants_1 = require("../multiLanguage/FollowConstants");
var FollowManager_1 = require("../multiLanguage/FollowManager");
var LanguageManager_1 = require("../multiLanguage/LanguageManager");
var PetConfig_1 = require("../Pet/PetConfig");
var AudioConstants_1 = require("../Sound/AudioConstants");
var MyTool_1 = require("../Tools/MyTool");
var UIComponent_1 = require("../UI/UIComponent");
var RoguePetsLease_1 = require("./Data/RoguePetsLease");
var MazeManager_1 = require("./MazeManager");
var MazePetItem_1 = require("./MazePetItem");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MazeLeaseUi = /** @class */ (function (_super) {
    __extends(MazeLeaseUi, _super);
    function MazeLeaseUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.pet_item = null;
        /**格子id */
        _this.box_id = 10011;
        _this.select_index = -1;
        _this.is_can_go = false;
        _this.pet_list = [];
        return _this;
        // update (dt) {}
    }
    MazeLeaseUi.prototype.initData = function (id, isCanGo) {
        this.box_id = id;
        this.is_can_go = isCanGo;
        this.initUi();
    };
    MazeLeaseUi.prototype.initUi = function () {
        // let ll=PetManager.getInstance().getDeepPetList();
        var petList = [];
        // ll.forEach((v)=>{
        //     petList.push(cc.instantiate(v));
        // })        
        //重新排列一下，等级排列
        petList.sort(function (a, b) {
            return b.pet_level - a.pet_level;
        });
        var totalLevel = 0;
        var totalNum = 0;
        var len = petList.length;
        if (len <= 0) {
            return;
        }
        for (var i = 0; i < len; i++) {
            if (i < 4) {
                totalLevel += petList[i].pet_level;
                totalNum++;
            }
            else {
                break;
            }
        }
        var userLevel = Math.round(totalLevel / totalNum);
        var randPetList = MazeManager_1.MazeManager.getInstance().getRandPetList(this.box_id);
        if (randPetList.length > 0) {
            this.useOldList(randPetList, userLevel);
        }
        else {
            this.initPetList(userLevel);
        }
        this.node.getChildByName('btnYes').active = this.is_can_go;
    };
    MazeLeaseUi.prototype.initPetList = function (userLevel) {
        var jsonData = RoguePetsLease_1.RoguePetsLeaseManager.getInstance().getJsonRoguePetsLease(LevelManager_1.LevelManager.getInstance().getFinishChapter());
        var list = this.node.getChildByName('list');
        var petIndex = MyTool_1.default.getWeightIndexs(jsonData.PetsWeight, 4);
        for (var i = 0; i < 4; i++) {
            var item = cc.instantiate(this.pet_item);
            list.addChild(item);
            var petInfo = new PetConfig_1.PetInfo();
            petInfo.pet_level = userLevel;
            petInfo.pet_id = jsonData.PetsLeaseID[petIndex[i]];
            petInfo.pet_quality = jsonData.PetsQuality[petIndex[i]];
            petInfo.sequence_id = new Date().getTime() / 1000 * 10 + i;
            petInfo.lease_type = PetConfig_1.LeaseType.Maze;
            this.pet_list.push(petInfo);
            item.getComponent(MazePetItem_1.default).init(petInfo, i, this);
        }
        MazeManager_1.MazeManager.getInstance().setRandPetList(this.box_id, this.pet_list);
    };
    MazeLeaseUi.prototype.useOldList = function (petList, userLevel) {
        var list = this.node.getChildByName('list');
        this.pet_list = petList;
        for (var i = 0; i < petList.length; i++) {
            var item = cc.instantiate(this.pet_item);
            list.addChild(item);
            var petInfo = petList[i];
            petInfo.pet_level = userLevel;
            item.getComponent(MazePetItem_1.default).init(petInfo, i, this);
        }
    };
    MazeLeaseUi.prototype.clickBtnItem = function (index) {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        if (this.select_index == index) {
            this.select_index = -1;
        }
        else {
            this.select_index = index;
        }
        this.refreshAllItem();
    };
    MazeLeaseUi.prototype.refreshAllItem = function () {
        var list = this.node.getChildByName('list');
        for (var i = 0; i < list.childrenCount; i++) {
            var item = list.children[i];
            item.getComponent(MazePetItem_1.default).refresh(this.select_index == i);
        }
    };
    MazeLeaseUi.prototype.clickBtnOk = function () {
        if (this.is_can_go) {
            if (this.select_index >= 0) {
                MazeManager_1.MazeManager.getInstance().addLeasePetList(this.pet_list[this.select_index]);
                _super.prototype.onRefresh.call(this);
                _super.prototype.onClose.call(this);
                FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.rogue玩法获得宠物事件);
            }
            else {
                GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getStrByTextId(830023));
            }
        }
    };
    __decorate([
        property(cc.Prefab)
    ], MazeLeaseUi.prototype, "pet_item", void 0);
    MazeLeaseUi = __decorate([
        ccclass
    ], MazeLeaseUi);
    return MazeLeaseUi;
}(UIComponent_1.default));
exports.default = MazeLeaseUi;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTWF6ZVxcTWF6ZUxlYXNlVWkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQix3RUFBd0U7QUFDeEUsbUJBQW1CO0FBQ25CLGtGQUFrRjtBQUNsRiw4QkFBOEI7QUFDOUIsa0ZBQWtGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFbEYsOENBQXlDO0FBQ3pDLHNEQUFxRDtBQUNyRCxvRUFBK0Q7QUFDL0QsZ0VBQTJEO0FBQzNELG9FQUErRDtBQUMvRCw4Q0FBc0Q7QUFFdEQsMERBQXFEO0FBQ3JELDBDQUFxQztBQUNyQyxpREFBNEM7QUFDNUMsd0RBQThEO0FBQzlELDZDQUE0QztBQUM1Qyw2Q0FBd0M7QUFFbEMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBeUMsK0JBQVc7SUFBcEQ7UUFBQSxxRUFxSEM7UUFsSEcsY0FBUSxHQUFjLElBQUksQ0FBQztRQUUxQixVQUFVO1FBQ1gsWUFBTSxHQUFRLEtBQUssQ0FBQztRQUVwQixrQkFBWSxHQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLGVBQVMsR0FBUyxLQUFLLENBQUM7UUFDaEIsY0FBUSxHQUFnQixFQUFFLENBQUM7O1FBMEduQyxpQkFBaUI7SUFDckIsQ0FBQztJQXpHRyw4QkFBUSxHQUFSLFVBQVUsRUFBUyxFQUFDLE9BQWU7UUFDL0IsSUFBSSxDQUFDLE1BQU0sR0FBQyxFQUFFLENBQUM7UUFDZixJQUFJLENBQUMsU0FBUyxHQUFDLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDbEIsQ0FBQztJQUVELDRCQUFNLEdBQU47UUFDSSxvREFBb0Q7UUFDcEQsSUFBSSxPQUFPLEdBQUMsRUFBRSxDQUFDO1FBQ2Ysb0JBQW9CO1FBQ3BCLHVDQUF1QztRQUN2QyxhQUFhO1FBQ2IsYUFBYTtRQUNiLE9BQU8s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IiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBMZXZlbE1hbmFnZXIgfSBmcm9tIFwiLi4vTGV2ZWwvTGV2ZWxNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEZvbGxvd19UeXBlIH0gZnJvbSBcIi4uL211bHRpTGFuZ3VhZ2UvRm9sbG93Q29uc3RhbnRzXCI7XHJcbmltcG9ydCBGb2xsb3dNYW5hZ2VyIGZyb20gXCIuLi9tdWx0aUxhbmd1YWdlL0ZvbGxvd01hbmFnZXJcIjtcclxuaW1wb3J0IExhbmd1YWdlTWFuYWdlciBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9MYW5ndWFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgTGVhc2VUeXBlLCBQZXRJbmZvIH0gZnJvbSBcIi4uL1BldC9QZXRDb25maWdcIjtcclxuaW1wb3J0IHsgUGV0TWFuYWdlciB9IGZyb20gXCIuLi9QZXQvUGV0TWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTb3VuZEluZGV4IH0gZnJvbSBcIi4uL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBNeVRvb2wgZnJvbSBcIi4uL1Rvb2xzL015VG9vbFwiO1xyXG5pbXBvcnQgVUlDb21wb25lbnQgZnJvbSBcIi4uL1VJL1VJQ29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFJvZ3VlUGV0c0xlYXNlTWFuYWdlciB9IGZyb20gXCIuL0RhdGEvUm9ndWVQZXRzTGVhc2VcIjtcclxuaW1wb3J0IHsgTWF6ZU1hbmFnZXIgfSBmcm9tIFwiLi9NYXplTWFuYWdlclwiO1xyXG5pbXBvcnQgTWF6ZVBldEl0ZW0gZnJvbSBcIi4vTWF6ZVBldEl0ZW1cIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWF6ZUxlYXNlVWkgZXh0ZW5kcyBVSUNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIHBldF9pdGVtOiBjYy5QcmVmYWIgPSBudWxsO1xyXG5cclxuICAgICAvKirmoLzlrZBpZCAqL1xyXG4gICAgYm94X2lkOm51bWJlcj0xMDAxMTtcclxuXHJcbiAgICBzZWxlY3RfaW5kZXg6bnVtYmVyPS0xO1xyXG4gICAgaXNfY2FuX2dvOmJvb2xlYW49ZmFsc2U7XHJcbiAgICBwcml2YXRlIHBldF9saXN0OkFycmF5PFBldEluZm8+PVtdO1xyXG5cclxuICAgIGluaXREYXRhIChpZDpudW1iZXIsaXNDYW5Hbzpib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5ib3hfaWQ9aWQ7XHJcbiAgICAgICAgdGhpcy5pc19jYW5fZ289aXNDYW5HbztcclxuICAgICAgICB0aGlzLmluaXRVaSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRVaSAoKSB7XHJcbiAgICAgICAgLy8gbGV0IGxsPVBldE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXREZWVwUGV0TGlzdCgpO1xyXG4gICAgICAgIGxldCBwZXRMaXN0PVtdO1xyXG4gICAgICAgIC8vIGxsLmZvckVhY2goKHYpPT57XHJcbiAgICAgICAgLy8gICAgIHBldExpc3QucHVzaChjYy5pbnN0YW50aWF0ZSh2KSk7XHJcbiAgICAgICAgLy8gfSkgICAgICAgIFxyXG4gICAgICAgIC8v6YeN5paw5o6S5YiX5LiA5LiL77yM562J57qn5o6S5YiXXHJcbiAgICAgICAgcGV0TGlzdC5zb3J0KChhOlBldEluZm8sYjpQZXRJbmZvKT0+e1xyXG4gICAgICAgICAgICByZXR1cm4gYi5wZXRfbGV2ZWwtYS5wZXRfbGV2ZWw7XHJcbiAgICAgICAgfSk7ICAgICAgICBcclxuICAgICAgICBsZXQgdG90YWxMZXZlbD0wO1xyXG4gICAgICAgIGxldCB0b3RhbE51bT0wO1xyXG4gICAgICAgIGxldCBsZW49cGV0TGlzdC5sZW5ndGg7XHJcbiAgICAgICAgaWYobGVuPD0wKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IobGV0IGk9MDsgaTxsZW47IGkrKyl7XHJcbiAgICAgICAgICAgIGlmKGk8NCl7XHJcbiAgICAgICAgICAgICAgICB0b3RhbExldmVsKz1wZXRMaXN0W2ldLnBldF9sZXZlbDtcclxuICAgICAgICAgICAgICAgIHRvdGFsTnVtKys7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHVzZXJMZXZlbD1NYXRoLnJvdW5kKHRvdGFsTGV2ZWwvdG90YWxOdW0pO1xyXG4gICAgICAgIGxldCByYW5kUGV0TGlzdD1NYXplTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFJhbmRQZXRMaXN0KHRoaXMuYm94X2lkKTtcclxuICAgICAgICBpZihyYW5kUGV0TGlzdC5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgIHRoaXMudXNlT2xkTGlzdChyYW5kUGV0TGlzdCx1c2VyTGV2ZWwpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLmluaXRQZXRMaXN0KHVzZXJMZXZlbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnYnRuWWVzJykuYWN0aXZlPXRoaXMuaXNfY2FuX2dvO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRQZXRMaXN0KHVzZXJMZXZlbDpudW1iZXIpe1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBqc29uRGF0YT1Sb2d1ZVBldHNMZWFzZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRKc29uUm9ndWVQZXRzTGVhc2UoTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RmluaXNoQ2hhcHRlcigpKTtcclxuICAgICAgICBsZXQgbGlzdD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2xpc3QnKTtcclxuICAgICAgICBsZXQgcGV0SW5kZXg9TXlUb29sLmdldFdlaWdodEluZGV4cyhqc29uRGF0YS5QZXRzV2VpZ2h0LDQpO1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPDQ7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBpdGVtPWNjLmluc3RhbnRpYXRlKHRoaXMucGV0X2l0ZW0pO1xyXG4gICAgICAgICAgICBsaXN0LmFkZENoaWxkKGl0ZW0pO1xyXG4gICAgICAgICAgICBsZXQgcGV0SW5mbz1uZXcgUGV0SW5mbygpO1xyXG4gICAgICAgICAgICBwZXRJbmZvLnBldF9sZXZlbD11c2VyTGV2ZWw7XHJcbiAgICAgICAgICAgIHBldEluZm8ucGV0X2lkPWpzb25EYXRhLlBldHNMZWFzZUlEW3BldEluZGV4W2ldXTtcclxuICAgICAgICAgICAgcGV0SW5mby5wZXRfcXVhbGl0eT1qc29uRGF0YS5QZXRzUXVhbGl0eVtwZXRJbmRleFtpXV07XHJcbiAgICAgICAgICAgIHBldEluZm8uc2VxdWVuY2VfaWQ9bmV3IERhdGUoKS5nZXRUaW1lKCkvMTAwMCoxMCtpO1xyXG4gICAgICAgICAgICBwZXRJbmZvLmxlYXNlX3R5cGU9TGVhc2VUeXBlLk1hemU7XHJcbiAgICAgICAgICAgIHRoaXMucGV0X2xpc3QucHVzaChwZXRJbmZvKTtcclxuICAgICAgICAgICAgaXRlbS5nZXRDb21wb25lbnQoTWF6ZVBldEl0ZW0pLmluaXQocGV0SW5mbyxpLHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBNYXplTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldFJhbmRQZXRMaXN0KHRoaXMuYm94X2lkLHRoaXMucGV0X2xpc3QpO1xyXG4gICAgfVxyXG5cclxuICAgIHVzZU9sZExpc3QocGV0TGlzdDpQZXRJbmZvW10sdXNlckxldmVsOm51bWJlcil7XHJcbiAgICAgICAgbGV0IGxpc3Q9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdsaXN0Jyk7XHJcbiAgICAgICAgdGhpcy5wZXRfbGlzdD1wZXRMaXN0O1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPHBldExpc3QubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgaXRlbT1jYy5pbnN0YW50aWF0ZSh0aGlzLnBldF9pdGVtKTtcclxuICAgICAgICAgICAgbGlzdC5hZGRDaGlsZChpdGVtKTsgICBcclxuICAgICAgICAgICAgbGV0IHBldEluZm89cGV0TGlzdFtpXTtcclxuICAgICAgICAgICAgcGV0SW5mby5wZXRfbGV2ZWw9dXNlckxldmVsO1xyXG4gICAgICAgICAgICBpdGVtLmdldENvbXBvbmVudChNYXplUGV0SXRlbSkuaW5pdChwZXRJbmZvLGksdGhpcyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGlja0J0bkl0ZW0oaW5kZXg6bnVtYmVyKXtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIGlmKHRoaXMuc2VsZWN0X2luZGV4PT1pbmRleCl7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0X2luZGV4PS0xO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdF9pbmRleD1pbmRleDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoQWxsSXRlbSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlZnJlc2hBbGxJdGVtKCk6IHZvaWQge1xyXG4gICAgICAgIGxldCBsaXN0PXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnbGlzdCcpO1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPGxpc3QuY2hpbGRyZW5Db3VudDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IGl0ZW09bGlzdC5jaGlsZHJlbltpXTtcclxuICAgICAgICAgICAgaXRlbS5nZXRDb21wb25lbnQoTWF6ZVBldEl0ZW0pLnJlZnJlc2godGhpcy5zZWxlY3RfaW5kZXg9PWkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGlja0J0bk9rKCl7XHJcbiAgICAgICAgaWYodGhpcy5pc19jYW5fZ28pe1xyXG4gICAgICAgICAgICBpZih0aGlzLnNlbGVjdF9pbmRleD49MCl7XHJcbiAgICAgICAgICAgICAgICBNYXplTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZExlYXNlUGV0TGlzdCh0aGlzLnBldF9saXN0W3RoaXMuc2VsZWN0X2luZGV4XSk7XHJcbiAgICAgICAgICAgICAgICBzdXBlci5vblJlZnJlc2goKTtcclxuICAgICAgICAgICAgICAgIHN1cGVyLm9uQ2xvc2UoKTtcclxuICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS5yb2d1ZeeOqeazleiOt+W+l+WuoOeJqeS6i+S7tik7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCg4MzAwMjMpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XHJcbn1cclxuIl19