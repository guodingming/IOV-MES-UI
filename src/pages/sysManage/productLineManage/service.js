import fetch from '@/config/fetch'

export const queryEnterprise = () => fetch('/ftyenterprise/byAll', {}, "GET");
export const querySite = (data) => fetch('/ftysiteinfo/byCondition', data, "POST");
export const getTree = (data) => fetch('/ftyarea/byCondition', data, "POST");
export const queryData = (data) => fetch('/ftyproductionline/byPage', data, "POST");
export const queryProductLine = (data) => fetch('/ftyproductionline/byCondition', data, "POST");

export const create = (data) => fetch('/ftyproductionline/creating', data, "POST",true);
export const edit = (data) => fetch('/ftyproductionline/updating', data, "POST",true);
export const deleting = (data) => fetch('/ftyproductionline/deleting', data, "GET",true);


export const workcenterQueryData = (data) => fetch('/ftyworkcenter/byPage', data, "POST");
export const workcenterCreate = (data) => fetch('/ftyworkcenter/creating', data, "POST",true);
export const workcenterEdit = (data) => fetch('/ftyworkcenter/updating', data, "POST",true);
export const workcenterDeleting = (data) => fetch('/ftyworkcenter/deleting', data, "GET",true);
export const queryWorkcenter = (data) => fetch('/ftyworkcenter/byCondition', data, "POST");









