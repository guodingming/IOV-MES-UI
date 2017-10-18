import fetch from '@/config/fetch'
import {baseUrl} from '@/config/env'

export const queryProductLine = (data) => fetch('/pdline/byAll', {}, "GET");
export const queryProduct = (data) => fetch('/pd/byCondition',data,  "POST");
export const getTree = (data) => fetch('/dpproject/byCondition', data, "POST");
export const queryData = (data) => fetch('/dpproduceprocess/byCondition', data, "POST");

export const create = (data) => fetch('/dpproduceprocess/saveDpProduceProcess', data, "POST",true);
export const queryProcessByProject = (data) => fetch('/dpproduceprocess/byCondition', data, "POST");
export const updateSort = (data) => fetch('/dpproduceprocess/updateSort', data, "GET");
export const edit = (data) => fetch('/dpproduceprocess/updating', data, "POST",true);
export const updateConfig = (data) => fetch('/dpproduceprocess/updateConfig', data, "POST",true);
export const deleting = (data) => fetch('/dpproduceprocess/deleting', data, "GET",true);
export const queryProcess = (data) => fetch('/ftyprocess/byAll', {}, "GET");
//基础配置
export const queryBomProduce = (data) => fetch('/pdbomproduce/byAll', {}, "GET");
export const queryFormType = (data) => fetch('/dpformtype/byAll', {}, "GET");
export const queryForm = (data) => fetch('/dpform/byCondition', data, "POST");
export const getExtendAttr = (data) => fetch('/dpproduceprocessconfig/byCondition', data, "POST");
export const queryFunType = () => fetch('/dpfunctiontype/byAll', {}, "GET");
export const queryFN = (data) => fetch('/dpfunction/byCondition', data, "POST");
//配置页面扩展属性
export const createExtend = (data) => fetch('/dpproduceprocessconfig/creating', data, "POST" ,true);
export const getExtend = (data) => fetch('/dpproduceprocessconfig/byPage', data, "POST");
export const deleteExtend = (data) => fetch('/dpproduceprocessconfig/deleting', data, "GET", true);
export const getDictionaryType = () => fetch('/dpdatadictionarytype/byAll', {}, "GET");
export const getExtendKey = (data) => fetch('/dpdatadictionary/byCondition', data, "POST");
export const upload = baseUrl + "/dpprocessbaseconfig/upload";
//测试标准
export const testUpload = baseUrl + "/dpproducestandardtest/upload";
export const testDownload = baseUrl + "/dpproducestandardtest/download";
export const testByPage = (data) => fetch('/dpproducestandardtest/byPage', data, "POST");
//测试顺序
export const orderUpload = baseUrl + "/dpproducestandardtestorder/upload";
export const orderDownload = baseUrl + "/dpproducestandardtestorder/download";
export const orderByPage = (data) => fetch('/dpproducestandardtestorder/byPage', data, "POST");
//产品芯片
export const chipUpload = baseUrl + "/dpproducechip/upload";
export const chipDownload = baseUrl + "/dpproducechip/download";
export const chipByPage = (data) => fetch('/dpproducechip/byPage', data, "POST");
//设备配置
export const queryDevices = (data) => fetch('/ftydevice/getDevicesByProcess', data, "GET");
export const queryDeviceConfigTypes = (data) => fetch('/ftydeviceconfiginfo/getDeviceConfigTypes', data, "GET");
export const queryDeviceData = (deviceId, deviceConfigTypeId) => fetch('/ftydeviceconfiginfo/byAll/configType?deviceId='+deviceId+'&deviceConfigTypeId='+deviceConfigTypeId, {}, "POST");
export const configDevice = (data) => fetch('/dpproduceprocessdeviceconfig/saveCopyConfig', data, "POST",true);
export const configDeleting = (data) => fetch('/dpproduceprocessdeviceconfig/deleting', data, "GET");
export const queryConfigData = (data) => fetch('/dpproduceprocessdeviceconfig/byPage', data, "POST");
//时间设置
export const configDateSet = (data) => fetch('/dpproduceprocessdate/configDateSet', data, "POST", true);
export const getDateSet = (data) => fetch('/dpproduceprocessdate/byCondition', data, "POST");
//产品标定
export const demarcateUpload = baseUrl + "/dpproducedemarcate/upload";
export const demarcateDownload = baseUrl + "/dpproducedemarcate/download";
export const demarcateByPage = (data) => fetch('/dpproducedemarcate/byPage', data, "POST");
