"use strict";
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