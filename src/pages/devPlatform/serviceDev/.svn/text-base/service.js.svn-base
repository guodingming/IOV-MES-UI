import fetch from '@/config/fetch'

export const getTree = () => fetch('/dpservicetype/byAll', {}, "GET");
export const queryData = (data) => fetch('/dpservice/byPage', data, "POST");

export const queryName = (data) => fetch('/dpservicetype/byCondition', data, "POST");
export const treeCreate = (data) => fetch('/dpservicetype/creating', data, "POST",true);
export const treeEdit = (data) => fetch('/dpservicetype/updating', data, "POST",true);
export const treeDelete = (data) => fetch('/dpservicetype/deleting', data, "GET",true);

export const nameRepeat = (data) => fetch('/dpservice/byCondition', data, "POST");
export const create = (data) => fetch('/dpservice/creating', data, "POST",true);
export const edit = (data) => fetch('/dpservice/updating', data, "POST",true);
export const deleting = (data) => fetch('/dpservice/deleting', data, "GET",true);

export const queryFunction = (data) => fetch('/dpfunction/byAll', data, "GET");
export const test = (data) => fetch('/dpservice/invoke/methodName', data, "POST");
