"use strict";
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