import fetch from '@/config/fetch'
import {baseUrl} from '@/config/env'
export const queryProductLine = (data) => fetch('/pdline/byAll', {}, "GET");
export const queryProduct = (data) => fetch('/pd/byCondition',data,  "POST");
export const getTree = () => fetch('/dpmaterialtype/byAll', {}, "GET");
export const queryData = (data) => fetch('/dpmaterial/byPage', data, "POST");

export const queryBarCodeType = (data) => fetch('/dpmaterialtype/byCondition', data, "POST");
export const treeCreate = (data) => fetch('/dpmaterialtype/creating', data, "POST",true);
export const treeEdit = (data) => fetch('/dpmaterialtype/updating', data, "POST",true);
export const treeDelete = (data) => fetch('/dpmaterialtype/deleting', data, "GET",true);

export const queryBarCode = (data) => fetch('/dpmaterial/byCondition', data, "POST");
export const create = (data) => fetch('/dpmaterial/creating', data, "POST",true);
export const edit = (data) => fetch('/dpmaterial/updating', data, "POST",true);
export const deleting = (data) => fetch('/dpmaterial/deleting', data, "GET",true);

export const upload = baseUrl + '/dpmaterial/upload';
