import fetch from '@/config/fetch'

export const queryProductLine = (data) => fetch('/pdline/byAll', {}, "GET");
export const queryProduct = (data) => fetch('/pd/byCondition',data,  "POST");
export const queryData = (data) => fetch('/pdscheduling/getSchedulingPage', data, "POST");

export const create = (data) => fetch('/pdscheduling/saveScheduling', data, "POST",true);

export const deleting = (data) => fetch('/pdscheduling/deleteScheduling', data, "GET",true);

export const getSchedulingType = () => fetch('/pdschedulingtype/byAll', {}, "GET");

export const getUserGroup = () => fetch('/usergroup/byAll', {}, "GET");
export const getUser = (data) => fetch('/user/byPage/userGroup', data, "POST");
export const getRestUser = (data) => fetch('/pdschedulingpersonnel/getRestUser', data, "POST");

export const queryEnterprise = () => fetch('/ftyenterprise/byAll', {}, "GET");
export const queryFty = (data) => fetch('/ftysiteinfo/byCondition', data, "POST");
export const queryArea = (data) => fetch('/ftyarea/byCondition', data, "POST");
export const queryProductionLine = (data) => fetch('/ftyproductionline/byCondition',data, "POST");
export const queryWorkCenter = (data) => fetch('/ftyworkcenter/byCondition',data, "POST");


export const getDevice = (data) => fetch('/ftyworkstation/byCondition', data, "POST");
export const getRestWorkstation = (data) => fetch('/pdschedulingdevice/getRestWorkstation', data, "POST");
export const userQueryData = (data) => fetch('/pdschedulingpersonnel/byPage', data, "POST");
export const userCreate = (data) => fetch('/pdschedulingpersonnel/savePersonnels', data, "POST",true);
export const userDeleting = (data) => fetch('/pdschedulingpersonnel/deleting', data, "GET",true);

export const deviceQueryData = (data) => fetch('/pdschedulingdevice/byPage', data, "POST");
export const deviceCreate = (data) => fetch('/pdschedulingdevice/saveWorkstations', data, "POST",true);
export const deviceDeleting = (data) => fetch('/pdschedulingdevice/deleting', data, "GET",true);

