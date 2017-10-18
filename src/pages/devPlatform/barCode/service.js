import fetch from '@/config/fetch'

export const queryProductLine = (data) => fetch('/pdline/byAll', {}, "GET");
export const queryProduct = (data) => fetch('/pd/byCondition',data,  "POST");
export const getTree = () => fetch('/dpbarcodetype/byAll', {}, "GET");
export const queryData = (data) => fetch('/dpbarcode/byPage', data, "POST");

export const queryBarCodeType = (data) => fetch('/dpbarcodetype/byCondition', data, "POST");
export const treeCreate = (data) => fetch('/dpbarcodetype/creating', data, "POST",true);
export const treeEdit = (data) => fetch('/dpbarcodetype/updating', data, "POST",true);
export const treeDelete = (data) => fetch('/dpbarcodetype/deleting', data, "GET",true);

export const queryBarCode = (data) => fetch('/dpbarcode/byCondition', data, "POST");
export const create = (data) => fetch('/dpbarcode/creating', data, "POST",true);
export const edit = (data) => fetch('/dpbarcode/updating', data, "POST",true);
export const deleting = (data) => fetch('/dpbarcode/deleting', data, "GET",true);

export const queryFunType = () => fetch('/dpfunctiontype/byAll', {}, "GET");
export const queryFn = (data) => fetch('/dpfunction/byCondition', data, "POST");
