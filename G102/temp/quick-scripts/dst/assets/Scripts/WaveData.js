
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/WaveData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcV2F2ZURhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxRQUFRO0FBQ1I7SUFBQTtRQUNJLE1BQU07UUFDTixPQUFFLEdBQVEsQ0FBQyxDQUFDO1FBQ1osYUFBYTtRQUNiLGVBQVUsR0FBVSxFQUFFLENBQUM7UUFDdkIsU0FBUztRQUNULGdCQUFXLEdBQVUsRUFBRSxDQUFDO1FBQ3hCLFNBQVM7UUFDVCxVQUFLLEdBQVUsRUFBRSxDQUFDO1FBQ2xCLFdBQVc7UUFDWCxZQUFPLEdBQVcsRUFBRSxDQUFDO1FBQ3JCLFNBQVM7UUFDVCxrQkFBYSxHQUFVLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBQUQsZUFBQztBQUFELENBYkEsQUFhQyxJQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy/mr4/kuIDms6LnmoTmlbDmja5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2F2ZURhdGEge1xyXG4gICAgLy/lhbPljaHnvJblj7dcclxuICAgIGlkOm51bWJlcj0xO1xyXG4gICAgLy/mr4/ms6LnmoTmgKrniannvJblj7dJROaVsOe7hFxyXG4gICAgbW9uc3Rlcl9pZDpudW1iZXJbXT1bXTtcclxuICAgIC8v5q+P5rOi55qE5oCq54mp5pWw6YePXHJcbiAgICBtb25zdGVyX251bTpudW1iZXJbXT1bXTtcclxuICAgIC8v5q+P5rOi55qE5bGe5oCn5YCN546HXHJcbiAgICBsZXZlbDpudW1iZXJbXT1bXTtcclxuICAgIC8v5piv5ZCmYm9zc+eahOagh+W/l1xyXG4gICAgaXNfYm9zczpib29sZWFuW109W107XHJcbiAgICAvL+avj+azoueahOaAqueJqeenr+WIhlxyXG4gICAgbW9uc3Rlcl9zY29yZTpudW1iZXJbXT1bXTtcclxufVxyXG5cclxuIl19