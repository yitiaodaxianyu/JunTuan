
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Tools/MyTool.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '41b98z0uUVN+YvIYrFZoj24', 'MyTool');
// Scripts/Tools/MyTool.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Digits = void 0;
var Digits;
(function (Digits) {
    Digits[Digits["ge"] = 1] = "ge";
    Digits[Digits["shi"] = 2] = "shi";
    Digits[Digits["bai"] = 3] = "bai";
    Digits[Digits["qian"] = 4] = "qian";
    Digits[Digits["wan"] = 5] = "wan";
    Digits[Digits["shiwan"] = 6] = "shiwan";
    Digits[Digits["baiwan"] = 7] = "baiwan";
    Digits[Digits["qianwan"] = 8] = "qianwan";
    Digits[Digits["yi"] = 9] = "yi";
})(Digits = exports.Digits || (exports.Digits = {}));
var MyTool = /** @class */ (function () {
    function MyTool() {
    }
    //根据数量和位数获得指定位数的数字,
    MyTool.getNumByWei = function (num, wei) {
        var weiNum = Math.pow(10, wei);
        var x = Math.floor(num / weiNum);
        //算出有多少
        var xx = num - x * weiNum;
        num = Math.floor(xx / Math.pow(10, wei - 1));
        return num;
    };
    //获取字符串中的数字
    MyTool.getNumByStr = function (str) {
        var numStr = str.replace(/[^0-9]/ig, "");
        var num = parseInt(numStr);
        return num;
    };
    MyTool.getDanwei = function (num) {
        var numStr = num + '';
        if (num >= 1e3 && num < 1e6) {
            numStr = (num / 1e3).toFixed(1) + 'K';
        }
        else if (num >= 1e6 && num < 1e9) {
            numStr = (num / 1e6).toFixed(1) + 'M';
        }
        else if (num >= 1e9 && num < 1e12) {
            numStr = (num / 1e9).toFixed(1) + 'G';
        }
        else if (num >= 1e12 && num < 1e15) {
            numStr = (num / 1e12).toFixed(1) + 'T';
        }
        return numStr;
    };
    MyTool.getCoinDanwei = function (num, fractionDigits) {
        if (fractionDigits === void 0) { fractionDigits = 0; }
        if (num < 1e4) {
            fractionDigits = 0;
        }
        var numStr = num.toFixed(fractionDigits);
        if (num >= 1e4 && num < 1e6) {
            numStr = (num / 1e3).toFixed(fractionDigits) + 'K';
        }
        else if (num >= 1e6 && num < 1e9) {
            numStr = (num / 1e6).toFixed(fractionDigits) + 'M';
        }
        else if (num >= 1e9 && num < 1e12) {
            numStr = (num / 1e9).toFixed(fractionDigits) + 'G';
        }
        else if (num >= 1e12 && num < 1e15) {
            numStr = (num / 1e12).toFixed(fractionDigits) + 'T';
        }
        return numStr;
    };
    MyTool.mynum_con = function (num) {
        var arr = ['K', 'M', 'B'];
        var mynum;
        var numnuim = Number(num);
        if (numnuim >= 1) {
            if (numnuim <= 10000) {
                return numnuim;
            }
            for (var i = 0; i < arr.length; i++) {
                if (num.length <= (i + 2) * 3) {
                    mynum = num.substring(0, num.length - ((i + 1) * 3)) + arr[i];
                    return mynum;
                }
            }
        }
        else {
            return numnuim;
        }
    };
    MyTool.mynum_con1 = function (num) {
        var arr = ['K', 'M', 'B'];
        var mynum;
        var numnuim = Number(num);
        if (numnuim >= 0) {
            if (numnuim <= 1000) {
                return numnuim;
            }
            for (var i = 0; i < arr.length; i++) {
                if (num.length <= (i + 2) * 3) {
                    mynum = num.substring(0, num.length - ((i + 1) * 3)) + arr[i];
                    return mynum;
                }
            }
        }
        else {
            numnuim *= -1;
            if (numnuim <= 1000) {
                return numnuim * -1;
            }
            for (var i = 0; i < arr.length; i++) {
                if (num.length <= (i + 2) * 3) {
                    mynum = num.substring(0, num.length - ((i + 1) * 3)) + arr[i];
                    return mynum;
                }
            }
            return numnuim * -1;
        }
    };
    //返回min到max直接的数,isMax等于true时，返回值可能包含max
    MyTool.randomRange = function (min, max, isMax) {
        if (isMax === void 0) { isMax = false; }
        var add = isMax ? 1 : 0;
        return Math.random() * (max - min + add) + min;
    };
    //返回min到max直接的整型数,isMax等于true时，返回值可能包含max
    MyTool.randomRangeInt = function (min, max, isMax) {
        if (isMax === void 0) { isMax = false; }
        // min=Math.floor(min);
        // max=Math.floor(max);
        var add = isMax ? 1 : 0;
        return Math.floor(Math.random() * (max - min + add)) + min;
    };
    /**
     *
     * @param lower 最小值
     * @param upper 最大值
     * @returns 随机数，取到最小值，取到最大值
     */
    MyTool.random = function (lower, upper) {
        return Math.floor(Math.random() * (upper - lower + 1)) + lower;
    };
    /**随机打乱一个数据 */
    MyTool.randomArray = function (arr) {
        //复制一份新的出来
        var copyArray = arr.slice();
        var newArray = new Array();
        var len = copyArray.length;
        for (var i = 0; i < len; i++) {
            var index = Math.floor(Math.random() * copyArray.length);
            newArray.push(copyArray[index]);
            copyArray.splice(index, 1);
        }
        return newArray;
    };
    /**获得一个随机索引，该索引不包括index
     * maxIndexNum:即数组长度
    */
    MyTool.getRandomIndex = function (arrLen, index) {
        if (arrLen >= 2) {
            var newIndex = this.randomRangeInt(0, arrLen);
            if (newIndex != index) {
                return newIndex;
            }
            else {
                this.getRandomIndex(arrLen, index);
            }
        }
        else {
            cc.error('数组太短了');
            return 0;
        }
    };
    /**
     随机抖屏效果
    @parm min:抖动偏移的最小值，一般设为为负数
    @parm max：抖动偏移的最大值，一般设为为正数
    @parm dt:抖动的时间间隔-单位秒
    @parm num:抖动的次数

    MyTool.randomSceneShake(-15,15,0.02,10);
    */
    MyTool.randomSceneShake = function (min, max, dt, num) {
        //找到最大波动值
        var a = Math.abs(min);
        var b = Math.abs(max);
        var maxNum = a >= b ? a : b;
        //找到主摄像机
        var cameraNode = cc.Camera.main.node;
        if (cameraNode) {
            cc.Camera.main.zoomRatio = 1 + maxNum / cc.winSize.width;
            var id_1 = setInterval(function () {
                cameraNode = cc.Camera.main.node;
                if (cameraNode) {
                    cameraNode.setPosition(cc.v2(MyTool.randomRangeInt(min, max, true), MyTool.randomRangeInt(min, max, true)));
                    num--;
                    if (num <= 0) {
                        clearInterval(id_1);
                        cameraNode.setPosition(cc.v2(0, 0));
                        cc.Camera.main.zoomRatio = 1;
                    }
                }
            }, dt * 1000);
        }
    };
    MyTool.randomSceneShakeBig = function () {
        this.randomSceneShake(-16, 16, 0.015, 16);
    };
    MyTool.randomSceneShakeSmall = function () {
        this.randomSceneShake(-5, 5, 0.02, 10);
    };
    MyTool.getBezierAct = function (startPos, endPos) {
        var cenPos = endPos.sub(startPos).div(4);
        var dis = cenPos.mag() * 2;
        var dir = (Math.atan2(cenPos.y, cenPos.x) + Math.PI * 2) % (Math.PI * 2);
        //两点的夹角
        var zhengfu = Math.random() > 0.5 ? 1 : -1;
        //+135,+45
        var dir1 = dir + Math.PI * 1 / 6 * zhengfu;
        //控制点
        var pos1 = cc.v2(startPos.x + Math.cos(dir1) * dis, startPos.y + Math.sin(dir1) * dis);
        //时间
        var act = dis / (Math.random() * 400 + 400);
        return cc.bezierTo(act, [pos1, pos1, endPos]);
    };
    MyTool.getHeartBezierAct = function (startPos, endPos) {
        var cenPos = endPos.sub(startPos).div(4);
        var dis = cenPos.mag() * 2;
        var dir = (Math.atan2(cenPos.y, cenPos.x) + Math.PI * 2) % (Math.PI * 2);
        //两点的夹角
        var zhengfu = startPos.x > 0 ? 1 : -1;
        //+135,+45
        var dir1 = dir + Math.PI * 1 / 10 * zhengfu;
        //控制点
        var pos1 = cc.v2(startPos.x + Math.cos(dir1) * dis, startPos.y + Math.sin(dir1) * dis + 600);
        //时间
        var act = 1.5;
        return cc.bezierTo(act, [pos1, pos1, endPos]);
    };
    /**
     * 获得时间格式的字符串: 2:08:32
     * @param sec 秒数
     * @returns
     */
    MyTool.getTimeStr = function (sec) {
        // let day=Math.floor(sec/(3600*24));
        // let dayStr='';
        // sec-=day*(3600*24);
        // if(day>0){
        //     dayStr=''+day;
        // }else{
        //     dayStr='';
        // }
        var shi = Math.floor((sec / 3600));
        sec -= shi * (3600);
        var shiStr = '0' + shi;
        if (shi >= 10) {
            shiStr = '' + shi;
        }
        var fen = Math.floor((sec) / 60);
        sec -= fen * (60);
        var fenStr = '0' + fen;
        if (fen >= 10) {
            fenStr = '' + fen;
        }
        var miao = sec % 60;
        var miaoStr = '0' + miao;
        if (miao >= 10) {
            miaoStr = '' + miao;
        }
        //let timeStr=day+"d:"+shiStr+":"+fenStr+":"+miaoStr;
        var timeStr = shiStr + ":" + fenStr + ":" + miaoStr;
        return timeStr;
    };
    /**节点或者子节点渐显 */
    MyTool.allFadeIn = function (node, callback) {
        var isCallback = false;
        var oldOpacity = node.opacity;
        node.opacity = 0;
        cc.tween(node).to(0.3, { opacity: oldOpacity }).call(function () {
            if (callback && !isCallback) {
                callback();
                isCallback = true;
            }
        }).start();
        // if(node.getComponent(cc.Sprite)==null){            
        //     let len=node.childrenCount;        
        //     for(let i=0; i<len; i++){
        //         let n=node.children[i];
        //         let oldOpacity=n.opacity;
        //         n.opacity=0;
        //         cc.tween(n).to(0.3,{opacity:oldOpacity}).call(()=>{
        //             if(callback&&!isCallback){
        //                 callback();
        //                 isCallback=true;
        //             }
        //         }).start();
        //     }
        // }else{
        //     let oldOpacity=node.opacity;
        //     node.opacity=0;
        //     cc.tween(node).to(0.3,{opacity:oldOpacity}).call(()=>{
        //         if(callback&&!isCallback){
        //             callback();
        //             isCallback=true;
        //         }
        //     }).start();
        // }
    };
    /**节点或者子节点渐隐 */
    MyTool.allFadeOut = function (node, callback) {
        var isCallback = false;
        cc.tween(node).to(0.3, { opacity: 0 }).call(function () {
            if (callback && !isCallback) {
                callback();
                isCallback = true;
            }
        }).start();
        // if(node.getComponent(cc.Sprite)==null){            
        //     let len=node.childrenCount;        
        //     for(let i=0; i<len; i++){
        //         let n=node.children[i];
        //         cc.tween(n).to(0.3,{opacity:0}).call(()=>{
        //             if(callback&&!isCallback){
        //                 callback();
        //                 isCallback=true;
        //             }
        //         }).start();
        //     }
        // }else{
        //     cc.tween(node).to(0.3,{opacity:0}).call(()=>{
        //         if(callback&&!isCallback){
        //             callback();
        //             isCallback=true;
        //         }
        //     }).start();
        // }
    };
    /**将弧度转成角度 */
    MyTool.radianToAngle = function (dir) {
        var angle = 180 * dir / Math.PI;
        return angle;
    };
    /**将角度转成弧度 */
    MyTool.angleToRadian = function (angle) {
        var dir = Math.PI * angle / 180;
        return dir;
    };
    /**
     *
     * @param year 年份
     * @param month 月份
     * @returns 返回year年month月的总天数
     */
    MyTool.getMonthDays = function (year, month) {
        var date = new Date(year, month, 0);
        var day = date.getDate();
        return day;
    };
    /**
     * 通过权重列表获得num个不重复的下标.num需要小于weightList的长度
     * @param weightList 权重列表
     * @param num 随机个数
     * @returns 权重列表的下标数组,数组的长度为num
     */
    //随机生成3个可以用的技能
    MyTool.getWeightIndexs = function (weightList, num) {
        var totalWeight = 0;
        weightList.forEach(function (element, key) {
            totalWeight += element;
        });
        var nums = new Array();
        var newList = weightList.slice();
        //根据权重随机.
        for (var i = 0; i < num; i++) {
            var randWeight = Math.random() * totalWeight;
            var curWeight = 0;
            for (var n = 0; n < newList.length; n++) {
                var useWeight = newList[n];
                curWeight += useWeight;
                if (randWeight < curWeight) {
                    totalWeight -= useWeight;
                    newList[n] = 0;
                    nums.push(n);
                    break;
                }
            }
        }
        return nums;
    };
    MyTool.numberFormat = function (num, n) {
        if (n === void 0) { n = 0; }
        if (!isNaN(num)) {
            var temp = num.toFixed(n);
            if (temp.indexOf('.') != -1) {
                var isZero = false;
                for (var i = temp.indexOf('.') + 1; i <= temp.indexOf('.') + n; i++) {
                    if (i < temp.length) {
                        if (temp[i] != '0') {
                            isZero = true;
                        }
                    }
                }
                if (isZero) {
                    return temp;
                }
                else {
                    return String(Number(temp));
                }
            }
            else {
                return temp;
            }
        }
    };
    /**从一段字符中解析包含的所有数字，只解析一次小数点 */
    MyTool.getNumberFromString = function (s) {
        var temp = s.match(/\d+(\.\d)?/g);
        var result = '';
        temp.forEach(function (v, k) {
            result += v;
        });
        return Number(result);
    };
    return MyTool;
}());
exports.default = MyTool;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVG9vbHNcXE15VG9vbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFZLE1BV1g7QUFYRCxXQUFZLE1BQU07SUFFZCwrQkFBSyxDQUFBO0lBQ0wsaUNBQU0sQ0FBQTtJQUNOLGlDQUFHLENBQUE7SUFDSCxtQ0FBSSxDQUFBO0lBQ0osaUNBQUcsQ0FBQTtJQUNILHVDQUFNLENBQUE7SUFDTix1Q0FBTSxDQUFBO0lBQ04seUNBQU8sQ0FBQTtJQUNQLCtCQUFFLENBQUE7QUFDTixDQUFDLEVBWFcsTUFBTSxHQUFOLGNBQU0sS0FBTixjQUFNLFFBV2pCO0FBRUQ7SUFBQTtJQThhQSxDQUFDO0lBNWFHLG1CQUFtQjtJQUNMLGtCQUFXLEdBQXpCLFVBQTBCLEdBQVUsRUFBQyxHQUFVO1FBRTNDLElBQUksTUFBTSxHQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxHQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdCLE9BQU87UUFDUCxJQUFJLEVBQUUsR0FBQyxHQUFHLEdBQUMsQ0FBQyxHQUFDLE1BQU0sQ0FBQztRQUNwQixHQUFHLEdBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUMsR0FBRyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEMsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBQ0QsV0FBVztJQUNHLGtCQUFXLEdBQXpCLFVBQTBCLEdBQVU7UUFFaEMsSUFBSSxNQUFNLEdBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUMsRUFBRSxDQUFDLENBQUM7UUFDdkMsSUFBSSxHQUFHLEdBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3pCLE9BQU8sR0FBRyxDQUFDO0lBQ2Ys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O2lCQUM5QjthQUNKO2lCQUFJO2dCQUNELE9BQU8sSUFBSSxDQUFBO2FBQ2Q7U0FDSjtJQUNMLENBQUM7SUFDRCw4QkFBOEI7SUFDaEIsMEJBQW1CLEdBQWpDLFVBQWtDLENBQVE7UUFDdEMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNsQyxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFDLENBQUMsRUFBQyxDQUFDO1lBQ2IsTUFBTSxJQUFJLENBQUMsQ0FBQztRQUNoQixDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFDTCxhQUFDO0FBQUQsQ0E5YUEsQUE4YUMsSUFBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBlbnVtIERpZ2l0c1xyXG57XHJcbiAgICBnZSA9MSxcclxuICAgIHNoaSA9MixcclxuICAgIGJhaSxcclxuICAgIHFpYW4sXHJcbiAgICB3YW4sXHJcbiAgICBzaGl3YW4sXHJcbiAgICBiYWl3YW4sXHJcbiAgICBxaWFud2FuLFxyXG4gICAgeWlcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTXlUb29sIHtcclxuXHJcbiAgICAvL+agueaNruaVsOmHj+WSjOS9jeaVsOiOt+W+l+aMh+WumuS9jeaVsOeahOaVsOWtlyxcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0TnVtQnlXZWkobnVtOm51bWJlcix3ZWk6RGlnaXRzKVxyXG4gICAge1xyXG4gICAgICAgIGxldCB3ZWlOdW09TWF0aC5wb3coMTAsd2VpKTsgICAgICAgIFxyXG4gICAgICAgIGxldCB4PU1hdGguZmxvb3IobnVtL3dlaU51bSk7XHJcbiAgICAgICAgLy/nrpflh7rmnInlpJrlsJFcclxuICAgICAgICBsZXQgeHg9bnVtLXgqd2VpTnVtO1xyXG4gICAgICAgIG51bT1NYXRoLmZsb29yKHh4L01hdGgucG93KDEwLHdlaS0xKSk7ICAgICAgICBcclxuICAgICAgICByZXR1cm4gbnVtO1xyXG4gICAgfVxyXG4gICAgLy/ojrflj5blrZfnrKbkuLLkuK3nmoTmlbDlrZdcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0TnVtQnlTdHIoc3RyOnN0cmluZyk6bnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IG51bVN0cj0gc3RyLnJlcGxhY2UoL1teMC05XS9pZyxcIlwiKTtcclxuICAgICAgICBsZXQgbnVtPXBhcnNlSW50KG51bVN0cik7XHJcbiAgICAgICAgcmV0dXJuIG51bTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldERhbndlaShudW06bnVtYmVyKTpzdHJpbmdcclxuICAgIHtcclxuICAgICAgICBsZXQgbnVtU3RyPW51bSsnJztcclxuICAgICAgICBpZihudW0+PTFlMyAmJiBudW08MWU2KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbnVtU3RyPShudW0vMWUzKS50b0ZpeGVkKDEpKydLJztcclxuICAgICAgICB9ZWxzZSBpZihudW0+PTFlNiAmJiBudW08MWU5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbnVtU3RyPShudW0vMWU2KS50b0ZpeGVkKDEpKydNJztcclxuICAgICAgICB9ZWxzZSBpZihudW0+PTFlOSAmJiBudW08MWUxMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG51bVN0cj0obnVtLzFlOSkudG9GaXhlZCgxKSsnRyc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYobnVtPj0xZTEyICYmIG51bTwxZTE1KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbnVtU3RyPShudW0vMWUxMikudG9GaXhlZCgxKSsnVCc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudW1TdHI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRDb2luRGFud2VpKG51bTpudW1iZXIsZnJhY3Rpb25EaWdpdHM6IG51bWJlcj0wKTpzdHJpbmdcclxuICAgIHtcclxuICAgICAgICBpZihudW08MWU0KXtcclxuICAgICAgICAgICAgZnJhY3Rpb25EaWdpdHM9MDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG51bVN0cj1udW0udG9GaXhlZChmcmFjdGlvbkRpZ2l0cyk7XHJcbiAgICAgICAgaWYobnVtPj0xZTQgJiYgbnVtPDFlNilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG51bVN0cj0obnVtLzFlMykudG9GaXhlZChmcmFjdGlvbkRpZ2l0cykrJ0snO1xyXG4gICAgICAgIH1lbHNlIGlmKG51bT49MWU2ICYmIG51bTwxZTkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBudW1TdHI9KG51bS8xZTYpLnRvRml4ZWQoZnJhY3Rpb25EaWdpdHMpKydNJztcclxuICAgICAgICB9ZWxzZSBpZihudW0+PTFlOSAmJiBudW08MWUxMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG51bVN0cj0obnVtLzFlOSkudG9GaXhlZChmcmFjdGlvbkRpZ2l0cykrJ0cnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKG51bT49MWUxMiAmJiBudW08MWUxNSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG51bVN0cj0obnVtLzFlMTIpLnRvRml4ZWQoZnJhY3Rpb25EaWdpdHMpKydUJztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bVN0cjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIG15bnVtX2NvbihudW06c3RyaW5nKXtcclxuICAgICAgICBsZXQgYXJyPVsnSycsJ00nLCdCJ11cclxuICAgICAgICBsZXQgbXludW1cclxuICAgICAgICBsZXQgbnVtbnVpbT1OdW1iZXIobnVtKVxyXG4gICAgICAgIGlmKG51bW51aW0+PTEpe1xyXG4gICAgICAgICAgICBpZihudW1udWltPD0xMDAwMCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVtbnVpbVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wO2k8YXJyLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICAgICAgaWYobnVtLmxlbmd0aDw9KGkrMikqMyl7XHJcbiAgICAgICAgICAgICAgICAgICAgbXludW09bnVtLnN1YnN0cmluZygwLG51bS5sZW5ndGgtKChpKzEpKjMpKSthcnJbaV1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbXludW1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gbnVtbnVpbVxyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgbXludW1fY29uMShudW06c3RyaW5nKXtcclxuICAgICAgICBsZXQgYXJyPVsnSycsJ00nLCdCJ11cclxuICAgICAgICBsZXQgbXludW1cclxuICAgICAgICBsZXQgbnVtbnVpbT1OdW1iZXIobnVtKVxyXG4gICAgICAgIGlmKG51bW51aW0+PTApe1xyXG4gICAgICAgICAgICBpZihudW1udWltPD0xMDAwKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudW1udWltXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7aTxhcnIubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgICAgICBpZihudW0ubGVuZ3RoPD0oaSsyKSozKXtcclxuICAgICAgICAgICAgICAgICAgICBteW51bT1udW0uc3Vic3RyaW5nKDAsbnVtLmxlbmd0aC0oKGkrMSkqMykpK2FycltpXVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBteW51bVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIG51bW51aW0gKj0gLTE7XHJcbiAgICAgICAgICAgIGlmKG51bW51aW08PTEwMDApe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bW51aW0gKiAtMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wO2k8YXJyLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICAgICAgaWYobnVtLmxlbmd0aDw9KGkrMikqMyl7XHJcbiAgICAgICAgICAgICAgICAgICAgbXludW09bnVtLnN1YnN0cmluZygwLG51bS5sZW5ndGgtKChpKzEpKjMpKSthcnJbaV1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbXludW1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbnVtbnVpbSotMTtcclxuICAgICAgICB9ICAgICAgICAgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8v6L+U5ZuebWlu5YiwbWF455u05o6l55qE5pWwLGlzTWF4562J5LqOdHJ1ZeaXtu+8jOi/lOWbnuWAvOWPr+iDveWMheWQq21heFxyXG4gICAgcHVibGljIHN0YXRpYyByYW5kb21SYW5nZShtaW46bnVtYmVyLG1heDpudW1iZXIsaXNNYXg6Ym9vbGVhbj1mYWxzZSk6bnVtYmVye1xyXG4gICAgICAgIGxldCBhZGQ9aXNNYXg/MTowO1xyXG4gICAgICAgIHJldHVybiBNYXRoLnJhbmRvbSgpKihtYXgtbWluK2FkZCkrbWluO1xyXG4gICAgfVxyXG4gICAgLy/ov5Tlm55taW7liLBtYXjnm7TmjqXnmoTmlbTlnovmlbAsaXNNYXjnrYnkuo50cnVl5pe277yM6L+U5Zue5YC85Y+v6IO95YyF5ZCrbWF4XHJcbiAgICBwdWJsaWMgc3RhdGljIHJhbmRvbVJhbmdlSW50KG1pbjpudW1iZXIsbWF4Om51bWJlcixpc01heDpib29sZWFuPWZhbHNlKTpudW1iZXJ7XHJcbiAgICAgICAgLy8gbWluPU1hdGguZmxvb3IobWluKTtcclxuICAgICAgICAvLyBtYXg9TWF0aC5mbG9vcihtYXgpO1xyXG4gICAgICAgIGxldCBhZGQ9aXNNYXg/MTowO1xyXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqKG1heC1taW4rYWRkKSkrbWluO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBsb3dlciDmnIDlsI/lgLxcclxuICAgICAqIEBwYXJhbSB1cHBlciDmnIDlpKflgLxcclxuICAgICAqIEByZXR1cm5zIOmaj+acuuaVsO+8jOWPluWIsOacgOWwj+WAvO+8jOWPluWIsOacgOWkp+WAvFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHJhbmRvbShsb3dlciwgdXBwZXIpIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKHVwcGVyIC0gbG93ZXIrMSkpICsgbG93ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq6ZqP5py65omT5Lmx5LiA5Liq5pWw5o2uICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHJhbmRvbUFycmF5KGFycjpBcnJheTxhbnk+KTpBcnJheTxhbnk+e1xyXG4gICAgICAgIC8v5aSN5Yi25LiA5Lu95paw55qE5Ye65p2lXHJcbiAgICAgICAgbGV0IGNvcHlBcnJheT1hcnIuc2xpY2UoKTtcclxuICAgICAgICBsZXQgbmV3QXJyYXk9bmV3IEFycmF5KCk7XHJcbiAgICAgICAgbGV0IGxlbj1jb3B5QXJyYXkubGVuZ3RoO1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPGxlbjsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IGluZGV4PU1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSpjb3B5QXJyYXkubGVuZ3RoKTtcclxuICAgICAgICAgICAgbmV3QXJyYXkucHVzaChjb3B5QXJyYXlbaW5kZXhdKTtcclxuICAgICAgICAgICAgY29weUFycmF5LnNwbGljZShpbmRleCwxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ld0FycmF5O1xyXG4gICAgfVxyXG4gICAgLyoq6I635b6X5LiA5Liq6ZqP5py657Si5byV77yM6K+l57Si5byV5LiN5YyF5ousaW5kZXggXHJcbiAgICAgKiBtYXhJbmRleE51bTrljbPmlbDnu4Tplb/luqZcclxuICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldFJhbmRvbUluZGV4KGFyckxlbjpudW1iZXIsaW5kZXg6bnVtYmVyKTpudW1iZXJ7XHJcbiAgICAgICAgaWYoYXJyTGVuPj0yKXtcclxuICAgICAgICAgICAgbGV0IG5ld0luZGV4PXRoaXMucmFuZG9tUmFuZ2VJbnQoMCxhcnJMZW4pO1xyXG4gICAgICAgICAgICBpZihuZXdJbmRleCE9aW5kZXgpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ld0luZGV4O1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0UmFuZG9tSW5kZXgoYXJyTGVuLGluZGV4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBjYy5lcnJvcign5pWw57uE5aSq55+t5LqGJyk7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgIOmaj+acuuaKluWxj+aViOaenFxyXG4gICAgQHBhcm0gbWluOuaKluWKqOWBj+enu+eahOacgOWwj+WAvO+8jOS4gOiIrOiuvuS4uuS4uui0n+aVsFxyXG4gICAgQHBhcm0gbWF477ya5oqW5Yqo5YGP56e755qE5pyA5aSn5YC877yM5LiA6Iis6K6+5Li65Li65q2j5pWwXHJcbiAgICBAcGFybSBkdDrmipbliqjnmoTml7bpl7Tpl7TpmpQt5Y2V5L2N56eSXHJcbiAgICBAcGFybSBudW065oqW5Yqo55qE5qyh5pWwXHJcblxyXG4gICAgTXlUb29sLnJhbmRvbVNjZW5lU2hha2UoLTE1LDE1LDAuMDIsMTApO1xyXG4gICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgcmFuZG9tU2NlbmVTaGFrZShtaW46bnVtYmVyLG1heDpudW1iZXIsZHQ6bnVtYmVyLG51bTpudW1iZXIpIHsgICBcclxuICAgICAgICAvL+aJvuWIsOacgOWkp+azouWKqOWAvFxyXG4gICAgICAgIGxldCBhPU1hdGguYWJzKG1pbik7XHJcbiAgICAgICAgbGV0IGI9TWF0aC5hYnMobWF4KTtcclxuICAgICAgICBsZXQgbWF4TnVtPWE+PWI/YTpiO1xyXG4gICAgICAgIC8v5om+5Yiw5Li75pGE5YOP5py6XHJcbiAgICAgICAgbGV0IGNhbWVyYU5vZGU9Y2MuQ2FtZXJhLm1haW4ubm9kZTtcclxuICAgICAgICBpZihjYW1lcmFOb2RlKXtcclxuICAgICAgICAgICAgY2MuQ2FtZXJhLm1haW4uem9vbVJhdGlvPTErbWF4TnVtL2NjLndpblNpemUud2lkdGg7XHJcbiAgICAgICAgICAgIGxldCBpZD1zZXRJbnRlcnZhbCgoKT0+e1xyXG4gICAgICAgICAgICAgICAgY2FtZXJhTm9kZT1jYy5DYW1lcmEubWFpbi5ub2RlO1xyXG4gICAgICAgICAgICAgICAgaWYoY2FtZXJhTm9kZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FtZXJhTm9kZS5zZXRQb3NpdGlvbihjYy52MihNeVRvb2wucmFuZG9tUmFuZ2VJbnQobWluLG1heCx0cnVlKSxcclxuICAgICAgICAgICAgICAgICAgICBNeVRvb2wucmFuZG9tUmFuZ2VJbnQobWluLG1heCx0cnVlKSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIG51bS0tO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKG51bTw9MClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYW1lcmFOb2RlLnNldFBvc2l0aW9uKGNjLnYyKDAsMCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5DYW1lcmEubWFpbi56b29tUmF0aW89MTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9LGR0KjEwMDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIHN0YXRpYyByYW5kb21TY2VuZVNoYWtlQmlnKCkge1xyXG4gICAgICAgIHRoaXMucmFuZG9tU2NlbmVTaGFrZSgtMTYsMTYsMC4wMTUsMTYpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgcmFuZG9tU2NlbmVTaGFrZVNtYWxsKCkge1xyXG4gICAgICAgIHRoaXMucmFuZG9tU2NlbmVTaGFrZSgtNSw1LDAuMDIsMTApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0QmV6aWVyQWN0KHN0YXJ0UG9zOmNjLlZlYzIsZW5kUG9zOmNjLlZlYzIpOmNjLkFjdGlvbkludGVydmFsXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGNlblBvcz1lbmRQb3Muc3ViKHN0YXJ0UG9zKS5kaXYoNCk7XHJcbiAgICAgICAgbGV0IGRpcz1jZW5Qb3MubWFnKCkqMjtcclxuICAgICAgICBsZXQgZGlyPShNYXRoLmF0YW4yKGNlblBvcy55LGNlblBvcy54KStNYXRoLlBJKjIpJShNYXRoLlBJKjIpO1xyXG4gICAgICAgIC8v5Lik54K555qE5aS56KeSXHJcbiAgICAgICAgbGV0IHpoZW5nZnU9TWF0aC5yYW5kb20oKT4wLjU/MTotMTtcclxuICAgICAgICAvLysxMzUsKzQ1XHJcbiAgICAgICAgbGV0IGRpcjE9ZGlyK01hdGguUEkqMS82KnpoZW5nZnU7XHJcbiAgICAgICAgLy/mjqfliLbngrlcclxuICAgICAgICBsZXQgcG9zMT1jYy52MihzdGFydFBvcy54K01hdGguY29zKGRpcjEpKmRpcyxzdGFydFBvcy55K01hdGguc2luKGRpcjEpKmRpcyk7XHJcbiAgICAgICAgLy/ml7bpl7RcclxuICAgICAgICBsZXQgYWN0PWRpcy8oTWF0aC5yYW5kb20oKSo0MDArNDAwKTtcclxuICAgICAgICByZXR1cm4gY2MuYmV6aWVyVG8oYWN0LFtwb3MxLHBvczEsZW5kUG9zXSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRIZWFydEJlemllckFjdChzdGFydFBvczpjYy5WZWMyLGVuZFBvczpjYy5WZWMyKTpjYy5BY3Rpb25JbnRlcnZhbFxyXG4gICAge1xyXG4gICAgICAgIGxldCBjZW5Qb3M9ZW5kUG9zLnN1YihzdGFydFBvcykuZGl2KDQpO1xyXG4gICAgICAgIGxldCBkaXM9Y2VuUG9zLm1hZygpKjI7XHJcbiAgICAgICAgbGV0IGRpcj0oTWF0aC5hdGFuMihjZW5Qb3MueSxjZW5Qb3MueCkrTWF0aC5QSSoyKSUoTWF0aC5QSSoyKTtcclxuICAgICAgICAvL+S4pOeCueeahOWkueinklxyXG4gICAgICAgIGxldCB6aGVuZ2Z1PXN0YXJ0UG9zLng+MD8xOi0xO1xyXG4gICAgICAgIC8vKzEzNSwrNDVcclxuICAgICAgICBsZXQgZGlyMT1kaXIrTWF0aC5QSSoxLzEwKnpoZW5nZnU7XHJcbiAgICAgICAgLy/mjqfliLbngrlcclxuICAgICAgICBsZXQgcG9zMT1jYy52MihzdGFydFBvcy54K01hdGguY29zKGRpcjEpKmRpcyxzdGFydFBvcy55K01hdGguc2luKGRpcjEpKmRpcys2MDApO1xyXG4gICAgICAgIC8v5pe26Ze0XHJcbiAgICAgICAgbGV0IGFjdD0xLjU7XHJcbiAgICAgICAgcmV0dXJuIGNjLmJlemllclRvKGFjdCxbcG9zMSxwb3MxLGVuZFBvc10pO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflvpfml7bpl7TmoLzlvI/nmoTlrZfnrKbkuLI6IDI6MDg6MzJcclxuICAgICAqIEBwYXJhbSBzZWMg56eS5pWwXHJcbiAgICAgKiBAcmV0dXJucyBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRUaW1lU3RyKHNlYzpudW1iZXIpOnN0cmluZ3tcclxuICAgICAgICAvLyBsZXQgZGF5PU1hdGguZmxvb3Ioc2VjLygzNjAwKjI0KSk7XHJcbiAgICAgICAgLy8gbGV0IGRheVN0cj0nJztcclxuICAgICAgICAvLyBzZWMtPWRheSooMzYwMCoyNCk7XHJcbiAgICAgICAgLy8gaWYoZGF5PjApe1xyXG4gICAgICAgIC8vICAgICBkYXlTdHI9JycrZGF5O1xyXG4gICAgICAgIC8vIH1lbHNle1xyXG4gICAgICAgIC8vICAgICBkYXlTdHI9Jyc7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIGxldCBzaGk9TWF0aC5mbG9vcigoc2VjLzM2MDApKTtcclxuICAgICAgICBzZWMtPXNoaSooMzYwMCk7XHJcbiAgICAgICAgbGV0IHNoaVN0cj0nMCcrc2hpO1xyXG4gICAgICAgIGlmKHNoaT49MTApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzaGlTdHI9Jycrc2hpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZmVuPU1hdGguZmxvb3IoKHNlYykvNjApO1xyXG4gICAgICAgIHNlYy09ZmVuKig2MCk7XHJcbiAgICAgICAgbGV0IGZlblN0cj0nMCcrZmVuO1xyXG4gICAgICAgIGlmKGZlbj49MTApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmZW5TdHI9JycrZmVuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbWlhbz1zZWMlNjA7XHJcbiAgICAgICAgbGV0IG1pYW9TdHI9JzAnK21pYW87XHJcbiAgICAgICAgaWYobWlhbz49MTApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBtaWFvU3RyPScnK21pYW87XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vbGV0IHRpbWVTdHI9ZGF5K1wiZDpcIitzaGlTdHIrXCI6XCIrZmVuU3RyK1wiOlwiK21pYW9TdHI7XHJcbiAgICAgICAgbGV0IHRpbWVTdHI9c2hpU3RyK1wiOlwiK2ZlblN0citcIjpcIittaWFvU3RyO1xyXG4gICAgICAgIHJldHVybiB0aW1lU3RyO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKiroioLngrnmiJbogIXlrZDoioLngrnmuJDmmL4gKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgYWxsRmFkZUluKG5vZGU6Y2MuTm9kZSxjYWxsYmFjaz86RnVuY3Rpb24pe1xyXG4gICAgICAgIGxldCBpc0NhbGxiYWNrPWZhbHNlO1xyXG4gICAgICAgIGxldCBvbGRPcGFjaXR5PW5vZGUub3BhY2l0eTtcclxuICAgICAgICBub2RlLm9wYWNpdHk9MDtcclxuICAgICAgICBjYy50d2Vlbihub2RlKS50bygwLjMse29wYWNpdHk6b2xkT3BhY2l0eX0pLmNhbGwoKCk9PntcclxuICAgICAgICAgICAgaWYoY2FsbGJhY2smJiFpc0NhbGxiYWNrKXtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgICAgICBpc0NhbGxiYWNrPXRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgICAgIC8vIGlmKG5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk9PW51bGwpeyAgICAgICAgICAgIFxyXG4gICAgICAgIC8vICAgICBsZXQgbGVuPW5vZGUuY2hpbGRyZW5Db3VudDsgICAgICAgIFxyXG4gICAgICAgIC8vICAgICBmb3IobGV0IGk9MDsgaTxsZW47IGkrKyl7XHJcbiAgICAgICAgLy8gICAgICAgICBsZXQgbj1ub2RlLmNoaWxkcmVuW2ldO1xyXG4gICAgICAgIC8vICAgICAgICAgbGV0IG9sZE9wYWNpdHk9bi5vcGFjaXR5O1xyXG4gICAgICAgIC8vICAgICAgICAgbi5vcGFjaXR5PTA7XHJcbiAgICAgICAgLy8gICAgICAgICBjYy50d2VlbihuKS50bygwLjMse29wYWNpdHk6b2xkT3BhY2l0eX0pLmNhbGwoKCk9PntcclxuICAgICAgICAvLyAgICAgICAgICAgICBpZihjYWxsYmFjayYmIWlzQ2FsbGJhY2spe1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBpc0NhbGxiYWNrPXRydWU7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIC8vICAgICAgICAgfSkuc3RhcnQoKTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH1lbHNle1xyXG4gICAgICAgIC8vICAgICBsZXQgb2xkT3BhY2l0eT1ub2RlLm9wYWNpdHk7XHJcbiAgICAgICAgLy8gICAgIG5vZGUub3BhY2l0eT0wO1xyXG4gICAgICAgIC8vICAgICBjYy50d2Vlbihub2RlKS50bygwLjMse29wYWNpdHk6b2xkT3BhY2l0eX0pLmNhbGwoKCk9PntcclxuICAgICAgICAvLyAgICAgICAgIGlmKGNhbGxiYWNrJiYhaXNDYWxsYmFjayl7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgY2FsbGJhY2soKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICBpc0NhbGxiYWNrPXRydWU7XHJcbiAgICAgICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgIH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKiroioLngrnmiJbogIXlrZDoioLngrnmuJDpmpAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgYWxsRmFkZU91dChub2RlOmNjLk5vZGUsY2FsbGJhY2s/OkZ1bmN0aW9uKXtcclxuICAgICAgICBsZXQgaXNDYWxsYmFjaz1mYWxzZTtcclxuICAgICAgICBjYy50d2Vlbihub2RlKS50bygwLjMse29wYWNpdHk6MH0pLmNhbGwoKCk9PntcclxuICAgICAgICAgICAgaWYoY2FsbGJhY2smJiFpc0NhbGxiYWNrKXtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgICAgICBpc0NhbGxiYWNrPXRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgICAgIC8vIGlmKG5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk9PW51bGwpeyAgICAgICAgICAgIFxyXG4gICAgICAgIC8vICAgICBsZXQgbGVuPW5vZGUuY2hpbGRyZW5Db3VudDsgICAgICAgIFxyXG4gICAgICAgIC8vICAgICBmb3IobGV0IGk9MDsgaTxsZW47IGkrKyl7XHJcbiAgICAgICAgLy8gICAgICAgICBsZXQgbj1ub2RlLmNoaWxkcmVuW2ldO1xyXG4gICAgICAgIC8vICAgICAgICAgY2MudHdlZW4obikudG8oMC4zLHtvcGFjaXR5OjB9KS5jYWxsKCgpPT57XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgaWYoY2FsbGJhY2smJiFpc0NhbGxiYWNrKXtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgaXNDYWxsYmFjaz10cnVlO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAvLyAgICAgICAgIH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9ZWxzZXtcclxuICAgICAgICAvLyAgICAgY2MudHdlZW4obm9kZSkudG8oMC4zLHtvcGFjaXR5OjB9KS5jYWxsKCgpPT57XHJcbiAgICAgICAgLy8gICAgICAgICBpZihjYWxsYmFjayYmIWlzQ2FsbGJhY2spe1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgaXNDYWxsYmFjaz10cnVlO1xyXG4gICAgICAgIC8vICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICB9KS5zdGFydCgpO1xyXG4gICAgICAgIC8vIH1cclxuICAgIH1cclxuXHJcbiAgICAvKirlsIblvKfluqbovazmiJDop5LluqYgKi9cclxuICAgIHN0YXRpYyByYWRpYW5Ub0FuZ2xlKGRpcjpudW1iZXIpOm51bWJlciB7XHJcbiAgICAgICAgbGV0IGFuZ2xlPTE4MCpkaXIvTWF0aC5QSTtcclxuICAgICAgICByZXR1cm4gYW5nbGU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5bCG6KeS5bqm6L2s5oiQ5byn5bqmICovXHJcbiAgICBzdGF0aWMgYW5nbGVUb1JhZGlhbihhbmdsZTpudW1iZXIpOm51bWJlciB7XHJcbiAgICAgICAgbGV0IGRpcj1NYXRoLlBJKmFuZ2xlLzE4MDtcclxuICAgICAgICByZXR1cm4gZGlyO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB5ZWFyIOW5tOS7vVxyXG4gICAgICogQHBhcmFtIG1vbnRoIOaciOS7vVxyXG4gICAgICogQHJldHVybnMg6L+U5ZueeWVhcuW5tG1vbnRo5pyI55qE5oC75aSp5pWwXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBnZXRNb250aERheXMoeWVhcjpudW1iZXIsbW9udGgpOm51bWJlcntcclxuICAgICAgICBsZXQgZGF0ZT1uZXcgRGF0ZSh5ZWFyLG1vbnRoLDApO1xyXG4gICAgICAgIGxldCBkYXk9ZGF0ZS5nZXREYXRlKCk7XHJcbiAgICAgICAgcmV0dXJuIGRheTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog6YCa6L+H5p2D6YeN5YiX6KGo6I635b6XbnVt5Liq5LiN6YeN5aSN55qE5LiL5qCHLm51bemcgOimgeWwj+S6jndlaWdodExpc3TnmoTplb/luqZcclxuICAgICAqIEBwYXJhbSB3ZWlnaHRMaXN0IOadg+mHjeWIl+ihqFxyXG4gICAgICogQHBhcmFtIG51bSDpmo/mnLrkuKrmlbBcclxuICAgICAqIEByZXR1cm5zIOadg+mHjeWIl+ihqOeahOS4i+agh+aVsOe7hCzmlbDnu4TnmoTplb/luqbkuLpudW1cclxuICAgICAqL1xyXG4gICAgLy/pmo/mnLrnlJ/miJAz5Liq5Y+v5Lul55So55qE5oqA6IO9XHJcbiAgICBzdGF0aWMgZ2V0V2VpZ2h0SW5kZXhzKHdlaWdodExpc3Q6bnVtYmVyW10sbnVtOm51bWJlcik6bnVtYmVyW117XHJcbiAgICAgICAgbGV0IHRvdGFsV2VpZ2h0PTA7XHJcbiAgICAgICAgd2VpZ2h0TGlzdC5mb3JFYWNoKChlbGVtZW50LGtleSk9PiB7ICAgICAgICAgICBcclxuICAgICAgICAgICAgdG90YWxXZWlnaHQrPWVsZW1lbnQ7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbGV0IG51bXM9bmV3IEFycmF5KCk7XHJcbiAgICAgICAgbGV0IG5ld0xpc3Q9d2VpZ2h0TGlzdC5zbGljZSgpO1xyXG4gICAgICAgIC8v5qC55o2u5p2D6YeN6ZqP5py6LlxyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPG51bTsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IHJhbmRXZWlnaHQ9TWF0aC5yYW5kb20oKSp0b3RhbFdlaWdodDtcclxuICAgICAgICAgICAgbGV0IGN1cldlaWdodD0wO1xyXG4gICAgICAgICAgICBmb3IobGV0IG49MDsgbjxuZXdMaXN0Lmxlbmd0aDsgbisrKXtcclxuICAgICAgICAgICAgICAgIGxldCB1c2VXZWlnaHQ9bmV3TGlzdFtuXTtcclxuICAgICAgICAgICAgICAgIGN1cldlaWdodCs9dXNlV2VpZ2h0O1xyXG4gICAgICAgICAgICAgICAgaWYocmFuZFdlaWdodDxjdXJXZWlnaHQpeyAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdG90YWxXZWlnaHQtPXVzZVdlaWdodDtcclxuICAgICAgICAgICAgICAgICAgICBuZXdMaXN0W25dPTA7XHJcbiAgICAgICAgICAgICAgICAgICAgbnVtcy5wdXNoKG4pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudW1zO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgbnVtYmVyRm9ybWF0KG51bTpudW1iZXIsbjpudW1iZXIgPSAwKXtcclxuICAgICAgICBpZighaXNOYU4obnVtKSl7XHJcbiAgICAgICAgICAgIGxldCB0ZW1wID0gbnVtLnRvRml4ZWQobik7XHJcbiAgICAgICAgICAgIGlmKHRlbXAuaW5kZXhPZignLicpICE9IC0xKXtcclxuICAgICAgICAgICAgICAgIGxldCBpc1plcm8gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IHRlbXAuaW5kZXhPZignLicpICsgMTtpIDw9IHRlbXAuaW5kZXhPZignLicpK247aSsrKXtcclxuICAgICAgICAgICAgICAgICAgICBpZihpPHRlbXAubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodGVtcFtpXSAhPSAnMCcpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNaZXJvID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYoaXNaZXJvKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGVtcFxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFN0cmluZyhOdW1iZXIodGVtcCkpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRlbXBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKuS7juS4gOauteWtl+espuS4reino+aekOWMheWQq+eahOaJgOacieaVsOWtl++8jOWPquino+aekOS4gOasoeWwj+aVsOeCuSAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXROdW1iZXJGcm9tU3RyaW5nKHM6c3RyaW5nKTpudW1iZXJ7XHJcbiAgICAgICAgbGV0IHRlbXAgPSBzLm1hdGNoKC9cXGQrKFxcLlxcZCk/L2cpO1xyXG4gICAgICAgIGxldCByZXN1bHQgPSAnJztcclxuICAgICAgICB0ZW1wLmZvckVhY2goKHYsayk9PntcclxuICAgICAgICAgICAgcmVzdWx0ICs9IHY7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIE51bWJlcihyZXN1bHQpO1xyXG4gICAgfVxyXG59XHJcblxyXG4iXX0=