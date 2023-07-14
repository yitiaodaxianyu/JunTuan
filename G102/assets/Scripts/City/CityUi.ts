
import { Follow_Type } from "../multiLanguage/FollowConstants";
import FollowManager from "../multiLanguage/FollowManager";


const { ccclass, property } = cc._decorator;

@ccclass
export default class CityUi extends cc.Component {

    onLoad () {        
        this.node.on(cc.Node.EventType.POSITION_CHANGED,this.onPositionChange,this);
    }

    protected onDestroy(): void {
        this.node.off(cc.Node.EventType.POSITION_CHANGED,this.onPositionChange,this);
    }

    onPositionChange(){
        if(this.node.x==0){
            this.onEnable();
        }
    }

    start() {
        //UIManager.getInstance().preloadPrefab('ui/home/wishing_ui');
    }

    onEnable(){
        this.initUi();
        FollowManager.getInstance().followEvent(Follow_Type.主城打开次数);
    }

    initUi() {
        // this.node.getChildByName("petHomeLabel").getComponent(cc.Label).string = LanguageManager.getInstance().getStrByTextId(FunctionDefinitionManager.getInstance().getTextID(FuncType.LongChao));
        // this.node.getChildByName("storeLabel").getComponent(cc.Label).string = LanguageManager.getInstance().getStrByTextId(FunctionDefinitionManager.getInstance().getTextID(FuncType.ShangDian));
        // this.node.getChildByName("blacksmithLabel").getComponent(cc.Label).string = LanguageManager.getInstance().getStrByTextId(FunctionDefinitionManager.getInstance().getTextID(FuncType.TieJiangPu));
        // this.node.getChildByName("wishingLabel").getComponent(cc.Label).string = LanguageManager.getInstance().getStrByTextId(FunctionDefinitionManager.getInstance().getTextID(FuncType.XuYuanChi));
        // this.node.getChildByName("templeLabel").getComponent(cc.Label).string = LanguageManager.getInstance().getStrByTextId(FunctionDefinitionManager.getInstance().getTextID(FuncType.Shengtang));
        // 铁匠铺
        // if (!FunctionDefinitionManager.getInstance().getIsUnlock(FuncType.TieJiangPu)) {
        //     this.node.getChildByName("blacksmith").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
        //     this.node.getChildByName("blacksmithLock").active = true;
        //     this.node.getChildByName("blacksmisthBg").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
        //     this.node.getChildByName("blacksmith").on(cc.Node.EventType.TOUCH_END, () => {
                
        //     });
        // } else {
        //     this.node.getChildByName("blacksmith").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
        //     this.node.getChildByName("blacksmithLock").active = false;
        //     this.node.getChildByName("blacksmisthBg").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
        //     this.node.getChildByName("blacksmith").on(cc.Node.EventType.TOUCH_END, () => {
        //         this.node.getChildByName("equip").active = true;
        //     });
        // }
        // // 龙巢
        // if (!FunctionDefinitionManager.getInstance().getIsUnlock(FuncType.LongChao)) {
        //     this.node.getChildByName("petHome").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
        //     this.node.getChildByName("petHomeLock").active = true;
        //     this.node.getChildByName("petHomeBg").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
        //     this.node.getChildByName("petHome").on(cc.Node.EventType.TOUCH_END, () => {
        //         GameManager.getInstance().showMessage(LanguageManager.getInstance().getString(LanguageIndex.UnlockAfter)+LanguageManager.getInstance().getString(LanguageIndex.PlayerLv)+FunctionDefinitionManager.getInstance().getUnlockCondictionParameter(FuncType.LongChao));
        //     });
        // } else {
        //     this.node.getChildByName("petHome").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
        //     this.node.getChildByName("petHomeLock").active = false;
        //     this.node.getChildByName("petHomeBg").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
        //     this.node.getChildByName("petHome").on(cc.Node.EventType.TOUCH_END, () => {

        //     });
        // }
        // // 圣堂
        // if (!FunctionDefinitionManager.getInstance().getIsUnlock(FuncType.Shengtang)) {
        //     this.node.getChildByName("temple").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
        //     this.node.getChildByName("templeLock").active = true;
        //     this.node.getChildByName("templeBg").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
        //     this.node.getChildByName("petHome").on(cc.Node.EventType.TOUCH_END, () => {
        //         GameManager.getInstance().showMessage(LanguageManager.getInstance().getString(LanguageIndex.UnlockAfter)+LanguageManager.getInstance().getString(LanguageIndex.PlayerLv)+FunctionDefinitionManager.getInstance().getUnlockCondictionParameter(FuncType.Shengtang));
        //     });
        // } else {
        //     this.node.getChildByName("temple").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
        //     this.node.getChildByName("templeLock").active = false;
        //     this.node.getChildByName("templeBg").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
        //     this.node.getChildByName("temple").on(cc.Node.EventType.TOUCH_END, () => {

        //     });
        // }
        // // 商店
        // if (!FunctionDefinitionManager.getInstance().getIsUnlock(FuncType.ShangDian)) {
        //     this.node.getChildByName("store").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
        //     this.node.getChildByName("storeLock").active = true;
        //     this.node.getChildByName("storeBg").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
        //     this.node.getChildByName("petHome").on(cc.Node.EventType.TOUCH_END, () => {
        //         GameManager.getInstance().showMessage(LanguageManager.getInstance().getString(LanguageIndex.UnlockAfter)+LanguageManager.getInstance().getString(LanguageIndex.PlayerLv)+FunctionDefinitionManager.getInstance().getUnlockCondictionParameter(FuncType.ShangDian));
        //     });
        // } else {
        //     this.node.getChildByName("store").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
        //     this.node.getChildByName("storeLock").active = false;
        //     this.node.getChildByName("storeBg").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
        //     this.node.getChildByName("store").on(cc.Node.EventType.TOUCH_END, () => {
        //         UIManager.getInstance().showGoldMallUi(null);
        //     });
        // }
        // // 许愿池
        // if (!FunctionDefinitionManager.getInstance().getIsUnlock(FuncType.XuYuanChi)) {
        //     this.node.getChildByName("wishing").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
        //     this.node.getChildByName("wishingLock").active = true;
        //     this.node.getChildByName("wishingBg").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
        //     this.node.getChildByName("petHome").on(cc.Node.EventType.TOUCH_END, () => {
        //         GameManager.getInstance().showMessage(LanguageManager.getInstance().getString(LanguageIndex.UnlockAfter)+LanguageManager.getInstance().getString(LanguageIndex.PlayerLv)+FunctionDefinitionManager.getInstance().getUnlockCondictionParameter(FuncType.XuYuanChi));
        //     });
        // } else {
        //     this.node.getChildByName("wishing").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
        //     this.node.getChildByName("wishingLock").active = false;
        //     this.node.getChildByName("wishingBg").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
        //     this.node.getChildByName("wishing").on(cc.Node.EventType.TOUCH_END, () => {

        //     });
        // }

    }

    // update (dt) {}

    // onBlacksmithBtnClick(){
    //     GameManager.getInstance().showMessage(LanguageManager.getInstance().getString(LanguageIndex.UnlockAfter)+LanguageManager.getInstance().getString(LanguageIndex.PlayerLv)+FunctionDefinitionManager.getInstance().getUnlockCondictionParameter(FuncType.TieJiangPu));
    // }

    // onWishingBtnClick(){

    // }

    // onTempleBtnClick(){

    // }

    // onPetHomeBtnClick(){

    // }

    // onStoreBtnClick(){

    // }

    // onExit(){
    //     this.node.getChildByName("equip").active = false;
    // }
}
