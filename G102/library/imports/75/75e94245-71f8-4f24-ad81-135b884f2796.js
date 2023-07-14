"use strict";
cc._RF.push(module, '75e94JFcfhPJK2BE1uITyeW', 'BagUi');
// Scripts/UI/home/BagUi.ts

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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var ApkManager_1 = require("../../Ads/ApkManager");
var GameManager_1 = require("../../GameManager");
var FollowConstants_1 = require("../../multiLanguage/FollowConstants");
var FollowManager_1 = require("../../multiLanguage/FollowManager");
var Item_1 = require("../../Prop/Data/Item");
var Prop_1 = require("../../Prop/Prop");
var PropConfig_1 = require("../../Prop/PropConfig");
var PropManager_1 = require("../../Prop/PropManager");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var UIComponent_1 = require("../UIComponent");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var State;
(function (State) {
    State[State["All"] = 1] = "All";
    State[State["Prop"] = 2] = "Prop";
    State[State["Equipment"] = 3] = "Equipment";
})(State || (State = {}));
var BagUi = /** @class */ (function (_super) {
    __extends(BagUi, _super);
    function BagUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 特殊物品列表
        _this.especial_list = new Array();
        // 宝箱列表
        _this.treasure_chest_list = new Array();
        // 资源道具列表
        _this.assets_list = new Array();
        // 玩法货币列表
        _this.play_money_list = new Array();
        // 消耗品列表
        _this.consumables_list = new Array();
        _this.equipment_list = null;
        _this.prop_list = null;
        _this.scoll_content = null;
        _this.null_item = null;
        return _this;
    }
    BagUi.prototype.init = function (uiAc) {
        _super.prototype.init.call(this, uiAc);
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.打开背包次数);
        this.initSelectButton(State.All, true);
        this.initScroll(State.All);
    };
    BagUi.prototype.initSelectButton = function (type, isInit) {
        var _this = this;
        var _loop_1 = function (i) {
            var btn = this_1.node.getChildByName("buttonBg" + i);
            var selectBtn = this_1.node.getChildByName("selectedButtonBg" + i);
            var btnLabel = this_1.node.getChildByName("btnLabel" + i);
            var selectBtnLabel = this_1.node.getChildByName("selectBtnLabel" + i);
            if (i == type) {
                btn.active = false;
                btnLabel.active = false;
                selectBtn.active = true;
                selectBtnLabel.active = true;
            }
            else {
                btn.active = true;
                btnLabel.active = true;
                selectBtn.active = false;
                selectBtnLabel.active = false;
            }
            if (isInit) {
                btn.on(cc.Node.EventType.TOUCH_END, function () {
                    _this.initSelectButton(i, false);
                    _this.scoll_content.removeAllChildren();
                    _this.initScroll(i);
                });
            }
        };
        var this_1 = this;
        for (var i = 1; i < 4; i++) {
            _loop_1(i);
        }
    };
    BagUi.prototype.initScroll = function (type) {
        var _this = this;
        this.especial_list = new Array();
        this.treasure_chest_list = new Array();
        this.assets_list = new Array();
        this.play_money_list = new Array();
        this.consumables_list = new Array();
        this.prop_list = new Array();
        var numLabel;
        this.scoll_content = this.node.getChildByName("scroll").getComponent(cc.ScrollView).content;
        this.null_item = this.node.getChildByName("nullItem");
        numLabel = this.node.getChildByName("capacityNum");
        this.equipment_list = new Array();
        if (type != State.Prop) {
            var equipmentList1 = PropManager_1.PropManager.getInstance().getEquipmentList(1);
            var equipmentList2 = PropManager_1.PropManager.getInstance().getEquipmentList(2);
            var equipmentList3 = PropManager_1.PropManager.getInstance().getEquipmentList(3);
            this.equipment_list = this.equipment_list.concat(equipmentList1, equipmentList2, equipmentList3);
            //EquipmentManager.getInstance().sortEquipmentList(this.equipment_list);
        }
        if (type != State.Equipment) {
            var propList = PropManager_1.PropManager.getInstance().getSortPropList();
            for (var i = 0; i < propList.length; i++) {
                var type_1 = Item_1.ItemManager.getInstance().getType(propList[i].prop_id);
                switch (type_1) {
                    case 4:
                        // 消耗品
                        this.consumables_list.push(propList[i]);
                        break;
                    case 5:
                        // 资源道具
                        this.assets_list.push(propList[i]);
                        break;
                    case 6:
                        // 玩法货币
                        this.play_money_list.push(propList[i]);
                        break;
                    case 8:
                        // 宝箱
                        this.treasure_chest_list.push(propList[i]);
                        break;
                    case 9:
                        // 特殊物品
                        this.especial_list.push(propList[i]);
                        break;
                }
            }
            this.prop_list = this.prop_list.concat(this.especial_list, this.treasure_chest_list, this.assets_list, this.play_money_list, this.consumables_list);
            if (numLabel.getComponent(cc.Label).string == "") {
                numLabel.getComponent(cc.Label).string = "" + (this.prop_list.length + this.equipment_list.length) + "/200";
            }
        }
        // this.framingLoad(200);
        var index = 0;
        this.unscheduleAllCallbacks();
        this.scoll_content.removeAllChildren();
        this.schedule(function () {
            if (index < (_this.prop_list.length + _this.equipment_list.length)) {
                // 显示道具
                if (index < _this.prop_list.length) {
                    // 优先显示道具
                    var item = void 0;
                    if (Item_1.ItemManager.getInstance().getType(_this.prop_list[index].prop_id) == 5) {
                        item = PropManager_1.PropManager.getInstance().createPropItem(_this.prop_list[index].prop_id, _this.prop_list[index].prop_num, PropConfig_1.PropAction.Use);
                        item.getComponent(Prop_1.default).addUseListen(function () {
                            numLabel.getComponent(cc.Label).string = "";
                            _this.initScroll(type);
                        });
                    }
                    else {
                        // console.log(this.prop_list[index].prop_id)
                        item = PropManager_1.PropManager.getInstance().createPropItem(_this.prop_list[index].prop_id, _this.prop_list[index].prop_num, PropConfig_1.PropAction.Look);
                        item.getComponent(Prop_1.default).addUseListen(function () {
                            numLabel.getComponent(cc.Label).string = "";
                            _this.initScroll(type);
                        });
                    }
                    item.setParent(_this.scoll_content);
                }
                else {
                    // 再显示装备
                    // let equipment = PropManager.getInstance().createPropItem(this.equipment_list[i-this.prop_list.length].equip_id,1,PropAction.Look);
                    // let equipment = EquipmentManager.getInstance().getEquipNodeById(this.equipment_list[index-this.prop_list.length].equip_id);
                    // equipment.getComponent(EquipItem).addUseListen(() =>{
                    //     this.initScroll(type);
                    // })
                    // equipment.setParent(this.scoll_content);
                }
            }
            else {
                // 显示白板
                var item = cc.instantiate(_this.null_item);
                item.active = true;
                item.setParent(_this.scoll_content);
            }
            index++;
        }, 0.01, 200, 0);
    };
    /**
     * （新增代码）获取生成子节点的Generator
     */
    BagUi.prototype.getItemGenerator = function (length) {
        var i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < length)) return [3 /*break*/, 4];
                    // 初始化道具
                    return [4 /*yield*/, this.initItem(i)];
                case 2:
                    // 初始化道具
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    };
    BagUi.prototype.initItem = function (i) {
        if (i < (this.prop_list.length + this.equipment_list.length)) {
            // 显示道具
            if (i < this.prop_list.length) {
                // 优先显示道具
                var item = void 0;
                if (Item_1.ItemManager.getInstance().getType(this.prop_list[i].prop_id) == 5) {
                    item = PropManager_1.PropManager.getInstance().createPropItem(this.prop_list[i].prop_id, this.prop_list[i].prop_num, PropConfig_1.PropAction.Use);
                }
                else {
                    item = PropManager_1.PropManager.getInstance().createPropItem(this.prop_list[i].prop_id, this.prop_list[i].prop_num, PropConfig_1.PropAction.Look);
                }
                item.setParent(this.scoll_content);
            }
            else {
                // 再显示装备
                // let equipment = PropManager.getInstance().createPropItem(this.equipment_list[i-this.prop_list.length].equip_id,1,PropAction.Look);
                // let equipment = EquipmentManager.getInstance().getEquipNodeById(this.equipment_list[i-this.prop_list.length].equip_id);
                // equipment.setParent(this.scoll_content);
            }
        }
        else {
            // 显示白板
            var item = cc.instantiate(this.null_item);
            item.active = true;
            item.setParent(this.scoll_content);
        }
    };
    /**
     * 实现分帧加载
     */
    BagUi.prototype.framingLoad = function (length) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.executePreFrame(this.getItemGenerator(length), 1)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 分帧执行 Generator 逻辑
     * @param generator 生成器
     * @param duration 持续时间（ms）
     * 每次执行 Generator 的操作时，最长可持续执行时长。
     * 假设值为8ms，那么表示1帧（总共16ms）下，分出8ms时间给此逻辑执行
     */
    BagUi.prototype.executePreFrame = function (generator, duration) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var gen = generator;
            // 创建执行函数
            var execute = function () {
                // 执行之前，先记录开始时间戳
                var startTime = new Date().getTime();
                // 然后一直从 Generator 中获取已经拆分好的代码段出来执行
                for (var iter = gen.next();; iter = gen.next()) {
                    // 判断是否已经执行完所有 Generator 的小代码段
                    // 如果是的话，那么就表示任务完成
                    if (iter == null || iter.done) {
                        resolve();
                        return;
                    }
                    // 每执行完一段小代码段，都检查一下是否
                    // 已经超过我们分配给本帧，这些小代码端的最大可执行时间
                    if (new Date().getTime() - startTime > duration) {
                        // 如果超过了，那么本帧就不在执行，开定时器，让下一帧再执行
                        _this.scheduleOnce(function () {
                            execute();
                        });
                        return;
                    }
                }
            };
            // 运行执行函数
            execute();
        });
    };
    BagUi.prototype.clickBtnClose = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.destroySelf();
    };
    BagUi.prototype.destroySelf = function () {
        _super.prototype.onClose.call(this);
        ApkManager_1.default.getInstance().closeBanner();
        // EventManager.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Main_SignIn);
    };
    BagUi = __decorate([
        ccclass
    ], BagUi);
    return BagUi;
}(UIComponent_1.default));
exports.default = BagUi;

cc._RF.pop();