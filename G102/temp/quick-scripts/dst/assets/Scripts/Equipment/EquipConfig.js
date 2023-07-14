
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Equipment/EquipConfig.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcRXF1aXBtZW50XFxFcXVpcENvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxJQUFZLFNBTVg7QUFORCxXQUFZLFNBQVM7SUFDakIseUNBQU0sQ0FBQTtJQUNOLDJDQUFPLENBQUE7SUFDUCw2Q0FBUSxDQUFBO0lBQ1IseUNBQU0sQ0FBQTtJQUNOLHVDQUFHLENBQUE7QUFDUCxDQUFDLEVBTlcsU0FBUyxHQUFULGlCQUFTLEtBQVQsaUJBQVMsUUFNcEI7QUFFRDtJQUFBO1FBQ0ksWUFBTyxHQUFRLENBQUMsQ0FBQztRQUNqQixhQUFRLEdBQVEsQ0FBQyxDQUFDO0lBQ3RCLENBQUM7SUFBRCxlQUFDO0FBQUQsQ0FIQSxBQUdDLElBQUE7QUFIWSw0QkFBUTtBQUtyQjtJQUFBO1FBQ0ksYUFBUSxHQUFRLENBQUMsQ0FBQztRQUNsQixjQUFTLEdBQVEsQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7SUFBRCxnQkFBQztBQUFELENBSEEsQUFHQyxJQUFBO0FBSFksOEJBQVMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuZXhwb3J0IGVudW0gRXF1aXBUeXBle1xyXG4gICAgV3VRaT0xLFxyXG4gICAgSHVKaWE9MixcclxuICAgIFNoaVBpbj0zLFxyXG4gICAgRm9vdD00LFxyXG4gICAgTnVtLFxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ29zdERhdGF7XHJcbiAgICBjb3N0X2lkOm51bWJlcj0wO1xyXG4gICAgY29zdF9udW06bnVtYmVyPTA7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBFcXVpcEluZm97XHJcbiAgICBlcXVpcF9pZDpudW1iZXI9MDtcclxuICAgIGVxdWlwX251bTpudW1iZXI9MTtcclxufVxyXG5cclxuIl19