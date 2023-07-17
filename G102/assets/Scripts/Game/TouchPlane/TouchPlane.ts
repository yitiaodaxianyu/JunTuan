// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameManager from "../../GameManager";

const { ccclass, property } = cc._decorator;
/**
 * 全局事件监听实例
 */
export const instance = new cc.EventTarget();

/**
 * 点击左边或者右边
 */
export enum DirectionType {
    LEFT,
    RIGHT
}
@ccclass
export default class TouchPlane extends cc.Component {




    start() {

    }
    protected onLoad(): void {
        this._initTouchEvent();
    }
    /**
   * 初始化触摸事件
   */
    _initTouchEvent() {
        // set the size of joystick node to control scale
        // this.node.on(cc.Node.EventType.TOUCH_START, this._touchStartEvent, this);
        // this.node.on(cc.Node.EventType.TOUCH_MOVE, this._touchMoveEvent, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this._touchEndEvent, this);
        // this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._touchEndEvent, this);
    }
    protected onDestroy(): void {
        this._offTouchEvent();
    }
    /**
  * 初始化触摸事件
  */
    _offTouchEvent() {
        // set the size of joystick node to control scale
        // this.node.off(cc.Node.EventType.TOUCH_START, this._touchStartEvent, this);
        // this.node.off(cc.Node.EventType.TOUCH_MOVE, this._touchMoveEvent, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this._touchEndEvent, this);
        // this.node.off(cc.Node.EventType.TOUCH_CANCEL, this._touchEndEvent, this);
    }
    /**
   * 触摸结束回调函数
   * @param event
   */
    _touchEndEvent(event: cc.Event.EventTouch) {
        const touchPos = this.node.convertToNodeSpaceAR(event.getLocation());

        let directiontype = DirectionType.LEFT;
        let cheWeiPos: number = (GameManager.getInstance().aniType - 2) * 150;
        if (touchPos.x > cheWeiPos) {
            directiontype = DirectionType.RIGHT;
            if (GameManager.getInstance().aniType < 4) {
                GameManager.getInstance().aniType++;
            }
        } else {
            if (GameManager.getInstance().aniType > 0) {
                GameManager.getInstance().aniType--;
            }
        }

        instance.emit(cc.Node.EventType.TOUCH_END, event, {
            directionType: directiontype,
        });
    }
}
