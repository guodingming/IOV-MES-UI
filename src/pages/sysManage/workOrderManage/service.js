import fetch from '@/config/fetch'
//工单
export const queryPd = (data) => fetch('/pdline/getPdLineTree', {}, "GET");
export const stop = (data) => fetch('/pdworkorder/op/stop', data, "GET",true);
export const start = (data) => fetch('/pdworkorder/op/start', data, "GET",true);
export const getTree = (data) => fetch('/pdorder/byCondition', data, "POST");
export const queryData = (data) => fetch('/pdworkorder/byPage', data, "POST");
export const queryArea = (data) => fetch('/pdworkorder/byCondition', data, "POST");
export const create = (data) => fetch('/pdworkorder/creating', data, "POST",true);
export const edit = (data) => fetch('/pdworkorder/updating', data, "POST",true);
export const deleting = (data) => fetch('/pdworkorder/deleting', data, "GET",true);
export const queryPorject = (data) => fetch('/dpproject/byCondition', data, "POST");
export const queryBomWork = (data) => fetch('/pdbomwork/byCondition', data, "POST");
//投产
export const startWorkFlow = (data) => fetch('/dproutes/startWorkFlow', data, "GET", true);
export const queryProductInfo = (data) => fetch('/pdproductinfo/byPage', data, "POST");
export const deletProductInfo = (data) => fetch('/pdproductinfo/deleting', data, "GET", true);
//产品条码
export const queryNumber = (data) => fetch('/pdproductinfonumber/byPage', data, "POST");
//生产工序
export const queryProcess = (data) => fetch('/dpproductinfolog/byPage', data, "POST");
//办理
export const getTask = (data) => fetch('/dproutes/getTask', data, "GET");
export const completeTask = (data) => fetch('/dproutes/completeTask', data, "GET");
//条码规则分类
export const getRuleTypes = () => fetch('/dpbarcodetype/byAll', {}, "GET");
export const getRulesByType = (data) => fetch('/dpbarcode/byCondition', data, "POST");



