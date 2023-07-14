import { IsDebug } from "../Constants";
import GameData from "../GameData";
import MainUi from "../UI/home/MainUi";


export enum DingYue_Type
{
    Week=0,
    Month,
    Year,
}

export enum Vip_Type
{
    A=0,
    B,
}

export class DYInfo{
    des:string='vip';
    price:string='$1.0';
    currency:string='USD';
}

export class VipManager {
    static dy_info:DYInfo[]=[];

    static vip_type:Vip_Type=Vip_Type.A;

    static getIsVip():boolean
    {
        let num=cc.sys.localStorage.getItem('vip_level');
        if(num==="" || num===null)
        {
            num=0;
        }else
        {
            num=parseInt(num);
        }
        if(num>0)
        {
            return true;
        }else
        {
            return false;
        }
    }

    static getVipStartTime()
    {
        let num=cc.sys.localStorage.getItem('vip_start_time');
        if(num==="" || num===null)
        {
            num=0;
        }else
        {
            num=parseInt(num);
        }
        return num;
    }

    static saveVipStartTime(dingyueType:DingYue_Type,vipType:Vip_Type)
    {
        this.vip_type=vipType;
        let time=new Date().getTime();
        cc.sys.localStorage.setItem('vip_start_time',time);
        this.saveTotalDay(dingyueType);
    }

    static getVipTotalDay()
    {
        let num=cc.sys.localStorage.getItem('vip_total_day');
        if(num==="" || num===null)
        {
            num=0;
        }else
        {
            num=parseInt(num);
        }
        return num;
    }

    static saveTotalDay(dingyueType:DingYue_Type)
    {
        let num=7;
        switch(dingyueType)
        {
            case DingYue_Type.Week: num=7; break;
            case DingYue_Type.Month: num=30; break;
            case DingYue_Type.Year: num=365; break;
        }
        cc.sys.localStorage.setItem('vip_total_day',num);
    }

    static getVipFreeNum():number
    {
        let num=cc.sys.localStorage.getItem('vip_free_num');
        if(num==="" || num===null)
        {
            num=0;
        }else
        {
            num=parseInt(num);
        }
        return num;
    }

    static subVipFreeNum():boolean
    {
        if(this.getIsVip()==true)
        {
            if(this.getVipFreeNum()>0)
            {
                let num=this.getVipFreeNum();
                num--;
                if(num>=0)
                {
                    this.saveVipFreeNum(num);
                    return true;
                }
            }
        }
        return false;
    }

    static saveVipFreeNum(num:number)
    {
        cc.sys.localStorage.setItem('vip_free_num',num);
    }

}

