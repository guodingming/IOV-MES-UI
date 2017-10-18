import fetch from '@/config/fetch'
import {baseUrl} from '@/config/env'

export const getTree = (data) => fetch('/pdfiletype/byCondition', data, "POST");
export const queryData = (data) => fetch('/pdfileresources/byPage', data, "POST");

export const edit = (data) => fetch('/pdfileresources/updating', data, "POST",true);
export const deleting = (data) => fetch('/pdfileresources/deleting', data, "GET",true);
export const codeRepeat = (data) => fetch('/pdfileresources/byCondition', data, "POST");

export const uploadUrl = baseUrl+'/pdfileresources/uploadPdFileResource';

export const queryTreeRepeat = (data) => fetch('/pdfiletype/byCondition', data, "POST");
export const treeCreate = (data) => fetch('/pdfiletype/creating', data, "POST",true);
export const treeEdit = (data) => fetch('/pdfiletype/updating', data, "POST",true);
export const treeDelete = (data) => fetch('/pdfiletype/deleting', data, "GET",true);











