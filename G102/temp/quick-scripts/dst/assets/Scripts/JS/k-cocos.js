
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/JS/k-cocos.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1b2b4uxsANOWI8VXNJ5sgPB', 'k-cocos');
// Scripts/JS/k-cocos.js

"use strict";

/**
 * k-cocos 扩展库
 * 作者： kuokuo
 * 地址： https://github.com/KuoKuo666/k-cocos
 * QQ讨论群： 1085201157
 */
(function (global) {
  'use strict';

  var cc = global.cc; //cc.log('k-cocos v0.1');
  // 游戏速率

  cc.director._kSpeed = 1;
  var _originCalculateDeltaTime = cc.Director.prototype.calculateDeltaTime;

  cc.director.calculateDeltaTime = function (now) {
    _originCalculateDeltaTime.call(cc.director, now);

    cc.director._deltaTime *= cc.director._kSpeed;
  };

  cc.kSpeed = function (speed) {
    cc.director._kSpeed = speed;
  };

  cc.kGetSpeed = function () {
    return cc.director._kSpeed;
  };
})(window);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSlNcXGstY29jb3MuanMiXSwibmFtZXMiOlsiZ2xvYmFsIiwiY2MiLCJkaXJlY3RvciIsIl9rU3BlZWQiLCJfb3JpZ2luQ2FsY3VsYXRlRGVsdGFUaW1lIiwiRGlyZWN0b3IiLCJwcm90b3R5cGUiLCJjYWxjdWxhdGVEZWx0YVRpbWUiLCJub3ciLCJjYWxsIiwiX2RlbHRhVGltZSIsImtTcGVlZCIsInNwZWVkIiwia0dldFNwZWVkIiwid2luZG93Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLENBQUMsVUFBVUEsTUFBVixFQUFrQjtBQUNmOztBQUVBLE1BQUlDLEVBQUUsR0FBR0QsTUFBTSxDQUFDQyxFQUFoQixDQUhlLENBSWY7QUFFQTs7QUFDQUEsRUFBQUEsRUFBRSxDQUFDQyxRQUFILENBQVlDLE9BQVosR0FBc0IsQ0FBdEI7QUFDQSxNQUFJQyx5QkFBeUIsR0FBR0gsRUFBRSxDQUFDSSxRQUFILENBQVlDLFNBQVosQ0FBc0JDLGtCQUF0RDs7QUFDQU4sRUFBQUEsRUFBRSxDQUFDQyxRQUFILENBQVlLLGtCQUFaLEdBQWlDLFVBQVVDLEdBQVYsRUFBZTtBQUM1Q0osSUFBQUEseUJBQXlCLENBQUNLLElBQTFCLENBQStCUixFQUFFLENBQUNDLFFBQWxDLEVBQTRDTSxHQUE1Qzs7QUFDQVAsSUFBQUEsRUFBRSxDQUFDQyxRQUFILENBQVlRLFVBQVosSUFBMEJULEVBQUUsQ0FBQ0MsUUFBSCxDQUFZQyxPQUF0QztBQUNILEdBSEQ7O0FBS0FGLEVBQUFBLEVBQUUsQ0FBQ1UsTUFBSCxHQUFZLFVBQVVDLEtBQVYsRUFBaUI7QUFDekJYLElBQUFBLEVBQUUsQ0FBQ0MsUUFBSCxDQUFZQyxPQUFaLEdBQXNCUyxLQUF0QjtBQUNILEdBRkQ7O0FBSUFYLEVBQUFBLEVBQUUsQ0FBQ1ksU0FBSCxHQUFlLFlBQVc7QUFDdEIsV0FBT1osRUFBRSxDQUFDQyxRQUFILENBQVlDLE9BQW5CO0FBQ0gsR0FGRDtBQUlILENBdEJELEVBc0JHVyxNQXRCSCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIGstY29jb3Mg5omp5bGV5bqTXHJcbiAqIOS9nOiAhe+8miBrdW9rdW9cclxuICog5Zyw5Z2A77yaIGh0dHBzOi8vZ2l0aHViLmNvbS9LdW9LdW82NjYvay1jb2Nvc1xyXG4gKiBRUeiuqOiuuue+pO+8miAxMDg1MjAxMTU3XHJcbiAqL1xyXG5cclxuKGZ1bmN0aW9uIChnbG9iYWwpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICB2YXIgY2MgPSBnbG9iYWwuY2M7XHJcbiAgICAvL2NjLmxvZygnay1jb2NvcyB2MC4xJyk7XHJcblxyXG4gICAgLy8g5ri45oiP6YCf546HXHJcbiAgICBjYy5kaXJlY3Rvci5fa1NwZWVkID0gMTtcclxuICAgIHZhciBfb3JpZ2luQ2FsY3VsYXRlRGVsdGFUaW1lID0gY2MuRGlyZWN0b3IucHJvdG90eXBlLmNhbGN1bGF0ZURlbHRhVGltZTtcclxuICAgIGNjLmRpcmVjdG9yLmNhbGN1bGF0ZURlbHRhVGltZSA9IGZ1bmN0aW9uIChub3cpIHtcclxuICAgICAgICBfb3JpZ2luQ2FsY3VsYXRlRGVsdGFUaW1lLmNhbGwoY2MuZGlyZWN0b3IsIG5vdyk7XHJcbiAgICAgICAgY2MuZGlyZWN0b3IuX2RlbHRhVGltZSAqPSBjYy5kaXJlY3Rvci5fa1NwZWVkO1xyXG4gICAgfVxyXG5cclxuICAgIGNjLmtTcGVlZCA9IGZ1bmN0aW9uIChzcGVlZCkge1xyXG4gICAgICAgIGNjLmRpcmVjdG9yLl9rU3BlZWQgPSBzcGVlZDtcclxuICAgIH1cclxuXHJcbiAgICBjYy5rR2V0U3BlZWQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gY2MuZGlyZWN0b3IuX2tTcGVlZFxyXG4gICAgfVxyXG5cclxufSkod2luZG93KSJdfQ==