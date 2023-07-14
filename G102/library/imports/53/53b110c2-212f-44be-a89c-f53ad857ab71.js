"use strict";
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