import fetch from '@/config/fetch'

export const queryProductLine = (data) => fetch('/pdline/byAll', {}, "GET");
export const queryProduct = (data) => fetch('/pd/byCondition',data,  "POST");
export const queryData = (data) => fetch('/dprepairstation/byPage', data, "POST");
//不良信息
export const edit = (data) => fetch('/dprepairstationbadinfo/updating', data, "POST",true);
export const queryBadInfo = (data) => fetch('/dprepairstationbadinfo/byCondition', data, "POST");













