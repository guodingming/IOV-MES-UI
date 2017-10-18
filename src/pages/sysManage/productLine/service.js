import fetch from '@/config/fetch'
export const getTree = () => fetch('/pdline/byAll', {}, "GET");
export const queryData = (data) => fetch('/pd/byPage', data, "POST");
export const queryPdDefinition = (data) => fetch('/pd/byCondition', data, "POST");
export const queryPdLineDefinition = (data) => fetch('/pdline/byCondition', data, "POST");

export const create = (data) => fetch('/pd/creating', data, "POST",true);
export const edit = (data) => fetch('/pd/updating', data, "POST",true);
export const deleting = (data) => fetch('/pd/deleting', data, "GET",true);

export const queryGroup = (data) => fetch('/usergroup/byCondition', data, "POST");
export const treeCreate = (data) => fetch('/pdline/creating', data, "POST",true);
export const treeEdit = (data) => fetch('/pdline/updating', data, "POST",true);
export const treeDelete = (data) => fetch('/pdline/deleting', data, "GET",true);











