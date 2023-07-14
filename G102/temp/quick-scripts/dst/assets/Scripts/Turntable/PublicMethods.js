
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Turntable/PublicMethods.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c5ba12D3d1KF5iZsApG2mE8', 'PublicMethods');
// Scripts/Turntable/PublicMethods.ts

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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**
 * Predefined variables
 * Name = NewComponent
 * DateTime = Thu Dec 23 2021 14:07:24 GMT+0800 (中国标准时间)
 * Author = ZQYZ
 * FileBasename = NewComponent.ts
 * FileBasenameNoExtension = NewComponent
 * URL = db://assets/script/WZ/NewComponent.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */
var PublicMethods = /** @class */ (function (_super) {
    __extends(PublicMethods, _super);
    function PublicMethods() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PublicMethods_1 = PublicMethods;
    PublicMethods.timeconversions = function (currenttime) {
        var currenttimeint = currenttime;
        var day = currenttimeint / 24 / 3600;
        day = Math.floor(day);
        var hour = currenttimeint / 3600 % 24;
        hour = Math.floor(hour);
        var minutes = (currenttimeint % 3600) / 60;
        var seconds = currenttimeint % 60;
        minutes = Math.floor(minutes);
        var daystr;
        if (day < 10) {
            daystr = '0' + day;
        }
        else {
            daystr = day;
        }
        var hourstr;
        if (hour < 10) {
            hourstr = '0' + hour;
        }
        else {
            hourstr = hour;
        }
        var minutesstr;
        if (minutes < 10) {
            minutesstr = '0' + minutes;
        }
        else {
            minutesstr = minutes;
        }
        var secondsstr;
        if (seconds < 10) {
            secondsstr = '0' + seconds;
        }
        else {
            secondsstr = seconds;
        }
        return hourstr + ':' + minutesstr + ':' + secondsstr;
    };
    PublicMethods.timeconversion = function (currenttime) {
        var currenttimeint = currenttime;
        var day = currenttimeint / 24 / 3600;
        day = Math.floor(day);
        var hour = currenttimeint / 3600 % 24;
        hour = Math.floor(hour);
        var minutes = (currenttimeint % 3600) / 60;
        var seconds = currenttimeint % 60;
        minutes = Math.floor(minutes);
        var daystr;
        if (day < 10) {
            daystr = '0' + day;
        }
        else {
            daystr = day;
        }
        var hourstr;
        if (hour < 10) {
            hourstr = '0' + hour;
        }
        else {
            hourstr = hour;
        }
        var minutesstr;
        if (minutes < 10) {
            minutesstr = '0' + minutes;
        }
        else {
            minutesstr = minutes;
        }
        var secondsstr;
        if (seconds < 10) {
            secondsstr = '0' + seconds;
        }
        else {
            secondsstr = seconds;
        }
        return daystr + ':' + hourstr + ':' + minutesstr + ':' + secondsstr;
    };
    //保存当前时间
    PublicMethods.setCurrentTime = function () {
        PublicMethods_1.setValueInLocal('LastTime', PublicMethods_1.getCurrentLocalTime());
    };
    PublicMethods.getLastTime = function () {
        var time = PublicMethods_1.getValueWithLocal('LastTime', PublicMethods_1.getCurrentLocalTime());
        return Number(time);
    };
    PublicMethods.getCurrentLocalTime = function () {
        var a = Date.now();
        var b = a / 1000;
        return b;
    };
    /////////////////
    ///////存储本地数据
    PublicMethods.setValueInLocal = function (key, value) {
        try {
            cc.sys.localStorage.setItem(key, String(value));
        }
        catch (err) {
            console.log('---------------------- 卧槽，存文件的时候炸裂了！');
        }
    };
    //读取本地数据
    PublicMethods.getValueWithLocal = function (key, defaultValue) {
        var value = cc.sys.localStorage.getItem(key);
        if (!value) {
            return defaultValue;
        }
        return value;
    };
    var PublicMethods_1;
    PublicMethods = PublicMethods_1 = __decorate([
        ccclass
    ], PublicMethods);
    return PublicMethods;
}(cc.Component));
exports.default = PublicMethods;
/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.3/manual/zh/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.3/manual/zh/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.3/manual/zh/scripting/life-cycle-callbacks.html
 */

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVHVybnRhYmxlXFxQdWJsaWNNZXRob2RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFNLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRTFDOzs7Ozs7Ozs7O0dBVUc7QUFFRjtJQUEyQyxpQ0FBWTtJQUF2RDs7SUF5SEQsQ0FBQztzQkF6SHFCLGFBQWE7SUFFYiw2QkFBZSxHQUE3QixVQUE4QixXQUFXO1FBQ3JDLElBQUksY0FBYyxHQUFDLFdBQVcsQ0FBQztRQUMvQixJQUFJLEdBQUcsR0FBQyxjQUFjLEdBQUMsRUFBRSxHQUFDLElBQUksQ0FBQTtRQUM5QixHQUFHLEdBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNuQixJQUFJLElBQUksR0FBQyxjQUFjLEdBQUMsSUFBSSxHQUFDLEVBQUUsQ0FBQztRQUNoQyxJQUFJLEdBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUNyQixJQUFJLE9BQU8sR0FBQyxDQUFDLGNBQWMsR0FBQyxJQUFJLENBQUMsR0FBQyxFQUFFLENBQUM7UUFDckMsSUFBSSxPQUFPLEdBQUMsY0FBYyxHQUFDLEVBQUUsQ0FBQztRQUM5QixPQUFPLEdBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUczQixJQUFJLE1BQU0sQ0FBQTtRQUNWLElBQUcsR0FBRyxHQUFDLEVBQUUsRUFBQztZQUNOLE1BQU0sR0FBQyxHQUFHLEdBQUMsR0FBRyxDQUFDO1NBQ2xCO2FBQ0c7WUFDQSxNQUFNLEdBQUMsR0FBRyxDQUFDO1NBQ2Q7UUFFRCxJQUFJLE9BQU8sQ0FBQTtRQUNYLElBQUcsSUFBSSxHQUFDLEVBQUUsRUFBQztZQUNQLE9BQU8sR0FBQyxHQUFHLEdBQUMsSUFBSSxDQUFDO1NBQ3BC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QTdCLFVBQThCLEdBQUcsRUFBRSxLQUFLO1FBQ3BDLElBQUk7WUFDQSxFQUFFLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQ25EO1FBQ0QsT0FBTyxHQUFHLEVBQUU7WUFDUixPQUFPLENBQUMsR0FBRyxDQUFDLHNDQUFzQyxDQUFDLENBQUE7U0FDdEQ7SUFDTCxDQUFDO0lBQ0QsUUFBUTtJQUNNLCtCQUFpQixHQUEvQixVQUFnQyxHQUFHLEVBQUUsWUFBWTtRQUM3QyxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNSLE9BQU8sWUFBWSxDQUFDO1NBQ3ZCO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQzs7SUF4SGEsYUFBYTtRQURqQyxPQUFPO09BQ2EsYUFBYSxDQXlIbEM7SUFBRCxvQkFBQztDQXpIQSxBQXlIQSxDQXpIMkMsRUFBRSxDQUFDLFNBQVMsR0F5SHZEO2tCQXpIcUIsYUFBYTtBQTJIbkM7Ozs7Ozs7OztHQVNHIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG4vKipcclxuICogUHJlZGVmaW5lZCB2YXJpYWJsZXNcclxuICogTmFtZSA9IE5ld0NvbXBvbmVudFxyXG4gKiBEYXRlVGltZSA9IFRodSBEZWMgMjMgMjAyMSAxNDowNzoyNCBHTVQrMDgwMCAo5Lit5Zu95qCH5YeG5pe26Ze0KVxyXG4gKiBBdXRob3IgPSBaUVlaXHJcbiAqIEZpbGVCYXNlbmFtZSA9IE5ld0NvbXBvbmVudC50c1xyXG4gKiBGaWxlQmFzZW5hbWVOb0V4dGVuc2lvbiA9IE5ld0NvbXBvbmVudFxyXG4gKiBVUkwgPSBkYjovL2Fzc2V0cy9zY3JpcHQvV1ovTmV3Q29tcG9uZW50LnRzXHJcbiAqIE1hbnVhbFVybCA9IGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci8zLjMvbWFudWFsL3poL1xyXG4gKlxyXG4gKi9cclxuIEBjY2NsYXNzXHJcbiBleHBvcnQgZGVmYXVsdCBjbGFzcyBQdWJsaWNNZXRob2RzIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB0aW1lY29udmVyc2lvbnMoY3VycmVudHRpbWUpey8v5pe26Ze06L2s5o2iKOaKiuenkuaNoueul+aIkOWIhuWSjOenkijmr5TlpoIzMDDnp5LovazmjaLmiJAwNTowMCkpXHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50dGltZWludD1jdXJyZW50dGltZTtcclxuICAgICAgICAgICAgbGV0IGRheT1jdXJyZW50dGltZWludC8yNC8zNjAwXHJcbiAgICAgICAgICAgIGRheT1NYXRoLmZsb29yKGRheSlcclxuICAgICAgICAgICAgbGV0IGhvdXI9Y3VycmVudHRpbWVpbnQvMzYwMCUyNDtcclxuICAgICAgICAgICAgaG91cj1NYXRoLmZsb29yKGhvdXIpXHJcbiAgICAgICAgICAgIGxldCBtaW51dGVzPShjdXJyZW50dGltZWludCUzNjAwKS82MDtcclxuICAgICAgICAgICAgbGV0IHNlY29uZHM9Y3VycmVudHRpbWVpbnQlNjA7XHJcbiAgICAgICAgICAgIG1pbnV0ZXM9TWF0aC5mbG9vcihtaW51dGVzKVxyXG5cclxuXHJcbiAgICAgICAgICAgIGxldCBkYXlzdHJcclxuICAgICAgICAgICAgaWYoZGF5PDEwKXtcclxuICAgICAgICAgICAgICAgIGRheXN0cj0nMCcrZGF5O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICBkYXlzdHI9ZGF5O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgaG91cnN0clxyXG4gICAgICAgICAgICBpZihob3VyPDEwKXtcclxuICAgICAgICAgICAgICAgIGhvdXJzdHI9JzAnK2hvdXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIGhvdXJzdHI9aG91cjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IG1pbnV0ZXNzdHI7XHJcbiAgICAgICAgICAgIGlmKG1pbnV0ZXM8MTApe1xyXG4gICAgICAgICAgICAgICAgbWludXRlc3N0cj0nMCcrbWludXRlcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgbWludXRlc3N0cj1taW51dGVzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBzZWNvbmRzc3RyO1xyXG4gICAgICAgICAgICBpZihzZWNvbmRzPDEwKXtcclxuICAgICAgICAgICAgICAgIHNlY29uZHNzdHI9JzAnK3NlY29uZHM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHNlY29uZHNzdHI9c2Vjb25kcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gaG91cnN0cisnOicrbWludXRlc3N0cisnOicrc2Vjb25kc3N0cjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB0aW1lY29udmVyc2lvbihjdXJyZW50dGltZSl7Ly/ml7bpl7TovazmjaIo5oqK56eS5o2i566X5oiQ5YiG5ZKM56eSKOavlOWmgjMwMOenkui9rOaNouaIkDA1OjAwKSlcclxuICAgICAgICAgICAgbGV0IGN1cnJlbnR0aW1laW50PWN1cnJlbnR0aW1lO1xyXG4gICAgICAgICAgICBsZXQgZGF5PWN1cnJlbnR0aW1laW50LzI0LzM2MDBcclxuICAgICAgICAgICAgZGF5PU1hdGguZmxvb3IoZGF5KVxyXG4gICAgICAgICAgICBsZXQgaG91cj1jdXJyZW50dGltZWludC8zNjAwJTI0O1xyXG4gICAgICAgICAgICBob3VyPU1hdGguZmxvb3IoaG91cilcclxuICAgICAgICAgICAgbGV0IG1pbnV0ZXM9KGN1cnJlbnR0aW1laW50JTM2MDApLzYwO1xyXG4gICAgICAgICAgICBsZXQgc2Vjb25kcz1jdXJyZW50dGltZWludCU2MDtcclxuICAgICAgICAgICAgbWludXRlcz1NYXRoLmZsb29yKG1pbnV0ZXMpXHJcblxyXG5cclxuICAgICAgICAgICAgbGV0IGRheXN0clxyXG4gICAgICAgICAgICBpZihkYXk8MTApe1xyXG4gICAgICAgICAgICAgICAgZGF5c3RyPScwJytkYXk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIGRheXN0cj1kYXk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBob3Vyc3RyXHJcbiAgICAgICAgICAgIGlmKGhvdXI8MTApe1xyXG4gICAgICAgICAgICAgICAgaG91cnN0cj0nMCcraG91cjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgaG91cnN0cj1ob3VyO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgbWludXRlc3N0cjtcclxuICAgICAgICAgICAgaWYobWludXRlczwxMCl7XHJcbiAgICAgICAgICAgICAgICBtaW51dGVzc3RyPScwJyttaW51dGVzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICBtaW51dGVzc3RyPW1pbnV0ZXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHNlY29uZHNzdHI7XHJcbiAgICAgICAgICAgIGlmKHNlY29uZHM8MTApe1xyXG4gICAgICAgICAgICAgICAgc2Vjb25kc3N0cj0nMCcrc2Vjb25kcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgc2Vjb25kc3N0cj1zZWNvbmRzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJldHVybiBkYXlzdHIrJzonK2hvdXJzdHIrJzonK21pbnV0ZXNzdHIrJzonK3NlY29uZHNzdHI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5L+d5a2Y5b2T5YmN5pe26Ze0XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBzZXRDdXJyZW50VGltZSgpey8v5L+d5a2Y5b2T5YmN5pe26Ze0KOWNleS9jeenkilcclxuICAgICAgICAgICAgUHVibGljTWV0aG9kcy5zZXRWYWx1ZUluTG9jYWwoJ0xhc3RUaW1lJyxQdWJsaWNNZXRob2RzLmdldEN1cnJlbnRMb2NhbFRpbWUoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZ2V0TGFzdFRpbWUoKXsvL+W+l+WIsOS4iuS4gOasoeS/neWtmOeahOaXtumXtCjljZXkvY3np5IpXHJcbiAgICAgICAgICAgIGxldCB0aW1lPVB1YmxpY01ldGhvZHMuZ2V0VmFsdWVXaXRoTG9jYWwoJ0xhc3RUaW1lJyxQdWJsaWNNZXRob2RzLmdldEN1cnJlbnRMb2NhbFRpbWUoKSk7XHJcbiAgICAgICAgICAgIHJldHVybiBOdW1iZXIodGltZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZ2V0Q3VycmVudExvY2FsVGltZSgpey8v5b6X5Yiw5pys5Zyw5pe26Ze05bm25LiU6L2s5o2i5oiQ56eSXHJcbiAgICAgICAgICAgIGxldCBhID0gRGF0ZS5ub3coKTtcclxuICAgICAgICAgICAgbGV0IGI9YS8xMDAwO1xyXG4gICAgICAgICAgICByZXR1cm4gYjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgICAgICAvLy8vLy8v5a2Y5YKo5pys5Zyw5pWw5o2uXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBzZXRWYWx1ZUluTG9jYWwoa2V5LCB2YWx1ZSkgey8v5pWw5o2u5a2Y5YKo5Yiw5pys5ZywXHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCBTdHJpbmcodmFsdWUpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSDljafmp73vvIzlrZjmlofku7bnmoTml7blgJnngrjoo4LkuobvvIEnKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v6K+75Y+W5pys5Zyw5pWw5o2uXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBnZXRWYWx1ZVdpdGhMb2NhbChrZXksIGRlZmF1bHRWYWx1ZSkge1xyXG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KTtcclxuICAgICAgICAgICAgaWYgKCF2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgfVxyXG59XHJcblxyXG4vKipcclxuICogWzFdIENsYXNzIG1lbWJlciBjb3VsZCBiZSBkZWZpbmVkIGxpa2UgdGhpcy5cclxuICogWzJdIFVzZSBgcHJvcGVydHlgIGRlY29yYXRvciBpZiB5b3VyIHdhbnQgdGhlIG1lbWJlciB0byBiZSBzZXJpYWxpemFibGUuXHJcbiAqIFszXSBZb3VyIGluaXRpYWxpemF0aW9uIGdvZXMgaGVyZS5cclxuICogWzRdIFlvdXIgdXBkYXRlIGZ1bmN0aW9uIGdvZXMgaGVyZS5cclxuICpcclxuICogTGVhcm4gbW9yZSBhYm91dCBzY3JpcHRpbmc6IGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci8zLjMvbWFudWFsL3poL3NjcmlwdGluZy9cclxuICogTGVhcm4gbW9yZSBhYm91dCBDQ0NsYXNzOiBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvMy4zL21hbnVhbC96aC9zY3JpcHRpbmcvY2NjbGFzcy5odG1sXHJcbiAqIExlYXJuIG1vcmUgYWJvdXQgbGlmZS1jeWNsZSBjYWxsYmFja3M6IGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci8zLjMvbWFudWFsL3poL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcbiAqL1xyXG4iXX0=