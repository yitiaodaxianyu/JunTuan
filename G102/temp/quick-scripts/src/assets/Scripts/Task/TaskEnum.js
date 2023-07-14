"use strict";
cc._RF.push(module, '418ebeKsYRBgbbVD91Eepd4', 'TaskEnum');
// Scripts/Task/TaskEnum.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskState = exports.TaskItem = void 0;
var TaskItem;
(function (TaskItem) {
    // 日常任务
    TaskItem[TaskItem["\u5347\u7EA71\u6B21\u82F1\u96C4"] = 11001] = "\u5347\u7EA71\u6B21\u82F1\u96C4";
    TaskItem[TaskItem["\u5347\u661F1\u6B21\u82F1\u96C4"] = 12001] = "\u5347\u661F1\u6B21\u82F1\u96C4";
    TaskItem[TaskItem["\u5347\u7EA71\u6B21\u88C5\u5907"] = 13001] = "\u5347\u7EA71\u6B21\u88C5\u5907";
    TaskItem[TaskItem["\u5347\u7EA71\u6B21\u88C5\u5907\u54C1\u7EA7"] = 14001] = "\u5347\u7EA71\u6B21\u88C5\u5907\u54C1\u7EA7";
    TaskItem[TaskItem["\u5347\u7EA71\u6B21\u5BA0\u7269"] = 15001] = "\u5347\u7EA71\u6B21\u5BA0\u7269";
    TaskItem[TaskItem["\u5347\u7EA71\u6B21\u4E13\u6B66"] = 16001] = "\u5347\u7EA71\u6B21\u4E13\u6B66";
    TaskItem[TaskItem["\u6311\u62181\u6B21\u5173\u5361"] = 21001] = "\u6311\u62181\u6B21\u5173\u5361";
    TaskItem[TaskItem["\u6311\u62181\u6B21\u65E0\u5C3D\u6311\u6218"] = 22001] = "\u6311\u62181\u6B21\u65E0\u5C3D\u6311\u6218";
    TaskItem[TaskItem["\u6311\u62181\u6B21BOSS\u72E9\u730E"] = 23001] = "\u6311\u62181\u6B21BOSS\u72E9\u730E";
    TaskItem[TaskItem["\u6311\u62181\u6B21\u722C\u5854"] = 24001] = "\u6311\u62181\u6B21\u722C\u5854";
    TaskItem[TaskItem["\u6311\u62181\u6B21\u51B0\u6CB3\u63A2\u9669"] = 25001] = "\u6311\u62181\u6B21\u51B0\u6CB3\u63A2\u9669";
    TaskItem[TaskItem["\u6311\u62183\u6B21\u5173\u5361"] = 21002] = "\u6311\u62183\u6B21\u5173\u5361";
    TaskItem[TaskItem["\u6311\u62183\u6B21\u65E0\u5C3D\u6311\u6218"] = 22002] = "\u6311\u62183\u6B21\u65E0\u5C3D\u6311\u6218";
    TaskItem[TaskItem["\u6311\u62183\u6B21BOSS\u72E9\u730E"] = 23002] = "\u6311\u62183\u6B21BOSS\u72E9\u730E";
    TaskItem[TaskItem["\u6311\u62183\u6B21\u722C\u5854"] = 24002] = "\u6311\u62183\u6B21\u722C\u5854";
    TaskItem[TaskItem["\u8FDB\u884C1\u6B21\u5F00\u542F\u88C5\u5907"] = 31001] = "\u8FDB\u884C1\u6B21\u5F00\u542F\u88C5\u5907";
    TaskItem[TaskItem["\u8FDB\u884C10\u6B21\u5F00\u542F\u88C5\u5907"] = 31002] = "\u8FDB\u884C10\u6B21\u5F00\u542F\u88C5\u5907";
    TaskItem[TaskItem["\u8FDB\u884C1\u6B21\u5BA0\u7269\u62DB\u52DF"] = 32001] = "\u8FDB\u884C1\u6B21\u5BA0\u7269\u62DB\u52DF";
    TaskItem[TaskItem["\u8FDB\u884C10\u6B21\u5BA0\u7269\u5B75\u5316"] = 32002] = "\u8FDB\u884C10\u6B21\u5BA0\u7269\u5B75\u5316";
    TaskItem[TaskItem["\u8FDB\u884C1\u6B21\u82F1\u96C4\u62DB\u52DF"] = 33001] = "\u8FDB\u884C1\u6B21\u82F1\u96C4\u62DB\u52DF";
    TaskItem[TaskItem["\u8FDB\u884C10\u6B21\u82F1\u96C4\u62DB\u52DF"] = 33002] = "\u8FDB\u884C10\u6B21\u82F1\u96C4\u62DB\u52DF";
    TaskItem[TaskItem["\u5546\u5E97\u4E2D\u8D2D\u4E70\u7269\u54C11\u6B21"] = 34001] = "\u5546\u5E97\u4E2D\u8D2D\u4E70\u7269\u54C11\u6B21";
    TaskItem[TaskItem["\u8D2D\u4E701\u6B21\u5546\u5E97\u4E2D\u7684\u91D1\u5E01"] = 35001] = "\u8D2D\u4E701\u6B21\u5546\u5E97\u4E2D\u7684\u91D1\u5E01";
    TaskItem[TaskItem["\u767B\u5F55\u6E38\u620F1\u6B21"] = 41001] = "\u767B\u5F55\u6E38\u620F1\u6B21";
    TaskItem[TaskItem["\u9886\u53D6\u6302\u673A\u5956\u52B12\u6B21"] = 42001] = "\u9886\u53D6\u6302\u673A\u5956\u52B12\u6B21";
    TaskItem[TaskItem["\u9886\u53D6\u5FEB\u901F\u6302\u673A1\u6B21"] = 43001] = "\u9886\u53D6\u5FEB\u901F\u6302\u673A1\u6B21";
    TaskItem[TaskItem["\u89C2\u770B\u4EFB\u610F1\u6B21\u5E7F\u544A"] = 44001] = "\u89C2\u770B\u4EFB\u610F1\u6B21\u5E7F\u544A";
    TaskItem[TaskItem["\u89C2\u770B\u4EFB\u610F3\u6B21\u5E7F\u544A"] = 44002] = "\u89C2\u770B\u4EFB\u610F3\u6B21\u5E7F\u544A";
    TaskItem[TaskItem["\u8F6C\u52A8\u8F6C\u76D81\u6B21"] = 45001] = "\u8F6C\u52A8\u8F6C\u76D81\u6B21";
    // 主线任务
    TaskItem[TaskItem["\u901A\u5173X"] = 10000001] = "\u901A\u5173X";
    TaskItem[TaskItem["\u91CA\u653EX\u6B21\u4EBA\u7269\u6280\u80FD"] = 20000001] = "\u91CA\u653EX\u6B21\u4EBA\u7269\u6280\u80FD";
    TaskItem[TaskItem["\u4E0A\u9635X\u540D\u82F1\u96C4"] = 30000001] = "\u4E0A\u9635X\u540D\u82F1\u96C4";
    TaskItem[TaskItem["\u62DB\u52DFX\u6B21\u82F1\u96C4"] = 40000001] = "\u62DB\u52DFX\u6B21\u82F1\u96C4";
    TaskItem[TaskItem["\u5C06\u4EFB\u610FX\u540D\u82F1\u96C4\u5347\u523010\u7EA7"] = 50000001] = "\u5C06\u4EFB\u610FX\u540D\u82F1\u96C4\u5347\u523010\u7EA7";
    TaskItem[TaskItem["\u4E3A\u4EFB\u610FX\u540D\u82F1\u96C4\u7A7F\u62341\u4EF6\u88C5\u5907"] = 60000001] = "\u4E3A\u4EFB\u610FX\u540D\u82F1\u96C4\u7A7F\u62341\u4EF6\u88C5\u5907";
    TaskItem[TaskItem["\u5C06\u70AE\u624B\u5347\u81F31\u5927\u661F"] = 70000001] = "\u5C06\u70AE\u624B\u5347\u81F31\u5927\u661F";
    TaskItem[TaskItem["\u5B8C\u6210X\u6B21\u6BCF\u65E5\u4EFB\u52A1"] = 80000001] = "\u5B8C\u6210X\u6B21\u6BCF\u65E5\u4EFB\u52A1";
    TaskItem[TaskItem["\u5B8C\u6210X\u6B21\u6210\u5C31\u4EFB\u52A1"] = 90000001] = "\u5B8C\u6210X\u6B21\u6210\u5C31\u4EFB\u52A1";
    TaskItem[TaskItem["\u524D\u5F80\u5546\u57CE\u8D2D\u4E70X\u6B21\u5546\u54C1"] = 100000001] = "\u524D\u5F80\u5546\u57CE\u8D2D\u4E70X\u6B21\u5546\u54C1";
    TaskItem[TaskItem["\u524D\u5F80\u5546\u57CE\u5B75\u5316X\u6B21\u5BA0\u7269"] = 110000001] = "\u524D\u5F80\u5546\u57CE\u5B75\u5316X\u6B21\u5BA0\u7269";
    TaskItem[TaskItem["\u5408\u6210X\u6B21\u88C5\u5907"] = 120000001] = "\u5408\u6210X\u6B21\u88C5\u5907";
    TaskItem[TaskItem["\u767B\u5F55X\u6B21\u6E38\u620F"] = 130000001] = "\u767B\u5F55X\u6B21\u6E38\u620F";
    TaskItem[TaskItem["\u8F6C\u76D8X\u6B21"] = 140000001] = "\u8F6C\u76D8X\u6B21";
    TaskItem[TaskItem["\u5347\u7EA7X\u6B21\u7075\u5BA0"] = 150000001] = "\u5347\u7EA7X\u6B21\u7075\u5BA0";
    TaskItem[TaskItem["\u6311\u6218X\u6B21\u65E0\u5C3D\u6311\u6218"] = 160000001] = "\u6311\u6218X\u6B21\u65E0\u5C3D\u6311\u6218";
    TaskItem[TaskItem["\u6311\u6218X\u6B21boss\u72E9\u730E"] = 170000001] = "\u6311\u6218X\u6B21boss\u72E9\u730E";
    TaskItem[TaskItem["\u8FDB\u884C\u8D26\u53F7\u7ED1\u5B9A"] = 180000001] = "\u8FDB\u884C\u8D26\u53F7\u7ED1\u5B9A";
    // 成就任务
    TaskItem[TaskItem["\u7D2F\u8BA1\u901A\u8FC7X\u5173"] = 100001] = "\u7D2F\u8BA1\u901A\u8FC7X\u5173";
    TaskItem[TaskItem["\u7D2F\u8BA11\u4E2A\u82F1\u96C4\u5347\u5230X\u7EA7"] = 200001] = "\u7D2F\u8BA11\u4E2A\u82F1\u96C4\u5347\u5230X\u7EA7";
    TaskItem[TaskItem["\u7D2F\u8BA1\u6536\u96C6X\u4E2A\u82F1\u96C4"] = 300001] = "\u7D2F\u8BA1\u6536\u96C6X\u4E2A\u82F1\u96C4";
    TaskItem[TaskItem["\u7D2F\u8BA11\u4E2A\u82F1\u96C4\u5347\u5230X\u661F"] = 400001] = "\u7D2F\u8BA11\u4E2A\u82F1\u96C4\u5347\u5230X\u661F";
    TaskItem[TaskItem["\u7D2F\u8BA1\u83B7\u5F97X\u4EF6\u88C5\u5907"] = 500001] = "\u7D2F\u8BA1\u83B7\u5F97X\u4EF6\u88C5\u5907";
    TaskItem[TaskItem["\u7D2F\u8BA1X\u4EF6\u88C5\u5907\u5230\u8FBE\u54C1\u8D286"] = 600001] = "\u7D2F\u8BA1X\u4EF6\u88C5\u5907\u5230\u8FBE\u54C1\u8D286";
    TaskItem[TaskItem["\u7D2F\u8BA1\u62DB\u52DFX\u4E2A\u82F1\u96C4"] = 700001] = "\u7D2F\u8BA1\u62DB\u52DFX\u4E2A\u82F1\u96C4";
    TaskItem[TaskItem["\u901A\u8FC7\u7B2CX\u7AE0"] = 800001] = "\u901A\u8FC7\u7B2CX\u7AE0";
    TaskItem[TaskItem["\u7D2F\u8BA1\u767B\u5F55X\u5929"] = 900001] = "\u7D2F\u8BA1\u767B\u5F55X\u5929";
    TaskItem[TaskItem["\u7D2F\u8BA1\u5B75\u5316\u7075\u5BA0\u86CBX\u6B21"] = 1000001] = "\u7D2F\u8BA1\u5B75\u5316\u7075\u5BA0\u86CBX\u6B21";
    TaskItem[TaskItem["\u7D2F\u8BA1\u5C06X\u53EA\u5BA0\u7269\u5347\u81F3\u6700\u9AD8\u54C1\u8D28"] = 1100001] = "\u7D2F\u8BA1\u5C06X\u53EA\u5BA0\u7269\u5347\u81F3\u6700\u9AD8\u54C1\u8D28";
    TaskItem[TaskItem["\u65E0\u5C3D\u6311\u6218\u5206\u6570\u5230\u8FBEX\u6CE2\u6B21"] = 1200001] = "\u65E0\u5C3D\u6311\u6218\u5206\u6570\u5230\u8FBEX\u6CE2\u6B21";
    TaskItem[TaskItem["boss\u72E9\u730E\u5206\u6570\u5230\u8FBEX\u4F24\u5BB3"] = 1300001] = "boss\u72E9\u730E\u5206\u6570\u5230\u8FBEX\u4F24\u5BB3";
    TaskItem[TaskItem["\u865A\u7A7A\u63A2\u9669\u901A\u8FC7\u7B2CX\u7AE0"] = 1400002] = "\u865A\u7A7A\u63A2\u9669\u901A\u8FC7\u7B2CX\u7AE0";
})(TaskItem = exports.TaskItem || (exports.TaskItem = {}));
var TaskState;
(function (TaskState) {
    TaskState[TaskState["Ongoing"] = 0] = "Ongoing";
    TaskState[TaskState["Completed"] = 1] = "Completed";
    TaskState[TaskState["Received"] = 2] = "Received";
})(TaskState = exports.TaskState || (exports.TaskState = {}));

cc._RF.pop();