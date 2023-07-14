"use strict";
cc._RF.push(module, '1d683PiJjVH+5kAU5VxbW+O', 'BossHpProgressBar');
// Scripts/Boss/BossHpProgressBar.ts

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
var MonsterConfigure_1 = require("../Monster/Data/MonsterConfigure");
var MonsterIconManager_1 = require("../Monster/MonsterIconManager");
var LanguageManager_1 = require("../multiLanguage/LanguageManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BossHpProgressBar = /** @class */ (function (_super) {
    __extends(BossHpProgressBar, _super);
    function BossHpProgressBar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sp_hp = [];
        _this.yellow = null;
        _this.next_bar = null;
        /**初始速度 */
        _this.speed = 56;
        /**当前速度 */
        _this.cur_speed = 56;
        /**血条条数 */
        _this.cur_hp_num = 0;
        _this.hp_num_label = null;
        /**最大的血量值 */
        _this.max_hp = 0;
        /**当前的血量值 */
        _this.cur_hp = 0;
        /**每条血条的血量 */
        _this.once_hp = 0;
        /**加速度，死亡时有效 */
        _this.acc_speed = 640;
        return _this;
    }
    BossHpProgressBar.prototype.onLoad = function () {
        this.yellow = this.node.getChildByName('yellow');
        this.hp_num_label = this.node.getChildByName('hpNum').getComponent(cc.Label);
        this.next_bar = this.node.getChildByName('nextBar').getComponent(cc.Sprite);
    };
    BossHpProgressBar.prototype.init = function (maxHp, monsterId, level) {
        this.max_hp = maxHp;
        this.once_hp = this.max_hp / 30;
        this.yellow.width = 0;
        this.setHp(this.max_hp);
        var nameLabel = this.node.getChildByName('name').getComponent(cc.Label);
        nameLabel.string = 'Lv.' + level + ' ' + LanguageManager_1.default.getInstance().getStrByTextId(MonsterConfigure_1.MonsterConfigureManager.getInstance().getNameTextId(monsterId));
        this.node.active = true;
        //图标
        var icon = this.node.getChildByName('icon');
        icon.getComponent(cc.Sprite).spriteFrame = MonsterIconManager_1.MonsterIconManager.getInstance().getSpByMonsterId(monsterId);
        this.cur_speed = this.speed;
    };
    BossHpProgressBar.prototype.setHp = function (num) {
        this.cur_hp = num;
        //直接算出当前的血条数和进度
        var curHpNum = Math.floor(this.cur_hp / this.once_hp);
        if (curHpNum < 0) {
            curHpNum = 0;
        }
        if (curHpNum != this.cur_hp_num) {
            this.yellow.width = this.totalLength;
        }
        this.cur_hp_num = curHpNum;
        var remain = (this.cur_hp - (this.once_hp * curHpNum));
        this.progress = remain / this.once_hp;
        this.hp_num_label.string = 'x' + this.cur_hp_num;
        this.barSprite.spriteFrame = this.sp_hp[this.cur_hp_num % 5];
        if (this.cur_hp_num >= 1) {
            this.next_bar.spriteFrame = this.sp_hp[(this.cur_hp_num - 1) % 5];
        }
        this.next_bar.node.active = this.cur_hp_num >= 1;
    };
    //显示白色色
    BossHpProgressBar.prototype.update = function (dt) {
        var curWidth = this.progress * this.totalLength;
        if (this.yellow.width > curWidth) {
            if (this.cur_hp <= 0) {
                this.cur_speed += dt * this.acc_speed;
            }
            this.yellow.width -= this.cur_speed * dt;
            if (this.yellow.width < curWidth) {
                this.yellow.width = curWidth;
            }
            if (this.yellow.width <= 0) {
                this.node.active = false;
            }
        }
        else if (this.yellow.width < curWidth && this.yellow.width > 0) {
            if (curWidth <= 0) {
                curWidth = 0;
                this.node.active = false;
            }
            this.yellow.width = curWidth;
        }
    };
    __decorate([
        property([cc.SpriteFrame])
    ], BossHpProgressBar.prototype, "sp_hp", void 0);
    __decorate([
        property()
    ], BossHpProgressBar.prototype, "speed", void 0);
    BossHpProgressBar = __decorate([
        ccclass
    ], BossHpProgressBar);
    return BossHpProgressBar;
}(cc.ProgressBar));
exports.default = BossHpProgressBar;

cc._RF.pop();