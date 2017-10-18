import fetch from '@/config/fetch'

export const getTree = () => fetch('/dpdatadictionarytype/byAll', {}, "GET");
export const queryData = (data) => fetch('/dpdatadictionary/byPage', data, "POST");

export const create = (data) => fetch('/dpdatadictionary/creating', data, "POST",true);
export const edit = (data) => fetch('/dpdatadictionary/updating', data, "POST",true);
export const deleting = (data) => fetch('/dpdatadictionary/deleting', data, "GET",true);
export const keyRepeat = (data) => fetch('/dpdatadictionary/byCondition', data, "POST");

export const nameRepeat = (data) => fetch('/dpdatadictionarytype/byCondition', data, "POST");
export const treeCreate = (data) => fetch('/dpdatadictionarytype/creating', data, "POST",true);
export const treeEdit = (data) => fetch('/dpdatadictionarytype/updating', data, "POST",true);
export const treeDelete = (data) => fetch('/dpdatadictionarytype/deleting', data, "GET",true);











