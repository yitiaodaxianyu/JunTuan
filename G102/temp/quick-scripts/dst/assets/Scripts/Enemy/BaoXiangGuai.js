
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Enemy/BaoXiangGuai.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcRW5lbXlcXEJhb1hpYW5nR3VhaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSw2Q0FBZ0U7QUFHMUQsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBMEMsZ0NBQVk7SUFBdEQ7UUFBQSxxRUEwR0M7UUF2R0csZ0JBQVUsR0FBZ0IsSUFBSSxDQUFDO1FBQy9CLE1BQU07UUFDTixXQUFLLEdBQWEsSUFBSSxDQUFDO1FBQ3ZCLFdBQUssR0FBUSxDQUFDLENBQUM7UUFDZixnQkFBVSxHQUFRLEdBQUcsQ0FBQztRQUN0QixvQkFBYyxHQUFRLElBQUksQ0FBQyxFQUFFLEdBQUMsQ0FBQyxDQUFDO1FBQ2hDLGdCQUFVLEdBQVMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7O0lBaUdsQyxDQUFDO0lBL0ZHLDJCQUFJLEdBQUo7UUFFSSw2QkFBNkI7UUFDN0IsNkNBQTZDO1FBQzdDLDhDQUE4QztRQUM5QyxrREFBa0Q7UUFDbEQsdUNBQXVDO1FBQ3ZDLHdEQUF3RDtRQUN4RCxRQUFRO1FBQ1Isc0RBQXNEO1FBQ3RELGlDQUFpQztRQUNqQyxRQUFRO1FBQ1IscURBQXFEO1FBQ3JELFFBQVE7UUFDUixtREFBbUQ7UUFDbkQseURBQXlEO1FBQ3pELHdCQUF3QjtRQUN4QixRQUFRO1FBQ1Isc0RBQXNEO1FBQ3RELFFBQVE7UUFDUixtREFBbUQ7UUFDbkQsd0JBQXdCO1FBQ3hCLFFBQVE7UUFDUixtREFBbUQ7UUFDbkQsUUFBUTtRQUNSLDRCQUE0QjtRQUM1QixZQUFZO1FBQ1osdURBQXVEO1FBQ3ZELFlBQVk7UUFDWixRQUFRO1FBQ1IseURBQXlEO1FBQ3pELFdBQVc7UUFFWCxXQUFXO1FBQ1gsTUFBTTtRQUNOLGdEQUFnRDtRQUNoRCw0QkFBNEI7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aWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHsgQmFvWGlhbmdfQW5pbWEsIEVuZW15X0J1ZmZfVHlwZSB9IGZyb20gXCIuL0VuZW15Q29uZmlnXCI7XHJcblxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYW9YaWFuZ0d1YWkgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGVBdGxhcylcclxuICAgIGljb25fYXRsYXM6Y2MuU3ByaXRlQXRsYXM9bnVsbDtcclxuICAgIC8v6aqo6aq85Yqo55S7XHJcbiAgICBzcGluZTpzcC5Ta2VsZXRvbj1udWxsO1xyXG4gICAgc3RhdGU6bnVtYmVyPTA7XHJcbiAgICBtb3ZlX3NwZWVkOm51bWJlcj0zMDA7XHJcbiAgICBtb3ZlX2RpcmVjdGlvbjpudW1iZXI9TWF0aC5QSS8yO1xyXG4gICAgdGFyZ2V0X3BvczpjYy5WZWMyPWNjLnYyKDAsMCk7XHJcblxyXG4gICAgaW5pdCgpXHJcbiAgICB7XHJcbiAgICAgICAgLy8gdGhpcy5sZXZlbF9idWZmPWxldmVsQnVmZjtcclxuICAgICAgICAvLyBsZXQgZW5lbXlUcz10aGlzLm5vZGUuZ2V0Q29tcG9uZW50KEVuZW15KTtcclxuICAgICAgICAvLyBlbmVteVRzLmFkZEVuZW15QnVmZihFbmVteV9CdWZmX1R5cGUud3VkaSk7XHJcbiAgICAgICAgLy8gdGhpcy5zcGluZT10aGlzLm5vZGUuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcclxuICAgICAgICAvLyB0aGlzLnNwaW5lLnNldENvbXBsZXRlTGlzdGVuZXIoKCk9PntcclxuICAgICAgICAvLyAgICAgaWYodGhpcy5zcGluZS5hbmltYXRpb249PUJhb1hpYW5nX0FuaW1hLmJpYW54aW5nKVxyXG4gICAgICAgIC8vICAgICB7XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLnNwaW5lLmFuaW1hdGlvbj1CYW9YaWFuZ19BbmltYS5kYWlqaTsgXHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLnNwaW5lLmxvb3A9ZmFsc2U7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyAgICAgaWYodGhpcy5zcGluZS5hbmltYXRpb249PUJhb1hpYW5nX0FuaW1hLmRhaWppKVxyXG4gICAgICAgIC8vICAgICB7XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLnNwaW5lLmFuaW1hdGlvbj1CYW9YaWFuZ19BbmltYS5wYW87XHJcbiAgICAgICAgLy8gICAgICAgICBlbmVteVRzLnJlbW92ZUVuZW15QnVmZihFbmVteV9CdWZmX1R5cGUud3VkaSk7XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLnN0YXRlPTE7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyAgICAgaWYodGhpcy5zcGluZS5hbmltYXRpb249PUJhb1hpYW5nX0FuaW1hLmdvbmdqaSlcclxuICAgICAgICAvLyAgICAge1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5zcGluZS5hbmltYXRpb249QmFvWGlhbmdfQW5pbWEucGFvO1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5zdGF0ZT0xO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gICAgIGlmKHRoaXMuc3BpbmUuYW5pbWF0aW9uPT1CYW9YaWFuZ19BbmltYS5wYW8pXHJcbiAgICAgICAgLy8gICAgIHtcclxuICAgICAgICAvLyAgICAgICAgIGlmKHRoaXMuc3RhdGU9PTEpXHJcbiAgICAgICAgLy8gICAgICAgICB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgdGhpcy5zcGluZS5hbmltYXRpb249QmFvWGlhbmdfQW5pbWEucGFvO1xyXG4gICAgICAgIC8vICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gICAgIC8vIGlmKHRoaXMuc3BpbmUuYW5pbWF0aW9uPT1CYW9YaWFuZ19BbmltYS5zaXdhbmcpXHJcbiAgICAgICAgLy8gICAgIC8vIHtcclxuXHJcbiAgICAgICAgLy8gICAgIC8vIH1cclxuICAgICAgICAvLyB9KTtcclxuICAgICAgICAvLyB0aGlzLnNwaW5lLmFuaW1hdGlvbj1CYW9YaWFuZ19BbmltYS5iaWFueGluZztcclxuICAgICAgICAvLyB0aGlzLnNwaW5lLmxvb3A9ZmFsc2U7ICAgXHJcbiAgICAgICAgLy8gdGhpcy5zdGF0ZT0wO1xyXG4gICAgICAgIC8vIHRoaXMudGFyZ2V0X3Bvcz1jYy52MihNYXRoLnJhbmRvbSgpKjUxMi0yNTYsTWF0aC5yYW5kb20oKSo2NjAtMTgwKTsgXHJcbiAgICB9XHJcblxyXG4gICAgZGVzdHJveVNlbGYoKTpib29sZWFuXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5zcGluZS5hbmltYXRpb249QmFvWGlhbmdfQW5pbWEuc2l3YW5nO1xyXG4gICAgICAgIHRoaXMuc3RhdGU9MDtcclxuICAgICAgICAvL+eIhuS4nOilv+WHuuadpVxyXG4gICAgICAgIHRoaXMuY3JlYXRlU2tpbGxJY29uKCk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZVNraWxsSWNvbigpXHJcbiAgICB7XHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIC8vR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5iYW94aWFuZ0RpZSgpOyAgICAgICBcclxuICAgIH0gICAgXHJcblxyXG5cclxuXHJcbiAgICBnZXRQaW5aaVNwKHF1YWxpdHk6bnVtYmVyKTpjYy5TcHJpdGVGcmFtZVxyXG4gICAgeyAgICAgICBcclxuICAgICAgICByZXR1cm4gdGhpcy5pY29uX2F0bGFzLmdldFNwcml0ZUZyYW1lKCdHYW1lX1NraWxsX0ZyYW1lXycrKHF1YWxpdHktMSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZSAoZHQ6bnVtYmVyKSB7XHJcbiAgICAgICAgaWYodGhpcy5zdGF0ZT09MSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCBzcD10aGlzLm1vdmVfc3BlZWQqZHQ7XHJcbiAgICAgICAgICAgIC8v6LeR6LW35p2lXHJcbiAgICAgICAgICAgIGxldCBvZmZzZXRQb3M9dGhpcy50YXJnZXRfcG9zLnN1Yih0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKSk7XHJcbiAgICAgICAgICAgIGlmKG9mZnNldFBvcy5tYWcoKTxzcClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy/liLDovr7nm67moIflnLDngrnvvIzmjaLkuKrlnLDngrlcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGU9MDtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3BpbmUuYW5pbWF0aW9uPUJhb1hpYW5nX0FuaW1hLmdvbmdqaTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3BpbmUubG9vcD1mYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0X3Bvcz1jYy52MihNYXRoLnJhbmRvbSgpKjUxMi0yNTYsTWF0aC5yYW5kb20oKSo1MDAtMTgwKTtcclxuICAgICAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGV0IHBpMj1NYXRoLlBJKjI7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGlyPShNYXRoLmF0YW4yKG9mZnNldFBvcy55LG9mZnNldFBvcy54KStwaTIpJXBpMjtcclxuICAgICAgICAgICAgICAgIGxldCBkaXNYPXRoaXMubm9kZS54K3NwKk1hdGguY29zKGRpcik7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGlzWT10aGlzLm5vZGUueStzcCpNYXRoLnNpbihkaXIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLng9ZGlzWDtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS55PWRpc1k7XHJcbiAgICAgICAgICAgICAgICBpZihkaXI+PU1hdGguUEkvMiAmJiBkaXI8PU1hdGguUEkqMy8yKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zY2FsZVg9MTtcclxuICAgICAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLnNjYWxlWD0tMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=