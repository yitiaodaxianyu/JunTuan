
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/UI/home/ToPlayUi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '53b11DCIS9Evqic9TrYV6tx', 'ToPlayUi');
// Scripts/UI/home/ToPlayUi.ts

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
var Constants_1 = require("../../Constants");
var GameManager_1 = require("../../GameManager");
var HeroManager_1 = require("../../Hero/Data/HeroManager");
var HeroConfig_1 = require("../../Hero/Game/HeroConfig");
var BtnHero_1 = require("../../Hero/Ui/BtnHero");
var FunctionDefinition_1 = require("../../JsonData/FunctionDefinition");
var LanguageManager_1 = require("../../multiLanguage/LanguageManager");
var PetConfig_1 = require("../../Pet/PetConfig");
var BtnPet_1 = require("../../Pet/Ui/BtnPet");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ToPlayUi = /** @class */ (function (_super) {
    __extends(ToPlayUi, _super);
    function ToPlayUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.item = null;
        _this.hero_team_rect = [];
        _this.pet_team_rect = [];
        _this.hero_touch_icon = null;
        _this.pet_touch_icon = null;
        _this.pet_list_touch_icon = null;
        _this.hero_select = null;
        _this.pet_select = null;
        _this.hero_team_pos = [];
        _this.pet_team_pos = [];
        _this.offset_x = 0;
        _this.offset_y = 0;
        _this.state = PetConfig_1.PetType.All;
        // private all_list: PetInfo[] = null;
        // private power_list: PetInfo[] = null;
        // private agile_list: PetInfo[] = null;
        // private intelligence_list: PetInfo[] = null;
        _this.content = null;
        return _this;
    }
    ToPlayUi.prototype.start = function () {
        this.initSelectPart();
        this.content = this.node.getChildByName("scroll0").getComponent(cc.ScrollView).content;
        this.refreshScroll();
    };
    ToPlayUi.prototype.initSelectPart = function () {
        this.hero_select = this.node.getChildByName("heroSelect");
        this.pet_select = this.node.getChildByName("petSelect");
        this.node.getChildByName("tipLabel1").getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(130002);
        this.node.getChildByName("tipLabel2").getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(640009);
        this.hero_select.active = false;
        this.pet_select.active = false;
        var hero = HeroManager_1.HeroManager.getInstance().getTeamList(GameManager_1.default.getInstance().cur_game_mode);
        for (var i = 1; i < HeroConfig_1.Hero_Type.Hero_Num; i++) {
            var heroIcon = this.node.getChildByName("btn_hero" + i);
            var size = heroIcon.getContentSize();
            var pos = heroIcon.getPosition();
            this.hero_team_rect.push(cc.rect(pos.x - size.width / 2, pos.y - size.height / 2, size.width, size.height));
            this.hero_team_pos.push(pos);
            var petIcon = this.node.getChildByName("btn_pet" + i);
            var petPos = petIcon.getPosition();
            var petSize = petIcon.getContentSize();
            this.pet_team_rect.push(cc.rect(petPos.x - petSize.width / 2, petPos.y - petSize.height / 2, petSize.width, petSize.height));
            this.pet_team_pos.push(petPos);
            if (HeroManager_1.HeroManager.getInstance().getHeroLevel(hero[i - 1]) > 0) {
                if (hero[i - 1] < HeroConfig_1.Hero_Type.ChangMaoShou)
                    continue;
                heroIcon.getComponent(BtnHero_1.default).init(hero[i - 1]);
                heroIcon.on(cc.Node.EventType.TOUCH_START, this.onHeroTouchStart, this);
                heroIcon.on(cc.Node.EventType.TOUCH_MOVE, this.onHeroTouchMove, this);
                heroIcon.on(cc.Node.EventType.TOUCH_END, this.onHeroTouchEnd, this);
                heroIcon.on(cc.Node.EventType.TOUCH_CANCEL, this.onHeroTouchCancel, this);
            }
        }
    };
    ToPlayUi.prototype.refreshScroll = function () {
        this.node.getChildByName("selectTypeBg").setPosition(this.node.getChildByName("type" + this.state).position);
        // this.all_list = new Array<PetInfo>();
        // this.power_list = new Array<PetInfo>();
        // this.agile_list = new Array<PetInfo>();
        // this.intelligence_list = new Array<PetInfo>();this.node.children[3]
        this.content.removeAllChildren();
        // this.all_list = PetManager.getInstance().getPetList();
        // for (let i = 0; i < this.all_list.length; i++) {
        //     let type = SpiritMessageManager.getInstance().getSpiritType(this.all_list[i].pet_id);
        //     if (type == PetType.Power) {
        //         this.power_list.push(this.all_list[i]);
        //     } else if (type == PetType.Agile) {
        //         this.agile_list.push(this.all_list[i]);
        //     } else {
        //         this.intelligence_list.push(this.all_list[i]);
        //     }
        // }
        // let tempList = this.all_list;
        // if (GameManager.getInstance().cur_game_mode == GameMode.Maze) {
        //     let leaseList = MazeManager.getInstance().getLeasePetList();
        //     if(leaseList.length != 0){
        //         tempList = tempList.concat(leaseList);
        //         PetManager.getInstance().sortPetList(tempList);
        //     }
        // }
        // switch (this.state) {
        //     case PetType.All:
        //         tempList = this.all_list;
        //         break;
        // case PetType.Power:
        //     tempList = this.power_list;
        //     break;
        // case PetType.Agile:
        //     tempList = this.agile_list;
        //     break;
        // case PetType.Intelligence:
        //     tempList = this.intelligence_list
        //     break;
        // }
        // for (let i = 0; i < tempList.length; i++) {
        //     let item = cc.instantiate(this.item);
        //     item.getComponent(PetItem).init(tempList[i]);
        //     item.getComponent(PetItem).initToPlay();
        //     item.scale = 0.75;
        //     item.setParent(this.content);
        //     if(tempList[i].lease_type != LeaseType.Null){
        //         let lease_Icon = new cc.Node();
        //         lease_Icon.addComponent(cc.Sprite).spriteFrame = PetManager.getInstance().getSpriteFrameByName("Sprite_Icon_Rent")
        //         item.addChild(lease_Icon);
        //         lease_Icon.setPosition(cc.v2(-(item.width/2) + 20,(item.height/2) - 10));
        //     }
        //     item.on(cc.Node.EventType.TOUCH_START, this.onListPetTouchStart, this);
        //     item.on(cc.Node.EventType.TOUCH_MOVE, this.onListPetTouchMove, this);
        //     item.on(cc.Node.EventType.TOUCH_END, this.onListPetTouchEnd, this);
        //     item.on(cc.Node.EventType.TOUCH_CANCEL, this.onListPetTouchCancel, this);
        // }
    };
    ToPlayUi.prototype.refreshSelectPart = function () {
        var hero = HeroManager_1.HeroManager.getInstance().getTeamList(GameManager_1.default.getInstance().cur_game_mode);
        for (var i = 1; i < HeroConfig_1.Hero_Type.Hero_Num; i++) {
            if (hero[i - 1] < HeroConfig_1.Hero_Type.ChangMaoShou)
                continue;
            var heroIcon = this.node.getChildByName("btn_hero" + i);
            heroIcon.getComponent(BtnHero_1.default).init(hero[i - 1]);
            var petIcon = this.node.getChildByName("btn_pet" + i);
            if (HeroManager_1.HeroManager.getInstance().getHeroData(hero[i - 1]).pet_info != null) {
                petIcon.getComponent(BtnPet_1.default).init(HeroManager_1.HeroManager.getInstance().getHeroData(hero[i - 1]).pet_info);
            }
            else {
                if (FunctionDefinition_1.FunctionDefinitionManager.getInstance().getIsUnlock(Constants_1.FuncType.ChongWuXiTong)) {
                    petIcon.getComponent(BtnPet_1.default).showNull();
                }
                else {
                }
            }
        }
    };
    ToPlayUi.prototype.onHeroTouchStart = function (e) {
        var touchTeam = e.getCurrentTarget();
        var btnTeam = touchTeam.getComponent(BtnHero_1.default);
        var teamList = HeroManager_1.HeroManager.getInstance().getTeamList(GameManager_1.default.getInstance().cur_game_mode);
        var touchIndex = teamList[btnTeam.team_index];
        var petBtnTeam = this.node.getChildByName("btn_pet" + (btnTeam.team_index + 1)).getComponent(BtnPet_1.default);
        if (this.hero_touch_icon != null) {
            this.hero_touch_icon.removeFromParent();
            this.hero_touch_icon = null;
        }
        if (this.pet_touch_icon != null) {
            this.pet_touch_icon.removeFromParent();
            this.pet_touch_icon = null;
        }
        if (touchIndex >= HeroConfig_1.Hero_Type.ChangMaoShou) {
            var icon = btnTeam.icon;
            this.hero_touch_icon = cc.instantiate(icon);
            this.hero_touch_icon.anchorY = 0.5;
            GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
            var pos = this.node.convertToNodeSpaceAR(e.getLocation());
            this.hero_touch_icon.parent = this.node;
            this.hero_touch_icon.setPosition(pos);
            if (HeroManager_1.HeroManager.getInstance().getHeroData(touchIndex).pet_info != null) {
                var petIcon = petBtnTeam.icon;
                this.pet_touch_icon = cc.instantiate(petIcon);
                this.pet_touch_icon.anchorY = 0.5;
                this.offset_x = btnTeam.node.x - petBtnTeam.node.x;
                this.offset_y = btnTeam.node.y - petBtnTeam.node.y;
                var petPos = cc.v2(this.hero_touch_icon.x - this.offset_x, this.hero_touch_icon.y - this.offset_y);
                this.pet_touch_icon.parent = this.node;
                this.pet_touch_icon.setPosition(petPos);
            }
        }
    };
    ToPlayUi.prototype.onHeroTouchMove = function (e) {
        if (this.hero_touch_icon) {
            var touchTeam = e.getCurrentTarget();
            var btnTeam = touchTeam.getComponent(BtnHero_1.default);
            var teamList = HeroManager_1.HeroManager.getInstance().getTeamList(GameManager_1.default.getInstance().cur_game_mode);
            var posIndex = btnTeam.team_index;
            var pos = this.node.convertToNodeSpaceAR(e.getLocation());
            this.hero_touch_icon.setPosition(pos);
            if (this.pet_touch_icon) {
                var petPos = cc.v2(this.hero_touch_icon.x - this.offset_x, this.hero_touch_icon.y - this.offset_y);
                this.pet_touch_icon.setPosition(petPos);
            }
            var conIndex = -1;
            var isCanPlace = false;
            for (var i = 0; i < this.hero_team_rect.length; i++) {
                if (this.hero_team_rect[i].contains(pos) == true) {
                    conIndex = i;
                    break;
                }
            }
            //判断该点是否有解锁
            if (conIndex >= 0 && posIndex != conIndex) {
                isCanPlace = true;
                if (teamList[conIndex] < 1)
                    return;
                this.hero_select.setPosition(this.hero_team_pos[conIndex]);
                if (this.pet_team_pos[conIndex]) {
                    this.pet_select.setPosition(this.pet_team_pos[conIndex]);
                }
            }
            this.hero_select.active = isCanPlace;
            if (this.pet_touch_icon) {
                this.pet_select.active = isCanPlace;
            }
        }
    };
    ToPlayUi.prototype.onHeroTouchEnd = function (e) {
        if (this.hero_touch_icon) {
            // console.log("结束点击事件")
            var hero = HeroManager_1.HeroManager.getInstance().getTeamList(GameManager_1.default.getInstance().cur_game_mode);
            this.hero_select.active = false;
            this.pet_select.active = false;
            this.hero_touch_icon.removeFromParent();
            this.hero_touch_icon = null;
            if (this.pet_touch_icon) {
                this.pet_touch_icon.removeFromParent();
                this.pet_touch_icon = null;
            }
            var touchTeam = e.getCurrentTarget();
            var btnTeam = touchTeam.getComponent(BtnHero_1.default);
            // let teamIndex=btnTeam.team_index;
            var pos = this.node.convertToNodeSpaceAR(e.getLocation());
            var conIndex = -1;
            for (var i = 0; i < this.hero_team_rect.length; i++) {
                if (this.hero_team_rect[i].contains(pos) == true) {
                    conIndex = i;
                    break;
                }
            }
            if (conIndex != -1) {
                if (hero[conIndex] < 1)
                    return;
                HeroManager_1.HeroManager.getInstance().saveTeamList(GameManager_1.default.getInstance().cur_game_mode, this.exchangeIndex(conIndex, btnTeam.team_index, hero));
                // console.log(HeroManager.getInstance().getTeamList(GameManager.getInstance().cur_game_mode))
                this.refreshSelectPart();
            }
        }
    };
    ToPlayUi.prototype.onHeroTouchCancel = function (e) {
        if (this.hero_touch_icon) {
            var hero = HeroManager_1.HeroManager.getInstance().getTeamList(GameManager_1.default.getInstance().cur_game_mode);
            this.hero_select.active = false;
            this.pet_select.active = false;
            this.hero_touch_icon.removeFromParent();
            this.hero_touch_icon = null;
            if (this.pet_touch_icon) {
                this.pet_touch_icon.removeFromParent();
                this.pet_touch_icon = null;
            }
            //判断是否需要换阵或者下阵
            var touchTeam = e.getCurrentTarget();
            var btnTeam = touchTeam.getComponent(BtnHero_1.default);
            var teamIndex = btnTeam.team_index;
            var pos = this.node.convertToNodeSpaceAR(e.getLocation());
            var conIndex = -1;
            for (var i = 0; i < this.hero_team_rect.length; i++) {
                if (this.hero_team_rect[i].contains(pos) == true) {
                    conIndex = i;
                    break;
                }
            }
            if (conIndex != -1) {
                if (hero[conIndex] < 1)
                    return;
                HeroManager_1.HeroManager.getInstance().saveTeamList(GameManager_1.default.getInstance().cur_game_mode, this.exchangeIndex(conIndex, btnTeam.team_index, hero));
                this.refreshSelectPart();
            }
        }
    };
    ToPlayUi.prototype.onSelectBtnClick = function (e, type) {
        this.state = Number(type);
        for (var i = 0; i < 4; i++) {
            var scroll = this.node.getChildByName("scroll" + i);
            scroll.active = false;
            if (i == this.state) {
                scroll.active = true;
                this.content = scroll.getComponent(cc.ScrollView).content;
            }
        }
        this.node.getChildByName("selectTypeBg").setPosition(this.node.getChildByName("type" + this.state).position);
        if (this.content.childrenCount == 0) {
            // 刷新宠物列表
            this.refreshScroll();
        }
    };
    ToPlayUi.prototype.exchangeIndex = function (pos1, pos2, teamList) {
        var temp = teamList[pos1];
        teamList[pos1] = teamList[pos2];
        teamList[pos2] = temp;
        return teamList;
    };
    ToPlayUi.prototype.exchangePet = function (hero1, hero2) {
        var temp = HeroManager_1.HeroManager.getInstance().getHeroData(hero1).pet_info;
        var temp2 = HeroManager_1.HeroManager.getInstance().getHeroData(hero2).pet_info;
        // console.log(temp,temp2);
        temp2.changeBindHero(temp, hero1);
        // console.log(HeroManager.getInstance().getHeroData(hero1).pet_info,HeroManager.getInstance().getHeroData(hero2).pet_info);
    };
    ToPlayUi.prototype.onClickIndentationBtn = function (e, index) {
        var _this = this;
        var pos;
        if (index == 1) {
            pos = cc.v3(0, this.node.y - this.node.getChildByName("Prepare_Bg_2").height - 25, 0);
        }
        else {
            pos = cc.v3(0, this.node.y + this.node.getChildByName("Prepare_Bg_2").height + 25, 0);
        }
        cc.tween(this.node).to(0.2, { position: pos }).call(function () {
            if (index == 1) {
                _this.node.getChildByName("indentation1").active = false;
                _this.node.getChildByName("indentation2").active = true;
            }
            else {
                _this.node.getChildByName("indentation1").active = true;
                _this.node.getChildByName("indentation2").active = false;
            }
        }).start();
    };
    __decorate([
        property(cc.Prefab)
    ], ToPlayUi.prototype, "item", void 0);
    ToPlayUi = __decorate([
        ccclass
    ], ToPlayUi);
    return ToPlayUi;
}(cc.Component));
exports.default = ToPlayUi;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVUlcXGhvbWVcXFRvUGxheVVpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZDQUFxRDtBQUNyRCxpREFBNEM7QUFDNUMsMkRBQTBEO0FBQzFELHlEQUF1RDtBQUN2RCxpREFBNEM7QUFDNUMsd0VBQThFO0FBRTlFLHVFQUFrRTtBQUNsRSxpREFBa0U7QUFFbEUsOENBQXlDO0FBRXpDLDZEQUF3RDtBQUdsRCxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUFzQyw0QkFBWTtJQUFsRDtRQUFBLHFFQXlXQztRQXRXRyxVQUFJLEdBQWEsSUFBSSxDQUFDO1FBRXRCLG9CQUFjLEdBQWMsRUFBRSxDQUFDO1FBQy9CLG1CQUFhLEdBQWMsRUFBRSxDQUFDO1FBRTlCLHFCQUFlLEdBQVksSUFBSSxDQUFDO1FBQ2hDLG9CQUFjLEdBQVksSUFBSSxDQUFDO1FBQy9CLHlCQUFtQixHQUFZLElBQUksQ0FBQztRQUVwQyxpQkFBVyxHQUFXLElBQUksQ0FBQztRQUMzQixnQkFBVSxHQUFXLElBQUksQ0FBQztRQUUxQixtQkFBYSxHQUFjLEVBQUUsQ0FBQztRQUM5QixrQkFBWSxHQUFjLEVBQUUsQ0FBQztRQUU3QixjQUFRLEdBQVUsQ0FBQyxDQUFDO1FBQ3BCLGNBQVEsR0FBVSxDQUFDLENBQUM7UUFFWixXQUFLLEdBQVksbUJBQU8sQ0FBQyxHQUFHLENBQUM7UUFDckMsc0NBQXNDO1FBQ3RDLHdDQUF3QztRQUN4Qyx3Q0FBd0M7UUFDeEMsK0NBQStDO1FBRXZDLGFBQU8sR0FBWSxJQUFJLENBQUM7O0lBOFVwQyxDQUFDO0lBNVVHLHdCQUFLLEdBQUw7UUFDSSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQztRQUN2RixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVELGlDQUFjLEdBQWQ7UUFDSSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzFELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUcseUJBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0gsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUcseUJBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0gsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUMvQixJQUFJLElBQUksR0FBRyx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzFGLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxzQkFBUyxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN6QyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDeEQsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3JDLElBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNqQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLEtBQUssR0FBQyxDQUFDLEVBQUMsR0FBRyxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsTUFBTSxHQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsS0FBSyxFQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2pHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzdCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUN0RCxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDbkMsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBQyxPQUFPLENBQUMsS0FBSyxHQUFDLENBQUMsRUFBQyxNQUFNLENBQUMsQ0FBQyxHQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUMsQ0FBQyxFQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDbEgsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDL0IsSUFBSSx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUN2RCxJQUFHLElBQUksQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEdBQUcsc0JBQVMsQ0FBQyxZQUFZO29CQUFFLFNBQVM7Z0JBQ2hELFFBQVEsQ0FBQyxZQUFZLENBQUMsaUJBQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQy9DLFFBQVEsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDeEUsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDdEUsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDcEUsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxDQUFDO2FBQzdFO1NBQ0o7SUFFTCxDQUFDO0lBRUQsZ0NBQWEsR0FBYjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQzVHLHdDQUF3QztRQUN4QywwQ0FBMEM7UUFDMUMsMENBQTBDO1FBQzFDLHNFQUFzRTtRQUN0RSxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDakMseURBQXlEO1FBQ3pELG1EQUFtRDtRQUMvQyw0RkFBNEY7UUFDNUYsbUNBQW1DO1FBQy9CLGtEQUFrRDtRQUNsRCwwQ0FBMEM7UUFDdEMsa0RBQWtEO1FBQ2xELGVBQWU7UUFDWCx5REFBeUQ7UUFDekQsUUFBUTtRQUNSLElBQUk7UUFDcEIsZ0NBQWdDO1FBQ2hDLGtFQUFrRTtRQUNsRSxtRUFBbUU7UUFDbkUsaUNBQWlDO1FBQ2pDLGlEQUFpRDtRQUNqRCwwREFBMEQ7UUFDMUQsUUFBUTtRQUNSLElBQUk7UUFDSix3QkFBd0I7UUFDeEIsd0JBQXdCO1FBQ3hCLG9DQUFvQztRQUNwQyxpQkFBaUI7UUFDYixzQkFBc0I7UUFDdEIsa0NBQWtDO1FBQ2xDLGFBQWE7UUFDYixzQkFBc0I7UUFDdEIsa0NBQWtDO1FBQ2xDLGFBQWE7UUFDYiw2QkFBNkI7UUFDN0Isd0NBQXdDO1FBQ3hDLGFBQWE7UUFDakIsSUFBSTtRQUNKLDhDQUE4QztRQUM5Qyw0Q0FBNEM7UUFDNUMsb0RBQW9EO1FBQ3BELCtDQUErQztRQUMvQyx5QkFBeUI7UUFDekIsb0NBQW9DO1FBRXBDLG9EQUFvRDtRQUNwRCwwQ0FBMEM7UUFDMUMsNkhBQTZIO1FBQzdILHFDQUFxQztRQUNyQyxvRkFBb0Y7UUFDcEYsUUFBUTtRQUVSLDhFQUE4RTtRQUM5RSw0RUFBNEU7UUFDNUUsMEVBQTBFO1FBQzFFLGdGQUFnRjtRQUdoRixJQUFJO0lBQ1IsQ0FBQztJQUVELG9DQUFpQixHQUFqQjtRQUNJLElBQUksSUFBSSxHQUFHLHlCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDMUYsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLHNCQUFTLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3pDLElBQUcsSUFBSSxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBRyxzQkFBUyxDQUFDLFlBQVk7Z0JBQUUsU0FBUztZQUVoRCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFFeEQsUUFBUSxDQUFDLFlBQVksQ0FBQyxpQkFBTyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUcvQyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDdEQsSUFBRyx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxJQUFJLElBQUksRUFBQztnQkFDakUsT0FBTyxDQUFDLFlBQVksQ0FBQyxnQkFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLHlCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUNoRztpQkFBSTtnQkFDRCxJQUFHLDhDQUF5QixDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxvQkFBUSxDQUFDLGFBQWEsQ0FBQyxFQUFDO29CQUMzRSxPQUFPLENBQUMsWUFBWSxDQUFDLGdCQUFNLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztpQkFDM0M7cUJBQUk7aUJBRUo7YUFDSjtTQUNKO0lBQ0wsQ0FBQztJQUVELG1DQUFnQixHQUFoQixVQUFpQixDQUFxQjtRQUNsQyxJQUFJLFNBQVMsR0FBQyxDQUFDLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUNuQyxJQUFJLE9BQU8sR0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLGlCQUFPLENBQUMsQ0FBQztRQUM1QyxJQUFJLFFBQVEsR0FBQyx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzVGLElBQUksVUFBVSxHQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFNUMsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxnQkFBTSxDQUFDLENBQUM7UUFDckcsSUFBRyxJQUFJLENBQUMsZUFBZSxJQUFFLElBQUksRUFDN0I7WUFDSSxJQUFJLENBQUMsZUFBZSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDeEMsSUFBSSxDQUFDLGVBQWUsR0FBQyxJQUFJLENBQUM7U0FDN0I7UUFDRCxJQUFHLElBQUksQ0FBQyxjQUFjLElBQUksSUFBSSxFQUFDO1lBQzNCLElBQUksQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUN2QyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztTQUM5QjtRQUNELElBQUcsVUFBVSxJQUFFLHNCQUFTLENBQUMsWUFBWSxFQUNyQztZQUNJLElBQUksSUFBSSxHQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7WUFDdEIsSUFBSSxDQUFDLGVBQWUsR0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxHQUFDLEdBQUcsQ0FBQztZQUNqQyxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsMkJBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNwRSxJQUFJLEdBQUcsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1lBQ3hELElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDdEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFdEMsSUFBRyx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxRQUFRLElBQUksSUFBSSxFQUFDO2dCQUNsRSxJQUFJLE9BQU8sR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDO2dCQUM5QixJQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQzlDLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztnQkFDbEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDbkQsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDbkQsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDbEcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDdkMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDM0M7U0FDSjtJQUNMLENBQUM7SUFFRCxrQ0FBZSxHQUFmLFVBQWdCLENBQXFCO1FBQ2pDLElBQUcsSUFBSSxDQUFDLGVBQWUsRUFDdkI7WUFDSSxJQUFJLFNBQVMsR0FBQyxDQUFDLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUNuQyxJQUFJLE9BQU8sR0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLGlCQUFPLENBQUMsQ0FBQztZQUM1QyxJQUFJLFFBQVEsR0FBQyx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQzVGLElBQUksUUFBUSxHQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUM7WUFDaEMsSUFBSSxHQUFHLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztZQUV4RCxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUV0QyxJQUFHLElBQUksQ0FBQyxjQUFjLEVBQUM7Z0JBQ25CLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ2xHLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQzNDO1lBRUQsSUFBSSxRQUFRLEdBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEIsSUFBSSxVQUFVLEdBQUMsS0FBSyxDQUFDO1lBQ3JCLEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFDOUM7Z0JBQ0ksSUFBRyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBRSxJQUFJLEVBQzdDO29CQUNJLFFBQVEsR0FBQyxDQUFDLENBQUM7b0JBQ1gsTUFBTTtpQkFDVDthQUNKO1lBQ0QsV0FBVztZQUNYLElBQUcsUUFBUSxJQUFFLENBQUMsSUFBSSxRQUFRLElBQUUsUUFBUSxFQUNwQztnQkFDSSxVQUFVLEdBQUMsSUFBSSxDQUFDO2dCQUNoQixJQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDO29CQUFFLE9BQU87Z0JBQ2xDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDM0QsSUFBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxFQUFDO29CQUMzQixJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7aUJBQzVEO2FBQ0o7WUFDRCxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBQyxVQUFVLENBQUM7WUFDbkMsSUFBRyxJQUFJLENBQUMsY0FBYyxFQUFDO2dCQUNuQixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUM7YUFDdkM7U0FDSjtJQUNMLENBQUM7SUFFRCxpQ0FBYyxHQUFkLFVBQWUsQ0FBcUI7UUFDaEMsSUFBRyxJQUFJLENBQUMsZUFBZSxFQUN2QjtZQUNJLHdCQUF3QjtZQUN4QixJQUFJLElBQUksR0FBRyx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBRTFGLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFDLEtBQUssQ0FBQztZQUM5QixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBQyxLQUFLLENBQUM7WUFDN0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQ3hDLElBQUksQ0FBQyxlQUFlLEdBQUMsSUFBSSxDQUFDO1lBRTFCLElBQUcsSUFBSSxDQUFDLGNBQWMsRUFBQztnQkFDbkIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2dCQUN2QyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQzthQUM5QjtZQUVELElBQUksU0FBUyxHQUFDLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQ25DLElBQUksT0FBTyxHQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsaUJBQU8sQ0FBQyxDQUFDO1lBQzVDLG9DQUFvQztZQUNwQyxJQUFJLEdBQUcsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1lBQ3hELElBQUksUUFBUSxHQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFDOUM7Z0JBQ0ksSUFBRyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBRSxJQUFJLEVBQzdDO29CQUNJLFFBQVEsR0FBQyxDQUFDLENBQUM7b0JBQ1gsTUFBTTtpQkFDVDthQUNKO1lBQ0QsSUFBRyxRQUFRLElBQUksQ0FBQyxDQUFDLEVBQUM7Z0JBQ2QsSUFBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQztvQkFBRSxPQUFPO2dCQUM5Qix5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQyxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsRUFBQyxJQUFJLENBQUMsYUFBYSxDQUNoRyxRQUFRLEVBQUMsT0FBTyxDQUFDLFVBQVUsRUFBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNwQyw4RkFBOEY7Z0JBQzlGLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2FBQzVCO1NBQ0o7SUFDTCxDQUFDO0lBRUQsb0NBQWlCLEdBQWpCLFVBQWtCLENBQXFCO1FBQ25DLElBQUcsSUFBSSxDQUFDLGVBQWUsRUFDdkI7WUFDSSxJQUFJLElBQUksR0FBRyx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBRTFGLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFDLEtBQUssQ0FBQztZQUM5QixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBQyxLQUFLLENBQUM7WUFDN0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQ3hDLElBQUksQ0FBQyxlQUFlLEdBQUMsSUFBSSxDQUFDO1lBRTFCLElBQUcsSUFBSSxDQUFDLGNBQWMsRUFBQztnQkFDbkIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2dCQUN2QyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQzthQUM5QjtZQUVELGNBQWM7WUFDZCxJQUFJLFNBQVMsR0FBQyxDQUFDLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUNuQyxJQUFJLE9BQU8sR0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLGlCQUFPLENBQUMsQ0FBQztZQUM1QyxJQUFJLFNBQVMsR0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDO1lBQ2pDLElBQUksR0FBRyxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7WUFDeEQsSUFBSSxRQUFRLEdBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEIsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUM5QztnQkFDSSxJQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFFLElBQUksRUFDN0M7b0JBQ0ksUUFBUSxHQUFDLENBQUMsQ0FBQztvQkFDWCxNQUFNO2lCQUNUO2FBQ0o7WUFDRCxJQUFHLFFBQVEsSUFBSSxDQUFDLENBQUMsRUFBQztnQkFDZCxJQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDO29CQUFFLE9BQU87Z0JBQzlCLHlCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsWUFBWSxDQUFDLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxFQUFDLElBQUksQ0FBQyxhQUFhLENBQ2hHLFFBQVEsRUFBQyxPQUFPLENBQUMsVUFBVSxFQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3BDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2FBQzVCO1NBQ0o7SUFDTCxDQUFDO0lBRUQsbUNBQWdCLEdBQWhCLFVBQWlCLENBQUMsRUFBQyxJQUFXO1FBQzFCLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ3pCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDeEIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3BELE1BQU0sQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ2pCLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2dCQUNyQixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQzthQUM3RDtTQUNKO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDNUcsSUFBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsSUFBSSxDQUFDLEVBQUM7WUFDL0IsU0FBUztZQUNULElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN4QjtJQUNMLENBQUM7SUFFRCxnQ0FBYSxHQUFiLFVBQWMsSUFBVyxFQUFDLElBQVcsRUFBQyxRQUFpQjtRQUNuRCxJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUIsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLE9BQU8sUUFBUSxDQUFDO0lBQ3BCLENBQUM7SUFFRCw4QkFBVyxHQUFYLFVBQVksS0FBZSxFQUFDLEtBQWU7UUFDdkMsSUFBSSxJQUFJLEdBQUcseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxDQUFDO1FBQ2pFLElBQUksS0FBSyxHQUFHLHlCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQztRQUNsRSwyQkFBMkI7UUFDM0IsS0FBSyxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUMsS0FBSyxDQUFDLENBQUM7UUFDakMsNEhBQTRIO0lBQ2hJLENBQUM7SUFFRCx3Q0FBcUIsR0FBckIsVUFBc0IsQ0FBQyxFQUFDLEtBQVk7UUFBcEMsaUJBZ0JDO1FBZkcsSUFBSSxHQUFHLENBQUM7UUFDUixJQUFHLEtBQUssSUFBSSxDQUFDLEVBQUM7WUFDVixHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLENBQUMsTUFBTSxHQUFHLEVBQUUsRUFBQyxDQUFDLENBQUMsQ0FBQztTQUN2RjthQUFJO1lBQ0QsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxFQUFFLEVBQUMsQ0FBQyxDQUFDLENBQUM7U0FDdkY7UUFDRCxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFDLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQzVDLElBQUcsS0FBSyxJQUFJLENBQUMsRUFBQztnQkFDVixLQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFBO2dCQUN2RCxLQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFBO2FBQ3pEO2lCQUFJO2dCQUNELEtBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUE7Z0JBQ3RELEtBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUE7YUFDMUQ7UUFDTCxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNmLENBQUM7SUFwV0Q7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzswQ0FDRTtJQUhMLFFBQVE7UUFENUIsT0FBTztPQUNhLFFBQVEsQ0F5VzVCO0lBQUQsZUFBQztDQXpXRCxBQXlXQyxDQXpXcUMsRUFBRSxDQUFDLFNBQVMsR0F5V2pEO2tCQXpXb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZ1bmNUeXBlLCBHYW1lTW9kZSB9IGZyb20gXCIuLi8uLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi8uLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBIZXJvTWFuYWdlciB9IGZyb20gXCIuLi8uLi9IZXJvL0RhdGEvSGVyb01hbmFnZXJcIjtcclxuaW1wb3J0IHsgSGVyb19UeXBlIH0gZnJvbSBcIi4uLy4uL0hlcm8vR2FtZS9IZXJvQ29uZmlnXCI7XHJcbmltcG9ydCBCdG5IZXJvIGZyb20gXCIuLi8uLi9IZXJvL1VpL0J0bkhlcm9cIjtcclxuaW1wb3J0IHsgRnVuY3Rpb25EZWZpbml0aW9uTWFuYWdlciB9IGZyb20gXCIuLi8uLi9Kc29uRGF0YS9GdW5jdGlvbkRlZmluaXRpb25cIjtcclxuaW1wb3J0IHsgTWF6ZU1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vTWF6ZS9NYXplTWFuYWdlclwiO1xyXG5pbXBvcnQgTGFuZ3VhZ2VNYW5hZ2VyIGZyb20gXCIuLi8uLi9tdWx0aUxhbmd1YWdlL0xhbmd1YWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBMZWFzZVR5cGUsIFBldEluZm8sIFBldFR5cGUgfSBmcm9tIFwiLi4vLi4vUGV0L1BldENvbmZpZ1wiO1xyXG5pbXBvcnQgeyBQZXRNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL1BldC9QZXRNYW5hZ2VyXCI7XHJcbmltcG9ydCBCdG5QZXQgZnJvbSBcIi4uLy4uL1BldC9VaS9CdG5QZXRcIjtcclxuaW1wb3J0IFBldEl0ZW0gZnJvbSBcIi4uLy4uL1BldC9VaS9QZXRJdGVtXCI7XHJcbmltcG9ydCB7IFNvdW5kSW5kZXggfSBmcm9tIFwiLi4vLi4vU291bmQvQXVkaW9Db25zdGFudHNcIjtcclxuaW1wb3J0IFR1dG9yYWlsc01hbmFnZXIgZnJvbSBcIi4uLy4uL1R1dG9yaWFscy9UdXRvcmFpbHNNYW5hZ2VyXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9QbGF5VWkgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICBpdGVtOmNjLlByZWZhYiA9IG51bGw7XHJcblxyXG4gICAgaGVyb190ZWFtX3JlY3Q6IGNjLlJlY3RbXSA9IFtdO1xyXG4gICAgcGV0X3RlYW1fcmVjdDogY2MuUmVjdFtdID0gW107XHJcblxyXG4gICAgaGVyb190b3VjaF9pY29uOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIHBldF90b3VjaF9pY29uOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIHBldF9saXN0X3RvdWNoX2ljb246IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIGhlcm9fc2VsZWN0OmNjLk5vZGUgPSBudWxsO1xyXG4gICAgcGV0X3NlbGVjdDpjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBoZXJvX3RlYW1fcG9zOiBjYy5WZWMyW10gPSBbXTtcclxuICAgIHBldF90ZWFtX3BvczogY2MuVmVjMltdID0gW107XHJcblxyXG4gICAgb2Zmc2V0X3g6bnVtYmVyID0gMDtcclxuICAgIG9mZnNldF95Om51bWJlciA9IDA7XHJcbiAgICBcclxuICAgIHByaXZhdGUgc3RhdGU6IFBldFR5cGUgPSBQZXRUeXBlLkFsbDtcclxuICAgIC8vIHByaXZhdGUgYWxsX2xpc3Q6IFBldEluZm9bXSA9IG51bGw7XHJcbiAgICAvLyBwcml2YXRlIHBvd2VyX2xpc3Q6IFBldEluZm9bXSA9IG51bGw7XHJcbiAgICAvLyBwcml2YXRlIGFnaWxlX2xpc3Q6IFBldEluZm9bXSA9IG51bGw7XHJcbiAgICAvLyBwcml2YXRlIGludGVsbGlnZW5jZV9saXN0OiBQZXRJbmZvW10gPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgY29udGVudDogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgc3RhcnQoKSB7XHJcbiAgICAgICAgdGhpcy5pbml0U2VsZWN0UGFydCgpO1xyXG4gICAgICAgIHRoaXMuY29udGVudCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInNjcm9sbDBcIikuZ2V0Q29tcG9uZW50KGNjLlNjcm9sbFZpZXcpLmNvbnRlbnQ7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoU2Nyb2xsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdFNlbGVjdFBhcnQoKSB7XHJcbiAgICAgICAgdGhpcy5oZXJvX3NlbGVjdCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImhlcm9TZWxlY3RcIik7XHJcbiAgICAgICAgdGhpcy5wZXRfc2VsZWN0ID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwicGV0U2VsZWN0XCIpO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInRpcExhYmVsMVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDEzMDAwMik7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwidGlwTGFiZWwyXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoNjQwMDA5KTtcclxuICAgICAgICB0aGlzLmhlcm9fc2VsZWN0LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucGV0X3NlbGVjdC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBsZXQgaGVybyA9IEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VGVhbUxpc3QoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9tb2RlKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IEhlcm9fVHlwZS5IZXJvX051bTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBoZXJvSWNvbiA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJ0bl9oZXJvXCIgKyBpKTtcclxuICAgICAgICAgICAgbGV0IHNpemUgPSBoZXJvSWNvbi5nZXRDb250ZW50U2l6ZSgpO1xyXG4gICAgICAgICAgICBsZXQgcG9zID0gaGVyb0ljb24uZ2V0UG9zaXRpb24oKTtcclxuICAgICAgICAgICAgdGhpcy5oZXJvX3RlYW1fcmVjdC5wdXNoKGNjLnJlY3QocG9zLngtc2l6ZS53aWR0aC8yLHBvcy55LXNpemUuaGVpZ2h0LzIsc2l6ZS53aWR0aCxzaXplLmhlaWdodCkpO1xyXG4gICAgICAgICAgICB0aGlzLmhlcm9fdGVhbV9wb3MucHVzaChwb3MpO1xyXG4gICAgICAgICAgICBsZXQgcGV0SWNvbiA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJ0bl9wZXRcIiArIGkpO1xyXG4gICAgICAgICAgICBsZXQgcGV0UG9zID0gcGV0SWNvbi5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgICAgICBsZXQgcGV0U2l6ZSA9IHBldEljb24uZ2V0Q29udGVudFNpemUoKTtcclxuICAgICAgICAgICAgdGhpcy5wZXRfdGVhbV9yZWN0LnB1c2goY2MucmVjdChwZXRQb3MueC1wZXRTaXplLndpZHRoLzIscGV0UG9zLnktcGV0U2l6ZS5oZWlnaHQvMixwZXRTaXplLndpZHRoLHBldFNpemUuaGVpZ2h0KSk7XHJcbiAgICAgICAgICAgIHRoaXMucGV0X3RlYW1fcG9zLnB1c2gocGV0UG9zKTtcclxuICAgICAgICAgICAgaWYgKEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb0xldmVsKGhlcm9baS0xXSkgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBpZihoZXJvW2ktMV0gPCBIZXJvX1R5cGUuQ2hhbmdNYW9TaG91KSBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGhlcm9JY29uLmdldENvbXBvbmVudChCdG5IZXJvKS5pbml0KGhlcm9baS0xXSk7XHJcbiAgICAgICAgICAgICAgICBoZXJvSWNvbi5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgdGhpcy5vbkhlcm9Ub3VjaFN0YXJ0LCB0aGlzKTtcclxuICAgICAgICAgICAgICAgIGhlcm9JY29uLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX01PVkUsIHRoaXMub25IZXJvVG91Y2hNb3ZlLCB0aGlzKTtcclxuICAgICAgICAgICAgICAgIGhlcm9JY29uLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vbkhlcm9Ub3VjaEVuZCwgdGhpcyk7XHJcbiAgICAgICAgICAgICAgICBoZXJvSWNvbi5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9DQU5DRUwsIHRoaXMub25IZXJvVG91Y2hDYW5jZWwsIHRoaXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICByZWZyZXNoU2Nyb2xsKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInNlbGVjdFR5cGVCZ1wiKS5zZXRQb3NpdGlvbih0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ0eXBlXCIgKyB0aGlzLnN0YXRlKS5wb3NpdGlvbilcclxuICAgICAgICAvLyB0aGlzLmFsbF9saXN0ID0gbmV3IEFycmF5PFBldEluZm8+KCk7XHJcbiAgICAgICAgLy8gdGhpcy5wb3dlcl9saXN0ID0gbmV3IEFycmF5PFBldEluZm8+KCk7XHJcbiAgICAgICAgLy8gdGhpcy5hZ2lsZV9saXN0ID0gbmV3IEFycmF5PFBldEluZm8+KCk7XHJcbiAgICAgICAgLy8gdGhpcy5pbnRlbGxpZ2VuY2VfbGlzdCA9IG5ldyBBcnJheTxQZXRJbmZvPigpO3RoaXMubm9kZS5jaGlsZHJlblszXVxyXG4gICAgICAgIHRoaXMuY29udGVudC5yZW1vdmVBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgIC8vIHRoaXMuYWxsX2xpc3QgPSBQZXRNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UGV0TGlzdCgpO1xyXG4gICAgICAgIC8vIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5hbGxfbGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAvLyAgICAgbGV0IHR5cGUgPSBTcGlyaXRNZXNzYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNwaXJpdFR5cGUodGhpcy5hbGxfbGlzdFtpXS5wZXRfaWQpO1xyXG4gICAgICAgICAgICAvLyAgICAgaWYgKHR5cGUgPT0gUGV0VHlwZS5Qb3dlcikge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICB0aGlzLnBvd2VyX2xpc3QucHVzaCh0aGlzLmFsbF9saXN0W2ldKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICB9IGVsc2UgaWYgKHR5cGUgPT0gUGV0VHlwZS5BZ2lsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgdGhpcy5hZ2lsZV9saXN0LnB1c2godGhpcy5hbGxfbGlzdFtpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgdGhpcy5pbnRlbGxpZ2VuY2VfbGlzdC5wdXNoKHRoaXMuYWxsX2xpc3RbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gbGV0IHRlbXBMaXN0ID0gdGhpcy5hbGxfbGlzdDtcclxuICAgICAgICAvLyBpZiAoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9tb2RlID09IEdhbWVNb2RlLk1hemUpIHtcclxuICAgICAgICAvLyAgICAgbGV0IGxlYXNlTGlzdCA9IE1hemVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TGVhc2VQZXRMaXN0KCk7XHJcbiAgICAgICAgLy8gICAgIGlmKGxlYXNlTGlzdC5sZW5ndGggIT0gMCl7XHJcbiAgICAgICAgLy8gICAgICAgICB0ZW1wTGlzdCA9IHRlbXBMaXN0LmNvbmNhdChsZWFzZUxpc3QpO1xyXG4gICAgICAgIC8vICAgICAgICAgUGV0TWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvcnRQZXRMaXN0KHRlbXBMaXN0KTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyBzd2l0Y2ggKHRoaXMuc3RhdGUpIHtcclxuICAgICAgICAvLyAgICAgY2FzZSBQZXRUeXBlLkFsbDpcclxuICAgICAgICAvLyAgICAgICAgIHRlbXBMaXN0ID0gdGhpcy5hbGxfbGlzdDtcclxuICAgICAgICAvLyAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAvLyBjYXNlIFBldFR5cGUuUG93ZXI6XHJcbiAgICAgICAgICAgIC8vICAgICB0ZW1wTGlzdCA9IHRoaXMucG93ZXJfbGlzdDtcclxuICAgICAgICAgICAgLy8gICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAvLyBjYXNlIFBldFR5cGUuQWdpbGU6XHJcbiAgICAgICAgICAgIC8vICAgICB0ZW1wTGlzdCA9IHRoaXMuYWdpbGVfbGlzdDtcclxuICAgICAgICAgICAgLy8gICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAvLyBjYXNlIFBldFR5cGUuSW50ZWxsaWdlbmNlOlxyXG4gICAgICAgICAgICAvLyAgICAgdGVtcExpc3QgPSB0aGlzLmludGVsbGlnZW5jZV9saXN0XHJcbiAgICAgICAgICAgIC8vICAgICBicmVhaztcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gZm9yIChsZXQgaSA9IDA7IGkgPCB0ZW1wTGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIC8vICAgICBsZXQgaXRlbSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuaXRlbSk7XHJcbiAgICAgICAgLy8gICAgIGl0ZW0uZ2V0Q29tcG9uZW50KFBldEl0ZW0pLmluaXQodGVtcExpc3RbaV0pO1xyXG4gICAgICAgIC8vICAgICBpdGVtLmdldENvbXBvbmVudChQZXRJdGVtKS5pbml0VG9QbGF5KCk7XHJcbiAgICAgICAgLy8gICAgIGl0ZW0uc2NhbGUgPSAwLjc1O1xyXG4gICAgICAgIC8vICAgICBpdGVtLnNldFBhcmVudCh0aGlzLmNvbnRlbnQpO1xyXG5cclxuICAgICAgICAvLyAgICAgaWYodGVtcExpc3RbaV0ubGVhc2VfdHlwZSAhPSBMZWFzZVR5cGUuTnVsbCl7XHJcbiAgICAgICAgLy8gICAgICAgICBsZXQgbGVhc2VfSWNvbiA9IG5ldyBjYy5Ob2RlKCk7XHJcbiAgICAgICAgLy8gICAgICAgICBsZWFzZV9JY29uLmFkZENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gUGV0TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNwcml0ZUZyYW1lQnlOYW1lKFwiU3ByaXRlX0ljb25fUmVudFwiKVxyXG4gICAgICAgIC8vICAgICAgICAgaXRlbS5hZGRDaGlsZChsZWFzZV9JY29uKTtcclxuICAgICAgICAvLyAgICAgICAgIGxlYXNlX0ljb24uc2V0UG9zaXRpb24oY2MudjIoLShpdGVtLndpZHRoLzIpICsgMjAsKGl0ZW0uaGVpZ2h0LzIpIC0gMTApKTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAvLyAgICAgaXRlbS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgdGhpcy5vbkxpc3RQZXRUb3VjaFN0YXJ0LCB0aGlzKTtcclxuICAgICAgICAvLyAgICAgaXRlbS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9NT1ZFLCB0aGlzLm9uTGlzdFBldFRvdWNoTW92ZSwgdGhpcyk7XHJcbiAgICAgICAgLy8gICAgIGl0ZW0ub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uTGlzdFBldFRvdWNoRW5kLCB0aGlzKTtcclxuICAgICAgICAvLyAgICAgaXRlbS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9DQU5DRUwsIHRoaXMub25MaXN0UGV0VG91Y2hDYW5jZWwsIHRoaXMpO1xyXG5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgLy8gfVxyXG4gICAgfVxyXG5cclxuICAgIHJlZnJlc2hTZWxlY3RQYXJ0KCl7XHJcbiAgICAgICAgbGV0IGhlcm8gPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFRlYW1MaXN0KEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZSk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBIZXJvX1R5cGUuSGVyb19OdW07IGkrKykge1xyXG4gICAgICAgICAgICBpZihoZXJvW2ktMV0gPCBIZXJvX1R5cGUuQ2hhbmdNYW9TaG91KSBjb250aW51ZTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBoZXJvSWNvbiA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJ0bl9oZXJvXCIgKyBpKTtcclxuXHJcbiAgICAgICAgICAgIGhlcm9JY29uLmdldENvbXBvbmVudChCdG5IZXJvKS5pbml0KGhlcm9baS0xXSk7XHJcblxyXG5cclxuICAgICAgICAgICAgbGV0IHBldEljb24gPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJidG5fcGV0XCIgKyBpKTtcclxuICAgICAgICAgICAgaWYoSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvRGF0YShoZXJvW2ktMV0pLnBldF9pbmZvICE9IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgcGV0SWNvbi5nZXRDb21wb25lbnQoQnRuUGV0KS5pbml0KEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb0RhdGEoaGVyb1tpLTFdKS5wZXRfaW5mbyk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgaWYoRnVuY3Rpb25EZWZpbml0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldElzVW5sb2NrKEZ1bmNUeXBlLkNob25nV3VYaVRvbmcpKXtcclxuICAgICAgICAgICAgICAgICAgICBwZXRJY29uLmdldENvbXBvbmVudChCdG5QZXQpLnNob3dOdWxsKCk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25IZXJvVG91Y2hTdGFydChlOmNjLkV2ZW50LkV2ZW50VG91Y2gpIHtcclxuICAgICAgICBsZXQgdG91Y2hUZWFtPWUuZ2V0Q3VycmVudFRhcmdldCgpO1xyXG4gICAgICAgIGxldCBidG5UZWFtPXRvdWNoVGVhbS5nZXRDb21wb25lbnQoQnRuSGVybyk7XHJcbiAgICAgICAgbGV0IHRlYW1MaXN0PUhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VGVhbUxpc3QoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9tb2RlKTtcclxuICAgICAgICBsZXQgdG91Y2hJbmRleD10ZWFtTGlzdFtidG5UZWFtLnRlYW1faW5kZXhdO1xyXG5cclxuICAgICAgICBsZXQgcGV0QnRuVGVhbSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJ0bl9wZXRcIiArIChidG5UZWFtLnRlYW1faW5kZXggKyAxKSkuZ2V0Q29tcG9uZW50KEJ0blBldCk7XHJcbiAgICAgICAgaWYodGhpcy5oZXJvX3RvdWNoX2ljb24hPW51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmhlcm9fdG91Y2hfaWNvbi5yZW1vdmVGcm9tUGFyZW50KCk7XHJcbiAgICAgICAgICAgIHRoaXMuaGVyb190b3VjaF9pY29uPW51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMucGV0X3RvdWNoX2ljb24gIT0gbnVsbCl7XHJcbiAgICAgICAgICAgIHRoaXMucGV0X3RvdWNoX2ljb24ucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgICAgICAgICB0aGlzLnBldF90b3VjaF9pY29uID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodG91Y2hJbmRleD49SGVyb19UeXBlLkNoYW5nTWFvU2hvdSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCBpY29uPWJ0blRlYW0uaWNvbjtcclxuICAgICAgICAgICAgdGhpcy5oZXJvX3RvdWNoX2ljb249Y2MuaW5zdGFudGlhdGUoaWNvbik7XHJcbiAgICAgICAgICAgIHRoaXMuaGVyb190b3VjaF9pY29uLmFuY2hvclk9MC41O1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgICAgICBsZXQgcG9zPXRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihlLmdldExvY2F0aW9uKCkpO1xyXG4gICAgICAgICAgICB0aGlzLmhlcm9fdG91Y2hfaWNvbi5wYXJlbnQ9dGhpcy5ub2RlO1xyXG4gICAgICAgICAgICB0aGlzLmhlcm9fdG91Y2hfaWNvbi5zZXRQb3NpdGlvbihwb3MpO1xyXG5cclxuICAgICAgICAgICAgaWYoSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvRGF0YSh0b3VjaEluZGV4KS5wZXRfaW5mbyAhPSBudWxsKXtcclxuICAgICAgICAgICAgICAgIGxldCBwZXRJY29uID0gcGV0QnRuVGVhbS5pY29uO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wZXRfdG91Y2hfaWNvbiA9IGNjLmluc3RhbnRpYXRlKHBldEljb24pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wZXRfdG91Y2hfaWNvbi5hbmNob3JZID0gMC41O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vZmZzZXRfeCA9IGJ0blRlYW0ubm9kZS54IC0gcGV0QnRuVGVhbS5ub2RlLng7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9mZnNldF95ID0gYnRuVGVhbS5ub2RlLnkgLSBwZXRCdG5UZWFtLm5vZGUueTtcclxuICAgICAgICAgICAgICAgIGxldCBwZXRQb3MgPSBjYy52Mih0aGlzLmhlcm9fdG91Y2hfaWNvbi54IC0gdGhpcy5vZmZzZXRfeCx0aGlzLmhlcm9fdG91Y2hfaWNvbi55IC0gdGhpcy5vZmZzZXRfeSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBldF90b3VjaF9pY29uLnBhcmVudCA9IHRoaXMubm9kZTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGV0X3RvdWNoX2ljb24uc2V0UG9zaXRpb24ocGV0UG9zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkhlcm9Ub3VjaE1vdmUoZTpjYy5FdmVudC5FdmVudFRvdWNoKSB7XHJcbiAgICAgICAgaWYodGhpcy5oZXJvX3RvdWNoX2ljb24pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgdG91Y2hUZWFtPWUuZ2V0Q3VycmVudFRhcmdldCgpO1xyXG4gICAgICAgICAgICBsZXQgYnRuVGVhbT10b3VjaFRlYW0uZ2V0Q29tcG9uZW50KEJ0bkhlcm8pO1xyXG4gICAgICAgICAgICBsZXQgdGVhbUxpc3Q9SGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRUZWFtTGlzdChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX21vZGUpO1xyXG4gICAgICAgICAgICBsZXQgcG9zSW5kZXg9YnRuVGVhbS50ZWFtX2luZGV4O1xyXG4gICAgICAgICAgICBsZXQgcG9zPXRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihlLmdldExvY2F0aW9uKCkpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5oZXJvX3RvdWNoX2ljb24uc2V0UG9zaXRpb24ocG9zKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKHRoaXMucGV0X3RvdWNoX2ljb24pe1xyXG4gICAgICAgICAgICAgICAgbGV0IHBldFBvcyA9IGNjLnYyKHRoaXMuaGVyb190b3VjaF9pY29uLnggLSB0aGlzLm9mZnNldF94LHRoaXMuaGVyb190b3VjaF9pY29uLnkgLSB0aGlzLm9mZnNldF95KTsgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMucGV0X3RvdWNoX2ljb24uc2V0UG9zaXRpb24ocGV0UG9zKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IGNvbkluZGV4PS0xO1xyXG4gICAgICAgICAgICBsZXQgaXNDYW5QbGFjZT1mYWxzZTtcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8dGhpcy5oZXJvX3RlYW1fcmVjdC5sZW5ndGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5oZXJvX3RlYW1fcmVjdFtpXS5jb250YWlucyhwb3MpPT10cnVlKVxyXG4gICAgICAgICAgICAgICAgeyAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgY29uSW5kZXg9aTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL+WIpOaWreivpeeCueaYr+WQpuacieino+mUgVxyXG4gICAgICAgICAgICBpZihjb25JbmRleD49MCAmJiBwb3NJbmRleCE9Y29uSW5kZXgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlzQ2FuUGxhY2U9dHJ1ZTtcclxuICAgICAgICAgICAgICAgIGlmKHRlYW1MaXN0W2NvbkluZGV4XSA8IDEpIHJldHVybjsgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5oZXJvX3NlbGVjdC5zZXRQb3NpdGlvbih0aGlzLmhlcm9fdGVhbV9wb3NbY29uSW5kZXhdKTtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMucGV0X3RlYW1fcG9zW2NvbkluZGV4XSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wZXRfc2VsZWN0LnNldFBvc2l0aW9uKHRoaXMucGV0X3RlYW1fcG9zW2NvbkluZGV4XSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5oZXJvX3NlbGVjdC5hY3RpdmU9aXNDYW5QbGFjZTtcclxuICAgICAgICAgICAgaWYodGhpcy5wZXRfdG91Y2hfaWNvbil7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBldF9zZWxlY3QuYWN0aXZlID0gaXNDYW5QbGFjZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkhlcm9Ub3VjaEVuZChlOmNjLkV2ZW50LkV2ZW50VG91Y2gpIHtcclxuICAgICAgICBpZih0aGlzLmhlcm9fdG91Y2hfaWNvbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwi57uT5p2f54K55Ye75LqL5Lu2XCIpXHJcbiAgICAgICAgICAgIGxldCBoZXJvID0gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRUZWFtTGlzdChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX21vZGUpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5oZXJvX3NlbGVjdC5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMucGV0X3NlbGVjdC5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuaGVyb190b3VjaF9pY29uLnJlbW92ZUZyb21QYXJlbnQoKTtcclxuICAgICAgICAgICAgdGhpcy5oZXJvX3RvdWNoX2ljb249bnVsbDtcclxuXHJcbiAgICAgICAgICAgIGlmKHRoaXMucGV0X3RvdWNoX2ljb24pe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wZXRfdG91Y2hfaWNvbi5yZW1vdmVGcm9tUGFyZW50KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBldF90b3VjaF9pY29uID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IHRvdWNoVGVhbT1lLmdldEN1cnJlbnRUYXJnZXQoKTtcclxuICAgICAgICAgICAgbGV0IGJ0blRlYW09dG91Y2hUZWFtLmdldENvbXBvbmVudChCdG5IZXJvKTtcclxuICAgICAgICAgICAgLy8gbGV0IHRlYW1JbmRleD1idG5UZWFtLnRlYW1faW5kZXg7XHJcbiAgICAgICAgICAgIGxldCBwb3M9dGhpcy5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKGUuZ2V0TG9jYXRpb24oKSk7XHJcbiAgICAgICAgICAgIGxldCBjb25JbmRleD0tMTtcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8dGhpcy5oZXJvX3RlYW1fcmVjdC5sZW5ndGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5oZXJvX3RlYW1fcmVjdFtpXS5jb250YWlucyhwb3MpPT10cnVlKVxyXG4gICAgICAgICAgICAgICAgeyAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgY29uSW5kZXg9aTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihjb25JbmRleCAhPSAtMSl7XHJcbiAgICAgICAgICAgICAgICBpZihoZXJvW2NvbkluZGV4XSA8IDEpIHJldHVybjtcclxuICAgICAgICAgICAgICAgIEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVRlYW1MaXN0KEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZSx0aGlzLmV4Y2hhbmdlSW5kZXhcclxuICAgICAgICAgICAgICAgIChjb25JbmRleCxidG5UZWFtLnRlYW1faW5kZXgsaGVybykpO1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRUZWFtTGlzdChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX21vZGUpKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoU2VsZWN0UGFydCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uSGVyb1RvdWNoQ2FuY2VsKGU6Y2MuRXZlbnQuRXZlbnRUb3VjaCkge1xyXG4gICAgICAgIGlmKHRoaXMuaGVyb190b3VjaF9pY29uKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IGhlcm8gPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFRlYW1MaXN0KEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmhlcm9fc2VsZWN0LmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5wZXRfc2VsZWN0LmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5oZXJvX3RvdWNoX2ljb24ucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgICAgICAgICB0aGlzLmhlcm9fdG91Y2hfaWNvbj1udWxsO1xyXG5cclxuICAgICAgICAgICAgaWYodGhpcy5wZXRfdG91Y2hfaWNvbil7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBldF90b3VjaF9pY29uLnJlbW92ZUZyb21QYXJlbnQoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGV0X3RvdWNoX2ljb24gPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL+WIpOaWreaYr+WQpumcgOimgeaNoumYteaIluiAheS4i+mYtVxyXG4gICAgICAgICAgICBsZXQgdG91Y2hUZWFtPWUuZ2V0Q3VycmVudFRhcmdldCgpO1xyXG4gICAgICAgICAgICBsZXQgYnRuVGVhbT10b3VjaFRlYW0uZ2V0Q29tcG9uZW50KEJ0bkhlcm8pO1xyXG4gICAgICAgICAgICBsZXQgdGVhbUluZGV4PWJ0blRlYW0udGVhbV9pbmRleDtcclxuICAgICAgICAgICAgbGV0IHBvcz10aGlzLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIoZS5nZXRMb2NhdGlvbigpKTtcclxuICAgICAgICAgICAgbGV0IGNvbkluZGV4PS0xO1xyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTx0aGlzLmhlcm9fdGVhbV9yZWN0Lmxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmhlcm9fdGVhbV9yZWN0W2ldLmNvbnRhaW5zKHBvcyk9PXRydWUpXHJcbiAgICAgICAgICAgICAgICB7ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBjb25JbmRleD1pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGNvbkluZGV4ICE9IC0xKXtcclxuICAgICAgICAgICAgICAgIGlmKGhlcm9bY29uSW5kZXhdIDwgMSkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVGVhbUxpc3QoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9tb2RlLHRoaXMuZXhjaGFuZ2VJbmRleFxyXG4gICAgICAgICAgICAgICAgKGNvbkluZGV4LGJ0blRlYW0udGVhbV9pbmRleCxoZXJvKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hTZWxlY3RQYXJ0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25TZWxlY3RCdG5DbGljayhlLHR5cGU6bnVtYmVyKXtcclxuICAgICAgICB0aGlzLnN0YXRlID0gTnVtYmVyKHR5cGUpXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHNjcm9sbCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInNjcm9sbFwiICsgaSk7XHJcbiAgICAgICAgICAgIHNjcm9sbC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKGkgPT0gdGhpcy5zdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgc2Nyb2xsLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQgPSBzY3JvbGwuZ2V0Q29tcG9uZW50KGNjLlNjcm9sbFZpZXcpLmNvbnRlbnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwic2VsZWN0VHlwZUJnXCIpLnNldFBvc2l0aW9uKHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInR5cGVcIiArIHRoaXMuc3RhdGUpLnBvc2l0aW9uKVxyXG4gICAgICAgIGlmKHRoaXMuY29udGVudC5jaGlsZHJlbkNvdW50ID09IDApe1xyXG4gICAgICAgICAgICAvLyDliLfmlrDlrqDnianliJfooahcclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoU2Nyb2xsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4Y2hhbmdlSW5kZXgocG9zMTpudW1iZXIscG9zMjpudW1iZXIsdGVhbUxpc3Q6bnVtYmVyW10pOm51bWJlcltde1xyXG4gICAgICAgIGxldCB0ZW1wID0gdGVhbUxpc3RbcG9zMV07XHJcbiAgICAgICAgdGVhbUxpc3RbcG9zMV0gPSB0ZWFtTGlzdFtwb3MyXTtcclxuICAgICAgICB0ZWFtTGlzdFtwb3MyXSA9IHRlbXA7XHJcbiAgICAgICAgcmV0dXJuIHRlYW1MaXN0O1xyXG4gICAgfVxyXG5cclxuICAgIGV4Y2hhbmdlUGV0KGhlcm8xOkhlcm9fVHlwZSxoZXJvMjpIZXJvX1R5cGUpe1xyXG4gICAgICAgIGxldCB0ZW1wID0gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvRGF0YShoZXJvMSkucGV0X2luZm87XHJcbiAgICAgICAgbGV0IHRlbXAyID0gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvRGF0YShoZXJvMikucGV0X2luZm87XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2codGVtcCx0ZW1wMik7XHJcbiAgICAgICAgdGVtcDIuY2hhbmdlQmluZEhlcm8odGVtcCxoZXJvMSk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvRGF0YShoZXJvMSkucGV0X2luZm8sSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvRGF0YShoZXJvMikucGV0X2luZm8pO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ2xpY2tJbmRlbnRhdGlvbkJ0bihlLGluZGV4Om51bWJlcil7XHJcbiAgICAgICAgbGV0IHBvcztcclxuICAgICAgICBpZihpbmRleCA9PSAxKXtcclxuICAgICAgICAgICAgcG9zID0gY2MudjMoMCx0aGlzLm5vZGUueSAtIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIlByZXBhcmVfQmdfMlwiKS5oZWlnaHQgLSAyNSwwKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcG9zID0gY2MudjMoMCx0aGlzLm5vZGUueSArIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIlByZXBhcmVfQmdfMlwiKS5oZWlnaHQgKyAyNSwwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2MudHdlZW4odGhpcy5ub2RlKS50bygwLjIse3Bvc2l0aW9uOnBvc30pLmNhbGwoKCk9PntcclxuICAgICAgICAgICAgaWYoaW5kZXggPT0gMSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJpbmRlbnRhdGlvbjFcIikuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImluZGVudGF0aW9uMlwiKS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiaW5kZW50YXRpb24xXCIpLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImluZGVudGF0aW9uMlwiKS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkuc3RhcnQoKTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19