"use strict";
cc._RF.push(module, 'faa44fMLnZCSYwR2eftg3QS', 'SpiritAptitude');
// Scripts/Pet/Data/SpiritAptitude.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpiritAptitudeManager = exports.JsonSpiritAptitude = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonSpiritAptitude = /** @class */ (function () {
    function JsonSpiritAptitude() {
        /**资质ID */
        this.Aptitude = 0;
        /**灵宠ID */
        this.SpiritId = 0;
        /**当前品质 */
        this.CurrentQuality = 0;
        /**协力 */
        this.Cooperation = 0;
        /**守护 */
        this.defend = 0;
        /**同心 */
        this.OneHeart = 0;
        /**命中值 */
        this.Hit = 0;
        /**闪避值 */
        this.Miss = 0;
        /**暴击值 */
        this.Critical = 0;
        /**暴击增幅 */
        this.ExtraCritical = 0;
        /**防暴值 */
        this.AntiCritical = 0;
        /**暴击抗性 */
        this.AntiExtraCritical = 0;
    }
    return JsonSpiritAptitude;
}());
exports.JsonSpiritAptitude = JsonSpiritAptitude;
var SpiritAptitudeManager = /** @class */ (function () {
    function SpiritAptitudeManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    SpiritAptitudeManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new SpiritAptitudeManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    SpiritAptitudeManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    SpiritAptitudeManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('SpiritAptitude', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonSpiritAptitude成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonSpiritAptitude();
                jsonData = json[i];
                _this.data.set(jsonData.Aptitude, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    SpiritAptitudeManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    SpiritAptitudeManager.prototype.getJsonSpiritAptitude = function (id) {
        return this.data.get(id);
    };
    /**根据资质ID获取灵宠ID */
    SpiritAptitudeManager.prototype.getSpiritId = function (id) {
        return this.data.get(id).SpiritId;
    };
    /**根据资质ID获取当前品质 */
    SpiritAptitudeManager.prototype.getCurrentQuality = function (id) {
        return this.data.get(id).CurrentQuality;
    };
    /**根据资质ID获取协力 */
    SpiritAptitudeManager.prototype.getCooperation = function (id) {
        return this.data.get(id).Cooperation;
    };
    /**根据资质ID获取守护 */
    SpiritAptitudeManager.prototype.getdefend = function (id) {
        return this.data.get(id).defend;
    };
    /**根据资质ID获取同心 */
    SpiritAptitudeManager.prototype.getOneHeart = function (id) {
        return this.data.get(id).OneHeart;
    };
    /**根据资质ID获取命中值 */
    SpiritAptitudeManager.prototype.getHit = function (id) {
        return this.data.get(id).Hit;
    };
    /**根据资质ID获取闪避值 */
    SpiritAptitudeManager.prototype.getMiss = function (id) {
        return this.data.get(id).Miss;
    };
    /**根据资质ID获取暴击值 */
    SpiritAptitudeManager.prototype.getCritical = function (id) {
        return this.data.get(id).Critical;
    };
    /**根据资质ID获取暴击增幅 */
    SpiritAptitudeManager.prototype.getExtraCritical = function (id) {
        return this.data.get(id).ExtraCritical;
    };
    /**根据资质ID获取防暴值 */
    SpiritAptitudeManager.prototype.getAntiCritical = function (id) {
        return this.data.get(id).AntiCritical;
    };
    /**根据资质ID获取暴击抗性 */
    SpiritAptitudeManager.prototype.getAntiExtraCritical = function (id) {
        return this.data.get(id).AntiExtraCritical;
    };
    /** 静态方法，获取最大的 资质ID*/
    SpiritAptitudeManager.getMaxAptitude = function () {
        return 2110;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    /**
     *
     * @param petId 宠物id
     * @param petQuality 宠物品质
     */
    SpiritAptitudeManager.getId = function (petId, petQuality) {
        return petId * 100 + petQuality;
    };
    SpiritAptitudeManager._instance = null;
    return SpiritAptitudeManager;
}());
exports.SpiritAptitudeManager = SpiritAptitudeManager;

cc._RF.pop();