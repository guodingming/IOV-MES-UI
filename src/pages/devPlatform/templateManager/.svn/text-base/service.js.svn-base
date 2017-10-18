import fetch from '@/config/fetch'

export const queryProductLine = (data) => fetch('/pdline/byAll', {}, "GET");
export const queryProduct = (data) => fetch('/pd/byCondition',data,  "POST");
export const getTree = () => fetch('/dptemplatetype/byAll', {}, "GET");
export const queryData = (data) => fetch('/dptemplate/byPage', data, "POST");

export const queryBarCodeType = (data) => fetch('/dptemplatetype/byCondition', data, "POST");
export const treeCreate = (data) => fetch('/dptemplatetype/creating', data, "POST",true);
export const treeEdit = (data) => fetch('/dptemplatetype/updating', data, "POST",true);
export const treeDelete = (data) => fetch('/dptemplatetype/deleting', data, "GET",true);

export const queryBarCode = (data) => fetch('/dptemplate/byCondition', data, "POST");
export const create = (data) => fetch('/dptemplate/creating', data, "POST",true);
export const edit = (data) => fetch('/dptemplate/updating', data, "POST",true);
export const deleting = (data) => fetch('/dptemplate/deleting', data, "GET",true);

