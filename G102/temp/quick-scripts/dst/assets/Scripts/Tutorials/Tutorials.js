
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVHV0b3JpYWxzXFxUdXRvcmlhbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNERBQXVEO0FBQ3ZELDBDQUFrRTtBQUNsRSw4Q0FBeUM7QUFDekMsMERBQWdFO0FBQ2hFLHdEQUF1RDtBQUN2RCxzREFBb0Q7QUFFcEQsNERBQXVEO0FBQ3ZELG9FQUErRDtBQUMvRCxnRUFBMkQ7QUFDM0Qsb0VBQStEO0FBQy9ELDJDQUFpRDtBQUNqRCx1REFBa0Q7QUFHNUMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBdUMsNkJBQVk7SUFBbkQ7UUFBQSxxRUF3dkJDO1FBdHZCRyxvQkFBYyxHQUFVLElBQUksQ0FBQztRQUM3QixjQUFRLEdBQVEsQ0FBQyxDQUFDO1FBQ2xCLFdBQUssR0FBUSxDQUFDLENBQUM7O0lBb3ZCbkIsQ0FBQztJQWh2QkcsUUFBUTtJQUNSLHVDQUFtQixHQUFuQjtRQUVJLHVCQUFhLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDLDZCQUFXLENBQUMsSUFBSSxHQUFDLDBCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3BHLE1BQU07UUFDTiwwQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxVQUFVLEdBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0MsSUFBRyxJQUFJLENBQUMsY0FBYyxFQUN0QjtZQUNJLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUN6QjtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUM3QiwwQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxZQUFZLEdBQUMsSUFBSSxDQUFDO1FBQ2pELDBEQUEwRDtJQUM5RCxDQUFDO0lBRUQsb0NBQWdCLEdBQWhCLFVBQWlCLEVBQVMs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QixTQUFTIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFdYTWFuYWdlckVYIGZyb20gXCIuLi8uLi9zdGFydHNjZW5lL1dYTWFuYWdlckVYXCI7XHJcbmltcG9ydCB7IEdhbWVNb2RlLCBHYW1lU2NlbmUsIEdvX1R5cGUsIEppYVN1fSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgSGVyb0Jhc2VJbmZvTWFuYWdlciB9IGZyb20gXCIuLi9IZXJvL0RhdGEvSGVyb0Jhc2VJbmZvXCI7XHJcbmltcG9ydCB7IEhlcm9NYW5hZ2VyIH0gZnJvbSBcIi4uL0hlcm8vRGF0YS9IZXJvTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBIZXJvX1R5cGUgfSBmcm9tIFwiLi4vSGVyby9HYW1lL0hlcm9Db25maWdcIjtcclxuaW1wb3J0IHsgTGV2ZWxNYW5hZ2VyIH0gZnJvbSBcIi4uL0xldmVsL0xldmVsTWFuYWdlclwiO1xyXG5pbXBvcnQgTW9uc3Rlck1hbmFnZXIgZnJvbSBcIi4uL01vbnN0ZXIvTW9uc3Rlck1hbmFnZXJcIjtcclxuaW1wb3J0IHsgRm9sbG93X1R5cGUgfSBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dDb25zdGFudHNcIjtcclxuaW1wb3J0IEZvbGxvd01hbmFnZXIgZnJvbSBcIi4uL211bHRpTGFuZ3VhZ2UvRm9sbG93TWFuYWdlclwiO1xyXG5pbXBvcnQgTGFuZ3VhZ2VNYW5hZ2VyIGZyb20gXCIuLi9tdWx0aUxhbmd1YWdlL0xhbmd1YWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBDb3Vyc2VUZXh0TWFuYWdlciB9IGZyb20gXCIuL0NvdXJzZVRleHRcIjtcclxuaW1wb3J0IFR1dG9yYWlsc01hbmFnZXIgZnJvbSBcIi4vVHV0b3JhaWxzTWFuYWdlclwiO1xyXG5cclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVHV0b3JpYWxzIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBjbG9zZV9jYWxsYmFjazpGdW5jdGlvbj1udWxsO1xyXG4gICAgcnVvX3RpbWU6bnVtYmVyPTU7XHJcbiAgICB0X251bTpudW1iZXI9MDtcclxuXHJcblxyXG4gICAgXHJcbiAgICAvL+W9k+asoeaVmeeoi+WujOavlVxyXG4gICAgb25UdXRvcmlhbHNDb21wbGV0ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuaWsOaJi+W8leWvvCtUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd2luZ19pZCk7XHJcbiAgICAgICAgLy/liKDpmaToioLngrlcclxuICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd2luZ19pZD0tMTtcclxuICAgICAgICBpZih0aGlzLmNsb3NlX2NhbGxiYWNrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5jbG9zZV9jYWxsYmFjaygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5vZGUucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfdHV0b3JpYWw9bnVsbDtcclxuICAgICAgICAvL1R1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc190dXRvcmFpbHNfc3RhdGU9ZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1J1b1R1dG9yaWFscyhpZDpudW1iZXIsY2xvc2VDYWxsYmFjazpGdW5jdGlvbixpc0xlZnQ6Ym9vbGVhbj10cnVlLGJvc3NQb3M/OmNjLlZlYzIpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGdtPUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgdGhpcy5jbG9zZV9jYWxsYmFjaz1jbG9zZUNhbGxiYWNrO1xyXG4gICAgICAgIHRoaXMubm9kZS5yZW1vdmVBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc190dXRvcmFpbHNfc3RhdGU9dHJ1ZTtcclxuICAgICAgICAvLyBmb3IobGV0IGk9MDsgaTxsZW47IGkrKylcclxuICAgICAgICAvLyB7XHJcbiAgICAgICAgLy8gICAgIGxldCBqc29uPVR1dG9yaWFsc19Kc29uW2ldO1xyXG4gICAgICAgIC8vICAgICBpZihpZD09anNvbi54c19pZClcclxuICAgICAgICAvLyAgICAgeyAgICAgICAgICAgICAgICBcclxuICAgICAgICAvLyAgICAgICAgIC8v5qCH6aKYXHJcbiAgICAgICAgLy8gICAgICAgICB0aXRsZT1MYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZChqc29uLnRpdGxlX3RleHRfaWQpO1xyXG4gICAgICAgIC8vICAgICAgICAgLy/lhoXlrrlcclxuICAgICAgICAvLyAgICAgICAgIGRlczE9TGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoanNvbi5ndWlkYW5jZV90ZXh0X2lkKTtcclxuICAgICAgICAvLyAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8v5bGV56S65Ye65p2lXHJcbiAgICAgICAgbGV0IGlkU3RyPSd0JytpZDtcclxuICAgICAgICBXWE1hbmFnZXJFWC5nZXRJbnN0YW5jZSgpLnJlc291cmNlc0J1bmRsZS5sb2FkKCd0dXRvcmlhbHMvJytpZFN0cixjYy5QcmVmYWIsKGVycm9yOiBFcnJvciwgYXNzZXRzOmNjLlByZWZhYik9PntcclxuICAgICAgICAgICAgaWYoZXJyb3IpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShhc3NldHMpO1xyXG4gICAgICAgICAgICBub2RlLnBhcmVudD10aGlzLm5vZGU7XHJcbiAgICAgICAgICAgIC8v5qC55o2uaWTmn6Xmib5cclxuICAgICAgICAgICAgbGV0IGpzb25EYXRhPUNvdXJzZVRleHRNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvbkNvdXJzZVRleHQoaWQpOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL+iLsembhGlkXHJcbiAgICAgICAgICAgIGxldCBoZXJvSWQ9anNvbkRhdGEuaGVyb190ZXh0X2lkOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgLy/mu5rliqjop4blm75cclxuICAgICAgICAgICAgbGV0IHRleHRTY3JvbGxWaWV3PW5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3RleHRTY3JvbGxWaWV3JykuZ2V0Q29tcG9uZW50KGNjLlNjcm9sbFZpZXcpO1xyXG4gICAgICAgICAgICAvL+Wbvuagh1xyXG4gICAgICAgICAgICBsZXQgaWNvbj10ZXh0U2Nyb2xsVmlldy5ub2RlLmdldENoaWxkQnlOYW1lKCdpY29uJykuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICAgICAgICAgIGlmKGhlcm9JZCE9SGVyb19UeXBlLk5VTEwpe1xyXG4gICAgICAgICAgICAgICAgaWNvbi5ub2RlLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgICAgICAgaWNvbi5zcHJpdGVGcmFtZT1IZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9Cb2R5KGhlcm9JZCk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgaWNvbi5ub2RlLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL+WGheWuuVxyXG4gICAgICAgICAgICBsZXQgZGVzPUxhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKGpzb25EYXRhLmd1aWRhbmNlX3RleHRfaWQpOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgZGVzTGFiZWw9dGV4dFNjcm9sbFZpZXcuY29udGVudC5nZXRDaGlsZEJ5TmFtZSgnZGVzTGFiZWwnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBkZXNMYWJlbC5zdHJpbmc9ZGVzO1xyXG4gICAgICAgICAgICB0ZXh0U2Nyb2xsVmlldy5zY3JvbGxUb0JvdHRvbSgwLjUpO1xyXG4gICAgICAgICAgICAvL+WQjeWtl1xyXG4gICAgICAgICAgICBsZXQgbmFtZT1MYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZChIZXJvQmFzZUluZm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TmFtZVRleHRfSUQoaGVyb0lkKSk7XHJcbiAgICAgICAgICAgIGxldCBuYW1lTGFiZWw9dGV4dFNjcm9sbFZpZXcubm9kZS5nZXRDaGlsZEJ5TmFtZSgnbmFtZUxhYmVsJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICAgICAgbmFtZUxhYmVsLnN0cmluZz1uYW1lO1xyXG4gICAgICAgICAgICAvL+inpuaRuOebkeWQrOS4gOS4i1xyXG4gICAgICAgICAgICBsZXQgdG91Y2hDb250aW51ZT10ZXh0U2Nyb2xsVmlldy5ub2RlLmdldENoaWxkQnlOYW1lKCd0b3VjaENvbnRpbnVlJyk7XHJcbiAgICAgICAgICAgIGxldCB0ZXh0TGFuZ3VhZ2U9dG91Y2hDb250aW51ZS5nZXRDaGlsZEJ5TmFtZSgnVGV4dExhbmd1YWdlJyk7XHJcbiAgICAgICAgICAgIGxldCBjbGlja0ljb249dG91Y2hDb250aW51ZS5nZXRDaGlsZEJ5TmFtZSgnY2xpY2tJY29uJyk7XHJcbiAgICAgICAgICAgIC8v57+76L2s6K6+572uXHJcbiAgICAgICAgICAgIGlmKGlzTGVmdCl7XHJcbiAgICAgICAgICAgICAgICB0ZXh0U2Nyb2xsVmlldy5ub2RlLng9LWNjLndpblNpemUud2lkdGgvMjtcclxuICAgICAgICAgICAgICAgIHRleHRTY3JvbGxWaWV3Lm5vZGUuc2NhbGVYPTE7XHJcbiAgICAgICAgICAgICAgICBkZXNMYWJlbC5ub2RlLnNjYWxlWD0xO1xyXG4gICAgICAgICAgICAgICAgbmFtZUxhYmVsLm5vZGUuc2NhbGVYPTE7XHJcbiAgICAgICAgICAgICAgICB0ZXh0TGFuZ3VhZ2Uuc2NhbGVYPTE7XHJcbiAgICAgICAgICAgICAgICBjbGlja0ljb24uc2NhbGVYPTE7XHJcbiAgICAgICAgICAgICAgICBjbGlja0ljb24uekluZGV4PTE7XHJcbiAgICAgICAgICAgICAgICB0ZXh0TGFuZ3VhZ2UuekluZGV4PTI7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGV4dFNjcm9sbFZpZXcubm9kZS54PWNjLndpblNpemUud2lkdGgvMjtcclxuICAgICAgICAgICAgICAgIHRleHRTY3JvbGxWaWV3Lm5vZGUuc2NhbGVYPS0xO1xyXG4gICAgICAgICAgICAgICAgZGVzTGFiZWwubm9kZS5zY2FsZVg9LTE7XHJcbiAgICAgICAgICAgICAgICBuYW1lTGFiZWwubm9kZS5zY2FsZVg9LTE7XHJcbiAgICAgICAgICAgICAgICB0ZXh0TGFuZ3VhZ2Uuc2NhbGVYPS0xO1xyXG4gICAgICAgICAgICAgICAgY2xpY2tJY29uLnNjYWxlWD0tMTtcclxuICAgICAgICAgICAgICAgIGNsaWNrSWNvbi56SW5kZXg9MjtcclxuICAgICAgICAgICAgICAgIHRleHRMYW5ndWFnZS56SW5kZXg9MTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgcmF0ZT1HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEdhbWVSYXRlKCk7XHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKGNsaWNrSWNvbikucmVwZWF0Rm9yZXZlcihjYy5zZXF1ZW5jZShjYy5tb3ZlQnkoMC4yKnJhdGUsY2MudjIoMCwxMCkpLGNjLm1vdmVCeSgwLjIqcmF0ZSxjYy52MigwLC0xMCkpKSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgIGxldCB0b3VjaE5vZGU9bm9kZS5nZXRDaGlsZEJ5TmFtZSgndG91Y2hOb2RlJyk7XHJcbiAgICAgICAgICAgIC8vYmdcclxuICAgICAgICAgICAgbGV0IGJnPW5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2JnJyk7XHJcbiAgICAgICAgICAgIGlmKGJnKXtcclxuICAgICAgICAgICAgICAgIC8v6Kem5pG456m/6YCPXHJcbiAgICAgICAgICAgICAgICBpZihiZy5fdG91Y2hMaXN0ZW5lcilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBiZy5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vblR1dG9yaWFsc0NvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGlkPT0yNTIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hbGxfaGVyby5nZXQoSGVyb19UeXBlLkdvbmdKaWFuU2hvdSkuc2hvd0hlcm8oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBlbmVteXM9TW9uc3Rlck1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNb25zdGVyc0Zvck5lYXJlc3QoMSx0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKSwxMDAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGVuZW15cylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+acgOWJjeeahOaVjOS6ulxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBlbmVteVBvcz1lbmVteXNbMF0uZ2V0UG9zaXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFsbF9oZXJvLmdldChIZXJvX1R5cGUuR29uZ0ppYW5TaG91KS5yZWxlYXNlU2tpbGwoZW5lbXlQb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSx0aGlzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzd2l0Y2goaWQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMjAxOntcclxuICAgICAgICAgICAgICAgICAgICBpZihnbS5jdXJfZ2FtZV9zY2VuZT09R2FtZVNjZW5lLmhvbWUpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+W8uuWItuaYvuekuuS4u+mhtVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdhbWVfdG9faG9tZT1Hb19UeXBlLk1haW47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuanVtb0FuZFNob3dVaSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaE5vZGUuc2V0UG9zaXRpb24oYm9zc1Bvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3RvdWNoQmcnKS5zZXRQb3NpdGlvbihib3NzUG9zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hDb250aW51ZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaW5nZXI9bm9kZS5nZXRDaGlsZEJ5TmFtZSgnZmluZ2VyJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbmdlci5zZXRQb3NpdGlvbihib3NzUG9zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MudHdlZW4oZmluZ2VyKS5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKGNjLm1vdmVCeSgwLjMsY2MudjIoMCwxMDApKSxjYy5tb3ZlQnkoMC4zLGNjLnYyKDAsLTEwMCkpKSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hOb2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCgpPT57ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlLmdldENoaWxkQnlOYW1lKCd0b3VjaEJnJykuc2NhbGU9MC45O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaE5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCgpPT57ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uVHV0b3JpYWxzQ29tcGxldGUoKTsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sdGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v6Kem5pG456m/6YCPXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRvdWNoTm9kZS5fdG91Y2hMaXN0ZW5lcilcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hOb2RlLl90b3VjaExpc3RlbmVyLnNldFN3YWxsb3dUb3VjaGVzKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMjAyOntcclxuICAgICAgICAgICAgICAgICAgICBpZihnbS5jdXJfZ2FtZV9zY2VuZT09R2FtZVNjZW5lLmdhbWUpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaENvbnRpbnVlLmFjdGl2ZT1mYWxzZTsgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGhlcm9Ob2RlPUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWxsX2hlcm8uZ2V0KEhlcm9fVHlwZS5BTnVCaVNpKS5ub2RlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwb3NZPWhlcm9Ob2RlLnk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwb3NYPWhlcm9Ob2RlLng7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoTm9kZS54PXBvc1g7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWxsX2hlcm8uZ2V0KEhlcm9fVHlwZS5BTnVCaVNpKS5zZXRDRCgwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpbmdlcj1ub2RlLmdldENoaWxkQnlOYW1lKCdmaW5nZXInKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmluZ2VyLng9cG9zWDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmluZ2VyLnk9cG9zWSs3MDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hOb2RlLnk9cG9zWTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGJnMT1ub2RlLmdldENoaWxkQnlOYW1lKCdiZzEnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGJnMj1ub2RlLmdldENoaWxkQnlOYW1lKCdiZzInKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmcxLnk9cG9zWSt0b3VjaE5vZGUuaGVpZ2h0KigxLXRvdWNoTm9kZS5hbmNob3JZKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmcyLnk9cG9zWS10b3VjaE5vZGUuaGVpZ2h0KnRvdWNoTm9kZS5hbmNob3JZO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYmczPW5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2JnMycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYmc0PW5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2JnNCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiZzMueD1wb3NYLXRvdWNoTm9kZS53aWR0aC8yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiZzMueT1wb3NZO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiZzQueT1wb3NZOyAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBiZzQueD1wb3NYK3RvdWNoTm9kZS53aWR0aC8yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdDExPW5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3QxMScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0MTEuc2V0Q29udGVudFNpemUoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hbGxfaGVyby5nZXQoSGVyb19UeXBlLkFOdUJpU2kpLmdldFNraWxsVGlwU2l6ZSgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdDExLm9wYWNpdHk9MDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MudHdlZW4oZmluZ2VyKS5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKGNjLm1vdmVCeSgxKnJhdGUsY2MudjIoMCw2NDApKSxjYy5jYWxsRnVuYygoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmluZ2VyLng9cG9zWDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbmdlci55PXBvc1krNzA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLGNjLmRlbGF5VGltZSgwLjIqcmF0ZSkpKS5zdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaE5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsKGUpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0U2Nyb2xsVmlldy5ub2RlLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJnMS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZzIuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmczLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJnNC5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0MTEub3BhY2l0eT0yNTU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcG9zPXRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihlLmdldExvY2F0aW9uKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdDExLnNldFBvc2l0aW9uKHBvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sdGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoTm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9NT1ZFLChlOmNjLkV2ZW50LkV2ZW50VG91Y2gpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcG9zPXRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihlLmdldExvY2F0aW9uKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdDExLnNldFBvc2l0aW9uKHBvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoTm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9DQU5DRUwsKGU6Y2MuRXZlbnQuRXZlbnRUb3VjaCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwb3M9dGhpcy5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKGUuZ2V0TG9jYXRpb24oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihwb3MueT5HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmVuZW15X2F0dF95KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uVHV0b3JpYWxzQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFsbF9oZXJvLmdldChIZXJvX1R5cGUuQU51QmlTaSkucmVsZWFzZVNraWxsKHBvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0U2Nyb2xsVmlldy5ub2RlLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJnMS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZzIuYWN0aXZlPXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmczLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJnNC5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0MTEub3BhY2l0eT0wO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbmdlci54PXBvc1g7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmluZ2VyLnk9cG9zWSs3MDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaW5nZXIuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy50d2VlbihmaW5nZXIpLnJlcGVhdEZvcmV2ZXIoY2Muc2VxdWVuY2UoY2MubW92ZUJ5KDEqcmF0ZSxjYy52MigwLDY0MCkpLGNjLmNhbGxGdW5jKCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbmdlci54PXBvc1g7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbmdlci55PXBvc1krNzA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksY2MuZGVsYXlUaW1lKDAuMipyYXRlKSkpLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sdGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoTm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRTY3JvbGxWaWV3Lm5vZGUuYWN0aXZlPXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZzEuYWN0aXZlPXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZzIuYWN0aXZlPXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZzMuYWN0aXZlPXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZzQuYWN0aXZlPXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0MTEub3BhY2l0eT0wO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmluZ2VyLng9cG9zWDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbmdlci55PXBvc1krNzA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaW5nZXIuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLnR3ZWVuKGZpbmdlcikucmVwZWF0Rm9yZXZlcihjYy5zZXF1ZW5jZShjYy5tb3ZlQnkoMSpyYXRlLGNjLnYyKDAsNjQwKSksY2MuY2FsbEZ1bmMoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaW5nZXIueD1wb3NYO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbmdlci55PXBvc1krNzA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxjYy5kZWxheVRpbWUoMC4yKnJhdGUpKSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSx0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/op6bmkbjnqb/pgI9cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYodG91Y2hOb2RlLl90b3VjaExpc3RlbmVyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICB0b3VjaE5vZGUuX3RvdWNoTGlzdGVuZXIuc2V0U3dhbGxvd1RvdWNoZXMoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAyMDM6e1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGdtLmN1cl9nYW1lX3NjZW5lPT1HYW1lU2NlbmUuZ2FtZSlcclxuICAgICAgICAgICAgICAgICAgICB7ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v5YW9546L5omT5pat5oqA6IO977yM54K55Ye755u05o6l6YeK5pS+5YiwYm9zc+S9jee9riAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaGVyb05vZGU9R2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hbGxfaGVyby5nZXQoSGVyb19UeXBlLlNob3VXYW5nKS5ub2RlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcG9zWT1oZXJvTm9kZS55O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcG9zWD1oZXJvTm9kZS54O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaE5vZGUueD1wb3NYO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFsbF9oZXJvLmdldChIZXJvX1R5cGUuU2hvdVdhbmcpLnNldENEKDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaENvbnRpbnVlLmFjdGl2ZT1mYWxzZTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpbmdlcj1ub2RlLmdldENoaWxkQnlOYW1lKCdmaW5nZXInKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmluZ2VyLng9cG9zWDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmluZ2VyLnk9cG9zWSs3MDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hOb2RlLnk9cG9zWTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5nZXRDaGlsZEJ5TmFtZSgnYmcxJykueT1wb3NZK3RvdWNoTm9kZS5oZWlnaHQqKDEtdG91Y2hOb2RlLmFuY2hvclkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLmdldENoaWxkQnlOYW1lKCdiZzInKS55PXBvc1ktdG91Y2hOb2RlLmhlaWdodCp0b3VjaE5vZGUuYW5jaG9yWTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGJnMz1ub2RlLmdldENoaWxkQnlOYW1lKCdiZzMnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGJnND1ub2RlLmdldENoaWxkQnlOYW1lKCdiZzQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmczLng9cG9zWC10b3VjaE5vZGUud2lkdGgvMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmczLnk9cG9zWTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmc0Lnk9cG9zWTsgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmc0Lng9cG9zWCt0b3VjaE5vZGUud2lkdGgvMjsgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MudHdlZW4oZmluZ2VyKS5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKGNjLm1vdmVCeSgwLjMqcmF0ZSxjYy52MigwLDEwMCkpLGNjLm1vdmVCeSgwLjMqcmF0ZSxjYy52MigwLC0xMDApKSkpLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoTm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vblR1dG9yaWFsc0NvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFsbF9oZXJvLmdldChIZXJvX1R5cGUuU2hvdVdhbmcpLnJlbGVhc2VTa2lsbChib3NzUG9zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSx0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/op6bmkbjnqb/pgI9cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYodG91Y2hOb2RlLl90b3VjaExpc3RlbmVyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICB0b3VjaE5vZGUuX3RvdWNoTGlzdGVuZXIuc2V0U3dhbGxvd1RvdWNoZXMoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWJyZWFrOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGNhc2UgMjA0OntcclxuICAgICAgICAgICAgICAgICAgICBpZihnbS5jdXJfZ2FtZV9zY2VuZT09R2FtZVNjZW5lLmdhbWUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaENvbnRpbnVlLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpbmdlcj1ub2RlLmdldENoaWxkQnlOYW1lKCdmaW5nZXInKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmluZ2VyLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2MudHdlZW4oZmluZ2VyKS5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKGNjLm1vdmVCeSgwLjMsY2MudjIoMCwxMDApKSxjYy5tb3ZlQnkoMC4zLGNjLnYyKDAsLTEwMCkpKSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hOb2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwoKT0+eyAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vblR1dG9yaWFsc0NvbXBsZXRlKCk7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+inpuaRuOepv+mAj1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0b3VjaE5vZGUuX3RvdWNoTGlzdGVuZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoTm9kZS5fdG91Y2hMaXN0ZW5lci5zZXRTd2FsbG93VG91Y2hlcyhmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDIxMTp7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZ20uY3VyX2dhbWVfc2NlbmU9PUdhbWVTY2VuZS5nYW1lKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/op6bmkbjnqb/pgI9cclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hDb250aW51ZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25UdXRvcmlhbHNDb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMjEyOntcclxuICAgICAgICAgICAgICAgICAgICBpZihnbS5jdXJfZ2FtZV9zY2VuZT09R2FtZVNjZW5lLmdhbWUpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+inpuaRuOepv+mAj1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaENvbnRpbnVlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vblR1dG9yaWFsc0NvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sdGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAyMTM6e1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGdtLmN1cl9nYW1lX3NjZW5lPT1HYW1lU2NlbmUuZ2FtZSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v6Kem5pG456m/6YCPXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoQ29udGludWUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uVHV0b3JpYWxzQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSx0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDIxNDp7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZ20uY3VyX2dhbWVfc2NlbmU9PUdhbWVTY2VuZS5nYW1lKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hDb250aW51ZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaW5nZXI9bm9kZS5nZXRDaGlsZEJ5TmFtZSgnZmluZ2VyJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbmdlci5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY2MudHdlZW4oZmluZ2VyKS5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKGNjLm1vdmVCeSgwLjMsY2MudjIoMCwxMDApKSxjYy5tb3ZlQnkoMC4zLGNjLnYyKDAsLTEwMCkpKSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hOb2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwoKT0+eyAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vblR1dG9yaWFsc0NvbXBsZXRlKCk7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+inpuaRuOepv+mAj1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0b3VjaE5vZGUuX3RvdWNoTGlzdGVuZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoTm9kZS5fdG91Y2hMaXN0ZW5lci5zZXRTd2FsbG93VG91Y2hlcyhmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDIyMTp7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZ20uY3VyX2dhbWVfc2NlbmU9PUdhbWVTY2VuZS5nYW1lKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90b3VjaENvbnRpbnVlLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9sZXQgZmluZ2VyPW5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2ZpbmdlcicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NjLnR3ZWVuKGZpbmdlcikucmVwZWF0Rm9yZXZlcihjYy5zZXF1ZW5jZShjYy5tb3ZlQnkoMC4zLGNjLnYyKDAsMTAwKSksY2MubW92ZUJ5KDAuMyxjYy52MigwLC0xMDApKSkpLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoTm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsKCk9PnsgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25UdXRvcmlhbHNDb21wbGV0ZSgpOyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSx0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hDb250aW51ZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25UdXRvcmlhbHNDb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+inpuaRuOepv+mAj1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0b3VjaE5vZGUuX3RvdWNoTGlzdGVuZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoTm9kZS5fdG91Y2hMaXN0ZW5lci5zZXRTd2FsbG93VG91Y2hlcyhmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgY2FzZSAyMTE6e1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGdtLmN1cl9nYW1lX3NjZW5lPT1HYW1lU2NlbmUuaG9tZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v5by65Yi25pi+56S65Li76aG1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2FtZV90b19ob21lPUdvX1R5cGUuTWFpbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5qdW1vQW5kU2hvd1VpKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoTm9kZS5zZXRQb3NpdGlvbihib3NzUG9zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5nZXRDaGlsZEJ5TmFtZSgndG91Y2hCZycpLnNldFBvc2l0aW9uKGJvc3NQb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaENvbnRpbnVlLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpbmdlcj1ub2RlLmdldENoaWxkQnlOYW1lKCdmaW5nZXInKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmluZ2VyLnNldFBvc2l0aW9uKGJvc3NQb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy50d2VlbihmaW5nZXIpLnJlcGVhdEZvcmV2ZXIoY2Muc2VxdWVuY2UoY2MubW92ZUJ5KDAuMyxjYy52MigwLDEwMCkpLGNjLm1vdmVCeSgwLjMsY2MudjIoMCwtMTAwKSkpKS5zdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaE5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uVHV0b3JpYWxzQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSx0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/op6bmkbjnqb/pgI9cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodG91Y2hOb2RlLl90b3VjaExpc3RlbmVyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3VjaE5vZGUuX3RvdWNoTGlzdGVuZXIuc2V0U3dhbGxvd1RvdWNoZXMoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAyMjI6e1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGdtLmN1cl9nYW1lX3NjZW5lPT1HYW1lU2NlbmUuaG9tZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2FtZV90b19ob21lPUdvX1R5cGUuQ2l0eTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5qdW1vQW5kU2hvd1VpKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoTm9kZS5zZXRQb3NpdGlvbihib3NzUG9zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5nZXRDaGlsZEJ5TmFtZSgndG91Y2hCZycpLnNldFBvc2l0aW9uKGJvc3NQb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaENvbnRpbnVlLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpbmdlcj1ub2RlLmdldENoaWxkQnlOYW1lKCdmaW5nZXInKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmluZ2VyLnNldFBvc2l0aW9uKGJvc3NQb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy50d2VlbihmaW5nZXIpLnJlcGVhdEZvcmV2ZXIoY2Muc2VxdWVuY2UoY2MubW92ZUJ5KDAuMyxjYy52MigwLDEwMCkpLGNjLm1vdmVCeSgwLjMsY2MudjIoMCwtMTAwKSkpKS5zdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaE5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uVHV0b3JpYWxzQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSx0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/op6bmkbjnqb/pgI9cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYodG91Y2hOb2RlLl90b3VjaExpc3RlbmVyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICB0b3VjaE5vZGUuX3RvdWNoTGlzdGVuZXIuc2V0U3dhbGxvd1RvdWNoZXMoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAyMzE6e1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGdtLmN1cl9nYW1lX3NjZW5lPT1HYW1lU2NlbmUuZ2FtZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoQ29udGludWUuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmluZ2VyPW5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2ZpbmdlcicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaW5nZXIuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NjLnR3ZWVuKGZpbmdlcikucmVwZWF0Rm9yZXZlcihjYy5zZXF1ZW5jZShjYy5tb3ZlQnkoMC4zLGNjLnYyKDAsMTAwKSksY2MubW92ZUJ5KDAuMyxjYy52MigwLC0xMDApKSkpLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoTm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsKCk9PnsgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25UdXRvcmlhbHNDb21wbGV0ZSgpOyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSx0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/op6bmkbjnqb/pgI9cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodG91Y2hOb2RlLl90b3VjaExpc3RlbmVyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3VjaE5vZGUuX3RvdWNoTGlzdGVuZXIuc2V0U3dhbGxvd1RvdWNoZXMoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWJyZWFrOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGNhc2UgMjQxOntcclxuICAgICAgICAgICAgICAgICAgICBpZihnbS5jdXJfZ2FtZV9zY2VuZT09R2FtZVNjZW5lLmdhbWUpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaENvbnRpbnVlLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBvc1g9MSoxNDQtMjg4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaE5vZGUueD1wb3NYO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcG9zWT1HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFsbF9oZXJvLmdldChIZXJvX1R5cGUuRGVMdVlpKS5ub2RlLnk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWxsX2hlcm8uZ2V0KEhlcm9fVHlwZS5EZUx1WWkpLnNldENEKDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmluZ2VyPW5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2ZpbmdlcicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaW5nZXIueD1wb3NYO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaW5nZXIueT1wb3NZKzcwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaE5vZGUueT1wb3NZO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYmcxPW5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2JnMScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYmcyPW5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2JnMicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiZzEueT1wb3NZK3RvdWNoTm9kZS5oZWlnaHQqKDEtdG91Y2hOb2RlLmFuY2hvclkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiZzIueT1wb3NZLXRvdWNoTm9kZS5oZWlnaHQqdG91Y2hOb2RlLmFuY2hvclk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBiZzM9bm9kZS5nZXRDaGlsZEJ5TmFtZSgnYmczJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBiZzQ9bm9kZS5nZXRDaGlsZEJ5TmFtZSgnYmc0Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJnMy54PXBvc1gtdG91Y2hOb2RlLndpZHRoLzI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJnMy55PXBvc1k7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJnNC55PXBvc1k7ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJnNC54PXBvc1grdG91Y2hOb2RlLndpZHRoLzI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0MTI9bm9kZS5nZXRDaGlsZEJ5TmFtZSgnMTInKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdDEyLm9wYWNpdHk9MDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MudHdlZW4oZmluZ2VyKS5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKGNjLm1vdmVCeSgxKnJhdGUsY2MudjIoMCw4MDApKSxjYy5jYWxsRnVuYygoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmluZ2VyLng9cG9zWDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbmdlci55PXBvc1krNzA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLGNjLmRlbGF5VGltZSgwLjIqcmF0ZSkpKS5zdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaE5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsKGU6Y2MuRXZlbnQuRXZlbnRUb3VjaCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRTY3JvbGxWaWV3Lm5vZGUuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmcxLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJnMi5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZzMuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmc0LmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHQxMi5vcGFjaXR5PTI1NTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwb3M9dGhpcy5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKGUuZ2V0TG9jYXRpb24oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0MTIuc2V0UG9zaXRpb24ocG9zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSx0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hOb2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX01PVkUsKGU6Y2MuRXZlbnQuRXZlbnRUb3VjaCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwb3M9dGhpcy5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKGUuZ2V0TG9jYXRpb24oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0MTIuc2V0UG9zaXRpb24ocG9zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hOb2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0NBTkNFTCwoZTpjYy5FdmVudC5FdmVudFRvdWNoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBvcz10aGlzLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIoZS5nZXRMb2NhdGlvbigpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHQxMi5nZXRCb3VuZGluZ0JveCgpLmNvbnRhaW5zKGJvc3NQb3MpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uVHV0b3JpYWxzQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFsbF9oZXJvLmdldChIZXJvX1R5cGUuRGVMdVlpKS5yZWxlYXNlU2tpbGwocG9zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRTY3JvbGxWaWV3Lm5vZGUuYWN0aXZlPXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmcxLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJnMi5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZzMuYWN0aXZlPXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmc0LmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbmdlci54PXBvc1g7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmluZ2VyLnk9cG9zWSs3MDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaW5nZXIuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy50d2VlbihmaW5nZXIpLnJlcGVhdEZvcmV2ZXIoY2Muc2VxdWVuY2UoY2MubW92ZUJ5KDEqcmF0ZSxjYy52MigwLDgwMCkpLGNjLmNhbGxGdW5jKCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbmdlci54PXBvc1g7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbmdlci55PXBvc1krNzA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksY2MuZGVsYXlUaW1lKDAuMipyYXRlKSkpLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdDEyLm9wYWNpdHk9MDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0MTIuc2V0UG9zaXRpb24ocG9zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSx0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hOb2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwoZTpjYy5FdmVudC5FdmVudFRvdWNoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBvcz10aGlzLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIoZS5nZXRMb2NhdGlvbigpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRTY3JvbGxWaWV3Lm5vZGUuYWN0aXZlPXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZzEuYWN0aXZlPXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZzIuYWN0aXZlPXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZzMuYWN0aXZlPXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZzQuYWN0aXZlPXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaW5nZXIueD1wb3NYO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmluZ2VyLnk9cG9zWSs3MDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbmdlci5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MudHdlZW4oZmluZ2VyKS5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKGNjLm1vdmVCeSgxKnJhdGUsY2MudjIoMCw4MDApKSxjYy5jYWxsRnVuYygoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbmdlci54PXBvc1g7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmluZ2VyLnk9cG9zWSs3MDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLGNjLmRlbGF5VGltZSgwLjIqcmF0ZSkpKS5zdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdDEyLm9wYWNpdHk9MDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHQxMi5zZXRQb3NpdGlvbihwb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAvL+inpuaRuOepv+mAj1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZih0b3VjaE5vZGUuX3RvdWNoTGlzdGVuZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIHRvdWNoTm9kZS5fdG91Y2hMaXN0ZW5lci5zZXRTd2FsbG93VG91Y2hlcyhmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDI1MTp7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZ20uY3VyX2dhbWVfc2NlbmU9PUdhbWVTY2VuZS5nYW1lKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/op6bmkbjnqb/pgI9cclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hDb250aW51ZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25UdXRvcmlhbHNDb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMjUyOntcclxuICAgICAgICAgICAgICAgICAgICBpZihnbS5jdXJfZ2FtZV9zY2VuZT09R2FtZVNjZW5lLmdhbWUpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+inpuaRuOepv+mAj1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaENvbnRpbnVlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vblR1dG9yaWFsc0NvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFsbF9oZXJvLmdldChIZXJvX1R5cGUuR29uZ0ppYW5TaG91KS5zaG93SGVybygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGVuZW15cz1Nb25zdGVyTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1vbnN0ZXJzRm9yTmVhcmVzdCgxLHRoaXMubm9kZS5nZXRQb3NpdGlvbigpLDEwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZW5lbXlzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5pyA5YmN55qE5pWM5Lq6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGVuZW15UG9zPWVuZW15c1swXS5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWxsX2hlcm8uZ2V0KEhlcm9fVHlwZS5Hb25nSmlhblNob3UpLnJlbGVhc2VTa2lsbChlbmVteVBvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSx0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDI1Mzp7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZ20uY3VyX2dhbWVfc2NlbmU9PUdhbWVTY2VuZS5nYW1lKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/op6bmkbjnqb/pgI9cclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hDb250aW51ZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25UdXRvcmlhbHNDb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMjYxOntcclxuICAgICAgICAgICAgICAgICAgICBpZihnbS5jdXJfZ2FtZV9zY2VuZT09R2FtZVNjZW5lLmdhbWUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0b3VjaENvbnRpbnVlLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbGV0IGZpbmdlcj1ub2RlLmdldENoaWxkQnlOYW1lKCdmaW5nZXInKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2MudHdlZW4oZmluZ2VyKS5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKGNjLm1vdmVCeSgwLjMsY2MudjIoMCwxMDApKSxjYy5tb3ZlQnkoMC4zLGNjLnYyKDAsLTEwMCkpKSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hDb250aW51ZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25UdXRvcmlhbHNDb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0b3VjaE5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCgpPT57ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLm9uVHV0b3JpYWxzQ29tcGxldGUoKTsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIH0sdGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v6Kem5pG456m/6YCPXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRvdWNoTm9kZS5fdG91Y2hMaXN0ZW5lcilcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hOb2RlLl90b3VjaExpc3RlbmVyLnNldFN3YWxsb3dUb3VjaGVzKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMjE5OntcclxuICAgICAgICAgICAgICAgICAgICBpZihnbS5jdXJfZ2FtZV9zY2VuZT09R2FtZVNjZW5lLmhvbWUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+W8uuWItuaYvuekuuS4u+mhtVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdhbWVfdG9faG9tZT1Hb19UeXBlLk1haW47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuanVtb0FuZFNob3dVaSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaE5vZGUuc2V0UG9zaXRpb24oYm9zc1Bvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3RvdWNoQmcnKS5zZXRQb3NpdGlvbihib3NzUG9zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hDb250aW51ZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaW5nZXI9bm9kZS5nZXRDaGlsZEJ5TmFtZSgnZmluZ2VyJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbmdlci5zZXRQb3NpdGlvbihib3NzUG9zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MudHdlZW4oZmluZ2VyKS5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKGNjLm1vdmVCeSgwLjMsY2MudjIoMCwxMDApKSxjYy5tb3ZlQnkoMC4zLGNjLnYyKDAsLTEwMCkpKSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hOb2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vblR1dG9yaWFsc0NvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sdGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v6Kem5pG456m/6YCPXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRvdWNoTm9kZS5fdG91Y2hMaXN0ZW5lcilcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hOb2RlLl90b3VjaExpc3RlbmVyLnNldFN3YWxsb3dUb3VjaGVzKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMzAxOntcclxuICAgICAgICAgICAgICAgICAgICBpZihnbS5jdXJfZ2FtZV9zY2VuZT09R2FtZVNjZW5lLmdhbWUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaENvbnRpbnVlLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpbmdlcj1ub2RlLmdldENoaWxkQnlOYW1lKCdmaW5nZXInKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MudHdlZW4oZmluZ2VyKS5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKGNjLm1vdmVCeSgwLjMsY2MudjIoMCwtMTAwKSksY2MubW92ZUJ5KDAuMyxjYy52MigwLDEwMCkpKSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hOb2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwoKT0+eyAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vblR1dG9yaWFsc0NvbXBsZXRlKCk7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+inpuaRuOepv+mAj1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0b3VjaE5vZGUuX3RvdWNoTGlzdGVuZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoTm9kZS5fdG91Y2hMaXN0ZW5lci5zZXRTd2FsbG93VG91Y2hlcyhmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDMwMjp7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZ20uY3VyX2dhbWVfc2NlbmU9PUdhbWVTY2VuZS5ob21lKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hOb2RlLnNldFBvc2l0aW9uKGJvc3NQb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLmdldENoaWxkQnlOYW1lKCd0b3VjaEJnJykuc2V0UG9zaXRpb24oYm9zc1Bvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoQ29udGludWUuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmluZ2VyPW5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2ZpbmdlcicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaW5nZXIuc2V0UG9zaXRpb24oYm9zc1Bvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLnR3ZWVuKGZpbmdlcikucmVwZWF0Rm9yZXZlcihjYy5zZXF1ZW5jZShjYy5tb3ZlQnkoMC4zLGNjLnYyKDAsMTAwKSksY2MubW92ZUJ5KDAuMyxjYy52MigwLC0xMDApKSkpLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoTm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb0xldmVsKEhlcm9fVHlwZS5TaG91V2FuZyk+PTEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25UdXRvcmlhbHNDb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc190dXRvcmFpbHNfc3RhdGU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sdGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v6Kem5pG456m/6YCPXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRvdWNoTm9kZS5fdG91Y2hMaXN0ZW5lcilcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hOb2RlLl90b3VjaExpc3RlbmVyLnNldFN3YWxsb3dUb3VjaGVzKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMjIxOntcclxuICAgICAgICAgICAgICAgICAgICBpZihnbS5jdXJfZ2FtZV9zY2VuZT09R2FtZVNjZW5lLmdhbWUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaENvbnRpbnVlLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpbmdlcj1ub2RlLmdldENoaWxkQnlOYW1lKCdmaW5nZXInKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MudHdlZW4oZmluZ2VyKS5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKGNjLm1vdmVCeSgwLjMsY2MudjIoMCwxMDApKSxjYy5tb3ZlQnkoMC4zLGNjLnYyKDAsLTEwMCkpKSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hOb2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwoKT0+eyAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vblR1dG9yaWFsc0NvbXBsZXRlKCk7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+inpuaRuOepv+mAj1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0b3VjaE5vZGUuX3RvdWNoTGlzdGVuZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoTm9kZS5fdG91Y2hMaXN0ZW5lci5zZXRTd2FsbG93VG91Y2hlcyhmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDIyMjp7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZ20uY3VyX2dhbWVfc2NlbmU9PUdhbWVTY2VuZS5ob21lKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hOb2RlLnNldFBvc2l0aW9uKGJvc3NQb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLmdldENoaWxkQnlOYW1lKCd0b3VjaEJnJykuc2V0UG9zaXRpb24oYm9zc1Bvcyk7ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaW5nZXI9bm9kZS5nZXRDaGlsZEJ5TmFtZSgnZmluZ2VyJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbmdlci5zZXRQb3NpdGlvbihib3NzUG9zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MudHdlZW4oZmluZ2VyKS5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKGNjLm1vdmVCeSgwLjMsY2MudjIoMCwxMDApKSxjYy5tb3ZlQnkoMC4zLGNjLnYyKDAsLTEwMCkpKSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hOb2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vblR1dG9yaWFsc0NvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNfdHV0b3JhaWxzX3N0YXRlPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+inpuaRuOepv+mAj1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0b3VjaE5vZGUuX3RvdWNoTGlzdGVuZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoTm9kZS5fdG91Y2hMaXN0ZW5lci5zZXRTd2FsbG93VG91Y2hlcyhmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hDb250aW51ZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdG91Y2hOb2RlLnNldENvbnRlbnRTaXplKG5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3RvdWNoQmcnKS4pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAyMjM6e1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGdtLmN1cl9nYW1lX3NjZW5lPT1HYW1lU2NlbmUuZ2FtZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoQ29udGludWUuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmluZ2VyPW5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2ZpbmdlcicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy50d2VlbihmaW5nZXIpLnJlcGVhdEZvcmV2ZXIoY2Muc2VxdWVuY2UoY2MubW92ZUJ5KDAuMyxjYy52MigwLDEwMCkpLGNjLm1vdmVCeSgwLjMsY2MudjIoMCwtMTAwKSkpKS5zdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaE5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCgpPT57ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uVHV0b3JpYWxzQ29tcGxldGUoKTsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sdGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v6Kem5pG456m/6YCPXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRvdWNoTm9kZS5fdG91Y2hMaXN0ZW5lcilcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hOb2RlLl90b3VjaExpc3RlbmVyLnNldFN3YWxsb3dUb3VjaGVzKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMzExOntcclxuICAgICAgICAgICAgICAgICAgICBpZihnbS5jdXJfZ2FtZV9zY2VuZT09R2FtZVNjZW5lLmdhbWUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaENvbnRpbnVlLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpbmdlcj1ub2RlLmdldENoaWxkQnlOYW1lKCdmaW5nZXInKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MudHdlZW4oZmluZ2VyKS5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKGNjLm1vdmVCeSgwLjMsY2MudjIoMCwtMTAwKSksY2MubW92ZUJ5KDAuMyxjYy52MigwLDEwMCkpKSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hOb2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwoKT0+eyAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vblR1dG9yaWFsc0NvbXBsZXRlKCk7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+inpuaRuOepv+mAj1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0b3VjaE5vZGUuX3RvdWNoTGlzdGVuZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoTm9kZS5fdG91Y2hMaXN0ZW5lci5zZXRTd2FsbG93VG91Y2hlcyhmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDMxMjp7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZ20uY3VyX2dhbWVfc2NlbmU9PUdhbWVTY2VuZS5ob21lKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hDb250aW51ZS5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoTm9kZS5zZXRQb3NpdGlvbihib3NzUG9zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5nZXRDaGlsZEJ5TmFtZSgndG91Y2hCZycpLnNldFBvc2l0aW9uKGJvc3NQb3MpOyAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmluZ2VyPW5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2ZpbmdlcicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaW5nZXIuc2V0UG9zaXRpb24oYm9zc1Bvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLnR3ZWVuKGZpbmdlcikucmVwZWF0Rm9yZXZlcihjYy5zZXF1ZW5jZShjYy5tb3ZlQnkoMC4zLGNjLnYyKDAsMTAwKSksY2MubW92ZUJ5KDAuMyxjYy52MigwLC0xMDApKSkpLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoTm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb1N0YWdlKEhlcm9fVHlwZS5QYW9TaG91KT49MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vblR1dG9yaWFsc0NvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzX3R1dG9yYWlsc19zdGF0ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZUZpbmlzaCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+inpuaRuOepv+mAj1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0b3VjaE5vZGUuX3RvdWNoTGlzdGVuZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoTm9kZS5fdG91Y2hMaXN0ZW5lci5zZXRTd2FsbG93VG91Y2hlcyhmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdG91Y2hDb250aW51ZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIHRoaXMub25UdXRvcmlhbHNDb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB9LHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMzMxOntcclxuICAgICAgICAgICAgICAgICAgICBpZihnbS5jdXJfZ2FtZV9zY2VuZT09R2FtZVNjZW5lLmdhbWUpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+inpuaRuOepv+mAj1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaENvbnRpbnVlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vblR1dG9yaWFsc0NvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sdGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAyMjU6e1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGdtLmN1cl9nYW1lX3NjZW5lPT1HYW1lU2NlbmUuZ2FtZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoQ29udGludWUuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmluZ2VyPW5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2ZpbmdlcicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy50d2VlbihmaW5nZXIpLnJlcGVhdEZvcmV2ZXIoY2Muc2VxdWVuY2UoY2MubW92ZUJ5KDAuMyxjYy52MigwLDEwMCkpLGNjLm1vdmVCeSgwLjMsY2MudjIoMCwtMTAwKSkpKS5zdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaE5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCgpPT57ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uVHV0b3JpYWxzQ29tcGxldGUoKTsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sdGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v6Kem5pG456m/6YCPXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRvdWNoTm9kZS5fdG91Y2hMaXN0ZW5lcilcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hOb2RlLl90b3VjaExpc3RlbmVyLnNldFN3YWxsb3dUb3VjaGVzKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMjI2OntcclxuICAgICAgICAgICAgICAgICAgICBpZihnbS5jdXJfZ2FtZV9zY2VuZT09R2FtZVNjZW5lLmhvbWUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaE5vZGUuc2V0UG9zaXRpb24oYm9zc1Bvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3RvdWNoQmcnKS5zZXRQb3NpdGlvbihib3NzUG9zKTsgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpbmdlcj1ub2RlLmdldENoaWxkQnlOYW1lKCdmaW5nZXInKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmluZ2VyLnNldFBvc2l0aW9uKGJvc3NQb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy50d2VlbihmaW5nZXIpLnJlcGVhdEZvcmV2ZXIoY2Muc2VxdWVuY2UoY2MubW92ZUJ5KDAuMyxjYy52MigwLDEwMCkpLGNjLm1vdmVCeSgwLjMsY2MudjIoMCwtMTAwKSkpKS5zdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaE5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uVHV0b3JpYWxzQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSx0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/op6bmkbjnqb/pgI9cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodG91Y2hOb2RlLl90b3VjaExpc3RlbmVyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3VjaE5vZGUuX3RvdWNoTGlzdGVuZXIuc2V0U3dhbGxvd1RvdWNoZXMoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoQ29udGludWUuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMjI3OntcclxuICAgICAgICAgICAgICAgICAgICBpZihnbS5jdXJfZ2FtZV9zY2VuZT09R2FtZVNjZW5lLmhvbWUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaE5vZGUuc2V0UG9zaXRpb24oYm9zc1Bvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3RvdWNoQmcnKS5zZXRQb3NpdGlvbihib3NzUG9zKTsgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpbmdlcj1ub2RlLmdldENoaWxkQnlOYW1lKCdmaW5nZXInKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmluZ2VyLnNldFBvc2l0aW9uKGJvc3NQb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy50d2VlbihmaW5nZXIpLnJlcGVhdEZvcmV2ZXIoY2Muc2VxdWVuY2UoY2MubW92ZUJ5KDAuMyxjYy52MigwLDEwMCkpLGNjLm1vdmVCeSgwLjMsY2MudjIoMCwtMTAwKSkpKS5zdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaE5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uVHV0b3JpYWxzQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlRmluaXNoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sdGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v6Kem5pG456m/6YCPXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRvdWNoTm9kZS5fdG91Y2hMaXN0ZW5lcilcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hOb2RlLl90b3VjaExpc3RlbmVyLnNldFN3YWxsb3dUb3VjaGVzKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaENvbnRpbnVlLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbiJdfQ==