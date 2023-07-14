"use strict";
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