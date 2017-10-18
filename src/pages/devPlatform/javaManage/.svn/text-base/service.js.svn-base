import fetch from '@/config/fetch'
import {baseUrl} from '@/config/env'

export const getTree = (data) => fetch('/dpfunctiontype/byCondition', data, "POST");
export const queryData = (data) => fetch('/dpfunction/byPage', data, "POST");

export const treeCreate = (data) => fetch('/dpfunctiontype/creating', data, "POST",true);
export const treeEdit = (data) => fetch('/dpfunctiontype/updating', data, "POST",true);
export const treeDelete = (data) => fetch('/dpfunctiontype/deleting', data, "GET",true);
export const nameRepeat = (data) => fetch('/dpfunctiontype/byCondition', data, "POST");


export const create = (data) => fetch('/dpfunction/creating', data, "POST",true);
export const edit = (data) => fetch('/dpfunction/updating', data, "POST",true);
export const deleting = (data) => fetch('/dpfunction/deleting', data, "GET",true);
export const queryJavaName = (data) => fetch('/dpfunction/byCondition', data, "POST");

export const uploadUrl = baseUrl+'/dpfunction/uploadFile';
