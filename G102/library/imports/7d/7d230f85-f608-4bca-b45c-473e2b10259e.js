"use strict";
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