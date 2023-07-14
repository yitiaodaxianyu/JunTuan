import MyTool from "../../Tools/MyTool";


const {ccclass, property} = cc._decorator;

@ccclass
export default class StatsUi extends cc.Component {

    // cur_num_1:number=0;
    // cur_num_2:number=0;
    // target_num_1:number=0;
    // target_num_2:number=0;
    // progress_1:cc.ProgressBar=null;
    // progress_2:cc.ProgressBar=null;
    // label_1:cc.Label=null;
    // label_2:cc.Label=null;
    // /**每帧的变化值 */
    // private changing_1:number=0;
    // private changing_2:number=0;
    // /**最高进度系数 */
    // max_progress_1:number=0;
    // max_progress_2:number=0;

    // jishi:number=0;

    // init (targetNum1:number,targetNum2:number,compeleteTime:number,maxNum:number) {
    //     this.target_num_1=targetNum1;
    //     this.target_num_2=targetNum2;
    //     this.max_progress_1=targetNum1/maxNum;
    //     this.max_progress_2=targetNum2/maxNum;
    //     this.progress_1=this.node.getChildByName('att').getComponent(cc.ProgressBar);
    //     this.progress_2=this.node.getChildByName('skill').getComponent(cc.ProgressBar);
    //     this.label_1=this.node.getChildByName('attNum').getComponent(cc.Label);
    //     this.label_2=this.node.getChildByName('skillNum').getComponent(cc.Label);
    //     let totalFrame=Math.ceil(compeleteTime/cc.director.getDeltaTime());
    //     let offsetNum1=this.target_num_1-this.cur_num_1;
    //     let offsetNum2=this.target_num_2-this.cur_num_2;
    //     this.changing_1=offsetNum1/totalFrame;
    //     this.changing_2=offsetNum2/totalFrame;
    // }

    // private showCurNum1(){
    //     this.label_1.string=MyTool.getCoinDanwei(this.cur_num_1,1);
    //     this.progress_1.progress=this.cur_num_1/this.target_num_1*this.max_progress_1;
    // }
    
    // private showCurNum2(){
    //     this.label_2.string=MyTool.getCoinDanwei(this.cur_num_2,1);
    //     this.progress_2.progress=this.cur_num_2/this.target_num_2*this.max_progress_2;
    // }

    // update (dt) {
    //     if(this.cur_num_1!=this.target_num_1){
    //         this.cur_num_1=Math.ceil(this.cur_num_1+this.changing_1);
    //         this.showCurNum1();
    //         let offsetNum1=this.target_num_1-this.cur_num_1;
    //         if(Math.abs(offsetNum1)<Math.abs(this.changing_1)){
    //             this.cur_num_1=this.target_num_1;
    //             this.showCurNum1();
    //         }            
    //     }

    //     if(this.cur_num_2!=this.target_num_2){
    //         this.cur_num_2=Math.ceil(this.cur_num_2+this.changing_2);
    //         this.showCurNum2();
    //         let offsetNum2=this.target_num_2-this.cur_num_2;
    //         if(Math.abs(offsetNum2)<Math.abs(this.changing_2)){
    //             this.cur_num_2=this.target_num_2;
    //             this.showCurNum2();
    //         }
    //     }
        
    // }
}

