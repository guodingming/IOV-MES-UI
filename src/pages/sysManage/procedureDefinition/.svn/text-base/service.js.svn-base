/**
 * Created by wei.fan on 2017/7/19.
 */
import fetch from '@/config/fetch'

export const queryData = (data) => fetch('/ftyprocess/byPage', data, "POST");
export const queryProcedureDefinition = (data) => fetch('/ftyprocess/byCondition', data, "POST");

export const create = (data) => fetch('/ftyprocess/creating', data, "POST",true);
export const edit = (data) => fetch('/ftyprocess/updating', data, "POST",true);
export const deleting = (data) => fetch('/ftyprocess/deleting', data, "GET",true);

//配置类型
export const editConfigType = (data) => fetch('/ftyprocessconfigtypedict/updating', data, "POST");
export const deleteConfigType = (data) => fetch('/ftyprocessconfigtypedict/deleting', data, "GET");
export const queryConfigType = (data) => fetch('/ftyprocessconfigtypedict/byCondition', data, "POST");
export const queryConfigTypeInfo = (data) => fetch('/ftyprocessconfigtype/byCondition', data, "POST");
export const createConfigType = (data) => fetch('/ftyprocessconfigtypedict/creating', data, "POST");
export const queryAllConfigType = () => fetch('/ftyprocessconfigtypedict/byAll', {}, "GET");
