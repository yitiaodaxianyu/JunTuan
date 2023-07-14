export enum Digits
{
    ge =1,
    shi =2,
    bai,
    qian,
    wan,
    shiwan,
    baiwan,
    qianwan,
    yi
}

export default class MyTool {

    //根据数量和位数获得指定位数的数字,
    public static getNumByWei(num:number,wei:Digits)
    {
        let weiNum=Math.pow(10,wei);        
        let x=Math.floor(num/weiNum);
        //算出有多少
        let xx=num-x*weiNum;
        num=Math.floor(xx/Math.pow(10,wei-1));        
        return num;
    }
    //获取字符串中的数字
    public static getNumByStr(str:string):number
    {
        let numStr= str.replace(/[^0-9]/ig,"");
        let num=parseInt(numStr);
        return num;
    }

    public static getDanwei(num:number):string
    {
        let numStr=num+'';
        if(num>=1e3 && num<1e6)
        {
            numStr=(num/1e3).toFixed(1)+'K';
        }else if(num>=1e6 && num<1e9)
        {
            numStr=(num/1e6).toFixed(1)+'M';
        }else if(num>=1e9 && num<1e12)
        {
            numStr=(num/1e9).toFixed(1)+'G';
        }
        else if(num>=1e12 && num<1e15)
        {
            numStr=(num/1e12).toFixed(1)+'T';
        }
        return numStr;
    }

    public static getCoinDanwei(num:number,fractionDigits: number=0):string
    {
        if(num<1e4){
            fractionDigits=0;
        }
        let numStr=num.toFixed(fractionDigits);
        if(num>=1e4 && num<1e6)
        {
            numStr=(num/1e3).toFixed(fractionDigits)+'K';
        }else if(num>=1e6 && num<1e9)
        {
            numStr=(num/1e6).toFixed(fractionDigits)+'M';
        }else if(num>=1e9 && num<1e12)
        {
            numStr=(num/1e9).toFixed(fractionDigits)+'G';
        }
        else if(num>=1e12 && num<1e15)
        {
            numStr=(num/1e12).toFixed(fractionDigits)+'T';
        }
        return numStr;
    }

    public static mynum_con(num:string){
        let arr=['K','M','B']
        let mynum
        let numnuim=Number(num)
        if(numnuim>=1){
            if(numnuim<=10000){
                return numnuim
            }
            for(let i=0;i<arr.length;i++){
                if(num.length<=(i+2)*3){
                    mynum=num.substring(0,num.length-((i+1)*3))+arr[i]
                    return mynum
                }
            }
        }else{
            return numnuim
            }                
    }

    public static mynum_con1(num:string){
        let arr=['K','M','B']
        let mynum
        let numnuim=Number(num)
        if(numnuim>=0){
            if(numnuim<=1000){
                return numnuim
            }
            for(let i=0;i<arr.length;i++){
                if(num.length<=(i+2)*3){
                    mynum=num.substring(0,num.length-((i+1)*3))+arr[i]
                    return mynum
                }
            }
        }else{
            numnuim *= -1;
            if(numnuim<=1000){
                return numnuim * -1
            }
            for(let i=0;i<arr.length;i++){
                if(num.length<=(i+2)*3){
                    mynum=num.substring(0,num.length-((i+1)*3))+arr[i]
                    return mynum
                }
            }
            return numnuim*-1;
        }                
    }

    //返回min到max直接的数,isMax等于true时，返回值可能包含max
    public static randomRange(min:number,max:number,isMax:boolean=false):number{
        let add=isMax?1:0;
        return Math.random()*(max-min+add)+min;
    }
    //返回min到max直接的整型数,isMax等于true时，返回值可能包含max
    public static randomRangeInt(min:number,max:number,isMax:boolean=false):number{
        // min=Math.floor(min);
        // max=Math.floor(max);
        let add=isMax?1:0;
        return Math.floor(Math.random()*(max-min+add))+min;
    }
    /**
     * 
     * @param lower 最小值
     * @param upper 最大值
     * @returns 随机数，取到最小值，取到最大值
     */
    public static random(lower, upper) {
        return Math.floor(Math.random() * (upper - lower+1)) + lower;
    }

