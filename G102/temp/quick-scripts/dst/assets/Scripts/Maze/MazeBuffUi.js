
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Maze/MazeBuffUi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTWF6ZVxcTWF6ZUJ1ZmZVaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FBeUM7QUFDekMsb0VBQW1FO0FBQ25FLG9FQUErRDtBQUMvRCxnRUFBMkQ7QUFDM0Qsb0VBQStEO0FBQy9ELDBEQUFxRDtBQUNyRCwwQ0FBcUM7QUFDckMsaURBQTRDO0FBQzVDLDhDQUFvRDtBQUNwRCx5RUFBK0U7QUFDL0UsNkNBQTRDO0FBQzVDLG1DQUE4QjtBQUd4QixJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUF3Qyw4QkFBVztJQUFuRDtRQUFBLHFFQWlPQztRQWhPRyxVQUFVO1FBQ1YsWUFBTSxHQUFRLEtBQUssQ0FBQztRQUVwQixzQkFBZ0IsR0FBVyxJQUFJLENBQUM7UUFFaEMscUJBQWUsR0FBUSxDQUFDLENBQUM7UUFDekIsZUFBUyxHQUFTLEtBQUssQ0FBQzs7SUEwTjVCLENBQUM7SUF4TkcsNkJBQVEsR0FBUixVQUFTLEVBQVMsRUFBQyxPQUFlO1FBQzlCLElBQUksQ0FBQyxNQUFNLEdBQUMsRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLFNBQVMsR0FBQyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFFRCwyQkFBTSxHQUFOO1FBQ0ksSUFBSSxLQUFLLEdBQUMseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3hELElBQUcsS0FBSyxDQUFDLE1BQU0sSUFBRSxDQUFDLEVBQUM7WUFDZixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDeEI7UUFDRCxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3JCLHVCQUFhLENBQUMsV0FB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IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgTW9uc3Rlckljb25NYW5hZ2VyIH0gZnJvbSBcIi4uL01vbnN0ZXIvTW9uc3Rlckljb25NYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEZvbGxvd19UeXBlIH0gZnJvbSBcIi4uL211bHRpTGFuZ3VhZ2UvRm9sbG93Q29uc3RhbnRzXCI7XHJcbmltcG9ydCBGb2xsb3dNYW5hZ2VyIGZyb20gXCIuLi9tdWx0aUxhbmd1YWdlL0ZvbGxvd01hbmFnZXJcIjtcclxuaW1wb3J0IExhbmd1YWdlTWFuYWdlciBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9MYW5ndWFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU291bmRJbmRleCB9IGZyb20gXCIuLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgTXlUb29sIGZyb20gXCIuLi9Ub29scy9NeVRvb2xcIjtcclxuaW1wb3J0IFVJQ29tcG9uZW50IGZyb20gXCIuLi9VSS9VSUNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBSb2d1ZUJ1ZmZNYW5hZ2VyIH0gZnJvbSBcIi4vRGF0YS9Sb2d1ZUJ1ZmZcIjtcclxuaW1wb3J0IHsgUm9ndWVIZXhhZ29uVHlwZXNNYW5hZ2VyIH0gZnJvbSBcIi4uL2NvcHkvdm9pZGNyYWNrL1JvZ3VlSGV4YWdvblR5cGVzXCI7XHJcbmltcG9ydCB7IE1hemVNYW5hZ2VyIH0gZnJvbSBcIi4vTWF6ZU1hbmFnZXJcIjtcclxuaW1wb3J0IE1hemVVaSBmcm9tIFwiLi9NYXplVWlcIjtcclxuXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hemVCdWZmVWkgZXh0ZW5kcyBVSUNvbXBvbmVudCB7XHJcbiAgICAvKirmoLzlrZBpZCAqL1xyXG4gICAgYm94X2lkOm51bWJlcj0xMDAzMjtcclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICBwcmVmYWJfYnVmZl9pdGVtOmNjLlByZWZhYj1udWxsO1xyXG5cclxuICAgIGN1cl9zZWxlY3RfYnVmZjpudW1iZXI9MDsgICAgXHJcbiAgICBpc19jYW5fZ286Ym9vbGVhbj1mYWxzZTsgICAgXHJcblxyXG4gICAgaW5pdERhdGEoaWQ6bnVtYmVyLGlzQ2FuR286Ym9vbGVhbil7XHJcbiAgICAgICAgdGhpcy5ib3hfaWQ9aWQ7XHJcbiAgICAgICAgdGhpcy5pc19jYW5fZ289aXNDYW5HbzsgICAgXHJcbiAgICAgICAgdGhpcy5pbml0VWkoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgaW5pdFVpKCl7XHJcbiAgICAgICAgbGV0IGJ1ZmZzPU1hemVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VW5TZWxlY3RTcG9pbHMoKTtcclxuICAgICAgICBpZihidWZmcy5sZW5ndGg9PTApe1xyXG4gICAgICAgICAgICB0aGlzLmluaXRCdWZmQ2FyZHMoKTsgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jcmVhdGVCdWZmQ2FyZHMoKTsgICAgICAgXHJcbiAgICAgICAgdGhpcy5yZWZyZXNoU2VsZWN0KCk7XHJcbiAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLnJvZ3Vl546p5rOV5p+l55yL5oiY5Yip5ZOBKTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVCdWZmQ2FyZHMoKXtcclxuICAgICAgICBsZXQgUkJNPVJvZ3VlQnVmZk1hbmFnZXIuZ2V0SW5zdGFuY2UoKVxyXG4gICAgICAgIGxldCBMTT1MYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBsZXQgYnVmZnM9TWF6ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRVblNlbGVjdFNwb2lscygpO1xyXG4gICAgICAgIGZvcihsZXQgaT0xOyBpPD0zOyBpKyspeyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgYnVmZklkPWJ1ZmZzW2ktMV07ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBidWZmTm9kZT10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2J1ZmYnK2kpO1xyXG4gICAgICAgICAgICAvL2J1ZmbnmoTmlbDmja5cclxuICAgICAgICAgICAgbGV0IGpzb25EYXRhPVJCTS5nZXRKc29uUm9ndWVCdWZmKGJ1ZmZJZCk7XHJcbiAgICAgICAgICAgIGxldCBxdWFsaXR5PWpzb25EYXRhLlJvZ3VlQnVmZl9RdWFsaXR5O1xyXG4gICAgICAgICAgICAvL+WQjeensFxyXG4gICAgICAgICAgICBsZXQgdGl0bGVMYWJlbD1idWZmTm9kZS5nZXRDaGlsZEJ5TmFtZSgndGl0bGVMYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgICAgIHRpdGxlTGFiZWwuc3RyaW5nPUxNLmdldFN0ckJ5VGV4dElkKGpzb25EYXRhLlJvZ3VlQnVmZl9OYW1lKTtcclxuICAgICAgICAgICAgdGl0bGVMYWJlbC5ub2RlLmNvbG9yPXRoaXMuZ2V0Rm9udENvbG9yQnlRdWFsaXR5KHF1YWxpdHkpO1xyXG4gICAgICAgICAgICAvL+WGheWuuVxyXG4gICAgICAgICAgICBsZXQgZGV0YWlsTGFiZWw9YnVmZk5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2RldGFpbExhYmVsJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICAgICAgZGV0YWlsTGFiZWwuc3RyaW5nPXRoaXMuZ2V0VmFsdWVTdHJpbmdCeVN0cmluZyhMTS5nZXRTdHJCeVRleHRJZChqc29uRGF0YS5Sb2d1ZUJ1ZmZUZXh0X0lEKSxqc29uRGF0YS5Sb2d1ZUJ1ZmYxX1ZhbHVlLGpzb25EYXRhLlJvZ3VlQnVmZjJfVmFsdWUsanNvbkRhdGEuUm9ndWVCdWZmM19WYWx1ZSk7XHJcbiAgICAgICAgICAgIC8v5ZOB6LSo5Zu+5qCHXHJcbiAgICAgICAgICAgIGxldCBxdWFsaXR5SWNvbj1idWZmTm9kZS5nZXRDaGlsZEJ5TmFtZSgncXVhbGl0eScpLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG4gICAgICAgICAgICBxdWFsaXR5SWNvbi5zcHJpdGVGcmFtZT1NYXplVWkuZ2V0SW5zdGFuY2UoKS5nZXRTcEJ5TmFtZSgnTWF6ZV9RdWFsaXR5XycrKHF1YWxpdHktMSkpXHJcbiAgICAgICAgICAgIC8v5ZOB6LSo5paH5a2XXHJcbiAgICAgICAgICAgIGxldCBxdWFsaXR5TGFiZWw9YnVmZk5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3F1YWxpdHlMYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgICAgIHF1YWxpdHlMYWJlbC5zdHJpbmc9dGhpcy5nZXRTdHJpbmdCeVF1YWxpdHkocXVhbGl0eSk7XHJcbiAgICAgICAgICAgIHF1YWxpdHlMYWJlbC5ub2RlLmNvbG9yPXRoaXMuZ2V0Rm9udENvbG9yQnlRdWFsaXR5KHF1YWxpdHkpO1xyXG4gICAgICAgICAgICAvL+exu+Wei+Wbvuagh1xyXG4gICAgICAgICAgICBsZXQgaWNvblNwPWJ1ZmZOb2RlLmdldENoaWxkQnlOYW1lKCdpY29uJykuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICAgICAgICAgIGljb25TcC5zcHJpdGVGcmFtZT1NYXplVWkuZ2V0SW5zdGFuY2UoKS5nZXRTcEJ5TmFtZSgnTWF6ZV9CdWZmX0ljb25fJytqc29uRGF0YS5Sb2d1ZUJ1ZmZfVHlwZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSAgICBcclxuXHJcbiAgICBpbml0QnVmZkNhcmRzKCl7ICAgICAgICBcclxuICAgICAgICBsZXQgdHlwZT1Sb2d1ZUhleGFnb25UeXBlc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXhhZ29uVHlwZSh0aGlzLmJveF9pZCk7XHJcbiAgICAgICAgLy/lk4HotKjmpoLnjofvvJrnsr7oi7HvvIzlj7Lor5fvvIzkvKDor7RcclxuICAgICAgICBsZXQgcmF0ZT1bNzAsMjAsMTBdO1xyXG4gICAgICAgIHN3aXRjaCh0eXBlKXtcclxuICAgICAgICAgICAgY2FzZSAxOntcclxuICAgICAgICAgICAgICAgIC8v5pmu6YCa5oCq55qE5qaC546HXHJcbiAgICAgICAgICAgICAgICByYXRlPVs3MCwyMCwxMF07XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOntcclxuICAgICAgICAgICAgICAgIC8v57K+6IuxXHJcbiAgICAgICAgICAgICAgICByYXRlPVs0MCw0MCwyMF07XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSA2OntcclxuICAgICAgICAgICAgICAgIC8vYm9zc1xyXG4gICAgICAgICAgICAgICAgcmF0ZT1bMCwzMCw3MF07XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgLy90ZXN0XHJcbiAgICAgICAgLy9yYXRlPVs1LDUsOTBdO1xyXG4gICAgICAgIGxldCBSQk09Um9ndWVCdWZmTWFuYWdlci5nZXRJbnN0YW5jZSgpXHJcbiAgICAgICAgbGV0IGJ1ZmZBcnI9UkJNLmdldEJ1ZmZBcnIoTWF6ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRCdWZmTGlzdCgpKTtcclxuICAgICAgICAvL+WkhOeQhuaVsOe7hO+8jOeci+eci+aYr+WQpuacieWTgei0qOmDvemaj+acuuWujOS6hueahOaDheWGtVxyXG4gICAgICAgIGZvcihsZXQgaT1idWZmQXJyLmxlbmd0aC0xOyBpPj0wOyBpLS0pe1xyXG4gICAgICAgICAgICBpZihidWZmQXJyW2ldLmxlbmd0aD09MCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgZ2l2ZUluZGV4PWk+MD8oaS0xKTooaSsxKTtcclxuICAgICAgICAgICAgICAgIHJhdGVbZ2l2ZUluZGV4XSs9cmF0ZVtpXTtcclxuICAgICAgICAgICAgICAgIHJhdGVbaV09MDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgaWRzTGlzdD1uZXcgQXJyYXkoKTtcclxuICAgICAgICBmb3IobGV0IG49MTsgbjw9MzsgbisrKXtcclxuICAgICAgICAgICAgLy/pmo/mnLpcclxuICAgICAgICAgICAgbGV0IGNhcmRRdWFsaXR5SW5kZXg9TXlUb29sLmdldFdlaWdodEluZGV4cyhyYXRlLDEpWzBdO1xyXG4gICAgICAgICAgICBsZXQgY2FyZEFycj1idWZmQXJyW2NhcmRRdWFsaXR5SW5kZXhdO1xyXG4gICAgICAgICAgICBsZXQgY2FyZEluZGV4PU1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSpjYXJkQXJyLmxlbmd0aCk7XHJcbiAgICAgICAgICAgIGxldCBidWZmSWQ9Y2FyZEFycltjYXJkSW5kZXhdO1xyXG4gICAgICAgICAgICBjYXJkQXJyLnNwbGljZShjYXJkSW5kZXgsMSk7XHJcbiAgICAgICAgICAgIGlkc0xpc3QucHVzaChidWZmSWQpO1xyXG4gICAgICAgICAgICBmb3IobGV0IGk9YnVmZkFyci5sZW5ndGgtMTsgaT49MDsgaS0tKXtcclxuICAgICAgICAgICAgICAgIGlmKGJ1ZmZBcnJbaV0ubGVuZ3RoPT0wKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZ2l2ZUluZGV4PWk+MD8oaS0xKTooaSsxKTtcclxuICAgICAgICAgICAgICAgICAgICByYXRlW2dpdmVJbmRleF0rPXJhdGVbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgcmF0ZVtpXT0wO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIE1hemVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0VW5TZWxlY3RTcG9pbHMoaWRzTGlzdCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVmcmVzaFNlbGVjdCgpe1xyXG4gICAgICAgIGZvcihsZXQgaT0xOyBpPD0zOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgYnVmZk5vZGU9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdidWZmJytpKTsgICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IG1iPWJ1ZmZOb2RlLmdldENoaWxkQnlOYW1lKCdtYicpO1xyXG4gICAgICAgICAgICBsZXQgaXNTZWxlY3RlZD10aGlzLmN1cl9zZWxlY3RfYnVmZj09aTtcclxuICAgICAgICAgICAgbWIuYWN0aXZlPSFpc1NlbGVjdGVkO1xyXG4gICAgICAgICAgICBidWZmTm9kZS5zY2FsZT1pc1NlbGVjdGVkPzE6MC44O1xyXG4gICAgICAgICAgICBidWZmTm9kZS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGU9IWlzU2VsZWN0ZWQ7XHJcbiAgICAgICAgICAgIC8vYnVmZk5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/lhYlcclxuICAgICAgICAvL2xldCBsaWdodD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2xpZ2h0Jyk7XHJcbiAgICAgICAgbGV0IGJ0blNlbGVjdD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2J0blNlbGVjdCcpO1xyXG4gICAgICAgIGxldCBzZWxlY3RCZz10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3NlbGVjdEJnJyk7XHJcbiAgICAgICAgbGV0IGlzU2hvdz10aGlzLmN1cl9zZWxlY3RfYnVmZj4wO1xyXG4gICAgICAgIC8vbGlnaHQuYWN0aXZlPWlzU2hvdztcclxuICAgICAgICBidG5TZWxlY3QuYWN0aXZlPWlzU2hvdztcclxuICAgICAgICBzZWxlY3RCZy5hY3RpdmU9aXNTaG93O1xyXG5cclxuICAgICAgICBsZXQgeHg9dGhpcy5jdXJfc2VsZWN0X2J1ZmYqMjA2LTIwNioyLTc7XHJcbiAgICAgICAgLy9saWdodC54PXh4O1xyXG4gICAgICAgIGJ0blNlbGVjdC54PXh4O1xyXG4gICAgICAgIHNlbGVjdEJnLng9eHg7XHJcbiAgICAgICAgaWYoaXNTaG93KXsgICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IHNwaW5lPXNlbGVjdEJnLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbik7XHJcbiAgICAgICAgICAgIHNwaW5lLnNldEFuaW1hdGlvbigwLCdSb3VnZV9DYXJkJyxmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldFZhbHVlU3RyaW5nQnlTdHJpbmcoc3RyOnN0cmluZyx2YWx1ZTE6bnVtYmVyLHZhbHVlMjpudW1iZXIsdmFsdWUzOm51bWJlcik6c3RyaW5neyAgICAgICAgXHJcbiAgICAgICAgaWYoc3RyLmluY2x1ZGVzKFwifnglXCIpKXtcclxuICAgICAgICAgICAgdmFsdWUxKj0xMDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHN0ci5pbmNsdWRlcyhcIn55JVwiKSl7XHJcbiAgICAgICAgICAgIHZhbHVlMio9MTAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihzdHIuaW5jbHVkZXMoXCJ+eiVcIikpe1xyXG4gICAgICAgICAgICB2YWx1ZTMqPTEwMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG5ld1N0cj1zdHIucmVwbGFjZShcIn54XCIsdmFsdWUxLnRvRml4ZWQoMCkpOyAgICAgICAgXHJcbiAgICAgICAgbmV3U3RyPW5ld1N0ci5yZXBsYWNlKFwifnlcIix2YWx1ZTIudG9GaXhlZCgwKSk7XHJcbiAgICAgICAgbmV3U3RyPW5ld1N0ci5yZXBsYWNlKFwifnpcIix2YWx1ZTIudG9GaXhlZCgwKSk7XHJcbiAgICAgICAgcmV0dXJuIG5ld1N0cjtcclxuICAgIH1cclxuXHJcbiAgICBnZXRGb250Q29sb3JCeVF1YWxpdHkocXVhbGl0eTpudW1iZXIpOmNjLkNvbG9ye1xyXG4gICAgICAgIGxldCBjb2xvcj1jYy5Db2xvci5CTFVFO1xyXG4gICAgICAgIHN3aXRjaChxdWFsaXR5KXtcclxuICAgICAgICAgICAgY2FzZSAxOntcclxuICAgICAgICAgICAgICAgIGNvbG9yPWNjLmNvbG9yKDEwNSwxODMsMjU1KTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6e1xyXG4gICAgICAgICAgICAgICAgY29sb3I9Y2MuY29sb3IoMjI2LDEyNiwyNTUpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzp7XHJcbiAgICAgICAgICAgICAgICBjb2xvcj1jYy5jb2xvcigyNTUsMTkzLDc0KTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY29sb3I7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0T3V0TGluZUNvbG9yQnlRdWFsaXR5KHF1YWxpdHk6bnVtYmVyKTpjYy5Db2xvcntcclxuICAgICAgICBsZXQgY29sb3I9Y2MuQ29sb3IuQkxVRTtcclxuICAgICAgICBzd2l0Y2gocXVhbGl0eSl7XHJcbiAgICAgICAgICAgIGNhc2UgMTp7XHJcbiAgICAgICAgICAgICAgICBjb2xvcj1jYy5jb2xvcigzNyw0OSw3MSk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOntcclxuICAgICAgICAgICAgICAgIGNvbG9yPWNjLmNvbG9yKDM3LDQ5LDcxKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDM6e1xyXG4gICAgICAgICAgICAgICAgY29sb3I9Y2MuY29sb3IoMTA1LDE4MywyNTUpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjb2xvcjtcclxuICAgIH1cclxuXHJcbiAgICBnZXRTdHJpbmdCeVF1YWxpdHkocXVhbGl0eTpudW1iZXIpOnN0cmluZ3tcclxuICAgICAgICByZXR1cm4gTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTEwMDA1K3F1YWxpdHkqMik7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdE1vbnN0ZXJMaXN0KCl7XHJcbiAgICAgICAgbGV0IGNvbnRlbnQ9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdtb25zdGVyU2Nyb2xsVmlldycpLmdldENvbXBvbmVudChjYy5TY3JvbGxWaWV3KS5jb250ZW50O1xyXG4gICAgICAgIC8v6I635b6X5YWz5Y2h5L+h5oGvLOaAqueJqeenjeexu1xyXG4gICAgICAgIGxldCBtb25zdGVySW5mb0xpc3Q9TWF6ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGaWdodGluZ0luZm8oKS5nZXRPbmx5TW9uc3RlckRhdGFMaXN0KCk7XHJcbiAgICAgICAgbW9uc3RlckluZm9MaXN0LmZvckVhY2goKGRhdGEsa2V5KT0+e1xyXG4gICAgICAgICAgICBsZXQgaWNvbj1Nb25zdGVySWNvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVNb25zdGVySWNvbihkYXRhLmlkLGRhdGEubGV2ZWwpO1xyXG4gICAgICAgICAgICBjb250ZW50LmFkZENoaWxkKGljb24pO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5CdWZmKGJ0bixzdHJJbmRleDpzdHJpbmcpe1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgbGV0IGluZGV4PXBhcnNlSW50KHN0ckluZGV4KTtcclxuICAgICAgICBpZih0aGlzLmN1cl9zZWxlY3RfYnVmZiE9aW5kZXgpe1xyXG4gICAgICAgICAgICB0aGlzLmN1cl9zZWxlY3RfYnVmZj1pbmRleDtcclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoU2VsZWN0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuWWVzKCl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTsgICAgICAgIFxyXG4gICAgICAgIC8v5L+d5a2YYnVmZlxyXG4gICAgICAgIGxldCBidWZmSWQ9TWF6ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRVblNlbGVjdFNwb2lscygpW3RoaXMuY3VyX3NlbGVjdF9idWZmLTFdO1xyXG4gICAgICAgIGlmKGJ1ZmZJZCl7XHJcbiAgICAgICAgICAgIC8v5b2T5L2c6IOc5Yip5aSE55CGXHJcbiAgICAgICAgICAgIE1hemVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hlY2tCdWZmU3RhZ2UoWzIwMDEsMjAwMiwyMDAzLDYwMDEsNjAwMiw2MDAzXSkgICAgICAgXHJcbiAgICAgICAgICAgIE1hemVNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkQnVmZihidWZmSWQpO1xyXG4gICAgICAgICAgICBNYXplTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldFVuU2VsZWN0U3BvaWxzKG5ldyBBcnJheSgpKTtcclxuICAgICAgICAgICAgTWF6ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRNYXplUGFzc2VkSWQodGhpcy5ib3hfaWQpO1xyXG4gICAgICAgICAgICBNYXplVWkuZ2V0SW5zdGFuY2UoKS5yZWZyZXNoRmxvb3IoKTtcclxuICAgICAgICAgICAgc3VwZXIub25DbG9zZSgpO1xyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuTm8oKXtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIHN1cGVyLm9uQ2xvc2UoKTtcclxuICAgIH1cclxuICAgIFxyXG59XHJcbiJdfQ==