import fetch from '@/config/fetch'

export const queryArea = (data) => fetch('/ftyarea/byCondition', data, "POST");
export const querySite = (data) => fetch('/ftysiteinfo/byCondition', data, "POST");
export const queryDevice = (data) => fetch('/ftydevice/byCondition', data, "POST");

export const queryDeviceFault = (data) => fetch('/ftydevicefaultinfo/byAll', data, "GET");
export const queryData = (data) => fetch('/ftydevicefault/byPage', data, "POST");
export const create = (data) => fetch('/ftydevicefault/creating', data, "POST",true);
export const edit = (data) => fetch('/ftydevicefault/updating', data, "POST",true);
export const deleting = (data) => fetch('/ftydevicefault/deleting', data, "GET",true);
export const queryEnterprise = () => fetch('/ftyenterprise/byAll', {}, "GET");