    /**随机打乱一个数据 */
    public static randomArray(arr:Array<any>):Array<any>{
        //复制一份新的出来
        let copyArray=arr.slice();
        let newArray=new Array();
        let len=copyArray.length;
        for(let i=0; i<len; i++){
            let index=Math.floor(Math.random()*copyArray.length);
            newArray.push(copyArray[index]);
            copyArray.splice(index,1);
        }
        return newArray;
    }
    /**获得一个随机索引，该索引不包括index 
     * maxIndexNum:即数组长度
    */
    public static getRandomIndex(arrLen:number,index:number):number{
        if(arrLen>=2){
            let newIndex=this.randomRangeInt(0,arrLen);
            if(newIndex!=index){
                return newIndex;
            }else{
                this.getRandomIndex(arrLen,index);
            }
        }else{
            cc.error('数组太短了');
            return 0;
        }
    }
    /**
     随机抖屏效果
    @parm min:抖动偏移的最小值，一般设为为负数
    @parm max：抖动偏移的最大值，一般设为为正数
    @parm dt:抖动的时间间隔-单位秒
    @parm num:抖动的次数

    MyTool.randomSceneShake(-15,15,0.02,10);
    */
    public static randomSceneShake(min:number,max:number,dt:number,num:number) {   
        //找到最大波动值
        let a=Math.abs(min);
        let b=Math.abs(max);
        let maxNum=a>=b?a:b;
        //找到主摄像机
        let cameraNode=cc.Camera.main.node;
        if(cameraNode){
            cc.Camera.main.zoomRatio=1+maxNum/cc.winSize.width;
            let id=setInterval(()=>{
                cameraNode=cc.Camera.main.node;
                if(cameraNode){
                    cameraNode.setPosition(cc.v2(MyTool.randomRangeInt(min,max,true),
                    MyTool.randomRangeInt(min,max,true)));
                    num--;
                    if(num<=0)
                    {
                        clearInterval(id);
                        cameraNode.setPosition(cc.v2(0,0));
                        cc.Camera.main.zoomRatio=1;
                    }
                }                
            },dt*1000);
        }
        
    }
    
    public static randomSceneShakeBig() {
        this.randomSceneShake(-16,16,0.015,16);
    }

    public static randomSceneShakeSmall() {
        this.randomSceneShake(-5,5,0.02,10);
    }

    public static getBezierAct(startPos:cc.Vec2,endPos:cc.Vec2):cc.ActionInterval
    {
        let cenPos=endPos.sub(startPos).div(4);
        let dis=cenPos.mag()*2;
        let dir=(Math.atan2(cenPos.y,cenPos.x)+Math.PI*2)%(Math.PI*2);
        //两点的夹角
        let zhengfu=Math.random()>0.5?1:-1;
        //+135,+45
        let dir1=dir+Math.PI*1/6*zhengfu;
        //控制点
        let pos1=cc.v2(startPos.x+Math.cos(dir1)*dis,startPos.y+Math.sin(dir1)*dis);
        //时间
        let act=dis/(Math.random()*400+400);
        return cc.bezierTo(act,[pos1,pos1,endPos]);
    }

    public static getHeartBezierAct(startPos:cc.Vec2,endPos:cc.Vec2):cc.ActionInterval
    {
        let cenPos=endPos.sub(startPos).div(4);
        let dis=cenPos.mag()*2;
        let dir=(Math.atan2(cenPos.y,cenPos.x)+Math.PI*2)%(Math.PI*2);
        //两点的夹角
        let zhengfu=startPos.x>0?1:-1;
        //+135,+45
        let dir1=dir+Math.PI*1/10*zhengfu;
        //控制点
        let pos1=cc.v2(startPos.x+Math.cos(dir1)*dis,startPos.y+Math.sin(dir1)*dis+600);
        //时间
        let act=1.5;
        return cc.bezierTo(act,[pos1,pos1,endPos]);
    }
    /**
     * 获得时间格式的字符串: 2:08:32
     * @param sec 秒数
     * @returns 
     */
    public static getTimeStr(sec:number):string{
        // let day=Math.floor(sec/(3600*24));
        // let dayStr='';
        // sec-=day*(3600*24);
        // if(day>0){
        //     dayStr=''+day;
        // }else{
        //     dayStr='';
        // }
        let shi=Math.floor((sec/3600));
        sec-=shi*(3600);
        let shiStr='0'+shi;
        if(shi>=10)
        {
            shiStr=''+shi;
        }
        let fen=Math.floor((sec)/60);
        sec-=fen*(60);
        let fenStr='0'+fen;
        if(fen>=10)
        {
            fenStr=''+fen;
        }
        let miao=sec%60;
        let miaoStr='0'+miao;
        if(miao>=10)
        {
            miaoStr=''+miao;
        }
        
        //let timeStr=day+"d:"+shiStr+":"+fenStr+":"+miaoStr;
        let timeStr=shiStr+":"+fenStr+":"+miaoStr;
        return timeStr;
    }
    
    /**节点或者子节点渐显 */
    public static allFadeIn(node:cc.Node,callback?:Function){
        let isCallback=false;
        let oldOpacity=node.opacity;
        node.opacity=0;
        cc.tween(node).to(0.3,{opacity:oldOpacity}).call(()=>{
            if(callback&&!isCallback){
                callback();
                isCallback=true;
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
    }
    
    /**节点或者子节点渐隐 */
    public static allFadeOut(node:cc.Node,callback?:Function){
        let isCallback=false;
        cc.tween(node).to(0.3,{opacity:0}).call(()=>{
            if(callback&&!isCallback){
                callback();
                isCallback=true;
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
    }

    /**将弧度转成角度 */
    static radianToAngle(dir:number):number {
        let angle=180*dir/Math.PI;
        return angle;
    }

    /**将角度转成弧度 */
    static angleToRadian(angle:number):number {
        let dir=Math.PI*angle/180;
        return dir;
    }
    /**
     * 
     * @param year 年份
     * @param month 月份
     * @returns 返回year年month月的总天数
     */
    static getMonthDays(year:number,month):number{
        let date=new Date(year,month,0);
        let day=date.getDate();
        return day;
    }
    /**
     * 通过权重列表获得num个不重复的下标.num需要小于weightList的长度
     * @param weightList 权重列表
     * @param num 随机个数
     * @returns 权重列表的下标数组,数组的长度为num
     */
    //随机生成3个可以用的技能
    static getWeightIndexs(weightList:number[],num:number):number[]{
        let totalWeight=0;
        weightList.forEach((element,key)=> {           
            totalWeight+=element;
        });
        let nums=new Array();
        let newList=weightList.slice();
        //根据权重随机.
        for(let i=0; i<num; i++){
            let randWeight=Math.random()*totalWeight;
            let curWeight=0;
            for(let n=0; n<newList.length; n++){
                let useWeight=newList[n];
                curWeight+=useWeight;
                if(randWeight<curWeight){                    
                    totalWeight-=useWeight;
                    newList[n]=0;
                    nums.push(n);
                    break;
                }
            }
        }
        return nums;
    }

    public static numberFormat(num:number,n:number = 0){
        if(!isNaN(num)){
            let temp = num.toFixed(n);
            if(temp.indexOf('.') != -1){
                let isZero = false;
                for(let i = temp.indexOf('.') + 1;i <= temp.indexOf('.')+n;i++){
                    if(i<temp.length){
                        if(temp[i] != '0'){
                            isZero = true
                        }
                    }
                }
                if(isZero){
                    return temp
                }else{
                    return String(Number(temp))
                }
            }else{
                return temp
            }
        }
    }
    /**从一段字符中解析包含的所有数字，只解析一次小数点 */
    public static getNumberFromString(s:string):number{
        let temp = s.match(/\d+(\.\d)?/g);
        let result = '';
        temp.forEach((v,k)=>{
            result += v;
        });
        return Number(result);
    }
}

