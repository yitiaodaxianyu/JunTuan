
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Hero/Game/RenZhe/FeiBiao.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e1e63fyT+xHGIQOqtzXrdwX', 'FeiBiao');
// Scripts/Hero/Game/RenZhe/FeiBiao.ts

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
var Constants_1 = require("../../../Constants");
var GameEffectsManager_1 = require("../../../Game/GameEffectsManager");
var GameManager_1 = require("../../../GameManager");
var Monster_1 = require("../../../Monster/Monster");
var MonsterManager_1 = require("../../../Monster/MonsterManager");
var AudioConstants_1 = require("../../../Sound/AudioConstants");
var GongJi_1 = require("../GongJi");
var HeroConfig_1 = require("../HeroConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var FeiBiao = /** @class */ (function (_super) {
    __extends(FeiBiao, _super);
    function FeiBiao() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.tuowei = null;
        _this.game_effect_id = 0;
        //飞镖经过的路径记录
        //feibiao_pos:cc.Vec2[]=[];
        //飞镖旋转记录
        //feibiao_angle:number[]=[];
        //影子节点
        //shadow_node:cc.Node=null;
        _this.move_speed = 1200;
        _this.move_direction = Math.PI / 2;
        //旋转速度
        _this.xuanzhuan_speed = 600;
        //弹射弹射次数
        _this.cur_tanshe_num = 6;
        _this.max_tanshe_num = 0;
        //记录弹射过的目标，防止重复弹射
        _this.tanshe_yes = [];
        //目标
        _this.target = null;
        _this.cur_tanshe_rate = 1;
        _this.shanghai = 1;
        _this.tuo_wei = null;
        return _this;
        ////--------------------------------------碰撞开始----------------------------------------------------
        //  onCollisionEnter(other:cc.Collider,self:cc.Collider) {
        //     let gm=GameManager.getInstance();        
        //     if(gm.cur_game_state==GameState.Game_Lose)
        //         return;
        //     let group=other.node.group;
        //     switch(group){
        //         case 'wall':{
        //             this.collisionToWall(other.node.name);
        //         }
        //     }
        // }
    }
    FeiBiao.prototype.onLoad = function () {
        //this.addShadow();
    };
    FeiBiao.prototype.init = function (gameEffectId, gjData, speed, target, tansheNum) {
        _super.prototype.initData.call(this, gjData);
        this.game_effect_id = gameEffectId;
        this.move_speed = speed;
        this.cur_tanshe_rate = 1;
        this.max_tanshe_num = this.cur_tanshe_num = tansheNum + 1;
        this.node.color = cc.Color.WHITE;
        this.node.opacity = 255;
        //重置飞镖弹射数据
        this.tanshe_yes.splice(0);
        if (typeof target == "number") {
            this.changeDir(target);
        }
        else {
            this.target = target;
            this.tanshe_yes.push(target.uuid);
            var offsetPos = this.target.getPosition().sub(this.node.getPosition());
            var pi2 = Math.PI * 2;
            this.move_direction = (Math.atan2(offsetPos.y, offsetPos.x) + pi2) % pi2;
        }
        // if(this.shadow_node)
        // {
        //     this.shadow_node.active=true;
        //     this.shadow_node.opacity=this.node.opacity/2;            
        // }
        this.tuo_wei = cc.instantiate(this.tuowei);
        this.tuo_wei.parent = this.node.parent;
        this.node.zIndex = 1;
    };
    //添加影子
    // addShadow()
    // {
    //     if(this.shadow_node==null)
    //     {
    //         this.node.zIndex=this.node.zIndex-1;
    //         this.shadow_node=new cc.Node('feibiaoShadow');
    //         this.shadow_node.parent=this.node.parent;
    //         this.shadow_node.addComponent(cc.Sprite).spriteFrame=this.node.getComponent(cc.Sprite).spriteFrame;
    //         this.shadow_node.setPosition(this.node.getPosition());
    //         this.shadow_node.opacity=100;
    //         this.shadow_node.color=cc.Color.GRAY;
    //         this.shadow_node.scale=this.node.scale;
    //         this.feibiao_pos=new Array(3);
    //         let len=this.feibiao_pos.length;
    //         for(let i=0; i<len; i++)
    //         {
    //             this.feibiao_pos[i]=this.node.getPosition();
    //             this.feibiao_angle[i]=this.node.angle;
    //         }
    //     }                
    // }
    //删除
    // removeShadow()
    // {
    //     if(this.shadow_node!=null)
    //     {
    //         this.shadow_node.removeFromParent();
    //         this.shadow_node=null;
    //     }                
    // }
    FeiBiao.prototype.tanshe = function () {
        var curMonsterTs = this.target.getComponent(Monster_1.default);
        if (curMonsterTs) {
            //let heroData=GameManager.getInstance().game_hero_data[Hero_Type.RenZhe];   
            var heroData = GameManager_1.default.getInstance().game_hero_data.get(HeroConfig_1.Hero_Type.PaoShou);
            //如果有格挡护盾
            // if(curMonsterTs.isHaveBuff(Enemy_Buff_Type.hudun))
            // {
            //     //结束弹射
            //     this.cur_tanshe_num=0;
            //     this.gongji_data.hero_data.att_rate=this.cur_tanshe_rate;
            //     curMonsterTs.beFlashInjured(this.gongji_data);
            //     return;
            // }
            GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_RenzheAttack);
            //this.gongji_data.hero_data.att_rate=this.cur_tanshe_rate;
            var data = curMonsterTs.beFlashInjured(this.gongji_data);
            if (!data.is_die && data.getDamageNum() > 0) {
                //减速
                // curMonsterTs.addDeBuff(Enemy_DeBuff_Type.JianSu_RenZhe_EX_Skill,{
                //     /**持续剩余时间 */
                //     remain_time:heroData.ExclusiveWeaponSkillValue_3,
                //     /**每次触发的伤害值 */
                //     damage_num:0,
                //     /**触发伤害的时间间隔 */
                //     jiange_time:0.2,
                //     other_value_1:heroData.ExclusiveWeaponSkillValue_2,
                //     hero_type:Hero_Type.RenZhe,                    
                // },this.gongji_data)
            }
            //普攻递增伤害
            this.cur_tanshe_rate = (1 + heroData.getSkillValue2(HeroConfig_1.SkillType.Passive_1));
            // GameEffectsManager.getInstance().createGameEffectById(GameEffectId.renzhe_feibiao_hit,this.node.getPosition());            
            //查找弹射新目标
            this.target = this.getMonster();
            if (this.target) {
                this.tanshe_yes.push(this.target.uuid);
            }
            else {
                if (this.tanshe_yes.length > 2) {
                    this.tanshe_yes.splice(0, this.tanshe_yes.length - 1);
                }
                else {
                    this.cur_tanshe_num = 0;
                }
            }
            //完成弹射
            this.cur_tanshe_num--;
        }
    };
    FeiBiao.prototype.getMonster = function () {
        var em = MonsterManager_1.default.getInstance();
        if (em.node.childrenCount <= 0) {
            return null;
        }
        var pos = this.node.getPosition();
        //1.先检测在攻击范围内符合攻击单位的敌人
        var attMonsters = [];
        for (var _i = 0, _a = em.node.children; _i < _a.length; _i++) {
            var enemy = _a[_i];
            var enemyPos = cc.v2(enemy.x, enemy.y + enemy.height / 2);
            var enemyTS = enemy.getComponent(Monster_1.default);
            if (enemyTS.getIsCanCheck() == true) {
                var distance = pos.sub(enemyPos).mag();
                if (this.getIsTanShe(enemy.uuid) == false && distance <= 500) {
                    attMonsters.push(enemy);
                }
            }
        }
        if (attMonsters.length <= 0) {
            return null;
        }
        if (1 == attMonsters.length) {
            return attMonsters[0];
        }
        //2.1优先攻击跟目标位置最近的单位
        attMonsters.sort(function (a, b) {
            return cc.v2(a.x, a.y + a.height / 2).sub(pos).mag() - cc.v2(b.x, b.y + b.height / 2).sub(pos).mag();
        });
        return attMonsters[0];
    };
    //飞行途中目标丢失时
    FeiBiao.prototype.getMonsterForMiss = function () {
        var em = MonsterManager_1.default.getInstance();
        if (em.node.childrenCount <= 0) {
            return null;
        }
        var pos = this.node.getPosition();
        //1.先检测在攻击范围内符合攻击单位的敌人
        var attMonsters = [];
        for (var _i = 0, _a = em.node.children; _i < _a.length; _i++) {
            var enemy = _a[_i];
            var enemyPos = cc.v2(enemy.x, enemy.y + enemy.height / 2);
            var enemyTS = enemy.getComponent(Monster_1.default);
            if (enemyTS.getIsCanCheck() == true) {
                var distance = pos.sub(enemyPos).mag();
                //let width=enemy.width/2*enemy.scaleX+this.node.width/2*this.node.scaleX;                
                if (this.getIsTanShe(enemy.uuid) == false && distance <= 500) {
                    attMonsters.push(enemy);
                }
            }
        }
        if (attMonsters.length <= 0) {
            return null;
        }
        if (1 == attMonsters.length) {
            return attMonsters[0];
        }
        //2.1优先攻击跟目标位置最近的单位
        attMonsters.sort(function (a, b) {
            return cc.v2(a.x, a.y + a.height / 2).sub(pos).mag() - cc.v2(b.x, b.y + b.height / 2).sub(pos).mag();
        });
        return attMonsters[0];
    };
    FeiBiao.prototype.getIsTanShe = function (uid) {
        return this.tanshe_yes.includes(uid);
    };
    FeiBiao.prototype.setNewTarget = function (enemy) {
        if (this.cur_tanshe_num > 0 && this.target == null) {
            if (this.getIsTanShe(enemy.uuid) == false) {
                this.target = enemy;
            }
        }
    };
    FeiBiao.prototype.changeDir = function (dir) {
        this.move_direction = (dir + Math.PI * 2) % (Math.PI * 2);
    };
    FeiBiao.prototype.collisionToWall = function (wallName) {
        // if(wallName=='wall_left' || wallName=='wall_right')
        // {
        //     this.changeDir((Math.PI-this.move_direction));
        //     this.cur_tanshe_num--;
        // }
        // if(wallName=='wall_top')
        // {
        //     this.changeDir((2*Math.PI-this.move_direction));
        //     this.cur_tanshe_num--;
        // }
        // if(wallName=='wall_down')
        // {
        //     //先判断当前方向
        //     let dir=this.move_direction%(Math.PI*2);
        //     if(dir>Math.PI && dir<2*Math.PI)
        //     {                
        //         this.changeDir((2*Math.PI-this.move_direction));
        //         this.cur_tanshe_num--;
        //     }
        // }
    };
    //----------------------------------------UPDATE------------------------------------------
    FeiBiao.prototype.update = function (dt) {
        if (GameManager_1.default.getInstance().cur_game_state != Constants_1.GameState.Game_Playing)
            return;
        this.update_move(dt);
        if (this.tuo_wei) {
            this.tuo_wei.setPosition(this.node.position);
        }
        //影分身
        // this.update_locus_shadow();
        // if(this.shadow_node)
        // {
        //     this.update_shadow();
        // }
    };
    FeiBiao.prototype.update_move = function (dt) {
        this.node.angle += dt * this.xuanzhuan_speed;
        if (this.node.angle >= 360) {
            this.node.angle = this.node.angle % 360;
        }
        //跟踪目标
        var sp = this.move_speed * dt;
        if (this.cur_tanshe_num > 0) {
            var disX = this.node.x;
            var disY = this.node.y;
            if (this.target && this.target.getComponent(Monster_1.default).getIsCanCheck() == true) {
                var enemyTs = this.target.getComponent(Monster_1.default);
                var enemyPos = enemyTs.getSheShouPos();
                ;
                var offsetPos = enemyPos.sub(this.node.getPosition());
                if (offsetPos.mag() < sp) {
                    //中了,开始弹射
                    this.tanshe();
                }
                else {
                    var pi2 = Math.PI * 2;
                    this.move_direction = (Math.atan2(offsetPos.y, offsetPos.x) + pi2) % pi2;
                    disX += sp * Math.cos(this.move_direction);
                    disY += sp * Math.sin(this.move_direction);
                }
            }
            else {
                //目标丢失,往当前方向走,如果途中遇到靠近的怪，则追踪目标
                this.target = this.getMonsterForMiss();
                if (this.target == null) {
                    disX += sp * Math.cos(this.move_direction);
                    disY += sp * Math.sin(this.move_direction);
                }
            }
            this.node.x = disX;
            this.node.y = disY;
            if (Math.abs(this.node.y) >= 1280 || Math.abs(this.node.x) >= 640) {
                this.destroySelf();
            }
        }
        else {
            this.backToHero(sp);
        }
    };
    FeiBiao.prototype.backToHero = function (sp) {
        if (this.tuo_wei) {
            cc.tween(this.tuo_wei).delay(this.tuo_wei.getComponent(cc.MotionStreak).fadeTime).removeSelf().start();
            this.tuo_wei = null;
        }
        //收回英雄处
        this.node.color = cc.Color.GRAY;
        this.node.opacity = 168;
        //this.shadow_node.opacity=this.node.opacity/2;
        //let offsetPos=GameManager.getInstance().all_hero[Hero_Type.RenZhe].node.getPosition().sub(this.node.getPosition());
        var offsetPos = GameManager_1.default.getInstance().all_hero.get(HeroConfig_1.Hero_Type.PaoShou).node.getPosition().sub(this.node.getPosition());
        if (offsetPos.mag() < sp) {
            this.destroySelf();
        }
        else {
            var pi2 = Math.PI * 2;
            this.move_direction = (Math.atan2(offsetPos.y, offsetPos.x) + pi2) % pi2;
            this.node.x += sp * Math.cos(this.move_direction);
            this.node.y += sp * Math.sin(this.move_direction);
        }
    };
    //记录影子的路径和角度数值
    // update_locus_shadow()
    // {
    //     //加入头部
    //     this.feibiao_pos.unshift(this.node.getPosition());
    //     this.feibiao_angle.unshift(this.node.angle);
    //     //删除尾部
    //     this.feibiao_pos.pop();
    //     this.feibiao_angle.pop();        
    // }
    // //显示影子的跟随
    // update_shadow()
    // {
    //     let posIndex=this.getPosIndex();
    //     this.shadow_node.setPosition(this.feibiao_pos[posIndex]);
    //     this.shadow_node.angle=this.feibiao_angle[posIndex];
    // }
    //兼容加倍速率处理(暂时不支持减速倍率，因为游戏没有减速倍率，所以不做了，减速倍率思路：正常速度取中间值，加速取后，减速取前)
    // private getPosIndex():number
    // {
    //     let maxCL=this.feibiao_pos.length-1;
    //     let index=Math.floor(this.feibiao_pos.length/cc.kGetSpeed());
    //     if(index>=maxCL)
    //     {
    //         index=maxCL;
    //     }
    //     return index;
    // }
    FeiBiao.prototype.destroySelf = function () {
        this.target = null;
        //this.shadow_node.active=false;
        GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(this.game_effect_id, this.node);
    };
    __decorate([
        property({ type: cc.Prefab })
    ], FeiBiao.prototype, "tuowei", void 0);
    FeiBiao = __decorate([
        ccclass
    ], FeiBiao);
    return FeiBiao;
}(GongJi_1.default));
exports.default = FeiBiao;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcR2FtZVxcUmVuWmhlXFxGZWlCaWFvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGdEQUErQztBQUUvQyx1RUFBb0Y7QUFDcEYsb0RBQStDO0FBQy9DLG9EQUErQztBQUMvQyxrRUFBNkQ7QUFDN0QsZ0VBQTJEO0FBRzNELG9DQUErQjtBQUMvQiw0Q0FBdUU7QUFHakUsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBcUMsMkJBQU07SUFBM0M7UUFBQSxxRUFpYUM7UUE5WkcsWUFBTSxHQUFXLElBQUksQ0FBQztRQUV0QixvQkFBYyxHQUFRLENBQUMsQ0FBQztRQUN4QixXQUFXO1FBQ1gsMkJBQTJCO1FBQzNCLFFBQVE7UUFDUiw0QkFBNEI7UUFDNUIsTUFBTTtRQUNOLDJCQUEyQjtRQUUzQixnQkFBVSxHQUFRLElBQUksQ0FBQztRQUN2QixvQkFBYyxHQUFRLElBQUksQ0FBQyxFQUFFLEdBQUMsQ0FBQyxDQUFDO1FBQ2hDLE1BQU07UUFDTixxQkFBZSxHQUFRLEdBQUcsQ0FBQztRQUUzQixRQUFRO1FBQ1Isb0JBQWMsR0FBUSxDQUFDLENBQUM7UUFDeEIsb0JBQWMsR0FBUSxDQUFDLENBQUM7UUFDeEIsaUJBQWlCO1FBQ2pCLGdCQUFVLEdBQVUsRUFBRSxDQUFDO1FBRXZCLElBQUk7UUFDSixZQUFNLEdBQVMsSUFBSSxDQUFDO1FBRXBCLHFCQUFlLEdBQVEsQ0FBQyxDQUFDO1FBRXpCLGNBQVEsR0FBUSxDQUFDLENBQUM7UUFFbEIsYUFBTyxHQUFTLElBQUksQ0FBQzs7UUFzWHBCLGtHQUFrRztRQUNuRywwREFBMEQ7UUFDMUQsZ0RBQWdEO1FBQ2hELGlEQUFpRDtRQUNqRCxrQkFBa0I7UUFDbEIsa0NBQWtDO1FBQ2xDLHFCQUFxQjtRQUNyQix3QkFBd0I7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QUFJLENBQUMsY0FBYyxFQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxRixDQUFDO0lBaFpEO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUMsQ0FBQzsyQ0FDTDtJQUhMLE9BQU87UUFEM0IsT0FBTztPQUNhLE9BQU8sQ0FpYTNCO0lBQUQsY0FBQztDQWphRCxBQWlhQyxDQWphb0MsZ0JBQU0sR0FpYTFDO2tCQWphb0IsT0FBTyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdhbWVTdGF0ZSB9IGZyb20gXCIuLi8uLi8uLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgRW5lbXlfQnVmZl9UeXBlLCBFbmVteV9EZUJ1ZmZfVHlwZSB9IGZyb20gXCIuLi8uLi8uLi9FbmVteS9FbmVteUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBHYW1lRWZmZWN0SWQsIEdhbWVFZmZlY3RzTWFuYWdlciB9IGZyb20gXCIuLi8uLi8uLi9HYW1lL0dhbWVFZmZlY3RzTWFuYWdlclwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uLy4uLy4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCBNb25zdGVyIGZyb20gXCIuLi8uLi8uLi9Nb25zdGVyL01vbnN0ZXJcIjtcclxuaW1wb3J0IE1vbnN0ZXJNYW5hZ2VyIGZyb20gXCIuLi8uLi8uLi9Nb25zdGVyL01vbnN0ZXJNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFNvdW5kSW5kZXggfSBmcm9tIFwiLi4vLi4vLi4vU291bmQvQXVkaW9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgR29uZ0ppRGF0YSB9IGZyb20gXCIuLi8uLi9EYXRhL0hlcm9EYXRhXCI7XHJcbmltcG9ydCB7IEJ1ZmZEYXRhIH0gZnJvbSBcIi4uL0J1ZmZEYXRhXCI7XHJcbmltcG9ydCBHb25nSmkgZnJvbSBcIi4uL0dvbmdKaVwiO1xyXG5pbXBvcnQgeyBCdWZmSWQsIEJ1ZmZUeXBlLCBIZXJvX1R5cGUsIFNraWxsVHlwZSB9IGZyb20gXCIuLi9IZXJvQ29uZmlnXCI7XHJcblxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGZWlCaWFvIGV4dGVuZHMgR29uZ0ppIHtcclxuXHJcbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuUHJlZmFifSlcclxuICAgIHR1b3dlaTpjYy5QcmVmYWI9bnVsbDtcclxuXHJcbiAgICBnYW1lX2VmZmVjdF9pZDpudW1iZXI9MDtcclxuICAgIC8v6aOe6ZWW57uP6L+H55qE6Lev5b6E6K6w5b2VXHJcbiAgICAvL2ZlaWJpYW9fcG9zOmNjLlZlYzJbXT1bXTtcclxuICAgIC8v6aOe6ZWW5peL6L2s6K6w5b2VXHJcbiAgICAvL2ZlaWJpYW9fYW5nbGU6bnVtYmVyW109W107XHJcbiAgICAvL+W9seWtkOiKgueCuVxyXG4gICAgLy9zaGFkb3dfbm9kZTpjYy5Ob2RlPW51bGw7XHJcblxyXG4gICAgbW92ZV9zcGVlZDpudW1iZXI9MTIwMDtcclxuICAgIG1vdmVfZGlyZWN0aW9uOm51bWJlcj1NYXRoLlBJLzI7XHJcbiAgICAvL+aXi+i9rOmAn+W6plxyXG4gICAgeHVhbnpodWFuX3NwZWVkOm51bWJlcj02MDA7XHJcblxyXG4gICAgLy/lvLnlsITlvLnlsITmrKHmlbBcclxuICAgIGN1cl90YW5zaGVfbnVtOm51bWJlcj02O1xyXG4gICAgbWF4X3RhbnNoZV9udW06bnVtYmVyPTA7XHJcbiAgICAvL+iusOW9leW8ueWwhOi/h+eahOebruagh++8jOmYsuatoumHjeWkjeW8ueWwhFxyXG4gICAgdGFuc2hlX3llczpzdHJpbmdbXT1bXTtcclxuXHJcbiAgICAvL+ebruagh1xyXG4gICAgdGFyZ2V0OmNjLk5vZGU9bnVsbDtcclxuXHJcbiAgICBjdXJfdGFuc2hlX3JhdGU6bnVtYmVyPTE7XHJcblxyXG4gICAgc2hhbmdoYWk6bnVtYmVyPTE7XHJcblxyXG4gICAgdHVvX3dlaTpjYy5Ob2RlPW51bGw7XHJcblxyXG4gICAgb25Mb2FkKClcclxuICAgIHtcclxuICAgICAgICAvL3RoaXMuYWRkU2hhZG93KCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGluaXQoZ2FtZUVmZmVjdElkOkdhbWVFZmZlY3RJZCxnakRhdGE6R29uZ0ppRGF0YSxzcGVlZDpudW1iZXIsdGFyZ2V0OmNjLk5vZGUsdGFuc2hlTnVtOm51bWJlcilcclxuICAgIHtcclxuICAgICAgICBzdXBlci5pbml0RGF0YShnakRhdGEpO1xyXG4gICAgICAgIHRoaXMuZ2FtZV9lZmZlY3RfaWQ9Z2FtZUVmZmVjdElkO1xyXG4gICAgICAgIHRoaXMubW92ZV9zcGVlZD1zcGVlZDtcclxuICAgICAgICB0aGlzLmN1cl90YW5zaGVfcmF0ZT0xO1xyXG4gICAgICAgIHRoaXMubWF4X3RhbnNoZV9udW09dGhpcy5jdXJfdGFuc2hlX251bT10YW5zaGVOdW0rMTtcclxuICAgICAgICB0aGlzLm5vZGUuY29sb3I9Y2MuQ29sb3IuV0hJVEU7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHk9MjU1O1xyXG4gICAgICAgIC8v6YeN572u6aOe6ZWW5by55bCE5pWw5o2uXHJcbiAgICAgICAgdGhpcy50YW5zaGVfeWVzLnNwbGljZSgwKTsgXHJcbiAgICAgICAgaWYodHlwZW9mIHRhcmdldCA9PSBcIm51bWJlclwiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEaXIodGFyZ2V0KTtcclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy50YXJnZXQ9dGFyZ2V0O1xyXG4gICAgICAgICAgICB0aGlzLnRhbnNoZV95ZXMucHVzaCh0YXJnZXQudXVpZCk7XHJcbiAgICAgICAgICAgIGxldCBvZmZzZXRQb3M9dGhpcy50YXJnZXQuZ2V0UG9zaXRpb24oKS5zdWIodGhpcy5ub2RlLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgICAgICBsZXQgcGkyPU1hdGguUEkqMjtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlX2RpcmVjdGlvbj0oTWF0aC5hdGFuMihvZmZzZXRQb3MueSxvZmZzZXRQb3MueCkrcGkyKSVwaTI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBpZih0aGlzLnNoYWRvd19ub2RlKVxyXG4gICAgICAgIC8vIHtcclxuICAgICAgICAvLyAgICAgdGhpcy5zaGFkb3dfbm9kZS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAvLyAgICAgdGhpcy5zaGFkb3dfbm9kZS5vcGFjaXR5PXRoaXMubm9kZS5vcGFjaXR5LzI7ICAgICAgICAgICAgXHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIHRoaXMudHVvX3dlaT1jYy5pbnN0YW50aWF0ZSh0aGlzLnR1b3dlaSlcclxuICAgICAgICB0aGlzLnR1b193ZWkucGFyZW50PXRoaXMubm9kZS5wYXJlbnQ7XHJcbiAgICAgICAgdGhpcy5ub2RlLnpJbmRleD0xO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5re75Yqg5b2x5a2QXHJcbiAgICAvLyBhZGRTaGFkb3coKVxyXG4gICAgLy8ge1xyXG4gICAgLy8gICAgIGlmKHRoaXMuc2hhZG93X25vZGU9PW51bGwpXHJcbiAgICAvLyAgICAge1xyXG4gICAgLy8gICAgICAgICB0aGlzLm5vZGUuekluZGV4PXRoaXMubm9kZS56SW5kZXgtMTtcclxuICAgIC8vICAgICAgICAgdGhpcy5zaGFkb3dfbm9kZT1uZXcgY2MuTm9kZSgnZmVpYmlhb1NoYWRvdycpO1xyXG4gICAgLy8gICAgICAgICB0aGlzLnNoYWRvd19ub2RlLnBhcmVudD10aGlzLm5vZGUucGFyZW50O1xyXG4gICAgLy8gICAgICAgICB0aGlzLnNoYWRvd19ub2RlLmFkZENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lPXRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZTtcclxuICAgIC8vICAgICAgICAgdGhpcy5zaGFkb3dfbm9kZS5zZXRQb3NpdGlvbih0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKSk7XHJcbiAgICAvLyAgICAgICAgIHRoaXMuc2hhZG93X25vZGUub3BhY2l0eT0xMDA7XHJcbiAgICAvLyAgICAgICAgIHRoaXMuc2hhZG93X25vZGUuY29sb3I9Y2MuQ29sb3IuR1JBWTtcclxuICAgIC8vICAgICAgICAgdGhpcy5zaGFkb3dfbm9kZS5zY2FsZT10aGlzLm5vZGUuc2NhbGU7XHJcbiAgICAvLyAgICAgICAgIHRoaXMuZmVpYmlhb19wb3M9bmV3IEFycmF5KDMpO1xyXG4gICAgLy8gICAgICAgICBsZXQgbGVuPXRoaXMuZmVpYmlhb19wb3MubGVuZ3RoO1xyXG4gICAgLy8gICAgICAgICBmb3IobGV0IGk9MDsgaTxsZW47IGkrKylcclxuICAgIC8vICAgICAgICAge1xyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5mZWliaWFvX3Bvc1tpXT10aGlzLm5vZGUuZ2V0UG9zaXRpb24oKTtcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMuZmVpYmlhb19hbmdsZVtpXT10aGlzLm5vZGUuYW5nbGU7XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9ICAgICAgICAgICAgICAgIFxyXG4gICAgLy8gfVxyXG5cclxuICAgIC8v5Yig6ZmkXHJcbiAgICAvLyByZW1vdmVTaGFkb3coKVxyXG4gICAgLy8ge1xyXG4gICAgLy8gICAgIGlmKHRoaXMuc2hhZG93X25vZGUhPW51bGwpXHJcbiAgICAvLyAgICAge1xyXG4gICAgLy8gICAgICAgICB0aGlzLnNoYWRvd19ub2RlLnJlbW92ZUZyb21QYXJlbnQoKTtcclxuICAgIC8vICAgICAgICAgdGhpcy5zaGFkb3dfbm9kZT1udWxsO1xyXG4gICAgLy8gICAgIH0gICAgICAgICAgICAgICAgXHJcbiAgICAvLyB9XHJcblxyXG4gICAgdGFuc2hlKClcclxuICAgIHtcclxuICAgICAgICBsZXQgY3VyTW9uc3RlclRzPXRoaXMudGFyZ2V0LmdldENvbXBvbmVudChNb25zdGVyKTtcclxuICAgICAgICBpZihjdXJNb25zdGVyVHMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL2xldCBoZXJvRGF0YT1HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdhbWVfaGVyb19kYXRhW0hlcm9fVHlwZS5SZW5aaGVdOyAgIFxyXG4gICAgICAgICAgICBsZXQgaGVyb0RhdGE9R2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nYW1lX2hlcm9fZGF0YS5nZXQoSGVyb19UeXBlLlBhb1Nob3UpO1xyXG4gICAgICAgICAgICAvL+WmguaenOacieagvOaMoeaKpOebvlxyXG4gICAgICAgICAgICAvLyBpZihjdXJNb25zdGVyVHMuaXNIYXZlQnVmZihFbmVteV9CdWZmX1R5cGUuaHVkdW4pKVxyXG4gICAgICAgICAgICAvLyB7XHJcbiAgICAgICAgICAgIC8vICAgICAvL+e7k+adn+W8ueWwhFxyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5jdXJfdGFuc2hlX251bT0wO1xyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5nb25namlfZGF0YS5oZXJvX2RhdGEuYXR0X3JhdGU9dGhpcy5jdXJfdGFuc2hlX3JhdGU7XHJcbiAgICAgICAgICAgIC8vICAgICBjdXJNb25zdGVyVHMuYmVGbGFzaEluanVyZWQodGhpcy5nb25namlfZGF0YSk7XHJcbiAgICAgICAgICAgIC8vICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LllYX1JlbnpoZUF0dGFjayk7ICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL3RoaXMuZ29uZ2ppX2RhdGEuaGVyb19kYXRhLmF0dF9yYXRlPXRoaXMuY3VyX3RhbnNoZV9yYXRlO1xyXG4gICAgICAgICAgICBsZXQgZGF0YT1jdXJNb25zdGVyVHMuYmVGbGFzaEluanVyZWQodGhpcy5nb25namlfZGF0YSk7XHJcbiAgICAgICAgICAgIGlmKCFkYXRhLmlzX2RpZSAmJiBkYXRhLmdldERhbWFnZU51bSgpPjApe1xyXG4gICAgICAgICAgICAgICAgLy/lh4/pgJ9cclxuICAgICAgICAgICAgICAgIC8vIGN1ck1vbnN0ZXJUcy5hZGREZUJ1ZmYoRW5lbXlfRGVCdWZmX1R5cGUuSmlhblN1X1JlblpoZV9FWF9Ta2lsbCx7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgLyoq5oyB57ut5Ymp5L2Z5pe26Ze0ICovXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgcmVtYWluX3RpbWU6aGVyb0RhdGEuRXhjbHVzaXZlV2VhcG9uU2tpbGxWYWx1ZV8zLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgIC8qKuavj+asoeinpuWPkeeahOS8pOWus+WAvCAqL1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIGRhbWFnZV9udW06MCxcclxuICAgICAgICAgICAgICAgIC8vICAgICAvKirop6blj5HkvKTlrrPnmoTml7bpl7Tpl7TpmpQgKi9cclxuICAgICAgICAgICAgICAgIC8vICAgICBqaWFuZ2VfdGltZTowLjIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgb3RoZXJfdmFsdWVfMTpoZXJvRGF0YS5FeGNsdXNpdmVXZWFwb25Ta2lsbFZhbHVlXzIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgaGVyb190eXBlOkhlcm9fVHlwZS5SZW5aaGUsICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vIH0sdGhpcy5nb25namlfZGF0YSlcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8v5pmu5pS76YCS5aKe5Lyk5a6zXHJcbiAgICAgICAgICAgIHRoaXMuY3VyX3RhbnNoZV9yYXRlPSgxK2hlcm9EYXRhLmdldFNraWxsVmFsdWUyKFNraWxsVHlwZS5QYXNzaXZlXzEpKTtcclxuICAgICAgICAgICAgLy8gR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLnJlbnpoZV9mZWliaWFvX2hpdCx0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKSk7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8v5p+l5om+5by55bCE5paw55uu5qCHXHJcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0PXRoaXMuZ2V0TW9uc3RlcigpO1xyXG4gICAgICAgICAgICBpZih0aGlzLnRhcmdldClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50YW5zaGVfeWVzLnB1c2godGhpcy50YXJnZXQudXVpZCk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy50YW5zaGVfeWVzLmxlbmd0aD4yKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhbnNoZV95ZXMuc3BsaWNlKDAsdGhpcy50YW5zaGVfeWVzLmxlbmd0aC0xKTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VyX3RhbnNoZV9udW09MDtcclxuICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy/lrozmiJDlvLnlsIRcclxuICAgICAgICAgICAgdGhpcy5jdXJfdGFuc2hlX251bS0tO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRNb25zdGVyKCk6Y2MuTm9kZVxyXG4gICAge1xyXG4gICAgICAgIGxldCBlbT1Nb25zdGVyTWFuYWdlci5nZXRJbnN0YW5jZSgpOyAgICAgICAgXHJcbiAgICAgICAgaWYoZW0ubm9kZS5jaGlsZHJlbkNvdW50PD0wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBwb3M6Y2MuVmVjMj10aGlzLm5vZGUuZ2V0UG9zaXRpb24oKTtcclxuICAgICAgICAvLzEu5YWI5qOA5rWL5Zyo5pS75Ye76IyD5Zu05YaF56ym5ZCI5pS75Ye75Y2V5L2N55qE5pWM5Lq6XHJcbiAgICAgICAgbGV0IGF0dE1vbnN0ZXJzPVtdO1xyXG4gICAgICAgIGZvcihsZXQgZW5lbXkgb2YgZW0ubm9kZS5jaGlsZHJlbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCBlbmVteVBvcz1jYy52MihlbmVteS54LGVuZW15LnkrZW5lbXkuaGVpZ2h0LzIpO1xyXG4gICAgICAgICAgICBsZXQgZW5lbXlUUz1lbmVteS5nZXRDb21wb25lbnQoTW9uc3Rlcik7XHJcbiAgICAgICAgICAgIGlmKGVuZW15VFMuZ2V0SXNDYW5DaGVjaygpPT10cnVlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGlzdGFuY2U9cG9zLnN1YihlbmVteVBvcykubWFnKCk7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmdldElzVGFuU2hlKGVuZW15LnV1aWQpPT1mYWxzZSAmJiBkaXN0YW5jZTw9NTAwKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGF0dE1vbnN0ZXJzLnB1c2goZW5lbXkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGF0dE1vbnN0ZXJzLmxlbmd0aDw9MClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZigxPT1hdHRNb25zdGVycy5sZW5ndGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gYXR0TW9uc3RlcnNbMF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vMi4x5LyY5YWI5pS75Ye76Lef55uu5qCH5L2N572u5pyA6L+R55qE5Y2V5L2NXHJcbiAgICAgICAgYXR0TW9uc3RlcnMuc29ydCgoYTpjYy5Ob2RlLGI6Y2MuTm9kZSk9PntcclxuICAgICAgICAgICAgcmV0dXJuIGNjLnYyKGEueCxhLnkrYS5oZWlnaHQvMikuc3ViKHBvcykubWFnKCktY2MudjIoYi54LGIueStiLmhlaWdodC8yKS5zdWIocG9zKS5tYWcoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gYXR0TW9uc3RlcnNbMF07XHJcbiAgICB9XHJcbiAgICAvL+mjnuihjOmAlOS4reebruagh+S4ouWkseaXtlxyXG4gICAgZ2V0TW9uc3RlckZvck1pc3MoKTpjYy5Ob2RlXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGVtPU1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgaWYoZW0ubm9kZS5jaGlsZHJlbkNvdW50PD0wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBwb3M6Y2MuVmVjMj10aGlzLm5vZGUuZ2V0UG9zaXRpb24oKTtcclxuICAgICAgICAvLzEu5YWI5qOA5rWL5Zyo5pS75Ye76IyD5Zu05YaF56ym5ZCI5pS75Ye75Y2V5L2N55qE5pWM5Lq6XHJcbiAgICAgICAgbGV0IGF0dE1vbnN0ZXJzPVtdO1xyXG4gICAgICAgIGZvcihsZXQgZW5lbXkgb2YgZW0ubm9kZS5jaGlsZHJlbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCBlbmVteVBvcz1jYy52MihlbmVteS54LGVuZW15LnkrZW5lbXkuaGVpZ2h0LzIpO1xyXG4gICAgICAgICAgICBsZXQgZW5lbXlUUz1lbmVteS5nZXRDb21wb25lbnQoTW9uc3Rlcik7XHJcbiAgICAgICAgICAgIGlmKGVuZW15VFMuZ2V0SXNDYW5DaGVjaygpPT10cnVlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGlzdGFuY2U9cG9zLnN1YihlbmVteVBvcykubWFnKCk7XHJcbiAgICAgICAgICAgICAgICAvL2xldCB3aWR0aD1lbmVteS53aWR0aC8yKmVuZW15LnNjYWxlWCt0aGlzLm5vZGUud2lkdGgvMip0aGlzLm5vZGUuc2NhbGVYOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuZ2V0SXNUYW5TaGUoZW5lbXkudXVpZCk9PWZhbHNlICYmIGRpc3RhbmNlPD01MDApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXR0TW9uc3RlcnMucHVzaChlbmVteSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoYXR0TW9uc3RlcnMubGVuZ3RoPD0wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKDE9PWF0dE1vbnN0ZXJzLmxlbmd0aClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBhdHRNb25zdGVyc1swXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8yLjHkvJjlhYjmlLvlh7vot5/nm67moIfkvY3nva7mnIDov5HnmoTljZXkvY1cclxuICAgICAgICBhdHRNb25zdGVycy5zb3J0KChhOmNjLk5vZGUsYjpjYy5Ob2RlKT0+e1xyXG4gICAgICAgICAgICByZXR1cm4gY2MudjIoYS54LGEueSthLmhlaWdodC8yKS5zdWIocG9zKS5tYWcoKS1jYy52MihiLngsYi55K2IuaGVpZ2h0LzIpLnN1Yihwb3MpLm1hZygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBhdHRNb25zdGVyc1swXTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRJc1RhblNoZSh1aWQ6c3RyaW5nKTpib29sZWFuXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudGFuc2hlX3llcy5pbmNsdWRlcyh1aWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldE5ld1RhcmdldChlbmVteTpjYy5Ob2RlKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuY3VyX3RhbnNoZV9udW0+MCAmJiB0aGlzLnRhcmdldD09bnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZ2V0SXNUYW5TaGUoZW5lbXkudXVpZCk9PWZhbHNlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRhcmdldD1lbmVteTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNoYW5nZURpcihkaXI6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubW92ZV9kaXJlY3Rpb249KGRpcitNYXRoLlBJKjIpJShNYXRoLlBJKjIpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbGxpc2lvblRvV2FsbCh3YWxsTmFtZTpzdHJpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgLy8gaWYod2FsbE5hbWU9PSd3YWxsX2xlZnQnIHx8IHdhbGxOYW1lPT0nd2FsbF9yaWdodCcpXHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgIC8vICAgICB0aGlzLmNoYW5nZURpcigoTWF0aC5QSS10aGlzLm1vdmVfZGlyZWN0aW9uKSk7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuY3VyX3RhbnNoZV9udW0tLTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gaWYod2FsbE5hbWU9PSd3YWxsX3RvcCcpXHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgIC8vICAgICB0aGlzLmNoYW5nZURpcigoMipNYXRoLlBJLXRoaXMubW92ZV9kaXJlY3Rpb24pKTtcclxuICAgICAgICAvLyAgICAgdGhpcy5jdXJfdGFuc2hlX251bS0tO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyBpZih3YWxsTmFtZT09J3dhbGxfZG93bicpXHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgIC8vICAgICAvL+WFiOWIpOaWreW9k+WJjeaWueWQkVxyXG4gICAgICAgIC8vICAgICBsZXQgZGlyPXRoaXMubW92ZV9kaXJlY3Rpb24lKE1hdGguUEkqMik7XHJcbiAgICAgICAgLy8gICAgIGlmKGRpcj5NYXRoLlBJICYmIGRpcjwyKk1hdGguUEkpXHJcbiAgICAgICAgLy8gICAgIHsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLmNoYW5nZURpcigoMipNYXRoLlBJLXRoaXMubW92ZV9kaXJlY3Rpb24pKTtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMuY3VyX3RhbnNoZV9udW0tLTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH1cclxuICAgIH1cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1VUERBVEUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIHVwZGF0ZSAoZHQpIHtcclxuICAgICAgICBpZihHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX3N0YXRlIT1HYW1lU3RhdGUuR2FtZV9QbGF5aW5nKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgICB0aGlzLnVwZGF0ZV9tb3ZlKGR0KTtcclxuICAgICAgICBpZih0aGlzLnR1b193ZWkpe1xyXG4gICAgICAgICAgICB0aGlzLnR1b193ZWkuc2V0UG9zaXRpb24odGhpcy5ub2RlLnBvc2l0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/lvbHliIbouqtcclxuICAgICAgICAvLyB0aGlzLnVwZGF0ZV9sb2N1c19zaGFkb3coKTtcclxuICAgICAgICAvLyBpZih0aGlzLnNoYWRvd19ub2RlKVxyXG4gICAgICAgIC8vIHtcclxuICAgICAgICAvLyAgICAgdGhpcy51cGRhdGVfc2hhZG93KCk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZV9tb3ZlKGR0KVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubm9kZS5hbmdsZSs9ZHQqdGhpcy54dWFuemh1YW5fc3BlZWQ7XHJcbiAgICAgICAgaWYodGhpcy5ub2RlLmFuZ2xlPj0zNjApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuYW5nbGU9dGhpcy5ub2RlLmFuZ2xlJTM2MDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/ot5/ouKrnm67moIdcclxuICAgICAgICBsZXQgc3A9dGhpcy5tb3ZlX3NwZWVkKmR0O1xyXG4gICAgICAgIGlmKHRoaXMuY3VyX3RhbnNoZV9udW0+MClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCBkaXNYPXRoaXMubm9kZS54O1xyXG4gICAgICAgICAgICBsZXQgZGlzWT10aGlzLm5vZGUueTtcclxuICAgICAgICAgICAgaWYodGhpcy50YXJnZXQgJiYgdGhpcy50YXJnZXQuZ2V0Q29tcG9uZW50KE1vbnN0ZXIpLmdldElzQ2FuQ2hlY2soKT09dHJ1ZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGV0IGVuZW15VHM9dGhpcy50YXJnZXQuZ2V0Q29tcG9uZW50KE1vbnN0ZXIpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGVuZW15UG9zPWVuZW15VHMuZ2V0U2hlU2hvdVBvcygpOztcclxuICAgICAgICAgICAgICAgIGxldCBvZmZzZXRQb3M9ZW5lbXlQb3Muc3ViKHRoaXMubm9kZS5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICAgICAgICAgIGlmKG9mZnNldFBvcy5tYWcoKTxzcClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvL+S4reS6hizlvIDlp4vlvLnlsIRcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhbnNoZSgpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcGkyPU1hdGguUEkqMjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVfZGlyZWN0aW9uPShNYXRoLmF0YW4yKG9mZnNldFBvcy55LG9mZnNldFBvcy54KStwaTIpJXBpMjtcclxuICAgICAgICAgICAgICAgICAgICBkaXNYKz1zcCpNYXRoLmNvcyh0aGlzLm1vdmVfZGlyZWN0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICBkaXNZKz1zcCpNYXRoLnNpbih0aGlzLm1vdmVfZGlyZWN0aW9uKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy/nm67moIfkuKLlpLEs5b6A5b2T5YmN5pa55ZCR6LWwLOWmguaenOmAlOS4remBh+WIsOmdoOi/keeahOaAqu+8jOWImei/vei4quebruagh1xyXG4gICAgICAgICAgICAgICAgdGhpcy50YXJnZXQ9dGhpcy5nZXRNb25zdGVyRm9yTWlzcygpO1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy50YXJnZXQ9PW51bGwpe1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc1grPXNwKk1hdGguY29zKHRoaXMubW92ZV9kaXJlY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc1krPXNwKk1hdGguc2luKHRoaXMubW92ZV9kaXJlY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMubm9kZS54PWRpc1g7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS55PWRpc1k7XHJcbiAgICAgICAgICAgIGlmKE1hdGguYWJzKHRoaXMubm9kZS55KT49MTI4MCB8fCBNYXRoLmFicyh0aGlzLm5vZGUueCk+PTY0MCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlc3Ryb3lTZWxmKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5iYWNrVG9IZXJvKHNwKTtcclxuICAgICAgICB9ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBiYWNrVG9IZXJvKHNwOm51bWJlcilcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLnR1b193ZWkpe1xyXG4gICAgICAgICAgICBjYy50d2Vlbih0aGlzLnR1b193ZWkpLmRlbGF5KHRoaXMudHVvX3dlaS5nZXRDb21wb25lbnQoY2MuTW90aW9uU3RyZWFrKS5mYWRlVGltZSkucmVtb3ZlU2VsZigpLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgIHRoaXMudHVvX3dlaT1udWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+aUtuWbnuiLsembhOWkhFxyXG4gICAgICAgIHRoaXMubm9kZS5jb2xvcj1jYy5Db2xvci5HUkFZO1xyXG4gICAgICAgIHRoaXMubm9kZS5vcGFjaXR5PTE2ODtcclxuICAgICAgICAvL3RoaXMuc2hhZG93X25vZGUub3BhY2l0eT10aGlzLm5vZGUub3BhY2l0eS8yO1xyXG4gICAgICAgIC8vbGV0IG9mZnNldFBvcz1HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFsbF9oZXJvW0hlcm9fVHlwZS5SZW5aaGVdLm5vZGUuZ2V0UG9zaXRpb24oKS5zdWIodGhpcy5ub2RlLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgIGxldCBvZmZzZXRQb3M9R2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hbGxfaGVyby5nZXQoSGVyb19UeXBlLlBhb1Nob3UpLm5vZGUuZ2V0UG9zaXRpb24oKS5zdWIodGhpcy5ub2RlLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgIGlmKG9mZnNldFBvcy5tYWcoKTxzcClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuZGVzdHJveVNlbGYoKTtcclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IHBpMj1NYXRoLlBJKjI7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZV9kaXJlY3Rpb249KE1hdGguYXRhbjIob2Zmc2V0UG9zLnksb2Zmc2V0UG9zLngpK3BpMiklcGkyO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUueCs9c3AqTWF0aC5jb3ModGhpcy5tb3ZlX2RpcmVjdGlvbik7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS55Kz1zcCpNYXRoLnNpbih0aGlzLm1vdmVfZGlyZWN0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/orrDlvZXlvbHlrZDnmoTot6/lvoTlkozop5LluqbmlbDlgLxcclxuICAgIC8vIHVwZGF0ZV9sb2N1c19zaGFkb3coKVxyXG4gICAgLy8ge1xyXG4gICAgLy8gICAgIC8v5Yqg5YWl5aS06YOoXHJcbiAgICAvLyAgICAgdGhpcy5mZWliaWFvX3Bvcy51bnNoaWZ0KHRoaXMubm9kZS5nZXRQb3NpdGlvbigpKTtcclxuICAgIC8vICAgICB0aGlzLmZlaWJpYW9fYW5nbGUudW5zaGlmdCh0aGlzLm5vZGUuYW5nbGUpO1xyXG4gICAgLy8gICAgIC8v5Yig6Zmk5bC+6YOoXHJcbiAgICAvLyAgICAgdGhpcy5mZWliaWFvX3Bvcy5wb3AoKTtcclxuICAgIC8vICAgICB0aGlzLmZlaWJpYW9fYW5nbGUucG9wKCk7ICAgICAgICBcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyAvL+aYvuekuuW9seWtkOeahOi3n+maj1xyXG4gICAgLy8gdXBkYXRlX3NoYWRvdygpXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgICAgbGV0IHBvc0luZGV4PXRoaXMuZ2V0UG9zSW5kZXgoKTtcclxuICAgIC8vICAgICB0aGlzLnNoYWRvd19ub2RlLnNldFBvc2l0aW9uKHRoaXMuZmVpYmlhb19wb3NbcG9zSW5kZXhdKTtcclxuICAgIC8vICAgICB0aGlzLnNoYWRvd19ub2RlLmFuZ2xlPXRoaXMuZmVpYmlhb19hbmdsZVtwb3NJbmRleF07XHJcbiAgICAvLyB9XHJcbiAgICAvL+WFvOWuueWKoOWAjemAn+eOh+WkhOeQhijmmoLml7bkuI3mlK/mjIHlh4/pgJ/lgI3njofvvIzlm6DkuLrmuLjmiI/msqHmnInlh4/pgJ/lgI3njofvvIzmiYDku6XkuI3lgZrkuobvvIzlh4/pgJ/lgI3njofmgJ3ot6/vvJrmraPluLjpgJ/luqblj5bkuK3pl7TlgLzvvIzliqDpgJ/lj5blkI7vvIzlh4/pgJ/lj5bliY0pXHJcbiAgICAvLyBwcml2YXRlIGdldFBvc0luZGV4KCk6bnVtYmVyXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgICAgbGV0IG1heENMPXRoaXMuZmVpYmlhb19wb3MubGVuZ3RoLTE7XHJcbiAgICAvLyAgICAgbGV0IGluZGV4PU1hdGguZmxvb3IodGhpcy5mZWliaWFvX3Bvcy5sZW5ndGgvY2Mua0dldFNwZWVkKCkpO1xyXG4gICAgLy8gICAgIGlmKGluZGV4Pj1tYXhDTClcclxuICAgIC8vICAgICB7XHJcbiAgICAvLyAgICAgICAgIGluZGV4PW1heENMO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vICAgICByZXR1cm4gaW5kZXg7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgZGVzdHJveVNlbGYoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMudGFyZ2V0PW51bGw7XHJcbiAgICAgICAgLy90aGlzLnNoYWRvd19ub2RlLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5kZXN0cm95R2FtZUVmZmVjdEJ5SWQodGhpcy5nYW1lX2VmZmVjdF9pZCx0aGlzLm5vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgICAvLy8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3norDmkp7lvIDlp4stLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvLyAgb25Db2xsaXNpb25FbnRlcihvdGhlcjpjYy5Db2xsaWRlcixzZWxmOmNjLkNvbGxpZGVyKSB7XHJcbiAgICAvLyAgICAgbGV0IGdtPUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCk7ICAgICAgICBcclxuICAgIC8vICAgICBpZihnbS5jdXJfZ2FtZV9zdGF0ZT09R2FtZVN0YXRlLkdhbWVfTG9zZSlcclxuICAgIC8vICAgICAgICAgcmV0dXJuO1xyXG4gICAgLy8gICAgIGxldCBncm91cD1vdGhlci5ub2RlLmdyb3VwO1xyXG4gICAgLy8gICAgIHN3aXRjaChncm91cCl7XHJcbiAgICAvLyAgICAgICAgIGNhc2UgJ3dhbGwnOntcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMuY29sbGlzaW9uVG9XYWxsKG90aGVyLm5vZGUubmFtZSk7XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9XHJcbn1cclxuIl19