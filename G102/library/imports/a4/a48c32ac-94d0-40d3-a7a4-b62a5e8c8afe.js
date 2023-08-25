"use strict";
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