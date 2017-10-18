import fetch from '@/config/fetch'
import {baseUrl} from '@/config/env'
export const getTree = () => fetch('/dpsubassemblytype/byAll', {}, "GET");
export const queryData = (data) => fetch('/dpsubassembly/byPage', data, "POST");

export const queryType = (data) => fetch('/dpsubassemblytype/byCondition', data, "POST");
export const upload = baseUrl + '/dpmaterial/upload';
export const treeCreate = (data) => fetch('/dpsubassemblytype/creating', data, "POST",true);
export const treeEdit = (data) => fetch('/dpsubassemblytype/updating', data, "POST",true);
export const treeDelete = (data) => fetch('/dpsubassemblytype/deleting', data, "GET",true);

export const querySubassembly = (data) => fetch('/dpsubassembly/byCondition', data, "POST");
export const create = (data) => fetch('/dpsubassembly/creating', data, "POST",true);
export const edit = (data) => fetch('/dpsubassembly/updating', data, "POST",true);
export const deleting = (data) => fetch('/dpsubassembly/deleting', data, "GET",true);

