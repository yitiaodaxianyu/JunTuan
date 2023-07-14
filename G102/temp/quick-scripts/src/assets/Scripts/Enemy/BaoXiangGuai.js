"use strict";
cc._RF.push(module, '24dd2K3eFhDBpIk4P7sFvtk', 'BaoXiangGuai');
// Scripts/Enemy/BaoXiangGuai.ts

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
var EnemyConfig_1 = require("./EnemyConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BaoXiangGuai = /** @class */ (function (_super) {
    __extends(BaoXiangGuai, _super);
    function BaoXiangGuai() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.icon_atlas = null;
        //骨骼动画
        _this.spine = null;
        _this.state = 0;
        _this.move_speed = 300;
        _this.move_direction = Math.PI / 2;
        _this.target_pos = cc.v2(0, 0);
        return _this;
    }
    BaoXiangGuai.prototype.init = function () {
        // this.level_buff=levelBuff;
        // let enemyTs=this.node.getComponent(Enemy);
        // enemyTs.addEnemyBuff(Enemy_Buff_Type.wudi);
        // this.spine=this.node.getComponent(sp.Skeleton);
        // this.spine.setCompleteListener(()=>{
        //     if(this.spine.animation==BaoXiang_Anima.bianxing)
        //     {
        //         this.spine.animation=BaoXiang_Anima.daiji; 
        //         this.spine.loop=false;
        //     }
        //     if(this.spine.animation==BaoXiang_Anima.daiji)
        //     {
        //         this.spine.animation=BaoXiang_Anima.pao;
        //         enemyTs.removeEnemyBuff(Enemy_Buff_Type.wudi);
        //         this.state=1;
        //     }
        //     if(this.spine.animation==BaoXiang_Anima.gongji)
        //     {
        //         this.spine.animation=BaoXiang_Anima.pao;
        //         this.state=1;
        //     }
        //     if(this.spine.animation==BaoXiang_Anima.pao)
        //     {
        //         if(this.state==1)
        //         {
        //             this.spine.animation=BaoXiang_Anima.pao;
        //         }
        //     }
        //     // if(this.spine.animation==BaoXiang_Anima.siwang)
        //     // {
        //     // }
        // });
        // this.spine.animation=BaoXiang_Anima.bianxing;
        // this.spine.loop=false;   
        // this.state=0;
        // this.target_pos=cc.v2(Math.random()*512-256,Math.random()*660-180); 
    };
    BaoXiangGuai.prototype.destroySelf = function () {
        this.spine.animation = EnemyConfig_1.BaoXiang_Anima.siwang;
        this.state = 0;
        //爆东西出来
        this.createSkillIcon();
        return false;
    };
    BaoXiangGuai.prototype.createSkillIcon = function () {
        //GameManager.getInstance().baoxiangDie();       
    };
    BaoXiangGuai.prototype.getPinZiSp = function (quality) {
        return this.icon_atlas.getSpriteFrame('Game_Skill_Frame_' + (quality - 1));
    };
    BaoXiangGuai.prototype.update = function (dt) {
        if (this.state == 1) {
            var sp = this.move_speed * dt;
            //跑起来
            var offsetPos = this.target_pos.sub(this.node.getPosition());
            if (offsetPos.mag() < sp) {
                //到达目标地点，换个地点
                this.state = 0;
                this.spine.animation = EnemyConfig_1.BaoXiang_Anima.gongji;
                this.spine.loop = false;
                this.target_pos = cc.v2(Math.random() * 512 - 256, Math.random() * 500 - 180);
            }
            else {
                var pi2 = Math.PI * 2;
                var dir = (Math.atan2(offsetPos.y, offsetPos.x) + pi2) % pi2;
                var disX = this.node.x + sp * Math.cos(dir);
                var disY = this.node.y + sp * Math.sin(dir);
                this.node.x = disX;
                this.node.y = disY;
                if (dir >= Math.PI / 2 && dir <= Math.PI * 3 / 2) {
                    this.node.scaleX = 1;
                }
                else {
                    this.node.scaleX = -1;
                }
            }
        }
    };
    __decorate([
        property(cc.SpriteAtlas)
    ], BaoXiangGuai.prototype, "icon_atlas", void 0);
    BaoXiangGuai = __decorate([
        ccclass
    ], BaoXiangGuai);
    return BaoXiangGuai;
}(cc.Component));
exports.default = BaoXiangGuai;

cc._RF.pop();