import fetch from '@/config/fetch'
import {baseUrl} from '@/config/env'

export const queryProductLine = (data) => fetch('/pdline/byAll', {}, "GET");
export const queryProduct = (data) => fetch('/pd/byCondition',data,  "POST");
export const getTree = () => fetch('/dplabeltype/byAll', {}, "GET");
export const queryData = (data) => fetch('/dplabel/byPage', data, "POST");

export const queryBarCodeType = (data) => fetch('/dplabeltype/byCondition', data, "POST");
export const treeCreate = (data) => fetch('/dplabeltype/creating', data, "POST",true);
export const treeEdit = (data) => fetch('/dplabeltype/updating', data, "POST",true);
export const treeDelete = (data) => fetch('/dplabeltype/deleting', data, "GET",true);

export const queryLabel = (data) => fetch('/dplabel/byCondition', data, "POST");
export const create = (data) => fetch('/dplabel/creating', data, "POST",true);
export const edit = (data) => fetch('/dplabel/updating', data, "POST",true);
export const deleting = (data) => fetch('/dplabel/deleting', data, "GET",true);

export const queryFunType = () => fetch('/dpfunctiontype/byAll', {}, "GET");
export const queryFn = (data) => fetch('/dpfunction/byCondition', data, "POST");

export const uploadTemplate = baseUrl+'/dplabel/uploadTemplate';
export const uploadInstruction = baseUrl+'/dplabel/uploadInstruction';
