import fetch from '@/config/fetch'
import {baseUrl} from '@/config/env'

export const queryProductLine = (data) => fetch('/pdline/byAll', {}, "GET");
export const queryProduct = (data) => fetch('/pd/byCondition',data,  "POST");
export const queryData = (data) => fetch('/pdbomwork/byPage', data, "POST");

export const uploadUrl = baseUrl+'/pdbomwork/uploadBom';
export const edit = (data) => fetch('/pdbomwork/updating', data, "POST",true);

export const getMaterialTree = (data) => fetch('/pdbomwork/getMaterialTree', data, "GET");
export const getMaterialAmount = (data) => fetch('/pdbomwork/getMaterialAmount', data, "GET");

export const prop = (data) => fetch('/pdbomaffiliated/creating', data, "POST");
export const propData = (data) => fetch('/pdbomaffiliated/byPage', data, "POST");
export const propDelete = (data) => fetch('/pdbomaffiliated/deleting', data, "GET");

export const deleting = (data) => fetch('/pdbomwork/deleting', data, "GET",true);

export const saveData = (data) => fetch('/pdbommaterialsreplace/creating', data, "POST",true);
export const queryReplace = (data) => fetch('/pdbommaterialsreplace/byCondition', data, "POST");











