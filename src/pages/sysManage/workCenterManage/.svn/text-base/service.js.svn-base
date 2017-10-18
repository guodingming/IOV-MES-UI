import fetch from '@/config/fetch'

export const queryEnterprise = () => fetch('/ftyenterprise/byAll', {}, "GET");
export const querySite = (data) => fetch('/ftysiteinfo/byCondition', data, "POST");
export const queryArea = (data) => fetch('/ftyarea/byCondition', data, "POST");
export const queryProductLine = (data) => fetch('/ftyproductionline/byCondition', data, "POST");
export const queryWorkcenter = (data) => fetch('/ftyworkcenter/byCondition', data, "POST");

export const getTree = (data) => fetch('/ftyworkcenter/getAreaProductionLine', data, "GET");
export const queryData = (data) => fetch('/ftyworkstation/byPage', data, "POST");
export const queryDevice = () => fetch('/ftydevice/byAll',{},"GET");

export const queryWorkstation = (data) => fetch('/ftyworkstation/byCondition', data, "POST");
export const queryWorkstationdevice = (data) => fetch('/ftyworkstationdevice/byCondition', data, "POST");
export const create = (data) => fetch('/ftyworkstation/saveWorkstationDevices', data, "POST",true);
export const edit = (data) => fetch('/ftyworkstation/updateWorkstationDevices', data, "POST",true);
export const deleting = (data) => fetch('/ftyworkstation/deleting', data, "GET",true);











