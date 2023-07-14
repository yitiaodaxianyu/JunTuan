"use strict";
cc._RF.push(module, '3a575Ae7KFJTanVEU6DWUaE', 'WaveData');
// Scripts/WaveData.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//每一波的数据
var WaveData = /** @class */ (function () {
    function WaveData() {
        //关卡编号
        this.id = 1;
        //每波的怪物编号ID数组
        this.monster_id = [];
        //每波的怪物数量
        this.monster_num = [];
        //每波的属性倍率
        this.level = [];
        //是否boss的标志
        this.is_boss = [];
        //每波的怪物积分
        this.monster_score = [];
    }
    return WaveData;
}());
exports.default = WaveData;

cc._RF.pop();