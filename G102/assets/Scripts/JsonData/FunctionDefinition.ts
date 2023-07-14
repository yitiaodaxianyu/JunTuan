import { ActivityManager, ActivityType } from "../Activity/ActivityManager";
import { Btn_Index, FuncType } from "../Constants";
import { LevelManager } from "../Level/LevelManager";
import { LoadManager } from "../Loading/LoadManager";
import { Follow_Type } from "../multiLanguage/FollowConstants";
import FollowManager from "../multiLanguage/FollowManager";
import UserData from "../UserData";

export class JsonFunctionDefinition {
    /**功能ID */
    public FunctionID:number = 0 ;
    /**功能名文本 */
    public TextID:number = 0 ;
    /**解锁条件类型 */
    public UnlockConditionType:number = 0 ;
    /**解锁条件参数 */
    public UnlockCondictionParameter:number = 0 ;
}

export class FunctionDefinitionManager {
    private static _instance: FunctionDefinitionManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonFunctionDefinition>=null;
    private is_load_completed:boolean=false;

    public static getInstance():FunctionDefinitionManager {
        if(this._instance==null) {
            this._instance=new FunctionDefinitionManager();
            this._instance.init();
        }
        return this._instance;
    }
    //初始化游戏数据
    private init() {
        if(!this.data) {
            this.loadJson();
        }
    }
    //加载json
    private loadJson() {
        LoadManager.loadJson('FunctionDefinition',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonFunctionDefinition成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonFunctionDefinition();
                jsonData=json[i];
                this.data.set(jsonData.FunctionID,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonFunctionDefinition(id:number):JsonFunctionDefinition {
        return this.data.get(id);
    }
    /**根据功能ID获取功能名文本 */
    public getTextID(id:number): number {
        return this.data.get(id).TextID;
    }
    /**根据功能ID获取解锁条件类型 */
    public getUnlockConditionType(id:number): number {
        return this.data.get(id).UnlockConditionType;
    }
    /**根据功能ID获取解锁条件参数 */
    public getUnlockCondictionParameter(id:number): number {
        return this.data.get(id).UnlockCondictionParameter;
    }

    /** 静态方法，获取最大的 功能ID*/
    public static getMaxFunctionID():number {
        return 10;
    }

    //以上格式统一，以下写每个json数据的特殊需求

    /**获取需要提示的功能的列表 */
    public static getFuncList():FuncType[]{
        let funcList=new Array();
        let idStrList:string=cc.sys.localStorage.getItem('func_list');
        if(idStrList!=null && idStrList!="")
        {
            let list=idStrList.split(',');
            for(let i=0; i<list.length; i++)
            {
                let id=parseInt(list[i]);
                funcList.push(id)
            }
        }
        return funcList;
    }
    /**保存需要提示的功能的列表 */
    public static saveFuncList(temp:FuncType[])
    {
        cc.sys.localStorage.setItem('func_list',temp.toString());
    }

    /**获取功能的提示情况 */
    public static getFuncHint(funcId:FuncType):number{
        let num=cc.sys.localStorage.getItem('func_hint_'+funcId);
        if(num==="" || num===null)
        {
            num=0;            
        }else
        {
            num=parseInt(num);            
        }
        return num;
    }

    /**保存功能的提示情况 */
    public static saveFuncHint(funcId:number,num:number){
        cc.sys.localStorage.setItem('func_hint_'+funcId,num);        
    }

    // public static cheakFuncUnlock(){
    //     if(TutorailsManager.getInstance().is_tutorails_state==false){
    //         let unlockIds=this.getFuncList();
    //         if(unlockIds.length>0){
    //             let id=unlockIds.pop();
    //             UIManager.getInstance().showFuncUnlockUi(id);
    //             this.saveFuncList(unlockIds);
    //             this.saveFuncHint(id,1);
    //         }
    //     }        
    // }
    /**是否解锁功能 */
    public getIsUnlock(funcType:FuncType):boolean{
        let isUnlock=false;
        let finishLevel=LevelManager.getInstance().finish_level;
        let userLevel=UserData.getInstance().getUserLevel();
        let jsonData=this.getJsonFunctionDefinition(funcType);
        let type=jsonData.UnlockConditionType;
        let value=jsonData.UnlockCondictionParameter;
        if(type==1){
            if(userLevel>=value){                
                isUnlock=true;
            }
        }else
        if(type==2){
            if(finishLevel>=value){
                isUnlock=true;
            }
        }
        return isUnlock;
    }

    public static getIconIndex(funcType:FuncType):number{
        let spIndex=funcType;
        if(funcType==FuncType.WuJinTiaoZhan || funcType==FuncType.GeRenBoss || funcType==FuncType.PaTa){
            spIndex=10;
        } 
        return spIndex;
    }
    /**获取是否解锁了底部的按钮 */
    public getIsUnlockIndex(index:Btn_Index):boolean{
        let isUnlock=false;
        switch(index){
            case Btn_Index.Btn_City:{
                //主城
                // isUnlock=this.getIsUnlock(FuncType.XuYuanChi);
                // if(!isUnlock){
                //     isUnlock=this.getIsUnlock(FuncType.LongChao);
                //     if(!isUnlock){
                //         isUnlock=this.getIsUnlock(FuncType.TieJiangPu);
                //         if(!isUnlock){
                //             isUnlock=this.getIsUnlock(FuncType.ShangDian);
                //             if(!isUnlock){
                //                 isUnlock=this.getIsUnlock(FuncType.Shengtang);
                //             }
                //         }
                //     }
                // }
                // if(isUnlock&&FollowManager.getInstance().getFirstDo(Follow_Type.主城功能解锁)){
                //     FollowManager.getInstance().followEvent(Follow_Type.主城功能解锁);
                //     FollowManager.getInstance().addFirstDo(Follow_Type.主城功能解锁);
                // }                
                isUnlock=true;
            }break;
            case Btn_Index.Btn_Pet:{
                isUnlock=this.getIsUnlock(FuncType.ChongWuXiTong)
            }break;
            case Btn_Index.Btn_FuBen:{
                for(let i=ActivityType.Endless; i<=ActivityType.num; i++){
                    let type=ActivityManager.getInstance().getFuncType(i);
                    if(this.getIsUnlock(type)){
                        isUnlock=true;
                        break;
                    }
                }
            }break;
            default:{
                isUnlock=true;
            }
        }
        return isUnlock;
    }

}
