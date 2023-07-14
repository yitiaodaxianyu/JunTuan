import { UILayerLevel } from "./UIConfig";

/**UI行为接口 */
export interface UiAction{
    onClose?:Function;
    onRefresh?:Function;
}
/**UI总接口 */
export interface UiInterface  {
    /**ui的动作，有关闭和刷新等 */
    ui_aciton:UiAction;
    /**ui的路径 */
    ui_path:string;
    /**ui层级 */
    ui_layer_level:UILayerLevel;

    init(ui:UiAction);

    onClose();
    onRefresh(info?:any);
}
/**UI显示结果的接口 */
export interface UiAddResult{
    onCompleted(uiNode:cc.Node);
    onFail?();
}