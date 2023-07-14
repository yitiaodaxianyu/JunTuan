"use strict";
cc._RF.push(module, '1a77cJSAx5Mw7LFuJUoRYHl', 'EquipConfig');
// Scripts/Equipment/EquipConfig.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EquipInfo = exports.CostData = exports.EquipType = void 0;
var EquipType;
(function (EquipType) {
    EquipType[EquipType["WuQi"] = 1] = "WuQi";
    EquipType[EquipType["HuJia"] = 2] = "HuJia";
    EquipType[EquipType["ShiPin"] = 3] = "ShiPin";
    EquipType[EquipType["Foot"] = 4] = "Foot";
    EquipType[EquipType["Num"] = 5] = "Num";
})(EquipType = exports.EquipType || (exports.EquipType = {}));
var CostData = /** @class */ (function () {
    function CostData() {
        this.cost_id = 0;
        this.cost_num = 0;
    }
    return CostData;
}());
exports.CostData = CostData;
var EquipInfo = /** @class */ (function () {
    function EquipInfo() {
        this.equip_id = 0;
        this.equip_num = 1;
    }
    return EquipInfo;
}());
exports.EquipInfo = EquipInfo;

cc._RF.pop();