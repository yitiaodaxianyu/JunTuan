import { GongJiData } from "../Data/HeroData";


const {ccclass, property} = cc._decorator;

@ccclass
export default class GongJi extends cc.Component {

    gongji_data:GongJiData=null;

    protected initData(gjData:GongJiData)
    {
        this.gongji_data=gjData;
    }
}
