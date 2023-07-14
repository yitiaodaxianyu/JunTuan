
import { UILayerLevel } from "./UIConfig";
import { UiAction, UiInterface } from "./UiInterface";
import { UIManager } from "./UIManager";



const {ccclass, property} = cc._decorator;

@ccclass
export default class UIComponent extends cc.Component implements UiInterface  {
    ui_path: string='';
    ui_layer_level: UILayerLevel=UILayerLevel.One;

    ui_aciton: UiAction=null;
    

    onLoad(){
        let bg=this.node.getChildByName('bg');
        bg.width=800;
        bg.height=1642;
        bg.on(cc.Node.EventType.TOUCH_START,()=>{
            this.onClose();
        },this);
    }

    init(uiAc: UiAction) {
        this.ui_aciton=uiAc;
    }

    initUiData(uiPath:string,layerLevel:UILayerLevel){
        this.ui_path=uiPath;
        this.ui_layer_level=layerLevel;
    }

    onRefresh(info?:any) {
        if(this.ui_aciton&&this.ui_aciton.onRefresh){
            this.ui_aciton.onRefresh(info);
        }
    }

    onClose() {
        // cc.log('UIComponent');
        if(this.ui_aciton&&this.ui_aciton.onClose){
            this.ui_aciton.onClose();
        }
        //this.node.removeFromParent(false);
        //this.node.destroy();        
        UIManager.getInstance().closeUiDialog(this.ui_path,this.ui_layer_level,this.node);
    }

}
