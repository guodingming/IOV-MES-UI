import fetch from '@/config/fetch'

export const queryProductLine = (data) => fetch('/pdline/byAll', {}, "GET");
export const queryProduct = (data) => fetch('/pd/byCondition',data,  "POST");
export const queryData = (data) => fetch('/dpproject/byPage', data, "POST");

export const queryDataRepeat = (data) => fetch('/dpproject/byCondition', data, "POST");
export const create = (data) => fetch('/dpproject/creating', data, "POST",true);
export const edit = (data) => fetch('/dpproject/updating', data, "POST",true);
export const updateRelease = (data) => fetch('/dpproject/updateRelease', data, "GET",true);
export const deleting = (data) => fetch('/dpproject/deleting', data, "GET",true);

export const getTool = (data) => fetch('/dproutes/getRouteProcesses', data, "GET");









