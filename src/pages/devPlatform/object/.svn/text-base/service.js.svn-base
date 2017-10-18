import fetch from '@/config/fetch'
export const getTree = () => fetch('/tabletype/byAll', {}, "GET");
export const queryData = (data) => fetch('/table/byPage', data, "POST");

export const create = (data) => fetch('/table/creating', data, "POST",true);
export const edit = (data) => fetch('/table/updating', data, "POST",true);
export const deleting = (data) => fetch('/table/deleting', data, "GET",true);
export const nameRepeat = (data) => fetch('/table/byCondition', data, "POST");

export const treeNameRepeat = (data) => fetch('/tabletype/byCondition', data, "POST");
export const treeCreate = (data) => fetch('/tabletype/creating', data, "POST",true);
export const treeEdit = (data) => fetch('/tabletype/updating', data, "POST",true);
export const treeDelete = (data) => fetch('/tabletype/deleting', data, "GET",true);

export const getField = (data) => fetch('/metadata/findByTableId', data, "GET");
export const saveField = (data) => fetch('/metadata/saveFieldList', data, "POST",true);
export const saveExpandField = (data) => fetch('/expandtableconfig/saveExpandField', data, "POST",true);