import fetch from '@/config/fetch'

export const getRole = () => fetch('/role/byAll', {}, "GET");
export const getMenu = () => fetch('/menu/byAll', {}, "GET");
export const getPermission = (data) => fetch('/role/getMenuAuth/'+data, {}, "GET");
export const save = (data) => fetch('/role/saveMenuAuth', data, "POST",true,true);


export const order = (data) => fetch('/menu/updateSort', data, "POST");

