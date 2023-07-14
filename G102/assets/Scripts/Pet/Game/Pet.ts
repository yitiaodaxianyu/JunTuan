import { GameState } from "../../Constants";
import { GameEffectId, GameEffectsManager } from "../../Game/GameEffectsManager";
import GroundManager from "../../Game/GroundManager";
import GameManager from "../../GameManager";
import { GongJiData, HeroData } from "../../Hero/Data/HeroData";
import { Hero_Type, DamageType } from "../../Hero/Game/HeroConfig";
import { KeyFrameData, MonsterActionName, MonsterFaceName, MonsterSkinType } from "../../Monster/MonsterData";
import MonsterManager from "../../Monster/MonsterManager";
import { SoundIndex } from "../../Sound/AudioConstants";
import { PetData } from "../Data/PetData";
import { SpiritAttributeManager } from "../Data/SpiritAttribute";
import { SpiritSkillManager } from "../Data/SpiritSkill";
import { PetInfo, PetSkillType } from "../PetConfig";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Pet extends cc.Component {
    /**所有的英雄及其所需资源是否加载完毕 */
    public static max_load_num:number=0;
    public static cur_loaded_num:number=0;
    /**所需的动画加载是否ok */
    is_load_ok:boolean=false;
    cur_load_num:number=0;
    need_load_num:number=0;
    protected spine: sp.Skeleton=null;
    /**绑定的英雄 */
    hero_type:Hero_Type=Hero_Type.NULL;
    /**英雄数据 */
    hero_data:HeroData=null;
    /**自身的宠物类型 */
    pet_type:number=0;
    /**自身的宠物id */
    pet_id:number=0;
    /**宠物的品质 */
    pet_quality:number=0;
    /**技能数据 */
    protected pet_data:PetData=null;
    /**技能冷却时间 */
    cd_time:number=0;

    attack_callback:Function=null;
    inited_callback:Function=null;

    onLoad(){
        this.spine=this.node.getComponent(sp.Skeleton);
        this.spine.setAnimation(0,"Idle",true);
    }

    preLoadRes(){
        switch(this.pet_type){
            case 1:{
                this.addLoadByGameEffectId(GameEffectId.pet1_attack);
                this.addLoadByGameEffectId(GameEffectId.pet1_attack_hit);
            }break;
            case 2:{
                this.addLoadByGameEffectId(GameEffectId.pet2_attack);
                this.addLoadByGameEffectId(GameEffectId.pet2_attack_hit);
                this.addLoadByGameEffectId(GameEffectId.pet2_skill);
            }break;
            case 3:{
                this.addLoadByGameEffectId(GameEffectId.pet3_skill_back);
                this.addLoadByGameEffectId(GameEffectId.pet3_skill_front);
            }break;
            case 4:{
                this.addLoadByGameEffectId(GameEffectId.pet4_skill);
            }break;
        }
    }

    protected addAttackListen(callBack:Function){
        this.attack_callback=callBack;
    }
    
    protected addInitedListen(callBack:Function){
        this.inited_callback=callBack;
    }

    addLoadByGameEffectId(id:GameEffectId,initCount:number=1){              
        if(GameEffectsManager.getInstance().addEffectPoolById(id,initCount,()=>{
            this.cur_load_num++;
            if(this.cur_load_num>=this.need_load_num){
                this.is_load_ok=true;
                Pet.cur_loaded_num++;
            }
        })==true){
            this.need_load_num++;            
        }
    }

    init(petId:number,heroType:Hero_Type,pos:cc.Vec2){
        this.pet_id=petId;
        this.pet_type=SpiritAttributeManager.getInstance().getSpiritType(this.pet_id);
        this.pet_quality=SpiritAttributeManager.getInstance().getQuality(this.pet_id);
        this.hero_type=heroType;
        this.node.setPosition(pos);
        this.preLoadRes();
        this.initData();
        if(this.inited_callback){
            this.inited_callback();
        }
    }

    setHeroData(heroData:HeroData){
        this.hero_data=heroData;
    }
    
    /**初始化数据 */
    private initData(){
        this.pet_data=new PetData();
        this.pet_data.SkillValue_x=new Map<number,number>();
        this.pet_data.SkillValue_y=new Map<number,number>();
        this.pet_data.SkillValue_z=new Map<number,number>();
        this.pet_data.ColdDown=new Map<number,number>();
        for(let s=1; s<=1; s++){
            let skillId=SpiritSkillManager.getInstance().getSkillId(this.pet_type,this.pet_quality-2);
            let jsonData=SpiritSkillManager.getInstance().getJsonSpiritSkill(skillId);
            if(jsonData == null) continue;
            this.pet_data.SkillValue_x.set(s,jsonData.SkillParameter_1);
            this.pet_data.SkillValue_y.set(s,jsonData.SkillParameter_2);
            this.pet_data.SkillValue_z.set(s,jsonData.SkillParameter_3);
            this.pet_data.ColdDown.set(s,jsonData.CoolDown);
        }
        this.cd_time=this.pet_data.getSkillColdDown(PetSkillType.Active);
    }

    getGongJiData(isBullet:boolean,skillRate:number):GongJiData{
        let gjData=new GongJiData();
        gjData.hero_type=this.hero_type;
        gjData.hero_data=cc.instantiate(this.hero_data);
        gjData.skill_damage_rate=skillRate;
        gjData.damage_type=DamageType.Skill;
        gjData.is_bullet=isBullet;
        return gjData;
    }

    /**
     * 播放一个骨骼动画
     * @param name 骨骼动画名称
     * @param isLoop 是否循环
     * @param data 是否监听关键帧，关键帧数据包含关键帧名称，监听到关键帧后的回调
     * @param endCallback 播放结束后的回调
     */
     playSpinAnimaton(name:string,isLoop:boolean=false,data?:KeyFrameData,endCallback?:Function){        
        let anima=this.spine.setAnimation(0,name,isLoop);
        if(data){
            this.spine.setTrackEventListener(anima,(entry: sp.spine.TrackEntry, event) =>{
                if(event.data.name==data.name){
                    data.callback();
                }
            })
        }
        if(endCallback){
            this.spine.setTrackCompleteListener(anima,(entry: sp.spine.TrackEntry, event) =>{
                anima.listener=null;
                endCallback();
            })
        }
    }

    /**设置打击目标 */
    setAttTarget(target:cc.Node){

    }

    onHeroHitMonster(monster:cc.Node){
        
    }

    startReleaseSkill(monster:cc.Node){
        if(this.cd_time<=0){
            this.cd_time=this.pet_data.getSkillColdDown(PetSkillType.Active);
            this.attack_callback(monster);
        }
    }

    
}
