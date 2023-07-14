const {ccclass, property} = cc._decorator;

/**
 * Predefined variables
 * Name = NewComponent
 * DateTime = Thu Dec 23 2021 14:07:24 GMT+0800 (中国标准时间)
 * Author = ZQYZ
 * FileBasename = NewComponent.ts
 * FileBasenameNoExtension = NewComponent
 * URL = db://assets/script/WZ/NewComponent.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */
 @ccclass
 export default class PublicMethods extends cc.Component {

        public static timeconversions(currenttime){//时间转换(把秒换算成分和秒(比如300秒转换成05:00))
            let currenttimeint=currenttime;
            let day=currenttimeint/24/3600
            day=Math.floor(day)
            let hour=currenttimeint/3600%24;
            hour=Math.floor(hour)
            let minutes=(currenttimeint%3600)/60;
            let seconds=currenttimeint%60;
            minutes=Math.floor(minutes)


            let daystr
            if(day<10){
                daystr='0'+day;
            }
            else{
                daystr=day;
            }

            let hourstr
            if(hour<10){
                hourstr='0'+hour;
            }
            else{
                hourstr=hour;
            }

            let minutesstr;
            if(minutes<10){
                minutesstr='0'+minutes;
            }
            else{
                minutesstr=minutes;
            }
            let secondsstr;
            if(seconds<10){
                secondsstr='0'+seconds;
            }
            else{
                secondsstr=seconds;
            }
        
            return hourstr+':'+minutesstr+':'+secondsstr;
        }
        public static timeconversion(currenttime){//时间转换(把秒换算成分和秒(比如300秒转换成05:00))
            let currenttimeint=currenttime;
            let day=currenttimeint/24/3600
            day=Math.floor(day)
            let hour=currenttimeint/3600%24;
            hour=Math.floor(hour)
            let minutes=(currenttimeint%3600)/60;
            let seconds=currenttimeint%60;
            minutes=Math.floor(minutes)


            let daystr
            if(day<10){
                daystr='0'+day;
            }
            else{
                daystr=day;
            }

            let hourstr
            if(hour<10){
                hourstr='0'+hour;
            }
            else{
                hourstr=hour;
            }

            let minutesstr;
            if(minutes<10){
                minutesstr='0'+minutes;
            }
            else{
                minutesstr=minutes;
            }
            let secondsstr;
            if(seconds<10){
                secondsstr='0'+seconds;
            }
            else{
                secondsstr=seconds;
            }
           
            return daystr+':'+hourstr+':'+minutesstr+':'+secondsstr;
        }
        //保存当前时间
        public static setCurrentTime(){//保存当前时间(单位秒)
            PublicMethods.setValueInLocal('LastTime',PublicMethods.getCurrentLocalTime());
        }
        public static getLastTime(){//得到上一次保存的时间(单位秒)
            let time=PublicMethods.getValueWithLocal('LastTime',PublicMethods.getCurrentLocalTime());
            return Number(time);
        }
        public static getCurrentLocalTime(){//得到本地时间并且转换成秒
            let a = Date.now();
            let b=a/1000;
            return b;
        }
        /////////////////
        ///////存储本地数据
        public static setValueInLocal(key, value) {//数据存储到本地
            try {
                cc.sys.localStorage.setItem(key, String(value));
            }
            catch (err) {
                console.log('---------------------- 卧槽，存文件的时候炸裂了！')
            }
        }
        //读取本地数据
        public static getValueWithLocal(key, defaultValue) {
            var value = cc.sys.localStorage.getItem(key);
            if (!value) {
                return defaultValue;
            }
            return value;
        }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.3/manual/zh/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.3/manual/zh/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.3/manual/zh/scripting/life-cycle-callbacks.html
 */
