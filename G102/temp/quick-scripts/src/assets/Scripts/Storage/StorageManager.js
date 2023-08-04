"use strict";
cc._RF.push(module, 'b00eemPx+5BPqivD60JtxhZ', 'StorageManager');
// Scripts/Storage/StorageManager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TheStorageManager = void 0;
var TheStorageManager = /** @class */ (function () {
    function TheStorageManager() {
        this.secret_key = "";
    }
    TheStorageManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new TheStorageManager();
        }
        return this._instance;
    };
    TheStorageManager.prototype.setItem = function (key, value) {
        cc.sys.localStorage.setItem(key, value);
    };
    TheStorageManager.prototype.setJson = function (key, value) {
        this.setItem(key, JSON.stringify(value));
    };
    TheStorageManager.prototype.getItem = function (key) {
        var num = cc.sys.localStorage.getItem(key);
        return num;
    };
    TheStorageManager.prototype.removeItem = function (key) {
        cc.sys.localStorage.removeItem(key);
    };
    TheStorageManager.prototype.getString = function (key, defaultValue) {
        var num = this.getItem(key);
        if (num === "" || num === null) {
            num = defaultValue;
        }
        return num;
    };
    TheStorageManager.prototype.getNumber = function (key, defaultValue) {
        var num = this.getItem(key);
        if (num === "" || num === null || num == "undefined") {
            num = defaultValue;
        }
        else {
            num = Number(num);
        }
        return num;
    };
    TheStorageManager.prototype.getInt = function (key, defaultValue) {
        var num = this.getItem(key);
        if (num === "" || num === null) {
            num = defaultValue;
        }
        else {
            num = parseInt(num);
        }
        return num;
    };
    TheStorageManager.prototype.getFloat = function (key, defaultValue) {
        var num = this.getItem(key);
        if (num === "" || num === null) {
            num = defaultValue;
        }
        else {
            num = parseFloat(num);
        }
        return num;
    };
    TheStorageManager.prototype.getIntList = function (key, defaultValue) {
        var numList = [];
        var numListStr = this.getItem(key);
        if (numListStr === "" || numListStr === null) {
            numList = defaultValue;
        }
        else {
            var list = numListStr.split(',');
            for (var i = 0; i < list.length; i++) {
                var id = parseInt(list[i]);
                numList.push(id);
            }
        }
        return numList;
    };
    TheStorageManager.prototype.getJson = function (key, defaultValue) {
        var data = this.getItem(key);
        if (data) {
            return JSON.parse(data);
        }
        else {
            return defaultValue;
        }
    };
    TheStorageManager._instance = null;
    return TheStorageManager;
}());
exports.TheStorageManager = TheStorageManager;

cc._RF.pop();