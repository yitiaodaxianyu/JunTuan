import ApkManager from "../Ads/ApkManager";

class ABTestPar{
    rank_show:boolean=true;
}

export default class ABTestManager {

    //参数列表
    private ab_test_par:ABTestPar=null;    

    private static _instance: ABTestManager = null;

    public static getInstance():ABTestManager
    {
        if(this._instance==null)
        {
            this._instance=new ABTestManager();   
            this._instance.init();
        }
        return this._instance;
    }

    private init()
    {
        this.ab_test_par=new ABTestPar();
        ApkManager.getInstance().getABTestPar();
    }

    setABTestPar(abTest:any)
    {
        let json=JSON.parse(abTest);
        let abt=new ABTestPar();
        abt.rank_show=json.rank_show;
        this.ab_test_par=abt;
    }

    getABTestPar():ABTestPar
    {
        return this.ab_test_par;
    }

}
