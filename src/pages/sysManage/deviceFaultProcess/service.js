import fetch from '@/config/fetch'

export const getTree = (data) => fetch('/ftydevicefaultinfo/byAll', data, "GET");
export const deleteTree = (data) => fetch('/ftydevicefaultinfo/deleting', data, "GET");
export const createTree = (data) => fetch('/ftydevicefaultinfo/creating', data, "POST");
export const updateTree = (data) => fetch('/ftydevicefaultinfo/updating', data, "POST");
export const queryFault = (data) => fetch('/ftydevicefaultinfo/byCondition', data, "POST");

export const create = (data) => fetch('/ftydevicefaultprocess/creating', data, "POST",true);
export const edit = (data) => fetch('/ftydevicefaultprocess/updating', data, "POST",true);
export const deleting = (data) => fetch('/ftydevicefaultprocess/deleting', data, "GET",true);
export const queryData = (data) => fetch('/ftydevicefaultprocess/byPage', data, "POST");
export const queryFaultInfo = (data) => fetch('/ftydevicefaultprocess/byCondition', data, "POST");











