
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/ZhenXingData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a71c8loMUFCVIblgVedL3tE', 'ZhenXingData');
// Scripts/ZhenXingData.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnemyData = exports.ZhenXingData = void 0;
var EnemyConfig_1 = require("./Enemy/EnemyConfig");
var ZhenXingData = /** @class */ (function () {
    function ZhenXingData() {
        this.boss_pos = cc.v2(0, 0);
        this.buff_pos = [];
        this.other_pos = [];
    }
    return ZhenXingData;
}());
exports.ZhenXingData = ZhenXingData;
var EnemyData = /** @class */ (function () {
    function EnemyData() {
        this.enemy_id = EnemyConfig_1.Enemy_Type.mengshe;
        this.is_boss = false;
        this.is_buff = false;
    }
    return EnemyData;
}());
exports.EnemyData = EnemyData;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcWmhlblhpbmdEYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFpRDtBQUdqRDtJQUFBO1FBRUksYUFBUSxHQUFTLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzVCLGFBQVEsR0FBVyxFQUFFLENBQUM7UUFDdEIsY0FBUyxHQUFXLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBQUQsbUJBQUM7QUFBRCxDQUxBLEFBS0MsSUFBQTtBQUxZLG9DQUFZO0FBT3pCO0lBQUE7UUFFSSxhQUFRLEdBQVksd0JBQVUsQ0FBQyxPQUFPLENBQUM7UUFDdkMsWUFBTyxHQUFTLEtBQUssQ0FBQztRQUN0QixZQUFPLEdBQVMsS0FBSyxDQUFDO0lBQzFCLENBQUM7SUFBRCxnQkFBQztBQUFELENBTEEsQUFLQyxJQUFBO0FBTFksOEJBQVMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbmVteV9UeXBlIH0gZnJvbSBcIi4vRW5lbXkvRW5lbXlDb25maWdcIjtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgWmhlblhpbmdEYXRhIHtcclxuXHJcbiAgICBib3NzX3BvczpjYy5WZWMyPWNjLnYyKDAsMCk7XHJcbiAgICBidWZmX3BvczpjYy5WZWMyW109W107XHJcbiAgICBvdGhlcl9wb3M6Y2MuVmVjMltdPVtdOyAgICBcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEVuZW15RGF0YSB7XHJcblxyXG4gICAgZW5lbXlfaWQ6RW5lbXlfVHlwZT1FbmVteV9UeXBlLm1lbmdzaGU7XHJcbiAgICBpc19ib3NzOmJvb2xlYW49ZmFsc2U7XHJcbiAgICBpc19idWZmOmJvb2xlYW49ZmFsc2U7ICAgXHJcbn1cclxuXHJcbiJdfQ==