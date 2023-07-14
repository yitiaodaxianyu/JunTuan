

const {ccclass, property} = cc._decorator;
//用于场景预加载
@ccclass
export default class LoadProgress extends cc.Component {

    @property({type:cc.ProgressBar,tooltip:'进度条组件'})
    loading_bar: cc.ProgressBar = null;

    @property({type:cc.Node,tooltip:'进度条光 '})
    loading_light: cc.Node = null;

    @property({tooltip:'需要预加载的场景名字'})
    scene_name: string = '';

    @property({type:[cc.Component.EventHandler],tooltip:'进度条加载完毕后的回调'})
    loaded_callback: cc.Component.EventHandler[] =[];
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }
    startLoad(name:string)
    {
        this.scene_name=name;
        this.node.active=true;
        cc.director.preloadScene(this.scene_name, this.onProgress.bind(this), ()=>{
            //cc.director.loadScene("GameScene");
            if(this.loaded_callback.length>0)
            {
                for(let i=0; i<this.loaded_callback.length; i++)
                {
                    this.loaded_callback[i].emit(null);
                }
            }else
            {
                cc.director.loadScene(this.scene_name);
            }

        })    
    }

    onProgress(completedCount,totalCount,item){
        this.node.active=true;
        this.loading_bar.progress = completedCount/totalCount;
        this.loading_light.x = this.loading_bar.progress*this.loading_bar.totalLength-this.loading_bar.totalLength/2;
    }
}
