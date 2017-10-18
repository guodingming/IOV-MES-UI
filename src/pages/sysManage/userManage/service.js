import fetch from '@/config/fetch'

export const getRole = () => fetch('/role/byAll', {}, "GET");
export const getTree = () => fetch('/dept/byAll', {}, "GET");
export const queryData = (data) => fetch('/user/byPage/dept', data, "POST");

export const queryDept = (data) => fetch('/dept/byCondition', data, "POST");
export const treeCreate = (data) => fetch('/dept/creating', data, "POST",true);
export const treeEdit = (data) => fetch('/dept/updating', data, "POST",true);
export const treeDelete = (data) => fetch('/dept/deleting', data, "GET",true);


export const queryUser = (data) => fetch('/user/byCondition', data, "POST");
export const create = (data) => fetch('/user/creating', data, "POST",true);
export const edit = (data) => fetch('/user/updating', data, "POST",true);
export const deleting = (data) => fetch('/user/deleting', data, "GET",true);

export const queryProcess = () => fetch('/ftyprocess/byAll', {}, "GET");
export const createUserprocess = (data) => fetch('/userprocess/creating', data, "POST", true);
export const queryConfigData = (data) => fetch('/userprocess/byCondition', data, "POST");
export const deleteUserprocess = (data) => fetch('/userprocess/deleting', data, "GET",true);
