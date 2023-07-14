import { FuncType, GameMode } from "../../Constants";
import GameManager from "../../GameManager";
import { HeroManager } from "../../Hero/Data/HeroManager";
import { Hero_Type } from "../../Hero/Game/HeroConfig";
import BtnHero from "../../Hero/Ui/BtnHero";
import { FunctionDefinitionManager } from "../../JsonData/FunctionDefinition";
import { MazeManager } from "../../Maze/MazeManager";
import LanguageManager from "../../multiLanguage/LanguageManager";
import { LeaseType, PetInfo, PetType } from "../../Pet/PetConfig";
import { PetManager } from "../../Pet/PetManager";
import BtnPet from "../../Pet/Ui/BtnPet";
import PetItem from "../../Pet/Ui/PetItem";
import { SoundIndex } from "../../Sound/AudioConstants";
import TutorailsManager from "../../Tutorials/TutorailsManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ToPlayUi extends cc.Component {

    @property(cc.Prefab)
    item:cc.Prefab = null;

    hero_team_rect: cc.Rect[] = [];
    pet_team_rect: cc.Rect[] = [];

    hero_touch_icon: cc.Node = null;
    pet_touch_icon: cc.Node = null;
    pet_list_touch_icon: cc.Node = null;

    hero_select:cc.Node = null;
    pet_select:cc.Node = null;

    hero_team_pos: cc.Vec2[] = [];
    pet_team_pos: cc.Vec2[] = [];

    offset_x:number = 0;
    offset_y:number = 0;
    
    private state: PetType = PetType.All;
    // private all_list: PetInfo[] = null;
    // private power_list: PetInfo[] = null;
    // private agile_list: PetInfo[] = null;
    // private intelligence_list: PetInfo[] = null;

    private content: cc.Node = null;

    start() {
        this.initSelectPart();
        this.content = this.node.getChildByName("scroll0").getComponent(cc.ScrollView).content;
        this.refreshScroll();
    }

    initSelectPart() {
        this.hero_select = this.node.getChildByName("heroSelect");
        this.pet_select = this.node.getChildByName("petSelect");
        this.node.getChildByName("tipLabel1").getComponent(cc.Label).string = LanguageManager.getInstance().getStrByTextId(130002);
        this.node.getChildByName("tipLabel2").getComponent(cc.Label).string = LanguageManager.getInstance().getStrByTextId(640009);
        this.hero_select.active = false;
        this.pet_select.active = false;
        let hero = HeroManager.getInstance().getTeamList(GameManager.getInstance().cur_game_mode);
        for (let i = 1; i < Hero_Type.Hero_Num; i++) {
            let heroIcon = this.node.getChildByName("btn_hero" + i);
            let size = heroIcon.getContentSize();
            let pos = heroIcon.getPosition();
            this.hero_team_rect.push(cc.rect(pos.x-size.width/2,pos.y-size.height/2,size.width,size.height));
            this.hero_team_pos.push(pos);
            let petIcon = this.node.getChildByName("btn_pet" + i);
            let petPos = petIcon.getPosition();
            let petSize = petIcon.getContentSize();
            this.pet_team_rect.push(cc.rect(petPos.x-petSize.width/2,petPos.y-petSize.height/2,petSize.width,petSize.height));
            this.pet_team_pos.push(petPos);
            if (HeroManager.getInstance().getHeroLevel(hero[i-1]) > 0) {
                if(hero[i-1] < Hero_Type.ChangMaoShou) continue;
                heroIcon.getComponent(BtnHero).init(hero[i-1]);
                heroIcon.on(cc.Node.EventType.TOUCH_START, this.onHeroTouchStart, this);
                heroIcon.on(cc.Node.EventType.TOUCH_MOVE, this.onHeroTouchMove, this);
                heroIcon.on(cc.Node.EventType.TOUCH_END, this.onHeroTouchEnd, this);
                heroIcon.on(cc.Node.EventType.TOUCH_CANCEL, this.onHeroTouchCancel, this);
            }
        }

    }

    refreshScroll() {
        this.node.getChildByName("selectTypeBg").setPosition(this.node.getChildByName("type" + this.state).position)
        // this.all_list = new Array<PetInfo>();
        // this.power_list = new Array<PetInfo>();
        // this.agile_list = new Array<PetInfo>();
        // this.intelligence_list = new Array<PetInfo>();this.node.children[3]
        this.content.removeAllChildren();
        // this.all_list = PetManager.getInstance().getPetList();
        // for (let i = 0; i < this.all_list.length; i++) {
            //     let type = SpiritMessageManager.getInstance().getSpiritType(this.all_list[i].pet_id);
            //     if (type == PetType.Power) {
                //         this.power_list.push(this.all_list[i]);
                //     } else if (type == PetType.Agile) {
                    //         this.agile_list.push(this.all_list[i]);
                    //     } else {
                        //         this.intelligence_list.push(this.all_list[i]);
                        //     }
                        // }
        // let tempList = this.all_list;
        // if (GameManager.getInstance().cur_game_mode == GameMode.Maze) {
        //     let leaseList = MazeManager.getInstance().getLeasePetList();
        //     if(leaseList.length != 0){
        //         tempList = tempList.concat(leaseList);
        //         PetManager.getInstance().sortPetList(tempList);
        //     }
        // }
        // switch (this.state) {
        //     case PetType.All:
        //         tempList = this.all_list;
        //         break;
            // case PetType.Power:
            //     tempList = this.power_list;
            //     break;
            // case PetType.Agile:
            //     tempList = this.agile_list;
            //     break;
            // case PetType.Intelligence:
            //     tempList = this.intelligence_list
            //     break;
        // }
        // for (let i = 0; i < tempList.length; i++) {
        //     let item = cc.instantiate(this.item);
        //     item.getComponent(PetItem).init(tempList[i]);
        //     item.getComponent(PetItem).initToPlay();
        //     item.scale = 0.75;
        //     item.setParent(this.content);

        //     if(tempList[i].lease_type != LeaseType.Null){
        //         let lease_Icon = new cc.Node();
        //         lease_Icon.addComponent(cc.Sprite).spriteFrame = PetManager.getInstance().getSpriteFrameByName("Sprite_Icon_Rent")
        //         item.addChild(lease_Icon);
        //         lease_Icon.setPosition(cc.v2(-(item.width/2) + 20,(item.height/2) - 10));
        //     }
            
        //     item.on(cc.Node.EventType.TOUCH_START, this.onListPetTouchStart, this);
        //     item.on(cc.Node.EventType.TOUCH_MOVE, this.onListPetTouchMove, this);
        //     item.on(cc.Node.EventType.TOUCH_END, this.onListPetTouchEnd, this);
        //     item.on(cc.Node.EventType.TOUCH_CANCEL, this.onListPetTouchCancel, this);

            
        // }
    }

    refreshSelectPart(){
        let hero = HeroManager.getInstance().getTeamList(GameManager.getInstance().cur_game_mode);
        for (let i = 1; i < Hero_Type.Hero_Num; i++) {
            if(hero[i-1] < Hero_Type.ChangMaoShou) continue;
            
            let heroIcon = this.node.getChildByName("btn_hero" + i);

            heroIcon.getComponent(BtnHero).init(hero[i-1]);


            let petIcon = this.node.getChildByName("btn_pet" + i);
            if(HeroManager.getInstance().getHeroData(hero[i-1]).pet_info != null){
                petIcon.getComponent(BtnPet).init(HeroManager.getInstance().getHeroData(hero[i-1]).pet_info);
            }else{
                if(FunctionDefinitionManager.getInstance().getIsUnlock(FuncType.ChongWuXiTong)){
                    petIcon.getComponent(BtnPet).showNull();
                }else{

                }
            }
        }
    }

    onHeroTouchStart(e:cc.Event.EventTouch) {
        let touchTeam=e.getCurrentTarget();
        let btnTeam=touchTeam.getComponent(BtnHero);
        let teamList=HeroManager.getInstance().getTeamList(GameManager.getInstance().cur_game_mode);
        let touchIndex=teamList[btnTeam.team_index];

        let petBtnTeam = this.node.getChildByName("btn_pet" + (btnTeam.team_index + 1)).getComponent(BtnPet);
        if(this.hero_touch_icon!=null)
        {
            this.hero_touch_icon.removeFromParent();
            this.hero_touch_icon=null;
        }
        if(this.pet_touch_icon != null){
            this.pet_touch_icon.removeFromParent();
            this.pet_touch_icon = null;
        }
        if(touchIndex>=Hero_Type.ChangMaoShou)
        {
            let icon=btnTeam.icon;
            this.hero_touch_icon=cc.instantiate(icon);
            this.hero_touch_icon.anchorY=0.5;
            GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
            let pos=this.node.convertToNodeSpaceAR(e.getLocation());
            this.hero_touch_icon.parent=this.node;
            this.hero_touch_icon.setPosition(pos);

            if(HeroManager.getInstance().getHeroData(touchIndex).pet_info != null){
                let petIcon = petBtnTeam.icon;
                this.pet_touch_icon = cc.instantiate(petIcon);
                this.pet_touch_icon.anchorY = 0.5;
                this.offset_x = btnTeam.node.x - petBtnTeam.node.x;
                this.offset_y = btnTeam.node.y - petBtnTeam.node.y;
                let petPos = cc.v2(this.hero_touch_icon.x - this.offset_x,this.hero_touch_icon.y - this.offset_y);
                this.pet_touch_icon.parent = this.node;
                this.pet_touch_icon.setPosition(petPos);
            }
        }
    }

    onHeroTouchMove(e:cc.Event.EventTouch) {
        if(this.hero_touch_icon)
        {
            let touchTeam=e.getCurrentTarget();
            let btnTeam=touchTeam.getComponent(BtnHero);
            let teamList=HeroManager.getInstance().getTeamList(GameManager.getInstance().cur_game_mode);
            let posIndex=btnTeam.team_index;
            let pos=this.node.convertToNodeSpaceAR(e.getLocation());

            this.hero_touch_icon.setPosition(pos);
            
            if(this.pet_touch_icon){
                let petPos = cc.v2(this.hero_touch_icon.x - this.offset_x,this.hero_touch_icon.y - this.offset_y);            
                this.pet_touch_icon.setPosition(petPos);
            }

            let conIndex=-1;
            let isCanPlace=false;
            for(let i=0; i<this.hero_team_rect.length; i++)
            {
                if(this.hero_team_rect[i].contains(pos)==true)
                {                    
                    conIndex=i;
                    break;
                }
            }
            //判断该点是否有解锁
            if(conIndex>=0 && posIndex!=conIndex)
            {
                isCanPlace=true;
                if(teamList[conIndex] < 1) return;              
                this.hero_select.setPosition(this.hero_team_pos[conIndex]);
                if(this.pet_team_pos[conIndex]){
                    this.pet_select.setPosition(this.pet_team_pos[conIndex]);
                }
            }
            this.hero_select.active=isCanPlace;
            if(this.pet_touch_icon){
                this.pet_select.active = isCanPlace;
            }
        }
    }

    onHeroTouchEnd(e:cc.Event.EventTouch) {
        if(this.hero_touch_icon)
        {
            // console.log("结束点击事件")
            let hero = HeroManager.getInstance().getTeamList(GameManager.getInstance().cur_game_mode);

            this.hero_select.active=false;
            this.pet_select.active=false;
            this.hero_touch_icon.removeFromParent();
            this.hero_touch_icon=null;

            if(this.pet_touch_icon){
                this.pet_touch_icon.removeFromParent();
                this.pet_touch_icon = null;
            }

            let touchTeam=e.getCurrentTarget();
            let btnTeam=touchTeam.getComponent(BtnHero);
            // let teamIndex=btnTeam.team_index;
            let pos=this.node.convertToNodeSpaceAR(e.getLocation());
            let conIndex=-1;
            for(let i=0; i<this.hero_team_rect.length; i++)
            {
                if(this.hero_team_rect[i].contains(pos)==true)
                {                    
                    conIndex=i;
                    break;
                }
            }
            if(conIndex != -1){
                if(hero[conIndex] < 1) return;
                HeroManager.getInstance().saveTeamList(GameManager.getInstance().cur_game_mode,this.exchangeIndex
                (conIndex,btnTeam.team_index,hero));
                // console.log(HeroManager.getInstance().getTeamList(GameManager.getInstance().cur_game_mode))
                this.refreshSelectPart();
            }
        }
    }

    onHeroTouchCancel(e:cc.Event.EventTouch) {
        if(this.hero_touch_icon)
        {
            let hero = HeroManager.getInstance().getTeamList(GameManager.getInstance().cur_game_mode);

            this.hero_select.active=false;
            this.pet_select.active=false;
            this.hero_touch_icon.removeFromParent();
            this.hero_touch_icon=null;

            if(this.pet_touch_icon){
                this.pet_touch_icon.removeFromParent();
                this.pet_touch_icon = null;
            }

            //判断是否需要换阵或者下阵
            let touchTeam=e.getCurrentTarget();
            let btnTeam=touchTeam.getComponent(BtnHero);
            let teamIndex=btnTeam.team_index;
            let pos=this.node.convertToNodeSpaceAR(e.getLocation());
            let conIndex=-1;
            for(let i=0; i<this.hero_team_rect.length; i++)
            {
                if(this.hero_team_rect[i].contains(pos)==true)
                {                    
                    conIndex=i;
                    break;
                }
            }
            if(conIndex != -1){
                if(hero[conIndex] < 1) return;
                HeroManager.getInstance().saveTeamList(GameManager.getInstance().cur_game_mode,this.exchangeIndex
                (conIndex,btnTeam.team_index,hero));
                this.refreshSelectPart();
            }
        }
    }

    onSelectBtnClick(e,type:number){
        this.state = Number(type)
        for (let i = 0; i < 4; i++) {
            let scroll = this.node.getChildByName("scroll" + i);
            scroll.active = false;
            if (i == this.state) {
                scroll.active = true;
                this.content = scroll.getComponent(cc.ScrollView).content;
            }
        }
        this.node.getChildByName("selectTypeBg").setPosition(this.node.getChildByName("type" + this.state).position)
        if(this.content.childrenCount == 0){
            // 刷新宠物列表
            this.refreshScroll();
        }
    }

    exchangeIndex(pos1:number,pos2:number,teamList:number[]):number[]{
        let temp = teamList[pos1];
        teamList[pos1] = teamList[pos2];
        teamList[pos2] = temp;
        return teamList;
    }

    exchangePet(hero1:Hero_Type,hero2:Hero_Type){
        let temp = HeroManager.getInstance().getHeroData(hero1).pet_info;
        let temp2 = HeroManager.getInstance().getHeroData(hero2).pet_info;
        // console.log(temp,temp2);
        temp2.changeBindHero(temp,hero1);
        // console.log(HeroManager.getInstance().getHeroData(hero1).pet_info,HeroManager.getInstance().getHeroData(hero2).pet_info);
    }

    onClickIndentationBtn(e,index:number){
        let pos;
        if(index == 1){
            pos = cc.v3(0,this.node.y - this.node.getChildByName("Prepare_Bg_2").height - 25,0);
        }else{
            pos = cc.v3(0,this.node.y + this.node.getChildByName("Prepare_Bg_2").height + 25,0);
        }
        cc.tween(this.node).to(0.2,{position:pos}).call(()=>{
            if(index == 1){
                this.node.getChildByName("indentation1").active = false
                this.node.getChildByName("indentation2").active = true
            }else{
                this.node.getChildByName("indentation1").active = true
                this.node.getChildByName("indentation2").active = false
            }
        }).start();
    }

}
