"use strict";
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