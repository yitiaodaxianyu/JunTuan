
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Sound/AudioConstants.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6f2b54I3alHs6HtmFKHawgU', 'AudioConstants');
// Scripts/Sound/AudioConstants.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoundIndex = exports.MusicIndex = void 0;
var MusicIndex;
(function (MusicIndex) {
    MusicIndex["BGM_Fuben"] = "BGM_Fuben";
    MusicIndex["BGM_GuajiBgm"] = "BGM_GuajiBgm";
    MusicIndex["BGM_MainCity"] = "BGM_MainCity";
    MusicIndex["BGM_Pets"] = "BGM_Pets";
    MusicIndex["BGM_RogueBgm"] = "BGM_RogueBgm";
    MusicIndex["BGM_Hero"] = "BGM_Hero";
    MusicIndex["BGM_Battle"] = "BGM_Battle";
    MusicIndex["BGM_XuYuan"] = "BGM_XuYuan";
    MusicIndex["BGM_KaiEggjiemian"] = "BGM_KaiEggjiemian";
    MusicIndex["BGM_TJP"] = "BGM_TJP";
    MusicIndex["BGM_Shop"] = "BGM_Shop";
    MusicIndex["BGM_Home"] = "BGM_Home";
})(MusicIndex = exports.MusicIndex || (exports.MusicIndex = {}));
var SoundIndex;
(function (SoundIndex) {
    SoundIndex["click"] = "click";
    SoundIndex["equipe"] = "equipe";
    SoundIndex["huishou"] = "huishou";
    SoundIndex["levelUp"] = "levelUp";
    SoundIndex["lvUp"] = "lvUp";
    SoundIndex["openskill"] = "openskill";
    SoundIndex["playerLvUp"] = "playerLvUp";
    SoundIndex["putdown"] = "putdown";
    SoundIndex["putHero"] = "putHero";
    SoundIndex["start"] = "start";
    //游戏中音效
    SoundIndex["boom"] = "boom";
    SoundIndex["YX_boom2"] = "YX_boom2";
    SoundIndex["boss"] = "boss";
    SoundIndex["cannon"] = "cannon";
    SoundIndex["cannon1"] = "cannon1";
    SoundIndex["cannon2"] = "cannon2";
    SoundIndex["combat"] = "combat";
    SoundIndex["compound"] = "compound";
    SoundIndex["daZao"] = "daZao";
    SoundIndex["dici2"] = "dici2";
    SoundIndex["dici3"] = "dici3";
    SoundIndex["dici4"] = "dici4";
    SoundIndex["die_feiting"] = "die_feiting";
    SoundIndex["die_fengheguai"] = "die_fengheguai";
    SoundIndex["die_guaishou"] = "die_guaishou";
    SoundIndex["die_hongpangxie"] = "die_hongpangxie";
    SoundIndex["die_jiangshi"] = "die_jiangshi";
    SoundIndex["die_laoshu"] = "die_laoshu";
    SoundIndex["die_munaiyi"] = "die_munaiyi";
    SoundIndex["die_mutou"] = "die_mutou";
    SoundIndex["die_nangua"] = "die_nangua";
    SoundIndex["die_shayu"] = "die_shayu";
    SoundIndex["die_she"] = "die_she";
    SoundIndex["die_shitou"] = "die_shitou";
    SoundIndex["die_shuiyuansu"] = "die_shuiyuansu";
    SoundIndex["die_wenzi"] = "die_wenzi";
    SoundIndex["die_xiezi"] = "die_xiezi";
    SoundIndex["YX_Shouji"] = "YX_Shouji";
    SoundIndex["die_zipangxie"] = "die_zipangxie";
    SoundIndex["firegun"] = "firegun";
    SoundIndex["fireSprite"] = "fireSprite";
    SoundIndex["hit_dici"] = "hit_dici";
    SoundIndex["hit_jiguangqiang"] = "hit_jiguangqiang";
    SoundIndex["YX_GongjianshouAttack"] = "YX_GongjianshouAttack";
    SoundIndex["hit_siqi"] = "hit_siqi";
    SoundIndex["hit_toumao"] = "hit_toumao";
    SoundIndex["huadong"] = "huadong";
    SoundIndex["YX_Lose"] = "YX_Lose";
    SoundIndex["rewardBox1"] = "rewardBox1";
    SoundIndex["rewardBox2"] = "rewardBox2";
    SoundIndex["shotgun"] = "shotgun";
    SoundIndex["skillmst"] = "skillmst";
    SoundIndex["YX_GongjianshouSkill"] = "YX_GongjianshouSkill";
    SoundIndex["special_fire"] = "special_fire";
    SoundIndex["special_wheel"] = "special_wheel";
    SoundIndex["unAtt"] = "unAtt";
    SoundIndex["wheel"] = "wheel";
    SoundIndex["spin"] = "spin";
    SoundIndex["YX_JinSheng"] = "YX_JinSheng";
    SoundIndex["YX_Level"] = "YX_Level";
    SoundIndex["YX_ButtonClear"] = "YX_ButtonClear";
    SoundIndex["YX_ChoseBuff"] = "YX_ChoseBuff";
    SoundIndex["YX_GetReward"] = "YX_GetReward";
    SoundIndex["YX_IceBoom"] = "YX_IceBoom";
    SoundIndex["YX_Win"] = "YX_Win";
    SoundIndex["YX_PaoShouSkill1"] = "YX_PaoShouSkill1";
    SoundIndex["YX_PaoShouSkill2"] = "YX_PaoShouSkill2";
    SoundIndex["YX_WallBroken"] = "YX_WallBroken";
    SoundIndex["YX_YingBi"] = "YX_YingBi";
    SoundIndex["YX_RuShui"] = "YX_RuShui";
    SoundIndex["YX_KaTanChu"] = "YX_KaTanChu";
    SoundIndex["YX_Fanka"] = "YX_Fanka";
    SoundIndex["YX_Xuli"] = "YX_Xuli";
    SoundIndex["YX_FashiAttack"] = "YX_FashiAttack";
    SoundIndex["YX_FashiSkiill2"] = "YX_FashiSkiill2";
    SoundIndex["YX_FashiSkill1"] = "YX_FashiSkill1";
    SoundIndex["YX_PaoshouAttack"] = "YX_PaoshouAttack";
    SoundIndex["YX_Fangsheng"] = "YX_Fangsheng";
    SoundIndex["YX_Hecheng"] = "YX_Hecheng";
    SoundIndex["YX_Kaizhan"] = "YX_Kaizhan";
    SoundIndex["YX_Dazao"] = "YX_Dazao";
    SoundIndex["YX_RenzheAttack"] = "YX_RenzheAttack";
    SoundIndex["YX_RenzheSkill1"] = "YX_RenzheSkill1";
    SoundIndex["YX_RenzheSkill2"] = "YX_RenzheSkill2";
    SoundIndex["YX_PetAttack"] = "YX_PetAttack";
    SoundIndex["YX_BossComing"] = "YX_BossComing";
    SoundIndex["YX_BossXuli"] = "YX_BossXuli";
    SoundIndex["YX_BossAttackGuodu"] = "YX_BossAttackGuodu";
    SoundIndex["YX_BossAttackMinzhong"] = "YX_BossAttackMinzhong";
    SoundIndex["YX_KaiDan1"] = "YX_KaiDan1";
    SoundIndex["YX_Kaidan2"] = "YX_Kaidan2";
    SoundIndex["YX_Boss1Attack"] = "YX_Boss1Attack";
    SoundIndex["YX_Boss2Attack"] = "YX_Boss2Attack";
    SoundIndex["YX_Boss2Skill"] = "YX_Boss2Skill";
    SoundIndex["YX_ChangmaoshouAttack"] = "YX_ChangmaoshouAttack";
    SoundIndex["YX_EnemyComing"] = "YX_EnemyComing";
    SoundIndex["YX_LeiGodAttack"] = "YX_LeiGodAttack";
    SoundIndex["YX_LeiGodSkill1"] = "YX_LeiGodSkill1";
    SoundIndex["YX_LeiGodSkill2"] = "YX_LeiGodSkill2";
    SoundIndex["YX_ShouWangSkill1"] = "YX_ShouWangSkill1";
    SoundIndex["YX_ShouWangSkill2"] = "YX_ShouWangSkill2";
    SoundIndex["YX_Advanced"] = "YX_Advanced";
    SoundIndex["YX_ChouKa1"] = "YX_ChouKa1";
    SoundIndex["YX_Chouka2"] = "YX_Chouka2";
    SoundIndex["YX_ANBSAttack"] = "YX_ANBSAttack";
    SoundIndex["YX_ANBSSkill"] = "YX_ANBSSkill";
    SoundIndex["YX_BNAttack"] = "YX_BNAttack";
    SoundIndex["YX_BNBeidong"] = "YX_BNBeidong";
    SoundIndex["YX_BNSkill"] = "YX_BNSkill";
    SoundIndex["YX_KZSAttack"] = "YX_KZSAttack";
    SoundIndex["YX_KZSSkill"] = "YX_KZSSkill";
    SoundIndex["YX_ZDAttack"] = "YX_ZDAttack";
    SoundIndex["YX_ZDSkill"] = "YX_ZDSkill";
    SoundIndex["YX_Boss3Attack"] = "YX_Boss3Attack";
    SoundIndex["YX_Boss3Skill1mingzhong"] = "YX_Boss3Skill1mingzhong";
    SoundIndex["YX_Boss3Skill1xuli"] = "YX_Boss3Skill1xuli";
    SoundIndex["YX_Boss4Attack"] = "YX_Boss4Attack";
    SoundIndex["YX_Boss4Skill"] = "YX_Boss4Skill";
    SoundIndex["YX_Boss5Attack"] = "YX_Boss5Attack";
    SoundIndex["YX_Boss5Beidong"] = "YX_Boss5Beidong";
    SoundIndex["YX_Boss5Skill"] = "YX_Boss5Skill";
    SoundIndex["YX_boss6Attack"] = "YX_boss6Attack";
    SoundIndex["YX_boss7Attack"] = "YX_boss7Attack";
    SoundIndex["YX_boss7Skill1"] = "YX_boss7Skill1";
    SoundIndex["YX_MMAttack"] = "YX_MMAttack";
    SoundIndex["YX_MMSkill"] = "YX_MMSkill";
    SoundIndex["YX_NWAttack"] = "YX_NWAttack";
    SoundIndex["YX_NWSkill"] = "YX_NWSkill";
    SoundIndex["YX_BOSS8Attack"] = "YX_BOSS8Attack";
    SoundIndex["YX_Boss8Attack2"] = "YX_Boss8Attack2";
    SoundIndex["YX_BOSS9Attack"] = "YX_BOSS9Attack";
    SoundIndex["YX_BOSS9Skill"] = "YX_BOSS9Skill";
    SoundIndex["YX_BOSS10Attack"] = "YX_BOSS10Attack";
    SoundIndex["YX_BOSS10Skill"] = "YX_BOSS10Skill";
})(SoundIndex = exports.SoundIndex || (exports.SoundIndex = {}));

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcU291bmRcXEF1ZGlvQ29uc3RhbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQVksVUFhWDtBQWJELFdBQVksVUFBVTtJQUNsQixxQ0FBcUIsQ0FBQTtJQUNyQiwyQ0FBMkIsQ0FBQTtJQUMzQiwyQ0FBMkIsQ0FBQTtJQUMzQixtQ0FBbUIsQ0FBQTtJQUNuQiwyQ0FBMkIsQ0FBQTtJQUMzQixtQ0FBbUIsQ0FBQTtJQUNuQix1Q0FBdUIsQ0FBQTtJQUN2Qix1Q0FBdUIsQ0FBQTtJQUN2QixxREFBcUMsQ0FBQTtJQUNyQyxpQ0FBaUIsQ0FBQTtJQUNqQixtQ0FBbUIsQ0FBQTtJQUNuQixtQ0FBbUIsQ0FBQTtBQUN2QixDQUFDLEVBYlcsVUFBVSxHQUFWLGtCQUFVLEtBQVYsa0JBQVUsUUFhckI7QUFFRCxJQUFZLFVBeUlYO0FBeklELFdBQVksVUFBVTtJQUNsQiw2QkFBZSxDQUFBO0lBQ2YsK0JBQWlCLENBQUE7SUFDakIsaUNBQW1CLENBQUE7SUFDbkIsaUNBQW1CLENBQUE7SUFDbkIsMkJBQWEsQ0FBQTtJQUNiLHFDQUF1QixDQUFBO0lBQ3ZCLHVDQUF5QixDQUFBO0lBQ3pCLGlDQUFtQixDQUFBO0lBQ25CLGlDQUFtQixDQUFBO0lBQ25CLDZCQUFlLENBQUE7SUFDZixPQUFPO0lBQ1AsMkJBQWEsQ0FBQTtJQUNiLG1DQUFxQixDQUFBO0lBQ3JCLDJCQUFhLENBQUE7SUFDYiwrQkFBaUIsQ0FBQTtJQUNqQixpQ0FBbUIsQ0FBQTtJQUNuQixpQ0FBbUIsQ0FBQTtJQUNuQiwrQkFBaUIsQ0FBQTtJQUNqQixtQ0FBcUIsQ0FBQTtJQUNyQiw2QkFBZSxDQUFBO0lBQ2YsNkJBQWUsQ0FBQTtJQUNmLDZCQUFlLENBQUE7SUFDZiw2QkFBZSxDQUFBO0lBQ2YseUNBQTJCLENBQUE7SUFDM0IsK0NBQWlDLENBQUE7SUFDakMsMkNBQTZCLENBQUE7SUFDN0IsaURBQW1DLENBQUE7SUFDbkMsMkNBQTZCLENBQUE7SUFDN0IsdUNBQXlCLENBQUE7SUFDekIseUNBQTJCLENBQUE7SUFDM0IscUNBQXVCLENBQUE7SUFDdkIsdUNBQXlCLENBQUE7SUFDekIscUNBQXVCLENBQUE7SUFDdkIsaUNBQW1CLENBQUE7SUFDbkIsdUNBQXlCLENBQUE7SUFDekIsK0NBQWlDLENBQUE7SUFDakMscUNBQXVCLENBQUE7SUFDdkIscUNBQXVCLENBQUE7SUFDdkIscUNBQXVCLENBQUE7SUFDdkIsNkNBQStCLENBQUE7SUFDL0IsaUNBQW1CLENBQUE7SUFDbkIsdUNBQXlCLENBQUE7SUFDekIsbUNBQXFCLENBQUE7SUFDckIsbURBQXFDLENBQUE7SUFDckMsNkRBQStDLENBQUE7SUFDL0MsbUNBQXFCLENBQUE7SUFDckIsdUNBQXlCLENBQUE7SUFDekIsaUNBQW1CLENBQUE7SUFDbkIsaUNBQW1CLENBQUE7SUFDbkIsdUNBQXlCLENBQUE7SUFDekIsdUNBQXlCLENBQUE7SUFDekIsaUNBQW1CLENBQUE7SUFDbkIsbUNBQXFCLENBQUE7SUFDckIsMkRBQTZDLENBQUE7SUFDN0MsMkNBQTZCLENBQUE7SUFDN0IsNkNBQStCLENBQUE7SUFDL0IsNkJBQWUsQ0FBQTtJQUNmLDZCQUFlLENBQUE7SUFDZiwyQkFBYSxDQUFBO0lBQ2IseUNBQTBCLENBQUE7SUFDMUIsbUNBQW9CLENBQUE7SUFDcEIsK0NBQStCLENBQUE7SUFDL0IsMkNBQTJCLENBQUE7SUFDM0IsMkNBQTJCLENBQUE7SUFDM0IsdUNBQXVCLENBQUE7SUFDdkIsK0JBQWlCLENBQUE7SUFDakIsbURBQW1DLENBQUE7SUFDbkMsbURBQXFDLENBQUE7SUFDckMsNkNBQTZCLENBQUE7SUFDN0IscUNBQXFCLENBQUE7SUFDckIscUNBQXFCLENBQUE7SUFDckIseUNBQXlCLENBQUE7SUFDekIsbUNBQW1CLENBQUE7SUFDbkIsaUNBQWlCLENBQUE7SUFDakIsK0NBQStCLENBQUE7SUFDL0IsaURBQWlDLENBQUE7SUFDakMsK0NBQStCLENBQUE7SUFDL0IsbURBQW1DLENBQUE7SUFDbkMsMkNBQTJCLENBQUE7SUFDM0IsdUNBQXVCLENBQUE7SUFDdkIsdUNBQXVCLENBQUE7SUFDdkIsbUNBQW1CLENBQUE7SUFDbkIsaURBQWlDLENBQUE7SUFDakMsaURBQWlDLENBQUE7SUFDakMsaURBQWlDLENBQUE7SUFDakMsMkNBQTJCLENBQUE7SUFDM0IsNkNBQTZCLENBQUE7SUFDN0IseUNBQXlCLENBQUE7SUFDekIsdURBQXVDLENBQUE7SUFDdkMsNkRBQTZDLENBQUE7SUFDN0MsdUNBQXlCLENBQUE7SUFDekIsdUNBQXlCLENBQUE7SUFDekIsK0NBQStCLENBQUE7SUFDL0IsK0NBQStCLENBQUE7SUFDL0IsNkNBQTZCLENBQUE7SUFDN0IsNkRBQTZDLENBQUE7SUFDN0MsK0NBQStCLENBQUE7SUFDL0IsaURBQWlDLENBQUE7SUFDakMsaURBQWlDLENBQUE7SUFDakMsaURBQWlDLENBQUE7SUFDakMscURBQXFDLENBQUE7SUFDckMscURBQXFDLENBQUE7SUFDckMseUNBQXlCLENBQUE7SUFDekIsdUNBQXVCLENBQUE7SUFDdkIsdUNBQXVCLENBQUE7SUFDdkIsNkNBQTZCLENBQUE7SUFDN0IsMkNBQTJCLENBQUE7SUFDM0IseUNBQXlCLENBQUE7SUFDekIsMkNBQTJCLENBQUE7SUFDM0IsdUNBQXVCLENBQUE7SUFDdkIsMkNBQTJCLENBQUE7SUFDM0IseUNBQXlCLENBQUE7SUFDekIseUNBQXlCLENBQUE7SUFDekIsdUNBQXVCLENBQUE7SUFDdkIsK0NBQStCLENBQUE7SUFDL0IsaUVBQWlELENBQUE7SUFDakQsdURBQXVDLENBQUE7SUFDdkMsK0NBQStCLENBQUE7SUFDL0IsNkNBQTZCLENBQUE7SUFDN0IsK0NBQStCLENBQUE7SUFDL0IsaURBQWlDLENBQUE7SUFDakMsNkNBQTZCLENBQUE7SUFDN0IsK0NBQStCLENBQUE7SUFDL0IsK0NBQStCLENBQUE7SUFDL0IsK0NBQStCLENBQUE7SUFDL0IseUNBQXlCLENBQUE7SUFDekIsdUNBQXVCLENBQUE7SUFDdkIseUNBQXlCLENBQUE7SUFDekIsdUNBQXVCLENBQUE7SUFDdkIsK0NBQStCLENBQUE7SUFDL0IsaURBQWlDLENBQUE7SUFDakMsK0NBQStCLENBQUE7SUFDL0IsNkNBQTZCLENBQUE7SUFDN0IsaURBQWlDLENBQUE7SUFDakMsK0NBQStCLENBQUE7QUFFbkMsQ0FBQyxFQXpJVyxVQUFVLEdBQVYsa0JBQVUsS0FBVixrQkFBVSxRQXlJckIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZW51bSBNdXNpY0luZGV4e1xyXG4gICAgQkdNX0Z1YmVuPSdCR01fRnViZW4nLFxyXG4gICAgQkdNX0d1YWppQmdtPSdCR01fR3VhamlCZ20nLFxyXG4gICAgQkdNX01haW5DaXR5PSdCR01fTWFpbkNpdHknLFxyXG4gICAgQkdNX1BldHM9J0JHTV9QZXRzJyxcclxuICAgIEJHTV9Sb2d1ZUJnbT0nQkdNX1JvZ3VlQmdtJyxcclxuICAgIEJHTV9IZXJvPSdCR01fSGVybycsXHJcbiAgICBCR01fQmF0dGxlPSdCR01fQmF0dGxlJyxcclxuICAgIEJHTV9YdVl1YW49J0JHTV9YdVl1YW4nLFxyXG4gICAgQkdNX0thaUVnZ2ppZW1pYW49J0JHTV9LYWlFZ2dqaWVtaWFuJyxcclxuICAgIEJHTV9USlA9J0JHTV9USlAnLFxyXG4gICAgQkdNX1Nob3A9J0JHTV9TaG9wJyxcclxuICAgIEJHTV9Ib21lPSdCR01fSG9tZScsXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIFNvdW5kSW5kZXh7XHJcbiAgICBjbGljayA9ICdjbGljaycsXHJcbiAgICBlcXVpcGUgPSAnZXF1aXBlJyxcclxuICAgIGh1aXNob3UgPSAnaHVpc2hvdScsXHJcbiAgICBsZXZlbFVwID0gJ2xldmVsVXAnLFxyXG4gICAgbHZVcCA9ICdsdlVwJyxcclxuICAgIG9wZW5za2lsbCA9ICdvcGVuc2tpbGwnLFxyXG4gICAgcGxheWVyTHZVcCA9ICdwbGF5ZXJMdlVwJyxcclxuICAgIHB1dGRvd24gPSAncHV0ZG93bicsXHJcbiAgICBwdXRIZXJvID0gJ3B1dEhlcm8nLFxyXG4gICAgc3RhcnQgPSAnc3RhcnQnLFxyXG4gICAgLy/muLjmiI/kuK3pn7PmlYhcclxuICAgIGJvb20gPSAnYm9vbScsXHJcbiAgICBZWF9ib29tMiA9ICdZWF9ib29tMicsXHJcbiAgICBib3NzID0gJ2Jvc3MnLFxyXG4gICAgY2Fubm9uID0gJ2Nhbm5vbicsXHJcbiAgICBjYW5ub24xID0gJ2Nhbm5vbjEnLFxyXG4gICAgY2Fubm9uMiA9ICdjYW5ub24yJyxcclxuICAgIGNvbWJhdCA9ICdjb21iYXQnLFxyXG4gICAgY29tcG91bmQgPSAnY29tcG91bmQnLFxyXG4gICAgZGFaYW8gPSAnZGFaYW8nLFxyXG4gICAgZGljaTIgPSAnZGljaTInLFxyXG4gICAgZGljaTMgPSAnZGljaTMnLFxyXG4gICAgZGljaTQgPSAnZGljaTQnLFxyXG4gICAgZGllX2ZlaXRpbmcgPSAnZGllX2ZlaXRpbmcnLFxyXG4gICAgZGllX2ZlbmdoZWd1YWkgPSAnZGllX2ZlbmdoZWd1YWknLFxyXG4gICAgZGllX2d1YWlzaG91ID0gJ2RpZV9ndWFpc2hvdScsXHJcbiAgICBkaWVfaG9uZ3Bhbmd4aWUgPSAnZGllX2hvbmdwYW5neGllJyxcclxuICAgIGRpZV9qaWFuZ3NoaSA9ICdkaWVfamlhbmdzaGknLFxyXG4gICAgZGllX2xhb3NodSA9ICdkaWVfbGFvc2h1JyxcclxuICAgIGRpZV9tdW5haXlpID0gJ2RpZV9tdW5haXlpJyxcclxuICAgIGRpZV9tdXRvdSA9ICdkaWVfbXV0b3UnLFxyXG4gICAgZGllX25hbmd1YSA9ICdkaWVfbmFuZ3VhJyxcclxuICAgIGRpZV9zaGF5dSA9ICdkaWVfc2hheXUnLFxyXG4gICAgZGllX3NoZSA9ICdkaWVfc2hlJyxcclxuICAgIGRpZV9zaGl0b3UgPSAnZGllX3NoaXRvdScsXHJcbiAgICBkaWVfc2h1aXl1YW5zdSA9ICdkaWVfc2h1aXl1YW5zdScsXHJcbiAgICBkaWVfd2VuemkgPSAnZGllX3dlbnppJyxcclxuICAgIGRpZV94aWV6aSA9ICdkaWVfeGllemknLFxyXG4gICAgWVhfU2hvdWppID0gJ1lYX1Nob3VqaScsXHJcbiAgICBkaWVfemlwYW5neGllID0gJ2RpZV96aXBhbmd4aWUnLFxyXG4gICAgZmlyZWd1biA9ICdmaXJlZ3VuJyxcclxuICAgIGZpcmVTcHJpdGUgPSAnZmlyZVNwcml0ZScsXHJcbiAgICBoaXRfZGljaSA9ICdoaXRfZGljaScsXHJcbiAgICBoaXRfamlndWFuZ3FpYW5nID0gJ2hpdF9qaWd1YW5ncWlhbmcnLFxyXG4gICAgWVhfR29uZ2ppYW5zaG91QXR0YWNrID0gJ1lYX0dvbmdqaWFuc2hvdUF0dGFjaycsXHJcbiAgICBoaXRfc2lxaSA9ICdoaXRfc2lxaScsXHJcbiAgICBoaXRfdG91bWFvID0gJ2hpdF90b3VtYW8nLFxyXG4gICAgaHVhZG9uZyA9ICdodWFkb25nJyxcclxuICAgIFlYX0xvc2UgPSAnWVhfTG9zZScsXHJcbiAgICByZXdhcmRCb3gxID0gJ3Jld2FyZEJveDEnLFxyXG4gICAgcmV3YXJkQm94MiA9ICdyZXdhcmRCb3gyJyxcclxuICAgIHNob3RndW4gPSAnc2hvdGd1bicsXHJcbiAgICBza2lsbG1zdCA9ICdza2lsbG1zdCcsXHJcbiAgICBZWF9Hb25namlhbnNob3VTa2lsbCA9ICdZWF9Hb25namlhbnNob3VTa2lsbCcsICAgIFxyXG4gICAgc3BlY2lhbF9maXJlID0gJ3NwZWNpYWxfZmlyZScsXHJcbiAgICBzcGVjaWFsX3doZWVsID0gJ3NwZWNpYWxfd2hlZWwnLFxyXG4gICAgdW5BdHQgPSAndW5BdHQnLFxyXG4gICAgd2hlZWwgPSAnd2hlZWwnLCAgICBcclxuICAgIHNwaW4gPSAnc3BpbicsXHJcbiAgICBZWF9KaW5TaGVuZz0gJ1lYX0ppblNoZW5nJyxcclxuICAgIFlYX0xldmVsPSAnWVhfTGV2ZWwnLFxyXG4gICAgWVhfQnV0dG9uQ2xlYXI9J1lYX0J1dHRvbkNsZWFyJyxcclxuICAgIFlYX0Nob3NlQnVmZj0nWVhfQ2hvc2VCdWZmJywgICAgXHJcbiAgICBZWF9HZXRSZXdhcmQ9J1lYX0dldFJld2FyZCcsICAgIFxyXG4gICAgWVhfSWNlQm9vbT0nWVhfSWNlQm9vbScsXHJcbiAgICBZWF9XaW4gPSAnWVhfV2luJyxcclxuICAgIFlYX1Bhb1Nob3VTa2lsbDE9J1lYX1Bhb1Nob3VTa2lsbDEnLFxyXG4gICAgWVhfUGFvU2hvdVNraWxsMiA9ICdZWF9QYW9TaG91U2tpbGwyJyxcclxuICAgIFlYX1dhbGxCcm9rZW49J1lYX1dhbGxCcm9rZW4nLFxyXG4gICAgWVhfWWluZ0JpPSdZWF9ZaW5nQmknLFxyXG4gICAgWVhfUnVTaHVpPSdZWF9SdVNodWknLFxyXG4gICAgWVhfS2FUYW5DaHU9J1lYX0thVGFuQ2h1JywgICAgXHJcbiAgICBZWF9GYW5rYT0nWVhfRmFua2EnLFxyXG4gICAgWVhfWHVsaT0nWVhfWHVsaScsXHJcbiAgICBZWF9GYXNoaUF0dGFjaz0nWVhfRmFzaGlBdHRhY2snLFxyXG4gICAgWVhfRmFzaGlTa2lpbGwyPSdZWF9GYXNoaVNraWlsbDInLFxyXG4gICAgWVhfRmFzaGlTa2lsbDE9J1lYX0Zhc2hpU2tpbGwxJyxcclxuICAgIFlYX1Bhb3Nob3VBdHRhY2s9J1lYX1Bhb3Nob3VBdHRhY2snLFxyXG4gICAgWVhfRmFuZ3NoZW5nPSdZWF9GYW5nc2hlbmcnLFxyXG4gICAgWVhfSGVjaGVuZz0nWVhfSGVjaGVuZycsXHJcbiAgICBZWF9LYWl6aGFuPSdZWF9LYWl6aGFuJyxcclxuICAgIFlYX0RhemFvPSdZWF9EYXphbycsXHJcbiAgICBZWF9SZW56aGVBdHRhY2s9J1lYX1JlbnpoZUF0dGFjaycsXHJcbiAgICBZWF9SZW56aGVTa2lsbDE9J1lYX1JlbnpoZVNraWxsMScsXHJcbiAgICBZWF9SZW56aGVTa2lsbDI9J1lYX1JlbnpoZVNraWxsMicsXHJcbiAgICBZWF9QZXRBdHRhY2s9J1lYX1BldEF0dGFjaycsXHJcbiAgICBZWF9Cb3NzQ29taW5nPSdZWF9Cb3NzQ29taW5nJyxcclxuICAgIFlYX0Jvc3NYdWxpPSdZWF9Cb3NzWHVsaScsXHJcbiAgICBZWF9Cb3NzQXR0YWNrR3VvZHU9J1lYX0Jvc3NBdHRhY2tHdW9kdScsXHJcbiAgICBZWF9Cb3NzQXR0YWNrTWluemhvbmc9J1lYX0Jvc3NBdHRhY2tNaW56aG9uZycsXHJcbiAgICBZWF9LYWlEYW4xID0gJ1lYX0thaURhbjEnLFxyXG4gICAgWVhfS2FpZGFuMiA9ICdZWF9LYWlkYW4yJyxcclxuICAgIFlYX0Jvc3MxQXR0YWNrPSdZWF9Cb3NzMUF0dGFjaycsXHJcbiAgICBZWF9Cb3NzMkF0dGFjaz0nWVhfQm9zczJBdHRhY2snLFxyXG4gICAgWVhfQm9zczJTa2lsbD0nWVhfQm9zczJTa2lsbCcsXHJcbiAgICBZWF9DaGFuZ21hb3Nob3VBdHRhY2s9J1lYX0NoYW5nbWFvc2hvdUF0dGFjaycsXHJcbiAgICBZWF9FbmVteUNvbWluZz0nWVhfRW5lbXlDb21pbmcnLFxyXG4gICAgWVhfTGVpR29kQXR0YWNrPSdZWF9MZWlHb2RBdHRhY2snLFxyXG4gICAgWVhfTGVpR29kU2tpbGwxPSdZWF9MZWlHb2RTa2lsbDEnLFxyXG4gICAgWVhfTGVpR29kU2tpbGwyPSdZWF9MZWlHb2RTa2lsbDInLFxyXG4gICAgWVhfU2hvdVdhbmdTa2lsbDE9J1lYX1Nob3VXYW5nU2tpbGwxJyxcclxuICAgIFlYX1Nob3VXYW5nU2tpbGwyPSdZWF9TaG91V2FuZ1NraWxsMicsXHJcbiAgICBZWF9BZHZhbmNlZD0nWVhfQWR2YW5jZWQnLC8v5Y2H5pifXHJcbiAgICBZWF9DaG91S2ExPSdZWF9DaG91S2ExJyxcclxuICAgIFlYX0Nob3VrYTI9J1lYX0Nob3VrYTInLFxyXG4gICAgWVhfQU5CU0F0dGFjaz1cIllYX0FOQlNBdHRhY2tcIixcclxuICAgIFlYX0FOQlNTa2lsbD1cIllYX0FOQlNTa2lsbFwiLFxyXG4gICAgWVhfQk5BdHRhY2s9XCJZWF9CTkF0dGFja1wiLFxyXG4gICAgWVhfQk5CZWlkb25nPVwiWVhfQk5CZWlkb25nXCIsXHJcbiAgICBZWF9CTlNraWxsPVwiWVhfQk5Ta2lsbFwiLFxyXG4gICAgWVhfS1pTQXR0YWNrPVwiWVhfS1pTQXR0YWNrXCIsXHJcbiAgICBZWF9LWlNTa2lsbD1cIllYX0taU1NraWxsXCIsXHJcbiAgICBZWF9aREF0dGFjaz1cIllYX1pEQXR0YWNrXCIsXHJcbiAgICBZWF9aRFNraWxsPVwiWVhfWkRTa2lsbFwiLFxyXG4gICAgWVhfQm9zczNBdHRhY2s9XCJZWF9Cb3NzM0F0dGFja1wiLFxyXG4gICAgWVhfQm9zczNTa2lsbDFtaW5nemhvbmc9XCJZWF9Cb3NzM1NraWxsMW1pbmd6aG9uZ1wiLFxyXG4gICAgWVhfQm9zczNTa2lsbDF4dWxpPVwiWVhfQm9zczNTa2lsbDF4dWxpXCIsXHJcbiAgICBZWF9Cb3NzNEF0dGFjaz1cIllYX0Jvc3M0QXR0YWNrXCIsXHJcbiAgICBZWF9Cb3NzNFNraWxsPVwiWVhfQm9zczRTa2lsbFwiLFxyXG4gICAgWVhfQm9zczVBdHRhY2s9XCJZWF9Cb3NzNUF0dGFja1wiLFxyXG4gICAgWVhfQm9zczVCZWlkb25nPVwiWVhfQm9zczVCZWlkb25nXCIsXHJcbiAgICBZWF9Cb3NzNVNraWxsPVwiWVhfQm9zczVTa2lsbFwiLFxyXG4gICAgWVhfYm9zczZBdHRhY2s9XCJZWF9ib3NzNkF0dGFja1wiLFxyXG4gICAgWVhfYm9zczdBdHRhY2s9XCJZWF9ib3NzN0F0dGFja1wiLFxyXG4gICAgWVhfYm9zczdTa2lsbDE9XCJZWF9ib3NzN1NraWxsMVwiLFxyXG4gICAgWVhfTU1BdHRhY2s9XCJZWF9NTUF0dGFja1wiLFxyXG4gICAgWVhfTU1Ta2lsbD1cIllYX01NU2tpbGxcIixcclxuICAgIFlYX05XQXR0YWNrPVwiWVhfTldBdHRhY2tcIixcclxuICAgIFlYX05XU2tpbGw9XCJZWF9OV1NraWxsXCIsXHJcbiAgICBZWF9CT1NTOEF0dGFjaz1cIllYX0JPU1M4QXR0YWNrXCIsXHJcbiAgICBZWF9Cb3NzOEF0dGFjazI9XCJZWF9Cb3NzOEF0dGFjazJcIixcclxuICAgIFlYX0JPU1M5QXR0YWNrPVwiWVhfQk9TUzlBdHRhY2tcIixcclxuICAgIFlYX0JPU1M5U2tpbGw9XCJZWF9CT1NTOVNraWxsXCIsXHJcbiAgICBZWF9CT1NTMTBBdHRhY2s9XCJZWF9CT1NTMTBBdHRhY2tcIixcclxuICAgIFlYX0JPU1MxMFNraWxsPVwiWVhfQk9TUzEwU2tpbGxcIixcclxuXHJcbn1cclxuXHJcblxyXG4iXX0=