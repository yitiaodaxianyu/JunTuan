const {ccclass, property} = cc._decorator;

@ccclass
export default class StoreHeroIconItem extends cc.Component {

    callBack:Function = null;

    init(callBack:Function){
        this.callBack = callBack;
    }

    showHero(){
        this.callBack();
    }

}
