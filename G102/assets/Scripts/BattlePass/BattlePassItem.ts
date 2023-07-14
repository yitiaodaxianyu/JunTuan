import ApkManager from "../Ads/ApkManager";
import GameManager from "../GameManager";
import { Follow_Type } from "../multiLanguage/FollowConstants";
import FollowManager from "../multiLanguage/FollowManager";
import LanguageManager from "../multiLanguage/LanguageManager";
import { PropManager } from "../Prop/PropManager";
import { PropAction, PropId } from "../Prop/PropConfig";
import { SoundIndex } from "../Sound/AudioConstants";
import { BattlePassDataManager } from "./BattlePassData";
import { BattlePassClaimType, BattlePassManager } from "./BattlePassManager";
import { PayManager } from "../Payment/PayManager";
import TextLanguage from "../multiLanguage/TextLanguage";


const {ccclass, property} = cc._decorator;

const google_id:string = 'b501';

@ccclass
export default class BattlePassItem extends cc.Component {

    @property(cc.Prefab)
    prefab_lock: cc.Prefab = null;

    @property(cc.Prefab)
    prefab_claimed: cc.Prefab = null;

    // @property(cc.Prefab)
    // mask:cc.Prefab = null;
    
    id:number=0;
    pos_xx:number[]=[-205,90,205];
    cur_level:number=0;
    //刷新后回调
    refresh_callback:Function=null;
    //购买回调
    buy_callback:Function=null;

    // private google_id:string = 'b501';

    init(id:number,loadLevel:number,clickCallback:Function,buyCallback?:Function){
        this.id=id;
        this.cur_level=loadLevel;
        this.refresh_callback=clickCallback;
        this.buy_callback=buyCallback;
        this.loadItem();
        this.refreshData();
    }

    loadItem(){
        let bpdm=BattlePassDataManager.getInstance();
        // let boxM=GameManager.getInstance().box_json_data;
        let jsonData=bpdm.getJsonBattlePassData(this.id);

        let clickEvent=new cc.Component.EventHandler();
        clickEvent.target=this.node;
        clickEvent.component='BattlePassItem';
        clickEvent.handler='clickBtnClaim';

        // try{
        let item0=PropManager.getInstance().createPropItem(jsonData.FreeRewardItem,jsonData.FreeRewardNum,PropAction.Null);

        item0.getComponent(cc.Button).clickEvents.push(clickEvent);

        // let item0=boxM.createBoxItem(jsonData.FreeRewardItem,jsonData.FreeRewardNum);
        this.node.addChild(item0);
        item0.x=this.pos_xx[0];
        item0.name='item0';
        let item1=PropManager.getInstance().createPropItem(PropId.Gem,jsonData.SeniorRewardGem,PropAction.Null);
        item1.getComponent(cc.Button).clickEvents.push(clickEvent);
        // let item1=boxM.createBoxItem(PropId.Gem,jsonData.SeniorRewardGem);
        this.node.addChild(item1);
        item1.x=this.pos_xx[1];
        item1.name='item1';
        let item2=PropManager.getInstance().createPropItem(jsonData.SeniorRewardItem,jsonData.SeniorRewardNum,PropAction.Null);
        item2.getComponent(cc.Button).clickEvents.push(clickEvent);
        // let item2=boxM.createBoxItem(jsonData.SeniorRewardItem,jsonData.SeniorRewardNum);
        this.node.addChild(item2);
        item2.x=this.pos_xx[2];
        item2.name='item2';
        // }catch(error){
        //     console.log(error,jsonData)
        // }
    }

    refreshData(){        
        //是否需要加锁
        let curLevel=BattlePassManager.getCurLevel();
        let isBuy=BattlePassManager.is_buy;
        let isLock=curLevel<this.cur_level;
        if(isLock){
            this.addLock(0);
            this.addLock(1);
            this.addLock(2);
            // let mask = cc.instantiate(this.mask);
            // this.node.addChild(mask);
        }else{
            this.removeLock(0);
            if(isBuy){                
                this.removeLock(1);
                this.removeLock(2);
            }else{
                this.addLock(1);
                this.addLock(2);
            }
        }
        //设置领取状态
        let btnClaim=this.node.getChildByName('btnClaim').getComponent(cc.Button);
        let claimText=this.node.getChildByName('claimText').getComponent(TextLanguage);
        claimText.node.zIndex=1;
        let claimState0=BattlePassManager.getClaimState(BattlePassClaimType.Free,this.id);
        let claimState1=BattlePassManager.getClaimState(BattlePassClaimType.Buy,this.id);
        claimText.setTextId(100011);
        let isClaimOk=claimState0>0&&claimState1>0;
        btnClaim.interactable=!isLock&&!isClaimOk;
        if(claimState0>0&&claimState1<=0){
            // claimText.setLanguageIndex(LanguageIndex.ContinueClaim);
        }
        claimText.node.color=btnClaim.interactable?cc.color(124,82,13):cc.color(91,91,91);
        if(isClaimOk){
            claimText.setTextId(100013);
            claimText.node.color=cc.color(242,225,172);
            btnClaim.node.active=false;
        }
        if(claimState0>0){
            this.addClaim(0);
        }
        if(claimState1>0){
            this.addClaim(1);
            this.addClaim(2);
        }
    }

    addLock(index:number){
        let lock=this.node.getChildByName('lock'+index);
        if(!lock){
            let item=this.node.getChildByName('item'+index);        
            let lock=cc.instantiate(this.prefab_lock);
            lock.x=item.x+item.width/2*item.scaleX;
            lock.y=item.y+item.height/2*item.scaleY;
            lock.name='lock'+index;
            this.node.addChild(lock);
        }        
    }

    removeLock(index:number){
        let lock=this.node.getChildByName('lock'+index);
        if(lock){
            lock.removeFromParent();
        }
    }

