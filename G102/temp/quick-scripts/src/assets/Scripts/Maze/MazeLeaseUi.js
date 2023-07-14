"use strict";
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