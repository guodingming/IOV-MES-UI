import fetch from '@/config/fetch'

export const queryProductLine = (data) => fetch('/pdline/byAll', {}, "GET");
export const queryProduct = (data) => fetch('/pd/byCondition',data,  "POST");
export const getTree = (data) => fetch('/dpformtype/byCondition', data, "POST");
export const queryData = (data) => fetch('/dpform/byPage', data, "POST");

export const queryFormType = (data) => fetch('/dpformtype/byCondition', data, "POST");
export const treeCreate = (data) => fetch('/dpformtype/creating', data, "POST",true);
export const treeEdit = (data) => fetch('/dpformtype/updating', data, "POST",true);
export const treeDelete = (data) => fetch('/dpformtype/deleting', data, "GET",true);

export const create = (data) => fetch('/dpform/creating', data, "POST",true);
export const edit = (data) => fetch('/dpform/updating', data, "POST",true);
export const deleting = (data) => fetch('/dpform/deleting', data, "GET",true);
export const repeatForm = (data) => fetch('/dpform/byCondition', data, "POST");

