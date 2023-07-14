import MainWall from "./MainWall";
import Wall from "./Wall";
import { WallType } from "./WallConfig";


const {ccclass, property} = cc._decorator;

@ccclass
export default class WallManager extends cc.Component {

    private static _instance: WallManager = null;

    private map_wall:Map<WallType,Wall>=null;
    private main_wall:MainWall=null;

    public static getInstance():WallManager
    {
        return this._instance;
    }

    onLoad () {
        WallManager._instance=this;
        this.setMainWall();
        this.map_wall=new Map<WallType,Wall>();   
    }

    onDestroy(): void {
        this.map_wall.clear();
        WallManager._instance=null;        
    }

    /**添加一个墙体 */
    addWall(wallId:WallType,wall:Wall){
        let oldWall=this.map_wall.get(wallId);
        if(oldWall&&wallId){
            oldWall.destroyWall();
        }
        this.map_wall.set(wallId,wall);
    }
    /**移除指定的墙体 */
    removeWall(id:WallType){
        this.map_wall.delete(id);
    }
    /**获得所有墙体数据 */
    getAllWall():Map<WallType,Wall>{
        return this.map_wall;
    }
    /**获得一个墙体数据 */
    getAWall(wallId:WallType):Wall{
        return this.map_wall.get(wallId);
    }
    
    private setMainWall(){
        this.main_wall=cc.find('Canvas/wall_bg').getComponent(MainWall);     
    }
    /**获得主城墙 */
    getMainWall():MainWall{
        return this.main_wall;
    }
}
