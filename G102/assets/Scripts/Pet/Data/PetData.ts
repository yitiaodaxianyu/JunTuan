

import { AttributeData } from "../../Hero/Game/HeroConfig";
import { PetSkillType } from "../../Pet/PetConfig";


/**游戏外英雄数据，游戏内数据通过附加计算 */
export class PetData extends AttributeData{

   
    getSkillColdDown(type:PetSkillType):number{
        return this.ColdDown.get(type);
    }

    getSkillValue1(type:PetSkillType):number{
        return this.SkillValue_x.get(type);
    }

    getSkillValue2(type:PetSkillType):number{
        return this.SkillValue_y.get(type);
    }

    getSkillValue3(type:PetSkillType):number{
        return this.SkillValue_z.get(type);
    }

    
}
