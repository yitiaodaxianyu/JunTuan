import { LoadManager } from "../../Loading/LoadManager";


export class JsonStarVeinsAttribute {
    /**节点ID */
    public Node:number = 0 ;
    /**星脉ID */
    public StarVeinsId:number = 0 ;
    /**节点序号 */
    public NodeOrdinal:number = 0 ;
    /**消耗道具ID */
    public CostItem:number = 0 ;
    /**消耗道具数量 */
    public CostNum:number = 0 ;
    /**攻击力 */
    public Attack:number = 0 ;
    /**防御力 */
    public Defense:number = 0 ;
    /**生命值 */
    public Health:number = 0 ;
    /**额外攻速 */
    public ExtraAttackSpeed:number = 0 ;
    /**命中值 */
    public Hit:number = 0 ;
    /**闪避值 */
    public Miss:number = 0 ;
    /**暴击值 */
    public Critical:number = 0 ;
    /**暴击增幅 */
    public ExtraCritical:number = 0 ;
    /**防暴值 */
    public AntiCritical:number = 0 ;
    /**暴击抗性 */
    public AntiExtraCritical:number = 0 ;
    /**灵兽百分比攻击力 */
    public SpiritPercentageAttack:number = 0 ;
    /**灵兽防御力加成 */
    public SpiritPercentageDefense:number = 0 ;
    /**灵兽生命值加成 */
    public SpiritPercentageHealth:number = 0 ;
}

export class StarVeinsAttributeManager {
    private static _instance: StarVeinsAttributeManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonStarVeinsAttribute>=null;
    private is_load_completed:boolean=false;

    public static getInstance():StarVeinsAttributeManager {
        if(this._instance==null) {
            this._instance=new StarVeinsAttributeManager();
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
        LoadManager.loadJson('StarVeinsAttribute',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonStarVeinsAttribute成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonStarVeinsAttribute();
                jsonData=json[i];
                this.data.set(jsonData.Node,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonStarVeinsAttribute(id:number):JsonStarVeinsAttribute {
        return this.data.get(id);
    }
    /**根据节点ID获取星脉ID */
    public getStarVeinsId(id:number): number {
        return this.data.get(id).StarVeinsId;
    }
    /**根据节点ID获取节点序号 */
    public getNodeOrdinal(id:number): number {
        return this.data.get(id).NodeOrdinal;
    }
    /**根据节点ID获取消耗道具ID */
    public getCostItem(id:number): number {
        return this.data.get(id).CostItem;
    }
    /**根据节点ID获取消耗道具数量 */
    public getCostNum(id:number): number {
        return this.data.get(id).CostNum;
    }
    /**根据节点ID获取攻击力 */
    public getAttack(id:number): number {
        return this.data.get(id).Attack;
    }
    /**根据节点ID获取防御力 */
    public getDefense(id:number): number {
        return this.data.get(id).Defense;
    }
    /**根据节点ID获取生命值 */
    public getHealth(id:number): number {
        return this.data.get(id).Health;
    }
    /**根据节点ID获取额外攻速 */
    public getExtraAttackSpeed(id:number): number {
        return this.data.get(id).ExtraAttackSpeed;
    }
    /**根据节点ID获取命中值 */
    public getHit(id:number): number {
        return this.data.get(id).Hit;
    }
    /**根据节点ID获取闪避值 */
    public getMiss(id:number): number {
        return this.data.get(id).Miss;
    }
    /**根据节点ID获取暴击值 */
    public getCritical(id:number): number {
        return this.data.get(id).Critical;
    }
    /**根据节点ID获取暴击增幅 */
    public getExtraCritical(id:number): number {
        return this.data.get(id).ExtraCritical;
    }
    /**根据节点ID获取防暴值 */
    public getAntiCritical(id:number): number {
        return this.data.get(id).AntiCritical;
    }
    /**根据节点ID获取暴击抗性 */
    public getAntiExtraCritical(id:number): number {
        return this.data.get(id).AntiExtraCritical;
    }
    /**根据节点ID获取灵兽百分比攻击力 */
    public getSpiritPercentageAttack(id:number): number {
        return this.data.get(id).SpiritPercentageAttack;
    }
    /**根据节点ID获取灵兽防御力加成 */
    public getSpiritPercentageDefense(id:number): number {
        return this.data.get(id).SpiritPercentageDefense;
    }
    /**根据节点ID获取灵兽生命值加成 */
    public getSpiritPercentageHealth(id:number): number {
        return this.data.get(id).SpiritPercentageHealth;
    }

    /** 静态方法，获取最大的 节点ID*/
    public static getMaxNode():number {
        return 0;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
