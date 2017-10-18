import fetch from '@/config/fetch'
import {baseUrl} from '@/config/env'

export const queryProductLine = (data) => fetch('/pdline/byAll', {}, "GET");
export const queryProduct = (data) => fetch('/pd/byCondition',data,  "POST");
export const queryData = (data) => fetch('/pdattribute/byPage', data, "POST");
export const queryAttribute = (data) => fetch('/pdattribute/byCondition', data, "POST");

export const edit = (data) => fetch('/pdattribute/updating', data, "POST",true);
export const deleting = (data) => fetch('/pdattribute/deleting', data, "GET",true);
export const create = (data) => fetch('/pdattribute/creating', data, "POST",true);