    addClaim(index:number){
        let claimed=this.node.getChildByName('claimed'+index);
        if(!claimed){
            let item=this.node.getChildByName('item'+index);
            let claimed=cc.instantiate(this.prefab_claimed);
            claimed.x=item.x;
            claimed.y=item.y;
            claimed.name='claimed'+index;
            this.node.addChild(claimed);
        }        
    }

    removeClaim(index:number){
        let claimed=this.node.getChildByName('claimed'+index);
        if(claimed){
            claimed.removeFromParent();
        }
    }

    toClaimFree(isShow:boolean):cc.Node{        
        let curLevel=BattlePassManager.getCurLevel();
        let isUnLock=curLevel>=this.cur_level;
        let bpdm=BattlePassDataManager.getInstance();
        // let boxM=GameManager.getInstance().box_json_data;
        let jsonData=bpdm.getJsonBattlePassData(this.id);
        let state0=BattlePassManager.getClaimState(BattlePassClaimType.Free,this.id);
        let item=null;
        if(isUnLock&&state0<=0){
            // let rd=boxM.getRewardByid(jsonData.FreeRewardItem,jsonData.FreeRewardNum)
            // if(rd){
            //     item=boxM.createBoxItem(rd.reward_id,rd.reward_num);
            // }else{
            //     item=boxM.createBoxItem(jsonData.FreeRewardItem,jsonData.FreeRewardNum,true);
            // }
            item = PropManager.getInstance().createPropItem(jsonData.FreeRewardItem,jsonData.FreeRewardNum);
            BattlePassManager.saveClaimState(BattlePassClaimType.Free,this.id,1);
            if(isShow)
            GameManager.getInstance().showGetTip(item);
            //设置领取状态
            BattlePassManager.saveClaimState(BattlePassClaimType.Free,this.id,1);
            this.refreshData();
        }
        return item;
    }

    toClaimAll(isShow:boolean):cc.Node[]{
        let curLevel=BattlePassManager.getCurLevel();
        let isBuy=BattlePassManager.is_buy;
        let isUnLock=curLevel>=this.cur_level;

        let bpdm=BattlePassDataManager.getInstance();
        let PM=PropManager.getInstance();
        let jsonData=bpdm.getJsonBattlePassData(this.id);
        let nodes=new Array();
        let state0=BattlePassManager.getClaimState(BattlePassClaimType.Free,this.id);
        if(isUnLock&&state0<=0){
            PM.changePropNum(jsonData.FreeRewardItem,jsonData.FreeRewardNum)
            let item0=PM.createPropItem(jsonData.FreeRewardItem,jsonData.FreeRewardNum,PropAction.Look);
            nodes.push(item0);
            BattlePassManager.saveClaimState(BattlePassClaimType.Free,this.id,1);
            FollowManager.getInstance().followEvent(Follow_Type.战令免费奖励领取_x级+BattlePassDataManager.getInstance().getBattlePassLevel(this.id));
        }
        let state1=BattlePassManager.getClaimState(BattlePassClaimType.Buy,this.id);
        if(isBuy&&isUnLock&&state1<=0){
            let item1=PM.createPropItem(PropId.Gem,jsonData.SeniorRewardGem);
            let item2=PM.createPropItem(jsonData.SeniorRewardItem,jsonData.SeniorRewardNum,PropAction.Look);       
            PM.changePropNum(PropId.Gem,jsonData.SeniorRewardGem)
            PM.changePropNum(jsonData.SeniorRewardItem,jsonData.SeniorRewardNum)        
            nodes.push(item1);
            nodes.push(item2);
            BattlePassManager.saveClaimState(BattlePassClaimType.Buy,this.id,1);
            FollowManager.getInstance().followEvent(Follow_Type.战令高级奖励领取_x级+BattlePassDataManager.getInstance().getBattlePassLevel(this.id));
        }
        if(isShow&&nodes.length>0)
            GameManager.getInstance().showMultipleGetTip(nodes);
        //设置领取状态
        this.refreshData();
        return nodes;
    }

    clickBtnClaim(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        //在这里领取东西，并且刷新
        let isBuy=BattlePassManager.is_buy;
        if(isBuy){
            FollowManager.getInstance().followEvent(Follow_Type.战令高级奖励点击_x级+BattlePassDataManager.getInstance().getBattlePassLevel(this.id));
            this.toClaimAll(true);            
            if(this.refresh_callback){
                this.refresh_callback(this.id);
            }
        }else{            
            let state=BattlePassManager.getClaimState(BattlePassClaimType.Free,this.id);
            if(state<=0){
                FollowManager.getInstance().followEvent(Follow_Type.战令免费奖励点击_x级+BattlePassDataManager.getInstance().getBattlePassLevel(this.id));
                this.toClaimFree(true);
                if(this.refresh_callback){
                    this.refresh_callback(this.id);
                }
            }else{
                FollowManager.getInstance().followEvent(Follow_Type.战令继续领取_x级+BattlePassDataManager.getInstance().getBattlePassLevel(this.id));
                //弹出支付
                //cc.log('弹出支付提示')
                GameManager.getInstance().showBuyDialog(LanguageManager.getInstance().getStrByTextId(910002),()=>{
                    ApkManager.getInstance().showPay({result:(isPay:boolean)=>{
                        if(isPay){
                            PayManager.getInstance().addPayNum(google_id);
                            BattlePassManager.refreshBuyState();
                            if(this.buy_callback){
                                this.buy_callback();
                            }
                        }
                    }},google_id)
                },null,2,PayManager.getInstance().getPayInfo(google_id).price,PayManager.getInstance().getPayInfo(google_id).currency);
            }
        }
    }

    // update (dt) {}
}
