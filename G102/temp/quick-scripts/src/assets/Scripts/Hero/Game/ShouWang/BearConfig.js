"use strict";
cc._RF.push(module, 'ba1c5O9EchExqpf9IMpppSY', 'BearConfig');
// Scripts/Hero/Game/ShouWang/BearConfig.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BearAttackDistance = exports.BearAttackSpeed = exports.BearMoveSpeed = exports.BearState = exports.BearAnimaName = void 0;
var BearAnimaName;
(function (BearAnimaName) {
    BearAnimaName["Attack"] = "Attack";
    BearAnimaName["Idle"] = "Idle";
    BearAnimaName["Run"] = "Run";
    BearAnimaName["Start"] = "Start";
    BearAnimaName["Walk"] = "Walk";
})(BearAnimaName = exports.BearAnimaName || (exports.BearAnimaName = {}));
var BearState;
(function (BearState) {
    /**生成 */
    BearState[BearState["born"] = 0] = "born";
    /**待机 */
    BearState[BearState["idle"] = 1] = "idle";
    /**移动 */
    BearState[BearState["move"] = 2] = "move";
    /**攻击 */
    BearState[BearState["attack"] = 3] = "attack";
    /**消失 */
    BearState[BearState["destory"] = 4] = "destory";
})(BearState = exports.BearState || (exports.BearState = {}));
exports.BearMoveSpeed = 150;
exports.BearAttackSpeed = 2;
exports.BearAttackDistance = 40;

cc._RF.pop();