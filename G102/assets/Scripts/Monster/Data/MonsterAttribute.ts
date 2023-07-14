
import { Enemy_Type } from "../../Enemy/EnemyConfig";
import { LoadManager } from "../../Loading/LoadManager";

export class JsonMonsterAttribute {
    /**怪物ID */
    public Monster:number = 0 ;
    /**怪物名称文本 */
    public MosterName_TextID:number = 0 ;
    /**初始血量 */
    public BaseHP:number = 0 ;
    /**初始攻击力 */
    public BaseAttack:number = 0 ;
    /**初始攻速 */
    public BaseAttackSpeed:number = 0 ;
    /**位置 */
    public Area:number[] = [] ;
    /**特性编号 */
    public Feature:number = 0 ;
    /**移动速度 */
    public Speed:number = 0 ;
    /**BOSS属性系数 */
    public BossMultiple:number = 0 ;
    /**召唤系数 */
    public SummonMultiple:number = 0 ;
}

export class MonsterAttributeManager {
    private static _instance: MonsterAttributeManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonMonsterAttribute>=null;
    private is_load_completed:boolean=false;

    public static getInstance():MonsterAttributeManager {
        if(this._instance==null) {
            this._instance=new MonsterAttributeManager();
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
        LoadManager.loadJson('MonsterAttribute',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonMonsterAttribute成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonMonsterAttribute();
                jsonData=json[i];
                this.data.set(jsonData.Monster,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonMonsterAttribute(id:number):JsonMonsterAttribute {
        return this.data.get(id);
    }
    /**根据怪物ID获取怪物名称文本 */
    public getMosterName_TextID(id:number): number {
        return this.data.get(id).MosterName_TextID;
    }
    /**根据怪物ID获取初始血量 */
    public getBaseHP(id:number): number {
        return this.data.get(id).BaseHP;
    }
    /**根据怪物ID获取初始攻击力 */
    public getBaseAttack(id:number): number {
        return this.data.get(id).BaseAttack;
    }
    /**根据怪物ID获取初始攻速 */
    public getBaseAttackSpeed(id:number): number {
        return this.data.get(id).BaseAttackSpeed;
    }
    /**根据怪物ID获取位置 */
    public getArea(id:number): number[] {
        return this.data.get(id).Area;
    }
    /**根据怪物ID获取特性编号 */
    public getFeature(id:number): number {
        return this.data.get(id).Feature;
    }
    /**根据怪物ID获取移动速度 */
    public getSpeed(id:number): number {
        return this.data.get(id).Speed;
    }
    /**根据怪物ID获取BOSS属性系数 */
    public getBossMultiple(id:number): number {
        return this.data.get(id).BossMultiple;
    }
    /**根据怪物ID获取召唤系数 */
    public getSummonMultiple(id:number): number {
        return this.data.get(id).SummonMultiple;
    }

    /** 静态方法，获取最大的 怪物ID*/
    public static getMaxMonster():number {
        return 50180;
    }

    //以上格式统一，以下写每个json数据的特殊需求
}
