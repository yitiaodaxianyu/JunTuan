
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Hero/Game/ShouWang/BearConfig.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcR2FtZVxcU2hvdVdhbmdcXEJlYXJDb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0EsSUFBWSxhQU9YO0FBUEQsV0FBWSxhQUFhO0lBQ3RCLGtDQUFlLENBQUE7SUFDZiw4QkFBVyxDQUFBO0lBQ1gsNEJBQVMsQ0FBQTtJQUNULGdDQUFhLENBQUE7SUFDYiw4QkFBVyxDQUFBO0FBRWQsQ0FBQyxFQVBXLGFBQWEsR0FBYixxQkFBYSxLQUFiLHFCQUFhLFFBT3hCO0FBRUQsSUFBWSxTQVdYO0FBWEQsV0FBWSxTQUFTO0lBQ2pCLFFBQVE7SUFDUix5Q0FBTSxDQUFBO0lBQ04sUUFBUTtJQUNSLHlDQUFNLENBQUE7SUFDTixRQUFRO0lBQ1IseUNBQU0sQ0FBQTtJQUNOLFFBQVE7SUFDUiw2Q0FBUSxDQUFBO0lBQ1IsUUFBUTtJQUNSLCtDQUFTLENBQUE7QUFDYixDQUFDLEVBWFcsU0FBUyxHQUFULGlCQUFTLEtBQVQsaUJBQVMsUUFXcEI7QUFFWSxRQUFBLGFBQWEsR0FBUSxHQUFHLENBQUM7QUFDekIsUUFBQSxlQUFlLEdBQVEsQ0FBQyxDQUFDO0FBQ3pCLFFBQUEsa0JBQWtCLEdBQVEsRUFBRSxDQUFDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcblxyXG5cclxuZXhwb3J0IGVudW0gQmVhckFuaW1hTmFtZSAge1xyXG4gICBBdHRhY2s9J0F0dGFjaycsXHJcbiAgIElkbGU9J0lkbGUnLFxyXG4gICBSdW49J1J1bicsXHJcbiAgIFN0YXJ0PSdTdGFydCcsXHJcbiAgIFdhbGs9J1dhbGsnXHJcbiAgIFxyXG59XHJcblxyXG5leHBvcnQgZW51bSBCZWFyU3RhdGV7XHJcbiAgICAvKirnlJ/miJAgKi9cclxuICAgIGJvcm49MCxcclxuICAgIC8qKuW+heacuiAqL1xyXG4gICAgaWRsZT0xLFxyXG4gICAgLyoq56e75YqoICovXHJcbiAgICBtb3ZlPTIsXHJcbiAgICAvKirmlLvlh7sgKi9cclxuICAgIGF0dGFjaz0zLFxyXG4gICAgLyoq5raI5aSxICovXHJcbiAgICBkZXN0b3J5PTQsXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBCZWFyTW92ZVNwZWVkOm51bWJlcj0xNTA7XHJcbmV4cG9ydCBjb25zdCBCZWFyQXR0YWNrU3BlZWQ6bnVtYmVyPTI7XHJcbmV4cG9ydCBjb25zdCBCZWFyQXR0YWNrRGlzdGFuY2U6bnVtYmVyPTQwO1xyXG4iXX0=