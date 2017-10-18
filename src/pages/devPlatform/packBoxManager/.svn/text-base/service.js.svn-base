import fetch from '@/config/fetch'

//export const getTree = () => fetch('/pdline/getPdLineTree', {}, "GET");
export const queryData = (data) => fetch('/dpbox/byPage', data, "POST");
export const queryByCondition = (data) => fetch('/dpbox/byCondition',data,"POST");
export const getBarCodeType = () => fetch('/dpbarcodetype/byAll', {}, "GET");
export const getBarCode = (data) => fetch('/dpbarcode/findByTypeId',data,"GET");
export const getLableType = () => fetch ('/dplabeltype/byAll',{},"GET");
export const getLable = (data) => fetch('/dplabel/findByTypeId',data,"GET");
export const queryByPdId = (data) => fetch('/dpbox/findByPdId',data,"GET");
//export const getParent = () => fetch('/dpbox/byAll',{},"GET");
export const saveProductToBox = (data) => fetch('/dpboxproductinfo/saveProductToBox',data,"GET");
export const queryPage = (data) => fetch('/dpboxproductinfo/byPage',data,"POST");
export const create = (data) => fetch('/dpbox/creating', data, "POST",true);
export const edit = (data) => fetch('/dpbox/updating', data, "POST",true);
export const deleting = (data) => fetch('/dpbox/deleting', data, "GET",true);
export const queryProduct = (data) => fetch('/pd/byCondition',data,  "POST");
export const queryProductLine = (data) => fetch('/pdline/byAll', {}, "GET");












