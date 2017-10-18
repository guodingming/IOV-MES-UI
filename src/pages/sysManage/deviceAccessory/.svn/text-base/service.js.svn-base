import fetch from '@/config/fetch'

export const getTree = () => fetch('/ftydeviceannex/byAll', {}, "GET");
export const deleteTree = (data) => fetch('/ftydeviceannex/deleting', data, "GET");
export const createTree = (data) => fetch('/ftydeviceannex/creating', data, "POST");
export const updateTree = (data) => fetch('/ftydeviceannex/updating', data, "POST");
export const queryFault = (data) => fetch('/ftydeviceannex/byCondition', data, "POST");

export const queryData = (data) => fetch('/ftydeviceannexinfo/byPage', data, "POST");
export const queryDataRepeat = (data) => fetch('/ftydeviceannexinfo/byCondition', data, "POST");
export const create = (data) => fetch('/ftydeviceannexinfo/creating', data, "POST",true);
export const edit = (data) => fetch('/ftydeviceannexinfo/updating', data, "POST",true);
export const deleting = (data) => fetch('/ftydeviceannexinfo/deleting', data, "GET",true);













