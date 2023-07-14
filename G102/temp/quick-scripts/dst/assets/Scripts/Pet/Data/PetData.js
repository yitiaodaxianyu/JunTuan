
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Pet/Data/PetData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '7d230+F9ghLyrRcRz4rECWe', 'PetData');
// Scripts/Pet/Data/PetData.ts

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetData = void 0;
var HeroConfig_1 = require("../../Hero/Game/HeroConfig");
/**游戏外英雄数据，游戏内数据通过附加计算 */
var PetData = /** @class */ (function (_super) {
    __extends(PetData, _super);
    function PetData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PetData.prototype.getSkillColdDown = function (type) {
        return this.ColdDown.get(type);
    };
    PetData.prototype.getSkillValue1 = function (type) {
        return this.SkillValue_x.get(type);
    };
    PetData.prototype.getSkillValue2 = function (type) {
        return this.SkillValue_y.get(type);
    };
    PetData.prototype.getSkillValue3 = function (type) {
        return this.SkillValue_z.get(type);
    };
    return PetData;
}(HeroConfig_1.AttributeData));
exports.PetData = PetData;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcUGV0XFxEYXRhXFxQZXREYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSx5REFBMkQ7QUFJM0QseUJBQXlCO0FBQ3pCO0lBQTZCLDJCQUFhO0lBQTFDOztJQW9CQSxDQUFDO0lBakJHLGtDQUFnQixHQUFoQixVQUFpQixJQUFpQjtRQUM5QixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRCxnQ0FBYyxHQUFkLFVBQWUsSUFBaUI7UUFDNUIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsZ0NBQWMsR0FBZCxVQUFlLElBQWlCO1FBQzVCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELGdDQUFjLEdBQWQsVUFBZSxJQUFpQjtRQUM1QixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFHTCxjQUFDO0FBQUQsQ0FwQkEsQUFvQkMsQ0FwQjRCLDBCQUFhLEdBb0J6QztBQXBCWSwwQkFBTyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5cclxuaW1wb3J0IHsgQXR0cmlidXRlRGF0YSB9IGZyb20gXCIuLi8uLi9IZXJvL0dhbWUvSGVyb0NvbmZpZ1wiO1xyXG5pbXBvcnQgeyBQZXRTa2lsbFR5cGUgfSBmcm9tIFwiLi4vLi4vUGV0L1BldENvbmZpZ1wiO1xyXG5cclxuXHJcbi8qKua4uOaIj+WkluiLsembhOaVsOaNru+8jOa4uOaIj+WGheaVsOaNrumAmui/h+mZhOWKoOiuoeeulyAqL1xyXG5leHBvcnQgY2xhc3MgUGV0RGF0YSBleHRlbmRzIEF0dHJpYnV0ZURhdGF7XHJcblxyXG4gICBcclxuICAgIGdldFNraWxsQ29sZERvd24odHlwZTpQZXRTa2lsbFR5cGUpOm51bWJlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5Db2xkRG93bi5nZXQodHlwZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U2tpbGxWYWx1ZTEodHlwZTpQZXRTa2lsbFR5cGUpOm51bWJlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5Ta2lsbFZhbHVlX3guZ2V0KHR5cGUpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFNraWxsVmFsdWUyKHR5cGU6UGV0U2tpbGxUeXBlKTpudW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuU2tpbGxWYWx1ZV95LmdldCh0eXBlKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRTa2lsbFZhbHVlMyh0eXBlOlBldFNraWxsVHlwZSk6bnVtYmVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLlNraWxsVmFsdWVfei5nZXQodHlwZSk7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbn1cclxuIl19