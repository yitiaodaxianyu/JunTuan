
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Maze/Data/RogueText.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'fd03834GBJHsLTINBhwCG34', 'RogueText');
// Scripts/Maze/Data/RogueText.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RogueTextManager = exports.JsonRogueText = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonRogueText = /** @class */ (function () {
    function JsonRogueText() {
        /**格子类型 */
        this.HexagonType = 0;
        /**标题文本ID */
        this.Roguetitle_ID = 0;
        /**文本内容ID */
        this.RogueText_ID = 0;
    }
    return JsonRogueText;
}());
exports.JsonRogueText = JsonRogueText;
var RogueTextManager = /** @class */ (function () {
    function RogueTextManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
        //以上格式统一，以下写每个json数据的特殊需求
    }
    RogueTextManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new RogueTextManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    RogueTextManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    RogueTextManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('RogueText', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonRogueText成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonRogueText();
                jsonData = json[i];
                _this.data.set(jsonData.HexagonType, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    RogueTextManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    RogueTextManager.prototype.getJsonRogueText = function (id) {
        return this.data.get(id);
    };
    /**根据格子类型获取标题文本ID */
    RogueTextManager.prototype.getRoguetitle_ID = function (id) {
        return this.data.get(id).Roguetitle_ID;
    };
    /**根据格子类型获取文本内容ID */
    RogueTextManager.prototype.getRogueText_ID = function (id) {
        return this.data.get(id).RogueText_ID;
    };
    /** 静态方法，获取最大的 格子类型*/
    RogueTextManager.getMaxHexagonType = function () {
        return 5;
    };
    RogueTextManager._instance = null;
    return RogueTextManager;
}());
exports.RogueTextManager = RogueTextManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTWF6ZVxcRGF0YVxcUm9ndWVUZXh0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlEQUF3RDtBQUd4RDtJQUFBO1FBQ0ksVUFBVTtRQUNILGdCQUFXLEdBQVUsQ0FBQyxDQUFFO1FBQy9CLFlBQVk7UUFDTCxrQkFBYSxHQUFVLENBQUMsQ0FBRTtRQUNqQyxZQUFZO1FBQ0wsaUJBQVksR0FBVSxDQUFDLENBQUU7SUFDcEMsQ0FBQztJQUFELG9CQUFDO0FBQUQsQ0FQQSxBQU9DLElBQUE7QUFQWSxzQ0FBYTtBQVMxQjtJQUFBO1FBRUksaUJBQWlCO1FBQ1QsU0FBSSxHQUEyQixJQUFJLENBQUM7UUFDcEMsc0JBQWlCLEdBQVMsS0FBSyxDQUFDO1FBd0R4Qyx5QkFBeUI7SUFHN0IsQ0FBQztJQXpEaUIsNEJBQVcsR0FBekI7UUFDSSxJQUFHLElBQUksQ0FBQyxTQUFTLElBQUUsSUFBSSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUMsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDO1lBQ3RDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDekI7UUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUNELFNBQVM7SUFDRCwrQkFBSSxHQUFaO1FBQ0ksSUFBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDWCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDbkI7SUFDTCxDQUFDO0lBQ0QsUUFBUTtJQUNBLG1DQUFRLEdBQWhCO1FBQUEsaUJBZ0JDO1FBZkcseUJBQVcsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFDLHlCQUFXLENBQUMsU0FBUyxFQUFDLFVBQUMsS0FBWSxFQUFFLE1BQW1CO1lBQ3JGLElBQUcsS0FBSyxFQUFDO2dCQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ25CLE9BQU87YUFDVjtZQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUNqQyxLQUFJLENBQUMsSUFBSSxHQUFDLElBQUksR0FBRyxFQUFFLENBQUM7WUFDcEIsSUFBSSxJQUFJLEdBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNyQixLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQztnQkFDNUIsSUFBSSxRQUFRLEdBQUMsSUFBSSxhQUFhLEVBQUUsQ0FBQztnQkFDakMsUUFBUSxHQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakIsS0FBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBQyxRQUFRLENBQUMsQ0FBQzthQUNoRDtZQUNELEtBQUksQ0FBQyxpQkFBaUIsR0FBQyxJQUFJLENBQUM7UUFDaEMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsWUFBWTtJQUNMLDZDQUFrQixHQUF6QjtRQUNJLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDO0lBQ2xDLENBQUM7SUFDRCxzQkFBc0I7SUFDZiwyQ0FBZ0IsR0FBdkIsVUFBd0IsRUFBUztRQUM3QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFDRCxvQkFBb0I7SUFDYiwyQ0FBZ0IsR0FBdkIsVUFBd0IsRUFBUztRQUM3QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQztJQUMzQyxDQUFDO0lBQ0Qsb0JBQW9CO0lBQ2IsMENBQWUsR0FBdEIsVUFBdUIsRUFBUztRQUM1QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQztJQUMxQyxDQUFDO0lBRUQscUJBQXFCO0lBQ1Asa0NBQWlCLEdBQS9CO1FBQ0ksT0FBTyxDQUFDLENBQUM7SUFDYixDQUFDO0lBekRjLDBCQUFTLEdBQXFCLElBQUksQ0FBQztJQThEdEQsdUJBQUM7Q0EvREQsQUErREMsSUFBQTtBQS9EWSw0Q0FBZ0IiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2FkTWFuYWdlciB9IGZyb20gXCIuLi8uLi9Mb2FkaW5nL0xvYWRNYW5hZ2VyXCI7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIEpzb25Sb2d1ZVRleHQge1xyXG4gICAgLyoq5qC85a2Q57G75Z6LICovXHJcbiAgICBwdWJsaWMgSGV4YWdvblR5cGU6bnVtYmVyID0gMCA7XHJcbiAgICAvKirmoIfpopjmlofmnKxJRCAqL1xyXG4gICAgcHVibGljIFJvZ3VldGl0bGVfSUQ6bnVtYmVyID0gMCA7XHJcbiAgICAvKirmlofmnKzlhoXlrrlJRCAqL1xyXG4gICAgcHVibGljIFJvZ3VlVGV4dF9JRDpudW1iZXIgPSAwIDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFJvZ3VlVGV4dE1hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBSb2d1ZVRleHRNYW5hZ2VyID0gbnVsbDtcclxuICAgIC8v5oqKanNvbuaVsOaNrui9rOWMluaIkG1hcOaVsOaNrlxyXG4gICAgcHJpdmF0ZSBkYXRhOk1hcDxudW1iZXIsSnNvblJvZ3VlVGV4dD49bnVsbDtcclxuICAgIHByaXZhdGUgaXNfbG9hZF9jb21wbGV0ZWQ6Ym9vbGVhbj1mYWxzZTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6Um9ndWVUZXh0TWFuYWdlciB7XHJcbiAgICAgICAgaWYodGhpcy5faW5zdGFuY2U9PW51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2U9bmV3IFJvZ3VlVGV4dE1hbmFnZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UuaW5pdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcbiAgICAvL+WIneWni+WMlua4uOaIj+aVsOaNrlxyXG4gICAgcHJpdmF0ZSBpbml0KCkge1xyXG4gICAgICAgIGlmKCF0aGlzLmRhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkSnNvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8v5Yqg6L29anNvblxyXG4gICAgcHJpdmF0ZSBsb2FkSnNvbigpIHtcclxuICAgICAgICBMb2FkTWFuYWdlci5sb2FkSnNvbignUm9ndWVUZXh0JyxMb2FkTWFuYWdlci5sb2FkX21vZGUsKGVycm9yOiBFcnJvciwgYXNzZXRzOmNjLkpzb25Bc3NldCk9PiB7XHJcbiAgICAgICAgICAgIGlmKGVycm9yKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn5Yqg6L29SnNvblJvZ3VlVGV4dOaIkOWKnycpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGE9bmV3IE1hcCgpO1xyXG4gICAgICAgICAgICBsZXQganNvbj1hc3NldHMuanNvbjtcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8anNvbi5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQganNvbkRhdGE9bmV3IEpzb25Sb2d1ZVRleHQoKTtcclxuICAgICAgICAgICAgICAgIGpzb25EYXRhPWpzb25baV07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuc2V0KGpzb25EYXRhLkhleGFnb25UeXBlLGpzb25EYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmlzX2xvYWRfY29tcGxldGVkPXRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5Yqg6L295piv5ZCm5a6M5oiQICovXHJcbiAgICBwdWJsaWMgZ2V0SXNMb2FkQ29tcGxldGVkKCk6IGJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNfbG9hZF9jb21wbGV0ZWQ7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja5pZOWPt+iOt+WPlkpzb27nmoTlkITnp43mlbDmja4gKi9cclxuICAgIHB1YmxpYyBnZXRKc29uUm9ndWVUZXh0KGlkOm51bWJlcik6SnNvblJvZ3VlVGV4dCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5qC85a2Q57G75Z6L6I635Y+W5qCH6aKY5paH5pysSUQgKi9cclxuICAgIHB1YmxpYyBnZXRSb2d1ZXRpdGxlX0lEKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlJvZ3VldGl0bGVfSUQ7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7moLzlrZDnsbvlnovojrflj5bmlofmnKzlhoXlrrlJRCAqL1xyXG4gICAgcHVibGljIGdldFJvZ3VlVGV4dF9JRChpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5Sb2d1ZVRleHRfSUQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOmdmeaAgeaWueazle+8jOiOt+WPluacgOWkp+eahCDmoLzlrZDnsbvlnosqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRNYXhIZXhhZ29uVHlwZSgpOm51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIDU7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ku6XkuIrmoLzlvI/nu5/kuIDvvIzku6XkuIvlhpnmr4/kuKpqc29u5pWw5o2u55qE54m55q6K6ZyA5rGCXHJcblxyXG4gICAgXHJcbn1cclxuIl19