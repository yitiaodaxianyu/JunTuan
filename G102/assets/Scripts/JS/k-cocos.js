/**
 * k-cocos 扩展库
 * 作者： kuokuo
 * 地址： https://github.com/KuoKuo666/k-cocos
 * QQ讨论群： 1085201157
 */

(function (global) {
    'use strict';

    var cc = global.cc;
    //cc.log('k-cocos v0.1');

    // 游戏速率
    cc.director._kSpeed = 1;
    var _originCalculateDeltaTime = cc.Director.prototype.calculateDeltaTime;
    cc.director.calculateDeltaTime = function (now) {
        _originCalculateDeltaTime.call(cc.director, now);
        cc.director._deltaTime *= cc.director._kSpeed;
    }

    cc.kSpeed = function (speed) {
        cc.director._kSpeed = speed;
    }

    cc.kGetSpeed = function() {
        return cc.director._kSpeed
    }

})(window)