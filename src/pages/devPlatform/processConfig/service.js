/**
 * Created by wei.fan on 2017/7/19.
 */
import fetch from '@/config/fetch'
import {baseUrl} from '@/config/env'

export const queryData = (data) => fetch('/ftyprocess/byPage', data, "POST");

export const create = (data) => fetch('/dpprocessbaseconfig/baseConfig', data, "POST",true);
export const edit = (data) => fetch('/dpprocessbaseconfig/updating', data, "POST",true);
export const getBaseConfig = (data) => fetch('/dpprocessbaseconfig/byCondition', data, "POST");
export const deleting = (data) => fetch('/dpprocessbaseconfig/deleting', data, "GET",true);

export const queryBomProduce = (data) => fetch('/pdbomproduce/byAll', {}, "GET");
export const queryFormType = (data) => fetch('/dpformtype/byAll', {}, "GET");
export const queryForm = (data) => fetch('/dpform/byCondition', data, "POST");
export const getExtendAttr = (data) => fetch('/dpprocessconfig/byCondition', data, "POST");

//-------------------配置页面扩展属性----------------------------------
export const createExtend = (data) => fetch('/dpprocessconfig/creating', data, "POST" ,true);
export const getExtend = (data) => fetch('/dpprocessconfig/byPage', data, "POST");
export const deleteExtend = (data) => fetch('/dpprocessconfig/deleting', data, "GET", true);
export const getDictionaryType = () => fetch('/dpdatadictionarytype/byAll', {}, "GET");
export const getExtendKey = (data) => fetch('/dpdatadictionary/byCondition', data, "POST");
export const upload = baseUrl + "/dpprocessbaseconfig/upload"

