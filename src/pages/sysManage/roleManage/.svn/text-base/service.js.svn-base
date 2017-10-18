import fetch from '@/config/fetch'

export const queryData = (data) => fetch('/role/byPage', data, "POST");

export const queryRole = (data) => fetch('/role/byCondition', data, "POST");
export const create = (data) => fetch('/role/creating', data, "POST",true);
export const edit = (data) => fetch('/role/updating', data, "POST",true);
export const deleting = (data) => fetch('/role/deleting', data, "GET",true);

export const getMenu = () => fetch('/menu/byAll', {}, "GET");
export const getPermission = (data) => fetch('/role/getMenuAuth/'+data, {}, "GET");