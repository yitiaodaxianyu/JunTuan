
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/UI/SpeciesWarning.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '72351DSzbZJGLZy+8GZihSn', 'SpeciesWarning');
// Scripts/UI/SpeciesWarning.ts

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
var AudioConstants_1 = require("../Sound/AudioConstants");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SpeciesWarning = /** @class */ (function (_super) {
    __extends(SpeciesWarning, _super);
    function SpeciesWarning() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SpeciesWarning.prototype.init = function (enemy) {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.boss);
        this.loadEnemyDes(enemy);
    };
    SpeciesWarning.prototype.loadEnemyDes = function (enemy) {
        // cc.resources.load('enemy/enemy_des',cc.JsonAsset,(error: Error, assets:cc.JsonAsset)=>{
        //     if(error)
        //     {
        //         console.log(error);
        //         return;
        //     }
        //     let enemyDes=assets.json;
        // });
        this.setBossInfo(enemy);
    };
    SpeciesWarning.prototype.setBossInfo = function (enemy) {
        // let enemyTS=enemy.getComponent(Enemy);
        // //设置动画
        // let boss=new cc.Node();
        // boss.parent=this.node;
        // boss.setPosition(cc.v2(0,17));
        // let sk=boss.addComponent(sp.Skeleton);
        // let enemySK=enemy.getComponent(sp.Skeleton);
        // sk.skeletonData=enemySK.skeletonData;
        // if(enemyTS.enemy_type!=Enemy_Type.xunjieshu)
        // {
        //     sk.animation='animation';
        // }else
        // {
        //     sk.animation='daiji';
        // }
        // //设置简介
        // let lanType=LanguageManager.getInstance().getCurLanguageType();
        // let id=MonsterDataManager.getInstance().getMonsterIdByType(enemyTS.enemy_type);
        // let nameId=MonsterAttributeManager.getInstance().getMosterName_TextID(id);
        // let enemyName=LanguageManager.getInstance().getStrByTextId(nameId);
        // let name=this.node.getChildByName('name');
        // name.getComponent(cc.Label).string=enemyName;
        // let des=this.node.getChildByName('des');
        // let txId=MonsterAttributeManager.getInstance().getFeature(id);
        // let desId=MonsterFeatureManager.getInstance().getFeatureDiscribe_TextID(txId);
        // des.getComponent(cc.Label).string=LanguageManager.getInstance().getStrByTextId(desId);
    };
    SpeciesWarning.prototype.clickBtnContinue = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        GameManager_1.default.getInstance().cur_game_state = Constants_1.GameState.Game_Playing;
        this.node.removeFromParent();
        //添加一个Boss警告
        GameManager_1.default.getInstance().showBossWarning();
    };
    SpeciesWarning = __decorate([
        ccclass
    ], SpeciesWarning);
    return SpeciesWarning;
}(cc.Component));
exports.default = SpeciesWarning;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVUlcXFNwZWNpZXNXYXJuaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDBDQUF5QztBQUN6Qyw4Q0FBeUM7QUFFekMsMERBQXFEO0FBRS9DLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQTRDLGtDQUFZO0lBQXhEOztJQTJEQSxDQUFDO0lBekRHLDZCQUFJLEdBQUosVUFBTSxLQUFhO1FBQ2YscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLDJCQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkUsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQscUNBQVksR0FBWixVQUFhLEtBQWE7UUFFdEIsMEZBQTBGO1FBQzFGLGdCQUFnQjtRQUNoQixRQUFRO1FBQ1IsOEJBQThCO1FBQzlCLGtCQUFrQjtRQUNsQixRQUFRO1FBQ1IsZ0NBQWdDO1FBRWhDLE1BQU07UUFDTixJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFRCxvQ0FBVyxHQUFYLFVBQVksS0FBYTtRQUVyQix5Q0FBeUM7UUFDekMsU0FBUztRQUNULDBCQUEwQjtRQUMxQix5QkFBeUI7UUFDekIsaUNBQWlDO1FBQ2pDLHlDQUF5QztRQUN6QywrQ0FBK0M7UUFDL0Msd0NBQXdDO1FBQ3hDLCtDQUErQztRQUMvQyxJQUFJO1FBQ0osZ0NBQWdDO1FBQ2hDLFFBQVE7UUFDUixJQUFJO1FBQ0osNEJBQTRCO1FBQzVCLElBQUk7UUFDSixTQUFTO1FBQ1Qsa0VBQWtFO1FBQ2xFLGtGQUFrRjtRQUNsRiw2RUFBNkU7UUFDN0Usc0VBQXNFO1FBQ3RFLDZDQUE2QztRQUM3QyxnREFBZ0Q7UUFDaEQsMkNBQTJDO1FBQzNDLGlFQUFpRTtRQUNqRSxpRkFBaUY7UUFDakYseUZBQXlGO0lBQzdGLENBQUM7SUFFRCx5Q0FBZ0IsR0FBaEI7UUFFSSxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsMkJBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwRSxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsR0FBQyxxQkFBUyxDQUFDLFlBQVksQ0FBQztRQUNoRSxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDN0IsWUFBWTtRQUNaLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDaEQsQ0FBQztJQTFEZ0IsY0FBYztRQURsQyxPQUFPO09BQ2EsY0FBYyxDQTJEbEM7SUFBRCxxQkFBQztDQTNERCxBQTJEQyxDQTNEMkMsRUFBRSxDQUFDLFNBQVMsR0EyRHZEO2tCQTNEb0IsY0FBYyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdhbWVTdGF0ZSB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi9HYW1lTWFuYWdlclwiO1xyXG5cclxuaW1wb3J0IHsgU291bmRJbmRleCB9IGZyb20gXCIuLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTcGVjaWVzV2FybmluZyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgaW5pdCAoZW5lbXk6Y2MuTm9kZSkge1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5ib3NzKTtcclxuICAgICAgICB0aGlzLmxvYWRFbmVteURlcyhlbmVteSk7XHJcbiAgICB9XHJcblxyXG4gICAgbG9hZEVuZW15RGVzKGVuZW15OmNjLk5vZGUpXHJcbiAgICB7XHJcbiAgICAgICAgLy8gY2MucmVzb3VyY2VzLmxvYWQoJ2VuZW15L2VuZW15X2RlcycsY2MuSnNvbkFzc2V0LChlcnJvcjogRXJyb3IsIGFzc2V0czpjYy5Kc29uQXNzZXQpPT57XHJcbiAgICAgICAgLy8gICAgIGlmKGVycm9yKVxyXG4gICAgICAgIC8vICAgICB7XHJcbiAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgLy8gICAgICAgICByZXR1cm47XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyAgICAgbGV0IGVuZW15RGVzPWFzc2V0cy5qc29uO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAvLyB9KTtcclxuICAgICAgICB0aGlzLnNldEJvc3NJbmZvKGVuZW15KTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRCb3NzSW5mbyhlbmVteTpjYy5Ob2RlKVxyXG4gICAge1xyXG4gICAgICAgIC8vIGxldCBlbmVteVRTPWVuZW15LmdldENvbXBvbmVudChFbmVteSk7XHJcbiAgICAgICAgLy8gLy/orr7nva7liqjnlLtcclxuICAgICAgICAvLyBsZXQgYm9zcz1uZXcgY2MuTm9kZSgpO1xyXG4gICAgICAgIC8vIGJvc3MucGFyZW50PXRoaXMubm9kZTtcclxuICAgICAgICAvLyBib3NzLnNldFBvc2l0aW9uKGNjLnYyKDAsMTcpKTtcclxuICAgICAgICAvLyBsZXQgc2s9Ym9zcy5hZGRDb21wb25lbnQoc3AuU2tlbGV0b24pO1xyXG4gICAgICAgIC8vIGxldCBlbmVteVNLPWVuZW15LmdldENvbXBvbmVudChzcC5Ta2VsZXRvbik7XHJcbiAgICAgICAgLy8gc2suc2tlbGV0b25EYXRhPWVuZW15U0suc2tlbGV0b25EYXRhO1xyXG4gICAgICAgIC8vIGlmKGVuZW15VFMuZW5lbXlfdHlwZSE9RW5lbXlfVHlwZS54dW5qaWVzaHUpXHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgIC8vICAgICBzay5hbmltYXRpb249J2FuaW1hdGlvbic7XHJcbiAgICAgICAgLy8gfWVsc2VcclxuICAgICAgICAvLyB7XHJcbiAgICAgICAgLy8gICAgIHNrLmFuaW1hdGlvbj0nZGFpamknO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyAvL+iuvue9rueugOS7i1xyXG4gICAgICAgIC8vIGxldCBsYW5UeXBlPUxhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEN1ckxhbmd1YWdlVHlwZSgpO1xyXG4gICAgICAgIC8vIGxldCBpZD1Nb25zdGVyRGF0YU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNb25zdGVySWRCeVR5cGUoZW5lbXlUUy5lbmVteV90eXBlKTtcclxuICAgICAgICAvLyBsZXQgbmFtZUlkPU1vbnN0ZXJBdHRyaWJ1dGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TW9zdGVyTmFtZV9UZXh0SUQoaWQpO1xyXG4gICAgICAgIC8vIGxldCBlbmVteU5hbWU9TGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQobmFtZUlkKTtcclxuICAgICAgICAvLyBsZXQgbmFtZT10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ25hbWUnKTtcclxuICAgICAgICAvLyBuYW1lLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPWVuZW15TmFtZTtcclxuICAgICAgICAvLyBsZXQgZGVzPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnZGVzJyk7XHJcbiAgICAgICAgLy8gbGV0IHR4SWQ9TW9uc3RlckF0dHJpYnV0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGZWF0dXJlKGlkKTtcclxuICAgICAgICAvLyBsZXQgZGVzSWQ9TW9uc3RlckZlYXR1cmVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RmVhdHVyZURpc2NyaWJlX1RleHRJRCh0eElkKTtcclxuICAgICAgICAvLyBkZXMuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9TGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoZGVzSWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuQ29udGludWUoKVxyXG4gICAge1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zdGF0ZT1HYW1lU3RhdGUuR2FtZV9QbGF5aW5nOyAgICAgICAgXHJcbiAgICAgICAgdGhpcy5ub2RlLnJlbW92ZUZyb21QYXJlbnQoKTtcclxuICAgICAgICAvL+a3u+WKoOS4gOS4qkJvc3PorablkYpcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dCb3NzV2FybmluZygpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==