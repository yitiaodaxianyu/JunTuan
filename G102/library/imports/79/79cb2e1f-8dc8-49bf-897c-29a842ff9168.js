"use strict";
cc._RF.push(module, '79cb24fjchJv4l8KahC/5Fo', 'MazeBuffUi');
// Scripts/Maze/MazeBuffUi.ts

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
var GameManager_1 = require("../GameManager");
var MonsterIconManager_1 = require("../Monster/MonsterIconManager");
var FollowConstants_1 = require("../multiLanguage/FollowConstants");
var FollowManager_1 = require("../multiLanguage/FollowManager");
var LanguageManager_1 = require("../multiLanguage/LanguageManager");
var AudioConstants_1 = require("../Sound/AudioConstants");
var MyTool_1 = require("../Tools/MyTool");
var UIComponent_1 = require("../UI/UIComponent");
var RogueBuff_1 = require("./Data/RogueBuff");
var RogueHexagonTypes_1 = require("../copy/voidcrack/RogueHexagonTypes");
var MazeManager_1 = require("./MazeManager");
var MazeUi_1 = require("./MazeUi");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MazeBuffUi = /** @class */ (function (_super) {
    __extends(MazeBuffUi, _super);
    function MazeBuffUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**格子id */
        _this.box_id = 10032;
        _this.prefab_buff_item = null;
        _this.cur_select_buff = 0;
        _this.is_can_go = false;
        return _this;
    }
    MazeBuffUi.prototype.initData = function (id, isCanGo) {
        this.box_id = id;
        this.is_can_go = isCanGo;
        this.initUi();
    };
    MazeBuffUi.prototype.initUi = function () {
        var buffs = MazeManager_1.MazeManager.getInstance().getUnSelectSpoils();
        if (buffs.length == 0) {
            this.initBuffCards();
        }
        this.createBuffCards();
        this.refreshSelect();
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.rogue玩法查看战利品);
    };
    MazeBuffUi.prototype.createBuffCards = function () {
        var RBM = RogueBuff_1.RogueBuffManager.getInstance();
        var LM = LanguageManager_1.default.getInstance();
        var buffs = MazeManager_1.MazeManager.getInstance().getUnSelectSpoils();
        for (var i = 1; i <= 3; i++) {
            var buffId = buffs[i - 1];
            var buffNode = this.node.getChildByName('buff' + i);
            //buff的数据
            var jsonData = RBM.getJsonRogueBuff(buffId);
            var quality = jsonData.RogueBuff_Quality;
            //名称
            var titleLabel = buffNode.getChildByName('titleLabel').getComponent(cc.Label);
            titleLabel.string = LM.getStrByTextId(jsonData.RogueBuff_Name);
            titleLabel.node.color = this.getFontColorByQuality(quality);
            //内容
            var detailLabel = buffNode.getChildByName('detailLabel').getComponent(cc.Label);
            detailLabel.string = this.getValueStringByString(LM.getStrByTextId(jsonData.RogueBuffText_ID), jsonData.RogueBuff1_Value, jsonData.RogueBuff2_Value, jsonData.RogueBuff3_Value);
            //品质图标
            var qualityIcon = buffNode.getChildByName('quality').getComponent(cc.Sprite);
            qualityIcon.spriteFrame = MazeUi_1.default.getInstance().getSpByName('Maze_Quality_' + (quality - 1));
            //品质文字
            var qualityLabel = buffNode.getChildByName('qualityLabel').getComponent(cc.Label);
            qualityLabel.string = this.getStringByQuality(quality);
            qualityLabel.node.color = this.getFontColorByQuality(quality);
            //类型图标
            var iconSp = buffNode.getChildByName('icon').getComponent(cc.Sprite);
            iconSp.spriteFrame = MazeUi_1.default.getInstance().getSpByName('Maze_Buff_Icon_' + jsonData.RogueBuff_Type);
        }
    };
    MazeBuffUi.prototype.initBuffCards = function () {
        var type = RogueHexagonTypes_1.RogueHexagonTypesManager.getInstance().getHexagonType(this.box_id);
        //品质概率：精英，史诗，传说
        var rate = [70, 20, 10];
        switch (type) {
            case 1:
                {
                    //普通怪的概率
                    rate = [70, 20, 10];
                }
                break;
            case 2:
                {
                    //精英
                    rate = [40, 40, 20];
                }
                break;
            case 6:
                {
                    //boss
                    rate = [0, 30, 70];
                }
                break;
        }
        //test
        //rate=[5,5,90];
        var RBM = RogueBuff_1.RogueBuffManager.getInstance();
        var buffArr = RBM.getBuffArr(MazeManager_1.MazeManager.getInstance().getBuffList());
        //处理数组，看看是否有品质都随机完了的情况
        for (var i = buffArr.length - 1; i >= 0; i--) {
            if (buffArr[i].length == 0) {
                var giveIndex = i > 0 ? (i - 1) : (i + 1);
                rate[giveIndex] += rate[i];
                rate[i] = 0;
            }
        }
        var idsList = new Array();
        for (var n = 1; n <= 3; n++) {
            //随机
            var cardQualityIndex = MyTool_1.default.getWeightIndexs(rate, 1)[0];
            var cardArr = buffArr[cardQualityIndex];
            var cardIndex = Math.floor(Math.random() * cardArr.length);
            var buffId = cardArr[cardIndex];
            cardArr.splice(cardIndex, 1);
            idsList.push(buffId);
            for (var i = buffArr.length - 1; i >= 0; i--) {
                if (buffArr[i].length == 0) {
                    var giveIndex = i > 0 ? (i - 1) : (i + 1);
                    rate[giveIndex] += rate[i];
                    rate[i] = 0;
                }
            }
        }
        MazeManager_1.MazeManager.getInstance().setUnSelectSpoils(idsList);
    };
    MazeBuffUi.prototype.refreshSelect = function () {
        for (var i = 1; i <= 3; i++) {
            var buffNode = this.node.getChildByName('buff' + i);
            var mb = buffNode.getChildByName('mb');
            var isSelected = this.cur_select_buff == i;
            mb.active = !isSelected;
            buffNode.scale = isSelected ? 1 : 0.8;
            buffNode.getComponent(cc.Button).interactable = !isSelected;
            //buffNode.stopAllActions();
        }
        //光
        //let light=this.node.getChildByName('light');
        var btnSelect = this.node.getChildByName('btnSelect');
        var selectBg = this.node.getChildByName('selectBg');
        var isShow = this.cur_select_buff > 0;
        //light.active=isShow;
        btnSelect.active = isShow;
        selectBg.active = isShow;
        var xx = this.cur_select_buff * 206 - 206 * 2 - 7;
        //light.x=xx;
        btnSelect.x = xx;
        selectBg.x = xx;
        if (isShow) {
            var spine = selectBg.getComponent(sp.Skeleton);
            spine.setAnimation(0, 'Rouge_Card', false);
        }
    };
    MazeBuffUi.prototype.getValueStringByString = function (str, value1, value2, value3) {
        if (str.includes("~x%")) {
            value1 *= 100;
        }
        if (str.includes("~y%")) {
            value2 *= 100;
        }
        if (str.includes("~z%")) {
            value3 *= 100;
        }
        var newStr = str.replace("~x", value1.toFixed(0));
        newStr = newStr.replace("~y", value2.toFixed(0));
        newStr = newStr.replace("~z", value2.toFixed(0));
        return newStr;
    };
    MazeBuffUi.prototype.getFontColorByQuality = function (quality) {
        var color = cc.Color.BLUE;
        switch (quality) {
            case 1:
                {
                    color = cc.color(105, 183, 255);
                }
                break;
            case 2:
                {
                    color = cc.color(226, 126, 255);
                }
                break;
            case 3:
                {
                    color = cc.color(255, 193, 74);
                }
                break;
        }
        return color;
    };
    MazeBuffUi.prototype.getOutLineColorByQuality = function (quality) {
        var color = cc.Color.BLUE;
        switch (quality) {
            case 1:
                {
                    color = cc.color(37, 49, 71);
                }
                break;
            case 2:
                {
                    color = cc.color(37, 49, 71);
                }
                break;
            case 3:
                {
                    color = cc.color(105, 183, 255);
                }
                break;
        }
        return color;
    };
    MazeBuffUi.prototype.getStringByQuality = function (quality) {
        return LanguageManager_1.default.getInstance().getStrByTextId(110005 + quality * 2);
    };
    MazeBuffUi.prototype.initMonsterList = function () {
        var content = this.node.getChildByName('monsterScrollView').getComponent(cc.ScrollView).content;
        //获得关卡信息,怪物种类
        var monsterInfoList = MazeManager_1.MazeManager.getInstance().getFightingInfo().getOnlyMonsterDataList();
        monsterInfoList.forEach(function (data, key) {
            var icon = MonsterIconManager_1.MonsterIconManager.getInstance().createMonsterIcon(data.id, data.level);
            content.addChild(icon);
        });
    };
    MazeBuffUi.prototype.clickBtnBuff = function (btn, strIndex) {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        var index = parseInt(strIndex);
        if (this.cur_select_buff != index) {
            this.cur_select_buff = index;
            this.refreshSelect();
        }
    };
    MazeBuffUi.prototype.clickBtnYes = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        //保存buff
        var buffId = MazeManager_1.MazeManager.getInstance().getUnSelectSpoils()[this.cur_select_buff - 1];
        if (buffId) {
            //当作胜利处理
            MazeManager_1.MazeManager.getInstance().checkBuffStage([2001, 2002, 2003, 6001, 6002, 6003]);
            MazeManager_1.MazeManager.getInstance().addBuff(buffId);
            MazeManager_1.MazeManager.getInstance().setUnSelectSpoils(new Array());
            MazeManager_1.MazeManager.getInstance().addMazePassedId(this.box_id);
            MazeUi_1.default.getInstance().refreshFloor();
            _super.prototype.onClose.call(this);
        }
    };
    MazeBuffUi.prototype.clickBtnNo = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        _super.prototype.onClose.call(this);
    };
    __decorate([
        property(cc.Prefab)
    ], MazeBuffUi.prototype, "prefab_buff_item", void 0);
    MazeBuffUi = __decorate([
        ccclass
    ], MazeBuffUi);
    return MazeBuffUi;
}(UIComponent_1.default));
exports.default = MazeBuffUi;

cc._RF.pop();