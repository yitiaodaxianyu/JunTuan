
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/ZXEdit.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e7d9b72it9O7IH+pDNswKdk', 'ZXEdit');
// Scripts/ZXEdit.ts

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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var MonsterNormal_1 = require("./Monster/MonsterNormal");
var Constants_1 = require("./Constants");
var GameManager_1 = require("./GameManager");
var ZhenXingData_1 = require("./ZhenXingData");
var HpTextManager_1 = require("./Monster/HpTextManager");
var HttpManager_1 = require("./NetWork/HttpManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ZXEdit = /** @class */ (function (_super) {
    __extends(ZXEdit, _super);
    function ZXEdit() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ZXEdit.prototype.onLoad = function () {
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;
    };
    ZXEdit.prototype.start = function () {
        this.show();
        HttpManager_1.HttpManager.testAES("可以吗");
    };
    ZXEdit.prototype.show = function () {
        // init logic
        // let label=this.node.getChildByName('TestLabel').getComponent(cc.Label);
        // label.string = 'this.text';
        //  this.testAsync().then((str)=>{
        //     label.string =str;
        // }).catch((str)=>{
        //     label.string =str;
        // });
        var nowDate = new Date();
        var now = new Date().getTime() / 1000;
        var ssN = new Date().toLocaleString();
        var yu = now % (24 * 60 * 60);
        var ling = now - yu + (nowDate.getTimezoneOffset() * 60);
        var lngTime = new Date(ling * 1000);
        var h = lngTime.getHours();
        var m = lngTime.getMinutes();
        var s = lngTime.getSeconds();
        //let ss3=lngTime.toTimeString()
    };
    ZXEdit.prototype.testAsync = function () {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        //resolve("liang miao yi hou ");
                        reject("a miao yi hou ");
                    })];
            });
        });
    };
    ZXEdit.prototype.clickBtnBossSkill = function () {
        GameManager_1.default.getInstance().cur_game_scene = Constants_1.GameScene.game;
        GameManager_1.default.getInstance().showBossWarning();
    };
    ZXEdit.prototype.clickBtnCBoss = function () {
        var ss = cc.find('Canvas/HPText_Root').getComponent(HpTextManager_1.default);
        // ss.createHpTextHp(cc.v2(0,0),'-'+(Math.random()*9000+1000).toFixed(0),Enemy_Injured_Type.Normal_Attack);
        // ss.createHpTextHp(cc.v2(0,0),'-'+(Math.random()*9000+1000).toFixed(0),Enemy_Injured_Type.BaoJi);        
    };
    ZXEdit.prototype.clickBtnTTT = function () {
        cc.director.loadScene('zhengxing');
    };
    ZXEdit.prototype.clickBtnDownload = function () {
        //获取
        var root = this.node.getChildByName('root');
        //获取所有子节点
        var otherPos = new Array();
        var bossPos = cc.v2(0, 0);
        var buffPos = new Array();
        var zhenRoot = root.children[0];
        var len = zhenRoot.childrenCount;
        for (var i = 0; i < len; i++) {
            var node = zhenRoot.children[i];
            var pos = cc.v2(node.x, node.y);
            if (node.name == '1') {
                otherPos.push(pos);
            }
            else if (node.name == 'boss') {
                bossPos = pos;
            }
            else if (node.name == 'buff') {
                buffPos.push(pos);
            }
        }
        var zxData = new ZhenXingData_1.ZhenXingData();
        zxData.boss_pos = bossPos;
        zxData.buff_pos = buffPos;
        zxData.other_pos = otherPos;
        var jsonData = JSON.stringify(zxData);
        var name = "ZX" + root.children[0].name;
        this.saveForBrowser(jsonData, name + ".json");
    };
    ZXEdit.prototype.clickBtnTest = function () {
        var m2 = this.node.getChildByName('Monster_02');
        this.node.getChildByName('Monster_01').getComponent(MonsterNormal_1.default).setAttTarget(m2);
    };
    ZXEdit.prototype.clickBtnTest1 = function () {
    };
    ZXEdit.prototype.saveForBrowser = function (textToWrite, fileNameToSaveAs) {
        if (cc.sys.isBrowser) {
            console.log("浏览器");
            var textFileAsBlob = new Blob([textToWrite], { type: 'application/json' });
            var downloadLink = document.createElement("a");
            downloadLink.download = fileNameToSaveAs;
            downloadLink.innerHTML = "Download File";
            if (window.webkitURL != null) {
                // Chrome allows the link to be clicked
                // without actually adding it to the DOM.
                downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
            }
            else {
                // Firefox requires the link to be added to the DOM
                // before it can be clicked.
                downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
                downloadLink.onclick = destroyClickedElement;
                downloadLink.style.display = "none";
                document.body.appendChild(downloadLink);
            }
            downloadLink.click();
        }
    };
    ZXEdit = __decorate([
        ccclass
    ], ZXEdit);
    return ZXEdit;
}(cc.Component));
exports.default = ZXEdit;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcWlhFZGl0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlEQUFvRDtBQUNwRCx5Q0FBd0M7QUFFeEMsNkNBQXdDO0FBQ3hDLCtDQUE4QztBQUM5Qyx5REFBc0Q7QUFDdEQscURBQW9EO0FBRTlDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQW9DLDBCQUFZO0lBQWhEOztJQWdJQSxDQUFDO0lBOUhhLHVCQUFNLEdBQWhCO1FBQ0ksRUFBRSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDakQsRUFBRSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLGdCQUFnQixHQUFDLElBQUksQ0FBQztJQUM1RCxDQUFDO0lBRVMsc0JBQUssR0FBZjtRQUNJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNaLHlCQUFXLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCxxQkFBSSxHQUFKO1FBQ0ksYUFBYTtRQUNiLDBFQUEwRTtRQUMxRSw4QkFBOEI7UUFDOUIsa0NBQWtDO1FBQ2xDLHlCQUF5QjtRQUN6QixvQkFBb0I7UUFDcEIseUJBQXlCO1FBQ3pCLE1BQU07UUFDTixJQUFJLE9BQU8sR0FBQyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ3ZCLElBQUksR0FBRyxHQUFDLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUMsSUFBSSxDQUFDO1FBQ2xDLElBQUksR0FBRyxHQUFDLElBQUksSUFBSSxFQUFFLENBQUMsY0FBYyxFQUFFLENBQUE7UUFDbkMsSUFBSSxFQUFFLEdBQUMsR0FBRyxHQUFDLENBQUMsRUFB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ZSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2FBQ3hFO2lCQUVEO2dCQUNJLG1EQUFtRDtnQkFDbkQsNEJBQTRCO2dCQUM1QixZQUFZLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUMvRCxZQUFZLENBQUMsT0FBTyxHQUFHLHFCQUFxQixDQUFDO2dCQUM3QyxZQUFZLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7Z0JBQ3BDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQzNDO1lBQ0QsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ3hCO0lBQ0wsQ0FBQztJQTlIZ0IsTUFBTTtRQUQxQixPQUFPO09BQ2EsTUFBTSxDQWdJMUI7SUFBRCxhQUFDO0NBaElELEFBZ0lDLENBaEltQyxFQUFFLENBQUMsU0FBUyxHQWdJL0M7a0JBaElvQixNQUFNIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE1vbnN0ZXJOb3JtYWwgZnJvbSBcIi4vTW9uc3Rlci9Nb25zdGVyTm9ybWFsXCI7XHJcbmltcG9ydCB7IEdhbWVTY2VuZSB9IGZyb20gXCIuL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBNb25zdGVyRGF0YU1hbmFnZXIgfSBmcm9tIFwiLi9Nb25zdGVyL0RhdGEvTW9uc3RlckRhdGFNYW5hZ2VyXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBaaGVuWGluZ0RhdGEgfSBmcm9tIFwiLi9aaGVuWGluZ0RhdGFcIjtcclxuaW1wb3J0IEhwVGV4dEhwTWFuYWdlciBmcm9tIFwiLi9Nb25zdGVyL0hwVGV4dE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgSHR0cE1hbmFnZXIgfSBmcm9tIFwiLi9OZXRXb3JrL0h0dHBNYW5hZ2VyXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFpYRWRpdCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uTG9hZCgpOiB2b2lkIHtcclxuICAgICAgICBjYy5kaXJlY3Rvci5nZXRDb2xsaXNpb25NYW5hZ2VyKCkuZW5hYmxlZCA9IHRydWU7ICAgICAgICBcclxuICAgICAgICBjYy5kaXJlY3Rvci5nZXRDb2xsaXNpb25NYW5hZ2VyKCkuZW5hYmxlZERlYnVnRHJhdz10cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBzdGFydCgpOiB2b2lkIHsgICAgICAgIFxyXG4gICAgICAgIHRoaXMuc2hvdygpO1xyXG4gICAgICAgIEh0dHBNYW5hZ2VyLnRlc3RBRVMoXCLlj6/ku6XlkJdcIik7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvdyAoKXtcclxuICAgICAgICAvLyBpbml0IGxvZ2ljXHJcbiAgICAgICAgLy8gbGV0IGxhYmVsPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnVGVzdExhYmVsJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICAvLyBsYWJlbC5zdHJpbmcgPSAndGhpcy50ZXh0JztcclxuICAgICAgICAvLyAgdGhpcy50ZXN0QXN5bmMoKS50aGVuKChzdHIpPT57XHJcbiAgICAgICAgLy8gICAgIGxhYmVsLnN0cmluZyA9c3RyO1xyXG4gICAgICAgIC8vIH0pLmNhdGNoKChzdHIpPT57XHJcbiAgICAgICAgLy8gICAgIGxhYmVsLnN0cmluZyA9c3RyO1xyXG4gICAgICAgIC8vIH0pO1xyXG4gICAgICAgIGxldCBub3dEYXRlPW5ldyBEYXRlKCk7XHJcbiAgICAgICAgbGV0IG5vdz1uZXcgRGF0ZSgpLmdldFRpbWUoKS8xMDAwO1xyXG4gICAgICAgIGxldCBzc049bmV3IERhdGUoKS50b0xvY2FsZVN0cmluZygpXHJcbiAgICAgICAgbGV0IHl1PW5vdyUoMjQqNjAqNjApO1xyXG4gICAgICAgIGxldCBsaW5nPW5vdy15dSsobm93RGF0ZS5nZXRUaW1lem9uZU9mZnNldCgpKjYwKTtcclxuICAgICAgICBsZXQgbG5nVGltZT1uZXcgRGF0ZShsaW5nKjEwMDApO1xyXG4gICAgICAgIGxldCBoPWxuZ1RpbWUuZ2V0SG91cnMoKTtcclxuICAgICAgICBsZXQgbT1sbmdUaW1lLmdldE1pbnV0ZXMoKTtcclxuICAgICAgICBsZXQgcz1sbmdUaW1lLmdldFNlY29uZHMoKTtcclxuICAgICAgICAvL2xldCBzczM9bG5nVGltZS50b1RpbWVTdHJpbmcoKVxyXG4gICAgfVxyXG4gXHJcbiAgICBhc3luYyB0ZXN0QXN5bmMoKSA6IFByb21pc2U8c3RyaW5nPiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPHN0cmluZz4oKHJlc29sdmUsIHJlamVjdCk9PntcclxuICAgICAgICAgICAgLy9yZXNvbHZlKFwibGlhbmcgbWlhbyB5aSBob3UgXCIpO1xyXG4gICAgICAgICAgICByZWplY3QoXCJhIG1pYW8geWkgaG91IFwiKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjbGlja0J0bkJvc3NTa2lsbCgpe1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfc2NlbmU9R2FtZVNjZW5lLmdhbWU7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93Qm9zc1dhcm5pbmcoKTtcclxuICAgIH1cclxuXHJcbiAgICBjbGlja0J0bkNCb3NzKCl7XHJcbiAgICAgICAgbGV0IHNzPWNjLmZpbmQoJ0NhbnZhcy9IUFRleHRfUm9vdCcpLmdldENvbXBvbmVudChIcFRleHRIcE1hbmFnZXIpO1xyXG4gICAgICAgIC8vIHNzLmNyZWF0ZUhwVGV4dEhwKGNjLnYyKDAsMCksJy0nKyhNYXRoLnJhbmRvbSgpKjkwMDArMTAwMCkudG9GaXhlZCgwKSxFbmVteV9Jbmp1cmVkX1R5cGUuTm9ybWFsX0F0dGFjayk7XHJcbiAgICAgICAgLy8gc3MuY3JlYXRlSHBUZXh0SHAoY2MudjIoMCwwKSwnLScrKE1hdGgucmFuZG9tKCkqOTAwMCsxMDAwKS50b0ZpeGVkKDApLEVuZW15X0luanVyZWRfVHlwZS5CYW9KaSk7ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBjbGlja0J0blRUVCgpe1xyXG4gICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZSgnemhlbmd4aW5nJyk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5Eb3dubG9hZCgpXHJcbiAgICB7XHJcbiAgICAgICAgLy/ojrflj5ZcclxuICAgICAgICBsZXQgcm9vdD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3Jvb3QnKTtcclxuICAgICAgICAvL+iOt+WPluaJgOacieWtkOiKgueCuVxyXG4gICAgICAgIGxldCBvdGhlclBvcz1uZXcgQXJyYXkoKTtcclxuICAgICAgICBsZXQgYm9zc1Bvcz1jYy52MigwLDApO1xyXG4gICAgICAgIGxldCBidWZmUG9zPW5ldyBBcnJheSgpO1xyXG4gICAgICAgIGxldCB6aGVuUm9vdD1yb290LmNoaWxkcmVuWzBdO1xyXG4gICAgICAgIGxldCBsZW49emhlblJvb3QuY2hpbGRyZW5Db3VudDtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTxsZW47IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCBub2RlPXpoZW5Sb290LmNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICBsZXQgcG9zPWNjLnYyKG5vZGUueCxub2RlLnkpO1xyXG4gICAgICAgICAgICBpZihub2RlLm5hbWU9PScxJylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgb3RoZXJQb3MucHVzaChwb3MpO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZihub2RlLm5hbWU9PSdib3NzJylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYm9zc1Bvcz1wb3M7XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKG5vZGUubmFtZT09J2J1ZmYnKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBidWZmUG9zLnB1c2gocG9zKTtcclxuICAgICAgICAgICAgfSAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgenhEYXRhPW5ldyBaaGVuWGluZ0RhdGEoKTtcclxuICAgICAgICB6eERhdGEuYm9zc19wb3M9Ym9zc1BvcztcclxuICAgICAgICB6eERhdGEuYnVmZl9wb3M9YnVmZlBvcztcclxuICAgICAgICB6eERhdGEub3RoZXJfcG9zPW90aGVyUG9zO1xyXG4gICAgICAgIHZhciBqc29uRGF0YT1KU09OLnN0cmluZ2lmeSh6eERhdGEpO1xyXG4gICAgICAgIGxldCBuYW1lPVwiWlhcIityb290LmNoaWxkcmVuWzBdLm5hbWU7XHJcbiAgICAgICAgdGhpcy5zYXZlRm9yQnJvd3Nlcihqc29uRGF0YSxuYW1lK1wiLmpzb25cIik7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5UZXN0KClcclxuICAgIHtcclxuICAgICAgICBsZXQgbTI9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdNb25zdGVyXzAyJylcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ01vbnN0ZXJfMDEnKS5nZXRDb21wb25lbnQoTW9uc3Rlck5vcm1hbCkuc2V0QXR0VGFyZ2V0KG0yKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5UZXN0MSgpXHJcbiAgICB7XHJcblxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHNhdmVGb3JCcm93c2VyKHRleHRUb1dyaXRlLCBmaWxlTmFtZVRvU2F2ZUFzKSB7XHJcbiAgICAgICAgaWYgKGNjLnN5cy5pc0Jyb3dzZXIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLmtY/op4jlmahcIik7XHJcbiAgICAgICAgICAgIGxldCB0ZXh0RmlsZUFzQmxvYiA9IG5ldyBCbG9iKFt0ZXh0VG9Xcml0ZV0sIHt0eXBlOidhcHBsaWNhdGlvbi9qc29uJ30pO1xyXG4gICAgICAgICAgICBsZXQgZG93bmxvYWRMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XHJcbiAgICAgICAgICAgIGRvd25sb2FkTGluay5kb3dubG9hZCA9IGZpbGVOYW1lVG9TYXZlQXM7XHJcbiAgICAgICAgICAgIGRvd25sb2FkTGluay5pbm5lckhUTUwgPSBcIkRvd25sb2FkIEZpbGVcIjtcclxuICAgICAgICAgICAgaWYgKHdpbmRvdy53ZWJraXRVUkwgIT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy8gQ2hyb21lIGFsbG93cyB0aGUgbGluayB0byBiZSBjbGlja2VkXHJcbiAgICAgICAgICAgICAgICAvLyB3aXRob3V0IGFjdHVhbGx5IGFkZGluZyBpdCB0byB0aGUgRE9NLlxyXG4gICAgICAgICAgICAgICAgZG93bmxvYWRMaW5rLmhyZWYgPSB3aW5kb3cud2Via2l0VVJMLmNyZWF0ZU9iamVjdFVSTCh0ZXh0RmlsZUFzQmxvYik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvLyBGaXJlZm94IHJlcXVpcmVzIHRoZSBsaW5rIHRvIGJlIGFkZGVkIHRvIHRoZSBET01cclxuICAgICAgICAgICAgICAgIC8vIGJlZm9yZSBpdCBjYW4gYmUgY2xpY2tlZC5cclxuICAgICAgICAgICAgICAgIGRvd25sb2FkTGluay5ocmVmID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwodGV4dEZpbGVBc0Jsb2IpO1xyXG4gICAgICAgICAgICAgICAgZG93bmxvYWRMaW5rLm9uY2xpY2sgPSBkZXN0cm95Q2xpY2tlZEVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICBkb3dubG9hZExpbmsuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkb3dubG9hZExpbmspO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRvd25sb2FkTGluay5jbGljaygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuIl19