import MyTool from "./MyTool";


const {ccclass, property} = cc._decorator;
@ccclass
export default class NumberLabel extends cc.Label {

    /**当前数字 */
    cur_num:number=2000;
    /**目标数字 */
    target_num:number=2000;
    /**完成当前数字变化至目标数字所需的时间 秒 */
    compelete_num:number=0.5;
    /**每帧的变化值 */
    private changing:number=0;
    refresh_time:number=0.05;
    jishi:number=0;
    is_show_k:boolean=true;
    // 初始化文本
    init (num:number,isShowK:boolean) {
        this.cur_num=this.target_num=num;
        this.is_show_k=isShowK;
        this.showCurNum();
    }
    // 设置文本特效
    setTarget(num:number,compeleteTime:number,isScale:boolean=false){
        this.target_num=num;
        let totalFrame=Math.ceil(compeleteTime/cc.director.getDeltaTime());
        let offsetNum=this.target_num-this.cur_num;
        this.changing=offsetNum/totalFrame;
        if(isScale&&this.target_num!=this.cur_num){
            let scaleTo=1.2;
            let averageTime=compeleteTime/6;
            cc.tween(this.node).to(averageTime,{scale:scaleTo}).to(averageTime,{scale:1.0}).to(averageTime,{scale:scaleTo}).to(averageTime,{scale:1.0}).to(averageTime,{scale:scaleTo}).to(averageTime,{scale:1.0}).start();
        }
    }

    showCurNum(){
        if(this.is_show_k)
            this.string=MyTool.getCoinDanwei(this.cur_num,1);
        else{
            this.string=this.cur_num+"";
        }
    }

    update (dt) {
        if(this.cur_num!=this.target_num){
            this.jishi+=dt;
            this.cur_num=Math.ceil(this.cur_num+this.changing);            
            if(this.jishi>=this.refresh_time){
                this.jishi=0;
                this.showCurNum();
            }
            let offsetNum=this.target_num-this.cur_num;  
            if(Math.abs(offsetNum)<Math.abs(this.changing)){
                this.cur_num=this.target_num;
                this.showCurNum();
            }
        }
    }
}
