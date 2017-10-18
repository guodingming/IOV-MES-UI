import fetch from '@/config/fetch'

export const getTree = () => fetch('/ftyenterprise/byAll', {}, "GET");
export const queryData = (data) => fetch('/ftysiteinfo/byPage/enterprise', data, "POST");

export const querySite = (data) => fetch('/ftysiteinfo/byCondition', data, "POST");
export const create = (data) => fetch('/ftysiteinfo/creating', data, "POST",true);
export const edit = (data) => fetch('/ftysiteinfo/updating', data, "POST",true);
export const deleting = (data) => fetch('/ftysiteinfo/deleting', data, "GET",true);

export const queryEnterprise = (data) => fetch('/ftyenterprise/byCondition', data, "POST");
export const treeCreate = (data) => fetch('/ftyenterprise/creating', data, "POST",true);
export const treeEdit = (data) => fetch('/ftyenterprise/updating', data, "POST",true);
export const treeDelete = (data) => fetch('/ftyenterprise/deleting', data, "GET",true);


export const areaQueryData = (data) => fetch('/ftyarea/byPage', data, "POST");
export const areaCreate = (data) => fetch('/ftyarea/creating', data, "POST",true);
export const areaEdit = (data) => fetch('/ftyarea/updating', data, "POST",true);
export const areaDeleting = (data) => fetch('/ftyarea/deleting', data, "GET",true);
export const queryArea = (data) => fetch('/ftyarea/byCondition', data, "POST");











