import { IsSaveEquipLog } from "../Constants";

export class LogInfo{
    //日志时间的字符串
    log_time:string='2022-2-11 11:11:11';
    //日志内容
    log_content:string='获得了装备:66668888';

}

export class LogManager{

    private static log_list:LogInfo[]=null;

    static init(){
        this.log_list=new Array();
        let logStr:string=cc.sys.localStorage.getItem('log_list');
        if(logStr!="" && logStr!=null)
        {
            let infos:LogInfo[]=JSON.parse(logStr);
            for(let i=0; i<infos.length; i++)
            {
                let info=new LogInfo();
                info=infos[i];
                this.log_list.push(info);
            }
        }
    }
    // //装备数据的改动日志
    // static saveLog(str:string,logStr?:string,count?:number)
    // {
    //     if(IsSavelogLog==false)
    //     return;
    //     logStr=arguments[1]?arguments[1]:this.getTimeStr();
    //     let sss=cc.sys.localStorage.getItem(logStr);
    //     if(sss!=''&& sss!=null)
    //     {
    //         count=arguments[2]?arguments[2]:0;
    //         count++;
    //         logStr=logStr.substring(0,19)+'/'+count;
    //         this.saveLog(str,logStr,count);
    //         return;
    //     }
    //     cc.log(logStr,str);
    //     //把日志信息保存至日志列表
    //     cc.sys.localStorage.setItem(logStr,str);        
    // }

    static getTimeStr():string
    {
        return new Date( +new Date() + 8 * 3600 * 1000 ).toJSON().substring(0,19).replace("T"," ");
    }

    //添加一个日志信息到列表
    static addLog(str:string)
    {        
        if(IsSaveEquipLog)
        {
            if(this.log_list==null)
            {
                this.init();
            }
            let logInfo=new LogInfo();
            logInfo.log_time=this.getTimeStr();
            logInfo.log_content=str;
            this.log_list.push(logInfo);
            cc.log(logInfo.log_time,logInfo.log_content);
        }
    }

    static saveLogList()
    {
        if(IsSaveEquipLog)
        {
            if(this.log_list)
            {
                cc.sys.localStorage.setItem('log_list',JSON.stringify(this.log_list));
            }            
        }
    }
}