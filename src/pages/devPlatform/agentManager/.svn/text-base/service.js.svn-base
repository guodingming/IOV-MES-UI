import fetch from '@/config/fetch'

export const queryData = (data) => fetch('/agent/byPage', data, "POST");

export const ipRepeat = (data) => fetch('/agent/byCondition', data, "POST");
export const create = (data) => fetch('/agent/creating', data, "POST",true);
export const edit = (data) => fetch('/agent/updating', data, "POST",true);
export const deleting = (data) => fetch('/agent/deleting', data, "GET",true);

export const queryWorkstation = (data) => fetch('/ftyworkstation/byAll', data, "GET");
