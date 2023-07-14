
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/UI/home/BagUi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVUlcXGhvbWVcXEJhZ1VpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLG1EQUE4QztBQUU5QyxpREFBNEM7QUFDNUMsdUVBQWtFO0FBQ2xFLG1FQUE4RDtBQUM5RCw2Q0FBbUQ7QUFDbkQsd0NBQW1DO0FBQ25DLG9EQUE2RDtBQUM3RCxzREFBcUQ7QUFDckQsNkRBQXdEO0FBQ3hELDhDQUF5QztBQUduQyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQyxJQUFLLEtBSUo7QUFKRCxXQUFLLEtBQUs7SUFDTiwrQkFBTyxDQUFBO0lBQ1AsaUNBQUksQ0FBQTtJQUNKLDJDQUFTLENBQUE7QUFDYixDQUFDLEVBSkksS0FBSyxLQUFMLEtBQUssUUFJVDtBQUdEO0lBQW1DLHlCQUFXO0lBQTlDO1FBQUEscUVBNlBDO1FBNVBHLFNBQVM7UUFDRCxtQkFBYSxHQUFjLElBQUksS0FBSyxFQUFFLENBQUM7UUFDL0MsT0FBTztRQUNDLHlCQUFtQixHQUFjLElBQUksS0FBSyxFQUFFLENBQUM7UUFDckQsU0FBUztRQUNELGlCQUFXLEdBQWMsSUFBSSxLQUFLLEVBQUUsQ0FBQztRQUM3QyxTQUFTO1FBQ0QscUJBQWUsR0FBYyxJQUFJLEtBQUssRUFBRSxDQUFDO1FBQ2pELFFBQVE7UUFDQSxzQkFBZ0IsR0FBYyxJQUFJLEtBQUssRUFBRSxDQUFDO1FBRTFDLG9CQUFjLEdBQWUsSUFBSSxDQUFDO1FBRWxDLGVBQVMsR0FBYyxJQUFJLENBQUM7UUFFNUIsbUJBQWEsR0FBVyxJQUFJLENBQUM7UUFFN0IsZUFBUyxHQUFXLElBQUksQ0FBQzs7SUEyT3JDLENBQUM7SUF4T0csb0JBQUksR0FBSixVQUFLLElBQWM7UUFDZixpQkFBTSxJ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Q0FBQztRQUNkLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELDZCQUFhLEdBQWI7UUFFSSxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsMkJBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwRSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVELDJCQUFXLEdBQVg7UUFFSSxpQkFBTSxPQUFPLFdBQUUsQ0FBQztRQUNoQixvQkFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3ZDLG9GQUFvRjtJQUN4RixDQUFDO0lBNVBnQixLQUFLO1FBRHpCLE9BQU87T0FDYSxLQUFLLENBNlB6QjtJQUFELFlBQUM7Q0E3UEQsQUE2UEMsQ0E3UGtDLHFCQUFXLEdBNlA3QztrQkE3UG9CLEtBQUsiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IEFwa01hbmFnZXIgZnJvbSBcIi4uLy4uL0Fkcy9BcGtNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEVxdWlwSW5mbyB9IGZyb20gXCIuLi8uLi9FcXVpcG1lbnQvRXF1aXBDb25maWdcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi8uLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBGb2xsb3dfVHlwZSB9IGZyb20gXCIuLi8uLi9tdWx0aUxhbmd1YWdlL0ZvbGxvd0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgRm9sbG93TWFuYWdlciBmcm9tIFwiLi4vLi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEl0ZW1NYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL1Byb3AvRGF0YS9JdGVtXCI7XHJcbmltcG9ydCBQcm9wIGZyb20gXCIuLi8uLi9Qcm9wL1Byb3BcIjtcclxuaW1wb3J0IHsgUHJvcEFjdGlvbiwgUHJvcERhdGEgfSBmcm9tIFwiLi4vLi4vUHJvcC9Qcm9wQ29uZmlnXCI7XHJcbmltcG9ydCB7IFByb3BNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL1Byb3AvUHJvcE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU291bmRJbmRleCB9IGZyb20gXCIuLi8uLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgVUlDb21wb25lbnQgZnJvbSBcIi4uL1VJQ29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFVpQWN0aW9uIH0gZnJvbSBcIi4uL1VpSW50ZXJmYWNlXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcblxyXG5lbnVtIFN0YXRle1xyXG4gICAgQWxsID0gMSxcclxuICAgIFByb3AsXHJcbiAgICBFcXVpcG1lbnQsICAgICAgIFxyXG59XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYWdVaSBleHRlbmRzIFVJQ29tcG9uZW50IHtcclxuICAgIC8vIOeJueauiueJqeWTgeWIl+ihqFxyXG4gICAgcHJpdmF0ZSBlc3BlY2lhbF9saXN0OlByb3BEYXRhW10gPSBuZXcgQXJyYXkoKTtcclxuICAgIC8vIOWuneeuseWIl+ihqFxyXG4gICAgcHJpdmF0ZSB0cmVhc3VyZV9jaGVzdF9saXN0OlByb3BEYXRhW10gPSBuZXcgQXJyYXkoKTtcclxuICAgIC8vIOi1hOa6kOmBk+WFt+WIl+ihqFxyXG4gICAgcHJpdmF0ZSBhc3NldHNfbGlzdDpQcm9wRGF0YVtdID0gbmV3IEFycmF5KCk7XHJcbiAgICAvLyDnjqnms5XotKfluIHliJfooahcclxuICAgIHByaXZhdGUgcGxheV9tb25leV9saXN0OlByb3BEYXRhW10gPSBuZXcgQXJyYXkoKTtcclxuICAgIC8vIOa2iOiAl+WTgeWIl+ihqFxyXG4gICAgcHJpdmF0ZSBjb25zdW1hYmxlc19saXN0OlByb3BEYXRhW10gPSBuZXcgQXJyYXkoKTtcclxuXHJcbiAgICBwcml2YXRlIGVxdWlwbWVudF9saXN0OkVxdWlwSW5mb1tdID0gbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIHByb3BfbGlzdDpQcm9wRGF0YVtdID0gbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIHNjb2xsX2NvbnRlbnQ6Y2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBudWxsX2l0ZW06Y2MuTm9kZSA9IG51bGw7XHJcblxyXG5cclxuICAgIGluaXQodWlBYzogVWlBY3Rpb24pIHtcclxuICAgICAgICBzdXBlci5pbml0KHVpQWMpO1xyXG4gICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7miZPlvIDog4zljIXmrKHmlbApO1xyXG4gICAgICAgIHRoaXMuaW5pdFNlbGVjdEJ1dHRvbihTdGF0ZS5BbGwsdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5pbml0U2Nyb2xsKFN0YXRlLkFsbCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdFNlbGVjdEJ1dHRvbih0eXBlOlN0YXRlLGlzSW5pdDpib29sZWFuKXtcclxuICAgICAgICBmb3IobGV0IGkgPSAxO2kgPCA0O2krKyl7XHJcbiAgICAgICAgICAgIGxldCBidG4gPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJidXR0b25CZ1wiK2kpO1xyXG4gICAgICAgICAgICBsZXQgc2VsZWN0QnRuID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwic2VsZWN0ZWRCdXR0b25CZ1wiICsgaSk7XHJcbiAgICAgICAgICAgIGxldCBidG5MYWJlbCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJ0bkxhYmVsXCIgKyBpKVxyXG4gICAgICAgICAgICBsZXQgc2VsZWN0QnRuTGFiZWwgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzZWxlY3RCdG5MYWJlbFwiICsgaSk7XHJcblxyXG4gICAgICAgICAgICBpZihpID09IHR5cGUpe1xyXG4gICAgICAgICAgICAgICAgYnRuLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgYnRuTGFiZWwuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RCdG4uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHNlbGVjdEJ0bkxhYmVsLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgYnRuLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBidG5MYWJlbC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0QnRuLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0QnRuTGFiZWwuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoaXNJbml0KXtcclxuICAgICAgICAgICAgICAgIGJ0bi5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsKCkgPT57XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0U2VsZWN0QnV0dG9uKGksZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NvbGxfY29udGVudC5yZW1vdmVBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdFNjcm9sbChpKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdFNjcm9sbCh0eXBlOlN0YXRlKXtcclxuICAgICAgICB0aGlzLmVzcGVjaWFsX2xpc3QgPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICB0aGlzLnRyZWFzdXJlX2NoZXN0X2xpc3QgPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICB0aGlzLmFzc2V0c19saXN0ID0gbmV3IEFycmF5KCk7XHJcbiAgICAgICAgdGhpcy5wbGF5X21vbmV5X2xpc3QgPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICB0aGlzLmNvbnN1bWFibGVzX2xpc3QgPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICB0aGlzLnByb3BfbGlzdCA9IG5ldyBBcnJheSgpO1xyXG5cclxuICAgICAgICBsZXQgbnVtTGFiZWw6Y2MuTm9kZTtcclxuICAgICAgICB0aGlzLnNjb2xsX2NvbnRlbnQgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzY3JvbGxcIikuZ2V0Q29tcG9uZW50KGNjLlNjcm9sbFZpZXcpLmNvbnRlbnRcclxuICAgICAgICB0aGlzLm51bGxfaXRlbSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIm51bGxJdGVtXCIpXHJcbiAgICAgICAgbnVtTGFiZWwgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJjYXBhY2l0eU51bVwiKVxyXG4gICAgICAgIHRoaXMuZXF1aXBtZW50X2xpc3QgPSBuZXcgQXJyYXkoKTtcclxuXHJcbiAgICAgICAgaWYgKHR5cGUgIT0gU3RhdGUuUHJvcCkge1xyXG4gICAgICAgICAgICBsZXQgZXF1aXBtZW50TGlzdDEgPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEVxdWlwbWVudExpc3QoMSk7XHJcbiAgICAgICAgICAgIGxldCBlcXVpcG1lbnRMaXN0MiA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RXF1aXBtZW50TGlzdCgyKTtcclxuICAgICAgICAgICAgbGV0IGVxdWlwbWVudExpc3QzID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRFcXVpcG1lbnRMaXN0KDMpO1xyXG4gICAgICAgICAgICB0aGlzLmVxdWlwbWVudF9saXN0ID0gdGhpcy5lcXVpcG1lbnRfbGlzdC5jb25jYXQoZXF1aXBtZW50TGlzdDEsIGVxdWlwbWVudExpc3QyLCBlcXVpcG1lbnRMaXN0Myk7XHJcbiAgICAgICAgICAgIC8vRXF1aXBtZW50TWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvcnRFcXVpcG1lbnRMaXN0KHRoaXMuZXF1aXBtZW50X2xpc3QpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHR5cGUgIT0gU3RhdGUuRXF1aXBtZW50KSB7XHJcbiAgICAgICAgICAgIGxldCBwcm9wTGlzdCA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U29ydFByb3BMaXN0KCk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvcExpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCB0eXBlID0gSXRlbU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRUeXBlKHByb3BMaXN0W2ldLnByb3BfaWQpXHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOa2iOiAl+WTgVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnN1bWFibGVzX2xpc3QucHVzaChwcm9wTGlzdFtpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g6LWE5rqQ6YGT5YW3XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXNzZXRzX2xpc3QucHVzaChwcm9wTGlzdFtpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g546p5rOV6LSn5biBXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxheV9tb25leV9saXN0LnB1c2gocHJvcExpc3RbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDg6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOWuneeusVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyZWFzdXJlX2NoZXN0X2xpc3QucHVzaChwcm9wTGlzdFtpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgOTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g54m55q6K54mp5ZOBXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXNwZWNpYWxfbGlzdC5wdXNoKHByb3BMaXN0W2ldKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5wcm9wX2xpc3QgPSB0aGlzLnByb3BfbGlzdC5jb25jYXQodGhpcy5lc3BlY2lhbF9saXN0LCB0aGlzLnRyZWFzdXJlX2NoZXN0X2xpc3QsIHRoaXMuYXNzZXRzX2xpc3QsIHRoaXMucGxheV9tb25leV9saXN0LCB0aGlzLmNvbnN1bWFibGVzX2xpc3QpO1xyXG4gICAgICAgICAgICBpZihudW1MYWJlbC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9PSBcIlwiKXtcclxuICAgICAgICAgICAgICAgIG51bUxhYmVsLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJcIiArICh0aGlzLnByb3BfbGlzdC5sZW5ndGggKyB0aGlzLmVxdWlwbWVudF9saXN0Lmxlbmd0aCkgKyBcIi8yMDBcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyB0aGlzLmZyYW1pbmdMb2FkKDIwMCk7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gMDtcclxuICAgICAgICB0aGlzLnVuc2NoZWR1bGVBbGxDYWxsYmFja3MoKTtcclxuICAgICAgICB0aGlzLnNjb2xsX2NvbnRlbnQucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlKCgpPT57XHJcbiAgICAgICAgICAgIGlmKGluZGV4PCh0aGlzLnByb3BfbGlzdC5sZW5ndGgrdGhpcy5lcXVpcG1lbnRfbGlzdC5sZW5ndGgpKXtcclxuICAgICAgICAgICAgICAgIC8vIOaYvuekuumBk+WFt1xyXG4gICAgICAgICAgICAgICAgaWYoaW5kZXg8dGhpcy5wcm9wX2xpc3QubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgICAgICAvLyDkvJjlhYjmmL7npLrpgZPlhbdcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbTtcclxuICAgICAgICAgICAgICAgICAgICBpZihJdGVtTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFR5cGUodGhpcy5wcm9wX2xpc3RbaW5kZXhdLnByb3BfaWQpID09IDUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbSh0aGlzLnByb3BfbGlzdFtpbmRleF0ucHJvcF9pZCx0aGlzLnByb3BfbGlzdFtpbmRleF0ucHJvcF9udW0sUHJvcEFjdGlvbi5Vc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmdldENvbXBvbmVudChQcm9wKS5hZGRVc2VMaXN0ZW4oKCkgPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBudW1MYWJlbC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXRTY3JvbGwodHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMucHJvcF9saXN0W2luZGV4XS5wcm9wX2lkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbSh0aGlzLnByb3BfbGlzdFtpbmRleF0ucHJvcF9pZCx0aGlzLnByb3BfbGlzdFtpbmRleF0ucHJvcF9udW0sUHJvcEFjdGlvbi5Mb29rKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDb21wb25lbnQoUHJvcCkuYWRkVXNlTGlzdGVuKCgpID0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVtTGFiZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0U2Nyb2xsKHR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpdGVtLnNldFBhcmVudCh0aGlzLnNjb2xsX2NvbnRlbnQpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5YaN5pi+56S66KOF5aSHXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbGV0IGVxdWlwbWVudCA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0odGhpcy5lcXVpcG1lbnRfbGlzdFtpLXRoaXMucHJvcF9saXN0Lmxlbmd0aF0uZXF1aXBfaWQsMSxQcm9wQWN0aW9uLkxvb2spO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGxldCBlcXVpcG1lbnQgPSBFcXVpcG1lbnRNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RXF1aXBOb2RlQnlJZCh0aGlzLmVxdWlwbWVudF9saXN0W2luZGV4LXRoaXMucHJvcF9saXN0Lmxlbmd0aF0uZXF1aXBfaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGVxdWlwbWVudC5nZXRDb21wb25lbnQoRXF1aXBJdGVtKS5hZGRVc2VMaXN0ZW4oKCkgPT57XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIHRoaXMuaW5pdFNjcm9sbCh0eXBlKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGVxdWlwbWVudC5zZXRQYXJlbnQodGhpcy5zY29sbF9jb250ZW50KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAvLyDmmL7npLrnmb3mnb9cclxuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gY2MuaW5zdGFudGlhdGUodGhpcy5udWxsX2l0ZW0pO1xyXG4gICAgICAgICAgICAgICAgaXRlbS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgaXRlbS5zZXRQYXJlbnQodGhpcy5zY29sbF9jb250ZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpbmRleCsrO1xyXG4gICAgICAgIH0sMC4wMSwyMDAsMCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDvvIjmlrDlop7ku6PnoIHvvInojrflj5bnlJ/miJDlrZDoioLngrnnmoRHZW5lcmF0b3JcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSAqZ2V0SXRlbUdlbmVyYXRvcihsZW5ndGg6IG51bWJlcikge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgLy8g5Yid5aeL5YyW6YGT5YW3XHJcbiAgICAgICAgICAgIHlpZWxkIHRoaXMuaW5pdEl0ZW0oaSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdEl0ZW0oaTpudW1iZXIpIHtcclxuICAgICAgICBpZihpPCh0aGlzLnByb3BfbGlzdC5sZW5ndGgrdGhpcy5lcXVpcG1lbnRfbGlzdC5sZW5ndGgpKXtcclxuICAgICAgICAgICAgLy8g5pi+56S66YGT5YW3XHJcbiAgICAgICAgICAgIGlmKGk8dGhpcy5wcm9wX2xpc3QubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgIC8vIOS8mOWFiOaYvuekuumBk+WFt1xyXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW07XHJcbiAgICAgICAgICAgICAgICBpZihJdGVtTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFR5cGUodGhpcy5wcm9wX2xpc3RbaV0ucHJvcF9pZCkgPT0gNSl7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0odGhpcy5wcm9wX2xpc3RbaV0ucHJvcF9pZCx0aGlzLnByb3BfbGlzdFtpXS5wcm9wX251bSxQcm9wQWN0aW9uLlVzZSk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbSh0aGlzLnByb3BfbGlzdFtpXS5wcm9wX2lkLHRoaXMucHJvcF9saXN0W2ldLnByb3BfbnVtLFByb3BBY3Rpb24uTG9vayk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpdGVtLnNldFBhcmVudCh0aGlzLnNjb2xsX2NvbnRlbnQpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIC8vIOWGjeaYvuekuuijheWkh1xyXG4gICAgICAgICAgICAgICAgLy8gbGV0IGVxdWlwbWVudCA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0odGhpcy5lcXVpcG1lbnRfbGlzdFtpLXRoaXMucHJvcF9saXN0Lmxlbmd0aF0uZXF1aXBfaWQsMSxQcm9wQWN0aW9uLkxvb2spO1xyXG4gICAgICAgICAgICAgICAgLy8gbGV0IGVxdWlwbWVudCA9IEVxdWlwbWVudE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRFcXVpcE5vZGVCeUlkKHRoaXMuZXF1aXBtZW50X2xpc3RbaS10aGlzLnByb3BfbGlzdC5sZW5ndGhdLmVxdWlwX2lkKTtcclxuICAgICAgICAgICAgICAgIC8vIGVxdWlwbWVudC5zZXRQYXJlbnQodGhpcy5zY29sbF9jb250ZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAvLyDmmL7npLrnmb3mnb9cclxuICAgICAgICAgICAgbGV0IGl0ZW0gPSBjYy5pbnN0YW50aWF0ZSh0aGlzLm51bGxfaXRlbSk7XHJcbiAgICAgICAgICAgIGl0ZW0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgaXRlbS5zZXRQYXJlbnQodGhpcy5zY29sbF9jb250ZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlrp7njrDliIbluKfliqDovb1cclxuICAgICAqL1xyXG4gICAgYXN5bmMgZnJhbWluZ0xvYWQobGVuZ3RoOiBudW1iZXIpIHtcclxuICAgICAgICBhd2FpdCB0aGlzLmV4ZWN1dGVQcmVGcmFtZSh0aGlzLmdldEl0ZW1HZW5lcmF0b3IobGVuZ3RoKSwgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliIbluKfmiafooYwgR2VuZXJhdG9yIOmAu+i+kVxyXG4gICAgICogQHBhcmFtIGdlbmVyYXRvciDnlJ/miJDlmahcclxuICAgICAqIEBwYXJhbSBkdXJhdGlvbiDmjIHnu63ml7bpl7TvvIhtc++8iVxyXG4gICAgICog5q+P5qyh5omn6KGMIEdlbmVyYXRvciDnmoTmk43kvZzml7bvvIzmnIDplb/lj6/mjIHnu63miafooYzml7bplb/jgIJcclxuICAgICAqIOWBh+iuvuWAvOS4ujhtc++8jOmCo+S5iOihqOekujHluKfvvIjmgLvlhbExNm1z77yJ5LiL77yM5YiG5Ye6OG1z5pe26Ze057uZ5q2k6YC76L6R5omn6KGMXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZXhlY3V0ZVByZUZyYW1lKGdlbmVyYXRvcjogR2VuZXJhdG9yLCBkdXJhdGlvbjogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgbGV0IGdlbiA9IGdlbmVyYXRvcjtcclxuICAgICAgICAgICAgLy8g5Yib5bu65omn6KGM5Ye95pWwXHJcbiAgICAgICAgICAgIGxldCBleGVjdXRlID0gKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIOaJp+ihjOS5i+WJje+8jOWFiOiusOW9leW8gOWni+aXtumXtOaIs1xyXG4gICAgICAgICAgICAgICAgbGV0IHN0YXJ0VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIOeEtuWQjuS4gOebtOS7jiBHZW5lcmF0b3Ig5Lit6I635Y+W5bey57uP5ouG5YiG5aW955qE5Luj56CB5q615Ye65p2l5omn6KGMXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpdGVyID0gZ2VuLm5leHQoKTsgOyBpdGVyID0gZ2VuLm5leHQoKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyDliKTmlq3mmK/lkKblt7Lnu4/miafooYzlrozmiYDmnIkgR2VuZXJhdG9yIOeahOWwj+S7o+eggeautVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIOWmguaenOaYr+eahOivne+8jOmCo+S5iOWwseihqOekuuS7u+WKoeWujOaIkFxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVyID09IG51bGwgfHwgaXRlci5kb25lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5q+P5omn6KGM5a6M5LiA5q615bCP5Luj56CB5q6177yM6YO95qOA5p+l5LiA5LiL5piv5ZCmXHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5bey57uP6LaF6L+H5oiR5Lus5YiG6YWN57uZ5pys5bin77yM6L+Z5Lqb5bCP5Luj56CB56uv55qE5pyA5aSn5Y+v5omn6KGM5pe26Ze0XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gc3RhcnRUaW1lID4gZHVyYXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOWmguaenOi2hei/h+S6hu+8jOmCo+S5iOacrOW4p+WwseS4jeWcqOaJp+ihjO+8jOW8gOWumuaXtuWZqO+8jOiuqeS4i+S4gOW4p+WGjeaJp+ihjFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBleGVjdXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgLy8g6L+Q6KGM5omn6KGM5Ye95pWwXHJcbiAgICAgICAgICAgIGV4ZWN1dGUoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjbGlja0J0bkNsb3NlKClcclxuICAgIHtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIHRoaXMuZGVzdHJveVNlbGYoKTtcclxuICAgIH1cclxuXHJcbiAgICBkZXN0cm95U2VsZigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIub25DbG9zZSgpO1xyXG4gICAgICAgIEFwa01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jbG9zZUJhbm5lcigpO1xyXG4gICAgICAgIC8vIEV2ZW50TWFuYWdlci5wb3N0UmVkRXZlbnQoUmVkRXZlbnRTdHJpbmcuUkVEX0NIRUNLLFJlZEV2ZW50VHlwZS5CdG5fTWFpbl9TaWduSW4pO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==