const {ccclass, property} = cc._decorator;

@ccclass
export default class WishingEffectUi extends cc.Component {

    // onLoad () {}

    start () {
        let skeleton = this.node.getComponent(sp.Skeleton);
        skeleton.setCompleteListener((trackEnter:sp.spine.TrackEntry)=>{
            this.node.destroy();
        })
    }
}
