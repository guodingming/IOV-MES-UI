import fetch from '@/config/fetch'

export const queryProductLine = (data) => fetch('/pdline/byAll', {}, "GET");
export const queryProduct = (data) => fetch('/pd/byCondition',data,  "POST");
export const queryData = (data) => fetch('/dpproject/byPage', data, "POST");
export const create = (data) => fetch('/user/saveGroupAuthBatch', data, "POST",true);
export const deleting = (data) => fetch('/user/deleteByGroupIdAndUserIds', data, "GET",true);
export const queryOrder = (data) => fetch('/pdworkorder/byPage', data, "POST");
export const unDeploy = (data) => fetch('/dproutes/unDeployWorkFlow', data, "GET", true);
export const deploy = (data) => fetch('/dproutes/deployWorkFlow', data, "GET", true);

export const designQueryData = (data) => fetch('/dproutes/byCondition', data, "POST");
export const designSave = (data) => fetch('/dproutes/updating', data, "POST",true);

export const getTool = (data) => fetch('/dproutes/getRouteProcesses', data, "GET");
export const configQueryData = (data) => fetch('/dpproduceprocess/byPage', data, "POST");





