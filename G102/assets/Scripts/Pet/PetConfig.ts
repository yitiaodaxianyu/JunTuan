import { HeroManager } from "../Hero/Data/HeroManager";
import { Hero_Type } from "../Hero/Game/HeroConfig";
import { AssetsEventType, EventManager } from "../Tools/EventManager";

export class PetInfo{
    /**宠物id */
    pet_id:number=20;
    /**宠物的等级 */
    pet_level:number=10;
    /**宠物觉醒阶段 */
    pet_awaken_stage:number=1;
    /**唯一的序列id */
    sequence_id:number=1;
    /**宠物品质 */
    pet_quality:number=6;
    /**绑定的英雄,NULL表示无绑定 */
    hero_type:Hero_Type=Hero_Type.NULL;
    /**租借来源 */
    lease_type:LeaseType=LeaseType.Null;
    /**
     * 更改宠物绑定的英雄或和宠物交换绑定的英雄
     * @param petInfo 交换的宠物，null时表示自身下阵
     * @param heroType 指定绑定的英雄
     */
    changeBindHero(petInfo:PetInfo,heroType:Hero_Type){
        if(petInfo){
            if(this.isEqual(petInfo)){
                if(heroType==Hero_Type.NULL){
                    petInfo=null;
                }
                this.hero_type=heroType;
                HeroManager.getInstance().changeBindPet(this.hero_type,petInfo);
            }else{
                let curHeroType=this.hero_type;
                petInfo.hero_type=curHeroType;
                this.hero_type=heroType;
                if(heroType==Hero_Type.NULL){
                    petInfo=null;
                }
                //更改英雄的绑定            
                HeroManager.getInstance().changeBindPet(curHeroType,petInfo);
                HeroManager.getInstance().changeBindPet(this.hero_type,this);
            }
        }else{            
            let curHeroType=this.hero_type;
            this.hero_type=heroType;
            HeroManager.getInstance().changeBindPet(heroType,this);
            HeroManager.getInstance().changeBindPet(curHeroType,petInfo);
        }
        EventManager.postAssetsEvent(AssetsEventType.TEAM_PET);   
    }
    /**将宠物等级重置为一 */
    resetLevel(){
        this.pet_level = 1;
    }

    /**判断是否是同一个宠物 */
    isEqual(petInfo:PetInfo):boolean{
        if(petInfo){
            return petInfo.sequence_id==this.sequence_id;
        }
        return false;
    }
}

export enum PetSkillType{    
    /**主动技能 */
    Active=1,

}

export enum PetType {
    All = 0,
    Power = 1,//力量
    Agile = 2,//敏捷
    Intelligence = 3
}

export enum LeaseType{
    /**不是租借的 */
    Null=0,
    /**迷宫租借的 */
    Maze,
}

export class PetMessage{
    pet_id:number = 0;
    pet_num:number = 0;
}