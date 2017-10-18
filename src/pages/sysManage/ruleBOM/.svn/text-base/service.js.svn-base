import fetch from '@/config/fetch'

export const getDept = () => fetch('/dept/byAll', {}, "GET");
export const getTree = () => fetch('/usergroup/byAll', {}, "GET");
export const queryData = (data) => fetch('/user/byPage/userGroup', data, "POST");

export const getUser = (data) => fetch('/user/getAssignableUsers', data, "POST");
export const create = (data) => fetch('/user/saveGroupAuthBatch', data, "POST",true);
//export const edit = (data) => fetch('/user/updating', data, "POST",true);
export const deleting = (data) => fetch('/user/deleteByGroupIdAndUserIds', data, "GET",true);

export const queryGroup = (data) => fetch('/usergroup/byCondition', data, "POST");
export const treeCreate = (data) => fetch('/usergroup/creating', data, "POST",true);
export const treeEdit = (data) => fetch('/usergroup/updating', data, "POST",true);
export const treeDelete = (data) => fetch('/usergroup/deleting', data, "GET",true);











