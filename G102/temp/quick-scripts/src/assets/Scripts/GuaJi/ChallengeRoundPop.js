"use strict";
cc._RF.push(module, '7d08f3qn3dD3Kx2Bmv0CKtl', 'ChallengeRoundPop');
// Scripts/GuaJi/ChallengeRoundPop.ts

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
var Constants_1 = require("../Constants");
var GameManager_1 = require("../GameManager");
var FirstCompleteReward_1 = require("../Level/FirstCompleteReward");
var LevelManager_1 = require("../Level/LevelManager");
var MissionLevel_1 = require("../Level/MissionLevel");
var LanguageManager_1 = require("../multiLanguage/LanguageManager");
var TextLanguage_1 = require("../multiLanguage/TextLanguage");
var PropManager_1 = require("../Prop/PropManager");
var TutorailsManager_1 = require("../Tutorials/TutorailsManager");
var MainUi_1 = require("../UI/home/MainUi");
var ToPlayMainUi_1 = require("../UI/home/ToPlayMainUi");
var UIConfig_1 = require("../UI/UIConfig");
var UIManager_1 = require("../UI/UIManager");
var MapManager_1 = require("./MapManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ChallengeRoundPop = /** @class */ (function (_super) {
    __extends(ChallengeRoundPop, _super);
    function ChallengeRoundPop() {
        // @property(cc.Label)
        // label: cc.Label = null;
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // @property
        // text: string = 'hello';
        // LIFE-CYCLE CALLBACKS:
        // onLoad () {}
        _this.level = 0; //关卡节点代表的是哪个关卡   默认1
        _this.prop = null;
        _this.Common_Btn_0 = null; //开始按钮
        _this.Btn_Close = null; //关闭按钮
        _this.lqu = []; //已领取文字
        _this.Mask = []; //黑布
        _this.leveltxt = null; //关卡
        _this.Main_Icon_Boss = null; //boss头像
        _this.bg = null; //背景
        return _this;
        // update (dt) {}
    }
    ChallengeRoundPop.prototype.start = function () {
        this.Btn_Close.on(cc.Node.EventType.TOUCH_END, this.onBtn_Close, this);
        this.bg.on(cc.Node.EventType.TOUCH_END, this.onBtn_Close, this);
        this.Common_Btn_0.on(cc.Node.EventType.TOUCH_END, this.clickBtnStart, this);
    };
    ChallengeRoundPop.prototype.init = function (level) {
        this.level = level;
        this.leveltxt.getComponent(cc.Label).string = "" + MissionLevel_1.MissionLevelManager.getInstance().getLevelName(level);
        var myCurrentlevel = LevelManager_1.LevelManager.getInstance().finish_level + 1; //当前最大关卡
        for (var index = 0; index < this.prop.children.length; index++) {
            this.prop.children[index].destroy();
        }
        this.node.active = true;
        var Starnumber = 0;
        if (level < myCurrentlevel) {
            for (var LevelStarindex = 1; LevelStarindex < 4; LevelStarindex++) {
                if (LevelManager_1.LevelManager.getInstance().getALevelStar(level, LevelStarindex)) {
                    Starnumber++;
                }
            }
        }
        for (var Maskindex = 0; Maskindex < this.Mask.length; Maskindex++) {
            if (Maskindex < Starnumber) {
                this.Mask[Maskindex].active = true;
                this.lqu[Maskindex].active = true;
            }
            else {
                this.Mask[Maskindex].active = false;
                this.lqu[Maskindex].active = false;
            }
        }
        for (var Starindex = 1; Starindex <= 3; Starindex++) {
            var levelId = FirstCompleteReward_1.FirstCompleteRewardManager.getId(level, Starindex); //默认3个都完成  
            var RewardData = FirstCompleteReward_1.FirstCompleteRewardManager.getInstance().getFirstRewardArr(levelId);
            for (var level3 = 0; level3 < RewardData.length; level3++) {
                var rewardData = RewardData[level3];
                //可以获得奖品
                // this.scheduleOnce(()=>{
                // console.log("_______",rewardData.reward_id,rewardData.reward_num)
                var item = PropManager_1.PropManager.getInstance().createPropItem(rewardData.reward_id, rewardData.reward_num);
                item.scale = 0.82;
                item.parent = this.prop;
                item.x = -67 + level3 * 90;
                item.y = 190 - Starindex * 115 + 115; //第三颗星在最下面
                // item.x=-67+level3*90;
                // item.y=-40+Starindex*115-115;//第三颗星在最上面
                // },level3*0.1);
                // PropManager.getInstance().changePropNum(rewardData.reward_id,rewardData.reward_num);
            }
        }
        if (level > myCurrentlevel) {
            this.Common_Btn_0.getChildByName("kszd").getComponent(TextLanguage_1.default).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
            this.Common_Btn_0.getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
        }
        else {
            this.Common_Btn_0.getChildByName("kszd").getComponent(TextLanguage_1.default).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
            this.Common_Btn_0.getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
        }
        if (MissionLevel_1.MissionLevelManager.getInstance().getLevelTypes(level) == 3) {
            this.Main_Icon_Boss.active = true;
        }
        else {
            this.Main_Icon_Boss.active = false;
        }
    };
    ChallengeRoundPop.prototype.clickBtnStart = function () {
        // @ts-ignore
        if (this.Common_Btn_0.getComponent(cc.Sprite).getMaterial(0)._name == 'builtin-2d-gray-sprite (Instance)') {
            GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getStrByTextId(100100)); //该关卡尚未解锁
            return;
        }
        this.onBtn_Close();
        if (!TutorailsManager_1.default.getInstance().is_finish_game) {
            // console.log("+6")
            LevelManager_1.LevelManager.getInstance().start_level = MapManager_1.default.Currentlevel = LevelManager_1.LevelManager.getInstance().finish_level + 1;
            cc.find("Canvas/main_ui").getComponent(MainUi_1.default).clickBtnStart();
            return;
        }
        GameManager_1.default.getInstance().cur_game_mode = Constants_1.GameMode.Main;
        MapManager_1.default.Currentlevel = this.level;
        UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.ToPlay, UIConfig_1.UILayerLevel.One, { onCompleted: function (uiNode) {
                uiNode.getComponent(ToPlayMainUi_1.default).init({ onClose: function () {
                        // this.cur_selected_level=LevelManager.getInstance().start_level;                    
                        GameManager_1.default.getInstance().refreshZhanliShow();
                    } });
            }, });
    };
    ChallengeRoundPop.prototype.onBtn_Close = function () {
        for (var index = 0; index < this.prop.children.length; index++) {
            this.prop.children[index].destroy();
        }
        this.node.active = false;
    };
    __decorate([
        property(cc.Node)
    ], ChallengeRoundPop.prototype, "prop", void 0);
    __decorate([
        property(cc.Node)
    ], ChallengeRoundPop.prototype, "Common_Btn_0", void 0);
    __decorate([
        property(cc.Node)
    ], ChallengeRoundPop.prototype, "Btn_Close", void 0);
    __decorate([
        property(cc.Node)
    ], ChallengeRoundPop.prototype, "lqu", void 0);
    __decorate([
        property(cc.Node)
    ], ChallengeRoundPop.prototype, "Mask", void 0);
    __decorate([
        property(cc.Node)
    ], ChallengeRoundPop.prototype, "leveltxt", void 0);
    __decorate([
        property(cc.Node)
    ], ChallengeRoundPop.prototype, "Main_Icon_Boss", void 0);
    __decorate([
        property(cc.Node)
    ], ChallengeRoundPop.prototype, "bg", void 0);
    ChallengeRoundPop = __decorate([
        ccclass
    ], ChallengeRoundPop);
    return ChallengeRoundPop;
}(cc.Component));
exports.default = ChallengeRoundPop;

cc._RF.pop();