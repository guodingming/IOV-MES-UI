import fetch from '@/config/fetch'

export const queryProductLine = (data) => fetch('/pdline/byAll', {}, "GET");
export const queryProduct = (data) => fetch('/pd/byCondition',data,  "POST");
export const queryData = (data) => fetch('/pdorder/byPage', data, "POST");
export const nameRepeat = (data) => fetch('/pdorder/byCondition', data, "POST");

export const create = (data) => fetch('/pdorder/creating', data, "POST",true);
export const edit = (data) => fetch('/pdorder/updating', data, "POST",true);
export const deleting = (data) => fetch('/pdorder/deleting', data, "GET",true);













