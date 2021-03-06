import fetch from '@/config/fetch'

//export const getTree = () => fetch('/pdline/getPdLineTree', {}, "GET");
export const queryData = (data) => fetch('/dpboxpallet/byPage', data, "POST");
export const queryProduct = (data) => fetch('/pd/byCondition',data,  "POST");
export const queryByCondition = (data) => fetch('/dpbox/countByCondition',data,"POST");
export const getBarCodeType = () => fetch('/dpbarcodetype/byAll', {}, "GET");
export const getBarCode = (data) => fetch('/dpbarcode/findByTypeId',data,"GET");
export const getLableType = () => fetch ('/dplabeltype/byAll',{},"GET");
export const getLable = (data) => fetch('/dplabel/findByTypeId',data,"GET");
export const queryByBoxId = (data) => fetch('/dpboxpallet/findByPdId',data,"GET");
//export const getParent = () => fetch('/dpbox/byAll',{},"GET");
export const saveBoxToPallet = (data) => fetch('/dpboxpalletinfo/saveBoxToPallet',data,"GET");
export const queryProductLine = (data) => fetch('/pdline/byAll', {}, "GET");
export const queryPage = (data) => fetch('/dpboxpalletinfo/byPage',data,"POST");
export const create = (data) => fetch('/dpboxpallet/creating', data, "POST",true);
export const edit = (data) => fetch('/dpbox/updating', data, "POST",true);
export const deleting = (data) => fetch('/dpboxpalletinfo/deleting', data, "GET",true);











