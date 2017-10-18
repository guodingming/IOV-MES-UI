import fetch from '@/config/fetch'
import {baseUrl} from '@/config/env'

export const queryProductLine = (data) => fetch('/pdline/byAll', {}, "GET");
export const queryProduct = (data) => fetch('/pd/byCondition',data,  "POST");
export const queryData = (data) => fetch('/pdbomproduce/byPage', data, "POST");

export const uploadUrl = baseUrl+'/pdbomproduce/uploadBom';
export const edit = (data) => fetch('/pdbomproduce/updating', data, "POST",true);

export const getMaterialTree = (data) => fetch('/pdbomproduce/getMaterialTree', data, "GET");
export const getMaterialAmount = (data) => fetch('/pdbomproduce/getMaterialAmount', data, "GET");
export const getFN = (data) => fetch('/dpfunction/byAll', {}, "GET");
export const deleting = (data) => fetch('/pdbomproduce/deleting', data, "GET",true);

export const queryAttributeData = (data) => fetch('/pdattribute/byCondition', data, "POST");
export const saveBomAffiliates = (data) => fetch('/pdbomaffiliated/saveBomAffiliates', data, "POST",true);
export const updateBomAffiliates = (data) => fetch('/pdbomaffiliated/updateBomAffiliates', data, "POST",true);
export const propData = (data) => fetch('/pdbomaffiliated/byCondition', data, "POST");










