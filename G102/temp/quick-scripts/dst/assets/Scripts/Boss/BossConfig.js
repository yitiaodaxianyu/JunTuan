
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Boss/BossConfig.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '12822/Cb7tBma+ntM78RNC6', 'BossConfig');
// Scripts/Boss/BossConfig.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Boss_State_Name = exports.Boss_State = exports.Boss_Type = void 0;
var Boss_Type;
(function (Boss_Type) {
    //没BOSS
    Boss_Type[Boss_Type["NULL"] = 0] = "NULL";
    Boss_Type[Boss_Type["BullDemon"] = 1] = "BullDemon";
    Boss_Type[Boss_Type["Boss_Num"] = 2] = "Boss_Num";
})(Boss_Type = exports.Boss_Type || (exports.Boss_Type = {}));
var Boss_State;
(function (Boss_State) {
    Boss_State[Boss_State["daiji"] = 0] = "daiji";
    Boss_State[Boss_State["gongji"] = 1] = "gongji";
    Boss_State[Boss_State["jineng"] = 2] = "jineng";
})(Boss_State = exports.Boss_State || (exports.Boss_State = {}));
var Boss_State_Name;
(function (Boss_State_Name) {
    Boss_State_Name["zmdj"] = "zhengmian_daiji";
    Boss_State_Name["cmdj"] = "cemian_daiji";
    Boss_State_Name["zmgj"] = "zhengmian";
    Boss_State_Name["cmgj"] = "cemian";
})(Boss_State_Name = exports.Boss_State_Name || (exports.Boss_State_Name = {}));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcQm9zc1xcQm9zc0NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFZLFNBT1g7QUFQRCxXQUFZLFNBQVM7SUFFakIsT0FBTztJQUNQLHlDQUFNLENBQUE7SUFDTixtREFBVyxDQUFBO0lBRVgsaURBQVEsQ0FBQTtBQUNaLENBQUMsRUFQVyxTQUFTLEdBQVQsaUJBQVMsS0FBVCxpQkFBUyxRQU9wQjtBQUVELElBQVksVUFLWDtBQUxELFdBQVksVUFBVTtJQUVsQiw2Q0FBTyxDQUFBO0lBQ1AsK0NBQVEsQ0FBQTtJQUNSLCtDQUFRLENBQUE7QUFDWixDQUFDLEVBTFcsVUFBVSxHQUFWLGtCQUFVLEtBQVYsa0JBQVUsUUFLckI7QUFFRCxJQUFZLGVBTVg7QUFORCxXQUFZLGVBQWU7SUFFdkIsMkNBQXdCLENBQUE7SUFDeEIsd0NBQXFCLENBQUE7SUFDckIscUNBQWtCLENBQUE7SUFDbEIsa0NBQWUsQ0FBQTtBQUNuQixDQUFDLEVBTlcsZUFBZSxHQUFmLHVCQUFlLEtBQWYsdUJBQWUsUUFNMUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZW51bSBCb3NzX1R5cGVcclxue1xyXG4gICAgLy/msqFCT1NTXHJcbiAgICBOVUxMPTAsXHJcbiAgICBCdWxsRGVtb249MSxcclxuXHJcbiAgICBCb3NzX051bVxyXG59XHJcblxyXG5leHBvcnQgZW51bSBCb3NzX1N0YXRlXHJcbntcclxuICAgIGRhaWppPTAsXHJcbiAgICBnb25namk9MSxcclxuICAgIGppbmVuZz0yLFxyXG59XHJcblxyXG5leHBvcnQgZW51bSBCb3NzX1N0YXRlX05hbWVcclxue1xyXG4gICAgem1kaiA9IFwiemhlbmdtaWFuX2RhaWppXCIsICAgICAgIC8vLS0g5q2j6Z2i5b6F5py6XHJcbiAgICBjbWRqID0gXCJjZW1pYW5fZGFpamlcIiwgICAgICAgICAgLy8tLSDkvqfpnaLlvoXmnLpcclxuICAgIHptZ2ogPSBcInpoZW5nbWlhblwiLCAgICAgICAgICAgICAvLy0tIOato+mdouaUu+WHu1xyXG4gICAgY21naiA9IFwiY2VtaWFuXCIsICAgICAgICAgICAgICAgIC8vLS0g5L6n6Z2i5pS75Ye7XHJcbn0iXX0=