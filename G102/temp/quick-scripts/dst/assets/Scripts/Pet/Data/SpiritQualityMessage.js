
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Pet/Data/SpiritQualityMessage.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '7b31b76PJVGd4iKrY5mBW2z', 'SpiritQualityMessage');
// Scripts/Pet/Data/SpiritQualityMessage.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpiritQualityMessageManager = exports.JsonSpiritQualityMessage = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonSpiritQualityMessage = /** @class */ (function () {
    function JsonSpiritQualityMessage() {
        /**品质 */
        this.SpiritQuality = 0;
        /**品质名 */
        this.SpiritQualityName = 0;
        /**品质框 */
        this.SpiritQualityframe = 0;
        /**星级 */
        this.SpiritQualityStar = 0;
    }
    return JsonSpiritQualityMessage;
}());
exports.JsonSpiritQualityMessage = JsonSpiritQualityMessage;
var SpiritQualityMessageManager = /** @class */ (function () {
    function SpiritQualityMessageManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
        //以上格式统一，以下写每个json数据的特殊需求
    }
    SpiritQualityMessageManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new SpiritQualityMessageManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    SpiritQualityMessageManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    SpiritQualityMessageManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('SpiritQualityMessage', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonSpiritQualityMessage成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonSpiritQualityMessage();
                jsonData = json[i];
                _this.data.set(jsonData.SpiritQuality, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    SpiritQualityMessageManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    SpiritQualityMessageManager.prototype.getJsonSpiritQualityMessage = function (id) {
        return this.data.get(id);
    };
    /**根据品质获取品质名 */
    SpiritQualityMessageManager.prototype.getSpiritQualityName = function (id) {
        return this.data.get(id).SpiritQualityName;
    };
    /**根据品质获取品质框 */
    SpiritQualityMessageManager.prototype.getSpiritQualityframe = function (id) {
        return this.data.get(id).SpiritQualityframe;
    };
    /**根据品质获取星级 */
    SpiritQualityMessageManager.prototype.getSpiritQualityStar = function (id) {
        return this.data.get(id).SpiritQualityStar;
    };
    /** 静态方法，获取最大的 品质*/
    SpiritQualityMessageManager.getMaxSpiritQuality = function () {
        return 15;
    };
    SpiritQualityMessageManager._instance = null;
    return SpiritQualityMessageManager;
}());
exports.SpiritQualityMessageManager = SpiritQualityMessageManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcUGV0XFxEYXRhXFxTcGlyaXRRdWFsaXR5TWVzc2FnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5REFBd0Q7QUFFeEQ7SUFBQTtRQUNJLFFBQVE7UUFDRCxrQkFBYSxHQUFVLENBQUMsQ0FBRTtRQUNqQyxTQUFTO1FBQ0Ysc0JBQWlCLEdBQVUsQ0FBQyxDQUFFO1FBQ3JDLFNBQVM7UUFDRix1QkFBa0IsR0FBVSxDQUFDLENBQUU7UUFDdEMsUUFBUTtRQUNELHNCQUFpQixHQUFVLENBQUMsQ0FBRTtJQUN6QyxDQUFDO0lBQUQsK0JBQUM7QUFBRCxDQVRBLEFBU0MsSUFBQTtBQVRZLDREQUF3QjtBQVdyQztJQUFBO1FBRUksaUJBQWlCO1FBQ1QsU0FBSSxHQUFzQyxJQUFJLENBQUM7UUFDL0Msc0JBQWlCLEdBQVMsS0FBSyxDQUFDO1FBNER4Qyx5QkFBeUI7SUFHN0IsQ0FBQztJQTdEaUIsdUNBQVcsR0FBekI7UUFDSSxJQUFHLElBQUksQ0FBQyxTQUFTLElBQUUsSUFBSSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUMsSUFBSSwyQkFBMkIsRUFBRSxDQUFDO1lBQ2pELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDekI7UUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUNELFNBQVM7SUFDRCwwQ0FBSSxHQUFaO1FBQ0ksSUFBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDWCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDbkI7SUFDTCxDQUFDO0lBQ0QsUUFBUTtJQUNBLDhDQUFRLEdBQWhCO1FBQUEsaUJBZ0JDO1FBZkcseUJBQVcsQ0FBQyxRQUFRLENBQUMsc0JBQXNCLEVBQUMseUJBQVcsQ0FBQyxTQUFTLEVBQUMsVUFBQyxLQUFZLEVBQUUsTUFBbUI7WUFDaEcsSUFBRyxLQUFLLEVBQUM7Z0JBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbkIsT0FBTzthQUNWO1lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO1lBQzVDLEtBQUksQ0FBQyxJQUFJLEdBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUNwQixJQUFJLElBQUksR0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ3JCLEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO2dCQUM1QixJQUFJLFFBQVEsR0FBQyxJQUFJLHdCQUF3QixFQUFFLENBQUM7Z0JBQzVDLFFBQVEsR0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pCLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUMsUUFBUSxDQUFDLENBQUM7YUFDbEQ7WUFDRCxLQUFJLENBQUMsaUJBQWlCLEdBQUMsSUFBSSxDQUFDO1FBQ2hDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELFlBQVk7SUFDTCx3REFBa0IsR0FBekI7UUFDSSxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztJQUNsQyxDQUFDO0lBQ0Qsc0JBQXNCO0lBQ2YsaUVBQTJCLEdBQWxDLFVBQW1DLEVBQVM7UUFDeEMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBQ0QsZUFBZTtJQUNSLDBEQUFvQixHQUEzQixVQUE0QixFQUFTO1FBQ2pDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsaUJBQWlCLENBQUM7SUFDL0MsQ0FBQztJQUNELGVBQWU7SUFDUiwyREFBcUIsR0FBNUIsVUFBNkIsRUFBUztRQUNsQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLGtCQUFrQixDQUFDO0lBQ2hELENBQUM7SUFDRCxjQUFjO0lBQ1AsMERBQW9CLEdBQTNCLFVBQTRCLEVBQVM7UUFDakMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQztJQUMvQyxDQUFDO0lBRUQsbUJBQW1CO0lBQ0wsK0NBQW1CLEdBQWpDO1FBQ0ksT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0lBN0RjLHFDQUFTLEdBQWdDLElBQUksQ0FBQztJQWtFakUsa0NBQUM7Q0FuRUQsQUFtRUMsSUFBQTtBQW5FWSxrRUFBMkIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2FkTWFuYWdlciB9IGZyb20gXCIuLi8uLi9Mb2FkaW5nL0xvYWRNYW5hZ2VyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgSnNvblNwaXJpdFF1YWxpdHlNZXNzYWdlIHtcclxuICAgIC8qKuWTgei0qCAqL1xyXG4gICAgcHVibGljIFNwaXJpdFF1YWxpdHk6bnVtYmVyID0gMCA7XHJcbiAgICAvKirlk4HotKjlkI0gKi9cclxuICAgIHB1YmxpYyBTcGlyaXRRdWFsaXR5TmFtZTpudW1iZXIgPSAwIDtcclxuICAgIC8qKuWTgei0qOahhiAqL1xyXG4gICAgcHVibGljIFNwaXJpdFF1YWxpdHlmcmFtZTpudW1iZXIgPSAwIDtcclxuICAgIC8qKuaYn+e6pyAqL1xyXG4gICAgcHVibGljIFNwaXJpdFF1YWxpdHlTdGFyOm51bWJlciA9IDAgO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU3Bpcml0UXVhbGl0eU1lc3NhZ2VNYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogU3Bpcml0UXVhbGl0eU1lc3NhZ2VNYW5hZ2VyID0gbnVsbDtcclxuICAgIC8v5oqKanNvbuaVsOaNrui9rOWMluaIkG1hcOaVsOaNrlxyXG4gICAgcHJpdmF0ZSBkYXRhOk1hcDxudW1iZXIsSnNvblNwaXJpdFF1YWxpdHlNZXNzYWdlPj1udWxsO1xyXG4gICAgcHJpdmF0ZSBpc19sb2FkX2NvbXBsZXRlZDpib29sZWFuPWZhbHNlO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTpTcGlyaXRRdWFsaXR5TWVzc2FnZU1hbmFnZXIge1xyXG4gICAgICAgIGlmKHRoaXMuX2luc3RhbmNlPT1udWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlPW5ldyBTcGlyaXRRdWFsaXR5TWVzc2FnZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UuaW5pdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcbiAgICAvL+WIneWni+WMlua4uOaIj+aVsOaNrlxyXG4gICAgcHJpdmF0ZSBpbml0KCkge1xyXG4gICAgICAgIGlmKCF0aGlzLmRhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkSnNvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8v5Yqg6L29anNvblxyXG4gICAgcHJpdmF0ZSBsb2FkSnNvbigpIHtcclxuICAgICAgICBMb2FkTWFuYWdlci5sb2FkSnNvbignU3Bpcml0UXVhbGl0eU1lc3NhZ2UnLExvYWRNYW5hZ2VyLmxvYWRfbW9kZSwoZXJyb3I6IEVycm9yLCBhc3NldHM6Y2MuSnNvbkFzc2V0KT0+IHtcclxuICAgICAgICAgICAgaWYoZXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfliqDovb1Kc29uU3Bpcml0UXVhbGl0eU1lc3NhZ2XmiJDlip8nKTtcclxuICAgICAgICAgICAgdGhpcy5kYXRhPW5ldyBNYXAoKTtcclxuICAgICAgICAgICAgbGV0IGpzb249YXNzZXRzLmpzb247XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPGpzb24ubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IGpzb25EYXRhPW5ldyBKc29uU3Bpcml0UXVhbGl0eU1lc3NhZ2UoKTtcclxuICAgICAgICAgICAgICAgIGpzb25EYXRhPWpzb25baV07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuc2V0KGpzb25EYXRhLlNwaXJpdFF1YWxpdHksanNvbkRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaXNfbG9hZF9jb21wbGV0ZWQ9dHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKirliqDovb3mmK/lkKblrozmiJAgKi9cclxuICAgIHB1YmxpYyBnZXRJc0xvYWRDb21wbGV0ZWQoKTogYm9vbGVhbntcclxuICAgICAgICByZXR1cm4gdGhpcy5pc19sb2FkX2NvbXBsZXRlZDtcclxuICAgIH1cclxuICAgIC8qKuagueaNrmlk5Y+36I635Y+WSnNvbueahOWQhOenjeaVsOaNriAqL1xyXG4gICAgcHVibGljIGdldEpzb25TcGlyaXRRdWFsaXR5TWVzc2FnZShpZDpudW1iZXIpOkpzb25TcGlyaXRRdWFsaXR5TWVzc2FnZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5ZOB6LSo6I635Y+W5ZOB6LSo5ZCNICovXHJcbiAgICBwdWJsaWMgZ2V0U3Bpcml0UXVhbGl0eU5hbWUoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuU3Bpcml0UXVhbGl0eU5hbWU7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7lk4HotKjojrflj5blk4HotKjmoYYgKi9cclxuICAgIHB1YmxpYyBnZXRTcGlyaXRRdWFsaXR5ZnJhbWUoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuU3Bpcml0UXVhbGl0eWZyYW1lO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5ZOB6LSo6I635Y+W5pif57qnICovXHJcbiAgICBwdWJsaWMgZ2V0U3Bpcml0UXVhbGl0eVN0YXIoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuU3Bpcml0UXVhbGl0eVN0YXI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOmdmeaAgeaWueazle+8jOiOt+WPluacgOWkp+eahCDlk4HotKgqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRNYXhTcGlyaXRRdWFsaXR5KCk6bnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gMTU7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ku6XkuIrmoLzlvI/nu5/kuIDvvIzku6XkuIvlhpnmr4/kuKpqc29u5pWw5o2u55qE54m55q6K6ZyA5rGCXHJcblxyXG5cclxufVxyXG4iXX0=