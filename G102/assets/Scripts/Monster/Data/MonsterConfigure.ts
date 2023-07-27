import { LoadManager } from "../../Loading/LoadManager";


export class JsonMonsterConfigure {
    /**怪物ID */
    public MonsterId:number = 0 ;
    /**怪物种类 */
    public MonsterClass:number = 0 ;
    /**皮肤 */
    public Skin:number = 0 ;
    /**强度类型 */
    public StrengthType:number = 0 ;
    /**怪物名文本 */
    public NameTextId:number = 0 ;
    /**介绍文本 */
    public IntroTextId:number = 0 ;
    /**移速 */
    public Speed:number = 0 ;
    /**攻击方式 */
    public AttackMode:number = 0 ;
    /**攻击距离 */
    public AttackDistance:number = 0 ;
    /**基础攻速 */
    public AttackSpeed:number = 0 ;
    /**缩放倍率 */
    public Scale:number = 0 ;
    /**怪物间隔 */
    public MonsterSpacing:number = 0 ;
    /**技能数量 */
    public SkillNum:number = 0 ;
}

export class MonsterConfigureManager {
    private static _instance: MonsterConfigureManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonMonsterConfigure>=null;
    private is_load_completed:boolean=false;

    public static getInstance():MonsterConfigureManager {
        if(this._instance==null) {
            this._instance=new MonsterConfigureManager();
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
        LoadManager.loadJson('MonsterConfigure',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonMonsterConfigure成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonMonsterConfigure();
                jsonData=json[i];
                this.data.set(jsonData.MonsterId,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonMonsterConfigure(id:number):JsonMonsterConfigure {
        return this.data.get(id);
    }
    /**根据怪物ID获取怪物种类 */
    public getMonsterClass(id:number): number {
        return this.data.get(id).MonsterClass;
    }
    /**根据怪物ID获取皮肤 */
    public getSkin(id:number): number {
        return this.data.get(id).Skin;
    }
    /**根据怪物ID获取强度类型 */
    public getStrengthType(id:number): number {
       
        return this.data.get(id).StrengthType;
    }
    /**根据怪物ID获取怪物名文本 */
    public getNameTextId(id:number): number {
        return this.data.get(id).NameTextId;
    }
    /**根据怪物ID获取介绍文本 */
    public getIntroTextId(id:number): number {
        return this.data.get(id).IntroTextId;
    }
    /**根据怪物ID获取移速 */
    public getSpeed(id:number): number {
        return this.data.get(id).Speed;
    }
    /**根据怪物ID获取攻击方式 */
    public getAttackMode(id:number): number {
        return this.data.get(id).AttackMode;
    }
    /**根据怪物ID获取攻击距离 */
    public getAttackDistance(id:number): number {
        return this.data.get(id).AttackDistance;
    }
    /**根据怪物ID获取基础攻速 */
    public getAttackSpeed(id:number): number {
        return this.data.get(id).AttackSpeed;
    }
    /**根据怪物ID获取缩放倍率 */
    public getScale(id:number): number {
        return this.data.get(id).Scale;
    }
    /**根据怪物ID获取怪物间隔 */
    public getMonsterSpacing(id:number): number {
        return this.data.get(id).MonsterSpacing;
    }
    /**根据怪物ID获取技能数量 */
    public getSkillNum(id:number): number {
        return this.data.get(id).SkillNum;
    }

    /** 静态方法，获取最大的 怪物ID*/
    public static getMaxMonsterId():number {
        return 30871;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
