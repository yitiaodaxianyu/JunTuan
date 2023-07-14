import MonsterNormal from "./Monster/MonsterNormal";
import { GameScene } from "./Constants";
import { MonsterDataManager } from "./Monster/Data/MonsterDataManager";
import GameManager from "./GameManager";
import { ZhenXingData } from "./ZhenXingData";
import HpTextHpManager from "./Monster/HpTextManager";
import { HttpManager } from "./NetWork/HttpManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ZXEdit extends cc.Component {

    protected onLoad(): void {
        cc.director.getCollisionManager().enabled = true;        
        cc.director.getCollisionManager().enabledDebugDraw=true;
    }

    protected start(): void {        
        this.show();
        HttpManager.testAES("可以吗");
    }

    show (){
        // init logic
        // let label=this.node.getChildByName('TestLabel').getComponent(cc.Label);
        // label.string = 'this.text';
        //  this.testAsync().then((str)=>{
        //     label.string =str;
        // }).catch((str)=>{
        //     label.string =str;
        // });
        let nowDate=new Date();
        let now=new Date().getTime()/1000;
        let ssN=new Date().toLocaleString()
        let yu=now%(24*60*60);
        let ling=now-yu+(nowDate.getTimezoneOffset()*60);
        let lngTime=new Date(ling*1000);
        let h=lngTime.getHours();
        let m=lngTime.getMinutes();
        let s=lngTime.getSeconds();
        //let ss3=lngTime.toTimeString()
    }
 
    async testAsync() : Promise<string> {
        return new Promise<string>((resolve, reject)=>{
            //resolve("liang miao yi hou ");
            reject("a miao yi hou ");
        });
    }

    clickBtnBossSkill(){
        GameManager.getInstance().cur_game_scene=GameScene.game;
        GameManager.getInstance().showBossWarning();
    }

    clickBtnCBoss(){
        let ss=cc.find('Canvas/HPText_Root').getComponent(HpTextHpManager);
        // ss.createHpTextHp(cc.v2(0,0),'-'+(Math.random()*9000+1000).toFixed(0),Enemy_Injured_Type.Normal_Attack);
        // ss.createHpTextHp(cc.v2(0,0),'-'+(Math.random()*9000+1000).toFixed(0),Enemy_Injured_Type.BaoJi);        
    }

    clickBtnTTT(){
        cc.director.loadScene('zhengxing');
    }

    clickBtnDownload()
    {
        //获取
        let root=this.node.getChildByName('root');
        //获取所有子节点
        let otherPos=new Array();
        let bossPos=cc.v2(0,0);
        let buffPos=new Array();
        let zhenRoot=root.children[0];
        let len=zhenRoot.childrenCount;
        for(let i=0; i<len; i++)
        {
            let node=zhenRoot.children[i];
            let pos=cc.v2(node.x,node.y);
            if(node.name=='1')
            {
                otherPos.push(pos);
            }else if(node.name=='boss')
            {
                bossPos=pos;
            }else if(node.name=='buff')
            {
                buffPos.push(pos);
            }            
        }
        let zxData=new ZhenXingData();
        zxData.boss_pos=bossPos;
        zxData.buff_pos=buffPos;
        zxData.other_pos=otherPos;
        var jsonData=JSON.stringify(zxData);
        let name="ZX"+root.children[0].name;
        this.saveForBrowser(jsonData,name+".json");
    }

    clickBtnTest()
    {
        let m2=this.node.getChildByName('Monster_02')
        this.node.getChildByName('Monster_01').getComponent(MonsterNormal).setAttTarget(m2);

    }

    clickBtnTest1()
    {

        
    }

    saveForBrowser(textToWrite, fileNameToSaveAs) {
        if (cc.sys.isBrowser) {
            console.log("浏览器");
            let textFileAsBlob = new Blob([textToWrite], {type:'application/json'});
            let downloadLink = document.createElement("a");
            downloadLink.download = fileNameToSaveAs;
            downloadLink.innerHTML = "Download File";
            if (window.webkitURL != null)
            {
                // Chrome allows the link to be clicked
                // without actually adding it to the DOM.
                downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
            }
            else
            {
                // Firefox requires the link to be added to the DOM
                // before it can be clicked.
                downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
                downloadLink.onclick = destroyClickedElement;
                downloadLink.style.display = "none";
                document.body.appendChild(downloadLink);
            }
            downloadLink.click();
        }
    }

}
