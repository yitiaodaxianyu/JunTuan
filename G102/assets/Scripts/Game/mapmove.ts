const {ccclass, property} = cc._decorator;

@ccclass
export default class Tutorials extends cc.Component {

    @property(cc.Node)
    target:cc.Node = null;
    @property(cc.Node)
    zone:cc.Node= null;// 宽高就是拖拽区域
    parent:cc.Node=null

    bgOrigin=null
    onLoad() {
        return
        this.parent = this.node.parent;
        // this.bgOrigin = cc.v2(0, 0);
        this.bgOrigin = this.target.position.sub(cc.v3(this.target.width * this.target.anchorX * this.target.scaleX, this.target.height * this.target.anchorY * this.target.scaleY,0));
        this.target.on(cc.Node.EventType.TOUCH_MOVE, this._touchMove, this);
    }

    _touchMove(event) {

        let touches = event.getTouches();
        if (touches.length >= 2) {
            return  
            let touch1 = touches[0],
                touch2 = touches[1],
                delta1 = touch1.getDelta(),
                delta2 = touch2.getDelta();

            // 得到当前两触摸点 转到parent下坐标
            let touchPoint1 = this.parent.convertToNodeSpaceAR(touch1.getLocation());
            let touchPoint2 = this.parent.convertToNodeSpaceAR(touch2.getLocation());

            // 转换为坐标 进行向量计算
            touchPoint1 = cc.v2(touchPoint1.x, touchPoint1.y);
            touchPoint2 = cc.v2(touchPoint2.x, touchPoint2.y);

            // 两触摸点与原点的差向量，pointVec1和pointVec2是相对于bgSprite的位置
            let pointVec1 = touchPoint1.sub(this.bgOrigin);
            let pointVec2 = touchPoint2.sub(this.bgOrigin);

            // 两触摸点的相对中点
            let relMidx = (pointVec1.x + pointVec2.x) / 2;
            let relMidy = (pointVec1.y + pointVec2.y) / 2;

            // 计算bgSprite的锚点
            let anchorX = relMidx / (this.target.width * this.target.scale);
            let anchorY = relMidy / (this.target.height * this.target.scale);

            // 相对屏幕的中点
            let absMidx = (touchPoint2.x + touchPoint1.x) / 2;
            let absMidy = (touchPoint2.y + touchPoint1.y) / 2;

            // 重设bgSprite锚点和位置
            this.target.anchorX = anchorX;
            this.target.anchorY = anchorY;

            this.target.x = absMidx;
            this.target.y = absMidy;

            // this.startPoint = cc.v2(event.getLocation().x,event.getLocation().y); //取起始点向量
            // this.endPoint = cc.v2(event.getLocation().x,event.getLocation().y); //取终点向量
            // let vec = this.endPoint.sub(this.startPoint); //向量相减，得到目标向量
            // let distance = vec.mag(); //取向量的模长

            //缩放
            let distancevec = touchPoint2.sub(touchPoint1)
            let distance = distancevec//.mag()//cc.pSub(touchPoint1, touchPoint2);

            let deltavec = delta2.sub(delta1)
            let delta =deltavec//.mag() //cc.pSub(delta1, delta2);
            let scale = 1;
            if (Math.abs(distance.x) > Math.abs(distance.y)) {
                scale = (distance.x + delta.x) / distance.x * this.target.scale;
            }
            else {
                scale = (distance.y + delta.y) / distance.y * this.target.scale;
            }

            if(scale<1){
                scale=1
            }
            if(scale>2){
                scale=2
            }
            this.target.scale = scale < 0.1 ? 0.1 : scale;
            // 更新原点位置
            this.bgOrigin = cc.v2(absMidx, absMidy).sub(cc.v2(this.target.width * anchorX * this.target.scaleX, this.target.height * anchorY * this.target.scaleY));

        } else if (touches.length == 1) {

            
            let delta = event.getDelta();
            this.target.x += delta.x;
            this.target.y += delta.y;
            //判断左边距离
            let zoneLeft = this.zone.x - this.zone.width / 2;
            let zoneRight = this.zone.x + this.zone.width / 2;
            let zoneTop = this.zone.y + this.zone.height / 2;
            let zoneBottom = this.zone.y - this.zone.height / 2;

            let halfMapWidth = this.target.width / 2;
            let halfMapHeight = this.target.height / 2;

            //左边
            if (this.target.x - halfMapWidth > zoneLeft) {
                this.target.x = zoneLeft + halfMapWidth;
            }
            //右边
            if (this.target.x + halfMapWidth < zoneRight) {
                this.target.x = zoneRight - halfMapWidth;
            }
            //上边
            if (this.target.y + halfMapHeight < zoneTop) {
                this.target.y = zoneTop - halfMapHeight;
            }
            //下边
            if (this.target.y - halfMapHeight > zoneBottom) {
                this.target.y = zoneBottom + halfMapHeight;
            }

        }
    }
}