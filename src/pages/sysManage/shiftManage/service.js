import fetch from '@/config/fetch'

export const queryData = (data) => fetch('/pdschedulingtype/byPage', data, "POST");
export const queryName = (data) => fetch('/pdschedulingtype/byCondition', data, "POST");

export const create = (data) => fetch('/pdschedulingtype/creating', data, "POST",true);
export const edit = (data) => fetch('/pdschedulingtype/updating', data, "POST",true);
export const deleting = (data) => fetch('/pdschedulingtype/deleting', data, "GET",true);

