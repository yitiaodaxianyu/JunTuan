
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Tutorials/Tutorials.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a48c3KslNBA06ektipejIr+', 'Tutorials');
// Scripts/Tutorials/Tutorials.ts

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
var Constants_1 = require("../Constants");
var GameManager_1 = require("../GameManager");
var HeroBaseInfo_1 = require("../Hero/Data/HeroBaseInfo");
var HeroManager_1 = require("../Hero/Data/HeroManager");
var HeroConfig_1 = require("../Hero/Game/HeroConfig");
var MonsterManager_1 = require("../Monster/MonsterManager");
var FollowConstants_1 = require("../multiLanguage/FollowConstants");
var FollowManager_1 = require("../multiLanguage/FollowManager");
var LanguageManager_1 = require("../multiLanguage/LanguageManager");
var CourseText_1 = require("./CourseText");
var TutorailsManager_1 = require("./TutorailsManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Tutorials = /** @class */ (function (_super) {
    __extends(Tutorials, _super);
    function Tutorials() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.close_callback = null;
        _this.ruo_time = 5;
        _this.t_num = 0;
        return _this;
    }
    //当次教程完毕
    Tutorials.prototype.onTutorialsComplete = function () {
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.新手引导 + TutorailsManager_1.default.getInstance().showing_id);
        //删除节点
        TutorailsManager_1.default.getInstance().showing_id = -1;
        if (this.close_callback) {
            this.close_callback();
        }
        this.node.removeFromParent();
        TutorailsManager_1.default.getInstance().cur_tutorial = null;
        //TutorailsManager.getInstance().is_tutorails_state=false;
    };
    Tutorials.prototype.showRuoTutorials = function (id, closeCallback, isLeft, bossPos) {
        var _this = this;
        if (isLeft === void 0) { isLeft = true; }
        var gm = GameManager_1.default.getInstance();
        this.close_callback = closeCallback;
        this.node.removeAllChildren();
        TutorailsManager_1.default.getInstance().is_tutorails_state = true;
        // for(let i=0; i<len; i++)
        // {
        //     let json=Tutorials_Json[i];
        //     if(id==json.xs_id)
        //     {                
        //         //标题
        //         title=LanguageManager.getInstance().getStrByTextId(json.title_text_id);
        //         //内容
        //         des1=LanguageManager.getInstance().getStrByTextId(json.guidance_text_id);
        //         break;
        //     }
        // }
        //展示出来
        var idStr = 't' + id;
        cc.resources.load('tutorials/' + idStr, cc.Prefab, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            var node = cc.instantiate(assets);
            node.parent = _this.node;
            //根据id查找
            var jsonData = CourseText_1.CourseTextManager.getInstance().getJsonCourseText(id);
            //英雄id
            var heroId = jsonData.hero_text_id;
            //滚动视图
            var textScrollView = node.getChildByName('textScrollView').getComponent(cc.ScrollView);
            //图标
            var icon = textScrollView.node.getChildByName('icon').getComponent(cc.Sprite);
            if (heroId != HeroConfig_1.Hero_Type.NULL) {
                icon.node.active = true;
                icon.spriteFrame = HeroManager_1.HeroManager.getInstance().getHeroBody(heroId);
            }
            else {
                icon.node.active = false;
            }
            //内容
            var des = LanguageManager_1.default.getInstance().getStrByTextId(jsonData.guidance_text_id);
            var desLabel = textScrollView.content.getChildByName('desLabel').getComponent(cc.Label);
            desLabel.string = des;
            textScrollView.scrollToBottom(0.5);
            //名字
            var name = LanguageManager_1.default.getInstance().getStrByTextId(HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getNameText_ID(heroId));
            var nameLabel = textScrollView.node.getChildByName('nameLabel').getComponent(cc.Label);
            nameLabel.string = name;
            //触摸监听一下
            var touchContinue = textScrollView.node.getChildByName('touchContinue');
            var textLanguage = touchContinue.getChildByName('TextLanguage');
            var clickIcon = touchContinue.getChildByName('clickIcon');
            //翻转设置
            if (isLeft) {
                textScrollView.node.x = -cc.winSize.width / 2;
                textScrollView.node.scaleX = 1;
                desLabel.node.scaleX = 1;
                nameLabel.node.scaleX = 1;
                textLanguage.scaleX = 1;
                clickIcon.scaleX = 1;
                clickIcon.zIndex = 1;
                textLanguage.zIndex = 2;
            }
            else {
                textScrollView.node.x = cc.winSize.width / 2;
                textScrollView.node.scaleX = -1;
                desLabel.node.scaleX = -1;
                nameLabel.node.scaleX = -1;
                textLanguage.scaleX = -1;
                clickIcon.scaleX = -1;
                clickIcon.zIndex = 2;
                textLanguage.zIndex = 1;
            }
            var rate = GameManager_1.default.getInstance().getGameRate();
            cc.tween(clickIcon).repeatForever(cc.sequence(cc.moveBy(0.2 * rate, cc.v2(0, 10)), cc.moveBy(0.2 * rate, cc.v2(0, -10)))).start();
            //
            var touchNode = node.getChildByName('touchNode');
            //bg
            var bg = node.getChildByName('bg');
            if (bg) {
                //触摸穿透
                if (bg._touchListener) {
                    bg.on(cc.Node.EventType.TOUCH_END, function () {
                        _this.onTutorialsComplete();
                        if (id == 252) {
                            GameManager_1.default.getInstance().all_hero.get(HeroConfig_1.Hero_Type.GongJianShou).showHero();
                            var enemys = MonsterManager_1.default.getInstance().getMonstersForNearest(1, _this.node.getPosition(), 1000);
                            if (enemys) {
                                //最前的敌人
                                var enemyPos = enemys[0].getPosition();
                                GameManager_1.default.getInstance().all_hero.get(HeroConfig_1.Hero_Type.GongJianShou).releaseSkill(enemyPos);
                            }
                        }
                    }, _this);
                }
            }
            switch (id) {
                case 201:
                    {
                        if (gm.cur_game_scene == Constants_1.GameScene.home) {
                            //强制显示主页
                            GameManager_1.default.getInstance().game_to_home = Constants_1.Go_Type.Main;
                            GameManager_1.default.getInstance().jumoAndShowUi();
                            touchNode.setPosition(bossPos);
                            node.getChildByName('touchBg').setPosition(bossPos);
                            touchContinue.active = false;
                            var finger = node.getChildByName('finger');
                            finger.setPosition(bossPos);
                            cc.tween(finger).repeatForever(cc.sequence(cc.moveBy(0.3, cc.v2(0, 100)), cc.moveBy(0.3, cc.v2(0, -100)))).start();
                            touchNode.on(cc.Node.EventType.TOUCH_START, function () {
                                node.getChildByName('touchBg').scale = 0.9;
                            }, _this);
                            touchNode.on(cc.Node.EventType.TOUCH_END, function () {
                                _this.onTutorialsComplete();
                            }, _this);
                            //触摸穿透
                            if (touchNode._touchListener) {
                                touchNode._touchListener.setSwallowTouches(false);
                            }
                        }
                    }
                    break;
                case 202:
                    {
                        if (gm.cur_game_scene == Constants_1.GameScene.game) {
                            touchContinue.active = false;
                            var heroNode = GameManager_1.default.getInstance().all_hero.get(HeroConfig_1.Hero_Type.ANuBiSi).node;
                            var posY_1 = heroNode.y;
                            var posX_1 = heroNode.x;
                            touchNode.x = posX_1;
                            GameManager_1.default.getInstance().all_hero.get(HeroConfig_1.Hero_Type.ANuBiSi).setCD(0);
                            var finger_1 = node.getChildByName('finger');
                            finger_1.x = posX_1;
                            finger_1.y = posY_1 + 70;
                            touchNode.y = posY_1;
                            var bg1_1 = node.getChildByName('bg1');
                            var bg2_1 = node.getChildByName('bg2');
                            bg1_1.y = posY_1 + touchNode.height * (1 - touchNode.anchorY);
                            bg2_1.y = posY_1 - touchNode.height * touchNode.anchorY;
                            var bg3_1 = node.getChildByName('bg3');
                            var bg4_1 = node.getChildByName('bg4');
                            bg3_1.x = posX_1 - touchNode.width / 2;
                            bg3_1.y = posY_1;
                            bg4_1.y = posY_1;
                            bg4_1.x = posX_1 + touchNode.width / 2;
                            var t11_1 = node.getChildByName('t11');
                            t11_1.setContentSize(GameManager_1.default.getInstance().all_hero.get(HeroConfig_1.Hero_Type.ANuBiSi).getSkillTipSize());
                            t11_1.opacity = 0;
                            cc.tween(finger_1).repeatForever(cc.sequence(cc.moveBy(1 * rate, cc.v2(0, 640)), cc.callFunc(function () {
                                finger_1.x = posX_1;
                                finger_1.y = posY_1 + 70;
                            }), cc.delayTime(0.2 * rate))).start();
                            touchNode.on(cc.Node.EventType.TOUCH_START, function (e) {
                                textScrollView.node.active = false;
                                bg1_1.active = false;
                                bg2_1.active = false;
                                bg3_1.active = false;
                                bg4_1.active = false;
                                t11_1.opacity = 255;
                                var pos = _this.node.convertToNodeSpaceAR(e.getLocation());
                                t11_1.setPosition(pos);
                            }, _this);
                            touchNode.on(cc.Node.EventType.TOUCH_MOVE, function (e) {
                                var pos = _this.node.convertToNodeSpaceAR(e.getLocation());
                                t11_1.setPosition(pos);
                            });
                            touchNode.on(cc.Node.EventType.TOUCH_CANCEL, function (e) {
                                var pos = _this.node.convertToNodeSpaceAR(e.getLocation());
                                if (pos.y > GameManager_1.default.getInstance().enemy_att_y) {
                                    _this.onTutorialsComplete();
                                    GameManager_1.default.getInstance().all_hero.get(HeroConfig_1.Hero_Type.ANuBiSi).releaseSkill(pos);
                                }
                                else {
                                    textScrollView.node.active = true;
                                    bg1_1.active = true;
                                    bg2_1.active = true;
                                    bg3_1.active = true;
                                    bg4_1.active = true;
                                    t11_1.opacity = 0;
                                    finger_1.x = posX_1;
                                    finger_1.y = posY_1 + 70;
                                    finger_1.stopAllActions();
                                    cc.tween(finger_1).repeatForever(cc.sequence(cc.moveBy(1 * rate, cc.v2(0, 640)), cc.callFunc(function () {
                                        finger_1.x = posX_1;
                                        finger_1.y = posY_1 + 70;
                                    }), cc.delayTime(0.2 * rate))).start();
                                }
                            }, _this);
                            touchNode.on(cc.Node.EventType.TOUCH_END, function () {
                                textScrollView.node.active = true;
                                bg1_1.active = true;
                                bg2_1.active = true;
                                bg3_1.active = true;
                                bg4_1.active = true;
                                t11_1.opacity = 0;
                                finger_1.x = posX_1;
                                finger_1.y = posY_1 + 70;
                                finger_1.stopAllActions();
                                cc.tween(finger_1).repeatForever(cc.sequence(cc.moveBy(1 * rate, cc.v2(0, 640)), cc.callFunc(function () {
                                    finger_1.x = posX_1;
                                    finger_1.y = posY_1 + 70;
                                }), cc.delayTime(0.2 * rate))).start();
                            }, _this);
                            //触摸穿透
                            // if(touchNode._touchListener)
                            // {
                            //     touchNode._touchListener.setSwallowTouches(false);
                            // }
                        }
                    }
                    break;
                case 203:
                    {
                        if (gm.cur_game_scene == Constants_1.GameScene.game) {
                            //兽王打断技能，点击直接释放到boss位置                        
                            var heroNode = GameManager_1.default.getInstance().all_hero.get(HeroConfig_1.Hero_Type.ShouWang).node;
                            var posY = heroNode.y;
                            var posX = heroNode.x;
                            touchNode.x = posX;
                            GameManager_1.default.getInstance().all_hero.get(HeroConfig_1.Hero_Type.ShouWang).setCD(0);
                            touchContinue.active = false;
                            var finger = node.getChildByName('finger');
                            finger.x = posX;
                            finger.y = posY + 70;
                            touchNode.y = posY;
                            node.getChildByName('bg1').y = posY + touchNode.height * (1 - touchNode.anchorY);
                            node.getChildByName('bg2').y = posY - touchNode.height * touchNode.anchorY;
                            var bg3 = node.getChildByName('bg3');
                            var bg4 = node.getChildByName('bg4');
                            bg3.x = posX - touchNode.width / 2;
                            bg3.y = posY;
                            bg4.y = posY;
                            bg4.x = posX + touchNode.width / 2;
                            cc.tween(finger).repeatForever(cc.sequence(cc.moveBy(0.3 * rate, cc.v2(0, 100)), cc.moveBy(0.3 * rate, cc.v2(0, -100)))).start();
                            touchNode.on(cc.Node.EventType.TOUCH_START, function () {
                                _this.onTutorialsComplete();
                                GameManager_1.default.getInstance().all_hero.get(HeroConfig_1.Hero_Type.ShouWang).releaseSkill(bossPos);
                            }, _this);
                            //触摸穿透
                            // if(touchNode._touchListener)
                            // {
                            //     touchNode._touchListener.setSwallowTouches(false);
                            // }
                        }
                    }
                    break;
                case 204:
                    {
                        if (gm.cur_game_scene == Constants_1.GameScene.game) {
                            touchContinue.active = false;
                            var finger = node.getChildByName('finger');
                            finger.active = false;
                            // cc.tween(finger).repeatForever(cc.sequence(cc.moveBy(0.3,cc.v2(0,100)),cc.moveBy(0.3,cc.v2(0,-100)))).start();
                            touchNode.on(cc.Node.EventType.TOUCH_END, function () {
                                _this.onTutorialsComplete();
                            }, _this);
                            //触摸穿透
                            if (touchNode._touchListener) {
                                touchNode._touchListener.setSwallowTouches(false);
                            }
                        }
                    }
                    break;
                case 211:
                    {
                        if (gm.cur_game_scene == Constants_1.GameScene.game) {
                            //触摸穿透
                            touchContinue.on(cc.Node.EventType.TOUCH_END, function () {
                                _this.onTutorialsComplete();
                            }, _this);
                        }
                    }
                    break;
                case 212:
                    {
                        if (gm.cur_game_scene == Constants_1.GameScene.game) {
                            //触摸穿透
                            touchContinue.on(cc.Node.EventType.TOUCH_END, function () {
                                _this.onTutorialsComplete();
                            }, _this);
                        }
                    }
                    break;
                case 213:
                    {
                        if (gm.cur_game_scene == Constants_1.GameScene.game) {
                            //触摸穿透
                            touchContinue.on(cc.Node.EventType.TOUCH_END, function () {
                                _this.onTutorialsComplete();
                            }, _this);
                        }
                    }
                    break;
                case 214:
                    {
                        if (gm.cur_game_scene == Constants_1.GameScene.game) {
                            touchContinue.active = false;
                            var finger = node.getChildByName('finger');
                            finger.active = false;
                            //cc.tween(finger).repeatForever(cc.sequence(cc.moveBy(0.3,cc.v2(0,100)),cc.moveBy(0.3,cc.v2(0,-100)))).start();
                            touchNode.on(cc.Node.EventType.TOUCH_END, function () {
                                _this.onTutorialsComplete();
                            }, _this);
                            //触摸穿透
                            if (touchNode._touchListener) {
                                touchNode._touchListener.setSwallowTouches(false);
                            }
                        }
                    }
                    break;
                case 221:
                    {
                        if (gm.cur_game_scene == Constants_1.GameScene.game) {
                            //touchContinue.active=false;
                            //let finger=node.getChildByName('finger');
                            //cc.tween(finger).repeatForever(cc.sequence(cc.moveBy(0.3,cc.v2(0,100)),cc.moveBy(0.3,cc.v2(0,-100)))).start();
                            touchNode.on(cc.Node.EventType.TOUCH_END, function () {
                                _this.onTutorialsComplete();
                            }, _this);
                            touchContinue.on(cc.Node.EventType.TOUCH_END, function () {
                                _this.onTutorialsComplete();
                            }, _this);
                            //触摸穿透
                            if (touchNode._touchListener) {
                                touchNode._touchListener.setSwallowTouches(false);
                            }
                        }
                    }
                    break;
                case 211:
                    {
                        if (gm.cur_game_scene == Constants_1.GameScene.home) {
                            //强制显示主页
                            GameManager_1.default.getInstance().game_to_home = Constants_1.Go_Type.Main;
                            GameManager_1.default.getInstance().jumoAndShowUi();
                            touchNode.setPosition(bossPos);
                            node.getChildByName('touchBg').setPosition(bossPos);
                            touchContinue.active = false;
                            var finger = node.getChildByName('finger');
                            finger.setPosition(bossPos);
                            cc.tween(finger).repeatForever(cc.sequence(cc.moveBy(0.3, cc.v2(0, 100)), cc.moveBy(0.3, cc.v2(0, -100)))).start();
                            touchNode.on(cc.Node.EventType.TOUCH_END, function () {
                                _this.onTutorialsComplete();
                            }, _this);
                            //触摸穿透
                            if (touchNode._touchListener) {
                                touchNode._touchListener.setSwallowTouches(false);
                            }
                        }
                    }
                    break;
                case 222:
                    {
                        if (gm.cur_game_scene == Constants_1.GameScene.home) {
                            GameManager_1.default.getInstance().game_to_home = Constants_1.Go_Type.City;
                            GameManager_1.default.getInstance().jumoAndShowUi();
                            touchNode.setPosition(bossPos);
                            node.getChildByName('touchBg').setPosition(bossPos);
                            touchContinue.active = false;
                            var finger = node.getChildByName('finger');
                            finger.setPosition(bossPos);
                            cc.tween(finger).repeatForever(cc.sequence(cc.moveBy(0.3, cc.v2(0, 100)), cc.moveBy(0.3, cc.v2(0, -100)))).start();
                            touchNode.on(cc.Node.EventType.TOUCH_END, function () {
                                _this.onTutorialsComplete();
                            }, _this);
                            //触摸穿透
                            // if(touchNode._touchListener)
                            // {
                            //     touchNode._touchListener.setSwallowTouches(false);
                            // }
                        }
                    }
                    break;
                case 231:
                    {
                        if (gm.cur_game_scene == Constants_1.GameScene.game) {
                            touchContinue.active = false;
                            var finger = node.getChildByName('finger');
                            finger.active = false;
                            //cc.tween(finger).repeatForever(cc.sequence(cc.moveBy(0.3,cc.v2(0,100)),cc.moveBy(0.3,cc.v2(0,-100)))).start();
                            touchNode.on(cc.Node.EventType.TOUCH_END, function () {
                                _this.onTutorialsComplete();
                            }, _this);
                            //触摸穿透
                            if (touchNode._touchListener) {
                                touchNode._touchListener.setSwallowTouches(false);
                            }
                        }
                    }
                    break;
                case 241:
                    {
                        if (gm.cur_game_scene == Constants_1.GameScene.game) {
                            touchContinue.active = false;
                            var posX_2 = 1 * 144 - 288;
                            touchNode.x = posX_2;
                            var posY_2 = GameManager_1.default.getInstance().all_hero.get(HeroConfig_1.Hero_Type.DeLuYi).node.y;
                            GameManager_1.default.getInstance().all_hero.get(HeroConfig_1.Hero_Type.DeLuYi).setCD(0);
                            var finger_2 = node.getChildByName('finger');
                            finger_2.x = posX_2;
                            finger_2.y = posY_2 + 70;
                            touchNode.y = posY_2;
                            var bg1_2 = node.getChildByName('bg1');
                            var bg2_2 = node.getChildByName('bg2');
                            bg1_2.y = posY_2 + touchNode.height * (1 - touchNode.anchorY);
                            bg2_2.y = posY_2 - touchNode.height * touchNode.anchorY;
                            var bg3_2 = node.getChildByName('bg3');
                            var bg4_2 = node.getChildByName('bg4');
                            bg3_2.x = posX_2 - touchNode.width / 2;
                            bg3_2.y = posY_2;
                            bg4_2.y = posY_2;
                            bg4_2.x = posX_2 + touchNode.width / 2;
                            var t12_1 = node.getChildByName('12');
                            t12_1.opacity = 0;
                            cc.tween(finger_2).repeatForever(cc.sequence(cc.moveBy(1 * rate, cc.v2(0, 800)), cc.callFunc(function () {
                                finger_2.x = posX_2;
                                finger_2.y = posY_2 + 70;
                            }), cc.delayTime(0.2 * rate))).start();
                            touchNode.on(cc.Node.EventType.TOUCH_START, function (e) {
                                textScrollView.node.active = false;
                                bg1_2.active = false;
                                bg2_2.active = false;
                                bg3_2.active = false;
                                bg4_2.active = false;
                                t12_1.opacity = 255;
                                var pos = _this.node.convertToNodeSpaceAR(e.getLocation());
                                t12_1.setPosition(pos);
                            }, _this);
                            touchNode.on(cc.Node.EventType.TOUCH_MOVE, function (e) {
                                var pos = _this.node.convertToNodeSpaceAR(e.getLocation());
                                t12_1.setPosition(pos);
                            });
                            touchNode.on(cc.Node.EventType.TOUCH_CANCEL, function (e) {
                                var pos = _this.node.convertToNodeSpaceAR(e.getLocation());
                                if (t12_1.getBoundingBox().contains(bossPos)) {
                                    _this.onTutorialsComplete();
                                    GameManager_1.default.getInstance().all_hero.get(HeroConfig_1.Hero_Type.DeLuYi).releaseSkill(pos);
                                }
                                else {
                                    textScrollView.node.active = true;
                                    bg1_2.active = true;
                                    bg2_2.active = true;
                                    bg3_2.active = true;
                                    bg4_2.active = true;
                                    finger_2.x = posX_2;
                                    finger_2.y = posY_2 + 70;
                                    finger_2.stopAllActions();
                                    cc.tween(finger_2).repeatForever(cc.sequence(cc.moveBy(1 * rate, cc.v2(0, 800)), cc.callFunc(function () {
                                        finger_2.x = posX_2;
                                        finger_2.y = posY_2 + 70;
                                    }), cc.delayTime(0.2 * rate))).start();
                                    t12_1.opacity = 0;
                                    t12_1.setPosition(pos);
                                }
                            }, _this);
                            touchNode.on(cc.Node.EventType.TOUCH_END, function (e) {
                                var pos = _this.node.convertToNodeSpaceAR(e.getLocation());
                                textScrollView.node.active = true;
                                bg1_2.active = true;
                                bg2_2.active = true;
                                bg3_2.active = true;
                                bg4_2.active = true;
                                finger_2.x = posX_2;
                                finger_2.y = posY_2 + 70;
                                finger_2.stopAllActions();
                                cc.tween(finger_2).repeatForever(cc.sequence(cc.moveBy(1 * rate, cc.v2(0, 800)), cc.callFunc(function () {
                                    finger_2.x = posX_2;
                                    finger_2.y = posY_2 + 70;
                                }), cc.delayTime(0.2 * rate))).start();
                                t12_1.opacity = 0;
                                t12_1.setPosition(pos);
                            }, _this);
                            // //触摸穿透
                            // if(touchNode._touchListener)
                            // {
                            //     touchNode._touchListener.setSwallowTouches(false);
                            // }
                        }
                    }
                    break;
                case 251:
                    {
                        if (gm.cur_game_scene == Constants_1.GameScene.game) {
                            //触摸穿透
                            touchContinue.on(cc.Node.EventType.TOUCH_END, function () {
                                _this.onTutorialsComplete();
                            }, _this);
                        }
                    }
                    break;
                case 252:
                    {
                        if (gm.cur_game_scene == Constants_1.GameScene.game) {
                            //触摸穿透
                            touchContinue.on(cc.Node.EventType.TOUCH_END, function () {
                                _this.onTutorialsComplete();
                                GameManager_1.default.getInstance().all_hero.get(HeroConfig_1.Hero_Type.GongJianShou).showHero();
                                var enemys = MonsterManager_1.default.getInstance().getMonstersForNearest(1, _this.node.getPosition(), 1000);
                                if (enemys) {
                                    //最前的敌人
                                    var enemyPos = enemys[0].getPosition();
                                    GameManager_1.default.getInstance().all_hero.get(HeroConfig_1.Hero_Type.GongJianShou).releaseSkill(enemyPos);
                                }
                            }, _this);
                        }
                    }
                    break;
                case 253:
                    {
                        if (gm.cur_game_scene == Constants_1.GameScene.game) {
                            //触摸穿透
                            touchContinue.on(cc.Node.EventType.TOUCH_END, function () {
                                _this.onTutorialsComplete();
                            }, _this);
                        }
                    }
                    break;
                case 261:
                    {
                        if (gm.cur_game_scene == Constants_1.GameScene.game) {
                            // touchContinue.active=false;
                            // let finger=node.getChildByName('finger');
                            // cc.tween(finger).repeatForever(cc.sequence(cc.moveBy(0.3,cc.v2(0,100)),cc.moveBy(0.3,cc.v2(0,-100)))).start();
                            touchContinue.on(cc.Node.EventType.TOUCH_END, function () {
                                _this.onTutorialsComplete();
                            }, _this);
                            // touchNode.on(cc.Node.EventType.TOUCH_END,()=>{                        
                            //     this.onTutorialsComplete(); 
                            // },this);
                            //触摸穿透
                            if (touchNode._touchListener) {
                                touchNode._touchListener.setSwallowTouches(false);
                            }
                        }
                    }
                    break;
                case 219:
                    {
                        if (gm.cur_game_scene == Constants_1.GameScene.home) {
                            //强制显示主页
                            GameManager_1.default.getInstance().game_to_home = Constants_1.Go_Type.Main;
                            GameManager_1.default.getInstance().jumoAndShowUi();
                            touchNode.setPosition(bossPos);
                            node.getChildByName('touchBg').setPosition(bossPos);
                            touchContinue.active = false;
                            var finger = node.getChildByName('finger');
                            finger.setPosition(bossPos);
                            cc.tween(finger).repeatForever(cc.sequence(cc.moveBy(0.3, cc.v2(0, 100)), cc.moveBy(0.3, cc.v2(0, -100)))).start();
                            touchNode.on(cc.Node.EventType.TOUCH_END, function () {
                                _this.onTutorialsComplete();
                            }, _this);
                            //触摸穿透
                            if (touchNode._touchListener) {
                                touchNode._touchListener.setSwallowTouches(false);
                            }
                        }
                    }
                    break;
                case 301:
                    {
                        if (gm.cur_game_scene == Constants_1.GameScene.game) {
                            touchContinue.active = false;
                            var finger = node.getChildByName('finger');
                            cc.tween(finger).repeatForever(cc.sequence(cc.moveBy(0.3, cc.v2(0, -100)), cc.moveBy(0.3, cc.v2(0, 100)))).start();
                            touchNode.on(cc.Node.EventType.TOUCH_END, function () {
                                _this.onTutorialsComplete();
                            }, _this);
                            //触摸穿透
                            if (touchNode._touchListener) {
                                touchNode._touchListener.setSwallowTouches(false);
                            }
                        }
                    }
                    break;
                case 302:
                    {
                        if (gm.cur_game_scene == Constants_1.GameScene.home) {
                            touchNode.setPosition(bossPos);
                            node.getChildByName('touchBg').setPosition(bossPos);
                            touchContinue.active = false;
                            var finger = node.getChildByName('finger');
                            finger.setPosition(bossPos);
                            cc.tween(finger).repeatForever(cc.sequence(cc.moveBy(0.3, cc.v2(0, 100)), cc.moveBy(0.3, cc.v2(0, -100)))).start();
                            touchNode.on(cc.Node.EventType.TOUCH_END, function () {
                                if (HeroManager_1.HeroManager.getInstance().getHeroLevel(HeroConfig_1.Hero_Type.ShouWang) >= 1) {
                                    _this.onTutorialsComplete();
                                    TutorailsManager_1.default.getInstance().is_tutorails_state = false;
                                }
                            }, _this);
                            //触摸穿透
                            if (touchNode._touchListener) {
                                touchNode._touchListener.setSwallowTouches(false);
                            }
                        }
                    }
                    break;
                case 221:
                    {
                        if (gm.cur_game_scene == Constants_1.GameScene.game) {
                            touchContinue.active = false;
                            var finger = node.getChildByName('finger');
                            cc.tween(finger).repeatForever(cc.sequence(cc.moveBy(0.3, cc.v2(0, 100)), cc.moveBy(0.3, cc.v2(0, -100)))).start();
                            touchNode.on(cc.Node.EventType.TOUCH_END, function () {
                                _this.onTutorialsComplete();
                            }, _this);
                            //触摸穿透
                            if (touchNode._touchListener) {
                                touchNode._touchListener.setSwallowTouches(false);
                            }
                        }
                    }
                    break;
                case 222:
                    {
                        if (gm.cur_game_scene == Constants_1.GameScene.home) {
                            touchNode.setPosition(bossPos);
                            node.getChildByName('touchBg').setPosition(bossPos);
                            var finger = node.getChildByName('finger');
                            finger.setPosition(bossPos);
                            cc.tween(finger).repeatForever(cc.sequence(cc.moveBy(0.3, cc.v2(0, 100)), cc.moveBy(0.3, cc.v2(0, -100)))).start();
                            touchNode.on(cc.Node.EventType.TOUCH_END, function () {
                                _this.onTutorialsComplete();
                                TutorailsManager_1.default.getInstance().is_tutorails_state = false;
                            }, _this);
                            //触摸穿透
                            if (touchNode._touchListener) {
                                touchNode._touchListener.setSwallowTouches(false);
                            }
                            touchContinue.active = false;
                            //touchNode.setContentSize(node.getChildByName('touchBg').)
                        }
                    }
                    break;
                case 223:
                    {
                        if (gm.cur_game_scene == Constants_1.GameScene.game) {
                            touchContinue.active = false;
                            var finger = node.getChildByName('finger');
                            cc.tween(finger).repeatForever(cc.sequence(cc.moveBy(0.3, cc.v2(0, 100)), cc.moveBy(0.3, cc.v2(0, -100)))).start();
                            touchNode.on(cc.Node.EventType.TOUCH_END, function () {
                                _this.onTutorialsComplete();
                            }, _this);
                            //触摸穿透
                            if (touchNode._touchListener) {
                                touchNode._touchListener.setSwallowTouches(false);
                            }
                        }
                    }
                    break;
                case 311:
                    {
                        if (gm.cur_game_scene == Constants_1.GameScene.game) {
                            touchContinue.active = false;
                            var finger = node.getChildByName('finger');
                            cc.tween(finger).repeatForever(cc.sequence(cc.moveBy(0.3, cc.v2(0, -100)), cc.moveBy(0.3, cc.v2(0, 100)))).start();
                            touchNode.on(cc.Node.EventType.TOUCH_END, function () {
                                _this.onTutorialsComplete();
                            }, _this);
                            //触摸穿透
                            if (touchNode._touchListener) {
                                touchNode._touchListener.setSwallowTouches(false);
                            }
                        }
                    }
                    break;
                case 312:
                    {
                        if (gm.cur_game_scene == Constants_1.GameScene.home) {
                            touchContinue.active = false;
                            touchNode.setPosition(bossPos);
                            node.getChildByName('touchBg').setPosition(bossPos);
                            var finger = node.getChildByName('finger');
                            finger.setPosition(bossPos);
                            cc.tween(finger).repeatForever(cc.sequence(cc.moveBy(0.3, cc.v2(0, 100)), cc.moveBy(0.3, cc.v2(0, -100)))).start();
                            touchNode.on(cc.Node.EventType.TOUCH_END, function () {
                                if (HeroManager_1.HeroManager.getInstance().getHeroStage(HeroConfig_1.Hero_Type.PaoShou) >= 0) {
                                    _this.onTutorialsComplete();
                                    TutorailsManager_1.default.getInstance().is_tutorails_state = false;
                                    TutorailsManager_1.default.getInstance().saveFinish();
                                }
                            }, _this);
                            //触摸穿透
                            if (touchNode._touchListener) {
                                touchNode._touchListener.setSwallowTouches(false);
                            }
                            // touchContinue.on(cc.Node.EventType.TOUCH_END,()=>{
                            //     this.onTutorialsComplete();
                            // },this);
                        }
                    }
                    break;
                case 331:
                    {
                        if (gm.cur_game_scene == Constants_1.GameScene.game) {
                            //触摸穿透
                            touchContinue.on(cc.Node.EventType.TOUCH_END, function () {
                                _this.onTutorialsComplete();
                            }, _this);
                        }
                    }
                    break;
                case 225:
                    {
                        if (gm.cur_game_scene == Constants_1.GameScene.game) {
                            touchContinue.active = false;
                            var finger = node.getChildByName('finger');
                            cc.tween(finger).repeatForever(cc.sequence(cc.moveBy(0.3, cc.v2(0, 100)), cc.moveBy(0.3, cc.v2(0, -100)))).start();
                            touchNode.on(cc.Node.EventType.TOUCH_END, function () {
                                _this.onTutorialsComplete();
                            }, _this);
                            //触摸穿透
                            if (touchNode._touchListener) {
                                touchNode._touchListener.setSwallowTouches(false);
                            }
                        }
                    }
                    break;
                case 226:
                    {
                        if (gm.cur_game_scene == Constants_1.GameScene.home) {
                            touchNode.setPosition(bossPos);
                            node.getChildByName('touchBg').setPosition(bossPos);
                            var finger = node.getChildByName('finger');
                            finger.setPosition(bossPos);
                            cc.tween(finger).repeatForever(cc.sequence(cc.moveBy(0.3, cc.v2(0, 100)), cc.moveBy(0.3, cc.v2(0, -100)))).start();
                            touchNode.on(cc.Node.EventType.TOUCH_END, function () {
                                _this.onTutorialsComplete();
                            }, _this);
                            //触摸穿透
                            if (touchNode._touchListener) {
                                touchNode._touchListener.setSwallowTouches(false);
                            }
                            touchContinue.active = false;
                        }
                    }
                    break;
                case 227:
                    {
                        if (gm.cur_game_scene == Constants_1.GameScene.home) {
                            touchNode.setPosition(bossPos);
                            node.getChildByName('touchBg').setPosition(bossPos);
                            var finger = node.getChildByName('finger');
                            finger.setPosition(bossPos);
                            cc.tween(finger).repeatForever(cc.sequence(cc.moveBy(0.3, cc.v2(0, 100)), cc.moveBy(0.3, cc.v2(0, -100)))).start();
                            touchNode.on(cc.Node.EventType.TOUCH_END, function () {
                                _this.onTutorialsComplete();
                                TutorailsManager_1.default.getInstance().saveFinish();
                            }, _this);
                            //触摸穿透
                            if (touchNode._touchListener) {
                                touchNode._touchListener.setSwallowTouches(false);
                            }
                            touchContinue.active = false;
                        }
                    }
                    break;
            }
        });
    };
    Tutorials = __decorate([
        ccclass
    ], Tutorials);
    return Tutorials;
}(cc.Component));
exports.default = Tutorials;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVHV0b3JpYWxzXFxUdXRvcmlhbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMENBQWtFO0FBQ2xFLDhDQUF5QztBQUN6QywwREFBZ0U7QUFDaEUsd0RBQXVEO0FBQ3ZELHNEQUFvRDtBQUVwRCw0REFBdUQ7QUFDdkQsb0VBQStEO0FBQy9ELGdFQUEyRDtBQUMzRCxvRUFBK0Q7QUFDL0QsMkNBQWlEO0FBQ2pELHVEQUFrRDtBQUc1QyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUF1Qyw2QkFBWTtJQUFuRDtRQUFBLHFFQXd2QkM7UUF0dkJHLG9CQUFjLEdBQVUsSUFBSSxDQUFDO1FBQzdCLGNBQVEsR0FBUSxDQUFDLENBQUM7UUFDbEIsV0FBSyxHQUFRLENBQUMsQ0FBQzs7SUFvdkJuQixDQUFDO0lBaHZCRyxRQUFRO0lBQ1IsdUNBQW1CLEdBQW5CO1FBRUksdUJBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMsNkJBQVcsQ0FBQyxJQUFJLEdBQUMsMEJBQWdCLENBQUMsV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDcEcsTUFBTTtRQUNOLDBCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDLFVBQVUsR0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3QyxJQUFHLElBQUksQ0FBQyxjQUFjLEVBQ3RCO1lBQ0ksSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQ3pCO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQzdCLDBCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDLFlBQVksR0FBQyxJQUFJLENBQUM7UUFDakQsMERBQTBEO0lBQzlELENBQUM7SUFFRCxvQ0FBZ0IsR0FBaEIsVUFBaUIsRUFBUyxFQUFDLGFBQXNCLEVB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IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdhbWVNb2RlLCBHYW1lU2NlbmUsIEdvX1R5cGUsIEppYVN1fSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgSGVyb0Jhc2VJbmZvTWFuYWdlciB9IGZyb20gXCIuLi9IZXJvL0RhdGEvSGVyb0Jhc2VJbmZvXCI7XHJcbmltcG9ydCB7IEhlcm9NYW5hZ2VyIH0gZnJvbSBcIi4uL0hlcm8vRGF0YS9IZXJvTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBIZXJvX1R5cGUgfSBmcm9tIFwiLi4vSGVyby9HYW1lL0hlcm9Db25maWdcIjtcclxuaW1wb3J0IHsgTGV2ZWxNYW5hZ2VyIH0gZnJvbSBcIi4uL0xldmVsL0xldmVsTWFuYWdlclwiO1xyXG5pbXBvcnQgTW9uc3Rlck1hbmFnZXIgZnJvbSBcIi4uL01vbnN0ZXIvTW9uc3Rlck1hbmFnZXJcIjtcclxuaW1wb3J0IHsgRm9sbG93X1R5cGUgfSBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dDb25zdGFudHNcIjtcclxuaW1wb3J0IEZvbGxvd01hbmFnZXIgZnJvbSBcIi4uL211bHRpTGFuZ3VhZ2UvRm9sbG93TWFuYWdlclwiO1xyXG5pbXBvcnQgTGFuZ3VhZ2VNYW5hZ2VyIGZyb20gXCIuLi9tdWx0aUxhbmd1YWdlL0xhbmd1YWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBDb3Vyc2VUZXh0TWFuYWdlciB9IGZyb20gXCIuL0NvdXJzZVRleHRcIjtcclxuaW1wb3J0IFR1dG9yYWlsc01hbmFnZXIgZnJvbSBcIi4vVHV0b3JhaWxzTWFuYWdlclwiO1xyXG5cclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVHV0b3JpYWxzIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBjbG9zZV9jYWxsYmFjazpGdW5jdGlvbj1udWxsO1xyXG4gICAgcnVvX3RpbWU6bnVtYmVyPTU7XHJcbiAgICB0X251bTpudW1iZXI9MDtcclxuXHJcblxyXG4gICAgXHJcbiAgICAvL+W9k+asoeaVmeeoi+WujOavlVxyXG4gICAgb25UdXRvcmlhbHNDb21wbGV0ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuaWsOaJi+W8leWvvCtUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd2luZ19pZCk7XHJcbiAgICAgICAgLy/liKDpmaToioLngrlcclxuICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd2luZ19pZD0tMTtcclxuICAgICAgICBpZih0aGlzLmNsb3NlX2NhbGxiYWNrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5jbG9zZV9jYWxsYmFjaygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5vZGUucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfdHV0b3JpYWw9bnVsbDtcclxuICAgICAgICAvL1R1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc190dXRvcmFpbHNfc3RhdGU9ZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1J1b1R1dG9yaWFscyhpZDpudW1iZXIsY2xvc2VDYWxsYmFjazpGdW5jdGlvbixpc0xlZnQ6Ym9vbGVhbj10cnVlLGJvc3NQb3M/OmNjLlZlYzIpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGdtPUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgdGhpcy5jbG9zZV9jYWxsYmFjaz1jbG9zZUNhbGxiYWNrO1xyXG4gICAgICAgIHRoaXMubm9kZS5yZW1vdmVBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc190dXRvcmFpbHNfc3RhdGU9dHJ1ZTtcclxuICAgICAgICAvLyBmb3IobGV0IGk9MDsgaTxsZW47IGkrKylcclxuICAgICAgICAvLyB7XHJcbiAgICAgICAgLy8gICAgIGxldCBqc29uPVR1dG9yaWFsc19Kc29uW2ldO1xyXG4gICAgICAgIC8vICAgICBpZihpZD09anNvbi54c19pZClcclxuICAgICAgICAvLyAgICAgeyAgICAgICAgICAgICAgICBcclxuICAgICAgICAvLyAgICAgICAgIC8v5qCH6aKYXHJcbiAgICAgICAgLy8gICAgICAgICB0aXRsZT1MYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZChqc29uLnRpdGxlX3RleHRfaWQpO1xyXG4gICAgICAgIC8vICAgICAgICAgLy/lhoXlrrlcclxuICAgICAgICAvLyAgICAgICAgIGRlczE9TGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoanNvbi5ndWlkYW5jZV90ZXh0X2lkKTtcclxuICAgICAgICAvLyAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8v5bGV56S65Ye65p2lXHJcbiAgICAgICAgbGV0IGlkU3RyPSd0JytpZDtcclxuICAgICAgICBjYy5yZXNvdXJjZXMubG9hZCgndHV0b3JpYWxzLycraWRTdHIsY2MuUHJlZmFiLChlcnJvcjogRXJyb3IsIGFzc2V0czpjYy5QcmVmYWIpPT57XHJcbiAgICAgICAgICAgIGlmKGVycm9yKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUoYXNzZXRzKTtcclxuICAgICAgICAgICAgbm9kZS5wYXJlbnQ9dGhpcy5ub2RlO1xyXG4gICAgICAgICAgICAvL+agueaNrmlk5p+l5om+XHJcbiAgICAgICAgICAgIGxldCBqc29uRGF0YT1Db3Vyc2VUZXh0TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25Db3Vyc2VUZXh0KGlkKTsgICAgICAgICAgICBcclxuICAgICAgICAgICAgLy/oi7Hpm4RpZFxyXG4gICAgICAgICAgICBsZXQgaGVyb0lkPWpzb25EYXRhLmhlcm9fdGV4dF9pZDsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8v5rua5Yqo6KeG5Zu+XHJcbiAgICAgICAgICAgIGxldCB0ZXh0U2Nyb2xsVmlldz1ub2RlLmdldENoaWxkQnlOYW1lKCd0ZXh0U2Nyb2xsVmlldycpLmdldENvbXBvbmVudChjYy5TY3JvbGxWaWV3KTtcclxuICAgICAgICAgICAgLy/lm77moIdcclxuICAgICAgICAgICAgbGV0IGljb249dGV4dFNjcm9sbFZpZXcubm9kZS5nZXRDaGlsZEJ5TmFtZSgnaWNvbicpLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG4gICAgICAgICAgICBpZihoZXJvSWQhPUhlcm9fVHlwZS5OVUxMKXtcclxuICAgICAgICAgICAgICAgIGljb24ubm9kZS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAgICAgICAgIGljb24uc3ByaXRlRnJhbWU9SGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvQm9keShoZXJvSWQpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGljb24ubm9kZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy/lhoXlrrlcclxuICAgICAgICAgICAgbGV0IGRlcz1MYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZChqc29uRGF0YS5ndWlkYW5jZV90ZXh0X2lkKTsgICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IGRlc0xhYmVsPXRleHRTY3JvbGxWaWV3LmNvbnRlbnQuZ2V0Q2hpbGRCeU5hbWUoJ2Rlc0xhYmVsJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTsgICAgICAgICAgICBcclxuICAgICAgICAgICAgZGVzTGFiZWwuc3RyaW5nPWRlcztcclxuICAgICAgICAgICAgdGV4dFNjcm9sbFZpZXcuc2Nyb2xsVG9Cb3R0b20oMC41KTtcclxuICAgICAgICAgICAgLy/lkI3lrZdcclxuICAgICAgICAgICAgbGV0IG5hbWU9TGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoSGVyb0Jhc2VJbmZvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE5hbWVUZXh0X0lEKGhlcm9JZCkpO1xyXG4gICAgICAgICAgICBsZXQgbmFtZUxhYmVsPXRleHRTY3JvbGxWaWV3Lm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ25hbWVMYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgICAgIG5hbWVMYWJlbC5zdHJpbmc9bmFtZTtcclxuICAgICAgICAgICAgLy/op6bmkbjnm5HlkKzkuIDkuItcclxuICAgICAgICAgICAgbGV0IHRvdWNoQ29udGludWU9dGV4dFNjcm9sbFZpZXcubm9kZS5nZXRDaGlsZEJ5TmFtZSgndG91Y2hDb250aW51ZScpO1xyXG4gICAgICAgICAgICBsZXQgdGV4dExhbmd1YWdlPXRvdWNoQ29udGludWUuZ2V0Q2hpbGRCeU5hbWUoJ1RleHRMYW5ndWFnZScpO1xyXG4gICAgICAgICAgICBsZXQgY2xpY2tJY29uPXRvdWNoQ29udGludWUuZ2V0Q2hpbGRCeU5hbWUoJ2NsaWNrSWNvbicpO1xyXG4gICAgICAgICAgICAvL+e/u+i9rOiuvue9rlxyXG4gICAgICAgICAgICBpZihpc0xlZnQpe1xyXG4gICAgICAgICAgICAgICAgdGV4dFNjcm9sbFZpZXcubm9kZS54PS1jYy53aW5TaXplLndpZHRoLzI7XHJcbiAgICAgICAgICAgICAgICB0ZXh0U2Nyb2xsVmlldy5ub2RlLnNjYWxlWD0xO1xyXG4gICAgICAgICAgICAgICAgZGVzTGFiZWwubm9kZS5zY2FsZVg9MTtcclxuICAgICAgICAgICAgICAgIG5hbWVMYWJlbC5ub2RlLnNjYWxlWD0xO1xyXG4gICAgICAgICAgICAgICAgdGV4dExhbmd1YWdlLnNjYWxlWD0xO1xyXG4gICAgICAgICAgICAgICAgY2xpY2tJY29uLnNjYWxlWD0xO1xyXG4gICAgICAgICAgICAgICAgY2xpY2tJY29uLnpJbmRleD0xO1xyXG4gICAgICAgICAgICAgICAgdGV4dExhbmd1YWdlLnpJbmRleD0yO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRleHRTY3JvbGxWaWV3Lm5vZGUueD1jYy53aW5TaXplLndpZHRoLzI7XHJcbiAgICAgICAgICAgICAgICB0ZXh0U2Nyb2xsVmlldy5ub2RlLnNjYWxlWD0tMTtcclxuICAgICAgICAgICAgICAgIGRlc0xhYmVsLm5vZGUuc2NhbGVYPS0xO1xyXG4gICAgICAgICAgICAgICAgbmFtZUxhYmVsLm5vZGUuc2NhbGVYPS0xO1xyXG4gICAgICAgICAgICAgICAgdGV4dExhbmd1YWdlLnNjYWxlWD0tMTtcclxuICAgICAgICAgICAgICAgIGNsaWNrSWNvbi5zY2FsZVg9LTE7XHJcbiAgICAgICAgICAgICAgICBjbGlja0ljb24uekluZGV4PTI7XHJcbiAgICAgICAgICAgICAgICB0ZXh0TGFuZ3VhZ2UuekluZGV4PTE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHJhdGU9R2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRHYW1lUmF0ZSgpO1xyXG4gICAgICAgICAgICBjYy50d2VlbihjbGlja0ljb24pLnJlcGVhdEZvcmV2ZXIoY2Muc2VxdWVuY2UoY2MubW92ZUJ5KDAuMipyYXRlLGNjLnYyKDAsMTApKSxjYy5tb3ZlQnkoMC4yKnJhdGUsY2MudjIoMCwtMTApKSkpLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICBsZXQgdG91Y2hOb2RlPW5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3RvdWNoTm9kZScpO1xyXG4gICAgICAgICAgICAvL2JnXHJcbiAgICAgICAgICAgIGxldCBiZz1ub2RlLmdldENoaWxkQnlOYW1lKCdiZycpO1xyXG4gICAgICAgICAgICBpZihiZyl7XHJcbiAgICAgICAgICAgICAgICAvL+inpuaRuOepv+mAj1xyXG4gICAgICAgICAgICAgICAgaWYoYmcuX3RvdWNoTGlzdGVuZXIpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmcub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25UdXRvcmlhbHNDb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihpZD09MjUyKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWxsX2hlcm8uZ2V0KEhlcm9fVHlwZS5Hb25nSmlhblNob3UpLnNob3dIZXJvKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZW5lbXlzPU1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TW9uc3RlcnNGb3JOZWFyZXN0KDEsdGhpcy5ub2RlLmdldFBvc2l0aW9uKCksMTAwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihlbmVteXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/mnIDliY3nmoTmlYzkurpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZW5lbXlQb3M9ZW5lbXlzWzBdLmdldFBvc2l0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hbGxfaGVyby5nZXQoSGVyb19UeXBlLkdvbmdKaWFuU2hvdSkucmVsZWFzZVNraWxsKGVuZW15UG9zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sdGhpcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3dpdGNoKGlkKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDIwMTp7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZ20uY3VyX2dhbWVfc2NlbmU9PUdhbWVTY2VuZS5ob21lKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/lvLrliLbmmL7npLrkuLvpobVcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nYW1lX3RvX2hvbWU9R29fVHlwZS5NYWluO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmp1bW9BbmRTaG93VWkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hOb2RlLnNldFBvc2l0aW9uKGJvc3NQb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLmdldENoaWxkQnlOYW1lKCd0b3VjaEJnJykuc2V0UG9zaXRpb24oYm9zc1Bvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoQ29udGludWUuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmluZ2VyPW5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2ZpbmdlcicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaW5nZXIuc2V0UG9zaXRpb24oYm9zc1Bvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLnR3ZWVuKGZpbmdlcikucmVwZWF0Rm9yZXZlcihjYy5zZXF1ZW5jZShjYy5tb3ZlQnkoMC4zLGNjLnYyKDAsMTAwKSksY2MubW92ZUJ5KDAuMyxjYy52MigwLC0xMDApKSkpLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoTm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwoKT0+eyAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5nZXRDaGlsZEJ5TmFtZSgndG91Y2hCZycpLnNjYWxlPTAuOTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSx0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hOb2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwoKT0+eyAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vblR1dG9yaWFsc0NvbXBsZXRlKCk7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+inpuaRuOepv+mAj1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0b3VjaE5vZGUuX3RvdWNoTGlzdGVuZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoTm9kZS5fdG91Y2hMaXN0ZW5lci5zZXRTd2FsbG93VG91Y2hlcyhmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDIwMjp7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZ20uY3VyX2dhbWVfc2NlbmU9PUdhbWVTY2VuZS5nYW1lKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hDb250aW51ZS5hY3RpdmU9ZmFsc2U7ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBoZXJvTm9kZT1HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFsbF9oZXJvLmdldChIZXJvX1R5cGUuQU51QmlTaSkubm9kZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcG9zWT1oZXJvTm9kZS55O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcG9zWD1oZXJvTm9kZS54O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaE5vZGUueD1wb3NYO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFsbF9oZXJvLmdldChIZXJvX1R5cGUuQU51QmlTaSkuc2V0Q0QoMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaW5nZXI9bm9kZS5nZXRDaGlsZEJ5TmFtZSgnZmluZ2VyJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbmdlci54PXBvc1g7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbmdlci55PXBvc1krNzA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoTm9kZS55PXBvc1k7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBiZzE9bm9kZS5nZXRDaGlsZEJ5TmFtZSgnYmcxJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBiZzI9bm9kZS5nZXRDaGlsZEJ5TmFtZSgnYmcyJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJnMS55PXBvc1krdG91Y2hOb2RlLmhlaWdodCooMS10b3VjaE5vZGUuYW5jaG9yWSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJnMi55PXBvc1ktdG91Y2hOb2RlLmhlaWdodCp0b3VjaE5vZGUuYW5jaG9yWTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGJnMz1ub2RlLmdldENoaWxkQnlOYW1lKCdiZzMnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGJnND1ub2RlLmdldENoaWxkQnlOYW1lKCdiZzQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmczLng9cG9zWC10b3VjaE5vZGUud2lkdGgvMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmczLnk9cG9zWTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmc0Lnk9cG9zWTsgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmc0Lng9cG9zWCt0b3VjaE5vZGUud2lkdGgvMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHQxMT1ub2RlLmdldENoaWxkQnlOYW1lKCd0MTEnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdDExLnNldENvbnRlbnRTaXplKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWxsX2hlcm8uZ2V0KEhlcm9fVHlwZS5BTnVCaVNpKS5nZXRTa2lsbFRpcFNpemUoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHQxMS5vcGFjaXR5PTA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLnR3ZWVuKGZpbmdlcikucmVwZWF0Rm9yZXZlcihjYy5zZXF1ZW5jZShjYy5tb3ZlQnkoMSpyYXRlLGNjLnYyKDAsNjQwKSksY2MuY2FsbEZ1bmMoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbmdlci54PXBvc1g7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaW5nZXIueT1wb3NZKzcwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSxjYy5kZWxheVRpbWUoMC4yKnJhdGUpKSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hOb2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULChlKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dFNjcm9sbFZpZXcubm9kZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZzEuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmcyLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJnMy5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZzQuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdDExLm9wYWNpdHk9MjU1O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBvcz10aGlzLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIoZS5nZXRMb2NhdGlvbigpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHQxMS5zZXRQb3NpdGlvbihwb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaE5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfTU9WRSwoZTpjYy5FdmVudC5FdmVudFRvdWNoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBvcz10aGlzLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIoZS5nZXRMb2NhdGlvbigpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHQxMS5zZXRQb3NpdGlvbihwb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaE5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfQ0FOQ0VMLChlOmNjLkV2ZW50LkV2ZW50VG91Y2gpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcG9zPXRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihlLmdldExvY2F0aW9uKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYocG9zLnk+R2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5lbmVteV9hdHRfeSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vblR1dG9yaWFsc0NvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hbGxfaGVyby5nZXQoSGVyb19UeXBlLkFOdUJpU2kpLnJlbGVhc2VTa2lsbChwb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dFNjcm9sbFZpZXcubm9kZS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZzEuYWN0aXZlPXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmcyLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJnMy5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZzQuYWN0aXZlPXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdDExLm9wYWNpdHk9MDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaW5nZXIueD1wb3NYO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbmdlci55PXBvc1krNzA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmluZ2VyLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MudHdlZW4oZmluZ2VyKS5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKGNjLm1vdmVCeSgxKnJhdGUsY2MudjIoMCw2NDApKSxjYy5jYWxsRnVuYygoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaW5nZXIueD1wb3NYO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaW5nZXIueT1wb3NZKzcwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLGNjLmRlbGF5VGltZSgwLjIqcmF0ZSkpKS5zdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaE5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0U2Nyb2xsVmlldy5ub2RlLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmcxLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmcyLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmczLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmc0LmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdDExLm9wYWNpdHk9MDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbmdlci54PXBvc1g7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaW5nZXIueT1wb3NZKzcwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmluZ2VyLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy50d2VlbihmaW5nZXIpLnJlcGVhdEZvcmV2ZXIoY2Muc2VxdWVuY2UoY2MubW92ZUJ5KDEqcmF0ZSxjYy52MigwLDY0MCkpLGNjLmNhbGxGdW5jKCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmluZ2VyLng9cG9zWDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaW5nZXIueT1wb3NZKzcwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksY2MuZGVsYXlUaW1lKDAuMipyYXRlKSkpLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sdGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v6Kem5pG456m/6YCPXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmKHRvdWNoTm9kZS5fdG91Y2hMaXN0ZW5lcilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgdG91Y2hOb2RlLl90b3VjaExpc3RlbmVyLnNldFN3YWxsb3dUb3VjaGVzKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMjAzOntcclxuICAgICAgICAgICAgICAgICAgICBpZihnbS5jdXJfZ2FtZV9zY2VuZT09R2FtZVNjZW5lLmdhbWUpXHJcbiAgICAgICAgICAgICAgICAgICAgeyAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+WFveeOi+aJk+aWreaKgOiDve+8jOeCueWHu+ebtOaOpemHiuaUvuWIsGJvc3PkvY3nva4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGhlcm9Ob2RlPUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWxsX2hlcm8uZ2V0KEhlcm9fVHlwZS5TaG91V2FuZykubm9kZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBvc1k9aGVyb05vZGUueTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBvc1g9aGVyb05vZGUueDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hOb2RlLng9cG9zWDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hbGxfaGVyby5nZXQoSGVyb19UeXBlLlNob3VXYW5nKS5zZXRDRCgwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hDb250aW51ZS5hY3RpdmU9ZmFsc2U7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaW5nZXI9bm9kZS5nZXRDaGlsZEJ5TmFtZSgnZmluZ2VyJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbmdlci54PXBvc1g7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbmdlci55PXBvc1krNzA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoTm9kZS55PXBvc1k7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2JnMScpLnk9cG9zWSt0b3VjaE5vZGUuaGVpZ2h0KigxLXRvdWNoTm9kZS5hbmNob3JZKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5nZXRDaGlsZEJ5TmFtZSgnYmcyJykueT1wb3NZLXRvdWNoTm9kZS5oZWlnaHQqdG91Y2hOb2RlLmFuY2hvclk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBiZzM9bm9kZS5nZXRDaGlsZEJ5TmFtZSgnYmczJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBiZzQ9bm9kZS5nZXRDaGlsZEJ5TmFtZSgnYmc0Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJnMy54PXBvc1gtdG91Y2hOb2RlLndpZHRoLzI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJnMy55PXBvc1k7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJnNC55PXBvc1k7ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJnNC54PXBvc1grdG91Y2hOb2RlLndpZHRoLzI7ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLnR3ZWVuKGZpbmdlcikucmVwZWF0Rm9yZXZlcihjYy5zZXF1ZW5jZShjYy5tb3ZlQnkoMC4zKnJhdGUsY2MudjIoMCwxMDApKSxjYy5tb3ZlQnkoMC4zKnJhdGUsY2MudjIoMCwtMTAwKSkpKS5zdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaE5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25UdXRvcmlhbHNDb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hbGxfaGVyby5nZXQoSGVyb19UeXBlLlNob3VXYW5nKS5yZWxlYXNlU2tpbGwoYm9zc1Bvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sdGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v6Kem5pG456m/6YCPXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmKHRvdWNoTm9kZS5fdG91Y2hMaXN0ZW5lcilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgdG91Y2hOb2RlLl90b3VjaExpc3RlbmVyLnNldFN3YWxsb3dUb3VjaGVzKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1icmVhazsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBjYXNlIDIwNDp7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZ20uY3VyX2dhbWVfc2NlbmU9PUdhbWVTY2VuZS5nYW1lKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hDb250aW51ZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaW5nZXI9bm9kZS5nZXRDaGlsZEJ5TmFtZSgnZmluZ2VyJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbmdlci5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNjLnR3ZWVuKGZpbmdlcikucmVwZWF0Rm9yZXZlcihjYy5zZXF1ZW5jZShjYy5tb3ZlQnkoMC4zLGNjLnYyKDAsMTAwKSksY2MubW92ZUJ5KDAuMyxjYy52MigwLC0xMDApKSkpLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoTm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsKCk9PnsgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25UdXRvcmlhbHNDb21wbGV0ZSgpOyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSx0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/op6bmkbjnqb/pgI9cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodG91Y2hOb2RlLl90b3VjaExpc3RlbmVyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3VjaE5vZGUuX3RvdWNoTGlzdGVuZXIuc2V0U3dhbGxvd1RvdWNoZXMoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAyMTE6e1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGdtLmN1cl9nYW1lX3NjZW5lPT1HYW1lU2NlbmUuZ2FtZSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v6Kem5pG456m/6YCPXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoQ29udGludWUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uVHV0b3JpYWxzQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSx0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDIxMjp7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZ20uY3VyX2dhbWVfc2NlbmU9PUdhbWVTY2VuZS5nYW1lKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/op6bmkbjnqb/pgI9cclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hDb250aW51ZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25UdXRvcmlhbHNDb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMjEzOntcclxuICAgICAgICAgICAgICAgICAgICBpZihnbS5jdXJfZ2FtZV9zY2VuZT09R2FtZVNjZW5lLmdhbWUpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+inpuaRuOepv+mAj1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaENvbnRpbnVlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vblR1dG9yaWFsc0NvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sdGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAyMTQ6e1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGdtLmN1cl9nYW1lX3NjZW5lPT1HYW1lU2NlbmUuZ2FtZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoQ29udGludWUuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmluZ2VyPW5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2ZpbmdlcicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaW5nZXIuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NjLnR3ZWVuKGZpbmdlcikucmVwZWF0Rm9yZXZlcihjYy5zZXF1ZW5jZShjYy5tb3ZlQnkoMC4zLGNjLnYyKDAsMTAwKSksY2MubW92ZUJ5KDAuMyxjYy52MigwLC0xMDApKSkpLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoTm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsKCk9PnsgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25UdXRvcmlhbHNDb21wbGV0ZSgpOyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSx0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/op6bmkbjnqb/pgI9cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodG91Y2hOb2RlLl90b3VjaExpc3RlbmVyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3VjaE5vZGUuX3RvdWNoTGlzdGVuZXIuc2V0U3dhbGxvd1RvdWNoZXMoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAyMjE6e1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGdtLmN1cl9nYW1lX3NjZW5lPT1HYW1lU2NlbmUuZ2FtZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdG91Y2hDb250aW51ZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbGV0IGZpbmdlcj1ub2RlLmdldENoaWxkQnlOYW1lKCdmaW5nZXInKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9jYy50d2VlbihmaW5nZXIpLnJlcGVhdEZvcmV2ZXIoY2Muc2VxdWVuY2UoY2MubW92ZUJ5KDAuMyxjYy52MigwLDEwMCkpLGNjLm1vdmVCeSgwLjMsY2MudjIoMCwtMTAwKSkpKS5zdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaE5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCgpPT57ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uVHV0b3JpYWxzQ29tcGxldGUoKTsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sdGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoQ29udGludWUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uVHV0b3JpYWxzQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSx0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/op6bmkbjnqb/pgI9cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodG91Y2hOb2RlLl90b3VjaExpc3RlbmVyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3VjaE5vZGUuX3RvdWNoTGlzdGVuZXIuc2V0U3dhbGxvd1RvdWNoZXMoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWJyZWFrOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGNhc2UgMjExOntcclxuICAgICAgICAgICAgICAgICAgICBpZihnbS5jdXJfZ2FtZV9zY2VuZT09R2FtZVNjZW5lLmhvbWUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+W8uuWItuaYvuekuuS4u+mhtVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdhbWVfdG9faG9tZT1Hb19UeXBlLk1haW47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuanVtb0FuZFNob3dVaSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaE5vZGUuc2V0UG9zaXRpb24oYm9zc1Bvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3RvdWNoQmcnKS5zZXRQb3NpdGlvbihib3NzUG9zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hDb250aW51ZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaW5nZXI9bm9kZS5nZXRDaGlsZEJ5TmFtZSgnZmluZ2VyJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbmdlci5zZXRQb3NpdGlvbihib3NzUG9zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MudHdlZW4oZmluZ2VyKS5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKGNjLm1vdmVCeSgwLjMsY2MudjIoMCwxMDApKSxjYy5tb3ZlQnkoMC4zLGNjLnYyKDAsLTEwMCkpKSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hOb2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vblR1dG9yaWFsc0NvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sdGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v6Kem5pG456m/6YCPXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRvdWNoTm9kZS5fdG91Y2hMaXN0ZW5lcilcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hOb2RlLl90b3VjaExpc3RlbmVyLnNldFN3YWxsb3dUb3VjaGVzKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMjIyOntcclxuICAgICAgICAgICAgICAgICAgICBpZihnbS5jdXJfZ2FtZV9zY2VuZT09R2FtZVNjZW5lLmhvbWUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdhbWVfdG9faG9tZT1Hb19UeXBlLkNpdHk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuanVtb0FuZFNob3dVaSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaE5vZGUuc2V0UG9zaXRpb24oYm9zc1Bvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3RvdWNoQmcnKS5zZXRQb3NpdGlvbihib3NzUG9zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hDb250aW51ZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaW5nZXI9bm9kZS5nZXRDaGlsZEJ5TmFtZSgnZmluZ2VyJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbmdlci5zZXRQb3NpdGlvbihib3NzUG9zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MudHdlZW4oZmluZ2VyKS5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKGNjLm1vdmVCeSgwLjMsY2MudjIoMCwxMDApKSxjYy5tb3ZlQnkoMC4zLGNjLnYyKDAsLTEwMCkpKSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hOb2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vblR1dG9yaWFsc0NvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sdGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v6Kem5pG456m/6YCPXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmKHRvdWNoTm9kZS5fdG91Y2hMaXN0ZW5lcilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgdG91Y2hOb2RlLl90b3VjaExpc3RlbmVyLnNldFN3YWxsb3dUb3VjaGVzKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMjMxOntcclxuICAgICAgICAgICAgICAgICAgICBpZihnbS5jdXJfZ2FtZV9zY2VuZT09R2FtZVNjZW5lLmdhbWUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaENvbnRpbnVlLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpbmdlcj1ub2RlLmdldENoaWxkQnlOYW1lKCdmaW5nZXInKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmluZ2VyLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9jYy50d2VlbihmaW5nZXIpLnJlcGVhdEZvcmV2ZXIoY2Muc2VxdWVuY2UoY2MubW92ZUJ5KDAuMyxjYy52MigwLDEwMCkpLGNjLm1vdmVCeSgwLjMsY2MudjIoMCwtMTAwKSkpKS5zdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaE5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCgpPT57ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uVHV0b3JpYWxzQ29tcGxldGUoKTsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sdGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v6Kem5pG456m/6YCPXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRvdWNoTm9kZS5fdG91Y2hMaXN0ZW5lcilcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hOb2RlLl90b3VjaExpc3RlbmVyLnNldFN3YWxsb3dUb3VjaGVzKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1icmVhazsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBjYXNlIDI0MTp7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZ20uY3VyX2dhbWVfc2NlbmU9PUdhbWVTY2VuZS5nYW1lKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hDb250aW51ZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwb3NYPTEqMTQ0LTI4ODtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hOb2RlLng9cG9zWDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBvc1k9R2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hbGxfaGVyby5nZXQoSGVyb19UeXBlLkRlTHVZaSkubm9kZS55O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFsbF9oZXJvLmdldChIZXJvX1R5cGUuRGVMdVlpKS5zZXRDRCgwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpbmdlcj1ub2RlLmdldENoaWxkQnlOYW1lKCdmaW5nZXInKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmluZ2VyLng9cG9zWDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmluZ2VyLnk9cG9zWSs3MDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hOb2RlLnk9cG9zWTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGJnMT1ub2RlLmdldENoaWxkQnlOYW1lKCdiZzEnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGJnMj1ub2RlLmdldENoaWxkQnlOYW1lKCdiZzInKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmcxLnk9cG9zWSt0b3VjaE5vZGUuaGVpZ2h0KigxLXRvdWNoTm9kZS5hbmNob3JZKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmcyLnk9cG9zWS10b3VjaE5vZGUuaGVpZ2h0KnRvdWNoTm9kZS5hbmNob3JZO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYmczPW5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2JnMycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYmc0PW5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2JnNCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiZzMueD1wb3NYLXRvdWNoTm9kZS53aWR0aC8yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiZzMueT1wb3NZO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiZzQueT1wb3NZOyAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBiZzQueD1wb3NYK3RvdWNoTm9kZS53aWR0aC8yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdDEyPW5vZGUuZ2V0Q2hpbGRCeU5hbWUoJzEyJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHQxMi5vcGFjaXR5PTA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLnR3ZWVuKGZpbmdlcikucmVwZWF0Rm9yZXZlcihjYy5zZXF1ZW5jZShjYy5tb3ZlQnkoMSpyYXRlLGNjLnYyKDAsODAwKSksY2MuY2FsbEZ1bmMoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbmdlci54PXBvc1g7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaW5nZXIueT1wb3NZKzcwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSxjYy5kZWxheVRpbWUoMC4yKnJhdGUpKSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hOb2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULChlOmNjLkV2ZW50LkV2ZW50VG91Y2gpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0U2Nyb2xsVmlldy5ub2RlLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJnMS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZzIuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmczLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJnNC5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0MTIub3BhY2l0eT0yNTU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcG9zPXRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihlLmdldExvY2F0aW9uKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdDEyLnNldFBvc2l0aW9uKHBvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sdGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoTm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9NT1ZFLChlOmNjLkV2ZW50LkV2ZW50VG91Y2gpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcG9zPXRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihlLmdldExvY2F0aW9uKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdDEyLnNldFBvc2l0aW9uKHBvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoTm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9DQU5DRUwsKGU6Y2MuRXZlbnQuRXZlbnRUb3VjaCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwb3M9dGhpcy5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKGUuZ2V0TG9jYXRpb24oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0MTIuZ2V0Qm91bmRpbmdCb3goKS5jb250YWlucyhib3NzUG9zKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vblR1dG9yaWFsc0NvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hbGxfaGVyby5nZXQoSGVyb19UeXBlLkRlTHVZaSkucmVsZWFzZVNraWxsKHBvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0U2Nyb2xsVmlldy5ub2RlLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJnMS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZzIuYWN0aXZlPXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmczLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJnNC5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaW5nZXIueD1wb3NYO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbmdlci55PXBvc1krNzA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmluZ2VyLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MudHdlZW4oZmluZ2VyKS5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKGNjLm1vdmVCeSgxKnJhdGUsY2MudjIoMCw4MDApKSxjYy5jYWxsRnVuYygoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaW5nZXIueD1wb3NYO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaW5nZXIueT1wb3NZKzcwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLGNjLmRlbGF5VGltZSgwLjIqcmF0ZSkpKS5zdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHQxMi5vcGFjaXR5PTA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdDEyLnNldFBvc2l0aW9uKHBvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sdGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoTm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsKGU6Y2MuRXZlbnQuRXZlbnRUb3VjaCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwb3M9dGhpcy5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKGUuZ2V0TG9jYXRpb24oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0U2Nyb2xsVmlldy5ub2RlLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmcxLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmcyLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmczLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmc0LmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmluZ2VyLng9cG9zWDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbmdlci55PXBvc1krNzA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaW5nZXIuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLnR3ZWVuKGZpbmdlcikucmVwZWF0Rm9yZXZlcihjYy5zZXF1ZW5jZShjYy5tb3ZlQnkoMSpyYXRlLGNjLnYyKDAsODAwKSksY2MuY2FsbEZ1bmMoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaW5nZXIueD1wb3NYO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbmdlci55PXBvc1krNzA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxjYy5kZWxheVRpbWUoMC4yKnJhdGUpKSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHQxMi5vcGFjaXR5PTA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0MTIuc2V0UG9zaXRpb24ocG9zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSx0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gLy/op6bmkbjnqb/pgI9cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYodG91Y2hOb2RlLl90b3VjaExpc3RlbmVyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICB0b3VjaE5vZGUuX3RvdWNoTGlzdGVuZXIuc2V0U3dhbGxvd1RvdWNoZXMoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAyNTE6e1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGdtLmN1cl9nYW1lX3NjZW5lPT1HYW1lU2NlbmUuZ2FtZSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v6Kem5pG456m/6YCPXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoQ29udGludWUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uVHV0b3JpYWxzQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSx0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDI1Mjp7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZ20uY3VyX2dhbWVfc2NlbmU9PUdhbWVTY2VuZS5nYW1lKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/op6bmkbjnqb/pgI9cclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hDb250aW51ZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25UdXRvcmlhbHNDb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hbGxfaGVyby5nZXQoSGVyb19UeXBlLkdvbmdKaWFuU2hvdSkuc2hvd0hlcm8oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBlbmVteXM9TW9uc3Rlck1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNb25zdGVyc0Zvck5lYXJlc3QoMSx0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKSwxMDAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGVuZW15cylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+acgOWJjeeahOaVjOS6ulxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBlbmVteVBvcz1lbmVteXNbMF0uZ2V0UG9zaXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFsbF9oZXJvLmdldChIZXJvX1R5cGUuR29uZ0ppYW5TaG91KS5yZWxlYXNlU2tpbGwoZW5lbXlQb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sdGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAyNTM6e1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGdtLmN1cl9nYW1lX3NjZW5lPT1HYW1lU2NlbmUuZ2FtZSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v6Kem5pG456m/6YCPXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoQ29udGludWUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uVHV0b3JpYWxzQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSx0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDI2MTp7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZ20uY3VyX2dhbWVfc2NlbmU9PUdhbWVTY2VuZS5nYW1lKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdG91Y2hDb250aW51ZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxldCBmaW5nZXI9bm9kZS5nZXRDaGlsZEJ5TmFtZSgnZmluZ2VyJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNjLnR3ZWVuKGZpbmdlcikucmVwZWF0Rm9yZXZlcihjYy5zZXF1ZW5jZShjYy5tb3ZlQnkoMC4zLGNjLnYyKDAsMTAwKSksY2MubW92ZUJ5KDAuMyxjYy52MigwLC0xMDApKSkpLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoQ29udGludWUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uVHV0b3JpYWxzQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSx0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdG91Y2hOb2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwoKT0+eyAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5vblR1dG9yaWFsc0NvbXBsZXRlKCk7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB9LHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+inpuaRuOepv+mAj1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0b3VjaE5vZGUuX3RvdWNoTGlzdGVuZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoTm9kZS5fdG91Y2hMaXN0ZW5lci5zZXRTd2FsbG93VG91Y2hlcyhmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDIxOTp7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZ20uY3VyX2dhbWVfc2NlbmU9PUdhbWVTY2VuZS5ob21lKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/lvLrliLbmmL7npLrkuLvpobVcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nYW1lX3RvX2hvbWU9R29fVHlwZS5NYWluO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmp1bW9BbmRTaG93VWkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hOb2RlLnNldFBvc2l0aW9uKGJvc3NQb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLmdldENoaWxkQnlOYW1lKCd0b3VjaEJnJykuc2V0UG9zaXRpb24oYm9zc1Bvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoQ29udGludWUuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmluZ2VyPW5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2ZpbmdlcicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaW5nZXIuc2V0UG9zaXRpb24oYm9zc1Bvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLnR3ZWVuKGZpbmdlcikucmVwZWF0Rm9yZXZlcihjYy5zZXF1ZW5jZShjYy5tb3ZlQnkoMC4zLGNjLnYyKDAsMTAwKSksY2MubW92ZUJ5KDAuMyxjYy52MigwLC0xMDApKSkpLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoTm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25UdXRvcmlhbHNDb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+inpuaRuOepv+mAj1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0b3VjaE5vZGUuX3RvdWNoTGlzdGVuZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoTm9kZS5fdG91Y2hMaXN0ZW5lci5zZXRTd2FsbG93VG91Y2hlcyhmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDMwMTp7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZ20uY3VyX2dhbWVfc2NlbmU9PUdhbWVTY2VuZS5nYW1lKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hDb250aW51ZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaW5nZXI9bm9kZS5nZXRDaGlsZEJ5TmFtZSgnZmluZ2VyJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLnR3ZWVuKGZpbmdlcikucmVwZWF0Rm9yZXZlcihjYy5zZXF1ZW5jZShjYy5tb3ZlQnkoMC4zLGNjLnYyKDAsLTEwMCkpLGNjLm1vdmVCeSgwLjMsY2MudjIoMCwxMDApKSkpLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoTm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsKCk9PnsgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25UdXRvcmlhbHNDb21wbGV0ZSgpOyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSx0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/op6bmkbjnqb/pgI9cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodG91Y2hOb2RlLl90b3VjaExpc3RlbmVyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3VjaE5vZGUuX3RvdWNoTGlzdGVuZXIuc2V0U3dhbGxvd1RvdWNoZXMoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAzMDI6e1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGdtLmN1cl9nYW1lX3NjZW5lPT1HYW1lU2NlbmUuaG9tZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoTm9kZS5zZXRQb3NpdGlvbihib3NzUG9zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5nZXRDaGlsZEJ5TmFtZSgndG91Y2hCZycpLnNldFBvc2l0aW9uKGJvc3NQb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaENvbnRpbnVlLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpbmdlcj1ub2RlLmdldENoaWxkQnlOYW1lKCdmaW5nZXInKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmluZ2VyLnNldFBvc2l0aW9uKGJvc3NQb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy50d2VlbihmaW5nZXIpLnJlcGVhdEZvcmV2ZXIoY2Muc2VxdWVuY2UoY2MubW92ZUJ5KDAuMyxjYy52MigwLDEwMCkpLGNjLm1vdmVCeSgwLjMsY2MudjIoMCwtMTAwKSkpKS5zdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaE5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9MZXZlbChIZXJvX1R5cGUuU2hvdVdhbmcpPj0xKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uVHV0b3JpYWxzQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNfdHV0b3JhaWxzX3N0YXRlPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+inpuaRuOepv+mAj1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0b3VjaE5vZGUuX3RvdWNoTGlzdGVuZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoTm9kZS5fdG91Y2hMaXN0ZW5lci5zZXRTd2FsbG93VG91Y2hlcyhmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDIyMTp7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZ20uY3VyX2dhbWVfc2NlbmU9PUdhbWVTY2VuZS5nYW1lKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hDb250aW51ZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaW5nZXI9bm9kZS5nZXRDaGlsZEJ5TmFtZSgnZmluZ2VyJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLnR3ZWVuKGZpbmdlcikucmVwZWF0Rm9yZXZlcihjYy5zZXF1ZW5jZShjYy5tb3ZlQnkoMC4zLGNjLnYyKDAsMTAwKSksY2MubW92ZUJ5KDAuMyxjYy52MigwLC0xMDApKSkpLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoTm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsKCk9PnsgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25UdXRvcmlhbHNDb21wbGV0ZSgpOyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSx0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/op6bmkbjnqb/pgI9cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodG91Y2hOb2RlLl90b3VjaExpc3RlbmVyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3VjaE5vZGUuX3RvdWNoTGlzdGVuZXIuc2V0U3dhbGxvd1RvdWNoZXMoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAyMjI6e1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGdtLmN1cl9nYW1lX3NjZW5lPT1HYW1lU2NlbmUuaG9tZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoTm9kZS5zZXRQb3NpdGlvbihib3NzUG9zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5nZXRDaGlsZEJ5TmFtZSgndG91Y2hCZycpLnNldFBvc2l0aW9uKGJvc3NQb3MpOyAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmluZ2VyPW5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2ZpbmdlcicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaW5nZXIuc2V0UG9zaXRpb24oYm9zc1Bvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLnR3ZWVuKGZpbmdlcikucmVwZWF0Rm9yZXZlcihjYy5zZXF1ZW5jZShjYy5tb3ZlQnkoMC4zLGNjLnYyKDAsMTAwKSksY2MubW92ZUJ5KDAuMyxjYy52MigwLC0xMDApKSkpLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoTm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25UdXRvcmlhbHNDb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzX3R1dG9yYWlsc19zdGF0ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSx0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/op6bmkbjnqb/pgI9cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodG91Y2hOb2RlLl90b3VjaExpc3RlbmVyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3VjaE5vZGUuX3RvdWNoTGlzdGVuZXIuc2V0U3dhbGxvd1RvdWNoZXMoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoQ29udGludWUuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RvdWNoTm9kZS5zZXRDb250ZW50U2l6ZShub2RlLmdldENoaWxkQnlOYW1lKCd0b3VjaEJnJykuKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMjIzOntcclxuICAgICAgICAgICAgICAgICAgICBpZihnbS5jdXJfZ2FtZV9zY2VuZT09R2FtZVNjZW5lLmdhbWUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaENvbnRpbnVlLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpbmdlcj1ub2RlLmdldENoaWxkQnlOYW1lKCdmaW5nZXInKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MudHdlZW4oZmluZ2VyKS5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKGNjLm1vdmVCeSgwLjMsY2MudjIoMCwxMDApKSxjYy5tb3ZlQnkoMC4zLGNjLnYyKDAsLTEwMCkpKSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hOb2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwoKT0+eyAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vblR1dG9yaWFsc0NvbXBsZXRlKCk7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+inpuaRuOepv+mAj1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0b3VjaE5vZGUuX3RvdWNoTGlzdGVuZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoTm9kZS5fdG91Y2hMaXN0ZW5lci5zZXRTd2FsbG93VG91Y2hlcyhmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDMxMTp7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZ20uY3VyX2dhbWVfc2NlbmU9PUdhbWVTY2VuZS5nYW1lKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hDb250aW51ZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaW5nZXI9bm9kZS5nZXRDaGlsZEJ5TmFtZSgnZmluZ2VyJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLnR3ZWVuKGZpbmdlcikucmVwZWF0Rm9yZXZlcihjYy5zZXF1ZW5jZShjYy5tb3ZlQnkoMC4zLGNjLnYyKDAsLTEwMCkpLGNjLm1vdmVCeSgwLjMsY2MudjIoMCwxMDApKSkpLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoTm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsKCk9PnsgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25UdXRvcmlhbHNDb21wbGV0ZSgpOyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSx0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/op6bmkbjnqb/pgI9cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodG91Y2hOb2RlLl90b3VjaExpc3RlbmVyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3VjaE5vZGUuX3RvdWNoTGlzdGVuZXIuc2V0U3dhbGxvd1RvdWNoZXMoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAzMTI6e1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGdtLmN1cl9nYW1lX3NjZW5lPT1HYW1lU2NlbmUuaG9tZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoQ29udGludWUuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaE5vZGUuc2V0UG9zaXRpb24oYm9zc1Bvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3RvdWNoQmcnKS5zZXRQb3NpdGlvbihib3NzUG9zKTsgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpbmdlcj1ub2RlLmdldENoaWxkQnlOYW1lKCdmaW5nZXInKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmluZ2VyLnNldFBvc2l0aW9uKGJvc3NQb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy50d2VlbihmaW5nZXIpLnJlcGVhdEZvcmV2ZXIoY2Muc2VxdWVuY2UoY2MubW92ZUJ5KDAuMyxjYy52MigwLDEwMCkpLGNjLm1vdmVCeSgwLjMsY2MudjIoMCwtMTAwKSkpKS5zdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaE5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9TdGFnZShIZXJvX1R5cGUuUGFvU2hvdSk+PTApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25UdXRvcmlhbHNDb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc190dXRvcmFpbHNfc3RhdGU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVGaW5pc2goKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSx0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/op6bmkbjnqb/pgI9cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodG91Y2hOb2RlLl90b3VjaExpc3RlbmVyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3VjaE5vZGUuX3RvdWNoTGlzdGVuZXIuc2V0U3dhbGxvd1RvdWNoZXMoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRvdWNoQ29udGludWUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLm9uVHV0b3JpYWxzQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gfSx0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDMzMTp7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZ20uY3VyX2dhbWVfc2NlbmU9PUdhbWVTY2VuZS5nYW1lKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/op6bmkbjnqb/pgI9cclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hDb250aW51ZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25UdXRvcmlhbHNDb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMjI1OntcclxuICAgICAgICAgICAgICAgICAgICBpZihnbS5jdXJfZ2FtZV9zY2VuZT09R2FtZVNjZW5lLmdhbWUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaENvbnRpbnVlLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpbmdlcj1ub2RlLmdldENoaWxkQnlOYW1lKCdmaW5nZXInKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MudHdlZW4oZmluZ2VyKS5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKGNjLm1vdmVCeSgwLjMsY2MudjIoMCwxMDApKSxjYy5tb3ZlQnkoMC4zLGNjLnYyKDAsLTEwMCkpKSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hOb2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwoKT0+eyAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vblR1dG9yaWFsc0NvbXBsZXRlKCk7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+inpuaRuOepv+mAj1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0b3VjaE5vZGUuX3RvdWNoTGlzdGVuZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoTm9kZS5fdG91Y2hMaXN0ZW5lci5zZXRTd2FsbG93VG91Y2hlcyhmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDIyNjp7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZ20uY3VyX2dhbWVfc2NlbmU9PUdhbWVTY2VuZS5ob21lKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hOb2RlLnNldFBvc2l0aW9uKGJvc3NQb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLmdldENoaWxkQnlOYW1lKCd0b3VjaEJnJykuc2V0UG9zaXRpb24oYm9zc1Bvcyk7ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaW5nZXI9bm9kZS5nZXRDaGlsZEJ5TmFtZSgnZmluZ2VyJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbmdlci5zZXRQb3NpdGlvbihib3NzUG9zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MudHdlZW4oZmluZ2VyKS5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKGNjLm1vdmVCeSgwLjMsY2MudjIoMCwxMDApKSxjYy5tb3ZlQnkoMC4zLGNjLnYyKDAsLTEwMCkpKSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hOb2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vblR1dG9yaWFsc0NvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sdGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v6Kem5pG456m/6YCPXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRvdWNoTm9kZS5fdG91Y2hMaXN0ZW5lcilcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hOb2RlLl90b3VjaExpc3RlbmVyLnNldFN3YWxsb3dUb3VjaGVzKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaENvbnRpbnVlLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDIyNzp7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZ20uY3VyX2dhbWVfc2NlbmU9PUdhbWVTY2VuZS5ob21lKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hOb2RlLnNldFBvc2l0aW9uKGJvc3NQb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLmdldENoaWxkQnlOYW1lKCd0b3VjaEJnJykuc2V0UG9zaXRpb24oYm9zc1Bvcyk7ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaW5nZXI9bm9kZS5nZXRDaGlsZEJ5TmFtZSgnZmluZ2VyJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbmdlci5zZXRQb3NpdGlvbihib3NzUG9zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MudHdlZW4oZmluZ2VyKS5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKGNjLm1vdmVCeSgwLjMsY2MudjIoMCwxMDApKSxjYy5tb3ZlQnkoMC4zLGNjLnYyKDAsLTEwMCkpKSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hOb2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vblR1dG9yaWFsc0NvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZUZpbmlzaCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+inpuaRuOepv+mAj1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0b3VjaE5vZGUuX3RvdWNoTGlzdGVuZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoTm9kZS5fdG91Y2hMaXN0ZW5lci5zZXRTd2FsbG93VG91Y2hlcyhmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hDb250aW51ZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4iXX0=