

export class TheStorageManager {
    private static _instance: TheStorageManager = null;
    private secret_key:string="";
    
    public static getInstance():TheStorageManager {
        if(this._instance==null) {
            this._instance=new TheStorageManager();            
        }
        return this._instance;
    }

    public setItem(key:string,value:any){

        cc.sys.localStorage.setItem(key,value);
    }

    public setJson(key:string,value:any){
        this.setItem(key,JSON.stringify(value));
    }

    public getItem(key:string):any{
        let num=cc.sys.localStorage.getItem(key);
        return num;
    }

    public removeItem(key:string){
        cc.sys.localStorage.removeItem(key);
    }

    public getString(key:string,defaultValue?:string):string{
        let num=this.getItem(key);
        if(num==="" || num===null)
        {
            num=defaultValue;
        }
        return num;
    }

    public getNumber(key:string,defaultValue?:number):number{
        let num=this.getItem(key);
        if(num==="" || num===null||num=="undefined")
        {
            num=defaultValue;
        }else
        {
            num=Number(num);
        }
        return num;
    }

    public getInt(key:string,defaultValue?:number):number{
        let num=this.getItem(key);
        if(num==="" || num===null)
        {
            num=defaultValue;
        }else
        {
            num=parseInt(num);
        }
        return num;
    }

    public getFloat(key:string,defaultValue?:number):number{
        let num=this.getItem(key);
        if(num==="" || num===null)
        {
            num=defaultValue;
        }else
        {
            num=parseFloat(num);
        }
        return num;
    }

    public getIntList(key:string,defaultValue?:number[]):number[]{
        let numList:number[]=[];
        let numListStr=this.getItem(key);
        if(numListStr==="" || numListStr===null)
        {
            numList=defaultValue;
        }else
        {
            let list=numListStr.split(',');
            for(let i=0; i<list.length; i++)
            {
                let id=parseInt(list[i]);
                numList.push(id);
            }
        }
        return numList;
    }

    public getJson(key:string,defaultValue?:any):any{
        let data=this.getItem(key);
        if(data){
            return JSON.parse(data);
        }else{
            return defaultValue;
        }
    }
}