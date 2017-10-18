import fetch from '@/config/fetch'
import formdata from '@/config/formdata'
import {baseUrl} from '@/config/env'

export const queryEnterprise = () => fetch('/ftyenterprise/byAll', {}, "GET");
export const querySite = (data) => fetch('/ftysiteinfo/byCondition', data, "POST");
export const queryArea = (data) => fetch('/ftyarea/byCondition', data, "POST");
export const getTree = (data) => fetch('/ftydeviceconfiginfo/getDevicesTypedTree', data, "GET");
export const queryDevice = () => fetch('/ftydevice/byAll',{},"GET");

export const queryDeviceConfig = (data) => fetch('/ftydeviceconfiginfo/byCondition', data, "POST");
export const uploadUrl = baseUrl+'/ftydeviceconfiginfo/uploadConfigInfo';
export const create = (data) => formdata('/ftydeviceconfiginfo/uploadConfigInfo', data, "POST",true);
export const edit = (data) => fetch('/ftydeviceconfiginfo/updating', data, "POST",true);
export const deleting = (data) => fetch('/ftydeviceconfiginfo/deleting', data, "GET",true);

export const queryDeviceConfigTypes = (data) => fetch('/ftydeviceconfiginfo/getDeviceConfigTypes', data, "GET");
export const queryData = (deviceId, deviceConfigTypeId, data) => fetch('/ftydeviceconfiginfo/byPage/configType?deviceId='+deviceId+'&deviceConfigTypeId='+deviceConfigTypeId, data, "POST");












