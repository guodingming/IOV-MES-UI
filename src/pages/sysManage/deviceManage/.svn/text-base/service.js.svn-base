import fetch from '@/config/fetch'

export const queryEnterprise = (data) => fetch('/ftyenterprise/byAll', {}, "GET");
export const querySite = (data) => fetch('/ftysiteinfo/byCondition', data, "POST");
export const queryArea = (data) => fetch('/ftyarea/byCondition', data, "POST");
export const getTree = () => fetch('/ftydevicetype/byAll', {}, "GET");
export const queryData = (data) => fetch('/ftydevice/byPage', data, "POST");

export const queryDeviceType = (data) => fetch('/ftydevicetype/byCondition', data, "POST");
export const treeCreate = (data) => fetch('/ftydevicetype/creating', data, "POST",true);
export const treeEdit = (data) => fetch('/ftydevicetype/updating', data, "POST",true);
export const treeDelete = (data) => fetch('/ftydevicetype/deleting', data, "GET",true);

export const queryDevice = (data) => fetch('/ftydevice/byCondition', data, "POST");
export const create = (data) => fetch('/ftydevice/saveFtyDevicesAndDeviceConfig', data, "POST",true);
export const edit = (data) => fetch('/ftydevice/updateFtyDevicesAndDeviceConfig', data, "POST",true);
export const deleting = (data) => fetch('/ftydevice/deleting', data, "GET",true);
//配置类型
export const editConfigType = (data) => fetch('/ftydeviceconfigtype/updating', data, "POST");
export const deleteConfigType = (data) => fetch('/ftydeviceconfigtype/deleting', data, "GET");
export const queryConfigType = (data) => fetch('/ftydeviceconfigtype/byCondition', data, "POST");
export const createConfigType = (data) => fetch('/ftydeviceconfigtype/creating', data, "POST");
export const queryAllConfigType = () => fetch('/ftydeviceconfigtype/byAll', {}, "GET");
export const queryConfig = (data) => fetch('/ftydeviceconfig/byCondition', data, "POST");
export const saveDeviceConfigTypes = (data) => fetch('/ftydeviceconfig/saveDeviceConfigTypes', data, "POST");

//附件配置
export const getLabel = () => fetch('/ftydeviceannex/byAll', {}, "GET");
export const getAccessConfigTree = () => fetch('/ftyprocess/byAll', {}, "GET");

//工序配置
export const queryProcess = () => fetch('/ftyprocess/byAll', {}, "GET");
export const queryDeviceProcess = (data) => fetch('/ftydeviceprocess/byCondition', data, "POST");
export const createDeviceProcess = (data) => fetch('/ftydeviceprocess/saveFtyDeviceProcessByIds', data, "POST", true);


export const accessoryConfigCreate = (data) => fetch('/ftydeviceprocessannex/saveFtyDeviceProcessAnnex', data, "POST");
export const accessoryConfigEdit = (data) => fetch('/ftydeviceprocessannex/updateFtyDeviceProcessAnnex', data, "POST");
export const accessConfigDeleting = (data) => fetch('/ftydeviceprocessannex/deleting', data, "GET",true);
export const accessConfigQueryData = (data) => fetch('/ftydeviceprocessannex/byPage', data, "POST");


export const queryAnnex = (data) => fetch('/ftydeviceannexinfo/byCondition', data, "POST");
export const queryProcessAnnexAssociation = (data) => fetch('/ftydeviceprocessannexassociation/byCondition', data, "POST");
