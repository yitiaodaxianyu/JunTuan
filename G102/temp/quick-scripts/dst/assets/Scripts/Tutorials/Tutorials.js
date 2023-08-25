
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
var WXManagerEX_1 = require("../../startscene/WXManagerEX");
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
        WXManagerEX_1.default.getInstance().resourcesBundle.load('tutorials/' + idStr, cc.Prefab, function (error, assets) {
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
                            var finger = node.getChildByName('finger');
                            var finger2 = node.getChildByName('finger2');
                            cc.tween(finger).repeatForever(cc.sequence(cc.moveBy(0.2 * rate, cc.v2(30, 0)), cc.moveBy(0.2 * rate, cc.v2(-30, 0)))).start();
                            cc.tween(finger2).repeatForever(cc.sequence(cc.moveBy(0.2 * rate, cc.v2(30, 0)), cc.moveBy(0.2 * rate, cc.v2(-30, 0)))).start();
                            console.log("添加动画");
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
                                _this.onTutorialsComplete();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVHV0b3JpYWxzXFxUdXRvcmlhbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNERBQXVEO0FBQ3ZELDBDQUFrRTtBQUNsRSw4Q0FBeUM7QUFDekMsMERBQWdFO0FBQ2hFLHdEQUF1RDtBQUN2RCxzREFBb0Q7QUFFcEQsNERBQXVEO0FBQ3ZELG9FQUErRDtBQUMvRCxnRUFBMkQ7QUFDM0Qsb0VBQStEO0FBQy9ELDJDQUFpRDtBQUNqRCx1REFBa0Q7QUFHNUMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBdUMsNkJBQVk7SUFBbkQ7UUFBQSxxRUFpd0JDO1FBL3ZCRyxvQkFBYyxHQUFVLElBQUksQ0FBQztRQUM3QixjQUFRLEdBQVEsQ0FBQyxDQUFDO1FBQ2xCLFdBQUssR0FBUSxDQUFDLENBQUM7O0lBNnZCbkIsQ0FBQztJQXp2QkcsUUFBUTtJQUNSLHVDQUFtQixHQUFuQjtRQUVJLHVCQUFhLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDLDZCQUFXLENBQUMsSUFBSSxHQUFDLDBCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3BHLE1BQU07UUFDTiwwQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxVQUFVLEdBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0MsSUFBRyxJQUFJLENBQUMsY0FBYyxFQUN0QjtZQUNJLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUN6QjtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUM3QiwwQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxZQUFZLEdBQUMsSUFBSSxDQUFDO1FBQ2pELDBEQUEwRDtJQUM5RCxDQUFDO0lBRUQsb0NBQWdCLEdBQWhCLFVBQWlCLEVBQVMs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QyxDQUFDOzRCQUM1QixFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQzs0QkFDOUcsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUM7Z0NBQ3JDLEtBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2dDQUMzQiwwQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxVQUFVLEVBQUUsQ0FBQzs0QkFDaEQsQ0FBQyxFQUFDLEtBQUksQ0FBQyxDQUFDOzRCQUNSLE1BQU07NEJBQ04sSUFBRyxTQUFTLENBQUMsY0FBYyxFQUMzQjtnQ0FDSSxTQUFTLENBQUMsY0FBYyxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDOzZCQUNyRDs0QkFDRCxhQUFhLENBQUMsTUFBTSxHQUFDLEtBQUssQ0FBQzt5QkFDOUI7cUJBQ0o7b0JBQUEsTUFBTTthQUNWO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBL3ZCZ0IsU0FBUztRQUQ3QixPQUFPO09BQ2EsU0FBUyxDQWl3QjdCO0lBQUQsZ0JBQUM7Q0Fqd0JELEFBaXdCQyxDQWp3QnNDLEVBQUUsQ0FBQyxTQUFTLEdBaXdCbEQ7a0JBandCb0IsU0FBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBXWE1hbmFnZXJFWCBmcm9tIFwiLi4vLi4vc3RhcnRzY2VuZS9XWE1hbmFnZXJFWFwiO1xyXG5pbXBvcnQgeyBHYW1lTW9kZSwgR2FtZVNjZW5lLCBHb19UeXBlLCBKaWFTdX0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEhlcm9CYXNlSW5mb01hbmFnZXIgfSBmcm9tIFwiLi4vSGVyby9EYXRhL0hlcm9CYXNlSW5mb1wiO1xyXG5pbXBvcnQgeyBIZXJvTWFuYWdlciB9IGZyb20gXCIuLi9IZXJvL0RhdGEvSGVyb01hbmFnZXJcIjtcclxuaW1wb3J0IHsgSGVyb19UeXBlIH0gZnJvbSBcIi4uL0hlcm8vR2FtZS9IZXJvQ29uZmlnXCI7XHJcbmltcG9ydCB7IExldmVsTWFuYWdlciB9IGZyb20gXCIuLi9MZXZlbC9MZXZlbE1hbmFnZXJcIjtcclxuaW1wb3J0IE1vbnN0ZXJNYW5hZ2VyIGZyb20gXCIuLi9Nb25zdGVyL01vbnN0ZXJNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEZvbGxvd19UeXBlIH0gZnJvbSBcIi4uL211bHRpTGFuZ3VhZ2UvRm9sbG93Q29uc3RhbnRzXCI7XHJcbmltcG9ydCBGb2xsb3dNYW5hZ2VyIGZyb20gXCIuLi9tdWx0aUxhbmd1YWdlL0ZvbGxvd01hbmFnZXJcIjtcclxuaW1wb3J0IExhbmd1YWdlTWFuYWdlciBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9MYW5ndWFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgQ291cnNlVGV4dE1hbmFnZXIgfSBmcm9tIFwiLi9Db3Vyc2VUZXh0XCI7XHJcbmltcG9ydCBUdXRvcmFpbHNNYW5hZ2VyIGZyb20gXCIuL1R1dG9yYWlsc01hbmFnZXJcIjtcclxuXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFR1dG9yaWFscyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgY2xvc2VfY2FsbGJhY2s6RnVuY3Rpb249bnVsbDtcclxuICAgIHJ1b190aW1lOm51bWJlcj01O1xyXG4gICAgdF9udW06bnVtYmVyPTA7XHJcblxyXG5cclxuICAgIFxyXG4gICAgLy/lvZPmrKHmlZnnqIvlrozmr5VcclxuICAgIG9uVHV0b3JpYWxzQ29tcGxldGUoKVxyXG4gICAge1xyXG4gICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7mlrDmiYvlvJXlr7wrVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dpbmdfaWQpO1xyXG4gICAgICAgIC8v5Yig6Zmk6IqC54K5XHJcbiAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dpbmdfaWQ9LTE7XHJcbiAgICAgICAgaWYodGhpcy5jbG9zZV9jYWxsYmFjaylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2VfY2FsbGJhY2soKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5ub2RlLnJlbW92ZUZyb21QYXJlbnQoKTtcclxuICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX3R1dG9yaWFsPW51bGw7XHJcbiAgICAgICAgLy9UdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNfdHV0b3JhaWxzX3N0YXRlPWZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dSdW9UdXRvcmlhbHMoaWQ6bnVtYmVyLGNsb3NlQ2FsbGJhY2s6RnVuY3Rpb24saXNMZWZ0OmJvb2xlYW49dHJ1ZSxib3NzUG9zPzpjYy5WZWMyKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBnbT1HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIHRoaXMuY2xvc2VfY2FsbGJhY2s9Y2xvc2VDYWxsYmFjaztcclxuICAgICAgICB0aGlzLm5vZGUucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNfdHV0b3JhaWxzX3N0YXRlPXRydWU7XHJcbiAgICAgICAgLy8gZm9yKGxldCBpPTA7IGk8bGVuOyBpKyspXHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgIC8vICAgICBsZXQganNvbj1UdXRvcmlhbHNfSnNvbltpXTtcclxuICAgICAgICAvLyAgICAgaWYoaWQ9PWpzb24ueHNfaWQpXHJcbiAgICAgICAgLy8gICAgIHsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgLy8gICAgICAgICAvL+agh+mimFxyXG4gICAgICAgIC8vICAgICAgICAgdGl0bGU9TGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoanNvbi50aXRsZV90ZXh0X2lkKTtcclxuICAgICAgICAvLyAgICAgICAgIC8v5YaF5a65XHJcbiAgICAgICAgLy8gICAgICAgICBkZXMxPUxhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKGpzb24uZ3VpZGFuY2VfdGV4dF9pZCk7XHJcbiAgICAgICAgLy8gICAgICAgICBicmVhaztcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvL+WxleekuuWHuuadpVxyXG4gICAgICAgIGxldCBpZFN0cj0ndCcraWQ7XHJcbiAgICAgICAgV1hNYW5hZ2VyRVguZ2V0SW5zdGFuY2UoKS5yZXNvdXJjZXNCdW5kbGUubG9hZCgndHV0b3JpYWxzLycraWRTdHIsY2MuUHJlZmFiLChlcnJvcjogRXJyb3IsIGFzc2V0czpjYy5QcmVmYWIpPT57XHJcbiAgICAgICAgICAgIGlmKGVycm9yKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUoYXNzZXRzKTtcclxuICAgICAgICAgICAgbm9kZS5wYXJlbnQ9dGhpcy5ub2RlO1xyXG4gICAgICAgICAgICAvL+agueaNrmlk5p+l5om+XHJcbiAgICAgICAgICAgIGxldCBqc29uRGF0YT1Db3Vyc2VUZXh0TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25Db3Vyc2VUZXh0KGlkKTsgICAgICAgICAgICBcclxuICAgICAgICAgICAgLy/oi7Hpm4RpZFxyXG4gICAgICAgICAgICBsZXQgaGVyb0lkPWpzb25EYXRhLmhlcm9fdGV4dF9pZDsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8v5rua5Yqo6KeG5Zu+XHJcbiAgICAgICAgICAgIGxldCB0ZXh0U2Nyb2xsVmlldz1ub2RlLmdldENoaWxkQnlOYW1lKCd0ZXh0U2Nyb2xsVmlldycpLmdldENvbXBvbmVudChjYy5TY3JvbGxWaWV3KTtcclxuICAgICAgICAgICAgLy/lm77moIdcclxuICAgICAgICAgICAgbGV0IGljb249dGV4dFNjcm9sbFZpZXcubm9kZS5nZXRDaGlsZEJ5TmFtZSgnaWNvbicpLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG4gICAgICAgICAgICBpZihoZXJvSWQhPUhlcm9fVHlwZS5OVUxMKXtcclxuICAgICAgICAgICAgICAgIGljb24ubm9kZS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAgICAgICAgIGljb24uc3ByaXRlRnJhbWU9SGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvQm9keShoZXJvSWQpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGljb24ubm9kZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy/lhoXlrrlcclxuICAgICAgICAgICAgbGV0IGRlcz1MYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZChqc29uRGF0YS5ndWlkYW5jZV90ZXh0X2lkKTsgICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IGRlc0xhYmVsPXRleHRTY3JvbGxWaWV3LmNvbnRlbnQuZ2V0Q2hpbGRCeU5hbWUoJ2Rlc0xhYmVsJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTsgICAgICAgICAgICBcclxuICAgICAgICAgICAgZGVzTGFiZWwuc3RyaW5nPWRlcztcclxuICAgICAgICAgICAgdGV4dFNjcm9sbFZpZXcuc2Nyb2xsVG9Cb3R0b20oMC41KTtcclxuICAgICAgICAgICAgLy/lkI3lrZdcclxuICAgICAgICAgICAgbGV0IG5hbWU9TGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoSGVyb0Jhc2VJbmZvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE5hbWVUZXh0X0lEKGhlcm9JZCkpO1xyXG4gICAgICAgICAgICBsZXQgbmFtZUxhYmVsPXRleHRTY3JvbGxWaWV3Lm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ25hbWVMYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgICAgIG5hbWVMYWJlbC5zdHJpbmc9bmFtZTtcclxuICAgICAgICAgICAgLy/op6bmkbjnm5HlkKzkuIDkuItcclxuICAgICAgICAgICAgbGV0IHRvdWNoQ29udGludWU9dGV4dFNjcm9sbFZpZXcubm9kZS5nZXRDaGlsZEJ5TmFtZSgndG91Y2hDb250aW51ZScpO1xyXG4gICAgICAgICAgICBsZXQgdGV4dExhbmd1YWdlPXRvdWNoQ29udGludWUuZ2V0Q2hpbGRCeU5hbWUoJ1RleHRMYW5ndWFnZScpO1xyXG4gICAgICAgICAgICBsZXQgY2xpY2tJY29uPXRvdWNoQ29udGludWUuZ2V0Q2hpbGRCeU5hbWUoJ2NsaWNrSWNvbicpO1xyXG4gICAgICAgICAgICAvL+e/u+i9rOiuvue9rlxyXG4gICAgICAgICAgICBpZihpc0xlZnQpe1xyXG4gICAgICAgICAgICAgICAgdGV4dFNjcm9sbFZpZXcubm9kZS54PS1jYy53aW5TaXplLndpZHRoLzI7XHJcbiAgICAgICAgICAgICAgICB0ZXh0U2Nyb2xsVmlldy5ub2RlLnNjYWxlWD0xO1xyXG4gICAgICAgICAgICAgICAgZGVzTGFiZWwubm9kZS5zY2FsZVg9MTtcclxuICAgICAgICAgICAgICAgIG5hbWVMYWJlbC5ub2RlLnNjYWxlWD0xO1xyXG4gICAgICAgICAgICAgICAgdGV4dExhbmd1YWdlLnNjYWxlWD0xO1xyXG4gICAgICAgICAgICAgICAgY2xpY2tJY29uLnNjYWxlWD0xO1xyXG4gICAgICAgICAgICAgICAgY2xpY2tJY29uLnpJbmRleD0xO1xyXG4gICAgICAgICAgICAgICAgdGV4dExhbmd1YWdlLnpJbmRleD0yO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRleHRTY3JvbGxWaWV3Lm5vZGUueD1jYy53aW5TaXplLndpZHRoLzI7XHJcbiAgICAgICAgICAgICAgICB0ZXh0U2Nyb2xsVmlldy5ub2RlLnNjYWxlWD0tMTtcclxuICAgICAgICAgICAgICAgIGRlc0xhYmVsLm5vZGUuc2NhbGVYPS0xO1xyXG4gICAgICAgICAgICAgICAgbmFtZUxhYmVsLm5vZGUuc2NhbGVYPS0xO1xyXG4gICAgICAgICAgICAgICAgdGV4dExhbmd1YWdlLnNjYWxlWD0tMTtcclxuICAgICAgICAgICAgICAgIGNsaWNrSWNvbi5zY2FsZVg9LTE7XHJcbiAgICAgICAgICAgICAgICBjbGlja0ljb24uekluZGV4PTI7XHJcbiAgICAgICAgICAgICAgICB0ZXh0TGFuZ3VhZ2UuekluZGV4PTE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHJhdGU9R2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRHYW1lUmF0ZSgpO1xyXG4gICAgICAgICAgICBjYy50d2VlbihjbGlja0ljb24pLnJlcGVhdEZvcmV2ZXIoY2Muc2VxdWVuY2UoY2MubW92ZUJ5KDAuMipyYXRlLGNjLnYyKDAsMTApKSxjYy5tb3ZlQnkoMC4yKnJhdGUsY2MudjIoMCwtMTApKSkpLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICBsZXQgdG91Y2hOb2RlPW5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3RvdWNoTm9kZScpO1xyXG4gICAgICAgICAgICAvL2JnXHJcbiAgICAgICAgICAgIGxldCBiZz1ub2RlLmdldENoaWxkQnlOYW1lKCdiZycpO1xyXG4gICAgICAgICAgICBpZihiZyl7XHJcbiAgICAgICAgICAgICAgICAvL+inpuaRuOepv+mAj1xyXG4gICAgICAgICAgICAgICAgaWYoYmcuX3RvdWNoTGlzdGVuZXIpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmcub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25UdXRvcmlhbHNDb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihpZD09MjUyKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWxsX2hlcm8uZ2V0KEhlcm9fVHlwZS5Hb25nSmlhblNob3UpLnNob3dIZXJvKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZW5lbXlzPU1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TW9uc3RlcnNGb3JOZWFyZXN0KDEsdGhpcy5ub2RlLmdldFBvc2l0aW9uKCksMTAwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihlbmVteXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/mnIDliY3nmoTmlYzkurpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZW5lbXlQb3M9ZW5lbXlzWzBdLmdldFBvc2l0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hbGxfaGVyby5nZXQoSGVyb19UeXBlLkdvbmdKaWFuU2hvdSkucmVsZWFzZVNraWxsKGVuZW15UG9zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sdGhpcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3dpdGNoKGlkKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDIwMTp7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZ20uY3VyX2dhbWVfc2NlbmU9PUdhbWVTY2VuZS5ob21lKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/lvLrliLbmmL7npLrkuLvpobVcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nYW1lX3RvX2hvbWU9R29fVHlwZS5NYWluO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmp1bW9BbmRTaG93VWkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hOb2RlLnNldFBvc2l0aW9uKGJvc3NQb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLmdldENoaWxkQnlOYW1lKCd0b3VjaEJnJykuc2V0UG9zaXRpb24oYm9zc1Bvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoQ29udGludWUuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmluZ2VyPW5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2ZpbmdlcicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaW5nZXIuc2V0UG9zaXRpb24oYm9zc1Bvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLnR3ZWVuKGZpbmdlcikucmVwZWF0Rm9yZXZlcihjYy5zZXF1ZW5jZShjYy5tb3ZlQnkoMC4zLGNjLnYyKDAsMTAwKSksY2MubW92ZUJ5KDAuMyxjYy52MigwLC0xMDApKSkpLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoTm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwoKT0+eyAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5nZXRDaGlsZEJ5TmFtZSgndG91Y2hCZycpLnNjYWxlPTAuOTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSx0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hOb2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwoKT0+eyAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vblR1dG9yaWFsc0NvbXBsZXRlKCk7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+inpuaRuOepv+mAj1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0b3VjaE5vZGUuX3RvdWNoTGlzdGVuZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoTm9kZS5fdG91Y2hMaXN0ZW5lci5zZXRTd2FsbG93VG91Y2hlcyhmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDIwMjp7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZ20uY3VyX2dhbWVfc2NlbmU9PUdhbWVTY2VuZS5nYW1lKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hDb250aW51ZS5hY3RpdmU9ZmFsc2U7ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBoZXJvTm9kZT1HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFsbF9oZXJvLmdldChIZXJvX1R5cGUuQU51QmlTaSkubm9kZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcG9zWT1oZXJvTm9kZS55O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcG9zWD1oZXJvTm9kZS54O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaE5vZGUueD1wb3NYO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFsbF9oZXJvLmdldChIZXJvX1R5cGUuQU51QmlTaSkuc2V0Q0QoMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaW5nZXI9bm9kZS5nZXRDaGlsZEJ5TmFtZSgnZmluZ2VyJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbmdlci54PXBvc1g7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbmdlci55PXBvc1krNzA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoTm9kZS55PXBvc1k7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBiZzE9bm9kZS5nZXRDaGlsZEJ5TmFtZSgnYmcxJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBiZzI9bm9kZS5nZXRDaGlsZEJ5TmFtZSgnYmcyJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJnMS55PXBvc1krdG91Y2hOb2RlLmhlaWdodCooMS10b3VjaE5vZGUuYW5jaG9yWSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJnMi55PXBvc1ktdG91Y2hOb2RlLmhlaWdodCp0b3VjaE5vZGUuYW5jaG9yWTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGJnMz1ub2RlLmdldENoaWxkQnlOYW1lKCdiZzMnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGJnND1ub2RlLmdldENoaWxkQnlOYW1lKCdiZzQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmczLng9cG9zWC10b3VjaE5vZGUud2lkdGgvMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmczLnk9cG9zWTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmc0Lnk9cG9zWTsgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmc0Lng9cG9zWCt0b3VjaE5vZGUud2lkdGgvMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHQxMT1ub2RlLmdldENoaWxkQnlOYW1lKCd0MTEnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdDExLnNldENvbnRlbnRTaXplKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWxsX2hlcm8uZ2V0KEhlcm9fVHlwZS5BTnVCaVNpKS5nZXRTa2lsbFRpcFNpemUoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHQxMS5vcGFjaXR5PTA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLnR3ZWVuKGZpbmdlcikucmVwZWF0Rm9yZXZlcihjYy5zZXF1ZW5jZShjYy5tb3ZlQnkoMSpyYXRlLGNjLnYyKDAsNjQwKSksY2MuY2FsbEZ1bmMoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbmdlci54PXBvc1g7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaW5nZXIueT1wb3NZKzcwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSxjYy5kZWxheVRpbWUoMC4yKnJhdGUpKSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hOb2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULChlKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dFNjcm9sbFZpZXcubm9kZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZzEuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmcyLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJnMy5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZzQuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdDExLm9wYWNpdHk9MjU1O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBvcz10aGlzLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIoZS5nZXRMb2NhdGlvbigpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHQxMS5zZXRQb3NpdGlvbihwb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaE5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfTU9WRSwoZTpjYy5FdmVudC5FdmVudFRvdWNoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBvcz10aGlzLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIoZS5nZXRMb2NhdGlvbigpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHQxMS5zZXRQb3NpdGlvbihwb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaE5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfQ0FOQ0VMLChlOmNjLkV2ZW50LkV2ZW50VG91Y2gpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcG9zPXRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihlLmdldExvY2F0aW9uKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYocG9zLnk+R2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5lbmVteV9hdHRfeSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vblR1dG9yaWFsc0NvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hbGxfaGVyby5nZXQoSGVyb19UeXBlLkFOdUJpU2kpLnJlbGVhc2VTa2lsbChwb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dFNjcm9sbFZpZXcubm9kZS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZzEuYWN0aXZlPXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmcyLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJnMy5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZzQuYWN0aXZlPXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdDExLm9wYWNpdHk9MDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaW5nZXIueD1wb3NYO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbmdlci55PXBvc1krNzA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmluZ2VyLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MudHdlZW4oZmluZ2VyKS5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKGNjLm1vdmVCeSgxKnJhdGUsY2MudjIoMCw2NDApKSxjYy5jYWxsRnVuYygoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaW5nZXIueD1wb3NYO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaW5nZXIueT1wb3NZKzcwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLGNjLmRlbGF5VGltZSgwLjIqcmF0ZSkpKS5zdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaE5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0U2Nyb2xsVmlldy5ub2RlLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmcxLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmcyLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmczLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmc0LmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdDExLm9wYWNpdHk9MDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbmdlci54PXBvc1g7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaW5nZXIueT1wb3NZKzcwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmluZ2VyLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy50d2VlbihmaW5nZXIpLnJlcGVhdEZvcmV2ZXIoY2Muc2VxdWVuY2UoY2MubW92ZUJ5KDEqcmF0ZSxjYy52MigwLDY0MCkpLGNjLmNhbGxGdW5jKCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmluZ2VyLng9cG9zWDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaW5nZXIueT1wb3NZKzcwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksY2MuZGVsYXlUaW1lKDAuMipyYXRlKSkpLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sdGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v6Kem5pG456m/6YCPXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmKHRvdWNoTm9kZS5fdG91Y2hMaXN0ZW5lcilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgdG91Y2hOb2RlLl90b3VjaExpc3RlbmVyLnNldFN3YWxsb3dUb3VjaGVzKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMjAzOntcclxuICAgICAgICAgICAgICAgICAgICBpZihnbS5jdXJfZ2FtZV9zY2VuZT09R2FtZVNjZW5lLmdhbWUpXHJcbiAgICAgICAgICAgICAgICAgICAgeyAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+WFveeOi+aJk+aWreaKgOiDve+8jOeCueWHu+ebtOaOpemHiuaUvuWIsGJvc3PkvY3nva4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGhlcm9Ob2RlPUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWxsX2hlcm8uZ2V0KEhlcm9fVHlwZS5TaG91V2FuZykubm9kZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBvc1k9aGVyb05vZGUueTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBvc1g9aGVyb05vZGUueDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hOb2RlLng9cG9zWDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hbGxfaGVyby5nZXQoSGVyb19UeXBlLlNob3VXYW5nKS5zZXRDRCgwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hDb250aW51ZS5hY3RpdmU9ZmFsc2U7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaW5nZXI9bm9kZS5nZXRDaGlsZEJ5TmFtZSgnZmluZ2VyJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbmdlci54PXBvc1g7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbmdlci55PXBvc1krNzA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoTm9kZS55PXBvc1k7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2JnMScpLnk9cG9zWSt0b3VjaE5vZGUuaGVpZ2h0KigxLXRvdWNoTm9kZS5hbmNob3JZKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5nZXRDaGlsZEJ5TmFtZSgnYmcyJykueT1wb3NZLXRvdWNoTm9kZS5oZWlnaHQqdG91Y2hOb2RlLmFuY2hvclk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBiZzM9bm9kZS5nZXRDaGlsZEJ5TmFtZSgnYmczJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBiZzQ9bm9kZS5nZXRDaGlsZEJ5TmFtZSgnYmc0Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJnMy54PXBvc1gtdG91Y2hOb2RlLndpZHRoLzI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJnMy55PXBvc1k7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJnNC55PXBvc1k7ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJnNC54PXBvc1grdG91Y2hOb2RlLndpZHRoLzI7ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLnR3ZWVuKGZpbmdlcikucmVwZWF0Rm9yZXZlcihjYy5zZXF1ZW5jZShjYy5tb3ZlQnkoMC4zKnJhdGUsY2MudjIoMCwxMDApKSxjYy5tb3ZlQnkoMC4zKnJhdGUsY2MudjIoMCwtMTAwKSkpKS5zdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaE5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25UdXRvcmlhbHNDb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hbGxfaGVyby5nZXQoSGVyb19UeXBlLlNob3VXYW5nKS5yZWxlYXNlU2tpbGwoYm9zc1Bvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sdGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v6Kem5pG456m/6YCPXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmKHRvdWNoTm9kZS5fdG91Y2hMaXN0ZW5lcilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgdG91Y2hOb2RlLl90b3VjaExpc3RlbmVyLnNldFN3YWxsb3dUb3VjaGVzKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1icmVhazsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBjYXNlIDIwNDp7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZ20uY3VyX2dhbWVfc2NlbmU9PUdhbWVTY2VuZS5nYW1lKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hDb250aW51ZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaW5nZXI9bm9kZS5nZXRDaGlsZEJ5TmFtZSgnZmluZ2VyJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbmdlci5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNjLnR3ZWVuKGZpbmdlcikucmVwZWF0Rm9yZXZlcihjYy5zZXF1ZW5jZShjYy5tb3ZlQnkoMC4zLGNjLnYyKDAsMTAwKSksY2MubW92ZUJ5KDAuMyxjYy52MigwLC0xMDApKSkpLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoTm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsKCk9PnsgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25UdXRvcmlhbHNDb21wbGV0ZSgpOyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSx0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/op6bmkbjnqb/pgI9cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodG91Y2hOb2RlLl90b3VjaExpc3RlbmVyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3VjaE5vZGUuX3RvdWNoTGlzdGVuZXIuc2V0U3dhbGxvd1RvdWNoZXMoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAyMTE6e1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGdtLmN1cl9nYW1lX3NjZW5lPT1HYW1lU2NlbmUuZ2FtZSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v6Kem5pG456m/6YCPXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoQ29udGludWUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uVHV0b3JpYWxzQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSx0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDIxMjp7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZ20uY3VyX2dhbWVfc2NlbmU9PUdhbWVTY2VuZS5nYW1lKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/op6bmkbjnqb/pgI9cclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hDb250aW51ZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25UdXRvcmlhbHNDb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMjEzOntcclxuICAgICAgICAgICAgICAgICAgICBpZihnbS5jdXJfZ2FtZV9zY2VuZT09R2FtZVNjZW5lLmdhbWUpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+inpuaRuOepv+mAj1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmluZ2VyPW5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2ZpbmdlcicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmluZ2VyMj1ub2RlLmdldENoaWxkQnlOYW1lKCdmaW5nZXIyJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MudHdlZW4oZmluZ2VyKS5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKGNjLm1vdmVCeSgwLjIqcmF0ZSxjYy52MigzMCwwKSksY2MubW92ZUJ5KDAuMipyYXRlLGNjLnYyKC0zMCwwKSkpKS5zdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy50d2VlbihmaW5nZXIyKS5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKGNjLm1vdmVCeSgwLjIqcmF0ZSxjYy52MigzMCwwKSksY2MubW92ZUJ5KDAuMipyYXRlLGNjLnYyKC0zMCwwKSkpKS5zdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLmt7vliqDliqjnlLtcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaENvbnRpbnVlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vblR1dG9yaWFsc0NvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sdGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAyMTQ6e1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGdtLmN1cl9nYW1lX3NjZW5lPT1HYW1lU2NlbmUuZ2FtZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoQ29udGludWUuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmluZ2VyPW5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2ZpbmdlcicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaW5nZXIuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NjLnR3ZWVuKGZpbmdlcikucmVwZWF0Rm9yZXZlcihjYy5zZXF1ZW5jZShjYy5tb3ZlQnkoMC4zLGNjLnYyKDAsMTAwKSksY2MubW92ZUJ5KDAuMyxjYy52MigwLC0xMDApKSkpLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoTm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsKCk9PnsgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25UdXRvcmlhbHNDb21wbGV0ZSgpOyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSx0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/op6bmkbjnqb/pgI9cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodG91Y2hOb2RlLl90b3VjaExpc3RlbmVyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3VjaE5vZGUuX3RvdWNoTGlzdGVuZXIuc2V0U3dhbGxvd1RvdWNoZXMoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAyMjE6e1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGdtLmN1cl9nYW1lX3NjZW5lPT1HYW1lU2NlbmUuZ2FtZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdG91Y2hDb250aW51ZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbGV0IGZpbmdlcj1ub2RlLmdldENoaWxkQnlOYW1lKCdmaW5nZXInKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9jYy50d2VlbihmaW5nZXIpLnJlcGVhdEZvcmV2ZXIoY2Muc2VxdWVuY2UoY2MubW92ZUJ5KDAuMyxjYy52MigwLDEwMCkpLGNjLm1vdmVCeSgwLjMsY2MudjIoMCwtMTAwKSkpKS5zdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaE5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCgpPT57ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uVHV0b3JpYWxzQ29tcGxldGUoKTsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sdGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoQ29udGludWUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uVHV0b3JpYWxzQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSx0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/op6bmkbjnqb/pgI9cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodG91Y2hOb2RlLl90b3VjaExpc3RlbmVyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3VjaE5vZGUuX3RvdWNoTGlzdGVuZXIuc2V0U3dhbGxvd1RvdWNoZXMoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWJyZWFrOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGNhc2UgMjExOntcclxuICAgICAgICAgICAgICAgICAgICBpZihnbS5jdXJfZ2FtZV9zY2VuZT09R2FtZVNjZW5lLmhvbWUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+W8uuWItuaYvuekuuS4u+mhtVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdhbWVfdG9faG9tZT1Hb19UeXBlLk1haW47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuanVtb0FuZFNob3dVaSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaE5vZGUuc2V0UG9zaXRpb24oYm9zc1Bvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3RvdWNoQmcnKS5zZXRQb3NpdGlvbihib3NzUG9zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hDb250aW51ZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaW5nZXI9bm9kZS5nZXRDaGlsZEJ5TmFtZSgnZmluZ2VyJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbmdlci5zZXRQb3NpdGlvbihib3NzUG9zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MudHdlZW4oZmluZ2VyKS5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKGNjLm1vdmVCeSgwLjMsY2MudjIoMCwxMDApKSxjYy5tb3ZlQnkoMC4zLGNjLnYyKDAsLTEwMCkpKSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hOb2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vblR1dG9yaWFsc0NvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sdGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v6Kem5pG456m/6YCPXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRvdWNoTm9kZS5fdG91Y2hMaXN0ZW5lcilcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hOb2RlLl90b3VjaExpc3RlbmVyLnNldFN3YWxsb3dUb3VjaGVzKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMjIyOntcclxuICAgICAgICAgICAgICAgICAgICBpZihnbS5jdXJfZ2FtZV9zY2VuZT09R2FtZVNjZW5lLmhvbWUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdhbWVfdG9faG9tZT1Hb19UeXBlLkNpdHk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuanVtb0FuZFNob3dVaSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaE5vZGUuc2V0UG9zaXRpb24oYm9zc1Bvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3RvdWNoQmcnKS5zZXRQb3NpdGlvbihib3NzUG9zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hDb250aW51ZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaW5nZXI9bm9kZS5nZXRDaGlsZEJ5TmFtZSgnZmluZ2VyJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbmdlci5zZXRQb3NpdGlvbihib3NzUG9zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MudHdlZW4oZmluZ2VyKS5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKGNjLm1vdmVCeSgwLjMsY2MudjIoMCwxMDApKSxjYy5tb3ZlQnkoMC4zLGNjLnYyKDAsLTEwMCkpKSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hOb2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vblR1dG9yaWFsc0NvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sdGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v6Kem5pG456m/6YCPXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmKHRvdWNoTm9kZS5fdG91Y2hMaXN0ZW5lcilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgdG91Y2hOb2RlLl90b3VjaExpc3RlbmVyLnNldFN3YWxsb3dUb3VjaGVzKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMjMxOntcclxuICAgICAgICAgICAgICAgICAgICBpZihnbS5jdXJfZ2FtZV9zY2VuZT09R2FtZVNjZW5lLmdhbWUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaENvbnRpbnVlLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpbmdlcj1ub2RlLmdldENoaWxkQnlOYW1lKCdmaW5nZXInKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmluZ2VyLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9jYy50d2VlbihmaW5nZXIpLnJlcGVhdEZvcmV2ZXIoY2Muc2VxdWVuY2UoY2MubW92ZUJ5KDAuMyxjYy52MigwLDEwMCkpLGNjLm1vdmVCeSgwLjMsY2MudjIoMCwtMTAwKSkpKS5zdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaE5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCgpPT57ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uVHV0b3JpYWxzQ29tcGxldGUoKTsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sdGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v6Kem5pG456m/6YCPXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRvdWNoTm9kZS5fdG91Y2hMaXN0ZW5lcilcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hOb2RlLl90b3VjaExpc3RlbmVyLnNldFN3YWxsb3dUb3VjaGVzKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1icmVhazsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBjYXNlIDI0MTp7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZ20uY3VyX2dhbWVfc2NlbmU9PUdhbWVTY2VuZS5nYW1lKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hDb250aW51ZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwb3NYPTEqMTQ0LTI4ODtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hOb2RlLng9cG9zWDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBvc1k9R2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hbGxfaGVyby5nZXQoSGVyb19UeXBlLkRlTHVZaSkubm9kZS55O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFsbF9oZXJvLmdldChIZXJvX1R5cGUuRGVMdVlpKS5zZXRDRCgwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpbmdlcj1ub2RlLmdldENoaWxkQnlOYW1lKCdmaW5nZXInKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmluZ2VyLng9cG9zWDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmluZ2VyLnk9cG9zWSs3MDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hOb2RlLnk9cG9zWTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGJnMT1ub2RlLmdldENoaWxkQnlOYW1lKCdiZzEnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGJnMj1ub2RlLmdldENoaWxkQnlOYW1lKCdiZzInKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmcxLnk9cG9zWSt0b3VjaE5vZGUuaGVpZ2h0KigxLXRvdWNoTm9kZS5hbmNob3JZKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmcyLnk9cG9zWS10b3VjaE5vZGUuaGVpZ2h0KnRvdWNoTm9kZS5hbmNob3JZO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYmczPW5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2JnMycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYmc0PW5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2JnNCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiZzMueD1wb3NYLXRvdWNoTm9kZS53aWR0aC8yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiZzMueT1wb3NZO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiZzQueT1wb3NZOyAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBiZzQueD1wb3NYK3RvdWNoTm9kZS53aWR0aC8yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdDEyPW5vZGUuZ2V0Q2hpbGRCeU5hbWUoJzEyJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHQxMi5vcGFjaXR5PTA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLnR3ZWVuKGZpbmdlcikucmVwZWF0Rm9yZXZlcihjYy5zZXF1ZW5jZShjYy5tb3ZlQnkoMSpyYXRlLGNjLnYyKDAsODAwKSksY2MuY2FsbEZ1bmMoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbmdlci54PXBvc1g7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaW5nZXIueT1wb3NZKzcwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSxjYy5kZWxheVRpbWUoMC4yKnJhdGUpKSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hOb2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULChlOmNjLkV2ZW50LkV2ZW50VG91Y2gpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0U2Nyb2xsVmlldy5ub2RlLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJnMS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZzIuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmczLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJnNC5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0MTIub3BhY2l0eT0yNTU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcG9zPXRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihlLmdldExvY2F0aW9uKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdDEyLnNldFBvc2l0aW9uKHBvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sdGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoTm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9NT1ZFLChlOmNjLkV2ZW50LkV2ZW50VG91Y2gpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcG9zPXRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihlLmdldExvY2F0aW9uKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdDEyLnNldFBvc2l0aW9uKHBvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoTm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9DQU5DRUwsKGU6Y2MuRXZlbnQuRXZlbnRUb3VjaCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwb3M9dGhpcy5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKGUuZ2V0TG9jYXRpb24oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0MTIuZ2V0Qm91bmRpbmdCb3goKS5jb250YWlucyhib3NzUG9zKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vblR1dG9yaWFsc0NvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hbGxfaGVyby5nZXQoSGVyb19UeXBlLkRlTHVZaSkucmVsZWFzZVNraWxsKHBvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0U2Nyb2xsVmlldy5ub2RlLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJnMS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZzIuYWN0aXZlPXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmczLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJnNC5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaW5nZXIueD1wb3NYO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbmdlci55PXBvc1krNzA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmluZ2VyLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MudHdlZW4oZmluZ2VyKS5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKGNjLm1vdmVCeSgxKnJhdGUsY2MudjIoMCw4MDApKSxjYy5jYWxsRnVuYygoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaW5nZXIueD1wb3NYO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaW5nZXIueT1wb3NZKzcwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLGNjLmRlbGF5VGltZSgwLjIqcmF0ZSkpKS5zdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHQxMi5vcGFjaXR5PTA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdDEyLnNldFBvc2l0aW9uKHBvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sdGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoTm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsKGU6Y2MuRXZlbnQuRXZlbnRUb3VjaCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwb3M9dGhpcy5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKGUuZ2V0TG9jYXRpb24oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0U2Nyb2xsVmlldy5ub2RlLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmcxLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmcyLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmczLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmc0LmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmluZ2VyLng9cG9zWDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbmdlci55PXBvc1krNzA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaW5nZXIuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLnR3ZWVuKGZpbmdlcikucmVwZWF0Rm9yZXZlcihjYy5zZXF1ZW5jZShjYy5tb3ZlQnkoMSpyYXRlLGNjLnYyKDAsODAwKSksY2MuY2FsbEZ1bmMoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaW5nZXIueD1wb3NYO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbmdlci55PXBvc1krNzA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxjYy5kZWxheVRpbWUoMC4yKnJhdGUpKSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHQxMi5vcGFjaXR5PTA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0MTIuc2V0UG9zaXRpb24ocG9zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSx0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gLy/op6bmkbjnqb/pgI9cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYodG91Y2hOb2RlLl90b3VjaExpc3RlbmVyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICB0b3VjaE5vZGUuX3RvdWNoTGlzdGVuZXIuc2V0U3dhbGxvd1RvdWNoZXMoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAyNTE6e1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGdtLmN1cl9nYW1lX3NjZW5lPT1HYW1lU2NlbmUuZ2FtZSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v6Kem5pG456m/6YCPXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoQ29udGludWUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uVHV0b3JpYWxzQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSx0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDI1Mjp7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZ20uY3VyX2dhbWVfc2NlbmU9PUdhbWVTY2VuZS5nYW1lKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/op6bmkbjnqb/pgI9cclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hDb250aW51ZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25UdXRvcmlhbHNDb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hbGxfaGVyby5nZXQoSGVyb19UeXBlLkdvbmdKaWFuU2hvdSkuc2hvd0hlcm8oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBlbmVteXM9TW9uc3Rlck1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNb25zdGVyc0Zvck5lYXJlc3QoMSx0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKSwxMDAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGVuZW15cylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+acgOWJjeeahOaVjOS6ulxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBlbmVteVBvcz1lbmVteXNbMF0uZ2V0UG9zaXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFsbF9oZXJvLmdldChIZXJvX1R5cGUuR29uZ0ppYW5TaG91KS5yZWxlYXNlU2tpbGwoZW5lbXlQb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sdGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAyNTM6e1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGdtLmN1cl9nYW1lX3NjZW5lPT1HYW1lU2NlbmUuZ2FtZSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v6Kem5pG456m/6YCPXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoQ29udGludWUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uVHV0b3JpYWxzQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSx0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDI2MTp7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZ20uY3VyX2dhbWVfc2NlbmU9PUdhbWVTY2VuZS5nYW1lKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdG91Y2hDb250aW51ZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxldCBmaW5nZXI9bm9kZS5nZXRDaGlsZEJ5TmFtZSgnZmluZ2VyJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNjLnR3ZWVuKGZpbmdlcikucmVwZWF0Rm9yZXZlcihjYy5zZXF1ZW5jZShjYy5tb3ZlQnkoMC4zLGNjLnYyKDAsMTAwKSksY2MubW92ZUJ5KDAuMyxjYy52MigwLC0xMDApKSkpLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoQ29udGludWUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uVHV0b3JpYWxzQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSx0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdG91Y2hOb2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwoKT0+eyAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5vblR1dG9yaWFsc0NvbXBsZXRlKCk7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB9LHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+inpuaRuOepv+mAj1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0b3VjaE5vZGUuX3RvdWNoTGlzdGVuZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoTm9kZS5fdG91Y2hMaXN0ZW5lci5zZXRTd2FsbG93VG91Y2hlcyhmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDIxOTp7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZ20uY3VyX2dhbWVfc2NlbmU9PUdhbWVTY2VuZS5ob21lKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/lvLrliLbmmL7npLrkuLvpobVcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nYW1lX3RvX2hvbWU9R29fVHlwZS5NYWluO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmp1bW9BbmRTaG93VWkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hOb2RlLnNldFBvc2l0aW9uKGJvc3NQb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLmdldENoaWxkQnlOYW1lKCd0b3VjaEJnJykuc2V0UG9zaXRpb24oYm9zc1Bvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoQ29udGludWUuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmluZ2VyPW5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2ZpbmdlcicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaW5nZXIuc2V0UG9zaXRpb24oYm9zc1Bvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLnR3ZWVuKGZpbmdlcikucmVwZWF0Rm9yZXZlcihjYy5zZXF1ZW5jZShjYy5tb3ZlQnkoMC4zLGNjLnYyKDAsMTAwKSksY2MubW92ZUJ5KDAuMyxjYy52MigwLC0xMDApKSkpLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoTm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25UdXRvcmlhbHNDb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+inpuaRuOepv+mAj1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0b3VjaE5vZGUuX3RvdWNoTGlzdGVuZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoTm9kZS5fdG91Y2hMaXN0ZW5lci5zZXRTd2FsbG93VG91Y2hlcyhmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDMwMTp7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZ20uY3VyX2dhbWVfc2NlbmU9PUdhbWVTY2VuZS5nYW1lKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hDb250aW51ZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaW5nZXI9bm9kZS5nZXRDaGlsZEJ5TmFtZSgnZmluZ2VyJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLnR3ZWVuKGZpbmdlcikucmVwZWF0Rm9yZXZlcihjYy5zZXF1ZW5jZShjYy5tb3ZlQnkoMC4zLGNjLnYyKDAsLTEwMCkpLGNjLm1vdmVCeSgwLjMsY2MudjIoMCwxMDApKSkpLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoTm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsKCk9PnsgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25UdXRvcmlhbHNDb21wbGV0ZSgpOyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSx0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/op6bmkbjnqb/pgI9cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodG91Y2hOb2RlLl90b3VjaExpc3RlbmVyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7ICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uVHV0b3JpYWxzQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoTm9kZS5fdG91Y2hMaXN0ZW5lci5zZXRTd2FsbG93VG91Y2hlcyhmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDMwMjp7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZ20uY3VyX2dhbWVfc2NlbmU9PUdhbWVTY2VuZS5ob21lKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hOb2RlLnNldFBvc2l0aW9uKGJvc3NQb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLmdldENoaWxkQnlOYW1lKCd0b3VjaEJnJykuc2V0UG9zaXRpb24oYm9zc1Bvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoQ29udGludWUuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmluZ2VyPW5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2ZpbmdlcicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaW5nZXIuc2V0UG9zaXRpb24oYm9zc1Bvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLnR3ZWVuKGZpbmdlcikucmVwZWF0Rm9yZXZlcihjYy5zZXF1ZW5jZShjYy5tb3ZlQnkoMC4zLGNjLnYyKDAsMTAwKSksY2MubW92ZUJ5KDAuMyxjYy52MigwLC0xMDApKSkpLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoTm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb0xldmVsKEhlcm9fVHlwZS5TaG91V2FuZyk+PTEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25UdXRvcmlhbHNDb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc190dXRvcmFpbHNfc3RhdGU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sdGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v6Kem5pG456m/6YCPXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRvdWNoTm9kZS5fdG91Y2hMaXN0ZW5lcilcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hOb2RlLl90b3VjaExpc3RlbmVyLnNldFN3YWxsb3dUb3VjaGVzKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMjIxOntcclxuICAgICAgICAgICAgICAgICAgICBpZihnbS5jdXJfZ2FtZV9zY2VuZT09R2FtZVNjZW5lLmdhbWUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaENvbnRpbnVlLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpbmdlcj1ub2RlLmdldENoaWxkQnlOYW1lKCdmaW5nZXInKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MudHdlZW4oZmluZ2VyKS5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKGNjLm1vdmVCeSgwLjMsY2MudjIoMCwxMDApKSxjYy5tb3ZlQnkoMC4zLGNjLnYyKDAsLTEwMCkpKSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hOb2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwoKT0+eyAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vblR1dG9yaWFsc0NvbXBsZXRlKCk7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+inpuaRuOepv+mAj1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0b3VjaE5vZGUuX3RvdWNoTGlzdGVuZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoTm9kZS5fdG91Y2hMaXN0ZW5lci5zZXRTd2FsbG93VG91Y2hlcyhmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDIyMjp7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZ20uY3VyX2dhbWVfc2NlbmU9PUdhbWVTY2VuZS5ob21lKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hOb2RlLnNldFBvc2l0aW9uKGJvc3NQb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLmdldENoaWxkQnlOYW1lKCd0b3VjaEJnJykuc2V0UG9zaXRpb24oYm9zc1Bvcyk7ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaW5nZXI9bm9kZS5nZXRDaGlsZEJ5TmFtZSgnZmluZ2VyJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbmdlci5zZXRQb3NpdGlvbihib3NzUG9zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MudHdlZW4oZmluZ2VyKS5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKGNjLm1vdmVCeSgwLjMsY2MudjIoMCwxMDApKSxjYy5tb3ZlQnkoMC4zLGNjLnYyKDAsLTEwMCkpKSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hOb2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vblR1dG9yaWFsc0NvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNfdHV0b3JhaWxzX3N0YXRlPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+inpuaRuOepv+mAj1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0b3VjaE5vZGUuX3RvdWNoTGlzdGVuZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoTm9kZS5fdG91Y2hMaXN0ZW5lci5zZXRTd2FsbG93VG91Y2hlcyhmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hDb250aW51ZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdG91Y2hOb2RlLnNldENvbnRlbnRTaXplKG5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3RvdWNoQmcnKS4pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAyMjM6e1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGdtLmN1cl9nYW1lX3NjZW5lPT1HYW1lU2NlbmUuZ2FtZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoQ29udGludWUuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmluZ2VyPW5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2ZpbmdlcicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy50d2VlbihmaW5nZXIpLnJlcGVhdEZvcmV2ZXIoY2Muc2VxdWVuY2UoY2MubW92ZUJ5KDAuMyxjYy52MigwLDEwMCkpLGNjLm1vdmVCeSgwLjMsY2MudjIoMCwtMTAwKSkpKS5zdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaE5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCgpPT57ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uVHV0b3JpYWxzQ29tcGxldGUoKTsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sdGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v6Kem5pG456m/6YCPXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRvdWNoTm9kZS5fdG91Y2hMaXN0ZW5lcilcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hOb2RlLl90b3VjaExpc3RlbmVyLnNldFN3YWxsb3dUb3VjaGVzKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMzExOntcclxuICAgICAgICAgICAgICAgICAgICBpZihnbS5jdXJfZ2FtZV9zY2VuZT09R2FtZVNjZW5lLmdhbWUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaENvbnRpbnVlLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpbmdlcj1ub2RlLmdldENoaWxkQnlOYW1lKCdmaW5nZXInKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MudHdlZW4oZmluZ2VyKS5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKGNjLm1vdmVCeSgwLjMsY2MudjIoMCwtMTAwKSksY2MubW92ZUJ5KDAuMyxjYy52MigwLDEwMCkpKSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hOb2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwoKT0+eyAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vblR1dG9yaWFsc0NvbXBsZXRlKCk7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+inpuaRuOepv+mAj1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0b3VjaE5vZGUuX3RvdWNoTGlzdGVuZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoTm9kZS5fdG91Y2hMaXN0ZW5lci5zZXRTd2FsbG93VG91Y2hlcyhmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDMxMjp7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZ20uY3VyX2dhbWVfc2NlbmU9PUdhbWVTY2VuZS5ob21lKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hDb250aW51ZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoTm9kZS5zZXRQb3NpdGlvbihib3NzUG9zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5nZXRDaGlsZEJ5TmFtZSgndG91Y2hCZycpLnNldFBvc2l0aW9uKGJvc3NQb3MpOyAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmluZ2VyPW5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2ZpbmdlcicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaW5nZXIuc2V0UG9zaXRpb24oYm9zc1Bvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLnR3ZWVuKGZpbmdlcikucmVwZWF0Rm9yZXZlcihjYy5zZXF1ZW5jZShjYy5tb3ZlQnkoMC4zLGNjLnYyKDAsMTAwKSksY2MubW92ZUJ5KDAuMyxjYy52MigwLC0xMDApKSkpLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoTm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb1N0YWdlKEhlcm9fVHlwZS5QYW9TaG91KT49MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vblR1dG9yaWFsc0NvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzX3R1dG9yYWlsc19zdGF0ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZUZpbmlzaCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+inpuaRuOepv+mAj1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0b3VjaE5vZGUuX3RvdWNoTGlzdGVuZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoTm9kZS5fdG91Y2hMaXN0ZW5lci5zZXRTd2FsbG93VG91Y2hlcyhmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdG91Y2hDb250aW51ZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIHRoaXMub25UdXRvcmlhbHNDb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB9LHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMzMxOntcclxuICAgICAgICAgICAgICAgICAgICBpZihnbS5jdXJfZ2FtZV9zY2VuZT09R2FtZVNjZW5lLmdhbWUpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+inpuaRuOepv+mAj1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaENvbnRpbnVlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vblR1dG9yaWFsc0NvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sdGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAyMjU6e1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGdtLmN1cl9nYW1lX3NjZW5lPT1HYW1lU2NlbmUuZ2FtZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoQ29udGludWUuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmluZ2VyPW5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2ZpbmdlcicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy50d2VlbihmaW5nZXIpLnJlcGVhdEZvcmV2ZXIoY2Muc2VxdWVuY2UoY2MubW92ZUJ5KDAuMyxjYy52MigwLDEwMCkpLGNjLm1vdmVCeSgwLjMsY2MudjIoMCwtMTAwKSkpKS5zdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaE5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCgpPT57ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uVHV0b3JpYWxzQ29tcGxldGUoKTsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sdGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v6Kem5pG456m/6YCPXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRvdWNoTm9kZS5fdG91Y2hMaXN0ZW5lcilcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hOb2RlLl90b3VjaExpc3RlbmVyLnNldFN3YWxsb3dUb3VjaGVzKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMjI2OntcclxuICAgICAgICAgICAgICAgICAgICBpZihnbS5jdXJfZ2FtZV9zY2VuZT09R2FtZVNjZW5lLmhvbWUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaE5vZGUuc2V0UG9zaXRpb24oYm9zc1Bvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3RvdWNoQmcnKS5zZXRQb3NpdGlvbihib3NzUG9zKTsgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpbmdlcj1ub2RlLmdldENoaWxkQnlOYW1lKCdmaW5nZXInKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmluZ2VyLnNldFBvc2l0aW9uKGJvc3NQb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy50d2VlbihmaW5nZXIpLnJlcGVhdEZvcmV2ZXIoY2Muc2VxdWVuY2UoY2MubW92ZUJ5KDAuMyxjYy52MigwLDEwMCkpLGNjLm1vdmVCeSgwLjMsY2MudjIoMCwtMTAwKSkpKS5zdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaE5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uVHV0b3JpYWxzQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSx0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/op6bmkbjnqb/pgI9cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodG91Y2hOb2RlLl90b3VjaExpc3RlbmVyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3VjaE5vZGUuX3RvdWNoTGlzdGVuZXIuc2V0U3dhbGxvd1RvdWNoZXMoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoQ29udGludWUuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMjI3OntcclxuICAgICAgICAgICAgICAgICAgICBpZihnbS5jdXJfZ2FtZV9zY2VuZT09R2FtZVNjZW5lLmhvbWUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaE5vZGUuc2V0UG9zaXRpb24oYm9zc1Bvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3RvdWNoQmcnKS5zZXRQb3NpdGlvbihib3NzUG9zKTsgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpbmdlcj1ub2RlLmdldENoaWxkQnlOYW1lKCdmaW5nZXInKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmluZ2VyLnNldFBvc2l0aW9uKGJvc3NQb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy50d2VlbihmaW5nZXIpLnJlcGVhdEZvcmV2ZXIoY2Muc2VxdWVuY2UoY2MubW92ZUJ5KDAuMyxjYy52MigwLDEwMCkpLGNjLm1vdmVCeSgwLjMsY2MudjIoMCwtMTAwKSkpKS5zdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaE5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uVHV0b3JpYWxzQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlRmluaXNoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sdGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v6Kem5pG456m/6YCPXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRvdWNoTm9kZS5fdG91Y2hMaXN0ZW5lcilcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hOb2RlLl90b3VjaExpc3RlbmVyLnNldFN3YWxsb3dUb3VjaGVzKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaENvbnRpbnVlLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbiJdfQ==