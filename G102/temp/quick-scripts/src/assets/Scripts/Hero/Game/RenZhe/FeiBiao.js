"use strict";
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