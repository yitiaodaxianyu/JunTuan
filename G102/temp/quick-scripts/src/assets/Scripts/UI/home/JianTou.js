"use strict";
cc._RF.push(module, '90fc5isqodKz4y0kphbSIwv', 'JianTou');
// Scripts/UI/home/JianTou.ts

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
var Constants_1 = require("../../Constants");
var GameManager_1 = require("../../GameManager");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var MainUi_1 = require("./MainUi");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var JianTou_Dir;
(function (JianTou_Dir) {
    JianTou_Dir[JianTou_Dir["UP"] = 0] = "UP";
    JianTou_Dir[JianTou_Dir["DOWN"] = 1] = "DOWN";
})(JianTou_Dir || (JianTou_Dir = {}));
var JianTou = /** @class */ (function (_super) {
    __extends(JianTou, _super);
    function JianTou() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.cur_jiantou_type = Constants_1.JianTou_Type.LEFT;
        _this.cur_jiantou_dir = JianTou_Dir.DOWN;
        _this.follow_target = null;
        //遮罩
        _this.mask_btns = null;
        return _this;
    }
    JianTou.prototype.onLoad = function () {
        this.follow_target = this.node.parent;
        this.mask_btns = this.follow_target.getChildByName('btns');
        // this.clickBtnJiantou();
    };
    JianTou.prototype.onEnable = function () {
        //this.setDir(JianTou_Dir.DOWN);
    };
    JianTou.prototype.setDir = function (dir) {
        switch (dir) {
            case JianTou_Dir.UP:
                {
                    this.node.angle = 0;
                    this.cur_jiantou_dir = JianTou_Dir.UP;
                }
                break;
            case JianTou_Dir.DOWN:
                {
                    this.node.angle = 180;
                    this.cur_jiantou_dir = JianTou_Dir.DOWN;
                }
                break;
        }
    };
    JianTou.prototype.clickBtnJiantou = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        var mainUi = cc.find('Canvas/main_ui').getComponent(MainUi_1.default);
        switch (this.cur_jiantou_type) {
            case Constants_1.JianTou_Type.LEFT:
                {
                    switch (this.cur_jiantou_dir) {
                        case JianTou_Dir.UP:
                            {
                                this.setDir(JianTou_Dir.DOWN);
                                mainUi.doFolded(this.cur_jiantou_type);
                            }
                            break;
                        case JianTou_Dir.DOWN:
                            {
                                this.setDir(JianTou_Dir.UP);
                                mainUi.doUnfold(this.cur_jiantou_type);
                            }
                            break;
                    }
                }
                break;
            case Constants_1.JianTou_Type.RIGHT:
                {
                    switch (this.cur_jiantou_dir) {
                        case JianTou_Dir.UP:
                            {
                                this.setDir(JianTou_Dir.DOWN);
                                mainUi.doFolded(this.cur_jiantou_type);
                            }
                            break;
                        case JianTou_Dir.DOWN:
                            {
                                this.setDir(JianTou_Dir.UP);
                                mainUi.doUnfold(this.cur_jiantou_type);
                            }
                            break;
                    }
                }
                break;
        }
    };
    JianTou.prototype.update = function () {
        if (this.follow_target) {
            this.node.y = -this.follow_target.height + 48;
            if (this.mask_btns) {
                this.mask_btns.height = this.follow_target.height; //有箭头需要减去箭头的高度
            }
        }
    };
    __decorate([
        property({ type: cc.Enum(Constants_1.JianTou_Type) })
    ], JianTou.prototype, "cur_jiantou_type", void 0);
    JianTou = __decorate([
        ccclass
    ], JianTou);
    return JianTou;
}(cc.Component));
exports.default = JianTou;

cc._RF.pop();